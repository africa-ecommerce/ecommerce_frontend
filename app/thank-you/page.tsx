// "use client";
// import { useEffect, useState } from "react";
// import { useRouter, useSearchParams } from "next/navigation";
// import { Card, CardContent } from "@/components/ui/card";
// import { Button } from "@/components/ui/button";
// import {
//   CheckCircle,
//   Heart,
//   ExternalLink,
//   ArrowRight,
//   Sparkles,
//   Truck,
//   Package,
//   Clock,
//   Star,
//   Gift,
//   Mail,
//   MapPin,
//   Share2,
//   MessageCircle,
//   CreditCard,
//   Banknote,
// } from "lucide-react";

// export default function ThankYouPage() {
//   const [orderData, setOrderData] = useState(null);
//   const [isVisible, setIsVisible] = useState(false);
//   const router = useRouter();
//   const searchParams = useSearchParams();

//   useEffect(() => {
//     // Get order data from session storage or URL params
//     const storedOrderData = sessionStorage.getItem("orderSuccess");
//     if (storedOrderData) {
//       setOrderData(JSON.parse(storedOrderData));
//       // Clear the data after retrieving it
//       sessionStorage.removeItem("orderSuccess");
//       // Trigger entrance animation
//       setTimeout(() => setIsVisible(true), 100);
//     } else {
//       // If no data found, redirect to home
//       router.push("/");
//     }
//   }, [router]);

//   if (!orderData) {
//     return (
//       <div className="min-h-screen flex items-center justify-center bg-background">
//         <div className="flex flex-col items-center space-y-4">
//           <div className="animate-spin rounded-full h-12 w-12 border-2 border-primary border-t-transparent"></div>
//           <p className="text-muted-foreground animate-pulse-gentle">
//             Loading your success page...
//           </p>
//         </div>
//       </div>
//     );
//   }

//   const { plugBusinessName, plugStore, buyerName, paymentMethod, deliveryType } = orderData;

//   return (
//     <div className="min-h-screen bg-gradient-to-br from-background via-secondary/20 to-accent/10 relative overflow-hidden">
//       {/* Minimal Background Elements */}
//       <div className="absolute inset-0 overflow-hidden pointer-events-none">
//         <div className="absolute top-20 left-10 w-16 h-16 bg-primary/5 rounded-full animate-float"></div>
//         <div className="absolute bottom-20 right-10 w-20 h-20 bg-accent/5 rounded-full animate-glow"></div>
//       </div>

//       <div
//         className={`relative z-10 min-h-screen p-4 transition-all duration-700 ${
//           isVisible ? "animate-fade-in" : "opacity-0"
//         }`}
//       >
//         <div className="max-w-lg mx-auto pt-8 pb-12 space-y-6">
//           {/* Success Header - Mobile Optimized */}
//           <div className="text-center space-y-4">
//             <div className="relative inline-block">
//               <div className="bg-green-500 rounded-full p-6 shadow-lg">
//                 <CheckCircle className="h-12 w-12 text-white" />
//               </div>
//             </div>

//             <div className="space-y-2">
//               <h1 className="text-3xl font-bold text-foreground">
//                 Order Confirmed!
//               </h1>
//               <p className="text-muted-foreground">
//                 Thanks for trusting{" "}
//                 <span className="font-bold capitalize">{plugBusinessName}</span>{" "}
//                 with this purchase,{" "}
//                 <span className="font-bold capitalize">{buyerName}</span>.
//               </p>
//             </div>
//           </div>

//           {/* Key Message Card - Scannable */}
//           <Card className="bg-card shadow-lg border border-green-200/50">
//             <CardContent className="p-6">
//               <div className="space-y-4">
//                 <div className="flex items-start space-x-3">
//                   <div className="bg-green-100 p-2 rounded-full flex-shrink-0 mt-1">
//                     <Package className="h-5 w-5 text-green-600" />
//                   </div>
//                   <div className="space-y-2">
//                     <h2 className="font-semibold text-foreground text-lg">
//                       Your order is being prepared
//                     </h2>
//                     <p className="text-muted-foreground text-sm leading-relaxed">
//                       We're handpicking and packing your items with care.
//                      You'll be notified when it's ready for delivery.
//                     </p>
//                   </div>
//                 </div>

//                 {/* Quick Status */}
               
//               </div>
//             </CardContent>
//           </Card>

//           {/* Cash Payment Instructions - Only show if payment method is cash */}
//           {paymentMethod === "cash" && (
//             <Card className="bg-orange-50 border border-orange-200 shadow-lg">
//               <CardContent className="p-6">
//                 <div className="space-y-4">
//                   <div className="flex items-start space-x-3">
//                     <div className="bg-orange-100 p-2 rounded-full flex-shrink-0 mt-1">
//                       <Banknote className="h-5 w-5 text-orange-600" />
//                     </div>
//                     <div className="space-y-2">
//                       <h2 className="font-semibold text-foreground text-lg">
//                         Cash Payment Instructions
//                       </h2>
//                       <p className="text-muted-foreground text-sm leading-relaxed">
//                         Since you selected cash payment, payment instructions
//                         including the account details for your order have been
//                         sent to your email.
//                       </p>
//                     </div>
//                   </div>

//                   {/* Payment Notice */}
//                   <div className="bg-orange-100 rounded-lg p-4 border-l-4 border-orange-400">
//                     <div className="flex items-start space-x-2">
//                       <Mail className="h-4 w-4 text-orange-600 mt-0.5" />
//                       <div className="space-y-1">
//                         <span className="text-sm font-medium text-orange-900 block">
//                           Payment account details sent to your email
//                         </span>
//                         <span className="text-xs text-orange-700">
//                           Check your email for the account number and payment
//                           instructions
//                         </span>
//                       </div>
//                     </div>
//                   </div>
//                 </div>
//               </CardContent>
//             </Card>
//           )}

//           {/* Social Proof & Trust */}
//           <Card className="bg-gradient-to-r from-primary/5 to-accent/5 border-primary/20">
//             <CardContent className="p-6">
//               <div className="text-center space-y-3">
//                 <div className="flex items-center justify-center space-x-2">
//                   <Star className="h-5 w-5 text-yellow-500 fill-current" />
//                   <span className="font-medium text-foreground">
//                     Join other happy customers
//                   </span>
//                 </div>
//                 <p className="text-sm text-muted-foreground">
//                   You're now part of the{" "}
//                   <span className="font-bold capitalize">
//                     {plugBusinessName}
//                   </span>{" "}
//                   family. We can't wait for you to experience what makes us
//                   special.
//                 </p>
//               </div>
//             </CardContent>
//           </Card>

//           {/* Store CTA - Prominent */}
//           {plugStore && (
//             <Card className="bg-gradient-to-r from-primary to-accent text-white shadow-xl">
//               <CardContent className="p-6">
//                 <div className="space-y-4">
//                   <div className="flex items-center space-x-2">
//                     <Sparkles className="h-5 w-5" />
//                     <h3 className="font-bold text-lg">
//                       While you wait, explore more
//                     </h3>
//                   </div>

//                   <p className="text-white/90 text-sm">
//                     Discover other amazing products from{" "}
//                     <span className="font-bold capitalize">
//                       {plugBusinessName}
//                     </span>{" "}
//                     that others are loving.
//                   </p>

//                   <Button
//                     onClick={() => window.open(plugStore, "_blank")}
//                     variant="secondary"
//                     size="lg"
//                     className="w-full bg-white text-primary hover:bg-gray-50 font-semibold group"
//                   >
//                     <ExternalLink className="h-4 w-4 mr-2 group-hover:rotate-12 transition-transform" />
//                     Browse Our Store
//                     <ArrowRight className="h-4 w-4 ml-2 group-hover:translate-x-1 transition-transform" />
//                   </Button>
//                 </div>
//               </CardContent>
//             </Card>
//           )}

//           {/* Quick Actions - Mobile Friendly */}
//           <div className="grid grid-cols-2 gap-3">
//             <Button
//               variant="outline"
//               size="sm"
//               className="flex items-center justify-center space-x-2 py-6"
//               onClick={() => {
//                 if (navigator.share) {
//                   navigator.share({
//                     title: `Just ordered from ${plugBusinessName}!`,
//                     text: "Check out this amazing store",
//                     url: plugStore || "",
//                   });
//                 }
//               }}
//             >
//               <Share2 className="h-4 w-4" />
//               <span className="text-sm">Share</span>
//             </Button>

//             <Button
//               variant="outline"
//               size="sm"
//               className="flex items-center justify-center space-x-2 py-6"
//               onClick={() => window.open("/help", "_blank")}
//             >
//               <MessageCircle className="h-4 w-4" />
//               <span className="text-sm">Get Help</span>
//             </Button>
//           </div>

//           {/* Footer - Minimal */}
//           <div className="text-center pt-4">
//             <p className="text-xs text-muted-foreground">
//               Questions? We're here to help 24/7
//             </p>
//           </div>
//         </div>
//       </div>
//     </div>
//   );
// }



"use client";
import { useEffect, useState } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import {
  CheckCircle,
  Heart,
  ExternalLink,
  ArrowRight,
  Sparkles,
  Truck,
  Package,
  Clock,
  Star,
  Gift,
  Mail,
  MapPin,
  Share2,
  MessageCircle,
  CreditCard,
  Banknote,
} from "lucide-react";

export default function ThankYouPage() {
  const [orderData, setOrderData] = useState(null);
  const [isVisible, setIsVisible] = useState(false);
  const router = useRouter();
  const searchParams = useSearchParams();

  useEffect(() => {
    // Get order data from session storage or URL params
    const storedOrderData = sessionStorage.getItem("orderSuccess");
    if (storedOrderData) {
      setOrderData(JSON.parse(storedOrderData));
      // Clear the data after retrieving it
      sessionStorage.removeItem("orderSuccess");
      // Trigger entrance animation
      setTimeout(() => setIsVisible(true), 100);
    } else {
      // If no data found, redirect to home
      router.push("/");
    }
  }, [router]);

  if (!orderData) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-background">
        <div className="flex flex-col items-center space-y-4">
          <div className="animate-spin rounded-full h-12 w-12 border-2 border-primary border-t-transparent"></div>
          <p className="text-muted-foreground animate-pulse-gentle">
            Loading your success page...
          </p>
        </div>
      </div>
    );
  }

  const { plugBusinessName, plugStore, buyerName, paymentMethod, deliveryType } = orderData;

  return (
    <div className="min-h-screen bg-gradient-to-br from-background via-secondary/20 to-accent/10 relative overflow-hidden">
      {/* Minimal Background Elements */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-20 left-10 w-16 h-16 bg-primary/5 rounded-full animate-float"></div>
        <div className="absolute bottom-20 right-10 w-20 h-20 bg-accent/5 rounded-full animate-glow"></div>
      </div>

      <div
        className={`relative z-10 min-h-screen p-4 transition-all duration-700 ${
          isVisible ? "animate-fade-in" : "opacity-0"
        }`}
      >
        <div className="max-w-lg mx-auto pt-8 pb-12 space-y-6">
          {/* Success Header - Mobile Optimized */}
          <div className="text-center space-y-4">
            <div className="relative inline-block">
              <div className="bg-green-500 rounded-full p-6 shadow-lg">
                <CheckCircle className="h-12 w-12 text-white" />
              </div>
            </div>

            <div className="space-y-2">
              <h1 className="text-3xl font-bold text-foreground">
                Order Confirmed!
              </h1>
              <p className="text-muted-foreground">
                Thanks for trusting{" "}
                <span className="font-bold capitalize">{plugBusinessName}</span>{" "}
                with this purchase,{" "}
                <span className="font-bold capitalize">{buyerName}</span>.
              </p>
            </div>
          </div>

          {/* Key Message Card - Scannable */}
          <Card className="bg-card shadow-lg border border-green-200/50">
            <CardContent className="p-6">
              <div className="space-y-4">
                <div className="flex items-start space-x-3">
                  <div className="bg-green-100 p-2 rounded-full flex-shrink-0 mt-1">
                    <Package className="h-5 w-5 text-green-600" />
                  </div>
                  <div className="space-y-2">
                    <h2 className="font-semibold text-foreground text-lg">
                      Your order is being prepared
                    </h2>
                    <p className="text-muted-foreground text-sm leading-relaxed">
                      We're handpicking and packing your items with care.
                     You'll be notified when it's ready for delivery.
                    </p>
                  </div>
                </div>

                {/* Quick Status */}
               
              </div>
            </CardContent>
          </Card>

          {/* Terminal Pickup Instructions - Only show if delivery type is terminal */}
          {deliveryType === "terminal" && (
            <Card className="bg-blue-50 border border-blue-200 shadow-lg">
              <CardContent className="p-6">
                <div className="space-y-4">
                  <div className="flex items-start space-x-3">
                    <div className="bg-blue-100 p-2 rounded-full flex-shrink-0 mt-1">
                      <MapPin className="h-5 w-5 text-blue-600" />
                    </div>
                    <div className="space-y-2">
                      <h2 className="font-semibold text-foreground text-lg">
                        Terminal Pickup Instructions
                      </h2>
                      <p className="text-muted-foreground text-sm leading-relaxed">
                        Since you chose terminal pickup, the complete terminal address 
                        and detailed pickup directions would be sent to your email inbox.
                      </p>
                    </div>
                  </div>

                  {/* Pickup Notice */}
                  <div className="bg-blue-100 rounded-lg p-4 border-l-4 border-blue-400">
                    <div className="flex items-start space-x-2">
                      <Mail className="h-4 w-4 text-blue-600 mt-0.5" />
                      <div className="space-y-1">
                        <span className="text-sm font-medium text-blue-900 block">
                          Terminal location and pickup details in your email soon
                        </span>
                        <span className="text-xs text-blue-700">
                          Please check your inbox for the exact terminal address, 
                          opening hours, and pickup instructions
                        </span>
                      </div>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          )}

          {/* Cash Payment Instructions - Only show if payment method is cash */}
          {paymentMethod === "cash" && (
            <Card className="bg-orange-50 border border-orange-200 shadow-lg">
              <CardContent className="p-6">
                <div className="space-y-4">
                  <div className="flex items-start space-x-3">
                    <div className="bg-orange-100 p-2 rounded-full flex-shrink-0 mt-1">
                      <Banknote className="h-5 w-5 text-orange-600" />
                    </div>
                    <div className="space-y-2">
                      <h2 className="font-semibold text-foreground text-lg">
                        Cash Payment Instructions
                      </h2>
                      <p className="text-muted-foreground text-sm leading-relaxed">
                        Since you selected cash payment, payment instructions
                        including the account details for your order have been
                        sent to your email.
                      </p>
                    </div>
                  </div>

                  {/* Payment Notice */}
                  <div className="bg-orange-100 rounded-lg p-4 border-l-4 border-orange-400">
                    <div className="flex items-start space-x-2">
                      <Mail className="h-4 w-4 text-orange-600 mt-0.5" />
                      <div className="space-y-1">
                        <span className="text-sm font-medium text-orange-900 block">
                          Payment account details sent to your email
                        </span>
                        <span className="text-xs text-orange-700">
                          Check your email for the account number and payment
                          instructions
                        </span>
                      </div>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          )}

          {/* Social Proof & Trust */}
          <Card className="bg-gradient-to-r from-primary/5 to-accent/5 border-primary/20">
            <CardContent className="p-6">
              <div className="text-center space-y-3">
                <div className="flex items-center justify-center space-x-2">
                  <Star className="h-5 w-5 text-yellow-500 fill-current" />
                  <span className="font-medium text-foreground">
                    Join other happy customers
                  </span>
                </div>
                <p className="text-sm text-muted-foreground">
                  You're now part of the{" "}
                  <span className="font-bold capitalize">
                    {plugBusinessName}
                  </span>{" "}
                  family. We can't wait for you to experience what makes us
                  special.
                </p>
              </div>
            </CardContent>
          </Card>

          {/* Store CTA - Prominent */}
          {plugStore && (
            <Card className="bg-gradient-to-r from-primary to-accent text-white shadow-xl">
              <CardContent className="p-6">
                <div className="space-y-4">
                  <div className="flex items-center space-x-2">
                    <Sparkles className="h-5 w-5" />
                    <h3 className="font-bold text-lg">
                      While you wait, explore more
                    </h3>
                  </div>

                  <p className="text-white/90 text-sm">
                    Discover other amazing products from{" "}
                    <span className="font-bold capitalize">
                      {plugBusinessName}
                    </span>{" "}
                    that others are loving.
                  </p>

                  <Button
                    onClick={() => window.open(plugStore, "_blank")}
                    variant="secondary"
                    size="lg"
                    className="w-full bg-white text-primary hover:bg-gray-50 font-semibold group"
                  >
                    <ExternalLink className="h-4 w-4 mr-2 group-hover:rotate-12 transition-transform" />
                    Browse Our Store
                    <ArrowRight className="h-4 w-4 ml-2 group-hover:translate-x-1 transition-transform" />
                  </Button>
                </div>
              </CardContent>
            </Card>
          )}

          {/* Quick Actions - Mobile Friendly */}
          <div className="grid grid-cols-2 gap-3">
            <Button
              variant="outline"
              size="sm"
              className="flex items-center justify-center space-x-2 py-6"
              onClick={() => {
                if (navigator.share) {
                  navigator.share({
                    title: `Just ordered from ${plugBusinessName}!`,
                    text: "Check out this amazing store",
                    url: plugStore || "",
                  });
                }
              }}
            >
              <Share2 className="h-4 w-4" />
              <span className="text-sm">Share</span>
            </Button>

            <Button
              variant="outline"
              size="sm"
              className="flex items-center justify-center space-x-2 py-6"
              onClick={() => window.open("/help", "_blank")}
            >
              <MessageCircle className="h-4 w-4" />
              <span className="text-sm">Get Help</span>
            </Button>
          </div>

          {/* Footer - Minimal */}
          <div className="text-center pt-4">
            <p className="text-xs text-muted-foreground">
              Questions? We're here to help 24/7
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}