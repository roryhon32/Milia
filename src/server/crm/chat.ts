import { randomUUID } from "node:crypto";
import { createLead, getLead, mutateLead } from "./repository";
import { query, database, write, audit, interaction } from "./db";
import { cookies, verifyToken, signToken, HttpError } from "../security/guard";

export async function currentChatLead(request: Request) {
  const id = verifyToken(cookies(request, "milia_chat"), "chat");
  if (!id) return null;
  const row = query<{ lead_id: string; expires_at: string }>(
    (await database()).db,
    "SELECT lead_id,expires_at FROM chat_sessions WHERE id=?",
    [id],
  )[0];
  if (!row || Date.parse(row.expires_at) <= Date.now()) return null;
  return getLead(row.lead_id);
}
export async function createChat() {
  const lead = await createLead({
    company: "Visitante do site",
    source: "SITE_CHAT",
    nextAction: "spin:situation",
    requirements: {},
    observations:
      "Sessão iniciada no chat comercial com autorização de registro.",
  });
  const id = randomUUID(),
    expires = Date.now() + 7 * 86400000;
  await write((db) => {
    db.run("INSERT INTO chat_sessions VALUES(?,?,?)", [
      id,
      lead.id,
      new Date(expires).toISOString(),
    ]);
    audit(db, "chat_started", lead.id);
    interaction(db, lead.id, "conversation_consent", {
      purpose: "Atendimento automatizado solicitado",
    });
  });
  return { lead, token: signToken("chat", id, expires) };
}
export function chatCookie(request: Request, token: string) {
  return `milia_chat=${token}; HttpOnly; SameSite=Strict; Path=/; Max-Age=604800${new URL(request.url).protocol === "https:" ? "; Secure" : ""}`;
}
export async function captureChatLead(
  request: Request,
  input: { name: string; company: string; contact: string; consent: boolean },
) {
  if (!input.consent)
    throw new HttpError(400, "Confirme o contato para continuar.");
  const lead = await currentChatLead(request);
  if (!lead) throw new HttpError(401, "Inicie uma conversa primeiro.");
  return mutateLead(lead.id, "lead_qualified_from_site", (current, db) => {
    current.contactName = input.name.trim();
    current.company = input.company.trim() || input.name.trim();
    if (input.contact.includes("@")) current.email = input.contact;
    else current.phone = input.contact;
    current.source = "SITE_CHAT";
    if (current.stage === "NEW" && current.recommendation.plan !== "UNKNOWN")
      current.stage = "QUALIFIED";
    interaction(db, current.id, "contact_consent", {
      purpose: "Atendimento e proposta solicitados",
      providedAt: new Date().toISOString(),
    });
  });
}
