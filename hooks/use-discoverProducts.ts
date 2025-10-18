"use client";

import useSWRInfinite from "swr/infinite";
import { useCallback } from "react";
import { useShoppingCart } from "@/app/_components/provider/shoppingCartProvider";

const fetcher = async (url: string) => {
  const response = await fetch(url, { credentials: "include" });
  if (!response.ok) throw new Error("Failed to fetch discover products");
  return response.json();
};

export function useDiscoverProducts(limit: number = 20) {
  const { isMutate } = useShoppingCart();

  const getKey = (pageIndex: number, previousPageData: any) => {
    if (previousPageData && !previousPageData.meta?.hasNextPage) return null;
    const page = pageIndex + 1;
    return `/api/discover/products?page=${page}&limit=${limit}`;
  };

  const { data, error, size, setSize, mutate, isValidating } = useSWRInfinite(
    getKey,
    fetcher,
    {
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
    }
  );

  if (isMutate) mutate();

  console.log("discover data:", data);

  // ✅ Flatten pages into one list
    const products = data ? data.flatMap((page) => page.data || []) : [];

  // This ensures no repeated products across pages.

  // ✅ Get hasNextPage from the last page
  const hasNextPage = data?.[data.length - 1]?.meta?.hasNextPage ?? false;

  const isLoading = !data && !error;
  const isLoadingMore =
    size > 0 && data && typeof data[size - 1] === "undefined";
  const isEmpty = !isLoading && !isLoadingMore && products.length === 0;

  const refreshData = useCallback(() => mutate(), [mutate]);

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
