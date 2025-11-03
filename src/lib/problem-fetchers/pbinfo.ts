/**
 * PBInfo problem fetcher
 * PBInfo doesn't have a public API, so this fetcher extracts basic info from URL
 */

import { z } from 'zod';
import { ProblemMetadataSchema, type ProblemMetadata } from './types';
import { parseProblemId } from './registry';

/**
 * Fetch problem data from PBInfo
 * Since PBInfo has no public API, this returns minimal data from URL structure
 */
export async function fetchPBInfo(url: string): Promise<ProblemMetadata> {
  const problemId = parseProblemId(url, 'pbinfo');

  if (!problemId) {
    throw new Error('Invalid PBInfo URL');
  }

  try {
    const urlObj = new URL(url);
    const pathname = urlObj.pathname;

    // Extract problem slug if available (/probleme/123/problem-name)
    const match = pathname.match(/\/probleme\/\d+\/([^/]+)/);
    const slug = match ? match[1] : null;

    // Convert slug to title (replace hyphens with spaces, capitalize)
    const title = slug
      ? slug
          .split('-')
          .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
          .join(' ')
      : `Problem ${problemId}`;

    const metadata = ProblemMetadataSchema.parse({
      url,
      platform: 'pbinfo',
      title,
      source: 'PBInfo',
      fetched: false, // Mark as not fetched since we don't use an API
    });

    return metadata;
  } catch (error) {
    if (error instanceof z.ZodError) {
      throw new Error(
        `Invalid PBInfo metadata: ${error.issues.map((e) => `${e.path.join('.')}: ${e.message}`).join(', ')}`
      );
    }
    throw new Error(
      `Failed to parse PBInfo URL: ${error instanceof Error ? error.message : 'Unknown error'}`
    );
  }
}
