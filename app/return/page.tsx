"use client";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import {
  Shield,
  Mail,
  Phone,
  Calendar,
  Package,
  RefreshCcw,
  AlertCircle,
  CheckCircle,
  FileText,
} from "lucide-react";

export default function ReturnPolicy() {
  const sections = [
    {
      id: "eligibility",
      title: "Eligibility for Returns",
      icon: <CheckCircle className="w-4 h-4 sm:w-5 sm:h-5" />,
      content: (
        <div className="space-y-3 sm:space-y-4">
          <p className="text-sm sm:text-base text-muted-foreground leading-relaxed">
            Buyers can request a return within <strong>3 days of delivery</strong> if
            the product is:
          </p>
          <ul className="list-disc pl-5 text-xs sm:text-sm text-muted-foreground space-y-1.5">
            <li>Unused, unwashed, and in its original condition.</li>
            <li>In the original packaging with all tags intact.</li>
            <li>Accompanied by proof of purchase (order ID/receipt).</li>
          </ul>
        </div>
      ),
    },
    {
      id: "non-returnable",
      title: "Non-Returnable Items",
      icon: <AlertCircle className="w-4 h-4 sm:w-5 sm:h-5" />,
      content: (
        <div className="space-y-3 sm:space-y-4">
          <p className="text-sm sm:text-base text-muted-foreground leading-relaxed">
            For safety and hygiene reasons, certain categories are not eligible for
            return:
          </p>
          <ul className="list-disc pl-5 text-xs sm:text-sm text-muted-foreground space-y-1.5">
            <li>Beauty & Fragrance</li>
            <li>Baby Products (e.g., feeding items, diapers)</li>
            <li>Pet Supplies (e.g., food, grooming items)</li>
            <li>Books, Toys & Games (if packaging is opened)</li>
            <li>Art & Crafts (consumables or opened materials)</li>
          </ul>
         
        </div>
      ),
    },
    {
      id: "process",
      title: "Return Process",
      icon: <RefreshCcw className="w-4 h-4 sm:w-5 sm:h-5" />,
      content: (
        <div className="space-y-3 sm:space-y-4">
          <ol className="list-decimal pl-5 text-xs sm:text-sm text-muted-foreground space-y-1.5">
            <li>Contact our support team within 3 days of delivery.</li>
            <li>Provide your order ID, product details, and reason for return.</li>
            <li>Our team will review and confirm eligibility.</li>
            <li>Return shipping instructions will be shared (buyer may bear shipping unless item is defective).</li>
            <li>Refunds or replacements will be processed after inspection.</li>
          </ol>
        </div>
      ),
    },
    {
      id: "condition",
      title: "Condition of Returned Products",
      icon: <Package className="w-4 h-4 sm:w-5 sm:h-5" />,
      content: (
        <p className="text-sm sm:text-base text-muted-foreground leading-relaxed">
          Returned products must be in their original state. Products showing
          signs of wear, damage, or missing parts will not be accepted.
        </p>
      ),
    },
    {
      id: "refunds",
      title: "Refunds & Replacements",
      icon: <FileText className="w-4 h-4 sm:w-5 sm:h-5" />,
      content: (
        <div className="space-y-2 sm:space-y-3">
          <p className="text-sm sm:text-base text-muted-foreground leading-relaxed">
            Once we receive and inspect your return, refunds or replacements
            will be processed within <strong>5–7 business days</strong>.
          </p>
          <p className="text-xs sm:text-sm text-muted-foreground">
            Refunds are issued to the original payment method unless otherwise
            arranged.
          </p>
        </div>
      ),
    },
  ];

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <div className="bg-gradient-to-r from-primary/10 via-primary/5 to-transparent border-b">
        <div className="max-w-4xl mx-auto px-3 sm:px-4 py-8 sm:py-12 text-center space-y-4">
          <div className="inline-flex items-center justify-center w-12 h-12 sm:w-16 sm:h-16 bg-primary/10 rounded-full mb-4">
            <Shield className="w-6 h-6 sm:w-8 sm:h-8 text-primary" />
          </div>
          <h1 className="text-2xl sm:text-3xl lg:text-4xl font-bold text-foreground">
            Return Policy
          </h1>
          <p className="text-sm sm:text-base lg:text-lg text-muted-foreground max-w-2xl mx-auto leading-relaxed">
            At Pluggn, we want you to shop with confidence. This Return
            Policy explains when and how you can return products purchased from
            us.
          </p>
          <div className="flex items-center justify-center gap-2 text-xs sm:text-sm text-muted-foreground">
            <Calendar className="w-3 h-3 sm:w-4 sm:h-4" />
            <span>Effective Date: September, 2025</span>
          </div>
        </div>
      </div>

      {/* Content */}
      <div className="max-w-4xl mx-auto px-3 sm:px-4 py-8 sm:py-12">
        <Card className="mb-6">
          <CardContent className="p-4 sm:p-6">
            <h2 className="text-xl sm:text-2xl font-semibold text-foreground mb-3">
              Hassle-Free Returns
            </h2>
            <p className="text-sm sm:text-base text-muted-foreground leading-relaxed">
              You have <strong>3 days after delivery</strong> to request a
              return. Our team will guide you through the process to ensure it’s
              smooth and fair for both you and our store.
            </p>
          </CardContent>
        </Card>

        <div className="space-y-6 sm:space-y-8">
          {sections.map((section, index) => (
            <Card
              key={section.id}
              className="animate-slide-up"
              style={{ animationDelay: `${index * 100}ms` }}
            >
              <CardHeader className="p-4 sm:p-6 pb-3">
                <CardTitle className="flex items-center gap-3 text-lg">
                  <div className="p-2 bg-primary/10 rounded-lg text-primary">
                    {section.icon}
                  </div>
                  {index + 1}. {section.title}
                </CardTitle>
              </CardHeader>
              <CardContent className="p-4 sm:p-6 pt-0">
                {section.content}
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Contact */}
        <Card className="mt-10 bg-gradient-to-r from-primary/5 to-accent/5 border-primary/20">
          <CardHeader>
            <CardTitle className="flex items-center gap-3 text-lg">
              <Mail className="w-4 h-4 sm:w-5 sm:h-5 text-primary" />
              Need Help?
            </CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-sm sm:text-base text-muted-foreground mb-4">
              For questions about returns, reach out to us:
            </p>
            <div className="space-y-3">
              <a
                href="mailto:support@pluggn.com.ng"
                className="flex items-center gap-2 text-sm sm:text-base text-primary hover:underline"
              >
                <Mail className="w-4 h-4" /> support@pluggn.com.ng
              </a>
              <a
                href="https://wa.me/2349151425001"
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-2 text-sm sm:text-base text-primary hover:underline"
              >
                <Phone className="w-4 h-4" /> WhatsApp +234 915 142 5001
              </a>
            </div>
          </CardContent>
        </Card>

        {/* Footer */}
        <div className="mt-8 sm:mt-12 text-center">
          <Separator className="mb-4 sm:mb-6" />
          <p className="text-xs sm:text-sm text-muted-foreground leading-relaxed">
            This return policy applies only to purchases made directly from a pluggn seller using the
            <strong>{" "}Pluggn Checkout</strong>
          </p>
        </div>
      </div>
    </div>
  );
}
