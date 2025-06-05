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
    <div className="min-h-screen bg-gradient-to-br from-background via-background to-muted/20 flex items-center justify-center p-4">
      <div className="w-full max-w-2xl mx-auto">
        {/* Main Error Card */}
        <Card className="border-destructive/20 shadow-lg animate-slide-up">
          <CardContent className="p-8 text-center space-y-6">
            {/* Error Icon */}
            <div className="flex justify-center">
              <div className="relative">
                <div className="absolute inset-0 bg-destructive/20 rounded-full animate-pulse-gentle"></div>
                <div className="relative bg-destructive/10 p-4 rounded-full">
                  <AlertTriangle className="h-12 w-12 text-destructive animate-bounce-gentle" />
                </div>
              </div>
            </div>

            {/* Main Message */}
            <div className="space-y-3">
              <h1 className="text-3xl font-bold text-foreground">
                Oops! Something went wrong on our end
              </h1>
              <p className="text-lg text-muted-foreground leading-relaxed">
                We sincerely apologize for the inconvenience with your order.
                Our team is here to help resolve this issue as quickly as
                possible.
              </p>
            </div>

            {/* Appreciation Message */}
            <div className="bg-primary/5 border border-primary/20 rounded-lg p-4 animate-fade-in">
              <div className="flex items-center justify-center gap-2 mb-2">
                <Heart className="h-5 w-5 text-primary" />
                <span className="font-semibold text-primary">
                  Thank you for your patience
                </span>
              </div>
              <p className="text-sm text-muted-foreground">
                We truly appreciate your understanding while we work to make
                this right.
              </p>
            </div>

            {/* Contact Section */}
            <div className="space-y-4">
              <h2 className="text-xl font-semibold text-foreground">
                Let's get this sorted out together
              </h2>

              {/* Phone Number Display */}
              <div className="bg-card border rounded-lg p-4">
                <div className="flex items-center justify-center gap-2 mb-2">
                  <Phone className="h-5 w-5 text-primary" />
                  <span className="text-sm font-medium text-muted-foreground">
                    Customer Care
                  </span>
                </div>
                <div className="text-2xl font-bold text-foreground tracking-wider">
                  {customerCareNumber}
                </div>
              </div>

              {/* Action Buttons */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <Button
                  onClick={handleWhatsAppClick}
                  className="h-14 text-base font-semibold bg-green-600 hover:bg-green-700 text-white transition-all duration-200 hover:scale-105"
                >
                  <MessageCircle className="h-5 w-5 mr-2" />
                  Chat on WhatsApp
                </Button>

                <Button
                  onClick={handlePhoneCall}
                  variant="outline"
                  className="h-14 text-base font-semibold border-2 hover:bg-primary hover:text-primary-foreground transition-all duration-200 hover:scale-105"
                >
                  <Phone className="h-5 w-5 mr-2" />
                  Call Now
                </Button>
              </div>
            </div>

            {/* Support Hours */}
            <div className="bg-muted/50 rounded-lg p-4 animate-fade-in">
              <div className="flex items-center justify-center gap-2 mb-2">
                <Clock className="h-4 w-4 text-muted-foreground" />
                <span className="text-sm font-medium text-muted-foreground">
                  Support Hours
                </span>
              </div>
              <p className="text-sm text-muted-foreground">
                Monday - Sunday: 9:00 AM - 9:00 PM
              </p>
              <p className="text-xs text-muted-foreground mt-1">
                We're here to help when you need us most
              </p>
            </div>
          </CardContent>
        </Card>

        {/* Additional Help Section */}
        <Card
          className="mt-6 animate-slide-up"
          style={{ animationDelay: "200ms" }}
        >
          <CardContent className="p-6">
            <h3 className="font-semibold text-foreground mb-3">
              What happens next?
            </h3>
            <div className="space-y-3 text-sm text-muted-foreground">
              <div className="flex items-start gap-3">
                <div className="w-2 h-2 bg-primary rounded-full mt-2 flex-shrink-0"></div>
                <p>
                  Our customer care team will assist you immediately when you
                  contact us
                </p>
              </div>
              <div className="flex items-start gap-3">
                <div className="w-2 h-2 bg-primary rounded-full mt-2 flex-shrink-0"></div>
                <p>
                  We'll investigate your order issue and provide a quick
                  resolution
                </p>
              </div>
              <div className="flex items-start gap-3">
                <div className="w-2 h-2 bg-primary rounded-full mt-2 flex-shrink-0"></div>
                <p>
                  You'll receive updates on the progress until everything is
                  resolved
                </p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
