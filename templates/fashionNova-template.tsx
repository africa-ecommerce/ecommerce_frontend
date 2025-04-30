// // Function to generate the Fashion Nova template HTML
// export function getFashionTemplate(config = {}) {
//   const { isScrolled = false, activeCategory = "women" } = config;

//   // Navigation items
//   const navigationItems = [
//     { label: "New Arrivals", link: "#", featured: true },
//     { label: "Women", link: "#", hasSubmenu: true },
//     { label: "Men", link: "#", hasSubmenu: true },
//     { label: "Accessories", link: "#" },
//     { label: "Sale", link: "#", featured: true },
//     { label: "Collections", link: "#" },
//   ];

//   // Featured products
//   const featuredProducts = [
//     {
//       id: 1,
//       name: "Sleek Bodycon Dress",
//       price: "$39.99",
//       originalPrice: "$59.99",
//       imageUrl:
//         "https://images.unsplash.com/photo-1591047139829-d91aecb6caea?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=600&h=800&q=80",
//       isNew: true,
//       discount: "30% OFF",
//     },
//     {
//       id: 2,
//       name: "Oversized Denim Jacket",
//       price: "$49.99",
//       originalPrice: "$69.99",
//       imageUrl:
//         "https://images.unsplash.com/photo-1551232864-3f0890e580d9?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=600&h=800&q=80",
//       isNew: false,
//       discount: "20% OFF",
//     },
//     {
//       id: 3,
//       name: "High-Waist Skinny Jeans",
//       price: "$34.99",
//       originalPrice: "$54.99",
//       imageUrl:
//         "https://images.unsplash.com/photo-1541099649105-f69ad21f3246?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=600&h=800&q=80",
//       isNew: true,
//       discount: "35% OFF",
//     },
//     {
//       id: 4,
//       name: "Faux Leather Biker Jacket",
//       price: "$59.99",
//       originalPrice: "$89.99",
//       imageUrl:
//         "https://images.unsplash.com/photo-1554412933-514a83d2f3c8?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=600&h=800&q=80",
//       isNew: false,
//       discount: "30% OFF",
//     },
//   ];

//   // Categories
//   const categories = [
//     {
//       name: "Women",
//       imageUrl:
//         "https://images.unsplash.com/photo-1483985988355-763728e1935b?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=800&h=1000&q=80",
//       link: "#",
//     },
//     {
//       name: "Men",
//       imageUrl:
//         "https://images.unsplash.com/photo-1520367445093-50dc08a59d9d?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=800&h=1000&q=80",
//       link: "#",
//     },
//     {
//       name: "Accessories",
//       imageUrl:
//         "https://images.unsplash.com/photo-1590874103328-eac38a683ce7?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=800&h=1000&q=80",
//       link: "#",
//     },
//     {
//       name: "Sale",
//       imageUrl:
//         "https://images.unsplash.com/photo-1445205170230-053b83016050?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=800&h=1000&q=80",
//       link: "#",
//     },
//   ];

//   // Trending categories
//   const trendingCategories = [
//     {
//       name: "Dresses",
//       imageUrl:
//         "https://images.unsplash.com/photo-1539109136881-3be0616acf4b?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=600&h=600&q=80",
//       link: "#",
//     },
//     {
//       name: "Tops",
//       imageUrl:
//         "https://images.unsplash.com/photo-1576566588028-4147f3842f27?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=600&h=600&q=80",
//       link: "#",
//     },
//     {
//       name: "Jeans",
//       imageUrl:
//         "https://images.unsplash.com/photo-1542272604-787c3835535d?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=600&h=600&q=80",
//       link: "#",
//     },
//     {
//       name: "Activewear",
//       imageUrl:
//         "https://images.unsplash.com/photo-1595341888016-a392ef81b7de?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=600&h=600&q=80",
//       link: "#",
//     },
//     {
//       name: "Shoes",
//       imageUrl:
//         "https://images.unsplash.com/photo-1549298916-b41d501d3772?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=600&h=600&q=80",
//       link: "#",
//     },
//     {
//       name: "Accessories",
//       imageUrl:
//         "https://images.unsplash.com/photo-1590874103328-eac38a683ce7?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=600&h=600&q=80",
//       link: "#",
//     },
//   ];

//   // Footer links
//   const footerLinks = {
//     help: [
//       { label: "Customer Service", url: "#" },
//       { label: "Track Order", url: "#" },
//       { label: "Returns & Exchanges", url: "#" },
//       { label: "Shipping", url: "#" },
//       { label: "Contact Us", url: "#" },
//     ],
//     about: [
//       { label: "About Us", url: "#" },
//       { label: "Careers", url: "#" },
//       { label: "Press", url: "#" },
//       { label: "Affiliates", url: "#" },
//     ],
//     legal: [
//       { label: "Terms & Conditions", url: "#" },
//       { label: "Privacy Policy", url: "#" },
//       { label: "Accessibility", url: "#" },
//     ],
//   };

//   // Build navigation HTML
//   const navigationHtml = navigationItems
//     .map(
//       (item) => `
//     <div class="relative group">
//       <a 
//         href="${item.link}" 
//         class="${
//           item.featured ? "text-pink-600" : "text-gray-800"
//         } text-sm font-medium hover:text-pink-600 transition-colors flex items-center"
//       >
//         ${item.label}
//         ${
//           item.hasSubmenu
//             ? '<svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="ml-1 h-4 w-4"><path d="m6 9 6 6 6-6"/></svg>'
//             : ""
//         }
//       </a>
//       ${
//         item.hasSubmenu
//           ? `
//         <div class="absolute left-0 mt-2 w-48 bg-white shadow-lg rounded-md overflow-hidden z-50 opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-300">
//           <div class="py-2">
//             <a href="#" class="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100">Subcategory 1</a>
//             <a href="#" class="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100">Subcategory 2</a>
//             <a href="#" class="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100">Subcategory 3</a>
//           </div>
//         </div>
//       `
//           : ""
//       }
//     </div>
//   `
//     )
//     .join("");

//   // Build mobile menu HTML
//   const mobileMenuHtml = navigationItems
//     .map(
//       (item) => `
//     <li>
//       <a 
//         href="${item.link}" 
//         class="${
//           item.featured ? "text-pink-600" : "text-gray-800"
//         } text-lg font-medium block py-2"
//       >
//         ${item.label}
//       </a>
//     </li>
//   `
//     )
//     .join("");

//   // Build featured products HTML
//   const featuredProductsHtml = featuredProducts
//     .map(
//       (product) => `
//     <div class="group overflow-hidden border-0 shadow-sm">
//       <div class="relative">
//         <div class="overflow-hidden">
//           <img 
//             src="${product.imageUrl}" 
//             alt="${product.name}" 
//             class="w-full h-[400px] object-cover transition-transform duration-500 group-hover:scale-110"
//           />
//         </div>
//         ${
//           product.isNew
//             ? '<span class="absolute top-2 left-2 bg-black text-white px-2 py-1 text-xs rounded-md">NEW</span>'
//             : ""
//         }
//         ${
//           product.discount
//             ? `<span class="absolute top-2 right-2 bg-pink-600 text-white px-2 py-1 text-xs rounded-md">${product.discount}</span>`
//             : ""
//         }
//         <div class="absolute bottom-0 left-0 right-0 bg-white bg-opacity-90 py-2 px-4 transform translate-y-full group-hover:translate-y-0 transition-transform duration-300 flex justify-between">
//           <button class="p-0 h-auto">
//             <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M19 14c1.49-1.46 3-3.21 3-5.5A5.5 5.5 0 0 0 16.5 3c-1.76 0-3 .5-4.5 2-1.5-1.5-2.74-2-4.5-2A5.5 5.5 0 0 0 2 8.5c0 2.3 1.5 4.05 3 5.5l7 7Z"/></svg>
//           </button>
//           <button class="bg-black hover:bg-gray-800 text-white px-3 py-1 text-sm rounded">
//             Add to Cart
//           </button>
//         </div>
//       </div>
//       <div class="p-4">
//         <h3 class="font-medium text-gray-900 mb-1">${product.name}</h3>
//         <div class="flex items-center gap-2">
//           <span class="font-bold text-pink-600">${product.price}</span>
//           ${
//             product.originalPrice
//               ? `<span class="text-gray-500 text-sm line-through">${product.originalPrice}</span>`
//               : ""
//           }
//         </div>
//       </div>
//     </div>
//   `
//     )
//     .join("");

//   // Build categories HTML
//   const categoriesHtml = categories
//     .map(
//       (category) => `
//     <a href="${category.link}" class="group">
//       <div class="relative overflow-hidden rounded-lg">
//         <img 
//           src="${category.imageUrl}" 
//           alt="${category.name}" 
//           class="w-full h-[400px] object-cover transition-transform duration-500 group-hover:scale-105"
//         />
//         <div class="absolute inset-0 bg-black bg-opacity-20 flex items-center justify-center">
//           <h3 class="text-white text-2xl font-bold">${category.name}</h3>
//         </div>
//         <div class="absolute bottom-0 left-0 right-0 bg-white py-3 text-center transform translate-y-full group-hover:translate-y-0 transition-transform duration-300">
//           <span class="font-medium text-gray-900">Shop Now</span>
//         </div>
//       </div>
//     </a>
//   `
//     )
//     .join("");

//   // Build trending categories HTML
//   const trendingCategoriesHtml = trendingCategories
//     .map(
//       (category) => `
//     <a href="${category.link}" class="group">
//       <div class="relative overflow-hidden rounded-full aspect-square">
//         <img 
//           src="${category.imageUrl}" 
//           alt="${category.name}" 
//           class="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
//         />
//         <div class="absolute inset-0 bg-black bg-opacity-20 flex items-center justify-center">
//           <h3 class="text-white text-lg font-bold">${category.name}</h3>
//         </div>
//       </div>
//     </a>
//   `
//     )
//     .join("");

//   // Build footer links HTML
//   const helpLinksHtml = footerLinks.help
//     .map(
//       (link) => `
//     <li>
//       <a href="${link.url}" class="text-gray-400 hover:text-white transition-colors">
//         ${link.label}
//       </a>
//     </li>
//   `
//     )
//     .join("");

//   const aboutLinksHtml = footerLinks.about
//     .map(
//       (link) => `
//     <li>
//       <a href="${link.url}" class="text-gray-400 hover:text-white transition-colors">
//         ${link.label}
//       </a>
//     </li>
//   `
//     )
//     .join("");

//   const legalLinksHtml = footerLinks.legal
//     .map(
//       (link) => `
//     <li>
//       <a href="${link.url}" class="text-gray-400 hover:text-white transition-colors">
//         ${link.label}
//       </a>
//     </li>
//   `
//     )
//     .join("");

//   // Build Instagram feed HTML
//   const instagramFeedHtml = [
//     "https://images.unsplash.com/photo-1525507119028-ed4c629a60a3?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=600&h=600&q=80",
//     "https://images.unsplash.com/photo-1529139574466-a303027c1d8b?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=600&h=600&q=80",
//     "https://images.unsplash.com/photo-1490114538077-0a7f8cb49891?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=600&h=600&q=80",
//     "https://images.unsplash.com/photo-1489987707025-afc232f7ea0f?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=600&h=600&q=80",
//     "https://images.unsplash.com/photo-1492707892479-7bc8d5a4ee93?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=600&h=600&q=80",
//     "https://images.unsplash.com/photo-1492707892479-7bc8d5a4ee93?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=600&h=600&q=80",
//   ]
//     .map(
//       (imageUrl) => `
//     <a href="#" class="group relative overflow-hidden">
//       <img 
//         src="${imageUrl}" 
//         alt="Instagram post" 
//         class="w-full aspect-square object-cover transition-transform duration-500 group-hover:scale-110"
//       />
//       <div class="absolute inset-0 bg-black bg-opacity-0 group-hover:bg-opacity-30 flex items-center justify-center transition-all duration-300">
//         <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="text-white opacity-0 group-hover:opacity-100 transition-opacity duration-300"><rect width="20" height="20" x="2" y="2" rx="5" ry="5"/><path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"/><line x1="17.5" x2="17.51" y1="6.5" y2="6.5"/></svg>
//       </div>
//     </a>
//   `
//     )
//     .join("");

//   // Construct the complete HTML
//   const html = `
//     <!-- Fashion Nova Template -->
//     <div class="min-h-screen flex flex-col">
//       <!-- Announcement Bar -->
//       <div class="bg-black text-white py-2 text-center text-sm">
//         <p>FREE SHIPPING ON ORDERS OVER $75 | USE CODE: FREESHIP</p>
//       </div>

//       <!-- Header -->
//       <header class="sticky top-0 z-50 w-full transition-all duration-300 ${
//         isScrolled ? "bg-white shadow-md" : "bg-white"
//       }">
//         <div class="container mx-auto px-4">
//           <!-- Top Header -->
//           <div class="flex items-center justify-between py-4 border-b border-gray-100">
//             <!-- Mobile Menu Toggle -->
//             <button class="lg:hidden text-gray-800" id="mobileMenuToggle" aria-label="Open menu">
//               <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="h-6 w-6"><line x1="4" x2="20" y1="12" y2="12"/><line x1="4" x2="20" y1="6" y2="6"/><line x1="4" x2="20" y1="18" y2="18"/></svg>
//             </button>

//             <!-- Logo -->
//             <div class="flex-1 lg:flex-initial text-center lg:text-left">
//               <a href="/" class="inline-block">
//                 <h1 class="text-2xl font-bold tracking-tighter">FASHION NOVA</h1>
//               </a>
//             </div>

//             <!-- Desktop Navigation - Hidden on Mobile -->
//             <nav class="hidden lg:flex items-center space-x-8">
//               ${navigationHtml}
//             </nav>

//             <!-- Search, Account, Cart -->
//             <div class="flex items-center space-x-4">
//               <button class="text-gray-800" aria-label="Search">
//                 <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="h-5 w-5"><circle cx="11" cy="11" r="8"/><path d="m21 21-4.3-4.3"/></svg>
//               </button>
//               <button class="text-gray-800" aria-label="Account">
//                 <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="h-5 w-5"><path d="M19 21v-2a4 4 0 0 0-4-4H9a4 4 0 0 0-4 4v2"/><circle cx="12" cy="7" r="4"/></svg>
//               </button>
//               <button class="text-gray-800 relative" aria-label="Cart">
//                 <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="h-5 w-5"><path d="M6 2 3 6v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2V6l-3-4Z"/><path d="M3 6h18"/><path d="M16 10a4 4 0 0 1-8 0"/></svg>
//                 <span class="absolute -top-2 -right-2 h-5 w-5 flex items-center justify-center p-0 bg-pink-600 text-white rounded-full text-xs">3</span>
//               </button>
//             </div>
//           </div>
//         </div>

//         <!-- Mobile Menu -->
//         <div class="mobile-menu hidden" id="mobileMenuContainer">
//           <div class="fixed inset-0 z-50 bg-white overflow-y-auto">
//             <div class="flex justify-between items-center p-4 border-b">
//               <h2 class="text-xl font-bold">Menu</h2>
//               <button id="closeMobileMenu" aria-label="Close menu">
//                 <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="h-6 w-6"><path d="M18 6 6 18"/><path d="m6 6 12 12"/></svg>
//               </button>
//             </div>
//             <nav class="p-4">
//               <ul class="space-y-4">
//                 ${mobileMenuHtml}
//               </ul>
//               <div class="mt-8 border-t pt-4">
//                 <a href="#" class="flex items-center py-2 text-gray-800">
//                   <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="mr-2 h-5 w-5"><path d="M19 21v-2a4 4 0 0 0-4-4H9a4 4 0 0 0-4 4v2"/><circle cx="12" cy="7" r="4"/></svg>
//                   My Account
//                 </a>
//                 <a href="#" class="flex items-center py-2 text-gray-800">
//                   <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="mr-2 h-5 w-5"><path d="M19 14c1.49-1.46 3-3.21 3-5.5A5.5 5.5 0 0 0 16.5 3c-1.76 0-3 .5-4.5 2-1.5-1.5-2.74-2-4.5-2A5.5 5.5 0 0 0 2 8.5c0 2.3 1.5 4.05 3 5.5l7 7Z"/></svg>
//                   Wishlist
//                 </a>
//               </div>
//             </nav>
//           </div>
//         </div>
//       </header>

//       <main>
//         <!-- Hero Section -->
//         <section class="relative h-[70vh] bg-cover bg-center flex items-center" style="background-image: linear-gradient(rgba(0,0,0,0.3), rgba(0,0,0,0.3)), url('https://images.unsplash.com/photo-1469334031218-e382a71b716b?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1920&h=1080&q=80')">
//           <div class="container mx-auto px-4 text-center text-white">
//             <h1 class="text-4xl md:text-6xl font-bold mb-4">Summer Collection 2024</h1>
//             <p class="text-xl md:text-2xl mb-8 max-w-2xl mx-auto">Discover the hottest styles for the season</p>
//             <div class="flex flex-col sm:flex-row gap-4 justify-center">
//               <button class="bg-white text-black hover:bg-gray-100 px-6 py-3 rounded-md font-medium">
//                 Shop Women
//               </button>
//               <button class="bg-black text-white hover:bg-gray-900 px-6 py-3 rounded-md font-medium">
//                 Shop Men
//               </button>
//             </div>
//           </div>
//         </section>

//         <!-- Categories Section -->
//         <section class="py-16 bg-gray-50">
//           <div class="container mx-auto px-4">
//             <h2 class="text-3xl font-bold text-center mb-12">Shop by Category</h2>
//             <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
//               ${categoriesHtml}
//             </div>
//           </div>
//         </section>

//         <!-- Featured Products Section -->
//         <section class="py-16">
//           <div class="container mx-auto px-4">
//             <div class="flex justify-between items-center mb-8">
//               <h2 class="text-3xl font-bold">Featured Products</h2>
//               <div class="flex space-x-2">
//                 <button class="${
//                   activeCategory === "women"
//                     ? "bg-black text-white"
//                     : "bg-white text-black border border-gray-300"
//                 } px-4 py-2 rounded-md font-medium" id="womenCategoryBtn">
//                   Women
//                 </button>
//                 <button class="${
//                   activeCategory === "men"
//                     ? "bg-black text-white"
//                     : "bg-white text-black border border-gray-300"
//                 } px-4 py-2 rounded-md font-medium" id="menCategoryBtn">
//                   Men
//                 </button>
//               </div>
//             </div>
//             <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
// ${featuredProductsHtml}

// </div> <div class="text-center mt-10"> <button class="bg-black text-white hover:bg-gray-900 px-6 py-3 rounded-md font-medium"> View All Products </button> </div> </div> </section> <!-- Trending Categories --> <section class="py-16 bg-gray-50"> <div class="container mx-auto px-4"> <h2 class="text-3xl font-bold text-center mb-12">Trending Categories</h2> <div class="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4"> ${trendingCategoriesHtml} </div> </div> </section> <!-- Newsletter Section --> <section class="py-16 bg-pink-50"> <div class="container mx-auto px-4 max-w-4xl text-center"> <h2 class="text-3xl font-bold mb-4">Join Our Newsletter</h2> <p class="text-gray-600 mb-8"> Subscribe to our newsletter and get 10% off your first purchase plus updates on new arrivals and exclusive offers. </p> <div class="flex flex-col sm:flex-row gap-2 max-w-xl mx-auto"> <input type="email" placeholder="Your email address" class="flex-grow px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-pink-500 focus:border-transparent" /> <button class="bg-black text-white hover:bg-gray-900 px-6 py-3 rounded-md font-medium"> Subscribe </button> </div> </div> </section> <!-- Instagram Feed Section --> <section class="py-16"> <div class="container mx-auto px-4"> <h2 class="text-3xl font-bold text-center mb-4">Follow Us on Instagram</h2> <p class="text-gray-600 text-center mb-8">@fashionnova</p> <div class="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-6 gap-2"> ${instagramFeedHtml} </div> </div> </section> </main> <!-- Footer --> <footer class="bg-gray-900 text-white pt-16 pb-8"> <div class="container mx-auto px-4"> <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 mb-12"> <!-- Company Info --> <div> <h3 class="text-xl font-bold mb-4">FASHION NOVA</h3> <p class="text-gray-400 mb-4"> Fashion Nova is an American fast fashion retail company. The company operates online and has five physical locations. </p> <div class="flex space-x-4"> <a href="#" class="text-gray-400 hover:text-white transition-colors"> <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="h-5 w-5"><path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z"/></svg> </a> <a href="#" class="text-gray-400 hover:text-white transition-colors"> <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="h-5 w-5"><rect width="20" height="20" x="2" y="2" rx="5" ry="5"/><path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"/><line x1="17.5" x2="17.51" y1="6.5" y2="6.5"/></svg> </a> <a href="#" class="text-gray-400 hover:text-white transition-colors"> <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="h-5 w-5"><path d="M22 4s-.7 2.1-2 3.4c1.6 10-9.4 17.3-18 11.6 2.2.1 4.4-.6 6-2C3 15.5.5 9.6 3 5c2.2 2.6 5.6 4.1 9 4-.9-4.2 4-6.6 7-3.8 1.1 0 3-1.2 3-1.2z"/></svg> </a> </div> </div> <!-- Help Links --> <div> <h3 class="text-lg font-bold mb-4">Help</h3> <ul class="space-y-2"> ${helpLinksHtml} </ul> </div> <!-- About Links --> <div> <h3 class="text-lg font-bold mb-4">About</h3> <ul class="space-y-2"> ${aboutLinksHtml} </ul> </div> <!-- Legal Links --> <div> <h3 class="text-lg font-bold mb-4">Legal</h3> <ul class="space-y-2"> ${legalLinksHtml} </ul> </div> </div> <!-- Bottom Footer --> <div class="pt-8 border-t border-gray-800 text-center text-gray-400 text-sm"> <p>© ${new Date().getFullYear()} Fashion Nova. All rights reserved.</p> <p class="mt-2"> This is a demo template. Fashion Nova is a registered trademark of its respective owner. </p> </div> </div> </footer> </div> <!-- JavaScript for Interactivity --> <script> // State management let isScrolled = false; let mobileMenuOpen = false; let activeCategory = "${activeCategory}"; // DOM elements const header = document.getElementById("header"); const mobileMenuToggle = document.getElementById("mobileMenuToggle"); const mobileMenuContainer = document.getElementById("mobileMenuContainer"); const closeMobileMenu = document.getElementById("closeMobileMenu"); const womenCategoryBtn = document.getElementById("womenCategoryBtn"); const menCategoryBtn = document.getElementById("menCategoryBtn"); // Scroll handler for header shadow const handleScroll = () => { const scrolled = window.scrollY > 50; if (scrolled !== isScrolled) { isScrolled = scrolled; header.classList.toggle("shadow-md", isScrolled); } }; // Mobile menu toggle const toggleMobileMenu = () => { mobileMenuOpen = !mobileMenuOpen; mobileMenuContainer.classList.toggle("hidden", !mobileMenuOpen); }; // Category toggle const setActiveCategory = (category) => { if (activeCategory !== category) { activeCategory = category; womenCategoryBtn.classList.toggle("bg-black", category === "women"); womenCategoryBtn.classList.toggle("text-white", category === "women"); womenCategoryBtn.classList.toggle("bg-white", category !== "women"); womenCategoryBtn.classList.toggle("text-black", category !== "women"); womenCategoryBtn.classList.toggle("border", category !== "women"); menCategoryBtn.classList.toggle("bg-black", category === "men"); menCategoryBtn.classList.toggle("text-white", category === "men"); menCategoryBtn.classList.toggle("bg-white", category !== "men"); menCategoryBtn.classList.toggle("text-black", category !== "men"); menCategoryBtn.classList.toggle("border", category !== "men"); // Optionally, refresh featured products here if dynamic filtering is needed } }; // Event listeners window.addEventListener("scroll", handleScroll); mobileMenuToggle.addEventListener("click", toggleMobileMenu); closeMobileMenu.addEventListener("click", toggleMobileMenu); womenCategoryBtn.addEventListener("click", () => setActiveCategory("women")); menCategoryBtn.addEventListener("click", () => setActiveCategory("men")); // Cleanup on page unload window.addEventListener("unload", () => { window.removeEventListener("scroll", handleScroll); mobileMenuToggle.removeEventListener("click", toggleMobileMenu); closeMobileMenu.removeEventListener("click", toggleMobileMenu); womenCategoryBtn.removeEventListener("click", () => {}); menCategoryBtn.removeEventListener("click", () => {}); }); </script> </body> </html> `;
//   return html;
// }


// src/templates/fashion-template.ts
import { BaseTemplate } from "./base-templates";

export class FashionTemplate extends BaseTemplate {
  constructor(config: any = {}) {
    super(config);
  }

  templateSpecificCSS(): string {
    return `
      /* Fashion Template Specific Styles */
      .fashion-template {
        font-family: var(--font-family);
        min-height: 100vh;
        display: flex;
        flex-direction: column;
      }

      /* Announcement Bar */
      .announcement-bar {
        background-color: black;
        color: white;
        padding: 0.5rem 0;
        text-align: center;
        font-size: 0.875rem;
      }

      /* Header */
      .header {
        position: sticky;
        top: 0;
        z-index: 50;
        width: 100%;
        transition: all 0.3s;
        background-color: white;
      }
      
      .header.scrolled {
        box-shadow: 0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -1px rgba(0, 0, 0, 0.06);
      }

      .top-header {
        display: flex;
        align-items: center;
        justify-content: space-between;
        padding: 1rem 0;
        border-bottom: 1px solid #f3f4f6;
      }

      .container {
        width: 100%;
        max-width: 1280px;
        margin: 0 auto;
        padding: 0 1rem;
      }

      /* Logo */
      .logo {
        font-size: 1.5rem;
        font-weight: 700;
        letter-spacing: -0.025em;
      }

      /* Navigation */
      .desktop-nav {
        display: flex;
        align-items: center;
        gap: 2rem;
      }

      .nav-item {
        position: relative;
        display: inline-flex;
        align-items: center;
      }

      .nav-link {
        font-size: 0.875rem;
        font-weight: 500;
        transition: color 0.3s;
      }

      .nav-link.featured {
        color: #db2777;
      }

      .nav-link:hover {
        color: #db2777;
      }

      .submenu {
        position: absolute;
        left: 0;
        top: 100%;
        margin-top: 0.5rem;
        width: 12rem;
        background-color: white;
        border-radius: 0.375rem;
        box-shadow: 0 10px 15px -3px rgba(0, 0, 0, 0.1), 0 4px 6px -2px rgba(0, 0, 0, 0.05);
        opacity: 0;
        visibility: hidden;
        z-index: 50;
        transition: all 0.3s;
      }

      .nav-item:hover .submenu {
        opacity: 1;
        visibility: visible;
      }

      .submenu-item {
        display: block;
        padding: 0.5rem 1rem;
        font-size: 0.875rem;
        color: #374151;
        transition: background-color 0.3s;
      }

      .submenu-item:hover {
        background-color: #f3f4f6;
      }

      /* Mobile Menu */
      .mobile-menu-toggle {
        display: none;
      }

      .mobile-menu {
        display: none;
        position: fixed;
        inset: 0;
        z-index: 50;
        background-color: white;
        overflow-y: auto;
      }

      .mobile-menu.active {
        display: block;
      }

      .mobile-menu-header {
        display: flex;
        justify-content: space-between;
        align-items: center;
        padding: 1rem;
        border-bottom: 1px solid #e5e7eb;
      }

      .mobile-menu-list {
        padding: 1rem;
        list-style-type: none;
      }

      .mobile-menu-item {
        margin-bottom: 1rem;
      }

      .mobile-menu-link {
        display: block;
        padding: 0.5rem 0;
        font-size: 1.125rem;
        font-weight: 500;
      }

      .mobile-menu-link.featured {
        color: #db2777;
      }

      /* Header Actions */
      .header-actions {
        display: flex;
        align-items: center;
        gap: 1rem;
      }

      .action-button {
        color: #1f2937;
        position: relative;
      }

      .cart-count {
        position: absolute;
        top: -0.5rem;
        right: -0.5rem;
        height: 1.25rem;
        width: 1.25rem;
        display: flex;
        align-items: center;
        justify-content: center;
        padding: 0;
        background-color: #db2777;
        color: white;
        border-radius: 9999px;
        font-size: 0.75rem;
      }

      /* Hero Section */
      .hero {
        position: relative;
        height: 70vh;
        background-size: cover;
        background-position: center;
        display: flex;
        align-items: center;
      }

      .hero-content {
        text-align: center;
        color: white;
      }

      .hero-title {
        font-size: 2.25rem;
        font-weight: 700;
        margin-bottom: 1rem;
      }

      .hero-subtitle {
        font-size: 1.25rem;
        margin-bottom: 2rem;
        max-width: 36rem;
        margin-left: auto;
        margin-right: auto;
      }

      .hero-buttons {
        display: flex;
        flex-direction: column;
        gap: 1rem;
        justify-content: center;
      }

      .btn {
        display: inline-block;
        padding: 0.75rem 1.5rem;
        border-radius: 0.375rem;
        font-weight: 500;
        transition: background-color 0.3s;
      }

      .btn-white {
        background-color: white;
        color: black;
      }

      .btn-white:hover {
        background-color: #f3f4f6;
      }

      .btn-black {
        background-color: black;
        color: white;
      }

      .btn-black:hover {
        background-color: #1f2937;
      }

      /* Categories Section */
      .categories-section {
        padding: 4rem 0;
        background-color: #f9fafb;
      }

      .section-title {
        font-size: 1.875rem;
        font-weight: 700;
        text-align: center;
        margin-bottom: 3rem;
      }

      .categories-grid {
        display: grid;
        grid-template-columns: repeat(1, 1fr);
        gap: 1.5rem;
      }

      /* Category Card */
      .category-card {
        position: relative;
        overflow: hidden;
        border-radius: 0.5rem;
      }

      .category-image {
        width: 100%;
        height: 400px;
        object-fit: cover;
        transition: transform 0.5s;
      }

      .category-card:hover .category-image {
        transform: scale(1.05);
      }

      .category-overlay {
        position: absolute;
        inset: 0;
        background-color: rgba(0, 0, 0, 0.2);
        display: flex;
        align-items: center;
        justify-content: center;
      }

      .category-title {
        color: white;
        font-size: 1.5rem;
        font-weight: 700;
      }

      .category-shop-now {
        position: absolute;
        bottom: 0;
        left: 0;
        right: 0;
        background-color: white;
        padding: 0.75rem 0;
        text-align: center;
        transform: translateY(100%);
        transition: transform 0.3s;
      }

      .category-card:hover .category-shop-now {
        transform: translateY(0);
      }

      /* Featured Products */
      .featured-products {
        padding: 4rem 0;
      }

      .featured-header {
        display: flex;
        justify-content: space-between;
        align-items: center;
        margin-bottom: 2rem;
      }

      .category-tabs {
        display: flex;
        gap: 0.5rem;
      }

      .category-tab {
        padding: 0.5rem 1rem;
        border-radius: 0.375rem;
        font-weight: 500;
        transition: all 0.3s;
      }

      .category-tab.active {
        background-color: black;
        color: white;
      }

      .category-tab:not(.active) {
        background-color: white;
        color: black;
        border: 1px solid #d1d5db;
      }

      .products-grid {
        display: grid;
        grid-template-columns: repeat(1, 1fr);
        gap: 1.5rem;
      }

      /* Product Card */
      .product-card {
        overflow: hidden;
        border: 0;
        box-shadow: 0 1px 2px 0 rgba(0, 0, 0, 0.05);
        transition: transform 0.3s;
      }

      .product-image-container {
        position: relative;
        overflow: hidden;
      }

      .product-image {
        width: 100%;
        height: 400px;
        object-fit: cover;
        transition: transform 0.5s;
      }

      .product-card:hover .product-image {
        transform: scale(1.1);
      }

      .product-badge {
        position: absolute;
        top: 0.5rem;
        padding: 0.25rem 0.5rem;
        background-color: black;
        color: white;
        font-size: 0.75rem;
        border-radius: 0.375rem;
      }

      .badge-new {
        left: 0.5rem;
      }

      .badge-discount {
        right: 0.5rem;
        background-color: #db2777;
      }

      .product-actions {
        position: absolute;
        bottom: 0;
        left: 0;
        right: 0;
        background-color: rgba(255, 255, 255, 0.9);
        padding: 0.5rem 1rem;
        display: flex;
        justify-content: space-between;
        transform: translateY(100%);
        transition: transform 0.3s;
      }

      .product-card:hover .product-actions {
        transform: translateY(0);
      }

      .product-details {
        padding: 1rem;
      }

      .product-title {
        font-weight: 500;
        color: #111827;
        margin-bottom: 0.25rem;
      }

      .product-prices {
        display: flex;
        align-items: center;
        gap: 0.5rem;
      }

      .current-price {
        font-weight: 700;
        color: #db2777;
      }

      .original-price {
        color: #6b7280;
        font-size: 0.875rem;
        text-decoration: line-through;
      }

      /* Trending Categories */
      .trending-categories {
        padding: 4rem 0;
        background-color: #f9fafb;
      }

      .trending-grid {
        display: grid;
        grid-template-columns: repeat(2, 1fr);
        gap: 1rem;
      }

      .trending-item {
        position: relative;
        overflow: hidden;
        border-radius: 9999px;
        aspect-ratio: 1/1;
      }

      .trending-image {
        width: 100%;
        height: 100%;
        object-fit: cover;
        transition: transform 0.5s;
      }

      .trending-item:hover .trending-image {
        transform: scale(1.1);
      }

      .trending-overlay {
        position: absolute;
        inset: 0;
        background-color: rgba(0, 0, 0, 0.2);
        display: flex;
        align-items: center;
        justify-content: center;
      }

      .trending-title {
        color: white;
        font-size: 1.125rem;
        font-weight: 700;
      }

      /* Newsletter Section */
      .newsletter {
        padding: 4rem 0;
        background-color: #fdf2f8;
        text-align: center;
      }

      .newsletter-title {
        font-size: 1.875rem;
        font-weight: 700;
        margin-bottom: 1rem;
      }

      .newsletter-text {
        color: #4b5563;
        margin-bottom: 2rem;
        max-width: 36rem;
        margin-left: auto;
        margin-right: auto;
      }

      .newsletter-form {
        display: flex;
        flex-direction: column;
        gap: 0.5rem;
        max-width: 36rem;
        margin: 0 auto;
      }

      .newsletter-input {
        flex-grow: 1;
        padding: 0.5rem 1rem;
        border: 1px solid #d1d5db;
        border-radius: 0.375rem;
        outline: none;
        transition: ring 0.3s;
      }

      .newsletter-input:focus {
        border-color: transparent;
        outline: 2px solid #db2777;
      }

      /* Instagram Feed */
      .instagram-feed {
        padding: 4rem 0;
      }

      .instagram-header {
        text-align: center;
        margin-bottom: 2rem;
      }

      .instagram-title {
        font-size: 1.875rem;
        font-weight: 700;
        margin-bottom: 1rem;
      }

      .instagram-handle {
        color: #4b5563;
        margin-bottom: 2rem;
      }

      .instagram-grid {
        display: grid;
        grid-template-columns: repeat(2, 1fr);
        gap: 0.5rem;
      }

      .instagram-item {
        position: relative;
        overflow: hidden;
      }

      .instagram-image {
        width: 100%;
        aspect-ratio: 1/1;
        object-fit: cover;
        transition: transform 0.5s;
      }

      .instagram-item:hover .instagram-image {
        transform: scale(1.1);
      }

      .instagram-overlay {
        position: absolute;
        inset: 0;
        background-color: rgba(0, 0, 0, 0);
        display: flex;
        align-items: center;
        justify-content: center;
        transition: background-color 0.3s;
      }

      .instagram-item:hover .instagram-overlay {
        background-color: rgba(0, 0, 0, 0.3);
      }

      .instagram-icon {
        color: white;
        opacity: 0;
        transition: opacity 0.3s;
      }

      .instagram-item:hover .instagram-icon {
        opacity: 1;
      }

      /* Footer */
      .footer {
        background-color: #111827;
        color: white;
        padding: 4rem 0 2rem;
      }

      .footer-grid {
        display: grid;
        grid-template-columns: 1fr;
        gap: 2rem;
        margin-bottom: 3rem;
      }

      .footer-column h3 {
        font-size: 1.25rem;
        font-weight: 700;
        margin-bottom: 1rem;
      }

      .footer-text {
        color: #9ca3af;
        margin-bottom: 1rem;
      }

      .social-links {
        display: flex;
        gap: 1rem;
      }

      .social-link {
        color: #9ca3af;
        transition: color 0.3s;
      }

      .social-link:hover {
        color: white;
      }

      .footer-list {
        list-style-type: none;
        padding: 0;
      }

      .footer-item {
        margin-bottom: 0.5rem;
      }

      .footer-link {
        color: #9ca3af;
        transition: color 0.3s;
      }

      .footer-link:hover {
        color: white;
      }

      .footer-bottom {
        padding-top: 2rem;
        border-top: 1px solid #374151;
        text-align: center;
        color: #9ca3af;
        font-size: 0.875rem;
      }

      .footer-copyright {
        margin-bottom: 0.5rem;
      }

      /* Media Queries */
      @media (min-width: 640px) {
        .hero-buttons {
          flex-direction: row;
        }
        
        .newsletter-form {
          flex-direction: row;
        }
      }

      @media (min-width: 768px) {
        .hero-title {
          font-size: 3rem;
        }
        
        .hero-subtitle {
          font-size: 1.5rem;
        }
        
        .categories-grid {
          grid-template-columns: repeat(2, 1fr);
        }
        
        .products-grid {
          grid-template-columns: repeat(2, 1fr);
        }
        
        .trending-grid {
          grid-template-columns: repeat(3, 1fr);
        }
        
        .instagram-grid {
          grid-template-columns: repeat(4, 1fr);
        }
        
        .footer-grid {
          grid-template-columns: repeat(2, 1fr);
        }
      }

      @media (min-width: 1024px) {
        .mobile-menu-toggle {
          display: none;
        }
        
        .desktop-nav {
          display: flex;
        }
        
        .categories-grid {
          grid-template-columns: repeat(4, 1fr);
        }
        
        .products-grid {
          grid-template-columns: repeat(4, 1fr);
        }
        
        .trending-grid {
          grid-template-columns: repeat(6, 1fr);
        }
        
        .instagram-grid {
          grid-template-columns: repeat(6, 1fr);
        }
        
        .footer-grid {
          grid-template-columns: repeat(4, 1fr);
        }
      }

      @media (max-width: 1023px) {
        .desktop-nav {
          display: none;
        }
        
        .mobile-menu-toggle {
          display: block;
        }
      }
    `;
  }

  getNavigationItems() {
    return this.getContent("navigationItems", [
      { label: "New Arrivals", link: "#", featured: true },
      { label: "Women", link: "#", hasSubmenu: true },
      { label: "Men", link: "#", hasSubmenu: true },
      { label: "Accessories", link: "#" },
      { label: "Sale", link: "#", featured: true },
      { label: "Collections", link: "#" },
    ]);
  }

  getFeaturedProducts() {
    return this.getContent("featuredProducts", [
      {
        id: 1,
        name: "Sleek Bodycon Dress",
        price: "$39.99",
        originalPrice: "$59.99",
        imageUrl:
          "https://images.unsplash.com/photo-1591047139829-d91aecb6caea?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=600&h=800&q=80",
        isNew: true,
        discount: "30% OFF",
      },
      {
        id: 2,
        name: "Oversized Denim Jacket",
        price: "$49.99",
        originalPrice: "$69.99",
        imageUrl:
          "https://images.unsplash.com/photo-1551232864-3f0890e580d9?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=600&h=800&q=80",
        isNew: false,
        discount: "20% OFF",
      },
      {
        id: 3,
        name: "High-Waist Skinny Jeans",
        price: "$34.99",
        originalPrice: "$54.99",
        imageUrl:
          "https://images.unsplash.com/photo-1541099649105-f69ad21f3246?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=600&h=800&q=80",
        isNew: true,
        discount: "35% OFF",
      },
      {
        id: 4,
        name: "Faux Leather Biker Jacket",
        price: "$59.99",
        originalPrice: "$89.99",
        imageUrl:
          "https://images.unsplash.com/photo-1554412933-514a83d2f3c8?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=600&h=800&q=80",
        isNew: false,
        discount: "30% OFF",
      },
    ]);
  }

  getCategories() {
    return this.getContent("categories", [
      {
        name: "Women",
        imageUrl:
          "https://images.unsplash.com/photo-1483985988355-763728e1935b?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=800&h=1000&q=80",
        link: "#",
      },
      {
        name: "Men",
        imageUrl:
          "https://images.unsplash.com/photo-1520367445093-50dc08a59d9d?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=800&h=1000&q=80",
        link: "#",
      },
      {
        name: "Accessories",
        imageUrl:
          "https://images.unsplash.com/photo-1590874103328-eac38a683ce7?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=800&h=1000&q=80",
        link: "#",
      },
      {
        name: "Sale",
        imageUrl:
          "https://images.unsplash.com/photo-1445205170230-053b83016050?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=800&h=1000&q=80",
        link: "#",
      },
    ]);
  }

  getTrendingCategories() {
    return this.getContent("trendingCategories", [
      {
        name: "Dresses",
        imageUrl:
          "https://images.unsplash.com/photo-1539109136881-3be0616acf4b?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=600&h=600&q=80",
        link: "#",
      },
      {
        name: "Tops",
        imageUrl:
          "https://images.unsplash.com/photo-1576566588028-4147f3842f27?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=600&h=600&q=80",
        link: "#",
      },
      {
        name: "Jeans",
        imageUrl:
          "https://images.unsplash.com/photo-1542272604-787c3835535d?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=600&h=600&q=80",
        link: "#",
      },
      {
        name: "Activewear",
        imageUrl:
          "https://images.unsplash.com/photo-1595341888016-a392ef81b7de?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=600&h=600&q=80",
        link: "#",
      },
      {
        name: "Shoes",
        imageUrl:
          "https://images.unsplash.com/photo-1549298916-b41d501d3772?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=600&h=600&q=80",
        link: "#",
      },
      {
        name: "Accessories",
        imageUrl:
          "https://images.unsplash.com/photo-1590874103328-eac38a683ce7?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=600&h=600&q=80",
        link: "#",
      },
    ]);
  }

  getFooterLinks() {
    return this.getContent("footerLinks", {
      help: [
        { label: "Customer Service", url: "#" },
        { label: "Track Order", url: "#" },
        { label: "Returns & Exchanges", url: "#" },
        { label: "Shipping", url: "#" },
        { label: "Contact Us", url: "#" },
      ],
      about: [
        { label: "About Us", url: "#" },
        { label: "Careers", url: "#" },
        { label: "Press", url: "#" },
        { label: "Affiliates", url: "#" },
      ],
      legal: [
        { label: "Terms & Conditions", url: "#" },
        { label: "Privacy Policy", url: "#" },
        { label: "Accessibility", url: "#" },
      ],
    });
  }

  getInstagramImages() {
    return this.getContent("instagramImages", [
      "https://images.unsplash.com/photo-1525507119028-ed4c629a60a3?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=600&h=600&q=80",
      "https://images.unsplash.com/photo-1529139574466-a303027c1d8b?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=600&h=600&q=80",
      "https://images.unsplash.com/photo-1490114538077-0a7f8cb49891?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=600&h=600&q=80",
      "https://images.unsplash.com/photo-1489987707025-afc232f7ea0f?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=600&h=600&q=80",
      "https://images.unsplash.com/photo-1492707892479-7bc8d5a4ee93?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=600&h=600&q=80",
      "https://images.unsplash.com/photo-1492707892479-7bc8d5a4ee93?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=600&h=600&q=80",
    ]);
  }

  getHTML(): string {
    return `
      <div class="fashion-template">
        <!-- Announcement Bar -->
        <div class="announcement-bar">
          <p>FREE SHIPPING ON ORDERS OVER $75 | USE CODE: FREESHIP</p>
        </div>

        ${this.generateHeader()}
        
        <main>
          ${this.generateHeroSection()}
          ${this.generateCategoriesSection()}
          ${this.generateFeaturedProductsSection()}
          ${this.generateTrendingCategoriesSection()}
          ${this.generateNewsletterSection()}
          ${this.generateInstagramSection()}
        </main>

        ${this.generateFooter()}
        ${this.generateMobileMenu()}
        ${this.generateScripts()}
      </div>
    `;
  }

  private generateHeader(): string {
    const navigationItems = this.getNavigationItems();
    return `
      <header class="header${this.config.isScrolled ? " scrolled" : ""}">
        <div class="container">
          <div class="top-header">
            <button class="mobile-menu-toggle lg:hidden" id="mobileMenuToggle">
              <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><line x1="4" x2="20" y1="12" y2="12"/><line x1="4" x2="20" y1="6" y2="6"/><line x1="4" x2="20" y1="18" y2="18"/></svg>
            </button>

            <div class="logo">FASHION NOVA</div>

            <div class="header-actions">
              <button class="action-button">
                <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><circle cx="11" cy="11" r="8"/><path d="m21 21-4.3-4.3"/></svg>
              </button>
              <button class="action-button">
                <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M19 21v-2a4 4 0 0 0-4-4H9a4 4 0 0 0-4 4v2"/><circle cx="12" cy="7" r="4"/></svg>
              </button>
              <button class="action-button relative">
                <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M6 2 3 6v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2V6l-3-4Z"/><path d="M3 6h18"/><path d="M16 10a4 4 0 0 1-8 0"/></svg>
                <span class="cart-count">3</span>
              </button>
            </div>
          </div>

          <nav class="desktop-nav">
            ${navigationItems
              .map(
                (item) => `
              <div class="nav-item group">
                <a href="${item.link}" class="nav-link${
                  item.featured ? " featured" : ""
                }">
                  ${item.label}
                  ${
                    item.hasSubmenu
                      ? '<svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="ml-1 h-4 w-4"><path d="m6 9 6 6 6-6"/></svg>'
                      : ""
                  }
                </a>
                ${
                  item.hasSubmenu
                    ? `
                  <div class="submenu">
                    <a href="#" class="submenu-item">Subcategory 1</a>
                    <a href="#" class="submenu-item">Subcategory 2</a>
                    <a href="#" class="submenu-item">Subcategory 3</a>
                  </div>
                `
                    : ""
                }
              </div>
            `
              )
              .join("")}
          </nav>
        </div>
      </header>
    `;
  }

  private generateHeroSection(): string {
    return `
      <section class="hero">
        <div class="container">
          <div class="hero-content">
            <h1 class="hero-title">Summer Collection 2024</h1>
            <p class="hero-subtitle">Discover the hottest styles for the season</p>
            <div class="hero-buttons">
              <a href="#" class="btn btn-white">Shop Women</a>
              <a href="#" class="btn btn-black">Shop Men</a>
            </div>
          </div>
        </div>
      </section>
    `;
  }

  private generateCategoriesSection(): string {
    const categories = this.getCategories();
    return `
      <section class="categories-section">
        <div class="container">
          <h2 class="section-title">Shop by Category</h2>
          <div class="categories-grid">
            ${categories
              .map(
                (category) => `
              <a href="${category.link}" class="category-card">
                <img src="${category.imageUrl}" alt="${category.name}" class="category-image">
                <div class="category-overlay">
                  <h3 class="category-title">${category.name}</h3>
                </div>
                <div class="category-shop-now">Shop Now</div>
              </a>
            `
              )
              .join("")}
          </div>
        </div>
      </section>
    `;
  }

  private generateFeaturedProductsSection(): string {
    const products = this.getFeaturedProducts();
    return `
      <section class="featured-products">
        <div class="container">
          <div class="featured-header">
            <h2 class="section-title">Featured Products</h2>
            <div class="category-tabs">
              <button class="category-tab${
                this.config.activeCategory === "women" ? " active" : ""
              }" id="womenCategoryBtn">
                Women
              </button>
              <button class="category-tab${
                this.config.activeCategory === "men" ? " active" : ""
              }" id="menCategoryBtn">
                Men
              </button>
            </div>
          </div>
          <div class="products-grid">
            ${products
              .map(
                (product) => `
              <div class="product-card">
                <div class="product-image-container">
                  <img src="${product.imageUrl}" alt="${
                  product.name
                }" class="product-image">
                  ${
                    product.isNew
                      ? '<span class="product-badge badge-new">NEW</span>'
                      : ""
                  }
                  ${
                    product.discount
                      ? `<span class="product-badge badge-discount">${product.discount}</span>`
                      : ""
                  }
                  <div class="product-actions">
                    <button class="action-button">
                      <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M19 14c1.49-1.46 3-3.21 3-5.5A5.5 5.5 0 0 0 16.5 3c-1.76 0-3 .5-4.5 2-1.5-1.5-2.74-2-4.5-2A5.5 5.5 0 0 0 2 8.5c0 2.3 1.5 4.05 3 5.5l7 7Z"/></svg>
                    </button>
                    <button class="btn btn-black">Add to Cart</button>
                  </div>
                </div>
                <div class="product-details">
                  <h3 class="product-title">${product.name}</h3>
                  <div class="product-prices">
                    <span class="current-price">${product.price}</span>
                    ${
                      product.originalPrice
                        ? `<span class="original-price">${product.originalPrice}</span>`
                        : ""
                    }
                  </div>
                </div>
              </div>
            `
              )
              .join("")}
          </div>
        </div>
      </section>
    `;
  }

  private generateTrendingCategoriesSection(): string {
    const trending = this.getTrendingCategories();
    return `
      <section class="trending-categories">
        <div class="container">
          <h2 class="section-title">Trending Categories</h2>
          <div class="trending-grid">
            ${trending
              .map(
                (category) => `
              <a href="${category.link}" class="trending-item">
                <img src="${category.imageUrl}" alt="${category.name}" class="trending-image">
                <div class="trending-overlay">
                  <h3 class="trending-title">${category.name}</h3>
                </div>
              </a>
            `
              )
              .join("")}
          </div>
        </div>
      </section>
    `;
  }

  private generateNewsletterSection(): string {
    return `
      <section class="newsletter">
        <div class="container">
          <h2 class="newsletter-title">Join Our Newsletter</h2>
          <p class="newsletter-text">Subscribe to our newsletter and get 10% off your first purchase plus updates on new arrivals and exclusive offers.</p>
          <form class="newsletter-form">
            <input type="email" placeholder="Your email address" class="newsletter-input">
            <button type="submit" class="btn btn-black">Subscribe</button>
          </form>
        </div>
      </section>
    `;
  }

  private generateInstagramSection(): string {
    const images = this.getInstagramImages();
    return `
      <section class="instagram-feed">
        <div class="container">
          <div class="instagram-header">
            <h2 class="instagram-title">Follow Us on Instagram</h2>
            <p class="instagram-handle">@fashionnova</p>
          </div>
          <div class="instagram-grid">
            ${images
              .map(
                (image) => `
              <a href="#" class="instagram-item">
                <img src="${image}" alt="Instagram post" class="instagram-image">
                <div class="instagram-overlay">
                  <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="instagram-icon"><rect width="20" height="20" x="2" y="2" rx="5" ry="5"/><path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"/><line x1="17.5" x2="17.51" y1="6.5" y2="6.5"/></svg>
                </div>
              </a>
            `
              )
              .join("")}
          </div>
        </div>
      </section>
    `;
  }

  private generateFooter(): string {
    const footerLinks = this.getFooterLinks();
    return `
      <footer class="footer">
        <div class="container">
          <div class="footer-grid">
            <div>
              <h3>FASHION NOVA</h3>
              <p class="footer-text">Fashion Nova is an American fast fashion retail company. The company operates online and has five physical locations.</p>
              <div class="social-links">
                <a href="#" class="social-link">
                  <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z"/></svg>
                </a>
                <a href="#" class="social-link">
                  <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><rect width="20" height="20" x="2" y="2" rx="5" ry="5"/><path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"/><line x1="17.5" x2="17.51" y1="6.5" y2="6.5"/></svg>
                </a>
                <a href="#" class="social-link">
                  <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M22 4s-.7 2.1-2 3.4c1.6 10-9.4 17.3-18 11.6 2.2.1 4.4-.6 6-2C3 15.5.5 9.6 3 5c2.2 2.6 5.6 4.1 9 4-.9-4.2 4-6.6 7-3.8 1.1 0 3-1.2 3-1.2z"/></svg>
                </a>
              </div>
            </div>

            <div>
              <h3>Help</h3>
              <ul class="footer-list">
                ${footerLinks.help
                  .map(
                    (link) => `
                  <li class="footer-item"><a href="${link.url}" class="footer-link">${link.label}</a></li>
                `
                  )
                  .join("")}
              </ul>
            </div>

            <div>
              <h3>About</h3>
              <ul class="footer-list">
                ${footerLinks.about
                  .map(
                    (link) => `
                  <li class="footer-item"><a href="${link.url}" class="footer-link">${link.label}</a></li>
                `
                  )
                  .join("")}
              </ul>
            </div>

            <div>
              <h3>Legal</h3>
              <ul class="footer-list">
                ${footerLinks.legal
                  .map(
                    (link) => `
                  <li class="footer-item"><a href="${link.url}" class="footer-link">${link.label}</a></li>
                `
                  )
                  .join("")}
              </ul>
            </div>
          </div>

          <div class="footer-bottom">
            <p class="footer-copyright">© ${new Date().getFullYear()} Fashion Nova. All rights reserved.</p>
            <p>This is a demo template. Fashion Nova is a registered trademark of its respective owner.</p>
          </div>
        </div>
      </footer>
    `;
  }

  private generateMobileMenu(): string {
    const navigationItems = this.getNavigationItems();
    return `
      <div class="mobile-menu" id="mobileMenuContainer">
        <div class="mobile-menu-header">
          <h2>Menu</h2>
          <button id="closeMobileMenu">
            <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M18 6 6 18"/><path d="m6 6 12 12"/></svg>
          </button>
        </div>
        <nav>
          <ul class="mobile-menu-list">
            ${navigationItems
              .map(
                (item) => `
              <li class="mobile-menu-item">
                <a href="${item.link}" class="mobile-menu-link${
                  item.featured ? " featured" : ""
                }">${item.label}</a>
              </li>
            `
              )
              .join("")}
          </ul>
        </nav>
      </div>
    `;
  }

  private generateScripts(): string {
    return `
      <script>
        document.addEventListener('DOMContentLoaded', function() {
          // Mobile menu toggle
          const mobileMenuToggle = document.getElementById('mobileMenuToggle');
          const mobileMenu = document.getElementById('mobileMenuContainer');
          const closeMobileMenu = document.getElementById('closeMobileMenu');

          if (mobileMenuToggle && mobileMenu) {
            mobileMenuToggle.addEventListener('click', () => {
              mobileMenu.classList.toggle('active');
            });
          }

          if (closeMobileMenu) {
            closeMobileMenu.addEventListener('click', () => {
              mobileMenu.classList.remove('active');
            });
          }

          // Category tabs
          const womenCategoryBtn = document.getElementById('womenCategoryBtn');
          const menCategoryBtn = document.getElementById('menCategoryBtn');

          const setActiveCategory = (category) => {
            const buttons = [womenCategoryBtn, menCategoryBtn];
            buttons.forEach(btn => {
              btn.classList.remove('active');
              btn.classList.add('bg-white', 'text-black', 'border');
            });

            const activeBtn = category === 'women' ? womenCategoryBtn : menCategoryBtn;
            activeBtn.classList.add('active', 'bg-black', 'text-white');
            activeBtn.classList.remove('bg-white', 'text-black', 'border');
          };

          if (womenCategoryBtn && menCategoryBtn) {
            womenCategoryBtn.addEventListener('click', () => setActiveCategory('women'));
            menCategoryBtn.addEventListener('click', () => setActiveCategory('men'));
          }

          // Scroll handler
          const header = document.querySelector('.header');
          window.addEventListener('scroll', () => {
            const scrolled = window.scrollY > 50;
            header.classList.toggle('scrolled', scrolled);
          });
        });
      </script>
    `;
  }
}

export function getFashionTemplate(config: any): string {
  const template = new FashionTemplate(config);
  return `
    <style>
      ${template.templateSpecificCSS()}
    </style>
    ${template.getHTML()}
  `;
}