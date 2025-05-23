"use client";

// hooks/useProducts.ts
import useSWRInfinite from "swr/infinite";
import { ProductsResponse, ProductQueryParams } from "@/types/product";
import { useDebounce } from "./use-debounce";
import { useEffect, useRef, useMemo, useCallback } from "react";
import { useShoppingCart } from "@/app/_components/provider/shoppingCartProvider";

const fetcher = async (url: string) => {
  const response = await fetch(url, { credentials: "include" });
  if (!response.ok) {
    throw new Error("Failed to fetch products");
  }
  return response.json();
};

export interface ProductsFilter {
  search: string;
  priceRange: [number, number];
  selectedCategories: string[];
  selectedRatings: number[];
  sortBy?: string;
  order?: "asc" | "desc";
  businessType?: string;
  createdAfter?: Date;
  createdBefore?: Date;
  tags?: string;
}

export function useProducts(filters: ProductsFilter, limit: number = 4) {
  const debouncedSearch = useDebounce(filters.search, 300);
  const { isMutate } = useShoppingCart();

  // Create a stable filter reference for change detection
  const filterKey = useMemo(() => {
    return JSON.stringify({
      search: debouncedSearch,
      priceRange: filters.priceRange,
      selectedCategories: [...filters.selectedCategories].sort(),
      selectedRatings: [...filters.selectedRatings].sort(),
      sortBy: filters.sortBy,
      order: filters.order,
      businessType: filters.businessType,
      createdAfter: filters.createdAfter?.toISOString(),
      createdBefore: filters.createdBefore?.toISOString(),
      tags: filters.tags,
    });
  }, [
    debouncedSearch,
    filters.priceRange,
    filters.selectedCategories,
    filters.selectedRatings,
    filters.sortBy,
    filters.order,
    filters.businessType,
    filters.createdAfter,
    filters.createdBefore,
    filters.tags,
  ]);

  // Keep track of previous filter to detect changes
  const previousFilterKey = useRef<string | undefined>(undefined);
    const hasFilterChanged =
    previousFilterKey.current !== undefined &&
    previousFilterKey.current !== filterKey;

  // Update the previous filter key
  useEffect(() => {
    previousFilterKey.current = filterKey;
  }, [filterKey]);

  // Convert filters to query params
  const getKey = (
    pageIndex: number,
    previousPageData: ProductsResponse | null
  ) => {
    // If filters changed, reset to first page
    if (hasFilterChanged && pageIndex > 0) {
      return null;
    }

    // Reached the end
    if (previousPageData && !previousPageData.meta.hasNextPage) return null;

    // First page or with cursor for pagination
    const cursor =
      pageIndex > 0 && previousPageData
        ? previousPageData.meta.nextCursor
        : undefined;

    // Build query parameters
    const params: ProductQueryParams = {
      limit,
      cursor,
      search: debouncedSearch || undefined,
      minPrice: filters.priceRange[0] > 0 ? filters.priceRange[0] : undefined,
      maxPrice:
        filters.priceRange[1] < 9999999 ? filters.priceRange[1] : undefined,
      sortBy: filters.sortBy,
      order: filters.order,
      businessType: filters.businessType,
    };

    // Add category filter if any selected
    if (filters.selectedCategories.length === 1) {
      params.category = filters.selectedCategories[0];
    } else if (filters.selectedCategories.length > 1) {
      params.category = filters.selectedCategories.join(",");
    }

    // Add rating filter (lowest selected rating)
    if (filters.selectedRatings.length > 0) {
      params.rating = Math.min(...filters.selectedRatings);
    }

    
   

    // Build the URL with query parameters
    const queryString = Object.entries(params)
      .filter(
        ([_, value]) => value !== undefined && value !== null && value !== ""
      )
      .map(([key, value]) => `${key}=${encodeURIComponent(String(value))}`)
      .join("&");

    return `/api/marketplace/products?${queryString}`;
  };

  const { data, error, size, setSize, isValidating, mutate } =
    useSWRInfinite<ProductsResponse>(getKey, fetcher, {
      // Use the infiniteConfig from swr-config
      revalidateFirstPage: false,
      revalidateOnFocus: false,
      persistSize: false, // IMPORTANT: This prevents pagination from persisting across filter changes
      revalidateOnReconnect: true,
      dedupingInterval: 2000,
      revalidateAll: false,

      // Error handling
      errorRetryCount: 2,
      shouldRetryOnError: (error) => error.status >= 500 || !error.status,

      // Performance monitoring
      onLoadingSlow: (key) => {
        console.warn("Slow loading detected for products:", key);
      },

      onError: (error, key) => {
        console.error("Products fetch error:", error.message, "Key:", key);
      },

      focusThrottleInterval: 5000, // Throttle revalidation on focus

      // Revalidation settings - Important for your use case

      revalidateIfStale: true, // Revalidate if data is stale

      // Error handling

      errorRetryInterval: 1000,

      // Performance settings
      loadingTimeout: 10000, // 10 second timeout

     

      // Custom key comparison for better cache invalidation
      compare: (a, b) => {
        // Custom comparison logic if needed
        return JSON.stringify(a) === JSON.stringify(b);
      },
    });

  // Reset pagination when filters change
  useEffect(() => {
    if (hasFilterChanged) {
      console.log("Filters changed, resetting pagination");
      setSize(1);
    }
  }, [hasFilterChanged, setSize]);

  // Handle shopping cart mutations
  useEffect(() => {
    if (isMutate) {
      console.log("Mutating products data due to isMutate flag");
      mutate().then(() => {
        if (typeof window !== "undefined") {
          const resetEvent = new CustomEvent("reset-is-mutate");
          window.dispatchEvent(resetEvent);
        }
      });
    }
  }, [isMutate, mutate]);

  const isLoading = !data && !error;
  const isLoadingMore =
    size > 0 && data && typeof data[size - 1] === "undefined";

  // Flatten the products from all pages
  const products = data ? data.flatMap((page) => page.data) : [];

  // Determine if we have more pages to load
  const hasNextPage = data ? data[data.length - 1]?.meta.hasNextPage : false;

  // Check if we have no results
  const isEmpty = !isLoading && !isLoadingMore && products.length === 0;

  // Utility functions using cacheUtils
  const clearCache = useCallback(async () => {
    const { cacheUtils } = await import("@/lib/utils");
    await cacheUtils.clearProductCache();
  }, []);

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
    hasFilterChanged, // Expose this for debugging
    // Utility functions
    clearCache,
    refreshData,
  };
}




