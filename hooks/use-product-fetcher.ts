"use client";

import { useLayoutEffect, useState, useCallback } from "react";
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
  const [fetchedData, setFetchedData] = useState<any[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [hasErrors, setHasErrors] = useState(false);

  // Parse URL parameters
  const parsedUrl = parseCheckoutUrl(searchParams);
  const { items, ref, platform } = parsedUrl;

  // Only fetch if platform is "store" and we have items
  const shouldFetch = platform === "store" && items.length > 0;

  // Create URLs for all products
  const productUrls = shouldFetch 
    ? items.map(item => `/api/public/products/${item.pid}?subdomain=${ref}`)
    : [];

  // Fetch all products sequentially to avoid hook violations
  const fetchProducts = useCallback(async () => {
    if (!shouldFetch || productUrls.length === 0) {
      setFetchedData([]);
      setIsLoading(false);
      setHasErrors(false);
      return;
    }

    setIsLoading(true);
    setHasErrors(false);

    try {
      const promises = productUrls.map(url => fetcher(url));
      const results = await Promise.allSettled(promises);
      
      const data = results.map(result => 
        result.status === 'fulfilled' ? result.value : null
      );
      
      const hasAnyErrors = results.some(result => result.status === 'rejected');
      
      setFetchedData(data);
      setHasErrors(hasAnyErrors);
      
      if (hasAnyErrors) {
        console.error("Some product fetches failed:", results
          .filter(result => result.status === 'rejected')
          .map(result => result.reason)
        );
      }
    } catch (error) {
      console.error("Error fetching products:", error);
      setHasErrors(true);
      setFetchedData([]);
    } finally {
      setIsLoading(false);
    }
  }, [shouldFetch, JSON.stringify(productUrls)]);

  // Fetch products when dependencies change
  useLayoutEffect(() => {
    fetchProducts();
  }, [fetchProducts]);

  // Process fetched data into order summaries
  useLayoutEffect(() => {
    if (!shouldFetch) {
      clearOrderSummaries();
      return;
    }

    if (!isLoading && !hasErrors && fetchedData.length > 0) {
      const orderSummaries = items
        .map((item, index) => {
          const productResponse = fetchedData[index];
          const productData = productResponse?.data;

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
      clearOrderSummaries();
    }
  }, [
    shouldFetch,
    isLoading,
    hasErrors,
    fetchedData,
    items,
    ref,
    platform,
    setOrderSummaries,
    clearOrderSummaries,
  ]);

  return {
    isLoading,
    hasErrors,
    errors: hasErrors ? ["Failed to fetch product data"] : [],
    refetch: fetchProducts,
  };
}