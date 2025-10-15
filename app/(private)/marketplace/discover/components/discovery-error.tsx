"use client";

import { Button } from "@/components/ui/button";
import { AlertCircle, RefreshCw, WifiOff } from "lucide-react";

interface DiscoveryErrorProps {
  error?: string | Error | null;
  onRetry?: () => void;
  errorType?: "network" | "server" | "empty" | "timeout" | "unknown";
}

export function DiscoveryError({
  error,
  onRetry,
  errorType = "unknown",
}: DiscoveryErrorProps) {
  // Determine error type from error message if not provided
  const getErrorType = () => {
    if (errorType !== "unknown") return errorType;

    const errorMessage =
      typeof error === "string" ? error : error?.message || "";
    const lowerError = errorMessage.toLowerCase();

    if (lowerError.includes("network") || lowerError.includes("fetch")) {
      return "network";
    }
    if (lowerError.includes("timeout")) {
      return "timeout";
    }
    if (lowerError.includes("500") || lowerError.includes("server")) {
      return "server";
    }
    if (lowerError.includes("empty") || lowerError.includes("no products")) {
      return "empty";
    }
    return "unknown";
  };

  const detectedErrorType = getErrorType();

  // Error content based on type
  const errorContent = {
    network: {
      icon: WifiOff,
      title: "Oops! Lost Connection",
      message:
        "Looks like your internet took a coffee break. Check your connection and let's try again!",
      action: "Reconnect",
    },
    server: {
      icon: AlertCircle,
      title: "Our Bad!",
      message:
        "Something went wrong on our end. Our team is on it! Give it another shot in a moment.",
      action: "Try Again",
    },
    timeout: {
      icon: RefreshCw,
      title: "Taking Too Long?",
      message:
        "The request timed out. Sometimes good things take time, but not this long. Let's retry!",
      action: "Retry",
    },
    empty: {
      icon: AlertCircle,
      title: "No Products Found",
      message:
        "We couldn't find any products matching your criteria. Try adjusting your filters!",
      action: "Reset Filters",
    },
    unknown: {
      icon: AlertCircle,
      title: "Something Went Wrong",
      message:
        "We hit a snag while loading your products. Don't worry, it happens! Let's give it another go.",
      action: "Try Again",
    },
  };

  const content = errorContent[detectedErrorType];
  const Icon = content.icon;

  return (
    <div className="h-screen w-full bg-gradient-to-br from-orange-400 via-orange-300 to-orange-200 flex items-center justify-center overflow-hidden px-6">
      {/* Animated background elements */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute top-1/4 left-1/4 w-64 h-64 bg-orange-500/10 rounded-full blur-3xl animate-pulse" />
        <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-orange-400/10 rounded-full blur-3xl animate-pulse delay-700" />
      </div>

      {/* Error card */}
      <div className="relative z-10 max-w-md w-full">
        <div
          className="bg-white rounded-3xl shadow-2xl p-8 md:p-10 text-center"
          style={{
            animation: "slideUp 0.5s ease-out",
          }}
        >
          {/* Icon with animated ring */}
          <div className="relative inline-flex items-center justify-center mb-6">
            <div className="absolute inset-0 bg-orange-100 rounded-full animate-ping opacity-75" />
            <div className="relative bg-orange-500 rounded-full p-4">
              <Icon className="w-10 h-10 text-white" strokeWidth={2} />
            </div>
          </div>

          {/* Error title */}
          <h2 className="text-2xl md:text-3xl font-bold text-gray-900 mb-3">
            {content.title}
          </h2>

          {/* Error message */}
          <p className="text-gray-600 text-base md:text-lg leading-relaxed mb-8">
            {content.message}
          </p>

          {/* Action buttons */}
          <div className="flex flex-col gap-3">
            <Button
              onClick={onRetry || (() => window.location.reload())}
              size="lg"
              className="w-full bg-orange-500 hover:bg-orange-600 text-white font-semibold py-6 rounded-xl shadow-lg hover:shadow-xl transition-all duration-200 hover:scale-[1.02]"
            >
              <RefreshCw className="w-5 h-5 mr-2" />
              {content.action}
            </Button>

            {detectedErrorType !== "empty" && (
              <Button
                onClick={() => (window.location.href = "/")}
                variant="ghost"
                size="lg"
                className="w-full text-gray-600 hover:text-gray-900 font-medium py-6 rounded-xl hover:bg-orange-50 transition-all duration-200"
              >
                Go to Home
              </Button>
            )}
          </div>

          {/* Optional: Show technical error for debugging */}
          {process.env.NODE_ENV === "development" && error && (
            <details className="mt-6 text-left">
              <summary className="text-xs text-gray-400 cursor-pointer hover:text-gray-600">
                Technical Details
              </summary>
              <pre className="mt-2 text-xs text-gray-500 bg-gray-50 p-3 rounded-lg overflow-auto">
                {typeof error === "string" ? error : error.message}
              </pre>
            </details>
          )}
        </div>

        {/* Decorative floating elements */}
        <div className="absolute -top-4 -right-4 w-20 h-20 bg-orange-400/20 rounded-full blur-xl animate-bounce" />
        <div className="absolute -bottom-4 -left-4 w-16 h-16 bg-orange-300/20 rounded-full blur-xl animate-bounce delay-300" />
      </div>

      <style jsx>{`
        @keyframes slideUp {
          from {
            opacity: 0;
            transform: translateY(30px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }
        .delay-300 {
          animation-delay: 0.3s;
        }
        .delay-700 {
          animation-delay: 0.7s;
        }
      `}</style>
    </div>
  );
}
