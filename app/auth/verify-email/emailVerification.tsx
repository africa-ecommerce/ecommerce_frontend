"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import {
  CheckCircle,
  XCircle,
  AlertTriangle,
  ArrowRight,
  HelpCircle,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import type { VerificationStatus } from "./types";

export function VerifyEmailContent({ result }: { result: VerificationStatus }) {
  const [animateIn, setAnimateIn] = useState(false);

  useEffect(() => {
    // Trigger animation after component mounts
    const timer = setTimeout(() => setAnimateIn(true), 100);
    return () => clearTimeout(timer);
  }, []);

  // Determine which icon to show based on status
  const StatusIcon = () => {
    switch (result.status) {
      case "success":
        return (
          <CheckCircle
            className="h-10 w-10 text-green-500 mb-4"
            aria-hidden="true"
          />
        );
      case "error":
        return result.code === "token_expired" ? (
          <AlertTriangle
            className="h-10 w-10 text-amber-500 mb-4"
            aria-hidden="true"
          />
        ) : (
          <XCircle className="h-10 w-10 text-red-500 mb-4" aria-hidden="true" />
        );
      default:
        return null;
    }
  };

  // Determine which action buttons to show based on status and code
  const ActionButtons = () => {
    if (result.status === "success") {
      return (
        <Button className="w-full group" asChild>
          <Link href={"/onboarding"}>
            Continue
            <ArrowRight
              className="ml-2 h-4 w-4 transition-transform group-hover:translate-x-1"
              aria-hidden="true"
            />
          </Link>
        </Button>
      );
    }

    return (
      <>
        <Button variant="outline" className="w-full" asChild>
          <Link href="/help">
            <HelpCircle className="mr-2 h-4 w-4" aria-hidden="true" />
            Contact Support
          </Link>
        </Button>
      </>
    );
  };

  return (
    <div className="min-h-screen flex items-center justify-center p-4 bg-gradient-to-b from-gray-50 to-gray-100">
      <Card
        className={`max-w-md w-full p-8 shadow-sm border-t-4 ${
          result.status === "success"
            ? "border-t-green-500"
            : "border-t-red-500"
        } transition-all duration-500 ${
          animateIn ? "opacity-100 translate-y-0" : "opacity-0 translate-y-4"
        }`}
      >
        <div className="flex flex-col items-center text-center">
          <div className="mb-8" role="status" aria-live="polite">
            <StatusIcon />

            <h1 className="text-2xl font-semibold mb-3">{result.message}</h1>

            <p className="text-gray-600">{result.details}</p>
          </div>

          <div className="space-y-3 w-full">
            <ActionButtons />
          </div>

          <div className="mt-8 text-sm text-gray-500">
            <p>
              <Link
                href="/"
                className="text-primary hover:underline inline-flex items-center"
              >
                Return to Home
              </Link>
            </p>
          </div>
        </div>
      </Card>
    </div>
  );
}
