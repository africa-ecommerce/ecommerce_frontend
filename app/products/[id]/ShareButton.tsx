"use client";

import { useState } from "react";
import { Share2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";

interface ShareButtonProps {
  productId: string;
  productName: string;
  productDescription?: string;
}

export default function ShareButton({
  productId,
  productName,
  productDescription,
}: ShareButtonProps) {
  const [copied, setCopied] = useState(false);
  const [open, setOpen] = useState(false);

  // Get the full URL to the product
  const getShareUrl = () => {
    if (typeof window === "undefined") return "";
    return `${window.location.origin}/products/${productId}`;
  };

  // Get the OG image URL
  const getOgImageUrl = () => {
    if (typeof window === "undefined") return "";
    return `${window.location.origin}/api/og/${productId}`;
  };

  const handleCopyLink = async () => {
    const url = getShareUrl();
    await navigator.clipboard.writeText(url);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const handleShare = async (platform: string) => {
    const url = getShareUrl();
    const text = `Check out this product: ${productName}`;

    switch (platform) {
      case "twitter":
        window.open(
          `https://twitter.com/intent/tweet?url=${encodeURIComponent(
            url
          )}&text=${encodeURIComponent(text)}`,
          "_blank"
        );
        break;
      case "facebook":
        window.open(
          `https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(
            url
          )}`,
          "_blank"
        );
        break;
      case "whatsapp":
        window.open(
          `https://wa.me/?text=${encodeURIComponent(text + " " + url)}`,
          "_blank"
        );
        break;
      default:
        // Use Web Share API if available
        if (navigator.share) {
          try {
            await navigator.share({
              title: productName,
              text: text,
              url: url,
            });
          } catch (error) {
            console.error("Error sharing:", error);
          }
        } else {
          handleCopyLink();
        }
    }
  };

  return (
    <>
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Button variant="outline" size="sm" className="gap-2">
            <Share2 className="h-4 w-4" />
            Share
          </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent align="end">
          <DropdownMenuItem onClick={() => handleShare("twitter")}>
            Twitter
          </DropdownMenuItem>
          <DropdownMenuItem onClick={() => handleShare("facebook")}>
            Facebook
          </DropdownMenuItem>
          <DropdownMenuItem onClick={() => handleShare("whatsapp")}>
            WhatsApp
          </DropdownMenuItem>
          <DropdownMenuItem onClick={handleCopyLink}>
            {copied ? "Copied!" : "Copy link"}
          </DropdownMenuItem>
          <DropdownMenuItem onClick={() => setOpen(true)}>
            Preview shared link
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>

      <Dialog open={open} onOpenChange={setOpen}>
        <DialogContent className="sm:max-w-md">
          <DialogHeader>
            <DialogTitle>Share Preview</DialogTitle>
          </DialogHeader>
          <div className="space-y-4">
            <p className="text-sm text-muted-foreground">
              This is how your shared link will appear on social media:
            </p>

            <div className="border rounded-lg overflow-hidden">
              <img
                src={getOgImageUrl() || "/placeholder.svg"}
                alt={`Open Graph preview for ${productName}`}
                className="w-full"
              />
              <div className="p-3">
                <div className="text-sm text-muted-foreground">
                  {process.env.NEXT_PUBLIC_SITE_NAME || "yourstore.com"}
                </div>
                <div className="font-medium">{productName}</div>
                {productDescription && (
                  <div className="text-sm text-muted-foreground line-clamp-2">
                    {productDescription}
                  </div>
                )}
              </div>
            </div>

            <div className="flex justify-between">
              <Button
                variant="outline"
                size="sm"
                onClick={() => setOpen(false)}
              >
                Close
              </Button>
              <Button size="sm" onClick={handleCopyLink}>
                {copied ? "Copied!" : "Copy link"}
              </Button>
            </div>
          </div>
        </DialogContent>
      </Dialog>
    </>
  );
}
