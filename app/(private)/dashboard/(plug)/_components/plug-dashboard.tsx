"use client";

import type React from "react";

import { useMemo, useState } from "react";
import Link from "next/link";
import {
  AlertCircle,
  HelpCircle,
  LineChart,
  Package,
  RefreshCw,
  Share2,
  ShoppingBag,
  Truck,
  Users,
  Wallet,
  Phone,
} from "lucide-react";

import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import { Badge } from "@/components/ui/badge";
import { useUser } from "@/app/_components/provider/UserContext";
import { Skeleton } from "@/components/ui/skeleton";
import useSWR from "swr";
import { ScrollArea } from "@/components/ui/scroll-area";
import {
  formatPrice,
  formatQuantity,
  getTotalStocks,
  truncateText,
} from "@/lib/utils";
import WithdrawalModal from "../../_components/withdrawal-modal";
import { successToast } from "@/components/ui/use-toast-advanced";
import { useRouter } from "next/navigation";

const TwitterIcon = () => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    xmlnsXlink="http://www.w3.org/1999/xlink"
    version="1.1"
    width="16"
    height="16"
    viewBox="0 0 256 256"
  >
    <g
      style={{
        stroke: "none",
        strokeWidth: 0,
        strokeDasharray: "none",
        strokeLinecap: "butt",
        strokeLinejoin: "miter",
        strokeMiterlimit: 10,
        fill: "none",
        fillRule: "nonzero",
        opacity: 1,
      }}
      transform="translate(1.4065934065934016 1.4065934065934016) scale(2.81 2.81)"
    >
      <polygon
        points="24.89,23.01 57.79,66.99 65.24,66.99 32.34,23.01"
        style={{
          stroke: "none",
          strokeWidth: 1,
          strokeDasharray: "none",
          strokeLinecap: "butt",
          strokeLinejoin: "miter",
          strokeMiterlimit: 10,
          fill: "black",
          fillRule: "nonzero",
          opacity: 1,
        }}
        transform="matrix(1 0 0 1 0 0)"
      />
      <path
        d="M 72.349 0 H 17.651 C 7.902 0 0 7.902 0 17.651 v 54.699 C 0 82.098 7.902 90 17.651 90 h 54.699 C 82.098 90 90 82.098 90 72.349 V 17.651 C 90 7.902 82.098 0 72.349 0 z M 56.032 70.504 L 41.054 50.477 L 22.516 70.504 h -4.765 L 38.925 47.63 L 17.884 19.496 h 16.217 L 47.895 37.94 l 17.072 -18.444 h 4.765 L 50.024 40.788 l 22.225 29.716 H 56.032 z"
        style={{
          stroke: "none",
          strokeWidth: 1,
          strokeDasharray: "none",
          strokeLinecap: "butt",
          strokeLinejoin: "miter",
          strokeMiterlimit: 10,
          fill: "black",
          fillRule: "nonzero",
          opacity: 1,
        }}
        transform="matrix(1 0 0 1 0 0)"
      />
    </g>
  </svg>
);


const FacebookIcon = () => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width="16"
    height="16"
    viewBox="0 0 256 256"
  >
    <g transform="translate(1.4065934065934016 1.4065934065934016) scale(2.81 2.81)">
      <circle cx="45" cy="45" r="45" fill="currentColor" />
      <path
        d="M 38.633 37.184 v 9.136 h -10.64 v 12.388 h 10.64 v 30.836 C 40.714 89.838 42.838 90 45 90 c 2.159 0 4.28 -0.162 6.359 -0.456 V 58.708 h 10.613 l 1.589 -12.388 H 51.359 v -7.909 c 0 -3.587 0.991 -6.031 6.107 -6.031 l 6.525 -0.003 v -11.08 c -1.128 -0.151 -5.002 -0.488 -9.508 -0.488 C 45.074 20.81 38.633 26.582 38.633 37.184 z"
        fill="white"
      />
    </g>
  </svg>
);

const WhatsAppIcon = () => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width="16"
    height="16"
    viewBox="0 0 256 256"
  >
    <g transform="translate(1.4065934065934016 1.4065934065934016) scale(2.81 2.81)">
      <circle cx="45" cy="45" r="45" fill="currentColor" />
      <path
        d="M 16.138 44.738 c -0.002 5.106 1.332 10.091 3.869 14.485 l -4.112 15.013 l 15.365 -4.029 c 4.233 2.309 8.999 3.525 13.85 3.527 h 0.012 c 15.973 0 28.976 -12.999 28.983 -28.974 c 0.003 -7.742 -3.01 -15.022 -8.481 -20.498 c -5.472 -5.476 -12.749 -8.494 -20.502 -8.497 C 29.146 15.765 16.145 28.762 16.138 44.738 M 25.288 58.466 l -0.574 -0.911 c -2.412 -3.834 -3.685 -8.266 -3.683 -12.816 c 0.005 -13.278 10.811 -24.081 24.099 -24.081 c 6.435 0.003 12.482 2.511 17.031 7.062 c 4.548 4.552 7.051 10.603 7.05 17.037 C 69.205 58.036 58.399 68.84 45.121 68.84 h -0.009 c -4.323 -0.003 -8.563 -1.163 -12.261 -3.357 l -0.88 -0.522 l -9.118 2.391 L 25.288 58.466 z"
        fill="white"
      />
      <path
        d="M 37.878 32.624 c -0.543 -1.206 -1.113 -1.23 -1.63 -1.251 c -0.422 -0.018 -0.905 -0.017 -1.388 -0.017 c -0.483 0 -1.268 0.181 -1.931 0.906 c -0.664 0.725 -2.535 2.477 -2.535 6.039 c 0 3.563 2.595 7.006 2.957 7.49 c 0.362 0.483 5.01 8.028 12.37 10.931 c 6.118 2.412 7.362 1.933 8.69 1.812 c 1.328 -0.121 4.285 -1.751 4.888 -3.442 c 0.604 -1.691 0.604 -3.14 0.423 -3.443 c -0.181 -0.302 -0.664 -0.483 -1.388 -0.845 c -0.724 -0.362 -4.285 -2.114 -4.948 -2.356 c -0.664 -0.241 -1.147 -0.362 -1.63 0.363 c -0.483 0.724 -1.87 2.355 -2.292 2.838 c -0.422 0.484 -0.845 0.544 -1.569 0.182 c -0.724 -0.363 -3.057 -1.127 -5.824 -3.594 c -2.153 -1.92 -3.606 -4.29 -4.029 -5.015 c -0.422 -0.724 -0.045 -1.116 0.318 -1.477 c 0.325 -0.324 0.724 -0.846 1.087 -1.268 c 0.361 -0.423 0.482 -0.725 0.723 -1.208 c 0.242 -0.483 0.121 -0.906 -0.06 -1.269 C 39.929 37.637 38.522 34.056 37.878 32.624"
        fill="white"
      />
    </g>
  </svg>
);

const TikTokIcon = () => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width="16"
    height="16"
    viewBox="0 0 256 256"
  >
    <g transform="translate(1.4065934065934016 1.4065934065934016) scale(2.81 2.81)">
      <path
        d="M 78.974 90 H 11.026 C 4.936 90 0 85.064 0 78.974 V 11.026 C 0 4.936 4.936 0 11.026 0 h 67.948 C 85.064 0 90 4.936 90 11.026 v 67.948 C 90 85.064 85.064 90 78.974 90 z"
        fill="currentColor"
      />
      <path
        d="M 10.484 10.346 V 9.714 c -0.219 -0.031 -0.441 -0.047 -0.662 -0.048 c -2.709 0 -4.914 2.205 -4.914 4.914 c 0 1.662 0.831 3.133 2.098 4.023 c -0.848 -0.907 -1.32 -2.103 -1.319 -3.346 C 5.686 12.587 7.828 10.409 10.484 10.346"
        fill="#00f2ea"
        transform="matrix(3.89 0 0 3.89 -1.9444444444444287 -1.9444444444444287)"
      />
      <path
        d="M 10.6 17.501 c 1.209 0 2.195 -0.962 2.24 -2.16 l 0.004 -10.699 h 1.955 c -0.042 -0.223 -0.063 -0.45 -0.063 -0.677 h -2.67 l -0.005 10.699 c -0.044 1.198 -1.031 2.159 -2.24 2.159 c -0.363 0 -0.72 -0.088 -1.041 -0.258 C 9.201 17.153 9.878 17.501 10.6 17.501 M 18.45 8.274 V 7.68 c -0.718 0.001 -1.421 -0.208 -2.022 -0.601 C 16.954 7.685 17.664 8.105 18.45 8.274"
        fill="#00f2ea"
        transform="matrix(3.89 0 0 3.89 -1.9444444444444287 -1.9444444444444287)"
      />
      <path
        d="M 16.427 7.078 c -0.589 -0.674 -0.914 -1.539 -0.913 -2.435 h -0.715 C 14.986 5.643 15.574 6.523 16.427 7.078 M 9.822 12.336 c -1.239 0.001 -2.243 1.005 -2.244 2.244 c 0.001 0.834 0.464 1.599 1.203 1.986 c -0.276 -0.381 -0.425 -0.839 -0.425 -1.309 c 0.001 -1.239 1.005 -2.243 2.244 -2.244 c 0.231 0 0.453 0.038 0.662 0.104 v -2.725 c -0.219 -0.031 -0.441 -0.047 -0.662 -0.048 c -0.039 0 -0.077 0.002 -0.116 0.003 v 2.093 C 10.27 12.371 10.047 12.336 9.822 12.336"
        fill="#ff004f"
        transform="matrix(3.89 0 0 3.89 -1.9444444444444287 -1.9444444444444287)"
      />
      <path
        d="M 18.45 8.274 v 2.075 c -1.384 0 -2.667 -0.443 -3.714 -1.194 v 5.425 c 0 2.709 -2.204 4.914 -4.913 4.914 c -1.047 0 -2.018 -0.33 -2.816 -0.891 c 0.927 1 2.23 1.569 3.594 1.568 c 2.709 0 4.914 -2.204 4.914 -4.913 V 9.832 c 1.082 0.778 2.381 1.196 3.714 1.194 v -2.67 C 18.961 8.356 18.701 8.327 18.45 8.274"
        fill="#ff004f"
        transform="matrix(3.89 0 0 3.89 -1.9444444444444287 -1.9444444444444287)"
      />
      <path
        d="M 14.735 14.58 V 9.154 c 1.082 0.778 2.382 1.196 3.714 1.194 V 8.274 c -0.786 -0.169 -1.495 -0.589 -2.022 -1.196 c -0.853 -0.555 -1.442 -1.435 -1.629 -2.435 h -1.954 L 12.84 15.342 c -0.045 1.198 -1.031 2.16 -2.24 2.16 c -0.722 -0.001 -1.399 -0.349 -1.819 -0.935 c -0.739 -0.387 -1.202 -1.152 -1.203 -1.986 c 0.001 -1.239 1.005 -2.243 2.244 -2.244 c 0.231 0 0.452 0.038 0.662 0.104 v -2.093 c -2.656 0.062 -4.798 2.24 -4.798 4.911 c 0 1.292 0.502 2.467 1.319 3.346 c 0.824 0.58 1.808 0.891 2.816 0.89 C 12.531 19.493 14.735 17.289 14.735 14.58"
        fill="white"
        transform="matrix(3.89 0 0 3.89 -1.9444444444444287 -1.9444444444444287)"
      />
    </g>
  </svg>
);

const InstagramIcon = () => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width="16"
    height="16"
    viewBox="0 0 256 256"
  >
    <g transform="translate(1.4065934065934016 1.4065934065934016) scale(2.81 2.81)">
      <linearGradient
        id="SVGID_3"
        gradientUnits="userSpaceOnUse"
        gradientTransform="matrix(1 0 0 -1 0 92)"
        x1="7.5528"
        y1="9.5531"
        x2="82.4473"
        y2="84.4475"
      >
        <stop offset="0%" stopColor="rgb(255,214,0)" stopOpacity="1" />
        <stop offset="50%" stopColor="rgb(255,1,0)" stopOpacity="1" />
        <stop offset="100%" stopColor="rgb(216,0,185)" stopOpacity="1" />
      </linearGradient>
      <path
        d="M 89.729 26.447 c -0.219 -4.79 -0.98 -8.061 -2.092 -10.923 c -1.13 -3.003 -2.901 -5.723 -5.19 -7.971 c -2.247 -2.289 -4.968 -4.062 -7.971 -5.192 C 71.614 1.25 68.343 0.49 63.553 0.272 C 58.754 0.053 57.221 0 45 0 S 31.246 0.053 26.447 0.271 c -4.79 0.219 -8.061 0.98 -10.923 2.092 c -3.003 1.13 -5.723 2.901 -7.971 5.19 c -2.289 2.247 -4.062 4.967 -5.192 7.97 C 1.25 18.386 0.49 21.657 0.272 26.446 C 0.052 31.246 0 32.779 0 45 c 0 12.222 0.052 13.755 0.272 18.554 c 0.218 4.789 0.979 8.061 2.092 10.923 c 1.13 3.002 2.901 5.723 5.19 7.97 c 2.247 2.289 4.968 4.061 7.971 5.19 c 2.862 1.113 6.133 1.873 10.923 2.092 C 31.247 89.948 32.78 90 45.001 90 s 13.754 -0.051 18.553 -0.271 c 4.79 -0.219 8.061 -0.979 10.923 -2.092 c 6.045 -2.337 10.823 -7.116 13.16 -13.16 c 1.113 -2.863 1.873 -6.134 2.092 -10.923 C 89.948 58.754 90 57.221 90 45 C 90 32.779 89.948 31.246 89.729 26.447 z M 81.629 63.185 c -0.2 4.388 -0.933 6.77 -1.549 8.356 c -1.514 3.925 -4.616 7.026 -8.54 8.54 c -1.585 0.616 -3.968 1.349 -8.356 1.549 C 58.44 81.847 57.016 81.892 45 81.892 c -12.017 0 -13.44 -0.045 -18.184 -0.262 c -4.387 -0.2 -6.77 -0.933 -8.356 -1.549 c -1.954 -0.722 -3.722 -1.872 -5.174 -3.367 c -1.495 -1.452 -2.645 -3.219 -3.367 -5.174 c -0.616 -1.585 -1.349 -3.968 -1.549 -8.356 c -0.216 -4.745 -0.262 -6.168 -0.262 -18.184 c 0 -12.016 0.046 -13.439 0.262 -18.184 c 0.201 -4.388 0.933 -6.77 1.549 -8.356 c 0.722 -1.955 1.872 -3.723 3.367 -5.175 c 1.452 -1.495 3.22 -2.645 5.175 -3.366 c 1.585 -0.617 3.968 -1.349 8.356 -1.55 C 31.561 8.154 32.984 8.108 45 8.108 h -0.001 c 12.016 0 13.439 0.046 18.184 0.263 c 4.388 0.2 6.77 0.933 8.356 1.549 c 1.954 0.722 3.722 1.872 5.174 3.366 c 1.495 1.452 2.645 3.22 3.366 5.175 c 0.617 1.585 1.35 3.968 1.55 8.356 c 0.216 4.745 0.262 6.168 0.262 18.184 C 81.891 57.017 81.846 58.439 81.629 63.185 z"
        fill="url(#SVGID_3)"
      />
      <linearGradient
        id="SVGID_4"
        gradientUnits="userSpaceOnUse"
        gradientTransform="matrix(1 0 0 -1 0 92)"
        x1="28.6598"
        y1="30.66"
        x2="61.3394"
        y2="63.3397"
      >
        <stop offset="0%" stopColor="rgb(255,100,0)"  stopOpacity="1" />
        <stop offset="50%" stopColor="rgb(255,1,0);s" stopOpacity="1"/>
        <stop offset="100%" stopColor="rgb(253,0,86)"  stopOpacity="1" />
      </linearGradient>
      <path
        d="M 44.999 21.892 c -12.762 0 -23.108 10.346 -23.108 23.108 s 10.346 23.108 23.108 23.108 c 12.763 0 23.108 -10.346 23.108 -23.108 S 57.762 21.892 44.999 21.892 z M 44.999 60 C 36.716 59.999 30 53.284 30 45 c 0 -8.284 6.715 -15 15 -15 c 8.284 0.001 15 6.716 15 15 C 60 53.284 53.284 60 44.999 60 z"
        fill="url(#SVGID_4)"
      />
      <linearGradient
        id="SVGID_5"
        gradientUnits="userSpaceOnUse"
        gradientTransform="matrix(1 0 0 -1 0 92)"
        x1="65.2021"
        y1="67.2024"
        x2="72.8391"
        y2="74.8394"
      >
        <stop offset="0%" stopColor="rgb(243,0,114)" stop-opacity="1" />
        <stop offset="100%" stopColor="rgb(229,0,151)" stop-opacity="1" />
      </linearGradient>
      <path
        d="M 74.421 20.979 c 0 2.982 -2.418 5.4 -5.4 5.4 c -2.983 0 -5.4 -2.418 -5.4 -5.4 c 0 -2.983 2.418 -5.4 5.4 -5.4 C 72.003 15.579 74.421 17.997 74.421 20.979 z"
        fill="url(#SVGID_5)"
      />
    </g>
  </svg>
);

function getProductPerformanceByAverage(productsArray: any) {
  const productsWithSales = productsArray.filter(
    (product: any) => product.sold > 0
  );

  if (productsWithSales.length === 0) {
    return {
      topProducts: [],
      bottomProducts: [],
      averageProducts: [],
      averageSales: 0,
    };
  }

  const totalSales = productsWithSales.reduce(
    (sum: any, product: any) => sum + product.sold,
    0
  );
  const averageSales = totalSales / productsWithSales.length;
  const threshold = averageSales * 0.5; // 50% below average = low performing

  const topProducts = productsWithSales
    .filter((product: any) => product.sold >= averageSales)
    .sort((a: any, b: any) => b.sold - a.sold)
    .slice(0, 5);

  const bottomProducts = productsWithSales
    .filter((product: any) => product.sold < threshold)
    .sort((a: any, b: any) => a.sold - b.sold)
    .slice(0, 5);

  const averageProducts = productsWithSales
    .filter(
      (product: any) => product.sold >= threshold && product.sold < averageSales
    )
    .sort((a: any, b: any) => b.sold - a.sold)
    .slice(0, 5);

  return {
    topProducts,
    bottomProducts,
    averageProducts,
    averageSales: Math.round(averageSales),
  };
}

const ErrorState = ({ onRetry }: { onRetry?: () => void }) => (
  <Card className="border rounded-lg">
    <CardContent className="p-4 text-center">
      <div className="flex flex-col items-center justify-center space-y-2">
        <AlertCircle className="h-6 w-6 text-destructive" />
        <h3 className="text-sm font-medium">Failed to load data</h3>
        <p className="text-muted-foreground text-xs">
          Something went wrong while loading the data
        </p>
        {onRetry && (
          <Button
            variant="outline"
            size="sm"
            onClick={onRetry}
            className="mt-1"
          >
            <RefreshCw className="mr-1 h-3 w-3" />
            Retry
          </Button>
        )}
      </div>
    </CardContent>
  </Card>
);

// Empty State with responsive adjustments
const EmptyState = ({
  message,
  icon: Icon = Package,
  actionText,
  onAction,
  className = "",
}: {
  message: string;
  icon?: React.ComponentType<{ className?: string }>;
  actionText?: string;
  onAction?: () => void;
  className?: string;
}) => (
  <Card className={`border rounded-lg ${className}`}>
    <CardContent className="p-4 text-center">
      <div className="flex flex-col items-center justify-center space-y-2">
        <Icon className="h-6 w-6 text-muted-foreground" />
        <p className="text-muted-foreground text-xs">{message}</p>
        {actionText && onAction && (
          <Button
            variant="outline"
            size="sm"
            onClick={onAction}
            className="mt-1"
          >
            {actionText}
          </Button>
        )}
      </div>
    </CardContent>
  </Card>
);

// Loading Skeletons for different sections
const RevenueLoadingSkeleton = () => (
  <div className="grid grid-cols-2 gap-2 sm:gap-3">
    {[...Array(4)].map((_, i) => (
      <Card key={i} className="h-full border rounded-lg">
        <CardHeader className="p-2 sm:p-3 pb-0">
          <Skeleton className="h-4 w-[100px]" />
        </CardHeader>
        <CardContent className="p-2 sm:p-3 pt-0">
          <Skeleton className="h-5 w-12" />
        </CardContent>
      </Card>
    ))}
  </div>
);

const StockLoadingSkeleton = () => (
  <div className="space-y-3">
    {[...Array(3)].map((_, i) => (
      <Card key={i} className="border rounded-lg">
        <CardContent className="p-3">
          <div className="flex items-center gap-3">
            <Skeleton className="w-10 h-10 rounded-full" />
            <div className="flex-1 space-y-2">
              <Skeleton className="h-4 w-[120px]" />
              <Skeleton className="h-3 w-[80px]" />
              <Skeleton className="h-1 w-full" />
            </div>
          </div>
        </CardContent>
      </Card>
    ))}
  </div>
);

const OrderLoadingSkeleton = () => (
  <div className="space-y-3">
    {[...Array(2)].map((_, i) => (
      <Card key={i} className="border rounded-lg">
        <CardContent className="p-3">
          <div className="space-y-2">
            <Skeleton className="h-4 w-[100px]" />
            <div className="flex items-center gap-2">
              <Skeleton className="h-6 w-6 rounded-full" />
              <div className="space-y-1 flex-1">
                <Skeleton className="h-3 w-full" />
                <Skeleton className="h-3 w-2/3" />
              </div>
            </div>
            <div className="space-y-1">
              <Skeleton className="h-3 w-full" />
              <Skeleton className="h-3 w-3/4" />
            </div>
          </div>
        </CardContent>
      </Card>
    ))}
  </div>
);

const ProductLoadingSkeleton = () => (
  <div className="grid grid-cols-1 md:grid-cols-2 gap-3 sm:gap-4">
    {[...Array(2)].map((_, i) => (
      <Card key={i}>
        <CardHeader className="p-3 sm:p-4 pb-1 sm:pb-2">
          <Skeleton className="h-5 w-[150px]" />
        </CardHeader>
        <CardContent className="p-3 sm:p-4 pt-0">
          <div className="space-y-3 sm:space-y-4">
            {[...Array(3)].map((_, j) => (
              <div key={j} className="flex items-center gap-2 sm:gap-3">
                <Skeleton className="w-10 h-10 sm:w-12 sm:h-12 rounded-md" />
                <div className="flex-1 min-w-0 space-y-2">
                  <Skeleton className="h-4 w-full" />
                  <Skeleton className="h-3 w-3/4" />
                  <Skeleton className="h-1 w-full" />
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    ))}
  </div>
);

const SocialLoadingSkeleton = () => (
  <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-4">
    {[...Array(4)].map((_, i) => (
      <Card key={i}>
        <CardHeader className="p-3 sm:p-4 pb-1 sm:pb-2">
          <Skeleton className="h-5 w-[120px]" />
        </CardHeader>
        <CardContent className="p-3 sm:p-4 pt-0">
          <Skeleton className="h-6 w-[50px] mb-2" />
          <Skeleton className="h-3 w-full mb-3" />
          <div className="space-y-2">
            <Skeleton className="h-3 w-full" />
            <Skeleton className="h-1 w-full" />
            <Skeleton className="h-3 w-full" />
            <Skeleton className="h-1 w-full" />
          </div>
        </CardContent>
      </Card>
    ))}
  </div>
);

const EducationalTipSkeleton = () => (
  <Card className="bg-primary/10 border-primary/20">
    <CardContent className="p-3 sm:p-4 flex gap-2 sm:gap-3 items-center">
      <Skeleton className="rounded-full h-8 w-8 flex-shrink-0" />
      <div className="flex-1 min-w-0 space-y-2">
        <Skeleton className="h-3 w-[120px]" />
        <Skeleton className="h-2 w-full" />
        <Skeleton className="h-2 w-3/4" />
      </div>
      <Skeleton className="h-7 w-[80px]" />
    </CardContent>
  </Card>
);

const WelcomeSkeleton = () => (
  <div className="flex-1 min-w-0">
    <Skeleton className="h-4 w-[180px] mb-1" />
    <Skeleton className="h-3 w-[200px]" />
  </div>
);

export default function PlugDashboard() {
  const [isModalOpen, setIsModalOpen] = useState(false);

  const {
    userData: { user },
  } = useUser();

  // Fetch products data
  const {
    data,
    error: errorData,
    isLoading,
    mutate,
  } = useSWR("/api/plug/products/");

  const {
    data: analyticsData,
    error: analyticsError,
    isLoading: analyticsLoading,
    mutate: analyticsMutate,
  } = useSWR("/api/analytics/links", {
    refreshInterval: 300000, // Refresh every 5 minutes
    revalidateOnFocus: true,
    revalidateOnReconnect: true,
    dedupingInterval: 60000, // Prevent duplicate requests within 1 minute
    errorRetryCount: 3,
    errorRetryInterval: 5000,
  });

  const router = useRouter();

  // Fetch shipped orders data - following the exact pattern from products component
  const getOrdersUrl = (status: string) => {
    return `/api/orders/plug?orderStatus=${status.toUpperCase()}`;
  };

  const {
    data: ordersData,
    error: ordersError,
    isLoading: ordersLoading,
    mutate: ordersMutate,
  } = useSWR(getOrdersUrl("shipped"), {
    refreshInterval: 30000, // Poll every 30 seconds
    revalidateOnFocus: true,
    revalidateOnReconnect: true,
    dedupingInterval: 10000, // Prevent duplicate requests within 10 seconds
    errorRetryCount: 2,
    errorRetryInterval: 5000,
  });

  const {
    data: paymentData,
    error: paymentError,
    isLoading: paymentLoading,
    mutate: paymentMutate,
  } = useSWR("/api/payments/plug/earnings", {
    refreshInterval: 300000, // Refresh every 5 minutes
    revalidateOnFocus: true,
    revalidateOnReconnect: true,
    dedupingInterval: 60000, // Prevent duplicate requests within 1 minute
    errorRetryCount: 2,
    errorRetryInterval: 5000,
  });

  const products = Array.isArray(data?.data) ? data?.data : [];

  // Process orders data - following the exact pattern from products component
  const orders = Array.isArray(ordersData?.data) ? ordersData?.data : [];

  const stats = useMemo(() => {
    if (!products.length)
      return {
        totalProfit: 0,
      };

    return {
      totalProfit: products.reduce((total: any, item: any) => {
        if (item.variations && item.variations.length > 0) {
          // Calculate profit across all variations
          const variationProfit = item.variations.reduce(
            (sum: number, variation: any) =>
              sum +
              ((item.price || 0) - (item.originalPrice || 0)) *
                (variation.stocks || 0),
            0
          );
          return total + variationProfit;
        }
        // If no variations, calculate profit using item stock directly
        return (
          total +
          ((item.price || 0) - (item.originalPrice || 0)) * (item.stocks || 0)
        );
      }, 0),
    };
  }, [products]);

  const processAnalyticsData = useMemo(() => {
    if (!analyticsData || !Array.isArray(analyticsData)) {
      return [];
    }

    const data = analyticsData;

    const totalOrdersObj = analyticsData.find((item) => "totalOrders" in item);
    const totalOrders = totalOrdersObj?.totalOrders;

    // Filter out "store" platform from display
    const socialPlatforms = data.filter(
      (item: any) => item.platform && item.platform.toLowerCase() !== "store"
    );

    // Platform image mapping
    

    // Platform color mapping
    const platformColors: { [key: string]: string } = {
      whatsapp: "text-green-600",
      instagram: "text-pink-600",
      twitter: "text-black",
      facebook: "text-blue-600",
      tiktok: "text-black",
    };

    return socialPlatforms.map((item: any) => {
      const platformName = item.platform;
      const salesPercentage =
        totalOrders > 0 ? Math.round((item.orders / totalOrders) * 100) : 0;

      return {
        platform: platformName,
        percentage: `${salesPercentage}%`,
        description: `Of your sales come from ${platformName}`,
        color: platformColors[platformName.toLowerCase()] || "text-gray-600",
       
        stats: [
          {
            label: "Visits",
            value: item.clicks.toString(),
          },
          {
            label: "Conversions",
            value: `${item.orders} (${item.conversionRate}%)`,
          },
        ],
      };
    });
  }, [analyticsData]);

  const { topProducts, bottomProducts, averageProducts, averageSales } =
    getProductPerformanceByAverage(products);

  // OrderCard component - following the exact pattern from products component
  const OrderCard = ({ order }: { order: any }) => {
    const getStatusBadge = (status: string) => {
      return (
        <Badge
          variant="secondary"
          className="bg-orange-500 hover:bg-orange-600"
        >
          Shipped
        </Badge>
      );
    };

    // Calculate total amount from order items
    const totalAmount =
      order.orderItems?.reduce((total: number, item: any) => {
        return total + (item.plugPrice || 0) * item.quantity;
      }, 0) || 0;

    const formatDate = (dateString: string) => {
      const date = new Date(dateString);
      return date.toLocaleDateString("en-US", {
        year: "numeric",
        month: "short",
        day: "numeric",
      });
    };

    const capitalizeWords = (str: string) => {
      return (
        str
          ?.split(" ")
          .map(
            (word) => word.charAt(0).toUpperCase() + word.slice(1).toLowerCase()
          )
          .join(" ") || ""
      );
    };

    const handleTrackOrder = () => {
      router.push(`/track-order/${order.orderId}`);
    };

    // Handle native sharing
    const handleShareTracking = async () => {
      const trackingUrl = `${process.env.NEXT_PUBLIC_APP_URL}/track-order/${order.orderId}`;

      if (navigator.share) {
        try {
          await navigator.share({
            title: `Track Order ${order.orderId}`,
            text: `Track your order ${order.orderId} from pluggn`,
            url: trackingUrl,
          });
        } catch (error) {
          fallbackShare(trackingUrl);
        }
      } else {
        fallbackShare(trackingUrl);
      }
    };

    // Fallback sharing method
    const fallbackShare = async (url: string) => {
      try {
        await navigator.clipboard.writeText(url);
        successToast("Tracking link copied to clipboard!");
      } catch (error) {
        console.error("Failed to copy to clipboard:", error);
        // Final fallback: open in new window/tab
        window.open(url, "_blank");
      }
    };

    return (
      <Card className="mb-3 sm:mb-4 last:mb-0">
        <CardHeader className="p-3 sm:p-4 pb-2">
          <div className="flex justify-between items-start gap-2">
            <div className="min-w-0">
              <CardTitle className="text-sm font-medium">
                {order.orderId}
              </CardTitle>
              <CardDescription className="text-xs mt-1">
                {formatDate(order.createdAt)}
              </CardDescription>
            </div>
            {getStatusBadge("shipped")}
          </div>
        </CardHeader>

        <CardContent className="p-3 sm:p-4 pt-0 space-y-3">
          {/* Customer Info */}
          <div className="flex items-center gap-2 text-sm">
            <Users className="h-4 w-4 text-muted-foreground" />
            <span className="font-medium">
              {capitalizeWords(order.buyerName)}
            </span>
            <span className="text-muted-foreground">•</span>
            <span className="text-muted-foreground">
              {capitalizeWords(order.buyerLga)},{" "}
              {capitalizeWords(order.buyerState)}
            </span>
          </div>

          {/* Phone Number */}
          <div className="flex items-center gap-2 text-sm text-muted-foreground">
            <Phone className="h-4 w-4" />
            <span>{order.buyerPhone}</span>
          </div>

          {/* Products */}
          <div className="space-y-2">
            {order.orderItems?.map((item: any, index: number) => (
              <div key={item.id} className="flex justify-between items-center">
                <div className="flex-1">
                  <div className="text-sm font-medium capitalize">
                    {item.productName} x {item.quantity}
                  </div>
                  {/* Show variant details if available */}
                  {item.variantId &&
                    (item.variantColor || item.variantSize) && (
                      <div className="flex gap-2 text-xs text-muted-foreground mt-1">
                        {item.variantColor && (
                          <span className="capitalize">
                            {item.variantColor}
                          </span>
                        )}
                        {item.variantSize && (
                          <span className="capitalize">
                            ({item.variantSize})
                          </span>
                        )}
                      </div>
                    )}
                  {/* Show product color/size if no variant but has product color/size */}
                  {!item.variantId &&
                    (item.productColor || item.productSize) && (
                      <div className="flex gap-2 text-xs text-muted-foreground mt-1">
                        {item.productColor && (
                          <span className="capitalize">
                            {item.productColor}
                          </span>
                        )}
                        {item.productSize && (
                          <span className="capitalize">
                            ({item.productSize})
                          </span>
                        )}
                      </div>
                    )}
                </div>
                <div className="text-sm font-medium">
                  ₦{((item.plugPrice || 0) * item.quantity).toLocaleString()}
                </div>
              </div>
            ))}
          </div>

          {/* Total */}
          <div className="flex justify-between items-center pt-2 text-sm border-t">
            <span className="font-medium">Total</span>
            <span className="font-bold">₦{totalAmount.toLocaleString()}</span>
          </div>
        </CardContent>

        {/* Action Buttons */}
        <CardFooter className="p-3 sm:p-4 pt-1 flex gap-2">
          <Button
            variant="outline"
            size="sm"
            className="flex-1 h-8 text-xs"
            onClick={handleShareTracking}
          >
            <Share2 className="h-3 w-3 mr-1" />
            Share Tracking
          </Button>
          <Button
            size="sm"
            className="flex-1 h-8 text-xs"
            onClick={handleTrackOrder}
          >
            <Truck className="h-3 w-3 mr-1" />
            Track Order
          </Button>
        </CardFooter>
      </Card>
    );
  };

  const stockAlerts = useMemo(() => {
    if (!products.length) return [];

    const outOfStockItems = products
      .filter((item: any) => getTotalStocks(item) === 0)
      .map((item: any) => ({
        id: item.id,
        product: item.name,
        status: "Out of Stock",
        units: "0 units left",
        salesRate: "Urgent attention needed",
        progress: 0,
      }));

    const lowStockItems = products
      .filter(
        (item: any) =>
          getTotalStocks(item) !== undefined &&
          getTotalStocks(item) > 0 &&
          getTotalStocks(item) <= 5
      )
      .map((item: any) => ({
        id: item.id,
        product: item.name,
        status: "Low Stock",
        units: `Only ${formatQuantity(getTotalStocks(item))} units left`,
        salesRate: "Restock recommended",
      }));

    return [...outOfStockItems, ...lowStockItems].slice(0, 3);
  }, [products]);

  return (
    <TooltipProvider>
      <div className="flex flex-col min-h-screen bg-background p-3 sm:p-4 gap-3 sm:gap-4">
        {/* Header */}
        {isLoading && !user?.plug.businessName ? (
          <WelcomeSkeleton />
        ) : (
          <div className="flex items-center justify-between gap-2">
            <div className="flex-1 min-w-0">
              <h1 className="text-muted-foreground font-semibold text-sm truncate capitalize">
                Welcome back, {user?.plug.businessName}!
              </h1>
              <h1 className="text-muted-foreground text-xs sm:text-sm">
                Here's your business at a glance.
              </h1>
            </div>
          </div>
        )}

        {/* Revenue Snapshot */}
        <section className="space-y-3 sm:space-y-4">
          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-1">
            <h2 className="text-sm sm:text-base font-semibold">
              Revenue Snapshot
            </h2>
          </div>

          {isLoading || paymentLoading ? (
            <RevenueLoadingSkeleton />
          ) : errorData || paymentError ? (
            <ErrorState
              onRetry={() => {
                mutate();
                paymentMutate();
              }}
            />
          ) : (
            <div className="grid grid-cols-2 gap-2 sm:gap-3">
              <Card className="h-full border rounded-lg">
                <CardHeader className="p-2 sm:p-3 pb-0">
                  <CardTitle className="text-xs sm:text-sm font-medium flex items-center gap-1">
                    Total Earnings
                    <Tooltip>
                      <TooltipTrigger asChild>
                        <HelpCircle className="h-3 w-3 text-muted-foreground" />
                      </TooltipTrigger>
                      <TooltipContent className="text-xs">
                        <p>Total amount earned from sales</p>
                      </TooltipContent>
                    </Tooltip>
                  </CardTitle>
                </CardHeader>
                <CardContent className="p-2 sm:p-3 pt-0">
                  <div className="text-base sm:text-lg font-bold">
                    {formatPrice(String(paymentData?.data.totalEarnings))}
                  </div>
                </CardContent>
              </Card>

              <Card className="h-full border rounded-lg">
                <CardHeader className="p-2 sm:p-3 pb-0">
                  <CardTitle className="text-xs sm:text-sm font-medium flex items-center gap-1">
                    Profit before commission
                    <Tooltip>
                      <TooltipTrigger asChild>
                        <HelpCircle className="h-3 w-3 text-muted-foreground" />
                      </TooltipTrigger>
                      <TooltipContent className="text-xs">
                        <p>Total profit from plugged products</p>
                      </TooltipContent>
                    </Tooltip>
                  </CardTitle>
                </CardHeader>
                <CardContent className="p-2 sm:p-3 pt-0">
                  <div className="text-base sm:text-lg font-bold text-green-500">
                    {`₦${stats.totalProfit.toLocaleString()}`}
                  </div>
                </CardContent>
              </Card>

              <Card className="h-full border rounded-lg">
                <CardHeader className="p-2 sm:p-3 pb-0">
                  <CardTitle className="text-xs sm:text-sm font-medium flex items-center gap-1">
                    Pending Payments
                    <Tooltip>
                      <TooltipTrigger asChild>
                        <HelpCircle className="h-3 w-3 text-muted-foreground" />
                      </TooltipTrigger>
                      <TooltipContent className="text-xs">
                        <p>Money in escrow to be released</p>
                      </TooltipContent>
                    </Tooltip>
                  </CardTitle>
                </CardHeader>
                <CardContent className="p-2 sm:p-3 pt-0">
                  <div className="text-base sm:text-lg font-bold">
                    {formatPrice(String(paymentData?.data.lockedAmount))}
                  </div>
                </CardContent>
              </Card>

              <Card className="h-full border rounded-lg">
                <CardHeader className="p-2 sm:p-3 pb-0">
                  <CardTitle className="text-xs sm:text-sm font-medium flex items-center gap-1">
                    Available Balance
                    <Tooltip>
                      <TooltipTrigger asChild>
                        <HelpCircle className="h-3 w-3 text-muted-foreground" />
                      </TooltipTrigger>
                      <TooltipContent className="text-xs">
                        <p>Money ready for withdrawal</p>
                      </TooltipContent>
                    </Tooltip>
                  </CardTitle>
                </CardHeader>
                <CardContent className="p-2 sm:p-3 pt-0">
                  <div className="text-base sm:text-lg font-bold">
                    {formatPrice(String(paymentData?.data.unlockedAmount))}
                  </div>
                  <Button
                    variant="outline"
                    size="sm"
                    className="w-full mt-1 h-6 text-xs"
                    onClick={() => setIsModalOpen(true)}
                  >
                    <Wallet className="h-2.5 w-2.5 mr-1" /> Withdraw
                  </Button>
                </CardContent>
              </Card>
            </div>
          )}
        </section>

        {/* Stock Alerts Section */}
        <section className="space-y-3 sm:space-y-4">
          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-1">
            <h2 className="text-sm sm:text-base font-semibold">Stock Alerts</h2>
          </div>

          {isLoading ? (
            <StockLoadingSkeleton />
          ) : errorData ? (
            <ErrorState onRetry={() => mutate()} />
          ) : stockAlerts.length === 0 ? (
            <EmptyState
              message="No stock alerts at this time"
              icon={AlertCircle}
            />
          ) : (
            <Card className="border rounded-lg">
              <CardHeader className="p-3 sm:p-4 pb-1">
                <CardTitle className="text-xs sm:text-sm font-medium">
                  Stock Alerts
                </CardTitle>
              </CardHeader>
              <CardContent className="p-3 sm:p-4 pt-0">
                <div className="space-y-3 max-h-[300px] overflow-y-auto">
                  {stockAlerts.map((alert) => (
                    <div
                      key={alert.id}
                      className="flex items-center gap-2 sm:gap-3"
                    >
                      <div
                        className={`w-8 h-8 sm:w-10 sm:h-10 rounded-full flex items-center justify-center flex-shrink-0 ${
                          alert.status === "Out of Stock"
                            ? "bg-red-100"
                            : "bg-amber-100"
                        }`}
                      >
                        <AlertCircle
                          className={`h-4 w-4 sm:h-5 sm:w-5 ${
                            alert.status === "Out of Stock"
                              ? "text-red-600"
                              : "text-amber-600"
                          }`}
                        />
                      </div>
                      <div className="flex-1 min-w-0">
                        <div className="flex justify-between items-center gap-1">
                          <p className="text-xs sm:text-sm font-medium truncate capitalize">
                            {truncateText(alert.product, 20)}
                          </p>
                          <Badge
                            variant="outline"
                            className={`text-[10px] sm:text-xs ${
                              alert.status === "Out of Stock"
                                ? "text-red-600 border-red-200 bg-red-50"
                                : "text-amber-600 border-amber-200 bg-amber-50"
                            }`}
                          >
                            {alert.status}
                          </Badge>
                        </div>
                        <div className="flex justify-between text-[10px] sm:text-xs text-muted-foreground">
                          <p>{alert.units}</p>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          )}
        </section>

        {/* Order Management Section - Now showing shipped orders */}
        <section className="space-y-3 sm:space-y-4">
          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-1">
            <h2 className="text-sm sm:text-base font-semibold">
              Shipped Orders
            </h2>
            <Button variant="outline" size="sm" asChild className="text-xs">
              <Link href="/dashboard/product">View All Orders</Link>
            </Button>
          </div>

          {ordersLoading ? (
            <OrderLoadingSkeleton />
          ) : ordersError ? (
            <ErrorState onRetry={() => ordersMutate()} />
          ) : orders.length === 0 ? (
            <EmptyState message="No shipped orders found" icon={Truck} />
          ) : (
            <div className="space-y-3 sm:space-y-4 max-h-[400px] overflow-y-auto">
              {orders.map((order: any) => (
                <OrderCard key={order.id} order={order} />
              ))}
            </div>
          )}
        </section>

        {/* Product Performance */}

        <section className="space-y-3 sm:space-y-4">
          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-2">
            <div>
              <h2 className="text-sm sm:text-base font-semibold">
                Product Performance
              </h2>
              {!isLoading && !errorData && averageSales > 0 && (
                <p className="text-xs text-muted-foreground">
                  Average sales: {averageSales} units per product
                </p>
              )}
            </div>
            <Button variant="outline" size="sm" asChild className="text-xs">
              <Link href="/dashboard/product">View All Products</Link>
            </Button>
          </div>

          {isLoading ? (
            <ProductLoadingSkeleton />
          ) : errorData ? (
            <ErrorState
              onRetry={() => {
                mutate();
              }}
            />
          ) : (
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-3 sm:gap-4">
              {/* Top Performing Products */}
              <Card>
                <CardHeader className="p-3 sm:p-4 pb-1 sm:pb-2">
                  <CardTitle className="text-sm sm:text-base font-medium flex items-center gap-2">
                    <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                    High Performers
                  </CardTitle>
                  <p className="text-xs text-muted-foreground">
                    {averageSales}+ units (above average)
                  </p>
                </CardHeader>
                <CardContent className="p-3 sm:p-4 pt-0">
                  <ScrollArea className="max-h-[250px]">
                    <div className="space-y-3 sm:space-y-4 pr-3">
                      {topProducts.length === 0 ? (
                        <EmptyState
                          message="No high performing products"
                          icon={ShoppingBag}
                        />
                      ) : (
                        topProducts.map((product: any) => (
                          <div
                            key={product.id}
                            className="flex items-center gap-2 sm:gap-3"
                          >
                            <div className="w-10 h-10 sm:w-12 sm:h-12 rounded-md bg-green-50 flex items-center justify-center flex-shrink-0">
                              <ShoppingBag className="h-5 w-5 sm:h-6 sm:w-6 text-green-600" />
                            </div>
                            <div className="flex-1 min-w-0">
                              <div className="flex justify-between gap-1">
                                <p className="text-xs sm:text-sm font-medium capitalize">
                                  {truncateText(product.name, 30)}
                                </p>
                                <p className="text-xs sm:text-sm font-medium whitespace-nowrap">
                                  {formatPrice(product.price)}
                                </p>
                              </div>
                              <div className="flex justify-between text-[10px] xs:text-xs text-muted-foreground">
                                <p>{product.sold || 0} units sold</p>
                                <p className="text-green-600 font-medium">
                                  {Math.round(
                                    (product.sold / averageSales) * 100
                                  )}
                                  % of avg
                                </p>
                              </div>
                            </div>
                          </div>
                        ))
                      )}
                    </div>
                  </ScrollArea>
                </CardContent>
              </Card>

              {/* Average Performing Products */}
              <Card>
                <CardHeader className="p-3 sm:p-4 pb-1 sm:pb-2">
                  <CardTitle className="text-sm sm:text-base font-medium flex items-center gap-2">
                    <div className="w-2 h-2 bg-blue-500 rounded-full"></div>
                    Average Performers
                  </CardTitle>
                  <p className="text-xs text-muted-foreground">
                    {Math.round(averageSales * 0.5)}-{averageSales - 1} units
                  </p>
                </CardHeader>
                <CardContent className="p-3 sm:p-4 pt-0">
                  <ScrollArea className="max-h-[250px]">
                    <div className="space-y-3 sm:space-y-4 pr-3">
                      {averageProducts.length === 0 ? (
                        <EmptyState
                          message="No average performing products"
                          icon={ShoppingBag}
                        />
                      ) : (
                        averageProducts.map((product: any) => (
                          <div
                            key={product.id}
                            className="flex items-center gap-2 sm:gap-3"
                          >
                            <div className="w-10 h-10 sm:w-12 sm:h-12 rounded-md bg-blue-50 flex items-center justify-center flex-shrink-0">
                              <ShoppingBag className="h-5 w-5 sm:h-6 sm:w-6 text-blue-600" />
                            </div>
                            <div className="flex-1 min-w-0">
                              <div className="flex justify-between gap-1">
                                <p className="text-xs sm:text-sm font-medium capitalize">
                                  {truncateText(product.name, 30)}
                                </p>
                                <p className="text-xs sm:text-sm font-medium whitespace-nowrap">
                                  {formatPrice(product.price)}
                                </p>
                              </div>
                              <div className="flex justify-between text-[10px] xs:text-xs text-muted-foreground">
                                <p>{product.sold || 0} units sold</p>
                                <p className="text-blue-600 font-medium">
                                  {Math.round(
                                    (product.sold / averageSales) * 100
                                  )}
                                  % of avg
                                </p>
                              </div>
                            </div>
                          </div>
                        ))
                      )}
                    </div>
                  </ScrollArea>
                </CardContent>
              </Card>

              {/* Low Performing Products */}
              <Card>
                <CardHeader className="p-3 sm:p-4 pb-1 sm:pb-2">
                  <CardTitle className="text-sm sm:text-base font-medium flex items-center gap-2">
                    <div className="w-2 h-2 bg-red-500 rounded-full"></div>
                    Low Performers
                  </CardTitle>
                  <p className="text-xs text-muted-foreground">
                    Under {Math.round(averageSales * 0.5)} units
                  </p>
                </CardHeader>
                <CardContent className="p-3 sm:p-4 pt-0">
                  <ScrollArea className="max-h-[250px]">
                    <div className="space-y-3 sm:space-y-4 pr-3">
                      {bottomProducts.length === 0 ? (
                        <EmptyState
                          message="No low performing products"
                          icon={ShoppingBag}
                        />
                      ) : (
                        bottomProducts.map((product: any) => (
                          <div
                            key={product.id}
                            className="flex items-center gap-2 sm:gap-3"
                          >
                            <div className="w-10 h-10 sm:w-12 sm:h-12 rounded-md bg-red-50 flex items-center justify-center flex-shrink-0">
                              <ShoppingBag className="h-5 w-5 sm:h-6 sm:w-6 text-red-600" />
                            </div>
                            <div className="flex-1 min-w-0">
                              <div className="flex justify-between gap-1">
                                <p className="text-xs sm:text-sm font-medium capitalize">
                                  {truncateText(product.name, 30)}
                                </p>
                                <p className="text-xs sm:text-sm font-medium whitespace-nowrap">
                                  {formatPrice(product.price)}
                                </p>
                              </div>
                              <div className="flex justify-between text-[10px] xs:text-xs text-muted-foreground">
                                <p>
                                  {formatQuantity(product.sold) || 0} units sold
                                </p>
                                <p className="text-red-600 font-medium">
                                  {Math.round(
                                    (product.sold / averageSales) * 100
                                  )}
                                  % of avg
                                </p>
                              </div>
                            </div>
                          </div>
                        ))
                      )}
                    </div>
                  </ScrollArea>
                </CardContent>
              </Card>
            </div>
          )}
        </section>

        <section className="space-y-3 sm:space-y-4">
          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-2">
            <h2 className="text-sm sm:text-base font-semibold">
              Social Analytics
            </h2>
          </div>

          {analyticsLoading ? (
            <SocialLoadingSkeleton />
          ) : analyticsError ? (
            <ErrorState onRetry={() => analyticsMutate()} />
          ) : processAnalyticsData.length === 0 ? (
            <EmptyState
              message="No social analytics data"
              icon={Users}
              className="col-span-full"
            />
          ) : (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-4">
              {processAnalyticsData.map((platform) => {
                // Get the right icon component based on platform
                const PlatformIcon = () => {
                  switch (platform.platform.toLowerCase()) {
                    case "twitter":
                      return <TwitterIcon />;
                    case "facebook":
                      return <FacebookIcon />;
                    case "whatsapp":
                      return <WhatsAppIcon />;
                    case "tiktok":
                      return <TikTokIcon />;
                    case "instagram":
                      return <InstagramIcon />;
                    default:
                      return null;
                  }
                };

                return (
                  <Card key={platform.platform}>
                    <CardHeader className="p-3 sm:p-4 pb-1 sm:pb-2">
                      <div className="flex items-center justify-between">
                        <CardTitle className="text-sm sm:text-base font-medium capitalize">
                          {platform.platform}
                        </CardTitle>
                        <div className={platform.color}>
                          <PlatformIcon />
                        </div>
                      </div>
                    </CardHeader>
                    <CardContent className="p-3 sm:p-4 pt-0">
                      <div className="text-xl font-bold">
                        {platform.percentage}
                      </div>
                      <p className="text-[10px] md:text-xs text-muted-foreground">
                        {platform.description}
                      </p>
                      <div className="mt-3 space-y-2">
                        {platform.stats.map((stat: any, i: number) => (
                          <div key={i}>
                            <div className="flex justify-between text-[10px] md:text-xs">
                              <span>{stat.label}</span>
                              <span className="font-medium">{stat.value}</span>
                            </div>
                          </div>
                        ))}
                      </div>
                    </CardContent>
                  </Card>
                );
              })}
            </div>
          )}
        </section>
        {/* Educational Tip */}
        {isLoading ? (
          <EducationalTipSkeleton />
        ) : (
          <Card className="bg-primary/10 border-primary/20">
            <CardContent className="p-3 sm:p-4 flex gap-2 sm:gap-3 items-center">
              <div className="rounded-full bg-primary/20 p-1.5 flex-shrink-0">
                <LineChart className="h-4 w-4 sm:h-5 sm:w-5 text-primary" />
              </div>
              <div className="flex-1 min-w-0">
                <h3 className="font-medium text-xs sm:text-sm">Business Tip</h3>
                <p className="text-[10px] sm:text-xs text-muted-foreground">
                  Sharing your products during peak hours (7-9 PM) can increase
                  your visibility by up to 40%.
                </p>
              </div>
            </CardContent>
          </Card>
        )}

        <WithdrawalModal
          isOpen={isModalOpen}
          onClose={() => setIsModalOpen(false)}
          unlockedPayment={
            // paymentData?.data.unlockedAmount || 0
            1000
          }
          mutateKey={"/api/payments/plug/earnings"}
        />
      </div>
    </TooltipProvider>
  );
}
