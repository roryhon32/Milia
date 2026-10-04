import { randomUUID } from "node:crypto";
import { database, query, write, audit, interaction } from "./db";
import { leadInputSchema, type Lead } from "./schemas";
import { searchSchema, type DiscoveryRun, type DiscoveryInput } from "./discovery-schema";
import { buildLead, saveLead } from "./repository";
import { OpenAIDiscoveryProvider, matchesBusinessWebsite, type DiscoveryProvider } from "../integrations/discovery";
import { HttpError } from "../security/guard";

let active = false;
export async function searchBusinesses(input: DiscoveryInput, provider: DiscoveryProvider = new OpenAIDiscoveryProvider()): Promise<DiscoveryRun> {
  if (active) throw new HttpError(409, "Uma pesquisa já está em andamento. Aguarde.");
  const criteria = searchSchema.parse(input);
  active = true;
  try {
    const candidates = await provider.search(criteria);
    const run: DiscoveryRun = { id: randomUUID(), createdAt: new Date().toISOString(), expiresAt: new Date(Date.now() + 86400000).toISOString(), input: criteria, candidates };
    await write(db => {
      db.run("DELETE FROM discovery_runs WHERE expires_at < ?", [run.createdAt]);
      db.run("INSERT INTO discovery_runs VALUES(?,?,?,?)", [run.id, run.createdAt, run.expiresAt, JSON.stringify(run)]);
      audit(db, "lead_discovery_completed", null, { runId: run.id, count: candidates.length, ...criteria });
    });
    return run;
  } finally { active = false; }
}
function normalized(value: string) { return value.normalize("NFD").replace(/\p{Diacritic}/gu, "").toLowerCase().trim().replace(/\s+/g, " "); }
function cityKey(value: string) { return normalized(value).replace(/\s*[,/-]\s*[a-z]{2}$/, "").trim(); }
function companyKey(value: string) { return normalized(value).split(/[^a-z0-9]+/).filter(t => !/^(de|da|do|e|arquitetura|engenharia|escritorio|design|interiores|urbanismo|planejamento|construcao|energia|solar|solucoes|ltda|grupo|projetos|oa\d+)$/.test(t)).join(" "); }
function host(value: string) { try { return new URL(value).hostname.replace(/^www\./, ""); } catch { return ""; } }
function correctWebsites(run: DiscoveryRun) {
  for (const c of run.candidates) if (c.website && !matchesBusinessWebsite(c.company, c.website)) c.website = "";
  return run;
}
export async function latestDiscovery() {
  const row = query<{ data: string }>((await database()).db, "SELECT data FROM discovery_runs WHERE expires_at > ? ORDER BY created_at DESC LIMIT 1", [new Date().toISOString()])[0];
  return row ? correctWebsites(JSON.parse(row.data) as DiscoveryRun) : null;
}
export async function importCandidates(runId: string, candidateIds: string[]) {
  await database();
  return write(db => {
    const row = query<{ data: string; expires_at: string }>(db, "SELECT data,expires_at FROM discovery_runs WHERE id=?", [runId])[0];
    if (!row || Date.parse(row.expires_at) <= Date.now()) throw new HttpError(404, "Pesquisa expirada. Faça uma nova busca.");
    const run = correctWebsites(JSON.parse(row.data) as DiscoveryRun);
    const ids = [...new Set(candidateIds)];
    if (ids.some(id => !run.candidates.some(c => c.id === id))) throw new HttpError(400, "Resultado não pertence a esta pesquisa.");
    const leads = query<{ data: string }>(db, "SELECT data FROM leads").map(r => JSON.parse(r.data) as Lead);
    let added = 0, skipped = 0;
    for (const candidate of run.candidates.filter(c => ids.includes(c.id))) {
      const duplicate = leads.find(l => (candidate.website && host(l.website) === host(candidate.website)) || (cityKey(l.city) === cityKey(candidate.city) && (normalized(l.company) === normalized(candidate.company) || (companyKey(l.company).length >= 3 && companyKey(l.company) === companyKey(candidate.company)))));
      if (candidate.importedLeadId || duplicate) {
        candidate.importedLeadId ||= duplicate?.id || null;
        if (duplicate && !duplicate.website && candidate.website) {
          duplicate.website = candidate.website; duplicate.requirements.hasWebsite = true;
          duplicate.observations = `${duplicate.observations}\nSite confirmado na pesquisa: ${candidate.website}`.slice(0, 3000);
          saveLead(db, duplicate); interaction(db, duplicate.id, "lead_enriched_from_search", { runId, website: candidate.website });
        }
        skipped++; continue;
      }
      const lead = buildLead(leadInputSchema.parse({ company: candidate.company, segment: candidate.segment, city: candidate.city, website: candidate.website, source: "WEB_SEARCH", nextAction: "Conferir fontes e entender a necessidade", observations: `${candidate.description}\nFontes públicas: ${candidate.sources.join("\n")}\nCandidato de busca; necessidade de compra ainda não confirmada.`.slice(0, 3000), requirements: { hasWebsite: candidate.website ? true : null } }));
      saveLead(db, lead);
      interaction(db, lead.id, "lead_created_from_search", { runId, sources: candidate.sources });
      leads.push(lead); candidate.importedLeadId = lead.id; added++;
    }
    db.run("UPDATE discovery_runs SET data=? WHERE id=?", [JSON.stringify(run), runId]);
    audit(db, "discovery_candidates_imported", null, { runId, added, skipped });
    return { added, skipped, run };
  });
}
