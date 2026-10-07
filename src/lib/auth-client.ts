import { createAuthClient } from "better-auth/react";

export const authClient = createAuthClient({
  // সরাসরি ব্যাকএন্ডের Vercel URL অথবা NEXT_PUBLIC_API_URL দিন
  baseURL: process.env.NEXT_PUBLIC_API_URL || "http://localhost:5000",

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