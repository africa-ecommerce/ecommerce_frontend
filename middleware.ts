import { NextResponse, NextRequest } from "next/server";
import { jwtVerify } from "jose";

import {
  authRoutes,
  publicRoutes,
  supplierRoutes,
  plugRoutes,
  DEFAULT_LOGIN_REDIRECT,
  pathnameStartsWith,
} from "@/routes";

// Setup constants
const JWT_SECRET = process.env.JWT_SECRET || "defaultsecret";
const JWT_SECRET_KEY = new TextEncoder().encode(JWT_SECRET);
const ACCESS_TOKEN_EXPIRY = 15 * 60 * 1000;
const REFRESH_TOKEN_EXPIRY = 7 * 24 * 60 * 60 * 1000;

export async function middleware(request: NextRequest) {
  const { nextUrl } = request;
  const pathname = nextUrl.pathname;
  const hostname = request.headers.get("host") || "";


  // if (hostname.endsWith(".pluggn.store") && hostname !== "www.pluggn.store" && hostname !== "pluggn.store") {
  //   const subdomain = hostname.replace(".pluggn.store", "");
  //   if (pathname === "/") {
  //     return NextResponse.rewrite(
  //       new URL(`https://ecommerce-backend-peach-sigma.vercel.app/template/primary/index.html`)
  //     );
  //   }

  //   const page = pathname.replace(/^\/+/, "");
  //   return NextResponse.rewrite(
  //     new URL(
  //       `https://ecommerce-backend-peach-sigma.vercel.app/template/primary/${page}.html`
  //     )
  //   );
  // }


  if (
    hostname.endsWith(".pluggn.store") &&
    hostname !== "www.pluggn.store" &&
    hostname !== "pluggn.store"
  ) {
    const subdomain = hostname.replace(".pluggn.store", "");

    // ✅ Check if subdomain exists using internal API
    const checkUrl = `https://ecommerce-backend-peach-sigma.vercel.app/public/store-config/subdomain?subdomain=${subdomain}`;

    try {
      const resp = await fetch(checkUrl);
      const data = await resp.json();

      if (!data.exists) {
        return NextResponse.redirect(
          new URL(`https://pluggn.vercel.app/error/?error=SUBDOMAIN_ERROR`)
        );
      }
    } catch (e) {
      console.error("Failed to check subdomain", e);
      return NextResponse.rewrite(
        new URL("https://ecommerce-backend-peach-sigma.vercel.app/template/primary/error.html")
      );
    }

    // If the subdomain is valid, render the static page
    if (pathname === "/") {
      return NextResponse.rewrite(
        new URL(`https://ecommerce-backend-peach-sigma.vercel.app/template/primary/index.html`)
      );
    }

    const page = pathname.replace(/^\/+/, "");
    return NextResponse.rewrite(
      new URL(`https://ecommerce-backend-peach-sigma.vercel.app/template/primary/${page}.html`)
    );
  }

  

  // Skip middleware for API routes and public assets
  if (pathname.startsWith("/api") || pathname.includes(".")) {
    // Special handling for OG routes
    if (request.nextUrl.pathname.startsWith("/api/og/")) {
      const response = NextResponse.next();
      // Add cache headers for CDNs and browsers
      response.headers.set(
        "Cache-Control",
        "public, max-age=3600, s-maxage=86400, stale-while-revalidate=604800"
      );
      response.headers.set("Vary", "Accept-Encoding, Accept");
      return response;
    }
    return NextResponse.next();
  }

  // Handle authentication routes
  if (authRoutes.includes(pathname)) {
    const accessToken = request.cookies.get("accessToken")?.value;
    const refreshToken = request.cookies.get("refreshToken")?.value;

    if (accessToken || refreshToken) {
      return NextResponse.redirect(
        new URL(DEFAULT_LOGIN_REDIRECT, nextUrl.origin)
      );
    }
    return NextResponse.next();
  }

  // Handle public routes or product detail pages
  if (
    publicRoutes.includes(pathname) ||
    (pathname.startsWith("/products/") && pathname.split("/").length === 3)
  ) {
    return NextResponse.next();
  }

  // Get current cookies state
  const accessToken = request.cookies.get("accessToken")?.value;
  const refreshToken = request.cookies.get("refreshToken")?.value;

  // Track refresh attempts to prevent loops
  const refreshAttemptCount = parseInt(
    request.cookies.get("refreshAttempt")?.value || "0"
  );

  // CRITICAL: If we've tried refreshing too many times, clear cookies and force login
  if (refreshAttemptCount >= 2) {
    console.log(
      "Too many refresh attempts - redirecting to login and clearing cookies"
    );
    let callbackUrl = pathname;
    if (nextUrl.search) {
      callbackUrl += nextUrl.search;
    }
    const encodedCallBackUrl = encodeURIComponent(callbackUrl);
    const response = NextResponse.redirect(
      new URL(`/auth/login?callbackUrl=${encodedCallBackUrl}`, nextUrl.origin)
    );
    response.cookies.delete("accessToken");
    response.cookies.delete("refreshToken");
    response.cookies.delete("refreshAttempt");
    return response;
  }

  // No tokens at all, redirect to login
  if (!accessToken && !refreshToken) {
    let callbackUrl = pathname;
    if (nextUrl.search) {
      callbackUrl += nextUrl.search;
    }
    const encodedCallBackUrl = encodeURIComponent(callbackUrl);
    return NextResponse.redirect(
      new URL(`/auth/login?callbackUrl=${encodedCallBackUrl}`, nextUrl.origin)
    );
  }

  // Try validating the access token first
  if (accessToken) {
    try {
      // Verify and decode the JWT directly
      const { payload } = await jwtVerify(accessToken, JWT_SECRET_KEY, {
        algorithms: ["HS256"],
      });

      // Token is valid, reset refresh attempt counter
      const response = NextResponse.next();

      // If there was a previous refresh attempt, clear it
      if (refreshAttemptCount > 0) {
        response.cookies.delete("refreshAttempt");
      }

      // Pass user data to server components
      if (payload) {
        const userData = {
          id: payload.userId as string,
          name: (payload.name as string) || "",
          isOnboarded: payload.isOnboarded as boolean,
          userType: payload.userType as string,
        };

        console.log("Setting user data from access token:", userData);

        response.headers.set("X-User-Data", JSON.stringify(userData));

        const userType = payload.userType as string;
        const isOnboarded = payload.isOnboarded as boolean;

        // ROLE-BASED ACCESS CONTROL
        // Check if supplier is trying to access plug routes
        if (
          userType === "SUPPLIER" &&
          pathnameStartsWith(pathname, plugRoutes)
        ) {
          return NextResponse.redirect(new URL("/dashboard", nextUrl.origin));
        }

        // Check if plug is trying to access supplier routes
        if (
          userType === "PLUG" &&
          pathnameStartsWith(pathname, supplierRoutes)
        ) {
          return NextResponse.redirect(new URL("/dashboard", nextUrl.origin));
        }

        // Onboarding check
        const isOnboardingRoute =
          pathname === "/onboarding" || pathname.startsWith("/onboarding/");

        // If not onboarded and trying to access protected routes
        if (
          !isOnboarded &&
          !isOnboardingRoute &&
          !publicRoutes.includes(pathname) &&
          !(
            pathname.startsWith("/products/") &&
            pathname.split("/").length === 3
          )
        ) {
          return NextResponse.redirect(new URL("/onboarding", nextUrl.origin));
        }

        // If already onboarded but trying to access onboarding routes
        if (isOnboarded && isOnboardingRoute) {
          return NextResponse.redirect(new URL("/dashboard", nextUrl.origin));
        }
      }

      return response;
    } catch (error) {
      // Token validation failed (expired), fall through to refresh logic
      console.log("Access token invalid, trying refresh flow");
    }
  }

  // We're here because either:
  // 1. No access token but has refresh token
  // 2. Access token was invalid and we have a refresh token

  if (refreshToken) {
    console.log(
      `Attempting to refresh tokens (attempt #${refreshAttemptCount + 1})`
    );

    try {
      // Create a new request to refresh token endpoint
      const refreshReq = new Request(
        `${process.env.BACKEND_URL}/auth/refresh`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Cookie: `refreshToken=${refreshToken}`,
          },
          credentials: "include",
        }
      );

      const refreshRes = await fetch(refreshReq);

      // Add debug
      console.log("Refresh response status:", refreshRes.status);

      if (refreshRes.ok) {
        console.log("Refresh successful, continuing");

        // Parse response to get tokens
        const refreshData = await refreshRes.json();

        // Add debug
        console.log("Refresh data success:", refreshData.success);

        if (refreshData.success || refreshData.accessToken) {
          // Check for tokens even if success property missing
          // Create a response that continues to the original path
          // IMPORTANT: Use next() instead of redirect() to avoid losing cookies
          const response = NextResponse.next();

          // Set cookies manually (this is more reliable than forwarding set-cookie headers)
          // We use same cookie config as backend
          const cookieConfig = {
            httpOnly: true,
            secure: process.env.NODE_ENV === "production",
            sameSite:
              process.env.NODE_ENV === "production"
                ? ("none" as const)
                : ("lax" as const),
            path: "/",
          };

          // Set the new access token cookie
          response.cookies.set("accessToken", refreshData.accessToken, {
            ...cookieConfig,
            maxAge: Math.floor(ACCESS_TOKEN_EXPIRY / 1000), // Convert to seconds
          });

          // Set the new refresh token cookie if it's included in the response
          if (refreshData.refreshToken) {
            response.cookies.set("refreshToken", refreshData.refreshToken, {
              ...cookieConfig,
              maxAge: Math.floor(REFRESH_TOKEN_EXPIRY / 1000), // Convert to seconds
            });
          }

          // Clear any refresh attempt counter
          response.cookies.delete("refreshAttempt");

          console.log("Cookies set, returning to original request");

          // CRITICAL: Decode the new access token to extract user data
          try {
            const { payload } = await jwtVerify(
              refreshData.accessToken,
              JWT_SECRET_KEY,
              {
                algorithms: ["HS256"],
              }
            );

            // Pass user data to server components
            if (payload) {
              const userData = {
                id: payload.userId as string,
                name: (payload.name as string) || "",
                isOnboarded: payload.isOnboarded as boolean,
                userType: payload.userType as string,
              };

              console.log("Setting user data from refreshed token:", userData);

              response.headers.set("X-User-Data", JSON.stringify(userData));

              // Apply the same role-based access control as in the normal flow
              const userType = payload.userType as string;
              const isOnboarded = payload.isOnboarded as boolean;

              // ROLE-BASED ACCESS CONTROL
              // Check if supplier is trying to access plug routes
              if (
                userType === "SUPPLIER" &&
                pathnameStartsWith(pathname, plugRoutes)
              ) {
                return NextResponse.redirect(
                  new URL("/dashboard", nextUrl.origin)
                );
              }

              // Check if plug is trying to access supplier routes
              if (
                userType === "PLUG" &&
                pathnameStartsWith(pathname, supplierRoutes)
              ) {
                return NextResponse.redirect(
                  new URL("/dashboard", nextUrl.origin)
                );
              }

              // Onboarding check
              const isOnboardingRoute =
                pathname === "/onboarding" ||
                pathname.startsWith("/onboarding/");

              // If not onboarded and trying to access protected routes
              if (
                !isOnboarded &&
                !isOnboardingRoute &&
                !publicRoutes.includes(pathname) &&
                !(
                  pathname.startsWith("/products/") &&
                  pathname.split("/").length === 3
                )
              ) {
                return NextResponse.redirect(
                  new URL("/onboarding", nextUrl.origin)
                );
              }

              // If already onboarded but trying to access onboarding routes
              if (isOnboarded && isOnboardingRoute) {
                return NextResponse.redirect(
                  new URL("/dashboard", nextUrl.origin)
                );
              }
            }
          } catch (error) {
            console.error("Error decoding refreshed token:", error);
            // If we can't decode the token, continue anyway - the client will
            // eventually redirect to login on its own
          }

          // Return the response that continues with the original request
          return response;
        } else {
          console.log("Refresh failed - no tokens in response");
        }
      } else {
        console.log("Refresh failed with status:", refreshRes.status);
        try {
          const errorData = await refreshRes.json();
          console.log("Error details:", errorData);
        } catch (e) {
          console.log("Could not parse error response");
        }
      }

      // If we got here, refresh failed
      let callbackUrl = pathname;
      if (nextUrl.search) {
        callbackUrl += nextUrl.search;
      }
      const encodedCallBackUrl = encodeURIComponent(callbackUrl);
      const response = NextResponse.redirect(
        new URL(`/auth/login?callbackUrl=${encodedCallBackUrl}`, nextUrl.origin)
      );
      response.cookies.delete("accessToken");
      response.cookies.delete("refreshToken");
      response.cookies.delete("refreshAttempt");
      return response;
    } catch (error) {
      console.error("Error during token refresh:", error);
      // Something went wrong with the refresh request
      let callbackUrl = pathname;
      if (nextUrl.search) {
        callbackUrl += nextUrl.search;
      }
      const encodedCallBackUrl = encodeURIComponent(callbackUrl);
      const response = NextResponse.redirect(
        new URL(`/auth/login?callbackUrl=${encodedCallBackUrl}`, nextUrl.origin)
      );
      response.cookies.delete("accessToken");
      response.cookies.delete("refreshToken");
      response.cookies.delete("refreshAttempt");
      return response;
    }
  }

  // Fallback - if we somehow get here, redirect to login
  let callbackUrl = pathname;
  if (nextUrl.search) {
    callbackUrl += nextUrl.search;
  }
  const encodedCallBackUrl = encodeURIComponent(callbackUrl);
  return NextResponse.redirect(
    new URL(`/auth/login?callbackUrl=${encodedCallBackUrl}`, nextUrl.origin)
  );
}

export const config = {
  matcher: ["/((?!_next/static|_next/image|favicon.ico).*)"],
};
