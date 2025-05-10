// lib/api.ts

import { ProductsResponse } from "@/types/product";

/**
 * Generic fetcher function for SWR
 */
export const fetcher = async <T>(url: string): Promise<T> => {
  const res = await fetch(url, { credentials: "include" });

  if (!res.ok) {
    const error = new Error("An error occurred while fetching the data.");
    // Add additional properties to the error object
    (error as any).info = await res.json();
    (error as any).status = res.status;
    throw error;
  }

  return res.json();
};

/**
 * Builds query string from params object, filtering out undefined values
 */
export const buildQueryString = (params: Record<string, any>): string => {
  return Object.entries(params)
    .filter(
      ([_, value]) => value !== undefined && value !== null && value !== ""
    )
    .map(([key, value]) => `${key}=${encodeURIComponent(String(value))}`)
    .join("&");
};

/**
 * Fetches products with provided filters
 */
export const fetchProducts = async (
  params: Record<string, any>
): Promise<ProductsResponse> => {
  const queryString = buildQueryString(params);
  const url = `/api/products?${queryString}`;
  return fetcher<ProductsResponse>(url);
};
