"use client";

import { motion, useScroll, useTransform } from "framer-motion";
import Link from "next/link";
import Image from "next/image";
import RevealSquircle from "./RevealSquircle";
import MagneticButton from "./MagneticButton";

export default function Hero() {
  // Capture scroll coordinates for parallax drift
  const { scrollY } = useScroll();
  
  // Parallax transform: drift the visual shape slower than scroll rate
  const yParallax = useTransform(scrollY, [0, 800], [0, -120]);

  return (
    <section className="relative min-h-screen flex items-center justify-between py-space-xl overflow-hidden bg-charcoal-base">
      
      {/* Background Animated Paths */}
      <div className="absolute inset-0 z-0 pointer-events-none opacity-20">
        <svg viewBox="0 0 1000 600" className="w-full h-full object-cover">
          <motion.path
            d="M -100 150 C 200 80, 400 400, 700 250 C 900 150, 1100 350, 1200 300"
            fill="none"
            stroke="var(--color-brass-accent)"
            strokeWidth="0.8"
            initial={{ pathLength: 0 }}
            animate={{ pathLength: 1 }}
            transition={{ duration: 3, ease: "easeInOut", delay: 1.8 }}
          />
          <motion.path
            d="M 50 450 C 300 300, 500 500, 850 300"
            fill="none"
            stroke="var(--color-brass-accent)"
            strokeWidth="0.5"
            strokeDasharray="4 8"
            initial={{ pathLength: 0 }}
            animate={{ pathLength: 1 }}
            transition={{ duration: 4, ease: "easeInOut", delay: 2.0 }}
          />
        </svg>
      </div>

      <div className="max-w-7xl mx-auto px-6 w-full grid grid-cols-1 lg:grid-cols-12 gap-space-xl items-center relative z-10">
        
        {/* Left Side: Content block */}
        <div className="lg:col-span-7 flex flex-col gap-space-sm">
          <RevealSquircle delay={1.9} className="inline-block">
            <span className="text-caption text-brass-accent font-medium">
              Business Systems & AI Engineering
            </span>
          </RevealSquircle>

          {/* Headline reveals via per-line overflow hidden translation clips (no opacity fades) */}
          <div className="flex flex-col mt-2">
            <div className="overflow-hidden py-1">
              <motion.h1
                initial={{ y: "100%" }}
                animate={{ y: 0 }}
                transition={{ duration: 0.85, ease: [0.22, 1, 0.36, 1], delay: 2.0 }}
                className="text-display-xl tracking-tight text-primary-text leading-[1.05]"
              >
                We study businesses
              </motion.h1>
            </div>
            <div className="overflow-hidden py-1">
              <motion.h1
                initial={{ y: "100%" }}
                animate={{ y: 0 }}
                transition={{ duration: 0.85, ease: [0.22, 1, 0.36, 1], delay: 2.15 }}
                className="text-display-xl tracking-tight text-primary-text leading-[1.05]"
              >
                before we <span className="text-brass-accent font-semibold italic">build software.</span>
              </motion.h1>
            </div>
          </div>

          <RevealSquircle delay={2.3}>
            <p className="text-body-l text-muted-text max-w-xl mt-space-xs">
              We don't sell AI. We don't sell websites. We solve operational problems. 
              Quiet confidence, editorial restraint, and precision software systems engineered to scale.
            </p>
          </RevealSquircle>

          <RevealSquircle delay={2.45} className="mt-space-md inline-block">
            <MagneticButton>
              <Link
                href="/scoping"
                className="group inline-flex items-center gap-2 text-caption text-primary-text hover:text-brass-accent transition-colors py-2.5 px-6 border border-hairline rounded bg-secondary-surface relative overflow-hidden"
              >
                {/* Wipe background fill left-to-right on hover */}
                <div className="absolute inset-0 bg-brass-accent scale-x-0 group-hover:scale-x-100 origin-left transition-transform duration-300 z-0" />
                
                <span className="relative z-10 group-hover:text-charcoal-base transition-colors font-medium">Start a Conversation</span>
                <span className="relative z-10 group-hover:text-charcoal-base group-hover:translate-x-1.5 transition-all duration-300 font-medium">&rarr;</span>
              </Link>
            </MagneticButton>
          </RevealSquircle>
        </div>

        {/* Right Side: Signature visual shape with clip-path mask reveal & parallax */}
        <div className="lg:col-span-5 flex justify-center items-center relative h-[320px] lg:h-[500px]">
          <motion.div
            initial={{ clipPath: "inset(0% 100% 0% 0%)" }}
            animate={{ clipPath: "inset(0% 0% 0% 0%)" }}
            transition={{ duration: 1.2, ease: [0.22, 1, 0.36, 1], delay: 2.1 }}
            className="w-full h-full flex items-center justify-center"
          >
            <motion.div
              style={{ y: yParallax }}
              className="w-[280px] h-[280px] lg:w-[400px] lg:h-[400px] bg-secondary-surface border border-hairline rounded-full flex items-center justify-center relative overflow-hidden"
            >
              {/* Sleek layered waves background image */}
              <Image
                src="/assets/wave-bg.png"
                alt="Sleek layered waves background pattern representing operational business flows."
                fill
                sizes="(max-w-768px) 280px, 400px"
                className="object-cover opacity-35"
              />

              {/* Abstract layout structure grid */}
              <motion.div
                animate={{ rotate: 360 }}
                transition={{ duration: 60, ease: "linear", repeat: Infinity }}
                className="absolute inset-space-md border border-dashed border-hairline rounded-full"
              >
                {/* Vertically centered line */}
                <div className="absolute top-0 bottom-0 left-1/2 w-[1px] -translate-x-1/2 bg-hairline" />
                
                {/* Horizontally centered line */}
                <div className="absolute left-0 right-0 top-1/2 h-[1px] -translate-y-1/2 bg-hairline" />
                
                {/* Centered inner circle and pulse dot */}
                <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[120px] h-[120px] lg:w-[180px] lg:h-[180px] border border-brass-accent/30 rounded-full flex items-center justify-center">
                  <div className="w-4 h-4 bg-brass-accent/80 rounded-full animate-pulse" />
                </div>
              </motion.div>

              <div className="absolute bottom-space-md left-space-md right-space-md text-center pointer-events-none">
                <span className="text-micro text-brass-accent tracking-widest font-mono">
                  [ System.Boot_Success ]
                </span>
              </div>
            </motion.div>
          </motion.div>
        </div>

      </div>

      {/* Small micro scroll-ticking indicator */}
      <div className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 pointer-events-none select-none opacity-40">
        <span className="text-micro font-mono tracking-widest text-muted-text">SCROLL</span>
        <div className="w-[1px] h-8 bg-hairline relative overflow-hidden">
          <motion.div
            animate={{ y: ["-100%", "100%"] }}
            transition={{ duration: 1.8, repeat: Infinity, ease: "easeInOut" }}
            className="absolute top-0 left-0 w-full h-1/2 bg-brass-accent"
          />
        </div>
      </div>
    </section>
  );
}
