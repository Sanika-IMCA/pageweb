"use client";

import { useEffect } from "react";
import { usePathname } from "next/navigation";
import Lenis from "lenis";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

export default function SmoothScroll({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();

  // 1. Initialize Lenis scroll runner once on mount
  useEffect(() => {
    // Disable smooth scroll if user prefers reduced motion
    const prefersReduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (prefersReduced) return;

    // Safely register ScrollTrigger plugin
    gsap.registerPlugin(ScrollTrigger);

    const lenis = new Lenis({
      duration: 1.2,
      easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
      orientation: "vertical",
      gestureOrientation: "vertical",
      smoothWheel: true,
    });

    // Link scroll coordinates updates to ScrollTrigger
    lenis.on("scroll", () => {
      ScrollTrigger.update();
    });

    let isDestroyed = false;

    // Coordinate GSAP ticker animation loop with Lenis
    const tickerUpdate = (time: number) => {
      if (isDestroyed) return;
      lenis.raf(time * 1000);
    };

    gsap.ticker.add(tickerUpdate);

    // Refresh sizing on initial render
    const timer = setTimeout(() => {
      if (isDestroyed) return;
      lenis.resize();
      ScrollTrigger.refresh();
    }, 150);

    // Keep global lenis instance accessible if needed by window elements
    (window as unknown as { lenisInstance: Lenis }).lenisInstance = lenis;

    return () => {
      isDestroyed = true;
      lenis.destroy();
      gsap.ticker.remove(tickerUpdate);
      clearTimeout(timer);
      delete (window as unknown as { lenisInstance?: Lenis }).lenisInstance;
    };
  }, []);

  // 2. Refresh layouts and trigger resize calculations on page navigations
  useEffect(() => {
    const lenis = (window as unknown as { lenisInstance?: Lenis }).lenisInstance;
    
    const timer = setTimeout(() => {
      if (lenis) {
        lenis.resize();
      }
      ScrollTrigger.refresh();
    }, 200);

    return () => clearTimeout(timer);
  }, [pathname]);

  return <>{children}</>;
}
