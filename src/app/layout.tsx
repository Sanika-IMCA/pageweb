import type { Metadata } from "next";
import { Playfair_Display, Inter, JetBrains_Mono } from "next/font/google";
import "./globals.css";
import SmoothScroll from "@/components/SmoothScroll";
import CustomCursor from "@/components/CustomCursor";
import RouteTransition from "@/components/RouteTransition";
import Image from "next/image";

const displayFont = Playfair_Display({
  variable: "--font-display",
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
});

const bodyFont = Inter({
  variable: "--font-body",
  subsets: ["latin"],
  weight: ["300", "400", "500", "600"],
});

const monoFont = JetBrains_Mono({
  variable: "--font-mono",
  subsets: ["latin"],
  weight: ["400", "500"],
});

export const metadata: Metadata = {
  title: "Page Studios — We study businesses before we build software.",
  description: "We study businesses before we build software. Coded for operational rigor and precision.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={`${displayFont.variable} ${bodyFont.variable} ${monoFont.variable} h-full antialiased`}
    >
      <body className="bg-charcoal-base text-primary-text font-sans min-h-full flex flex-col relative">
        {/* Custom cursor lagged follow ring dot */}
        <CustomCursor />


        
        {/* Global smooth scrolling drives route transition wipe overlays */}
        <SmoothScroll>
          <RouteTransition>{children}</RouteTransition>
        </SmoothScroll>
      </body>
    </html>
  );
}
