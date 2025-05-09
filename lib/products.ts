/**
 * Fetch a product by ID from the API
 * @param id Product ID to fetch
 * @returns The product data
 */
export const getProduct = async (id: string) => {
  const res = await fetch(`/api/products/${id}`);

  if (!res.ok) {
    const errorData = await res.json();
    throw new Error(
      errorData.error || `Failed to fetch product with id: ${id}`
    );
  }

  const {data} = await res.json();
  return data;
};

/**
 * Server-side version to use within API routes or server components
 * @param id Product ID to fetch
 * @returns The product data
 */
export const getProductServer = async (id: string) => {
  // When using from another API route or server component,
  // you may need the full URL instead of relative path
  const baseUrl = process.env.NEXT_PUBLIC_API_URL || "http://localhost:3000";
  const res = await fetch(`${baseUrl}/api/products/${id}`, {
    // Ensures the request isn't cached
    cache: "no-store",
    // For server-to-server communication
    headers: {
      "Content-Type": "application/json",
    },
  });

  if (!res.ok) {
    const errorData = await res.json();
    throw new Error(
      errorData.error || `Failed to fetch product with id: ${id}`
    );
  }

  const {data} = await res.json();
  return  data;
};
