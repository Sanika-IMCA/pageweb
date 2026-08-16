"use client";

import { useEffect } from "react";
import { usePathname } from "next/navigation";
import Lenis from "lenis";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

export default function SmoothScroll({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();

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

    // Refresh ScrollTrigger and Lenis sizing after dynamic render delays
    const timer = setTimeout(() => {
      if (isDestroyed) return;
      lenis.resize();
      ScrollTrigger.refresh();
    }, 150);

    return () => {
      isDestroyed = true;
      lenis.destroy();
      gsap.ticker.remove(tickerUpdate);
      clearTimeout(timer);
    };
  }, [pathname]);

  return <>{children}</>;
}
