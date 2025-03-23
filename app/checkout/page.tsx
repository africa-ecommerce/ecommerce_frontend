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
  const [paymentMethod, setPaymentMethod] = useState("card");
  const [selectedAddress, setSelectedAddress] = useState("address-1");

  // Format price in Naira
  const formatPrice = (price) => {
    return `₦${price.toLocaleString()}`;
  };

  const goToNextStep = () => {
    if (currentStep === "delivery") setCurrentStep("payment");
    else if (currentStep === "payment") setCurrentStep("review");
  };

  const goToPreviousStep = () => {
    if (currentStep === "payment") setCurrentStep("delivery");
    else if (currentStep === "review") setCurrentStep("payment");
  };

  return (
    <div className="flex flex-col min-h-screen pb-16 md:pb-0">
      {/* Top Navigation Bar - Mobile Only */}
      <div className="sticky top-0 z-20 flex items-center p-4 bg-background/80 backdrop-blur-md border-b md:hidden">
        <Link href="/cart" className="mr-4">
          <ArrowLeft className="h-5 w-5" />
        </Link>
        <h1 className="text-lg font-medium">Checkout</h1>
      </div>

      <div className="container mx-auto px-4 py-4 md:py-8">
        {/* Breadcrumbs - Desktop Only */}
        <div className="hidden md:flex items-center text-sm mb-6">
          <Link
            href="/"
            className="text-muted-foreground hover:text-foreground"
          >
            Home
          </Link>
          <ChevronRight className="h-4 w-4 mx-2 text-muted-foreground" />
          <Link
            href="/cart"
            className="text-muted-foreground hover:text-foreground"
          >
            Cart
          </Link>
          <ChevronRight className="h-4 w-4 mx-2 text-muted-foreground" />
          <span>Checkout</span>
        </div>

        {/* Checkout Title - Desktop Only */}
        <h1 className="text-2xl font-bold mb-6 hidden md:block">Checkout</h1>

        {/* Checkout Progress Indicator */}
        <div className="mb-6">
          <div className="flex items-center justify-between">
            <div className="flex flex-col items-center">
              <div
                className={`w-8 h-8 rounded-full flex items-center justify-center ${
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
              <span className="text-xs mt-1">Delivery</span>
            </div>
            <div className="flex-1 h-1 mx-2 bg-muted">
              <div
                className={`h-full bg-primary ${
                  currentStep === "delivery" ? "w-0" : "w-full"
                } transition-all duration-300`}
              ></div>
            </div>
            <div className="flex flex-col items-center">
              <div
                className={`w-8 h-8 rounded-full flex items-center justify-center ${
                  currentStep === "payment"
                    ? "bg-primary text-primary-foreground"
                    : currentStep === "review"
                    ? "bg-primary text-primary-foreground"
                    : "bg-muted text-muted-foreground"
                }`}
              >
                {currentStep === "review" ? <Check className="h-4 w-4" /> : "2"}
              </div>
              <span className="text-xs mt-1">Payment</span>
            </div>
            <div className="flex-1 h-1 mx-2 bg-muted">
              <div
                className={`h-full bg-primary ${
                  currentStep === "review" ? "w-full" : "w-0"
                } transition-all duration-300`}
              ></div>
            </div>
            <div className="flex flex-col items-center">
              <div
                className={`w-8 h-8 rounded-full flex items-center justify-center ${
                  currentStep === "review"
                    ? "bg-primary text-primary-foreground"
                    : "bg-muted text-muted-foreground"
                }`}
              >
                3
              </div>
              <span className="text-xs mt-1">Review</span>
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          <div className="lg:col-span-2">
            {currentStep === "delivery" && (
              <Card>
                <CardContent className="p-6">
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
                          <CardContent className="p-4">
                            <div className="flex items-start">
                              <div className="mr-3 mt-0.5">
                                <RadioGroupItem
                                  id="address-1"
                                  value="address-1"
                                />
                              </div>
                              <div className="flex-1">
                                <div className="flex justify-between">
                                  <Label
                                    htmlFor="address-1"
                                    className="font-medium"
                                  >
                                    Home
                                  </Label>
                                  <Badge variant="outline" className="text-xs">
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
                          <CardContent className="p-4">
                            <div className="flex items-start">
                              <div className="mr-3 mt-0.5">
                                <RadioGroupItem
                                  id="address-2"
                                  value="address-2"
                                />
                              </div>
                              <div className="flex-1">
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
                          <div className="flex items-center space-x-2">
                            <RadioGroupItem value="standard" id="standard" />
                            <Label
                              htmlFor="standard"
                              className="flex items-center"
                            >
                              <Truck className="h-4 w-4 mr-2 text-muted-foreground" />
                              <div>
                                <span className="font-medium">
                                  Standard Delivery
                                </span>
                                <p className="text-xs text-muted-foreground">
                                  2-4 business days
                                </p>
                              </div>
                            </Label>
                          </div>
                          <span className="font-medium">₦1,500</span>
                        </div>

                        <div className="flex items-center justify-between space-x-2 p-3 border rounded-md">
                          <div className="flex items-center space-x-2">
                            <RadioGroupItem value="express" id="express" />
                            <Label
                              htmlFor="express"
                              className="flex items-center"
                            >
                              <Truck className="h-4 w-4 mr-2 text-muted-foreground" />
                              <div>
                                <span className="font-medium">
                                  Express Delivery
                                </span>
                                <p className="text-xs text-muted-foreground">
                                  1-2 business days
                                </p>
                              </div>
                            </Label>
                          </div>
                          <span className="font-medium">₦3,000</span>
                        </div>

                        <div className="flex items-center justify-between space-x-2 p-3 border rounded-md">
                          <div className="flex items-center space-x-2">
                            <RadioGroupItem value="pickup" id="pickup" />
                            <Label
                              htmlFor="pickup"
                              className="flex items-center"
                            >
                              <MapPin className="h-4 w-4 mr-2 text-muted-foreground" />
                              <div>
                                <span className="font-medium">
                                  Store Pickup
                                </span>
                                <p className="text-xs text-muted-foreground">
                                  Collect from seller's location
                                </p>
                              </div>
                            </Label>
                          </div>
                          <span className="font-medium">Free</span>
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
                      Continue to Payment
                    </Button>
                  </div>
                </CardContent>
              </Card>
            )}

            {currentStep === "payment" && (
              <Card>
                <CardContent className="p-6">
                  <h2 className="text-xl font-semibold mb-4">Payment Method</h2>

                  <div className="space-y-6">
                    <Tabs
                      defaultValue="card"
                      value={paymentMethod}
                      onValueChange={setPaymentMethod}
                    >
                      <TabsList className="grid grid-cols-4 w-full">
                        <TabsTrigger value="card">Card</TabsTrigger>
                        <TabsTrigger value="mobile">Mobile Money</TabsTrigger>
                        <TabsTrigger value="bank">Bank Transfer</TabsTrigger>
                        <TabsTrigger value="cash">Cash</TabsTrigger>
                      </TabsList>

                      <TabsContent value="card" className="mt-4 space-y-4">
                        <div className="space-y-4">
                          <div className="grid grid-cols-2 gap-4">
                            <div className="col-span-2">
                              <Label htmlFor="card-number">Card Number</Label>
                              <Input
                                id="card-number"
                                placeholder="1234 5678 9012 3456"
                              />
                            </div>
                            <div>
                              <Label htmlFor="expiry">Expiry Date</Label>
                              <Input id="expiry" placeholder="MM/YY" />
                            </div>
                            <div>
                              <Label htmlFor="cvv">CVV</Label>
                              <Input id="cvv" placeholder="123" />
                            </div>
                            <div className="col-span-2">
                              <Label htmlFor="name">Name on Card</Label>
                              <Input id="name" placeholder="John Doe" />
                            </div>
                          </div>

                          <div className="flex items-center space-x-2">
                            <input
                              type="checkbox"
                              id="save-card"
                              className="rounded border-gray-300"
                            />
                            <Label htmlFor="save-card" className="text-sm">
                              Save card for future payments
                            </Label>
                          </div>
                        </div>

                        <div className="flex items-center justify-center space-x-4 py-4">
                          <Image
                            src="/placeholder.svg?height=30&width=50&text=Visa"
                            alt="Visa"
                            width={50}
                            height={30}
                          />
                          <Image
                            src="/placeholder.svg?height=30&width=50&text=MC"
                            alt="Mastercard"
                            width={50}
                            height={30}
                          />
                          <Image
                            src="/placeholder.svg?height=30&width=50&text=Verve"
                            alt="Verve"
                            width={50}
                            height={30}
                          />
                        </div>
                      </TabsContent>

                      <TabsContent value="mobile" className="mt-4 space-y-4">
                        <RadioGroup defaultValue="mtn" className="space-y-3">
                          <div className="flex items-center space-x-2 p-3 border rounded-md">
                            <RadioGroupItem value="mtn" id="mtn" />
                            <Label htmlFor="mtn" className="flex items-center">
                              <div className="w-8 h-8 bg-yellow-400 rounded-full mr-2 flex items-center justify-center text-xs font-bold">
                                MTN
                              </div>
                              <span>MTN Mobile Money</span>
                            </Label>
                          </div>

                          <div className="flex items-center space-x-2 p-3 border rounded-md">
                            <RadioGroupItem value="airtel" id="airtel" />
                            <Label
                              htmlFor="airtel"
                              className="flex items-center"
                            >
                              <div className="w-8 h-8 bg-red-500 rounded-full mr-2 flex items-center justify-center text-xs font-bold text-white">
                                AIR
                              </div>
                              <span>Airtel Money</span>
                            </Label>
                          </div>

                          <div className="flex items-center space-x-2 p-3 border rounded-md">
                            <RadioGroupItem value="mpesa" id="mpesa" />
                            <Label
                              htmlFor="mpesa"
                              className="flex items-center"
                            >
                              <div className="w-8 h-8 bg-green-600 rounded-full mr-2 flex items-center justify-center text-xs font-bold text-white">
                                M
                              </div>
                              <span>M-Pesa</span>
                            </Label>
                          </div>
                        </RadioGroup>

                        <div>
                          <Label htmlFor="phone-number">Phone Number</Label>
                          <Input
                            id="phone-number"
                            placeholder="+234 800 000 0000"
                          />
                        </div>
                      </TabsContent>

                      <TabsContent value="bank" className="mt-4 space-y-4">
                        <div className="p-4 bg-muted rounded-md">
                          <h3 className="font-medium mb-2">
                            Bank Transfer Instructions
                          </h3>
                          <p className="text-sm text-muted-foreground mb-4">
                            Make a transfer to the account below. Your order
                            will be processed once payment is confirmed.
                          </p>

                          <div className="space-y-2">
                            <div className="flex justify-between">
                              <span className="text-sm text-muted-foreground">
                                Bank Name:
                              </span>
                              <span className="text-sm font-medium">
                                First Bank of Nigeria
                              </span>
                            </div>
                            <div className="flex justify-between">
                              <span className="text-sm text-muted-foreground">
                                Account Name:
                              </span>
                              <span className="text-sm font-medium">
                                AfriConnect Ltd
                              </span>
                            </div>
                            <div className="flex justify-between">
                              <span className="text-sm text-muted-foreground">
                                Account Number:
                              </span>
                              <span className="text-sm font-medium">
                                1234567890
                              </span>
                            </div>
                            <div className="flex justify-between">
                              <span className="text-sm text-muted-foreground">
                                Reference:
                              </span>
                              <span className="text-sm font-medium">
                                ORD-12345
                              </span>
                            </div>
                          </div>
                        </div>
                      </TabsContent>

                      <TabsContent value="cash" className="mt-4 space-y-4">
                        <div className="p-4 bg-muted rounded-md">
                          <h3 className="font-medium mb-2">Cash on Delivery</h3>
                          <p className="text-sm text-muted-foreground">
                            Pay with cash when your order is delivered. Please
                            ensure you have the exact amount as our delivery
                            agents may not carry change.
                          </p>
                        </div>
                      </TabsContent>
                    </Tabs>
                  </div>

                  <div className="mt-6 flex space-x-3">
                    <Button
                      variant="outline"
                      className="flex-1"
                      onClick={goToPreviousStep}
                    >
                      Back
                    </Button>
                    <Button className="flex-1" onClick={goToNextStep}>
                      Review Order
                    </Button>
                  </div>
                </CardContent>
              </Card>
            )}

            {currentStep === "review" && (
              <Card>
                <CardContent className="p-6">
                  <h2 className="text-xl font-semibold mb-4">
                    Review Your Order
                  </h2>

                  <div className="space-y-6">
                    <div>
                      <h3 className="font-medium mb-3">Items in Your Order</h3>

                      <div className="space-y-4">
                        {cartItems.map((item) => (
                          <div key={item.id} className="flex items-start">
                            <div className="w-16 h-16 relative rounded-md overflow-hidden">
                              <Image
                                src={item.image || "/placeholder.svg"}
                                alt={item.name}
                                fill
                                className="object-cover"
                              />
                            </div>
                            <div className="ml-3 flex-1">
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

                      <div className="flex items-start">
                        <MapPin className="h-5 w-5 text-muted-foreground mr-2 mt-0.5" />
                        <div>
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
                            <Truck className="h-4 w-4 text-muted-foreground mr-1" />
                            <span className="text-sm text-muted-foreground">
                              Standard Delivery (2-4 business days)
                            </span>
                          </div>
                        </div>
                      </div>
                    </div>

                    <Separator />

                    <div>
                      <h3 className="font-medium mb-3">Payment Method</h3>

                      <div className="flex items-center">
                        <CreditCard className="h-5 w-5 text-muted-foreground mr-2" />
                        <span className="text-sm">
                          Visa card ending in 3456
                        </span>
                      </div>
                    </div>
                  </div>

                  <div className="mt-6 flex space-x-3">
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
                <CardContent className="p-6">
                  <h3 className="font-semibold text-lg mb-4">Order Summary</h3>

                  <div className="space-y-3 mb-6">
                    <div className="flex justify-between">
                      <span className="text-muted-foreground">
                        Subtotal ({cartItems.length} items)
                      </span>
                      <span>{formatPrice(subtotal)}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-muted-foreground">
                        Delivery Fee
                      </span>
                      <span>{formatPrice(deliveryFee)}</span>
                    </div>
                    <Separator className="my-4" />
                    <div className="flex justify-between font-bold">
                      <span>Total</span>
                      <span>{formatPrice(total)}</span>
                    </div>
                  </div>

                  <div className="space-y-4">
                    <div className="flex items-center space-x-2">
                      <input
                        type="checkbox"
                        id="terms"
                        className="rounded border-gray-300"
                      />
                      <Label htmlFor="terms" className="text-xs">
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

                    <div className="flex items-center space-x-2">
                      <input
                        type="checkbox"
                        id="whatsapp"
                        className="rounded border-gray-300"
                      />
                      <Label htmlFor="whatsapp" className="text-xs">
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
