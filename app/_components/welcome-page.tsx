



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
// } from "lucide-react"

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
//       {/* Header */}
//       <header
//         className={`sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60 transition-all duration-300 ${
//           scrolled ? "shadow-lg border-orange-200" : ""
//         }`}
//       >
//         <div className="container flex h-16 items-center justify-between px-4 md:px-6">
//           <div className="flex items-center gap-2">
//             <Link href="/" className="flex items-center gap-2">
//               <Image
//                 src="/pluggn_logo.png"
//                 alt="Pluggn Logo"
//                 width={140}
//                 height={35}
//                 priority
//                 className="h-auto"
//               />
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
//               href="/dashboard"
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
//           <Image
//             src="/pluggn_logo.png"
//             alt="Pluggn Logo"
//             width={120}
//             height={30}
//             priority
//             className="h-auto"
//           />
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
//               href="/dashboard"
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
//                     <Star
//                       key={i}
//                       className="h-4 w-4 fill-[#FF7A21] text-[#FF7A21]"
//                     />
//                   ))}
//                 </div>
//                 <span className="text-xs md:text-sm text-gray-600 font-medium">
//                   Trusted by 5,000+ entrepreneurs
//                 </span>
//               </div>

//               {/* Main headline */}
//               <div className="space-y-4">
//                 <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold tracking-tight text-gray-900">
//                   <span className="bg-[#FF7A21] bg-clip-text text-transparent">
//                     Sell Online
//                   </span>{" "}
//                   Without Inventory, Logistics, or Technical Hassles
//                   <br />
//                   <span className="text-xl md:text-2xl">
//                     Just Sell and Earn
//                   </span>
//                 </h1>
//                 <p className="text-base md:text-lg text-gray-600 max-w-3xl mx-auto leading-relaxed">
//                   Nigeria's #1 social commerce platform where anyone can earn
//                   money selling products online—without inventory, logistics issues, or
//                   technical skills and products are carefully curated with quality entrusted to protect buyers.
//                 </p>
//               </div>

//               {/* User Type Selector */}
//               <div className="w-full max-w-2xl">
//                 <p className="text-lg font-semibold text-gray-700 mb-6">
//                   Choose your path to success:
//                 </p>
//                 <div className="grid md:grid-cols-2 gap-4">
//                   <button
//                     onClick={() => {
//                       setSelectedUserType("supplier");
//                       scrollToSection("suppliers-section");
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
//                       Multiply your sales channels through our network of social
//                       sellers
//                     </p>
//                     <ArrowRight className="h-5 w-5 absolute top-4 right-4 text-[#FF7A21] group-hover:text-white transition-colors" />
//                   </button>

//                   <button
//                     onClick={() => {
//                       setSelectedUserType("plug");
//                       scrollToSection("plugs-section");
//                     }}
//                     className="group relative bg-[#FF7A21] text-white border-2 border-[#FF7A21] rounded-2xl p-6 transition-all duration-300 hover:shadow-2xl hover:scale-105"
//                   >
//                     <div className="flex items-center justify-center mb-4">
//                       <Smartphone className="h-12 w-12 text-white" />
//                     </div>
//                     <h3 className="text-lg font-bold mb-2">
//                       I Want to Sell Online
//                     </h3>
//                     <p className="text-white/90 text-sm">
//                       Start earning without inventory, logistics issues, or upfront
//                       costs
//                     </p>
//                     <ArrowRight className="h-5 w-5 absolute top-4 right-4 text-white" />
//                   </button>
//                 </div>
//               </div>

//               {/* Quick stats */}
//               <div className="grid grid-cols-3 gap-8 pt-8">
//                 <div className="text-center">
//                   <div className="text-xl md:text-2xl font-bold text-[#FF7A21]">
//                     5K+
//                   </div>
//                   <div className="text-sm text-gray-600">Active Users</div>
//                 </div>
//                 <div className="text-center">
//                   <div className="text-xl md:text-2xl font-bold text-[#FF7A21]">
//                     ₦2M+
//                   </div>
//                   <div className="text-sm text-gray-600">Monthly Sales</div>
//                 </div>
//                 <div className="text-center">
//                   <div className="text-xl md:text-2xl font-bold text-[#FF7A21]">
//                     99%
//                   </div>
//                   <div className="text-sm text-gray-600">Success Rate</div>
//                 </div>
//               </div>
//             </div>
//           </div>
//         </section>

//         {/* Suppliers Section - Concise & Benefit-Focused */}
//         <section
//           id="suppliers-section"
//           className="w-full py-16 md:py-20 bg-white scroll-mt-16"
//         >
//           <div className="container px-4 md:px-6">
//             <div className="max-w-6xl mx-auto">
//               <div className="text-center mb-12">
//                 <div className="inline-flex items-center gap-2 bg-orange-100 rounded-full px-4 py-2 mb-4">
//                   <Store className="h-5 w-5 text-[#FF7A21]" />
//                   <span className="text-[#FF7A21] font-semibold">
//                     For Suppliers
//                   </span>
//                 </div>
//                 <h2 className="text-2xl md:text-3xl font-bold text-gray-900 mb-4">
//                   Multiply Your Sales Channels
//                 </h2>
//                 <p className="text-lg md:text-xl text-gray-600 max-w-3xl mx-auto">
//                   Access thousands of motivated social sellers who promote your
//                   products across Nigeria—while you focus on what you do best.
//                 </p>
//               </div>

//               <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6 mb-12">
//                 <div className="bg-gradient-to-br from-orange-50 to-pink-50 rounded-2xl p-6 text-center hover:shadow-lg transition-shadow">
//                   <div className="w-16 h-16 bg-[#FF7A21] rounded-2xl flex items-center justify-center mx-auto mb-4">
//                     <TrendingUp className="h-8 w-8 text-white" />
//                   </div>
//                   <h3 className="text-base md:text-lg font-bold mb-2">
//                     Multiply Sales Channels
//                   </h3>
//                   <p className="text-gray-600 text-sm">
//                     Access thousands of social sellers promoting your products
//                   </p>
//                 </div>

//                 <div className="bg-gradient-to-br from-orange-50 to-pink-50 rounded-2xl p-6 text-center hover:shadow-lg transition-shadow">
//                   <div className="w-16 h-16 bg-[#FF7A21] rounded-2xl flex items-center justify-center mx-auto mb-4">
//                     <Zap className="h-8 w-8 text-white" />
//                   </div>
//                   <h3 className="text-base md:text-lg font-bold mb-2">
//                     Zero Marketing Effort
//                   </h3>
//                   <p className="text-gray-600 text-sm">
//                     Others promote your products while you focus on quality
//                   </p>
//                 </div>

//                 <div className="bg-gradient-to-br from-orange-50 to-pink-50 rounded-2xl p-6 text-center hover:shadow-lg transition-shadow">
//                   <div className="w-16 h-16 bg-[#FF7A21]  rounded-2xl flex items-center justify-center mx-auto mb-4">
//                     <Award className="h-8 w-8 text-white" />
//                   </div>
//                   <h3 className="text-base md:text-lg font-bold mb-2">
//                     Professional Presentation
//                   </h3>
//                   <p className="text-gray-600 text-sm">
//                     We handle photos, listings
//                   </p>
//                 </div>

//                 <div className="bg-gradient-to-br from-orange-50 to-pink-50 rounded-2xl p-6 text-center hover:shadow-lg transition-shadow">
//                   <div className="w-16 h-16 bg-[#FF7A21]  rounded-2xl flex items-center justify-center mx-auto mb-4">
//                     <Shield className="h-8 w-8 text-white" />
//                   </div>
//                   <h3 className="text-base md:text-lg font-bold mb-2">
//                     Guaranteed Payments
//                   </h3>
//                   <p className="text-gray-600 text-sm">
//                     Secure, timely payouts after 3 days of delivery
//                   </p>
//                 </div>
//               </div>

//               {/* Quick Process */}
//               <div className="bg-[#FF7A21]  rounded-3xl p-8 md:p-12 text-white text-center">
//                 <h3 className="text-xl md:text-2xl font-bold mb-6">
//                   Simple 3-Step Process
//                 </h3>
//                 <div className="grid md:grid-cols-3 gap-8">
//                   <div className="flex flex-col items-center">
//                     <div className="w-12 h-12 bg-white/20 rounded-full flex items-center justify-center mb-4">
//                       <span className="text-xl font-bold">1</span>
//                     </div>
//                     <h4 className="font-semibold mb-2">List Your Products</h4>
//                     <p className="text-white/90 text-sm">
//                       Upload your inventory with our help
//                     </p>
//                   </div>
//                   <div className="flex flex-col items-center">
//                     <div className="w-12 h-12 bg-white/20 rounded-full flex items-center justify-center mb-4">
//                       <span className="text-xl font-bold">2</span>
//                     </div>
//                     <h4 className="font-semibold mb-2">Get Promoted</h4>
//                     <p className="text-white/90 text-sm">
//                       Social sellers share your products
//                     </p>
//                   </div>
//                   <div className="flex flex-col items-center">
//                     <div className="w-12 h-12 bg-white/20 rounded-full flex items-center justify-center mb-4">
//                       <span className="text-xl font-bold">3</span>
//                     </div>
//                     <h4 className="font-semibold mb-2">Get Paid</h4>
//                     <p className="text-white/90 text-sm">
//                       Automatic payouts after delivery
//                     </p>
//                   </div>
//                 </div>
//                 <Button className="mt-8 bg-white text-[#FF7A21] hover:bg-gray-100 font-semibold px-8 py-3">
//                   <Link href="/auth/register">
//                     Start as Supplier
//                   </Link>
//                 </Button>
//               </div>
//             </div>
//           </div>
//         </section>

//         {/* Plugs Section - Detailed & Expansive */}
//         <section
//           id="plugs-section"
//           className="w-full py-16 md:py-20 bg-gradient-to-br from-orange-50 to-pink-50 scroll-mt-16"
//         >
//           <div className="container px-4 md:px-6">
//             <div className="max-w-6xl mx-auto">
//               <div className="text-center mb-12">
//                 <div className="inline-flex items-center gap-2 bg-white rounded-full px-4 py-2 mb-4 shadow-sm">
//                   <Smartphone className="h-5 w-5 text-[#FF7A21]" />
//                   <span className="text-[#FF7A21] font-semibold">
//                     For Plugs (Social Sellers)
//                   </span>
//                 </div>
//                 <h2 className="text-2xl md:text-3xl font-bold text-gray-900 mb-4">
//                   Start Your Online Business Today
//                 </h2>
//                 <p className="text-lg md:text-xl text-gray-600 max-w-3xl mx-auto">
//                   Earn money selling products online without inventory,
//                   logistics issues, or technical skills. Join thousands making ₦100K+
//                   monthly.
//                 </p>
//               </div>

//               {/* What Plugs Do */}
//               <div className="bg-white rounded-3xl p-8 md:p-12 shadow-lg mb-12">
//                 <h3 className="text-2xl md:text-3xl font-bold text-center mb-8">
//                   What Plugs Do
//                 </h3>
//                 <div className="grid md:grid-cols-3 gap-8">
//                   <div className="text-center">
//                     <div className="w-16 h-16 bg-[#FF7A21]  rounded-2xl flex items-center justify-center mx-auto mb-4">
//                       <ShoppingBag className="h-8 w-8 text-white" />
//                     </div>
//                     <h4 className="font-bold mb-2">Choose Products</h4>
//                     <p className="text-gray-600 text-sm">
//                       Browse our marketplace and select products you want to
//                       sell
//                     </p>
//                   </div>
//                   <div className="text-center">
//                     <div className="w-16 h-16 bg-[#FF7A21]  rounded-2xl flex items-center justify-center mx-auto mb-4">
//                       <DollarSign className="h-8 w-8 text-white" />
//                     </div>
//                     <h4 className="font-bold mb-2">Set Your Prices</h4>
//                     <p className="text-gray-600 text-sm">
//                       Add your profit margin to each product—you control your
//                       earnings
//                     </p>
//                   </div>
//                   <div className="text-center">
//                     <div className="w-16 h-16 bg-[#FF7A21]  rounded-2xl flex items-center justify-center mx-auto mb-4">
//                       <MessageCircle className="h-8 w-8 text-white" />
//                     </div>
//                     <h4 className="font-bold mb-2">Share & Earn</h4>
//                     <p className="text-gray-600 text-sm">
//                       Share on social media or your store and earn on every sale
//                     </p>
//                   </div>
//                 </div>
//               </div>

//               {/* Store Creation */}
//               <div className="grid lg:grid-cols-2 gap-12 items-center mb-12">
//                 <div>
//                   <h3 className="text-2xl md:text-3xl font-bold mb-6">
//                     Build Your Professional Store
//                   </h3>
//                   <div className="space-y-4">
//                     <div className="flex items-start gap-3">
//                       <CheckCircle className="h-6 w-6 text-[#FF7A21] mt-0.5 flex-shrink-0" />
//                       <div>
//                         <h4 className="font-semibold">No-Code Store Builder</h4>
//                         <p className="text-gray-600 text-sm">
//                           Create a professional online store in minutes without
//                           technical skills
//                         </p>
//                       </div>
//                     </div>
//                     <div className="flex items-start gap-3">
//                       <CheckCircle className="h-6 w-6 text-[#FF7A21] mt-0.5 flex-shrink-0" />
//                       <div>
//                         <h4 className="font-semibold">Fully Customizable</h4>
//                         <p className="text-gray-600 text-sm">
//                           Add your branding, colors, and personal touch to stand
//                           out
//                         </p>
//                       </div>
//                     </div>
//                     <div className="flex items-start gap-3">
//                       <CheckCircle className="h-6 w-6 text-[#FF7A21] mt-0.5 flex-shrink-0" />
//                       <div>
//                         <h4 className="font-semibold">Mobile-Optimized</h4>
//                         <p className="text-gray-600 text-sm">
//                           Your store looks perfect on all devices automatically
//                         </p>
//                       </div>
//                     </div>
//                   </div>
//                 </div>
//                 <div className="relative">
//                   <div className="bg-white rounded-2xl p-6 shadow-xl">
//                     <Image
//                       src="/placeholder.svg?height=300&width=400"
//                       alt="Store Builder Interface"
//                       width={400}
//                       height={300}
//                       className="rounded-lg"
//                     />
//                   </div>
//                 </div>
//               </div>

//               {/* Social Selling */}
//               <div className="bg-white rounded-3xl p-8 md:p-12 shadow-lg mb-12">
//                 <h3 className="text-2xl md:text-3xl font-bold text-center mb-8">
//                   Social Media Made Easy
//                 </h3>
//                 <div className="grid md:grid-cols-2 gap-8 items-center">
//                   <div>
//                     <div className="space-y-4">
//                       <div className="flex items-start gap-3">
//                         <div className="w-8 h-8 bg-[#FF7A21] rounded-full flex items-center justify-center flex-shrink-0">
//                           <span className="text-white text-sm font-bold">
//                             1
//                           </span>
//                         </div>
//                         <div>
//                           <h4 className="font-semibold">
//                             Magazine-Style Product Cards
//                           </h4>
//                           <p className="text-gray-600 text-sm">
//                             Beautiful, professional product images generated
//                             automatically
//                           </p>
//                         </div>
//                       </div>
//                       <div className="flex items-start gap-3">
//                         <div className="w-8 h-8 bg-[#FF7A21] rounded-full flex items-center justify-center flex-shrink-0">
//                           <span className="text-white text-sm font-bold">
//                             2
//                           </span>
//                         </div>
//                         <div>
//                           <h4 className="font-semibold">One-Click Sharing</h4>
//                           <p className="text-gray-600 text-sm">
//                             Share to WhatsApp, Instagram, Facebook, and more
//                             instantly
//                           </p>
//                         </div>
//                       </div>
//                       <div className="flex items-start gap-3">
//                         <div className="w-8 h-8 bg-[#FF7A21] rounded-full flex items-center justify-center flex-shrink-0">
//                           <span className="text-white text-sm font-bold">
//                             3
//                           </span>
//                         </div>
//                         <div>
//                           <h4 className="font-semibold">Automatic Checkout</h4>
//                           <p className="text-gray-600 text-sm">
//                             Customers click your link and go straight to secure
//                             checkout
//                           </p>
//                         </div>
//                       </div>
//                     </div>
//                   </div>
//                   <div className="bg-gradient-to-br from-orange-100 to-pink-100 rounded-2xl p-6">
//                     <Image
//                       src="/placeholder.svg?height=250&width=300"
//                       alt="Social Media Cards"
//                       width={300}
//                       height={250}
//                       className="rounded-lg mx-auto"
//                     />
//                   </div>
//                 </div>
//               </div>

//               {/* Earning Process */}
//               <div className="bg-[#FF7A21]  rounded-3xl p-8 md:p-12 text-white mb-12">
//                 <h3 className="text-2xl md:text-3xl font-bold text-center mb-8">
//                   How You Earn Money
//                 </h3>
//                 <div className="grid md:grid-cols-4 gap-6">
//                   <div className="text-center">
//                     <div className="w-16 h-16 bg-white/20 rounded-2xl flex items-center justify-center mx-auto mb-4">
//                       <Target className="h-8 w-8 text-white" />
//                     </div>
//                     <h4 className="font-bold mb-2">Set Your Margin</h4>
//                     <p className="text-white/90 text-sm">
//                       Add 20-50% profit to any product
//                     </p>
//                   </div>
//                   <div className="text-center">
//                     <div className="w-16 h-16 bg-white/20 rounded-2xl flex items-center justify-center mx-auto mb-4">
//                       <Users className="h-8 w-8 text-white" />
//                     </div>
//                     <h4 className="font-bold mb-2">Customer Orders</h4>
//                     <p className="text-white/90 text-sm">
//                       Buyers purchase through your links
//                     </p>
//                   </div>
//                   <div className="text-center">
//                     <div className="w-16 h-16 bg-white/20 rounded-2xl flex items-center justify-center mx-auto mb-4">
//                       <Truck className="h-8 w-8 text-white" />
//                     </div>
//                     <h4 className="font-bold mb-2">We Handle Delivery</h4>
//                     <p className="text-white/90 text-sm">
//                       Product ships directly to customer
//                     </p>
//                   </div>
//                   <div className="text-center">
//                     <div className="w-16 h-16 bg-white/20 rounded-2xl flex items-center justify-center mx-auto mb-4">
//                       <CreditCard className="h-8 w-8 text-white" />
//                     </div>
//                     <h4 className="font-bold mb-2">Get Paid</h4>
//                     <p className="text-white/90 text-sm">
//                       Withdraw earnings after 3 days
//                     </p>
//                   </div>
//                 </div>
//               </div>

              
//               <div className="bg-white rounded-3xl p-4 sm:p-6 md:p-8 shadow-lg mb-8 sm:mb-10 md:mb-12">
//                 <h3 className="text-xl sm:text-2xl md:text-3xl font-bold text-center mb-4 sm:mb-6 md:mb-8">
//                   Real Earning Example
//                 </h3>

//                 <div className="max-w-xl mx-auto">
//                   <div className="bg-gradient-to-br from-orange-50 to-pink-50 rounded-2xl p-4 sm:p-6 mb-4 sm:mb-6">
//                     <div className="text-center">
//                       <Image
//                         src="/placeholder.svg?height=200&width=200"
//                         alt="Sneaker Example"
//                         width={160}
//                         height={160}
//                         className="mx-auto rounded-lg mb-3 sm:mb-4"
//                       />
//                       <h4 className="text-lg sm:text-xl font-bold mb-2 sm:mb-4">
//                         Premium Sneakers
//                       </h4>

//                       <div className="grid grid-cols-3 gap-2 sm:gap-4 text-center">
//                         <div>
//                           <div className="text-base md:text-xl font-bold text-gray-600">
//                             ₦20,000
//                           </div>
//                           <div className="text-xs sm:text-sm text-gray-500">
//                             Supplier Price
//                           </div>
//                         </div>
//                         <div>
//                           <div className="text-base md:text-xl font-bold text-[#FF7A21]">
//                             ₦25,000
//                           </div>
//                           <div className="text-xs sm:text-sm text-gray-500">
//                             Your Price
//                           </div>
//                         </div>
//                         <div>
//                           <div className="text-base md:text-xl font-bold text-green-600">
//                             ₦4,500
//                           </div>
//                           <div className="text-xs sm:text-sm text-gray-500">
//                             Your Profit*
//                           </div>
//                         </div>
//                       </div>

//                       <p className="text-[10px] sm:text-xs text-gray-500 mt-2">
//                         *After 10% platform fee
//                       </p>
//                     </div>
//                   </div>

//                   <div className="text-center px-2 sm:px-4">
//                     <p className="text-base sm:text-lg text-gray-600 mb-2 sm:mb-4 font-medium">
//                       Sell just 10 pairs per month ={" "}
//                       <span className="font-bold">₦45,000 profit!</span>
//                     </p>
//                     <p className="text-xs sm:text-sm text-gray-500 leading-snug">
//                       Many of our top Plugs earn ₦200,000+ monthly by promoting
//                       multiple products
//                     </p>
//                   </div>
//                 </div>
//               </div>

//               {/* Benefits Summary */}
//               <div className="grid md:grid-cols-3 gap-6">
//                 <div className="bg-white rounded-2xl p-6 shadow-lg text-center">
//                   <Package className="h-12 w-12 text-[#FF7A21] mx-auto mb-4" />
//                   <h4 className="font-bold mb-2">No Inventory Risk</h4>
//                   <p className="text-gray-600 text-sm">
//                     Never buy stock or worry about storage
//                   </p>
//                 </div>
//                 <div className="bg-white rounded-2xl p-6 shadow-lg text-center">
//                   <Truck className="h-12 w-12 text-[#FF7A21] mx-auto mb-4" />
//                   <h4 className="font-bold mb-2">No Shipping Hassle</h4>
//                   <p className="text-gray-600 text-sm">
//                     Products ship directly from suppliers
//                   </p>
//                 </div>
//                 <div className="bg-white rounded-2xl p-6 shadow-lg text-center">
//                   <Zap className="h-12 w-12 text-[#FF7A21] mx-auto mb-4" />
//                   <h4 className="font-bold mb-2">No Technical Skills</h4>
//                   <p className="text-gray-600 text-sm">
//                     Everything is designed for beginners
//                   </p>
//                 </div>
//               </div>

//               <div className="text-center mt-12">
//                 <Button className="bg-[#FF7A21]  text-white px-8 py-4 text-lg font-semibold shadow-lg">
//                   <Link href="/auth/register">Start Earning as a Plug</Link>
//                 </Button>
//               </div>
//             </div>
//           </div>
//         </section>

//         {/* How It Works - Unified Process */}
//         <section
//           id="how-it-works"
//           className="w-full py-16 md:py-20 bg-white scroll-mt-16"
//         >
//           <div className="container px-4 md:px-6">
//             <div className="max-w-6xl mx-auto">
//               <div className="text-center mb-12">
//                 <h2 className="text-2xl md:text-3xl font-bold text-gray-900 mb-4">
//                   How It All Works Together
//                 </h2>
//                 <p className="text-lg md:text-xl text-gray-600 max-w-3xl mx-auto">
//                   See how suppliers, plugs, and buyers interact in our ecosystem
//                 </p>
//               </div>

//               <div className="relative">
//                 {/* Flow diagram */}
//                 <div className="grid md:grid-cols-5 gap-8 relative">
//                   {/* Step 1 */}
//                   <div className="relative">
//                     <div className="bg-gradient-to-br from-orange-50 to-pink-50 rounded-2xl p-6 text-center">
//                       <div className="w-16 h-16 bg-[#FF7A21]  rounded-full flex items-center justify-center mx-auto mb-4">
//                         <Store className="h-8 w-8 text-white" />
//                       </div>
//                       <h3 className="font-bold mb-2">Supplier Lists Product</h3>
//                       <p className="text-gray-600 text-sm">
//                         Business owner uploads sneakers at ₦20,000
//                       </p>
//                     </div>
//                   </div>

//                   {/* Arrow */}
//                   <div className="hidden md:flex items-center justify-center">
//                     <ArrowRight className="h-8 w-8 text-[#FF7A21]" />
//                   </div>

//                   {/* Step 2 */}
//                   <div className="relative">
//                     <div className="bg-gradient-to-br from-orange-50 to-pink-50 rounded-2xl p-6 text-center">
//                       <div className="w-16 h-16 bg-[#FF7A21]  rounded-full flex items-center justify-center mx-auto mb-4">
//                         <Smartphone className="h-8 w-8 text-white" />
//                       </div>
//                       <h3 className="font-bold mb-2">
//                         Plug Chooses & Promotes
//                       </h3>
//                       <p className="text-gray-600 text-sm">
//                         Social seller sets price at ₦25,000 and shares
//                       </p>
//                     </div>
//                   </div>

//                   {/* Arrow */}
//                   <div className="hidden md:flex items-center justify-center">
//                     <ArrowRight className="h-8 w-8 text-[#FF7A21]" />
//                   </div>

//                   {/* Step 3 */}
//                   <div className="relative">
//                     <div className="bg-gradient-to-br from-orange-50 to-pink-50 rounded-2xl p-6 text-center">
//                       <div className="w-16 h-16 bg-[#FF7A21]  rounded-full flex items-center justify-center mx-auto mb-4">
//                         <Users className="h-8 w-8 text-white" />
//                       </div>
//                       <h3 className="font-bold mb-2">Buyer Purchases</h3>
//                       <p className="text-gray-600 text-sm">
//                         Customer pays ₦25,000 through secure checkout
//                       </p>
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
//                 <h2 className="text-2xl md:text-3xl font-bold text-gray-900 mb-4">
//                   What Pluggn Does For You
//                 </h2>
//                 <p className="text-lg md:text-xl text-gray-600 max-w-3xl mx-auto">
//                   We handle all the complex parts of e-commerce so you can focus
//                   on what matters—selling and earning
//                 </p>
//               </div>

//               <div className="grid md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
//                 {/* Payment Processing */}
//                 <div className="bg-white rounded-2xl p-6 shadow-lg hover:shadow-xl transition-shadow">
//                   <div className="w-16 h-16 bg-[#FF7A21]  rounded-2xl flex items-center justify-center mx-auto mb-4">
//                     <CreditCard className="h-8 w-8 text-white" />
//                   </div>
//                   <h3 className="text-xl font-bold text-center mb-3">
//                     Secure Payments
//                   </h3>
//                   <p className="text-gray-600 text-center text-sm">
//                     We process all payments securely through Paystack and handle
//                     Pay-on-Delivery options. you can withdraw after payment as being released after delivery.
//                   </p>
//                 </div>

//                 {/* Logistics & Delivery */}
//                 <div className="bg-white rounded-2xl p-6 shadow-lg hover:shadow-xl transition-shadow">
//                   <div className="w-16 h-16 bg-[#FF7A21]  rounded-2xl flex items-center justify-center mx-auto mb-4">
//                     <Truck className="h-8 w-8 text-white" />
//                   </div>
//                   <h3 className="text-xl font-bold text-center mb-3">
//                     Logistics & Delivery
//                   </h3>
//                   <p className="text-gray-600 text-center text-sm">
//                     Our logistics partners deliver products nationwide. We
//                     coordinate pickup from suppliers and delivery to customers
//                     with full tracking.
//                   </p>
//                 </div>

//                 {/* Customer Service */}
//                 <div className="bg-white rounded-2xl p-6 shadow-lg hover:shadow-xl transition-shadow">
//                   <div className="w-16 h-16 bg-[#FF7A21]  rounded-2xl flex items-center justify-center mx-auto mb-4">
//                     <MessageCircle className="h-8 w-8 text-white" />
//                   </div>
//                   <h3 className="text-xl font-bold text-center mb-3">
//                     Customer Support
//                   </h3>
//                   <p className="text-gray-600 text-center text-sm">
//                     Our support team handles customer inquiries, order tracking,
//                     and resolves issues so you don't have to worry about
//                     after-sales service.
//                   </p>
//                 </div>

//                 {/* Returns & Refunds */}
//                 <div className="bg-white rounded-2xl p-6 shadow-lg hover:shadow-xl transition-shadow">
//                   <div className="w-16 h-16 bg-[#FF7A21]  rounded-2xl flex items-center justify-center mx-auto mb-4">
//                     <Shield className="h-8 w-8 text-white" />
//                   </div>
//                   <h3 className="text-xl font-bold text-center mb-3">
//                     Returns & Refunds
//                   </h3>
//                   <p className="text-gray-600 text-center text-sm">
//                     We manage all returns and refunds according to our policy.
//                     If there's an issue with a product, we handle the entire
//                     process.
//                   </p>
//                 </div>

//                 {/* Product Photography */}
//                 <div className="bg-white rounded-2xl p-6 shadow-lg hover:shadow-xl transition-shadow">
//                   <div className="w-16 h-16 bg-[#FF7A21]  rounded-2xl flex items-center justify-center mx-auto mb-4">
//                     <Award className="h-8 w-8 text-white" />
//                   </div>
//                   <h3 className="text-xl font-bold text-center mb-3">
//                     Professional Presentation
//                   </h3>
//                   <p className="text-gray-600 text-center text-sm">
//                     We create beautiful product photos, write compelling
//                     descriptions, and design eye-catching social media cards for
//                     easy sharing.
//                   </p>
//                 </div>

//                 {/* Order Management */}
//                 <div className="bg-white rounded-2xl p-6 shadow-lg hover:shadow-xl transition-shadow">
//                   <div className="w-16 h-16 bg-[#FF7A21]  rounded-2xl flex items-center justify-center mx-auto mb-4">
//                     <Package className="h-8 w-8 text-white" />
//                   </div>
//                   <h3 className="text-xl font-bold text-center mb-3">
//                     Order Management
//                   </h3>
//                   <p className="text-gray-600 text-center text-sm">
//                     From order placement to delivery confirmation, we track
//                     everything. You get real-time updates on all your sales and
//                     earnings.
//                   </p>
//                 </div>

//                 {/* Quality Product Curation */}
//                 <div className="bg-white rounded-2xl p-6 shadow-lg hover:shadow-xl transition-shadow">
//                   <div className="w-16 h-16 bg-[#FF7A21]  rounded-2xl flex items-center justify-center mx-auto mb-4">
//                     <CheckCircle className="h-8 w-8 text-white" />
//                   </div>
//                   <h3 className="text-xl font-bold text-center mb-3">
//                     Quality Product Selection
//                   </h3>
//                   <p className="text-gray-600 text-center text-sm">
//                     We carefully handpick and curate high-quality products from
//                     trusted suppliers, ensuring you only sell items that meet
//                     our standards.
//                   </p>
//                 </div>
//               </div>

//               {/* Bottom CTA */}
//               <div className="text-center mt-12">
//                 <div className="bg-[#FF7A21]  rounded-2xl p-8 text-white">
//                   <h3 className="text-2xl font-bold mb-4">
//                     Focus on What You Do Best
//                   </h3>
//                   <p className="text-lg mb-6 text-white/90">
//                     While we handle the technical stuff, you focus on building
//                     relationships with your customers and growing your business.
//                   </p>
//                   <div className="flex flex-col sm:flex-row gap-4 justify-center">
//                     <Button className="bg-white text-[#FF7A21] hover:bg-gray-100 font-semibold px-6 py-3">
//                       <Link href="/auth/register">Join as Supplier</Link>
//                     </Button>
//                     <Button className="bg-white/10 border border-white text-white hover:bg-white/20 font-semibold px-6 py-3">
//                       <Link href="/auth/register">Join as Plug</Link>
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
//                 <h2 className="text-2xl md:text-3xl font-bold text-gray-900 mb-4">
//                   Success Stories
//                 </h2>
//                 <p className="text-xl text-gray-600 max-w-3xl mx-auto">
//                   Real people earning real money with Pluggn
//                 </p>
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
//                       <p className="text-sm text-gray-600">
//                         Fashion Supplier, Eko market
//                       </p>
//                     </div>
//                   </div>
//                   <p className="text-gray-700 mb-4">
//                     "My sales increased by 300% in 6 months. I now have over 50
//                     Plugs selling my products across Nigeria. Best decision
//                     ever!"
//                   </p>
//                   <div className="flex items-center justify-between">
//                     <div className="flex">
//                       {[...Array(5)].map((_, i) => (
//                         <Star
//                           key={i}
//                           className="h-4 w-4 fill-[#FF7A21] text-[#FF7A21]"
//                         />
//                       ))}
//                     </div>
//                     <div className="text-right">
//                       <div className="text-lg font-bold text-[#FF7A21]">
//                         ₦400K+
//                       </div>
//                       <div className="text-xs text-gray-500">
//                         Monthly Revenue
//                       </div>
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
//                     "Started with no capital. Now I make around ₦100,000 monthly just
//                     sharing products on WhatsApp. Omo pluggn changed my life completely!"
//                   </p>
//                   <div className="flex items-center justify-between">
//                     <div className="flex">
//                       {[...Array(5)].map((_, i) => (
//                         <Star
//                           key={i}
//                           className="h-4 w-4 fill-[#FF7A21] text-[#FF7A21]"
//                         />
//                       ))}
//                     </div>
//                     <div className="text-right">
//                       <div className="text-lg font-bold text-[#FF7A21]">
//                         ₦100K+
//                       </div>
//                       <div className="text-xs text-gray-500">
//                         Monthly Earnings
//                       </div>
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
//                     "University student earning more than my lecturers! Pluggn
//                     helped me become financially independent while studying."
//                   </p>
//                   <div className="flex items-center justify-between">
//                     <div className="flex">
//                       {[...Array(5)].map((_, i) => (
//                         <Star
//                           key={i}
//                           className="h-4 w-4 fill-[#FF7A21] text-[#FF7A21]"
//                         />
//                       ))}
//                     </div>
//                     <div className="text-right">
//                       <div className="text-lg font-bold text-[#FF7A21]">
//                         ₦90K+
//                       </div>
//                       <div className="text-xs text-gray-500">
//                         Monthly Earnings
//                       </div>
//                     </div>
//                   </div>
//                 </div>
//               </div>

//               {/* Stats */}
//               <div className="grid grid-cols-2 md:grid-cols-4 gap-6 mt-12">
//                 <div className="text-center">
//                   <div className="text-2xl font-bold text-[#FF7A21]">
//                     5,000+
//                   </div>
//                   <div className="text-gray-600">Active Users</div>
//                 </div>
//                 <div className="text-center">
//                   <div className="text-2xl font-bold text-[#FF7A21]">₦2M+</div>
//                   <div className="text-gray-600">Monthly Sales</div>
//                 </div>
//                 <div className="text-center">
//                   <div className="text-2xl font-bold text-[#FF7A21]">₦150K</div>
//                   <div className="text-gray-600">Avg. Monthly Earnings</div>
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
//         <section
//           id="about"
//           className="w-full py-16 md:py-20 bg-white scroll-mt-16"
//         >
//           <div className="container px-4 md:px-6">
//             <div className="grid gap-8 lg:grid-cols-2 lg:gap-12 items-center">
//               <div className="flex flex-col justify-center space-y-4">
//                 <div className="space-y-2">
//                   <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold tracking-tighter text-gray-900">
//                     About Pluggn
//                   </h2>
//                   <p className="max-w-[600px] text-gray-700 text-base md:text-lg">
//                     We're on a mission to empower entrepreneurs across Africa by
//                     removing barriers to digital commerce.
//                   </p>
//                 </div>
//                 <div className="space-y-3 md:space-y-4">
//                   <p className="text-gray-700 text-sm md:text-base">
//                     Pluggn was founded with a simple idea: make it possible for
//                     anyone to start an online business without the traditional
//                     barriers.
//                   </p>
//                   <p className="text-gray-700 text-sm md:text-base">
//                     Today, we're proud to help suppliers expand their market
//                     presence across Nigeria and beyond, creating new business
//                     opportunities for entrepreneurs at every level.
//                   </p>
//                   <p className="text-gray-700 text-sm md:text-base">
//                     Our platform handles the complex parts of
//                     e-commerce—payments, delivery, and inventory management—so
//                     you can focus on growing your business and serving your
//                     customers.
//                   </p>
//                 </div>
//               </div>
//               <div className="grid grid-cols-2 gap-3 md:gap-4 mt-6 lg:mt-0">
//                 <div className="aspect-square bg-orange-100 rounded-xl overflow-hidden">
//                   <div className="w-full h-full flex items-center justify-center">
//                     <Image
//                       src="/placeholder.svg?height=300&width=300"
//                       width={300}
//                       height={300}
//                       alt="Team member"
//                       className="object-cover w-full h-full"
//                     />
//                   </div>
//                 </div>
//                 <div className="aspect-square bg-orange-100 rounded-xl overflow-hidden">
//                   <div className="w-full h-full flex items-center justify-center">
//                     <Image
//                       src="/placeholder.svg?height=300&width=300"
//                       width={300}
//                       height={300}
//                       alt="Office space"
//                       className="object-cover w-full h-full"
//                     />
//                   </div>
//                 </div>
//                 <div className="aspect-square bg-orange-100 rounded-xl overflow-hidden">
//                   <div className="w-full h-full flex items-center justify-center">
//                     <Image
//                       src="/placeholder.svg?height=300&width=300"
//                       width={300}
//                       height={300}
//                       alt="Product showcase"
//                       className="object-cover w-full h-full"
//                     />
//                   </div>
//                 </div>
//                 <div className="aspect-square bg-orange-100 rounded-xl overflow-hidden">
//                   <div className="w-full h-full flex items-center justify-center">
//                     <Image
//                       src="/placeholder.svg?height=300&width=300"
//                       width={300}
//                       height={300}
//                       alt="Customer using app"
//                       className="object-cover w-full h-full"
//                     />
//                   </div>
//                 </div>
//               </div>
//             </div>
//           </div>
//         </section>

//         {/* FAQ Section */}
//         <section
//           id="faq"
//           className="w-full py-16 md:py-20 bg-white scroll-mt-16"
//         >
//           <div className="container px-4 md:px-6">
//             <div className="max-w-4xl mx-auto">
//               <div className="text-center mb-12">
//                 <h2 className="text-2xl md:text-3xl font-bold text-gray-900 mb-4">
//                   Frequently Asked Questions
//                 </h2>
//                 <p className="text-lg md:text-xl text-gray-600">
//                   Everything you need to know about getting started
//                 </p>
//               </div>

//               <div className="space-y-6">
//                 {/* Supplier FAQs */}
//                 <div className="bg-gradient-to-br from-orange-50 to-pink-50 rounded-2xl p-6">
//                   <h3 className="text-xl font-bold mb-4 text-[#FF7A21]">
//                     For Suppliers
//                   </h3>
//                   <div className="space-y-4">
//                     <div>
//                       <h4 className="font-semibold mb-2">
//                         How much does it cost to list my products?
//                       </h4>
//                       <p className="text-gray-600 text-sm">
//                         Absolutely nothing! We only make money when you make
//                         sales. No listing fees, no monthly charges.
//                       </p>
//                     </div>
//                     <div>
//                       <h4 className="font-semibold mb-2">How do I get paid?</h4>
//                       <p className="text-gray-600 text-sm">
//                        You can withdraw your margin to your account 3
//                         days after successful delivery. We handle the payment
//                         processing.
//                       </p>
//                     </div>
//                   </div>
//                 </div>

//                 {/* Plug FAQs */}
//                 <div className="bg-white border-2 border-orange-100 rounded-2xl p-6">
//                   <h3 className="text-xl font-bold mb-4 text-[#FF7A21]">
//                     For Plugs
//                   </h3>
//                   <div className="space-y-4">
//                     <div>
//                       <h4 className="font-semibold mb-2">
//                         How much money can I realistically make?
//                       </h4>
//                       <p className="text-gray-600 text-sm">
//                         Our top Plugs earn ₦150K-250K+ monthly. Beginners
//                         typically start with ₦50K-100K in their first month.
//                         Your earnings depend on your effort and audience size.
//                       </p>
//                     </div>
//                     <div>
//                       <h4 className="font-semibold mb-2">
//                         Do I need money to start?
//                       </h4>
//                       <p className="text-gray-600 text-sm">
//                         No! It's completely free to join and start selling. You
//                         don't buy any products upfront—you only earn when
//                         customers purchase.
//                       </p>
//                     </div>
//                     <div>
//                       <h4 className="font-semibold mb-2">
//                         How do I handle customer service?
//                       </h4>
//                       <p className="text-gray-600 text-sm">
//                         Pluggn handles most customer service, delivery tracking,
//                         and returns. You focus on selling and building
//                         relationships with your audience.
//                       </p>
//                     </div>
//                     <div>
//                       <h4 className="font-semibold mb-2">
//                         Can I sell on WhatsApp?
//                       </h4>
//                       <p className="text-gray-600 text-sm">
//                         Yes! Our platform is designed for social selling. Share
//                         product links directly to WhatsApp, Instagram, Facebook,
//                         or any social platform.
//                       </p>
//                     </div>
//                   </div>
//                 </div>

//                 {/* General FAQs */}
//                 <div className="bg-gradient-to-br from-orange-50 to-pink-50 rounded-2xl p-6">
//                   <h3 className="text-xl font-bold mb-4 text-[#FF7A21]">
//                     General Questions
//                   </h3>
//                   <div className="space-y-4">
//                     <div>
//                       <h4 className="font-semibold mb-2">
//                         How does delivery work?
//                       </h4>
//                       <p className="text-gray-600 text-sm">
//                         We partner with reliable logistics companies across
//                         Nigeria. Products ship directly from suppliers to
//                         customers with full tracking.
//                       </p>
//                     </div>
//                     <div>
//                       <h4 className="font-semibold mb-2">
//                         What if a customer wants to return a product?
//                       </h4>
//                       <p className="text-gray-600 text-sm">
//                         We have a clear return policy. Pluggn handles all
//                         returns and refunds, so you don't have to worry about
//                         it.
//                       </p>
//                     </div>
//                     <div>
//                       <h4 className="font-semibold mb-2">
//                         Is this available outside Nigeria?
//                       </h4>
//                       <p className="text-gray-600 text-sm">
//                         Currently, we focus on the Nigerian market, but we're
//                         expanding to other African countries soon!
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
//               <h2 className="text-2xl md:text-3xl font-bold mb-6">
//                 Ready to Transform Your Financial Future?
//               </h2>
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
//                     Start earning money online without inventory or upfront
//                     costs
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
//   );
// }







"use client"

import { useState, useEffect } from "react"
import Image from "next/image"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import {
  ShoppingBag,
  Store,
  Truck,
  CreditCard,
  Smartphone,
  Package,
  CheckCircle,
  Star,
  MessageCircle,
  X,
  Menu,
  ArrowRight,
  Users,
  TrendingUp,
  Shield,
  Zap,
  Target,
  DollarSign,
  Award,
  Verified,
} from "lucide-react"

export default function Home() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)
  const [scrolled, setScrolled] = useState(false)
  const [selectedUserType, setSelectedUserType] = useState<"supplier" | "plug" | null>(null)
  const [activeTab, setActiveTab] = useState<"supplier" | "plug">("plug")

  // Handle scroll event
  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 10)
    }
    window.addEventListener("scroll", handleScroll)
    return () => window.removeEventListener("scroll", handleScroll)
  }, [])

  // Scroll to section function
  const scrollToSection = (sectionId: string) => {
    const section = document.getElementById(sectionId)
    if (section) {
      section.scrollIntoView({ behavior: "smooth" })
      setMobileMenuOpen(false)
    }
  }

  // Close mobile menu when window is resized
  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth >= 768 && mobileMenuOpen) {
        setMobileMenuOpen(false)
      }
    }
    window.addEventListener("resize", handleResize)
    return () => window.removeEventListener("resize", handleResize)
  }, [mobileMenuOpen])

  // Prevent body scroll when mobile menu is open
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

  return (
    <div className="flex min-h-screen flex-col">
      {/* Header */}
      <header
        className={`sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60 transition-all duration-300 ${
          scrolled ? "shadow-lg border-orange-200" : ""
        }`}
      >
        <div className="container flex h-16 items-center justify-between px-4 md:px-6">
          <div className="flex items-center gap-2">
            <Link href="/" className="flex items-center gap-2">
              <Image src="/pluggn_logo.png" alt="Pluggn Logo" width={140} height={35} priority className="h-auto" />
            </Link>
          </div>
          <nav className="hidden md:flex gap-6">
            <button
              onClick={() => scrollToSection("how-it-works")}
              className="text-sm font-medium hover:text-[#FF7A21] transition-colors"
            >
              How It Works
            </button>
            <button
              onClick={() => scrollToSection("success-stories")}
              className="text-sm font-medium hover:text-[#FF7A21] transition-colors"
            >
              Success Stories
            </button>
            <button
              onClick={() => scrollToSection("faq")}
              className="text-sm font-medium hover:text-[#FF7A21] transition-colors"
            >
              FAQ
            </button>
          </nav>
          <div className="flex items-center gap-4">
            <Link
              href="/dashboard"
              className="hidden md:inline-flex h-9 items-center justify-center rounded-md border border-[#FF7A21] px-4 py-2 text-sm font-medium text-[#FF7A21] transition-colors hover:bg-[#FF7A21] hover:text-white"
            >
              Sign In
            </Link>
            <Button className="bg-[#FF7A21] hover:bg-[#e86b12] text-white shadow-lg">
              <Link href="/auth/register">Get Started</Link>
            </Button>
            <button
              className="md:hidden flex items-center justify-center h-10 w-10 rounded-md hover:bg-gray-100 transition-colors"
              onClick={() => setMobileMenuOpen(true)}
              aria-label="Open menu"
            >
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
      ></div>
      <div
        className={`fixed top-0 right-0 z-50 h-full w-[75%] max-w-[300px] bg-white shadow-xl transform transition-transform duration-300 ease-in-out ${
          mobileMenuOpen ? "translate-x-0" : "translate-x-full"
        } flex flex-col`}
      >
        <div className="flex items-center justify-between p-4 border-b">
          <Image src="/pluggn_logo.png" alt="Pluggn Logo" width={120} height={30} priority className="h-auto" />
          <button
            onClick={() => setMobileMenuOpen(false)}
            className="h-10 w-10 flex items-center justify-center rounded-md hover:bg-gray-100"
            aria-label="Close menu"
          >
            <X className="h-5 w-5" />
          </button>
        </div>
        <nav className="flex flex-col p-4 space-y-4">
          <button
            onClick={() => scrollToSection("how-it-works")}
            className="text-base font-medium py-2 hover:text-[#FF7A21] transition-colors text-left"
          >
            How It Works
          </button>
          <button
            onClick={() => scrollToSection("success-stories")}
            className="text-base font-medium py-2 hover:text-[#FF7A21] transition-colors text-left"
          >
            Success Stories
          </button>
          <button
            onClick={() => scrollToSection("faq")}
            className="text-base font-medium py-2 hover:text-[#FF7A21] transition-colors text-left"
          >
            FAQ
          </button>
          <div className="pt-4 border-t">
            <Link
              href="/dashboard"
              className="block w-full py-2 px-4 text-center rounded-md border border-[#FF7A21] text-[#FF7A21] font-medium mb-3"
            >
              Sign In
            </Link>
            <Link
              href="/auth/register"
              className="block w-full py-2 px-4 text-center rounded-md bg-gradient-to-r from-[#FF7A21] to-[#ff8c42] text-white font-medium"
            >
              Get Started
            </Link>
          </div>
        </nav>
      </div>

      <main className="flex-1">
        {/* Hero Section */}
        <section className="w-full py-12 md:py-20 lg:py-28 bg-gradient-to-br from-white via-orange-50 to-pink-50 relative overflow-hidden">
          {/* Background decoration */}
          <div className="absolute inset-0 bg-gradient-to-r from-[#FF7A21]/5 to-[#ff8c42]/5"></div>
          <div className="absolute top-20 right-10 w-72 h-72 bg-gradient-to-br from-[#FF7A21]/10 to-[#ff8c42]/10 rounded-full blur-3xl"></div>
          <div className="absolute bottom-20 left-10 w-96 h-96 bg-gradient-to-br from-[#ff8c42]/10 to-[#ffb366]/10 rounded-full blur-3xl"></div>

          <div className="container px-4 md:px-6 relative z-10">
            <div className="flex flex-col items-center text-center space-y-8 max-w-4xl mx-auto">
              {/* Trust indicators */}
              <div className="flex items-center gap-2 bg-white/80 backdrop-blur-sm rounded-full px-4 py-2 shadow-sm">
                <div className="flex">
                  {[...Array(5)].map((_, i) => (
                    <Star key={i} className="h-4 w-4 fill-[#FF7A21] text-[#FF7A21]" />
                  ))}
                </div>
                <span className="text-xs md:text-sm text-gray-600 font-medium">Trusted by 5,000+ entrepreneurs</span>
              </div>

              {/* Main headline */}
              <div className="space-y-4">
                <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold tracking-tight text-gray-900">
                  <span className="bg-[#FF7A21] bg-clip-text text-transparent">Sell Online</span> Without Inventory,
                  Logistics, or Technical Hassles
                  <br />
                  <span className="text-xl md:text-2xl">Just Sell and Earn</span>
                </h1>
                <p className="text-base md:text-lg text-gray-600 max-w-3xl mx-auto leading-relaxed">
                  Nigeria's #1 social commerce platform where anyone can earn money selling products online—without
                  inventory, logistics issues, or technical skills. When purchasing from a Pluggn store, buyers can be
                  totally assured of premium product quality and secure transactions, as all products are carefully
                  curated and verified by our expert team.
                </p>
              </div>

              {/* Buyer Assurance Badge */}
              <div className="bg-white/90 backdrop-blur-sm rounded-2xl px-6 py-4 shadow-lg border border-orange-200">
                <div className="flex items-center gap-3">
                  <div className="w-12 h-12 bg-green-100 rounded-full flex items-center justify-center">
                    <Verified className="h-6 w-6 text-green-600" />
                  </div>
                  <div className="text-left">
                    <h3 className="font-bold text-gray-900 text-sm md:text-base">100% Buyer Protection Guarantee</h3>
                    <p className="text-gray-600 text-xs md:text-sm">
                      Quality-verified products • Secure payments • Full refund protection
                    </p>
                  </div>
                </div>
              </div>

              {/* User Type Selector */}
              <div className="w-full max-w-2xl">
                <p className="text-lg font-semibold text-gray-700 mb-6">Choose your path to success:</p>
                <div className="grid md:grid-cols-2 gap-4">
                  <button
                    onClick={() => {
                      setSelectedUserType("supplier")
                      scrollToSection("suppliers-section")
                    }}
                    className="group relative bg-white hover:bg-[#FF7A21] border-2 border-[#FF7A21] rounded-2xl p-6 transition-all duration-300 hover:shadow-2xl hover:scale-105 hover:text-white"
                  >
                    <div className="flex items-center justify-center mb-4">
                      <Store className="h-12 w-12 text-[#FF7A21] group-hover:text-white transition-colors" />
                    </div>
                    <h3 className="text-lg font-bold mb-2 text-gray-900 group-hover:text-white">
                      I Have Products to Sell
                    </h3>
                    <p className="text-gray-600 group-hover:text-white/90 text-sm">
                      Multiply your sales channels through our network of social sellers
                    </p>
                    <ArrowRight className="h-5 w-5 absolute top-4 right-4 text-[#FF7A21] group-hover:text-white transition-colors" />
                  </button>
                  <button
                    onClick={() => {
                      setSelectedUserType("plug")
                      scrollToSection("plugs-section")
                    }}
                    className="group relative bg-[#FF7A21] text-white border-2 border-[#FF7A21] rounded-2xl p-6 transition-all duration-300 hover:shadow-2xl hover:scale-105"
                  >
                    <div className="flex items-center justify-center mb-4">
                      <Smartphone className="h-12 w-12 text-white" />
                    </div>
                    <h3 className="text-lg font-bold mb-2">I Want to Sell Online</h3>
                    <p className="text-white/90 text-sm">
                      Start earning without inventory, logistics issues, or upfront costs
                    </p>
                    <ArrowRight className="h-5 w-5 absolute top-4 right-4 text-white" />
                  </button>
                </div>
              </div>

              {/* Quick stats */}
              <div className="grid grid-cols-3 gap-8 pt-8">
                <div className="text-center">
                  <div className="text-xl md:text-2xl font-bold text-[#FF7A21]">5K+</div>
                  <div className="text-sm text-gray-600">Active Users</div>
                </div>
                <div className="text-center">
                  <div className="text-xl md:text-2xl font-bold text-[#FF7A21]">₦2M+</div>
                  <div className="text-sm text-gray-600">Monthly Sales</div>
                </div>
                <div className="text-center">
                  <div className="text-xl md:text-2xl font-bold text-[#FF7A21]">99%</div>
                  <div className="text-sm text-gray-600">Success Rate</div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Suppliers Section - Concise & Benefit-Focused */}
        <section id="suppliers-section" className="w-full py-16 md:py-20 bg-white scroll-mt-16">
          <div className="container px-4 md:px-6">
            <div className="max-w-6xl mx-auto">
              <div className="text-center mb-12">
                <div className="inline-flex items-center gap-2 bg-orange-100 rounded-full px-4 py-2 mb-4">
                  <Store className="h-5 w-5 text-[#FF7A21]" />
                  <span className="text-[#FF7A21] font-semibold">For Suppliers</span>
                </div>
                <h2 className="text-2xl md:text-3xl font-bold text-gray-900 mb-4">Multiply Your Sales Channels</h2>
                <p className="text-lg md:text-xl text-gray-600 max-w-3xl mx-auto">
                  Access thousands of motivated social sellers who promote your products across Nigeria—while you focus
                  on what you do best.
                </p>
              </div>
              <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6 mb-12">
                <div className="bg-gradient-to-br from-orange-50 to-pink-50 rounded-2xl p-6 text-center hover:shadow-lg transition-shadow">
                  <div className="w-16 h-16 bg-[#FF7A21] rounded-2xl flex items-center justify-center mx-auto mb-4">
                    <TrendingUp className="h-8 w-8 text-white" />
                  </div>
                  <h3 className="text-base md:text-lg font-bold mb-2">Multiply Sales Channels</h3>
                  <p className="text-gray-600 text-sm">Access thousands of social sellers promoting your products</p>
                </div>
                <div className="bg-gradient-to-br from-orange-50 to-pink-50 rounded-2xl p-6 text-center hover:shadow-lg transition-shadow">
                  <div className="w-16 h-16 bg-[#FF7A21] rounded-2xl flex items-center justify-center mx-auto mb-4">
                    <Zap className="h-8 w-8 text-white" />
                  </div>
                  <h3 className="text-base md:text-lg font-bold mb-2">Zero Marketing Effort</h3>
                  <p className="text-gray-600 text-sm">Others promote your products while you focus on quality</p>
                </div>
                <div className="bg-gradient-to-br from-orange-50 to-pink-50 rounded-2xl p-6 text-center hover:shadow-lg transition-shadow">
                  <div className="w-16 h-16 bg-[#FF7A21]  rounded-2xl flex items-center justify-center mx-auto mb-4">
                    <Award className="h-8 w-8 text-white" />
                  </div>
                  <h3 className="text-base md:text-lg font-bold mb-2">Professional Presentation</h3>
                  <p className="text-gray-600 text-sm">We handle photos, listings</p>
                </div>
                <div className="bg-gradient-to-br from-orange-50 to-pink-50 rounded-2xl p-6 text-center hover:shadow-lg transition-shadow">
                  <div className="w-16 h-16 bg-[#FF7A21]  rounded-2xl flex items-center justify-center mx-auto mb-4">
                    <Shield className="h-8 w-8 text-white" />
                  </div>
                  <h3 className="text-base md:text-lg font-bold mb-2">Guaranteed Payments</h3>
                  <p className="text-gray-600 text-sm">Secure, timely payouts after 3 days of delivery</p>
                </div>
              </div>
              {/* Quick Process */}
              <div className="bg-[#FF7A21]  rounded-3xl p-8 md:p-12 text-white text-center">
                <h3 className="text-xl md:text-2xl font-bold mb-6">Simple 3-Step Process</h3>
                <div className="grid md:grid-cols-3 gap-8">
                  <div className="flex flex-col items-center">
                    <div className="w-12 h-12 bg-white/20 rounded-full flex items-center justify-center mb-4">
                      <span className="text-xl font-bold">1</span>
                    </div>
                    <h4 className="font-semibold mb-2">List Your Products</h4>
                    <p className="text-white/90 text-sm">Upload your inventory with our help</p>
                  </div>
                  <div className="flex flex-col items-center">
                    <div className="w-12 h-12 bg-white/20 rounded-full flex items-center justify-center mb-4">
                      <span className="text-xl font-bold">2</span>
                    </div>
                    <h4 className="font-semibold mb-2">Get Promoted</h4>
                    <p className="text-white/90 text-sm">Social sellers share your products</p>
                  </div>
                  <div className="flex flex-col items-center">
                    <div className="w-12 h-12 bg-white/20 rounded-full flex items-center justify-center mb-4">
                      <span className="text-xl font-bold">3</span>
                    </div>
                    <h4 className="font-semibold mb-2">Get Paid</h4>
                    <p className="text-white/90 text-sm">Automatic payouts after delivery</p>
                  </div>
                </div>
                <Button className="mt-8 bg-white text-[#FF7A21] hover:bg-gray-100 font-semibold px-8 py-3">
                  <Link href="/auth/register">Start as Supplier</Link>
                </Button>
              </div>
            </div>
          </div>
        </section>

        {/* Plugs Section - Detailed & Expansive */}
        <section
          id="plugs-section"
          className="w-full py-16 md:py-20 bg-gradient-to-br from-orange-50 to-pink-50 scroll-mt-16"
        >
          <div className="container px-4 md:px-6">
            <div className="max-w-6xl mx-auto">
              <div className="text-center mb-12">
                <div className="inline-flex items-center gap-2 bg-white rounded-full px-4 py-2 mb-4 shadow-sm">
                  <Smartphone className="h-5 w-5 text-[#FF7A21]" />
                  <span className="text-[#FF7A21] font-semibold">For Plugs (Social Sellers)</span>
                </div>
                <h2 className="text-2xl md:text-3xl font-bold text-gray-900 mb-4">Start Your Online Business Today</h2>
                <p className="text-lg md:text-xl text-gray-600 max-w-3xl mx-auto">
                  Earn money selling products online without inventory, logistics issues, or technical skills. Join
                  thousands making ₦100K+ monthly.
                </p>
              </div>

              {/* What Plugs Do */}
              <div className="bg-white rounded-3xl p-8 md:p-12 shadow-lg mb-12">
                <h3 className="text-2xl md:text-3xl font-bold text-center mb-8">What Plugs Do</h3>
                <div className="grid md:grid-cols-3 gap-8">
                  <div className="text-center">
                    <div className="w-16 h-16 bg-[#FF7A21]  rounded-2xl flex items-center justify-center mx-auto mb-4">
                      <ShoppingBag className="h-8 w-8 text-white" />
                    </div>
                    <h4 className="font-bold mb-2">Choose Products</h4>
                    <p className="text-gray-600 text-sm">Browse our marketplace and select products you want to sell</p>
                  </div>
                  <div className="text-center">
                    <div className="w-16 h-16 bg-[#FF7A21]  rounded-2xl flex items-center justify-center mx-auto mb-4">
                      <DollarSign className="h-8 w-8 text-white" />
                    </div>
                    <h4 className="font-bold mb-2">Set Your Prices</h4>
                    <p className="text-gray-600 text-sm">
                      Add your profit margin to each product—you control your earnings
                    </p>
                  </div>
                  <div className="text-center">
                    <div className="w-16 h-16 bg-[#FF7A21]  rounded-2xl flex items-center justify-center mx-auto mb-4">
                      <MessageCircle className="h-8 w-8 text-white" />
                    </div>
                    <h4 className="font-bold mb-2">Share & Earn</h4>
                    <p className="text-gray-600 text-sm">Share on social media or your store and earn on every sale</p>
                  </div>
                </div>
              </div>

              {/* Store Creation */}
              <div className="grid lg:grid-cols-2 gap-12 items-center mb-12">
                <div>
                  <h3 className="text-2xl md:text-3xl font-bold mb-6">Build Your Professional Store</h3>
                  <div className="space-y-4">
                    <div className="flex items-start gap-3">
                      <CheckCircle className="h-6 w-6 text-[#FF7A21] mt-0.5 flex-shrink-0" />
                      <div>
                        <h4 className="font-semibold">No-Code Store Builder</h4>
                        <p className="text-gray-600 text-sm">
                          Create a professional online store in minutes without technical skills
                        </p>
                      </div>
                    </div>
                    <div className="flex items-start gap-3">
                      <CheckCircle className="h-6 w-6 text-[#FF7A21] mt-0.5 flex-shrink-0" />
                      <div>
                        <h4 className="font-semibold">Fully Customizable</h4>
                        <p className="text-gray-600 text-sm">
                          Add your branding, colors, and personal touch to stand out
                        </p>
                      </div>
                    </div>
                    <div className="flex items-start gap-3">
                      <CheckCircle className="h-6 w-6 text-[#FF7A21] mt-0.5 flex-shrink-0" />
                      <div>
                        <h4 className="font-semibold">Mobile-Optimized</h4>
                        <p className="text-gray-600 text-sm">Your store looks perfect on all devices automatically</p>
                      </div>
                    </div>
                  </div>
                </div>
                <div className="relative">
                  <div className="bg-white rounded-2xl p-6 shadow-xl">
                    <Image
                      src="/placeholder.svg?height=300&width=400"
                      alt="Store Builder Interface"
                      width={400}
                      height={300}
                      className="rounded-lg"
                    />
                  </div>
                </div>
              </div>

              {/* Social Selling */}
              <div className="bg-white rounded-3xl p-8 md:p-12 shadow-lg mb-12">
                <h3 className="text-2xl md:text-3xl font-bold text-center mb-8">Social Media Made Easy</h3>
                <div className="grid md:grid-cols-2 gap-8 items-center">
                  <div>
                    <div className="space-y-4">
                      <div className="flex items-start gap-3">
                        <div className="w-8 h-8 bg-[#FF7A21] rounded-full flex items-center justify-center flex-shrink-0">
                          <span className="text-white text-sm font-bold">1</span>
                        </div>
                        <div>
                          <h4 className="font-semibold">Magazine-Style Product Cards</h4>
                          <p className="text-gray-600 text-sm">
                            Beautiful, professional product images generated automatically
                          </p>
                        </div>
                      </div>
                      <div className="flex items-start gap-3">
                        <div className="w-8 h-8 bg-[#FF7A21] rounded-full flex items-center justify-center flex-shrink-0">
                          <span className="text-white text-sm font-bold">2</span>
                        </div>
                        <div>
                          <h4 className="font-semibold">One-Click Sharing</h4>
                          <p className="text-gray-600 text-sm">
                            Share to WhatsApp, Instagram, Facebook, and more instantly
                          </p>
                        </div>
                      </div>
                      <div className="flex items-start gap-3">
                        <div className="w-8 h-8 bg-[#FF7A21] rounded-full flex items-center justify-center flex-shrink-0">
                          <span className="text-white text-sm font-bold">3</span>
                        </div>
                        <div>
                          <h4 className="font-semibold">Automatic Checkout</h4>
                          <p className="text-gray-600 text-sm">
                            Customers click your link and go straight to secure checkout
                          </p>
                        </div>
                      </div>
                    </div>
                  </div>
                  <div className="bg-gradient-to-br from-orange-100 to-pink-100 rounded-2xl p-6">
                    <Image
                      src="/placeholder.svg?height=250&width=300"
                      alt="Social Media Cards"
                      width={300}
                      height={250}
                      className="rounded-lg mx-auto"
                    />
                  </div>
                </div>
              </div>

              {/* Earning Process */}
              <div className="bg-[#FF7A21]  rounded-3xl p-8 md:p-12 text-white mb-12">
                <h3 className="text-2xl md:text-3xl font-bold text-center mb-8">How You Earn Money</h3>
                <div className="grid md:grid-cols-4 gap-6">
                  <div className="text-center">
                    <div className="w-16 h-16 bg-white/20 rounded-2xl flex items-center justify-center mx-auto mb-4">
                      <Target className="h-8 w-8 text-white" />
                    </div>
                    <h4 className="font-bold mb-2">Set Your Margin</h4>
                    <p className="text-white/90 text-sm">Add 20-50% profit to any product</p>
                  </div>
                  <div className="text-center">
                    <div className="w-16 h-16 bg-white/20 rounded-2xl flex items-center justify-center mx-auto mb-4">
                      <Users className="h-8 w-8 text-white" />
                    </div>
                    <h4 className="font-bold mb-2">Customer Orders</h4>
                    <p className="text-white/90 text-sm">Buyers purchase through your links</p>
                  </div>
                  <div className="text-center">
                    <div className="w-16 h-16 bg-white/20 rounded-2xl flex items-center justify-center mx-auto mb-4">
                      <Truck className="h-8 w-8 text-white" />
                    </div>
                    <h4 className="font-bold mb-2">We Handle Delivery</h4>
                    <p className="text-white/90 text-sm">Product ships directly to customer</p>
                  </div>
                  <div className="text-center">
                    <div className="w-16 h-16 bg-white/20 rounded-2xl flex items-center justify-center mx-auto mb-4">
                      <CreditCard className="h-8 w-8 text-white" />
                    </div>
                    <h4 className="font-bold mb-2">Get Paid</h4>
                    <p className="text-white/90 text-sm">Withdraw earnings after 3 days</p>
                  </div>
                </div>
              </div>

              <div className="bg-white rounded-3xl p-4 sm:p-6 md:p-8 shadow-lg mb-8 sm:mb-10 md:mb-12">
                <h3 className="text-xl sm:text-2xl md:text-3xl font-bold text-center mb-4 sm:mb-6 md:mb-8">
                  Real Earning Example
                </h3>
                <div className="max-w-xl mx-auto">
                  <div className="bg-gradient-to-br from-orange-50 to-pink-50 rounded-2xl p-4 sm:p-6 mb-4 sm:mb-6">
                    <div className="text-center">
                      <Image
                        src="/placeholder.svg?height=200&width=200"
                        alt="Sneaker Example"
                        width={160}
                        height={160}
                        className="mx-auto rounded-lg mb-3 sm:mb-4"
                      />
                      <h4 className="text-lg sm:text-xl font-bold mb-2 sm:mb-4">Premium Sneakers</h4>
                      <div className="grid grid-cols-3 gap-2 sm:gap-4 text-center">
                        <div>
                          <div className="text-base md:text-xl font-bold text-gray-600">₦20,000</div>
                          <div className="text-xs sm:text-sm text-gray-500">Supplier Price</div>
                        </div>
                        <div>
                          <div className="text-base md:text-xl font-bold text-[#FF7A21]">₦25,000</div>
                          <div className="text-xs sm:text-sm text-gray-500">Your Price</div>
                        </div>
                        <div>
                          <div className="text-base md:text-xl font-bold text-green-600">₦4,500</div>
                          <div className="text-xs sm:text-sm text-gray-500">Your Profit*</div>
                        </div>
                      </div>
                      <p className="text-[10px] sm:text-xs text-gray-500 mt-2">*After 10% platform fee</p>
                    </div>
                  </div>
                  <div className="text-center px-2 sm:px-4">
                    <p className="text-base sm:text-lg text-gray-600 mb-2 sm:mb-4 font-medium">
                      Sell just 10 pairs per month = <span className="font-bold">₦45,000 profit!</span>
                    </p>
                    <p className="text-xs sm:text-sm text-gray-500 leading-snug">
                      Many of our top Plugs earn ₦200,000+ monthly by promoting multiple products
                    </p>
                  </div>
                </div>
              </div>

              {/* Benefits Summary */}
              <div className="grid md:grid-cols-3 gap-6">
                <div className="bg-white rounded-2xl p-6 shadow-lg text-center">
                  <Package className="h-12 w-12 text-[#FF7A21] mx-auto mb-4" />
                  <h4 className="font-bold mb-2">No Inventory Risk</h4>
                  <p className="text-gray-600 text-sm">Never buy stock or worry about storage</p>
                </div>
                <div className="bg-white rounded-2xl p-6 shadow-lg text-center">
                  <Truck className="h-12 w-12 text-[#FF7A21] mx-auto mb-4" />
                  <h4 className="font-bold mb-2">No Shipping Hassle</h4>
                  <p className="text-gray-600 text-sm">Products ship directly from suppliers</p>
                </div>
                <div className="bg-white rounded-2xl p-6 shadow-lg text-center">
                  <Zap className="h-12 w-12 text-[#FF7A21] mx-auto mb-4" />
                  <h4 className="font-bold mb-2">No Technical Skills</h4>
                  <p className="text-gray-600 text-sm">Everything is designed for beginners</p>
                </div>
              </div>
              <div className="text-center mt-12">
                <Button className="bg-[#FF7A21]  text-white px-8 py-4 text-lg font-semibold shadow-lg">
                  <Link href="/auth/register">Start Earning as a Plug</Link>
                </Button>
              </div>
            </div>
          </div>
        </section>

        {/* How It Works - Unified Process */}
        <section id="how-it-works" className="w-full py-16 md:py-20 bg-white scroll-mt-16">
          <div className="container px-4 md:px-6">
            <div className="max-w-6xl mx-auto">
              <div className="text-center mb-12">
                <h2 className="text-2xl md:text-3xl font-bold text-gray-900 mb-4">How It All Works Together</h2>
                <p className="text-lg md:text-xl text-gray-600 max-w-3xl mx-auto">
                  See how suppliers, plugs, and buyers interact in our ecosystem
                </p>
              </div>
              <div className="relative">
                {/* Flow diagram */}
                <div className="grid md:grid-cols-5 gap-8 relative">
                  {/* Step 1 */}
                  <div className="relative">
                    <div className="bg-gradient-to-br from-orange-50 to-pink-50 rounded-2xl p-6 text-center">
                      <div className="w-16 h-16 bg-[#FF7A21]  rounded-full flex items-center justify-center mx-auto mb-4">
                        <Store className="h-8 w-8 text-white" />
                      </div>
                      <h3 className="font-bold mb-2">Supplier Lists Product</h3>
                      <p className="text-gray-600 text-sm">Business owner uploads sneakers at ₦20,000</p>
                    </div>
                  </div>
                  {/* Arrow */}
                  <div className="hidden md:flex items-center justify-center">
                    <ArrowRight className="h-8 w-8 text-[#FF7A21]" />
                  </div>
                  {/* Step 2 */}
                  <div className="relative">
                    <div className="bg-gradient-to-br from-orange-50 to-pink-50 rounded-2xl p-6 text-center">
                      <div className="w-16 h-16 bg-[#FF7A21]  rounded-full flex items-center justify-center mx-auto mb-4">
                        <Smartphone className="h-8 w-8 text-white" />
                      </div>
                      <h3 className="font-bold mb-2">Plug Chooses & Promotes</h3>
                      <p className="text-gray-600 text-sm">Social seller sets price at ₦25,000 and shares</p>
                    </div>
                  </div>
                  {/* Arrow */}
                  <div className="hidden md:flex items-center justify-center">
                    <ArrowRight className="h-8 w-8 text-[#FF7A21]" />
                  </div>
                  {/* Step 3 */}
                  <div className="relative">
                    <div className="bg-gradient-to-br from-orange-50 to-pink-50 rounded-2xl p-6 text-center">
                      <div className="w-16 h-16 bg-[#FF7A21]  rounded-full flex items-center justify-center mx-auto mb-4">
                        <Users className="h-8 w-8 text-white" />
                      </div>
                      <h3 className="font-bold mb-2">Buyer Purchases</h3>
                      <p className="text-gray-600 text-sm">Customer pays ₦25,000 through secure checkout</p>
                    </div>
                  </div>
                </div>
                {/* Second row */}
              </div>
            </div>
          </div>
        </section>

        {/* What Pluggn Does Section */}
        <section className="w-full py-16 md:py-20 bg-gradient-to-br from-orange-50 to-pink-50">
          <div className="container px-4 md:px-6">
            <div className="max-w-6xl mx-auto">
              <div className="text-center mb-12">
                <h2 className="text-2xl md:text-3xl font-bold text-gray-900 mb-4">What Pluggn Does For You</h2>
                <p className="text-lg md:text-xl text-gray-600 max-w-3xl mx-auto">
                  We handle all the complex parts of e-commerce so you can focus on what matters—selling and earning
                </p>
              </div>
              <div className="grid md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
                {/* Payment Processing */}
                <div className="bg-white rounded-2xl p-6 shadow-lg hover:shadow-xl transition-shadow">
                  <div className="w-16 h-16 bg-[#FF7A21]  rounded-2xl flex items-center justify-center mx-auto mb-4">
                    <CreditCard className="h-8 w-8 text-white" />
                  </div>
                  <h3 className="text-xl font-bold text-center mb-3">Secure Payments</h3>
                  <p className="text-gray-600 text-center text-sm">
                    We process all payments securely through Paystack and handle Pay-on-Delivery options. you can
                    withdraw after payment as being released after delivery.
                  </p>
                </div>
                {/* Logistics & Delivery */}
                <div className="bg-white rounded-2xl p-6 shadow-lg hover:shadow-xl transition-shadow">
                  <div className="w-16 h-16 bg-[#FF7A21]  rounded-2xl flex items-center justify-center mx-auto mb-4">
                    <Truck className="h-8 w-8 text-white" />
                  </div>
                  <h3 className="text-xl font-bold text-center mb-3">Logistics & Delivery</h3>
                  <p className="text-gray-600 text-center text-sm">
                    Our logistics partners deliver products nationwide. We coordinate pickup from suppliers and delivery
                    to customers with full tracking.
                  </p>
                </div>
                {/* Customer Service */}
                <div className="bg-white rounded-2xl p-6 shadow-lg hover:shadow-xl transition-shadow">
                  <div className="w-16 h-16 bg-[#FF7A21]  rounded-2xl flex items-center justify-center mx-auto mb-4">
                    <MessageCircle className="h-8 w-8 text-white" />
                  </div>
                  <h3 className="text-xl font-bold text-center mb-3">Customer Support</h3>
                  <p className="text-gray-600 text-center text-sm">
                    Our support team handles customer inquiries, order tracking, and resolves issues so you don't have
                    to worry about after-sales service.
                  </p>
                </div>
                {/* Returns & Refunds */}
                <div className="bg-white rounded-2xl p-6 shadow-lg hover:shadow-xl transition-shadow">
                  <div className="w-16 h-16 bg-[#FF7A21]  rounded-2xl flex items-center justify-center mx-auto mb-4">
                    <Shield className="h-8 w-8 text-white" />
                  </div>
                  <h3 className="text-xl font-bold text-center mb-3">Returns & Refunds</h3>
                  <p className="text-gray-600 text-center text-sm">
                    We manage all returns and refunds according to our policy. If there's an issue with a product, we
                    handle the entire process.
                  </p>
                </div>
                {/* Product Photography */}
                <div className="bg-white rounded-2xl p-6 shadow-lg hover:shadow-xl transition-shadow">
                  <div className="w-16 h-16 bg-[#FF7A21]  rounded-2xl flex items-center justify-center mx-auto mb-4">
                    <Award className="h-8 w-8 text-white" />
                  </div>
                  <h3 className="text-xl font-bold text-center mb-3">Professional Presentation</h3>
                  <p className="text-gray-600 text-center text-sm">
                    We create beautiful product photos, write compelling descriptions, and design eye-catching social
                    media cards for easy sharing.
                  </p>
                </div>
                {/* Order Management */}
                <div className="bg-white rounded-2xl p-6 shadow-lg hover:shadow-xl transition-shadow">
                  <div className="w-16 h-16 bg-[#FF7A21]  rounded-2xl flex items-center justify-center mx-auto mb-4">
                    <Package className="h-8 w-8 text-white" />
                  </div>
                  <h3 className="text-xl font-bold text-center mb-3">Order Management</h3>
                  <p className="text-gray-600 text-center text-sm">
                    From order placement to delivery confirmation, we track everything. You get real-time updates on all
                    your sales and earnings.
                  </p>
                </div>
                {/* Quality Product Curation - Enhanced with buyer assurance */}
                <div className="bg-white rounded-2xl p-6 shadow-lg hover:shadow-xl transition-shadow border-2 border-green-200">
                  <div className="w-16 h-16 bg-green-600 rounded-2xl flex items-center justify-center mx-auto mb-4">
                    <Verified className="h-8 w-8 text-white" />
                  </div>
                  <h3 className="text-xl font-bold text-center mb-3">Quality Assurance & Buyer Protection</h3>
                  <p className="text-gray-600 text-center text-sm">
                    When purchasing from a Pluggn store, buyers can be totally assured of premium product quality. We
                    carefully handpick and verify every product from trusted suppliers, ensuring only the highest
                    standards reach our customers.
                  </p>
                </div>
                {/* Buyer Trust & Safety */}
                <div className="bg-white rounded-2xl p-6 shadow-lg hover:shadow-xl transition-shadow border-2 border-blue-200">
                  <div className="w-16 h-16 bg-blue-600 rounded-2xl flex items-center justify-center mx-auto mb-4">
                    <Shield className="h-8 w-8 text-white" />
                  </div>
                  <h3 className="text-xl font-bold text-center mb-3">100% Buyer Protection</h3>
                  <p className="text-gray-600 text-center text-sm">
                    Every purchase is protected with our money-back guarantee. If buyers aren't completely satisfied
                    with product quality, we provide full refunds and handle all returns at no cost to them.
                  </p>
                </div>
              </div>
              {/* Bottom CTA */}
              <div className="text-center mt-12">
                <div className="bg-[#FF7A21]  rounded-2xl p-8 text-white">
                  <h3 className="text-2xl font-bold mb-4">Focus on What You Do Best</h3>
                  <p className="text-lg mb-6 text-white/90">
                    While we handle the technical stuff, you focus on building relationships with your customers and
                    growing your business.
                  </p>
                  <div className="flex flex-col sm:flex-row gap-4 justify-center">
                    <Button className="bg-white text-[#FF7A21] hover:bg-gray-100 font-semibold px-6 py-3">
                      <Link href="/auth/register">Join as Supplier</Link>
                    </Button>
                    <Button className="bg-white/10 border border-white text-white hover:bg-white/20 font-semibold px-6 py-3">
                      <Link href="/auth/register">Join as Plug</Link>
                    </Button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Success Stories */}
        <section
          id="success-stories"
          className="w-full py-16 md:py-20 bg-gradient-to-br from-orange-50 to-pink-50 scroll-mt-16"
        >
          <div className="container px-4 md:px-6">
            <div className="max-w-6xl mx-auto">
              <div className="text-center mb-12">
                <h2 className="text-2xl md:text-3xl font-bold text-gray-900 mb-4">Success Stories</h2>
                <p className="text-xl text-gray-600 max-w-3xl mx-auto">Real people earning real money with Pluggn</p>
              </div>
              <div className="grid md:grid-cols-3 gap-8">
                {/* Supplier Success */}
                <div className="bg-white rounded-2xl p-6 shadow-lg">
                  <div className="flex items-center mb-4">
                    <div className="w-12 h-12 bg-[#FF7A21]  rounded-full flex items-center justify-center mr-4">
                      <span className="text-white font-bold">AO</span>
                    </div>
                    <div>
                      <h3 className="font-bold">Adebayo Oladimeji</h3>
                      <p className="text-sm text-gray-600">Fashion Supplier, Eko market</p>
                    </div>
                  </div>
                  <p className="text-gray-700 mb-4">
                    "My sales increased by 300% in 6 months. I now have over 50 Plugs selling my products across
                    Nigeria. Best decision ever!"
                  </p>
                  <div className="flex items-center justify-between">
                    <div className="flex">
                      {[...Array(5)].map((_, i) => (
                        <Star key={i} className="h-4 w-4 fill-[#FF7A21] text-[#FF7A21]" />
                      ))}
                    </div>
                    <div className="text-right">
                      <div className="text-lg font-bold text-[#FF7A21]">₦400K+</div>
                      <div className="text-xs text-gray-500">Monthly Revenue</div>
                    </div>
                  </div>
                </div>
                {/* Plug Success 1 */}
                <div className="bg-white rounded-2xl p-6 shadow-lg">
                  <div className="flex items-center mb-4">
                    <div className="w-12 h-12 bg-[#FF7A21]  rounded-full flex items-center justify-center mr-4">
                      <span className="text-white font-bold">CI</span>
                    </div>
                    <div>
                      <h3 className="font-bold">Chioma Igwe</h3>
                      <p className="text-sm text-gray-600">Plug, Unilag</p>
                    </div>
                  </div>
                  <p className="text-gray-700 mb-4">
                    "Started with no capital. Now I make around ₦100,000 monthly just sharing products on WhatsApp. Omo
                    pluggn changed my life completely!"
                  </p>
                  <div className="flex items-center justify-between">
                    <div className="flex">
                      {[...Array(5)].map((_, i) => (
                        <Star key={i} className="h-4 w-4 fill-[#FF7A21] text-[#FF7A21]" />
                      ))}
                    </div>
                    <div className="text-right">
                      <div className="text-lg font-bold text-[#FF7A21]">₦100K+</div>
                      <div className="text-xs text-gray-500">Monthly Earnings</div>
                    </div>
                  </div>
                </div>
                {/* Plug Success 2 */}
                <div className="bg-white rounded-2xl p-6 shadow-lg">
                  <div className="flex items-center mb-4">
                    <div className="w-12 h-12 bg-[#FF7A21]  rounded-full flex items-center justify-center mr-4">
                      <span className="text-white font-bold">EM</span>
                    </div>
                    <div>
                      <h3 className="font-bold">Emmanuel Oluwasegun</h3>
                      <p className="text-sm text-gray-600">Plug, Ibadan</p>
                    </div>
                  </div>
                  <p className="text-gray-700 mb-4">
                    "University student earning more than my lecturers! Pluggn helped me become financially independent
                    while studying."
                  </p>
                  <div className="flex items-center justify-between">
                    <div className="flex">
                      {[...Array(5)].map((_, i) => (
                        <Star key={i} className="h-4 w-4 fill-[#FF7A21] text-[#FF7A21]" />
                      ))}
                    </div>
                    <div className="text-right">
                      <div className="text-lg font-bold text-[#FF7A21]">₦90K+</div>
                      <div className="text-xs text-gray-500">Monthly Earnings</div>
                    </div>
                  </div>
                </div>
              </div>
              {/* Stats */}
              <div className="grid grid-cols-2 md:grid-cols-4 gap-6 mt-12">
                <div className="text-center">
                  <div className="text-2xl font-bold text-[#FF7A21]">5,000+</div>
                  <div className="text-gray-600">Active Users</div>
                </div>
                <div className="text-center">
                  <div className="text-2xl font-bold text-[#FF7A21]">₦2M+</div>
                  <div className="text-gray-600">Monthly Sales</div>
                </div>
                <div className="text-center">
                  <div className="text-2xl font-bold text-[#FF7A21]">₦150K</div>
                  <div className="text-gray-600">Avg. Monthly Earnings</div>
                </div>
                <div className="text-center">
                  <div className="text-2xl font-bold text-[#FF7A21]">99%</div>
                  <div className="text-gray-600">Success Rate</div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* About Us Section */}
        <section id="about" className="w-full py-16 md:py-20 bg-white scroll-mt-16">
          <div className="container px-4 md:px-6">
            <div className="grid gap-8 lg:grid-cols-2 lg:gap-12 items-center">
              <div className="flex flex-col justify-center space-y-4">
                <div className="space-y-2">
                  <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold tracking-tighter text-gray-900">
                    About Pluggn
                  </h2>
                  <p className="max-w-[600px] text-gray-700 text-base md:text-lg">
                    We're on a mission to empower entrepreneurs across Africa by removing barriers to digital commerce.
                  </p>
                </div>
                <div className="space-y-3 md:space-y-4">
                  <p className="text-gray-700 text-sm md:text-base">
                    Pluggn was founded with a simple idea: make it possible for anyone to start an online business
                    without the traditional barriers.
                  </p>
                  <p className="text-gray-700 text-sm md:text-base">
                    Today, we're proud to help suppliers expand their market presence across Nigeria and beyond,
                    creating new business opportunities for entrepreneurs at every level.
                  </p>
                  <p className="text-gray-700 text-sm md:text-base">
                    Our platform handles the complex parts of e-commerce—payments, delivery, and inventory management—so
                    you can focus on growing your business and serving your customers.
                  </p>
                </div>
              </div>
              <div className="grid grid-cols-2 gap-3 md:gap-4 mt-6 lg:mt-0">
                <div className="aspect-square bg-orange-100 rounded-xl overflow-hidden">
                  <div className="w-full h-full flex items-center justify-center">
                    <Image
                      src="/placeholder.svg?height=300&width=300"
                      width={300}
                      height={300}
                      alt="Team member"
                      className="object-cover w-full h-full"
                    />
                  </div>
                </div>
                <div className="aspect-square bg-orange-100 rounded-xl overflow-hidden">
                  <div className="w-full h-full flex items-center justify-center">
                    <Image
                      src="/placeholder.svg?height=300&width=300"
                      width={300}
                      height={300}
                      alt="Office space"
                      className="object-cover w-full h-full"
                    />
                  </div>
                </div>
                <div className="aspect-square bg-orange-100 rounded-xl overflow-hidden">
                  <div className="w-full h-full flex items-center justify-center">
                    <Image
                      src="/placeholder.svg?height=300&width=300"
                      width={300}
                      height={300}
                      alt="Product showcase"
                      className="object-cover w-full h-full"
                    />
                  </div>
                </div>
                <div className="aspect-square bg-orange-100 rounded-xl overflow-hidden">
                  <div className="w-full h-full flex items-center justify-center">
                    <Image
                      src="/placeholder.svg?height=300&width=300"
                      width={300}
                      height={300}
                      alt="Customer using app"
                      className="object-cover w-full h-full"
                    />
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* FAQ Section */}
        <section id="faq" className="w-full py-16 md:py-20 bg-white scroll-mt-16">
          <div className="container px-4 md:px-6">
            <div className="max-w-4xl mx-auto">
              <div className="text-center mb-12">
                <h2 className="text-2xl md:text-3xl font-bold text-gray-900 mb-4">Frequently Asked Questions</h2>
                <p className="text-lg md:text-xl text-gray-600">Everything you need to know about getting started</p>
              </div>
              <div className="space-y-6">
                {/* Supplier FAQs */}
                <div className="bg-gradient-to-br from-orange-50 to-pink-50 rounded-2xl p-6">
                  <h3 className="text-xl font-bold mb-4 text-[#FF7A21]">For Suppliers</h3>
                  <div className="space-y-4">
                    <div>
                      <h4 className="font-semibold mb-2">How much does it cost to list my products?</h4>
                      <p className="text-gray-600 text-sm">
                        Absolutely nothing! We only make money when you make sales. No listing fees, no monthly charges.
                      </p>
                    </div>
                    <div>
                      <h4 className="font-semibold mb-2">How do I get paid?</h4>
                      <p className="text-gray-600 text-sm">
                        You can withdraw your margin to your account 3 days after successful delivery. We handle the
                        payment processing.
                      </p>
                    </div>
                  </div>
                </div>
                {/* Plug FAQs */}
                <div className="bg-white border-2 border-orange-100 rounded-2xl p-6">
                  <h3 className="text-xl font-bold mb-4 text-[#FF7A21]">For Plugs</h3>
                  <div className="space-y-4">
                    <div>
                      <h4 className="font-semibold mb-2">How much money can I realistically make?</h4>
                      <p className="text-gray-600 text-sm">
                        Our top Plugs earn ₦150K-250K+ monthly. Beginners typically start with ₦50K-100K in their first
                        month. Your earnings depend on your effort and audience size.
                      </p>
                    </div>
                    <div>
                      <h4 className="font-semibold mb-2">Do I need money to start?</h4>
                      <p className="text-gray-600 text-sm">
                        No! It's completely free to join and start selling. You don't buy any products upfront—you only
                        earn when customers purchase.
                      </p>
                    </div>
                    <div>
                      <h4 className="font-semibold mb-2">How do I handle customer service?</h4>
                      <p className="text-gray-600 text-sm">
                        Pluggn handles most customer service, delivery tracking, and returns. You focus on selling and
                        building relationships with your audience.
                      </p>
                    </div>
                    <div>
                      <h4 className="font-semibold mb-2">Can I sell on WhatsApp?</h4>
                      <p className="text-gray-600 text-sm">
                        Yes! Our platform is designed for social selling. Share product links directly to WhatsApp,
                        Instagram, Facebook, or any social platform.
                      </p>
                    </div>
                  </div>
                </div>
                {/* General FAQs */}
                <div className="bg-gradient-to-br from-orange-50 to-pink-50 rounded-2xl p-6">
                  <h3 className="text-xl font-bold mb-4 text-[#FF7A21]">General Questions</h3>
                  <div className="space-y-4">
                    <div>
                      <h4 className="font-semibold mb-2">How does delivery work?</h4>
                      <p className="text-gray-600 text-sm">
                        We partner with reliable logistics companies across Nigeria. Products ship directly from
                        suppliers to customers with full tracking.
                      </p>
                    </div>
                    <div>
                      <h4 className="font-semibold mb-2">What if a customer wants to return a product?</h4>
                      <p className="text-gray-600 text-sm">
                        We have a clear return policy. Pluggn handles all returns and refunds, so you don't have to
                        worry about it.
                      </p>
                    </div>
                    <div>
                      <h4 className="font-semibold mb-2">Is this available outside Nigeria?</h4>
                      <p className="text-gray-600 text-sm">
                        Currently, we focus on the Nigerian market, but we're expanding to other African countries soon!
                      </p>
                    </div>
                    <div>
                      <h4 className="font-semibold mb-2">How can buyers be sure of product quality?</h4>
                      <p className="text-gray-600 text-sm">
                        When purchasing from a Pluggn store, buyers can be totally assured of premium product quality.
                        Every product is carefully vetted by our quality team, and we offer a 100% money-back guarantee
                        if customers aren't completely satisfied.
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Dual Call-to-Action */}
        <section className="w-full py-16 md:py-20 bg-[#FF7A21]  relative overflow-hidden">
          {/* Background decoration */}
          <div className="absolute inset-0 bg-black/10"></div>
          <div className="absolute top-10 right-10 w-72 h-72 bg-white/10 rounded-full blur-3xl"></div>
          <div className="absolute bottom-10 left-10 w-96 h-96 bg-white/10 rounded-full blur-3xl"></div>
          <div className="container px-4 md:px-6 relative z-10">
            <div className="max-w-4xl mx-auto text-center text-white">
              <h2 className="text-2xl md:text-3xl font-bold mb-6">Ready to Transform Your Financial Future?</h2>
              <p className="text-lg md:text-xl  mb-12 text-white/90">
                Join thousands of successful entrepreneurs earning with Pluggn
              </p>
              <div className="grid md:grid-cols-2 gap-8 max-w-2xl mx-auto">
                <div className="bg-white/10 backdrop-blur-sm rounded-2xl p-6 border border-white/20">
                  <Store className="h-12 w-12 mx-auto mb-4 text-white" />
                  <h3 className="text-xl font-bold mb-4">I'm a Supplier</h3>
                  <p className="text-white/90 mb-6 text-sm">
                    Multiply your sales channels and reach customers nationwide
                  </p>
                  <Button className="w-full bg-white text-[#FF7A21] hover:bg-gray-100 font-semibold">
                    <Link href="/auth/register">Start as Supplier</Link>
                  </Button>
                </div>
                <div className="bg-white/10 backdrop-blur-sm rounded-2xl p-6 border border-white/20">
                  <Smartphone className="h-12 w-12 mx-auto mb-4 text-white" />
                  <h3 className="text-xl font-bold mb-4">I'm a Plug</h3>
                  <p className="text-white/90 mb-6 text-sm">
                    Start earning money online without inventory or upfront costs
                  </p>
                  <Button className="w-full bg-white text-[#FF7A21] hover:bg-gray-100 font-semibold">
                    <Link href="/auth/register">Start as Plug</Link>
                  </Button>
                </div>
              </div>
            </div>
          </div>
        </section>
      </main>

      {/* Back to top button */}
      <button
        onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
        className="fixed bottom-6 right-6 h-12 w-12 rounded-full bg-[#FF7A21] text-white flex items-center justify-center shadow-lg hover:shadow-xl transition-all duration-300 z-40 hover:scale-110"
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
          className="h-6 w-6"
        >
          <polyline points="18 15 12 9 6 15"></polyline>
        </svg>
      </button>
    </div>
  )
}
