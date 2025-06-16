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

// Premium color palettes with sophisticated combinations
const colorPalettes = [
  {
    name: "Dark Elegance",
    colors: {
      PRIMARY_COLOR: "#1a1a1a",
      SECONDARY_COLOR: "#2d2d2d",
      ACCENT_COLOR: "#ff6b35",
      TEXT_COLOR: "#f5f5f5",
      BACKGROUND_COLOR: "#0f0f0f",
      FOOTER_BACKGROUND: "#1a1a1a",
      FOOTER_TEXT_COLOR: "#cccccc",
      FONT_FAMILY: "Inter, sans-serif",
    },
  },
  {
    name: "Midnight Blue",
    colors: {
      PRIMARY_COLOR: "#0d1b2a",
      SECONDARY_COLOR: "#415a77",
      ACCENT_COLOR: "#ffd60a",
      TEXT_COLOR: "#e0e1dd",
      BACKGROUND_COLOR: "#000814",
      FOOTER_BACKGROUND: "#0d1b2a",
      FOOTER_TEXT_COLOR: "#778da9",
      FONT_FAMILY: "Poppins, sans-serif",
    },
  },
  {
    name: "Cyberpunk",
    colors: {
      PRIMARY_COLOR: "#0a0a0a",
      SECONDARY_COLOR: "#1a1a2e",
      ACCENT_COLOR: "#00ff88",
      TEXT_COLOR: "#ffffff",
      BACKGROUND_COLOR: "#000000",
      FOOTER_BACKGROUND: "#1a1a2e",
      FOOTER_TEXT_COLOR: "#00ff88",
      FONT_FAMILY: "Montserrat, sans-serif",
    },
  },
  {
    name: "Deep Ocean",
    colors: {
      PRIMARY_COLOR: "#001f3f",
      SECONDARY_COLOR: "#003366",
      ACCENT_COLOR: "#ff851b",
      TEXT_COLOR: "#ffffff",
      BACKGROUND_COLOR: "#000d1a",
      FOOTER_BACKGROUND: "#001f3f",
      FOOTER_TEXT_COLOR: "#b3d9ff",
      FONT_FAMILY: "Roboto, sans-serif",
    },
  },
  {
    name: "Carbon Black",
    colors: {
      PRIMARY_COLOR: "#1c1c1c",
      SECONDARY_COLOR: "#333333",
      ACCENT_COLOR: "#ff4757",
      TEXT_COLOR: "#ffffff",
      BACKGROUND_COLOR: "#0a0a0a",
      FOOTER_BACKGROUND: "#1c1c1c",
      FOOTER_TEXT_COLOR: "#cccccc",
      FONT_FAMILY: "Source Sans Pro, sans-serif",
    },
  },
  {
    name: "Purple Haze",
    colors: {
      PRIMARY_COLOR: "#2d1b69",
      SECONDARY_COLOR: "#8367c7",
      ACCENT_COLOR: "#ffc107",
      TEXT_COLOR: "#ffffff",
      BACKGROUND_COLOR: "#1a0933",
      FOOTER_BACKGROUND: "#2d1b69",
      FOOTER_TEXT_COLOR: "#c8b5db",
      FONT_FAMILY: "Raleway, sans-serif",
    },
  },
  {
    name: "Crimson Shadow",
    colors: {
      PRIMARY_COLOR: "#2c0703",
      SECONDARY_COLOR: "#800e13",
      ACCENT_COLOR: "#ff6b6b",
      TEXT_COLOR: "#ffffff",
      BACKGROUND_COLOR: "#0d0404",
      FOOTER_BACKGROUND: "#2c0703",
      FOOTER_TEXT_COLOR: "#ffb3b3",
      FONT_FAMILY: "Lato, sans-serif",
    },
  },
  {
    name: "Forest Night",
    colors: {
      PRIMARY_COLOR: "#0f2027",
      SECONDARY_COLOR: "#203a43",
      ACCENT_COLOR: "#2c5530",
      TEXT_COLOR: "#ffffff",
      BACKGROUND_COLOR: "#000000",
      FOOTER_BACKGROUND: "#0f2027",
      FOOTER_TEXT_COLOR: "#a8d8a8",
      FONT_FAMILY: "Open Sans, sans-serif",
    },
  },
  {
    name: "Electric Blue",
    colors: {
      PRIMARY_COLOR: "#0f3460",
      SECONDARY_COLOR: "#16537e",
      ACCENT_COLOR: "#00d4ff",
      TEXT_COLOR: "#ffffff",
      BACKGROUND_COLOR: "#041e42",
      FOOTER_BACKGROUND: "#0f3460",
      FOOTER_TEXT_COLOR: "#87ceeb",
      FONT_FAMILY: "Nunito, sans-serif",
    },
  },
  {
    name: "Rose Gold Dark",
    colors: {
      PRIMARY_COLOR: "#2c1810",
      SECONDARY_COLOR: "#5d4037",
      ACCENT_COLOR: "#ff9a8b",
      TEXT_COLOR: "#ffffff",
      BACKGROUND_COLOR: "#1a0f0a",
      FOOTER_BACKGROUND: "#2c1810",
      FOOTER_TEXT_COLOR: "#ddbea9",
      FONT_FAMILY: "Playfair Display, serif",
    },
  },
  {
    name: "Neon Noir",
    colors: {
      PRIMARY_COLOR: "#0c0c0c",
      SECONDARY_COLOR: "#1a1a1a",
      ACCENT_COLOR: "#ff00ff",
      TEXT_COLOR: "#ffffff",
      BACKGROUND_COLOR: "#000000",
      FOOTER_BACKGROUND: "#0c0c0c",
      FOOTER_TEXT_COLOR: "#ff00ff",
      FONT_FAMILY: "Work Sans, sans-serif",
    },
  },
  {
    name: "Emerald Night",
    colors: {
      PRIMARY_COLOR: "#0d4f3c",
      SECONDARY_COLOR: "#146b56",
      ACCENT_COLOR: "#50c878",
      TEXT_COLOR: "#ffffff",
      BACKGROUND_COLOR: "#041f1a",
      FOOTER_BACKGROUND: "#0d4f3c",
      FOOTER_TEXT_COLOR: "#90ee90",
      FONT_FAMILY: "Merriweather, serif",
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
      style={{ backgroundColor: palette.colors.BACKGROUND_COLOR }}
    >
      {isSelected && (
        <div className="absolute top-1 right-1 bg-primary text-primary-foreground rounded-full p-0.5">
          <Check className="h-3 w-3" />
        </div>
      )}
      <h3
        className="font-medium text-xs sm:text-sm mb-1 sm:mb-2 truncate"
        style={{ color: palette.colors.TEXT_COLOR }}
      >
        {palette.name}
      </h3>
      <div className="flex flex-wrap gap-1 mb-2">
        {Object.entries(palette.colors)
          .filter(([key]) => key !== "FONT_FAMILY")
          .slice(0, 5)
          .map(([key, color], i) => (
            <div
              key={i}
              className="w-3 h-3 sm:w-4 sm:h-4 rounded-full border shadow-sm"
              style={{ backgroundColor: color }}
              title={key.replace("_", " ").toLowerCase()}
            />
          ))}
      </div>
      <div
        className="text-xs opacity-60"
        style={{ color: palette.colors.TEXT_COLOR }}
      >
        {palette.colors.FONT_FAMILY.split(",")[0]}
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
          Premium Color & Font Customization
        </h2>

        <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
          <TabsList className="grid grid-cols-2 w-full mb-2">
            <TabsTrigger
              value="palettes"
              className="text-xs sm:text-sm py-1 sm:py-2"
            >
              <Palette className="h-3 w-3 sm:h-4 sm:w-4 mr-1 sm:mr-2" />
              <span className="hidden xs:inline">Premium</span> Palettes
            </TabsTrigger>
            <TabsTrigger
              value="custom"
              className="text-xs sm:text-sm py-1 sm:py-2"
            >
              Custom Colors
            </TabsTrigger>
          </TabsList>

          <ScrollArea className="h-[60vh] pr-2">
            <TabsContent
              value="palettes"
              className="space-y-3 sm:space-y-4 pt-2 sm:pt-3"
            >
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 sm:gap-3">
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
                      value={colors.PRIMARY_COLOR || "#1a1a1a"}
                      onChange={(value) => updateColor("PRIMARY_COLOR", value)}
                    />
                    <ColorPicker
                      label="Secondary Color"
                      value={colors.SECONDARY_COLOR || "#2d2d2d"}
                      onChange={(value) =>
                        updateColor("SECONDARY_COLOR", value)
                      }
                    />
                    <ColorPicker
                      label="Accent Color"
                      value={colors.ACCENT_COLOR || "#ff6b35"}
                      onChange={(value) => updateColor("ACCENT_COLOR", value)}
                    />
                  </AccordionContent>
                </AccordionItem>

                <AccordionItem value="text">
                  <AccordionTrigger className="py-2 sm:py-3 text-xs sm:text-sm">
                    Text & Background
                  </AccordionTrigger>
                  <AccordionContent className="space-y-3 pt-1 sm:pt-2 pb-2">
                    <ColorPicker
                      label="Text Color"
                      value={colors.TEXT_COLOR || "#ffffff"}
                      onChange={(value) => updateColor("TEXT_COLOR", value)}
                    />
                    <ColorPicker
                      label="Background Color"
                      value={colors.BACKGROUND_COLOR || "#0f0f0f"}
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
                      value={colors.FOOTER_BACKGROUND || "#1a1a1a"}
                      onChange={(value) =>
                        updateColor("FOOTER_BACKGROUND", value)
                      }
                    />
                    <ColorPicker
                      label="Footer Text Color"
                      value={colors.FOOTER_TEXT_COLOR || "#cccccc"}
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
