



"use client";

import { useState, useEffect } from "react";
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

// Platform configurations
const PLATFORMS = [
  {
    id: "whatsapp",
    name: "WhatsApp",
    icon: "/whatsapp.png",
    code: "w",
    description: "Share to your WhatsApp contacts and groups",
    requirement: "WhatsApp must be installed on your device"
  },
  {
    id: "instagram",
    name: "Instagram", 
    icon: "/instagram_logo.png",
    code: "i",
    description: "Share as Instagram post or story",
    requirement: "Instagram app must be installed on your device"
  },
  {
    id: "facebook",
    name: "Facebook",
    icon: "/facebook.png", 
    code: "f",
    description: "Share to your Facebook timeline or groups",
    requirement: "Facebook app must be installed on your device"
  },
  {
    id: "twitter",
    name: "Twitter",
    icon: "/twitter.png",
    code: "t", 
    description: "Share as a tweet with your followers",
    requirement: "Twitter app must be installed on your device"
  }
];

// Dynamic import for client-side only functions
const loadImageGenerator = async () => {
  if (typeof window === "undefined") return null;
  const { createLuxuryMagazineCard } = await import("@/lib/magazine-card-generator");
  return createLuxuryMagazineCard;
};

// SWR fetcher function for POST requests
const linkFetcher = async (url: string, shareUrl: string): Promise<LinkGenerationResponse> => {
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
  const url = `${process.env.NEXT_PUBLIC_BACKEND_URL}/public/products/${productId}${
    plugId ? `/${plugId}` : ""
  }`;

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
  const [selectedPlatform, setSelectedPlatform] = useState<null | {
    id: string,
    name: string,
    icon: string,
    code: string,
    description: string,
    requirement: string,
}>(null);
  const [finalMessageCopied, setFinalMessageCopied] = useState(false);
  const [isGeneratingImage, setIsGeneratingImage] = useState(false);
  const [generatedImageBlob, setGeneratedImageBlob] = useState<Blob | null>(null);

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
        
        <h3 className="font-semibold text-base">Write Your Marketing Message</h3>
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
              <Image
                src={platform.icon}
                width={24}
                height={24}
                alt={platform.name}
                className="flex-shrink-0"
              />
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
            <Image
              src={selectedPlatform.icon}
              width={20}
              height={20}
              alt={selectedPlatform.name}
            />
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
          <DialogTitle className="text-base">
            Share Product
          </DialogTitle>
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