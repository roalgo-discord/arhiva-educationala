import { getDefaultMDXOptions, remarkInclude } from "fumadocs-mdx/config";
import remarkMath from "remark-math";
import remarkPresetLintConsistent from "remark-preset-lint-consistent"
import remarkPresetLinkRecommended from "remark-preset-lint-recommended"
import remarkPresetLintMarkdownStyleGuide from "remark-preset-lint-markdown-style-guide"
import remarkFrontmatter from "remark-frontmatter"
import remarkMdx from "remark-mdx"

const { remarkPlugins } = getDefaultMDXOptions({
  _withoutBundler: true,
  remarkPlugins: [remarkMath, remarkPresetLinkRecommended, remarkPresetLintConsistent, remarkFrontmatter, remarkMdx],
});

const remarkConfig = {
  plugins: [remarkInclude, ...remarkPlugins],
  settings: {
    bullet: "-",
  }
};

export default remarkConfig;
