


"use client";

import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import {
  AlertTriangle,
  Phone,
  MessageCircle,
  Clock,
  Heart,
} from "lucide-react";

export default function OrderIssuePage() {
  const customerCareNumber = "09151425001";

  const handleWhatsAppClick = () => {
    const message = encodeURIComponent(
      "Hello, I need help with my order. Could you please assist me?"
    );
    const whatsappUrl = `https://wa.me/${customerCareNumber}?text=${message}`;
    window.open(whatsappUrl, "_blank");
  };

  const handlePhoneCall = () => {
    window.location.href = `tel:${customerCareNumber}`;
  };

  return (
    <div className="h-screen bg-gradient-to-br from-background via-background to-muted/20 flex items-center justify-center p-3 overflow-hidden">
      <div className="w-full max-w-lg mx-auto max-h-full overflow-y-auto">
        {/* Main Error Card */}
        <Card className="border-destructive/20 shadow-lg animate-slide-up">
          <CardContent className="p-6 text-center space-y-4">
            {/* Error Icon */}
            <div className="flex justify-center">
              <div className="relative">
                <div className="absolute inset-0 bg-destructive/20 rounded-full animate-pulse-gentle"></div>
                <div className="relative bg-destructive/10 p-3 rounded-full">
                  <AlertTriangle className="h-8 w-8 text-destructive animate-bounce-gentle" />
                </div>
              </div>
            </div>

            {/* Main Message */}
            <div className="space-y-2">
              <h1 className="text-2xl font-bold text-foreground">
                Oops! Something went wrong
              </h1>
              <p className="text-sm text-muted-foreground leading-relaxed">
                We apologize for the inconvenience with your order. Our team is
                here to help resolve this quickly.
              </p>
            </div>

            {/* Appreciation Message */}
            <div className="bg-primary/5 border border-primary/20 rounded-lg p-3 animate-fade-in">
              <div className="flex items-center justify-center gap-2 mb-1">
                <Heart className="h-4 w-4 text-primary" />
                <span className="text-sm font-semibold text-primary">
                  Thank you for your patience
                </span>
              </div>
              <p className="text-xs text-muted-foreground">
                We appreciate your understanding while we make this right.
              </p>
            </div>

            {/* Contact Section */}
            <div className="space-y-3">
              <h2 className="text-lg font-semibold text-foreground">
                Let's get this sorted out
              </h2>

              {/* Phone Number Display */}
              <div className="bg-card border rounded-lg p-3">
                <div className="flex items-center justify-center gap-2 mb-1">
                  <Phone className="h-4 w-4 text-primary" />
                  <span className="text-xs font-medium text-muted-foreground">
                    Customer Care
                  </span>
                </div>
                <div className="text-xl font-bold text-foreground tracking-wider">
                  {customerCareNumber}
                </div>
              </div>

              {/* Action Buttons */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <Button
                  onClick={handleWhatsAppClick}
                  className="h-12 text-sm font-semibold bg-green-600 hover:bg-green-700 text-white transition-all duration-200 hover:scale-105"
                >
                  <MessageCircle className="h-4 w-4 mr-2" />
                  Chat on WhatsApp
                </Button>

                <Button
                  onClick={handlePhoneCall}
                  variant="outline"
                  className="h-12 text-sm font-semibold border-2 hover:bg-primary hover:text-primary-foreground transition-all duration-200 hover:scale-105"
                >
                  <Phone className="h-4 w-4 mr-2" />
                  Call Now
                </Button>
              </div>
            </div>

            {/* Support Hours */}
            <div className="bg-muted/50 rounded-lg p-3 animate-fade-in">
              <div className="flex items-center justify-center gap-2 mb-1">
                <Clock className="h-4 w-4 text-muted-foreground" />
                <span className="text-xs font-medium text-muted-foreground">
                  Support Hours
                </span>
              </div>
              <p className="text-xs text-muted-foreground">
                Monday - Sunday: 9:00 AM - 9:00 PM
              </p>
            </div>

            {/* What happens next - Compact version */}
            <div className="bg-card border rounded-lg p-3">
              <h3 className="text-sm font-semibold text-foreground mb-2">
                What happens next?
              </h3>
              <div className="space-y-2 text-xs text-muted-foreground">
                <div className="flex items-start gap-2">
                  <div className="w-1.5 h-1.5 bg-primary rounded-full mt-1.5 flex-shrink-0"></div>
                  <p>Our team will assist you immediately</p>
                </div>
                <div className="flex items-start gap-2">
                  <div className="w-1.5 h-1.5 bg-primary rounded-full mt-1.5 flex-shrink-0"></div>
                  <p>We'll investigate and provide a quick resolution</p>
                </div>
                <div className="flex items-start gap-2">
                  <div className="w-1.5 h-1.5 bg-primary rounded-full mt-1.5 flex-shrink-0"></div>
                  <p>You'll receive updates until resolved</p>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}