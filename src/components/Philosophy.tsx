"use client";

import { useRef, useEffect, useState } from "react";
import { useReducedMotion } from "framer-motion";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

export default function Philosophy() {
  const containerRef = useRef<HTMLDivElement>(null);
  const p1Ref = useRef<HTMLParagraphElement>(null);
  const p2Ref = useRef<HTMLParagraphElement>(null);
  const p3Ref = useRef<HTMLParagraphElement>(null);
  
  const shouldReduceMotion = useReducedMotion();
  const [hasMounted, setHasMounted] = useState(false);

  useEffect(() => {
    setHasMounted(true);
  }, []);

  // Register GSAP scroll trigger pinning
  useEffect(() => {
    if (!hasMounted || shouldReduceMotion) return;

    // Register ScrollTrigger plugin safely
    gsap.registerPlugin(ScrollTrigger);

    const container = containerRef.current;
    const p1 = p1Ref.current;
    const p2 = p2Ref.current;
    const p3 = p3Ref.current;

    if (!container || !p1 || !p2 || !p3) return;

    // Initially position p2 and p3 invisible below
    gsap.set([p2, p3], { opacity: 0, y: 20 });
    gsap.set(p1, { opacity: 1, y: 0 });

    const tl = gsap.timeline({
      scrollTrigger: {
        trigger: container,
        start: "top top",
        end: "+=150%", // Pinned scroll depth offset
        pin: true,
        pinSpacing: true, // Explicitly enforce padding-bottom offset to push next content down
        scrub: 1, // Smooth scrub tracking with lag
      },
    });

    // Animate swaps
    tl.to(p1, { opacity: 0, y: -20, pointerEvents: "none", duration: 1 })
      .to(p2, { opacity: 1, y: 0, pointerEvents: "auto", duration: 1 }, "-=0.3")
      .to(p2, { opacity: 0, y: -20, pointerEvents: "none", duration: 1, delay: 0.5 })
      .to(p3, { opacity: 1, y: 0, pointerEvents: "auto", duration: 1 }, "-=0.3");

    // Force layouts and ScrollTrigger dimensions to update
    ScrollTrigger.refresh();

    return () => {
      // Clean up triggers on unmount
      ScrollTrigger.getAll().forEach((t) => t.kill());
    };
  }, [hasMounted, shouldReduceMotion]);

  if (!hasMounted) {
    return <section className="min-h-screen bg-charcoal-base" />;
  }

  // Fallback layout: Render all paragraphs inline if reduced motion is active
  if (shouldReduceMotion) {
    return (
      <section id="philosophy" className="py-space-xxl px-6 bg-charcoal-base border-t border-hairline">
        <div className="max-w-4xl mx-auto flex flex-col gap-space-lg">
          <span className="text-caption text-brass-accent">02 / Philosophy</span>
          <div className="flex flex-col gap-space-md">
            <p className="text-display-m leading-tight text-primary-text font-display">
              Technology should never come first.
            </p>
            <p className="text-display-m leading-tight text-primary-text font-display">
              Every company is different. Every bottleneck is different.
            </p>
            <p className="text-display-m leading-tight text-primary-text font-display">
              We don't recommend AI because it's trendy. We recommend what creates measurable impact.
            </p>
          </div>
        </div>
      </section>
    );
  }

  return (
    <section
      ref={containerRef}
      id="philosophy"
      className="relative h-screen bg-charcoal-base border-t border-hairline overflow-hidden"
    >
      <div className="h-full w-full flex flex-col justify-center px-6">
        <div className="max-w-4xl mx-auto w-full relative">
          
          <span className="text-caption text-brass-accent block mb-space-md">
            02 / Philosophy
          </span>

          <div className="relative min-h-[300px] sm:min-h-[250px] flex items-center">
            {/* Statement 1 */}
            <p
              ref={p1Ref}
              className="absolute text-display-m text-primary-text leading-tight w-full font-display"
            >
              Technology should never come first.
            </p>

            {/* Statement 2 */}
            <p
              ref={p2Ref}
              className="absolute text-display-m text-primary-text leading-tight w-full font-display opacity-0 pointer-events-none"
            >
              Every company is different. Every bottleneck is different.
            </p>

            {/* Statement 3 */}
            <p
              ref={p3Ref}
              className="absolute text-display-m text-primary-text leading-tight w-full font-display opacity-0 pointer-events-none"
            >
              We don't recommend AI because it's trendy. <br />
              We recommend what <span className="text-brass-accent italic font-semibold">creates measurable impact.</span>
            </p>
          </div>

        </div>
      </div>
    </section>
  );
}
