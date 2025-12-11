import { createMDX } from "fumadocs-mdx/next";
const withMDX = createMDX();

const config = {
  reactStrictMode: true,
  images: {
    remotePatterns: [
      {
        protocol: "https" as const,
        hostname: "www.google.com",
        port: "",
        pathname: "/s2/favicons",
      },
    ],
  },
};

export default withMDX(config);

import { initOpenNextCloudflareForDev } from "@opennextjs/cloudflare";
initOpenNextCloudflareForDev();
