"use client";

import { useLayoutEffect, useState, useCallback, useMemo, useRef } from "react";
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
  const [isLoading, setIsLoading] = useState(false);
  const [hasErrors, setHasErrors] = useState(false);
  const [fetchedData, setFetchedData] = useState<any[]>([]);
  const [mounted, setMounted] = useState(false);
  const hasInitialized = useRef(false);

  // Parse URL parameters
  const parsedUrl = useMemo(() => {
    if (!mounted) return { items: [], ref: "", platform: "" };
    return parseCheckoutUrl(searchParams);
  }, [searchParams, mounted]);

  const { items, ref, platform } = parsedUrl;

  // Only fetch if platform is "store" and we have items
  const shouldFetch = mounted && platform === "store" && items.length > 0;

  // Set mounted state
  useLayoutEffect(() => {
    setMounted(true);
  }, []);

  // Fetch all products manually (not using SWR to avoid conditional hooks)
  const fetchProducts = useCallback(async () => {
    if (!mounted) return;

    if (platform !== "store") {
      if (!hasInitialized.current) {
        hasInitialized.current = true;
      }
      return;
    }

    // Clear summaries only for store platform with no items
    if (items.length === 0) {
      setFetchedData([]);
      setIsLoading(false);
      setHasErrors(false);
      clearOrderSummaries();
      hasInitialized.current = true;
      return;
    }

    setIsLoading(true);
    setHasErrors(false);

    try {
      // Create URLs for all products
      const productUrls = items.map(
        (item) => `/api/public/products/${item.pid}?subdomain=${ref}`
      );

      // Fetch all products in parallel
      const promises = productUrls.map((url) => fetcher(url));
      const results = await Promise.allSettled(promises);

      const data = results.map((result) =>
        result.status === "fulfilled" ? result.value : null
      );
      const hasAnyErrors = results.some(
        (result) => result.status === "rejected"
      );

      console.log("data", data);

      setFetchedData(data);
      setHasErrors(hasAnyErrors);

      if (hasAnyErrors) {
        console.error(
          "Some product fetches failed:",
          results
            .filter((result) => result.status === "rejected")
            .map((result) => (result as PromiseRejectedResult).reason)
        );
      }
    } catch (error) {
      console.error("Error fetching products:", error);
      setHasErrors(true);
      setFetchedData([]);
    } finally {
      setIsLoading(false);
      hasInitialized.current = true;
    }
  }, [mounted, platform, items, ref, clearOrderSummaries]);

  // Process fetched data into order summaries
  const processOrderSummaries = useCallback(() => {
    if (!mounted || !hasInitialized.current) return;

    console.log("shouldFetch", shouldFetch);
    console.log("isLoading", isLoading);
    console.log("hasErrors", hasErrors);
    console.log("fetchedData", fetchedData.length);

    if (isLoading || hasErrors || fetchedData.length === 0) {
      return;
    }

    // Only process if we have valid data and platform is store
    if (platform !== "store" || items.length === 0) {
      return;
    }

    console.log("platform", platform);
    console.log("items", items.length);

    const orderSummaries = items
      .map((item, index) => {
        const productResponse = fetchedData[index];
        const productData = productResponse?.data;
        console.log("productResponse", productResponse);
        console.log("productData", productData);

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
          item: productItem, // Single item instead of array
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

    console.log("orderSummary", orderSummaries);

    if (orderSummaries.length > 0) {
      setOrderSummaries(orderSummaries);
    }
  }, [
    mounted,
    hasInitialized.current,
    isLoading,
    hasErrors,
    fetchedData,
    items,
    ref,
    platform,
    setOrderSummaries,
  ]);

  // Initial fetch when component mounts or dependencies change
  useLayoutEffect(() => {
    if (mounted && !hasInitialized.current) {
      fetchProducts();
    }
  }, [mounted, fetchProducts]);

  // Process order summaries when data is ready
  useLayoutEffect(() => {
    if (mounted && hasInitialized.current) {
      processOrderSummaries();
    }
  }, [mounted, processOrderSummaries]);

  return {
    isLoading: !mounted || isLoading,
    hasErrors,
    errors: hasErrors ? ["Failed to fetch product data"] : [],
    refetch: fetchProducts,
  };
}
