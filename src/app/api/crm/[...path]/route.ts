import { z } from "zod";
import {
  authorize,
  checkOrigin,
  payload,
  response,
  fail,
  HttpError,
  loginPassword,
  rateLimit,
  fingerprint,
  serverStatus,
} from "@/server/security/guard";
import {
  createLead,
  importLeads,
  listLeads,
  getLead,
  history,
  editLead,
  changeStage,
  metrics,
  queueSnapshot,
  releaseLead,
  saveDraft,
  markSent,
  contactChannel,
} from "@/server/crm/repository";
import {
  analyzeLead,
  generateApproach,
  continueConversation,
} from "@/server/crm/sales";
import { leadInputSchema, stages } from "@/server/crm/schemas";
import { database, query, audit, write } from "@/server/crm/db";
import { discoveryActionSchema } from "@/server/crm/discovery-schema";
import { searchBusinesses, importCandidates, latestDiscovery } from "@/server/crm/discovery";
import { classifyLead } from "@/server/crm/qualification";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";
type Context = { params: Promise<{ path: string[] }> };
const actionSchema = z
  .object({
    action: z.enum([
      "analyze",
      "classify",
      "generate",
      "stage",
      "draft",
      "reply",
      "sent",
      "channel",
    ]),
    stage: z.enum(stages).optional(),
    text: z.string().max(3000).optional(),
    approve: z.boolean().optional(),
    revenue: z.number().min(0).max(10000000).optional(),
  })
  .strict();
export async function GET(request: Request, context: Context) {
  try {
    authorize(request);
    await rateLimit(`admin:${fingerprint(request)}`, 120);
    const { path } = await context.params;
    if (path[0] === "discovery" && path.length === 1) return response(await latestDiscovery());
    if (path[0] === "session")
      return response({ authenticated: true, ...(await serverStatus()) });
    if (path[0] === "metrics") return response(await metrics());
    if (path[0] === "queue") return response(await queueSnapshot());
    if (path[0] === "events")
      return response(
        query(
          (await database()).db,
          "SELECT event,created_at,lead_id,data FROM audit_events ORDER BY created_at DESC LIMIT 100",
        ),
      );
    if (path[0] === "leads" && path.length === 1)
      return response(await listLeads());
    if (path[0] === "leads" && path.length === 2) {
      const id = z.string().uuid().parse(path[1]);
      return response({ lead: await getLead(id), history: await history(id) });
    }
    throw new HttpError(404, "Rota não encontrada.");
  } catch (e) {
    return fail(e);
  }
}
export async function POST(request: Request, context: Context) {
  try {
    checkOrigin(request);
    const { path } = await context.params;
    if (path[0] === "login") {
      await rateLimit("login:global", 20, 15 * 60000);
      await rateLimit(`login:${fingerprint(request)}`, 5, 15 * 60000);
      const input = await payload(
        request,
        z.object({ password: z.string().max(256) }).strict(),
      );
      const token = await loginPassword(input.password);
      await write((db) => audit(db, "admin_logged_in"));
      return Response.json(
        { ok: true },
        {
          headers: {
            "Cache-Control": "no-store",
            "Set-Cookie": `milia_admin=${token}; HttpOnly; SameSite=Strict; Path=/; Max-Age=28800${new URL(request.url).protocol === "https:" ? "; Secure" : ""}`,
          },
        },
      );
    }
    authorize(request);
    await rateLimit(`admin-write:${fingerprint(request)}`, 60);
    if (path[0] === "discovery" && path.length === 1) {
      const input = await payload(request, discoveryActionSchema);
      if (input.action === "import") return response(await importCandidates(input.runId, input.candidateIds));
      if (!process.env.OPENAI_API_KEY?.trim()) throw new HttpError(503, "Preencha OPENAI_API_KEY no arquivo .env e reinicie o servidor para habilitar a busca.");
      await rateLimit("discovery:global", 3, 10 * 60000);
      return response(await searchBusinesses({ segment: input.segment, city: input.city, limit: input.limit ?? 5 }));
    }
    if (path[0] === "logout")
      return Response.json(
        { ok: true },
        {
          headers: {
            "Set-Cookie":
              "milia_admin=; HttpOnly; SameSite=Strict; Path=/; Max-Age=0",
          },
        },
      );
    if (path[0] === "leads" && path.length === 1)
      return response(
        await createLead(await payload(request, leadInputSchema)),
        201,
      );
    if (path[0] === "import")
      return response(
        await importLeads(
          await payload(request, z.array(leadInputSchema).min(1).max(100)),
        ),
        201,
      );
    if (path[0] === "queue") {
      await payload(
        request,
        z.object({ action: z.literal("release") }).strict(),
      );
      return response(await releaseLead());
    }
    if (path[0] === "leads" && path.length === 2) {
      const id = z.string().uuid().parse(path[1]);
      const input = await payload(request, actionSchema);
      if (input.action === "analyze") return response(await analyzeLead(id));
      if (input.action === "classify") {
        await rateLimit("classification:global", 40, 10 * 60000);
        return response(await classifyLead(id));
      }
      if (input.action === "generate")
        return response(await generateApproach(id));
      if (input.action === "stage" && input.stage)
        return response(await changeStage(id, input.stage, input.revenue));
      if (input.action === "draft" && input.text)
        return response(await saveDraft(id, input.text, input.approve));
      if (input.action === "reply" && input.text)
        return response(await continueConversation(id, input.text));
      if (input.action === "sent") return response(await markSent(id));
      if (input.action === "channel") {
        const channel = await contactChannel(id);
        await write((db) =>
          audit(db, "contact_channel_opened", id, { channel: channel.channel }),
        );
        return response(channel);
      }
      throw new HttpError(400, "Ação incompleta.");
    }
    throw new HttpError(404, "Rota não encontrada.");
  } catch (e) {
    return fail(e);
  }
}
export async function PATCH(request: Request, context: Context) {
  try {
    checkOrigin(request);
    authorize(request);
    await rateLimit(`admin-write:${fingerprint(request)}`, 60);
    const { path } = await context.params;
    if (path[0] !== "leads" || path.length !== 2)
      throw new HttpError(404, "Rota não encontrada.");
    const id = z.string().uuid().parse(path[1]);
    return response(
      await editLead(id, await payload(request, leadInputSchema.partial())),
    );
  } catch (e) {
    return fail(e);
  }
}
