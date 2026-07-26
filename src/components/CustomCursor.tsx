"use client";

import { useEffect, useRef, useState } from "react";

export default function CustomCursor() {
  const dotRef = useRef<HTMLDivElement>(null);
  const ringRef = useRef<HTMLDivElement>(null);
  const [enabled, setEnabled] = useState(false);

  useEffect(() => {
    const isTouchDevice = "ontouchstart" in window || navigator.maxTouchPoints > 0;
    const prefersReduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (isTouchDevice || prefersReduced) return;

    document.documentElement.classList.add("cursor-none-active");
    setEnabled(true);

    return () => {
      document.documentElement.classList.remove("cursor-none-active");
    };
  }, []);

  useEffect(() => {
    if (!enabled) return;

    const dot = dotRef.current;
    const ring = ringRef.current;
    if (!dot || !ring) return;

    let mouseX = -100;
    let mouseY = -100;
    let ringX = -100;
    let ringY = -100;
    let isVisible = false;
    let isHovered = false;
    let isMouseDown = false;
    let rafId: number;

    const handleMouseMove = (e: MouseEvent) => {
      mouseX = e.clientX;
      mouseY = e.clientY;
      if (!isVisible) {
        isVisible = true;
        dot.style.opacity = "1";
        ring.style.opacity = "1";
      }
    };

    const handleMouseOver = (e: MouseEvent) => {
      const target = e.target as HTMLElement | null;
      if (!target) return;
      const interactive = target.closest(
        "a, button, input, textarea, select, [role='button'], .cursor-pointer, [data-cursor]"
      );
      isHovered = !!interactive;
    };

    const handleMouseDown = () => {
      isMouseDown = true;
    };

    const handleMouseUp = () => {
      isMouseDown = false;
    };

    const handleMouseLeave = () => {
      isVisible = false;
      dot.style.opacity = "0";
      ring.style.opacity = "0";
    };

    const handleMouseEnter = () => {
      isVisible = true;
      dot.style.opacity = "1";
      ring.style.opacity = "1";
    };

    // Native High-Framerate RAF Loop (Supports 60Hz, 120Hz ProMotion, 144Hz)
    const render = () => {
      // Crisp 0.35 LERP factor for instant zero-lag responsiveness
      ringX += (mouseX - ringX) * 0.35;
      ringY += (mouseY - ringY) * 0.35;

      // Primary dot follows mouse instantly with zero delay
      dot.style.transform = `translate3d(${mouseX - 4}px, ${mouseY - 4}px, 0px)`;

      let scale = 1;
      let borderColor = "rgba(212, 175, 55, 0.6)";
      let bg = "rgba(212, 175, 55, 0.04)";

      if (isHovered) {
        scale = 1.65;
        borderColor = "rgba(212, 175, 55, 0.95)";
        bg = "rgba(212, 175, 55, 0.16)";
      }

      if (isMouseDown) {
        scale = isHovered ? 1.25 : 0.75;
      }

      ring.style.transform = `translate3d(${ringX - 18}px, ${ringY - 18}px, 0px) scale(${scale})`;
      ring.style.borderColor = borderColor;
      ring.style.backgroundColor = bg;

      rafId = requestAnimationFrame(render);
    };

    window.addEventListener("mousemove", handleMouseMove, { passive: true });
    window.addEventListener("mouseover", handleMouseOver, { passive: true });
    window.addEventListener("mousedown", handleMouseDown, { passive: true });
    window.addEventListener("mouseup", handleMouseUp, { passive: true });
    document.addEventListener("mouseleave", handleMouseLeave, { passive: true });
    document.addEventListener("mouseenter", handleMouseEnter, { passive: true });

    rafId = requestAnimationFrame(render);

    return () => {
      cancelAnimationFrame(rafId);
      window.removeEventListener("mousemove", handleMouseMove);
      window.removeEventListener("mouseover", handleMouseOver);
      window.removeEventListener("mousedown", handleMouseDown);
      window.removeEventListener("mouseup", handleMouseUp);
      document.removeEventListener("mouseleave", handleMouseLeave);
      document.removeEventListener("mouseenter", handleMouseEnter);
    };
  }, [enabled]);

  if (!enabled) return null;

  return (
    <>
      <style jsx global>{`
        /* Global override to cleanly hide system cursor */
        .cursor-none-active,
        .cursor-none-active * {
          cursor: none !important;
        }
      `}</style>

      {/* Primary Precision Pointer Dot */}
      <div
        ref={dotRef}
        className="fixed top-0 left-0 w-2 h-2 rounded-full bg-brass-accent shadow-[0_0_8px_rgba(212,175,55,0.8)] pointer-events-none z-[99999] opacity-0 transition-opacity duration-200 will-change-transform"
      />

      {/* Butter-smooth RAF Follower Ring */}
      <div
        ref={ringRef}
        className="fixed top-0 left-0 w-9 h-9 rounded-full border border-brass-accent/60 bg-brass-accent/[0.04] pointer-events-none z-[99998] opacity-0 transition-opacity duration-200 will-change-transform transition-colors duration-150"
      />
    </>
  );
}
