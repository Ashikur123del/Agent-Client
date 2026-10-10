import type { NextConfig } from "next";

// ⚠️ Eta SERVER-SIDE variable (NEXT_PUBLIC noy).
// Vercel e backend er pura URL boshan, shesh e "/" dibenna.
const BACKEND_URL = (process.env.BACKEND_URL || "http://localhost:5000").replace(/\/$/, "");

const nextConfig: NextConfig = {
  experimental: {
    serverActions: {
      bodySizeLimit: "2mb",
    },
  },

  // Browser shobshomoy nijer domain er /backend/... e call kore,
  // Next.js seta backend e pathiye dey. Tai cookie frontend er nijer cookie hoy
  // ar proxy.ts (middleware) cookie dekhte pay.
  //   /backend/api/auth/sign-in/email  ->  <BACKEND_URL>/api/auth/sign-in/email
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
      { protocol: "https", hostname: "images.unsplash.com" },
      { protocol: "https", hostname: "*.thrillist.com" }, // Thrillist er shob chobi
      { protocol: "https", hostname: "assets3.thrillist.com" },
    ],
  },
};

export default nextConfig;