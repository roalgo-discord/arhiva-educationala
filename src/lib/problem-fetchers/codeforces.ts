import { z } from "zod";
import type { ProblemMetadata } from "./types";

const CodeforcesProblemSchema = z.object({
  contestId: z.number(),
  index: z.string(),
  name: z.string(),
  rating: z.number().optional(),
  tags: z.array(z.string()),
  type: z.enum(["PROGRAMMING", "QUESTION"]).optional(),
});

const CodeforcesAPIResponseSchema = z.object({
  status: z.enum(["OK", "FAILED"]),
  result: z.object({
    problems: z.array(CodeforcesProblemSchema),
  }),
});

function parseCodeforcesUrl(
  url: string
): { contestId: string; problemIndex: string } | null {
  try {
    const urlObj = new URL(url);
    const pathname = urlObj.pathname;

    const match = pathname.match(
      /\/(contest|problemset|gym)\/(\d+)(?:\/problem\/([A-Z]\d?))?/
    );

    if (!match) return null;

    const contestId = match[2];
    const problemIndex = match[3] || "A";

    return { contestId, problemIndex };
  } catch {
    return null;
  }
}

export async function fetchCodeforces(url: string): Promise<ProblemMetadata> {
  const parsed = parseCodeforcesUrl(url);

  if (!parsed) {
    throw new Error("Invalid Codeforces URL");
  }

  try {
    const apiUrl = `https://codeforces.com/api/problemset.problems`;
    const response = await fetch(apiUrl, {
      headers: {
        Accept: "application/json",
      },
    });

    if (!response.ok) {
      throw new Error(`API returned ${response.status}`);
    }

    const json = await response.json();
    const data = CodeforcesAPIResponseSchema.parse(json);

    if (data.status !== "OK") {
      throw new Error("API returned error status");
    }

    const problem = data.result.problems.find(
      (p) =>
        p.contestId.toString() === parsed.contestId &&
        p.index === parsed.problemIndex
    );

    if (!problem) {
      throw new Error("Problem not found in API response");
    }

    return {
      url,
      platform: "codeforces",
      title: `${problem.index}. ${problem.name}`,
      difficulty: problem.rating
        ? {
            value: problem.rating,
            label: `${problem.rating}`,
          }
        : undefined,
      tags: problem.tags,
      source: `Codeforces ${parsed.contestId}`,
      fetched: true,
    };
  } catch (error) {
    if (error instanceof z.ZodError) {
      throw new Error(
        `Invalid Codeforces API response: ${error.issues
          .map((e) => `${e.path.join(".")}: ${e.message}`)
          .join(", ")}`
      );
    }
    throw new Error(
      `Failed to fetch Codeforces problem: ${
        error instanceof Error ? error.message : "Unknown error"
      }`
    );
  }
}
