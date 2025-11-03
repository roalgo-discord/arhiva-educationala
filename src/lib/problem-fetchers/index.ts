/**
 * Problem fetcher infrastructure
 * Coordinates platform-specific fetchers and provides unified API
 */

import { z } from 'zod';
import { ProblemMetadataSchema, type ProblemMetadata, type ProblemFetcher } from './types';
import { detectPlatform, PLATFORMS } from './registry';
import { fetchKilonova } from './kilonova';
import { fetchCodeforces } from './codeforces';
import { fetchPBInfo } from './pbinfo';
import {
  fetchCSES,
  fetchInfoarena,
  fetchUSACO,
  fetchOJUZ,
  fetchAtCoder,
  fetchNerdArena,
} from './generic';

/**
 * Registry of platform-specific fetchers
 */
const FETCHERS: Record<string, ProblemFetcher> = {
  kilonova: fetchKilonova,
  codeforces: fetchCodeforces,
  pbinfo: fetchPBInfo,
  cses: fetchCSES,
  infoarena: fetchInfoarena,
  usaco: fetchUSACO,
  'oj.uz': fetchOJUZ,
  atcoder: fetchAtCoder,
  nerdarena: fetchNerdArena,
};

/**
 * Main fetcher function - detects platform and delegates to appropriate fetcher
 *
 * @param url - The problem URL
 * @param providedData - Optional data provided as props (overrides fetch)
 * @returns Problem metadata
 */
export async function fetchProblemData(
  url: string,
  providedData?: Partial<ProblemMetadata>
): Promise<ProblemMetadata> {
  const platform = detectPlatform(url);
  const platformConfig = PLATFORMS[platform];

  // Base metadata
  const baseMetadata: Partial<ProblemMetadata> = {
    url,
    platform,
    source: platformConfig.name,
    fetched: false,
  };

  // If all data is provided via props, skip fetching
  if (providedData?.title) {
    const metadata = ProblemMetadataSchema.parse({
      ...baseMetadata,
      ...providedData,
      fetched: false, // Explicitly mark as not fetched
    });
    return metadata;
  }

  // Try to fetch data if platform supports it
  const fetcher = FETCHERS[platform];
  if (fetcher && platformConfig.supportsAPI) {
    try {
      const fetchedData = await fetcher(url);
      const metadata = ProblemMetadataSchema.parse({
        ...baseMetadata,
        ...fetchedData,
        ...providedData, // Props override fetched data
        fetched: true,
      });
      return metadata;
    } catch (error) {
      // Fetch failed, return base metadata with error
      if (error instanceof z.ZodError) {
        throw new Error(
          `Invalid problem metadata: ${error.issues.map((e) => `${e.path.join('.')}: ${e.message}`).join(', ')}`
        );
      }
      const metadata = ProblemMetadataSchema.parse({
        ...baseMetadata,
        ...providedData,
        error: error instanceof Error ? error.message : 'Failed to fetch problem data',
        fetched: false,
      });
      return metadata;
    }
  }

  // Platform doesn't support fetching, return base metadata
  const metadata = ProblemMetadataSchema.parse({
    ...baseMetadata,
    ...providedData,
  });
  return metadata;
}

// Re-export types
export type { ProblemMetadata, Platform } from './types';
export { detectPlatform, PLATFORMS } from './registry';
