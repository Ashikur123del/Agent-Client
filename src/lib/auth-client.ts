import { createAuthClient } from "better-auth/react";

const isBrowser = typeof window !== "undefined";

export const authClient = createAuthClient({
  // Browser e same-origin (/backend proxy use করার জন্য) অথবা Fallback URL
  baseURL: isBrowser
    ? window.location.origin
    : process.env.NEXT_PUBLIC_API_URL || "https://modina-agence-travel.vercel.app",
  basePath: "/backend/api/auth",
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