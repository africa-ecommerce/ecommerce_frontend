// "use client";
// import { useState, useEffect, useMemo } from "react";
// import Image from "next/image";
// import { useRouter, useSearchParams } from "next/navigation";
// import { CreditCard, MapPin, ArrowLeft, Loader2, Info } from "lucide-react";
// import useSWR, { mutate } from "swr";
// import {
//   AlertDialog,
//   AlertDialogAction,
//   AlertDialogCancel,
//   AlertDialogContent,
//   AlertDialogDescription,
//   AlertDialogFooter,
//   AlertDialogHeader,
//   AlertDialogTitle,
// } from "@/components/ui/alert-dialog";
// import { Button } from "@/components/ui/button";
// import { Card, CardContent } from "@/components/ui/card";
// import { Separator } from "@/components/ui/separator";
// import { Label } from "@/components/ui/label";
// import { Textarea } from "@/components/ui/textarea";
// import { Alert, AlertDescription } from "@/components/ui/alert";
// import { useFormResolver } from "@/hooks/useFormResolver";
// import { Controller } from "react-hook-form";
// import NaijaStates from "naija-state-local-government";
// import { getLgasForState } from "@/lib/utils";
// import { Input } from "@/components/ui/input";
// import {
//   Select,
//   SelectContent,
//   SelectItem,
//   SelectTrigger,
//   SelectValue,
// } from "@/components/ui/select";
// import { deliveryFormSchema } from "@/zod/schema";
// import { useCheckoutStore } from "@/hooks/checkout-store";
// import { errorToast, successToast } from "@/components/ui/use-toast-advanced";
// import { getVariationDisplayName, parseCheckoutUrl } from "@/lib/url-parser";
// import { useProductFetching } from "@/hooks/use-product-fetcher";
// import { useProductStore } from "@/hooks/product-store";
// import { terminalAddresses, TerminalPickupPrices } from "../constant";

// // SWR fetcher function
// const fetcher = async (url: string) => {
//   const response = await fetch(url);
//   if (!response.ok) {
//     throw new Error(`HTTP error! status: ${response.status}`);
//   }
//   return response.json();
// };

// // SWR configuration options
// const swrOptions = {
//   revalidateOnFocus: false,
//   revalidateOnReconnect: true,
//   refreshInterval: 0,
//   dedupingInterval: 5000,
//   errorRetryCount: 0,
// };

// // Specific SWR options for logistics pricing (more frequent updates)
// const logisticsPricingOptions = {
//   ...swrOptions,
//   refreshInterval: 600000,
//   revalidateOnFocus: false,
//   dedupingInterval: 600000,
// };

// // SWR options for buyer info (cached longer)
// const buyerInfoOptions = {
//   ...swrOptions,
//   dedupingInterval: 10000, // Cache buyer info longer
//   refreshInterval: 0, // Don't auto-refresh buyer info
// };

// export default function CheckoutPage() {
//   // Replace local state with Zustand store
//   const {
//     checkoutData,
//     setCustomerInfo,
//     setCustomerAddress,
//     setDeliveryInstructions,
//     setCurrentStep,
//     clearCheckoutData,
//     setDeliveryMethod,
//     setTerminalAddress,
//   } = useCheckoutStore();

//   // Local state for UI-specific needs
//   const [isClient, setIsClient] = useState(false);
//   const [selectedState, setSelectedState] = useState<string>("");
//   const [availableLgas, setAvailableLgas] = useState<string[]>([]);
//   const [states, setStates] = useState<string[]>([]);
//   const [isLoading, setIsLoading] = useState(false);
//   const [showCancelledModal, setShowCancelledModal] = useState(false);
//   const [deliveryType, setDeliveryType] = useState<"terminal" | "home">(
//     "terminal"
//   );
//   const [selectedTerminal, setSelectedTerminal] = useState("");
//   const [showTerminalAlert, setShowTerminalAlert] = useState(false);
//   const router = useRouter();
//   const [stagedOrder, setStagedOrder] = useState<null | {
//     reference: string;
//     orderNumber: string;
//   }>(null);

//   // Get values from store
//   const currentStep = checkoutData.currentStep;

//   // Form resolver for customer info and address
//   const {
//     form: {
//       register,
//       submit,
//       control,
//       errors,
//       watch,
//       setValue,
//       trigger,
//       clearErrors,
//       formState: { isValid },
//     },
//   } = useFormResolver(async (data) => {
//     // Update store with form data
//     setCustomerInfo(data.customerInfo);
//     setCustomerAddress(data.customerAddress);
//     setDeliveryMethod(deliveryType);
//     if (deliveryType === "terminal" && selectedTerminal) {
//       setTerminalAddress(selectedTerminal);
//     }
//     return data;
//   }, deliveryFormSchema);

//   const searchParams = useSearchParams();

//   // Parse URL parameters
//   const parsedUrl = useMemo(() => {
//     return parseCheckoutUrl(searchParams);
//   }, [searchParams]);

//   const { items, ref, platform } = parsedUrl;

//   // Fetch products when platform is "store"
//   const {
//     productsData,
//     error: productFetchError,
//     isLoading: isProductsLoading,
//   } = useProductFetching(items, ref, platform, true);

//   console.log("checkoutProductsData", productsData);

//   const {
//     orderSummaries,
//     setOrderSummaries,
//     clearOrderSummaries,
//     updateDeliveryFee,
//   } = useProductStore();

//   // Get cart items from orderSummaries (works for both store and non-store platforms)
//   const cartItems = useMemo(() => {
//     if (platform === "store") {
//       return orderSummaries.map((summary) => summary.item);
//     }
//     // Fallback for non-store platforms (existing logic)
//     return orderSummaries.map((summary) => summary.item) || [];
//   }, [platform, orderSummaries]);

//   // Calculate subtotal from orderSummaries or fallback
//   const subtotal = useMemo(() => {
//     if (platform === "store") {
//       return orderSummaries.reduce((sum, summary) => sum + summary.subtotal, 0);
//     }
//     // Fallback for non-store platforms
//     return (
//       orderSummaries?.reduce(
//         (sum, summary) => sum + summary.item.price * summary.item.quantity,
//         0
//       ) || 0
//     );
//   }, [platform, orderSummaries]);

//   // Watch address fields for SWR key generation
//   const watchedState = watch("customerAddress.state");
//   const watchedLga = watch("customerAddress.lga");
//   const watchedStreetAddress = watch("customerAddress.streetAddress");
//   const watchedName = watch("customerInfo.name");
//   const watchedEmail = watch("customerInfo.email");
//   const watchedPhone = watch("customerInfo.phone");

//   // SWR for buyer info fetching
//   const buyerInfoKey =
//     watchedName &&
//     watchedEmail &&
//     deliveryType === "home" &&
//     watchedPhone &&
//     watchedName.trim().length >= 2 &&
//     /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(watchedEmail) &&
//     /^(\+?234|0)[\d]{10}$/.test(watchedPhone)
//       ? `/api/orders/buyer-info?buyerName=${encodeURIComponent(
//           watchedName.trim()
//         )}&buyerEmail=${encodeURIComponent(
//           watchedEmail.trim()
//         )}&buyerPhone=${encodeURIComponent(watchedPhone.trim())}`
//       : null;

//   const { data: buyerInfoData, error: buyerInfoError } = useSWR(
//     buyerInfoKey,
//     fetcher,
//     buyerInfoOptions
//   );

//   // SWR for logistics pricing
//   const logisticsPricingKey =
//     watchedState &&
//     watchedLga &&
//     watchedStreetAddress &&
//     orderSummaries.length > 0 &&
//     orderSummaries[0]?.pickupLocation?.latitude &&
//     orderSummaries[0]?.pickupLocation?.longitude
//       ? `/api/logistics/pricing?state=${encodeURIComponent(
//           watchedState
//         )}&lga=${encodeURIComponent(
//           watchedLga
//         )}&streetAddress=${encodeURIComponent(watchedStreetAddress)}`
//       : null;

//   const {
//     data: logisticsPricingData,
//     error: logisticsPricingError,
//     isLoading: isLogisticsPricingLoading,
//   } = useSWR(logisticsPricingKey, fetcher, logisticsPricingOptions);

//   // Calculate delivery fee based on method and logistics pricing
//   const getDeliveryFee = () => {
//     // For terminal pickup, use the fixed state pricing
//     if (deliveryType === "terminal" && selectedState) {
//       const terminalPrice =
//         TerminalPickupPrices[
//           selectedState as keyof typeof TerminalPickupPrices
//         ];
//       if (terminalPrice) {
//         return terminalPrice;
//       }
//     }

//     // Check if we have the required data to fetch logistics pricing
//     const hasRequiredAddressData =
//       watchedState && watchedLga && watchedStreetAddress;

//     // If we don't have required address data, don't show any delivery fee yet
//     if (!hasRequiredAddressData) {
//       return null;
//     }

//     // If we're currently loading logistics pricing, don't show fee yet
//     if (isLogisticsPricingLoading) {
//       return null;
//     }

//     // If logistics pricing was successfully fetched, use that price
//     if (
//       logisticsPricingData?.data?.price !== undefined &&
//       !logisticsPricingError
//     ) {
//       return logisticsPricingData.data.price;
//     }

//     // If there was an error fetching logistics pricing, fallback to 1500
//     if (logisticsPricingError) {
//       return 1500;
//     }

//     // Default case - should not reach here, but fallback to null
//     return null;
//   };

//   const deliveryFee = getDeliveryFee();
//   const total = subtotal + (deliveryFee || 0);

//   const formatOrderItems = () => {
//     if (!orderSummaries.length) return [];
//     return orderSummaries.flatMap((summary) => ({
//       productId: summary.item.productId,
//       quantity: summary.item.quantity,
//       supplierPrice: summary.item.originalPrice,
//       plugPrice: summary.item.price,
//       productName: summary.item.name,
//       supplierId: summary.item.supplierId,
//       ...(summary.item.variationId && {
//         variantId: summary.item.variationId,
//         variantColor: summary.item.selectedColor,
//         variantSize: summary.item.size,
//       }),
//       // For non-variation items, use product-level color and size
//       ...(!summary.item.variationId && {
//         productColor: summary.item.selectedColor,
//         productSize: summary.item.size,
//       }),
//     }));
//   };

//   const stageOrder = async () => {
//     try {
//       console.log("formatOrderItems", formatOrderItems);
//       const response = await fetch("/api/orders/stage-order", {
//         method: "POST",
//         headers: { "Content-Type": "application/json" },
//         body: JSON.stringify({
//           buyerName: checkoutData.customerInfo.name,
//           buyerEmail: checkoutData.customerInfo.email,
//           buyerPhone: checkoutData.customerInfo.phone,
//           buyerAddress: checkoutData.customerAddress.streetAddress,
//           buyerLga: checkoutData.customerAddress.lga,
//           buyerState: checkoutData.customerAddress.state,
//           buyerDirections: checkoutData.customerAddress.directions || "",
//           buyerInstructions: checkoutData.deliveryInstructions || "",
//           totalAmount: total,
//           deliveryFee,
          
         
//           platform: orderSummaries[0]?.platform || platform,
//           subdomain:
//             (orderSummaries[0].platform === "store" &&
//               orderSummaries[0].referralId) ||
//             "",
//           plugId:
//             (orderSummaries[0]?.platform !== "store" &&
//               orderSummaries[0]?.referralId) ||
//             "",
//           orderItems: formatOrderItems(),
//         }),
//       });

//       if (!response.ok) {
//         const err = await response.json();
//         errorToast(err.error || "Failed to stage order");
//         return null;
//       }

//       const result = await response.json();
//       return result.data; // { reference, orderNumber }
//     } catch (err) {
//       console.error("Error staging order:", err);
//       errorToast("Could not stage order");
//       return null;
//     }
//   };

//   // Utility delay helper
//   const delay = (ms: number) => new Promise((res) => setTimeout(res, ms));

//   const confirmOrder = async (reference: string) => {
//     try {
//       const response = await fetch("/api/orders/confirm-order", {
//         method: "POST",
//         headers: { "Content-Type": "application/json" },
//         body: JSON.stringify({ reference }),
//       });

//       if (!response.ok) {
//         const err = await response.json();
//         errorToast(err.error || "Failed to confirm order");
//         router.replace("/order-error");
//         return;
//       }
//       const result = await response.json();
//       successToast(result.message || "Order placed successfully");

//       if (result.data) {
//         sessionStorage.setItem("orderSuccess", JSON.stringify(result.data));
//       }

//       clearCheckoutData();
//       clearOrderSummaries();
//       router.replace("/thank-you");
//     } catch (error) {
//       console.error("Error confirming order:", error);
//       errorToast("An error occurred while confirming order");
//     } finally {
//       setIsLoading(false);
//     }
//   };

//   const handleStageOrder = async () => {
//     setIsLoading(true);
//     const staged = await stageOrder();
//     if (!staged) return;

//     setStagedOrder(staged);

//     if (typeof window === "undefined") return;

//     const { usePaystackPayment } = await import("react-paystack");

//     const config = {
//       email: watchedCustomerInfo?.email || "",
//       amount: total * 100,
//       reference: staged.reference,
//       publicKey: process.env.NEXT_PUBLIC_PAYSTACK_PUBLIC_KEY!,
//       metadata: {
//         custom_fields: [
//           {
//             display_name: "Name",
//             variable_name: "name",
//             value: watchedCustomerInfo?.name || "",
//           },
//           {
//             display_name: "Phone",
//             variable_name: "phone",
//             value: watchedCustomerInfo?.phone || "",
//           },
//           {
//             display_name: "Address",
//             variable_name: "address",
//             value: watchedCustomerAddress
//               ? `${watchedCustomerAddress.streetAddress}, ${watchedCustomerAddress.lga}, ${watchedCustomerAddress.state}`
//               : "",
//           },
//           {
//             display_name: "Order Number",
//             variable_name: "orderNumber",
//             value: staged.orderNumber,
//           },
//         ],
//       },
//     };

//     const initializePayment = usePaystackPayment(config);

//     initializePayment({
//       onSuccess: async (ref: { reference: string }) => {
//         // 👇 Wait 2 seconds before confirming
//         await delay(3000);
//         await confirmOrder(ref.reference);
//       },
//       onClose: () => {
//         setIsLoading(false);
//         showPaymentCancelledModal();
//       },
//     });
//   };

//   // Effect to handle buyer info auto-fill
//   useEffect(() => {
//     if (buyerInfoData?.data && !buyerInfoError) {
//       const data = buyerInfoData.data;
//       if (data.streetAddress && data.state && data.lga) {
//         // Auto-fill the address fields
//         setValue("customerAddress.streetAddress", data.streetAddress);
//         setValue("customerAddress.state", data.state);
//         setValue("customerAddress.lga", data.lga);
//         if (data.directions) {
//           setValue("customerAddress.directions", data.directions);
//         }

//         // Update the store as well
//         setCustomerAddress({
//           streetAddress: data.streetAddress,
//           state: data.state,
//           lga: data.lga,
//           directions: data.directions || "",
//         });

//         // Set selected state to trigger LGA loading
//         setSelectedState(data.state);
//         // Load LGAs for the state
//         const lgas = getLgasForState(data.state);
//         setAvailableLgas(lgas);
//       }
//     }
//   }, [buyerInfoData, buyerInfoError, setValue, setCustomerAddress]);

//   // Effect to handle logistics pricing updates
//   useEffect(() => {
//     if (logisticsPricingData?.data && !logisticsPricingError) {
//       const price = logisticsPricingData.data.price;
//       if (price !== undefined) {
//         // Update the store with the fetched delivery fee
//         updateDeliveryFee(price);
//         // Store buyer coordinates if available
//       }
//     } else if (logisticsPricingError) {
//       console.error("Logistics pricing error:", logisticsPricingError);
//     }
//   }, [logisticsPricingData, logisticsPricingError, updateDeliveryFee]);

//   const handleBackNavigation = () => {
//     if (platform !== "store") {
//       // Navigate back to referring page
//       router.back();
//     }
//   };

//   // Effect to transform fetched products into orderSummaries when platform is "store"
//   useEffect(() => {
//     if (platform === "store" && productsData.length > 0 && !isProductsLoading) {
//       const transformedOrderSummaries = productsData
//         .filter(({ data, error }) => data && !error)
//         .map(({ item, data }) => {
//           const product = data.data || data; // Handle different API response structures
//           // Create ProductItem from fetched data
//           const productItem = {
//             id: product.id || item.pid,
//             name: product.name || product.title || "Unknown Product",
//             price: product.price || 0,
//             originalPrice: product.originalPrice || product.price || 0,
//             productId: product.originalId,
//             quantity: item.qty,
//             image: product.image || product.images?.[0] || "/placeholder.svg",

//             selectedColor: item.color,
//             size: item.variation
//               ? product.variations?.find((v: any) => v.id === item.variation)
//                   ?.size
//               : undefined,
//             variationId: item.variation,
//             variationName: item.variation
//               ? getVariationDisplayName(
//                   product.variations?.find((v: any) => v.id === item.variation)
//                 )
//               : undefined,
//             supplierId: product.supplierId || product.userId,
//           };

//           // Calculate subtotal and total
//           const subtotal = productItem.price * productItem.quantity;
//           const defaultDeliveryFee = 0;
//           const total = subtotal + defaultDeliveryFee;

//           return {
//             item: productItem,
//             subtotal,
//             total,
//             referralId: ref,
//             platform: platform,
//             pickupLocation: product.pickupLocation
//               ? {
//                   latitude: product.pickupLocation.latitude,
//                   longitude: product.pickupLocation.longitude,
//                 }
//               : undefined,
//             deliveryFee: defaultDeliveryFee,
//             deliveryLocations: product.deliveryLocations
//           };
//         });

//       // Update the store with transformed data
//       if (transformedOrderSummaries.length > 0) {
//         setOrderSummaries(transformedOrderSummaries);
//       }
//     }
//   }, [platform, productsData, isProductsLoading, ref, setOrderSummaries]);

//   // Initialize states and form data
//   useEffect(() => {
//     setIsClient(true);

//     // Initialize Nigerian states
//     try {
//       const statesData = NaijaStates.states();
//       if (Array.isArray(statesData)) {
//         const stateNames = statesData
//           .map((state: any) => {
//             return typeof state === "string"
//               ? state
//               : state.state || state.name;
//           })
//           .filter(Boolean);
//         setStates(stateNames);
//       }
//     } catch (error) {
//       console.error("Error fetching states:", error);
//       setStates([]);
//     }
//   }, []);

//   useEffect(() => {
//     if (!isClient) return;

//     // Only set form values if they don't already exist and store has values
//     const currentFormName = watch("customerInfo.name");
//     const currentFormEmail = watch("customerInfo.email");
//     const currentFormPhone = watch("customerInfo.phone");

//     // Prevent circular updates by checking if form is already populated
//     if (!currentFormName && checkoutData.customerInfo.name) {
//       setValue("customerInfo.name", checkoutData.customerInfo.name);
//     }
//     if (!currentFormEmail && checkoutData.customerInfo.email) {
//       setValue("customerInfo.email", checkoutData.customerInfo.email);
//     }
//     if (!currentFormPhone && checkoutData.customerInfo.phone) {
//       setValue("customerInfo.phone", checkoutData.customerInfo.phone);
//     }

//     // Address fields
//     const currentStreetAddress = watch("customerAddress.streetAddress");
//     const currentState = watch("customerAddress.state");
//     const currentLga = watch("customerAddress.lga");

//     if (!currentStreetAddress && checkoutData.customerAddress.streetAddress) {
//       setValue(
//         "customerAddress.streetAddress",
//         checkoutData.customerAddress.streetAddress
//       );
//     }
//     if (!currentState && checkoutData.customerAddress.state) {
//       setValue("customerAddress.state", checkoutData.customerAddress.state);
//     }
//     if (!currentLga && checkoutData.customerAddress.lga) {
//       setValue("customerAddress.lga", checkoutData.customerAddress.lga);
//     }
//     if (checkoutData.customerAddress.directions) {
//       setValue(
//         "customerAddress.directions",
//         checkoutData.customerAddress.directions
//       );
//     }
//   }, [isClient, setValue]);

//   // Watch state changes to update LGAs
//   useEffect(() => {
//     if (watchedState && watchedState !== selectedState) {
//       setSelectedState(watchedState);
//       const lgas = getLgasForState(watchedState);
//       setAvailableLgas(lgas);
//       // Update the state in the store
//       setCustomerAddress({ state: watchedState });
//     }
//   }, [watchedState, selectedState, setValue]);

//   // Watch form values for real-time validation and store updates
//   const watchedCustomerInfo = watch("customerInfo");
//   const watchedCustomerAddress = watch("customerAddress");

//   useEffect(() => {
//     if (!watchedCustomerInfo || !isClient) return;

//     // Only update store if values actually changed
//     const currentStoreInfo = checkoutData.customerInfo;
//     const hasChanged =
//       currentStoreInfo.name !== watchedCustomerInfo.name ||
//       currentStoreInfo.email !== watchedCustomerInfo.email ||
//       currentStoreInfo.phone !== watchedCustomerInfo.phone;

//     if (hasChanged) {
//       // Debounce the update to prevent rapid fires
//       const timeoutId = setTimeout(() => {
//         setCustomerInfo(watchedCustomerInfo);
//       }, 100);

//       return () => clearTimeout(timeoutId);
//     }
//   }, [
//     watchedCustomerInfo,
//     setCustomerInfo,
//     isClient,
//     checkoutData.customerInfo,
//   ]);

//   useEffect(() => {
//     if (!watchedCustomerAddress || !isClient) return;

//     const currentStoreAddress = checkoutData.customerAddress;
//     const hasChanged =
//       currentStoreAddress.streetAddress !==
//         watchedCustomerAddress.streetAddress ||
//       currentStoreAddress.state !== watchedCustomerAddress.state ||
//       currentStoreAddress.lga !== watchedCustomerAddress.lga ||
//       currentStoreAddress.directions !== watchedCustomerAddress.directions;

//     if (hasChanged) {
//       const timeoutId = setTimeout(() => {
//         setCustomerAddress(watchedCustomerAddress);
//       }, 100);

//       return () => clearTimeout(timeoutId);
//     }
//   }, [
//     watchedCustomerAddress,
//     setCustomerAddress,
//     isClient,
//     checkoutData.customerAddress,
//   ]);

//   // Clear errors when fields become valid
//   useEffect(() => {
//     const validateField = async (fieldName: any, value: any) => {
//       if (value && value.trim() !== "") {
//         const isFieldValid = await trigger(fieldName);
//         if (isFieldValid) {
//           clearErrors(fieldName);
//         }
//       }
//     };

//     // Validate customer info fields
//     if (watchedCustomerInfo?.name) {
//       validateField("customerInfo.name", watchedCustomerInfo.name);
//     }
//     if (watchedCustomerInfo?.email) {
//       validateField("customerInfo.email", watchedCustomerInfo.email);
//     }
//     if (watchedCustomerInfo?.phone) {
//       validateField("customerInfo.phone", watchedCustomerInfo.phone);
//     }

//     // Validate address fields
//     if (watchedCustomerAddress?.streetAddress) {
//       validateField(
//         "customerAddress.streetAddress",
//         watchedCustomerAddress.streetAddress
//       );
//     }
//     if (watchedCustomerAddress?.state) {
//       validateField("customerAddress.state", watchedCustomerAddress.state);
//     }
//     if (watchedCustomerAddress?.lga) {
//       validateField("customerAddress.lga", watchedCustomerAddress.lga);
//     }
//   }, [watchedCustomerInfo, watchedCustomerAddress, trigger, clearErrors]);

//   const continueToReview = async () => {
//     // Check if terminal is selected when delivery type is terminal
//     if (deliveryType === "terminal" && !selectedTerminal) {
//       setShowTerminalAlert(true);
//       return;
//     }

//     // For terminal delivery, validate customer info and check delivery fee
//     if (deliveryType === "terminal") {
//       const customerInfoValid = await trigger([
//         "customerInfo.name",
//         "customerInfo.email",
//         "customerInfo.phone",
//       ]);
//       const stateValid = await trigger("customerAddress.state");

//       if (customerInfoValid && stateValid) {
//         setCurrentStep("review");
//         if (orderSummaries.length > 0) {
//           orderSummaries.forEach((orderSummary) => {
//             mutate(
//               `/public/products/${orderSummary.item.id}${orderSummary.referralId}`
//             );
//           });
//         }
//       } else {
//         const firstError = document.querySelector(".border-red-500");
//         if (firstError) {
//           firstError.scrollIntoView({ behavior: "smooth", block: "center" });
//         }
//       }
//       return;
//     }

//     // For home delivery, validate all fields and check delivery fee
//     const isFormValid = await trigger();

//     // Check if delivery fee is available for home delivery
//     if (deliveryFee === null) {
//       errorToast(
//         "Please wait for delivery fee calculation to complete before proceeding."
//       );
//       return;
//     }

//     if (isFormValid) {
//       setCurrentStep("review");
//       if (orderSummaries.length > 0) {
//         orderSummaries.forEach((orderSummary) => {
//           mutate(
//             `/public/products/${orderSummary.item.id}${orderSummary.referralId}`
//           );
//         });
//       }
//     } else {
//       const firstError = document.querySelector(".border-red-500");
//       if (firstError) {
//         firstError.scrollIntoView({ behavior: "smooth", block: "center" });
//       }
//     }
//   };

//   const showPaymentCancelledModal = () => {
//     // You could use a toast library or custom modal
//     setShowCancelledModal(true);
//   };

//   const formatPrice = (price?: string | number) => {
//     return `₦${price?.toLocaleString()}`;
//   };

//   const goToNextStep = async () => {
//     if (currentStep === "delivery") {
//       // Trigger validation for all fields
//       const isFormValid = await trigger();
//       if (isFormValid) {
//         setCurrentStep("review");
//       } else {
//         // Optionally scroll to the first error
//         const firstError = document.querySelector(".border-red-500");
//         if (firstError) {
//           firstError.scrollIntoView({ behavior: "smooth", block: "center" });
//         }
//       }
//     }
//   };

//   const goToPreviousStep = () => {
//     if (currentStep === "review") setCurrentStep("delivery");
//   };

//   // Handle delivery instructions change
//   const handleDeliveryInstructionsChange = (instructions: string) => {
//     setDeliveryInstructions(instructions);
//   };

//   const renderPlaceOrderButton = () => (
//     <Button
//       onClick={handleStageOrder}
//       className="flex-1 bg-primary text-primary-foreground hover:bg-primary/90 h-10 px-4 py-2 rounded-md font-medium transition-colors"
//       disabled={isLoading}
//     >
//       {isLoading ? "Processing..." : "Place Order"}
//     </Button>
//   );

//   return (
//     <div className="flex flex-col min-h-screen pb-16 md:pb-0">
//       {platform !== "store" && (
//         <div className="sticky top-0 z-20 flex items-center p-4 bg-background/80 backdrop-blur-md border-b">
//           <Button
//             variant="ghost"
//             size="sm"
//             onClick={handleBackNavigation}
//             className="flex items-center gap-2"
//           >
//             <ArrowLeft className="w-4 h-4" />
//             Back
//           </Button>
//         </div>
//       )}

//       {/* Loading state for store platform */}
//       {platform === "store" && isProductsLoading && (
//         <div className="container mx-auto px-4 py-8 max-w-7xl">
//           <div className="flex items-center justify-center min-h-[400px]">
//             <div className="text-center">
//               <Loader2 className="h-8 w-8 animate-spin mx-auto mb-4" />
//               <p className="text-muted-foreground">Loading products...</p>
//             </div>
//           </div>
//         </div>
//       )}

//       {/* Error state for store platform */}
//       {platform === "store" && productFetchError && !isProductsLoading && (
//         <div className="container mx-auto px-4 py-8 max-w-7xl">
//           <Alert className="max-w-md mx-auto">
//             <AlertDescription>
//               Failed to load products. Please try refreshing the page.
//             </AlertDescription>
//           </Alert>
//         </div>
//       )}

//       {/* Main content - only show when not loading or when not store platform */}
//       {(platform !== "store" || (!isProductsLoading && !productFetchError)) && (
//         <div className="container mx-auto px-4 py-4 md:py-8 max-w-7xl">
//           <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 lg:gap-8">
//             <div className="lg:col-span-2">
//               {currentStep === "delivery" && (
//                 <Card>
//                   <CardContent className="p-4 md:p-6">
//                     <h2 className="text-xl font-semibold mb-4">
//                       Delivery Information
//                     </h2>
//                     <div className="space-y-6">
//                       {/* Customer Information */}
//                       <div>
//                         <div className="flex items-center justify-between mb-3">
//                           <h3 className="font-medium">Customer Information</h3>
//                         </div>
//                         <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
//                           <div className="space-y-2">
//                             <Label htmlFor="customerName">
//                               Full Name <span className="text-red-500">*</span>
//                             </Label>
//                             <Input
//                               id="customerName"
//                               {...register("customerInfo.name", {
//                                 onChange: async (e) => {
//                                   const value = e.target.value;
//                                   setCustomerInfo({ name: value });
//                                   if (value && errors.customerInfo?.name) {
//                                     const isValid = await trigger(
//                                       "customerInfo.name"
//                                     );
//                                     if (isValid)
//                                       clearErrors("customerInfo.name");
//                                   }
//                                 },
//                               })}
//                               placeholder="Enter your full name"
//                               className={
//                                 errors.customerInfo?.name
//                                   ? "border-red-500"
//                                   : ""
//                               }
//                             />
//                             {errors.customerInfo?.name && (
//                               <p className="text-sm text-red-600">
//                                 {errors.customerInfo.name.message}
//                               </p>
//                             )}
//                           </div>
//                           <div className="space-y-2">
//                             <Label htmlFor="customerEmail">
//                               Email Address{" "}
//                               <span className="text-red-500">*</span>
//                             </Label>
//                             <Input
//                               id="customerEmail"
//                               type="email"
//                               {...register("customerInfo.email", {
//                                 onChange: async (e) => {
//                                   const value = e.target.value;
//                                   setCustomerInfo({ email: value });
//                                   if (value && errors.customerInfo?.email) {
//                                     const isValid = await trigger(
//                                       "customerInfo.email"
//                                     );
//                                     if (isValid)
//                                       clearErrors("customerInfo.email");
//                                   }
//                                 },
//                               })}
//                               placeholder="Enter your email address"
//                               className={
//                                 errors.customerInfo?.email
//                                   ? "border-red-500"
//                                   : ""
//                               }
//                             />
//                             {errors.customerInfo?.email && (
//                               <p className="text-sm text-red-600">
//                                 {errors.customerInfo.email.message}
//                               </p>
//                             )}
//                           </div>
//                           <div className="space-y-2 md:col-span-2">
//                             <Label htmlFor="customerPhone">
//                               Phone Number{" "}
//                               <span className="text-red-500">*</span>
//                             </Label>
//                             <Input
//                               id="customerPhone"
//                               {...register("customerInfo.phone", {
//                                 onChange: async (e) => {
//                                   const value = e.target.value;
//                                   setCustomerInfo({ phone: value });
//                                   if (value && errors.customerInfo?.phone) {
//                                     const isValid = await trigger(
//                                       "customerInfo.phone"
//                                     );
//                                     if (isValid)
//                                       clearErrors("customerInfo.phone");
//                                   }
//                                 },
//                               })}
//                               placeholder="Enter your phone number"
//                               className={
//                                 errors.customerInfo?.phone
//                                   ? "border-red-500"
//                                   : ""
//                               }
//                             />
//                             {errors.customerInfo?.phone && (
//                               <p className="text-sm text-red-600">
//                                 {errors.customerInfo.phone.message}
//                               </p>
//                             )}
//                           </div>
//                         </div>
//                       </div>

//                       <Separator />

//                       {/* Delivery Address */}
//                       <div>
//                         <h3 className="font-medium mb-3">Delivery Address</h3>

//                         <div className="space-y-4">
//                           {/* State Selection - Always shown first */}
//                           <div className="space-y-2">
//                             <Label htmlFor="state">
//                               State <span className="text-red-500">*</span>
//                             </Label>
//                             <Controller
//                               name="customerAddress.state"
//                               control={control}
//                               render={({ field }) => (
//                                 <Select
//                                   value={field.value}
//                                   onValueChange={async (value) => {
//                                     field.onChange(value);
//                                     setCustomerAddress({ state: value });
//                                     // Reset delivery type and terminal selection when state changes
//                                     setDeliveryType("terminal");
//                                     setSelectedTerminal("");
//                                     if (
//                                       value &&
//                                       errors.customerAddress?.state
//                                     ) {
//                                       const isValid = await trigger(
//                                         "customerAddress.state"
//                                       );
//                                       if (isValid)
//                                         clearErrors("customerAddress.state");
//                                     }
//                                   }}
//                                 >
//                                   <SelectTrigger
//                                     id="state"
//                                     className={
//                                       errors.customerAddress?.state
//                                         ? "border-red-500"
//                                         : ""
//                                     }
//                                   >
//                                     <SelectValue placeholder="Select a state" />
//                                   </SelectTrigger>
//                                   <SelectContent>
//                                     {states.map((state) => (
//                                       <SelectItem key={state} value={state}>
//                                         {state}
//                                       </SelectItem>
//                                     ))}
//                                   </SelectContent>
//                                 </Select>
//                               )}
//                             />
//                             {errors.customerAddress?.state && (
//                               <p className="text-sm text-red-600">
//                                 {errors.customerAddress.state.message}
//                               </p>
//                             )}
//                           </div>

//                           {/* LGA Selection */}

//                           <div className="space-y-2">
//                             <Label htmlFor="lga">
//                               Local Government Area{" "}
//                               <span className="text-red-500">*</span>
//                             </Label>
//                             <Controller
//                               name="customerAddress.lga"
//                               control={control}
//                               render={({ field }) => (
//                                 <Select
//                                   value={field.value}
//                                   onValueChange={async (value) => {
//                                     field.onChange(value);
//                                     setCustomerAddress({ lga: value });
//                                     if (value && errors.customerAddress?.lga) {
//                                       const isValid = await trigger(
//                                         "customerAddress.lga"
//                                       );
//                                       if (isValid)
//                                         clearErrors("customerAddress.lga");
//                                     }
//                                   }}
//                                   disabled={
//                                     !selectedState || availableLgas.length === 0
//                                   }
//                                 >
//                                   <SelectTrigger
//                                     id="lga"
//                                     className={
//                                       errors.customerAddress?.lga
//                                         ? "border-red-500"
//                                         : ""
//                                     }
//                                   >
//                                     <SelectValue
//                                       placeholder={
//                                         selectedState
//                                           ? "Select a Local Government Area"
//                                           : "Please select a state first"
//                                       }
//                                     />
//                                   </SelectTrigger>
//                                   <SelectContent>
//                                     {availableLgas.map((lga) => (
//                                       <SelectItem key={lga} value={lga}>
//                                         {lga}
//                                       </SelectItem>
//                                     ))}
//                                   </SelectContent>
//                                 </Select>
//                               )}
//                             />
//                             {errors.customerAddress?.lga && (
//                               <p className="text-sm text-red-600">
//                                 {errors.customerAddress.lga.message}
//                               </p>
//                             )}
//                           </div>

//                           <div className="space-y-2">
//                             <Label htmlFor="streetAddress">
//                               Street Address{" "}
//                               <span className="text-red-500">*</span>
//                             </Label>
//                             <Textarea
//                               id="streetAddress"
//                               {...register("customerAddress.streetAddress", {
//                                 onChange: async (e) => {
//                                   const value = e.target.value;
//                                   setCustomerAddress({
//                                     streetAddress: value,
//                                   });
//                                   if (
//                                     value &&
//                                     errors.customerAddress?.streetAddress
//                                   ) {
//                                     const isValid = await trigger(
//                                       "customerAddress.streetAddress"
//                                     );
//                                     if (isValid)
//                                       clearErrors(
//                                         "customerAddress.streetAddress"
//                                       );
//                                   }
//                                 },
//                               })}
//                               rows={3}
//                               className={
//                                 errors.customerAddress?.streetAddress
//                                   ? "border-red-500"
//                                   : ""
//                               }
//                               placeholder="Enter your full street address including house number, street name, area, and nearby landmarks for accurate delivery"
//                             />
//                             {errors.customerAddress?.streetAddress && (
//                               <p className="text-sm text-red-600">
//                                 {errors.customerAddress.streetAddress.message}
//                               </p>
//                             )}
//                           </div>

//                           <div className="space-y-2">
//                             <Label htmlFor="directions">
//                               Additional Directions{" "}
//                               <span className="text-gray-500">(Optional)</span>
//                             </Label>
//                             <Textarea
//                               id="directions"
//                               {...register("customerAddress.directions", {
//                                 onChange: (e) => {
//                                   const value = e.target.value;
//                                   setCustomerAddress({
//                                     directions: value,
//                                   });
//                                 },
//                               })}
//                               rows={3}
//                               className={
//                                 errors.customerAddress?.directions
//                                   ? "border-red-500"
//                                   : ""
//                               }
//                               placeholder="Additional directions to help locate your address (e.g., 'Opposite First Bank', 'Blue gate with security post', 'Third floor, Apartment 3B')"
//                             />
//                             {errors.customerAddress?.directions && (
//                               <p className="text-sm text-red-600">
//                                 {errors.customerAddress.directions.message}
//                               </p>
//                             )}
//                           </div>
//                         </div>
//                       </div>

//                       <Separator />

//                       <div>
//                         <h3 className="font-medium mb-3">Payment Method</h3>
//                         <div className="flex items-center space-x-2 p-3 border rounded-md bg-muted/50">
//                           <CreditCard className="h-4 w-4 mr-2 text-muted-foreground flex-shrink-0" />
//                           <div className="min-w-0">
//                             <span className="font-medium block">
//                               Card, Bank Transfer and Mobile Money
//                             </span>
//                             <p className="text-xs text-muted-foreground">
//                               Secure payment processing
//                             </p>
//                           </div>
//                         </div>
//                       </div>

//                       <Separator />

//                       <div>
//                         <h3 className="font-medium mb-3">
//                           Delivery Instructions (Optional)
//                         </h3>
//                         <Textarea
//                           placeholder="Add any special instructions for delivery..."
//                           className="resize-none"
//                           value={checkoutData.deliveryInstructions}
//                           onChange={(e) =>
//                             handleDeliveryInstructionsChange(e.target.value)
//                           }
//                         />
//                       </div>
//                     </div>
//                     <div className="mt-6">
//                       <Button className="w-full" onClick={continueToReview}>
//                         Continue to Review
//                       </Button>
//                     </div>
//                   </CardContent>
//                 </Card>
//               )}

//               {currentStep === "review" && (
//                 <Card>
//                   <CardContent className="p-4 md:p-6">
//                     <h2 className="text-xl font-semibold mb-4">
//                       Review Your Order
//                     </h2>
//                     <div className="space-y-6">
//                       <div>
//                         <h3 className="font-medium mb-3">
//                           Items in Your Order
//                         </h3>
//                         <div className="space-y-4 max-h-64 overflow-y-auto pr-2">
//                           {cartItems?.map((item) => (
//                             <div
//                               key={item.id}
//                               className="flex items-start space-x-3"
//                             >
//                               <div className="w-16 h-16 relative rounded-md overflow-hidden flex-shrink-0 bg-muted">
//                                 <Image
//                                   src={item.image || "/placeholder.svg"}
//                                   alt={item.name}
//                                   fill
//                                   className="object-cover"
//                                 />
//                               </div>
//                               <div className="flex-1 min-w-0">
//                                 <h4 className="font-medium text-sm">
//                                   <span className="capitalize">
//                                     {item.name}
//                                   </span>
//                                   {item.variationName && (
//                                     <span className="text-muted-foreground ml-2">
//                                       ({item.variationName})
//                                     </span>
//                                   )}
//                                 </h4>
//                                 <div className="flex justify-between mt-1">
//                                   <span className="text-sm">
//                                     {item.quantity} x {formatPrice(item.price)}
//                                   </span>
//                                   <span className="text-sm font-medium">
//                                     {formatPrice(item.price * item.quantity)}
//                                   </span>
//                                 </div>
//                               </div>
//                             </div>
//                           ))}
//                         </div>
//                       </div>

//                       <Separator />

//                       <div>
//                         <h3 className="font-medium mb-3">
//                           Delivery Information
//                         </h3>
//                         <div className="flex items-start space-x-2">
//                           <MapPin className="h-5 w-5 text-muted-foreground mt-0.5 flex-shrink-0" />
//                           <div className="flex-1 min-w-0">
//                             <p className="text-sm">
//                               {checkoutData.customerInfo.name ||
//                                 "Customer Name"}
//                               <br />
//                               {checkoutData.customerAddress.streetAddress ||
//                                 "Street Address"}
//                               <br />
//                               {checkoutData.customerAddress.directions && (
//                                 <span className="text-muted-foreground">
//                                   Directions:{" "}
//                                   {checkoutData.customerAddress.directions}
//                                 </span>
//                               )}
//                               <br />
//                               {checkoutData.customerAddress.lga},{" "}
//                               {checkoutData.customerAddress.state}
//                               <br />
//                               {checkoutData.customerInfo.phone ||
//                                 "Phone Number"}
//                             </p>
//                           </div>
//                         </div>
//                       </div>

//                       <Separator />

//                       <div>
//                         <h3 className="font-medium mb-3">Payment Method</h3>
//                         <div className="flex items-center">
//                           <CreditCard className="h-5 w-5 text-muted-foreground mr-2 flex-shrink-0" />
//                           <span className="text-sm">
//                             Card, Bank Transfer and Mobile Money
//                           </span>
//                         </div>
//                       </div>
//                     </div>
//                     <div className="mt-6 flex flex-col sm:flex-row space-y-3 sm:space-y-0 sm:space-x-3">
//                       <Button
//                         variant="outline"
//                         className="flex-1 bg-transparent"
//                         onClick={goToPreviousStep}
//                       >
//                         Back
//                       </Button>
//                       {renderPlaceOrderButton()}
//                     </div>
//                   </CardContent>
//                 </Card>
//               )}
//             </div>

//             <div className="lg:col-span-1">
//               <div className="sticky top-20">
//                 <Card>
//                   <CardContent className="p-4 md:p-6">
//                     <h3 className="font-semibold text-lg mb-4">
//                       Order Summary
//                     </h3>
//                     <div className="space-y-3 mb-6">
//                       <div className="flex justify-between">
//                         <span className="text-muted-foreground text-sm">
//                           Subtotal
//                         </span>
//                         <span className="text-sm">
//                           {formatPrice(subtotal!)}
//                         </span>
//                       </div>
//                       <div className="flex justify-between items-center">
//                         <span className="text-muted-foreground text-sm">
//                           Delivery Fee
//                         </span>
//                       </div>

//                       <Separator className="my-4" />
//                       <div className="flex justify-between font-bold">
//                         <span>Total</span>
//                         <span>{formatPrice(total)}</span>
//                       </div>
//                     </div>
//                     <div className="space-y-4">
//                       <div className="flex items-start space-x-2">
//                         <p className="text-xs text-muted-foreground">
//                           By continuing I agree to the{" "}
//                           <a
//                             href="/terms"
//                             className="text-primary hover:underline"
//                           >
//                             Terms of Service
//                           </a>{" "}
//                           and{" "}
//                           <a
//                             href="/privacy"
//                             className="text-primary hover:underline"
//                           >
//                             Privacy Policy
//                           </a>
//                         </p>
//                       </div>
//                     </div>
//                     <div className="mt-6 text-center">
//                       <p className="text-xs text-muted-foreground">
//                         Need help?{" "}
//                         <a href="/help" className="text-primary">
//                           Contact Support
//                         </a>
//                       </p>
//                     </div>
//                   </CardContent>
//                 </Card>

               
//               </div>
//             </div>
//           </div>
//         </div>
//       )}

//       <AlertDialog open={showTerminalAlert} onOpenChange={setShowTerminalAlert}>
//         <AlertDialogContent>
//           <AlertDialogHeader>
//             <AlertDialogTitle>Delivery location Required</AlertDialogTitle>
//             <AlertDialogDescription>
//               Please select a delivery location before proceeding to
//               review your order.
//             </AlertDialogDescription>
//           </AlertDialogHeader>
//           <AlertDialogFooter>
//             <AlertDialogAction onClick={() => setShowTerminalAlert(false)}>
//               OK
//             </AlertDialogAction>
//           </AlertDialogFooter>
//         </AlertDialogContent>
//       </AlertDialog>

//       <AlertDialog
//         open={showCancelledModal}
//         onOpenChange={setShowCancelledModal}
//       >
//         <AlertDialogContent>
//           <AlertDialogHeader>
//             <AlertDialogTitle>Don't miss out!</AlertDialogTitle>
//             <AlertDialogDescription>
//               Your items are still waiting for you. Complete your purchase now
//             </AlertDialogDescription>
//           </AlertDialogHeader>
//           <AlertDialogFooter>
//             <AlertDialogCancel>Maybe Later</AlertDialogCancel>
//             <AlertDialogAction
//               onClick={() => {
//                 setShowCancelledModal(false);
//                 // Add your place order logic here
//               }}
//             >
//               {renderPlaceOrderButton()}
//             </AlertDialogAction>
//           </AlertDialogFooter>
//         </AlertDialogContent>
//       </AlertDialog>
//     </div>
//   );
// }










































"use client";
import { useState, useEffect, useMemo } from "react";
import Image from "next/image";
import { useRouter, useSearchParams } from "next/navigation";
import { CreditCard, MapPin, ArrowLeft, Loader2, Info, Clock, Truck } from "lucide-react";
import useSWR, { mutate } from "swr";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { useFormResolver } from "@/hooks/useFormResolver";
import { Controller } from "react-hook-form";
import NaijaStates from "naija-state-local-government";
import { getLgasForState } from "@/lib/utils";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { deliveryFormSchema } from "@/zod/schema";
import { useCheckoutStore } from "@/hooks/checkout-store";
import { errorToast, successToast } from "@/components/ui/use-toast-advanced";
import { getVariationDisplayName, parseCheckoutUrl } from "@/lib/url-parser";
import { useProductFetching } from "@/hooks/use-product-fetcher";
import { useProductStore } from "@/hooks/product-store";
import { terminalAddresses, TerminalPickupPrices } from "../constant";

// Add these type definitions after imports
interface OrderItem {
  id: string;
  name: string;
  price: number;
  originalPrice: number;
  productId: string;
  quantity: number;
  image: string;
  selectedColor?: string;
  size?: string;
  variationId?: string;
  variationName?: string;
  supplierId: string;
}

interface DeliveryLocation {
  id: string;
  state: string;
  lgas: string[];
  fee: number;
  duration: string;
}

interface OrderSummary {
  item: OrderItem;
  subtotal: number;
  total: number;
  referralId: string;
  platform: string;
  pickupLocation?: {
    latitude: number;
    longitude: number;
  };
  deliveryFee: number;
  deliveryLocations: DeliveryLocation[];
}

interface SupplierGroup {
  supplierId: string;
  items: OrderSummary[];
  deliveryLocations: DeliveryLocation[];
  selectedDeliveryLocation: string | null;
}

// Replace the groupOrdersBySupplier function
const groupOrdersBySupplier = (orderSummaries: OrderSummary[]): SupplierGroup[] => {
  const grouped = orderSummaries.reduce((acc, summary) => {
    const supplierId = summary.item.supplierId;
    if (!acc[supplierId]) {
      acc[supplierId] = {
        supplierId,
        items: [],
        deliveryLocations: summary.deliveryLocations || [],
        selectedDeliveryLocation: null,
      };
    }
    acc[supplierId].items.push(summary);
    return acc;
  }, {} as Record<string, SupplierGroup>);
  
  return Object.values(grouped);
};

// SWR fetcher function
const fetcher = async (url: string) => {
  const response = await fetch(url);
  if (!response.ok) {
    throw new Error(`HTTP error! status: ${response.status}`);
  }
  return response.json();
};

// SWR configuration options
const swrOptions = {
  revalidateOnFocus: false,
  revalidateOnReconnect: true,
  refreshInterval: 0,
  dedupingInterval: 5000,
  errorRetryCount: 0,
};

// Specific SWR options for logistics pricing (more frequent updates)
const logisticsPricingOptions = {
  ...swrOptions,
  refreshInterval: 600000,
  revalidateOnFocus: false,
  dedupingInterval: 600000,
};

// SWR options for buyer info (cached longer)
const buyerInfoOptions = {
  ...swrOptions,
  dedupingInterval: 10000,
  refreshInterval: 0,
};

export default function CheckoutPage() {
  // Replace local state with Zustand store
  const {
    checkoutData,
    setCustomerInfo,
    setCustomerAddress,
    setDeliveryInstructions,
    setCurrentStep,
    clearCheckoutData,
    setDeliveryMethod,
    setTerminalAddress,
  } = useCheckoutStore();

  // Local state for UI-specific needs
  const [isClient, setIsClient] = useState(false);
  const [selectedState, setSelectedState] = useState<string>("");
  const [availableLgas, setAvailableLgas] = useState<string[]>([]);
  const [states, setStates] = useState<string[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [showCancelledModal, setShowCancelledModal] = useState(false);
  const [deliveryType, setDeliveryType] = useState<"terminal" | "home">(
    "terminal"
  );
  // Add this state near your other useState declarations
  const [showAllLgasModal, setShowAllLgasModal] = useState(false);
  const [selectedLocationForLgas, setSelectedLocationForLgas] =
    useState<DeliveryLocation | null>(null);
  const [supplierDeliverySelections, setSupplierDeliverySelections] = useState<
    Record<string, string>
  >({});
  const [selectedTerminal, setSelectedTerminal] = useState("");
  const [showTerminalAlert, setShowTerminalAlert] = useState(false);
  const [selectedDeliveryLocation, setSelectedDeliveryLocation] = useState("");
  const [showDeliveryLocationAlert, setShowDeliveryLocationAlert] =
    useState(false);
  const router = useRouter();
  const [stagedOrder, setStagedOrder] = useState<null | {
    reference: string;
    orderNumber: string;
  }>(null);

  // Get values from store
  const currentStep = checkoutData.currentStep;

  // Form resolver for customer info and address
  const {
    form: {
      register,
      submit,
      control,
      errors,
      watch,
      setValue,
      trigger,
      clearErrors,
      formState: { isValid },
    },
  } = useFormResolver(async (data) => {
    // Update store with form data
    setCustomerInfo(data.customerInfo);
    setCustomerAddress(data.customerAddress);
    setDeliveryMethod(deliveryType);
    if (deliveryType === "terminal" && selectedTerminal) {
      setTerminalAddress(selectedTerminal);
    }
    return data;
  }, deliveryFormSchema);

  const searchParams = useSearchParams();

  // Parse URL parameters
  const parsedUrl = useMemo(() => {
    return parseCheckoutUrl(searchParams);
  }, [searchParams]);

  const { items, ref, platform } = parsedUrl;

  // Fetch products when platform is "store"
  const {
    productsData,
    error: productFetchError,
    isLoading: isProductsLoading,
  } = useProductFetching(items, ref, platform, true);

  console.log("checkoutProductsData", productsData);

  const {
    orderSummaries,
    setOrderSummaries,
    clearOrderSummaries,
    updateDeliveryFee,
  } = useProductStore();

  // Get cart items from orderSummaries (works for both store and non-store platforms)
  const cartItems = useMemo(() => {
    if (platform === "store") {
      return orderSummaries.map((summary) => summary.item);
    }
    // Fallback for non-store platforms (existing logic)
    return orderSummaries.map((summary) => summary.item) || [];
  }, [platform, orderSummaries]);

  // // Calculate subtotal from orderSummaries or fallback
  // const subtotal = useMemo(() => {
  //   if (platform === "store") {
  //     return orderSummaries.reduce((sum, summary) => sum + summary.subtotal, 0);
  //   }
  //   // Fallback for non-store platforms
  //   return (
  //     orderSummaries?.reduce(
  //       (sum, summary) => sum + summary.item.price * summary.item.quantity,
  //       0
  //     ) || 0
  //   );
  // }, [platform, orderSummaries]);

  const supplierGroups = useMemo(() => {
    return groupOrdersBySupplier(orderSummaries);
  }, [orderSummaries]);

  const hasMultipleSuppliers = supplierGroups.length > 1;

  const subtotal = useMemo(() => {
    return supplierGroups.reduce((sum, group) => {
      // Only include items that have a delivery location selected
      const hasDeliverySelected = supplierDeliverySelections[group.supplierId];
      if (!hasDeliverySelected && group.deliveryLocations.length > 0) {
        return sum; // Don't include this group's items
      }

      const groupSubtotal = group.items.reduce(
        (groupSum: number, summary: any) => {
          return groupSum + summary.subtotal;
        },
        0
      );

      return sum + groupSubtotal;
    }, 0);
  }, [supplierGroups, supplierDeliverySelections]);

  // Add after the cartItems useMemo

  // Watch address fields for SWR key generation
  const watchedState = watch("customerAddress.state");
  const watchedLga = watch("customerAddress.lga");
  const watchedStreetAddress = watch("customerAddress.streetAddress");
  const watchedName = watch("customerInfo.name");
  const watchedEmail = watch("customerInfo.email");
  const watchedPhone = watch("customerInfo.phone");

  const availableDeliveryLocations = useMemo(() => {
    if (!orderSummaries.length) return [];
    return orderSummaries[0]?.deliveryLocations || [];
  }, [orderSummaries]);

  // SWR for buyer info fetching
  const buyerInfoKey =
    watchedName &&
    watchedEmail &&
    deliveryType === "home" &&
    watchedPhone &&
    watchedName.trim().length >= 2 &&
    /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(watchedEmail) &&
    /^(\+?234|0)[\d]{10}$/.test(watchedPhone)
      ? `/api/orders/buyer-info?buyerName=${encodeURIComponent(
          watchedName.trim()
        )}&buyerEmail=${encodeURIComponent(
          watchedEmail.trim()
        )}&buyerPhone=${encodeURIComponent(watchedPhone.trim())}`
      : null;

  const { data: buyerInfoData, error: buyerInfoError } = useSWR(
    buyerInfoKey,
    fetcher,
    buyerInfoOptions
  );

  // Add this helper function before the return statement
  const getDeliveryLocationDisplay = (location: any) => {
    const allStateLgas = getLgasForState(location.state);

    // Check if all LGAs in the state are covered
    const coversAllLgas =
      allStateLgas.length > 0 &&
      allStateLgas.every((lga: string) => location.lgas.includes(lga));

    if (coversAllLgas) {
      return `All ${location.state}`;
    }

    // If less than or equal to 20 LGAs, show all
    if (location.lgas.length <= 20) {
      return location.lgas.join(", ");
    }

    // If more than 3, show first 3 with "show more" functionality
    return {
      preview: location.lgas.slice(0, 20).join(", "),
      remaining: location.lgas.length - 20,
    };
  };

  // Calculate delivery fee based on selected delivery location
  // const getDeliveryFee = () => {
  //   // If a delivery location is selected, use its fee
  //   if (selectedDeliveryLocation && availableDeliveryLocations.length > 0) {
  //     const selectedLocation = availableDeliveryLocations.find(
  //       (loc: any) => loc.id === selectedDeliveryLocation
  //     );
  //     if (selectedLocation) {
  //       return selectedLocation.fee;
  //     }
  //   }

  // };

  // Replace the getDeliveryFee function
  const getDeliveryFee = () => {
    let totalFee = 0;

    supplierGroups.forEach((group) => {
      const selectedLocationId = supplierDeliverySelections[group.supplierId];
      if (selectedLocationId && group.deliveryLocations.length > 0) {
        const selectedLocation = group.deliveryLocations.find(
          (loc: any) => loc.id === selectedLocationId
        );
        if (selectedLocation) {
          totalFee += selectedLocation.fee;
        }
      }
    });

    return totalFee;
  };

  // Update subtotal to exclude items without delivery selection

  const deliveryFee = getDeliveryFee();
  const total = subtotal + (deliveryFee || 0);

  const formatOrderItems = () => {
    if (!orderSummaries.length) return [];
    return orderSummaries.flatMap((summary) => ({
      productId: summary.item.productId,
      quantity: summary.item.quantity,
      supplierPrice: summary.item.originalPrice,
      plugPrice: summary.item.price,
      productName: summary.item.name,
      supplierId: summary.item.supplierId,
      ...(summary.item.variationId && {
        variantId: summary.item.variationId,
        variantColor: summary.item.selectedColor,
        variantSize: summary.item.size,
      }),
      // For non-variation items, use product-level color and size
      ...(!summary.item.variationId && {
        productColor: summary.item.selectedColor,
        productSize: summary.item.size,
      }),
    }));
  };

  const stageOrder = async () => {
    try {
      console.log("formatOrderItems", formatOrderItems);
      const response = await fetch("/api/orders/stage-order", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          buyerName: checkoutData.customerInfo.name,
          buyerEmail: checkoutData.customerInfo.email,
          buyerPhone: checkoutData.customerInfo.phone,
          buyerAddress: checkoutData.customerAddress.streetAddress,
          buyerLga: checkoutData.customerAddress.lga,
          buyerState: checkoutData.customerAddress.state,
          buyerDirections: checkoutData.customerAddress.directions || "",
          buyerInstructions: checkoutData.deliveryInstructions || "",
          totalAmount: total,
          deliveryFee,
          deliveryLocationId: selectedDeliveryLocation || null,
          platform: orderSummaries[0]?.platform || platform,
          subdomain:
            (orderSummaries[0].platform === "store" &&
              orderSummaries[0].referralId) ||
            "",
          plugId:
            (orderSummaries[0]?.platform !== "store" &&
              orderSummaries[0]?.referralId) ||
            "",
          orderItems: formatOrderItems(),
        }),
      });

      if (!response.ok) {
        const err = await response.json();
        errorToast(err.error || "Failed to stage order");
        return null;
      }

      const result = await response.json();
      return result.data;
    } catch (err) {
      console.error("Error staging order:", err);
      errorToast("Could not stage order");
      return null;
    }
  };

  // Utility delay helper
  const delay = (ms: number) => new Promise((res) => setTimeout(res, ms));

  const confirmOrder = async (reference: string) => {
    try {
      const response = await fetch("/api/orders/confirm-order", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ reference }),
      });

      if (!response.ok) {
        const err = await response.json();
        errorToast(err.error || "Failed to confirm order");
        router.replace("/order-error");
        return;
      }
      const result = await response.json();
      successToast(result.message || "Order placed successfully");

      if (result.data) {
        sessionStorage.setItem("orderSuccess", JSON.stringify(result.data));
      }

      clearCheckoutData();
      clearOrderSummaries();
      router.replace("/thank-you");
    } catch (error) {
      console.error("Error confirming order:", error);
      errorToast("An error occurred while confirming order");
    } finally {
      setIsLoading(false);
    }
  };

  const handleStageOrder = async () => {
    setIsLoading(true);
    const staged = await stageOrder();
    if (!staged) return;

    setStagedOrder(staged);

    if (typeof window === "undefined") return;

    const { usePaystackPayment } = await import("react-paystack");

    const config = {
      email: watchedEmail || "",
      amount: total * 100,
      reference: staged.reference,
      publicKey: process.env.NEXT_PUBLIC_PAYSTACK_PUBLIC_KEY!,
      metadata: {
        custom_fields: [
          {
            display_name: "Name",
            variable_name: "name",
            value: watchedName || "",
          },
          {
            display_name: "Phone",
            variable_name: "phone",
            value: watchedPhone || "",
          },
          {
            display_name: "Address",
            variable_name: "address",
            value: watchedCustomerAddress
              ? `${watchedCustomerAddress.streetAddress}, ${watchedCustomerAddress.lga}, ${watchedCustomerAddress.state}`
              : "",
          },
          {
            display_name: "Order Number",
            variable_name: "orderNumber",
            value: staged.orderNumber,
          },
        ],
      },
    };

    const initializePayment = usePaystackPayment(config);

    initializePayment({
      onSuccess: async (ref: { reference: string }) => {
        await delay(3000);
        await confirmOrder(ref.reference);
      },
      onClose: () => {
        setIsLoading(false);
        showPaymentCancelledModal();
      },
    });
  };

  // Effect to handle buyer info auto-fill
  useEffect(() => {
    if (buyerInfoData?.data && !buyerInfoError) {
      const data = buyerInfoData.data;
      if (data.streetAddress && data.state && data.lga) {
        setValue("customerAddress.streetAddress", data.streetAddress);
        setValue("customerAddress.state", data.state);
        setValue("customerAddress.lga", data.lga);
        if (data.directions) {
          setValue("customerAddress.directions", data.directions);
        }

        setCustomerAddress({
          streetAddress: data.streetAddress,
          state: data.state,
          lga: data.lga,
          directions: data.directions || "",
        });

        setSelectedState(data.state);
        const lgas = getLgasForState(data.state);
        setAvailableLgas(lgas);
      }
    }
  }, [buyerInfoData, buyerInfoError, setValue, setCustomerAddress]);

  // Reset delivery location when state or LGA changes
  useEffect(() => {
    setSelectedDeliveryLocation("");
  }, [watchedState, watchedLga]);

  const handleBackNavigation = () => {
    if (platform !== "store") {
      router.back();
    }
  };

  // Effect to transform fetched products into orderSummaries when platform is "store"
  useEffect(() => {
    if (platform === "store" && productsData.length > 0 && !isProductsLoading) {
      const transformedOrderSummaries = productsData
        .filter(({ data, error }) => data && !error)
        .map(({ item, data }) => {
          const product = data.data || data;
          const productItem = {
            id: product.id || item.pid,
            name: product.name || product.title || "Unknown Product",
            price: product.price || 0,
            originalPrice: product.originalPrice || product.price || 0,
            productId: product.originalId,
            quantity: item.qty,
            image: product.image || product.images?.[0] || "/placeholder.svg",
            selectedColor: item.color,
            size: item.variation
              ? product.variations?.find((v: any) => v.id === item.variation)
                  ?.size
              : undefined,
            variationId: item.variation,
            variationName: item.variation
              ? getVariationDisplayName(
                  product.variations?.find((v: any) => v.id === item.variation)
                )
              : undefined,
            supplierId: product.supplierId || product.userId,
          };

          const subtotal = productItem.price * productItem.quantity;
          const defaultDeliveryFee = 0;
          const total = subtotal + defaultDeliveryFee;

          return {
            item: productItem,
            subtotal,
            total,
            referralId: ref,
            platform: platform,
            pickupLocation: product.pickupLocation
              ? {
                  latitude: product.pickupLocation.latitude,
                  longitude: product.pickupLocation.longitude,
                }
              : undefined,
            deliveryFee: defaultDeliveryFee,
            deliveryLocations: product.deliveryLocations,
          };
        });

      if (transformedOrderSummaries.length > 0) {
        setOrderSummaries(transformedOrderSummaries);
      }
    }
  }, [platform, productsData, isProductsLoading, ref, setOrderSummaries]);

  // Initialize states and form data
  useEffect(() => {
    setIsClient(true);

    try {
      const statesData = NaijaStates.states();
      if (Array.isArray(statesData)) {
        const stateNames = statesData
          .map((state: any) => {
            return typeof state === "string"
              ? state
              : state.state || state.name;
          })
          .filter(Boolean);
        setStates(stateNames);
      }
    } catch (error) {
      console.error("Error fetching states:", error);
      setStates([]);
    }
  }, []);

  useEffect(() => {
    if (!isClient) return;

    const currentFormName = watch("customerInfo.name");
    const currentFormEmail = watch("customerInfo.email");
    const currentFormPhone = watch("customerInfo.phone");

    if (!currentFormName && checkoutData.customerInfo.name) {
      setValue("customerInfo.name", checkoutData.customerInfo.name);
    }
    if (!currentFormEmail && checkoutData.customerInfo.email) {
      setValue("customerInfo.email", checkoutData.customerInfo.email);
    }
    if (!currentFormPhone && checkoutData.customerInfo.phone) {
      setValue("customerInfo.phone", checkoutData.customerInfo.phone);
    }

    const currentStreetAddress = watch("customerAddress.streetAddress");
    const currentState = watch("customerAddress.state");
    const currentLga = watch("customerAddress.lga");

    if (!currentStreetAddress && checkoutData.customerAddress.streetAddress) {
      setValue(
        "customerAddress.streetAddress",
        checkoutData.customerAddress.streetAddress
      );
    }
    if (!currentState && checkoutData.customerAddress.state) {
      setValue("customerAddress.state", checkoutData.customerAddress.state);
    }
    if (!currentLga && checkoutData.customerAddress.lga) {
      setValue("customerAddress.lga", checkoutData.customerAddress.lga);
    }
    if (checkoutData.customerAddress.directions) {
      setValue(
        "customerAddress.directions",
        checkoutData.customerAddress.directions
      );
    }
  }, [isClient, setValue]);

  useEffect(() => {
    if (watchedState && watchedState !== selectedState) {
      setSelectedState(watchedState);
      const lgas = getLgasForState(watchedState);
      setAvailableLgas(lgas);
      setCustomerAddress({ state: watchedState });
    }
  }, [watchedState, selectedState, setValue]);

  const watchedCustomerInfo = watch("customerInfo");
  const watchedCustomerAddress = watch("customerAddress");

  useEffect(() => {
    if (!watchedCustomerInfo || !isClient) return;

    const currentStoreInfo = checkoutData.customerInfo;
    const hasChanged =
      currentStoreInfo.name !== watchedCustomerInfo.name ||
      currentStoreInfo.email !== watchedCustomerInfo.email ||
      currentStoreInfo.phone !== watchedCustomerInfo.phone;

    if (hasChanged) {
      const timeoutId = setTimeout(() => {
        setCustomerInfo(watchedCustomerInfo);
      }, 100);

      return () => clearTimeout(timeoutId);
    }
  }, [
    watchedCustomerInfo,
    setCustomerInfo,
    isClient,
    checkoutData.customerInfo,
  ]);

  useEffect(() => {
    if (!watchedCustomerAddress || !isClient) return;

    const currentStoreAddress = checkoutData.customerAddress;
    const hasChanged =
      currentStoreAddress.streetAddress !==
        watchedCustomerAddress.streetAddress ||
      currentStoreAddress.state !== watchedCustomerAddress.state ||
      currentStoreAddress.lga !== watchedCustomerAddress.lga ||
      currentStoreAddress.directions !== watchedCustomerAddress.directions;

    if (hasChanged) {
      const timeoutId = setTimeout(() => {
        setCustomerAddress(watchedCustomerAddress);
      }, 100);

      return () => clearTimeout(timeoutId);
    }
  }, [
    watchedCustomerAddress,
    setCustomerAddress,
    isClient,
    checkoutData.customerAddress,
  ]);

  useEffect(() => {
    const validateField = async (fieldName: any, value: any) => {
      if (value && value.trim() !== "") {
        const isFieldValid = await trigger(fieldName);
        if (isFieldValid) {
          clearErrors(fieldName);
        }
      }
    };

    if (watchedCustomerInfo?.name) {
      validateField("customerInfo.name", watchedCustomerInfo.name);
    }
    if (watchedCustomerInfo?.email) {
      validateField("customerInfo.email", watchedCustomerInfo.email);
    }
    if (watchedCustomerInfo?.phone) {
      validateField("customerInfo.phone", watchedCustomerInfo.phone);
    }

    if (watchedCustomerAddress?.streetAddress) {
      validateField(
        "customerAddress.streetAddress",
        watchedCustomerAddress.streetAddress
      );
    }
    if (watchedCustomerAddress?.state) {
      validateField("customerAddress.state", watchedCustomerAddress.state);
    }
    if (watchedCustomerAddress?.lga) {
      validateField("customerAddress.lga", watchedCustomerAddress.lga);
    }
  }, [watchedCustomerInfo, watchedCustomerAddress, trigger, clearErrors]);

  //  const continueToReview = async () => {
  //    // Check if delivery location is selected - this should always be checked
  //    if (!selectedDeliveryLocation) {
  //      setShowDeliveryLocationAlert(true);
  //      return;
  //    }

  //    // For terminal delivery, validate customer info and check delivery fee
  //    if (deliveryType === "terminal") {
  //      const customerInfoValid = await trigger([
  //        "customerInfo.name",
  //        "customerInfo.email",
  //        "customerInfo.phone",
  //      ]);
  //      const stateValid = await trigger("customerAddress.state");

  //      if (customerInfoValid && stateValid) {
  //        setCurrentStep("review");
  //        if (orderSummaries.length > 0) {
  //          orderSummaries.forEach((orderSummary) => {
  //            mutate(
  //              `/public/products/${orderSummary.item.id}${orderSummary.referralId}`
  //            );
  //          });
  //        }
  //      } else {
  //        const firstError = document.querySelector(".border-red-500");
  //        if (firstError) {
  //          firstError.scrollIntoView({ behavior: "smooth", block: "center" });
  //        }
  //      }
  //      return;
  //    }

  //    // For home delivery, validate all fields and check delivery fee
  //    const isFormValid = await trigger();

  //    // Check if delivery fee is available for home delivery
  //    if (deliveryFee === null) {
  //      errorToast(
  //        "Please wait for delivery fee calculation to complete before proceeding."
  //      );
  //      return;
  //    }

  //    if (isFormValid) {
  //      setCurrentStep("review");
  //      if (orderSummaries.length > 0) {
  //        orderSummaries.forEach((orderSummary) => {
  //          mutate(
  //            `/public/products/${orderSummary.item.id}${orderSummary.referralId}`
  //          );
  //        });
  //      }
  //    } else {
  //      const firstError = document.querySelector(".border-red-500");
  //      if (firstError) {
  //        firstError.scrollIntoView({ behavior: "smooth", block: "center" });
  //      }
  //    }
  //  };

  // const continueToReview = async () => {
  //   // Check if all supplier groups with delivery locations have a selection
  //   const missingDeliverySelections = supplierGroups.filter(
  //     group => group.deliveryLocations.length > 0 && !supplierDeliverySelections[group.supplierId]
  //   );

  //   if (missingDeliverySelections.length > 0) {
  //     errorToast(
  //       hasMultipleSuppliers
  //         ? "Please select delivery options for all delivery groups"
  //         : "Please select a delivery option"
  //     );
  //     return;
  //   }

  //   // Rest of your existing validation...
  //   const customerInfoValid = await trigger([
  //     "customerInfo.name",
  //     "customerInfo.email",
  //     "customerInfo.phone",
  //   ]);

  //   const isFormValid = await trigger();

  //   if (deliveryFee === null || deliveryFee === undefined) {
  //     errorToast("Please wait for delivery fee calculation to complete before proceeding.");
  //     return;
  //   }

  //   if (isFormValid && customerInfoValid) {
  //     setCurrentStep("review");
  //     if (orderSummaries.length > 0) {
  //       orderSummaries.forEach((orderSummary) => {
  //         mutate(`/public/products/${orderSummary.item.id}${orderSummary.referralId}`);
  //       });
  //     }
  //   } else {
  //     const firstError = document.querySelector(".border-red-500");
  //     if (firstError) {
  //       firstError.scrollIntoView({ behavior: "smooth", block: "center" });
  //     }
  //   }
  // };

  const continueToReview = async () => {
    // Check if there are any supplier groups with delivery locations
    const groupsWithDeliveryLocations = supplierGroups.filter(
      (group) => group.deliveryLocations.length > 0
    );

    // Check if at least one delivery option has been selected
    const selectedDeliveryGroups = groupsWithDeliveryLocations.filter(
      (group) => supplierDeliverySelections[group.supplierId]
    );

    // If there are groups with delivery locations but none selected, show error
    if (
      groupsWithDeliveryLocations.length > 0 &&
      selectedDeliveryGroups.length === 0
    ) {
      errorToast("Please select at least one delivery option to continue");
      return;
    }

    // Check if there are unselected groups
    const missingDeliverySelections = groupsWithDeliveryLocations.filter(
      (group) => !supplierDeliverySelections[group.supplierId]
    );

    // If some groups are not selected, show info toast
    if (missingDeliverySelections.length > 0) {
      const unselectedItemsCount = missingDeliverySelections.reduce(
        (count, group) => count + group.items.length,
        0
      );

      // Show info toast about excluded items
      const { toast } = await import("@/components/ui/use-toast-advanced");
      toast({
        title: "Note",
        description: `${unselectedItemsCount} item(s) without delivery selection will not be included in this order.`,
        variant: "default",
      });
    }

    // Rest of your existing validation...
    const customerInfoValid = await trigger([
      "customerInfo.name",
      "customerInfo.email",
      "customerInfo.phone",
    ]);

    const isFormValid = await trigger();

    if (
      selectedDeliveryGroups.length > 0 &&
      (deliveryFee === null || deliveryFee === undefined)
    ) {
      errorToast(
        "Please wait for delivery fee calculation to complete before proceeding."
      );
      return;
    }

    if (isFormValid && customerInfoValid) {
      setCurrentStep("review");
      if (orderSummaries.length > 0) {
        orderSummaries.forEach((orderSummary) => {
          mutate(
            `/public/products/${orderSummary.item.id}${orderSummary.referralId}`
          );
        });
      }
    } else {
      const firstError = document.querySelector(".border-red-500");
      if (firstError) {
        firstError.scrollIntoView({ behavior: "smooth", block: "center" });
      }
    }
  };

  const showPaymentCancelledModal = () => {
    setShowCancelledModal(true);
  };

  const formatPrice = (price?: string | number) => {
    return `₦${price?.toLocaleString()}`;
  };

  const goToNextStep = async () => {
    if (currentStep === "delivery") {
      const isFormValid = await trigger();
      if (isFormValid) {
        setCurrentStep("review");
      } else {
        const firstError = document.querySelector(".border-red-500");
        if (firstError) {
          firstError.scrollIntoView({ behavior: "smooth", block: "center" });
        }
      }
    }
  };

  const goToPreviousStep = () => {
    if (currentStep === "review") setCurrentStep("delivery");
  };

  const handleDeliveryInstructionsChange = (instructions: string) => {
    setDeliveryInstructions(instructions);
  };

  const renderPlaceOrderButton = () => (
    <Button
      onClick={handleStageOrder}
      className="flex-1 bg-primary text-primary-foreground hover:bg-primary/90 h-10 px-4 py-2 rounded-md font-medium transition-colors"
      disabled={isLoading}
    >
      {isLoading ? "Processing..." : "Place Order"}
    </Button>
  );

  // Get selected delivery location details for display
  const selectedDeliveryLocationDetails = useMemo(() => {
    if (!selectedDeliveryLocation || !availableDeliveryLocations.length)
      return null;
    return availableDeliveryLocations.find(
      (loc: any) => loc.id === selectedDeliveryLocation
    );
  }, [selectedDeliveryLocation, availableDeliveryLocations]);

  return (
    <div className="flex flex-col min-h-screen pb-16 md:pb-0">
      {platform !== "store" && (
        <div className="sticky top-0 z-20 flex items-center p-4 bg-background/80 backdrop-blur-md border-b">
          <Button
            variant="ghost"
            size="sm"
            onClick={handleBackNavigation}
            className="flex items-center gap-2"
          >
            <ArrowLeft className="w-4 h-4" />
            Back
          </Button>
        </div>
      )}

      {/* Loading state for store platform */}
      {platform === "store" && isProductsLoading && (
        <div className="container mx-auto px-4 py-8 max-w-7xl">
          <div className="flex items-center justify-center min-h-[400px]">
            <div className="text-center">
              <Loader2 className="h-8 w-8 animate-spin mx-auto mb-4" />
              <p className="text-muted-foreground">Loading products...</p>
            </div>
          </div>
        </div>
      )}

      {/* Error state for store platform */}
      {platform === "store" && productFetchError && !isProductsLoading && (
        <div className="container mx-auto px-4 py-8 max-w-7xl">
          <Alert className="max-w-md mx-auto">
            <AlertDescription>
              Failed to load products. Please try refreshing the page.
            </AlertDescription>
          </Alert>
        </div>
      )}

      {/* Main content - only show when not loading or when not store platform */}
      {(platform !== "store" || (!isProductsLoading && !productFetchError)) && (
        <div className="container mx-auto px-4 py-4 md:py-8 max-w-7xl">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 lg:gap-8">
            <div className="lg:col-span-2">
              {currentStep === "delivery" && (
                <Card>
                  <CardContent className="p-4 md:p-6">
                    <h2 className="text-xl font-semibold mb-4">
                      Delivery Information
                    </h2>
                    <div className="space-y-6">
                      {/* Customer Information */}
                      <div>
                        <div className="flex items-center justify-between mb-3">
                          <h3 className="font-medium">Customer Information</h3>
                        </div>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                          <div className="space-y-2">
                            <Label htmlFor="customerName">
                              Full Name <span className="text-red-500">*</span>
                            </Label>
                            <Input
                              id="customerName"
                              {...register("customerInfo.name", {
                                onChange: async (e) => {
                                  const value = e.target.value;
                                  setCustomerInfo({ name: value });
                                  if (value && errors.customerInfo?.name) {
                                    const isValid = await trigger(
                                      "customerInfo.name"
                                    );
                                    if (isValid)
                                      clearErrors("customerInfo.name");
                                  }
                                },
                              })}
                              placeholder="Enter your full name"
                              className={
                                errors.customerInfo?.name
                                  ? "border-red-500"
                                  : ""
                              }
                            />
                            {errors.customerInfo?.name && (
                              <p className="text-sm text-red-600">
                                {errors.customerInfo.name.message}
                              </p>
                            )}
                          </div>
                          <div className="space-y-2">
                            <Label htmlFor="customerEmail">
                              Email Address{" "}
                              <span className="text-red-500">*</span>
                            </Label>
                            <Input
                              id="customerEmail"
                              type="email"
                              {...register("customerInfo.email", {
                                onChange: async (e) => {
                                  const value = e.target.value;
                                  setCustomerInfo({ email: value });
                                  if (value && errors.customerInfo?.email) {
                                    const isValid = await trigger(
                                      "customerInfo.email"
                                    );
                                    if (isValid)
                                      clearErrors("customerInfo.email");
                                  }
                                },
                              })}
                              placeholder="Enter your email address"
                              className={
                                errors.customerInfo?.email
                                  ? "border-red-500"
                                  : ""
                              }
                            />
                            {errors.customerInfo?.email && (
                              <p className="text-sm text-red-600">
                                {errors.customerInfo.email.message}
                              </p>
                            )}
                          </div>
                          <div className="space-y-2 md:col-span-2">
                            <Label htmlFor="customerPhone">
                              Phone Number{" "}
                              <span className="text-red-500">*</span>
                            </Label>
                            <Input
                              id="customerPhone"
                              {...register("customerInfo.phone", {
                                onChange: async (e) => {
                                  const value = e.target.value;
                                  setCustomerInfo({ phone: value });
                                  if (value && errors.customerInfo?.phone) {
                                    const isValid = await trigger(
                                      "customerInfo.phone"
                                    );
                                    if (isValid)
                                      clearErrors("customerInfo.phone");
                                  }
                                },
                              })}
                              placeholder="Enter your phone number"
                              className={
                                errors.customerInfo?.phone
                                  ? "border-red-500"
                                  : ""
                              }
                            />
                            {errors.customerInfo?.phone && (
                              <p className="text-sm text-red-600">
                                {errors.customerInfo.phone.message}
                              </p>
                            )}
                          </div>
                        </div>
                      </div>

                      <Separator />

                      {/* Delivery Address */}
                      <div>
                        <h3 className="font-medium mb-3">Delivery Address</h3>

                        <div className="space-y-4">
                          {/* State Selection - Always shown first */}
                          <div className="space-y-2">
                            <Label htmlFor="state">
                              State <span className="text-red-500">*</span>
                            </Label>
                            <Controller
                              name="customerAddress.state"
                              control={control}
                              render={({ field }) => (
                                <Select
                                  value={field.value}
                                  onValueChange={async (value) => {
                                    field.onChange(value);
                                    setCustomerAddress({ state: value });
                                    // Reset delivery type and terminal selection when state changes
                                    setDeliveryType("terminal");
                                    setSelectedTerminal("");
                                    if (
                                      value &&
                                      errors.customerAddress?.state
                                    ) {
                                      const isValid = await trigger(
                                        "customerAddress.state"
                                      );
                                      if (isValid)
                                        clearErrors("customerAddress.state");
                                    }
                                  }}
                                >
                                  <SelectTrigger
                                    id="state"
                                    className={
                                      errors.customerAddress?.state
                                        ? "border-red-500"
                                        : ""
                                    }
                                  >
                                    <SelectValue placeholder="Select a state" />
                                  </SelectTrigger>
                                  <SelectContent>
                                    {states.map((state) => (
                                      <SelectItem key={state} value={state}>
                                        {state}
                                      </SelectItem>
                                    ))}
                                  </SelectContent>
                                </Select>
                              )}
                            />
                            {errors.customerAddress?.state && (
                              <p className="text-sm text-red-600">
                                {errors.customerAddress.state.message}
                              </p>
                            )}
                          </div>

                          {/* LGA Selection */}

                          <div className="space-y-2">
                            <Label htmlFor="lga">
                              Local Government Area{" "}
                              <span className="text-red-500">*</span>
                            </Label>
                            <Controller
                              name="customerAddress.lga"
                              control={control}
                              render={({ field }) => (
                                <Select
                                  value={field.value}
                                  onValueChange={async (value) => {
                                    field.onChange(value);
                                    setCustomerAddress({ lga: value });
                                    if (value && errors.customerAddress?.lga) {
                                      const isValid = await trigger(
                                        "customerAddress.lga"
                                      );
                                      if (isValid)
                                        clearErrors("customerAddress.lga");
                                    }
                                  }}
                                  disabled={
                                    !selectedState || availableLgas.length === 0
                                  }
                                >
                                  <SelectTrigger
                                    id="lga"
                                    className={
                                      errors.customerAddress?.lga
                                        ? "border-red-500"
                                        : ""
                                    }
                                  >
                                    <SelectValue
                                      placeholder={
                                        selectedState
                                          ? "Select a Local Government Area"
                                          : "Please select a state first"
                                      }
                                    />
                                  </SelectTrigger>
                                  <SelectContent>
                                    {availableLgas.map((lga) => (
                                      <SelectItem key={lga} value={lga}>
                                        {lga}
                                      </SelectItem>
                                    ))}
                                  </SelectContent>
                                </Select>
                              )}
                            />
                            {errors.customerAddress?.lga && (
                              <p className="text-sm text-red-600">
                                {errors.customerAddress.lga.message}
                              </p>
                            )}
                          </div>

                          <div className="space-y-2">
                            <Label htmlFor="streetAddress">
                              Street Address{" "}
                              <span className="text-red-500">*</span>
                            </Label>
                            <Textarea
                              id="streetAddress"
                              {...register("customerAddress.streetAddress", {
                                onChange: async (e) => {
                                  const value = e.target.value;
                                  setCustomerAddress({
                                    streetAddress: value,
                                  });
                                  if (
                                    value &&
                                    errors.customerAddress?.streetAddress
                                  ) {
                                    const isValid = await trigger(
                                      "customerAddress.streetAddress"
                                    );
                                    if (isValid)
                                      clearErrors(
                                        "customerAddress.streetAddress"
                                      );
                                  }
                                },
                              })}
                              rows={3}
                              className={
                                errors.customerAddress?.streetAddress
                                  ? "border-red-500"
                                  : ""
                              }
                              placeholder="Enter your full street address including house number, street name, area, and nearby landmarks for accurate delivery"
                            />
                            {errors.customerAddress?.streetAddress && (
                              <p className="text-sm text-red-600">
                                {errors.customerAddress.streetAddress.message}
                              </p>
                            )}
                          </div>

                          <div className="space-y-2">
                            <Label htmlFor="directions">
                              Additional Directions{" "}
                              <span className="text-gray-500">(Optional)</span>
                            </Label>
                            <Textarea
                              id="directions"
                              {...register("customerAddress.directions", {
                                onChange: (e) => {
                                  const value = e.target.value;
                                  setCustomerAddress({
                                    directions: value,
                                  });
                                },
                              })}
                              rows={3}
                              className={
                                errors.customerAddress?.directions
                                  ? "border-red-500"
                                  : ""
                              }
                              placeholder="Additional directions to help locate your address (e.g., 'Opposite First Bank', 'Blue gate with security post', 'Third floor, Apartment 3B')"
                            />
                            {errors.customerAddress?.directions && (
                              <p className="text-sm text-red-600">
                                {errors.customerAddress.directions.message}
                              </p>
                            )}
                          </div>
                        </div>
                      </div>

                      {/* Delivery Location Selection */}
                      {/* Delivery Location Selection */}
                      {/* {availableDeliveryLocations.length > 0 && (
                        <>
                          <Separator />
                          <div>
                            <div className="flex items-center gap-2 mb-3">
                              <h3 className="font-medium">Delivery Location</h3>
                              <span className="text-red-500">*</span>
                            </div>
                            <Alert className="mb-4">
                              <Info className="h-4 w-4" />
                              <AlertDescription>
                                Select your preferred delivery option
                              </AlertDescription>
                            </Alert>
                            <div className="max-h-[400px] overflow-y-auto pr-2 space-y-3">
                              <RadioGroup
                                value={selectedDeliveryLocation}
                                onValueChange={setSelectedDeliveryLocation}
                                className="space-y-3"
                              >
                                {availableDeliveryLocations.map(
                                  (location: any) => {
                                    const lgaDisplay =
                                      getDeliveryLocationDisplay(location);
                                    const isString =
                                      typeof lgaDisplay === "string";

                                    return (
                                      <div
                                        key={location.id}
                                        className={`relative flex items-start space-x-3 rounded-lg border p-4 cursor-pointer transition-all ${
                                          selectedDeliveryLocation ===
                                          location.id
                                            ? "border-primary bg-primary/5"
                                            : "border-border hover:border-primary/50"
                                        }`}
                                        onClick={() =>
                                          setSelectedDeliveryLocation(
                                            location.id
                                          )
                                        }
                                      >
                                        <RadioGroupItem
                                          value={location.id}
                                          id={location.id}
                                          className="mt-1"
                                        />
                                        <div className="flex-1 space-y-1">
                                          <Label
                                            htmlFor={location.id}
                                            className="flex items-center gap-2 cursor-pointer font-medium"
                                          >
                                            <Truck className="h-4 w-4" />
                                            {location.state} Delivery
                                          </Label>
                                          <div className="flex items-center gap-2 text-sm text-muted-foreground">
                                            <Clock className="h-3 w-3" />
                                            {location.duration}
                                          </div>
                                          <p className="text-sm text-muted-foreground">
                                            Available for:{" "}
                                            {isString ? (
                                              lgaDisplay
                                            ) : (
                                              <>
                                                {lgaDisplay.preview}
                                                {lgaDisplay.remaining > 0 && (
                                                  <button
                                                    type="button"
                                                    className="ml-1 text-primary hover:underline"
                                                    onClick={(e) => {
                                                      e.stopPropagation();
                                                      // You can implement a modal or expand inline here
                                                      alert(
                                                        `All locations: ${location.lgas.join(
                                                          ", "
                                                        )}`
                                                      );
                                                    }}
                                                  >
                                                    +{lgaDisplay.remaining} more
                                                  </button>
                                                )}
                                              </>
                                            )}
                                          </p>
                                          <p className="text-sm font-semibold text-primary">
                                            {formatPrice(location.fee)}
                                          </p>
                                        </div>
                                      </div>
                                    );
                                  }
                                )}
                              </RadioGroup>
                            </div>
                          </div>
                        </>
                      )} */}

                      {/* Replace the existing Delivery Location Selection section with this */}
                      {supplierGroups.some(
                        (group) => group.deliveryLocations.length > 0
                      ) && (
                        <>
                          <Separator />
                          <div>
                            <div className="flex items-center gap-2 mb-3">
                              <h3 className="font-medium">Delivery Options</h3>
                              <span className="text-red-500">*</span>
                            </div>

                            {hasMultipleSuppliers && (
                              <Alert className="mb-4">
                                <Info className="h-4 w-4" />
                                <AlertDescription>
                                  Your items will be delivered separately as
                                  they come from different store with different
                                  delivery option. Please select a delivery
                                  option for each group.
                                </AlertDescription>
                              </Alert>
                            )}

                            <div className="space-y-6">
                              {supplierGroups.map((group, groupIndex) => {
                                if (group.deliveryLocations.length === 0)
                                  return null;

                                const selectedLocationId =
                                  supplierDeliverySelections[group.supplierId];
                                const isSelected = !!selectedLocationId;

                                return (
                                  <div
                                    key={group.supplierId}
                                    className="space-y-3"
                                  >
                                    {hasMultipleSuppliers && (
                                      <div className="flex items-start gap-3 p-3 bg-muted/50 rounded-lg">
                                        <div className="flex-1">
                                          <p className="font-medium text-sm mb-2">
                                            Delivery Group {groupIndex + 1}
                                          </p>
                                          <div className="flex flex-wrap gap-2">
                                            {group.items.map(
                                              (summary: any, idx: number) => (
                                                <span
                                                  key={idx}
                                                  className="text-xs bg-background px-2 py-1 rounded-md border"
                                                >
                                                  {summary.item.name}{" "}
                                                  {summary.item.variationName &&
                                                    `(${summary.item.variationName})`}
                                                </span>
                                              )
                                            )}
                                          </div>
                                        </div>
                                      </div>
                                    )}

                                    <div
                                      className={`border rounded-lg p-3 ${
                                        !isSelected
                                          ? "border-yellow-500/50 bg-yellow-50/50"
                                          : ""
                                      }`}
                                    >
                                      {!isSelected && (
                                        <div className="flex items-center gap-2 text-sm text-yellow-600 mb-3">
                                          <Info className="h-4 w-4" />
                                          <span>
                                            Please select a delivery option for
                                            this group
                                          </span>
                                        </div>
                                      )}

                                      <div className="max-h-[300px] overflow-y-auto pr-2 space-y-3">
                                        <RadioGroup
                                          value={selectedLocationId || ""}
                                          onValueChange={(value) => {
                                            setSupplierDeliverySelections(
                                              (prev) => ({
                                                ...prev,
                                                [group.supplierId]: value,
                                              })
                                            );
                                          }}
                                          className="space-y-3"
                                        >
                                          {group.deliveryLocations.map(
                                            (location: any) => {
                                              const lgaDisplay =
                                                getDeliveryLocationDisplay(
                                                  location
                                                );
                                              const isString =
                                                typeof lgaDisplay === "string";
                                              const isThisSelected =
                                                selectedLocationId ===
                                                location.id;

                                              return (
                                                <div
                                                  key={location.id}
                                                  className={`relative flex items-start space-x-3 rounded-lg border p-4 cursor-pointer transition-all ${
                                                    isThisSelected
                                                      ? "border-primary bg-primary/5"
                                                      : "border-border hover:border-primary/50"
                                                  }`}
                                                  onClick={() => {
                                                    setSupplierDeliverySelections(
                                                      (prev) => ({
                                                        ...prev,
                                                        [group.supplierId]:
                                                          location.id,
                                                      })
                                                    );
                                                  }}
                                                >
                                                  <RadioGroupItem
                                                    value={location.id}
                                                    id={`${group.supplierId}-${location.id}`}
                                                    className="mt-1"
                                                  />
                                                  <div className="flex-1 space-y-1">
                                                    <Label
                                                      htmlFor={`${group.supplierId}-${location.id}`}
                                                      className="flex items-center gap-2 cursor-pointer font-medium"
                                                    >
                                                      <Truck className="h-4 w-4" />
                                                      {location.state} Delivery
                                                    </Label>
                                                    <div className="flex items-center gap-2 text-sm text-muted-foreground">
                                                      <Clock className="h-3 w-3" />
                                                      {location.duration}
                                                    </div>
                                                    <p className="text-sm text-muted-foreground">
                                                      Available for:{" "}
                                                      {isString ? (
                                                        lgaDisplay
                                                      ) : (
                                                        <>
                                                          {lgaDisplay.preview}
                                                          {lgaDisplay.remaining >
                                                            0 && (
                                                            <button
                                                              type="button"
                                                              className="ml-1 text-primary hover:underline"
                                                              onClick={(e) => {
                                                                e.stopPropagation();
                                                                setSelectedLocationForLgas(
                                                                  location
                                                                );
                                                                setShowAllLgasModal(
                                                                  true
                                                                );
                                                              }}
                                                            >
                                                              +
                                                              {
                                                                lgaDisplay.remaining
                                                              }{" "}
                                                              more
                                                            </button>
                                                          )}
                                                        </>
                                                      )}
                                                    </p>
                                                    <p className="text-sm font-semibold text-primary">
                                                      {formatPrice(
                                                        location.fee
                                                      )}
                                                    </p>
                                                  </div>
                                                </div>
                                              );
                                            }
                                          )}
                                        </RadioGroup>
                                      </div>
                                    </div>
                                  </div>
                                );
                              })}
                            </div>
                          </div>
                        </>
                      )}

                      <Separator />

                      <div>
                        <h3 className="font-medium mb-3">Payment Method</h3>
                        <div className="flex items-center space-x-2 p-3 border rounded-md bg-muted/50">
                          <CreditCard className="h-4 w-4 mr-2 text-muted-foreground flex-shrink-0" />
                          <div className="min-w-0">
                            <span className="font-medium block">
                              Card, Bank Transfer and Mobile Money
                            </span>
                            <p className="text-xs text-muted-foreground">
                              Secure payment processing
                            </p>
                          </div>
                        </div>
                      </div>

                      <Separator />

                      <div>
                        <h3 className="font-medium mb-3">
                          Delivery Instructions (Optional)
                        </h3>
                        <Textarea
                          placeholder="Add any special instructions for delivery..."
                          className="resize-none"
                          value={checkoutData.deliveryInstructions}
                          onChange={(e) =>
                            handleDeliveryInstructionsChange(e.target.value)
                          }
                        />
                      </div>
                    </div>
                    <div className="mt-6">
                      <Button className="w-full" onClick={continueToReview}>
                        Continue to Review
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              )}

              {/* {currentStep === "review" && (
                <Card>
                  <CardContent className="p-4 md:p-6">
                    <h2 className="text-xl font-semibold mb-4">
                      Review Your Order
                    </h2>
                    <div className="space-y-6">
                      <div>
                        <h3 className="font-medium mb-3">
                          Items in Your Order
                        </h3>
                        <div className="space-y-4 max-h-64 overflow-y-auto pr-2">
                          {cartItems?.map((item) => (
                            <div
                              key={item.id}
                              className="flex items-start space-x-3"
                            >
                              <div className="w-16 h-16 relative rounded-md overflow-hidden flex-shrink-0 bg-muted">
                                <Image
                                  src={item.image || "/placeholder.svg"}
                                  alt={item.name}
                                  fill
                                  className="object-cover"
                                />
                              </div>
                              <div className="flex-1 min-w-0">
                                <h4 className="font-medium text-sm">
                                  <span className="capitalize">
                                    {item.name}
                                  </span>
                                  {item.variationName && (
                                    <span className="text-muted-foreground ml-2">
                                      ({item.variationName})
                                    </span>
                                  )}
                                </h4>
                                <div className="flex justify-between mt-1">
                                  <span className="text-sm">
                                    {item.quantity} x {formatPrice(item.price)}
                                  </span>
                                  <span className="text-sm font-medium">
                                    {formatPrice(item.price * item.quantity)}
                                  </span>
                                </div>
                              </div>
                            </div>
                          ))}
                        </div>
                      </div> */}

              {currentStep === "review" && (
                <Card>
                  <CardContent className="p-4 md:p-6">
                    <h2 className="text-xl font-semibold mb-4">
                      Review Your Order
                    </h2>
                    <div className="space-y-6">
                      <div>
                        <h3 className="font-medium mb-3">
                          Items in Your Order
                        </h3>

                        {hasMultipleSuppliers && (
                          <Alert className="mb-4">
                            <Info className="h-4 w-4" />
                            <AlertDescription>
                              Your items will be delivered in{" "}
                              {supplierGroups.length} separate shipments
                            </AlertDescription>
                          </Alert>
                        )}

                        <div className="space-y-6">
                          {supplierGroups.map((group, groupIndex) => {
                            const hasDeliverySelected =
                              supplierDeliverySelections[group.supplierId];
                            const selectedLocation =
                              group.deliveryLocations.find(
                                (loc: any) =>
                                  loc.id ===
                                  supplierDeliverySelections[group.supplierId]
                              );
                            const willNotBePurchased =
                              group.deliveryLocations.length > 0 &&
                              !hasDeliverySelected;

                            return (
                              <div
                                key={group.supplierId}
                                className={`border rounded-lg p-4 ${
                                  willNotBePurchased
                                    ? "bg-red-50/50 border-red-200"
                                    : ""
                                }`}
                              >
                                {hasMultipleSuppliers && (
                                  <div className="flex items-center justify-between mb-3">
                                    <p className="font-medium text-sm">
                                      Delivery Group {groupIndex + 1}
                                    </p>
                                    {willNotBePurchased && (
                                      <span className="text-xs bg-red-100 text-red-700 px-2 py-1 rounded-md">
                                        Won't be purchased - No delivery option
                                        selected
                                      </span>
                                    )}
                                  </div>
                                )}

                                <div className="space-y-4 max-h-64 overflow-y-auto pr-2">
                                  {group.items.map((summary: any) => (
                                    <div
                                      key={summary.item.id}
                                      className={`flex items-start space-x-3 ${
                                        willNotBePurchased ? "opacity-50" : ""
                                      }`}
                                    >
                                      <div className="w-16 h-16 relative rounded-md overflow-hidden flex-shrink-0 bg-muted">
                                        <Image
                                          src={
                                            summary.item.image ||
                                            "/placeholder.svg"
                                          }
                                          alt={summary.item.name}
                                          fill
                                          className="object-cover"
                                        />
                                      </div>
                                      <div className="flex-1 min-w-0">
                                        <h4 className="font-medium text-sm">
                                          <span className="capitalize">
                                            {summary.item.name}
                                          </span>
                                          {summary.item.variationName && (
                                            <span className="text-muted-foreground ml-2">
                                              ({summary.item.variationName})
                                            </span>
                                          )}
                                        </h4>
                                        <div className="flex justify-between mt-1">
                                          <span className="text-sm">
                                            {summary.item.quantity} x{" "}
                                            {formatPrice(summary.item.price)}
                                          </span>
                                          <span className="text-sm font-medium">
                                            {formatPrice(
                                              summary.item.price *
                                                summary.item.quantity
                                            )}
                                          </span>
                                        </div>
                                      </div>
                                    </div>
                                  ))}
                                </div>

                                {selectedLocation && (
                                  <div className="mt-4 p-3 bg-primary/5 rounded-md border border-primary/20">
                                    <p className="text-sm font-medium flex items-center gap-2">
                                      <Truck className="h-4 w-4" />
                                      Delivery Option for this group
                                    </p>
                                    <p className="text-sm text-muted-foreground mt-1">
                                      {selectedLocation.state} Delivery
                                    </p>
                                    <div className="flex items-center gap-2 mt-1 text-sm text-muted-foreground">
                                      <Clock className="h-3 w-3" />
                                      {selectedLocation.duration}
                                    </div>
                                    <p className="text-sm font-semibold text-primary mt-1">
                                      {formatPrice(selectedLocation.fee)}
                                    </p>
                                  </div>
                                )}
                              </div>
                            );
                          })}
                        </div>
                      </div>

                      {/* Rest of the review section remains the same */}

                      <Separator />

                      <div>
                        <h3 className="font-medium mb-3">
                          Delivery Information
                        </h3>
                        <div className="flex items-start space-x-2">
                          <MapPin className="h-5 w-5 text-muted-foreground mt-0.5 flex-shrink-0" />
                          <div className="flex-1 min-w-0">
                            <p className="text-sm">
                              {checkoutData.customerInfo.name ||
                                "Customer Name"}
                              <br />
                              {checkoutData.customerAddress.streetAddress ||
                                "Street Address"}
                              <br />
                              {checkoutData.customerAddress.directions && (
                                <>
                                  <span className="text-muted-foreground">
                                    Directions:{" "}
                                    {checkoutData.customerAddress.directions}
                                  </span>
                                  <br />
                                </>
                              )}
                              {checkoutData.customerAddress.lga},{" "}
                              {checkoutData.customerAddress.state}
                              <br />
                              {checkoutData.customerInfo.phone ||
                                "Phone Number"}
                            </p>
                            {selectedDeliveryLocationDetails && (
                              <div className="mt-3 p-3 bg-primary/5 rounded-md border border-primary/20">
                                <p className="text-sm font-medium flex items-center gap-2">
                                  <Truck className="h-4 w-4" />
                                  Delivery Option
                                </p>
                                <p className="text-sm text-muted-foreground mt-1">
                                  {selectedDeliveryLocationDetails.state}{" "}
                                  Delivery
                                </p>
                                <div className="flex items-center gap-2 mt-1 text-sm text-muted-foreground">
                                  <Clock className="h-3 w-3" />
                                  {selectedDeliveryLocationDetails.duration}
                                </div>
                                <p className="text-sm font-semibold text-primary mt-1">
                                  {formatPrice(
                                    selectedDeliveryLocationDetails.fee
                                  )}
                                </p>
                              </div>
                            )}
                          </div>
                        </div>
                      </div>

                      <Separator />

                      <div>
                        <h3 className="font-medium mb-3">Payment Method</h3>
                        <div className="flex items-center">
                          <CreditCard className="h-5 w-5 text-muted-foreground mr-2 flex-shrink-0" />
                          <span className="text-sm">
                            Card, Bank Transfer and Mobile Money
                          </span>
                        </div>
                      </div>
                    </div>
                    <div className="mt-6 flex flex-col sm:flex-row space-y-3 sm:space-y-0 sm:space-x-3">
                      <Button
                        variant="outline"
                        className="flex-1 bg-transparent"
                        onClick={goToPreviousStep}
                      >
                        Back
                      </Button>
                      {renderPlaceOrderButton()}
                    </div>
                  </CardContent>
                </Card>
              )}
            </div>

            <div className="lg:col-span-1">
              <div className="sticky top-20">
                <Card>
                  <CardContent className="p-4 md:p-6">
                    <h3 className="font-semibold text-lg mb-4">
                      Order Summary
                    </h3>
                    <div className="space-y-3 mb-6">
                      <div className="flex justify-between">
                        <span className="text-muted-foreground text-sm">
                          Subtotal
                        </span>
                        <span className="text-sm">
                          {formatPrice(subtotal!)}
                        </span>
                      </div>
                      <div className="flex justify-between items-center">
                        <span className="text-muted-foreground text-sm">
                          Delivery Fee
                        </span>
                        <span className="text-sm">
                          {deliveryFee === undefined
                            ? "Select a location"
                            : formatPrice(deliveryFee)}
                        </span>
                      </div>

                      <Separator className="my-4" />
                      <div className="flex justify-between font-bold">
                        <span>Total</span>
                        <span>{formatPrice(total)}</span>
                      </div>
                    </div>
                    <div className="space-y-4">
                      <div className="flex items-start space-x-2">
                        <p className="text-xs text-muted-foreground">
                          By continuing I agree to the{" "}
                          <a
                            href="/terms"
                            className="text-primary hover:underline"
                          >
                            Terms of Service
                          </a>{" "}
                          and{" "}
                          <a
                            href="/privacy"
                            className="text-primary hover:underline"
                          >
                            Privacy Policy
                          </a>
                        </p>
                      </div>
                    </div>
                    <div className="mt-6 text-center">
                      <p className="text-xs text-muted-foreground">
                        Need help?{" "}
                        <a href="/help" className="text-primary">
                          Contact Support
                        </a>
                      </p>
                    </div>
                  </CardContent>
                </Card>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* <AlertDialog
        open={showDeliveryLocationAlert}
        onOpenChange={setShowDeliveryLocationAlert}
      >
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Delivery Location Required</AlertDialogTitle>
            <AlertDialogDescription>
              Please select a delivery location before proceeding to review your
              order.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogAction
              onClick={() => setShowDeliveryLocationAlert(false)}
            >
              OK
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog> */}

      {/* Add this modal after the showCancelledModal AlertDialog */}
      <AlertDialog open={showAllLgasModal} onOpenChange={setShowAllLgasModal}>
        <AlertDialogContent className="max-w-2xl max-h-[80vh] overflow-hidden flex flex-col">
          <AlertDialogHeader>
            <AlertDialogTitle>
              All Available Locations - {selectedLocationForLgas?.state}{" "}
              Delivery
            </AlertDialogTitle>
            <AlertDialogDescription>
              This delivery option covers the following local government areas:
            </AlertDialogDescription>
          </AlertDialogHeader>
          <div className="flex-1 overflow-y-auto pr-2">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 py-4">
              {selectedLocationForLgas?.lgas.map((lga, index) => (
                <div
                  key={index}
                  className="text-sm p-2 bg-muted rounded-md border"
                >
                  {lga}
                </div>
              ))}
            </div>
          </div>
          <AlertDialogFooter>
            <AlertDialogAction onClick={() => setShowAllLgasModal(false)}>
              Close
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>

      <AlertDialog
        open={showCancelledModal}
        onOpenChange={setShowCancelledModal}
      >
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Don't miss out!</AlertDialogTitle>
            <AlertDialogDescription>
              Your items are still waiting for you. Complete your purchase now
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel>Maybe Later</AlertDialogCancel>
            <AlertDialogAction
              onClick={() => {
                setShowCancelledModal(false);
                // Add your place order logic here
              }}
            >
              {renderPlaceOrderButton()}
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </div>
  );
}