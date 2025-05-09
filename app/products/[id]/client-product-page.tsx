"use client";
// File: app/products/[id]/client-product-page.tsx

import { useState, useEffect } from "react";
import { useSearchParams } from "next/navigation";
import ProductDetails from "./product-details";

export default function ClientProductPage({
  productId,
}: {
  productId: string;
}) {
  const [product, setProduct] = useState<any>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  // Access search params if needed
  const searchParams = useSearchParams();

  useEffect(() => {
    async function fetchProduct() {
      try {
        setLoading(true);

        // Get any query parameters you might need
        const queryParam = searchParams.get("someParam"); // Example of using search params

        const baseUrl =
          process.env.NEXT_PUBLIC_BACKEND_URL || "http://localhost:3000";
        const res = await fetch(`${baseUrl}/products/${productId}`, {
          credentials: "include", // Important: This sends cookies with the request
          cache: "no-store",
          headers: {
            "Content-Type": "application/json",
          },
        });

        if (!res.ok) {
          throw new Error(`Failed to fetch product with id: ${productId}`);
        }

        const { data } = await res.json();
        setProduct(data);
      } catch (err: any) {
        console.error("Error fetching product:", err);
        setError(err.message || "Failed to load product");
      } finally {
        setLoading(false);
      }
    }

    fetchProduct();
  }, [productId, searchParams]); // Re-fetch if productId or search params change

  // Loading state
  if (loading) {
    return (
      <div className="flex justify-center items-center min-h-[400px]">
        <div className="animate-spin rounded-full h-10 w-10 border-b-2 border-gray-900"></div>
      </div>
    );
  }

  // Error state
  if (error) {
    return <div className="text-red-500 p-4">Error: {error}</div>;
  }

  // Not found state
  if (!product) {
    return <div className="p-4">Product not found</div>;
  }

  // Render product details
  return <ProductDetails product={product} />;
}
