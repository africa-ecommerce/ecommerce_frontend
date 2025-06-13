

/**@type {string[]}*/
export const publicRoutes = ["/", "/product", "/checkout", "/order-error", "/thank-you", "/subdomain-error", "/help"];

/**@type {string[]}*/
export const authRoutes = [
  "/auth/login",
  "/auth/register",
  "/auth/error", // Callback error page
  "/auth/verify-email",
  "/auth/reset-password",
  "/auth/forgot-password",
  "/auth/resend-email-verification",
];

/**@type {string[]}*/
export const supplierRoutes = ["/dashboard/inventory", "/dashboard/order"];

/**@type {string[]}*/
export const plugRoutes = ["/dashboard/store", "/dashboard/product", "/studio"];



/**@type {string}*/
export const apiAuthPrefix = "/api/auth";

/**@type {string}*/
export const DEFAULT_LOGIN_REDIRECT = "/dashboard";

// Helper function to check if a pathname starts with any of the routes in the array
export function pathnameStartsWith(
  pathname: string,
  routes: string[]
): boolean {
  return routes.some(
    (route) => pathname === route || pathname.startsWith(`${route}/`)
  );
}
