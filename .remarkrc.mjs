import { getDefaultMDXOptions, remarkInclude } from "fumadocs-mdx/config";
import remarkMath from "remark-math";
import remarkPresetLintConsistent from "remark-preset-lint-consistent"
import remarkPresetLinkRecommended from "remark-preset-lint-recommended"

const { remarkPlugins } = getDefaultMDXOptions({
  _withoutBundler: true,
  remarkPlugins: [remarkMath, remarkPresetLintConsistent, remarkPresetLinkRecommended],
});

const remarkConfig = {
  plugins: [remarkInclude, ...remarkPlugins],
};

export default remarkConfig;
