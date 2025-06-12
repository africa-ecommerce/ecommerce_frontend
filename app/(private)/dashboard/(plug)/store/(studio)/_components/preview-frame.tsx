





"use client";

import { useState, useEffect, useRef } from "react";
import useSWR from "swr";
import { cn } from "@/lib/utils";

interface PreviewFrameProps {
  config: any;
  viewMode?: "desktop" | "tablet" | "mobile"; // Make viewMode optional
  selectedPage: string;
  defaultViewMode?: "desktop" | "tablet" | "mobile"; // Add defaultViewMode prop
}

const fetcher = async (url: string) => {
  const response = await fetch(url);
  if (!response.ok) {
    throw new Error("Failed to fetch template");
  }
  return await response.text();
};

// Device viewport dimensions for proper scaling
const viewportDimensions = {
  desktop: { width: 1440, height: 900 },
  tablet: { width: 768, height: 1024 },
  mobile: { width: 375, height: 667 },
};

// Default padding around the preview frame
const PREVIEW_PADDING = 20;

export default function PreviewFrame({
  config,
  viewMode: externalViewMode,
  selectedPage,
  defaultViewMode = "mobile", // Default to mobile view
}: PreviewFrameProps) {
  // Use internal viewMode state that can be initialized with defaultViewMode
  const [internalViewMode, setInternalViewMode] = useState<
    "desktop" | "tablet" | "mobile"
  >(externalViewMode || defaultViewMode);

  // Use the internal viewMode for rendering
  const viewMode = externalViewMode || internalViewMode;

  const [html, setHtml] = useState<string | null>(null);
  const iframeRef = useRef<HTMLIFrameElement | null>(null);
  const containerRef = useRef<HTMLDivElement | null>(null);
  const [isLoaded, setIsLoaded] = useState(false);
  const [scale, setScale] = useState(1);
  const [containerSize, setContainerSize] = useState({ width: 0, height: 0 });
  const [autoScale, setAutoScale] = useState(true);
  const initialLoadComplete = useRef(false);

  // Keep track of current page to detect changes
  const previousPageRef = useRef(selectedPage);

  // Keep track of external viewMode to detect changes
  const previousViewModeRef = useRef(externalViewMode);

  // Generate the cache key based on templateId and selectedPage
  const cacheKey =
    config.templateId && selectedPage
      ? `/api/template/${config.templateId}/${selectedPage || "index"}`
      : null;

  // Use SWR to fetch and cache the template
  const { data, error, isLoading, mutate } = useSWR(cacheKey, fetcher, {
    revalidateOnFocus: false,
    revalidateOnReconnect: false,
    revalidateIfStale: false,
    shouldRetryOnError: false,
    dedupingInterval: 60 * 60 * 1000,
  });

  // Update local html state when SWR data changes
  useEffect(() => {
    if (data) {
      setHtml(data);
      setIsLoaded(false);
    }
  }, [data]);

  // When selectedPage changes, force a revalidation
  useEffect(() => {
    if (previousPageRef.current !== selectedPage) {
      mutate();
      previousPageRef.current = selectedPage;
      setIsLoaded(false);
    }
  }, [selectedPage, mutate]);

  // When external viewMode changes, update internal state
  useEffect(() => {
    if (externalViewMode !== previousViewModeRef.current) {
      setInternalViewMode(externalViewMode || defaultViewMode);
      previousViewModeRef.current = externalViewMode;
    }
  }, [externalViewMode, defaultViewMode]);

  // Calculate the scale based on container size and viewMode
  useEffect(() => {
    const calculateIdealScale = () => {
      if (!containerRef.current) return 1;

      const containerWidth =
        containerRef.current.clientWidth - PREVIEW_PADDING * 2;
      const containerHeight =
        containerRef.current.clientHeight - PREVIEW_PADDING * 2;

      setContainerSize({
        width: containerWidth,
        height: containerHeight,
      });

      const targetWidth = viewportDimensions[viewMode].width;
      const targetHeight = viewportDimensions[viewMode].height;

      // Calculate scale based on container dimensions
      const widthScale = containerWidth / targetWidth;
      const heightScale = containerHeight / targetHeight;

      // Use the smaller scale to ensure the entire content fits
      return Math.min(widthScale, heightScale, 1);
    };

    const updateScale = () => {
      if (autoScale) {
        const newScale = calculateIdealScale();
        setScale(newScale);
      }
    };

    // Initial update
    updateScale();

    // Add resize listener
    const resizeObserver = new ResizeObserver(() => {
      updateScale();
    });

    if (containerRef.current) {
      resizeObserver.observe(containerRef.current);
    }

    // Set up window resize handler for more responsive updates
    const handleResize = () => {
      updateScale();
    };

    window.addEventListener("resize", handleResize);

    // Cleanup
    return () => {
      resizeObserver.disconnect();
      window.removeEventListener("resize", handleResize);
    };
  }, [viewMode, autoScale]);

  // Reset auto-scale when view mode changes and immediately calculate new scale
  useEffect(() => {
    setAutoScale(true);

    // Recalculate scale when view mode changes
    if (containerRef.current) {
      const containerWidth =
        containerRef.current.clientWidth - PREVIEW_PADDING * 2;
      const containerHeight =
        containerRef.current.clientHeight - PREVIEW_PADDING * 2;

      const targetWidth = viewportDimensions[viewMode].width;
      const targetHeight = viewportDimensions[viewMode].height;

      const widthScale = containerWidth / targetWidth;
      const heightScale = containerHeight / targetHeight;

      const newScale = Math.min(widthScale, heightScale, 1);
      setScale(newScale);
    }
  }, [viewMode]);

  // When HTML is loaded, inject it into the iframe with special handling
  useEffect(() => {
    if (!html || !iframeRef.current) return;

    const iframe = iframeRef.current;
    const doc = iframe.contentDocument || iframe.contentWindow?.document;

    if (!doc) return;

    // Extract and process content to prevent external resource loading
    const processedHtml = processHtmlContent(html);

    // Inject HTML
    doc.open();
    doc.write(processedHtml);
    doc.close();

    // Give the iframe content a hint that we're in edit/preview mode
    if (doc.body) {
      doc.body.setAttribute("data-editor", "true");
    }

    // Add special styling for edit mode and proper viewport settings
    const style = doc.createElement("style");
    style.textContent = `
      [data-editor="true"] {
        /* Styles for edit mode */
      }
      /* Make iframe content unselectable to prevent accidental editing */
      .unselectable-content {
        user-select: none;
        -webkit-user-select: none;
      }
      /* Ensure content fills the viewport */
      html, body {
        margin: 0;
        padding: 0;
        width: 100%;
        height: 100%;
        overflow: auto;
      }
    `;
    doc.head.appendChild(style);

    // Add viewport meta tag for proper scaling
    const metaViewport = doc.createElement("meta");
    metaViewport.setAttribute("name", "viewport");
    metaViewport.setAttribute(
      "content",
      `width=${viewportDimensions[viewMode].width}, initial-scale=1.0`
    );
    doc.head.appendChild(metaViewport);

    // Communicate with the iframe content if needed
    if (iframe.contentWindow) {
      iframe.contentWindow.postMessage(
        {
          type: "EDITOR_MODE",
          enabled: true,
          viewMode: viewMode,
          viewport: viewportDimensions[viewMode],
        },
        "*"
      );
    }

    // Add event listener to prevent link navigation
    const disableLinks = () => {
      const links = doc.querySelectorAll("a");
      links.forEach((link) => {
        link.addEventListener("click", (e) => {
          e.preventDefault();
          console.log("Link navigation prevented:", link.href);
        });
        // Visual indication that links are disabled
        link.style.cursor = "default";
      });
    };

    // Set up iframe onload
    iframe.onload = () => {
      disableLinks();

      // Apply config once iframe is loaded
      try {
        const contentWindow = iframe.contentWindow;
        if (contentWindow && typeof contentWindow.updateConfig === "function") {
          console.log("Applying config to iframe on load:", config);
          contentWindow.updateConfig(config);
        }
      } catch (error) {
        console.error("Error applying config on load:", error);
      }

      // Force an immediate recalculation of scale when iframe content is loaded
      if (autoScale && containerRef.current) {
        const containerWidth =
          containerRef.current.clientWidth - PREVIEW_PADDING * 2;
        const containerHeight =
          containerRef.current.clientHeight - PREVIEW_PADDING * 2;

        const targetWidth = viewportDimensions[viewMode].width;
        const targetHeight = viewportDimensions[viewMode].height;

        const widthScale = containerWidth / targetWidth;
        const heightScale = containerHeight / targetHeight;

        const newScale = Math.min(widthScale, heightScale, 1);
        console.log("Initial scale calculation after iframe load:", newScale);
        setScale(newScale);
      }

      // Set loaded state after everything is done
      setIsLoaded(true);
    };

    // Also run disableLinks after a small delay to ensure DOM is fully loaded
    setTimeout(disableLinks, 100);
  }, [html, config, viewMode, autoScale]);

  // Apply config whenever it changes, even if iframe was already loaded
  useEffect(() => {
    if (!iframeRef.current) return;

    try {
      // Call the updateConfig function inside the iframe
      const contentWindow = iframeRef.current.contentWindow;
      if (contentWindow && typeof contentWindow.updateConfig === "function") {
        console.log(
          "Applying config to iframe:",
          config,
          "isLoaded:",
          isLoaded
        );
        contentWindow.updateConfig(config);
      }
    } catch (error) {
      console.error("Error applying config:", error);
    }
  }, [config, isLoaded]);

  // Force recalculation of scale when template becomes active
  useEffect(() => {
    if (isLoaded && autoScale) {
      // This ensures we calculate scale once the content is fully loaded
      const recalculateScale = () => {
        if (!containerRef.current) return;

        const containerWidth =
          containerRef.current.clientWidth - PREVIEW_PADDING * 2;
        const containerHeight =
          containerRef.current.clientHeight - PREVIEW_PADDING * 2;

        const targetWidth = viewportDimensions[viewMode].width;
        const targetHeight = viewportDimensions[viewMode].height;

        const widthScale = containerWidth / targetWidth;
        const heightScale = containerHeight / targetHeight;

        const newScale = Math.min(widthScale, heightScale, 1);
        console.log(
          "Recalculating scale on active:",
          newScale,
          "viewMode:",
          viewMode
        );
        setScale(newScale);
      };

      // Immediately recalculate
      recalculateScale();

      // Also set a small delay to ensure DOM has fully rendered
      // Often needed for the first load when container dimensions might still be settling
      setTimeout(recalculateScale, 50);

      // For the first load, do an additional recalculation after a longer delay
      // This helps with complex templates that might shift layout during rendering
      if (!initialLoadComplete.current) {
        setTimeout(() => {
          recalculateScale();
          initialLoadComplete.current = true;
        }, 300);
      }
    }
  }, [isLoaded, viewMode, autoScale]);

  


  const processHtmlContent = (htmlContent: string) => {
    const parser = new DOMParser();
    const doc = parser.parseFromString(htmlContent, "text/html");
  
    // Define trusted domains that should be allowed
    const trustedDomains = [
      'ecommerce-backend-peach-sigma.vercel.app',
      'fonts.googleapis.com',
      'fonts.gstatic.com',
    ];
  
    // Only remove external stylesheets from untrusted domains
    const externalStylesheets = doc.querySelectorAll('link[rel="stylesheet"]');
    externalStylesheets.forEach((link) => {
      const href = link.getAttribute('href');
      if (href) {
        const isUntrusted = !trustedDomains.some(domain => href.includes(domain));
        if (isUntrusted) {
          console.log('Removing untrusted stylesheet:', href);
          link.parentNode?.removeChild(link);
        }
      }
    });
  
    // Handle scripts similarly - allow trusted domains
    const scripts = doc.querySelectorAll("script[src]");
    scripts.forEach((script) => {
      const src = script.getAttribute("src");
      if (src) {
        const isUntrusted = !trustedDomains.some(domain => src.includes(domain));
        if (isUntrusted) {
          console.log('Removing untrusted script:', src);
          script.removeAttribute("src");
          script.textContent = `// External script reference: ${src} was removed\n${
            script.textContent || ""
          }`;
        }
      }
    });
  
    return doc.documentElement.outerHTML;
  };

  if (isLoading && !html) {
    return (
      <div className="flex items-center justify-center min-h-[400px]">
        <div className="animate-spin h-8 w-8 border-4 border-primary border-t-transparent rounded-full"></div>
        <span className="ml-3">Loading template preview...</span>
      </div>
    );
  }

  if (error) {
    return (
      <div className="flex items-center justify-center min-h-[400px] text-red-500">
        Error loading template: {error.message}
      </div>
    );
  }

  // Get dimensions for the current viewMode
  const { width, height } = viewportDimensions[viewMode];

  // Calculate frame dimensions with scaling
  const scaledWidth = width * scale;
  const scaledHeight = height * scale;

  // Calculate device frames based on mode
  const deviceFrame = () => {
    switch (viewMode) {
      case "mobile":
        return (
          <div className="absolute inset-0 pointer-events-none border-8 border-gray-800 rounded-[32px] z-10">
            {/* Smaller notch for mobile */}
            <div className="absolute top-0 left-1/2 transform -translate-x-1/2 w-1/4 h-4 bg-gray-800 rounded-b-lg" />
          </div>
        );
      case "tablet":
        return (
          <div className="absolute inset-0 pointer-events-none border-4 border-gray-700 rounded-2xl z-10">
            {/* Home button for tablet */}
            <div className="absolute bottom-2 left-1/2 transform -translate-x-1/2 w-8 h-8 rounded-full border-2 border-gray-700" />
          </div>
        );
      default:
        return null;
    }
  };

  // Add view mode switcher buttons for easy switching between device types
  const ViewModeSwitcher = () => (
    <div className="absolute top-4 left-4 bg-white rounded-lg shadow-md p-2 z-20 flex items-center space-x-2">
      <button
        className={cn(
          "text-xs px-2 py-1 rounded transition-colors",
          viewMode === "mobile"
            ? "bg-blue-100 text-blue-700"
            : "bg-gray-100 text-gray-600 hover:bg-gray-200"
        )}
        onClick={() => setInternalViewMode("mobile")}
      >
        Mobile
      </button>
      <button
        className={cn(
          "text-xs px-2 py-1 rounded transition-colors",
          viewMode === "tablet"
            ? "bg-blue-100 text-blue-700"
            : "bg-gray-100 text-gray-600 hover:bg-gray-200"
        )}
        onClick={() => setInternalViewMode("tablet")}
      >
        Tablet
      </button>
      <button
        className={cn(
          "text-xs px-2 py-1 rounded transition-colors",
          viewMode === "desktop"
            ? "bg-blue-100 text-blue-700"
            : "bg-gray-100 text-gray-600 hover:bg-gray-200"
        )}
        onClick={() => setInternalViewMode("desktop")}
      >
        Desktop
      </button>

      <span className="text-gray-500 ml-2 text-xs">
        {width} × {height}
      </span>
    </div>
  );

  return (
    <div
      ref={containerRef}
      className="relative h-full w-full flex items-center justify-center bg-gray-100 overflow-auto p-5"
    >
      {/* Scrollable container when preview is larger than viewport */}
      <div className="relative min-h-min flex items-center justify-center">
        {/* Device preview with proper scaling */}
        <div
          className={cn(
            "relative bg-white overflow-hidden transition-all duration-300",
            viewMode === "mobile"
              ? "rounded-[40px]"
              : viewMode === "tablet"
              ? "rounded-2xl"
              : "rounded-lg shadow-md"
          )}
          style={{
            width: `${scaledWidth}px`,
            height: `${scaledHeight}px`,
            maxWidth: "100%",
            maxHeight: "100%",
          }}
        >
          {/* Device frame visuals */}
          {deviceFrame()}

          {/* Frame wrapper needed for perfect scaling */}
          <div className="absolute inset-0 overflow-hidden">
            <iframe
              ref={iframeRef}
              className="border-0"
              title="Site Preview"
              sandbox="allow-same-origin allow-scripts"
              style={{
                width: `${width}px`,
                height: `${height}px`,
                transform: `scale(${scale})`,
                transformOrigin: "top left",
              }}
            />
          </div>
        </div>
      </div>

      {/* View Mode Switcher */}
      <ViewModeSwitcher />

      {/* Control panel - higher z-index to ensure visibility */}
      <div className="absolute bottom-4 right-4 bg-white rounded-lg shadow-md p-2 flex items-center space-x-3 z-20">
        <button
          className="p-1 rounded hover:bg-gray-100 w-6 h-6 flex items-center justify-center"
          onClick={() => {
            setAutoScale(false);
            setScale((prev) => Math.max(prev - 0.1, 0.1));
          }}
          title="Zoom out"
        >
          -
        </button>

        

        <div className="flex items-center space-x-1">
          <span className="text-sm font-medium">
            {Math.round(scale * 100)}%
          </span>
          <button
            onClick={() => setAutoScale(true)}
            className={cn(
              "text-xs px-1 py-0.5 rounded",
              autoScale
                ? "bg-blue-100 text-blue-700"
                : "bg-gray-100 text-gray-600 hover:bg-gray-200"
            )}
            title="Auto-fit to screen"
          >
            Auto
          </button>
        </div>

        <button
          className="p-1 rounded hover:bg-gray-100 w-6 h-6 flex items-center justify-center"
          onClick={() => {
            setAutoScale(false);
            setScale((prev) => Math.min(prev + 0.1, 2));
          }}
          title="Zoom in"
        >
          +
        </button>

        <button
          className="p-1 rounded hover:bg-gray-100 w-6 h-6 flex items-center justify-center"
          onClick={() => {
            setScale(1);
            setAutoScale(false);
          }}
          title="Reset to 100%"
        >
          1:1
        </button>
      </div>
    </div>
  );
}