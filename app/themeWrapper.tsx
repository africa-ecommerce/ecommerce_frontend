"use client";

import { ThemeProvider } from "@/components/theme-provider";
import { ToasterAdvanced } from "@/components/toaster-advanced";

export default function ThemeWrapper({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <ThemeProvider attribute="class" defaultTheme="light">
      {children}
      <ToasterAdvanced />
    </ThemeProvider>
  );
}
