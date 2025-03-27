import type React from "react"
import "./globals.css"
import ClientLayout from "./clientLayout"
import { Metadata } from "next";


export const metadata: Metadata = {
  title: "Pluggn - Empower Your Digital Business Journey",
  description:
    "Connect with customers across Africa and beyond. Sell online, in-store, or through WhatsApp with Pluggn's all-in-one platform.",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return <ClientLayout>{children}</ClientLayout>
}





