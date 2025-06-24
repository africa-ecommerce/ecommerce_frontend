




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
// import { getProduct } from "@/lib/products";
// import { createEnhancedMagazineCard } from "@/lib/magazine-card-generator";

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

// // Import your existing functions
// // import { createEnhancedMagazineCard } from "@/lib/magazine-card";
// // import { getProduct } from "@/lib/get-product";

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
//   const [imageDownloaded, setImageDownloaded] = useState(false);
//   const [isGeneratingImage, setIsGeneratingImage] = useState(false);
//   const [downloadError, setDownloadError] = useState<string | null>(null);

//   // Get product data
//   // const { product, isLoading: isLoadingProduct } = getProduct(productId, plugId);

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

//       // Mock product data - replace with actual product data
      

//       const { product } = getProduct(
//         productId,
//         plugId
//       );

//       // Generate the marketing card image
//       const { processedImage } = await createEnhancedMagazineCard({
//         primaryImageUrl: product.images[0],
//         secondaryImageUrl: product.images[0], // Using same image for now
//         productName: product.name,
//         productPrice: product.price,
//         creatorName: "John",
//         dimensions: { width: 1080, height: 1080 }, // Instagram square size
//       });

//       // Create download link
//       const link = document.createElement("a");
//       link.href = processedImage;
//       link.download = `${productName.replace(/\s+/g, "_")}_marketing_image.png`;
//       document.body.appendChild(link);
//       link.click();
//       document.body.removeChild(link);

//       // Clean up the blob URL
//       URL.revokeObjectURL(processedImage);

//       setImageDownloaded(true);
//       successToast("Marketing image downloaded successfully! 🎉");
//     } catch (error) {
//       console.error("Error generating/downloading image:", error);
//       setDownloadError("Failed to generate marketing image. Please try again.");
//       errorToast("Failed to download image. Please try again.");
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
//                 disabled={isGeneratingImage}
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
import {
  Copy,
  Loader2,
  Download,
  AlertCircle,
  CheckCircle,
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

// Dynamic import for client-side only functions
const loadImageGenerator = async () => {
  if (typeof window === "undefined") return null;
  const { createEnhancedMagazineCard } = await import(
    "@/lib/magazine-card-generator"
  );
  return createEnhancedMagazineCard;
};

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
  const [copied, setCopied] = useState(false);
  const [customTagline, setCustomTagline] = useState("");
  const [imageDownloaded, setImageDownloaded] = useState(false);
  const [isGeneratingImage, setIsGeneratingImage] = useState(false);
  const [downloadError, setDownloadError] = useState<string | null>(null);

  // Get product data - move this to the top level of the component
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
      return error.status >= 500;
    },
    onError: (error: any) => {
      console.error("Link generation failed:", error);
      errorToast("Please try again or use the direct link");
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

  // Generate marketing image and download
  const handleDownloadImage = async () => {
    try {
      setIsGeneratingImage(true);
      setDownloadError(null);

      // Ensure we're on the client side
      if (typeof window === "undefined") {
        throw new Error("This function can only run on the client side");
      }

      // Check if product data is available
      if (!product) {
        throw new Error(
          "Product data not available. Please wait and try again."
        );
      }

      // Ensure product has required fields
      if (
        !product.images ||
        !product.images[0] ||
        !product.name ||
        !product.price
      ) {
        throw new Error("Product data is incomplete. Missing required fields.");
      }

      // Dynamically load the image generator
      const createEnhancedMagazineCard = await loadImageGenerator();
      if (!createEnhancedMagazineCard) {
        throw new Error("Failed to load image generator");
      }

      // Generate the marketing card image
      const { processedImage } = await createEnhancedMagazineCard({
        primaryImageUrl: product.images[0],
        secondaryImageUrl: product.images[0], // Using same image for now
        productName: product.name,
        productPrice: product.price,
        creatorName: "John",
        dimensions: { width: 1024, height: 1536 }, // Instagram square size
      });

      // Create download link - ensure we're in browser environment
      if (typeof document !== "undefined") {
        const link = document.createElement("a");
        link.href = processedImage;
        link.download = `${productName.replace(
          /\s+/g,
          "_"
        )}_marketing_image.png`;
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);

        // Clean up the blob URL
        URL.revokeObjectURL(processedImage);

        setImageDownloaded(true);
        successToast("Marketing image downloaded successfully! 🎉");
      } else {
        throw new Error("Document is not available");
      }
    } catch (error) {
      console.error("Error generating/downloading image:", error);
      setDownloadError(
        error instanceof Error
          ? error.message
          : "Failed to generate marketing image. Please try again."
      );
      errorToast(
        error instanceof Error
          ? error.message
          : "Failed to download image. Please try again."
      );
    } finally {
      setIsGeneratingImage(false);
    }
  };

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

    successToast("Link copied successfully!");
    setTimeout(() => setCopied(false), 2000);
  };

  // Share handlers
  const handleShare = (platform: string) => {
    if (isGeneratingLink) {
      successToast("Link is being generated...");
      return;
    }

    if (!imageDownloaded) {
      toast({
        title: "Download Image First! 📸",
        description:
          "Please download the marketing image before sharing for better results",
        variant: "warning",
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
        navigator.clipboard.writeText(
          `${getFinalMessage()} ${platformSpecificUrl}`
        );
        toast({
          title: "Ready for Instagram! 📸",
          description:
            "Your message and link have been copied. Now upload your downloaded image and paste this text!",
          variant: "success",
        });
        return;
    }

    if (shareLink) {
      window.open(shareLink, "_blank");
      toast({
        title: "Don't Forget! 📸",
        description:
          "Remember to attach your downloaded marketing image before posting for maximum impact!",
        variant: "default",
      });
    }
  };

  // Reset states when modal closes
  useEffect(() => {
    if (!open) {
      setCopied(false);
      setImageDownloaded(false);
      setDownloadError(null);
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
              Share Product with Marketing Image
            </DialogTitle>
            <DialogDescription className="text-sm text-gray-600 dark:text-gray-400">
              Download your marketing image first, then share with your referral
              link
            </DialogDescription>
          </DialogHeader>

          {/* Scrollable Content */}
          <div className="flex-1 overflow-y-auto space-y-3 pr-1">
            {/* Loading Product Data */}
            {isLoadingProduct && (
              <div className="bg-gray-50 dark:bg-gray-800 p-3 rounded-lg border">
                <div className="flex items-center space-x-2">
                  <Loader2 className="h-4 w-4 animate-spin" />
                  <p className="text-sm">Loading product data...</p>
                </div>
              </div>
            )}

            {/* Product Error */}
            {productError && (
              <div className="bg-red-50 dark:bg-red-900/20 p-3 rounded-lg border border-red-200 dark:border-red-800">
                <p className="text-sm text-red-700 dark:text-red-300">
                  Failed to load product data. Please try again.
                </p>
              </div>
            )}

            {/* Step 1: Download Marketing Image */}
            <div className="bg-blue-50 dark:bg-blue-900/20 p-3 rounded-lg border border-blue-200 dark:border-blue-800">
              <div className="flex items-start space-x-2 mb-2">
                <div className="bg-blue-600 text-white rounded-full w-5 h-5 flex items-center justify-center text-xs font-bold flex-shrink-0 mt-0.5">
                  1
                </div>
                <div className="flex-1">
                  <h3 className="text-sm font-semibold text-blue-800 dark:text-blue-200">
                    Download Marketing Image
                  </h3>
                  <p className="text-xs text-blue-700 dark:text-blue-300 mt-1">
                    Get your professional marketing material. Always download
                    fresh for latest updates!
                  </p>
                </div>
              </div>

              <Button
                onClick={handleDownloadImage}
                disabled={isGeneratingImage || isLoadingProduct || !product}
                className="w-full bg-blue-600 hover:bg-blue-700 text-white h-9"
              >
                {isGeneratingImage ? (
                  <>
                    <Loader2 className="h-4 w-4 animate-spin mr-2" />
                    Generating Image...
                  </>
                ) : imageDownloaded ? (
                  <>
                    <CheckCircle className="h-4 w-4 mr-2" />
                    Downloaded ✓ (Click to Re-download)
                  </>
                ) : (
                  <>
                    <Download className="h-4 w-4 mr-2" />
                    Download Marketing Image
                  </>
                )}
              </Button>

              {downloadError && (
                <div className="flex items-center space-x-1 mt-2">
                  <AlertCircle className="h-3 w-3 text-red-600" />
                  <p className="text-xs text-red-600">{downloadError}</p>
                </div>
              )}
            </div>

            {/* Step 2: Customize Message */}
            <div className="bg-orange-50 dark:bg-orange-900/20 p-3 rounded-lg border border-orange-200 dark:border-orange-800">
              <div className="flex items-start space-x-2 mb-2">
                <div className="bg-orange-600 text-white rounded-full w-5 h-5 flex items-center justify-center text-xs font-bold flex-shrink-0 mt-0.5">
                  2
                </div>
                <div className="flex-1">
                  <h3 className="text-sm font-semibold text-orange-800 dark:text-orange-200">
                    Customize Your Message
                  </h3>
                  <p className="text-xs text-orange-700 dark:text-orange-300 mt-1">
                    Personalize your share text (optional)
                  </p>
                </div>
              </div>

              <Textarea
                placeholder={defaultTagline}
                value={customTagline}
                onChange={(e) => setCustomTagline(e.target.value)}
                className="min-h-[60px] h-14 resize-none text-xs leading-relaxed mb-2"
                maxLength={200}
                disabled={isGeneratingLink}
              />

              <div className="flex justify-between items-center text-[10px]">
                <span className="text-orange-600">Emojis welcome! 🎉</span>
                <span className="text-gray-400">
                  {customTagline.length}/200
                </span>
              </div>

              {/* Preview */}
              <div className="bg-white dark:bg-gray-800 p-2 rounded border mt-2">
                <p className="text-[10px] font-medium text-gray-600 dark:text-gray-400 mb-1">
                  Preview:
                </p>
                <p className="text-xs text-gray-800 dark:text-gray-200 leading-snug break-all">
                  {getFinalMessage()}
                </p>
              </div>
            </div>

            {/* Link Generation Status */}
            {isGeneratingLink && (
              <div className="bg-purple-50 dark:bg-purple-900/20 p-2 rounded border border-purple-200 dark:border-purple-800">
                <div className="flex items-center space-x-2">
                  <Loader2 className="h-3 w-3 animate-spin text-purple-600" />
                  <p className="text-xs text-purple-700 dark:text-purple-300">
                    Generating your referral link...
                  </p>
                </div>
              </div>
            )}

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

            {linkData?.success && !isGeneratingLink && (
              <div className="bg-green-50 dark:bg-green-900/20 p-2 rounded border border-green-200 dark:border-green-800">
                <p className="text-xs text-green-700 dark:text-green-300">
                  ✓ Referral link generated successfully
                </p>
              </div>
            )}

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

            {/* Step 3: Share with Image */}
            <div className="bg-green-50 dark:bg-green-900/20 p-3 rounded-lg border border-green-200 dark:border-green-800">
              <div className="flex items-start space-x-2 mb-3">
                <div className="bg-green-600 text-white rounded-full w-5 h-5 flex items-center justify-center text-xs font-bold flex-shrink-0 mt-0.5">
                  3
                </div>
                <div className="flex-1">
                  <h3 className="text-sm font-semibold text-green-800 dark:text-green-200">
                    Share with Your Image
                  </h3>
                  <p className="text-xs text-green-700 dark:text-green-300 mt-1">
                    <strong>Important:</strong> Always attach your downloaded
                    image when posting for maximum conversion!
                  </p>
                </div>
              </div>

              {/* Social Media Buttons */}
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

            {/* Pro Tip */}
            <div className="bg-gray-50 dark:bg-gray-800 p-3 rounded-lg border">
              <p className="text-xs text-gray-600 dark:text-gray-400">
                <strong>💡 Pro Tip:</strong> Post your image and text together
                as a single post for best engagement and conversion rates!
              </p>
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