import { createAuthClient } from "better-auth/react";

export const authClient = createAuthClient({
  // Same origin — next.config rewrite দিয়ে backend-এ যাবে
  baseURL: process.env.NEXT_PUBLIC_API_URL || "https://modina-agence-travel.vercel.app",

  fetchOptions: {
    credentials: "include",
  },

  user: {
    additionalFields: {
      role: {
        type: "string",
      },
    },
  },
});