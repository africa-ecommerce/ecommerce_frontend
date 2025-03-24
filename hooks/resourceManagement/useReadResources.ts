
import useSWR from "swr";



/**
 * Hook for reading resources with SWR
 *
 * @param key - The SWR cache key
 * @param fetcher - Function to fetch the resource(s)
 * @returns Resource data and loading state
 */
export function useReadResource<T>(
  key: string | null,
  fetcher: () => Promise<T>
) {
  const { data, error, isLoading, mutate } = useSWR<T>(key, fetcher);

  return {
    data,
    error,
    isLoading,
    mutate,
    isError: !!error,
  };
}
