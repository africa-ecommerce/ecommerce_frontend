// "use client";

// import Link from "next/link";
// import Image from "next/image";
// import {
//   ArrowRight,
//   ChevronLeft,
//   ChevronRight,
//   Play,
//   CheckCircle,
// } from "lucide-react";
// import { useState } from "react";

// import { Button } from "@/components/ui/button";
// import { Card } from "@/components/ui/card";

// export default function WelcomePage() {
//   const [activeSlide, setActiveSlide] = useState(0);

//   const nextSlide = () => {
//     setActiveSlide((prev) => (prev === 2 ? 0 : prev + 1));
//   };

//   const prevSlide = () => {
//     setActiveSlide((prev) => (prev === 0 ? 2 : prev - 1));
//   };

//   const goToSlide = (index: number) => {
//     setActiveSlide(index);
//   };

//   return (
//     <div className="flex min-h-screen flex-col bg-white overflow-x-hidden">
//       {/* Mobile-Optimized Header */}
//       <header className="fixed top-0 left-0 right-0 z-50 bg-white/90 backdrop-blur-sm border-b border-gray-100">
//         <div className="container mx-auto px-4 py-3 flex justify-between items-center">
//           <div className="flex items-center gap-2">
//             <div className="h-8 w-8 rounded-md bg-orange-500 flex items-center justify-center">
//               <svg
//                 width="20"
//                 height="20"
//                 viewBox="0 0 24 24"
//                 fill="none"
//                 xmlns="http://www.w3.org/2000/svg"
//                 className="text-white"
//               >
//                 <path
//                   d="M12 2L15.09 8.26L22 9.27L17 14.14L18.18 21.02L12 17.77L5.82 21.02L7 14.14L2 9.27L8.91 8.26L12 2Z"
//                   stroke="currentColor"
//                   strokeWidth="2"
//                   strokeLinecap="round"
//                   strokeLinejoin="round"
//                   fill="currentColor"
//                 />
//               </svg>
//             </div>
//             <span className="font-bold text-xl">Pluggn</span>
//           </div>

//           <div className="flex items-center gap-3">
//             <Button
//               variant="outline"
//               size="sm"
//               className="hidden xs:inline-flex"
//               asChild
//             >
//               <Link href="/dashboard">Sign In</Link>
//             </Button>
//             <Button
//               size="sm"
//               className="bg-orange-500 hover:bg-orange-600 hidden xs:inline-flex"
//               asChild
//             >
//               <Link href="/auth/register">Get Started</Link>
//             </Button>
//           </div>
//         </div>
//       </header>

//       {/* Hero Section with Improved Mobile Responsiveness */}
//       <section className="pt-20 pb-8 md:pt-32 md:pb-16">
//         <div className="container mx-auto px-4">
//           <div className="flex flex-col md:flex-row md:items-center gap-8">
//             <div className="md:w-1/2 order-2 md:order-1">
//               <h1 className="text-3xl sm:text-4xl md:text-5xl font-bold tracking-tight text-gray-900 mb-4 text-center sm:text-left">
//                 Empower Your{" "}
//                 <span className="text-orange-500">Digital Business</span>{" "}
//                 Journey
//               </h1>
//               <p className="text-base text-gray-600 mb-6 text-center sm:text-left">
//                 Connect with customers across Africa. Sell online, in-store, or
//                 through WhatsApp with Pluggn's all-in-one platform.
//               </p>
//               <div className="flex flex-col sm:flex-row gap-4 mb-8 justify-center sm:justify-start">
//                 <Button
//                   className="bg-orange-500 hover:bg-orange-600 w-full sm:w-auto"
//                   asChild
//                 >
//                   <Link href="/onboarding/user-type">
//                     Start Free <ArrowRight className="ml-2 h-5 w-5" />
//                   </Link>
//                 </Button>
//                 <Button
//                   variant="outline"
//                   className="w-full sm:w-auto"
//                   asChild
//                 >
//                   <Link href="#demo" className="flex items-center justify-center">
//                     <Play className="mr-2 h-5 w-5 text-orange-500" /> Watch Demo
//                   </Link>
//                 </Button>
//               </div>
//               <div className="flex flex-col items-center sm:items-start sm:flex-row sm:justify-start gap-4">
//                 <div className="flex -space-x-2">
//                   {[1, 2, 3, 4].map((i) => (
//                     <div
//                       key={i}
//                       className="h-8 w-8 rounded-full border-2 border-white bg-gray-200 flex items-center justify-center overflow-hidden"
//                     >
//                       <Image
//                         src="/placeholder.svg?height=40&width=40"
//                         alt={`User ${i}`}
//                         width={40}
//                         height={40}
//                         className="object-cover"
//                       />
//                     </div>
//                   ))}
//                 </div>
//                 <div className="text-center sm:text-left">
//                   <p className="font-medium text-sm">
//                     Trusted by 10,000+ entrepreneurs
//                   </p>
//                   <div className="flex items-center justify-center sm:justify-start">
//                     {[1, 2, 3, 4, 5].map((i) => (
//                       <svg
//                         key={i}
//                         width="14"
//                         height="14"
//                         viewBox="0 0 24 24"
//                         fill="none"
//                         xmlns="http://www.w3.org/2000/svg"
//                         className="text-orange-500"
//                       >
//                         <path
//                           d="M12 2L15.09 8.26L22 9.27L17 14.14L18.18 21.02L12 17.77L5.82 21.02L7 14.14L2 9.27L8.91 8.26L12 2Z"
//                           fill="currentColor"
//                         />
//                       </svg>
//                     ))}
//                     <span className="ml-1 text-xs text-gray-600">
//                       4.9/5
//                     </span>
//                   </div>
//                 </div>
//               </div>
//             </div>
//             <div className="relative md:w-1/2 order-1 md:order-2 mb-6 md:mb-0 flex justify-center">
//               <div className="absolute -top-10 -left-10 h-40 w-40 bg-orange-100 rounded-full opacity-50 blur-3xl hidden sm:block"></div>
//               <div className="absolute -bottom-10 -right-10 h-40 w-40 bg-orange-100 rounded-full opacity-50 blur-3xl hidden sm:block"></div>
//               <div className="relative bg-white rounded-xl shadow-xl overflow-hidden border border-gray-100 max-w-[500px] w-full">
//                 <Image
//                   src="/placeholder.svg?height=600&width=500"
//                   alt="Pluggn platform preview"
//                   width={500}
//                   height={600}
//                   className="object-cover w-full"
//                 />
//                 <div className="absolute top-4 right-4 bg-white/90 backdrop-blur-sm rounded-full px-3 py-1 text-xs font-medium text-orange-500 border border-orange-100">
//                   New Features
//                 </div>
//               </div>
//             </div>
//           </div>
//         </div>
//       </section>

//       {/* Mobile-Optimized Mockup Image Explainer Section */}
//       <section id="features" className="py-12 md:py-16 bg-gray-50">
//         <div className="container mx-auto px-4">
//           <div className="text-center mb-8 md:mb-12">
//             <h2 className="text-2xl md:text-3xl font-bold mb-3 md:mb-4">
//               Everything You Need to Succeed
//             </h2>
//             <p className="text-gray-600 max-w-2xl mx-auto text-sm md:text-base">
//               Pluggn provides all the tools you need to build, manage, and grow
//               your digital business in one place.
//             </p>
//           </div>

//           {/* Mobile-Optimized Mockup Carousel */}
//           <div className="relative">
//             <div className="mockup-carousel overflow-hidden rounded-xl">
//               <div
//                 className="flex transition-transform duration-500 ease-in-out"
//                 style={{ transform: `translateX(-${activeSlide * 100}%)` }}
//               >
//                 {/* Mockup 1 */}
//                 <div className="w-full flex-shrink-0 px-2 md:px-4">
//                   <div className="flex flex-col md:flex-row md:items-center gap-6 md:gap-8">
//                     <div className="md:w-1/2 order-2 md:order-1">
//                       <h3 className="text-xl md:text-2xl font-bold mb-3 md:mb-4">
//                         Seamless Onboarding
//                       </h3>
//                       <p className="text-gray-600 mb-4 md:mb-6 text-sm md:text-base">
//                         Get started in minutes with our intuitive onboarding
//                         process. We'll guide you through every step of setting
//                         up your digital business.
//                       </p>
//                       <ul className="space-y-2 md:space-y-3 text-sm md:text-base">
//                         {[
//                           "User-friendly interface",
//                           "Step-by-step guidance",
//                           "Customizable options",
//                         ].map((item, i) => (
//                           <li key={i} className="flex items-start gap-2">
//                             <CheckCircle className="h-4 w-4 md:h-5 md:w-5 text-green-500 mt-0.5" />
//                             <span>{item}</span>
//                           </li>
//                         ))}
//                       </ul>
//                     </div>
//                     <div className="md:w-1/2 order-1 md:order-2 mb-4 md:mb-0">
//                       <div className="bg-white rounded-xl shadow-lg overflow-hidden border border-gray-100">
//                         <Image
//                           src="/placeholder.svg?height=400&width=500"
//                           alt="Onboarding mockup"
//                           width={500}
//                           height={400}
//                           className="object-cover w-full"
//                         />
//                       </div>
//                     </div>
//                   </div>
//                 </div>

//                 {/* Mockup 2 */}
//                 <div className="w-full flex-shrink-0 px-2 md:px-4">
//                   <div className="flex flex-col md:flex-row md:items-center gap-6 md:gap-8">
//                     <div className="md:w-1/2 order-2 md:order-1">
//                       <h3 className="text-xl md:text-2xl font-bold mb-3 md:mb-4">
//                         Powerful Store Management
//                       </h3>
//                       <p className="text-gray-600 mb-4 md:mb-6 text-sm md:text-base">
//                         Manage your products, inventory, and orders with our
//                         powerful dashboard. Get insights into your business
//                         performance.
//                       </p>
//                       <ul className="space-y-2 md:space-y-3 text-sm md:text-base">
//                         {[
//                           "Inventory tracking",
//                           "Order management",
//                           "Analytics dashboard",
//                         ].map((item, i) => (
//                           <li key={i} className="flex items-start gap-2">
//                             <CheckCircle className="h-4 w-4 md:h-5 md:w-5 text-green-500 mt-0.5" />
//                             <span>{item}</span>
//                           </li>
//                         ))}
//                       </ul>
//                     </div>
//                     <div className="md:w-1/2 order-1 md:order-2 mb-4 md:mb-0">
//                       <div className="bg-white rounded-xl shadow-lg overflow-hidden border border-gray-100">
//                         <Image
//                           src="/placeholder.svg?height=400&width=500"
//                           alt="Store management mockup"
//                           width={500}
//                           height={400}
//                           className="object-cover w-full"
//                         />
//                       </div>
//                     </div>
//                   </div>
//                 </div>

//                 {/* Mockup 3 */}
//                 <div className="w-full flex-shrink-0 px-2 md:px-4">
//                   <div className="flex flex-col md:flex-row md:items-center gap-6 md:gap-8">
//                     <div className="md:w-1/2 order-2 md:order-1">
//                       <h3 className="text-xl md:text-2xl font-bold mb-3 md:mb-4">
//                         Multi-Channel Selling
//                       </h3>
//                       <p className="text-gray-600 mb-4 md:mb-6 text-sm md:text-base">
//                         Sell your products across multiple channels including
//                         your online store, social media, and WhatsApp.
//                       </p>
//                       <ul className="space-y-2 md:space-y-3 text-sm md:text-base">
//                         {[
//                           "Online store",
//                           "Social media integration",
//                           "WhatsApp business",
//                         ].map((item, i) => (
//                           <li key={i} className="flex items-start gap-2">
//                             <CheckCircle className="h-4 w-4 md:h-5 md:w-5 text-green-500 mt-0.5" />
//                             <span>{item}</span>
//                           </li>
//                         ))}
//                       </ul>
//                     </div>
//                     <div className="md:w-1/2 order-1 md:order-2 mb-4 md:mb-0">
//                       <div className="bg-white rounded-xl shadow-lg overflow-hidden border border-gray-100">
//                         <Image
//                           src="/placeholder.svg?height=400&width=500"
//                           alt="Multi-channel selling mockup"
//                           width={500}
//                           height={400}
//                           className="object-cover w-full"
//                         />
//                       </div>
//                     </div>
//                   </div>
//                 </div>
//               </div>
//             </div>

//             {/* Mobile-Optimized Carousel Controls */}
//             <div className="flex justify-center mt-6 md:mt-8 gap-2">
//               {[0, 1, 2].map((index) => (
//                 <button
//                   key={index}
//                   className={`carousel-dot ${
//                     activeSlide === index ? "active" : ""
//                   }`}
//                   onClick={() => goToSlide(index)}
//                   aria-label={`Go to slide ${index + 1}`}
//                 ></button>
//               ))}
//             </div>

//             <button
//               className="absolute top-1/2 left-0 md:left-4 -translate-y-1/2 h-8 w-8 md:h-10 md:w-10 rounded-full bg-white shadow-md flex items-center justify-center text-gray-600 hover:text-orange-500 focus:outline-none"
//               onClick={prevSlide}
//               aria-label="Previous slide"
//             >
//               <ChevronLeft className="h-5 w-5 md:h-6 md:w-6" />
//             </button>
//             <button
//               className="absolute top-1/2 right-0 md:right-4 -translate-y-1/2 h-8 w-8 md:h-10 md:w-10 rounded-full bg-white shadow-md flex items-center justify-center text-gray-600 hover:text-orange-500 focus:outline-none"
//               onClick={nextSlide}
//               aria-label="Next slide"
//             >
//               <ChevronRight className="h-5 w-5 md:h-6 md:w-6" />
//             </button>
//           </div>
//         </div>
//       </section>

//       {/* Mobile-Optimized Stats Section */}
//       <section className="py-10 md:py-16">
//         <div className="container mx-auto px-4">
//           <div className="grid grid-cols-2 gap-4 md:grid-cols-4 md:gap-6">
//             {[
//               { number: "10K+", label: "Entrepreneurs" },
//               { number: "25+", label: "Countries" },
//               { number: "$2M+", label: "Sales Generated" },
//               { number: "99%", label: "Customer Satisfaction" },
//             ].map((stat, i) => (
//               <Card
//                 key={i}
//                 className="p-4 md:p-6 text-center border-none shadow-md"
//               >
//                 <p className="text-xl md:text-3xl font-bold text-orange-500 mb-1 md:mb-2">
//                   {stat.number}
//                 </p>
//                 <p className="text-gray-600 text-xs md:text-base">
//                   {stat.label}
//                 </p>
//               </Card>
//             ))}
//           </div>
//         </div>
//       </section>

//       {/* Mobile-Optimized CTA Section */}
//       <section className="py-10 md:py-16 bg-orange-50">
//         <div className="container mx-auto px-4 text-center">
//           <h2 className="text-2xl md:text-3xl font-bold mb-3 md:mb-4">
//             Ready to Start Your Digital Business?
//           </h2>
//           <p className="text-gray-600 max-w-2xl mx-auto mb-6 md:mb-8 text-sm md:text-base">
//             Join thousands of entrepreneurs across Africa who are building
//             successful digital businesses with Pluggn.
//           </p>
//           <Button
//             className="bg-orange-500 hover:bg-orange-600 py-5 md:py-6 px-6 md:px-8 text-base md:text-lg w-full sm:w-auto"
//             asChild
//           >
//             <Link href="/dashboard">
//               Get Started Now <ArrowRight className="ml-2 h-5 w-5" />
//             </Link>
//           </Button>
//         </div>
//       </section>

//       {/* Mobile-Optimized Footer */}
//       <footer className="py-10 md:py-12 bg-gray-900 text-white">
//         <div className="container mx-auto px-4">
//           <div className="grid grid-cols-2 gap-8 md:grid-cols-4">
//             <div className="col-span-2 md:col-span-1">
//               <div className="flex items-center gap-2 mb-4">
//                 <div className="h-8 w-8 rounded-md bg-orange-500 flex items-center justify-center">
//                   <svg
//                     width="20"
//                     height="20"
//                     viewBox="0 0 24 24"
//                     fill="none"
//                     xmlns="http://www.w3.org/2000/svg"
//                     className="text-white"
//                   >
//                     <path
//                       d="M12 2L15.09 8.26L22 9.27L17 14.14L18.18 21.02L12 17.77L5.82 21.02L7 14.14L2 9.27L8.91 8.26L12 2Z"
//                       stroke="currentColor"
//                       strokeWidth="2"
//                       strokeLinecap="round"
//                       strokeLinejoin="round"
//                       fill="currentColor"
//                     />
//                   </svg>
//                 </div>
//                 <span className="font-bold text-xl">Pluggn</span>
//               </div>
//               <p className="text-gray-400 mb-4 text-sm md:text-base">
//                 Empowering African digital entrepreneurs to build successful
//                 online businesses.
//               </p>
//             </div>
//             <div>
//               <h3 className="font-bold mb-3 md:mb-4 text-sm md:text-base">
//                 Product
//               </h3>
//               <ul className="space-y-2">
//                 {["Features", "Pricing", "Testimonials", "FAQ"].map(
//                   (item, i) => (
//                     <li key={i}>
//                       <Link
//                         href="#"
//                         className="text-gray-400 hover:text-white transition-colors text-xs md:text-sm"
//                       >
//                         {item}
//                       </Link>
//                     </li>
//                   )
//                 )}
//               </ul>
//             </div>
//             <div>
//               <h3 className="font-bold mb-3 md:mb-4 text-sm md:text-base">
//                 Company
//               </h3>
//               <ul className="space-y-2">
//                 {["About Us", "Careers", "Blog", "Contact"].map((item, i) => (
//                   <li key={i}>
//                     <Link
//                       href="#"
//                       className="text-gray-400 hover:text-white transition-colors text-xs md:text-sm"
//                     >
//                       {item}
//                     </Link>
//                   </li>
//                 ))}
//               </ul>
//             </div>
//             <div>
//               <h3 className="font-bold mb-3 md:mb-4 text-sm md:text-base">
//                 Legal
//               </h3>
//               <ul className="space-y-2">
//                 {["Terms of Service", "Privacy Policy", "Cookie Policy"].map(
//                   (item, i) => (
//                     <li key={i}>
//                       <Link
//                         href="#"
//                         className="text-gray-400 hover:text-white transition-colors text-xs md:text-sm"
//                       >
//                         {item}
//                       </Link>
//                     </li>
//                   )
//                 )}
//               </ul>
//             </div>
//           </div>
//           <div className="border-t border-gray-800 mt-8 pt-6 text-center text-gray-400 text-xs md:text-sm">
//             <p>© {new Date().getFullYear()} Pluggn. All rights reserved.</p>
//           </div>
//         </div>
//       </footer>

//       {/* Custom CSS for carousel dots */}
//       <style jsx global>{`
//         .carousel-dot {
//           width: 8px;
//           height: 8px;
//           border-radius: 50%;
//           background-color: #e5e7eb;
//           border: none;
//           cursor: pointer;
//           transition: all 0.3s ease;
//         }

//         .carousel-dot.active {
//           background-color: #f97316;
//           width: 20px;
//           border-radius: 4px;
//         }

//         @media (min-width: 768px) {
//           .carousel-dot {
//             width: 12px;
//             height: 12px;
//           }

//           .carousel-dot.active {
//             width: 24px;
//             border-radius: 6px;
//           }
//         }
//       `}</style>
//     </div>
//   );
// }

// import Image from "next/image";
// import Link from "next/link";
// import { Button } from "@/components/ui/button";
// import {
//   ShoppingBag,
//   Store,
//   Truck,
//   CreditCard,
//   Smartphone,
//   Globe,
//   Package,
//   Palette,
//   CheckCircle,
//   ArrowRight,
//   Star,
//   Instagram,
//   Facebook,
//   Twitter,
//   MessageCircle,
// } from "lucide-react";

// export default function Home() {
//   return (
//     <div className="flex min-h-screen flex-col">
//       {/* Header */}
//       <header className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
//         <div className="container flex h-16 items-center justify-between px-4 md:px-6">
//           <div className="flex items-center gap-2">
//             <Link href="/" className="flex items-center gap-2">
//               <ShoppingBag className="h-6 w-6 text-[#FF7A21]" />
//               <span className="text-xl font-bold">Pluggn</span>
//             </Link>
//           </div>
//           <nav className="hidden md:flex gap-6">
//             <Link
//               href="#features"
//               className="text-sm font-medium hover:text-[#FF7A21] transition-colors"
//             >
//               Features
//             </Link>
//             <Link
//               href="#how-it-works"
//               className="text-sm font-medium hover:text-[#FF7A21] transition-colors"
//             >
//               How It Works
//             </Link>
//             <Link
//               href="#testimonials"
//               className="text-sm font-medium hover:text-[#FF7A21] transition-colors"
//             >
//               Testimonials
//             </Link>
//             <Link
//               href="#about"
//               className="text-sm font-medium hover:text-[#FF7A21] transition-colors"
//             >
//               About
//             </Link>
//           </nav>
//           <div className="flex items-center gap-4">
//             <Link
//               href="/dashboard"
//               className="hidden md:inline-flex h-9 items-center justify-center rounded-md border border-[#FF7A21] px-4 py-2 text-sm font-medium text-[#FF7A21] transition-colors hover:bg-[#FF7A21] hover:text-white"
//             >
//               Sign In
//             </Link>
//             <Button className="bg-[#FF7A21] hover:bg-[#e86b12] text-white">
//               <Link href="/auth/register">Join Now</Link>
//             </Button>
//             <button className="md:hidden">
//               <svg
//                 xmlns="http://www.w3.org/2000/svg"
//                 width="24"
//                 height="24"
//                 viewBox="0 0 24 24"
//                 fill="none"
//                 stroke="currentColor"
//                 strokeWidth="2"
//                 strokeLinecap="round"
//                 strokeLinejoin="round"
//                 className="h-6 w-6"
//               >
//                 <line x1="4" x2="20" y1="12" y2="12" />
//                 <line x1="4" x2="20" y1="6" y2="6" />
//                 <line x1="4" x2="20" y1="18" y2="18" />
//               </svg>
//             </button>
//           </div>
//         </div>
//       </header>

//       <main className="flex-1">
//         {/* Hero Section */}
//         <section className="w-full py-10 md:py-16 lg:py-24 xl:py-32 bg-gradient-to-b from-white to-orange-50">
//           <div className="container px-4 md:px-6">
//             <div className="grid gap-6 lg:grid-cols-[1fr_500px] lg:gap-12 xl:grid-cols-[1fr_550px]">
//               <div className="flex flex-col justify-center space-y-4">
//                 <div className="space-y-2">
//                   <h1 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl xl:text-6xl/none text-[#0F172A]">
//                     Start Selling Online Without Inventory
//                   </h1>
//                   <p className="max-w-[600px] text-gray-700 text-lg md:text-xl">
//                     Build your digital business across Africa with zero upfront
//                     costs. Sell on WhatsApp, social media, or your own online
//                     store.
//                   </p>
//                 </div>
//                 <div className="flex flex-col sm:flex-row gap-3 mt-2">
//                   <Button className="bg-[#FF7A21] hover:bg-[#e86b12] text-white h-12 px-6 text-base">
//                     <Link
//                     href="/auth/register"
//                     >
//                     Join Now
//                     </Link>
//                   </Button>
//                   <Button
//                     variant="outline"
//                     className="border-[#FF7A21] text-[#FF7A21] hover:bg-[#FF7A21] hover:text-white h-12 px-6 text-base"
//                   >
//                     <ArrowRight className="mr-2 h-4 w-4" /> See How It Works
//                   </Button>
//                 </div>
//                 <div className="flex items-center gap-2 mt-4">
//                   <div className="flex">
//                     {[...Array(5)].map((_, i) => (
//                       <Star
//                         key={i}
//                         className="h-5 w-5 fill-[#FF7A21] text-[#FF7A21]"
//                       />
//                     ))}
//                   </div>
//                   <p className="text-sm text-gray-600">
//                     Trusted by 10,000+ Nigerian entrepreneurs
//                   </p>
//                 </div>
//               </div>
//               <div className="flex items-center justify-center lg:justify-end mt-8 lg:mt-0">
//                 <div className="relative w-full max-w-[280px] sm:max-w-[360px] md:max-w-[420px] h-[280px] sm:h-[360px] md:h-[420px] rounded-3xl overflow-hidden shadow-xl">
//                   <Image
//                     src="/placeholder.svg?height=420&width=420"
//                     alt="Pluggn Mobile Interface"
//                     fill
//                     className="object-cover"
//                     priority
//                   />
//                 </div>
//               </div>
//             </div>
//           </div>
//         </section>

//         {/* Core Value Proposition */}
//         <section className="w-full py-12 md:py-16 bg-white">
//           <div className="container px-4 md:px-6">
//             <div className="flex flex-col items-center justify-center space-y-4 text-center">
//               <div className="space-y-2 max-w-3xl">
//                 <h2 className="text-2xl md:text-3xl lg:text-4xl font-bold tracking-tighter text-[#0F172A]">
//                   One Platform, Endless Possibilities
//                 </h2>
//                 <p className="mx-auto max-w-[700px] text-gray-700 text-base md:text-lg lg:text-xl">
//                   Our platform helps suppliers expand their market reach through
//                   a network of motivated sellers, handling payments, logistics,
//                   and customer service.
//                 </p>
//               </div>
//               <div className="w-full max-w-4xl mt-8">
//                 <div className="relative">
//                   <div className="grid grid-cols-1 md:grid-cols-3 gap-6 md:gap-8 relative z-10">
//                     <div className="bg-orange-50 rounded-xl p-5 md:p-6 text-center flex flex-col items-center">
//                       <Store className="h-10 w-10 md:h-12 md:w-12 text-[#FF7A21] mb-3 md:mb-4" />
//                       <h3 className="text-lg md:text-xl font-bold mb-2">
//                         Suppliers
//                       </h3>
//                       <p className="text-gray-600 text-sm md:text-base">
//                         Expand your market reach without handling logistics
//                       </p>
//                     </div>
//                     <div className="bg-orange-50 rounded-xl p-5 md:p-6 text-center flex flex-col items-center">
//                       <ShoppingBag className="h-10 w-10 md:h-12 md:w-12 text-[#FF7A21] mb-3 md:mb-4" />
//                       <h3 className="text-lg md:text-xl font-bold mb-2">
//                         Pluggn Platform
//                       </h3>
//                       <p className="text-gray-600 text-sm md:text-base">
//                         We handle payments, logistics, and connections
//                       </p>
//                     </div>
//                     <div className="bg-orange-50 rounded-xl p-5 md:p-6 text-center flex flex-col items-center">
//                       <Smartphone className="h-10 w-10 md:h-12 md:w-12 text-[#FF7A21] mb-3 md:mb-4" />
//                       <h3 className="text-lg md:text-xl font-bold mb-2">
//                         Plugs
//                       </h3>
//                       <p className="text-gray-600 text-sm md:text-base">
//                         Build a profitable business with zero inventory
//                       </p>
//                     </div>
//                   </div>
//                   <div className="absolute top-1/2 left-0 w-full h-2 bg-[#FF7A21] transform -translate-y-1/2 hidden md:block"></div>
//                 </div>
//               </div>
//             </div>
//           </div>
//         </section>

//         {/* Key Features for Suppliers */}
//         <section id="features" className="w-full py-12 md:py-16 bg-orange-50">
//           <div className="container px-4 md:px-6">
//             <div className="flex flex-col items-center justify-center space-y-4 text-center mb-8 md:mb-12">
//               <h2 className="text-2xl md:text-3xl lg:text-4xl font-bold tracking-tighter text-[#0F172A]">
//                 For Suppliers
//               </h2>
//               <p className="mx-auto max-w-[700px] text-gray-700 text-base md:text-lg">
//                 Multiply your sales through our network of motivated resellers
//                 across Africa
//               </p>
//             </div>
//             <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 md:gap-6">
//               <div className="bg-white rounded-xl p-5 md:p-6 shadow-sm hover:shadow-md transition-shadow h-full">
//                 <div className="h-10 w-10 md:h-12 md:w-12 bg-orange-100 rounded-full flex items-center justify-center mb-3 md:mb-4">
//                   <Package className="h-5 w-5 md:h-6 md:w-6 text-[#FF7A21]" />
//                 </div>
//                 <h3 className="text-lg md:text-xl font-bold mb-2">
//                   Zero Listing Fees
//                 </h3>
//                 <p className="text-gray-600 text-sm md:text-base">
//                   List your entire catalog with no upfront costs or monthly fees
//                 </p>
//               </div>
//               <div className="bg-white rounded-xl p-5 md:p-6 shadow-sm hover:shadow-md transition-shadow h-full">
//                 <div className="h-10 w-10 md:h-12 md:w-12 bg-orange-100 rounded-full flex items-center justify-center mb-3 md:mb-4">
//                   <Globe className="h-5 w-5 md:h-6 md:w-6 text-[#FF7A21]" />
//                 </div>
//                 <h3 className="text-lg md:text-xl font-bold mb-2">
//                   Nationwide Reach
//                 </h3>
//                 <p className="text-gray-600 text-sm md:text-base">
//                   Expand your market with thousands of motivated resellers
//                   promoting your products
//                 </p>
//               </div>
//               <div className="bg-white rounded-xl p-5 md:p-6 shadow-sm hover:shadow-md transition-shadow h-full">
//                 <div className="h-10 w-10 md:h-12 md:w-12 bg-orange-100 rounded-full flex items-center justify-center mb-3 md:mb-4">
//                   <CreditCard className="h-5 w-5 md:h-6 md:w-6 text-[#FF7A21]" />
//                 </div>
//                 <h3 className="text-lg md:text-xl font-bold mb-2">
//                   Secure Payments
//                 </h3>
//                 <p className="text-gray-600 text-sm md:text-base">
//                   Get paid automatically for every sale with transparent
//                   tracking
//                 </p>
//               </div>
//               <div className="bg-white rounded-xl p-5 md:p-6 shadow-sm hover:shadow-md transition-shadow h-full">
//                 <div className="h-10 w-10 md:h-12 md:w-12 bg-orange-100 rounded-full flex items-center justify-center mb-3 md:mb-4">
//                   <Truck className="h-5 w-5 md:h-6 md:w-6 text-[#FF7A21]" />
//                 </div>
//                 <h3 className="text-lg md:text-xl font-bold mb-2">
//                   Simplified Logistics
//                 </h3>
//                 <p className="text-gray-600 text-sm md:text-base">
//                   We handle delivery so you can focus on product quality and
//                   inventory
//                 </p>
//               </div>
//             </div>
//           </div>
//         </section>

//         {/* Key Features for Plugs */}
//         <section className="w-full py-12 md:py-16 bg-white">
//           <div className="container px-4 md:px-6">
//             <div className="flex flex-col items-center justify-center space-y-4 text-center mb-8 md:mb-12">
//               <h2 className="text-2xl md:text-3xl lg:text-4xl font-bold tracking-tighter text-[#0F172A]">
//                 For Plugs
//               </h2>
//               <p className="mx-auto max-w-[700px] text-gray-700 text-base md:text-lg">
//                 Launch your online business today with zero inventory investment
//               </p>
//             </div>
//             <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 md:gap-6">
//               <div className="bg-orange-50 rounded-xl p-5 md:p-6 shadow-sm hover:shadow-md transition-shadow h-full">
//                 <div className="h-10 w-10 md:h-12 md:w-12 bg-orange-100 rounded-full flex items-center justify-center mb-3 md:mb-4">
//                   <Store className="h-5 w-5 md:h-6 md:w-6 text-[#FF7A21]" />
//                 </div>
//                 <h3 className="text-lg md:text-xl font-bold mb-2">
//                   Professional Storefront
//                 </h3>
//                 <p className="text-gray-600 text-sm md:text-base">
//                   Get a fully-featured e-commerce site with your own branding at
//                   no cost
//                 </p>
//               </div>
//               <div className="bg-orange-50 rounded-xl p-5 md:p-6 shadow-sm hover:shadow-md transition-shadow h-full">
//                 <div className="h-10 w-10 md:h-12 md:w-12 bg-orange-100 rounded-full flex items-center justify-center mb-3 md:mb-4">
//                   <MessageCircle className="h-5 w-5 md:h-6 md:w-6 text-[#FF7A21]" />
//                 </div>
//                 <h3 className="text-lg md:text-xl font-bold mb-2">
//                   WhatsApp Integration
//                 </h3>
//                 <p className="text-gray-600 text-sm md:text-base">
//                   Sell directly through WhatsApp status and chats with automated
//                   checkout
//                 </p>
//               </div>
//               <div className="bg-orange-50 rounded-xl p-5 md:p-6 shadow-sm hover:shadow-md transition-shadow h-full">
//                 <div className="h-10 w-10 md:h-12 md:w-12 bg-orange-100 rounded-full flex items-center justify-center mb-3 md:mb-4">
//                   <Package className="h-5 w-5 md:h-6 md:w-6 text-[#FF7A21]" />
//                 </div>
//                 <h3 className="text-lg md:text-xl font-bold mb-2">
//                   Zero Inventory Risk
//                 </h3>
//                 <p className="text-gray-600 text-sm md:text-base">
//                   Start selling immediately without purchasing stock or managing
//                   storage
//                 </p>
//               </div>
//               <div className="bg-orange-50 rounded-xl p-5 md:p-6 shadow-sm hover:shadow-md transition-shadow h-full">
//                 <div className="h-10 w-10 md:h-12 md:w-12 bg-orange-100 rounded-full flex items-center justify-center mb-3 md:mb-4">
//                   <Palette className="h-5 w-5 md:h-6 md:w-6 text-[#FF7A21]" />
//                 </div>
//                 <h3 className="text-lg md:text-xl font-bold mb-2">
//                   Set Your Own Prices
//                 </h3>
//                 <p className="text-gray-600 text-sm md:text-base">
//                   Control your profit margins and build your unique brand
//                   identity
//                 </p>
//               </div>
//               <div className="bg-orange-50 rounded-xl p-5 md:p-6 shadow-sm hover:shadow-md transition-shadow h-full">
//                 <div className="h-10 w-10 md:h-12 md:w-12 bg-orange-100 rounded-full flex items-center justify-center mb-3 md:mb-4">
//                   <Truck className="h-5 w-5 md:h-6 md:w-6 text-[#FF7A21]" />
//                 </div>
//                 <h3 className="text-lg md:text-xl font-bold mb-2">
//                   Hands-Off Delivery
//                 </h3>
//                 <p className="text-gray-600 text-sm md:text-base">
//                   Products ship directly from suppliers to your customers
//                   nationwide
//                 </p>
//               </div>
//               <div className="bg-orange-50 rounded-xl p-5 md:p-6 shadow-sm hover:shadow-md transition-shadow h-full">
//                 <div className="h-10 w-10 md:h-12 md:w-12 bg-orange-100 rounded-full flex items-center justify-center mb-3 md:mb-4">
//                   <CreditCard className="h-5 w-5 md:h-6 md:w-6 text-[#FF7A21]" />
//                 </div>
//                 <h3 className="text-lg md:text-xl font-bold mb-2">
//                   Instant Earnings
//                 </h3>
//                 <p className="text-gray-600 text-sm md:text-base">
//                   Your profit margin is automatically credited to your account
//                   after each sale
//                 </p>
//               </div>
//             </div>
//           </div>
//         </section>

//         {/* How It Works */}
//         <section
//           id="how-it-works"
//           className="w-full py-12 md:py-16 bg-orange-50"
//         >
//           <div className="container px-4 md:px-6">
//             <div className="flex flex-col items-center justify-center space-y-4 text-center mb-8 md:mb-12">
//               <h2 className="text-2xl md:text-3xl lg:text-4xl font-bold tracking-tighter text-[#0F172A]">
//                 How It Works
//               </h2>
//               <p className="mx-auto max-w-[700px] text-gray-700 text-base md:text-lg">
//                 A simple process to start your digital business journey
//               </p>
//             </div>
//             <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8">
//               <div className="relative">
//                 <div className="absolute top-0 left-4 sm:left-6 w-10 h-10 sm:w-12 sm:h-12 rounded-full bg-[#FF7A21] text-white flex items-center justify-center text-lg sm:text-xl font-bold">
//                   1
//                 </div>
//                 <div className="bg-white rounded-xl p-5 pt-14 sm:p-6 sm:pt-16 shadow-sm h-full">
//                   <h3 className="text-lg md:text-xl font-bold mb-2">Sign Up</h3>
//                   <p className="text-gray-600 text-sm md:text-base">
//                     Create your account as a Supplier or Plug in just a few
//                     minutes
//                   </p>
//                 </div>
//               </div>
//               <div className="relative">
//                 <div className="absolute top-0 left-4 sm:left-6 w-10 h-10 sm:w-12 sm:h-12 rounded-full bg-[#FF7A21] text-white flex items-center justify-center text-lg sm:text-xl font-bold">
//                   2
//                 </div>
//                 <div className="bg-white rounded-xl p-5 pt-14 sm:p-6 sm:pt-16 shadow-sm h-full">
//                   <h3 className="text-lg md:text-xl font-bold mb-2">
//                     List or Browse Products
//                   </h3>
//                   <p className="text-gray-600 text-sm md:text-base">
//                     Suppliers list products while Plugs browse products to sell
//                   </p>
//                 </div>
//               </div>
//               <div className="relative">
//                 <div className="absolute top-0 left-4 sm:left-6 w-10 h-10 sm:w-12 sm:h-12 rounded-full bg-[#FF7A21] text-white flex items-center justify-center text-lg sm:text-xl font-bold">
//                   3
//                 </div>
//                 <div className="bg-white rounded-xl p-5 pt-14 sm:p-6 sm:pt-16 shadow-sm h-full">
//                   <h3 className="text-lg md:text-xl font-bold mb-2">
//                     Set Your Prices
//                   </h3>
//                   <p className="text-gray-600 text-sm md:text-base">
//                     Plugs select products and set their own prices with custom
//                     margins
//                   </p>
//                 </div>
//               </div>
//               <div className="relative">
//                 <div className="absolute top-0 left-4 sm:left-6 w-10 h-10 sm:w-12 sm:h-12 rounded-full bg-[#FF7A21] text-white flex items-center justify-center text-lg sm:text-xl font-bold">
//                   4
//                 </div>
//                 <div className="bg-white rounded-xl p-5 pt-14 sm:p-6 sm:pt-16 shadow-sm h-full">
//                   <h3 className="text-lg md:text-xl font-bold mb-2">
//                     Share & Promote
//                   </h3>
//                   <p className="text-gray-600 text-sm md:text-base">
//                     Share products via social media or your custom storefront
//                   </p>
//                 </div>
//               </div>
//               <div className="relative">
//                 <div className="absolute top-0 left-4 sm:left-6 w-10 h-10 sm:w-12 sm:h-12 rounded-full bg-[#FF7A21] text-white flex items-center justify-center text-lg sm:text-xl font-bold">
//                   5
//                 </div>
//                 <div className="bg-white rounded-xl p-5 pt-14 sm:p-6 sm:pt-16 shadow-sm h-full">
//                   <h3 className="text-lg md:text-xl font-bold mb-2">
//                     Customers Purchase
//                   </h3>
//                   <p className="text-gray-600 text-sm md:text-base">
//                     Customers make purchases through your channels
//                   </p>
//                 </div>
//               </div>
//               <div className="relative">
//                 <div className="absolute top-0 left-4 sm:left-6 w-10 h-10 sm:w-12 sm:h-12 rounded-full bg-[#FF7A21] text-white flex items-center justify-center text-lg sm:text-xl font-bold">
//                   6
//                 </div>
//                 <div className="bg-white rounded-xl p-5 pt-14 sm:p-6 sm:pt-16 shadow-sm h-full">
//                   <h3 className="text-lg md:text-xl font-bold mb-2">
//                     We Handle The Rest
//                   </h3>
//                   <p className="text-gray-600 text-sm md:text-base">
//                     Pluggn handles delivery and payment distribution
//                     automatically
//                   </p>
//                 </div>
//               </div>
//             </div>
//           </div>
//         </section>

//         {/* Store Builder/Customization */}
//         <section className="w-full py-12 md:py-16 bg-white">
//           <div className="container px-4 md:px-6">
//             <div className="grid gap-8 lg:grid-cols-2 lg:gap-12 items-center">
//               <div className="flex flex-col justify-center space-y-4">
//                 <div className="space-y-2">
//                   <h2 className="text-2xl md:text-3xl lg:text-4xl font-bold tracking-tighter text-[#0F172A]">
//                     Customize Your Store
//                   </h2>
//                   <p className="max-w-[600px] text-gray-700 text-base md:text-lg">
//                     Our intuitive store builder lets you create a professional
//                     online store in minutes, no technical skills required.
//                   </p>
//                 </div>
//                 <ul className="space-y-2 md:space-y-3">
//                   <li className="flex items-start gap-2">
//                     <CheckCircle className="h-5 w-5 md:h-6 md:w-6 text-[#FF7A21] mt-0.5 flex-shrink-0" />
//                     <span className="text-sm md:text-base">
//                       Choose from beautiful, mobile-responsive templates
//                     </span>
//                   </li>
//                   <li className="flex items-start gap-2">
//                     <CheckCircle className="h-5 w-5 md:h-6 md:w-6 text-[#FF7A21] mt-0.5 flex-shrink-0" />
//                     <span className="text-sm md:text-base">
//                       Customize colors, fonts, and layouts to match your brand
//                     </span>
//                   </li>
//                   <li className="flex items-start gap-2">
//                     <CheckCircle className="h-5 w-5 md:h-6 md:w-6 text-[#FF7A21] mt-0.5 flex-shrink-0" />
//                     <span className="text-sm md:text-base">
//                       Preview your store on mobile, tablet, and desktop
//                     </span>
//                   </li>
//                   <li className="flex items-start gap-2">
//                     <CheckCircle className="h-5 w-5 md:h-6 md:w-6 text-[#FF7A21] mt-0.5 flex-shrink-0" />
//                     <span className="text-sm md:text-base">
//                       Add your logo and brand elements with ease
//                     </span>
//                   </li>
//                   <li className="flex items-start gap-2">
//                     <CheckCircle className="h-5 w-5 md:h-6 md:w-6 text-[#FF7A21] mt-0.5 flex-shrink-0" />
//                     <span className="text-sm md:text-base">
//                       Launch your store with one click
//                     </span>
//                   </li>
//                 </ul>
//                 <div className="pt-4">
//                   <Button className="bg-[#FF7A21] hover:bg-[#e86b12] text-white">
//                     Create Your Store
//                   </Button>
//                 </div>
//               </div>
//               <div className="flex items-center justify-center mt-6 lg:mt-0">
//                 <div className="relative w-full max-w-[500px] aspect-[4/3] rounded-xl overflow-hidden shadow-xl">
//                   <Image
//                     src="/store-builder-interface.png"
//                     alt="Pluggn Store Builder Interface"
//                     fill
//                     height={375}
//                     width={500}
//                     className="object-cover"
//                   />
//                 </div>
//               </div>
//             </div>
//           </div>
//         </section>

//         {/* Testimonials */}
//         <section
//           id="testimonials"
//           className="w-full py-12 md:py-16 bg-orange-50"
//         >
//           <div className="container px-4 md:px-6">
//             <div className="flex flex-col items-center justify-center space-y-4 text-center mb-8 md:mb-12">
//               <h2 className="text-2xl md:text-3xl lg:text-4xl font-bold tracking-tighter text-[#0F172A]">
//                 Success Stories
//               </h2>
//               <p className="mx-auto max-w-[700px] text-gray-700 text-base md:text-lg">
//                 Hear from entrepreneurs who have transformed their businesses
//                 with Pluggn
//               </p>
//             </div>
//             <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8">
//               <div className="bg-white rounded-xl p-5 md:p-6 shadow-sm h-full">
//                 <div className="flex items-center mb-4">
//                   <div className="h-10 w-10 md:h-12 md:w-12 rounded-full bg-orange-100 flex items-center justify-center mr-3 md:mr-4 flex-shrink-0">
//                     <span className="text-[#FF7A21] font-bold text-sm md:text-base">
//                       AO
//                     </span>
//                   </div>
//                   <div>
//                     <h3 className="font-bold text-base md:text-lg">
//                       Adebayo Ogunlesi
//                     </h3>
//                     <p className="text-xs md:text-sm text-gray-600">
//                       Fashion Supplier, Lagos
//                     </p>
//                   </div>
//                 </div>
//                 <p className="text-gray-700 mb-4 text-sm md:text-base">
//                   "Since joining Pluggn, my inventory turnover has increased by
//                   300%. I now have different people across Nigeria promoting and
//                   selling my products."
//                 </p>
//                 <div className="flex">
//                   {[...Array(5)].map((_, i) => (
//                     <Star
//                       key={i}
//                       className="h-4 w-4 md:h-5 md:w-5 fill-[#FF7A21] text-[#FF7A21]"
//                     />
//                   ))}
//                 </div>
//               </div>
//               <div className="bg-white rounded-xl p-5 md:p-6 shadow-sm h-full">
//                 <div className="flex items-center mb-4">
//                   <div className="h-10 w-10 md:h-12 md:w-12 rounded-full bg-orange-100 flex items-center justify-center mr-3 md:mr-4 flex-shrink-0">
//                     <span className="text-[#FF7A21] font-bold text-sm md:text-base">
//                       CI
//                     </span>
//                   </div>
//                   <div>
//                     <h3 className="font-bold text-base md:text-lg">
//                       Chioma Igwe
//                     </h3>
//                     <p className="text-xs md:text-sm text-gray-600">
//                       Plug, Abuja
//                     </p>
//                   </div>
//                 </div>
//                 <p className="text-gray-700 mb-4 text-sm md:text-base">
//                   "I started my online business with zero capital. Now I make
//                   over ₦500,000 monthly just by sharing products on my WhatsApp
//                   status and my Pluggn store."
//                 </p>
//                 <div className="flex">
//                   {[...Array(5)].map((_, i) => (
//                     <Star
//                       key={i}
//                       className="h-4 w-4 md:h-5 md:w-5 fill-[#FF7A21] text-[#FF7A21]"
//                     />
//                   ))}
//                 </div>
//               </div>
//               <div className="bg-white rounded-xl p-5 md:p-6 shadow-sm h-full">
//                 <div className="flex items-center mb-4">
//                   <div className="h-10 w-10 md:h-12 md:w-12 rounded-full bg-orange-100 flex items-center justify-center mr-3 md:mr-4 flex-shrink-0">
//                     <span className="text-[#FF7A21] font-bold text-sm md:text-base">
//                       TO
//                     </span>
//                   </div>
//                   <div>
//                     <h3 className="font-bold text-base md:text-lg">
//                       Tunde Owolabi
//                     </h3>
//                     <p className="text-xs md:text-sm text-gray-600">
//                       Electronics Supplier, Ibadan
//                     </p>
//                   </div>
//                 </div>
//                 <p className="text-gray-700 mb-4 text-sm md:text-base">
//                   "Pluggn has revolutionized my business. The automated
//                   logistics and payment system saves me time and has helped me
//                   scale across Nigeria."
//                 </p>
//                 <div className="flex">
//                   {[...Array(5)].map((_, i) => (
//                     <Star
//                       key={i}
//                       className="h-4 w-4 md:h-5 md:w-5 fill-[#FF7A21] text-[#FF7A21]"
//                     />
//                   ))}
//                 </div>
//               </div>
//             </div>
//           </div>
//         </section>

//         {/* CTA */}
//         <section className="w-full py-12 md:py-16 bg-gradient-to-b from-orange-50 to-white">
//           <div className="container px-4 md:px-6">
//             <div className="flex flex-col items-center justify-center space-y-4 text-center">
//               <div className="space-y-2 max-w-3xl">
//                 <h2 className="text-2xl md:text-3xl lg:text-4xl xl:text-5xl font-bold tracking-tighter text-[#0F172A]">
//                   Ready to Start Your Digital Business?
//                 </h2>
//                 <p className="mx-auto max-w-[700px] text-gray-700 text-base md:text-lg lg:text-xl">
//                   Join thousands of successful entrepreneurs across Africa who
//                   are growing their businesses with Pluggn.
//                 </p>
//               </div>
//               <div className="pt-4 md:pt-6">
//                 <Button className="bg-[#FF7A21] hover:bg-[#e86b12] text-white h-12 px-8 text-base md:text-lg">
//                   Join Now
//                 </Button>
//               </div>
//             </div>
//           </div>
//         </section>

//         {/* About */}
//         <section id="about" className="w-full py-12 md:py-16 bg-white">
//           <div className="container px-4 md:px-6">
//             <div className="grid gap-8 lg:grid-cols-2 lg:gap-12 items-center">
//               <div className="flex flex-col justify-center space-y-4">
//                 <div className="space-y-2">
//                   <h2 className="text-2xl md:text-3xl lg:text-4xl font-bold tracking-tighter text-[#0F172A]">
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
//                     barriers of inventory investment and logistics management.
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
//                       className="object-cover"
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
//                       className="object-cover"
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
//                       className="object-cover"
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
//                       className="object-cover"
//                     />
//                   </div>
//                 </div>
//               </div>
//             </div>
//           </div>
//         </section>

//         {/* FAQ */}
//         <section className="w-full py-12 md:py-16 bg-orange-50">
//           <div className="container px-4 md:px-6">
//             <div className="flex flex-col items-center justify-center space-y-4 text-center mb-8 md:mb-12">
//               <h2 className="text-2xl md:text-3xl lg:text-4xl font-bold tracking-tighter text-[#0F172A]">
//                 Frequently Asked Questions
//               </h2>
//               <p className="mx-auto max-w-[700px] text-gray-700 text-base md:text-lg">
//                 Get answers to common questions about Pluggn
//               </p>
//             </div>
//             <div className="grid gap-4 md:gap-6 max-w-3xl mx-auto">
//               <div className="bg-white rounded-xl p-5 md:p-6 shadow-sm">
//                 <h3 className="text-lg md:text-xl font-bold mb-2">
//                   How do I get started as a Plug?
//                 </h3>
//                 <p className="text-gray-700 text-sm md:text-base">
//                   Simply sign up for a free account, browse products from our
//                   suppliers, select items you want to sell, set your prices, and
//                   start sharing with your audience through WhatsApp, social
//                   media, or your free Pluggn store.
//                 </p>
//               </div>
//               <div className="bg-white rounded-xl p-5 md:p-6 shadow-sm">
//                 <h3 className="text-lg md:text-xl font-bold mb-2">
//                   How do payments work?
//                 </h3>
//                 <p className="text-gray-700 text-sm md:text-base">
//                   When a customer makes a purchase, Pluggn handles the payment
//                   processing. The supplier receives their portion, you receive
//                   your margin, and Pluggn takes a small service fee. Payments
//                   are automatically distributed to your account.
//                 </p>
//               </div>
//               <div className="bg-white rounded-xl p-5 md:p-6 shadow-sm">
//                 <h3 className="text-lg md:text-xl font-bold mb-2">
//                   How is delivery handled?
//                 </h3>
//                 <p className="text-gray-700 text-sm md:text-base">
//                   Pluggn manages the entire delivery process. When an order is
//                   placed, we coordinate with the supplier to ship the product
//                   directly to your customer. You don't need to handle any
//                   logistics or shipping.
//                 </p>
//               </div>
//               <div className="bg-white rounded-xl p-5 md:p-6 shadow-sm">
//                 <h3 className="text-lg md:text-xl font-bold mb-2">
//                   Is there any cost to join?
//                 </h3>
//                 <p className="text-gray-700 text-sm md:text-base">
//                   No, it's completely free to join as either a Supplier or a
//                   Plug. Pluggn only makes money when you make a sale, taking a
//                   small percentage of each transaction.
//                 </p>
//               </div>
//               <div className="bg-white rounded-xl p-5 md:p-6 shadow-sm">
//                 <h3 className="text-lg md:text-xl font-bold mb-2">
//                   Can I sell on WhatsApp?
//                 </h3>
//                 <p className="text-gray-700 text-sm md:text-base">
//                   Yes! Pluggn is designed to work seamlessly with WhatsApp. You
//                   can share product links directly to your contacts or status,
//                   and when customers click, they'll be taken to your branded
//                   checkout page.
//                 </p>
//               </div>
//             </div>
//           </div>
//         </section>
//       </main>

//       {/* Footer */}
//       <footer className="w-full py-10 md:py-12 lg:py-16 bg-[#0F172A] text-white">
//         <div className="container px-4 md:px-6">
//           <div className="grid grid-cols-2 md:grid-cols-4 gap-6 md:gap-8 lg:gap-12">
//             <div className="col-span-2 md:col-span-1">
//               <div className="flex items-center gap-2 mb-4">
//                 <ShoppingBag className="h-5 w-5 md:h-6 md:w-6 text-[#FF7A21]" />
//                 <span className="text-lg md:text-xl font-bold">Pluggn</span>
//               </div>
//               <p className="text-gray-400 mb-4 max-w-xs text-sm md:text-base">
//                 Empowering entrepreneurs across Africa to build successful
//                 digital businesses without inventory.
//               </p>
//               <div className="flex gap-4">
//                 <Link href="#" className="text-gray-400 hover:text-[#FF7A21]">
//                   <Instagram className="h-5 w-5" />
//                   <span className="sr-only">Instagram</span>
//                 </Link>
//                 <Link href="#" className="text-gray-400 hover:text-[#FF7A21]">
//                   <Facebook className="h-5 w-5" />
//                   <span className="sr-only">Facebook</span>
//                 </Link>
//                 <Link href="#" className="text-gray-400 hover:text-[#FF7A21]">
//                   <Twitter className="h-5 w-5" />
//                   <span className="sr-only">Twitter</span>
//                 </Link>
//                 <Link href="#" className="text-gray-400 hover:text-[#FF7A21]">
//                   <MessageCircle className="h-5 w-5" />
//                   <span className="sr-only">WhatsApp</span>
//                 </Link>
//               </div>
//             </div>
//             <div>
//               <h3 className="text-base md:text-lg font-bold mb-3 md:mb-4">
//                 Product
//               </h3>
//               <ul className="space-y-2">
//                 <li>
//                   <Link
//                     href="#"
//                     className="text-gray-400 hover:text-[#FF7A21] text-sm md:text-base"
//                   >
//                     For Suppliers
//                   </Link>
//                 </li>
//                 <li>
//                   <Link
//                     href="#"
//                     className="text-gray-400 hover:text-[#FF7A21] text-sm md:text-base"
//                   >
//                     For Plugs
//                   </Link>
//                 </li>
//                 <li>
//                   <Link
//                     href="#"
//                     className="text-gray-400 hover:text-[#FF7A21] text-sm md:text-base"
//                   >
//                     Store Builder
//                   </Link>
//                 </li>
//                 <li>
//                   <Link
//                     href="#"
//                     className="text-gray-400 hover:text-[#FF7A21] text-sm md:text-base"
//                   >
//                     Contact
//                   </Link>
//                 </li>
//               </ul>
//             </div>
//             <div>
//               <h3 className="text-base md:text-lg font-bold mb-3 md:mb-4">
//                 Company
//               </h3>
//               <ul className="space-y-2">
//                 <li>
//                   <Link
//                     href="#"
//                     className="text-gray-400 hover:text-[#FF7A21] text-sm md:text-base"
//                   >
//                     About Us
//                   </Link>
//                 </li>
//                 <li>
//                   <Link
//                     href="#"
//                     className="text-gray-400 hover:text-[#FF7A21] text-sm md:text-base"
//                   >
//                     Careers
//                   </Link>
//                 </li>
//                 <li>
//                   <Link
//                     href="#"
//                     className="text-gray-400 hover:text-[#FF7A21] text-sm md:text-base"
//                   >
//                     Blog
//                   </Link>
//                 </li>
//               </ul>
//             </div>
//             <div>
//               <h3 className="text-base md:text-lg font-bold mb-3 md:mb-4">
//                 Legal
//               </h3>
//               <ul className="space-y-2">
//                 <li>
//                   <Link
//                     href="#"
//                     className="text-gray-400 hover:text-[#FF7A21] text-sm md:text-base"
//                   >
//                     Terms of Service
//                   </Link>
//                 </li>
//                 <li>
//                   <Link
//                     href="#"
//                     className="text-gray-400 hover:text-[#FF7A21] text-sm md:text-base"
//                   >
//                     Privacy Policy
//                   </Link>
//                 </li>
//                 <li>
//                   <Link
//                     href="#"
//                     className="text-gray-400 hover:text-[#FF7A21] text-sm md:text-base"
//                   >
//                     Cookie Policy
//                   </Link>
//                 </li>
//               </ul>
//             </div>
//           </div>
//           <div className="border-t border-gray-800 mt-8 md:mt-12 pt-6 md:pt-8 flex flex-col md:flex-row justify-between items-center">
//             <p className="text-gray-400 text-xs md:text-sm">
//               © {new Date().getFullYear()} Pluggn. All rights reserved.
//             </p>
//           </div>
//         </div>
//       </footer>
//     </div>
//   );
// }



"use client";

import { useState, useEffect } from "react";
import Image from "next/image";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import {
  ShoppingBag,
  Store,
  Truck,
  CreditCard,
  Smartphone,
  Globe,
  Package,
  Palette,
  CheckCircle,
  ArrowRight,
  Star,
  Instagram,
  Facebook,
  Twitter,
  MessageCircle,
  X,
  Menu,
} from "lucide-react";

export default function Home() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  // Handle scroll event to add shadow to header when scrolled
  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 10);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Scroll to section function
  const scrollToSection = (sectionId: string) => {
    const section = document.getElementById(sectionId);
    if (section) {
      section.scrollIntoView({ behavior: "smooth" });
      setMobileMenuOpen(false);
    }
  };

  // Close mobile menu when window is resized to desktop size
  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth >= 768 && mobileMenuOpen) {
        setMobileMenuOpen(false);
      }
    };
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, [mobileMenuOpen]);

  // Prevent body scroll when mobile menu is open
  useEffect(() => {
    if (mobileMenuOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "auto";
    }
    return () => {
      document.body.style.overflow = "auto";
    };
  }, [mobileMenuOpen]);

  return (
    <div className="flex min-h-screen flex-col">
      {/* Header */}
      <header
        className={`sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60 transition-shadow duration-200 ${
          scrolled ? "shadow-md" : ""
        }`}
      >
        <div className="container flex h-16 items-center justify-between px-4 md:px-6">
          <div className="flex items-center gap-2">
            <Link href="/" className="flex items-center gap-2">
              <ShoppingBag className="h-6 w-6 text-[#FF7A21]" />
              <span className="text-xl font-bold">Pluggn</span>
            </Link>
          </div>
          <nav className="hidden md:flex gap-6">
            <button
              onClick={() => scrollToSection("features")}
              className="text-sm font-medium hover:text-[#FF7A21] transition-colors"
            >
              Features
            </button>
            <button
              onClick={() => scrollToSection("how-it-works")}
              className="text-sm font-medium hover:text-[#FF7A21] transition-colors"
            >
              How It Works
            </button>
            <button
              onClick={() => scrollToSection("testimonials")}
              className="text-sm font-medium hover:text-[#FF7A21] transition-colors"
            >
              Testimonials
            </button>
            <button
              onClick={() => scrollToSection("about")}
              className="text-sm font-medium hover:text-[#FF7A21] transition-colors"
            >
              About
            </button>
          </nav>
          <div className="flex items-center gap-4">
            <Link
              href="/dashboard"
              className="hidden md:inline-flex h-9 items-center justify-center rounded-md border border-[#FF7A21] px-4 py-2 text-sm font-medium text-[#FF7A21] transition-colors hover:bg-[#FF7A21] hover:text-white"
            >
              Sign In
            </Link>
            <Button className="bg-[#FF7A21] hover:bg-[#e86b12] text-white">
              <Link href="/auth/register">Join Now</Link>
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

      {/* Mobile Menu Sidebar */}
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
          <div className="flex items-center gap-2">
            <ShoppingBag className="h-6 w-6 text-[#FF7A21]" />
            <span className="text-xl font-bold">Pluggn</span>
          </div>
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
            onClick={() => scrollToSection("features")}
            className="text-base font-medium py-2 hover:text-[#FF7A21] transition-colors text-left"
          >
            Features
          </button>
          <button
            onClick={() => scrollToSection("how-it-works")}
            className="text-base font-medium py-2 hover:text-[#FF7A21] transition-colors text-left"
          >
            How It Works
          </button>
          <button
            onClick={() => scrollToSection("testimonials")}
            className="text-base font-medium py-2 hover:text-[#FF7A21] transition-colors text-left"
          >
            Testimonials
          </button>
          <button
            onClick={() => scrollToSection("about")}
            className="text-base font-medium py-2 hover:text-[#FF7A21] transition-colors text-left"
          >
            About
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
              className="block w-full py-2 px-4 text-center rounded-md bg-[#FF7A21] text-white font-medium"
            >
              Join Now
            </Link>
          </div>
        </nav>
      </div>

      <main className="flex-1">
        {/* Hero Section */}
        <section className="w-full py-10 md:py-16 lg:py-24 xl:py-32 bg-gradient-to-b from-white to-orange-50">
          <div className="container px-4 md:px-6">
            <div className="grid gap-8 lg:grid-cols-[1fr_500px] lg:gap-12 xl:grid-cols-[1fr_550px]">
              <div className="flex flex-col justify-center space-y-4 order-2 lg:order-1">
                <div className="space-y-3">
                  <h1 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl xl:text-6xl/none text-[#0F172A]">
                    Start Selling Online Without Inventory
                  </h1>
                  <p className="max-w-[600px] text-gray-700 text-lg md:text-xl">
                    Build your digital business across Africa with zero upfront
                    costs. Sell on WhatsApp, social media, or your own online
                    store.
                  </p>
                </div>
                <div className="flex flex-col sm:flex-row gap-3 mt-3">
                  <Button className="bg-[#FF7A21] hover:bg-[#e86b12] text-white h-12 px-6 text-base w-full sm:w-auto">
                    <Link href="/auth/register">Join Now</Link>
                  </Button>
                  <Button
                    variant="outline"
                    className="border-[#FF7A21] text-[#FF7A21] hover:bg-[#FF7A21] hover:text-white h-12 px-6 text-base w-full sm:w-auto"
                    onClick={() => scrollToSection("how-it-works")}
                  >
                    <ArrowRight className="mr-2 h-4 w-4" /> Learn More
                  </Button>
                </div>
                <div className="flex items-center gap-2 mt-2">
                  <div className="flex">
                    {[...Array(5)].map((_, i) => (
                      <Star
                        key={i}
                        className="h-5 w-5 fill-[#FF7A21] text-[#FF7A21]"
                      />
                    ))}
                  </div>
                  <p className="text-sm text-gray-600">
                    Trusted by 10,000+ Nigerian entrepreneurs
                  </p>
                </div>
              </div>
              <div className="flex items-center justify-center lg:justify-end order-1 lg:order-2">
                <div className="relative w-full max-w-[280px] sm:max-w-[360px] md:max-w-[420px] h-[280px] sm:h-[360px] md:h-[420px] rounded-3xl overflow-hidden shadow-xl">
                  <Image
                    src="/placeholder.svg?height=420&width=420"
                    alt="Pluggn Mobile Interface"
                    fill
                    className="object-cover"
                    priority
                  />
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Core Value Proposition */}
        <section className="w-full py-12 md:py-16 bg-white">
          <div className="container px-4 md:px-6">
            <div className="flex flex-col items-center justify-center space-y-4 text-center">
              <div className="space-y-2 max-w-3xl">
                <h2 className="text-2xl md:text-3xl lg:text-4xl font-bold tracking-tighter text-[#0F172A]">
                  One Platform, Endless Possibilities
                </h2>
                <p className="mx-auto max-w-[700px] text-gray-700 text-base md:text-lg lg:text-xl">
                  Our platform helps suppliers expand their market reach through
                  a network of motivated sellers, handling payments, logistics,
                  and customer service.
                </p>
              </div>
              <div className="w-full max-w-4xl mt-8">
                <div className="relative">
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-6 md:gap-8 relative z-10">
                    <div className="bg-orange-50 rounded-xl p-5 md:p-6 text-center flex flex-col items-center">
                      <Store className="h-10 w-10 md:h-12 md:w-12 text-[#FF7A21] mb-3 md:mb-4" />
                      <h3 className="text-lg md:text-xl font-bold mb-2">
                        Suppliers
                      </h3>
                      <p className="text-gray-600 text-sm md:text-base">
                        Expand your market reach without handling logistics
                      </p>
                    </div>
                    <div className="bg-orange-50 rounded-xl p-5 md:p-6 text-center flex flex-col items-center">
                      <ShoppingBag className="h-10 w-10 md:h-12 md:w-12 text-[#FF7A21] mb-3 md:mb-4" />
                      <h3 className="text-lg md:text-xl font-bold mb-2">
                        Pluggn Platform
                      </h3>
                      <p className="text-gray-600 text-sm md:text-base">
                        We handle payments, logistics, and connections
                      </p>
                    </div>
                    <div className="bg-orange-50 rounded-xl p-5 md:p-6 text-center flex flex-col items-center">
                      <Smartphone className="h-10 w-10 md:h-12 md:w-12 text-[#FF7A21] mb-3 md:mb-4" />
                      <h3 className="text-lg md:text-xl font-bold mb-2">
                        Plugs
                      </h3>
                      <p className="text-gray-600 text-sm md:text-base">
                        Build a profitable business with zero inventory
                      </p>
                    </div>
                  </div>
                  <div className="absolute top-1/2 left-0 w-full h-2 bg-[#FF7A21] transform -translate-y-1/2 hidden md:block"></div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Key Features for Suppliers */}
        <section
          id="features"
          className="w-full py-12 md:py-16 bg-orange-50 scroll-mt-16"
        >
          <div className="container px-4 md:px-6">
            <div className="flex flex-col items-center justify-center space-y-4 text-center mb-8 md:mb-12">
              <h2 className="text-2xl md:text-3xl lg:text-4xl font-bold tracking-tighter text-[#0F172A]">
                For Suppliers
              </h2>
              <p className="mx-auto max-w-[700px] text-gray-700 text-base md:text-lg">
                Multiply your sales through our network of motivated resellers
                across Africa
              </p>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 md:gap-6">
              <div className="bg-white rounded-xl p-5 md:p-6 shadow-sm hover:shadow-md transition-shadow h-full">
                <div className="h-10 w-10 md:h-12 md:w-12 bg-orange-100 rounded-full flex items-center justify-center mb-3 md:mb-4">
                  <Package className="h-5 w-5 md:h-6 md:w-6 text-[#FF7A21]" />
                </div>
                <h3 className="text-lg md:text-xl font-bold mb-2">
                  Zero Listing Fees
                </h3>
                <p className="text-gray-600 text-sm md:text-base">
                  List your entire catalog with no upfront costs or monthly fees
                </p>
              </div>
              <div className="bg-white rounded-xl p-5 md:p-6 shadow-sm hover:shadow-md transition-shadow h-full">
                <div className="h-10 w-10 md:h-12 md:w-12 bg-orange-100 rounded-full flex items-center justify-center mb-3 md:mb-4">
                  <Globe className="h-5 w-5 md:h-6 md:w-6 text-[#FF7A21]" />
                </div>
                <h3 className="text-lg md:text-xl font-bold mb-2">
                  Nationwide Reach
                </h3>
                <p className="text-gray-600 text-sm md:text-base">
                  Expand your market with thousands of motivated resellers
                  promoting your products
                </p>
              </div>
              <div className="bg-white rounded-xl p-5 md:p-6 shadow-sm hover:shadow-md transition-shadow h-full">
                <div className="h-10 w-10 md:h-12 md:w-12 bg-orange-100 rounded-full flex items-center justify-center mb-3 md:mb-4">
                  <CreditCard className="h-5 w-5 md:h-6 md:w-6 text-[#FF7A21]" />
                </div>
                <h3 className="text-lg md:text-xl font-bold mb-2">
                  Secure Payments
                </h3>
                <p className="text-gray-600 text-sm md:text-base">
                  Get paid automatically for every sale with transparent
                  tracking
                </p>
              </div>
              <div className="bg-white rounded-xl p-5 md:p-6 shadow-sm hover:shadow-md transition-shadow h-full">
                <div className="h-10 w-10 md:h-12 md:w-12 bg-orange-100 rounded-full flex items-center justify-center mb-3 md:mb-4">
                  <Truck className="h-5 w-5 md:h-6 md:w-6 text-[#FF7A21]" />
                </div>
                <h3 className="text-lg md:text-xl font-bold mb-2">
                  Simplified Logistics
                </h3>
                <p className="text-gray-600 text-sm md:text-base">
                  We handle delivery so you can focus on product quality and
                  inventory
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* Key Features for Plugs */}
        <section className="w-full py-12 md:py-16 bg-white">
          <div className="container px-4 md:px-6">
            <div className="flex flex-col items-center justify-center space-y-4 text-center mb-8 md:mb-12">
              <h2 className="text-2xl md:text-3xl lg:text-4xl font-bold tracking-tighter text-[#0F172A]">
                For Plugs
              </h2>
              <p className="mx-auto max-w-[700px] text-gray-700 text-base md:text-lg">
                Launch your online business today with zero inventory investment
              </p>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 md:gap-6">
              <div className="bg-orange-50 rounded-xl p-5 md:p-6 shadow-sm hover:shadow-md transition-shadow h-full">
                <div className="h-10 w-10 md:h-12 md:w-12 bg-orange-100 rounded-full flex items-center justify-center mb-3 md:mb-4">
                  <Store className="h-5 w-5 md:h-6 md:w-6 text-[#FF7A21]" />
                </div>
                <h3 className="text-lg md:text-xl font-bold mb-2">
                  Professional Storefront
                </h3>
                <p className="text-gray-600 text-sm md:text-base">
                  Get a fully-featured e-commerce site with your own branding at
                  no cost
                </p>
              </div>
              <div className="bg-orange-50 rounded-xl p-5 md:p-6 shadow-sm hover:shadow-md transition-shadow h-full">
                <div className="h-10 w-10 md:h-12 md:w-12 bg-orange-100 rounded-full flex items-center justify-center mb-3 md:mb-4">
                  <MessageCircle className="h-5 w-5 md:h-6 md:w-6 text-[#FF7A21]" />
                </div>
                <h3 className="text-lg md:text-xl font-bold mb-2">
                  WhatsApp Integration
                </h3>
                <p className="text-gray-600 text-sm md:text-base">
                  Sell directly through WhatsApp status and chats with automated
                  checkout
                </p>
              </div>
              <div className="bg-orange-50 rounded-xl p-5 md:p-6 shadow-sm hover:shadow-md transition-shadow h-full">
                <div className="h-10 w-10 md:h-12 md:w-12 bg-orange-100 rounded-full flex items-center justify-center mb-3 md:mb-4">
                  <Package className="h-5 w-5 md:h-6 md:w-6 text-[#FF7A21]" />
                </div>
                <h3 className="text-lg md:text-xl font-bold mb-2">
                  Zero Inventory Risk
                </h3>
                <p className="text-gray-600 text-sm md:text-base">
                  Start selling immediately without purchasing stock or managing
                  storage
                </p>
              </div>
              <div className="bg-orange-50 rounded-xl p-5 md:p-6 shadow-sm hover:shadow-md transition-shadow h-full">
                <div className="h-10 w-10 md:h-12 md:w-12 bg-orange-100 rounded-full flex items-center justify-center mb-3 md:mb-4">
                  <Palette className="h-5 w-5 md:h-6 md:w-6 text-[#FF7A21]" />
                </div>
                <h3 className="text-lg md:text-xl font-bold mb-2">
                  Set Your Own Prices
                </h3>
                <p className="text-gray-600 text-sm md:text-base">
                  Control your profit margins and build your unique brand
                  identity
                </p>
              </div>
              <div className="bg-orange-50 rounded-xl p-5 md:p-6 shadow-sm hover:shadow-md transition-shadow h-full">
                <div className="h-10 w-10 md:h-12 md:w-12 bg-orange-100 rounded-full flex items-center justify-center mb-3 md:mb-4">
                  <Truck className="h-5 w-5 md:h-6 md:w-6 text-[#FF7A21]" />
                </div>
                <h3 className="text-lg md:text-xl font-bold mb-2">
                  Hands-Off Delivery
                </h3>
                <p className="text-gray-600 text-sm md:text-base">
                  Products ship directly from suppliers to your customers
                  nationwide
                </p>
              </div>
              <div className="bg-orange-50 rounded-xl p-5 md:p-6 shadow-sm hover:shadow-md transition-shadow h-full">
                <div className="h-10 w-10 md:h-12 md:w-12 bg-orange-100 rounded-full flex items-center justify-center mb-3 md:mb-4">
                  <CreditCard className="h-5 w-5 md:h-6 md:w-6 text-[#FF7A21]" />
                </div>
                <h3 className="text-lg md:text-xl font-bold mb-2">
                  Instant Earnings
                </h3>
                <p className="text-gray-600 text-sm md:text-base">
                  Your profit margin is automatically credited to your account
                  after each sale
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* How It Works */}
        <section
          id="how-it-works"
          className="w-full py-12 md:py-16 bg-orange-50 scroll-mt-16"
        >
          <div className="container px-4 md:px-6">
            <div className="flex flex-col items-center justify-center space-y-4 text-center mb-8 md:mb-12">
              <h2 className="text-2xl md:text-3xl lg:text-4xl font-bold tracking-tighter text-[#0F172A]">
                How It Works
              </h2>
              <p className="mx-auto max-w-[700px] text-gray-700 text-base md:text-lg">
                A simple process to start your digital business journey
              </p>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8">
              <div className="relative">
                <div className="absolute top-0 left-4 sm:left-6 w-10 h-10 sm:w-12 sm:h-12 rounded-full bg-[#FF7A21] text-white flex items-center justify-center text-lg sm:text-xl font-bold">
                  1
                </div>
                <div className="bg-white rounded-xl p-5 pt-14 sm:p-6 sm:pt-16 shadow-sm h-full">
                  <h3 className="text-lg md:text-xl font-bold mb-2">Sign Up</h3>
                  <p className="text-gray-600 text-sm md:text-base">
                    Create your account as a Supplier or Plug in just a few
                    minutes
                  </p>
                </div>
              </div>
              <div className="relative">
                <div className="absolute top-0 left-4 sm:left-6 w-10 h-10 sm:w-12 sm:h-12 rounded-full bg-[#FF7A21] text-white flex items-center justify-center text-lg sm:text-xl font-bold">
                  2
                </div>
                <div className="bg-white rounded-xl p-5 pt-14 sm:p-6 sm:pt-16 shadow-sm h-full">
                  <h3 className="text-lg md:text-xl font-bold mb-2">
                    List or Browse Products
                  </h3>
                  <p className="text-gray-600 text-sm md:text-base">
                    Suppliers list products while Plugs browse products to sell
                  </p>
                </div>
              </div>
              <div className="relative">
                <div className="absolute top-0 left-4 sm:left-6 w-10 h-10 sm:w-12 sm:h-12 rounded-full bg-[#FF7A21] text-white flex items-center justify-center text-lg sm:text-xl font-bold">
                  3
                </div>
                <div className="bg-white rounded-xl p-5 pt-14 sm:p-6 sm:pt-16 shadow-sm h-full">
                  <h3 className="text-lg md:text-xl font-bold mb-2">
                    Set Your Prices
                  </h3>
                  <p className="text-gray-600 text-sm md:text-base">
                    Plugs select products and set their own prices with custom
                    margins
                  </p>
                </div>
              </div>
              <div className="relative">
                <div className="absolute top-0 left-4 sm:left-6 w-10 h-10 sm:w-12 sm:h-12 rounded-full bg-[#FF7A21] text-white flex items-center justify-center text-lg sm:text-xl font-bold">
                  4
                </div>
                <div className="bg-white rounded-xl p-5 pt-14 sm:p-6 sm:pt-16 shadow-sm h-full">
                  <h3 className="text-lg md:text-xl font-bold mb-2">
                    Share & Promote
                  </h3>
                  <p className="text-gray-600 text-sm md:text-base">
                    Share products via social media or your custom storefront
                  </p>
                </div>
              </div>
              <div className="relative">
                <div className="absolute top-0 left-4 sm:left-6 w-10 h-10 sm:w-12 sm:h-12 rounded-full bg-[#FF7A21] text-white flex items-center justify-center text-lg sm:text-xl font-bold">
                  5
                </div>
                <div className="bg-white rounded-xl p-5 pt-14 sm:p-6 sm:pt-16 shadow-sm h-full">
                  <h3 className="text-lg md:text-xl font-bold mb-2">
                    Customers Purchase
                  </h3>
                  <p className="text-gray-600 text-sm md:text-base">
                    Customers make purchases through your channels
                  </p>
                </div>
              </div>
              <div className="relative">
                <div className="absolute top-0 left-4 sm:left-6 w-10 h-10 sm:w-12 sm:h-12 rounded-full bg-[#FF7A21] text-white flex items-center justify-center text-lg sm:text-xl font-bold">
                  6
                </div>
                <div className="bg-white rounded-xl p-5 pt-14 sm:p-6 sm:pt-16 shadow-sm h-full">
                  <h3 className="text-lg md:text-xl font-bold mb-2">
                    We Handle The Rest
                  </h3>
                  <p className="text-gray-600 text-sm md:text-base">
                    Pluggn handles delivery and payment distribution
                    automatically
                  </p>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Store Builder/Customization */}
        <section className="w-full py-12 md:py-16 bg-white">
          <div className="container px-4 md:px-6">
            <div className="grid gap-8 lg:grid-cols-2 lg:gap-12 items-center">
              <div className="flex flex-col justify-center space-y-4">
                <div className="space-y-2">
                  <h2 className="text-2xl md:text-3xl lg:text-4xl font-bold tracking-tighter text-[#0F172A]">
                    Customize Your Store
                  </h2>
                  <p className="max-w-[600px] text-gray-700 text-base md:text-lg">
                    Our intuitive store builder lets you create a professional
                    online store in minutes, no technical skills required.
                  </p>
                </div>
                <ul className="space-y-2 md:space-y-3">
                  <li className="flex items-start gap-2">
                    <CheckCircle className="h-5 w-5 md:h-6 md:w-6 text-[#FF7A21] mt-0.5 flex-shrink-0" />
                    <span className="text-sm md:text-base">
                      Choose from beautiful, mobile-responsive templates
                    </span>
                  </li>
                  <li className="flex items-start gap-2">
                    <CheckCircle className="h-5 w-5 md:h-6 md:w-6 text-[#FF7A21] mt-0.5 flex-shrink-0" />
                    <span className="text-sm md:text-base">
                      Customize colors, fonts, and layouts to match your brand
                    </span>
                  </li>
                  <li className="flex items-start gap-2">
                    <CheckCircle className="h-5 w-5 md:h-6 md:w-6 text-[#FF7A21] mt-0.5 flex-shrink-0" />
                    <span className="text-sm md:text-base">
                      Preview your store on mobile, tablet, and desktop
                    </span>
                  </li>
                  <li className="flex items-start gap-2">
                    <CheckCircle className="h-5 w-5 md:h-6 md:w-6 text-[#FF7A21] mt-0.5 flex-shrink-0" />
                    <span className="text-sm md:text-base">
                      Add your logo and brand elements with ease
                    </span>
                  </li>
                  <li className="flex items-start gap-2">
                    <CheckCircle className="h-5 w-5 md:h-6 md:w-6 text-[#FF7A21] mt-0.5 flex-shrink-0" />
                    <span className="text-sm md:text-base">
                      Launch your store with one click
                    </span>
                  </li>
                </ul>
                <div className="pt-4">
                  <Button className="bg-[#FF7A21] hover:bg-[#e86b12] text-white">
                    Create Your Store
                  </Button>
                </div>
              </div>
              <div className="flex items-center justify-center mt-6 lg:mt-0">
                <div className="relative w-full max-w-[500px] aspect-[4/3] rounded-xl overflow-hidden shadow-xl">
                  <Image
                    src="/placeholder.svg?height=375&width=500"
                    alt="Pluggn Store Builder Interface"
                    fill
                    className="object-cover"
                  />
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Testimonials */}
        <section
          id="testimonials"
          className="w-full py-12 md:py-16 bg-orange-50 scroll-mt-16"
        >
          <div className="container px-4 md:px-6">
            <div className="flex flex-col items-center justify-center space-y-4 text-center mb-8 md:mb-12">
              <h2 className="text-2xl md:text-3xl lg:text-4xl font-bold tracking-tighter text-[#0F172A]">
                Success Stories
              </h2>
              <p className="mx-auto max-w-[700px] text-gray-700 text-base md:text-lg">
                Hear from entrepreneurs who have transformed their businesses
                with Pluggn
              </p>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8">
              <div className="bg-white rounded-xl p-5 md:p-6 shadow-sm h-full">
                <div className="flex items-center mb-4">
                  <div className="h-10 w-10 md:h-12 md:w-12 rounded-full bg-orange-100 flex items-center justify-center mr-3 md:mr-4 flex-shrink-0">
                    <span className="text-[#FF7A21] font-bold text-sm md:text-base">
                      AO
                    </span>
                  </div>
                  <div>
                    <h3 className="font-bold text-base md:text-lg">
                      Adebayo Ogunlesi
                    </h3>
                    <p className="text-xs md:text-sm text-gray-600">
                      Fashion Supplier, Lagos
                    </p>
                  </div>
                </div>
                <p className="text-gray-700 mb-4 text-sm md:text-base">
                  "Since joining Pluggn, my inventory turnover has increased by
                  300%. I now have different people across Nigeria promoting and
                  selling my products."
                </p>
                <div className="flex">
                  {[...Array(5)].map((_, i) => (
                    <Star
                      key={i}
                      className="h-4 w-4 md:h-5 md:w-5 fill-[#FF7A21] text-[#FF7A21]"
                    />
                  ))}
                </div>
              </div>
              <div className="bg-white rounded-xl p-5 md:p-6 shadow-sm h-full">
                <div className="flex items-center mb-4">
                  <div className="h-10 w-10 md:h-12 md:w-12 rounded-full bg-orange-100 flex items-center justify-center mr-3 md:mr-4 flex-shrink-0">
                    <span className="text-[#FF7A21] font-bold text-sm md:text-base">
                      CI
                    </span>
                  </div>
                  <div>
                    <h3 className="font-bold text-base md:text-lg">
                      Chioma Igwe
                    </h3>
                    <p className="text-xs md:text-sm text-gray-600">
                      Plug, Abuja
                    </p>
                  </div>
                </div>
                <p className="text-gray-700 mb-4 text-sm md:text-base">
                  "I started my online business with zero capital. Now I make
                  over ₦500,000 monthly just by sharing products on my WhatsApp
                  status and my Pluggn store."
                </p>
                <div className="flex">
                  {[...Array(5)].map((_, i) => (
                    <Star
                      key={i}
                      className="h-4 w-4 md:h-5 md:w-5 fill-[#FF7A21] text-[#FF7A21]"
                    />
                  ))}
                </div>
              </div>
              <div className="bg-white rounded-xl p-5 md:p-6 shadow-sm h-full">
                <div className="flex items-center mb-4">
                  <div className="h-10 w-10 md:h-12 md:w-12 rounded-full bg-orange-100 flex items-center justify-center mr-3 md:mr-4 flex-shrink-0">
                    <span className="text-[#FF7A21] font-bold text-sm md:text-base">
                      TO
                    </span>
                  </div>
                  <div>
                    <h3 className="font-bold text-base md:text-lg">
                      Tunde Owolabi
                    </h3>
                    <p className="text-xs md:text-sm text-gray-600">
                      Electronics Supplier, Ibadan
                    </p>
                  </div>
                </div>
                <p className="text-gray-700 mb-4 text-sm md:text-base">
                  "Pluggn has revolutionized my business. The automated
                  logistics and payment system saves me time and has helped me
                  scale across Nigeria."
                </p>
                <div className="flex">
                  {[...Array(5)].map((_, i) => (
                    <Star
                      key={i}
                      className="h-4 w-4 md:h-5 md:w-5 fill-[#FF7A21] text-[#FF7A21]"
                    />
                  ))}
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* CTA */}
        <section className="w-full py-12 md:py-16 bg-gradient-to-b from-orange-50 to-white">
          <div className="container px-4 md:px-6">
            <div className="flex flex-col items-center justify-center space-y-4 text-center">
              <div className="space-y-2 max-w-3xl">
                <h2 className="text-2xl md:text-3xl lg:text-4xl xl:text-5xl font-bold tracking-tighter text-[#0F172A]">
                  Ready to Start Your Digital Business?
                </h2>
                <p className="mx-auto max-w-[700px] text-gray-700 text-base md:text-lg lg:text-xl">
                  Join thousands of successful entrepreneurs across Africa who
                  are growing their businesses with Pluggn.
                </p>
              </div>
              <div className="pt-4 md:pt-6">
                <Button className="bg-[#FF7A21] hover:bg-[#e86b12] text-white h-12 px-8 text-base md:text-lg">
                  <Link href="/auth/register">Join Now</Link>
                </Button>
              </div>
            </div>
          </div>
        </section>

        {/* About */}
        <section
          id="about"
          className="w-full py-12 md:py-16 bg-white scroll-mt-16"
        >
          <div className="container px-4 md:px-6">
            <div className="grid gap-8 lg:grid-cols-2 lg:gap-12 items-center">
              <div className="flex flex-col justify-center space-y-4">
                <div className="space-y-2">
                  <h2 className="text-2xl md:text-3xl lg:text-4xl font-bold tracking-tighter text-[#0F172A]">
                    About Pluggn
                  </h2>
                  <p className="max-w-[600px] text-gray-700 text-base md:text-lg">
                    We're on a mission to empower entrepreneurs across Africa by
                    removing barriers to digital commerce.
                  </p>
                </div>
                <div className="space-y-3 md:space-y-4">
                  <p className="text-gray-700 text-sm md:text-base">
                    Pluggn was founded with a simple idea: make it possible for
                    anyone to start an online business without the traditional
                    barriers of inventory investment and logistics management.
                  </p>
                  <p className="text-gray-700 text-sm md:text-base">
                    Today, we're proud to help suppliers expand their market
                    presence across Nigeria and beyond, creating new business
                    opportunities for entrepreneurs at every level.
                  </p>
                  <p className="text-gray-700 text-sm md:text-base">
                    Our platform handles the complex parts of
                    e-commerce—payments, delivery, and inventory management—so
                    you can focus on growing your business and serving your
                    customers.
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
                      className="object-cover"
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
                      className="object-cover"
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
                      className="object-cover"
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
                      className="object-cover"
                    />
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* FAQ */}
        <section className="w-full py-12 md:py-16 bg-orange-50">
          <div className="container px-4 md:px-6">
            <div className="flex flex-col items-center justify-center space-y-4 text-center mb-8 md:mb-12">
              <h2 className="text-2xl md:text-3xl lg:text-4xl font-bold tracking-tighter text-[#0F172A]">
                Frequently Asked Questions
              </h2>
              <p className="mx-auto max-w-[700px] text-gray-700 text-base md:text-lg">
                Get answers to common questions about Pluggn
              </p>
            </div>
            <div className="grid gap-4 md:gap-6 max-w-3xl mx-auto">
              <div className="bg-white rounded-xl p-5 md:p-6 shadow-sm">
                <h3 className="text-lg md:text-xl font-bold mb-2">
                  How do I get started as a Plug?
                </h3>
                <p className="text-gray-700 text-sm md:text-base">
                  Simply sign up for a free account, browse products from our
                  suppliers, select items you want to sell, set your prices, and
                  start sharing with your audience through WhatsApp, social
                  media, or your free Pluggn store.
                </p>
              </div>
              <div className="bg-white rounded-xl p-5 md:p-6 shadow-sm">
                <h3 className="text-lg md:text-xl font-bold mb-2">
                  How do payments work?
                </h3>
                <p className="text-gray-700 text-sm md:text-base">
                  When a customer makes a purchase, Pluggn handles the payment
                  processing. The supplier receives their portion, you receive
                  your margin, and Pluggn takes a small service fee. Payments
                  are automatically distributed to your account.
                </p>
              </div>
              <div className="bg-white rounded-xl p-5 md:p-6 shadow-sm">
                <h3 className="text-lg md:text-xl font-bold mb-2">
                  How is delivery handled?
                </h3>
                <p className="text-gray-700 text-sm md:text-base">
                  Pluggn manages the entire delivery process. When an order is
                  placed, we coordinate with the supplier to ship the product
                  directly to your customer. You don't need to handle any
                  logistics or shipping.
                </p>
              </div>
              <div className="bg-white rounded-xl p-5 md:p-6 shadow-sm">
                <h3 className="text-lg md:text-xl font-bold mb-2">
                  Is there any cost to join?
                </h3>
                <p className="text-gray-700 text-sm md:text-base">
                  No, it's completely free to join as either a Supplier or a
                  Plug. Pluggn only makes money when you make a sale, taking a
                  small percentage of each transaction.
                </p>
              </div>
              <div className="bg-white rounded-xl p-5 md:p-6 shadow-sm">
                <h3 className="text-lg md:text-xl font-bold mb-2">
                  Can I sell on WhatsApp?
                </h3>
                <p className="text-gray-700 text-sm md:text-base">
                  Yes! Pluggn is designed to work seamlessly with WhatsApp. You
                  can share product links directly to your contacts or status,
                  and when customers click, they'll be taken to your branded
                  checkout page.
                </p>
              </div>
            </div>
          </div>
        </section>
      </main>

      {/* Footer */}
      <footer className="w-full py-10 md:py-12 lg:py-16 bg-[#0F172A] text-white">
        <div className="container px-4 md:px-6">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6 md:gap-8 lg:gap-12">
            <div className="col-span-2 md:col-span-1">
              <div className="flex items-center gap-2 mb-4">
                <ShoppingBag className="h-5 w-5 md:h-6 md:w-6 text-[#FF7A21]" />
                <span className="text-lg md:text-xl font-bold">Pluggn</span>
              </div>
              <p className="text-gray-400 mb-4 max-w-xs text-sm md:text-base">
                Empowering entrepreneurs across Africa to build successful
                digital businesses without inventory.
              </p>
              <div className="flex gap-4">
                <Link href="#" className="text-gray-400 hover:text-[#FF7A21]">
                  <Instagram className="h-5 w-5" />
                  <span className="sr-only">Instagram</span>
                </Link>
                <Link href="#" className="text-gray-400 hover:text-[#FF7A21]">
                  <Facebook className="h-5 w-5" />
                  <span className="sr-only">Facebook</span>
                </Link>
                <Link href="#" className="text-gray-400 hover:text-[#FF7A21]">
                  <Twitter className="h-5 w-5" />
                  <span className="sr-only">Twitter</span>
                </Link>
                <Link href="#" className="text-gray-400 hover:text-[#FF7A21]">
                  <MessageCircle className="h-5 w-5" />
                  <span className="sr-only">WhatsApp</span>
                </Link>
              </div>
            </div>
            <div>
              <h3 className="text-base md:text-lg font-bold mb-3 md:mb-4">
                Product
              </h3>
              <ul className="space-y-2">
                <li>
                  <button
                    onClick={() => scrollToSection("features")}
                    className="text-gray-400 hover:text-[#FF7A21] text-sm md:text-base"
                  >
                    For Suppliers
                  </button>
                </li>
                <li>
                  <Link
                    href="#"
                    className="text-gray-400 hover:text-[#FF7A21] text-sm md:text-base"
                  >
                    For Plugs
                  </Link>
                </li>
                <li>
                  <Link
                    href="#"
                    className="text-gray-400 hover:text-[#FF7A21] text-sm md:text-base"
                  >
                    Store Builder
                  </Link>
                </li>
                <li>
                  <Link
                    href="#"
                    className="text-gray-400 hover:text-[#FF7A21] text-sm md:text-base"
                  >
                    Contact
                  </Link>
                </li>
              </ul>
            </div>
            <div>
              <h3 className="text-base md:text-lg font-bold mb-3 md:mb-4">
                Company
              </h3>
              <ul className="space-y-2">
                <li>
                  <button
                    onClick={() => scrollToSection("about")}
                    className="text-gray-400 hover:text-[#FF7A21] text-sm md:text-base"
                  >
                    About Us
                  </button>
                </li>
                <li>
                  <Link
                    href="#"
                    className="text-gray-400 hover:text-[#FF7A21] text-sm md:text-base"
                  >
                    Careers
                  </Link>
                </li>
                <li>
                  <Link
                    href="#"
                    className="text-gray-400 hover:text-[#FF7A21] text-sm md:text-base"
                  >
                    Blog
                  </Link>
                </li>
              </ul>
            </div>
            <div>
              <h3 className="text-base md:text-lg font-bold mb-3 md:mb-4">
                Legal
              </h3>
              <ul className="space-y-2">
                <li>
                  <Link
                    href="#"
                    className="text-gray-400 hover:text-[#FF7A21] text-sm md:text-base"
                  >
                    Terms of Service
                  </Link>
                </li>
                <li>
                  <Link
                    href="#"
                    className="text-gray-400 hover:text-[#FF7A21] text-sm md:text-base"
                  >
                    Privacy Policy
                  </Link>
                </li>
                <li>
                  <Link
                    href="#"
                    className="text-gray-400 hover:text-[#FF7A21] text-sm md:text-base"
                  >
                    Cookie Policy
                  </Link>
                </li>
              </ul>
            </div>
          </div>
          <div className="border-t border-gray-800 mt-8 md:mt-12 pt-6 md:pt-8 flex flex-col md:flex-row justify-between items-center">
            <p className="text-gray-400 text-xs md:text-sm">
              © {new Date().getFullYear()} Pluggn. All rights reserved.
            </p>
          </div>
        </div>
      </footer>

      {/* Back to top button */}
      <button
        onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
        className="fixed bottom-6 right-6 h-10 w-10 rounded-full bg-[#FF7A21] text-white flex items-center justify-center shadow-lg hover:bg-[#e86b12] transition-colors z-40"
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
          className="h-5 w-5"
        >
          <polyline points="18 15 12 9 6 15"></polyline>
        </svg>
      </button>
    </div>
  );
}
