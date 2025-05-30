// "use client";

// import { Badge } from "@/components/ui/badge";
// import { useState, useEffect } from "react";
// import dynamic from "next/dynamic";
// import Image from "next/image";
// import { useRouter, useSearchParams } from "next/navigation";
// import {
//   CreditCard,
//   Truck,
//   MapPin,
//   Plus,
//   Banknote,
//   ArrowLeft,
// } from "lucide-react";

// import { Button } from "@/components/ui/button";
// import { Card, CardContent } from "@/components/ui/card";
// import { Separator } from "@/components/ui/separator";
// import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
// import { Label } from "@/components/ui/label";
// import { Textarea } from "@/components/ui/textarea";
// import { useProductStore } from "@/hooks/product-store";

// // Dynamic import of PaystackButton to prevent SSR issues
// const PaystackButton = dynamic(
//   () => import("react-paystack").then((mod) => mod.PaystackButton),
//   {
//     ssr: false,
//     loading: () => <Button className="flex-1">Loading Payment...</Button>,
//   }
// );

// export default function CheckoutPage() {
//   const [currentStep, setCurrentStep] = useState("delivery");
//   const [deliveryMethod, setDeliveryMethod] = useState("standard");
//   const [paymentMethod, setPaymentMethod] = useState("online");
//   const [selectedAddress, setSelectedAddress] = useState("address-1");
//   const [isClient, setIsClient] = useState(false);
//   const router = useRouter();

//   const [customerInfo, setCustomerInfo] = useState({
//     email: "amina.mohammed@email.com",
//     name: "Amina Mohammed",
//     phone: "+234 812 345 6789",
//   });

//   const searchParams = useSearchParams();
//   const platform = searchParams.get("platform");
//   const { orderSummary } = useProductStore();

//   // Ensure we're on the client side before rendering client-only components
//   useEffect(() => {
//     setIsClient(true);
//   }, []);

//   // Get cart items from Zustand or fallback to sample data
//   const cartItems = orderSummary?.items || [
//     {
//       id: "1",
//       name: "Traditional Ankara Fabric Blouse",
//       price: 12500,
//       quantity: 1,
//       image: "/placeholder.svg?height=80&width=80",
//       seller: "Adire Textiles",
//     },
//     {
//       id: "2",
//       name: "Handcrafted Leather Sandals",
//       price: 8700,
//       quantity: 2,
//       image: "/placeholder.svg?height=80&width=80",
//       seller: "Lagos Leatherworks",
//     },
//   ];

//   // Calculate totals from Zustand or fallback calculation
//   const subtotal =
//     orderSummary?.subtotal ||
//     cartItems.reduce((sum, item) => sum + item.price * item.quantity, 0);

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

//   // Calculate delivery fee based on method
//   const getDeliveryFee = () => {
//     switch (deliveryMethod) {
//       case "express":
//         return 3000;
//       case "standard":
//         return 1500;
//       case "pickup":
//         return 0;
//       default:
//         return 1500;
//     }
//   };

//   const deliveryFee = getDeliveryFee();
//   const total = subtotal + deliveryFee;

//   // Paystack configuration
//   const paystackConfig = {
//     email: customerInfo.email,
//     amount: total * 100, // Paystack expects amount in kobo
//     metadata: {
//       name: customerInfo.name,
//       phone: customerInfo.phone,
//       custom_fields: [
//         {
//           display_name: "Order Items",
//           variable_name: "order_items",
//           value: cartItems
//             .map((item) => `${item.name} x${item.quantity}`)
//             .join(", "),
//         },
//       ],
//     },
//     publicKey: "pk_test_eff9334b69c4057bd0b89b293824020426f0d011", // Replace with your actual public key
//     text: "Place Order",
//     onSuccess: (reference) => {
//       alert(`Payment successful! Reference: ${reference.reference}`);
//       // Handle successful payment here
//       console.log("Payment successful:", reference);
//     },
//     onClose: () => {
//       alert("Payment cancelled");
//     },
//   }; 

//   // Format price in Naira
//   const formatPrice = (price) => {
//     return `₦${price.toLocaleString()}`;
//   };

//   const goToNextStep = () => {
//     if (currentStep === "delivery") setCurrentStep("review");
//   };

//   const goToPreviousStep = () => {
//     if (currentStep === "review") setCurrentStep("delivery");
//   };

//   const handleCashOnDeliveryOrder = () => {
//     // Handle cash on delivery order
//     alert("Order placed successfully! You will pay on delivery.");
//     console.log("Cash on delivery order placed");
//     // Here you would typically send the order to your backend
//   };

//   const renderPlaceOrderButton = () => {
//     if (paymentMethod === "cash") {
//       return (
//         <Button className="flex-1" onClick={handleCashOnDeliveryOrder}>
//           Place Order (Pay on Delivery)
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
//                     <div>
//                       <h3 className="font-medium mb-3">Delivery Address</h3>

//                       <RadioGroup
//                         value={selectedAddress}
//                         onValueChange={setSelectedAddress}
//                         className="space-y-4 mb-4"
//                       >
//                         <Card className="overflow-hidden border-primary">
//                           <CardContent className="p-3 md:p-4">
//                             <div className="flex items-start">
//                               <div className="mr-3 mt-0.5 flex-shrink-0">
//                                 <RadioGroupItem
//                                   id="address-1"
//                                   value="address-1"
//                                 />
//                               </div>
//                               <div className="flex-1 min-w-0">
//                                 <div className="flex justify-between items-start">
//                                   <Label
//                                     htmlFor="address-1"
//                                     className="font-medium"
//                                   >
//                                     Home
//                                   </Label>
//                                   <Badge
//                                     variant="outline"
//                                     className="text-xs ml-2 flex-shrink-0"
//                                   >
//                                     Default
//                                   </Badge>
//                                 </div>
//                                 <p className="text-sm text-muted-foreground mt-1">
//                                   Amina Mohammed
//                                   <br />
//                                   123 Broad Street, Yaba
//                                   <br />
//                                   Lagos, Nigeria
//                                   <br />
//                                   +234 812 345 6789
//                                 </p>
//                               </div>
//                             </div>
//                           </CardContent>
//                         </Card>

//                         <Card className="overflow-hidden">
//                           <CardContent className="p-3 md:p-4">
//                             <div className="flex items-start">
//                               <div className="mr-3 mt-0.5 flex-shrink-0">
//                                 <RadioGroupItem
//                                   id="address-2"
//                                   value="address-2"
//                                 />
//                               </div>
//                               <div className="flex-1 min-w-0">
//                                 <Label
//                                   htmlFor="address-2"
//                                   className="font-medium"
//                                 >
//                                   Office
//                                 </Label>
//                                 <p className="text-sm text-muted-foreground mt-1">
//                                   Amina Mohammed
//                                   <br />
//                                   45 Marina Road, Lagos Island
//                                   <br />
//                                   Lagos, Nigeria
//                                   <br />
//                                   +234 812 345 6789
//                                 </p>
//                               </div>
//                             </div>
//                           </CardContent>
//                         </Card>
//                       </RadioGroup>

//                       <Button
//                         variant="outline"
//                         className="w-full flex items-center justify-center"
//                       >
//                         <Plus className="h-4 w-4 mr-2" />
//                         Add New Address
//                       </Button>
//                     </div>

//                     <Separator />

//                     <div>
//                       <h3 className="font-medium mb-3">Delivery Method</h3>

//                       <RadioGroup
//                         value={deliveryMethod}
//                         onValueChange={setDeliveryMethod}
//                         className="space-y-3"
//                       >
//                         <div className="flex items-center justify-between space-x-2 p-3 border rounded-md">
//                           <div className="flex items-center space-x-2 flex-1 min-w-0">
//                             <RadioGroupItem
//                               value="standard"
//                               id="standard"
//                               className="flex-shrink-0"
//                             />
//                             <Label
//                               htmlFor="standard"
//                               className="flex items-center flex-1 min-w-0"
//                             >
//                               <Truck className="h-4 w-4 mr-2 text-muted-foreground flex-shrink-0" />
//                               <div className="min-w-0">
//                                 <span className="font-medium block">
//                                   Standard Delivery
//                                 </span>
//                                 <p className="text-xs text-muted-foreground">
//                                   2-4 business days
//                                 </p>
//                               </div>
//                             </Label>
//                           </div>
//                           <span className="font-medium flex-shrink-0">
//                             ₦1,500
//                           </span>
//                         </div>

//                         <div className="flex items-center justify-between space-x-2 p-3 border rounded-md">
//                           <div className="flex items-center space-x-2 flex-1 min-w-0">
//                             <RadioGroupItem
//                               value="express"
//                               id="express"
//                               className="flex-shrink-0"
//                             />
//                             <Label
//                               htmlFor="express"
//                               className="flex items-center flex-1 min-w-0"
//                             >
//                               <Truck className="h-4 w-4 mr-2 text-muted-foreground flex-shrink-0" />
//                               <div className="min-w-0">
//                                 <span className="font-medium block">
//                                   Express Delivery
//                                 </span>
//                                 <p className="text-xs text-muted-foreground">
//                                   1-2 business days
//                                 </p>
//                               </div>
//                             </Label>
//                           </div>
//                           <span className="font-medium flex-shrink-0">
//                             ₦3,000
//                           </span>
//                         </div>

//                         <div className="flex items-center justify-between space-x-2 p-3 border rounded-md">
//                           <div className="flex items-center space-x-2 flex-1 min-w-0">
//                             <RadioGroupItem
//                               value="pickup"
//                               id="pickup"
//                               className="flex-shrink-0"
//                             />
//                             <Label
//                               htmlFor="pickup"
//                               className="flex items-center flex-1 min-w-0"
//                             >
//                               <MapPin className="h-4 w-4 mr-2 text-muted-foreground flex-shrink-0" />
//                               <div className="min-w-0">
//                                 <span className="font-medium block">
//                                   Store Pickup
//                                 </span>
//                                 <p className="text-xs text-muted-foreground">
//                                   Collect from seller's location
//                                 </p>
//                               </div>
//                             </Label>
//                           </div>
//                           <span className="font-medium flex-shrink-0">
//                             Free
//                           </span>
//                         </div>
//                       </RadioGroup>
//                     </div>

//                     <Separator />

//                     <div>
//                       <h3 className="font-medium mb-3">Payment Method</h3>

//                       <RadioGroup
//                         value={paymentMethod}
//                         onValueChange={setPaymentMethod}
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
//                       />
//                     </div>
//                   </div>

//                   <div className="mt-6">
//                     <Button className="w-full" onClick={goToNextStep}>
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
//                         {cartItems.map((item) => (
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
//                                 {item.name}
//                                 {item.variationName && (
//                                   <span className="text-muted-foreground ml-2">
//                                     ({item.variationName})
//                                   </span>
//                                 )}
//                               </h4>
//                               {/* Don't display seller name on review page */}
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
//                             Amina Mohammed
//                             <br />
//                             123 Broad Street, Yaba
//                             <br />
//                             Lagos, Nigeria
//                             <br />
//                             +234 812 345 6789
//                           </p>
//                           <div className="flex items-center mt-2">
//                             <Truck className="h-4 w-4 text-muted-foreground mr-1 flex-shrink-0" />
//                             <span className="text-sm text-muted-foreground">
//                               {deliveryMethod === "standard" &&
//                                 "Standard Delivery (2-4 business days)"}
//                               {deliveryMethod === "express" &&
//                                 "Express Delivery (1-2 business days)"}
//                               {deliveryMethod === "pickup" && "Store Pickup"}
//                             </span>
//                           </div>
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
//                         Subtotal ({cartItems.length} items)
//                       </span>
//                       <span className="text-sm">{formatPrice(subtotal)}</span>
//                     </div>
//                     <div className="flex justify-between">
//                       <span className="text-muted-foreground text-sm">
//                         Delivery Fee
//                       </span>
//                       <span className="text-sm">
//                         {deliveryFee === 0 ? "Free" : formatPrice(deliveryFee)}
//                       </span>
//                     </div>
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
//                       <p>Free delivery on orders above ₦10,000</p>
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



// "use client";

// import { Badge } from "@/components/ui/badge";
// import { useState, useEffect } from "react";
// import dynamic from "next/dynamic";
// import Image from "next/image";
// import { useRouter, useSearchParams } from "next/navigation";
// import { CreditCard, Truck, MapPin, Plus, Banknote, ArrowLeft } from 'lucide-react';

// import { Button } from "@/components/ui/button";
// import { Card, CardContent } from "@/components/ui/card";
// import { Separator } from "@/components/ui/separator";
// import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
// import { Label } from "@/components/ui/label";
// import { Textarea } from "@/components/ui/textarea";
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
// import * as z from "zod";
// import { deliveryFormSchema } from "@/zod/schema";

// // Dynamic import of PaystackButton to prevent SSR issues
// const PaystackButton = dynamic(
//   () => import("react-paystack").then((mod) => mod.PaystackButton),
//   {
//     ssr: false,
//     loading: () => <Button className="flex-1">Loading Payment...</Button>,
//   }
// );


// export default function CheckoutPage() {
//   const [currentStep, setCurrentStep] = useState("delivery");
//   const [deliveryMethod, setDeliveryMethod] = useState("standard");
//   const [paymentMethod, setPaymentMethod] = useState("online");
//   const [isClient, setIsClient] = useState(false);
//   const [selectedState, setSelectedState] = useState<string>("");
//   const [availableLgas, setAvailableLgas] = useState<string[]>([]);
//   const [states, setStates] = useState<string[]>([]);
//   const router = useRouter();

//   // Form resolver for customer info and address
//   const {
//     form: {
//       register,
//       handleSubmit,
//       control,
//       errors,
//       watch,
//       setValue,
//       getValues,
//     },
//   } = useFormResolver(
//     async (data) => {
//       console.log("Customer delivery data:", data);
//       // Handle form submission here
//       return data;
//     },
//     deliveryFormSchema
//   );

//   const searchParams = useSearchParams();
//   const platform = searchParams.get("platform");
//   const { orderSummary } = useProductStore();

//   // Get cart items from Zustand or fallback to sample data
//   const cartItems = orderSummary?.items || [
//     {
//       id: "1",
//       name: "Traditional Ankara Fabric Blouse",
//       price: 12500,
//       quantity: 1,
//       image: "/placeholder.svg?height=80&width=80",
//       seller: "Adire Textiles",
//     },
//     {
//       id: "2",
//       name: "Handcrafted Leather Sandals",
//       price: 8700,
//       quantity: 2,
//       image: "/placeholder.svg?height=80&width=80",
//       seller: "Lagos Leatherworks",
//     },
//   ];

//   // Calculate totals from Zustand or fallback calculation
//   const subtotal =
//     orderSummary?.subtotal ||
//     cartItems.reduce((sum, item) => sum + item.price * item.quantity, 0);

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

//   // Calculate delivery fee based on method
//   const getDeliveryFee = () => {
//     switch (deliveryMethod) {
//       case "express":
//         return 3000;
//       case "standard":
//         return 1500;
//       case "pickup":
//         return 0;
//       default:
//         return 1500;
//     }
//   };

//   const deliveryFee = getDeliveryFee();
//   const total = subtotal + deliveryFee;

//   // Initialize states and form data
//   useEffect(() => {
//     setIsClient(true);
    
//     // Initialize Nigerian states
//     try {
//       const statesData = NaijaStates.states();
//       if (Array.isArray(statesData)) {
//         const stateNames = statesData
//           .map((state: any) => {
//             return typeof state === "string" ? state : state.state || state.name;
//           })
//           .filter(Boolean);
//         setStates(stateNames);
//       }
//     } catch (error) {
//       console.error("Error fetching states:", error);
//       setStates([]);
//     }

//     // Set default customer info if needed
//     setValue("customerInfo.name", "");
//     setValue("customerInfo.email", "");
//     setValue("customerInfo.phone", "");
//   }, [setValue]);

//   // Watch state changes to update LGAs
//   const watchedState = watch("customerAddress.state");

//   useEffect(() => {
//     if (watchedState && watchedState !== selectedState) {
//       setSelectedState(watchedState);
//       const lgas = getLgasForState(watchedState);
//       setAvailableLgas(lgas);
//       // Reset LGA selection when state changes
//       setValue("customerAddress.lga", "");
//     }
//   }, [watchedState, selectedState, setValue]);

//   // Get current form values for Paystack
//   const currentCustomerInfo = getValues("customerInfo");
//   const currentCustomerAddress = getValues("customerAddress");

//   // Paystack configuration
//   const paystackConfig = {
//     email: currentCustomerInfo?.email || "",
//     amount: total * 100, // Paystack expects amount in kobo
//     metadata: {
//       name: currentCustomerInfo?.name || "",
//       phone: currentCustomerInfo?.phone || "",
//       address: currentCustomerAddress ? 
//         `${currentCustomerAddress.streetAddress}, ${currentCustomerAddress.lga}, ${currentCustomerAddress.state}` : "",
//       custom_fields: [
//         {
//           display_name: "Order Items",
//           variable_name: "order_items",
//           value: cartItems
//             .map((item) => `${item.name} x${item.quantity}`)
//             .join(", "),
//       },
//     ],
//   },
//   publicKey: "pk_test_eff9334b69c4057bd0b89b293824020426f0d011",
//   text: "Place Order",
//   onSuccess: (reference) => {
//     alert(`Payment successful! Reference: ${reference.reference}`);
//     console.log("Payment successful:", reference);
//   },
//   onClose: () => {
//     alert("Payment cancelled");
//   },
// };

//   // Format price in Naira
//   const formatPrice = (price) => {
//     return `₦${price.toLocaleString()}`;
//   };

//   const goToNextStep = () => {
//     if (currentStep === "delivery") setCurrentStep("review");
//   };

//   const goToPreviousStep = () => {
//     if (currentStep === "review") setCurrentStep("delivery");
//   };

//   const handleCashOnDeliveryOrder = () => {
//     // Handle cash on delivery order
//     alert("Order placed successfully! You will pay on delivery.");
//     console.log("Cash on delivery order placed");
//     // Here you would typically send the order to your backend
//   };

//   const renderPlaceOrderButton = () => {
//     if (paymentMethod === "cash") {
//       return (
//         <Button className="flex-1" onClick={handleCashOnDeliveryOrder}>
//           Place Order (Pay on Delivery)
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

//       <div className="container mx-auto px-4 py-4 md:py-8 max-w-7xl">
//         <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 lg:gap-8">
//           <div className="lg:col-span-2">
//             {currentStep === "delivery" && (
//               <Card>
//                 <CardContent className="p-4 md:p-6">
//                   <h2 className="text-xl font-semibold mb-4">Delivery Information</h2>

//                   <div className="space-y-6">
//                     {/* Customer Information */}
//                     <div>
//                       <h3 className="font-medium mb-3">Customer Information</h3>
//                       <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
//                         <div className="space-y-2">
//                           <Label htmlFor="customerName">
//                             Full Name <span className="text-red-500">*</span>
//                           </Label>
//                           <Input
//                             id="customerName"
//                             {...register("customerInfo.name")}
//                             placeholder="Enter your full name"
//                             className={errors.customerInfo?.name ? "border-red-500" : ""}
//                           />
//                           {errors.customerInfo?.name && (
//                             <p className="text-sm text-red-600">
//                               {errors.customerInfo.name.message}
//                             </p>
//                           )}
//                         </div>

//                         <div className="space-y-2">
//                           <Label htmlFor="customerEmail">
//                             Email Address <span className="text-red-500">*</span>
//                           </Label>
//                           <Input
//                             id="customerEmail"
//                             type="email"
//                             {...register("customerInfo.email")}
//                             placeholder="Enter your email address"
//                             className={errors.customerInfo?.email ? "border-red-500" : ""}
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
//                             {...register("customerInfo.phone")}
//                             placeholder="Enter your phone number"
//                             className={errors.customerInfo?.phone ? "border-red-500" : ""}
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
                      
//                       {/* Street Address */}
//                       <div className="space-y-4">
//                         <div className="space-y-2">
//                           <Label htmlFor="streetAddress">
//                             Street Address <span className="text-red-500">*</span>
//                           </Label>
//                           <Textarea
//                             id="streetAddress"
//                             {...register("customerAddress.streetAddress")}
//                             rows={3}
//                             className={errors.customerAddress?.streetAddress ? "border-red-500" : ""}
//                             placeholder="Enter your full street address including house number, street name, and area"
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
//                               <Select value={field.value} onValueChange={field.onChange}>
//                                 <SelectTrigger id="state">
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
//                             Local Government Area <span className="text-red-500">*</span>
//                           </Label>
//                           <Controller
//                             name="customerAddress.lga"
//                             control={control}
//                             render={({ field }) => (
//                               <Select
//                                 value={field.value}
//                                 onValueChange={field.onChange}
//                                 disabled={!selectedState || availableLgas.length === 0}
//                               >
//                                 <SelectTrigger id="lga">
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
//                             Directions <span className="text-gray-500">(Optional)</span>
//                           </Label>
//                           <Textarea
//                             id="directions"
//                             {...register("customerAddress.directions")}
//                             rows={3}
//                             className={errors.customerAddress?.directions ? "border-red-500" : ""}
//                             placeholder="Additional directions to help locate your address (e.g., landmarks, building descriptions)"
//                           />
//                           {errors.customerAddress?.directions && (
//                             <p className="text-sm text-red-600">
//                               {errors.customerAddress.directions.message}
//                             </p>
//                           )}
//                         </div>
//                       </div>
//                     </div>

//                     <Separator />

//                     <div>
//                       <h3 className="font-medium mb-3">Payment Method</h3>

//                       <RadioGroup
//                         value={paymentMethod}
//                         onValueChange={setPaymentMethod}
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
//                       />
//                     </div>
//                   </div>

//                   <div className="mt-6">
//                     <Button className="w-full" onClick={goToNextStep}>
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
//                         {cartItems.map((item) => (
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
//                                 {item.name}
//                                 {item.variationName && (
//                                   <span className="text-muted-foreground ml-2">
//                                     ({item.variationName})
//                                   </span>
//                                 )}
//                               </h4>
//                               {/* Don't display seller name on review page */}
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
//                             {currentCustomerInfo?.name || "Customer Name"}
//                             <br />
//                             {currentCustomerAddress?.streetAddress || "Street Address"}
//                             {currentCustomerAddress?.directions && (
//                               <>
//                                 <br />
//                                 <span className="text-muted-foreground">
//                                   Directions: {currentCustomerAddress.directions}
//                                 </span>
//                               </>
//                             )}
//                             <br />
//                             {currentCustomerAddress?.lga}, {currentCustomerAddress?.state}
//                             <br />
//                             {currentCustomerInfo?.phone || "Phone Number"}
//                           </p>
//                           <div className="flex items-center mt-2">
//                             <Truck className="h-4 w-4 text-muted-foreground mr-1 flex-shrink-0" />
//                             <span className="text-sm text-muted-foreground">
//                               {deliveryMethod === "standard" &&
//                                 "Standard Delivery (2-4 business days)"}
//                               {deliveryMethod === "express" &&
//                                 "Express Delivery (1-2 business days)"}
//                               {deliveryMethod === "pickup" && "Store Pickup"}
//                             </span>
//                           </div>
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
//                         Subtotal ({cartItems.length} items)
//                       </span>
//                       <span className="text-sm">{formatPrice(subtotal)}</span>
//                     </div>
//                     <div className="flex justify-between">
//                       <span className="text-muted-foreground text-sm">
//                         Delivery Fee
//                       </span>
//                       <span className="text-sm">
//                         {deliveryFee === 0 ? "Free" : formatPrice(deliveryFee)}
//                       </span>
//                     </div>
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
//                       <p>Free delivery on orders above ₦10,000</p>
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

import { Badge } from "@/components/ui/badge";
import { useState, useEffect } from "react";
import dynamic from "next/dynamic";
import Image from "next/image";
import { useRouter, useSearchParams } from "next/navigation";
import {
  CreditCard,
  Truck,
  MapPin,
  Plus,
  Banknote,
  ArrowLeft,
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
import * as z from "zod";
import { deliveryFormSchema } from "@/zod/schema";

// Dynamic import of PaystackButton to prevent SSR issues
const PaystackButton = dynamic(
  () => import("react-paystack").then((mod) => mod.PaystackButton),
  {
    ssr: false,
    loading: () => <Button className="flex-1">Loading Payment...</Button>,
  }
);

export default function CheckoutPage() {
  const [currentStep, setCurrentStep] = useState("delivery");
  const [deliveryMethod, setDeliveryMethod] = useState("standard");
  const [paymentMethod, setPaymentMethod] = useState("online");
  const [isClient, setIsClient] = useState(false);
  const [selectedState, setSelectedState] = useState<string>("");
  const [availableLgas, setAvailableLgas] = useState<string[]>([]);
  const [states, setStates] = useState<string[]>([]);
  const router = useRouter();

  // Form resolver for customer info and address
  const {
    form: {
      register,
      handleSubmit,
      control,
      errors,
      watch,
      setValue,
      trigger,
      formState: { isValid },
    },
  } = useFormResolver(async (data) => {
    console.log("Customer delivery data:", data);
    // Handle form submission here
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

  // Calculate totals from Zustand or fallback calculation
  const subtotal =
    orderSummary?.subtotal ||
    cartItems.reduce((sum, item) => sum + item.price * item.quantity, 0);

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

  // Calculate delivery fee based on method
  const getDeliveryFee = () => {
    switch (deliveryMethod) {
      case "express":
        return 3000;
      case "standard":
        return 1500;
      case "pickup":
        return 0;
      default:
        return 1500;
    }
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

    // Set default customer info if needed
    setValue("customerInfo.name", "");
    setValue("customerInfo.email", "");
    setValue("customerInfo.phone", "");
  }, [setValue]);

  // Watch state changes to update LGAs
  const watchedState = watch("customerAddress.state");

  useEffect(() => {
    if (watchedState && watchedState !== selectedState) {
      setSelectedState(watchedState);
      const lgas = getLgasForState(watchedState);
      setAvailableLgas(lgas);
      // Reset LGA selection when state changes
      setValue("customerAddress.lga", "");
    }
  }, [watchedState, selectedState, setValue]);

  // Watch form values for Paystack using watch
  const watchedCustomerInfo = watch("customerInfo");
  const watchedCustomerAddress = watch("customerAddress");

  // Paystack configuration
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
    text: "Place Order",
    onSuccess: (reference) => {
      alert(`Payment successful! Reference: ${reference.reference}`);
      console.log("Payment successful:", reference);
    },
    onClose: () => {
      alert("Payment cancelled");
    },
  };

  // Format price in Naira
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

  const handleCashOnDeliveryOrder = () => {
    // Handle cash on delivery order
    alert("Order placed successfully! You will pay on delivery.");
    console.log("Cash on delivery order placed");
    // Here you would typically send the order to your backend
  };

  const renderPlaceOrderButton = () => {
    if (paymentMethod === "cash") {
      return (
        <Button className="flex-1" onClick={handleCashOnDeliveryOrder}>
          Place Order (Pay on Delivery)
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
                            {...register("customerInfo.name")}
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
                            {...register("customerInfo.email")}
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
                            {...register("customerInfo.phone")}
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
                            {...register("customerAddress.streetAddress")}
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
                                onValueChange={field.onChange}
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
                                onValueChange={field.onChange}
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
                            {...register("customerAddress.directions")}
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
                      </div>
                    </div>

                    <Separator />

                    <div>
                      <h3 className="font-medium mb-3">Payment Method</h3>

                      <RadioGroup
                        value={paymentMethod}
                        onValueChange={setPaymentMethod}
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
                            {watchedCustomerInfo?.name || "Customer Name"}
                            <br />
                            {watchedCustomerAddress?.streetAddress ||
                              "Street Address"}
                            {watchedCustomerAddress?.directions && (
                              <>
                                <br />
                                <span className="text-muted-foreground">
                                  Directions:{" "}
                                  {watchedCustomerAddress.directions}
                                </span>
                              </>
                            )}
                            <br />
                            {watchedCustomerAddress?.lga},{" "}
                            {watchedCustomerAddress?.state}
                            <br />
                            {watchedCustomerInfo?.phone || "Phone Number"}
                          </p>
                          <div className="flex items-center mt-2">
                            <Truck className="h-4 w-4 text-muted-foreground mr-1 flex-shrink-0" />
                            <span className="text-sm text-muted-foreground">
                              {deliveryMethod === "standard" &&
                                "Standard Delivery (2-4 business days)"}
                              {deliveryMethod === "express" &&
                                "Express Delivery (1-2 business days)"}
                              {deliveryMethod === "pickup" && "Store Pickup"}
                            </span>
                          </div>
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
                    <div className="flex justify-between">
                      <span className="text-muted-foreground text-sm">
                        Delivery Fee
                      </span>
                      <span className="text-sm">
                        {deliveryFee === 0 ? "Free" : formatPrice(deliveryFee)}
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