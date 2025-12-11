import {
  defineConfig,
  defineDocs,
  frontmatterSchema,
  metaSchema,
} from "fumadocs-mdx/config";

import rehypeKatex from "rehype-katex";
import remarkMath from "remark-math";

import { z } from "zod";

type NodeWithChildren = {
  type: string;
  children?: NodeWithChildren[];
  [key: string]: unknown;
};

const unsupportedNodeTypes = new Set([
  "mdxjsEsm",
  "mdxjsFlowExpression",
  "mdxjsTextExpression",
  "mdxJsxTextElement",
]);

const flowNodeTypes = new Set([
  "mdxjsEsm",
  "mdxjsFlowExpression",
  "mdxJsxFlowElement",
]);

function createPlaceholder(type: string, isFlow: boolean): NodeWithChildren {
  if (isFlow) {
    return {
      type: "paragraph",
      children: [{ type: "text", value: `[unsupported ${type}]` }],
    };
  }

  return { type: "text", value: `[unsupported ${type}]` };
}

function markUnsupportedNodes(): (tree: NodeWithChildren) => void {
  return (tree) => {
    const visit = (node: NodeWithChildren | undefined) => {
      if (!node?.children) return;
      node.children = node.children.flatMap((child) => {
        if (unsupportedNodeTypes.has(child.type)) {
          return [createPlaceholder(child.type, flowNodeTypes.has(child.type))];
        }
        visit(child);
        return [child];
      });
    };

    visit(tree);
  };
}

// You can customise Zod schemas for frontmatter and `meta.json` here
// see https://fumadocs.dev/docs/mdx/collections
export const docs = defineDocs({
  docs: {
    schema: frontmatterSchema.extend({
      authors: z.array(z.string()).optional(),
      title: z.string().optional(),
      prerequisites: z.array(z.string()).optional(),
    }),
    postprocess: {
      includeProcessedMarkdown: true,
    },
  },
  meta: {
    schema: metaSchema,
  },
});

export default defineConfig({
  mdxOptions: {
    remarkPlugins: [remarkMath],
    rehypePlugins: (v) => [rehypeKatex, ...v],
  },
});
