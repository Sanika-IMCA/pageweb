"use client";

import { motion } from "framer-motion";
import { useState } from "react";

interface Service {
  numeral: string;
  title: string;
  deliverables: { text: string; type: "blue" | "red" | "purple" }[];
  description: string;
}

const servicesList: Service[] = [
  {
    numeral: "01",
    title: "Strategy",
    deliverables: [
      { text: "Product Roadmap", type: "blue" },
      { text: "Workflow Audits", type: "blue" },
      { text: "Tech Stack", type: "blue" },
    ],
    description: "We map your current business processes, identify structural bottlenecks, and architect product specifications before writing code.",
  },
  {
    numeral: "02",
    title: "Brand",
    deliverables: [
      { text: "Visual Identity", type: "red" },
      { text: "Guidelines", type: "red" },
      { text: "Logo Design", type: "red" },
    ],
    description: "We build premium brand identities with high editorial polish, quiet confidence, and structural authority that demand attention.",
  },
  {
    numeral: "03",
    title: "Website",
    deliverables: [
      { text: "Marketing Pages", type: "blue" },
      { text: "Creative Dir", type: "blue" },
      { text: "Inertial Motion", type: "blue" },
    ],
    description: "We design and engineer bespoke web experiences using Next.js, smooth scroll containers, and cinematic motion transitions.",
  },
  {
    numeral: "04",
    title: "Product Design",
    deliverables: [
      { text: "SaaS Dashboards", type: "red" },
      { text: "Interactive UIs", type: "red" },
      { text: "Design Systems", type: "red" },
    ],
    description: "We construct high-fidelity user experiences and logical data visualization layouts that simplify complex systems pipelines.",
  },
  {
    numeral: "05",
    title: "Development",
    deliverables: [
      { text: "TypeScript Code", type: "purple" },
      { text: "Custom Scrapers", type: "purple" },
      { text: "API Gateways", type: "purple" },
    ],
    description: "We write clean, production-grade TypeScript code, integrating secure AI engines, database structures, and webhook systems.",
  },
];

export default function Capabilities() {
  const [hoveredIdx, setHoveredIdx] = useState<number | null>(null);

  return (
    <section id="services" className="py-32 px-6 md:px-12 bg-charcoal-base border-t border-hairline">
      <div className="max-w-7xl mx-auto flex flex-col gap-20">
        
        {/* Section Header */}
        <div className="flex flex-col gap-4 max-w-xl">
          <span className="text-caption text-brass-accent font-mono tracking-widest font-semibold">
            03 / SERVICES
          </span>
          <h2 className="text-[2.5rem] md:text-[3.5rem] font-bold tracking-tight text-primary-text leading-none">
            Capabilities
          </h2>
          <p className="text-body-base text-muted-text mt-2">
            A comprehensive offering across strategic planning, brand design, web experiences, product architecture, and backend engineering.
          </p>
        </div>

        {/* Editorial Table List */}
        <div className="flex flex-col border-t border-hairline mt-8">
          {servicesList.map((service, idx) => {
            const isHovered = hoveredIdx === idx;
            return (
              <div
                key={service.numeral}
                onMouseEnter={() => setHoveredIdx(idx)}
                onMouseLeave={() => setHoveredIdx(null)}
                className="relative py-12 border-b border-hairline/60 grid grid-cols-1 md:grid-cols-12 gap-6 items-center group cursor-pointer transition-colors duration-300 hover:bg-white/40 px-4"
              >
                {/* Background glow tracker on hover */}
                {isHovered && (
                  <motion.div
                    layoutId="serviceGlow"
                    className="absolute inset-0 bg-white/30 z-0 pointer-events-none"
                    transition={{ duration: 0.25 }}
                  />
                )}

                {/* Numeral */}
                <div className="md:col-span-1 z-10">
                  <span className="text-micro font-mono text-muted-text group-hover:text-primary-text transition-colors duration-300 font-bold">
                    {service.numeral}
                  </span>
                </div>

                {/* Service Title */}
                <div className="md:col-span-4 z-10">
                  <h3 className="text-[1.65rem] md:text-[2rem] font-bold tracking-tight text-primary-text transition-transform duration-300 group-hover:translate-x-2 font-display">
                    {service.title}
                  </h3>
                </div>

                {/* Description */}
                <div className="md:col-span-4 z-10">
                  <p className="text-body-base text-muted-text group-hover:text-primary-text/90 transition-colors duration-300 leading-relaxed">
                    {service.description}
                  </p>
                </div>

                {/* Deliverables tags with custom light colors */}
                <div className="md:col-span-3 flex flex-wrap gap-2 z-10 justify-start md:justify-end">
                  {service.deliverables.map((item) => {
                    let colorClass = "bg-blue-50/70 text-blue-600 border-blue-100/50";
                    if (item.type === "red") {
                      colorClass = "bg-red-50/70 text-red-500 border-red-100/50";
                    } else if (item.type === "purple") {
                      colorClass = "bg-purple-50/70 text-purple-600 border-purple-100/50";
                    }
                    return (
                      <span
                        key={item.text}
                        className={`text-[0.7rem] font-mono border rounded-full px-3 py-1 font-semibold transition-all duration-300 ${colorClass}`}
                      >
                        {item.text}
                      </span>
                    );
                  })}
                </div>

              </div>
            );
          })}
        </div>

      </div>
    </section>
  );
}
