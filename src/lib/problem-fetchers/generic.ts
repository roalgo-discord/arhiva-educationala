import { z } from "zod";
import {
  ProblemMetadataSchema,
  type ProblemMetadata,
  type Platform,
} from "./types";
import { parseProblemId, PLATFORMS } from "./registry";

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
        fetched: false,
      });

      return metadata;
    } catch (error) {
      if (error instanceof z.ZodError) {
        throw new Error(
          `Invalid ${platformConfig.name} metadata: ${error.issues
            .map((e) => `${e.path.join(".")}: ${e.message}`)
            .join(", ")}`
        );
      }
      throw error;
    }
  };
}

export const fetchCSES = createGenericFetcher("cses");
export const fetchInfoarena = createGenericFetcher("infoarena");
export const fetchUSACO = createGenericFetcher("usaco");
export const fetchOJUZ = createGenericFetcher("oj.uz");
export const fetchAtCoder = createGenericFetcher("atcoder");
export const fetchNerdArena = createGenericFetcher("nerdarena");
