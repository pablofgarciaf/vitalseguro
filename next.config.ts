import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'cdn.sceneai.art',
        pathname: '/**',
      },
    ],
  },
};

export default nextConfig;
