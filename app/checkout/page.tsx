



"use client";

import { Badge } from "@/components/ui/badge";

import { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import {
  ArrowLeft,
  ChevronRight,
  CreditCard,
  Truck,
  MapPin,
  Plus,
  Check,
} from "lucide-react";

import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Separator } from "@/components/ui/separator";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";

// Sample cart items
const cartItems = [
  {
    id: 1,
    name: "Traditional Ankara Fabric Blouse",
    price: 12500,
    quantity: 1,
    image: "/placeholder.svg?height=80&width=80",
    seller: "Adire Textiles",
  },
  {
    id: 2,
    name: "Handcrafted Leather Sandals",
    price: 8700,
    quantity: 2,
    image: "/placeholder.svg?height=80&width=80",
    seller: "Lagos Leatherworks",
  },
];

// Calculate totals
const subtotal = cartItems.reduce(
  (sum, item) => sum + item.price * item.quantity,
  0
);
const deliveryFee = 1500;
const total = subtotal + deliveryFee;

export default function CheckoutPage() {
  const [currentStep, setCurrentStep] = useState("delivery");
  const [deliveryMethod, setDeliveryMethod] = useState("standard");
  // const [paymentMethod, setPaymentMethod] = useState("card");
  const [selectedAddress, setSelectedAddress] = useState("address-1");

  // Format price in Naira
  const formatPrice = (price) => {
    return `₦${price.toLocaleString()}`;
  };

  const goToNextStep = () => {
    if (currentStep === "delivery") setCurrentStep("review");
    // else if (currentStep === "payment") setCurrentStep("review");
  };

  const goToPreviousStep = () => {
    // if (currentStep === "payment") setCurrentStep("delivery");
     if (currentStep === "review")  setCurrentStep("delivery");
  };

  return (
    <div className="flex flex-col min-h-screen pb-16 md:pb-0">
      {/* Top Navigation Bar - Mobile Only */}
      <div className="sticky top-0 z-20 flex items-center p-4 bg-background/80 backdrop-blur-md border-b md:hidden">
        <h1 className="text-lg font-medium">Checkout</h1>
      </div>

      <div className="container mx-auto px-4 py-4 md:py-8 max-w-7xl">
        {/* Checkout Title - Desktop Only */}
        <h1 className="text-2xl font-bold mb-6 hidden md:block">Checkout</h1>

        {/* Checkout Progress Indicator */}
        <div className="mb-6">
          <div className="flex items-center justify-between max-w-md mx-auto md:max-w-none">
            <div className="flex flex-col items-center">
              <div
                className={`w-8 h-8 rounded-full flex items-center justify-center text-sm ${
                  currentStep === "delivery"
                    ? "bg-primary text-primary-foreground"
                    : "bg-primary text-primary-foreground"
                }`}
              >
                {currentStep === "delivery" ? (
                  "1"
                ) : (
                  <Check className="h-4 w-4" />
                )}
              </div>
              <span className="text-xs mt-1 text-center">Delivery</span>
            </div>
            <div className="flex-1 h-1 mx-2 bg-muted max-w-20 md:max-w-none">
              <div
                className={`h-full bg-primary ${
                  currentStep === "delivery" ? "w-0" : "w-full"
                } transition-all duration-300`}
              ></div>
            </div>
            <div className="flex flex-col items-center">
              <div
                className={`w-8 h-8 rounded-full flex items-center justify-center text-sm ${
                  // currentStep === "payment"
                  //   ? "bg-primary text-primary-foreground"
                     currentStep === "review"
                    ? "bg-primary text-primary-foreground"
                    : "bg-muted text-muted-foreground"
                }`}
              >
                {currentStep === "review" ? <Check className="h-4 w-4" /> : "2"}
              </div>
              {/* <span className="text-xs mt-1 text-center">Payment</span> */}
            </div>
            <div className="flex-1 h-1 mx-2 bg-muted max-w-20 md:max-w-none">
              <div
                className={`h-full bg-primary ${
                  currentStep === "review" ? "w-full" : "w-0"
                } transition-all duration-300`}
              ></div>
            </div>
            <div className="flex flex-col items-center">
              <div
                className={`w-8 h-8 rounded-full flex items-center justify-center text-sm ${
                  currentStep === "review"
                    ? "bg-primary text-primary-foreground"
                    : "bg-muted text-muted-foreground"
                }`}
              >
                3
              </div>
              <span className="text-xs mt-1 text-center">Review</span>
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 lg:gap-8">
          <div className="lg:col-span-2">
            {currentStep === "delivery" && (
              <Card>
                <CardContent className="p-4 md:p-6">
                  <h2 className="text-xl font-semibold mb-4">
                    Delivery Information
                  </h2>

                  <div className="space-y-6">
                    <div>
                      <h3 className="font-medium mb-3">Delivery Address</h3>

                      <RadioGroup
                        value={selectedAddress}
                        onValueChange={setSelectedAddress}
                        className="space-y-4 mb-4"
                      >
                        <Card className="overflow-hidden border-primary">
                          <CardContent className="p-3 md:p-4">
                            <div className="flex items-start">
                              <div className="mr-3 mt-0.5 flex-shrink-0">
                                <RadioGroupItem
                                  id="address-1"
                                  value="address-1"
                                />
                              </div>
                              <div className="flex-1 min-w-0">
                                <div className="flex justify-between items-start">
                                  <Label
                                    htmlFor="address-1"
                                    className="font-medium"
                                  >
                                    Home
                                  </Label>
                                  <Badge
                                    variant="outline"
                                    className="text-xs ml-2 flex-shrink-0"
                                  >
                                    Default
                                  </Badge>
                                </div>
                                <p className="text-sm text-muted-foreground mt-1">
                                  Amina Mohammed
                                  <br />
                                  123 Broad Street, Yaba
                                  <br />
                                  Lagos, Nigeria
                                  <br />
                                  +234 812 345 6789
                                </p>
                              </div>
                            </div>
                          </CardContent>
                        </Card>

                        <Card className="overflow-hidden">
                          <CardContent className="p-3 md:p-4">
                            <div className="flex items-start">
                              <div className="mr-3 mt-0.5 flex-shrink-0">
                                <RadioGroupItem
                                  id="address-2"
                                  value="address-2"
                                />
                              </div>
                              <div className="flex-1 min-w-0">
                                <Label
                                  htmlFor="address-2"
                                  className="font-medium"
                                >
                                  Office
                                </Label>
                                <p className="text-sm text-muted-foreground mt-1">
                                  Amina Mohammed
                                  <br />
                                  45 Marina Road, Lagos Island
                                  <br />
                                  Lagos, Nigeria
                                  <br />
                                  +234 812 345 6789
                                </p>
                              </div>
                            </div>
                          </CardContent>
                        </Card>
                      </RadioGroup>

                      <Button
                        variant="outline"
                        className="w-full flex items-center justify-center"
                      >
                        <Plus className="h-4 w-4 mr-2" />
                        Add New Address
                      </Button>
                    </div>

                    <Separator />

                    <div>
                      <h3 className="font-medium mb-3">Delivery Method</h3>

                      <RadioGroup
                        value={deliveryMethod}
                        onValueChange={setDeliveryMethod}
                        className="space-y-3"
                      >
                        <div className="flex items-center justify-between space-x-2 p-3 border rounded-md">
                          <div className="flex items-center space-x-2 flex-1 min-w-0">
                            <RadioGroupItem
                              value="standard"
                              id="standard"
                              className="flex-shrink-0"
                            />
                            <Label
                              htmlFor="standard"
                              className="flex items-center flex-1 min-w-0"
                            >
                              <Truck className="h-4 w-4 mr-2 text-muted-foreground flex-shrink-0" />
                              <div className="min-w-0">
                                <span className="font-medium block">
                                  Standard Delivery
                                </span>
                                <p className="text-xs text-muted-foreground">
                                  2-4 business days
                                </p>
                              </div>
                            </Label>
                          </div>
                          <span className="font-medium flex-shrink-0">
                            ₦1,500
                          </span>
                        </div>

                        <div className="flex items-center justify-between space-x-2 p-3 border rounded-md">
                          <div className="flex items-center space-x-2 flex-1 min-w-0">
                            <RadioGroupItem
                              value="express"
                              id="express"
                              className="flex-shrink-0"
                            />
                            <Label
                              htmlFor="express"
                              className="flex items-center flex-1 min-w-0"
                            >
                              <Truck className="h-4 w-4 mr-2 text-muted-foreground flex-shrink-0" />
                              <div className="min-w-0">
                                <span className="font-medium block">
                                  Express Delivery
                                </span>
                                <p className="text-xs text-muted-foreground">
                                  1-2 business days
                                </p>
                              </div>
                            </Label>
                          </div>
                          <span className="font-medium flex-shrink-0">
                            ₦3,000
                          </span>
                        </div>

                        <div className="flex items-center justify-between space-x-2 p-3 border rounded-md">
                          <div className="flex items-center space-x-2 flex-1 min-w-0">
                            <RadioGroupItem
                              value="pickup"
                              id="pickup"
                              className="flex-shrink-0"
                            />
                            <Label
                              htmlFor="pickup"
                              className="flex items-center flex-1 min-w-0"
                            >
                              <MapPin className="h-4 w-4 mr-2 text-muted-foreground flex-shrink-0" />
                              <div className="min-w-0">
                                <span className="font-medium block">
                                  Store Pickup
                                </span>
                                <p className="text-xs text-muted-foreground">
                                  Collect from seller's location
                                </p>
                              </div>
                            </Label>
                          </div>
                          <span className="font-medium flex-shrink-0">
                            Free
                          </span>
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
                      />
                    </div>
                  </div>

                  <div className="mt-6">
                    <Button className="w-full" onClick={goToNextStep}>
                      Continue 
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
                            <div className="w-16 h-16 relative rounded-md overflow-hidden flex-shrink-0">
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
                              </h4>
                              <p className="text-xs text-muted-foreground">
                                Seller: {item.seller}
                              </p>
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
                            Amina Mohammed
                            <br />
                            123 Broad Street, Yaba
                            <br />
                            Lagos, Nigeria
                            <br />
                            +234 812 345 6789
                          </p>
                          <div className="flex items-center mt-2">
                            <Truck className="h-4 w-4 text-muted-foreground mr-1 flex-shrink-0" />
                            <span className="text-sm text-muted-foreground">
                              Standard Delivery (2-4 business days)
                            </span>
                          </div>
                        </div>
                      </div>
                    </div>

                    <Separator />

                    {/* <div>
                      <h3 className="font-medium mb-3">Payment Method</h3>

                      <div className="flex items-center">
                        <CreditCard className="h-5 w-5 text-muted-foreground mr-2 flex-shrink-0" />
                        <span className="text-sm">
                          Visa card ending in 3456
                        </span>
                      </div>
                    </div> */}
                  </div>

                  <div className="mt-6 flex flex-col sm:flex-row space-y-3 sm:space-y-0 sm:space-x-3">
                    <Button
                      variant="outline"
                      className="flex-1"
                      onClick={goToPreviousStep}
                    >
                      Back
                    </Button>
                    <Button className="flex-1">Place Order</Button>
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
                    <div className="flex justify-between">
                      <span className="text-muted-foreground text-sm">
                        Delivery Fee
                      </span>
                      <span className="text-sm">
                        {formatPrice(deliveryFee)}
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
                      <input
                        type="checkbox"
                        id="terms"
                        className="rounded border-gray-300 mt-0.5 flex-shrink-0"
                      />
                      <Label
                        htmlFor="terms"
                        className="text-xs leading-relaxed"
                      >
                        I agree to the{" "}
                        <Link href="/terms" className="text-primary">
                          Terms of Service
                        </Link>{" "}
                        and{" "}
                        <Link href="/privacy" className="text-primary">
                          Privacy Policy
                        </Link>
                      </Label>
                    </div>

                    <div className="flex items-start space-x-2">
                      <input
                        type="checkbox"
                        id="whatsapp"
                        className="rounded border-gray-300 mt-0.5 flex-shrink-0"
                      />
                      <Label
                        htmlFor="whatsapp"
                        className="text-xs leading-relaxed"
                      >
                        Send order updates via WhatsApp
                      </Label>
                    </div>
                  </div>

                  <div className="mt-6 text-center">
                    <p className="text-xs text-muted-foreground">
                      Need help?{" "}
                      <Link href="/help" className="text-primary">
                        Contact Support
                      </Link>
                    </p>
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
