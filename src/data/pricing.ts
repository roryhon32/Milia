import profile from "../../config/business-profile.json";
import type { PricingPlan } from "@/types";
export const pricingPlans: PricingPlan[] = profile.plans.map((plan) => ({
  ...plan,
  startingPrice: new Intl.NumberFormat("pt-BR", {
    style: "currency",
    currency: "BRL",
    maximumFractionDigits: 0,
  }).format(plan.price),
}));
export const pricingDisclaimer =
  "O valor final depende do escopo e das necessidades do projeto.";
