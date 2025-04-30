"use client"

import { useState } from "react"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { Check, Search } from "lucide-react"
import Image from "next/image"
import { cn } from "@/lib/utils"

// Template categories
const categories = [
  { id: "all", name: "All" },
  { id: "fashion", name: "Fashion" },
  { id: "beauty", name: "Beauty" },
  { id: "electronics", name: "Electronics" },
  { id: "home", name: "Home" },
  { id: "sports", name: "Sports" },
  { id: "jewelry", name: "Jewelry" },
]

// Template data
const templates = [
  {
    id: "fashion-nova",
    name: "Fashion Nova",
    description: "High-end fashion store template with modern design",
    image: "/placeholder.svg?height=200&width=300",
    category: "fashion",
  },
  {
    id: "fashion-boutique",
    name: "Fashion Boutique",
    description: "Elegant and minimalist fashion boutique template",
    image: "/fashionNova.png",
    category: "fashion",
  },
  {
    id: "luxury-fashion",
    name: "Luxury Fashion",
    description: "Premium fashion store with luxury aesthetics",
    image: "/placeholder.svg?height=200&width=300",
    category: "fashion",
  },
  {
    id: "beauty-store",
    name: "Beauty Store",
    description: "Clean and elegant beauty products store",
    image: "/placeholder.svg?height=200&width=300",
    category: "beauty",
  },
  {
    id: "tech-gadgets",
    name: "Tech Gadgets",
    description: "Modern electronics and gadgets store",
    image: "/placeholder.svg?height=200&width=300",
    category: "electronics",
  },
  {
    id: "home-decor",
    name: "Home Decor",
    description: "Stylish home decoration and furniture store",
    image: "/placeholder.svg?height=200&width=300",
    category: "home",
  },
]

interface TemplateCardProps {
  template: (typeof templates)[0]
  isSelected: boolean
  onSelect: () => void
}

function TemplateCard({ template, isSelected, onSelect }: TemplateCardProps) {
  return (
    
    <div
      className={cn(
        "border rounded-lg overflow-hidden cursor-pointer transition-all",
        isSelected ? "ring-2 ring-primary" : "hover:border-primary/50",
      )}
      onClick={onSelect}
    >
      <div className="relative">
        <Image
          src={template.image || "/placeholder.svg"}
          alt={template.name}
          width={300}
          height={200}
          className="w-full h-[150px] object-cover"
        />
        {isSelected && (
          <div className="absolute top-2 right-2 bg-primary text-primary-foreground rounded-full p-1">
            <Check className="h-4 w-4" />
          </div>
        )}
      </div>
      <div className="p-2">
        <h3 className="font-medium md:text-sm text-xs">{template.name}</h3>
        
      </div>
    </div>
  )
}

interface TemplateSelectorProps {
  selectedTemplate: string
  onSelectTemplate: (templateId: string) => void
}

export default function TemplateSelector({ selectedTemplate, onSelectTemplate }: TemplateSelectorProps) {
  const [searchQuery, setSearchQuery] = useState("");
  const [activeCategory, setActiveCategory] = useState("all");

  // Filter templates based on search query and category
  const filteredTemplates = templates.filter((template) => {
    const matchesSearch =
      template.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      template.description.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesCategory =
      activeCategory === "all" || template.category === activeCategory;
    return matchesSearch && matchesCategory;
  });

  return (
    <div className="space-y-4">
      <h2 className="text-lg font-semibold">Select Template</h2>

      {/* Search */}
      <div className="relative">
        <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
        <Input
          type="search"
          placeholder="Search templates..."
          className="pl-8"
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
        />
      </div>

      {/* Categories */}

      <div className="flex flex-wrap gap-2">
        {categories.map((category) => (
          <Button
            key={category.id}
            variant={activeCategory === category.id ? "default" : "outline"}
            size="sm"
            onClick={() => setActiveCategory(category.id)}
            className="text-xs h-8"
          >
            {category.name}
          </Button>
        ))}
      </div>

      {/* Templates Grid */}
      <div className="grid grid-cols-2 gap-4 pt-2">
        {filteredTemplates.map((template) => (
          <TemplateCard
            key={template.id}
            template={template}
            isSelected={selectedTemplate === template.id}
            onSelect={() => onSelectTemplate(template.id)}
          />
        ))}

        {filteredTemplates.length === 0 && (
          <div className="col-span-2 py-8 text-center text-muted-foreground">
            No templates found matching your search.
          </div>
        )}
      </div>

      {/* Apply Changes Button */}
      {/* <div className="sticky bottom-0 left-0 w-full p-2 bg-background border-t shadow-md mt-auto">
        <Button
          className="w-full h-10 sm:h-12 text-sm sm:text-base"
          onClick={() => {
            // In a real app, this would apply the selected template
            // For now, we'll just use the onSelectTemplate callback
          }}
        >
          Apply Changes
        </Button>
      </div> */}
    </div>
  );
}
