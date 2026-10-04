import { z } from "zod";

export const searchSchema = z.object({
  segment: z.string().trim().min(2).max(100),
  city: z.string().trim().min(2).max(100),
  limit: z.number().int().min(1).max(10).default(5),
}).strict();
export const discoveredSchema = z.object({
  company: z.string().trim().min(1).max(200),
  segment: z.string().trim().min(1).max(200),
  city: z.string().trim().min(1).max(200),
  description: z.string().trim().max(600),
  website: z.union([z.literal(""), z.string().url().max(2048)]),
  sources: z.array(z.string().url().max(2048)).min(1).max(4),
}).strict();
export type DiscoveryInput = z.infer<typeof searchSchema>;
export type Candidate = z.infer<typeof discoveredSchema> & { id: string; importedLeadId: string | null };
export type DiscoveryRun = { id: string; createdAt: string; expiresAt: string; input: DiscoveryInput; candidates: Candidate[] };
export const discoveryActionSchema = z.discriminatedUnion("action", [
  searchSchema.extend({ action: z.literal("search") }),
  z.object({ action: z.literal("import"), runId: z.string().uuid(), candidateIds: z.array(z.string().uuid()).min(1).max(10) }).strict(),
]);
