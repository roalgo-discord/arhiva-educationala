import { z } from "zod";
import type { ProblemMetadata } from "./types";
import { parseProblemId } from "./registry";

const KilonovaAPIResponseSchema = z.object({
  id: z.number(),
  created_at: z.string(),
  name: z.string(),
  test_name: z.string(),
  default_points: z.number(),
  visible: z.boolean(),
  visible_tests: z.boolean(),
  time_limit: z.number(),
  memory_limit: z.number(),
  source_size: z.number(),
  source_credits: z.string(),
  score_scale: z.number(),
  console_input: z.boolean(),
  score_precision: z.number(),
  published_at: z.string(),
  scoring_strategy: z.string(),
  task_type: z.string(),
  communication_processes: z.number(),
  submitLanguages: z.array(
    z.object({
      internal_name: z.string(),
      printable_name: z.string(),
    })
  ),
  tags: z.array(
    z.object({
      id: z.number(),
      name: z.string(),
      type: z.string(),
    })
  ),
  statementVariants: z.array(
    z.object({
      language: z.string(),
      format: z.string(),
      type: z.string(),
      permalink: z.string(),
      renderURL: z.string(),
      lastUpdatedAt: z.string(),
    })
  ),
});

/**
 * Fetch problem data from Kilonova
 */
export async function fetchKilonova(url: string): Promise<ProblemMetadata> {
  const problemId = parseProblemId(url, "kilonova");

  if (!problemId) {
    throw new Error("Invalid Kilonova URL");
  }

  try {
    const apiUrl = `https://kilonova.ro/api/v2/problems/${problemId}`;
    const response = await fetch(apiUrl, {
      headers: {
        Accept: "application/json",
      },
    });

    if (!response.ok) {
      throw new Error(`API returned ${response.status}`);
    }

    const json = await response.json();
    const data = KilonovaAPIResponseSchema.parse(json);

    return {
      url,
      platform: "kilonova",
      title: data.name,
      source: data.source_credits || "Kilonova",
      tags: data.tags.map((tag) => tag.name),
      fetched: true,
    };
  } catch (error) {
    if (error instanceof z.ZodError) {
      throw new Error(
        `Invalid Kilonova API response: ${error.issues
          .map((e) => `${e.path.join(".")}: ${e.message}`)
          .join(", ")}`
      );
    }
    throw new Error(
      `Failed to fetch Kilonova problem: ${
        error instanceof Error ? error.message : "Unknown error"
      }`
    );
  }
}
