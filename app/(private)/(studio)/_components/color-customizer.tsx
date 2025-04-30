"use client";

import { useState } from "react";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { Paintbrush, Palette } from "lucide-react";
import { ScrollArea } from "@/components/ui/scroll-area";

// Expanded color palettes (10 total)
const colorPalettes = [
  {
    name: "Monochrome",
    colors: {
      PRIMARY_COLOR: "#000000",
      SECONDARY_COLOR: "#f5f5f5",
      ACCENT_COLOR: "#666666",
      BUTTON_COLOR: "#000000",
      TEXT_COLOR: "#333333",
      BACKGROUND_COLOR: "#ffffff",
      HEADER_BACKGROUND: "#000000",
      HEADER_TEXT_COLOR: "#ffffff",
      BUTTON_TEXT_COLOR: "#ffffff",
      FOOTER_BACKGROUND: "#f0f0f0",
      FOOTER_TEXT_COLOR: "#333333",
    },
  },
  {
    name: "Bold & Vibrant",
    colors: {
      PRIMARY_COLOR: "#ff4081",
      SECONDARY_COLOR: "#f8bbd0",
      ACCENT_COLOR: "#c51162",
      BUTTON_COLOR: "#ff4081",
      TEXT_COLOR: "#212121",
      BACKGROUND_COLOR: "#ffffff",
      HEADER_BACKGROUND: "#c51162",
      HEADER_TEXT_COLOR: "#ffffff",
      BUTTON_TEXT_COLOR: "#ffffff",
      FOOTER_BACKGROUND: "#f8bbd0",
      FOOTER_TEXT_COLOR: "#c51162",
    },
  },
  {
    name: "Earth Tones",
    colors: {
      PRIMARY_COLOR: "#795548",
      SECONDARY_COLOR: "#d7ccc8",
      ACCENT_COLOR: "#4e342e",
      BUTTON_COLOR: "#795548",
      TEXT_COLOR: "#5d4037",
      BACKGROUND_COLOR: "#efebe9",
      HEADER_BACKGROUND: "#5d4037",
      HEADER_TEXT_COLOR: "#efebe9",
      BUTTON_TEXT_COLOR: "#efebe9",
      FOOTER_BACKGROUND: "#d7ccc8",
      FOOTER_TEXT_COLOR: "#3e2723",
    },
  },
  {
    name: "Ocean Blues",
    colors: {
      PRIMARY_COLOR: "#0288d1",
      SECONDARY_COLOR: "#b3e5fc",
      ACCENT_COLOR: "#01579b",
      BUTTON_COLOR: "#0288d1",
      TEXT_COLOR: "#01579b",
      BACKGROUND_COLOR: "#e1f5fe",
      HEADER_BACKGROUND: "#01579b",
      HEADER_TEXT_COLOR: "#e1f5fe",
      BUTTON_TEXT_COLOR: "#ffffff",
      FOOTER_BACKGROUND: "#b3e5fc",
      FOOTER_TEXT_COLOR: "#01579b",
    },
  },
  // New palettes below
  {
    name: "Forest Green",
    colors: {
      PRIMARY_COLOR: "#2e7d32",
      SECONDARY_COLOR: "#c8e6c9",
      ACCENT_COLOR: "#1b5e20",
      BUTTON_COLOR: "#2e7d32",
      TEXT_COLOR: "#33691e",
      BACKGROUND_COLOR: "#f1f8e9",
      HEADER_BACKGROUND: "#1b5e20",
      HEADER_TEXT_COLOR: "#f1f8e9",
      BUTTON_TEXT_COLOR: "#ffffff",
      FOOTER_BACKGROUND: "#c8e6c9",
      FOOTER_TEXT_COLOR: "#1b5e20",
    },
  },
  {
    name: "Sunset Orange",
    colors: {
      PRIMARY_COLOR: "#ff5722",
      SECONDARY_COLOR: "#ffccbc",
      ACCENT_COLOR: "#e64a19",
      BUTTON_COLOR: "#ff5722",
      TEXT_COLOR: "#bf360c",
      BACKGROUND_COLOR: "#fbe9e7",
      HEADER_BACKGROUND: "#bf360c",
      HEADER_TEXT_COLOR: "#ffffff",
      BUTTON_TEXT_COLOR: "#ffffff",
      FOOTER_BACKGROUND: "#ffccbc",
      FOOTER_TEXT_COLOR: "#bf360c",
    },
  },
  {
    name: "Lavender Dreams",
    colors: {
      PRIMARY_COLOR: "#7b1fa2",
      SECONDARY_COLOR: "#e1bee7",
      ACCENT_COLOR: "#4a148c",
      BUTTON_COLOR: "#7b1fa2",
      TEXT_COLOR: "#4a148c",
      BACKGROUND_COLOR: "#f3e5f5",
      HEADER_BACKGROUND: "#4a148c",
      HEADER_TEXT_COLOR: "#f3e5f5",
      BUTTON_TEXT_COLOR: "#ffffff",
      FOOTER_BACKGROUND: "#e1bee7",
      FOOTER_TEXT_COLOR: "#4a148c",
    },
  },
  {
    name: "Modern Grayscale",
    colors: {
      PRIMARY_COLOR: "#455a64",
      SECONDARY_COLOR: "#cfd8dc",
      ACCENT_COLOR: "#263238",
      BUTTON_COLOR: "#455a64",
      TEXT_COLOR: "#263238",
      BACKGROUND_COLOR: "#eceff1",
      HEADER_BACKGROUND: "#263238",
      HEADER_TEXT_COLOR: "#eceff1",
      BUTTON_TEXT_COLOR: "#ffffff",
      FOOTER_BACKGROUND: "#cfd8dc",
      FOOTER_TEXT_COLOR: "#263238",
    },
  },
  {
    name: "Sunny Yellow",
    colors: {
      PRIMARY_COLOR: "#fbc02d",
      SECONDARY_COLOR: "#fff9c4",
      ACCENT_COLOR: "#f57f17",
      BUTTON_COLOR: "#f57f17",
      TEXT_COLOR: "#f57f17",
      BACKGROUND_COLOR: "#fffde7",
      HEADER_BACKGROUND: "#f57f17",
      HEADER_TEXT_COLOR: "#fffde7",
      BUTTON_TEXT_COLOR: "#ffffff",
      FOOTER_BACKGROUND: "#fff9c4",
      FOOTER_TEXT_COLOR: "#f57f17",
    },
  },
  {
    name: "Berry Smoothie",
    colors: {
      PRIMARY_COLOR: "#9c27b0",
      SECONDARY_COLOR: "#e1bee7",
      ACCENT_COLOR: "#6a1b9a",
      BUTTON_COLOR: "#9c27b0",
      TEXT_COLOR: "#6a1b9a",
      BACKGROUND_COLOR: "#f3e5f5",
      HEADER_BACKGROUND: "#6a1b9a",
      HEADER_TEXT_COLOR: "#f3e5f5",
      BUTTON_TEXT_COLOR: "#ffffff",
      FOOTER_BACKGROUND: "#e1bee7",
      FOOTER_TEXT_COLOR: "#6a1b9a",
    },
  },
];

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

interface PaletteCardProps {
  palette: (typeof colorPalettes)[0];
  onSelect: () => void;
}

function PaletteCard({ palette, onSelect }: PaletteCardProps) {
  return (
    <div
      className="border rounded-lg p-2 sm:p-3 cursor-pointer hover:border-primary hover:shadow-sm transition-all"
      onClick={onSelect}
    >
      <h3 className="font-medium text-xs sm:text-sm mb-1 sm:mb-2 truncate">
        {palette.name}
      </h3>
      <div className="flex flex-wrap gap-1">
        {Object.values(palette.colors)
          .slice(0, 3)
          .map((color, i) => (
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

  return (
    <div className="flex flex-col h-full">
      <div className="px-1 sm:px-2 pb-2 sm:pb-4">
        <h2 className="text-base sm:text-lg font-semibold mb-3 sm:mb-4">
          Color Customization
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
              <Paintbrush className="h-3 w-3 sm:h-4 sm:w-4 mr-1 sm:mr-2" />
              Custom <span className="hidden xs:inline">Colors</span>
            </TabsTrigger>
          </TabsList>

          <ScrollArea className="h-[60vh] sm:h-[50vh] pr-2">
            <TabsContent
              value="palettes"
              className="space-y-3 sm:space-y-4 pt-2 sm:pt-3"
            >
              <div className="grid grid-cols-2 gap-2 sm:gap-3">
                {colorPalettes.map((palette, index) => (
                  <PaletteCard
                    key={index}
                    palette={palette}
                    onSelect={() => applyPalette(palette)}
                  />
                ))}
              </div>

              
            </TabsContent>

            <TabsContent
              value="custom"
              className="space-y-2 sm:space-y-3 pt-2 sm:pt-3"
            >
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

                <AccordionItem value="header">
                  <AccordionTrigger className="py-2 sm:py-3 text-xs sm:text-sm">
                    Header Colors
                  </AccordionTrigger>
                  <AccordionContent className="space-y-3 pt-1 sm:pt-2 pb-2">
                    <ColorPicker
                      label="Header Background"
                      value={colors.HEADER_BACKGROUND || "#000000"}
                      onChange={(value) =>
                        updateColor("HEADER_BACKGROUND", value)
                      }
                    />
                    <ColorPicker
                      label="Header Text Color"
                      value={colors.HEADER_TEXT_COLOR || "#ffffff"}
                      onChange={(value) =>
                        updateColor("HEADER_TEXT_COLOR", value)
                      }
                    />
                  </AccordionContent>
                </AccordionItem>

                <AccordionItem value="buttons">
                  <AccordionTrigger className="py-2 sm:py-3 text-xs sm:text-sm">
                    Button Colors
                  </AccordionTrigger>
                  <AccordionContent className="space-y-3 pt-1 sm:pt-2 pb-2">
                    <ColorPicker
                      label="Button Color"
                      value={colors.BUTTON_COLOR || "#000000"}
                      onChange={(value) => updateColor("BUTTON_COLOR", value)}
                    />
                    <ColorPicker
                      label="Button Text Color"
                      value={colors.BUTTON_TEXT_COLOR || "#ffffff"}
                      onChange={(value) =>
                        updateColor("BUTTON_TEXT_COLOR", value)
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

      {/* <div className="sticky bottom-0 left-0 w-full p-2 mt-auto bg-background border-t shadow-md">
        <Button className="w-full h-9 sm:h-10 text-xs sm:text-sm">
          Apply Color Changes
        </Button>
      </div> */}
    </div>
  );
}
