import { getDefaultMDXOptions, remarkInclude } from "fumadocs-mdx/config";
import remarkMath from "remark-math";
import remarkPresetLintConsistent from "remark-preset-lint-consistent"
import remarkPresetLinkRecommended from "remark-preset-lint-recommended"
import remarkPresetLintMarkdownStyleGuide from "remark-preset-lint-markdown-style-guide"
import remarkFrontmatter from "remark-frontmatter"
import remarkMdx from "remark-mdx"
import remarkLintCppClangFormat from "./src/remark-lint-cpp-clang-format.mjs"
import remarkCppClangFormat from "./src/remark-cpp-clang-format.mjs"

const { remarkPlugins } = getDefaultMDXOptions({
  _withoutBundler: true,
  remarkPlugins: [[remarkMath, { singleDollarTextMath: false }], remarkPresetLinkRecommended, remarkPresetLintConsistent, remarkFrontmatter, remarkMdx],
});

const remarkConfig = {
  plugins: [
    remarkInclude,
    remarkLintCppClangFormat,
    remarkCppClangFormat,
    ...remarkPlugins,
  ],
  settings: {
    bullet: "-",
  }
};

export default remarkConfig;
