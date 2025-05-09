/**
 * Fetch a product by ID from the API
 * @param id Product ID to fetch
 * @returns The product data
 */
// export const getProduct = async (id: string) => {
//   const res = await fetch(`/api/products/${id}`);

//   if (!res.ok) {
//     const errorData = await res.json();
//     throw new Error(
//       errorData.error || `Failed to fetch product with id: ${id}`
//     );
//   }

  

//   const {data} = await res.json();


import { cookies } from "next/headers";
import { headers } from "next/headers";

/**
 * Client-side function to fetch a product
 */
export const getProduct = async (id: string) => {
  const baseUrl =
    process.env.NEXT_PUBLIC_BACKEND_URL || "http://localhost:3000";

  const res = await fetch(`${baseUrl}/products/${id}`, {
    // Include credentials to send cookies with the request
    credentials: "include",
    // Ensures fresh data
    cache: "no-store",
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

  const { data } = await res.json();
  return data;
};

/**
 * Server-side version to use within API routes or server components
 * This version forwards cookies from the client request
 * @param id Product ID to fetch
 * @returns The product data
 */
export const getProductServer = async (id: string) => {
  // Get all cookies from the incoming request
  const cookieStore = await cookies();
  const headersList = await headers();

  // When using from another API route or server component,
  // you may need the full URL instead of relative path
  const baseUrl =
    process.env.NEXT_PUBLIC_BACKEND_URL || "http://localhost:3000";

  // Forward all cookies to maintain authentication state
  const allCookies = cookieStore.getAll();
  const cookieHeader = allCookies
    .map((cookie) => `${cookie.name}=${cookie.value}`)
    .join("; ");

  const res = await fetch(`${baseUrl}/products/${id}`, {
    // Ensures the request isn't cached
    cache: "no-store",
    // For server-to-server communication, including forwarded cookies
    headers: {
      "Content-Type": "application/json",
      Cookie: cookieHeader,
      // Optionally forward other relevant headers like user-agent
      "User-Agent": headersList.get("user-agent") || "",
    },
  });

  console.log("Response status:", res.status);
  console.log("Base URL:", baseUrl);

  if (!res.ok) {
    console.error("Error response:", res.statusText);
    try {
      const errorData = await res.json();
      throw new Error(
        errorData.error || `Failed to fetch product with id: ${id}`
      );
    } catch (e) {
      throw new Error(
        `Failed to fetch product with id: ${id}. Status: ${res.status}`
      );
    }
  }

  const { data } = await res.json();
  console.log("Product data retrieved:", data ? "success" : "empty");
  return data;
};