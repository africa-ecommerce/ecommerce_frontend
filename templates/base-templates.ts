// src/templates/base-template.ts
export class BaseTemplate {
  // Properly declare class properties
  protected config: {
    content: Record<string, any>;
    styles: Record<string, any>;
    [key: string]: any;
  };
  protected defaultStyles: Record<string, string>;
  protected mergedStyles: Record<string, string>;

  constructor(config = {}) {
    this.config = {
      content: {},
      styles: {},
      ...config,
    };
    this.defaultStyles = this.getDefaultStyles();
    this.mergedStyles = this.mergeStyles();
  }

  getDefaultStyles(): Record<string, string> {
    return {
      PRIMARY_COLOR: "#000000",
      SECONDARY_COLOR: "#f5f5f5",
      ACCENT_COLOR: "#ff4081",
      TEXT_COLOR: "#333333",
      BACKGROUND_COLOR: "#ffffff",
      HEADER_BACKGROUND: "#ffffff",
      HEADER_TEXT_COLOR: "#000000",
      BUTTON_COLOR: "#000000",
      BUTTON_TEXT_COLOR: "#ffffff",
      FOOTER_BACKGROUND: "#000000",
      FOOTER_TEXT_COLOR: "#ffffff",
      FONT_FAMILY: "sans-serif",
      CUSTOM_CSS: "",
    };
  }

  mergeStyles(): Record<string, string> {
    return {
      ...this.defaultStyles,
      ...this.config.styles,
    };
  }

  generateCSS(): string {
    return `
      :root {
        --primary-color: ${this.mergedStyles.PRIMARY_COLOR};
        --secondary-color: ${this.mergedStyles.SECONDARY_COLOR};
        --accent-color: ${this.mergedStyles.ACCENT_COLOR};
        --text-color: ${this.mergedStyles.TEXT_COLOR};
        --background-color: ${this.mergedStyles.BACKGROUND_COLOR};
        --header-background: ${this.mergedStyles.HEADER_BACKGROUND};
        --header-text-color: ${this.mergedStyles.HEADER_TEXT_COLOR};
        --button-color: ${this.mergedStyles.BUTTON_COLOR};
        --button-text-color: ${this.mergedStyles.BUTTON_TEXT_COLOR};
        --footer-background: ${this.mergedStyles.FOOTER_BACKGROUND};
        --footer-text-color: ${this.mergedStyles.FOOTER_TEXT_COLOR};
        --font-family: ${this.mergedStyles.FONT_FAMILY};
      }
      
      ${this.templateSpecificCSS()}
      ${this.mergedStyles.CUSTOM_CSS}
    `;
  }

  templateSpecificCSS(): string {
    return `
      /* Responsive Utilities */
      @media (max-width: 768px) {
        .fn-desktop-nav {
          display: none;
        }
        
        .fn-mobile-menu-toggle {
          display: flex;
        }
        
        .fn-products-grid {
          grid-template-columns: repeat(2, 1fr);
        }
      }

      @media (min-width: 1024px) {
        .fn-products-grid {
          grid-template-columns: repeat(4, 1fr);
        }
        
        .fn-header-inner {
          padding: 0 2rem;
        }
      }
    `;
  }

  getHTML(): string {
    throw new Error("getHTML() must be implemented by subclass");
  }

  getContent(path: string, defaultValue: any = ""): any {
    const keys = path.split(".");
    let current = this.config.content;

    for (const key of keys) {
      if (!current || typeof current !== "object") return defaultValue;
      current = current[key];
    }

    return current ?? defaultValue;
  }
}
