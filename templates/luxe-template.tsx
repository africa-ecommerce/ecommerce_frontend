// // luxe-template.ts
// import { BaseTemplate } from "./base-templates";

// export class LUXETemplate extends BaseTemplate {
//   templateSpecificCSS(): string {
//     return `
//       /* LUXE Custom Styles */
//       :root {
//         --primary-color: #C91A42;
//         --secondary-color: #f8f9fa;
//         --accent-color: #C91A42;
//         --text-color: #2d2d2d;
//         --header-bg: #000000;
//         --header-text: #ffffff;
//         --footer-bg: #000000;
//         --footer-text: #ffffff;
//         --font-heading: 'Playfair Display', serif;
//         --font-body: 'Lato', sans-serif;
//       }

//       .luxe-template {
//         font-family: var(--font-body);
//         color: var(--text-color);
//         line-height: 1.6;
//       }

//       h1, h2, h3, h4, h5, h6 {
//         font-family: var(--font-heading);
//         font-weight: 600;
//         letter-spacing: 0.5px;
//       }

//       /* Header Styles */
//       .luxe-header {
//         background: var(--header-bg);
//         padding: 1rem 0;
//         position: sticky;
//         top: 0;
//         z-index: 1000;
//         box-shadow: 0 2px 10px rgba(0,0,0,0.1);
//       }

//       .luxe-nav {
//         display: flex;
//         justify-content: space-between;
//         align-items: center;
//         max-width: 1200px;
//         margin: 0 auto;
//         padding: 0 2rem;
//       }

//       .luxe-logo {
//         font-family: var(--font-heading);
//         font-size: 2rem;
//         color: var(--header-text);
//         text-decoration: none;
//         letter-spacing: 2px;
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
//         transition: opacity 0.3s;
//       }

//       /* Hero Section */
//       .hero-section {
//         position: relative;
//         height: 80vh;
//         background: linear-gradient(rgba(0,0,0,0.4), rgba(0,0,0,0.4)),
//           url('/images/hero-bg.jpg') center/cover;
//         display: flex;
//         align-items: center;
//         justify-content: center;
//         text-align: center;
//         color: white;
//         padding: 2rem;
//       }

//       .hero-content {
//         max-width: 800px;
//       }

//       .hero-title {
//         font-size: 4rem;
//         margin-bottom: 1.5rem;
//         text-shadow: 0 2px 4px rgba(0,0,0,0.3);
//       }

//       .hero-subtitle {
//         font-size: 1.25rem;
//         margin-bottom: 2rem;
//         opacity: 0.9;
//       }

//       /* Category Grid */
//       .category-grid {
//         display: grid;
//         grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
//         gap: 2rem;
//         padding: 4rem 2rem;
//       }

//       .category-card {
//         position: relative;
//         overflow: hidden;
//         border-radius: 8px;
//         aspect-ratio: 1;
//         transition: transform 0.3s;
//       }

//       .category-card:hover {
//         transform: translateY(-5px);
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

//       /* Product Grid */
//       .product-grid {
//         display: grid;
//         grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
//         gap: 2rem;
//         padding: 4rem 2rem;
//       }

//       .product-card {
//         border: 1px solid #eee;
//         border-radius: 8px;
//         overflow: hidden;
//         transition: transform 0.3s;
//       }

//       .product-card:hover {
//         transform: translateY(-5px);
//       }

//       .product-image {
//         height: 350px;
//         background: #f8f9fa;
//         position: relative;
//       }

//       .product-tag {
//         position: absolute;
//         top: 1rem;
//         right: 1rem;
//         background: var(--primary-color);
//         color: white;
//         padding: 0.25rem 0.75rem;
//         border-radius: 4px;
//         font-size: 0.8rem;
//       }

//       .product-details {
//         padding: 1.5rem;
//         text-align: center;
//       }

//       /* About Page Styles */
//       .about-hero {
//         background: #f8f9fa;
//         padding: 6rem 2rem;
//         text-align: center;
//       }

//       .values-grid {
//         display: grid;
//         grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
//         gap: 2rem;
//         padding: 4rem 2rem;
//       }

//       .value-card {
//         text-align: center;
//         padding: 2rem;
//         border: 1px solid #eee;
//         border-radius: 8px;
//       }

//       .team-grid {
//         display: grid;
//         grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
//         gap: 2rem;
//         padding: 4rem 2rem;
//       }

//       .team-card {
//         text-align: center;
//       }

//       .team-image {
//         width: 200px;
//         height: 200px;
//         border-radius: 50%;
//         margin: 0 auto 1rem;
//         object-fit: cover;
//       }

//       /* Contact Page Styles */
//       .contact-section {
//         display: grid;
//         grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
//         gap: 4rem;
//         padding: 4rem 2rem;
//       }

//       .contact-info {
//         background: #f8f9fa;
//         padding: 2rem;
//         border-radius: 8px;
//       }

//       .contact-form {
//         display: grid;
//         gap: 1.5rem;
//       }

//       .form-group {
//         display: grid;
//         gap: 0.5rem;
//       }

//       input, textarea {
//         width: 100%;
//         padding: 0.8rem;
//         border: 1px solid #ddd;
//         border-radius: 4px;
//         font-family: inherit;
//       }

//       .faq-section {
//         padding: 4rem 2rem;
//         background: #f8f9fa;
//       }

//       .faq-grid {
//         max-width: 800px;
//         margin: 0 auto;
//         display: grid;
//         gap: 1rem;
//       }

//       .faq-item {
//         border-bottom: 1px solid #eee;
//         padding: 1rem 0;
//       }

//       /* Footer Styles */
//       .luxe-footer {
//         background: var(--footer-bg);
//         color: var(--footer-text);
//         padding: 4rem 2rem;
//         margin-top: auto;
//       }

//       .footer-grid {
//         display: grid;
//         grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
//         gap: 2rem;
//         max-width: 1200px;
//         margin: 0 auto;
//       }

//       .footer-section h4 {
//         margin-bottom: 1.5rem;
//         font-family: var(--font-heading);
//       }

//       .footer-links {
//         list-style: none;
//         padding: 0;
//         display: grid;
//         gap: 0.75rem;
//       }

//       .footer-links a {
//         color: var(--footer-text);
//         opacity: 0.8;
//         text-decoration: none;
//         transition: opacity 0.3s;
//       }

//       .newsletter-form {
//         display: grid;
//         gap: 1rem;
//       }

//       @media (max-width: 768px) {
//         .hero-title {
//           font-size: 2.5rem;
//         }

//         .main-nav {
//           display: none;
//         }

//         .mobile-menu-toggle {
//           display: block;
//         }

//         .category-grid,
//         .product-grid,
//         .values-grid,
//         .team-grid {
//           grid-template-columns: 1fr;
//         }
//       }
//     `;
//   }

//   getHTML(): string {
//     return `
//       <div class="luxe-template">
//         ${this.generateHeader()}
//         <main>
//           ${this.generateCurrentPage()}
//         </main>
//         ${this.generateFooter()}
//       </div>
//       ${this.generateScripts()}
//     `;
//   }

//   private generateHeader(): string {
//     return `
//       <header class="luxe-header">
//         <nav class="luxe-nav">
//           <a href="/" class="luxe-logo">LUXE</a>
//           <div class="main-nav">
//             <a href="/" class="nav-link">Home</a>
//             <a href="/collections" class="nav-link">Collections</a>
//             <a href="/about" class="nav-link">About</a>
//             <a href="/contact" class="nav-link">Contact</a>
//           </div>
//           <div class="nav-icons">
//             <i class="search-icon"></i>
//             <i class="cart-icon"></i>
//           </div>
//         </nav>
//       </header>
//     `;
//   }

//   private generateCurrentPage(): string {
//     switch (this.config.page) {
//       case "about":
//         return this.generateAboutPage();
//       case "contact":
//         return this.generateContactPage();
//       default:
//         return this.generateHomePage();
//     }
//   }

//   private generateHomePage(): string {
//     return `
//       ${this.generateHeroSection()}
//       ${this.generateCategorySection()}
//       ${this.generateFeaturedProducts()}
//       ${this.generateStorySection()}
//       ${this.generateNewsletter()}
//     `;
//   }

//   private generateHeroSection(): string {
//     return `
//       <section class="hero-section">
//         <div class="hero-content">
//           <h1 class="hero-title">Summer Collection 2024</h1>
//           <p class="hero-subtitle">Discover the latest trends and elevate your style with our curated summer pieces</p>
//           <div class="cta-buttons">
//             <a href="/shop" class="cta-button">Shop Now</a>
//             <a href="/lookbook" class="cta-button secondary">View Lookbook</a>
//           </div>
//         </div>
//       </section>
//     `;
//   }
//   // Continuing in next message due to length...
//   private generateCategorySection(): string {
//     return `
//       <section class="category-section">
//         <div class="fn-container">
//           <h2 class="section-title">Shop by Category</h2>
//           <div class="category-grid">
//             ${["Women", "Men", "Accessories"]
//               .map(
//                 (category) => `
//               <div class="category-card">
//                 <img src="/images/${category.toLowerCase()}-category.jpg" alt="${category}">
//                 <div class="category-content">
//                   <h3>${category} Collection</h3>
//                   <a href="/${category.toLowerCase()}" class="cta-button">Explore</a>
//                 </div>
//               </div>
//             `
//               )
//               .join("")}
//           </div>
//         </div>
//       </section>
//     `;
//   }

//   private generateFeaturedProducts(): string {
//     return `
//       <section class="products-section">
//         <div class="fn-container">
//           <h2 class="section-title">Featured Pieces</h2>
//           <div class="product-grid">
//             ${Array(8)
//               .fill("")
//               .map(
//                 (_, i) => `
//               <div class="product-card">
//                 <div class="product-image">
//                   ${i < 2 ? '<span class="product-tag">New</span>' : ""}
//                   <img src="/images/product-${i + 1}.jpg" alt="Product ${
//                   i + 1
//                 }">
//                 </div>
//                 <div class="product-details">
//                   <h3>Summer Dress ${i + 1}</h3>
//                   <p class="price">$${(89.99 - i * 5).toFixed(2)}</p>
//                   <button class="cta-button">Add to Cart</button>
//                 </div>
//               </div>
//             `
//               )
//               .join("")}
//           </div>
//         </div>
//       </section>
//     `;
//   }

//   private generateStorySection(): string {
//     return `
//       <section class="story-section">
//         <div class="fn-container">
//           <div class="story-content">
//             <h2>Crafting Timeless Fashion</h2>
//             <p>${this.getContent(
//               "home.story",
//               "Founded in Paris with a passion for enduring style, LUXE curates pieces that transcend seasons. Our collections blend modern elegance with timeless sophistication."
//             )}</p>
//             <a href="/about" class="cta-button outline">Our Journey</a>
//           </div>
//           <img src="/images/crafting-process.jpg" alt="Crafting Process" class="story-image">
//         </div>
//       </section>
//     `;
//   }

//   private generateNewsletter(): string {
//     return `
//       <section class="newsletter-section">
//         <div class="fn-container">
//           <div class="newsletter-content">
//             <h2>Join Our Community</h2>
//             <p>Get exclusive access to new collections and special offers</p>
//             <form class="newsletter-form">
//               <input type="email" placeholder="Enter your email" required>
//               <button type="submit" class="cta-button">Subscribe</button>
//             </form>
//             <p class="disclaimer">10% off your first order when you subscribe</p>
//           </div>
//         </div>
//       </section>
//     `;
//   }

//   private generateAboutPage(): string {
//     return `
//       <section class="about-hero">
//         <div class="hero-content">
//           <h1 class="hero-title">Our Story</h1>
//         </div>
//       </section>

//       <section class="journey-section">
//         <div class="fn-container">
//           <div class="timeline">
//             <div class="timeline-item">
//               <h3>2010 - Foundation</h3>
//               <p>${this.getContent(
//                 "about.founded",
//                 "Founded in a small Parisian atelier by Emma Laurent"
//               )}</p>
//             </div>
//             <div class="timeline-item">
//               <h3>2015 - Global Expansion</h3>
//               <p>Opened flagship stores in London and New York</p>
//             </div>
//             <div class="timeline-item">
//               <h3>2020 - Sustainability Pledge</h3>
//               <p>Committed to 100% ethical sourcing</p>
//             </div>
//           </div>
//         </div>
//       </section>

//       <section class="values-section">
//         <div class="fn-container">
//           <h2 class="section-title">Our Values</h2>
//           <div class="values-grid">
//             ${["Craftsmanship", "Sustainability", "Inclusivity"]
//               .map(
//                 (value) => `
//               <div class="value-card">
//                 <div class="value-icon">${this.getIcon(value)}</div>
//                 <h3>${value}</h3>
//                 <p>${this.getContent(
//                   `about.values.${value.toLowerCase()}`,
//                   `${value} description`
//                 )}</p>
//               </div>
//             `
//               )
//               .join("")}
//           </div>
//         </div>
//       </section>

//       <section class="team-section">
//         <div class="fn-container">
//           <h2 class="section-title">Meet the Team</h2>
//           <div class="team-grid">
//             ${this.getContent("about.team", [
//               {
//                 name: "Emma Laurent",
//                 role: "Founder & Creative Director",
//                 image: "/images/team1.jpg",
//               },
//               {
//                 name: "Thomas Chen",
//                 role: "Head Designer",
//                 image: "/images/team2.jpg",
//               },
//               {
//                 name: "Sofia Rodriguez",
//                 role: "Sustainability Lead",
//                 image: "/images/team3.jpg",
//               },
//             ])
//               .map(
//                 (member) => `
//               <div class="team-card">
//                 <img src="${member.image}" alt="${member.name}" class="team-image">
//                 <h4>${member.name}</h4>
//                 <p>${member.role}</p>
//               </div>
//             `
//               )
//               .join("")}
//           </div>
//         </div>
//       </section>
//     `;
//   }

//   private generateContactPage(): string {
//     return `
//       <section class="contact-hero">
//         <div class="hero-content">
//           <h1 class="hero-title">Contact Us</h1>
//           <p class="hero-subtitle">We're here to help with any inquiries</p>
//         </div>
//       </section>

//       <section class="contact-main">
//         <div class="fn-container">
//           <div class="contact-grid">
//             <div class="contact-info">
//               <div class="info-card">
//                 <h3><i class="location-icon"></i>Visit Us</h3>
//                 <p>123 Fashion Street<br>Paris, 75001 France</p>
//               </div>
//               <div class="info-card">
//                 <h3><i class="phone-icon"></i>Call Us</h3>
//                 <p>+33 1 23 45 67 89<br>Mon-Fri 8am-7pm CET</p>
//               </div>
//               <div class="info-card">
//                 <h3><i class="email-icon"></i>Email Us</h3>
//                 <p>info@luxefashion.com<br>support@luxefashion.com</p>
//               </div>
//             </div>

//             <form class="contact-form">
//               <div class="form-group">
//                 <input type="text" placeholder="Your Name" required>
//               </div>
//               <div class="form-group">
//                 <input type="email" placeholder="Email Address" required>
//               </div>
//               <div class="form-group">
//                 <input type="text" placeholder="Subject" required>
//               </div>
//               <div class="form-group">
//                 <textarea placeholder="Message" rows="5" required></textarea>
//               </div>
//               <button type="submit" class="cta-button">Send Message</button>
//             </form>
//           </div>

//           <div class="faq-section">
//             <h2>Frequently Asked Questions</h2>
//             <div class="faq-grid">
//               ${this.getContent("faqs", [
//                 {
//                   question: "Shipping options?",
//                   answer:
//                     "Standard (3-5 days), Express (1-2 days), International (7-14 days)",
//                 },
//                 {
//                   question: "Return policy?",
//                   answer:
//                     "30-day returns, items must be unworn with tags attached",
//                 },
//               ])
//                 .map(
//                   (faq) => `
//                 <div class="faq-item">
//                   <h4>${faq.question}</h4>
//                   <p>${faq.answer}</p>
//                 </div>
//               `
//                 )
//                 .join("")}
//             </div>
//           </div>
//         </div>
//       </section>
//     `;
//   }

//   private generateFooter(): string {
//     return `
//       <footer class="luxe-footer">
//         <div class="fn-container">
//           <div class="footer-grid">
//             <div class="footer-col">
//               <h4>LUXE</h4>
//               <p>Elevate your style with timeless fashion pieces</p>
//             </div>
//             <div class="footer-col">
//               <h4>Collections</h4>
//               <ul class="footer-links">
//                 <li><a href="/women">Women</a></li>
//                 <li><a href="/men">Men</a></li>
//                 <li><a href="/accessories">Accessories</a></li>
//               </ul>
//             </div>
//             <div class="footer-col">
//               <h4>Support</h4>
//               <ul class="footer-links">
//                 <li><a href="/contact">Contact Us</a></li>
//                 <li><a href="/faq">FAQ</a></li>
//                 <li><a href="/shipping">Shipping</a></li>
//               </ul>
//             </div>
//             <div class="footer-col">
//               <h4>Newsletter</h4>
//               <form class="footer-newsletter">
//                 <input type="email" placeholder="Email address" required>
//                 <button type="submit">Subscribe</button>
//               </form>
//               <div class="social-links">
//                 <a href="#"><i class="icon-instagram"></i></a>
//                 <a href="#"><i class="icon-facebook"></i></a>
//                 <a href="#"><i class="icon-pinterest"></i></a>
//               </div>
//             </div>
//           </div>
//           <div class="copyright">
//             © ${new Date().getFullYear()} LUXE Fashion. All rights reserved.
//           </div>
//         </div>
//       </footer>
//     `;
//   }

//   private generateScripts(): string {
//     return `
//       <script>
//         document.addEventListener('DOMContentLoaded', function() {
//           // Mobile menu toggle
//           const menuToggle = document.querySelector('.mobile-menu-toggle');
//           const mobileMenu = document.querySelector('.mobile-menu');
          
//           if (menuToggle && mobileMenu) {
//             menuToggle.addEventListener('click', () => {
//               mobileMenu.classList.toggle('active');
//             });
//           }

//           // Add smooth scrolling
//           document.querySelectorAll('a[href^="#"]').forEach(anchor => {
//             anchor.addEventListener('click', function(e) {
//               e.preventDefault();
//               document.querySelector(this.getAttribute('href')).scrollIntoView({
//                 behavior: 'smooth'
//               });
//             });
//           });

//           // Form validation
//           document.querySelectorAll('form').forEach(form => {
//             form.addEventListener('submit', e => {
//               if (!form.checkValidity()) {
//                 e.preventDefault();
//                 form.reportValidity();
//               }
//             });
//           });
//         });
//       </script>
//     `;
//   }

//   private getIcon(value: string): string {
//     const icons = {
//       Craftsmanship: "🎨",
//       Sustainability: "🌱",
//       Inclusivity: "🤝",
//     };
//     return icons[value as keyof typeof icons] || "★";
//   }
// }

// export function getLUXETemplateNovaTemplate(config: any): string {
//   const template = new LUXETemplate(config);

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



// luxe-template.ts

import { BaseTemplate } from "./base-templates"

export class NovaTemplate extends BaseTemplate {
  templateSpecificCSS(): string {
    return `
      /* NOVA Custom Styles */
 .cart-layout {
          display: grid;
          grid-template-columns: 2fr 1fr;
          gap: 2rem;
        }
        
        .cart-items-container {
          display: flex;
          flex-direction: column;
        }
        
        .cart-items-wrapper {
          max-height: 400px;
          overflow-y: auto;
          margin-bottom: 1rem;
          border: 1px solid var(--border-color);
          border-radius: 8px;
          background-color: white;
        }
        
        .cart-table {
          width: 100%;
          border-collapse: collapse;
        }
        
        .cart-table th {
          position: sticky;
          top: 0;
          background-color: white;
          text-align: left;
          padding: 1rem;
          border-bottom: 1px solid var(--border-color);
          z-index: 1;
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
          border-radius: 8px;
          overflow: hidden;
          background-color: #f8f9fa;
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
        
        .quantity-controls {
          display: flex;
          align-items: center;
          border: 1px solid var(--border-color);
          border-radius: 4px;
          width: fit-content;
        }
        
        .quantity-btn {
          width: 32px;
          height: 32px;
          background: none;
          border: none;
          cursor: pointer;
          display: flex;
          align-items: center;
          justify-content: center;
          transition: background-color 0.2s;
        }
        
        .quantity-btn:hover {
          background-color: #f5f5f5;
        }
        
        .quantity-input {
          width: 40px;
          height: 32px;
          border: none;
          text-align: center;
          font-size: 0.9rem;
          -moz-appearance: textfield;
        }
        
        .quantity-input::-webkit-outer-spin-button,
        .quantity-input::-webkit-inner-spin-button {
          -webkit-appearance: none;
          margin: 0;
        }
        
        .cart-item-total {
          font-weight: bold;
        }
        
        .cart-remove {
          background: none;
          border: none;
          color: #777;
          cursor: pointer;
          transition: color 0.3s;
          width: 32px;
          height: 32px;
          display: flex;
          align-items: center;
          justify-content: center;
          border-radius: 50%;
        }
        
        .cart-remove:hover {
          color: var(--primary-color);
          background-color: #f8f9fa;
        }
        
        .empty-cart-message {
          display: flex;
          align-items: center;
          justify-content: center;
          padding: 3rem 1rem;
          text-align: center;
          color: #777;
        }
        
        .empty-cart-message svg {
          margin-bottom: 1rem;
          opacity: 0.5;
        }
        
        .empty-cart-message h3 {
          margin-bottom: 0.5rem;
        }
        
        .cart-actions {
          display: flex;
          justify-content: space-between;
          margin-top: 1rem;
        }
        
        .cart-summary {
          background-color: white;
          border-radius: 8px;
          padding: 1.5rem;
          box-shadow: 0 2px 10px rgba(0,0,0,0.05);
          height: fit-content;
          border: 1px solid var(--border-color);
        }
        
        .cart-summary-title {
          margin-bottom: 1.5rem;
          padding-bottom: 0.5rem;
          border-bottom: 1px solid var(--border-color);
        }
        
        .summary-row {
          display: flex;
          justify-content: space-between;
          margin-bottom: 1rem;
          font-size: 1.1rem;
        }
        
        .summary-row.total {
          font-weight: bold;
          font-size: 1.3rem;
          padding-top: 0.5rem;
          margin-bottom: 1.5rem;
        }
        
        .checkout-button {
          width: 100%;
          padding: 1rem;
          background-color: var(--primary-color);
          color: white;
          border: none;
          border-radius: 4px;
          font-size: 1rem;
          font-weight: 600;
          text-transform: uppercase;
          letter-spacing: 1px;
          cursor: pointer;
          transition: background-color 0.3s, transform 0.2s;
        }
        
        .checkout-button:hover {
          background-color: #b51835;
          transform: translateY(-2px);
        }
        
        .cta-button {
          padding: 0.75rem 1.5rem;
          border-radius: 4px;
          font-size: 0.9rem;
          font-weight: 600;
          cursor: pointer;
          transition: all 0.3s;
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
        
        @media (max-width: 768px) {
          .cart-layout {
            grid-template-columns: 1fr;
          }
          
          .cart-items-wrapper {
            max-height: 350px;
          }
          
          .cart-table th:nth-child(3),
          .cart-table td:nth-child(3) {
            display: none;
          }
        }
        
        @media (max-width: 576px) {
          .cart-table th:nth-child(2),
          .cart-table td:nth-child(2) {
            display: none;
          }
          
          .cart-product-image {
            width: 60px;
            height: 60px;
          }
          
          .cart-actions {
            flex-direction: column;
            gap: 1rem;
          }
          
          .cta-button {
            width: 100%;
          }
        }      

      /* Enhanced Product Card Styles */
.product-card {
  border: none;
  border-radius: 12px;
  overflow: hidden;
  transition: all 0.4s cubic-bezier(0.165, 0.84, 0.44, 1);
  background: white;
  position: relative;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.05);
}

.product-card:hover {
  transform: translateY(-10px);
  box-shadow: 0 15px 30px rgba(0, 0, 0, 0.1);
}

.product-image {
  height: 350px;
  background: #f8f9fa;
  position: relative;
  overflow: hidden;
}

.product-image::after {
  content: '';
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background: linear-gradient(to bottom, rgba(0, 0, 0, 0) 70%, rgba(0, 0, 0, 0.05) 100%);
  opacity: 0;
  transition: opacity 0.3s ease;
}

.product-card:hover .product-image::after {
  opacity: 1;
}

.product-image img {
  width: 100%;
  height: 100%;
  object-fit: cover;
  transition: transform 0.7s ease;
}

.product-card:hover .product-image img {
  transform: scale(1.08);
}

.product-tag {
  position: absolute;
  top: 15px;
  left: 15px;
  background: var(--primary-color);
  color: white;
  padding: 0.4rem 1rem;
  border-radius: 50px;
  font-size: 0.75rem;
  font-weight: 600;
  text-transform: uppercase;
  letter-spacing: 0.5px;
  z-index: 2;
  box-shadow: 0 3px 10px rgba(0, 0, 0, 0.15);
}

.product-tag.new {
  background: #2ecc71;
}

.product-tag.sale {
  background: #e74c3c;
}

.product-tag.bestseller {
  background: #f39c12;
}

.product-tag.sustainable {
  background: #27ae60;
}

.product-details {
  padding: 1.75rem;
  position: relative;
  z-index: 2;
  background: white;
}

.product-title {
  font-size: 1.2rem;
  margin-bottom: 0.5rem;
  font-weight: 600;
  transition: color 0.3s;
  line-height: 1.3;
}

.product-card:hover .product-title {
  color: var(--primary-color);
}

.product-category {
  color: #777;
  font-size: 0.9rem;
  margin-bottom: 0.75rem;
  text-transform: uppercase;
  font-weight: 500;
  letter-spacing: 0.5px;
  opacity: 0.7;
}

.product-price {
  font-weight: 700;
  font-size: 1.25rem;
  margin-bottom: 1.5rem;
  color: #333;
  display: inline-block;
  position: relative;
}

.product-price::after {
  content: '';
  position: absolute;
  bottom: -5px;
  left: 0;
  width: 40px;
  height: 2px;
  background: var(--primary-color);
  transform: scaleX(0);
  transform-origin: left;
  transition: transform 0.3s ease;
}

.product-card:hover .product-price::after {
  transform: scaleX(1);
}

.product-actions {
  display: flex;
  gap: 0.75rem;
  opacity: 0.9;
  transition: opacity 0.3s;
}

.product-card:hover .product-actions {
  opacity: 1;
}

.product-actions .cta-button {
  flex: 1;
  padding: 0.75rem 1rem;
  border-radius: 50px;
  font-size: 0.85rem;
  font-weight: 600;
  text-transform: uppercase;
  letter-spacing: 0.5px;
  transition: all 0.3s;
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 0.5rem;
}

.product-actions .view-product {
  background-color: var(--primary-color);
  color: white;
  box-shadow: 0 4px 15px rgba(var(--primary-color-rgb), 0.3);
  overflow: hidden;
  position: relative;
  z-index: 1;
}

.product-actions .view-product::before {
  content: '';
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background: linear-gradient(to right, rgba(0,0,0,0.1), rgba(0,0,0,0));
  transform: translateX(-100%);
  transition: transform 0.6s ease;
  z-index: -1;
}

.product-actions .view-product:hover::before {
  transform: translateX(0);
}

.product-actions .add-to-cart-btn {
  width: 46px;
  height: 46px;
  min-width: 46px;
  padding: 0;
  display: flex;
  align-items: center;
  justify-content: center;
 
  background: white;
  color: var(--primary-color);
  border: 1px solid var(--primary-color);
  transition: all 0.3s;
}

.product-actions .add-to-cart-btn:hover {
  background: var(--primary-color);
  color: white;
  transform: scale(1.1);
}

.product-actions .add-to-cart-btn svg {
  transition: transform 0.3s;
}

.product-actions .add-to-cart-btn:hover svg {
  transform: scale(1.1);
}

/* Quick View Modal Trigger */
.quick-view-trigger {
  position: absolute;
  top: 15px;
  right: 15px;
  width: 40px;
  height: 40px;
  background: white;
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  opacity: 0;
  transform: translateY(10px);
  transition: all 0.3s ease;
  cursor: pointer;
  box-shadow: 0 3px 10px rgba(0, 0, 0, 0.1);
  z-index: 2;
}

.product-card:hover .quick-view-trigger {
  opacity: 1;
  transform: translateY(0);
}

.quick-view-trigger:hover {
  background: var(--primary-color);
  color: white;
}

/* Wishlist Button */
.wishlist-btn {
  position: absolute;
  top: 15px;
  right: 65px;
  width: 40px;
  height: 40px;
  background: white;
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  opacity: 0;
  transform: translateY(10px);
  transition: all 0.3s ease;
  cursor: pointer;
  box-shadow: 0 3px 10px rgba(0, 0, 0, 0.1);
  z-index: 2;
}

.product-card:hover .wishlist-btn {
  opacity: 1;
  transform: translateY(0);
  transition-delay: 0.05s;
}

.wishlist-btn:hover {
  background: #e74c3c;
  color: white;
}

.wishlist-btn.active {
  background: #e74c3c;
  color: white;
}

/* Product Rating */
.product-rating {
  display: flex;
  align-items: center;
  gap: 0.5rem;
  margin-top: -0.5rem;
  margin-bottom: 0.75rem;
}

.product-rating .stars {
  color: #f39c12;
  display: flex;
  font-size: 0.8rem;
}

.product-rating .review-count {
  font-size: 0.75rem;
  color: #777;
}

/* Product Colors */
.product-colors {
  display: flex;
  gap: 0.5rem;
  margin-bottom: 1.25rem;
}

.color-option {
  width: 18px;
  height: 18px;
  border-radius: 50%;
  border: 2px solid white;
  box-shadow: 0 0 0 1px #ddd;
  cursor: pointer;
  transition: transform 0.3s;
}

.color-option:hover {
  transform: scale(1.2);
}

/* Product Badge - Position under image */
.product-badge {
  position: absolute;
  bottom: 0;
  right: 0;
  background: rgba(0, 0, 0, 0.7);
  color: white;
  padding: 0.3rem 0.75rem;
  font-size: 0.7rem;
  text-transform: uppercase;
  letter-spacing: 0.5px;
  border-radius: 3px 0 0 0;
}

/* Hover Animation for Card */
@keyframes cardPulse {
  0% {
    box-shadow: 0 5px 15px rgba(0, 0, 0, 0.1);
  }
  50% {
    box-shadow: 0 8px 25px rgba(0, 0, 0, 0.15);
  }
  100% {
    box-shadow: 0 5px 15px rgba(0, 0, 0, 0.1);
  }
}

.product-card:hover {
  animation: cardPulse 2s infinite;
}

/* Responsive Adjustments */
@media (max-width: 768px) {
  .product-image {
    height: 280px;
  }
  
  .product-details {
    padding: 1.25rem;
  }
  
  .quick-view-trigger,
  .wishlist-btn {
    opacity: 1;
    transform: translateY(0);
  }
}

@media (max-width: 480px) {
  .product-actions {
    flex-direction: column;
  }
  
  .product-actions .add-to-cart-btn {
    width: 100%;
    height: 42px;
   
  }
  
  .product-image {
    height: 240px;
  }
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
        background: white;
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
        color: var(--header-text);
        transition: color 0.3s;
        display: flex;
        align-items: center;
        justify-content: center;
        position: relative;
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
        background-color: #f8f9fa;
        background-image: linear-gradient(135deg, #f5f7fa 0%, #c3cfe2 100%);
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
        margin-bottom: 1rem;
      }

      .product-actions {
        display: flex;
        gap: 0.5rem;
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
        display: flex;
        align-items: center;
        justify-content: center;
        gap: 0.5rem;
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

      /* Search Overlay */
      .search-overlay {
        position: fixed;
        top: 0;
        left: 0;
        right: 0;
        bottom: 0;
        background: rgba(255,255,255,0.98);
        z-index: 1000;
        display: none;
        flex-direction: column;
        align-items: center;
        justify-content: center;
        padding: 2rem;
      }

      .search-close {
        position: absolute;
        top: 2rem;
        right: 2rem;
        background: none;
        border: none;
        font-size: 1.5rem;
        cursor: pointer;
      }

      .search-form {
        width: 100%;
        max-width: 600px;
        display: flex;
        margin-bottom: 2rem;
      }

      .search-input {
        flex: 1;
        padding: 1rem;
        border: 1px solid #ddd;
        border-right: none;
        border-radius: 4px 0 0 4px;
        font-size: 1rem;
      }

      .search-button {
        padding: 1rem 2rem;
        background: var(--primary-color);
        color: white;
        border: none;
        border-radius: 0 4px 4px 0;
        cursor: pointer;
        display: flex;
        align-items: center;
        justify-content: center;
      }

      .search-results {
        width: 100%;
        max-width: 600px;
        max-height: 400px;
        overflow-y: auto;
      }

      .search-result-item {
        display: flex;
        align-items: center;
        padding: 1rem;
        border-bottom: 1px solid var(--border-color);
        transition: background-color 0.3s;
      }

      .search-result-item:hover {
        background-color: #f5f5f5;
      }

      .search-result-image {
        width: 60px;
        height: 60px;
        border-radius: 4px;
        overflow: hidden;
        margin-right: 1rem;
      }

      .search-result-image img {
        width: 100%;
        height: 100%;
        object-fit: cover;
      }

      .search-result-info {
        flex: 1;
      }

      .search-result-title {
        font-weight: bold;
        margin-bottom: 0.25rem;
      }

      .search-result-price {
        color: var(--primary-color);
        font-weight: bold;
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
        background-color: rgba(0,0,0,0.1);
        display: flex;
        align-items: center;
        justify-content: center;
        transition: background-color 0.3s;
      }

      .social-link:hover {
        background-color: var(--primary-color);
        color: white;
      }

      .copyright {
        text-align: center;
        padding-top: 2rem;
        border-top: 1px solid rgba(0,0,0,0.1);
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

        .story-container {
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
        
        .product-actions {
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
        
        .search-form {
          flex-direction: column;
        }
        
        .search-input {
          border-radius: 4px;
          border-right: 1px solid #ddd;
          margin-bottom: 0.5rem;
        }
        
        .search-button {
          border-radius: 4px;
        }
      }
    `;
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
        ${this.generateSearchOverlay()}
      </div>
      ${this.generateTemplates()}
      ${this.generateScripts()}
    `;
  }

  private generateHeader(): string {
    return `
      <header class="nova-header">
        <nav class="nova-nav">
          <a href="#" class="nova-logo" data-nav="home">${
            this.config.content.BRAND_NAME || "LUXE"
          }</a>
          <div class="main-nav">
            <a class="nav-link" data-nav="home">Home</a>
            <a class="nav-link" data-nav="products">Collections</a>
            <a class="nav-link" data-nav="blog">Blog</a>
          </div>
          <div class="nav-icons">
            <button class="icon-btn" id="search-toggle">
              <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                <circle cx="11" cy="11" r="8"></circle>
                <line x1="21" y1="21" x2="16.65" y2="16.65"></line>
              </svg>
            </button>
            <button class="icon-btn" id="cart-toggle" data-nav="cart" style="position: relative;">
              <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                <circle cx="9" cy="21" r="1"></circle>
                <circle cx="20" cy="21" r="1"></circle>
                <path d="M1 1h4l2.68 13.39a2 2 0 0 0 2 1.61h9.72a2 2 0 0 0 2-1.61L23 6H6"></path>
              </svg>
              <span class="cart-count" id="cart-count">0</span>
            </button>
          </div>
          <button class="mobile-menu-toggle" id="mobile-menu-toggle">
            <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
              <line x1="3" y1="12" x2="21" y2="12"></line>
              <line x1="3" y1="6" x2="21" y2="6"></line>
              <line x1="3" y1="18" x2="21" y2="18"></line>
            </svg>
          </button>
        </nav>
      </header>
      <div id="mobile-menu" class="mobile-menu" style="display: none;">
        <div class="mobile-menu-header">
          <a href="#" class="nova-logo" data-nav="home">${
            this.config.content.BRAND_NAME || "LUXE"
          }</a>
          <button class="mobile-menu-close" id="mobile-menu-close">
            <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
              <line x1="18" y1="6" x2="6" y2="18"></line>
              <line x1="6" y1="6" x2="18" y2="18"></line>
            </svg>
          </button>
        </div>
        <div class="mobile-nav-links">
          <a class="mobile-nav-link" data-nav="home">Home</a>
          <a class="mobile-nav-link" data-nav="products">Collections</a>
          <a class="mobile-nav-link" data-nav="blog">Blog</a>
        </div>
      </div>
    `;
  }

  private generateSearchOverlay(): string {
    return `
      <div id="search-overlay" class="search-overlay">
        <button class="search-close" id="search-close">
          <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
            <line x1="18" y1="6" x2="6" y2="18"></line>
            <line x1="6" y1="6" x2="18" y2="18"></line>
          </svg>
        </button>
        <h2 style="margin-bottom: 2rem;">Search for products</h2>
        <div class="search-form">
          <input type="text" id="search-input" class="search-input" placeholder="Search for products...">
          <button class="search-button">
            <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
              <circle cx="11" cy="11" r="8"></circle>
              <line x1="21" y1="21" x2="16.65" y2="16.65"></line>
            </svg>
          </button>
        </div>
        <div class="search-results" id="search-results">
          <!-- Search results will be populated here -->
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
          <button class="cta-button" data-nav="home">Return to Home</button>
        </section>
      </template>
    `;
  }

  private generateHeroSection(): string {
    return `
      <section class="hero-section">
        <div class="hero-content">
          <h1 class="hero-title">${
            this.config.content.HERO_TITLE || "Summer Collection 2024"
          }</h1>
          <p class="hero-subtitle">${
            this.config.content.HERO_DESCRIPTION ||
            "Discover the latest trends and elevate your style with our exclusive pieces."
          }</p>
          <div class="cta-buttons">
            <button class="cta-button" data-nav="products">${
              this.config.content.PRIMARY_CTA_TEXT || "Shop Collection"
            }</button>
            <button class="cta-button secondary" data-nav="blog">${
              this.config.content.SECONDARY_CTA_TEXT || "Our Story"
            }</button>
          </div>
        </div>
      </section>
    `;
  }

  private generateFeaturedProducts(): string {
    return `
      <section class="section">
        <div class="container">
          <h2 class="section-title">${
            this.config.content.PRODUCTS_TITLE || "Featured Products"
          }</h2>
          <div class="product-grid">
            ${this.generateProductCards(8)}
          </div>
          <div style="text-align: center; margin-top: 3rem;">
            <button class="cta-button" data-nav="products">View All Products</button>
          </div>
        </div>
      </section>
    `;
  }

  private generateProductCards(count: number): string {
    const products = [
      {
        id: 1,
        name: "Silk Blend Midi Dress",
        category: "Dresses",
        price: 129.99,
        tag: "New",
        rating: 4.8,
        reviewCount: 24,
        colors: ["#6a5acd", "#dda0dd", "#000000"],
        isNew: true,
      },
      {
        id: 2,
        name: "Tailored Wool Blazer",
        category: "Outerwear",
        price: 189.99,
        tag: "",
        rating: 4.6,
        reviewCount: 18,
        colors: ["#36454f", "#8b4513", "#f5f5dc"],
        isNew: false,
      },
      {
        id: 3,
        name: "Organic Cotton T-Shirt",
        category: "Tops",
        price: 39.99,
        tag: "Sustainable",
        rating: 4.9,
        reviewCount: 42,
        colors: ["#ffffff", "#000000", "#008000", "#87ceeb"],
        isNew: false,
      },
      {
        id: 4,
        name: "High-Rise Slim Jeans",
        category: "Bottoms",
        price: 79.99,
        tag: "",
        rating: 4.5,
        reviewCount: 36,
        colors: ["#0000ff", "#000000", "#f5f5dc"],
        isNew: false,
      },
      {
        id: 5,
        name: "Leather Crossbody Bag",
        category: "Accessories",
        price: 119.99,
        tag: "Bestseller",
        rating: 4.9,
        reviewCount: 53,
        colors: ["#8b4513", "#000000", "#f5f5dc"],
        isNew: false,
      },
      {
        id: 6,
        name: "Cashmere Sweater",
        category: "Tops",
        price: 149.99,
        tag: "",
        rating: 4.7,
        reviewCount: 29,
        colors: ["#ff6347", "#228b22", "#4682b4", "#ffd700"],
        isNew: true,
      },
      {
        id: 7,
        name: "Linen Blend Shirt",
        category: "Tops",
        price: 69.99,
        tag: "",
        rating: 4.4,
        reviewCount: 21,
        colors: ["#ffffff", "#add8e6", "#f5f5dc"],
        isNew: false,
      },
      {
        id: 8,
        name: "Pleated Midi Skirt",
        category: "Bottoms",
        price: 89.99,
        tag: "",
        rating: 4.6,
        reviewCount: 19,
        colors: ["#ffb6c1", "#000000", "#4b0082"],
        isNew: false,
      },
      {
        id: 9,
        name: "Merino Wool Scarf",
        category: "Accessories",
        price: 59.99,
        tag: "",
        rating: 4.8,
        reviewCount: 27,
        colors: ["#ff0000", "#008000", "#00008b", "#ffa500"],
        isNew: false,
      },
      {
        id: 10,
        name: "Leather Chelsea Boots",
        category: "Shoes",
        price: 159.99,
        tag: "",
        rating: 4.7,
        reviewCount: 38,
        colors: ["#8b4513", "#000000"],
        isNew: true,
      },
    ];

    return products
      .slice(0, count)
      .map(
        (product) => `
    <div class="product-card view-product" data-product-id="${product.id}">
      <div class="product-image">
       
        <img src="/placeholder.svg?height=400&width=300" alt="${product.name}">
        
        
        
        
      </div>
      
      <div class="product-details">
      
        <h3 class="product-title">${product.name}</h3>
        
        
        
       
        
        <p class="product-price">$${product.price.toFixed(2)}</p>
        
        <div class="product-actions">
          <button class="cta-button add-to-cart-btn" data-product-id="${
            product.id
          }">Add to Cart</button>
         
        </div>
      </div>
    </div>
  `
      )
      .join("");
  }

  // Helper method to generate star ratings

  private generateStorySection(): string {
    return `
      <section class="story-section">
        <div class="container">
          <div class="story-container">
            <div class="story-content">
              <h2>${this.config.content.ABOUT_TITLE || "Our Story"}</h2>
              <p>${
                this.config.content.ABOUT_TEXT ||
                "Founded in 2010, LUXE began as a small boutique in Paris with a vision to create fashion that transcends trends and celebrates individuality. Our founder, Emma Laurent, believed that clothing should not only look beautiful but also tell a story and empower the wearer."
              }</p>
              <p>Today, we continue to honor our heritage while embracing innovation and responsibility. Each LUXE piece is a testament to our dedication to excellence and our belief that fashion can be both beautiful and meaningful.</p>
              
            </div>
            
          </div>
        </div>
      </section>
    `;
  }

  private generateBlogPage(): string {
    return `
      <div class="blog-page">
        <section class="hero-section" style="height: 40vh; background-image: linear-gradient(135deg, #f5f7fa 0%, #c3cfe2 100%);">
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
                    <a class="blog-link" data-blog-id="${post.id}">Read More</a>
                  </div>
                </div>
              `
                )
                .join("")}
            </div>
          </div>
        </section>
      </div>
    `;
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
    `;
  }

  private generateProductsPage(): string {
    return `
     
       
         
          <div class="product-grid" id="products-grid">
            ${this.generateProductCards(10)}
          </div>
        
      
    `;
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
                <div class="thumbnail ${
                  i === 1 ? "active" : ""
                }" data-index="${i}">
                  <img src="/placeholder.svg?height=80&width=80" alt="Thumbnail ${i}">
                </div>
              `
                )
                .join("")}
            </div>
            <div class="main-image">
              <img src="/placeholder.svg?height=600&width=500" alt="Silk Blend Midi Dress">
            </div>
          </div>

          <div class="product-info">
            <h1 class="product-detail-title">Silk Blend Midi Dress</h1>
           
            <p class="product-detail-price">$129.99</p>

            <div class="product-options">
              

              <label class="option-label">Size</label>
              <div class="size-options">
                ${["XS", "S", "M", "L", "XL"]
                  .map(
                    (size, i) => `
                  <div class="size-option ${
                    i === 0 ? "active" : ""
                  }" data-size="${size}">${size}</div>
                `
                  )
                  .join("")}
              </div>
             

              <div class="quantity-selector">
                <label class="quantity-label">Quantity</label>
                <div class="quantity-controls">
                  <button class="quantity-btn" id="quantity-minus">
                    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                      <line x1="5" y1="12" x2="19" y2="12"></line>
                    </svg>
                  </button>
                  <input type="text" value="1" class="quantity-input" id="quantity-input">
                  <button class="quantity-btn" id="quantity-plus">
                    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                      <line x1="12" y1="5" x2="12" y2="19"></line>
                      <line x1="5" y1="12" x2="19" y2="12"></line>
                    </svg>
                  </button>
                </div>
              </div>
            </div>

            <div class="product-actions">
              <button class="cta-button add-to-cart" id="add-to-cart-detail">Add to Cart</button>
              
            </div>

            <div class="product-tabs">
              <div class="tabs-header">
                <button class="tab-btn active" data-tab="description">Description</button>
                <button class="tab-btn" data-tab="details">Details</button>
                <button class="tab-btn" data-tab="shipping">Shipping</button>
              </div>
              <div class="tab-content">
                <div class="tab-pane active" id="description-tab">
                  <p>A luxurious silk blend midi dress with a flattering silhouette, perfect for both casual and formal occasions.</p>
                  <p>This versatile piece features a subtle drape that elegantly follows your body's natural contours, creating a sophisticated yet effortless look. The lightweight fabric ensures comfort throughout the day or evening.</p>
                </div>
                <div class="tab-pane" id="details-tab">
                  <ul style="padding-left: 1.5rem;">
                    <li>96% Silk, 4% Elastane</li>
                    <li>Dry clean only</li>
                    <li>Concealed back zip</li>
                    <li>Adjustable straps</li>
                    <li>Made in Italy</li>
                  </ul>
                </div>
                <div class="tab-pane" id="shipping-tab">
                  <p>Free standard shipping on all orders over $100.</p>
                  <p>Express shipping available for an additional fee.</p>
                  <p>International shipping available to select countries.</p>
                  <p>Please allow 1-3 business days for processing.</p>
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
    `;
  }

  private generateCartPage(): string {
    return `
      <div class="cart-page container">
        <h1 class="cart-title">Shopping Cart</h1>

        <div class="cart-layout">
          <div class="cart-items-container">
            <div class="cart-items-wrapper">
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
                <tbody id="cart-items">
                  <!-- Cart items will be dynamically inserted here -->
                </tbody>
              </table>
              <div id="empty-cart-message" class="empty-cart-message">
                <div>
                  <svg xmlns="http://www.w3.org/2000/svg" width="64" height="64" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1" stroke-linecap="round" stroke-linejoin="round">
                    <circle cx="9" cy="21" r="1"></circle>
                    <circle cx="20" cy="21" r="1"></circle>
                    <path d="M1 1h4l2.68 13.39a2 2 0 0 0 2 1.61h9.72a2 2 0 0 0 2-1.61L23 6H6"></path>
                  </svg>
                  <h3>Your cart is empty</h3>
                  <p>Start adding some products to your cart</p>
                </div>
              </div>
            </div>

            <div class="cart-actions">
              <button class="cta-button secondary" data-nav="products">Continue Shopping</button>
              <button class="cta-button secondary" id="clear-cart">Clear Cart</button>
            </div>
          </div>

          <div class="cart-summary">
            <h2 class="cart-summary-title">Order Summary</h2>
            <div class="summary-row total">
              <span>Total</span>
              <span id="cart-total">$0.00</span>
            </div>
            <button class="checkout-button">Proceed to Checkout</button>
          </div>
        </div>
      </div>

    `;
  }

  private generateEmptyCartPage(): string {
    return `
      <div class="cart-empty container">
        <div class="cart-empty-icon">
          <svg xmlns="http://www.w3.org/2000/svg" width="64" height="64" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1" stroke-linecap="round" stroke-linejoin="round">
            <circle cx="9" cy="21" r="1"></circle>
            <circle cx="20" cy="21" r="1"></circle>
            <path d="M1 1h4l2.68 13.39a2 2 0 0 0 2 1.61h9.72a2 2 0 0 0 2-1.61L23 6H6"></path>
          </svg>
        </div>
        <h1>Your cart is empty</h1>
        <p>Looks like you haven't added anything to your cart yet.</p>
        <button class="cta-button" style="margin-top: 2rem;" data-nav="products">Continue Shopping</button>
      </div>
    `;
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
                <a href="${
                  this.config.content.INSTAGRAM_LINK || "#"
                }" class="social-link" aria-label="Instagram">
                  <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                    <rect x="2" y="2" width="20" height="20" rx="5" ry="5"></rect>
                    <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"></path>
                    <line x1="17.5" y1="6.5" x2="17.51" y2="6.5"></line>
                  </svg>
                </a>
                <a href="${
                  this.config.content.FACEBOOK_LINK || "#"
                }" class="social-link" aria-label="Facebook">
                  <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                    <path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z"></path>
                  </svg>
                </a>
                <a href="${
                  this.config.content.TWITTER_LINK || "#"
                }" class="social-link" aria-label="Twitter">
                  <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
                    <path d="M23 3a10.9 10.9 0 0 1-3.14 1.53 4.48 4.48 0 0 0-7.86 3v1A10.66 10.66 0 0 1 3 4s-4 9 5 13a11.64 11.64 0 0 1-7 2c9 5 20 0 20-11.5a4.5 4.5 0 0 0-.08-.83A7.72 7.72 0 0 0 23 3z"></path>
                  </svg>
                </a>
               
              </div>
            </div>
            <div class="footer-col">
              <h4>Shop</h4>
              <ul class="footer-links">
                <li><a href="#" class="footer-link" data-nav="products">Women</a></li>
                <li><a href="#" class="footer-link" data-nav="products">Men</a></li>
                <li><a href="#" class="footer-link" data-nav="products">Accessories</a></li>
                <li><a href="#" class="footer-link" data-nav="products">New Arrivals</a></li>
                <li><a href="#" class="footer-link" data-nav="products">Sale</a></li>
              </ul>
            </div>
            <div class="footer-col">
              <h4>Company</h4>
              <ul class="footer-links">
                <li><a href="#" class="footer-link">About Us</a></li>
                <li><a href="#" class="footer-link">Careers</a></li>
                <li><a href="#" class="footer-link">Contact Us</a></li>
                <li><a href="#" class="footer-link">Sustainability</a></li>
                <li><a href="#" class="footer-link">Press</a></li>
              </ul>
            </div>
            <div class="footer-col">
              <h4>Customer Service</h4>
              <ul class="footer-links">
                <li><a href="#" class="footer-link">FAQ</a></li>
                <li><a href="#" class="footer-link">Shipping & Returns</a></li>
                <li><a href="#" class="footer-link">Store Locator</a></li>
                <li><a href="#" class="footer-link">Size Guide</a></li>
                <li><a href="#" class="footer-link">Gift Cards</a></li>
              </ul>
            </div>
           
          </div>

          <div class="copyright">
            © ${new Date().getFullYear()} ${
      this.config.content.BRAND_NAME || "LUXE"
    } Fashion. All rights reserved.
          </div>
        </div>
      </footer>
    `;
  }

  private generateScripts(): string {
    // Using a template literal to return the script as a string
    return `
    <script>
      // Create the router instance immediately to ensure it's available
      window.novaRouter = {
        routes: {},
        currentRoute: 'home',
        contentContainer: null,
        params: {},
        initialContentSet: false,
        activeFilters: {
          category: [],
          size: [],
          color: [],
          price: 500
        },
        cart: [],
        
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
          
          // Load cart from localStorage
          this.loadCart();
          
          // Set up navigation event handlers
          this.setupNavigationHandlers();
          
          // Initialize cart count
          this.updateCartCount();
          
          // Initialize search
          this.initSearch();
        },
        
        loadInitialContent: function() {
          // Only load initial content if it hasn't been set yet
          if (!this.initialContentSet) {
            const defaultTemplate = this.routes['home'];
            if (defaultTemplate && this.contentContainer) {
              this.contentContainer.innerHTML = defaultTemplate.innerHTML;
              this.updateActiveNavLinks('home');
              this.initialContentSet = true;
              
              // Initialize page scripts
              this.initPageScripts('home');
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
          
          // Product detail navigation
          document.addEventListener('click', (e) => {
            // View product buttons
            if (e.target.classList.contains('view-product') || e.target.closest('.view-product')) {
              e.preventDefault();
              const button = e.target.classList.contains('view-product') ? e.target : e.target.closest('.view-product');
              const productId = button.getAttribute('data-product-id');
              this.navigate('product-detail', { id: productId });
            }
            
            // Blog links
            if (e.target.classList.contains('blog-link') || e.target.closest('.blog-link')) {
              e.preventDefault();
              const link = e.target.classList.contains('blog-link') ? e.target : e.target.closest('.blog-link');
              const blogId = link.getAttribute('data-blog-id');
              this.navigate('blog-post', { id: blogId });
            }
            
            // Add to cart buttons on product cards
            if (e.target.classList.contains('add-to-cart-btn') || e.target.closest('.add-to-cart-btn')) {
              e.preventDefault();
              e.stopPropagation();
              const button = e.target.classList.contains('add-to-cart-btn') ? e.target : e.target.closest('.add-to-cart-btn');
              const productId = button.getAttribute('data-product-id');
              this.addToCart({
                id: productId,
                name: 'Product ' + productId,
                price: 99.99,
                quantity: 1,
                image: '/placeholder.svg?height=80&width=80',
                color: 'Black',
                size: 'M'
              });
            }
          });
          
          // Mobile menu toggle
          const mobileMenuToggle = document.getElementById('mobile-menu-toggle');
          const mobileMenu = document.getElementById('mobile-menu');
          const mobileMenuClose = document.getElementById('mobile-menu-close');
          
          if (mobileMenuToggle && mobileMenu && mobileMenuClose) {
            mobileMenuToggle.addEventListener('click', () => {
              mobileMenu.style.display = 'flex';
            });
            
            mobileMenuClose.addEventListener('click', () => {
              mobileMenu.style.display = 'none';
            });
          }
          
          // Search toggle
          const searchToggle = document.getElementById('search-toggle');
          const searchOverlay = document.getElementById('search-overlay');
          const searchClose = document.getElementById('search-close');
          const searchInput = document.getElementById('search-input');
          
          if (searchToggle && searchOverlay && searchClose && searchInput) {
            searchToggle.addEventListener('click', () => {
              searchOverlay.style.display = 'flex';
              searchInput.focus();
            });
            
            searchClose.addEventListener('click', () => {
              searchOverlay.style.display = 'none';
            });
          }
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
              
              // Close mobile menu if open
              const mobileMenu = document.getElementById('mobile-menu');
              if (mobileMenu) {
                mobileMenu.style.display = 'none';
              }
              
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
          
          document.querySelectorAll('.mobile-nav-link').forEach(link => {
            link.classList.remove('active');
          });

          // Add active class to current nav links
          document.querySelectorAll('.nav-link[data-nav="' + page + '"]').forEach(link => {
            link.classList.add('active');
          });
          
          document.querySelectorAll('.mobile-nav-link[data-nav="' + page + '"]').forEach(link => {
            link.classList.add('active');
          });
          
          // Special case for collections/products
          if (page === 'products') {
            document.querySelectorAll('.nav-link').forEach(link => {
              if (link.textContent && link.textContent.trim().toLowerCase() === 'collections') {
                link.classList.add('active');
              }
            });
            
            document.querySelectorAll('.mobile-nav-link').forEach(link => {
              if (link.textContent && link.textContent.trim().toLowerCase() === 'collections') {
                link.classList.add('active');
              }
            });
          }
        },
        
        initPageScripts: function(page) {
          // Initialize any components on the page
          console.log('Initializing page:', page);
          
          // Add specific initialization based on page
          if (page === 'product-detail') {
            this.initProductDetailPage();
          } else if (page === 'cart') {
            this.initCartPage();
          } else if (page === 'products') {
            this.initProductsPage();
          } else if (page === 'home') {
            this.initHomePage();
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
          
          tabButtons.forEach(button => {
            button.addEventListener('click', () => {
              // Remove active class from all buttons and panes
              tabButtons.forEach(btn => btn.classList.remove('active'));
              document.querySelectorAll('.tab-pane').forEach(pane => pane.classList.remove('active'));
              
              // Add active class to clicked button and corresponding pane
              button.classList.add('active');
              const tabId = button.getAttribute('data-tab') + '-tab';
              const tabElement = document.getElementById(tabId);
              if (tabElement) {
                tabElement.classList.add('active');
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
          const addToCartButton = document.getElementById('add-to-cart-detail');
          if (addToCartButton) {
            addToCartButton.addEventListener('click', () => {
              const productId = this.params.id || '1';
              const quantityInput = document.getElementById('quantity-input');
              const quantity = quantityInput ? parseInt(quantityInput.value) || 1 : 1;
              
              const activeColorElement = document.querySelector('.color-option.active');
              const activeSizeElement = document.querySelector('.size-option.active');
              
              const color = activeColorElement ? activeColorElement.getAttribute('data-color') || 'Black' : 'Black';
              const size = activeSizeElement ? activeSizeElement.getAttribute('data-size') || 'M' : 'M';
              
              const titleElement = document.querySelector('.product-detail-title');
              const priceElement = document.querySelector('.product-detail-price');
              const imageElement = document.querySelector('.main-image img');
              
              const name = titleElement ? titleElement.textContent || 'Product' : 'Product';
              const price = priceElement ? parseFloat((priceElement.textContent || '').replace('$', '')) || 99.99 : 99.99;
              const image = imageElement ? imageElement.src : '/placeholder.svg?height=80&width=80';
              
              this.addToCart({
                id: productId,
                name: name,
                price: price,
                quantity: quantity,
                image: image,
                color: color,
                size: size
              });
              
              this.navigate('cart');
            });
          }
        },
        
        initCartPage: function() {
          // Initialize quantity controls
          this.initQuantityControls();
          
          // Update cart totals
          this.updateCartTotals();
          
          // Initialize remove buttons
          const removeButtons = document.querySelectorAll('.cart-remove');
          removeButtons.forEach(button => {
            button.addEventListener('click', (e) => {
              const row = e.target.closest('.cart-item');
              if (row) {
                const productId = row.getAttribute('data-product-id');
                this.removeFromCart(productId);
                row.remove();
                
                // Check if cart is empty
                const rows = document.querySelectorAll('.cart-item');
                if (rows.length === 0) {
                  this.navigate('empty-cart');
                } else {
                  // Update cart count and totals
                  this.updateCartCount();
                  this.updateCartTotals();
                }
              }
            });
          });
          
          // Initialize clear cart button
          const clearCartButton = document.getElementById('clear-cart');
          if (clearCartButton) {
            clearCartButton.addEventListener('click', () => {
              this.clearCart();
              this.navigate('empty-cart');
            });
          }
          
          // Initialize quantity change in cart
          document.querySelectorAll('.cart-quantity').forEach(input => {
            input.addEventListener('change', () => {
              this.updateCartItemQuantities();
            });
          });
          
          document.querySelectorAll('.cart-quantity-plus').forEach(button => {
            button.addEventListener('click', () => {
              this.updateCartItemQuantities();
            });
          });
          
          document.querySelectorAll('.cart-quantity-minus').forEach(button => {
            button.addEventListener('click', () => {
              this.updateCartItemQuantities();
            });
          });
        },
        
        initProductsPage: function() {
          // Initialize filters
          const filterToggles = document.querySelectorAll('.filter-toggle');
          filterToggles.forEach(toggle => {
            toggle.addEventListener('click', () => {
              const content = toggle.parentElement ? toggle.parentElement.nextElementSibling : null;
              if (content) {
                if (content.style.display === 'none') {
                  content.style.display = 'block';
                  toggle.textContent = '▼';
                } else {
                  content.style.display = 'none';
                  toggle.textContent = '►';
                }
              }
            });
          });
          
          // Initialize price slider
          const priceSlider = document.getElementById('price-slider');
          const priceValue = document.getElementById('price-value');
          if (priceSlider && priceValue) {
            priceSlider.addEventListener('input', () => {
              const sliderValue = priceSlider.value;
              priceValue.textContent = '$' + sliderValue;
              this.activeFilters.price = parseInt(sliderValue);
              this.applyFilters();
            });
          }
          
          // Initialize filter checkboxes
          const filterCheckboxes = document.querySelectorAll('.filter-checkbox');
          filterCheckboxes.forEach(checkbox => {
            checkbox.addEventListener('change', () => {
              const filterType = checkbox.getAttribute('data-filter') || '';
              const filterValue = checkbox.getAttribute('data-value') || '';
              
              // Ensure filter type exists in activeFilters
              if (!this.activeFilters[filterType]) {
                this.activeFilters[filterType] = [];
              }
              
              if (checkbox.checked) {
                if (!this.activeFilters[filterType].includes(filterValue)) {
                  this.activeFilters[filterType].push(filterValue);
                }
              } else {
                this.activeFilters[filterType] = this.activeFilters[filterType].filter(v => v !== filterValue);
              }
              
              this.applyFilters();
            });
          });
          
          // Initialize color filters
          const colorFilters = document.querySelectorAll('.color-filter-option');
          colorFilters.forEach(color => {
            color.addEventListener('click', () => {
              const filterValue = color.getAttribute('data-value') || '';
              
              if (color.classList.contains('active')) {
                color.classList.remove('active');
                this.activeFilters.color = this.activeFilters.color.filter(v => v !== filterValue);
              } else {
                color.classList.add('active');
                if (!this.activeFilters.color.includes(filterValue)) {
                  this.activeFilters.color.push(filterValue);
                }
              }
              
              this.applyFilters();
            });
          });
          
          // Initialize clear filters
          const clearFiltersButton = document.getElementById('clear-filters');
          if (clearFiltersButton) {
            clearFiltersButton.addEventListener('click', () => {
              this.clearFilters();
            });
          }
          
          // Initialize sort dropdown
          const sortDropdown = document.getElementById('sort-products');
          if (sortDropdown) {
            sortDropdown.addEventListener('change', () => {
              const value = sortDropdown.value || '';
              this.sortProducts(value);
            });
          }
        },
        
        initHomePage: function() {
          // Any specific home page initialization
          const addToCartButtons = document.querySelectorAll('.add-to-cart-btn');
          addToCartButtons.forEach(button => {
            button.addEventListener('click', (e) => {
              e.preventDefault();
              e.stopPropagation();
              const productId = button.getAttribute('data-product-id') || '';
              const productCard = button.closest('.product-card');
              
              if (productCard) {
                const titleElement = productCard.querySelector('.product-title');
                const priceElement = productCard.querySelector('.product-price');
                const imageElement = productCard.querySelector('.product-image img');
                
                const name = titleElement ? titleElement.textContent || 'Product' : 'Product';
                const priceText = priceElement ? priceElement.textContent || '99.99' : '99.99';
                const price = parseFloat(priceText.replace('$', '')) || 99.99;
                const image = imageElement ? imageElement.src : '/placeholder.svg?height=80&width=80';
                
                this.addToCart({
                  id: productId,
                  name: name,
                  price: price,
                  quantity: 1,
                  image: image,
                  color: 'Default',
                  size: 'M'
                });
              }
            });
          });
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
                  
                  // If this is a cart quantity input, update totals
                  if (input.classList.contains('cart-quantity')) {
                    this.updateCartItemQuantities();
                  }
                }
              });
              
              plusButton.addEventListener('click', () => {
                let value = parseInt(input.value);
                input.value = value + 1;
                
                // If this is a cart quantity input, update totals
                if (input.classList.contains('cart-quantity')) {
                  this.updateCartItemQuantities();
                }
              });
              
              input.addEventListener('change', () => {
                let value = parseInt(input.value);
                if (isNaN(value) || value < 1) {
                  input.value = 1;
                }
                
                // If this is a cart quantity input, update totals
                if (input.classList.contains('cart-quantity')) {
                  this.updateCartItemQuantities();
                }
              });
            }
          });
        },
        
        setupDynamicEventListeners: function() {
          // Re-attach event listeners for elements that might be added dynamically
        },
        
        updateCartCount: function(count) {
          // Update the cart count badge
          const cartCount = document.getElementById('cart-count');
          if (cartCount) {
            if (count !== undefined) {
              cartCount.textContent = count.toString();
            } else {
              // Calculate total quantity from cart
              const totalQuantity = this.cart.reduce((total, item) => total + item.quantity, 0);
              cartCount.textContent = totalQuantity.toString();
            }
          }
        },
        
        addToCart: function(product) {
          // Check if product already exists in cart
          const existingProduct = this.cart.find(item => item.id === product.id);
          
          if (existingProduct) {
            // Update quantity
            existingProduct.quantity += product.quantity;
          } else {
            // Add new product
            this.cart.push(product);
          }
          
          // Update cart count
          this.updateCartCount();
          
          // Save cart to localStorage
          this.saveCart();
          
          // Show confirmation
          alert('Product added to cart!');
        },
        
        removeFromCart: function(productId) {
          this.cart = this.cart.filter(item => item.id !== productId);
          this.saveCart();
        },
        
        clearCart: function() {
          this.cart = [];
          this.updateCartCount(0);
          this.saveCart();
        },
        
        saveCart: function() {
          localStorage.setItem('novaCart', JSON.stringify(this.cart));
        },
        
        loadCart: function() {
          const savedCart = localStorage.getItem('novaCart');
          if (savedCart) {
            try {
              this.cart = JSON.parse(savedCart);
            } catch (e) {
              console.error('Error loading cart from localStorage', e);
              this.cart = [];
            }
          } else {
            this.cart = [];
          }
        },
        
        updateCartTotals: function() {
          const subtotalElement = document.getElementById('cart-subtotal');
          const taxElement = document.getElementById('cart-tax');
          const totalElement = document.getElementById('cart-total');
          
          if (subtotalElement && taxElement && totalElement) {
            // Calculate subtotal
            const subtotal = this.cart.reduce((total, item) => total + (item.price * item.quantity), 0);
            const tax = subtotal * 0.08; // 8% tax
            const total = subtotal + tax;
            
            subtotalElement.textContent = '$' + subtotal.toFixed(2);
            taxElement.textContent = '$' + tax.toFixed(2);
            totalElement.textContent = '$' + total.toFixed(2);
          }
          
          // Update individual item totals
          document.querySelectorAll('.cart-item').forEach(item => {
            const productId = item.getAttribute('data-product-id');
            if (productId) {
              const cartItem = this.cart.find(i => i.id === productId);
              
              if (cartItem) {
                const price = cartItem.price;
                const quantity = cartItem.quantity;
                const totalElement = item.querySelector('.cart-item-total');
                
                if (totalElement) {
                  totalElement.textContent = '$' + (price * quantity).toFixed(2);
                }
              }
            }
          });
        },
        
        updateCartItemQuantities: function() {
          document.querySelectorAll('.cart-item').forEach(item => {
            const productId = item.getAttribute('data-product-id');
            if (productId) {
              const quantityInput = item.querySelector('.cart-quantity');
              
              if (quantityInput) {
                const quantity = parseInt(quantityInput.value) || 1;
                const cartItem = this.cart.find(i => i.id === productId);
                
                if (cartItem) {
                  cartItem.quantity = quantity;
                }
              }
            }
          });
          
          this.saveCart();
          this.updateCartCount();
          this.updateCartTotals();
        },
        
        applyFilters: function() {
          // In a real app, this would filter products based on activeFilters
          console.log('Applying filters:', this.activeFilters);
          
          // For demo purposes, just log the filters
          alert('Filters applied! In a real app, this would filter the products.');
        },
        
        clearFilters: function() {
          // Reset all filters
          this.activeFilters = {
            category: [],
            size: [],
            color: [],
            price: 500
          };
          
          // Reset UI
          document.querySelectorAll('.filter-checkbox').forEach(checkbox => {
            checkbox.checked = false;
          });
          
          document.querySelectorAll('.color-filter-option').forEach(color => {
            color.classList.remove('active');
          });
          
          const priceSlider = document.getElementById('price-slider');
          const priceValue = document.getElementById('price-value');
          if (priceSlider && priceValue) {
            priceSlider.value = '500';
            priceValue.textContent = '$500';
          }
          
          // Apply (clear) filters
          this.applyFilters();
        },
        
        sortProducts: function(sortOption) {
          // In a real app, this would sort products based on the selected option
          console.log('Sorting products by:', sortOption);
          
          // For demo purposes, just log the sort option
          alert('Sorting applied! In a real app, this would sort the products.');
        },
        
        initSearch: function() {
          const searchInput = document.getElementById('search-input');
          const searchResults = document.getElementById('search-results');
          const searchButton = document.querySelector('.search-button');
          
          if (searchInput && searchResults && searchButton) {
            const performSearch = () => {
              const query = searchInput.value.trim().toLowerCase();
              
              if (query.length < 2) {
                searchResults.innerHTML = '<p>Please enter at least 2 characters to search</p>';
                return;
              }
              
              // In a real app, this would search products from an API or database
              // For demo purposes, show some mock results
              const mockResults = [
                { id: 1, name: 'Silk Blend Midi Dress', price: 129.99, image: '/placeholder.svg?height=80&width=80' },
                { id: 2, name: 'Tailored Wool Blazer', price: 189.99, image: '/placeholder.svg?height=80&width=80' },
                { id: 3, name: 'Organic Cotton T-Shirt', price: 39.99, image: '/placeholder.svg?height=80&width=80' }
              ];
              
              const filteredResults = mockResults.filter(product => 
                product.name.toLowerCase().includes(query)
              );
              
              if (filteredResults.length === 0) {
                searchResults.innerHTML = '<p>No products found matching your search</p>';
              } else {
                // Using string concatenation to avoid TypeScript treating this as JSX
                searchResults.innerHTML = filteredResults.map(product => 
                  '<div class="search-result-item" data-product-id="' + product.id + '">' +
                    '<div class="search-result-image">' +
                      '<img src="' + product.image + '" alt="' + product.name + '">' +
                    '</div>' +
                    '<div class="search-result-info">' +
                      '<h3 class="search-result-title">' + product.name + '</h3>' +
                      '<p class="search-result-price">$' + product.price.toFixed(2) + '</p>' +
                    '</div>' +
                  '</div>'
                ).join('');
                
                // Add click handlers to search results
                document.querySelectorAll('.search-result-item').forEach(item => {
                  item.addEventListener('click', () => {
                    const productId = item.getAttribute('data-product-id');
                    const searchOverlay = document.getElementById('search-overlay');
                    if (searchOverlay) {
                      searchOverlay.style.display = 'none';
                    }
                    this.navigate('product-detail', { id: productId });
                  });
                });
              }
            };
            
            searchInput.addEventListener('keyup', (e) => {
              if (e.key === 'Enter') {
                performSearch();
              }
            });
            
            searchButton.addEventListener('click', performSearch);
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
  `;
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









  // class LuxeRouter {
  //       constructor() {
  //         this.routes = {
  //           'home': document.getElementById('home-template'),
  //           'about': document.getElementById('about-template'),
  //           'contact': document.getElementById('contact-template'),
  //           'collections': document.getElementById('collections-template')
  //         };
          
  //         // Default route
  //         this.currentRoute = 'home';
  //         this.contentContainer = document.getElementById('app-content');
          
  //         // Initialize router
  //         this.init();
  //       }
        
  //       init() {
  //         // Load initial content immediately
  //         const page = 'home'; // Always start with home page
  //         this.loadContent(page);
  //         this.updateActiveNavLinks(page);
  //       }
        
  //       navigate(page) {
  //         if (!this.routes[page]) {
  //           console.error('Page not found:', page);
  //           return;
  //         }
          
  //         // Load the page content
  //         this.loadContent(page);
  //         this.updateActiveNavLinks(page);
  //         this.currentRoute = page;
          
  //         // Scroll to top
  //         window.scrollTo(0, 0);
  //       }
        
  //       loadContent(page) {
  //         const template = this.routes[page];
  //         if (template) {
  //           // Set the page content from the template
  //           this.contentContainer.innerHTML = template.innerHTML;
  //           // Initialize page-specific components
  //           this.initPageScripts(page);
  //         }
  //       }
        
  //       updateActiveNavLinks(page) {
  //         // Remove active class from all links
  //         document.querySelectorAll('.nav-link').forEach(link => {
  //           link.classList.remove('active');
  //         });
          
  //         // Find links for current page and add active class
  //         document.querySelectorAll('.nav-link').forEach(link => {
  //           if (link.textContent.toLowerCase() === page.toLowerCase()) {
  //             link.classList.add('active');
  //           }
  //         });
  //       }
        
  //       initPageScripts(page) {
  //         // Init page specific functionality if needed
  //         console.log('Page loaded:', page);
          
  //         // Initialize any components
  //         const faqItems = document.querySelectorAll('.faq-item');
  //         if (faqItems.length > 0) {
  //           faqItems.forEach(item => {
  //             const question = item.querySelector('h4');
  //             if (question) {
  //               question.addEventListener('click', () => {
  //                 item.classList.toggle('active');
  //               });
  //             }
  //           });
  //         }
  //       }
  //     }

  //     // Initialize the router when the DOM is loaded
  //     document.addEventListener('DOMContentLoaded', function() {
  //       window.luxeRouter = new LuxeRouter();
  //     });