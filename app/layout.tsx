import type React from "react";
import "./globals.css";
import { Metadata } from "next";
import { Suspense } from "react";
import {
  Inter,
  Roboto_Mono,
  Playfair_Display,
  Poppins,
} from "next/font/google";
import { ToastProvider } from "./_components/provider/ClientToastWrapper";
import { ToasterAdvanced } from "@/components/toaster-advanced";
import { ConditionalFooter } from "./_components/conditionalFooter";

const inter = Inter({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
  variable: "--font-inter",
});

const robotoMono = Roboto_Mono({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
  variable: "--font-roboto-mono",
});

const playfair = Playfair_Display({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
  variable: "--font-playfair",
});

const poppins = Poppins({
  weight: ["400", "500", "600", "700"],
  subsets: ["latin"],
  variable: "--font-poppins",
});

export const metadata = {
  title: 'Pluggn - Start Your Online Business in Nigeria Without Inventory',
  description: 'Pluggn lets you launch and grow an online business effortlessly—no inventory, no logistics, no technical hassles. Discover trending products, sell online, and earn with ease across Nigeria.',
  alternates: {
    canonical: 'https://www.pluggn.com.ng/',
  },
  icons: {
    icon: '/favicon.ico',
  },
};


export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html
      lang="en"
      suppressHydrationWarning
      className={`${inter.variable} ${robotoMono.variable} ${playfair.variable} ${poppins.variable}`}
    >
      <body className="min-h-screen bg-background">
        <ToastProvider>
          <Suspense>
            {children}
            <ToasterAdvanced />
            <ConditionalFooter />
          </Suspense>
        </ToastProvider>
      </body>
    </html>
  );
}
