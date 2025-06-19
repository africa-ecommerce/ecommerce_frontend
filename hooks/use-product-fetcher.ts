

"use client";

import useSWR from "swr";
import { useMemo } from "react";
import type { ParsedUrlItem } from "@/lib/url-parser";

// SWR fetcher function
const fetcher = async (url: string) => {
  const response = await fetch(url);
  if (!response.ok) {
    throw new Error(`HTTP error! status: ${response.status}`);
  }
  return response.json();
};

// SWR configuration for product fetching
const productFetchingOptions = {
  revalidateOnFocus: false,
  revalidateOnReconnect: true,
  refreshInterval: 0,
  dedupingInterval: 5000,
  errorRetryCount: 2,
  errorRetryInterval: 1000,
};

export function useProductFetching(
  items: ParsedUrlItem[],
  ref: string | null,
  platform: string | null,
  enabled = true
) {
  // Generate SWR key only when platform is "store" and we have items
  const swrKey = useMemo(() => {
    if (!enabled || platform !== "store" || !items.length || !ref) {
      return null;
    }

    // Create a unique key for the combination of products
    const itemsKey = items
      .map((item) => `${item.pid}-${item.qty}-${item.variation || ""}`)
      .sort()
      .join("|");

    return `products-batch-${ref}-${itemsKey}`;
  }, [items, ref, platform, enabled]);

  // Fetch function that handles multiple products
  const fetchProducts = async () => {
    if (!items.length || !ref) return [];

    const productUrls = items.map(
      (item) => `/api/public/products/${item.pid}?subdomain=${ref}`
    );

    const results = await Promise.allSettled(
      productUrls.map((url) => fetcher(url))
    );

    return results.map((result, index) => ({
      item: items[index],
      data: result.status === "fulfilled" ? result.value : null,
      error: result.status === "rejected" ? result.reason : null,
    }));
  };

  const {
    data: productsData,
    error,
    isLoading,
    mutate,
  } = useSWR(swrKey, fetchProducts, productFetchingOptions);

  return {
    productsData: productsData || [],
    error,
    isLoading,
    mutate,
    isEnabled: platform === "store" && enabled,
  };
}
