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
//     const pageWithHtml = page.endsWith(".html") ? page: `${page}.html`;
//     return NextResponse.rewrite(
//       new URL(
//         `${process.env.BACKEND_URL}/template/primary/${pageWithHtml}`
//       )
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

//   // Handle authentication routes
//   if (authRoutes.includes(pathname)) {
//     const accessToken = request.cookies.get("accessToken")?.value;
//     const refreshToken = request.cookies.get("refreshToken")?.value;

    

//     if (accessToken) {
//       return NextResponse.redirect(
//         new URL(DEFAULT_LOGIN_REDIRECT, nextUrl.origin)
//       );
//     }
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

//         if (refreshData.success === true && refreshData.accessToken && refreshData.refreshToken) {
//           // Check for tokens even if success property missing
//           // Create a response that continues to the original path
//           // IMPORTANT: Use next() instead of redirect() to avoid losing cookies
//           // const response = NextResponse.next();

//           const response = NextResponse.redirect(request.nextUrl);

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

//             response.cookies.set("refreshToken", refreshData.refreshToken, {
//               ...cookieConfig,
//               maxAge: Math.floor(REFRESH_TOKEN_EXPIRY), 
//             });

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

//              // If we got here, refresh failed
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

export async function middleware(request: NextRequest) {
  const { nextUrl } = request;
  const pathname = nextUrl.pathname;
  const hostname = request.headers.get("host") || "";
  const isPublicRoute = publicRoutes.some((pattern) => pattern.test(pathname));

  // Subdomain handling - unchanged from original
  if (
    hostname.endsWith(".pluggn.store") &&
    hostname !== "www.pluggn.store" &&
    hostname !== "pluggn.store"
  ) {
    const subdomain = hostname.replace(".pluggn.store", "");

    // ✅ Check if subdomain exists using internal API
    const checkUrl = `${process.env.BACKEND_URL}/public/store/verifySubdomain?subdomain=${subdomain}`;

    try {
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

    // If the subdomain is valid, render the static page
    if (pathname === "/") {
      return NextResponse.rewrite(
        new URL(`${process.env.BACKEND_URL}/template/primary/index.html`)
      );
    }

    const page = pathname.replace(/^\/+/, "");
    const pageWithHtml = page.endsWith(".html") ? page : `${page}.html`;
    return NextResponse.rewrite(
      new URL(`${process.env.BACKEND_URL}/template/primary/${pageWithHtml}`)
    );
  }

  // Skip middleware for API routes and public assets - unchanged from original
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

  // ✅ CHANGED: Moved public route check earlier to bypass all auth logic
  // This prevents unnecessary token validation on public routes
  if (
    isPublicRoute ||
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

  // ✅ CHANGED: Added helper function to attempt token refresh
  // This centralizes the refresh logic and makes it reusable
  const attemptTokenRefresh = async (refreshToken: string) => {
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
          return {
            success: true,
            accessToken: refreshData.accessToken,
            refreshToken: refreshData.refreshToken,
          };
        }
      }
      return { success: false };
    } catch (error) {
      console.error("Error during token refresh:", error);
      return { success: false };
    }
  };

  // ✅ CHANGED: Added helper function to validate access token
  // This separates token validation logic and makes it reusable
  const validateAccessToken = async (token: string) => {
    try {
      const { payload } = await jwtVerify(token, JWT_SECRET_KEY, {
        algorithms: ["HS256"],
      });
      return { valid: true, payload };
    } catch (error) {
      return { valid: false, payload: null };
    }
  };

  // ✅ CHANGED: Added helper function to create authenticated response with role checks
  // This consolidates user data setting and role-based access control
  const createAuthenticatedResponse = async (accessToken: string) => {
    const { valid, payload } = await validateAccessToken(accessToken);

    if (!valid || !payload) {
      return null;
    }

    const userData = {
      id: payload.userId as string,
      name: (payload.name as string) || "",
      isOnboarded: payload.isOnboarded as boolean,
      userType: payload.userType as string,
    };

    // ✅ CHANGED: Handle auth routes properly - redirect authenticated users to dashboard
    // Previously, this was handled separately and didn't validate token expiry
    if (authRoutes.includes(pathname)) {
      return NextResponse.redirect(
        new URL(DEFAULT_LOGIN_REDIRECT, nextUrl.origin)
      );
    }

    const response = NextResponse.next();
    response.headers.set("X-User-Data", JSON.stringify(userData));

    const userType = payload.userType as string;
    const isOnboarded = payload.isOnboarded as boolean;

    // ROLE-BASED ACCESS CONTROL
    if (userType === "SUPPLIER" && pathnameStartsWith(pathname, plugRoutes)) {
      return NextResponse.redirect(new URL("/dashboard", nextUrl.origin));
    }

    if (userType === "PLUG" && pathnameStartsWith(pathname, supplierRoutes)) {
      return NextResponse.redirect(new URL("/dashboard", nextUrl.origin));
    }

    // Onboarding check
    const isOnboardingRoute =
      pathname === "/onboarding" || pathname.startsWith("/onboarding/");

    if (
      !isOnboarded &&
      !isOnboardingRoute &&
      !isPublicRoute &&
      !(pathname.startsWith("/products/") && pathname.split("/").length === 3)
    ) {
      return NextResponse.redirect(new URL("/onboarding", nextUrl.origin));
    }

    if (isOnboarded && isOnboardingRoute) {
      return NextResponse.redirect(new URL("/dashboard", nextUrl.origin));
    }

    return response;
  };

  // ✅ REMOVED: The separate auth routes handling block that was here
  // This was causing the issue where auth routes wouldn't refresh tokens
  // Old code:
  // if (authRoutes.includes(pathname)) {
  //   const accessToken = request.cookies.get("accessToken")?.value;
  //   const refreshToken = request.cookies.get("refreshToken")?.value;
  //   if (accessToken) {
  //     return NextResponse.redirect(new URL(DEFAULT_LOGIN_REDIRECT, nextUrl.origin));
  //   }
  //   return NextResponse.next();
  // }

  // ✅ REMOVED: Duplicate public route check that was here
  // This was moved to the top for better performance

  // Main authentication logic - restructured for clarity
  let currentAccessToken = accessToken;
  let currentRefreshToken = refreshToken;

  // No tokens at all, redirect to login
  if (!currentAccessToken && !currentRefreshToken) {
    let callbackUrl = pathname;
    if (nextUrl.search) {
      callbackUrl += nextUrl.search;
    }
    const encodedCallBackUrl = encodeURIComponent(callbackUrl);
    return NextResponse.redirect(
      new URL(`/auth/login?callbackUrl=${encodedCallBackUrl}`, nextUrl.origin)
    );
  }

  // ✅ CHANGED: Simplified token validation flow
  // Try validating the access token first
  if (currentAccessToken) {
    const { valid } = await validateAccessToken(currentAccessToken);

    if (valid) {
      // Token is valid, reset refresh attempt counter and proceed
      const response = await createAuthenticatedResponse(currentAccessToken);
      if (response && refreshAttemptCount > 0) {
        response.cookies.delete("refreshAttempt");
      }
      return response;
    }
    // If we reach here, access token is invalid/expired, continue to refresh logic
  }

  // ✅ CHANGED: Improved refresh token handling with proper attempt counting
  // Access token is invalid/expired, try refresh token
  if (currentRefreshToken) {
    // ✅ ADDED: Actually increment the refresh attempt counter (was missing in original)
    const newRefreshAttemptCount = refreshAttemptCount + 1;

    const refreshResult = await attemptTokenRefresh(currentRefreshToken);

    if (refreshResult.success) {
      // Refresh successful, create response with new tokens
      const response = await createAuthenticatedResponse(
        refreshResult.accessToken!
      );

      if (response) {
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

        // Set the new tokens
        response.cookies.set("accessToken", refreshResult.accessToken!, {
          ...cookieConfig,
          maxAge: Math.floor(ACCESS_TOKEN_EXPIRY),
        });

        if (refreshResult.refreshToken) {
          response.cookies.set("refreshToken", refreshResult.refreshToken, {
            ...cookieConfig,
            maxAge: Math.floor(REFRESH_TOKEN_EXPIRY),
          });
        }

        // Clear refresh attempt counter
        response.cookies.delete("refreshAttempt");

        return response;
      }
    } else {
      // ✅ CHANGED: Proper handling of failed refresh attempts
      // Refresh failed, check if we should try again
      if (newRefreshAttemptCount < 2) {
        // Still have attempts left, set the counter and redirect to try again
        const response = NextResponse.redirect(nextUrl);
        response.cookies.set(
          "refreshAttempt",
          newRefreshAttemptCount.toString(),
          {
            httpOnly: true,
            secure: process.env.NODE_ENV === "production",
            sameSite: process.env.NODE_ENV === "production" ? "none" : "lax",
            path: "/",
            maxAge: 60, // Short expiry for attempt counter
          }
        );
        return response;
      }
      // If we've exhausted attempts, fall through to login redirect
    }
  }

  // ✅ SIMPLIFIED: All refresh attempts failed or no refresh token, redirect to login
  // This replaces the multiple similar blocks in the original code
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

export const config = {
  matcher: ["/((?!_next/static|_next/image|favicon.ico).*)"],
};