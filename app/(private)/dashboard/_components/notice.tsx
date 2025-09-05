import {
  AlertCircle,
  Clock,
  Image,
  DollarSign,
  FileText,
  Tag,
  ArrowLeft,
  HelpCircle
} from "lucide-react";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";

export default function ProductStatusInfo({ onBack }: { onBack: () => void }) {
  const queryReasons = [
    {
      icon: Tag,
      title: "Category Mismatch",
      description:
        "Product doesn't fit into our established product categories",
    },
    {
      icon: DollarSign,
      title: "Pricing Issues",
      description:
        "Price is deemed unfair, unrealistic, or doesn't match market standards",
    },
    {
      icon: Image,
      title: "Poor Image Quality",
      description:
        "Uploaded images are blurry, inappropriate, or don't showcase the product properly",
    },
    {
      icon: FileText,
      title: "Missing Description",
      description:
        "The category of product needs a clear description so customers understand what it does",
    },
  ];

  return (
    <div className="w-full max-w-7xl mx-auto p-2 md:p-4 space-y-8">
      {/* Header Section */}
      <div className="space-y-4">
        {/* Back Button */}
        <div className="flex items-center">
          <button
            onClick={onBack}
            className="inline-flex items-center gap-2 px-3 py-2 text-sm font-medium text-muted-foreground hover:text-foreground transition-colors rounded-lg hover:bg-muted/50"
          >
            <ArrowLeft className="w-4 h-4" />
            Back
          </button>
        </div>

        {/* Title and Description */}
        <div className="text-center">
          <h1 className="text-base md:text-xl font-bold text-balance">
            Product Status Guide
          </h1>
          <p className="text-sm md:text-base text-muted-foreground max-w-3xl mx-auto text-pretty mt-4">
            Understanding why products are queried and how our approval process
            works
          </p>
        </div>
      </div>

      {/* Main Content Grid */}
      <div className="grid gap-8 ">
        {/* Queried Products Section */}
        <Card className="h-fit">
          <CardHeader className="text-center pb-6">
            <div className="mx-auto w-16 h-16 bg-destructive/10 rounded-full flex items-center justify-center mb-4">
              <AlertCircle className="w-4 h-4 text-destructive" />
            </div>
            <CardTitle className="text-sm md:text-base">
              Queried Products
            </CardTitle>
            <CardDescription className="text-base">
              Products may be queried for the following reasons
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-6">
            {queryReasons.map((reason, index) => (
              <div
                key={index}
                className="flex gap-4 p-4 rounded-lg bg-muted/50 hover:bg-muted/70 transition-colors"
              >
                <div className="flex-shrink-0 w-10 h-10 bg-primary/10 rounded-full flex items-center justify-center">
                  <reason.icon className="w-4 h-4 text-primary" />
                </div>
                <div className="space-y-1">
                  <h3 className="font-semibold text-xs md:text-sm">
                    {reason.title}
                  </h3>
                  <p className="text-xs text-muted-foreground text-pretty">
                    {reason.description}
                  </p>
                </div>
              </div>
            ))}

            <div className="mt-6 p-4 bg-amber-50 dark:bg-amber-950/20 border border-amber-200 dark:border-amber-800 rounded-lg">
              <p className="text-xs text-amber-800 dark:text-amber-200 text-pretty">
                <strong>Note:</strong> Queried products need to be reviewed and
                updated before they can be approved for listing.
              </p>
            </div>
          </CardContent>
        </Card>

        {/* Pending Products Section */}
        <Card className="h-fit">
          <CardHeader className="text-center pb-6">
            <div className="mx-auto w-16 h-16 bg-blue-100 dark:bg-blue-950/30 rounded-full flex items-center justify-center mb-4">
              <Clock className="w-4 h-4 text-blue-600 dark:text-blue-400" />
            </div>
            <CardTitle className="text-sm md:text-base">
              Pending Products
            </CardTitle>
            <CardDescription className="text-sm">
              Products awaiting approval from our team
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-6">
            <div className="text-center space-y-4">
              <div className="inline-flex items-center gap-2 px-4 py-2 bg-blue-50 dark:bg-blue-950/20 rounded-full">
                <Badge
                  variant="secondary"
                  className="bg-blue-100 dark:bg-blue-900 text-blue-700 dark:text-blue-300"
                >
                  Processing Time
                </Badge>
              </div>

              <div className="space-y-2">
                <div className="text-sm md:text-base font-bold text-blue-600 dark:text-blue-400">
                  24 Hours
                </div>
                <p className="text-sm text-muted-foreground">
                  Maximum approval time
                </p>
              </div>
            </div>

            <div className="space-y-4">
              <div className="p-4 bg-green-50 dark:bg-green-950/20 border border-green-200 dark:border-green-800 rounded-lg">
                <h4 className="font-semibold text-green-800 dark:text-green-200 mb-2">
                  What happens during review?
                </h4>
                <ul className="text-xs text-green-700 dark:text-green-300 space-y-1">
                  <li>• Quality check of product images</li>
                  <li>• Verification of product details</li>
                  <li>• Category and pricing validation</li>
                  <li>• Content moderation review</li>
                </ul>
              </div>

              <div className="p-4 bg-blue-50 dark:bg-blue-950/20 border border-blue-200 dark:border-blue-800 rounded-lg">
                <p className="text-xs text-blue-800 dark:text-blue-200 text-pretty">
                  <strong>Good to know:</strong> Most products are approved
                  within a few hours.
                </p>
              </div>
            </div>

            {/* Progress indicator */}
            <div className="space-y-2">
              <div className="flex justify-between text-xs text-muted-foreground">
                <span>Typical processing</span>
                <span>2-6 hours</span>
              </div>
              <div className="w-full bg-muted rounded-full h-2">
                <div
                  className="bg-blue-500 h-2 rounded-full animate-pulse-gentle"
                  style={{ width: "75%" }}
                ></div>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Bottom CTA Section */}
      <Card className="bg-gradient-to-r from-primary/5 to-accent/5 border-primary/20">
        <CardContent className="text-center py-8 px-6">
          <h3 className="text-sm md:text-base font-semibold mb-2">Need Help?</h3>
          <p className="text-muted-foreground mb-4 text-pretty">
            If you have questions about your product status or need assistance
            with updates, our support team is here to help.
          </p>
          <div className="flex flex-col sm:flex-row gap-3 justify-center items-center">
            <Badge variant="outline" className="text-sm px-3 py-1">
              {" "}
              <a href="/help">
                <HelpCircle className="h-4 w-4" />
                Contact Support
              </a>
            </Badge>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
