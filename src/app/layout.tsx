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
          
          {/* Background leaf vase image */}
          <div className="absolute inset-0 w-full h-full opacity-10 mix-blend-lighten scale-[1.05]">
            <Image
              src="/assets/global-backdrop.png"
              alt="Sayagaa studios global aesthetic background"
              fill
              priority
              className="object-cover object-center filter grayscale brightness-[1.8] contrast-[0.95]"
            />
          </div>

          {/* Luxury metallic glassy overlay */}
          <div className="absolute inset-0 bg-[#0f1115]/85 backdrop-blur-[6px] z-10" />
          <div 
            className="absolute inset-0 opacity-[0.03] mix-blend-overlay z-20"
            style={{
              backgroundImage: `
                linear-gradient(135deg, rgba(255, 255, 255, 0.4) 0%, transparent 50%, rgba(255, 255, 255, 0.4) 100%),
                repeating-linear-gradient(45deg, rgba(255, 255, 255, 0.05) 0px, rgba(255, 255, 255, 0.05) 2px, transparent 2px, transparent 10px)
              `
            }}
          />
          {/* Subtle noise pattern for metallic texture */}
          <div 
            className="absolute inset-0 opacity-[0.02] mix-blend-overlay z-20"
            style={{
              backgroundImage: `radial-gradient(circle, #fff 10%, transparent 11%)`,
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
