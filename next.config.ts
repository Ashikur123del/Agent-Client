import type { NextConfig } from "next";

const BACKEND_URL = (
  process.env.NEXT_PUBLIC_API_URL || "https://modina-agence-travel.vercel.app"
).replace(/\/$/, "");

const nextConfig: NextConfig = {
  async rewrites() {
    return [
      // সব /api/* backend-এ যাবে (auth + agents + hajjah + ...)
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
    ],
  },
};

export default nextConfig;