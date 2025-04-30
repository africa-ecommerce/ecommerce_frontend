
// Import HTML template functions
import { uploadToMinio, getMinioPublicUrl } from "@/app/actions/minio";
import { getFashionNovaTemplate } from "@/templates/fashion-nova-template";
import {getFashionTemplate} from "@/templates/fashionNova-template";
import { getNovaTemplateNovaTemplate } from "@/templates/luxe-template";
// import { getNovaTemplateNovaTemplate } from "@/templates/nova-templates";

getNovaTemplateNovaTemplate

// Map of template IDs to their template functions
const templates = {
  "fashion-nova": getNovaTemplateNovaTemplate,
  "fashion-boutique": getFashionTemplate,
  // "luxury-fashion": getLUXETemplateNovaTemplate,
};

/**
 * Generate HTML for a site based on configuration
 * @param config - The site configuration
 * @param isDeployment - Whether this is for deployment (true) or preview (false)
 */
export async function generateSiteHtml(config, isDeployment = false) {
  try {
    // Get the template function
    const templateFunction = templates[config.templateId];

    if (!templateFunction) {
      throw new Error(`Template not found: ${config.templateId}`);
    }

    // Generate HTML content
    const content = templateFunction(config);

    // Create a complete HTML document
    const html = `
    <!DOCTYPE html>
    <html lang="en">
      <head>
        <meta charset="UTF-8">
        <meta name="viewport" content="width=device-width, initial-scale=1.0">
        <title>${config.metadata?.title || "Generated Site"}</title>
        <meta name="description" content="${config.metadata?.description || ""}">
        <link rel="icon" href="${config.metadata?.favicon || "/favicon.ico"}">
        ${
          config.styles?.FONT_FAMILY
            ? `
          <link href="https://fonts.googleapis.com/css2?family=${config.styles.FONT_FAMILY.replace(
            / /g,
            "+"
          ).replace(/,.+/, "")}&display=swap" rel="stylesheet">`
            : ""
        }
        ${ `
        <!-- Generated CSS for preview -->
        <style>
          ${generateSiteCss(config)}
        </style>
        `}
      </head>
      <body>
        ${content}
      </body>
    </html>
    `;

    return html;
  } catch (error) {
    console.error("Error generating site HTML:", error);
    throw error;
  }
}



/**
 * Generate and deploy a site to MinIO
 * @param config - The site configuration
 */
export async function generateAndDeploySite(config) {
  try {
    // Create a unique path for this site
    const sitePath = `sites/${config.userId || "demo"}/${
      config.siteId || Date.now()
    }`;
    
    // First, generate and upload the CSS file
    const css = generateSiteCss(config);
    await uploadToMinio(`${sitePath}/styles.css`, css, "text/css");
    
    // Upload the JSON configuration file
    await uploadToMinio(
      `${sitePath}/config.json`,
      JSON.stringify(config, null, 2),
      "application/json"
    );
    
    // Get the public URLs for CSS and JSON before generating HTML
    const cssUrlResult = await getMinioPublicUrl(`${sitePath}/styles.css`);
    const jsonUrlResult = await getMinioPublicUrl(`${sitePath}/config.json`);
    
    if (!cssUrlResult.success || !jsonUrlResult.success) {
      throw new Error("Failed to generate URLs for CSS or JSON files");
    }
    
    // Get the template function
    const templateFunction = templates[config.templateId];
    if (!templateFunction) {
      throw new Error(`Template not found: ${config.templateId}`);
    }
    
    // Generate HTML content from template
    const content = templateFunction(config);
    
    // Create HTML with absolute URLs for CSS and JSON
    const html = `
    <!DOCTYPE html>
    <html lang="en">
      <head>
        <meta charset="UTF-8">
        <meta name="viewport" content="width=device-width, initial-scale=1.0">
        <title>${config.metadata?.title || "Generated Site"}</title>
        <meta name="description" content="${config.metadata?.description || ""}">
        <link rel="icon" href="${config.metadata?.favicon || "/favicon.ico"}">
        ${
          config.styles?.FONT_FAMILY
            ? `
          <link href="https://fonts.googleapis.com/css2?family=${config.styles.FONT_FAMILY.replace(
            / /g,
            "+"
          ).replace(/,.+/, "")}&display=swap" rel="stylesheet">`
            : ""
        }
        <!-- Link to the generated CSS file with absolute URL -->
        <link rel="stylesheet" href="${cssUrlResult.url}" type="text/css">
        <!-- Load configuration JSON if needed -->
        <script>
          window.siteConfig = null;
          fetch('${jsonUrlResult.url}')
            .then(response => response.json())
            .then(config => {
              window.siteConfig = config;
              console.log('Site configuration loaded');
            })
            .catch(err => console.error('Failed to load site configuration', err));
        </script>
      </head>
      <body>
        ${content}
      </body>
    </html>
    `;
    
    // Upload the HTML file with the absolute URLs embedded
    const uploadResult = await uploadToMinio(
      `${sitePath}/index.html`,
      html,
      "text/html"
    );
    
    // Get the public URL for the HTML file
    const htmlUrlResult = await getMinioPublicUrl(`${sitePath}/index.html`);
    
    if (!htmlUrlResult.success) {
      throw new Error("Failed to generate URL for HTML file");
    }
    
    // Return the deployment result
    return {
      success: uploadResult.success,
      siteUrl: htmlUrlResult.url,
      cssUrl: cssUrlResult.url,  // Include CSS URL in the result
      configUrl: jsonUrlResult.url,  // Include JSON URL in the result
      sitePath,
      timestamp: new Date().toISOString(),
    };
  } catch (error) {
    console.error("Error generating and deploying site:", error);
    return {
      success: false,
      error: error instanceof Error ? error.message : "Unknown error",
      timestamp: new Date().toISOString(),
    };
  }
}

/**
 * Generate CSS for a site based on configuration
 * @param config - The site configuration
 */
export function generateSiteCss(config) {
  return `
    /* Generated CSS for ${config.templateId} */
    :root {
      --primary-color: ${config.styles?.PRIMARY_COLOR || "#000000"};
      --secondary-color: ${config.styles?.SECONDARY_COLOR || "#f5f5f5"};
      --accent-color: ${config.styles?.ACCENT_COLOR || "#ff4081"};
      --text-color: ${config.styles?.TEXT_COLOR || "#333333"};
      --background-color: ${config.styles?.BACKGROUND_COLOR || "#ffffff"};
      --header-background: ${config.styles?.HEADER_BACKGROUND || "#ffffff"};
      --header-text-color: ${config.styles?.HEADER_TEXT_COLOR || "#000000"};
      --button-color: ${config.styles?.BUTTON_COLOR || "#000000"};
      --button-text-color: ${config.styles?.BUTTON_TEXT_COLOR || "#ffffff"};
      --footer-background: ${config.styles?.FOOTER_BACKGROUND || "#000000"};
      --footer-text-color: ${config.styles?.FOOTER_TEXT_COLOR || "#ffffff"};
      --font-family: ${config.styles?.FONT_FAMILY || "sans-serif"};
    }
    
    /* Base styles */
    * {
      box-sizing: border-box;
      margin: 0;
      padding: 0;
    }
    
    body {
      font-family: var(--font-family);
      color: var(--text-color);
      background-color: var(--background-color);
      line-height: 1.6;
    }
    
   
    
    
    ${config.styles?.CUSTOM_CSS || ""}
  `;
}
