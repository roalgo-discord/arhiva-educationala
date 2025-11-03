/**
 * Codeforces problem fetcher
 * Uses Codeforces API to fetch problem metadata
 */

import { z } from 'zod';
import type { ProblemMetadata } from './types';

const CodeforcesProblemSchema = z.object({
  contestId: z.number(),
  index: z.string(),
  name: z.string(),
  rating: z.number().optional(),
  tags: z.array(z.string()),
  type: z.enum(['PROGRAMMING', 'QUESTION']).optional(),
});

const CodeforcesAPIResponseSchema = z.object({
  status: z.enum(['OK', 'FAILED']),
  result: z.object({
    problems: z.array(CodeforcesProblemSchema),
  }),
});

/**
 * Parse Codeforces URL to extract contest ID and problem letter
 */
function parseCodeforcesUrl(url: string): { contestId: string; problemIndex: string } | null {
  try {
    const urlObj = new URL(url);
    const pathname = urlObj.pathname;

    // /contest/123/problem/A or /problemset/problem/123/A or /gym/123/problem/A
    const match = pathname.match(/\/(contest|problemset|gym)\/(\d+)(?:\/problem\/([A-Z]\d?))?/);

    if (!match) return null;

    const contestId = match[2];
    const problemIndex = match[3] || 'A'; // Default to A if not specified

    return { contestId, problemIndex };
  } catch {
    return null;
  }
}

/**
 * Fetch problem data from Codeforces
 */
export async function fetchCodeforces(url: string): Promise<ProblemMetadata> {
  const parsed = parseCodeforcesUrl(url);

  if (!parsed) {
    throw new Error('Invalid Codeforces URL');
  }

  try {
    // Codeforces API endpoint (public)
    const apiUrl = `https://codeforces.com/api/problemset.problems`;
    const response = await fetch(apiUrl, {
      headers: {
        'Accept': 'application/json',
      },
    });

    if (!response.ok) {
      throw new Error(`API returned ${response.status}`);
    }

    const json = await response.json();
    const data = CodeforcesAPIResponseSchema.parse(json);

    if (data.status !== 'OK') {
      throw new Error('API returned error status');
    }

    // Find the specific problem
    const problem = data.result.problems.find(
      (p) => p.contestId.toString() === parsed.contestId && p.index === parsed.problemIndex
    );

    if (!problem) {
      throw new Error('Problem not found in API response');
    }

    return {
      url,
      platform: 'codeforces',
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
        `Invalid Codeforces API response: ${error.issues.map((e) => `${e.path.join('.')}: ${e.message}`).join(', ')}`
      );
    }
    throw new Error(
      `Failed to fetch Codeforces problem: ${error instanceof Error ? error.message : 'Unknown error'}`
    );
  }
}
