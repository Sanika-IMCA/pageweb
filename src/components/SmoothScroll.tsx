"use client";

import { useEffect } from "react";
import Lenis from "lenis";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

export default function SmoothScroll({ children }: { children: React.ReactNode }) {
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

    // Coordinate GSAP ticker animation loop with Lenis
    const tickerUpdate = (time: number) => {
      lenis.raf(time * 1000);
    };

    gsap.ticker.add(tickerUpdate);
    gsap.ticker.lagSmoothing(0);

    // Refresh ScrollTrigger settings once layout stabilizes
    ScrollTrigger.refresh();

    return () => {
      lenis.destroy();
      gsap.ticker.remove(tickerUpdate);
    };
  }, []);

  return <>{children}</>;
}
