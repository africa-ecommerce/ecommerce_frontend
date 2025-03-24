import useSWR from "swr";


/**
 * Hook for deleting resources
 *
 * @param key - The SWR cache key for the resources collection
 * @param fetcher - Function to fetch the resource collection
 * @param deleteFn - Function to delete a resource
 * @param onSuccess - Optional callback function to execute after successful deletion
 * @returns Function to delete a resource and collection data
 */
export function useDeleteResource<T>(
  key: string,
  fetcher: () => Promise<T[]>,
  deleteFn: (id: string | number) => Promise<void>,
  onSuccess?: () => void
) {
  // Get the current data from SWR
  const { data: resources, mutate, isLoading, error } = useSWR<T[]>(key, fetcher);

  // Handle delete action
  const handleDelete = async (id: string | number) => {
    try {
      // Delete the resource
      await deleteFn(id);

      // Trigger revalidation
      await mutate();

      // Execute success callback if provided
      if (onSuccess) {
        onSuccess();
      }

      return { success: true, error: null };
    } catch (error) {
      const errorMessage =
        error instanceof Error ? error.message : String(error);
      console.error("Delete error:", errorMessage);

      return { success: false, error: errorMessage };
    }
  };

  return {
    resources: Array.isArray(resources) ? resources : [],
    isLoading,
    error,
    deleteResource: handleDelete,
    isError: !!error,
  };
}