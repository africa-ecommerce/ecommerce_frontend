




// "use client";

// import { useState, useEffect } from "react";
// import useSWR from "swr";
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
// import { Copy, Loader2 } from "lucide-react";
// import { errorToast, successToast, toast } from "@/components/ui/use-toast-advanced";
// import Image from "next/image";

// interface ShareModalProps {
//   open: boolean;
//   onOpenChange: (open: boolean) => void;
//   productName: string;
//   productId: string;
//   plugId: string;
// }

// interface LinkGenerationResponse {
//   link: string;
//   success: boolean;
//   error?: string;
// }

// // SWR fetcher function for POST requests
// const linkFetcher = async (
//   url: string,
//   shareUrl: string
// ): Promise<LinkGenerationResponse> => {
//   const response = await fetch(url, {
//     method: "POST",
//     headers: {
//       "Content-Type": "application/json",
//     },
//     body: JSON.stringify({ shareUrl }),
//   });

//   if (!response.ok) {
//     throw new Error(`HTTP error! status: ${response.status}`);
//   }

//   return response.json();
// };

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

//   // Generate the original share URL
//   const originalShareUrl = () => {
//     const baseUrl = "https://pluggn.store/product";
//     return `${baseUrl}?pid=${productId}&ref=${plugId}`;
//   };

//   // SWR configuration optimized for link generation
//   const swrOptions = {
//     revalidateOnFocus: false,
//     revalidateOnReconnect: false,
//     revalidateIfStale: false,
//     dedupingInterval: 300000, // 5 minutes
//     errorRetryCount: 2,
//     errorRetryInterval: 1000,
//     shouldRetryOnError: (error: any) => {
//       // Only retry on network errors, not on 4xx responses
//       return error.status >= 500;
//     },
//     onError: (error: any) => {
//       console.error("Link generation failed:", error);
     
//       errorToast("Please try again or use the direct link");
//     },
//   };

//   // SWR hook for generating the base link
//   const {
//     data: linkData,
//     error: linkError,
//     isLoading: isGeneratingLink,
//     mutate: regenerateLink,
//   } = useSWR(
//     open ? ["/api/links/generate", originalShareUrl()] : null,
//     ([url, shareUrl]) => linkFetcher(url, shareUrl),
//     swrOptions
//   );

//   // Generate the final message
//   const getFinalMessage = () => {
//     const tagline = customTagline.trim() || defaultTagline;
//     return `${tagline} ${callToAction}`;
//   };

//   // Generate platform-specific share URL
//   const generatePlatformUrl = (platform: string) => {
//     const baseLink = linkData?.link || originalShareUrl();
//     const platformMap: Record<string, string> = {
//       whatsapp: "w",
//       twitter: "t",
//       facebook: "f",
//       instagram: "i",
//       direct: "d",
//     };

//     const platformCode = platformMap[platform] || "d";
//     return `${baseLink}?m=${platformCode}`;
//   };

//   // Copy link handler
//   const handleCopyLink = () => {
//     const linkToCopy = linkData?.link || originalShareUrl();
//     const directLink = `${linkToCopy}?m=d`;

//     navigator.clipboard.writeText(directLink);
//     setCopied(true);
    
//     successToast("Link copied successfully!");
//     setTimeout(() => setCopied(false), 2000);
//   };

//   // Share handlers
//   const handleShare = (platform: string) => {
//     if (isGeneratingLink) {
     
//       successToast("Link is being generated...");
//       return;
//     }

//     let shareLink = "";
//     const platformSpecificUrl = generatePlatformUrl(platform);
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

//   // Reset copied state when modal closes
//   useEffect(() => {
//     if (!open) {
//       setCopied(false);
//     }
//   }, [open]);

//   // Retry link generation
//   const handleRetryLinkGeneration = () => {
//     regenerateLink();
//   };

//   const displayUrl = isGeneratingLink
//     ? "Generating link..."
//     : linkData?.link
//     ? `${linkData.link}?m=d`
//     : `${originalShareUrl()}?m=d`;

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
//             {/* Link Generation Status */}
//             {isGeneratingLink && (
//               <div className="bg-blue-50 dark:bg-blue-900/20 p-2 rounded border border-blue-200 dark:border-blue-800">
//                 <div className="flex items-center space-x-2">
//                   <Loader2 className="h-3 w-3 animate-spin text-blue-600" />
//                   <p className="text-xs text-blue-700 dark:text-blue-300">
//                     Generating your share link...
//                   </p>
//                 </div>
//               </div>
//             )}

//             {/* Link Generation Error */}
//             {linkError && !isGeneratingLink && (
//               <div className="bg-red-50 dark:bg-red-900/20 p-2 rounded border border-red-200 dark:border-red-800">
//                 <div className="flex items-center justify-between">
//                   <p className="text-xs text-red-700 dark:text-red-300">
//                     Failed to generate link. Using direct link.
//                   </p>
//                   <Button
//                     variant="ghost"
//                     size="sm"
//                     onClick={handleRetryLinkGeneration}
//                     className="h-6 px-2 text-xs text-red-600 hover:text-red-700"
//                   >
//                     Retry
//                   </Button>
//                 </div>
//               </div>
//             )}

//             {/* Success indicator */}
//             {linkData?.success && !isGeneratingLink && (
//               <div className="bg-green-50 dark:bg-green-900/20 p-2 rounded border border-green-200 dark:border-green-800">
//                 <p className="text-xs text-green-700 dark:text-green-300">
//                   ✓ Share link generated successfully
//                 </p>
//               </div>
//             )}

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
//                 disabled={isGeneratingLink}
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
//                 value={displayUrl}
//                 readOnly
//                 className="flex-1 text-[10px] h-8"
//                 style={{
//                   opacity: isGeneratingLink ? 0.6 : 1,
//                   fontStyle: isGeneratingLink ? "italic" : "normal",
//                 }}
//               />
//               <Button
//                 variant={copied ? "ghost" : "secondary"}
//                 size="sm"
//                 onClick={handleCopyLink}
//                 disabled={isGeneratingLink}
//                 className="flex-shrink-0 h-8 px-2"
//               >
//                 {isGeneratingLink ? (
//                   <Loader2 className="h-3 w-3 animate-spin mr-1" />
//                 ) : (
//                   <Copy className="h-3 w-3 mr-1" />
//                 )}
//                 <span className="text-xs">
//                   {isGeneratingLink ? "..." : copied ? "✓" : "Copy"}
//                 </span>
//               </Button>
//             </div>

//             {/* Social Media Buttons - More Compact */}
//             <div className="grid grid-cols-2 gap-2">
//               <Button
//                 variant="outline"
//                 className="flex flex-col items-center justify-center h-14 gap-1 text-xs"
//                 onClick={() => handleShare("whatsapp")}
//                 disabled={isGeneratingLink}
//               >
//                 <Image
//                   src={"/whatsapp.png"}
//                   height={20}
//                   width={20}
//                   alt="WhatsApp"
//                 />
//                 <span className="text-[10px]">WhatsApp</span>
//               </Button>

//               <Button
//                 variant="outline"
//                 className="flex flex-col items-center justify-center h-14 gap-1 text-xs"
//                 onClick={() => handleShare("twitter")}
//                 disabled={isGeneratingLink}
//               >
//                 <Image
//                   src={"/twitter.png"}
//                   height={20}
//                   width={20}
//                   alt="Twitter"
//                 />
//                 <span className="text-[10px]">Twitter</span>
//               </Button>

//               <Button
//                 variant="outline"
//                 className="flex flex-col items-center justify-center h-14 gap-1 text-xs"
//                 onClick={() => handleShare("facebook")}
//                 disabled={isGeneratingLink}
//               >
//                 <Image
//                   src={"/facebook.png"}
//                   height={20}
//                   width={20}
//                   alt="Facebook"
//                 />
//                 <span className="text-[10px]">Facebook</span>
//               </Button>

//               <Button
//                 variant="outline"
//                 className="flex flex-col items-center justify-center h-14 gap-1 text-xs"
//                 onClick={() => handleShare("instagram")}
//                 disabled={isGeneratingLink}
//               >
//                 <Image
//                   src={"/instagram_logo.png"}
//                   height={20}
//                   width={20}
//                   alt="Instagram"
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






// "use client";

// import { useState, useEffect } from "react";
// import useSWR from "swr";
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
//   Copy,
//   Loader2,
//   Download,
//   AlertCircle,
//   CheckCircle,
// } from "lucide-react";
// import {
//   errorToast,
//   successToast,
//   toast,
// } from "@/components/ui/use-toast-advanced";
// import Image from "next/image";

// interface ShareModalProps {
//   open: boolean;
//   onOpenChange: (open: boolean) => void;
//   productName: string;
//   productId: string;
//   plugId: string;
// }

// interface LinkGenerationResponse {
//   link: string;
//   success: boolean;
//   error?: string;
// }

// // Dynamic import for client-side only functions
// const loadImageGenerator = async () => {
//   if (typeof window === "undefined") return null;
//   const { createEnhancedMagazineCard } = await import(
//     "@/lib/magazine-card-generator"
//   );
//   return createEnhancedMagazineCard;
// };

// // SWR fetcher function for POST requests
// const linkFetcher = async (
//   url: string,
//   shareUrl: string
// ): Promise<LinkGenerationResponse> => {
//   const response = await fetch(url, {
//     method: "POST",
//     headers: {
//       "Content-Type": "application/json",
//     },
//     body: JSON.stringify({ shareUrl }),
//   });

//   if (!response.ok) {
//     throw new Error(`HTTP error! status: ${response.status}`);
//   }

//   return response.json();
// };

// // Product fetcher function
// const productFetcher = async (productId: string, plugId?: string) => {
//   const url = `${
//     process.env.NEXT_PUBLIC_BACKEND_URL
//   }/public/products/${productId}${plugId ? `/${plugId}` : ""}`;

//   const response = await fetch(url, {
//     method: "GET",
//     headers: { "Content-Type": "application/json" },
//   });

//   if (!response.ok) {
//     throw new Error(`API error: ${response.status}`);
//   }

//   const result = await response.json();
//   return result.data;
// };

// export function ShareModal({
//   open,
//   onOpenChange,
//   productName,
//   productId,
//   plugId,
// }: ShareModalProps) {
//   const [copied, setCopied] = useState(false);
//   const [customTagline, setCustomTagline] = useState("");
//   const [imageDownloaded, setImageDownloaded] = useState(false);
//   const [isGeneratingImage, setIsGeneratingImage] = useState(false);
//   const [downloadError, setDownloadError] = useState<string | null>(null);

//   // Get product data - move this to the top level of the component
//   const {
//     data: product,
//     error: productError,
//     isLoading: isLoadingProduct,
//   } = useSWR(
//     open && productId ? [productId, plugId] : null,
//     ([pid, plgId]) => productFetcher(pid, plgId),
//     {
//       revalidateOnFocus: false,
//       revalidateIfStale: false,
//       dedupingInterval: 60000,
//       shouldRetryOnError: false,
//     }
//   );

//   // Hard-coded call to action that always appears
//   const callToAction = "Get yours now! 🔥";

//   // Default tagline as placeholder
//   const defaultTagline = `Just discovered this amazing ${productName}! 😍 You need to see this! ✨`;

//   // Generate the original share URL
//   const originalShareUrl = () => {
//     const baseUrl = "https://pluggn.store/product";
//     return `${baseUrl}?pid=${productId}&ref=${plugId}`;
//   };

//   // SWR configuration optimized for link generation
//   const swrOptions = {
//     revalidateOnFocus: false,
//     revalidateOnReconnect: false,
//     revalidateIfStale: false,
//     dedupingInterval: 300000, // 5 minutes
//     errorRetryCount: 2,
//     errorRetryInterval: 1000,
//     shouldRetryOnError: (error: any) => {
//       return error.status >= 500;
//     },
//     onError: (error: any) => {
//       console.error("Link generation failed:", error);
//       errorToast("Please try again or use the direct link");
//     },
//   };

//   // SWR hook for generating the base link
//   const {
//     data: linkData,
//     error: linkError,
//     isLoading: isGeneratingLink,
//     mutate: regenerateLink,
//   } = useSWR(
//     open ? ["/api/links/generate", originalShareUrl()] : null,
//     ([url, shareUrl]) => linkFetcher(url, shareUrl),
//     swrOptions
//   );

//   // Generate marketing image and download
//   const handleDownloadImage = async () => {
//     try {
//       setIsGeneratingImage(true);
//       setDownloadError(null);

//       // Ensure we're on the client side
//       if (typeof window === "undefined") {
//         throw new Error("This function can only run on the client side");
//       }

//       // Check if product data is available
//       if (!product) {
//         throw new Error(
//           "Product data not available. Please wait and try again."
//         );
//       }

//       // Ensure product has required fields
//       if (
//         !product.images ||
//         !product.images[0] ||
//         !product.name ||
//         !product.price
//       ) {
//         throw new Error("Product data is incomplete. Missing required fields.");
//       }

//       // Dynamically load the image generator
//       const createEnhancedMagazineCard = await loadImageGenerator();
//       if (!createEnhancedMagazineCard) {
//         throw new Error("Failed to load image generator");
//       }

//       // Generate the marketing card image
//       const { processedImage } = await createEnhancedMagazineCard({
//         primaryImageUrl: product.images[0],
//         secondaryImageUrl: product.images[0], // Using same image for now
//         productName: product.name,
//         productPrice: product.price,
//         creatorName: "John",
//         dimensions: { width: 1024, height: 1500 }, // Instagram square size
//       });

//       // Create download link - ensure we're in browser environment
//       if (typeof document !== "undefined") {
//         const link = document.createElement("a");
//         link.href = processedImage;
//         link.download = `${productName.replace(
//           /\s+/g,
//           "_"
//         )}_marketing_image.png`;
//         document.body.appendChild(link);
//         link.click();
//         document.body.removeChild(link);

//         // Clean up the blob URL
//         URL.revokeObjectURL(processedImage);

//         setImageDownloaded(true);
//         successToast("Marketing image downloaded successfully! 🎉");
//       } else {
//         throw new Error("Document is not available");
//       }
//     } catch (error) {
//       console.error("Error generating/downloading image:", error);
//       setDownloadError(
//         error instanceof Error
//           ? error.message
//           : "Failed to generate marketing image. Please try again."
//       );
//       errorToast(
//         error instanceof Error
//           ? error.message
//           : "Failed to download image. Please try again."
//       );
//     } finally {
//       setIsGeneratingImage(false);
//     }
//   };

//   // Generate the final message
//   const getFinalMessage = () => {
//     const tagline = customTagline.trim() || defaultTagline;
//     return `${tagline} ${callToAction}`;
//   };

//   // Generate platform-specific share URL
//   const generatePlatformUrl = (platform: string) => {
//     const baseLink = linkData?.link || originalShareUrl();
//     const platformMap: Record<string, string> = {
//       whatsapp: "w",
//       twitter: "t",
//       facebook: "f",
//       instagram: "i",
//       direct: "d",
//     };

//     const platformCode = platformMap[platform] || "d";
//     return `${baseLink}?m=${platformCode}`;
//   };

//   // Copy link handler
//   const handleCopyLink = () => {
//     const linkToCopy = linkData?.link || originalShareUrl();
//     const directLink = `${linkToCopy}?m=d`;

//     navigator.clipboard.writeText(directLink);
//     setCopied(true);

//     successToast("Link copied successfully!");
//     setTimeout(() => setCopied(false), 2000);
//   };

//   // Share handlers
//   const handleShare = (platform: string) => {
//     if (isGeneratingLink) {
//       successToast("Link is being generated...");
//       return;
//     }

//     if (!imageDownloaded) {
//       toast({
//         title: "Download Image First! 📸",
//         description:
//           "Please download the marketing image before sharing for better results",
//         variant: "warning",
//       });
//       return;
//     }

//     let shareLink = "";
//     const platformSpecificUrl = generatePlatformUrl(platform);
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
//         navigator.clipboard.writeText(
//           `${getFinalMessage()} ${platformSpecificUrl}`
//         );
//         toast({
//           title: "Ready for Instagram! 📸",
//           description:
//             "Your message and link have been copied. Now upload your downloaded image and paste this text!",
//           variant: "success",
//         });
//         return;
//     }

//     if (shareLink) {
//       window.open(shareLink, "_blank");
//       toast({
//         title: "Don't Forget! 📸",
//         description:
//           "Remember to attach your downloaded marketing image before posting for maximum impact!",
//         variant: "default",
//       });
//     }
//   };

//   // Reset states when modal closes
//   useEffect(() => {
//     if (!open) {
//       setCopied(false);
//       setImageDownloaded(false);
//       setDownloadError(null);
//     }
//   }, [open]);

//   // Retry link generation
//   const handleRetryLinkGeneration = () => {
//     regenerateLink();
//   };

//   const displayUrl = isGeneratingLink
//     ? "Generating link..."
//     : linkData?.link
//     ? `${linkData.link}?m=d`
//     : `${originalShareUrl()}?m=d`;

//   return (
//     <Dialog open={open} onOpenChange={onOpenChange}>
//       <DialogContent className="w-[95vw] max-w-md max-h-[90vh] p-4 sm:p-6">
//         <div className="flex flex-col h-full max-h-[calc(90vh-2rem)]">
//           <DialogHeader className="flex-shrink-0 pb-3">
//             <DialogTitle className="text-lg sm:text-xl">
//               Share Product with Marketing Image
//             </DialogTitle>
//             <DialogDescription className="text-sm text-gray-600 dark:text-gray-400">
//               Download your marketing image first, then share with your referral
//               link
//             </DialogDescription>
//           </DialogHeader>

//           {/* Scrollable Content */}
//           <div className="flex-1 overflow-y-auto space-y-3 pr-1">
//             {/* Loading Product Data */}
//             {isLoadingProduct && (
//               <div className="bg-gray-50 dark:bg-gray-800 p-3 rounded-lg border">
//                 <div className="flex items-center space-x-2">
//                   <Loader2 className="h-4 w-4 animate-spin" />
//                   <p className="text-sm">Loading product data...</p>
//                 </div>
//               </div>
//             )}

//             {/* Product Error */}
//             {productError && (
//               <div className="bg-red-50 dark:bg-red-900/20 p-3 rounded-lg border border-red-200 dark:border-red-800">
//                 <p className="text-sm text-red-700 dark:text-red-300">
//                   Failed to load product data. Please try again.
//                 </p>
//               </div>
//             )}

//             {/* Step 1: Download Marketing Image */}
//             <div className="bg-blue-50 dark:bg-blue-900/20 p-3 rounded-lg border border-blue-200 dark:border-blue-800">
//               <div className="flex items-start space-x-2 mb-2">
//                 <div className="bg-blue-600 text-white rounded-full w-5 h-5 flex items-center justify-center text-xs font-bold flex-shrink-0 mt-0.5">
//                   1
//                 </div>
//                 <div className="flex-1">
//                   <h3 className="text-sm font-semibold text-blue-800 dark:text-blue-200">
//                     Download Marketing Image
//                   </h3>
//                   <p className="text-xs text-blue-700 dark:text-blue-300 mt-1">
//                     Get your professional marketing material. Always download
//                     fresh for latest updates!
//                   </p>
//                 </div>
//               </div>

//               <Button
//                 onClick={handleDownloadImage}
//                 disabled={isGeneratingImage || isLoadingProduct || !product}
//                 className="w-full bg-blue-600 hover:bg-blue-700 text-white h-9"
//               >
//                 {isGeneratingImage ? (
//                   <>
//                     <Loader2 className="h-4 w-4 animate-spin mr-2" />
//                     Generating Image...
//                   </>
//                 ) : imageDownloaded ? (
//                   <>
//                     <CheckCircle className="h-4 w-4 mr-2" />
//                     Downloaded ✓ (Click to Re-download)
//                   </>
//                 ) : (
//                   <>
//                     <Download className="h-4 w-4 mr-2" />
//                     Download Marketing Image
//                   </>
//                 )}
//               </Button>

//               {downloadError && (
//                 <div className="flex items-center space-x-1 mt-2">
//                   <AlertCircle className="h-3 w-3 text-red-600" />
//                   <p className="text-xs text-red-600">{downloadError}</p>
//                 </div>
//               )}
//             </div>

//             {/* Step 2: Customize Message */}
//             <div className="bg-orange-50 dark:bg-orange-900/20 p-3 rounded-lg border border-orange-200 dark:border-orange-800">
//               <div className="flex items-start space-x-2 mb-2">
//                 <div className="bg-orange-600 text-white rounded-full w-5 h-5 flex items-center justify-center text-xs font-bold flex-shrink-0 mt-0.5">
//                   2
//                 </div>
//                 <div className="flex-1">
//                   <h3 className="text-sm font-semibold text-orange-800 dark:text-orange-200">
//                     Customize Your Message
//                   </h3>
//                   <p className="text-xs text-orange-700 dark:text-orange-300 mt-1">
//                     Personalize your share text (optional)
//                   </p>
//                 </div>
//               </div>

//               <Textarea
//                 placeholder={defaultTagline}
//                 value={customTagline}
//                 onChange={(e) => setCustomTagline(e.target.value)}
//                 className="min-h-[60px] h-14 resize-none text-xs leading-relaxed mb-2"
//                 maxLength={200}
//                 disabled={isGeneratingLink}
//               />

//               <div className="flex justify-between items-center text-[10px]">
//                 <span className="text-orange-600">Emojis welcome! 🎉</span>
//                 <span className="text-gray-400">
//                   {customTagline.length}/200
//                 </span>
//               </div>

//               {/* Preview */}
//               <div className="bg-white dark:bg-gray-800 p-2 rounded border mt-2">
//                 <p className="text-[10px] font-medium text-gray-600 dark:text-gray-400 mb-1">
//                   Preview:
//                 </p>
//                 <p className="text-xs text-gray-800 dark:text-gray-200 leading-snug break-all">
//                   {getFinalMessage()}
//                 </p>
//               </div>
//             </div>

//             {/* Link Generation Status */}
//             {isGeneratingLink && (
//               <div className="bg-purple-50 dark:bg-purple-900/20 p-2 rounded border border-purple-200 dark:border-purple-800">
//                 <div className="flex items-center space-x-2">
//                   <Loader2 className="h-3 w-3 animate-spin text-purple-600" />
//                   <p className="text-xs text-purple-700 dark:text-purple-300">
//                     Generating your referral link...
//                   </p>
//                 </div>
//               </div>
//             )}

//             {linkError && !isGeneratingLink && (
//               <div className="bg-red-50 dark:bg-red-900/20 p-2 rounded border border-red-200 dark:border-red-800">
//                 <div className="flex items-center justify-between">
//                   <p className="text-xs text-red-700 dark:text-red-300">
//                     Failed to generate link. Using direct link.
//                   </p>
//                   <Button
//                     variant="ghost"
//                     size="sm"
//                     onClick={handleRetryLinkGeneration}
//                     className="h-6 px-2 text-xs text-red-600 hover:text-red-700"
//                   >
//                     Retry
//                   </Button>
//                 </div>
//               </div>
//             )}

//             {linkData?.success && !isGeneratingLink && (
//               <div className="bg-green-50 dark:bg-green-900/20 p-2 rounded border border-green-200 dark:border-green-800">
//                 <p className="text-xs text-green-700 dark:text-green-300">
//                   ✓ Referral link generated successfully
//                 </p>
//               </div>
//             )}

//             {/* Copy Link Section */}
//             <div className="flex items-center space-x-2">
//               <Input
//                 value={displayUrl}
//                 readOnly
//                 className="flex-1 text-[10px] h-8"
//                 style={{
//                   opacity: isGeneratingLink ? 0.6 : 1,
//                   fontStyle: isGeneratingLink ? "italic" : "normal",
//                 }}
//               />
//               <Button
//                 variant={copied ? "ghost" : "secondary"}
//                 size="sm"
//                 onClick={handleCopyLink}
//                 disabled={isGeneratingLink}
//                 className="flex-shrink-0 h-8 px-2"
//               >
//                 {isGeneratingLink ? (
//                   <Loader2 className="h-3 w-3 animate-spin mr-1" />
//                 ) : (
//                   <Copy className="h-3 w-3 mr-1" />
//                 )}
//                 <span className="text-xs">
//                   {isGeneratingLink ? "..." : copied ? "✓" : "Copy"}
//                 </span>
//               </Button>
//             </div>

//             {/* Step 3: Share with Image */}
//             <div className="bg-green-50 dark:bg-green-900/20 p-3 rounded-lg border border-green-200 dark:border-green-800">
//               <div className="flex items-start space-x-2 mb-3">
//                 <div className="bg-green-600 text-white rounded-full w-5 h-5 flex items-center justify-center text-xs font-bold flex-shrink-0 mt-0.5">
//                   3
//                 </div>
//                 <div className="flex-1">
//                   <h3 className="text-sm font-semibold text-green-800 dark:text-green-200">
//                     Share with Your Image
//                   </h3>
//                   <p className="text-xs text-green-700 dark:text-green-300 mt-1">
//                     <strong>Important:</strong> Always attach your downloaded
//                     image when posting for maximum conversion!
//                   </p>
//                 </div>
//               </div>

//               {/* Social Media Buttons */}
//               <div className="grid grid-cols-2 gap-2">
//                 <Button
//                   variant="outline"
//                   className="flex flex-col items-center justify-center h-14 gap-1 text-xs"
//                   onClick={() => handleShare("whatsapp")}
//                   disabled={isGeneratingLink}
//                 >
//                   <Image
//                     src={"/whatsapp.png"}
//                     height={20}
//                     width={20}
//                     alt="WhatsApp"
//                   />
//                   <span className="text-[10px]">WhatsApp</span>
//                 </Button>

//                 <Button
//                   variant="outline"
//                   className="flex flex-col items-center justify-center h-14 gap-1 text-xs"
//                   onClick={() => handleShare("twitter")}
//                   disabled={isGeneratingLink}
//                 >
//                   <Image
//                     src={"/twitter.png"}
//                     height={20}
//                     width={20}
//                     alt="Twitter"
//                   />
//                   <span className="text-[10px]">Twitter</span>
//                 </Button>

//                 <Button
//                   variant="outline"
//                   className="flex flex-col items-center justify-center h-14 gap-1 text-xs"
//                   onClick={() => handleShare("facebook")}
//                   disabled={isGeneratingLink}
//                 >
//                   <Image
//                     src={"/facebook.png"}
//                     height={20}
//                     width={20}
//                     alt="Facebook"
//                   />
//                   <span className="text-[10px]">Facebook</span>
//                 </Button>

//                 <Button
//                   variant="outline"
//                   className="flex flex-col items-center justify-center h-14 gap-1 text-xs"
//                   onClick={() => handleShare("instagram")}
//                   disabled={isGeneratingLink}
//                 >
//                   <Image
//                     src={"/instagram_logo.png"}
//                     height={20}
//                     width={20}
//                     alt="Instagram"
//                   />
//                   <span className="text-[10px]">Instagram</span>
//                 </Button>
//               </div>
//             </div>

//             {/* Pro Tip */}
//             <div className="bg-gray-50 dark:bg-gray-800 p-3 rounded-lg border">
//               <p className="text-xs text-gray-600 dark:text-gray-400">
//                 <strong>💡 Pro Tip:</strong> Post your image and text together
//                 as a single post for best engagement and conversion rates!
//               </p>
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








// "use client";

// import { useState, useEffect } from "react";
// import useSWR from "swr";
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
//   Copy,
//   Loader2,
//   Share2,
//   AlertCircle,
//   CheckCircle,
//   Smartphone,
// } from "lucide-react";
// import {
//   errorToast,
//   successToast,
//   toast,
// } from "@/components/ui/use-toast-advanced";
// import Image from "next/image";

// interface ShareModalProps {
//   open: boolean;
//   onOpenChange: (open: boolean) => void;
//   productName: string;
//   productId: string;
//   plugId: string;
// }

// interface LinkGenerationResponse {
//   link: string;
//   success: boolean;
//   error?: string;
// }

// // Dynamic import for client-side only functions
// const loadImageGenerator = async () => {
//   if (typeof window === "undefined") return null;
//   const { createLuxuryMagazineCard } = await import(
//     "@/lib/magazine-card-generator"
//   );
//   return createLuxuryMagazineCard;
// };

// // SWR fetcher function for POST requests
// const linkFetcher = async (
//   url: string,
//   shareUrl: string
// ): Promise<LinkGenerationResponse> => {
//   const response = await fetch(url, {
//     method: "POST",
//     headers: {
//       "Content-Type": "application/json",
//     },
//     body: JSON.stringify({ shareUrl }),
//   });

//   if (!response.ok) {
//     throw new Error(`HTTP error! status: ${response.status}`);
//   }

//   return response.json();
// };

// // Product fetcher function
// const productFetcher = async (productId: string, plugId?: string) => {
//   const url = `${
//     process.env.NEXT_PUBLIC_BACKEND_URL
//   }/public/products/${productId}${plugId ? `/${plugId}` : ""}`;

//   const response = await fetch(url, {
//     method: "GET",
//     headers: { "Content-Type": "application/json" },
//   });

//   if (!response.ok) {
//     throw new Error(`API error: ${response.status}`);
//   }

//   const result = await response.json();
//   return result.data;
// };

// // Platform detection utility
// const detectPlatform = () => {
//   if (typeof window === "undefined") return "desktop";

//   const userAgent = window.navigator.userAgent.toLowerCase();
//   const isIOS = /iphone|ipad|ipod/.test(userAgent);
//   const isAndroid = /android/.test(userAgent);
//   const isMobile = isIOS || isAndroid;
//   const isChrome = /chrome/.test(userAgent);
//   const isSafari = /safari/.test(userAgent) && !isChrome;
//   const isFirefox = /firefox/.test(userAgent);

//   if (isIOS && isSafari) return "ios-safari";
//   if (isIOS && isChrome) return "ios-chrome";
//   if (isAndroid && isChrome) return "android-chrome";
//   if (!isMobile && isChrome) return "desktop-chrome";
//   if (!isMobile && (isSafari || isFirefox)) return "desktop-other";

//   return isMobile ? "mobile-other" : "desktop-other";
// };

// // Enhanced sharing capabilities detection
// const getShareCapabilities = () => {
//   if (typeof window === "undefined") {
//     return { canShare: false, canShareFiles: false, hasClipboard: false };
//   }

//   const canShare = "share" in navigator && "canShare" in navigator;
//   const hasClipboard =
//     "clipboard" in navigator && "writeText" in navigator.clipboard;

//   let canShareFiles = false;
//   if (canShare) {
//     try {
//       // Test with a dummy file to check file sharing support
//       const testFile = new File(["test"], "test.png", { type: "image/png" });
//       canShareFiles =
//         navigator.canShare && navigator.canShare({ files: [testFile] });
//     } catch (e) {
//       canShareFiles = false;
//     }
//   }

//   return { canShare, canShareFiles, hasClipboard };
// };

// export function ShareModal({
//   open,
//   onOpenChange,
//   productName,
//   productId,
//   plugId,
// }: ShareModalProps) {
//   const [copied, setCopied] = useState(false);
//   const [customTagline, setCustomTagline] = useState("");
//   const [isGeneratingImage, setIsGeneratingImage] = useState(false);
//   const [generatedImageBlob, setGeneratedImageBlob] = useState<Blob | null>(
//     null
//   );
//   const [shareCapabilities, setShareCapabilities] = useState({
//     canShare: false,
//     canShareFiles: false,
//     hasClipboard: false,
//   });
//   const [platform, setPlatform] = useState("desktop");

//   // Get product data
//   const {
//     data: product,
//     error: productError,
//     isLoading: isLoadingProduct,
//   } = useSWR(
//     open && productId ? [productId, plugId] : null,
//     ([pid, plgId]) => productFetcher(pid, plgId),
//     {
//       revalidateOnFocus: false,
//       revalidateIfStale: false,
//       dedupingInterval: 60000,
//       shouldRetryOnError: false,
//     }
//   );

//   // Hard-coded call to action that always appears
//   const callToAction = "Get yours now! 🔥";

//   // Default tagline as placeholder
//   const defaultTagline = `Just discovered this amazing ${productName}! 😍 You need to see this! ✨`;

//   // Generate the original share URL
//   const originalShareUrl = () => {
//     const baseUrl = "https://pluggn.store/product";
//     return `${baseUrl}?pid=${productId}&ref=${plugId}`;
//   };

//   // SWR configuration optimized for link generation
//   const swrOptions = {
//     revalidateOnFocus: false,
//     revalidateOnReconnect: false,
//     revalidateIfStale: false,
//     dedupingInterval: 300000, // 5 minutes
//     errorRetryCount: 2,
//     errorRetryInterval: 1000,
//     shouldRetryOnError: (error: any) => {
//       return error.status >= 500;
//     },
//     onError: (error: any) => {
//       console.error("Link generation failed:", error);
//       errorToast("Please try again or use the direct link");
//     },
//   };

//   // SWR hook for generating the base link
//   const {
//     data: linkData,
//     error: linkError,
//     isLoading: isGeneratingLink,
//     mutate: regenerateLink,
//   } = useSWR(
//     open ? ["/api/links/generate", originalShareUrl()] : null,
//     ([url, shareUrl]) => linkFetcher(url, shareUrl),
//     swrOptions
//   );

//   // Initialize platform detection and capabilities
//   useEffect(() => {
//     if (open) {
//       setPlatform(detectPlatform());
//       setShareCapabilities(getShareCapabilities());
//     }
//   }, [open]);

//   // Generate marketing image
//   const generateMarketingImage = async (): Promise<Blob> => {
//     if (!product) {
//       throw new Error("Product data not available");
//     }

//     if (generatedImageBlob) {
//       return generatedImageBlob;
//     }

//     setIsGeneratingImage(true);
//     try {
//       const createLuxuryMagazineCard = await loadImageGenerator();
//       if (!createLuxuryMagazineCard) {
//         throw new Error("Failed to load image generator");
//       }

//       const { processedImage } = await createLuxuryMagazineCard({
//         imageUrl : "https://salescabal.s3.eu-west-3.amazonaws.com/stores/187287/products/e36c2c3d0765ad0f77127d2b9552c3794a1b37e9.jpeg",
//         productName : "LUXURY ESSENCE",
//         price : "₦299,000",
//         sellerName : "SOPHIA CHEN",
//         sellerImage : "/placeholder.svg", 
//         tagline : "TIMELESS ELEGANCE",
//         dimensions : { width: 530, height: 800 },
//         brandName : "pluggn",
//       });

//       // Convert data URL to blob
//       const response = await fetch(processedImage);
//       const blob = await response.blob();

//       setGeneratedImageBlob(blob);
//       return blob;
//     } finally {
//       setIsGeneratingImage(false);
//     }
//   };

//   // Generate the final message
//   const getFinalMessage = () => {
//     const tagline = customTagline.trim() || defaultTagline;
//     return `${tagline} ${callToAction}`;
//   };

//   // Generate platform-specific share URL
//   const generatePlatformUrl = (platform: string) => {
//     const baseLink = linkData?.link || originalShareUrl();
//     const platformMap: Record<string, string> = {
//       whatsapp: "w",
//       twitter: "t",
//       facebook: "f",
//       instagram: "i",
//       direct: "d",
//     };

//     const platformCode = platformMap[platform] || "d";
//     return `${baseLink}?m=${platformCode}`;
//   };

//   // Web Share API Level 2 implementation
//   const handleNativeShare = async (targetPlatform?: string) => {
//     try {
//       const imageBlob = await generateMarketingImage();
//       const file = new File(
//         [imageBlob],
//         `${productName.replace(/\s+/g, "_")}_marketing.png`,
//         {
//           type: "image/png",
//         }
//       );

//       const shareData = {
//         title: productName,
//         text: getFinalMessage(),
//         files: [file],
//       };

//       // Check if we can share files
//       if (shareCapabilities.canShareFiles && navigator.canShare(shareData)) {
//         await navigator.share(shareData);
//         successToast("Shared successfully! 🎉");
//         return true;
//       } else {
//         // Fallback to clipboard + intent
//         return await handleClipboardFallback(imageBlob, targetPlatform);
//       }
//     } catch (error) {
//       if (error instanceof Error && error.name === "AbortError") {
//         // User canceled share - no need to show error
//         return false;
//       }
//       console.error("Native share failed:", error);
//       return await handleClipboardFallback(
//         await generateMarketingImage(),
//         targetPlatform
//       );
//     }
//   };

//   // Clipboard fallback implementation
//   const handleClipboardFallback = async (
//     imageBlob: Blob,
//     targetPlatform?: string
//   ) => {
//     try {
//       const message = getFinalMessage();
//       const platformUrl = targetPlatform
//         ? generatePlatformUrl(targetPlatform)
//         : linkData?.link || originalShareUrl();

//       if (shareCapabilities.hasClipboard) {
//         // Copy image to clipboard
//         try {
//           await navigator.clipboard.write([
//             new ClipboardItem({
//               "image/png": imageBlob,
//             }),
//           ]);
//         } catch (e) {
//           console.warn("Could not copy image to clipboard:", e);
//         }

//         // Copy text to clipboard
//         const fullMessage = `${message} ${platformUrl}`;
//         await navigator.clipboard.writeText(fullMessage);

//         // Show platform-specific guidance
//         showPlatformGuidance(targetPlatform);
//         return true;
//       } else {
//         throw new Error("Clipboard not supported");
//       }
//     } catch (error) {
//       console.error("Clipboard fallback failed:", error);
//       errorToast("Could not copy to clipboard. Please share manually.");
//       return false;
//     }
//   };

//   // Platform-specific guidance
//   const showPlatformGuidance = (targetPlatform?: string) => {
//     let message = "✅ Image and message copied to clipboard!";
//     let description = "Paste them in your social post.";

//     switch (targetPlatform) {
//       case "instagram":
//         message = "📸 Ready for Instagram!";
//         description =
//           "Image copied! Open Instagram, create a post, and paste your message as caption.";
//         break;
//       case "facebook":
//         message = "📘 Ready for Facebook!";
//         description =
//           "Image and message copied! Facebook may strip the message - paste it after uploading the image.";
//         break;
//       case "twitter":
//         message = "🐦 Ready for Twitter!";
//         description =
//           "Image and message copied! Create a new tweet and paste both.";
//         break;
//       case "whatsapp":
//         message = "💬 Ready for WhatsApp!";
//         description =
//           "Image and message copied! Open WhatsApp and paste in your chat.";
//         break;
//     }

//     toast({
//       title: message,
//       description: description,
//       variant: "success",
//     });
//   };

//   // Universal share handler
//   const handleShare = async (targetPlatform: string) => {
//     if (isGeneratingLink) {
//       toast({
//         title: "Please wait",
//         description: "Link is being generated...",
//         variant: "default",
//       });
//       return;
//     }

//     // For desktop or platforms without native share, use clipboard + intent
//     if (platform.includes("desktop") || !shareCapabilities.canShare) {
//       const success = await handleClipboardFallback(
//         await generateMarketingImage(),
//         targetPlatform
//       );
//       if (success && targetPlatform !== "instagram") {
//         // Open platform intent URLs for non-Instagram platforms
//         const platformSpecificUrl = generatePlatformUrl(targetPlatform);
//         const encodedUrl = encodeURIComponent(platformSpecificUrl);
//         const encodedText = encodeURIComponent(getFinalMessage());

//         let intentUrl = "";
//         switch (targetPlatform) {
//           case "whatsapp":
//             intentUrl = `https://wa.me/?text=${encodedText}%20${encodedUrl}`;
//             break;
//           case "twitter":
//             intentUrl = `https://twitter.com/intent/tweet?text=${encodedText}&url=${encodedUrl}`;
//             break;
//           case "facebook":
//             intentUrl = `https://www.facebook.com/sharer/sharer.php?u=${encodedUrl}&quote=${encodedText}`;
//             break;
//         }

//         if (intentUrl) {
//           window.open(intentUrl, "_blank");
//         }
//       }
//     } else {
//       // Use native share API
//       await handleNativeShare(targetPlatform);
//     }
//   };

//   // Copy link handler
//   const handleCopyLink = () => {
//     const linkToCopy = linkData?.link || originalShareUrl();
//     const directLink = `${linkToCopy}?m=d`;

//     navigator.clipboard.writeText(directLink);
//     setCopied(true);

//     successToast("Link copied successfully!");
//     setTimeout(() => setCopied(false), 2000);
//   };

//   // Reset states when modal closes
//   useEffect(() => {
//     if (!open) {
//       setCopied(false);
//       setGeneratedImageBlob(null);
//     }
//   }, [open]);

//   // Retry link generation
//   const handleRetryLinkGeneration = () => {
//     regenerateLink();
//   };

//   const displayUrl = isGeneratingLink
//     ? "Generating link..."
//     : linkData?.link
//     ? `${linkData.link}?m=d`
//     : `${originalShareUrl()}?m=d`;

//   // Platform-specific UI messages
//   const getPlatformMessage = () => {
//     if (platform.includes("ios") || platform.includes("android")) {
//       if (shareCapabilities.canShareFiles) {
//         return {
//           type: "success",
//           message: "📱 Full sharing experience available!",
//           description: "You can share images and text directly to apps.",
//         };
//       } else {
//         return {
//           type: "info",
//           message: "📱 Mobile sharing available",
//           description: "Image and text will be copied for you to paste.",
//         };
//       }
//     } else {
//       return {
//         type: "info",
//         message: "💻 Desktop sharing",
//         description:
//           "Image and text will be copied to clipboard. Mobile devices offer better sharing experience.",
//       };
//     }
//   };

//   const platformMessage = getPlatformMessage();

//   return (
//     <Dialog open={open} onOpenChange={onOpenChange}>
//       <DialogContent className="w-[95vw] max-w-md max-h-[90vh] p-4 sm:p-6">
//         <div className="flex flex-col h-full max-h-[calc(90vh-2rem)]">
//           <DialogHeader className="flex-shrink-0 pb-3">
//             <DialogTitle className="text-lg sm:text-xl">
//               Share Product with Marketing Image
//             </DialogTitle>
//             <DialogDescription className="text-sm text-gray-600 dark:text-gray-400">
//               Share your referral link with a professional marketing image
//             </DialogDescription>
//           </DialogHeader>

//           {/* Scrollable Content */}
//           <div className="flex-1 overflow-y-auto space-y-3 pr-1">
//             {/* Platform Status */}
//             <div
//               className={`p-3 rounded-lg border ${
//                 platformMessage.type === "success"
//                   ? "bg-green-50 dark:bg-green-900/20 border-green-200 dark:border-green-800"
//                   : "bg-blue-50 dark:bg-blue-900/20 border-blue-200 dark:border-blue-800"
//               }`}
//             >
//               <div className="flex items-start space-x-2">
//                 <Smartphone
//                   className={`h-4 w-4 mt-0.5 ${
//                     platformMessage.type === "success"
//                       ? "text-green-600"
//                       : "text-blue-600"
//                   }`}
//                 />
//                 <div>
//                   <p
//                     className={`text-sm font-medium ${
//                       platformMessage.type === "success"
//                         ? "text-green-800 dark:text-green-200"
//                         : "text-blue-800 dark:text-blue-200"
//                     }`}
//                   >
//                     {platformMessage.message}
//                   </p>
//                   <p
//                     className={`text-xs mt-1 ${
//                       platformMessage.type === "success"
//                         ? "text-green-700 dark:text-green-300"
//                         : "text-blue-700 dark:text-blue-300"
//                     }`}
//                   >
//                     {platformMessage.description}
//                   </p>
//                 </div>
//               </div>
//             </div>

//             {/* Loading Product Data */}
//             {isLoadingProduct && (
//               <div className="bg-gray-50 dark:bg-gray-800 p-3 rounded-lg border">
//                 <div className="flex items-center space-x-2">
//                   <Loader2 className="h-4 w-4 animate-spin" />
//                   <p className="text-sm">Loading product data...</p>
//                 </div>
//               </div>
//             )}

//             {/* Product Error */}
//             {productError && (
//               <div className="bg-red-50 dark:bg-red-900/20 p-3 rounded-lg border border-red-200 dark:border-red-800">
//                 <p className="text-sm text-red-700 dark:text-red-300">
//                   Failed to load product data. Please try again.
//                 </p>
//               </div>
//             )}

//             {/* Customize Message */}
//             <div className="bg-orange-50 dark:bg-orange-900/20 p-3 rounded-lg border border-orange-200 dark:border-orange-800">
//               <div className="flex items-start space-x-2 mb-2">
//                 <div className="bg-orange-600 text-white rounded-full w-5 h-5 flex items-center justify-center text-xs font-bold flex-shrink-0 mt-0.5">
//                   1
//                 </div>
//                 <div className="flex-1">
//                   <h3 className="text-sm font-semibold text-orange-800 dark:text-orange-200">
//                     Customize Your Message
//                   </h3>
//                   <p className="text-xs text-orange-700 dark:text-orange-300 mt-1">
//                     Personalize your share text (optional)
//                   </p>
//                 </div>
//               </div>

//               <Textarea
//                 placeholder={defaultTagline}
//                 value={customTagline}
//                 onChange={(e) => setCustomTagline(e.target.value)}
//                 className="min-h-[60px] h-14 resize-none text-xs leading-relaxed mb-2"
//                 maxLength={200}
//                 disabled={isGeneratingLink}
//               />

//               <div className="flex justify-between items-center text-[10px]">
//                 <span className="text-orange-600">Emojis welcome! 🎉</span>
//                 <span className="text-gray-400">
//                   {customTagline.length}/200
//                 </span>
//               </div>

//               {/* Preview */}
//               <div className="bg-white dark:bg-gray-800 p-2 rounded border mt-2">
//                 <p className="text-[10px] font-medium text-gray-600 dark:text-gray-400 mb-1">
//                   Preview:
//                 </p>
//                 <p className="text-xs text-gray-800 dark:text-gray-200 leading-snug break-all">
//                   {getFinalMessage()}
//                 </p>
//               </div>
//             </div>

//             {/* Link Generation Status */}
//             {isGeneratingLink && (
//               <div className="bg-purple-50 dark:bg-purple-900/20 p-2 rounded border border-purple-200 dark:border-purple-800">
//                 <div className="flex items-center space-x-2">
//                   <Loader2 className="h-3 w-3 animate-spin text-purple-600" />
//                   <p className="text-xs text-purple-700 dark:text-purple-300">
//                     Generating your referral link...
//                   </p>
//                 </div>
//               </div>
//             )}

//             {linkError && !isGeneratingLink && (
//               <div className="bg-red-50 dark:bg-red-900/20 p-2 rounded border border-red-200 dark:border-red-800">
//                 <div className="flex items-center justify-between">
//                   <p className="text-xs text-red-700 dark:text-red-300">
//                     Failed to generate link. Using direct link.
//                   </p>
//                   <Button
//                     variant="ghost"
//                     size="sm"
//                     onClick={handleRetryLinkGeneration}
//                     className="h-6 px-2 text-xs text-red-600 hover:text-red-700"
//                   >
//                     Retry
//                   </Button>
//                 </div>
//               </div>
//             )}

//             {linkData?.success && !isGeneratingLink && (
//               <div className="bg-green-50 dark:bg-green-900/20 p-2 rounded border border-green-200 dark:border-green-800">
//                 <p className="text-xs text-green-700 dark:text-green-300">
//                   ✓ Referral link generated successfully
//                 </p>
//               </div>
//             )}

//             {/* Copy Link Section */}
//             <div className="flex items-center space-x-2">
//               <Input
//                 value={displayUrl}
//                 readOnly
//                 className="flex-1 text-[10px] h-8"
//                 style={{
//                   opacity: isGeneratingLink ? 0.6 : 1,
//                   fontStyle: isGeneratingLink ? "italic" : "normal",
//                 }}
//               />
//               <Button
//                 variant={copied ? "ghost" : "secondary"}
//                 size="sm"
//                 onClick={handleCopyLink}
//                 disabled={isGeneratingLink}
//                 className="flex-shrink-0 h-8 px-2"
//               >
//                 {isGeneratingLink ? (
//                   <Loader2 className="h-3 w-3 animate-spin mr-1" />
//                 ) : (
//                   <Copy className="h-3 w-3 mr-1" />
//                 )}
//                 <span className="text-xs">
//                   {isGeneratingLink ? "..." : copied ? "✓" : "Copy"}
//                 </span>
//               </Button>
//             </div>

//             {/* Share with Image */}
//             <div className="bg-green-50 dark:bg-green-900/20 p-3 rounded-lg border border-green-200 dark:border-green-800">
//               <div className="flex items-start space-x-2 mb-3">
//                 <div className="bg-green-600 text-white rounded-full w-5 h-5 flex items-center justify-center text-xs font-bold flex-shrink-0 mt-0.5">
//                   2
//                 </div>
//                 <div className="flex-1">
//                   <h3 className="text-sm font-semibold text-green-800 dark:text-green-200">
//                     Share with Marketing Image
//                   </h3>
//                   <p className="text-xs text-green-700 dark:text-green-300 mt-1">
//                     {shareCapabilities.canShareFiles
//                       ? "Share directly to your apps with image and text"
//                       : "Image and text will be copied for you to paste"}
//                   </p>
//                 </div>
//               </div>

//               {/* Social Media Buttons */}
//               <div className="grid grid-cols-2 gap-2">
//                 <Button
//                   variant="outline"
//                   className="flex flex-col items-center justify-center h-14 gap-1 text-xs"
//                   onClick={() => handleShare("whatsapp")}
//                   disabled={isGeneratingLink || isLoadingProduct || !product}
//                 >
//                   {isGeneratingImage ? (
//                     <Loader2 className="h-5 w-5 animate-spin" />
//                   ) : (
//                     <Image
//                       src={"/whatsapp.png"}
//                       height={20}
//                       width={20}
//                       alt="WhatsApp"
//                     />
//                   )}
//                   <span className="text-[10px]">WhatsApp</span>
//                 </Button>

//                 <Button
//                   variant="outline"
//                   className="flex flex-col items-center justify-center h-14 gap-1 text-xs"
//                   onClick={() => handleShare("twitter")}
//                   disabled={isGeneratingLink || isLoadingProduct || !product}
//                 >
//                   {isGeneratingImage ? (
//                     <Loader2 className="h-5 w-5 animate-spin" />
//                   ) : (
//                     <Image
//                       src={"/twitter.png"}
//                       height={20}
//                       width={20}
//                       alt="Twitter"
//                     />
//                   )}
//                   <span className="text-[10px]">Twitter</span>
//                 </Button>

//                 <Button
//                   variant="outline"
//                   className="flex flex-col items-center justify-center h-14 gap-1 text-xs"
//                   onClick={() => handleShare("facebook")}
//                   disabled={isGeneratingLink || isLoadingProduct || !product}
//                 >
//                   {isGeneratingImage ? (
//                     <Loader2 className="h-5 w-5 animate-spin" />
//                   ) : (
//                     <Image
//                       src={"/facebook.png"}
//                       height={20}
//                       width={20}
//                       alt="Facebook"
//                     />
//                   )}
//                   <span className="text-[10px]">Facebook</span>
//                 </Button>

//                 <Button
//                   variant="outline"
//                   className="flex flex-col items-center justify-center h-14 gap-1 text-xs"
//                   onClick={() => handleShare("instagram")}
//                   disabled={isGeneratingLink || isLoadingProduct || !product}
//                 >
//                   {isGeneratingImage ? (
//                     <Loader2 className="h-5 w-5 animate-spin" />
//                   ) : (
//                     <Image
//                       src={"/instagram_logo.png"}
//                       height={20}
//                       width={20}
//                       alt="Instagram"
//                     />
//                   )}
//                   <span className="text-[10px]">Instagram</span>
//                 </Button>
//               </div>

//               {/* Universal share button for supported platforms */}
//               {shareCapabilities.canShareFiles && (
//                 <Button
//                   onClick={() => handleNativeShare()}
//                   disabled={isGeneratingLink || isLoadingProduct || !product}
//                   className="w-full mt-3 bg-blue-600 hover:bg-blue-700 text-white"
//                 >
//                   {isGeneratingImage ? (
//                     <>
//                       <Loader2 className="h-4 w-4 animate-spin mr-2" />
//                       Generating Image...
//                     </>
//                   ) : (
//                     <>
//                       <Share2 className="h-4 w-4 mr-2" />
//                       Share to Any App
//                     </>
//                   )}
//                 </Button>
//               )}
//             </div>

//             {/* Pro Tip */}
//             <div className="bg-gray-50 dark:bg-gray-800 p-3 rounded-lg border">
//               <p className="text-xs text-gray-600 dark:text-gray-400">
//                 <strong>💡 Pro Tip:</strong>{" "}
//                 {shareCapabilities.canShareFiles
//                   ? "Use 'Share to Any App' for the best experience on mobile!"
//                   : "For best results, paste both the image and text in your post for maximum engagement!"}
//               </p>
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
        imageUrl: "https://salescabal.s3.eu-west-3.amazonaws.com/stores/187287/products/e36c2c3d0765ad0f77127d2b9552c3794a1b37e9.jpeg",
        productName: "LUXURY ESSENCE",
        price: "₦299,000",
        sellerName: "SOPHIA CHEN",
        sellerImage: "/placeholder.svg",
        tagline: "TIMELESS ELEGANCE",
        dimensions: { width: 530, height: 800 },
        brandName: "pluggn",
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
    if (!customMessage.trim()) {
      toast({
        title: "Marketing message required",
        description: "Please write your marketing message to continue",
       
      });
      return;
    }
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
      
      setTimeout(() => setFinalMessageCopied(false), 3000);
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
          title: "🎉 Image shared successfully!",
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
        
        <h3 className="font-semibold text-lg">Write Your Marketing Message</h3>
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

      <div className="bg-yellow-50 dark:bg-yellow-900/20 p-3 rounded-lg border border-yellow-200 dark:border-yellow-800">
        <p className="text-sm text-yellow-800 dark:text-yellow-200">
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
      
        <h3 className="font-semibold text-lg">Choose Your Platform</h3>
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
                  <h4 className="font-medium">{platform.name}</h4>
                  {selectedPlatform?.id === platform.id && (
                    <CheckCircle className="h-4 w-4 text-green-600" />
                  )}
                </div>
                <p className="text-sm text-gray-600 dark:text-gray-400 mt-1">
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
       
        <h3 className="font-semibold text-lg">Copy Message & Share Image</h3>
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
            <p className="text-sm font-medium text-blue-800 dark:text-blue-200">
              Sharing to {selectedPlatform.name}
            </p>
          </div>
        </div>
      )}

      <div className="space-y-3">
        {/* Step 3a: Copy Message */}
        <div className="bg-green-50 dark:bg-green-900/20 p-4 rounded-lg border border-green-200 dark:border-green-800">
          <div className="flex items-center space-x-2 mb-2">
           
            <h4 className="font-medium text-green-800 dark:text-green-200">
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
           
            <h4 className="font-medium text-green-800 dark:text-green-200">
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
                📸 Share Marketing Image
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
        Back to Platform Selection
      </Button>
    </div>
  );

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="w-[95vw] max-w-md max-h-[90vh] p-4 sm:p-6">
        <DialogHeader className="pb-4">
          <DialogTitle className="text-lg">
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