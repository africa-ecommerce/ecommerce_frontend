// "use client"

// import { useState, useRef, useEffect } from "react"
// import Link from "next/link"
// import { motion, AnimatePresence } from "framer-motion"
// import {
//   AlertCircle,
//   ArrowUpRight,
//   Check,
//   ChevronLeft,
//   ChevronRight,
//   Clock,
//   Download,
//   Filter,
//   HelpCircle,
//   ImageIcon,
//   LineChart,
//   Loader2,
//   MoreHorizontal,
//   PackageCheck,
//   PackagePlus,
//   Pencil,
//   Plus,
//   QrCode,
//   RefreshCw,
//   Search,
//   Settings,
//   Sliders,
//   Tag,
//   Trash2,
//   TrendingDown,
//   TrendingUp,
//   Upload,
//   Users,
//   X,
//   Zap,
// } from "lucide-react"

// import { Button } from "@/components/ui/button"
// import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
// import { Input } from "@/components/ui/input"
// import { Progress } from "@/components/ui/progress"
// import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
// import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip"
// import { Badge } from "@/components/ui/badge"
// import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
// import {
//   DropdownMenu,
//   DropdownMenuContent,
//   DropdownMenuItem,
//   DropdownMenuLabel,
//   DropdownMenuSeparator,
//   DropdownMenuTrigger,
// } from "@/components/ui/dropdown-menu"
// import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
// import { Checkbox } from "@/components/ui/checkbox"
// import { Switch } from "@/components/ui/switch"
// import { Textarea } from "@/components/ui/textarea"
// import {
//   Dialog,
//   DialogContent,
//   DialogDescription,
//   DialogFooter,
//   DialogHeader,
//   DialogTitle,
// } from "@/components/ui/dialog"
// import { Label } from "@/components/ui/label"
// import { cn } from "@/lib/utils"
// import { ScrollArea } from "@/components/ui/scroll-area"

// interface ProductFormData {
//   name: string
//   category: string
//   description: string
//   basePrice: string
//   salePrice: string
//   sku: string
//   barcode: string
//   weight: string
//   dimensions: {
//     length: string
//     width: string
//     height: string
//   }
//   hasVariations: boolean
//   variations: {
//     id: string
//     size?: string
//     color?: string
//     sku: string
//     stock: number
//     price?: number
//   }[]
//   images: File[]
//   imageUrls: string[]
//   tags: string[]
// }



// export function AddProductModal({ open, onOpenChange }: { open: boolean, onOpenChange: (open: boolean) => void }) {

//   if (!open) return null
//   const [currentStep, setCurrentStep] = useState(0)
//   const [direction, setDirection] = useState(0)
//   const [formData, setFormData] = useState<ProductFormData>({
//     name: "",
//     category: "",
//     description: "",
//     basePrice: "",
//     salePrice: "",
//     sku: "",
//     barcode: "",
//     weight: "",
//     dimensions: {
//       length: "",
//       width: "",
//       height: "",
//     },
//     hasVariations: false,
//     variations: [],
//     images: [],
//     imageUrls: [],
//     tags: [],
//   })
//   const [newTag, setNewTag] = useState("")
//   const fileInputRef = useRef<HTMLInputElement>(null)
//   const dropAreaRef = useRef<HTMLDivElement>(null)
//   const [isSubmitting, setIsSubmitting] = useState(false)

//   const steps = [
//     { id: "category", title: "Category" },
//     { id: "details", title: "Details" },
//     { id: "variations", title: "Variations" },
//     { id: "media", title: "Media" },
//     { id: "review", title: "Review" },
//   ]

//   // Handle drag and drop for images
//   useEffect(() => {
//     const dropArea = dropAreaRef.current
//     if (!dropArea) return

//     const handleDragOver = (e: DragEvent) => {
//       e.preventDefault()
//       e.stopPropagation()
//       dropArea.classList.add("border-primary")
//     }

//     const handleDragLeave = (e: DragEvent) => {
//       e.preventDefault()
//       e.stopPropagation()
//       dropArea.classList.remove("border-primary")
//     }

//     const handleDrop = (e: DragEvent) => {
//       e.preventDefault()
//       e.stopPropagation()
//       dropArea.classList.remove("border-primary")

//       if (e.dataTransfer?.files) {
//         handleFiles(e.dataTransfer.files)
//       }
//     }

//     dropArea.addEventListener("dragover", handleDragOver)
//     dropArea.addEventListener("dragleave", handleDragLeave)
//     dropArea.addEventListener("drop", handleDrop)

//     return () => {
//       dropArea.removeEventListener("dragover", handleDragOver)
//       dropArea.removeEventListener("dragleave", handleDragLeave)
//       dropArea.removeEventListener("drop", handleDrop)
//     }
//   }, [])

//   const handleFiles = (files: FileList) => {
//     const imageFiles = Array.from(files).filter((file) => file.type.startsWith("image/"))
//     if (imageFiles.length === 0) return

//     const newImages = [...formData.images, ...imageFiles]
//     const newImageUrls = [...formData.imageUrls, ...imageFiles.map((file) => URL.createObjectURL(file))]

//     setFormData({
//       ...formData,
//       images: newImages,
//       imageUrls: newImageUrls,
//     })
//   }

//   const handleFileInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
//     if (e.target.files && e.target.files.length > 0) {
//       handleFiles(e.target.files)
//     }
//   }

//   const removeImage = (index: number) => {
//     const newImages = [...formData.images]
//     const newImageUrls = [...formData.imageUrls]

//     URL.revokeObjectURL(newImageUrls[index])
//     newImages.splice(index, 1)
//     newImageUrls.splice(index, 1)

//     setFormData({
//       ...formData,
//       images: newImages,
//       imageUrls: newImageUrls,
//     })
//   }

//   const handleInputChange = (field: string, value: string | boolean) => {
//     setFormData({
//       ...formData,
//       [field]: value,
//     })
//   }

//   const handleDimensionChange = (field: keyof ProductFormData["dimensions"], value: string) => {
//     setFormData({
//       ...formData,
//       dimensions: {
//         ...formData.dimensions,
//         [field]: value,
//       },
//     })
//   }

//   const addVariation = () => {
//     const newVariation = {
//       id: `var-${Date.now()}`,
//       size: "",
//       color: "",
//       sku: `${formData.sku}-${formData.variations.length + 1}`,
//       stock: 0,
//     }

//     setFormData({
//       ...formData,
//       variations: [...formData.variations, newVariation],
//     })
//   }

//   const updateVariation = (index: number, field: string, value: string | number) => {
//     const updatedVariations = [...formData.variations]
//     updatedVariations[index] = {
//       ...updatedVariations[index],
//       [field]: value,
//     }

//     setFormData({
//       ...formData,
//       variations: updatedVariations,
//     })
//   }

//   const removeVariation = (index: number) => {
//     const updatedVariations = [...formData.variations]
//     updatedVariations.splice(index, 1)

//     setFormData({
//       ...formData,
//       variations: updatedVariations,
//     })
//   }

//   const addTag = () => {
//     if (newTag.trim() && !formData.tags.includes(newTag.trim())) {
//       setFormData({
//         ...formData,
//         tags: [...formData.tags, newTag.trim()],
//       })
//       setNewTag("")
//     }
//   }

//   const removeTag = (tag: string) => {
//     setFormData({
//       ...formData,
//       tags: formData.tags.filter((t) => t !== tag),
//     })
//   }

//   const goToNextStep = () => {
//     if (currentStep < steps.length - 1) {
//       setDirection(1)
//       setCurrentStep(currentStep + 1)
//     }
//   }

//   const goToPreviousStep = () => {
//     if (currentStep > 0) {
//       setDirection(-1)
//       setCurrentStep(currentStep - 1)
//     }
//   }

//   const handleSubmit = async () => {
//     setIsSubmitting(true)
//     // Simulate API call
//     await new Promise((resolve) => setTimeout(resolve, 1500))
//     console.log("Form submitted:", formData)
//     setIsSubmitting(false)
//     onOpenChange(false)
//   }

//   const variants = {
//     enter: (direction: number) => ({
//       x: direction > 0 ? "100%" : "-100%",
//       opacity: 0,
//     }),
//     center: {
//       x: 0,
//       opacity: 1,
//     },
//     exit: (direction: number) => ({
//       x: direction < 0 ? "100%" : "-100%",
//       opacity: 0,
//     }),
//   }

//   const isStepValid = () => {
//     switch (currentStep) {
//       case 0: return !!formData.category
//       case 1: return !!formData.name && !!formData.basePrice
//       case 2: 
//         if (!formData.hasVariations) return true
//         return formData.variations.length > 0 && formData.variations.every((v) => !!v.sku && v.stock >= 0)
//       case 3: return true
//       case 4: return true
//       default: return false
//     }
//   }

//   // Reset form when modal closes
//   useEffect(() => {
//     if (!open) {
//       setTimeout(() => {
//         setCurrentStep(0)
//         setFormData({
//           name: "",
//           category: "",
//           description: "",
//           basePrice: "",
//           salePrice: "",
//           sku: "",
//           barcode: "",
//           weight: "",
//           dimensions: {
//             length: "",
//             width: "",
//             height: "",
//           },
//           hasVariations: false,
//           variations: [],
//           images: [],
//           imageUrls: [],
//           tags: [],
//         })
//       }, 300)
//     }
//   }, [open])

//   return (
//     <div className="fixed inset-0 z-50 flex items-end justify-center bg-black/50 backdrop-blur-sm sm:items-center">
//       {/* Mobile-optimized container */}
//       <motion.div
//         initial={{ y: "100%" }}
//         animate={{ y: open ? 0 : "100%" }}
//         exit={{ y: "100%" }}
//         transition={{ type: "spring", damping: 30, stiffness: 300 }}
//         className="relative flex h-[90vh] w-full flex-col overflow-hidden rounded-t-2xl bg-background shadow-xl sm:h-[85vh] sm:max-h-[700px] sm:w-[95vw] sm:max-w-2xl sm:rounded-lg"
//         onClick={(e) => e.stopPropagation()}
//       >
//         {/* Header with swipe indicator for mobile */}
//         <div className="sticky top-0 z-10 bg-background">
//           <div className="flex justify-center py-2 sm:hidden">
//             <div className="h-1 w-10 rounded-full bg-muted-foreground/30"></div>
//           </div>
//           <div className="flex items-center justify-between border-b px-4 py-3 sm:px-6">
//             <div className="flex items-center gap-2">
//               {currentStep > 0 && (
//                 <Button 
//                   variant="ghost" 
//                   size="icon" 
//                   onClick={goToPreviousStep} 
//                   className="h-9 w-9 rounded-full"
//                 >
//                   <ChevronLeft className="h-5 w-5" />
//                   <span className="sr-only">Back</span>
//                 </Button>
//               )}
//               <h2 className="text-lg font-semibold">Add Product</h2>
//             </div>
//             <Button 
//               variant="ghost" 
//               size="icon" 
//               onClick={() => onOpenChange(false)} 
//               className="h-9 w-9 rounded-full"
//             >
//               <X className="h-5 w-5" />
//               <span className="sr-only">Close</span>
//             </Button>
//           </div>
//         </div>

//         {/* Progress indicator - simplified for mobile */}
//         <div className="sticky top-[60px] z-10 border-b bg-background px-4 py-2 sm:px-6">
//           <div className="relative flex items-center justify-between">
//             <div className="absolute left-0 right-0 top-1/2 h-[2px] bg-muted">
//               <div
//                 className="h-full bg-primary transition-all duration-300 ease-in-out"
//                 style={{ width: `${(currentStep / (steps.length - 1)) * 100}%` }}
//               />
//             </div>
//             {steps.map((step, index) => (
//               <button
//                 key={step.id}
//                 onClick={() => setCurrentStep(index)}
//                 className={cn(
//                   "relative z-10 flex h-6 w-6 items-center justify-center rounded-full text-xs font-medium transition-colors",
//                   index < currentStep
//                     ? "bg-primary text-primary-foreground"
//                     : index === currentStep
//                       ? "border-2 border-primary bg-background text-foreground"
//                       : "border border-muted-foreground/30 bg-background text-muted-foreground",
//                 )}
//               >
//                 {index < currentStep ? <Check className="h-3 w-3" /> : index + 1}
//                 <span className="sr-only">{step.title}</span>
//               </button>
//             ))}
//           </div>
//           <p className="mt-1 text-center text-xs font-medium text-muted-foreground sm:hidden">
//             {steps[currentStep].title}
//           </p>
//         </div>

//         {/* Form content with swipe gestures */}
//         <ScrollArea className="flex-1">
//           <AnimatePresence initial={false} custom={direction} mode="wait">
//             <motion.div
//               key={currentStep}
//               custom={direction}
//               variants={variants}
//               initial="enter"
//               animate="center"
//               exit="exit"
//               transition={{ type: "tween", duration: 0.3 }}
//               className="h-full p-4 sm:p-6"
//             >
//               {/* Step 1: Category - Improved mobile layout */}
//               {currentStep === 0 && (
//                 <div className="space-y-6">
//                   <div className="space-y-3">
//                     <Label htmlFor="category">Product Category</Label>
//                     <Select value={formData.category} onValueChange={(value) => handleInputChange("category", value)}>
//                       <SelectTrigger id="category" className="h-12 text-base">
//                         <SelectValue placeholder="Select a category" />
//                       </SelectTrigger>
//                       <SelectContent>
//                         <SelectItem value="skincare" className="text-base">Skincare</SelectItem>
//                         <SelectItem value="haircare" className="text-base">Hair Care</SelectItem>
//                         <SelectItem value="bodycare" className="text-base">Body Care</SelectItem>
//                         <SelectItem value="makeup" className="text-base">Makeup</SelectItem>
//                         <SelectItem value="fragrance" className="text-base">Fragrance</SelectItem>
//                         <SelectItem value="accessories" className="text-base">Accessories</SelectItem>
//                       </SelectContent>
//                     </Select>
//                   </div>

//                   {formData.category && (
//                     <div className="rounded-xl border bg-muted/30 p-4">
//                       <h3 className="mb-3 text-sm font-medium">Category Requirements</h3>
//                       <ul className="space-y-3">
//                         {/* {categoryRequirements[formData.category]?.map((req, i) => (
//                           <li key={i} className="flex items-start gap-3">
//                             <Check className="mt-0.5 h-4 w-4 flex-shrink-0 text-green-500" />
//                             <span className="text-sm">{req}</span>
//                           </li>
//                         ))} */}
//                       </ul>
//                     </div>
//                   )}
//                 </div>
//               )}

//               {/* Step 2: Details - Optimized input sizes */}
//               {currentStep === 1 && (
//                 <div className="space-y-6">
//                   <div className="space-y-3">
//                     <Label htmlFor="name">Product Name</Label>
//                     <Input
//                       id="name"
//                       placeholder="e.g. Shea Butter Moisturizer"
//                       value={formData.name}
//                       onChange={(e) => handleInputChange("name", e.target.value)}
//                       className="h-12 text-base"
//                     />
//                   </div>

//                   <div className="space-y-3">
//                     <Label htmlFor="description">Description</Label>
//                     <Textarea
//                       id="description"
//                       placeholder="Describe your product..."
//                       className="min-h-[120px] text-base"
//                       value={formData.description}
//                       onChange={(e) => handleInputChange("description", e.target.value)}
//                     />
//                   </div>

//                   <div className="grid grid-cols-2 gap-4">
//                     <div className="space-y-3">
//                       <Label htmlFor="basePrice">Price (₦)</Label>
//                       <Input
//                         id="basePrice"
//                         type="number"
//                         placeholder="0.00"
//                         value={formData.basePrice}
//                         onChange={(e) => handleInputChange("basePrice", e.target.value)}
//                         className="h-12 text-base"
//                       />
//                     </div>
//                     <div className="space-y-3">
//                       <Label htmlFor="salePrice">Sale Price (₦)</Label>
//                       <Input
//                         id="salePrice"
//                         type="number"
//                         placeholder="0.00"
//                         value={formData.salePrice}
//                         onChange={(e) => handleInputChange("salePrice", e.target.value)}
//                         className="h-12 text-base"
//                       />
//                     </div>
//                   </div>

//                   <div className="grid grid-cols-2 gap-4">
                    
//                     <div className="space-y-3">
//                       <Label htmlFor="weight">Weight (g)</Label>
//                       <Input
//                         id="weight"
//                         type="number"
//                         placeholder="e.g. 250"
//                         value={formData.weight}
//                         onChange={(e) => handleInputChange("weight", e.target.value)}
//                         className="h-12 text-base"
//                       />
//                     </div>
//                   </div>

//                   <div className="space-y-3">
//                     <Label>Dimensions (cm)</Label>
//                     <div className="grid grid-cols-3 gap-3">
//                       <Input
//                         placeholder="Length"
//                         value={formData.dimensions.length}
//                         onChange={(e) => handleDimensionChange("length", e.target.value)}
//                         className="h-12 text-base"
//                       />
//                       <Input
//                         placeholder="Width"
//                         value={formData.dimensions.width}
//                         onChange={(e) => handleDimensionChange("width", e.target.value)}
//                         className="h-12 text-base"
//                       />
//                       <Input
//                         placeholder="Height"
//                         value={formData.dimensions.height}
//                         onChange={(e) => handleDimensionChange("height", e.target.value)}
//                         className="h-12 text-base"
//                       />
//                     </div>
//                   </div>

//                   <div className="space-y-3">
//                     <Label>Tags</Label>
//                     <div className="flex flex-wrap gap-2">
//                       {formData.tags.map((tag) => (
//                         <Badge 
//                           key={tag} 
//                           variant="secondary"
//                           className="flex items-center gap-1 px-3 py-1 text-sm"
//                         >
//                           {tag}
//                           <button 
//                             onClick={() => removeTag(tag)}
//                             className="rounded-full p-0.5 hover:bg-muted"
//                           >
//                             <X className="h-3 w-3" />
//                           </button>
//                         </Badge>
//                       ))}
//                     </div>
//                     <div className="flex gap-2">
//                       <Input
//                         placeholder="Add tag"
//                         value={newTag}
//                         onChange={(e) => setNewTag(e.target.value)}
//                         onKeyDown={(e) => e.key === "Enter" && addTag()}
//                         className="h-12 flex-1 text-base"
//                       />
//                       <Button 
//                         variant="outline" 
//                         size="lg" 
//                         onClick={addTag}
//                         className="h-12"
//                       >
//                         Add
//                       </Button>
//                     </div>
//                   </div>
//                 </div>
//               )}

//               {/* Step 3: Variations - Mobile-friendly cards */}
//               {currentStep === 2 && (
//                 <div className="space-y-6">
//                   <div className="flex items-center justify-between rounded-lg bg-muted/30 p-4">
//                     <Label htmlFor="hasVariations" className="flex-1">
//                       <div className="flex items-center gap-3">
//                         <Switch
//                           id="hasVariations"
//                           checked={formData.hasVariations}
//                           onCheckedChange={(checked) => handleInputChange("hasVariations", checked)}
//                         />
//                         <span className="font-medium">Multiple Variations</span>
//                       </div>
//                     </Label>
//                     {formData.hasVariations && (
//                       <Button 
//                         variant="outline" 
//                         size="sm" 
//                         onClick={addVariation}
//                         className="h-9"
//                       >
//                         <Plus className="mr-1 h-4 w-4" /> Add
//                       </Button>
//                     )}
//                   </div>

//                   {!formData.hasVariations ? (
//                     <div className="rounded-xl border bg-muted/30 p-4 text-center">
//                       <p className="text-muted-foreground">This product will be managed as a single item.</p>
//                     </div>
//                   ) : formData.variations.length === 0 ? (
//                     <div className="flex flex-col items-center justify-center rounded-xl border-2 border-dashed bg-muted/30 p-8 text-center">
//                       <ImageIcon className="mb-3 h-8 w-8 text-muted-foreground" />
//                       <p className="mb-3 font-medium">No variations added</p>
//                       <Button onClick={addVariation}>
//                         <Plus className="mr-2 h-4 w-4" /> Add First Variation
//                       </Button>
//                     </div>
//                   ) : (
//                     <div className="space-y-4">
//                       {formData.variations.map((variation, index) => (
//                         <div key={variation.id} className="rounded-xl border bg-muted/30 p-4">
//                           <div className="mb-4 flex items-center justify-between">
//                             <h3 className="font-medium">Variation {index + 1}</h3>
//                             <Button
//                               variant="ghost"
//                               size="icon"
//                               onClick={() => removeVariation(index)}
//                               className="text-destructive hover:text-destructive/80"
//                             >
//                               <Trash2 className="h-5 w-5" />
//                             </Button>
//                           </div>
//                           <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
//                             <div className="space-y-3">
//                               <Label htmlFor={`size-${index}`}>Size</Label>
//                               <Input
//                                 id={`size-${index}`}
//                                 placeholder="e.g. Small, 250ml"
//                                 value={variation.size || ""}
//                                 onChange={(e) => updateVariation(index, "size", e.target.value)}
//                                 className="h-12 text-base"
//                               />
//                             </div>
//                             <div className="space-y-3">
//                               <Label htmlFor={`color-${index}`}>Color</Label>
//                               <Input
//                                 id={`color-${index}`}
//                                 placeholder="e.g. Red, #FF0000"
//                                 value={variation.color || ""}
//                                 onChange={(e) => updateVariation(index, "color", e.target.value)}
//                                 className="h-12 text-base"
//                               />
//                             </div>
//                             <div className="space-y-3">
//                               <Label htmlFor={`sku-${index}`}>SKU</Label>
//                               <Input
//                                 id={`sku-${index}`}
//                                 placeholder="e.g. SB-250-RED"
//                                 value={variation.sku}
//                                 onChange={(e) => updateVariation(index, "sku", e.target.value)}
//                                 className="h-12 text-base"
//                               />
//                             </div>
//                             <div className="space-y-3">
//                               <Label htmlFor={`stock-${index}`}>Stock</Label>
//                               <Input
//                                 id={`stock-${index}`}
//                                 type="number"
//                                 placeholder="0"
//                                 value={variation.stock}
//                                 onChange={(e) => updateVariation(index, "stock", Number(e.target.value) || 0)}
//                                 className="h-12 text-base"
//                               />
//                             </div>
//                           </div>
//                         </div>
//                       ))}
//                     </div>
//                   )}
//                 </div>
//               )}

//               {/* Step 4: Media - Improved drag and drop */}
//               {currentStep === 3 && (
//                 <div className="space-y-6">
//                   <div className="space-y-3">
//                     <Label>Product Images</Label>
//                     <div
//                       ref={dropAreaRef}
//                       className="flex min-h-[200px] cursor-pointer flex-col items-center justify-center gap-3 rounded-xl border-2 border-dashed border-muted-foreground/30 bg-muted/30 p-6 text-center transition-colors hover:border-primary hover:bg-muted/50"
//                       onClick={() => fileInputRef.current?.click()}
//                     >
//                       <input
//                         ref={fileInputRef}
//                         type="file"
//                         accept="image/*"
//                         multiple
//                         className="hidden"
//                         onChange={handleFileInputChange}
//                       />
//                       <div className="rounded-full bg-primary/10 p-3 text-primary">
//                         <Upload className="h-6 w-6" />
//                       </div>
//                       <div>
//                         <p className="font-medium">Drag & drop images here</p>
//                         <p className="text-sm text-muted-foreground">or click to browse files</p>
//                       </div>
//                       <Button variant="outline" size="lg" className="mt-2">
//                         Select Images
//                       </Button>
//                     </div>
//                   </div>

//                   {formData.imageUrls.length > 0 && (
//                     <div className="space-y-3">
//                       <Label>Uploaded Images ({formData.imageUrls.length})</Label>
//                       <div className="grid grid-cols-3 gap-3 sm:grid-cols-4">
//                         {formData.imageUrls.map((url, index) => (
//                           <div key={index} className="group relative aspect-square overflow-hidden rounded-lg">
//                             <img
//                               src={url}
//                               alt={`Preview ${index + 1}`}
//                               className="h-full w-full object-cover"
//                             />
//                             <button
//                               onClick={(e) => {
//                                 e.stopPropagation()
//                                 removeImage(index)
//                               }}
//                               className="absolute right-2 top-2 rounded-full bg-destructive p-1.5 text-white opacity-0 transition-opacity group-hover:opacity-100"
//                             >
//                               <Trash2 className="h-3.5 w-3.5" />
//                             </button>
//                           </div>
//                         ))}
//                       </div>
//                     </div>
//                   )}
//                 </div>
//               )}

//               {/* Step 5: Review - Summary cards */}
//               {currentStep === 4 && (
//                 <div className="space-y-6">
//                   <div className="space-y-3">
//                     <h3 className="text-lg font-medium">Review Your Product</h3>
//                     <p className="text-muted-foreground">
//                       Check all details before submitting. You can go back to edit any section.
//                     </p>
//                   </div>

//                   <div className="space-y-4">
//                     <div className="rounded-xl border bg-muted/30 p-5">
//                       <h4 className="mb-3 text-sm font-medium">Basic Information</h4>
//                       <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
//                         <div>
//                           <p className="text-sm text-muted-foreground">Name</p>
//                           <p className="font-medium">{formData.name || "-"}</p>
//                         </div>
//                         <div>
//                           <p className="text-sm text-muted-foreground">Category</p>
//                           <p className="font-medium capitalize">{formData.category || "-"}</p>
//                         </div>
//                         <div>
//                           <p className="text-sm text-muted-foreground">Description</p>
//                           <p className="font-medium">
//                             {formData.description ? (
//                               formData.description
//                             ) : (
//                               <span className="text-muted-foreground">No description</span>
//                             )}
//                           </p>
//                         </div>
//                       </div>
//                     </div>

//                     <div className="rounded-xl border bg-muted/30 p-5">
//                       <h4 className="mb-3 text-sm font-medium">Pricing & Inventory</h4>
//                       <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
//                         <div>
//                           <p className="text-sm text-muted-foreground">Base Price</p>
//                           <p className="font-medium">₦{formData.basePrice || "0.00"}</p>
//                         </div>
//                         {formData.salePrice && (
//                           <div>
//                             <p className="text-sm text-muted-foreground">Sale Price</p>
//                             <p className="font-medium">₦{formData.salePrice}</p>
//                           </div>
//                         )}
//                         <div>
//                           <p className="text-sm text-muted-foreground">SKU</p>
//                           <p className="font-medium">{formData.sku || "-"}</p>
//                         </div>
//                         <div>
//                           <p className="text-sm text-muted-foreground">Weight</p>
//                           <p className="font-medium">{formData.weight ? `${formData.weight}g` : "-"}</p>
//                         </div>
//                       </div>
//                     </div>

//                     {formData.hasVariations && formData.variations.length > 0 && (
//                       <div className="rounded-xl border bg-muted/30 p-5">
//                         <h4 className="mb-3 text-sm font-medium">Variations ({formData.variations.length})</h4>
//                         <div className="space-y-3">
//                           {formData.variations.map((variation, index) => (
//                             <div key={variation.id} className="rounded-lg border p-3">
//                               <div className="grid grid-cols-2 gap-4">
//                                 <div>
//                                   <p className="text-sm text-muted-foreground">Variation</p>
//                                   <p className="font-medium">
//                                     {variation.size || variation.color
//                                       ? [variation.size, variation.color].filter(Boolean).join(" / ")
//                                       : `Variation ${index + 1}`}
//                                   </p>
//                                 </div>
//                                 <div>
//                                   <p className="text-sm text-muted-foreground">SKU</p>
//                                   <p className="font-medium">{variation.sku}</p>
//                                 </div>
//                                 <div>
//                                   <p className="text-sm text-muted-foreground">Stock</p>
//                                   <p className="font-medium">{variation.stock}</p>
//                                 </div>
//                                 <div>
//                                   <p className="text-sm text-muted-foreground">Price</p>
//                                   <p className="font-medium">₦{variation.price || formData.basePrice || "0.00"}</p>
//                                 </div>
//                               </div>
//                             </div>
//                           ))}
//                         </div>
//                       </div>
//                     )}

//                     {formData.imageUrls.length > 0 && (
//                       <div className="rounded-xl border bg-muted/30 p-5">
//                         <h4 className="mb-3 text-sm font-medium">Images ({formData.imageUrls.length})</h4>
//                         <div className="grid grid-cols-3 gap-3 sm:grid-cols-4">
//                           {formData.imageUrls.map((url, index) => (
//                             <div key={index} className="aspect-square overflow-hidden rounded-lg">
//                               <img
//                                 src={url}
//                                 alt={`Preview ${index + 1}`}
//                                 className="h-full w-full object-cover"
//                               />
//                             </div>
//                           ))}
//                         </div>
//                       </div>
//                     )}
//                   </div>
//                 </div>
//               )}
//             </motion.div>
//           </AnimatePresence>
//         </ScrollArea>

//         {/* Footer with floating action on mobile */}
//         <div className="sticky bottom-0 border-t bg-background/95 p-4 backdrop-blur-sm sm:p-6">
//           <div className="flex items-center justify-between gap-3">
//             <Button
//               variant="outline"
//               onClick={() => onOpenChange(false)}
//               className="flex-1 sm:flex-none"
//             >
//               Cancel
//             </Button>
//             <div className="flex items-center gap-3">
//               {currentStep > 0 && (
//                 <Button
//                   variant="outline"
//                   size="icon"
//                   onClick={goToPreviousStep}
//                   className="h-11 w-11 rounded-full sm:hidden"
//                 >
//                   <ChevronLeft className="h-5 w-5" />
//                 </Button>
//               )}
//               {currentStep < steps.length - 1 ? (
//                 <Button
//                   onClick={goToNextStep}
//                   disabled={!isStepValid()}
//                   className="flex-1 sm:flex-none"
//                 >
//                   Continue <ChevronRight className="ml-1 h-4 w-4" />
//                 </Button>
//               ) : (
//                 <Button
//                   onClick={handleSubmit}
//                   disabled={isSubmitting}
//                   className="flex-1 sm:flex-none"
//                 >
//                   {isSubmitting ? (
//                     <>
//                       <Loader2 className="mr-2 h-4 w-4 animate-spin" />
//                       Saving...
//                     </>
//                   ) : (
//                     "Save Product"
//                   )}
//                 </Button>
//               )}
//             </div>
//           </div>
//         </div>
//       </motion.div>
//     </div>
//   )
// }

// // Helper data for category requirements
// const categoryRequirements = {
//   skincare: [
//     "Include skin type compatibility",
//     "List key ingredients",
//     "Specify product volume/weight"
//   ],
//   haircare: [
//     "Include hair type compatibility",
//     "List key ingredients",
//     "Specify product volume"
//   ],
//   bodycare: [
//     "Include product volume/weight",
//     "List key ingredients",
//     "Specify usage instructions"
//   ],
//   makeup: [
//     "Include shades/variants",
//     "List key ingredients",
//     "Specify product weight"
//   ],
//   fragrance: [
//     "Include scent notes",
//     "Specify bottle size",
//     "Indicate concentration"
//   ],
//   accessories: [
//     "Include dimensions",
//     "Specify materials used",
//     "Add color variations"
//   ]

// }



"use client"

import { useState, useRef, useEffect } from "react"
import Link from "next/link"
import { motion, AnimatePresence } from "framer-motion"
import {
  AlertCircle,
  ArrowUpRight,
  Check,
  ChevronLeft,
  ChevronRight,
  Clock,
  Download,
  Filter,
  HelpCircle,
  ImageIcon,
  LineChart,
  Loader2,
  MoreHorizontal,
  PackageCheck,
  PackagePlus,
  Pencil,
  Plus,
  QrCode,
  RefreshCw,
  Search,
  Settings,
  Sliders,
  Tag,
  Trash2,
  TrendingDown,
  TrendingUp,
  Upload,
  Users,
  X,
  Zap,
} from "lucide-react"

import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Progress } from "@/components/ui/progress"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip"
import { Badge } from "@/components/ui/badge"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Checkbox } from "@/components/ui/checkbox"
import { Switch } from "@/components/ui/switch"
import { Textarea } from "@/components/ui/textarea"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog"
import { Label } from "@/components/ui/label"
import { cn } from "@/lib/utils"
import { ScrollArea } from "@/components/ui/scroll-area"
// import { useFormResolver } from "@/hooks/use-form-resolver"
import { useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import { Form, FormControl, FormDescription, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form"
import { useFormResolver } from "@/hooks/useFormResolver"
import { productFormSchema } from "@/zod/schema"
import { ZodType } from "zod"

export function AddProductModal({ open, onOpenChange }: { open: boolean, onOpenChange: (open: boolean) => void }) {
  const [currentStep, setCurrentStep] = useState(0)
  const [direction, setDirection] = useState(0)
  const [newTag, setNewTag] = useState("")
  const fileInputRef = useRef<HTMLInputElement>(null)
  const dropAreaRef = useRef<HTMLDivElement>(null)
  
   if (!open) return null

   interface ProductFormData {
    name: string;
    category: string;
    description: string;
    basePrice: string;
    salePrice: string;
    sku: string;
    barcode: string;
    weight: string;
    dimensions: {
      length: string;
      width: string;
      height: string;
    };
    hasVariations: boolean;
    variations: {
      id: string;
      size?: string;
      color?: string;
      sku: string;
      stock: number;
      price?: number;
    }[];
    images: File[];
    imageUrls: string[];
    tags: string[];
  }
  const steps = [
    { id: "category", title: "Category" },
    { id: "details", title: "Details" },
    { id: "variations", title: "Variations" },
    { id: "media", title: "Media" },
    { id: "review", title: "Review" },
  ]

  const form = useForm<ProductFormData>({
    resolver: zodResolver(
      productFormSchema as unknown as ZodType<ProductFormData>
    ),
    defaultValues: {
      name: "",
      category: "",
      description: "",
      basePrice: "",
      salePrice: "",
      sku: "",
      barcode: "",
      weight: "",
      dimensions: {
        length: "",
        width: "",
        height: "",
      },
      hasVariations: false,
      variations: [],
      images: [],
      imageUrls: [],
      tags: [],
    },
  });

  const { watch, setValue, handleSubmit, formState: { errors, isSubmitting } } = form
  const formData = watch()

  // Handle drag and drop for images
  useEffect(() => {
    const dropArea = dropAreaRef.current
    if (!dropArea) return

    const handleDragOver = (e: DragEvent) => {
      e.preventDefault()
      e.stopPropagation()
      dropArea.classList.add("border-primary")
    }

    const handleDragLeave = (e: DragEvent) => {
      e.preventDefault()
      e.stopPropagation()
      dropArea.classList.remove("border-primary")
    }

    const handleDrop = (e: DragEvent) => {
      e.preventDefault()
      e.stopPropagation()
      dropArea.classList.remove("border-primary")

      if (e.dataTransfer?.files) {
        handleFiles(e.dataTransfer.files)
      }
    }

    dropArea.addEventListener("dragover", handleDragOver)
    dropArea.addEventListener("dragleave", handleDragLeave)
    dropArea.addEventListener("drop", handleDrop)

    return () => {
      dropArea.removeEventListener("dragover", handleDragOver)
      dropArea.removeEventListener("dragleave", handleDragLeave)
      dropArea.removeEventListener("drop", handleDrop)
    }
  }, [])

  const handleFiles = (files: FileList) => {
    const imageFiles = Array.from(files).filter((file) => file.type.startsWith("image/"))
    if (imageFiles.length === 0) return

    const newImages = [...formData.images || [], ...imageFiles]
    const newImageUrls = [...formData.imageUrls || [], ...imageFiles.map((file) => URL.createObjectURL(file))]

    setValue("images", newImages)
    setValue("imageUrls", newImageUrls)
  }

  const handleFileInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files.length > 0) {
      handleFiles(e.target.files)
    }
  }

  const removeImage = (index: number) => {
    const newImages = [...formData.images || []]
    const newImageUrls = [...formData.imageUrls || []]

    URL.revokeObjectURL(newImageUrls[index])
    newImages.splice(index, 1)
    newImageUrls.splice(index, 1)

    setValue("images", newImages)
    setValue("imageUrls", newImageUrls)
  }

  const addVariation = () => {
    const newVariation = {
      id: `var-${Date.now()}`,
      size: "",
      color: "",
      sku: `${formData.sku}-${(formData.variations?.length || 0) + 1}`,
      stock: 0,
    }

    setValue("variations", [...formData.variations || [], newVariation])
  }

  const updateVariation = (index: number, field: string, value: string | number) => {
    const updatedVariations = [...formData.variations || []]
    updatedVariations[index] = {
      ...updatedVariations[index],
      [field]: value,
    }

    setValue("variations", updatedVariations)
  }

  const removeVariation = (index: number) => {
    const updatedVariations = [...formData.variations || []]
    updatedVariations.splice(index, 1)

    setValue("variations", updatedVariations)
  }

  const addTag = () => {
    if (newTag.trim() && !formData.tags?.includes(newTag.trim())) {
      setValue("tags", [...formData.tags || [], newTag.trim()])
      setNewTag("")
    }
  }

  const removeTag = (tag: string) => {
    setValue("tags", formData.tags?.filter((t) => t !== tag) || [])
  }

  const goToNextStep = () => {
    if (currentStep < steps.length - 1) {
      setDirection(1)
      setCurrentStep(currentStep + 1)
    }
  }

  const goToPreviousStep = () => {
    if (currentStep > 0) {
      setDirection(-1)
      setCurrentStep(currentStep - 1)
    }
  }

  const onSubmit = async (data: ProductFormData) => {
    try {
      // Simulate API call
      await new Promise((resolve) => setTimeout(resolve, 1500))
      console.log("Form submitted:", data)
      onOpenChange(false)
      return { success: true }
    } catch (error) {
      console.error("Submission error:", error)
      return { success: false, error }
    }
  }

  const { form: { submit } } = useFormResolver<ProductFormData>(
    onSubmit,
    productFormSchema,
    () => onOpenChange(false)
  )

  const variants = {
    enter: (direction: number) => ({
      x: direction > 0 ? "100%" : "-100%",
      opacity: 0,
    }),
    center: {
      x: 0,
      opacity: 1,
    },
    exit: (direction: number) => ({
      x: direction < 0 ? "100%" : "-100%",
      opacity: 0,
    }),
  }

  const isStepValid = () => {
    switch (currentStep) {
      case 0: return !!formData.category && !errors.category
      case 1: return !!formData.name && !!formData.basePrice && !errors.name && !errors.basePrice
      case 2: 
        if (!formData.hasVariations) return true
        return (formData.variations?.length || 0) > 0 && 
          formData.variations?.every((v) => !!v.sku && v.stock >= 0) &&
          !errors.variations
      case 3: return true
      case 4: return true
      default: return false
    }
  }

  // Reset form when modal closes
  useEffect(() => {
    if (!open) {
      setTimeout(() => {
        setCurrentStep(0)
        form.reset()
      }, 300)
    }
  }, [open, form])

  return (
    <div className="fixed inset-0 z-50 flex items-end justify-center bg-black/50 backdrop-blur-sm sm:items-center">
      <motion.div
        initial={{ y: "100%" }}
        animate={{ y: open ? 0 : "100%" }}
        exit={{ y: "100%" }}
        transition={{ type: "spring", damping: 30, stiffness: 300 }}
        className="relative flex h-[90vh] w-full flex-col overflow-hidden rounded-t-2xl bg-background shadow-xl sm:h-[85vh] sm:max-h-[700px] sm:w-[95vw] sm:max-w-2xl sm:rounded-lg"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header with swipe indicator for mobile */}
        <div className="sticky top-0 z-10 bg-background">
          <div className="flex justify-center py-2 sm:hidden">
            <div className="h-1 w-10 rounded-full bg-muted-foreground/30"></div>
          </div>
          <div className="flex items-center justify-between border-b px-4 py-3 sm:px-6">
            <div className="flex items-center gap-2">
              {currentStep > 0 && (
                <Button
                  variant="ghost"
                  size="icon"
                  onClick={goToPreviousStep}
                  className="h-9 w-9 rounded-full"
                >
                  <ChevronLeft className="h-5 w-5" />
                  <span className="sr-only">Back</span>
                </Button>
              )}
              <h2 className="text-lg font-semibold">Add Product</h2>
            </div>
            <Button
              variant="ghost"
              size="icon"
              onClick={() => onOpenChange(false)}
              className="h-9 w-9 rounded-full"
            >
              <X className="h-5 w-5" />
              <span className="sr-only">Close</span>
            </Button>
          </div>
        </div>

        {/* Progress indicator - simplified for mobile */}
        <div className="sticky top-[60px] z-10 border-b bg-background px-4 py-2 sm:px-6">
          <div className="relative flex items-center justify-between">
            <div className="absolute left-0 right-0 top-1/2 h-[2px] bg-muted">
              <div
                className="h-full bg-primary transition-all duration-300 ease-in-out"
                style={{
                  width: `${(currentStep / (steps.length - 1)) * 100}%`,
                }}
              />
            </div>
            {steps.map((step, index) => (
              <button
                key={step.id}
                onClick={() => setCurrentStep(index)}
                className={cn(
                  "relative z-10 flex h-6 w-6 items-center justify-center rounded-full text-xs font-medium transition-colors",
                  index < currentStep
                    ? "bg-primary text-primary-foreground"
                    : index === currentStep
                    ? "border-2 border-primary bg-background text-foreground"
                    : "border border-muted-foreground/30 bg-background text-muted-foreground"
                )}
              >
                {index < currentStep ? (
                  <Check className="h-3 w-3" />
                ) : (
                  index + 1
                )}
                <span className="sr-only">{step.title}</span>
              </button>
            ))}
          </div>
          <p className="mt-1 text-center text-xs font-medium text-muted-foreground sm:hidden">
            {steps[currentStep].title}
          </p>
        </div>

        {/* Form content with swipe gestures */}
        <ScrollArea className="flex-1">
          <Form {...form}>
            <form onSubmit={submit}>
              <AnimatePresence initial={false} custom={direction} mode="wait">
                <motion.div
                  key={currentStep}
                  custom={direction}
                  variants={variants}
                  initial="enter"
                  animate="center"
                  exit="exit"
                  transition={{ type: "tween", duration: 0.3 }}
                  className="h-full p-4 sm:p-6"
                >
                  {/* Step 1: Category - Improved mobile layout */}
                  {currentStep === 0 && (
                    <div className="space-y-6">
                      <div className="space-y-3">
                        <FormField
                          control={form.control}
                          name="category"
                          render={({ field }) => (
                            <FormItem>
                              <FormLabel>Product Category</FormLabel>
                              <Select
                                onValueChange={field.onChange}
                                defaultValue={field.value}
                              >
                                <FormControl>
                                  <SelectTrigger
                                    id="category"
                                    className="h-12 text-base"
                                  >
                                    <SelectValue placeholder="Select a category" />
                                  </SelectTrigger>
                                </FormControl>
                                <SelectContent>
                                  <SelectItem
                                    value="skincare"
                                    className="text-base"
                                  >
                                    Skincare
                                  </SelectItem>
                                  <SelectItem
                                    value="haircare"
                                    className="text-base"
                                  >
                                    Hair Care
                                  </SelectItem>
                                  <SelectItem
                                    value="bodycare"
                                    className="text-base"
                                  >
                                    Body Care
                                  </SelectItem>
                                  <SelectItem
                                    value="makeup"
                                    className="text-base"
                                  >
                                    Makeup
                                  </SelectItem>
                                  <SelectItem
                                    value="fragrance"
                                    className="text-base"
                                  >
                                    Fragrance
                                  </SelectItem>
                                  <SelectItem
                                    value="accessories"
                                    className="text-base"
                                  >
                                    Accessories
                                  </SelectItem>
                                </SelectContent>
                              </Select>
                              <FormMessage />
                            </FormItem>
                          )}
                        />
                      </div>

                      {formData.category && (
                        <div className="rounded-xl border bg-muted/30 p-4">
                          <h3 className="mb-3 text-sm font-medium">
                            Category Requirements
                          </h3>
                          <ul className="space-y-3">
                            {(categoryRequirements as Record<string, string[]>)[
                              formData.category
                            ]?.map((req, i) => (
                              <li key={i} className="flex items-start gap-3">
                                <Check className="mt-0.5 h-4 w-4 flex-shrink-0 text-green-500" />
                                <span className="text-sm">{req}</span>
                              </li>
                            ))}
                          </ul>
                        </div>
                      )}
                    </div>
                  )}

                  {/* Step 2: Details - Optimized input sizes */}
                  {currentStep === 1 && (
                    <div className="space-y-6">
                      <div className="space-y-3">
                        <FormField
                          control={form.control}
                          name="name"
                          render={({ field }) => (
                            <FormItem>
                              <FormLabel>Product Name</FormLabel>
                              <FormControl>
                                <Input
                                  placeholder="e.g. Shea Butter Moisturizer"
                                  className="h-12 text-base"
                                  {...field}
                                />
                              </FormControl>
                              <FormMessage />
                            </FormItem>
                          )}
                        />
                      </div>

                      <div className="space-y-3">
                        <FormField
                          control={form.control}
                          name="description"
                          render={({ field }) => (
                            <FormItem>
                              <FormLabel>Description</FormLabel>
                              <FormControl>
                                <Textarea
                                  placeholder="Describe your product..."
                                  className="min-h-[120px] text-base"
                                  {...field}
                                />
                              </FormControl>
                              <FormMessage />
                            </FormItem>
                          )}
                        />
                      </div>

                      <div className="grid grid-cols-2 gap-4">
                        <div className="space-y-3">
                          <FormField
                            control={form.control}
                            name="basePrice"
                            render={({ field }) => (
                              <FormItem>
                                <FormLabel>Price (₦)</FormLabel>
                                <FormControl>
                                  <Input
                                    type="number"
                                    placeholder="0.00"
                                    className="h-12 text-base"
                                    {...field}
                                  />
                                </FormControl>
                                <FormMessage />
                              </FormItem>
                            )}
                          />
                        </div>
                        <div className="space-y-3">
                          <FormField
                            control={form.control}
                            name="salePrice"
                            render={({ field }) => (
                              <FormItem>
                                <FormLabel>Sale Price (₦)</FormLabel>
                                <FormControl>
                                  <Input
                                    type="number"
                                    placeholder="0.00"
                                    className="h-12 text-base"
                                    {...field}
                                  />
                                </FormControl>
                                <FormMessage />
                              </FormItem>
                            )}
                          />
                        </div>
                      </div>

                      <div className="grid grid-cols-2 gap-4">
                        <div className="space-y-3">
                          <FormField
                            control={form.control}
                            name="sku"
                            render={({ field }) => (
                              <FormItem>
                                <FormLabel>SKU</FormLabel>
                                <FormControl>
                                  <Input
                                    placeholder="e.g. SB-250"
                                    className="h-12 text-base"
                                    {...field}
                                  />
                                </FormControl>
                                <FormMessage />
                              </FormItem>
                            )}
                          />
                        </div>
                        <div className="space-y-3">
                          <FormField
                            control={form.control}
                            name="weight"
                            render={({ field }) => (
                              <FormItem>
                                <FormLabel>Weight (g)</FormLabel>
                                <FormControl>
                                  <Input
                                    type="number"
                                    placeholder="e.g. 250"
                                    className="h-12 text-base"
                                    {...field}
                                  />
                                </FormControl>
                                <FormMessage />
                              </FormItem>
                            )}
                          />
                        </div>
                      </div>

                      <div className="space-y-3">
                        <FormLabel>Dimensions (cm)</FormLabel>
                        <div className="grid grid-cols-3 gap-3">
                          <FormField
                            control={form.control}
                            name="dimensions.length"
                            render={({ field }) => (
                              <FormItem>
                                <FormControl>
                                  <Input
                                    placeholder="Length"
                                    className="h-12 text-base"
                                    {...field}
                                  />
                                </FormControl>
                                <FormMessage />
                              </FormItem>
                            )}
                          />
                          <FormField
                            control={form.control}
                            name="dimensions.width"
                            render={({ field }) => (
                              <FormItem>
                                <FormControl>
                                  <Input
                                    placeholder="Width"
                                    className="h-12 text-base"
                                    {...field}
                                  />
                                </FormControl>
                                <FormMessage />
                              </FormItem>
                            )}
                          />
                          <FormField
                            control={form.control}
                            name="dimensions.height"
                            render={({ field }) => (
                              <FormItem>
                                <FormControl>
                                  <Input
                                    placeholder="Height"
                                    className="h-12 text-base"
                                    {...field}
                                  />
                                </FormControl>
                                <FormMessage />
                              </FormItem>
                            )}
                          />
                        </div>
                      </div>

                      <div className="space-y-3">
                        <FormLabel>Tags</FormLabel>
                        <div className="flex flex-wrap gap-2">
                          {formData.tags?.map((tag) => (
                            <Badge
                              key={tag}
                              variant="secondary"
                              className="flex items-center gap-1 px-3 py-1 text-sm"
                            >
                              {tag}
                              <button
                                onClick={() => removeTag(tag)}
                                className="rounded-full p-0.5 hover:bg-muted"
                              >
                                <X className="h-3 w-3" />
                              </button>
                            </Badge>
                          ))}
                        </div>
                        <div className="flex gap-2">
                          <Input
                            placeholder="Add tag"
                            value={newTag}
                            onChange={(e) => setNewTag(e.target.value)}
                            onKeyDown={(e) => e.key === "Enter" && addTag()}
                            className="h-12 flex-1 text-base"
                          />
                          <Button
                            variant="outline"
                            size="lg"
                            onClick={addTag}
                            className="h-12"
                            type="button"
                          >
                            Add
                          </Button>
                        </div>
                      </div>
                    </div>
                  )}

                  {/* Step 3: Variations - Mobile-friendly cards */}
                  {currentStep === 2 && (
                    <div className="space-y-6">
                      <div className="flex items-center justify-between rounded-lg bg-muted/30 p-4">
                        <FormField
                          control={form.control}
                          name="hasVariations"
                          render={({ field }) => (
                            <FormItem>
                              <FormLabel
                                htmlFor="hasVariations"
                                className="flex-1"
                              >
                                <div className="flex items-center gap-3">
                                  <Switch
                                    id="hasVariations"
                                    checked={field.value}
                                    onCheckedChange={field.onChange}
                                  />
                                  <span className="font-medium">
                                    Multiple Variations
                                  </span>
                                </div>
                              </FormLabel>
                            </FormItem>
                          )}
                        />
                        {formData.hasVariations && (
                          <Button
                            variant="outline"
                            size="sm"
                            onClick={addVariation}
                            className="h-9"
                            type="button"
                          >
                            <Plus className="mr-1 h-4 w-4" /> Add
                          </Button>
                        )}
                      </div>

                      {!formData.hasVariations ? (
                        <div className="rounded-xl border bg-muted/30 p-4 text-center">
                          <p className="text-muted-foreground">
                            This product will be managed as a single item.
                          </p>
                        </div>
                      ) : (formData.variations?.length || 0) === 0 ? (
                        <div className="flex flex-col items-center justify-center rounded-xl border-2 border-dashed bg-muted/30 p-8 text-center">
                          <ImageIcon className="mb-3 h-8 w-8 text-muted-foreground" />
                          <p className="mb-3 font-medium">
                            No variations added
                          </p>
                          <Button onClick={addVariation} type="button">
                            <Plus className="mr-2 h-4 w-4" /> Add First
                            Variation
                          </Button>
                        </div>
                      ) : (
                        <div className="space-y-4">
                          {formData.variations?.map((variation, index) => (
                            <div
                              key={variation.id}
                              className="rounded-xl border bg-muted/30 p-4"
                            >
                              <div className="mb-4 flex items-center justify-between">
                                <h3 className="font-medium">
                                  Variation {index + 1}
                                </h3>
                                <Button
                                  variant="ghost"
                                  size="icon"
                                  onClick={() => removeVariation(index)}
                                  className="text-destructive hover:text-destructive/80"
                                  type="button"
                                >
                                  <Trash2 className="h-5 w-5" />
                                </Button>
                              </div>
                              <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
                                <div className="space-y-3">
                                  <Label htmlFor={`size-${index}`}>Size</Label>
                                  <Input
                                    id={`size-${index}`}
                                    placeholder="e.g. Small, 250ml"
                                    value={variation.size || ""}
                                    onChange={(e) =>
                                      updateVariation(
                                        index,
                                        "size",
                                        e.target.value
                                      )
                                    }
                                    className="h-12 text-base"
                                  />
                                </div>
                                <div className="space-y-3">
                                  <Label htmlFor={`color-${index}`}>
                                    Color
                                  </Label>
                                  <Input
                                    id={`color-${index}`}
                                    placeholder="e.g. Red, #FF0000"
                                    value={variation.color || ""}
                                    onChange={(e) =>
                                      updateVariation(
                                        index,
                                        "color",
                                        e.target.value
                                      )
                                    }
                                    className="h-12 text-base"
                                  />
                                </div>
                                <div className="space-y-3">
                                  <Label htmlFor={`sku-${index}`}>SKU</Label>
                                  <Input
                                    id={`sku-${index}`}
                                    placeholder="e.g. SB-250-RED"
                                    value={variation.sku}
                                    onChange={(e) =>
                                      updateVariation(
                                        index,
                                        "sku",
                                        e.target.value
                                      )
                                    }
                                    className="h-12 text-base"
                                  />
                                </div>
                                <div className="space-y-3">
                                  <Label htmlFor={`stock-${index}`}>
                                    Stock
                                  </Label>
                                  <Input
                                    id={`stock-${index}`}
                                    type="number"
                                    placeholder="0"
                                    value={variation.stock}
                                    onChange={(e) =>
                                      updateVariation(
                                        index,
                                        "stock",
                                        Number(e.target.value) || 0
                                      )
                                    }
                                    className="h-12 text-base"
                                  />
                                </div>
                              </div>
                            </div>
                          ))}
                        </div>
                      )}
                    </div>
                  )}

                  {/* Step 4: Media - Improved drag and drop */}
                  {currentStep === 3 && (
                    <div className="space-y-6">
                      <div className="space-y-3">
                        <Label>Product Images</Label>
                        <div
                          ref={dropAreaRef}
                          className="flex min-h-[200px] cursor-pointer flex-col items-center justify-center gap-3 rounded-xl border-2 border-dashed border-muted-foreground/30 bg-muted/30 p-6 text-center transition-colors hover:border-primary hover:bg-muted/50"
                          onClick={() => fileInputRef.current?.click()}
                        >
                          <input
                            ref={fileInputRef}
                            type="file"
                            accept="image/*"
                            multiple
                            className="hidden"
                            onChange={handleFileInputChange}
                          />
                          <div className="rounded-full bg-primary/10 p-3 text-primary">
                            <Upload className="h-6 w-6" />
                          </div>
                          <div>
                            <p className="font-medium">
                              Drag & drop images here
                            </p>
                            <p className="text-sm text-muted-foreground">
                              or click to browse files
                            </p>
                          </div>
                          <Button
                            variant="outline"
                            size="lg"
                            className="mt-2"
                            type="button"
                          >
                            Select Images
                          </Button>
                        </div>
                      </div>

                      {(formData.imageUrls?.length || 0) > 0 && (
                        <div className="space-y-3">
                          <Label>
                            Uploaded Images ({formData.imageUrls?.length})
                          </Label>
                          <div className="grid grid-cols-3 gap-3 sm:grid-cols-4">
                            {formData.imageUrls?.map((url, index) => (
                              <div
                                key={index}
                                className="group relative aspect-square overflow-hidden rounded-lg"
                              >
                                <img
                                  src={url}
                                  alt={`Preview ${index + 1}`}
                                  className="h-full w-full object-cover"
                                />
                                <button
                                  onClick={(e) => {
                                    e.stopPropagation();
                                    removeImage(index);
                                  }}
                                  className="absolute right-2 top-2 rounded-full bg-destructive p-1.5 text-white opacity-0 transition-opacity group-hover:opacity-100"
                                  type="button"
                                >
                                  <Trash2 className="h-3.5 w-3.5" />
                                </button>
                              </div>
                            ))}
                          </div>
                        </div>
                      )}
                    </div>
                  )}

                  {/* Step 5: Review - Summary cards */}
                  {currentStep === 4 && (
                    <div className="space-y-6">
                      <div className="space-y-3">
                        <h3 className="text-lg font-medium">
                          Review Your Product
                        </h3>
                        <p className="text-muted-foreground">
                          Check all details before submitting. You can go back
                          to edit any section.
                        </p>
                      </div>

                      <div className="space-y-4">
                        <div className="rounded-xl border bg-muted/30 p-5">
                          <h4 className="mb-3 text-sm font-medium">
                            Basic Information
                          </h4>
                          <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
                            <div>
                              <p className="text-sm text-muted-foreground">
                                Name
                              </p>
                              <p className="font-medium">
                                {formData.name || "-"}
                              </p>
                            </div>
                            <div>
                              <p className="text-sm text-muted-foreground">
                                Category
                              </p>
                              <p className="font-medium capitalize">
                                {formData.category || "-"}
                              </p>
                            </div>
                            <div>
                              <p className="text-sm text-muted-foreground">
                                Description
                              </p>
                              <p className="font-medium">
                                {formData.description ? (
                                  formData.description
                                ) : (
                                  <span className="text-muted-foreground">
                                    No description
                                  </span>
                                )}
                              </p>
                            </div>
                          </div>
                        </div>

                        <div className="rounded-xl border bg-muted/30 p-5">
                          <h4 className="mb-3 text-sm font-medium">
                            Pricing & Inventory
                          </h4>
                          <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
                            <div>
                              <p className="text-sm text-muted-foreground">
                                Base Price
                              </p>
                              <p className="font-medium">
                                ₦{formData.basePrice || "0.00"}
                              </p>
                            </div>
                            {formData.salePrice && (
                              <div>
                                <p className="text-sm text-muted-foreground">
                                  Sale Price
                                </p>
                                <p className="font-medium">
                                  ₦{formData.salePrice}
                                </p>
                              </div>
                            )}
                            <div>
                              <p className="text-sm text-muted-foreground">
                                SKU
                              </p>
                              <p className="font-medium">
                                {formData.sku || "-"}
                              </p>
                            </div>
                            <div>
                              <p className="text-sm text-muted-foreground">
                                Weight
                              </p>
                              <p className="font-medium">
                                {formData.weight ? `${formData.weight}g` : "-"}
                              </p>
                            </div>
                          </div>
                        </div>

                        {formData.hasVariations &&
                          (formData.variations?.length || 0) > 0 && (
                            <div className="rounded-xl border bg-muted/30 p-5">
                              <h4 className="mb-3 text-sm font-medium">
                                Variations ({formData.variations?.length})
                              </h4>
                              <div className="space-y-3">
                                {formData.variations?.map(
                                  (variation, index) => (
                                    <div
                                      key={variation.id}
                                      className="rounded-lg border p-3"
                                    >
                                      <div className="grid grid-cols-2 gap-4">
                                        <div>
                                          <p className="text-sm text-muted-foreground">
                                            Variation
                                          </p>
                                          <p className="font-medium">
                                            {variation.size || variation.color
                                              ? [
                                                  variation.size,
                                                  variation.color,
                                                ]
                                                  .filter(Boolean)
                                                  .join(" / ")
                                              : `Variation ${index + 1}`}
                                          </p>
                                        </div>
                                        <div>
                                          <p className="text-sm text-muted-foreground">
                                            SKU
                                          </p>
                                          <p className="font-medium">
                                            {variation.sku}
                                          </p>
                                        </div>
                                        <div>
                                          <p className="text-sm text-muted-foreground">
                                            Stock
                                          </p>
                                          <p className="font-medium">
                                            {variation.stock}
                                          </p>
                                        </div>
                                        <div>
                                          <p className="text-sm text-muted-foreground">
                                            Price
                                          </p>
                                          <p className="font-medium">
                                            ₦
                                            {variation.price ||
                                              formData.basePrice ||
                                              "0.00"}
                                          </p>
                                        </div>
                                      </div>
                                    </div>
                                  )
                                )}
                              </div>
                            </div>
                          )}

                        {(formData.imageUrls?.length || 0) > 0 && (
                          <div className="rounded-xl border bg-muted/30 p-5">
                            <h4 className="mb-3 text-sm font-medium">
                              Images ({formData.imageUrls?.length})
                            </h4>
                            <div className="grid grid-cols-3 gap-3 sm:grid-cols-4">
                              {formData.imageUrls?.map((url, index) => (
                                <div
                                  key={index}
                                  className="aspect-square overflow-hidden rounded-lg"
                                >
                                  <img
                                    src={url}
                                    alt={`Preview ${index + 1}`}
                                    className="h-full w-full object-cover"
                                  />
                                </div>
                              ))}
                            </div>
                          </div>
                        )}
                      </div>
                    </div>
                  )}
                </motion.div>
              </AnimatePresence>
            </form>
          </Form>
        </ScrollArea>

        {/* Footer with floating action on mobile */}
        <div className="sticky bottom-0 border-t bg-background/95 p-4 backdrop-blur-sm sm:p-6">
          <div className="flex items-center justify-between gap-3">
            <Button
              variant="outline"
              onClick={() => onOpenChange(false)}
              className="flex-1 sm:flex-none"
              type="button"
            >
              Cancel
            </Button>
            <div className="flex items-center gap-3">
              {currentStep > 0 && (
                <Button
                  variant="outline"
                  size="icon"
                  onClick={goToPreviousStep}
                  className="h-11 w-11 rounded-full sm:hidden"
                  type="button"
                >
                  <ChevronLeft className="h-5 w-5" />
                </Button>
              )}
              {currentStep < steps.length - 1 ? (
                <Button
                  onClick={goToNextStep}
                  disabled={!isStepValid()}
                  className="flex-1 sm:flex-none"
                  type="button"
                >
                  Continue <ChevronRight className="ml-1 h-4 w-4" />
                </Button>
              ) : (
                <Button
                  onClick={submit}
                  disabled={isSubmitting}
                  className="flex-1 sm:flex-none"
                  type="button"
                >
                  {isSubmitting ? (
                    <>
                      <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                      Saving...
                    </>
                  ) : (
                    "Save Product"
                  )}
                </Button>
              )}
            </div>
          </div>
        </div>
      </motion.div>
    </div>
  );
}

// Helper data for category requirements
const categoryRequirements = {
  skincare: [
    "Include skin type compatibility",
    "List key ingredients",
    "Specify product volume/weight"
  ],
  haircare: [
    "Include hair type compatibility",
    "List key ingredients",
    "Specify product volume"
  ],
  bodycare: [
    "Include product volume/weight",
    "List key ingredients",
    "Specify usage instructions"
  ],
  makeup: [
    "Include shades/variants",
    "List key ingredients",
    "Specify product weight"
  ],
  fragrance: [
    "Include scent notes",
    "Specify bottle size",
    "Indicate concentration"
  ],
  accessories: [
    "Include dimensions",
    "Specify materials used",
    "Add color variations"
  ]
}