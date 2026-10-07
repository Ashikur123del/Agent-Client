import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

// Next.js 16: proxy.ts = ager middleware.ts. Duita ekshathe rakha jabe na.
export function proxy(request: NextRequest) {
  const { pathname } = request.nextUrl;

  // Shudhu asol better-auth session cookie dekhbo.
  // (agent_verified / token / session_token nokol cookie, logout er pore-o theke jay)
  const token =
    request.cookies.get("better-auth.session_token")?.value ||
    request.cookies.get("__Secure-better-auth.session_token")?.value;

  const protectedRoutes = [
    "/dashboard",
    "/heroslider",
    "/addnews",
    "/addgallery",
    "/contactinfo",
    "/hajjahlist",
    "/hajjahadd",
    "/myprofile",
    "/duepayment",
    "/view-all-slider",
    "/gallery-view-details",
    "/news-view-details",
    "/agents",
  ];

  const isProtectedRoute = protectedRoutes.some((route) =>
    pathname.startsWith(route)
  );

  // Protected route e login chhara dhukte parbe na
  if (isProtectedRoute && !token) {
    const loginUrl = new URL("/login", request.url);
    loginUrl.searchParams.set("callbackUrl", pathname);
    return NextResponse.redirect(loginUrl);
  }

  // Login kora thakle /login e jete parbe na
  if (pathname === "/login" && token) {
    return NextResponse.redirect(new URL("/dashboard", request.url));
  }

  const response = NextResponse.next();

  // Ager login code er rekhe jaoa nokol cookie muchhe fela
  if (request.cookies.get("agent_verified")) {
    response.cookies.delete("agent_verified");
  }

  return response;
}

export const config = {
  matcher: [
    "/dashboard/:path*",
    "/heroslider/:path*",
    "/addnews/:path*",
    "/addgallery/:path*",
    "/contactinfo/:path*",
    "/hajjahlist/:path*",
    "/hajjahadd/:path*",
    "/myprofile/:path*",
    "/duepayment/:path*",
    "/view-all-slider/:path*",
    "/gallery-view-details/:path*",
    "/news-view-details/:path*",
    "/agents/:path*",
    "/login",
  ],
};