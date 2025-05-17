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
 return {
  id: id,
  name: "Traditional Ankara Fabric Blouse",
  price: 12500,
  description:
    "Beautiful handcrafted Ankara fabric blouse with modern design elements. Made from high-quality cotton with vibrant patterns that showcase African heritage and craftsmanship.",
  features: [
    "100% authentic Ankara fabric",
    "Handmade by local artisans",
    "Breathable cotton material",
    "Vibrant colors that don't fade easily",
  ],
  image: "/placeholder.svg?height=400&width=400",
  size: "M",
  color: "Multicolor",
  seller: "Adire Textiles",
  inStock: true,
}
};

/**
 * Server-side version to use within API routes or server components
 * This version forwards cookies from the client request
 * @param id Product ID to fetch
 * @returns The product data
 */
export const getProductServer = async (id: string) => {
 return {
  id: id,
  name: "Traditional Ankara Fabric Blouse",
  price: 12500,
  description:
    "Beautiful handcrafted Ankara fabric blouse with modern design elements. Made from high-quality cotton with vibrant patterns that showcase African heritage and craftsmanship.",
  features: [
    "100% authentic Ankara fabric",
    "Handmade by local artisans",
    "Breathable cotton material",
    "Vibrant colors that don't fade easily",
  ],
  image: "/placeholder.svg?height=400&width=400",
  size: "M",
  color: "Multicolor",
  seller: "Adire Textiles",
  inStock: true,
}
};