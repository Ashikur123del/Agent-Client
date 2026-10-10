import { createAuthClient } from "better-auth/react";

const isDev = process.env.NODE_ENV === "development";

export const authClient = createAuthClient({
  // Production-এ relative (rewrite), development-এ backend URL
  baseURL: isDev
    ? process.env.NEXT_PUBLIC_API_URL || "http://localhost:5000"
    : "",

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