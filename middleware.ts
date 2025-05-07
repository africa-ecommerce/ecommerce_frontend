

import { NextResponse, NextRequest } from "next/server";
import {
  authRoutes,
  publicRoutes,
  supplierRoutes,
  plugRoutes,
  DEFAULT_LOGIN_REDIRECT,
  pathnameStartsWith,
} from "@/routes";
import { jwtVerify } from "jose";

// This should match the secret from your backend
const JWT_SECRET = process.env.JWT_SECRET || "defaultsecret";
// Convert to proper format for jose
const JWT_SECRET_KEY = new TextEncoder().encode(JWT_SECRET);

// Global refresh state tracking (for concurrent request handling)
let refreshPromise: Promise<boolean> | null = null;
let refreshPromiseTimestamp: number = 0;
const REFRESH_CACHE_TTL = 10000; // 10 seconds in milliseconds

export async function middleware(request: NextRequest) {
  const { nextUrl } = request;
  const pathname = nextUrl.pathname;



       
 if (request.nextUrl.pathname.startsWith('/api/og/')) {
    // Get response
    const response = NextResponse.next();
    
    // Add cache headers for CDNs and browsers
    response.headers.set('Cache-Control', 'public, max-age=86400, s-maxage=86400, stale-while-revalidate=86400');
    response.headers.set('Vary', 'Accept-Encoding, Accept');
    
    return response;
  }





  // Skip middleware for API routes and public assets
  if (pathname.startsWith("/api") || pathname.includes(".")) {
    return NextResponse.next();
  }

  // Handle authentication routes
  if (authRoutes.includes(pathname)) {
    const accessToken = request.cookies.get("accessToken");
    const refreshToken = request.cookies.get("refreshToken");

    if (accessToken || refreshToken) {
      return NextResponse.redirect(
        new URL(DEFAULT_LOGIN_REDIRECT, nextUrl.origin)
      );
    }
    return NextResponse.next();
  }

  // Handle public routes
  if (publicRoutes.includes(pathname)) {
    return NextResponse.next();
  }

  // Handle protected routes
  const authResult = await verifyAuth(request);

  // If not authenticated and trying to access protected route
  if (!authResult.isAuthenticated) {
    let callbackUrl = pathname;
    if (nextUrl.search) {
      callbackUrl += nextUrl.search;
    }

    const encodedCallBackUrl = encodeURIComponent(callbackUrl);
    return NextResponse.redirect(
      new URL(`/auth/login?callbackUrl=${encodedCallBackUrl}`, nextUrl.origin)
    );
  }

  // User is authenticated at this point
  if (authResult.user) {
    const userType = authResult.user.userType;

    // ROLE-BASED ACCESS CONTROL
    // Check if supplier is trying to access plug routes
    if (userType === "SUPPLIER" && pathnameStartsWith(pathname, plugRoutes)) {
      // Redirect supplier to their dashboard if they try to access plug routes
      return NextResponse.redirect(new URL("/dashboard", nextUrl.origin));
    }

    // Check if plug is trying to access supplier routes
    if (userType === "PLUG" && pathnameStartsWith(pathname, supplierRoutes)) {
      // Redirect plug to their dashboard if they try to access supplier routes
      return NextResponse.redirect(new URL("/dashboard", nextUrl.origin));
    }

    // Onboarding routes check
    const isOnboardingRoute =
      pathname === "/onboarding" || pathname.startsWith("/onboarding/");

    // Handle onboarding status redirects
    // If user is not onboarded and trying to access protected routes (except onboarding)
    if (
      !authResult.user.isOnboarded &&
      !publicRoutes.includes(pathname) &&
      !isOnboardingRoute
    ) {
      return NextResponse.redirect(new URL("/onboarding", nextUrl.origin));
    }

    // If user is already onboarded but trying to access onboarding routes
    if (authResult.user.isOnboarded && isOnboardingRoute) {
      return NextResponse.redirect(new URL("/dashboard", nextUrl.origin));
    }
  }

  // Pass user data to server components via headers
  const response = NextResponse.next();

  if (authResult.isAuthenticated && authResult.user) {
    // Store essential user data in a request header that server components can access
    response.headers.set(
      "X-User-Data",
      JSON.stringify({
        id: authResult.user.id,
        name: authResult.user.name,
        isOnboarded: authResult.user.isOnboarded,
        userType: authResult.user.userType,
      })
    );
  }

  return response;
}

// This function handles concurrent refresh token requests
async function getRefreshResult(request: NextRequest): Promise<boolean> {
  const currentTime = Date.now();

  // If there's an existing refresh operation in progress and it's still fresh
  if (
    refreshPromise &&
    currentTime - refreshPromiseTimestamp < REFRESH_CACHE_TTL
  ) {
    console.log("Using cached refresh operation"); // Reusing existing refresh operation
    return await refreshPromise;
  }

  // Start a new refresh operation and cache it
  refreshPromiseTimestamp = currentTime;
  refreshPromise = refreshTokens(request);

  // Set up cleanup of the cache after completion
  refreshPromise.finally(() => {
    // Keep the result cached for a short time before clearing
    setTimeout(() => {
      if (currentTime === refreshPromiseTimestamp) {
        refreshPromise = null;
      }
    }, REFRESH_CACHE_TTL);
  });

  return await refreshPromise;
}

// Function to refresh tokens
async function refreshTokens(request: NextRequest): Promise<boolean> {
  try {
    const response = await fetch(`${process.env.BACKEND_URL}/auth/refresh`, {
      method: "POST",
      headers: { Cookie: request.headers.get("Cookie") || "" },
      credentials: "include",
    });

    return response.ok;
  } catch (error) {
    console.error("Refresh tokens failed:", error);
    return false;
  }
}

// Verify auth directly from the JWT without an API call - using jose instead of jsonwebtoken
async function verifyAuth(request: NextRequest): Promise<{
  isAuthenticated: boolean;
  user?: {
    id: string;
    name: string;
    isOnboarded: boolean;
    userType: string;
  };
}> {
  try {
    // Get the access token from cookies
    const accessToken = request.cookies.get("accessToken")?.value;
    const refreshToken = request.cookies.get("refreshToken")?.value;

    // If no tokens at all, return not authenticated immediately
    if (!accessToken && !refreshToken) {
      return { isAuthenticated: false };
    }

    if (accessToken) {
      try {
        // Verify and decode the JWT directly in the middleware using jose
        const { payload } = await jwtVerify(accessToken, JWT_SECRET_KEY, {
          algorithms: ["HS256"], // Make sure this matches what your backend uses
        });

        // Return the user data directly from the JWT
        return {
          isAuthenticated: true,
          user: {
            id: payload.userId as string,
            name: payload.name as string,
            isOnboarded: payload.isOnboarded as boolean,
            userType: payload.userType as string,
          },
        };
      } catch (error) {
        // Token validation failed (could be expired), try refresh
        if (refreshToken) {
          // Use the concurrent request handling for refresh
          const refreshSuccessful = await getRefreshResult(request);

          if (refreshSuccessful) {
            // Get fresh cookie data after refresh
            const newAccessToken = request.cookies.get("accessToken")?.value;

            // Important: Only proceed if we definitely have a new access token
            if (newAccessToken) {
              try {
                // Verify the new token
                const { payload } = await jwtVerify(
                  newAccessToken,
                  JWT_SECRET_KEY,
                  {
                    algorithms: ["HS256"],
                  }
                );

                return {
                  isAuthenticated: true,
                  user: {
                    id: payload.userId as string,
                    name: payload.name as string,
                    isOnboarded: payload.isOnboarded as boolean,
                    userType: payload.userType as string,
                  },
                };
              } catch (error) {
                // If the new token verification fails, authentication fails
                console.error("New token verification failed:", error);
                return { isAuthenticated: false };
              }
            }
          }

          // If refresh failed or no new access token was obtained, authentication fails
          return { isAuthenticated: false };
        }
        // For JWT errors or failed refresh, authentication fails
        return { isAuthenticated: false };
      }
    } else if (refreshToken) {
      // Only have refresh token, try to get an access token
      const refreshSuccessful = await getRefreshResult(request);

      if (refreshSuccessful) {
        // Check if we got a new access token
        const newAccessToken = request.cookies.get("accessToken")?.value;

        if (newAccessToken) {
          try {
            // Verify the new token
            const { payload } = await jwtVerify(
              newAccessToken,
              JWT_SECRET_KEY,
              {
                algorithms: ["HS256"],
              }
            );

            return {
              isAuthenticated: true,
              user: {
                id: payload.userId as string,
                name: payload.name as string,
                isOnboarded: payload.isOnboarded as boolean,
                userType: payload.userType as string,
              },
            };
          } catch (error) {
            console.error("New token verification failed:", error);
            return { isAuthenticated: false };
          }
        }
      }

      return { isAuthenticated: false };
    }

    return { isAuthenticated: false };
  } catch (error) {
    console.error("Auth verification failed:", error);
    return { isAuthenticated: false };
  }
}

export const config = {
  matcher: ["/((?!_next/static|_next/image|favicon.ico).*)"],
};

