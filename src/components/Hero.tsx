"use client";

import { motion, useScroll, useTransform } from "framer-motion";
import Link from "next/link";
import RevealSquircle from "./RevealSquircle";
import MagneticButton from "./MagneticButton";

export default function Hero() {
  const { scrollY } = useScroll();
  const yParallax = useTransform(scrollY, [0, 800], [0, -120]);

  return (
    <section className="relative min-h-screen flex items-center justify-center py-32 overflow-hidden bg-charcoal-base">
      
      {/* Animated Floating Gradient Orbs (Calm, Futuristic, desaturated) */}
      <div className="absolute inset-0 z-0 pointer-events-none overflow-hidden">
        {/* Soft Blue Orb */}
        <motion.div
          animate={{
            x: [-100, 100, -100],
            y: [-50, 80, -50],
          }}
          transition={{
            duration: 25,
            repeat: Infinity,
            ease: "easeInOut",
          }}
          className="absolute top-1/4 left-1/4 w-[350px] sm:w-[500px] h-[350px] sm:h-[500px] bg-blue-100/10 rounded-full blur-[80px] sm:blur-[120px]"
        />

        {/* Blush Red Orb */}
        <motion.div
          animate={{
            x: [100, -100, 100],
            y: [80, -50, 80],
          }}
          transition={{
            duration: 28,
            repeat: Infinity,
            ease: "easeInOut",
          }}
          className="absolute bottom-1/4 right-1/4 w-[350px] sm:w-[500px] h-[350px] sm:h-[500px] bg-red-100/10 rounded-full blur-[80px] sm:blur-[120px]"
        />
      </div>

      {/* Grid Overlay */}
      <div className="absolute inset-0 z-0 pointer-events-none opacity-20">
        <div 
          className="absolute inset-0"
          style={{
            backgroundImage: `
              linear-gradient(to right, rgba(46, 91, 148, 0.05) 1px, transparent 1px),
              linear-gradient(to bottom, rgba(46, 91, 148, 0.05) 1px, transparent 1px)
            `,
            backgroundSize: "80px 80px"
          }}
        />
      </div>

      <div className="max-w-7xl mx-auto px-6 md:px-12 w-full grid grid-cols-1 lg:grid-cols-12 gap-16 items-center relative z-10">
        
        {/* Left Side: Content block */}
        <div className="lg:col-span-8 flex flex-col gap-6 items-start">
          <RevealSquircle delay={0.2}>
            <span className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full border border-hairline bg-accent-blue-light/30 text-micro font-mono text-brass-accent backdrop-blur-md shadow-sm font-bold">
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
                className="text-[2.5rem] sm:text-[3.75rem] lg:text-[4.5rem] font-bold tracking-tight text-primary-text leading-[1.1] font-display"
              >
                Deep research + smart builds
              </motion.h1>
            </div>
            <div className="overflow-hidden py-1">
              <motion.h1
                initial={{ y: "100%" }}
                animate={{ y: 0 }}
                transition={{ duration: 0.85, ease: [0.22, 1, 0.36, 1], delay: 0.45 }}
                className="text-[2.5rem] sm:text-[3.75rem] lg:text-[4.5rem] font-bold tracking-tight text-primary-text leading-[1.1] font-display"
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

        {/* Right Side: Graphic Visual (Frosted glass with desaturated accents) */}
        <div className="lg:col-span-4 flex justify-center items-center relative h-[300px] lg:h-[450px]">
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 1.2, ease: [0.22, 1, 0.36, 1], delay: 0.6 }}
            className="w-full h-full flex items-center justify-center"
          >
            <motion.div
              style={{ y: yParallax }}
              className="w-[260px] h-[260px] lg:w-[350px] lg:h-[350px] bg-secondary-surface border border-white/70 rounded-[2.5rem] flex items-center justify-center relative overflow-hidden shadow-sm"
            >
              <div className="absolute inset-0 bg-gradient-to-tr from-accent-blue-light/10 via-white/5 to-accent-red-light/10 z-0" />

              {/* Minimal vector process circle mapping */}
              <motion.div
                animate={{ rotate: -360 }}
                transition={{ duration: 120, ease: "linear", repeat: Infinity }}
                className="absolute inset-8 border border-dashed border-brass-accent/25 rounded-full flex items-center justify-center z-10"
              >
                <div className="w-[100px] h-[100px] lg:w-[180px] lg:h-[180px] border border-brass-accent/15 rounded-full flex items-center justify-center relative">
                  {/* Floating micro indicators (Soft red accent and main blue) */}
                  <div className="absolute -top-3 w-6 h-6 rounded-full bg-white/80 border border-brass-accent/20 shadow-sm flex items-center justify-center">
                    {/* Accent Red Glowing Node */}
                    <div className="w-1.5 h-1.5 bg-accent-red rounded-full shadow-[0_0_8px_rgba(229,147,147,0.9)]" />
                  </div>
                  <div className="absolute -bottom-3 w-6 h-6 rounded-full bg-white/80 border border-brass-accent/20 shadow-sm flex items-center justify-center">
                    <div className="w-1.5 h-1.5 bg-brass-accent rounded-full" />
                  </div>
                </div>
              </motion.div>

              <div className="absolute bottom-6 left-6 right-6 text-center z-10 pointer-events-none">
                <span className="text-micro text-muted-text tracking-widest font-mono font-bold">
                  [ RESEARCH &bull; DIAGNOSIS &bull; BUILD ]
                </span>
              </div>
            </motion.div>
          </motion.div>
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
