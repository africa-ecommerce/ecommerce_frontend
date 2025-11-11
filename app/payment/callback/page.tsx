// Create: app/payment/callback/page.tsx or pages/payment/callback.tsx

"use client"; // If using App Router

import { useEffect, useState } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { Loader2, CheckCircle, XCircle } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Alert, AlertDescription } from "@/components/ui/alert";

export default function PaymentCallbackPage() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const [status, setStatus] = useState<"loading" | "success" | "error">(
    "loading"
  );
  const [message, setMessage] = useState("Verifying your payment...");

  useEffect(() => {
    const verifyPayment = async () => {
      const reference = searchParams.get("reference");

      if (!reference) {
        setStatus("error");
        setMessage("Invalid payment reference");
        return;
      }

      try {
        // Call your confirm order endpoint
        const response = await fetch("/api/orders/confirm-order", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ reference }),
        });

        if (!response.ok) {
          const error = await response.json();
          throw new Error(error.error || "Payment verification failed");
        }

        const result = await response.json();

        setStatus("success");
        setMessage("Payment successful! Redirecting...");

        // Store order data for thank you page
        if (result.data) {
          sessionStorage.setItem("orderSuccess", JSON.stringify(result.data));
        }

        // Redirect to thank you page after 2 seconds
        setTimeout(() => {
          router.replace("/thank-you");
        }, 2000);
      } catch (error: any) {
        console.error("Payment verification error:", error);
        setStatus("error");
        setMessage(error.message || "Failed to verify payment");
      }
    };

    verifyPayment();
  }, [searchParams, router]);

  return (
    <div className="min-h-screen flex items-center justify-center p-4 bg-background">
      <Card className="w-full max-w-md">
        <CardContent className="pt-6">
          {status === "loading" && (
            <div className="text-center space-y-4">
              <Loader2 className="h-12 w-12 animate-spin mx-auto text-primary" />
              <h2 className="text-xl font-semibold">Processing Payment</h2>
              <p className="text-muted-foreground">{message}</p>
            </div>
          )}

          {status === "success" && (
            <div className="text-center space-y-4">
              <CheckCircle className="h-12 w-12 mx-auto text-green-500" />
              <h2 className="text-xl font-semibold text-green-600">
                Payment Successful!
              </h2>
              <p className="text-muted-foreground">{message}</p>
            </div>
          )}

          {status === "error" && (
            <div className="text-center space-y-4">
              <XCircle className="h-12 w-12 mx-auto text-red-500" />
              <h2 className="text-xl font-semibold text-red-600">
                Payment Failed
              </h2>
              <Alert variant="destructive" className="text-left">
                <AlertDescription>{message}</AlertDescription>
              </Alert>
              <div className="flex gap-3 justify-center pt-4">
                <Button
                  variant="outline"
                  onClick={() => router.push("/checkout")}
                >
                  Try Again
                </Button>
                <Button onClick={() => router.push("/")}>Go Home</Button>
              </div>
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  );
}
