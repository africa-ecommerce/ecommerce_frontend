// "use client";

// import { useState } from "react";
// import {
//   Dialog,
//   DialogContent,
//   DialogHeader,
//   DialogTitle,
//   DialogDescription,
//   DialogFooter,
// } from "@/components/ui/dialog";
// import { Button } from "@/components/ui/button";
// import { Input } from "@/components/ui/input";
// import { Textarea } from "@/components/ui/textarea";
// import {
//   Copy
// } from "lucide-react";
// import { toast } from "@/components/ui/use-toast-advanced";
// import Image from "next/image";

// interface ShareModalProps {
//   open: boolean;
//   onOpenChange: (open: boolean) => void;
//   productName: string;
//   productId: string;
//   plugId: string;
// }

// export function ShareModal({
//   open,
//   onOpenChange,
//   productName,
//   productId,
//   plugId,
// }: ShareModalProps) {
//   const [copied, setCopied] = useState(false);
//   const [customTagline, setCustomTagline] = useState("");

//   // Hard-coded call to action that always appears
//   const callToAction = "Get yours now! 🔥";

//   // Default tagline as placeholder
//   const defaultTagline = `Just discovered this amazing ${productName}! 😍 You need to see this! ✨`;

//   // Generate the final message
//   const getFinalMessage = () => {
//     const tagline = customTagline.trim() || defaultTagline;
//     return `${tagline} ${callToAction}`;
//   };

//   // Generate share URL with query parameters for product ID, referral (plug ID), and platform
//   const generateShareUrl = (platform: string) => {
//     const baseUrl = "https://pluggn.store/product";
//     return `${baseUrl}?pid=${productId}&ref=${plugId}&platform=${platform}`;
//   };

//   // Default share URL (used for copy link button)
//   const shareUrl = generateShareUrl("direct");
  

//   // Share handlers
//   const handleCopyLink = () => {
//     navigator.clipboard.writeText(shareUrl);
//     setCopied(true);
//     toast({
//       title: "Link copied!",
//       description: "Product link has been copied to clipboard",
//       variant: "success",
//     });
//     setTimeout(() => setCopied(false), 2000);
//   };

//   const handleShare = (platform: string) => {
//     let shareLink = "";
//     const platformSpecificUrl = generateShareUrl(platform);
//     const encodedUrl = encodeURIComponent(platformSpecificUrl);
//     const encodedText = encodeURIComponent(getFinalMessage());

//     switch (platform) {
//       case "whatsapp":
//         shareLink = `https://wa.me/?text=${encodedText}%20${encodedUrl}`;
//         break;
//       case "twitter":
//         shareLink = `https://twitter.com/intent/tweet?text=${encodedText}&url=${encodedUrl}`;
//         break;
//       case "facebook":
//         shareLink = `https://www.facebook.com/sharer/sharer.php?u=${encodedUrl}&quote=${encodedText}`;
//         break;
//       case "instagram":
//         // Instagram doesn't have a direct share URL, but we can copy to clipboard
//         navigator.clipboard.writeText(
//           `${getFinalMessage()} ${platformSpecificUrl}`
//         );
//         toast({
//           title: "Ready for Instagram! 📸",
//           description:
//             "Your message and link have been copied. Open Instagram and paste in your story or message",
//           variant: "success",
//         });
//         return;
//     }

//     if (shareLink) {
//       window.open(shareLink, "_blank");
//     }
//   };

//   return (
//     <Dialog open={open} onOpenChange={onOpenChange}>
//       <DialogContent className="w-[95vw] max-w-md max-h-[90vh] p-4 sm:p-6">
//         <div className="flex flex-col h-full max-h-[calc(90vh-2rem)]">
//           <DialogHeader className="flex-shrink-0 pb-3">
//             <DialogTitle className="text-lg sm:text-xl">
//               Share Product
//             </DialogTitle>
//             <DialogDescription className="text-sm text-gray-600 dark:text-gray-400">
//               Customize your message and share with friends
//             </DialogDescription>
//           </DialogHeader>

//           {/* Scrollable Content */}
//           <div className="flex-1 overflow-y-auto space-y-3 pr-1">
//             {/* Custom Tagline Section */}
//             <div className="space-y-2">
//               <label
//                 htmlFor="tagline"
//                 className="text-xs font-medium text-gray-700 dark:text-gray-300 block"
//               >
//                 Your Message (Optional)
//               </label>
//               <Textarea
//                 id="tagline"
//                 placeholder={defaultTagline}
//                 value={customTagline}
//                 onChange={(e) => setCustomTagline(e.target.value)}
//                 className="min-h-[70px] h-16 resize-none text-xs leading-relaxed break-all"
//                 maxLength={200}
//               />
//               <div className="flex justify-between items-center">
//                 <p className="text-[10px] text-gray-500">Emojis welcome! 🎉</p>
//                 <p className="text-[10px] text-gray-400">
//                   {customTagline.length}/200
//                 </p>
//               </div>
//             </div>

//             {/* Preview Section - Compact */}
//             <div className="bg-gray-50 dark:bg-gray-800 p-2 rounded border">
//               <p className="text-[10px] font-medium text-gray-600 dark:text-gray-400 mb-1">
//                 Preview:
//               </p>
//               <p className="text-xs text-gray-800 dark:text-gray-200 leading-snug break-all">
//                 {getFinalMessage()}
//               </p>
//             </div>

//             {/* Copy Link Section */}
//             <div className="flex items-center space-x-2">
//               <Input
//                 value={shareUrl}
//                 readOnly
//                 className="flex-1 text-[10px] h-8"
//               />
//               <Button
//                 variant={copied ? "ghost" : "secondary"}
//                 size="sm"
//                 onClick={handleCopyLink}
//                 className="flex-shrink-0 h-8 px-2"
//               >
//                 <Copy className="h-3 w-3 mr-1" />
//                 <span className="text-xs">{copied ? "✓" : "Copy"}</span>
//               </Button>
//             </div>

//             {/* Social Media Buttons - More Compact */}
//             <div className="grid grid-cols-2 gap-2">
//               <Button
//                 variant="outline"
//                 className="flex flex-col items-center justify-center h-14 gap-1 text-xs"
//                 onClick={() => handleShare("whatsapp")}
//               >
//                 <Image src={"/whatsapp.png"}  
//                 height={20} width={20} alt="WhatsApp"
//                 />
//                 <span className="text-[10px]">WhatsApp</span>
//               </Button>

//               <Button
//                 variant="outline"
//                 className="flex flex-col items-center justify-center h-14 gap-1 text-xs"
//                 onClick={() => handleShare("twitter")}
//               >
//                 <Image src={"/twitter.png"}  
//                 height={20} width={20} alt="Twitter"
//                 />
//                 <span className="text-[10px]">Twitter</span>
//               </Button>

//               <Button
//                 variant="outline"
//                 className="flex flex-col items-center justify-center h-14 gap-1 text-xs"
//                 onClick={() => handleShare("facebook")}
//               >
//                <Image src={"/facebook.png"}  
//                 height={20} width={20} alt="Facebook"
//                 />
//                 <span className="text-[10px]">Facebook</span>
//               </Button>

//               <Button
//                 variant="outline"
//                 className="flex flex-col items-center justify-center h-14 gap-1 text-xs"
//                 onClick={() => handleShare("instagram")}
//               >
//                 <Image src={"/instagram_logo.png"}  
//                 height={20} width={20} alt="Instagram"
//                 />
//                 <span className="text-[10px]">Instagram</span>
//               </Button>
//             </div>
//           </div>

//           <DialogFooter className="flex-shrink-0 pt-3 mt-2">
//             <Button
//               variant="ghost"
//               onClick={() => onOpenChange(false)}
//               className="w-full h-8 text-sm"
//             >
//               Close
//             </Button>
//           </DialogFooter>
//         </div>
//       </DialogContent>
//     </Dialog>
//   );
// }







"use client";

import { useState, useEffect } from "react";
import useSWR from "swr";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
  DialogFooter,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Copy, Loader2 } from "lucide-react";
import { toast } from "@/components/ui/use-toast-advanced";
import Image from "next/image";

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

// SWR fetcher function for POST requests
const linkFetcher = async (
  url: string,
  shareUrl: string
): Promise<LinkGenerationResponse> => {
  const response = await fetch(url, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ shareUrl }),
  });

  if (!response.ok) {
    throw new Error(`HTTP error! status: ${response.status}`);
  }

  return response.json();
};

export function ShareModal({
  open,
  onOpenChange,
  productName,
  productId,
  plugId,
}: ShareModalProps) {
  const [copied, setCopied] = useState(false);
  const [customTagline, setCustomTagline] = useState("");

  // Hard-coded call to action that always appears
  const callToAction = "Get yours now! 🔥";

  // Default tagline as placeholder
  const defaultTagline = `Just discovered this amazing ${productName}! 😍 You need to see this! ✨`;

  // Generate the original share URL
  const originalShareUrl = () => {
    const baseUrl = "https://pluggn.store/product";
    return `${baseUrl}?pid=${productId}&ref=${plugId}`;
  };

  // SWR configuration optimized for link generation
  const swrOptions = {
    revalidateOnFocus: false,
    revalidateOnReconnect: false,
    revalidateIfStale: false,
    dedupingInterval: 300000, // 5 minutes
    errorRetryCount: 2,
    errorRetryInterval: 1000,
    shouldRetryOnError: (error: any) => {
      // Only retry on network errors, not on 4xx responses
      return error.status >= 500;
    },
    onError: (error: any) => {
      console.error("Link generation failed:", error);
      toast({
        title: "Link generation failed",
        description: "Please try again or use the direct link",
        variant: "destructive",
      });
    },
  };

  // SWR hook for generating the base link
  const {
    data: linkData,
    error: linkError,
    isLoading: isGeneratingLink,
    mutate: regenerateLink,
  } = useSWR(
    open ? ["/api/links/generate", originalShareUrl()] : null,
    ([url, shareUrl]) => linkFetcher(url, shareUrl),
    swrOptions
  );

  // Generate the final message
  const getFinalMessage = () => {
    const tagline = customTagline.trim() || defaultTagline;
    return `${tagline} ${callToAction}`;
  };

  // Generate platform-specific share URL
  const generatePlatformUrl = (platform: string) => {
    const baseLink = linkData?.link || originalShareUrl();
    const platformMap: Record<string, string> = {
      whatsapp: "w",
      twitter: "t",
      facebook: "f",
      instagram: "i",
      direct: "d",
    };

    const platformCode = platformMap[platform] || "d";
    return `${baseLink}?m=${platformCode}`;
  };

  // Copy link handler
  const handleCopyLink = () => {
    const linkToCopy = linkData?.link || originalShareUrl();
    const directLink = `${linkToCopy}?m=d`;

    navigator.clipboard.writeText(directLink);
    setCopied(true);
    toast({
      title: "Link copied!",
      description: "Product link has been copied to clipboard",
      variant: "success",
    });
    setTimeout(() => setCopied(false), 2000);
  };

  // Share handlers
  const handleShare = (platform: string) => {
    if (isGeneratingLink) {
      toast({
        title: "Please wait",
        description: "Link is being generated...",
        variant: "default",
      });
      return;
    }

    let shareLink = "";
    const platformSpecificUrl = generatePlatformUrl(platform);
    const encodedUrl = encodeURIComponent(platformSpecificUrl);
    const encodedText = encodeURIComponent(getFinalMessage());

    switch (platform) {
      case "whatsapp":
        shareLink = `https://wa.me/?text=${encodedText}%20${encodedUrl}`;
        break;
      case "twitter":
        shareLink = `https://twitter.com/intent/tweet?text=${encodedText}&url=${encodedUrl}`;
        break;
      case "facebook":
        shareLink = `https://www.facebook.com/sharer/sharer.php?u=${encodedUrl}&quote=${encodedText}`;
        break;
      case "instagram":
        // Instagram doesn't have a direct share URL, but we can copy to clipboard
        navigator.clipboard.writeText(
          `${getFinalMessage()} ${platformSpecificUrl}`
        );
        toast({
          title: "Ready for Instagram! 📸",
          description:
            "Your message and link have been copied. Open Instagram and paste in your story or message",
          variant: "success",
        });
        return;
    }

    if (shareLink) {
      window.open(shareLink, "_blank");
    }
  };

  // Reset copied state when modal closes
  useEffect(() => {
    if (!open) {
      setCopied(false);
    }
  }, [open]);

  // Retry link generation
  const handleRetryLinkGeneration = () => {
    regenerateLink();
  };

  const displayUrl = isGeneratingLink
    ? "Generating link..."
    : linkData?.link
    ? `${linkData.link}?m=d`
    : `${originalShareUrl()}?m=d`;

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="w-[95vw] max-w-md max-h-[90vh] p-4 sm:p-6">
        <div className="flex flex-col h-full max-h-[calc(90vh-2rem)]">
          <DialogHeader className="flex-shrink-0 pb-3">
            <DialogTitle className="text-lg sm:text-xl">
              Share Product
            </DialogTitle>
            <DialogDescription className="text-sm text-gray-600 dark:text-gray-400">
              Customize your message and share with friends
            </DialogDescription>
          </DialogHeader>

          {/* Scrollable Content */}
          <div className="flex-1 overflow-y-auto space-y-3 pr-1">
            {/* Link Generation Status */}
            {isGeneratingLink && (
              <div className="bg-blue-50 dark:bg-blue-900/20 p-2 rounded border border-blue-200 dark:border-blue-800">
                <div className="flex items-center space-x-2">
                  <Loader2 className="h-3 w-3 animate-spin text-blue-600" />
                  <p className="text-xs text-blue-700 dark:text-blue-300">
                    Generating your share link...
                  </p>
                </div>
              </div>
            )}

            {/* Link Generation Error */}
            {linkError && !isGeneratingLink && (
              <div className="bg-red-50 dark:bg-red-900/20 p-2 rounded border border-red-200 dark:border-red-800">
                <div className="flex items-center justify-between">
                  <p className="text-xs text-red-700 dark:text-red-300">
                    Failed to generate link. Using direct link.
                  </p>
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={handleRetryLinkGeneration}
                    className="h-6 px-2 text-xs text-red-600 hover:text-red-700"
                  >
                    Retry
                  </Button>
                </div>
              </div>
            )}

            {/* Success indicator */}
            {linkData?.success && !isGeneratingLink && (
              <div className="bg-green-50 dark:bg-green-900/20 p-2 rounded border border-green-200 dark:border-green-800">
                <p className="text-xs text-green-700 dark:text-green-300">
                  ✓ Share link generated successfully
                </p>
              </div>
            )}

            {/* Custom Tagline Section */}
            <div className="space-y-2">
              <label
                htmlFor="tagline"
                className="text-xs font-medium text-gray-700 dark:text-gray-300 block"
              >
                Your Message (Optional)
              </label>
              <Textarea
                id="tagline"
                placeholder={defaultTagline}
                value={customTagline}
                onChange={(e) => setCustomTagline(e.target.value)}
                className="min-h-[70px] h-16 resize-none text-xs leading-relaxed break-all"
                maxLength={200}
                disabled={isGeneratingLink}
              />
              <div className="flex justify-between items-center">
                <p className="text-[10px] text-gray-500">Emojis welcome! 🎉</p>
                <p className="text-[10px] text-gray-400">
                  {customTagline.length}/200
                </p>
              </div>
            </div>

            {/* Preview Section - Compact */}
            <div className="bg-gray-50 dark:bg-gray-800 p-2 rounded border">
              <p className="text-[10px] font-medium text-gray-600 dark:text-gray-400 mb-1">
                Preview:
              </p>
              <p className="text-xs text-gray-800 dark:text-gray-200 leading-snug break-all">
                {getFinalMessage()}
              </p>
            </div>

            {/* Copy Link Section */}
            <div className="flex items-center space-x-2">
              <Input
                value={displayUrl}
                readOnly
                className="flex-1 text-[10px] h-8"
                style={{
                  opacity: isGeneratingLink ? 0.6 : 1,
                  fontStyle: isGeneratingLink ? "italic" : "normal",
                }}
              />
              <Button
                variant={copied ? "ghost" : "secondary"}
                size="sm"
                onClick={handleCopyLink}
                disabled={isGeneratingLink}
                className="flex-shrink-0 h-8 px-2"
              >
                {isGeneratingLink ? (
                  <Loader2 className="h-3 w-3 animate-spin mr-1" />
                ) : (
                  <Copy className="h-3 w-3 mr-1" />
                )}
                <span className="text-xs">
                  {isGeneratingLink ? "..." : copied ? "✓" : "Copy"}
                </span>
              </Button>
            </div>

            {/* Social Media Buttons - More Compact */}
            <div className="grid grid-cols-2 gap-2">
              <Button
                variant="outline"
                className="flex flex-col items-center justify-center h-14 gap-1 text-xs"
                onClick={() => handleShare("whatsapp")}
                disabled={isGeneratingLink}
              >
                <Image
                  src={"/whatsapp.png"}
                  height={20}
                  width={20}
                  alt="WhatsApp"
                />
                <span className="text-[10px]">WhatsApp</span>
              </Button>

              <Button
                variant="outline"
                className="flex flex-col items-center justify-center h-14 gap-1 text-xs"
                onClick={() => handleShare("twitter")}
                disabled={isGeneratingLink}
              >
                <Image
                  src={"/twitter.png"}
                  height={20}
                  width={20}
                  alt="Twitter"
                />
                <span className="text-[10px]">Twitter</span>
              </Button>

              <Button
                variant="outline"
                className="flex flex-col items-center justify-center h-14 gap-1 text-xs"
                onClick={() => handleShare("facebook")}
                disabled={isGeneratingLink}
              >
                <Image
                  src={"/facebook.png"}
                  height={20}
                  width={20}
                  alt="Facebook"
                />
                <span className="text-[10px]">Facebook</span>
              </Button>

              <Button
                variant="outline"
                className="flex flex-col items-center justify-center h-14 gap-1 text-xs"
                onClick={() => handleShare("instagram")}
                disabled={isGeneratingLink}
              >
                <Image
                  src={"/instagram_logo.png"}
                  height={20}
                  width={20}
                  alt="Instagram"
                />
                <span className="text-[10px]">Instagram</span>
              </Button>
            </div>
          </div>

          <DialogFooter className="flex-shrink-0 pt-3 mt-2">
            <Button
              variant="ghost"
              onClick={() => onOpenChange(false)}
              className="w-full h-8 text-sm"
            >
              Close
            </Button>
          </DialogFooter>
        </div>
      </DialogContent>
    </Dialog>
  );
}
