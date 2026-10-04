import { getLead, mutateLead } from "./repository";
import { analyzeLead } from "./sales";
import { interaction } from "./db";
import { HttpError, sanitizeText } from "../security/guard";
import { OpenAIQualificationProvider, validateQualification, type QualificationProvider } from "../integrations/qualification";
import type { Qualification } from "./qualification-schema";
import { publicContacts } from "./public-contacts";

const active = new Set<string>();
export async function classifyLead(id: string, provider: QualificationProvider = new OpenAIQualificationProvider(), refreshWebsite = true) {
  if (active.has(id) || active.size >= 2) throw new HttpError(409, "Uma classificação está em andamento. Aguarde.");
  active.add(id);
  try {
    if (!process.env.OPENAI_API_KEY?.trim()) throw new HttpError(503, "Configure OPENAI_API_KEY para classificar com IA.");
    let lead = await getLead(id), analysisError = "";
    if (refreshWebsite && lead.website) {
      try { await analyzeLead(id); } catch (e) { analysisError = sanitizeText(e instanceof HttpError ? e.message : "Não foi possível consultar o site.", 250); }
      lead = await getLead(id);
    }
    // A failed refresh must not claim that an old analysis is current.
    const inputLead = analysisError ? { ...lead, analysis: null } : lead;
    let output;
    try { output = validateQualification(await provider.classify(inputLead), inputLead); }
    catch (e) { if (e instanceof HttpError) throw e; throw new HttpError(502, "A IA não produziu uma classificação válida. Tente novamente."); }
    const qualification: Qualification = {
      ...output, provider: "openai", classifiedAt: new Date().toISOString(),
      websiteStatus: analysisError ? "UNAVAILABLE" : lead.analysis ? "ANALYZED" : "NO_CONFIRMED_SITE",
      evidence: output.findingIndexes.map(i => { const f = inputLead.analysis!.findings[i]; return { finding: f.finding, source: f.source, confidence: f.confidence }; }),
      limitations: [...(inputLead.analysis?.limitations || []), ...(analysisError ? [analysisError] : []), ...(!inputLead.analysis ? ["Necessidade digital não confirmada; conferir site e canais públicos."] : []), "Classificação de pesquisa, sem confirmação de interesse em contratar."],
    };
    return mutateLead(id, "lead_classified_by_ai", (current, db) => {
      if (current.updatedAt !== lead.updatedAt) throw new HttpError(409, "O lead mudou durante a classificação. Tente novamente.");
      current.qualification = qualification;
      const contacts = publicContacts(inputLead.analysis);
      if (!current.phone && contacts.phone) current.phone = contacts.phone;
      if (!current.email && contacts.email) current.email = contacts.email;
      current.nextAction = output.nextAction;
      if (current.stage === "NEW") current.stage = "RESEARCHING";
      current.draftApproved = false;
      interaction(db, id, "lead_classified_by_ai", { opportunity: output.opportunity, fit: output.fit, provider: "openai", evidenceCount: qualification.evidence.length, websiteStatus: qualification.websiteStatus });
    });
  } finally { active.delete(id); }
}
