import type { NextConfig } from "next";

const BACKEND_URL = (
  process.env.NEXT_PUBLIC_API_URL || "https://modina-agence-travel.vercel.app"
).replace(/\/$/, "");

const nextConfig: NextConfig = {
  experimental: {
    serverActions: {
      bodySizeLimit: "2mb",
    },
  },

  async rewrites() {
    return [
      {
        source: "/api/:path*",
        destination: `${BACKEND_URL}/api/:path*`,
      },
    ];
  },

  images: {
    remotePatterns: [
      { protocol: "https", hostname: "res.cloudinary.com" },
      { protocol: "https", hostname: "images.unsplash.com" },
      { protocol: "https", hostname: "*.thrillist.com" },
      { protocol: "https", hostname: "assets3.thrillist.com" },
    ],
  },
};

export default nextConfig;