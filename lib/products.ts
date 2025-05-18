


// import { cookies } from "next/headers";
// import { headers } from "next/headers";

// /**
//  * Client-side function to fetch a product
//  */
// export const getProduct = async (id: string) => {
//  return {
//   id: id,
//   name: "Traditional Ankara Fabric Blouse",
//   price: 12500,
//   description:
//     "Beautiful handcrafted Ankara fabric blouse with modern design elements. Made from high-quality cotton with vibrant patterns that showcase African heritage and craftsmanship.",
//   features: [
//     "100% authentic Ankara fabric",
//     "Handmade by local artisans",
//     "Breathable cotton material",
//     "Vibrant colors that don't fade easily",
//   ],
//   image: "/placeholder.svg?height=400&width=400",
//   size: "M",
//   color: "Multicolor",
//   seller: "Adire Textiles",
//   inStock: true,
// }
// };

// /**
//  * Server-side version to use within API routes or server components
//  * This version forwards cookies from the client request
//  * @param id Product ID to fetch
//  * @returns The product data
//  */
// export const getProductServer = async (id: string) => {
//  return {
//   id: id,
//   name: "Traditional Ankara Fabric Blouse",
//   price: 12500,
//   description:
//     "Beautiful handcrafted Ankara fabric blouse with modern design elements. Made from high-quality cotton with vibrant patterns that showcase African heritage and craftsmanship.",
//   features: [
//     "100% authentic Ankara fabric",
//     "Handmade by local artisans",
//     "Breathable cotton material",
//     "Vibrant colors that don't fade easily",
//   ],
//   image: "/placeholder.svg?height=400&width=400",
//   size: "M",
//   color: "Multicolor",
//   seller: "Adire Textiles",
//   inStock: true,
// }
// };



import useSWR from 'swr';

// Function for server-side product fetching
export async function getProductServer(productId: string, plugId?: string) {
  try {
    // Make sure we have a productId
    if (!productId) {
      console.error('No productId provided to getProductServer');
      return null;
    }

    // Create the request body
    const body: { productId: string; plugId?: string } = { productId };
    if (plugId) body.plugId = plugId;

    // Fetch from the API
    const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/public/product`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(body),
      // Since this runs on the server, we can use cache options
      cache: 'force-cache',
    });

    if (!response.ok) {
      throw new Error(`API error: ${response.status}`);
    }

    return await response.json();
  } catch (error) {
    console.error('Error fetching product:', error);
    return null;
  }
}

// Function for client-side product fetching using SWR
export function getProduct(productId: string | undefined, plugId?: string) {
  // Create a unique key for SWR based on the parameters
  const key = productId ? `/api/public/product/${productId}${plugId ? `/${plugId}` : ''}` : null;

  // Use SWR for client-side data fetching with caching and revalidation
  const { data, error, isLoading, mutate } = useSWR(
    key,
    async () => {
      if (!productId) return null;

      const body: { productId: string; plugId?: string } = { productId };
      if (plugId) body.plugId = plugId;

      const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/public/product`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(body),
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
    product: data,
    isLoading,
    isError: error,
    mutate,
  };
}