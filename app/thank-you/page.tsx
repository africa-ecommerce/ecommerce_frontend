




"use client";
import { useEffect, useState } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
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

  const { plugBusinessName, plugStore, buyerName } = orderData;

  return (
    <div className="min-h-screen bg-gradient-to-br from-background via-secondary/20 to-accent/10 relative overflow-hidden">
      {/* Animated Background Elements */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-20 left-10 w-20 h-20 bg-primary/10 rounded-full animate-float"></div>
        <div className="absolute top-40 right-20 w-16 h-16 bg-accent/10 rounded-full animate-bounce-gentle animate-delay-150"></div>
        <div className="absolute bottom-32 left-20 w-12 h-12 bg-primary/20 rounded-full animate-pulse-subtle animate-delay-300"></div>
        <div className="absolute bottom-20 right-10 w-24 h-24 bg-accent/5 rounded-full animate-glow"></div>
      </div>

      <div
        className={`relative z-10 flex items-center justify-center min-h-screen p-4 transition-all duration-1000 ${
          isVisible ? "animate-fade-in" : "opacity-0"
        }`}
      >
        <div className="max-w-4xl w-full space-y-8">
          {/* Success Header */}
          <div className="text-center space-y-6">
            <div className="relative inline-block">
              <div className="absolute inset-0 bg-primary/20 rounded-full animate-primary-pulse"></div>
              <div className="relative bg-primary rounded-full p-8 shadow-2xl">
                <CheckCircle className="h-20 w-20 text-primary-foreground animate-scale-in" />
              </div>
            </div>

            <div className="space-y-2 animate-slide-up">
              <Badge
                variant="secondary"
                className="text-sm font-medium px-4 py-2"
              >
                <Sparkles className="h-4 w-4 mr-2" />
                Order Confirmed
              </Badge>
              <h1 className="text-4xl md:text-6xl font-bold bg-gradient-to-r from-primary via-accent to-primary bg-clip-text text-transparent animate-slide-in-right">
                Thank You!
              </h1>
              <p className="text-xl text-muted-foreground animate-slide-in-left">
                Your order has been successfully placed
              </p>
            </div>
          </div>

          {/* Main Content Grid */}
          <div className="grid md:grid-cols-2 gap-8">
            {/* Personal Message Card */}
            <Card className="bg-card/80 backdrop-blur-sm border-border/50 shadow-xl hover:shadow-2xl transition-all duration-300 animate-slide-in-left">
              <CardContent className="p-8">
                <div className="space-y-6">
                  <div className="flex items-center space-x-3">
                    <div className="bg-primary/10 p-3 rounded-full">
                      <Heart className="h-6 w-6 text-primary animate-pulse-subtle" />
                    </div>
                    <h2 className="text-2xl font-bold text-foreground">
                      Personal Message
                    </h2>
                  </div>

                  <div className="space-y-4 text-muted-foreground">
                    <p className="text-lg leading-relaxed">
                      Dear{" "}
                      <span className="font-semibold text-primary">
                        {buyerName}
                      </span>
                      , thank you for choosing{" "}
                      <span className="font-bold text-accent">
                        {plugBusinessName}
                      </span>
                      !
                    </p>

                    <div className="bg-accent/10 rounded-lg p-4 border-l-4 border-accent">
                      <p className="text-accent-foreground">
                        Your trust means everything to us. We've crafted each
                        product with care and attention to detail, ensuring you
                        receive something truly special.
                      </p>
                    </div>

                    <div className="flex items-start space-x-3 bg-primary/5 rounded-lg p-4">
                      <Star className="h-5 w-5 text-primary mt-0.5 flex-shrink-0" />
                      <p className="text-sm">
                        You're now part of our community of satisfied customers
                        who've discovered what makes our products exceptional.
                        We're confident you'll love your purchase!
                      </p>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Order Status Card */}
            <Card className="bg-card/80 backdrop-blur-sm border-border/50 shadow-xl hover:shadow-2xl transition-all duration-300 animate-slide-in-right">
              <CardContent className="p-8">
                <div className="space-y-6">
                  <div className="flex items-center space-x-3">
                    <div className="bg-accent/10 p-3 rounded-full">
                      <Package className="h-6 w-6 text-accent animate-bounce-gentle" />
                    </div>
                    <h2 className="text-2xl font-bold text-foreground">
                      Order Status
                    </h2>
                  </div>

                  <div className="space-y-4">
                    <div className="flex items-center space-x-4 p-4 bg-primary/5 rounded-lg border border-primary/20">
                      <div className="bg-primary/20 p-2 rounded-full">
                        <Truck className="h-5 w-5 text-primary" />
                      </div>
                      <div className="flex-1">
                        <p className="font-semibold text-foreground">
                          Preparing for Delivery
                        </p>
                        <p className="text-sm text-muted-foreground">
                          Your order is being carefully prepared
                        </p>
                      </div>
                      <Badge
                        variant="secondary"
                        className="bg-primary/10 text-primary border-primary/20"
                      >
                        Active
                      </Badge>
                    </div>

                    <div className="flex items-center space-x-4 p-4 bg-muted/30 rounded-lg">
                      <div className="bg-muted p-2 rounded-full">
                        <Clock className="h-5 w-5 text-muted-foreground" />
                      </div>
                      <div className="flex-1">
                        <p className="font-semibold text-muted-foreground">
                          Estimated Delivery
                        </p>
                        <p className="text-sm text-muted-foreground">
                          We'll notify you with tracking details soon
                        </p>
                      </div>
                    </div>

                    {/* New Tracking ID Information */}
                    <div className="bg-gradient-to-r from-blue-50 to-indigo-50 dark:from-blue-950/30 dark:to-indigo-950/30 rounded-lg p-4 border border-blue-200/50 dark:border-blue-800/50">
                      <div className="flex items-start space-x-3">
                        <div className="bg-blue-100 dark:bg-blue-900/50 p-2 rounded-full">
                          <Mail className="h-5 w-5 text-blue-600 dark:text-blue-400" />
                        </div>
                        <div className="flex-1">
                          <p className="font-semibold text-blue-900 dark:text-blue-100 mb-1">
                            Tracking ID Coming Soon
                          </p>
                          <p className="text-sm text-blue-700 dark:text-blue-300 leading-relaxed">
                            Once your order is actively processed, you'll
                            receive a unique tracking ID via email. This will
                            allow you to monitor your package's journey in
                            real-time.
                          </p>
                        </div>
                        <MapPin className="h-4 w-4 text-blue-500 mt-1 animate-pulse-subtle" />
                      </div>
                    </div>
                  </div>

                  <div className="bg-accent/10 rounded-lg p-4 text-center">
                    <Gift className="h-8 w-8 text-accent mx-auto mb-2 animate-pulse-subtle" />
                    <p className="text-sm text-accent-foreground font-medium">
                      Packaged with extra care and attention to detail
                    </p>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Store Promotion Card */}
          {plugStore && (
            <Card className="bg-gradient-to-r from-primary/10 via-accent/10 to-primary/10 border-primary/20 shadow-xl animate-slide-up">
              <CardContent className="p-8">
                <div className="text-center space-y-6">
                  <div className="flex items-center justify-center space-x-3">
                    <Sparkles className="h-6 w-6 text-primary animate-spin-slow" />
                    <h3 className="text-2xl font-bold text-foreground">
                      Discover More Amazing Products
                    </h3>
                    <Sparkles className="h-6 w-6 text-accent animate-spin-slow-reverse" />
                  </div>

                  <p className="text-muted-foreground max-w-2xl mx-auto leading-relaxed">
                    While you wait for your order, explore our complete
                    collection and discover more incredible products that could
                    be perfect for you or your loved ones.
                  </p>

                  <Button
                    onClick={() => window.open(plugStore, "_blank")}
                    size="lg"
                    className="bg-gradient-to-r from-primary to-accent hover:from-primary/90 hover:to-accent/90 text-primary-foreground font-semibold px-8 py-4 rounded-full shadow-lg hover:shadow-xl transform hover:scale-105 transition-all duration-300 group"
                  >
                    <ExternalLink className="h-5 w-5 mr-3 group-hover:rotate-12 transition-transform" />
                    Visit Our Store
                    <ArrowRight className="h-5 w-5 ml-3 group-hover:translate-x-1 transition-transform" />
                  </Button>
                </div>
              </CardContent>
            </Card>
          )}
          <div className="text-center space-y-4 animate-fade-in">
            <div className="flex items-center justify-center space-x-2 text-muted-foreground">
              <Heart className="h-4 w-4 text-destructive animate-pulse-subtle" />
              <p className="text-sm">
                Made with love by the{" "}
                <span className="font-semibold text-primary">
                  {plugBusinessName}
                </span>{" "}
                team
              </p>
            </div>
            <p className="text-xs text-muted-foreground">
              Questions? We're here to help!
              <a
                href="/support"
                className="text-primary hover:text-accent transition-colors ml-1 underline underline-offset-2"
              >
                Contact our support team
              </a>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}