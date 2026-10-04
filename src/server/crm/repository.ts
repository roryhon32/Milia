import { randomUUID } from "node:crypto";
import type { Database } from "sql.js";
import { database, query, write, audit, interaction } from "./db";
import {
  leadInputSchema,
  memorySchema,
  type Lead,
  type LeadInput,
  type Interaction,
  type Stage,
} from "./schemas";
import {
  assertTransition,
  recommendPlan,
  scoreLead,
  outreachIntervalMs,
  rules,
} from "./business";
import { HttpError } from "../security/guard";
import { HumanContactProvider } from "../integrations/contact";

export function getLeadFrom(db: Database, id: string): Lead {
  const row = query<{ data: string }>(db, "SELECT data FROM leads WHERE id=?", [
    id,
  ])[0];
  if (!row) throw new HttpError(404, "Lead não encontrado.");
  return JSON.parse(row.data);
}
export function saveLead(db: Database, lead: Lead) {
  lead.memory = memorySchema.parse(lead.memory);
  lead.updatedAt = new Date().toISOString();
  db.run("INSERT OR REPLACE INTO leads VALUES(?,?,?,?,?,?,?,?,?,?,?)", [
    lead.id,
    lead.company,
    lead.stage,
    lead.score,
    lead.priority,
    lead.createdAt,
    lead.updatedAt,
    lead.nextActionAt,
    lead.lastContactAt,
    lead.attempts,
    JSON.stringify(lead),
  ]);
}
export async function getLead(id: string) {
  return getLeadFrom((await database()).db, id);
}
export async function listLeads() {
  return query<{ data: string }>(
    (await database()).db,
    "SELECT data FROM leads ORDER BY score DESC,created_at DESC LIMIT 1000",
  ).map((r) => JSON.parse(r.data) as Lead);
}
export async function history(id: string) {
  await getLead(id);
  return query<{
    id: string;
    lead_id: string;
    kind: string;
    created_at: string;
    data: string;
  }>(
    (await database()).db,
    "SELECT * FROM interactions WHERE lead_id=? ORDER BY created_at,rowid",
    [id],
  ).map(
    (r) =>
      ({
        id: r.id,
        leadId: r.lead_id,
        kind: r.kind,
        createdAt: r.created_at,
        data: JSON.parse(r.data),
      }) as Interaction,
  );
}
export function buildLead(input: LeadInput): Lead {
  const now = new Date().toISOString();
  const recommendation = recommendPlan(input.requirements);
  const score = scoreLead(input, null);
  return {
    ...input,
    id: randomUUID(),
    stage: "NEW",
    score: score.score,
    priority: score.priority,
    scoreReasons: score.reasons,
    createdAt: now,
    updatedAt: now,
    lastInteraction: null,
    lastContactAt: null,
    attempts: 0,
    recommendation,
    conversionProbability: null,
    analysis: null,
    memory: {
      companyContext: input.company,
      needs: input.requirements.objective
        ? [input.requirements.objective.slice(0, 200)]
        : [],
      painPoints: [],
      objections: [],
      interests: [],
      budgetSignals: [],
      recommendedPlan: recommendation.plan,
      sentiment: "UNKNOWN",
      purchaseIntent: 0,
      lastSummary: "Lead cadastrado; necessidade ainda em descoberta.",
      nextBestAction: input.nextAction,
    },
    salesState: "DISCOVERY",
    draft: "",
    draftApproved: false,
    queueReleasedAt: null,
    revenue: null,
  };
}
export async function createLead(raw: unknown) {
  const input = leadInputSchema.parse(raw);
  return write((db) => {
    const lead = buildLead(input);
    saveLead(db, lead);
    interaction(db, lead.id, "lead_created", { source: lead.source });
    return lead;
  });
}
export async function importLeads(raw: unknown[]) {
  const inputs = raw.map((v) => leadInputSchema.parse(v));
  if (inputs.length > 100)
    throw new HttpError(400, "Importe no máximo 100 leads por vez.");
  return write((db) =>
    inputs.map((input) => {
      const lead = buildLead(input);
      saveLead(db, lead);
      interaction(db, lead.id, "lead_created", { source: "IMPORT" });
      return lead;
    }),
  );
}
export async function mutateLead(
  id: string,
  event: string,
  fn: (lead: Lead, db: Database) => void,
) {
  return write((db) => {
    const lead = getLeadFrom(db, id);
    fn(lead, db);
    saveLead(db, lead);
    audit(db, event, id);
    return lead;
  });
}
export async function editLead(id: string, patch: Record<string, unknown>) {
  return mutateLead(id, "lead_updated", (lead) => {
    const merged = leadInputSchema.parse(
      Object.fromEntries(
        Object.keys(leadInputSchema.shape).map((key) => [
          key,
          key in patch ? patch[key] : lead[key as keyof LeadInput],
        ]),
      ),
    );
    if (merged.website !== lead.website) lead.analysis = null;
    if (merged.website !== lead.website || merged.company !== lead.company || merged.segment !== lead.segment || merged.city !== lead.city) lead.qualification = null;
    Object.assign(lead, merged);
    const scoring = scoreLead(lead, lead.analysis);
    lead.score = scoring.score;
    lead.priority = scoring.priority;
    lead.scoreReasons = scoring.reasons;
    lead.recommendation = recommendPlan(lead.requirements);
    lead.memory.recommendedPlan = lead.recommendation.plan;
    lead.draftApproved = false;
  });
}
export async function changeStage(id: string, stage: Stage, revenue?: number) {
  return mutateLead(id, `lead_${stage.toLowerCase()}`, (lead, db) => {
    if (stage === "CONTACTED")
      throw new HttpError(400, "Registre o envio na fila comercial.");
    try {
      assertTransition(lead.stage, stage);
    } catch {
      throw new HttpError(400, "Transição de estágio não permitida.");
    }
    lead.stage = stage;
    if (stage === "WON") lead.revenue = revenue ?? null;
    interaction(db, id, "stage_changed", { stage, revenue: lead.revenue });
  });
}
export async function recordInteraction(
  id: string,
  kind: string,
  text: string,
) {
  return mutateLead(id, kind, (lead, db) => {
    interaction(db, id, kind, { text });
    lead.lastInteraction = new Date().toISOString();
    if (
      kind === "lead_replied" &&
      ["CONTACTED", "FOLLOW_UP"].includes(lead.stage)
    )
      lead.stage = "REPLIED";
  });
}
type QueueRow = { released_at: string | null; lead_id: string | null };
function compareCandidates(a: Lead, b: Lead) {
  const ranks: Record<string, number> = {
    VERY_HIGH: 4,
    HIGH: 3,
    MEDIUM: 2,
    LOW: 1,
  };
  return (
    b.score - a.score ||
    (ranks[b.priority] || 0) - (ranks[a.priority] || 0) ||
    Date.parse(b.createdAt) - Date.parse(a.createdAt) ||
    a.attempts - b.attempts
  );
}
export async function queueSnapshot(now = Date.now()) {
  const db = (await database()).db;
  const state = query<QueueRow>(
    db,
    "SELECT released_at,lead_id FROM queue_state WHERE id=1",
  )[0];
  const nextAt = state.released_at
    ? new Date(
        new Date(state.released_at).getTime() + outreachIntervalMs(),
      ).toISOString()
    : null;
  const current = state.lead_id ? getLeadFrom(db, state.lead_id) : null;
  const candidates = (await listLeads())
    .filter(
      (l) =>
        l.stage === "CONTACT_READY" &&
        !l.optOut &&
        l.attempts < rules.maxAttempts &&
        (!l.nextActionAt || Date.parse(l.nextActionAt) <= now) &&
        (!l.lastContactAt ||
          Date.parse(l.lastContactAt) + rules.followUpDays * 86400000 <= now),
    )
    .sort(compareCandidates);
  return {
    current: current && current.stage === "CONTACT_READY" ? current : null,
    next: candidates[0] || null,
    nextAt,
    waitMs: nextAt ? Math.max(0, Date.parse(nextAt) - now) : 0,
    candidates,
  };
}
export async function releaseLead(now = Date.now()) {
  await queueSnapshot(now);
  return write((db) => {
    const state = query<QueueRow>(
      db,
      "SELECT released_at,lead_id FROM queue_state WHERE id=1",
    )[0];
    if (state.lead_id) {
      const current = getLeadFrom(db, state.lead_id);
      if (current.stage === "CONTACT_READY") return current;
    }
    if (
      state.released_at &&
      now < Date.parse(state.released_at) + outreachIntervalMs()
    )
      throw new HttpError(
        409,
        "Aguarde o intervalo antes de liberar outro contato.",
      );
    const candidates = query<{ data: string }>(
      db,
      "SELECT data FROM leads WHERE stage='CONTACT_READY' ORDER BY score DESC,attempts ASC,created_at DESC",
    )
      .map((r) => JSON.parse(r.data) as Lead)
      .filter(
        (l) =>
          !l.optOut &&
          l.attempts < rules.maxAttempts &&
          (!l.nextActionAt || Date.parse(l.nextActionAt) <= now) &&
          (!l.lastContactAt ||
            Date.parse(l.lastContactAt) + rules.followUpDays * 86400000 <= now),
      );
    const lead = candidates.sort(compareCandidates)[0];
    if (!lead) throw new HttpError(409, "Nenhum lead pronto para abordagem.");
    lead.queueReleasedAt = new Date(now).toISOString();
    saveLead(db, lead);
    db.run("UPDATE queue_state SET released_at=?,lead_id=? WHERE id=1", [
      lead.queueReleasedAt,
      lead.id,
    ]);
    audit(db, "lead_released", lead.id);
    return lead;
  });
}
export async function saveDraft(id: string, draft: string, approve = false) {
  return mutateLead(
    id,
    approve ? "message_approved" : "message_edited",
    (lead) => {
      if (!draft.trim()) throw new HttpError(400, "Mensagem vazia.");
      lead.draft = draft.trim();
      lead.draftApproved = approve;
    },
  );
}
export async function contactChannel(id: string) {
  const lead = await getLead(id);
  const queue = await queueSnapshot();
  if (queue.current?.id !== id || !lead.draftApproved || lead.optOut)
    throw new HttpError(409, "Libere o lead e aprove a mensagem primeiro.");
  return new HumanContactProvider().prepare(lead);
}
export async function markSent(id: string) {
  return write((db) => {
    const lead = getLeadFrom(db, id);
    const state = query<QueueRow>(
      db,
      "SELECT released_at,lead_id FROM queue_state WHERE id=1",
    )[0];
    if (
      state.lead_id !== id ||
      lead.stage !== "CONTACT_READY" ||
      !lead.draftApproved ||
      lead.optOut
    )
      throw new HttpError(409, "Lead não liberado ou mensagem não aprovada.");
    lead.stage = "CONTACTED";
    lead.attempts++;
    lead.lastContactAt = new Date().toISOString();
    lead.lastInteraction = lead.lastContactAt;
    lead.nextActionAt = new Date(
      Date.now() + rules.followUpDays * 86400000,
    ).toISOString();
    lead.nextAction = "Aguardar resposta; follow-up somente quando permitido";
    saveLead(db, lead);
    db.run("UPDATE queue_state SET lead_id=NULL WHERE id=1");
    interaction(db, id, "contact_registered", {
      message: lead.draft,
      manual: true,
    });
    return lead;
  });
}
export async function metrics() {
  const leads = await listLeads();
  const interactions = query<{ kind: string; data: string; lead_id: string }>(
    (await database()).db,
    "SELECT kind,data,lead_id FROM interactions",
  );
  const won = leads.filter((l) => l.stage === "WON");
  const contacted = leads.filter((l) => l.attempts > 0);
  const replied = new Set(
    query<{ lead_id: string }>(
      (await database()).db,
      "SELECT DISTINCT lead_id FROM interactions WHERE kind='lead_replied'",
    ).map((r) => r.lead_id),
  );
  const groups = (key: "segment" | "priority") =>
    Object.entries(
      Object.groupBy
        ? Object.groupBy(leads, (l) => l[key] || "Não informado")
        : leads.reduce<Record<string, Lead[]>>((a, l) => {
            (a[l[key] || "Não informado"] ??= []).push(l);
            return a;
          }, {}),
    ).map(([name, items]) => ({
      name,
      total: items?.length || 0,
      won: items?.filter((l) => l.stage === "WON").length || 0,
    }));
  return {
    total: leads.length,
    qualified: leads.filter((l) =>
      [
        "QUALIFIED",
        "CONTACT_READY",
        "CONTACTED",
        "REPLIED",
        "NEGOTIATING",
        "WON",
      ].includes(l.stage),
    ).length,
    ready: leads.filter((l) => l.stage === "CONTACT_READY").length,
    negotiating: leads.filter((l) => l.stage === "NEGOTIATING").length,
    won: won.length,
    conversion: leads.length ? won.length / leads.length : 0,
    revenue: won.reduce((s, l) => s + (l.revenue || 0), 0),
    potentialRevenue: leads
      .filter((l) => !["WON", "LOST"].includes(l.stage))
      .reduce((s, l) => s + (l.recommendation.price || 0), 0),
    contacts: interactions.filter((i) => i.kind === "contact_registered")
      .length,
    responses: replied.size,
    responseRate: contacted.length
      ? contacted.filter((l) => replied.has(l.id)).length / contacted.length
      : 0,
    proposals: leads.filter((l) => ["NEGOTIATING", "WON"].includes(l.stage))
      .length,
    averageTicket: won.length
      ? won.reduce((s, l) => s + (l.revenue || 0), 0) / won.length
      : 0,
    bySegment: groups("segment"),
    byScore: groups("priority"),
    byPlan: ["essencial", "profissional", "HUMAN_HANDOFF", "UNKNOWN"].map(
      (name) => ({
        name,
        total: leads.filter((l) => l.recommendation.plan === name).length,
        won: won.filter((l) => l.recommendation.plan === name).length,
      }),
    ),
    byDay: Object.entries(
      leads.reduce<Record<string, number>>((a, l) => {
        const day = l.createdAt.slice(0, 10);
        a[day] = (a[day] || 0) + 1;
        return a;
      }, {}),
    ).map(([day, total]) => ({ day, total })),
    byMessage: interactions
      .filter((i) => i.kind === "contact_registered")
      .map((i) => ({
        message: JSON.parse(i.data).message,
        contactRegistered: true,
        company:
          leads.find((l) => l.id === i.lead_id)?.company ||
          "Lead fora da consulta",
        replied: replied.has(i.lead_id),
        won: won.some((l) => l.id === i.lead_id),
      })),
  };
}
