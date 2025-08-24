// import { NextResponse, NextRequest } from "next/server";
// import { jwtVerify } from "jose";

// import {
//   authRoutes,
//   publicRoutes,
//   supplierRoutes,
//   plugRoutes,
//   DEFAULT_LOGIN_REDIRECT,
//   pathnameStartsWith,
// } from "@/routes";

// // Setup constants
// const JWT_SECRET = process.env.JWT_SECRET || "defaultsecret";
// const JWT_SECRET_KEY = new TextEncoder().encode(JWT_SECRET);
// const ACCESS_TOKEN_EXPIRY = 15 * 60;
// const REFRESH_TOKEN_EXPIRY = 7 * 24 * 60 * 60;

// export async function middleware(request: NextRequest) {
//   const { nextUrl } = request;
//   const pathname = nextUrl.pathname;
//   const hostname = request.headers.get("host") || "";
//   const isPublicRoute = publicRoutes.some((pattern) => pattern.test(pathname));

//   if (
//     hostname.endsWith(".pluggn.store") &&
//     hostname !== "www.pluggn.store" &&
//     hostname !== "pluggn.store"
//   ) {
//     const subdomain = hostname.replace(".pluggn.store", "");

//     // ✅ Check if subdomain exists using internal API
//     const checkUrl = `${process.env.BACKEND_URL}/public/store/verifySubdomain?subdomain=${subdomain}`;

//     try {
//       const resp = await fetch(checkUrl);
//       const data = await resp.json();

//       if (!data.exists) {
//         return NextResponse.redirect(
//           new URL(`${process.env.APP_URL}/subdomain-error`)
//         );
//       }
//     } catch (e) {
//       console.error("Failed to check subdomain", e);
//       return NextResponse.redirect(
//         new URL(`${process.env.APP_URL}/subdomain-error`)
//       );
//     }

//     // If the subdomain is valid, render the static page
//     if (pathname === "/") {
//       return NextResponse.rewrite(
//         new URL(`${process.env.BACKEND_URL}/template/primary/index.html`)
//       );
//     }

//     const page = pathname.replace(/^\/+/, "");
//     const pageWithHtml = page.endsWith(".html") ? page : `${page}.html`;
//     return NextResponse.rewrite(
//       new URL(`${process.env.BACKEND_URL}/template/primary/${pageWithHtml}`)
//     );
//   }

//   // Skip middleware for API routes and public assets
//   if (pathname.startsWith("/api") || pathname.includes(".")) {
//     // Special handling for OG routes
//     if (request.nextUrl.pathname.startsWith("/api/og/")) {
//       const response = NextResponse.next();
//       // Add cache headers for CDNs and browsers
//       response.headers.set(
//         "Cache-Control",
//         "public, max-age=3600, s-maxage=86400, stale-while-revalidate=604800"
//       );
//       response.headers.set("Vary", "Accept-Encoding, Accept");
//       return response;
//     }
//     return NextResponse.next();
//   }

//   // Handle authentication routes (login, register, etc.)
//   if (authRoutes.includes(pathname)) {
//     const accessToken = request.cookies.get("accessToken")?.value;

//     if (accessToken) {
//       try {
//         await jwtVerify(accessToken, JWT_SECRET_KEY, { algorithms: ["HS256"] });
//         // ✅ Logged in → redirect away from login/register
//         return NextResponse.redirect(
//           new URL(DEFAULT_LOGIN_REDIRECT, nextUrl.origin)
//         );
//       } catch {
//         // ❌ Token invalid/expired → ignore, let them access login/register
//       }
//     }

//     // ✅ Always stop here — do not try refresh for /auth/*
//     return NextResponse.next();
//   }

//   // Handle public routes or product detail pages
//   if (
//     isPublicRoute ||
//     (pathname.startsWith("/products/") && pathname.split("/").length === 3)
//   ) {
//     return NextResponse.next();
//   }

//   // Get current cookies state
//   const accessToken = request.cookies.get("accessToken")?.value;
//   const refreshToken = request.cookies.get("refreshToken")?.value;

//   // Track refresh attempts to prevent loops
//   const refreshAttemptCount = parseInt(
//     request.cookies.get("refreshAttempt")?.value || "0"
//   );

//   // CRITICAL: If we've tried refreshing too many times, clear cookies and force login
//   if (refreshAttemptCount >= 2) {
//     let callbackUrl = pathname;
//     if (nextUrl.search) {
//       callbackUrl += nextUrl.search;
//     }
//     const encodedCallBackUrl = encodeURIComponent(callbackUrl);
//     const response = NextResponse.redirect(
//       new URL(`/auth/login?callbackUrl=${encodedCallBackUrl}`, nextUrl.origin)
//     );
//     response.cookies.delete("accessToken");
//     response.cookies.delete("refreshToken");
//     response.cookies.delete("refreshAttempt");
//     return response;
//   }

//   // No tokens at all, redirect to login
//   if (!accessToken && !refreshToken) {
//     let callbackUrl = pathname;
//     if (nextUrl.search) {
//       callbackUrl += nextUrl.search;
//     }
//     const encodedCallBackUrl = encodeURIComponent(callbackUrl);
//     return NextResponse.redirect(
//       new URL(`/auth/login?callbackUrl=${encodedCallBackUrl}`, nextUrl.origin)
//     );
//   }

//   // Try validating the access token first
//   if (accessToken) {
//     try {
//       // Verify and decode the JWT directly
//       const { payload } = await jwtVerify(accessToken, JWT_SECRET_KEY, {
//         algorithms: ["HS256"],
//       });

//       // Token is valid, reset refresh attempt counter
//       const response = NextResponse.next();

//       // If there was a previous refresh attempt, clear it
//       if (refreshAttemptCount > 0) {
//         response.cookies.delete("refreshAttempt");
//       }

//       // Pass user data to server components
//       if (payload) {
//         const userData = {
//           id: payload.userId as string,
//           name: (payload.name as string) || "",
//           isOnboarded: payload.isOnboarded as boolean,
//           userType: payload.userType as string,
//         };

//         response.headers.set("X-User-Data", JSON.stringify(userData));

//         const userType = payload.userType as string;
//         const isOnboarded = payload.isOnboarded as boolean;

//         // ROLE-BASED ACCESS CONTROL
//         // Check if supplier is trying to access plug routes
//         if (
//           userType === "SUPPLIER" &&
//           pathnameStartsWith(pathname, plugRoutes)
//         ) {
//           return NextResponse.redirect(new URL("/dashboard", nextUrl.origin));
//         }

//         // Check if plug is trying to access supplier routes
//         if (
//           userType === "PLUG" &&
//           pathnameStartsWith(pathname, supplierRoutes)
//         ) {
//           return NextResponse.redirect(new URL("/dashboard", nextUrl.origin));
//         }

//         // Onboarding check
//         const isOnboardingRoute =
//           pathname === "/onboarding" || pathname.startsWith("/onboarding/");

//         // If not onboarded and trying to access protected routes
//         if (
//           !isOnboarded &&
//           !isOnboardingRoute &&
//           !isPublicRoute &&
//           !(
//             pathname.startsWith("/products/") &&
//             pathname.split("/").length === 3
//           )
//         ) {
//           return NextResponse.redirect(new URL("/onboarding", nextUrl.origin));
//         }

//         // If already onboarded but trying to access onboarding routes
//         if (isOnboarded && isOnboardingRoute) {
//           return NextResponse.redirect(new URL("/dashboard", nextUrl.origin));
//         }
//       }

//       return response;
//     } catch (error) {
//       // Token validation failed (expired), fall through to refresh logic
//     }
//   }

//   // We're here because either:
//   // 1. No access token but has refresh token
//   // 2. Access token was invalid and we have a refresh token

//   if (refreshToken) {
//     try {
//       // Create a new request to refresh token endpoint
//       const refreshReq = new Request(
//         `${process.env.BACKEND_URL}/auth/refresh`,
//         {
//           method: "POST",
//           headers: {
//             "Content-Type": "application/json",
//             Cookie: `refreshToken=${refreshToken}`,
//           },
//           credentials: "include",
//         }
//       );

//       const refreshRes = await fetch(refreshReq);

//       if (refreshRes.ok) {
//         // Parse response to get tokens
//         const refreshData = await refreshRes.json();

//         // Add debug

//         if (
//           refreshData.success === true &&
//           refreshData.accessToken &&
//           refreshData.refreshToken
//         ) {
//           // Check for tokens even if success property missing
//           // Create a response that continues to the original path
//           // IMPORTANT: Use next() instead of redirect() to avoid losing cookies
//           const response = NextResponse.next();

//           // const response = NextResponse.redirect(request.nextUrl);

//           // Set cookies manually (this is more reliable than forwarding set-cookie headers)
//           // We use same cookie config as backend
//           const cookieConfig = {
//             httpOnly: true,
//             secure: process.env.NODE_ENV === "production",
//             sameSite:
//               process.env.NODE_ENV === "production"
//                 ? ("none" as const)
//                 : ("lax" as const),
//             domain: process.env.DOMAIN,
//             path: "/",
//           };

//           // Set the new access token cookie
//           response.cookies.set("accessToken", refreshData.accessToken, {
//             ...cookieConfig,
//             maxAge: Math.floor(ACCESS_TOKEN_EXPIRY),
//           });

//           response.cookies.set("refreshToken", refreshData.refreshToken, {
//             ...cookieConfig,
//             maxAge: Math.floor(REFRESH_TOKEN_EXPIRY),
//           });

//           // Clear any refresh attempt counter
//           response.cookies.delete("refreshAttempt");

//           // CRITICAL: Decode the new access token to extract user data
//           try {
//             const { payload } = await jwtVerify(
//               refreshData.accessToken,
//               JWT_SECRET_KEY,
//               {
//                 algorithms: ["HS256"],
//               }
//             );

//             // Pass user data to server components
//             if (payload) {
//               const userData = {
//                 id: payload.userId as string,
//                 name: (payload.name as string) || "",
//                 isOnboarded: payload.isOnboarded as boolean,
//                 userType: payload.userType as string,
//               };

//               response.headers.set("X-User-Data", JSON.stringify(userData));

//               // Apply the same role-based access control as in the normal flow
//               const userType = payload.userType as string;
//               const isOnboarded = payload.isOnboarded as boolean;

//               // ROLE-BASED ACCESS CONTROL
//               // Check if supplier is trying to access plug routes
//               if (
//                 userType === "SUPPLIER" &&
//                 pathnameStartsWith(pathname, plugRoutes)
//               ) {
//                 return NextResponse.redirect(
//                   new URL("/dashboard", nextUrl.origin)
//                 );
//               }

//               // Check if plug is trying to access supplier routes
//               if (
//                 userType === "PLUG" &&
//                 pathnameStartsWith(pathname, supplierRoutes)
//               ) {
//                 return NextResponse.redirect(
//                   new URL("/dashboard", nextUrl.origin)
//                 );
//               }

//               // Onboarding check
//               const isOnboardingRoute =
//                 pathname === "/onboarding" ||
//                 pathname.startsWith("/onboarding/");

//               // If not onboarded and trying to access protected routes
//               if (
//                 !isOnboarded &&
//                 !isOnboardingRoute &&
//                 !isPublicRoute &&
//                 !(
//                   pathname.startsWith("/products/") &&
//                   pathname.split("/").length === 3
//                 )
//               ) {
//                 return NextResponse.redirect(
//                   new URL("/onboarding", nextUrl.origin)
//                 );
//               }

//               // If already onboarded but trying to access onboarding routes
//               if (isOnboarded && isOnboardingRoute) {
//                 return NextResponse.redirect(
//                   new URL("/dashboard", nextUrl.origin)
//                 );
//               }
//             }
//           } catch (error) {
//             console.error("Error decoding refreshed token:", error);
//             // If we can't decode the token, continue anyway - the client will
//             // eventually redirect to login on its own
//           }

//           // Return the response that continues with the original request
//           return response;
//         } else {
//           // If we got here, refresh failed
//           let callbackUrl = pathname;
//           if (nextUrl.search) {
//             callbackUrl += nextUrl.search;
//           }
//           const encodedCallBackUrl = encodeURIComponent(callbackUrl);
//           const response = NextResponse.redirect(
//             new URL(
//               `/auth/login?callbackUrl=${encodedCallBackUrl}`,
//               nextUrl.origin
//             )
//           );
//           response.cookies.delete("accessToken");
//           response.cookies.delete("refreshToken");
//           response.cookies.delete("refreshAttempt");
//           return response;
//         }
//       }
//       // If we got here, refresh failed
//       let callbackUrl = pathname;
//       if (nextUrl.search) {
//         callbackUrl += nextUrl.search;
//       }
//       const encodedCallBackUrl = encodeURIComponent(callbackUrl);
//       const response = NextResponse.redirect(
//         new URL(`/auth/login?callbackUrl=${encodedCallBackUrl}`, nextUrl.origin)
//       );
//       response.cookies.delete("accessToken");
//       response.cookies.delete("refreshToken");
//       response.cookies.delete("refreshAttempt");
//       return response;
//     } catch (error) {
//       console.error("Error during token refresh:", error);
//       // Something went wrong with the refresh request
//       let callbackUrl = pathname;
//       if (nextUrl.search) {
//         callbackUrl += nextUrl.search;
//       }
//       const encodedCallBackUrl = encodeURIComponent(callbackUrl);
//       const response = NextResponse.redirect(
//         new URL(`/auth/login?callbackUrl=${encodedCallBackUrl}`, nextUrl.origin)
//       );
//       response.cookies.delete("accessToken");
//       response.cookies.delete("refreshToken");
//       response.cookies.delete("refreshAttempt");
//       return response;
//     }
//   }

//   // Fallback - if we somehow get here, redirect to login
//   let callbackUrl = pathname;
//   if (nextUrl.search) {
//     callbackUrl += nextUrl.search;
//   }
//   const encodedCallBackUrl = encodeURIComponent(callbackUrl);
//   return NextResponse.redirect(
//     new URL(`/auth/login?callbackUrl=${encodedCallBackUrl}`, nextUrl.origin)
//   );
// }

// export const config = {
//   matcher: ["/((?!_next/static|_next/image|favicon.ico).*)"],
// };

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
const ACCESS_TOKEN_EXPIRY = 15 * 60;
const REFRESH_TOKEN_EXPIRY = 7 * 24 * 60 * 60;

// HELPER: Determine if route needs authentication
function needsAuthentication(pathname: string): boolean {
  const isPublicRoute = publicRoutes.some((pattern) => pattern.test(pathname));
  const isAuthRoute = authRoutes.includes(pathname);

  // DEBUG: Log what's happening
  console.log("🔍 DEBUG - Route analysis:", {
    pathname,
    isPublicRoute,
    isAuthRoute,
    needsAuth: !isPublicRoute && !isAuthRoute,
  });

  // Test each public route pattern
  publicRoutes.forEach((pattern, index) => {
    const matches = pattern.test(pathname);
    console.log(
      `   Pattern ${index}: ${pattern} matches "${pathname}": ${matches}`
    );
  });

  // Return true if this route requires authentication
  return !isPublicRoute && !isAuthRoute;
}

export async function middleware(request: NextRequest) {
  const { nextUrl } = request;
  const pathname = nextUrl.pathname;
  const hostname = request.headers.get("host") || "";

  console.log(`🌐 MIDDLEWARE START: ${hostname}${pathname}`);

  // Skip middleware for API routes and public assets FIRST
  if (pathname.startsWith("/api") || pathname.includes(".")) {
    console.log(`⚡ SKIPPING: API/Asset route ${pathname}`);
    if (request.nextUrl.pathname.startsWith("/api/og/")) {
      const response = NextResponse.next();
      response.headers.set(
        "Cache-Control",
        "public, max-age=3600, s-maxage=86400, stale-while-revalidate=604800"
      );
      response.headers.set("Vary", "Accept-Encoding, Accept");
      return response;
    }
    return NextResponse.next();
  }

  // CRITICAL: Check if this route needs authentication EARLY - BEFORE subdomain logic
  const routeNeedsAuth = needsAuthentication(pathname);

  console.log(`🚀 MIDDLEWARE: ${pathname} - needsAuth: ${routeNeedsAuth}`);

  // If route doesn't need authentication, handle it appropriately
  if (!routeNeedsAuth) {
    console.log(`✅ PUBLIC ROUTE: ${pathname} - handling without auth logic`);

    // Handle subdomain logic ONLY for .pluggn.store domains
    if (
      hostname.endsWith(".pluggn.store") &&
      hostname !== "www.pluggn.store" &&
      hostname !== "pluggn.store"
    ) {
      console.log(
        `🏪 SUBDOMAIN PUBLIC: ${hostname} - handling subdomain logic`
      );
      const subdomain = hostname.replace(".pluggn.store", "");

      try {
        const checkUrl = `${process.env.BACKEND_URL}/public/store/verifySubdomain?subdomain=${subdomain}`;
        const resp = await fetch(checkUrl);
        const data = await resp.json();

        if (!data.exists) {
          console.log(`❌ SUBDOMAIN NOT FOUND: ${subdomain}`);
          return NextResponse.redirect(
            new URL(`${process.env.APP_URL}/subdomain-error`)
          );
        }

        console.log(`✅ SUBDOMAIN VERIFIED: ${subdomain}`);
      } catch (e) {
        console.error("Failed to check subdomain", e);
        return NextResponse.redirect(
          new URL(`${process.env.APP_URL}/subdomain-error`)
        );
      }

      if (pathname === "/") {
        console.log(`🏠 SUBDOMAIN ROOT: Rewriting to template`);
        return NextResponse.rewrite(
          new URL(`${process.env.BACKEND_URL}/template/primary/index.html`)
        );
      }

      const page = pathname.replace(/^\/+/, "");
      const pageWithHtml = page.endsWith(".html") ? page : `${page}.html`;
      console.log(
        `📄 SUBDOMAIN PAGE: Rewriting ${pathname} to ${pageWithHtml}`
      );
      return NextResponse.rewrite(
        new URL(`${process.env.BACKEND_URL}/template/primary/${pageWithHtml}`)
      );
    }

    // For main domain (pluggn.com.ng) public routes, just proceed without any auth operations
    console.log(
      `🌍 MAIN DOMAIN PUBLIC: ${hostname}${pathname} - proceeding normally`
    );
    return NextResponse.next();
  }

  // Handle subdomain logic for PROTECTED routes on .pluggn.store
  if (
    hostname.endsWith(".pluggn.store") &&
    hostname !== "www.pluggn.store" &&
    hostname !== "pluggn.store"
  ) {
    console.log(
      `🔒 SUBDOMAIN PROTECTED: ${hostname} - verifying subdomain before auth`
    );
    const subdomain = hostname.replace(".pluggn.store", "");

    try {
      const checkUrl = `${process.env.BACKEND_URL}/public/store/verifySubdomain?subdomain=${subdomain}`;
      const resp = await fetch(checkUrl);
      const data = await resp.json();

      if (!data.exists) {
        return NextResponse.redirect(
          new URL(`${process.env.APP_URL}/subdomain-error`)
        );
      }
    } catch (e) {
      console.error("Failed to check subdomain", e);
      return NextResponse.redirect(
        new URL(`${process.env.APP_URL}/subdomain-error`)
      );
    }

    // Continue to auth logic below for protected routes on subdomains
  }

  // Handle authentication routes - only check if already logged in
  if (authRoutes.includes(pathname)) {
    const accessToken = request.cookies.get("accessToken")?.value;

    if (accessToken) {
      try {
        await jwtVerify(accessToken, JWT_SECRET_KEY, { algorithms: ["HS256"] });
        // Already logged in → redirect away from login/register
        return NextResponse.redirect(
          new URL(DEFAULT_LOGIN_REDIRECT, nextUrl.origin)
        );
      } catch {
        // Token invalid/expired → let them access auth pages (no refresh needed)
      }
    }
    // Not logged in or invalid token → proceed to auth page
    return NextResponse.next();
  }

  // From here on, we're only dealing with routes that NEED authentication
  console.log(`Protected route ${pathname} - running auth logic`);

  // Get current cookies state
  const accessToken = request.cookies.get("accessToken")?.value;
  const refreshToken = request.cookies.get("refreshToken")?.value;
  const refreshAttemptCount = parseInt(
    request.cookies.get("refreshAttempt")?.value || "0"
  );

  // Helper function to redirect to login with callback
  const redirectToLogin = () => {
    let callbackUrl = pathname;
    if (nextUrl.search) {
      callbackUrl += nextUrl.search;
    }
    const encodedCallBackUrl = encodeURIComponent(callbackUrl);
    return NextResponse.redirect(
      new URL(`/auth/login?callbackUrl=${encodedCallBackUrl}`, nextUrl.origin)
    );
  };

  // Helper function to clear all cookies and redirect to login
  const clearCookiesAndRedirect = () => {
    const response = redirectToLogin();
    response.cookies.delete("accessToken");
    response.cookies.delete("refreshToken");
    response.cookies.delete("refreshAttempt");
    return response;
  };

  // Handle too many refresh attempts
  if (refreshAttemptCount >= 2) {
    console.log("Too many refresh attempts - clearing cookies and redirecting");
    return clearCookiesAndRedirect();
  }

  // No tokens at all for protected route
  if (!accessToken && !refreshToken) {
    console.log("No tokens found for protected route - redirecting to login");
    return redirectToLogin();
  }

  // Try validating the access token first
  if (accessToken) {
    try {
      const { payload } = await jwtVerify(accessToken, JWT_SECRET_KEY, {
        algorithms: ["HS256"],
      });

      console.log("Access token valid - proceeding");
      const response = NextResponse.next();

      // Clear refresh attempt counter if it exists
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

        response.headers.set("X-User-Data", JSON.stringify(userData));

        const userType = payload.userType as string;
        const isOnboarded = payload.isOnboarded as boolean;

        // Role-based access control
        if (
          userType === "SUPPLIER" &&
          pathnameStartsWith(pathname, plugRoutes)
        ) {
          return NextResponse.redirect(new URL("/dashboard", nextUrl.origin));
        }

        if (
          userType === "PLUG" &&
          pathnameStartsWith(pathname, supplierRoutes)
        ) {
          return NextResponse.redirect(new URL("/dashboard", nextUrl.origin));
        }

        // Onboarding check
        const isOnboardingRoute =
          pathname === "/onboarding" || pathname.startsWith("/onboarding/");

        if (!isOnboarded && !isOnboardingRoute) {
          return NextResponse.redirect(new URL("/onboarding", nextUrl.origin));
        }

        if (isOnboarded && isOnboardingRoute) {
          return NextResponse.redirect(new URL("/dashboard", nextUrl.origin));
        }
      }

      return response;
    } catch (error) {
      console.log("Access token invalid - will try refresh token");
      // Token validation failed, fall through to refresh logic
    }
  }

  // REFRESH TOKEN LOGIC - Only runs for protected routes now
  if (refreshToken) {
    console.log("Attempting token refresh for protected route");

    try {
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

      if (refreshRes.ok) {
        const refreshData = await refreshRes.json();

        if (
          refreshData.success === true &&
          refreshData.accessToken &&
          refreshData.refreshToken
        ) {
          console.log("Token refresh successful");
          const response = NextResponse.next();

          // Set the new cookies with simple config
          const cookieConfig = {
            httpOnly: true,
            secure: process.env.NODE_ENV === "production",
            sameSite:
              process.env.NODE_ENV === "production"
                ? ("none" as const)
                : ("lax" as const),
            domain: process.env.DOMAIN,
            path: "/",
          };

          response.cookies.set("accessToken", refreshData.accessToken, {
            ...cookieConfig,
            maxAge: Math.floor(ACCESS_TOKEN_EXPIRY),
          });

          response.cookies.set("refreshToken", refreshData.refreshToken, {
            ...cookieConfig,
            maxAge: Math.floor(REFRESH_TOKEN_EXPIRY),
          });

          // Clear refresh attempt counter
          response.cookies.delete("refreshAttempt");

          // Decode the new access token and apply role-based logic
          try {
            const { payload } = await jwtVerify(
              refreshData.accessToken,
              JWT_SECRET_KEY,
              {
                algorithms: ["HS256"],
              }
            );

            if (payload) {
              const userData = {
                id: payload.userId as string,
                name: (payload.name as string) || "",
                isOnboarded: payload.isOnboarded as boolean,
                userType: payload.userType as string,
              };

              response.headers.set("X-User-Data", JSON.stringify(userData));

              // Apply the same role-based access control
              const userType = payload.userType as string;
              const isOnboarded = payload.isOnboarded as boolean;

              if (
                userType === "SUPPLIER" &&
                pathnameStartsWith(pathname, plugRoutes)
              ) {
                return NextResponse.redirect(
                  new URL("/dashboard", nextUrl.origin)
                );
              }

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

              if (!isOnboarded && !isOnboardingRoute) {
                return NextResponse.redirect(
                  new URL("/onboarding", nextUrl.origin)
                );
              }

              if (isOnboarded && isOnboardingRoute) {
                return NextResponse.redirect(
                  new URL("/dashboard", nextUrl.origin)
                );
              }
            }
          } catch (error) {
            console.error("Error decoding refreshed token:", error);
          }

          return response;
        }
      }

      // Refresh failed
      console.log("Token refresh failed - clearing cookies and redirecting");
      return clearCookiesAndRedirect();
    } catch (error) {
      console.error("Error during token refresh:", error);
      return clearCookiesAndRedirect();
    }
  }

  // Fallback - if we get here, something went wrong
  console.log("Fallback - redirecting to login");
  return redirectToLogin();
}

export const config = {
  matcher: ["/((?!_next/static|_next/image|favicon.ico).*)"],
};