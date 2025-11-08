import { z } from "zod";
import {
  ProblemMetadataSchema,
  type ProblemMetadata,
  type ProblemFetcher,
} from "./types";
import { detectPlatform, PLATFORMS } from "./registry";
import { fetchKilonova } from "./kilonova";
import { fetchCodeforces } from "./codeforces";
import { fetchPBInfo } from "./pbinfo";
import {
  fetchCSES,
  fetchInfoarena,
  fetchUSACO,
  fetchOJUZ,
  fetchAtCoder,
  fetchNerdArena,
} from "./generic";

const FETCHERS: Record<string, ProblemFetcher> = {
  kilonova: fetchKilonova,
  codeforces: fetchCodeforces,
  pbinfo: fetchPBInfo,
  cses: fetchCSES,
  infoarena: fetchInfoarena,
  usaco: fetchUSACO,
  "oj.uz": fetchOJUZ,
  atcoder: fetchAtCoder,
  nerdarena: fetchNerdArena,
};

export async function fetchProblemData(
  url: string,
  providedData?: Partial<ProblemMetadata>
): Promise<ProblemMetadata> {
  const platform = detectPlatform(url);
  const platformConfig = PLATFORMS[platform];

  const baseMetadata: Partial<ProblemMetadata> = {
    url,
    platform,
    source: platformConfig.name,
    fetched: false,
  };

  if (providedData?.title) {
    const metadata = ProblemMetadataSchema.parse({
      ...baseMetadata,
      ...providedData,
      fetched: false,
    });
    return metadata;
  }
  const fetcher = FETCHERS[platform];
  if (fetcher && platformConfig.supportsAPI) {
    try {
      const fetchedData = await fetcher(url);
      const metadata = ProblemMetadataSchema.parse({
        ...baseMetadata,
        ...fetchedData,
        ...providedData,
        fetched: true,
      });
      return metadata;
    } catch (error) {
      if (error instanceof z.ZodError) {
        throw new Error(
          `Invalid problem metadata: ${error.issues
            .map((e) => `${e.path.join(".")}: ${e.message}`)
            .join(", ")}`
        );
      }
      const metadata = ProblemMetadataSchema.parse({
        ...baseMetadata,
        ...providedData,
        error:
          error instanceof Error
            ? error.message
            : "Failed to fetch problem data",
        fetched: false,
      });
      return metadata;
    }
  }

  const metadata = ProblemMetadataSchema.parse({
    ...baseMetadata,
    ...providedData,
  });
  return metadata;
}

export type { ProblemMetadata, Platform } from "./types";
export { detectPlatform, PLATFORMS } from "./registry";
