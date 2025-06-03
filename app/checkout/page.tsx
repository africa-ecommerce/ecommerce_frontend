"use client";
import { useState, useEffect } from "react";
import dynamic from "next/dynamic";
import Image from "next/image";
import { useRouter, useSearchParams } from "next/navigation";
import {
  CreditCard,
  Truck,
  MapPin,
  Banknote,
  ArrowLeft,
  Loader2,
} from "lucide-react";

import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { useProductStore } from "@/hooks/product-store";
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

// Dynamic import of PaystackButton to prevent SSR issues
const PaystackButton = dynamic(
  () => import("react-paystack").then((mod) => mod.PaystackButton),
  {
    ssr: false,
    loading: () => <Button className="flex-1">Loading Payment...</Button>,
  }
);

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

  // Logistics pricing state
  const [logisticsPricing, setLogisticsPricing] = useState<number | null>(null);
  const [isLoadingPricing, setIsLoadingPricing] = useState(false);
  const [pricingError, setPricingError] = useState<string | null>(null);

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
  const platform = searchParams.get("platform");
  const { orderSummary } = useProductStore();

  // Get cart items from Zustand or fallback to sample data
  const cartItems = orderSummary?.items || [
    {
      id: "1",
      name: "Traditional Ankara Fabric Blouse",
      price: 12500,
      quantity: 1,
      image: "/placeholder.svg?height=80&width=80",
      seller: "Adire Textiles",
    },
    {
      id: "2",
      name: "Handcrafted Leather Sandals",
      price: 8700,
      quantity: 2,
      image: "/placeholder.svg?height=80&width=80",
      seller: "Lagos Leatherworks",
    },
  ];

  // Calculate subtotal from Zustand or fallback calculation
  const subtotal =
    orderSummary?.subtotal ||
    cartItems.reduce((sum, item) => sum + item.price * item.quantity, 0);

  const fetchLogisticsPricing = async (
    state: string,
    lga: string,
    streetAddress: string
  ) => {
    if (!state || !lga || !streetAddress) {
      setLogisticsPricing(null);
      return;
    }

    // Check if we have supplier coordinates from orderSummary
    const supplierLat = orderSummary?.pickupLocation?.latitude;
    const supplierLng = orderSummary?.pickupLocation?.longitude;

    if (!supplierLat || !supplierLng) {
      console.warn(
        "Supplier coordinates not available in orderSummary.pickupLocation"
      );
      setPricingError("Supplier location not available");
      return;
    }

    setIsLoadingPricing(true);
    setPricingError(null);

    try {
      const params = new URLSearchParams({
        state,
        lga,
        streetAddress,
        supplierLat: supplierLat.toString(),
        supplierLng: supplierLng.toString(),
      });

      const response = await fetch(`/api/logistic/pricing?${params}`);

      if (!response.ok) {
        throw new Error(`Failed to fetch pricing: ${response.statusText}`);
      }

      const data = await response.json();

      // Assuming the API returns a price field and buyer coordinates
      if (data.price !== undefined) {
        setLogisticsPricing(data.price);

        // Store buyer coordinates if available, otherwise use fallback
        if (data.buyerLatitude && data.buyerLongitude) {
          setBuyerCoordinates({
            latitude: data.buyerLatitude,
            longitude: data.buyerLongitude,
          });
        } else {
          // Use fallback coordinates (Lagos, Nigeria as example)
          setBuyerCoordinates({
            latitude: 6.5244 + (Math.random() - 0.5) * 0.1, // Add some randomness
            longitude: 3.3792 + (Math.random() - 0.5) * 0.1,
          });
        }
      } else {
        throw new Error("Invalid pricing response format");
      }
    } catch (error) {
      console.error("Error fetching logistics pricing:", error);
      setPricingError("Failed to calculate delivery fee");
      setLogisticsPricing(null);

      // Set fallback coordinates even on error
      setBuyerCoordinates({
        latitude: 6.5244 + (Math.random() - 0.5) * 0.1,
        longitude: 3.3792 + (Math.random() - 0.5) * 0.1,
      });
    } finally {
      setIsLoadingPricing(false);
    }
  };


  
  // Helper function to calculate supplier amount
  const calculateSupplierAmount = () => {
    if (!orderSummary?.items) return 0;

    return orderSummary.items.reduce((total, item) => {
      const originalPrice = item.originalPrice || item.price;
      return total + originalPrice * item.quantity;
    }, 0);
  };


  // Helper function to format order items
  const formatOrderItems = () => {
    if (!orderSummary?.items) return [];

    return orderSummary.items.map((item) => ({
      productId: orderSummary.productId,
      quantity: item.quantity,
      ...(item.variationId && { variantId: item.variationId }),
    }));
  };

  // Helper function to prepare order data
  const prepareOrderData = (
    paymentMethod: string,
    paymentReference?: string
  ) => {
    const supplierAmount = calculateSupplierAmount();
    const plugAmount = subtotal - supplierAmount;

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
      supplierAddress: orderSummary?.pickupLocation?.streetAddress || "",
      supplierState: orderSummary?.pickupLocation?.state || "",
      supplierLga: orderSummary?.pickupLocation?.lga || "",
      supplierDirections: orderSummary?.pickupLocation?.direction || "",
      supplierLatitude: orderSummary?.pickupLocation?.latitude || 0,
      supplierLongitude: orderSummary?.pickupLocation?.longitude || 0,
      supplierId: orderSummary?.items?.[0]?.supplierId || "",

      // Order details
      paymentMethod: paymentMethod,
      totalAmount: total,
      deliveryFee: deliveryFee,
      supplierAmount: supplierAmount,
      plugAmount: plugAmount,
      plugId: orderSummary?.referralId || "",
      orderItems: formatOrderItems(),

      // Payment reference for online payments
      ...(paymentReference && { paymentReference }),
    };

    return orderData;
  };

  // Function to place order
  // const placeOrder = async (
  //   paymentMethod: string,
  //   paymentReference?: string
  // ) => {
  //   try {
  //     setIsLoading(true)
  //     const orderData = prepareOrderData(paymentMethod, paymentReference);

  //     console.log("Placing order with data:", orderData);

  //     const response = await fetch("/api/orders/place-order", {
  //       method: "POST",
  //       headers: {
  //         "Content-Type": "application/json",
  //       },
  //       body: JSON.stringify(orderData),
  //     });

  //     if (!response.ok) {
  //       const errorData = await response.json();
  //       errorToast(errorData.error || "Failed to place order");
  //     }

  //     const result = await response.json();
  //    successToast(result.message || "Order placed successfully");

  //     // Clear all checkout data and order summary
  //     clearCheckoutData();
  //     useProductStore.getState().clearOrderSummary();

  //     return result;
  //   } catch (error) {
  //     console.error("Error placing order:", error);
  //     errorToast("An error occurred while placing the order");
  //   } finally{
  //     setIsLoading(false);
  //   }
  // };



 const placeOrder = async (
    paymentMethod: string,
    paymentReference?: string
  ) => {
    try {
      setIsLoading(true)
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
        return;
      }
  
      const result = await response.json();
      successToast(result.message || "Order placed successfully");
  
      // Store order success data for thank you page
      if (result.data) {
        sessionStorage.setItem('orderSuccess', JSON.stringify(result.data));
      }
  
      // Clear all checkout data and order summary
      clearCheckoutData();
      useProductStore.getState().clearOrderSummary();
  
      // Navigate to thank you page
      router.push('/thank-you');
  
      return result;
    } catch (error) {
      console.error("Error placing order:", error);
      errorToast("An error occurred while placing the order");
    } finally{
      setIsLoading(false);
    }
  }

  // Watch address fields for automatic pricing calculation
  const watchedState = watch("customerAddress.state");
  const watchedLga = watch("customerAddress.lga");
  const watchedStreetAddress = watch("customerAddress.streetAddress");

  // Effect to fetch pricing when address changes
  useEffect(() => {
    const timeoutId = setTimeout(() => {
      if (watchedState && watchedLga && watchedStreetAddress) {
        fetchLogisticsPricing(watchedState, watchedLga, watchedStreetAddress);
      }
    }, 500); // Debounce API calls

    return () => clearTimeout(timeoutId);
  }, [watchedState, watchedLga, watchedStreetAddress]);

  const handleBackNavigation = () => {
    if (platform !== "store") {
      // Navigate back to referring page
      router.back();
    }
  };

  // Handle platform-specific data fetching
  useEffect(() => {
    if (platform === "store") {
      // For store platform, just console log the data
      console.log("Store platform - Order Summary:", orderSummary);
      console.log("Store platform - Cart Items:", cartItems);
    } else {
      // For non-store platforms, data is already fetched from Zustand
      if (orderSummary) {
        console.log("Non-store platform - Using Zustand data:", orderSummary);
      }
    }
  }, [platform, orderSummary, cartItems]);

  // Calculate delivery fee based on method and logistics pricing
  const getDeliveryFee = () => {
    // If we have logistics pricing, use it
    if (logisticsPricing !== null) {
      return logisticsPricing;
    }

    return 1500;
  };

  const deliveryFee = getDeliveryFee();
  const total = subtotal + deliveryFee;

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

      // Don't automatically reset LGA - let user see if their stored LGA is still valid
      // Only update the state in the store
      setCustomerAddress({ state: watchedState });
    }
  }, [watchedState, selectedState, setValue, setCustomerAddress]);

  // Watch form values for real-time validation and store updates
  const watchedCustomerInfo = watch("customerInfo");
  const watchedCustomerAddress = watch("customerAddress");

  // Update store when form values change
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

  // const paystackConfig = {
  //   email: watchedCustomerInfo?.email || "",
  //   amount: total * 100, // Paystack expects amount in kobo
  //   metadata: {
  //     name: watchedCustomerInfo?.name || "",
  //     phone: watchedCustomerInfo?.phone || "",
  //     address: watchedCustomerAddress
  //       ? `${watchedCustomerAddress.streetAddress}, ${watchedCustomerAddress.lga}, ${watchedCustomerAddress.state}`
  //       : "",
  //     custom_fields: [
  //       {
  //         display_name: "Order Items",
  //         variable_name: "order_items",
  //         value: cartItems
  //           .map((item) => `${item.name} x${item.quantity}`)
  //           .join(", "),
  //       },
  //     ],
  //   },
  //   publicKey: "pk_test_eff9334b69c4057bd0b89b293824020426f0d011",
  //   text: isLoading ? "Processing..." : "Place Order",
  //   onSuccess: async (reference) => {
  //     try {
  //       await placeOrder("online", reference.reference);
      
  //       console.log("Payment successful:", reference);
  //       submit();
  //     } catch (error) {
  //       console.error("Error placing order after successful payment:", error);
  //     }
  //   },
  //   onClose: () => {
  //     alert("Payment cancelled");
  //   },
  // };



  
  // Format price in Naira
  

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
            .map((item) => `${item.name} x${item.quantity}`)
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
        // Note: No need to call submit() here as placeOrder now handles navigation
      } catch (error) {
        console.error("Error placing order after successful payment:", error);
      }
    },
    onClose: () => {
      alert("Payment cancelled");
    },
  };
  
  const formatPrice = (price) => {
    return `₦${price.toLocaleString()}`;
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
    }
  };


  // Handle payment method change
  const handlePaymentMethodChange = (method) => {
    setPaymentMethod(method);
  };

  // Handle delivery instructions change
  const handleDeliveryInstructionsChange = (instructions) => {
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
                      <h3 className="font-medium mb-3">Customer Information</h3>
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
                                // Update store immediately
                                setCustomerInfo({ name: value });
                                if (value && errors.customerInfo?.name) {
                                  const isValid = await trigger(
                                    "customerInfo.name"
                                  );
                                  if (isValid) clearErrors("customerInfo.name");
                                }
                              },
                            })}
                            placeholder="Enter your full name"
                            className={
                              errors.customerInfo?.name ? "border-red-500" : ""
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
                                // Update store immediately
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
                              errors.customerInfo?.email ? "border-red-500" : ""
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
                            Phone Number <span className="text-red-500">*</span>
                          </Label>
                          <Input
                            id="customerPhone"
                            {...register("customerInfo.phone", {
                              onChange: async (e) => {
                                const value = e.target.value;
                                // Update store immediately
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
                              errors.customerInfo?.phone ? "border-red-500" : ""
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
                                // Update store immediately
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
                            placeholder="Enter your full street address including house number, street name, and area"
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
                                  // Update store immediately
                                  setCustomerAddress({ state: value });
                                  if (value && errors.customerAddress?.state) {
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
                                  // Update store immediately
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
                            Directions{" "}
                            <span className="text-gray-500">(Optional)</span>
                          </Label>
                          <Textarea
                            id="directions"
                            {...register("customerAddress.directions", {
                              onChange: (e) => {
                                const value = e.target.value;
                                // Update store immediately
                                setCustomerAddress({ directions: value });
                              },
                            })}
                            rows={3}
                            className={
                              errors.customerAddress?.directions
                                ? "border-red-500"
                                : ""
                            }
                            placeholder="Additional directions to help locate your address (e.g., landmarks, building descriptions)"
                          />
                          {errors.customerAddress?.directions && (
                            <p className="text-sm text-red-600">
                              {errors.customerAddress.directions.message}
                            </p>
                          )}
                        </div>

                        {/* Delivery Pricing Status */}
                        {(isLoadingPricing ||
                          pricingError ||
                          logisticsPricing !== null) && (
                          <div className="p-3 border rounded-md bg-muted/50">
                            <div className="flex items-center gap-2">
                              {isLoadingPricing && (
                                <>
                                  <Loader2 className="h-4 w-4 animate-spin" />
                                  <span className="text-sm text-muted-foreground">
                                    Calculating delivery fee...
                                  </span>
                                </>
                              )}
                              {pricingError && (
                                <span className="text-sm text-red-600">
                                  {pricingError}
                                </span>
                              )}
                              {logisticsPricing !== null &&
                                !isLoadingPricing && (
                                  <span className="text-sm text-green-600">
                                    Delivery fee calculated:{" "}
                                    {formatPrice(logisticsPricing)}
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
                    <Button className="w-full" onClick={goToNextStep}>
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
                      <h3 className="font-medium mb-3">Items in Your Order</h3>

                      <div className="space-y-4">
                        {cartItems.map((item) => (
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
                                {item.name}
                                {item.variationName && (
                                  <span className="text-muted-foreground ml-2">
                                    ({item.variationName})
                                  </span>
                                )}
                              </h4>
                              {/* Don't display seller name on review page */}
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
                      <h3 className="font-medium mb-3">Delivery Information</h3>

                      <div className="flex items-start space-x-2">
                        <MapPin className="h-5 w-5 text-muted-foreground mt-0.5 flex-shrink-0" />
                        <div className="flex-1 min-w-0">
                          <p className="text-sm">
                            {checkoutData.customerInfo.name || "Customer Name"}
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
                            {checkoutData.customerInfo.phone || "Phone Number"}
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
                              Online Payment (Card, Bank Transfer, Mobile Money)
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
                  <h3 className="font-semibold text-lg mb-4">Order Summary</h3>

                  <div className="space-y-3 mb-6">
                    <div className="flex justify-between">
                      <span className="text-muted-foreground text-sm">
                        Subtotal ({cartItems.length} items)
                      </span>
                      <span className="text-sm">{formatPrice(subtotal)}</span>
                    </div>
                    <div className="flex justify-between items-center">
                      <span className="text-muted-foreground text-sm">
                        Delivery Fee
                        {isLoadingPricing && (
                          <Loader2 className="h-3 w-3 animate-spin ml-1 inline" />
                        )}
                      </span>
                      <span className="text-sm">
                        {isLoadingPricing
                          ? "Calculating..."
                          : deliveryFee === 0
                          ? "Free"
                          : formatPrice(deliveryFee)}
                      </span>
                    </div>
                    {pricingError && (
                      <div className="text-xs text-red-600">{pricingError}</div>
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
                        Orders are typically delivered within 2-4 business days
                      </p>
                    </div>
                    <div className="flex items-start">
                      <span className="mr-2 text-primary">•</span>
                      <p>We accept returns within 7 days of delivery</p>
                    </div>
                    <div className="flex items-start">
                      <span className="mr-2 text-primary">•</span>
                      <p>Free delivery on orders above ₦10,000</p>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
