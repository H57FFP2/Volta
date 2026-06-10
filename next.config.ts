import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  reactStrictMode: true,
  // Désactive le "Segment Explorer" des devtools Next 15.5 qui désynchronise
  // le manifeste client sur les pages dynamiques (ex: /dashboard) en dev.
  experimental: {
    devtoolSegmentExplorer: false,
  },
};

export default nextConfig;
