// hooks/use-current-user.ts
"use client";
import useSWR from "swr";

const currentUserFetcher = async () => {
  const response = await fetch("/api/auth/current-user");
  if (!response.ok) {
    throw new Error("Failed to fetch current user");
  }
  return response.json();
};

export function useSwrUser(initialData?: any) {
  const { data, error, isLoading, mutate } = useSWR(
    "/api/auth/current-user",
    currentUserFetcher,
    {
      fallbackData: initialData,
      revalidateOnFocus: false, // Changed to false to prevent reloading on focus
      revalidateOnReconnect: true,
      dedupingInterval: 10000, // Increased to reduce refetching
      keepPreviousData: true, // Keep showing previous data while revalidating
      // Don't revalidate if we have initial data
      revalidateIfStale: initialData ? false : true,
    }
  );

  return {
    user: data,
    isLoading: isLoading && !data, // Only consider loading if we have no data
    isError: error,
    mutate,
  };
}
