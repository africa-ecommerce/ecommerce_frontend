"use client";

import { useState } from "react";
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
  Copy
} from "lucide-react";
import { toast } from "@/components/ui/use-toast-advanced";
import Image from "next/image";

interface ShareModalProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  productName: string;
  productId: string;
  plugId: string;
}

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

  // Generate the final message
  const getFinalMessage = () => {
    const tagline = customTagline.trim() || defaultTagline;
    return `${tagline} ${callToAction}`;
  };

  // Generate share URL with query parameters for product ID, referral (plug ID), and platform
  const generateShareUrl = (platform: string) => {
    const baseUrl = "https://pluggn.store/product";
    return `${baseUrl}?pid=${productId}&ref=${plugId}&platform=${platform}`;
  };

  // Default share URL (used for copy link button)
  const shareUrl = generateShareUrl("direct");
  

  // Share handlers
  const handleCopyLink = () => {
    navigator.clipboard.writeText(shareUrl);
    setCopied(true);
    toast({
      title: "Link copied!",
      description: "Product link has been copied to clipboard",
      variant: "success",
    });
    setTimeout(() => setCopied(false), 2000);
  };

  const handleShare = (platform: string) => {
    let shareLink = "";
    const platformSpecificUrl = generateShareUrl(platform);
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
                value={shareUrl}
                readOnly
                className="flex-1 text-[10px] h-8"
              />
              <Button
                variant={copied ? "ghost" : "secondary"}
                size="sm"
                onClick={handleCopyLink}
                className="flex-shrink-0 h-8 px-2"
              >
                <Copy className="h-3 w-3 mr-1" />
                <span className="text-xs">{copied ? "✓" : "Copy"}</span>
              </Button>
            </div>

            {/* Social Media Buttons - More Compact */}
            <div className="grid grid-cols-2 gap-2">
              <Button
                variant="outline"
                className="flex flex-col items-center justify-center h-14 gap-1 text-xs"
                onClick={() => handleShare("whatsapp")}
              >
                <Image src={"/whatsapp.png"}  
                height={20} width={20} alt="WhatsApp"
                />
                <span className="text-[10px]">WhatsApp</span>
              </Button>

              <Button
                variant="outline"
                className="flex flex-col items-center justify-center h-14 gap-1 text-xs"
                onClick={() => handleShare("twitter")}
              >
                <Image src={"/twitter.png"}  
                height={20} width={20} alt="Twitter"
                />
                <span className="text-[10px]">Twitter</span>
              </Button>

              <Button
                variant="outline"
                className="flex flex-col items-center justify-center h-14 gap-1 text-xs"
                onClick={() => handleShare("facebook")}
              >
               <Image src={"/facebook.png"}  
                height={20} width={20} alt="Facebook"
                />
                <span className="text-[10px]">Facebook</span>
              </Button>

              <Button
                variant="outline"
                className="flex flex-col items-center justify-center h-14 gap-1 text-xs"
                onClick={() => handleShare("instagram")}
              >
                <Image src={"/instagram_logo.png"}  
                height={20} width={20} alt="Instagram"
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
