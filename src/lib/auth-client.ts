import { createAuthClient } from "better-auth/react";

const isBrowser = typeof window !== "undefined";

export const authClient = createAuthClient({
  // Browser e nijer domain, server render e fallback.
  baseURL: isBrowser
    ? window.location.origin
    : process.env.NEXT_PUBLIC_SITE_URL ?? "http://localhost:3000",

  // next.config.ts er rewrite onujayi: /backend/api/auth/* -> backend /api/auth/*
  basePath: "/backend/api/auth",

  fetchOptions: {
    credentials: "include",
  },

  // Custom user fields (role) TypeScript ke bojhanor jonno
  user: {
    additionalFields: {
      role: {
        type: "string",
      },
    },
  },
});