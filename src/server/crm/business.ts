import profile from "../../../config/business-profile.json";
import scoring from "../../../config/scoring.json";
import rules from "../../../config/sales-rules.json";
import type {
  Analysis,
  LeadInput,
  Recommendation,
  Requirements,
  Stage,
} from "./schemas";
export { profile, rules };
export function recommendPlan(r: Requirements): Recommendation {
  if (
    r.ecommerce ||
    r.complexIntegration ||
    r.authentication ||
    (r.pages ?? 1) > rules.professionalMaxPages
  )
    return {
      plan: "HUMAN_HANDOFF",
      price: null,
      reason:
        "A necessidade inclui funcionalidades fora dos dois planos publicados. É preciso validar escopo e preço com a equipe.",
    };
  if (!r.objective.trim() || r.pages === null)
    return {
      plan: "UNKNOWN",
      price: null,
      reason:
        "Antes de recomendar, precisamos entender o objetivo e a quantidade de páginas.",
    };
  const id =
    r.pages >= rules.professionalMinPages || r.scheduling || r.analytics
      ? "profissional"
      : "essencial";
  const plan = profile.plans.find((p) => p.id === id)!;
  return {
    plan: id,
    price: plan.price,
    reason:
      id === "essencial"
        ? "Uma apresentação institucional com contato cabe no Essencial. Não há requisito confirmado que justifique o plano maior agora."
        : "As páginas adicionais ou funcionalidades confirmadas justificam o Profissional; o escopo final será validado na proposta.",
  };
}
export function scoreLead(
  input: Pick<LeadInput, "website" | "verifiedSignals" | "requirements">,
  analysis: Analysis | null,
) {
  const signals: Record<string, boolean> = {
    ...analysis?.signals,
    noWebsite: input.requirements.hasWebsite === false,
    visualBusiness: input.verifiedSignals.visualBusiness,
  };
  if (input.verifiedSignals.source.trim()) {
    signals.activeInstagram = input.verifiedSignals.activeInstagram;
    signals.goodReputation = input.verifiedSignals.goodReputation;
  }
  const labels: Record<string, string> = {
    noWebsite: "Empresa confirmou que não possui site",
    missingTitle: "Título ausente no HTML recebido",
    missingDescription: "Meta description ausente",
    missingViewport: "Viewport não declarado no HTML",
    missingCta: "CTA não identificado no HTML",
    missingForm: "Formulário não identificado no HTML",
    insecureHttp: "Página servida sem HTTPS",
    activeInstagram: "Instagram ativo verificado",
    goodReputation: "Reputação pública verificada",
    visualBusiness: "Negócio visual confirmado",
    excellentWebsite: "Estrutura HTML completa; avaliação visual não realizada",
  };
  let score = 0;
  const reasons: string[] = [];
  for (const [key, weight] of Object.entries(scoring.weights))
    if (signals[key]) {
      score += weight;
      reasons.push(`${labels[key]} (${weight > 0 ? "+" : ""}${weight})`);
    }
  score = Math.max(0, Math.min(100, score));
  const priority =
    score >= scoring.thresholds.VERY_HIGH
      ? "VERY_HIGH"
      : score >= scoring.thresholds.HIGH
        ? "HIGH"
        : score >= scoring.thresholds.MEDIUM
          ? "MEDIUM"
          : "LOW";
  return { score, priority, reasons };
}
export const transitions: Record<Stage, Stage[]> = {
  NEW: ["RESEARCHING", "QUALIFIED", "LOST"],
  RESEARCHING: ["QUALIFIED", "LOST", "NEW"],
  QUALIFIED: ["CONTACT_READY", "NEGOTIATING", "LOST"],
  CONTACT_READY: ["CONTACTED", "QUALIFIED", "LOST"],
  CONTACTED: ["REPLIED", "FOLLOW_UP", "LOST"],
  REPLIED: ["QUALIFIED", "NEGOTIATING", "FOLLOW_UP", "LOST"],
  NEGOTIATING: ["WON", "LOST", "FOLLOW_UP"],
  WON: [],
  LOST: ["FOLLOW_UP"],
  FOLLOW_UP: ["CONTACT_READY", "REPLIED", "NEGOTIATING", "LOST"],
};
export function assertTransition(from: Stage, to: Stage) {
  if (from !== to && !transitions[from].includes(to))
    throw new Error("Transição de estágio não permitida.");
}
export function outreachIntervalMs() {
  const minutes = Number(
    process.env.OUTREACH_INTERVAL_MINUTES || rules.outreachIntervalMinutes,
  );
  return Math.max(30, Number.isFinite(minutes) ? minutes : 30) * 60000;
}
