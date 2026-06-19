import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  /* Vercel deployment — removed output: "standalone" for native Vercel support */
  typescript: {
    ignoreBuildErrors: true,
  },
  reactStrictMode: false,
};

export default nextConfig;
