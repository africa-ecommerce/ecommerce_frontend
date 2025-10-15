// "use client"

// import { useState } from "react"
// import { ChevronDown, ChevronUp } from "lucide-react"
// import { Button } from "@/components/ui/button"
// import { formatPrice } from "@/lib/utils"

// interface Variation {
//   id: string
//   size?: string
//   color?: string
//   stock?: string
//   price?: string
// }

// interface ProductSpecification {
//   name: string
//   value: string | number | null | undefined
// }

// interface ProductSpecificationsProps {
//   product: {
//     size?: string
//     color?: string
   
//     price?: string
//     stock?: string
//     variations?: Variation[]
//     [key: string]: any
//   }
//   initialVisibleCount?: {
//     mobile: number
//     desktop: number
//   }
// }

// export function ProductSpecifications({
//   product,
//   initialVisibleCount = { mobile: 3, desktop: 4 },
// }: ProductSpecificationsProps) {
//   const [isExpanded, setIsExpanded] = useState(false)

//   // Only show specific specifications: size, color, weight, price, and stock
//   const formatValue = (key: string, value: any) => {
//     if (value === undefined || value === null) return null
    
//     switch (key) {
//       case 'price':
//         // Format price as currency
//         return  `${formatPrice(value)}` 
        
      
//       case 'stock':
//         // Format stock as integer
//         return  value
//       default:
//         // For string values, ensure first letter is capitalized
//         return typeof value === 'string' 
//           ? value.charAt(0).toUpperCase() + value.slice(1) 
//           : value
//     }
//   }
  
//   const formatName = (name: string) => {
//     // Format property name (e.g., "productSize" -> "Product Size")
//     return name
//       .charAt(0).toUpperCase() 
//       + name.slice(1).replace(/([A-Z])/g, ' $1')
//   }
  
//   const allowedSpecs = ["size", "color", "price", "stock"]
  
//   const allSpecs: ProductSpecification[] = allowedSpecs?.map(key => {
//       const value = product[key]
//       const formattedValue = formatValue(key, value)
//       return {
//         name: formatName(key),
//         value: formattedValue
//       }
//     })
//     .filter(spec => spec.value !== undefined && spec.value !== null)

//   const visibleSpecs = isExpanded ? allSpecs : allSpecs

//   // Helper function to safely render values
//   const renderValue = (value: any) => {
//     if (value === undefined || value === null || value === "") {
//       return "-"
//     }
    
//     // Handle objects and arrays
//     if (typeof value === 'object') {
//       return "[Object]"
//     }
    
//     return String(value)
//   }

//   return (
//     <div className="space-y-3">
//       <h3 className="text-lg font-semibold">Specifications</h3>

//       {product?.variations?.length === 0 && (
//         <div className="rounded-lg border divide-y">
//           {visibleSpecs?.map((spec, index) => (
//             <div
//               key={index}
//               className="flex items-center justify-between p-3 hover:bg-muted/50 transition-colors"
//             >
//               <div className="flex items-center gap-2">
//                 <span className="text-sm text-muted-foreground">
//                   {spec.name}
//                 </span>
//               </div>
//               <span className="text-sm font-medium text-right">
//                 {renderValue(spec.value)}
//               </span>
//             </div>
//           ))}
//         </div>
//       )}

//       {/* Show More/Less button only if we have more than the initial count */}
//       {false && allSpecs.length > initialVisibleCount.desktop && (
//         <Button
//           variant="ghost"
//           size="sm"
//           className="w-full flex items-center justify-center"
//           onClick={() => setIsExpanded(!isExpanded)}
//         >
//           {isExpanded ? (
//             <>
//               <span>Show Less</span>
//               <ChevronUp className="ml-2 h-4 w-4" />
//             </>
//           ) : (
//             <>
//               <span>Show More</span>
//               <ChevronDown className="ml-2 h-4 w-4" />
//             </>
//           )}
//         </Button>
//       )}

//       {product.variations && product.variations.length > 0 && (
//         <div className="mt-6 space-y-3">
//           <h3 className="text-lg font-semibold">Variations</h3>
//           <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-3">
//             {product.variations?.map((variation, index) => (
//               <div
//                 key={index}
//                 className="rounded-lg border p-3 hover:bg-muted/50 transition-colors"
//               >
//                 <div className="space-y-2">
//                   <div className="flex justify-between items-center">
//                     <span className="text-sm font-medium">
//                       Variation {index + 1}
//                     </span>
//                     {variation.price !== undefined && (
//                       <span className="text-sm font-semibold">
//                         ${formatPrice(variation.price)}
//                       </span>
//                     )}
//                   </div>
//                   <div className="space-y-1">
//                     <div className="flex justify-between">
//                       <span className="text-xs text-muted-foreground">
//                         Size
//                       </span>
//                       <span className="text-xs capitalize">
//                         {variation.size || "-"}
//                       </span>
//                     </div>
//                     <div className="flex justify-between">
//                       <span className="text-xs text-muted-foreground">
//                         Color
//                       </span>
//                       <span className="text-xs capitalize">
//                         {variation.color || "-"}
//                       </span>
//                     </div>
//                     <div className="flex justify-between">
//                       <span className="text-xs text-muted-foreground">
//                         Stock
//                       </span>
//                       <span className="text-xs capitalize">
//                         {variation.stock || "-"}
//                       </span>
//                     </div>
//                   </div>
//                 </div>
//               </div>
//             ))}
//           </div>
//         </div>
//       )}
//     </div>
//   );
// }



// "use client";

// import { useState } from "react";
// import { ChevronDown, ChevronUp } from "lucide-react";
// import { Button } from "@/components/ui/button";
// import { formatPrice } from "@/lib/utils";

// interface Variation {
//   id: string;
//   size?: string;
//   colors?: string[];
//   stock?: string;
//   price?: string;
// }

// interface ProductSpecification {
//   name: string;
//   value: string | number | null | undefined;
// }

// interface ProductSpecificationsProps {
//   product: {
//     size?: string;
//     colors?: string[];
//     price?: string;
//     stock?: string;
//     variations?: Variation[];
//     [key: string]: any;
//   };
//   initialVisibleCount?: {
//     mobile: number;
//     desktop: number;
//   };
// }

// export function ProductSpecifications({
//   product,
//   initialVisibleCount = { mobile: 3, desktop: 4 },
// }: ProductSpecificationsProps) {
//   const [isExpanded, setIsExpanded] = useState(false);

//   // Helper function to capitalize each word
//   const capitalizeWords = (text: string) => {
//     return text
//       .split(" ")
//       .map((word) => word.charAt(0).toUpperCase() + word.slice(1).toLowerCase())
//       .join(" ");
//   };

//   // Helper function to format colors array
//   const formatColors = (colors: string[]) => {
//     return colors.map((color) => capitalizeWords(color)).join(", ");
//   };

//   // Only show specific specifications: size, colors, weight, price, and stock
//   const formatValue = (key: string, value: any) => {
//     if (value === undefined || value === null) return null;

//     switch (key) {
//       case "price":
//         // Format price as currency
//         return `${formatPrice(value)}`;
//       case "colors":
//         // Handle colors array
//         if (Array.isArray(value) && value.length > 0) {
//           return formatColors(value);
//         }
//         return null;
//       case "stock":
//         // Format stock as integer
//         return value;
//       default:
//         // For string values, ensure first letter is capitalized
//         return typeof value === "string"
//           ? value.charAt(0).toUpperCase() + value.slice(1)
//           : value;
//     }
//   };

//   const formatName = (name: string) => {
//     // Format property name (e.g., "productSize" -> "Product Size")
//     return (
//       name.charAt(0).toUpperCase() + name.slice(1).replace(/([A-Z])/g, " $1")
//     );
//   };

//   const allowedSpecs = ["size", "colors", "price", "stock"];

//   const allSpecs: ProductSpecification[] = allowedSpecs
//     ?.map((key) => {
//       const value = product[key];
//       const formattedValue = formatValue(key, value);
//       return {
//         name: formatName(key),
//         value: formattedValue,
//       };
//     })
//     .filter((spec) => spec.value !== undefined && spec.value !== null);

//   const visibleSpecs = isExpanded ? allSpecs : allSpecs;

//   // Helper function to safely render values
//   const renderValue = (value: any) => {
//     if (value === undefined || value === null || value === "") {
//       return "-";
//     }

//     // Handle objects and arrays
//     if (typeof value === "object") {
//       return "[Object]";
//     }

//     return String(value);
//   };

//   return (
//     <div className="space-y-3">
//       <h3 className="text-lg font-semibold">Specifications</h3>

//       {product?.variations?.length === 0 && (
//         <div className="rounded-lg border divide-y">
//           {visibleSpecs?.map((spec, index) => (
//             <div
//               key={index}
//               className="flex items-start justify-between p-3 hover:bg-muted/50 transition-colors gap-3"
//             >
//               <div className="flex items-center gap-2 flex-shrink-0">
//                 <span className="text-sm text-muted-foreground">
//                   {spec.name}
//                 </span>
//               </div>
//               <span className="text-sm font-medium text-right break-words">
//                 {renderValue(spec.value)}
//               </span>
//             </div>
//           ))}
//         </div>
//       )}

//       {/* Show More/Less button only if we have more than the initial count */}
//       {false && allSpecs.length > initialVisibleCount.desktop && (
//         <Button
//           variant="ghost"
//           size="sm"
//           className="w-full flex items-center justify-center"
//           onClick={() => setIsExpanded(!isExpanded)}
//         >
//           {isExpanded ? (
//             <>
//               <span>Show Less</span>
//               <ChevronUp className="ml-2 h-4 w-4" />
//             </>
//           ) : (
//             <>
//               <span>Show More</span>
//               <ChevronDown className="ml-2 h-4 w-4" />
//             </>
//           )}
//         </Button>
//       )}

//       {product.variations && product.variations.length > 0 && (
//         <div className="mt-6 space-y-3">
//           <h3 className="text-lg font-semibold">Variations</h3>
//           <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-3">
//             {product.variations?.map((variation, index) => (
//               <div
//                 key={index}
//                 className="rounded-lg border p-3 hover:bg-muted/50 transition-colors"
//               >
//                 <div className="space-y-2">
//                   <div className="flex justify-between items-center">
//                     <span className="text-sm font-medium">
//                       Variation {index + 1}
//                     </span>
//                     {variation.price !== undefined && (
//                       <span className="text-sm font-semibold">
//                         ${formatPrice(variation.price)}
//                       </span>
//                     )}
//                   </div>
//                   <div className="space-y-1">
//                     <div className="flex justify-between items-start gap-2">
//                       <span className="text-xs text-muted-foreground flex-shrink-0">
//                         Size
//                       </span>
//                       <span className="text-xs capitalize text-right">
//                         {variation.size || "-"}
//                       </span>
//                     </div>
//                     <div className="flex justify-between items-start gap-2">
//                       <span className="text-xs text-muted-foreground flex-shrink-0">
//                         Colors
//                       </span>
//                       <span className="text-xs text-right break-words">
//                         {variation.colors && variation.colors.length > 0
//                           ? formatColors(variation.colors)
//                           : "-"}
//                       </span>
//                     </div>
//                     <div className="flex justify-between items-start gap-2">
//                       <span className="text-xs text-muted-foreground flex-shrink-0">
//                         Stock
//                       </span>
//                       <span className="text-xs capitalize text-right">
//                         {variation.stock || "-"}
//                       </span>
//                     </div>
//                   </div>
//                 </div>
//               </div>
//             ))}
//           </div>
//         </div>
//       )}
//     </div>
//   );
// }



"use client";

import { useState } from "react";
import { ChevronDown, ChevronUp } from "lucide-react";
import { Button } from "@/components/ui/button";
import { formatPrice } from "@/lib/utils";

interface Variation {
  id: string;
  size?: string;
  colors?: string[];
  stock?: string;
  // price?: string;
}

interface ProductSpecification {
  name: string;
  value: string | number | null | undefined;
}

interface ProductSpecificationsProps {
  product: {
    size?: string;
    colors?: string[];
    // price?: string;
    stock?: string;
    variations?: Variation[];
    [key: string]: any;
  };
  initialVisibleCount?: {
    mobile: number;
    desktop: number;
  };
}

export function ProductSpecifications({
  product,
  initialVisibleCount = { mobile: 3, desktop: 4 },
}: ProductSpecificationsProps) {
  const [isExpanded, setIsExpanded] = useState(false);

  // Helper function to capitalize each word
  const capitalizeWords = (text: string) => {
    return text
      .split(" ")
      .map((word) => word.charAt(0).toUpperCase() + word.slice(1).toLowerCase())
      .join(" ");
  };

  // Helper function to format colors array
  const formatColors = (colors: string[]) => {
    return colors.map((color) => capitalizeWords(color)).join(", ");
  };

  // Only show specific specifications: size, colors, weight, price, and stock
  const formatValue = (key: string, value: any) => {
    if (value === undefined || value === null) return null;

    switch (key) {
      // case "price":
      //   // Format price as currency
      //   return `${formatPrice(value)}`;
      case "colors":
        // Handle colors array
        if (Array.isArray(value) && value.length > 0) {
          return formatColors(value);
        }
        return null;
      case "stock":
        // Format stock as integer
        return value;
      default:
        // For string values, ensure first letter is capitalized
        return typeof value === "string"
          ? value.charAt(0).toUpperCase() + value.slice(1)
          : value;
    }
  };

  const formatName = (name: string) => {
    // Format property name (e.g., "productSize" -> "Product Size")
    return (
      name.charAt(0).toUpperCase() + name.slice(1).replace(/([A-Z])/g, " $1")
    );
  };

  const allowedSpecs = ["size", "colors", "stock"];

  const allSpecs: ProductSpecification[] = allowedSpecs
    ?.map((key) => {
      const value = product[key];
      const formattedValue = formatValue(key, value);
      return {
        name: formatName(key),
        value: formattedValue,
      };
    })
    .filter((spec) => spec.value !== undefined && spec.value !== null);

  const visibleSpecs = isExpanded ? allSpecs : allSpecs;

  // Helper function to safely render values
  const renderValue = (value: any) => {
    if (value === undefined || value === null || value === "") {
      return "-";
    }

    // Handle objects and arrays
    if (typeof value === "object") {
      return "[Object]";
    }

    return String(value);
  };

  return (
    <div className="space-y-3">
      <h3 className="text-lg font-semibold">Specifications</h3>

      {product?.variations?.length === 0 && (
        <div className="rounded-lg border divide-y">
          {visibleSpecs?.map((spec, index) => (
            <div
              key={index}
              className="flex items-start justify-between p-3 hover:bg-muted/50 transition-colors gap-3"
            >
              <div className="flex items-center gap-2 flex-shrink-0">
                <span className="text-sm text-muted-foreground">
                  {spec.name}
                </span>
              </div>
              <span className="text-sm font-medium text-right break-words">
                {renderValue(spec.value)}
              </span>
            </div>
          ))}
        </div>
      )}

      {/* Show More/Less button only if we have more than the initial count */}
      {false && allSpecs.length > initialVisibleCount.desktop && (
        <Button
          variant="ghost"
          size="sm"
          className="w-full flex items-center justify-center"
          onClick={() => setIsExpanded(!isExpanded)}
        >
          {isExpanded ? (
            <>
              <span>Show Less</span>
              <ChevronUp className="ml-2 h-4 w-4" />
            </>
          ) : (
            <>
              <span>Show More</span>
              <ChevronDown className="ml-2 h-4 w-4" />
            </>
          )}
        </Button>
      )}

      {product.variations && product.variations.length > 0 && (
        <div className="mt-6 space-y-3">
          <h3 className="text-lg font-semibold">Variations</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-3">
            {product.variations?.map((variation, index) => (
              <div
                key={index}
                className="rounded-lg border p-3 hover:bg-muted/50 transition-colors"
              >
                <div className="space-y-2">
                  <div className="flex justify-between items-center">
                    <span className="text-sm font-medium">
                      Variation {index + 1}
                    </span>
                    
                  </div>
                  <div className="space-y-1">
                    <div className="flex justify-between items-start gap-2">
                      <span className="text-xs text-muted-foreground flex-shrink-0">
                        Size
                      </span>
                      <span className="text-xs capitalize text-right">
                        {variation.size || "-"}
                      </span>
                    </div>
                    <div className="flex justify-between items-start gap-2">
                      <span className="text-xs text-muted-foreground flex-shrink-0">
                        Colors
                      </span>
                      <span className="text-xs text-right break-words">
                        {variation.colors && variation.colors.length > 0
                          ? formatColors(variation.colors)
                          : "-"}
                      </span>
                    </div>
                    <div className="flex justify-between items-start gap-2">
                      <span className="text-xs text-muted-foreground flex-shrink-0">
                        Stock
                      </span>
                      <span className="text-xs capitalize text-right">
                        {variation.stock || "-"}
                      </span>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}