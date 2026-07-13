"use client";

import { motion } from "framer-motion";
import RevealSquircle from "./RevealSquircle";

interface ProcessStep {
  number: string;
  title: string;
  description: string;
  hasVisual?: boolean;
}

const processSteps: ProcessStep[] = [
  {
    number: "01",
    title: "Business Discovery",
    description: "Before coding, we research your business. We catalog existing tools, map team dependencies, interview operators, and define operational key performance indicators.",
  },
  {
    number: "02",
    title: "Workflow Mapping",
    description: "We visualize your exact business flow to isolate friction points. This interactive, automated blueprint traces your leads from inception to renewal.",
    hasVisual: true,
  },
  {
    number: "03",
    title: "Bottleneck Analysis",
    description: "Friction points are named plainly: manual copy-paste spreadsheet handoffs, delayed supervisor approvals, slow customer onboarding, and data silos.",
  },
  {
    number: "04",
    title: "Solution Design",
    description: "We engineer systems to solve your specific bottlenecks. This includes AI-driven agents, bespoke internal dashboards, automations, and deep API integrations.",
  },
  {
    number: "05",
    title: "System Build",
    description: "We code production-grade systems on top of your stack, using modern engineering methodologies and ensuring bulletproof reliability.",
  },
  {
    number: "06",
    title: "Secure Deployment",
    description: "We manage the transition smoothly: API keys, fine-grained access roles, team onboarding, system monitoring, and feedback collection.",
  },
  {
    number: "07",
    title: "Continuous Optimization",
    description: "Business systems are living code. We continually optimize pathways as new bottlenecks arise or scale requirements expand.",
  },
];

// Nodes and connections for the workflow diagram
const workflowNodes = [
  "Sales",
  "Qualification",
  "Proposal",
  "Approval",
  "Delivery",
  "Support",
  "Renewal",
];

export default function ProcessSpine() {
  return (
    <section id="process" className="py-space-xxl px-6 bg-charcoal-base border-t border-hairline">
      <div className="max-w-4xl mx-auto flex flex-col gap-space-xl">
        
        {/* Section Header */}
        <div className="flex flex-col gap-space-xxs">
          <span className="text-caption text-brass-accent">03 / Process</span>
          <h2 className="text-display-l">How We Architect Systems</h2>
        </div>

        {/* Vertical numbered spine steps */}
        <div className="flex flex-col gap-space-xl mt-space-lg">
          {processSteps.map((step, idx) => (
            <div
              key={step.number}
              className="grid grid-cols-1 md:grid-cols-12 gap-space-md items-start border-t border-hairline/30 pt-space-md first:border-none first:pt-0"
            >
              {/* Spine numbers */}
              <div className="md:col-span-1 flex items-center gap-space-sm md:flex-col md:items-start md:gap-0">
                <span className="text-micro text-brass-accent font-mono">{step.number}</span>
                <div className="h-[1px] flex-1 bg-hairline md:hidden" />
              </div>

              {/* Title & Description */}
              <div className="md:col-span-11 flex flex-col gap-space-sm">
                <h3 className="text-heading text-primary-text font-medium">{step.title}</h3>
                <p className="text-body-base text-muted-text max-w-2xl">{step.description}</p>

                {/* Self-drawing Workflow Diagram inside Step 2 */}
                {step.hasVisual && (
                  <motion.div
                    initial="hidden"
                    whileInView="visible"
                    viewport={{ once: true, margin: "-100px" }}
                    className="mt-space-md p-space-md bg-secondary-surface border border-hairline rounded overflow-hidden"
                  >
                    <span className="text-micro text-muted-text block mb-space-sm">
                      Interactive Pipeline Flow Blueprint
                    </span>

                    {/* SVG Diagram Grid */}
                    <div className="w-full flex flex-col gap-space-md lg:gap-0 lg:flex-row items-center justify-between relative mt-6 min-h-[80px]">
                      
                      {/* Desktop connecting draw path lines */}
                      <div className="absolute top-1/2 left-0 right-0 h-[1px] hidden lg:block z-0 pointer-events-none">
                        <svg className="w-full h-1 overflow-visible">
                          <motion.line
                            x1="0"
                            y1="0"
                            x2="100%"
                            y2="0"
                            stroke="var(--color-brass-accent)"
                            strokeWidth="1.5"
                            variants={{
                              hidden: { pathLength: 0 },
                              visible: {
                                pathLength: 1,
                                transition: { duration: 1.8, ease: "easeInOut" },
                              },
                            }}
                          />
                        </svg>
                      </div>

                      {/* Steps render */}
                      {workflowNodes.map((node, nodeIdx) => {
                        const delayTime = nodeIdx * 0.25;
                        return (
                          <div
                            key={node}
                            className="flex flex-col items-center gap-space-xxs z-10 w-full lg:w-auto relative"
                          >
                            {/* Visual node pops in */}
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
                              className="w-7 h-7 rounded-full bg-charcoal-base border-2 border-brass-accent flex items-center justify-center text-[0.6rem] font-mono text-brass-accent font-semibold shadow-md"
                            >
                              {nodeIdx + 1}
                            </motion.div>

                            <motion.span
                              variants={{
                                hidden: { opacity: 0, y: 10 },
                                visible: {
                                  opacity: 1,
                                  y: 0,
                                  transition: { duration: 0.4, delay: delayTime + 0.1 },
                                },
                              }}
                              className="text-micro text-primary-text font-mono mt-1 text-center"
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
