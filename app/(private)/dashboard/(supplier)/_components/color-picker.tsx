"use client"

import { useState } from "react"
import { Check, ChevronDown, X } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover"
import { Badge } from "@/components/ui/badge"
import { cn } from "@/lib/utils"
import { PREDEFINED_COLORS } from "@/lib/colors"

interface ColorPickerProps {
  value: string[]
  onChange: (colors: string[]) => void
  placeholder?: string
  label?: string
  id?: string
  className?: string
}

export function ColorPicker({
  value = [],
  onChange,
  placeholder = "Select colors...",
  label,
  id,
  className,
}: ColorPickerProps) {
  const [open, setOpen] = useState(false)
  const [searchTerm, setSearchTerm] = useState("")

  const filteredColors = PREDEFINED_COLORS.filter((color) =>
    color.name.toLowerCase().includes(searchTerm.toLowerCase()),
  )

  const selectedColors = PREDEFINED_COLORS.filter((color) => value.includes(color.value))

  const toggleColor = (colorValue: string) => {
    const newColors = value.includes(colorValue) ? value.filter((c) => c !== colorValue) : [...value, colorValue]
    onChange(newColors)
  }

  const removeColor = (colorValue: string) => {
    onChange(value.filter((c) => c !== colorValue))
  }

  const getColorDisplay = (colorValue: string) => {
    return PREDEFINED_COLORS.find((c) => c.value === colorValue)
  }

  return (
    <div className={cn("space-y-2", className)}>
      {label && <Label htmlFor={id}>{label}</Label>}

      {/* Selected Colors Display */}
      {selectedColors.length > 0 && (
        <div className="flex flex-wrap gap-2 mb-2">
          {selectedColors.map((color) => (
            <Badge key={color.value} variant="secondary" className="flex items-center gap-2 px-3 py-1">
              <div className="w-3 h-3 rounded-full border border-gray-300" style={{ backgroundColor: color.hex }} />
              <span className="text-sm">{color.name}</span>
              <Button
                variant="ghost"
                size="sm"
                className="h-4 w-4 p-0 hover:bg-transparent"
                onClick={() => removeColor(color.value)}
              >
                <X className="h-3 w-3" />
              </Button>
            </Badge>
          ))}
        </div>
      )}

      <Popover open={open} onOpenChange={setOpen}>
        <PopoverTrigger asChild>
          <Button
            id={id}
            variant="outline"
            role="combobox"
            aria-expanded={open}
            className="w-full justify-between h-12 text-base bg-transparent"
          >
            <span className="text-muted-foreground">
              {selectedColors.length > 0
                ? `${selectedColors.length} color${selectedColors.length > 1 ? "s" : ""} selected`
                : placeholder}
            </span>
            <ChevronDown className="ml-2 h-4 w-4 shrink-0 opacity-50" />
          </Button>
        </PopoverTrigger>
        <PopoverContent className="w-full p-0" align="start">
          <div className="p-3 border-b">
            <Input
              placeholder="Search colors..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="h-9"
            />
          </div>
          <div className="max-h-60 overflow-y-auto">
            {filteredColors.length === 0 ? (
              <div className="p-4 text-center text-sm text-muted-foreground">No colors found.</div>
            ) : (
              <div className="p-2">
                {filteredColors.map((color) => (
                  <div
                    key={color.value}
                    className={cn(
                      "flex items-center gap-3 rounded-md px-3 py-2 cursor-pointer hover:bg-accent",
                      value.includes(color.value) && "bg-accent",
                    )}
                    onClick={() => toggleColor(color.value)}
                  >
                    <div
                      className="w-4 h-4 rounded-full border border-gray-300 flex-shrink-0"
                      style={{ backgroundColor: color.hex }}
                    />
                    <span className="flex-1 text-sm">{color.name}</span>
                    {value.includes(color.value) && <Check className="h-4 w-4 text-primary" />}
                  </div>
                ))}
              </div>
            )}
          </div>
        </PopoverContent>
      </Popover>
    </div>
  )
}
