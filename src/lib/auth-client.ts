import { createAuthClient } from "better-auth/react";

export const authClient = createAuthClient({
  // Same origin — next.config rewrite দিয়ে backend-এ যাবে
  baseURL:
    typeof window !== "undefined"
      ? window.location.origin
      : process.env.NEXT_PUBLIC_APP_URL || "http://localhost:3000",

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