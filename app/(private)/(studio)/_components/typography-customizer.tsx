"use client"

import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Slider } from "@/components/ui/slider"
import { Button } from "@/components/ui/button"
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion"

// Font families
const fontFamilies = [
  { value: "Inter, sans-serif", label: "Inter" },
  { value: "Roboto, sans-serif", label: "Roboto" },
  { value: "Poppins, sans-serif", label: "Poppins" },
  { value: "Montserrat, sans-serif", label: "Montserrat" },
  { value: "Playfair Display, serif", label: "Playfair Display" },
  { value: "Lato, sans-serif", label: "Lato" },
  { value: "Open Sans, sans-serif", label: "Open Sans" },
  { value: "Raleway, sans-serif", label: "Raleway" },
  { value: "Merriweather, serif", label: "Merriweather" },
  { value: "Nunito, sans-serif", label: "Nunito" },
  { value: "Source Sans Pro, sans-serif", label: "Source Sans Pro" },
  { value: "Josefin Sans, sans-serif", label: "Josefin Sans" },
  { value: "Cabin, sans-serif", label: "Cabin" },
  { value: "Archivo, sans-serif", label: "Archivo" },
  { value: "Work Sans, sans-serif", label: "Work Sans" },
];

interface TypographyCustomizerProps {
  typography: Record<string, string>
  onUpdateTypography: (typography: Record<string, string>) => void
}

export default function TypographyCustomizer({ typography, onUpdateTypography }: TypographyCustomizerProps) {
  const updateTypography = (key: string, value: string) => {
    onUpdateTypography({ [key]: value })
  }

  return (
    <div className="space-y-4">
      <h2 className="text-lg font-semibold">Typography Customization</h2>

      <Accordion type="single" collapsible className="w-full">
        <AccordionItem value="fonts">
          <AccordionTrigger>Font Family</AccordionTrigger>
          <AccordionContent className="space-y-4 pt-2">
            <div className="grid gap-2">
              <Label htmlFor="font-family">Primary Font</Label>
              <Select value={typography.FONT_FAMILY} onValueChange={(value) => updateTypography("FONT_FAMILY", value)}>
                <SelectTrigger id="font-family">
                  <SelectValue placeholder="Select font family" />
                </SelectTrigger>
                <SelectContent>
                  {fontFamilies.map((font) => (
                    <SelectItem key={font.value} value={font.value}>
                      <span style={{ fontFamily: font.value }}>{font.label}</span>
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
              <p className="text-sm text-muted-foreground mt-1">
                Preview:{" "}
                <span style={{ fontFamily: typography.FONT_FAMILY }}>The quick brown fox jumps over the lazy dog</span>
              </p>
            </div>
          </AccordionContent>
        </AccordionItem>

        <AccordionItem value="sizes">
          <AccordionTrigger>Font Sizes</AccordionTrigger>
          <AccordionContent className="space-y-4 pt-2">
            <div className="grid gap-2">
              <Label htmlFor="heading-size">Heading Size</Label>
              <div className="flex items-center gap-4">
                <Slider id="heading-size" defaultValue={[24]} max={48} min={16} step={1} className="flex-1" />
                <span className="text-sm font-medium">24px</span>
              </div>
            </div>

            <div className="grid gap-2">
              <Label htmlFor="body-size">Body Text Size</Label>
              <div className="flex items-center gap-4">
                <Slider id="body-size" defaultValue={[16]} max={24} min={12} step={1} className="flex-1" />
                <span className="text-sm font-medium">16px</span>
              </div>
            </div>
          </AccordionContent>
        </AccordionItem>

        <AccordionItem value="weights">
          <AccordionTrigger>Font Weights</AccordionTrigger>
          <AccordionContent className="space-y-4 pt-2">
            <div className="grid gap-2">
              <Label htmlFor="heading-weight">Heading Weight</Label>
              <Select defaultValue="600">
                <SelectTrigger id="heading-weight">
                  <SelectValue placeholder="Select weight" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="400">Regular (400)</SelectItem>
                  <SelectItem value="500">Medium (500)</SelectItem>
                  <SelectItem value="600">Semi-Bold (600)</SelectItem>
                  <SelectItem value="700">Bold (700)</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div className="grid gap-2">
              <Label htmlFor="body-weight">Body Text Weight</Label>
              <Select defaultValue="400">
                <SelectTrigger id="body-weight">
                  <SelectValue placeholder="Select weight" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="300">Light (300)</SelectItem>
                  <SelectItem value="400">Regular (400)</SelectItem>
                  <SelectItem value="500">Medium (500)</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </AccordionContent>
        </AccordionItem>
      </Accordion>

      {/* <Button className="w-full mt-4">Apply Typography Changes</Button> */}
    </div>
  )
}
