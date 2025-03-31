/**@type {string[]}*/

export const publicRoutes = ["/"];

/**@type {string[]}*/
export const authRoutes = [
  "/auth/login",
  "/auth/register",
  "/auth/error", //-----> callback error page
  "/auth/verify-email",
  "/auth/reset-password",
  "/auth/forgot-password",
  "/auth/resend-email-verification"
];

/**@type {string}*/
export const apiAuthPrefix = "/api/auth";

/**@type {string}*/
export const DEFAULT_LOGIN_REDIRECT = "/"; /////----> /dashboard or onboarding
