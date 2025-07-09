


"use client";

import { useState, useEffect, JSX } from "react";
import useSWR from "swr";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import {
  Copy,
  Loader2,
  Share2,
  CheckCircle,
  ArrowRight,
  ArrowLeft,
  AlertCircle,
} from "lucide-react";
import {
  errorToast,
  successToast,
  toast,
} from "@/components/ui/use-toast-advanced";
import Image from "next/image";
import { useUser } from "@/app/_components/provider/UserContext";
import { formatPrice, truncateText } from "@/lib/utils";

interface ShareModalProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  productName: string;
  productId: string;
  plugId: string;
}

interface LinkGenerationResponse {
  link: string;
  success: boolean;
  error?: string;
}

const TwitterIcon = ({ className }: { className?: string }) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    xmlnsXlink="http://www.w3.org/1999/xlink"
    version="1.1"
    width="16"
    height="16"
    viewBox="0 0 256 256"
    className={className}
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




const FacebookIcon = ({ className }: { className?: string }) => (
  <svg
  className={className}
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

const WhatsAppIcon = ({ className }: { className?: string }) => (
  <svg
  className={className}
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

const TikTokIcon = ({ className }: { className?: string }) => (
  <svg
  className={className}
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

const InstagramIcon = ({ className }: { className?: string }) => (
  <svg
  className={className}
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

interface Platform {
  id: string;
  name: string;
  icon: JSX.Element; // Changed from string to JSX.Element
  code: string;
  description: string;
  requirement: string;
}


// Platform configurations
const PLATFORMS: Platform[] = [
  {
    id: "whatsapp",
    name: "WhatsApp",
    icon: <WhatsAppIcon className="w-6 h-6 text-green-600" />,
    code: "w",
    description: "Share to your WhatsApp contacts and groups",
    requirement: "WhatsApp must be installed on your device",
  },
  {
    id: "instagram",
    name: "Instagram",
    icon: <InstagramIcon className="w-6 h-6 text-pink-600" />,
    code: "i",
    description: "Share as Instagram post or story",
    requirement: "Instagram app must be installed on your device",
  },
  {
    id: "tiktok",
    name: "TikTok",
    icon: <TikTokIcon className="w-6 h-6 text-black dark:text-white" />,
    code: "tt",
    description: "Share as TikTok video or post content",
    requirement: "TikTok app must be installed on your device",
  },
  {
    id: "facebook",
    name: "Facebook",
    icon: <FacebookIcon className="w-6 h-6 text-blue-600" />,
    code: "f",
    description: "Share to your Facebook timeline or groups",
    requirement: "Facebook app must be installed on your device",
  },
  {
    id: "twitter",
    name: "Twitter",
    icon: <TwitterIcon className="w-6 h-6 text-blue-400" />,
    code: "t",
    description: "Share as a tweet with your followers",
    requirement: "Twitter app must be installed on your device",
  },
];
// Dynamic import for client-side only functions
const loadImageGenerator = async () => {
  if (typeof window === "undefined") return null;
  const { createLuxuryMagazineCard } = await import(
    "@/lib/magazine-card-generator"
  );
  return createLuxuryMagazineCard;
};

// SWR fetcher function for POST requests
const linkFetcher = async (
  url: string,
  shareUrl: string
): Promise<LinkGenerationResponse> => {
  const response = await fetch(url, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ shareUrl }),
  });

  if (!response.ok) {
    throw new Error(`HTTP error! status: ${response.status}`);
  }

  return response.json();
};

// Product fetcher function
const productFetcher = async (productId: string, plugId?: string) => {
  const url = `${
    process.env.NEXT_PUBLIC_BACKEND_URL
  }/public/products/${productId}${plugId ? `/${plugId}` : ""}`;

  const response = await fetch(url, {
    method: "GET",
    headers: { "Content-Type": "application/json" },
  });

  if (!response.ok) {
    throw new Error(`API error: ${response.status}`);
  }

  const result = await response.json();
  return result.data;
};

export function ShareModal({
  open,
  onOpenChange,
  productName,
  productId,
  plugId,
}: ShareModalProps) {
  // Modal state management
  const [currentStep, setCurrentStep] = useState(1);
  const [customMessage, setCustomMessage] = useState("");
  const [selectedPlatform, setSelectedPlatform] = useState<Platform | null>(null);
  const [finalMessageCopied, setFinalMessageCopied] = useState(false);
  const [isGeneratingImage, setIsGeneratingImage] = useState(false);
  const [generatedImageBlob, setGeneratedImageBlob] = useState<Blob | null>(
    null
  );

  // Default marketing message
  const defaultMessage = `Just discovered this amazing ${productName}! 😍 You need to see this! ✨`;

  const {
    userData: { user },
  } = useUser();

  // Get product data
  const {
    data: product,
    error: productError,
    isLoading: isLoadingProduct,
  } = useSWR(
    open && productId ? [productId, plugId] : null,
    ([pid, plgId]) => productFetcher(pid, plgId),
    {
      revalidateOnFocus: false,
      revalidateIfStale: false,
      dedupingInterval: 60000,
      shouldRetryOnError: false,
    }
  );

  // Generate the original share URL
  const originalShareUrl = () => {
    const baseUrl = "https://pluggn.store/product";
    return `${baseUrl}?pid=${productId}&ref=${plugId}`;
  };

  // SWR hook for generating the base link
  const {
    data: linkData,
    error: linkError,
    isLoading: isGeneratingLink,
  } = useSWR(
    open ? ["/api/links/generate", originalShareUrl()] : null,
    ([url, shareUrl]) => linkFetcher(url, shareUrl),
    {
      revalidateOnFocus: false,
      revalidateOnReconnect: false,
      revalidateIfStale: false,
      dedupingInterval: 300000,
      errorRetryCount: 2,
      onError: (error) => {
        console.error("Link generation failed:", error);
        errorToast("Failed to generate link. Using direct link.");
      },
    }
  );

  // Generate platform-specific URL
  const generatePlatformUrl = () => {
    if (!selectedPlatform) return originalShareUrl();

    const baseLink = linkData?.link || originalShareUrl();
    return `${baseLink}?m=${selectedPlatform.code}`;
  };

  // Get final message with platform link
  const getFinalMessage = () => {
    const message = customMessage.trim() || defaultMessage;
    const platformUrl = generatePlatformUrl();
    return `${message}\n\nGet yours now! 🔥\n${platformUrl}`;
  };

  // Generate marketing image
  const generateMarketingImage = async (): Promise<Blob> => {
    if (!product) {
      throw new Error("Product data not available");
    }

    if (generatedImageBlob) {
      return generatedImageBlob;
    }

    setIsGeneratingImage(true);
    try {
      const createLuxuryMagazineCard = await loadImageGenerator();
      if (!createLuxuryMagazineCard) {
        throw new Error("Failed to load image generator");
      }

      const { processedImage } = await createLuxuryMagazineCard({
        imageUrl: product.images[0],
        productName: truncateText(product.name.toUpperCase()),
        price: formatPrice(String(product.price)),
        sellerName: truncateText(user.name.toUpperCase()),
        sellerImage: user.plug.avatar,
        tagline: "TIMELESS ELEGANCE",
        dimensions: { width: 520, height: 755 },
        brandName: user.plug.businessName,
      });

      const response = await fetch(processedImage);
      const blob = await response.blob();

      setGeneratedImageBlob(blob);
      return blob;
    } finally {
      setIsGeneratingImage(false);
    }
  };

  // Step handlers
  const handleStep1Next = () => {
    setCurrentStep(2);
  };

  const handleStep2Next = () => {
    if (!selectedPlatform) {
      toast({
        title: "Please select a platform",
        description: "Choose where you want to share your product",
      });
      return;
    }
    setCurrentStep(3);
  };

  const handleCopyMessage = async () => {
    try {
      const finalMessage = getFinalMessage();
      await navigator.clipboard.writeText(finalMessage);
      setFinalMessageCopied(true);

      successToast("Message copied to clipboard!");

      // setTimeout(() => setFinalMessageCopied(false), 3000);
    } catch (error) {
      errorToast("Failed to copy message");
    }
  };

  const handleShareImage = async () => {
    if (!finalMessageCopied) {
      toast({
        title: "Copy your message first",
        description: "You must copy your message before sharing the image",
      });
      return;
    }

    try {
      const imageBlob = await generateMarketingImage();
      const file = new File(
        [imageBlob],
        `${productName.replace(/\s+/g, "_")}_marketing.png`,
        { type: "image/png" }
      );

      // Check if Web Share API is available
      if ("share" in navigator && navigator.canShare({ files: [file] })) {
        await navigator.share({
          files: [file],
        });

        toast({
          title: "Image shared successfully!",
          description: `Now paste your copied message in ${selectedPlatform?.name}`,
          variant: "success",
          duration: 5000,
        });

        // Close modal after successful share
        setTimeout(() => onOpenChange(false), 1000);
      } else {
        // Fallback to clipboard
        await navigator.clipboard.write([
          new ClipboardItem({
            "image/png": imageBlob,
          }),
        ]);

        toast({
          title: "Image copied to clipboard!",
          description: `Open ${selectedPlatform?.name} and paste both the image and your message`,
          variant: "success",
          duration: 6000,
        });
      }
    } catch (error) {
      errorToast("Failed to share image. Please try again.");
    }
  };

  // Reset states when modal closes
  useEffect(() => {
    if (!open) {
      setCurrentStep(1);
      setCustomMessage("");
      setSelectedPlatform(null);
      setFinalMessageCopied(false);
      setGeneratedImageBlob(null);
    }
  }, [open]);

  // Step 1: Write Marketing Message
  const renderStep1 = () => (
    <div className="space-y-2">
      <div className="text-center">
        <h3 className="font-semibold text-base">
          Write Your Marketing Message
        </h3>
        <p className="text-sm text-gray-600 dark:text-gray-400">
          Create an engaging message to promote your product
        </p>
      </div>

      <div className="space-y-3">
        <label htmlFor="message" className="text-sm font-medium block">
          Your Marketing Message
        </label>
        <Textarea
          id="message"
          placeholder={defaultMessage}
          value={customMessage}
          onChange={(e) => setCustomMessage(e.target.value)}
          className="min-h-[100px] resize-none"
          maxLength={150}
        />
        <div className="flex justify-between text-xs text-gray-500">
          <span>💡 Tip: Use emojis and engaging language!</span>
          <span>{customMessage.length}/150</span>
        </div>
      </div>

      <div className="bg-yellow-50 dark:bg-yellow-900/20 p-3 rounded-lg border border-yellow-200 dark:border-yellow-800 max-h-32 overflow-y-auto">
        <p className="text-sm text-yellow-800 dark:text-yellow-200 whitespace-pre-wrap break-words">
          <strong>Preview:</strong> {customMessage.trim() || defaultMessage}
        </p>
      </div>

      <Button
        onClick={handleStep1Next}
        className="w-full bg-orange-600 hover:bg-orange-700 text-white"
      >
        Continue
        <ArrowRight className="ml-2 h-4 w-4" />
      </Button>
    </div>
  );

  // Step 2: Choose Platform
  const renderStep2 = () => (
    <div className="space-y-4">
      <div className="text-center">
        <h3 className="font-semibold text-base">Choose Your Platform</h3>
        <p className="text-sm text-gray-600 dark:text-gray-400">
          Select where you want to share your product
        </p>
      </div>

      <div className="grid grid-cols-1 gap-3">
        {PLATFORMS.map((platform) => (
          <button
            key={platform.id}
            onClick={() => setSelectedPlatform(platform)}
            className={`p-4 rounded-lg border-2 transition-all text-left ${
              selectedPlatform?.id === platform.id
                ? "border-green-500 bg-green-50 dark:bg-green-900/20"
                : "border-gray-200 dark:border-gray-700 hover:border-gray-300 dark:hover:border-gray-600"
            }`}
          >
            <div className="flex items-start space-x-3">
              <div className="flex-shrink-0">{platform.icon}</div>
              <div className="flex-1">
                <div className="flex items-center space-x-2">
                  <h4 className="font-medium text-sm">{platform.name}</h4>
                  {selectedPlatform?.id === platform.id && (
                    <CheckCircle className="h-4 w-4 text-green-600" />
                  )}
                </div>
                <p className="text-xs text-gray-600 dark:text-gray-400 mt-1">
                  {platform.description}
                </p>
                <p className="text-xs text-orange-600 dark:text-orange-400 mt-1">
                  {platform.requirement}
                </p>
              </div>
            </div>
          </button>
        ))}
      </div>

      <div className="flex space-x-2">
        <Button
          variant="outline"
          onClick={() => setCurrentStep(1)}
          className="flex-1"
        >
          <ArrowLeft className="mr-2 h-4 w-4" />
          Back
        </Button>
        <Button
          onClick={handleStep2Next}
          className="flex-1 bg-orange-600 hover:bg-orange-700 text-white"
          disabled={!selectedPlatform}
        >
          Continue
          <ArrowRight className="ml-2 h-4 w-4" />
        </Button>
      </div>
    </div>
  );

  // Step 3: Copy & Share
  const renderStep3 = () => (
    <div className="space-y-4">
      <div className="text-center">
        <h3 className="font-semibold text-base">Copy Message & Share Image</h3>
        <p className="text-sm text-gray-600 dark:text-gray-400">
          Follow these steps to complete your share
        </p>
      </div>

      {selectedPlatform && (
        <div className="bg-blue-50 dark:bg-blue-900/20 p-3 rounded-lg border border-blue-200 dark:border-blue-800">
          <div className="flex items-center space-x-2">
            {selectedPlatform.icon}
            <p className="text-xs font-medium text-blue-800 dark:text-blue-200">
              Sharing to {selectedPlatform.name}
            </p>
          </div>
        </div>
      )}

      <div className="space-y-3">
        {/* Step 3a: Copy Message */}
        <div className="bg-green-50 dark:bg-green-900/20 p-4 rounded-lg border border-green-200 dark:border-green-800">
          <div className="flex items-center space-x-2 mb-2">
            <h4 className="font-medium text-sm text-green-800 dark:text-green-200">
              Copy Your Complete Message
            </h4>
          </div>

          <div className="bg-white dark:bg-gray-800 p-3 rounded border mb-3 max-h-32 overflow-y-auto">
            <p className="text-sm whitespace-pre-wrap break-words">
              {getFinalMessage()}
            </p>
          </div>

          <Button
            onClick={handleCopyMessage}
            className="w-full bg-green-600 hover:bg-green-700 text-white"
            disabled={isGeneratingLink}
          >
            {finalMessageCopied ? (
              <>
                <CheckCircle className="mr-2 h-4 w-4" />
                Message Copied!
              </>
            ) : (
              <>
                <Copy className="mr-2 h-4 w-4" />
                Copy Complete Message
              </>
            )}
          </Button>
        </div>

        {/* Step 3b: Share Image */}
        <div className="bg-green-50 dark:bg-green-900/20 p-4 rounded-lg border border-green-200 dark:border-green-800">
          <div className="flex items-center space-x-2 mb-3">
            <h4 className="font-medium text-green-800 text-sm dark:text-green-200">
              Share Marketing Image
            </h4>
          </div>

          {!finalMessageCopied && (
            <div className="bg-yellow-50 dark:bg-yellow-900/20 p-2 rounded border border-yellow-200 dark:border-yellow-800 mb-3">
              <p className="text-xs text-yellow-800 dark:text-yellow-200">
                You must copy your message first before sharing the image
              </p>
            </div>
          )}

          <Button
            onClick={handleShareImage}
            disabled={!finalMessageCopied || isGeneratingImage}
            className="w-full bg-green-600 hover:bg-green-700 text-white"
          >
            {isGeneratingImage ? (
              <>
                <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                Generating Image...
              </>
            ) : (
              <>
                <Share2 className="mr-2 h-4 w-4" />
                Share Marketing Image
              </>
            )}
          </Button>
        </div>

        {/* Instructions */}
        <div className="bg-gray-50 dark:bg-gray-800 p-3 rounded-lg border">
          <p className="text-sm text-gray-700 dark:text-gray-300">
            <strong>What happens next:</strong>
          </p>
          <ol className="text-xs text-gray-600 dark:text-gray-400 mt-2 space-y-1 ml-4">
            <li>1. Image will be shared to {selectedPlatform?.name}</li>
            <li>2. Paste your copied message as the caption/text</li>
            <li>3. Then post, that is all! 🎉</li>
          </ol>
        </div>
      </div>

      <Button
        variant="outline"
        onClick={() => setCurrentStep(2)}
        className="w-full"
      >
        <ArrowLeft className="mr-2 h-4 w-4" />
        Back
      </Button>
    </div>
  );

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="w-[95vw] max-w-md max-h-[90vh] p-4 sm:p-6">
        <DialogHeader className="pb-4">
          <DialogTitle className="text-base">Share Product</DialogTitle>
          <DialogDescription className="text-sm">
            Create your marketing message and share with a professional image
          </DialogDescription>
        </DialogHeader>

        {/* Progress indicator */}
        <div className="flex items-center justify-center space-x-2 mb-3">
          {[1, 2, 3].map((step) => (
            <div
              key={step}
              className={`w-8 h-1 rounded-full transition-all ${
                step <= currentStep
                  ? "bg-blue-600"
                  : "bg-gray-200 dark:bg-gray-700"
              }`}
            />
          ))}
        </div>

        {/* Loading states */}
        {isLoadingProduct && (
          <div className="bg-gray-50 dark:bg-gray-800 p-3 rounded-lg border mb-4">
            <div className="flex items-center space-x-2">
              <Loader2 className="h-4 w-4 animate-spin" />
              <p className="text-sm">Loading product data...</p>
            </div>
          </div>
        )}

        {productError && (
          <div className="bg-red-50 dark:bg-red-900/20 p-3 rounded-lg border border-red-200 dark:border-red-800 mb-4">
            <p className="text-sm text-red-700 dark:text-red-300">
              Failed to load product data. Please try again.
            </p>
          </div>
        )}

        <div className="overflow-y-auto max-h-[60vh]">
          {currentStep === 1 && renderStep1()}
          {currentStep === 2 && renderStep2()}
          {currentStep === 3 && renderStep3()}
        </div>
      </DialogContent>
    </Dialog>
  );
}