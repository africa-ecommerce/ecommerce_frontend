"use client";

import { useLayoutEffect } from "react";
import useSWR from "swr";
import { useSearchParams } from "next/navigation";
import { useProductStore } from "./product-store";
import { parseCheckoutUrl, getVariationDisplayName } from "@/lib/url-parser";

// SWR fetcher function
const fetcher = async (url: string) => {
  const response = await fetch(url);
  if (!response.ok) {
    throw new Error(`HTTP error! status: ${response.status}`);
  }
  return response.json();
};

export function useProductFetcher() {
  const searchParams = useSearchParams();
  const { setOrderSummaries, clearOrderSummaries } = useProductStore();

  // Parse URL parameters
  const parsedUrl = parseCheckoutUrl(searchParams);
  const { items, ref, platform } = parsedUrl;

  // Only fetch if platform is "store" and we have items
  const shouldFetch = platform === "store" && items.length > 0;

  // Create SWR keys for all products
  const productKeys = shouldFetch
    ? items.map((item) => `/api/public/products/${item.pid}?subdomain=${ref}`)
    : [];

  // Use SWR to fetch all products
  const productQueries = productKeys.map((key) => useSWR(key, fetcher));

  // Check if all queries are loaded
  const allLoaded = productQueries.every((query) => query.data || query.error);
  const hasErrors = productQueries.some((query) => query.error);

  useLayoutEffect(() => {
    if (!shouldFetch) return;

    if (allLoaded && !hasErrors) {
      const orderSummaries = items
        .map((item, index) => {
          const productData = productQueries[index]?.data?.data;

          if (!productData) return null;

          // Extract pickup location
          const pickupLocation = productData.pickupLocation
            ? {
                latitude: productData.pickupLocation.latitude,
                longitude: productData.pickupLocation.longitude,
              }
            : undefined;

          // Handle variation selection
          let selectedVariation = null;
          if (item.variation && productData.variations) {
            selectedVariation = productData.variations.find(
              (v: any) => v.id === item.variation
            );
          }

          // Create product item
          const productItem = {
            id: productData.originalId || productData.id,
            name: productData.name,
            price: productData.price,
            originalPrice: productData.originalPrice,
            quantity: item.qty,
            image: productData.images?.[0] || "/placeholder.svg",
            supplierId: productData.supplierId,
            ...(selectedVariation && {
              size: selectedVariation.size,
              color: selectedVariation.color,
              variationId: selectedVariation.id,
              variationName: getVariationDisplayName(selectedVariation),
            }),
            ...(!selectedVariation && {
              size: productData.size,
              color: productData.color,
            }),
          };

          // Calculate totals
          const subtotal = productItem.price * productItem.quantity;
          const total = subtotal; // Delivery fee will be calculated later

          return {
            items: [productItem],
            subtotal,
            total,
            productId: productData.originalId || productData.id,
            referralId: ref,
            platform,
            pickupLocation,
            deliveryFee: 0,
          };
        })
        .filter(
          (summary): summary is NonNullable<typeof summary> => summary !== null
        );

      if (orderSummaries.length > 0) {
        setOrderSummaries(orderSummaries);
      }
    }

    // Clear summaries if there are errors
    if (hasErrors) {
      console.error(
        "Error fetching products:",
        productQueries.map((q) => q.error)
      );
      clearOrderSummaries();
    }
  }, [
    shouldFetch,
    allLoaded,
    hasErrors,
    items,
    ref,
    platform,
    setOrderSummaries,
    clearOrderSummaries,
  ]);

  return {
    isLoading: shouldFetch && !allLoaded,
    hasErrors,
    errors: productQueries.map((q) => q.error).filter(Boolean),
  };
}
