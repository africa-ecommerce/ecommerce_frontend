export interface ColorOption {
  name: string
  value: string
  hex: string
}

export const PREDEFINED_COLORS: ColorOption[] = [
  // Primary Colors
  { name: "Red", value: "red", hex: "#ef4444" },
  { name: "Blue", value: "blue", hex: "#3b82f6" },
  { name: "Green", value: "green", hex: "#22c55e" },
  { name: "Yellow", value: "yellow", hex: "#eab308" },
  { name: "Purple", value: "purple", hex: "#a855f7" },
  { name: "Orange", value: "orange", hex: "#f97316" },
  { name: "Pink", value: "pink", hex: "#ec4899" },

  // Neutral Colors
  { name: "Black", value: "black", hex: "#000000" },
  { name: "White", value: "white", hex: "#ffffff" },
  { name: "Gray", value: "gray", hex: "#6b7280" },
  { name: "Silver", value: "silver", hex: "#c0c0c0" },

  // Fashion Colors
  { name: "Navy", value: "navy", hex: "#1e3a8a" },
  { name: "Burgundy", value: "burgundy", hex: "#7c2d12" },
  { name: "Olive", value: "olive", hex: "#65a30d" },
  { name: "Maroon", value: "maroon", hex: "#991b1b" },
  { name: "Teal", value: "teal", hex: "#0d9488" },
  { name: "Coral", value: "coral", hex: "#fb7185" },
  { name: "Lavender", value: "lavender", hex: "#c084fc" },

  // Popular Product Colors
  { name: "Rose Gold", value: "rose-gold", hex: "#e8b4b8" },
  { name: "Space Gray", value: "space-gray", hex: "#4a5568" },
  { name: "Midnight", value: "midnight", hex: "#1a202c" },
  { name: "Champagne", value: "champagne", hex: "#f7e7ce" },
  { name: "Bronze", value: "bronze", hex: "#cd7f32" },
  { name: "Copper", value: "copper", hex: "#b87333" },
  { name: "Mint", value: "mint", hex: "#98fb98" },
  { name: "Cream", value: "cream", hex: "#fffdd0" },
  { name: "Beige", value: "beige", hex: "#f5f5dc" },
  { name: "Charcoal", value: "charcoal", hex: "#36454f" },
]
