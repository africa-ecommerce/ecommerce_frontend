"use client"

import type React from "react"

import { useState } from "react"
import { Label } from "@/components/ui/label"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"

interface LayoutCustomizerProps {
  content: Record<string, string>
  onUpdateContent: (content: Record<string, string>) => void
  metadata: Record<string, string>
  onUpdateMetadata: (metadata: Record<string, string>) => void
}

export default function LayoutCustomizer({ 
  content, 
  onUpdateContent,
  metadata,
  onUpdateMetadata,
}: LayoutCustomizerProps) {
  const [activeTab, setActiveTab] = useState("brand")

  // Character limits
  const limits = {
    BRAND_NAME: 20,
    title: 50,
    description: 50,
    HERO_TITLE: 50,
    HERO_DESCRIPTION: 100,
    PRIMARY_CTA_TEXT: 15,
    SECONDARY_CTA_TEXT: 15,
    ABOUT_TEXT: 300,
  }

  const updateContent = (key: string, value: string) => {
    // Check if field has a limit and enforce it
    if (limits[key as keyof typeof limits] && value.length > limits[key as keyof typeof limits]) {
      return // Don't update if exceeding limit
    }
    onUpdateContent({ [key]: value })
  }

  const updateMetadata = (key: string, value: string) => {
    // Check if field has a limit and enforce it
    if (limits[key as keyof typeof limits] && value.length > limits[key as keyof typeof limits]) {
      return // Don't update if exceeding limit
    }
    onUpdateMetadata({ [key]: value })
  }

  const getCharacterCount = (value: string, limit: number) => {
    const isOverLimit = value.length > limit
    return (
      <p className={`text-xs ${isOverLimit ? 'text-red-500' : 'text-muted-foreground'}`}>
        {value.length}/{limit} characters
      </p>
    )
  }

  return (
    <div className="space-y-4">
      <h2 className="text-lg font-semibold">Content</h2>

      <Tabs value={activeTab} onValueChange={setActiveTab}>
        <TabsList className="grid grid-cols-4">
          <TabsTrigger value="brand">Brand</TabsTrigger>
          <TabsTrigger value="hero">Hero</TabsTrigger>
          <TabsTrigger value="about">About</TabsTrigger>
          <TabsTrigger value="footer">Footer</TabsTrigger>
        </TabsList>

        <TabsContent value="brand" className="space-y-4 pt-4">
          <div className="grid gap-2">
            <Label htmlFor="brand-name">Brand Name</Label>
            <Input
              id="brand-name"
              value={content.BRAND_NAME || ""}
              onChange={(e) => updateContent("BRAND_NAME", e.target.value)}
              placeholder="Your Brand Name"
              maxLength={limits.BRAND_NAME}
            />
            {getCharacterCount(content.BRAND_NAME || "", limits.BRAND_NAME)}
          </div>

          <div className="grid gap-2">
            <Label htmlFor="site-title">Site Title (Metadata)</Label>
            <Input
              id="site-title"
              value={metadata.title || ""}
              onChange={(e) => updateMetadata("title", e.target.value)}
              placeholder="Your Site Title"
              maxLength={limits.title}
            />
            {getCharacterCount(metadata.title || "", limits.title)}
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
              value={metadata.description || ""}
              onChange={(e) => updateMetadata("description", e.target.value)}
              placeholder="Brief description of your site"
              rows={2}
              maxLength={limits.description}
            />
            {getCharacterCount(metadata.description || "", limits.description)}
            <p className="text-xs text-muted-foreground">
              Used for SEO and social sharing
            </p>
          </div>
        </TabsContent>

        <TabsContent value="hero" className="space-y-4 pt-4">
          <div className="grid gap-2">
            <Label htmlFor="hero-title">Hero Title</Label>
            <Input
              id="hero-title"
              value={content.HERO_TITLE || ""}
              onChange={(e) => updateContent("HERO_TITLE", e.target.value)}
              maxLength={limits.HERO_TITLE}
            />
            {getCharacterCount(content.HERO_TITLE || "", limits.HERO_TITLE)}
          </div>

          <div className="grid gap-2">
            <Label htmlFor="hero-subtitle">Hero Subtitle</Label>
            <Textarea
              id="hero-subtitle"
              value={content.HERO_DESCRIPTION || ""}
              onChange={(e) => updateContent("HERO_DESCRIPTION", e.target.value)}
              rows={3}
              maxLength={limits.HERO_DESCRIPTION}
            />
            {getCharacterCount(content.HERO_DESCRIPTION || "", limits.HERO_DESCRIPTION)}
          </div>

          <div className="grid gap-2">
            <Label htmlFor="primary-cta">Primary CTA Button</Label>
            <Input
              id="primary-cta"
              value={content.PRIMARY_CTA_TEXT || ""}
              onChange={(e) => updateContent("PRIMARY_CTA_TEXT", e.target.value)}
              placeholder="Shop Now"
              maxLength={limits.PRIMARY_CTA_TEXT}
            />
            {getCharacterCount(content.PRIMARY_CTA_TEXT || "", limits.PRIMARY_CTA_TEXT)}
          </div>

          <div className="grid gap-2">
            <Label htmlFor="secondary-cta">Secondary CTA Button</Label>
            <Input
              id="secondary-cta"
              value={content.SECONDARY_CTA_TEXT || ""}
              onChange={(e) => updateContent("SECONDARY_CTA_TEXT", e.target.value)}
              placeholder="Learn More"
              maxLength={limits.SECONDARY_CTA_TEXT}
            />
            {getCharacterCount(content.SECONDARY_CTA_TEXT || "", limits.SECONDARY_CTA_TEXT)}
          </div>
        </TabsContent>

        <TabsContent value="about" className="space-y-4 pt-4">
          <div className="grid gap-2">
            <Label htmlFor="about-text">About Section Content</Label>
            <Textarea
              id="about-text"
              value={content.ABOUT_TEXT || ""}
              onChange={(e) => updateContent("ABOUT_TEXT", e.target.value)}
              rows={5}
              maxLength={limits.ABOUT_TEXT}
            />
            {getCharacterCount(content.ABOUT_TEXT || "", limits.ABOUT_TEXT)}
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
              value={content.INSTAGRAM_LINK || ""}
              onChange={(e) => updateContent("INSTAGRAM_LINK", e.target.value)}
              placeholder="https://instagram.com/yourbrand"
            />
          </div>

          <div className="grid gap-2">
            <Label htmlFor="facebook-link">Facebook Link</Label>
            <Input
              id="facebook-link"
              value={content.FACEBOOK_LINK || ""}
              onChange={(e) => updateContent("FACEBOOK_LINK", e.target.value)}
              placeholder="https://facebook.com/yourbrand"
            />
          </div>

          <div className="grid gap-2">
            <Label htmlFor="twitter-link">Twitter Link</Label>
            <Input
              id="twitter-link"
              value={content.TWITTER_LINK || ""}
              onChange={(e) => updateContent("TWITTER_LINK", e.target.value)}
              placeholder="https://twitter.com/yourbrand"
            />
          </div>

          <div className="grid gap-2">
            <Label htmlFor="phoneNumber">Phone Number</Label>
            <Input
              id="phoneNumber"
              value={content.PHONE_NUMBER || ""}
              onChange={(e) => updateContent("PHONE_NUMBER", e.target.value)}
              placeholder="+1234567890"
            />
          </div>

          <div className="grid gap-2">
            <Label htmlFor="mail">Mail</Label>
            <Input
              id="mail"
              value={content.MAIL || ""}
              onChange={(e) => updateContent("MAIL", e.target.value)}
            />
          </div>
        </TabsContent>
      </Tabs>
    </div>
  )
}