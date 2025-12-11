import { createMDX } from "fumadocs-mdx/next";
const withMDX = createMDX();

const config = {
  reactStrictMode: true,
  eslint: {
    // Skip ESLint during production builds; lint in CI or separately.
    ignoreDuringBuilds: true,
  },
  images: {
    remotePatterns: [
      {
        protocol: "https" as const,
        hostname: "www.google.com",
        port: "",
        pathname: "/s2/favicons",
      },

      {
        protocol: "https" as const,
        hostname: "edu.roalgo.ro",
        port: "",
        pathname: "/images/",
      },
    ],
  },
};

export default withMDX(config);
