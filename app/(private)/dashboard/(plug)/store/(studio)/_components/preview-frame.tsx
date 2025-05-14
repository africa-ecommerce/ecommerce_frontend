
// "use client";

// import { useState, useEffect, useRef } from "react";
// import { cn } from "@/lib/utils";

// interface PreviewFrameProps {
//   config: any;
//   viewMode: "desktop" | "tablet" | "mobile";
// }


//  const fetchTemplateById = async (templateId: string, page = "index") => {
//   try {
//     const response = await fetch(`/api/template/basic/${page}`);
//     if (!response.ok) {
//       throw new Error('Failed to fetch template');
//     }
//     return await response.json();
//   } catch (error) {
//     console.error('Error fetching template:', error);
//     throw error;
//   }
// };

// export default function PreviewFrame({ config, viewMode }: PreviewFrameProps) {
//   const [html, setHtml] = useState<string | null>(null);
//   const [loading, setLoading] = useState(true);
//   const iframeRef = useRef<HTMLIFrameElement | null>(null);
//   const [isLoaded, setIsLoaded] = useState(false);

//   // Generate preview HTML
//   useEffect(() => {
//     setLoading(true);

//     const generatePreview = async () => {
//       try {
//         const templateId = config.templateId;
//         const page = config.page || "index";
//         const templateData = await fetchTemplateById(templateId, page);
//         setHtml(templateData);
//       } catch (error) {
//         console.error("Error generating preview:", error);
//       } finally {
//         setLoading(false);
//       }
//     };

//     generatePreview();
//   }, [config]);

//   // Determine frame width based on view mode
//   const frameWidth = {
//     desktop: "w-full",
//     tablet: "w-[768px]",
//     mobile: "w-[375px]",
//   }[viewMode];

//   // When HTML is loaded, inject it into the iframe with special handling
//   useEffect(() => {
//     if (html && iframeRef.current) {
//       const iframe = iframeRef.current;
//       const doc = iframe.contentDocument || iframe.contentWindow?.document;

//       if (doc) {
//         // Inject HTML
//         doc.open();
//         doc.write(html);
//         doc.close();

//         // Give the iframe content a hint that we're in edit/preview mode
//         // if (doc.body) {
//         //   doc.body.setAttribute("data-editor", "true");
//         // }

//         // // Add special styling for edit mode
//         // const style = doc.createElement("style");
//         // style.textContent = `
//         //   [data-editor="true"] {
//         //     /* Styles for edit mode */
//         //   }
//         //   /* Make iframe content unselectable to prevent accidental editing */
//         //   .unselectable-content {
//         //     user-select: none;
//         //     -webkit-user-select: none;
//         //   }
//         // `;
//         // doc.head.appendChild(style);

//         // Communicate with the iframe content if needed
//         // if (iframe.contentWindow) {
//         //   iframe.contentWindow.postMessage(
//         //     { type: "EDITOR_MODE", enabled: true },
//         //     "*"
//         //   );
//         // }

//         iframe.onload = () => {
//           setIsLoaded(true);
//         };
//       }
//     }
//   }, [html]);


//   const applyConfig = () => {
//     if (!isLoaded || !iframeRef.current) return;

//     try {
//       // Call the updateConfig function inside the iframe
//       iframeRef.current.contentWindow?.updateConfig(config);

//       // Notify parent component that config was applied successfully
//       // if (onConfigApplied) {
//       //   onConfigApplied(true);
//       // }
//     } catch (error) {
//       console.error("Error applying config:", error);
//       // if (onConfigApplied) {
//       //   onConfigApplied(false, error);
//       // }
//     }
//   };

//   useEffect(() => {
//     if (isLoaded && config) {
//       applyConfig();
//     }
//   }, [isLoaded, config]);


//   if (loading) {
//     return (
//       <div className="flex items-center justify-center min-h-[400px]">
//         <div className="animate-spin h-8 w-8 border-4 border-primary border-t-transparent rounded-full"></div>
//         <span className="ml-3">Loading template preview...</span>
//       </div>
//     );
//   }

//  return (
//     <div className={cn("h-full mx-auto border rounded-lg shadow-sm overflow-hidden bg-white", frameWidth)}>
//       <iframe 
//         ref={iframeRef}
//         className="w-full h-full border-0" 
//         title="Site Preview"
//         sandbox="allow-same-origin allow-scripts"
//       />
//     </div>
//   )
// }



// "use client";

// import { useState, useEffect, useRef } from "react";
// import { cn } from "@/lib/utils";

// interface PreviewFrameProps {
//   config: any;
//   viewMode: "desktop" | "tablet" | "mobile";
// }

// const fetchTemplateById = async (templateId: string, page = "index") => {
//   try {
//     const response = await fetch(`/api/template/basic/${page}`);
//     if (!response.ok) {
//       throw new Error("Failed to fetch template");
//     }
//     return await response.text();
//   } catch (error) {
//     console.error("Error fetching template:", error);
//     throw error;
//   }
// };

// export default function PreviewFrame({ config, viewMode }: PreviewFrameProps) {
//   const [html, setHtml] = useState<string | null>(null);
//   const [loading, setLoading] = useState(true);
//   const iframeRef = useRef<HTMLIFrameElement | null>(null);
//   const [isLoaded, setIsLoaded] = useState(false);
//   const previousTemplateIdRef = useRef<string | null>(null);
//   const previousPageRef = useRef<string | null>(null);

//   // Generate preview HTML only when templateId or page changes
//   useEffect(() => {
//     const templateId = config.templateId;
//     const page = config.page || "index";

//     // Only fetch if templateId or page has changed
//     if (
//       templateId !== previousTemplateIdRef.current ||
//       page !== previousPageRef.current
//     ) {
//       setLoading(true);

//       const generatePreview = async () => {
//         try {
//           const templateHtml = await fetchTemplateById(templateId, page);
//           setHtml(templateHtml);
//           // Update refs to current values
//           previousTemplateIdRef.current = templateId;
//           previousPageRef.current = page;
//         } catch (error) {
//           console.error("Error generating preview:", error);
//         } finally {
//           setLoading(false);
//         }
//       };

//       generatePreview();
//     }
//   }, [config.templateId, config.page]);

//   // Determine frame width based on view mode
//   const frameWidth = {
//     desktop: "w-full",
//     tablet: "w-[768px]",
//     mobile: "w-[375px]",
//   }[viewMode];

//   // When HTML is loaded, inject it into the iframe with special handling
//   useEffect(() => {
//     if (!html || !iframeRef.current) return;

//     const iframe = iframeRef.current;
//     const doc = iframe.contentDocument || iframe.contentWindow?.document;

//     if (!doc) return;

//     // Inject HTML
//     doc.open();
//     doc.write(html);
//     doc.close();

//     // Give the iframe content a hint that we're in edit/preview mode
//     if (doc.body) {
//       doc.body.setAttribute("data-editor", "true");
//     }

//     // Add special styling for edit mode
//     const style = doc.createElement("style");
//     style.textContent = `
//       [data-editor="true"] {
//         /* Styles for edit mode */
//       }
//       /* Make iframe content unselectable to prevent accidental editing */
//       .unselectable-content {
//         user-select: none;
//         -webkit-user-select: none;
//       }
//     `;
//     doc.head.appendChild(style);

//     // Communicate with the iframe content if needed
//     if (iframe.contentWindow) {
//       iframe.contentWindow.postMessage(
//         { type: "EDITOR_MODE", enabled: true },
//         "*"
//       );
//     }

//     // Add event listener to prevent link navigation
//     const disableLinks = () => {
//       const links = doc.querySelectorAll("a");
//       links.forEach((link) => {
//         link.addEventListener("click", (e) => {
//           e.preventDefault();
//           console.log("Link navigation prevented:", link.href);
//         });
//         // Visual indication that links are disabled
//         link.style.cursor = "default";
//       });
//     };

//     // Set up iframe onload
//     iframe.onload = () => {
//       setIsLoaded(true);
//       disableLinks();
//     };

//     // Also run disableLinks after a small delay to ensure DOM is fully loaded
//     setTimeout(disableLinks, 100);
//   }, [html]);

//   // Apply config to the iframe content
//   useEffect(() => {
//     if (!isLoaded || !iframeRef.current) return;

//     try {
//       // Call the updateConfig function inside the iframe
//       const contentWindow = iframeRef.current.contentWindow;
//       if (contentWindow && typeof contentWindow.updateConfig === "function") {

//         console.log("Applying config to iframe:", config);
//         contentWindow.updateConfig({
//           colorBackground: "#000000"
//         });
//       } else {
//         console.warn("updateConfig function not found in iframe");
//       }
//     } catch (error) {
//       console.error("Error applying config:", error);
//     }
//   }, [isLoaded, config]);

//   if (loading && !html) {
//     return (
//       <div className="flex items-center justify-center min-h-[400px]">
//         <div className="animate-spin h-8 w-8 border-4 border-primary border-t-transparent rounded-full"></div>
//         <span className="ml-3">Loading template preview...</span>
//       </div>
//     );
//   }

//   return (
//     <div
//       className={cn(
//         "h-full mx-auto border rounded-lg shadow-sm overflow-hidden bg-white",
//         frameWidth
//       )}
//     >
//       <iframe
//         ref={iframeRef}
//         className="w-full h-full border-0"
//         title="Site Preview"
//         sandbox="allow-same-origin allow-scripts"
//       />
//     </div>
//   );
// }


// "use client";

// import { useState, useEffect, useRef } from "react";
// import { cn } from "@/lib/utils";

// interface PreviewFrameProps {
//   config: any;
//   viewMode: "desktop" | "tablet" | "mobile";
//   selectedPage: string
// }

// const fetchTemplateById = async (templateId: string, page = "index") => {
//   try {
//     const response = await fetch(`/api/template/${templateId}/${page}`);
//     if (!response.ok) {
//       throw new Error("Failed to fetch template");
//     }
//     return await response.text();
//   } catch (error) {
//     console.error("Error fetching template:", error);
//     throw error;
//   }
// };

// export default function PreviewFrame({ config, viewMode, selectedPage }: PreviewFrameProps) {
//   const [html, setHtml] = useState<string | null>(null);
//   const [loading, setLoading] = useState(true);
//   const iframeRef = useRef<HTMLIFrameElement | null>(null);
//   const [isLoaded, setIsLoaded] = useState(false);
//   const previousTemplateIdRef = useRef<string | null>(null);
//   const previousPageRef = useRef<string | null>(null);

//   console.log("selectedPage", selectedPage)

//   console.log("config", config)

//   // Generate preview HTML only when templateId or page changes
//   useEffect(() => {
//     const templateId = config.templateId;
//     const page = selectedPage || "index";

//     // Only fetch if templateId or page has changed
//     if (
//       templateId !== previousTemplateIdRef.current ||
//       page !== previousPageRef.current
//     ) {
//       setLoading(true);

//       const generatePreview = async () => {
//         try {
//           const templateHtml = await fetchTemplateById(templateId, page);
//           setHtml(templateHtml);
//           // Update refs to current values
//           previousTemplateIdRef.current = templateId;
//           previousPageRef.current = page;
//         } catch (error) {
//           console.error("Error generating preview:", error);
//         } finally {
//           setLoading(false);
//         }
//       };

//       generatePreview();
//     }
//   }, [config.templateId, selectedPage]);

//   // Determine frame width based on view mode
//   const frameWidth = {
//     desktop: "w-full",
//     tablet: "w-[768px]",
//     mobile: "w-[375px]",
//   }[viewMode];

//   // When HTML is loaded, inject it into the iframe with special handling
//   useEffect(() => {
//     if (!html || !iframeRef.current) return;

//     const iframe = iframeRef.current;
//     const doc = iframe.contentDocument || iframe.contentWindow?.document;

//     if (!doc) return;

//     // Extract and process content to prevent external resource loading
//     const processedHtml = processHtmlContent(html);

//     // Inject HTML
//     doc.open();
//     doc.write(processedHtml);
//     doc.close();

//     // Give the iframe content a hint that we're in edit/preview mode
//     if (doc.body) {
//       doc.body.setAttribute("data-editor", "true");
//     }

//     // Add special styling for edit mode
//     const style = doc.createElement("style");
//     style.textContent = `
//       [data-editor="true"] {
//         /* Styles for edit mode */
//       }
//       /* Make iframe content unselectable to prevent accidental editing */
//       .unselectable-content {
//         user-select: none;
//         -webkit-user-select: none;
//       }
//     `;
//     doc.head.appendChild(style);

//     // Communicate with the iframe content if needed
//     if (iframe.contentWindow) {
//       iframe.contentWindow.postMessage(
//         { type: "EDITOR_MODE", enabled: true },
//         "*"
//       );
//     }

//     // Add event listener to prevent link navigation
//     const disableLinks = () => {
//       const links = doc.querySelectorAll("a");
//       links.forEach((link) => {
//         link.addEventListener("click", (e) => {
//           e.preventDefault();
//           console.log("Link navigation prevented:", link.href);
//         });
//         // Visual indication that links are disabled
//         link.style.cursor = "default";
//       });
//     };

//     // Set up iframe onload
//     iframe.onload = () => {
//       setIsLoaded(true);
//       disableLinks();
//     };

//     // Also run disableLinks after a small delay to ensure DOM is fully loaded
//     setTimeout(disableLinks, 100);
//   }, [html]);

//   // Process HTML to prevent external resource loading
//   const processHtmlContent = (htmlContent: string) => {
//     // Create a DOM parser to work with the HTML
//     const parser = new DOMParser();
//     const doc = parser.parseFromString(htmlContent, "text/html");

//     // Find and remove all link tags that try to fetch external CSS files
//     const externalStylesheets = doc.querySelectorAll('link[rel="stylesheet"]');
//     externalStylesheets.forEach((link) => {
//       // We could fetch and inline these, but for now we'll just remove them
//       link.parentNode?.removeChild(link);
//     });

//     // Find and inline all script sources
//     const scripts = doc.querySelectorAll("script[src]");
//     scripts.forEach((script) => {
//       // Replace src attribute with a comment so we know what was referenced
//       const src = script.getAttribute("src");
//       script.removeAttribute("src");
//       script.textContent = `// External script reference: ${src} was removed\n${
//         script.textContent || ""
//       }`;
//     });

//     // Get the processed HTML string
//     return doc.documentElement.outerHTML;
//   };

//   // Apply config to the iframe content
//   useEffect(() => {
//     if (!isLoaded || !iframeRef.current) return;

//     try {
//       // Call the updateConfig function inside the iframe
//       const contentWindow = iframeRef.current.contentWindow;
//       if (contentWindow && typeof contentWindow.updateConfig === "function") {
//         console.log("Applying config to iframe:", config);
//         contentWindow.updateConfig(config);
//       } else {
//         console.warn("updateConfig function not found in iframe");
//       }
//     } catch (error) {
//       console.error("Error applying config:", error);
//     }
//   }, [isLoaded, config]);

//   if (loading && !html) {
//     return (
//       <div className="flex items-center justify-center min-h-[400px]">
//         <div className="animate-spin h-8 w-8 border-4 border-primary border-t-transparent rounded-full"></div>
//         <span className="ml-3">Loading template preview...</span>
//       </div>
//     );
//   }

//   return (
//     <div
//       className={cn(
//         "h-full mx-auto border rounded-lg shadow-sm overflow-hidden bg-white",
//         frameWidth
//       )}
//     >
//       <iframe
//         ref={iframeRef}
//         className="w-full h-full border-0"
//         title="Site Preview"
//         sandbox="allow-same-origin allow-scripts"
//       />
//     </div>
//   );
// }


// "use client";

// import { useState, useEffect, useRef } from "react";
// import useSWR from "swr";
// import { cn } from "@/lib/utils";

// interface PreviewFrameProps {
//   config: any;
//   viewMode: "desktop" | "tablet" | "mobile";
//   selectedPage: string;
// }

// const fetcher = async (url: string) => {
//   const response = await fetch(url);
//   if (!response.ok) {
//     throw new Error("Failed to fetch template");
//   }
//   return await response.text();
// };

// export default function PreviewFrame({
//   config,
//   viewMode,
//   selectedPage,
// }: PreviewFrameProps) {
//   const [html, setHtml] = useState<string | null>(null);
//   const iframeRef = useRef<HTMLIFrameElement | null>(null);
//   const [isLoaded, setIsLoaded] = useState(false);

//   // Generate the cache key based on templateId and selectedPage
//   const cacheKey =
//     config.templateId && selectedPage
//       ? `/api/template/${config.templateId}/${selectedPage || "index"}`
//       : null;

//   // Use SWR to fetch and cache the template
//   const { data, error, isLoading } = useSWR(cacheKey, fetcher, {
//     revalidateOnFocus: false, // Don't revalidate when window gains focus
//     revalidateOnReconnect: false, // Don't revalidate when regaining network
//     revalidateIfStale: false, // Only revalidate if explicitly triggered
//     shouldRetryOnError: false, // Don't retry on error
//     dedupingInterval: 60 * 60 * 1000, // Dedupe requests for 1 hour
//   });

//   // Update local html state when SWR data changes
//   useEffect(() => {
//     if (data) {
//       setHtml(data);
//     }
//   }, [data]);

//   // Determine frame width based on view mode
//   const frameWidth = {
//     desktop: "w-full",
//     tablet: "w-[768px]",
//     mobile: "w-[375px]",
//   }[viewMode];

//   // When HTML is loaded, inject it into the iframe with special handling
//   useEffect(() => {
//     if (!html || !iframeRef.current) return;

//     const iframe = iframeRef.current;
//     const doc = iframe.contentDocument || iframe.contentWindow?.document;

//     if (!doc) return;

//     // Extract and process content to prevent external resource loading
//     const processedHtml = processHtmlContent(html);

//     // Inject HTML
//     doc.open();
//     doc.write(processedHtml);
//     doc.close();

//     // Give the iframe content a hint that we're in edit/preview mode
//     if (doc.body) {
//       doc.body.setAttribute("data-editor", "true");
//     }

//     // Add special styling for edit mode
//     const style = doc.createElement("style");
//     style.textContent = `
//       [data-editor="true"] {
//         /* Styles for edit mode */
//       }
//       /* Make iframe content unselectable to prevent accidental editing */
//       .unselectable-content {
//         user-select: none;
//         -webkit-user-select: none;
//       }
//     `;
//     doc.head.appendChild(style);

//     // Communicate with the iframe content if needed
//     if (iframe.contentWindow) {
//       iframe.contentWindow.postMessage(
//         { type: "EDITOR_MODE", enabled: true },
//         "*"
//       );
//     }

//     // Add event listener to prevent link navigation
//     const disableLinks = () => {
//       const links = doc.querySelectorAll("a");
//       links.forEach((link) => {
//         link.addEventListener("click", (e) => {
//           e.preventDefault();
//           console.log("Link navigation prevented:", link.href);
//         });
//         // Visual indication that links are disabled
//         link.style.cursor = "default";
//       });
//     };

//     // Set up iframe onload
//     iframe.onload = () => {
//       setIsLoaded(true);
//       disableLinks();
//     };

//     // Also run disableLinks after a small delay to ensure DOM is fully loaded
//     setTimeout(disableLinks, 100);
//   }, [html]);

//   // Process HTML to prevent external resource loading
//   const processHtmlContent = (htmlContent: string) => {
//     // Create a DOM parser to work with the HTML
//     const parser = new DOMParser();
//     const doc = parser.parseFromString(htmlContent, "text/html");

//     // Find and remove all link tags that try to fetch external CSS files
//     const externalStylesheets = doc.querySelectorAll('link[rel="stylesheet"]');
//     externalStylesheets.forEach((link) => {
//       // We could fetch and inline these, but for now we'll just remove them
//       link.parentNode?.removeChild(link);
//     });

//     // Find and inline all script sources
//     const scripts = doc.querySelectorAll("script[src]");
//     scripts.forEach((script) => {
//       // Replace src attribute with a comment so we know what was referenced
//       const src = script.getAttribute("src");
//       script.removeAttribute("src");
//       script.textContent = `// External script reference: ${src} was removed\n${
//         script.textContent || ""
//       }`;
//     });

//     // Get the processed HTML string
//     return doc.documentElement.outerHTML;
//   };

//   // Apply config to the iframe content
//   useEffect(() => {
//     if (!isLoaded || !iframeRef.current) return;

//     try {
//       // Call the updateConfig function inside the iframe
//       const contentWindow = iframeRef.current.contentWindow;
//       if (contentWindow && typeof contentWindow.updateConfig === "function") {
//         console.log("Applying config to iframe:", config);
//         contentWindow.updateConfig(config);
//       } else {
//         console.warn("updateConfig function not found in iframe");
//       }
//     } catch (error) {
//       console.error("Error applying config:", error);
//     }
//   }, [isLoaded, config]);

//   if (isLoading && !html) {
//     return (
//       <div className="flex items-center justify-center min-h-[400px]">
//         <div className="animate-spin h-8 w-8 border-4 border-primary border-t-transparent rounded-full"></div>
//         <span className="ml-3">Loading template preview...</span>
//       </div>
//     );
//   }

//   if (error) {
//     return (
//       <div className="flex items-center justify-center min-h-[400px] text-red-500">
//         Error loading template: {error.message}
//       </div>
//     );
//   }

//   return (
//     <div
//       className={cn(
//         "h-full mx-auto border rounded-lg shadow-sm overflow-hidden bg-white",
//         frameWidth
//       )}
//     >
//       <iframe
//         ref={iframeRef}
//         className="w-full h-full border-0"
//         title="Site Preview"
//         sandbox="allow-same-origin allow-scripts"
//       />
//     </div>
//   );
// }


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