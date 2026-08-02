import type { Metadata } from "next";
import { Playfair_Display, Inter, JetBrains_Mono } from "next/font/google";
import "./globals.css";
import SmoothScroll from "@/components/SmoothScroll";
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
  title: "Sayagaa Studios — We study businesses before we build software.",
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
        
        {/* Global Parallax Backdrop Container */}
        <div className="fixed inset-0 w-screen h-screen overflow-hidden pointer-events-none z-0">
          
          {/* Background image removed to keep background plain/solid */}

          {/* Luxury metallic glassy overlay (white/light) */}
          <div className="absolute inset-0 bg-white/70 backdrop-blur-[6px] z-10" />
          <div 
            className="absolute inset-0 opacity-[0.06] mix-blend-overlay z-20"
            style={{
              backgroundImage: `
                linear-gradient(135deg, rgba(0, 0, 0, 0.05) 0%, transparent 50%, rgba(0, 0, 0, 0.05) 100%),
                repeating-linear-gradient(45deg, rgba(0, 0, 0, 0.02) 0px, rgba(0, 0, 0, 0.02) 2px, transparent 2px, transparent 10px)
              `
            }}
          />
          {/* Subtle noise pattern for metallic texture */}
          <div 
            className="absolute inset-0 opacity-[0.02] mix-blend-overlay z-20"
            style={{
              backgroundImage: `radial-gradient(circle, #000 10%, transparent 11%)`,
              backgroundSize: "4px 4px"
            }}
          />
        </div>

        {/* Global smooth scrolling drives route transition wipe overlays */}
        <SmoothScroll>
          <RouteTransition>{children}</RouteTransition>
        </SmoothScroll>
      </body>
    </html>
  );
}
