// "use client";

// import useSWRInfinite from "swr/infinite";
// import { useCallback, useEffect } from "react";
// import { useShoppingCart } from "@/app/_components/provider/shoppingCartProvider";

// const fetcher = async (url: string) => {
//   const response = await fetch(url, { credentials: "include" });
//   if (!response.ok) throw new Error("Failed to fetch discover products");
//   return response.json();
// };

// export function useDiscoverProducts(limit: number = 100) {
//   const { isMutate } = useShoppingCart();

//   const getKey = () => {
//     return `/api/discover/products?limit=${limit}`;
//   };

//   const { data, error, size, setSize, mutate, isValidating } = useSWRInfinite(
//     getKey,
//     fetcher,
//     {
//       revalidateFirstPage: false,
//       revalidateOnFocus: false,
//       persistSize: false,
//       revalidateOnReconnect: true,
//       dedupingInterval: 2000,
//       errorRetryCount: 2,
//       errorRetryInterval: 1000,
//       onError: (error, key) => {
//         console.error("Discover fetch error:", error.message, "Key:", key);
//       },
//     }
//   );

// useEffect(() => {
//   if (isMutate) mutate();
// }, [isMutate, mutate]);

//   console.log("discover data:", data);

//   // ✅ Flatten pages into one list
//     const products = data ? data.flatMap((page) => page.data || []) : [];

//   // This ensures no repeated products across pages.

//   // ✅ Get hasNextPage from the last page

//   const isLoading = !data && !error;
//   const isLoadingMore =
//     size > 0 && data && typeof data[size - 1] === "undefined";
//   const isEmpty = !isLoading && !isLoadingMore && products.length === 0;

//   const refreshData = useCallback(() => mutate(), [mutate]);

//   return {
//     products,
//     error,
//     isLoading,
//     isLoadingMore,
//     isValidating,
//     isEmpty,
//     size,
//     setSize,
//     mutate,
//     refreshData,
//   };
// }




"use client";

import useSWR from "swr";
import { useEffect } from "react";
import { useShoppingCart } from "@/app/_components/provider/shoppingCartProvider";

const fetcher = async (url: string) => {
  const res = await fetch(url, { credentials: "include" });
  if (!res.ok) throw new Error("Failed to fetch discover products");
  return res.json();
};

export function useDiscoverProducts(limit: number = 100) {
  const { isMutate } = useShoppingCart();

  const { data, error, mutate, isValidating } = useSWR(
    `/api/discover/products?limit=${limit}`,
    fetcher,
    {
      dedupingInterval: 3000,
      revalidateOnFocus: true,
      revalidateOnReconnect: true,
      refreshInterval: 30_000,
      errorRetryCount: 2,
      errorRetryInterval: 1000,
      onError: (err, key) => {
        console.error("Discover fetch error:", err.message, "Key:", key);
      },
    }
  );

  useEffect(() => {
    if (isMutate) mutate();
  }, [isMutate, mutate]);

  const products = Array.isArray(data?.data) ? data.data : [];

  console.log("data", data)

  return {
    products,
    // count: data?.meta?.returnedCount ?? products.length,
    // total: data?.meta?.totalCount ?? 0,
    // createdAt: data?.meta?.cacheCreatedAt ?? null,
    error,
    isLoading: !data && !error,
    isValidating,
    refreshData: mutate,
  };
}
