



// "use client";

// import type React from "react";

// import { useState, useEffect, useCallback, useRef } from "react";
// import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
// import { Button } from "@/components/ui/button";
// import { Input } from "@/components/ui/input";
// import { ScrollArea } from "@/components/ui/scroll-area";
// import {
//   Save,
//   Download,
//   Upload,
//   Monitor,
//   Smartphone,
//   TabletSmartphone,
//   ArrowLeft,
//   Undo,
//   Redo,
//   Loader2,
//   Menu,
//   X,
// } from "lucide-react";
// import TemplateSelector from "./template-selector";
// import ColorCustomizer from "./color-customizer";
// import TypographyCustomizer from "./typography-customizer";
// import LayoutCustomizer from "./layout-customizer";
// import PreviewFrame from "./preview-frame";
// import { useToast } from "@/hooks/use-toast";
// import PublishDialog from "./publish-dialog";

// // Version for schema compatibility
// const CURRENT_VERSION = "1.0.0";

// // Default template configuration
// const defaultConfig = {
//   templateId: "basic",
//   styles: {
//     FONT_FAMILY: "Inter, sans-serif",
//     TEXT_COLOR: "#333333",
//     BACKGROUND_COLOR: "#ffffff",
//     PRIMARY_COLOR: "#000000",
//     SECONDARY_COLOR: "#f5f5f5",
//     ACCENT_COLOR: "#ff4081",
//     FOOTER_BACKGROUND: "#000000",
//     FOOTER_TEXT_COLOR: "#ffffff",
//   },
//   content: {
//     BRAND_NAME: "Fashion Boutique",
//     HEADER_TEXT: "Fashion Boutique",
//     HERO_TITLE: "Spring Collection 2025",
//     HERO_DESCRIPTION:
//       "Discover our latest fashion pieces designed for the modern lifestyle",
//     PRIMARY_CTA_TEXT: "Shop Women",
//     SECONDARY_CTA_TEXT: "Shop Men",
//     PRODUCTS_TITLE: "Featured Products",
//     ABOUT_TEXT:
//       "<p>We are a modern fashion boutique dedicated to bringing you the latest trends at affordable prices.</p>",
//     INSTAGRAM_LINK: "https://instagram.com/fashionboutique",
//     FACEBOOK_LINK: "https://facebook.com/fashionboutique",
//     TWITTER_LINK: "https://twitter.com/fashionboutique",
//     PHONE_NUMBER: "+1234567890",
//     MAIL: "contact@fashionboutique.com",
//   },
//   metadata: {
//     title: "Fashion Boutique - Modern Clothing Store",
//     description: "Shop the latest fashion trends at Fashion Boutique",
//   },
// };

// // Storage keys
// const STORAGE_KEYS = {
//   CONFIG: "theme-customizer-config",
//   HISTORY: "theme-customizer-history",
//   HISTORY_INDEX: "theme-customizer-history-index",
//   SELECTED_PAGE: "theme-customizer-selected-page"
// };

// // Custom hook for debounced saving
// function useDebounce(callback: Function, delay: number) {
//   const timeoutRef = useRef<NodeJS.Timeout | null>(null);
  
//   return useCallback((...args: any[]) => {
//     if (timeoutRef.current) {
//       clearTimeout(timeoutRef.current);
//     }
    
//     timeoutRef.current = setTimeout(() => {
//       callback(...args);
//     }, delay);
//   }, [callback, delay]);
// }

// export default function ThemeCustomizer() {
//   const [activeTab, setActiveTab] = useState("template");
//   const [viewMode, setViewMode] = useState<"desktop" | "tablet" | "mobile">("desktop");
//   const [config, setConfig] = useState({...defaultConfig, version: CURRENT_VERSION});
//   const [selectedPage, setSelectedPage] = useState("index"); // Separate state for selected page
//   const [history, setHistory] = useState<any[]>([{...defaultConfig, version: CURRENT_VERSION}]);
//   const [historyIndex, setHistoryIndex] = useState(0);
//   const [isPublishDialogOpen, setIsPublishDialogOpen] = useState(false);
//   const [isSaving, setIsSaving] = useState(false);
//   const [isPublishing, setIsPublishing] = useState(false);
//   const [publishResult, setPublishResult] = useState<any>(null);
//   const [sidebarOpen, setSidebarOpen] = useState(true);
//   const [isMobile, setIsMobile] = useState(false);
//   const { toast } = useToast();

//   // Function to save to localStorage including the selected page
//   const saveToLocalStorage = useCallback(() => {
//     if (typeof window !== "undefined") {
//       try {
//         setIsSaving(true);
//         localStorage.setItem(STORAGE_KEYS.CONFIG, JSON.stringify({...config, version: CURRENT_VERSION}));
//         localStorage.setItem(STORAGE_KEYS.HISTORY, JSON.stringify(history.map(item => ({...item, version: CURRENT_VERSION}))));
//         localStorage.setItem(STORAGE_KEYS.HISTORY_INDEX, historyIndex.toString());
//         localStorage.setItem(STORAGE_KEYS.SELECTED_PAGE, selectedPage);
//       } catch (error) {
//         console.error("Error saving to localStorage:", error);
//         toast({
//           title: "Save error",
//           description: "Failed to save your changes locally",
//           variant: "destructive",
//         });
//       } finally {
//         setIsSaving(false);
//       }
//     }
//   }, [config, history, historyIndex, selectedPage, toast]);

//   // Create a debounced version of the save function
//   const debouncedSave = useDebounce(saveToLocalStorage, 500);

//   // Migrate older versions of data if needed
//   const migrateData = (savedData: any, dataType: 'config' | 'historyItem') => {
//     // No version or older version
//     if (!savedData.version || savedData.version !== CURRENT_VERSION) {
//       console.log(`Migrating ${dataType} from ${savedData.version || 'unknown'} to ${CURRENT_VERSION}`);
      
//       // Here you would implement migration logic for different versions
//       // Example:
//       // if (savedData.version === '0.9.0') {
//       //   // migrate from 0.9.0 to current
//       // }
      
//       // For now, we simply add the current version
//       return {
//         ...savedData,
//         version: CURRENT_VERSION
//       };
//     }
    
//     return savedData;
//   };

//   // Load saved data from localStorage on initial render
//   useEffect(() => {
//     // Only run in browser environment
//     if (typeof window !== "undefined") {
//       try {
//         // Load config
//         const savedConfigString = localStorage.getItem(STORAGE_KEYS.CONFIG);
//         if (savedConfigString) {
//           const savedConfig = JSON.parse(savedConfigString);
//           const migratedConfig = migrateData(savedConfig, 'config');
//           setConfig(migratedConfig);
//         }

//         // Load history
//         const savedHistoryString = localStorage.getItem(STORAGE_KEYS.HISTORY);
//         if (savedHistoryString) {
//           const savedHistory = JSON.parse(savedHistoryString);
//           const migratedHistory = savedHistory.map((item: any) => migrateData(item, 'historyItem'));
//           setHistory(migratedHistory);
//         }

//         // Load history index
//         const savedHistoryIndex = localStorage.getItem(STORAGE_KEYS.HISTORY_INDEX);
//         if (savedHistoryIndex) {
//           setHistoryIndex(parseInt(savedHistoryIndex, 10));
//         }
        
//         // Load selected page
//         const savedSelectedPage = localStorage.getItem(STORAGE_KEYS.SELECTED_PAGE);
//         if (savedSelectedPage) {
//           setSelectedPage(savedSelectedPage);
//         }
//       } catch (error) {
//         console.error("Error loading from localStorage:", error);
//         // If there's an error parsing saved data, use defaults
//       }
//     }
//   }, []);

//   // Check screen size on mount and window resize
//   useEffect(() => {
//     const checkScreenSize = () => {
//       setIsMobile(window.innerWidth < 768);
//       // Auto-close sidebar on mobile
//       if (window.innerWidth < 768) {
//         setSidebarOpen(false);
//       } else {
//         setSidebarOpen(true);
//       }
//     };

//     checkScreenSize();
//     window.addEventListener("resize", checkScreenSize);

//     return () => {
//       window.removeEventListener("resize", checkScreenSize);
//     };
//   }, []);

//   // Trigger debounced save whenever config, history, historyIndex, or selectedPage changes
//   useEffect(() => {
//     debouncedSave();
//   }, [config, history, historyIndex, selectedPage, debouncedSave]);

//   // Add to history when config changes
//   const updateConfig = (newConfig: any) => {
//     const updatedConfig = { ...config, ...newConfig, version: CURRENT_VERSION };
//     setConfig(updatedConfig);

//     // Add to history if it's a new state
//     if (historyIndex < history.length - 1) {
//       // If we're in the middle of the history, truncate
//       const newHistory = [...history.slice(0, historyIndex + 1), updatedConfig];
//       setHistory(newHistory);
//       setHistoryIndex(historyIndex + 1);
//     } else {
//       const newHistory = [...history, updatedConfig];
//       setHistory(newHistory);
//       setHistoryIndex(history.length);
//     }
//   };

//   const handleUndo = () => {
//     if (historyIndex > 0) {
//       const newIndex = historyIndex - 1;
//       setHistoryIndex(newIndex);
//       setConfig(history[newIndex]);
//     }
//   };

//   const handleRedo = () => {
//     if (historyIndex < history.length - 1) {
//       const newIndex = historyIndex + 1;
//       setHistoryIndex(newIndex);
//       setConfig(history[newIndex]);
//     }

//     console.log("themeSelectedPage", selectedPage);
//   };

//   // Function to handle page selection
//   const handlePageSelect = (pageId: string) => {
//     setSelectedPage(pageId);
//   };

//   // Function to clear saved data
//   const clearSavedData = useCallback(() => {
//     if (typeof window !== "undefined") {
//       localStorage.removeItem(STORAGE_KEYS.CONFIG);
//       localStorage.removeItem(STORAGE_KEYS.HISTORY);
//       localStorage.removeItem(STORAGE_KEYS.HISTORY_INDEX);
//       localStorage.removeItem(STORAGE_KEYS.SELECTED_PAGE);
//       setConfig({...defaultConfig, version: CURRENT_VERSION});
//       setHistory([{...defaultConfig, version: CURRENT_VERSION}]);
//       setHistoryIndex(0);
//       setSelectedPage("index");
//       toast({
//         title: "Data cleared",
//         description: "All saved customizations have been reset to defaults",
//       });
//     }
//   }, [toast]);

//   const handlePublish = async () => {
//     setIsPublishDialogOpen(true);
//   };

//   const handleConfirmPublish = async () => {
//     try {
//       setIsPublishing(true);

//       // Call the publish API
//       const response = await fetch("/api/sites/publish", {
//         method: "POST",
//         headers: {
//           "Content-Type": "application/json",
//         },
//         body: JSON.stringify({
//           ...config,
//           selectedPage, // Include the selectedPage in the publish request
//         }),
//       });

//       if (!response.ok) {
//         throw new Error(`Failed to publish: ${response.statusText}`);
//       }

//       const result = await response.json();

//       console.log(result);

//       // Ensure we're not passing objects directly to React
//       if (result.error && typeof result.error === "object") {
//         result.error = JSON.stringify(result.error);
//       }

//       setPublishResult(result);

//       // If publish was successful, clear local storage
//       if (result.success) {
//         clearSavedData();
//         toast({
//           title: "Site published",
//           description: "Your site has been published successfully and local data cleared.",
//         });
//       } else {
//         toast({
//           title: "Publish failed",
//           description: typeof result.error === "string" ? result.error : "Publication failed",
//           variant: "destructive",
//         });
//       }
//     } catch (error) {
//       console.error("Error publishing site:", error);
//       toast({
//         title: "Publish failed",
//         description:
//           error instanceof Error
//             ? error.message
//             : "An unexpected error occurred",
//         variant: "destructive",
//       });

//       setPublishResult({
//         success: false,
//         error:
//           error instanceof Error
//             ? error.message
//             : "An unexpected error occurred",
//       });
//     } finally {
//       setIsPublishing(false);
//     }
//   };

//   const toggleSidebar = () => {
//     setSidebarOpen(!sidebarOpen);
//   };

//   return (
//     <div className="flex h-screen overflow-hidden relative">
//       {/* Mobile Sidebar Overlay */}
//       {isMobile && sidebarOpen && (
//         <div
//           className="fixed inset-0 bg-black/30 z-30"
//           onClick={() => setSidebarOpen(false)}
//         />
//       )}

//       {/* Sidebar */}
//       <div
//         className={`${
//           isMobile
//             ? "fixed z-40 h-full transition-transform duration-300 ease-in-out w-[85%]"
//             : "relative w-[320px]"
//         } ${
//           sidebarOpen ? "translate-x-0" : "-translate-x-full"
//         }  bg-background flex flex-col overflow-hidden border-r shadow-lg`}
//       >
//         <div className="flex items-center justify-between p-4 border-b">
//           <h2 className="font-semibold md:text-base text-sm">
//             Customization {isSaving && <span className="text-xs text-muted-foreground ml-2">(Saving...)</span>}
//           </h2>
//           {isMobile && (
//             <Button variant="ghost" size="icon" onClick={toggleSidebar}>
//               <X className="h-5 w-5" />
//             </Button>
//           )}
//         </div>

//         <Tabs
//           value={activeTab}
//           onValueChange={setActiveTab}
//           className="flex-1 flex flex-col"
//         >
//           <TabsList className="grid grid-cols-3 h-auto p-0 bg-transparent border-b">
//             <TabsTrigger
//               value="template"
//               className="py-3 rounded-none data-[state=active]:border-b-2 data-[state=active]:border-primary md:text-base text-sm"
//             >
//               Template
//             </TabsTrigger>
//             <TabsTrigger
//               value="styles"
//               className="py-3 rounded-none data-[state=active]:border-b-2 data-[state=active]:border-primary md:text-base text-sm"
//             >
//               Styles
//             </TabsTrigger>
//             {/* <TabsTrigger
//               value="typography"
//               className="py-3 rounded-none data-[state=active]:border-b-2 data-[state=active]:border-primary md:text-base text-sm"
//             >
//               Typography
//             </TabsTrigger> */}
//             <TabsTrigger
//               value="layout"
//               className="py-3 rounded-none data-[state=active]:border-b-2 data-[state=active]:border-primary md:text-base text-sm"
//             >
//               Layout
//             </TabsTrigger>
//           </TabsList>

//           <ScrollArea className="flex-1 max-h-[calc(100vh-112px)]">
//             <TabsContent value="template" className="m-0 p-4">
//               <TemplateSelector
//                 selectedTemplate={config.templateId}
//                 onSelectTemplate={(templateId) => updateConfig({ templateId })}
//                 selectedPage={selectedPage}
//                 onSelectPage={handlePageSelect}
//               />
//             </TabsContent>

//             <TabsContent value="styles" className="m-0 p-4">
//               <ColorCustomizer
//                 colors={config.styles}
//                 onUpdateColors={(styles) =>
//                   updateConfig({ styles: { ...config.styles, ...styles } })
//                 }
//               />
//             </TabsContent>

//             {/* <TabsContent value="typography" className="m-0 p-4">
//               <TypographyCustomizer
//                 typography={config.styles}
//                 onUpdateTypography={(styles) =>
//                   updateConfig({ styles: { ...config.styles, ...styles } })
//                 }
//               />
//             </TabsContent> */}

//             <TabsContent value="layout" className="m-0 p-4">
//               <LayoutCustomizer
//                 content={config.content}
//                 onUpdateContent={(content) =>
//                   updateConfig({ content: { ...config.content, ...content } })
//                 }
//               />
//             </TabsContent>
//           </ScrollArea>
//         </Tabs>
//       </div>

//       {/* Main Content */}
//       <div className="flex-1 flex flex-col overflow-hidden">
//         {/* Header */}
//         <header className="border-b bg-background p-2 md:p-4 flex items-center justify-between">
//           <div className="flex items-center gap-2">
//             {/* Mobile sidebar toggle */}
//             {!sidebarOpen && (
//               <Button
//                 variant="ghost"
//                 size="icon"
//                 onClick={toggleSidebar}
//                 className="md:hidden"
//               >
//                 <Menu className="h-5 w-5" />
//               </Button>
//             )}
//           </div>

//           <div className="flex items-center gap-1 md:gap-2">
//             {/* Always visible buttons, both on mobile and desktop */}
//             <Button
//               variant="outline"
//               size="icon"
//               onClick={handleUndo}
//               disabled={historyIndex === 0}
//               title="Undo"
//             >
//               <Undo className="h-4 w-4" />
//               <span className="sr-only">Undo</span>
//             </Button>
//             <Button
//               variant="outline"
//               size="icon"
//               onClick={handleRedo}
//               disabled={historyIndex === history.length - 1}
//               title="Redo"
//             >
//               <Redo className="h-4 w-4" />
//               <span className="sr-only">Redo</span>
//             </Button>
           
//             <Button
//               onClick={handlePublish}
//               disabled={isPublishing}
//               className="px-2 md:px-3"
//               title="Publish"
//             >
//               {isPublishing ? (
//                 <Loader2 className="h-4 w-4 md:mr-2 animate-spin" />
//               ) : null}
//               Publish
//             </Button>
//           </div>
//         </header>

//         {/* Main Content Area */}
//         <div className="flex-1 flex flex-col overflow-hidden bg-muted/30">
//           {/* Preview Controls */}
//           <div className="py-2 px-4 flex items-center justify-center gap-2 border-b bg-background">
//             <Button
//               variant={viewMode === "desktop" ? "default" : "outline"}
//               size="icon"
//               onClick={() => setViewMode("desktop")}
//               title="Desktop View"
//             >
//               <Monitor className="h-4 w-4" />
//               <span className="sr-only">Desktop</span>
//             </Button>
//             <Button
//               variant={viewMode === "tablet" ? "default" : "outline"}
//               size="icon"
//               onClick={() => setViewMode("tablet")}
//               title="Tablet View"
//             >
//               <TabletSmartphone className="h-4 w-4" />
//               <span className="sr-only">Tablet</span>
//             </Button>
//             <Button
//               variant={viewMode === "mobile" ? "default" : "outline"}
//               size="icon"
//               onClick={() => setViewMode("mobile")}
//               title="Mobile View"
//             >
//               <Smartphone className="h-4 w-4" />
//               <span className="sr-only">Mobile</span>
//             </Button>
//           </div>

//           {/* Preview Frame */}
//           <div className="flex-1 overflow-hidden p-2 sm:p-4 flex items-center justify-center">
//             <PreviewFrame config={config} viewMode={viewMode} selectedPage={selectedPage} />
//           </div>
//         </div>
//       </div>

//       {/* Publish Dialog */}
//       <PublishDialog
//         isOpen={isPublishDialogOpen}
//         onClose={() => setIsPublishDialogOpen(false)}
//         onConfirm={handleConfirmPublish}
//         isPublishing={isPublishing}
//         publishResult={publishResult}
//       />
//     </div>
//   );
// }


// "use client";

// import type React from "react";

// import { useState, useEffect, useCallback, useRef } from "react";
// import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
// import { Button } from "@/components/ui/button";
// import { Input } from "@/components/ui/input";
// import { ScrollArea } from "@/components/ui/scroll-area";
// import {
//   Save,
//   Download,
//   Upload,
//   Monitor,
//   Smartphone,
//   TabletSmartphone,
//   ArrowLeft,
//   Undo,
//   Redo,
//   Loader2,
//   Menu,
//   X,
// } from "lucide-react";
// import TemplateSelector from "./template-selector";
// import ColorCustomizer from "./color-customizer";
// import TypographyCustomizer from "./typography-customizer";
// import LayoutCustomizer from "./layout-customizer";
// import PreviewFrame from "./preview-frame";
// import { useToast } from "@/hooks/use-toast";
// import PublishDialog from "./publish-dialog";

// // Default template configuration
// const defaultConfig = {
//   templateId: "basic",
//   styles: {
//     FONT_FAMILY: "Inter, sans-serif",
//     TEXT_COLOR: "#333333",
//     BACKGROUND_COLOR: "#ffffff",
//     PRIMARY_COLOR: "#000000",
//     SECONDARY_COLOR: "#f5f5f5",
//     ACCENT_COLOR: "#ff4081",
//     FOOTER_BACKGROUND: "#000000",
//     FOOTER_TEXT_COLOR: "#ffffff",
//   },
//   content: {
//     BRAND_NAME: "Fashion Boutique",
//     HEADER_TEXT: "Fashion Boutique",
//     HERO_TITLE: "Spring Collection 2025",
//     HERO_DESCRIPTION:
//       "Discover our latest fashion pieces designed for the modern lifestyle",
//     PRIMARY_CTA_TEXT: "Shop Women",
//     SECONDARY_CTA_TEXT: "Shop Men",
//     PRODUCTS_TITLE: "Featured Products",
//     ABOUT_TEXT:
//       "<p>We are a modern fashion boutique dedicated to bringing you the latest trends at affordable prices.</p>",
//     INSTAGRAM_LINK: "https://instagram.com/fashionboutique",
//     FACEBOOK_LINK: "https://facebook.com/fashionboutique",
//     TWITTER_LINK: "https://twitter.com/fashionboutique",
//     PHONE_NUMBER: "+1234567890",
//     MAIL: "contact@fashionboutique.com",
//   },
//   metadata: {
//     title: "Fashion Boutique - Modern Clothing Store",
//     description: "Shop the latest fashion trends at Fashion Boutique",
//   },
// };

// // Storage keys
// const STORAGE_KEYS = {
//   CONFIG: "theme-customizer-config",
//   HISTORY: "theme-customizer-history",
//   HISTORY_INDEX: "theme-customizer-history-index",
//   SELECTED_PAGE: "theme-customizer-selected-page",
// };

// // Custom hook for debounced saving
// function useDebounce(callback: Function, delay: number) {
//   const timeoutRef = useRef<NodeJS.Timeout | null>(null);

//   return useCallback(
//     (...args: any[]) => {
//       if (timeoutRef.current) {
//         clearTimeout(timeoutRef.current);
//       }

//       timeoutRef.current = setTimeout(() => {
//         callback(...args);
//       }, delay);
//     },
//     [callback, delay]
//   );
// }

// export default function ThemeCustomizer() {
//   const [activeTab, setActiveTab] = useState("template");
//   const [viewMode, setViewMode] = useState<"desktop" | "tablet" | "mobile">(
//     "desktop"
//   );
//   const [config, setConfig] = useState({ ...defaultConfig });
//   const [selectedPage, setSelectedPage] = useState("index");
//   const [history, setHistory] = useState<any[]>([{ ...defaultConfig }]);
//   const [historyIndex, setHistoryIndex] = useState(0);
//   const [isPublishDialogOpen, setIsPublishDialogOpen] = useState(false);
//   const [isSaving, setIsSaving] = useState(false);
//   const [isPublishing, setIsPublishing] = useState(false);
//   const [publishResult, setPublishResult] = useState<any>(null);
//   const [sidebarOpen, setSidebarOpen] = useState(true);
//   const [isMobile, setIsMobile] = useState(false);
//   const { toast } = useToast();

//   // Track previous page for comparison
//   const prevPageRef = useRef(selectedPage);

//   // Function to save to localStorage
//   const saveToLocalStorage = useCallback(() => {
//     if (typeof window !== "undefined") {
//       try {
//         setIsSaving(true);
//         localStorage.setItem(STORAGE_KEYS.CONFIG, JSON.stringify(config));
//         localStorage.setItem(STORAGE_KEYS.HISTORY, JSON.stringify(history));
//         localStorage.setItem(
//           STORAGE_KEYS.HISTORY_INDEX,
//           historyIndex.toString()
//         );
//         localStorage.setItem(STORAGE_KEYS.SELECTED_PAGE, selectedPage);
//       } catch (error) {
//         console.error("Error saving to localStorage:", error);
//         toast({
//           title: "Save error",
//           description: "Failed to save your changes locally",
//           variant: "destructive",
//         });
//       } finally {
//         setIsSaving(false);
//       }
//     }
//   }, [config, history, historyIndex, selectedPage, toast]);

//   // Create a debounced version of the save function
//   const debouncedSave = useDebounce(saveToLocalStorage, 500);

//   // Load saved data from localStorage on initial render
//   useEffect(() => {
//     // Only run in browser environment
//     if (typeof window !== "undefined") {
//       try {
//         // Load config
//         const savedConfigString = localStorage.getItem(STORAGE_KEYS.CONFIG);
//         if (savedConfigString) {
//           const savedConfig = JSON.parse(savedConfigString);
//           setConfig(savedConfig);
//         }

//         // Load history
//         const savedHistoryString = localStorage.getItem(STORAGE_KEYS.HISTORY);
//         if (savedHistoryString) {
//           const savedHistory = JSON.parse(savedHistoryString);
//           setHistory(savedHistory);
//         }

//         // Load history index
//         const savedHistoryIndex = localStorage.getItem(
//           STORAGE_KEYS.HISTORY_INDEX
//         );
//         if (savedHistoryIndex) {
//           setHistoryIndex(parseInt(savedHistoryIndex, 10));
//         }

//         // Load selected page
//         const savedSelectedPage = localStorage.getItem(
//           STORAGE_KEYS.SELECTED_PAGE
//         );
//         if (savedSelectedPage) {
//           setSelectedPage(savedSelectedPage);
//           prevPageRef.current = savedSelectedPage;
//         }
//       } catch (error) {
//         console.error("Error loading from localStorage:", error);
//         // If there's an error parsing saved data, use defaults
//       }
//     }
//   }, []);

//   // Check screen size on mount and window resize
//   useEffect(() => {
//     const checkScreenSize = () => {
//       setIsMobile(window.innerWidth < 768);
//       // Auto-close sidebar on mobile
//       if (window.innerWidth < 768) {
//         setSidebarOpen(false);
//       } else {
//         setSidebarOpen(true);
//       }
//     };

//     checkScreenSize();
//     window.addEventListener("resize", checkScreenSize);

//     return () => {
//       window.removeEventListener("resize", checkScreenSize);
//     };
//   }, []);

//   // Trigger debounced save whenever config, history, historyIndex, or selectedPage changes
//   useEffect(() => {
//     debouncedSave();
//   }, [config, history, historyIndex, selectedPage, debouncedSave]);

//   // Add to history when config changes
//   const updateConfig = (newConfig: any) => {
//     const updatedConfig = { ...config, ...newConfig };
//     setConfig(updatedConfig);

//     // Add to history if it's a new state
//     if (historyIndex < history.length - 1) {
//       // If we're in the middle of the history, truncate
//       const newHistory = [...history.slice(0, historyIndex + 1), updatedConfig];
//       setHistory(newHistory);
//       setHistoryIndex(historyIndex + 1);
//     } else {
//       const newHistory = [...history, updatedConfig];
//       setHistory(newHistory);
//       setHistoryIndex(history.length);
//     }
//   };

//   const handleUndo = () => {
//     if (historyIndex > 0) {
//       const newIndex = historyIndex - 1;
//       setHistoryIndex(newIndex);
//       setConfig(history[newIndex]);
//     }
//   };

//   const handleRedo = () => {
//     if (historyIndex < history.length - 1) {
//       const newIndex = historyIndex + 1;
//       setHistoryIndex(newIndex);
//       setConfig(history[newIndex]);
//     }
//   };

//   // Function to handle page selection with special handling
//   const handlePageSelect = (pageId: string) => {
//     // Only update if the page actually changed
//     if (pageId !== selectedPage) {
//       // Store previous page
//       prevPageRef.current = selectedPage;
//       // Update selected page state
//       setSelectedPage(pageId);

//       // Force a small config update to trigger rerender
//       const triggerUpdate = { ...config };
//       setConfig(triggerUpdate);

//       console.log(`Page changed from ${prevPageRef.current} to ${pageId}`);
//     }
//   };

//   // Function to clear saved data
//   const clearSavedData = useCallback(() => {
//     if (typeof window !== "undefined") {
//       localStorage.removeItem(STORAGE_KEYS.CONFIG);
//       localStorage.removeItem(STORAGE_KEYS.HISTORY);
//       localStorage.removeItem(STORAGE_KEYS.HISTORY_INDEX);
//       localStorage.removeItem(STORAGE_KEYS.SELECTED_PAGE);
//       setConfig({ ...defaultConfig });
//       setHistory([{ ...defaultConfig }]);
//       setHistoryIndex(0);
//       setSelectedPage("index");
//       toast({
//         title: "Data cleared",
//         description: "All saved customizations have been reset to defaults",
//       });
//     }
//   }, [toast]);

//   const handlePublish = async () => {
//     setIsPublishDialogOpen(true);
//   };

//   const handleConfirmPublish = async () => {
//     try {
//       setIsPublishing(true);

//       // Call the publish API
//       const response = await fetch("/api/sites/publish", {
//         method: "POST",
//         headers: {
//           "Content-Type": "application/json",
//         },
//         body: JSON.stringify({
//           ...config,
//           selectedPage, // Include the selectedPage in the publish request
//         }),
//       });

//       if (!response.ok) {
//         throw new Error(`Failed to publish: ${response.statusText}`);
//       }

//       const result = await response.json();

//       console.log(result);

//       // Ensure we're not passing objects directly to React
//       if (result.error && typeof result.error === "object") {
//         result.error = JSON.stringify(result.error);
//       }

//       setPublishResult(result);

//       // If publish was successful, clear local storage
//       if (result.success) {
//         clearSavedData();
//         toast({
//           title: "Site published",
//           description:
//             "Your site has been published successfully and local data cleared.",
//         });
//       } else {
//         toast({
//           title: "Publish failed",
//           description:
//             typeof result.error === "string"
//               ? result.error
//               : "Publication failed",
//           variant: "destructive",
//         });
//       }
//     } catch (error) {
//       console.error("Error publishing site:", error);
//       toast({
//         title: "Publish failed",
//         description:
//           error instanceof Error
//             ? error.message
//             : "An unexpected error occurred",
//         variant: "destructive",
//       });

//       setPublishResult({
//         success: false,
//         error:
//           error instanceof Error
//             ? error.message
//             : "An unexpected error occurred",
//       });
//     } finally {
//       setIsPublishing(false);
//     }
//   };

//   const toggleSidebar = () => {
//     setSidebarOpen(!sidebarOpen);
//   };

//   return (
//     <div className="flex h-screen overflow-hidden relative">
//       {/* Mobile Sidebar Overlay */}
//       {isMobile && sidebarOpen && (
//         <div
//           className="fixed inset-0 bg-black/30 z-30"
//           onClick={() => setSidebarOpen(false)}
//         />
//       )}

//       {/* Sidebar */}
//       <div
//         className={`${
//           isMobile
//             ? "fixed z-40 h-full transition-transform duration-300 ease-in-out w-[85%]"
//             : "relative w-[320px]"
//         } ${
//           sidebarOpen ? "translate-x-0" : "-translate-x-full"
//         }  bg-background flex flex-col overflow-hidden border-r shadow-lg`}
//       >
//         <div className="flex items-center justify-between p-4 border-b">
//           <h2 className="font-semibold md:text-base text-sm">
//             Customization{" "}
//             {isSaving && (
//               <span className="text-xs text-muted-foreground ml-2">
//                 (Saving...)
//               </span>
//             )}
//           </h2>
//           {isMobile && (
//             <Button variant="ghost" size="icon" onClick={toggleSidebar}>
//               <X className="h-5 w-5" />
//             </Button>
//           )}
//         </div>

//         <Tabs
//           value={activeTab}
//           onValueChange={setActiveTab}
//           className="flex-1 flex flex-col"
//         >
//           <TabsList className="grid grid-cols-3 h-auto p-0 bg-transparent border-b">
//             <TabsTrigger
//               value="template"
//               className="py-3 rounded-none data-[state=active]:border-b-2 data-[state=active]:border-primary md:text-base text-sm"
//             >
//               Template
//             </TabsTrigger>
//             <TabsTrigger
//               value="styles"
//               className="py-3 rounded-none data-[state=active]:border-b-2 data-[state=active]:border-primary md:text-base text-sm"
//             >
//               Style
//             </TabsTrigger>
//             <TabsTrigger
//               value="content"
//               className="py-3 rounded-none data-[state=active]:border-b-2 data-[state=active]:border-primary md:text-base text-sm"
//             >
//               Content
//             </TabsTrigger>
//           </TabsList>

//           <ScrollArea className="flex-1 max-h-[calc(100vh-112px)]">
//             <TabsContent value="template" className="m-0 p-4">
//               <TemplateSelector
//                 selectedTemplate={config.templateId}
//                 onSelectTemplate={(templateId) => updateConfig({ templateId })}
//                 selectedPage={selectedPage}
//                 onSelectPage={handlePageSelect}
//               />
//             </TabsContent>

//             <TabsContent value="styles" className="m-0 p-4">
//               <ColorCustomizer
//                 colors={config.styles}
//                 onUpdateColors={(styles) =>
//                   updateConfig({ styles: { ...config.styles, ...styles } })
//                 }
//               />
//             </TabsContent>

//             <TabsContent value="content" className="m-0 p-4">
//               <LayoutCustomizer
//                 content={config.content}
//                 onUpdateContent={(content) =>
//                   updateConfig({ content: { ...config.content, ...content } })
//                 }
//                 metadata={config.metadata}
//                 onUpdateMetadata={(metadata) =>
//                   updateConfig({ metadata: { ...config.metadata ,  ...metadata } })
//                 }
//               />
//             </TabsContent>
//           </ScrollArea>
//         </Tabs>
//       </div>

//       {/* Main Content */}
//       <div className="flex-1 flex flex-col overflow-hidden">
//         {/* Header */}
//         <header className="border-b bg-background p-2 md:p-4 flex items-center justify-between">
//           <div className="flex items-center gap-2">
//             {/* Mobile sidebar toggle */}
//             {!sidebarOpen && (
//               <Button
//                 variant="ghost"
//                 size="icon"
//                 onClick={toggleSidebar}
//                 className="md:hidden"
//               >
//                 <Menu className="h-5 w-5" />
//               </Button>
//             )}
//           </div>

//           <div className="flex items-center gap-1 md:gap-2">
//             {/* Always visible buttons, both on mobile and desktop */}
//             <Button
//               variant="outline"
//               size="icon"
//               onClick={handleUndo}
//               disabled={historyIndex === 0}
//               title="Undo"
//             >
//               <Undo className="h-4 w-4" />
//               <span className="sr-only">Undo</span>
//             </Button>
//             <Button
//               variant="outline"
//               size="icon"
//               onClick={handleRedo}
//               disabled={historyIndex === history.length - 1}
//               title="Redo"
//             >
//               <Redo className="h-4 w-4" />
//               <span className="sr-only">Redo</span>
//             </Button>

//             <Button
//               onClick={handlePublish}
//               disabled={isPublishing}
//               className="px-2 md:px-3"
//               title="Publish"
//             >
//               {isPublishing ? (
//                 <Loader2 className="h-4 w-4 md:mr-2 animate-spin" />
//               ) : null}
//               Publish
//             </Button>
//           </div>
//         </header>

//         {/* Main Content Area */}
//         <div className="flex-1 flex flex-col overflow-hidden bg-muted/30">
//           {/* Preview Controls */}
//           <div className="py-2 px-4 flex items-center justify-center gap-2 border-b bg-background">
//             <Button
//               variant={viewMode === "desktop" ? "default" : "outline"}
//               size="icon"
//               onClick={() => setViewMode("desktop")}
//               title="Desktop View"
//             >
//               <Monitor className="h-4 w-4" />
//               <span className="sr-only">Desktop</span>
//             </Button>
//             <Button
//               variant={viewMode === "tablet" ? "default" : "outline"}
//               size="icon"
//               onClick={() => setViewMode("tablet")}
//               title="Tablet View"
//             >
//               <TabletSmartphone className="h-4 w-4" />
//               <span className="sr-only">Tablet</span>
//             </Button>
//             <Button
//               variant={viewMode === "mobile" ? "default" : "outline"}
//               size="icon"
//               onClick={() => setViewMode("mobile")}
//               title="Mobile View"
//             >
//               <Smartphone className="h-4 w-4" />
//               <span className="sr-only">Mobile</span>
//             </Button>
//           </div>

//           {/* Preview Frame - Pass selectedPage as a key to force rerender */}
//           <div className="flex-1 overflow-hidden p-2 sm:p-4 flex items-center justify-center">
//             <PreviewFrame
//               key={`preview-${selectedPage}`}
//               config={config}
//               viewMode={viewMode}
//               selectedPage={selectedPage}
//             />
//           </div>
//         </div>
//       </div>

//       {/* Publish Dialog */}
//       <PublishDialog
//         isOpen={isPublishDialogOpen}
//         onClose={() => setIsPublishDialogOpen(false)}
//         onConfirm={handleConfirmPublish}
//         isPublishing={isPublishing}
//         publishResult={publishResult}
//       />
//     </div>
//   );
// }



// "use client";

// import type React from "react";

// import { useState, useEffect, useCallback, useRef } from "react";
// import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
// import { Button } from "@/components/ui/button";
// import { Input } from "@/components/ui/input";
// import { ScrollArea } from "@/components/ui/scroll-area";
// import {
//   Save,
//   Download,
//   Upload,
//   Monitor,
//   Smartphone,
//   TabletSmartphone,
//   ArrowLeft,
//   Undo,
//   Redo,
//   Loader2,
//   Menu,
//   X,
// } from "lucide-react";
// import TemplateSelector from "./template-selector";
// import ColorCustomizer from "./color-customizer";
// import TypographyCustomizer from "./typography-customizer";
// import LayoutCustomizer from "./layout-customizer";
// import PreviewFrame from "./preview-frame";
// import { useToast } from "@/hooks/use-toast";
// import PublishDialog from "./publish-dialog";
// import { saveThemeCustomizerData,
//   loadThemeCustomizerData,
//   clearThemeCustomizerData,
//   addToHistory } from "@/lib/storage-helpers";


// // Default template configuration
// const defaultConfig = {
//   templateId: "basic",
//   styles: {
//     PRIMARY_COLOR: "#000000",
//     SECONDARY_COLOR: "#f5f5f5",
//     ACCENT_COLOR: "#666666",
//     TEXT_COLOR: "#333333",
//     BACKGROUND_COLOR: "#ffffff",
//     FOOTER_BACKGROUND: "#f0f0f0",
//     FOOTER_TEXT_COLOR: "#333333",
//     FONT_FAMILY: "Inter, sans-serif",
//   },

 
//   content: {
//     BRAND_NAME: "Fashion Boutique",
//     HEADER_TEXT: "Fashion Boutique",
//     HERO_TITLE: "Spring Collection 2025",
//     HERO_DESCRIPTION:
//       "Discover our latest fashion pieces designed for the modern lifestyle",
//     PRIMARY_CTA_TEXT: "Shop Women",
//     SECONDARY_CTA_TEXT: "Shop Men",
//     PRODUCTS_TITLE: "Featured Products",
//     ABOUT_TEXT:
//       "<p>We are a modern fashion boutique dedicated to bringing you the latest trends at affordable prices.</p>",
//     INSTAGRAM_LINK: "https://instagram.com/fashionboutique",
//     FACEBOOK_LINK: "https://facebook.com/fashionboutique",
//     TWITTER_LINK: "https://twitter.com/fashionboutique",
//     PHONE_NUMBER: "+1234567890",
//     MAIL: "contact@fashionboutique.com",
//   },
//   metadata: {
//     title: "Fashion Boutique - Modern Clothing Store",
//     description: "Shop the latest fashion trends at Fashion Boutique",
//   },
// };

// // Custom hook for debounced saving
// function useDebounce(callback: Function, delay: number) {
//   const timeoutRef = useRef<NodeJS.Timeout | null>(null);

//   return useCallback(
//     (...args: any[]) => {
//       if (timeoutRef.current) {
//         clearTimeout(timeoutRef.current);
//       }

//       timeoutRef.current = setTimeout(() => {
//         callback(...args);
//       }, delay);
//     },
//     [callback, delay]
//   );
// }

// export default function ThemeCustomizer() {
//   const [activeTab, setActiveTab] = useState("template");
//   const [viewMode, setViewMode] = useState<"desktop" | "tablet" | "mobile">(
//     "desktop"
//   );
//   const [config, setConfig] = useState({ ...defaultConfig });
//   const [selectedPage, setSelectedPage] = useState("index");
//   const [history, setHistory] = useState<any[]>([{ ...defaultConfig }]);
//   const [historyIndex, setHistoryIndex] = useState(0);
//   const [isPublishDialogOpen, setIsPublishDialogOpen] = useState(false);
//   const [isSaving, setIsSaving] = useState(false);
//   const [isPublishing, setIsPublishing] = useState(false);
//   const [publishResult, setPublishResult] = useState<any>(null);
//   const [sidebarOpen, setSidebarOpen] = useState(true);
//   const [isMobile, setIsMobile] = useState(false);
//   const { toast } = useToast();
//   const [siteName, setSiteName] = useState("")

//   // Track previous page for comparison
//   const prevPageRef = useRef(selectedPage);

//   // Track whether initial load has completed
//   const initialLoadRef = useRef(false);

//   // Function to save to localStorage
//   const saveToLocalStorage = useCallback(() => {
//     if (typeof window !== "undefined") {
//       try {
//         setIsSaving(true);

//         const saveSuccess = saveThemeCustomizerData({
//           config,
//           history,
//           historyIndex,
//           selectedPage,
//         });

//         if (!saveSuccess) {
//           console.warn("Failed to save some data to localStorage");
//         }
//       } catch (error) {
//         console.error("Error saving to localStorage:", error);
//         toast({
//           title: "Save error",
//           description: "Failed to save your changes locally",
//           variant: "destructive",
//         });
//       } finally {
//         setIsSaving(false);
//       }
//     }
//   }, [config, history, historyIndex, selectedPage, toast]);

//   // Create a debounced version of the save function
//   const debouncedSave = useDebounce(saveToLocalStorage, 500);

//   // Load saved data from localStorage on initial render
//   useEffect(() => {
//     // Only run in browser environment and only once
//     if (typeof window !== "undefined" && !initialLoadRef.current) {
//       try {
//         const loadedData = loadThemeCustomizerData(defaultConfig);

//         setConfig(loadedData.config);
//         setHistory(loadedData.history);
//         setHistoryIndex(loadedData.historyIndex);
//         setSelectedPage(loadedData.selectedPage);
//         prevPageRef.current = loadedData.selectedPage;

//         initialLoadRef.current = true;
//       } catch (error) {
//         console.error("Error loading from localStorage:", error);
//         // If there's an error parsing saved data, use defaults
//         initialLoadRef.current = true;
//       }
//     }
//   }, []);

//   // Check screen size on mount and window resize
//   useEffect(() => {
//     const checkScreenSize = () => {
//       setIsMobile(window.innerWidth < 768);
//       // Auto-close sidebar on mobile
//       if (window.innerWidth < 768) {
//         setSidebarOpen(false);
//       } else {
//         setSidebarOpen(true);
//       }
//     };

//     checkScreenSize();
//     window.addEventListener("resize", checkScreenSize);

//     return () => {
//       window.removeEventListener("resize", checkScreenSize);
//     };
//   }, []);

//   // Trigger debounced save whenever config, history, historyIndex, or selectedPage changes
//   // Don't save during initial load
//   useEffect(() => {
//     if (initialLoadRef.current) {
//       debouncedSave();
//     }
//   }, [config, history, historyIndex, selectedPage, debouncedSave]);

//   // Add to history when config changes
//   const updateConfig = (newConfig: any) => {
//     const updatedConfig = { ...config, ...newConfig };
//     setConfig(updatedConfig);

//     // Only update history if initial load is complete
//     if (initialLoadRef.current) {
//       // Use the optimized history management
//       const { newHistory, newIndex } = addToHistory(
//         history,
//         historyIndex,
//         updatedConfig
//       );

//       setHistory(newHistory);
//       setHistoryIndex(newIndex);
//     }
//   };

//   const handleUndo = () => {
//     if (historyIndex > 0) {
//       const newIndex = historyIndex - 1;
//       setHistoryIndex(newIndex);
//       setConfig(history[newIndex]);
//     }
//   };

//   const handleRedo = () => {
//     if (historyIndex < history.length - 1) {
//       const newIndex = historyIndex + 1;
//       setHistoryIndex(newIndex);
//       setConfig(history[newIndex]);
//     }
//   };

//   // Function to handle page selection with special handling
//   const handlePageSelect = (pageId: string) => {
//     // Only update if the page actually changed
//     if (pageId !== selectedPage) {
//       // Store previous page
//       prevPageRef.current = selectedPage;
//       // Update selected page state
//       setSelectedPage(pageId);

//       // Force a small config update to trigger rerender
//       const triggerUpdate = { ...config };
//       setConfig(triggerUpdate);

//       console.log(`Page changed from ${prevPageRef.current} to ${pageId}`);
//     }
//   };

//   // Function to clear saved data
//   const clearSavedData = useCallback(() => {
//     if (typeof window !== "undefined") {
//       clearThemeCustomizerData();
//       setConfig({ ...defaultConfig });
//       setHistory([{ ...defaultConfig }]);
//       setHistoryIndex(0);
//       setSelectedPage("index");
//       toast({
//         title: "Data cleared",
//         description: "All saved customizations have been reset to defaults",
//       });
//     }
//   }, [toast]);

//   const handlePublish = async () => {
//     setIsPublishDialogOpen(true);
//   };

//   const handleConfirmPublish = async () => {
//     try {
//       setIsPublishing(true);
//      const data = {config, siteName}
//       // Call the publish API
//       const response = await fetch("/api/sites/publish", {
//         method: "POST",
//         headers: {
//           "Content-Type": "application/json",
//         },
//         credentials: "include",

//         body: JSON.stringify(data),
//       });

//       if (!response.ok) {
//         throw new Error(`Failed to publish: ${response.statusText}`);
//       }

//       const result = await response.json();

//       console.log(result);

//       // Ensure we're not passing objects directly to React
//       if (result.error && typeof result.error === "object") {
//         result.error = JSON.stringify(result.error);
//       }

//       setPublishResult(result);

//       // If publish was successful, clear local storage
//       if (result.success) {
//         clearSavedData();
//         toast({
//           title: "Site published",
//           description:
//             "Your site has been published successfully and local data cleared.",
//         });
//       } else {
//         toast({
//           title: "Publish failed",
//           description:
//             typeof result.error === "string"
//               ? result.error
//               : "Publication failed",
//           variant: "destructive",
//         });
//       }
//     } catch (error) {
//       console.error("Error publishing site:", error);
//       toast({
//         title: "Publish failed",
//         description:
//           error instanceof Error
//             ? error.message
//             : "An unexpected error occurred",
//         variant: "destructive",
//       });

//       setPublishResult({
//         success: false,
//         error:
//           error instanceof Error
//             ? error.message
//             : "An unexpected error occurred",
//       });
//     } finally {
//       setIsPublishing(false);
//     }
//   };

//   const toggleSidebar = () => {
//     setSidebarOpen(!sidebarOpen);
//   };

//   return (
//     <div className="flex h-screen overflow-hidden relative">
//       {/* Mobile Sidebar Overlay */}
//       {isMobile && sidebarOpen && (
//         <div
//           className="fixed inset-0 bg-black/30 z-30"
//           onClick={() => setSidebarOpen(false)}
//         />
//       )}

//       {/* Sidebar */}
//       <div
//         className={`${
//           isMobile
//             ? "fixed z-40 h-full transition-transform duration-300 ease-in-out w-[85%]"
//             : "relative w-[320px]"
//         } ${
//           sidebarOpen ? "translate-x-0" : "-translate-x-full"
//         }  bg-background flex flex-col overflow-hidden border-r shadow-lg`}
//       >
//         <div className="flex items-center justify-between p-4 border-b">
//           <h2 className="font-semibold md:text-base text-sm">
//             Customization{" "}
//             {isSaving && (
//               <span className="text-xs text-muted-foreground ml-2">
//                 (Saving...)
//               </span>
//             )}
//           </h2>
//           {isMobile && (
//             <Button variant="ghost" size="icon" onClick={toggleSidebar}>
//               <X className="h-5 w-5" />
//             </Button>
//           )}
//         </div>

//         <Tabs
//           value={activeTab}
//           onValueChange={setActiveTab}
//           className="flex-1 flex flex-col"
//         >
//           <TabsList className="grid grid-cols-3 h-auto p-0 bg-transparent border-b">
//             <TabsTrigger
//               value="template"
//               className="py-3 rounded-none data-[state=active]:border-b-2 data-[state=active]:border-primary md:text-base text-sm"
//             >
//               Template
//             </TabsTrigger>
//             <TabsTrigger
//               value="styles"
//               className="py-3 rounded-none data-[state=active]:border-b-2 data-[state=active]:border-primary md:text-base text-sm"
//             >
//               Style
//             </TabsTrigger>
//             <TabsTrigger
//               value="content"
//               className="py-3 rounded-none data-[state=active]:border-b-2 data-[state=active]:border-primary md:text-base text-sm"
//             >
//               Content
//             </TabsTrigger>
//           </TabsList>

//           <ScrollArea className="flex-1 max-h-[calc(100vh-112px)]">
//             <TabsContent value="template" className="m-0 p-4">
//               <TemplateSelector
//                 selectedTemplate={config.templateId}
//                 onSelectTemplate={(templateId) => updateConfig({ templateId })}
//                 selectedPage={selectedPage}
//                 onSelectPage={handlePageSelect}
//               />
//             </TabsContent>

//             <TabsContent value="styles" className="m-0 p-4">
//               <ColorCustomizer
//                 colors={config.styles}
//                 onUpdateColors={(styles) =>
//                   updateConfig({ styles: { ...config.styles, ...styles } })
//                 }
//               />
//             </TabsContent>

//             <TabsContent value="content" className="m-0 p-4">
//               <LayoutCustomizer
//                 content={config.content}
//                 onUpdateContent={(content) =>
//                   updateConfig({ content: { ...config.content, ...content } })
//                 }
//                 metadata={config.metadata}
//                 onUpdateMetadata={(metadata) =>
//                   updateConfig({
//                     metadata: { ...config.metadata, ...metadata },
//                   })
//                 }
//               />
//             </TabsContent>
//           </ScrollArea>
//         </Tabs>
//       </div>

//       {/* Main Content */}
//       <div className="flex-1 flex flex-col overflow-hidden">
//         {/* Header */}
//         <header className="border-b bg-background p-2 md:p-4 flex items-center justify-between">
//           <div className="flex items-center gap-2">
//             {/* Mobile sidebar toggle */}
//             {!sidebarOpen && (
//               <Button
//                 variant="ghost"
//                 size="icon"
//                 onClick={toggleSidebar}
//                 className="md:hidden"
//               >
//                 <Menu className="h-5 w-5" />
//               </Button>
//             )}
//           </div>

//           <div className="flex items-center gap-1 md:gap-2">
//             {/* Always visible buttons, both on mobile and desktop */}
//             <Button
//               variant="outline"
//               size="icon"
//               onClick={handleUndo}
//               disabled={historyIndex === 0}
//               title="Undo"
//             >
//               <Undo className="h-4 w-4" />
//               <span className="sr-only">Undo</span>
//             </Button>
//             <Button
//               variant="outline"
//               size="icon"
//               onClick={handleRedo}
//               disabled={historyIndex === history.length - 1}
//               title="Redo"
//             >
//               <Redo className="h-4 w-4" />
//               <span className="sr-only">Redo</span>
//             </Button>

//             <Button
//               onClick={handlePublish}
//               disabled={isPublishing}
//               className="px-2 md:px-3"
//               title="Publish"
//             >
//               {isPublishing ? (
//                 <Loader2 className="h-4 w-4 md:mr-2 animate-spin" />
//               ) : null}
//               Publish
//             </Button>
//           </div>
//         </header>

//         {/* Main Content Area */}
//         <div className="flex-1 flex flex-col overflow-hidden bg-muted/30">
//           {/* Preview Controls */}
//           <div className="py-2 px-4 flex items-center justify-center gap-2 border-b bg-background">
//             <Button
//               variant={viewMode === "desktop" ? "default" : "outline"}
//               size="icon"
//               onClick={() => setViewMode("desktop")}
//               title="Desktop View"
//             >
//               <Monitor className="h-4 w-4" />
//               <span className="sr-only">Desktop</span>
//             </Button>
//             <Button
//               variant={viewMode === "tablet" ? "default" : "outline"}
//               size="icon"
//               onClick={() => setViewMode("tablet")}
//               title="Tablet View"
//             >
//               <TabletSmartphone className="h-4 w-4" />
//               <span className="sr-only">Tablet</span>
//             </Button>
//             <Button
//               variant={viewMode === "mobile" ? "default" : "outline"}
//               size="icon"
//               onClick={() => setViewMode("mobile")}
//               title="Mobile View"
//             >
//               <Smartphone className="h-4 w-4" />
//               <span className="sr-only">Mobile</span>
//             </Button>
//           </div>

//           {/* Preview Frame - Pass selectedPage as a key to force rerender */}
//           <div className="flex-1 overflow-hidden p-2 sm:p-4 flex items-center justify-center">
//             <PreviewFrame
//               key={`preview-${selectedPage}`}
//               config={config}
//               viewMode={viewMode}
//               selectedPage={selectedPage}
//             />
//           </div>
//         </div>
//       </div>

//       {/* Publish Dialog */}
//       <PublishDialog
//         isOpen={isPublishDialogOpen}
//         siteName={siteName}
//         onSiteNameChange={setSiteName}
//         onClose={() => setIsPublishDialogOpen(false)}
//         onConfirm={handleConfirmPublish}
//         isPublishing={isPublishing}
//         publishResult={publishResult}
//       />
//     </div>
//   );
// }


"use client";

import type React from "react";

import { useState, useEffect, useCallback, useRef } from "react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { ScrollArea } from "@/components/ui/scroll-area";
import {
  Save,
  Download,
  Upload,
  Monitor,
  Smartphone,
  TabletSmartphone,
  ArrowLeft,
  Undo,
  Redo,
  Loader2,
  Menu,
  X,
} from "lucide-react";
import TemplateSelector from "./template-selector";
import ColorCustomizer from "./color-customizer";
import TypographyCustomizer from "./typography-customizer";
import LayoutCustomizer from "./layout-customizer";
import PreviewFrame from "./preview-frame";
import { useToast } from "@/hooks/use-toast";
import PublishDialog from "./publish-dialog";
import { saveThemeCustomizerData,
  loadThemeCustomizerData,
  clearThemeCustomizerData,
  addToHistory } from "@/lib/storage-helpers";


// Default template configuration
const defaultConfig = {
  templateId: "basic",
  styles: {
    PRIMARY_COLOR: "#000000",
    SECONDARY_COLOR: "#f5f5f5",
    ACCENT_COLOR: "#666666",
    TEXT_COLOR: "#333333",
    BACKGROUND_COLOR: "#ffffff",
    FOOTER_BACKGROUND: "#f0f0f0",
    FOOTER_TEXT_COLOR: "#333333",
    FONT_FAMILY: "Inter, sans-serif",
  },

 
  content: {
    BRAND_NAME: "Fashion Boutique",
    HEADER_TEXT: "Fashion Boutique",
    HERO_TITLE: "Spring Collection 2025",
    HERO_DESCRIPTION:
      "Discover our latest fashion pieces designed for the modern lifestyle",
    PRIMARY_CTA_TEXT: "Shop Women",
    SECONDARY_CTA_TEXT: "Shop Men",
    PRODUCTS_TITLE: "Featured Products",
    ABOUT_TEXT:
      "<p>We are a modern fashion boutique dedicated to bringing you the latest trends at affordable prices.</p>",
    INSTAGRAM_LINK: "https://instagram.com/fashionboutique",
    FACEBOOK_LINK: "https://facebook.com/fashionboutique",
    TWITTER_LINK: "https://twitter.com/fashionboutique",
    PHONE_NUMBER: "+1234567890",
    MAIL: "contact@fashionboutique.com",
  },
  metadata: {
    title: "Fashion Boutique - Modern Clothing Store",
    description: "Shop the latest fashion trends at Fashion Boutique",
  },
};

// Custom hook for debounced saving
function useDebounce(callback: Function, delay: number) {
  const timeoutRef = useRef<NodeJS.Timeout | null>(null);

  return useCallback(
    (...args: any[]) => {
      if (timeoutRef.current) {
        clearTimeout(timeoutRef.current);
      }

      timeoutRef.current = setTimeout(() => {
        callback(...args);
      }, delay);
    },
    [callback, delay]
  );
}

export default function ThemeCustomizer() {
  const [activeTab, setActiveTab] = useState("template");
  const [viewMode, setViewMode] = useState<"desktop" | "tablet" | "mobile">(
    "desktop"
  );
  const [config, setConfig] = useState({ ...defaultConfig });
  const [selectedPage, setSelectedPage] = useState("index");
  const [history, setHistory] = useState<any[]>([{ ...defaultConfig }]);
  const [historyIndex, setHistoryIndex] = useState(0);
  const [isPublishDialogOpen, setIsPublishDialogOpen] = useState(false);
  const [isSaving, setIsSaving] = useState(false);
  const [isPublishing, setIsPublishing] = useState(false);
  const [publishResult, setPublishResult] = useState<any>(null);
  const [sidebarOpen, setSidebarOpen] = useState(true);
  const [isMobile, setIsMobile] = useState(false);
  const [isInputFocused, setIsInputFocused] = useState(false); // New state to track input focus
  const { toast } = useToast();
  const [siteName, setSiteName] = useState("")

  // Track previous page for comparison
  const prevPageRef = useRef(selectedPage);

  // Track whether initial load has completed
  const initialLoadRef = useRef(false);

  // Function to save to localStorage
  const saveToLocalStorage = useCallback(() => {
    if (typeof window !== "undefined") {
      try {
        setIsSaving(true);

        const saveSuccess = saveThemeCustomizerData({
          config,
          history,
          historyIndex,
          selectedPage,
        });

        if (!saveSuccess) {
          console.warn("Failed to save some data to localStorage");
        }
      } catch (error) {
        console.error("Error saving to localStorage:", error);
        toast({
          title: "Save error",
          description: "Failed to save your changes locally",
          variant: "destructive",
        });
      } finally {
        setIsSaving(false);
      }
    }
  }, [config, history, historyIndex, selectedPage, toast]);

  // Create a debounced version of the save function
  const debouncedSave = useDebounce(saveToLocalStorage, 500);

  // Load saved data from localStorage on initial render
  useEffect(() => {
    // Only run in browser environment and only once
    if (typeof window !== "undefined" && !initialLoadRef.current) {
      try {
        const loadedData = loadThemeCustomizerData(defaultConfig);

        setConfig(loadedData.config);
        setHistory(loadedData.history);
        setHistoryIndex(loadedData.historyIndex);
        setSelectedPage(loadedData.selectedPage);
        prevPageRef.current = loadedData.selectedPage;

        initialLoadRef.current = true;
      } catch (error) {
        console.error("Error loading from localStorage:", error);
        // If there's an error parsing saved data, use defaults
        initialLoadRef.current = true;
      }
    }
  }, []);

  // Check screen size on mount and window resize
  useEffect(() => {
    const checkScreenSize = () => {
      setIsMobile(window.innerWidth < 768);
      // Only auto-close sidebar on mobile if not input focused
      if (window.innerWidth < 768 && !isInputFocused) {
        setSidebarOpen(false);
      } else {
        setSidebarOpen(true);
      }
    };

    checkScreenSize();
    window.addEventListener("resize", checkScreenSize);

    return () => {
      window.removeEventListener("resize", checkScreenSize);
    };
  }, [isInputFocused]); // Add isInputFocused as dependency

  // Set up global event listeners for input focus/blur
  useEffect(() => {
    // Function to handle when any input or textarea inside the sidebar gets focus
    const handleInputFocus = (e) => {
      if (isMobile && e.target.matches('input, textarea')) {
        setIsInputFocused(true);
        setSidebarOpen(true); // Keep sidebar open when an input is focused
      }
    };

    // Function to handle when any input or textarea loses focus
    const handleInputBlur = (e) => {
      if (isMobile && e.target.matches('input, textarea')) {
        setIsInputFocused(false);
        // We don't auto-close here to avoid UX issues, let user close manually
      }
    };

    // Get the sidebar element
    const sidebarElement = document.querySelector('.sidebar-container');
    
    if (sidebarElement) {
      sidebarElement.addEventListener('focusin', handleInputFocus);
      sidebarElement.addEventListener('focusout', handleInputBlur);
      
      return () => {
        sidebarElement.removeEventListener('focusin', handleInputFocus);
        sidebarElement.removeEventListener('focusout', handleInputBlur);
      };
    }
  }, [isMobile]);

  // Trigger debounced save whenever config, history, historyIndex, or selectedPage changes
  // Don't save during initial load
  useEffect(() => {
    if (initialLoadRef.current) {
      debouncedSave();
    }
  }, [config, history, historyIndex, selectedPage, debouncedSave]);

  // Add to history when config changes
  const updateConfig = (newConfig: any) => {
    const updatedConfig = { ...config, ...newConfig };
    setConfig(updatedConfig);

    // Only update history if initial load is complete
    if (initialLoadRef.current) {
      // Use the optimized history management
      const { newHistory, newIndex } = addToHistory(
        history,
        historyIndex,
        updatedConfig
      );

      setHistory(newHistory);
      setHistoryIndex(newIndex);
    }
  };

  const handleUndo = () => {
    if (historyIndex > 0) {
      const newIndex = historyIndex - 1;
      setHistoryIndex(newIndex);
      setConfig(history[newIndex]);
    }
  };

  const handleRedo = () => {
    if (historyIndex < history.length - 1) {
      const newIndex = historyIndex + 1;
      setHistoryIndex(newIndex);
      setConfig(history[newIndex]);
    }
  };

  // Function to handle page selection with special handling
  const handlePageSelect = (pageId: string) => {
    // Only update if the page actually changed
    if (pageId !== selectedPage) {
      // Store previous page
      prevPageRef.current = selectedPage;
      // Update selected page state
      setSelectedPage(pageId);

      // Force a small config update to trigger rerender
      const triggerUpdate = { ...config };
      setConfig(triggerUpdate);

      console.log(`Page changed from ${prevPageRef.current} to ${pageId}`);
    }
  };

  // Function to clear saved data
  const clearSavedData = useCallback(() => {
    if (typeof window !== "undefined") {
      clearThemeCustomizerData();
      setConfig({ ...defaultConfig });
      setHistory([{ ...defaultConfig }]);
      setHistoryIndex(0);
      setSelectedPage("index");
      toast({
        title: "Data cleared",
        description: "All saved customizations have been reset to defaults",
      });
    }
  }, [toast]);

  const handlePublish = async () => {
    setIsPublishDialogOpen(true);
  };

  const handleConfirmPublish = async () => {
    try {
      setIsPublishing(true);
     const data = {config, siteName}
      // Call the publish API
      const response = await fetch("/api/sites/publish", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        credentials: "include",

        body: JSON.stringify(data),
      });

      if (!response.ok) {
        throw new Error(`Failed to publish: ${response.statusText}`);
      }

      const result = await response.json();

      console.log(result);

      // Ensure we're not passing objects directly to React
      if (result.error && typeof result.error === "object") {
        result.error = JSON.stringify(result.error);
      }

      setPublishResult(result);

      // If publish was successful, clear local storage
      if (result.success) {
        clearSavedData();
        toast({
          title: "Site published",
          description:
            "Your site has been published successfully and local data cleared.",
        });
      } else {
        toast({
          title: "Publish failed",
          description:
            typeof result.error === "string"
              ? result.error
              : "Publication failed",
          variant: "destructive",
        });
      }
    } catch (error) {
      console.error("Error publishing site:", error);
      toast({
        title: "Publish failed",
        description:
          error instanceof Error
            ? error.message
            : "An unexpected error occurred",
        variant: "destructive",
      });

      setPublishResult({
        success: false,
        error:
          error instanceof Error
            ? error.message
            : "An unexpected error occurred",
      });
    } finally {
      setIsPublishing(false);
    }
  };

  const toggleSidebar = () => {
    setSidebarOpen(!sidebarOpen);
  };

  return (
    <div className="flex h-screen overflow-hidden relative">
      {/* Mobile Sidebar Overlay */}
      {isMobile && sidebarOpen && (
        <div
          className="fixed inset-0 bg-black/30 z-30"
          onClick={() => {
            // Only close sidebar when clicking overlay if no input is focused
            if (!isInputFocused) {
              setSidebarOpen(false);
            }
          }}
        />
      )}

      {/* Sidebar */}
      <div
        className={`sidebar-container ${
          isMobile
            ? "fixed z-40 h-full transition-transform duration-300 ease-in-out w-[85%]"
            : "relative w-[320px]"
        } ${
          sidebarOpen ? "translate-x-0" : "-translate-x-full"
        }  bg-background flex flex-col overflow-hidden border-r shadow-lg`}
      >
        <div className="flex items-center justify-between p-4 border-b">
          <h2 className="font-semibold md:text-base text-sm">
            Customization{" "}
            {isSaving && (
              <span className="text-xs text-muted-foreground ml-2">
                (Saving...)
              </span>
            )}
          </h2>
          {isMobile && (
            <Button variant="ghost" size="icon" onClick={toggleSidebar}>
              <X className="h-5 w-5" />
            </Button>
          )}
        </div>

        <Tabs
          value={activeTab}
          onValueChange={setActiveTab}
          className="flex-1 flex flex-col"
        >
          <TabsList className="grid grid-cols-3 h-auto p-0 bg-transparent border-b">
            <TabsTrigger
              value="template"
              className="py-3 rounded-none data-[state=active]:border-b-2 data-[state=active]:border-primary md:text-base text-sm"
            >
              Template
            </TabsTrigger>
            <TabsTrigger
              value="styles"
              className="py-3 rounded-none data-[state=active]:border-b-2 data-[state=active]:border-primary md:text-base text-sm"
            >
              Style
            </TabsTrigger>
            <TabsTrigger
              value="content"
              className="py-3 rounded-none data-[state=active]:border-b-2 data-[state=active]:border-primary md:text-base text-sm"
            >
              Content
            </TabsTrigger>
          </TabsList>

          <ScrollArea className="flex-1 max-h-[calc(100vh-112px)]">
            <TabsContent value="template" className="m-0 p-4">
              <TemplateSelector
                selectedTemplate={config.templateId}
                onSelectTemplate={(templateId) => updateConfig({ templateId })}
                selectedPage={selectedPage}
                onSelectPage={handlePageSelect}
              />
            </TabsContent>

            <TabsContent value="styles" className="m-0 p-4">
              <ColorCustomizer
                colors={config.styles}
                onUpdateColors={(styles) =>
                  updateConfig({ styles: { ...config.styles, ...styles } })
                }
              />
            </TabsContent>

            <TabsContent value="content" className="m-0 p-4">
              <LayoutCustomizer
                content={config.content}
                onUpdateContent={(content) =>
                  updateConfig({ content: { ...config.content, ...content } })
                }
                metadata={config.metadata}
                onUpdateMetadata={(metadata) =>
                  updateConfig({
                    metadata: { ...config.metadata, ...metadata },
                  })
                }
              />
            </TabsContent>
          </ScrollArea>
        </Tabs>
      </div>

      {/* Main Content */}
      <div className="flex-1 flex flex-col overflow-hidden">
        {/* Header */}
        <header className="border-b bg-background p-2 md:p-4 flex items-center justify-between">
          <div className="flex items-center gap-2">
            {/* Mobile sidebar toggle */}
            {!sidebarOpen && (
              <Button
                variant="ghost"
                size="icon"
                onClick={toggleSidebar}
                className="md:hidden"
              >
                <Menu className="h-5 w-5" />
              </Button>
            )}
          </div>

          <div className="flex items-center gap-1 md:gap-2">
            {/* Always visible buttons, both on mobile and desktop */}
            <Button
              variant="outline"
              size="icon"
              onClick={handleUndo}
              disabled={historyIndex === 0}
              title="Undo"
            >
              <Undo className="h-4 w-4" />
              <span className="sr-only">Undo</span>
            </Button>
            <Button
              variant="outline"
              size="icon"
              onClick={handleRedo}
              disabled={historyIndex === history.length - 1}
              title="Redo"
            >
              <Redo className="h-4 w-4" />
              <span className="sr-only">Redo</span>
            </Button>

            <Button
              onClick={handlePublish}
              disabled={isPublishing}
              className="px-2 md:px-3"
              title="Publish"
            >
              {isPublishing ? (
                <Loader2 className="h-4 w-4 md:mr-2 animate-spin" />
              ) : null}
              Publish
            </Button>
          </div>
        </header>

        {/* Main Content Area */}
        <div className="flex-1 flex flex-col overflow-hidden bg-muted/30">
          {/* Preview Controls */}
          <div className="py-2 px-4 flex items-center justify-center gap-2 border-b bg-background">
            <Button
              variant={viewMode === "desktop" ? "default" : "outline"}
              size="icon"
              onClick={() => setViewMode("desktop")}
              title="Desktop View"
            >
              <Monitor className="h-4 w-4" />
              <span className="sr-only">Desktop</span>
            </Button>
            <Button
              variant={viewMode === "tablet" ? "default" : "outline"}
              size="icon"
              onClick={() => setViewMode("tablet")}
              title="Tablet View"
            >
              <TabletSmartphone className="h-4 w-4" />
              <span className="sr-only">Tablet</span>
            </Button>
            <Button
              variant={viewMode === "mobile" ? "default" : "outline"}
              size="icon"
              onClick={() => setViewMode("mobile")}
              title="Mobile View"
            >
              <Smartphone className="h-4 w-4" />
              <span className="sr-only">Mobile</span>
            </Button>
          </div>

          {/* Preview Frame - Pass selectedPage as a key to force rerender */}
          <div className="flex-1 overflow-hidden p-2 sm:p-4 flex items-center justify-center">
            <PreviewFrame
              key={`preview-${selectedPage}`}
              config={config}
              viewMode={viewMode}
              selectedPage={selectedPage}
            />
          </div>
        </div>
      </div>

      {/* Publish Dialog */}
      <PublishDialog
        isOpen={isPublishDialogOpen}
        siteName={siteName}
        onSiteNameChange={setSiteName}
        onClose={() => setIsPublishDialogOpen(false)}
        onConfirm={handleConfirmPublish}
        isPublishing={isPublishing}
        publishResult={publishResult}
      />
    </div>
  );
}