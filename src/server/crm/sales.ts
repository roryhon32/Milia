import { profile, recommendPlan, scoreLead } from "./business";
import { getLead, mutateLead, recordInteraction, history } from "./repository";
import { answerSpin } from "./spin";
import { interaction, audit } from "./db";
import { type Lead, type SalesState } from "./schemas";
import {
  auditSecurity,
  injectionRisk,
  sanitizeText,
  HttpError,
} from "../security/guard";
import { OpenAILanguageProvider } from "../integrations/llm";
import { PublicWebsiteProvider } from "../integrations/website";

const activeAnalysis = new Set<string>();
const activeConversations = new Set<string>();
export async function analyzeLead(id: string) {
  if (activeAnalysis.size >= 2 || activeAnalysis.has(id))
    throw new HttpError(409, "Uma análise já está em andamento. Aguarde.");
  activeAnalysis.add(id);
  try {
    const lead = await getLead(id);
    if (!lead.website) throw new HttpError(400, "Informe o site da empresa.");
    let analysis;
    try {
      analysis = await new PublicWebsiteProvider().analyze(lead.website);
    } catch (e) {
      throw new HttpError(
        422,
        e instanceof Error ? e.message : "Consulta pública indisponível.",
      );
    }
    await auditSecurity(id, analysis.mainText);
    return mutateLead(id, "website_analyzed", (current, db) => {
      if (current.website !== lead.website)
        throw new HttpError(
          409,
          "O site foi alterado durante a análise. Consulte novamente.",
        );
      current.analysis = analysis;
      current.qualification = null;
      current.requirements.hasWebsite = true;
      const social = analysis.socials.find((url) =>
        url.includes("instagram.com"),
      );
      if (!current.instagram && social)
        current.instagram = social.slice(0, 200);
      const score = scoreLead(current, analysis);
      current.score = score.score;
      current.priority = score.priority;
      current.scoreReasons = score.reasons;
      current.memory.companyContext =
        `${current.company}: ${analysis.title}. ${analysis.description}`.slice(
          0,
          1500,
        );
      current.memory.painPoints = analysis.findings
        .filter((f) =>
          /ausente|não identificado|não declarad|não encontrado/.test(
            f.finding,
          ),
        )
        .map((f) => f.finding)
        .slice(0, 10);
      interaction(db, id, "website_analyzed", {
        url: analysis.url,
        findings: analysis.findings.length,
      });
      audit(db, "lead_scored", id, {
        score: score.score,
        reasons: score.reasons,
      });
    });
  } finally {
    activeAnalysis.delete(id);
  }
}
export function defaultApproach(lead: Lead) {
  const finding = lead.analysis?.findings.find(
    (f) =>
      f.category === "CONVERSION" &&
      f.confidence >= 0.65 &&
      /não identificado/.test(f.finding),
  );
  const observation = finding
    ? `Na análise do HTML do site da ${lead.company}, ${finding.finding.toLowerCase()}. Pode haver elementos que não apareceram nessa consulta.`
    : lead.requirements.hasWebsite === false
      ? `Você informou que a ${lead.company} ainda não tem um site.`
      : lead.requirements.objective
        ? `Vi que o objetivo da ${lead.company} é ${lead.requirements.objective}.`
        : `Gostaria de entender como a ${lead.company} apresenta seus serviços e recebe novos contatos hoje.`;
  return `Olá${lead.contactName ? `, ${lead.contactName}` : ""}! Sou da Milia Co. ${observation} Podemos pensar em uma apresentação mais clara dos serviços e do contato. Isso é algo que vocês querem melhorar agora?`;
}
export async function generateApproach(id: string) {
  const lead = await getLead(id);
  let draft = defaultApproach(lead),
    provider = "deterministic";
  if (process.env.OPENAI_API_KEY)
    try {
      const generated = await new OpenAILanguageProvider().generate(
        lead,
        "Redija abordagem inicial contextual usando apenas os fatos disponíveis, uma oportunidade e uma pergunta curta. Não recomende plano sem necessidade identificada.",
      );
      draft = generated.message;
      provider = "openai";
    } catch {
      provider = "deterministic_fallback";
    }
  return mutateLead(id, "message_generated", (current, db) => {
    if (current.updatedAt !== lead.updatedAt)
      throw new HttpError(
        409,
        "O lead mudou durante a geração. Gere novamente.",
      );
    current.draft = draft;
    current.draftApproved = false;
    interaction(db, id, "message_generated", { provider, message: draft });
  });
}
function money(value: number) {
  return new Intl.NumberFormat("pt-BR", {
    style: "currency",
    currency: "BRL",
  }).format(value);
}
export function answerCommercial(
  lead: Lead,
  text: string,
): { message: string; state: SalesState; next: string } {
  const normalized = text
    .normalize("NFD")
    .replace(/\p{Diacritic}/gu, "")
    .toLowerCase();
  if (injectionRisk(text) !== "NONE")
    return {
      message:
        "Posso ajudar com o projeto da sua empresa, os serviços e os planos da Milia. Qual resultado você quer alcançar com seu site?",
      state: "DISCOVERY",
      next: "ask:objective",
    };
  if (
    /falar.{0,20}(pessoa|humano)|atendente|equipe|(falar|conversar|atendimento).{0,40}(whatsapp|wpp)|^(whatsapp|wpp)$/.test(
      normalized,
    )
  )
    return {
      message:
        "Claro. Você pode usar o botão de contato humano para levar um resumo da conversa ao WhatsApp da equipe.",
      state: "HUMAN_HANDOFF",
      next: "Contato humano",
    };
  if (
    /(receita de|futebol|politica|previsao do tempo|piada|programar malware|bitcoin)/.test(
      normalized,
    )
  )
    return {
      message:
        "Aqui eu ajudo com sites e soluções digitais da Milia. Você quer criar um site ou melhorar o que já tem?",
      state: "DISCOVERY",
      next: "ask:objective",
    };
  if (
    /quais (sao os )?servicos|o que voces fazem|que servicos|o que a milia faz/.test(
      normalized,
    )
  )
    return {
      message: `A Milia trabalha com ${profile.services.map((s) => s.title).join(", ")}. Primeiro entendemos o objetivo e definimos o escopo. O que você gostaria de melhorar na sua empresa?`,
      state: "VALUE_PRESENTATION",
      next: "ask:objective",
    };
  const faqKey = /hospedagem/.test(normalized)
    ? "hospedagem"
    : /dominio/.test(normalized)
      ? "dominio"
      : /google|primeira posicao/.test(normalized)
        ? "google"
        : /pagamento|pagar tudo|parcel/.test(normalized)
          ? "pagamento"
          : /quanto tempo|prazo de entrega/.test(normalized)
            ? "tempo"
            : /manutencao|primeiro ano/.test(normalized)
              ? "apos-primeiro-ano"
              : /instagram/.test(normalized)
                ? "instagram"
                : null;
  if (faqKey) {
    const faq = profile.faq.find((f) => f.id === faqKey);
    if (faq)
      return {
        message: `${faq.answer} Qual é o principal objetivo do seu projeto?`,
        state: "VALUE_PRESENTATION",
        next: "ask:objective",
      };
  }
  if (/caro|sem dinheiro|preco alto|fora do orcamento/.test(normalized))
    return {
      message:
        "Entendo. Podemos ajustar o escopo à necessidade, sem incluir funcionalidades que você não vai usar. Qual faixa de investimento faz sentido para você?",
      state: "OBJECTION_HANDLING",
      next: "ask:budget",
    };
  if (
    lead.salesState === "PLAN_RECOMMENDATION" &&
    /^(sim|quero|vamos|pode|ok)/.test(normalized)
  )
    return {
      message:
        "Ótimo. A equipe vai validar o escopo e as condições antes de você decidir. Pode salvar seu contato para retorno ou levar o resumo ao WhatsApp.",
      state: "CLOSING",
      next: "Enviar proposta validada pela equipe",
    };
  if (/preco|valor|quanto custa|planos/.test(normalized)) {
    return {
      message: `Os valores publicados começam em ${profile.plans.map((p) => `${money(p.price)} no ${p.name}`).join(" e ")}. O escopo define a proposta final. Você precisa de uma página ou de várias páginas?`,
      state: "NEED_IDENTIFICATION",
      next: "ask:pages",
    };
  }
  if (!lead.requirements.objective)
    return {
      message:
        "Qual é o principal objetivo: apresentar a empresa, receber orçamentos ou realizar alguma operação online?",
      state: "DISCOVERY",
      next: "ask:objective",
    };
  if (lead.requirements.hasWebsite === null)
    return {
      message: "Sua empresa já possui um site?",
      state: "NEED_IDENTIFICATION",
      next: "ask:hasWebsite",
    };
  if (lead.requirements.pages === null)
    return {
      message:
        "Você imagina uma página com as informações principais ou várias páginas? Se souber, pode dizer quantas.",
      state: "NEED_IDENTIFICATION",
      next: "ask:pages",
    };
  const recommendation = recommendPlan(lead.requirements);
  if (recommendation.plan === "HUMAN_HANDOFF")
    return {
      message:
        recommendation.reason +
        " Posso organizar um resumo para a equipe avaliar com você.",
      state: "HUMAN_HANDOFF",
      next: "Validar escopo complexo",
    };
  if (
    lead.memory.nextBestAction !== "ask:functions" &&
    !lead.memory.interests.includes("Funcionalidades confirmadas")
  )
    return {
      message:
        "Além de apresentar sua empresa e receber contatos, precisa de agendamento, vendas online ou integração com outro sistema?",
      state: "NEED_IDENTIFICATION",
      next: "ask:functions",
    };
  if (
    lead.memory.nextBestAction !== "ask:urgency" &&
    !lead.requirements.urgency
  )
    return {
      message:
        "Quando gostaria de começar? Pode ser agora ou só uma pesquisa inicial.",
      state: "NEED_IDENTIFICATION",
      next: "ask:urgency",
    };
  return {
    message: `${recommendation.reason} ${recommendation.price ? `O ${profile.plans.find((p) => p.id === recommendation.plan)?.name} começa em ${money(recommendation.price)}.` : ""} Quer conversar com a equipe para validar o escopo e receber uma proposta?`,
    state: "PLAN_RECOMMENDATION",
    next: "Validar proposta com a equipe",
  };
}
function extractNeeds(lead: Lead, text: string) {
  const plain = sanitizeText(text, 2000);
  const n = plain
    .normalize("NFD")
    .replace(/\p{Diacritic}/gu, "")
    .toLowerCase();
  const pending = lead.memory.nextBestAction;
  if (
    pending === "ask:objective" &&
    !/^(quanto|qual|como|oi|ola|bom dia)/i.test(n)
  )
    lead.requirements.objective = plain;
  if (
    /nao (tenho|temos|possuo).{0,12}site|sem site/.test(n) ||
    (pending === "ask:hasWebsite" && /^(nao|ainda nao)/.test(n))
  )
    lead.requirements.hasWebsite = false;
  else if (
    /ja (tenho|temos).{0,12}site/.test(n) ||
    (pending === "ask:hasWebsite" && /^sim/.test(n))
  )
    lead.requirements.hasWebsite = true;
  const pages = n.match(/(\d+)\s*(pagina|page)/);
  if (pages)
    lead.requirements.pages = Math.min(100, Math.max(1, Number(pages[1])));
  else if (pending === "ask:pages") {
    if (/uma|unica|^1$/.test(n)) lead.requirements.pages = 1;
    else if (/^\d{1,2}$/.test(n))
      lead.requirements.pages = Math.max(1, Number(n));
    else if (/varias|multiplas/.test(n)) lead.requirements.pages = 3;
  }
  if (pending === "ask:functions") {
    lead.memory.interests = Array.from(
      new Set([...lead.memory.interests, "Funcionalidades confirmadas"]),
    );
    if (!/^nao|apenas|so (o|a|contato)/.test(n)) {
      if (/vender|loja|ecommerce|pagamento online/.test(n))
        lead.requirements.ecommerce = true;
      if (/agend|reserv/.test(n)) lead.requirements.scheduling = true;
      if (/crm|integracao|sistema/.test(n))
        lead.requirements.complexIntegration = true;
    }
  }
  if (pending === "ask:urgency")
    lead.requirements.urgency = plain.slice(0, 200);
  if (pending === "ask:budget") {
    const value = n.match(/[\d.,]+/);
    if (value) {
      const budget = Number(value[0].replace(/\./g, "").replace(",", "."));
      if (Number.isFinite(budget) && budget <= 10000000) {
        lead.requirements.budget = budget;
        lead.estimatedBudget = budget;
        lead.memory.budgetSignals = [`Faixa informada: ${budget} reais`];
      }
    }
  }
  if (
    /quero (uma )?loja|preciso vender online|quero vender online|e-commerce|ecommerce/.test(
      n,
    ) &&
    !/nao (quero|preciso)/.test(n)
  )
    lead.requirements.ecommerce = true;
  if (/preciso.{0,20}(login|area restrita)|usuarios.*login/.test(n))
    lead.requirements.authentication = true;
  if (!lead.requirements.objective && /quero|preciso|gostaria/.test(n))
    lead.requirements.objective = plain;
  if (/caro|preco|orcamento/.test(n))
    lead.memory.objections = Array.from(
      new Set([...lead.memory.objections, plain.slice(0, 200)]),
    ).slice(-12);
}
export async function continueConversation(
  id: string,
  raw: string,
  kind = "lead_replied",
) {
  if (activeConversations.has(id))
    throw new HttpError(409, "Aguarde a resposta anterior para continuar.");
  activeConversations.add(id);
  try {
    return await converse(id, raw, kind);
  } finally {
    activeConversations.delete(id);
  }
}
async function converse(id: string, raw: string, kind: string) {
  const visitor = kind === "visitor_message";
  const risk = await auditSecurity(id, raw);
  const text = sanitizeText(raw, 2000);
  await recordInteraction(id, kind, text);
  let reply = "",
    mode = "deterministic";
  const lead = await mutateLead(id, "conversation_updated", (current, db) => {
    if (risk === "NONE") extractNeeds(current, text);
    current.recommendation = recommendPlan(current.requirements);
    current.memory.recommendedPlan = current.recommendation.plan;
    current.memory.needs = current.requirements.objective
      ? [current.requirements.objective.slice(0, 200)]
      : [];
    const result = visitor && risk === "NONE" ? answerSpin(current, text) : answerCommercial(current, text);
    reply = result.message;
    current.salesState = result.state;
    current.memory.nextBestAction = result.next;
    current.nextAction = result.next;
    current.memory.lastSummary =
      (visitor ? `Objetivo relatado: ${current.requirements.objective || "em descoberta"}. Contexto recente: ${text}. Próxima ação: ${result.next}.` : `Objetivo: ${current.requirements.objective || "em descoberta"}. Páginas: ${current.requirements.pages ?? "não informadas"}. Próxima ação: ${result.next}.`).slice(
        0,
        1000,
      );
    current.memory.sentiment = current.memory.objections.length
      ? "CONCERNED"
      : "NEUTRAL";
    const score = scoreLead(current, current.analysis);
    current.score = score.score;
    current.priority = score.priority;
    current.scoreReasons = score.reasons;
    audit(db, "plan_recommended", id, {
      plan: current.recommendation.plan,
      reason: current.recommendation.reason,
    });
  });
  // Optional linguistic assistance; business state and recommendation remain authoritative.
  if (process.env.OPENAI_API_KEY && risk === "NONE")
    try {
      const conversation = visitor ? (await history(id)).filter(i => ["visitor_message", "sales_response"].includes(i.kind)).slice(-10).map(i => ({ role: (i.kind === "visitor_message" ? "user" : "assistant") as "user" | "assistant", text: String(i.data.text || "") })) : undefined;
      const output = await new OpenAILanguageProvider().generate(
        lead,
        visitor ? "Responda à última mensagem do visitante levando em conta a conversa acima, de forma consultiva e relevante; apresente nosso trabalho quando fizer sentido." : `Reformule brevemente esta resposta aprovada sem mudar sua recomendação ou a pergunta: ${reply}`,
        visitor ? { style: "spin", conversation } : {},
      );
      reply = output.message;
      mode = "openai";
      if (visitor) await mutateLead(id, "visitor_ai_summary_updated", current => { current.memory.lastSummary = output.summary; });
    } catch {
      mode = "deterministic_fallback";
    }
  await recordInteraction(id, "sales_response", reply);
  if (kind === "lead_replied")
    await mutateLead(id, "response_draft_ready", (current) => {
      current.draft = reply;
      current.draftApproved = false;
    });
  return { lead: await getLead(id), reply, mode };
}
