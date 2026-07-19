"use client";

import { motion } from "framer-motion";

interface ProcessStep {
  number: string;
  title: string;
  description: string;
  hasVisual?: boolean;
}

const processSteps: ProcessStep[] = [
  {
    number: "01",
    title: "Discover",
    description: "We research your business objectives, map operator dependencies, audit existing pipelines, and define key structural requirements before opening a code editor.",
    hasVisual: true,
  },
  {
    number: "02",
    title: "Design",
    description: "We build intuitive user experience dashboards, map clean database relational schemas, and prototype responsive user interfaces that optimize functional speed.",
  },
  {
    number: "03",
    title: "Build",
    description: "We write clean, production-grade TypeScript code, integrating secure AI engines, database clusters, automated queues, and robust API endpoints under strict performance targets.",
  },
  {
    number: "04",
    title: "Scale",
    description: "We securely transition systems, onboard operators, monitor errors in real time, and optimize code bases as query loads and operational goals grow.",
  },
];

const workflowNodes = [
  "Discovery",
  "Blueprint",
  "Product Design",
  "Dev Pipeline",
  "API Gateway",
  "Live Launch",
];

export default function ProcessSpine() {
  return (
    <section id="process" className="py-32 px-6 md:px-12 bg-charcoal-base border-t border-hairline relative">
      
      {/* Subtle Blush Red background blur orb */}
      <div className="absolute bottom-12 right-12 w-[250px] h-[250px] bg-red-100/15 rounded-full blur-[60px] pointer-events-none" />

      <div className="max-w-4xl mx-auto flex flex-col gap-16 relative z-10">
        
        {/* Section Header */}
        <div className="flex flex-col gap-4">
          <span className="text-caption text-brass-accent font-mono tracking-widest font-semibold">
            03 / METHODOLOGY
          </span>
          <h2 className="text-[2.5rem] md:text-[3.5rem] font-bold tracking-tight text-primary-text leading-none">
            The Process
          </h2>
          <p className="text-body-base text-muted-text mt-2 max-w-xl">
            A systematic, result-driven timeline built on transparency, technical rigor, and product excellence.
          </p>
        </div>

        {/* Timeline Grid */}
        <div className="flex flex-col gap-16 mt-8">
          {processSteps.map((step, idx) => (
            <div
              key={step.number}
              className="grid grid-cols-1 md:grid-cols-12 gap-6 items-start border-t border-hairline/30 pt-12 first:border-none first:pt-0"
            >
              {/* Step number */}
              <div className="md:col-span-2">
                <span className="text-micro font-mono text-muted-text font-bold">
                  {step.number} &mdash;
                </span>
              </div>

              {/* Step Info */}
              <div className="md:col-span-10 flex flex-col gap-4">
                <h3 className="text-[1.5rem] md:text-[2rem] font-bold tracking-tight text-primary-text font-display">{step.title}</h3>
                <p className="text-body-base text-muted-text max-w-2xl leading-relaxed">{step.description}</p>

                {/* SVG Visual blueprint inside Discover */}
                {step.hasVisual && (
                  <motion.div
                    initial="hidden"
                    whileInView="visible"
                    viewport={{ once: true, margin: "-100px" }}
                    className="mt-6 p-6 bg-secondary-surface border border-white/60 rounded-2xl overflow-hidden shadow-sm backdrop-blur-md"
                  >
                    <span className="text-micro text-muted-text block mb-4 font-mono font-bold opacity-60">
                      SYSTEM INTEGRATION BLUEPRINT
                    </span>

                    {/* SVG Diagram Grid */}
                    <div className="w-full flex flex-col gap-6 lg:gap-0 lg:flex-row items-center justify-between relative mt-4 min-h-[60px]">
                      
                      {/* Desktop connecting path line */}
                      <div className="absolute top-1/2 left-0 right-0 h-[1px] hidden lg:block z-0 pointer-events-none">
                        <svg className="w-full h-1 overflow-visible">
                          <motion.line
                            x1="0"
                            y1="0"
                            x2="100%"
                            y2="0"
                            stroke="rgba(59, 130, 246, 0.25)"
                            strokeWidth="1"
                            variants={{
                              hidden: { pathLength: 0 },
                              visible: {
                                pathLength: 1,
                                transition: { duration: 1.5, ease: "easeInOut" },
                              },
                            }}
                          />
                        </svg>
                      </div>

                      {/* Steps render */}
                      {workflowNodes.map((node, nodeIdx) => {
                        const delayTime = nodeIdx * 0.2;
                        return (
                          <div
                            key={node}
                            className="flex flex-col items-center gap-2 z-10 w-full lg:w-auto relative"
                          >
                            <motion.div
                              variants={{
                                hidden: { scale: 0 },
                                visible: {
                                  scale: 1,
                                  transition: {
                                    type: "spring",
                                    stiffness: 260,
                                    damping: 20,
                                    delay: delayTime,
                                  },
                                },
                              }}
                              className="w-6 h-6 rounded-full bg-white border border-blue-200/80 flex items-center justify-center text-[0.6rem] font-mono text-blue-600 font-bold shadow-sm"
                            >
                              {nodeIdx + 1}
                            </motion.div>

                            <motion.span
                              variants={{
                                hidden: { opacity: 0, y: 5 },
                                visible: {
                                  opacity: 1,
                                  y: 0,
                                  transition: { duration: 0.4, delay: delayTime + 0.1 },
                                },
                              }}
                              className="text-micro text-primary-text font-mono mt-1 text-center font-bold opacity-80"
                            >
                              {node}
                            </motion.span>
                          </div>
                        );
                      })}

                    </div>
                  </motion.div>
                )}
              </div>
            </div>
          ))}
        </div>

      </div>
    </section>
  );
}
