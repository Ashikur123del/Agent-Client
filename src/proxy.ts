import { NextRequest, NextResponse } from "next/server";

export function proxy(request: NextRequest) {
  const { pathname } = request.nextUrl;

  const token =
    request.cookies.get("__Secure-better-auth.session_token")?.value ||
    request.cookies.get("better-auth.session_token")?.value;

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

  if (isProtectedRoute && !token) {
    const loginUrl = new URL("/login", request.url);
    loginUrl.searchParams.set("callbackUrl", pathname);
    return NextResponse.redirect(loginUrl);
  }

  if (pathname === "/login" && token) {
    return NextResponse.redirect(new URL("/dashboard", request.url));
  }

  const response = NextResponse.next();

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