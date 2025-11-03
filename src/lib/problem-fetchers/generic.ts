/**
 * Generic problem fetcher for platforms without public APIs
 * Returns basic metadata extracted from URL structure
 */

import { z } from 'zod';
import { ProblemMetadataSchema, type ProblemMetadata, type Platform } from './types';
import { parseProblemId, PLATFORMS } from './registry';

/**
 * Generic fetcher that extracts basic info from URL
 * Used for platforms without public APIs
 */
export function createGenericFetcher(platform: Platform) {
  return async function (url: string): Promise<ProblemMetadata> {
    const problemId = parseProblemId(url, platform);
    const platformConfig = PLATFORMS[platform];

    if (!problemId) {
      throw new Error(`Invalid ${platformConfig.name} URL`);
    }

    try {
      const metadata = ProblemMetadataSchema.parse({
        url,
        platform,
        title: `Problem ${problemId}`,
        source: platformConfig.name,
        fetched: false, // Not actually fetched from API
      });

      return metadata;
    } catch (error) {
      if (error instanceof z.ZodError) {
        throw new Error(
          `Invalid ${platformConfig.name} metadata: ${error.issues.map((e) => `${e.path.join('.')}: ${e.message}`).join(', ')}`
        );
      }
      throw error;
    }
  };
}

// Export specific fetchers for each platform without API
export const fetchCSES = createGenericFetcher('cses');
export const fetchInfoarena = createGenericFetcher('infoarena');
export const fetchUSACO = createGenericFetcher('usaco');
export const fetchOJUZ = createGenericFetcher('oj.uz');
export const fetchAtCoder = createGenericFetcher('atcoder');
export const fetchNerdArena = createGenericFetcher('nerdarena');
