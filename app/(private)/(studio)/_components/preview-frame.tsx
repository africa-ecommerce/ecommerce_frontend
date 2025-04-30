
// "use client"

// import { useState, useEffect, useRef } from "react"
// import { cn } from "@/lib/utils"

// interface PreviewFrameProps {
//   config: any
//   viewMode: "desktop" | "tablet" | "mobile"
// }

// export default function PreviewFrame({ config, viewMode }: PreviewFrameProps) {
//   const [html, setHtml] = useState<string | null>(null)
//   const iframeRef = useRef<HTMLIFrameElement>(null)
  
//   // Generate preview HTML
//   useEffect(() => {
//    const generatePreview = async () => {
//      try {
//        const { generateSiteHtml, generateSiteCss } = await import(
//          "@/lib/site-generator"
//        );
//        const generatedHtml = await generateSiteHtml(config);
//        const generatedCss = generateSiteCss(config);

//        // Inject CSS directly into the HTML
//        const htmlWithCss = generatedHtml
//          .replace("<!-- Generated CSS -->", `<style>${generatedCss}</style>`)
//          .replace('<link rel="stylesheet" href="styles.css">', "");

//        setHtml(htmlWithCss);
//      } catch (error) {
//        console.error("Error generating preview:", error);
//      }
//    };

//     generatePreview()
//   }, [config])

//   // Determine frame width based on view mode
//   const frameWidth = {
//     desktop: "w-full",
//     tablet: "w-[768px]",
//     mobile: "w-[375px]",
//   }[viewMode]

//   // When HTML is loaded, inject it into the iframe
//   useEffect(() => {
//     if (html && iframeRef.current) {
//       const iframe = iframeRef.current
//       const doc = iframe.contentDocument || iframe.contentWindow?.document
      
//       if (doc) {
//         doc.open()
//         doc.write(html)
//         doc.close()
//       }
//     }
//   }, [html])

//   if (!html) {
//     return (
//       <div className="w-full h-full flex items-center justify-center">
//         <div className="text-center">
//           <div className="animate-spin h-8 w-8 border-4 border-primary border-t-transparent rounded-full mx-auto mb-4"></div>
//           <p>Loading template preview...</p>
//         </div>
//       </div>
//     )
//   }

//   return (
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


"use client";

import { useState, useEffect, useRef } from "react";
import { cn } from "@/lib/utils";

interface PreviewFrameProps {
  config: any;
  viewMode: "desktop" | "tablet" | "mobile";
}

export default function PreviewFrame({ config, viewMode }: PreviewFrameProps) {
  const [html, setHtml] = useState<string | null>(null);
  const [loading, setLoading] = useState(true);
  const iframeRef = useRef<HTMLIFrameElement | null>(null);

  // Generate preview HTML
  useEffect(() => {
    setLoading(true);

    const generatePreview = async () => {
      try {
        const { generateSiteHtml } = await import("@/lib/site-generator");
        const generatedHtml = await generateSiteHtml(config, false); // false for preview mode

        setHtml(generatedHtml);
        setLoading(false);
      } catch (error) {
        console.error("Error generating preview:", error);
        setLoading(false);
      }
    };

    generatePreview();
  }, [config]);

  // Determine frame width based on view mode
  const frameWidth = {
    desktop: "w-full",
    tablet: "w-[768px]",
    mobile: "w-[375px]",
  }[viewMode];

  // When HTML is loaded, inject it into the iframe with special handling
  useEffect(() => {
    if (html && iframeRef.current) {
      const iframe = iframeRef.current;
      const doc = iframe.contentDocument || iframe.contentWindow?.document;

      if (doc) {
        // Inject HTML
        doc.open();
        doc.write(html);
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
      }
    }
  }, [html]);

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-[400px]">
        <div className="animate-spin h-8 w-8 border-4 border-primary border-t-transparent rounded-full"></div>
        <span className="ml-3">Loading template preview...</span>
      </div>
    );
  }

 return (
    <div className={cn("h-full mx-auto border rounded-lg shadow-sm overflow-hidden bg-white", frameWidth)}>
      <iframe 
        ref={iframeRef}
        className="w-full h-full border-0" 
        title="Site Preview"
        sandbox="allow-same-origin allow-scripts"
      />
    </div>
  )
}