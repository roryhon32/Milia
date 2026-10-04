import { createHmac, timingSafeEqual, createHash } from "node:crypto";
import { z } from "zod";
import { database, query, write, audit } from "../crm/db";

export class HttpError extends Error {
  constructor(
    public status: number,
    message: string,
  ) {
    super(message);
  }
}
function equal(a: string, b: string) {
  const x = Buffer.from(a),
    y = Buffer.from(b);
  return x.length === y.length && timingSafeEqual(x, y);
}
export function signToken(kind: string, id: string, expires: number) {
  const secret = process.env.CRM_SESSION_SECRET;
  if (!secret || secret.length < 32)
    throw new HttpError(
      503,
      "Configure CRM_SESSION_SECRET com ao menos 32 caracteres.",
    );
  const body = Buffer.from(JSON.stringify({ kind, id, expires })).toString(
    "base64url",
  );
  return `${body}.${createHmac("sha256", secret).update(body).digest("base64url")}`;
}
export function verifyToken(
  token: string | undefined,
  kind: string,
): string | null {
  try {
    if (!token || token.length > 1024) return null;
    const [body, signature] = token.split(".");
    const secret = process.env.CRM_SESSION_SECRET;
    if (!secret) return null;
    const expected = createHmac("sha256", secret)
      .update(body)
      .digest("base64url");
    if (!equal(signature, expected)) return null;
    const value = JSON.parse(Buffer.from(body, "base64url").toString());
    return value.kind === kind &&
      value.expires > Date.now() &&
      typeof value.id === "string"
      ? value.id
      : null;
  } catch {
    return null;
  }
}
export function cookies(request: Request, name: string) {
  return request.headers
    .get("cookie")
    ?.split(";")
    .map((v) => v.trim())
    .find((v) => v.startsWith(`${name}=`))
    ?.slice(name.length + 1);
}
export function authorize(request: Request) {
  if (!verifyToken(cookies(request, "milia_admin"), "admin"))
    throw new HttpError(401, "Entre no CRM para continuar.");
}
export function checkOrigin(request: Request) {
  const url = new URL(request.url);
  const allowed = process.env.APP_ORIGIN || url.origin;
  const origin = request.headers.get("origin");
  if (!origin || origin !== allowed)
    throw new HttpError(403, "Origem da requisição não permitida.");
}
export async function payload<T>(
  request: Request,
  schema: z.ZodType<T>,
): Promise<T> {
  if (!request.headers.get("content-type")?.includes("application/json"))
    throw new HttpError(415, "Envie JSON.");
  const reader = request.body?.getReader();
  let size = 0;
  const chunks: Uint8Array[] = [];
  if (!reader) throw new HttpError(400, "Dados ausentes.");
  while (true) {
    const { done, value } = await reader.read();
    if (done) break;
    size += value.length;
    if (size > 32768) {
      await reader.cancel();
      throw new HttpError(413, "Dados muito grandes.");
    }
    chunks.push(value);
  }
  try {
    const text = Buffer.concat(chunks).toString("utf8");
    return schema.parse(JSON.parse(text));
  } catch {
    throw new HttpError(400, "Dados inválidos. Confira os campos.");
  }
}
export function fingerprint(request: Request) {
  return createHash("sha256")
    .update(
      `${request.headers.get("x-forwarded-for") || "direct"}:${request.headers.get("user-agent") || "unknown"}`,
    )
    .digest("hex")
    .slice(0, 24);
}
export async function rateLimit(
  key: string,
  limit = 30,
  windowMs = 60000,
  now = Date.now(),
) {
  await write((db) => {
    const row = query<{ count: number; reset_at: number }>(
      db,
      "SELECT count, reset_at FROM rate_limits WHERE key=?",
      [key],
    )[0];
    if (row && row.reset_at > now && row.count >= limit) {
      audit(db, "rate_limit_exceeded", null, { scope: key.split(":")[0] });
      return false;
    }
    db.run("DELETE FROM rate_limits WHERE reset_at<?", [now]);
    const fresh = !row || row.reset_at <= now;
    db.run("INSERT OR REPLACE INTO rate_limits VALUES(?,?,?)", [
      key,
      fresh ? 1 : row.count + 1,
      fresh ? now + windowMs : row.reset_at,
    ]);
    return true;
  }).then((ok) => {
    if (!ok) throw new HttpError(429, "Muitas tentativas. Aguarde um pouco.");
  });
}
export async function loginPassword(password: string) {
  const expected = process.env.CRM_ADMIN_PASSWORD;
  if (!expected || expected.length < 12)
    throw new HttpError(
      503,
      "Execute npm run setup:crm para configurar o acesso local.",
    );
  if (!equal(password, expected)) throw new HttpError(401, "Senha incorreta.");
  return signToken("admin", "operator", Date.now() + 8 * 3600000);
}
export const securityHeaders = {
  "Cache-Control": "no-store",
  "X-Content-Type-Options": "nosniff",
  "Referrer-Policy": "same-origin",
};
export function response(data: unknown, status = 200) {
  return Response.json(data, { status, headers: securityHeaders });
}
export function fail(error: unknown) {
  if (error instanceof HttpError)
    return response({ error: error.message }, error.status);
  if (error instanceof z.ZodError)
    return response({ error: "Dados inválidos." }, 400);
  return response(
    { error: "Não foi possível concluir a operação. Tente novamente." },
    500,
  );
}
export function injectionRisk(
  text: string,
): "NONE" | "SUSPICIOUS" | "LIKELY_INJECTION" {
  const normalized = text
    .normalize("NFD")
    .replace(/\p{Diacritic}/gu, "")
    .toLowerCase();
  const danger =
    /(ignore.{0,50}(instruction|instru|regra)|read.{0,20}\.env|send.{0,30}(api.key|token)|execute.{0,30}(command|shell)|mostre.{0,30}(system.prompt|instrucoes|api.key)|reve(al|le).{0,30}(prompt|secret)|<\/?(system|developer)>)/s;
  if (danger.test(normalized)) return "LIKELY_INJECTION";
  return /(system prompt|developer message|api.?key|\.env|forget your rules|ignore previous)/.test(
    normalized,
  )
    ? "SUSPICIOUS"
    : "NONE";
}
export function sanitizeText(text: string, max = 5000) {
  return text
    .replace(/sk-[a-zA-Z0-9_-]{10,}/g, "[credencial omitida]")
    .replace(/[\u0000-\u0008\u000B\u000C\u000E-\u001F]/g, "")
    .slice(0, max);
}
export async function auditSecurity(leadId: string | null, text: string) {
  const level = injectionRisk(text);
  if (level !== "NONE")
    await write((db) =>
      audit(db, "prompt_injection_detected", leadId, { level }),
    );
  return level;
}
export async function serverStatus() {
  await database();
  return {
    aiConfigured: Boolean(process.env.OPENAI_API_KEY),
    authConfigured: Boolean(process.env.CRM_ADMIN_PASSWORD),
    database: "SQLite local, instância única",
  };
}
