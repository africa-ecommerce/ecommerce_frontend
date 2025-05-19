"use client";

import { useState, useMemo } from "react";
import Image from "next/image";
import { Minus, Plus } from "lucide-react";
import { useRouter } from "next/navigation";
import useSWR from "swr"; // Make sure to import useSWR

import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";

// Define the Product interface to fix TypeScript errors
interface Product {
  id: string;
  name: string;
  price: number;
  description?: string;
  images?: string[];
  inStock: boolean;
  size?: string;
  color?: string;
  seller?: string;
  features?: string[];
}

interface SingleProductCartProps {
  productId?: string;
  referralId?: string;
  platform?: string;
}

export const SingleProductCart = ({
  productId,
  referralId,
  platform,
}: SingleProductCartProps) => {
  const [quantity, setQuantity] = useState(1);
  const router = useRouter();

  // Use SWR directly in the component
  const { data, error, isLoading } = useSWR(
    productId
      ? `/public/products/${productId}${referralId ? `/${referralId}` : ""}`
      : null,
    async (url) => {
      const response = await fetch(
        `${process.env.NEXT_PUBLIC_BACKEND_URL}${url}`,
        {
          method: "GET",
          headers: { "Content-Type": "application/json" },
        }
      );

      if (!response.ok) {
        throw new Error(`API error: ${response.status}`);
      }

      return response.json();
    },
    {
      revalidateOnFocus: false,
      revalidateIfStale: false,
      dedupingInterval: 60000, // 1 minute
    }
  );

  // Extract product data from the response
  const productData: Product | null = data?.data || null;

  console.log("productData", productData);

  const updateQuantity = (change: number) => {
    setQuantity(Math.max(1, quantity + change));
  };

  // Calculate pricing information with useMemo to prevent unnecessary recalculations
  const pricing = useMemo(() => {
    if (!productData) {
      return { subtotal: 0, deliveryFee: 1500, total: 1500 };
    }

    const subtotal = productData.price * quantity;
    const deliveryFee = 1500;
    const total = subtotal + deliveryFee;

    return { subtotal, deliveryFee, total };
  }, [productData, quantity]);

  const handleCheckout = () => {
    // Build the checkout URL with tracking parameters
    let checkoutUrl = `/checkout?pid=${productId}`;

    // Add referral info if available
    if (referralId) {
      checkoutUrl += `&ref=${referralId}`;
    }

    // Add platform info if available
    if (platform) {
      checkoutUrl += `&platform=${platform}`;
    }

    // Navigate to checkout page with tracking parameters
    router.push(checkoutUrl);
  };

  // Format price in Naira
  const formatPrice = (price: number) => {
    return `₦${price?.toLocaleString()}`;
  };

  if (isLoading) {
    return (
      <div className="container mx-auto px-4 py-8">
        <h1 className="text-2xl font-bold mb-6">Product Details</h1>
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          <div className="lg:col-span-2">
            <Card>
              <CardContent className="p-6">
                <div className="flex flex-col md:flex-row gap-6">
                  {/* Product Image Skeleton */}
                  <div className="flex-shrink-0 relative w-full md:w-1/2 aspect-square rounded-md overflow-hidden bg-muted animate-pulse"></div>

                  {/* Product Details Skeleton */}
                  <div className="flex-1 space-y-4">
                    <div className="h-8 bg-muted rounded-md w-3/4 animate-pulse"></div>
                    <div className="flex space-x-4">
                      <div className="h-4 bg-muted rounded-md w-20 animate-pulse"></div>
                      <div className="h-4 bg-muted rounded-md w-20 animate-pulse"></div>
                    </div>
                    <div className="h-6 bg-muted rounded-md w-24 animate-pulse"></div>
                    <div className="space-y-2">
                      <div className="h-4 bg-muted rounded-md w-full animate-pulse"></div>
                      <div className="h-4 bg-muted rounded-md w-full animate-pulse"></div>
                      <div className="h-4 bg-muted rounded-md w-3/4 animate-pulse"></div>
                    </div>
                    <div className="h-10 bg-muted rounded-md w-40 animate-pulse"></div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Order Summary Skeleton */}
          <div className="lg:col-span-1">
            <div className="sticky top-20">
              <Card>
                <CardContent className="p-6 space-y-6">
                  <div className="h-6 bg-muted rounded-md w-1/2 animate-pulse"></div>
                  <div className="space-y-4">
                    {[1, 2, 3, 4, 5].map((i) => (
                      <div key={i} className="flex justify-between">
                        <div className="h-4 bg-muted rounded-md w-24 animate-pulse"></div>
                        <div className="h-4 bg-muted rounded-md w-16 animate-pulse"></div>
                      </div>
                    ))}
                  </div>
                  <div className="h-10 bg-muted rounded-md w-full animate-pulse"></div>
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      </div>
    );
  }

  if (error || !productData) {
    return (
      <div className="container mx-auto px-4 py-8 flex flex-col items-center justify-center min-h-[50vh]">
        <div className="text-center max-w-md">
          <div className="mb-6 text-muted-foreground">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="64"
              height="64"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
              className="mx-auto"
            >
              <circle cx="12" cy="12" r="10" />
              <line x1="12" y1="8" x2="12" y2="12" />
              <line x1="12" y1="16" x2="12.01" y2="16" />
            </svg>
          </div>
          <h2 className="text-2xl font-bold mb-3">Product Not Found</h2>
          <p className="text-muted-foreground mb-6">
            We couldn't find the product you're looking for. It may have been
            removed or is temporarily unavailable.
          </p>
          <Button onClick={() => router.push("/")} className="mx-auto">
            Return to Home
          </Button>
        </div>
      </div>
    );
  }


  return (
    <div className="flex flex-col min-h-screen pb-16 md:pb-0">
      <div className="container mx-auto px-4 py-4 md:py-8">
        <h1 className="text-2xl font-bold mb-6">Product Details</h1>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          <div className="lg:col-span-2">
            <Card>
              <CardContent className="p-6">
                <div className="flex flex-col md:flex-row gap-6">
                  {/* Product Image */}
                  <div className="flex-shrink-0 relative w-full md:w-1/2 aspect-square rounded-md overflow-hidden">
                    <Image
                      src={productData.images?.[0] || "/placeholder.svg"}
                      alt={productData.name || "Product image"}
                      fill
                      className="object-cover"
                      priority
                    />
                  </div>

                  {/* Product Details */}
                  <div className="flex-1">
                    <h2 className="text-xl md:text-2xl font-bold mb-2">
                      {productData.name}
                    </h2>
                    <div className="flex flex-wrap text-sm text-muted-foreground mb-4">
                      {productData.size && (
                        <span className="mr-4">Size: {productData.size}</span>
                      )}
                      {productData.color && (
                        <span className="mr-4">Color: {productData.color}</span>
                      )}

                      
                      {productData.seller && (
                        <span>Seller: {productData.seller}</span>
                      )}
                    </div>

                    <p className="text-xl font-semibold mb-4">
                      {formatPrice(productData.price)}
                    </p>

                    <div className="mb-6">
                      {productData.description && (
                        <p className="mb-4">{productData.description}</p>
                      )}
                      {productData.features &&
                        productData.features.length > 0 && (
                          <ul className="space-y-2">
                            {productData.features.map((feature, index) => (
                              <li key={index} className="flex items-start">
                                <span className="mr-2 text-primary">•</span>
                                <span>{feature}</span>
                              </li>
                            ))}
                          </ul>
                        )}
                    </div>

                    <div className="flex items-center space-x-4 mb-6">
                      <span className="text-sm font-medium">Quantity:</span>
                      <div className="flex items-center space-x-2">
                        <Button
                          variant="outline"
                          size="icon"
                          className="h-8 w-8 rounded-md"
                          onClick={() => updateQuantity(-1)}
                        >
                          <Minus className="h-3 w-3" />
                        </Button>
                        <span className="w-8 text-center">{quantity}</span>
                        <Button
                          variant="outline"
                          size="icon"
                          className="h-8 w-8 rounded-md"
                          onClick={() => updateQuantity(1)}
                        >
                          <Plus className="h-3 w-3" />
                        </Button>
                      </div>
                    </div>

                    <div className="flex items-center text-sm">
                      <span
                        className={
                          productData.inStock
                            ? "text-green-600"
                            : "text-red-600"
                        }
                      >
                        {productData.inStock ? "In Stock" : "Out of Stock"}
                      </span>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>

          <div className="lg:col-span-1">
            <div className="sticky top-20">
              <Card>
                <CardContent className="p-6">
                  <h3 className="font-semibold text-lg mb-4">Order Summary</h3>

                  <div className="space-y-3 mb-6">
                    <div className="flex justify-between">
                      <span className="text-muted-foreground">
                        Product Price
                      </span>
                      <span>{formatPrice(productData.price)}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-muted-foreground">Quantity</span>
                      <span>x {quantity}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-muted-foreground">Subtotal</span>
                      <span>{formatPrice(pricing.subtotal)}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-muted-foreground">
                        Delivery Fee
                      </span>
                      <span>{formatPrice(pricing.deliveryFee)}</span>
                    </div>
                    <Separator className="my-4" />
                    <div className="flex justify-between font-bold">
                      <span>Total</span>
                      <span>{formatPrice(pricing.total)}</span>
                    </div>
                  </div>

                  <Button
                    size="lg"
                    className="w-full"
                    onClick={handleCheckout}
                   
                  >
                    Proceed to Checkout
                  </Button>
                </CardContent>
              </Card>

              <Card className="mt-6">
                <CardContent className="p-6">
                  <h3 className="font-semibold mb-4">Need Help?</h3>
                  <div className="space-y-4 text-sm">
                    <div className="flex items-start">
                      <span className="mr-2">•</span>
                      <p>
                        Orders are typically delivered within 2-4 business days
                      </p>
                    </div>
                    <div className="flex items-start">
                      <span className="mr-2">•</span>
                      <p>We accept returns within 7 days of delivery</p>
                    </div>
                    <div className="text-center mt-4">
                      <Button variant="link" className="text-primary">
                        Contact Support
                      </Button>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
