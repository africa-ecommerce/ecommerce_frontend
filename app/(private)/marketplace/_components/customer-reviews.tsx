"use client";

import { useState } from "react";
import {
  Star,
  ThumbsUp,
  MessageSquare,
  ChevronDown,
  ChevronUp,
} from "lucide-react";

import { Button } from "@/components/ui/button";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Progress } from "@/components/ui/progress";
import { cn } from "@/lib/utils";

interface Review {
  id: string;
  author: {
    name: string;
    avatar?: string;
    location?: string;
  };
  rating: number;
  date: string;
  content: string;
  helpful: number;
  images?: string[];
  verified: boolean;
}

interface CustomerReviewsProps {
  overallRating: number;
  totalReviews: number;
  ratingDistribution: {
    5: number;
    4: number;
    3: number;
    2: number;
    1: number;
  };
  reviews: Review[];
  className?: string;
}

export function CustomerReviews({
  overallRating,
  totalReviews,
  ratingDistribution,
  reviews,
  className,
}: CustomerReviewsProps) {
  const [expandedReviews, setExpandedReviews] = useState<string[]>([]);
  const [helpfulReviews, setHelpfulReviews] = useState<string[]>([]);
  const [showAllReviews, setShowAllReviews] = useState(false);

  const visibleReviews = showAllReviews ? reviews : reviews.slice(0, 2); // Show only 2 reviews initially on mobile

  const toggleReviewExpansion = (reviewId: string) => {
    setExpandedReviews((prev) =>
      prev.includes(reviewId)
        ? prev.filter((id) => id !== reviewId)
        : [...prev, reviewId]
    );
  };

  const markAsHelpful = (reviewId: string) => {
    if (helpfulReviews.includes(reviewId)) return;
    setHelpfulReviews((prev) => [...prev, reviewId]);
  };

  const calculatePercentage = (count: number) => {
    return (count / totalReviews) * 100;
  };

  return (
    <div className={cn("space-y-6 px-4 sm:px-0", className)}>
      <h3 className="text-xl font-semibold">Customer Reviews</h3>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Overall rating */}
        <div className="space-y-4">
          <div className="flex items-center gap-3">
            <span className="text-3xl font-bold">
              {overallRating.toFixed(1)}
            </span>
            <div className="flex flex-col">
              <div className="flex">
                {Array(5)
                  .fill(0)
                  .map((_, i) => (
                    <Star
                      key={i}
                      className={cn(
                        "h-4 w-4",
                        i < Math.floor(overallRating)
                          ? "fill-yellow-400 text-yellow-400"
                          : i < Math.ceil(overallRating) &&
                            overallRating % 1 !== 0
                          ? "fill-yellow-400/50 text-yellow-400"
                          : "text-muted stroke-muted-foreground"
                      )}
                    />
                  ))}
              </div>
              <span className="text-sm text-muted-foreground">
                Based on {totalReviews} review{totalReviews !== 1 ? "s" : ""}
              </span>
            </div>
          </div>

          {/* Rating distribution - optimized for mobile */}
          <div className="space-y-2">
            {[5, 4, 3, 2, 1].map((rating) => (
              <div key={rating} className="flex items-center gap-2">
                <div className="flex items-center gap-1 w-8 sm:w-10">
                  <span className="text-xs sm:text-sm">{rating}</span>
                  <Star className="h-3 w-3 fill-yellow-400 text-yellow-400" />
                </div>
                <Progress
                  value={calculatePercentage(
                    ratingDistribution[
                      rating as keyof typeof ratingDistribution
                    ]
                  )}
                  className="h-2 flex-1"
                />
                <span className="text-xs text-muted-foreground w-10 sm:w-12 text-right">
                  {
                    ratingDistribution[
                      rating as keyof typeof ratingDistribution
                    ]
                  }
                </span>
              </div>
            ))}
          </div>
        </div>

        {/* Review highlights - stacked on mobile */}
        <div className="space-y-3">
          <h4 className="font-medium">What customers say</h4>
          <div className="space-y-2">
            <div className="rounded-lg bg-muted p-3">
              <div className="flex items-center gap-1 mb-1">
                <MessageSquare className="h-3.5 w-3.5 text-primary" />
                <span className="text-sm font-medium">Product Quality</span>
              </div>
              <p className="text-sm text-muted-foreground">
                95% mention excellent quality
              </p>
            </div>
            <div className="rounded-lg bg-muted p-3">
              <div className="flex items-center gap-1 mb-1">
                <MessageSquare className="h-3.5 w-3.5 text-primary" />
                <span className="text-sm font-medium">Fast Shipping</span>
              </div>
              <p className="text-sm text-muted-foreground">
                Quick delivery and good packaging
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Individual reviews - optimized for mobile */}
      <div className="space-y-4">
        {visibleReviews.map((review) => (
          <div key={review.id} className="border rounded-lg p-4 space-y-3">
            <div className="flex flex-col sm:flex-row sm:items-start justify-between gap-3">
              <div className="flex items-center gap-3">
                <Avatar className="h-10 w-10">
                  <AvatarImage
                    src={review.author.avatar || "/placeholder.svg"}
                    alt={review.author.name}
                  />
                  <AvatarFallback>
                    {review.author.name.charAt(0)}
                  </AvatarFallback>
                </Avatar>
                <div className="flex-1">
                  <div className="flex flex-col sm:flex-row sm:items-center gap-1 sm:gap-2">
                    <span className="font-medium text-sm sm:text-base">
                      {review.author.name}
                    </span>
                    {review.verified && (
                      <span className="text-xs bg-green-100 text-green-700 px-1.5 py-0.5 rounded-full self-start sm:self-center">
                        Verified
                      </span>
                    )}
                  </div>
                  <div className="flex flex-wrap items-center gap-x-2 text-xs text-muted-foreground">
                    <span>{review.date}</span>
                    {review.author.location && (
                      <>
                        <span className="hidden sm:inline">•</span>
                        <span>{review.author.location}</span>
                      </>
                    )}
                  </div>
                </div>
              </div>
              <div className="flex sm:self-start sm:pt-1">
                {Array(5)
                  .fill(0)
                  .map((_, i) => (
                    <Star
                      key={i}
                      className={cn(
                        "h-3.5 w-3.5",
                        i < review.rating
                          ? "fill-yellow-400 text-yellow-400"
                          : "text-muted stroke-muted-foreground"
                      )}
                    />
                  ))}
              </div>
            </div>

            <div>
              <p
                className={cn(
                  "text-sm",
                  review.content.length > 200 &&
                    !expandedReviews.includes(review.id) &&
                    "line-clamp-3"
                )}
              >
                {review.content}
              </p>
              {review.content.length > 200 && (
                <Button
                  variant="link"
                  className="h-auto p-0 text-xs"
                  onClick={() => toggleReviewExpansion(review.id)}
                >
                  {expandedReviews.includes(review.id) ? (
                    <>
                      <ChevronUp className="h-3 w-3 mr-1" />
                      Show less
                    </>
                  ) : (
                    <>
                      <ChevronDown className="h-3 w-3 mr-1" />
                      Read more
                    </>
                  )}
                </Button>
              )}
            </div>

            {review.images && review.images.length > 0 && (
              <div className="flex gap-2 overflow-x-auto pb-2 -mx-1 px-1">
                {review.images.map((image, index) => (
                  <img
                    key={index}
                    src={image || "/placeholder.svg"}
                    alt={`Review image ${index + 1}`}
                    className="h-16 w-16 flex-shrink-0 object-cover rounded-md"
                    loading="lazy"
                  />
                ))}
              </div>
            )}

            <div className="flex items-center justify-between pt-1">
              <Button
                variant="ghost"
                size="sm"
                className="text-xs flex items-center gap-1 h-8 px-2"
                onClick={() => markAsHelpful(review.id)}
                disabled={helpfulReviews.includes(review.id)}
              >
                <ThumbsUp className="h-3.5 w-3.5" />
                <span>
                  {helpfulReviews.includes(review.id)
                    ? "Helpful"
                    : `Helpful (${review.helpful})`}
                </span>
              </Button>
            </div>
          </div>
        ))}

        {reviews.length > 2 && (
          <Button
            variant="outline"
            className="w-full"
            onClick={() => setShowAllReviews(!showAllReviews)}
          >
            {showAllReviews ? (
              <>
                <ChevronUp className="mr-2 h-4 w-4" />
                Show fewer reviews
              </>
            ) : (
              <>
                <ChevronDown className="mr-2 h-4 w-4" />
                Show all {reviews.length} reviews
              </>
            )}
          </Button>
        )}
      </div>
    </div>
  );
}
