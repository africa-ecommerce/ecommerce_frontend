"use client";

import { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { Menu, X } from "lucide-react";

import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

export default function Header() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  return (
    <header className="w-full py-4 px-4 md:px-6 border-b sticky top-0 z-50 bg-background shadow-sm">
      <div className="container mx-auto flex items-center justify-between">
        {/* Logo */}
        <Link href="/" className="flex items-center">
          <div className="relative h-10 w-40">
            <Image
              src="/placeholder.svg?height=40&width=160"
              alt="AfriConnect Logo"
              fill
              className="object-contain"
              priority
            />
          </div>
        </Link>

        {/* Desktop Navigation */}
        <nav className="hidden md:flex items-center space-x-6">
          <Link
            href="/features"
            className="text-sm font-medium hover:text-primary transition-colors"
          >
            Features
          </Link>
          <Link
            href="/pricing"
            className="text-sm font-medium hover:text-primary transition-colors"
          >
            Pricing
          </Link>
          <Link
            href="/about"
            className="text-sm font-medium hover:text-primary transition-colors"
          >
            About
          </Link>
          <Link
            href="/contact"
            className="text-sm font-medium hover:text-primary transition-colors"
          >
            Contact
          </Link>
        </nav>

        {/* Desktop CTA Button */}
        <div className="hidden md:block">
          <Button size="lg" className="rounded-md font-medium">
            Get Started
          </Button>
        </div>

        {/* Mobile Menu Button */}
        <button
          className="md:hidden p-2 text-foreground"
          onClick={() => setIsMenuOpen(!isMenuOpen)}
          aria-label={isMenuOpen ? "Close menu" : "Open menu"}
        >
          {isMenuOpen ? (
            <X className="h-6 w-6" />
          ) : (
            <Menu className="h-6 w-6" />
          )}
        </button>
      </div>

      {/* Mobile Menu */}
      <div
        className={cn(
          "md:hidden fixed inset-x-0 top-[65px] bg-background border-b z-50 transition-all duration-300 ease-in-out",
          isMenuOpen
            ? "max-h-screen opacity-100"
            : "max-h-0 opacity-0 pointer-events-none"
        )}
      >
        <div className="container mx-auto px-4 py-4 flex flex-col space-y-4">
          <Link
            href="/features"
            className="text-lg font-medium py-2 hover:text-primary transition-colors"
            onClick={() => setIsMenuOpen(false)}
          >
            Features
          </Link>
          <Link
            href="/pricing"
            className="text-lg font-medium py-2 hover:text-primary transition-colors"
            onClick={() => setIsMenuOpen(false)}
          >
            Pricing
          </Link>
          <Link
            href="/about"
            className="text-lg font-medium py-2 hover:text-primary transition-colors"
            onClick={() => setIsMenuOpen(false)}
          >
            About
          </Link>
          <Link
            href="/contact"
            className="text-lg font-medium py-2 hover:text-primary transition-colors"
            onClick={() => setIsMenuOpen(false)}
          >
            Contact
          </Link>
          <Button
            size="lg"
            className="w-full mt-4 rounded-md font-medium"
            onClick={() => setIsMenuOpen(false)}
          >
            Get Started
          </Button>
        </div>
      </div>
    </header>
  );
}
