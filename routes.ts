

/**@type {string[]}*/
//USE REGEX PATTERN INSTEAD OF STATIC ARRAY
export const publicRoutes = [
  /^\/$/, // root
  /^\/product$/, // /product
  /^\/products\/[^\/]+$/, // /products/123 (product detail pages)
  /^\/checkout$/, // /checkout
  /^\/order-error$/, // /order-error
  /^\/thank-you$/, // /thank-you
  /^\/subdomain-error$/, // /subdomain-error
  /^\/help$/, // /help
  /^\/track-order\/.*$/, // /track-order/*** (any path after track-order/)
  /^\/[A-Za-z0-9]{7}$/, // link slug like /abc1234 (7 char nanoid)
  /^\/privacy$/,
  /^\/terms$/,
  /^\/legal$/,
  /^\/return$/
];
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
export const DEFAULT_LOGIN_REDIRECT = "/marketplace";

// Helper function to check if a pathname starts with any of the routes in the array
export function pathnameStartsWith(
  pathname: string,
  routes: string[]
): boolean {
  return routes.some(
    (route) => pathname === route || pathname.startsWith(`${route}/`)
  );
}

