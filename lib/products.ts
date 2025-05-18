import useSWR from "swr";

// Function for server-side product fetching
export async function getProductServer(productId: string, plugId?: string) {
  try {
    // Make sure we have a productId
    if (!productId) {
      console.error("No productId provided to getProductServer");
      return null;
    }

    // Build the URL with query parameters
    const url = `${process.env.BACKEND_URL}/public/products/${productId}${
      plugId ? `/${plugId}` : ""
    }`;

    // Fetch from the API
    const response = await fetch(url, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
      // Since this runs on the server, we can use cache options
      // cache: "force-cache",
    });

    if (!response.ok) {
      throw new Error(`API error: ${response.status}`);
    }

    return await response.json();
  } catch (error) {
    console.error("Error fetching product:", error);
    return null;
  }
}




export function getProduct(
  productId?: string,
  plugId?: string
) {
  // Create a unique key for SWR based on the parameters
  const key = productId
    ? `/public/products/${productId}${plugId ? `/${plugId}` : ""}`
    : null;

  // Use SWR for client-side data fetching with caching and revalidation
  const { data, error, isLoading, mutate } = useSWR(
    key,
    async () => {
      if (!productId) return null;

      // Build the URL with path parameters
      const url = `${
        process.env.NEXT_PUBLIC_BACKEND_URL
      }/public/products/${productId}${plugId ? `/${plugId}` : ""}`;

      const response = await fetch(url, {
        method: "GET",
        headers: { "Content-Type": "application/json" },
      });

      if (!response.ok) {
        throw new Error(`API error: ${response.status}`);
      }

      return response.json();
    },
    {
      revalidateOnFocus: false,
      revalidateIfStale: false,
      dedupingInterval: 60000, // 1 minute
    }
  );

  return {
    product: data || null,
    isLoading,
    isError: error || null,
    mutate,
  };
}
