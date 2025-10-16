import { dirname } from "node:path";
import { fileURLToPath } from "node:url";
import { FlatCompat } from "@eslint/eslintrc";
import type { Linter } from "eslint";
import * as mdx from "eslint-plugin-mdx";
import reactPlugin from "eslint-plugin-react";
import { defineConfig } from "eslint/config";
// @ts-ignore
import nextVitals from "eslint-config-next/core-web-vitals";
// @ts-ignore
import nextTs from "eslint-config-next/typescript";

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const compat = new FlatCompat({
  baseDirectory: __dirname,
});

const remarkConfigPath = fileURLToPath(
  new URL("./.remarkrc.mjs", import.meta.url)
);

const { default: defaultMdxComponents } = await import("fumadocs-ui/mdx");
const mdxComponentGlobals = mdx.getGlobals([
  ...Object.keys(defaultMdxComponents ?? {}),
  "Callout",
  "Tabs",
  "Tab",
  "Image",
]);

const eslintConfig = defineConfig([
  ...nextVitals,
  ...nextTs,
  {
    ignores: [
      "node_modules/**",
      ".next/**",
      "out/**",
      "build/**",
      ".source/**",
      "next-env.d.ts",
    ],
  },
  {
    ...mdx.flat,
    files: ["**/*.mdx"],
    plugins: {
      react: reactPlugin,
    },
    languageOptions: {
      ...mdx.flat.languageOptions,
      parserOptions: {
        ignoreRemarkConfig: false,
        remarkConfigPath,
      },
      globals: mdxComponentGlobals,
    },
    settings: {
      ...mdx.flat.settings,
      "mdx/ignore-remark-config": false,
      "mdx/remark-config-path": remarkConfigPath,
    },
    processor: mdx.createRemarkProcessor({
      remarkConfigPath,
      ignoreRemarkConfig: false,
    }),
    rules: {
      "react/jsx-no-undef": ["error", { allowGlobals: true }],
    },
  },
]);

export default eslintConfig;
