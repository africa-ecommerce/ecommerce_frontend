



"use client";

import { useState } from "react";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { Check, Palette } from "lucide-react";
import { ScrollArea } from "@/components/ui/scroll-area";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { cn } from "@/lib/utils";

// Font families available for selection
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

// Expanded color palettes (10 total)
const colorPalettes = [
  {
    name: "Monochrome",
    colors: {
      PRIMARY_COLOR: "#000000",
      SECONDARY_COLOR: "#f5f5f5",
      ACCENT_COLOR: "#666666",
      TEXT_COLOR: "#333333",
      BACKGROUND_COLOR: "#ffffff",
      FOOTER_BACKGROUND: "#f0f0f0",
      FOOTER_TEXT_COLOR: "#333333",
      FONT_FAMILY: "Inter, sans-serif",
    },
  },
  {
    name: "Bold & Vibrant",
    colors: {
      PRIMARY_COLOR: "#ff4081",
      SECONDARY_COLOR: "#f8bbd0",
      ACCENT_COLOR: "#c51162",
      TEXT_COLOR: "#212121",
      BACKGROUND_COLOR: "#ffffff",
      FOOTER_BACKGROUND: "#f8bbd0",
      FOOTER_TEXT_COLOR: "#c51162",
      FONT_FAMILY: "Poppins, sans-serif",
    },
  },
  {
    name: "Earth Tones",
    colors: {
      PRIMARY_COLOR: "#795548",
      SECONDARY_COLOR: "#d7ccc8",
      ACCENT_COLOR: "#4e342e",
      TEXT_COLOR: "#5d4037",
      BACKGROUND_COLOR: "#efebe9",
      FOOTER_BACKGROUND: "#d7ccc8",
      FOOTER_TEXT_COLOR: "#3e2723",
      FONT_FAMILY: "Merriweather, serif",
    },
  },
  {
    name: "Ocean Blues",
    colors: {
      PRIMARY_COLOR: "#0288d1",
      SECONDARY_COLOR: "#b3e5fc",
      ACCENT_COLOR: "#01579b",
      TEXT_COLOR: "#01579b",
      BACKGROUND_COLOR: "#e1f5fe",
      FOOTER_BACKGROUND: "#b3e5fc",
      FOOTER_TEXT_COLOR: "#01579b",
      FONT_FAMILY: "Open Sans, sans-serif",
    },
  },
  // New palettes below
  {
    name: "Forest Green",
    colors: {
      PRIMARY_COLOR: "#2e7d32",
      SECONDARY_COLOR: "#c8e6c9",
      ACCENT_COLOR: "#1b5e20",
      TEXT_COLOR: "#33691e",
      BACKGROUND_COLOR: "#f1f8e9",
      FOOTER_BACKGROUND: "#c8e6c9",
      FOOTER_TEXT_COLOR: "#1b5e20",
      FONT_FAMILY: "Montserrat, sans-serif",
    },
  },
  {
    name: "Sunset Orange",
    colors: {
      PRIMARY_COLOR: "#ff5722",
      SECONDARY_COLOR: "#ffccbc",
      ACCENT_COLOR: "#e64a19",
      TEXT_COLOR: "#bf360c",
      BACKGROUND_COLOR: "#fbe9e7",
      FOOTER_BACKGROUND: "#ffccbc",
      FOOTER_TEXT_COLOR: "#bf360c",
      FONT_FAMILY: "Roboto, sans-serif",
    },
  },
  {
    name: "Lavender Dreams",
    colors: {
      PRIMARY_COLOR: "#7b1fa2",
      SECONDARY_COLOR: "#e1bee7",
      ACCENT_COLOR: "#4a148c",
      TEXT_COLOR: "#4a148c",
      BACKGROUND_COLOR: "#f3e5f5",
      FOOTER_BACKGROUND: "#e1bee7",
      FOOTER_TEXT_COLOR: "#4a148c",
      FONT_FAMILY: "Raleway, sans-serif",
    },
  },
  {
    name: "Modern Grayscale",
    colors: {
      PRIMARY_COLOR: "#455a64",
      SECONDARY_COLOR: "#cfd8dc",
      ACCENT_COLOR: "#263238",
      TEXT_COLOR: "#263238",
      BACKGROUND_COLOR: "#eceff1",
      FOOTER_BACKGROUND: "#cfd8dc",
      FOOTER_TEXT_COLOR: "#263238",
      FONT_FAMILY: "Source Sans Pro, sans-serif",
    },
  },
  {
    name: "Sunny Yellow",
    colors: {
      PRIMARY_COLOR: "#fbc02d",
      SECONDARY_COLOR: "#fff9c4",
      ACCENT_COLOR: "#f57f17",
      TEXT_COLOR: "#f57f17",
      BACKGROUND_COLOR: "#fffde7",
      FOOTER_BACKGROUND: "#fff9c4",
      FOOTER_TEXT_COLOR: "#f57f17",
      FONT_FAMILY: "Lato, sans-serif",
    },
  },
  {
    name: "Berry Smoothie",
    colors: {
      PRIMARY_COLOR: "#9c27b0",
      SECONDARY_COLOR: "#e1bee7",
      ACCENT_COLOR: "#6a1b9a",
      TEXT_COLOR: "#6a1b9a",
      BACKGROUND_COLOR: "#f3e5f5",
      FOOTER_BACKGROUND: "#e1bee7",
      FOOTER_TEXT_COLOR: "#6a1b9a",
      FONT_FAMILY: "Playfair Display, serif",
    },
  },
];


function areColorsEqual(
  paletteColors: Record<string, string>,
  configColors: Record<string, string>
) {
  const keysToCompare = [
    "PRIMARY_COLOR",
    "SECONDARY_COLOR",
    "ACCENT_COLOR",
    "TEXT_COLOR",
    "BACKGROUND_COLOR",
    "FOOTER_BACKGROUND",
    "FOOTER_TEXT_COLOR",
    "FONT_FAMILY",
  ];

  return keysToCompare.every(
    (key) =>
      paletteColors[key]?.toLowerCase() === configColors[key]?.toLowerCase()
  );
}

interface ColorPickerProps {
  label: string;
  value: string;
  onChange: (value: string) => void;
}

function ColorPicker({ label, value, onChange }: ColorPickerProps) {
  return (
    <div className="grid gap-1 sm:gap-2">
      <div className="flex items-center justify-between">
        <Label htmlFor={label} className="text-xs sm:text-sm">
          {label}
        </Label>
        <div className="flex items-center gap-1 sm:gap-2">
          <div
            className="w-4 h-4 sm:w-5 sm:h-5 rounded-full border shadow-sm"
            style={{ backgroundColor: value }}
          />
          <Input
            id={label}
            type="text"
            value={value}
            onChange={(e) => onChange(e.target.value)}
            className="w-16 sm:w-24 h-6 sm:h-8 text-xs p-1 sm:p-2"
          />
        </div>
      </div>
      <Input
        type="color"
        value={value}
        onChange={(e) => onChange(e.target.value)}
        className="h-6 sm:h-8 cursor-pointer"
      />
    </div>
  );
}

interface FontSelectorProps {
  value: string;
  onChange: (value: string) => void;
}

function FontSelector({ value, onChange }: FontSelectorProps) {
  return (
    <div className="grid gap-1 sm:gap-2">
      <Label htmlFor="font-family" className="text-xs sm:text-sm">
        Font Family
      </Label>
      <Select value={value} onValueChange={onChange}>
        <SelectTrigger id="font-family" className="h-8 sm:h-10">
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
      <div
        className="p-2 border rounded mt-1 text-sm"
        style={{ fontFamily: value }}
      >
        Sample text with this font family
      </div>
    </div>
  );
}

// interface PaletteCardProps {
//   palette: (typeof colorPalettes)[0];
//   onSelect: () => void;
// }

// function PaletteCard({ palette, onSelect }: PaletteCardProps) {
//   return (
//     <div
//       className="border rounded-lg p-2 sm:p-3 cursor-pointer hover:border-primary hover:shadow-sm transition-all"
//       onClick={onSelect}
//     >
//       <h3 className="font-medium text-xs sm:text-sm mb-1 sm:mb-2 truncate">
//         {palette.name}
//       </h3>
//       <div className="flex flex-wrap gap-1">
//         {Object.entries(palette.colors)
//           .filter(([key]) => key !== "FONT_FAMILY")
//           .slice(0, 3)
//           .map(([key, color], i) => (
//             <div
//               key={i}
//               className="w-4 h-4 sm:w-5 sm:h-5 rounded-full border shadow-sm"
//               style={{ backgroundColor: color }}
//             />
//           ))}
//       </div>
//     </div>
//   );
// }

interface PaletteCardProps {
  palette: (typeof colorPalettes)[0];
  isSelected: boolean;
  onSelect: () => void;
}

function PaletteCard({ palette, isSelected, onSelect }: PaletteCardProps) {
  return (
    <div
      className={cn(
        "border rounded-lg p-2 sm:p-3 transition-all relative",
        isSelected
          ? "ring-2 ring-primary cursor-default opacity-75"
          : "cursor-pointer hover:border-primary hover:shadow-sm"
      )}
      onClick={isSelected ? undefined : onSelect}
    >
      {isSelected && (
        <div className="absolute top-1 right-1 bg-primary text-primary-foreground rounded-full p-0.5">
          <Check className="h-3 w-3" />
        </div>
      )}
      <h3 className="font-medium text-xs sm:text-sm mb-1 sm:mb-2 truncate">
        {palette.name}
      </h3>
      <div className="flex flex-wrap gap-1">
        {Object.entries(palette.colors)
          .filter(([key]) => key !== "FONT_FAMILY")
          .slice(0, 3)
          .map(([key, color], i) => (
            <div
              key={i}
              className="w-4 h-4 sm:w-5 sm:h-5 rounded-full border shadow-sm"
              style={{ backgroundColor: color }}
            />
          ))}
      </div>
    </div>
  );
}

interface ColorCustomizerProps {
  colors: Record<string, string>;
  onUpdateColors: (colors: Record<string, string>) => void;
}

export default function ColorCustomizer({
  colors,
  onUpdateColors,
}: ColorCustomizerProps) {
  const [activeTab, setActiveTab] = useState("palettes");

  const updateColor = (key: string, value: string) => {
    onUpdateColors({ ...colors, [key]: value });
  };

  const applyPalette = (palette: (typeof colorPalettes)[0]) => {
    onUpdateColors(palette.colors);
  };

  // Determine selected palette by comparing current colors with predefined palettes
  const selectedPalette =
    colorPalettes.find((palette) => areColorsEqual(palette.colors, colors))
      ?.name || null;

  

  return (
    <div className="flex flex-col h-full">
      <div className="px-1 sm:px-2 pb-2 sm:pb-4">
        <h2 className="text-base sm:text-lg font-semibold mb-3 sm:mb-4">
          Color & Font Customization
        </h2>

        <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
          <TabsList className="grid grid-cols-2 w-full mb-2">
            <TabsTrigger
              value="palettes"
              className="text-xs sm:text-sm py-1 sm:py-2"
            >
              <Palette className="h-3 w-3 sm:h-4 sm:w-4 mr-1 sm:mr-2" />
              <span className="hidden xs:inline">Color</span> Palettes
            </TabsTrigger>
            <TabsTrigger
              value="custom"
              className="text-xs sm:text-sm py-1 sm:py-2"
            >
              Colors & Fonts
            </TabsTrigger>
          </TabsList>

          <ScrollArea className="h-[60vh] pr-2">
            <TabsContent
              value="palettes"
              className="space-y-3 sm:space-y-4 pt-2 sm:pt-3"
            >
              <div className="grid grid-cols-2 gap-2 sm:gap-3">
                {colorPalettes.map((palette, index) => (
                  <PaletteCard
                    key={index}
                    palette={palette}
                    isSelected={selectedPalette === palette.name}
                    onSelect={() => applyPalette(palette)}
                  />
                ))}
              </div>
            </TabsContent>

            <TabsContent
              value="custom"
              className="space-y-2 sm:space-y-3 pt-2 sm:pt-3"
            >
              {/* Font Family Selection */}
              <div className="mb-4">
                <FontSelector
                  value={colors.FONT_FAMILY || "Inter, sans-serif"}
                  onChange={(value) => updateColor("FONT_FAMILY", value)}
                />
              </div>

              <Accordion type="single" collapsible className="w-full">
                <AccordionItem value="brand">
                  <AccordionTrigger className="py-2 sm:py-3 text-xs sm:text-sm">
                    Brand Colors
                  </AccordionTrigger>
                  <AccordionContent className="space-y-3 pt-1 sm:pt-2 pb-2">
                    <ColorPicker
                      label="Primary Color"
                      value={colors.PRIMARY_COLOR || "#000000"}
                      onChange={(value) => updateColor("PRIMARY_COLOR", value)}
                    />
                    <ColorPicker
                      label="Secondary Color"
                      value={colors.SECONDARY_COLOR || "#f5f5f5"}
                      onChange={(value) =>
                        updateColor("SECONDARY_COLOR", value)
                      }
                    />
                    <ColorPicker
                      label="Accent Color"
                      value={colors.ACCENT_COLOR || "#666666"}
                      onChange={(value) => updateColor("ACCENT_COLOR", value)}
                    />
                  </AccordionContent>
                </AccordionItem>

                <AccordionItem value="text">
                  <AccordionTrigger className="py-2 sm:py-3 text-xs sm:text-sm">
                    Text Colors
                  </AccordionTrigger>
                  <AccordionContent className="space-y-3 pt-1 sm:pt-2 pb-2">
                    <ColorPicker
                      label="Text Color"
                      value={colors.TEXT_COLOR || "#333333"}
                      onChange={(value) => updateColor("TEXT_COLOR", value)}
                    />
                    <ColorPicker
                      label="Background Color"
                      value={colors.BACKGROUND_COLOR || "#ffffff"}
                      onChange={(value) =>
                        updateColor("BACKGROUND_COLOR", value)
                      }
                    />
                  </AccordionContent>
                </AccordionItem>

                <AccordionItem value="footer">
                  <AccordionTrigger className="py-2 sm:py-3 text-xs sm:text-sm">
                    Footer Colors
                  </AccordionTrigger>
                  <AccordionContent className="space-y-3 pt-1 sm:pt-2 pb-2">
                    <ColorPicker
                      label="Footer Background"
                      value={colors.FOOTER_BACKGROUND || "#f0f0f0"}
                      onChange={(value) =>
                        updateColor("FOOTER_BACKGROUND", value)
                      }
                    />
                    <ColorPicker
                      label="Footer Text Color"
                      value={colors.FOOTER_TEXT_COLOR || "#333333"}
                      onChange={(value) =>
                        updateColor("FOOTER_TEXT_COLOR", value)
                      }
                    />
                  </AccordionContent>
                </AccordionItem>
              </Accordion>
            </TabsContent>
          </ScrollArea>
        </Tabs>
      </div>
    </div>
  );
}
