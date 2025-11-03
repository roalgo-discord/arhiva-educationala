import { z } from "zod";

export const PlatformSchema = z.enum([
  "kilonova",
  "codeforces",
  "pbinfo",
  "cses",
  "infoarena",
  "usaco",
  "oj.uz",
  "atcoder",
  "nerdarena",
  "unknown",
]);

export type Platform = z.infer<typeof PlatformSchema>;

export const DifficultySchema = z.object({
  value: z.union([z.number(), z.string()]),
  label: z.string().optional(),
});

export const ProblemMetadataSchema = z.object({
  url: z.url(),
  platform: PlatformSchema,
  title: z.string().optional(),
  difficulty: DifficultySchema.optional(),
  tags: z.array(z.string()).optional(),
  source: z.string().optional(),
  fetched: z.boolean().optional(),
  error: z.string().optional(),
});

export type ProblemMetadata = z.infer<typeof ProblemMetadataSchema>;

export type ProblemFetcher = (url: z.ZodURL) => Promise<ProblemMetadata>;

export const PlatformConfigSchema = z.object({
  name: z.string(),
  domain: z.string(),
  color: z.string(),
  supportsAPI: z.boolean(),
  fetcher: z.custom<ProblemFetcher>().optional(),
});

export type PlatformConfig = z.infer<typeof PlatformConfigSchema>;
