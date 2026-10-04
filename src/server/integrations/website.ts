import { lookup } from "node:dns/promises";
import http from "node:http";
import https from "node:https";
import ipaddr from "ipaddr.js";
import { load } from "cheerio";
import robotsParser from "robots-parser";
import { analysisSchema, type Analysis } from "../crm/schemas";
import { injectionRisk, sanitizeText } from "../security/guard";

export function isPublicAddress(address: string) {
  try {
    let parsed = ipaddr.parse(address);
    if (
      parsed.kind() === "ipv6" &&
      (parsed as ipaddr.IPv6).isIPv4MappedAddress()
    )
      parsed = (parsed as ipaddr.IPv6).toIPv4Address();
    return parsed.range() === "unicast";
  } catch {
    return false;
  }
}
export async function validateTarget(raw: string) {
  const url = new URL(raw);
  if (
    !["http:", "https:"].includes(url.protocol) ||
    url.username ||
    url.password ||
    (url.port && !["80", "443"].includes(url.port))
  )
    throw new Error("URL pública HTTP/HTTPS necessária.");
  const host = url.hostname.replace(/^\[|\]$/g, "");
  if (
    host === "localhost" ||
    host.endsWith(".localhost") ||
    host.endsWith(".local")
  )
    throw new Error("Endereço local não permitido.");
  const addresses = await lookup(host, { all: true });
  if (!addresses.length || addresses.some((a) => !isPublicAddress(a.address)))
    throw new Error("Endereço privado ou reservado bloqueado.");
  return { url, address: addresses[0] };
}
type Page = {
  url: string;
  body: string;
  status: number;
  contentType: string;
  bytes: number;
  elapsedMs: number;
};
export async function safeFetch(
  raw: string,
  redirects = 0,
  before?: (url: string) => Promise<void>,
): Promise<Page> {
  if (redirects > 3) throw new Error("Muitos redirecionamentos.");
  const { url, address } = await validateTarget(raw);
  if (before) await before(url.href);
  const started = Date.now();
  return new Promise((resolve, reject) => {
    const transport = url.protocol === "https:" ? https : http;
    const req = transport.request(
      url,
      {
        method: "GET",
        family: address.family,
        headers: {
          "User-Agent": "MiliaResearchBot/1.0 (+https://miliaco.com)",
          Accept: "text/html,text/plain,application/xml;q=0.9",
          "Accept-Encoding": "identity",
        },
        lookup: (_host, _options, callback) =>
          callback(null, address.address, address.family),
      },
      (res) => {
        if (
          res.statusCode &&
          res.statusCode >= 300 &&
          res.statusCode < 400 &&
          res.headers.location
        ) {
          res.resume();
          const next = new URL(res.headers.location, url).href;
          safeFetch(next, redirects + 1, before).then(resolve, reject);
          return;
        }
        const chunks: Buffer[] = [];
        let bytes = 0;
        res.on("data", (chunk) => {
          bytes += chunk.length;
          if (bytes > 1000000) {
            req.destroy(new Error("Página excede o limite de 1 MB."));
            return;
          }
          chunks.push(Buffer.from(chunk));
        });
        res.on("end", () =>
          resolve({
            url: url.href,
            body: Buffer.concat(chunks).toString("utf8"),
            status: res.statusCode || 0,
            contentType: String(res.headers["content-type"] || ""),
            bytes,
            elapsedMs: Date.now() - started,
          }),
        );
        res.on("error", reject);
      },
    );
    const deadline = setTimeout(
      () => req.destroy(new Error("Tempo de consulta excedido.")),
      8000,
    );
    req.on("close", () => clearTimeout(deadline));
    req.on("error", reject);
    req.end();
  });
}
export function extractWebsite(html: string, url: string): Analysis {
  const $ = load(html);
  $("script,style,noscript,svg,iframe,template").remove();
  const text = sanitizeText($("body").text().replace(/\s+/g, " ").trim());
  const title = sanitizeText($("title").first().text().trim(), 300);
  const description = sanitizeText(
    $("meta[name='description']").attr("content") || "",
    500,
  );
  const headings = $("h1,h2,h3")
    .map((_i, e) => sanitizeText($(e).text().trim(), 300))
    .get()
    .slice(0, 20);
  const links = $("a")
    .map((_i, e) => ({
      href: $(e).attr("href") || "",
      text: $(e).text().trim(),
    }))
    .get();
  const cta = links.find((l) =>
    /contato|or[cç]amento|agendar|whatsapp|wa\.me\/|tel:|mailto:|solicitar|comprar|fale|contact|quote/i.test(
      `${l.text} ${l.href}`,
    ),
  );
  const findings: Analysis["findings"] = [];
  const add = (
    category: Analysis["findings"][number]["category"],
    finding: string,
    evidence: string,
    confidence = 0.95,
  ) =>
    findings.push({
      category,
      finding,
      evidence: sanitizeText(evidence, 500),
      confidence,
      source: url,
    });
  const signals = {
    missingTitle: !title,
    missingDescription: !description,
    missingViewport: !$("meta[name='viewport']").length,
    missingCta: !cta,
    missingForm: !$("form").length,
    insecureHttp: new URL(url).protocol !== "https:",
    excellentWebsite: false,
  };
  if (!title)
    add(
      "SEO",
      "Título não encontrado",
      "O HTML recebido não contém um title preenchido.",
    );
  else add("SEO", "Título identificado", title);
  if (!description)
    add(
      "SEO",
      "Descrição ausente",
      "Nenhuma meta description no HTML recebido.",
    );
  if (!$("h1").length) add("SEO", "H1 ausente", "Nenhum h1 no HTML recebido.");
  const canonical = $("link[rel='canonical']").attr("href");
  if (canonical) add("SEO", "Canonical identificado", canonical);
  else
    add(
      "SEO",
      "Canonical não identificado",
      "Nenhum link rel=canonical no HTML recebido.",
      0.85,
    );
  if (signals.missingViewport)
    add(
      "UX",
      "Viewport não declarado",
      "Meta viewport ausente. Isto não confirma problema visual no celular.",
      0.8,
    );
  if (!cta)
    add(
      "CONVERSION",
      "CTA não identificado",
      "Nenhum link de contato/orçamento reconhecido no HTML estático; conteúdo gerado por JavaScript pode não estar presente.",
      0.65,
    );
  else
    add(
      "CONVERSION",
      "Contato ou CTA identificado",
      `${cta.text}: ${cta.href}`,
      0.85,
    );
  if (signals.missingForm)
    add(
      "CONVERSION",
      "Formulário não identificado",
      "Nenhum form no HTML recebido. Botões e integrações externas podem existir.",
      0.8,
    );
  if (signals.insecureHttp)
    add("TECHNICAL", "Página recebida por HTTP", "URL final não usa HTTPS.");
  const lazyMissing = $("img").filter((_i, e) => !$(e).attr("loading")).length;
  if (lazyMissing > 10)
    add(
      "TECHNICAL",
      "Muitas imagens sem loading declarado",
      `${lazyMissing} imagens sem atributo loading; peso de arquivos não medido.`,
      0.75,
    );
  const injection = injectionRisk(`${title} ${description} ${text}`);
  if (injection !== "NONE")
    add(
      "SECURITY",
      "Texto com possível tentativa de instrução",
      "Conteúdo classificado como dados externos; não executado.",
      0.9,
    );
  const socials = links
    .filter((l) =>
      /^(https?:\/\/)(www\.)?(instagram\.com|facebook\.com|linkedin\.com)\//i.test(
        l.href,
      ),
    )
    .map((l) => l.href)
    .slice(0, 10);
  add(
    "UX",
    $("nav").length
      ? "Navegação semântica identificada"
      : "Navegação semântica não identificada",
    $("nav").length
      ? `${$("nav").length} elemento(s) nav no HTML recebido.`
      : "Nenhum nav no HTML recebido; isso não exclui menus implementados de outra forma.",
    0.85,
  );
  for (const [name, pattern] of [
    ["Telefone", /^tel:/i],
    ["E-mail", /^mailto:/i],
    ["WhatsApp", /wa\.me|api\.whatsapp\.com/i],
    ["Agendamento", /agend|reserv|booking/i],
    ["Portfólio", /portfolio|portfólio|projetos|cases/i],
  ] as const) {
    const link = links.find((l) => pattern.test(`${l.href} ${l.text}`));
    if (link)
      add(
        "CONVERSION",
        `${name} identificado no HTML`,
        `${link.text}: ${link.href}`,
        0.85,
      );
  }
  if (/depoimentos|testimonials|clientes dizem/i.test(text))
    add(
      "UX",
      "Seção textual de depoimentos identificada",
      "Termos de depoimentos aparecem no texto; autenticidade e resultados não verificados.",
      0.7,
    );
  return analysisSchema.parse({
    url,
    analyzedAt: new Date().toISOString(),
    title,
    description,
    headings,
    mainText: text,
    socials,
    findings,
    signals,
    injection,
    limitations: [
      "Análise do HTML recebido, sem executar JavaScript.",
      "Responsividade visual, reputação, atividade social e Core Web Vitals não verificados.",
      "Sem download ou medição individual das imagens.",
    ],
  });
}
export interface WebsiteProvider {
  analyze(url: string): Promise<Analysis>;
}
export class PublicWebsiteProvider implements WebsiteProvider {
  async analyze(raw: string) {
    const url = (await validateTarget(raw)).url;
    const robotsUrl = new URL("/robots.txt", url).href;
    const policies = new Map<string, { page: Page; last: number }>();
    const before = async (target: string) => {
      const targetUrl = new URL(target),
        robotUrl = new URL("/robots.txt", targetUrl).href;
      let policy = policies.get(targetUrl.origin);
      if (!policy) {
        let page;
        try {
          page = await safeFetch(robotUrl);
        } catch {
          throw new Error(
            "Não foi possível verificar robots.txt. Tente mais tarde.",
          );
        }
        if (page.status !== 200 && ![404, 410].includes(page.status))
          throw new Error(
            "Robots ou limite do servidor impedem esta consulta.",
          );
        policy = { page, last: Date.now() };
        policies.set(targetUrl.origin, policy);
      }
      const parser = robotsParser(robotUrl, policy.page.body);
      if (
        policy.page.status === 200 &&
        parser.isAllowed(target, "MiliaResearchBot") === false
      )
        throw new Error("O robots.txt não permite analisar esta página.");
      const delay =
        policy.page.status === 200
          ? Number(parser.getCrawlDelay("MiliaResearchBot") || 0)
          : 0;
      if (delay > 5)
        throw new Error(
          "O intervalo solicitado pelo robots exige consulta manual.",
        );
      const wait = Math.max(0, delay * 1000 - (Date.now() - policy.last));
      if (wait) await new Promise((resolve) => setTimeout(resolve, wait));
      policy.last = Date.now();
    };
    const page = await safeFetch(url.href, 0, before);
    if (page.status !== 200)
      throw new Error(
        `Site respondeu com HTTP ${page.status}. Análise não concluída.`,
      );
    const robots = policies.get(url.origin)!.page;
    if (!/text\/html/i.test(page.contentType))
      throw new Error("A fonte não é uma página HTML.");
    const result = extractWebsite(page.body, page.url);
    result.findings.push({
      category: "TECHNICAL",
      finding: "Resposta HTTP medida",
      evidence: `HTML: ${page.bytes} bytes; resposta em ${page.elapsedMs} ms. Não é medição de Core Web Vitals.`,
      confidence: 1,
      source: page.url,
    });
    result.findings.push({
      category: "SEO",
      finding:
        robots.status === 200 ? "Robots acessível" : "Robots não disponível",
      evidence: `HTTP ${robots.status}`,
      confidence: 1,
      source: robotsUrl,
    });
    try {
      const sitemap = await safeFetch(
        new URL("/sitemap.xml", page.url).href,
        0,
        before,
      );
      result.findings.push({
        category: "SEO",
        finding:
          sitemap.status === 200 && /<(urlset|sitemapindex)/i.test(sitemap.body)
            ? "Sitemap XML acessível"
            : "Sitemap XML não confirmado",
        evidence: `HTTP ${sitemap.status}; consulta limitada a /sitemap.xml.`,
        confidence: 0.9,
        source: sitemap.url,
      });
    } catch {
      result.limitations.push("Sitemap não pôde ser consultado.");
    }
    return analysisSchema.parse(result);
  }
}
