"use client";

import { motion, useScroll, useTransform } from "framer-motion";
import Link from "next/link";
import Image from "next/image";
import RevealSquircle from "./RevealSquircle";
import MagneticButton from "./MagneticButton";

export default function Hero() {
  const { scrollY } = useScroll();
  const yParallax = useTransform(scrollY, [0, 800], [0, -120]);

  // Smooth scroll helper
  const handleScrollToWork = (e: React.MouseEvent<HTMLAnchorElement>) => {
    e.preventDefault();
    const element = document.getElementById("work");
    if (element) {
      element.scrollIntoView({ behavior: "smooth" });
    }
  };

  return (
    <section className="relative min-h-screen flex items-center justify-center py-32 overflow-hidden bg-charcoal-base">
      
      {/* Animated Floating Gradient Orbs (Calm, Futuristic) */}
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
          className="absolute top-1/4 left-1/4 w-[350px] sm:w-[500px] h-[350px] sm:h-[500px] bg-blue-200/20 rounded-full blur-[80px] sm:blur-[120px]"
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
          className="absolute bottom-1/4 right-1/4 w-[350px] sm:w-[500px] h-[350px] sm:h-[500px] bg-red-200/20 rounded-full blur-[80px] sm:blur-[120px]"
        />
        
        {/* Lavender Center Glow */}
        <div className="absolute top-1/3 left-1/2 -translate-x-1/2 w-[400px] h-[400px] bg-indigo-100/15 rounded-full blur-[100px]" />
      </div>

      {/* Grid Overlay */}
      <div className="absolute inset-0 z-0 pointer-events-none opacity-20">
        <div 
          className="absolute inset-0"
          style={{
            backgroundImage: `
              linear-gradient(to right, rgba(15, 23, 42, 0.04) 1px, transparent 1px),
              linear-gradient(to bottom, rgba(15, 23, 42, 0.04) 1px, transparent 1px)
            `,
            backgroundSize: "80px 80px"
          }}
        />
      </div>

      <div className="max-w-7xl mx-auto px-6 md:px-12 w-full grid grid-cols-1 lg:grid-cols-12 gap-16 items-center relative z-10">
        
        {/* Left Side: Content block */}
        <div className="lg:col-span-7 flex flex-col gap-6 items-start">
          <RevealSquircle delay={0.2}>
            <span className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full border border-white/60 bg-white/45 text-micro font-mono text-primary-text backdrop-blur-md shadow-sm">
              <span className="w-1.5 h-1.5 rounded-full bg-blue-400 animate-pulse" />
              Sayaga Studios &bull; Now Booking Q3/Q4
            </span>
          </RevealSquircle>

          {/* Headline reveals */}
          <div className="flex flex-col mt-2 max-w-2xl">
            <div className="overflow-hidden py-1">
              <motion.h1
                initial={{ y: "100%" }}
                animate={{ y: 0 }}
                transition={{ duration: 0.85, ease: [0.22, 1, 0.36, 1], delay: 0.3 }}
                className="text-[2.75rem] sm:text-[4rem] lg:text-[4.75rem] font-bold tracking-tight text-primary-text leading-[1.05]"
              >
                We build digital
              </motion.h1>
            </div>
            <div className="overflow-hidden py-1">
              <motion.h1
                initial={{ y: "100%" }}
                animate={{ y: 0 }}
                transition={{ duration: 0.85, ease: [0.22, 1, 0.36, 1], delay: 0.45 }}
                className="text-[2.75rem] sm:text-[4rem] lg:text-[4.75rem] font-bold tracking-tight text-primary-text leading-[1.05]"
              >
                products that
              </motion.h1>
            </div>
            <div className="overflow-hidden py-1">
              <motion.h1
                initial={{ y: "100%" }}
                animate={{ y: 0 }}
                transition={{ duration: 0.85, ease: [0.22, 1, 0.36, 1], delay: 0.6 }}
                className="text-[2.75rem] sm:text-[4rem] lg:text-[4.75rem] font-bold tracking-tight text-primary-text leading-[1.05]"
              >
                <span className="bg-gradient-to-r from-blue-500 via-purple-400 to-red-400 bg-clip-text text-transparent">define categories.</span>
              </motion.h1>
            </div>
          </div>

          {/* Value Proposition */}
          <RevealSquircle delay={0.75}>
            <p className="text-body-l text-muted-text max-w-xl leading-relaxed">
              An award-winning systems & product engineering studio crafting secure software, AI platforms, and bespoke interfaces. We study businesses before we write a single line of code.
            </p>
          </RevealSquircle>

          {/* Action CTAs */}
          <RevealSquircle delay={0.9} className="mt-4 flex flex-wrap gap-4 items-center">
            <MagneticButton>
              <Link
                href="/scoping"
                className="inline-flex items-center gap-2 text-[0.85rem] font-bold text-white bg-primary-text hover:bg-white hover:text-primary-text hover:border-white/80 hover:shadow-lg transition-all duration-300 py-3 px-8 rounded-full shadow-md"
              >
                Start a Project &rarr;
              </Link>
            </MagneticButton>

            <MagneticButton>
              <a
                href="#work"
                onClick={handleScrollToWork}
                className="inline-flex items-center justify-center text-[0.85rem] font-bold text-primary-text hover:text-muted-text transition-all duration-300 py-3 px-8 rounded-full border border-white/60 bg-white/40 backdrop-blur-md shadow-sm"
              >
                View Work
              </a>
            </MagneticButton>
          </RevealSquircle>
        </div>

        {/* Right Side: Graphic Visual (Frosted glass with light gradients) */}
        <div className="lg:col-span-5 flex justify-center items-center relative h-[320px] lg:h-[500px]">
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 1.2, ease: [0.22, 1, 0.36, 1], delay: 0.6 }}
            className="w-full h-full flex items-center justify-center"
          >
            <motion.div
              style={{ y: yParallax }}
              className="w-[280px] h-[280px] lg:w-[400px] lg:h-[400px] bg-white/35 backdrop-blur-2xl border border-white/60 rounded-[2.5rem] flex items-center justify-center relative overflow-hidden shadow-xl shadow-blue-100/20"
            >
              {/* Soft gradient backgrounds blending naturally */}
              <div className="absolute inset-0 bg-gradient-to-tr from-blue-50/30 via-white/20 to-red-50/30 z-0" />

              {/* Minimal vector dials and grid circles */}
              <motion.div
                animate={{ rotate: 360 }}
                transition={{ duration: 100, ease: "linear", repeat: Infinity }}
                className="absolute inset-10 border border-dashed border-blue-200/50 rounded-full flex items-center justify-center z-10"
              >
                <div className="w-[120px] h-[120px] lg:w-[200px] lg:h-[200px] border border-red-200/40 rounded-full flex items-center justify-center relative">
                  {/* Floating micro glass orb */}
                  <div className="absolute top-0 w-6 h-6 rounded-full bg-white/60 border border-white/80 shadow-sm flex items-center justify-center">
                    <div className="w-1.5 h-1.5 bg-blue-400 rounded-full" />
                  </div>
                </div>
              </motion.div>

              <div className="absolute bottom-6 left-6 right-6 text-center z-10 pointer-events-none">
                <span className="text-micro text-muted-text tracking-widest font-mono font-semibold">
                  [ EST. 2026 / SAYAGA ]
                </span>
              </div>
            </motion.div>
          </motion.div>
        </div>

      </div>

      {/* Explore indicator */}
      <div className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 pointer-events-none select-none opacity-40">
        <span className="text-micro font-mono tracking-widest text-muted-text font-semibold">EXPLORE</span>
        <div className="w-[1px] h-8 bg-hairline relative overflow-hidden">
          <motion.div
            animate={{ y: ["-100%", "100%"] }}
            transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
            className="absolute top-0 left-0 w-full h-1/2 bg-blue-400"
          />
        </div>
      </div>
    </section>
  );
}
