





"use client"

import { useState } from "react"
import { Star } from "lucide-react"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Textarea } from "@/components/ui/textarea"
import { Label } from "@/components/ui/label"
import { Button } from "@/components/ui/button"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog"
import { successToast, errorToast } from "@/components/ui/use-toast-advanced"
import { mutate } from "swr"

interface WriteReviewModalProps {
  open: boolean
  onOpenChange: (open: boolean) => void
  productId: string
  productName: string
  existingReview?: {
    rating: number
    review: string
  } | null
}

const reviewTemplates = [
  {
    id: "template-1",
    title: "Great Quality Product",
    text: "This product exceeded my expectations! The quality is outstanding and it arrived exactly as described on Pluggn.",
  },
  
  {
    id: "template-2",
    title: "Solid Purchase",
    text: "This product met my expectations. Good build quality and exactly what was advertised on the Pluggn marketplace. Shipping was reasonable and the item arrived in perfect condition.",
  },
 
  
]

export function WriteReviewModal({
  open,
  onOpenChange,
  productId,
  productName,
  existingReview,
}: WriteReviewModalProps) {
  const [rating, setRating] = useState<number>(5)
  const [reviewText, setReviewText] = useState<string>("")
  const [selectedTemplate, setSelectedTemplate] = useState<string | undefined>(undefined)
  const [isSubmitting, setIsSubmitting] = useState<boolean>(false)
  const [isDeleting, setIsDeleting] = useState<boolean>(false)

 

  const handleTemplateSelect = (templateId: string) => {
    const template = reviewTemplates.find((t) => t.id === templateId)
    if (template) {
      setReviewText(template.text)
      setSelectedTemplate(templateId)
    }
  }

  const handleSubmit = async () => {
    if (rating === 0) {
      errorToast("Please provide a rating before submitting.")
      return
    }

    setIsSubmitting(true)
    try {
      const response = await fetch("/api/plug/products/review", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          productId,
          rating,
          review: reviewText,
        }),
      })

      if (!response.ok) {
        throw new Error("Failed to submit review")
      }

      successToast("Review submitted successfully")
      mutate("/api/plug/products/")
      onOpenChange(false)
    } catch (error) {
      errorToast("Failed to submit review. Please try again later.")
      console.error("Error submitting review:", error)
    } finally {
      setIsSubmitting(false)
    }
  }

  const handleDelete = async () => {
    setIsDeleting(true)
    try {
      const response = await fetch(`/api/plug/products/review/${productId}`, {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
        },
        
      })

      if (!response.ok) {
        throw new Error("Failed to delete review")
      }

      successToast("Review deleted successfully")
      mutate("/api/plug/products/");
      onOpenChange(false)
    } catch (error) {
      errorToast("Failed to delete review. Please try again later.")
      console.error("Error deleting review:", error)
    } finally {
      setIsDeleting(false)
    }
  }

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>Write a Review</DialogTitle>
          <DialogDescription>Share your thoughts about {productName}.</DialogDescription>
        </DialogHeader>
        {existingReview ? (
          // Show existing review
          <div className="space-y-4 py-2">
            <div className="space-y-2">
              <Label>Your Current Rating</Label>
              <div className="flex items-center gap-1">
                {[1, 2, 3, 4, 5].map((value) => (
                  <Star
                    key={value}
                    className={`h-6 w-6 ${value <= existingReview.rating ? "fill-yellow-400 text-yellow-400" : "text-gray-300"}`}
                  />
                ))}
              </div>
            </div>

            <div className="space-y-2">
              <Label>Your Review</Label>
              <div className="p-3 bg-muted rounded-md min-h-[150px]">
                <p className="text-sm break-all">{existingReview.review}</p>
              </div>
            </div>

            <div className="text-xs text-muted-foreground">
              <p>You have already reviewed this product. You can delete your review if you want to remove it.</p>
            </div>
          </div>
        ) : (
          // Show write review form (existing content)
          <div className="space-y-4 py-2">
            <div className="space-y-2">
              <Label htmlFor="rating">Rating</Label>
              <div className="flex items-center gap-1">
                {[1, 2, 3, 4, 5].map((value) => (
                  <button key={value} type="button" onClick={() => setRating(value)} className="focus:outline-none">
                    <Star
                      className={`h-6 w-6 ${value <= rating ? "fill-yellow-400 text-yellow-400" : "text-gray-300"}`}
                    />
                  </button>
                ))}
              </div>
            </div>

            <Tabs defaultValue="write" className="w-full">
              <TabsList className="grid w-full grid-cols-2">
                <TabsTrigger value="write">Write Review</TabsTrigger>
                <TabsTrigger value="templates">Use Template</TabsTrigger>
              </TabsList>
              <TabsContent value="write" className="space-y-2">
                <Label htmlFor="review">Your Review</Label>
                <Textarea
                  id="review"
                  placeholder="Share your experience with this product..."
                  value={reviewText}
                  onChange={(e) => setReviewText(e.target.value)}
                  className="min-h-[150px]"
                />
              </TabsContent>
              <TabsContent value="templates" className="space-y-4">
                <Label>Select a template to start with</Label>
                <RadioGroup value={selectedTemplate} onValueChange={handleTemplateSelect}>
                  {reviewTemplates.map((template) => (
                    <div key={template.id} className="flex items-start space-x-2 border p-3 rounded-md">
                      <RadioGroupItem value={template.id} id={template.id} className="mt-1" />
                      <div className="space-y-1">
                        <Label htmlFor={template.id} className="font-medium cursor-pointer">
                          {template.title}
                        </Label>
                        <p className="text-sm text-muted-foreground">{template.text.substring(0, 100)}...</p>
                      </div>
                    </div>
                  ))}
                </RadioGroup>
              </TabsContent>
            </Tabs>

            <div className="text-xs text-muted-foreground">
              <p>Tips for a helpful review:</p>
              <ul className="list-disc pl-4 space-y-1 mt-1">
                <li>Mention specific features you liked or disliked</li>
                <li>Comment on the quality, durability, and value for money</li>
                <li>Keep it concise and honest</li>
              </ul>
            </div>
          </div>
        )}
        <DialogFooter>
          <Button variant="outline" onClick={() => onOpenChange(false)} disabled={isSubmitting || isDeleting}>
            Cancel
          </Button>
          {existingReview ? (
            <Button variant="destructive" onClick={handleDelete} disabled={isDeleting}>
              {isDeleting ? "Deleting..." : "Delete Review"}
            </Button>
          ) : (
            <Button onClick={handleSubmit} disabled={isSubmitting}>
              {isSubmitting ? "Submitting..." : "Submit Review"}
            </Button>
          )}
        </DialogFooter>
      </DialogContent>
    </Dialog>
  )
}
