"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Link from "next/link";

interface CapabilityItem {
  num: string;
  title: string;
  subtitle: string;
  description: string;
  examples: string[];
  diagramType: "ai" | "internal" | "automation" | "custom" | "integrations";
}

export default function Capabilities() {
  const [expandedMobileRow, setExpandedMobileRow] = useState<number | null>(null);

  const capabilities: CapabilityItem[] = [
    {
      num: "01",
      title: "AI SYSTEMS",
      subtitle: "INTELLIGENT WORKFLOWS",
      description: "Intelligent agents and workflows that handle repetitive research, analysis, communication, classification, and operational tasks.",
      examples: [
        "Research agents",
        "Qualification systems",
        "Document processing",
        "Communication workflows",
        "Internal AI copilots",
        "Automated analysis"
      ],
      diagramType: "ai"
    },
    {
      num: "02",
      title: "INTERNAL SYSTEMS",
      subtitle: "OPERATIONAL TOOLS",
      description: "Custom dashboards, portals, databases, and internal software that replace spreadsheets, fragmented tracking, and manual coordination.",
      examples: [
        "Operations dashboards",
        "Internal portals",
        "Workflow management systems",
        "Custom databases",
        "Control centers",
        "Reporting systems"
      ],
      diagramType: "internal"
    },
    {
      num: "03",
      title: "AUTOMATION",
      subtitle: "AUTOMATED PIPELINES",
      description: "Systems that move information between tools, trigger actions, eliminate repetitive handoffs, and keep operations moving without constant manual intervention.",
      examples: [
        "Lead routing",
        "CRM synchronization",
        "Automated notifications",
        "Data synchronization",
        "Workflow triggers",
        "Scheduled processes"
      ],
      diagramType: "automation"
    },
    {
      num: "04",
      title: "CUSTOM SOFTWARE",
      subtitle: "PURPOSE-BUILT APPLICATIONS",
      description: "Purpose-built applications and features designed around specific business requirements that cannot be solved effectively with existing tools.",
      examples: [
        "Internal applications",
        "Customer-facing products",
        "Custom APIs",
        "Business logic",
        "Specialized interfaces",
        "Database-backed systems"
      ],
      diagramType: "custom"
    },
    {
      num: "05",
      title: "INTEGRATIONS",
      subtitle: "CONNECTED INFRASTRUCTURE",
      description: "Connect CRMs, databases, payments, communication tools, APIs, and existing software into one reliable operational workflow.",
      examples: [
        "CRM integrations",
        "Payment systems",
        "APIs",
        "Databases",
        "Communication platforms",
        "Third-party services"
      ],
      diagramType: "integrations"
    }
  ];

  const techStack = [
    "STRIPE",
    "LINEAR",
    "SUPABASE",
    "VERCEL",
    "MAKE",
    "RETOOL",
    "NOTION",
    "SLACK"
  ];

  const renderDiagram = (type: CapabilityItem["diagramType"]) => {
    switch (type) {
      case "ai":
        return (
          <svg width="220" height="50" viewBox="0 0 220 50" fill="none" xmlns="http://www.w3.org/2000/svg" className="text-brass-accent">
            <rect x="2" y="10" width="38" height="30" rx="3" fill="currentColor" fillOpacity="0.03" stroke="currentColor" strokeWidth="0.75" />
            <text x="21" y="28" fill="#0f172a" fontSize="7" fontFamily="var(--font-mono), monospace" fontWeight="bold" textAnchor="middle">INPUT</text>

            <path d="M40 25H52" stroke="currentColor" strokeWidth="0.75" strokeDasharray="2 2" />
            <polygon points="52,25 48,22 48,28" fill="currentColor" />

            <rect x="54" y="10" width="46" height="30" rx="3" fill="currentColor" fillOpacity="0.05" stroke="currentColor" strokeWidth="0.75" />
            <text x="77" y="28" fill="#0f172a" fontSize="7" fontFamily="var(--font-mono), monospace" fontWeight="bold" textAnchor="middle">AI PROCESS</text>

            <path d="M100 25H112" stroke="currentColor" strokeWidth="0.75" strokeDasharray="2 2" />
            <polygon points="112,25 108,22 108,28" fill="currentColor" />

            <rect x="114" y="10" width="48" height="30" rx="3" fill="currentColor" fillOpacity="0.03" stroke="currentColor" strokeWidth="0.75" />
            <text x="138" y="28" fill="#0f172a" fontSize="7" fontFamily="var(--font-mono), monospace" fontWeight="bold" textAnchor="middle">DECISION</text>

            <path d="M162 25H174" stroke="currentColor" strokeWidth="0.75" strokeDasharray="2 2" />
            <polygon points="174,25 170,22 170,28" fill="currentColor" />

            <rect x="176" y="10" width="42" height="30" rx="3" fill="currentColor" fillOpacity="0.05" stroke="currentColor" strokeWidth="0.75" />
            <text x="197" y="28" fill="#0f172a" fontSize="7" fontFamily="var(--font-mono), monospace" fontWeight="bold" textAnchor="middle">ACTION</text>
          </svg>
        );
      case "internal":
        return (
          <svg width="220" height="50" viewBox="0 0 220 50" fill="none" xmlns="http://www.w3.org/2000/svg" className="text-brass-accent">
            <rect x="2" y="10" width="38" height="30" rx="3" fill="currentColor" fillOpacity="0.03" stroke="currentColor" strokeWidth="0.75" />
            <text x="21" y="28" fill="#0f172a" fontSize="7" fontFamily="var(--font-mono), monospace" fontWeight="bold" textAnchor="middle">DATA</text>

            <path d="M40 25H52" stroke="currentColor" strokeWidth="0.75" strokeDasharray="2 2" />
            <polygon points="52,25 48,22 48,28" fill="currentColor" />

            <rect x="54" y="10" width="46" height="30" rx="3" fill="currentColor" fillOpacity="0.05" stroke="currentColor" strokeWidth="0.75" />
            <text x="77" y="28" fill="#0f172a" fontSize="7" fontFamily="var(--font-mono), monospace" fontWeight="bold" textAnchor="middle">DATABASE</text>

            <path d="M100 25H112" stroke="currentColor" strokeWidth="0.75" strokeDasharray="2 2" />
            <polygon points="112,25 108,22 108,28" fill="currentColor" />

            <rect x="114" y="10" width="48" height="30" rx="3" fill="currentColor" fillOpacity="0.03" stroke="currentColor" strokeWidth="0.75" />
            <text x="138" y="28" fill="#0f172a" fontSize="7" fontFamily="var(--font-mono), monospace" fontWeight="bold" textAnchor="middle">INTERFACE</text>

            <path d="M162 25H174" stroke="currentColor" strokeWidth="0.75" strokeDasharray="2 2" />
            <polygon points="174,25 170,22 170,28" fill="currentColor" />

            <rect x="176" y="10" width="42" height="30" rx="3" fill="currentColor" fillOpacity="0.05" stroke="currentColor" strokeWidth="0.75" />
            <text x="197" y="28" fill="#0f172a" fontSize="6.5" fontFamily="var(--font-mono), monospace" fontWeight="bold" textAnchor="middle">OPERATOR</text>
          </svg>
        );
      case "automation":
        return (
          <svg width="220" height="50" viewBox="0 0 220 50" fill="none" xmlns="http://www.w3.org/2000/svg" className="text-brass-accent">
            <rect x="2" y="10" width="40" height="30" rx="3" fill="currentColor" fillOpacity="0.03" stroke="currentColor" strokeWidth="0.75" />
            <text x="22" y="28" fill="#0f172a" fontSize="7" fontFamily="var(--font-mono), monospace" fontWeight="bold" textAnchor="middle">TRIGGER</text>

            <path d="M42 25H54" stroke="currentColor" strokeWidth="0.75" strokeDasharray="2 2" />
            <polygon points="54,25 50,22 50,28" fill="currentColor" />

            <rect x="56" y="10" width="46" height="30" rx="3" fill="currentColor" fillOpacity="0.05" stroke="currentColor" strokeWidth="0.75" />
            <text x="79" y="28" fill="#0f172a" fontSize="7" fontFamily="var(--font-mono), monospace" fontWeight="bold" textAnchor="middle">PROCESS</text>

            <path d="M102 25H114" stroke="currentColor" strokeWidth="0.75" strokeDasharray="2 2" />
            <polygon points="114,25 110,22 110,28" fill="currentColor" />

            <rect x="116" y="10" width="44" height="30" rx="3" fill="currentColor" fillOpacity="0.03" stroke="currentColor" strokeWidth="0.75" />
            <text x="138" y="28" fill="#0f172a" fontSize="7" fontFamily="var(--font-mono), monospace" fontWeight="bold" textAnchor="middle">SYNC</text>

            <path d="M160 25H172" stroke="currentColor" strokeWidth="0.75" strokeDasharray="2 2" />
            <polygon points="172,25 168,22 168,28" fill="currentColor" />

            <rect x="174" y="10" width="44" height="30" rx="3" fill="currentColor" fillOpacity="0.05" stroke="currentColor" strokeWidth="0.75" />
            <text x="196" y="28" fill="#0f172a" fontSize="7" fontFamily="var(--font-mono), monospace" fontWeight="bold" textAnchor="middle">RESULT</text>
          </svg>
        );
      case "custom":
        return (
          <svg width="220" height="50" viewBox="0 0 220 50" fill="none" xmlns="http://www.w3.org/2000/svg" className="text-brass-accent">
            <rect x="2" y="10" width="44" height="30" rx="3" fill="currentColor" fillOpacity="0.03" stroke="currentColor" strokeWidth="0.75" />
            <text x="24" y="28" fill="#0f172a" fontSize="6.5" fontFamily="var(--font-mono), monospace" fontWeight="bold" textAnchor="middle">REQUIRES</text>

            <path d="M46 25H58" stroke="currentColor" strokeWidth="0.75" strokeDasharray="2 2" />
            <polygon points="58,25 54,22 54,28" fill="currentColor" />

            <rect x="60" y="10" width="42" height="30" rx="3" fill="currentColor" fillOpacity="0.05" stroke="currentColor" strokeWidth="0.75" />
            <text x="81" y="28" fill="#0f172a" fontSize="7" fontFamily="var(--font-mono), monospace" fontWeight="bold" textAnchor="middle">LOGIC</text>

            <path d="M102 25H114" stroke="currentColor" strokeWidth="0.75" strokeDasharray="2 2" />
            <polygon points="114,25 110,22 110,28" fill="currentColor" />

            <rect x="116" y="10" width="48" height="30" rx="3" fill="currentColor" fillOpacity="0.03" stroke="currentColor" strokeWidth="0.75" />
            <text x="140" y="28" fill="#0f172a" fontSize="7" fontFamily="var(--font-mono), monospace" fontWeight="bold" textAnchor="middle">APP CORE</text>

            <path d="M164 25H176" stroke="currentColor" strokeWidth="0.75" strokeDasharray="2 2" />
            <polygon points="176,25 172,22 172,28" fill="currentColor" />

            <rect x="178" y="10" width="40" height="30" rx="3" fill="currentColor" fillOpacity="0.05" stroke="currentColor" strokeWidth="0.75" />
            <text x="198" y="28" fill="#0f172a" fontSize="7" fontFamily="var(--font-mono), monospace" fontWeight="bold" textAnchor="middle">USER</text>
          </svg>
        );
      case "integrations":
        return (
          <svg width="220" height="50" viewBox="0 0 220 50" fill="none" xmlns="http://www.w3.org/2000/svg" className="text-brass-accent">
            <rect x="2" y="10" width="50" height="30" rx="3" fill="currentColor" fillOpacity="0.03" stroke="currentColor" strokeWidth="0.75" />
            <text x="27" y="28" fill="#0f172a" fontSize="7" fontFamily="var(--font-mono), monospace" fontWeight="bold" textAnchor="middle">SYSTEM A</text>

            <path d="M52 25H72" stroke="currentColor" strokeWidth="0.75" strokeDasharray="2 2" />
            <polygon points="72,25 68,22 68,28" fill="currentColor" />
            <polygon points="52,25 56,22 56,28" fill="currentColor" />

            <rect x="74" y="10" width="72" height="30" rx="3" fill="currentColor" fillOpacity="0.05" stroke="currentColor" strokeWidth="0.75" />
            <text x="110" y="28" fill="#0f172a" fontSize="7" fontFamily="var(--font-mono), monospace" fontWeight="bold" textAnchor="middle">API PLATFORM</text>

            <path d="M146 25H166" stroke="currentColor" strokeWidth="0.75" strokeDasharray="2 2" />
            <polygon points="166,25 162,22 162,28" fill="currentColor" />
            <polygon points="146,25 150,22 150,28" fill="currentColor" />

            <rect x="168" y="10" width="50" height="30" rx="3" fill="currentColor" fillOpacity="0.03" stroke="currentColor" strokeWidth="0.75" />
            <text x="193" y="28" fill="#0f172a" fontSize="7" fontFamily="var(--font-mono), monospace" fontWeight="bold" textAnchor="middle">SYSTEM B</text>
          </svg>
        );
    }
  };

  return (
    <section id="what-we-build" className="py-32 px-6 md:px-12 bg-transparent border-t border-hairline relative">
      <div className="max-w-7xl mx-auto flex flex-col gap-28">
        
        {/* Asymmetric Header Section */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-start">
          
          {/* Left Column: Heading and Subtitle */}
          <div className="lg:col-span-5 flex flex-col gap-6">
            <div className="flex flex-col gap-2">
              <span className="text-caption text-brass-accent font-mono tracking-widest font-bold">
                02 / CAPABILITIES
              </span>
              <h2 className="text-[2.25rem] md:text-[3.25rem] font-bold tracking-tight text-primary-text leading-[1.0] font-display uppercase">
                WHAT WE BUILD<br />
                AFTER WE FIND THE PROBLEM.
              </h2>
            </div>
            <p className="text-body-l text-muted-text font-semibold leading-relaxed">
              Not more software. The right systems for the way your business actually works.
            </p>
          </div>

          {/* Right Column: Introductory Principle & Relocated Copy */}
          <div className="lg:col-span-7 flex flex-col gap-6 border-l border-hairline/35 pl-6 lg:pl-10">
            <div className="flex flex-col gap-4">
              <span className="text-micro font-mono tracking-wider text-primary-text font-bold uppercase">
                THE SYSTEM IS DETERMINED BY THE PROBLEM.
              </span>
              <p className="text-body-base text-muted-text leading-relaxed font-semibold">
                A workflow may require an AI agent, an internal tool, an automated pipeline, a custom application, or several systems working together. We design the architecture around the operation — not around a predetermined stack.
              </p>
              <p className="text-body-base text-muted-text leading-relaxed font-semibold pt-2 border-t border-hairline/35">
                Each system we build maps the real bottlenecks in your workflows, transforming chaotic spreadsheets and manual procedures into high-fidelity automated code. We deliver custom database engines, lightweight automations, and partner integrations directly into your operators&apos; hands — saving time and increasing control.
              </p>
            </div>
          </div>

        </div>

        {/* Capability Rows */}
        <div className="flex flex-col border-t border-hairline/65 max-w-5xl">
          {capabilities.map((item, idx) => (
            <div key={item.num} className="border-b border-hairline/65">
              
              {/* Desktop view: Layout grid with hover animation */}
              <div className="group hidden lg:grid grid-cols-12 gap-8 py-10 items-start cursor-pointer hover:bg-brass-accent/[0.012] transition-colors duration-300 pl-4 pr-6">
                
                {/* Number */}
                <div className="col-span-1 text-micro font-mono text-brass-accent font-bold">
                  {item.num} &mdash;
                </div>

                {/* Title & Subtitle */}
                <div className="col-span-4 flex flex-col gap-1.5">
                  <h3 className="text-[1.25rem] font-bold text-primary-text font-display uppercase tracking-tight">
                    {item.title}
                  </h3>
                  <span className="text-micro font-mono text-muted-text font-bold tracking-wider">
                    {item.subtitle}
                  </span>
                </div>

                {/* Content Details */}
                <div className="col-span-4 flex flex-col gap-4">
                  <p className="text-[0.95rem] text-muted-text leading-relaxed font-semibold">
                    {item.description}
                  </p>
                  
                  {/* Examples bulleted list */}
                  <div className="flex flex-col gap-1.5 mt-2">
                    <span className="text-[0.68rem] font-mono text-brass-accent uppercase tracking-wider font-bold">
                      System Examples:
                    </span>
                    <ul className="grid grid-cols-2 gap-x-4 gap-y-1">
                      {item.examples.map((ex) => (
                        <li key={ex} className="text-[0.82rem] text-muted-text/80 font-medium flex items-center gap-1.5">
                          <span className="w-1 h-1 bg-hairline rounded-full" />
                          {ex}
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>

                {/* Animated Diagram placeholder on the right */}
                <div className="col-span-3 flex justify-end items-center opacity-0 group-hover:opacity-100 group-hover:translate-x-2 transition-all duration-300 pointer-events-none select-none h-full self-center">
                  {renderDiagram(item.diagramType)}
                </div>

              </div>

              {/* Mobile view: Accordion drawer toggles */}
              <div className="lg:hidden">
                <button
                  onClick={() => setExpandedMobileRow(expandedMobileRow === idx ? null : idx)}
                  className="w-full text-left py-6 px-4 flex items-center justify-between transition-colors hover:bg-slate-50 cursor-pointer"
                >
                  <div className="flex flex-col gap-1">
                    <div className="flex items-center gap-2">
                      <span className="text-micro font-mono text-brass-accent font-bold">{item.num}</span>
                      <h3 className="text-[1.1rem] font-bold text-primary-text font-display uppercase">
                        {item.title}
                      </h3>
                    </div>
                    <span className="text-[0.68rem] font-mono text-muted-text font-bold uppercase tracking-wider">
                      {item.subtitle}
                    </span>
                  </div>
                  
                  {/* Plus/minus indicator */}
                  <span className="text-[1.5rem] leading-none text-brass-accent font-bold font-mono">
                    {expandedMobileRow === idx ? "−" : "+"}
                  </span>
                </button>

                <AnimatePresence initial={false}>
                  {expandedMobileRow === idx && (
                    <motion.div
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: "auto", opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      transition={{ duration: 0.35, ease: "easeInOut" }}
                      className="overflow-hidden"
                    >
                      <div className="px-4 pb-8 flex flex-col gap-6 border-t border-hairline/35 pt-4 bg-slate-50/30">
                        <p className="text-[0.92rem] text-muted-text font-medium leading-relaxed">
                          {item.description}
                        </p>
                        
                        {/* Examples bulleted list */}
                        <div className="flex flex-col gap-2">
                          <span className="text-[0.68rem] font-mono text-brass-accent uppercase tracking-wider font-bold">
                            System Examples:
                          </span>
                          <ul className="grid grid-cols-1 gap-2 pl-2">
                            {item.examples.map((ex) => (
                              <li key={ex} className="text-[0.85rem] text-muted-text font-semibold flex items-center gap-2">
                                <span className="w-1 h-1 bg-brass-accent/60 rounded-full" />
                                {ex}
                              </li>
                            ))}
                          </ul>
                        </div>

                        {/* Inline technical diagram */}
                        <div className="border-t border-hairline/35 pt-6 mt-2 flex justify-center w-full">
                          {renderDiagram(item.diagramType)}
                        </div>
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>

            </div>
          ))}
        </div>

        {/* Works With Your Existing Stack (Horizontal segment) */}
        <div className="border-t border-hairline/65 pt-20 mt-8 max-w-5xl">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
            
            {/* Left Column: Stack positioning Copy */}
            <div className="lg:col-span-5 flex flex-col gap-3">
              <span className="text-micro font-mono tracking-widest text-muted-text/50 font-bold uppercase">
                SYSTEM INTEGRATION
              </span>
              <h3 className="text-[1.35rem] md:text-[1.5rem] font-bold text-primary-text font-display uppercase tracking-tight leading-tight">
                YOUR STACK DOESN&apos;T HAVE TO CHANGE. YOUR SYSTEM DOES.
              </h3>
              <p className="text-[0.9rem] text-muted-text font-semibold leading-relaxed mt-1">
                We integrate with the tools your team already uses wherever they are the right fit. When they aren&apos;t, we design what is missing.
              </p>
            </div>

            {/* Right Column: Restrained horizontal list of technologies */}
            <div className="lg:col-span-7 flex flex-wrap gap-3 items-center lg:justify-end lg:pt-8 w-full">
              {techStack.map((tech) => (
                <div
                  key={tech}
                  className="text-micro font-mono text-brass-accent bg-accent-blue-light/20 border border-brass-accent/15 rounded-md px-3.5 py-2 font-bold uppercase tracking-wider shadow-sm select-none"
                >
                  {tech}
                </div>
              ))}
            </div>

          </div>
        </div>

        {/* Transition CTA to entry service */}
        <div className="w-full flex flex-col items-center justify-center text-center py-12 border-t border-hairline/45 max-w-5xl mt-8">
          <span className="text-micro font-mono text-brass-accent font-bold tracking-widest uppercase mb-3">
            ARCHITECTURAL SCOPE
          </span>
          <h4 className="text-[1.2rem] sm:text-[1.4rem] font-bold text-primary-text font-display leading-tight mb-2 uppercase">
            Don&apos;t know which system you need?
          </h4>
          <p className="text-body-base text-muted-text max-w-md font-semibold mb-6">
            That&apos;s the point of the audit. We map your tools and data flows to design the correct architecture for your team.
          </p>
          
          <Link
            href="/scoping?type=audit"
            className="group inline-flex items-center justify-center text-[0.88rem] font-bold text-primary-text hover:text-white bg-transparent hover:bg-brass-accent border border-primary-text hover:border-brass-accent transition-all duration-300 py-3.5 px-7 rounded-xl shadow-sm hover:shadow-md transform active:scale-98"
          >
            START A STRATEGY AUDIT
            <span className="ml-2 transform group-hover:translate-x-1 transition-transform duration-300">→</span>
          </Link>
        </div>

      </div>
    </section>
  );
}
