// import { createAuthClient } from "better-auth/react";

// export const authClient = createAuthClient({

//   baseURL: process.env.NEXT_PUBLIC_API_URL,

//   fetchOptions: {
//     credentials: "include",
//   },

//   user: {
//     additionalFields: {
//       role: {
//         type: "string",
//       },
//     },
//   },
// });


import { createAuthClient } from "better-auth/react";

export const authClient = createAuthClient({
  // baseURL ফাঁকা বা window.location.origin দিলে রিকোয়েস্ট ফ্রন্টএন্ডের /api/auth-এ যাবে 
  // এবং next.config.mjs এর মাধ্যমে রিরাইট হয়ে ব্যাকএন্ডে পৌঁছাবে (Same-Origin)
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