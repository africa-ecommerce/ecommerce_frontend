"use client"

import { useState } from "react"
import { Check, Copy, ImageIcon, Instagram, Share2, Sparkles, X } from "lucide-react"

import { Button } from "@/components/ui/button"
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Textarea } from "@/components/ui/textarea"
import { Badge } from "@/components/ui/badge"
import { cn } from "@/lib/utils"

interface Product {
  id: string
  name: string
  description: string
  category: string
  supplierPrice: number
  recommendedPrice: number
  profit: number
  profitMargin: number
  rating: number
  reviews: number
  sales: number
  marketFitScore: number
  trending: boolean
  stock: number
  images: string[]
  supplier: {
    id: string
    name: string
    rating: number
    fulfillmentRate: number
    responseTime: string
    image: string
    location: string
    joinedDate: string
    productsCount: number
  }
  plugsCount: number
  deliveryTime: string
  features: string[]
  ingredients: string[]
}

interface ProductStoryDialogProps {
  open: boolean
  onOpenChange: (open: boolean) => void
  product: Product
}

export function ProductStoryDialog({ open, onOpenChange, product }: ProductStoryDialogProps) {
  const [selectedTemplate, setSelectedTemplate] = useState<string | null>(null)
  const [customText, setCustomText] = useState("")
  const [copied, setCopied] = useState(false)
  const [activeTab, setActiveTab] = useState("templates")

  // Story templates
  const templates = [
    {
      id: "benefits",
      name: "Benefits Focus",
      content: `✨ NEW ARRIVAL ✨

${product.name} is here to transform your routine!

🌟 Key benefits:
${product.features
  .slice(0, 3)
  .map((feature) => `- ${feature}`)
  .join("\n")}

💰 Only ₦${product.recommendedPrice.toLocaleString()}

Limited stock available - tap to shop now!
#SelfCare #AfricanBeauty`,
      icon: <Sparkles className="h-5 w-5" />,
      hashtags: ["#SelfCare", "#AfricanBeauty", "#NewArrival"],
    },
    {
      id: "natural",
      name: "Natural Ingredients",
      content: `🌿 100% NATURAL INGREDIENTS 🌿

Introducing our ${product.name}!

Made with love using:
${product.ingredients.map((ingredient) => `- ${ingredient}`).join("\n")}

No harmful chemicals, just pure goodness for your skin.

💚 ₦${product.recommendedPrice.toLocaleString()} 💚

Tap to add this to your self-care routine!
#NaturalBeauty #CleanBeauty`,
      icon: <ImageIcon className="h-5 w-5" />,
      hashtags: ["#NaturalBeauty", "#CleanBeauty", "#Organic"],
    },
    {
      id: "testimonial",
      name: "Customer Testimonial",
      content: `⭐⭐⭐⭐⭐ CUSTOMER LOVE ⭐⭐⭐⭐⭐

"This ${product.name} changed my life! My skin has never looked better!" - Sarah K.

Join the ${product.sales.toLocaleString()}+ happy customers who've made this their holy grail product!

🛍️ ₦${product.recommendedPrice.toLocaleString()}

Limited restock just arrived - tap to secure yours!
#RealResults #CustomerReviews`,
      icon: <Instagram className="h-5 w-5" />,
      hashtags: ["#RealResults", "#CustomerReviews", "#Bestseller"],
    },
  ]

  const handleCopyText = () => {
    const textToCopy = selectedTemplate 
      ? templates.find((t) => t.id === selectedTemplate)?.content || "" 
      : customText

    navigator.clipboard.writeText(textToCopy)
    setCopied(true)
    setTimeout(() => setCopied(false), 2000)
  }

  const handleShareStory = () => {
    const textToShare = selectedTemplate 
      ? templates.find((t) => t.id === selectedTemplate)?.content || "" 
      : customText

    if (navigator.share) {
      navigator.share({
        title: `Check out ${product.name}`,
        text: textToShare,
      }).catch(console.error)
    } else {
      handleCopyText()
    }
  }

  const handleTemplateSelect = (templateId: string) => {
    setSelectedTemplate(templateId)
    setActiveTab("templates")
  }

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-md w-[calc(100%-2rem)] sm:w-full">
        <DialogHeader>
          <DialogTitle className="text-lg sm:text-xl">Create Product Story</DialogTitle>
        </DialogHeader>

        <Tabs 
          value={activeTab} 
          onValueChange={setActiveTab}
          className="mt-4"
        >
          <TabsList className="grid w-full grid-cols-2">
            <TabsTrigger value="templates" className="text-xs sm:text-sm">
              Templates
            </TabsTrigger>
            <TabsTrigger value="custom" className="text-xs sm:text-sm">
              Custom
            </TabsTrigger>
          </TabsList>
          
          <TabsContent value="templates" className="mt-4 space-y-4">
            <div className="grid grid-cols-1 gap-3">
              {templates.map((template) => (
                <button
                  key={template.id}
                  className={cn(
                    "flex items-start gap-3 rounded-lg border p-3 text-left",
                    "hover:bg-muted/50 transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary",
                    selectedTemplate === template.id && "border-primary bg-primary/5",
                  )}
                  onClick={() => handleTemplateSelect(template.id)}
                  aria-label={`Select ${template.name} template`}
                >
                  <div className="rounded-full bg-muted p-2 flex-shrink-0">
                    {template.icon}
                  </div>
                  <div className="flex-1 min-w-0">
                    <div className="font-medium text-sm sm:text-base">{template.name}</div>
                    <div className="text-xs text-muted-foreground line-clamp-2 mt-1">
                      {template.content.split("\n")[0]}...
                    </div>
                    <div className="flex flex-wrap gap-1 mt-2">
                      {template.hashtags.slice(0, 2).map((hashtag) => (
                        <Badge 
                          key={hashtag} 
                          variant="secondary" 
                          className="text-xs px-1.5 py-0.5"
                        >
                          {hashtag}
                        </Badge>
                      ))}
                    </div>
                  </div>
                  {selectedTemplate === template.id && (
                    <Check className="h-4 w-4 text-primary mt-1 flex-shrink-0" />
                  )}
                </button>
              ))}
            </div>

            {selectedTemplate && (
              <div className="rounded-lg border p-4 mt-4 bg-muted/50">
                <div className="text-sm font-medium mb-2">Preview</div>
                <div className="text-sm whitespace-pre-line bg-background p-3 rounded">
                  {templates.find((t) => t.id === selectedTemplate)?.content}
                </div>
              </div>
            )}
          </TabsContent>
          
          <TabsContent value="custom" className="mt-4 space-y-4">
            <Textarea
              placeholder={`Write your custom story about ${product.name}...\n\nPro tip: Include emojis, hashtags, and a clear call-to-action!`}
              className="min-h-[200px] text-sm sm:text-base"
              value={customText}
              onChange={(e) => setCustomText(e.target.value)}
            />
            <div className="text-xs text-muted-foreground">
              Need inspiration? Try these hashtags:{" "}
              {templates[0].hashtags.concat(templates[1].hashtags, templates[2].hashtags)
                .filter((v, i, a) => a.indexOf(v) === i)
                .slice(0, 5)
                .join(", ")}
            </div>
          </TabsContent>
        </Tabs>

        <div className="flex flex-col sm:flex-row items-center justify-between gap-3 mt-6">
          <Button 
            variant="outline" 
            className="w-full sm:w-auto" 
            onClick={() => onOpenChange(false)}
          >
            <X className="mr-2 h-4 w-4" /> Cancel
          </Button>
          <div className="flex items-center gap-2 w-full sm:w-auto">
            <Button 
              variant="outline" 
              className="flex-1 sm:w-auto" 
              onClick={handleCopyText}
              disabled={!selectedTemplate && !customText}
            >
              {copied ? (
                <>
                  <Check className="mr-2 h-4 w-4" /> Copied!
                </>
              ) : (
                <>
                  <Copy className="mr-2 h-4 w-4" /> Copy
                </>
              )}
            </Button>
            <Button 
              className="flex-1 sm:w-auto" 
              onClick={handleShareStory}
              disabled={!selectedTemplate && !customText}
            >
              <Share2 className="mr-2 h-4 w-4" /> Share
            </Button>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  )
}