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

// import { NextResponse, NextRequest } from "next/server";
// import { authRoutes, publicRoutes, DEFAULT_LOGIN_REDIRECT } from "@/routes";
// import jwt from "jsonwebtoken";

// // This should match the secret from your backend
// const JWT_SECRET = process.env.JWT_SECRET! || "defaultsecret";

// // Global refresh state tracking (for concurrent request handling)
// let refreshPromise: Promise<boolean> | null = null;
// let refreshPromiseTimestamp: number = 0;
// const REFRESH_CACHE_TTL = 10000; // 10 seconds in milliseconds

// export async function middleware(request: NextRequest) {
//   const { nextUrl } = request;

//   // Skip middleware for API routes and public assets
//   if (nextUrl.pathname.startsWith("/api") || nextUrl.pathname.includes(".")) {
//     return NextResponse.next();
//   }

//   // Handle authentication routes
//   if (authRoutes.includes(nextUrl.pathname)) {
//     const accessToken = request.cookies.get("accessToken");
//     const refreshToken = request.cookies.get("refreshToken");

//     if (accessToken || refreshToken) {
//       return NextResponse.redirect(
//         new URL(DEFAULT_LOGIN_REDIRECT, nextUrl.origin)
//       );
//     }
//     return NextResponse.next();
//   }

//   // Handle protected routes
//   const authResult = await verifyAuth(request);

//   // If not authenticated and trying to access protected route
//   if (!authResult.isAuthenticated && !publicRoutes.includes(nextUrl.pathname)) {
//     let callbackUrl = nextUrl.pathname;
//     if (nextUrl.search) {
//       callbackUrl += nextUrl.search;
//     }

//     const encodedCallBackUrl = encodeURIComponent(callbackUrl);
//     return NextResponse.redirect(
//       new URL(`/auth/login?callbackUrl=${encodedCallBackUrl}`, nextUrl.origin)
//     );
//   }

//   // Onboarding routes check
//   const isOnboardingRoute =
//     nextUrl.pathname === "/onboarding" ||
//     nextUrl.pathname.startsWith("/onboarding/");

//   // Handle onboarding status redirects
//   if (authResult.isAuthenticated && authResult.user) {
//     // If user is not onboarded and trying to access protected routes (except onboarding)
//     if (
//       !authResult.user.isOnboarded &&
//       !publicRoutes.includes(nextUrl.pathname) &&
//       !isOnboardingRoute
//     ) {
//       return NextResponse.redirect(new URL("/onboarding", nextUrl.origin));
//     }

//     // If user is already onboarded but trying to access onboarding routes
//     if (authResult.user.isOnboarded && isOnboardingRoute) {
//       return NextResponse.redirect(new URL("/dashboard", nextUrl.origin));
//     }
//   }

//   // Pass user data to server components via headers
//   const response = NextResponse.next();

//   if (authResult.isAuthenticated && authResult.user) {
//     // Store essential user data in a request header that server components can access
//     response.headers.set(
//       "X-User-Data",
//       JSON.stringify({
//         id: authResult.user.id,
//         name: authResult.user.name,
//         isOnboarded: authResult.user.isOnboarded,
//         userType: authResult.user.userType,
//       })
//     );
//   }

//   return response;
// }

// // This function handles concurrent refresh token requests
// async function getRefreshResult(request: NextRequest): Promise<boolean> {
//   const currentTime = Date.now();

//   // If there's an existing refresh operation in progress and it's still fresh
//   if (
//     refreshPromise &&
//     currentTime - refreshPromiseTimestamp < REFRESH_CACHE_TTL
//   ) {
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

// // Function to refresh tokens
// async function refreshTokens(request: NextRequest): Promise<boolean> {
//   try {
//     const response = await fetch(`${process.env.BACKEND_URL}/auth/refresh`, {
//       method: "POST",
//       headers: { Cookie: request.headers.get("Cookie") || "" },
//       credentials: "include",
//     });

//     return response.ok;
//   } catch (error) {
//     console.error("Refresh tokens failed:", error);
//     return false;
//   }
// }

// // Verify auth directly from the JWT without an API call
// async function verifyAuth(request: NextRequest): Promise<{
//   isAuthenticated: boolean;
//   user?: {
//     id: string;
//     name: string;
//     isOnboarded: boolean;
//     userType: string;
//   };
// }> {
//   try {
//     // Get the access token from cookies
//     const accessToken = request.cookies.get("accessToken")?.value;

//     if (accessToken) {
//       try {
//         // Verify and decode the JWT directly in the middleware
//         const decoded = jwt.verify(accessToken, JWT_SECRET) as {
//           userId: string;
//           name: string;
//           isOnboarded: boolean;
//           userType: string;
//         };

//         // Return the user data directly from the JWT
//         return {
//           isAuthenticated: true,
//           user: {
//             id: decoded.userId,
//             name: decoded.name,
//             isOnboarded: decoded.isOnboarded,
//             userType: decoded.userType,
//           },
//         };
//       } catch (error) {
//         // Token validation failed, try refresh if it's not a different error than expiration
//         if (error instanceof jwt.TokenExpiredError) {
//           // Only for expired tokens we try refresh
//           const refreshToken = request.cookies.get("refreshToken")?.value;
//           if (refreshToken) {
//             // Use the concurrent request handling for refresh
//             const refreshSuccessful = await getRefreshResult(request);
//             if (refreshSuccessful) {
//               // After refresh, we try to get the new access token
//               // This is a recursive call, but should only happen once
//               return await verifyAuth(request);
//             }
//           }
//         }
//         // For other JWT errors or failed refresh, authentication fails
//         return { isAuthenticated: false };
//       }
//     } else {
//       // No access token, try refresh
//       const refreshToken = request.cookies.get("refreshToken")?.value;
//       if (refreshToken) {
//         const refreshSuccessful = await getRefreshResult(request);
//b         if (refreshSuccessful) {
//           // After refresh, try auth again with the new access token
//           return await verifyAuth(request);
//         }
//       }
//       return { isAuthenticated: false };
//     }
//   } catch (error) {
//     console.error("Auth verification failed:", error);
//     return { isAuthenticated: false };
//   }
// }

// export const config = {
//   matcher: ["/((?!_next/static|_next/image|favicon.ico).*)"],
// };

// import { NextResponse, NextRequest } from "next/server";
// import { authRoutes, publicRoutes, DEFAULT_LOGIN_REDIRECT } from "@/routes";
// import { jwtVerify } from "jose";

// // This should match the secret from your backend
// const JWT_SECRET = process.env.JWT_SECRET || "defaultsecret";
// // Convert to proper format for jose
// const JWT_SECRET_KEY = new TextEncoder().encode(JWT_SECRET);

// // Global refresh state tracking (for concurrent request handling)
// let refreshPromise: Promise<boolean> | null = null;
// let refreshPromiseTimestamp: number = 0;
// const REFRESH_CACHE_TTL = 10000; // 10 seconds in milliseconds

// export async function middleware(request: NextRequest) {
//   const { nextUrl } = request;

//   // Skip middleware for API routes and public assets
//   if (nextUrl.pathname.startsWith("/api") || nextUrl.pathname.includes(".")) {
//     return NextResponse.next();
//   }

//   // Handle authentication routes
//   if (authRoutes.includes(nextUrl.pathname)) {
//     const accessToken = request.cookies.get("accessToken");
//     const refreshToken = request.cookies.get("refreshToken");

//     if (accessToken || refreshToken) {
//       return NextResponse.redirect(
//         new URL(DEFAULT_LOGIN_REDIRECT, nextUrl.origin)
//       );
//     }
//     return NextResponse.next();
//   }

//   // Handle protected routes
//   const authResult = await verifyAuth(request);

//   // If not authenticated and trying to access protected route
//   if (!authResult.isAuthenticated && !publicRoutes.includes(nextUrl.pathname)) {
//     let callbackUrl = nextUrl.pathname;
//     if (nextUrl.search) {
//       callbackUrl += nextUrl.search;
//     }

//     const encodedCallBackUrl = encodeURIComponent(callbackUrl);
//     return NextResponse.redirect(
//       new URL(`/auth/login?callbackUrl=${encodedCallBackUrl}`, nextUrl.origin)
//     );
//   }

//   // Onboarding routes check
//   const isOnboardingRoute =
//     nextUrl.pathname === "/onboarding" ||
//     nextUrl.pathname.startsWith("/onboarding/");

//   // Handle onboarding status redirects
//   if (authResult.isAuthenticated && authResult.user) {
//     // If user is not onboarded and trying to access protected routes (except onboarding)
//     if (
//       !authResult.user.isOnboarded &&
//       !publicRoutes.includes(nextUrl.pathname) &&
//       !isOnboardingRoute
//     ) {
//       return NextResponse.redirect(new URL("/onboarding", nextUrl.origin));
//     }

//     // If user is already onboarded but trying to access onboarding routes
//     if (authResult.user.isOnboarded && isOnboardingRoute) {
//       return NextResponse.redirect(new URL("/dashboard", nextUrl.origin));
//     }
//   }

//   // Pass user data to server components via headers
//   const response = NextResponse.next();

//   if (authResult.isAuthenticated && authResult.user) {
//     // Store essential user data in a request header that server components can access
//     response.headers.set(
//       "X-User-Data",
//       JSON.stringify({
//         id: authResult.user.id,
//         name: authResult.user.name,
//         isOnboarded: authResult.user.isOnboarded,
//         userType: authResult.user.userType,
//       })
//     );
//   }

//   return response;
// }

// // This function handles concurrent refresh token requests
// async function getRefreshResult(request: NextRequest): Promise<boolean> {
//   const currentTime = Date.now();

//   // If there's an existing refresh operation in progress and it's still fresh
//   if (
//     refreshPromise &&
//     currentTime - refreshPromiseTimestamp < REFRESH_CACHE_TTL
//   ) {
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

// // Function to refresh tokens
// async function refreshTokens(request: NextRequest): Promise<boolean> {
//   try {
//     const response = await fetch(`${process.env.BACKEND_URL}/auth/refresh`, {
//       method: "POST",
//       headers: { Cookie: request.headers.get("Cookie") || "" },
//       credentials: "include",
//     });

//     return response.ok;
//   } catch (error) {
//     console.error("Refresh tokens failed:", error);
//     return false;
//   }
// }

// // Verify auth directly from the JWT without an API call - using jose instead of jsonwebtoken
// async function verifyAuth(request: NextRequest): Promise<{
//   isAuthenticated: boolean;
//   user?: {
//     id: string;
//     name: string;
//     isOnboarded: boolean;
//     userType: string;
//   };
// }> {
//   try {
//     // Get the access token from cookies
//     const accessToken = request.cookies.get("accessToken")?.value;

//     if (accessToken) {
//       try {
//         // Verify and decode the JWT directly in the middleware using jose
//         const { payload } = await jwtVerify(accessToken, JWT_SECRET_KEY, {
//           algorithms: ["HS256"], // Make sure this matches what your backend uses
//         });

//         // Return the user data directly from the JWT
//         return {
//           isAuthenticated: true,
//           user: {
//             id: payload.userId as string,
//             name: payload.name as string,
//             isOnboarded: payload.isOnboarded as boolean,
//             userType: payload.userType as string,
//           },
//         };
//       } catch (error) {
//         // Token validation failed (could be expired), try refresh
//         const refreshToken = request.cookies.get("refreshToken")?.value;
//         if (refreshToken) {
//           // Use the concurrent request handling for refresh
//           const refreshSuccessful = await getRefreshResult(request);

//           if (refreshSuccessful) {
//             // Get fresh cookie data after refresh
//             const newRequest = new NextRequest(request.url, {
//               headers: request.headers,
//             });

//             // Try again with new tokens (similar to the original approach)
//             return await verifyAuth(newRequest);
//           }
//         }
//         // For JWT errors or failed refresh, authentication fails
//         return { isAuthenticated: false };
//       }
//     } else {
//       // No access token, try refresh
//       const refreshToken = request.cookies.get("refreshToken")?.value;
//       if (refreshToken) {
//         const refreshSuccessful = await getRefreshResult(request);
//         if (refreshSuccessful) {
//           // After refresh, try auth again with the new access token
//           // Create a new request to get fresh cookies
//           const newRequest = new NextRequest(request.url, {
//             headers: request.headers,
//           });
//           return await verifyAuth(newRequest);
//         }
//       }
//       return { isAuthenticated: false };
//     }
//   } catch (error) {
//     console.error("Auth verification failed:", error);
//     return { isAuthenticated: false };
//   }
// }

// export const config = {
//   matcher: ["/((?!_next/static|_next/image|favicon.ico).*)"],
// };

// import { NextResponse, NextRequest } from "next/server";
// import { authRoutes, publicRoutes, DEFAULT_LOGIN_REDIRECT } from "@/routes";
// import { jwtVerify } from "jose";

// // This should match the secret from your backend
// const JWT_SECRET = process.env.JWT_SECRET || "defaultsecret";
// // Convert to proper format for jose
// const JWT_SECRET_KEY = new TextEncoder().encode(JWT_SECRET);

// // Simple in-memory cache for recent token verifications
// // This helps prevent token staleness issues during navigation
// const tokenCache = new Map<
//   string,
//   {
//     time: number;
//     payload: any;
//   }
// >();

// // Cache TTL (30 seconds)
// const CACHE_TTL = 30 * 1000;

// export async function middleware(request: NextRequest) {
//   const { nextUrl } = request;

//   // Skip middleware for API routes and public assets
//   if (nextUrl.pathname.startsWith("/api") || nextUrl.pathname.includes(".")) {
//     return NextResponse.next();
//   }

//   // Define onboarding routes
//   const onboardingRoutes = ["/onboarding", "/onboarding/success"];
//   const isOnboardingRoute =
//     onboardingRoutes.includes(nextUrl.pathname) ||
//     nextUrl.pathname.startsWith("/onboarding/");

//   // Handle authentication routes
//   if (authRoutes.includes(nextUrl.pathname)) {
//     const accessToken = request.cookies.get("accessToken");
//     const refreshToken = request.cookies.get("refreshToken");

//     if (accessToken || refreshToken) {
//       return NextResponse.redirect(
//         new URL(DEFAULT_LOGIN_REDIRECT, nextUrl.origin)
//       );
//     }
//     return NextResponse.next();
//   }

//   // CRITICAL PATH: Special case for navigating from onboarding to dashboard
//   if (
//     nextUrl.pathname === "/dashboard" &&
//     request.headers.get("referer")?.includes("/onboarding")
//   ) {
//     // Force token refresh to get the latest user data
//     await refreshTokens(request);

//     // Let the navigation proceed
//     return NextResponse.next();
//   }

//   // Normal authentication flow
//   const authResult = await verifyAuth(request);

//   // If not authenticated and trying to access protected route
//   if (!authResult.isAuthenticated && !publicRoutes.includes(nextUrl.pathname)) {
//     let callbackUrl = nextUrl.pathname;
//     if (nextUrl.search) {
//       callbackUrl += nextUrl.search;
//     }

//     const encodedCallBackUrl = encodeURIComponent(callbackUrl);
//     return NextResponse.redirect(
//       new URL(`/auth/login?callbackUrl=${encodedCallBackUrl}`, nextUrl.origin)
//     );
//   }

//   // Get the latest token data for accurate onboarding status check
//   const tokenData = await getLatestTokenData(request);

//   // Handle onboarding status and redirects
//   if (authResult.isAuthenticated && authResult.user) {
//     // Use the most up-to-date onboarding status
//     const isOnboarded = tokenData?.isOnboarded || authResult.user.isOnboarded;

//     // Case 1: User is onboarded but trying to access onboarding routes
//     if (isOnboarded && isOnboardingRoute) {
//       return NextResponse.redirect(new URL("/dashboard", nextUrl.origin));
//     }

//     // Case 2: User is not onboarded and trying to access protected routes (except onboarding)
//     if (
//       !isOnboarded &&
//       !publicRoutes.includes(nextUrl.pathname) &&
//       !isOnboardingRoute
//     ) {
//       return NextResponse.redirect(new URL("/onboarding", nextUrl.origin));
//     }
//   }

//   // Pass user data to server components via headers
//   const response = NextResponse.next();

//   if (authResult.isAuthenticated && authResult.user) {
//     // Use the most up-to-date user data for server components
//     const userData = {
//       id: authResult.user.id,
//       name: authResult.user.name,
//       isOnboarded: tokenData?.isOnboarded || authResult.user.isOnboarded,
//       userType: tokenData?.userType || authResult.user.userType,
//     };

//     response.headers.set("X-User-Data", JSON.stringify(userData));
//   }

//   return response;
// }

// // Get the latest token data by checking the actual token content
// // This bypasses caching issues that might occur with the main verification
// async function getLatestTokenData(request: NextRequest) {
//   try {
//     const accessToken = request.cookies.get("accessToken")?.value;
//     if (!accessToken) return null;

//     // Check if we have a recent cache of this token
//     const tokenId = accessToken.split(".")[2] || accessToken.substring(0, 20);
//     const cached = tokenCache.get(tokenId);

//     if (cached && Date.now() - cached.time < CACHE_TTL) {
//       return cached.payload;
//     }

//     // Decode without verification for reading purposes
//     const parts = accessToken.split(".");
//     if (parts.length !== 3) return null;

//     // Base64 decode the payload
//     const payload = JSON.parse(Buffer.from(parts[1], "base64").toString());

//     // Cache the result
//     tokenCache.set(tokenId, {
//       time: Date.now(),
//       payload: {
//         isOnboarded: payload.isOnboarded as boolean,
//         userType: payload.userType as string,
//       },
//     });

//     return {
//       isOnboarded: payload.isOnboarded as boolean,
//       userType: payload.userType as string,
//     };
//   } catch (error) {
//     console.error("Error extracting token data:", error);
//     return null;
//   }
// }

// // Function to refresh tokens
// async function refreshTokens(request: NextRequest): Promise<boolean> {
//   try {
//     const response = await fetch(`${process.env.BACKEND_URL}/auth/refresh`, {
//       method: "POST",
//       headers: { Cookie: request.headers.get("Cookie") || "" },
//       credentials: "include",
//     });

//     // Clear the token cache on refresh
//     if (response.ok) {
//       tokenCache.clear();
//     }

//     return response.ok;
//   } catch (error) {
//     console.error("Refresh tokens failed:", error);
//     return false;
//   }
// }

// // Verify auth directly from the JWT
// async function verifyAuth(request: NextRequest): Promise<{
//   isAuthenticated: boolean;
//   user?: {
//     id: string;
//     name: string;
//     isOnboarded: boolean;
//     userType: string;
//   };
// }> {
//   try {
//     // Get the access token from cookies
//     const accessToken = request.cookies.get("accessToken")?.value;

//     if (accessToken) {
//       try {
//         // Verify and decode the JWT directly in the middleware using jose
//         const { payload } = await jwtVerify(accessToken, JWT_SECRET_KEY, {
//           algorithms: ["HS256"],
//         });

//         // Return the user data directly from the JWT
//         return {
//           isAuthenticated: true,
//           user: {
//             id: payload.userId as string,
//             name: payload.name as string,
//             isOnboarded: payload.isOnboarded as boolean,
//             userType: payload.userType as string,
//           },
//         };
//       } catch (error) {
//         // Token validation failed (could be expired), try refresh
//         const refreshToken = request.cookies.get("refreshToken")?.value;
//         if (refreshToken) {
//           const refreshSuccessful = await refreshTokens(request);

//           if (refreshSuccessful) {
//             // Create a new request with fresh cookies
//             const newRequest = new NextRequest(request.url, {
//               headers: request.headers,
//             });

//             // Try again with new tokens
//             return await verifyAuth(newRequest);
//           }
//         }
//         return { isAuthenticated: false };
//       }
//     } else {
//       // No access token, try refresh
//       const refreshToken = request.cookies.get("refreshToken")?.value;
//       if (refreshToken) {
//         const refreshSuccessful = await refreshTokens(request);
//         if (refreshSuccessful) {
//           const newRequest = new NextRequest(request.url, {
//             headers: request.headers,
//           });
//           return await verifyAuth(newRequest);
//         }
//       }
//       return { isAuthenticated: false };
//     }
//   } catch (error) {
//     console.error("Auth verification failed:", error);
//     return { isAuthenticated: false };
//   }
// }

// export const config = {
//   matcher: ["/((?!_next/static|_next/image|favicon.ico).*)"],
// };

// import { NextResponse, NextRequest } from "next/server";
// import { authRoutes, publicRoutes, DEFAULT_LOGIN_REDIRECT } from "@/routes";
// import { jwtVerify } from "jose";

// // This should match the secret from your backend
// const JWT_SECRET = process.env.JWT_SECRET || "defaultsecret";
// // Convert to proper format for jose
// const JWT_SECRET_KEY = new TextEncoder().encode(JWT_SECRET);

// // Simple in-memory cache for recent token verifications
// // This helps prevent token staleness issues during navigation
// const tokenCache = new Map<string, {
//   time: number;
//   payload: any;
// }>();

// // Cache TTL (30 seconds)
// const CACHE_TTL = 30 * 1000;

// export async function middleware(request: NextRequest) {
//   const { nextUrl } = request;

//   // Skip middleware for API routes and public assets
//   if (nextUrl.pathname.startsWith("/api") || nextUrl.pathname.includes(".")) {
//     return NextResponse.next();
//   }

//   // Define onboarding routes
//   const onboardingRoutes = ["/onboarding", "/onboarding/success"];
//   const isOnboardingRoute =
//     onboardingRoutes.includes(nextUrl.pathname) ||
//     nextUrl.pathname.startsWith("/onboarding/");

//   // Handle authentication routes
//   if (authRoutes.includes(nextUrl.pathname)) {
//     const accessToken = request.cookies.get("accessToken");
//     const refreshToken = request.cookies.get("refreshToken");

//     if (accessToken || refreshToken) {
//       return NextResponse.redirect(
//         new URL(DEFAULT_LOGIN_REDIRECT, nextUrl.origin)
//       );
//     }
//     return NextResponse.next();
//   }

//   // CRITICAL PATH: Special case for navigating from onboarding to dashboard
//   if (
//     nextUrl.pathname === "/dashboard" &&
//     request.headers.get("referer")?.includes("/onboarding")
//   ) {
//     // Force token refresh to get the latest user data
//     await refreshTokens(request);

//     // Let the navigation proceed
//     return NextResponse.next();
//   }

//   // Normal authentication flow
//   const authResult = await verifyAuth(request);

//   // If not authenticated and trying to access protected route
//   if (!authResult.isAuthenticated && !publicRoutes.includes(nextUrl.pathname)) {
//     let callbackUrl = nextUrl.pathname;
//     if (nextUrl.search) {
//       callbackUrl += nextUrl.search;
//     }

//     const encodedCallBackUrl = encodeURIComponent(callbackUrl);
//     return NextResponse.redirect(
//       new URL(`/auth/login?callbackUrl=${encodedCallBackUrl}`, nextUrl.origin)
//     );
//   }

//   // Get the latest token data for accurate onboarding status check
//   const tokenData = await getLatestTokenData(request);

//   // Handle onboarding status and redirects
//   if (authResult.isAuthenticated && authResult.user) {
//     // Use the most up-to-date onboarding status
//     const isOnboarded = tokenData?.isOnboarded || authResult.user.isOnboarded;

//     // Case 1: User is onboarded but trying to access onboarding routes
//     if (isOnboarded && isOnboardingRoute) {
//       return NextResponse.redirect(new URL("/dashboard", nextUrl.origin));
//     }

//     // Case 2: User is not onboarded and trying to access protected routes (except onboarding)
//     if (
//       !isOnboarded &&
//       !publicRoutes.includes(nextUrl.pathname) &&
//       !isOnboardingRoute
//     ) {
//       return NextResponse.redirect(new URL("/onboarding", nextUrl.origin));
//     }
//   }

//   // Pass user data to server components via headers
//   const response = NextResponse.next();

//   if (authResult.isAuthenticated && authResult.user) {
//     // Use the most up-to-date user data for server components
//     const userData = {
//       id: authResult.user.id,
//       name: authResult.user.name,
//       isOnboarded: tokenData?.isOnboarded || authResult.user.isOnboarded,
//       userType: tokenData?.userType || authResult.user.userType,
//     };

//     response.headers.set("X-User-Data", JSON.stringify(userData));
//   }

//   return response;
// }

// // Get the latest token data by checking the actual token content
// // This bypasses caching issues that might occur with the main verification
// async function getLatestTokenData(request: NextRequest) {
//   try {
//     const accessToken = request.cookies.get("accessToken")?.value;
//     if (!accessToken) return null;

//     // Check if we have a recent cache of this token
//     const tokenId = accessToken.split('.')[2] || accessToken.substring(0, 20);
//     const cached = tokenCache.get(tokenId);

//     if (cached && (Date.now() - cached.time < CACHE_TTL)) {
//       return cached.payload;
//     }

//     // Decode without verification for reading purposes
//     const parts = accessToken.split('.');
//     if (parts.length !== 3) return null;

//     // Base64 decode the payload
//     const payload = JSON.parse(
//       Buffer.from(parts[1], 'base64').toString()
//     );

//     // Cache the result
//     tokenCache.set(tokenId, {
//       time: Date.now(),
//       payload: {
//         isOnboarded: payload.isOnboarded as boolean,
//         userType: payload.userType as string
//       }
//     });

//     return {
//       isOnboarded: payload.isOnboarded as boolean,
//       userType: payload.userType as string
//     };
//   } catch (error) {
//     console.error("Error extracting token data:", error);
//     return null;
//   }
// }

// // Function to refresh tokens
// async function refreshTokens(request: NextRequest): Promise<boolean> {
//   try {
//     const response = await fetch(`${process.env.BACKEND_URL}/auth/refresh`, {
//       method: "POST",
//       headers: { Cookie: request.headers.get("Cookie") || "" },
//       credentials: "include",
//     });

//     // Clear the token cache on refresh
//     if (response.ok) {
//       tokenCache.clear();
//     }

//     return response.ok;
//   } catch (error) {
//     console.error("Refresh tokens failed:", error);
//     return false;
//   }
// }

// // Verify auth directly from the JWT
// async function verifyAuth(request: NextRequest): Promise<{
//   isAuthenticated: boolean;
//   user?: {
//     id: string;
//     name: string;
//     isOnboarded: boolean;
//     userType: string;
//   };
// }> {
//   try {
//     // Get the access token from cookies
//     const accessToken = request.cookies.get("accessToken")?.value;

//     if (accessToken) {
//       try {
//         // Verify and decode the JWT directly in the middleware using jose
//         const { payload } = await jwtVerify(accessToken, JWT_SECRET_KEY, {
//           algorithms: ["HS256"],
//         });

//         // Return the user data directly from the JWT
//         return {
//           isAuthenticated: true,
//           user: {
//             id: payload.userId as string,
//             name: payload.name as string,
//             isOnboarded: payload.isOnboarded as boolean,
//             userType: payload.userType as string,
//           },
//         };
//       } catch (error) {
//         // Token validation failed (could be expired), try refresh
//         const refreshToken = request.cookies.get("refreshToken")?.value;
//         if (refreshToken) {
//           const refreshSuccessful = await refreshTokens(request);

//           if (refreshSuccessful) {
//             // Create a new request with fresh cookies
//             const newRequest = new NextRequest(request.url, {
//               headers: request.headers,
//             });

//             // Try again with new tokens
//             return await verifyAuth(newRequest);
//           }
//         }
//         return { isAuthenticated: false };
//       }
//     } else {
//       // No access token, try refresh
//       const refreshToken = request.cookies.get("refreshToken")?.value;
//       if (refreshToken) {
//         const refreshSuccessful = await refreshTokens(request);
//         if (refreshSuccessful) {
//           const newRequest = new NextRequest(request.url, {
//             headers: request.headers,
//           });
//           return await verifyAuth(newRequest);
//         }
//       }
//       return { isAuthenticated: false };
//     }
//   } catch (error) {
//     console.error("Auth verification failed:", error);
//     return { isAuthenticated: false };
//   }
// }

// export const config = {
//   matcher: ["/((?!_next/static|_next/image|favicon.ico).*)"],
// };

import { NextResponse, NextRequest } from "next/server";
import { authRoutes, publicRoutes, DEFAULT_LOGIN_REDIRECT } from "@/routes";
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

  // Skip middleware for API routes and public assets
  if (nextUrl.pathname.startsWith("/api") || nextUrl.pathname.includes(".")) {
    return NextResponse.next();
  }

  // Handle authentication routes
  if (authRoutes.includes(nextUrl.pathname)) {
    const accessToken = request.cookies.get("accessToken");
    const refreshToken = request.cookies.get("refreshToken");

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
        const refreshToken = request.cookies.get("refreshToken")?.value;
        if (refreshToken) {
          // Use the concurrent request handling for refresh
          const refreshSuccessful = await getRefreshResult(request);

          if (refreshSuccessful) {
            // Get fresh cookie data after refresh
            const newRequest = new NextRequest(request.url, {
              headers: request.headers,
            });

            // Try again with new tokens (similar to the original approach)
            return await verifyAuth(newRequest);
          }
        }
        // For JWT errors or failed refresh, authentication fails
        return { isAuthenticated: false };
      }
    } else {
      // No access token, try refresh
      const refreshToken = request.cookies.get("refreshToken")?.value;
      if (refreshToken) {
        const refreshSuccessful = await getRefreshResult(request);
        if (refreshSuccessful) {
          // After refresh, try auth again with the new access token
          // Create a new request to get fresh cookies
          const newRequest = new NextRequest(request.url, {
            headers: request.headers,
          });
          return await verifyAuth(newRequest);
        }
      }
      return { isAuthenticated: false };
    }
  } catch (error) {
    console.error("Auth verification failed:", error);
    return { isAuthenticated: false };
  }
}

export const config = {
  matcher: ["/((?!_next/static|_next/image|favicon.ico).*)"],
};
