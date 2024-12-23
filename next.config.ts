import { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "fakestoreapi.com",
      },
      {
        protocol: "https",
        hostname: "laboratoriolaci.com",
      },
    ],
  },
  compiler: {
    emotion: {
      sourceMap: true,
      autoLabel: "dev-only",
      labelFormat: "[local]",
      importMap: {
        "@emotion/react": {
          css: {
            canonicalImport: ["@emotion/react", "css"],
            styledBaseImport: ["@emotion/styled", "default"],
          },
        },
      },
    },
  },
};

export default nextConfig;
