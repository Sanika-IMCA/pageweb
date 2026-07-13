"use client";

import { motion } from "framer-motion";

const industries = [
  "Manufacturing",
  "Logistics & Freight",
  "B2B Professional Services",
  "Private Equity & VC Portfolio",
  "Healthcare Ops",
  "Retail & Distribution",
  "E-commerce Operations",
  "Regulatory Compliance",
];

export default function Industries() {
  // Double the list to support seamless infinite loop transitions
  const doubleList = [...industries, ...industries];

  return (
    <section id="industries" className="py-space-lg bg-charcoal-base border-t border-hairline overflow-hidden select-none">
      <div className="max-w-7xl mx-auto px-6">
        <span className="text-caption text-brass-accent block mb-space-sm">
          06 / Sectors
        </span>
      </div>
      
      {/* Ticking loop container */}
      <div className="w-full flex whitespace-nowrap relative py-2">
        <motion.div
          animate={{ x: [0, -1200] }}
          transition={{
            repeat: Infinity,
            duration: 35,
            ease: "linear",
          }}
          className="flex gap-space-xl items-center pr-space-xl"
        >
          {doubleList.map((item, idx) => (
            <div key={idx} className="flex items-center gap-space-sm">
              <span className="text-display-m tracking-wide font-display text-primary-text/80">
                {item}
              </span>
              <span className="text-brass-accent text-lg">&bull;</span>
            </div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
