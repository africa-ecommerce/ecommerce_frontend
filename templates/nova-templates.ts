// // src/templates/base-template.ts
// export class BaseTemplate {
//   // Properly declare class properties
//   protected config: {
//     content: Record<string, any>
//     styles: Record<string, any>
//     [key: string]: any
//   }
//   protected defaultStyles: Record<string, string>
//   protected mergedStyles: Record<string, string>

//   constructor(config = {}) {
//     this.config = {
//       content: {},
//       styles: {},
//       ...config,
//     }
//     this.defaultStyles = this.getDefaultStyles()
//     this.mergedStyles = this.mergeStyles()
//   }

//   getDefaultStyles(): Record<string, string> {
//     return {
//       PRIMARY_COLOR: "#000000",
//       SECONDARY_COLOR: "#f5f5f5",
//       ACCENT_COLOR: "#ff4081",
//       TEXT_COLOR: "#333333",
//       BACKGROUND_COLOR: "#ffffff",
//       HEADER_BACKGROUND: "#ffffff",
//       HEADER_TEXT_COLOR: "#000000",
//       BUTTON_COLOR: "#000000",
//       BUTTON_TEXT_COLOR: "#ffffff",
//       FOOTER_BACKGROUND: "#000000",
//       FOOTER_TEXT_COLOR: "#ffffff",
//       FONT_FAMILY: "sans-serif",
//       CUSTOM_CSS: "",
//     }
//   }

//   mergeStyles(): Record<string, string> {
//     return {
//       ...this.defaultStyles,
//       ...this.config.styles,
//     }
//   }

//   generateCSS(): string {
//     return `
//       :root {
//         --primary-color: ${this.mergedStyles.PRIMARY_COLOR};
//         --secondary-color: ${this.mergedStyles.SECONDARY_COLOR};
//         --accent-color: ${this.mergedStyles.ACCENT_COLOR};
//         --text-color: ${this.mergedStyles.TEXT_COLOR};
//         --background-color: ${this.mergedStyles.BACKGROUND_COLOR};
//         --header-background: ${this.mergedStyles.HEADER_BACKGROUND};
//         --header-text-color: ${this.mergedStyles.HEADER_TEXT_COLOR};
//         --button-color: ${this.mergedStyles.BUTTON_COLOR};
//         --button-text-color: ${this.mergedStyles.BUTTON_TEXT_COLOR};
//         --footer-background: ${this.mergedStyles.FOOTER_BACKGROUND};
//         --footer-text-color: ${this.mergedStyles.FOOTER_TEXT_COLOR};
//         --font-family: ${this.mergedStyles.FONT_FAMILY};
//       }
      
//       ${this.templateSpecificCSS()}
//       ${this.mergedStyles.CUSTOM_CSS}
//     `
//   }

//   templateSpecificCSS(): string {
//     return `
//       /* Responsive Utilities */
//       @media (max-width: 768px) {
//         .fn-desktop-nav {
//           display: none;
//         }
        
//         .fn-mobile-menu-toggle {
//           display: flex;
//         }
        
//         .fn-products-grid {
//           grid-template-columns: repeat(2, 1fr);
//         }
//       }

//       @media (min-width: 1024px) {
//         .fn-products-grid {
//           grid-template-columns: repeat(4, 1fr);
//         }
        
//         .fn-header-inner {
//           padding: 0 2rem;
//         }
//       }
//     `
//   }

//   getHTML(): string {
//     throw new Error("getHTML() must be implemented by subclass")
//   }

//   getContent(path: string, defaultValue: any = ""): any {
//     const keys = path.split(".")
//     let current = this.config.content

//     for (const key of keys) {
//       if (!current || typeof current !== "object") return defaultValue
//       current = current[key]
//     }

//     return current ?? defaultValue
//   }

// }


// export class NovaTemplate extends BaseTemplate {
//   templateSpecificCSS(): string {
//     return `
//       /* NOVA Custom Styles */
//       :root {
//         --primary-color: #C91A42;
//         --secondary-color: #f8f9fa;
//         --accent-color: #C91A42;
//         --text-color: #2d2d2d;
//         --header-bg: #ffffff;
//         --header-text: #000000;
//         --footer-bg: #f5f5f5;
//         --footer-text: #333333;
//         --font-heading: 'Playfair Display', serif;
//         --font-body: 'Lato', sans-serif;
//         --border-color: #e5e5e5;
//         --success-color: #28a745;
//         --error-color: #dc3545;
//         --warning-color: #ffc107;
//         --light-bg: #f8f9fa;
//         --dark-bg: #212529;
//       }

//       .nova-template {
//         font-family: var(--font-body);
//         color: var(--text-color);
//         line-height: 1.6;
//         display: flex;
//         flex-direction: column;
//         min-height: 100vh;
//       }

//       h1, h2, h3, h4, h5, h6 {
//         font-family: var(--font-heading);
//         font-weight: 600;
//         letter-spacing: 0.5px;
//         margin-bottom: 1rem;
//       }

//       a {
//         text-decoration: none;
//         color: inherit;
//         transition: color 0.3s ease;
//       }

//       a:hover {
//         color: var(--primary-color);
//       }

//       .container {
//         max-width: 1200px;
//         margin: 0 auto;
//         padding: 0 1rem;
//       }

//       /* Header Styles */
//       .nova-header {
//         background: var(--header-bg);
//         padding: 1rem 0;
//         position: sticky;
//         top: 0;
//         z-index: 1000;
//         box-shadow: 0 2px 10px rgba(0,0,0,0.05);
//       }

//       .nova-nav {
//         display: flex;
//         justify-content: space-between;
//         align-items: center;
//         padding: 0 1rem;
//       }

//       .nova-logo {
//         font-family: var(--font-heading);
//         font-size: 1.75rem;
//         color: var(--header-text);
//         text-decoration: none;
//         letter-spacing: 2px;
//         font-weight: bold;
//       }

//       .main-nav {
//         display: flex;
//         gap: 2rem;
//         align-items: center;
//       }

//       .nav-link {
//         color: var(--header-text);
//         text-decoration: none;
//         font-size: 0.9rem;
//         text-transform: uppercase;
//         letter-spacing: 1px;
//         transition: all 0.3s;
//         cursor: pointer;
//         position: relative;
//       }

//       .nav-link:after {
//         content: '';
//         position: absolute;
//         width: 0;
//         height: 2px;
//         bottom: -5px;
//         left: 0;
//         background-color: var(--primary-color);
//         transition: width 0.3s;
//       }

//       .nav-link:hover:after,
//       .nav-link.active:after {
//         width: 100%;
//       }

//       .nav-icons {
//         display: flex;
//         gap: 1.5rem;
//         align-items: center;
//       }

//       .icon-btn {
//         background: none;
//         border: none;
//         cursor: pointer;
//         font-size: 1.25rem;
//         color: var(--header-text);
//         transition: color 0.3s;
//         display: flex;
//         align-items: center;
//         justify-content: center;
//       }

//       .icon-btn:hover {
//         color: var(--primary-color);
//       }

//       .cart-count {
//         position: absolute;
//         top: -8px;
//         right: -8px;
//         background: var(--primary-color);
//         color: white;
//         font-size: 0.7rem;
//         width: 18px;
//         height: 18px;
//         border-radius: 50%;
//         display: flex;
//         align-items: center;
//         justify-content: center;
//       }

//       /* Mobile Menu */
//       .mobile-menu-toggle {
//         display: none;
//         background: none;
//         border: none;
//         font-size: 1.5rem;
//         cursor: pointer;
//       }

//       .mobile-menu {
//         display: none;
//         position: fixed;
//         top: 0;
//         left: 0;
//         right: 0;
//         bottom: 0;
//         background: white;
//         z-index: 1001;
//         padding: 2rem;
//         flex-direction: column;
//       }

//       .mobile-menu-header {
//         display: flex;
//         justify-content: space-between;
//         align-items: center;
//         margin-bottom: 2rem;
//       }

//       .mobile-menu-close {
//         background: none;
//         border: none;
//         font-size: 1.5rem;
//         cursor: pointer;
//       }

//       .mobile-nav-links {
//         display: flex;
//         flex-direction: column;
//         gap: 1.5rem;
//       }

//       .mobile-nav-link {
//         font-size: 1.2rem;
//         text-transform: uppercase;
//         letter-spacing: 1px;
//       }

//       /* Hero Section */
//       .hero-section {
//         position: relative;
//         height: 80vh;
//         background-color: #f5f5f5;
//         display: flex;
//         align-items: center;
//         justify-content: center;
//         text-align: center;
//         color: var(--text-color);
//         padding: 2rem;
//       }

//       .hero-content {
//         max-width: 800px;
//         z-index: 1;
//       }

//       .hero-title {
//         font-size: 3.5rem;
//         margin-bottom: 1.5rem;
//       }

//       .hero-subtitle {
//         font-size: 1.25rem;
//         margin-bottom: 2rem;
//         opacity: 0.9;
//       }

//       .cta-buttons {
//         display: flex;
//         gap: 1rem;
//         justify-content: center;
//         flex-wrap: wrap;
//       }

//       .cta-button {
//         display: inline-block;
//         padding: 0.75rem 1.5rem;
//         background-color: var(--primary-color);
//         color: white;
//         border: none;
//         border-radius: 4px;
//         font-size: 0.9rem;
//         text-transform: uppercase;
//         letter-spacing: 1px;
//         cursor: pointer;
//         transition: all 0.3s;
//       }

//       .cta-button:hover {
//         background-color: #a8142f;
//         transform: translateY(-2px);
//       }

//       .cta-button.secondary {
//         background-color: transparent;
//         border: 1px solid var(--primary-color);
//         color: var(--primary-color);
//       }

//       .cta-button.secondary:hover {
//         background-color: var(--primary-color);
//         color: white;
//       }

//       /* Section Styles */
//       .section {
//         padding: 4rem 0;
//       }

//       .section-title {
//         text-align: center;
//         margin-bottom: 3rem;
//         font-size: 2.5rem;
//       }

//       /* Product Grid */
//       .product-grid {
//         display: grid;
//         grid-template-columns: repeat(auto-fill, minmax(250px, 1fr));
//         gap: 2rem;
//       }

//       .product-card {
//         border: 1px solid var(--border-color);
//         border-radius: 8px;
//         overflow: hidden;
//         transition: all 0.3s;
//         background: white;
//       }

//       .product-card:hover {
//         transform: translateY(-5px);
//         box-shadow: 0 10px 20px rgba(0,0,0,0.1);
//       }

//       .product-image {
//         height: 300px;
//         background: #f8f9fa;
//         position: relative;
//         overflow: hidden;
//       }

//       .product-image img {
//         width: 100%;
//         height: 100%;
//         object-fit: cover;
//         transition: transform 0.5s;
//       }

//       .product-card:hover .product-image img {
//         transform: scale(1.05);
//       }

//       .product-tag {
//         position: absolute;
//         top: 1rem;
//         left: 1rem;
//         background: var(--primary-color);
//         color: white;
//         padding: 0.25rem 0.75rem;
//         border-radius: 4px;
//         font-size: 0.8rem;
//         z-index: 1;
//       }

//       .product-details {
//         padding: 1.5rem;
//       }

//       .product-title {
//         font-size: 1.1rem;
//         margin-bottom: 0.5rem;
//       }

//       .product-category {
//         color: #777;
//         font-size: 0.9rem;
//         margin-bottom: 0.5rem;
//       }

//       .product-price {
//         font-weight: bold;
//         font-size: 1.1rem;
//         margin-top: 0.5rem;
//       }

//       /* Category Section */
//       .category-grid {
//         display: grid;
//         grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
//         gap: 2rem;
//       }

//       .category-card {
//         position: relative;
//         border-radius: 8px;
//         overflow: hidden;
//         aspect-ratio: 1;
//         transition: transform 0.3s;
//       }

//       .category-card:hover {
//         transform: translateY(-5px);
//       }

//       .category-image {
//         width: 100%;
//         height: 100%;
//         object-fit: cover;
//       }

//       .category-content {
//         position: absolute;
//         bottom: 0;
//         left: 0;
//         right: 0;
//         padding: 2rem;
//         background: linear-gradient(transparent, rgba(0,0,0,0.7));
//         color: white;
//       }

//       .category-title {
//         font-size: 1.5rem;
//         margin-bottom: 1rem;
//       }

//       /* Story Section */
//       .story-section {
//         background-color: var(--light-bg);
//         padding: 5rem 0;
//       }

//       .story-container {
//         display: grid;
//         grid-template-columns: 1fr 1fr;
//         gap: 3rem;
//         align-items: center;
//       }

//       .story-content {
//         padding: 2rem;
//       }

//       .story-image {
//         width: 100%;
//         height: 100%;
//         object-fit: cover;
//         border-radius: 8px;
//       }

//       /* Newsletter Section */
//       .newsletter-section {
//         background-color: var(--primary-color);
//         color: white;
//         padding: 4rem 0;
//         text-align: center;
//       }

//       .newsletter-content {
//         max-width: 600px;
//         margin: 0 auto;
//       }

//       .newsletter-form {
//         display: flex;
//         gap: 0.5rem;
//         margin-top: 2rem;
//         justify-content: center;
//       }

//       .newsletter-input {
//         padding: 0.75rem 1rem;
//         border: none;
//         border-radius: 4px;
//         width: 100%;
//         max-width: 400px;
//       }

//       .newsletter-button {
//         padding: 0.75rem 1.5rem;
//         background-color: var(--dark-bg);
//         color: white;
//         border: none;
//         border-radius: 4px;
//         cursor: pointer;
//         transition: background-color 0.3s;
//       }

//       .newsletter-button:hover {
//         background-color: #000;
//       }

//       .disclaimer {
//         font-size: 0.9rem;
//         margin-top: 1rem;
//         opacity: 0.8;
//       }

//       /* Product Detail Page */
//       .product-detail {
//         display: grid;
//         grid-template-columns: 1fr 1fr;
//         gap: 3rem;
//         padding: 2rem 0;
//       }

//       .product-gallery {
//         display: grid;
//         grid-template-columns: 80px 1fr;
//         gap: 1rem;
//       }

//       .thumbnail-column {
//         display: flex;
//         flex-direction: column;
//         gap: 1rem;
//       }

//       .thumbnail {
//         width: 80px;
//         height: 80px;
//         border: 1px solid var(--border-color);
//         border-radius: 4px;
//         cursor: pointer;
//         overflow: hidden;
//       }

//       .thumbnail img {
//         width: 100%;
//         height: 100%;
//         object-fit: cover;
//       }

//       .thumbnail.active {
//         border-color: var(--primary-color);
//       }

//       .main-image {
//         border: 1px solid var(--border-color);
//         border-radius: 8px;
//         overflow: hidden;
//         height: 500px;
//       }

//       .main-image img {
//         width: 100%;
//         height: 100%;
//         object-fit: cover;
//       }

//       .product-info {
//         padding: 1rem 0;
//       }

//       .product-detail-title {
//         font-size: 2rem;
//         margin-bottom: 0.5rem;
//       }

//       .product-rating {
//         display: flex;
//         align-items: center;
//         gap: 0.5rem;
//         margin-bottom: 1rem;
//       }

//       .stars {
//         color: #ffc107;
//       }

//       .review-count {
//         color: #777;
//         font-size: 0.9rem;
//       }

//       .product-detail-price {
//         font-size: 1.5rem;
//         font-weight: bold;
//         margin-bottom: 1.5rem;
//       }

//       .product-options {
//         margin-bottom: 2rem;
//       }

//       .option-label {
//         font-weight: bold;
//         margin-bottom: 0.5rem;
//         display: block;
//       }

//       .color-options {
//         display: flex;
//         gap: 0.5rem;
//         margin-bottom: 1.5rem;
//       }

//       .color-option {
//         width: 30px;
//         height: 30px;
//         border-radius: 50%;
//         cursor: pointer;
//         border: 2px solid transparent;
//       }

//       .color-option.active {
//         border-color: var(--primary-color);
//       }

//       .size-options {
//         display: flex;
//         gap: 0.5rem;
//         margin-bottom: 1.5rem;
//       }

//       .size-option {
//         padding: 0.5rem 1rem;
//         border: 1px solid var(--border-color);
//         border-radius: 4px;
//         cursor: pointer;
//         transition: all 0.3s;
//       }

//       .size-option.active {
//         background-color: var(--primary-color);
//         color: white;
//         border-color: var(--primary-color);
//       }

//       .quantity-selector {
//         display: flex;
//         align-items: center;
//         gap: 1rem;
//         margin-bottom: 2rem;
//       }

//       .quantity-label {
//         font-weight: bold;
//       }

//       .quantity-controls {
//         display: flex;
//         align-items: center;
//         border: 1px solid var(--border-color);
//         border-radius: 4px;
//       }

//       .quantity-btn {
//         width: 40px;
//         height: 40px;
//         background: none;
//         border: none;
//         font-size: 1.2rem;
//         cursor: pointer;
//         display: flex;
//         align-items: center;
//         justify-content: center;
//       }

//       .quantity-input {
//         width: 40px;
//         height: 40px;
//         border: none;
//         text-align: center;
//         font-size: 1rem;
//       }

//       .product-actions {
//         display: flex;
//         gap: 1rem;
//         margin-bottom: 2rem;
//       }

//       .add-to-cart {
//         flex: 1;
//       }

//       .add-to-wishlist {
//         padding: 0.75rem 1.5rem;
//         background: none;
//         border: 1px solid var(--border-color);
//         border-radius: 4px;
//         cursor: pointer;
//         transition: all 0.3s;
//       }

//       .add-to-wishlist:hover {
//         background-color: #f5f5f5;
//       }

//       .product-tabs {
//         margin-top: 2rem;
//         border-top: 1px solid var(--border-color);
//       }

//       .tabs-header {
//         display: flex;
//         border-bottom: 1px solid var(--border-color);
//       }

//       .tab-btn {
//         padding: 1rem 2rem;
//         background: none;
//         border: none;
//         border-bottom: 2px solid transparent;
//         cursor: pointer;
//         font-weight: bold;
//         transition: all 0.3s;
//       }

//       .tab-btn.active {
//         border-bottom-color: var(--primary-color);
//         color: var(--primary-color);
//       }

//       .tab-content {
//         padding: 2rem 0;
//       }

//       .tab-pane {
//         display: none;
//       }

//       .tab-pane.active {
//         display: block;
//       }

//       /* Related Products */
//       .related-products {
//         padding: 4rem 0;
//       }

//       /* Cart Page */
//       .cart-page {
//         padding: 2rem 0;
//       }

//       .cart-title {
//         margin-bottom: 2rem;
//       }

//       .cart-empty {
//         text-align: center;
//         padding: 4rem 0;
//       }

//       .cart-empty-icon {
//         font-size: 4rem;
//         margin-bottom: 1rem;
//         color: #ccc;
//       }

//       .cart-table {
//         width: 100%;
//         border-collapse: collapse;
//       }

//       .cart-table th {
//         text-align: left;
//         padding: 1rem;
//         border-bottom: 1px solid var(--border-color);
//       }

//       .cart-table td {
//         padding: 1rem;
//         border-bottom: 1px solid var(--border-color);
//         vertical-align: middle;
//       }

//       .cart-product {
//         display: flex;
//         align-items: center;
//         gap: 1rem;
//       }

//       .cart-product-image {
//         width: 80px;
//         height: 80px;
//         border-radius: 4px;
//         overflow: hidden;
//       }

//       .cart-product-image img {
//         width: 100%;
//         height: 100%;
//         object-fit: cover;
//       }

//       .cart-product-info {
//         flex: 1;
//       }

//       .cart-product-title {
//         font-weight: bold;
//         margin-bottom: 0.25rem;
//       }

//       .cart-product-variant {
//         font-size: 0.9rem;
//         color: #777;
//       }

//       .cart-quantity {
//         display: flex;
//         align-items: center;
//       }

//       .cart-remove {
//         background: none;
//         border: none;
//         color: #777;
//         cursor: pointer;
//         transition: color 0.3s;
//       }

//       .cart-remove:hover {
//         color: var(--error-color);
//       }

//       .cart-summary {
//         background-color: #f9f9f9;
//         border-radius: 8px;
//         padding: 2rem;
//         margin-top: 2rem;
//       }

//       .cart-summary-title {
//         margin-bottom: 1.5rem;
//       }

//       .summary-row {
//         display: flex;
//         justify-content: space-between;
//         margin-bottom: 1rem;
//       }

//       .summary-row.total {
//         font-weight: bold;
//         font-size: 1.2rem;
//         border-top: 1px solid var(--border-color);
//         padding-top: 1rem;
//         margin-top: 1rem;
//       }

//       .promo-code {
//         margin: 1.5rem 0;
//       }

//       .promo-form {
//         display: flex;
//         gap: 0.5rem;
//       }

//       .promo-input {
//         flex: 1;
//         padding: 0.75rem 1rem;
//         border: 1px solid var(--border-color);
//         border-radius: 4px;
//       }

//       .promo-button {
//         padding: 0.75rem 1.5rem;
//         background-color: var(--dark-bg);
//         color: white;
//         border: none;
//         border-radius: 4px;
//         cursor: pointer;
//       }

//       .checkout-button {
//         width: 100%;
//         padding: 1rem;
//         background-color: var(--primary-color);
//         color: white;
//         border: none;
//         border-radius: 4px;
//         font-size: 1rem;
//         text-transform: uppercase;
//         letter-spacing: 1px;
//         cursor: pointer;
//         transition: background-color 0.3s;
//       }

//       .checkout-button:hover {
//         background-color: #a8142f;
//       }

//       .cart-actions {
//         display: flex;
//         justify-content: space-between;
//         margin-top: 2rem;
//       }

//       /* Collections Page */
//       .collections-page {
//         padding: 2rem 0;
//       }

//       .collections-grid {
//         display: grid;
//         grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
//         gap: 2rem;
//       }

//       .collection-card {
//         position: relative;
//         border-radius: 8px;
//         overflow: hidden;
//         aspect-ratio: 3/4;
//       }

//       .collection-image {
//         width: 100%;
//         height: 100%;
//         object-fit: cover;
//       }

//       .collection-content {
//         position: absolute;
//         bottom: 0;
//         left: 0;
//         right: 0;
//         padding: 2rem;
//         background: linear-gradient(transparent, rgba(0,0,0,0.7));
//         color: white;
//       }

//       /* Products Page */
//       .products-page {
//         padding: 2rem 0;
//         display: grid;
//         grid-template-columns: 250px 1fr;
//         gap: 2rem;
//       }

//       .filters-sidebar {
//         padding-right: 2rem;
//       }

//       .filter-section {
//         margin-bottom: 2rem;
//       }

//       .filter-title {
//         display: flex;
//         justify-content: space-between;
//         align-items: center;
//         margin-bottom: 1rem;
//         cursor: pointer;
//       }

//       .filter-content {
//         margin-bottom: 1rem;
//       }

//       .filter-option {
//         display: flex;
//         align-items: center;
//         gap: 0.5rem;
//         margin-bottom: 0.5rem;
//       }

//       .filter-checkbox {
//         width: 18px;
//         height: 18px;
//       }

//       .price-range {
//         margin-top: 1rem;
//       }

//       .price-slider {
//         width: 100%;
//         margin-bottom: 1rem;
//       }

//       .price-inputs {
//         display: flex;
//         justify-content: space-between;
//       }

//       .color-filter {
//         display: flex;
//         flex-wrap: wrap;
//         gap: 0.5rem;
//       }

//       .color-filter-option {
//         width: 30px;
//         height: 30px;
//         border-radius: 50%;
//         cursor: pointer;
//         border: 2px solid transparent;
//       }

//       .color-filter-option.active {
//         border-color: var(--primary-color);
//       }

//       .products-header {
//         display: flex;
//         justify-content: space-between;
//         align-items: center;
//         margin-bottom: 2rem;
//       }

//       .sort-dropdown {
//         padding: 0.5rem 1rem;
//         border: 1px solid var(--border-color);
//         border-radius: 4px;
//       }

//       /* Blog Page */
//       .blog-page {
//         padding: 2rem 0;
//       }

//       .blog-grid {
//         display: grid;
//         grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
//         gap: 2rem;
//       }

//       .blog-card {
//         border: 1px solid var(--border-color);
//         border-radius: 8px;
//         overflow: hidden;
//         transition: transform 0.3s;
//       }

//       .blog-card:hover {
//         transform: translateY(-5px);
//         box-shadow: 0 10px 20px rgba(0,0,0,0.1);
//       }

//       .blog-image {
//         height: 200px;
//         overflow: hidden;
//       }

//       .blog-image img {
//         width: 100%;
//         height: 100%;
//         object-fit: cover;
//         transition: transform 0.5s;
//       }

//       .blog-card:hover .blog-image img {
//         transform: scale(1.05);
//       }

//       .blog-content {
//         padding: 1.5rem;
//       }

//       .blog-date {
//         font-size: 0.9rem;
//         color: #777;
//         margin-bottom: 0.5rem;
//       }

//       .blog-title {
//         font-size: 1.25rem;
//         margin-bottom: 0.5rem;
//       }

//       .blog-excerpt {
//         margin-bottom: 1rem;
//         color: #555;
//       }

//       .blog-link {
//         color: var(--primary-color);
//         font-weight: bold;
//       }

//       /* Blog Post Page */
//       .blog-post {
//         max-width: 800px;
//         margin: 0 auto;
//         padding: 2rem 0;
//       }

//       .post-header {
//         margin-bottom: 2rem;
//       }

//       .post-title {
//         font-size: 2.5rem;
//         margin-bottom: 1rem;
//       }

//       .post-meta {
//         display: flex;
//         gap: 1rem;
//         color: #777;
//         font-size: 0.9rem;
//         margin-bottom: 1rem;
//       }

//       .post-image {
//         width: 100%;
//         height: 400px;
//         border-radius: 8px;
//         overflow: hidden;
//         margin-bottom: 2rem;
//       }

//       .post-image img {
//         width: 100%;
//         height: 100%;
//         object-fit: cover;
//       }

//       .post-content {
//         line-height: 1.8;
//       }

//       .post-content p {
//         margin-bottom: 1.5rem;
//       }

//       .post-content h2 {
//         margin-top: 2rem;
//         margin-bottom: 1rem;
//       }

//       .post-content img {
//         max-width: 100%;
//         border-radius: 8px;
//         margin: 1.5rem 0;
//       }

//       .post-tags {
//         display: flex;
//         gap: 0.5rem;
//         margin-top: 2rem;
//         flex-wrap: wrap;
//       }

//       .post-tag {
//         padding: 0.25rem 0.75rem;
//         background-color: #f5f5f5;
//         border-radius: 4px;
//         font-size: 0.9rem;
//       }

//       /* About Page */
//       .about-page {
//         padding: 2rem 0;
//       }

//       .about-hero {
//         text-align: center;
//         padding: 4rem 0;
//         background-color: #f5f5f5;
//         margin-bottom: 4rem;
//       }

//       .about-hero-title {
//         font-size: 3rem;
//         margin-bottom: 1rem;
//       }

//       .about-hero-subtitle {
//         font-size: 1.25rem;
//         max-width: 800px;
//         margin: 0 auto;
//       }

//       .about-section {
//         margin-bottom: 4rem;
//       }

//       .about-grid {
//         display: grid;
//         grid-template-columns: 1fr 1fr;
//         gap: 3rem;
//         align-items: center;
//       }

//       .about-image {
//         width: 100%;
//         height: 100%;
//         border-radius: 8px;
//         overflow: hidden;
//       }

//       .about-image img {
//         width: 100%;
//         height: 100%;
//         object-fit: cover;
//       }

//       .about-content {
//         padding: 2rem;
//       }

//       .values-grid {
//         display: grid;
//         grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
//         gap: 2rem;
//         margin: 4rem 0;
//       }

//       .value-card {
//         text-align: center;
//         padding: 2rem;
//         border: 1px solid var(--border-color);
//         border-radius: 8px;
//         transition: transform 0.3s;
//       }

//       .value-card:hover {
//         transform: translateY(-5px);
//         box-shadow: 0 10px 20px rgba(0,0,0,0.1);
//       }

//       .value-icon {
//         font-size: 2.5rem;
//         margin-bottom: 1rem;
//         color: var(--primary-color);
//       }

//       .team-grid {
//         display: grid;
//         grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
//         gap: 2rem;
//         margin: 4rem 0;
//       }

//       .team-card {
//         text-align: center;
//       }

//       .team-image {
//         width: 200px;
//         height: 200px;
//         border-radius: 50%;
//         overflow: hidden;
//         margin: 0 auto 1rem;
//       }

//       .team-image img {
//         width: 100%;
//         height: 100%;
//         object-fit: cover;
//       }

//       .team-name {
//         font-size: 1.25rem;
//         margin-bottom: 0.5rem;
//       }

//       .team-role {
//         color: #777;
//         font-size: 0.9rem;
//       }

//       /* Contact Page */
//       .contact-page {
//         padding: 2rem 0;
//       }

//       .contact-grid {
//         display: grid;
//         grid-template-columns: 1fr 2fr;
//         gap: 3rem;
//       }

//       .contact-info {
//         background-color: #f5f5f5;
//         padding: 2rem;
//         border-radius: 8px;
//       }

//       .info-card {
//         margin-bottom: 2rem;
//       }

//       .info-card h3 {
//         display: flex;
//         align-items: center;
//         gap: 0.5rem;
//         margin-bottom: 0.5rem;
//       }

//       .contact-form {
//         display: grid;
//         gap: 1.5rem;
//       }

//       .form-group {
//         display: grid;
//         gap: 0.5rem;
//       }

//       .form-label {
//         font-weight: bold;
//       }

//       .form-input {
//         padding: 0.75rem 1rem;
//         border: 1px solid var(--border-color);
//         border-radius: 4px;
//         width: 100%;
//       }

//       .form-textarea {
//         padding: 0.75rem 1rem;
//         border: 1px solid var(--border-color);
//         border-radius: 4px;
//         width: 100%;
//         min-height: 150px;
//         resize: vertical;
//       }

//       /* Footer Styles */
//       .nova-footer {
//         background: var(--footer-bg);
//         color: var(--footer-text);
//         padding: 4rem 0 2rem;
//         margin-top: auto;
//       }

//       .footer-grid {
//         display: grid;
//         grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
//         gap: 2rem;
//         margin-bottom: 3rem;
//       }

//       .footer-col h4 {
//         font-size: 1.25rem;
//         margin-bottom: 1.5rem;
//       }

//       .footer-links {
//         list-style: none;
//         padding: 0;
//         display: grid;
//         gap: 0.75rem;
//       }

//       .footer-link {
//         color: var(--footer-text);
//         opacity: 0.8;
//         transition: opacity 0.3s;
//       }

//       .footer-link:hover {
//         opacity: 1;
//         color: var(--primary-color);
//       }

//       .footer-newsletter {
//         display: grid;
//         gap: 1rem;
//         margin-top: 1rem;
//       }

//       .footer-input {
//         padding: 0.75rem 1rem;
//         border: 1px solid var(--border-color);
//         border-radius: 4px;
//         width: 100%;
//       }

//       .footer-button {
//         padding: 0.75rem 1.5rem;
//         background-color: var(--primary-color);
//         color: white;
//         border: none;
//         border-radius: 4px;
//         cursor: pointer;
//         transition: background-color 0.3s;
//       }

//       .footer-button:hover {
//         background-color: #a8142f;
//       }

//       .social-links {
//         display: flex;
//         gap: 1rem;
//         margin-top: 1rem;
//       }

//       .social-link {
//         width: 40px;
//         height: 40px;
//         border-radius: 50%;
//         background-color: rgba(255,255,255,0.1);
//         display: flex;
//         align-items: center;
//         justify-content: center;
//         transition: background-color 0.3s;
//       }

//       .social-link:hover {
//         background-color: var(--primary-color);
//       }

//       .copyright {
//         text-align: center;
//         padding-top: 2rem;
//         border-top: 1px solid rgba(255,255,255,0.1);
//         font-size: 0.9rem;
//         opacity: 0.8;
//       }

//       /* Page Transitions */
//       .page-transition {
//         opacity: 0;
//         transition: opacity 0.3s ease;
//       }

//       .page-transition.active {
//         opacity: 1;
//       }

//       /* Responsive Styles */
//       @media (max-width: 1024px) {
//         .hero-title {
//           font-size: 3rem;
//         }

//         .product-detail {
//           grid-template-columns: 1fr;
//         }

//         .about-grid {
//           grid-template-columns: 1fr;
//         }

//         .story-container {
//           grid-template-columns: 1fr;
//         }

//         .contact-grid {
//           grid-template-columns: 1fr;
//         }

//         .products-page {
//           grid-template-columns: 1fr;
//         }

//         .filters-sidebar {
//           padding-right: 0;
//         }
//       }

//       @media (max-width: 768px) {
//         .nova-nav {
//           padding: 0 1rem;
//         }

//         .main-nav {
//           display: none;
//         }

//         .mobile-menu-toggle {
//           display: block;
//         }

//         .hero-title {
//           font-size: 2.5rem;
//         }

//         .hero-section {
//           height: 60vh;
//         }

//         .product-gallery {
//           grid-template-columns: 1fr;
//         }

//         .thumbnail-column {
//           flex-direction: row;
//           overflow-x: auto;
//           margin-top: 1rem;
//         }

//         .cart-table {
//           display: block;
//           overflow-x: auto;
//         }

//         .cart-actions {
//           flex-direction: column;
//           gap: 1rem;
//         }

//         .newsletter-form {
//           flex-direction: column;
//         }
//       }

//       @media (max-width: 480px) {
//         .hero-title {
//           font-size: 2rem;
//         }

//         .cta-buttons {
//           flex-direction: column;
//           width: 100%;
//         }

//         .cta-button {
//           width: 100%;
//         }

//         .product-actions {
//           flex-direction: column;
//         }

//         .add-to-wishlist {
//           width: 100%;
//         }
//       }
//     `
//   }

//   getHTML(): string {
//     return `
//       <div class="nova-template">
//         ${this.generateHeader()}
//         <main class="page-container" id="page-container">
//           <div id="app-content" class="page-transition active">
//             <!-- Page content will be loaded here -->
//           </div>
//         </main>
//         ${this.generateFooter()}
//       </div>
//       ${this.generateTemplates()}
//       ${this.generateScripts()}
//     `
//   }

//   private generateHeader(): string {
//     return `
//       <header class="nova-header">
//         <nav class="nova-nav">
//           <a href="#" class="nova-logo" onclick="if(window.novaRouter) window.novaRouter.navigate('home'); return false;">${this.config.content.BRAND_NAME || "LUXE"}</a>
//           <div class="main-nav">
//             <a class="nav-link" onclick="if(window.novaRouter) window.novaRouter.navigate('home'); return false;">Home</a>
//             <a class="nav-link" onclick="if(window.novaRouter) window.novaRouter.navigate('collections'); return false;">Collections</a>
//             <a class="nav-link" onclick="if(window.novaRouter) window.novaRouter.navigate('blog'); return false;">Blog</a>
//             <a class="nav-link" onclick="if(window.novaRouter) window.novaRouter.navigate('about'); return false;">About</a>
//             <a class="nav-link" onclick="if(window.novaRouter) window.novaRouter.navigate('contact'); return false;">Contact</a>
//           </div>
//           <div class="nav-icons">
//             <button class="icon-btn" onclick="document.getElementById('search-overlay').style.display='flex'">
//               <i class="search-icon">🔍</i>
//             </button>
//             <button class="icon-btn" style="position: relative;" onclick="if(window.novaRouter) window.novaRouter.navigate('cart'); return false;">
//               <i class="cart-icon">🛒</i>
//               <span class="cart-count" id="cart-count">0</span>
//             </button>
//           </div>
//           <button class="mobile-menu-toggle" onclick="document.getElementById('mobile-menu').style.display='flex'">
//             ☰
//           </button>
//         </nav>
//       </header>
//       <div id="mobile-menu" class="mobile-menu" style="display: none;">
//         <div class="mobile-menu-header">
//           <a href="#" class="nova-logo" onclick="if(window.novaRouter) window.novaRouter.navigate('home'); document.getElementById('mobile-menu').style.display='none'; return false;">${this.config.content.BRAND_NAME || "LUXE"}</a>
//           <button class="mobile-menu-close" onclick="document.getElementById('mobile-menu').style.display='none'">
//             ✕
//           </button>
//         </div>
//         <div class="mobile-nav-links">
//           <a class="mobile-nav-link" onclick="if(window.novaRouter) window.novaRouter.navigate('home'); document.getElementById('mobile-menu').style.display='none'; return false;">Home</a>
//           <a class="mobile-nav-link" onclick="if(window.novaRouter) window.novaRouter.navigate('collections'); document.getElementById('mobile-menu').style.display='none'; return false;">Collections</a>
//           <a class="mobile-nav-link" onclick="if(window.novaRouter) window.novaRouter.navigate('blog'); document.getElementById('mobile-menu').style.display='none'; return false;">Blog</a>
//           <a class="mobile-nav-link" onclick="if(window.novaRouter) window.novaRouter.navigate('about'); document.getElementById('mobile-menu').style.display='none'; return false;">About</a>
//           <a class="mobile-nav-link" onclick="if(window.novaRouter) window.novaRouter.navigate('contact'); document.getElementById('mobile-menu').style.display='none'; return false;">Contact</a>
//         </div>
//       </div>
//       <div id="search-overlay" style="display: none; position: fixed; top: 0; left: 0; right: 0; bottom: 0; background: rgba(255,255,255,0.95); z-index: 1000; align-items: center; justify-content: center; flex-direction: column; padding: 2rem;">
//         <button style="position: absolute; top: 2rem; right: 2rem; background: none; border: none; font-size: 1.5rem; cursor: pointer;" onclick="document.getElementById('search-overlay').style.display='none'">
//           ✕
//         </button>
//         <h2 style="margin-bottom: 2rem;">Search for products...</h2>
//         <div style="width: 100%; max-width: 600px; display: flex;">
//           <input type="text" placeholder="Search for products..." style="flex: 1; padding: 1rem; border: 1px solid #ddd; border-right: none; border-radius: 4px 0 0 4px;">
//           <button style="padding: 1rem 2rem; background: var(--primary-color); color: white; border: none; border-radius: 0 4px 4px 0; cursor: pointer;">Search</button>
//         </div>
//       </div>
//     `
//   }

//   private generateTemplates(): string {
//     return `
//       <!-- Template for Home page -->
//       <template id="home-template">
//         ${this.generateHeroSection()}
//         ${this.generateFeaturedProducts()}
//         ${this.generateStorySection()}
//         ${this.generateNewsletter()}
//       </template>

//       <!-- Template for Collections page -->
//       <template id="collections-template">
//         ${this.generateCollectionsPage()}
//       </template>

//       <!-- Template for Blog page -->
//       <template id="blog-template">
//         ${this.generateBlogPage()}
//       </template>

//       <!-- Template for Blog Post page -->
//       <template id="blog-post-template">
//         ${this.generateBlogPostPage()}
//       </template>

//       <!-- Template for About page -->
//       <template id="about-template">
//         ${this.generateAboutPage()}
//       </template>

//       <!-- Template for Contact page -->
//       <template id="contact-template">
//         ${this.generateContactPage()}
//       </template>

//       <!-- Template for Products page -->
//       <template id="products-template">
//         ${this.generateProductsPage()}
//       </template>

//       <!-- Template for Product Detail page -->
//       <template id="product-detail-template">
//         ${this.generateProductDetailPage()}
//       </template>

//       <!-- Template for Cart page -->
//       <template id="cart-template">
//         ${this.generateCartPage()}
//       </template>

//       <!-- Template for Empty Cart page -->
//       <template id="empty-cart-template">
//         ${this.generateEmptyCartPage()}
//       </template>

//       <!-- Template for 404 Not Found -->
//       <template id="not-found-template">
//         <section class="not-found" style="text-align: center; padding: 6rem 2rem;">
//           <h1>Page Not Found</h1>
//           <p>The page you requested could not be found.</p>
//           <button class="cta-button" onclick="if(window.novaRouter) window.novaRouter.navigate('home'); return false;">Return to Homepage</button>
//         </section>
//       </template>
//     `
//   }

//   private generateHeroSection(): string {
//     return `
//       <section class="hero-section" style="background-image: linear-gradient(rgba(0,0,0,0.3), rgba(0,0,0,0.3)), url('/placeholder.svg?height=800&width=1600'); background-size: cover; background-position: center; color: white;">
//         <div class="hero-content">
//           <h1 class="hero-title">${this.config.content.HERO_TITLE || "Summer Collection 2024"}</h1>
//           <p class="hero-subtitle">${this.config.content.HERO_DESCRIPTION || "Discover the latest trends and elevate your style with our exclusive pieces."}</p>
//           <div class="cta-buttons">
//             <button class="cta-button" onclick="if(window.novaRouter) window.novaRouter.navigate('collections'); return false;">${this.config.content.PRIMARY_CTA_TEXT || "Shop Collection"}</button>
//             <button class="cta-button secondary" onclick="if(window.novaRouter) window.novaRouter.navigate('about'); return false;">${this.config.content.SECONDARY_CTA_TEXT || "Our Story"}</button>
//           </div>
//         </div>
//       </section>
//     `
//   }

  
//   private generateFeaturedProducts(): string {
//     return `
//       <section class="section">
//         <div class="container">
//           <h2 class="section-title">${this.config.content.PRODUCTS_TITLE || "Featured Products"}</h2>
//           <div class="product-grid">
//             ${this.generateProductCards(8)}
//           </div>
//           <div style="text-align: center; margin-top: 3rem;">
//             <button class="cta-button" onclick="if(window.novaRouter) window.novaRouter.navigate('products'); return false;">View All Products</button>
//           </div>
//         </div>
//       </section>
//     `
//   }

//   private generateProductCards(count: number): string {
//     const products = [
//       { id: 1, name: "Silk Blend Midi Dress", category: "Dresses", price: 129.99, tag: "New" },
//       { id: 2, name: "Tailored Wool Blazer", category: "Outerwear", price: 189.99, tag: "" },
//       { id: 3, name: "Organic Cotton T-Shirt", category: "Tops", price: 39.99, tag: "Sustainable" },
//       { id: 4, name: "High-Rise Slim Jeans", category: "Bottoms", price: 79.99, tag: "" },
//       { id: 5, name: "Leather Crossbody Bag", category: "Accessories", price: 119.99, tag: "Bestseller" },
//       { id: 6, name: "Cashmere Sweater", category: "Tops", price: 149.99, tag: "" },
//       { id: 7, name: "Linen Blend Shirt", category: "Tops", price: 69.99, tag: "" },
//       { id: 8, name: "Pleated Midi Skirt", category: "Bottoms", price: 89.99, tag: "" },
//       { id: 9, name: "Merino Wool Scarf", category: "Accessories", price: 59.99, tag: "" },
//       { id: 10, name: "Leather Chelsea Boots", category: "Shoes", price: 159.99, tag: "" },
//     ]

//     return products
//       .slice(0, count)
//       .map(
//         (product) => `
//       <div class="product-card">
//         <div class="product-image">
//           ${product.tag ? `<span class="product-tag">${product.tag}</span>` : ""}
//           <img src="/placeholder.svg?height=400&width=300" alt="${product.name}">
//         </div>
//         <div class="product-details">
//           <h3 class="product-title">${product.name}</h3>
//           <p class="product-category">${product.category}</p>
//           <p class="product-price">$${product.price.toFixed(2)}</p>
//           <button class="cta-button" onclick="if(window.novaRouter) window.novaRouter.navigate('product-detail', { id: ${product.id} }); return false;">View Product</button>
//         </div>
//       </div>
//     `,
//       )
//       .join("")
//   }

//   private generateStorySection(): string {
//     return `
//       <section class="story-section">
//         <div class="container">
//           <div class="story-container">
//             <div class="story-content">
//               <h2>${this.config.content.ABOUT_TITLE || "Our Story"}</h2>
//               <p>${this.config.content.ABOUT_TEXT || "Founded in 2010, LUXE began as a small boutique in Paris with a vision to create fashion that transcends trends and celebrates individuality. Our founder, Emma Laurent, believed that clothing should not only look beautiful but also tell a story and empower the wearer."}</p>
//               <p>Today, we continue to honor our heritage while embracing innovation and responsibility. Each LUXE piece is a testament to our dedication to excellence and our belief that fashion can be both beautiful and meaningful.</p>
//               <button class="cta-button" onclick="if(window.novaRouter) window.novaRouter.navigate('about'); return false;">Learn More</button>
//             </div>
//             <div class="story-image">
//               <img src="/placeholder.svg?height=600&width=600" alt="Our Story">
//             </div>
//           </div>
//         </div>
//       </section>
//     `
//   }

//   private generateNewsletter(): string {
//     return `
//       <section class="newsletter-section">
//         <div class="container">
//           <div class="newsletter-content">
//             <h2>Subscribe to our newsletter</h2>
//             <p>Get exclusive access to new collections and special offers</p>
//             <form class="newsletter-form">
//               <input type="email" placeholder="Enter your email" required class="newsletter-input">
//               <button type="submit" class="newsletter-button">Subscribe</button>
//             </form>
//             <p class="disclaimer">Get 10% off your first order when you subscribe</p>
//           </div>
//         </div>
//       </section>
//     `
//   }

//   private generateCollectionsPage(): string {
//     return `
//       <div class="collections-page">
//         <section class="hero-section" style="background-image: linear-gradient(rgba(0,0,0,0.3), rgba(0,0,0,0.3)), url('/placeholder.svg?height=800&width=1600'); background-size: cover; background-position: center; color: white;">
//           <div class="hero-content">
//             <h1 class="hero-title">Our Collections</h1>
//             <p class="hero-subtitle">Explore our curated collections for every season and occasion</p>
//           </div>
//         </section>

//         <section class="section">
//           <div class="container">
//             <div class="collections-grid">
//               ${["Summer '24", "Fall '23", "Evening Wear", "Essentials"]
//                 .map(
//                   (collection, i) => `
//                 <div class="collection-card">
//                   <img src="/placeholder.svg?height=600&width=400" alt="${collection}" class="collection-image">
//                   <div class="collection-content">
//                     <h3>${collection}</h3>
//                     <p>Discover the collection</p>
//                     <button class="cta-button" onclick="if(window.novaRouter) window.novaRouter.navigate('products'); return false;">Explore</button>
//                   </div>
//                 </div>
//               `,
//                 )
//                 .join("")}
//             </div>
//           </div>
//         </section>
//       </div>
//     `
//   }

//   private generateBlogPage(): string {
//     return `
//       <div class="blog-page">
//         <section class="hero-section" style="background-image: linear-gradient(rgba(0,0,0,0.3), rgba(0,0,0,0.3)), url('/placeholder.svg?height=800&width=1600'); background-size: cover; background-position: center; color: white;">
//           <div class="hero-content">
//             <h1 class="hero-title">LUXE Blog</h1>
//             <p class="hero-subtitle">Fashion insights, styling tips, and behind-the-scenes stories</p>
//           </div>
//         </section>

//         <section class="section">
//           <div class="container">
//             <div class="blog-grid">
//               ${[
//                 {
//                   id: 1,
//                   title: "Summer Fashion Trends 2024",
//                   date: "June 15, 2024",
//                   excerpt:
//                     "Discover the hottest trends for the summer season and how to incorporate them into your wardrobe.",
//                 },
//                 {
//                   id: 2,
//                   title: "Sustainable Fashion: Our Commitment",
//                   date: "May 28, 2024",
//                   excerpt:
//                     "Learn about our journey towards sustainability and the steps we're taking to reduce our environmental impact.",
//                 },
//                 {
//                   id: 3,
//                   title: "The Art of Layering",
//                   date: "May 10, 2024",
//                   excerpt:
//                     "Master the art of layering with our expert tips for creating stylish and versatile outfits for any season.",
//                 },
//                 {
//                   id: 4,
//                   title: "Behind the Scenes: Summer Photoshoot",
//                   date: "April 22, 2024",
//                   excerpt:
//                     "Get an exclusive look at our summer collection photoshoot and the inspiration behind the new pieces.",
//                 },
//                 {
//                   id: 5,
//                   title: "How to Build a Capsule Wardrobe",
//                   date: "April 5, 2024",
//                   excerpt:
//                     "Simplify your style with our guide to creating a versatile capsule wardrobe that works for any occasion.",
//                 },
//                 {
//                   id: 6,
//                   title: "Meet the Designer: Emma Laurent",
//                   date: "March 18, 2024",
//                   excerpt:
//                     "An interview with our founder and creative director on her vision for LUXE and the future of fashion.",
//                 },
//               ]
//                 .map(
//                   (post) => `
//                 <div class="blog-card">
//                   <div class="blog-image">
//                     <img src="/placeholder.svg?height=400&width=600" alt="${post.title}">
//                   </div>
//                   <div class="blog-content">
//                     <p class="blog-date">${post.date}</p>
//                     <h3 class="blog-title">${post.title}</h3>
//                     <p class="blog-excerpt">${post.excerpt}</p>
//                     <a class="blog-link" onclick="if(window.novaRouter) window.novaRouter.navigate('blog-post', { id: ${post.id} }); return false;">Read More</a>
//                   </div>
//                 </div>
//               `,
//                 )
//                 .join("")}
//             </div>
//           </div>
//         </section>
//       </div>
//     `
//   }

//   private generateBlogPostPage(): string {
//     return `
//       <div class="blog-post">
//         <div class="post-header">
//           <h1 class="post-title">Summer Fashion Trends 2024</h1>
//           <div class="post-meta">
//             <span>June 15, 2024</span>
//             <span>By Emma Laurent</span>
//           </div>
//         </div>

//         <div class="post-image">
//           <img src="/placeholder.svg?height=600&width=1200" alt="Summer Fashion Trends 2024">
//         </div>

//         <div class="post-content">
//           <p>As the temperature rises and the days grow longer, it's time to refresh your wardrobe with the season's most coveted trends. Summer 2024 brings a delightful mix of nostalgic references, bold statements, and sustainable innovations.</p>

//           <h2>1. Vibrant Dopamine Dressing</h2>
//           <p>After years of neutral palettes, fashion is embracing joy through color. Think electric blues, sunset oranges, and vibrant pinks that instantly elevate your mood. The key is to either go all-in with a monochromatic look or use these bright hues as statement pieces against a neutral base.</p>

//           <img src="/placeholder.svg?height=400&width=800" alt="Vibrant Summer Colors">

//           <h2>2. Ethereal Sheer Layers</h2>
//           <p>Transparency continues its reign this summer, with designers exploring the delicate balance between revelation and concealment. Sheer fabrics are being layered over solid pieces, creating depth and dimension while maintaining elegance.</p>

//           <h2>3. Sustainable Materials</h2>
//           <p>Sustainability is no longer just a trend but a movement transforming the industry. This season, we're seeing innovative fabrics made from recycled materials, organic cotton, and even plant-based alternatives to leather. Our new Eco Collection features pieces made entirely from recycled ocean plastic and organic fibers.</p>

//           <h2>4. The Return of Linen</h2>
//           <p>This timeless summer fabric is having a major moment. Beyond the classic linen shirt, designers are exploring structured linen blazers, wide-leg trousers, and even evening wear. The slightly rumpled texture adds character while keeping you cool during hot days.</p>

//           <h2>5. How to Style These Trends</h2>
//           <p>The beauty of this season's trends lies in their versatility. Mix and match different elements to create a look that's uniquely yours. Pair a vibrant silk top with relaxed linen pants for an effortless day-to-night outfit, or layer a sheer blouse over a simple camisole for a subtle statement.</p>

//           <p>Remember, the most important aspect of style is wearing what makes you feel confident and comfortable. Use these trends as inspiration rather than rules, and don't be afraid to experiment with your personal expression.</p>

//           <div class="post-tags">
//             <span class="post-tag">Summer Fashion</span>
//             <span class="post-tag">Trends</span>
//             <span class="post-tag">Sustainable Style</span>
//             <span class="post-tag">Fashion Tips</span>
//           </div>
//         </div>
//       </div>
//     `
//   }

//   private generateAboutPage(): string {
//     return `
//       <div class="about-page">
//         <section class="about-hero">
//           <div class="container">
//             <h1 class="about-hero-title">Our Story</h1>
//             <p class="about-hero-subtitle">Crafting timeless fashion with passion and purpose since 2010</p>
//           </div>
//         </section>

//         <section class="about-section">
//           <div class="container">
//             <div class="about-grid">
//               <div class="about-image">
//                 <img src="/placeholder.svg?height=600&width=600" alt="Our Story">
//               </div>
//               <div class="about-content">
//                 <h2>The Beginning</h2>
//                 <p>Founded in 2010, LUXE began as a small boutique in Paris with a vision to create fashion that transcends trends and celebrates individuality. Our founder, Emma Laurent, believed that clothing should not only look beautiful but also tell a story and empower the wearer.</p>
//                 <p>What started as a collection of handcrafted pieces in a tiny Parisian atelier has grown into an international brand known for its commitment to quality, design, and responsible practices.</p>
//               </div>
//             </div>
//           </div>
//         </section>

//         <section class="about-section">
//           <div class="container">
//             <h2 class="section-title">Our Values</h2>
//             <div class="values-grid">
//               ${["Craftsmanship", "Sustainability", "Inclusivity", "Innovation"]
//                 .map(
//                   (value) => `
//                 <div class="value-card">
//                   <div class="value-icon">✦</div>
//                   <h3>${value}</h3>
//                   <p>${this.getValueDescription(value)}</p>
//                 </div>
//               `,
//                 )
//                 .join("")}
//             </div>
//           </div>
//         </section>

//         <section class="about-section">
//           <div class="container">
//             <h2 class="section-title">Meet Our Team</h2>
//             <div class="team-grid">
//               ${[
//                 { name: "Emma Laurent", role: "Founder & Creative Director" },
//                 { name: "Thomas Chen", role: "Head Designer" },
//                 { name: "Sofia Rodriguez", role: "Sustainability Lead" },
//                 { name: "James Wilson", role: "Production Manager" },
//               ]
//                 .map(
//                   (member) => `
//                 <div class="team-card">
//                   <div class="team-image">
//                     <img src="/placeholder.svg?height=200&width=200" alt="${member.name}">
//                   </div>
//                   <h3 class="team-name">${member.name}</h3>
//                   <p class="team-role">${member.role}</p>
//                 </div>
//               `,
//                 )
//                 .join("")}
//             </div>
//           </div>
//         </section>
//       </div>
//     `
//   }

//   private generateContactPage(): string {
//     return `
//       <div class="contact-page">
//         <section class="hero-section" style="background-image: linear-gradient(rgba(0,0,0,0.3), rgba(0,0,0,0.3)), url('/placeholder.svg?height=800&width=1600'); background-size: cover; background-position: center; color: white; height: 50vh;">
//           <div class="hero-content">
//             <h1 class="hero-title">Contact Us</h1>
//             <p class="hero-subtitle">We're here to help with any inquiries</p>
//           </div>
//         </section>

//         <section class="section">
//           <div class="container">
//             <div class="contact-grid">
//               <div class="contact-info">
//                 <div class="info-card">
//                   <h3>📍 Visit Us</h3>
//                   <p>123 Fashion Street<br>Paris, 75001 France</p>
//                 </div>
//                 <div class="info-card">
//                   <h3>📞 Call Us</h3>
//                   <p>+33 1 23 45 67 89<br>Mon-Fri 8am-7pm CET</p>
//                 </div>
//                 <div class="info-card">
//                   <h3>✉️ Email Us</h3>
//                   <p>info@luxefashion.com<br>support@luxefashion.com</p>
//                 </div>
//               </div>

//               <form class="contact-form">
//                 <div class="form-group">
//                   <label class="form-label">Your Name</label>
//                   <input type="text" class="form-input" required>
//                 </div>
//                 <div class="form-group">
//                   <label class="form-label">Email Address</label>
//                   <input type="email" class="form-input" required>
//                 </div>
//                 <div class="form-group">
//                   <label class="form-label">Subject</label>
//                   <input type="text" class="form-input" required>
//                 </div>
//                 <div class="form-group">
//                   <label class="form-label">Message</label>
//                   <textarea class="form-textarea" rows="5" required></textarea>
//                 </div>
//                 <button type="submit" class="cta-button">Send Message</button>
//               </form>
//             </div>
//           </div>
//         </section>

//         <section class="section" style="background-color: #f5f5f5;">
//           <div class="container">
//             <h2 class="section-title">Frequently Asked Questions</h2>
//             <div style="max-width: 800px; margin: 0 auto;">
//               ${[
//                 {
//                   question: "What are your shipping options?",
//                   answer:
//                     "We offer Standard (3-5 business days), Express (1-2 business days), and International (7-14 business days) shipping options.",
//                 },
//                 {
//                   question: "What is your return policy?",
//                   answer:
//                     "We accept returns within 30 days of purchase. Items must be unworn with original tags attached.",
//                 },
//                 {
//                   question: "How can I track my order?",
//                   answer: "Once your order ships, you'll receive a confirmation email with tracking information.",
//                 },
//                 {
//                   question: "Do you ship internationally?",
//                   answer: "Yes, we ship to most countries worldwide. Shipping times and fees vary by location.",
//                 },
//               ]
//                 .map(
//                   (faq) => `
//                 <div style="margin-bottom: 2rem; border-bottom: 1px solid #ddd; padding-bottom: 1rem;">
//                   <h3 style="margin-bottom: 0.5rem;">${faq.question}</h3>
//                   <p>${faq.answer}</p>
//                 </div>
//               `,
//                 )
//                 .join("")}
//             </div>
//           </div>
//         </section>
//       </div>
//     `
//   }

//   private generateProductsPage(): string {
//     return `
//       <div class="products-page">
//         <div class="filters-sidebar">
//           <h2>Filters</h2>
//           <button style="background: none; border: 1px solid #ddd; padding: 0.5rem 1rem; border-radius: 4px; margin-bottom: 2rem; cursor: pointer;">Clear All</button>

//           <div class="filter-section">
//             <div class="filter-title">
//               <h3>Categories</h3>
//               <span>▼</span>
//             </div>
//             <div class="filter-content">
//               ${["Dresses", "Tops", "Bottoms", "Outerwear", "Accessories"]
//                 .map(
//                   (category) => `
//                 <div class="filter-option">
//                   <input type="checkbox" id="${category.toLowerCase()}" class="filter-checkbox">
//                   <label for="${category.toLowerCase()}">${category}</label>
//                 </div>
//               `,
//                 )
//                 .join("")}
//             </div>
//           </div>

//           <div class="filter-section">
//             <div class="filter-title">
//               <h3>Price Range</h3>
//               <span>▼</span>
//             </div>
//             <div class="filter-content">
//               <input type="range" min="0" max="500" value="500" class="price-slider">
//               <div class="price-inputs">
//                 <span>$0</span>
//                 <span>$500</span>
//               </div>
//             </div>
//           </div>

//           <div class="filter-section">
//             <div class="filter-title">
//               <h3>Sizes</h3>
//               <span>▼</span>
//             </div>
//             <div class="filter-content">
//               ${["XS", "S", "M", "L", "XL"]
//                 .map(
//                   (size) => `
//                 <div class="filter-option">
//                   <input type="checkbox" id="${size}" class="filter-checkbox">
//                   <label for="${size}">${size}</label>
//                 </div>
//               `,
//                 )
//                 .join("")}
//             </div>
//           </div>

//           <div class="filter-section">
//             <div class="filter-title">
//               <h3>Colors</h3>
//               <span>▼</span>
//             </div>
//             <div class="filter-content">
//               <div class="color-filter">
//                 ${[
//                   { name: "Black", code: "#000" },
//                   { name: "White", code: "#fff" },
//                   { name: "Gray", code: "#888" },
//                   { name: "Red", code: "#e74c3c" },
//                   { name: "Blue", code: "#3498db" },
//                   { name: "Green", code: "#2ecc71" },
//                 ]
//                   .map(
//                     (color) => `
//                   <div class="color-filter-option" style="background-color: ${color.code};" title="${color.name}"></div>
//                 `,
//                   )
//                   .join("")}
//               </div>
//             </div>
//           </div>
//         </div>

//         <div class="products-content">
//           <div class="products-header">
//             <h1>All Products</h1>
//             <div>
//               <label>Sort by: </label>
//               <select class="sort-dropdown">
//                 <option>Featured</option>
//                 <option>Price: Low to High</option>
//                 <option>Price: High to Low</option>
//                 <option>Newest</option>
//               </select>
//             </div>
//           </div>

//           <div class="product-grid">
//             ${this.generateProductCards(10)}
//           </div>
//         </div>
//       </div>
//     `
//   }

//   private generateProductDetailPage(): string {
//     return `
//       <div class="container" style="padding: 2rem 0;">
//         <div class="product-detail">
//           <div class="product-gallery">
//             <div class="thumbnail-column">
//               ${[1, 2, 3, 4]
//                 .map(
//                   (i) => `
//                 <div class="thumbnail ${i === 1 ? "active" : ""}">
//                   <img src="/placeholder.svg?height=80&width=80" alt="Thumbnail ${i}">
//                 </div>
//               `,
//                 )
//                 .join("")}
//             </div>
//             <div class="main-image">
//               <img src="/placeholder.svg?height=600&width=500" alt="Silk Blend Midi Dress">
//             </div>
//           </div>

//           <div class="product-info">
//             <h1 class="product-detail-title">Silk Blend Midi Dress</h1>
//             <div class="product-rating">
//               <div class="stars">★★★★☆</div>
//               <span class="review-count">(42 reviews)</span>
//             </div>
//             <p class="product-detail-price">$129.99</p>

//             <div class="product-options">
//               <label class="option-label">Color</label>
//               <div class="color-options">
//                 ${[
//                   { name: "Black", code: "#000" },
//                   { name: "Navy", code: "#000080" },
//                   { name: "Burgundy", code: "#800020" },
//                 ]
//                   .map(
//                     (color, i) => `
//                   <div class="color-option ${i === 0 ? "active" : ""}" style="background-color: ${color.code};" title="${color.name}"></div>
//                 `,
//                   )
//                   .join("")}
//               </div>

//               <label class="option-label">Size</label>
//               <div class="size-options">
//                 ${["XS", "S", "M", "L", "XL"]
//                   .map(
//                     (size, i) => `
//                   <div class="size-option ${i === 0 ? "active" : ""}">${size}</div>
//                 `,
//                   )
//                   .join("")}
//               </div>
//               <a href="#" style="font-size: 0.9rem; color: var(--primary-color);">Size Guide</a>

//               <div class="quantity-selector">
//                 <label class="quantity-label">Quantity</label>
//                 <div class="quantity-controls">
//                   <button class="quantity-btn">-</button>
//                   <input type="text" value="1" class="quantity-input">
//                   <button class="quantity-btn">+</button>
//                 </div>
//               </div>
//             </div>

//             <div class="product-actions">
//               <button class="cta-button add-to-cart">Add to Cart</button>
//               <button class="add-to-wishlist">Add to Wishlist</button>
//             </div>

//             <div class="product-tabs">
//               <div class="tabs-header">
//                 <button class="tab-btn active">Description</button>
//                 <button class="tab-btn">Details</button>
//                 <button class="tab-btn">Shipping</button>
//               </div>
//               <div class="tab-content">
//                 <div class="tab-pane active">
//                   <p>A luxurious silk blend midi dress with a flattering silhouette, perfect for both casual and formal occasions.</p>
//                   <p>This versatile piece features a subtle drape that elegantly follows your body's natural contours, creating a sophisticated yet effortless look. The lightweight fabric ensures comfort throughout the day or evening.</p>
//                 </div>
//               </div>
//             </div>
//           </div>
//         </div>

//         <section class="related-products">
//           <h2 class="section-title">You May Also Like</h2>
//           <div class="product-grid">
//             ${this.generateProductCards(4)}
//           </div>
//         </section>
//       </div>
//     `
//   }

//   private generateCartPage(): string {
//     return `
//       <div class="cart-page container">
//         <h1 class="cart-title">Shopping Cart</h1>

//         <div style="display: grid; grid-template-columns: 2fr 1fr; gap: 2rem;">
//           <div>
//             <table class="cart-table">
//               <thead>
//                 <tr>
//                   <th>Product</th>
//                   <th>Price</th>
//                   <th>Quantity</th>
//                   <th>Total</th>
//                   <th></th>
//                 </tr>
//               </thead>
//               <tbody>
//                 <tr>
//                   <td>
//                     <div class="cart-product">
//                       <div class="cart-product-image">
//                         <img src="/placeholder.svg?height=80&width=80" alt="Silk Blend Midi Dress">
//                       </div>
//                       <div class="cart-product-info">
//                         <h3 class="cart-product-title">Silk Blend Midi Dress</h3>
//                         <p class="cart-product-variant">Size: XS, Color: Black</p>
//                       </div>
//                     </div>
//                   </td>
//                   <td>$129.99</td>
//                   <td>
//                     <div class="quantity-controls">
//                       <button class="quantity-btn">-</button>
//                       <input type="text" value="1" class="quantity-input">
//                       <button class="quantity-btn">+</button>
//                     </div>
//                   </td>
//                   <td>$129.99</td>
//                   <td>
//                     <button class="cart-remove">✕</button>
//                   </td>
//                 </tr>
//                 <tr>
//                   <td>
//                     <div class="cart-product">
//                       <div class="cart-product-image">
//                         <img src="/placeholder.svg?height=80&width=80" alt="Tailored Wool Blazer">
//                       </div>
//                       <div class="cart-product-info">
//                         <h3 class="cart-product-title">Tailored Wool Blazer</h3>
//                         <p class="cart-product-variant">Size: S, Color: Charcoal</p>
//                       </div>
//                     </div>
//                   </td>
//                   <td>$189.99</td>
//                   <td>
//                     <div class="quantity-controls">
//                       <button class="quantity-btn">-</button>
//                       <input type="text" value="1" class="quantity-input">
//                       <button class="quantity-btn">+</button>
//                     </div>
//                   </td>
//                   <td>$189.99</td>
//                   <td>
//                     <button class="cart-remove">✕</button>
//                   </td>
//                 </tr>
//               </tbody>
//             </table>

//             <div class="cart-actions">
//               <button class="cta-button secondary" onclick="if(window.novaRouter) window.novaRouter.navigate('home'); return false;">Continue Shopping</button>
//               <button class="cta-button secondary">Clear Cart</button>
//             </div>
//           </div>

//           <div class="cart-summary">
//             <h2 class="cart-summary-title">Order Summary</h2>
//             <div class="summary-row">
//               <span>Subtotal</span>
//               <span>$319.98</span>
//             </div>
//             <div class="summary-row">
//               <span>Shipping</span>
//               <span>Free</span>
//             </div>
//             <div class="summary-row">
//               <span>Tax (8%)</span>
//               <span>$25.60</span>
//             </div>
//             <div class="summary-row total">
//               <span>Total</span>
//               <span>$345.58</span>
//             </div>

//             <div class="promo-code">
//               <h3>Promo Code</h3>
//               <div class="promo-form">
//                 <input type="text" class="promo-input" placeholder="Enter promo code">
//                 <button class="promo-button">Apply</button>
//               </div>
//             </div>

//             <button class="checkout-button">Proceed to Checkout</button>
//           </div>
//         </div>
//       </div>
//     `
//   }

//   private generateEmptyCartPage(): string {
//     return `
//       <div class="cart-empty container">
//         <div class="cart-empty-icon">🛒</div>
//         <h1>Your cart is empty</h1>
//         <p>Looks like you haven't added anything to your cart yet.</p>
//         <button class="cta-button" style="margin-top: 2rem;" onclick="if(window.novaRouter) window.novaRouter.navigate('home'); return false;">Continue Shopping</button>
//       </div>
//     `
//   }

//   private generateFooter(): string {
//     return `
//       <footer class="nova-footer">
//         <div class="container">
//           <div class="footer-grid">
//             <div class="footer-col">
//               <h4>${this.config.content.BRAND_NAME || "LUXE"}</h4>
//               <p>Elevate your style with our curated collections of timeless fashion pieces.</p>
//               <div class="social-links">
//                 <a href="${this.config.content.INSTAGRAM_LINK || "#"}" class="social-link">📷</a>
//                 <a href="${this.config.content.FACEBOOK_LINK || "#"}" class="social-link">👍</a>
//                 <a href="${this.config.content.TWITTER_LINK || "#"}" class="social-link">🐦</a>
//                 <a href="${this.config.content.PINTEREST_LINK || "#"}" class="social-link">📌</a>
//               </div>
//             </div>
//             <div class="footer-col">
//               <h4>Shop</h4>
//               <ul class="footer-links">
//                 <li><a href="#" class="footer-link" onclick="if(window.novaRouter) window.novaRouter.navigate('products'); return false;">Women</a></li>
//                 <li><a href="#" class="footer-link" onclick="if(window.novaRouter) window.novaRouter.navigate('products'); return false;">Men</a></li>
//                 <li><a href="#" class="footer-link" onclick="if(window.novaRouter) window.novaRouter.navigate('products'); return false;">Accessories</a></li>
//                 <li><a href="#" class="footer-link" onclick="if(window.novaRouter) window.novaRouter.navigate('products'); return false;">New Arrivals</a></li>
//                 <li><a href="#" class="footer-link" onclick="if(window.novaRouter) window.novaRouter.navigate('products'); return false;">Sale</a></li>
//               </ul>
//             </div>
//             <div class="footer-col">
//               <h4>Company</h4>
//               <ul class="footer-links">
//                 <li><a href="#" class="footer-link" onclick="if(window.novaRouter) window.novaRouter.navigate('about'); return false;">About Us</a></li>
//                 <li><a href="#" class="footer-link" onclick="if(window.novaRouter) window.novaRouter.navigate('contact'); return false;">Contact</a></li>
//                 <li><a href="#" class="footer-link" onclick="if(window.novaRouter) window.novaRouter.navigate('about'); return false;">Careers</a></li>
//                 <li><a href="#" class="footer-link" onclick="if(window.novaRouter) window.novaRouter.navigate('about'); return false;">Sustainability</a></li>
//                 <li><a href="#" class="footer-link" onclick="if(window.novaRouter) window.novaRouter.navigate('blog'); return false;">Press</a></li>
//               </ul>
//             </div>
//             <div class="footer-col">
//               <h4>Customer Service</h4>
//               <ul class="footer-links">
//                 <li><a href="#" class="footer-link" onclick="if(window.novaRouter) window.novaRouter.navigate('contact'); return false;">Help Center</a></li>
//                 <li><a href="#" class="footer-link" onclick="if(window.novaRouter) window.novaRouter.navigate('contact'); return false;">Shipping & Returns</a></li>
//                 <li><a href="#" class="footer-link" onclick="if(window.novaRouter) window.novaRouter.navigate('contact'); return false;">Size Guide</a></li>
//                 <li><a href="#" class="footer-link" onclick="if(window.novaRouter) window.novaRouter.navigate('contact'); return false;">FAQ</a></li>
//                 <li><a href="#" class="footer-link" onclick="if(window.novaRouter) window.novaRouter.navigate('contact'); return false;">Privacy Policy</a></li>
//               </ul>
//             </div>
//           </div>

//           <div style="margin-top: 3rem; border-top: 1px solid rgba(0,0,0,0.1); padding-top: 2rem;">
//             <h4>Subscribe to our newsletter</h4>
//             <form class="footer-newsletter">
//               <input type="email" placeholder="Your email address" required class="footer-input">
//               <button type="submit" class="footer-button">Subscribe</button>
//             </form>
//             <p style="margin-top: 0.5rem; font-size: 0.9rem;">Get 10% off your first order by subscribing to our newsletter.</p>
//           </div>

//           <div class="copyright">
//             © ${new Date().getFullYear()} ${this.config.content.BRAND_NAME || "LUXE"} Fashion. All rights reserved.
//           </div>
//         </div>
//       </footer>
//     `
//   }

//   private generateScripts(): string {
//   return (
//     `
//     <script>
// // Create the router instance immediately to ensure it's available
// window.novaRouter = {
//   routes: {},
//   currentRoute: 'home',
//   contentContainer: null,
//   params: {},
//   initialContentSet: false,
  
//   init: function() {
//     this.routes = {
//       'home': document.getElementById('home-template'),
//       'collections': document.getElementById('collections-template'),
//       'blog': document.getElementById('blog-template'),
//       'blog-post': document.getElementById('blog-post-template'),
//       'about': document.getElementById('about-template'),
//       'contact': document.getElementById('contact-template'),
//       'products': document.getElementById('products-template'),
//       'product-detail': document.getElementById('product-detail-template'),
//       'cart': document.getElementById('cart-template'),
//       'empty-cart': document.getElementById('empty-cart-template'),
//       'not-found': document.getElementById('not-found-template')
//     };
    
//     this.contentContainer = document.getElementById('app-content');
    
//     // Check if we already have content in the container (during editing)
//     if (this.contentContainer && this.contentContainer.children.length > 0) {
//       console.log("Content already exists, preserving during edit");
//       this.initialContentSet = true;
//     } else {
//       // Load initial content on first load
//       console.log("Loading initial content");
//       this.loadInitialContent();
//     }
    
//     // Set up navigation event handlers
//     this.setupNavigationHandlers();
    
//     // Initialize cart count
//     this.updateCartCount();
//   },
  
//   loadInitialContent: function() {
//     // Only load initial content if it hasn't been set yet
//     if (!this.initialContentSet) {
//       const defaultTemplate = this.routes['home'];
//       if (defaultTemplate && this.contentContainer) {
//         this.contentContainer.innerHTML = defaultTemplate.innerHTML;
//         this.updateActiveNavLinks('home');
//         this.initialContentSet = true;
//       }
//     }
//   },
  
//   setupNavigationHandlers: function() {
//     // Find all navigation links and attach click handlers
//     document.querySelectorAll('[data-nav]').forEach(link => {
//       link.addEventListener('click', (e) => {
//         e.preventDefault();
//         const page = link.getAttribute('data-nav');
//         this.navigate(page);
//       });
//     });
    
//     // Additional direct navigation handlers for header links
//     document.querySelectorAll('.nav-link').forEach(link => {
//       link.addEventListener('click', (e) => {
//         const navText = link.textContent.trim().toLowerCase();
//         // Map the text to route names
//         const routeMap = {
//           'home': 'home',
//           'collections': 'collections',
//           'blog': 'blog',
//           'about': 'about',
//           'contact': 'contact'
//         };
        
//         if (routeMap[navText]) {
//           e.preventDefault();
//           this.navigate(routeMap[navText]);
//         }
//       });
//     });
//   },
  
//   navigate: function(page, params = {}) {
//     // Validate the page exists
//     if (!this.routes[page]) {
//       console.error('Page not found:', page);
//       page = 'not-found';
//     }
    
//     // Store params
//     this.params = params;
    
//     // Get the template for the page
//     const template = this.routes[page];
    
//     // Update content
//     if (template && this.contentContainer) {
//       // Apply page transition
//       this.contentContainer.classList.remove('active');
      
//       setTimeout(() => {
//         // Apply page content
//         this.contentContainer.innerHTML = template.innerHTML;
        
//         // Update navigation state
//         this.updateActiveNavLinks(page);
//         this.currentRoute = page;
        
//         // Show the new content
//         this.contentContainer.classList.add('active');
        
//         // Scroll to top
//         window.scrollTo(0, 0);
        
//         // Additional initialization for the new page
//         this.initPageScripts(page);
//       }, 300);
//     }
//   },
  
//   updateActiveNavLinks: function(page) {
//     // Clear active class from all nav links
//     document.querySelectorAll('.nav-link').forEach(link => {
//       link.classList.remove('active');
//     });

//     // Add active class to current nav links (both data-nav and text matching)
//     // Fixed version
// document.querySelectorAll('.nav-link[data-nav="' + page + '"]').forEach(link => {
//       link.classList.add('active');
//     });

//     // Also check by text content for header links
//     document.querySelectorAll('.nav-link').forEach(link => {
//       const navText = link.textContent.trim().toLowerCase();
//       if (navText === page.toLowerCase()) {
//         link.classList.add('active');
//       }
//     });
//   },
  
//   initPageScripts: function(page) {
//     // Initialize any components on the page
//     console.log('Initializing page:', page);
    
//     // Add specific initialization based on page
//     if (page === 'product-detail') {
//       this.initProductDetailPage();
//     } else if (page === 'cart') {
//       this.initCartPage();
//     }
    
//     // Re-attach event listeners for dynamic elements
//     this.setupDynamicEventListeners();
//   },
  
//   initProductDetailPage: function() {
//     // Initialize product thumbnails
//     const thumbnails = document.querySelectorAll('.thumbnail');
//     const mainImage = document.querySelector('.main-image img');
    
//     thumbnails.forEach(thumb => {
//       thumb.addEventListener('click', () => {
//         // Remove active class from all thumbnails
//         thumbnails.forEach(t => t.classList.remove('active'));
//         // Add active class to clicked thumbnail
//         thumb.classList.add('active');
//         // Update main image (in a real app, this would use the actual image src)
//         if (mainImage) {
//           mainImage.src = thumb.querySelector('img').src.replace('80&width=80', '600&width=500');
//         }
//       });
//     });
    
//     // Initialize product tabs
//     const tabButtons = document.querySelectorAll('.tab-btn');
//     const tabPanes = document.querySelectorAll('.tab-pane');
    
//     tabButtons.forEach((button, index) => {
//       button.addEventListener('click', () => {
//         // Remove active class from all buttons and panes
//         tabButtons.forEach(btn => btn.classList.remove('active'));
//         tabPanes.forEach(pane => pane.classList.remove('active'));
        
//         // Add active class to clicked button and corresponding pane
//         button.classList.add('active');
//         if (tabPanes[index]) {
//           tabPanes[index].classList.add('active');
//         }
//       });
//     });
    
//     // Initialize quantity controls
//     this.initQuantityControls();
    
//     // Initialize color and size options
//     const colorOptions = document.querySelectorAll('.color-option');
//     colorOptions.forEach(option => {
//       option.addEventListener('click', () => {
//         colorOptions.forEach(opt => opt.classList.remove('active'));
//         option.classList.add('active');
//       });
//     });
    
//     const sizeOptions = document.querySelectorAll('.size-option');
//     sizeOptions.forEach(option => {
//       option.addEventListener('click', () => {
//         sizeOptions.forEach(opt => opt.classList.remove('active'));
//         option.classList.add('active');
//       });
//     });
    
//     // Initialize add to cart button
//     const addToCartButton = document.querySelector('.add-to-cart');
//     if (addToCartButton) {
//       addToCartButton.addEventListener('click', () => {
//         // In a real app, this would add the product to the cart
//         // For this demo, we'll just update the cart count and navigate to the cart page
//         this.updateCartCount(2); // Increment by 1
//         this.navigate('cart');
//       });
//     }
//   },
  
//   initCartPage: function() {
//     // Initialize quantity controls
//     this.initQuantityControls();
    
//     // Initialize remove buttons
//     const removeButtons = document.querySelectorAll('.cart-remove');
//     removeButtons.forEach(button => {
//       button.addEventListener('click', (e) => {
//         // In a real app, this would remove the item from the cart
//         // For this demo, we'll just remove the row from the table
//         const row = e.target.closest('tr');
//         if (row) {
//           row.remove();
          
//           // Check if cart is empty
//           const rows = document.querySelectorAll('.cart-table tbody tr');
//           if (rows.length === 0) {
//             this.navigate('empty-cart');
//           } else {
//             // Update cart count
//             this.updateCartCount(rows.length);
//           }
//         }
//       });
//     });
    
//     // Initialize clear cart button
//     const clearCartButton = document.querySelector('.cart-actions .cta-button.secondary:last-child');
//     if (clearCartButton) {
//       clearCartButton.addEventListener('click', () => {
//         this.updateCartCount(0);
//         this.navigate('empty-cart');
//       });
//     }
//   },
  
//   initQuantityControls: function() {
//     const quantityControls = document.querySelectorAll('.quantity-controls');
    
//     quantityControls.forEach(control => {
//       const minusButton = control.querySelector('.quantity-btn:first-child');
//       const plusButton = control.querySelector('.quantity-btn:last-child');
//       const input = control.querySelector('.quantity-input');
      
//       if (minusButton && plusButton && input) {
//         minusButton.addEventListener('click', () => {
//           let value = parseInt(input.value);
//           if (value > 1) {
//             input.value = value - 1;
//           }
//         });
        
//         plusButton.addEventListener('click', () => {
//           let value = parseInt(input.value);
//           input.value = value + 1;
//         });
        
//         input.addEventListener('change', () => {
//           let value = parseInt(input.value);
//           if (isNaN(value) || value < 1) {
//             input.value = 1;
//           }
//         });
//       }
//     });
//   },
  
//   setupDynamicEventListeners: function() {
//     // Re-attach event listeners for elements that might be added dynamically
    
//     // Product cards
//     document.querySelectorAll('.product-card').forEach(card => {
//       const viewButton = card.querySelector('.cta-button');
//       if (viewButton) {
//         viewButton.addEventListener('click', () => {
//           // Extract product ID from the button's data attribute or other source
//           // For this demo, we'll just navigate to a generic product detail page
//           this.navigate('product-detail', { id: 1 });
//         });
//       }
//     });
//   },
  
//   updateCartCount: function(count) {
//     // Update the cart count badge
//     const cartCount = document.getElementById('cart-count');
//     if (cartCount) {
//       if (count !== undefined) {
//         cartCount.textContent = count;
//         // Store in localStorage for persistence
//         localStorage.setItem('cartCount', count);
//       } else {
//         // Retrieve from localStorage if available
//         const storedCount = localStorage.getItem('cartCount');
//         cartCount.textContent = storedCount || '0';
//       }
//     }
//   }
// };

// // Initialize the router immediately
// document.addEventListener('DOMContentLoaded', function() {
//   // Initialize the router
//   window.novaRouter.init();
// });

// // Also attempt immediate initialization for edit scenarios
// // Use setTimeout to ensure DOM is accessible
// setTimeout(function() {
//   if (document.readyState === 'loading') {
//     document.addEventListener('DOMContentLoaded', function() {
//       window.novaRouter.init();
//     });
//   } else {
//     window.novaRouter.init();
//   }
// }, 100);
// </script>
//   `
//   )
// }

//   private getValueDescription(value: string): string {
//     const descriptions = {
//       Craftsmanship:
//         "We honor traditional techniques while embracing innovation, ensuring every piece meets our exacting standards of quality and durability.",
//       Sustainability:
//         "Our commitment to the planet drives us to source responsibly, reduce waste, and continuously improve our environmental footprint.",
//       Inclusivity:
//         "We design for diverse body types, backgrounds, and styles, believing that fashion should be accessible and empowering for everyone.",
//       Innovation:
//         "We constantly explore new materials, techniques, and ideas to create fashion that's not just beautiful but forward-thinking.",
//     }

//     return descriptions[value] || `Description for ${value}`
//   }
// }

// export function getNovaTemplateNovaTemplate(config: any): string {
//   const template = new NovaTemplate(config)

//   // Get CSS and HTML from the template instance
//   const css = template.generateCSS()
//   const html = template.getHTML()

//   // Combine CSS and HTML into a single document
//   return `
//     <style>
//       ${css}
//     </style>
//     ${html}
//   `
// }



// src/templates/base-template.ts
export class BaseTemplate {
  // Properly declare class properties
  protected config: {
    content: Record<string, any>
    styles: Record<string, any>
    [key: string]: any
  }
  protected defaultStyles: Record<string, string>
  protected mergedStyles: Record<string, string>

  constructor(config = {}) {
    this.config = {
      content: {},
      styles: {},
      ...config,
    }
    this.defaultStyles = this.getDefaultStyles()
    this.mergedStyles = this.mergeStyles()
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
    }
  }

  mergeStyles(): Record<string, string> {
    return {
      ...this.defaultStyles,
      ...this.config.styles,
    }
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
    `
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
    `
  }

  getHTML(): string {
    throw new Error("getHTML() must be implemented by subclass")
  }

  getContent(path: string, defaultValue: any = ""): any {
    const keys = path.split(".")
    let current = this.config.content

    for (const key of keys) {
      if (!current || typeof current !== "object") return defaultValue
      current = current[key]
    }

    return current ?? defaultValue
  }

}


export class NovaTemplate extends BaseTemplate {
  templateSpecificCSS(): string {
    return `
      /* NOVA Custom Styles */
      :root {
        --primary-color: #C91A42;
        --secondary-color: #f8f9fa;
        --accent-color: #C91A42;
        --text-color: #2d2d2d;
        --header-bg: #ffffff;
        --header-text: #000000;
        --footer-bg: #f5f5f5;
        --footer-text: #333333;
        --font-heading: 'Playfair Display', serif;
        --font-body: 'Lato', sans-serif;
        --border-color: #e5e5e5;
        --success-color: #28a745;
        --error-color: #dc3545;
        --warning-color: #ffc107;
        --light-bg: #f8f9fa;
        --dark-bg: #212529;
      }

      .nova-template {
        font-family: var(--font-body);
        color: var(--text-color);
        line-height: 1.6;
        display: flex;
        flex-direction: column;
        min-height: 100vh;
      }

      h1, h2, h3, h4, h5, h6 {
        font-family: var(--font-heading);
        font-weight: 600;
        letter-spacing: 0.5px;
        margin-bottom: 1rem;
      }

      a {
        text-decoration: none;
        color: inherit;
        transition: color 0.3s ease;
      }

      a:hover {
        color: var(--primary-color);
      }

      .container {
        max-width: 1200px;
        margin: 0 auto;
        padding: 0 1rem;
      }

      /* Header Styles */
      .nova-header {
        background: var(--header-bg);
        padding: 1rem 0;
        position: sticky;
        top: 0;
        z-index: 1000;
        box-shadow: 0 2px 10px rgba(0,0,0,0.05);
      }

      .nova-nav {
        display: flex;
        justify-content: space-between;
        align-items: center;
        padding: 0 1rem;
      }

      .nova-logo {
        font-family: var(--font-heading);
        font-size: 1.75rem;
        color: var(--header-text);
        text-decoration: none;
        letter-spacing: 2px;
        font-weight: bold;
      }

      .main-nav {
        display: flex;
        gap: 2rem;
        align-items: center;
      }

      .nav-link {
        color: var(--header-text);
        text-decoration: none;
        font-size: 0.9rem;
        text-transform: uppercase;
        letter-spacing: 1px;
        transition: all 0.3s;
        cursor: pointer;
        position: relative;
      }

      .nav-link:after {
        content: '';
        position: absolute;
        width: 0;
        height: 2px;
        bottom: -5px;
        left: 0;
        background-color: var(--primary-color);
        transition: width 0.3s;
      }

      .nav-link:hover:after,
      .nav-link.active:after {
        width: 100%;
      }

      .nav-icons {
        display: flex;
        gap: 1.5rem;
        align-items: center;
      }

      .icon-btn {
        background: none;
        border: none;
        cursor: pointer;
        font-size: 1.25rem;
        color: var(--header-text);
        transition: color 0.3s;
        display: flex;
        align-items: center;
        justify-content: center;
      }

      .icon-btn:hover {
        color: var(--primary-color);
      }

      .cart-count {
        position: absolute;
        top: -8px;
        right: -8px;
        background: var(--primary-color);
        color: white;
        font-size: 0.7rem;
        width: 18px;
        height: 18px;
        border-radius: 50%;
        display: flex;
        align-items: center;
        justify-content: center;
      }

      /* Mobile Menu */
      .mobile-menu-toggle {
        display: none;
        background: none;
        border: none;
        font-size: 1.5rem;
        cursor: pointer;
      }

      .mobile-menu {
        display: none;
        position: fixed;
        top: 0;
        left: 0;
        right: 0;
        bottom: 0;
        background: white;
        z-index: 1001;
        padding: 2rem;
        flex-direction: column;
      }

      .mobile-menu-header {
        display: flex;
        justify-content: space-between;
        align-items: center;
        margin-bottom: 2rem;
      }

      .mobile-menu-close {
        background: none;
        border: none;
        font-size: 1.5rem;
        cursor: pointer;
      }

      .mobile-nav-links {
        display: flex;
        flex-direction: column;
        gap: 1.5rem;
      }

      .mobile-nav-link {
        font-size: 1.2rem;
        text-transform: uppercase;
        letter-spacing: 1px;
      }

      /* Hero Section */
      .hero-section {
        position: relative;
        height: 80vh;
        background-color: #f5f5f5;
        display: flex;
        align-items: center;
        justify-content: center;
        text-align: center;
        color: var(--text-color);
        padding: 2rem;
      }

      .hero-content {
        max-width: 800px;
        z-index: 1;
      }

      .hero-title {
        font-size: 3.5rem;
        margin-bottom: 1.5rem;
      }

      .hero-subtitle {
        font-size: 1.25rem;
        margin-bottom: 2rem;
        opacity: 0.9;
      }

      .cta-buttons {
        display: flex;
        gap: 1rem;
        justify-content: center;
        flex-wrap: wrap;
      }

      .cta-button {
        display: inline-block;
        padding: 0.75rem 1.5rem;
        background-color: var(--primary-color);
        color: white;
        border: none;
        border-radius: 4px;
        font-size: 0.9rem;
        text-transform: uppercase;
        letter-spacing: 1px;
        cursor: pointer;
        transition: all 0.3s;
      }

      .cta-button:hover {
        background-color: #a8142f;
        transform: translateY(-2px);
      }

      .cta-button.secondary {
        background-color: transparent;
        border: 1px solid var(--primary-color);
        color: var(--primary-color);
      }

      .cta-button.secondary:hover {
        background-color: var(--primary-color);
        color: white;
      }

      /* Section Styles */
      .section {
        padding: 4rem 0;
      }

      .section-title {
        text-align: center;
        margin-bottom: 3rem;
        font-size: 2.5rem;
      }

      /* Product Grid */
      .product-grid {
        display: grid;
        grid-template-columns: repeat(auto-fill, minmax(250px, 1fr));
        gap: 2rem;
      }

      .product-card {
        border: 1px solid var(--border-color);
        border-radius: 8px;
        overflow: hidden;
        transition: all 0.3s;
        background: white;
      }

      .product-card:hover {
        transform: translateY(-5px);
        box-shadow: 0 10px 20px rgba(0,0,0,0.1);
      }

      .product-image {
        height: 300px;
        background: #f8f9fa;
        position: relative;
        overflow: hidden;
      }

      .product-image img {
        width: 100%;
        height: 100%;
        object-fit: cover;
        transition: transform 0.5s;
      }

      .product-card:hover .product-image img {
        transform: scale(1.05);
      }

      .product-tag {
        position: absolute;
        top: 1rem;
        left: 1rem;
        background: var(--primary-color);
        color: white;
        padding: 0.25rem 0.75rem;
        border-radius: 4px;
        font-size: 0.8rem;
        z-index: 1;
      }

      .product-details {
        padding: 1.5rem;
      }

      .product-title {
        font-size: 1.1rem;
        margin-bottom: 0.5rem;
      }

      .product-category {
        color: #777;
        font-size: 0.9rem;
        margin-bottom: 0.5rem;
      }

      .product-price {
        font-weight: bold;
        font-size: 1.1rem;
        margin-top: 0.5rem;
      }

      /* Category Section */
      .category-grid {
        display: grid;
        grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
        gap: 2rem;
      }

      .category-card {
        position: relative;
        border-radius: 8px;
        overflow: hidden;
        aspect-ratio: 1;
        transition: transform 0.3s;
      }

      .category-card:hover {
        transform: translateY(-5px);
      }

      .category-image {
        width: 100%;
        height: 100%;
        object-fit: cover;
      }

      .category-content {
        position: absolute;
        bottom: 0;
        left: 0;
        right: 0;
        padding: 2rem;
        background: linear-gradient(transparent, rgba(0,0,0,0.7));
        color: white;
      }

      .category-title {
        font-size: 1.5rem;
        margin-bottom: 1rem;
      }

      /* Story Section */
      .story-section {
        background-color: var(--light-bg);
        padding: 5rem 0;
      }

      .story-container {
        display: grid;
        grid-template-columns: 1fr 1fr;
        gap: 3rem;
        align-items: center;
      }

      .story-content {
        padding: 2rem;
      }

      .story-image {
        width: 100%;
        height: 100%;
        object-fit: cover;
        border-radius: 8px;
      }

      /* Newsletter Section */
      .newsletter-section {
        background-color: var(--primary-color);
        color: white;
        padding: 4rem 0;
        text-align: center;
      }

      .newsletter-content {
        max-width: 600px;
        margin: 0 auto;
      }

      .newsletter-form {
        display: flex;
        gap: 0.5rem;
        margin-top: 2rem;
        justify-content: center;
      }

      .newsletter-input {
        padding: 0.75rem 1rem;
        border: none;
        border-radius: 4px;
        width: 100%;
        max-width: 400px;
      }

      .newsletter-button {
        padding: 0.75rem 1.5rem;
        background-color: var(--dark-bg);
        color: white;
        border: none;
        border-radius: 4px;
        cursor: pointer;
        transition: background-color 0.3s;
      }

      .newsletter-button:hover {
        background-color: #000;
      }

      .disclaimer {
        font-size: 0.9rem;
        margin-top: 1rem;
        opacity: 0.8;
      }

      /* Product Detail Page */
      .product-detail {
        display: grid;
        grid-template-columns: 1fr 1fr;
        gap: 3rem;
        padding: 2rem 0;
      }

      .product-gallery {
        display: grid;
        grid-template-columns: 80px 1fr;
        gap: 1rem;
      }

      .thumbnail-column {
        display: flex;
        flex-direction: column;
        gap: 1rem;
      }

      .thumbnail {
        width: 80px;
        height: 80px;
        border: 1px solid var(--border-color);
        border-radius: 4px;
        cursor: pointer;
        overflow: hidden;
      }

      .thumbnail img {
        width: 100%;
        height: 100%;
        object-fit: cover;
      }

      .thumbnail.active {
        border-color: var(--primary-color);
      }

      .main-image {
        border: 1px solid var(--border-color);
        border-radius: 8px;
        overflow: hidden;
        height: 500px;
      }

      .main-image img {
        width: 100%;
        height: 100%;
        object-fit: cover;
      }

      .product-info {
        padding: 1rem 0;
      }

      .product-detail-title {
        font-size: 2rem;
        margin-bottom: 0.5rem;
      }

      .product-rating {
        display: flex;
        align-items: center;
        gap: 0.5rem;
        margin-bottom: 1rem;
      }

      .stars {
        color: #ffc107;
      }

      .review-count {
        color: #777;
        font-size: 0.9rem;
      }

      .product-detail-price {
        font-size: 1.5rem;
        font-weight: bold;
        margin-bottom: 1.5rem;
      }

      .product-options {
        margin-bottom: 2rem;
      }

      .option-label {
        font-weight: bold;
        margin-bottom: 0.5rem;
        display: block;
      }

      .color-options {
        display: flex;
        gap: 0.5rem;
        margin-bottom: 1.5rem;
      }

      .color-option {
        width: 30px;
        height: 30px;
        border-radius: 50%;
        cursor: pointer;
        border: 2px solid transparent;
      }

      .color-option.active {
        border-color: var(--primary-color);
      }

      .size-options {
        display: flex;
        gap: 0.5rem;
        margin-bottom: 1.5rem;
      }

      .size-option {
        padding: 0.5rem 1rem;
        border: 1px solid var(--border-color);
        border-radius: 4px;
        cursor: pointer;
        transition: all 0.3s;
      }

      .size-option.active {
        background-color: var(--primary-color);
        color: white;
        border-color: var(--primary-color);
      }

      .quantity-selector {
        display: flex;
        align-items: center;
        gap: 1rem;
        margin-bottom: 2rem;
      }

      .quantity-label {
        font-weight: bold;
      }

      .quantity-controls {
        display: flex;
        align-items: center;
        border: 1px solid var(--border-color);
        border-radius: 4px;
      }

      .quantity-btn {
        width: 40px;
        height: 40px;
        background: none;
        border: none;
        font-size: 1.2rem;
        cursor: pointer;
        display: flex;
        align-items: center;
        justify-content: center;
      }

      .quantity-input {
        width: 40px;
        height: 40px;
        border: none;
        text-align: center;
        font-size: 1rem;
      }

      .product-actions {
        display: flex;
        gap: 1rem;
        margin-bottom: 2rem;
      }

      .add-to-cart {
        flex: 1;
      }

      .add-to-wishlist {
        padding: 0.75rem 1.5rem;
        background: none;
        border: 1px solid var(--border-color);
        border-radius: 4px;
        cursor: pointer;
        transition: all 0.3s;
      }

      .add-to-wishlist:hover {
        background-color: #f5f5f5;
      }

      .product-tabs {
        margin-top: 2rem;
        border-top: 1px solid var(--border-color);
      }

      .tabs-header {
        display: flex;
        border-bottom: 1px solid var(--border-color);
      }

      .tab-btn {
        padding: 1rem 2rem;
        background: none;
        border: none;
        border-bottom: 2px solid transparent;
        cursor: pointer;
        font-weight: bold;
        transition: all 0.3s;
      }

      .tab-btn.active {
        border-bottom-color: var(--primary-color);
        color: var(--primary-color);
      }

      .tab-content {
        padding: 2rem 0;
      }

      .tab-pane {
        display: none;
      }

      .tab-pane.active {
        display: block;
      }

      /* Related Products */
      .related-products {
        padding: 4rem 0;
      }

      /* Cart Page */
      .cart-page {
        padding: 2rem 0;
      }

      .cart-title {
        margin-bottom: 2rem;
      }

      .cart-empty {
        text-align: center;
        padding: 4rem 0;
      }

      .cart-empty-icon {
        font-size: 4rem;
        margin-bottom: 1rem;
        color: #ccc;
      }

      .cart-table {
        width: 100%;
        border-collapse: collapse;
      }

      .cart-table th {
        text-align: left;
        padding: 1rem;
        border-bottom: 1px solid var(--border-color);
      }

      .cart-table td {
        padding: 1rem;
        border-bottom: 1px solid var(--border-color);
        vertical-align: middle;
      }

      .cart-product {
        display: flex;
        align-items: center;
        gap: 1rem;
      }

      .cart-product-image {
        width: 80px;
        height: 80px;
        border-radius: 4px;
        overflow: hidden;
      }

      .cart-product-image img {
        width: 100%;
        height: 100%;
        object-fit: cover;
      }

      .cart-product-info {
        flex: 1;
      }

      .cart-product-title {
        font-weight: bold;
        margin-bottom: 0.25rem;
      }

      .cart-product-variant {
        font-size: 0.9rem;
        color: #777;
      }

      .cart-quantity {
        display: flex;
        align-items: center;
      }

      .cart-remove {
        background: none;
        border: none;
        color: #777;
        cursor: pointer;
        transition: color 0.3s;
      }

      .cart-remove:hover {
        color: var(--error-color);
      }

      .cart-summary {
        background-color: #f9f9f9;
        border-radius: 8px;
        padding: 2rem;
        margin-top: 2rem;
      }

      .cart-summary-title {
        margin-bottom: 1.5rem;
      }

      .summary-row {
        display: flex;
        justify-content: space-between;
        margin-bottom: 1rem;
      }

      .summary-row.total {
        font-weight: bold;
        font-size: 1.2rem;
        border-top: 1px solid var(--border-color);
        padding-top: 1rem;
        margin-top: 1rem;
      }

      .promo-code {
        margin: 1.5rem 0;
      }

      .promo-form {
        display: flex;
        gap: 0.5rem;
      }

      .promo-input {
        flex: 1;
        padding: 0.75rem 1rem;
        border: 1px solid var(--border-color);
        border-radius: 4px;
      }

      .promo-button {
        padding: 0.75rem 1.5rem;
        background-color: var(--dark-bg);
        color: white;
        border: none;
        border-radius: 4px;
        cursor: pointer;
      }

      .checkout-button {
        width: 100%;
        padding: 1rem;
        background-color: var(--primary-color);
        color: white;
        border: none;
        border-radius: 4px;
        font-size: 1rem;
        text-transform: uppercase;
        letter-spacing: 1px;
        cursor: pointer;
        transition: background-color 0.3s;
      }

      .checkout-button:hover {
        background-color: #a8142f;
      }

      .cart-actions {
        display: flex;
        justify-content: space-between;
        margin-top: 2rem;
      }

      /* Collections Page */
      .collections-page {
        padding: 2rem 0;
      }

      .collections-grid {
        display: grid;
        grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
        gap: 2rem;
      }

      .collection-card {
        position: relative;
        border-radius: 8px;
        overflow: hidden;
        aspect-ratio: 3/4;
      }

      .collection-image {
        width: 100%;
        height: 100%;
        object-fit: cover;
      }

      .collection-content {
        position: absolute;
        bottom: 0;
        left: 0;
        right: 0;
        padding: 2rem;
        background: linear-gradient(transparent, rgba(0,0,0,0.7));
        color: white;
      }

      /* Products Page */
      .products-page {
        padding: 2rem 0;
        display: grid;
        grid-template-columns: 250px 1fr;
        gap: 2rem;
      }

      .filters-sidebar {
        padding-right: 2rem;
      }

      .filter-section {
        margin-bottom: 2rem;
      }

      .filter-title {
        display: flex;
        justify-content: space-between;
        align-items: center;
        margin-bottom: 1rem;
        cursor: pointer;
      }

      .filter-content {
        margin-bottom: 1rem;
      }

      .filter-option {
        display: flex;
        align-items: center;
        gap: 0.5rem;
        margin-bottom: 0.5rem;
      }

      .filter-checkbox {
        width: 18px;
        height: 18px;
      }

      .price-range {
        margin-top: 1rem;
      }

      .price-slider {
        width: 100%;
        margin-bottom: 1rem;
      }

      .price-inputs {
        display: flex;
        justify-content: space-between;
      }

      .color-filter {
        display: flex;
        flex-wrap: wrap;
        gap: 0.5rem;
      }

      .color-filter-option {
        width: 30px;
        height: 30px;
        border-radius: 50%;
        cursor: pointer;
        border: 2px solid transparent;
      }

      .color-filter-option.active {
        border-color: var(--primary-color);
      }

      .products-header {
        display: flex;
        justify-content: space-between;
        align-items: center;
        margin-bottom: 2rem;
      }

      .sort-dropdown {
        padding: 0.5rem 1rem;
        border: 1px solid var(--border-color);
        border-radius: 4px;
      }

      /* Blog Page */
      .blog-page {
        padding: 2rem 0;
      }

      .blog-grid {
        display: grid;
        grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
        gap: 2rem;
      }

      .blog-card {
        border: 1px solid var(--border-color);
        border-radius: 8px;
        overflow: hidden;
        transition: transform 0.3s;
      }

      .blog-card:hover {
        transform: translateY(-5px);
        box-shadow: 0 10px 20px rgba(0,0,0,0.1);
      }

      .blog-image {
        height: 200px;
        overflow: hidden;
      }

      .blog-image img {
        width: 100%;
        height: 100%;
        object-fit: cover;
        transition: transform 0.5s;
      }

      .blog-card:hover .blog-image img {
        transform: scale(1.05);
      }

      .blog-content {
        padding: 1.5rem;
      }

      .blog-date {
        font-size: 0.9rem;
        color: #777;
        margin-bottom: 0.5rem;
      }

      .blog-title {
        font-size: 1.25rem;
        margin-bottom: 0.5rem;
      }

      .blog-excerpt {
        margin-bottom: 1rem;
        color: #555;
      }

      .blog-link {
        color: var(--primary-color);
        font-weight: bold;
      }

      /* Blog Post Page */
      .blog-post {
        max-width: 800px;
        margin: 0 auto;
        padding: 2rem 0;
      }

      .post-header {
        margin-bottom: 2rem;
      }

      .post-title {
        font-size: 2.5rem;
        margin-bottom: 1rem;
      }

      .post-meta {
        display: flex;
        gap: 1rem;
        color: #777;
        font-size: 0.9rem;
        margin-bottom: 1rem;
      }

      .post-image {
        width: 100%;
        height: 400px;
        border-radius: 8px;
        overflow: hidden;
        margin-bottom: 2rem;
      }

      .post-image img {
        width: 100%;
        height: 100%;
        object-fit: cover;
      }

      .post-content {
        line-height: 1.8;
      }

      .post-content p {
        margin-bottom: 1.5rem;
      }

      .post-content h2 {
        margin-top: 2rem;
        margin-bottom: 1rem;
      }

      .post-content img {
        max-width: 100%;
        border-radius: 8px;
        margin: 1.5rem 0;
      }

      .post-tags {
        display: flex;
        gap: 0.5rem;
        margin-top: 2rem;
        flex-wrap: wrap;
      }

      .post-tag {
        padding: 0.25rem 0.75rem;
        background-color: #f5f5f5;
        border-radius: 4px;
        font-size: 0.9rem;
      }

      /* About Page */
      .about-page {
        padding: 2rem 0;
      }

      .about-hero {
        text-align: center;
        padding: 4rem 0;
        background-color: #f5f5f5;
        margin-bottom: 4rem;
      }

      .about-hero-title {
        font-size: 3rem;
        margin-bottom: 1rem;
      }

      .about-hero-subtitle {
        font-size: 1.25rem;
        max-width: 800px;
        margin: 0 auto;
      }

      .about-section {
        margin-bottom: 4rem;
      }

      .about-grid {
        display: grid;
        grid-template-columns: 1fr 1fr;
        gap: 3rem;
        align-items: center;
      }

      .about-image {
        width: 100%;
        height: 100%;
        border-radius: 8px;
        overflow: hidden;
      }

      .about-image img {
        width: 100%;
        height: 100%;
        object-fit: cover;
      }

      .about-content {
        padding: 2rem;
      }

      .values-grid {
        display: grid;
        grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
        gap: 2rem;
        margin: 4rem 0;
      }

      .value-card {
        text-align: center;
        padding: 2rem;
        border: 1px solid var(--border-color);
        border-radius: 8px;
        transition: transform 0.3s;
      }

      .value-card:hover {
        transform: translateY(-5px);
        box-shadow: 0 10px 20px rgba(0,0,0,0.1);
      }

      .value-icon {
        font-size: 2.5rem;
        margin-bottom: 1rem;
        color: var(--primary-color);
      }

      .team-grid {
        display: grid;
        grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
        gap: 2rem;
        margin: 4rem 0;
      }

      .team-card {
        text-align: center;
      }

      .team-image {
        width: 200px;
        height: 200px;
        border-radius: 50%;
        overflow: hidden;
        margin: 0 auto 1rem;
      }

      .team-image img {
        width: 100%;
        height: 100%;
        object-fit: cover;
      }

      .team-name {
        font-size: 1.25rem;
        margin-bottom: 0.5rem;
      }

      .team-role {
        color: #777;
        font-size: 0.9rem;
      }

      /* Contact Page */
      .contact-page {
        padding: 2rem 0;
      }

      .contact-grid {
        display: grid;
        grid-template-columns: 1fr 2fr;
        gap: 3rem;
      }

      .contact-info {
        background-color: #f5f5f5;
        padding: 2rem;
        border-radius: 8px;
      }

      .info-card {
        margin-bottom: 2rem;
      }

      .info-card h3 {
        display: flex;
        align-items: center;
        gap: 0.5rem;
        margin-bottom: 0.5rem;
      }

      .contact-form {
        display: grid;
        gap: 1.5rem;
      }

      .form-group {
        display: grid;
        gap: 0.5rem;
      }

      .form-label {
        font-weight: bold;
      }

      .form-input {
        padding: 0.75rem 1rem;
        border: 1px solid var(--border-color);
        border-radius: 4px;
        width: 100%;
      }

      .form-textarea {
        padding: 0.75rem 1rem;
        border: 1px solid var(--border-color);
        border-radius: 4px;
        width: 100%;
        min-height: 150px;
        resize: vertical;
      }

      /* Footer Styles */
      .nova-footer {
        background: var(--footer-bg);
        color: var(--footer-text);
        padding: 4rem 0 2rem;
        margin-top: auto;
      }

      .footer-grid {
        display: grid;
        grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
        gap: 2rem;
        margin-bottom: 3rem;
      }

      .footer-col h4 {
        font-size: 1.25rem;
        margin-bottom: 1.5rem;
      }

      .footer-links {
        list-style: none;
        padding: 0;
        display: grid;
        gap: 0.75rem;
      }

      .footer-link {
        color: var(--footer-text);
        opacity: 0.8;
        transition: opacity 0.3s;
      }

      .footer-link:hover {
        opacity: 1;
        color: var(--primary-color);
      }

      .footer-newsletter {
        display: grid;
        gap: 1rem;
        margin-top: 1rem;
      }

      .footer-input {
        padding: 0.75rem 1rem;
        border: 1px solid var(--border-color);
        border-radius: 4px;
        width: 100%;
      }

      .footer-button {
        padding: 0.75rem 1.5rem;
        background-color: var(--primary-color);
        color: white;
        border: none;
        border-radius: 4px;
        cursor: pointer;
        transition: background-color 0.3s;
      }

      .footer-button:hover {
        background-color: #a8142f;
      }

      .social-links {
        display: flex;
        gap: 1rem;
        margin-top: 1rem;
      }

      .social-link {
        width: 40px;
        height: 40px;
        border-radius: 50%;
        background-color: rgba(255,255,255,0.1);
        display: flex;
        align-items: center;
        justify-content: center;
        transition: background-color 0.3s;
      }

      .social-link:hover {
        background-color: var(--primary-color);
      }

      .copyright {
        text-align: center;
        padding-top: 2rem;
        border-top: 1px solid rgba(255,255,255,0.1);
        font-size: 0.9rem;
        opacity: 0.8;
      }

      /* Page Transitions */
      .page-transition {
        opacity: 0;
        transition: opacity 0.3s ease;
      }

      .page-transition.active {
        opacity: 1;
      }

      /* Responsive Styles */
      @media (max-width: 1024px) {
        .hero-title {
          font-size: 3rem;
        }

        .product-detail {
          grid-template-columns: 1fr;
        }

        .about-grid {
          grid-template-columns: 1fr;
        }

        .story-container {
          grid-template-columns: 1fr;
        }

        .contact-grid {
          grid-template-columns: 1fr;
        }

        .products-page {
          grid-template-columns: 1fr;
        }

        .filters-sidebar {
          padding-right: 0;
        }
      }

      @media (max-width: 768px) {
        .nova-nav {
          padding: 0 1rem;
        }

        .main-nav {
          display: none;
        }

        .mobile-menu-toggle {
          display: block;
        }

        .hero-title {
          font-size: 2.5rem;
        }

        .hero-section {
          height: 60vh;
        }

        .product-gallery {
          grid-template-columns: 1fr;
        }

        .thumbnail-column {
          flex-direction: row;
          overflow-x: auto;
          margin-top: 1rem;
        }

        .cart-table {
          display: block;
          overflow-x: auto;
        }

        .cart-actions {
          flex-direction: column;
          gap: 1rem;
        }

        .newsletter-form {
          flex-direction: column;
        }
      }

      @media (max-width: 480px) {
        .hero-title {
          font-size: 2rem;
        }

        .cta-buttons {
          flex-direction: column;
          width: 100%;
        }

        .cta-button {
          width: 100%;
        }

        .product-actions {
          flex-direction: column;
        }

        .add-to-wishlist {
          width: 100%;
        }
      }
    `
  }

  getHTML(): string {
    return `
      <div class="nova-template">
        ${this.generateHeader()}
        <main class="page-container" id="page-container">
          <div id="app-content" class="page-transition active">
            <!-- Page content will be loaded here -->
          </div>
        </main>
        ${this.generateFooter()}
      </div>
      ${this.generateTemplates()}
      ${this.generateScripts()}
    `
  }

  private generateHeader(): string {
    return `
      <header class="nova-header">
        <nav class="nova-nav">
          <a href="#" class="nova-logo" onclick="if(window.novaRouter) window.novaRouter.navigate('home'); return false;">${
            this.config.content.BRAND_NAME || "LUXE"
          }</a>
          <div class="main-nav">
            <a class="nav-link" onclick="if(window.novaRouter) window.novaRouter.navigate('home'); return false;">Home</a>
            <a class="nav-link" onclick="if(window.novaRouter) window.novaRouter.navigate('products'); return false;">Collections</a>
            <a class="nav-link" onclick="if(window.novaRouter) window.novaRouter.navigate('blog'); return false;">Blog</a>
          
          </div>
          <div class="nav-icons">
            <button class="icon-btn" onclick="document.getElementById('search-overlay').style.display='flex'">
              <i class="search-icon">🔍</i>
            </button>
            <button class="icon-btn" style="position: relative;" onclick="if(window.novaRouter) window.novaRouter.navigate('cart'); return false;">
              <i class="cart-icon">🛒</i>
              <span class="cart-count" id="cart-count">0</span>
            </button>
          </div>
          <button class="mobile-menu-toggle" onclick="document.getElementById('mobile-menu').style.display='flex'">
            ☰
          </button>
        </nav>
      </header>
      <div id="mobile-menu" class="mobile-menu" style="display: none;">
        <div class="mobile-menu-header">
          <a href="#" class="nova-logo" onclick="if(window.novaRouter) window.novaRouter.navigate('home'); document.getElementById('mobile-menu').style.display='none'; return false;">${
            this.config.content.BRAND_NAME || "LUXE"
          }</a>
          <button class="mobile-menu-close" onclick="document.getElementById('mobile-menu').style.display='none'">
            ✕
          </button>
        </div>
        <div class="mobile-nav-links">
          <a class="mobile-nav-link" onclick="if(window.novaRouter) window.novaRouter.navigate('home'); document.getElementById('mobile-menu').style.display='none'; return false;">Home</a>
          <a class="mobile-nav-link" onclick="if(window.novaRouter) window.novaRouter.navigate('products'); document.getElementById('mobile-menu').style.display='none'; return false;">Collections</a>
          <a class="mobile-nav-link" onclick="if(window.novaRouter) window.novaRouter.navigate('blog'); document.getElementById('mobile-menu').style.display='none'; return false;">Blog</a>
          
        </div>
      </div>
      <div id="search-overlay" style="display: none; position: fixed; top: 0; left: 0; right: 0; bottom: 0; background: rgba(255,255,255,0.95); z-index: 1000; align-items: center; justify-content: center; flex-direction: column; padding: 2rem;">
        <button style="position: absolute; top: 2rem; right: 2rem; background: none; border: none; font-size: 1.5rem; cursor: pointer;" onclick="document.getElementById('search-overlay').style.display='none'">
          ✕
        </button>
        <h2 style="margin-bottom: 2rem;">Search for products...</h2>
        <div style="width: 100%; max-width: 600px; display: flex;">
          <input type="text" placeholder="Search for products..." style="flex: 1; padding: 1rem; border: 1px solid #ddd; border-right: none; border-radius: 4px 0 0 4px;">
          <button style="padding: 1rem 2rem; background: var(--primary-color); color: white; border: none; border-radius: 0 4px 4px 0; cursor: pointer;">Search</button>
        </div>
      </div>
    `;
  }

  private generateTemplates(): string {
    return `
      <!-- Template for Home page -->
      <template id="home-template">
        ${this.generateHeroSection()}
        ${this.generateFeaturedProducts()}
        ${this.generateStorySection()}
       
      </template>

      

      <!-- Template for Blog page -->
      <template id="blog-template">
        ${this.generateBlogPage()}
      </template>

      <!-- Template for Blog Post page -->
      <template id="blog-post-template">
        ${this.generateBlogPostPage()}
      </template>

     

     

      <!-- Template for Products page -->
      <template id="products-template">
        ${this.generateProductsPage()}
      </template>

      <!-- Template for Product Detail page -->
      <template id="product-detail-template">
        ${this.generateProductDetailPage()}
      </template>

      <!-- Template for Cart page -->
      <template id="cart-template">
        ${this.generateCartPage()}
      </template>

      <!-- Template for Empty Cart page -->
      <template id="empty-cart-template">
        ${this.generateEmptyCartPage()}
      </template>

      <!-- Template for 404 Not Found -->
      <template id="not-found-template">
        <section class="not-found" style="text-align: center; padding: 6rem 2rem;">
          <h1>Page Not Found</h1>
          <p>The page you requested could not be found.</p>
          <button class="cta-button" onclick="if(window.novaRouter) window.novaRouter.navigate('products'); return false;">Return to Collecctions</button>
        </section>
      </template>
    `;
  }

  private generateHeroSection(): string {
    return `
      <section class="hero-section" style="background-image: linear-gradient(rgba(0,0,0,0.3), rgba(0,0,0,0.3)), url('/placeholder.svg?height=800&width=1600'); background-size: cover; background-position: center; color: white;">
        <div class="hero-content">
          <h1 class="hero-title">${this.config.content.HERO_TITLE || "Summer Collection 2024"}</h1>
          <p class="hero-subtitle">${this.config.content.HERO_DESCRIPTION || "Discover the latest trends and elevate your style with our exclusive pieces."}</p>
          <div class="cta-buttons">
            <button class="cta-button" onclick="if(window.novaRouter) window.novaRouter.navigate('products'); return false;">${this.config.content.PRIMARY_CTA_TEXT || "Shop Collection"}</button>
            <button class="cta-button secondary" onclick="if(window.novaRouter) window.novaRouter.navigate('blog'); return false;">${this.config.content.SECONDARY_CTA_TEXT || "Our Story"}</button>
          </div>
        </div>
      </section>
    `
  }

  
  private generateFeaturedProducts(): string {
    return `
      <section class="section">
        <div class="container">
          <h2 class="section-title">${this.config.content.PRODUCTS_TITLE || "Featured Products"}</h2>
          <div class="product-grid">
            ${this.generateProductCards(8)}
          </div>
          <div style="text-align: center; margin-top: 3rem;">
            <button class="cta-button" onclick="if(window.novaRouter) window.novaRouter.navigate('products'); return false;">View All Products</button>
          </div>
        </div>
      </section>
    `
  }

  private generateProductCards(count: number): string {
    const products = [
      { id: 1, name: "Silk Blend Midi Dress", category: "Dresses", price: 129.99, tag: "New" },
      { id: 2, name: "Tailored Wool Blazer", category: "Outerwear", price: 189.99, tag: "" },
      { id: 3, name: "Organic Cotton T-Shirt", category: "Tops", price: 39.99, tag: "Sustainable" },
      { id: 4, name: "High-Rise Slim Jeans", category: "Bottoms", price: 79.99, tag: "" },
      { id: 5, name: "Leather Crossbody Bag", category: "Accessories", price: 119.99, tag: "Bestseller" },
      { id: 6, name: "Cashmere Sweater", category: "Tops", price: 149.99, tag: "" },
      { id: 7, name: "Linen Blend Shirt", category: "Tops", price: 69.99, tag: "" },
      { id: 8, name: "Pleated Midi Skirt", category: "Bottoms", price: 89.99, tag: "" },
      { id: 9, name: "Merino Wool Scarf", category: "Accessories", price: 59.99, tag: "" },
      { id: 10, name: "Leather Chelsea Boots", category: "Shoes", price: 159.99, tag: "" },
    ]

    return products
      .slice(0, count)
      .map(
        (product) => `
      <div class="product-card">
        <div class="product-image">
          ${product.tag ? `<span class="product-tag">${product.tag}</span>` : ""}
          <img src="/placeholder.svg?height=400&width=300" alt="${product.name}">
        </div>
        <div class="product-details">
          <h3 class="product-title">${product.name}</h3>
          <p class="product-category">${product.category}</p>
          <p class="product-price">$${product.price.toFixed(2)}</p>
          <button class="cta-button" onclick="if(window.novaRouter) window.novaRouter.navigate('product-detail', { id: ${product.id} }); return false;">View Product</button>
        </div>
      </div>
    `,
      )
      .join("")
  }

  private generateStorySection(): string {
    return `
      <section class="story-section">
        <div class="container">
          <div class="story-container">
            <div class="story-content">
              <h2>${this.config.content.ABOUT_TITLE || "Our Story"}</h2>
              <p>${this.config.content.ABOUT_TEXT || "Founded in 2010, LUXE began as a small boutique in Paris with a vision to create fashion that transcends trends and celebrates individuality. Our founder, Emma Laurent, believed that clothing should not only look beautiful but also tell a story and empower the wearer."}</p>
              <p>Today, we continue to honor our heritage while embracing innovation and responsibility. Each LUXE piece is a testament to our dedication to excellence and our belief that fashion can be both beautiful and meaningful.</p>
              
            </div>
            
          </div>
        </div>
      </section>
    `
  }

 
  

  private generateBlogPage(): string {
    return `
      <div class="blog-page">
        <section class="hero-section" style="background-image: linear-gradient(rgba(0,0,0,0.3), rgba(0,0,0,0.3)), url('/placeholder.svg?height=800&width=1600'); background-size: cover; background-position: center; color: white;">
          <div class="hero-content">
            <h1 class="hero-title">LUXE Blog</h1>
            <p class="hero-subtitle">Fashion insights, styling tips, and behind-the-scenes stories</p>
          </div>
        </section>

        <section class="section">
          <div class="container">
            <div class="blog-grid">
              ${[
                {
                  id: 1,
                  title: "Summer Fashion Trends 2024",
                  date: "June 15, 2024",
                  excerpt:
                    "Discover the hottest trends for the summer season and how to incorporate them into your wardrobe.",
                },
                {
                  id: 2,
                  title: "Sustainable Fashion: Our Commitment",
                  date: "May 28, 2024",
                  excerpt:
                    "Learn about our journey towards sustainability and the steps we're taking to reduce our environmental impact.",
                },
                {
                  id: 3,
                  title: "The Art of Layering",
                  date: "May 10, 2024",
                  excerpt:
                    "Master the art of layering with our expert tips for creating stylish and versatile outfits for any season.",
                },
                {
                  id: 4,
                  title: "Behind the Scenes: Summer Photoshoot",
                  date: "April 22, 2024",
                  excerpt:
                    "Get an exclusive look at our summer collection photoshoot and the inspiration behind the new pieces.",
                },
                {
                  id: 5,
                  title: "How to Build a Capsule Wardrobe",
                  date: "April 5, 2024",
                  excerpt:
                    "Simplify your style with our guide to creating a versatile capsule wardrobe that works for any occasion.",
                },
                {
                  id: 6,
                  title: "Meet the Designer: Emma Laurent",
                  date: "March 18, 2024",
                  excerpt:
                    "An interview with our founder and creative director on her vision for LUXE and the future of fashion.",
                },
              ]
                .map(
                  (post) => `
                <div class="blog-card">
                  <div class="blog-image">
                    <img src="/placeholder.svg?height=400&width=600" alt="${post.title}">
                  </div>
                  <div class="blog-content">
                    <p class="blog-date">${post.date}</p>
                    <h3 class="blog-title">${post.title}</h3>
                    <p class="blog-excerpt">${post.excerpt}</p>
                    <a class="blog-link" onclick="if(window.novaRouter) window.novaRouter.navigate('blog-post', { id: ${post.id} }); return false;">Read More</a>
                  </div>
                </div>
              `,
                )
                .join("")}
            </div>
          </div>
        </section>
      </div>
    `
  }

  private generateBlogPostPage(): string {
    return `
      <div class="blog-post">
        <div class="post-header">
          <h1 class="post-title">Summer Fashion Trends 2024</h1>
          <div class="post-meta">
            <span>June 15, 2024</span>
            <span>By Emma Laurent</span>
          </div>
        </div>

        <div class="post-image">
          <img src="/placeholder.svg?height=600&width=1200" alt="Summer Fashion Trends 2024">
        </div>

        <div class="post-content">
          <p>As the temperature rises and the days grow longer, it's time to refresh your wardrobe with the season's most coveted trends. Summer 2024 brings a delightful mix of nostalgic references, bold statements, and sustainable innovations.</p>

          <h2>1. Vibrant Dopamine Dressing</h2>
          <p>After years of neutral palettes, fashion is embracing joy through color. Think electric blues, sunset oranges, and vibrant pinks that instantly elevate your mood. The key is to either go all-in with a monochromatic look or use these bright hues as statement pieces against a neutral base.</p>

          <img src="/placeholder.svg?height=400&width=800" alt="Vibrant Summer Colors">

          <h2>2. Ethereal Sheer Layers</h2>
          <p>Transparency continues its reign this summer, with designers exploring the delicate balance between revelation and concealment. Sheer fabrics are being layered over solid pieces, creating depth and dimension while maintaining elegance.</p>

          <h2>3. Sustainable Materials</h2>
          <p>Sustainability is no longer just a trend but a movement transforming the industry. This season, we're seeing innovative fabrics made from recycled materials, organic cotton, and even plant-based alternatives to leather. Our new Eco Collection features pieces made entirely from recycled ocean plastic and organic fibers.</p>

          <h2>4. The Return of Linen</h2>
          <p>This timeless summer fabric is having a major moment. Beyond the classic linen shirt, designers are exploring structured linen blazers, wide-leg trousers, and even evening wear. The slightly rumpled texture adds character while keeping you cool during hot days.</p>

          <h2>5. How to Style These Trends</h2>
          <p>The beauty of this season's trends lies in their versatility. Mix and match different elements to create a look that's uniquely yours. Pair a vibrant silk top with relaxed linen pants for an effortless day-to-night outfit, or layer a sheer blouse over a simple camisole for a subtle statement.</p>

          <p>Remember, the most important aspect of style is wearing what makes you feel confident and comfortable. Use these trends as inspiration rather than rules, and don't be afraid to experiment with your personal expression.</p>

          <div class="post-tags">
            <span class="post-tag">Summer Fashion</span>
            <span class="post-tag">Trends</span>
            <span class="post-tag">Sustainable Style</span>
            <span class="post-tag">Fashion Tips</span>
          </div>
        </div>
      </div>
    `
  }

  

  private generateProductsPage(): string {
    return `
      <div class="products-page">
        <div class="filters-sidebar">
          <h2>Filters</h2>
          <button style="background: none; border: 1px solid #ddd; padding: 0.5rem 1rem; border-radius: 4px; margin-bottom: 2rem; cursor: pointer;">Clear All</button>

          <div class="filter-section">
            <div class="filter-title">
              <h3>Categories</h3>
              <span>▼</span>
            </div>
            <div class="filter-content">
              ${["Dresses", "Tops", "Bottoms", "Outerwear", "Accessories"]
                .map(
                  (category) => `
                <div class="filter-option">
                  <input type="checkbox" id="${category.toLowerCase()}" class="filter-checkbox">
                  <label for="${category.toLowerCase()}">${category}</label>
                </div>
              `,
                )
                .join("")}
            </div>
          </div>

          <div class="filter-section">
            <div class="filter-title">
              <h3>Price Range</h3>
              <span>▼</span>
            </div>
            <div class="filter-content">
              <input type="range" min="0" max="500" value="500" class="price-slider">
              <div class="price-inputs">
                <span>$0</span>
                <span>$500</span>
              </div>
            </div>
          </div>

          <div class="filter-section">
            <div class="filter-title">
              <h3>Sizes</h3>
              <span>▼</span>
            </div>
            <div class="filter-content">
              ${["XS", "S", "M", "L", "XL"]
                .map(
                  (size) => `
                <div class="filter-option">
                  <input type="checkbox" id="${size}" class="filter-checkbox">
                  <label for="${size}">${size}</label>
                </div>
              `,
                )
                .join("")}
            </div>
          </div>

          <div class="filter-section">
            <div class="filter-title">
              <h3>Colors</h3>
              <span>▼</span>
            </div>
            <div class="filter-content">
              <div class="color-filter">
                ${[
                  { name: "Black", code: "#000" },
                  { name: "White", code: "#fff" },
                  { name: "Gray", code: "#888" },
                  { name: "Red", code: "#e74c3c" },
                  { name: "Blue", code: "#3498db" },
                  { name: "Green", code: "#2ecc71" },
                ]
                  .map(
                    (color) => `
                  <div class="color-filter-option" style="background-color: ${color.code};" title="${color.name}"></div>
                `,
                  )
                  .join("")}
              </div>
            </div>
          </div>
        </div>

        <div class="products-content">
          <div class="products-header">
            <h1>All Products</h1>
            <div>
              <label>Sort by: </label>
              <select class="sort-dropdown">
                <option>Featured</option>
                <option>Price: Low to High</option>
                <option>Price: High to Low</option>
                <option>Newest</option>
              </select>
            </div>
          </div>

          <div class="product-grid">
            ${this.generateProductCards(10)}
          </div>
        </div>
      </div>
    `
  }

  private generateProductDetailPage(): string {
    return `
      <div class="container" style="padding: 2rem 0;">
        <div class="product-detail">
          <div class="product-gallery">
            <div class="thumbnail-column">
              ${[1, 2, 3, 4]
                .map(
                  (i) => `
                <div class="thumbnail ${i === 1 ? "active" : ""}">
                  <img src="/placeholder.svg?height=80&width=80" alt="Thumbnail ${i}">
                </div>
              `,
                )
                .join("")}
            </div>
            <div class="main-image">
              <img src="/placeholder.svg?height=600&width=500" alt="Silk Blend Midi Dress">
            </div>
          </div>

          <div class="product-info">
            <h1 class="product-detail-title">Silk Blend Midi Dress</h1>
            <div class="product-rating">
              <div class="stars">★★★★☆</div>
              <span class="review-count">(42 reviews)</span>
            </div>
            <p class="product-detail-price">$129.99</p>

            <div class="product-options">
              <label class="option-label">Color</label>
              <div class="color-options">
                ${[
                  { name: "Black", code: "#000" },
                  { name: "Navy", code: "#000080" },
                  { name: "Burgundy", code: "#800020" },
                ]
                  .map(
                    (color, i) => `
                  <div class="color-option ${i === 0 ? "active" : ""}" style="background-color: ${color.code};" title="${color.name}"></div>
                `,
                  )
                  .join("")}
              </div>

              <label class="option-label">Size</label>
              <div class="size-options">
                ${["XS", "S", "M", "L", "XL"]
                  .map(
                    (size, i) => `
                  <div class="size-option ${i === 0 ? "active" : ""}">${size}</div>
                `,
                  )
                  .join("")}
              </div>
              <a href="#" style="font-size: 0.9rem; color: var(--primary-color);">Size Guide</a>

              <div class="quantity-selector">
                <label class="quantity-label">Quantity</label>
                <div class="quantity-controls">
                  <button class="quantity-btn">-</button>
                  <input type="text" value="1" class="quantity-input">
                  <button class="quantity-btn">+</button>
                </div>
              </div>
            </div>

            <div class="product-actions">
              <button class="cta-button add-to-cart">Add to Cart</button>
              <button class="add-to-wishlist">Add to Wishlist</button>
            </div>

            <div class="product-tabs">
              <div class="tabs-header">
                <button class="tab-btn active">Description</button>
                <button class="tab-btn">Details</button>
                <button class="tab-btn">Shipping</button>
              </div>
              <div class="tab-content">
                <div class="tab-pane active">
                  <p>A luxurious silk blend midi dress with a flattering silhouette, perfect for both casual and formal occasions.</p>
                  <p>This versatile piece features a subtle drape that elegantly follows your body's natural contours, creating a sophisticated yet effortless look. The lightweight fabric ensures comfort throughout the day or evening.</p>
                </div>
              </div>
            </div>
          </div>
        </div>

        <section class="related-products">
          <h2 class="section-title">You May Also Like</h2>
          <div class="product-grid">
            ${this.generateProductCards(4)}
          </div>
        </section>
      </div>
    `
  }

  private generateCartPage(): string {
    return `
      <div class="cart-page container">
        <h1 class="cart-title">Shopping Cart</h1>

        <div style="display: grid; grid-template-columns: 2fr 1fr; gap: 2rem;">
          <div>
            <table class="cart-table">
              <thead>
                <tr>
                  <th>Product</th>
                  <th>Price</th>
                  <th>Quantity</th>
                  <th>Total</th>
                  <th></th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td>
                    <div class="cart-product">
                      <div class="cart-product-image">
                        <img src="/placeholder.svg?height=80&width=80" alt="Silk Blend Midi Dress">
                      </div>
                      <div class="cart-product-info">
                        <h3 class="cart-product-title">Silk Blend Midi Dress</h3>
                        <p class="cart-product-variant">Size: XS, Color: Black</p>
                      </div>
                    </div>
                  </td>
                  <td>$129.99</td>
                  <td>
                    <div class="quantity-controls">
                      <button class="quantity-btn">-</button>
                      <input type="text" value="1" class="quantity-input">
                      <button class="quantity-btn">+</button>
                    </div>
                  </td>
                  <td>$129.99</td>
                  <td>
                    <button class="cart-remove">✕</button>
                  </td>
                </tr>
                <tr>
                  <td>
                    <div class="cart-product">
                      <div class="cart-product-image">
                        <img src="/placeholder.svg?height=80&width=80" alt="Tailored Wool Blazer">
                      </div>
                      <div class="cart-product-info">
                        <h3 class="cart-product-title">Tailored Wool Blazer</h3>
                        <p class="cart-product-variant">Size: S, Color: Charcoal</p>
                      </div>
                    </div>
                  </td>
                  <td>$189.99</td>
                  <td>
                    <div class="quantity-controls">
                      <button class="quantity-btn">-</button>
                      <input type="text" value="1" class="quantity-input">
                      <button class="quantity-btn">+</button>
                    </div>
                  </td>
                  <td>$189.99</td>
                  <td>
                    <button class="cart-remove">✕</button>
                  </td>
                </tr>
              </tbody>
            </table>

            <div class="cart-actions">
              <button class="cta-button secondary" onclick="if(window.novaRouter) window.novaRouter.navigate('home'); return false;">Continue Shopping</button>
              <button class="cta-button secondary">Clear Cart</button>
            </div>
          </div>

          <div class="cart-summary">
            <h2 class="cart-summary-title">Order Summary</h2>
            <div class="summary-row">
              <span>Subtotal</span>
              <span>$319.98</span>
            </div>
            <div class="summary-row">
              <span>Shipping</span>
              <span>Free</span>
            </div>
            <div class="summary-row">
              <span>Tax (8%)</span>
              <span>$25.60</span>
            </div>
            <div class="summary-row total">
              <span>Total</span>
              <span>$345.58</span>
            </div>

            <div class="promo-code">
              <h3>Promo Code</h3>
              <div class="promo-form">
                <input type="text" class="promo-input" placeholder="Enter promo code">
                <button class="promo-button">Apply</button>
              </div>
            </div>

            <button class="checkout-button">Proceed to Checkout</button>
          </div>
        </div>
      </div>
    `
  }

  private generateEmptyCartPage(): string {
    return `
      <div class="cart-empty container">
        <div class="cart-empty-icon">🛒</div>
        <h1>Your cart is empty</h1>
        <p>Looks like you haven't added anything to your cart yet.</p>
        <button class="cta-button" style="margin-top: 2rem;" onclick="if(window.novaRouter) window.novaRouter.navigate('home'); return false;">Continue Shopping</button>
      </div>
    `
  }

  private generateFooter(): string {
    return `
      <footer class="nova-footer">
        <div class="container">
          <div class="footer-grid">
            <div class="footer-col">
              <h4>${this.config.content.BRAND_NAME || "LUXE"}</h4>
              <p>Elevate your style with our curated collections of timeless fashion pieces.</p>
              <div class="social-links">
                <a href="${this.config.content.INSTAGRAM_LINK || "#"}" class="social-link">📷</a>
                <a href="${this.config.content.FACEBOOK_LINK || "#"}" class="social-link">👍</a>
                <a href="${this.config.content.TWITTER_LINK || "#"}" class="social-link">🐦</a>
                <a href="${this.config.content.PINTEREST_LINK || "#"}" class="social-link">📌</a>
              </div>
            </div>
            <div class="footer-col">
              <h4>Shop</h4>
              <ul class="footer-links">
                <li><a href="#" class="footer-link" onclick="if(window.novaRouter) window.novaRouter.navigate('products'); return false;">Women</a></li>
                <li><a href="#" class="footer-link" onclick="if(window.novaRouter) window.novaRouter.navigate('products'); return false;">Men</a></li>
                <li><a href="#" class="footer-link" onclick="if(window.novaRouter) window.novaRouter.navigate('products'); return false;">Accessories</a></li>
                <li><a href="#" class="footer-link" onclick="if(window.novaRouter) window.novaRouter.navigate('products'); return false;">New Arrivals</a></li>
                <li><a href="#" class="footer-link" onclick="if(window.novaRouter) window.novaRouter.navigate('products'); return false;">Sale</a></li>
              </ul>
            </div>
           
           
          </div>

         

          <div class="copyright">
            © ${new Date().getFullYear()} ${this.config.content.BRAND_NAME || "LUXE"} Fashion. All rights reserved.
          </div>
        </div>
      </footer>
    `
  }

  private generateScripts(): string {
  return (
    `
    <script>
// Create the router instance immediately to ensure it's available
window.novaRouter = {
  routes: {},
  currentRoute: 'home',
  contentContainer: null,
  params: {},
  initialContentSet: false,
  
  init: function() {
    this.routes = {
      'home': document.getElementById('home-template'),
      
      'blog': document.getElementById('blog-template'),
      'blog-post': document.getElementById('blog-post-template'),
     
      'products': document.getElementById('products-template'),
      'product-detail': document.getElementById('product-detail-template'),
      'cart': document.getElementById('cart-template'),
      'empty-cart': document.getElementById('empty-cart-template'),
      'not-found': document.getElementById('not-found-template')
    };
    
    this.contentContainer = document.getElementById('app-content');
    
    // Check if we already have content in the container (during editing)
    if (this.contentContainer && this.contentContainer.children.length > 0) {
      console.log("Content already exists, preserving during edit");
      this.initialContentSet = true;
    } else {
      // Load initial content on first load
      console.log("Loading initial content");
      this.loadInitialContent();
    }
    
    // Set up navigation event handlers
    this.setupNavigationHandlers();
    
    // Initialize cart count
    this.updateCartCount();
  },
  
  loadInitialContent: function() {
    // Only load initial content if it hasn't been set yet
    if (!this.initialContentSet) {
      const defaultTemplate = this.routes['home'];
      if (defaultTemplate && this.contentContainer) {
        this.contentContainer.innerHTML = defaultTemplate.innerHTML;
        this.updateActiveNavLinks('home');
        this.initialContentSet = true;
      }
    }
  },
  
  setupNavigationHandlers: function() {
    // Find all navigation links and attach click handlers
    document.querySelectorAll('[data-nav]').forEach(link => {
      link.addEventListener('click', (e) => {
        e.preventDefault();
        const page = link.getAttribute('data-nav');
        this.navigate(page);
      });
    });
    
    // Additional direct navigation handlers for header links
    document.querySelectorAll('.nav-link').forEach(link => {
      link.addEventListener('click', (e) => {
        const navText = link.textContent.trim().toLowerCase();
        // Map the text to route names
        const routeMap = {
          'home': 'home',
          'collections': 'products',
          'blog': 'blog',
          
        };
        
        if (routeMap[navText]) {
          e.preventDefault();
          this.navigate(routeMap[navText]);
        }
      });
    });
  },
  
  navigate: function(page, params = {}) {
    // Validate the page exists
    if (!this.routes[page]) {
      console.error('Page not found:', page);
      page = 'not-found';
    }
    
    // Store params
    this.params = params;
    
    // Get the template for the page
    const template = this.routes[page];
    
    // Update content
    if (template && this.contentContainer) {
      // Apply page transition
      this.contentContainer.classList.remove('active');
      
      setTimeout(() => {
        // Apply page content
        this.contentContainer.innerHTML = template.innerHTML;
        
        // Update navigation state
        this.updateActiveNavLinks(page);
        this.currentRoute = page;
        
        // Show the new content
        this.contentContainer.classList.add('active');
        
        // Scroll to top
        window.scrollTo(0, 0);
        
        // Additional initialization for the new page
        this.initPageScripts(page);
      }, 300);
    }
  },
  
  updateActiveNavLinks: function(page) {
    // Clear active class from all nav links
    document.querySelectorAll('.nav-link').forEach(link => {
      link.classList.remove('active');
    });

    // Add active class to current nav links (both data-nav and text matching)
    // Fixed version
document.querySelectorAll('.nav-link[data-nav="' + page + '"]').forEach(link => {
      link.classList.add('active');
    });

    // Also check by text content for header links
    document.querySelectorAll('.nav-link').forEach(link => {
      const navText = link.textContent.trim().toLowerCase();
      if (navText === page.toLowerCase()) {
        link.classList.add('active');
      }
    });
  },
  
  initPageScripts: function(page) {
    // Initialize any components on the page
    console.log('Initializing page:', page);
    
    // Add specific initialization based on page
    if (page === 'product-detail') {
      this.initProductDetailPage();
    } else if (page === 'cart') {
      this.initCartPage();
    }
    
    // Re-attach event listeners for dynamic elements
    this.setupDynamicEventListeners();
  },
  
  initProductDetailPage: function() {
    // Initialize product thumbnails
    const thumbnails = document.querySelectorAll('.thumbnail');
    const mainImage = document.querySelector('.main-image img');
    
    thumbnails.forEach(thumb => {
      thumb.addEventListener('click', () => {
        // Remove active class from all thumbnails
        thumbnails.forEach(t => t.classList.remove('active'));
        // Add active class to clicked thumbnail
        thumb.classList.add('active');
        // Update main image (in a real app, this would use the actual image src)
        if (mainImage) {
          mainImage.src = thumb.querySelector('img').src.replace('80&width=80', '600&width=500');
        }
      });
    });
    
    // Initialize product tabs
    const tabButtons = document.querySelectorAll('.tab-btn');
    const tabPanes = document.querySelectorAll('.tab-pane');
    
    tabButtons.forEach((button, index) => {
      button.addEventListener('click', () => {
        // Remove active class from all buttons and panes
        tabButtons.forEach(btn => btn.classList.remove('active'));
        tabPanes.forEach(pane => pane.classList.remove('active'));
        
        // Add active class to clicked button and corresponding pane
        button.classList.add('active');
        if (tabPanes[index]) {
          tabPanes[index].classList.add('active');
        }
      });
    });
    
    // Initialize quantity controls
    this.initQuantityControls();
    
    // Initialize color and size options
    const colorOptions = document.querySelectorAll('.color-option');
    colorOptions.forEach(option => {
      option.addEventListener('click', () => {
        colorOptions.forEach(opt => opt.classList.remove('active'));
        option.classList.add('active');
      });
    });
    
    const sizeOptions = document.querySelectorAll('.size-option');
    sizeOptions.forEach(option => {
      option.addEventListener('click', () => {
        sizeOptions.forEach(opt => opt.classList.remove('active'));
        option.classList.add('active');
      });
    });
    
    // Initialize add to cart button
    const addToCartButton = document.querySelector('.add-to-cart');
    if (addToCartButton) {
      addToCartButton.addEventListener('click', () => {
        // In a real app, this would add the product to the cart
        // For this demo, we'll just update the cart count and navigate to the cart page
        this.updateCartCount(2); // Increment by 1
        this.navigate('cart');
      });
    }
  },
  
  initCartPage: function() {
    // Initialize quantity controls
    this.initQuantityControls();
    
    // Initialize remove buttons
    const removeButtons = document.querySelectorAll('.cart-remove');
    removeButtons.forEach(button => {
      button.addEventListener('click', (e) => {
        // In a real app, this would remove the item from the cart
        // For this demo, we'll just remove the row from the table
        const row = e.target.closest('tr');
        if (row) {
          row.remove();
          
          // Check if cart is empty
          const rows = document.querySelectorAll('.cart-table tbody tr');
          if (rows.length === 0) {
            this.navigate('empty-cart');
          } else {
            // Update cart count
            this.updateCartCount(rows.length);
          }
        }
      });
    });
    
    // Initialize clear cart button
    const clearCartButton = document.querySelector('.cart-actions .cta-button.secondary:last-child');
    if (clearCartButton) {
      clearCartButton.addEventListener('click', () => {
        this.updateCartCount(0);
        this.navigate('empty-cart');
      });
    }
  },
  
  initQuantityControls: function() {
    const quantityControls = document.querySelectorAll('.quantity-controls');
    
    quantityControls.forEach(control => {
      const minusButton = control.querySelector('.quantity-btn:first-child');
      const plusButton = control.querySelector('.quantity-btn:last-child');
      const input = control.querySelector('.quantity-input');
      
      if (minusButton && plusButton && input) {
        minusButton.addEventListener('click', () => {
          let value = parseInt(input.value);
          if (value > 1) {
            input.value = value - 1;
          }
        });
        
        plusButton.addEventListener('click', () => {
          let value = parseInt(input.value);
          input.value = value + 1;
        });
        
        input.addEventListener('change', () => {
          let value = parseInt(input.value);
          if (isNaN(value) || value < 1) {
            input.value = 1;
          }
        });
      }
    });
  },
  
  setupDynamicEventListeners: function() {
    // Re-attach event listeners for elements that might be added dynamically
    
    // Product cards
    document.querySelectorAll('.product-card').forEach(card => {
      const viewButton = card.querySelector('.cta-button');
      if (viewButton) {
        viewButton.addEventListener('click', () => {
          // Extract product ID from the button's data attribute or other source
          // For this demo, we'll just navigate to a generic product detail page
          this.navigate('product-detail', { id: 1 });
        });
      }
    });
  },
  
  updateCartCount: function(count) {
    // Update the cart count badge
    const cartCount = document.getElementById('cart-count');
    if (cartCount) {
      if (count !== undefined) {
        cartCount.textContent = count;
        // Store in localStorage for persistence
        localStorage.setItem('cartCount', count);
      } else {
        // Retrieve from localStorage if available
        const storedCount = localStorage.getItem('cartCount');
        cartCount.textContent = storedCount || '0';
      }
    }
  }
};

// Initialize the router immediately
document.addEventListener('DOMContentLoaded', function() {
  // Initialize the router
  window.novaRouter.init();
});

// Also attempt immediate initialization for edit scenarios
// Use setTimeout to ensure DOM is accessible
setTimeout(function() {
  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', function() {
      window.novaRouter.init();
    });
  } else {
    window.novaRouter.init();
  }
}, 100);
</script>
  `
  )
}

  
}

export function getNovaTemplateNovaTemplate(config: any): string {
  const template = new NovaTemplate(config)

  // Get CSS and HTML from the template instance
  const css = template.generateCSS()
  const html = template.getHTML()

  // Combine CSS and HTML into a single document
  return `
    <style>
      ${css}
    </style>
    ${html}
  `
}
