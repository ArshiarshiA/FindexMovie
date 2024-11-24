import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  /* config options here */
  images: {
    remotePatterns: [
      {
        pathname: '**',
        hostname: '**',
        port: '',
        protocol: 'https'
      }
    ]
  }
};

export default nextConfig;
