"use client"
import { Button } from "@/components/ui/button";
import { errorToast, successToast } from "@/components/ui/use-toast-advanced";
import { Clock, RefreshCw } from "lucide-react";
import { useEffect, useState } from "react";

export const ResendVerificationEmail = ({ email }: { email: string }) => {
  const [countdown, setCountdown] = useState(60);
  const [canResend, setCanResend] = useState(false);

  useEffect(() => {
    if (countdown > 0) {
      const timer = setTimeout(() => setCountdown(countdown - 1), 1000);
      return () => clearTimeout(timer);
    } else {
      setCanResend(true);
    }
  }, [countdown]);

  const handleResendEmail = async () => {
    try {
      const response = await fetch("/api/auth/resend-verification-email", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email }),
      });

      const data = await response.json();

      if (!response.ok) {
         errorToast(data.error);
         return
      }
      
      successToast(data.message)
      setCountdown(60);
      setCanResend(false);
    } catch (error) {
      console.error(error);
      errorToast("Something went wrong");
    }
  };

  return (
    <div className="text-center space-y-4">
      <div className="flex items-center justify-center space-x-2">
        <Clock className="h-5 w-5 text-muted-foreground" />
        <p>Resend email in {countdown} seconds</p>
      </div>
      <Button
        onClick={handleResendEmail}
        disabled={!canResend}
        variant={canResend ? "default" : "outline"}
        className="w-full"
      >
        <RefreshCw className="mr-2 h-4 w-4" />
        Resend Verification Email
      </Button>
    </div>
  );
};