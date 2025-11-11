

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




  return (
    <div className="min-h-screen bg-gradient-to-br from-background via-secondary/20 to-accent/10 relative overflow-hidden">
      {/* Minimal Background Elements */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-20 left-10 w-16 h-16 bg-primary/5 rounded-full animate-float"></div>
        <div className="absolute bottom-20 right-10 w-20 h-20 bg-accent/5 rounded-full animate-glow"></div>
      </div>

      <div
        className="relative z-10 min-h-screen p-4 transition-all duration-700 
         animate-fade-in"
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
                Thanks for trusting us with this purchase.
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
                  You're now part of the family. We can't wait for you to experience what makes us
                  special.
                </p>
              </div>
            </CardContent>
          </Card>

          
         

         
        </div>
      </div>
    </div>
  );
}