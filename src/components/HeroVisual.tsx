"use client";

import React, { useEffect, useState } from "react";
import dynamic from "next/dynamic";

const HeroVisualContent = dynamic(() => import("./HeroVisualContent"), {
  ssr: false,
  loading: () => <FallbackVisual />
});

interface HeroVisualProps {
  activeState: number;
  setActiveState: (state: number) => void;
}

export default function HeroVisual({ activeState, setActiveState }: HeroVisualProps) {
  const [webGLSupported, setWebGLSupported] = useState<boolean | null>(null);
  const [reduceMotion, setReduceMotion] = useState(false);
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    // 1. Detect WebGL support
    const checkWebGL = () => {
      try {
        const canvas = document.createElement("canvas");
        const supported = !!(
          canvas.getContext("webgl2") ||
          canvas.getContext("webgl") ||
          canvas.getContext("experimental-webgl")
        );
        setWebGLSupported(supported);
      } catch (e) {
        setWebGLSupported(false);
      }
    };

    checkWebGL();

    // 2. Detect prefers-reduced-motion
    const mediaQuery = window.matchMedia("(prefers-reduced-motion: reduce)");
    setReduceMotion(mediaQuery.matches);

    const listener = (e: MediaQueryListEvent) => {
      setReduceMotion(e.matches);
    };

    mediaQuery.addEventListener("change", listener);

    // 3. Detect mobile viewport size
    const checkMobile = () => {
      setIsMobile(window.innerWidth < 768);
    };
    checkMobile();
    window.addEventListener("resize", checkMobile);

    return () => {
      mediaQuery.removeEventListener("change", listener);
      window.removeEventListener("resize", checkMobile);
    };
  }, []);

  if (webGLSupported === false) {
    return <FallbackVisual />;
  }

  // Render the WebGL shader canvas
  return (
    <div className="w-full h-full relative">
      <HeroVisualContent 
        activeState={activeState} 
        setActiveState={setActiveState} 
        reduceMotion={reduceMotion}
        isMobile={isMobile}
      />
    </div>
  );
}

// Crisp editorial SVG fallback diagram for loading states or WebGL-less clients
function FallbackVisual() {
  return (
    <div className="w-full h-full min-h-[400px] md:min-h-[500px] lg:min-h-[600px] relative flex items-center justify-center overflow-hidden bg-transparent select-none">
      {/* Decorative Blueprint Dotted Technical Grid */}
      <div 
        className="absolute inset-0 opacity-10"
        style={{
          backgroundImage: `
            radial-gradient(circle, rgba(46, 91, 148, 0.15) 1px, transparent 1px)
          `,
          backgroundSize: "30px 30px"
        }}
      />
      
      {/* Abstract blueprint graphic */}
      <svg
        width="80%"
        height="80%"
        viewBox="0 0 400 400"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        className="max-w-[400px] max-h-[400px] text-brass-accent/30 animate-pulse duration-[3000ms]"
      >
        <circle cx="200" cy="200" r="120" stroke="currentColor" strokeWidth="1" strokeDasharray="4 6" />
        <circle cx="200" cy="200" r="70" stroke="currentColor" strokeWidth="1" />
        <circle cx="200" cy="200" r="10" fill="currentColor" fillOpacity="0.8" />
        
        {/* Radiating spoke lines */}
        {[0, 45, 90, 135, 180, 225, 270, 315].map((angle) => {
          const rad = (angle * Math.PI) / 180;
          const x1 = 200 + 10 * Math.cos(rad);
          const y1 = 200 + 10 * Math.sin(rad);
          const x2 = 200 + 120 * Math.cos(rad);
          const y2 = 200 + 120 * Math.sin(rad);
          return (
            <line
              key={angle}
              x1={x1}
              y1={y1}
              x2={x2}
              y2={y2}
              stroke="currentColor"
              strokeWidth="0.75"
              strokeOpacity="0.5"
            />
          );
        })}

        {/* Orbiting nodes */}
        <circle cx="270" cy="200" r="4" fill="currentColor" fillOpacity="0.7" />
        <circle cx="130" cy="200" r="4" fill="currentColor" fillOpacity="0.7" />
        <circle cx="200" cy="270" r="4" fill="currentColor" fillOpacity="0.7" />
        <circle cx="200" cy="130" r="4" fill="currentColor" fillOpacity="0.7" />

        <circle cx="285" cy="285" r="5" fill="currentColor" fillOpacity="0.4" />
        <circle cx="115" cy="115" r="5" fill="currentColor" fillOpacity="0.4" />
      </svg>
    </div>
  );
}
