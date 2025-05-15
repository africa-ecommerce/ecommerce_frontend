

"use client";

import { useState, useEffect, useRef } from "react";
import useSWR from "swr";
import { cn } from "@/lib/utils";

interface PreviewFrameProps {
  config: any;
  viewMode: "desktop" | "tablet" | "mobile";
  selectedPage: string;
}

const fetcher = async (url: string) => {
  const response = await fetch(url);
  if (!response.ok) {
    throw new Error("Failed to fetch template");
  }
  return await response.text();
};

export default function PreviewFrame({
  config,
  viewMode,
  selectedPage,
}: PreviewFrameProps) {
  const [html, setHtml] = useState<string | null>(null);
  const iframeRef = useRef<HTMLIFrameElement | null>(null);
  const [isLoaded, setIsLoaded] = useState(false);
  // Keep track of current page to detect changes
  const previousPageRef = useRef(selectedPage);

  // Generate the cache key based on templateId and selectedPage
  const cacheKey =
    config.templateId && selectedPage
      ? `/api/template/${config.templateId}/${selectedPage || "index"}`
      : null;

  // Use SWR to fetch and cache the template
  const { data, error, isLoading, mutate } = useSWR(cacheKey, fetcher, {
    revalidateOnFocus: false, // Don't revalidate when window gains focus
    revalidateOnReconnect: false, // Don't revalidate when regaining network
    revalidateIfStale: false, // Only revalidate if explicitly triggered
    shouldRetryOnError: false, // Don't retry on error
    dedupingInterval: 60 * 60 * 1000, // Dedupe requests for 1 hour
  });

  // Update local html state when SWR data changes
  useEffect(() => {
    if (data) {
      setHtml(data);
      setIsLoaded(false); // Reset isLoaded when new HTML is set
    }
  }, [data]);

  // When selectedPage changes, force a revalidation
  useEffect(() => {
    if (previousPageRef.current !== selectedPage) {
      mutate(); // Force SWR to refetch
      previousPageRef.current = selectedPage;
      setIsLoaded(false); // Reset isLoaded state
    }
  }, [selectedPage, mutate]);

  // Determine frame width based on view mode
  const frameWidth = {
    desktop: "w-full",
    tablet: "w-[768px]",
    mobile: "w-[375px]",
  }[viewMode];

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

    // Add special styling for edit mode
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
    `;
    doc.head.appendChild(style);

    // Communicate with the iframe content if needed
    if (iframe.contentWindow) {
      iframe.contentWindow.postMessage(
        { type: "EDITOR_MODE", enabled: true },
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

      // Set loaded state after everything is done
      setIsLoaded(true);
    };

    // Also run disableLinks after a small delay to ensure DOM is fully loaded
    setTimeout(disableLinks, 100);
  }, [html, config]); // Adding config as dependency so changes are detected

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

  // Process HTML to prevent external resource loading
  const processHtmlContent = (htmlContent: string) => {
    // Create a DOM parser to work with the HTML
    const parser = new DOMParser();
    const doc = parser.parseFromString(htmlContent, "text/html");

    // Find and remove all link tags that try to fetch external CSS files
    const externalStylesheets = doc.querySelectorAll('link[rel="stylesheet"]');
    externalStylesheets.forEach((link) => {
      // We could fetch and inline these, but for now we'll just remove them
      link.parentNode?.removeChild(link);
    });

    // Find and inline all script sources
    const scripts = doc.querySelectorAll("script[src]");
    scripts.forEach((script) => {
      // Replace src attribute with a comment so we know what was referenced
      const src = script.getAttribute("src");
      script.removeAttribute("src");
      script.textContent = `// External script reference: ${src} was removed\n${
        script.textContent || ""
      }`;
    });

    // Get the processed HTML string
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

  return (
    <div
      className={cn(
        "h-full mx-auto border rounded-lg shadow-sm overflow-hidden bg-white",
        frameWidth
      )}
    >
      <iframe
        ref={iframeRef}
        className="w-full h-full border-0"
        title="Site Preview"
        sandbox="allow-same-origin allow-scripts"
      />
    </div>
  );
}