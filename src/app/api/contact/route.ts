import { z } from "zod";
import {
  checkOrigin,
  payload,
  response,
  fail,
  rateLimit,
  fingerprint,
} from "@/server/security/guard";
import { createLead } from "@/server/crm/repository";
import { audit, write } from "@/server/crm/db";
export const runtime = "nodejs";
const schema = z
  .object({
    name: z.string().trim().min(1).max(100),
    business: z.string().max(150),
    projectType: z.string().max(100),
    objective: z.string().max(1000),
    timing: z.string().max(200),
    contact: z
      .string()
      .trim()
      .max(254)
      .refine(
        (v) =>
          !v ||
          /^[+\d\s().-]{8,30}$/.test(v) ||
          z.string().email().safeParse(v).success,
      ),
    consent: z.literal(true),
  })
  .strict();
export async function POST(request: Request) {
  try {
    checkOrigin(request);
    await rateLimit("contact:global", 20);
    await rateLimit(`contact:${fingerprint(request)}`, 5);
    const input = await payload(request, schema);
    const lead = await createLead({
      company: input.business.trim() || input.name,
      contactName: input.name,
      email: input.contact.includes("@") ? input.contact : "",
      phone: input.contact && !input.contact.includes("@") ? input.contact : "",
      source: "SITE_FORM",
      interest: input.projectType,
      requirements: { objective: input.objective, urgency: input.timing },
      observations:
        "Contato solicitado no formulário do site; continuar qualificação.",
    });
    await write((db) =>
      audit(db, "contact_consent", lead.id, {
        purpose: "Proposta e atendimento solicitados",
      }),
    );
    return response({ ok: true });
  } catch (e) {
    return fail(e);
  }
}
