"use client";

import { motion } from "framer-motion";

interface Capability {
  numeral: string;
  title: string;
  description: string;
}

const capabilities: Capability[] = [
  {
    numeral: "01",
    title: "AI Systems",
    description: "Custom multi-agent operation nodes, compliance parsers, and semantic search interfaces engineered directly into your database stack.",
  },
  {
    numeral: "02",
    title: "Workflow Automation",
    description: "End-to-end event pipelines connecting sales pipelines, approvals, customer onboarding, and sync queues without manual inputs.",
  },
  {
    numeral: "03",
    title: "Internal Tools",
    description: "Bespoke database controllers, administrative platforms, operations dashboards, and auditing tools designed to optimize operator focus.",
  },
  {
    numeral: "04",
    title: "System Integrations",
    description: "Clean API connectors integrating your core CRM, billing engines, messaging layers, and database clusters under operational rigor.",
  },
];

export default function Capabilities() {
  return (
    <section id="capabilities" className="py-space-xxl px-6 bg-charcoal-base border-t border-hairline">
      <div className="max-w-7xl mx-auto flex flex-col gap-space-xl">
        
        {/* Section Header */}
        <div className="flex flex-col gap-space-xxs max-w-xl">
          <span className="text-caption text-brass-accent">04 / Capabilities</span>
          <h2 className="text-display-l">What We Build</h2>
          <p className="text-body-base text-muted-text mt-space-sm">
            We architect high-precision software assets that automate friction, streamline operator time, and lock in predictive margins.
          </p>
        </div>

        {/* 4-Column Grid layout */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-space-md mt-space-md">
          {capabilities.map((item) => (
            <motion.div
              key={item.numeral}
              whileHover={{ y: -4 }}
              transition={{ duration: 0.3, ease: [0.22, 1, 0.36, 1] }}
              className="bg-secondary-surface border border-hairline p-space-md rounded flex flex-col gap-space-sm group cursor-default transition-colors duration-300 hover:border-brass-accent/30"
            >
              {/* Numeral label */}
              <span className="text-micro font-mono text-brass-accent font-medium">
                {item.numeral}
              </span>

              {/* Title with bottom hover line */}
              <div className="relative inline-block pb-1">
                <h3 className="text-heading text-primary-text font-medium group-hover:text-brass-accent transition-colors duration-300">
                  {item.title}
                </h3>
                {/* Underline draw */}
                <div className="absolute bottom-0 left-0 right-0 h-[1.5px] bg-brass-accent scale-x-0 group-hover:scale-x-100 origin-left transition-transform duration-300" />
              </div>

              {/* Description */}
              <p className="text-body-base text-muted-text leading-relaxed mt-2">
                {item.description}
              </p>
            </motion.div>
          ))}
        </div>

      </div>
    </section>
  );
}
