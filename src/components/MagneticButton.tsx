"use client";

import { useEffect, useRef } from "react";
import gsap from "gsap";
import { useReducedMotion } from "framer-motion";

interface MagneticButtonProps {
  children: React.ReactNode;
  className?: string;
}

export default function MagneticButton({ children, className = "" }: MagneticButtonProps) {
  const ref = useRef<HTMLDivElement>(null);
  const shouldReduceMotion = useReducedMotion();

  useEffect(() => {
    if (shouldReduceMotion) return;

    const el = ref.current;
    if (!el) return;

    // Coordinate target bindings
    const xTo = gsap.quickTo(el, "x", { duration: 0.4, ease: "power3.out" });
    const yTo = gsap.quickTo(el, "y", { duration: 0.4, ease: "power3.out" });

    const handleMouseMove = (e: MouseEvent) => {
      const bound = el.getBoundingClientRect();
      const xCoord = e.clientX - (bound.left + bound.width / 2);
      const yCoord = e.clientY - (bound.top + bound.height / 2);

      // Limit displacement to max ~10px strength
      xTo(xCoord * 0.35);
      yTo(yCoord * 0.35);
    };

    const handleMouseLeave = () => {
      xTo(0);
      yTo(0);
    };

    el.addEventListener("mousemove", handleMouseMove);
    el.addEventListener("mouseleave", handleMouseLeave);

    return () => {
      el.removeEventListener("mousemove", handleMouseMove);
      el.removeEventListener("mouseleave", handleMouseLeave);
    };
  }, [shouldReduceMotion]);

  return (
    <div ref={ref} className={`inline-block ${className}`}>
      {children}
    </div>
  );
}
