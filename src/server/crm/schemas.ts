import { z } from "zod";
import type { Qualification } from "./qualification-schema";

export const stages = [
  "NEW",
  "RESEARCHING",
  "QUALIFIED",
  "CONTACT_READY",
  "CONTACTED",
  "REPLIED",
  "NEGOTIATING",
  "WON",
  "LOST",
  "FOLLOW_UP",
] as const;
export const states = [
  "DISCOVERY",
  "NEED_IDENTIFICATION",
  "VALUE_PRESENTATION",
  "PLAN_RECOMMENDATION",
  "OBJECTION_HANDLING",
  "CLOSING",
  "FOLLOW_UP",
  "HUMAN_HANDOFF",
] as const;
const short = z.string().trim().max(200);
const notes = z.string().trim().max(3000);
export const requirementsSchema = z
  .object({
    hasWebsite: z.boolean().nullable().default(null),
    pages: z.number().int().min(1).max(100).nullable().default(null),
    objective: notes.default(""),
    ecommerce: z.boolean().default(false),
    scheduling: z.boolean().default(false),
    analytics: z.boolean().default(false),
    complexIntegration: z.boolean().default(false),
    authentication: z.boolean().default(false),
    urgency: short.default(""),
    budget: z.number().min(0).max(10000000).nullable().default(null),
  })
  .strict();
export const leadInputSchema = z
  .object({
    company: short.min(1),
    segment: short.default(""),
    contactName: short.default(""),
    phone: z
      .string()
      .trim()
      .max(30)
      .regex(/^[+\d\s().-]*$/)
      .default(""),
    email: z.union([z.literal(""), z.string().email().max(254)]).default(""),
    instagram: short.default(""),
    website: z.union([z.literal(""), z.string().url().max(2048)]).default(""),
    city: short.default(""),
    source: short.default("MANUAL"),
    owner: short.default("Milia"),
    nextAction: short.default("Entender a necessidade"),
    nextActionAt: z.string().datetime().nullable().default(null),
    interest: notes.default(""),
    estimatedBudget: z.number().min(0).max(10000000).nullable().default(null),
    observations: notes.default(""),
    optOut: z.boolean().default(false),
    verifiedSignals: z
      .object({
        activeInstagram: z.boolean().default(false),
        goodReputation: z.boolean().default(false),
        visualBusiness: z.boolean().default(false),
        source: short.default(""),
      })
      .strict()
      .default({}),
    requirements: requirementsSchema.default({}),
  })
  .strict();
export const findingSchema = z
  .object({
    category: z.enum(["SEO", "UX", "TECHNICAL", "CONVERSION", "SECURITY"]),
    finding: z.string().max(400),
    evidence: z.string().max(500),
    confidence: z.number().min(0).max(1),
    source: z.string().max(2048),
  })
  .strict();
export const analysisSchema = z
  .object({
    url: z.string().max(2048),
    analyzedAt: z.string(),
    title: z.string().max(300),
    description: z.string().max(500),
    headings: z.array(z.string().max(300)).max(20),
    mainText: z.string().max(5000),
    socials: z.array(z.string().max(2048)).max(10),
    findings: z.array(findingSchema).max(30),
    signals: z.object({
      missingTitle: z.boolean(),
      missingDescription: z.boolean(),
      missingViewport: z.boolean(),
      missingCta: z.boolean(),
      missingForm: z.boolean(),
      insecureHttp: z.boolean(),
      excellentWebsite: z.boolean(),
    }),
    limitations: z.array(z.string()).max(10),
    injection: z.enum(["NONE", "SUSPICIOUS", "LIKELY_INJECTION"]),
  })
  .strict();
export const memorySchema = z
  .object({
    companyContext: notes,
    needs: z.array(short).max(12),
    painPoints: z.array(short).max(12),
    objections: z.array(short).max(12),
    interests: z.array(short).max(12),
    budgetSignals: z.array(short).max(12),
    recommendedPlan: z.enum([
      "essencial",
      "profissional",
      "HUMAN_HANDOFF",
      "UNKNOWN",
    ]),
    sentiment: z.enum(["UNKNOWN", "POSITIVE", "NEUTRAL", "CONCERNED"]),
    purchaseIntent: z.number().min(0).max(1),
    lastSummary: notes,
    nextBestAction: short,
  })
  .strict();
export const generatedSchema = z
  .object({
    message: z.string().min(1).max(2000),
    summary: z.string().max(1000),
    nextQuestion: z.string().max(300),
  })
  .strict();
export type LeadInput = z.infer<typeof leadInputSchema>;
export type Requirements = z.infer<typeof requirementsSchema>;
export type Analysis = z.infer<typeof analysisSchema>;
export type Memory = z.infer<typeof memorySchema>;
export type Stage = (typeof stages)[number];
export type SalesState = (typeof states)[number];
export type Recommendation = {
  plan: "essencial" | "profissional" | "HUMAN_HANDOFF" | "UNKNOWN";
  reason: string;
  price: number | null;
};
export type Interaction = {
  id: string;
  leadId: string;
  kind: string;
  createdAt: string;
  data: Record<string, unknown>;
};
export type Lead = LeadInput & {
  qualification?: Qualification | null;
  id: string;
  stage: Stage;
  score: number;
  priority: string;
  scoreReasons: string[];
  createdAt: string;
  updatedAt: string;
  lastInteraction: string | null;
  lastContactAt: string | null;
  attempts: number;
  recommendation: Recommendation;
  conversionProbability: number | null;
  analysis: Analysis | null;
  memory: Memory;
  salesState: SalesState;
  draft: string;
  draftApproved: boolean;
  queueReleasedAt: string | null;
  revenue: number | null;
};
