import { z } from "zod";
export const qualificationOutputSchema = z.object({
  fit: z.enum(["GOOD", "PARTIAL", "UNKNOWN"]),
  opportunity: z.enum(["HIGH", "MEDIUM", "LOW", "REVIEW"]),
  summary: z.string().trim().min(1).max(800),
  findingIndexes: z.array(z.number().int().min(0).max(29)).max(6),
  angle: z.string().trim().max(500),
  nextAction: z.string().trim().min(1).max(200),
}).strict();
export type Qualification = z.infer<typeof qualificationOutputSchema> & {
  classifiedAt: string;
  provider: "openai";
  websiteStatus: "ANALYZED" | "NO_CONFIRMED_SITE" | "UNAVAILABLE";
  limitations: string[];
  evidence: { finding: string; source: string; confidence: number }[];
};
export const qualificationLabels: Record<string, string> = { HIGH: "Alta", MEDIUM: "Média", LOW: "Baixa", REVIEW: "Revisar", GOOD: "Bom encaixe", PARTIAL: "Encaixe parcial", UNKNOWN: "Não confirmado" };
