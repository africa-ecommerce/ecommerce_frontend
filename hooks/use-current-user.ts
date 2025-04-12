// hooks/useCurrentUser.js
"use client"
import { useReadResource } from "./resourceManagement/useReadResources";

// Define the fetcher function once
const currentUserFetcher = async () => {
  const response = await fetch("/api/auth/current-user");
  if (!response.ok) {
    throw new Error("Failed to fetch current user");
  }
  return response.json();
};

// Custom hook that can be called without any parameters
export function useCurrentUser() {
  const { data, error, isLoading, mutate } = useReadResource(
    "/auth/current-user", 
    currentUserFetcher
  );
  
  return {
    user: data?.user,
    error,
    isLoading,
    mutate,
    isError: !!error,
  };
}