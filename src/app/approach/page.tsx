"use client";

import React, { useEffect, useRef, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Navigation from "@/components/Navigation";
import Footer from "@/components/Footer";
import Link from "next/link";

interface Stage {
  num: string;
  label: string;
  headline: string;
  description: string;
  inputs: string[];
  output: string;
  outputDetails: string[];
}

export default function ApproachPage() {
  const [activeStage, setActiveStage] = useState(0);
  const [hoveredDeliv, setHoveredDeliv] = useState<number | null>(null);

  // References for scroll tracking
  const card0 = useRef<HTMLDivElement>(null);
  const card1 = useRef<HTMLDivElement>(null);
  const card2 = useRef<HTMLDivElement>(null);
  const card3 = useRef<HTMLDivElement>(null);
  const card4 = useRef<HTMLDivElement>(null);

  const cardRefs = [card0, card1, card2, card3, card4];

  useEffect(() => {
    const observerOptions = {
      root: null,
      rootMargin: "-30% 0px -40% 0px", // vertical center trigger zone
      threshold: 0.1,
    };

    const observerCallback = (entries: IntersectionObserverEntry[]) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          const index = Number(entry.target.getAttribute("data-index"));
          if (!isNaN(index)) {
            setActiveStage(index);
          }
        }
      });
    };

    const observer = new IntersectionObserver(observerCallback, observerOptions);
    cardRefs.forEach((ref) => {
      if (ref.current) observer.observe(ref.current);
    });

    return () => {
      cardRefs.forEach((ref) => {
        if (ref.current) observer.unobserve(ref.current);
      });
    };
  }, []);

  const stages: Stage[] = [
    {
      num: "01",
      label: "UNDERSTAND",
      headline: "Understand the operation before changing it.",
      description: "Research your team's workflow, bottlenecks, manual operations, and existing tools.",
      inputs: [
        "Shadowing sessions",
        "Team interviews",
        "Existing spreadsheets",
        "Existing tools"
      ],
      output: "Operational Map",
      outputDetails: [
        "Existing workflows",
        "People involved",
        "Tools used",
        "Handoffs",
        "Friction points"
      ]
    },
    {
      num: "02",
      label: "FIND",
      headline: "Locate where time and money are being lost.",
      description: "Identify the exact points where manual work, duplication, delays, and operational leakage occur.",
      inputs: [
        "Time logs",
        "Process tracking",
        "Manual handoff data"
      ],
      output: "Diagnostic Report",
      outputDetails: [
        "Bottlenecks",
        "Repeated work",
        "Operational leakage",
        "High-impact opportunities"
      ]
    },
    {
      num: "03",
      label: "DESIGN",
      headline: "Design the system around the actual problem.",
      description: "Translate the diagnosed bottlenecks into a technical architecture and implementation plan.",
      inputs: [
        "Identified bottlenecks",
        "Database requirements",
        "Stack constraints"
      ],
      output: "Architecture Blueprint",
      outputDetails: [
        "System components",
        "Data flows",
        "Integrations",
        "Database structure",
        "Implementation priorities"
      ]
    },
    {
      num: "04",
      label: "BUILD",
      headline: "Build only what the operation actually needs.",
      description: "Write code, construct databases, configure automations, connect APIs, and test the system with real operators.",
      inputs: [
        "Approved architecture",
        "Target APIs",
        "Database schemas"
      ],
      output: "Working System",
      outputDetails: [
        "Tested",
        "Documented",
        "Deployed",
        "Ready for operator review"
      ]
    },
    {
      num: "05",
      label: "IMPROVE",
      headline: "Keep the system aligned as the business changes.",
      description: "Use real-world usage, feedback, and system performance to continuously refine the infrastructure.",
      inputs: [
        "Usage metrics",
        "User feedback",
        "System performance"
      ],
      output: "Continuous Optimization",
      outputDetails: [
        "System health reviews",
        "Improvements",
        "New automations",
        "Feature upgrades",
        "Maintenance"
      ]
    }
  ];

  const renderStageDiagram = (stageIdx: number, size = 150) => {
    const strokeColor = "#2e5b94";
    const warnColor = "#e59393";
    const mutedStroke = "#cbd5e1";
    
    const animateStyles = (
      <style>
        {`
          @keyframes dashMove {
            to { stroke-dashoffset: -12; }
          }
          .crawl-dash {
            stroke-dasharray: 3 3;
            animation: dashMove 0.8s linear infinite;
          }
          @keyframes glowPulse {
            0%, 100% { stroke-opacity: 0.3; fill-opacity: 0.05; }
            50% { stroke-opacity: 0.8; fill-opacity: 0.15; }
          }
          .glow-node {
            animation: glowPulse 2s ease-in-out infinite;
          }
        `}
      </style>
    );

    switch (stageIdx) {
      case 0: // MESSY WORKFLOW
        return (
          <svg width={size} height={size} viewBox="0 0 160 160" fill="none" xmlns="http://www.w3.org/2000/svg" className="text-brass-accent">
            {animateStyles}
            <circle cx="80" cy="20" r="12" fill="currentColor" fillOpacity="0.05" stroke={strokeColor} strokeWidth="0.75" />
            <text x="80" y="23" fill="#0f172a" fontSize="5.5" fontFamily="var(--font-mono), monospace" fontWeight="bold" textAnchor="middle">TEAM</text>

            <rect x="15" y="65" width="45" height="18" rx="2" fill="currentColor" fillOpacity="0.03" stroke={strokeColor} strokeWidth="0.75" />
            <text x="37.5" y="76" fill="#0f172a" fontSize="5" fontFamily="var(--font-mono), monospace" textAnchor="middle">SHEETS</text>

            <rect x="100" y="65" width="45" height="18" rx="2" fill="currentColor" fillOpacity="0.03" stroke={strokeColor} strokeWidth="0.75" />
            <text x="122.5" y="76" fill="#0f172a" fontSize="5" fontFamily="var(--font-mono), monospace" textAnchor="middle">EMAIL</text>

            <circle cx="80" cy="135" r="14" fill="currentColor" fillOpacity="0.05" stroke={strokeColor} strokeWidth="0.75" />
            <text x="80" y="137" fill="#0f172a" fontSize="5" fontFamily="var(--font-mono), monospace" fontWeight="bold" textAnchor="middle">HANDOFF</text>

            {/* Messy tangled lines */}
            <path d="M72 31 L 37 65" stroke={strokeColor} strokeWidth="0.75" strokeOpacity="0.5" />
            <path d="M88 31 L 122 65" stroke={strokeColor} strokeWidth="0.75" strokeOpacity="0.5" />
            <path d="M37 83 L 70 125" stroke={strokeColor} strokeWidth="0.75" strokeOpacity="0.5" />
            <path d="M122 83 L 90 125" stroke={strokeColor} strokeWidth="0.75" strokeOpacity="0.5" />
            <path d="M60 74 H 100" stroke={strokeColor} strokeWidth="0.75" strokeOpacity="0.3" strokeDasharray="2 2" />
          </svg>
        );

      case 1: // FRICTION DETECTED
        return (
          <svg width={size} height={size} viewBox="0 0 160 160" fill="none" xmlns="http://www.w3.org/2000/svg" className="text-accent-red">
            {animateStyles}
            <circle cx="80" cy="20" r="12" fill="currentColor" fillOpacity="0.05" stroke={mutedStroke} strokeWidth="0.75" />
            <text x="80" y="23" fill="#64748b" fontSize="5.5" fontFamily="var(--font-mono), monospace" textAnchor="middle">TEAM</text>

            {/* Red warning nodes */}
            <rect x="15" y="65" width="45" height="18" rx="2" fill="currentColor" fillOpacity="0.12" stroke={warnColor} strokeWidth="1" className="glow-node" />
            <text x="37.5" y="76" fill={warnColor} fontSize="5" fontFamily="var(--font-mono), monospace" fontWeight="bold" textAnchor="middle">SHEETS ⚠</text>

            <rect x="100" y="65" width="45" height="18" rx="2" fill="currentColor" fillOpacity="0.12" stroke={warnColor} strokeWidth="1" className="glow-node" />
            <text x="122.5" y="76" fill={warnColor} fontSize="5" fontFamily="var(--font-mono), monospace" fontWeight="bold" textAnchor="middle">EMAIL ⚠</text>

            <circle cx="80" cy="135" r="14" fill="currentColor" fillOpacity="0.08" stroke={warnColor} strokeWidth="1" />
            <text x="80" y="137" fill={warnColor} fontSize="5" fontFamily="var(--font-mono), monospace" fontWeight="bold" textAnchor="middle">LEAK ⚠</text>

            <path d="M72 31 L 37 65" stroke={mutedStroke} strokeWidth="0.75" />
            <path d="M88 31 L 122 65" stroke={mutedStroke} strokeWidth="0.75" />
            <path d="M37 83 L 70 125" stroke={warnColor} strokeWidth="1.25" />
            <path d="M122 83 L 90 125" stroke={warnColor} strokeWidth="1.25" />
          </svg>
        );

      case 2: // SYSTEM DESIGNED
        return (
          <svg width={size} height={size} viewBox="0 0 160 160" fill="none" xmlns="http://www.w3.org/2000/svg" className="text-brass-accent">
            <rect x="45" y="15" width="70" height="20" rx="3" fill="currentColor" fillOpacity="0.03" stroke={strokeColor} strokeWidth="0.75" />
            <text x="80" y="27" fill="#0f172a" fontSize="6" fontFamily="var(--font-mono), monospace" fontWeight="bold" textAnchor="middle">INPUT</text>

            <path d="M80 35 V 55" stroke={strokeColor} strokeWidth="0.75" />

            {/* Central structured database layout */}
            <rect x="40" y="55" width="80" height="22" rx="3" fill="currentColor" fillOpacity="0.08" stroke={strokeColor} strokeWidth="1" />
            <text x="80" y="68" fill="#0f172a" fontSize="6" fontFamily="var(--font-mono), monospace" fontWeight="bold" textAnchor="middle">DATABASE</text>

            <path d="M80 77 V 97" stroke={strokeColor} strokeWidth="0.75" />

            <rect x="40" y="97" width="80" height="22" rx="3" fill="currentColor" fillOpacity="0.03" stroke={strokeColor} strokeWidth="0.75" />
            <text x="80" y="110" fill="#0f172a" fontSize="6" fontFamily="var(--font-mono), monospace" fontWeight="bold" textAnchor="middle">AUTOMATION</text>

            <path d="M80 119 V 135" stroke={strokeColor} strokeWidth="0.75" />

            <circle cx="80" cy="141" r="6" fill="currentColor" fillOpacity="0.1" stroke={strokeColor} strokeWidth="0.75" />
          </svg>
        );

      case 3: // SYSTEM BUILT
        return (
          <svg width={size} height={size} viewBox="0 0 160 160" fill="none" xmlns="http://www.w3.org/2000/svg" className="text-brass-accent">
            {animateStyles}
            <rect x="45" y="10" width="70" height="18" rx="3" fill="currentColor" fillOpacity="0.03" stroke={strokeColor} strokeWidth="0.75" />
            <text x="80" y="21" fill="#0f172a" fontSize="5.5" fontFamily="var(--font-mono), monospace" fontWeight="bold" textAnchor="middle">INPUT</text>

            {/* Crawling data flow dashed lines */}
            <path d="M80 28 V 46" stroke={strokeColor} strokeWidth="0.75" className="crawl-dash" />

            <rect x="40" y="46" width="80" height="20" rx="3" fill="currentColor" fillOpacity="0.08" stroke={strokeColor} strokeWidth="1" className="glow-node" />
            <text x="80" y="58" fill="#0f172a" fontSize="5.5" fontFamily="var(--font-mono), monospace" fontWeight="bold" textAnchor="middle">DATABASE</text>

            <path d="M80 66 V 84" stroke={strokeColor} strokeWidth="0.75" className="crawl-dash" />

            <rect x="40" y="84" width="80" height="20" rx="3" fill="currentColor" fillOpacity="0.03" stroke={strokeColor} strokeWidth="0.75" />
            <text x="80" y="96" fill="#0f172a" fontSize="5.5" fontFamily="var(--font-mono), monospace" fontWeight="bold" textAnchor="middle">AUTOMATION</text>

            <path d="M80 104 V 122" stroke={strokeColor} strokeWidth="0.75" className="crawl-dash" />

            <rect x="45" y="122" width="70" height="18" rx="3" fill="currentColor" fillOpacity="0.08" stroke={strokeColor} strokeWidth="0.75" />
            <text x="80" y="133" fill="#0f172a" fontSize="5.5" fontFamily="var(--font-mono), monospace" fontWeight="bold" textAnchor="middle">ACTION</text>
          </svg>
        );

      case 4: // SYSTEM IMPROVING
        return (
          <svg width={size} height={size} viewBox="0 0 160 160" fill="none" xmlns="http://www.w3.org/2000/svg" className="text-brass-accent">
            {animateStyles}
            
            {/* Triangular loop */}
            <rect x="45" y="15" width="70" height="20" rx="3" fill="currentColor" fillOpacity="0.03" stroke={strokeColor} strokeWidth="0.75" />
            <text x="80" y="27" fill="#0f172a" fontSize="6" fontFamily="var(--font-mono), monospace" fontWeight="bold" textAnchor="middle">METRICS</text>

            <rect x="5" y="85" width="65" height="20" rx="3" fill="currentColor" fillOpacity="0.03" stroke={strokeColor} strokeWidth="0.75" />
            <text x="37.5" y="97" fill="#0f172a" fontSize="6" fontFamily="var(--font-mono), monospace" fontWeight="bold" textAnchor="middle">FEEDBACK</text>

            <rect x="90" y="85" width="65" height="20" rx="3" fill="currentColor" fillOpacity="0.05" stroke={strokeColor} strokeWidth="0.75" />
            <text x="122.5" y="97" fill="#0f172a" fontSize="5.5" fontFamily="var(--font-mono), monospace" fontWeight="bold" textAnchor="middle">OPTIMIZE</text>

            {/* Loop connection lines */}
            <path d="M37.5 85 L 80 35" stroke={strokeColor} strokeWidth="0.75" className="crawl-dash" />
            <path d="M80 35 L 122.5 85" stroke={strokeColor} strokeWidth="0.75" className="crawl-dash" />
            <path d="M122.5 105 H 37.5" stroke={strokeColor} strokeWidth="0.75" className="crawl-dash" />

            {/* Circular reload arrow in center */}
            <path d="M74 65 A 7 7 0 1 1 86 65" stroke={strokeColor} strokeWidth="0.75" strokeLinecap="round" />
            <polygon points="86,65 89,61 83,61" fill="#2e5b94" />
          </svg>
        );
      default:
        return null;
    }
  };

  return (
    <div className="flex flex-col min-h-screen bg-transparent text-primary-text font-sans relative">
      
      {/* Navigation */}
      <Navigation />

      {/* Header section with grid overlay backdrop */}
      <header className="relative min-h-[50vh] flex items-center pt-28 pb-12 overflow-hidden bg-charcoal-base">
        
        {/* Subtle grid pattern */}
        <div 
          className="absolute inset-0 opacity-10 mix-blend-overlay z-0"
          style={{
            backgroundImage: `
              linear-gradient(to right, rgba(46, 91, 148, 0.08) 1px, transparent 1px),
              linear-gradient(to bottom, rgba(46, 91, 148, 0.08) 1px, transparent 1px)
            `,
            backgroundSize: "80px 80px"
          }}
        />

        <div className="max-w-7xl mx-auto px-6 md:px-12 w-full flex flex-col gap-6 text-left relative z-10">
          
          <div className="flex flex-col gap-4 items-start max-w-4xl border-l border-brass-accent/30 pl-6 md:pl-10">
            <span className="text-caption text-brass-accent font-mono tracking-widest font-bold">
              04 / METHODOLOGY
            </span>
            <h1 className="text-[2.5rem] sm:text-[3.8rem] md:text-[4.6rem] font-bold tracking-tight text-primary-text leading-[1.0] font-display uppercase">
              WE DON&apos;T START WITH TOOLS.<br />
              WE START WITH THE TRUTH.
            </h1>
            <p className="text-body-l text-muted-text font-semibold leading-relaxed max-w-2xl mt-2">
              Every system we build is preceded by operational research. We map workflows, audit bottlenecks, and identify leaks first — ensuring every build is tied to a real operational need.
            </p>
          </div>

        </div>
      </header>

      {/* 5-Stage Timeline Container */}
      <main className="flex-1 py-12 px-6 md:px-12 relative z-10">
        <div className="max-w-7xl mx-auto w-full">
          
          {/* Asymmetric layout split grid */}
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-start relative">
            
            {/* Left Column (Sticky Sidebar on Desktop) */}
            <div className="lg:col-span-5 lg:sticky lg:top-28 flex flex-col gap-10">
              
              {/* Prominent Philosophy Statement */}
              <div className="border border-hairline/45 bg-slate-50/50 rounded-[2rem] p-8 shadow-sm backdrop-blur-[2px]">
                <span className="text-micro font-mono tracking-wider text-brass-accent font-bold uppercase mb-2 block">
                  CORE BELIEF
                </span>
                <h3 className="text-[1.35rem] font-bold text-primary-text font-display uppercase tracking-tight mb-2">
                  NO BLIND BUILDS.
                </h3>
                <p className="text-[0.92rem] text-muted-text font-semibold leading-relaxed">
                  We do not begin implementation because a client has requested a particular tool. We begin after understanding what is actually broken.
                </p>
              </div>

              {/* Progress indicator link map (01 --- 05) */}
              <div className="flex flex-col gap-3">
                <span className="text-micro font-mono text-muted-text/50 uppercase tracking-widest font-bold">
                  PROGRESS ROADMAP
                </span>
                
                <div className="flex items-center gap-2 bg-white/60 backdrop-blur-md border border-hairline/40 py-2.5 px-4 rounded-full shadow-sm self-start z-20">
                  {stages.map((stage, idx) => (
                    <React.Fragment key={stage.label}>
                      {idx > 0 && <span className="text-slate-300 font-mono text-[0.8rem]">—</span>}
                      <button
                        onClick={() => {
                          cardRefs[idx].current?.scrollIntoView({ behavior: "smooth", block: "center" });
                        }}
                        className={`text-[0.7rem] font-mono font-bold transition-all duration-300 cursor-pointer ${
                          activeStage === idx 
                            ? "text-primary-text scale-110" 
                            : "text-muted-text/55 hover:text-primary-text"
                        }`}
                      >
                        {stage.num} {stage.label}
                      </button>
                    </React.Fragment>
                  ))}
                </div>
              </div>

              {/* Sticky diagram box */}
              <div className="hidden lg:flex flex-col gap-3 border border-hairline/45 bg-secondary-surface/10 rounded-[2rem] p-6 items-center justify-center min-h-[220px] shadow-sm relative">
                <span className="absolute top-4 left-6 text-[0.55rem] font-mono text-muted-text/30 uppercase">
                  Operation Mapping // Stage Model
                </span>
                
                <div className="w-full flex items-center justify-center pt-4">
                  {renderStageDiagram(activeStage, 160)}
                </div>
              </div>

            </div>

            {/* Right Column (Scrolling Stage Cards) */}
            <div className="lg:col-span-7 flex flex-col gap-12 relative pl-2 lg:pl-6">
              
              {/* Vertical line connector in background */}
              <div className="absolute top-12 bottom-12 left-6 sm:left-10 w-[1px] bg-hairline/45 z-0" />

              {stages.map((step, idx) => (
                <div
                  key={step.label}
                  ref={cardRefs[idx]}
                  data-index={idx}
                  className={`p-8 rounded-[2rem] border transition-all duration-300 flex flex-col gap-6 relative overflow-hidden z-10 scroll-mt-36 ${
                    activeStage === idx
                      ? "bg-white border-brass-accent/35 shadow-[0_15px_40px_rgba(46,91,148,0.06)]"
                      : "bg-slate-50/20 border-hairline/35 opacity-60 scale-[0.98]"
                  }`}
                >
                  {/* Step Header */}
                  <div className="flex justify-between items-center">
                    <div className="flex items-center gap-3">
                      <span className={`w-8 h-8 rounded-full flex items-center justify-center text-micro font-mono font-bold ${
                        activeStage === idx ? "bg-brass-accent text-white" : "bg-slate-100 text-muted-text"
                      }`}>
                        {step.num}
                      </span>
                      <span className="text-micro font-mono text-muted-text font-bold">STAGE &mdash;</span>
                    </div>
                    
                    <span className={`text-[0.7rem] font-mono border rounded-full px-3 py-1 font-semibold uppercase tracking-wider ${
                      activeStage === idx 
                        ? "border-brass-accent/20 bg-accent-blue-light/20 text-brass-accent" 
                        : "border-hairline/25 bg-slate-50 text-muted-text"
                    }`}>
                      {step.label}
                    </span>
                  </div>

                  {/* Headline & Description */}
                  <div className="flex flex-col gap-2">
                    <h3 className="text-[1.25rem] sm:text-[1.5rem] font-bold tracking-tight text-primary-text font-display uppercase leading-tight">
                      {step.headline}
                    </h3>
                    <p className="text-[0.92rem] text-muted-text font-semibold leading-relaxed mt-1">
                      {step.description}
                    </p>
                  </div>

                  {/* Inputs and Output details block */}
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 pt-6 border-t border-hairline/35 text-[0.88rem]">
                    
                    {/* Inputs */}
                    <div className="flex flex-col gap-2">
                      <span className="text-[0.68rem] font-mono text-muted-text uppercase tracking-wider font-bold">
                        What we use (Inputs):
                      </span>
                      <ul className="flex flex-col gap-1.5 pl-1.5">
                        {step.inputs.map((inp) => (
                          <li key={inp} className="text-muted-text/80 font-medium flex items-center gap-2">
                            <span className="w-1 h-1 bg-slate-300 rounded-full" />
                            {inp}
                          </li>
                        ))}
                      </ul>
                    </div>

                    {/* Output */}
                    <div className="flex flex-col gap-2 border-t sm:border-t-0 sm:border-l border-hairline/30 pt-4 sm:pt-0 sm:pl-6">
                      <span className="text-[0.68rem] font-mono text-brass-accent uppercase tracking-wider font-bold">
                        What you get (Output):
                      </span>
                      <div className="flex flex-col gap-1.5 pl-1.5">
                        <strong className="text-primary-text font-display uppercase tracking-tight">{step.output}</strong>
                        <ul className="flex flex-col gap-1">
                          {step.outputDetails.map((det) => (
                            <li key={det} className="text-muted-text font-semibold flex items-center gap-2">
                              <span className="w-1 h-1 bg-brass-accent/50 rounded-full" />
                              {det}
                            </li>
                          ))}
                        </ul>
                      </div>
                    </div>

                  </div>

                  {/* Mobile diagram (Rendered inline inside each card on mobile only) */}
                  <div className="lg:hidden mt-4 pt-4 border-t border-hairline/30 flex justify-center w-full">
                    {renderStageDiagram(idx, 150)}
                  </div>

                </div>
              ))}
            </div>

          </div>

          {/* Deliverables Section (Step 6 Rebuild) */}
          <section className="py-24 border-t border-hairline mt-24 flex flex-col gap-12 max-w-5xl">
            
            {/* Header */}
            <div className="flex flex-col gap-4">
              <span className="text-caption text-brass-accent font-mono tracking-widest font-bold">05 / DELIVERABLES</span>
              <h2 className="text-[2.25rem] md:text-[3rem] font-bold text-primary-text font-display uppercase tracking-tight leading-[1.0] max-w-2xl">
                YOU DON&apos;T JUST<br />
                GET RECOMMENDATIONS.
                <span className="block text-brass-accent mt-1">YOU GET THE BLUEPRINT.</span>
              </h2>
              <p className="text-body-l text-muted-text mt-2 font-semibold max-w-2xl">
                Every Strategy & Operations Audit compiles into actionable assets that you own and can use whether you build with Sayagaa or not.
              </p>
            </div>

            {/* Grid of 4 Core Deliverables */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mt-6">
              
              {/* Deliverable 1 */}
              <div
                onMouseEnter={() => setHoveredDeliv(0)}
                onMouseLeave={() => setHoveredDeliv(null)}
                className="group border border-hairline/45 bg-secondary-surface/10 rounded-[2rem] p-8 flex flex-col justify-between gap-6 hover:bg-brass-accent/[0.01] hover:border-brass-accent/35 transition-all duration-300 shadow-sm"
              >
                <div className="flex flex-col gap-3">
                  <span className="text-micro font-mono text-brass-accent font-bold">01 / DOCUMENT</span>
                  <h3 className="text-[1.2rem] font-bold text-primary-text font-display uppercase tracking-tight">
                    BUSINESS RESEARCH MAP
                  </h3>
                  <p className="text-[0.88rem] text-muted-text leading-relaxed font-semibold">
                    A high-fidelity operational map documenting how your team actually works — including workflows, tools, handoffs, dependencies, and operational constraints.
                  </p>
                  
                  {/* You get bullet points */}
                  <div className="flex flex-col gap-1.5 mt-2 border-t border-hairline/25 pt-4">
                    <span className="text-[0.68rem] font-mono text-primary-text uppercase tracking-wider font-bold">YOU GET:</span>
                    <ul className="grid grid-cols-2 gap-2 text-[0.8rem] text-muted-text font-semibold">
                      <li className="flex items-center gap-1.5">&bull; Workflow map</li>
                      <li className="flex items-center gap-1.5">&bull; Key actors</li>
                      <li className="flex items-center gap-1.5">&bull; Tool stack</li>
                      <li className="flex items-center gap-1.5">&bull; Manual steps</li>
                      <li className="flex items-center gap-1.5">&bull; Constraints</li>
                      <li className="flex items-center gap-1.5">&bull; Opportunities</li>
                    </ul>
                  </div>
                </div>

                {/* SVG Visual diagram */}
                <div className="border-t border-hairline/35 pt-4 flex justify-center w-full select-none pointer-events-none h-10 items-center">
                  <svg width="220" height="40" viewBox="0 0 220 40" fill="none" className="text-brass-accent">
                    <rect x="2" y="10" width="30" height="20" rx="2" fill="currentColor" fillOpacity={hoveredDeliv === 0 ? "0.08" : "0.02"} stroke={hoveredDeliv === 0 ? "#2e5b94" : "#cbd5e1"} strokeWidth="0.75" />
                    <text x="17" y="22" fill="#0f172a" fontSize="5" fontFamily="var(--font-mono), monospace" textAnchor="middle">TEAM</text>
                    
                    <line x1="32" y1="20" x2="47" y2="20" stroke={hoveredDeliv === 0 ? "#2e5b94" : "#cbd5e1"} strokeWidth="0.75" />
                    
                    <rect x="47" y="10" width="30" height="20" rx="2" fill="currentColor" fillOpacity={hoveredDeliv === 0 ? "0.08" : "0.02"} stroke={hoveredDeliv === 0 ? "#2e5b94" : "#cbd5e1"} strokeWidth="0.75" />
                    <text x="62" y="22" fill="#0f172a" fontSize="5" fontFamily="var(--font-mono), monospace" textAnchor="middle">WORK</text>
                    
                    <line x1="77" y1="20" x2="92" y2="20" stroke={hoveredDeliv === 0 ? "#2e5b94" : "#cbd5e1"} strokeWidth="0.75" />
                    
                    <rect x="92" y="10" width="35" height="20" rx="2" fill="currentColor" fillOpacity={hoveredDeliv === 0 ? "0.08" : "0.02"} stroke={hoveredDeliv === 0 ? "#2e5b94" : "#cbd5e1"} strokeWidth="0.75" />
                    <text x="109.5" y="22" fill="#0f172a" fontSize="5" fontFamily="var(--font-mono), monospace" textAnchor="middle">HANDOFF</text>
                    
                    <line x1="127" y1="20" x2="142" y2="20" stroke={hoveredDeliv === 0 ? "#2e5b94" : "#cbd5e1"} strokeWidth="0.75" />
                    
                    <rect x="142" y="10" width="30" height="20" rx="2" fill="currentColor" fillOpacity={hoveredDeliv === 0 ? "0.08" : "0.02"} stroke={hoveredDeliv === 0 ? "#2e5b94" : "#cbd5e1"} strokeWidth="0.75" />
                    <text x="157" y="22" fill="#0f172a" fontSize="5" fontFamily="var(--font-mono), monospace" textAnchor="middle">TOOL</text>
                    
                    <line x1="172" y1="20" x2="187" y2="20" stroke={hoveredDeliv === 0 ? "#e59393" : "#cbd5e1"} strokeWidth="0.75" />
                    
                    <rect x="187" y="10" width="31" height="20" rx="2" fill={hoveredDeliv === 0 ? "rgba(229,147,147,0.12)" : "rgba(229,147,147,0.02)"} stroke={hoveredDeliv === 0 ? "#e59393" : "#cbd5e1"} strokeWidth="0.75" />
                    <text x="202.5" y="22" fill={hoveredDeliv === 0 ? "#e59393" : "#64748b"} fontSize="4.5" fontFamily="var(--font-mono), monospace" fontWeight="bold" textAnchor="middle">LEAK ⚠</text>
                  </svg>
                </div>
              </div>

              {/* Deliverable 2 */}
              <div
                onMouseEnter={() => setHoveredDeliv(1)}
                onMouseLeave={() => setHoveredDeliv(null)}
                className="group border border-hairline/45 bg-secondary-surface/10 rounded-[2rem] p-8 flex flex-col justify-between gap-6 hover:bg-brass-accent/[0.01] hover:border-brass-accent/35 transition-all duration-300 shadow-sm"
              >
                <div className="flex flex-col gap-3">
                  <span className="text-micro font-mono text-brass-accent font-bold">02 / ARCHITECTURE</span>
                  <h3 className="text-[1.2rem] font-bold text-primary-text font-display uppercase tracking-tight">
                    SYSTEM NODE DIAGRAMS
                  </h3>
                  <p className="text-[0.88rem] text-muted-text leading-relaxed font-semibold">
                    Detailed architecture diagrams showing how data, people, files, systems, and integrations should interact.
                  </p>
                  
                  {/* You get bullet points */}
                  <div className="flex flex-col gap-1.5 mt-2 border-t border-hairline/25 pt-4">
                    <span className="text-[0.68rem] font-mono text-primary-text uppercase tracking-wider font-bold">YOU GET:</span>
                    <ul className="grid grid-cols-2 gap-2 text-[0.8rem] text-muted-text font-semibold">
                      <li className="flex items-center gap-1.5">&bull; Data flows</li>
                      <li className="flex items-center gap-1.5">&bull; App components</li>
                      <li className="flex items-center gap-1.5">&bull; API integrations</li>
                      <li className="flex items-center gap-1.5">&bull; Database logic</li>
                      <li className="flex items-center gap-1.5">&bull; User interfaces</li>
                      <li className="flex items-center gap-1.5">&bull; Tech blueprints</li>
                    </ul>
                  </div>
                </div>

                {/* SVG Visual diagram */}
                <div className="border-t border-hairline/35 pt-4 flex justify-center w-full select-none pointer-events-none h-10 items-center">
                  <svg width="220" height="40" viewBox="0 0 220 40" fill="none" className="text-brass-accent">
                    <rect x="2" y="10" width="28" height="20" rx="2" fill="currentColor" fillOpacity={hoveredDeliv === 1 ? "0.08" : "0.02"} stroke={hoveredDeliv === 1 ? "#2e5b94" : "#cbd5e1"} strokeWidth="0.75" />
                    <text x="16" y="22" fill="#0f172a" fontSize="5" fontFamily="var(--font-mono), monospace" textAnchor="middle">USER</text>
                    
                    <line x1="30" y1="20" x2="45" y2="20" stroke={hoveredDeliv === 1 ? "#2e5b94" : "#cbd5e1"} strokeWidth="0.75" />
                    
                    <rect x="45" y="10" width="22" height="20" rx="2" fill="currentColor" fillOpacity={hoveredDeliv === 1 ? "0.08" : "0.02"} stroke={hoveredDeliv === 1 ? "#2e5b94" : "#cbd5e1"} strokeWidth="0.75" />
                    <text x="56" y="22" fill="#0f172a" fontSize="5" fontFamily="var(--font-mono), monospace" textAnchor="middle">UI</text>
                    
                    <line x1="67" y1="20" x2="82" y2="20" stroke={hoveredDeliv === 1 ? "#2e5b94" : "#cbd5e1"} strokeWidth="0.75" />
                    
                    <rect x="82" y="10" width="24" height="20" rx="2" fill="currentColor" fillOpacity={hoveredDeliv === 1 ? "0.08" : "0.02"} stroke={hoveredDeliv === 1 ? "#2e5b94" : "#cbd5e1"} strokeWidth="0.75" />
                    <text x="94" y="22" fill="#0f172a" fontSize="5" fontFamily="var(--font-mono), monospace" textAnchor="middle">APP</text>
                    
                    <line x1="106" y1="20" x2="121" y2="20" stroke={hoveredDeliv === 1 ? "#2e5b94" : "#cbd5e1"} strokeWidth="0.75" />
                    
                    <rect x="121" y="10" width="24" height="20" rx="2" fill="currentColor" fillOpacity={hoveredDeliv === 1 ? "0.08" : "0.02"} stroke={hoveredDeliv === 1 ? "#2e5b94" : "#cbd5e1"} strokeWidth="0.75" />
                    <text x="133" y="22" fill="#0f172a" fontSize="5" fontFamily="var(--font-mono), monospace" textAnchor="middle">DB</text>
                    
                    <line x1="145" y1="20" x2="160" y2="20" stroke={hoveredDeliv === 1 ? "#2e5b94" : "#cbd5e1"} strokeWidth="0.75" />
                    
                    <rect x="160" y="10" width="24" height="20" rx="2" fill="currentColor" fillOpacity={hoveredDeliv === 1 ? "0.08" : "0.02"} stroke={hoveredDeliv === 1 ? "#2e5b94" : "#cbd5e1"} strokeWidth="0.75" />
                    <text x="172" y="22" fill="#0f172a" fontSize="5" fontFamily="var(--font-mono), monospace" textAnchor="middle">API</text>
                    
                    <line x1="184" y1="20" x2="194" y2="20" stroke={hoveredDeliv === 1 ? "#2e5b94" : "#cbd5e1"} strokeWidth="0.75" />
                    
                    <rect x="194" y="10" width="24" height="20" rx="2" fill="currentColor" fillOpacity={hoveredDeliv === 1 ? "0.08" : "0.02"} stroke={hoveredDeliv === 1 ? "#2e5b94" : "#cbd5e1"} strokeWidth="0.75" />
                    <text x="206" y="22" fill="#0f172a" fontSize="5" fontFamily="var(--font-mono), monospace" textAnchor="middle">EXT</text>
                  </svg>
                </div>
              </div>

              {/* Deliverable 3 */}
              <div
                onMouseEnter={() => setHoveredDeliv(2)}
                onMouseLeave={() => setHoveredDeliv(null)}
                className="group border border-hairline/45 bg-secondary-surface/10 rounded-[2rem] p-8 flex flex-col justify-between gap-6 hover:bg-brass-accent/[0.01] hover:border-brass-accent/35 transition-all duration-300 shadow-sm"
              >
                <div className="flex flex-col gap-3">
                  <span className="text-micro font-mono text-brass-accent font-bold">03 / METRICS</span>
                  <h3 className="text-[1.2rem] font-bold text-primary-text font-display uppercase tracking-tight">
                    PAIN & SEVERITY MATRIX
                  </h3>
                  <p className="text-[0.88rem] text-muted-text leading-relaxed font-semibold">
                    An analytical breakdown of where time, money, and operational capacity are being lost.
                  </p>
                  
                  {/* You get bullet points */}
                  <div className="flex flex-col gap-1.5 mt-2 border-t border-hairline/25 pt-4">
                    <span className="text-[0.68rem] font-mono text-primary-text uppercase tracking-wider font-bold">YOU GET:</span>
                    <ul className="grid grid-cols-2 gap-2 text-[0.8rem] text-muted-text font-semibold">
                      <li className="flex items-center gap-1.5">&bull; Friction tags</li>
                      <li className="flex items-center gap-1.5">&bull; Frequency rate</li>
                      <li className="flex items-center gap-1.5">&bull; Time leakage</li>
                      <li className="flex items-center gap-1.5">&bull; Severity index</li>
                      <li className="flex items-center gap-1.5">&bull; Task dependencies</li>
                      <li className="flex items-center gap-1.5">&bull; Priority scores</li>
                    </ul>
                  </div>
                </div>

                {/* SVG Visual diagram */}
                <div className="border-t border-hairline/35 pt-4 flex justify-center w-full select-none pointer-events-none h-12 items-center">
                  <svg width="220" height="50" viewBox="0 0 220 50" fill="none" className="text-brass-accent">
                    <line x1="0" y1="12" x2="220" y2="12" stroke="#cbd5e1" strokeWidth="0.75" />
                    <line x1="0" y1="24" x2="220" y2="24" stroke="#cbd5e1" strokeWidth="0.75" />
                    <line x1="0" y1="36" x2="220" y2="36" stroke="#cbd5e1" strokeWidth="0.75" />
                    
                    <text x="5" y="8" fill="#64748b" fontSize="4.5" fontFamily="var(--font-mono), monospace" fontWeight="bold">FRICTION</text>
                    <text x="110" y="8" fill="#64748b" fontSize="4.5" fontFamily="var(--font-mono), monospace" fontWeight="bold">FREQ</text>
                    <text x="150" y="8" fill="#64748b" fontSize="4.5" fontFamily="var(--font-mono), monospace" fontWeight="bold">IMPACT</text>
                    <text x="190" y="8" fill="#64748b" fontSize="4.5" fontFamily="var(--font-mono), monospace" fontWeight="bold">SEVERITY</text>
                    
                    <rect x="0" y="13" width="220" height="11" fill="currentColor" fillOpacity={hoveredDeliv === 2 ? "0.08" : "0.0"} />
                    <text x="5" y="20" fill={hoveredDeliv === 2 ? "#2e5b94" : "#0f172a"} fontSize="4" fontFamily="var(--font-sans), sans-serif">Manual data entry</text>
                    <text x="110" y="20" fill="#0f172a" fontSize="4" fontFamily="var(--font-mono), monospace">HIGH</text>
                    <text x="150" y="20" fill="#0f172a" fontSize="4" fontFamily="var(--font-mono), monospace">HIGH</text>
                    <text x="190" y="20" fill="#e59393" fontSize="4.5" fontFamily="var(--font-mono), monospace" fontWeight="bold">CRITICAL</text>
                    
                    <rect x="0" y="25" width="220" height="11" fill="currentColor" fillOpacity={hoveredDeliv === 2 ? "0.05" : "0.0"} />
                    <text x="5" y="32" fill={hoveredDeliv === 2 ? "#2e5b94" : "#0f172a"} fontSize="4" fontFamily="var(--font-sans), sans-serif">Duplicate tracking</text>
                    <text x="110" y="32" fill="#0f172a" fontSize="4" fontFamily="var(--font-mono), monospace">HIGH</text>
                    <text x="150" y="32" fill="#0f172a" fontSize="4" fontFamily="var(--font-mono), monospace">MED</text>
                    <text x="190" y="32" fill="#3b82f6" fontSize="4" fontFamily="var(--font-mono), monospace">HIGH</text>
                    
                    <rect x="0" y="37" width="220" height="11" fill="currentColor" fillOpacity={hoveredDeliv === 2 ? "0.05" : "0.0"} />
                    <text x="5" y="44" fill={hoveredDeliv === 2 ? "#2e5b94" : "#0f172a"} fontSize="4" fontFamily="var(--font-sans), sans-serif">Delayed handoffs</text>
                    <text x="110" y="44" fill="#0f172a" fontSize="4" fontFamily="var(--font-mono), monospace">MED</text>
                    <text x="150" y="44" fill="#0f172a" fontSize="4" fontFamily="var(--font-mono), monospace">HIGH</text>
                    <text x="190" y="44" fill="#3b82f6" fontSize="4" fontFamily="var(--font-mono), monospace">HIGH</text>
                  </svg>
                </div>
              </div>

              {/* Deliverable 4 */}
              <div
                onMouseEnter={() => setHoveredDeliv(3)}
                onMouseLeave={() => setHoveredDeliv(null)}
                className="group border border-hairline/45 bg-secondary-surface/10 rounded-[2rem] p-8 flex flex-col justify-between gap-6 hover:bg-brass-accent/[0.01] hover:border-brass-accent/35 transition-all duration-300 shadow-sm"
              >
                <div className="flex flex-col gap-3">
                  <span className="text-micro font-mono text-brass-accent font-bold">04 / IMPLEMENTATION</span>
                  <h3 className="text-[1.2rem] font-bold text-primary-text font-display uppercase tracking-tight">
                    30 / 60 / 90 BUILD ROADMAP
                  </h3>
                  <p className="text-[0.88rem] text-muted-text leading-relaxed font-semibold">
                    A prioritized implementation plan showing what should be automated or built first, what comes next, and what can wait.
                  </p>
                  
                  {/* You get bullet points */}
                  <div className="flex flex-col gap-2 mt-2 border-t border-hairline/25 pt-4 text-[0.82rem] text-muted-text font-semibold">
                    <div className="flex justify-between items-start gap-4">
                      <span className="font-mono text-brass-accent font-bold shrink-0">30 DAYS:</span>
                      <span>Quick wins and high-impact fixes.</span>
                    </div>
                    <div className="flex justify-between items-start gap-4 border-t border-hairline/20 pt-1.5">
                      <span className="font-mono text-brass-accent font-bold shrink-0">60 DAYS:</span>
                      <span>Core system implementation.</span>
                    </div>
                    <div className="flex justify-between items-start gap-4 border-t border-hairline/20 pt-1.5">
                      <span className="font-mono text-brass-accent font-bold shrink-0">90 DAYS:</span>
                      <span>Expansion, optimization, and deeper automation.</span>
                    </div>
                  </div>
                </div>

                {/* SVG Visual diagram */}
                <div className="border-t border-hairline/35 pt-4 flex justify-center w-full select-none pointer-events-none h-10 items-center">
                  <svg width="220" height="40" viewBox="0 0 220 40" fill="none" className="text-brass-accent">
                    <line x1="15" y1="20" x2="205" y2="20" stroke="#cbd5e1" strokeWidth="0.75" />
                    <line x1="15" y1="20" x2={hoveredDeliv === 3 ? "205" : "80"} stroke="#2e5b94" strokeWidth="1.25" style={{ transition: "x2 0.8s ease-in-out" }} />
                    
                    <circle cx="15" cy="20" r="4" fill="#2e5b94" stroke="#2e5b94" strokeWidth="1" />
                    <text x="15" y="34" fill="#0f172a" fontSize="5" fontFamily="var(--font-mono), monospace" fontWeight="bold" textAnchor="middle">30d</text>
                    <text x="15" y="10" fill="#64748b" fontSize="4.5" fontFamily="var(--font-mono), monospace" textAnchor="middle">WINS</text>
                    
                    <circle cx="110" cy="20" r="4" fill={hoveredDeliv === 3 ? "#2e5b94" : "#fff"} stroke="#2e5b94" strokeWidth="1" style={{ transition: "fill 0.4s" }} />
                    <text x="110" y="34" fill="#0f172a" fontSize="5" fontFamily="var(--font-mono), monospace" fontWeight="bold" textAnchor="middle">60d</text>
                    <text x="110" y="10" fill="#64748b" fontSize="4.5" fontFamily="var(--font-mono), monospace" textAnchor="middle">CORE</text>
                    
                    <circle cx="205" cy="20" r="4" fill={hoveredDeliv === 3 ? "#2e5b94" : "#fff"} stroke="#2e5b94" strokeWidth="1" style={{ transition: "fill 0.6s" }} />
                    <text x="205" y="34" fill="#0f172a" fontSize="5" fontFamily="var(--font-mono), monospace" fontWeight="bold" textAnchor="middle">90d</text>
                    <text x="205" y="10" fill="#64748b" fontSize="4.5" fontFamily="var(--font-mono), monospace" textAnchor="middle">OPTIMIZE</text>
                  </svg>
                </div>
              </div>

            </div>

            {/* Visual Value Cards (Client Owns / Purpose of Audit / What Not to Build) */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mt-12">
              
              {/* Card 1: Client Owns Output */}
              <div className="md:col-span-1 border border-hairline/45 bg-slate-50/40 rounded-[2rem] p-8 flex flex-col gap-4 shadow-sm">
                <span className="text-micro font-mono text-brass-accent font-bold uppercase">
                  TRANSPARENCY
                </span>
                <h4 className="text-[1.1rem] font-bold text-primary-text font-display uppercase tracking-tight">
                  THE CLIENT OWNS THE OUTPUT.
                </h4>
                <p className="text-[0.88rem] text-muted-text leading-relaxed font-semibold">
                  The audit is designed to create clarity before implementation. You leave with a documented understanding of your operation, the highest-impact problems, and a technical plan for what should happen next.
                </p>
              </div>

              {/* Card 2: Value Statement */}
              <div className="md:col-span-1 border border-hairline/45 bg-slate-50/40 rounded-[2rem] p-8 flex flex-col gap-4 shadow-sm">
                <span className="text-micro font-mono text-brass-accent font-bold uppercase">
                  THE PURPOSE OF THE AUDIT
                </span>
                <h4 className="text-[1.1rem] font-bold text-primary-text font-display uppercase tracking-tight">
                  CLARITY FOR TECHNOLOGY DECISIONS.
                </h4>
                <p className="text-[0.88rem] text-muted-text leading-relaxed font-semibold">
                  We don&apos;t produce documents for the sake of it. You leave knowing exactly:
                </p>
                <ul className="flex flex-col gap-1 text-[0.82rem] font-mono text-brass-accent font-bold leading-normal uppercase">
                  <li>&bull; WHAT IS BROKEN.</li>
                  <li>&bull; WHY IT IS BROKEN.</li>
                  <li>&bull; WHAT IT IS COSTING.</li>
                  <li>&bull; WHAT SHOULD BE FIXED FIRST.</li>
                  <li>&bull; WHAT SHOULD BE BUILT.</li>
                  <li>&bull; WHAT DOESN&apos;T NEED TO BE BUILT.</li>
                </ul>
              </div>

              {/* Card 3: What not to build */}
              <div className="md:col-span-1 border border-hairline/45 bg-slate-50/40 rounded-[2rem] p-8 flex flex-col gap-4 shadow-sm">
                <span className="text-micro font-mono text-accent-red font-bold uppercase">
                  EFFICIENCY DISCIPLINE
                </span>
                <h4 className="text-[1.1rem] font-bold text-primary-text font-display uppercase tracking-tight">
                  WHAT NOT TO BUILD.
                </h4>
                <p className="text-[0.88rem] text-muted-text leading-relaxed font-semibold">
                  The audit explicitly identifies solutions that are unnecessary, redundant, or premature. Sayagaa is not incentivized to manufacture complexity or sell redundant builds.
                </p>
              </div>

            </div>

          </section>

          {/* Why this works section (Preserved verbatim from original) */}
          <section className="py-16 border-t border-hairline flex flex-col gap-8">
            <h2 className="text-[1.85rem] font-bold text-primary-text font-display">Why this works.</h2>
            <ul className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <li className="flex gap-3 items-start">
                <span className="text-brass-accent font-bold mt-0.5">&bull;</span>
                <p className="text-[0.95rem] text-muted-text leading-relaxed font-semibold">
                  <strong>No more guessing</strong> which tools or developers to buy. You see the layout plan before writing code.
                </p>
              </li>
              <li className="flex gap-3 items-start">
                <span className="text-accent-red font-bold mt-0.5">&bull;</span>
                <p className="text-[0.95rem] text-muted-text leading-relaxed font-semibold">
                  <strong>Stakeholder alignment</strong> is absolute. We build agreement on what needs fixing before setting a timeline.
                </p>
              </li>
              <li className="flex gap-3 items-start">
                <span className="text-brass-accent font-bold mt-0.5">&bull;</span>
                <p className="text-[0.95rem] text-muted-text leading-relaxed font-semibold">
                  <strong>Revenue protection</strong> is prioritized. We resolve operational leaks and free high-value people from manual tasks first.
                </p>
              </li>
              <li className="flex gap-3 items-start">
                <span className="text-brass-accent font-bold mt-0.5">&bull;</span>
                <p className="text-[0.95rem] text-muted-text leading-relaxed font-semibold">
                  <strong>Tool stack independence</strong>. Partner tools and builds fit into your custom plan, not the other way around.
                </p>
              </li>
            </ul>
          </section>

          {/* Bottom Transition: Step 6 Audit CTA */}
          <div className="w-full flex flex-col items-center justify-center text-center py-16 border-t border-hairline/45 mt-12">
            <span className="text-micro font-mono text-brass-accent font-bold tracking-widest uppercase mb-3">
              GET CLARITY FIRST
            </span>
            <h4 className="text-[1.3rem] sm:text-[1.6rem] font-bold text-primary-text font-display leading-tight mb-2 uppercase select-none">
              READY TO UNDERSTAND THE PROBLEM?
            </h4>
            
            <div className="flex flex-col gap-4 mt-3 items-center justify-center">
              <Link
                href="/scoping?type=audit"
                className="group inline-flex items-center justify-center text-[0.88rem] font-bold text-primary-text hover:text-white bg-transparent hover:bg-brass-accent border border-primary-text hover:border-brass-accent transition-all duration-300 py-4 px-8 rounded-xl shadow-sm hover:shadow-md transform active:scale-98"
              >
                START A STRATEGY AUDIT
                <span className="ml-2 transform group-hover:translate-x-1.5 transition-transform duration-300">→</span>
              </Link>
              
              <span className="text-micro font-mono text-muted-text/60 tracking-wider">
                1–2 weeks &middot; Diagnostic first &middot; No blind builds
              </span>
            </div>
          </div>

        </div>
      </main>

      {/* Footer */}
      <Footer />

    </div>
  );
}
