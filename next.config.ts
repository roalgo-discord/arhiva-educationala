import { createMDX } from "fumadocs-mdx/next";

const withMDX = createMDX();

const config = {
  reactStrictMode: true,
  images: {
    remotePatterns: [new URL("https://www.google.com/s2/favicons/**")],
  },
};

export default withMDX(config);

import { initOpenNextCloudflareForDev } from "@opennextjs/cloudflare";
initOpenNextCloudflareForDev();
