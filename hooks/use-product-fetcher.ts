// "use client";

// import { useLayoutEffect, useState, useCallback, useMemo, useRef, useEffect } from "react";
// import { useSearchParams } from "next/navigation";
// import { useProductStore } from "./product-store";
// import { parseCheckoutUrl, getVariationDisplayName } from "@/lib/url-parser";

// // SWR fetcher function
// const fetcher = async (url: string) => {
//   const response = await fetch(url);
//   if (!response.ok) {
//     throw new Error(`HTTP error! status: ${response.status}`);
//   }
//   return response.json();
// };

// export function useProductFetcher() {
//   const searchParams = useSearchParams();
//   const { setOrderSummaries, clearOrderSummaries } = useProductStore();
//   const [isLoading, setIsLoading] = useState(false);
//   const [hasErrors, setHasErrors] = useState(false);
//   const [fetchedData, setFetchedData] = useState<any[]>([]);
//   const hasInitialized = useRef(false);
//   const isMounted = useRef(true);

//   // Parse URL parameters
//   const parsedUrl = useMemo(() => {
//     return parseCheckoutUrl(searchParams);
//   }, [searchParams]);

//   const { items, ref, platform } = parsedUrl;

//   // Only fetch if platform is "store" and we have items
//   // const shouldFetch = mounted && platform === "store" && items.length > 0;

//   // // Set mounted state
//   // useLayoutEffect(() => {
//   //   setMounted(true);
//   // }, []);

//   // Fetch all products manually (not using SWR to avoid conditional hooks)
//   const fetchProducts = useCallback(async () => {
//     if (platform !== "store" || items.length === 0) {
//       clearOrderSummaries();
//       return;
//     }

//     try {
//       setIsLoading(true);
//       setHasErrors(false);

//       const productUrls = items.map(
//         (item) => `/api/public/products/${item.pid}?subdomain=${ref}`
//       );

//       const results = await Promise.allSettled(
//         productUrls.map((url) => fetcher(url))
//       );

//       const data = results.map((result) =>
//         result.status === "fulfilled" ? result.value : null
//       );

//       // Only update state if component is still mounted
//       if (isMounted.current) {
//         setFetchedData(data);
//         setHasErrors(results.some((r) => r.status === "rejected"));
//       }
//     } catch (error) {
//       if (isMounted.current) {
//         console.error("Error fetching products:", error);
//         setHasErrors(true);
//         setFetchedData([]);
//       }
//     } finally {
//       if (isMounted.current) {
//         setIsLoading(false);
//       }
//     }
//   }, [items, ref, platform, clearOrderSummaries]);

//   // Process fetched data into order summaries
//   const processOrderSummaries = useCallback(() => {
//     if (
//       platform !== "store" ||
//       items.length === 0 ||
//       fetchedData.length === 0
//     ) {
//       return;
//     }

//     if (isLoading || hasErrors || fetchedData.length === 0) {
//       return;
//     }

//     // Only process if we have valid data and platform is store
//     if (platform !== "store" || items.length === 0) {
//       return;
//     }

//     console.log("platform", platform);
//     console.log("items", items.length);

//     const orderSummaries = items
//       .map((item, index) => {
//         const productResponse = fetchedData[index];
//         const productData = productResponse?.data;
//         console.log("productResponse", productResponse);
//         console.log("productData", productData);

//         if (!productData) return null;

//         // Extract pickup location
//         const pickupLocation = productData.pickupLocation
//           ? {
//               latitude: productData.pickupLocation.latitude,
//               longitude: productData.pickupLocation.longitude,
//             }
//           : undefined;

//         // Handle variation selection
//         let selectedVariation = null;
//         if (item.variation && productData.variations) {
//           selectedVariation = productData.variations.find(
//             (v: any) => v.id === item.variation
//           );
//         }

//         // Create product item
//         const productItem = {
//           id: productData.originalId || productData.id,
//           name: productData.name,
//           price: productData.price,
//           originalPrice: productData.originalPrice,
//           quantity: item.qty,
//           image: productData.images?.[0] || "/placeholder.svg",
//           supplierId: productData.supplierId,
//           ...(selectedVariation && {
//             size: selectedVariation.size,
//             color: selectedVariation.color,
//             variationId: selectedVariation.id,
//             variationName: getVariationDisplayName(selectedVariation),
//           }),
//           ...(!selectedVariation && {
//             size: productData.size,
//             color: productData.color,
//           }),
//         };

//         // Calculate totals
//         const subtotal = productItem.price * productItem.quantity;
//         const total = subtotal; // Delivery fee will be calculated later

//         return {
//           item: productItem, // Single item instead of array
//           subtotal,
//           total,
//           productId: productData.originalId || productData.id,
//           referralId: ref,
//           platform,
//           pickupLocation,
//           deliveryFee: 0,
//         };
//       })
//       .filter(
//         (summary): summary is NonNullable<typeof summary> => summary !== null
//       );

//     console.log("orderSummary", orderSummaries);

//     if (orderSummaries.length > 0) {
//       setOrderSummaries(orderSummaries);
//     }
//   }, [fetchedData, items, ref, platform, setOrderSummaries]);

//   // Initial fetch when component mounts or dependencies change
//   useEffect(() => {
//     isMounted.current = true;
//     if (!hasInitialized.current) {
//       fetchProducts();
//       hasInitialized.current = true;
//     }

//     return () => {
//       isMounted.current = false; // Mark as unmounted
//     };
//   }, [fetchProducts]);

//   useEffect(() => {
//     if (!isLoading && !hasErrors && fetchedData.length > 0) {
//       processOrderSummaries();
//     }
//   }, [isLoading, hasErrors, fetchedData, processOrderSummaries]);
//   return {
//     isLoading,
//     hasErrors,
//     errors: hasErrors ? ["Failed to fetch product data"] : [],
//     refetch: fetchProducts,
//   };
// }




"use client";

import useSWR from "swr";
import { useMemo } from "react";
import type { ParsedUrlItem } from "@/lib/url-parser";

// SWR fetcher function
const fetcher = async (url: string) => {
  const response = await fetch(url);
  if (!response.ok) {
    throw new Error(`HTTP error! status: ${response.status}`);
  }
  return response.json();
};

// SWR configuration for product fetching
const productFetchingOptions = {
  revalidateOnFocus: false,
  revalidateOnReconnect: true,
  refreshInterval: 0,
  dedupingInterval: 5000,
  errorRetryCount: 2,
  errorRetryInterval: 1000,
};

export function useProductFetching(
  items: ParsedUrlItem[],
  ref: string | null,
  platform: string | null,
  enabled = true
) {
  // Generate SWR key only when platform is "store" and we have items
  const swrKey = useMemo(() => {
    if (!enabled || platform !== "store" || !items.length || !ref) {
      return null;
    }

    // Create a unique key for the combination of products
    const itemsKey = items
      .map((item) => `${item.pid}-${item.qty}-${item.variation || ""}`)
      .sort()
      .join("|");

    return `products-batch-${ref}-${itemsKey}`;
  }, [items, ref, platform, enabled]);

  // Fetch function that handles multiple products
  const fetchProducts = async () => {
    if (!items.length || !ref) return [];

    const productUrls = items.map(
      (item) => `/api/public/products/${item.pid}?subdomain=${ref}`
    );

    const results = await Promise.allSettled(
      productUrls.map((url) => fetcher(url))
    );

    return results.map((result, index) => ({
      item: items[index],
      data: result.status === "fulfilled" ? result.value : null,
      error: result.status === "rejected" ? result.reason : null,
    }));
  };

  const {
    data: productsData,
    error,
    isLoading,
    mutate,
  } = useSWR(swrKey, fetchProducts, productFetchingOptions);

  return {
    productsData: productsData || [],
    error,
    isLoading,
    mutate,
    isEnabled: platform === "store" && enabled,
  };
}
