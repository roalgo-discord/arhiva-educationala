import { getDefaultMDXOptions, remarkInclude } from "fumadocs-mdx/config";
import remarkMath from "remark-math";
import remarkPresetLintConsistent from "remark-preset-lint-consistent"
import remarkPresetLinkRecommended from "remark-preset-lint-recommended"
import remarkFrontmatter from "remark-frontmatter"
import remarkMdx from "remark-mdx"

const { remarkPlugins } = getDefaultMDXOptions({
  _withoutBundler: true,
  remarkPlugins: [remarkMath, remarkPresetLintConsistent, remarkPresetLinkRecommended, remarkFrontmatter, remarkMdx],
});

const remarkConfig = {
  plugins: [remarkInclude, ...remarkPlugins],
};

export default remarkConfig;
