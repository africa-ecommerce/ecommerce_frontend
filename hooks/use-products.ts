// "use client"

// // hooks/useProducts.ts
// import useSWRInfinite from 'swr/infinite';
// import { ProductsResponse, ProductQueryParams } from '@/types/product';
// import { useDebounce } from './use-debounce';
// import { useEffect } from 'react';
// import { useShoppingCart } from '@/app/_components/provider/shoppingCartProvider';

// const fetcher = async (url: string) => {
//   const response = await fetch(url, { credentials: "include" });
//   if (!response.ok) {
//     throw new Error('Failed to fetch products');
//   }
//   return response.json();
// };

// export interface ProductsFilter {
//   search: string;
//   priceRange: [number, number];
//   selectedCategories: string[];
//   selectedRatings: number[];
//   sortBy?: string;
//   order?: 'asc' | 'desc';
//   businessType?: string;
//   createdAfter?: Date;
//   createdBefore?: Date;
//   tags?: string;
// }

// export function useProducts(filters: ProductsFilter, limit: number = 4) {
//   const debouncedSearch = useDebounce(filters.search, 300);
//   const { isMutate } = useShoppingCart();
  
//   // Convert filters to query params
//   const getKey = (pageIndex: number, previousPageData: ProductsResponse | null) => {
//     // Reached the end
//     if (previousPageData && !previousPageData.meta.hasNextPage) return null;
    
//     // First page or with cursor for pagination
//     const cursor = pageIndex > 0 && previousPageData ? previousPageData.meta.nextCursor : undefined;
    
//     // Build query parameters
//     const params: ProductQueryParams = {
//       limit,
//       cursor,
//       search: debouncedSearch || undefined,
//       minPrice: filters.priceRange[0] || undefined,
//       maxPrice: filters.priceRange[1] || undefined,
//       sortBy: filters.sortBy,
//       order: filters.order,
//       businessType: filters.businessType,
//     };
    
//     // Add category filter if any selected
//     if (filters.selectedCategories.length === 1) {
//       params.category = filters.selectedCategories[0];
//     } else if (filters.selectedCategories.length > 1) {
//       // For multiple categories, the backend might need to handle this differently
//       // This is a simplification assuming backend supports comma-separated values
//       params.category = filters.selectedCategories.join(',');
//     }
    
//     // Add rating filter (lowest selected rating)
//     if (filters.selectedRatings.length > 0) {
//       // Get the minimum rating from selected ratings
//       params.rating = Math.min(...filters.selectedRatings);
//     }
    
//     // Add date filters if present
//     if (filters.createdAfter) {
//       params.createdAfter = filters.createdAfter.toISOString();
//     }
    
//     if (filters.createdBefore) {
//       params.createdBefore = filters.createdBefore.toISOString();
//     }
    
//     // Build the URL with query parameters
//     const queryString = Object.entries(params)
//       .filter(([_, value]) => value !== undefined)
//       .map(([key, value]) => `${key}=${encodeURIComponent(String(value))}`)
//       .join('&');
    
//     return `/api/marketplace/products?${queryString}`;
//   };

//   const {
//     data,
//     error,
//     size,
//     setSize,
//     isValidating,
//     mutate
//   } = useSWRInfinite<ProductsResponse>(getKey, fetcher, {
//     revalidateFirstPage: false,
//     revalidateOnFocus: true,
//     persistSize: true,
//   });




//   useEffect(() => {
//   // This will trigger a refresh of all product data when isMutate is true
//   if (isMutate) {
//     console.log("Mutating products data due to isMutate flag");
//     mutate().then(() => {
//       // Reset the isMutate flag in the shopping cart context after mutation is complete
//       // This is the important part to prevent continuous mutations
//       if (typeof window !== 'undefined') {
//         // Use a custom event to communicate back to the ShoppingCartProvider
//         const resetEvent = new CustomEvent('reset-is-mutate');
//         window.dispatchEvent(resetEvent);
//       }
//     });
//   }
// }, [isMutate]);

//   const isLoading = !data && !error;
//   const isLoadingMore = size > 0 && data && typeof data[size - 1] === 'undefined';
  
//   // Flatten the products from all pages
//   const products = data ? data.flatMap(page => page.data) : [];
  
//   // Determine if we have more pages to load
//   const hasNextPage = data ? data[data.length - 1]?.meta.hasNextPage : false;

//   return {
//     products,
//     error,
//     isLoading,
//     isLoadingMore,
//     isValidating,
//     size,
//     setSize,
//     hasNextPage,
//     mutate
//   };
// }


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
      tags: filters.tags,
    });
  }, [
    debouncedSearch,
    filters.priceRange,
    filters.selectedCategories,
    filters.selectedRatings,
    filters.tags,
  ]);


  // Keep track of loaded product IDs across pages - FIX: Provide initial value
  const loadedProductIds = useRef<Set<string>>(new Set());
  const previousFilterKey = useRef<string | undefined>(undefined);
  const hasFilterChanged =
    previousFilterKey.current !== undefined &&
    previousFilterKey.current !== filterKey;

  // Reset loaded products when filters change
  useEffect(() => {
    if (hasFilterChanged) {
      loadedProductIds.current.clear();
    }
    previousFilterKey.current = filterKey;
  }, [filterKey, hasFilterChanged]);

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

    // BACKEND OPTIMIZATION: Exclude already loaded products
    // Only send excludeIds for subsequent pages (not the first page after filter change)
    if (pageIndex > 0 && loadedProductIds.current.size > 0) {
      params.excludeIds = Array.from(loadedProductIds.current).join(",");
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
      revalidateFirstPage: false,
      revalidateOnFocus: false,
      persistSize: false,
      revalidateOnReconnect: true,
      dedupingInterval: 2000,
      revalidateAll: false,
      focusThrottleInterval: 5000,
      loadingTimeout: 10000,
      revalidateIfStale: true,
      errorRetryCount: 2,
      errorRetryInterval: 1000,
      shouldRetryOnError: (error) => error.status >= 500 || !error.status,
      onLoadingSlow: (key) => {
        console.warn("Slow loading detected for products:", key);
      },
      onError: (error, key) => {
        console.error("Products fetch error:", error.message, "Key:", key);
      },
      compare: (a, b) => {
        return JSON.stringify(a) === JSON.stringify(b);
      },
    });

  // Flatten the products from all pages
  const products = data ? data.flatMap((page) => page.data) : [];

  // Update loaded product IDs when new data comes in
  useEffect(() => {
    if (data) {
      data.forEach((page) => {
        page.data.forEach((product) => {
          loadedProductIds.current.add(product.id);
        });
      });
    }
  }, [data]);

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
    hasFilterChanged,
    // Utility functions
    clearCache,
    refreshData,
  };
}