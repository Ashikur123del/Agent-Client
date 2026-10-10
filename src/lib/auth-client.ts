import { createAuthClient } from "better-auth/react";

export const authClient = createAuthClient({
  // baseURL খালি রাখলে বা window.location.origin দিলে এটি বর্তমান ফ্রন্টএন্ড ডোমেইন ব্যবহার করবে
  // এবং Next.js rewrites এর মাধ্যমে রিকোয়েস্ট ব্যাকএন্ডে চলে যাবে (Same-origin)
  baseURL: typeof window !== "undefined" ? window.location.origin : "",

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