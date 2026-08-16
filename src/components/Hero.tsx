"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import Link from "next/link";
import HeroVisual from "./HeroVisual";

export default function Hero() {
  const [activeState, setActiveState] = useState(0);

  const statesList = [
    { num: "01", name: "CHAOS" },
    { num: "02", name: "FRICTION" },
    { num: "03", name: "SYSTEM" },
    { num: "04", name: "AUTOMATION" },
    { num: "05", name: "CONTROL" }
  ];

  return (
    <section className="relative min-h-screen py-24 px-6 md:px-12 flex flex-col justify-center bg-transparent overflow-hidden">
      
      {/* Background gradients and grid patterns */}
      <div className="absolute inset-0 z-0 w-full h-full overflow-hidden pointer-events-none">
        {/* Soft aurora gradient blobs for luxury backdrop */}
        <div className="absolute top-1/4 left-1/4 w-[350px] h-[350px] bg-blue-200/10 rounded-full blur-[100px] pointer-events-none" />
        <div className="absolute bottom-1/4 right-1/4 w-[400px] h-[400px] bg-purple-100/10 rounded-full blur-[120px] pointer-events-none" />
        
        {/* Subtle grid overlay */}
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

      <div className="max-w-7xl mx-auto w-full grid grid-cols-1 lg:grid-cols-12 gap-12 items-center relative z-10 mt-12 md:mt-0">
        
        {/* Left Column: Editorial Typography and CTAs */}
        <div className="lg:col-span-7 flex flex-col items-start text-left">
          
          {/* Eyebrow */}
          <div className="overflow-hidden mb-6">
            <motion.div
              initial={{ y: "100%" }}
              animate={{ y: 0 }}
              transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
              className="inline-flex flex-col items-start"
            >
              <span className="text-micro font-mono tracking-widest text-brass-accent font-bold uppercase leading-snug">
                NOW BOOKING
              </span>
              <span className="text-micro font-mono tracking-widest text-muted-text font-bold uppercase leading-none mt-1">
                STRATEGY & OPERATIONS AUDITS
              </span>
            </motion.div>
          </div>

          {/* Main Headline - dominant visual element */}
          <h1 className="text-primary-text font-bold tracking-tighter leading-[0.92] font-display flex flex-col mb-8 select-none">
            <div className="overflow-hidden py-1">
              <motion.span
                initial={{ y: "100%" }}
                animate={{ y: 0 }}
                transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1], delay: 0.1 }}
                className="block clamp-headline"
              >
                YOUR BUSINESS
              </motion.span>
            </div>
            <div className="overflow-hidden py-1">
              <motion.span
                initial={{ y: "100%" }}
                animate={{ y: 0 }}
                transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1], delay: 0.2 }}
                className="block clamp-headline"
              >
                HAS A SYSTEM
              </motion.span>
            </div>
            <div className="overflow-hidden py-1">
              <motion.span
                initial={{ y: "100%" }}
                animate={{ y: 0 }}
                transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1], delay: 0.3 }}
                className="block clamp-headline text-brass-accent"
              >
                PROBLEM.
              </motion.span>
            </div>
          </h1>

          {/* Supporting Copy */}
          <motion.p
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1], delay: 0.45 }}
            className="text-body-l text-muted-text font-semibold max-w-xl leading-relaxed mb-10"
          >
            We find the operational bottlenecks hiding inside your workflows, then design and build the systems that remove them.
          </motion.p>

          {/* CTAs */}
          <motion.div
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1], delay: 0.55 }}
            className="flex flex-wrap items-center gap-6 mb-12"
          >
            {/* Primary CTA */}
            <Link
              href="/scoping?type=audit"
              className="group inline-flex items-center justify-center text-body-base font-bold text-white bg-primary-text hover:bg-brass-accent border border-primary-text hover:border-brass-accent transition-all duration-300 py-4 px-8 rounded-xl shadow-md hover:shadow-lg transform active:scale-98"
            >
              START A STRATEGY AUDIT
              <span className="ml-2 transform group-hover:translate-x-1.5 transition-transform duration-300">→</span>
            </Link>

            {/* Secondary CTA */}
            <Link
              href="/approach"
              className="group inline-flex items-center justify-center text-body-base font-bold text-primary-text hover:text-brass-accent border-b border-primary-text/25 hover:border-brass-accent transition-all duration-300 py-2 px-1"
            >
              SEE HOW WE WORK
              <span className="ml-2 transform group-hover:translate-x-1 transition-transform duration-300">→</span>
            </Link>
          </motion.div>

          {/* Micro-metadata Process Indicator */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.8, delay: 0.7 }}
            className="text-micro font-mono text-muted-text/75 tracking-wider border-t border-hairline/65 pt-6 w-full max-w-md hidden sm:block"
          >
            RESEARCH &rarr; ARCHITECTURE &rarr; BUILD &rarr; OPTIMIZE
          </motion.div>

        </div>

        {/* Right Column: WebGL Interactive Visual */}
        <div className="lg:col-span-5 flex flex-col items-center justify-center relative w-full h-full min-h-[350px] sm:min-h-[450px] md:min-h-[550px] lg:min-h-[650px] border border-hairline/25 bg-secondary-surface/10 rounded-[2.5rem] shadow-sm backdrop-blur-[2px]">
          
          {/* Canvas Wrapper */}
          <div className="absolute inset-0 w-full h-full">
            <HeroVisual activeState={activeState} setActiveState={setActiveState} />
          </div>

          {/* Abstract background labels to enhance the technology-studio blueprint styling */}
          <div className="absolute top-6 left-8 text-micro font-mono text-muted-text/30 pointer-events-none select-none uppercase">
            Sayagaa Labs // Shader v8.19
          </div>
          <div className="absolute bottom-6 right-8 text-micro font-mono text-muted-text/30 pointer-events-none select-none uppercase">
            Drag to warp / Swipe states
          </div>

          {/* Floating State Indicators (Tabs overlay) */}
          <div className="absolute bottom-6 left-1/2 -translate-x-1/2 flex items-center gap-1.5 bg-white/70 backdrop-blur-md border border-hairline/50 py-1.5 px-2 rounded-full shadow-md z-20">
            {statesList.map((state, idx) => (
              <button
                key={state.name}
                onClick={() => setActiveState(idx)}
                className={`text-[0.62rem] font-mono font-bold py-1 px-3 rounded-full transition-all duration-300 cursor-pointer ${
                  activeState === idx 
                    ? "bg-primary-text text-white shadow-sm" 
                    : "text-muted-text hover:text-primary-text hover:bg-slate-100"
                }`}
              >
                {state.num} {state.name}
              </button>
            ))}
          </div>

        </div>

      </div>

      {/* Explore / Scroll Indicator at center bottom */}
      <div className="absolute bottom-4 left-1/2 -translate-x-1/2 flex flex-col items-center gap-1.5 pointer-events-none select-none opacity-40 hidden lg:flex">
        <span className="text-micro font-mono tracking-widest text-brass-accent font-bold">DRAG OR SCROLL</span>
        <div className="w-[1px] h-6 bg-hairline relative overflow-hidden">
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
