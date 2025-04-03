// import {
//   DEFAULT_LOGIN_REDIRECT,
//   apiAuthPrefix,
//   authRoutes,
//   publicRoutes,
// } from "@/routes";

// import { NextResponse, NextRequest } from "next/server";

//  const auth = (req: NextRequest) => {
//   const { nextUrl } = req;

//   // Check if access token exists in cookies
//   const accessToken = req.cookies.get("accessToken");

//   // User is considered logged in if accessToken is present --> full jwt validation in the backend
//   const isLoggedIn = !!accessToken;

//   const isApiAuthRoute = nextUrl.pathname.startsWith(apiAuthPrefix);
//   const isPublicRoute = publicRoutes.includes(nextUrl.pathname);
//   const isAuthRoute = authRoutes.includes(nextUrl.pathname);

//   if (isApiAuthRoute) {
//     return;
//   }

//   if (isAuthRoute) {
//     if (isLoggedIn && nextUrl.pathname !== DEFAULT_LOGIN_REDIRECT) {
//       return NextResponse.redirect(new URL(DEFAULT_LOGIN_REDIRECT, nextUrl));
//     }
//     return;
//   }

//   if (!isLoggedIn && !isPublicRoute) {
//     let callbackUrl = nextUrl.pathname;
//     if (nextUrl.search) {
//       callbackUrl += nextUrl.search;
//     }

//     const encodedCallBackUrl = encodeURIComponent(callbackUrl);
//     return NextResponse.redirect(
//       new URL(`/auth/login?callbackUrl=${encodedCallBackUrl}`, nextUrl)
//     );
//   }

//   return;
// };

// export default auth;

// // Optionally, don't invoke Middleware on some paths
// export const config = {
//   matcher: ["/((?!.*\\..*|_next).*)", "/", "/(api|trpc)(.*)"],
// };

// @/middleware.ts
import { NextResponse, NextRequest } from "next/server";
import { authRoutes, publicRoutes, DEFAULT_LOGIN_REDIRECT } from "@/routes";

export async function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl;
  const accessToken = request.cookies.get("accessToken");
  const refreshToken = request.cookies.get("refreshToken");

  // Skip middleware for API routes and public assets
  if (pathname.startsWith("/api") || pathname.includes(".")) {
    return NextResponse.next();
  }

  // Handle authentication routes
  if (authRoutes.includes(pathname)) {
    if (accessToken || refreshToken) {
      return NextResponse.redirect(
        new URL(DEFAULT_LOGIN_REDIRECT, request.url)
      );
    }
    return NextResponse.next();
  }

  // Handle protected routes
  const isAuthenticated = await verifyAuth(request);
  if (!isAuthenticated && !publicRoutes.includes(pathname)) {
    return NextResponse.redirect(
      new URL(
        `/auth/login?callbackUrl=${encodeURIComponent(pathname)}`,
        request.url
      )
    );
  }

  return NextResponse.next();
}

async function verifyAuth(request: NextRequest): Promise<boolean> {
  try {
    // First check access token
    const accessToken = request.cookies.get("accessToken")?.value;
    if (accessToken) return true;

    // Attempt refresh if refresh token exists
    const refreshToken = request.cookies.get("refreshToken")?.value;
    if (refreshToken) {
      const response = NextResponse.next();
      await refreshTokens(request, response);
      return true;
    }

    return false;
  } catch (error) {
    console.error("Auth verification failed:", error);
    return false;
  }
}

async function refreshTokens(request: NextRequest, response: NextResponse) {
  try {
    const refreshResponse = await fetch(
      `${process.env.NEXT_PUBLIC_API_URL}/auth/refresh`,
      {
        method: "POST",
        headers: { Cookie: request.headers.get("Cookie") || "" },
        credentials: "include",
      }
    );

    if (!refreshResponse.ok) throw new Error("Refresh failed");

    // Update response cookies from Set-Cookie headers
    const cookies = refreshResponse.headers.getSetCookie();
    cookies.forEach((cookie) => {
      const [keyValue, ...options] = cookie.split("; ");
      const [key, value] = keyValue.split("=");
      response.cookies.set(key, value, {
        httpOnly: true,
        secure: process.env.NODE_ENV === "production",
        sameSite: "lax",
        ...Object.fromEntries(
          options.map((opt) => {
            const [k, v] = opt.split("=");
            return [k.trim().toLowerCase(), v?.trim()];
          })
        ),
      });
    });
  } catch (error) {
    response.cookies.delete("accessToken");
    response.cookies.delete("refreshToken");
    throw error;
  }
}

export const config = {
  matcher: ["/((?!_next/static|_next/image|favicon.ico).*)"],
};
