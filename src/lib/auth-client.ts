import { createAuthClient } from "better-auth/react";

export const authClient = createAuthClient({
  baseURL: process.env.NEXT_PUBLIC_API_URL || "https://travel-agence-server.vercel.app",
  fetchOptions: {
    credentials: "include", // ক্রসব্রাউজার কুকি আদান-প্রদানের জন্য
  },
  // Custom user fields (যেমন: role) টাইপস্ক্রিপ্টকে বোঝানোর জন্য:
  user: {
    additionalFields: {
      role: {
        type: "string",
      },
    },
  },
});