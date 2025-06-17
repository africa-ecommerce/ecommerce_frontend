"use client";
import { useState, useEffect } from "react";
import dynamic from "next/dynamic";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { Loader2 } from "lucide-react";

import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { useProductStore } from "@/hooks/product-store";
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

interface OrderSummaryProps {
  buyerCoordinates: {
    latitude: number | null;
    longitude: number | null;
  };
  logisticsPricingData?: any;
  logisticsPricingError?: any;
  isLogisticsPricingLoading?: boolean;
  watchedState?: string;
  watchedLga?: string;
  watchedStreetAddress?: string;
  orderIndex?: number;
}

export default function OrderSummary({
  buyerCoordinates,
  logisticsPricingData,
  logisticsPricingError,
  isLogisticsPricingLoading,
  watchedState,
  watchedLga,
  watchedStreetAddress,
  orderIndex = 0,
}: OrderSummaryProps) {
  const [isClient, setIsClient] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const router = useRouter();
  const { orderSummaries , clearOrderSummaries } =
    useProductStore();
  const { checkoutData, clearCheckoutData, setCurrentStep } =
    useCheckoutStore();

  const orderSummary = orderSummaries[orderIndex];
  const cartItems = orderSummary?.items;
  const subtotal =
    orderSummary?.subtotal ||
    cartItems?.reduce((sum, item) => sum + item.price * item.quantity, 0);

  const paymentMethod = checkoutData.paymentMethod;
  const currentStep = checkoutData.currentStep;

  useEffect(() => {
    setIsClient(true);
  }, []);

  // Helper function to calculate supplier amount
  const calculateSupplierAmount = () => {
    if (!orderSummary?.items) return 0;

    return orderSummary.items.reduce((total, item) => {
      const originalPrice = item.originalPrice || item.price;
      return total + originalPrice * item.quantity;
    }, 0);
  };







  const formatOrderItems = () => {
    if (!orderSummary?.items) return [];

    return orderSummary.items.map((item) => ({
      productId: item.id, // Changed from orderSummary.productId to item.productId
      quantity: item.quantity,
      ...(item.variationId && {
        variantId: item.variationId,
        variantColor: item.color,
        variantSize: item.size,
      }),
      ...(!item.variationId && {
        productColor: item.color,
        productSize: item.size,
      }),
    }));
  };

  const prepareOrderData = (
    paymentMethod: string,
    paymentReference?: string
  ) => {
    const supplierAmount = calculateSupplierAmount();
    const plugAmount = subtotal! - supplierAmount;

    // Get all unique supplier IDs from items
    const supplierIds = Array.from(
      new Set(orderSummary?.items?.map((item) => item.supplierId))
    );

    // Calculate average plug price and supplier price
    const totalItems = orderSummary?.items?.length || 1;
    const avgPlugPrice =
      orderSummary?.items?.reduce((sum, item) => sum + item.price, 0) /
      totalItems;
    const avgSupplierPrice =
      orderSummary?.items?.reduce(
        (sum, item) => sum + (item.originalPrice || item.price),
        0
      ) / totalItems;

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

      // Supplier information - now includes all supplier IDs
      supplierId: supplierIds.join(","), // Combine multiple supplier IDs if needed

      // Order details
      paymentMethod: paymentMethod,
      totalAmount: total,
      deliveryFee: deliveryFee,
      supplierAmount: supplierAmount,
      plugAmount: plugAmount,
      plugPrice: avgPlugPrice, // Average price instead of first item
      supplierPrice: avgSupplierPrice, // Average price instead of first item
      plugId: orderSummary?.referralId || "",
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

  // Calculate delivery fee based on method and logistics pricing
  const getDeliveryFee = () => {
    const hasRequiredAddressData =
      watchedState && watchedLga && watchedStreetAddress;

    if (!hasRequiredAddressData) {
      return null;
    }

    if (isLogisticsPricingLoading) {
      return null;
    }

    if (
      logisticsPricingData?.data?.price !== undefined &&
      !logisticsPricingError
    ) {
      return logisticsPricingData.data.price;
    }

    if (logisticsPricingError) {
      return 1500;
    }

    return null;
  };

  const deliveryFee = getDeliveryFee();
  const total = subtotal! + (deliveryFee || 0);

//   // Update delivery fee in the store whenever it changes
//   useEffect(() => {
//     if (deliveryFee !== null && deliveryFee !== undefined) {
//      (orderIndex, deliveryFee);
//     }
//   }, [deliveryFee, orderIndex ]);

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

  const paystackConfig = {
    email: checkoutData.customerInfo.email || "",
    amount: total * 100, // Paystack expects amount in kobo
    metadata: {
      name: checkoutData.customerInfo.name || "",
      phone: checkoutData.customerInfo.phone || "",
      address: checkoutData.customerAddress
        ? `${checkoutData.customerAddress.streetAddress}, ${checkoutData.customerAddress.lga}, ${checkoutData.customerAddress.state}`
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
    onSuccess: async (reference: any) => {
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

  const renderPlaceOrderButton = () => {
    if (paymentMethod === "cash") {
      return (
        <Button className="flex-1" onClick={handleCashOnDeliveryOrder}>
          {isLoading ? "Processing..." : "Place Order (Pay on Delivery)"}
        </Button>
      );
    } else {
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

  if (!orderSummary) {
    return <div>No order found</div>;
  }

  return (
    <div className="sticky top-20">
      <Card>
        <CardContent className="p-4 md:p-6">
          <h3 className="font-semibold text-lg mb-4">Order Summary</h3>

          {/* Order Items */}
          {currentStep === "review" && (
            <div className="mb-6">
              <h4 className="font-medium mb-3">Items in Your Order</h4>
              <div className="space-y-4">
                {cartItems?.map((item) => (
                  <div key={item.id} className="flex items-start space-x-3">
                    <div className="w-16 h-16 relative rounded-md overflow-hidden flex-shrink-0 bg-muted">
                      <Image
                        src={item.image || "/placeholder.svg"}
                        alt={item.name}
                        fill
                        className="object-cover"
                      />
                    </div>
                    <div className="flex-1 min-w-0">
                      <h5 className="font-medium text-sm">
                        <span className="capitalize">{item.name}</span>
                        {item.variationName && (
                          <span className="text-muted-foreground ml-2">
                            ({item.variationName})
                          </span>
                        )}
                      </h5>
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
              <Separator className="my-4" />
            </div>
          )}

          <div className="space-y-3 mb-6">
            <div className="flex justify-between">
              <span className="text-muted-foreground text-sm">
                Subtotal ({cartItems?.length} items)
              </span>
              <span className="text-sm">{formatPrice(subtotal!)}</span>
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

          {currentStep === "review" && (
            <div className="flex flex-col sm:flex-row space-y-3 sm:space-y-0 sm:space-x-3 mb-6">
              <Button
                variant="outline"
                className="flex-1"
                onClick={goToPreviousStep}
              >
                Back
              </Button>
              {renderPlaceOrderButton()}
            </div>
          )}

          <div className="space-y-4">
            <div className="flex items-start space-x-2">
              <p className="text-xs text-muted-foreground">
                By continuing I agree to the{" "}
                <a href="/terms" className="text-primary hover:underline">
                  Terms of Service
                </a>{" "}
                and{" "}
                <a href="/privacy" className="text-primary hover:underline">
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
              <p>Orders are typically delivered within 2-4 business days</p>
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
  );
}
