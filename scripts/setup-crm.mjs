import { randomBytes } from "node:crypto";
import { existsSync, writeFileSync, readFileSync, chmodSync } from "node:fs";
if (!existsSync(".env.local")) {
  const password = randomBytes(18).toString("base64url");
  writeFileSync(
    ".env.local",
    `APP_ORIGIN=http://localhost:3001\nDATABASE_URL=file:./data/milia.sqlite\nCRM_ADMIN_PASSWORD=${password}\nCRM_SESSION_SECRET=${randomBytes(48).toString("hex")}\nOUTREACH_INTERVAL_MINUTES=30\n`,
    { mode: 0o600 },
  );
  writeFileSync(
    "LOCAL-ACCESS.txt",
    `Acesso local ao CRM Milia\nhttp://localhost:3001/crm\nSenha: ${password}\n\nCredencial privada. Não publique este arquivo. Para trocar a senha, edite CRM_ADMIN_PASSWORD em .env.local e reinicie o servidor.\n`,
    { mode: 0o600 },
  );
  console.log(
    "Configuração criada. Consulte LOCAL-ACCESS.txt para entrar no CRM.",
  );
} else {
  const content = readFileSync(".env.local", "utf8");
  if (
    !/CRM_ADMIN_PASSWORD=.+/.test(content) ||
    !/CRM_SESSION_SECRET=.+/.test(content)
  )
    throw new Error(
      "Preserve seu .env.local e acrescente as variáveis do .env.example.",
    );
  console.log("Configuração existente preservada.");
}
try {
  chmodSync(".env.local", 0o600);
} catch {}
// Next prioritizes .env.local. An old empty key there must not hide .env.
const local = readFileSync(".env.local", "utf8");
const cleaned = local.replace(/^OPENAI_API_KEY=\s*\r?\n/gm, "");
if (cleaned !== local) writeFileSync(".env.local", cleaned, { mode: 0o600 });
if (!existsSync(".env")) writeFileSync(".env", "# Cole sua chave depois de = e reinicie o servidor. Somente no servidor.\nOPENAI_API_KEY=\n\n# A mesma chave habilita o chat SPIN e a busca de potenciais leads.\nMODEL_DISCOVERY=gpt-4.1-mini\nMODEL_FAST=gpt-4.1-mini\nMODEL_REASONING=gpt-4.1-mini\n", { mode: 0o600 });
try { chmodSync(".env", 0o600); } catch {}
console.log("Arquivo .env pronto para sua chave OpenAI. Reinicie após editar.");
