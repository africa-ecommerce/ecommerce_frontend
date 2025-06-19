// // "use client";
// // import { useState, useEffect, useMemo, useRef } from "react";
// // import dynamic from "next/dynamic";
// // import Image from "next/image";
// // import { useRouter, useSearchParams } from "next/navigation";
// // import {
// //   CreditCard,
// //   MapPin,
// //   Banknote,
// //   ArrowLeft,
// //   Loader2,
// //   Info,
// // } from "lucide-react";
// // import useSWR, { mutate } from "swr";

// // import { Button } from "@/components/ui/button";
// // import { Card, CardContent } from "@/components/ui/card";
// // import { Separator } from "@/components/ui/separator";
// // import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
// // import { Label } from "@/components/ui/label";
// // import { Textarea } from "@/components/ui/textarea";
// // import { Alert, AlertDescription } from "@/components/ui/alert";
// // import { useProductStore } from "@/hooks/product-store";
// // import { useFormResolver } from "@/hooks/useFormResolver";
// // import { Controller } from "react-hook-form";
// // import NaijaStates from "naija-state-local-government";
// // import { getLgasForState } from "@/lib/utils";
// // import { Input } from "@/components/ui/input";
// // import {
// //   Select,
// //   SelectContent,
// //   SelectItem,
// //   SelectTrigger,
// //   SelectValue,
// // } from "@/components/ui/select";
// // import { deliveryFormSchema } from "@/zod/schema";
// // import { useCheckoutStore } from "@/hooks/checkout-store";
// // import { errorToast, successToast } from "@/components/ui/use-toast-advanced";
// // import { useProductFetcher } from "@/hooks/use-product-fetcher";

// // // Dynamic import of PaystackButton to prevent SSR issues
// // const PaystackButton = dynamic(
// //   () => import("react-paystack").then((mod) => mod.PaystackButton),
// //   {
// //     ssr: false,
// //     loading: () => (
// //       <Button className="flex-1" disabled>
// //         Loading Payment...
// //       </Button>
// //     ),
// //   }
// // );

// // // SWR fetcher function
// // const fetcher = async (url: string) => {
// //   const response = await fetch(url);
// //   if (!response.ok) {
// //     throw new Error(`HTTP error! status: ${response.status}`);
// //   }
// //   return response.json();
// // };

// // // SWR configuration options
// // const swrOptions = {
// //   revalidateOnFocus: false,
// //   revalidateOnReconnect: true,
// //   refreshInterval: 0,
// //   dedupingInterval: 5000,
// //   errorRetryCount: 0,
// // };

// // const logisticsPricingOptions = {
// //   ...swrOptions,
// //   refreshInterval: 30000,
// //   revalidateOnFocus: false,
// //   dedupingInterval: 2000,
// // };

// // const buyerInfoOptions = {
// //   ...swrOptions,
// //   dedupingInterval: 10000,
// //   refreshInterval: 0,
// // };

// // export default function Page() {
// //   const [buyerCoordinates, setBuyerCoordinates] = useState<{
// //     latitude: number | null;
// //     longitude: number | null;
// //   }>({ latitude: null, longitude: null });

// //   // Use the product fetcher hook
// //   const {
// //     isLoading: isProductLoading,
// //     hasErrors: hasProductErrors,
// //     refetch: refetchProducts,
// //   } = useProductFetcher();
// //   // Replace local state with Zustand store
// //   const {
// //     checkoutData,
// //     setCustomerInfo,
// //     setCustomerAddress,
// //     setPaymentMethod,
// //     setDeliveryInstructions,
// //     setCurrentStep,
// //     clearCheckoutData,
// //     _hasHydrated,
// //   } = useCheckoutStore();

// //   // Local state for UI-specific needs
// //   // const [isClient, setIsClient] = useState(false)
// //   const [mounted, setMounted] = useState(false);
// //   const [selectedState, setSelectedState] = useState<string>("");
// //   const [availableLgas, setAvailableLgas] = useState<string[]>([]);
// //   const [states, setStates] = useState<string[]>([]);
// //   const [isLoading, setIsLoading] = useState(false);
// //   const [isHydrated, setIsHydrated] = useState(false);

// //   const router = useRouter();
// //   const searchParams = useSearchParams();
// //   const platform = searchParams.get("platform");

// //   const isInitialMount = useRef(true);

// //   // Get values from store
// //   const currentStep = checkoutData.currentStep;
// //   const paymentMethod = checkoutData.paymentMethod;

// //   // Product store - now working with array of order products
// //   const { orderSummaries, updateDeliveryFee } = useProductStore();

// //   // Calculate totals from all order summaries
// //   const totals = useMemo(() => {
// //     const subtotal = orderSummaries.reduce(
// //       (sum, order) => sum + order.subtotal,
// //       0
// //     );
// //     const deliveryFee = orderSummaries.reduce(
// //       (sum, order) => sum + (order.deliveryFee || 0),
// //       0
// //     );
// //     const total = subtotal + deliveryFee;
// //     const totalItems = orderSummaries.reduce(
// //       (sum, order) => sum + order.item.quantity,
// //       0
// //     );

// //     return { subtotal, deliveryFee, total, totalItems };
// //   }, [orderSummaries]);

// //   // Form resolver for customer info and address
// //   const {
// //     form: {
// //       register,
// //       submit,
// //       control,
// //       errors,
// //       watch,
// //       setValue,
// //       trigger,
// //       clearErrors,
// //       formState: { isValid },
// //     },
// //   } = useFormResolver(async (data) => {
// //     console.log("Customer delivery data:", data);
// //     setCustomerInfo(data.customerInfo);
// //     setCustomerAddress(data.customerAddress);
// //     return data;
// //   }, deliveryFormSchema);

// //   // Watch address fields for SWR key generation
// //   const watchedState = watch("customerAddress.state");
// //   const watchedLga = watch("customerAddress.lga");
// //   const watchedStreetAddress = watch("customerAddress.streetAddress");
// //   const watchedName = watch("customerInfo.name");
// //   const watchedEmail = watch("customerInfo.email");
// //   const watchedPhone = watch("customerInfo.phone");

// //   useEffect(() => {
// //     setMounted(true);
// //     isInitialMount.current = false;
// //   }, []);

// //   useEffect(() => {
// //     setIsHydrated(true);
// //   }, []);

// //   // Memoize buyer info key to prevent unnecessary re-renders
// //   const buyerInfoKey = useMemo(() => {
// //     if (!watchedName || !watchedEmail || !watchedPhone) return null;

// //     const nameValid = watchedName.trim().length >= 2;
// //     const emailValid = /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(watchedEmail);
// //     const phoneValid = /^(\+?234|0)[\d]{10}$/.test(watchedPhone);

// //     if (!nameValid || !emailValid || !phoneValid) return null;

// //     return `/api/orders/buyer-info?buyerName=${encodeURIComponent(
// //       watchedName.trim()
// //     )}&buyerEmail=${encodeURIComponent(
// //       watchedEmail.trim()
// //     )}&buyerPhone=${encodeURIComponent(watchedPhone.trim())}`;
// //   }, [watchedName, watchedEmail, watchedPhone]);

// //   const { data: buyerInfoData, error: buyerInfoError } = useSWR(
// //     buyerInfoKey,
// //     fetcher,
// //     buyerInfoOptions
// //   );

// //   // Use first order's pickup location for delivery fee calculation
// //   const firstOrderPickupLocation = orderSummaries[0]?.pickupLocation;

// //   // Memoize logistics pricing key
// //   const logisticsPricingKey = useMemo(() => {
// //     if (!watchedState || !watchedLga || !watchedStreetAddress) return null;
// //     if (
// //       !firstOrderPickupLocation?.latitude ||
// //       !firstOrderPickupLocation?.longitude
// //     )
// //       return null;

// //     return `/api/logistics/pricing?state=${encodeURIComponent(
// //       watchedState
// //     )}&lga=${encodeURIComponent(watchedLga)}&streetAddress=${encodeURIComponent(
// //       watchedStreetAddress
// //     )}&supplierLat=${firstOrderPickupLocation.latitude}&supplierLng=${
// //       firstOrderPickupLocation.longitude
// //     }`;
// //   }, [
// //     watchedState,
// //     watchedLga,
// //     watchedStreetAddress,
// //     firstOrderPickupLocation,
// //   ]);

// //   const {
// //     data: logisticsPricingData,
// //     error: logisticsPricingError,
// //     isLoading: isLogisticsPricingLoading,
// //   } = useSWR(logisticsPricingKey, fetcher, logisticsPricingOptions);

// //   // Update form initialization effect
// //   useEffect(() => {
// //     // Initialize states data
// //     if (mounted) {
// //       try {
// //         const statesData = NaijaStates.states();
// //         if (Array.isArray(statesData)) {
// //           const stateNames = statesData
// //             .map((state: any) => {
// //               return typeof state === "string"
// //                 ? state
// //                 : state.state || state.name;
// //             })
// //             .filter(Boolean);
// //           setStates(stateNames);
// //         }
// //       } catch (error) {
// //         console.error("Error fetching states:", error);
// //         setStates([]);
// //       }
// //     }
// //   }, [mounted]);

// //   // Add this useEffect to initialize form after hydration
// //   useEffect(() => {
// //     if (!_hasHydrated || !mounted) return;

// //     console.log("Hydrating form with persisted data:", checkoutData);

// //     // Set form values from persisted store
// //     setValue("customerInfo.name", checkoutData.customerInfo.name);
// //     setValue("customerInfo.email", checkoutData.customerInfo.email);
// //     setValue("customerInfo.phone", checkoutData.customerInfo.phone);
// //     setValue(
// //       "customerAddress.streetAddress",
// //       checkoutData.customerAddress.streetAddress
// //     );

// //     if (checkoutData.customerAddress.state) {
// //       setValue("customerAddress.state", checkoutData.customerAddress.state);
// //       setSelectedState(checkoutData.customerAddress.state);
// //       const lgas = getLgasForState(checkoutData.customerAddress.state);
// //       setAvailableLgas(lgas);
// //     }

// //     if (checkoutData.customerAddress.lga) {
// //       setValue("customerAddress.lga", checkoutData.customerAddress.lga);
// //     }

// //     setValue(
// //       "customerAddress.directions",
// //       checkoutData.customerAddress.directions || ""
// //     );
// //   }, [_hasHydrated, mounted, setValue, checkoutData]);

// //   // Add a debug effect to monitor hydration
// //   useEffect(() => {
// //     console.log("Hydration state:", {
// //       mounted,
// //       _hasHydrated,
// //       isInitialMount: isInitialMount.current,
// //     });
// //     console.log("Checkout data:", checkoutData);
// //   }, [mounted, _hasHydrated, checkoutData]);

// //   // Watch state changes to update LGAs
// //   useEffect(() => {
// //     if (watchedState && watchedState !== selectedState) {
// //       setSelectedState(watchedState);
// //       const lgas = getLgasForState(watchedState);
// //       setAvailableLgas(lgas);
// //       setCustomerAddress({ state: watchedState });
// //     }
// //   }, [watchedState, selectedState, setCustomerAddress]);

// //   // Watch form values for real-time validation and store updates
// //   useEffect(() => {
// //     const customerInfo = watch("customerInfo");
// //     if (
// //       customerInfo &&
// //       (customerInfo.name !== checkoutData.customerInfo.name ||
// //         customerInfo.email !== checkoutData.customerInfo.email ||
// //         customerInfo.phone !== checkoutData.customerInfo.phone)
// //     ) {
// //       setCustomerInfo(customerInfo);
// //     }
// //   }, [watch("customerInfo"), setCustomerInfo, checkoutData.customerInfo]);

// //   useEffect(() => {
// //     const customerAddress = watch("customerAddress");
// //     if (
// //       customerAddress &&
// //       (customerAddress.streetAddress !==
// //         checkoutData.customerAddress.streetAddress ||
// //         customerAddress.state !== checkoutData.customerAddress.state ||
// //         customerAddress.lga !== checkoutData.customerAddress.lga ||
// //         customerAddress.directions !== checkoutData.customerAddress.directions)
// //     ) {
// //       setCustomerAddress(customerAddress);
// //     }
// //   }, [
// //     watch("customerAddress"),
// //     setCustomerAddress,
// //     checkoutData.customerAddress,
// //   ]);

// //   // Effect to handle buyer info auto-fill
// //   useEffect(() => {
// //     if (buyerInfoData?.data && !buyerInfoError) {
// //       const data = buyerInfoData.data;

// //       if (data.streetAddress && data.state && data.lga) {
// //         setValue("customerAddress.streetAddress", data.streetAddress);
// //         setValue("customerAddress.state", data.state);
// //         setValue("customerAddress.lga", data.lga);

// //         if (data.directions) {
// //           setValue("customerAddress.directions", data.directions);
// //         }

// //         setCustomerAddress({
// //           streetAddress: data.streetAddress,
// //           state: data.state,
// //           lga: data.lga,
// //           directions: data.directions || "",
// //         });

// //         setSelectedState(data.state);
// //         const lgas = getLgasForState(data.state);
// //         setAvailableLgas(lgas);
// //       }
// //     }
// //   }, [buyerInfoData, buyerInfoError, setValue, setCustomerAddress]);

// //   // Effect to handle logistics pricing updates - apply to first order only
// //   useEffect(() => {
// //     if (logisticsPricingData?.data && !logisticsPricingError) {
// //       const price = logisticsPricingData.data.price;

// //       if (price !== undefined) {
// //         // Apply delivery fee to first order only
// //         updateDeliveryFee(price, 0);

// //         if (
// //           logisticsPricingData.data.buyerLatitude &&
// //           logisticsPricingData.data.buyerLongitude
// //         ) {
// //           setBuyerCoordinates({
// //             latitude: logisticsPricingData.data.buyerLatitude,
// //             longitude: logisticsPricingData.data.buyerLongitude,
// //           });
// //         } else {
// //           setBuyerCoordinates({
// //             latitude: 6.5244 + (Math.random() - 0.5) * 0.1,
// //             longitude: 3.3792 + (Math.random() - 0.5) * 0.1,
// //           });
// //         }
// //       }
// //     } else if (logisticsPricingError) {
// //       console.error("Logistics pricing error:", logisticsPricingError);
// //       updateDeliveryFee(1500, 0);

// //       setBuyerCoordinates({
// //         latitude: 6.5244 + (Math.random() - 0.5) * 0.1,
// //         longitude: 3.3792 + (Math.random() - 0.5) * 0.1,
// //       });
// //     }
// //   }, [logisticsPricingData, logisticsPricingError, updateDeliveryFee]);

// //   // Helper function to calculate supplier amount for all orders
// //   const calculateSupplierAmount = () => {
// //     return orderSummaries.reduce((total, order) => {
// //       const originalPrice = order.item.originalPrice || order.item.price;
// //       return total + originalPrice * order.item.quantity;
// //     }, 0);
// //   };

// //   // Format order items for all orders
// //   const formatOrderItems = () => {
// //     return orderSummaries.map((order) => ({
// //       productId: order.productId,
// //       quantity: order.item.quantity,

// //       ...(order.item.variationId && {
// //         variantId: order.item.variationId,
// //         variantColor: order.item.color,
// //         variantSize: order.item.size,
// //       }),
// //       ...(!order.item.variationId && {
// //         productColor: order.item.color,
// //         productSize: order.item.size,
// //       }),
// //     }));
// //   };

// //   const prepareOrderData = (
// //     paymentMethod: string,
// //     paymentReference?: string
// //   ) => {
// //     const supplierAmount = calculateSupplierAmount();
// //     const plugAmount = totals.subtotal - supplierAmount;

// //     // Create array of order data
// //     const ordersData = orderSummaries.map((order) => ({
// //       buyerName: checkoutData.customerInfo.name,
// //       buyerEmail: checkoutData.customerInfo.email,
// //       buyerPhone: checkoutData.customerInfo.phone,
// //       buyerAddress: checkoutData.customerAddress.streetAddress,
// //       buyerLga: checkoutData.customerAddress.lga,
// //       buyerState: checkoutData.customerAddress.state,
// //       buyerDirections: checkoutData.customerAddress.directions || "",
// //       buyerInstructions: checkoutData.deliveryInstructions || "",
// //       buyerLatitude: buyerCoordinates.latitude || 6.5244,
// //       buyerLongitude: buyerCoordinates.longitude || 3.3792,

// //       supplierId: order.item.supplierId || "",

// //       paymentMethod: paymentMethod,
// //       totalAmount: order.subtotal + (order.deliveryFee || 0),
// //       deliveryFee: order.deliveryFee || 0,
// //       supplierAmount:
// //         (order.item.originalPrice || order.item.price) * order.item.quantity,
// //       plugAmount:
// //         (order.item.price - (order.item.originalPrice || order.item.price)) *
// //         order.item.quantity,
// //       plugPrice: order.item.price,
// //       supplierPrice: order.item.originalPrice || order.item.price,
// //       plugId: order.referralId || "",
// //       orderItems: [
// //         {
// //           productId: order.productId,
// //           quantity: order.item.quantity,
// //           ...(order.item.variationId && {
// //             variantId: order.item.variationId,
// //             variantColor: order.item.color,
// //             variantSize: order.item.size,
// //           }),
// //           ...(!order.item.variationId && {
// //             productColor: order.item.color,
// //             productSize: order.item.size,
// //           }),
// //         },
// //       ],

// //       ...(paymentReference && { paymentReference }),
// //     }));

// //     return ordersData;
// //   };

// //   const placeOrder = async (
// //     paymentMethod: string,
// //     paymentReference?: string
// //   ) => {
// //     try {
// //       setIsLoading(true);
// //       const ordersData = prepareOrderData(paymentMethod, paymentReference);

// //       console.log("Placing orders with data:", ordersData);

// //       const response = await fetch("/api/orders/place-orders", {
// //         method: "POST",
// //         headers: {
// //           "Content-Type": "application/json",
// //         },
// //         body: JSON.stringify({ orders: ordersData }),
// //       });

// //       if (!response.ok) {
// //         const errorData = await response.json();
// //         errorToast(errorData.error || "Failed to place orders");

// //         clearCheckoutData();
// //         useProductStore.getState().clearOrderSummaries();
// //         router.replace("/order-error");
// //         return;
// //       }

// //       const result = await response.json();
// //       successToast(result.message || "Orders placed successfully");

// //       if (result.data) {
// //         sessionStorage.setItem("orderSuccess", JSON.stringify(result.data));
// //       }

// //       clearCheckoutData();
// //       useProductStore.getState().clearOrderSummaries();

// //       router.replace("/thank-you");

// //       return result;
// //     } catch (error) {
// //       console.error("Error placing orders:", error);
// //       errorToast("An error occurred while placing the orders");
// //     } finally {
// //       setIsLoading(false);
// //     }
// //   };

// //   const handleBackNavigation = () => {
// //     if (platform !== "store") {
// //       router.back();
// //     }
// //   };

// //   // Calculate delivery fee based on method and logistics pricing
// //   const getDeliveryFee = () => {
// //     const hasRequiredAddressData =
// //       watchedState && watchedLga && watchedStreetAddress;

// //     if (!hasRequiredAddressData) {
// //       return null;
// //     }

// //     if (isLogisticsPricingLoading) {
// //       return null;
// //     }

// //     if (
// //       logisticsPricingData?.data?.price !== undefined &&
// //       !logisticsPricingError
// //     ) {
// //       return logisticsPricingData.data.price;
// //     }

// //     if (logisticsPricingError) {
// //       return 1500;
// //     }

// //     return null;
// //   };

// //   const deliveryFee = getDeliveryFee();

// //   const continueToReview = async () => {
// //     if (currentStep === "delivery") {
// //       // Trigger validation for all fields
// //       const isFormValid = await trigger();

// //       if (isFormValid) {
// //         setCurrentStep("review");
// //         // Mutate all product data
// //         orderSummaries.forEach((order) => {
// //           if (order.productId && order.referralId) {
// //             mutate(`/public/products/${order.productId}${order.referralId}`);
// //           }
// //         });
// //       } else {
// //         // Optionally scroll to the first error
// //         const firstError = document.querySelector(".border-red-500");
// //         if (firstError) {
// //           firstError.scrollIntoView({ behavior: "smooth", block: "center" });
// //         }
// //       }
// //     }
// //   };
// //   // Memoize Paystack config to prevent unnecessary re-renders
// //   const paystackConfig = useMemo(() => {
// //     if (!mounted) return null;

// //     return {
// //       email: watchedEmail || "",
// //       amount: totals.total * 100,
// //       metadata: {
// //         name: watchedName || "",
// //         phone: watchedPhone || "",
// //         address:
// //           watchedState && watchedLga && watchedStreetAddress
// //             ? `${watchedStreetAddress}, ${watchedLga}, ${watchedState}`
// //             : "",
// //         custom_fields: [
// //           {
// //             display_name: "Order Items",
// //             variable_name: "order_items",
// //             value: orderSummaries
// //               .map((order) => `${order.item.name} x${order.item.quantity}`)
// //               .join(", "),
// //           },
// //         ],
// //       },
// //       publicKey: "pk_test_eff9334b69c4057bd0b89b293824020426f0d011",
// //       text: isLoading ? "Processing..." : "Place Order",
// //       onSuccess: async (reference: any) => {
// //         try {
// //           await placeOrder("online", reference.reference);
// //           console.log("Payment successful:", reference);
// //         } catch (error) {
// //           console.error(
// //             "Error placing orders after successful payment:",
// //             error
// //           );
// //         }
// //       },
// //       onClose: () => {
// //         alert("Payment cancelled");
// //       },
// //     };
// //   }, [
// //     mounted,
// //     watchedEmail,
// //     totals.total,
// //     watchedName,
// //     watchedPhone,
// //     watchedState,
// //     watchedLga,
// //     watchedStreetAddress,
// //     orderSummaries,
// //     isLoading,
// //   ]);

// //   const formatPrice = (price?: string | number) => {
// //     if (typeof price === "undefined" || price === null) return "₦0";
// //     return `₦${Number(price).toLocaleString()}`;
// //   };

// //   const goToPreviousStep = () => {
// //     if (currentStep === "review") setCurrentStep("delivery");
// //   };

// //   const handleCashOnDeliveryOrder = async () => {
// //     try {
// //       await placeOrder("cash");
// //     } catch (error) {
// //       console.error("Error placing cash orders:", error);
// //     }
// //   };

// //   const handlePaymentMethodChange = (method: "online" | "cash") => {
// //     setPaymentMethod(method);
// //   };

// //   const handleDeliveryInstructionsChange = (instructions: string) => {
// //     setDeliveryInstructions(instructions);
// //   };

// //   const renderPlaceOrderButton = () => {
// //     if (paymentMethod === "cash") {
// //       return (
// //         <Button
// //           className="flex-1"
// //           onClick={handleCashOnDeliveryOrder}
// //           disabled={isLoading}
// //         >
// //           {isLoading ? (
// //             <>
// //               <Loader2 className="h-4 w-4 animate-spin mr-2" />
// //               Processing...
// //             </>
// //           ) : (
// //             "Place Order (Pay on Delivery)"
// //           )}
// //         </Button>
// //       );
// //     } else {
// //       // Always render a button, but conditionally render Paystack
// //       if (!mounted || !paystackConfig) {
// //         return (
// //           <Button className="flex-1" disabled>
// //             Loading Payment...
// //           </Button>
// //         );
// //       }

// //       return (
// //         <PaystackButton
// //           {...paystackConfig}
// //           className="flex-1 bg-primary text-primary-foreground hover:bg-primary/90 h-10 px-4 py-2 rounded-md font-medium transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
// //           disabled={isLoading}
// //         />
// //       );
// //     }
// //   };

// //   if (!mounted) {
// //     return (
// //       <div className="flex justify-center items-center min-h-screen">
// //         <div className="text-center">
// //           <Loader2 className="h-8 w-8 animate-spin mx-auto mb-4" />
// //           <p>Loading...</p>
// //         </div>
// //       </div>
// //     );
// //   }

// //   if (!isHydrated) {
// //     return (
// //       <div className="flex justify-center items-center min-h-screen">
// //         <div className="text-center">
// //           <Loader2 className="h-8 w-8 animate-spin mx-auto mb-4" />
// //           <p>Loading your checkout information...</p>
// //         </div>
// //       </div>
// //     );
// //   }

// //   // Show loading state while products are being fetched
// //   if (platform === "store" && isProductLoading) {
// //     return (
// //       <div className="flex justify-center items-center min-h-screen">
// //         <div className="text-center">
// //           <Loader2 className="h-8 w-8 animate-spin mx-auto mb-4" />
// //           <p>Loading your orders...</p>
// //         </div>
// //       </div>
// //     );
// //   }

// //   // Show error state if product fetching failed
// //   if (platform === "store" && hasProductErrors) {
// //     return (
// //       <div className="flex justify-center items-center min-h-screen">
// //         <div className="text-center">
// //           <p className="text-red-600 mb-4">
// //             Failed to load product information
// //           </p>
// //           <Button onClick={() => router.back()}>Go Back</Button>
// //         </div>
// //       </div>
// //     );
// //   }

// //   // Don't render if we don't have order data for store platform
// //   if (platform === "store" && orderSummaries.length === 0) {
// //     return (
// //       <div className="flex justify-center items-center min-h-screen">
// //         <div className="text-center">
// //           <p className="mb-4">No order information found</p>
// //           <Button onClick={() => router.back()}>Go Back</Button>
// //         </div>
// //       </div>
// //     );
// //   }

// //   return (
// //     <div className="flex flex-col min-h-screen pb-16 md:pb-0">
// //       {platform !== "store" && (
// //         <div className="sticky top-0 z-20 flex items-center p-4 bg-background/80 backdrop-blur-md border-b">
// //           <Button
// //             variant="ghost"
// //             size="sm"
// //             onClick={handleBackNavigation}
// //             className="flex items-center gap-2"
// //           >
// //             <ArrowLeft className="w-4 h-4" />
// //             Back
// //           </Button>
// //         </div>
// //       )}

// //       <div className="container mx-auto px-4 py-4 md:py-8 max-w-7xl">
// //         <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 lg:gap-8">
// //           <div className="lg:col-span-2">
// //             {currentStep === "delivery" && (
// //               <Card>
// //                 <CardContent className="p-4 md:p-6">
// //                   <h2 className="text-xl font-semibold mb-4">
// //                     Delivery Information
// //                   </h2>

// //                   <div className="space-y-6">
// //                     {/* Customer Information */}
// //                     <div>
// //                       <div className="flex items-center justify-between mb-3">
// //                         <h3 className="font-medium">Customer Information</h3>
// //                       </div>
// //                       <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
// //                         <div className="space-y-2">
// //                           <Label htmlFor="customerName">
// //                             Full Name <span className="text-red-500">*</span>
// //                           </Label>
// //                           <Input
// //                             id="customerName"
// //                             {...register("customerInfo.name", {
// //                               onChange: async (e) => {
// //                                 const value = e.target.value;
// //                                 setCustomerInfo({ name: value });
// //                                 if (value && errors.customerInfo?.name) {
// //                                   const isValid = await trigger(
// //                                     "customerInfo.name"
// //                                   );
// //                                   if (isValid) clearErrors("customerInfo.name");
// //                                 }
// //                               },
// //                             })}
// //                             placeholder="Enter your full name"
// //                             className={
// //                               errors.customerInfo?.name ? "border-red-500" : ""
// //                             }
// //                           />
// //                           {errors.customerInfo?.name && (
// //                             <p className="text-sm text-red-600">
// //                               {errors.customerInfo.name.message}
// //                             </p>
// //                           )}
// //                         </div>
// //                         <div className="space-y-2">
// //                           <Label htmlFor="customerEmail">
// //                             Email Address{" "}
// //                             <span className="text-red-500">*</span>
// //                           </Label>
// //                           <Input
// //                             id="customerEmail"
// //                             type="email"
// //                             {...register("customerInfo.email", {
// //                               onChange: async (e) => {
// //                                 const value = e.target.value;
// //                                 setCustomerInfo({ email: value });
// //                                 if (value && errors.customerInfo?.email) {
// //                                   const isValid = await trigger(
// //                                     "customerInfo.email"
// //                                   );
// //                                   if (isValid)
// //                                     clearErrors("customerInfo.email");
// //                                 }
// //                               },
// //                             })}
// //                             placeholder="Enter your email address"
// //                             className={
// //                               errors.customerInfo?.email ? "border-red-500" : ""
// //                             }
// //                           />
// //                           {errors.customerInfo?.email && (
// //                             <p className="text-sm text-red-600">
// //                               {errors.customerInfo.email.message}
// //                             </p>
// //                           )}
// //                         </div>
// //                         <div className="space-y-2 md:col-span-2">
// //                           <Label htmlFor="customerPhone">
// //                             Phone Number <span className="text-red-500">*</span>
// //                           </Label>
// //                           <Input
// //                             id="customerPhone"
// //                             {...register("customerInfo.phone", {
// //                               onChange: async (e) => {
// //                                 const value = e.target.value;
// //                                 setCustomerInfo({ phone: value });
// //                                 if (value && errors.customerInfo?.phone) {
// //                                   const isValid = await trigger(
// //                                     "customerInfo.phone"
// //                                   );
// //                                   if (isValid)
// //                                     clearErrors("customerInfo.phone");
// //                                 }
// //                               },
// //                             })}
// //                             placeholder="Enter your phone number"
// //                             className={
// //                               errors.customerInfo?.phone ? "border-red-500" : ""
// //                             }
// //                           />
// //                           {errors.customerInfo?.phone && (
// //                             <p className="text-sm text-red-600">
// //                               {errors.customerInfo.phone.message}
// //                             </p>
// //                           )}
// //                         </div>
// //                       </div>
// //                     </div>

// //                     <Separator />

// //                     {/* Delivery Address */}
// //                     <div>
// //                       <h3 className="font-medium mb-3">Delivery Address</h3>

// //                       <Alert className="mb-4">
// //                         <Info className="h-4 w-4" />
// //                         <AlertDescription>
// //                           <strong>💡 Pro Tip:</strong> Providing a very specific
// //                           and detailed address helps our logistics partners
// //                           optimize delivery routes, which can potentially reduce
// //                           your delivery costs. Include landmarks, building
// //                           descriptions, and clear directions.
// //                         </AlertDescription>
// //                       </Alert>

// //                       <div className="space-y-4">
// //                         <div className="space-y-2">
// //                           <Label htmlFor="streetAddress">
// //                             Street Address{" "}
// //                             <span className="text-red-500">*</span>
// //                           </Label>
// //                           <Textarea
// //                             id="streetAddress"
// //                             {...register("customerAddress.streetAddress", {
// //                               onChange: async (e) => {
// //                                 const value = e.target.value;
// //                                 setCustomerAddress({ streetAddress: value });
// //                                 if (
// //                                   value &&
// //                                   errors.customerAddress?.streetAddress
// //                                 ) {
// //                                   const isValid = await trigger(
// //                                     "customerAddress.streetAddress"
// //                                   );
// //                                   if (isValid)
// //                                     clearErrors(
// //                                       "customerAddress.streetAddress"
// //                                     );
// //                                 }
// //                               },
// //                             })}
// //                             rows={3}
// //                             className={
// //                               errors.customerAddress?.streetAddress
// //                                 ? "border-red-500"
// //                                 : ""
// //                             }
// //                             placeholder="Enter your full street address including house number, street name, area, and nearby landmarks for accurate delivery"
// //                           />
// //                           {errors.customerAddress?.streetAddress && (
// //                             <p className="text-sm text-red-600">
// //                               {errors.customerAddress.streetAddress.message}
// //                             </p>
// //                           )}
// //                         </div>

// //                         <div className="space-y-2">
// //                           <Label htmlFor="state">
// //                             State <span className="text-red-500">*</span>
// //                           </Label>
// //                           <Controller
// //                             name="customerAddress.state"
// //                             control={control}
// //                             render={({ field }) => (
// //                               <Select
// //                                 value={field.value}
// //                                 onValueChange={async (value) => {
// //                                   field.onChange(value);
// //                                   setCustomerAddress({ state: value });
// //                                   if (value && errors.customerAddress?.state) {
// //                                     const isValid = await trigger(
// //                                       "customerAddress.state"
// //                                     );
// //                                     if (isValid)
// //                                       clearErrors("customerAddress.state");
// //                                   }
// //                                 }}
// //                               >
// //                                 <SelectTrigger
// //                                   id="state"
// //                                   className={
// //                                     errors.customerAddress?.state
// //                                       ? "border-red-500"
// //                                       : ""
// //                                   }
// //                                 >
// //                                   <SelectValue placeholder="Select a state" />
// //                                 </SelectTrigger>
// //                                 <SelectContent>
// //                                   {states.map((state) => (
// //                                     <SelectItem key={state} value={state}>
// //                                       {state}
// //                                     </SelectItem>
// //                                   ))}
// //                                 </SelectContent>
// //                               </Select>
// //                             )}
// //                           />
// //                           {errors.customerAddress?.state && (
// //                             <p className="text-sm text-red-600">
// //                               {errors.customerAddress.state.message}
// //                             </p>
// //                           )}
// //                         </div>

// //                         <div className="space-y-2">
// //                           <Label htmlFor="lga">
// //                             Local Government Area{" "}
// //                             <span className="text-red-500">*</span>
// //                           </Label>
// //                           <Controller
// //                             name="customerAddress.lga"
// //                             control={control}
// //                             render={({ field }) => (
// //                               <Select
// //                                 value={field.value}
// //                                 onValueChange={async (value) => {
// //                                   field.onChange(value);
// //                                   setCustomerAddress({ lga: value });
// //                                   if (value && errors.customerAddress?.lga) {
// //                                     const isValid = await trigger(
// //                                       "customerAddress.lga"
// //                                     );
// //                                     if (isValid)
// //                                       clearErrors("customerAddress.lga");
// //                                   }
// //                                 }}
// //                                 disabled={
// //                                   !selectedState || availableLgas.length === 0
// //                                 }
// //                               >
// //                                 <SelectTrigger
// //                                   id="lga"
// //                                   className={
// //                                     errors.customerAddress?.lga
// //                                       ? "border-red-500"
// //                                       : ""
// //                                   }
// //                                 >
// //                                   <SelectValue
// //                                     placeholder={
// //                                       selectedState
// //                                         ? "Select a Local Government Area"
// //                                         : "Please select a state first"
// //                                     }
// //                                   />
// //                                 </SelectTrigger>
// //                                 <SelectContent>
// //                                   {availableLgas.map((lga) => (
// //                                     <SelectItem key={lga} value={lga}>
// //                                       {lga}
// //                                     </SelectItem>
// //                                   ))}
// //                                 </SelectContent>
// //                               </Select>
// //                             )}
// //                           />
// //                           {errors.customerAddress?.lga && (
// //                             <p className="text-sm text-red-600">
// //                               {errors.customerAddress.lga.message}
// //                             </p>
// //                           )}
// //                         </div>

// //                         <div className="space-y-2">
// //                           <Label htmlFor="directions">
// //                             Additional Directions{" "}
// //                             <span className="text-gray-500">(Optional)</span>
// //                           </Label>
// //                           <Textarea
// //                             id="directions"
// //                             {...register("customerAddress.directions", {
// //                               onChange: (e) => {
// //                                 const value = e.target.value;
// //                                 setCustomerAddress({ directions: value });
// //                               },
// //                             })}
// //                             rows={3}
// //                             className={
// //                               errors.customerAddress?.directions
// //                                 ? "border-red-500"
// //                                 : ""
// //                             }
// //                             placeholder="Additional directions to help locate your address (e.g., 'Opposite First Bank', 'Blue gate with security post', 'Third floor, Apartment 3B')"
// //                           />
// //                           {errors.customerAddress?.directions && (
// //                             <p className="text-sm text-red-600">
// //                               {errors.customerAddress.directions.message}
// //                             </p>
// //                           )}
// //                         </div>

// //                         {(isLogisticsPricingLoading ||
// //                           logisticsPricingError ||
// //                           logisticsPricingData?.data?.price !== undefined) && (
// //                           <div className="p-3 border rounded-md bg-muted/50">
// //                             <div className="flex items-center gap-2">
// //                               {logisticsPricingError && (
// //                                 <span className="text-sm text-red-600">
// //                                   Unable to calculate delivery fee - using
// //                                   standard rate
// //                                 </span>
// //                               )}
// //                               {logisticsPricingData?.data?.price !==
// //                                 undefined &&
// //                                 !isLogisticsPricingLoading && (
// //                                   <span className="text-sm text-green-600">
// //                                     Delivery fee calculated:{" "}
// //                                     {formatPrice(
// //                                       logisticsPricingData.data.price
// //                                     )}
// //                                   </span>
// //                                 )}
// //                             </div>
// //                           </div>
// //                         )}
// //                       </div>
// //                     </div>

// //                     <Separator />

// //                     <div>
// //                       <h3 className="font-medium mb-3">Payment Method</h3>

// //                       <RadioGroup
// //                         value={paymentMethod}
// //                         onValueChange={handlePaymentMethodChange}
// //                         className="space-y-3"
// //                       >
// //                         <div className="flex items-center space-x-2 p-3 border rounded-md">
// //                           <RadioGroupItem
// //                             value="online"
// //                             id="online"
// //                             className="flex-shrink-0"
// //                           />
// //                           <Label
// //                             htmlFor="online"
// //                             className="flex items-center flex-1 min-w-0"
// //                           >
// //                             <CreditCard className="h-4 w-4 mr-2 text-muted-foreground flex-shrink-0" />
// //                             <div className="min-w-0">
// //                               <span className="font-medium block">
// //                                 Pay Online
// //                               </span>
// //                               <p className="text-xs text-muted-foreground">
// //                                 Card, Bank Transfer, Mobile Money
// //                               </p>
// //                             </div>
// //                           </Label>
// //                         </div>

// //                         <div className="flex items-center space-x-2 p-3 border rounded-md">
// //                           <RadioGroupItem
// //                             value="cash"
// //                             id="cash"
// //                             className="flex-shrink-0"
// //                           />
// //                           <Label
// //                             htmlFor="cash"
// //                             className="flex items-center flex-1 min-w-0"
// //                           >
// //                             <Banknote className="h-4 w-4 mr-2 text-muted-foreground flex-shrink-0" />
// //                             <div className="min-w-0">
// //                               <span className="font-medium block">
// //                                 Pay on Delivery
// //                               </span>
// //                               <p className="text-xs text-muted-foreground">
// //                                 Pay when your orders arrive
// //                               </p>
// //                             </div>
// //                           </Label>
// //                         </div>
// //                       </RadioGroup>
// //                     </div>

// //                     <Separator />

// //                     <div>
// //                       <h3 className="font-medium mb-3">
// //                         Delivery Instructions (Optional)
// //                       </h3>
// //                       <Textarea
// //                         placeholder="Add any special instructions for delivery..."
// //                         className="resize-none"
// //                         value={checkoutData.deliveryInstructions}
// //                         onChange={(e) =>
// //                           handleDeliveryInstructionsChange(e.target.value)
// //                         }
// //                       />
// //                     </div>
// //                   </div>

// //                   <div className="mt-6">
// //                     <Button className="w-full" onClick={continueToReview}>
// //                       Continue to Review
// //                     </Button>
// //                   </div>
// //                 </CardContent>
// //               </Card>
// //             )}

// //             {currentStep === "review" && (
// //               <Card>
// //                 <CardContent className="p-4 md:p-6">
// //                   <h2 className="text-xl font-semibold mb-4">
// //                     Review Your Orders
// //                   </h2>

// //                   <div className="space-y-6">
// //                     <div>
// //                       <h3 className="font-medium mb-3">Items in Your Orders</h3>

// //                       <div className="max-h-[400px] overflow-y-auto space-y-4 pr-2">
// //                         {orderSummaries.map((order, orderIndex) => (
// //                           <div
// //                             key={orderIndex}
// //                             className="flex items-start space-x-3 p-3 border rounded-lg"
// //                           >
// //                             <div className="w-16 h-16 relative rounded-md overflow-hidden flex-shrink-0 bg-muted">
// //                               <Image
// //                                 src={order.item.image || "/placeholder.svg"}
// //                                 alt={order.item.name}
// //                                 fill
// //                                 className="object-cover"
// //                               />
// //                             </div>
// //                             <div className="flex-1 min-w-0">
// //                               <h4 className="font-medium text-sm">
// //                                 <span className="capitalize">
// //                                   {order.item.name}
// //                                 </span>
// //                                 {order.item.variationName && (
// //                                   <span className="text-muted-foreground ml-2">
// //                                     ({order.item.variationName})
// //                                   </span>
// //                                 )}
// //                               </h4>
// //                               <div className="flex justify-between mt-1">
// //                                 <span className="text-sm">
// //                                   {order.item.quantity} x{" "}
// //                                   {formatPrice(order.item.price)}
// //                                 </span>
// //                                 <span className="text-sm font-medium">
// //                                   {formatPrice(
// //                                     order.item.price * order.item.quantity
// //                                   )}
// //                                 </span>
// //                               </div>
// //                             </div>
// //                           </div>
// //                         ))}
// //                       </div>
// //                     </div>

// //                     <Separator />

// //                     <div>
// //                       <h3 className="font-medium mb-3">Delivery Information</h3>

// //                       <div className="flex items-start space-x-2">
// //                         <MapPin className="h-5 w-5 text-muted-foreground mt-0.5 flex-shrink-0" />
// //                         <div className="flex-1 min-w-0">
// //                           <p className="text-sm">
// //                             {checkoutData.customerInfo.name || "Customer Name"}
// //                             <br />
// //                             {checkoutData.customerAddress.streetAddress ||
// //                               "Street Address"}
// //                             {checkoutData.customerAddress.directions && (
// //                               <>
// //                                 <br />
// //                                 <span className="text-muted-foreground">
// //                                   Directions:{" "}
// //                                   {checkoutData.customerAddress.directions}
// //                                 </span>
// //                               </>
// //                             )}
// //                             <br />
// //                             {checkoutData.customerAddress.lga},{" "}
// //                             {checkoutData.customerAddress.state}
// //                             <br />
// //                             {checkoutData.customerInfo.phone || "Phone Number"}
// //                           </p>
// //                         </div>
// //                       </div>
// //                     </div>

// //                     <Separator />

// //                     <div>
// //                       <h3 className="font-medium mb-3">Payment Method</h3>

// //                       <div className="flex items-center">
// //                         {paymentMethod === "online" ? (
// //                           <>
// //                             <CreditCard className="h-5 w-5 text-muted-foreground mr-2 flex-shrink-0" />
// //                             <span className="text-sm">
// //                               Online Payment (Card, Bank Transfer, Mobile Money)
// //                             </span>
// //                           </>
// //                         ) : (
// //                           <>
// //                             <Banknote className="h-5 w-5 text-muted-foreground mr-2 flex-shrink-0" />
// //                             <span className="text-sm">Pay on Delivery</span>
// //                           </>
// //                         )}
// //                       </div>
// //                     </div>
// //                   </div>

// //                   <div className="mt-6 flex flex-col sm:flex-row space-y-3 sm:space-y-0 sm:space-x-3">
// //                     <Button
// //                       variant="outline"
// //                       className="flex-1"
// //                       onClick={goToPreviousStep}
// //                     >
// //                       Back
// //                     </Button>
// //                     {renderPlaceOrderButton()}
// //                   </div>
// //                 </CardContent>
// //               </Card>
// //             )}
// //           </div>

// //           <div className="lg:col-span-1">
// //             <div className="sticky top-20">
// //               <Card>
// //                 <CardContent className="p-4 md:p-6">
// //                   <h3 className="font-semibold text-lg mb-4">Order Summary</h3>

// //                   <div className="space-y-3 mb-6">
// //                     <div className="flex justify-between">
// //                       <span className="text-muted-foreground text-sm">
// //                         Subtotal
// //                       </span>
// //                       <span className="text-sm">
// //                         {formatPrice(totals.subtotal)}
// //                       </span>
// //                     </div>

// //                     <div className="flex justify-between items-center">
// //                       <span className="text-muted-foreground text-sm">
// //                         Delivery Fee
// //                         {isLogisticsPricingLoading && (
// //                           <Loader2 className="h-3 w-3 animate-spin ml-1 inline" />
// //                         )}
// //                       </span>
// //                       <span className="text-sm">
// //                         {!watchedState || !watchedLga || !watchedStreetAddress
// //                           ? "Enter address to calculate"
// //                           : deliveryFee === null
// //                           ? "Calculating..."
// //                           : deliveryFee === 0
// //                           ? "Free"
// //                           : formatPrice(deliveryFee)}
// //                       </span>
// //                     </div>

// //                     {logisticsPricingError && (
// //                       <div className="text-xs text-red-600 mt-1">
// //                         Unable to calculate delivery fee - using standard rate
// //                       </div>
// //                     )}
// //                     <Separator className="my-4" />
// //                     <div className="flex justify-between font-bold">
// //                       <span>Total</span>
// //                       <span>{formatPrice(totals.total)}</span>
// //                     </div>
// //                   </div>

// //                   <div className="space-y-4">
// //                     <div className="flex items-start space-x-2">
// //                       <p className="text-xs text-muted-foreground">
// //                         By continuing I agree to the{" "}
// //                         <a
// //                           href="/terms"
// //                           className="text-primary hover:underline"
// //                         >
// //                           Terms of Service
// //                         </a>{" "}
// //                         and{" "}
// //                         <a
// //                           href="/privacy"
// //                           className="text-primary hover:underline"
// //                         >
// //                           Privacy Policy
// //                         </a>
// //                       </p>
// //                     </div>
// //                   </div>

// //                   <div className="mt-6 text-center">
// //                     <p className="text-xs text-muted-foreground">
// //                       Need help?{" "}
// //                       <a href="/help" className="text-primary">
// //                         Contact Support
// //                       </a>
// //                     </p>
// //                   </div>
// //                 </CardContent>
// //               </Card>

// //               <Card className="mt-6">
// //                 <CardContent className="p-6">
// //                   <div className="space-y-4 text-sm">
// //                     <div className="flex items-start">
// //                       <span className="mr-2 text-primary">•</span>
// //                       <p>
// //                         Orders are typically delivered within 2-4 business days
// //                       </p>
// //                     </div>
// //                     <div className="flex items-start">
// //                       <span className="mr-2 text-primary">•</span>
// //                       <p>We accept returns within 7 days of delivery</p>
// //                     </div>
// //                     <div className="flex items-start">
// //                       <span className="mr-2 text-primary">•</span>
// //                       <p>Detailed addresses help reduce delivery costs</p>
// //                     </div>
// //                   </div>
// //                 </CardContent>
// //               </Card>
// //             </div>
// //           </div>
// //         </div>
// //       </div>
// //     </div>
// //   );
// // }












// "use client";
// import { useState, useEffect, useMemo } from "react";
// import dynamic from "next/dynamic";
// import Image from "next/image";
// import { useRouter, useSearchParams } from "next/navigation";
// import {
//   CreditCard,
//   MapPin,
//   Banknote,
//   ArrowLeft,
//   Loader2,
//   Info,
// } from "lucide-react";
// import useSWR, { mutate } from "swr";

// import { Button } from "@/components/ui/button";
// import { Card, CardContent } from "@/components/ui/card";
// import { Separator } from "@/components/ui/separator";
// import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
// import { Label } from "@/components/ui/label";
// import { Textarea } from "@/components/ui/textarea";
// import { Alert, AlertDescription } from "@/components/ui/alert";
// import { useProductStore } from "@/hooks/product-store";
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
// import { parseCheckoutUrl } from "@/lib/url-parser";

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
//   refreshInterval: 0, // Disable automatic refresh for most data
//   dedupingInterval: 5000, // Dedupe requests within 5 seconds
//   errorRetryCount: 0,
// };

// // Specific SWR options for logistics pricing (more frequent updates)
// const logisticsPricingOptions = {
//   ...swrOptions,
//   refreshInterval: 30000, // Refresh every 30 seconds for pricing
//   revalidateOnFocus: false, // Revalidate when user focuses window
//   dedupingInterval: 2000, // Shorter deduping for pricing
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
//     setPaymentMethod,
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

//   const router = useRouter();

//   // Get values from store
//   const currentStep = checkoutData.currentStep;
//   const paymentMethod = checkoutData.paymentMethod;

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
//     console.log("Customer delivery data:", data);
//     // Update store with form data
//     setCustomerInfo(data.customerInfo);
//     setCustomerAddress(data.customerAddress);
//     return data;
//   }, deliveryFormSchema);

//   const searchParams = useSearchParams();

//   const parsedUrl = useMemo(() => {
//     return parseCheckoutUrl(searchParams);
//   }, [searchParams]);

//   const { items, ref, platform: urlPlatform } = parsedUrl;

//   const platform = urlPlatform || searchParams.get("platform");
//   const { orderSummaries, updateDeliveryFee } = useProductStore();

//   // For store platform, use the first order summary or create from fetched data
//   // For non-store platform, use existing orderSummary logic
//   const orderSummary =
//     platform === "store"
//       ? orderSummaries[0]
//       : useProductStore.getState().orderSummary;

//   const cartItems =
//     platform === "store"
//       ? orderSummaries.map((summary) => summary.item)
//       : orderSummary?.items;

//   // Calculate subtotal from Zustand or fallback calculation
//   const subtotal =
//     platform === "store"
//       ? orderSummaries.reduce((sum, summary) => sum + summary.subtotal, 0)
//       : orderSummary?.subtotal ||
//         cartItems?.reduce((sum, item) => sum + item.price * item.quantity, 0);

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
//     orderSummary?.pickupLocation?.latitude &&
//     orderSummary?.pickupLocation?.longitude
//       ? `/api/logistics/pricing?state=${encodeURIComponent(
//           watchedState
//         )}&lga=${encodeURIComponent(
//           watchedLga
//         )}&streetAddress=${encodeURIComponent(
//           watchedStreetAddress
//         )}&supplierLat=${orderSummary.pickupLocation.latitude}&supplierLng=${
//           orderSummary.pickupLocation.longitude
//         }`
//       : null;

//   const {
//     data: logisticsPricingData,
//     error: logisticsPricingError,
//     isLoading: isLogisticsPricingLoading,
//   } = useSWR(logisticsPricingKey, fetcher, logisticsPricingOptions);

//   // SWR for store platform product fetching
//   const shouldFetchStoreProducts =
//     platform === "store" && items.length > 0 && ref;

//   const storeProductsKey = shouldFetchStoreProducts
//     ? items
//         .map((item) => `/api/public/products/${item.pid}?subdomain=${ref}`)
//         .join("|")
//     : null;

//   const {
//     data: storeProductsData,
//     error: storeProductsError,
//     isLoading: isStoreProductsLoading,
//   } = useSWR(
//     storeProductsKey,
//     async () => {
//       if (!shouldFetchStoreProducts) return null;

//       const productUrls = items.map(
//         (item) => `/api/public/products/${item.pid}?subdomain=${ref}`
//       );

//       const results = await Promise.allSettled(
//         productUrls.map((url) => fetcher(url))
//       );

//       const data = results.map((result) =>
//         result.status === "fulfilled" ? result.value : null
//       );

//       return data.filter(Boolean); // Remove null values
//     },
//     {
//       ...swrOptions,
//       onSuccess: (data) => {
//         if (data && data.length > 0) {
//           // Transform the fetched products into OrderProduct format
//           const orderSummaries = data.map((productData, index) => {
//             const item = items[index];
//             const product = productData.data || productData;

//             const productItem = {
//               id: product.id || item.pid,
//               name: product.name || "Product",
//               price: product.price || 0,
//               originalPrice: product.originalPrice || product.price || 0,
//               quantity: item.qty,
//               image: product.image || product.images?.[0] || "/placeholder.svg",
//               color: item.variation?.color,
//               size: item.variation?.size,
//               variationId: item.variation
//                 ? `${item.variation.color}-${item.variation.size}`
//                 : undefined,
//               variationName: item.variation
//                 ? `${item.variation.color || ""} ${
//                     item.variation.size || ""
//                   }`.trim()
//                 : undefined,
//               supplierId: product.supplierId || product.userId,
//             };

//             const subtotal = productItem.price * productItem.quantity;

//             return {
//               item: productItem,
//               subtotal,
//               total: subtotal, // Will be updated with delivery fee later
//               productId: item.pid,
//               referralId: ref,
//               platform: platform,
//               pickupLocation: product.pickupLocation || {
//                 latitude: 6.5244,
//                 longitude: 3.3792,
//               },
//               deliveryFee: 0,
//             };
//           });

//           // Update the product store with the new order summaries
//           useProductStore.getState().setOrderSummaries(orderSummaries);
//         }
//       },
//     }
//   );

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

//   // Helper function to calculate supplier amount
//   const calculateSupplierAmount = () => {
//     if (platform === "store") {
//       return orderSummaries.reduce((total, summary) => {
//         const originalPrice = summary.item.originalPrice || summary.item.price;
//         return total + originalPrice * summary.item.quantity;
//       }, 0);
//     }

//     if (!orderSummary?.items) return 0;

//     return orderSummary.items.reduce((total, item) => {
//       const originalPrice = item.originalPrice || item.price;
//       return total + originalPrice * item.quantity;
//     }, 0);
//   };

//   const formatOrderItems = () => {
//     if (platform === "store") {
//       return orderSummaries.flatMap((summary) => ({
//         productId: summary.productId,
//         quantity: summary.item.quantity,
//         ...(summary.item.variationId && {
//           variantId: summary.item.variationId,
//           variantColor: summary.item.color,
//           variantSize: summary.item.size,
//         }),
//         ...(!summary.item.variationId && {
//           productColor: summary.item.color,
//           productSize: summary.item.size,
//         }),
//       }));
//     }

//     if (!orderSummary?.items) return [];

//     return orderSummary.items.map((item) => ({
//       productId: orderSummary.productId,
//       quantity: item.quantity,
//       ...(item.variationId && {
//         variantId: item.variationId,
//         variantColor: item.color,
//         variantSize: item.size,
//       }),
//       ...(!item.variationId && {
//         productColor: item.color,
//         productSize: item.size,
//       }),
//     }));
//   };

//   const prepareOrderData = (
//     paymentMethod: string,
//     paymentReference?: string
//   ) => {
//     const supplierAmount = calculateSupplierAmount();
//     const plugAmount = subtotal! - supplierAmount;

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
//       buyerLatitude: buyerCoordinates.latitude || 6.5244,
//       buyerLongitude: buyerCoordinates.longitude || 3.3792,

//       // Supplier information
//       supplierId: orderSummary?.items?.[0]?.supplierId || "",

//       // Order details
//       paymentMethod: paymentMethod,
//       totalAmount: total,
//       deliveryFee: deliveryFee,
//       supplierAmount: supplierAmount,
//       plugAmount: plugAmount,
//       plugPrice: orderSummary?.items?.[0]?.price, // Price from useProductStore
//       supplierPrice: orderSummary?.items?.[0]?.originalPrice, // Original price from useProductStore
//       plugId: orderSummary?.referralId || "",
//       orderItems: formatOrderItems(), // This now includes color and size

//       // Payment reference for online payments
//       ...(paymentReference && { paymentReference }),
//     };

//     return orderData;
//   };

//   const placeOrder = async (
//     paymentMethod: string,
//     paymentReference?: string
//   ) => {
//     try {
//       setIsLoading(true);
//       const orderData = prepareOrderData(paymentMethod, paymentReference);

//       console.log("Placing order with data:", orderData);

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
//         useProductStore.getState().clearOrderSummaries();
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
//       useProductStore.getState().clearOrderSummaries();

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

//   // Handle platform-specific data fetching
//   useEffect(() => {
//     if (platform === "store") {
//       // For store platform, just console log the data
//       console.log("Store platform - Order Summary:", orderSummary);
//       console.log("Store platform - Cart Items:", cartItems);
//     } else {
//       // For non-store platforms, data is already fetched from Zustand
//       if (orderSummary) {
//         console.log("Non-store platform - Using Zustand data:", orderSummary);
//       }
//     }
//   }, [platform, orderSummary, cartItems]);

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
//     const validateField = async (fieldName, value) => {
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
//     mutate(
//       `/public/products/${orderSummary?.productId}${orderSummary?.referralId}`
//     );
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
//     publicKey: "pk_test_eff9334b69c4057bd0b89b293824020426f0d011",
//     text: isLoading ? "Processing..." : "Place Order",
//     onSuccess: async (reference) => {
//       try {
//         await placeOrder("online", reference.reference);
//         console.log("Payment successful:", reference);
//       } catch (error) {
//         console.error("Error placing order after successful payment:", error);
//       }
//     },
//     onClose: () => {
//       alert("Payment cancelled");
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

//   const handleCashOnDeliveryOrder = async () => {
//     try {
//       await placeOrder("cash");
//     } catch (error) {
//       console.error("Error placing cash order:", error);
//     }
//   };

//   // Handle payment method change
//   const handlePaymentMethodChange = (method: "online" | "cash") => {
//     setPaymentMethod(method);
//   };

//   // Handle delivery instructions change
//   const handleDeliveryInstructionsChange = (instructions: string) => {
//     setDeliveryInstructions(instructions);
//   };

//   const renderPlaceOrderButton = () => {
//     if (paymentMethod === "cash") {
//       return (
//         <Button className="flex-1" onClick={handleCashOnDeliveryOrder}>
//           {isLoading ? "Processing..." : "Place Order (Pay on Delivery)"}
//         </Button>
//       );
//     } else {
//       // Only render PaystackButton on client side
//       if (!isClient) {
//         return <Button className="flex-1">Loading Payment...</Button>;
//       }

//       return (
//         <PaystackButton
//           {...paystackConfig}
//           className="flex-1 bg-primary text-primary-foreground hover:bg-primary/90 h-10 px-4 py-2 rounded-md font-medium transition-colors"
//         />
//       );
//     }
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

//       {platform === "store" && isStoreProductsLoading && (
//         <div className="flex items-center justify-center p-8">
//           <Loader2 className="h-8 w-8 animate-spin" />
//           <span className="ml-2">Loading products...</span>
//         </div>
//       )}

//       {platform === "store" && storeProductsError && (
//         <Alert className="mb-4">
//           <AlertDescription>
//             Failed to load product information. Please try refreshing the page.
//           </AlertDescription>
//         </Alert>
//       )}

//       <div className="container mx-auto px-4 py-4 md:py-8 max-w-7xl">
//         <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 lg:gap-8">
//           <div className="lg:col-span-2">
//             {currentStep === "delivery" && (
//               <Card>
//                 <CardContent className="p-4 md:p-6">
//                   <h2 className="text-xl font-semibold mb-4">
//                     Delivery Information
//                   </h2>

//                   <div className="space-y-6">
//                     {/* Customer Information */}
//                     <div>
//                       <div className="flex items-center justify-between mb-3">
//                         <h3 className="font-medium">Customer Information</h3>
//                       </div>
//                       <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
//                         <div className="space-y-2">
//                           <Label htmlFor="customerName">
//                             Full Name <span className="text-red-500">*</span>
//                           </Label>
//                           <Input
//                             id="customerName"
//                             {...register("customerInfo.name", {
//                               onChange: async (e) => {
//                                 const value = e.target.value;
//                                 setCustomerInfo({ name: value });
//                                 if (value && errors.customerInfo?.name) {
//                                   const isValid = await trigger(
//                                     "customerInfo.name"
//                                   );
//                                   if (isValid) clearErrors("customerInfo.name");
//                                 }
//                               },
//                             })}
//                             placeholder="Enter your full name"
//                             className={
//                               errors.customerInfo?.name ? "border-red-500" : ""
//                             }
//                           />
//                           {errors.customerInfo?.name && (
//                             <p className="text-sm text-red-600">
//                               {errors.customerInfo.name.message}
//                             </p>
//                           )}
//                         </div>
//                         <div className="space-y-2">
//                           <Label htmlFor="customerEmail">
//                             Email Address{" "}
//                             <span className="text-red-500">*</span>
//                           </Label>
//                           <Input
//                             id="customerEmail"
//                             type="email"
//                             {...register("customerInfo.email", {
//                               onChange: async (e) => {
//                                 const value = e.target.value;
//                                 setCustomerInfo({ email: value });
//                                 if (value && errors.customerInfo?.email) {
//                                   const isValid = await trigger(
//                                     "customerInfo.email"
//                                   );
//                                   if (isValid)
//                                     clearErrors("customerInfo.email");
//                                 }
//                               },
//                             })}
//                             placeholder="Enter your email address"
//                             className={
//                               errors.customerInfo?.email ? "border-red-500" : ""
//                             }
//                           />
//                           {errors.customerInfo?.email && (
//                             <p className="text-sm text-red-600">
//                               {errors.customerInfo.email.message}
//                             </p>
//                           )}
//                         </div>
//                         <div className="space-y-2 md:col-span-2">
//                           <Label htmlFor="customerPhone">
//                             Phone Number <span className="text-red-500">*</span>
//                           </Label>
//                           <Input
//                             id="customerPhone"
//                             {...register("customerInfo.phone", {
//                               onChange: async (e) => {
//                                 const value = e.target.value;
//                                 setCustomerInfo({ phone: value });
//                                 if (value && errors.customerInfo?.phone) {
//                                   const isValid = await trigger(
//                                     "customerInfo.phone"
//                                   );
//                                   if (isValid)
//                                     clearErrors("customerInfo.phone");
//                                 }
//                               },
//                             })}
//                             placeholder="Enter your phone number"
//                             className={
//                               errors.customerInfo?.phone ? "border-red-500" : ""
//                             }
//                           />
//                           {errors.customerInfo?.phone && (
//                             <p className="text-sm text-red-600">
//                               {errors.customerInfo.phone.message}
//                             </p>
//                           )}
//                         </div>
//                       </div>
//                     </div>

//                     <Separator />

//                     {/* Delivery Address */}
//                     <div>
//                       <h3 className="font-medium mb-3">Delivery Address</h3>

//                       {/* Address Specificity Message */}
//                       <Alert className="mb-4">
//                         <Info className="h-4 w-4" />
//                         <AlertDescription>
//                           <strong>💡 Pro Tip:</strong> Providing a very specific
//                           and detailed address helps our logistics partners
//                           optimize delivery routes, which can potentially reduce
//                           your delivery costs. Include landmarks, building
//                           descriptions, and clear directions.
//                         </AlertDescription>
//                       </Alert>

//                       {/* Street Address */}
//                       <div className="space-y-4">
//                         <div className="space-y-2">
//                           <Label htmlFor="streetAddress">
//                             Street Address{" "}
//                             <span className="text-red-500">*</span>
//                           </Label>
//                           <Textarea
//                             id="streetAddress"
//                             {...register("customerAddress.streetAddress", {
//                               onChange: async (e) => {
//                                 const value = e.target.value;
//                                 setCustomerAddress({ streetAddress: value });
//                                 if (
//                                   value &&
//                                   errors.customerAddress?.streetAddress
//                                 ) {
//                                   const isValid = await trigger(
//                                     "customerAddress.streetAddress"
//                                   );
//                                   if (isValid)
//                                     clearErrors(
//                                       "customerAddress.streetAddress"
//                                     );
//                                 }
//                               },
//                             })}
//                             rows={3}
//                             className={
//                               errors.customerAddress?.streetAddress
//                                 ? "border-red-500"
//                                 : ""
//                             }
//                             placeholder="Enter your full street address including house number, street name, area, and nearby landmarks for accurate delivery"
//                           />
//                           {errors.customerAddress?.streetAddress && (
//                             <p className="text-sm text-red-600">
//                               {errors.customerAddress.streetAddress.message}
//                             </p>
//                           )}
//                         </div>

//                         {/* State Selection */}
//                         <div className="space-y-2">
//                           <Label htmlFor="state">
//                             State <span className="text-red-500">*</span>
//                           </Label>
//                           <Controller
//                             name="customerAddress.state"
//                             control={control}
//                             render={({ field }) => (
//                               <Select
//                                 value={field.value}
//                                 onValueChange={async (value) => {
//                                   field.onChange(value);
//                                   setCustomerAddress({ state: value });
//                                   if (value && errors.customerAddress?.state) {
//                                     const isValid = await trigger(
//                                       "customerAddress.state"
//                                     );
//                                     if (isValid)
//                                       clearErrors("customerAddress.state");
//                                   }
//                                 }}
//                               >
//                                 <SelectTrigger
//                                   id="state"
//                                   className={
//                                     errors.customerAddress?.state
//                                       ? "border-red-500"
//                                       : ""
//                                   }
//                                 >
//                                   <SelectValue placeholder="Select a state" />
//                                 </SelectTrigger>
//                                 <SelectContent>
//                                   {states.map((state) => (
//                                     <SelectItem key={state} value={state}>
//                                       {state}
//                                     </SelectItem>
//                                   ))}
//                                 </SelectContent>
//                               </Select>
//                             )}
//                           />
//                           {errors.customerAddress?.state && (
//                             <p className="text-sm text-red-600">
//                               {errors.customerAddress.state.message}
//                             </p>
//                           )}
//                         </div>

//                         {/* LGA Selection */}
//                         <div className="space-y-2">
//                           <Label htmlFor="lga">
//                             Local Government Area{" "}
//                             <span className="text-red-500">*</span>
//                           </Label>
//                           <Controller
//                             name="customerAddress.lga"
//                             control={control}
//                             render={({ field }) => (
//                               <Select
//                                 value={field.value}
//                                 onValueChange={async (value) => {
//                                   field.onChange(value);
//                                   setCustomerAddress({ lga: value });
//                                   if (value && errors.customerAddress?.lga) {
//                                     const isValid = await trigger(
//                                       "customerAddress.lga"
//                                     );
//                                     if (isValid)
//                                       clearErrors("customerAddress.lga");
//                                   }
//                                 }}
//                                 disabled={
//                                   !selectedState || availableLgas.length === 0
//                                 }
//                               >
//                                 <SelectTrigger
//                                   id="lga"
//                                   className={
//                                     errors.customerAddress?.lga
//                                       ? "border-red-500"
//                                       : ""
//                                   }
//                                 >
//                                   <SelectValue
//                                     placeholder={
//                                       selectedState
//                                         ? "Select a Local Government Area"
//                                         : "Please select a state first"
//                                     }
//                                   />
//                                 </SelectTrigger>
//                                 <SelectContent>
//                                   {availableLgas.map((lga) => (
//                                     <SelectItem key={lga} value={lga}>
//                                       {lga}
//                                     </SelectItem>
//                                   ))}
//                                 </SelectContent>
//                               </Select>
//                             )}
//                           />
//                           {errors.customerAddress?.lga && (
//                             <p className="text-sm text-red-600">
//                               {errors.customerAddress.lga.message}
//                             </p>
//                           )}
//                         </div>

//                         {/* Directions */}
//                         <div className="space-y-2">
//                           <Label htmlFor="directions">
//                             Additional Directions{" "}
//                             <span className="text-gray-500">(Optional)</span>
//                           </Label>
//                           <Textarea
//                             id="directions"
//                             {...register("customerAddress.directions", {
//                               onChange: (e) => {
//                                 const value = e.target.value;
//                                 setCustomerAddress({ directions: value });
//                               },
//                             })}
//                             rows={3}
//                             className={
//                               errors.customerAddress?.directions
//                                 ? "border-red-500"
//                                 : ""
//                             }
//                             placeholder="Additional directions to help locate your address (e.g., 'Opposite First Bank', 'Blue gate with security post', 'Third floor, Apartment 3B')"
//                           />
//                           {errors.customerAddress?.directions && (
//                             <p className="text-sm text-red-600">
//                               {errors.customerAddress.directions.message}
//                             </p>
//                           )}
//                         </div>

//                         {/* Delivery Pricing Status */}
//                         {(isLogisticsPricingLoading ||
//                           logisticsPricingError ||
//                           logisticsPricingData?.data?.price !== undefined) && (
//                           <div className="p-3 border rounded-md bg-muted/50">
//                             <div className="flex items-center gap-2">
//                               {logisticsPricingError && (
//                                 <span className="text-sm text-red-600">
//                                   Unable to calculate delivery fee - using
//                                   standard rate
//                                 </span>
//                               )}
//                               {logisticsPricingData?.data?.price !==
//                                 undefined &&
//                                 !isLogisticsPricingLoading && (
//                                   <span className="text-sm text-green-600">
//                                     Delivery fee calculated:{" "}
//                                     {formatPrice(
//                                       logisticsPricingData.data.price
//                                     )}
//                                   </span>
//                                 )}
//                             </div>
//                           </div>
//                         )}
//                       </div>
//                     </div>

//                     <Separator />

//                     <div>
//                       <h3 className="font-medium mb-3">Payment Method</h3>

//                       <RadioGroup
//                         value={paymentMethod}
//                         onValueChange={handlePaymentMethodChange}
//                         className="space-y-3"
//                       >
//                         <div className="flex items-center space-x-2 p-3 border rounded-md">
//                           <RadioGroupItem
//                             value="online"
//                             id="online"
//                             className="flex-shrink-0"
//                           />
//                           <Label
//                             htmlFor="online"
//                             className="flex items-center flex-1 min-w-0"
//                           >
//                             <CreditCard className="h-4 w-4 mr-2 text-muted-foreground flex-shrink-0" />
//                             <div className="min-w-0">
//                               <span className="font-medium block">
//                                 Pay Online
//                               </span>
//                               <p className="text-xs text-muted-foreground">
//                                 Card, Bank Transfer, Mobile Money
//                               </p>
//                             </div>
//                           </Label>
//                         </div>

//                         <div className="flex items-center space-x-2 p-3 border rounded-md">
//                           <RadioGroupItem
//                             value="cash"
//                             id="cash"
//                             className="flex-shrink-0"
//                           />
//                           <Label
//                             htmlFor="cash"
//                             className="flex items-center flex-1 min-w-0"
//                           >
//                             <Banknote className="h-4 w-4 mr-2 text-muted-foreground flex-shrink-0" />
//                             <div className="min-w-0">
//                               <span className="font-medium block">
//                                 Pay on Delivery
//                               </span>
//                               <p className="text-xs text-muted-foreground">
//                                 Pay when your order arrives
//                               </p>
//                             </div>
//                           </Label>
//                         </div>
//                       </RadioGroup>
//                     </div>

//                     <Separator />

//                     <div>
//                       <h3 className="font-medium mb-3">
//                         Delivery Instructions (Optional)
//                       </h3>
//                       <Textarea
//                         placeholder="Add any special instructions for delivery..."
//                         className="resize-none"
//                         value={checkoutData.deliveryInstructions}
//                         onChange={(e) =>
//                           handleDeliveryInstructionsChange(e.target.value)
//                         }
//                       />
//                     </div>
//                   </div>

//                   <div className="mt-6">
//                     <Button className="w-full" onClick={continueToReview}>
//                       Continue to Review
//                     </Button>
//                   </div>
//                 </CardContent>
//               </Card>
//             )}

//             {currentStep === "review" && (
//               <Card>
//                 <CardContent className="p-4 md:p-6">
//                   <h2 className="text-xl font-semibold mb-4">
//                     Review Your Order
//                   </h2>

//                   <div className="space-y-6">
//                     <div>
//                       <h3 className="font-medium mb-3">Items in Your Order</h3>

//                       <div className="space-y-4">
//                         {cartItems?.map((item) => (
//                           <div
//                             key={item.id}
//                             className="flex items-start space-x-3"
//                           >
//                             <div className="w-16 h-16 relative rounded-md overflow-hidden flex-shrink-0 bg-muted">
//                               <Image
//                                 src={item.image || "/placeholder.svg"}
//                                 alt={item.name}
//                                 fill
//                                 className="object-cover"
//                               />
//                             </div>
//                             <div className="flex-1 min-w-0">
//                               <h4 className="font-medium text-sm">
//                                 <span className="capitalize">{item.name}</span>
//                                 {item.variationName && (
//                                   <span className="text-muted-foreground ml-2">
//                                     ({item.variationName})
//                                   </span>
//                                 )}
//                               </h4>
//                               <div className="flex justify-between mt-1">
//                                 <span className="text-sm">
//                                   {item.quantity} x {formatPrice(item.price)}
//                                 </span>
//                                 <span className="text-sm font-medium">
//                                   {formatPrice(item.price * item.quantity)}
//                                 </span>
//                               </div>
//                             </div>
//                           </div>
//                         ))}
//                       </div>
//                     </div>

//                     <Separator />

//                     <div>
//                       <h3 className="font-medium mb-3">Delivery Information</h3>

//                       <div className="flex items-start space-x-2">
//                         <MapPin className="h-5 w-5 text-muted-foreground mt-0.5 flex-shrink-0" />
//                         <div className="flex-1 min-w-0">
//                           <p className="text-sm">
//                             {checkoutData.customerInfo.name || "Customer Name"}
//                             <br />
//                             {checkoutData.customerAddress.streetAddress ||
//                               "Street Address"}
//                             {checkoutData.customerAddress.directions && (
//                               <>
//                                 <br />
//                                 <span className="text-muted-foreground">
//                                   Directions:{" "}
//                                   {checkoutData.customerAddress.directions}
//                                 </span>
//                               </>
//                             )}
//                             <br />
//                             {checkoutData.customerAddress.lga},{" "}
//                             {checkoutData.customerAddress.state}
//                             <br />
//                             {checkoutData.customerInfo.phone || "Phone Number"}
//                           </p>
//                         </div>
//                       </div>
//                     </div>

//                     <Separator />

//                     <div>
//                       <h3 className="font-medium mb-3">Payment Method</h3>

//                       <div className="flex items-center">
//                         {paymentMethod === "online" ? (
//                           <>
//                             <CreditCard className="h-5 w-5 text-muted-foreground mr-2 flex-shrink-0" />
//                             <span className="text-sm">
//                               Online Payment (Card, Bank Transfer, Mobile Money)
//                             </span>
//                           </>
//                         ) : (
//                           <>
//                             <Banknote className="h-5 w-5 text-muted-foreground mr-2 flex-shrink-0" />
//                             <span className="text-sm">Pay on Delivery</span>
//                           </>
//                         )}
//                       </div>
//                     </div>
//                   </div>

//                   <div className="mt-6 flex flex-col sm:flex-row space-y-3 sm:space-y-0 sm:space-x-3">
//                     <Button
//                       variant="outline"
//                       className="flex-1"
//                       onClick={goToPreviousStep}
//                     >
//                       Back
//                     </Button>
//                     {renderPlaceOrderButton()}
//                   </div>
//                 </CardContent>
//               </Card>
//             )}
//           </div>

//           <div className="lg:col-span-1">
//             <div className="sticky top-20">
//               <Card>
//                 <CardContent className="p-4 md:p-6">
//                   <h3 className="font-semibold text-lg mb-4">Order Summary</h3>

//                   <div className="space-y-3 mb-6">
//                     <div className="flex justify-between">
//                       <span className="text-muted-foreground text-sm">
//                         Subtotal ({cartItems?.length} items)
//                       </span>
//                       <span className="text-sm">{formatPrice(subtotal!)}</span>
//                     </div>

//                     <div className="flex justify-between items-center">
//                       <span className="text-muted-foreground text-sm">
//                         Delivery Fee
//                         {isLogisticsPricingLoading && (
//                           <Loader2 className="h-3 w-3 animate-spin ml-1 inline" />
//                         )}
//                       </span>
//                       <span className="text-sm">
//                         {!watchedState || !watchedLga || !watchedStreetAddress
//                           ? "Enter address to calculate"
//                           : deliveryFee === null
//                           ? "Calculating..."
//                           : deliveryFee === 0
//                           ? "Free"
//                           : formatPrice(deliveryFee)}
//                       </span>
//                     </div>

//                     {logisticsPricingError && (
//                       <div className="text-xs text-red-600 mt-1">
//                         Unable to calculate delivery fee - using standard rate
//                       </div>
//                     )}
//                     <Separator className="my-4" />
//                     <div className="flex justify-between font-bold">
//                       <span>Total</span>
//                       <span>{formatPrice(total)}</span>
//                     </div>
//                   </div>

//                   <div className="space-y-4">
//                     <div className="flex items-start space-x-2">
//                       <p className="text-xs text-muted-foreground">
//                         By continuing I agree to the{" "}
//                         <a
//                           href="/terms"
//                           className="text-primary hover:underline"
//                         >
//                           Terms of Service
//                         </a>{" "}
//                         and{" "}
//                         <a
//                           href="/privacy"
//                           className="text-primary hover:underline"
//                         >
//                           Privacy Policy
//                         </a>
//                       </p>
//                     </div>
//                   </div>

//                   <div className="mt-6 text-center">
//                     <p className="text-xs text-muted-foreground">
//                       Need help?{" "}
//                       <a href="/help" className="text-primary">
//                         Contact Support
//                       </a>
//                     </p>
//                   </div>
//                 </CardContent>
//               </Card>

//               {/* Help Section */}
//               <Card className="mt-6">
//                 <CardContent className="p-6">
//                   <div className="space-y-4 text-sm">
//                     <div className="flex items-start">
//                       <span className="mr-2 text-primary">•</span>
//                       <p>
//                         Orders are typically delivered within 2-4 business days
//                       </p>
//                     </div>
//                     <div className="flex items-start">
//                       <span className="mr-2 text-primary">•</span>
//                       <p>We accept returns within 7 days of delivery</p>
//                     </div>

//                     <div className="flex items-start">
//                       <span className="mr-2 text-primary">•</span>
//                       <p>Detailed addresses help reduce delivery costs</p>
//                     </div>
//                   </div>
//                 </CardContent>
//               </Card>
//             </div>
//           </div>
//         </div>
//       </div>
//     </div>
//   );
// }






"use client";
import { useState, useEffect, useMemo } from "react";
import dynamic from "next/dynamic";
import Image from "next/image";
import { useRouter, useSearchParams } from "next/navigation";
import {
  CreditCard,
  MapPin,
  Banknote,
  ArrowLeft,
  Loader2,
  Info,
} from "lucide-react";
import useSWR, { mutate } from "swr";

import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
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
import { deliveryFormSchema } from "@/zod/schema";
import { useCheckoutStore } from "@/hooks/checkout-store";
import { errorToast, successToast } from "@/components/ui/use-toast-advanced";
import { getVariationDisplayName, parseCheckoutUrl } from "@/lib/url-parser";
import { useProductFetching } from "@/hooks/use-product-fetcher";
import { useProductStore } from "@/hooks/product-store";

// Dynamic import of PaystackButton to prevent SSR issues
const PaystackButton = dynamic(
  () => import("react-paystack").then((mod) => mod.PaystackButton),
  {
    ssr: false,
    loading: () => <Button className="flex-1">Loading Payment...</Button>,
  }
);

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
  refreshInterval: 0, // Disable automatic refresh for most data
  dedupingInterval: 5000, // Dedupe requests within 5 seconds
  errorRetryCount: 0,
};

// Specific SWR options for logistics pricing (more frequent updates)
const logisticsPricingOptions = {
  ...swrOptions,
  refreshInterval: 30000, // Refresh every 30 seconds for pricing
  revalidateOnFocus: false, // Revalidate when user focuses window
  dedupingInterval: 2000, // Shorter deduping for pricing
};

// SWR options for buyer info (cached longer)
const buyerInfoOptions = {
  ...swrOptions,
  dedupingInterval: 10000, // Cache buyer info longer
  refreshInterval: 0, // Don't auto-refresh buyer info
};

export default function CheckoutPage() {
  const [buyerCoordinates, setBuyerCoordinates] = useState<{
    latitude: number | null;
    longitude: number | null;
  }>({ latitude: null, longitude: null });

  // Replace local state with Zustand store
  const {
    checkoutData,
    setCustomerInfo,
    setCustomerAddress,
    setPaymentMethod,
    setDeliveryInstructions,
    setCurrentStep,
    clearCheckoutData,
  } = useCheckoutStore();

  // Local state for UI-specific needs
  const [isClient, setIsClient] = useState(false);
  const [selectedState, setSelectedState] = useState<string>("");
  const [availableLgas, setAvailableLgas] = useState<string[]>([]);
  const [states, setStates] = useState<string[]>([]);
  const [isLoading, setIsLoading] = useState(false);

  const router = useRouter();

  // Get values from store
  const currentStep = checkoutData.currentStep;
  const paymentMethod = checkoutData.paymentMethod;

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
    console.log("Customer delivery data:", data);
    // Update store with form data
    setCustomerInfo(data.customerInfo);
    setCustomerAddress(data.customerAddress);
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

  // Calculate subtotal from orderSummaries or fallback
  const subtotal = useMemo(() => {
    if (platform === "store") {
      return orderSummaries.reduce((sum, summary) => sum + summary.subtotal, 0);
    }
    // Fallback for non-store platforms
    return (
      orderSummaries?.reduce(
        (sum, summary) => sum + summary.item.price * summary.item.quantity,
        0
      ) || 0
    );
  }, [platform, orderSummaries]);

  // Watch address fields for SWR key generation
  const watchedState = watch("customerAddress.state");
  const watchedLga = watch("customerAddress.lga");
  const watchedStreetAddress = watch("customerAddress.streetAddress");
  const watchedName = watch("customerInfo.name");
  const watchedEmail = watch("customerInfo.email");
  const watchedPhone = watch("customerInfo.phone");

  // SWR for buyer info fetching
  const buyerInfoKey =
    watchedName &&
    watchedEmail &&
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

  // SWR for logistics pricing
  const logisticsPricingKey =
    watchedState &&
    watchedLga &&
    watchedStreetAddress &&
    orderSummaries.length > 0 &&
    orderSummaries[0]?.pickupLocation?.latitude &&
    orderSummaries[0]?.pickupLocation?.longitude
      ? `/api/logistics/pricing?state=${encodeURIComponent(
          watchedState
        )}&lga=${encodeURIComponent(
          watchedLga
        )}&streetAddress=${encodeURIComponent(
          watchedStreetAddress
        )}&supplierLat=${
          orderSummaries[0].pickupLocation.latitude
        }&supplierLng=${orderSummaries[0].pickupLocation.longitude}`
      : null;

  const {
    data: logisticsPricingData,
    error: logisticsPricingError,
    isLoading: isLogisticsPricingLoading,
  } = useSWR(logisticsPricingKey, fetcher, logisticsPricingOptions);

  // Effect to handle buyer info auto-fill
  useEffect(() => {
    if (buyerInfoData?.data && !buyerInfoError) {
      const data = buyerInfoData.data;

      if (data.streetAddress && data.state && data.lga) {
        // Auto-fill the address fields
        setValue("customerAddress.streetAddress", data.streetAddress);
        setValue("customerAddress.state", data.state);
        setValue("customerAddress.lga", data.lga);

        if (data.directions) {
          setValue("customerAddress.directions", data.directions);
        }

        // Update the store as well
        setCustomerAddress({
          streetAddress: data.streetAddress,
          state: data.state,
          lga: data.lga,
          directions: data.directions || "",
        });

        // Set selected state to trigger LGA loading
        setSelectedState(data.state);

        // Load LGAs for the state
        const lgas = getLgasForState(data.state);
        setAvailableLgas(lgas);
      }
    }
  }, [buyerInfoData, buyerInfoError, setValue, setCustomerAddress]);

  // Effect to handle logistics pricing updates
  useEffect(() => {
    if (logisticsPricingData?.data && !logisticsPricingError) {
      const price = logisticsPricingData.data.price;

      if (price !== undefined) {
        // Update the store with the fetched delivery fee
        updateDeliveryFee(price);

        // Store buyer coordinates if available
        if (
          logisticsPricingData.data.buyerLatitude &&
          logisticsPricingData.data.buyerLongitude
        ) {
          setBuyerCoordinates({
            latitude: logisticsPricingData.data.buyerLatitude,
            longitude: logisticsPricingData.data.buyerLongitude,
          });
        } else {
          setBuyerCoordinates({
            latitude: 6.5244 + (Math.random() - 0.5) * 0.1,
            longitude: 3.3792 + (Math.random() - 0.5) * 0.1,
          });
        }
      }
    } else if (logisticsPricingError) {
      console.error("Logistics pricing error:", logisticsPricingError);
      // Update store with fallback fee
      updateDeliveryFee(1500);

      setBuyerCoordinates({
        latitude: 6.5244 + (Math.random() - 0.5) * 0.1,
        longitude: 3.3792 + (Math.random() - 0.5) * 0.1,
      });
    }
  }, [logisticsPricingData, logisticsPricingError, updateDeliveryFee]);

  // Helper function to calculate supplier amount
  const calculateSupplierAmount = () => {
    if (!orderSummaries.length) return 0;

    return orderSummaries.reduce((total, summary) => {
      const originalPrice = summary.item.originalPrice || summary.item.price;
      return total + originalPrice * summary.item.quantity;
    }, 0);
  };

  const formatOrderItems = () => {
    if (!orderSummaries.length) return [];

    return orderSummaries.flatMap((summary) => ({
      productId: summary.productId,
      quantity: summary.item.quantity,

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
    }));
  };

  const prepareOrderData = (
    paymentMethod: string,
    paymentReference?: string
  ) => {
    const supplierAmount = calculateSupplierAmount();
    const plugAmount = subtotal! - supplierAmount;

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
      buyerLatitude: buyerCoordinates.latitude || 6.5244,
      buyerLongitude: buyerCoordinates.longitude || 3.3792,

      // Supplier information
      supplierId: orderSummaries[0]?.item?.supplierId || "",

      // Order details
      paymentMethod: paymentMethod,
      totalAmount: total,
      deliveryFee: deliveryFee,
      supplierAmount: supplierAmount,
      plugAmount: plugAmount,
      plugPrice: orderSummaries[0]?.item?.price, // Price from useProductStore
      supplierPrice: orderSummaries[0]?.item?.originalPrice, // Original price from useProductStore
      plugId: orderSummaries[0]?.referralId || "",
      orderItems: formatOrderItems(),

      // Payment reference for online payments
      ...(paymentReference && { paymentReference }),
    };

    return orderData;
  };

  const placeOrder = async (
    paymentMethod: string,
    paymentReference?: string
  ) => {
    try {
      setIsLoading(true);
      const orderData = prepareOrderData(paymentMethod, paymentReference);

      console.log("Placing order with data:", orderData);

      const response = await fetch("/api/orders/place-order", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(orderData),
      });

      if (!response.ok) {
        const errorData = await response.json();
        errorToast(errorData.error || "Failed to place order");

        clearCheckoutData();
        clearOrderSummaries();
        router.replace("/order-error");
        return;
      }

      const result = await response.json();
      successToast(result.message || "Order placed successfully");

      // Store order success data for thank you page
      if (result.data) {
        sessionStorage.setItem("orderSuccess", JSON.stringify(result.data));
      }

      // Clear all checkout data and order summary
      clearCheckoutData();
      clearOrderSummaries();

      // Navigate to thank you page
      router.replace("/thank-you");

      return result;
    } catch (error) {
      console.error("Error placing order:", error);
      errorToast("An error occurred while placing the order");
    } finally {
      setIsLoading(false);
    }
  };

  const handleBackNavigation = () => {
    if (platform !== "store") {
      // Navigate back to referring page
      router.back();
    }
  };

  // Effect to transform fetched products into orderSummaries when platform is "store"
  useEffect(() => {
    if (platform === "store" && productsData.length > 0 && !isProductsLoading) {
      const transformedOrderSummaries = productsData
        .filter(({ data, error }) => data && !error)
        .map(({ item, data }) => {
          const product = data.data || data; // Handle different API response structures

          // Create ProductItem from fetched data
          const productItem = {
            id: product.id || item.pid,
            name: product.name || product.title || "Unknown Product",
            price: product.price || 0,
            originalPrice: product.originalPrice || product.price || 0,
            quantity: item.qty,
            image: product.image || product.images?.[0] || "/placeholder.svg",
            color: item.variation
              ? product.variations?.find((v) => v.id === item.variation)?.color
              : undefined,
            size: item.variation
              ? product.variations?.find((v) => v.id === item.variation)?.size
              : undefined,
            variationId: item.variation,
            variationName: item.variation
              ? getVariationDisplayName(
                  product.variations?.find((v) => v.id === item.variation)
                )
              : undefined,
            supplierId: product.supplierId || product.userId,
          };

          // Calculate subtotal and total
          const subtotal = productItem.price * productItem.quantity;
          const defaultDeliveryFee = 0;
          const total = subtotal + defaultDeliveryFee;

          return {
            item: productItem,
            subtotal,
            total,
            productId: item.pid,
            referralId: ref,
            platform: platform,
            pickupLocation: product.pickupLocation
              ? {
                  latitude: product.pickupLocation.latitude,
                  longitude: product.pickupLocation.longitude,
                }
              : undefined,
            deliveryFee: defaultDeliveryFee,
          };
        });

      // Update the store with transformed data
      if (transformedOrderSummaries.length > 0) {
        setOrderSummaries(transformedOrderSummaries);
      }
    }
  }, [platform, productsData, isProductsLoading, ref, setOrderSummaries]);

  // Effect to log data for debugging
  useEffect(() => {
    if (platform === "store") {
      console.log("Store platform - Parsed URL:", parsedUrl);
      console.log("Store platform - Products Data:", productsData);
      console.log("Store platform - Order Summaries:", orderSummaries);
      console.log("Store platform - Cart Items:", cartItems);

      if (productFetchError) {
        console.error(
          "Store platform - Product fetch error:",
          productFetchError
        );
      }
    } else {
      // For non-store platforms, data is already fetched from Zustand
      if (orderSummaries) {
        console.log("Non-store platform - Using Zustand data:", orderSummaries);
      }
    }
  }, [
    platform,
    parsedUrl,
    productsData,
    orderSummaries,
    cartItems,
    productFetchError,
  ]);

  // Calculate delivery fee based on method and logistics pricing
  const getDeliveryFee = () => {
    // Check if we have the required data to fetch logistics pricing
    const hasRequiredAddressData =
      watchedState && watchedLga && watchedStreetAddress;

    // If we don't have required address data, don't show any delivery fee yet
    if (!hasRequiredAddressData) {
      return null;
    }

    // If we're currently loading logistics pricing, don't show fee yet
    if (isLogisticsPricingLoading) {
      return null;
    }

    // If logistics pricing was successfully fetched, use that price
    if (
      logisticsPricingData?.data?.price !== undefined &&
      !logisticsPricingError
    ) {
      return logisticsPricingData.data.price;
    }

    // If there was an error fetching logistics pricing, fallback to 1500
    if (logisticsPricingError) {
      return 1500;
    }

    // Default case - should not reach here, but fallback to null
    return null;
  };
  const deliveryFee = getDeliveryFee();
  const total = subtotal + (deliveryFee || 0);

  // Initialize states and form data
  useEffect(() => {
    setIsClient(true);

    // Initialize Nigerian states
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

    // Initialize form with stored data
    setValue("customerInfo.name", checkoutData.customerInfo.name || "");
    setValue("customerInfo.email", checkoutData.customerInfo.email || "");
    setValue("customerInfo.phone", checkoutData.customerInfo.phone || "");
    setValue(
      "customerAddress.streetAddress",
      checkoutData.customerAddress.streetAddress || ""
    );
    setValue("customerAddress.state", checkoutData.customerAddress.state || "");
    setValue("customerAddress.lga", checkoutData.customerAddress.lga || "");
    setValue(
      "customerAddress.directions",
      checkoutData.customerAddress.directions || ""
    );
  }, [setValue, checkoutData]);

  // Watch state changes to update LGAs
  useEffect(() => {
    if (watchedState && watchedState !== selectedState) {
      setSelectedState(watchedState);
      const lgas = getLgasForState(watchedState);
      setAvailableLgas(lgas);

      // Update the state in the store
      setCustomerAddress({ state: watchedState });
    }
  }, [watchedState, selectedState, setValue, setCustomerAddress]);

  // Watch form values for real-time validation and store updates
  const watchedCustomerInfo = watch("customerInfo");
  const watchedCustomerAddress = watch("customerAddress");

  useEffect(() => {
    if (watchedCustomerInfo) {
      setCustomerInfo(watchedCustomerInfo);
    }
  }, [watchedCustomerInfo, setCustomerInfo]);

  useEffect(() => {
    if (watchedCustomerAddress) {
      setCustomerAddress(watchedCustomerAddress);
    }
  }, [watchedCustomerAddress, setCustomerAddress]);

  // Clear errors when fields become valid
  useEffect(() => {
    const validateField = async (fieldName, value) => {
      if (value && value.trim() !== "") {
        const isFieldValid = await trigger(fieldName);
        if (isFieldValid) {
          clearErrors(fieldName);
        }
      }
    };

    // Validate customer info fields
    if (watchedCustomerInfo?.name) {
      validateField("customerInfo.name", watchedCustomerInfo.name);
    }
    if (watchedCustomerInfo?.email) {
      validateField("customerInfo.email", watchedCustomerInfo.email);
    }
    if (watchedCustomerInfo?.phone) {
      validateField("customerInfo.phone", watchedCustomerInfo.phone);
    }

    // Validate address fields
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

  const continueToReview = () => {
    goToNextStep();
    if (orderSummaries.length > 0) {
      mutate(
        `/public/products/${orderSummaries[0].productId}${orderSummaries[0].referralId}`
      );
    }
  };

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
          value: cartItems
            ?.map((item) => `${item.name} x${item.quantity}`)
            .join(", "),
        },
      ],
    },
    publicKey: "pk_test_eff9334b69c4057bd0b89b293824020426f0d011",
    text: isLoading ? "Processing..." : "Place Order",
    onSuccess: async (reference) => {
      try {
        await placeOrder("online", reference.reference);
        console.log("Payment successful:", reference);
      } catch (error) {
        console.error("Error placing order after successful payment:", error);
      }
    },
    onClose: () => {
      alert("Payment cancelled");
    },
  };

  const formatPrice = (price?: string | number) => {
    return `₦${price?.toLocaleString()}`;
  };

  const goToNextStep = async () => {
    if (currentStep === "delivery") {
      // Trigger validation for all fields
      const isFormValid = await trigger();

      if (isFormValid) {
        setCurrentStep("review");
      } else {
        // Optionally scroll to the first error
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

  const handleCashOnDeliveryOrder = async () => {
    try {
      await placeOrder("cash");
    } catch (error) {
      console.error("Error placing cash order:", error);
    }
  };

  // Handle payment method change
  const handlePaymentMethodChange = (method: "online" | "cash") => {
    setPaymentMethod(method);
  };

  // Handle delivery instructions change
  const handleDeliveryInstructionsChange = (instructions: string) => {
    setDeliveryInstructions(instructions);
  };

  const renderPlaceOrderButton = () => {
    if (paymentMethod === "cash") {
      return (
        <Button className="flex-1" onClick={handleCashOnDeliveryOrder}>
          {isLoading ? "Processing..." : "Place Order (Pay on Delivery)"}
        </Button>
      );
    } else {
      // Only render PaystackButton on client side
      if (!isClient) {
        return <Button className="flex-1">Loading Payment...</Button>;
      }

      return (
        <PaystackButton
          {...paystackConfig}
          className="flex-1 bg-primary text-primary-foreground hover:bg-primary/90 h-10 px-4 py-2 rounded-md font-medium transition-colors"
        />
      );
    }
  };

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

                        {/* Address Specificity Message */}
                        <Alert className="mb-4">
                          <Info className="h-4 w-4" />
                          <AlertDescription>
                            <strong>💡 Pro Tip:</strong> Providing a very
                            specific and detailed address helps our logistics
                            partners optimize delivery routes, which can
                            potentially reduce your delivery costs. Include
                            landmarks, building descriptions, and clear
                            directions.
                          </AlertDescription>
                        </Alert>

                        {/* Street Address */}
                        <div className="space-y-4">
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
                                  setCustomerAddress({ streetAddress: value });
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

                          {/* State Selection */}
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

                          {/* Directions */}
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
                                  setCustomerAddress({ directions: value });
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

                        <RadioGroup
                          value={paymentMethod}
                          onValueChange={handlePaymentMethodChange}
                          className="space-y-3"
                        >
                          <div className="flex items-center space-x-2 p-3 border rounded-md">
                            <RadioGroupItem
                              value="online"
                              id="online"
                              className="flex-shrink-0"
                            />
                            <Label
                              htmlFor="online"
                              className="flex items-center flex-1 min-w-0"
                            >
                              <CreditCard className="h-4 w-4 mr-2 text-muted-foreground flex-shrink-0" />
                              <div className="min-w-0">
                                <span className="font-medium block">
                                  Pay Online
                                </span>
                                <p className="text-xs text-muted-foreground">
                                  Card, Bank Transfer, Mobile Money
                                </p>
                              </div>
                            </Label>
                          </div>

                          <div className="flex items-center space-x-2 p-3 border rounded-md">
                            <RadioGroupItem
                              value="cash"
                              id="cash"
                              className="flex-shrink-0"
                            />
                            <Label
                              htmlFor="cash"
                              className="flex items-center flex-1 min-w-0"
                            >
                              <Banknote className="h-4 w-4 mr-2 text-muted-foreground flex-shrink-0" />
                              <div className="min-w-0">
                                <span className="font-medium block">
                                  Pay on Delivery
                                </span>
                                <p className="text-xs text-muted-foreground">
                                  Pay when your order arrives
                                </p>
                              </div>
                            </Label>
                          </div>
                        </RadioGroup>
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

                        <div className="space-y-4">
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
                              {checkoutData.customerAddress.directions && (
                                <>
                                  <br />
                                  <span className="text-muted-foreground">
                                    Directions:{" "}
                                    {checkoutData.customerAddress.directions}
                                  </span>
                                </>
                              )}
                              <br />
                              {checkoutData.customerAddress.lga},{" "}
                              {checkoutData.customerAddress.state}
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
                          {paymentMethod === "online" ? (
                            <>
                              <CreditCard className="h-5 w-5 text-muted-foreground mr-2 flex-shrink-0" />
                              <span className="text-sm">
                                Online Payment (Card, Bank Transfer, Mobile
                                Money)
                              </span>
                            </>
                          ) : (
                            <>
                              <Banknote className="h-5 w-5 text-muted-foreground mr-2 flex-shrink-0" />
                              <span className="text-sm">Pay on Delivery</span>
                            </>
                          )}
                        </div>
                      </div>
                    </div>

                    <div className="mt-6 flex flex-col sm:flex-row space-y-3 sm:space-y-0 sm:space-x-3">
                      <Button
                        variant="outline"
                        className="flex-1"
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
                          Subtotal ({cartItems?.length} items)
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
                          {!watchedState || !watchedLga || !watchedStreetAddress
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
                          Orders are typically delivered within 2-4 business
                          days
                        </p>
                      </div>
                      <div className="flex items-start">
                        <span className="mr-2 text-primary">•</span>
                        <p>We accept returns within 7 days of delivery</p>
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
      )}{" "}
      {/* End of conditional rendering */}
    </div>
  );
}
