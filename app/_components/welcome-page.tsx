"use client";

import Link from "next/link";
import Image from "next/image";
import {
  ArrowRight,
  ChevronLeft,
  ChevronRight,
  Play,
  CheckCircle,
} from "lucide-react";
import { useState } from "react";

import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";

export default function WelcomePage() {
  const [activeSlide, setActiveSlide] = useState(0);

  const nextSlide = () => {
    setActiveSlide((prev) => (prev === 2 ? 0 : prev + 1));
  };

  const prevSlide = () => {
    setActiveSlide((prev) => (prev === 0 ? 2 : prev - 1));
  };

  const goToSlide = (index: number) => {
    setActiveSlide(index);
  };

  return (
    <div className="flex min-h-screen flex-col bg-white overflow-x-hidden">
      {/* Mobile-Optimized Header */}
      <header className="fixed top-0 left-0 right-0 z-50 bg-white/90 backdrop-blur-sm border-b border-gray-100">
        <div className="container mx-auto px-4 py-3 flex justify-between items-center">
          <div className="flex items-center gap-2">
            <div className="h-8 w-8 rounded-md bg-orange-500 flex items-center justify-center">
              <svg
                width="20"
                height="20"
                viewBox="0 0 24 24"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
                className="text-white"
              >
                <path
                  d="M12 2L15.09 8.26L22 9.27L17 14.14L18.18 21.02L12 17.77L5.82 21.02L7 14.14L2 9.27L8.91 8.26L12 2Z"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  fill="currentColor"
                />
              </svg>
            </div>
            <span className="font-bold text-xl">Pluggn</span>
          </div>

          <div className="flex items-center gap-3">
            <Button
              variant="outline"
              size="sm"
              className="hidden xs:inline-flex"
              asChild
            >
              <Link href="/auth/register">Sign Up</Link>
            </Button>
            <Button
              size="sm"
              className="bg-orange-500 hover:bg-orange-600 hidden xs:inline-flex"
              asChild
            >
              <Link href="/dashboard">Get Started</Link>
            </Button>
          </div>
        </div>
      </header>

      {/* Hero Section with Improved Mobile Responsiveness */}
      <section className="pt-20 pb-8 md:pt-32 md:pb-16">
        <div className="container mx-auto px-4">
          <div className="flex flex-col md:flex-row md:items-center gap-8">
            <div className="md:w-1/2 order-2 md:order-1">
              <h1 className="text-3xl sm:text-4xl md:text-5xl font-bold tracking-tight text-gray-900 mb-4 text-center sm:text-left">
                Empower Your{" "}
                <span className="text-orange-500">Digital Business</span>{" "}
                Journey
              </h1>
              <p className="text-base text-gray-600 mb-6 text-center sm:text-left">
                Connect with customers across Africa. Sell online, in-store, or 
                through WhatsApp with Pluggn's all-in-one platform.
              </p>
              <div className="flex flex-col sm:flex-row gap-4 mb-8 justify-center sm:justify-start">
                <Button
                  className="bg-orange-500 hover:bg-orange-600 w-full sm:w-auto"
                  asChild
                >
                  <Link href="/onboarding/user-type">
                    Start Free <ArrowRight className="ml-2 h-5 w-5" />
                  </Link>
                </Button>
                <Button
                  variant="outline"
                  className="w-full sm:w-auto"
                  asChild
                >
                  <Link href="#demo" className="flex items-center justify-center">
                    <Play className="mr-2 h-5 w-5 text-orange-500" /> Watch Demo
                  </Link>
                </Button>
              </div>
              <div className="flex flex-col items-center sm:items-start sm:flex-row sm:justify-start gap-4">
                <div className="flex -space-x-2">
                  {[1, 2, 3, 4].map((i) => (
                    <div
                      key={i}
                      className="h-8 w-8 rounded-full border-2 border-white bg-gray-200 flex items-center justify-center overflow-hidden"
                    >
                      <Image
                        src="/placeholder.svg?height=40&width=40"
                        alt={`User ${i}`}
                        width={40}
                        height={40}
                        className="object-cover"
                      />
                    </div>
                  ))}
                </div>
                <div className="text-center sm:text-left">
                  <p className="font-medium text-sm">
                    Trusted by 10,000+ entrepreneurs
                  </p>
                  <div className="flex items-center justify-center sm:justify-start">
                    {[1, 2, 3, 4, 5].map((i) => (
                      <svg
                        key={i}
                        width="14"
                        height="14"
                        viewBox="0 0 24 24"
                        fill="none"
                        xmlns="http://www.w3.org/2000/svg"
                        className="text-orange-500"
                      >
                        <path
                          d="M12 2L15.09 8.26L22 9.27L17 14.14L18.18 21.02L12 17.77L5.82 21.02L7 14.14L2 9.27L8.91 8.26L12 2Z"
                          fill="currentColor"
                        />
                      </svg>
                    ))}
                    <span className="ml-1 text-xs text-gray-600">
                      4.9/5
                    </span>
                  </div>
                </div>
              </div>
            </div>
            <div className="relative md:w-1/2 order-1 md:order-2 mb-6 md:mb-0 flex justify-center">
              <div className="absolute -top-10 -left-10 h-40 w-40 bg-orange-100 rounded-full opacity-50 blur-3xl hidden sm:block"></div>
              <div className="absolute -bottom-10 -right-10 h-40 w-40 bg-orange-100 rounded-full opacity-50 blur-3xl hidden sm:block"></div>
              <div className="relative bg-white rounded-xl shadow-xl overflow-hidden border border-gray-100 max-w-[500px] w-full">
                <Image
                  src="/placeholder.svg?height=600&width=500"
                  alt="Pluggn platform preview"
                  width={500}
                  height={600}
                  className="object-cover w-full"
                />
                <div className="absolute top-4 right-4 bg-white/90 backdrop-blur-sm rounded-full px-3 py-1 text-xs font-medium text-orange-500 border border-orange-100">
                  New Features
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Mobile-Optimized Mockup Image Explainer Section */}
      <section id="features" className="py-12 md:py-16 bg-gray-50">
        <div className="container mx-auto px-4">
          <div className="text-center mb-8 md:mb-12">
            <h2 className="text-2xl md:text-3xl font-bold mb-3 md:mb-4">
              Everything You Need to Succeed
            </h2>
            <p className="text-gray-600 max-w-2xl mx-auto text-sm md:text-base">
              Pluggn provides all the tools you need to build, manage, and grow
              your digital business in one place.
            </p>
          </div>

          {/* Mobile-Optimized Mockup Carousel */}
          <div className="relative">
            <div className="mockup-carousel overflow-hidden rounded-xl">
              <div
                className="flex transition-transform duration-500 ease-in-out"
                style={{ transform: `translateX(-${activeSlide * 100}%)` }}
              >
                {/* Mockup 1 */}
                <div className="w-full flex-shrink-0 px-2 md:px-4">
                  <div className="flex flex-col md:flex-row md:items-center gap-6 md:gap-8">
                    <div className="md:w-1/2 order-2 md:order-1">
                      <h3 className="text-xl md:text-2xl font-bold mb-3 md:mb-4">
                        Seamless Onboarding
                      </h3>
                      <p className="text-gray-600 mb-4 md:mb-6 text-sm md:text-base">
                        Get started in minutes with our intuitive onboarding
                        process. We'll guide you through every step of setting
                        up your digital business.
                      </p>
                      <ul className="space-y-2 md:space-y-3 text-sm md:text-base">
                        {[
                          "User-friendly interface",
                          "Step-by-step guidance",
                          "Customizable options",
                        ].map((item, i) => (
                          <li key={i} className="flex items-start gap-2">
                            <CheckCircle className="h-4 w-4 md:h-5 md:w-5 text-green-500 mt-0.5" />
                            <span>{item}</span>
                          </li>
                        ))}
                      </ul>
                    </div>
                    <div className="md:w-1/2 order-1 md:order-2 mb-4 md:mb-0">
                      <div className="bg-white rounded-xl shadow-lg overflow-hidden border border-gray-100">
                        <Image
                          src="/placeholder.svg?height=400&width=500"
                          alt="Onboarding mockup"
                          width={500}
                          height={400}
                          className="object-cover w-full"
                        />
                      </div>
                    </div>
                  </div>
                </div>

                {/* Mockup 2 */}
                <div className="w-full flex-shrink-0 px-2 md:px-4">
                  <div className="flex flex-col md:flex-row md:items-center gap-6 md:gap-8">
                    <div className="md:w-1/2 order-2 md:order-1">
                      <h3 className="text-xl md:text-2xl font-bold mb-3 md:mb-4">
                        Powerful Store Management
                      </h3>
                      <p className="text-gray-600 mb-4 md:mb-6 text-sm md:text-base">
                        Manage your products, inventory, and orders with our
                        powerful dashboard. Get insights into your business
                        performance.
                      </p>
                      <ul className="space-y-2 md:space-y-3 text-sm md:text-base">
                        {[
                          "Inventory tracking",
                          "Order management",
                          "Analytics dashboard",
                        ].map((item, i) => (
                          <li key={i} className="flex items-start gap-2">
                            <CheckCircle className="h-4 w-4 md:h-5 md:w-5 text-green-500 mt-0.5" />
                            <span>{item}</span>
                          </li>
                        ))}
                      </ul>
                    </div>
                    <div className="md:w-1/2 order-1 md:order-2 mb-4 md:mb-0">
                      <div className="bg-white rounded-xl shadow-lg overflow-hidden border border-gray-100">
                        <Image
                          src="/placeholder.svg?height=400&width=500"
                          alt="Store management mockup"
                          width={500}
                          height={400}
                          className="object-cover w-full"
                        />
                      </div>
                    </div>
                  </div>
                </div>

                {/* Mockup 3 */}
                <div className="w-full flex-shrink-0 px-2 md:px-4">
                  <div className="flex flex-col md:flex-row md:items-center gap-6 md:gap-8">
                    <div className="md:w-1/2 order-2 md:order-1">
                      <h3 className="text-xl md:text-2xl font-bold mb-3 md:mb-4">
                        Multi-Channel Selling
                      </h3>
                      <p className="text-gray-600 mb-4 md:mb-6 text-sm md:text-base">
                        Sell your products across multiple channels including
                        your online store, social media, and WhatsApp.
                      </p>
                      <ul className="space-y-2 md:space-y-3 text-sm md:text-base">
                        {[
                          "Online store",
                          "Social media integration",
                          "WhatsApp business",
                        ].map((item, i) => (
                          <li key={i} className="flex items-start gap-2">
                            <CheckCircle className="h-4 w-4 md:h-5 md:w-5 text-green-500 mt-0.5" />
                            <span>{item}</span>
                          </li>
                        ))}
                      </ul>
                    </div>
                    <div className="md:w-1/2 order-1 md:order-2 mb-4 md:mb-0">
                      <div className="bg-white rounded-xl shadow-lg overflow-hidden border border-gray-100">
                        <Image
                          src="/placeholder.svg?height=400&width=500"
                          alt="Multi-channel selling mockup"
                          width={500}
                          height={400}
                          className="object-cover w-full"
                        />
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Mobile-Optimized Carousel Controls */}
            <div className="flex justify-center mt-6 md:mt-8 gap-2">
              {[0, 1, 2].map((index) => (
                <button
                  key={index}
                  className={`carousel-dot ${
                    activeSlide === index ? "active" : ""
                  }`}
                  onClick={() => goToSlide(index)}
                  aria-label={`Go to slide ${index + 1}`}
                ></button>
              ))}
            </div>

            <button
              className="absolute top-1/2 left-0 md:left-4 -translate-y-1/2 h-8 w-8 md:h-10 md:w-10 rounded-full bg-white shadow-md flex items-center justify-center text-gray-600 hover:text-orange-500 focus:outline-none"
              onClick={prevSlide}
              aria-label="Previous slide"
            >
              <ChevronLeft className="h-5 w-5 md:h-6 md:w-6" />
            </button>
            <button
              className="absolute top-1/2 right-0 md:right-4 -translate-y-1/2 h-8 w-8 md:h-10 md:w-10 rounded-full bg-white shadow-md flex items-center justify-center text-gray-600 hover:text-orange-500 focus:outline-none"
              onClick={nextSlide}
              aria-label="Next slide"
            >
              <ChevronRight className="h-5 w-5 md:h-6 md:w-6" />
            </button>
          </div>
        </div>
      </section>

      {/* Mobile-Optimized Stats Section */}
      <section className="py-10 md:py-16">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-2 gap-4 md:grid-cols-4 md:gap-6">
            {[
              { number: "10K+", label: "Entrepreneurs" },
              { number: "25+", label: "Countries" },
              { number: "$2M+", label: "Sales Generated" },
              { number: "99%", label: "Customer Satisfaction" },
            ].map((stat, i) => (
              <Card
                key={i}
                className="p-4 md:p-6 text-center border-none shadow-md"
              >
                <p className="text-xl md:text-3xl font-bold text-orange-500 mb-1 md:mb-2">
                  {stat.number}
                </p>
                <p className="text-gray-600 text-xs md:text-base">
                  {stat.label}
                </p>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Mobile-Optimized CTA Section */}
      <section className="py-10 md:py-16 bg-orange-50">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-2xl md:text-3xl font-bold mb-3 md:mb-4">
            Ready to Start Your Digital Business?
          </h2>
          <p className="text-gray-600 max-w-2xl mx-auto mb-6 md:mb-8 text-sm md:text-base">
            Join thousands of entrepreneurs across Africa who are building
            successful digital businesses with Pluggn.
          </p>
          <Button
            className="bg-orange-500 hover:bg-orange-600 py-5 md:py-6 px-6 md:px-8 text-base md:text-lg w-full sm:w-auto"
            asChild
          >
            <Link href="/dashboard">
              Get Started Now <ArrowRight className="ml-2 h-5 w-5" />
            </Link>
          </Button>
        </div>
      </section>

      {/* Mobile-Optimized Footer */}
      <footer className="py-10 md:py-12 bg-gray-900 text-white">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-2 gap-8 md:grid-cols-4">
            <div className="col-span-2 md:col-span-1">
              <div className="flex items-center gap-2 mb-4">
                <div className="h-8 w-8 rounded-md bg-orange-500 flex items-center justify-center">
                  <svg
                    width="20"
                    height="20"
                    viewBox="0 0 24 24"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                    className="text-white"
                  >
                    <path
                      d="M12 2L15.09 8.26L22 9.27L17 14.14L18.18 21.02L12 17.77L5.82 21.02L7 14.14L2 9.27L8.91 8.26L12 2Z"
                      stroke="currentColor"
                      strokeWidth="2"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      fill="currentColor"
                    />
                  </svg>
                </div>
                <span className="font-bold text-xl">Pluggn</span>
              </div>
              <p className="text-gray-400 mb-4 text-sm md:text-base">
                Empowering African digital entrepreneurs to build successful
                online businesses.
              </p>
            </div>
            <div>
              <h3 className="font-bold mb-3 md:mb-4 text-sm md:text-base">
                Product
              </h3>
              <ul className="space-y-2">
                {["Features", "Pricing", "Testimonials", "FAQ"].map(
                  (item, i) => (
                    <li key={i}>
                      <Link
                        href="#"
                        className="text-gray-400 hover:text-white transition-colors text-xs md:text-sm"
                      >
                        {item}
                      </Link>
                    </li>
                  )
                )}
              </ul>
            </div>
            <div>
              <h3 className="font-bold mb-3 md:mb-4 text-sm md:text-base">
                Company
              </h3>
              <ul className="space-y-2">
                {["About Us", "Careers", "Blog", "Contact"].map((item, i) => (
                  <li key={i}>
                    <Link
                      href="#"
                      className="text-gray-400 hover:text-white transition-colors text-xs md:text-sm"
                    >
                      {item}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
            <div>
              <h3 className="font-bold mb-3 md:mb-4 text-sm md:text-base">
                Legal
              </h3>
              <ul className="space-y-2">
                {["Terms of Service", "Privacy Policy", "Cookie Policy"].map(
                  (item, i) => (
                    <li key={i}>
                      <Link
                        href="#"
                        className="text-gray-400 hover:text-white transition-colors text-xs md:text-sm"
                      >
                        {item}
                      </Link>
                    </li>
                  )
                )}
              </ul>
            </div>
          </div>
          <div className="border-t border-gray-800 mt-8 pt-6 text-center text-gray-400 text-xs md:text-sm">
            <p>© {new Date().getFullYear()} Pluggn. All rights reserved.</p>
          </div>
        </div>
      </footer>

      {/* Custom CSS for carousel dots */}
      <style jsx global>{`
        .carousel-dot {
          width: 8px;
          height: 8px;
          border-radius: 50%;
          background-color: #e5e7eb;
          border: none;
          cursor: pointer;
          transition: all 0.3s ease;
        }

        .carousel-dot.active {
          background-color: #f97316;
          width: 20px;
          border-radius: 4px;
        }

        @media (min-width: 768px) {
          .carousel-dot {
            width: 12px;
            height: 12px;
          }

          .carousel-dot.active {
            width: 24px;
            border-radius: 6px;
          }
        }
      `}</style>
    </div>
  );
}
