import type { AnchorHTMLAttributes } from "react";
import { ArrowRight } from "lucide-react";
import Image from "next/image";
import { z } from "zod";

import { cn } from "../lib/cn";
import type { ProblemMetadata } from "../lib/problem-fetchers";
import { fetchProblemData, PLATFORMS } from "../lib/problem-fetchers";

/**
 * Props schema for ProblemPreview component
 */
const ProblemPreviewPropsSchema = z.object({
  url: z.string(),
  title: z.string().optional(),
  difficulty: z.union([z.number(), z.string()]).optional(),
  tags: z.array(z.string()).optional(),
  source: z.string().optional(),
  className: z.string().optional(),
});

// Infer TypeScript type from Zod schema
type ProblemPreviewPropsBase = z.infer<typeof ProblemPreviewPropsSchema>;

// Extend with HTML attributes
export interface ProblemPreviewProps
  extends ProblemPreviewPropsBase,
    Omit<AnchorHTMLAttributes<HTMLAnchorElement>, keyof ProblemPreviewPropsBase | "href"> {}

function getPlatformFavicon(domain: string): string {
  if (!domain) return "";
  return `https://www.google.com/s2/favicons?domain=${domain}&sz=64`;
}

/**
 * Get color classes for platform styling
 */
function getPlatformColors(color: string) {
  const colorMap: Record<
    string,
    {
      badge: string;
      button: string;
      buttonHover: string;
    }
  > = {
    blue: {
      badge: "bg-blue-50 dark:bg-blue-950/30 ring-blue-200 dark:ring-blue-800",
      button: "bg-blue-500 hover:bg-blue-600",
      buttonHover: "group-hover:bg-blue-600",
    },
    red: {
      badge: "bg-red-50 dark:bg-red-950/30 ring-red-200 dark:ring-red-800",
      button: "bg-red-500 hover:bg-red-600",
      buttonHover: "group-hover:bg-red-600",
    },
    green: {
      badge:
        "bg-green-50 dark:bg-green-950/30 ring-green-200 dark:ring-green-800",
      button: "bg-green-500 hover:bg-green-600",
      buttonHover: "group-hover:bg-green-600",
    },
    purple: {
      badge:
        "bg-purple-50 dark:bg-purple-950/30 ring-purple-200 dark:ring-purple-800",
      button: "bg-purple-500 hover:bg-purple-600",
      buttonHover: "group-hover:bg-purple-600",
    },
    orange: {
      badge:
        "bg-orange-50 dark:bg-orange-950/30 ring-orange-200 dark:ring-orange-800",
      button: "bg-orange-500 hover:bg-orange-600",
      buttonHover: "group-hover:bg-orange-600",
    },
    yellow: {
      badge:
        "bg-yellow-50 dark:bg-yellow-950/30 ring-yellow-200 dark:ring-yellow-800",
      button: "bg-yellow-500 hover:bg-yellow-600",
      buttonHover: "group-hover:bg-yellow-600",
    },
    cyan: {
      badge: "bg-cyan-50 dark:bg-cyan-950/30 ring-cyan-200 dark:ring-cyan-800",
      button: "bg-cyan-500 hover:bg-cyan-600",
      buttonHover: "group-hover:bg-cyan-600",
    },
    pink: {
      badge: "bg-pink-50 dark:bg-pink-950/30 ring-pink-200 dark:ring-pink-800",
      button: "bg-pink-500 hover:bg-pink-600",
      buttonHover: "group-hover:bg-pink-600",
    },
    gray: {
      badge: "bg-gray-50 dark:bg-gray-900/30 ring-gray-200 dark:ring-gray-700",
      button: "bg-gray-500 hover:bg-gray-600",
      buttonHover: "group-hover:bg-gray-600",
    },
  };

  return colorMap[color] || colorMap.gray;
}

export async function ProblemPreview({
  url,
  title,
  difficulty,
  tags,
  source,
  className,
  ...htmlProps
}: ProblemPreviewProps) {
  // Validate props using Zod with safeParse for better error handling
  const validationResult = ProblemPreviewPropsSchema.safeParse({
    url,
    title,
    difficulty,
    tags,
    source,
    className,
  });

  // Handle validation errors gracefully
  if (!validationResult.success) {
    const errorDetails = validationResult.error.issues
      .map((issue) => `${issue.path.join(".")}: ${issue.message}`)
      .join(", ");

    return (
      <div className="my-4 p-4 rounded-lg border border-red-200 bg-red-50 dark:bg-red-950/30">
        <p className="text-sm text-red-600 dark:text-red-400">
          Invalid problem preview props: {errorDetails}
        </p>
      </div>
    );
  }

  const validatedProps = validationResult.data;

  const providedData: Partial<ProblemMetadata> = {};

  if (validatedProps.title) providedData.title = validatedProps.title;
  if (validatedProps.source) providedData.source = validatedProps.source;
  if (validatedProps.tags) providedData.tags = validatedProps.tags;

  if (validatedProps.difficulty !== undefined) {
    providedData.difficulty = {
      value: validatedProps.difficulty,
      label:
        typeof validatedProps.difficulty === "string"
          ? validatedProps.difficulty
          : `${validatedProps.difficulty}`,
    };
  }

  let metadata: ProblemMetadata;

  try {
    metadata = await fetchProblemData(validatedProps.url, providedData);
  } catch (error) {
    metadata = {
      url: validatedProps.url,
      platform: "unknown",
      title: validatedProps.title || "View Problem",
      source: validatedProps.source || "Unknown",
      ...providedData,
      error: error instanceof Error ? error.message : "Failed to load problem",
      fetched: false,
    };
  }

  const platformConfig = PLATFORMS[metadata.platform];
  const colors = getPlatformColors(platformConfig.color);
  const faviconUrl = getPlatformFavicon(platformConfig.domain);

  return (
    <div
      className={cn(
        "group relative my-4 rounded-xl border bg-fd-card overflow-hidden",
        "transition-all duration-200",
        "hover:shadow-lg hover:border-fd-primary/30",
        className
      )}
    >
      <div className="absolute top-4 right-4 z-10">
        <div
          className={cn(
            "size-10 rounded-lg ring-2 flex items-center justify-center",
            "backdrop-blur-sm transition-transform group-hover:scale-110",
            colors.badge
          )}
        >
          {faviconUrl ? (
            <Image
              src={faviconUrl}
              alt={platformConfig.name}
              width={64}
              height={64}
              className="size-6 object-contain"
            />
          ) : (
            <span className="text-sm font-bold text-fd-muted-foreground">
              {platformConfig.name.substring(0, 2).toUpperCase()}
            </span>
          )}
        </div>
      </div>

      <div className="p-5 pr-20">
        <h3 className="text-xl font-bold text-fd-foreground my-0! mb-3! leading-tight">
          {metadata.title || "View Problem"}
        </h3>

        <div className="flex flex-wrap items-center gap-x-3 gap-y-1.5 text-sm text-fd-muted-foreground mb-4">
          <span className="font-medium text-fd-foreground">
            {metadata.source || platformConfig.name}
          </span>

          {metadata.difficulty && (
            <>
              <span className="text-fd-border">•</span>
              <span>
                {metadata.difficulty.label || metadata.difficulty.value}
              </span>
            </>
          )}

          {metadata.tags && metadata.tags.length > 0 && (
            <>
              <span className="text-fd-border">•</span>
              <span>
                {metadata.tags.length} tag
                {metadata.tags.length !== 1 ? "s" : ""}
              </span>
            </>
          )}
        </div>

        {metadata.error && (
          <p className="text-xs text-fd-muted-foreground/70 italic mb-4">
            Could not fetch problem details
          </p>
        )}

        <a
          href={metadata.url}
          target="_blank"
          rel="noopener noreferrer"
          className={cn(
            "inline-flex items-center gap-2 px-4 py-2 rounded-lg",
            "text-white text-sm font-semibold",
            "transition-all duration-200",
            "no-underline",
            colors.button
          )}
          {...htmlProps}
        >
          <span>Deschide</span>
          <ArrowRight className="size-4 transition-transform group-hover:translate-x-0.5" />
        </a>
      </div>
    </div>
  );
}

export { ProblemPreview as default };
