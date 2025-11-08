import { z } from "zod";
import { PlatformSchema, type Platform, type PlatformConfig } from "./types";

export const PLATFORMS: Record<Platform, PlatformConfig> = {
  kilonova: {
    name: "Kilonova",
    domain: "kilonova.ro",
    color: "blue",
    supportsAPI: true,
  },
  codeforces: {
    name: "Codeforces",
    domain: "codeforces.com",
    color: "red",
    supportsAPI: true,
  },
  pbinfo: {
    name: "PBInfo",
    domain: "pbinfo.ro",
    color: "green",
    supportsAPI: false,
  },
  cses: {
    name: "CSES",
    domain: "cses.fi",
    color: "purple",
    supportsAPI: false,
  },
  infoarena: {
    name: "InfoArena",
    domain: "infoarena.ro",
    color: "orange",
    supportsAPI: false,
  },
  usaco: {
    name: "USACO",
    domain: "usaco.org",
    color: "yellow",
    supportsAPI: false,
  },
  "oj.uz": {
    name: "OJ.UZ",
    domain: "oj.uz",
    color: "cyan",
    supportsAPI: false,
  },
  atcoder: {
    name: "AtCoder",
    domain: "atcoder.jp",
    color: "gray",
    supportsAPI: false,
  },
  nerdarena: {
    name: "NerdArena",
    domain: "nerdarena.ro",
    color: "pink",
    supportsAPI: false,
  },
  unknown: {
    name: "Unknown",
    domain: "",
    color: "gray",
    supportsAPI: false,
  },
};

const DOMAIN_TO_PLATFORM_MAP = new Map<string, Platform>(
  Object.entries(PLATFORMS)
    .filter(([, config]) => config.domain)
    .map(([platform, config]) => [config.domain, platform as Platform])
);

export function detectPlatform(url: string): Platform {
  try {
    const validatedUrl = z.string().parse(url);
    const urlObj = new URL(validatedUrl);
    const hostname = urlObj.hostname.toLowerCase();

    if (DOMAIN_TO_PLATFORM_MAP.has(hostname)) {
      const platform = DOMAIN_TO_PLATFORM_MAP.get(hostname)!;
      return PlatformSchema.parse(platform);
    }

    for (const [domain, platform] of DOMAIN_TO_PLATFORM_MAP.entries()) {
      if (hostname.includes(domain)) {
        return PlatformSchema.parse(platform);
      }
    }

    return "unknown";
  } catch (error) {
    if (error instanceof z.ZodError) {
      console.error("Invalid platform detection:", error.issues);
    }
    return "unknown";
  }
}

export function parseProblemId(url: string, platform: Platform): string | null {
  try {
    const validatedUrl = z.url().parse(url);
    const validatedPlatform = PlatformSchema.parse(platform);

    const urlObj = new URL(validatedUrl);
    const pathname = urlObj.pathname;

    switch (validatedPlatform) {
      case "kilonova":
        // /problems/123 or /tags/123
        const kilonovaMatch = pathname.match(/\/(problems|tags)\/(\d+)/);
        return kilonovaMatch ? kilonovaMatch[2] : null;

      case "codeforces":
        // /contest/123/problem/A or /problemset/problem/123/A or /gym/123/problem/A
        const cfMatch = pathname.match(
          /\/(contest|problemset|gym)\/(\d+)(?:\/problem\/([A-Z]\d?))?/
        );
        return cfMatch ? `${cfMatch[2]}${cfMatch[3] || ""}` : null;

      case "pbinfo":
        // /probleme/123/slug
        const pbMatch = pathname.match(/\/probleme\/(\d+)/);
        return pbMatch ? pbMatch[1] : null;

      case "cses":
        // /problemset/task/123
        const csesMatch = pathname.match(/\/task\/(\d+)/);
        return csesMatch ? csesMatch[1] : null;

      case "infoarena":
        // /problema/slug
        const iaMatch = pathname.match(/\/problema\/([^/]+)/);
        return iaMatch ? iaMatch[1] : null;

      case "usaco":
        // index.php?page=viewproblem2&cpid=123
        const usacoMatch = urlObj.searchParams.get("cpid");
        return usacoMatch || null;

      case "oj.uz":
        // /problem/view/JOI13_synchronization
        const ojMatch = pathname.match(/\/problem\/view\/([^/]+)/);
        return ojMatch ? ojMatch[1] : null;

      case "atcoder":
        // Various formats for AtCoder
        const atcoderMatch = pathname.match(/tasks\/([^/]+)/);
        return atcoderMatch ? atcoderMatch[1] : null;

      case "nerdarena":
        // /problema/slug or /probleme/123
        const naMatch = pathname.match(/\/problem[ae]\/([^/]+)/);
        return naMatch ? naMatch[1] : null;

      default:
        return null;
    }
  } catch {
    return null;
  }
}
