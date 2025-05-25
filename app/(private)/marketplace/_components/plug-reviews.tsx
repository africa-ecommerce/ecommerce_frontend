"use client";

import { useState, useMemo } from "react";
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
  businessName: string;
  rating: number;
  review: string;
  createdAt: string;
  plugId: string;
  updatedAt: string;
}

interface PlugReviewsProps {
  reviews: Review[];
  className?: string;
}

export function PlugReviews({ reviews, className }: PlugReviewsProps) {
  const [expandedReviews, setExpandedReviews] = useState<string[]>([]);
  const [helpfulReviews, setHelpfulReviews] = useState<string[]>([]);
  const [showAllReviews, setShowAllReviews] = useState(false);

  // Calculate overall rating and distribution from reviews
  const { overallRating, totalReviews, ratingDistribution } = useMemo(() => {
    if (!reviews || reviews.length === 0) {
      return {
        overallRating: 0,
        totalReviews: 0,
        ratingDistribution: { 1: 0, 2: 0, 3: 0, 4: 0, 5: 0 },
      };
    }

    const total = reviews.length;
    const sum = reviews.reduce((acc, review) => acc + review.rating, 0);
    const average = sum / total;

    const distribution = reviews.reduce(
      (acc, review) => {
        acc[review.rating as keyof typeof acc]++;
        return acc;
      },
      { 1: 0, 2: 0, 3: 0, 4: 0, 5: 0 }
    );

    return {
      overallRating: average,
      totalReviews: total,
      ratingDistribution: distribution,
    };
  }, [reviews]);

  const visibleReviews = showAllReviews ? reviews : reviews.slice(0, 2);

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
    return totalReviews > 0 ? (count / totalReviews) * 100 : 0;
  };

  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleDateString("en-US", {
      year: "numeric",
      month: "short",
      day: "numeric",
    });
  };

  const capitalizeText = (text: string) => {
    if (!text) return "";
    return text.charAt(0).toUpperCase() + text.slice(1).toLowerCase();
  };

  const formatBusinessName = (name: string) => {
    if (!name) return "Anonymous";
    return name
      .split(" ")
      .map((word) => word.charAt(0).toUpperCase() + word.slice(1).toLowerCase())
      .join(" ");
  };

  // If no reviews, show empty state
  if (!reviews || reviews.length === 0) {
    return (
      <div className={cn("space-y-6 px-4 sm:px-0", className)}>
        <h3 className="text-xl font-semibold">Customer Reviews</h3>
        <div className="text-center py-12">
          <MessageSquare className="h-12 w-12 text-muted-foreground mx-auto mb-4" />
          <h4 className="text-lg font-medium mb-2">No reviews yet</h4>
          <p className="text-muted-foreground">
            Be the first to share your experience with this product.
          </p>
        </div>
      </div>
    );
  }

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

          {/* Rating distribution */}
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

        {/* Review highlights */}
        <div className="space-y-3">
          <h4 className="font-medium">Review Summary</h4>
          <div className="space-y-2">
            <div className="rounded-lg bg-muted p-3">
              <div className="flex items-center gap-1 mb-1">
                <MessageSquare className="h-3.5 w-3.5 text-primary" />
                <span className="text-sm font-medium">Average Rating</span>
              </div>
              <p className="text-sm text-muted-foreground">
                {overallRating >= 4.5
                  ? "Excellent customer satisfaction"
                  : overallRating >= 4.0
                  ? "Very good customer satisfaction"
                  : overallRating >= 3.0
                  ? "Good customer satisfaction"
                  : "Mixed customer feedback"}
              </p>
            </div>
            <div className="rounded-lg bg-muted p-3">
              <div className="flex items-center gap-1 mb-1">
                <Star className="h-3.5 w-3.5 text-primary" />
                <span className="text-sm font-medium">Most Common Rating</span>
              </div>
              <p className="text-sm text-muted-foreground">
                {(() => {
                  const entries = Object.entries(ratingDistribution) as [
                    string,
                    number
                  ][];
                  const mostCommon = entries.reduce((a, b) =>
                    ratingDistribution[
                      parseInt(a[0]) as keyof typeof ratingDistribution
                    ] >
                    ratingDistribution[
                      parseInt(b[0]) as keyof typeof ratingDistribution
                    ]
                      ? a
                      : b
                  );
                  return `${mostCommon[0]} stars`;
                })()}
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Individual reviews */}
      <div className="space-y-4">
        {visibleReviews.map((review) => (
          <div
            key={review.id}
            className="border rounded-lg p-4 space-y-3 bg-card"
          >
            <div className="flex flex-col sm:flex-row sm:items-start justify-between gap-3">
              <div className="flex items-center gap-3">
                <Avatar className="h-10 w-10">
                  <AvatarFallback className="bg-primary/10 text-primary font-semibold">
                    {formatBusinessName(review.businessName).charAt(0)}
                  </AvatarFallback>
                </Avatar>
                <div className="flex-1">
                  <div className="flex flex-col sm:flex-row sm:items-center gap-1 sm:gap-2">
                    <span className="font-medium text-sm sm:text-base">
                      {formatBusinessName(review.businessName)}
                    </span>
                   
                  </div>
                  <div className="text-xs text-muted-foreground">
                    {formatDate(review.createdAt)}
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
                  "text-sm leading-relaxed whitespace-pre-wrap break-words",
                  review.review.length > 300 &&
                    !expandedReviews.includes(review.id) &&
                    "line-clamp-4"
                )}
              >
                {capitalizeText(review.review)}
              </p>
              {review.review.length > 300 && (
                <Button
                  variant="link"
                  className="h-auto p-0 text-xs mt-2"
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

            <div className="flex items-center justify-between pt-2 border-t">
              <Button
                variant="ghost"
                size="sm"
                className="text-xs flex items-center gap-1 h-8 px-2"
                onClick={() => markAsHelpful(review.id)}
                disabled={helpfulReviews.includes(review.id)}
              >
                <ThumbsUp
                  className={cn(
                    "h-3.5 w-3.5",
                    helpfulReviews.includes(review.id) &&
                      "fill-primary text-primary"
                  )}
                />
                <span>
                  {helpfulReviews.includes(review.id)
                    ? "Marked helpful"
                    : "Helpful"}
                </span>
              </Button>
              <span className="text-xs text-muted-foreground">
                {review.rating === 5
                  ? "⭐ Excellent"
                  : review.rating === 4
                  ? "👍 Good"
                  : review.rating === 3
                  ? "👌 Average"
                  : review.rating === 2
                  ? "👎 Poor"
                  : "❌ Very Poor"}
              </span>
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
