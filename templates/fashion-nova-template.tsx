// Function to generate the Fashion Nova template HTML
export function getFashionNovaTemplate(config) {
  const { styles = {}, content = {} } = config;

  // Helper function to safely get nested content
  const getContent = (path, defaultValue = "") => {
    const keys = path.split('.');
    let current = content;
    
    for (const key of keys) {
      if (current === undefined || current === null) return defaultValue;
      current = current[key];
    }
    
    return current || defaultValue;
  };

  // Get navigation items
  const navigationItems = Array.isArray(content?.navigation) 
    ? content.navigation 
    : [
        { label: 'Home', link: '/' },
        { label: 'Shop', link: '/shop' },
        { label: 'About', link: '/about' },
        { label: 'Contact', link: '/contact' }
      ];
  
  // Get categories
  const categories = Array.isArray(content?.categories) 
    ? content.categories 
    : [
        { name: 'Women', imageUrl: '/api/placeholder/300/300', link: '/women' },
        { name: 'Men', imageUrl: '/api/placeholder/300/300', link: '/men' },
        { name: 'Accessories', imageUrl: '/api/placeholder/300/300', link: '/accessories' },
        { name: 'Sale', imageUrl: '/api/placeholder/300/300', link: '/sale' }
      ];
  
  // Get footer links
  const footerLinks = Array.isArray(content?.footer?.links) 
    ? content.footer.links 
    : [
        { label: 'Terms & Conditions', url: '/terms' },
        { label: 'Privacy Policy', url: '/privacy' },
        { label: 'Shipping Info', url: '/shipping' },
        { label: 'Returns & Exchanges', url: '/returns' }
      ];
  
  // Build header navigation HTML
  const navigationHtml = navigationItems.map(item => `
    <li>
      <a href="${item.link || '#'}" class="nav-link">
        ${item.label || 'Menu Item'}
      </a>
    </li>
  `).join('');
  
  // Build mobile menu HTML
  const mobileMenuHtml = navigationItems.map(item => `
    <li class="mobile-menu-item">
      <a href="${item.link || '#'}" class="nav-link">
        ${item.label || 'Menu Item'}
      </a>
    </li>
  `).join('');
  
  // Build featured products HTML
  const featuredProductsHtml = Array.isArray(content?.featuredProducts) && content.featuredProducts.length > 0 
    ? content.featuredProducts.map(product => `
      <div class="product-card">
        <div class="product-image">
          <img 
            src="${product.imageUrl || '/api/placeholder/300/400'}" 
            alt="${product.name || 'Product'}" 
            class="product-img"
          />
        </div>
        <h3 class="product-title">${product.name || 'Product Name'}</h3>
        <p class="product-price">${product.price || '$0.00'}</p>
        <button class="add-to-cart-button">Add to Cart</button>
      </div>
    `).join('')
    : '';
  
  // Build categories HTML
  const categoriesHtml = categories.map(category => `
    <div class="category-card">
      <img 
        src="${category.imageUrl || '/api/placeholder/300/300'}" 
        alt="${category.name || 'Category'}" 
        class="category-image"
      />
      <h3 class="category-title">${category.name || 'Category Name'}</h3>
      <a href="${category.link || '#'}" class="category-link">Shop Now</a>
    </div>
  `).join('');
  
  // Build footer links HTML
  const footerLinksHtml = footerLinks.map(link => `
    <li class="footer-list-item">
      <a href="${link.url || '#'}" class="footer-link">
        ${link.label || 'Link'}
      </a>
    </li>
  `).join('');
  
  // Hero section background
  const heroBackground = content?.hero?.backgroundImage 
    ? `background-image: linear-gradient(rgba(0,0,0,0.3), rgba(0,0,0,0.3)), url(${content.hero.backgroundImage});`
    : '';
  
  // Hero text color
  const heroTextColor = content?.hero?.backgroundImage ? 'hero-light-text' : '';
  
  // Generate the HTML
  return `
    <!-- Fashion Nova Template -->
    <div class="fashion-nova-template">
      <!-- Header -->
      <header class="site-header">
        <div class="container header-container">
          <div class="logo">
            <a href="/">
              <img 
                src="${getContent('logo.url', '/api/placeholder/200/50')}" 
                alt="${getContent('logo.alt', 'Store Logo')}" 
                class="logo-img"
              />
            </a>
          </div>
          
          <nav class="desktop-nav">
            <ul>
              ${navigationHtml}
            </ul>
          </nav>
          
          <div class="mobile-menu-toggle" id="mobileMenuToggle">
            <span></span>
            <span></span>
            <span></span>
          </div>
        </div>
        
        <!-- Mobile Menu -->
        <nav class="mobile-menu" id="mobileMenu">
          <ul>
            ${mobileMenuHtml}
          </ul>
        </nav>
      </header>

      <main>
        <!-- Hero Section -->
        <section class="hero-section ${heroTextColor}" style="${heroBackground}">
          <div class="container">
            <h1 class="hero-title">
              ${getContent('hero.title', 'Welcome to our Store')}
            </h1>
            <p class="hero-subtitle">
              ${getContent('hero.subtitle', 'Shop the latest fashion trends')}
            </p>
            ${getContent('hero.ctaText') 
              ? `<a href="${getContent('hero.ctaLink', '#')}" class="cta-button">
                   ${getContent('hero.ctaText', 'Shop Now')}
                 </a>`
              : ''
            }
          </div>
        </section>

        <!-- Featured Products Section -->
        ${featuredProductsHtml 
          ? `<section class="featured-products">
               <h2 class="section-title">
                 ${getContent('featuredProductsTitle', 'Featured Products')}
               </h2>
               <div class="container">
                 <div class="products-grid">
                   ${featuredProductsHtml}
                 </div>
               </div>
             </section>`
          : ''
        }

        <!-- Categories Section -->
        <section class="categories-section">
          <h2 class="section-title">
            ${getContent('categoriesTitle', 'Shop by Category')}
          </h2>
          <div class="container">
            <div class="categories-grid">
              ${categoriesHtml}
            </div>
          </div>
        </section>

        <!-- Custom HTML Section -->
        ${getContent('customHtml') 
          ? `<div class="custom-html-section container">
               ${getContent('customHtml')}
             </div>`
          : ''
        }
      </main>

      <!-- Footer -->
      <footer class="site-footer">
        <div class="container">
          <div class="footer-columns">
            <div class="footer-column">
              <h3 class="footer-column-title">
                ${getContent('footer.aboutTitle', 'About Us')}
              </h3>
              <p>
                ${getContent('footer.aboutText', 'We are a fashion retailer dedicated to bringing you the latest styles at affordable prices.')}
              </p>
            </div>
            
            <div class="footer-column">
              <h3 class="footer-column-title">
                ${getContent('footer.linksTitle', 'Quick Links')}
              </h3>
              <ul class="footer-list">
                ${footerLinksHtml}
              </ul>
            </div>
            
            <div class="footer-column">
              <h3 class="footer-column-title">
                ${getContent('footer.contactTitle', 'Contact Us')}
              </h3>
              <address>
                ${getContent('footer.address', '123 Fashion Street, Style City, SC 12345')}<br />
                Email: <a href="mailto:${getContent('footer.email', 'info@example.com')}" class="footer-link">
                  ${getContent('footer.email', 'info@example.com')}
                </a><br />
                Phone: ${getContent('footer.phone', '(123) 456-7890')}
              </address>
            </div>
          </div>
          
          <div class="copyright">
            &copy; ${new Date().getFullYear()} ${getContent('storeName', 'Fashion Store')}. All rights reserved.
          </div>
        </div>
      </footer>
      
      <script>
        // Simple client-side functionality
        document.addEventListener('DOMContentLoaded', function() {
          // Mobile menu toggle
          const menuToggle = document.getElementById('mobileMenuToggle');
          const mobileMenu = document.getElementById('mobileMenu');
          
          if (menuToggle && mobileMenu) {
            menuToggle.addEventListener('click', function() {
              mobileMenu.classList.toggle('open');
            });
          }
        });
      </script>
    </div>
  `;
}



// // src/templates/fashion-nova-template.ts
// import { BaseTemplate } from "./base-templates";

// export class FashionNovaTemplate extends BaseTemplate {
//   templateSpecificCSS(): string {
//     return `
//       /* Fashion Nova Specific Styles */
//       .fashion-nova-template {
//         font-family: var(--font-family);
//         color: var(--text-color);
//         background-color: var(--background-color);
//         line-height: 1.6;
//         min-height: 100vh;
//         display: flex;
//         flex-direction: column;
//       }

//       .fn-container {
//         width: 100%;
//         max-width: 1200px;
//         margin: 0 auto;
//         padding: 0 20px;
//       }

//       /* Header Styles */
//       .fn-header {
//         background-color: var(--header-background);
//         color: var(--header-text-color);
//         padding: 15px 0;
//         box-shadow: 0 2px 5px rgba(0,0,0,0.1);
//         position: sticky;
//         top: 0;
//         z-index: 1000;
//       }

//       .fn-header-content {
//         display: flex;
//         justify-content: space-between;
//         align-items: center;
//       }

//       .fn-logo img {
//         max-height: 50px;
//       }

//       .fn-desktop-nav {
//         display: flex;
//         gap: 25px;
//       }

//       .fn-nav-link {
//         color: var(--header-text-color);
//         font-weight: 500;
//         transition: opacity 0.3s;
//       }

//       .fn-nav-link:hover {
//         opacity: 0.8;
//       }

//       .fn-mobile-menu-toggle {
//         display: none;
//         flex-direction: column;
//         gap: 5px;
//         cursor: pointer;
//       }

//       .fn-mobile-menu-toggle span {
//         width: 25px;
//         height: 2px;
//         background-color: var(--header-text-color);
//       }

//       .fn-mobile-menu {
//         display: none;
//         position: fixed;
//         top: 80px;
//         left: 0;
//         right: 0;
//         background-color: var(--header-background);
//         padding: 20px;
//         box-shadow: 0 5px 10px rgba(0,0,0,0.1);
//         z-index: 999;
//       }

//       .fn-mobile-menu.active {
//         display: block;
//       }

//       .fn-mobile-menu ul {
//         list-style: none;
//         padding: 0;
//       }

//       .fn-mobile-menu li {
//         margin-bottom: 15px;
//       }

//       /* Hero Section */
//       .fn-hero {
//         padding: 100px 0;
//         text-align: center;
//         background-size: cover;
//         background-position: center;
//         margin-bottom: 50px;
//       }

//       .fn-hero-title {
//         font-size: 3rem;
//         margin-bottom: 20px;
//         color: var(--primary-color);
//       }

//       .fn-hero-subtitle {
//         font-size: 1.2rem;
//         margin-bottom: 30px;
//         max-width: 600px;
//         margin-left: auto;
//         margin-right: auto;
//         color: var(--text-color);
//       }

//       .fn-cta-button {
//         display: inline-block;
//         background-color: var(--button-color);
//         color: var(--button-text-color);
//         padding: 12px 30px;
//         border-radius: 4px;
//         transition: opacity 0.3s;
//         font-size: 1.1rem;
//       }

//       .fn-cta-button:hover {
//         opacity: 0.9;
//       }

//       /* Products Section */
//       .fn-products-section {
//         padding: 60px 0;
//       }

//       .fn-section-title {
//         text-align: center;
//         margin-bottom: 40px;
//         font-size: 2rem;
//         color: var(--primary-color);
//       }

//       .fn-products-grid {
//         display: grid;
//         grid-template-columns: repeat(auto-fill, minmax(250px, 1fr));
//         gap: 30px;
//       }

//       .fn-product-card {
//         border: 1px solid #eee;
//         border-radius: 8px;
//         overflow: hidden;
//         transition: transform 0.3s, box-shadow 0.3s;
//       }

//       .fn-product-card:hover {
//         transform: translateY(-5px);
//         box-shadow: 0 10px 20px rgba(0,0,0,0.1);
//       }

//       .fn-product-image {
//         height: 300px;
//         position: relative;
//         overflow: hidden;
//       }

//       .fn-product-image img {
//         width: 100%;
//         height: 100%;
//         object-fit: cover;
//         transition: transform 0.5s;
//       }

//       .fn-product-card:hover .fn-product-image img {
//         transform: scale(1.05);
//       }

//       .fn-product-discount {
//         position: absolute;
//         top: 10px;
//         right: 10px;
//         padding: 3px 8px;
//         border-radius: 4px;
//         font-size: 0.8rem;
//         font-weight: bold;
//         background-color: var(--accent-color);
//         color: white;
//       }

//       .fn-product-details {
//         padding: 15px;
//       }

//       .fn-product-details h3 {
//         font-size: 1.1rem;
//         margin-bottom: 5px;
//       }

//       .fn-product-price {
//         font-weight: bold;
//         color: var(--primary-color);
//         margin-bottom: 10px;
//       }

//       .fn-add-to-cart {
//         width: 100%;
//         padding: 10px;
//         background-color: var(--button-color);
//         color: var(--button-text-color);
//         border: none;
//         border-radius: 4px;
//         cursor: pointer;
//         transition: opacity 0.3s;
//       }

//       .fn-add-to-cart:hover {
//         opacity: 0.9;
//       }

//       /* Categories Section */
//       .fn-categories-section {
//         padding: 60px 0;
//         background-color: var(--secondary-color);
//       }

//       .fn-categories-grid {
//         display: grid;
//         grid-template-columns: repeat(auto-fill, minmax(250px, 1fr));
//         gap: 30px;
//       }

//       .fn-category-card {
//         position: relative;
//         overflow: hidden;
//         border-radius: 8px;
//         aspect-ratio: 1 / 1;
//       }

//       .fn-category-image {
//         width: 100%;
//         height: 100%;
//       }

//       .fn-category-image img {
//         width: 100%;
//         height: 100%;
//         object-fit: cover;
//         transition: transform 0.5s;
//       }

//       .fn-category-card:hover .fn-category-image img {
//         transform: scale(1.05);
//       }

//       .fn-category-details {
//         position: absolute;
//         bottom: 0;
//         left: 0;
//         right: 0;
//         padding: 20px;
//         background: linear-gradient(transparent, rgba(0,0,0,0.7));
//         color: white;
//         text-align: center;
//       }

//       .fn-category-details h3 {
//         margin-bottom: 10px;
//         font-size: 1.3rem;
//       }

//       /* Footer */
//       .fn-footer {
//         background-color: var(--footer-background);
//         color: var(--footer-text-color);
//         padding: 60px 0 20px;
//         margin-top: auto;
//       }

//       .fn-footer-content {
//         display: grid;
//         grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
//         gap: 40px;
//         margin-bottom: 40px;
//       }

//       .fn-footer-column h3 {
//         font-size: 1.2rem;
//         margin-bottom: 20px;
//       }

//       .fn-footer-links {
//         list-style: none;
//         padding: 0;
//         margin: 0;
//       }

//       .fn-footer-links li {
//         margin-bottom: 10px;
//       }

//       .fn-footer-link {
//         color: var(--footer-text-color);
//         opacity: 0.8;
//         transition: opacity 0.3s;
//       }

//       .fn-footer-link:hover {
//         opacity: 1;
//       }

//       .fn-copyright {
//         text-align: center;
//         padding-top: 20px;
//         border-top: 1px solid rgba(255,255,255,0.1);
//         font-size: 0.9rem;
//         opacity: 0.7;
//       }

//       /* Mobile Styles */
//       @media (max-width: 768px) {
//         .fn-desktop-nav {
//           display: none;
//         }

//         .fn-mobile-menu-toggle {
//           display: flex;
//         }

//         .fn-hero {
//           padding: 60px 0;
//         }

//         .fn-hero-title {
//           font-size: 2rem;
//         }

//         .fn-products-grid {
//           grid-template-columns: repeat(2, 1fr);
//         }

//         .fn-footer-content {
//           grid-template-columns: 1fr;
//         }
//       }
//     `;
//   }

//   getHTML(): string {
//     return `
//       <div class="fashion-nova-template">
//         ${this.generateHeader()}
//         <main>
//           ${this.generateHeroSection()}
//           ${this.generateProductsSection()}
//           ${this.generateCategoriesSection()}
//           ${this.generateCustomHtmlSection()}
//         </main>
//         ${this.generateFooter()}
//         ${this.generateMobileMenu()}
//         ${this.generateScripts()}
//       </div>
//     `;
//   }

//   generateHeader(): string {
//     const navigationItems = this.getNavigationItems();
//     return `
//       <header class="fn-header">
//         <div class="fn-container">
//           <div class="fn-header-content">
//             <a href="/" class="fn-logo">
//               <img src="${this.getContent('logo.url', '/api/placeholder/200/50')}" 
//                    alt="${this.getContent('logo.alt', 'Store logo')}">
//             </a>
            
//             <nav class="fn-desktop-nav">
//               ${navigationItems.map(item => `
//                 <a href="${item.link}" class="fn-nav-link">${item.label}</a>
//               `).join('')}
//             </nav>
            
//             <div class="fn-mobile-menu-toggle" id="mobileMenuToggle">
//               <span></span>
//               <span></span>
//               <span></span>
//             </div>
//           </div>
//         </div>
//       </header>
//     `;
//   }

//   getNavigationItems(): Array<{label: string; link: string}> {
//     return Array.isArray(this.config.content?.navigation) 
//       ? this.config.content.navigation
//       : [
//           { label: 'Home', link: '/' },
//           { label: 'Shop', link: '/shop' },
//           { label: 'About', link: '/about' },
//           { label: 'Contact', link: '/contact' }
//         ];
//   }

//   generateHeroSection(): string {
//     const heroContent = this.getContent('hero', 
//      " background-image: linear-gradient(rgba(0,0,0,0.3), rgba(0,0,0,0.3)), url(${content.hero.backgroundImage})"
//     );
//     return `
//       <section class="fn-hero" style="${this.getHeroBackgroundStyle()}">
//         <div class="fn-container">
//           <h1 class="fn-hero-title">${heroContent.title || 'New Collection'}</h1>
//           <p class="fn-hero-subtitle">${
//             heroContent.subtitle || 'Discover our latest styles'
//           }</p>
//           ${heroContent.ctaText ? `
//             <a href="${heroContent.ctaLink || '#'}" class="fn-cta-button">
//               ${heroContent.ctaText}
//             </a>
//           ` : ''}
//         </div>
//       </section>
//     `;
//   }

//   getHeroBackgroundStyle(): string {
//     const bgImage = this.getContent('hero.backgroundImage');
//     return bgImage 
//       ? `background-image: linear-gradient(rgba(0,0,0,0.3), rgba(0,0,0,0.3)), url('${bgImage}')`
//       : `background-color: var(--secondary-color)`;
//   }

//   generateProductsSection(): string {
//     const products = this.getContent('featuredProducts', []);
//     if (!products.length) return '';
    
//     return `
//       <section class="fn-products-section">
//         <div class="fn-container">
//           <h2 class="fn-section-title">${
//             this.getContent('featuredProductsTitle', 'Featured Products')
//           }</h2>
//           <div class="fn-products-grid">
//             ${products.map(product => this.generateProductCard(product)).join('')}
//           </div>
//         </div>
//       </section>
//     `;
//   }

//   generateProductCard(product: any): string {
//     return `
//       <div class="fn-product-card">
//         <div class="fn-product-image">
//           <img src="${product.imageUrl || '/api/placeholder/300/400'}" 
//                alt="${product.name || 'Product'}">
//           ${product.discount ? `
//             <span class="fn-product-discount">
//               ${product.discount}
//             </span>
//           ` : ''}
//         </div>
//         <div class="fn-product-details">
//           <h3>${product.name || 'Product Name'}</h3>
//           <p class="fn-product-price">${product.price || '$0.00'}</p>
//           <button class="fn-add-to-cart">Add to Cart</button>
//         </div>
//       </div>
//     `;
//   }

//   generateCategoriesSection(): string {
//     const categories = this.getContent('categories', 
//       [
//         { name: 'Women', imageUrl: '/api/placeholder/300/300', link: '/women' },
//         { name: 'Men', imageUrl: '/api/placeholder/300/300', link: '/men' },
//         { name: 'Accessories', imageUrl: '/api/placeholder/300/300', link: '/accessories' },
//         { name: 'Sale', imageUrl: '/api/placeholder/300/300', link: '/sale' }
//       ]
//     );
//     if (!categories.length) return '';
    
//     return `
//       <section class="fn-categories-section">
//         <div class="fn-container">
//           <h2 class="fn-section-title">${
//             this.getContent('categoriesTitle', 'Shop by Category')
//           }</h2>
//           <div class="fn-categories-grid">
//             ${categories.map(category => this.generateCategoryCard(category)).join('')}
//           </div>
//         </div>
//       </section>
//     `;
//   }

//   generateCategoryCard(category: any): string {
//     return `
//       <div class="fn-category-card">
//         <div class="fn-category-image">
//           <img src="${category.imageUrl || '/api/placeholder/300/300'}" 
//                alt="${category.name || 'Category'}">
//         </div>
//         <div class="fn-category-details">
//           <h3>${category.name || 'Category'}</h3>
//           <a href="${category.link || '#'}" class="fn-cta-button">Shop Now</a>
//         </div>
//       </div>
//     `;
//   }

//   generateCustomHtmlSection(): string {
//     const customHtml = this.getContent('customHtml');
//     return customHtml 
//       ? `<div class="fn-custom-html-section fn-container">${customHtml}</div>`
//       : '';
//   }

//   generateFooter(): string {
//     return `
//       <footer class="fn-footer">
//         <div class="fn-container">
//           <div class="fn-footer-content">
//             <div class="fn-footer-column">
//               <h3>${this.getContent('footer.aboutTitle', 'About Us')}</h3>
//               <p>${this.getContent('footer.aboutText', 'Your fashion destination for the latest styles.')}</p>
//             </div>
            
//             <div class="fn-footer-column">
//               <h3>${this.getContent('footer.linksTitle', 'Quick Links')}</h3>
//               <ul class="fn-footer-links">
//                 ${this.generateFooterLinks()}
//               </ul>
//             </div>
            
//             <div class="fn-footer-column">
//               <h3>${this.getContent('footer.contactTitle', 'Contact Us')}</h3>
//               <address>
//                 ${this.getContent('footer.address', '123 Fashion St, Style City')}<br>
//                 Email: <a href="mailto:${this.getContent('footer.email', 'info@example.com')}" 
//                          class="fn-footer-link">
//                   ${this.getContent('footer.email', 'info@example.com')}
//                 </a><br>
//                 Phone: ${this.getContent('footer.phone', '+1 (123) 456-7890')}
//               </address>
//             </div>
//           </div>
          
//           <div class="fn-copyright">
//             &copy; ${new Date().getFullYear()} ${
//               this.getContent('storeName', 'Fashion Store')
//             }. All rights reserved.
//           </div>
//         </div>
//       </footer>
//     `;
//   }

//   generateFooterLinks(): string {
//     const links = this.getContent('footer.links', [
//       { label: 'Terms & Conditions', url: '/terms' },
//       { label: 'Privacy Policy', url: '/privacy' },
//       { label: 'Shipping Info', url: '/shipping' },
//       { label: 'Returns & Exchanges', url: '/returns' }
//     ]);
    
//     return links.map(link => `
//       <li><a href="${link.url}" class="fn-footer-link">${link.label}</a></li>
//     `).join('');
//   }

//   generateMobileMenu(): string {
//     const navigationItems = this.getNavigationItems();
//     return `
//       <div class="fn-mobile-menu" id="mobileMenu">
//         <nav>
//           <ul>
//             ${navigationItems.map(item => `
//               <li><a href="${item.link}" class="fn-nav-link">${item.label}</a></li>
//             `).join('')}
//           </ul>
//         </nav>
//       </div>
//     `;
//   }

//   generateScripts(): string {
//     return `
//       <script>
//         document.addEventListener('DOMContentLoaded', function() {
//           // Mobile menu toggle
//           const mobileMenuToggle = document.getElementById('mobileMenuToggle');
//           const mobileMenu = document.getElementById('mobileMenu');
          
//           if (mobileMenuToggle && mobileMenu) {
//             mobileMenuToggle.addEventListener('click', function() {
//               mobileMenu.classList.toggle('active');
//             });
//           }

//           // Add to cart functionality
//           document.querySelectorAll('.fn-add-to-cart').forEach(button => {
//             button.addEventListener('click', function() {
//               const productCard = this.closest('.fn-product-card');
//               const productName = productCard.querySelector('h3').textContent;
//               const productPrice = productCard.querySelector('.fn-product-price').textContent;
              
//               console.log('Added to cart:', productName, productPrice);
//               // Implement actual cart logic here
//             });
//           });
//         });
//       </script>
//     `;
//   }
// }

// // Function implementation to match your original getFashionNovaTemplate
// export function getFashionNovaTemplate(config: any): string {
//   const template = new FashionNovaTemplate(config);
  
//   // Get CSS and HTML from the template instance
//   const css = template.generateCSS();
//   const html = template.getHTML();
  
//   // Combine CSS and HTML into a single document
//   return `
//     <style>
//       ${css}
//     </style>
//     ${html}
//   `;
// }