


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
import LayoutCustomizer from "./layout-customizer";
import PreviewFrame from "./preview-frame";
import { useToast } from "@/hooks/use-toast";
import PublishDialog from "./publish-dialog";
import {
  saveThemeCustomizerData,
  loadThemeCustomizerData,
  clearThemeCustomizerData,
  addToHistory,
} from "@/lib/storage-helpers";
import { useUser } from "@/app/_components/provider/UserContext";
import { useRouter } from "next/navigation";
import useSWR from "swr";
import { Skeleton } from "@/components/ui/skeleton";
import { useSwrUser } from "@/hooks/use-current-user";
import { errorToast } from "@/components/ui/use-toast-advanced";

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

// Custom fetcher for SWR
const fetcher = (url: string) => fetch(url).then((res) => res.json());

export default function ThemeCustomizer() {
  const [activeTab, setActiveTab] = useState("template");
  const [viewMode, setViewMode] = useState<"desktop" | "tablet" | "mobile">(
    "mobile"
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
  const [isEditing, setIsEditing] = useState(false);
  const { toast } = useToast();
  const [subdomain, setSubdomain] = useState("");
  const sidebarRef = useRef<HTMLDivElement>(null);
  const router = useRouter();
  const { userData } = useUser();
  const { user } = userData || { user: null };

  const close = () => {
    setPublishResult(null)
    setIsPublishDialogOpen(false)
  }

  // Initialize loading state
  const [isLoading, setIsLoading] = useState(true);

  // Track previous page for comparison
  const prevPageRef = useRef(selectedPage);

  // Track whether initial load has completed
  const initialLoadRef = useRef(false);
    const {mutate}  = useSwrUser()
  

  useEffect(() => {
    if(user){
    setSubdomain(user?.plug?.subdomain || "");
    }
  }, [user])

  // Fetch user config if available
  const { data: userConfig, error: userConfigError, mutate: mutateConfig } = useSWR(
    user?.plug?.configUrl ? user.plug.configUrl : null,
    fetcher,
    {
      onSuccess: (data) => {
        if (data) {
          try {
            // Parse and validate the config
            const parsedConfig = typeof data === 'string' ? JSON.parse(data) : data;
            
            if (parsedConfig && parsedConfig.templateId) {
              setConfig(parsedConfig);
              setHistory([parsedConfig]);
              setHistoryIndex(0);
              setIsEditing(true);
            }
          } catch (error) {
            console.error("Error parsing user config:", error);
           errorToast("Could not load your site configuration")
          }
        }
        setIsLoading(false);
      },
      onError: (err) => {
        console.error("Error fetching user config:", err);
        errorToast("Could not load your site configuration");
        setIsLoading(false);
      },
    }
  );

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
    if (typeof window !== "undefined" && !initialLoadRef.current && !user?.plug?.configUrl) {
      try {
        const loadedData = loadThemeCustomizerData(defaultConfig);

        setConfig(loadedData.config);
        setHistory(loadedData.history);
        setHistoryIndex(loadedData.historyIndex);
        setSelectedPage(loadedData.selectedPage);
        prevPageRef.current = loadedData.selectedPage;

        initialLoadRef.current = true;
        setIsLoading(false);
      } catch (error) {
        console.error("Error loading from localStorage:", error);
        // If there's an error parsing saved data, use defaults
        initialLoadRef.current = true;
        setIsLoading(false);
      }
    }
  }, [user]);

  // Setup mobile detection and sidebar state
  useEffect(() => {
    const checkScreenSize = () => {
      const isMobileView = window.innerWidth < 768;
      setIsMobile(isMobileView);
      // Only auto-close when FIRST switching to mobile view
      // Don't auto-open/close during resize to avoid interfering with user interactions
      if (isMobileView !== isMobile) {
        if (isMobileView) {
          setSidebarOpen(false);
        } else {
          setSidebarOpen(true);
        }
      }
    };

    checkScreenSize();
    window.addEventListener("resize", checkScreenSize);

    return () => {
      window.removeEventListener("resize", checkScreenSize);
    };
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
     
    }
  }, []);

  const handlePublish = async () => {
    setIsPublishDialogOpen(true);
  };

  const handleConfirmPublish = async () => {
    try {
      setIsPublishing(true);
      const data = { config, subdomain };
      
      // Use PUT method if editing, POST if creating new
      const method = isEditing ? "PUT" : "POST";
      
      // Call the publish API
      const response = await fetch("/api/site", {
        method,
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

      console.log("result", result);
      setPublishResult({ result, success: true });
     
      clearSavedData();
      mutate()
      mutateConfig()
    } catch (error) {
      console.error("Error publishing site:", error);

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

  const handleBackNavigation = () => {
    router.back();
  };

  // Show loading skeleton while waiting for user data and configuration
  if (isLoading || (!user && !initialLoadRef.current)) {
    return <ThemeCustomizerSkeleton />;
  }

  return (
    <div className="flex h-screen overflow-hidden relative">
      {/* Mobile Sidebar Overlay - Only close when directly clicking the overlay */}
      {isMobile && sidebarOpen && (
        <div
          className="fixed inset-0 bg-black/30 z-30"
          onClick={(e) => {
            // Only close if the click is directly on the overlay itself
            if (e.target === e.currentTarget) {
              setSidebarOpen(false);
            }
          }}
        />
      )}

      {/* Sidebar */}
      <div
        ref={sidebarRef}
        className={`${
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
            <Button
              variant="ghost"
              size="icon"
              onClick={(e) => {
                e.stopPropagation();
                setSidebarOpen(false);
              }}
            >
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

          <ScrollArea className="flex-1 max-h-[calc(100vh-224px)]">
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
            {/* Back button */}
            <Button
              variant="ghost"
              size="icon"
              onClick={handleBackNavigation}
              title="Back to previous page"
            >
              <ArrowLeft className="h-5 w-5" />
              <span className="sr-only">Back</span>
            </Button>
            
            {/* Mobile sidebar toggle */}
            {!sidebarOpen && (
              <Button
                variant="ghost"
                size="icon"
                onClick={(e) => {
                  e.stopPropagation();
                  toggleSidebar();
                }}
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
              {isEditing ? "Update" : "Publish"}
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
        subdomain={subdomain}
        onSubdomainChange={setSubdomain}
        onClose={close}
        onConfirm={handleConfirmPublish}
        isPublishing={isPublishing}
        publishResult={publishResult}
        isEditing={isEditing}
      />
    </div>
  );
}

// Skeleton component for loading state
function ThemeCustomizerSkeleton() {
  return (
    <div className="flex h-screen overflow-hidden relative">
      {/* Sidebar Skeleton */}
      <div className="hidden md:flex md:relative md:w-[320px] bg-background flex-col overflow-hidden border-r shadow-lg">
        <div className="flex items-center justify-between p-4 border-b">
          <Skeleton className="h-6 w-2/3" />
        </div>

        <div className="border-b">
          <div className="grid grid-cols-3 h-auto p-0 bg-transparent">
            <Skeleton className="h-10 mx-2 my-1 rounded" />
            <Skeleton className="h-10 mx-2 my-1 rounded" />
            <Skeleton className="h-10 mx-2 my-1 rounded" />
          </div>
        </div>

        <div className="p-4 space-y-4">
          <Skeleton className="h-8 w-full" />
          <Skeleton className="h-24 w-full" />
          <Skeleton className="h-12 w-full" />
          <Skeleton className="h-12 w-full" />
          <Skeleton className="h-32 w-full" />
        </div>
      </div>

      {/* Main Content Skeleton */}
      <div className="flex-1 flex flex-col overflow-hidden">
        {/* Header Skeleton */}
        <header className="border-b bg-background p-2 md:p-4 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <Skeleton className="h-8 w-8 rounded-full" />
            <Skeleton className="h-8 w-8 rounded-full md:hidden" />
          </div>

          <div className="flex items-center gap-1 md:gap-2">
            <Skeleton className="h-8 w-8 rounded-full" />
            <Skeleton className="h-8 w-8 rounded-full" />
            <Skeleton className="h-8 w-20 rounded" />
          </div>
        </header>

        {/* Preview Controls Skeleton */}
        <div className="py-2 px-4 flex items-center justify-center gap-2 border-b bg-background">
          <Skeleton className="h-8 w-8 rounded-full" />
          <Skeleton className="h-8 w-8 rounded-full" />
          <Skeleton className="h-8 w-8 rounded-full" />
        </div>

        {/* Preview Frame Skeleton */}
        <div className="flex-1 overflow-hidden p-2 sm:p-4 flex items-center justify-center">
          <div className="w-full h-full max-w-md mx-auto bg-background rounded shadow-md overflow-hidden">
            <Skeleton className="h-16 w-full" />
            <div className="p-4 space-y-4">
              <Skeleton className="h-8 w-3/4" />
              <Skeleton className="h-4 w-full" />
              <Skeleton className="h-4 w-full" />
              <Skeleton className="h-12 w-32" />
              <Skeleton className="h-64 w-full" />
              <Skeleton className="h-32 w-full" />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}