import { dirname } from "node:path";
import { fileURLToPath } from "node:url";
import { FlatCompat } from "@eslint/eslintrc";
import type { Linter } from "eslint";
import * as mdx from "eslint-plugin-mdx";
import { getMDXComponents } from "./src/mdx-components";

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const compat = new FlatCompat({
  baseDirectory: __dirname,
});

const remarkConfigPath = fileURLToPath(
  new URL("./.remarkrc.mjs", import.meta.url)
);

const mdxComponentGlobals = mdx.getGlobals(getMDXComponents());

const eslintConfig = [
  ...compat.extends("next/core-web-vitals", "next/typescript"),
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
    languageOptions: {
      ...mdx.flat.languageOptions,
      parserOptions: {
        ...mdx.flat.languageOptions?.parserOptions,
        ignoreRemarkConfig: false,
        remarkConfigPath,
      },
      globals: {
        ...mdx.flat.languageOptions?.globals,
        ...mdxComponentGlobals,
      },
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
] satisfies Linter.FlatConfig[];

export default eslintConfig;
