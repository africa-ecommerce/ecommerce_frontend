


// "use client"

// import { useState, useEffect } from "react"
// import Image from "next/image"
// import Link from "next/link"
// import { Button } from "@/components/ui/button"
// import {
//   ShoppingBag,
//   Store,
//   Truck,
//   CreditCard,
//   Smartphone,
//   Package,
//   CheckCircle,
//   Star,
//   MessageCircle,
//   X,
//   Menu,
//   ArrowRight,
//   Users,
//   TrendingUp,
//   Shield,
//   Zap,
//   Target,
//   DollarSign,
//   Award,
//   Verified,
// } from "lucide-react"

// import PWAInstallPrompt from "./pwa-install-prompt"

// export default function Home() {
//   const [mobileMenuOpen, setMobileMenuOpen] = useState(false)
//   const [scrolled, setScrolled] = useState(false)
//   const [selectedUserType, setSelectedUserType] = useState<"supplier" | "plug" | null>(null)
//   const [activeTab, setActiveTab] = useState<"supplier" | "plug">("plug")

//   // Handle scroll event
//   useEffect(() => {
//     const handleScroll = () => {
//       setScrolled(window.scrollY > 10)
//     }
//     window.addEventListener("scroll", handleScroll)
//     return () => window.removeEventListener("scroll", handleScroll)
//   }, [])

//   // Scroll to section function
//   const scrollToSection = (sectionId: string) => {
//     const section = document.getElementById(sectionId)
//     if (section) {
//       section.scrollIntoView({ behavior: "smooth" })
//       setMobileMenuOpen(false)
//     }
//   }

//   // Close mobile menu when window is resized
//   useEffect(() => {
//     const handleResize = () => {
//       if (window.innerWidth >= 768 && mobileMenuOpen) {
//         setMobileMenuOpen(false)
//       }
//     }
//     window.addEventListener("resize", handleResize)
//     return () => window.removeEventListener("resize", handleResize)
//   }, [mobileMenuOpen])

//   // Prevent body scroll when mobile menu is open
//   useEffect(() => {
//     if (mobileMenuOpen) {
//       document.body.style.overflow = "hidden"
//     } else {
//       document.body.style.overflow = "auto"
//     }
//     return () => {
//       document.body.style.overflow = "auto"
//     }
//   }, [mobileMenuOpen])

//   return (
//     <div className="flex min-h-screen flex-col">
//       <PWAInstallPrompt />

//       {/* Navigation */}
//       <header
//         className={`sticky top-0 z-40 w-full transition-all duration-300 ${
//           scrolled ? "bg-white/95 backdrop-blur-md shadow-sm border-b border-orange-100" : "bg-transparent"
//         }`}
//       >
//         <div className="container flex h-16 items-center justify-between px-4 md:px-6">
//           <div className="flex items-center gap-2">
//             <Link href="/" className="flex items-center gap-2">
//               <Image src="/pluggn_logo.png" alt="Pluggn Logo" width={140} height={35} priority className="h-auto" />
//             </Link>
//           </div>
//           <nav className="hidden md:flex gap-6">
//             <button
//               onClick={() => scrollToSection("how-it-works")}
//               className="text-sm font-medium hover:text-[#FF7A21] transition-colors"
//             >
//               How It Works
//             </button>
//             <button
//               onClick={() => scrollToSection("success-stories")}
//               className="text-sm font-medium hover:text-[#FF7A21] transition-colors"
//             >
//               Success Stories
//             </button>
//             <button
//               onClick={() => scrollToSection("faq")}
//               className="text-sm font-medium hover:text-[#FF7A21] transition-colors"
//             >
//               FAQ
//             </button>
//           </nav>
//           <div className="flex items-center gap-4">
//             <Link
//               href="/auth/login"
//               className="hidden md:inline-flex h-9 items-center justify-center rounded-md border border-[#FF7A21] px-4 py-2 text-sm font-medium text-[#FF7A21] transition-colors hover:bg-[#FF7A21] hover:text-white"
//             >
//               Sign In
//             </Link>
//             <Button className="bg-[#FF7A21] hover:bg-[#e86b12] text-white shadow-lg">
//               <Link href="/auth/register">Get Started</Link>
//             </Button>
//             <button
//               className="md:hidden flex items-center justify-center h-10 w-10 rounded-md hover:bg-gray-100 transition-colors"
//               onClick={() => setMobileMenuOpen(true)}
//               aria-label="Open menu"
//             >
//               <Menu className="h-6 w-6" />
//             </button>
//           </div>
//         </div>
//       </header>

//       {/* Mobile Menu */}
//       <div
//         className={`fixed inset-0 z-50 bg-black bg-opacity-50 transition-opacity duration-300 ${
//           mobileMenuOpen ? "opacity-100" : "opacity-0 pointer-events-none"
//         }`}
//         onClick={() => setMobileMenuOpen(false)}
//       ></div>
//       <div
//         className={`fixed top-0 right-0 z-50 h-full w-[75%] max-w-[300px] bg-white shadow-xl transform transition-transform duration-300 ease-in-out ${
//           mobileMenuOpen ? "translate-x-0" : "translate-x-full"
//         } flex flex-col`}
//       >
//         <div className="flex items-center justify-between p-4 border-b">
//           <Image src="/pluggn_logo.png" alt="Pluggn Logo" width={120} height={30} priority className="h-auto" />
//           <button
//             onClick={() => setMobileMenuOpen(false)}
//             className="h-10 w-10 flex items-center justify-center rounded-md hover:bg-gray-100"
//             aria-label="Close menu"
//           >
//             <X className="h-5 w-5" />
//           </button>
//         </div>
//         <nav className="flex flex-col p-4 space-y-4">
//           <button
//             onClick={() => scrollToSection("how-it-works")}
//             className="text-base font-medium py-2 hover:text-[#FF7A21] transition-colors text-left"
//           >
//             How It Works
//           </button>
//           <button
//             onClick={() => scrollToSection("success-stories")}
//             className="text-base font-medium py-2 hover:text-[#FF7A21] transition-colors text-left"
//           >
//             Success Stories
//           </button>
//           <button
//             onClick={() => scrollToSection("faq")}
//             className="text-base font-medium py-2 hover:text-[#FF7A21] transition-colors text-left"
//           >
//             FAQ
//           </button>
//           <div className="pt-4 border-t">
//             <Link
//               href="/auth/login"
//               className="block w-full py-2 px-4 text-center rounded-md border border-[#FF7A21] text-[#FF7A21] font-medium mb-3"
//             >
//               Sign In
//             </Link>
//             <Link
//               href="/auth/register"
//               className="block w-full py-2 px-4 text-center rounded-md bg-gradient-to-r from-[#FF7A21] to-[#ff8c42] text-white font-medium"
//             >
//               Get Started
//             </Link>
//           </div>
//         </nav>
//       </div>

//       <main className="flex-1">
//         {/* Hero Section */}
//         <section className="w-full py-12 md:py-20 lg:py-28 bg-gradient-to-br from-white via-orange-50 to-pink-50 relative overflow-hidden">
//           {/* Background decoration */}
//           <div className="absolute inset-0 bg-gradient-to-r from-[#FF7A21]/5 to-[#ff8c42]/5"></div>
//           <div className="absolute top-20 right-10 w-72 h-72 bg-gradient-to-br from-[#FF7A21]/10 to-[#ff8c42]/10 rounded-full blur-3xl"></div>
//           <div className="absolute bottom-20 left-10 w-96 h-96 bg-gradient-to-br from-[#ff8c42]/10 to-[#ffb366]/10 rounded-full blur-3xl"></div>

//           <div className="container px-4 md:px-6 relative z-10">
//             <div className="flex flex-col items-center text-center space-y-8 max-w-4xl mx-auto">
//               {/* Trust indicators */}
//               <div className="flex items-center gap-2 bg-white/80 backdrop-blur-sm rounded-full px-4 py-2 shadow-sm">
//                 <div className="flex">
//                   {[...Array(5)].map((_, i) => (
//                     <Star key={i} className="h-4 w-4 fill-[#FF7A21] text-[#FF7A21]" />
//                   ))}
//                 </div>
//                 <span className="text-xs md:text-sm text-gray-600 font-medium">Trusted by 5,000+ entrepreneurs</span>
//               </div>

//               {/* Main headline */}
//               <div className="space-y-4">
//                 <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold tracking-tight text-gray-900">
//                   <span className="bg-[#FF7A21] bg-clip-text text-transparent">Sell Online</span> Without Inventory,
//                   Logistics, or Technical Hassles
//                   <br />
//                   <span className="text-xl md:text-2xl">Just Pluggn</span>
//                 </h1>
//                 <p className="text-base md:text-lg text-gray-600 max-w-3xl mx-auto leading-relaxed">
//                   Africa’s fastest-growing social commerce platform—where anyone can build a business without inventory upfront
//                   or logistics. When purchasing from a Pluggn store, buyers can be totally assured of premium product
//                   quality and secure transactions, as all products are carefully curated and verified by our expert
//                   team.
//                 </p>
//               </div>

//               {/* Buyer Assurance Badge */}
//               <div className="bg-white/90 backdrop-blur-sm rounded-2xl px-6 py-4 shadow-lg border border-orange-200">
//                 <div className="flex items-center gap-3">
//                   <div className="w-12 h-12 bg-green-100 rounded-full flex items-center justify-center">
//                     <Verified className="h-6 w-6 text-green-600" />
//                   </div>
//                   <div className="text-left">
//                     <h3 className="font-bold text-gray-900 text-sm md:text-base">100% Buyer Protection Guarantee</h3>
//                     <p className="text-gray-600 text-xs md:text-sm">
//                       Quality-verified products • Secure payments • Full refund protection
//                     </p>
//                   </div>
//                 </div>
//               </div>

//               {/* User Type Selector */}
//               <div className="w-full max-w-2xl">
//                 <p className="text-lg font-semibold text-gray-700 mb-6">Choose your path to success:</p>
//                 <div className="grid md:grid-cols-2 gap-4">
//                   <button
//                     onClick={() => {
//                       setSelectedUserType("supplier")
//                       scrollToSection("suppliers-section")
//                     }}
//                     className="group relative bg-white hover:bg-[#FF7A21] border-2 border-[#FF7A21] rounded-2xl p-6 transition-all duration-300 hover:shadow-2xl hover:scale-105 hover:text-white"
//                   >
//                     <div className="flex items-center justify-center mb-4">
//                       <Store className="h-12 w-12 text-[#FF7A21] group-hover:text-white transition-colors" />
//                     </div>
//                     <h3 className="text-lg font-bold mb-2 text-gray-900 group-hover:text-white">
//                       I Have Products to Sell
//                     </h3>
//                     <p className="text-gray-600 group-hover:text-white/90 text-sm">
//                       Multiply your sales channels through our network of social sellers
//                     </p>
//                     <ArrowRight className="h-5 w-5 absolute top-4 right-4 text-[#FF7A21] group-hover:text-white transition-colors" />
//                   </button>
//                   <button
//                     onClick={() => {
//                       setSelectedUserType("plug")
//                       scrollToSection("plugs-section")
//                     }}
//                     className="group relative bg-[#FF7A21] text-white border-2 border-[#FF7A21] rounded-2xl p-6 transition-all duration-300 hover:shadow-2xl hover:scale-105"
//                   >
//                     <div className="flex items-center justify-center mb-4">
//                       <Smartphone className="h-12 w-12 text-white" />
//                     </div>
//                     <h3 className="text-lg font-bold mb-2">I Want to Sell Online</h3>
//                     <p className="text-white/90 text-sm">
//                       Start selling without inventory, logistics issues, or upfront costs
//                     </p>
//                     <ArrowRight className="h-5 w-5 absolute top-4 right-4 text-white" />
//                   </button>
//                 </div>
//               </div>

//               {/* Quick stats */}
//               <div className="grid grid-cols-3 gap-8 pt-8">
//                 <div className="text-center">
//                   <div className="text-xl md:text-2xl font-bold text-[#FF7A21]">5K+</div>
//                   <div className="text-sm text-gray-600">Active Users</div>
//                 </div>
//                 <div className="text-center">
//                   <div className="text-xl md:text-2xl font-bold text-[#FF7A21]">₦2M+</div>
//                   <div className="text-sm text-gray-600">Monthly Sales</div>
//                 </div>
//                 <div className="text-center">
//                   <div className="text-xl md:text-2xl font-bold text-[#FF7A21]">99%</div>
//                   <div className="text-sm text-gray-600">Success Rate</div>
//                 </div>
//               </div>
//             </div>
//           </div>
//         </section>
//                {/* Plugs Section - Detailed & Expansive */}

//         <section
//           id="plugs-section"
//           className="w-full py-16 md:py-20 bg-gradient-to-br from-orange-50 to-pink-50 scroll-mt-16"
//         >
//           <div className="container px-4 md:px-6">
//             <div className="max-w-6xl mx-auto">
//               <div className="text-center mb-12">
//                 <div className="inline-flex items-center gap-2 bg-white rounded-full px-4 py-2 mb-4 shadow-sm">
//                   <Smartphone className="h-5 w-5 text-[#FF7A21]" />
//                   <span className="text-[#FF7A21] font-semibold">For Plugs (Social Sellers)</span>
//                 </div>
//                 <h2 className="text-2xl md:text-3xl font-bold text-gray-900 mb-4">Start Your Online Business Today</h2>
//                 <p className="text-lg md:text-xl text-gray-600 max-w-3xl mx-auto">
//                   Start selling products online without inventory, logistics issues, or technical skills. Join
//                   thousands making ₦100K+ monthly.
//                 </p>
//               </div>

//               {/* What Plugs Do */}
//               <div className="bg-white rounded-3xl p-8 md:p-12 shadow-lg mb-12">
//                 <h3 className="text-2xl md:text-3xl font-bold text-center mb-8">What Plugs Do</h3>
//                 <div className="grid md:grid-cols-3 gap-8">
//                   <div className="text-center">
//                     <div className="w-16 h-16 bg-[#FF7A21]  rounded-2xl flex items-center justify-center mx-auto mb-4">
//                       <ShoppingBag className="h-8 w-8 text-white" />
//                     </div>
//                     <h4 className="font-bold mb-2">Choose Products</h4>
//                     <p className="text-gray-600 text-sm">Discover and select products you want to sell</p>
//                   </div>
//                   <div className="text-center">
//                     <div className="w-16 h-16 bg-[#FF7A21]  rounded-2xl flex items-center justify-center mx-auto mb-4">
//                       <DollarSign className="h-8 w-8 text-white" />
//                     </div>
//                     <h4 className="font-bold mb-2">Set Your Prices</h4>
//                     <p className="text-gray-600 text-sm">
//                       Add your profit margin to each product—you control your profit
//                     </p>
//                   </div>
//                   <div className="text-center">
//                     <div className="w-16 h-16 bg-[#FF7A21]  rounded-2xl flex items-center justify-center mx-auto mb-4">
//                       <MessageCircle className="h-8 w-8 text-white" />
//                     </div>
//                     <h4 className="font-bold mb-2">Share</h4>
//                     <p className="text-gray-600 text-sm">Share on social media or your store and withdraw your margin when you make a sale</p>
//                   </div>
//                 </div>
//               </div>

//               {/* Store Creation */}
//               <div className="grid lg:grid-cols-2 gap-12 items-center mb-12">
//                 <div>
//                   <h3 className="text-2xl md:text-3xl font-bold mb-6">Build Your Professional Store</h3>
//                   <div className="space-y-4">
//                     <div className="flex items-start gap-3">
//                       <CheckCircle className="h-6 w-6 text-[#FF7A21] mt-0.5 flex-shrink-0" />
//                       <div>
//                         <h4 className="font-semibold">No-Code Store Builder</h4>
//                         <p className="text-gray-600 text-sm">
//                           Create a professional online store in minutes without technical skills
//                         </p>
//                       </div>
//                     </div>
//                     <div className="flex items-start gap-3">
//                       <CheckCircle className="h-6 w-6 text-[#FF7A21] mt-0.5 flex-shrink-0" />
//                       <div>
//                         <h4 className="font-semibold">Fully Customizable</h4>
//                         <p className="text-gray-600 text-sm">
//                           Add your branding, colors, and personal touch to stand out
//                         </p>
//                       </div>
//                     </div>
//                     <div className="flex items-start gap-3">
//                       <CheckCircle className="h-6 w-6 text-[#FF7A21] mt-0.5 flex-shrink-0" />
//                       <div>
//                         <h4 className="font-semibold">Mobile-Optimized</h4>
//                         <p className="text-gray-600 text-sm">Your store looks perfect on all devices automatically</p>
//                       </div>
//                     </div>
//                   </div>
//                 </div>
//                 <div className="relative">
//                   <div className="bg-white rounded-2xl p-6 shadow-xl">
//                     <Image
//                       src="/store-builder-interface.png"
//                       alt="Store Builder Interface"
//                       width={400}
//                       height={400}
//                       className="rounded-lg"
//                     />
//                   </div>
//                 </div>
//               </div>

//               {/* Social Selling */}
//               <div className="bg-white rounded-3xl p-8 md:p-12 shadow-lg mb-12">
//                 <h3 className="text-2xl md:text-3xl font-bold text-center mb-8">Social Media Made Easy</h3>
//                 <div className="grid md:grid-cols-2 gap-8 items-center">
//                   <div>
//                     <div className="space-y-4">
//                       <div className="flex items-start gap-3">
//                         <div className="w-8 h-8 bg-[#FF7A21] rounded-full flex items-center justify-center flex-shrink-0">
//                           <span className="text-white text-sm font-bold">1</span>
//                         </div>
//                         <div>
//                           <h4 className="font-semibold">Magazine-Style Product Cards</h4>
//                           <p className="text-gray-600 text-sm">
//                             Beautiful, professional product images generated automatically
//                           </p>
//                         </div>
//                       </div>
//                       <div className="flex items-start gap-3">
//                         <div className="w-8 h-8 bg-[#FF7A21] rounded-full flex items-center justify-center flex-shrink-0">
//                           <span className="text-white text-sm font-bold">2</span>
//                         </div>
//                         <div>
//                           <h4 className="font-semibold">One-Click Sharing</h4>
//                           <p className="text-gray-600 text-sm">
//                             Share to WhatsApp, Instagram, Facebook, and more instantly
//                           </p>
//                         </div>
//                       </div>
//                       <div className="flex items-start gap-3">
//                         <div className="w-8 h-8 bg-[#FF7A21] rounded-full flex items-center justify-center flex-shrink-0">
//                           <span className="text-white text-sm font-bold">3</span>
//                         </div>
//                         <div>
//                           <h4 className="font-semibold">Automatic Checkout</h4>
//                           <p className="text-gray-600 text-sm">
//                             Customers click your link and go straight to secure checkout
//                           </p>
//                         </div>
//                       </div>
//                     </div>
//                   </div>
//                   <div className="bg-gradient-to-br from-orange-100 to-pink-100 rounded-2xl p-6">
//                     <Image
//                       src="/product-card.png"
//                       alt="Social Media Card"
//                       width={300}
//                       height={250}
//                       className="rounded-lg mx-auto"
//                     />
//                   </div>
//                 </div>
//               </div>

//               {/* Earning Process */}
//               <div className="bg-[#FF7A21]  rounded-3xl p-8 md:p-12 text-white mb-12">
//                 <h3 className="text-2xl md:text-3xl font-bold text-center mb-8">How You make sales and money</h3>
//                 <div className="grid md:grid-cols-4 gap-6">
//                   <div className="text-center">
//                     <div className="w-16 h-16 bg-white/20 rounded-2xl flex items-center justify-center mx-auto mb-4">
//                       <Target className="h-8 w-8 text-white" />
//                     </div>
//                     <h4 className="font-bold mb-2">Set Your Margin</h4>
//                     <p className="text-white/90 text-sm">Add 20-50% profit to any product</p>
//                   </div>
//                   <div className="text-center">
//                     <div className="w-16 h-16 bg-white/20 rounded-2xl flex items-center justify-center mx-auto mb-4">
//                       <Users className="h-8 w-8 text-white" />
//                     </div>
//                     <h4 className="font-bold mb-2">Customer Orders</h4>
//                     <p className="text-white/90 text-sm">Share your product on social media and Buyers purchase through your links</p>
//                   </div>
//                   <div className="text-center">
//                     <div className="w-16 h-16 bg-white/20 rounded-2xl flex items-center justify-center mx-auto mb-4">
//                       <Truck className="h-8 w-8 text-white" />
//                     </div>
//                     <h4 className="font-bold mb-2">We Handle Delivery</h4>
//                     <p className="text-white/90 text-sm">Product ships directly to customer</p>
//                   </div>
//                   <div className="text-center">
//                     <div className="w-16 h-16 bg-white/20 rounded-2xl flex items-center justify-center mx-auto mb-4">
//                       <CreditCard className="h-8 w-8 text-white" />
//                     </div>
//                     <h4 className="font-bold mb-2">Get Paid</h4>
//                     <p className="text-white/90 text-sm">Withdraw your margin after delivery</p>
//                   </div>
//                 </div>
//               </div>

//               <div className="bg-white rounded-3xl p-4 sm:p-6 md:p-8 shadow-lg mb-8 sm:mb-10 md:mb-12">
//                 <h3 className="text-xl sm:text-2xl md:text-3xl font-bold text-center mb-4 sm:mb-6 md:mb-8">
//                   Real Example
//                 </h3>
//                 <div className="max-w-xl mx-auto">
//                   <div className="bg-gradient-to-br from-orange-50 to-pink-50 rounded-2xl p-4 sm:p-6 mb-4 sm:mb-6">
//                     <div className="text-center">
//                       <Image
//                         src="/product-example.PNG"
//                         alt="Wrist watch Example"
//                         width={160}
//                         height={160}
//                         className="mx-auto rounded-lg mb-3 sm:mb-4"
//                       />
//                       <h4 className="text-lg sm:text-xl font-bold mb-2 sm:mb-4">Rolex Wrist watch</h4>
//                       <div className="grid grid-cols-3 gap-2 sm:gap-4 text-center">
//                         <div>
//                           <div className="text-base md:text-xl font-bold text-gray-600">₦35,000</div>
//                           <div className="text-xs sm:text-sm text-gray-500">Supplier Price</div>
//                         </div>
//                         <div>
//                           <div className="text-base md:text-xl font-bold text-[#FF7A21]">₦40,000</div>
//                           <div className="text-xs sm:text-sm text-gray-500">Your Price</div>
//                         </div>
//                         <div>
//                           <div className="text-base md:text-xl font-bold text-green-600">₦4,500</div>
//                           <div className="text-xs sm:text-sm text-gray-500">Your Profit*</div>
//                         </div>
//                       </div>
//                       <p className="text-[10px] sm:text-xs text-gray-500 mt-2">*After platform commission</p>
//                     </div>
//                   </div>
//                   <div className="text-center px-2 sm:px-4">
//                     <p className="text-base sm:text-lg text-gray-600 mb-2 sm:mb-4 font-medium">
//                       Sell just 10 per month = <span className="font-bold">₦45,000 profit!</span>
//                     </p>
//                     <p className="text-xs sm:text-sm text-gray-500 leading-snug">
//                       Many of our top Plugs make ₦200,000+ monthly by sharing multiple products
//                     </p>
//                   </div>
//                 </div>
//               </div>

//               {/* Benefits Summary */}
//               <div className="grid md:grid-cols-3 gap-6">
//                 <div className="bg-white rounded-2xl p-6 shadow-lg text-center">
//                   <Package className="h-12 w-12 text-[#FF7A21] mx-auto mb-4" />
//                   <h4 className="font-bold mb-2">No Inventory Risk</h4>
//                   <p className="text-gray-600 text-sm">Never buy stock or worry about storage</p>
//                 </div>
//                 <div className="bg-white rounded-2xl p-6 shadow-lg text-center">
//                   <Truck className="h-12 w-12 text-[#FF7A21] mx-auto mb-4" />
//                   <h4 className="font-bold mb-2">No Shipping Hassle</h4>
//                   <p className="text-gray-600 text-sm">Products ship directly from suppliers</p>
//                 </div>
//                 <div className="bg-white rounded-2xl p-6 shadow-lg text-center">
//                   <Zap className="h-12 w-12 text-[#FF7A21] mx-auto mb-4" />
//                   <h4 className="font-bold mb-2">No Technical Skills</h4>
//                   <p className="text-gray-600 text-sm">Everything is designed for beginners</p>
//                 </div>
//               </div>
//               <div className="text-center mt-12">
//                 <Button className="bg-[#FF7A21]  text-white px-8 py-4 text-lg font-semibold shadow-lg">
//                   <Link href="/auth/register">Start as a Plug</Link>
//                 </Button>
//               </div>
//             </div>
//           </div>
//         </section>

//         {/* Suppliers Section - Concise & Benefit-Focused */}
//         <section id="suppliers-section" className="w-full py-16 md:py-20 bg-white scroll-mt-16">
//           <div className="container px-4 md:px-6">
//             <div className="max-w-6xl mx-auto">
//               <div className="text-center mb-12">
//                 <div className="inline-flex items-center gap-2 bg-orange-100 rounded-full px-4 py-2 mb-4">
//                   <Store className="h-5 w-5 text-[#FF7A21]" />
//                   <span className="text-[#FF7A21] font-semibold">For Suppliers</span>
//                 </div>
//                 <h2 className="text-2xl md:text-3xl font-bold text-gray-900 mb-4">Multiply Your Sales Channels</h2>
//                 <p className="text-lg md:text-xl text-gray-600 max-w-3xl mx-auto">
//                   Access thousands of motivated social sellers who promote your products across Nigeria—while you focus
//                   on what you do best.
//                 </p>
//               </div>
//               <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6 mb-12">
//                 <div className="bg-gradient-to-br from-orange-50 to-pink-50 rounded-2xl p-6 text-center hover:shadow-lg transition-shadow">
//                   <div className="w-16 h-16 bg-[#FF7A21] rounded-2xl flex items-center justify-center mx-auto mb-4">
//                     <TrendingUp className="h-8 w-8 text-white" />
//                   </div>
//                   <h3 className="text-base md:text-lg font-bold mb-2">Multiply Sales Channels</h3>
//                   <p className="text-gray-600 text-sm">Access thousands of social sellers promoting your products</p>
//                 </div>
//                 <div className="bg-gradient-to-br from-orange-50 to-pink-50 rounded-2xl p-6 text-center hover:shadow-lg transition-shadow">
//                   <div className="w-16 h-16 bg-[#FF7A21] rounded-2xl flex items-center justify-center mx-auto mb-4">
//                     <Zap className="h-8 w-8 text-white" />
//                   </div>
//                   <h3 className="text-base md:text-lg font-bold mb-2">Zero Marketing Effort</h3>
//                   <p className="text-gray-600 text-sm">Others promote your products while you focus on quality</p>
//                 </div>
//                 <div className="bg-gradient-to-br from-orange-50 to-pink-50 rounded-2xl p-6 text-center hover:shadow-lg transition-shadow">
//                   <div className="w-16 h-16 bg-[#FF7A21]  rounded-2xl flex items-center justify-center mx-auto mb-4">
//                     <Award className="h-8 w-8 text-white" />
//                   </div>
//                   <h3 className="text-base md:text-lg font-bold mb-2">Professional Presentation</h3>
//                   <p className="text-gray-600 text-sm">We handle photos, listings</p>
//                 </div>
//                 <div className="bg-gradient-to-br from-orange-50 to-pink-50 rounded-2xl p-6 text-center hover:shadow-lg transition-shadow">
//                   <div className="w-16 h-16 bg-[#FF7A21]  rounded-2xl flex items-center justify-center mx-auto mb-4">
//                     <Shield className="h-8 w-8 text-white" />
//                   </div>
//                   <h3 className="text-base md:text-lg font-bold mb-2">Guaranteed Payments</h3>
//                   <p className="text-gray-600 text-sm">Secure, timely payouts</p>
//                 </div>
//               </div>
//               {/* Quick Process */}
//               <div className="bg-[#FF7A21]  rounded-3xl p-8 md:p-12 text-white text-center">
//                 <h3 className="text-xl md:text-2xl font-bold mb-6">Simple 3-Step Process</h3>
//                 <div className="grid md:grid-cols-3 gap-8">
//                   <div className="flex flex-col items-center">
//                     <div className="w-12 h-12 bg-white/20 rounded-full flex items-center justify-center mb-4">
//                       <span className="text-xl font-bold">1</span>
//                     </div>
//                     <h4 className="font-semibold mb-2">List Your Products</h4>
//                     <p className="text-white/90 text-sm">Upload your inventory with our help</p>
//                   </div>
//                   <div className="flex flex-col items-center">
//                     <div className="w-12 h-12 bg-white/20 rounded-full flex items-center justify-center mb-4">
//                       <span className="text-xl font-bold">2</span>
//                     </div>
//                     <h4 className="font-semibold mb-2">Get Promoted</h4>
//                     <p className="text-white/90 text-sm">Social sellers share your products</p>
//                   </div>
//                   <div className="flex flex-col items-center">
//                     <div className="w-12 h-12 bg-white/20 rounded-full flex items-center justify-center mb-4">
//                       <span className="text-xl font-bold">3</span>
//                     </div>
//                     <h4 className="font-semibold mb-2">Get Paid</h4>
//                     <p className="text-white/90 text-sm">Automatic payouts</p>
//                   </div>
//                 </div>
//                 <Button className="mt-8 bg-white text-[#FF7A21] hover:bg-gray-100 font-semibold px-8 py-3">
//                   <Link href="/auth/register">Start as Supplier</Link>
//                 </Button>
//               </div>
//             </div>
//           </div>
//         </section>

        

//         {/* How It Works - Unified Process */}
//         <section id="how-it-works" className="w-full py-16 md:py-20 bg-white scroll-mt-16">
//           <div className="container px-4 md:px-6">
//             <div className="max-w-6xl mx-auto">
//               <div className="text-center mb-12">
//                 <h2 className="text-2xl md:text-3xl font-bold text-gray-900 mb-4">How It All Works Together</h2>
//                 <p className="text-lg md:text-xl text-gray-600 max-w-3xl mx-auto">
//                   See how suppliers, plugs, and buyers interact in our ecosystem
//                 </p>
//               </div>
//               <div className="relative">
//                 {/* Flow diagram */}
//                 <div className="grid md:grid-cols-5 gap-4 relative">
//                   {/* Step 1 */}
//                   <div className="relative">
//                     <div className="bg-gradient-to-br from-orange-50 to-pink-50 rounded-2xl p-3 text-center">
//                       <div className="w-16 h-16 bg-[#FF7A21]  rounded-full flex items-center justify-center mx-auto mb-4">
//                         <Store className="h-8 w-8 text-white" />
//                       </div>
//                       <h3 className="font-bold mb-2">Supplier Lists Product</h3>
//                       <p className="text-gray-600 text-sm">Business owner uploads watch at ₦20,000</p>
//                     </div>
//                   </div>
//                   {/* Arrow */}
//                   <div className="hidden md:flex items-center justify-center">
//                     <ArrowRight className="h-8 w-8 text-[#FF7A21]" />
//                   </div>
//                   {/* Step 2 */}
//                   <div className="relative">
//                     <div className="bg-gradient-to-br from-orange-50 to-pink-50 rounded-2xl p-3 text-center">
//                       <div className="w-16 h-16 bg-[#FF7A21]  rounded-full flex items-center justify-center mx-auto mb-4">
//                         <Smartphone className="h-8 w-8 text-white" />
//                       </div>
//                       <h3 className="font-bold mb-2">Plug Chooses & Promotes</h3>
//                       <p className="text-gray-600 text-sm">Social seller sets price at ₦25,000 and shares</p>
//                     </div>
//                   </div>
//                   {/* Arrow */}
//                   <div className="hidden md:flex items-center justify-center">
//                     <ArrowRight className="h-8 w-8 text-[#FF7A21]" />
//                   </div>
//                   {/* Step 3 */}
//                   <div className="relative">
//                     <div className="bg-gradient-to-br from-orange-50 to-pink-50 rounded-2xl p-3 text-center">
//                       <div className="w-16 h-16 bg-[#FF7A21]  rounded-full flex items-center justify-center mx-auto mb-4">
//                         <Users className="h-8 w-8 text-white" />
//                       </div>
//                       <h3 className="font-bold mb-2">Buyer Purchases</h3>
//                       <p className="text-gray-600 text-sm">Customer pays ₦25,000 through secure checkout</p>
//                     </div>
//                   </div>
//                 </div>
//                 {/* Second row */}
//               </div>
//             </div>
//           </div>
//         </section>

//         {/* What Pluggn Does Section */}
//         <section className="w-full py-16 md:py-20 bg-gradient-to-br from-orange-50 to-pink-50">
//           <div className="container px-4 md:px-6">
//             <div className="max-w-6xl mx-auto">
//               <div className="text-center mb-12">
//                 <h2 className="text-2xl md:text-3xl font-bold text-gray-900 mb-4">What Pluggn Does For You</h2>
//                 <p className="text-lg md:text-xl text-gray-600 max-w-3xl mx-auto">
//                   We handle all the complex parts of e-commerce so you can focus on what matters—selling and earning
//                 </p>
//               </div>
//               <div className="grid md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
//                 {/* Payment Processing */}
//                 <div className="bg-white rounded-2xl p-6 shadow-lg hover:shadow-xl transition-shadow">
//                   <div className="w-16 h-16 bg-[#FF7A21]  rounded-2xl flex items-center justify-center mx-auto mb-4">
//                     <CreditCard className="h-8 w-8 text-white" />
//                   </div>
//                   <h3 className="text-xl font-bold text-center mb-3">Secure Payments</h3>
//                   <p className="text-gray-600 text-center text-sm">
//                     We process all payments securely through Paystack. you can withdraw after payment has been released
//                     after delivery.
//                   </p>
//                 </div>
//                 {/* Logistics & Delivery */}
//                 <div className="bg-white rounded-2xl p-6 shadow-lg hover:shadow-xl transition-shadow">
//                   <div className="w-16 h-16 bg-[#FF7A21]  rounded-2xl flex items-center justify-center mx-auto mb-4">
//                     <Truck className="h-8 w-8 text-white" />
//                   </div>
//                   <h3 className="text-xl font-bold text-center mb-3">Logistics & Delivery</h3>
//                   <p className="text-gray-600 text-center text-sm">
//                     Our logistics partners deliver products nationwide. We coordinate pickup from suppliers and delivery
//                     to customers with full tracking.
//                   </p>
//                 </div>
//                 {/* Customer Service */}
//                 <div className="bg-white rounded-2xl p-6 shadow-lg hover:shadow-xl transition-shadow">
//                   <div className="w-16 h-16 bg-[#FF7A21]  rounded-2xl flex items-center justify-center mx-auto mb-4">
//                     <MessageCircle className="h-8 w-8 text-white" />
//                   </div>
//                   <h3 className="text-xl font-bold text-center mb-3">Customer Support</h3>
//                   <p className="text-gray-600 text-center text-sm">
//                     Our support team handles customer inquiries, order tracking, and resolves issues so you don't have
//                     to worry about after-sales service.
//                   </p>
//                 </div>
//                 {/* Returns & Refunds */}
//                 <div className="bg-white rounded-2xl p-6 shadow-lg hover:shadow-xl transition-shadow">
//                   <div className="w-16 h-16 bg-[#FF7A21]  rounded-2xl flex items-center justify-center mx-auto mb-4">
//                     <Shield className="h-8 w-8 text-white" />
//                   </div>
//                   <h3 className="text-xl font-bold text-center mb-3">Returns & Refunds</h3>
//                   <p className="text-gray-600 text-center text-sm">
//                     We manage all returns and refunds according to our policy. If there's an issue with a product, we
//                     handle the entire process.
//                   </p>
//                 </div>
//                 {/* Product Photography */}
//                 <div className="bg-white rounded-2xl p-6 shadow-lg hover:shadow-xl transition-shadow">
//                   <div className="w-16 h-16 bg-[#FF7A21]  rounded-2xl flex items-center justify-center mx-auto mb-4">
//                     <Award className="h-8 w-8 text-white" />
//                   </div>
//                   <h3 className="text-xl font-bold text-center mb-3">Professional Presentation</h3>
//                   <p className="text-gray-600 text-center text-sm">
//                     We create beautiful product photos, write compelling descriptions, and design eye-catching social
//                     media cards for easy sharing.
//                   </p>
//                 </div>
//                 {/* Order Management */}
//                 <div className="bg-white rounded-2xl p-6 shadow-lg hover:shadow-xl transition-shadow">
//                   <div className="w-16 h-16 bg-[#FF7A21]  rounded-2xl flex items-center justify-center mx-auto mb-4">
//                     <Package className="h-8 w-8 text-white" />
//                   </div>
//                   <h3 className="text-xl font-bold text-center mb-3">Order Management</h3>
//                   <p className="text-gray-600 text-center text-sm">
//                     From order placement to delivery confirmation, we track everything. You get real-time updates on all
//                     your sales and earnings.
//                   </p>
//                 </div>
//                 {/* Quality Product Curation - Enhanced with buyer assurance */}
//                 <div className="bg-white rounded-2xl p-6 shadow-lg hover:shadow-xl transition-shadow ">
//                   <div className="w-16 h-16 bg-[#FF7A21] rounded-2xl flex items-center justify-center mx-auto mb-4">
//                     <Verified className="h-8 w-8 text-white" />
//                   </div>
//                   <h3 className="text-xl font-bold text-center mb-3">Quality Assurance & Buyer Protection</h3>
//                   <p className="text-gray-600 text-center text-sm">
//                     When purchasing from a Pluggn store, buyers can be totally assured of premium product quality. We
//                     carefully handpick and verify every product from trusted suppliers, ensuring only the highest
//                     standards reach our customers.
//                   </p>
//                 </div>
//                 {/* Buyer Trust & Safety */}
//                 <div className="bg-white rounded-2xl p-6 shadow-lg hover:shadow-xl transition-shadow ">
//                   <div className="w-16 h-16 bg-[#FF7A21] rounded-2xl flex items-center justify-center mx-auto mb-4">
//                     <Shield className="h-8 w-8 text-white" />
//                   </div>
//                   <h3 className="text-xl font-bold text-center mb-3">100% Buyer Protection</h3>
//                   <p className="text-gray-600 text-center text-sm">
//                     Every purchase is protected with our money-back guarantee. If buyers aren't completely satisfied
//                     with product quality, we provide full refunds and handle all returns.
//                   </p>
//                 </div>
//               </div>
//               {/* Bottom CTA */}
//               <div className="text-center mt-12">
//                 <div className="bg-[#FF7A21]  rounded-2xl p-8 text-white">
//                   <h3 className="text-2xl font-bold mb-4">Focus on What You Do Best</h3>
//                   <p className="text-lg mb-6 text-white/90">
//                     While we handle the technical stuff, you focus on building relationships with your customers and
//                     growing your business.
//                   </p>
//                   <div className="flex flex-col sm:flex-row gap-4 justify-center">
//                     <Button className="bg-white text-[#FF7A21] hover:bg-gray-100 font-semibold px-6 py-3">
//                       <Link href="/auth/register">Join as Supplier</Link>
//                     </Button>
//                     <Button className="bg-white/10 border border-white text-white hover:bg-white/20 font-semibold px-6 py-3">
//                       <Link href="/auth/register">Join as a Plug</Link>
//                     </Button>
//                   </div>
//                 </div>
//               </div>
//             </div>
//           </div>
//         </section>

//         {/* Success Stories */}
//         <section
//           id="success-stories"
//           className="w-full py-16 md:py-20 bg-gradient-to-br from-orange-50 to-pink-50 scroll-mt-16"
//         >
//           <div className="container px-4 md:px-6">
//             <div className="max-w-6xl mx-auto">
//               <div className="text-center mb-12">
//                 <h2 className="text-2xl md:text-3xl font-bold text-gray-900 mb-4">Success Stories</h2>
//                 <p className="text-xl text-gray-600 max-w-3xl mx-auto">Real people making real money with Pluggn</p>
//               </div>
//               <div className="grid md:grid-cols-3 gap-8">
//                 {/* Supplier Success */}
//                 <div className="bg-white rounded-2xl p-6 shadow-lg">
//                   <div className="flex items-center mb-4">
//                     <div className="w-12 h-12 bg-[#FF7A21]  rounded-full flex items-center justify-center mr-4">
//                       <span className="text-white font-bold">AO</span>
//                     </div>
//                     <div>
//                       <h3 className="font-bold">Adebayo Oladimeji</h3>
//                       <p className="text-sm text-gray-600">Fashion Supplier, Eko market</p>
//                     </div>
//                   </div>
//                   <p className="text-gray-700 mb-4">
//                     "My sales increased by 300% in 6 months. I now have over 50 Plugs selling my products across
//                     Nigeria. Best decision ever!"
//                   </p>
//                   <div className="flex items-center justify-between">
//                     <div className="flex">
//                       {[...Array(5)].map((_, i) => (
//                         <Star key={i} className="h-4 w-4 fill-[#FF7A21] text-[#FF7A21]" />
//                       ))}
//                     </div>
//                     <div className="text-right">
//                       <div className="text-lg font-bold text-[#FF7A21]">₦400K+</div>
//                       <div className="text-xs text-gray-500">Monthly Revenue</div>
//                     </div>
//                   </div>
//                 </div>
//                 {/* Plug Success 1 */}
//                 <div className="bg-white rounded-2xl p-6 shadow-lg">
//                   <div className="flex items-center mb-4">
//                     <div className="w-12 h-12 bg-[#FF7A21]  rounded-full flex items-center justify-center mr-4">
//                       <span className="text-white font-bold">CI</span>
//                     </div>
//                     <div>
//                       <h3 className="font-bold">Chioma Igwe</h3>
//                       <p className="text-sm text-gray-600">Plug, Unilag</p>
//                     </div>
//                   </div>
//                   <p className="text-gray-700 mb-4">
//                     "Started with no capital. Now I make around ₦100,000 monthly just sharing products on WhatsApp. Omo
//                     pluggn changed my life completely!"
//                   </p>
//                   <div className="flex items-center justify-between">
//                     <div className="flex">
//                       {[...Array(5)].map((_, i) => (
//                         <Star key={i} className="h-4 w-4 fill-[#FF7A21] text-[#FF7A21]" />
//                       ))}
//                     </div>
//                     <div className="text-right">
//                       <div className="text-lg font-bold text-[#FF7A21]">₦100K+</div>
//                       <div className="text-xs text-gray-500">Monthly</div>
//                     </div>
//                   </div>
//                 </div>
//                 {/* Plug Success 2 */}
//                 <div className="bg-white rounded-2xl p-6 shadow-lg">
//                   <div className="flex items-center mb-4">
//                     <div className="w-12 h-12 bg-[#FF7A21]  rounded-full flex items-center justify-center mr-4">
//                       <span className="text-white font-bold">EM</span>
//                     </div>
//                     <div>
//                       <h3 className="font-bold">Emmanuel Oluwasegun</h3>
//                       <p className="text-sm text-gray-600">Plug, Ibadan</p>
//                     </div>
//                   </div>
//                   <p className="text-gray-700 mb-4">
//                     "University student making more money than my lecturers! Pluggn helped me become financially independent
//                     while studying."
//                   </p>
//                   <div className="flex items-center justify-between">
//                     <div className="flex">
//                       {[...Array(5)].map((_, i) => (
//                         <Star key={i} className="h-4 w-4 fill-[#FF7A21] text-[#FF7A21]" />
//                       ))}
//                     </div>
//                     <div className="text-right">
//                       <div className="text-lg font-bold text-[#FF7A21]">₦90K+</div>
//                       <div className="text-xs text-gray-500">Monthly</div>
//                     </div>
//                   </div>
//                 </div>
//               </div>
//               {/* Stats */}
//               <div className="grid grid-cols-2 md:grid-cols-4 gap-6 mt-12">
//                 <div className="text-center">
//                   <div className="text-2xl font-bold text-[#FF7A21]">5,000+</div>
//                   <div className="text-gray-600">Active Users</div>
//                 </div>
//                 <div className="text-center">
//                   <div className="text-2xl font-bold text-[#FF7A21]">₦2M+</div>
//                   <div className="text-gray-600">Monthly Sales</div>
//                 </div>
//                 <div className="text-center">
//                   <div className="text-2xl font-bold text-[#FF7A21]">₦150K</div>
//                   <div className="text-gray-600">Avg. Monthly amount made</div>
//                 </div>
//                 <div className="text-center">
//                   <div className="text-2xl font-bold text-[#FF7A21]">99%</div>
//                   <div className="text-gray-600">Success Rate</div>
//                 </div>
//               </div>
//             </div>
//           </div>
//         </section>

//         {/* About Us Section */}
//         <section id="about" className="w-full py-16 md:py-20 bg-white scroll-mt-16">
//           <div className="container px-4 md:px-6">
//             <div className="grid gap-8 lg:grid-cols-2 lg:gap-12 items-center">
//               <div className="flex flex-col justify-center space-y-4">
//                 <div className="space-y-2">
//                   <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold tracking-tighter text-gray-900">
//                     About Pluggn
//                   </h2>
//                   <p className="max-w-[600px] text-gray-700 text-base md:text-lg">
//                     We're on a mission to empower entrepreneurs across Africa by removing barriers to digital commerce.
//                   </p>
//                 </div>
//                 <div className="space-y-3 md:space-y-4">
//                   <p className="text-gray-700 text-sm md:text-base">
//                     Pluggn was founded with a simple idea: make it possible for anyone to start an online business
//                     without the traditional barriers.
//                   </p>
//                   <p className="text-gray-700 text-sm md:text-base">
//                     Today, we're proud to help suppliers expand their market presence across Nigeria and beyond,
//                     creating new business opportunities for entrepreneurs at every level.
//                   </p>
//                   <p className="text-gray-700 text-sm md:text-base">
//                     Our platform handles the complex parts of e-commerce—payments, delivery, and inventory management—so
//                     you can focus on growing your business and serving your customers.
//                   </p>
//                 </div>
//               </div>
//               <div className="grid grid-cols-2 gap-3 md:gap-4 mt-6 lg:mt-0">
//                 <div className="aspect-square bg-orange-100 rounded-xl overflow-hidden">
//                   <div className="w-full h-full flex items-center justify-center">
//                     <Image
//                       src="/user1.jpg"
//                       width={300}
//                       height={300}
//                       alt="User 1"
//                       className="object-cover w-full h-full"
//                     />
//                   </div>
//                 </div>
//                 <div className="aspect-square bg-orange-100 rounded-xl overflow-hidden">
//                   <div className="w-full h-full flex items-center justify-center">
//                     <Image
//                       src="/user2.jpg"
//                       width={300}
//                       height={300}
//                       alt="user 2"
//                       className="object-cover w-full h-full"
//                     />
//                   </div>
//                 </div>
//                 <div className="aspect-square bg-orange-100 rounded-xl overflow-hidden">
//                   <div className="w-full h-full flex items-center justify-center">
//                     <Image
//                       src="/user3.jpg"
//                       width={300}
//                       height={300}
//                       alt="user 3"
//                       className="object-cover w-full h-full"
//                     />
//                   </div>
//                 </div>
//               </div>
//             </div>
//           </div>
//         </section>

//         {/* FAQ Section */}
//         <section id="faq" className="w-full py-16 md:py-20 bg-white scroll-mt-16">
//           <div className="container px-4 md:px-6">
//             <div className="max-w-4xl mx-auto">
//               <div className="text-center mb-12">
//                 <h2 className="text-2xl md:text-3xl font-bold text-gray-900 mb-4">Frequently Asked Questions</h2>
//                 <p className="text-lg md:text-xl text-gray-600">Everything you need to know about getting started</p>
//               </div>
//               <div className="space-y-6">
//                 {/* Supplier FAQs */}
//                 <div className="bg-gradient-to-br from-orange-50 to-pink-50 rounded-2xl p-6">
//                   <h3 className="text-xl font-bold mb-4 text-[#FF7A21]">For Suppliers</h3>
//                   <div className="space-y-4">
//                     <div>
//                       <h4 className="font-semibold mb-2">How much does it cost to list my products?</h4>
//                       <p className="text-gray-600 text-sm">
//                         Absolutely nothing! We only make money when you make sales. No listing fees, no monthly charges.
//                       </p>
//                     </div>
//                     <div>
//                       <h4 className="font-semibold mb-2">How do I get paid?</h4>
//                       <p className="text-gray-600 text-sm">
//                         You can withdraw your money to your account. We handle the payment processing.
//                       </p>
//                     </div>
//                   </div>
//                 </div>
//                 {/* Plug FAQs */}
//                 <div className="bg-white border-2 border-orange-100 rounded-2xl p-6">
//                   <h3 className="text-xl font-bold mb-4 text-[#FF7A21]">For Plugs</h3>
//                   <div className="space-y-4">
//                     <div>
//                       <h4 className="font-semibold mb-2">How much money can I realistically make?</h4>
//                       <p className="text-gray-600 text-sm">
//                         Our top Plugs makes ₦150K-250K+ monthly. Beginners typically start with ₦50K-100K in their first
//                         month. Your earnings depend on your effort and audience size.
//                       </p>
//                     </div>
//                     <div>
//                       <h4 className="font-semibold mb-2">Do I need money to start?</h4>
//                       <p className="text-gray-600 text-sm">
//                         No! It's completely free to join and start selling. You don't buy any products upfront—you only
//                         earn when customers purchase.
//                       </p>
//                     </div>
//                     <div>
//                       <h4 className="font-semibold mb-2">How do I handle customer service?</h4>
//                       <p className="text-gray-600 text-sm">
//                         Pluggn handles most customer service, delivery tracking, and returns. You focus on selling and
//                         building relationships with your audience.
//                       </p>
//                     </div>
//                     <div>
//                       <h4 className="font-semibold mb-2">Can I sell on WhatsApp?</h4>
//                       <p className="text-gray-600 text-sm">
//                         Yes! Our platform is designed for social selling. Share product links directly to WhatsApp,
//                         Instagram, Facebook, or any social platform.
//                       </p>
//                     </div>
//                   </div>
//                 </div>
//                 {/* General FAQs */}
//                 <div className="bg-gradient-to-br from-orange-50 to-pink-50 rounded-2xl p-6">
//                   <h3 className="text-xl font-bold mb-4 text-[#FF7A21]">General Questions</h3>
//                   <div className="space-y-4">
//                     <div>
//                       <h4 className="font-semibold mb-2">How does delivery work?</h4>
//                       <p className="text-gray-600 text-sm">
//                         We partner with reliable logistics companies across Nigeria. Products ship directly from
//                         suppliers to customers with full tracking.
//                       </p>
//                     </div>
//                     <div>
//                       <h4 className="font-semibold mb-2">Is Pluggn a marketplace like jiji & jumia</h4>
//                       <p className="text-gray-600 text-sm">
//                         No. Pluggn is an app that gives you the tools to build and run your own online business without the complexities of inventory management, logistics, or technical setup. Pluggn provides everything you need to become a social commerce entrepreneur - from professional store creation, professional social media product presentation to automated payment processing - while we handle all the backend operations so you can focus purely on selling and building your brand. 
//                       </p>
//                     </div>
//                     <div>
//                       <h4 className="font-semibold mb-2">How does Pluggn make money?</h4>
//                       <p className="text-gray-600 text-sm">
//                         Pluggn only make money when you make sales. We charge a commission on each sale margin added by
//                         plugs, which is deducted from your earnings after delivery.
//                       </p>
//                     </div>
//                     <div>
//                       <h4 className="font-semibold mb-2">What if a customer wants to return a product?</h4>
//                       <p className="text-gray-600 text-sm">
//                         We have a clear return policy. Pluggn handles all returns and refunds, so you don't have to
//                         worry about it.
//                       </p>
//                     </div>
//                     <div>
//                       <h4 className="font-semibold mb-2">Is this available outside Nigeria?</h4>
//                       <p className="text-gray-600 text-sm">
//                         Currently, we focus on the Nigerian market, but we're expanding to other African countries soon!
//                       </p>
//                     </div>
//                     <div>
//                       <h4 className="font-semibold mb-2">How can buyers be sure of product quality?</h4>
//                       <p className="text-gray-600 text-sm">
//                         When purchasing from a Pluggn store, buyers can be totally assured of premium product quality.
//                         Every product is carefully vetted by our quality team, and we offer a 100% money-back guarantee
//                         if customers aren't completely satisfied.
//                       </p>
//                     </div>
//                   </div>
//                 </div>
//               </div>
//             </div>
//           </div>
//         </section>

//         {/* Dual Call-to-Action */}
//         <section className="w-full py-16 md:py-20 bg-[#FF7A21]  relative overflow-hidden">
//           {/* Background decoration */}
//           <div className="absolute inset-0 bg-black/10"></div>
//           <div className="absolute top-10 right-10 w-72 h-72 bg-white/10 rounded-full blur-3xl"></div>
//           <div className="absolute bottom-10 left-10 w-96 h-96 bg-white/10 rounded-full blur-3xl"></div>
//           <div className="container px-4 md:px-6 relative z-10">
//             <div className="max-w-4xl mx-auto text-center text-white">
//               <h2 className="text-2xl md:text-3xl font-bold mb-6">Ready to Transform Your Financial Future?</h2>
//               <p className="text-lg md:text-xl  mb-12 text-white/90">
//                 Join thousands of successful entrepreneurs earning with Pluggn
//               </p>
//               <div className="grid md:grid-cols-2 gap-8 max-w-2xl mx-auto">
//                 <div className="bg-white/10 backdrop-blur-sm rounded-2xl p-6 border border-white/20">
//                   <Store className="h-12 w-12 mx-auto mb-4 text-white" />
//                   <h3 className="text-xl font-bold mb-4">I'm a Supplier</h3>
//                   <p className="text-white/90 mb-6 text-sm">
//                     Multiply your sales channels and reach customers nationwide
//                   </p>
//                   <Button className="w-full bg-white text-[#FF7A21] hover:bg-gray-100 font-semibold">
//                     <Link href="/auth/register">Start as Supplier</Link>
//                   </Button>
//                 </div>
//                 <div className="bg-white/10 backdrop-blur-sm rounded-2xl p-6 border border-white/20">
//                   <Smartphone className="h-12 w-12 mx-auto mb-4 text-white" />
//                   <h3 className="text-xl font-bold mb-4">I'm a Plug</h3>
//                   <p className="text-white/90 mb-6 text-sm">
//                     Start selling money online without inventory or upfront costs
//                   </p>
//                   <Button className="w-full bg-white text-[#FF7A21] hover:bg-gray-100 font-semibold">
//                     <Link href="/auth/register">Start as Plug</Link>
//                   </Button>
//                 </div>
//               </div>
//             </div>
//           </div>
//         </section>
//       </main>

//       {/* Back to top button */}
//       <button
//         onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
//         className="fixed bottom-6 right-6 h-12 w-12 rounded-full bg-[#FF7A21] text-white flex items-center justify-center shadow-lg hover:shadow-xl transition-all duration-300 z-40 hover:scale-110"
//         aria-label="Back to top"
//       >
//         <svg
//           xmlns="http://www.w3.org/2000/svg"
//           width="24"
//           height="24"
//           viewBox="0 0 24 24"
//           fill="none"
//           stroke="currentColor"
//           strokeWidth="2"
//           strokeLinecap="round"
//           strokeLinejoin="round"
//           className="h-6 w-6"
//         >
//           <polyline points="18 15 12 9 6 15"></polyline>
//         </svg>
//       </button>
//     </div>
//   )
// }













// "use client"

// import { useState, useEffect } from "react"
// import Image from "next/image"
// import Link from "next/link"
// import { Button } from "@/components/ui/button"
// import {
//   Package,
//   Truck,
//   Shield,
//   Zap,
//   Check,
//   ArrowRight,
//   Menu,
//   X,
//   Code,
//   Globe,
//   TrendingUp,
//   Users,
//   Lock,
//   BarChart3,
//   Layers,
//   CheckCircle2,
// } from "lucide-react"

// export default function PluggnLanding() {
//   const [mobileMenuOpen, setMobileMenuOpen] = useState(false)
//   const [scrolled, setScrolled] = useState(false)

//   useEffect(() => {
//     const handleScroll = () => {
//       setScrolled(window.scrollY > 10)
//     }
//     window.addEventListener("scroll", handleScroll)
//     return () => window.removeEventListener("scroll", handleScroll)
//   }, [])

//   useEffect(() => {
//     if (mobileMenuOpen) {
//       document.body.style.overflow = "hidden"
//     } else {
//       document.body.style.overflow = "auto"
//     }
//     return () => {
//       document.body.style.overflow = "auto"
//     }
//   }, [mobileMenuOpen])

//   const scrollToSection = (sectionId: string) => {
//     const section = document.getElementById(sectionId)
//     if (section) {
//       section.scrollIntoView({ behavior: "smooth" })
//       setMobileMenuOpen(false)
//     }
//   }

//   return (
//     <div className="flex min-h-screen flex-col bg-white">
//       {/* Navigation */}
//       <header
//         className={`sticky top-0 z-50 w-full transition-all duration-300 ${
//           scrolled ? "bg-white/80 backdrop-blur-xl shadow-sm border-b" : "bg-white"
//         }`}
//       >
//         <div className="container flex h-16 items-center justify-between px-4 md:px-6 max-w-7xl mx-auto">
//           <Link href="/" className="flex items-center gap-2">
//             <div className="text-2xl font-bold text-gray-900">Pluggn</div>
//           </Link>
//           <nav className="hidden md:flex gap-8">
//             <button
//               onClick={() => scrollToSection("product")}
//               className="text-sm font-medium text-gray-600 hover:text-gray-900 transition-colors"
//             >
//               Product
//             </button>
//             <button
//               onClick={() => scrollToSection("how-it-works")}
//               className="text-sm font-medium text-gray-600 hover:text-gray-900 transition-colors"
//             >
//               How it works
//             </button>
//             <button
//               onClick={() => scrollToSection("pricing")}
//               className="text-sm font-medium text-gray-600 hover:text-gray-900 transition-colors"
//             >
//               Pricing
//             </button>
//             <Link href="/docs" className="text-sm font-medium text-gray-600 hover:text-gray-900 transition-colors">
//               Docs
//             </Link>
//           </nav>
//           <div className="flex items-center gap-4">
//             <Link
//               href="/auth/login"
//               className="hidden md:inline-flex text-sm font-medium text-gray-600 hover:text-gray-900"
//             >
//               Sign in
//             </Link>
//             <Button className="bg-gray-900 hover:bg-gray-800 text-white">
//               <Link href="/auth/register">Get started</Link>
//             </Button>
//             <button
//               className="md:hidden"
//               onClick={() => setMobileMenuOpen(true)}
//               aria-label="Open menu"
//             >
//               <Menu className="h-6 w-6" />
//             </button>
//           </div>
//         </div>
//       </header>

//       {/* Mobile Menu */}
//       <div
//         className={`fixed inset-0 z-50 bg-black bg-opacity-50 transition-opacity duration-300 ${
//           mobileMenuOpen ? "opacity-100" : "opacity-0 pointer-events-none"
//         }`}
//         onClick={() => setMobileMenuOpen(false)}
//       />
//       <div
//         className={`fixed top-0 right-0 z-50 h-full w-[75%] max-w-[300px] bg-white shadow-xl transform transition-transform duration-300 ${
//           mobileMenuOpen ? "translate-x-0" : "translate-x-full"
//         }`}
//       >
//         <div className="flex items-center justify-between p-4 border-b">
//           <span className="text-xl font-bold">Pluggn</span>
//           <button onClick={() => setMobileMenuOpen(false)}>
//             <X className="h-5 w-5" />
//           </button>
//         </div>
//         <nav className="flex flex-col p-4 space-y-4">
//           <button onClick={() => scrollToSection("product")} className="text-left py-2">
//             Product
//           </button>
//           <button onClick={() => scrollToSection("how-it-works")} className="text-left py-2">
//             How it works
//           </button>
//           <button onClick={() => scrollToSection("pricing")} className="text-left py-2">
//             Pricing
//           </button>
//           <Link href="/docs" className="py-2">
//             Docs
//           </Link>
//           <div className="pt-4 border-t space-y-3">
//             <Link href="/auth/login" className="block py-2">
//               Sign in
//             </Link>
//             <Link
//               href="/auth/register"
//               className="block py-2 px-4 text-center rounded-md bg-gray-900 text-white"
//             >
//               Get started
//             </Link>
//           </div>
//         </nav>
//       </div>

//       <main className="flex-1">
//         {/* Hero Section */}
//         <section className="w-full pt-20 pb-16 md:pt-32 md:pb-24">
//           <div className="container px-4 md:px-6 max-w-7xl mx-auto">
//             <div className="flex flex-col items-center text-center space-y-8 max-w-4xl mx-auto">
//               <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full border border-gray-200 bg-gray-50">
//                 <div className="w-2 h-2 rounded-full bg-green-500 animate-pulse" />
//                 <span className="text-xs font-medium text-gray-700">Fulfillment infrastructure for emerging markets</span>
//               </div>
              
//               <h1 className="text-4xl md:text-6xl lg:text-7xl font-bold tracking-tight text-gray-900 leading-tight">
//                 If Stripe made payments work,
//                 <br />
//                 <span className="text-gray-500">Pluggn makes fulfillment work</span>
//               </h1>
              
//               <p className="text-lg md:text-xl text-gray-600 max-w-2xl leading-relaxed">
//                 The programmable logistics and fulfillment layer that powers commerce across Africa. 
//                 Embed delivery policies, buyer protection, and smart logistics coordination directly into your checkout.
//               </p>

//               <div className="flex flex-col sm:flex-row gap-4 pt-4">
//                 <Button size="lg" className="bg-gray-900 hover:bg-gray-800 text-white px-8">
//                   <Link href="/auth/register">Start building</Link>
//                   <ArrowRight className="ml-2 h-4 w-4" />
//                 </Button>
//                 <Button size="lg" variant="outline" className="border-gray-300">
//                   <Link href="/docs">Read documentation</Link>
//                 </Button>
//               </div>

//               <div className="pt-8 flex flex-col sm:flex-row items-center gap-6 text-sm text-gray-600">
//                 <div className="flex items-center gap-2">
//                   <Check className="h-4 w-4 text-green-600" />
//                   <span>No logistics integration needed</span>
//                 </div>
//                 <div className="flex items-center gap-2">
//                   <Check className="h-4 w-4 text-green-600" />
//                   <span>Start in minutes</span>
//                 </div>
//                 <div className="flex items-center gap-2">
//                   <Check className="h-4 w-4 text-green-600" />
//                   <span>Pay per transaction</span>
//                 </div>
//               </div>
//             </div>
//           </div>
//         </section>

//         {/* Code Example Section */}
//         <section className="w-full py-16 bg-gray-50">
//           <div className="container px-4 md:px-6 max-w-7xl mx-auto">
//             <div className="grid lg:grid-cols-2 gap-12 items-center">
//               <div>
//                 <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
//                   Embed fulfillment in minutes
//                 </h2>
//                 <p className="text-lg text-gray-600 mb-6">
//                   Add Pluggn's Buyer Guard to your checkout with a few lines of code. 
//                   Your customers see enforceable delivery policies, return windows, and real-time tracking.
//                 </p>
//                 <div className="space-y-4">
//                   <div className="flex items-start gap-3">
//                     <CheckCircle2 className="h-5 w-5 text-green-600 mt-0.5 flex-shrink-0" />
//                     <div>
//                       <h3 className="font-semibold text-gray-900">Programmable policies</h3>
//                       <p className="text-sm text-gray-600">Define pay-on-delivery, return windows, and refund rules as code</p>
//                     </div>
//                   </div>
//                   <div className="flex items-start gap-3">
//                     <CheckCircle2 className="h-5 w-5 text-green-600 mt-0.5 flex-shrink-0" />
//                     <div>
//                       <h3 className="font-semibold text-gray-900">Smart logistics pooling</h3>
//                       <p className="text-sm text-gray-600">Automatic order consolidation reduces delivery costs by up to 70%</p>
//                     </div>
//                   </div>
//                   <div className="flex items-start gap-3">
//                     <CheckCircle2 className="h-5 w-5 text-green-600 mt-0.5 flex-shrink-0" />
//                     <div>
//                       <h3 className="font-semibold text-gray-900">Multi-carrier routing</h3>
//                       <p className="text-sm text-gray-600">We coordinate with GIG, Kwik, DHL, and more—you get the best rate</p>
//                     </div>
//                   </div>
//                 </div>
//               </div>
//               <div className="bg-gray-900 rounded-lg p-6 text-sm font-mono text-gray-100 overflow-x-auto">
//                 <pre className="text-green-400">{`// Initialize Pluggn
// import { Pluggn } from '@pluggn/sdk';

// const pluggn = new Pluggn({
//   apiKey: 'your_api_key'
// });

// // Create fulfillment policy
// const policy = await pluggn.policies.create({
//   payOnDelivery: true,
//   returnWindowDays: 7,
//   refundPolicy: "if_not_as_described",
//   fulfillmentTime: "1-3 days",
//   deliveryConsolidation: true
// });

// // Embed Buyer Guard in checkout
// <PluggnBuyerGuard 
//   policyId={policy.id}
//   orderId={order.id}
// />`}</pre>
//               </div>
//             </div>
//           </div>
//         </section>

//         {/* Product Features */}
//         <section id="product" className="w-full py-20 scroll-mt-16">
//           <div className="container px-4 md:px-6 max-w-7xl mx-auto">
//             <div className="text-center mb-16">
//               <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
//                 Everything you need to coordinate fulfillment
//               </h2>
//               <p className="text-lg text-gray-600 max-w-2xl mx-auto">
//                 A complete infrastructure layer that abstracts complex logistics into simple, programmable APIs
//               </p>
//             </div>

//             <div className="grid md:grid-cols-3 gap-8">
//               <div className="p-6">
//                 <div className="w-12 h-12 bg-gray-100 rounded-lg flex items-center justify-center mb-4">
//                   <Shield className="h-6 w-6 text-gray-900" />
//                 </div>
//                 <h3 className="text-xl font-semibold text-gray-900 mb-2">Buyer Guard</h3>
//                 <p className="text-gray-600">
//                   Visible trust layer that shows buyers their protections. One click reveals delivery policy, 
//                   return windows, and refund rules—all enforced by Pluggn.
//                 </p>
//               </div>

//               <div className="p-6">
//                 <div className="w-12 h-12 bg-gray-100 rounded-lg flex items-center justify-center mb-4">
//                   <Layers className="h-6 w-6 text-gray-900" />
//                 </div>
//                 <h3 className="text-xl font-semibold text-gray-900 mb-2">Policy Engine</h3>
//                 <p className="text-gray-600">
//                   Codify business rules like smart contracts. Define pay-on-delivery terms, return policies, 
//                   and warranty periods that execute automatically across your fulfillment network.
//                 </p>
//               </div>

//               <div className="p-6">
//                 <div className="w-12 h-12 bg-gray-100 rounded-lg flex items-center justify-center mb-4">
//                   <Package className="h-6 w-6 text-gray-900" />
//                 </div>
//                 <h3 className="text-xl font-semibold text-gray-900 mb-2">Smart Consolidation</h3>
//                 <p className="text-gray-600">
//                   Automatic order pooling groups shipments to similar destinations. 
//                   Join existing slots or create new ones—costs drop by up to 70%.
//                 </p>
//               </div>

//               <div className="p-6">
//                 <div className="w-12 h-12 bg-gray-100 rounded-lg flex items-center justify-center mb-4">
//                   <Globe className="h-6 w-6 text-gray-900" />
//                 </div>
//                 <h3 className="text-xl font-semibold text-gray-900 mb-2">Multi-Carrier Network</h3>
//                 <p className="text-gray-600">
//                   One API connects to multiple 3PLs. We handle GIG, Kwik, Sendbox, DHL routing 
//                   and always find the optimal carrier for each shipment.
//                 </p>
//               </div>

//               <div className="p-6">
//                 <div className="w-12 h-12 bg-gray-100 rounded-lg flex items-center justify-center mb-4">
//                   <BarChart3 className="h-6 w-6 text-gray-900" />
//                 </div>
//                 <h3 className="text-xl font-semibold text-gray-900 mb-2">Unified Dashboard</h3>
//                 <p className="text-gray-600">
//                   Real-time order tracking, delivery analytics, and return management. 
//                   See everything from order placement to delivery confirmation in one place.
//                 </p>
//               </div>

//               <div className="p-6">
//                 <div className="w-12 h-12 bg-gray-100 rounded-lg flex items-center justify-center mb-4">
//                   <Lock className="h-6 w-6 text-gray-900" />
//                 </div>
//                 <h3 className="text-xl font-semibold text-gray-900 mb-2">Secure Settlement</h3>
//                 <p className="text-gray-600">
//                   Automatic payment distribution between merchants, logistics providers, and platforms. 
//                   Track every transaction with complete transparency.
//                 </p>
//               </div>
//             </div>
//           </div>
//         </section>

//         {/* How it Works */}
//         <section id="how-it-works" className="w-full py-20 bg-gray-50 scroll-mt-16">
//           <div className="container px-4 md:px-6 max-w-7xl mx-auto">
//             <div className="text-center mb-16">
//               <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
//                 The fulfillment coordination layer
//               </h2>
//               <p className="text-lg text-gray-600 max-w-2xl mx-auto">
//                 Pluggn sits between your commerce layer and logistics providers, 
//                 orchestrating every step of fulfillment
//               </p>
//             </div>

//             <div className="max-w-4xl mx-auto space-y-12">
//               <div className="flex gap-6 items-start">
//                 <div className="w-10 h-10 bg-gray-900 text-white rounded-full flex items-center justify-center flex-shrink-0 font-bold">
//                   1
//                 </div>
//                 <div>
//                   <h3 className="text-xl font-semibold text-gray-900 mb-2">Orders enter Pluggn</h3>
//                   <p className="text-gray-600">
//                     When customers checkout, orders flow through Pluggn's API from your store, WhatsApp, 
//                     Instagram, or any commerce channel. Each order carries your defined policies.
//                   </p>
//                 </div>
//               </div>

//               <div className="flex gap-6 items-start">
//                 <div className="w-10 h-10 bg-gray-900 text-white rounded-full flex items-center justify-center flex-shrink-0 font-bold">
//                   2
//                 </div>
//                 <div>
//                   <h3 className="text-xl font-semibold text-gray-900 mb-2">Policy engine executes</h3>
//                   <p className="text-gray-600">
//                     Your business rules convert into executable conditions. Buyer Guard displays policies 
//                     at checkout—pay-on-delivery terms, return windows, refund rules—all enforced automatically.
//                   </p>
//                 </div>
//               </div>

//               <div className="flex gap-6 items-start">
//                 <div className="w-10 h-10 bg-gray-900 text-white rounded-full flex items-center justify-center flex-shrink-0 font-bold">
//                   3
//                 </div>
//                 <div>
//                   <h3 className="text-xl font-semibold text-gray-900 mb-2">Smart logistics pooling</h3>
//                   <p className="text-gray-600">
//                     Pluggn groups orders by destination into slots. Merchants join existing slots or create new ones. 
//                     When slots close, consolidated manifests go to optimal carriers—dramatically reducing costs.
//                   </p>
//                 </div>
//               </div>

//               <div className="flex gap-6 items-start">
//                 <div className="w-10 h-10 bg-gray-900 text-white rounded-full flex items-center justify-center flex-shrink-0 font-bold">
//                   4
//                 </div>
//                 <div>
//                   <h3 className="text-xl font-semibold text-gray-900 mb-2">Dispatch & real-time tracking</h3>
//                   <p className="text-gray-600">
//                     3PL partners pick up consolidated shipments. Tracking events stream back to Pluggn and sync 
//                     with merchant dashboards. Buyers and sellers see real-time status updates.
//                   </p>
//                 </div>
//               </div>

//               <div className="flex gap-6 items-start">
//                 <div className="w-10 h-10 bg-gray-900 text-white rounded-full flex items-center justify-center flex-shrink-0 font-bold">
//                   5
//                 </div>
//                 <div>
//                   <h3 className="text-xl font-semibold text-gray-900 mb-2">Automatic settlement & returns</h3>
//                   <p className="text-gray-600">
//                     Upon delivery, Pluggn distributes payments. If customers trigger return policies, 
//                     refunds or replacements execute automatically. All data syncs back to your store.
//                   </p>
//                 </div>
//               </div>
//             </div>
//           </div>
//         </section>

//         {/* Use Cases */}
//         <section className="w-full py-20">
//           <div className="container px-4 md:px-6 max-w-7xl mx-auto">
//             <div className="text-center mb-16">
//               <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
//                 Built for modern commerce
//               </h2>
//               <p className="text-lg text-gray-600 max-w-2xl mx-auto">
//                 From social commerce to enterprise marketplaces, Pluggn powers fulfillment for any scale
//               </p>
//             </div>

//             <div className="grid md:grid-cols-2 gap-8">
//               <div className="border border-gray-200 rounded-lg p-8">
//                 <h3 className="text-2xl font-bold text-gray-900 mb-3">Social sellers & SMEs</h3>
//                 <p className="text-gray-600 mb-6">
//                   Sell on WhatsApp, Instagram, or custom storefronts without managing logistics. 
//                   Pluggn handles everything from checkout policies to delivery coordination.
//                 </p>
//                 <div className="space-y-3">
//                   <div className="flex items-center gap-2 text-sm">
//                     <Check className="h-4 w-4 text-green-600" />
//                     <span>Zero logistics setup</span>
//                   </div>
//                   <div className="flex items-center gap-2 text-sm">
//                     <Check className="h-4 w-4 text-green-600" />
//                     <span>Shared logistics pooling</span>
//                   </div>
//                   <div className="flex items-center gap-2 text-sm">
//                     <Check className="h-4 w-4 text-green-600" />
//                     <span>Automated buyer protection</span>
//                   </div>
//                 </div>
//               </div>

//               <div className="border border-gray-200 rounded-lg p-8">
//                 <h3 className="text-2xl font-bold text-gray-900 mb-3">Suppliers & wholesalers</h3>
//                 <p className="text-gray-600 mb-6">
//                   Distribute products through thousands of social sellers. Pluggn coordinates 
//                   fulfillment across your entire reseller network with unified tracking.
//                 </p>
//                 <div className="space-y-3">
//                   <div className="flex items-center gap-2 text-sm">
//                     <Check className="h-4 w-4 text-green-600" />
//                     <span>Multi-channel order management</span>
//                   </div>
//                   <div className="flex items-center gap-2 text-sm">
//                     <Check className="h-4 w-4 text-green-600" />
//                     <span>Policy enforcement at scale</span>
//                   </div>
//                   <div className="flex items-center gap-2 text-sm">
//                     <Check className="h-4 w-4 text-green-600" />
//                     <span>Consolidated pickup manifests</span>
//                   </div>
//                 </div>
//               </div>

//               <div className="border border-gray-200 rounded-lg p-8">
//                 <h3 className="text-2xl font-bold text-gray-900 mb-3">E-commerce platforms</h3>
//                 <p className="text-gray-600 mb-6">
//                   Embed Pluggn as your fulfillment backend. Offer merchants smart logistics 
//                   coordination and programmable policies without building infrastructure.
//                 </p>
//                 <div className="space-y-3">
//                   <div className="flex items-center gap-2 text-sm">
//                     <Check className="h-4 w-4 text-green-600" />
//                     <span>White-label integration</span>
//                   </div>
//                   <div className="flex items-center gap-2 text-sm">
//                     <Check className="h-4 w-4 text-green-600" />
//                     <span>Webhook-driven architecture</span>
//                   </div>
//                   <div className="flex items-center gap-2 text-sm">
//                     <Check className="h-4 w-4 text-green-600" />
//                     <span>Revenue share models</span>
//                   </div>
//                 </div>
//               </div>

//               <div className="border border-gray-200 rounded-lg p-8">
//                 <h3 className="text-2xl font-bold text-gray-900 mb-3">Marketplaces</h3>
//                 <p className="text-gray-600 mb-6">
//                   Power fulfillment for hundreds or thousands of sellers. Pluggn coordinates 
//                   multi-vendor logistics, buyer protection, and transparent settlement.
//                 </p>
//                 <div className="space-y-3">
//                   <div className="flex items-center gap-2 text-sm">
//                     <Check className="h-4 w-4 text-green-600" />
//                     <span>Multi-vendor coordination</span>
//                   </div>
//                   <div className="flex items-center gap-2 text-sm">
//                     <Check className="h-4 w-4 text-green-600" />
//                     <span>Unified buyer experience</span>
//                   </div>
//                   <div className="flex items-center gap-2 text-sm">
//                     <Check className="h-4 w-4 text-green-600" />
//                     <span>Automatic fund distribution</span>
//                   </div>
//                 </div>
//               </div>
//             </div>
//           </div>
//         </section>

       

       

//         {/* Architecture Diagram */}
//         <section className="w-full py-20 bg-gray-50">
//           <div className="container px-4 md:px-6 max-w-7xl mx-auto">
//             <div className="text-center mb-16">
//               <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
//                 The infrastructure layer architecture
//               </h2>
//               <p className="text-lg text-gray-600 max-w-2xl mx-auto">
//                 Pluggn abstracts complex logistics rails into a unified coordination layer
//               </p>
//             </div>

//             <div className="max-w-5xl mx-auto">
//               <div className="bg-white border border-gray-200 rounded-lg p-8">
//                 {/* Top Layer - Commerce Channels */}
//                 <div className="text-center mb-8">
//                   <div className="inline-block bg-gray-100 rounded-lg px-6 py-4">
//                     <h3 className="font-semibold text-gray-900 mb-2">Commerce Channels</h3>
//                     <div className="flex gap-4 text-sm text-gray-600">
                     
//                       <span>social commerce channels (TikTok shops, social media vendors)</span>
//                       <span>•</span>
//                       <span>Custom Stores & ecommerce marketplace (shopify stores, Temu)</span>
//                     </div>
//                   </div>
//                 </div>

//                 {/* Arrow */}
//                 <div className="flex justify-center mb-8">
//                   <div className="w-0.5 h-12 bg-gray-300"></div>
//                 </div>

//                 {/* Middle Layer - Pluggn Core */}
//                 <div className="bg-gray-900 text-white rounded-lg p-8 mb-8">
//                   <h3 className="text-xl font-bold mb-6 text-center">Pluggn Engine</h3>
//                   <div className="grid md:grid-cols-3 gap-6 text-sm">
//                     <div>
//                       <h4 className="font-semibold mb-2">Policy Engine</h4>
//                       <p className="text-gray-400 text-xs">Execute business rules automatically</p>
//                     </div>
//                     <div>
//                       <h4 className="font-semibold mb-2">Slot Pooling Logic</h4>
//                       <p className="text-gray-400 text-xs">Consolidate shipments intelligently</p>
//                     </div>
//                     <div>
//                       <h4 className="font-semibold mb-2">Buyer Guard Layer</h4>
//                       <p className="text-gray-400 text-xs">Display & enforce protections</p>
//                     </div>
//                     <div>
//                       <h4 className="font-semibold mb-2">Manifest Generator</h4>
//                       <p className="text-gray-400 text-xs">Create optimized pickup lists</p>
//                     </div>
//                     <div>
//                       <h4 className="font-semibold mb-2">API Abstraction</h4>
//                       <p className="text-gray-400 text-xs">Unified logistics interface</p>
//                     </div>
//                     <div>
//                       <h4 className="font-semibold mb-2">Analytics Engine</h4>
//                       <p className="text-gray-400 text-xs">Real-time insights & tracking</p>
//                     </div>
//                   </div>
//                 </div>

//                 {/* Arrow */}
//                 <div className="flex justify-center mb-8">
//                   <div className="w-0.5 h-12 bg-gray-300"></div>
//                 </div>

//                 {/* Bottom Layer - Logistics & Outputs */}
//                 <div className="grid md:grid-cols-2 gap-6">
//                   <div className="bg-gray-100 rounded-lg p-6">
//                     <h3 className="font-semibold text-gray-900 mb-3">Logistics Network</h3>
//                     <div className="space-y-2 text-sm text-gray-600">
//                       <div className="flex items-center gap-2">
//                         <Truck className="h-4 w-4" />
//                         <span>GIG Logistics</span>
//                       </div>
//                       <div className="flex items-center gap-2">
//                         <Truck className="h-4 w-4" />
//                         <span>Kwik Delivery</span>
//                       </div>
//                       <div className="flex items-center gap-2">
//                         <Truck className="h-4 w-4" />
//                         <span>Sendbox</span>
//                       </div>
//                       <div className="flex items-center gap-2">
//                         <Truck className="h-4 w-4" />
//                         <span>DHL & More</span>
//                       </div>
//                     </div>
//                   </div>
//                   <div className="bg-gray-100 rounded-lg p-6">
//                     <h3 className="font-semibold text-gray-900 mb-3">Merchant Dashboard</h3>
//                     <div className="space-y-2 text-sm text-gray-600">
//                       <div className="flex items-center gap-2">
//                         <BarChart3 className="h-4 w-4" />
//                         <span>Order tracking</span>
//                       </div>
//                       <div className="flex items-center gap-2">
//                         <BarChart3 className="h-4 w-4" />
//                         <span>Analytics & insights</span>
//                       </div>
//                       <div className="flex items-center gap-2">
//                         <BarChart3 className="h-4 w-4" />
//                         <span>Return management</span>
//                       </div>
//                       <div className="flex items-center gap-2">
//                         <BarChart3 className="h-4 w-4" />
//                         <span>Settlement data</span>
//                       </div>
//                     </div>
//                   </div>
//                 </div>
//               </div>
//             </div>
//           </div>
//         </section>

//         {/* Comparison */}
//         <section className="w-full py-20">
//           <div className="container px-4 md:px-6 max-w-7xl mx-auto">
//             <div className="text-center mb-16">
//               <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
//                 What makes Pluggn different
//               </h2>
//               <p className="text-lg text-gray-600 max-w-2xl mx-auto">
//                 We're not just another logistics aggregator or storefront tool
//               </p>
//             </div>

//             <div className="max-w-4xl mx-auto overflow-x-auto">
//               <table className="w-full border-collapse">
//                 <thead>
//                   <tr className="border-b">
//                     <th className="text-left py-4 px-4 font-semibold text-gray-900"></th>
//                     <th className="text-center py-4 px-4 font-semibold text-gray-900">Pluggn</th>
//                     <th className="text-center py-4 px-4 font-semibold text-gray-600">Traditional 3PLs</th>
//                     <th className="text-center py-4 px-4 font-semibold text-gray-600">Storefront Tools</th>
//                   </tr>
//                 </thead>
//                 <tbody>
//                   <tr className="border-b">
//                     <td className="py-4 px-4 text-gray-900">Programmable policies</td>
//                     <td className="py-4 px-4 text-center">
//                       <Check className="h-5 w-5 text-green-600 mx-auto" />
//                     </td>
//                     <td className="py-4 px-4 text-center text-gray-400">—</td>
//                     <td className="py-4 px-4 text-center text-gray-400">—</td>
//                   </tr>
//                   <tr className="border-b">
//                     <td className="py-4 px-4 text-gray-900">Smart consolidation</td>
//                     <td className="py-4 px-4 text-center">
//                       <Check className="h-5 w-5 text-green-600 mx-auto" />
//                     </td>
//                     <td className="py-4 px-4 text-center text-gray-400">—</td>
//                     <td className="py-4 px-4 text-center text-gray-400">—</td>
//                   </tr>
//                   <tr className="border-b">
//                     <td className="py-4 px-4 text-gray-900">Multi-carrier routing</td>
//                     <td className="py-4 px-4 text-center">
//                       <Check className="h-5 w-5 text-green-600 mx-auto" />
//                     </td>
//                     <td className="py-4 px-4 text-center text-gray-400">Single carrier</td>
//                     <td className="py-4 px-4 text-center text-gray-400">—</td>
//                   </tr>
//                   <tr className="border-b">
//                     <td className="py-4 px-4 text-gray-900">Buyer protection layer</td>
//                     <td className="py-4 px-4 text-center">
//                       <Check className="h-5 w-5 text-green-600 mx-auto" />
//                     </td>
//                     <td className="py-4 px-4 text-center text-gray-400">—</td>
//                     <td className="py-4 px-4 text-center text-gray-400">Limited</td>
//                   </tr>
//                   <tr className="border-b">
//                     <td className="py-4 px-4 text-gray-900">API-first architecture</td>
//                     <td className="py-4 px-4 text-center">
//                       <Check className="h-5 w-5 text-green-600 mx-auto" />
//                     </td>
//                     <td className="py-4 px-4 text-center text-gray-400">—</td>
//                     <td className="py-4 px-4 text-center">
//                       <Check className="h-5 w-5 text-gray-400 mx-auto" />
//                     </td>
//                   </tr>
//                   <tr>
//                     <td className="py-4 px-4 text-gray-900">Coordinates entire fulfillment</td>
//                     <td className="py-4 px-4 text-center">
//                       <Check className="h-5 w-5 text-green-600 mx-auto" />
//                     </td>
//                     <td className="py-4 px-4 text-center text-gray-400">Delivery only</td>
//                     <td className="py-4 px-4 text-center text-gray-400">No logistics</td>
//                   </tr>
//                 </tbody>
//               </table>
//             </div>
//           </div>
//         </section>

       

//         {/* Final CTA */}
//         <section className="w-full py-20">
//           <div className="container px-4 md:px-6 max-w-7xl mx-auto">
//             <div className="max-w-3xl mx-auto text-center">
//               <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-6">
//                 Ready to embed fulfillment infrastructure?
//               </h2>
//               <p className="text-lg text-gray-600 mb-8">
//                 Join thousands of merchants and platforms building on Pluggn. 
//                 Get started in minutes with our developer-friendly APIs.
//               </p>
//               <div className="flex flex-col sm:flex-row gap-4 justify-center">
//                 <Button size="lg" className="bg-gray-900 hover:bg-gray-800 text-white px-8">
//                   <Link href="/auth/register">Start building</Link>
//                   <ArrowRight className="ml-2 h-4 w-4" />
//                 </Button>
//                 <Button size="lg" variant="outline" className="border-gray-300">
//                   <Link href="/docs">View documentation</Link>
//                 </Button>
//               </div>
//               <p className="text-sm text-gray-500 mt-6">
//                 Free to start • No credit card required • 5-minute setup
//               </p>
//             </div>
//           </div>
//         </section>
//       </main>

      

//       {/* Back to top */}
//       <button
//         onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
//         className="fixed bottom-6 right-6 h-12 w-12 rounded-full bg-gray-900 text-white flex items-center justify-center shadow-lg hover:bg-gray-800 transition-colors z-40"
//         aria-label="Back to top"
//       >
//         <svg
//           xmlns="http://www.w3.org/2000/svg"
//           width="24"
//           height="24"
//           viewBox="0 0 24 24"
//           fill="none"
//           stroke="currentColor"
//           strokeWidth="2"
//           strokeLinecap="round"
//           strokeLinejoin="round"
//         >
//           <polyline points="18 15 12 9 6 15"></polyline>
//         </svg>
//       </button>
//     </div>
//   )
// }








"use client"

import { useState, useEffect } from "react"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import {
  Package,
  Shield,
  Zap,
  Check,
  ArrowRight,
  Menu,
  X,
  Globe,
  TrendingUp,
  Lock,
  BarChart3,
  Layers,
  CheckCircle2,
} from "lucide-react"
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion"
import AnimatedCounter from "./animated-counter"
import InteractiveDemo from "./interactive-demo"
import ArchitectureDiagram from "./architecture-diagram"

export default function PluggnLanding() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)
  const [scrolled, setScrolled] = useState(false)
  const [activeCodeTab, setActiveCodeTab] = useState("javascript")

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 10)
    }
    window.addEventListener("scroll", handleScroll)
    return () => window.removeEventListener("scroll", handleScroll)
  }, [])

  useEffect(() => {
    if (mobileMenuOpen) {
      document.body.style.overflow = "hidden"
    } else {
      document.body.style.overflow = "auto"
    }
    return () => {
      document.body.style.overflow = "auto"
    }
  }, [mobileMenuOpen])

  const scrollToSection = (sectionId: string) => {
    const section = document.getElementById(sectionId)
    if (section) {
      section.scrollIntoView({ behavior: "smooth" })
      setMobileMenuOpen(false)
    }
  }

  const codeExamples = {
    javascript: `import { Pluggn } from '@pluggn/sdk';

const pluggn = new Pluggn({
  apiKey: 'your_api_key'
});

const policy = await pluggn.policies.create({
  payOnDelivery: true,
  returnWindowDays: 7,
  refundPolicy: "if_not_as_described",
  fulfillmentTime: "1-3 days",
  deliveryConsolidation: true
});`,
    python: `from pluggn import Pluggn

pluggn = Pluggn(api_key='your_api_key')

policy = pluggn.policies.create(
    pay_on_delivery=True,
    return_window_days=7,
    refund_policy="if_not_as_described",
    fulfillment_time="1-3 days",
    delivery_consolidation=True
)`,
    curl: `curl -X POST https://api.pluggn.io/policies \\
  -H "Authorization: Bearer YOUR_API_KEY" \\
  -H "Content-Type: application/json" \\
  -d '{
    "payOnDelivery": true,
    "returnWindowDays": 7,
    "refundPolicy": "if_not_as_described",
    "fulfillmentTime": "1-3 days"
  }'`,
  }

  return (
    <div className="flex min-h-screen flex-col bg-gradient-to-b from-orange-50 via-white to-white overflow-x-hidden">
      {/* Navigation */}
      <header
        className={`sticky top-0 z-50 w-full transition-all duration-300 ${
          scrolled
            ? "bg-white/80 backdrop-blur-xl shadow-lg border-b border-orange-100"
            : "bg-white/50 backdrop-blur-sm"
        }`}
      >
        <div className="container flex h-16 items-center justify-between px-4 md:px-6 max-w-7xl mx-auto">
          <Link href="/" className="flex items-center gap-2 group">
            <div className="text-2xl font-bold bg-gradient-to-r from-orange-600 to-orange-500 bg-clip-text text-transparent">
              Pluggn
            </div>
          </Link>
          <nav className="hidden md:flex gap-8">
            <button
              onClick={() => scrollToSection("why-now")}
              className="text-sm font-medium text-gray-600 hover:text-orange-600 transition-colors"
            >
              Why Now
            </button>
            <button
              onClick={() => scrollToSection("product")}
              className="text-sm font-medium text-gray-600 hover:text-orange-600 transition-colors"
            >
              Product
            </button>
            <button
              onClick={() => scrollToSection("how-it-works")}
              className="text-sm font-medium text-gray-600 hover:text-orange-600 transition-colors"
            >
              How it works
            </button>
            <button
              onClick={() => scrollToSection("faq")}
              className="text-sm font-medium text-gray-600 hover:text-orange-600 transition-colors"
            >
              FAQ
            </button>
          </nav>
          <div className="flex items-center gap-4">
            <Link
              href="/auth/login"
              className="hidden md:inline-flex text-sm font-medium text-gray-600 hover:text-orange-600"
            >
              Sign in
            </Link>
            <Button className="bg-gradient-to-r from-orange-600 to-orange-500 hover:from-orange-700 hover:to-orange-600 text-white shadow-lg hover:shadow-xl transition-shadow">
              <Link href="/auth/register">Join Waitlist</Link>
            </Button>
            <button className="md:hidden" onClick={() => setMobileMenuOpen(true)} aria-label="Open menu">
              <Menu className="h-6 w-6" />
            </button>
          </div>
        </div>
      </header>

      {/* Mobile Menu */}
      <div
        className={`fixed inset-0 z-50 bg-black bg-opacity-50 transition-opacity duration-300 ${
          mobileMenuOpen ? "opacity-100" : "opacity-0 pointer-events-none"
        }`}
        onClick={() => setMobileMenuOpen(false)}
      />
      <div
        className={`fixed top-0 right-0 z-50 h-full w-[75%] max-w-[300px] bg-white shadow-xl transform transition-transform duration-300 ${
          mobileMenuOpen ? "translate-x-0" : "translate-x-full"
        }`}
      >
        <div className="flex items-center justify-between p-4 border-b border-orange-100">
          <span className="text-xl font-bold bg-gradient-to-r from-orange-600 to-orange-500 bg-clip-text text-transparent">
            Pluggn
          </span>
          <button onClick={() => setMobileMenuOpen(false)}>
            <X className="h-5 w-5" />
          </button>
        </div>
        <nav className="flex flex-col p-4 space-y-4">
          <button
            onClick={() => scrollToSection("why-now")}
            className="text-left py-2 font-medium hover:text-orange-600"
          >
            Why Now
          </button>
          <button
            onClick={() => scrollToSection("product")}
            className="text-left py-2 font-medium hover:text-orange-600"
          >
            Product
          </button>
          <button
            onClick={() => scrollToSection("how-it-works")}
            className="text-left py-2 font-medium hover:text-orange-600"
          >
            How it works
          </button>
          <button onClick={() => scrollToSection("faq")} className="text-left py-2 font-medium hover:text-orange-600">
            FAQ
          </button>
          <div className="pt-4 border-t border-orange-100 space-y-3">
            <Link href="/auth/login" className="block py-2 font-medium">
              Sign in
            </Link>
            <Link
              href="/auth/register"
              className="block py-2 px-4 text-center rounded-md bg-gradient-to-r from-orange-600 to-orange-500 text-white font-medium"
            >
              Join Waitlist
            </Link>
          </div>
        </nav>
      </div>

      <main className="flex-1">
        {/* Hero Section */}
        <section className="w-full pt-20 pb-16 md:pt-32 md:pb-24 relative overflow-hidden">
          <div className="absolute inset-0 -z-10">
            <div className="absolute top-10 right-1/4 w-96 h-96 bg-orange-200 rounded-full mix-blend-multiply filter blur-3xl opacity-20 animate-pulse" />
            <div className="absolute bottom-10 left-1/4 w-96 h-96 bg-orange-100 rounded-full mix-blend-multiply filter blur-3xl opacity-20 animate-pulse" />
          </div>

          <div className="container px-4 md:px-6 max-w-7xl mx-auto relative z-10">
            <div className="flex flex-col items-center text-center space-y-8 max-w-4xl mx-auto">
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full border border-orange-200 bg-orange-50 backdrop-blur-sm animate-fade-in">
                <div className="w-2 h-2 rounded-full bg-orange-600 animate-pulse" />
                <span className="text-xs font-medium text-orange-700">
                  Fulfillment infrastructure for emerging markets
                </span>
              </div>

              <h1 className="text-4xl md:text-6xl lg:text-7xl font-bold tracking-tight bg-gradient-to-b from-gray-900 via-gray-800 to-gray-700 bg-clip-text text-transparent leading-tight">
                If Stripe made payments work,
                <br />
                <span className="text-orange-600">Pluggn makes fulfillment work</span>
              </h1>

              <p className="text-lg md:text-xl text-gray-600 max-w-2xl leading-relaxed">
                The programmable logistics and fulfillment layer that powers commerce across Africa. Embed delivery
                policies, buyer protection, and smart logistics coordination directly into your checkout.
              </p>

              <div className="flex flex-col sm:flex-row gap-4 pt-4">
                <Button
                  size="lg"
                  className="bg-gradient-to-r from-orange-600 to-orange-500 hover:from-orange-700 hover:to-orange-600 text-white px-8 shadow-lg hover:shadow-xl transition-all hover:scale-105"
                >
                  <Link href="/auth/register" className="flex items-center gap-2">
                    Join Waitlist
                    <ArrowRight className="h-4 w-4" />
                  </Link>
                </Button>
                <Button
                  size="lg"
                  variant="outline"
                  className="border-orange-300 text-orange-600 hover:bg-orange-50 bg-transparent"
                >
                  <Link href="/docs">Read documentation</Link>
                </Button>
              </div>

              <div className="pt-8 flex flex-col sm:flex-row items-center gap-6 text-sm text-gray-600">
                <div className="flex items-center gap-2">
                  <Check className="h-4 w-4 text-orange-600" />
                  <span>No logistics integration needed</span>
                </div>
                <div className="flex items-center gap-2">
                  <Check className="h-4 w-4 text-orange-600" />
                  <span>Start in minutes</span>
                </div>
                <div className="flex items-center gap-2">
                  <Check className="h-4 w-4 text-orange-600" />
                  <span>Pay per transaction</span>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Trust Bar */}
        <section className="w-full py-12 bg-white border-y border-orange-100">
          <div className="container px-4 md:px-6 max-w-7xl mx-auto">
            <div className="flex flex-col md:flex-row items-center justify-between gap-8 text-center md:text-left">
              <div className="flex-1">
                <div className="text-3xl md:text-4xl font-bold text-orange-600">
                  <AnimatedCounter end={10000} duration={2} />+
                </div>
                <p className="text-sm text-gray-600 mt-1">Orders coordinated daily</p>
              </div>
              <div className="w-px h-12 bg-orange-200 hidden md:block" />
              <div className="flex-1">
                <div className="text-3xl md:text-4xl font-bold text-orange-600">
                  98.5<span className="text-2xl">%</span>
                </div>
                <p className="text-sm text-gray-600 mt-1">On-time delivery rate</p>
              </div>
              <div className="w-px h-12 bg-orange-200 hidden md:block" />
              <div className="flex-1">
                <div className="text-3xl md:text-4xl font-bold text-orange-600">
                  70<span className="text-2xl">%</span>
                </div>
                <p className="text-sm text-gray-600 mt-1">Average cost reduction</p>
              </div>
            </div>
          </div>
        </section>

        {/* Why Now Section */}
        <section id="why-now" className="w-full py-20 scroll-mt-16 bg-gradient-to-b from-white to-orange-50">
          <div className="container px-4 md:px-6 max-w-7xl mx-auto">
            <div className="text-center mb-16">
              <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
                Why fulfillment infrastructure matters now
              </h2>
              <p className="text-lg text-gray-600 max-w-2xl mx-auto">
                E-commerce in Africa is exploding, but logistics infrastructure hasn't kept pace. Merchants lose 30% of
                margin to fragmented systems.
              </p>
            </div>

            <div className="grid md:grid-cols-3 gap-8">
              <div className="bg-white rounded-lg p-8 border border-orange-100 hover:border-orange-300 hover:shadow-lg transition-all group">
                <TrendingUp className="h-8 w-8 text-orange-600 mb-4 group-hover:scale-110 transition-transform" />
                <h3 className="text-xl font-semibold text-gray-900 mb-3">Market explosion</h3>
                <p className="text-gray-600 text-sm leading-relaxed">
                  E-commerce GMV in Africa projected to 3x over 5 years. Sellers need infrastructure that scales with
                  growth.
                </p>
              </div>

              <div className="bg-white rounded-lg p-8 border border-orange-100 hover:border-orange-300 hover:shadow-lg transition-all group">
                <Layers className="h-8 w-8 text-orange-600 mb-4 group-hover:scale-110 transition-transform" />
                <h3 className="text-xl font-semibold text-gray-900 mb-3">Infrastructure gap</h3>
                <p className="text-gray-600 text-sm leading-relaxed">
                  Logistics providers are fragmented. Merchants manually coordinate between 5+ carriers, losing time and
                  money.
                </p>
              </div>

              <div className="bg-white rounded-lg p-8 border border-orange-100 hover:border-orange-300 hover:shadow-lg transition-all group">
                <Zap className="h-8 w-8 text-orange-600 mb-4 group-hover:scale-110 transition-transform" />
                <h3 className="text-xl font-semibold text-gray-900 mb-3">Cost burden</h3>
                <p className="text-gray-600 text-sm leading-relaxed">
                  Merchants pay 30-40% of revenue to logistics. Smart pooling and multi-carrier routing can cut costs by
                  70%.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* Code Example Section */}
        <section className="w-full py-16 bg-gray-50 border-y border-orange-100">
          <div className="container px-4 md:px-6 max-w-7xl mx-auto">
            <div className="grid lg:grid-cols-2 gap-12 items-center">
              <div>
                <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">Embed fulfillment in minutes</h2>
                <p className="text-lg text-gray-600 mb-6">
                  Add Pluggn's Buyer Guard to your checkout with a few lines of code. Your customers see enforceable
                  delivery policies, return windows, and real-time tracking.
                </p>
                <div className="space-y-4">
                  <div className="flex items-start gap-3">
                    <CheckCircle2 className="h-5 w-5 text-orange-600 mt-0.5 flex-shrink-0" />
                    <div>
                      <h3 className="font-semibold text-gray-900">Programmable policies</h3>
                      <p className="text-sm text-gray-600">
                        Define pay-on-delivery, return windows, and refund rules as code
                      </p>
                    </div>
                  </div>
                  <div className="flex items-start gap-3">
                    <CheckCircle2 className="h-5 w-5 text-orange-600 mt-0.5 flex-shrink-0" />
                    <div>
                      <h3 className="font-semibold text-gray-900">Smart logistics pooling</h3>
                      <p className="text-sm text-gray-600">
                        Automatic order consolidation reduces delivery costs by up to 70%
                      </p>
                    </div>
                  </div>
                  <div className="flex items-start gap-3">
                    <CheckCircle2 className="h-5 w-5 text-orange-600 mt-0.5 flex-shrink-0" />
                    <div>
                      <h3 className="font-semibold text-gray-900">Multi-carrier routing</h3>
                      <p className="text-sm text-gray-600">
                        We coordinate with GIG, Kwik, DHL, and more—you get the best rate
                      </p>
                    </div>
                  </div>
                </div>
              </div>

              <div className="bg-gray-900 rounded-lg overflow-hidden">
                {/* Code Tabs */}
                <div className="flex border-b border-gray-700">
                  {["javascript", "python", "curl"].map((lang) => (
                    <button
                      key={lang}
                      onClick={() => setActiveCodeTab(lang)}
                      className={`px-4 py-3 text-sm font-medium transition-colors ${
                        activeCodeTab === lang ? "bg-orange-600 text-white" : "text-gray-400 hover:text-gray-300"
                      }`}
                    >
                      {lang.charAt(0).toUpperCase() + lang.slice(1)}
                    </button>
                  ))}
                </div>
                {/* Code Content */}
                <div className="p-6 text-sm font-mono text-green-400 overflow-x-auto">
                  <pre>{codeExamples[activeCodeTab as keyof typeof codeExamples]}</pre>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Product Features */}
        <section id="product" className="w-full py-20 scroll-mt-16">
          <div className="container px-4 md:px-6 max-w-7xl mx-auto">
            <div className="text-center mb-16">
              <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
                Everything you need to coordinate fulfillment
              </h2>
              <p className="text-lg text-gray-600 max-w-2xl mx-auto">
                A complete infrastructure layer that abstracts complex logistics into simple, programmable APIs
              </p>
            </div>

            <div className="grid md:grid-cols-3 gap-8">
              <div className="p-6 bg-gradient-to-br from-white to-orange-50 rounded-lg border border-orange-100 hover:border-orange-300 hover:shadow-lg transition-all group">
                <div className="w-12 h-12 bg-orange-100 rounded-lg flex items-center justify-center mb-4 group-hover:bg-orange-200 transition-colors">
                  <Shield className="h-6 w-6 text-orange-600" />
                </div>
                <h3 className="text-xl font-semibold text-gray-900 mb-2">Buyer Guard</h3>
                <p className="text-gray-600 text-sm">
                  Visible trust layer that shows buyers their protections. One click reveals delivery policy, return
                  windows, and refund rules—all enforced by Pluggn.
                </p>
              </div>

              <div className="p-6 bg-gradient-to-br from-white to-orange-50 rounded-lg border border-orange-100 hover:border-orange-300 hover:shadow-lg transition-all group">
                <div className="w-12 h-12 bg-orange-100 rounded-lg flex items-center justify-center mb-4 group-hover:bg-orange-200 transition-colors">
                  <Layers className="h-6 w-6 text-orange-600" />
                </div>
                <h3 className="text-xl font-semibold text-gray-900 mb-2">Policy Engine</h3>
                <p className="text-gray-600 text-sm">
                  Codify business rules like smart contracts. Define pay-on-delivery terms, return policies, and
                  warranty periods that execute automatically across your fulfillment network.
                </p>
              </div>

              <div className="p-6 bg-gradient-to-br from-white to-orange-50 rounded-lg border border-orange-100 hover:border-orange-300 hover:shadow-lg transition-all group">
                <div className="w-12 h-12 bg-orange-100 rounded-lg flex items-center justify-center mb-4 group-hover:bg-orange-200 transition-colors">
                  <Package className="h-6 w-6 text-orange-600" />
                </div>
                <h3 className="text-xl font-semibold text-gray-900 mb-2">Smart Consolidation</h3>
                <p className="text-gray-600 text-sm">
                  Automatic order pooling groups shipments to similar destinations. Join existing slots or create new
                  ones—costs drop by up to 70%.
                </p>
              </div>

              <div className="p-6 bg-gradient-to-br from-white to-orange-50 rounded-lg border border-orange-100 hover:border-orange-300 hover:shadow-lg transition-all group">
                <div className="w-12 h-12 bg-orange-100 rounded-lg flex items-center justify-center mb-4 group-hover:bg-orange-200 transition-colors">
                  <Globe className="h-6 w-6 text-orange-600" />
                </div>
                <h3 className="text-xl font-semibold text-gray-900 mb-2">Multi-Carrier Network</h3>
                <p className="text-gray-600 text-sm">
                  One API connects to multiple 3PLs. We handle GIG, Kwik, Sendbox, DHL routing and always find the
                  optimal carrier for each shipment.
                </p>
              </div>

              <div className="p-6 bg-gradient-to-br from-white to-orange-50 rounded-lg border border-orange-100 hover:border-orange-300 hover:shadow-lg transition-all group">
                <div className="w-12 h-12 bg-orange-100 rounded-lg flex items-center justify-center mb-4 group-hover:bg-orange-200 transition-colors">
                  <BarChart3 className="h-6 w-6 text-orange-600" />
                </div>
                <h3 className="text-xl font-semibold text-gray-900 mb-2">Unified Dashboard</h3>
                <p className="text-gray-600 text-sm">
                  Real-time order tracking, delivery analytics, and return management. See everything from order
                  placement to delivery confirmation in one place.
                </p>
              </div>

              <div className="p-6 bg-gradient-to-br from-white to-orange-50 rounded-lg border border-orange-100 hover:border-orange-300 hover:shadow-lg transition-all group">
                <div className="w-12 h-12 bg-orange-100 rounded-lg flex items-center justify-center mb-4 group-hover:bg-orange-200 transition-colors">
                  <Lock className="h-6 w-6 text-orange-600" />
                </div>
                <h3 className="text-xl font-semibold text-gray-900 mb-2">Secure Settlement</h3>
                <p className="text-gray-600 text-sm">
                  Automatic payment distribution between merchants, logistics providers, and platforms. Track every
                  transaction with complete transparency.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* How it Works */}
        <section id="how-it-works" className="w-full py-20 bg-gradient-to-b from-white to-gray-50 scroll-mt-16">
          <div className="container px-4 md:px-6 max-w-7xl mx-auto">
            <div className="text-center mb-16">
              <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">The fulfillment coordination layer</h2>
              <p className="text-lg text-gray-600 max-w-2xl mx-auto">
                Pluggn sits between your commerce layer and logistics providers, orchestrating every step of fulfillment
              </p>
            </div>

            <div className="max-w-4xl mx-auto space-y-8">
              {[
                {
                  num: 1,
                  title: "Orders enter Pluggn",
                  desc: "When customers checkout, orders flow through Pluggn's API from your store, WhatsApp, Instagram, or any commerce channel. Each order carries your defined policies.",
                },
                {
                  num: 2,
                  title: "Policy engine executes",
                  desc: "Your business rules convert into executable conditions. Buyer Guard displays policies at checkout—pay-on-delivery terms, return windows, refund rules—all enforced automatically.",
                },
                {
                  num: 3,
                  title: "Smart logistics pooling",
                  desc: "Pluggn groups orders by destination into slots. Merchants join existing slots or create new ones. When slots close, consolidated manifests go to optimal carriers—dramatically reducing costs.",
                },
                {
                  num: 4,
                  title: "Dispatch & real-time tracking",
                  desc: "3PL partners pick up consolidated shipments. Tracking events stream back to Pluggn and sync with merchant dashboards. Buyers and sellers see real-time status updates.",
                },
                {
                  num: 5,
                  title: "Automatic settlement & returns",
                  desc: "Upon delivery, Pluggn distributes payments. If customers trigger return policies, refunds or replacements execute automatically. All data syncs back to your store.",
                },
              ].map((step) => (
                <div key={step.num} className="flex gap-6 items-start group">
                  <div className="w-10 h-10 bg-gradient-to-r from-orange-600 to-orange-500 text-white rounded-full flex items-center justify-center flex-shrink-0 font-bold shadow-lg group-hover:scale-110 transition-transform">
                    {step.num}
                  </div>
                  <div className="flex-1">
                    <h3 className="text-xl font-semibold text-gray-900 mb-2">{step.title}</h3>
                    <p className="text-gray-600">{step.desc}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Interactive Demo */}
        <section className="w-full py-20 bg-white border-y border-orange-100">
          <div className="container px-4 md:px-6 max-w-7xl mx-auto">
            <div className="text-center mb-16">
              <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">See fulfillment in action</h2>
              <p className="text-lg text-gray-600 max-w-2xl mx-auto">
                Walk through a complete fulfillment workflow in real-time
              </p>
            </div>
            <InteractiveDemo />
          </div>
        </section>

        {/* Architecture Diagram */}
        <section className="w-full py-20 bg-gradient-to-b from-white to-orange-50">
          <div className="container px-4 md:px-6 max-w-7xl mx-auto">
            <div className="text-center mb-16">
              <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
                The infrastructure layer architecture
              </h2>
              <p className="text-lg text-gray-600 max-w-2xl mx-auto">
                Pluggn abstracts complex logistics rails into a unified coordination layer
              </p>
            </div>
            <ArchitectureDiagram />
          </div>
        </section>

        {/* Use Cases */}
        <section className="w-full py-20 bg-white">
          <div className="container px-4 md:px-6 max-w-7xl mx-auto">
            <div className="text-center mb-16">
              <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">Built for modern commerce</h2>
              <p className="text-lg text-gray-600 max-w-2xl mx-auto">
                From social commerce to enterprise marketplaces, Pluggn powers fulfillment for any scale
              </p>
            </div>

            <div className="grid md:grid-cols-2 gap-8">
              {[
                {
                  title: "Social sellers & SMEs",
                  desc: "Sell on WhatsApp, Instagram, or custom storefronts without managing logistics. Pluggn handles everything from checkout policies to delivery coordination.",
                  features: ["Zero logistics setup", "Shared logistics pooling", "Automated buyer protection"],
                },
                {
                  title: "Suppliers & wholesalers",
                  desc: "Distribute products through thousands of social sellers. Pluggn coordinates fulfillment across your entire reseller network with unified tracking.",
                  features: [
                    "Multi-channel order management",
                    "Policy enforcement at scale",
                    "Consolidated pickup manifests",
                  ],
                },
                {
                  title: "E-commerce platforms",
                  desc: "Embed Pluggn as your fulfillment backend. Offer merchants smart logistics coordination and programmable policies without building infrastructure.",
                  features: ["White-label integration", "Webhook-driven architecture", "Revenue share models"],
                },
                {
                  title: "Marketplaces",
                  desc: "Power fulfillment for hundreds or thousands of sellers. Pluggn coordinates multi-vendor logistics, buyer protection, and transparent settlement.",
                  features: ["Multi-vendor coordination", "Unified buyer experience", "Automatic fund distribution"],
                },
              ].map((useCase) => (
                <div
                  key={useCase.title}
                  className="border border-orange-100 rounded-lg p-8 hover:border-orange-300 hover:shadow-lg transition-all group bg-gradient-to-br from-white to-orange-50"
                >
                  <h3 className="text-2xl font-bold text-gray-900 mb-3 group-hover:text-orange-600 transition-colors">
                    {useCase.title}
                  </h3>
                  <p className="text-gray-600 mb-6">{useCase.desc}</p>
                  <div className="space-y-3">
                    {useCase.features.map((feature) => (
                      <div key={feature} className="flex items-center gap-2 text-sm">
                        <Check className="h-4 w-4 text-orange-600" />
                        <span>{feature}</span>
                      </div>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Integration Gallery */}
        <section className="w-full py-20 bg-gradient-to-b from-white to-gray-50 border-y border-orange-100">
          <div className="container px-4 md:px-6 max-w-7xl mx-auto">
            <div className="text-center mb-16">
              <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">Works with your tech stack</h2>
              <p className="text-lg text-gray-600 max-w-2xl mx-auto">
                Pluggn integrates seamlessly with platforms and tools you already use
              </p>
            </div>

            <div className="grid md:grid-cols-4 gap-6">
              {[
                { name: "Shopify", icon: "🛍️" },
                { name: "WooCommerce", icon: "📦" },
                { name: "WhatsApp Business", icon: "💬" },
                { name: "Custom API", icon: "⚙️" },
                { name: "TikTok Shop", icon: "🎵" },
                { name: "Instagram", icon: "📸" },
                { name: "Webhooks", icon: "🔗" },
                { name: "REST API", icon: "🔌" },
              ].map((integration) => (
                <div
                  key={integration.name}
                  className="bg-white border border-orange-100 rounded-lg p-6 hover:border-orange-300 hover:shadow-lg transition-all text-center group cursor-pointer"
                >
                  <div className="text-4xl mb-3 group-hover:scale-110 transition-transform">{integration.icon}</div>
                  <p className="font-semibold text-gray-900 mb-2">{integration.name}</p>
                  <p className="text-xs text-gray-500">View Integration →</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* FAQ */}
        <section id="faq" className="w-full py-20 scroll-mt-16 bg-white">
          <div className="container px-4 md:px-6 max-w-3xl mx-auto">
            <div className="text-center mb-16">
              <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">Frequently asked questions</h2>
              <p className="text-lg text-gray-600">Everything you need to know about Pluggn</p>
            </div>

            <Accordion type="single" collapsible className="w-full">
              {[
                {
                  question: "How does slot pooling work?",
                  answer:
                    "Pluggn groups orders heading to similar destinations into 'slots'. Merchants can join existing slots or create new ones. When a slot fills up, we consolidate all shipments and route them to the optimal carrier. This dramatically reduces per-unit shipping costs through economies of scale.",
                },
                {
                  question: "What happens if a delivery fails?",
                  answer:
                    "Our system tracks delivery attempts in real-time. If a carrier fails to deliver, Pluggn automatically initiates a reroute with an alternative carrier. Your customers stay informed at every step, and our system handles all carrier coordination—you don't need to do anything.",
                },
                {
                  question: "How do returns and refunds work?",
                  answer:
                    "Return workflows are defined in your policies. When customers request a return, Pluggn automatically processes it according to your rules—whether that's a full refund, store credit, or replacement. Refunds are settled to your account after we receive the returned item.",
                },
                {
                  question: "What are your pricing and fee structures?",
                  answer:
                    "Pluggn charges per-transaction fees starting at 0.5% of order value. There are no setup fees or monthly minimums. You only pay when orders flow through our system. Enterprise customers can negotiate volume discounts.",
                },
                {
                  question: "How do I connect my existing carriers?",
                  answer:
                    "We currently work with GIG, Kwik, Sendbox, and DHL. If you have contracts with these carriers, we handle all the coordination automatically. For custom carriers, you can use our webhook system to maintain parallel integrations.",
                },
                {
                  question: "Is my data secure? Do you handle customs?",
                  answer:
                    "Yes, Pluggn is SOC 2 compliant and encrypts all data in transit and at rest. We handle basic customs documentation for cross-border shipments in participating markets. For complex international shipments, you can provide custom documentation through our API.",
                },
              ].map((faq, index) => (
                <AccordionItem
                  key={index}
                  value={`item-${index}`}
                  className="border-b border-orange-100 last:border-b-0"
                >
                  <AccordionTrigger className="text-lg font-semibold text-gray-900 hover:text-orange-600 py-4">
                    {faq.question}
                  </AccordionTrigger>
                  <AccordionContent className="text-gray-600 pb-4">{faq.answer}</AccordionContent>
                </AccordionItem>
              ))}
            </Accordion>
          </div>
        </section>

        {/* Final CTA */}
        <section className="w-full py-24 bg-gradient-to-r from-orange-600 to-orange-500 relative overflow-hidden">
          <div className="absolute inset-0 -z-10">
            <div className="absolute top-0 right-0 w-96 h-96 bg-orange-400 rounded-full mix-blend-multiply filter blur-3xl opacity-20" />
            <div className="absolute bottom-0 left-0 w-96 h-96 bg-orange-300 rounded-full mix-blend-multiply filter blur-3xl opacity-20" />
          </div>

          <div className="container px-4 md:px-6 max-w-3xl mx-auto relative z-10">
            <div className="text-center">
              <h2 className="text-3xl md:text-4xl font-bold text-white mb-6">
                Ready to embed fulfillment infrastructure?
              </h2>
              <p className="text-lg text-orange-100 mb-8">
                Join thousands of merchants and platforms building on Pluggn. Get started in minutes with our
                developer-friendly APIs.
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <Button
                  size="lg"
                  className="bg-white text-orange-600 hover:bg-orange-50 px-8 shadow-lg hover:shadow-xl transition-all hover:scale-105"
                >
                  <Link href="/auth/register" className="flex items-center gap-2">
                    Start building
                    <ArrowRight className="h-4 w-4" />
                  </Link>
                </Button>
                <Button
                  size="lg"
                  variant="outline"
                  className="border-orange-200 text-white hover:bg-orange-600/50 bg-transparent"
                >
                  <Link href="/docs">View documentation</Link>
                </Button>
              </div>
              <p className="text-sm text-orange-100 mt-8">Free to start • No credit card required • 5-minute setup</p>
            </div>
          </div>
        </section>
      </main>

      {/* Back to top */}
      <button
        onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
        className="fixed bottom-6 right-6 h-12 w-12 rounded-full bg-gradient-to-r from-orange-600 to-orange-500 text-white flex items-center justify-center shadow-lg hover:shadow-xl hover:scale-110 transition-all z-40"
        aria-label="Back to top"
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="24"
          height="24"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
        >
          <polyline points="18 15 12 9 6 15"></polyline>
        </svg>
      </button>
    </div>
  )
}
