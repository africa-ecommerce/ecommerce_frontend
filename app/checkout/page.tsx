// "use client";
// import { useState, useEffect, useMemo } from "react";
// import dynamic from "next/dynamic";
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

// // Dynamic import of PaystackButton to prevent SSR issues
// const PaystackButton = dynamic(
//   () => import("react-paystack").then((mod) => mod.PaystackButton),
//   {
//     ssr: false,
//     loading: () => <Button className="flex-1">Loading Payment...</Button>,
//   }
// );

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
//   const [buyerCoordinates, setBuyerCoordinates] = useState<{
//     latitude: number | null;
//     longitude: number | null;
//   }>({ latitude: null, longitude: null });

//   // Replace local state with Zustand store
//   const {
//     checkoutData,
//     setCustomerInfo,
//     setCustomerAddress,
//     setDeliveryInstructions,
//     setCurrentStep,
//     clearCheckoutData,
//   } = useCheckoutStore();

//   // Local state for UI-specific needs
//   const [isClient, setIsClient] = useState(false);
//   const [selectedState, setSelectedState] = useState<string>("");
//   const [availableLgas, setAvailableLgas] = useState<string[]>([]);
//   const [states, setStates] = useState<string[]>([]);
//   const [isLoading, setIsLoading] = useState(false);
//   const [showCancelledModal, setShowCancelledModal] = useState(false);
//   const router = useRouter();

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
//         if (
//           logisticsPricingData.data.buyerLatitude &&
//           logisticsPricingData.data.buyerLongitude
//         ) {
//           setBuyerCoordinates({
//             latitude: logisticsPricingData.data.buyerLatitude,
//             longitude: logisticsPricingData.data.buyerLongitude,
//           });
//         } else {
//           setBuyerCoordinates({
//             latitude: 6.5244 + (Math.random() - 0.5) * 0.1,
//             longitude: 3.3792 + (Math.random() - 0.5) * 0.1,
//           });
//         }
//       }
//     } else if (logisticsPricingError) {
//       console.error("Logistics pricing error:", logisticsPricingError);
//       // Update store with fallback fee
//       updateDeliveryFee(1500);
//       setBuyerCoordinates({
//         latitude: 6.5244 + (Math.random() - 0.5) * 0.1,
//         longitude: 3.3792 + (Math.random() - 0.5) * 0.1,
//       });
//     }
//   }, [logisticsPricingData, logisticsPricingError, updateDeliveryFee]);

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
//         variantColor: summary.item.color,
//         variantSize: summary.item.size,
//       }),
//       // For non-variation items, use product-level color and size
//       ...(!summary.item.variationId && {
//         productColor: summary.item.color,
//         productSize: summary.item.size,
//       }),
//     }));
//   };

//   const prepareOrderData = (paymentReference: string) => {
//     const orderData = {
//       // Buyer information
//       buyerName: checkoutData.customerInfo.name,
//       buyerEmail: checkoutData.customerInfo.email,
//       buyerPhone: checkoutData.customerInfo.phone,
//       buyerAddress: checkoutData.customerAddress.streetAddress,
//       buyerLga: checkoutData.customerAddress.lga,
//       buyerState: checkoutData.customerAddress.state,
//       buyerDirections: checkoutData.customerAddress.directions || "",
//       buyerInstructions: checkoutData.deliveryInstructions || "",
//       buyerLatitude: buyerCoordinates.latitude,
//       buyerLongitude: buyerCoordinates.longitude,
//       paymentMethod: "online",
//       totalAmount: total,
//       deliveryFee: deliveryFee,
//       platform: orderSummaries[0]?.platform || platform,
//       subdomain:
//         (orderSummaries[0].platform === "store" &&
//           orderSummaries[0].referralId) ||
//         "",
//       plugId:
//         (orderSummaries[0]?.platform !== "store" &&
//           orderSummaries[0]?.referralId) ||
//         "",
//       orderItems: formatOrderItems(),
//       // Payment reference for online payments
//       paymentReference,
//     };
//     return orderData;
//   };

//   const placeOrder = async (paymentReference: string) => {
//     try {
//       setIsLoading(true);
//       const orderData = prepareOrderData(paymentReference);
//       const response = await fetch("/api/orders/place-order", {
//         method: "POST",
//         headers: {
//           "Content-Type": "application/json",
//         },
//         body: JSON.stringify(orderData),
//       });

//       if (!response.ok) {
//         const errorData = await response.json();
//         errorToast(errorData.error || "Failed to place order");
//         clearCheckoutData();
//         clearOrderSummaries();
//         router.replace("/order-error");
//         return;
//       }

//       const result = await response.json();
//       successToast(result.message || "Order placed successfully");

//       // Store order success data for thank you page
//       if (result.data) {
//         sessionStorage.setItem("orderSuccess", JSON.stringify(result.data));
//       }

//       // Clear all checkout data and order summary
//       clearCheckoutData();
//       clearOrderSummaries();

//       // Navigate to thank you page
//       router.replace("/thank-you");
//       return result;
//     } catch (error) {
//       console.error("Error placing order:", error);
//       errorToast("An error occurred while placing the order");
//     } finally {
//       setIsLoading(false);
//     }
//   };

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
//             color: item.variation
//               ? product.variations?.find((v: any) => v.id === item.variation)
//                   ?.color
//               : undefined,
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
//           };
//         });

//       // Update the store with transformed data
//       if (transformedOrderSummaries.length > 0) {
//         setOrderSummaries(transformedOrderSummaries);
//       }
//     }
//   }, [platform, productsData, isProductsLoading, ref, setOrderSummaries]);

//   // Calculate delivery fee based on method and logistics pricing
//   const getDeliveryFee = () => {
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

//     // Initialize form with stored data
//     setValue("customerInfo.name", checkoutData.customerInfo.name || "");
//     setValue("customerInfo.email", checkoutData.customerInfo.email || "");
//     setValue("customerInfo.phone", checkoutData.customerInfo.phone || "");
//     setValue(
//       "customerAddress.streetAddress",
//       checkoutData.customerAddress.streetAddress || ""
//     );
//     setValue("customerAddress.state", checkoutData.customerAddress.state || "");
//     setValue("customerAddress.lga", checkoutData.customerAddress.lga || "");
//     setValue(
//       "customerAddress.directions",
//       checkoutData.customerAddress.directions || ""
//     );
//   }, [setValue, checkoutData]);

//   // Watch state changes to update LGAs
//   useEffect(() => {
//     if (watchedState && watchedState !== selectedState) {
//       setSelectedState(watchedState);
//       const lgas = getLgasForState(watchedState);
//       setAvailableLgas(lgas);
//       // Update the state in the store
//       setCustomerAddress({ state: watchedState });
//     }
//   }, [watchedState, selectedState, setValue, setCustomerAddress]);

//   // Watch form values for real-time validation and store updates
//   const watchedCustomerInfo = watch("customerInfo");
//   const watchedCustomerAddress = watch("customerAddress");

//   useEffect(() => {
//     if (watchedCustomerInfo) {
//       setCustomerInfo(watchedCustomerInfo);
//     }
//   }, [watchedCustomerInfo, setCustomerInfo]);

//   useEffect(() => {
//     if (watchedCustomerAddress) {
//       setCustomerAddress(watchedCustomerAddress);
//     }
//   }, [watchedCustomerAddress, setCustomerAddress]);

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

//   const continueToReview = () => {
//     goToNextStep();
//     if (orderSummaries.length > 0) {
//       orderSummaries.forEach((orderSummary) => {
//         mutate(
//           `/public/products/${orderSummary.item.id}${orderSummary.referralId}`
//         );
//       });
//     }
//   };

//   const showPaymentCancelledModal = () => {
//     // You could use a toast library or custom modal
//     setShowCancelledModal(true);
//   };

//   const paystackConfig = {
//     email: watchedCustomerInfo?.email || "",
//     amount: total * 100, // Paystack expects amount in kobo
//     metadata: {
//       name: watchedCustomerInfo?.name || "",
//       phone: watchedCustomerInfo?.phone || "",
//       address: watchedCustomerAddress
//         ? `${watchedCustomerAddress.streetAddress}, ${watchedCustomerAddress.lga}, ${watchedCustomerAddress.state}`
//         : "",
//       custom_fields: [
//         {
//           display_name: "Order Items",
//           variable_name: "order_items",
//           value: cartItems
//             ?.map((item) => `${item.name} x${item.quantity}`)
//             .join(", "),
//         },
//       ],
//     },
//     publicKey: process.env.NEXT_PUBLIC_PAYSTACK_PUBLIC_KEY,
//     text: isLoading ? "Processing..." : "Place Order",
//     onSuccess: async (reference) => {
//       try {
//         await placeOrder(reference.reference);
//       } catch (error) {
//         console.error("Error placing order after successful payment:", error);
//       }
//     },
//     onClose: () => {
//       showPaymentCancelledModal();
//     },
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

//   const renderPlaceOrderButton = () => {
//     // Only render PaystackButton on client side
//     if (!isClient) {
//       return <Button className="flex-1">Loading Payment...</Button>;
//     }

//     return (
//       <PaystackButton
//         {...paystackConfig}
//         className="flex-1 bg-primary text-primary-foreground hover:bg-primary/90 h-10 px-4 py-2 rounded-md font-medium transition-colors"
//       />
//     );
//   };

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
//                         {/* Address Specificity Message */}
//                         <Alert className="mb-4">
//                           <Info className="h-4 w-4" />
//                           <AlertDescription>
//                             <strong>💡 Pro Tip:</strong> Providing a very
//                             specific and detailed address helps our logistics
//                             partners optimize delivery routes, which can
//                             potentially reduce your delivery costs. Include
//                             landmarks, building descriptions, and clear
//                             directions.
//                           </AlertDescription>
//                         </Alert>
//                         {/* Street Address */}
//                         <div className="space-y-4">
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
//                                   setCustomerAddress({ streetAddress: value });
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
//                           {/* State Selection */}
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
//                           {/* Directions */}
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
//                                   setCustomerAddress({ directions: value });
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
//                           {/* Delivery Pricing Status */}
//                           {(isLogisticsPricingLoading ||
//                             logisticsPricingError ||
//                             logisticsPricingData?.data?.price !==
//                               undefined) && (
//                             <div className="p-3 border rounded-md bg-muted/50">
//                               <div className="flex items-center gap-2">
//                                 {logisticsPricingError && (
//                                   <span className="text-sm text-red-600">
//                                     Unable to calculate delivery fee - using
//                                     standard rate
//                                   </span>
//                                 )}
//                                 {logisticsPricingData?.data?.price !==
//                                   undefined &&
//                                   !isLogisticsPricingLoading && (
//                                     <span className="text-sm text-green-600">
//                                       Delivery fee calculated:{" "}
//                                       {formatPrice(
//                                         logisticsPricingData.data.price
//                                       )}
//                                     </span>
//                                   )}
//                               </div>
//                             </div>
//                           )}
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
//                               {checkoutData.customerAddress.directions && (
//                                 <>
//                                   <br />
//                                   <span className="text-muted-foreground">
//                                     Directions:{" "}
//                                     {checkoutData.customerAddress.directions}
//                                   </span>
//                                 </>
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
//                           {isLogisticsPricingLoading && (
//                             <Loader2 className="h-3 w-3 animate-spin ml-1 inline" />
//                           )}
//                         </span>
//                         <span className="text-sm">
//                           {!watchedState || !watchedLga || !watchedStreetAddress
//                             ? "Enter address to calculate"
//                             : deliveryFee === null
//                             ? "Calculating..."
//                             : deliveryFee === 0
//                             ? "Free"
//                             : formatPrice(deliveryFee)}
//                         </span>
//                       </div>
//                       {logisticsPricingError && (
//                         <div className="text-xs text-red-600 mt-1">
//                           Unable to calculate delivery fee - using standard rate
//                         </div>
//                       )}
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

//                 {/* Help Section */}
//                 <Card className="mt-6">
//                   <CardContent className="p-6">
//                     <div className="space-y-4 text-sm">
//                       <div className="flex items-start">
//                         <span className="mr-2 text-primary">•</span>
//                         <p>
//                           Orders are typically delivered 2-3 days for locations
//                           within Lagos and Ibadan, and 4-7 days for other
//                           locations
//                         </p>
//                       </div>
//                       <div className="flex items-start">
//                         <span className="mr-2 text-primary">•</span>
//                         <p>
//                           We accept returns within 3 days of delivery, provided
//                           items are in good condition
//                         </p>
//                       </div>
//                       <div className="flex items-start">
//                         <span className="mr-2 text-primary">•</span>
//                         <p>Detailed addresses help reduce delivery costs</p>
//                       </div>
//                     </div>
//                   </CardContent>
//                 </Card>
//               </div>
//             </div>
//           </div>
//         </div>
//       )}

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

// "use client";
// import { useState, useEffect, useMemo } from "react";
// import { SelectItem } from "@/components/ui/select";

// import { SelectContent } from "@/components/ui/select";

// import { SelectValue } from "@/components/ui/select";

// import { SelectTrigger } from "@/components/ui/select";

// import { Select } from "@/components/ui/select";

// import { Input } from "@/components/ui/input";

// import dynamic from "next/dynamic";
// import { useRouter, useSearchParams } from "next/navigation";
// import { ArrowLeft, Loader2 } from "lucide-react";
// import useSWR, { mutate } from "swr";
// import { Button } from "@/components/ui/button";
// import { Card, CardContent } from "@/components/ui/card";
// import { Separator } from "@/components/ui/separator";
// import { Label } from "@/components/ui/label";
// import { Alert, AlertDescription } from "@/components/ui/alert";
// import { useFormResolver } from "@/hooks/useFormResolver";
// import { Controller } from "react-hook-form";
// import NaijaStates from "naija-state-local-government";
// import { getLgasForState } from "@/lib/utils";
// import { deliveryFormSchema } from "@/zod/schema";
// import { useCheckoutStore } from "@/hooks/checkout-store";
// import { errorToast, successToast } from "@/components/ui/use-toast-advanced";
// import { getVariationDisplayName, parseCheckoutUrl } from "@/lib/url-parser";
// import { useProductFetching } from "@/hooks/use-product-fetcher";
// import { useProductStore } from "@/hooks/product-store";

// // Dynamic import of PaystackButton to prevent SSR issues
// const PaystackButton = dynamic(
//   () => import("react-paystack").then((mod) => mod.PaystackButton),
//   {
//     ssr: false,
//     loading: () => <Button className="flex-1">Loading Payment...</Button>,
//   }
// );

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

// const terminalAddresses = {
//   Abia: [
//     "Asa Road, Former NITEL Building, Aba",
//     "G.R.A, After Jevinic Restaurant, Aba",
//     "Opposite Villaroy Hotel, Umuahia Main Town",
//     "Close to MTN Office, Aba Road, Umuahia",
//   ],

//   "Federal Capital Territory": [
//     "Ademola Adetokunbo Crescent, Wuse 2",
//     "Area 1 Shopping Plaza, Area 1, Abuja",
//     "Beside Lifemate Furniture, Area 11, Garki",
//     "3rd Avenue Gwarinpa, Opposite Union Bank, Abuja",
//     "Opposite DIVIB Plaza, By 7th Avenue Junction, Gwarinpa",
//     "Opposite Aso-Oke Hotel, Gwagwalada",
//     "Gado Nasko Way, Along El-Rufai Bus Stop, Kubwa",
//     "Plot 17, Gidan Dutse Layout, Kubwa",
//     "Kukwaba General Park, Kubwa",
//     "Beside Remaco Filling Station, Lugbe",
//     "Along Zuba Expressway, Madalla",
//     "Opposite Chrisgold Plaza, Beside MTN Office, Mararaba",
//     "Along Nyanya-Jikwoyi Road, Nyanya, Abuja",
//     "Beside Utako Police Station, Utako, Abuja",
//     "Off Obafemi Awolowo Expressway, Utako, Abuja",
//     "Beside Wema Bank Banex, Wuse 2",
//     "Opposite Lagos Line, Zuba",
//   ],
//   Adamawa: ["Fire Service Roundabout, Jimeta, Yola"],
//   Anambra: [
//     "Crunchies Fries, Enugu/Onitsha Expressway, Awka",
//     "The Salvation Army Church, Umudim, Nnewi",
//     "All Saints' Anglican Cathedral, Onitsha",
//   ],
// "Akwa Ibom": [
//     "Opposite Royalty Hotel, Eket",
//     "Itam industrial Layout, Opposite Timber Market, Itam",
//     "Beside First Bank, Uyo",
//   ],
//   Bauchi: ["Opposite Gwaram and Sons Plaza, Yandoka Road, Bauchi"],
//   Bayelsa: [
//     "Opposite Wema Bank, By INEC Junction, Yenogoa",
//     "Tamic Road Junction, Okutukutu, Yenegoa",
//   ],
//   Benue: ["Opposite Dester, By Savannah Roundabout, Makurdi"],
//   Borno: ["Opposite Elkanemi College, Jos Road, Maiduguri"],
//   "Cross River": [
//     "29 Ndidem Usang Iso Road, Calabar",
//     "Beside UNICAL, Opposite MTN Office, Calabar",
//   ],
//   Delta: [
//     "Asaba-Onitsha Expressway, By Head Bridge",
//     "Opposite Zenith Bank, Asaba",
//     "Okpanam Road, Asaba",
//     "Off Ughelli-Warri Expressway, Ughelli",
//     "Effurun, Opposite Our Ladies High School",
//     "128 Effurun-Sapele Road, Opposite Solidas, By 7UP Bus Stop",
//   ],
//   Ebonyi: ["Opposite International Market, Abakaliki"],
//   Edo: [
//     "Omegatron Plaza, 47 Airport Road, Benin City",
//     "112 Akpakpava Road, Benin City",
//     "Opposite Auchi Polytechnic Sport Complex, Auchi-Okene Expressway, Auchi",
//     "Along Benin-Auchi Expressway, Beside Big Joe Park, Ekpoma",
//     "42 Benin-Agbor Road, EcoBus Park, Ramat, Benin City",
//     "Beside Genesis Restaurant, Opposite Uwa Junction, Benin City",
//     "202 Uselu-Lagos Road, Ugbowo, Benin City",
//   ],
//   Ekiti: [
//     "Soladola Filling Station, Beside APC Secretariat, Along Ikere Road, Ajilosun",
//   ],
//   Enugu: [
//     "Opposite Osisatech Polytechnic, Enugu",
//     "67 Zik Avenue, Uwani, Enugu",
//     "64 Owerrani, Enugu Road, Nsukka",
//   ],
//   Gombe: ["Along FTH/Police Headquarters, Ashaka Road, Gombe"],

//   Imo: [
//     "Relief Road, By Relief Junction, Off Egbu Road, Owerri",
//     "Odonko Plaza, No. 7 Nwaturuocha Street, Ikenegbu, Owerri",
//     "Along Umuguma Road (World Bank Last Roundabout), New Owerri",
//   ],
//   Jigawa: ["Government House Roundabout, Asamau House, Dutse"],
//   Kaduna: [
//     "Jos Road Plaza, 19/20 Jos Road, By Ahmadu Bello Way, Kaduna",
//     "Opposite Kaduna Old Airport Road, Kaduna",
//     "Nnamdi Azikiwe Expressway, By Command Junction",
//     "Beside Shagalinku London Hotel, Sabon Gari, Zaria",
//   ],
//   Kano: [
//     "By Tafawa Balewa Way, Opposite Domino's Pizza, Kano",
//     "Centro Plaza, Opposite BUK Old Site, Kabuga, Kano",
//     "Zaria Road, Opposite Kano State House of Assembly",
//   ],
//   Katsina: [
//     "Abudullahi Sarki Muktar Road, Near Tukur Jikamshi Residence, Katsina",
//   ],
//   Kebbi: ["Opposite Alhaji Boye Coca-Cola Depot, Birnin Kebbi"],
//   Kogi: ["Lokoja, Close to Federal Medical Center"],
//   Kwara: [
//     "Adjacent Chicken Republic, Ilorin",
//     "34B University of Ilorin Road, Tanke, Ilorin",
//   ],
//   Lagos: [
//     "568 Abeokuta Expressway, Ajala Bus Stop, Abule-Egba",
//     "Tripple Ace Dew Building, Opposite Enyo Filling Station, Addo Road",
//     "Morogbo, Along Badagry Expressway, Agbara",
//     "KM 25, Lekki-Epe Expressway, Ajiwe-Ajah",
//     "KM 22, Lekki-Epe Expressway, By Abraham Adesanya Roundabout, Ajah",
//     "41 Shasha Road, Akowonjo Junction, Dopemu",
//     "By Dobbil Avenue, Along Phone Village Road, Alaba International Market",
//     "Opposite Diamond Estate, By Festac Link Bridge, Amuwo Odofin",
//     "By Ogunfayo Bus Stop, KM 36, Lekki-Epe Expressway, Eputu, Awoyaya",
//     "158 Broad Street, Lagos Island (Behind UBA Head Office, Marina)",
//     "103 Okota Road, Cele",
//     "Beside Petrocam Filling Station, Near Epe T-Junction, Epe",
//     "69 Ikorodu Road, Fadeyi",
//     "Festac First Gate, Beside INEC Office, Festac Town",
//     "7 Hospital Road, Ifako, Gbagada",
//     "Gbagada Expressway, Beside Eterna Filling Station, Gbagada",
//     "KM 17, Scapular Plaza, Igbo Efon",
//     "9 Medical Road, Former Simbiat Abiola Way, Opposite Zenith Bank",
//     "80 Awolowo Way, Ikeja",
//     "103 Awolowo Road, Ikoyi",
//     "16 Ikosi Road, Ketu",
//     "Sabo Road Garage, Ikorodu",
//     "29 Idimu Road, Opposite Local Government Council, Ikotun",
//     "12 Industrial Avenue, Cappa Bus Stop, Ilupeju",
//     "Lagos International Trade Fair Complex",
//     "164 Lagos-Abeokuta Expressway, Beside Access Bank, Iyana Ipaja",
//     "43 Osolo Way, Ajao Estate, Ekwu Awolo House",
//     "GIGM Terminal, 20 Ikorodu Express Road, Jibowu",
//     "No. 1A, Wole Ariyo Street, Beside First Bank, Lekki Phase 1",
//     "Jubilee Mall, Admiralty Way, Lekki Phase 1, Lekki",
//     "2 Admiralty Road, Lekki Phase 1",
//     "Ground floor, Legends Place Mall, Plot 29 Fola Osibo, Lekki Phase 1",
//     "3 Ijaiye Road, Beside FCMB, Ogba",
//     "141 Ogudu Road, Beside UBA, Studio24 Building, Ogudu",
//     "Opposite Divas Cake, Beside Access Bank, Ojodu Berger Bus Stop",
//     "Old Ojo Road, After Agboju Bus Stop, Opposite Access Bank",
//     "Banex Mall, Suite V.GL 01, Akiogun Road, Oniru",
//     "62B Opebi Road, Opposite So-Fresh, Opebi, Ikeja",
//     "Orchid Road (E-MALL Plaza), By Van Daniel's Estate, Orchid",
//     "2 Ganiu Eletu Way, Osapa London, Lekki-Epe Expressway",
//     "25 Otto Causeway, Opposite Iddo Bus Stop, Iddo Ebute Metta",
//     "26 Adeniran Ogunsanya, Surulere",
//     "169 Badagry Expressway, Volkswagen Bus Stop",
//     "1436 Sanusi Fafunwa Street, Victoria Island",
//     "272b Akin Adeshola Street, Beside Honda Place, Victoria Island",
//     "Tejuosho Ultra Modern Shopping Complex, Ojuelegba Road, Yaba",
//   ],
//   Nasarawa: ["Police Officers' Mess, Opposite Polaris Bank, Jos Road, Lafia"],
//   Niger: ["Beside NEPA Office, Farm Center Area, Tunga, Minna"],
//   Ogun: [
//     "62 Tinubu Street, Ita Eko, Abeokuta",
//     "SSANU Complex, Beside Paradise, FUNAAB, Abeokuta",
//     "102 Ibadan Road, Opposite NEPA Office, Ibadan Garage, Ijebu Ode",
//     "3 Abeokuta-Lagos Expressway, Opposite Sango Bridge, Sango Ota",
//   ],
//   Ondo: [
//     "22 Oyemekun Road, Opposite SLOT, Akure",
//     "30 Yaba Street, Opposite Crunchies, Ondo Town",
//   ],
//   Osun: [
//     "EXODUS Filling Station, Mayfair, Ile-lfe, Osun State",
//     "Gbongan-Ibadan Road, NIPCO Filling Station, Ogo Oluwa, Osogbo",
//   ],
//   Oyo: [
//     "Town Planning Complex, By Sumal Foods, Ring Road, Ibadan",
//     "Opposite Funcktionals Clothing, Bodija-UI Road, UI, Ibadan",
//     "Adjacent Olowo Tin Fowo Shanu Shopping Complex, Iwo Road, Ibadan",
//     "Eterna Filling Station (Akala Complex), Starlight, Ogbomoso"
//   ],
//   Plateau: [
//     "Plaza 1080, Yakubu Gowon Way, Dadin Kowa Second Gate",
//     "Opposite Jankwano, Bingham University Teaching Hospital, Jos"
//   ],
//   Rivers: [
//     "18 Ada George, By Okilton Junction, Port Harcourt",
//     "Linus Book Shop Building, Beside Today FM Road, East-West Road, PHC",
//     "Cocaine Village Junction, Off Aba Road, Rumuogba, Port Harcourt",
//     "299 Old Refinery Road, By De-Young Junction, Elelenwo, Port Harcourt",
//     "Emmanuel Plaza, G.U. Ake Road, Eliogbolo, Eliozu, Port Harcourt",
//     "61 Olu Obasanjo Road, Opposite Olu Obasanjo Roundabout, Port Harcourt",
//     "89 Peter Odili Road, Besides Eterna Filling Station, Port Harcourt",
//     "Big Treat Rukpokwu, KM 16 Airport Road, Port Harcourt",
//     "9 Stadium Road, Beside Benjack, Port Harcourt",
//     "67 Tombia Ext, GRA, Port Harcourt",
//     "Agora Plaza, 118 Woji Road, By Bodo Junction, GRA Phase 2, Port Harcourt",

//   ],
//   Sokoto: [
//     "3/4 Maiduguri Road, Gawon Nama Area"
//   ],
//   Taraba: [
//     "106 White Castle Plaza, Barde Way, Jalingo"
//   ],
//   Yobe: [
//     "Shop 2, Adhaza Plaza, Gashuwa Road, Damaturu"
//   ],
//   Zamfara: ["C1, A.A. Master Plaza, Canteen Road, Gusau"],
// };

// export default function CheckoutPage() {
//   const [buyerCoordinates, setBuyerCoordinates] = useState<{
//     latitude: number | null;
//     longitude: number | null;
//   }>({ latitude: null, longitude: null });

//   // Replace local state with Zustand store
//   const {
//     checkoutData,
//     setCustomerInfo,
//     setCustomerAddress,
//     setDeliveryInstructions,
//     setCurrentStep,
//     clearCheckoutData,
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
//   const router = useRouter();

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
//         if (
//           logisticsPricingData.data.buyerLatitude &&
//           logisticsPricingData.data.buyerLongitude
//         ) {
//           setBuyerCoordinates({
//             latitude: logisticsPricingData.data.buyerLatitude,
//             longitude: logisticsPricingData.data.buyerLongitude,
//           });
//         } else {
//           setBuyerCoordinates({
//             latitude: 6.5244 + (Math.random() - 0.5) * 0.1,
//             longitude: 3.3792 + (Math.random() - 0.5) * 0.1,
//           });
//         }
//       }
//     } else if (logisticsPricingError) {
//       console.error("Logistics pricing error:", logisticsPricingError);
//       // Update store with fallback fee
//       updateDeliveryFee(1500);
//       setBuyerCoordinates({
//         latitude: 6.5244 + (Math.random() - 0.5) * 0.1,
//         longitude: 3.3792 + (Math.random() - 0.5) * 0.1,
//       });
//     }
//   }, [logisticsPricingData, logisticsPricingError, updateDeliveryFee]);

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
//         variantColor: summary.item.color,
//         variantSize: summary.item.size,
//       }),
//       // For non-variation items, use product-level color and size
//       ...(!summary.item.variationId && {
//         productColor: summary.item.color,
//         productSize: summary.item.size,
//       }),
//     }));
//   };

//   const prepareOrderData = (paymentReference: string) => {
//     const orderData = {
//       // Buyer information
//       buyerName: checkoutData.customerInfo.name,
//       buyerEmail: checkoutData.customerInfo.email,
//       buyerPhone: checkoutData.customerInfo.phone,
//       buyerAddress: checkoutData.customerAddress.streetAddress,
//       buyerLga: checkoutData.customerAddress.lga,
//       buyerState: checkoutData.customerAddress.state,
//       buyerDirections: checkoutData.customerAddress.directions || "",
//       buyerInstructions: checkoutData.deliveryInstructions || "",
//       buyerLatitude: buyerCoordinates.latitude,
//       buyerLongitude: buyerCoordinates.longitude,
//       paymentMethod: "online",
//       totalAmount: total,
//       deliveryFee: deliveryFee,
//       platform: orderSummaries[0]?.platform || platform,
//       subdomain:
//         (orderSummaries[0].platform === "store" &&
//           orderSummaries[0].referralId) ||
//         "",
//       plugId:
//         (orderSummaries[0]?.platform !== "store" &&
//           orderSummaries[0]?.referralId) ||
//         "",
//       orderItems: formatOrderItems(),
//       // Payment reference for online payments
//       paymentReference,
//     };
//     return orderData;
//   };

//   const placeOrder = async (paymentReference: string) => {
//     try {
//       setIsLoading(true);
//       const orderData = prepareOrderData(paymentReference);
//       const response = await fetch("/api/orders/place-order", {
//         method: "POST",
//         headers: {
//           "Content-Type": "application/json",
//         },
//         body: JSON.stringify(orderData),
//       });

//       if (!response.ok) {
//         const errorData = await response.json();
//         errorToast(errorData.error || "Failed to place order");
//         clearCheckoutData();
//         clearOrderSummaries();
//         router.replace("/order-error");
//         return;
//       }

//       const result = await response.json();
//       successToast(result.message || "Order placed successfully");

//       // Store order success data for thank you page
//       if (result.data) {
//         sessionStorage.setItem("orderSuccess", JSON.stringify(result.data));
//       }

//       // Clear all checkout data and order summary
//       clearCheckoutData();
//       clearOrderSummaries();

//       // Navigate to thank you page
//       router.replace("/thank-you");
//       return result;
//     } catch (error) {
//       console.error("Error placing order:", error);
//       errorToast("An error occurred while placing the order");
//     } finally {
//       setIsLoading(false);
//     }
//   };

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
//             color: item.variation
//               ? product.variations?.find((v: any) => v.id === item.variation)
//                   ?.color
//               : undefined,
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
//           };
//         });

//       // Update the store with transformed data
//       if (transformedOrderSummaries.length > 0) {
//         setOrderSummaries(transformedOrderSummaries);
//       }
//     }
//   }, [platform, productsData, isProductsLoading, ref, setOrderSummaries]);

//   // Calculate delivery fee based on method and logistics pricing
//   const getDeliveryFee = () => {
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

//     // Initialize form with stored data
//     setValue("customerInfo.name", checkoutData.customerInfo.name || "");
//     setValue("customerInfo.email", checkoutData.customerInfo.email || "");
//     setValue("customerInfo.phone", checkoutData.customerInfo.phone || "");
//     setValue(
//       "customerAddress.streetAddress",
//       checkoutData.customerAddress.streetAddress || ""
//     );
//     setValue("customerAddress.state", checkoutData.customerAddress.state || "");
//     setValue("customerAddress.lga", checkoutData.customerAddress.lga || "");
//     setValue(
//       "customerAddress.directions",
//       checkoutData.customerAddress.directions || ""
//     );
//   }, [setValue, checkoutData]);

//   // Watch state changes to update LGAs
//   useEffect(() => {
//     if (watchedState && watchedState !== selectedState) {
//       setSelectedState(watchedState);
//       const lgas = getLgasForState(watchedState);
//       setAvailableLgas(lgas);
//       // Update the state in the store
//       setCustomerAddress({ state: watchedState });
//     }
//   }, [watchedState, selectedState, setValue, setCustomerAddress]);

//   // Watch form values for real-time validation and store updates
//   const watchedCustomerInfo = watch("customerInfo");
//   const watchedCustomerAddress = watch("customerAddress");

//   useEffect(() => {
//     if (watchedCustomerInfo) {
//       setCustomerInfo(watchedCustomerInfo);
//     }
//   }, [watchedCustomerInfo, setCustomerInfo]);

//   useEffect(() => {
//     if (watchedCustomerAddress) {
//       setCustomerAddress(watchedCustomerAddress);
//     }
//   }, [watchedCustomerAddress, setCustomerAddress]);

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

//   const continueToReview = () => {
//     goToNextStep();
//     if (orderSummaries.length > 0) {
//       orderSummaries.forEach((orderSummary) => {
//         mutate(
//           `/public/products/${orderSummary.item.id}${orderSummary.referralId}`
//         );
//       });
//     }
//   };

//   const showPaymentCancelledModal = () => {
//     // You could use a toast library or custom modal
//     setShowCancelledModal(true);
//   };

//   const paystackConfig = {
//     email: watchedCustomerInfo?.email || "",
//     amount: total * 100, // Paystack expects amount in kobo
//     metadata: {
//       name: watchedCustomerInfo?.name || "",
//       phone: watchedCustomerInfo?.phone || "",
//       address: watchedCustomerAddress
//         ? `${watchedCustomerAddress.streetAddress}, ${watchedCustomerAddress.lga}, ${watchedCustomerAddress.state}`
//         : "",
//       custom_fields: [
//         {
//           display_name: "Order Items",
//           variable_name: "order_items",
//           value: cartItems
//             ?.map((item) => `${item.name} x${item.quantity}`)
//             .join(", "),
//         },
//       ],
//     },
//     publicKey: process.env.NEXT_PUBLIC_PAYSTACK_PUBLIC_KEY,
//     text: isLoading ? "Processing..." : "Place Order",
//     onSuccess: async (reference) => {
//       try {
//         await placeOrder(reference.reference);
//       } catch (error) {
//         console.error("Error placing order after successful payment:", error);
//       }
//     },
//     onClose: () => {
//       showPaymentCancelledModal();
//     },
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

//   const renderPlaceOrderButton = () => {
//     // Only render PaystackButton on client side
//     if (!isClient) {
//       return <Button className="flex-1">Loading Payment...</Button>;
//     }

//     return (
//       <PaystackButton
//         {...paystackConfig}
//         className="flex-1 bg-primary text-primary-foreground hover:bg-primary/90 h-10 px-4 py-2 rounded-md font-medium transition-colors"
//       />
//     );
//   };

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

//                           {(selectedState === "Lagos" ||
//                             selectedState === "Ogun") && (
//                             <div className="space-y-2">
//                               <Label>
//                                 Delivery Type{" "}
//                                 <span className="text-red-500">*</span>
//                               </Label>
//                               <div className="flex gap-4">
//                                 <div className="flex items-center space-x-2">
//                                   <input
//                                     type="radio"
//                                     id="terminal"
//                                     name="deliveryType"
//                                     value="terminal"
//                                     checked={deliveryType === "terminal"}
//                                     onChange={(e) =>
//                                       setDeliveryType(
//                                         e.target.value as "terminal" | "home"
//                                       )
//                                     }
//                                     className="w-4 h-4 text-blue-600"
//                                   />
//                                   <Label
//                                     htmlFor="terminal"
//                                     className="font-normal"
//                                   >
//                                     Terminal Pickup
//                                   </Label>
//                                 </div>
//                                 <div className="flex items-center space-x-2">
//                                   <input
//                                     type="radio"
//                                     id="home"
//                                     name="deliveryType"
//                                     value="home"
//                                     checked={deliveryType === "home"}
//                                     onChange={(e) =>
//                                       setDeliveryType(
//                                         e.target.value as "terminal" | "home"
//                                       )
//                                     }
//                                     className="w-4 h-4 text-blue-600"
//                                   />
//                                   <Label htmlFor="home" className="font-normal">
//                                     Home Delivery
//                                   </Label>
//                                 </div>
//                               </div>
//                               <p className="text-sm text-muted-foreground">
//                                 Terminal pickup locations are GIG Logistics
//                                 pickup offices where you can collect your order.
//                               </p>
//                             </div>
//                           )}

//                           {selectedState &&
//                             deliveryType === "terminal" &&
//                             terminalAddresses[
//                               selectedState as keyof typeof terminalAddresses
//                             ] && (
//                               <div className="space-y-2">
//                                 <Label>
//                                   Select Terminal{" "}
//                                   <span className="text-red-500">*</span>
//                                 </Label>
//                                 <p className="text-sm text-muted-foreground mb-2">
//                                   Choose a GIG Logistics office near you for
//                                   pickup:
//                                 </p>
//                                 <div className="border rounded-md max-h-48 overflow-y-auto">
//                                   {terminalAddresses[
//                                     selectedState as keyof typeof terminalAddresses
//                                   ].map((address) => (
//                                     <div
//                                       key={address}
//                                       className="p-2 cursor-pointer hover:bg-muted"
//                                       onClick={() =>
//                                         setSelectedTerminal(address)
//                                       }
//                                     >
//                                       {address}
//                                     </div>
//                                   ))}
//                                 </div>
//                               </div>
//                             )}
//                         </div>
//                       </div>
//                     </div>
//                   </CardContent>
//                 </Card>
//               )}
//             </div>
//           </div>
//         </div>
//       )}
//     </div>
//   );
// }



// "use client";
// import { useState, useEffect, useMemo } from "react";
// import dynamic from "next/dynamic";
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

// // Dynamic import of PaystackButton to prevent SSR issues
// const PaystackButton = dynamic(
//   () => import("react-paystack").then((mod) => mod.PaystackButton),
//   {
//     ssr: false,
//     loading: () => <Button className="flex-1">Loading Payment...</Button>,
//   }
// );

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

// const terminalAddresses = {
//   Abia: [
//     "Asa Road, Former NITEL Building, Aba",
//     "G.R.A, After Jevinic Restaurant, Aba",
//     "Opposite Villaroy Hotel, Umuahia Main Town",
//     "Close to MTN Office, Aba Road, Umuahia",
//   ],

//   "Federal Capital Territory": [
//     "Ademola Adetokunbo Crescent, Wuse 2",
//     "Area 1 Shopping Plaza, Area 1, Abuja",
//     "Beside Lifemate Furniture, Area 11, Garki",
//     "3rd Avenue Gwarinpa, Opposite Union Bank, Abuja",
//     "Opposite DIVIB Plaza, By 7th Avenue Junction, Gwarinpa",
//     "Opposite Aso-Oke Hotel, Gwagwalada",
//     "Gado Nasko Way, Along El-Rufai Bus Stop, Kubwa",
//     "Plot 17, Gidan Dutse Layout, Kubwa",
//     "Kukwaba General Park, Kubwa",
//     "Beside Remaco Filling Station, Lugbe",
//     "Along Zuba Expressway, Madalla",
//     "Opposite Chrisgold Plaza, Beside MTN Office, Mararaba",
//     "Along Nyanya-Jikwoyi Road, Nyanya, Abuja",
//     "Beside Utako Police Station, Utako, Abuja",
//     "Off Obafemi Awolowo Expressway, Utako, Abuja",
//     "Beside Wema Bank Banex, Wuse 2",
//     "Opposite Lagos Line, Zuba",
//   ],
//   Adamawa: ["Fire Service Roundabout, Jimeta, Yola"],
//   Anambra: [
//     "Crunchies Fries, Enugu/Onitsha Expressway, Awka",
//     "The Salvation Army Church, Umudim, Nnewi",
//     "All Saints' Anglican Cathedral, Onitsha",
//   ],
//   "Akwa Ibom": [
//     "Opposite Royalty Hotel, Eket",
//     "Itam industrial Layout, Opposite Timber Market, Itam",
//     "Beside First Bank, Uyo",
//   ],
//   Bauchi: ["Opposite Gwaram and Sons Plaza, Yandoka Road, Bauchi"],
//   Bayelsa: [
//     "Opposite Wema Bank, By INEC Junction, Yenogoa",
//     "Tamic Road Junction, Okutukutu, Yenegoa",
//   ],
//   Benue: ["Opposite Dester, By Savannah Roundabout, Makurdi"],
//   Borno: ["Opposite Elkanemi College, Jos Road, Maiduguri"],
//   "Cross River": [
//     "29 Ndidem Usang Iso Road, Calabar",
//     "Beside UNICAL, Opposite MTN Office, Calabar",
//   ],
//   Delta: [
//     "Asaba-Onitsha Expressway, By Head Bridge",
//     "Opposite Zenith Bank, Asaba",
//     "Okpanam Road, Asaba",
//     "Off Ughelli-Warri Expressway, Ughelli",
//     "Effurun, Opposite Our Ladies High School",
//     "128 Effurun-Sapele Road, Opposite Solidas, By 7UP Bus Stop",
//   ],
//   Ebonyi: ["Opposite International Market, Abakaliki"],
//   Edo: [
//     "Omegatron Plaza, 47 Airport Road, Benin City",
//     "112 Akpakpava Road, Benin City",
//     "Opposite Auchi Polytechnic Sport Complex, Auchi-Okene Expressway, Auchi",
//     "Along Benin-Auchi Expressway, Beside Big Joe Park, Ekpoma",
//     "42 Benin-Agbor Road, EcoBus Park, Ramat, Benin City",
//     "Beside Genesis Restaurant, Opposite Uwa Junction, Benin City",
//     "202 Uselu-Lagos Road, Ugbowo, Benin City",
//   ],
//   Ekiti: [
//     "Soladola Filling Station, Beside APC Secretariat, Along Ikere Road, Ajilosun",
//   ],
//   Enugu: [
//     "Opposite Osisatech Polytechnic, Enugu",
//     "67 Zik Avenue, Uwani, Enugu",
//     "64 Owerrani, Enugu Road, Nsukka",
//   ],
//   Gombe: ["Along FTH/Police Headquarters, Ashaka Road, Gombe"],

//   Imo: [
//     "Relief Road, By Relief Junction, Off Egbu Road, Owerri",
//     "Odonko Plaza, No. 7 Nwaturuocha Street, Ikenegbu, Owerri",
//     "Along Umuguma Road (World Bank Last Roundabout), New Owerri",
//   ],
//   Jigawa: ["Government House Roundabout, Asamau House, Dutse"],
//   Kaduna: [
//     "Jos Road Plaza, 19/20 Jos Road, By Ahmadu Bello Way, Kaduna",
//     "Opposite Kaduna Old Airport Road, Kaduna",
//     "Nnamdi Azikiwe Expressway, By Command Junction",
//     "Beside Shagalinku London Hotel, Sabon Gari, Zaria",
//   ],
//   Kano: [
//     "By Tafawa Balewa Way, Opposite Domino's Pizza, Kano",
//     "Centro Plaza, Opposite BUK Old Site, Kabuga, Kano",
//     "Zaria Road, Opposite Kano State House of Assembly",
//   ],
//   Katsina: [
//     "Abudullahi Sarki Muktar Road, Near Tukur Jikamshi Residence, Katsina",
//   ],
//   Kebbi: ["Opposite Alhaji Boye Coca-Cola Depot, Birnin Kebbi"],
//   Kogi: ["Lokoja, Close to Federal Medical Center"],
//   Kwara: [
//     "Adjacent Chicken Republic, Ilorin",
//     "34B University of Ilorin Road, Tanke, Ilorin",
//   ],
//   Lagos: [
//     "568 Abeokuta Expressway, Ajala Bus Stop, Abule-Egba",
//     "Tripple Ace Dew Building, Opposite Enyo Filling Station, Addo Road",
//     "Morogbo, Along Badagry Expressway, Agbara",
//     "KM 25, Lekki-Epe Expressway, Ajiwe-Ajah",
//     "KM 22, Lekki-Epe Expressway, By Abraham Adesanya Roundabout, Ajah",
//     "41 Shasha Road, Akowonjo Junction, Dopemu",
//     "By Dobbil Avenue, Along Phone Village Road, Alaba International Market",
//     "Opposite Diamond Estate, By Festac Link Bridge, Amuwo Odofin",
//     "By Ogunfayo Bus Stop, KM 36, Lekki-Epe Expressway, Eputu, Awoyaya",
//     "158 Broad Street, Lagos Island (Behind UBA Head Office, Marina)",
//     "103 Okota Road, Cele",
//     "Beside Petrocam Filling Station, Near Epe T-Junction, Epe",
//     "69 Ikorodu Road, Fadeyi",
//     "Festac First Gate, Beside INEC Office, Festac Town",
//     "7 Hospital Road, Ifako, Gbagada",
//     "Gbagada Expressway, Beside Eterna Filling Station, Gbagada",
//     "KM 17, Scapular Plaza, Igbo Efon",
//     "9 Medical Road, Former Simbiat Abiola Way, Opposite Zenith Bank",
//     "80 Awolowo Way, Ikeja",
//     "103 Awolowo Road, Ikoyi",
//     "16 Ikosi Road, Ketu",
//     "Sabo Road Garage, Ikorodu",
//     "29 Idimu Road, Opposite Local Government Council, Ikotun",
//     "12 Industrial Avenue, Cappa Bus Stop, Ilupeju",
//     "Lagos International Trade Fair Complex",
//     "164 Lagos-Abeokuta Expressway, Beside Access Bank, Iyana Ipaja",
//     "43 Osolo Way, Ajao Estate, Ekwu Awolo House",
//     "GIGM Terminal, 20 Ikorodu Express Road, Jibowu",
//     "No. 1A, Wole Ariyo Street, Beside First Bank, Lekki Phase 1",
//     "Jubilee Mall, Admiralty Way, Lekki Phase 1, Lekki",
//     "2 Admiralty Road, Lekki Phase 1",
//     "Ground floor, Legends Place Mall, Plot 29 Fola Osibo, Lekki Phase 1",
//     "3 Ijaiye Road, Beside FCMB, Ogba",
//     "141 Ogudu Road, Beside UBA, Studio24 Building, Ogudu",
//     "Opposite Divas Cake, Beside Access Bank, Ojodu Berger Bus Stop",
//     "Old Ojo Road, After Agboju Bus Stop, Opposite Access Bank",
//     "Banex Mall, Suite V.GL 01, Akiogun Road, Oniru",
//     "62B Opebi Road, Opposite So-Fresh, Opebi, Ikeja",
//     "Orchid Road (E-MALL Plaza), By Van Daniel's Estate, Orchid",
//     "2 Ganiu Eletu Way, Osapa London, Lekki-Epe Expressway",
//     "25 Otto Causeway, Opposite Iddo Bus Stop, Iddo Ebute Metta",
//     "26 Adeniran Ogunsanya, Surulere",
//     "169 Badagry Expressway, Volkswagen Bus Stop",
//     "1436 Sanusi Fafunwa Street, Victoria Island",
//     "272b Akin Adeshola Street, Beside Honda Place, Victoria Island",
//     "Tejuosho Ultra Modern Shopping Complex, Ojuelegba Road, Yaba",
//   ],
//   Nasarawa: ["Police Officers' Mess, Opposite Polaris Bank, Jos Road, Lafia"],
//   Niger: ["Beside NEPA Office, Farm Center Area, Tunga, Minna"],
//   Ogun: [
//     "62 Tinubu Street, Ita Eko, Abeokuta",
//     "SSANU Complex, Beside Paradise, FUNAAB, Abeokuta",
//     "102 Ibadan Road, Opposite NEPA Office, Ibadan Garage, Ijebu Ode",
//     "3 Abeokuta-Lagos Expressway, Opposite Sango Bridge, Sango Ota",
//   ],
//   Ondo: [
//     "22 Oyemekun Road, Opposite SLOT, Akure",
//     "30 Yaba Street, Opposite Crunchies, Ondo Town",
//   ],
//   Osun: [
//     "EXODUS Filling Station, Mayfair, Ile-lfe, Osun State",
//     "Gbongan-Ibadan Road, NIPCO Filling Station, Ogo Oluwa, Osogbo",
//   ],
//   Oyo: [
//     "Town Planning Complex, By Sumal Foods, Ring Road, Ibadan",
//     "Opposite Funcktionals Clothing, Bodija-UI Road, UI, Ibadan",
//     "Adjacent Olowo Tin Fowo Shanu Shopping Complex, Iwo Road, Ibadan",
//     "Eterna Filling Station (Akala Complex), Starlight, Ogbomoso",
//   ],
//   Plateau: [
//     "Plaza 1080, Yakubu Gowon Way, Dadin Kowa Second Gate",
//     "Opposite Jankwano, Bingham University Teaching Hospital, Jos",
//   ],
//   Rivers: [
//     "18 Ada George, By Okilton Junction, Port Harcourt",
//     "Linus Book Shop Building, Beside Today FM Road, East-West Road, PHC",
//     "Cocaine Village Junction, Off Aba Road, Rumuogba, Port Harcourt",
//     "299 Old Refinery Road, By De-Young Junction, Elelenwo, Port Harcourt",
//     "Emmanuel Plaza, G.U. Ake Road, Eliogbolo, Eliozu, Port Harcourt",
//     "61 Olu Obasanjo Road, Opposite Olu Obasanjo Roundabout, Port Harcourt",
//     "89 Peter Odili Road, Besides Eterna Filling Station, Port Harcourt",
//     "Big Treat Rukpokwu, KM 16 Airport Road, Port Harcourt",
//     "9 Stadium Road, Beside Benjack, Port Harcourt",
//     "67 Tombia Ext, GRA, Port Harcourt",
//     "Agora Plaza, 118 Woji Road, By Bodo Junction, GRA Phase 2, Port Harcourt",
//   ],
//   Sokoto: ["3/4 Maiduguri Road, Gawon Nama Area"],
//   Taraba: ["106 White Castle Plaza, Barde Way, Jalingo"],
//   Yobe: ["Shop 2, Adhaza Plaza, Gashuwa Road, Damaturu"],
//   Zamfara: ["C1, A.A. Master Plaza, Canteen Road, Gusau"],
// };

// const TerminalPickupPrices = {
//   Lagos: 1800,
//   Ogun: 2700,
//   Oyo: 3500, // Ibadan & Ogbomoso
//   Osun: 4500,
//   Ekiti: 4500,
//   Ondo: 4500,
//   Edo: 4500,

//   // Middle/South-South/North Central (₦6000)
//   Bayelsa: 6000,
//   "Cross River": 6000,
//   Anambra: 6000,
//   Rivers: 6000,
//   "Federal Capital Territory": 6000,
//   Enugu: 6000,
//   Imo: 6000,
//   Abia: 6000,
//   Delta: 6000,
//   Benue: 6000,
//   Ebonyi: 6000,
//   Kogi: 6000,
//   Kwara: 6000,
//   Plateau: 6000,
//   Nasarawa: 6000,
//   Niger: 6000,
//   "Akwa Ibom": 6000,

//   // Upper North (₦7000)
//   Kaduna: 7000,
//   Kano: 7000,
//   Katsina: 7000,
//   Kebbi: 7000,
//   Sokoto: 7000,
//   Borno: 7000,
//   Jigawa: 7000,
//   Yobe: 7000,
//   Zamfara: 7000,
//   Gombe: 7000,
//   Bauchi: 7000,
//   Adamawa: 7000,
//   Taraba: 7000,
// };


// export default function CheckoutPage() {
//   const [buyerCoordinates, setBuyerCoordinates] = useState<{
//     latitude: number | null;
//     longitude: number | null;
//   }>({ latitude: null, longitude: null });

//   // Replace local state with Zustand store
//   const {
//     checkoutData,
//     setCustomerInfo,
//     setCustomerAddress,
//     setDeliveryInstructions,
//     setCurrentStep,
//     clearCheckoutData,
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
//   const router = useRouter();

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
//         if (
//           logisticsPricingData.data.buyerLatitude &&
//           logisticsPricingData.data.buyerLongitude
//         ) {
//           setBuyerCoordinates({
//             latitude: logisticsPricingData.data.buyerLatitude,
//             longitude: logisticsPricingData.data.buyerLongitude,
//           });
//         } else {
//           setBuyerCoordinates({
//             latitude: 6.5244 + (Math.random() - 0.5) * 0.1,
//             longitude: 3.3792 + (Math.random() - 0.5) * 0.1,
//           });
//         }
//       }
//     } else if (logisticsPricingError) {
//       console.error("Logistics pricing error:", logisticsPricingError);
//       // Update store with fallback fee
//       updateDeliveryFee(1500);
//       setBuyerCoordinates({
//         latitude: 6.5244 + (Math.random() - 0.5) * 0.1,
//         longitude: 3.3792 + (Math.random() - 0.5) * 0.1,
//       });
//     }
//   }, [logisticsPricingData, logisticsPricingError, updateDeliveryFee]);

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
//         variantColor: summary.item.color,
//         variantSize: summary.item.size,
//       }),
//       // For non-variation items, use product-level color and size
//       ...(!summary.item.variationId && {
//         productColor: summary.item.color,
//         productSize: summary.item.size,
//       }),
//     }));
//   };

//   const prepareOrderData = (paymentReference: string) => {
//     const orderData = {
//       // Buyer information
//       buyerName: checkoutData.customerInfo.name,
//       buyerEmail: checkoutData.customerInfo.email,
//       buyerPhone: checkoutData.customerInfo.phone,
//       buyerAddress: checkoutData.customerAddress.streetAddress,
//       buyerLga: checkoutData.customerAddress.lga,
//       buyerState: checkoutData.customerAddress.state,
//       buyerDirections: checkoutData.customerAddress.directions || "",
//       buyerInstructions: checkoutData.deliveryInstructions || "",
//       buyerLatitude: buyerCoordinates.latitude,
//       buyerLongitude: buyerCoordinates.longitude,
//       paymentMethod: "online",
//       totalAmount: total,
//       deliveryFee: deliveryFee,
//       platform: orderSummaries[0]?.platform || platform,
//       subdomain:
//         (orderSummaries[0].platform === "store" &&
//           orderSummaries[0].referralId) ||
//         "",
//       plugId:
//         (orderSummaries[0]?.platform !== "store" &&
//           orderSummaries[0]?.referralId) ||
//         "",
//       orderItems: formatOrderItems(),
//       // Payment reference for online payments
//       paymentReference,
//     };
//     return orderData;
//   };

//   const placeOrder = async (paymentReference: string) => {
//     try {
//       setIsLoading(true);
//       const orderData = prepareOrderData(paymentReference);
//       const response = await fetch("/api/orders/place-order", {
//         method: "POST",
//         headers: {
//           "Content-Type": "application/json",
//         },
//         body: JSON.stringify(orderData),
//       });

//       if (!response.ok) {
//         const errorData = await response.json();
//         errorToast(errorData.error || "Failed to place order");
//         clearCheckoutData();
//         clearOrderSummaries();
//         router.replace("/order-error");
//         return;
//       }

//       const result = await response.json();
//       successToast(result.message || "Order placed successfully");

//       // Store order success data for thank you page
//       if (result.data) {
//         sessionStorage.setItem("orderSuccess", JSON.stringify(result.data));
//       }

//       // Clear all checkout data and order summary
//       clearCheckoutData();
//       clearOrderSummaries();

//       // Navigate to thank you page
//       router.replace("/thank-you");
//       return result;
//     } catch (error) {
//       console.error("Error placing order:", error);
//       errorToast("An error occurred while placing the order");
//     } finally {
//       setIsLoading(false);
//     }
//   };

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
//             color: item.variation
//               ? product.variations?.find((v: any) => v.id === item.variation)
//                   ?.color
//               : undefined,
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
//           };
//         });

//       // Update the store with transformed data
//       if (transformedOrderSummaries.length > 0) {
//         setOrderSummaries(transformedOrderSummaries);
//       }
//     }
//   }, [platform, productsData, isProductsLoading, ref, setOrderSummaries]);

//   // Calculate delivery fee based on method and logistics pricing
//   const getDeliveryFee = () => {
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

//     // Initialize form with stored data
//     setValue("customerInfo.name", checkoutData.customerInfo.name || "");
//     setValue("customerInfo.email", checkoutData.customerInfo.email || "");
//     setValue("customerInfo.phone", checkoutData.customerInfo.phone || "");
//     setValue(
//       "customerAddress.streetAddress",
//       checkoutData.customerAddress.streetAddress || ""
//     );
//     setValue("customerAddress.state", checkoutData.customerAddress.state || "");
//     setValue("customerAddress.lga", checkoutData.customerAddress.lga || "");
//     setValue(
//       "customerAddress.directions",
//       checkoutData.customerAddress.directions || ""
//     );
//   }, [setValue, checkoutData]);

//   // Watch state changes to update LGAs
//   useEffect(() => {
//     if (watchedState && watchedState !== selectedState) {
//       setSelectedState(watchedState);
//       const lgas = getLgasForState(watchedState);
//       setAvailableLgas(lgas);
//       // Update the state in the store
//       setCustomerAddress({ state: watchedState });
//     }
//   }, [watchedState, selectedState, setValue, setCustomerAddress]);

//   // Watch form values for real-time validation and store updates
//   const watchedCustomerInfo = watch("customerInfo");
//   const watchedCustomerAddress = watch("customerAddress");

//   useEffect(() => {
//     if (watchedCustomerInfo) {
//       setCustomerInfo(watchedCustomerInfo);
//     }
//   }, [watchedCustomerInfo, setCustomerInfo]);

//   useEffect(() => {
//     if (watchedCustomerAddress) {
//       setCustomerAddress(watchedCustomerAddress);
//     }
//   }, [watchedCustomerAddress, setCustomerAddress]);

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

//   const continueToReview = () => {
//     goToNextStep();
//     if (orderSummaries.length > 0) {
//       orderSummaries.forEach((orderSummary) => {
//         mutate(
//           `/public/products/${orderSummary.item.id}${orderSummary.referralId}`
//         );
//       });
//     }
//   };

//   const showPaymentCancelledModal = () => {
//     // You could use a toast library or custom modal
//     setShowCancelledModal(true);
//   };

//   const paystackConfig = {
//     email: watchedCustomerInfo?.email || "",
//     amount: total * 100, // Paystack expects amount in kobo
//     metadata: {
//       name: watchedCustomerInfo?.name || "",
//       phone: watchedCustomerInfo?.phone || "",
//       address: watchedCustomerAddress
//         ? `${watchedCustomerAddress.streetAddress}, ${watchedCustomerAddress.lga}, ${watchedCustomerAddress.state}`
//         : "",
//       custom_fields: [
//         {
//           display_name: "Order Items",
//           variable_name: "order_items",
//           value: cartItems
//             ?.map((item) => `${item.name} x${item.quantity}`)
//             .join(", "),
//         },
//       ],
//     },
//     publicKey: process.env.NEXT_PUBLIC_PAYSTACK_PUBLIC_KEY,
//     text: isLoading ? "Processing..." : "Place Order",
//     onSuccess: async (reference) => {
//       try {
//         await placeOrder(reference.reference);
//       } catch (error) {
//         console.error("Error placing order after successful payment:", error);
//       }
//     },
//     onClose: () => {
//       showPaymentCancelledModal();
//     },
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

//   const renderPlaceOrderButton = () => {
//     // Only render PaystackButton on client side
//     if (!isClient) {
//       return <Button className="flex-1">Loading Payment...</Button>;
//     }

//     return (
//       <PaystackButton
//         {...paystackConfig}
//         className="flex-1 bg-primary text-primary-foreground hover:bg-primary/90 h-10 px-4 py-2 rounded-md font-medium transition-colors"
//       />
//     );
//   };

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

//                           {selectedState &&
//                             (selectedState === "Lagos" ||
//                               selectedState === "Ogun") && (
//                               <div className="space-y-2">
//                                 <Label>
//                                   Delivery Type{" "}
//                                   <span className="text-red-500">*</span>
//                                 </Label>
//                                 <div className="flex gap-4">
//                                   <div className="flex items-center space-x-2">
//                                     <input
//                                       type="radio"
//                                       id="terminal"
//                                       name="deliveryType"
//                                       value="terminal"
//                                       checked={deliveryType === "terminal"}
//                                       onChange={(e) =>
//                                         setDeliveryType(
//                                           e.target.value as "terminal" | "home"
//                                         )
//                                       }
//                                       className="w-4 h-4 text-blue-600"
//                                     />
//                                     <Label
//                                       htmlFor="terminal"
//                                       className="font-normal"
//                                     >
//                                       Terminal Pickup
//                                     </Label>
//                                   </div>
//                                   <div className="flex items-center space-x-2">
//                                     <input
//                                       type="radio"
//                                       id="home"
//                                       name="deliveryType"
//                                       value="home"
//                                       checked={deliveryType === "home"}
//                                       onChange={(e) =>
//                                         setDeliveryType(
//                                           e.target.value as "terminal" | "home"
//                                         )
//                                       }
//                                       className="w-4 h-4 text-blue-600"
//                                     />
//                                     <Label
//                                       htmlFor="home"
//                                       className="font-normal"
//                                     >
//                                       Home Delivery
//                                     </Label>
//                                   </div>
//                                 </div>
//                                 <p className="text-sm text-muted-foreground">
//                                   Terminal pickup locations are GIG Logistics
//                                   pickup offices where you can collect your
//                                   order.
//                                 </p>
//                               </div>
//                             )}

//                           {selectedState &&
//                             deliveryType === "terminal" &&
//                             terminalAddresses[
//                               selectedState as keyof typeof terminalAddresses
//                             ] && (
//                               <div className="space-y-2">
//                                 <Label>
//                                   Select Terminal{" "}
//                                   <span className="text-red-500">*</span>
//                                 </Label>
//                                 <p className="text-sm text-muted-foreground mb-2">
//                                   Scroll to choose a GIG Logistics office near you for
//                                   pickup:
//                                 </p>
//                                 <div className="border rounded-md max-h-48 overflow-y-auto">
//                                   {terminalAddresses[
//                                     selectedState as keyof typeof terminalAddresses
//                                   ].map((terminal, index) => (
//                                     <div
//                                       key={index}
//                                       className={`p-3 border-b last:border-b-0 cursor-pointer hover:bg-muted/50 ${
//                                         selectedTerminal === terminal
//                                           ? "bg-blue-50 border-blue-200"
//                                           : ""
//                                       }`}
//                                       onClick={() =>
//                                         setSelectedTerminal(terminal)
//                                       }
//                                     >
//                                       <div className="flex items-start space-x-2">
//                                         <input
//                                           type="radio"
//                                           name="terminal"
//                                           value={terminal}
//                                           checked={
//                                             selectedTerminal === terminal
//                                           }
//                                           onChange={() =>
//                                             setSelectedTerminal(terminal)
//                                           }
//                                           className="w-4 h-4 text-blue-600 mt-1"
//                                         />
//                                         <span className="text-xs whitespace-normal break-words">
//                                           {terminal}
//                                         </span>
//                                       </div>
//                                     </div>
//                                   ))}
//                                 </div>
//                               </div>
//                             )}

//                           {selectedState && deliveryType === "home" && (
//                             <>
//                               {/* Address Specificity Message */}
//                               <Alert className="mb-4">
//                                 <Info className="h-4 w-4" />
//                                 <AlertDescription>
//                                   <strong>💡 Pro Tip:</strong> Providing a very
//                                   specific and detailed address helps our
//                                   logistics partners optimize delivery routes,
//                                   which can potentially reduce your delivery
//                                   costs. Include landmarks, building
//                                   descriptions, and clear directions.
//                                 </AlertDescription>
//                               </Alert>

//                               {/* LGA Selection */}
//                               <div className="space-y-2">
//                                 <Label htmlFor="lga">
//                                   Local Government Area{" "}
//                                   <span className="text-red-500">*</span>
//                                 </Label>
//                                 <Controller
//                                   name="customerAddress.lga"
//                                   control={control}
//                                   render={({ field }) => (
//                                     <Select
//                                       value={field.value}
//                                       onValueChange={async (value) => {
//                                         field.onChange(value);
//                                         setCustomerAddress({ lga: value });
//                                         if (
//                                           value &&
//                                           errors.customerAddress?.lga
//                                         ) {
//                                           const isValid = await trigger(
//                                             "customerAddress.lga"
//                                           );
//                                           if (isValid)
//                                             clearErrors("customerAddress.lga");
//                                         }
//                                       }}
//                                       disabled={
//                                         !selectedState ||
//                                         availableLgas.length === 0
//                                       }
//                                     >
//                                       <SelectTrigger
//                                         id="lga"
//                                         className={
//                                           errors.customerAddress?.lga
//                                             ? "border-red-500"
//                                             : ""
//                                         }
//                                       >
//                                         <SelectValue
//                                           placeholder={
//                                             selectedState
//                                               ? "Select a Local Government Area"
//                                               : "Please select a state first"
//                                           }
//                                         />
//                                       </SelectTrigger>
//                                       <SelectContent>
//                                         {availableLgas.map((lga) => (
//                                           <SelectItem key={lga} value={lga}>
//                                             {lga}
//                                           </SelectItem>
//                                         ))}
//                                       </SelectContent>
//                                     </Select>
//                                   )}
//                                 />
//                                 {errors.customerAddress?.lga && (
//                                   <p className="text-sm text-red-600">
//                                     {errors.customerAddress.lga.message}
//                                   </p>
//                                 )}
//                               </div>

//                               {/* Street Address */}
//                               <div className="space-y-2">
//                                 <Label htmlFor="streetAddress">
//                                   Street Address{" "}
//                                   <span className="text-red-500">*</span>
//                                 </Label>
//                                 <Textarea
//                                   id="streetAddress"
//                                   {...register(
//                                     "customerAddress.streetAddress",
//                                     {
//                                       onChange: async (e) => {
//                                         const value = e.target.value;
//                                         setCustomerAddress({
//                                           streetAddress: value,
//                                         });
//                                         if (
//                                           value &&
//                                           errors.customerAddress?.streetAddress
//                                         ) {
//                                           const isValid = await trigger(
//                                             "customerAddress.streetAddress"
//                                           );
//                                           if (isValid)
//                                             clearErrors(
//                                               "customerAddress.streetAddress"
//                                             );
//                                         }
//                                       },
//                                     }
//                                   )}
//                                   rows={3}
//                                   className={
//                                     errors.customerAddress?.streetAddress
//                                       ? "border-red-500"
//                                       : ""
//                                   }
//                                   placeholder="Enter your full street address including house number, street name, area, and nearby landmarks for accurate delivery"
//                                 />
//                                 {errors.customerAddress?.streetAddress && (
//                                   <p className="text-sm text-red-600">
//                                     {
//                                       errors.customerAddress.streetAddress
//                                         .message
//                                     }
//                                   </p>
//                                 )}
//                               </div>

//                               {/* Additional Directions */}
//                               <div className="space-y-2">
//                                 <Label htmlFor="directions">
//                                   Additional Directions{" "}
//                                   <span className="text-gray-500">
//                                     (Optional)
//                                   </span>
//                                 </Label>
//                                 <Textarea
//                                   id="directions"
//                                   {...register("customerAddress.directions", {
//                                     onChange: (e) => {
//                                       const value = e.target.value;
//                                       setCustomerAddress({ directions: value });
//                                     },
//                                   })}
//                                   rows={3}
//                                   className={
//                                     errors.customerAddress?.directions
//                                       ? "border-red-500"
//                                       : ""
//                                   }
//                                   placeholder="Additional directions to help locate your address (e.g., 'Opposite First Bank', 'Blue gate with security post', 'Third floor, Apartment 3B')"
//                                 />
//                                 {errors.customerAddress?.directions && (
//                                   <p className="text-sm text-red-600">
//                                     {errors.customerAddress.directions.message}
//                                   </p>
//                                 )}
//                               </div>
//                             </>
//                           )}

//                           {/* Delivery Pricing Status */}
//                           {(isLogisticsPricingLoading ||
//                             logisticsPricingError ||
//                             logisticsPricingData?.data?.price !==
//                               undefined) && (
//                             <div className="p-3 border rounded-md bg-muted/50">
//                               <div className="flex items-center gap-2">
//                                 {logisticsPricingError && (
//                                   <span className="text-sm text-red-600">
//                                     Unable to calculate delivery fee - using
//                                     standard rate
//                                   </span>
//                                 )}
//                                 {logisticsPricingData?.data?.price !==
//                                   undefined &&
//                                   !isLogisticsPricingLoading && (
//                                     <span className="text-sm text-green-600">
//                                       Delivery fee calculated:{" "}
//                                       {formatPrice(
//                                         logisticsPricingData.data.price
//                                       )}
//                                     </span>
//                                   )}
//                               </div>
//                             </div>
//                           )}
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
//                               {checkoutData.customerAddress.directions && (
//                                 <>
//                                   <br />
//                                   <span className="text-muted-foreground">
//                                     Directions:{" "}
//                                     {checkoutData.customerAddress.directions}
//                                   </span>
//                                 </>
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
//                           {isLogisticsPricingLoading && (
//                             <Loader2 className="h-3 w-3 animate-spin ml-1 inline" />
//                           )}
//                         </span>
//                         <span className="text-sm">
//                           {!watchedState || !watchedLga || !watchedStreetAddress
//                             ? "Enter address to calculate"
//                             : deliveryFee === null
//                             ? "Calculating..."
//                             : deliveryFee === 0
//                             ? "Free"
//                             : formatPrice(deliveryFee)}
//                         </span>
//                       </div>
//                       {logisticsPricingError && (
//                         <div className="text-xs text-red-600 mt-1">
//                           Unable to calculate delivery fee - using standard rate
//                         </div>
//                       )}
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

//                 {/* Help Section */}
//                 <Card className="mt-6">
//                   <CardContent className="p-6">
//                     <div className="space-y-4 text-sm">
//                       <div className="flex items-start">
//                         <span className="mr-2 text-primary">•</span>
//                         <p>
//                           Orders are typically delivered 2-3 days for locations
//                           within Lagos and Ibadan, and 4-7 days for other
//                           locations
//                         </p>
//                       </div>
//                       <div className="flex items-start">
//                         <span className="mr-2 text-primary">•</span>
//                         <p>
//                           We accept returns within 3 days of delivery, provided
//                           items meet our return policy
//                         </p>
//                       </div>
//                       <div className="flex items-start">
//                         <span className="mr-2 text-primary">•</span>
//                         <p>Detailed addresses help reduce delivery costs</p>
//                       </div>
//                     </div>
//                   </CardContent>
//                 </Card>
//               </div>
//             </div>
//           </div>
//         </div>
//       )}

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








// "use client"
// import { useState, useEffect, useMemo } from "react"
// import dynamic from "next/dynamic"
// import Image from "next/image"
// import { useRouter, useSearchParams } from "next/navigation"
// import { CreditCard, MapPin, ArrowLeft, Loader2, Info } from "lucide-react"
// import useSWR, { mutate } from "swr"
// import {
//   AlertDialog,
//   AlertDialogAction,
//   AlertDialogCancel,
//   AlertDialogContent,
//   AlertDialogDescription,
//   AlertDialogFooter,
//   AlertDialogHeader,
//   AlertDialogTitle,
// } from "@/components/ui/alert-dialog"
// import { Button } from "@/components/ui/button"
// import { Card, CardContent } from "@/components/ui/card"
// import { Separator } from "@/components/ui/separator"
// import { Label } from "@/components/ui/label"
// import { Textarea } from "@/components/ui/textarea"
// import { Alert, AlertDescription } from "@/components/ui/alert"
// import { useFormResolver } from "@/hooks/useFormResolver"
// import { Controller } from "react-hook-form"
// import NaijaStates from "naija-state-local-government"
// import { getLgasForState } from "@/lib/utils"
// import { Input } from "@/components/ui/input"
// import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
// import { deliveryFormSchema } from "@/zod/schema"
// import { useCheckoutStore } from "@/hooks/checkout-store"
// import { errorToast, successToast } from "@/components/ui/use-toast-advanced"
// import { getVariationDisplayName, parseCheckoutUrl } from "@/lib/url-parser"
// import { useProductFetching } from "@/hooks/use-product-fetcher"
// import { useProductStore } from "@/hooks/product-store"

// // Dynamic import of PaystackButton to prevent SSR issues
// const PaystackButton = dynamic(() => import("react-paystack").then((mod) => mod.PaystackButton), {
//   ssr: false,
//   loading: () => <Button className="flex-1">Loading Payment...</Button>,
// })

// // SWR fetcher function
// const fetcher = async (url: string) => {
//   const response = await fetch(url)
//   if (!response.ok) {
//     throw new Error(`HTTP error! status: ${response.status}`)
//   }
//   return response.json()
// }

// // SWR configuration options
// const swrOptions = {
//   revalidateOnFocus: false,
//   revalidateOnReconnect: true,
//   refreshInterval: 0,
//   dedupingInterval: 5000,
//   errorRetryCount: 0,
// }

// // Specific SWR options for logistics pricing (more frequent updates)
// const logisticsPricingOptions = {
//   ...swrOptions,
//   refreshInterval: 600000,
//   revalidateOnFocus: false,
//   dedupingInterval: 600000,
// }

// // SWR options for buyer info (cached longer)
// const buyerInfoOptions = {
//   ...swrOptions,
//   dedupingInterval: 10000, // Cache buyer info longer
//   refreshInterval: 0, // Don't auto-refresh buyer info
// }

// const terminalAddresses = {
//   Abia: [
//     "Asa Road, Former NITEL Building, Aba",
//     "G.R.A, After Jevinic Restaurant, Aba",
//     "Opposite Villaroy Hotel, Umuahia Main Town",
//     "Close to MTN Office, Aba Road, Umuahia",
//   ],

//   "Federal Capital Territory": [
//     "Ademola Adetokunbo Crescent, Wuse 2",
//     "Area 1 Shopping Plaza, Area 1, Abuja",
//     "Beside Lifemate Furniture, Area 11, Garki",
//     "3rd Avenue Gwarinpa, Opposite Union Bank, Abuja",
//     "Opposite DIVIB Plaza, By 7th Avenue Junction, Gwarinpa",
//     "Opposite Aso-Oke Hotel, Gwagwalada",
//     "Gado Nasko Way, Along El-Rufai Bus Stop, Kubwa",
//     "Plot 17, Gidan Dutse Layout, Kubwa",
//     "Kukwaba General Park, Kubwa",
//     "Beside Remaco Filling Station, Lugbe",
//     "Along Zuba Expressway, Madalla",
//     "Opposite Chrisgold Plaza, Beside MTN Office, Mararaba",
//     "Along Nyanya-Jikwoyi Road, Nyanya, Abuja",
//     "Beside Utako Police Station, Utako, Abuja",
//     "Off Obafemi Awolowo Expressway, Utako, Abuja",
//     "Beside Wema Bank Banex, Wuse 2",
//     "Opposite Lagos Line, Zuba",
//   ],
//   Adamawa: ["Fire Service Roundabout, Jimeta, Yola"],
//   Anambra: [
//     "Crunchies Fries, Enugu/Onitsha Expressway, Awka",
//     "The Salvation Army Church, Umudim, Nnewi",
//     "All Saints' Anglican Cathedral, Onitsha",
//   ],
//   "Akwa Ibom": [
//     "Opposite Royalty Hotel, Eket",
//     "Itam industrial Layout, Opposite Timber Market, Itam",
//     "Beside First Bank, Uyo",
//   ],
//   Bauchi: ["Opposite Gwaram and Sons Plaza, Yandoka Road, Bauchi"],
//   Bayelsa: ["Opposite Wema Bank, By INEC Junction, Yenogoa", "Tamic Road Junction, Okutukutu, Yenegoa"],
//   Benue: ["Opposite Dester, By Savannah Roundabout, Makurdi"],
//   Borno: ["Opposite Elkanemi College, Jos Road, Maiduguri"],
//   "Cross River": ["29 Ndidem Usang Iso Road, Calabar", "Beside UNICAL, Opposite MTN Office, Calabar"],
//   Delta: [
//     "Asaba-Onitsha Expressway, By Head Bridge",
//     "Opposite Zenith Bank, Asaba",
//     "Okpanam Road, Asaba",
//     "Off Ughelli-Warri Expressway, Ughelli",
//     "Effurun, Opposite Our Ladies High School",
//     "128 Effurun-Sapele Road, Opposite Solidas, By 7UP Bus Stop",
//   ],
//   Ebonyi: ["Opposite International Market, Abakaliki"],
//   Edo: [
//     "Omegatron Plaza, 47 Airport Road, Benin City",
//     "112 Akpakpava Road, Benin City",
//     "Opposite Auchi Polytechnic Sport Complex, Auchi-Okene Expressway, Auchi",
//     "Along Benin-Auchi Expressway, Beside Big Joe Park, Ekpoma",
//     "42 Benin-Agbor Road, EcoBus Park, Ramat, Benin City",
//     "Beside Genesis Restaurant, Opposite Uwa Junction, Benin City",
//     "202 Uselu-Lagos Road, Ugbowo, Benin City",
//   ],
//   Ekiti: ["Soladola Filling Station, Beside APC Secretariat, Along Ikere Road, Ajilosun"],
//   Enugu: ["Opposite Osisatech Polytechnic, Enugu", "67 Zik Avenue, Uwani, Enugu", "64 Owerrani, Enugu Road, Nsukka"],
//   Gombe: ["Along FTH/Police Headquarters, Ashaka Road, Gombe"],

//   Imo: [
//     "Relief Road, By Relief Junction, Off Egbu Road, Owerri",
//     "Odonko Plaza, No. 7 Nwaturuocha Street, Ikenegbu, Owerri",
//     "Along Umuguma Road (World Bank Last Roundabout), New Owerri",
//   ],
//   Jigawa: ["Government House Roundabout, Asamau House, Dutse"],
//   Kaduna: [
//     "Jos Road Plaza, 19/20 Jos Road, By Ahmadu Bello Way, Kaduna",
//     "Opposite Kaduna Old Airport Road, Kaduna",
//     "Nnamdi Azikiwe Expressway, By Command Junction",
//     "Beside Shagalinku London Hotel, Sabon Gari, Zaria",
//   ],
//   Kano: [
//     "By Tafawa Balewa Way, Opposite Domino's Pizza, Kano",
//     "Centro Plaza, Opposite BUK Old Site, Kabuga, Kano",
//     "Zaria Road, Opposite Kano State House of Assembly",
//   ],
//   Katsina: ["Abudullahi Sarki Muktar Road, Near Tukur Jikamshi Residence, Katsina"],
//   Kebbi: ["Opposite Alhaji Boye Coca-Cola Depot, Birnin Kebbi"],
//   Kogi: ["Lokoja, Close to Federal Medical Center"],
//   Kwara: ["Adjacent Chicken Republic, Ilorin", "34B University of Ilorin Road, Tanke, Ilorin"],
//   Lagos: [
//     "568 Abeokuta Expressway, Ajala Bus Stop, Abule-Egba",
//     "Tripple Ace Dew Building, Opposite Enyo Filling Station, Addo Road",
//     "Morogbo, Along Badagry Expressway, Agbara",
//     "KM 25, Lekki-Epe Expressway, Ajiwe-Ajah",
//     "KM 22, Lekki-Epe Expressway, By Abraham Adesanya Roundabout, Ajah",
//     "41 Shasha Road, Akowonjo Junction, Dopemu",
//     "By Dobbil Avenue, Along Phone Village Road, Alaba International Market",
//     "Opposite Diamond Estate, By Festac Link Bridge, Amuwo Odofin",
//     "By Ogunfayo Bus Stop, KM 36, Lekki-Epe Expressway, Eputu, Awoyaya",
//     "158 Broad Street, Lagos Island (Behind UBA Head Office, Marina)",
//     "103 Okota Road, Cele",
//     "Beside Petrocam Filling Station, Near Epe T-Junction, Epe",
//     "69 Ikorodu Road, Fadeyi",
//     "Festac First Gate, Beside INEC Office, Festac Town",
//     "7 Hospital Road, Ifako, Gbagada",
//     "Gbagada Expressway, Beside Eterna Filling Station, Gbagada",
//     "KM 17, Scapular Plaza, Igbo Efon",
//     "9 Medical Road, Former Simbiat Abiola Way, Opposite Zenith Bank",
//     "80 Awolowo Way, Ikeja",
//     "103 Awolowo Road, Ikoyi",
//     "16 Ikosi Road, Ketu",
//     "Sabo Road Garage, Ikorodu",
//     "29 Idimu Road, Opposite Local Government Council, Ikotun",
//     "12 Industrial Avenue, Cappa Bus Stop, Ilupeju",
//     "Lagos International Trade Fair Complex",
//     "164 Lagos-Abeokuta Expressway, Beside Access Bank, Iyana Ipaja",
//     "43 Osolo Way, Ajao Estate, Ekwu Awolo House",
//     "GIGM Terminal, 20 Ikorodu Express Road, Jibowu",
//     "No. 1A, Wole Ariyo Street, Beside First Bank, Lekki Phase 1",
//     "Jubilee Mall, Admiralty Way, Lekki Phase 1, Lekki",
//     "2 Admiralty Road, Lekki Phase 1",
//     "Ground floor, Legends Place Mall, Plot 29 Fola Osibo, Lekki Phase 1",
//     "3 Ijaiye Road, Beside FCMB, Ogba",
//     "141 Ogudu Road, Beside UBA, Studio24 Building, Ogudu",
//     "Opposite Divas Cake, Beside Access Bank, Ojodu Berger Bus Stop",
//     "Old Ojo Road, After Agboju Bus Stop, Opposite Access Bank",
//     "Banex Mall, Suite V.GL 01, Akiogun Road, Oniru",
//     "62B Opebi Road, Opposite So-Fresh, Opebi, Ikeja",
//     "Orchid Road (E-MALL Plaza), By Van Daniel's Estate, Orchid",
//     "2 Ganiu Eletu Way, Osapa London, Lekki-Epe Expressway",
//     "25 Otto Causeway, Opposite Iddo Bus Stop, Iddo Ebute Metta",
//     "26 Adeniran Ogunsanya, Surulere",
//     "169 Badagry Expressway, Volkswagen Bus Stop",
//     "1436 Sanusi Fafunwa Street, Victoria Island",
//     "272b Akin Adeshola Street, Beside Honda Place, Victoria Island",
//     "Tejuosho Ultra Modern Shopping Complex, Ojuelegba Road, Yaba",
//   ],
//   Nasarawa: ["Police Officers' Mess, Opposite Polaris Bank, Jos Road, Lafia"],
//   Niger: ["Beside NEPA Office, Farm Center Area, Tunga, Minna"],
//   Ogun: [
//     "62 Tinubu Street, Ita Eko, Abeokuta",
//     "SSANU Complex, Beside Paradise, FUNAAB, Abeokuta",
//     "102 Ibadan Road, Opposite NEPA Office, Ibadan Garage, Ijebu Ode",
//     "3 Abeokuta-Lagos Expressway, Opposite Sango Bridge, Sango Ota",
//   ],
//   Ondo: ["22 Oyemekun Road, Opposite SLOT, Akure", "30 Yaba Street, Opposite Crunchies, Ondo Town"],
//   Osun: [
//     "EXODUS Filling Station, Mayfair, Ile-lfe, Osun State",
//     "Gbongan-Ibadan Road, NIPCO Filling Station, Ogo Oluwa, Osogbo",
//   ],
//   Oyo: [
//     "Town Planning Complex, By Sumal Foods, Ring Road, Ibadan",
//     "Opposite Funcktionals Clothing, Bodija-UI Road, UI, Ibadan",
//     "Adjacent Olowo Tin Fowo Shanu Shopping Complex, Iwo Road, Ibadan",
//     "Eterna Filling Station (Akala Complex), Starlight, Ogbomoso",
//   ],
//   Plateau: [
//     "Plaza 1080, Yakubu Gowon Way, Dadin Kowa Second Gate",
//     "Opposite Jankwano, Bingham University Teaching Hospital, Jos",
//   ],
//   Rivers: [
//     "18 Ada George, By Okilton Junction, Port Harcourt",
//     "Linus Book Shop Building, Beside Today FM Road, East-West Road, PHC",
//     "Cocaine Village Junction, Off Aba Road, Rumuogba, Port Harcourt",
//     "299 Old Refinery Road, By De-Young Junction, Elelenwo, Port Harcourt",
//     "Emmanuel Plaza, G.U. Ake Road, Eliogbolo, Eliozu, Port Harcourt",
//     "61 Olu Obasanjo Road, Opposite Olu Obasanjo Roundabout, Port Harcourt",
//     "89 Peter Odili Road, Besides Eterna Filling Station, Port Harcourt",
//     "Big Treat Rukpokwu, KM 16 Airport Road, Port Harcourt",
//     "9 Stadium Road, Beside Benjack, Port Harcourt",
//     "67 Tombia Ext, GRA, Port Harcourt",
//     "Agora Plaza, 118 Woji Road, By Bodo Junction, GRA Phase 2, Port Harcourt",
//   ],
//   Sokoto: ["3/4 Maiduguri Road, Gawon Nama Area"],
//   Taraba: ["106 White Castle Plaza, Barde Way, Jalingo"],
//   Yobe: ["Shop 2, Adhaza Plaza, Gashuwa Road, Damaturu"],
//   Zamfara: ["C1, A.A. Master Plaza, Canteen Road, Gusau"],
// }

// const TerminalPickupPrices = {
//   Lagos: 1800,
//   Ogun: 2700,
//   Oyo: 3500, // Ibadan & Ogbomoso
//   Osun: 4500,
//   Ekiti: 4500,
//   Ondo: 4500,
//   Edo: 4500,

//   // Middle/South-South/North Central (₦6000)
//   Bayelsa: 6000,
//   "Cross River": 6000,
//   Anambra: 6000,
//   Rivers: 6000,
//   "Federal Capital Territory": 6000,
//   Enugu: 6000,
//   Imo: 6000,
//   Abia: 6000,
//   Delta: 6000,
//   Benue: 6000,
//   Ebonyi: 6000,
//   Kogi: 6000,
//   Kwara: 6000,
//   Plateau: 6000,
//   Nasarawa: 6000,
//   Niger: 6000,
//   "Akwa Ibom": 6000,

//   // Upper North (₦7000)
//   Kaduna: 7000,
//   Kano: 7000,
//   Katsina: 7000,
//   Kebbi: 7000,
//   Sokoto: 7000,
//   Borno: 7000,
//   Jigawa: 7000,
//   Yobe: 7000,
//   Zamfara: 7000,
//   Gombe: 7000,
//   Bauchi: 7000,
//   Adamawa: 7000,
//   Taraba: 7000,
// }

// export default function CheckoutPage() {
//   const [buyerCoordinates, setBuyerCoordinates] = useState<{
//     latitude: number | null
//     longitude: number | null
//   }>({ latitude: null, longitude: null })

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
//   } = useCheckoutStore()

//   // Local state for UI-specific needs
//   const [isClient, setIsClient] = useState(false)
//   const [selectedState, setSelectedState] = useState<string>("")
//   const [availableLgas, setAvailableLgas] = useState<string[]>([])
//   const [states, setStates] = useState<string[]>([])
//   const [isLoading, setIsLoading] = useState(false)
//   const [showCancelledModal, setShowCancelledModal] = useState(false)
//   const [deliveryType, setDeliveryType] = useState<"terminal" | "home">("terminal")
//   const [selectedTerminal, setSelectedTerminal] = useState("")
//   const router = useRouter()

//   // Get values from store
//   const currentStep = checkoutData.currentStep

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
//     setCustomerInfo(data.customerInfo)
//     setCustomerAddress(data.customerAddress)
//     setDeliveryMethod(deliveryType)
//     if (deliveryType === "terminal" && selectedTerminal) {
//       setTerminalAddress(selectedTerminal)
//     }
//     return data
//   }, deliveryFormSchema)

//   const searchParams = useSearchParams()

//   // Parse URL parameters
//   const parsedUrl = useMemo(() => {
//     return parseCheckoutUrl(searchParams)
//   }, [searchParams])

//   const { items, ref, platform } = parsedUrl

//   // Fetch products when platform is "store"
//   const {
//     productsData,
//     error: productFetchError,
//     isLoading: isProductsLoading,
//   } = useProductFetching(items, ref, platform, true)

//   const { orderSummaries, setOrderSummaries, clearOrderSummaries, updateDeliveryFee } = useProductStore()

//   // Get cart items from orderSummaries (works for both store and non-store platforms)
//   const cartItems = useMemo(() => {
//     if (platform === "store") {
//       return orderSummaries.map((summary) => summary.item)
//     }
//     // Fallback for non-store platforms (existing logic)
//     return orderSummaries.map((summary) => summary.item) || []
//   }, [platform, orderSummaries])

//   // Calculate subtotal from orderSummaries or fallback
//   const subtotal = useMemo(() => {
//     if (platform === "store") {
//       return orderSummaries.reduce((sum, summary) => sum + summary.subtotal, 0)
//     }
//     // Fallback for non-store platforms
//     return orderSummaries?.reduce((sum, summary) => sum + summary.item.price * summary.item.quantity, 0) || 0
//   }, [platform, orderSummaries])

//   // Watch address fields for SWR key generation
//   const watchedState = watch("customerAddress.state")
//   const watchedLga = watch("customerAddress.lga")
//   const watchedStreetAddress = watch("customerAddress.streetAddress")
//   const watchedName = watch("customerInfo.name")
//   const watchedEmail = watch("customerInfo.email")
//   const watchedPhone = watch("customerInfo.phone")

//   // SWR for buyer info fetching
//   const buyerInfoKey =
//     watchedName &&
//     watchedEmail &&
//     watchedPhone &&
//     watchedName.trim().length >= 2 &&
//     /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(watchedEmail) &&
//     /^(\+?234|0)[\d]{10}$/.test(watchedPhone)
//       ? `/api/orders/buyer-info?buyerName=${encodeURIComponent(watchedName.trim())}&buyerEmail=${encodeURIComponent(
//           watchedEmail.trim(),
//         )}&buyerPhone=${encodeURIComponent(watchedPhone.trim())}`
//       : null

//   const { data: buyerInfoData, error: buyerInfoError } = useSWR(buyerInfoKey, fetcher, buyerInfoOptions)

//   // SWR for logistics pricing
//   const logisticsPricingKey =
//     watchedState &&
//     watchedLga &&
//     watchedStreetAddress &&
//     orderSummaries.length > 0 &&
//     orderSummaries[0]?.pickupLocation?.latitude &&
//     orderSummaries[0]?.pickupLocation?.longitude
//       ? `/api/logistics/pricing?state=${encodeURIComponent(watchedState)}&lga=${encodeURIComponent(
//           watchedLga,
//         )}&streetAddress=${encodeURIComponent(watchedStreetAddress)}`
//       : null

//   const {
//     data: logisticsPricingData,
//     error: logisticsPricingError,
//     isLoading: isLogisticsPricingLoading,
//   } = useSWR(logisticsPricingKey, fetcher, logisticsPricingOptions)

//   // Effect to handle buyer info auto-fill
//   useEffect(() => {
//     if (buyerInfoData?.data && !buyerInfoError) {
//       const data = buyerInfoData.data
//       if (data.streetAddress && data.state && data.lga) {
//         // Auto-fill the address fields
//         setValue("customerAddress.streetAddress", data.streetAddress)
//         setValue("customerAddress.state", data.state)
//         setValue("customerAddress.lga", data.lga)
//         if (data.directions) {
//           setValue("customerAddress.directions", data.directions)
//         }

//         // Update the store as well
//         setCustomerAddress({
//           streetAddress: data.streetAddress,
//           state: data.state,
//           lga: data.lga,
//           directions: data.directions || "",
//         })

//         // Set selected state to trigger LGA loading
//         setSelectedState(data.state)
//         // Load LGAs for the state
//         const lgas = getLgasForState(data.state)
//         setAvailableLgas(lgas)
//       }
//     }
//   }, [buyerInfoData, buyerInfoError, setValue, setCustomerAddress])

//   // Effect to handle logistics pricing updates
//   useEffect(() => {
//     if (logisticsPricingData?.data && !logisticsPricingError) {
//       const price = logisticsPricingData.data.price
//       if (price !== undefined) {
//         // Update the store with the fetched delivery fee
//         updateDeliveryFee(price)
//         // Store buyer coordinates if available
//         if (logisticsPricingData.data.buyerLatitude && logisticsPricingData.data.buyerLongitude) {
//           setBuyerCoordinates({
//             latitude: logisticsPricingData.data.buyerLatitude,
//             longitude: logisticsPricingData.data.buyerLongitude,
//           })
//         } else {
//           setBuyerCoordinates({
//             latitude: 6.5244 + (Math.random() - 0.5) * 0.1,
//             longitude: 3.3792 + (Math.random() - 0.5) * 0.1,
//           })
//         }
//       }
//     } else if (logisticsPricingError) {
//       console.error("Logistics pricing error:", logisticsPricingError)
//       // Update store with fallback fee
//       updateDeliveryFee(1500)
//       setBuyerCoordinates({
//         latitude: 6.5244 + (Math.random() - 0.5) * 0.1,
//         longitude: 3.3792 + (Math.random() - 0.5) * 0.1,
//       })
//     }
//   }, [logisticsPricingData, logisticsPricingError, updateDeliveryFee])

//   const formatOrderItems = () => {
//     if (!orderSummaries.length) return []
//     return orderSummaries.flatMap((summary) => ({
//       productId: summary.item.productId,
//       quantity: summary.item.quantity,
//       supplierPrice: summary.item.originalPrice,
//       plugPrice: summary.item.price,
//       productName: summary.item.name,
//       supplierId: summary.item.supplierId,
//       ...(summary.item.variationId && {
//         variantId: summary.item.variationId,
//         variantColor: summary.item.color,
//         variantSize: summary.item.size,
//       }),
//       // For non-variation items, use product-level color and size
//       ...(!summary.item.variationId && {
//         productColor: summary.item.color,
//         productSize: summary.item.size,
//       }),
//     }))
//   }

//   const prepareOrderData = (paymentReference: string) => {
//     const orderData = {
//       // Buyer information
//       buyerName: checkoutData.customerInfo.name,
//       buyerEmail: checkoutData.customerInfo.email,
//       buyerPhone: checkoutData.customerInfo.phone,
//       buyerAddress: checkoutData.customerAddress.streetAddress,
//       buyerLga: checkoutData.customerAddress.lga,
//       buyerState: checkoutData.customerAddress.state,
//       buyerDirections: checkoutData.customerAddress.directions || "",
//       buyerInstructions: checkoutData.deliveryInstructions || "",
//       buyerLatitude: buyerCoordinates.latitude,
//       buyerLongitude: buyerCoordinates.longitude,
//       paymentMethod: "online",
//       totalAmount: total,
//       deliveryFee: deliveryFee,
//       platform: orderSummaries[0]?.platform || platform,
//       subdomain: (orderSummaries[0].platform === "store" && orderSummaries[0].referralId) || "",
//       plugId: (orderSummaries[0]?.platform !== "store" && orderSummaries[0]?.referralId) || "",
//       orderItems: formatOrderItems(),
//       // Payment reference for online payments
//       paymentReference,
//       deliveryType: deliveryType,
//       terminalAddress: deliveryType === "terminal" ? selectedTerminal : null,
//     }
//     return orderData
//   }

//   const placeOrder = async (paymentReference: string) => {
//     try {
//       setIsLoading(true)
//       const orderData = prepareOrderData(paymentReference)
//       const response = await fetch("/api/orders/place-order", {
//         method: "POST",
//         headers: {
//           "Content-Type": "application/json",
//         },
//         body: JSON.stringify(orderData),
//       })

//       if (!response.ok) {
//         const errorData = await response.json()
//         errorToast(errorData.error || "Failed to place order")
//         clearCheckoutData()
//         clearOrderSummaries()
//         router.replace("/order-error")
//         return
//       }

//       const result = await response.json()
//       successToast(result.message || "Order placed successfully")

//       // Store order success data for thank you page
//       if (result.data) {
//         sessionStorage.setItem("orderSuccess", JSON.stringify(result.data))
//       }

//       // Clear all checkout data and order summary
//       clearCheckoutData()
//       clearOrderSummaries()

//       // Navigate to thank you page
//       router.replace("/thank-you")
//       return result
//     } catch (error) {
//       console.error("Error placing order:", error)
//       errorToast("An error occurred while placing the order")
//     } finally {
//       setIsLoading(false)
//     }
//   }

//   const handleBackNavigation = () => {
//     if (platform !== "store") {
//       // Navigate back to referring page
//       router.back()
//     }
//   }

//   // Effect to transform fetched products into orderSummaries when platform is "store"
//   useEffect(() => {
//     if (platform === "store" && productsData.length > 0 && !isProductsLoading) {
//       const transformedOrderSummaries = productsData
//         .filter(({ data, error }) => data && !error)
//         .map(({ item, data }) => {
//           const product = data.data || data // Handle different API response structures
//           // Create ProductItem from fetched data
//           const productItem = {
//             id: product.id || item.pid,
//             name: product.name || product.title || "Unknown Product",
//             price: product.price || 0,
//             originalPrice: product.originalPrice || product.price || 0,
//             productId: product.originalId,
//             quantity: item.qty,
//             image: product.image || product.images?.[0] || "/placeholder.svg",
//             color: item.variation ? product.variations?.find((v: any) => v.id === item.variation)?.color : undefined,
//             size: item.variation ? product.variations?.find((v: any) => v.id === item.variation)?.size : undefined,
//             variationId: item.variation,
//             variationName: item.variation
//               ? getVariationDisplayName(product.variations?.find((v: any) => v.id === item.variation))
//               : undefined,
//             supplierId: product.supplierId || product.userId,
//           }

//           // Calculate subtotal and total
//           const subtotal = productItem.price * productItem.quantity
//           const defaultDeliveryFee = 0
//           const total = subtotal + defaultDeliveryFee

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
//           }
//         })

//       // Update the store with transformed data
//       if (transformedOrderSummaries.length > 0) {
//         setOrderSummaries(transformedOrderSummaries)
//       }
//     }
//   }, [platform, productsData, isProductsLoading, ref, setOrderSummaries])

//   // Calculate delivery fee based on method and logistics pricing
//   const getDeliveryFee = () => {
//     // For terminal pickup, use the fixed state pricing
//     if (deliveryType === "terminal" && selectedState) {
//       const terminalPrice = TerminalPickupPrices[selectedState as keyof typeof TerminalPickupPrices]
//       if (terminalPrice) {
//         return terminalPrice
//       }
//     }

//     // Check if we have the required data to fetch logistics pricing
//     const hasRequiredAddressData = watchedState && watchedLga && watchedStreetAddress

//     // If we don't have required address data, don't show any delivery fee yet
//     if (!hasRequiredAddressData) {
//       return null
//     }

//     // If we're currently loading logistics pricing, don't show fee yet
//     if (isLogisticsPricingLoading) {
//       return null
//     }

//     // If logistics pricing was successfully fetched, use that price
//     if (logisticsPricingData?.data?.price !== undefined && !logisticsPricingError) {
//       return logisticsPricingData.data.price
//     }

//     // If there was an error fetching logistics pricing, fallback to 1500
//     if (logisticsPricingError) {
//       return 1500
//     }

//     // Default case - should not reach here, but fallback to null
//     return null
//   }

//   const deliveryFee = getDeliveryFee()
//   const total = subtotal + (deliveryFee || 0)

//   // Initialize states and form data
//   useEffect(() => {
//     setIsClient(true)
//     // Initialize Nigerian states
//     try {
//       const statesData = NaijaStates.states()
//       if (Array.isArray(statesData)) {
//         const stateNames = statesData
//           .map((state: any) => {
//             return typeof state === "string" ? state : state.state || state.name
//           })
//           .filter(Boolean)
//         setStates(stateNames)
//       }
//     } catch (error) {
//       console.error("Error fetching states:", error)
//       setStates([])
//     }

//     // Initialize form with stored data
//     setValue("customerInfo.name", checkoutData.customerInfo.name || "")
//     setValue("customerInfo.email", checkoutData.customerInfo.email || "")
//     setValue("customerInfo.phone", checkoutData.customerInfo.phone || "")
//     setValue("customerAddress.streetAddress", checkoutData.customerAddress.streetAddress || "")
//     setValue("customerAddress.state", checkoutData.customerAddress.state || "")
//     setValue("customerAddress.lga", checkoutData.customerAddress.lga || "")
//     setValue("customerAddress.directions", checkoutData.customerAddress.directions || "")
//   }, [setValue, checkoutData])

//   // Watch state changes to update LGAs
//   useEffect(() => {
//     if (watchedState && watchedState !== selectedState) {
//       setSelectedState(watchedState)
//       const lgas = getLgasForState(watchedState)
//       setAvailableLgas(lgas)
//       // Update the state in the store
//       setCustomerAddress({ state: watchedState })
//     }
//   }, [watchedState, selectedState, setValue, setCustomerAddress])

//   // Watch form values for real-time validation and store updates
//   const watchedCustomerInfo = watch("customerInfo")
//   const watchedCustomerAddress = watch("customerAddress")

//   useEffect(() => {
//     if (watchedCustomerInfo) {
//       setCustomerInfo(watchedCustomerInfo)
//     }
//   }, [watchedCustomerInfo, setCustomerInfo])

//   useEffect(() => {
//     if (watchedCustomerAddress) {
//       setCustomerAddress(watchedCustomerAddress)
//     }
//   }, [watchedCustomerAddress, setCustomerAddress])

//   // Clear errors when fields become valid
//   useEffect(() => {
//     const validateField = async (fieldName: any, value: any) => {
//       if (value && value.trim() !== "") {
//         const isFieldValid = await trigger(fieldName)
//         if (isFieldValid) {
//           clearErrors(fieldName)
//         }
//       }
//     }

//     // Validate customer info fields
//     if (watchedCustomerInfo?.name) {
//       validateField("customerInfo.name", watchedCustomerInfo.name)
//     }
//     if (watchedCustomerInfo?.email) {
//       validateField("customerInfo.email", watchedCustomerInfo.email)
//     }
//     if (watchedCustomerInfo?.phone) {
//       validateField("customerInfo.phone", watchedCustomerInfo.phone)
//     }

//     // Validate address fields
//     if (watchedCustomerAddress?.streetAddress) {
//       validateField("customerAddress.streetAddress", watchedCustomerAddress.streetAddress)
//     }
//     if (watchedCustomerAddress?.state) {
//       validateField("customerAddress.state", watchedCustomerAddress.state)
//     }
//     if (watchedCustomerAddress?.lga) {
//       validateField("customerAddress.lga", watchedCustomerAddress.lga)
//     }
//   }, [watchedCustomerInfo, watchedCustomerAddress, trigger, clearErrors])

//   const continueToReview = () => {
//     goToNextStep()
//     if (orderSummaries.length > 0) {
//       orderSummaries.forEach((orderSummary) => {
//         mutate(`/public/products/${orderSummary.item.id}${orderSummary.referralId}`)
//       })
//     }
//   }

//   const showPaymentCancelledModal = () => {
//     // You could use a toast library or custom modal
//     setShowCancelledModal(true)
//   }

//   const paystackConfig = {
//     email: watchedCustomerInfo?.email || "",
//     amount: total * 100, // Paystack expects amount in kobo
//     metadata: {
//       name: watchedCustomerInfo?.name || "",
//       phone: watchedCustomerInfo?.phone || "",
//       address: watchedCustomerAddress
//         ? `${watchedCustomerAddress.streetAddress}, ${watchedCustomerAddress.lga}, ${watchedCustomerAddress.state}`
//         : "",
//       custom_fields: [
//         {
//           display_name: "Order Items",
//           variable_name: "order_items",
//           value: cartItems?.map((item) => `${item.name} x${item.quantity}`).join(", "),
//         },
//       ],
//     },
//     publicKey: process.env.NEXT_PUBLIC_PAYSTACK_PUBLIC_KEY,
//     text: isLoading ? "Processing..." : "Place Order",
//     onSuccess: async (reference) => {
//       try {
//         await placeOrder(reference.reference)
//       } catch (error) {
//         console.error("Error placing order after successful payment:", error)
//       }
//     },
//     onClose: () => {
//       showPaymentCancelledModal()
//     },
//   }

//   const formatPrice = (price?: string | number) => {
//     return `₦${price?.toLocaleString()}`
//   }

//   const goToNextStep = async () => {
//     if (currentStep === "delivery") {
//       // Trigger validation for all fields
//       const isFormValid = await trigger()
//       if (isFormValid) {
//         setCurrentStep("review")
//       } else {
//         // Optionally scroll to the first error
//         const firstError = document.querySelector(".border-red-500")
//         if (firstError) {
//           firstError.scrollIntoView({ behavior: "smooth", block: "center" })
//         }
//       }
//     }
//   }

//   const goToPreviousStep = () => {
//     if (currentStep === "review") setCurrentStep("delivery")
//   }

//   // Handle delivery instructions change
//   const handleDeliveryInstructionsChange = (instructions: string) => {
//     setDeliveryInstructions(instructions)
//   }

//   const renderPlaceOrderButton = () => {
//     // Only render PaystackButton on client side
//     if (!isClient) {
//       return <Button className="flex-1">Loading Payment...</Button>
//     }

//     return (
//       <PaystackButton
//         {...paystackConfig}
//         className="flex-1 bg-primary text-primary-foreground hover:bg-primary/90 h-10 px-4 py-2 rounded-md font-medium transition-colors"
//       />
//     )
//   }

//   return (
//     <div className="flex flex-col min-h-screen pb-16 md:pb-0">
//       {platform !== "store" && (
//         <div className="sticky top-0 z-20 flex items-center p-4 bg-background/80 backdrop-blur-md border-b">
//           <Button variant="ghost" size="sm" onClick={handleBackNavigation} className="flex items-center gap-2">
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
//             <AlertDescription>Failed to load products. Please try refreshing the page.</AlertDescription>
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
//                     <h2 className="text-xl font-semibold mb-4">Delivery Information</h2>
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
//                                   const value = e.target.value
//                                   setCustomerInfo({ name: value })
//                                   if (value && errors.customerInfo?.name) {
//                                     const isValid = await trigger("customerInfo.name")
//                                     if (isValid) clearErrors("customerInfo.name")
//                                   }
//                                 },
//                               })}
//                               placeholder="Enter your full name"
//                               className={errors.customerInfo?.name ? "border-red-500" : ""}
//                             />
//                             {errors.customerInfo?.name && (
//                               <p className="text-sm text-red-600">{errors.customerInfo.name.message}</p>
//                             )}
//                           </div>
//                           <div className="space-y-2">
//                             <Label htmlFor="customerEmail">
//                               Email Address <span className="text-red-500">*</span>
//                             </Label>
//                             <Input
//                               id="customerEmail"
//                               type="email"
//                               {...register("customerInfo.email", {
//                                 onChange: async (e) => {
//                                   const value = e.target.value
//                                   setCustomerInfo({ email: value })
//                                   if (value && errors.customerInfo?.email) {
//                                     const isValid = await trigger("customerInfo.email")
//                                     if (isValid) clearErrors("customerInfo.email")
//                                   }
//                                 },
//                               })}
//                               placeholder="Enter your email address"
//                               className={errors.customerInfo?.email ? "border-red-500" : ""}
//                             />
//                             {errors.customerInfo?.email && (
//                               <p className="text-sm text-red-600">{errors.customerInfo.email.message}</p>
//                             )}
//                           </div>
//                           <div className="space-y-2 md:col-span-2">
//                             <Label htmlFor="customerPhone">
//                               Phone Number <span className="text-red-500">*</span>
//                             </Label>
//                             <Input
//                               id="customerPhone"
//                               {...register("customerInfo.phone", {
//                                 onChange: async (e) => {
//                                   const value = e.target.value
//                                   setCustomerInfo({ phone: value })
//                                   if (value && errors.customerInfo?.phone) {
//                                     const isValid = await trigger("customerInfo.phone")
//                                     if (isValid) clearErrors("customerInfo.phone")
//                                   }
//                                 },
//                               })}
//                               placeholder="Enter your phone number"
//                               className={errors.customerInfo?.phone ? "border-red-500" : ""}
//                             />
//                             {errors.customerInfo?.phone && (
//                               <p className="text-sm text-red-600">{errors.customerInfo.phone.message}</p>
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
//                                     field.onChange(value)
//                                     setCustomerAddress({ state: value })
//                                     // Reset delivery type and terminal selection when state changes
//                                     setDeliveryType("terminal")
//                                     setSelectedTerminal("")
//                                     if (value && errors.customerAddress?.state) {
//                                       const isValid = await trigger("customerAddress.state")
//                                       if (isValid) clearErrors("customerAddress.state")
//                                     }
//                                   }}
//                                 >
//                                   <SelectTrigger
//                                     id="state"
//                                     className={errors.customerAddress?.state ? "border-red-500" : ""}
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
//                               <p className="text-sm text-red-600">{errors.customerAddress.state.message}</p>
//                             )}
//                           </div>

//                           {selectedState && (selectedState === "Lagos" || selectedState === "Ogun") && (
//                             <div className="space-y-2">
//                               <Label>
//                                 Delivery Type <span className="text-red-500">*</span>
//                               </Label>
//                               <div className="flex gap-4">
//                                 <div className="flex items-center space-x-2">
//                                   <input
//                                     type="radio"
//                                     id="terminal"
//                                     name="deliveryType"
//                                     value="terminal"
//                                     checked={deliveryType === "terminal"}
//                                     onChange={(e) => {
//                                       const newDeliveryType = e.target.value as "terminal" | "home"
//                                       setDeliveryType(newDeliveryType)
//                                       setDeliveryMethod(newDeliveryType)
//                                     }}
//                                     className="w-4 h-4 text-blue-600"
//                                   />
//                                   <Label htmlFor="terminal" className="font-normal">
//                                     Terminal Pickup
//                                   </Label>
//                                 </div>
//                                 <div className="flex items-center space-x-2">
//                                   <input
//                                     type="radio"
//                                     id="home"
//                                     name="deliveryType"
//                                     value="home"
//                                     checked={deliveryType === "home"}
//                                     onChange={(e) => {
//                                       const newDeliveryType = e.target.value as "terminal" | "home"
//                                       setDeliveryType(newDeliveryType)
//                                       setDeliveryMethod(newDeliveryType)
//                                     }}
//                                     className="w-4 h-4 text-blue-600"
//                                   />
//                                   <Label htmlFor="home" className="font-normal">
//                                     Home Delivery
//                                   </Label>
//                                 </div>
//                               </div>
//                               <p className="text-sm text-muted-foreground">
//                                 Terminal pickup locations are GIG Logistics pickup offices where you can collect your
//                                 order.
//                               </p>
//                             </div>
//                           )}

//                           {selectedState &&
//                             deliveryType === "terminal" &&
//                             terminalAddresses[selectedState as keyof typeof terminalAddresses] && (
//                               <div className="space-y-2">
//                                 <Label>
//                                   Select Terminal <span className="text-red-500">*</span>
//                                 </Label>
//                                 <div className="bg-blue-50 border border-blue-200 rounded-md p-3 mb-3">
//                                   <div className="flex items-center justify-between">
//                                     <p className="text-xs text-blue-800">
//                                       <strong>Terminal Pickup Price</strong>
//                                     </p>
//                                     <span className="text-lg font-bold text-blue-900">
//                                       {formatPrice(
//                                         TerminalPickupPrices[selectedState as keyof typeof TerminalPickupPrices] || 0,
//                                       )}
//                                     </span>
//                                   </div>
//                                   <p className="text-sm text-blue-700 mt-1">
//                                     All pickup locations in {selectedState} have the same price
//                                   </p>
//                                 </div>
//                                 <p className="text-sm text-muted-foreground mb-2">
//                                   Scroll to choose a GIG Logistics office near you for pickup:
//                                 </p>
//                                 <div className="border rounded-md max-h-48 overflow-y-auto">
//                                   {terminalAddresses[selectedState as keyof typeof terminalAddresses].map(
//                                     (terminal, index) => (
//                                       <div
//                                         key={index}
//                                         className={`p-3 border-b last:border-b-0 cursor-pointer hover:bg-muted/50 ${
//                                           selectedTerminal === terminal ? "bg-blue-50 border-blue-200" : ""
//                                         }`}
//                                         onClick={() => {
//                                           setSelectedTerminal(terminal)
//                                           setTerminalAddress(terminal)
//                                         }}
//                                       >
//                                         <div className="flex items-start space-x-2">
//                                           <input
//                                             type="radio"
//                                             name="terminal"
//                                             value={terminal}
//                                             checked={selectedTerminal === terminal}
//                                             onChange={() => {
//                                               setSelectedTerminal(terminal)
//                                               setTerminalAddress(terminal)
//                                             }}
//                                             className="w-4 h-4 text-blue-600 mt-1"
//                                           />
//                                           <span className="text-xs whitespace-normal break-words">{terminal}</span>
//                                         </div>
//                                       </div>
//                                     ),
//                                   )}
//                                 </div>
//                               </div>
//                             )}

//                           {selectedState && deliveryType === "home" && (
//                             <>
//                               {/* Address Specificity Message */}
//                               <Alert className="mb-4">
//                                 <Info className="h-4 w-4" />
//                                 <AlertDescription>
//                                   <strong>💡 Pro Tip:</strong> Providing a very specific and detailed address helps our
//                                   logistics partners optimize delivery routes, which can potentially reduce your
//                                   delivery costs. Include landmarks, building descriptions, and clear directions.
//                                 </AlertDescription>
//                               </Alert>

//                               {/* LGA Selection */}
//                               <div className="space-y-2">
//                                 <Label htmlFor="lga">
//                                   Local Government Area <span className="text-red-500">*</span>
//                                 </Label>
//                                 <Controller
//                                   name="customerAddress.lga"
//                                   control={control}
//                                   render={({ field }) => (
//                                     <Select
//                                       value={field.value}
//                                       onValueChange={async (value) => {
//                                         field.onChange(value)
//                                         setCustomerAddress({ lga: value })
//                                         if (value && errors.customerAddress?.lga) {
//                                           const isValid = await trigger("customerAddress.lga")
//                                           if (isValid) clearErrors("customerAddress.lga")
//                                         }
//                                       }}
//                                       disabled={!selectedState || availableLgas.length === 0}
//                                     >
//                                       <SelectTrigger
//                                         id="lga"
//                                         className={errors.customerAddress?.lga ? "border-red-500" : ""}
//                                       >
//                                         <SelectValue
//                                           placeholder={
//                                             selectedState
//                                               ? "Select a Local Government Area"
//                                               : "Please select a state first"
//                                           }
//                                         />
//                                       </SelectTrigger>
//                                       <SelectContent>
//                                         {availableLgas.map((lga) => (
//                                           <SelectItem key={lga} value={lga}>
//                                             {lga}
//                                           </SelectItem>
//                                         ))}
//                                       </SelectContent>
//                                     </Select>
//                                   )}
//                                 />
//                                 {errors.customerAddress?.lga && (
//                                   <p className="text-sm text-red-600">{errors.customerAddress.lga.message}</p>
//                                 )}
//                               </div>

//                               {/* Street Address */}
//                               <div className="space-y-2">
//                                 <Label htmlFor="streetAddress">
//                                   Street Address <span className="text-red-500">*</span>
//                                 </Label>
//                                 <Textarea
//                                   id="streetAddress"
//                                   {...register("customerAddress.streetAddress", {
//                                     onChange: async (e) => {
//                                       const value = e.target.value
//                                       setCustomerAddress({
//                                         streetAddress: value,
//                                       })
//                                       if (value && errors.customerAddress?.streetAddress) {
//                                         const isValid = await trigger("customerAddress.streetAddress")
//                                         if (isValid) clearErrors("customerAddress.streetAddress")
//                                       }
//                                     },
//                                   })}
//                                   rows={3}
//                                   className={errors.customerAddress?.streetAddress ? "border-red-500" : ""}
//                                   placeholder="Enter your full street address including house number, street name, area, and nearby landmarks for accurate delivery"
//                                 />
//                                 {errors.customerAddress?.streetAddress && (
//                                   <p className="text-sm text-red-600">{errors.customerAddress.streetAddress.message}</p>
//                                 )}
//                               </div>

//                               {/* Additional Directions */}
//                               <div className="space-y-2">
//                                 <Label htmlFor="directions">
//                                   Additional Directions <span className="text-gray-500">(Optional)</span>
//                                 </Label>
//                                 <Textarea
//                                   id="directions"
//                                   {...register("customerAddress.directions", {
//                                     onChange: (e) => {
//                                       const value = e.target.value
//                                       setCustomerAddress({ directions: value })
//                                     },
//                                   })}
//                                   rows={3}
//                                   className={errors.customerAddress?.directions ? "border-red-500" : ""}
//                                   placeholder="Additional directions to help locate your address (e.g., 'Opposite First Bank', 'Blue gate with security post', 'Third floor, Apartment 3B')"
//                                 />
//                                 {errors.customerAddress?.directions && (
//                                   <p className="text-sm text-red-600">{errors.customerAddress.directions.message}</p>
//                                 )}
//                               </div>
//                             </>
//                           )}

//                           {/* Delivery Pricing Status */}
//                           {(isLogisticsPricingLoading ||
//                             logisticsPricingError ||
//                             logisticsPricingData?.data?.price !== undefined) && (
//                             <div className="p-3 border rounded-md bg-muted/50">
//                               <div className="flex items-center gap-2">
//                                 {logisticsPricingError && (
//                                   <span className="text-sm text-red-600">
//                                     Unable to calculate delivery fee - using standard rate
//                                   </span>
//                                 )}
//                                 {logisticsPricingData?.data?.price !== undefined && !isLogisticsPricingLoading && (
//                                   <span className="text-sm text-green-600">
//                                     Delivery fee calculated: {formatPrice(logisticsPricingData.data.price)}
//                                   </span>
//                                 )}
//                               </div>
//                             </div>
//                           )}
//                         </div>
//                       </div>

//                       <Separator />

//                       <div>
//                         <h3 className="font-medium mb-3">Payment Method</h3>
//                         <div className="flex items-center space-x-2 p-3 border rounded-md bg-muted/50">
//                           <CreditCard className="h-4 w-4 mr-2 text-muted-foreground flex-shrink-0" />
//                           <div className="min-w-0">
//                             <span className="font-medium block">Card, Bank Transfer and Mobile Money</span>
//                             <p className="text-xs text-muted-foreground">Secure payment processing</p>
//                           </div>
//                         </div>
//                       </div>

//                       <Separator />

//                       <div>
//                         <h3 className="font-medium mb-3">Delivery Instructions (Optional)</h3>
//                         <Textarea
//                           placeholder="Add any special instructions for delivery..."
//                           className="resize-none"
//                           value={checkoutData.deliveryInstructions}
//                           onChange={(e) => handleDeliveryInstructionsChange(e.target.value)}
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
//                     <h2 className="text-xl font-semibold mb-4">Review Your Order</h2>
//                     <div className="space-y-6">
//                       <div>
//                         <h3 className="font-medium mb-3">Items in Your Order</h3>
//                         <div className="space-y-4 max-h-64 overflow-y-auto pr-2">
//                           {cartItems?.map((item) => (
//                             <div key={item.id} className="flex items-start space-x-3">
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
//                                   <span className="capitalize">{item.name}</span>
//                                   {item.variationName && (
//                                     <span className="text-muted-foreground ml-2">({item.variationName})</span>
//                                   )}
//                                 </h4>
//                                 <div className="flex justify-between mt-1">
//                                   <span className="text-sm">
//                                     {item.quantity} x {formatPrice(item.price)}
//                                   </span>
//                                   <span className="text-sm font-medium">{formatPrice(item.price * item.quantity)}</span>
//                                 </div>
//                               </div>
//                             </div>
//                           ))}
//                         </div>
//                       </div>

//                       <Separator />

//                       <div>
//                         <h3 className="font-medium mb-3">Delivery Information</h3>
//                         <div className="flex items-start space-x-2">
//                           <MapPin className="h-5 w-5 text-muted-foreground mt-0.5 flex-shrink-0" />
//                           <div className="flex-1 min-w-0">
//                             <p className="text-sm">
//                               {checkoutData.customerInfo.name || "Customer Name"}
//                               <br />
//                               {checkoutData.customerAddress.streetAddress || "Street Address"}
//                               {checkoutData.customerAddress.directions && (
//                                 <>
//                                   <br />
//                                   <span className="text-muted-foreground">
//                                     Directions: {checkoutData.customerAddress.directions}
//                                   </span>
//                                 </>
//                               )}
//                               <br />
//                               {checkoutData.customerAddress.lga}, {checkoutData.customerAddress.state}
//                               <br />
//                               {checkoutData.customerInfo.phone || "Phone Number"}
//                             </p>
//                           </div>
//                         </div>
//                       </div>

//                       <Separator />

//                       <div>
//                         <h3 className="font-medium mb-3">Payment Method</h3>
//                         <div className="flex items-center">
//                           <CreditCard className="h-5 w-5 text-muted-foreground mr-2 flex-shrink-0" />
//                           <span className="text-sm">Card, Bank Transfer and Mobile Money</span>
//                         </div>
//                       </div>
//                     </div>
//                     <div className="mt-6 flex flex-col sm:flex-row space-y-3 sm:space-y-0 sm:space-x-3">
//                       <Button variant="outline" className="flex-1 bg-transparent" onClick={goToPreviousStep}>
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
//                     <h3 className="font-semibold text-lg mb-4">Order Summary</h3>
//                     <div className="space-y-3 mb-6">
//                       <div className="flex justify-between">
//                         <span className="text-muted-foreground text-sm">Subtotal</span>
//                         <span className="text-sm">{formatPrice(subtotal!)}</span>
//                       </div>
//                       <div className="flex justify-between items-center">
//                         <span className="text-muted-foreground text-sm">
//                           Delivery Fee
//                           {isLogisticsPricingLoading && <Loader2 className="h-3 w-3 animate-spin ml-1 inline" />}
//                         </span>
//                         <span className="text-sm">
//                           {deliveryType === "terminal" && selectedState
//                             ? formatPrice(TerminalPickupPrices[selectedState as keyof typeof TerminalPickupPrices] || 0)
//                             : !watchedState || !watchedLga || !watchedStreetAddress
//                               ? "Enter address to calculate"
//                               : deliveryFee === null
//                                 ? "Calculating..."
//                                 : deliveryFee === 0
//                                   ? "Free"
//                                   : formatPrice(deliveryFee)}
//                         </span>
//                       </div>
//                       {logisticsPricingError && (
//                         <div className="text-xs text-red-600 mt-1">
//                           Unable to calculate delivery fee - using standard rate
//                         </div>
//                       )}
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
//                           <a href="/terms" className="text-primary hover:underline">
//                             Terms of Service
//                           </a>{" "}
//                           and{" "}
//                           <a href="/privacy" className="text-primary hover:underline">
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

//                 {/* Help Section */}
//                 <Card className="mt-6">
//                   <CardContent className="p-6">
//                     <div className="space-y-4 text-sm">
//                       <div className="flex items-start">
//                         <span className="mr-2 text-primary">•</span>
//                         <p>
//                           Orders are typically delivered 1-3 days for locations within Lagos and Ogun, and 3-7 days for
//                           other locations
//                         </p>
//                       </div>
//                       <div className="flex items-start">
//                         <span className="mr-2 text-primary">•</span>
//                         <p>We accept returns within 3 days of delivery, provided items meet our return policy</p>
//                       </div>
//                       <div className="flex items-start">
//                         <span className="mr-2 text-primary">•</span>
//                         <p>Detailed addresses help reduce delivery costs</p>
//                       </div>
//                     </div>
//                   </CardContent>
//                 </Card>
//               </div>
//             </div>
//           </div>
//         </div>
//       )}

//       <AlertDialog open={showCancelledModal} onOpenChange={setShowCancelledModal}>
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
//                 setShowCancelledModal(false)
//                 // Add your place order logic here
//               }}
//             >
//               {renderPlaceOrderButton()}
//             </AlertDialogAction>
//           </AlertDialogFooter>
//         </AlertDialogContent>
//       </AlertDialog>
//     </div>
//   )
// }











// "use client";
// import { useState, useEffect, useMemo } from "react";
// import dynamic from "next/dynamic";
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
// import { Controller, useForm } from "react-hook-form";
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

// // Dynamic import of PaystackButton to prevent SSR issues
// const PaystackButton = dynamic(
//   () => import("react-paystack").then((mod) => mod.PaystackButton),
//   {
//     ssr: false,
//     loading: () => <Button className="flex-1">Loading Payment...</Button>,
//   }
// );

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

// const terminalAddresses = {
//   Abia: [
//     "Asa Road, Former NITEL Building, Aba",
//     "G.R.A, After Jevinic Restaurant, Aba",
//     "Opposite Villaroy Hotel, Umuahia Main Town",
//     "Close to MTN Office, Aba Road, Umuahia",
//   ],

//   "Federal Capital Territory": [
//     "Ademola Adetokunbo Crescent, Wuse 2",
//     "Area 1 Shopping Plaza, Area 1, Abuja",
//     "Beside Lifemate Furniture, Area 11, Garki",
//     "3rd Avenue Gwarinpa, Opposite Union Bank, Abuja",
//     "Opposite DIVIB Plaza, By 7th Avenue Junction, Gwarinpa",
//     "Opposite Aso-Oke Hotel, Gwagwalada",
//     "Gado Nasko Way, Along El-Rufai Bus Stop, Kubwa",
//     "Plot 17, Gidan Dutse Layout, Kubwa",
//     "Kukwaba General Park, Kubwa",
//     "Beside Remaco Filling Station, Lugbe",
//     "Along Zuba Expressway, Madalla",
//     "Opposite Chrisgold Plaza, Beside MTN Office, Mararaba",
//     "Along Nyanya-Jikwoyi Road, Nyanya, Abuja",
//     "Beside Utako Police Station, Utako, Abuja",
//     "Off Obafemi Awolowo Expressway, Utako, Abuja",
//     "Beside Wema Bank Banex, Wuse 2",
//     "Opposite Lagos Line, Zuba",
//   ],
//   Adamawa: ["Fire Service Roundabout, Jimeta, Yola"],
//   Anambra: [
//     "Crunchies Fries, Enugu/Onitsha Expressway, Awka",
//     "The Salvation Army Church, Umudim, Nnewi",
//     "All Saints' Anglican Cathedral, Onitsha",
//   ],
//   "Akwa Ibom": [
//     "Opposite Royalty Hotel, Eket",
//     "Itam industrial Layout, Opposite Timber Market, Itam",
//     "Beside First Bank, Uyo",
//   ],
//   Bauchi: ["Opposite Gwaram and Sons Plaza, Yandoka Road, Bauchi"],
//   Bayelsa: [
//     "Opposite Wema Bank, By INEC Junction, Yenogoa",
//     "Tamic Road Junction, Okutukutu, Yenegoa",
//   ],
//   Benue: ["Opposite Dester, By Savannah Roundabout, Makurdi"],
//   Borno: ["Opposite Elkanemi College, Jos Road, Maiduguri"],
//   "Cross River": [
//     "29 Ndidem Usang Iso Road, Calabar",
//     "Beside UNICAL, Opposite MTN Office, Calabar",
//   ],
//   Delta: [
//     "Asaba-Onitsha Expressway, By Head Bridge",
//     "Opposite Zenith Bank, Asaba",
//     "Okpanam Road, Asaba",
//     "Off Ughelli-Warri Expressway, Ughelli",
//     "Effurun, Opposite Our Ladies High School",
//     "128 Effurun-Sapele Road, Opposite Solidas, By 7UP Bus Stop",
//   ],
//   Ebonyi: ["Opposite International Market, Abakaliki"],
//   Edo: [
//     "Omegatron Plaza, 47 Airport Road, Benin City",
//     "112 Akpakpava Road, Benin City",
//     "Opposite Auchi Polytechnic Sport Complex, Auchi-Okene Expressway, Auchi",
//     "Along Benin-Auchi Expressway, Beside Big Joe Park, Ekpoma",
//     "42 Benin-Agbor Road, EcoBus Park, Ramat, Benin City",
//     "Beside Genesis Restaurant, Opposite Uwa Junction, Benin City",
//     "202 Uselu-Lagos Road, Ugbowo, Benin City",
//   ],
//   Ekiti: [
//     "Soladola Filling Station, Beside APC Secretariat, Along Ikere Road, Ajilosun",
//   ],
//   Enugu: [
//     "Opposite Osisatech Polytechnic, Enugu",
//     "67 Zik Avenue, Uwani, Enugu",
//     "64 Owerrani, Enugu Road, Nsukka",
//   ],
//   Gombe: ["Along FTH/Police Headquarters, Ashaka Road, Gombe"],

//   Imo: [
//     "Relief Road, By Relief Junction, Off Egbu Road, Owerri",
//     "Odonko Plaza, No. 7 Nwaturuocha Street, Ikenegbu, Owerri",
//     "Along Umuguma Road (World Bank Last Roundabout), New Owerri",
//   ],
//   Jigawa: ["Government House Roundabout, Asamau House, Dutse"],
//   Kaduna: [
//     "Jos Road Plaza, 19/20 Jos Road, By Ahmadu Bello Way, Kaduna",
//     "Opposite Kaduna Old Airport Road, Kaduna",
//     "Nnamdi Azikiwe Expressway, By Command Junction",
//     "Beside Shagalinku London Hotel, Sabon Gari, Zaria",
//   ],
//   Kano: [
//     "By Tafawa Balewa Way, Opposite Domino's Pizza, Kano",
//     "Centro Plaza, Opposite BUK Old Site, Kabuga, Kano",
//     "Zaria Road, Opposite Kano State House of Assembly",
//   ],
//   Katsina: [
//     "Abudullahi Sarki Muktar Road, Near Tukur Jikamshi Residence, Katsina",
//   ],
//   Kebbi: ["Opposite Alhaji Boye Coca-Cola Depot, Birnin Kebbi"],
//   Kogi: ["Lokoja, Close to Federal Medical Center"],
//   Kwara: [
//     "Adjacent Chicken Republic, Ilorin",
//     "34B University of Ilorin Road, Tanke, Ilorin",
//   ],
//   Lagos: [
//     "568 Abeokuta Expressway, Ajala Bus Stop, Abule-Egba",
//     "Tripple Ace Dew Building, Opposite Enyo Filling Station, Addo Road",
//     "Morogbo, Along Badagry Expressway, Agbara",
//     "KM 25, Lekki-Epe Expressway, Ajiwe-Ajah",
//     "KM 22, Lekki-Epe Expressway, By Abraham Adesanya Roundabout, Ajah",
//     "41 Shasha Road, Akowonjo Junction, Dopemu",
//     "By Dobbil Avenue, Along Phone Village Road, Alaba International Market",
//     "Opposite Diamond Estate, By Festac Link Bridge, Amuwo Odofin",
//     "By Ogunfayo Bus Stop, KM 36, Lekki-Epe Expressway, Eputu, Awoyaya",
//     "158 Broad Street, Lagos Island (Behind UBA Head Office, Marina)",
//     "103 Okota Road, Cele",
//     "Beside Petrocam Filling Station, Near Epe T-Junction, Epe",
//     "69 Ikorodu Road, Fadeyi",
//     "Festac First Gate, Beside INEC Office, Festac Town",
//     "7 Hospital Road, Ifako, Gbagada",
//     "Gbagada Expressway, Beside Eterna Filling Station, Gbagada",
//     "KM 17, Scapular Plaza, Igbo Efon",
//     "9 Medical Road, Former Simbiat Abiola Way, Opposite Zenith Bank",
//     "80 Awolowo Way, Ikeja",
//     "103 Awolowo Road, Ikoyi",
//     "16 Ikosi Road, Ketu",
//     "Sabo Road Garage, Ikorodu",
//     "29 Idimu Road, Opposite Local Government Council, Ikotun",
//     "12 Industrial Avenue, Cappa Bus Stop, Ilupeju",
//     "Lagos International Trade Fair Complex",
//     "164 Lagos-Abeokuta Expressway, Beside Access Bank, Iyana Ipaja",
//     "43 Osolo Way, Ajao Estate, Ekwu Awolo House",
//     "GIGM Terminal, 20 Ikorodu Express Road, Jibowu",
//     "No. 1A, Wole Ariyo Street, Beside First Bank, Lekki Phase 1",
//     "Jubilee Mall, Admiralty Way, Lekki Phase 1, Lekki",
//     "2 Admiralty Road, Lekki Phase 1",
//     "Ground floor, Legends Place Mall, Plot 29 Fola Osibo, Lekki Phase 1",
//     "3 Ijaiye Road, Beside FCMB, Ogba",
//     "141 Ogudu Road, Beside UBA, Studio24 Building, Ogudu",
//     "Opposite Divas Cake, Beside Access Bank, Ojodu Berger Bus Stop",
//     "Old Ojo Road, After Agboju Bus Stop, Opposite Access Bank",
//     "Banex Mall, Suite V.GL 01, Akiogun Road, Oniru",
//     "62B Opebi Road, Opposite So-Fresh, Opebi, Ikeja",
//     "Orchid Road (E-MALL Plaza), By Van Daniel's Estate, Orchid",
//     "2 Ganiu Eletu Way, Osapa London, Lekki-Epe Expressway",
//     "25 Otto Causeway, Opposite Iddo Bus Stop, Iddo Ebute Metta",
//     "26 Adeniran Ogunsanya, Surulere",
//     "169 Badagry Expressway, Volkswagen Bus Stop",
//     "1436 Sanusi Fafunwa Street, Victoria Island",
//     "272b Akin Adeshola Street, Beside Honda Place, Victoria Island",
//     "Tejuosho Ultra Modern Shopping Complex, Ojuelegba Road, Yaba",
//   ],
//   Nasarawa: ["Police Officers' Mess, Opposite Polaris Bank, Jos Road, Lafia"],
//   Niger: ["Beside NEPA Office, Farm Center Area, Tunga, Minna"],
//   Ogun: [
//     "62 Tinubu Street, Ita Eko, Abeokuta",
//     "SSANU Complex, Beside Paradise, FUNAAB, Abeokuta",
//     "102 Ibadan Road, Opposite NEPA Office, Ibadan Garage, Ijebu Ode",
//     "3 Abeokuta-Lagos Expressway, Opposite Sango Bridge, Sango Ota",
//   ],
//   Ondo: [
//     "22 Oyemekun Road, Opposite SLOT, Akure",
//     "30 Yaba Street, Opposite Crunchies, Ondo Town",
//   ],
//   Osun: [
//     "EXODUS Filling Station, Mayfair, Ile-Ife, Osun State",
//     "Gbongan-Ibadan Road, NIPCO Filling Station, Ogo Oluwa, Osogbo",
//   ],
//   Oyo: [
//     "Town Planning Complex, By Sumal Foods, Ring Road, Ibadan",
//     "Opposite Funcktionals Clothing, Bodija-UI Road, UI, Ibadan",
//     "Adjacent Olowo Tin Fowo Shanu Shopping Complex, Iwo Road, Ibadan",
//     "Eterna Filling Station (Akala Complex), Starlight, Ogbomoso",
//   ],
//   Plateau: [
//     "Plaza 1080, Yakubu Gowon Way, Dadin Kowa Second Gate",
//     "Opposite Jankwano, Bingham University Teaching Hospital, Jos",
//   ],
//   Rivers: [
//     "18 Ada George, By Okilton Junction, Port Harcourt",
//     "Linus Book Shop Building, Beside Today FM Road, East-West Road, PHC",
//     "Cocaine Village Junction, Off Aba Road, Rumuogba, Port Harcourt",
//     "299 Old Refinery Road, By De-Young Junction, Elelenwo, Port Harcourt",
//     "Emmanuel Plaza, G.U. Ake Road, Eliogbolo, Eliozu, Port Harcourt",
//     "61 Olu Obasanjo Road, Opposite Olu Obasanjo Roundabout, Port Harcourt",
//     "89 Peter Odili Road, Besides Eterna Filling Station, Port Harcourt",
//     "Big Treat Rukpokwu, KM 16 Airport Road, Port Harcourt",
//     "9 Stadium Road, Beside Benjack, Port Harcourt",
//     "67 Tombia Ext, GRA, Port Harcourt",
//     "Agora Plaza, 118 Woji Road, By Bodo Junction, GRA Phase 2, Port Harcourt",
//   ],
//   Sokoto: ["3/4 Maiduguri Road, Gawon Nama Area"],
//   Taraba: ["106 White Castle Plaza, Barde Way, Jalingo"],
//   Yobe: ["Shop 2, Adhaza Plaza, Gashuwa Road, Damaturu"],
//   Zamfara: ["C1, A.A. Master Plaza, Canteen Road, Gusau"],
// };

// const TerminalPickupPrices = {
//   Lagos: 1800,
//   Ogun: 2700,
//   Oyo: 3500, // Ibadan & Ogbomoso
//   Osun: 4500,
//   Ekiti: 4500,
//   Ondo: 4500,
//   Edo: 4500,

//   // Middle/South-South/North Central (₦6000)
//   Bayelsa: 6000,
//   "Cross River": 6000,
//   Anambra: 6000,
//   Rivers: 6000,
//   "Federal Capital Territory": 6000,
//   Enugu: 6000,
//   Imo: 6000,
//   Abia: 6000,
//   Delta: 6000,
//   Benue: 6000,
//   Ebonyi: 6000,
//   Kogi: 6000,
//   Kwara: 6000,
//   Plateau: 6000,
//   Nasarawa: 6000,
//   Niger: 6000,
//   "Akwa Ibom": 6000,

//   // Upper North (₦7000)
//   Kaduna: 7000,
//   Kano: 7000,
//   Katsina: 7000,
//   Kebbi: 7000,
//   Sokoto: 7000,
//   Borno: 7000,
//   Jigawa: 7000,
//   Yobe: 7000,
//   Zamfara: 7000,
//   Gombe: 7000,
//   Bauchi: 7000,
//   Adamawa: 7000,
//   Taraba: 7000,
// };

// export default function CheckoutPage() {
//   const [buyerCoordinates, setBuyerCoordinates] = useState<{
//     latitude: number | null;
//     longitude: number | null;
//   }>({ latitude: null, longitude: null });

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
//   const router = useRouter();

//   // Get values from store
//   const currentStep = checkoutData.currentStep;

//   const {
//     control,
//     handleSubmit,
//     trigger,
//     watch,
//     setValue,
//     clearErrors,
//     register,
//     formState: { isValid, errors },
//   } = useForm({
//     resolver: useFormResolver(async (data) => {
//       // Update store with form data
//       setCustomerInfo(data.customerInfo);

//       if (deliveryType === "home") {
//         setCustomerAddress(data.customerAddress);
//       }

//       setDeliveryMethod(deliveryType);

//       if (deliveryType === "terminal" && selectedTerminal) {
//         setTerminalAddress(selectedTerminal);
//       }
//       return data;
//     }, deliveryFormSchema).resolver,
//     mode: "onChange",
//     defaultValues: {
//       customerInfo: {
//         name: checkoutData.customerInfo.name || "",
//         email: checkoutData.customerInfo.email || "",
//         phone: checkoutData.customerInfo.phone || "",
//       },
//       customerAddress: {
//         streetAddress: checkoutData.customerAddress.streetAddress || "",
//         state: checkoutData.customerAddress.state || "",
//         lga: checkoutData.customerAddress.lga || "",
//         directions: checkoutData.customerAddress.directions || "",
//       },
//     },
//   });

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
//         if (
//           logisticsPricingData.data.buyerLatitude &&
//           logisticsPricingData.data.buyerLongitude
//         ) {
//           setBuyerCoordinates({
//             latitude: logisticsPricingData.data.buyerLatitude,
//             longitude: logisticsPricingData.data.buyerLongitude,
//           });
//         } else {
//           setBuyerCoordinates({
//             latitude: 6.5244 + (Math.random() - 0.5) * 0.1,
//             longitude: 3.3792 + (Math.random() - 0.5) * 0.1,
//           });
//         }
//       }
//     } else if (logisticsPricingError) {
//       console.error("Logistics pricing error:", logisticsPricingError);
//       // Update store with fallback fee
//       updateDeliveryFee(1500);
//       setBuyerCoordinates({
//         latitude: 6.5244 + (Math.random() - 0.5) * 0.1,
//         longitude: 3.3792 + (Math.random() - 0.5) * 0.1,
//       });
//     }
//   }, [logisticsPricingData, logisticsPricingError, updateDeliveryFee]);

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
//         variantColor: summary.item.color,
//         variantSize: summary.item.size,
//       }),
//       // For non-variation items, use product-level color and size
//       ...(!summary.item.variationId && {
//         productColor: summary.item.color,
//         productSize: summary.item.size,
//       }),
//     }));
//   };

//   const prepareOrderData = (paymentReference: string) => {
//     const orderData = {
//       // Buyer information
//       buyerName: checkoutData.customerInfo.name,
//       buyerEmail: checkoutData.customerInfo.email,
//       buyerPhone: checkoutData.customerInfo.phone,
//       buyerAddress: checkoutData.customerAddress.streetAddress,
//       buyerLga: checkoutData.customerAddress.lga,
//       buyerState: checkoutData.customerAddress.state,
//       buyerDirections: checkoutData.customerAddress.directions || "",
//       buyerInstructions: checkoutData.deliveryInstructions || "",
//       buyerLatitude: buyerCoordinates.latitude,
//       buyerLongitude: buyerCoordinates.longitude,
//       paymentMethod: "online",
//       totalAmount: total,
//       deliveryFee: deliveryFee,
//       platform: orderSummaries[0]?.platform || platform,
//       subdomain:
//         (orderSummaries[0].platform === "store" &&
//           orderSummaries[0].referralId) ||
//         "",
//       plugId:
//         (orderSummaries[0]?.platform !== "store" &&
//           orderSummaries[0]?.referralId) ||
//         "",
//       orderItems: formatOrderItems(),
//       // Payment reference for online payments
//       paymentReference,
//       deliveryType: deliveryType,
//       terminalAddress: deliveryType === "terminal" ? selectedTerminal : null,
//     };
//     return orderData;
//   };

//   const placeOrder = async (paymentReference: string) => {
//     try {
//       setIsLoading(true);
//       const orderData = prepareOrderData(paymentReference);
//       const response = await fetch("/api/orders/place-order", {
//         method: "POST",
//         headers: {
//           "Content-Type": "application/json",
//         },
//         body: JSON.stringify(orderData),
//       });

//       if (!response.ok) {
//         const errorData = await response.json();
//         errorToast(errorData.error || "Failed to place order");
//         clearCheckoutData();
//         clearOrderSummaries();
//         router.replace("/order-error");
//         return;
//       }

//       const result = await response.json();
//       successToast(result.message || "Order placed successfully");

//       // Store order success data for thank you page
//       if (result.data) {
//         sessionStorage.setItem("orderSuccess", JSON.stringify(result.data));
//       }

//       // Clear all checkout data and order summary
//       clearCheckoutData();
//       clearOrderSummaries();

//       // Navigate to thank you page
//       router.replace("/thank-you");
//       return result;
//     } catch (error) {
//       console.error("Error placing order:", error);
//       errorToast("An error occurred while placing the order");
//     } finally {
//       setIsLoading(false);
//     }
//   };

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
//             color: item.variation
//               ? product.variations?.find((v: any) => v.id === item.variation)
//                   ?.color
//               : undefined,
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
//           };
//         });

//       // Update the store with transformed data
//       if (transformedOrderSummaries.length > 0) {
//         setOrderSummaries(transformedOrderSummaries);
//       }
//     }
//   }, [platform, productsData, isProductsLoading, ref, setOrderSummaries]);

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

//     // Initialize form with stored data
//     setValue("customerInfo.name", checkoutData.customerInfo.name || "");
//     setValue("customerInfo.email", checkoutData.customerInfo.email || "");
//     setValue("customerInfo.phone", checkoutData.customerInfo.phone || "");
//     setValue(
//       "customerAddress.streetAddress",
//       checkoutData.customerAddress.streetAddress || ""
//     );
//     setValue("customerAddress.state", checkoutData.customerAddress.state || "");
//     setValue("customerAddress.lga", checkoutData.customerAddress.lga || "");
//     setValue(
//       "customerAddress.directions",
//       checkoutData.customerAddress.directions || ""
//     );
//   }, [setValue, checkoutData]);

//   // Watch state changes to update LGAs
//   useEffect(() => {
//     if (watchedState && watchedState !== selectedState) {
//       setSelectedState(watchedState);
//       const lgas = getLgasForState(watchedState);
//       setAvailableLgas(lgas);
//       // Update the state in the store
//       setCustomerAddress({ state: watchedState });
//     }
//   }, [watchedState, selectedState, setValue, setCustomerAddress]);

//   // Watch form values for real-time validation and store updates
//   const watchedCustomerInfo = watch("customerInfo");
//   const watchedCustomerAddress = watch("customerAddress");

//   useEffect(() => {
//     if (watchedCustomerInfo) {
//       setCustomerInfo(watchedCustomerInfo);
//     }
//   }, [watchedCustomerInfo, setCustomerInfo]);

//   useEffect(() => {
//     if (watchedCustomerAddress) {
//       setCustomerAddress(watchedCustomerAddress);
//     }
//   }, [watchedCustomerAddress, setCustomerAddress]);

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

//   const continueToReview = () => {
//     goToNextStep();
//     if (orderSummaries.length > 0) {
//       orderSummaries.forEach((orderSummary) => {
//         mutate(
//           `/public/products/${orderSummary.item.id}${orderSummary.referralId}`
//         );
//       });
//     }
//   };

//   const showPaymentCancelledModal = () => {
//     // You could use a toast library or custom modal
//     setShowCancelledModal(true);
//   };

//   const paystackConfig = {
//     email: watchedCustomerInfo?.email || "",
//     amount: total * 100, // Paystack expects amount in kobo
//     metadata: {
//       name: watchedCustomerInfo?.name || "",
//       phone: watchedCustomerInfo?.phone || "",
//       address: watchedCustomerAddress
//         ? `${watchedCustomerAddress.streetAddress}, ${watchedCustomerAddress.lga}, ${watchedCustomerAddress.state}`
//         : "",
//       custom_fields: [
//         {
//           display_name: "Order Items",
//           variable_name: "order_items",
//           value: cartItems
//             ?.map((item) => `${item.name} x${item.quantity}`)
//             .join(", "),
//         },
//       ],
//     },
//     publicKey: process.env.NEXT_PUBLIC_PAYSTACK_PUBLIC_KEY,
//     text: isLoading ? "Processing..." : "Place Order",
//     onSuccess: async (reference) => {
//       try {
//         await placeOrder(reference.reference);
//       } catch (error) {
//         console.error("Error placing order after successful payment:", error);
//       }
//     },
//     onClose: () => {
//       showPaymentCancelledModal();
//     },
//   };

//   const formatPrice = (price?: string | number) => {
//     return `₦${price?.toLocaleString()}`;
//   };

//   const goToNextStep = async () => {
//     if (currentStep === "delivery") {
//       // For terminal delivery, only validate customer info
//       if (deliveryType === "terminal") {
//         const customerInfoValid = await trigger("customerInfo");
//         const terminalSelected = selectedTerminal !== null;

//         if (customerInfoValid && terminalSelected) {
//           setDeliveryMethod("terminal");
//           setTerminalAddress(selectedTerminal!);
//           setCurrentStep("review");
//         } else {
//           // Show error for missing terminal selection
//           if (!terminalSelected) {
//             // You could add a toast or error message here
//             console.error("Please select a terminal location");
//           }
//           const firstError = document.querySelector(".border-red-500");
//           if (firstError) {
//             firstError.scrollIntoView({ behavior: "smooth", block: "center" });
//           }
//         }
//       } else {
//         // For home delivery, validate all fields
//         const isFormValid = await trigger();
//         if (isFormValid) {
//           setCurrentStep("review");
//         } else {
//           const firstError = document.querySelector(".border-red-500");
//           if (firstError) {
//             firstError.scrollIntoView({ behavior: "smooth", block: "center" });
//           }
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

//   const renderPlaceOrderButton = () => {
//     // Only render PaystackButton on client side
//     if (!isClient) {
//       return <Button className="flex-1">Loading Payment...</Button>;
//     }

//     return (
//       <PaystackButton
//         {...paystackConfig}
//         className="flex-1 bg-primary text-primary-foreground hover:bg-primary/90 h-10 px-4 py-2 rounded-md font-medium transition-colors"
//       />
//     );
//   };

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
//                               {...register("customerInfo.name")}
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
//                               {...register("customerInfo.email")}
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
//                               {...register("customerInfo.phone")}
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

//                           {selectedState &&
//                             (selectedState === "Lagos" ||
//                               selectedState === "Ogun") && (
//                               <div className="space-y-2">
//                                 <Label>
//                                   Delivery Type{" "}
//                                   <span className="text-red-500">*</span>
//                                 </Label>
//                                 {/* Updated delivery type change handlers to persist immediately */}
//                                 <div className="flex gap-4">
//                                   <div className="flex items-center space-x-2">
//                                     <input
//                                       type="radio"
//                                       id="terminal"
//                                       name="deliveryType"
//                                       value="terminal"
//                                       checked={deliveryType === "terminal"}
//                                       onChange={(e) => {
//                                         const newDeliveryType = e.target
//                                           .value as "terminal" | "home";
//                                         setDeliveryType(newDeliveryType);
//                                         setDeliveryMethod(newDeliveryType);
//                                       }}
//                                       className="w-4 h-4 text-blue-600"
//                                     />
//                                     <Label
//                                       htmlFor="terminal"
//                                       className="font-normal"
//                                     >
//                                       Terminal Pickup
//                                     </Label>
//                                   </div>
//                                   <div className="flex items-center space-x-2">
//                                     <input
//                                       type="radio"
//                                       id="home"
//                                       name="deliveryType"
//                                       value="home"
//                                       checked={deliveryType === "home"}
//                                       onChange={(e) => {
//                                         const newDeliveryType = e.target
//                                           .value as "terminal" | "home";
//                                         setDeliveryType(newDeliveryType);
//                                         setDeliveryMethod(newDeliveryType);
//                                       }}
//                                       className="w-4 h-4 text-blue-600"
//                                     />
//                                     <Label
//                                       htmlFor="home"
//                                       className="font-normal"
//                                     >
//                                       Home Delivery
//                                     </Label>
//                                   </div>
//                                 </div>
//                                 <p className="text-sm text-muted-foreground">
//                                   Terminal pickup locations are GIG Logistics
//                                   pickup offices where you can collect your
//                                   order.
//                                 </p>
//                               </div>
//                             )}

//                           {selectedState &&
//                             deliveryType === "terminal" &&
//                             terminalAddresses[
//                               selectedState as keyof typeof terminalAddresses
//                             ] && (
//                               <div className="space-y-2">
//                                 <Label>
//                                   Select Terminal{" "}
//                                   <span className="text-red-500">*</span>
//                                 </Label>
//                                 <div className="bg-blue-50 border border-blue-200 rounded-md p-3 mb-3">
//                                   <div className="flex items-center justify-between">
//                                     <p className="text-xs text-blue-800">
//                                       <strong>Terminal Pickup Price</strong>
//                                     </p>
//                                     <span className="text-lg font-bold text-blue-900">
//                                       {formatPrice(
//                                         TerminalPickupPrices[
//                                           selectedState as keyof typeof TerminalPickupPrices
//                                         ] || 0
//                                       )}
//                                     </span>
//                                   </div>
//                                   <p className="text-sm text-blue-700 mt-1">
//                                     All pickup locations in {selectedState} have
//                                     the same price
//                                   </p>
//                                 </div>
//                                 <p className="text-sm text-muted-foreground mb-2">
//                                   Scroll to choose a GIG Logistics office near
//                                   you for pickup:
//                                 </p>
//                                 <div className="border rounded-md max-h-48 overflow-y-auto">
//                                   {terminalAddresses[
//                                     selectedState as keyof typeof terminalAddresses
//                                   ].map((terminal, index) => (
//                                     <div
//                                       key={index}
//                                       className={`p-3 border-b last:border-b-0 cursor-pointer hover:bg-muted/50 ${
//                                         selectedTerminal === terminal
//                                           ? "bg-blue-50 border-blue-200"
//                                           : ""
//                                       }`}
//                                       onClick={() => {
//                                         setSelectedTerminal(terminal);
//                                         setTerminalAddress(terminal);
//                                       }}
//                                     >
//                                       <div className="flex items-start space-x-2">
//                                         <input
//                                           type="radio"
//                                           name="terminal"
//                                           value={terminal}
//                                           checked={
//                                             selectedTerminal === terminal
//                                           }
//                                           onChange={() => {
//                                             setSelectedTerminal(terminal);
//                                             setTerminalAddress(terminal);
//                                           }}
//                                           className="w-4 h-4 text-blue-600 mt-1"
//                                         />
//                                         <span className="text-xs whitespace-normal break-words">
//                                           {terminal}
//                                         </span>
//                                       </div>
//                                     </div>
//                                   ))}
//                                 </div>
//                               </div>
//                             )}

//                           {selectedState && deliveryType === "home" && (
//                             <>
//                               {/* Address Specificity Message */}
//                               <Alert className="mb-4">
//                                 <Info className="h-4 w-4" />
//                                 <AlertDescription>
//                                   <strong>💡 Pro Tip:</strong> Providing a very
//                                   specific and detailed address helps our
//                                   logistics partners optimize delivery routes,
//                                   which can potentially reduce your delivery
//                                   costs. Include landmarks, building
//                                   descriptions, and clear directions.
//                                 </AlertDescription>
//                               </Alert>

//                               {/* LGA Selection */}
//                               <div className="space-y-2">
//                                 <Label htmlFor="lga">
//                                   Local Government Area{" "}
//                                   <span className="text-red-500">*</span>
//                                 </Label>
//                                 <Controller
//                                   name="customerAddress.lga"
//                                   control={control}
//                                   render={({ field }) => (
//                                     <Select
//                                       value={field.value}
//                                       onValueChange={async (value) => {
//                                         field.onChange(value);
//                                         setCustomerAddress({ lga: value });
//                                         if (
//                                           value &&
//                                           errors.customerAddress?.lga
//                                         ) {
//                                           const isValid = await trigger(
//                                             "customerAddress.lga"
//                                           );
//                                           if (isValid)
//                                             clearErrors("customerAddress.lga");
//                                         }
//                                       }}
//                                       disabled={
//                                         !selectedState ||
//                                         availableLgas.length === 0
//                                       }
//                                     >
//                                       <SelectTrigger
//                                         id="lga"
//                                         className={
//                                           errors.customerAddress?.lga
//                                             ? "border-red-500"
//                                             : ""
//                                         }
//                                       >
//                                         <SelectValue
//                                           placeholder={
//                                             selectedState
//                                               ? "Select a Local Government Area"
//                                               : "Please select a state first"
//                                           }
//                                         />
//                                       </SelectTrigger>
//                                       <SelectContent>
//                                         {availableLgas.map((lga) => (
//                                           <SelectItem key={lga} value={lga}>
//                                             {lga}
//                                           </SelectItem>
//                                         ))}
//                                       </SelectContent>
//                                     </Select>
//                                   )}
//                                 />
//                                 {errors.customerAddress?.lga && (
//                                   <p className="text-sm text-red-600">
//                                     {errors.customerAddress.lga.message}
//                                   </p>
//                                 )}
//                               </div>

//                               {/* Street Address */}
//                               <div className="space-y-2">
//                                 <Label htmlFor="streetAddress">
//                                   Street Address{" "}
//                                   <span className="text-red-500">*</span>
//                                 </Label>
//                                 <Textarea
//                                   id="streetAddress"
//                                   {...register("customerAddress.streetAddress")}
//                                   rows={3}
//                                   className={
//                                     errors.customerAddress?.streetAddress
//                                       ? "border-red-500"
//                                       : ""
//                                   }
//                                   placeholder="Enter your full street address including house number, street name, area, and nearby landmarks for accurate delivery"
//                                 />
//                                 {errors.customerAddress?.streetAddress && (
//                                   <p className="text-sm text-red-600">
//                                     {
//                                       errors.customerAddress.streetAddress
//                                         .message
//                                     }
//                                   </p>
//                                 )}
//                               </div>

//                               {/* Additional Directions */}
//                               <div className="space-y-2">
//                                 <Label htmlFor="directions">
//                                   Additional Directions{" "}
//                                   <span className="text-gray-500">
//                                     (Optional)
//                                   </span>
//                                 </Label>
//                                 <Textarea
//                                   id="directions"
//                                   {...register("customerAddress.directions")}
//                                   rows={3}
//                                   className={
//                                     errors.customerAddress?.directions
//                                       ? "border-red-500"
//                                       : ""
//                                   }
//                                   placeholder="Additional directions to help locate your address (e.g., 'Opposite First Bank', 'Blue gate with security post', 'Third floor, Apartment 3B')"
//                                 />
//                                 {errors.customerAddress?.directions && (
//                                   <p className="text-sm text-red-600">
//                                     {errors.customerAddress.directions.message}
//                                   </p>
//                                 )}
//                               </div>
//                             </>
//                           )}

//                           {/* Delivery Pricing Status */}
//                           {(isLogisticsPricingLoading ||
//                             logisticsPricingError ||
//                             logisticsPricingData?.data?.price !==
//                               undefined) && (
//                             <div className="p-3 border rounded-md bg-muted/50">
//                               <div className="flex items-center gap-2">
//                                 {logisticsPricingError && (
//                                   <span className="text-sm text-red-600">
//                                     Unable to calculate delivery fee - using
//                                     standard rate
//                                   </span>
//                                 )}
//                                 {logisticsPricingData?.data?.price !==
//                                   undefined &&
//                                   !isLogisticsPricingLoading && (
//                                     <span className="text-sm text-green-600">
//                                       Delivery fee calculated:{" "}
//                                       {formatPrice(
//                                         logisticsPricingData.data.price
//                                       )}
//                                     </span>
//                                   )}
//                               </div>
//                             </div>
//                           )}
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

//                       {/* Updated review section to show terminal address when delivery method is terminal */}
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
//                               {checkoutData.deliveryMethod === "terminal" ? (
//                                 <span className="break-words whitespace-normal">
//                                   <strong>Terminal Pickup:</strong>
//                                   <br />
//                                   {checkoutData.terminalAddress ||
//                                     selectedTerminal ||
//                                     "Terminal Address"}
//                                 </span>
//                               ) : (
//                                 // Show regular address for home delivery
//                                 <>
//                                   {checkoutData.customerAddress.streetAddress ||
//                                     "Street Address"}
//                                   {checkoutData.customerAddress.directions && (
//                                     <>
//                                       <br />
//                                       <span className="text-muted-foreground">
//                                         Directions:{" "}
//                                         {
//                                           checkoutData.customerAddress
//                                             .directions
//                                         }
//                                       </span>
//                                     </>
//                                   )}
//                                   <br />
//                                   {checkoutData.customerAddress.lga},{" "}
//                                   {checkoutData.customerAddress.state}
//                                 </>
//                               )}
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
//                           {isLogisticsPricingLoading && (
//                             <Loader2 className="h-3 w-3 animate-spin ml-1 inline" />
//                           )}
//                         </span>
//                         <span className="text-sm">
//                           {deliveryType === "terminal" && selectedState
//                             ? formatPrice(
//                                 TerminalPickupPrices[
//                                   selectedState as keyof typeof TerminalPickupPrices
//                                 ] || 0
//                               )
//                             : !watchedState ||
//                               !watchedLga ||
//                               !watchedStreetAddress
//                             ? "Enter address to calculate"
//                             : deliveryFee === null
//                             ? "Calculating..."
//                             : deliveryFee === 0
//                             ? "Free"
//                             : formatPrice(deliveryFee)}
//                         </span>
//                       </div>
//                       {logisticsPricingError && (
//                         <div className="text-xs text-red-600 mt-1">
//                           Unable to calculate delivery fee - using standard rate
//                         </div>
//                       )}
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

//                 {/* Help Section */}
//                 <Card className="mt-6">
//                   <CardContent className="p-6">
//                     <div className="space-y-4 text-sm">
//                       <div className="flex items-start">
//                         <span className="mr-2 text-primary">•</span>
//                         <p>
//                           Orders are typically delivered 1-3 days for locations
//                           within Lagos and Ogun, and 3-7 days for other
//                           locations
//                         </p>
//                       </div>
//                       <div className="flex items-start">
//                         <span className="mr-2 text-primary">•</span>
//                         <p>
//                           We accept returns within 3 days of delivery, provided
//                           items meet our return policy
//                         </p>
//                       </div>
//                       <div className="flex items-start">
//                         <span className="mr-2 text-primary">•</span>
//                         <p>Detailed addresses help reduce delivery costs</p>
//                       </div>
//                     </div>
//                   </CardContent>
//                 </Card>
//               </div>
//             </div>
//           </div>
//         </div>
//       )}

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







// "use client"
// import { useState, useEffect, useMemo } from "react"
// import dynamic from "next/dynamic"
// import Image from "next/image"
// import { useRouter, useSearchParams } from "next/navigation"
// import { CreditCard, MapPin, ArrowLeft, Loader2, Info } from "lucide-react"
// import useSWR, { mutate } from "swr"
// import {
//   AlertDialog,
//   AlertDialogAction,
//   AlertDialogCancel,
//   AlertDialogContent,
//   AlertDialogDescription,
//   AlertDialogFooter,
//   AlertDialogHeader,
//   AlertDialogTitle,
// } from "@/components/ui/alert-dialog"
// import { Button } from "@/components/ui/button"
// import { Card, CardContent } from "@/components/ui/card"
// import { Separator } from "@/components/ui/separator"
// import { Label } from "@/components/ui/label"
// import { Textarea } from "@/components/ui/textarea"
// import { Alert, AlertDescription } from "@/components/ui/alert"
// import { useFormResolver } from "@/hooks/useFormResolver"
// import { Controller, useForm } from "react-hook-form"
// import NaijaStates from "naija-state-local-government"
// import { getLgasForState } from "@/lib/utils"
// import { Input } from "@/components/ui/input"
// import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
// import { deliveryFormSchema } from "@/zod/schema"
// import { useCheckoutStore } from "@/hooks/checkout-store"
// import { errorToast, successToast } from "@/components/ui/use-toast-advanced"
// import { getVariationDisplayName, parseCheckoutUrl } from "@/lib/url-parser"
// import { useProductFetching } from "@/hooks/use-product-fetcher"
// import { useProductStore } from "@/hooks/product-store"

// // Dynamic import of PaystackButton to prevent SSR issues
// const PaystackButton = dynamic(() => import("react-paystack").then((mod) => mod.PaystackButton), {
//   ssr: false,
//   loading: () => <Button className="flex-1">Loading Payment...</Button>,
// })

// // SWR fetcher function
// const fetcher = async (url: string) => {
//   const response = await fetch(url)
//   if (!response.ok) {
//     throw new Error(`HTTP error! status: ${response.status}`)
//   }
//   return response.json()
// }

// // SWR configuration options
// const swrOptions = {
//   revalidateOnFocus: false,
//   revalidateOnReconnect: true,
//   refreshInterval: 0,
//   dedupingInterval: 5000,
//   errorRetryCount: 0,
// }

// // Specific SWR options for logistics pricing (more frequent updates)
// const logisticsPricingOptions = {
//   ...swrOptions,
//   refreshInterval: 600000,
//   revalidateOnFocus: false,
//   dedupingInterval: 600000,
// }

// // SWR options for buyer info (cached longer)
// const buyerInfoOptions = {
//   ...swrOptions,
//   dedupingInterval: 10000, // Cache buyer info longer
//   refreshInterval: 0, // Don't auto-refresh buyer info
// }

// const terminalAddresses = {
//   Abia: [
//     "Asa Road, Former NITEL Building, Aba",
//     "G.R.A, After Jevinic Restaurant, Aba",
//     "Opposite Villaroy Hotel, Umuahia Main Town",
//     "Close to MTN Office, Aba Road, Umuahia",
//   ],

//   "Federal Capital Territory": [
//     "Ademola Adetokunbo Crescent, Wuse 2",
//     "Area 1 Shopping Plaza, Area 1, Abuja",
//     "Beside Lifemate Furniture, Area 11, Garki",
//     "3rd Avenue Gwarinpa, Opposite Union Bank, Abuja",
//     "Opposite DIVIB Plaza, By 7th Avenue Junction, Gwarinpa",
//     "Opposite Aso-Oke Hotel, Gwagwalada",
//     "Gado Nasko Way, Along El-Rufai Bus Stop, Kubwa",
//     "Plot 17, Gidan Dutse Layout, Kubwa",
//     "Kukwaba General Park, Kubwa",
//     "Beside Remaco Filling Station, Lugbe",
//     "Along Zuba Expressway, Madalla",
//     "Opposite Chrisgold Plaza, Beside MTN Office, Mararaba",
//     "Along Nyanya-Jikwoyi Road, Nyanya, Abuja",
//     "Beside Utako Police Station, Utako, Abuja",
//     "Off Obafemi Awolowo Expressway, Utako, Abuja",
//     "Beside Wema Bank Banex, Wuse 2",
//     "Opposite Lagos Line, Zuba",
//   ],
//   Adamawa: ["Fire Service Roundabout, Jimeta, Yola"],
//   Anambra: [
//     "Crunchies Fries, Enugu/Onitsha Expressway, Awka",
//     "The Salvation Army Church, Umudim, Nnewi",
//     "All Saints' Anglican Cathedral, Onitsha",
//   ],
//   "Akwa Ibom": [
//     "Opposite Royalty Hotel, Eket",
//     "Itam industrial Layout, Opposite Timber Market, Itam",
//     "Beside First Bank, Uyo",
//   ],
//   Bauchi: ["Opposite Gwaram and Sons Plaza, Yandoka Road, Bauchi"],
//   Bayelsa: ["Opposite Wema Bank, By INEC Junction, Yenogoa", "Tamic Road Junction, Okutukutu, Yenegoa"],
//   Benue: ["Opposite Dester, By Savannah Roundabout, Makurdi"],
//   Borno: ["Opposite Elkanemi College, Jos Road, Maiduguri"],
//   "Cross River": ["29 Ndidem Usang Iso Road, Calabar", "Beside UNICAL, Opposite MTN Office, Calabar"],
//   Delta: [
//     "Asaba-Onitsha Expressway, By Head Bridge",
//     "Opposite Zenith Bank, Asaba",
//     "Okpanam Road, Asaba",
//     "Off Ughelli-Warri Expressway, Ughelli",
//     "Effurun, Opposite Our Ladies High School",
//     "128 Effurun-Sapele Road, Opposite Solidas, By 7UP Bus Stop",
//   ],
//   Ebonyi: ["Opposite International Market, Abakaliki"],
//   Edo: [
//     "Omegatron Plaza, 47 Airport Road, Benin City",
//     "112 Akpakpava Road, Benin City",
//     "Opposite Auchi Polytechnic Sport Complex, Auchi-Okene Expressway, Auchi",
//     "Along Benin-Auchi Expressway, Beside Big Joe Park, Ekpoma",
//     "42 Benin-Agbor Road, EcoBus Park, Ramat, Benin City",
//     "Beside Genesis Restaurant, Opposite Uwa Junction, Benin City",
//     "202 Uselu-Lagos Road, Ugbowo, Benin City",
//   ],
//   Ekiti: ["Soladola Filling Station, Beside APC Secretariat, Along Ikere Road, Ajilosun"],
//   Enugu: ["Opposite Osisatech Polytechnic, Enugu", "67 Zik Avenue, Uwani, Enugu", "64 Owerrani, Enugu Road, Nsukka"],
//   Gombe: ["Along FTH/Police Headquarters, Ashaka Road, Gombe"],

//   Imo: [
//     "Relief Road, By Relief Junction, Off Egbu Road, Owerri",
//     "Odonko Plaza, No. 7 Nwaturuocha Street, Ikenegbu, Owerri",
//     "Along Umuguma Road (World Bank Last Roundabout), New Owerri",
//   ],
//   Jigawa: ["Government House Roundabout, Asamau House, Dutse"],
//   Kaduna: [
//     "Jos Road Plaza, 19/20 Jos Road, By Ahmadu Bello Way, Kaduna",
//     "Opposite Kaduna Old Airport Road, Kaduna",
//     "Nnamdi Azikiwe Expressway, By Command Junction",
//     "Beside Shagalinku London Hotel, Sabon Gari, Zaria",
//   ],
//   Kano: [
//     "By Tafawa Balewa Way, Opposite Domino's Pizza, Kano",
//     "Centro Plaza, Opposite BUK Old Site, Kabuga, Kano",
//     "Zaria Road, Opposite Kano State House of Assembly",
//   ],
//   Katsina: ["Abudullahi Sarki Muktar Road, Near Tukur Jikamshi Residence, Katsina"],
//   Kebbi: ["Opposite Alhaji Boye Coca-Cola Depot, Birnin Kebbi"],
//   Kogi: ["Lokoja, Close to Federal Medical Center"],
//   Kwara: ["Adjacent Chicken Republic, Ilorin", "34B University of Ilorin Road, Tanke, Ilorin"],
//   Lagos: [
//     "568 Abeokuta Expressway, Ajala Bus Stop, Abule-Egba",
//     "Tripple Ace Dew Building, Opposite Enyo Filling Station, Addo Road",
//     "Morogbo, Along Badagry Expressway, Agbara",
//     "KM 25, Lekki-Epe Expressway, Ajiwe-Ajah",
//     "KM 22, Lekki-Epe Expressway, By Abraham Adesanya Roundabout, Ajah",
//     "41 Shasha Road, Akowonjo Junction, Dopemu",
//     "By Dobbil Avenue, Along Phone Village Road, Alaba International Market",
//     "Opposite Diamond Estate, By Festac Link Bridge, Amuwo Odofin",
//     "By Ogunfayo Bus Stop, KM 36, Lekki-Epe Expressway, Eputu, Awoyaya",
//     "158 Broad Street, Lagos Island (Behind UBA Head Office, Marina)",
//     "103 Okota Road, Cele",
//     "Beside Petrocam Filling Station, Near Epe T-Junction, Epe",
//     "69 Ikorodu Road, Fadeyi",
//     "Festac First Gate, Beside INEC Office, Festac Town",
//     "7 Hospital Road, Ifako, Gbagada",
//     "Gbagada Expressway, Beside Eterna Filling Station, Gbagada",
//     "KM 17, Scapular Plaza, Igbo Efon",
//     "9 Medical Road, Former Simbiat Abiola Way, Opposite Zenith Bank",
//     "80 Awolowo Way, Ikeja",
//     "103 Awolowo Road, Ikoyi",
//     "16 Ikosi Road, Ketu",
//     "Sabo Road Garage, Ikorodu",
//     "29 Idimu Road, Opposite Local Government Council, Ikotun",
//     "12 Industrial Avenue, Cappa Bus Stop, Ilupeju",
//     "Lagos International Trade Fair Complex",
//     "164 Lagos-Abeokuta Expressway, Beside Access Bank, Iyana Ipaja",
//     "43 Osolo Way, Ajao Estate, Ekwu Awolo House",
//     "GIGM Terminal, 20 Ikorodu Express Road, Jibowu",
//     "No. 1A, Wole Ariyo Street, Beside First Bank, Lekki Phase 1",
//     "Jubilee Mall, Admiralty Way, Lekki Phase 1, Lekki",
//     "2 Admiralty Road, Lekki Phase 1",
//     "Ground floor, Legends Place Mall, Plot 29 Fola Osibo, Lekki Phase 1",
//     "3 Ijaiye Road, Beside FCMB, Ogba",
//     "141 Ogudu Road, Beside UBA, Studio24 Building, Ogudu",
//     "Opposite Divas Cake, Beside Access Bank, Ojodu Berger Bus Stop",
//     "Old Ojo Road, After Agboju Bus Stop, Opposite Access Bank",
//     "Banex Mall, Suite V.GL 01, Akiogun Road, Oniru",
//     "62B Opebi Road, Opposite So-Fresh, Opebi, Ikeja",
//     "Orchid Road (E-MALL Plaza), By Van Daniel's Estate, Orchid",
//     "2 Ganiu Eletu Way, Osapa London, Lekki-Epe Expressway",
//     "25 Otto Causeway, Opposite Iddo Bus Stop, Iddo Ebute Metta",
//     "26 Adeniran Ogunsanya, Surulere",
//     "169 Badagry Expressway, Volkswagen Bus Stop",
//     "1436 Sanusi Fafunwa Street, Victoria Island",
//     "272b Akin Adeshola Street, Beside Honda Place, Victoria Island",
//     "Tejuosho Ultra Modern Shopping Complex, Ojuelegba Road, Yaba",
//   ],
//   Nasarawa: ["Police Officers' Mess, Opposite Polaris Bank, Jos Road, Lafia"],
//   Niger: ["Beside NEPA Office, Farm Center Area, Tunga, Minna"],
//   Ogun: [
//     "62 Tinubu Street, Ita Eko, Abeokuta",
//     "SSANU Complex, Beside Paradise, FUNAAB, Abeokuta",
//     "102 Ibadan Road, Opposite NEPA Office, Ibadan Garage, Ijebu Ode",
//     "3 Abeokuta-Lagos Expressway, Opposite Sango Bridge, Sango Ota",
//   ],
//   Ondo: ["22 Oyemekun Road, Opposite SLOT, Akure", "30 Yaba Street, Opposite Crunchies, Ondo Town"],
//   Osun: [
//     "EXODUS Filling Station, Mayfair, Ile-Ife, Osun State",
//     "Gbongan-Ibadan Road, NIPCO Filling Station, Ogo Oluwa, Osogbo",
//   ],
//   Oyo: [
//     "Town Planning Complex, By Sumal Foods, Ring Road, Ibadan",
//     "Opposite Funcktionals Clothing, Bodija-UI Road, UI, Ibadan",
//     "Adjacent Olowo Tin Fowo Shanu Shopping Complex, Iwo Road, Ibadan",
//     "Eterna Filling Station (Akala Complex), Starlight, Ogbomoso",
//   ],
//   Plateau: [
//     "Plaza 1080, Yakubu Gowon Way, Dadin Kowa Second Gate",
//     "Opposite Jankwano, Bingham University Teaching Hospital, Jos",
//   ],
//   Rivers: [
//     "18 Ada George, By Okilton Junction, Port Harcourt",
//     "Linus Book Shop Building, Beside Today FM Road, East-West Road, PHC",
//     "Cocaine Village Junction, Off Aba Road, Rumuogba, Port Harcourt",
//     "299 Old Refinery Road, By De-Young Junction, Elelenwo, Port Harcourt",
//     "Emmanuel Plaza, G.U. Ake Road, Eliogbolo, Eliozu, Port Harcourt",
//     "61 Olu Obasanjo Road, Opposite Olu Obasanjo Roundabout, Port Harcourt",
//     "89 Peter Odili Road, Besides Eterna Filling Station, Port Harcourt",
//     "Big Treat Rukpokwu, KM 16 Airport Road, Port Harcourt",
//     "9 Stadium Road, Beside Benjack, Port Harcourt",
//     "67 Tombia Ext, GRA, Port Harcourt",
//     "Agora Plaza, 118 Woji Road, By Bodo Junction, GRA Phase 2, Port Harcourt",
//   ],
//   Sokoto: ["3/4 Maiduguri Road, Gawon Nama Area"],
//   Taraba: ["106 White Castle Plaza, Barde Way, Jalingo"],
//   Yobe: ["Shop 2, Adhaza Plaza, Gashuwa Road, Damaturu"],
//   Zamfara: ["C1, A.A. Master Plaza, Canteen Road, Gusau"],
// }

// const TerminalPickupPrices = {
//   Lagos: 1800,
//   Ogun: 2700,
//   Oyo: 3500, // Ibadan & Ogbomoso
//   Osun: 4500,
//   Ekiti: 4500,
//   Ondo: 4500,
//   Edo: 4500,

//   // Middle/South-South/North Central (₦6000)
//   Bayelsa: 6000,
//   "Cross River": 6000,
//   Anambra: 6000,
//   Rivers: 6000,
//   "Federal Capital Territory": 6000,
//   Enugu: 6000,
//   Imo: 6000,
//   Abia: 6000,
//   Delta: 6000,
//   Benue: 6000,
//   Ebonyi: 6000,
//   Kogi: 6000,
//   Kwara: 6000,
//   Plateau: 6000,
//   Nasarawa: 6000,
//   Niger: 6000,
//   "Akwa Ibom": 6000,

//   // Upper North (₦7000)
//   Kaduna: 7000,
//   Kano: 7000,
//   Katsina: 7000,
//   Kebbi: 7000,
//   Sokoto: 7000,
//   Borno: 7000,
//   Jigawa: 7000,
//   Yobe: 7000,
//   Zamfara: 7000,
//   Gombe: 7000,
//   Bauchi: 7000,
//   Adamawa: 7000,
//   Taraba: 7000,
// }

// export default function CheckoutPage() {
//   const [buyerCoordinates, setBuyerCoordinates] = useState<{
//     latitude: number | null
//     longitude: number | null
//   }>({ latitude: null, longitude: null })

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

//   const [isClient, setIsClient] = useState(false)
//   const [states, setStates] = useState<string[]>([])
//   const [availableLgas, setAvailableLgas] = useState<string[]>([])
//   const [selectedState, setSelectedState] = useState("")
//   const [isLoading, setIsLoading] = useState(false)
//   const [showCancelledModal, setShowCancelledModal] = useState(false)
//   const [selectedTerminal, setSelectedTerminal] = useState("")
//   const router = useRouter()

//   // Get values from store
//   const currentStep = checkoutData.currentStep
//   const deliveryType = checkoutData.deliveryMethod || "terminal"
//   const terminalAddress = checkoutData.terminalAddress || ""

//   const {
//     control,
//     handleSubmit,
//     trigger,
//     watch,
//     setValue,
//     clearErrors,
//     register,
//     formState: { isValid, errors },
//   } = useForm({
//     resolver: useFormResolver(async (data) => {
//       // Update store with form data
//       setCustomerInfo(data.customerInfo)

//       if (deliveryType === "home") {
//         setCustomerAddress(data.customerAddress)
//       }

//       setDeliveryMethod(deliveryType)

//       if (deliveryType === "terminal" && selectedTerminal) {
//         setTerminalAddress(selectedTerminal)
//       }
//       return data
//     }, deliveryFormSchema).resolver,
//     mode: "onChange",
//     defaultValues: {
//       customerInfo: {
//         name: checkoutData.customerInfo.name || "",
//         email: checkoutData.customerInfo.email || "",
//         phone: checkoutData.customerInfo.phone || "",
//       },
//       customerAddress: {
//         streetAddress: checkoutData.customerAddress.streetAddress || "",
//         state: checkoutData.customerAddress.state || "",
//         lga: checkoutData.customerAddress.lga || "",
//         directions: checkoutData.customerAddress.directions || "",
//       },
//     },
//   })

//   const searchParams = useSearchParams()

//   // Parse URL parameters
//   const parsedUrl = useMemo(() => {
//     return parseCheckoutUrl(searchParams)
//   }, [searchParams])

//   const { items, ref, platform } = parsedUrl

//   // Fetch products when platform is "store"
//   const {
//     productsData,
//     error: productFetchError,
//     isLoading: isProductsLoading,
//   } = useProductFetching(items, ref, platform, true)

//   const {
//     orderSummaries: productStoreOrderSummaries,
//     setOrderSummaries,
//     clearOrderSummaries,
//     updateDeliveryFee,
//   } = useProductStore()

//   // Get cart items from orderSummaries (works for both store and non-store platforms)
//   const cartItems = useMemo(() => {
//     if (platform === "store") {
//       return productStoreOrderSummaries.map((summary) => summary.item)
//     }
//     // Fallback for non-store platforms (existing logic)
//     return productStoreOrderSummaries.map((summary) => summary.item) || []
//   }, [platform, productStoreOrderSummaries])

//   // Calculate subtotal from orderSummaries or fallback
//   const subtotal = useMemo(() => {
//     if (platform === "store") {
//       return productStoreOrderSummaries.reduce((sum, summary) => sum + summary.subtotal, 0)
//     }
//     // Fallback for non-store platforms
//     return (
//       productStoreOrderSummaries?.reduce((sum, summary) => sum + summary.item.price * summary.item.quantity, 0) || 0
//     )
//   }, [platform, productStoreOrderSummaries])

//   // Watch address fields for SWR key generation
//   const watchedState = watch("customerAddress.state")
//   const watchedLga = watch("customerAddress.lga")
//   const watchedStreetAddress = watch("customerAddress.streetAddress")
//   const watchedName = watch("customerInfo.name")
//   const watchedEmail = watch("customerInfo.email")
//   const watchedPhone = watch("customerInfo.phone")

//   // SWR for buyer info fetching
//   const buyerInfoKey =
//     watchedName &&
//     watchedEmail &&
//     watchedPhone &&
//     watchedName.trim().length >= 2 &&
//     /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(watchedEmail) &&
//     /^(\+?234|0)[\d]{10}$/.test(watchedPhone)
//       ? `/api/orders/buyer-info?buyerName=${encodeURIComponent(watchedName.trim())}&buyerEmail=${encodeURIComponent(
//           watchedEmail.trim(),
//         )}&buyerPhone=${encodeURIComponent(watchedPhone.trim())}`
//       : null

//   const { data: buyerInfoData, error: buyerInfoError } = useSWR(buyerInfoKey, fetcher, buyerInfoOptions)

//   // SWR for logistics pricing
//   const logisticsPricingKey =
//     watchedState &&
//     watchedLga &&
//     watchedStreetAddress &&
//     productStoreOrderSummaries.length > 0 &&
//     productStoreOrderSummaries[0]?.pickupLocation?.latitude &&
//     productStoreOrderSummaries[0]?.pickupLocation?.longitude
//       ? `/api/logistics/pricing?state=${encodeURIComponent(watchedState)}&lga=${encodeURIComponent(
//           watchedLga,
//         )}&streetAddress=${encodeURIComponent(watchedStreetAddress)}`
//       : null

//   const {
//     data: logisticsPricingData,
//     error: logisticsPricingError,
//     isLoading: isLogisticsPricingLoading,
//   } = useSWR(logisticsPricingKey, fetcher, logisticsPricingOptions)

//   // Effect to handle buyer info auto-fill
//   useEffect(() => {
//     if (buyerInfoData?.data && !buyerInfoError) {
//       const data = buyerInfoData.data
//       if (data.streetAddress && data.state && data.lga) {
//         // Auto-fill the address fields
//         setValue("customerAddress.streetAddress", data.streetAddress)
//         setValue("customerAddress.state", data.state)
//         setValue("customerAddress.lga", data.lga)
//         if (data.directions) {
//           setValue("customerAddress.directions", data.directions)
//         }

//         // Update the store as well
//         setCustomerAddress({
//           streetAddress: data.streetAddress,
//           state: data.state,
//           lga: data.lga,
//           directions: data.directions || "",
//         })

//         // Set selected state to trigger LGA loading
//         setSelectedState(data.state)
//         // Load LGAs for the state
//         const lgas = getLgasForState(data.state)
//         setAvailableLgas(lgas)
//       }
//     }
//   }, [buyerInfoData, buyerInfoError, setValue, setCustomerAddress])

//   // Effect to handle logistics pricing updates
//   useEffect(() => {
//     if (logisticsPricingData?.data && !logisticsPricingError) {
//       const price = logisticsPricingData.data.price
//       if (price !== undefined) {
//         // Update the store with the fetched delivery fee
//         updateDeliveryFee(price)
//         // Store buyer coordinates if available
//         if (logisticsPricingData.data.buyerLatitude && logisticsPricingData.data.buyerLongitude) {
//           setBuyerCoordinates({
//             latitude: logisticsPricingData.data.buyerLatitude,
//             longitude: logisticsPricingData.data.buyerLongitude,
//           })
//         } else {
//           setBuyerCoordinates({
//             latitude: 6.5244 + (Math.random() - 0.5) * 0.1,
//             longitude: 3.3792 + (Math.random() - 0.5) * 0.1,
//           })
//         }
//       }
//     } else if (logisticsPricingError) {
//       console.error("Logistics pricing error:", logisticsPricingError)
//       // Update store with fallback fee
//       updateDeliveryFee(1500)
//       setBuyerCoordinates({
//         latitude: 6.5244 + (Math.random() - 0.5) * 0.1,
//         longitude: 3.3792 + (Math.random() - 0.5) * 0.1,
//       })
//     }
//   }, [logisticsPricingData, logisticsPricingError, updateDeliveryFee])

//   const formatOrderItems = () => {
//     if (!productStoreOrderSummaries.length) return []
//     return productStoreOrderSummaries.flatMap((summary) => ({
//       productId: summary.item.productId,
//       quantity: summary.item.quantity,
//       supplierPrice: summary.item.originalPrice,
//       plugPrice: summary.item.price,
//       productName: summary.item.name,
//       supplierId: summary.item.supplierId,
//       ...(summary.item.variationId && {
//         variantId: summary.item.variationId,
//         variantColor: summary.item.color,
//         variantSize: summary.item.size,
//       }),
//       // For non-variation items, use product-level color and size
//       ...(!summary.item.variationId && {
//         productColor: summary.item.color,
//         productSize: summary.item.size,
//       }),
//     }))
//   }

//   const prepareOrderData = (paymentReference: string) => {
//     const orderData = {
//       // Buyer information
//       buyerName: checkoutData.customerInfo.name,
//       buyerEmail: checkoutData.customerInfo.email,
//       buyerPhone: checkoutData.customerInfo.phone,
//       buyerAddress: checkoutData.customerAddress.streetAddress,
//       buyerLga: checkoutData.customerAddress.lga,
//       buyerState: checkoutData.customerAddress.state,
//       buyerDirections: checkoutData.customerAddress.directions || "",
//       buyerInstructions: checkoutData.deliveryInstructions || "",
//       buyerLatitude: buyerCoordinates.latitude,
//       buyerLongitude: buyerCoordinates.longitude,
//       paymentMethod: "online",
//       totalAmount: total,
//       deliveryFee: deliveryFee,
//       platform: productStoreOrderSummaries[0]?.platform || platform,
//       subdomain: (productStoreOrderSummaries[0].platform === "store" && productStoreOrderSummaries[0].referralId) || "",
//       plugId: (productStoreOrderSummaries[0]?.platform !== "store" && productStoreOrderSummaries[0]?.referralId) || "",
//       orderItems: formatOrderItems(),
//       // Payment reference for online payments
//       paymentReference,
//       deliveryType: deliveryType,
//       terminalAddress: deliveryType === "terminal" ? selectedTerminal : null,
//     }
//     return orderData
//   }

//   const placeOrder = async (paymentReference: string) => {
//     try {
//       setIsLoading(true)
//       const orderData = prepareOrderData(paymentReference)
//       const response = await fetch("/api/orders/place-order", {
//         method: "POST",
//         headers: {
//           "Content-Type": "application/json",
//         },
//         body: JSON.stringify(orderData),
//       })

//       if (!response.ok) {
//         const errorData = await response.json()
//         errorToast(errorData.error || "Failed to place order")
//         clearCheckoutData()
//         clearOrderSummaries()
//         router.replace("/order-error")
//         return
//       }

//       const result = await response.json()
//       successToast(result.message || "Order placed successfully")

//       // Store order success data for thank you page
//       if (result.data) {
//         sessionStorage.setItem("orderSuccess", JSON.stringify(result.data))
//       }

//       // Clear all checkout data and order summary
//       clearCheckoutData()
//       clearOrderSummaries()

//       // Navigate to thank you page
//       router.replace("/thank-you")
//       return result
//     } catch (error) {
//       console.error("Error placing order:", error)
//       errorToast("An error occurred while placing the order")
//     } finally {
//       setIsLoading(false)
//     }
//   }

//   const handleBackNavigation = () => {
//     if (platform !== "store") {
//       // Navigate back to referring page
//       router.back()
//     }
//   }

//   // Effect to transform fetched products into orderSummaries when platform is "store"
//   useEffect(() => {
//     if (platform === "store" && productsData.length > 0 && !isProductsLoading) {
//       const transformedOrderSummaries = productsData
//         .filter(({ data, error }) => data && !error)
//         .map(({ item, data }) => {
//           const product = data.data || data // Handle different API response structures
//           // Create ProductItem from fetched data
//           const productItem = {
//             id: product.id || item.pid,
//             name: product.name || product.title || "Unknown Product",
//             price: product.price || 0,
//             originalPrice: product.originalPrice || product.price || 0,
//             productId: product.originalId,
//             quantity: item.qty,
//             image: product.image || product.images?.[0] || "/placeholder.svg",
//             color: item.variation ? product.variations?.find((v: any) => v.id === item.variation)?.color : undefined,
//             size: item.variation ? product.variations?.find((v: any) => v.id === item.variation)?.size : undefined,
//             variationId: item.variation,
//             variationName: item.variation
//               ? getVariationDisplayName(product.variations?.find((v: any) => v.id === item.variation))
//               : undefined,
//             supplierId: product.supplierId || product.userId,
//           }

//           // Calculate subtotal and total
//           const subtotal = productItem.price * productItem.quantity
//           const defaultDeliveryFee = 0
//           const total = subtotal + defaultDeliveryFee

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
//           }
//         })

//       // Update the store with transformed data
//       if (transformedOrderSummaries.length > 0) {
//         setOrderSummaries(transformedOrderSummaries)
//       }
//     }
//   }, [platform, productsData, isProductsLoading, ref, setOrderSummaries])

//   // Calculate delivery fee based on method and logistics pricing
//   const getDeliveryFee = () => {
//     // For terminal pickup, use the fixed state pricing
//     if (deliveryType === "terminal" && selectedState) {
//       const terminalPrice = TerminalPickupPrices[selectedState as keyof typeof TerminalPickupPrices]
//       if (terminalPrice) {
//         return terminalPrice
//       }
//     }

//     // Check if we have the required data to fetch logistics pricing
//     const hasRequiredAddressData = watchedState && watchedLga && watchedStreetAddress

//     // If we don't have required address data, don't show any delivery fee yet
//     if (!hasRequiredAddressData) {
//       return null
//     }

//     // If we're currently loading logistics pricing, don't show fee yet
//     if (isLogisticsPricingLoading) {
//       return null
//     }

//     // If logistics pricing was successfully fetched, use that price
//     if (logisticsPricingData?.data?.price !== undefined && !logisticsPricingError) {
//       return logisticsPricingData.data.price
//     }

//     // If there was an error fetching logistics pricing, fallback to 1500
//     if (logisticsPricingError) {
//       return 1500
//     }

//     // Default case - should not reach here, but fallback to null
//     return null
//   }

//   const deliveryFee = getDeliveryFee()
//   const total = subtotal + (deliveryFee || 0)

//   // Initialize states and form data
//   useEffect(() => {
//     setIsClient(true)
//     // Initialize Nigerian states
//     try {
//       const statesData = NaijaStates.states()
//       if (Array.isArray(statesData)) {
//         const stateNames = statesData
//           .map((state: any) => {
//             return typeof state === "string" ? state : state.state || state.name
//           })
//           .filter(Boolean)
//         setStates(stateNames)
//       }
//     } catch (error) {
//       console.error("Error fetching states:", error)
//       setStates([])
//     }

//     setSelectedTerminal(checkoutData.terminalAddress || "")

//     // Initialize form with stored data
//     setValue("customerInfo.name", checkoutData.customerInfo.name || "")
//     setValue("customerInfo.email", checkoutData.customerInfo.email || "")
//     setValue("customerInfo.phone", checkoutData.customerInfo.phone || "")
//     setValue("customerAddress.streetAddress", checkoutData.customerAddress.streetAddress || "")
//     setValue("customerAddress.state", checkoutData.customerAddress.state || "")
//     setValue("customerAddress.lga", checkoutData.customerAddress.lga || "")
//     setValue("customerAddress.directions", checkoutData.customerAddress.directions || "")
//   }, [setValue, checkoutData])

//   // Watch state changes to update LGAs
//   useEffect(() => {
//     if (watchedState && watchedState !== selectedState) {
//       setSelectedState(watchedState)
//       const lgas = getLgasForState(watchedState)
//       setAvailableLgas(lgas)
//       // Update the state in the store
//       setCustomerAddress({ state: watchedState })
//     }
//   }, [watchedState, selectedState, setValue, setCustomerAddress])

//   // Watch form values for real-time validation and store updates
//   const watchedCustomerInfo = watch("customerInfo")
//   const watchedCustomerAddress = watch("customerAddress")

//   useEffect(() => {
//     if (watchedCustomerInfo) {
//       setCustomerInfo(watchedCustomerInfo)
//     }
//   }, [watchedCustomerInfo, setCustomerInfo])

//   useEffect(() => {
//     if (watchedCustomerAddress) {
//       setCustomerAddress(watchedCustomerAddress)
//     }
//   }, [watchedCustomerAddress, setCustomerAddress])

//   // Clear errors when fields become valid
//   useEffect(() => {
//     const validateField = async (fieldName: any, value: any) => {
//       if (value && value.trim() !== "") {
//         const isFieldValid = await trigger(fieldName)
//         if (isFieldValid) {
//           clearErrors(fieldName)
//         }
//       }
//     }

//     // Validate customer info fields
//     if (watchedCustomerInfo?.name) {
//       validateField("customerInfo.name", watchedCustomerInfo.name)
//     }
//     if (watchedCustomerInfo?.email) {
//       validateField("customerInfo.email", watchedCustomerInfo.email)
//     }
//     if (watchedCustomerInfo?.phone) {
//       validateField("customerInfo.phone", watchedCustomerInfo.phone)
//     }

//     // Validate address fields
//     if (watchedCustomerAddress?.streetAddress) {
//       validateField("customerAddress.streetAddress", watchedCustomerAddress.streetAddress)
//     }
//     if (watchedCustomerAddress?.state) {
//       validateField("customerAddress.state", watchedCustomerAddress.state)
//     }
//     if (watchedCustomerAddress?.lga) {
//       validateField("customerAddress.lga", watchedCustomerAddress.lga)
//     }
//   }, [watchedCustomerInfo, watchedCustomerAddress, trigger, clearErrors])

//   const continueToReview = () => {
//     goToNextStep()
//     if (productStoreOrderSummaries.length > 0) {
//       productStoreOrderSummaries.forEach((orderSummary) => {
//         mutate(`/public/products/${orderSummary.item.id}${orderSummary.referralId}`)
//       })
//     }
//   }

//   const showPaymentCancelledModal = () => {
//     // You could use a toast library or custom modal
//     setShowCancelledModal(true)
//   }

//   const paystackConfig = {
//     email: watchedCustomerInfo?.email || "",
//     amount: total * 100, // Paystack expects amount in kobo
//     metadata: {
//       name: watchedCustomerInfo?.name || "",
//       phone: watchedCustomerInfo?.phone || "",
//       address: watchedCustomerAddress
//         ? `${watchedCustomerAddress.streetAddress}, ${watchedCustomerAddress.lga}, ${watchedCustomerAddress.state}`
//         : "",
//       custom_fields: [
//         {
//           display_name: "Order Items",
//           variable_name: "order_items",
//           value: cartItems?.map((item) => `${item.name} x${item.quantity}`).join(", "),
//         },
//       ],
//     },
//     publicKey: process.env.NEXT_PUBLIC_PAYSTACK_PUBLIC_KEY,
//     text: isLoading ? "Processing..." : "Place Order",
//     onSuccess: async (reference) => {
//       try {
//         await placeOrder(reference.reference)
//       } catch (error) {
//         console.error("Error placing order after successful payment:", error)
//       }
//     },
//     onClose: () => {
//       showPaymentCancelledModal()
//     },
//   }

//   const formatPrice = (price?: string | number) => {
//     return `₦${price?.toLocaleString()}`
//   }

//   const goToNextStep = async () => {
//     if (currentStep === "delivery") {
//       // For terminal delivery, only validate customer info
//       if (deliveryType === "terminal") {
//         const customerInfoValid = await trigger("customerInfo")
//         const terminalSelected = selectedTerminal !== "" && selectedTerminal !== null

//         if (customerInfoValid && terminalSelected) {
//           setDeliveryMethod("terminal")
//           setTerminalAddress(selectedTerminal)
//           setCurrentStep("review")
//         } else {
//           if (!terminalSelected) {
//             alert("Please select a terminal location before continuing.")
//             return
//           }
//           const firstError = document.querySelector(".border-red-500")
//           if (firstError) {
//             firstError.scrollIntoView({ behavior: "smooth", block: "center" })
//           }
//         }
//       } else {
//         // For home delivery, validate all fields
//         const isFormValid = await trigger()
//         if (isFormValid) {
//           setDeliveryMethod("home")
//           setCurrentStep("review")
//         } else {
//           const firstError = document.querySelector(".border-red-500")
//           if (firstError) {
//             firstError.scrollIntoView({ behavior: "smooth", block: "center" })
//           }
//         }
//       }
//     }
//   }

//   const goToPreviousStep = () => {
//     if (currentStep === "review") setCurrentStep("delivery")
//   }

//   // Handle delivery instructions change
//   const handleDeliveryInstructionsChange = (instructions: string) => {
//     // setDeliveryInstructions(instructions);
//     // For now, we'll store this in the customer address or create a separate field
//     // This should be handled by the store - adding a setDeliveryInstructions method
//     console.log("Delivery instructions:", instructions)
//   }

//   const renderPlaceOrderButton = () => {
//     // Only render PaystackButton on client side
//     if (!isClient) {
//       return <Button className="flex-1">Loading Payment...</Button>
//     }

//     return (
//       <PaystackButton
//         {...paystackConfig}
//         className="flex-1 bg-primary text-primary-foreground hover:bg-primary/90 h-10 px-4 py-2 rounded-md font-medium transition-colors"
//       />
//     )
//   }

//   return (
//     <div className="flex flex-col min-h-screen pb-16 md:pb-0">
//       {platform !== "store" && (
//         <div className="sticky top-0 z-20 flex items-center p-4 bg-background/80 backdrop-blur-md border-b">
//           <Button variant="ghost" size="sm" onClick={handleBackNavigation} className="flex items-center gap-2">
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
//             <AlertDescription>Failed to load products. Please try refreshing the page.</AlertDescription>
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
//                     <h2 className="text-xl font-semibold mb-4">Delivery Information</h2>
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
//                               {...register("customerInfo.name")}
//                               placeholder="Enter your full name"
//                               className={errors.customerInfo?.name ? "border-red-500" : ""}
//                             />
//                             {errors.customerInfo?.name && (
//                               <p className="text-sm text-red-600">{errors.customerInfo.name.message}</p>
//                             )}
//                           </div>
//                           <div className="space-y-2">
//                             <Label htmlFor="customerEmail">
//                               Email Address <span className="text-red-500">*</span>
//                             </Label>
//                             <Input
//                               id="customerEmail"
//                               type="email"
//                               {...register("customerInfo.email")}
//                               placeholder="Enter your email address"
//                               className={errors.customerInfo?.email ? "border-red-500" : ""}
//                             />
//                             {errors.customerInfo?.email && (
//                               <p className="text-sm text-red-600">{errors.customerInfo.email.message}</p>
//                             )}
//                           </div>
//                           <div className="space-y-2 md:col-span-2">
//                             <Label htmlFor="customerPhone">
//                               Phone Number <span className="text-red-500">*</span>
//                             </Label>
//                             <Input
//                               id="customerPhone"
//                               {...register("customerInfo.phone")}
//                               placeholder="Enter your phone number"
//                               className={errors.customerInfo?.phone ? "border-red-500" : ""}
//                             />
//                             {errors.customerInfo?.phone && (
//                               <p className="text-sm text-red-600">{errors.customerInfo.phone.message}</p>
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
//                                     field.onChange(value)
//                                     setCustomerAddress({ state: value })
//                                     // Reset delivery type and terminal selection when state changes
//                                     setDeliveryMethod("terminal")
//                                     setSelectedTerminal("")
//                                     if (value && errors.customerAddress?.state) {
//                                       const isValid = await trigger("customerAddress.state")
//                                       if (isValid) clearErrors("customerAddress.state")
//                                     }
//                                   }}
//                                 >
//                                   <SelectTrigger
//                                     id="state"
//                                     className={errors.customerAddress?.state ? "border-red-500" : ""}
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
//                               <p className="text-sm text-red-600">{errors.customerAddress.state.message}</p>
//                             )}
//                           </div>

//                           {selectedState && (selectedState === "Lagos" || selectedState === "Ogun") && (
//                             <div className="space-y-2">
//                               <Label>
//                                 Delivery Type <span className="text-red-500">*</span>
//                               </Label>
//                               {/* Updated delivery type change handlers to persist immediately */}
//                               <div className="flex gap-4">
//                                 <div className="flex items-center space-x-2">
//                                   <input
//                                     type="radio"
//                                     id="terminal"
//                                     name="deliveryType"
//                                     value="terminal"
//                                     checked={deliveryType === "terminal"}
//                                     onChange={(e) => {
//                                       const newDeliveryType = e.target.value as "terminal" | "home"
//                                       setDeliveryMethod(newDeliveryType)
//                                     }}
//                                     className="w-4 h-4 text-blue-600"
//                                   />
//                                   <Label htmlFor="terminal" className="font-normal">
//                                     Terminal Pickup
//                                   </Label>
//                                 </div>
//                                 <div className="flex items-center space-x-2">
//                                   <input
//                                     type="radio"
//                                     id="home"
//                                     name="deliveryType"
//                                     value="home"
//                                     checked={deliveryType === "home"}
//                                     onChange={(e) => {
//                                       const newDeliveryType = e.target.value as "terminal" | "home"
//                                       setDeliveryMethod(newDeliveryType)
//                                       // Clear terminal selection when switching to home delivery
//                                       if (newDeliveryType === "home") {
//                                         setSelectedTerminal("")
//                                         setTerminalAddress("")
//                                       }
//                                     }}
//                                     className="w-4 h-4 text-blue-600"
//                                   />
//                                   <Label htmlFor="home" className="font-normal">
//                                     Home Delivery
//                                   </Label>
//                                 </div>
//                               </div>
//                               <p className="text-sm text-muted-foreground">
//                                 Terminal pickup locations are GIG Logistics pickup offices where you can collect your
//                                 order.
//                               </p>
//                             </div>
//                           )}

//                           {selectedState &&
//                             deliveryType === "terminal" &&
//                             terminalAddresses[selectedState as keyof typeof terminalAddresses] && (
//                               <div className="space-y-2">
//                                 <Label>
//                                   Select Terminal <span className="text-red-500">*</span>
//                                 </Label>
//                                 <div className="bg-blue-50 border border-blue-200 rounded-md p-3 mb-3">
//                                   <div className="flex items-center justify-between">
//                                     <p className="text-xs text-blue-800">
//                                       <strong>Terminal Pickup Price</strong>
//                                     </p>
//                                     <span className="text-lg font-bold text-blue-900">
//                                       {formatPrice(
//                                         TerminalPickupPrices[selectedState as keyof typeof TerminalPickupPrices] || 0,
//                                       )}
//                                     </span>
//                                   </div>
//                                   <p className="text-sm text-blue-700 mt-1">
//                                     All pickup locations in {selectedState} have the same price
//                                   </p>
//                                 </div>
//                                 <p className="text-sm text-muted-foreground mb-2">
//                                   Scroll to choose a GIG Logistics office near you for pickup:
//                                 </p>
//                                 <div className="border rounded-md max-h-48 overflow-y-auto">
//                                   {terminalAddresses[selectedState as keyof typeof terminalAddresses].map(
//                                     (terminal, index) => (
//                                       <div
//                                         key={index}
//                                         className={`p-3 border-b last:border-b-0 cursor-pointer hover:bg-muted/50 ${
//                                           selectedTerminal === terminal ? "bg-blue-50 border-blue-200" : ""
//                                         }`}
//                                         onClick={() => {
//                                           setSelectedTerminal(terminal)
//                                           setTerminalAddress(terminal)
//                                         }}
//                                       >
//                                         <div className="flex items-start space-x-2">
//                                           <input
//                                             type="radio"
//                                             name="terminal"
//                                             value={terminal}
//                                             checked={selectedTerminal === terminal}
//                                             onChange={() => {
//                                               setSelectedTerminal(terminal)
//                                               setTerminalAddress(terminal)
//                                             }}
//                                             className="w-4 h-4 text-blue-600 mt-1"
//                                           />
//                                           <span className="text-xs whitespace-normal break-words">{terminal}</span>
//                                         </div>
//                                       </div>
//                                     ),
//                                   )}
//                                 </div>
//                               </div>
//                             )}

//                           {selectedState && deliveryType === "home" && (
//                             <>
//                               {/* Address Specificity Message */}
//                               <Alert className="mb-4">
//                                 <Info className="h-4 w-4" />
//                                 <AlertDescription>
//                                   <strong>💡 Pro Tip:</strong> Providing a very specific and detailed address helps our
//                                   logistics partners optimize delivery routes, which can potentially reduce your
//                                   delivery costs. Include landmarks, building descriptions, and clear directions.
//                                 </AlertDescription>
//                               </Alert>

//                               {/* LGA Selection */}
//                               <div className="space-y-2">
//                                 <Label htmlFor="lga">
//                                   Local Government Area <span className="text-red-500">*</span>
//                                 </Label>
//                                 <Controller
//                                   name="customerAddress.lga"
//                                   control={control}
//                                   render={({ field }) => (
//                                     <Select
//                                       value={field.value}
//                                       onValueChange={async (value) => {
//                                         field.onChange(value)
//                                         setCustomerAddress({ lga: value })
//                                         if (value && errors.customerAddress?.lga) {
//                                           const isValid = await trigger("customerAddress.lga")
//                                           if (isValid) clearErrors("customerAddress.lga")
//                                         }
//                                       }}
//                                       disabled={!selectedState || availableLgas.length === 0}
//                                     >
//                                       <SelectTrigger
//                                         id="lga"
//                                         className={errors.customerAddress?.lga ? "border-red-500" : ""}
//                                       >
//                                         <SelectValue
//                                           placeholder={
//                                             selectedState
//                                               ? "Select a Local Government Area"
//                                               : "Please select a state first"
//                                           }
//                                         />
//                                       </SelectTrigger>
//                                       <SelectContent>
//                                         {availableLgas.map((lga) => (
//                                           <SelectItem key={lga} value={lga}>
//                                             {lga}
//                                           </SelectItem>
//                                         ))}
//                                       </SelectContent>
//                                     </Select>
//                                   )}
//                                 />
//                                 {errors.customerAddress?.lga && (
//                                   <p className="text-sm text-red-600">{errors.customerAddress.lga.message}</p>
//                                 )}
//                               </div>

//                               {/* Street Address */}
//                               <div className="space-y-2">
//                                 <Label htmlFor="streetAddress">
//                                   Street Address <span className="text-red-500">*</span>
//                                 </Label>
//                                 <Textarea
//                                   id="streetAddress"
//                                   {...register("customerAddress.streetAddress")}
//                                   rows={3}
//                                   className={errors.customerAddress?.streetAddress ? "border-red-500" : ""}
//                                   placeholder="Enter your full street address including house number, street name, area, and nearby landmarks for accurate delivery"
//                                 />
//                                 {errors.customerAddress?.streetAddress && (
//                                   <p className="text-sm text-red-600">{errors.customerAddress.streetAddress.message}</p>
//                                 )}
//                               </div>

//                               {/* Additional Directions */}
//                               <div className="space-y-2">
//                                 <Label htmlFor="directions">
//                                   Additional Directions <span className="text-gray-500">(Optional)</span>
//                                 </Label>
//                                 <Textarea
//                                   id="directions"
//                                   {...register("customerAddress.directions")}
//                                   rows={3}
//                                   className={errors.customerAddress?.directions ? "border-red-500" : ""}
//                                   placeholder="Additional directions to help locate your address (e.g., 'Opposite First Bank', 'Blue gate with security post', 'Third floor, Apartment 3B')"
//                                 />
//                                 {errors.customerAddress?.directions && (
//                                   <p className="text-sm text-red-600">{errors.customerAddress.directions.message}</p>
//                                 )}
//                               </div>
//                             </>
//                           )}

//                           {/* Delivery Pricing Status */}
//                           {(isLogisticsPricingLoading ||
//                             logisticsPricingError ||
//                             logisticsPricingData?.data?.price !== undefined) && (
//                             <div className="p-3 border rounded-md bg-muted/50">
//                               <div className="flex items-center gap-2">
//                                 {logisticsPricingError && (
//                                   <span className="text-sm text-red-600">
//                                     Unable to calculate delivery fee - using standard rate
//                                   </span>
//                                 )}
//                                 {logisticsPricingData?.data?.price !== undefined && !isLogisticsPricingLoading && (
//                                   <span className="text-sm text-green-600">
//                                     Delivery fee calculated: {formatPrice(logisticsPricingData.data.price)}
//                                   </span>
//                                 )}
//                               </div>
//                             </div>
//                           )}
//                         </div>
//                       </div>

//                       <Separator />

//                       <div>
//                         <h3 className="font-medium mb-3">Payment Method</h3>
//                         <div className="flex items-center space-x-2 p-3 border rounded-md bg-muted/50">
//                           <CreditCard className="h-4 w-4 mr-2 text-muted-foreground flex-shrink-0" />
//                           <div className="min-w-0">
//                             <span className="font-medium block">Card, Bank Transfer and Mobile Money</span>
//                             <p className="text-xs text-muted-foreground">Secure payment processing</p>
//                           </div>
//                         </div>
//                       </div>

//                       <Separator />

//                       <div>
//                         <h3 className="font-medium mb-3">Delivery Instructions (Optional)</h3>
//                         <Textarea
//                           placeholder="Add any special instructions for delivery..."
//                           className="resize-none"
//                           // value={checkoutData.deliveryInstructions}
//                           onChange={(e) => handleDeliveryInstructionsChange(e.target.value)}
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
//                     <h2 className="text-xl font-semibold mb-4">Review Your Order</h2>
//                     <div className="space-y-6">
//                       <div>
//                         <h3 className="font-medium mb-3">Items in Your Order</h3>
//                         <div className="space-y-4 max-h-64 overflow-y-auto pr-2">
//                           {cartItems?.map((item) => (
//                             <div key={item.id} className="flex items-start space-x-3">
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
//                                   <span className="capitalize">{item.name}</span>
//                                   {item.variationName && (
//                                     <span className="text-muted-foreground ml-2">({item.variationName})</span>
//                                   )}
//                                 </h4>
//                                 <div className="flex justify-between mt-1">
//                                   <span className="text-sm">
//                                     {item.quantity} x {formatPrice(item.price)}
//                                   </span>
//                                   <span className="text-sm font-medium">{formatPrice(item.price * item.quantity)}</span>
//                                 </div>
//                               </div>
//                             </div>
//                           ))}
//                         </div>
//                       </div>

//                       <Separator />

//                       {/* Updated review section to show terminal address when delivery method is terminal */}
//                       <div>
//                         <h3 className="font-medium mb-3">Delivery Information</h3>
//                         <div className="flex items-start space-x-2">
//                           <MapPin className="h-5 w-5 text-muted-foreground mt-0.5 flex-shrink-0" />
//                           <div className="flex-1 min-w-0">
//                             <p className="text-sm">
//                               {checkoutData.customerInfo.name || "Customer Name"}
//                               <br />
//                               {checkoutData.deliveryMethod === "terminal" ? (
//                                 <span className="break-words whitespace-normal">
//                                   <strong>Terminal Pickup:</strong>
//                                   <br />
//                                   {checkoutData.terminalAddress || selectedTerminal || "Terminal Address"}
//                                 </span>
//                               ) : (
//                                 // Show regular address for home delivery
//                                 <>
//                                   {checkoutData.customerAddress.streetAddress || "Street Address"}
//                                   {checkoutData.customerAddress.directions && (
//                                     <>
//                                       <br />
//                                       <span className="text-muted-foreground">
//                                         Directions: {checkoutData.customerAddress.directions}
//                                       </span>
//                                     </>
//                                   )}
//                                   <br />
//                                   {checkoutData.customerAddress.lga}, {checkoutData.customerAddress.state}
//                                 </>
//                               )}
//                               <br />
//                               {checkoutData.customerInfo.phone || "Phone Number"}
//                             </p>
//                           </div>
//                         </div>
//                       </div>

//                       <Separator />

//                       <div>
//                         <h3 className="font-medium mb-3">Payment Method</h3>
//                         <div className="flex items-center">
//                           <CreditCard className="h-5 w-5 text-muted-foreground mr-2 flex-shrink-0" />
//                           <span className="text-sm">Card, Bank Transfer and Mobile Money</span>
//                         </div>
//                       </div>
//                     </div>
//                     <div className="mt-6 flex flex-col sm:flex-row space-y-3 sm:space-y-0 sm:space-x-3">
//                       <Button variant="outline" className="flex-1 bg-transparent" onClick={goToPreviousStep}>
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
//                     <h3 className="font-semibold text-lg mb-4">Order Summary</h3>
//                     <div className="space-y-3 mb-6">
//                       <div className="flex justify-between">
//                         <span className="text-muted-foreground text-sm">Subtotal</span>
//                         <span className="text-sm">{formatPrice(subtotal!)}</span>
//                       </div>
//                       <div className="flex justify-between items-center">
//                         <span className="text-muted-foreground text-sm">
//                           Delivery Fee
//                           {isLogisticsPricingLoading && <Loader2 className="h-3 w-3 animate-spin ml-1 inline" />}
//                         </span>
//                         <span className="text-sm">
//                           {deliveryType === "terminal" && selectedState
//                             ? formatPrice(TerminalPickupPrices[selectedState as keyof typeof TerminalPickupPrices] || 0)
//                             : !watchedState || !watchedLga || !watchedStreetAddress
//                               ? "Enter address to calculate"
//                               : deliveryFee === null
//                                 ? "Calculating..."
//                                 : deliveryFee === 0
//                                   ? "Free"
//                                   : formatPrice(deliveryFee)}
//                         </span>
//                       </div>
//                       {logisticsPricingError && (
//                         <div className="text-xs text-red-600 mt-1">
//                           Unable to calculate delivery fee - using standard rate
//                         </div>
//                       )}
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
//                           <a href="/terms" className="text-primary hover:underline">
//                             Terms of Service
//                           </a>{" "}
//                           and{" "}
//                           <a href="/privacy" className="text-primary hover:underline">
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

//                 {/* Help Section */}
//                 <Card className="mt-6">
//                   <CardContent className="p-6">
//                     <div className="space-y-4 text-sm">
//                       <div className="flex items-start">
//                         <span className="mr-2 text-primary">•</span>
//                         <p>
//                           Orders are typically delivered 1-3 days for locations within Lagos and Ogun, and 3-7 days for
//                           other locations
//                         </p>
//                       </div>
//                       <div className="flex items-start">
//                         <span className="mr-2 text-primary">•</span>
//                         <p>We accept returns within 3 days of delivery, provided items meet our return policy</p>
//                       </div>
//                       <div className="flex items-start">
//                         <span className="mr-2 text-primary">•</span>
//                         <p>Detailed addresses help reduce delivery costs</p>
//                       </div>
//                     </div>
//                   </CardContent>
//                 </Card>
//               </div>
//             </div>
//           </div>
//         </div>
//       )}

//       <AlertDialog open={showCancelledModal} onOpenChange={setShowCancelledModal}>
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
//                 setShowCancelledModal(false)
//                 // Add your place order logic here
//               }}
//             >
//               {renderPlaceOrderButton()}
//             </AlertDialogAction>
//           </AlertDialogFooter>
//         </AlertDialogContent>
//       </AlertDialog>
//     </div>
//   )
// }







"use client"
import { useState, useEffect, useMemo } from "react"
import dynamic from "next/dynamic"
import Image from "next/image"
import { useRouter, useSearchParams } from "next/navigation"
import { CreditCard, MapPin, ArrowLeft, Loader2, Info } from "lucide-react"
import useSWR, { mutate } from "swr"
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Separator } from "@/components/ui/separator"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Alert, AlertDescription } from "@/components/ui/alert"
import { useFormResolver } from "@/hooks/useFormResolver"
import { Controller, useForm } from "react-hook-form"
import NaijaStates from "naija-state-local-government"
import { getLgasForState } from "@/lib/utils"
import { Input } from "@/components/ui/input"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { deliveryFormSchema } from "@/zod/schema"
import { useCheckoutStore } from "@/hooks/checkout-store"
import { errorToast, successToast } from "@/components/ui/use-toast-advanced"
import { getVariationDisplayName, parseCheckoutUrl } from "@/lib/url-parser"
import { useProductFetching } from "@/hooks/use-product-fetcher"
import { useProductStore } from "@/hooks/product-store"
import { TerminalPickupPrices, terminalAddresses } from "../constant"

// Dynamic import of PaystackButton to prevent SSR issues
const PaystackButton = dynamic(() => import("react-paystack").then((mod) => mod.PaystackButton), {
  ssr: false,
  loading: () => <Button className="flex-1">Loading Payment...</Button>,
})

// SWR fetcher function
const fetcher = async (url: string) => {
  const response = await fetch(url)
  if (!response.ok) {
    throw new Error(`HTTP error! status: ${response.status}`)
  }
  return response.json()
}

// SWR configuration options
const swrOptions = {
  revalidateOnFocus: false,
  revalidateOnReconnect: true,
  refreshInterval: 0,
  dedupingInterval: 5000,
  errorRetryCount: 0,
}

// Specific SWR options for logistics pricing (more frequent updates)
const logisticsPricingOptions = {
  ...swrOptions,
  refreshInterval: 600000,
  revalidateOnFocus: false,
  dedupingInterval: 600000,
}

// SWR options for buyer info (cached longer)
const buyerInfoOptions = {
  ...swrOptions,
  dedupingInterval: 10000, // Cache buyer info longer
  refreshInterval: 0, // Don't auto-refresh buyer info
}



export default function CheckoutPage() {
  const [buyerCoordinates, setBuyerCoordinates] = useState<{
    latitude: number | null
    longitude: number | null
  }>({ latitude: null, longitude: null })

  const [hasHydrated, setHasHydrated] = useState(false)

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
  } = useCheckoutStore()

  const [isClient, setIsClient] = useState(false)
  const [states, setStates] = useState<string[]>([])
  const [availableLgas, setAvailableLgas] = useState<string[]>([])
  const [selectedState, setSelectedState] = useState("")
  const [isLoading, setIsLoading] = useState(false)
  const [showCancelledModal, setShowCancelledModal] = useState(false)
  const [selectedTerminal, setSelectedTerminal] = useState("")
  const router = useRouter()
  const [showTerminalAlert, setShowTerminalAlert] = useState(false)

  // Get values from store
  const currentStep = checkoutData.currentStep
  const deliveryMethod = checkoutData.deliveryMethod || "terminal"
  const terminalAddress = checkoutData.terminalAddress || ""

  const {
    control,
    handleSubmit,
    trigger,
    watch,
    setValue,
    clearErrors,
    register,
    formState: { isValid, errors },
  } = useForm({
    resolver: useFormResolver(async (data) => {
      // Update store with form data
      setCustomerInfo(data.customerInfo)

      if (deliveryMethod === "home") {
        setCustomerAddress(data.customerAddress)
      }

      setDeliveryMethod(deliveryMethod)

      if (deliveryMethod === "terminal" && selectedTerminal) {
        setTerminalAddress(selectedTerminal)
      }
      return data
    }, deliveryFormSchema).resolver,
    mode: "onChange",
    defaultValues: {
      customerInfo: {
        name: checkoutData.customerInfo.name || "",
        email: checkoutData.customerInfo.email || "",
        phone: checkoutData.customerInfo.phone || "",
      },
      customerAddress: {
        streetAddress: checkoutData.customerAddress.streetAddress || "",
        state: checkoutData.customerAddress.state || "",
        lga: checkoutData.customerAddress.lga || "",
        directions: checkoutData.customerAddress.directions || "",
      },
    },
  })

  const searchParams = useSearchParams()

  // Parse URL parameters
  const parsedUrl = useMemo(() => {
    return parseCheckoutUrl(searchParams)
  }, [searchParams])

  const { items, ref, platform } = parsedUrl

  // Fetch products when platform is "store"
  const {
    productsData,
    error: productFetchError,
    isLoading: isProductsLoading,
  } = useProductFetching(items, ref, platform, true)

  const {
    orderSummaries: productStoreOrderSummaries,
    setOrderSummaries,
    clearOrderSummaries,
    updateDeliveryFee,
  } = useProductStore()

  useEffect(() => {
    // Wait for Zustand to hydrate from localStorage
    const unsubscribe = useCheckoutStore.persist.onFinishHydration(() => {
      setHasHydrated(true);
    });

    return unsubscribe;
  }, []);

  // Get cart items from orderSummaries (works for both store and non-store platforms)
  const cartItems = useMemo(() => {
    if (platform === "store") {
      return productStoreOrderSummaries.map((summary) => summary.item)
    }
    // Fallback for non-store platforms (existing logic)
    return productStoreOrderSummaries.map((summary) => summary.item) || []
  }, [platform, productStoreOrderSummaries])

  // Calculate subtotal from orderSummaries or fallback
  const subtotal = useMemo(() => {
    if (platform === "store") {
      return productStoreOrderSummaries.reduce((sum, summary) => sum + summary.subtotal, 0)
    }
    // Fallback for non-store platforms
    return (
      productStoreOrderSummaries?.reduce((sum, summary) => sum + summary.item.price * summary.item.quantity, 0) || 0
    )
  }, [platform, productStoreOrderSummaries])

  // Watch address fields for SWR key generation
  const watchedState = watch("customerAddress.state")
  const watchedLga = watch("customerAddress.lga")
  const watchedStreetAddress = watch("customerAddress.streetAddress")
  const watchedName = watch("customerInfo.name")
  const watchedEmail = watch("customerInfo.email")
  const watchedPhone = watch("customerInfo.phone")

  // SWR for buyer info fetching
  const buyerInfoKey =
    watchedName &&
    watchedEmail &&
    watchedPhone &&
    watchedName.trim().length >= 2 &&
    /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(watchedEmail) &&
    /^(\+?234|0)[\d]{10}$/.test(watchedPhone)
      ? `/api/orders/buyer-info?buyerName=${encodeURIComponent(watchedName.trim())}&buyerEmail=${encodeURIComponent(
          watchedEmail.trim(),
        )}&buyerPhone=${encodeURIComponent(watchedPhone.trim())}`
      : null

  const { data: buyerInfoData, error: buyerInfoError } = useSWR(buyerInfoKey, fetcher, buyerInfoOptions)

  // SWR for logistics pricing
  const logisticsPricingKey =
    watchedState &&
    watchedLga &&
    watchedStreetAddress &&
    productStoreOrderSummaries.length > 0 &&
    productStoreOrderSummaries[0]?.pickupLocation?.latitude &&
    productStoreOrderSummaries[0]?.pickupLocation?.longitude
      ? `/api/logistics/pricing?state=${encodeURIComponent(watchedState)}&lga=${encodeURIComponent(
          watchedLga,
        )}&streetAddress=${encodeURIComponent(watchedStreetAddress)}`
      : null

  const {
    data: logisticsPricingData,
    error: logisticsPricingError,
    isLoading: isLogisticsPricingLoading,
  } = useSWR(logisticsPricingKey, fetcher, logisticsPricingOptions)

  // Effect to handle buyer info auto-fill
  useEffect(() => {
    if (buyerInfoData?.data && !buyerInfoError) {
      const data = buyerInfoData.data
      if (data.streetAddress && data.state && data.lga) {
        // Auto-fill the address fields
        setValue("customerAddress.streetAddress", data.streetAddress)
        setValue("customerAddress.state", data.state)
        setValue("customerAddress.lga", data.lga)
        if (data.directions) {
          setValue("customerAddress.directions", data.directions)
        }

        // Update the store as well
        setCustomerAddress({
          streetAddress: data.streetAddress,
          state: data.state,
          lga: data.lga,
          directions: data.directions || "",
        })

        // Set selected state to trigger LGA loading
        setSelectedState(data.state)
        // Load LGAs for the state
        const lgas = getLgasForState(data.state)
        setAvailableLgas(lgas)
      }
    }
  }, [buyerInfoData, buyerInfoError, setValue, setCustomerAddress])

  // Effect to handle logistics pricing updates
  useEffect(() => {
    if (logisticsPricingData?.data && !logisticsPricingError) {
      const price = logisticsPricingData.data.price
      if (price !== undefined) {
        // Update the store with the fetched delivery fee
        updateDeliveryFee(price)
        // Store buyer coordinates if available
        if (logisticsPricingData.data.buyerLatitude && logisticsPricingData.data.buyerLongitude) {
          setBuyerCoordinates({
            latitude: logisticsPricingData.data.buyerLatitude,
            longitude: logisticsPricingData.data.buyerLongitude,
          })
        } else {
          setBuyerCoordinates({
            latitude: 6.5244 + (Math.random() - 0.5) * 0.1,
            longitude: 3.3792 + (Math.random() - 0.5) * 0.1,
          })
        }
      }
    } else if (logisticsPricingError) {
      console.error("Logistics pricing error:", logisticsPricingError)
      // Update store with fallback fee
      updateDeliveryFee(1500)
      setBuyerCoordinates({
        latitude: 6.5244 + (Math.random() - 0.5) * 0.1,
        longitude: 3.3792 + (Math.random() - 0.5) * 0.1,
      })
    }
  }, [logisticsPricingData, logisticsPricingError, updateDeliveryFee])

  const formatOrderItems = () => {
    if (!productStoreOrderSummaries.length) return []
    return productStoreOrderSummaries.flatMap((summary) => ({
      productId: summary.item.productId,
      quantity: summary.item.quantity,
      supplierPrice: summary.item.originalPrice,
      plugPrice: summary.item.price,
      productName: summary.item.name,
      supplierId: summary.item.supplierId,
      ...(summary.item.variationId && {
        variantId: summary.item.variationId,
        variantColor: summary.item.color,
        variantSize: summary.item.size,
      }),
      // For non-variation items, use product-level color and size
      ...(!summary.item.variationId && {
        productColor: summary.item.color,
        productSize: summary.item.size,
      }),
    }))
  }

  const prepareOrderData = (paymentReference: string) => {
    const orderData = {
      // Buyer information
      buyerName: checkoutData.customerInfo.name,
      buyerEmail: checkoutData.customerInfo.email,
      buyerPhone: checkoutData.customerInfo.phone,
      buyerAddress: checkoutData.customerAddress.streetAddress,
      buyerLga: checkoutData.customerAddress.lga,
      buyerState: checkoutData.customerAddress.state,
      buyerDirections: checkoutData.customerAddress.directions || "",
      buyerInstructions: checkoutData.deliveryInstructions || "",
      buyerLatitude: buyerCoordinates.latitude,
      buyerLongitude: buyerCoordinates.longitude,
      paymentMethod: "online",
      totalAmount: total,
      deliveryFee: deliveryFee,
      platform: productStoreOrderSummaries[0]?.platform || platform,
      subdomain: (productStoreOrderSummaries[0].platform === "store" && productStoreOrderSummaries[0].referralId) || "",
      plugId: (productStoreOrderSummaries[0]?.platform !== "store" && productStoreOrderSummaries[0]?.referralId) || "",
      orderItems: formatOrderItems(),
      // Payment reference for online payments
      paymentReference,
      deliveryType: deliveryMethod,
      terminalAddress: deliveryMethod === "terminal" ? selectedTerminal : null,
    }
    return orderData
  }

  const placeOrder = async (paymentReference: string) => {
    try {
      setIsLoading(true)
      const orderData = prepareOrderData(paymentReference)
      const response = await fetch("/api/orders/place-order", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(orderData),
      })

      if (!response.ok) {
        const errorData = await response.json()
        errorToast(errorData.error || "Failed to place order")
        clearCheckoutData()
        clearOrderSummaries()
        router.replace("/order-error")
        return
      }

      const result = await response.json()
      successToast(result.message || "Order placed successfully")

      // Store order success data for thank you page
      if (result.data) {
        sessionStorage.setItem("orderSuccess", JSON.stringify(result.data))
      }

      // Clear all checkout data and order summary
      clearCheckoutData()
      clearOrderSummaries()

      // Navigate to thank you page
      router.replace("/thank-you")
      return result
    } catch (error) {
      console.error("Error placing order:", error)
      errorToast("An error occurred while placing the order")
    } finally {
      setIsLoading(false)
    }
  }

  const handleBackNavigation = () => {
    if (platform !== "store") {
      // Navigate back to referring page
      router.back()
    }
  }

  // Effect to transform fetched products into orderSummaries when platform is "store"
  useEffect(() => {
    if (platform === "store" && productsData.length > 0 && !isProductsLoading) {
      const transformedOrderSummaries = productsData
        .filter(({ data, error }) => data && !error)
        .map(({ item, data }) => {
          const product = data.data || data // Handle different API response structures
          // Create ProductItem from fetched data
          const productItem = {
            id: product.id || item.pid,
            name: product.name || product.title || "Unknown Product",
            price: product.price || 0,
            originalPrice: product.originalPrice || product.price || 0,
            productId: product.originalId,
            quantity: item.qty,
            image: product.image || product.images?.[0] || "/placeholder.svg",
            color: item.variation ? product.variations?.find((v: any) => v.id === item.variation)?.color : undefined,
            size: item.variation ? product.variations?.find((v: any) => v.id === item.variation)?.size : undefined,
            variationId: item.variation,
            variationName: item.variation
              ? getVariationDisplayName(product.variations?.find((v: any) => v.id === item.variation))
              : undefined,
            supplierId: product.supplierId || product.userId,
          }

          // Calculate subtotal and total
          const subtotal = productItem.price * productItem.quantity
          const defaultDeliveryFee = 0
          const total = subtotal + defaultDeliveryFee

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
          }
        })

      // Update the store with transformed data
      if (transformedOrderSummaries.length > 0) {
        setOrderSummaries(transformedOrderSummaries)
      }
    }
  }, [platform, productsData, isProductsLoading, ref, setOrderSummaries])

  // Calculate delivery fee based on method and logistics pricing
  const getDeliveryFee = () => {
    // For terminal pickup, use the fixed state pricing
    if (deliveryMethod === "terminal" && selectedState) {
      const terminalPrice = TerminalPickupPrices[selectedState as keyof typeof TerminalPickupPrices]
      if (terminalPrice) {
        return terminalPrice
      }
    }

    // Check if we have the required data to fetch logistics pricing
    const hasRequiredAddressData = watchedState && watchedLga && watchedStreetAddress

    // If we don't have required address data, don't show any delivery fee yet
    if (!hasRequiredAddressData) {
      return null
    }

    // If we're currently loading logistics pricing, don't show fee yet
    if (isLogisticsPricingLoading) {
      return null
    }

    // If logistics pricing was successfully fetched, use that price
    if (logisticsPricingData?.data?.price !== undefined && !logisticsPricingError) {
      return logisticsPricingData.data.price
    }

    // If there was an error fetching logistics pricing, fallback to 1500
    if (logisticsPricingError) {
      return 1500
    }

    // Default case - should not reach here, but fallback to null
    return null
  }

  const deliveryFee = getDeliveryFee()
  const total = subtotal + (deliveryFee || 0)

  // Initialize states and form data
 useEffect(() => {
  if (!hasHydrated) return // Wait for hydration to complete
  
  setIsClient(true)
  // Initialize Nigerian states
  try {
    const statesData = NaijaStates.states()
    if (Array.isArray(statesData)) {
      const stateNames = statesData
        .map((state: any) => {
          return typeof state === "string" ? state : state.state || state.name
        })
        .filter(Boolean)
      setStates(stateNames)
    }
  } catch (error) {
    console.error("Error fetching states:", error)
    setStates([])
  }

  setSelectedTerminal(checkoutData.terminalAddress || "")

  // Initialize form with stored data AFTER hydration
  setValue("customerInfo.name", checkoutData.customerInfo.name || "")
  setValue("customerInfo.email", checkoutData.customerInfo.email || "")
  setValue("customerInfo.phone", checkoutData.customerInfo.phone || "")
  setValue("customerAddress.streetAddress", checkoutData.customerAddress.streetAddress || "")
  setValue("customerAddress.state", checkoutData.customerAddress.state || "")
  setValue("customerAddress.lga", checkoutData.customerAddress.lga || "")
  setValue("customerAddress.directions", checkoutData.customerAddress.directions || "")

  // Set selected state if it exists to load LGAs
  if (checkoutData.customerAddress.state) {
    setSelectedState(checkoutData.customerAddress.state)
    const lgas = getLgasForState(checkoutData.customerAddress.state)
    setAvailableLgas(lgas)
  }
}, [setValue, checkoutData, hasHydrated])

  // Watch state changes to update LGAs
  useEffect(() => {
    if (watchedState && watchedState !== selectedState) {
      setSelectedState(watchedState)
      const lgas = getLgasForState(watchedState)
      setAvailableLgas(lgas)
      // Update the state in the store
      setCustomerAddress({ state: watchedState })
    }
  }, [watchedState, selectedState, setValue, setCustomerAddress])

  // Watch form values for real-time validation and store updates
  const watchedCustomerInfo = watch("customerInfo")
  const watchedCustomerAddress = watch("customerAddress")

  useEffect(() => {
    if (watchedCustomerInfo) {
      setCustomerInfo(watchedCustomerInfo)
    }
  }, [watchedCustomerInfo, setCustomerInfo])

  useEffect(() => {
    if (watchedCustomerAddress) {
      setCustomerAddress(watchedCustomerAddress)
    }
  }, [watchedCustomerAddress, setCustomerAddress])

  // Clear errors when fields become valid
  useEffect(() => {
    const validateField = async (fieldName: any, value: any) => {
      if (value && value.trim() !== "") {
        const isFieldValid = await trigger(fieldName)
        if (isFieldValid) {
          clearErrors(fieldName)
        }
      }
    }

    // Validate customer info fields
    if (watchedCustomerInfo?.name) {
      validateField("customerInfo.name", watchedCustomerInfo.name)
    }
    if (watchedCustomerInfo?.email) {
      validateField("customerInfo.email", watchedCustomerInfo.email)
    }
    if (watchedCustomerInfo?.phone) {
      validateField("customerInfo.phone", watchedCustomerInfo.phone)
    }

    // Validate address fields
    if (watchedCustomerAddress?.streetAddress) {
      validateField("customerAddress.streetAddress", watchedCustomerAddress.streetAddress)
    }
    if (watchedCustomerAddress?.state) {
      validateField("customerAddress.state", watchedCustomerAddress.state)
    }
    if (watchedCustomerAddress?.lga) {
      validateField("customerAddress.lga", watchedCustomerAddress.lga)
    }
  }, [watchedCustomerInfo, watchedCustomerAddress, trigger, clearErrors])

  const continueToReview = () => {
    goToNextStep()
    if (productStoreOrderSummaries.length > 0) {
      productStoreOrderSummaries.forEach((orderSummary) => {
        mutate(`/public/products/${orderSummary.item.id}${orderSummary.referralId}`)
      })
    }
  }

  const showPaymentCancelledModal = () => {
    // You could use a toast library or custom modal
    setShowCancelledModal(true)
  }

  const paystackConfig = {
    email: watchedCustomerInfo?.email || "",
    amount: total * 100, // Paystack expects amount in kobo
    metadata: {
      name: watchedCustomerInfo?.name || "",
      phone: watchedCustomerInfo?.phone || "",
      address: watchedCustomerAddress
        ? `${watchedCustomerAddress.streetAddress}, ${watchedCustomerAddress.lga}, ${watchedCustomerAddress.state}`
        : "",
      custom_fields: [
        {
          display_name: "Order Items",
          variable_name: "order_items",
          value: cartItems?.map((item) => `${item.name} x${item.quantity}`).join(", "),
        },
      ],
    },
    publicKey: process.env.NEXT_PUBLIC_PAYSTACK_PUBLIC_KEY,
    text: isLoading ? "Processing..." : "Place Order",
    onSuccess: async (reference) => {
      try {
        await placeOrder(reference.reference)
      } catch (error) {
        console.error("Error placing order after successful payment:", error)
      }
    },
    onClose: () => {
      showPaymentCancelledModal()
    },
  }

  const formatPrice = (price?: string | number) => {
    return `₦${price?.toLocaleString()}`
  }



 const goToNextStep = async () => {
  if (currentStep === "delivery") {
    // First, validate customer info (required for both delivery methods)
    const customerInfoValid = await trigger("customerInfo")
    
    // Get current form values to check if they're filled
    const customerInfo = watch("customerInfo")
    const customerAddress = watch("customerAddress")
    
    // Check if customer info is actually filled (not just validation passing)
    const isCustomerInfoFilled = 
      customerInfo.name?.trim() && 
      customerInfo.email?.trim() && 
      customerInfo.phone?.trim()
    
    if (!customerInfoValid || !isCustomerInfoFilled) {
      // Scroll to first error
      const firstError = document.querySelector(".border-red-500")
      if (firstError) {
        firstError.scrollIntoView({ behavior: "smooth", block: "center" })
      }
      return
    }

    // For terminal delivery
    if (deliveryMethod === "terminal") {
      const terminalSelected = selectedTerminal !== "" && selectedTerminal !== null
      
      if (!terminalSelected) {
        setShowTerminalAlert(true)
        return
      }
      
      // All terminal requirements met
      setDeliveryMethod("terminal")
      setTerminalAddress(selectedTerminal)
      setCurrentStep("review")
    } 
    // For home delivery
    else {
      // Validate address fields
      const addressValid = await trigger("customerAddress")
      
      // Check if required address fields are filled
      const isAddressInfoFilled = 
        customerAddress.state?.trim() && 
        customerAddress.lga?.trim() && 
        customerAddress.streetAddress?.trim()
      
      if (!addressValid || !isAddressInfoFilled) {
        // Scroll to first error
        const firstError = document.querySelector(".border-red-500")
        if (firstError) {
          firstError.scrollIntoView({ behavior: "smooth", block: "center" })
        }
        return
      }
      
      // All home delivery requirements met
      setDeliveryMethod("home")
      setCurrentStep("review")
    }
  }
}

  const goToPreviousStep = () => {
    if (currentStep === "review") setCurrentStep("delivery")
  }

  // Handle delivery instructions change
const handleDeliveryInstructionsChange = (instructions: string) => {
  setDeliveryInstructions(instructions)
}

  const renderPlaceOrderButton = () => {
    // Only render PaystackButton on client side
    if (!isClient) {
      return <Button className="flex-1">Loading Payment...</Button>
    }

    return (
      <PaystackButton
        {...paystackConfig}
        className="flex-1 bg-primary text-primary-foreground hover:bg-primary/90 h-10 px-4 py-2 rounded-md font-medium transition-colors"
      />
    )
  }

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
                              {...register("customerInfo.name")}
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
                              {...register("customerInfo.email")}
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
                              {...register("customerInfo.phone")}
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
                                    setDeliveryMethod("terminal");
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

                          {selectedState &&
                            (selectedState === "Lagos" ||
                              selectedState === "Ogun") && (
                              <div className="space-y-2">
                                <Label className="text-base font-medium">
                                  Delivery Method
                                </Label>

                                {showTerminalAlert && (
                                  <Alert className="border-red-200 bg-red-50">
                                    <AlertDescription className="text-red-800">
                                      Please select a terminal location before
                                      continuing.
                                    </AlertDescription>
                                  </Alert>
                                )}

                                <div className="space-y-3">
                                  <div className="flex items-center space-x-2">
                                    <input
                                      type="radio"
                                      id="terminal"
                                      name="deliveryType"
                                      value="terminal"
                                      checked={deliveryMethod === "terminal"}
                                      onChange={(e) => {
                                        const newDeliveryType = e.target
                                          .value as "terminal" | "home";
                                        setDeliveryMethod(newDeliveryType);
                                        setShowTerminalAlert(false);
                                      }}
                                      className="w-4 h-4 text-blue-600"
                                    />
                                    <Label
                                      htmlFor="terminal"
                                      className="font-normal"
                                    >
                                      Terminal Pickup
                                    </Label>
                                  </div>
                                  <div className="flex items-center space-x-2">
                                    <input
                                      type="radio"
                                      id="home"
                                      name="deliveryType"
                                      value="home"
                                      checked={deliveryMethod === "home"}
                                      onChange={(e) => {
                                        const newDeliveryType = e.target
                                          .value as "terminal" | "home";
                                        setDeliveryMethod(newDeliveryType);
                                        // Clear terminal selection when switching to home delivery
                                        if (newDeliveryType === "home") {
                                          setSelectedTerminal("");
                                          setTerminalAddress("");
                                          setShowTerminalAlert(false);
                                        }
                                      }}
                                      className="w-4 h-4 text-blue-600"
                                    />
                                    <Label
                                      htmlFor="home"
                                      className="font-normal"
                                    >
                                      Home Delivery
                                    </Label>
                                  </div>
                                </div>
                                <p className="text-sm text-muted-foreground">
                                  Terminal pickup locations are GIG Logistics
                                  pickup offices where you can collect your
                                  order.
                                </p>
                              </div>
                            )}

                          {selectedState &&
                            deliveryMethod === "terminal" &&
                            terminalAddresses[
                              selectedState as keyof typeof terminalAddresses
                            ] && (
                              <div className="space-y-2">
                                <Label>
                                  Select Terminal{" "}
                                  <span className="text-red-500">*</span>
                                </Label>
                                <div className="bg-blue-50 border border-blue-200 rounded-md p-3 mb-3">
                                  <div className="flex items-center justify-between">
                                    <p className="text-xs text-blue-800">
                                      <strong>Terminal Pickup Price</strong>
                                    </p>
                                    <span className="text-lg font-bold text-blue-900">
                                      {formatPrice(
                                        TerminalPickupPrices[
                                          selectedState as keyof typeof TerminalPickupPrices
                                        ] || 0
                                      )}
                                    </span>
                                  </div>
                                  <p className="text-sm text-blue-700 mt-1">
                                    All pickup locations in {selectedState} have
                                    the same price
                                  </p>
                                </div>
                                <p className="text-sm text-muted-foreground mb-2">
                                  Scroll to choose a GIG Logistics office near
                                  you for pickup:
                                </p>
                                <div className="border rounded-md max-h-48 overflow-y-auto">
                                  {terminalAddresses[
                                    selectedState as keyof typeof terminalAddresses
                                  ].map((terminal, index) => (
                                    <div
                                      key={index}
                                      className={`p-3 border-b last:border-b-0 cursor-pointer hover:bg-muted/50 ${
                                        selectedTerminal === terminal
                                          ? "bg-blue-50 border-blue-200"
                                          : ""
                                      }`}
                                      onClick={() => {
                                        setSelectedTerminal(terminal);
                                        setTerminalAddress(terminal);
                                      }}
                                    >
                                      <div className="flex items-start space-x-2">
                                        <input
                                          type="radio"
                                          name="terminal"
                                          value={terminal}
                                          checked={
                                            selectedTerminal === terminal
                                          }
                                          onChange={() => {
                                            setSelectedTerminal(terminal);
                                            setTerminalAddress(terminal);
                                          }}
                                          className="w-4 h-4 text-blue-600 mt-1"
                                        />
                                        <span className="text-xs whitespace-normal break-words">
                                          {terminal}
                                        </span>
                                      </div>
                                    </div>
                                  ))}
                                </div>
                              </div>
                            )}

                          {selectedState && deliveryMethod === "home" && (
                            <>
                              {/* Address Specificity Message */}
                              <Alert className="mb-4">
                                <Info className="h-4 w-4" />
                                <AlertDescription>
                                  <strong>💡 Pro Tip:</strong> Providing a very
                                  specific and detailed address helps our
                                  logistics partners optimize delivery routes,
                                  which can potentially reduce your delivery
                                  costs. Include landmarks, building
                                  descriptions, and clear directions.
                                </AlertDescription>
                              </Alert>

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
                                        if (
                                          value &&
                                          errors.customerAddress?.lga
                                        ) {
                                          const isValid = await trigger(
                                            "customerAddress.lga"
                                          );
                                          if (isValid)
                                            clearErrors("customerAddress.lga");
                                        }
                                      }}
                                      disabled={
                                        !selectedState ||
                                        availableLgas.length === 0
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

                              {/* Street Address */}
                              <div className="space-y-2">
                                <Label htmlFor="streetAddress">
                                  Street Address{" "}
                                  <span className="text-red-500">*</span>
                                </Label>
                                <Textarea
                                  id="streetAddress"
                                  {...register("customerAddress.streetAddress")}
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
                                    {
                                      errors.customerAddress.streetAddress
                                        .message
                                    }
                                  </p>
                                )}
                              </div>

                              {/* Additional Directions */}
                              <div className="space-y-2">
                                <Label htmlFor="directions">
                                  Additional Directions{" "}
                                  <span className="text-gray-500">
                                    (Optional)
                                  </span>
                                </Label>
                                <Textarea
                                  id="directions"
                                  {...register("customerAddress.directions")}
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
                            </>
                          )}

                          {/* Delivery Pricing Status */}
                          {(isLogisticsPricingLoading ||
                            logisticsPricingError ||
                            logisticsPricingData?.data?.price !==
                              undefined) && (
                            <div className="p-3 border rounded-md bg-muted/50">
                              <div className="flex items-center gap-2">
                                {logisticsPricingError && (
                                  <span className="text-sm text-red-600">
                                    Unable to calculate delivery fee - using
                                    standard rate
                                  </span>
                                )}
                                {logisticsPricingData?.data?.price !==
                                  undefined &&
                                  !isLogisticsPricingLoading && (
                                    <span className="text-sm text-green-600">
                                      Delivery fee calculated:{" "}
                                      {formatPrice(
                                        logisticsPricingData.data.price
                                      )}
                                    </span>
                                  )}
                              </div>
                            </div>
                          )}
                        </div>
                      </div>

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
                          value={checkoutData.deliveryInstructions || ""}
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
                      </div>

                      <Separator />

                      {/* Updated review section to show terminal address when delivery method is terminal */}
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
                              {checkoutData.deliveryMethod === "terminal" ? (
                                <span className="break-words whitespace-normal">
                                  <strong>Terminal Pickup:</strong>
                                  <br />
                                  {checkoutData.terminalAddress ||
                                    selectedTerminal ||
                                    "Terminal Address"}
                                </span>
                              ) : (
                                // Show regular address for home delivery
                                <>
                                  {checkoutData.customerAddress.streetAddress ||
                                    "Street Address"}
                                  {checkoutData.customerAddress.directions && (
                                    <>
                                      <br />
                                      <span className="text-muted-foreground">
                                        Directions:{" "}
                                        {
                                          checkoutData.customerAddress
                                            .directions
                                        }
                                      </span>
                                    </>
                                  )}
                                  <br />
                                  {checkoutData.customerAddress.lga},{" "}
                                  {checkoutData.customerAddress.state}
                                </>
                              )}
                              <br />
                              {checkoutData.customerInfo.phone ||
                                "Phone Number"}
                            </p>
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
                          {isLogisticsPricingLoading && (
                            <Loader2 className="h-3 w-3 animate-spin ml-1 inline" />
                          )}
                        </span>
                        <span className="text-sm">
                          {deliveryMethod === "terminal" && selectedState
                            ? formatPrice(
                                TerminalPickupPrices[
                                  selectedState as keyof typeof TerminalPickupPrices
                                ] || 0
                              )
                            : !watchedState ||
                              !watchedLga ||
                              !watchedStreetAddress
                            ? "Enter address to calculate"
                            : deliveryFee === null
                            ? "Calculating..."
                            : deliveryFee === 0
                            ? "Free"
                            : formatPrice(deliveryFee)}
                        </span>
                      </div>
                      {logisticsPricingError && (
                        <div className="text-xs text-red-600 mt-1">
                          Unable to calculate delivery fee - using standard rate
                        </div>
                      )}
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

                {/* Help Section */}
                <Card className="mt-6">
                  <CardContent className="p-6">
                    <div className="space-y-4 text-sm">
                      <div className="flex items-start">
                        <span className="mr-2 text-primary">•</span>
                        <p>
                          Orders are typically delivered 1-3 days for locations
                          within Lagos and Ogun, and 3-7 days for other
                          locations
                        </p>
                      </div>
                      <div className="flex items-start">
                        <span className="mr-2 text-primary">•</span>
                        <p>
                          We accept returns within 3 days of delivery, provided
                          items meet our return policy
                        </p>
                      </div>
                      <div className="flex items-start">
                        <span className="mr-2 text-primary">•</span>
                        <p>Detailed addresses help reduce delivery costs</p>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </div>
            </div>
          </div>
        </div>
      )}

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