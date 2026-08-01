"use client";

import { motion, useScroll, useTransform } from "framer-motion";
import Link from "next/link";
import Image from "next/image";
import RevealSquircle from "./RevealSquircle";
import MagneticButton from "./MagneticButton";

export default function Hero() {
  const { scrollY } = useScroll();
  const yParallax = useTransform(scrollY, [0, 1000], [0, -80]);
  const scaleParallax = useTransform(scrollY, [0, 1000], [1.02, 1.10]);

  return (
    <section className="relative min-h-screen flex items-center justify-center py-32 overflow-hidden bg-transparent">
      
      {/* Background Image with subtle scroll scale and parallax translate */}
      <div className="absolute inset-0 z-0 w-full h-full overflow-hidden pointer-events-none">
        <motion.div 
          style={{ scale: scaleParallax, y: yParallax }} 
          className="absolute inset-0 w-full h-full"
        >
          <Image
            src="/assets/research-building.png"
            alt="Sayagaa research and building workbench flatlay background"
            fill
            priority
            className="object-cover object-center opacity-95 contrast-[1.02] brightness-100"
          />
        </motion.div>

        {/* Warm Luxury Gradient Overlays for integration & contrast */}
        {/* Bottom fade-out gradient to blend into bg-charcoal-base */}
        <div className="absolute inset-0 bg-gradient-to-t from-charcoal-base via-charcoal-base/30 to-transparent z-10" />
        {/* Top fade-out so navigation stands out */}
        <div className="absolute inset-0 bg-gradient-to-b from-charcoal-base/40 via-transparent to-transparent z-10" />
        
        {/* Subtle grid overlay blended on top of background image */}
        <div 
          className="absolute inset-0 opacity-10 mix-blend-overlay z-10"
          style={{
            backgroundImage: `
              linear-gradient(to right, rgba(46, 91, 148, 0.08) 1px, transparent 1px),
              linear-gradient(to bottom, rgba(46, 91, 148, 0.08) 1px, transparent 1px)
            `,
            backgroundSize: "80px 80px"
          }}
        />
      </div>

      <div className="max-w-7xl mx-auto px-6 md:px-12 w-full flex flex-col gap-6 items-start relative z-10">
        
        {/* Glassmorphic floating panel for readability and premium contrast */}
        <div className="flex flex-col gap-6 items-start max-w-3xl bg-charcoal-base/70 backdrop-blur-xl border border-brass-accent/25 p-8 md:p-12 rounded-[2.5rem] shadow-[0_30px_70px_rgba(0,0,0,0.6)]">
          <RevealSquircle delay={0.2}>
            <span className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full border border-brass-accent/20 bg-accent-blue-light/20 text-micro font-mono text-brass-accent shadow-sm font-bold">
              <span className="w-1.5 h-1.5 rounded-full bg-brass-accent animate-pulse" />
              Now Booking Strategy Audits for Q3/Q4
            </span>
          </RevealSquircle>

          {/* Headline reveals */}
          <div className="flex flex-col mt-2 max-w-3xl">
            <div className="overflow-hidden py-1">
              <motion.h1
                initial={{ y: "100%" }}
                animate={{ y: 0 }}
                transition={{ duration: 0.85, ease: [0.22, 1, 0.36, 1], delay: 0.3 }}
                className="text-[2.5rem] sm:text-[3.5rem] lg:text-[4.25rem] font-bold tracking-tight text-[#262626] leading-[1.1] font-display"
              >
                Deep research + smart builds
              </motion.h1>
            </div>
            <div className="overflow-hidden py-1">
              <motion.h1
                initial={{ y: "100%" }}
                animate={{ y: 0 }}
                transition={{ duration: 0.85, ease: [0.22, 1, 0.36, 1], delay: 0.45 }}
                className="text-[2.5rem] sm:text-[3.5rem] lg:text-[4.25rem] font-bold tracking-tight text-[#262626] leading-[1.1] font-display"
              >
                for <span className="text-brass-accent">ops-heavy businesses.</span>
              </motion.h1>
            </div>
          </div>

          {/* Value Proposition */}
          <RevealSquircle delay={0.65}>
            <div className="flex flex-col gap-4 max-w-2xl">
              <p className="text-body-l text-primary-text font-medium leading-relaxed">
                We diagnose where your business leaks time and money, then design lightweight software and automation that actually fits your workflow.
              </p>
              <p className="text-body-base text-muted-text leading-relaxed">
                Built specifically for founders and operators in the US, UK, EU, UAE, Singapore, Canada, and Australia who want fewer manual headaches and more predictable operations.
              </p>
            </div>
          </RevealSquircle>

          {/* Action CTAs */}
          <RevealSquircle delay={0.8} className="mt-4 flex flex-wrap gap-4 items-center">
            <MagneticButton>
              <Link
                href="/scoping"
                className="btn-premium-gradient inline-flex items-center gap-2 text-[0.85rem] font-bold py-3.5 px-8 rounded-full shadow-sm"
              >
                Request a Strategy Audit &rarr;
              </Link>
            </MagneticButton>

            <MagneticButton>
              <Link
                href="/approach"
                className="inline-flex items-center justify-center text-[0.85rem] font-bold text-brass-accent hover:text-primary-text transition-all duration-300 py-3.5 px-8 rounded-full border border-hairline bg-white/45 backdrop-blur-md shadow-sm"
              >
                See how our process works
              </Link>
            </MagneticButton>
          </RevealSquircle>
        </div>

      </div>

      {/* Explore indicator */}
      <div className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 pointer-events-none select-none opacity-40">
        <span className="text-micro font-mono tracking-widest text-brass-accent font-bold">EXPLORE</span>
        <div className="w-[1px] h-8 bg-hairline relative overflow-hidden">
          <motion.div
            animate={{ y: ["-100%", "100%"] }}
            transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
            className="absolute top-0 left-0 w-full h-1/2 bg-brass-accent"
          />
        </div>
      </div>
    </section>
  );
}
