// hooks/useCurrentUser.js
"use client"
import useSWR from 'swr';


// Define the fetcher function once
const currentUserFetcher = async () => {
  const response = await fetch("/api/auth/current-user");
  if (!response.ok) {
    throw new Error("Failed to fetch current user");
  }
  return response.json();
};

// Custom hook that can be called without any parameters
export function useSwrUser(initialData?: any) {
  const { data, error, isLoading, mutate } = useSWR(
    "/api/auth/current-user",
    currentUserFetcher,
    {
      fallbackData: initialData, // Use middleware-provided data as fallback
      revalidateOnFocus: true,
      revalidateOnReconnect: true,
      dedupingInterval: 5000,
      // Optional: If initial data is complete, don't fetch immediately
      // This prevents an immediate refetch when initial data is available
      revalidateIfStale: initialData ? false : true,
    }
  );

  return {
    user: data,
    isLoading,
    isError: error,
    mutate,
  };
}