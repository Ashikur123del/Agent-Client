import type { NextConfig } from "next";

// Server-side env (NEXT_PUBLIC lagbe na). Vercel e backend er URL boshan.
const BACKEND_URL = (process.env.BACKEND_URL || "http://localhost:5000").replace(/\/$/, "");

const nextConfig: NextConfig = {
  // Browser shobshomoy nijer domain er /backend/... e call kore,
  // Next.js seta backend e pathiye dey. Tai cookie first-party hoy,
  // ar proxy.ts (middleware) cookie dekhte pay.
  async rewrites() {
    return [
      {
        source: "/backend/:path*",
        destination: `${BACKEND_URL}/:path*`,
      },
    ];
  },

  images: {
    remotePatterns: [
      { protocol: "https", hostname: "res.cloudinary.com" },
    ],
  },
};

export default nextConfig;