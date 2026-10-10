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
  // Empty space ba window.location.origin use korle Same-Origin request hobe
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


