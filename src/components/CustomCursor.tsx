"use client";

import { useEffect, useRef, useState } from "react";
import gsap from "gsap";
import { useReducedMotion } from "framer-motion";

export default function CustomCursor() {
  const dotRef = useRef<HTMLDivElement>(null);
  const ringRef = useRef<HTMLDivElement>(null);
  const [enabled, setEnabled] = useState(false);
  const shouldReduceMotion = useReducedMotion();

  // Phase 1: Determine if the custom cursor is allowed based on viewport & user preferences
  useEffect(() => {
    const isTouchDevice = "ontouchstart" in window || navigator.maxTouchPoints > 0;
    if (shouldReduceMotion || isTouchDevice) return;

    // Apply global hidden cursor class to root element
    document.documentElement.classList.add("cursor-none-active");
    setEnabled(true);

    return () => {
      document.documentElement.classList.remove("cursor-none-active");
    };
  }, [shouldReduceMotion]);

  // Phase 2: Once enabled, retrieve mounted DOM references and hook up GSAP listeners
  useEffect(() => {
    if (!enabled) return;

    const dot = dotRef.current;
    const ring = ringRef.current;

    if (!dot || !ring) return;

    // Set initial coordinates offscreen and hide opacity until mouse moves to prevent flashes at top-left
    gsap.set([dot, ring], { opacity: 0 });

    // Establish GSAP quickTo coordinates setters for buttery inertia tracking
    const xToDot = gsap.quickTo(dot, "x", { duration: 0.1, ease: "power3.out" });
    const yToDot = gsap.quickTo(dot, "y", { duration: 0.1, ease: "power3.out" });

    // Outer ring has a larger delay (0.35s duration) to produce the lag follow effect
    const xToRing = gsap.quickTo(ring, "x", { duration: 0.35, ease: "power3.out" });
    const yToRing = gsap.quickTo(ring, "y", { duration: 0.35, ease: "power3.out" });

    let hasMoved = false;

    const handleMouseMove = (e: MouseEvent) => {
      if (!hasMoved) {
        gsap.set([dot, ring], { opacity: 1 });
        hasMoved = true;
      }
      // Offset cursor elements to center coordinates of cursor elements
      xToDot(e.clientX - 3);
      yToDot(e.clientY - 3);
      xToRing(e.clientX - 16);
      yToRing(e.clientY - 16);
    };

    window.addEventListener("mousemove", handleMouseMove);

    return () => {
      window.removeEventListener("mousemove", handleMouseMove);
    };
  }, [enabled]);

  if (!enabled) return null;

  return (
    <>
      <style jsx global>{`
        /* Global CSS override to hide default cursor when custom cursor active */
        .cursor-none-active,
        .cursor-none-active * {
          cursor: none !important;
        }
      `}</style>
      
      {/* Center Dot */}
      <div
        ref={dotRef}
        className="fixed top-0 left-0 w-1.5 h-1.5 bg-brass-accent rounded-full pointer-events-none z-[9999] mix-blend-difference"
      />

      {/* Lagging Ring */}
      <div
        ref={ringRef}
        className="fixed top-0 left-0 w-8 h-8 border border-brass-accent/60 rounded-full pointer-events-none z-[9999]"
      />
    </>
  );
}
