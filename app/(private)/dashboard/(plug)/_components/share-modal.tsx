




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
  Copy,
  Facebook,
  Instagram,
  Twitter,
  PhoneIcon as WhatsApp,
} from "lucide-react";
import { toast } from "@/components/ui/use-toast-advanced";

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
    const baseUrl = "https://pluggn.vercel.app/product";
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
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle>Share Product</DialogTitle>
          <DialogDescription>
            Customize your message and share this product with your friends and
            followers
          </DialogDescription>
        </DialogHeader>

        {/* Custom Tagline Section */}
        <div className="space-y-3 mt-4">
          <div>
            <label
              htmlFor="tagline"
              className="text-sm font-medium text-gray-700 dark:text-gray-300 mb-2 block"
            >
              Your Message (Optional)
            </label>
            <Textarea
              id="tagline"
              placeholder={defaultTagline}
              value={customTagline}
              onChange={(e) => setCustomTagline(e.target.value)}
              className="min-h-[80px] resize-none text-sm"
              maxLength={200}
            />
            <div className="flex justify-between items-center mt-1">
              <p className="text-xs text-gray-500">
                Emojis welcome! 🎉 Leave blank to use default message
              </p>
              <p className="text-xs text-gray-400">
                {customTagline.length}/200
              </p>
            </div>
          </div>

          {/* Preview Section */}
          <div className="bg-gray-50 dark:bg-gray-800 p-3 rounded-lg border">
            <p className="text-xs font-medium text-gray-600 dark:text-gray-400 mb-1">
              Preview:
            </p>
            <p className="text-sm text-gray-800 dark:text-gray-200">
              {getFinalMessage()}
            </p>
          </div>
        </div>

        {/* Copy Link Section */}
        <div className="flex items-center space-x-2 mt-4">
          <Input
            value={shareUrl}
            readOnly
            className="flex-1 text-xs sm:text-sm"
          />
          <Button
            variant={copied ? "ghost" : "secondary"}
            size="sm"
            onClick={handleCopyLink}
            className="flex-shrink-0"
          >
            <Copy className="h-3.5 w-3.5 mr-1" />
            {copied ? "Copied" : "Copy"}
          </Button>
        </div>

        {/* Social Media Buttons */}
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 mt-4">
          <Button
            variant="outline"
            className="flex flex-col items-center justify-center h-20 sm:h-24 gap-1"
            onClick={() => handleShare("whatsapp")}
          >
            <WhatsApp className="h-6 w-6 sm:h-8 sm:w-8 text-green-500" />
            <span className="text-xs">WhatsApp</span>
          </Button>

          <Button
            variant="outline"
            className="flex flex-col items-center justify-center h-20 sm:h-24 gap-1"
            onClick={() => handleShare("twitter")}
          >
            <Twitter className="h-6 w-6 sm:h-8 sm:w-8 text-sky-500" />
            <span className="text-xs">Twitter</span>
          </Button>

          <Button
            variant="outline"
            className="flex flex-col items-center justify-center h-20 sm:h-24 gap-1"
            onClick={() => handleShare("facebook")}
          >
            <Facebook className="h-6 w-6 sm:h-8 sm:w-8 text-blue-600" />
            <span className="text-xs">Facebook</span>
          </Button>

          <Button
            variant="outline"
            className="flex flex-col items-center justify-center h-20 sm:h-24 gap-1"
            onClick={() => handleShare("instagram")}
          >
            <Instagram className="h-6 w-6 sm:h-8 sm:w-8 text-pink-500" />
            <span className="text-xs">Instagram</span>
          </Button>
        </div>

        <DialogFooter className="mt-4 sm:mt-6">
          <Button variant="ghost" onClick={() => onOpenChange(false)}>
            Close
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}