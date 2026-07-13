"use client";

import { motion } from "framer-motion";
import { useState } from "react";

const trustLogos = [
  "STRIPE",
  "LINEAR",
  "PALANTIR",
  "FROMANOTHER",
  "OBYS",
  "VERCEL",
  "SUPABASE",
  "NEXTJS",
];

export default function TrustLogos() {
  const [isPaused, setIsPaused] = useState(false);
  const doubleList = [...trustLogos, ...trustLogos];

  return (
    <section id="trust" className="py-space-xl bg-charcoal-base border-t border-hairline overflow-hidden select-none">
      <div className="max-w-7xl mx-auto px-6 mb-space-sm">
        <span className="text-caption text-brass-accent block">
          09 / Trust
        </span>
      </div>

      {/* Marquee Container */}
      <div
        className="w-full flex whitespace-nowrap py-4 border-y border-hairline/20 bg-secondary-surface cursor-pointer relative"
        onMouseEnter={() => setIsPaused(true)}
        onMouseLeave={() => setIsPaused(false)}
      >
        <motion.div
          animate={isPaused ? { x: 0 } : { x: [0, -800] }}
          transition={
            isPaused
              ? { duration: 0.5 }
              : {
                  repeat: Infinity,
                  duration: 25,
                  ease: "linear",
                }
          }
          className="flex gap-space-xxl items-center pr-space-xxl"
        >
          {doubleList.map((logo, idx) => (
            <span
              key={idx}
              className="text-heading font-sans font-bold tracking-widest text-[#8B8D93] hover:text-brass-accent opacity-50 hover:opacity-100 transition-all duration-300"
            >
              {logo}
            </span>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
