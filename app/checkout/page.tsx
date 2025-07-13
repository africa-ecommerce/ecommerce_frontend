

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
import { errorToast, successToast, toast } from "@/components/ui/use-toast-advanced";
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
  const [showCancelledModal, setShowCancelledModal] = useState(false);

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
        )}`
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
      paymentMethod: paymentMethod,
      totalAmount: total,
      deliveryFee: deliveryFee,
      platform: orderSummaries[0]?.platform || platform,
      subdomain: orderSummaries[0].platform === "store" && orderSummaries[0].referralId || "",
      plugId: orderSummaries[0]?.platform !== "store" && orderSummaries[0]?.referralId || "",
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
            productId: product.originalId,
            quantity: item.qty,
            image: product.image || product.images?.[0] || "/placeholder.svg",
            color: item.variation
              ? product.variations?.find((v: any) => v.id === item.variation)?.color
              : undefined,
            size: item.variation
              ? product.variations?.find((v: any) => v.id === item.variation)?.size
              : undefined,
            variationId: item.variation,
            variationName: item.variation
              ? getVariationDisplayName(
                  product.variations?.find((v: any) => v.id === item.variation)
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
    const validateField = async (fieldName: any, value: any) => {
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
      orderSummaries.forEach((orderSummary) => {
        mutate(
          `/public/products/${orderSummary.item.id}${orderSummary.referralId}`
        );
      });
    }
  };


  const showPaymentCancelledModal = () => {
    // You could use a toast library or custom modal
    setShowCancelledModal(true)
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
      } catch (error) {
        console.error("Error placing order after successful payment:", error);
      }
    },
    onClose: () => {
      showPaymentCancelledModal();
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
                        <p>We accept returns within 3 days of delivery</p>
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


  <AlertDialog open={showCancelledModal} onOpenChange={setShowCancelledModal}>
    <AlertDialogContent>
      <AlertDialogHeader>
        <AlertDialogTitle>Don't miss out!</AlertDialogTitle>
        <AlertDialogDescription>
          Your items are still waiting for you. Complete your purchase now
        </AlertDialogDescription>
      </AlertDialogHeader>
      <AlertDialogFooter>
        <AlertDialogCancel>Maybe Later</AlertDialogCancel>
        <AlertDialogAction onClick={() => {
          setShowCancelledModal(false)
          // Add your place order logic here
        }}>
          {renderPlaceOrderButton()}
        </AlertDialogAction>
      </AlertDialogFooter>
    </AlertDialogContent>
  </AlertDialog>


    </div>
  );
}
