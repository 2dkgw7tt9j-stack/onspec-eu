import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    unoptimized: true,
    remotePatterns: [
      {
        protocol: "https",
        hostname: "images.unsplash.com",
      },
    ],
  },
  async redirects() {
    return [
      {
        source: "/launch",
        destination: "/businesses",
        permanent: false,
      },
      {
        source: "/automate",
        destination: "/ai-web",
        permanent: false,
      },
      {
        source: "/connect",
        destination: "/services",
        permanent: false,
      },
      {
        source: "/innovate",
        destination: "/services",
        permanent: false,
      },
    ];
  },
};

export default nextConfig;
