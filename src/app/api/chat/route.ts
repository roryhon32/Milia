import { z } from "zod";
import {
  checkOrigin,
  payload,
  response,
  fail,
  rateLimit,
  fingerprint,
} from "@/server/security/guard";
import {
  currentChatLead,
  createChat,
  chatCookie,
  captureChatLead,
} from "@/server/crm/chat";
import { history } from "@/server/crm/repository";
import { continueConversation } from "@/server/crm/sales";
export const runtime = "nodejs";
export const dynamic = "force-dynamic";
const schema = z.discriminatedUnion("action", [
  z
    .object({
      action: z.literal("message"),
      text: z.string().trim().min(1).max(2000),
      consent: z.literal(true),
    })
    .strict(),
  z
    .object({
      action: z.literal("capture"),
      name: z.string().trim().min(1).max(100),
      company: z.string().trim().max(200),
      contact: z
        .string()
        .trim()
        .max(254)
        .refine(
          (v) =>
            /^[+\d\s().-]{8,30}$/.test(v) ||
            z.string().email().safeParse(v).success,
          "Contato inválido",
        ),
      consent: z.literal(true),
    })
    .strict(),
]);
export async function GET(request: Request) {
  try {
    await rateLimit(`chat-read:${fingerprint(request)}`, 40);
    const lead = await currentChatLead(request);
    return response(
      lead
        ? {
            aiConfigured: Boolean(process.env.OPENAI_API_KEY?.trim()),
            messages: (await history(lead.id))
              .filter((i) =>
                ["visitor_message", "sales_response"].includes(i.kind),
              )
              .slice(-20)
              .map((i) => ({
                role: i.kind === "sales_response" ? "assistant" : "user",
                text: i.data.text,
              })),
            recommendation: lead.recommendation,
            memory: lead.memory.lastSummary,
          }
        : { messages: [], aiConfigured: Boolean(process.env.OPENAI_API_KEY?.trim()) },
    );
  } catch (e) {
    return fail(e);
  }
}
export async function POST(request: Request) {
  try {
    checkOrigin(request);
    await rateLimit("chat:global", 60);
    await rateLimit(`chat:${fingerprint(request)}`, 15);
    const input = await payload(request, schema);
    if (input.action === "capture") {
      await captureChatLead(request, input);
      return response({ ok: true });
    }
    let lead = await currentChatLead(request),
      token: string | null = null;
    if (!lead) {
      const session = await createChat();
      lead = session.lead;
      token = session.token;
    }
    const result = await continueConversation(
      lead.id,
      input.text,
      "visitor_message",
    );
    return Response.json(
      {
        reply: result.reply,
        state: result.lead.salesState,
        recommendation: result.lead.recommendation,
        mode: result.mode,
        summary: result.lead.memory.lastSummary,
      },
      {
        headers: {
          "Cache-Control": "no-store",
          ...(token ? { "Set-Cookie": chatCookie(request, token) } : {}),
        },
      },
    );
  } catch (e) {
    return fail(e);
  }
}
