"use client";
import { useEffect, useState } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { CheckCircle, Heart, ExternalLink, ArrowRight, Sparkles } from "lucide-react";

export default function ThankYouPage() {
  const [orderData, setOrderData] = useState(null);
  const router = useRouter();
  const searchParams = useSearchParams();

  useEffect(() => {
    // Get order data from session storage or URL params
    const storedOrderData = sessionStorage.getItem('orderSuccess');
    if (storedOrderData) {
      setOrderData(JSON.parse(storedOrderData));
      // Clear the data after retrieving it
      sessionStorage.removeItem('orderSuccess');
    } else {
      // If no data found, redirect to home
      router.push('/');
    }
  }, [router]);

  if (!orderData) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-primary"></div>
      </div>
    );
  }

  const { plugBussinessName, plugStore, buyerName } = orderData;

  return (
    <div className="min-h-screen bg-gradient-to-br from-green-50 via-blue-50 to-purple-50 flex items-center justify-center p-4">
      <div className="max-w-2xl w-full">
        {/* Success Animation */}
        <div className="text-center mb-8">
          <div className="relative inline-block">
            <div className="absolute inset-0 bg-green-100 rounded-full animate-ping opacity-75"></div>
            <div className="relative bg-green-500 rounded-full p-6">
              <CheckCircle className="h-16 w-16 text-white" />
            </div>
          </div>
        </div>

        {/* Main Thank You Card */}
        <Card className="bg-white/80 backdrop-blur-sm border-0 shadow-2xl">
          <CardContent className="p-8 md:p-12 text-center">
            <div className="flex items-center justify-center gap-2 mb-4">
              <Sparkles className="h-6 w-6 text-yellow-500" />
              <h1 className="text-3xl md:text-4xl font-bold bg-gradient-to-r from-green-600 to-blue-600 bg-clip-text text-transparent">
                Order Placed Successfully!
              </h1>
              <Sparkles className="h-6 w-6 text-yellow-500" />
            </div>

            <div className="space-y-6 text-gray-700">
              <div className="bg-gradient-to-r from-purple-100 to-pink-100 rounded-xl p-6">
                <p className="text-lg md:text-xl leading-relaxed">
                  Dear <span className="font-semibold text-purple-700">{buyerName}</span>, 
                  thank you for choosing <span className="font-bold text-blue-600">{plugBussinessName}</span>! 
                  🎉
                </p>
              </div>

              <div className="space-y-4 text-base md:text-lg">
                <div className="flex items-center justify-center gap-2">
                  <Heart className="h-5 w-5 text-red-500 fill-current" />
                  <p>
                    Your trust in our brand means the world to us, and we're confident 
                    you'll <span className="font-semibold text-green-600">absolutely love</span> your purchase!
                  </p>
                </div>

                <p className="bg-blue-50 rounded-lg p-4 border-l-4 border-blue-400">
                  We've put our heart and soul into creating quality products that bring joy and value to your life. 
                  Your satisfaction is our greatest reward, and we can't wait for you to experience what makes us special.
                </p>

                <div className="bg-yellow-50 rounded-lg p-4 border border-yellow-200">
                  <p className="font-medium text-yellow-800">
                    🚚 Your order is now being prepared with extra care and will be delivered to you soon!
                  </p>
                </div>
              </div>

              {/* Store Link Section */}
              {plugStore && (
                <div className="bg-gradient-to-r from-indigo-100 to-cyan-100 rounded-xl p-6 mt-8">
                  <h3 className="text-xl font-semibold text-indigo-800 mb-3">
                    Discover More Amazing Products
                  </h3>
                  <p className="text-indigo-700 mb-4">
                    While you wait for your order, explore our complete collection and discover 
                    more incredible products that could be perfect for you or your loved ones.
                  </p>
                  <Button 
                    onClick={() => window.open(plugStore, '_blank')}
                    className="bg-gradient-to-r from-indigo-600 to-cyan-600 hover:from-indigo-700 hover:to-cyan-700 text-white font-semibold px-6 py-3 rounded-lg shadow-lg transform hover:scale-105 transition-all duration-200"
                  >
                    <ExternalLink className="h-5 w-5 mr-2" />
                    Visit Our Store
                    <ArrowRight className="h-5 w-5 ml-2" />
                  </Button>
                </div>
              )}

              {/* Appreciation Message */}
              <div className="bg-gradient-to-r from-green-100 to-teal-100 rounded-xl p-6 mt-6">
                <h3 className="text-xl font-semibold text-green-800 mb-3">
                  You Made the Right Choice! ✨
                </h3>
                <p className="text-green-700">
                  By supporting <span className="font-bold">{plugBussinessName}</span>, you're not just getting a great product – 
                  you're joining a community of satisfied customers who've discovered something truly special. 
                  We promise you won't regret this decision!
                </p>
              </div>
            </div>

            {/* Action Buttons */}
            <div className="flex flex-col sm:flex-row gap-4 mt-8 pt-6 border-t border-gray-200">
              <Button 
                variant="outline" 
                onClick={() => router.push('/')}
                className="flex-1 py-3 text-gray-700 border-2 hover:bg-gray-50"
              >
                Continue Shopping
              </Button>
              <Button 
                onClick={() => router.push('/orders')}
                className="flex-1 py-3 bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700"
              >
                Track Your Order
              </Button>
            </div>

            {/* Footer Message */}
            <div className="mt-6 pt-6 border-t border-gray-200">
              <p className="text-sm text-gray-500">
                Questions? We're here to help! 
                <a href="/support" className="text-blue-600 hover:underline ml-1">
                  Contact our support team
                </a>
              </p>
            </div>
          </CardContent>
        </Card>

        {/* Additional Floating Elements */}
        <div className="absolute top-10 left-10 text-6xl opacity-20 animate-bounce">
          🎉
        </div>
        <div className="absolute bottom-10 right-10 text-4xl opacity-20 animate-pulse">
          ✨
        </div>
        <div className="absolute top-1/2 left-5 text-3xl opacity-20 animate-spin">
          🌟
        </div>
      </div>
    </div>
  );
}