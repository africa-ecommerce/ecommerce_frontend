



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

export const metadata: Metadata = {
  title: "Pluggn - Empower Your Digital Business Journeys",
  description:
    "Connect with customers across Africa and beyond. Sell online, in-store, or through WhatsApp with Pluggn's all-in-one platform.",

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
            </Suspense>
          </ToastProvider>
      </body>
    </html>
  );
}