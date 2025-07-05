



import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import {
  Shield,
  Mail,
  Phone,
  Calendar,
  Lock,
  Users,
  Eye,
  FileText,
  Globe,
  Clock,
} from "lucide-react";

export default function PrivacyPolicy() {
  const sections = [
    {
      id: "information-we-collect",
      title: "Information We Collect",
      icon: <FileText className="w-4 h-4 sm:w-5 sm:h-5" />,
      content: (
        <div className="space-y-3 sm:space-y-4">
          <p className="text-sm sm:text-base text-muted-foreground leading-relaxed">
            We collect different types of information to help us provide,
            improve, and protect our services.
          </p>
          <div className="space-y-4 sm:space-y-6">
            <div>
              <h4 className="font-semibold text-sm sm:text-base text-foreground mb-2 sm:mb-3 flex items-center gap-2">
                <Users className="w-3 h-3 sm:w-4 sm:h-4 text-primary flex-shrink-0" />
                <span>Information You Provide to Us:</span>
              </h4>
              <ul className="space-y-1.5 sm:space-y-2 text-xs sm:text-sm text-muted-foreground ml-4 sm:ml-6">
                <li className="leading-relaxed">
                  <strong>Personal Information:</strong> Name, email, phone
                  number, delivery address.
                </li>
                <li className="leading-relaxed">
                  <strong>Account Details (for Plugs & Suppliers):</strong>{" "}
                  Business name, profile picture, payment details (for payouts).
                </li>
                <li className="leading-relaxed">
                  <strong>Order Information:</strong> Products purchased,
                  transaction amounts, shipping details.
                </li>
                <li className="leading-relaxed">
                  <strong>Communications:</strong> Messages, feedback, or calls
                  made through or regarding Pluggn.
                </li>
              </ul>
            </div>
            <div>
              <h4 className="font-semibold text-sm sm:text-base text-foreground mb-2 sm:mb-3 flex items-center gap-2">
                <Globe className="w-3 h-3 sm:w-4 sm:h-4 text-primary flex-shrink-0" />
                <span>Information from Third Parties:</span>
              </h4>
              <ul className="space-y-1.5 sm:space-y-2 text-xs sm:text-sm text-muted-foreground ml-4 sm:ml-6">
                <li className="leading-relaxed">
                  Payment processors (e.g., Paystack) may share confirmation of
                  payments.
                </li>
                <li className="leading-relaxed">
                  Social media integrations (if used) may share profile or
                  engagement data (if you opt in).
                </li>
              </ul>
            </div>
          </div>
        </div>
      ),
    },
    {
      id: "how-we-use",
      title: "How We Use Your Information",
      icon: <Eye className="w-4 h-4 sm:w-5 sm:h-5" />,
      content: (
        <div className="space-y-3 sm:space-y-4">
          <p className="text-sm sm:text-base text-muted-foreground">
            We use the information we collect to:
          </p>
          <ul className="space-y-1.5 sm:space-y-2 text-xs sm:text-sm text-muted-foreground">
            <li className="flex items-start gap-2">
              <div className="w-1 h-1 sm:w-1.5 sm:h-1.5 bg-primary rounded-full mt-1.5 sm:mt-2 flex-shrink-0"></div>
              <span className="leading-relaxed">
                Provide and operate the Pluggn marketplace.
              </span>
            </li>
            <li className="flex items-start gap-2">
              <div className="w-1 h-1 sm:w-1.5 sm:h-1.5 bg-primary rounded-full mt-1.5 sm:mt-2 flex-shrink-0"></div>
              <span className="leading-relaxed">
                Facilitate orders, deliveries, and payments.
              </span>
            </li>
            <li className="flex items-start gap-2">
              <div className="w-1 h-1 sm:w-1.5 sm:h-1.5 bg-primary rounded-full mt-1.5 sm:mt-2 flex-shrink-0"></div>
              <span className="leading-relaxed">
                Allow plugs and suppliers to sell and manage products.
              </span>
            </li>
            <li className="flex items-start gap-2">
              <div className="w-1 h-1 sm:w-1.5 sm:h-1.5 bg-primary rounded-full mt-1.5 sm:mt-2 flex-shrink-0"></div>
              <span className="leading-relaxed">
                Communicate with you (order updates, confirmations, support).
              </span>
            </li>
            <li className="flex items-start gap-2">
              <div className="w-1 h-1 sm:w-1.5 sm:h-1.5 bg-primary rounded-full mt-1.5 sm:mt-2 flex-shrink-0"></div>
              <span className="leading-relaxed">
                Send you marketing and promotional content (you can opt out
                anytime).
              </span>
            </li>
            <li className="flex items-start gap-2">
              <div className="w-1 h-1 sm:w-1.5 sm:h-1.5 bg-primary rounded-full mt-1.5 sm:mt-2 flex-shrink-0"></div>
              <span className="leading-relaxed">
                Detect and prevent fraud or abuse.
              </span>
            </li>
            <li className="flex items-start gap-2">
              <div className="w-1 h-1 sm:w-1.5 sm:h-1.5 bg-primary rounded-full mt-1.5 sm:mt-2 flex-shrink-0"></div>
              <span className="leading-relaxed">
                Improve our services and user experience.
              </span>
            </li>
          </ul>
        </div>
      ),
    },
    {
      id: "sharing-information",
      title: "Sharing of Information",
      icon: <Users className="w-4 h-4 sm:w-5 sm:h-5" />,
      content: (
        <div className="space-y-3 sm:space-y-4">
          <p className="text-sm sm:text-base text-muted-foreground">
            We may share your information with:
          </p>
          <div className="space-y-3 sm:space-y-4">
            <div className="p-3 sm:p-4 bg-muted/50 rounded-lg">
              <h5 className="font-medium text-sm sm:text-base text-foreground mb-1 sm:mb-2">
                Delivery Partners:
              </h5>
              <p className="text-xs sm:text-sm text-muted-foreground leading-relaxed">
                To fulfill and track deliveries.
              </p>
            </div>
            <div className="p-3 sm:p-4 bg-muted/50 rounded-lg">
              <h5 className="font-medium text-sm sm:text-base text-foreground mb-1 sm:mb-2">
                Payment Processors (e.g., Paystack):
              </h5>
              <p className="text-xs sm:text-sm text-muted-foreground leading-relaxed">
                To process transactions securely.
              </p>
            </div>
            <div className="p-3 sm:p-4 bg-muted/50 rounded-lg">
              <h5 className="font-medium text-sm sm:text-base text-foreground mb-1 sm:mb-2">
                Suppliers and Plugs:
              </h5>
              <p className="text-xs sm:text-sm text-muted-foreground leading-relaxed">
                For order fulfillment, customer follow-up, and inventory
                management.
              </p>
            </div>
            <div className="p-3 sm:p-4 bg-muted/50 rounded-lg">
              <h5 className="font-medium text-sm sm:text-base text-foreground mb-1 sm:mb-2">
                Legal Authorities:
              </h5>
              <p className="text-xs sm:text-sm text-muted-foreground leading-relaxed">
                If required to comply with legal obligations or protect rights,
                safety, or property.
              </p>
            </div>
          </div>
          <div className="p-3 sm:p-4 bg-primary/10 border border-primary/20 rounded-lg">
            <p className="text-xs sm:text-sm font-medium text-primary leading-relaxed">
              We do not sell or rent your personal information to third parties.
            </p>
          </div>
        </div>
      ),
    },
    {
      id: "data-protection",
      title: "How We Protect Your Information",
      icon: <Lock className="w-4 h-4 sm:w-5 sm:h-5" />,
      content: (
        <div className="space-y-3 sm:space-y-4">
          <p className="text-sm sm:text-base text-muted-foreground">We use:</p>
          <div className="space-y-2 sm:space-y-3">
            <div className="flex items-start gap-2 sm:gap-3 p-2 sm:p-3 bg-green-50 dark:bg-green-950/20 rounded-lg border border-green-200 dark:border-green-800">
              <Shield className="w-4 h-4 sm:w-5 sm:h-5 text-green-600 flex-shrink-0 mt-0.5" />
              <span className="text-xs sm:text-sm text-green-800 dark:text-green-200 leading-relaxed">
                Industry-standard encryption (SSL) for all transactions.
              </span>
            </div>
            <div className="flex items-start gap-2 sm:gap-3 p-2 sm:p-3 bg-green-50 dark:bg-green-950/20 rounded-lg border border-green-200 dark:border-green-800">
              <Shield className="w-4 h-4 sm:w-5 sm:h-5 text-green-600 flex-shrink-0 mt-0.5" />
              <span className="text-xs sm:text-sm text-green-800 dark:text-green-200 leading-relaxed">
                Secure data storage practices.
              </span>
            </div>
            <div className="flex items-start gap-2 sm:gap-3 p-2 sm:p-3 bg-green-50 dark:bg-green-950/20 rounded-lg border border-green-200 dark:border-green-800">
              <Shield className="w-4 h-4 sm:w-5 sm:h-5 text-green-600 flex-shrink-0 mt-0.5" />
              <span className="text-xs sm:text-sm text-green-800 dark:text-green-200 leading-relaxed">
                Access control to sensitive data (only authorized personnel).
              </span>
            </div>
          </div>
          <div className="p-3 sm:p-4 bg-amber-50 dark:bg-amber-950/20 border border-amber-200 dark:border-amber-800 rounded-lg">
            <p className="text-xs sm:text-sm text-amber-800 dark:text-amber-200 leading-relaxed">
              However, no online platform can guarantee 100% security. We
              continuously monitor and update our security practices.
            </p>
          </div>
        </div>
      ),
    },
    {
      id: "cookies",
      title: "Cookies and Tracking Technologies",
      icon: <Globe className="w-4 h-4 sm:w-5 sm:h-5" />,
      content: (
        <div className="space-y-3 sm:space-y-4">
          <p className="text-sm sm:text-base text-muted-foreground">
            We use cookies and similar technologies to:
          </p>
          <ul className="space-y-1.5 sm:space-y-2 text-xs sm:text-sm text-muted-foreground">
            <li className="flex items-start gap-2">
              <div className="w-1 h-1 sm:w-1.5 sm:h-1.5 bg-primary rounded-full mt-1.5 sm:mt-2 flex-shrink-0"></div>
              <span className="leading-relaxed">
                Improve site performance and user experience.
              </span>
            </li>
            <li className="flex items-start gap-2">
              <div className="w-1 h-1 sm:w-1.5 sm:h-1.5 bg-primary rounded-full mt-1.5 sm:mt-2 flex-shrink-0"></div>
              <span className="leading-relaxed">
                Track visits, purchases, and activity.
              </span>
            </li>
            <li className="flex items-start gap-2">
              <div className="w-1 h-1 sm:w-1.5 sm:h-1.5 bg-primary rounded-full mt-1.5 sm:mt-2 flex-shrink-0"></div>
              <span className="leading-relaxed">
                Personalize content and offers.
              </span>
            </li>
          </ul>
          <p className="text-xs sm:text-sm text-muted-foreground leading-relaxed">
            You can manage cookies through your browser settings.
          </p>
        </div>
      ),
    },
    {
      id: "privacy-choices",
      title: "Your Privacy Choices",
      icon: <Users className="w-4 h-4 sm:w-5 sm:h-5" />,
      content: (
        <div className="space-y-3 sm:space-y-4">
          <p className="text-sm sm:text-base text-muted-foreground">
            You have the right to:
          </p>
          <div className="space-y-2 sm:space-y-3">
            <div className="p-2 sm:p-3 bg-blue-50 dark:bg-blue-950/20 rounded-lg border border-blue-200 dark:border-blue-800">
              <p className="text-xs sm:text-sm text-blue-800 dark:text-blue-200 leading-relaxed">
                Access, update, or delete your personal information by
                contacting us.
              </p>
            </div>
            <div className="p-2 sm:p-3 bg-blue-50 dark:bg-blue-950/20 rounded-lg border border-blue-200 dark:border-blue-800">
              <p className="text-xs sm:text-sm text-blue-800 dark:text-blue-200 leading-relaxed">
                Opt-out of marketing communications at any time.
              </p>
            </div>
            <div className="p-2 sm:p-3 bg-blue-50 dark:bg-blue-950/20 rounded-lg border border-blue-200 dark:border-blue-800">
              <p className="text-xs sm:text-sm text-blue-800 dark:text-blue-200 leading-relaxed">
                Disable cookies via browser settings.
              </p>
            </div>
          </div>
         
        </div>
      ),
    },
    {
      id: "retention",
      title: "Retention of Information",
      icon: <Clock className="w-4 h-4 sm:w-5 sm:h-5" />,
      content: (
        <div className="space-y-3 sm:space-y-4">
          <p className="text-sm sm:text-base text-muted-foreground">
            We retain your personal information for as long as necessary to:
          </p>
          <ul className="space-y-1.5 sm:space-y-2 text-xs sm:text-sm text-muted-foreground">
            <li className="flex items-start gap-2">
              <div className="w-1 h-1 sm:w-1.5 sm:h-1.5 bg-primary rounded-full mt-1.5 sm:mt-2 flex-shrink-0"></div>
              <span className="leading-relaxed">Fulfill transactions.</span>
            </li>
            <li className="flex items-start gap-2">
              <div className="w-1 h-1 sm:w-1.5 sm:h-1.5 bg-primary rounded-full mt-1.5 sm:mt-2 flex-shrink-0"></div>
              <span className="leading-relaxed">
                Comply with legal obligations.
              </span>
            </li>
            <li className="flex items-start gap-2">
              <div className="w-1 h-1 sm:w-1.5 sm:h-1.5 bg-primary rounded-full mt-1.5 sm:mt-2 flex-shrink-0"></div>
              <span className="leading-relaxed">
                Resolve disputes and enforce agreements.
              </span>
            </li>
          </ul>
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
              <Shield className="w-6 h-6 sm:w-8 sm:h-8 text-primary" />
            </div>
            <h1 className="text-2xl sm:text-3xl lg:text-4xl font-bold text-foreground px-2">
              Privacy Policy
            </h1>
            <p className="text-sm sm:text-base lg:text-lg text-muted-foreground max-w-2xl mx-auto px-2 leading-relaxed">
              Your privacy is important to us. This Privacy Policy explains how
              we collect, use, disclose, and protect your personal information
              when you use Pluggn.
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
                Your privacy is important to us. This Privacy Policy explains
                how we collect, use, disclose, and protect your personal
                information when you use our website, app, products, and
                services.
              </p>
              <div className="p-3 sm:p-4 bg-primary/10 border border-primary/20 rounded-lg">
                <p className="text-xs sm:text-sm font-medium text-primary leading-relaxed">
                  By using Pluggn, you agree to the terms of this Privacy
                  Policy.
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
            style={{ animationDelay: "800ms" }}
          >
            <CardHeader className="p-4 sm:p-6 pb-3 sm:pb-4">
              <CardTitle className="flex items-start sm:items-center gap-2 sm:gap-3 text-base sm:text-lg lg:text-xl">
                <div className="p-1.5 sm:p-2 bg-primary/10 rounded-lg text-primary flex-shrink-0 mt-0.5 sm:mt-0">
                  <Users className="w-4 h-4 sm:w-5 sm:h-5" />
                </div>
                <span className="leading-tight">7. Children's Privacy</span>
              </CardTitle>
            </CardHeader>
            <CardContent className="p-4 sm:p-6 pt-0">
              <p className="text-sm sm:text-base text-muted-foreground leading-relaxed">
                Pluggn is not intended for children under 13. We do not
                knowingly collect personal information from children.
              </p>
            </CardContent>
          </Card>

          <Card
            className="animate-slide-up"
            style={{ animationDelay: "900ms" }}
          >
            <CardHeader className="p-4 sm:p-6 pb-3 sm:pb-4">
              <CardTitle className="flex items-start sm:items-center gap-2 sm:gap-3 text-base sm:text-lg lg:text-xl">
                <div className="p-1.5 sm:p-2 bg-primary/10 rounded-lg text-primary flex-shrink-0 mt-0.5 sm:mt-0">
                  <Globe className="w-4 h-4 sm:w-5 sm:h-5" />
                </div>
                <span className="leading-tight">
                  8. International Data Transfers
                </span>
              </CardTitle>
            </CardHeader>
            <CardContent className="p-4 sm:p-6 pt-0">
              <p className="text-sm sm:text-base text-muted-foreground leading-relaxed">
                Although Pluggn is based in Nigeria, your information may be
                processed and stored in other countries. We take reasonable
                steps to protect data transferred internationally.
              </p>
            </CardContent>
          </Card>

          <Card
            className="animate-slide-up"
            style={{ animationDelay: "1000ms" }}
          >
            <CardHeader className="p-4 sm:p-6 pb-3 sm:pb-4">
              <CardTitle className="flex items-start sm:items-center gap-2 sm:gap-3 text-base sm:text-lg lg:text-xl">
                <div className="p-1.5 sm:p-2 bg-primary/10 rounded-lg text-primary flex-shrink-0 mt-0.5 sm:mt-0">
                  <FileText className="w-4 h-4 sm:w-5 sm:h-5" />
                </div>
                <span className="leading-tight">
                  9. Changes to This Privacy Policy
                </span>
              </CardTitle>
            </CardHeader>
            <CardContent className="p-4 sm:p-6 pt-0">
              <p className="text-sm sm:text-base text-muted-foreground leading-relaxed">
                We may update this Privacy Policy from time to time. When we do,
                we will post the new version on this page and update the
                "Effective Date."
              </p>
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
              <span className="leading-tight">10. Contact Us</span>
            </CardTitle>
          </CardHeader>
          <CardContent className="p-4 sm:p-6 pt-0">
  <div className="space-y-3 sm:space-y-4">
    <p className="text-sm sm:text-base text-muted-foreground">
      If you have any questions about this Privacy Policy, please click to
      contact us at:
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
            This privacy policy is designed to help you understand how Pluggn
            handles your personal information.
          </p>
        </div>
      </div>
    </div>
  );
}
