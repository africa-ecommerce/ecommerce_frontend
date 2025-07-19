



import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import {
  FileText,
  Mail,
  Phone,
  Calendar,
  Users,
  Store,
  CreditCard,
  Truck,
  RotateCcw,
  AlertTriangle,
  Shield,
  Scale,
  UserCheck,
  Package,
  Ban,
  Copyright,
  Gavel,
  Settings,
} from "lucide-react";

export default function TermsOfService() {
  const sections = [
    {
      id: "overview",
      title: "Overview of Pluggn",
      icon: <Package className="w-4 h-4 sm:w-5 sm:h-5" />,
      content: (
        <div className="space-y-3 sm:space-y-4">
         
          <div className="space-y-3 sm:space-y-4">
            <div className="p-3 sm:p-4 bg-blue-50 dark:bg-blue-950/20 rounded-lg border border-blue-200 dark:border-blue-800">
              <h5 className="font-medium text-sm sm:text-base text-blue-800 dark:text-blue-200 mb-1 sm:mb-2">
                Suppliers
              </h5>
              <p className="text-xs sm:text-sm text-blue-700 dark:text-blue-300">
                Who have products to sell.
              </p>
            </div>
            <div className="p-3 sm:p-4 bg-green-50 dark:bg-green-950/20 rounded-lg border border-green-200 dark:border-green-800">
              <h5 className="font-medium text-sm sm:text-base text-green-800 dark:text-green-200 mb-1 sm:mb-2">
                Plugs (Independent Sellers)
              </h5>
              <p className="text-xs sm:text-sm text-green-700 dark:text-green-300">
                Who promote and resell products online.
              </p>
            </div>
            <div className="p-3 sm:p-4 bg-purple-50 dark:bg-purple-950/20 rounded-lg border border-purple-200 dark:border-purple-800">
              <h5 className="font-medium text-sm sm:text-base text-purple-800 dark:text-purple-200 mb-1 sm:mb-2">
                Buyers
              </h5>
              <p className="text-xs sm:text-sm text-purple-700 dark:text-purple-300">
                Who purchase products through Pluggn social sellers.
              </p>
            </div>
          </div>
          <div className="p-3 sm:p-4 bg-primary/10 border border-primary/20 rounded-lg">
            <p className="text-xs sm:text-sm text-primary leading-relaxed">
              Pluggn facilitates payments, order processing, delivery, and
              after-sale services but is not the manufacturer, owner, or direct
              seller of most products listed.
            </p>
          </div>
        </div>
      ),
    },
    {
      id: "eligibility",
      title: "Eligibility",
      icon: <UserCheck className="w-4 h-4 sm:w-5 sm:h-5" />,
      content: (
        <div className="space-y-3 sm:space-y-4">
          <p className="text-sm sm:text-base text-muted-foreground">
            To use Pluggn:
          </p>
          <div className="space-y-2 sm:space-y-3">
            <div className="flex items-start gap-2 sm:gap-3 p-2 sm:p-3 bg-muted/50 rounded-lg">
              <div className="w-1.5 h-1.5 sm:w-2 sm:h-2 bg-primary rounded-full mt-1.5 sm:mt-2 flex-shrink-0"></div>
              <span className="text-xs sm:text-sm leading-relaxed">
                You must be at least 18 years old or supervised by a legal
                guardian.
              </span>
            </div>
            <div className="flex items-start gap-2 sm:gap-3 p-2 sm:p-3 bg-muted/50 rounded-lg">
              <div className="w-1.5 h-1.5 sm:w-2 sm:h-2 bg-primary rounded-full mt-1.5 sm:mt-2 flex-shrink-0"></div>
              <span className="text-xs sm:text-sm leading-relaxed">
                You must provide accurate information when creating an account
                or making a purchase.
              </span>
            </div>
          </div>
        </div>
      ),
    },
    {
      id: "accounts",
      title: "Accounts & Pluggn Stores",
      icon: <Store className="w-4 h-4 sm:w-5 sm:h-5" />,
      content: (
        <div className="space-y-3 sm:space-y-4">
          <div className="space-y-3 sm:space-y-4">
            <div className="p-3 sm:p-4 bg-green-50 dark:bg-green-950/20 rounded-lg border border-green-200 dark:border-green-800">
              <div className="flex items-center gap-2 mb-1 sm:mb-2">
                <Store className="w-3 h-3 sm:w-4 sm:h-4 text-green-600 flex-shrink-0" />
                <h5 className="font-medium text-sm sm:text-base text-green-800 dark:text-green-200">
                  Free Online Stores
                </h5>
              </div>
              <p className="text-xs sm:text-sm text-green-700 dark:text-green-300">
                Plugs can create free online stores upon registration.
              </p>
            </div>
            <div className="p-3 sm:p-4 bg-amber-50 dark:bg-amber-950/20 rounded-lg border border-amber-200 dark:border-amber-800">
              <div className="flex items-center gap-2 mb-1 sm:mb-2">
                <Shield className="w-3 h-3 sm:w-4 sm:h-4 text-amber-600 flex-shrink-0" />
                <h5 className="font-medium text-sm sm:text-base text-amber-800 dark:text-amber-200">
                  Account Security
                </h5>
              </div>
              <p className="text-xs sm:text-sm text-amber-700 dark:text-amber-300 leading-relaxed">
                You are responsible for maintaining the confidentiality of your
                store account and all activities under it.
              </p>
            </div>
            <div className="p-3 sm:p-4 bg-red-50 dark:bg-red-950/20 rounded-lg border border-red-200 dark:border-red-800">
              <div className="flex items-center gap-2 mb-1 sm:mb-2">
                <AlertTriangle className="w-3 h-3 sm:w-4 sm:h-4 text-red-600 flex-shrink-0" />
                <h5 className="font-medium text-sm sm:text-base text-red-800 dark:text-red-200">
                  Account Termination
                </h5>
              </div>
              <p className="text-xs sm:text-sm text-red-700 dark:text-red-300">
                Pluggn reserves the right to suspend or terminate accounts that
                violate these Terms.
              </p>
            </div>
          </div>
        </div>
      ),
    },
    {
      id: "product-listings",
      title: "Product Listings and Accuracy",
      icon: <Package className="w-4 h-4 sm:w-5 sm:h-5" />,
      content: (
        <div className="space-y-3 sm:space-y-4">
          <div className="space-y-3 sm:space-y-4">
            <div className="p-3 sm:p-4 bg-blue-50 dark:bg-blue-950/20 rounded-lg border border-blue-200 dark:border-blue-800">
              <h5 className="font-medium text-sm sm:text-base text-blue-800 dark:text-blue-200 mb-1 sm:mb-2">
                Supplier Responsibilities
              </h5>
              <p className="text-xs sm:text-sm text-blue-700 dark:text-blue-300 leading-relaxed">
                Suppliers are responsible for ensuring product information,
                images, and prices are accurate and lawful.
              </p>
            </div>
            <div className="p-3 sm:p-4 bg-green-50 dark:bg-green-950/20 rounded-lg border border-green-200 dark:border-green-800">
              <h5 className="font-medium text-sm sm:text-base text-green-800 dark:text-green-200 mb-1 sm:mb-2">
                Plug Responsibilities
              </h5>
              <p className="text-xs sm:text-sm text-green-700 dark:text-green-300 leading-relaxed">
                Plugs agree not to misrepresent products or make false claims
                when sharing on social media or selling through Pluggn.
              </p>
            </div>
            <div className="p-3 sm:p-4 bg-red-50 dark:bg-red-950/20 rounded-lg border border-red-200 dark:border-red-800">
              <h5 className="font-medium text-sm sm:text-base text-red-800 dark:text-red-200 mb-1 sm:mb-2">
                Content Moderation
              </h5>
              <p className="text-xs sm:text-sm text-red-700 dark:text-red-300 leading-relaxed">
                Pluggn may remove any listing that violates the law, infringes
                rights, or creates risk to users.
              </p>
            </div>
          </div>
        </div>
      ),
    },
    {
      id: "payments",
      title: "Orders, Payment, and Escrow",
      icon: <CreditCard className="w-4 h-4 sm:w-5 sm:h-5" />,
      content: (
        <div className="space-y-3 sm:space-y-4">
          <div className="space-y-3 sm:space-y-4">
            <div className="p-3 sm:p-4 bg-green-50 dark:bg-green-950/20 rounded-lg border border-green-200 dark:border-green-800">
              <div className="flex items-center gap-2 mb-1 sm:mb-2">
                <CreditCard className="w-3 h-3 sm:w-4 sm:h-4 text-green-600 flex-shrink-0" />
                <h5 className="font-medium text-sm sm:text-base text-green-800 dark:text-green-200">
                  Secure Payments
                </h5>
              </div>
              <p className="text-xs sm:text-sm text-green-700 dark:text-green-300 leading-relaxed">
                All payments are processed securely via Paystack or other
                approved payment gateways.
              </p>
            </div>
            <div className="p-3 sm:p-4 bg-blue-50 dark:bg-blue-950/20 rounded-lg border border-blue-200 dark:border-blue-800">
              <div className="flex items-center gap-2 mb-1 sm:mb-2">
                <Shield className="w-3 h-3 sm:w-4 sm:h-4 text-blue-600 flex-shrink-0" />
                <h5 className="font-medium text-sm sm:text-base text-blue-800 dark:text-blue-200">
                  Escrow Protection
                </h5>
              </div>
              <p className="text-xs sm:text-sm text-blue-700 dark:text-blue-300 leading-relaxed">
                Pluggn holds payments in escrow for up to 3 days after delivery
                to protect both buyers and sellers.
              </p>
            </div>
            <div className="p-3 sm:p-4 bg-primary/10 border border-primary/20 rounded-lg">
              <p className="text-xs sm:text-sm text-primary font-medium leading-relaxed">
                If no dispute or return is raised within 3 days, funds are
                released to the supplier and/or plug.
              </p>
            </div>
          </div>
          
        </div>
      ),
    },
    {
      id: "delivery",
      title: "Delivery and Returns",
      icon: <Truck className="w-4 h-4 sm:w-5 sm:h-5" />,
      content: (
        <div className="space-y-3 sm:space-y-4">
          <div className="p-3 sm:p-4 bg-blue-50 dark:bg-blue-950/20 rounded-lg border border-blue-200 dark:border-blue-800">
            <div className="flex items-center gap-2 mb-1 sm:mb-2">
              <Truck className="w-3 h-3 sm:w-4 sm:h-4 text-blue-600 flex-shrink-0" />
              <h5 className="font-medium text-sm sm:text-base text-blue-800 dark:text-blue-200">
                Delivery Service
              </h5>
            </div>
            <p className="text-xs sm:text-sm text-blue-700 dark:text-blue-300 leading-relaxed">
              Deliveries are handled via Pluggn's logistics partners with
              real-time tracking where available.
            </p>
          </div>
          <div className="space-y-3 sm:space-y-4">
            <h5 className="font-medium text-sm sm:text-base text-foreground">
              Return Eligibility
            </h5>
            <div className="space-y-2 sm:space-y-3">
              <div className="p-2 sm:p-3 bg-green-50 dark:bg-green-950/20 rounded-lg border border-green-200 dark:border-green-800">
                <h6 className="text-xs sm:text-sm font-medium text-green-800 dark:text-green-200 mb-1">
                  Eligible for Returns:
                </h6>
                <p className="text-xs text-green-700 dark:text-green-300 leading-relaxed">
                  Within 3 days of delivery if the item is defective, damaged,
                  or significantly different from the description.
                </p>
              </div>
              <div className="p-2 sm:p-3 bg-red-50 dark:bg-red-950/20 rounded-lg border border-red-200 dark:border-red-800">
                <h6 className="text-xs sm:text-sm font-medium text-red-800 dark:text-red-200 mb-1">
                  Returns May Be Rejected If:
                </h6>
                <p className="text-xs text-red-700 dark:text-red-300 leading-relaxed">
                  The product shows signs of use, damage by the buyer, or is
                  non-returnable (e.g., perishable goods, personal care items).
                </p>
              </div>
            </div>
          </div>
        </div>
      ),
    },
    {
      id: "refunds",
      title: "Refunds and Disputes",
      icon: <RotateCcw className="w-4 h-4 sm:w-5 sm:h-5" />,
      content: (
        <div className="space-y-3 sm:space-y-4">
          <div className="space-y-3 sm:space-y-4">
            <div className="p-3 sm:p-4 bg-amber-50 dark:bg-amber-950/20 rounded-lg border border-amber-200 dark:border-amber-800">
              <div className="flex items-center gap-2 mb-1 sm:mb-2">
                <RotateCcw className="w-3 h-3 sm:w-4 sm:h-4 text-amber-600 flex-shrink-0" />
                <h5 className="font-medium text-sm sm:text-base text-amber-800 dark:text-amber-200">
                  Refund Process
                </h5>
              </div>
              <p className="text-xs sm:text-sm text-amber-700 dark:text-amber-300 leading-relaxed">
                Refunds are processed only after the returned item is received
                and inspected.
              </p>
            </div>
            <div className="p-3 sm:p-4 bg-blue-50 dark:bg-blue-950/20 rounded-lg border border-blue-200 dark:border-blue-800">
              <div className="flex items-center gap-2 mb-1 sm:mb-2">
                <Scale className="w-3 h-3 sm:w-4 sm:h-4 text-blue-600 flex-shrink-0" />
                <h5 className="font-medium text-sm sm:text-base text-blue-800 dark:text-blue-200">
                  Dispute Resolution
                </h5>
              </div>
              <p className="text-xs sm:text-sm text-blue-700 dark:text-blue-300 leading-relaxed">
                Pluggn acts as a neutral party in disputes and may request
                additional proof from buyers, plugs, or suppliers before
                deciding on refunds.
              </p>
            </div>
            <div className="p-3 sm:p-4 bg-red-50 dark:bg-red-950/20 rounded-lg border border-red-200 dark:border-red-800">
              <div className="flex items-center gap-2 mb-1 sm:mb-2">
                <Gavel className="w-3 h-3 sm:w-4 sm:h-4 text-red-600 flex-shrink-0" />
                <h5 className="font-medium text-sm sm:text-base text-red-800 dark:text-red-200">
                  Final Decisions
                </h5>
              </div>
              <p className="text-xs sm:text-sm text-red-700 dark:text-red-300">
                All decisions by Pluggn on disputes are final.
              </p>
            </div>
          </div>
        </div>
      ),
    },
    {
      id: "plug-responsibilities",
      title: "Plugs' Responsibilities",
      icon: <Users className="w-4 h-4 sm:w-5 sm:h-5" />,
      content: (
        <div className="space-y-3 sm:space-y-4">
          <p className="text-sm sm:text-base text-muted-foreground">
            If you are a Plug:
          </p>
          <div className="space-y-2 sm:space-y-3">
            <div className="flex items-start gap-2 sm:gap-3 p-2 sm:p-3 bg-green-50 dark:bg-green-950/20 rounded-lg border border-green-200 dark:border-green-800">
              <div className="w-1.5 h-1.5 sm:w-2 sm:h-2 bg-green-500 rounded-full mt-1.5 sm:mt-2 flex-shrink-0"></div>
              <span className="text-xs sm:text-sm text-green-800 dark:text-green-200 leading-relaxed">
                You agree to represent products honestly and deliver excellent
                customer service.
              </span>
            </div>
            <div className="flex items-start gap-2 sm:gap-3 p-2 sm:p-3 bg-blue-50 dark:bg-blue-950/20 rounded-lg border border-blue-200 dark:border-blue-800">
              <div className="w-1.5 h-1.5 sm:w-2 sm:h-2 bg-blue-500 rounded-full mt-1.5 sm:mt-2 flex-shrink-0"></div>
              <span className="text-xs sm:text-sm text-blue-800 dark:text-blue-200 leading-relaxed">
                You agree to follow up with buyers as needed (e.g., confirming
                orders, answering questions).
              </span>
            </div>
            <div className="flex items-start gap-2 sm:gap-3 p-2 sm:p-3 bg-red-50 dark:bg-red-950/20 rounded-lg border border-red-200 dark:border-red-800">
              <div className="w-1.5 h-1.5 sm:w-2 sm:h-2 bg-red-500 rounded-full mt-1.5 sm:mt-2 flex-shrink-0"></div>
              <span className="text-xs sm:text-sm text-red-800 dark:text-red-200 leading-relaxed">
                You must not engage in fraudulent behavior, misrepresentation,
                or spamming.
              </span>
            </div>
          </div>
          <div className="p-3 sm:p-4 bg-red-50 dark:bg-red-950/20 border border-red-200 dark:border-red-800 rounded-lg">
            <p className="text-xs sm:text-sm font-medium text-red-800 dark:text-red-200 leading-relaxed">
              Violation may lead to account suspension or permanent removal.
            </p>
          </div>
        </div>
      ),
    },
    {
      id: "supplier-responsibilities",
      title: "Suppliers' Responsibilities",
      icon: <Package className="w-4 h-4 sm:w-5 sm:h-5" />,
      content: (
        <div className="space-y-3 sm:space-y-4">
          <p className="text-sm sm:text-base text-muted-foreground">
            If you are a Supplier:
          </p>
          <div className="space-y-2 sm:space-y-3">
            <div className="flex items-start gap-2 sm:gap-3 p-2 sm:p-3 bg-green-50 dark:bg-green-950/20 rounded-lg border border-green-200 dark:border-green-800">
              <div className="w-1.5 h-1.5 sm:w-2 sm:h-2 bg-green-500 rounded-full mt-1.5 sm:mt-2 flex-shrink-0"></div>
              <span className="text-xs sm:text-sm text-green-800 dark:text-green-200 leading-relaxed">
                You must ensure your products are genuine, safe, and comply with
                local laws and regulations.
              </span>
            </div>
            <div className="flex items-start gap-2 sm:gap-3 p-2 sm:p-3 bg-blue-50 dark:bg-blue-950/20 rounded-lg border border-blue-200 dark:border-blue-800">
              <div className="w-1.5 h-1.5 sm:w-2 sm:h-2 bg-blue-500 rounded-full mt-1.5 sm:mt-2 flex-shrink-0"></div>
              <span className="text-xs sm:text-sm text-blue-800 dark:text-blue-200 leading-relaxed">
                You agree to fulfill orders promptly and update inventory as
                necessary.
              </span>
            </div>
          </div>
          <div className="p-3 sm:p-4 bg-red-50 dark:bg-red-950/20 border border-red-200 dark:border-red-800 rounded-lg">
            <p className="text-xs sm:text-sm font-medium text-red-800 dark:text-red-200 leading-relaxed">
              False advertising or poor-quality products may result in removal
              from Pluggn.
            </p>
          </div>
        </div>
      ),
    },
    {
      id: "prohibited-activities",
      title: "Prohibited Activities",
      icon: <Ban className="w-4 h-4 sm:w-5 sm:h-5" />,
      content: (
        <div className="space-y-3 sm:space-y-4">
          <p className="text-sm sm:text-base text-muted-foreground">
            You agree not to:
          </p>
          <div className="space-y-2 sm:space-y-3">
            <div className="flex items-start gap-2 sm:gap-3 p-2 sm:p-3 bg-red-50 dark:bg-red-950/20 rounded-lg border border-red-200 dark:border-red-800">
              <Ban className="w-3 h-3 sm:w-4 sm:h-4 text-red-600 mt-0.5 flex-shrink-0" />
              <span className="text-xs sm:text-sm text-red-800 dark:text-red-200 leading-relaxed">
                Use Pluggn for illegal purposes or fraudulent activity.
              </span>
            </div>
            <div className="flex items-start gap-2 sm:gap-3 p-2 sm:p-3 bg-red-50 dark:bg-red-950/20 rounded-lg border border-red-200 dark:border-red-800">
              <Ban className="w-3 h-3 sm:w-4 sm:h-4 text-red-600 mt-0.5 flex-shrink-0" />
              <span className="text-xs sm:text-sm text-red-800 dark:text-red-200 leading-relaxed">
                Violate intellectual property rights.
              </span>
            </div>
            <div className="flex items-start gap-2 sm:gap-3 p-2 sm:p-3 bg-red-50 dark:bg-red-950/20 rounded-lg border border-red-200 dark:border-red-800">
              <Ban className="w-3 h-3 sm:w-4 sm:h-4 text-red-600 mt-0.5 flex-shrink-0" />
              <span className="text-xs sm:text-sm text-red-800 dark:text-red-200 leading-relaxed">
                Upload viruses or malicious code.
              </span>
            </div>
            <div className="flex items-start gap-2 sm:gap-3 p-2 sm:p-3 bg-red-50 dark:bg-red-950/20 rounded-lg border border-red-200 dark:border-red-800">
              <Ban className="w-3 h-3 sm:w-4 sm:h-4 text-red-600 mt-0.5 flex-shrink-0" />
              <span className="text-xs sm:text-sm text-red-800 dark:text-red-200 leading-relaxed">
                Harass or harm other users, plugs, suppliers, or Pluggn staff.
              </span>
            </div>
          </div>
        </div>
      ),
    },
    {
      id: "intellectual-property",
      title: "Intellectual Property",
      icon: <Copyright className="w-4 h-4 sm:w-5 sm:h-5" />,
      content: (
        <div className="space-y-3 sm:space-y-4">
          <div className="space-y-3 sm:space-y-4">
            <div className="p-3 sm:p-4 bg-blue-50 dark:bg-blue-950/20 rounded-lg border border-blue-200 dark:border-blue-800">
              <div className="flex items-center gap-2 mb-1 sm:mb-2">
                <Copyright className="w-3 h-3 sm:w-4 sm:h-4 text-blue-600 flex-shrink-0" />
                <h5 className="font-medium text-sm sm:text-base text-blue-800 dark:text-blue-200">
                  Pluggn's Content
                </h5>
              </div>
              <p className="text-xs sm:text-sm text-blue-700 dark:text-blue-300 leading-relaxed">
                All content on Pluggn—including logos, designs, texts, and
                images—are owned by or licensed to Pluggn.
              </p>
            </div>
            <div className="p-3 sm:p-4 bg-red-50 dark:bg-red-950/20 rounded-lg border border-red-200 dark:border-red-800">
              <div className="flex items-center gap-2 mb-1 sm:mb-2">
                <Shield className="w-3 h-3 sm:w-4 sm:h-4 text-red-600 flex-shrink-0" />
                <h5 className="font-medium text-sm sm:text-base text-red-800 dark:text-red-200">
                  Usage Restrictions
                </h5>
              </div>
              <p className="text-xs sm:text-sm text-red-700 dark:text-red-300 leading-relaxed">
                You may not use, copy, or reproduce Pluggn's materials without
                written permission.
              </p>
            </div>
          </div>
        </div>
      ),
    },
    {
      id: "limitation-liability",
      title: "Limitation of Liability",
      icon: <Shield className="w-4 h-4 sm:w-5 sm:h-5" />,
      content: (
        <div className="space-y-3 sm:space-y-4">
          <p className="text-sm sm:text-base text-muted-foreground">
            To the maximum extent permitted by law:
          </p>
          <div className="space-y-3 sm:space-y-4">
            <div className="p-3 sm:p-4 bg-amber-50 dark:bg-amber-950/20 rounded-lg border border-amber-200 dark:border-amber-800">
              <p className="text-xs sm:text-sm text-amber-800 dark:text-amber-200 leading-relaxed">
                Pluggn is not liable for indirect, incidental, or consequential
                damages arising from the use of our services.
              </p>
            </div>
            <div className="p-3 sm:p-4 bg-red-50 dark:bg-red-950/20 rounded-lg border border-red-200 dark:border-red-800">
              <p className="text-xs sm:text-sm text-red-800 dark:text-red-200 leading-relaxed">
                Pluggn's total liability in any claim is limited to the amount
                you paid through Pluggn in the past 30 days.
              </p>
            </div>
          </div>
        </div>
      ),
    },
    {
      id: "indemnification",
      title: "Indemnification",
      icon: <Scale className="w-4 h-4 sm:w-5 sm:h-5" />,
      content: (
        <div className="space-y-3 sm:space-y-4">
          <div className="p-3 sm:p-4 bg-blue-50 dark:bg-blue-950/20 rounded-lg border border-blue-200 dark:border-blue-800">
            <p className="text-xs sm:text-sm text-blue-800 dark:text-blue-200 leading-relaxed">
              You agree to indemnify and hold harmless Pluggn, its team,
              partners, and affiliates from any claims, damages, or expenses
              arising from your use of the platform or violation of these Terms.
            </p>
          </div>
        </div>
      ),
    },
    {
      id: "governing-law",
      title: "Governing Law",
      icon: <Gavel className="w-4 h-4 sm:w-5 sm:h-5" />,
      content: (
        <div className="space-y-3 sm:space-y-4">
          <div className="space-y-3 sm:space-y-4">
            <div className="p-3 sm:p-4 bg-green-50 dark:bg-green-950/20 rounded-lg border border-green-200 dark:border-green-800">
              <p className="text-xs sm:text-sm text-green-800 dark:text-green-200 leading-relaxed">
                These Terms are governed by the laws of Nigeria.
              </p>
            </div>
            <div className="p-3 sm:p-4 bg-blue-50 dark:bg-blue-950/20 rounded-lg border border-blue-200 dark:border-blue-800">
              <p className="text-xs sm:text-sm text-blue-800 dark:text-blue-200 leading-relaxed">
                Any disputes shall be resolved in Nigerian courts.
              </p>
            </div>
          </div>
        </div>
      ),
    },
    {
      id: "changes",
      title: "Changes to These Terms",
      icon: <Settings className="w-4 h-4 sm:w-5 sm:h-5" />,
      content: (
        <div className="space-y-3 sm:space-y-4">
          <div className="p-3 sm:p-4 bg-amber-50 dark:bg-amber-950/20 rounded-lg border border-amber-200 dark:border-amber-800">
            <p className="text-xs sm:text-sm text-amber-800 dark:text-amber-200 leading-relaxed">
              We may update these Terms from time to time. Your continued use of
              Pluggn after changes means you accept the revised Terms.
            </p>
          </div>
        </div>
      ),
    },
  ];

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <div className="bg-gradient-to-r from-primary/10 via-primary/5 to-transparent border-b">
        <div className="max-w-4xl mx-auto px-3 sm:px-4 py-8 sm:py-12">
          <div className="text-center space-y-3 sm:space-y-4">
            <div className="inline-flex items-center justify-center w-12 h-12 sm:w-16 sm:h-16 bg-primary/10 rounded-full mb-3 sm:mb-4">
              <FileText className="w-6 h-6 sm:w-8 sm:h-8 text-primary" />
            </div>
            <h1 className="text-2xl sm:text-3xl lg:text-4xl font-bold text-foreground px-2">
              Terms of Service
            </h1>
            <p className="text-sm sm:text-base lg:text-lg text-muted-foreground max-w-2xl mx-auto px-2 leading-relaxed">
              By accessing or using our platform, you agree to comply with and
              be bound by these Terms of Service.
            </p>
            <div className="flex items-center justify-center gap-2 text-xs sm:text-sm text-muted-foreground">
              <Calendar className="w-3 h-3 sm:w-4 sm:h-4 flex-shrink-0" />
              <span>Effective Date: July, 2025</span>
            </div>
          </div>
        </div>
      </div>

      {/* Content */}
      <div className="max-w-4xl mx-auto px-3 sm:px-4 py-8 sm:py-12">
        {/* Introduction */}
        <Card className="mb-6 sm:mb-8">
          <CardContent className="p-4 sm:p-6">
            <div className="space-y-3 sm:space-y-4">
              <h2 className="text-xl sm:text-2xl font-semibold text-foreground">
                Welcome to Pluggn
              </h2>
              <p className="text-sm sm:text-base text-muted-foreground leading-relaxed">
                By accessing or using our platform (website, app, or services),
                you agree to comply with and be bound by these Terms of Service
                ("Terms").
              </p>
              <div className="p-3 sm:p-4 bg-red-50 dark:bg-red-950/20 border border-red-200 dark:border-red-800 rounded-lg">
                <p className="text-xs sm:text-sm font-medium text-red-800 dark:text-red-200 leading-relaxed">
                  Please read them carefully. If you do not agree to these
                  Terms, please do not use Pluggn.
                </p>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Sections */}
        <div className="space-y-6 sm:space-y-8">
          {sections.map((section, index) => (
            <Card
              key={section.id}
              className="animate-slide-up"
              style={{ animationDelay: `${index * 100}ms` }}
            >
              <CardHeader className="p-4 sm:p-6 pb-3 sm:pb-4">
                <CardTitle className="flex items-start sm:items-center gap-2 sm:gap-3 text-base sm:text-lg lg:text-xl">
                  <div className="p-1.5 sm:p-2 bg-primary/10 rounded-lg text-primary flex-shrink-0 mt-0.5 sm:mt-0">
                    {section.icon}
                  </div>
                  <span className="leading-tight">
                    {index + 1}. {section.title}
                  </span>
                </CardTitle>
              </CardHeader>
              <CardContent className="p-4 sm:p-6 pt-0">
                {section.content}
              </CardContent>
            </Card>
          ))}

          {/* Additional Sections */}
          <Card
            className="animate-slide-up"
            style={{ animationDelay: "1400ms" }}
          >
            <CardHeader className="p-4 sm:p-6 pb-3 sm:pb-4">
              <CardTitle className="flex items-start sm:items-center gap-2 sm:gap-3 text-base sm:text-lg lg:text-xl">
                <div className="p-1.5 sm:p-2 bg-primary/10 rounded-lg text-primary flex-shrink-0 mt-0.5 sm:mt-0">
                  <Shield className="w-4 h-4 sm:w-5 sm:h-5" />
                </div>
                <span className="leading-tight">14. Privacy</span>
              </CardTitle>
            </CardHeader>
            <CardContent className="p-4 sm:p-6 pt-0">
              <p className="text-sm sm:text-base text-muted-foreground leading-relaxed">
                Please refer to our Privacy Policy for details on how we
                collect, use, and protect your personal information.
              </p>
            </CardContent>
          </Card>

          <Card
            className="animate-slide-up"
            style={{ animationDelay: "1500ms" }}
          >
            <CardHeader className="p-4 sm:p-6 pb-3 sm:pb-4">
              <CardTitle className="flex items-start sm:items-center gap-2 sm:gap-3 text-base sm:text-lg lg:text-xl">
                <div className="p-1.5 sm:p-2 bg-primary/10 rounded-lg text-primary flex-shrink-0 mt-0.5 sm:mt-0">
                  <AlertTriangle className="w-4 h-4 sm:w-5 sm:h-5" />
                </div>
                <span className="leading-tight">15. Termination</span>
              </CardTitle>
            </CardHeader>
            <CardContent className="p-4 sm:p-6 pt-0">
              <div className="p-3 sm:p-4 bg-red-50 dark:bg-red-950/20 border border-red-200 dark:border-red-800 rounded-lg">
                <p className="text-xs sm:text-sm text-red-800 dark:text-red-200 leading-relaxed">
                  Pluggn reserves the right to terminate or suspend your access
                  to the platform at any time, without prior notice, if you
                  violate these Terms.
                </p>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Contact Section */}
        <Card className="mt-8 sm:mt-12 bg-gradient-to-r from-primary/5 to-accent/5 border-primary/20">
          <CardHeader className="p-4 sm:p-6 pb-3 sm:pb-4">
            <CardTitle className="flex items-start sm:items-center gap-2 sm:gap-3 text-base sm:text-lg lg:text-xl">
              <div className="p-1.5 sm:p-2 bg-primary/10 rounded-lg text-primary flex-shrink-0 mt-0.5 sm:mt-0">
                <Mail className="w-4 h-4 sm:w-5 sm:h-5" />
              </div>
              <span className="leading-tight">16. Contact Us</span>
            </CardTitle>
          </CardHeader>
          <CardContent className="p-4 sm:p-6 pt-0">
            <div className="space-y-3 sm:space-y-4">
              <p className="text-sm sm:text-base text-muted-foreground">
                For questions, complaints, or support, please click to contact us:
              </p>
              <div className="flex flex-col gap-3 sm:gap-4">
                <a
                  href="mailto:support@pluggn.com.ng"
                  className="flex items-center gap-2 p-2 sm:p-3 bg-background rounded-lg border hover:bg-accent transition-colors cursor-pointer"
                >
                  <Mail className="w-3 h-3 sm:w-4 sm:h-4 text-primary flex-shrink-0" />
                  <span className="text-xs sm:text-sm font-medium break-all">
                    support@pluggn.com.ng
                  </span>
                </a>
                <a
                  href="https://wa.me/2349151425001"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-2 p-2 sm:p-3 bg-background rounded-lg border hover:bg-accent transition-colors cursor-pointer"
                >
                  <Phone className="w-3 h-3 sm:w-4 sm:h-4 text-primary flex-shrink-0" />
                  <span className="text-xs sm:text-sm font-medium">
                    +234 915 142 5001
                  </span>
                </a>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Footer */}
        <div className="mt-8 sm:mt-12 text-center">
          <Separator className="mb-4 sm:mb-6" />
          <p className="text-xs sm:text-sm text-muted-foreground px-2 leading-relaxed">
            These terms of service govern your use of the Pluggn platform and
            services.
          </p>
        </div>
      </div>
    </div>
  );
}

