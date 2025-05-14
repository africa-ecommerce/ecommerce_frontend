"use client"

import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
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

       
      </Accordion>

      {/* <Button className="w-full mt-4">Apply Typography Changes</Button> */}
    </div>
  )
}
