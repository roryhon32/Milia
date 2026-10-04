import fs from "node:fs";
import profile from "../config/business-profile.json";
import { pricingPlans } from "../src/data/pricing";
import { servicesData } from "../src/data/services";
import { audienceSegments } from "../src/data/audience";
import { faqData } from "../src/data/faq";
const plans = pricingPlans.map((plan) => ({
  ...plan,
  price: Number(plan.startingPrice.replace(/[^\d,]/g, "").replace(",", ".")),
}));
fs.writeFileSync(
  "config/business-profile.json",
  JSON.stringify(
    {
      ...profile,
      name: "Milia Co.",
      description:
        "Estúdio digital de sites institucionais, landing pages e integrações.",
      valueProposition:
        "Presença digital profissional e contato comercial simples.",
      services: servicesData,
      audience: audienceSegments,
      regions: ["Brasil", "Projetos internacionais conforme escopo"],
      differentials: [
        "Design responsivo",
        "SEO técnico",
        "Contato por WhatsApp",
        "Escopo e proposta antes da contratação",
      ],
      plans,
      faq: faqData,
      tone: "Português brasileiro; consultivo, breve, claro, sem jargões ou pressão.",
      commercialRestrictions: [
        "Sem garantia de vendas ou ranking",
        "Sem urgência ou prova social inventada",
        "Sem desconto sem validação",
        "Recomendar o menor escopo suficiente",
        "Projetos complexos exigem avaliação humana; não existe plano premium cadastrado",
      ],
      ctas: [
        "Solicitar proposta",
        "Comparar planos",
        "Conversar pelo WhatsApp",
      ],
      visual: {
        background: "#0C0D0F",
        text: "#F4F4F1",
        typography: ["Space Grotesk", "Plus Jakarta Sans", "JetBrains Mono"],
        style: "Editorial, monocromático e compacto",
      },
    },
    null,
    2,
  ),
);
