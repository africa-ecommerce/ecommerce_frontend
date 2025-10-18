"use client";

import useSWRInfinite from "swr/infinite";
import { useCallback } from "react";
import { useShoppingCart } from "@/app/_components/provider/shoppingCartProvider";

const fetcher = async (url: string) => {
  const response = await fetch(url, { credentials: "include" });
  if (!response.ok) {
    throw new Error("Failed to fetch discover products");
  }
  return response.json();
};

interface DiscoverProductsResponse {
  products: any
  meta: {
    hasNextPage: boolean;
  };
}

/**
 * useDiscoverProducts
 * Simplified infinite fetch hook for the Discover screen.
 * - Uses page-based pagination (page=1,2,3,...)
 * - No filters, no cursor logic
 * - Auto-handles product list flattening
 */
export function useDiscoverProducts(limit: number = 20) {
  const { isMutate } = useShoppingCart();

  // Get key for each page
  const getKey = (
    pageIndex: number,
    previousPageData: DiscoverProductsResponse | null
  ) => {
    // Stop if there's no next page
    if (previousPageData && !previousPageData.meta?.hasNextPage) return null;

    const page = pageIndex + 1;
    return `/api/discover/products?page=${page}&limit=${limit}`;
  };

  const { data, error, size, setSize, mutate, isValidating } =
    useSWRInfinite<DiscoverProductsResponse>(getKey, fetcher, {
      revalidateFirstPage: false,
      revalidateOnFocus: false,
      persistSize: false,
      revalidateOnReconnect: true,
      dedupingInterval: 2000,
      errorRetryCount: 2,
      errorRetryInterval: 1000,
      onError: (error, key) => {
        console.error("Discover fetch error:", error.message, "Key:", key);
      },
    });

  // Handle cart-based mutations (if products update)
  if (isMutate) {
    mutate();
  }

  // Flatten all pages into one product list
  const products = data ? data.flatMap((page) => page.products) : [];

  const hasNextPage = data ? data[data.length - 1]?.meta?.hasNextPage : false;
  const isLoading = !data && !error;
  const isLoadingMore =
    size > 0 && data && typeof data[size - 1] === "undefined";
  const isEmpty = !isLoading && !isLoadingMore && products.length === 0;

  const refreshData = useCallback(() => {
    mutate();
  }, [mutate]);

  return {
    products,
    error,
    isLoading,
    isLoadingMore,
    isValidating,
    isEmpty,
    size,
    setSize,
    hasNextPage,
    mutate,
    refreshData,
  };
}
