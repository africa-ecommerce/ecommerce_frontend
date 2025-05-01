


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
    console.log("API returned user data:", data); // Debug log
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
      // Always revalidate on mount to get fresh data
      revalidateOnMount: true,
      // Always revalidate if stale, regardless of initialData
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