import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  /* Vercel handles output automatically — no standalone needed */
  typescript: {
    ignoreBuildErrors: false,
  },
  images: {
    unoptimized: true,
  },
  reactStrictMode: true,
};

export default nextConfig;
