



"use client";

import { useState } from "react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Check, Search } from "lucide-react";
import Image from "next/image";
import { cn } from "@/lib/utils";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

// Template categories
const categories = [
  { id: "all", name: "All" },
  { id: "fashion", name: "Fashion" },
  { id: "beauty", name: "Beauty" },
  { id: "electronics", name: "Electronics" },
  { id: "home", name: "Home" },
  { id: "sports", name: "Sports" },
  { id: "jewelry", name: "Jewelry" },
];

// Template data
const templates = [
  {
    id: "basic",
    name: "basic",
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
];

// Available pages
const pages = [
  {
    id: "index",
    name: "Home",
    description: "Main landing page",
    image: "/placeholder.svg?height=200&width=300",
  },
  {
    id: "marketplace",
    name: "Marketplace",
    description: "Browse all products",
    image: "/placeholder.svg?height=200&width=300",
  },
  {
    id: "product-details",
    name: "Product Details",
    description: "Individual product page",
    image: "/placeholder.svg?height=200&width=300",
  },
  {
    id: "blog",
    name: "Blog",
    description: "Articles and news",
    image: "/placeholder.svg?height=200&width=300",
  },
];

interface TemplateCardProps {
  template: (typeof templates)[0] | (typeof pages)[0];
  isSelected: boolean;
  onSelect: () => void;
}


function TemplateCard({ template, isSelected, onSelect }: TemplateCardProps) {
  return (
    <div
      className={cn(
        "border rounded-lg overflow-hidden transition-all",
        isSelected
          ? "ring-2 ring-primary cursor-default opacity-75"
          : "hover:border-primary/50 cursor-pointer"
      )}
      onClick={isSelected ? undefined : onSelect}
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
        <p className="text-xs text-muted-foreground mt-1 line-clamp-2">
          {template.description}
        </p>
      </div>
    </div>
  );
}

interface TemplateSelectorProps {
  selectedTemplate: string;
  onSelectTemplate: (templateId: string) => void;
  selectedPage?: string;
  onSelectPage?: (pageId: string) => void;
}

export default function TemplateSelector({
  selectedTemplate,
  onSelectTemplate,
  selectedPage,
  onSelectPage = () => {},
}: TemplateSelectorProps) {
  const [searchQuery, setSearchQuery] = useState("");
  const [activeCategory, setActiveCategory] = useState("all");
  const [activeTab, setActiveTab] = useState("templates");

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
      <h2 className="text-lg font-semibold">Customize Your Store</h2>

      

      {/* Main Tabs: Templates vs Pages */}
      <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
        <TabsList className="grid grid-cols-2 w-full mb-4">
          <TabsTrigger value="templates">Templates</TabsTrigger>
          <TabsTrigger value="pages">Pages</TabsTrigger>
        </TabsList>

        <TabsContent value="templates" className="mt-0 space-y-4">

       
        <div className="relative">
        <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
        <Input
          type="search"
          placeholder={"Search templates..."
          }
          className="pl-8"
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
        />
      </div>
          {/* Categories for templates */}
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
        </TabsContent>

        <TabsContent value="pages" className="mt-0">
          {/* Pages Grid */}
          <div className="grid grid-cols-2 gap-4 pt-2">
            {pages.map((page) => (
              <TemplateCard
                key={page.id}
                template={page}
                isSelected={selectedPage === page.id}
                onSelect={() => onSelectPage(page.id)}
              />
            ))}

           
          </div>
        </TabsContent>
      </Tabs>
    </div>
  );
}