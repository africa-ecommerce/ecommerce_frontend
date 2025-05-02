"use client";
import useSWR from "swr";

const currentUserFetcher = async () => {
  try {
    const response = await fetch("/api/auth/current-user");
    
    if (!response.ok) {
      console.error("User fetch error:", response.status, response.statusText);
      throw new Error("Failed to fetch current user");
    }
    
    const data = await response.json();
    return data;
  } catch (error) {
    console.error("Error fetching user:", error);
    throw error;
  }
};

export function useSwrUser(initialData?: any) {
  const { data, error, isLoading, mutate } = useSWR(
    "/api/auth/current-user",
    currentUserFetcher,
    {
      fallbackData: initialData,
      revalidateOnFocus: false,
      revalidateOnReconnect: true,
      dedupingInterval: 5000,
      keepPreviousData: true,
      // Only revalidate on mount if initialData is not provided or is stale
      revalidateOnMount: true,
      // Only revalidate if data is stale and we don't have fresh initialData
      revalidateIfStale: true,
    }
  );

  return {
    user: data,
    isLoading: isLoading && !data,
    isError: error,
    mutate,
  };
}