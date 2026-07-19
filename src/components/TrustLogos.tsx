"use client";

import { motion } from "framer-motion";
import { useState } from "react";

const trustLogos = [
  "STRIPE",
  "LINEAR",
  "SUPABASE",
  "VERCEL",
  "MAKE",
  "RETOOL",
  "NOTION",
  "SLACK",
];

export default function TrustLogos() {
  const [isPaused, setIsPaused] = useState(false);
  const doubleList = [...trustLogos, ...trustLogos];

  return (
    <section className="py-24 bg-charcoal-base border-t border-hairline relative">
      <div className="max-w-7xl mx-auto px-6 md:px-12 flex flex-col gap-12">
        
        {/* Top: Authority & Region Metadata */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 items-start border-b border-hairline/60 pb-12">
          
          {/* Column 1: Regions */}
          <div className="flex flex-col gap-2">
            <span className="text-[0.75rem] font-mono text-blue-600 uppercase tracking-wider font-bold">
              GLOBAL FOOTPRINT
            </span>
            <p className="text-body-base text-primary-text font-semibold">
              Serving operators in US, UK, EU, UAE, Singapore, Canada, and Australia.
            </p>
          </div>

          {/* Column 2: Stat */}
          <div className="flex flex-col gap-2">
            <span className="text-[0.75rem] font-mono text-red-500 uppercase tracking-wider font-bold">
              BUILD IMPACT
            </span>
            <p className="text-body-base text-primary-text font-semibold">
              Average 30–50% reduction in manual operations time from first build phase.
            </p>
          </div>

          {/* Column 3: Mandate */}
          <div className="flex flex-col gap-2">
            <span className="text-[0.75rem] font-mono text-purple-600 uppercase tracking-wider font-bold">
              RESEARCH MANDATE
            </span>
            <p className="text-body-base text-primary-text font-semibold">
              We start every engagement with a research sprint — absolutely no blind builds.
            </p>
          </div>

        </div>

        {/* Bottom: Tool Stack & Partner Logos */}
        <div className="flex flex-col gap-4">
          <span className="text-micro font-mono text-muted-text uppercase tracking-widest block font-bold text-center opacity-65">
            SUPPORTED INTEGRATIONS & TOOLSTACKS
          </span>

          {/* Marquee Container */}
          <div
            className="w-full flex whitespace-nowrap py-6 border-y border-hairline/60 bg-secondary-surface rounded-2xl overflow-hidden cursor-pointer relative backdrop-blur-md"
            onMouseEnter={() => setIsPaused(true)}
            onMouseLeave={() => setIsPaused(false)}
          >
            <motion.div
              animate={isPaused ? { x: 0 } : { x: [0, -400] }}
              transition={
                isPaused
                  ? { duration: 0.5 }
                  : {
                      repeat: Infinity,
                      duration: 20,
                      ease: "linear",
                    }
              }
              className="flex gap-16 items-center pr-16"
            >
              {doubleList.map((logo, idx) => (
                <span
                  key={idx}
                  className="text-body-base font-sans font-extrabold tracking-widest text-primary-text/45 hover:text-brass-accent transition-all duration-300"
                >
                  {logo}
                </span>
              ))}
            </motion.div>
          </div>
        </div>

      </div>
    </section>
  );
}
