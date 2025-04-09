

// // // Optionally, don't invoke Middleware on some paths
// // export const config = {
// //   matcher: ["/((?!.*\\..*|_next).*)", "/", "/(api|trpc)(.*)"],
// // };

// import { NextResponse, NextRequest } from "next/server";
// import { authRoutes, publicRoutes, DEFAULT_LOGIN_REDIRECT } from "@/routes";

// export async function middleware(request: NextRequest) {
//   const { nextUrl } = request;
//   const accessToken = request.cookies.get("accessToken");
//   const refreshToken = request.cookies.get("refreshToken");

//   // Skip middleware for API routes and public assets
//   if (nextUrl.pathname.startsWith("/api") || nextUrl.pathname.includes(".")) {
//     return NextResponse.next();
//   }

//   // Handle authentication routes
//   if (authRoutes.includes(nextUrl.pathname)) {
//     if (accessToken || refreshToken) {
//       return NextResponse.redirect(new URL(DEFAULT_LOGIN_REDIRECT, nextUrl.pathname));
//     }
//     return NextResponse.next();
//   }

//   // Handle protected routes
//   const isAuthenticated = await verifyAuth(request);
//   if (!isAuthenticated && !publicRoutes.includes(nextUrl.pathname)) {
//     let callbackUrl = nextUrl.pathname;
//         if (nextUrl.search) {
//           callbackUrl += nextUrl.search;
//         }

//         const encodedCallBackUrl = encodeURIComponent(callbackUrl);
//     return NextResponse.redirect(
//       new URL(
//         `/auth/login?callbackUrl=${encodeURIComponent(encodedCallBackUrl)}`,
//         nextUrl
//       )
//     );
//   }

//   return NextResponse.next();
// }



// async function verifyAuth(request: NextRequest): Promise<boolean> {
//   try {
//     // First check access token
//     const accessToken = request.cookies.get("accessToken")?.value;
//     if (accessToken) return true;

//     // Attempt refresh if refresh token exists
//     const refreshToken = request.cookies.get("refreshToken")?.value;
//     if (refreshToken) {
//       return await refreshTokens(request);
//     }

//     return false;
//   } catch (error) {
//     console.error("Auth verification failed:", error);
//     return false;
//   }
// }

// async function refreshTokens(request: NextRequest) {
//   try {
//     const response = await fetch(
//       `${process.env.BACKEND_URL}/auth/refresh`,
//       {
//         method: "POST",
//         headers: { Cookie: request.headers.get("Cookie") || "" },
//         credentials: "include",
//       }
//     );

//      if (!response.ok) return false;

//      // If refresh was successful, return true
//      return true;


   
//   } catch (error) {
    
//     console.error("Refresh tokens failed:", error);
//     return false;
//   }
// }

// export const config = {
//   matcher: ["/((?!_next/static|_next/image|favicon.ico).*)"],
// };




// // FRONTEND MIDDLEWARE
// import { NextResponse, NextRequest } from "next/server";
// import { authRoutes, publicRoutes, DEFAULT_LOGIN_REDIRECT } from "@/routes";

// // Global refresh state tracking (for concurrent request handling)
// // This is a server-side cache to prevent multiple simultaneous refresh attempts
// let refreshPromise: Promise<boolean> | null = null;
// let refreshPromiseTimestamp: number = 0;
// const REFRESH_CACHE_TTL = 10000; // 10 seconds in milliseconds

// export async function middleware(request: NextRequest) {
//   const { nextUrl } = request;
//   const accessToken = request.cookies.get("accessToken");
//   const refreshToken = request.cookies.get("refreshToken");

//   // Skip middleware for API routes and public assets
//   if (nextUrl.pathname.startsWith("/api") || nextUrl.pathname.includes(".")) {
//     return NextResponse.next();
//   }

//   // Handle authentication routes
//   if (authRoutes.includes(nextUrl.pathname)) {
//     if (accessToken || refreshToken) {
//       return NextResponse.redirect(new URL(DEFAULT_LOGIN_REDIRECT, nextUrl.pathname));
//     }
//     return NextResponse.next();
//   }

//   // Handle protected routes
//   const isAuthenticated = await verifyAuth(request);
//   if (!isAuthenticated && !publicRoutes.includes(nextUrl.pathname)) {
//     let callbackUrl = nextUrl.pathname;
//     if (nextUrl.search) {
//       callbackUrl += nextUrl.search;
//     }

//     const encodedCallBackUrl = encodeURIComponent(callbackUrl);
//     return NextResponse.redirect(
//       new URL(
//         `/auth/login?callbackUrl=${encodedCallBackUrl}`,
//         nextUrl
//       )
//     );
//   }

//   return NextResponse.next();
// }

// async function verifyAuth(request: NextRequest): Promise<boolean> {
//   try {
//     // First check access token
//     const accessToken = request.cookies.get("accessToken")?.value;
//     if (accessToken) return true;

//     // Attempt refresh if refresh token exists
//     const refreshToken = request.cookies.get("refreshToken")?.value;
//     if (refreshToken) {
//       // FIXED: Implement concurrent request handling
//       return await getRefreshResult(request);
//     }

//     return false;
//   } catch (error) {
//     console.error("Auth verification failed:", error);
//     return false;
//   }
// }

// // ADDED: New function to handle concurrent refresh requests
// async function getRefreshResult(request: NextRequest): Promise<boolean> {
//   const currentTime = Date.now();
  
//   // If there's an existing refresh operation in progress and it's still fresh
//   if (refreshPromise && currentTime - refreshPromiseTimestamp < REFRESH_CACHE_TTL) {
//     console.log("Using cached refresh operation"); // Reusing existing refresh operation
//     return await refreshPromise;
//   }
  
//   // Start a new refresh operation and cache it
//   refreshPromiseTimestamp = currentTime;
//   refreshPromise = refreshTokens(request);
  
//   // Set up cleanup of the cache after completion
//   refreshPromise.finally(() => {
//     // Keep the result cached for a short time before clearing
//     setTimeout(() => {
//       if (currentTime === refreshPromiseTimestamp) {
//         refreshPromise = null;
//       }
//     }, REFRESH_CACHE_TTL);
//   });
  
//   return await refreshPromise;
// }

// // FIXED: Simplified refreshTokens function that focuses on one responsibility
// async function refreshTokens(request: NextRequest): Promise<boolean> {
//   try {
//     const response = await fetch(
//       `${process.env.BACKEND_URL}/auth/refresh`,
//       {
//         method: "POST",
//         headers: { Cookie: request.headers.get("Cookie") || "" },
//         credentials: "include",
//       }
//     );

//     // FIXED: Clean response handling
//     return response.ok;
//   } catch (error) {
//     console.error("Refresh tokens failed:", error);
//     return false;
//   }
// }

// export const config = {
//   matcher: ["/((?!_next/static|_next/image|favicon.ico).*)"],
// };



import { NextResponse, NextRequest } from "next/server";
import { authRoutes, publicRoutes, DEFAULT_LOGIN_REDIRECT } from "@/routes";

// Global refresh state tracking (for concurrent request handling)
// This is a server-side cache to prevent multiple simultaneous refresh attempts
let refreshPromise: Promise<boolean> | null = null;
let refreshPromiseTimestamp: number = 0;
const REFRESH_CACHE_TTL = 10000; // 10 seconds in milliseconds

export async function middleware(request: NextRequest) {
  const { nextUrl } = request;
  const accessToken = request.cookies.get("accessToken");
  const refreshToken = request.cookies.get("refreshToken");

  // Skip middleware for API routes and public assets
  if (nextUrl.pathname.startsWith("/api") || nextUrl.pathname.includes(".")) {
    return NextResponse.next();
  }

  // Handle authentication routes
  if (authRoutes.includes(nextUrl.pathname)) {
    if (accessToken || refreshToken) {
      return NextResponse.redirect(
        new URL(DEFAULT_LOGIN_REDIRECT, nextUrl.origin)
      );
    }
    return NextResponse.next();
  }

  // Handle protected routes
  const authResult = await verifyAuth(request);

  // If not authenticated and trying to access protected route
  if (!authResult.isAuthenticated && !publicRoutes.includes(nextUrl.pathname)) {
    let callbackUrl = nextUrl.pathname;
    if (nextUrl.search) {
      callbackUrl += nextUrl.search;
    }

    const encodedCallBackUrl = encodeURIComponent(callbackUrl);
    return NextResponse.redirect(
      new URL(`/auth/login?callbackUrl=${encodedCallBackUrl}`, nextUrl.origin)
    );
  }

  // Onboarding routes check
  const isOnboardingRoute =
    nextUrl.pathname === "/onboarding" ||
    nextUrl.pathname.startsWith("/onboarding/");

  // Handle onboarding status redirects
  if (authResult.isAuthenticated && authResult.user) {
    // If user is not onboarded and trying to access protected routes (except onboarding)
    if (
      !authResult.user.isOnboarded &&
      !publicRoutes.includes(nextUrl.pathname) &&
      !isOnboardingRoute
    ) {
      return NextResponse.redirect(new URL("/onboarding", nextUrl.origin));
    }

    // If user is already onboarded but trying to access onboarding routes
    if (authResult.user.isOnboarded && isOnboardingRoute) {
      return NextResponse.redirect(new URL("/dashboard", nextUrl.origin));
    }
  }

  return NextResponse.next();
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

// Updated verifyAuth function to return user data when available
async function verifyAuth(request: NextRequest): Promise<{
  isAuthenticated: boolean;
  user?: { id: string; isOnboarded: boolean /* other needed fields */ };
}> {
  try {
    // First check access token
    const accessToken = request.cookies.get("accessToken")?.value;
    if (!accessToken) {
      // Attempt refresh if refresh token exists
      const refreshToken = request.cookies.get("refreshToken")?.value;
      if (refreshToken) {
        // Use the concurrent request handling
        const refreshSuccessful = await getRefreshResult(request);
        if (!refreshSuccessful) return { isAuthenticated: false };
      } else {
        return { isAuthenticated: false };
      }
    }

    // At this point we should have a valid access token - fetch user data
    try {
      const userResponse = await fetch(
        `${process.env.BACKEND_URL}/auth/current-user`,
        {
          headers: {
            Cookie: request.headers.get("Cookie") || "",
            // Add any required authentication headers
          },
          credentials: "include",
        }
      );

      if (userResponse.ok) {
        const userData = await userResponse.json();
        return {
          isAuthenticated: true,
          user: userData.user,
        };
      }

      return { isAuthenticated: true }; // Token valid but user fetch failed
    } catch (error) {
      console.error("Error fetching user data:", error);
      return { isAuthenticated: true }; // We still consider them authenticated
    }
  } catch (error) {
    console.error("Auth verification failed:", error);
    return { isAuthenticated: false };
  }
}

export const config = {
  matcher: ["/((?!_next/static|_next/image|favicon.ico).*)"],
};