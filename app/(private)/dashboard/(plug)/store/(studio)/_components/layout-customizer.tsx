// "use client"

// import { useState } from "react"
// import { Label } from "@/components/ui/label"
// import { Input } from "@/components/ui/input"
// import { Textarea } from "@/components/ui/textarea"
// import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"

// interface LayoutCustomizerProps {
//   content: Record<string, string>
//   onUpdateContent: (content: Record<string, string>) => void
// }

// export default function LayoutCustomizer({ content, onUpdateContent }: LayoutCustomizerProps) {
//   const [activeTab, setActiveTab] = useState("header")

//   const updateContent = (key: string, value: string) => {
//     onUpdateContent({ [key]: value })
//   }

//   return (
//     <div className="space-y-4">
//       <h2 className="text-lg font-semibold">Layout & Content</h2>

//       <Tabs value={activeTab} onValueChange={setActiveTab}>
//         <TabsList className="grid grid-cols-4">
//           <TabsTrigger value="header">Header</TabsTrigger>
//           <TabsTrigger value="hero">Hero</TabsTrigger>
//           <TabsTrigger value="products">Products</TabsTrigger>
//           <TabsTrigger value="footer">Footer</TabsTrigger>
//         </TabsList>

//         <TabsContent value="header" className="space-y-4 pt-4">
//           <div className="grid gap-2">
//             <Label htmlFor="header-text">Store Name</Label>
//             <Input
//               id="header-text"
//               value={content.HEADER_TEXT}
//               onChange={(e) => updateContent("HEADER_TEXT", e.target.value)}
//             />
//           </div>
//         </TabsContent>

//         <TabsContent value="hero" className="space-y-4 pt-4">
//           <div className="grid gap-2">
//             <Label htmlFor="hero-title">Hero Title</Label>
//             <Input
//               id="hero-title"
//               value={content.HERO_TITLE}
//               onChange={(e) => updateContent("HERO_TITLE", e.target.value)}
//             />
//           </div>

//           <div className="grid gap-2">
//             <Label htmlFor="hero-description">Hero Description</Label>
//             <Textarea
//               id="hero-description"
//               value={content.HERO_DESCRIPTION}
//               onChange={(e) => updateContent("HERO_DESCRIPTION", e.target.value)}
//               rows={3}
//             />
//           </div>

//           <div className="grid gap-2">
//             <Label htmlFor="hero-button">Button Text</Label>
//             <Input
//               id="hero-button"
//               value={content.HERO_BUTTON_TEXT}
//               onChange={(e) => updateContent("HERO_BUTTON_TEXT", e.target.value)}
//             />
//           </div>
//         </TabsContent>

//         <TabsContent value="products" className="space-y-4 pt-4">
//           <div className="grid gap-2">
//             <Label htmlFor="products-title">Products Section Title</Label>
//             <Input
//               id="products-title"
//               value={content.PRODUCTS_TITLE}
//               onChange={(e) => updateContent("PRODUCTS_TITLE", e.target.value)}
//             />
//           </div>

//           <div className="grid gap-2">
//             <Label htmlFor="about-title">About Section Title</Label>
//             <Input
//               id="about-title"
//               value={content.ABOUT_TITLE}
//               onChange={(e) => updateContent("ABOUT_TITLE", e.target.value)}
//             />
//           </div>

//           <div className="grid gap-2">
//             <Label htmlFor="about-text">About Section Content</Label>
//             <Textarea
//               id="about-text"
//               value={content.ABOUT_TEXT}
//               onChange={(e) => updateContent("ABOUT_TEXT", e.target.value)}
//               rows={5}
//             />
//             <p className="text-xs text-muted-foreground">HTML formatting is supported</p>
//           </div>
//         </TabsContent>

//         <TabsContent value="footer" className="space-y-4 pt-4">
//           <div className="grid gap-2">
//             <Label htmlFor="footer-logo">Footer Logo Text</Label>
//             <Input
//               id="footer-logo"
//               value={content.FOOTER_LOGO_TEXT}
//               onChange={(e) => updateContent("FOOTER_LOGO_TEXT", e.target.value)}
//             />
//           </div>

//           <div className="grid gap-2">
//             <Label htmlFor="contact-info">Contact Information</Label>
//             <Textarea
//               id="contact-info"
//               value={content.CONTACT_INFO}
//               onChange={(e) => updateContent("CONTACT_INFO", e.target.value)}
//               rows={2}
//             />
//           </div>

//           <div className="grid gap-2">
//             <Label htmlFor="copyright">Copyright Text</Label>
//             <Input
//               id="copyright"
//               value={content.COPYRIGHT_TEXT}
//               onChange={(e) => updateContent("COPYRIGHT_TEXT", e.target.value)}
//             />
//           </div>
//         </TabsContent>
//       </Tabs>
//     </div>
//   )
// }

"use client"

import type React from "react"

import { useState } from "react"
import { Label } from "@/components/ui/label"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Button } from "@/components/ui/button"
import { Upload } from "lucide-react"

interface LayoutCustomizerProps {
  content: Record<string, string>
  onUpdateContent: (content: Record<string, string>) => void
  metadata: Record<string, string>
  onUpdateMetadata: (metadata: Record<string, string>) => void
}

export default function LayoutCustomizer({ content, onUpdateContent,
  metadata,
  onUpdateMetadata,
 }: LayoutCustomizerProps) {
  const [activeTab, setActiveTab] = useState("brand")

  const updateContent = (key: string, value: string) => {
    onUpdateContent({ [key]: value })
  }

  const updateMetadata = (key: string, value: string) => {
    onUpdateMetadata({ [key]: value })
  }

  const handleLogoUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]
    if (!file) return

    // In a real app, this would upload to a server and return a URL
    // For this demo, we'll use a placeholder
    updateContent("BRAND_LOGO", "/placeholder.svg?height=40&width=120")

    // Reset the input
    e.target.value = ""
  }

  return (
    <div className="space-y-4">
      <h2 className="text-lg font-semibold">Content</h2>

      <Tabs value={activeTab} onValueChange={setActiveTab}>
        <TabsList className="grid grid-cols-4">
          <TabsTrigger value="brand">Brand</TabsTrigger>
          {/* <TabsTrigger value="header">Header</TabsTrigger> */}
          <TabsTrigger value="hero">Hero</TabsTrigger>
          <TabsTrigger value="about">About</TabsTrigger>
          <TabsTrigger value="footer">Footer</TabsTrigger>
        </TabsList>

        <TabsContent value="brand" className="space-y-4 pt-4">
          <div className="grid gap-2">
            <Label htmlFor="brand-name">Brand Name</Label>
            <Input
              id="brand-name"
              value={content.BRAND_NAME}
              onChange={(e) => updateContent("BRAND_NAME", e.target.value)}
              placeholder="Your Brand Name"
            />
          </div>

          {/* <div className="grid gap-2">
            <Label htmlFor="brand-logo">Brand Logo</Label>
            <div className="flex items-center gap-2">
              <div className="h-10 w-32 border rounded flex items-center justify-center bg-muted/30">
                {content.BRAND_LOGO ? (
                  <img
                    src={content.BRAND_LOGO || "/placeholder.svg"}
                    alt="Brand Logo"
                    className="max-h-full max-w-full object-contain"
                  />
                ) : (
                  <span className="text-xs text-muted-foreground">No logo</span>
                )}
              </div>
              <div className="relative">
                <Input id="logo-upload" type="file" className="hidden" accept="image/*" onChange={handleLogoUpload} />
                <Button
                  type="button"
                  variant="outline"
                  size="sm"
                  onClick={() => document.getElementById("logo-upload")?.click()}
                >
                  <Upload className="h-4 w-4 mr-2" />
                  Upload Logo
                </Button>
              </div>
            </div>
            <p className="text-xs text-muted-foreground">Recommended size: 120x40px</p>
          </div> */}

          <div className="grid gap-2">
            <Label htmlFor="site-title">Site Title (Metadata)</Label>
            <Input
              id="site-title"
              value={metadata.title}
              onChange={(e) => updateMetadata("title", e.target.value)}
              placeholder="Your Site Title"
            />
            <p className="text-xs text-muted-foreground">
              Used for SEO and browser tabs
            </p>
          </div>

          <div className="grid gap-2">
            <Label htmlFor="site-description">
              Site Description (Metadata)
            </Label>
            <Textarea
              id="site-description"
              value={metadata.description}
              onChange={(e) =>
                updateMetadata("description", e.target.value)
              }
              placeholder="Brief description of your site"
              rows={2}
            />
            <p className="text-xs text-muted-foreground">
              Used for SEO and social sharing
            </p>
          </div>
        </TabsContent>

        {/* <TabsContent value="header" className="space-y-4 pt-4">
          <div className="grid gap-2">
            <Label htmlFor="header-text">Store Name</Label>
            <Input
              id="header-text"
              value={content.HEADER_TEXT}
              onChange={(e) => updateContent("HEADER_TEXT", e.target.value)}
            />
          </div>

          <div className="grid gap-2">
            <Label htmlFor="announcement-text">Announcement Bar Text</Label>
            <Input
              id="announcement-text"
              value={content.ANNOUNCEMENT_TEXT}
              onChange={(e) => updateContent("ANNOUNCEMENT_TEXT", e.target.value)}
              placeholder="FREE SHIPPING ON ALL ORDERS OVER $75"
            />
          </div>
        </TabsContent> */}

        <TabsContent value="hero" className="space-y-4 pt-4">
          <div className="grid gap-2">
            <Label htmlFor="hero-title">Hero Title</Label>
            <Input
              id="hero-title"
              value={content.HERO_TITLE}
              onChange={(e) => updateContent("HERO_TITLE", e.target.value)}
            />
          </div>

          <div className="grid gap-2">
            <Label htmlFor="hero-subtitle">Hero Subtitle</Label>
            <Textarea
              id="hero-subtitle"
              value={content.HERO_DESCRIPTION}
              onChange={(e) =>
                updateContent("HERO_DESCRIPTION", e.target.value)
              }
              rows={3}
            />
          </div>

          <div className="grid gap-2">
            <Label htmlFor="primary-cta">Primary CTA Button</Label>
            <Input
              id="primary-cta"
              value={content.PRIMARY_CTA_TEXT}
              onChange={(e) =>
                updateContent("PRIMARY_CTA_TEXT", e.target.value)
              }
              placeholder="Shop Now"
            />
          </div>

          <div className="grid gap-2">
            <Label htmlFor="secondary-cta">Secondary CTA Button</Label>
            <Input
              id="secondary-cta"
              value={content.SECONDARY_CTA_TEXT}
              onChange={(e) =>
                updateContent("SECONDARY_CTA_TEXT", e.target.value)
              }
              placeholder="Learn More"
            />
          </div>
        </TabsContent>

        <TabsContent value="about" className="space-y-4 pt-4">
          {/* <div className="grid gap-2">
            <Label htmlFor="about-title">About Section Title</Label>
            <Input
              id="about-title"
              value={content.ABOUT_TITLE}
              onChange={(e) => updateContent("ABOUT_TITLE", e.target.value)}
            />
          </div> */}

          <div className="grid gap-2">
            <Label htmlFor="about-text">About Section Content</Label>
            <Textarea
              id="about-text"
              value={content.ABOUT_TEXT}
              onChange={(e) => updateContent("ABOUT_TEXT", e.target.value)}
              rows={5}
            />
            <p className="text-xs text-muted-foreground">
              HTML formatting is supported
            </p>
          </div>
        </TabsContent>

        <TabsContent value="footer" className="space-y-4 pt-4">
          <div className="grid gap-2">
            <Label htmlFor="instagram-link">Instagram Link</Label>
            <Input
              id="instagram-link"
              value={content.INSTAGRAM_LINK}
              onChange={(e) => updateContent("INSTAGRAM_LINK", e.target.value)}
              placeholder="https://instagram.com/yourbrand"
            />
          </div>

          <div className="grid gap-2">
            <Label htmlFor="facebook-link">Facebook Link</Label>
            <Input
              id="facebook-link"
              value={content.FACEBOOK_LINK}
              onChange={(e) => updateContent("FACEBOOK_LINK", e.target.value)}
              placeholder="https://facebook.com/yourbrand"
            />
          </div>

          <div className="grid gap-2">
            <Label htmlFor="twitter-link">Twitter Link</Label>
            <Input
              id="twitter-link"
              value={content.TWITTER_LINK}
              onChange={(e) => updateContent("TWITTER_LINK", e.target.value)}
              placeholder="https://twitter.com/yourbrand"
            />
          </div>

          <div className="grid gap-2">
            <Label htmlFor="phoneNumber">Phone Number</Label>
            <Input
              id="phoneNumber"
              value={content.PHONE_NUMBER}
              onChange={(e) => updateContent("PHONE_NUMBER", e.target.value)}
              placeholder="+1234567890"
            />
          </div>

          <div className="grid gap-2">
            <Label htmlFor="mail">Mail</Label>
            <Input
              id="mail"
              value={content.MAIL}
              onChange={(e) => updateContent("MAIL", e.target.value)}
            />
          </div>

          {/* <div className="grid gap-2">
            <Label htmlFor="brand-address">Brand Address</Label>
            <Textarea
              id="brand-address"
              value={content.BRAND_ADDRESS}
              onChange={(e) => updateContent("BRAND_ADDRESS", e.target.value)}
              rows={3}
              placeholder="123 Fashion Street, New York, NY 10001"
            />
          </div>

          <div className="grid gap-2">
            <Label htmlFor="copyright">Copyright Text</Label>
            <Input
              id="copyright"
              value={content.COPYRIGHT_TEXT}
              onChange={(e) => updateContent("COPYRIGHT_TEXT", e.target.value)}
            />
          </div> */}
        </TabsContent>
      </Tabs>
    </div>
  );
}

