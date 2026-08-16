"use client";

import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import Link from "next/link";

interface ScenarioItem {
  id: number;
  category: string;
  title: string;
  problem: string;
  system: string;
  outcome: string;
  components: string[];
}

export default function Scenarios() {
  const [hoveredIdx, setHoveredIdx] = useState<number | null>(null);
  const [industry, setIndustry] = useState<string | null>(null);

  useEffect(() => {
    if (typeof window !== "undefined") {
      const params = new URLSearchParams(window.location.search);
      const ind = params.get("industry");
      if (ind) setIndustry(ind.toLowerCase());
    }
  }, []);

  const scenarios: ScenarioItem[] = [
    {
      id: 0,
      category: "RECRUITMENT",
      title: "CANDIDATE INTELLIGENCE SYSTEM",
      problem: "Recruiters receive candidate information across job descriptions, applications, resumes, spreadsheets, and communication channels.",
      system: "Job descriptions + candidate data → structured candidate profiles → AI ranking → summaries → qualification workflow → recruiter review",
      outcome: "Recruiters spend less time manually sorting candidates and more time making hiring decisions.",
      components: ["AI classification", "Database", "Scoring logic", "Recruiter dashboard", "Automated communication"]
    },
    {
      id: 1,
      category: "SALES",
      title: "SALES OPERATIONS SYSTEM",
      problem: "Leads get stuck or details get lost as sales teams manually copy lead profiles, qualification data, and updates across spreadsheets and disconnected channels.",
      system: "Lead capture → qualification → enrichment → follow-up → CRM update → reporting",
      outcome: "Leads move through the pipeline without operators repeatedly copying information between tools.",
      components: ["Lead ingestion", "CRM integration", "Automation", "Qualification logic", "Reporting"]
    },
    {
      id: 2,
      category: "OPERATIONS",
      title: "OPERATIONS CONTROL CENTER",
      problem: "Operators run regional dispatch, scheduling, and logistics via multiple fragmented streams of spreadsheets, emails, WhatsApp messages, and manual follow-ups.",
      system: "Structured database → centralized operational state → automated triggers → operator dashboard → alerts",
      outcome: "Operators can see what is happening, what requires attention, and what has already been handled.",
      components: ["Database", "Internal dashboard", "Automation", "Notifications", "Integration layer"]
    },
    {
      id: 3,
      category: "CUSTOMER SUPPORT",
      title: "SUPPORT COPILOT",
      problem: "Support queues clog up with repetitive tickets and information requests, slowing down resolution times and exhausting operators.",
      system: "Customer request → AI classification → information retrieval → suggested resolution → human escalation when required → resolution logging",
      outcome: "Routine support work is handled automatically while complex cases remain with humans.",
      components: ["AI agent", "Knowledge retrieval", "Ticket integration", "Escalation logic", "Conversation logging"]
    }
  ];

  // Reorder index based on industry parameters
  let orderedScenarios = [...scenarios];
  if (industry === "recruitment") {
    // 01 Recruitment (0), 02 Sales (1), 03 Operations (2), 04 Support (3)
    orderedScenarios = [scenarios[0], scenarios[1], scenarios[2], scenarios[3]];
  } else if (industry === "logistics") {
    // 01 Operations (2), 02 Sales (1), 03 Recruitment (0), 04 Support (3)
    orderedScenarios = [scenarios[2], scenarios[1], scenarios[0], scenarios[3]];
  } else if (industry === "professional-services" || industry === "services" || industry === "professional") {
    // 01 Sales (1), 02 Operations (2), 03 Support (3), 04 Recruitment (0)
    orderedScenarios = [scenarios[1], scenarios[2], scenarios[3], scenarios[0]];
  } else if (industry === "agencies") {
    // 01 Sales (1), 02 Operations (2), 03 Support (3), 04 Recruitment (0)
    orderedScenarios = [scenarios[1], scenarios[2], scenarios[3], scenarios[0]];
  } else if (industry === "saas") {
    // 01 Sales (1), 02 Support (3), 03 Operations (2), 04 Recruitment (0)
    orderedScenarios = [scenarios[1], scenarios[3], scenarios[2], scenarios[0]];
  }

  const renderDiagram = (id: number, isHovered: boolean) => {
    const strokeOpacity = isHovered ? "0.6" : "0.2";
    const fillOpacity = isHovered ? "0.08" : "0.02";
    const strokeDash = isHovered ? "4 4" : "none";
    const strokeColor = isHovered ? "#2e5b94" : "#cbd5e1";
    const highlightColor = isHovered ? "#2e5b94" : "#0f172a";

    // Animated CSS styles added directly into each SVG
    const animateStyles = (
      <style>
        {`
          @keyframes flowDash {
            to { stroke-dashoffset: -20; }
          }
          .animate-flow-${id} {
            stroke-dasharray: 4 4;
            animation: flowDash 1s linear infinite;
          }
          @keyframes nodePulse {
            0%, 100% { fill-opacity: 0.02; }
            50% { fill-opacity: 0.12; }
          }
          .pulse-node-${id} {
            animation: nodePulse 2.5s ease-in-out infinite;
          }
        `}
      </style>
    );

    switch (id) {
      case 0: // RECRUITMENT
        return (
          <svg width="240" height="120" viewBox="0 0 240 120" fill="none" xmlns="http://www.w3.org/2000/svg" className="text-brass-accent">
            {animateStyles}
            
            {/* Input Stack */}
            <rect x="5" y="10" width="55" height="20" rx="3" fill="currentColor" fillOpacity={fillOpacity} stroke={strokeColor} strokeWidth="0.75" />
            <text x="32.5" y="22" fill={highlightColor} fontSize="6.5" fontFamily="var(--font-mono), monospace" fontWeight="bold" textAnchor="middle">JOB DATA</text>

            <rect x="5" y="45" width="55" height="20" rx="3" fill="currentColor" fillOpacity={fillOpacity} stroke={strokeColor} strokeWidth="0.75" />
            <text x="32.5" y="57" fill={highlightColor} fontSize="6.5" fontFamily="var(--font-mono), monospace" fontWeight="bold" textAnchor="middle">RESUMES</text>

            <rect x="5" y="80" width="55" height="20" rx="3" fill="currentColor" fillOpacity={fillOpacity} stroke={strokeColor} strokeWidth="0.75" />
            <text x="32.5" y="92" fill={highlightColor} fontSize="6.5" fontFamily="var(--font-mono), monospace" fontWeight="bold" textAnchor="middle">CHATS</text>

            {/* Connecting flows */}
            <path d="M60 20 L 90 60" stroke={strokeColor} strokeWidth="0.75" className={isHovered ? `animate-flow-${id}` : ""} />
            <path d="M60 55 L 90 60" stroke={strokeColor} strokeWidth="0.75" className={isHovered ? `animate-flow-${id}` : ""} />
            <path d="M60 90 L 90 60" stroke={strokeColor} strokeWidth="0.75" className={isHovered ? `animate-flow-${id}` : ""} />

            {/* Process Node */}
            <rect x="90" y="42" width="60" height="36" rx="4" fill="currentColor" fillOpacity={isHovered ? "0.1" : "0.03"} stroke={strokeColor} strokeWidth="1" className={isHovered ? `pulse-node-${id}` : ""} />
            <text x="120" y="60" fill="#0f172a" fontSize="7" fontFamily="var(--font-mono), monospace" fontWeight="bold" textAnchor="middle">AI SCORING</text>
            <text x="120" y="69" fill="#2e5b94" fontSize="5.5" fontFamily="var(--font-sans), sans-serif" fontWeight="bold" textAnchor="middle">QUALIFICATION</text>

            {/* Process to Output */}
            <path d="M150 60 L 175 60" stroke={strokeColor} strokeWidth="0.75" className={isHovered ? `animate-flow-${id}` : ""} />
            <polygon points="175,60 171,57 171,63" fill={isHovered ? "#2e5b94" : "#94a3b8"} />

            {/* Output Node */}
            <rect x="175" y="45" width="60" height="30" rx="4" fill="currentColor" fillOpacity={fillOpacity} stroke={strokeColor} strokeWidth="0.75" />
            <text x="205" y="63" fill={highlightColor} fontSize="6.5" fontFamily="var(--font-mono), monospace" fontWeight="bold" textAnchor="middle">RECRUITER</text>
          </svg>
        );

      case 1: // SALES
        return (
          <svg width="240" height="120" viewBox="0 0 240 120" fill="none" xmlns="http://www.w3.org/2000/svg" className="text-brass-accent">
            {animateStyles}
            
            {/* Linear horizontal system flow split */}
            <rect x="5" y="45" width="38" height="28" rx="3" fill="currentColor" fillOpacity={fillOpacity} stroke={strokeColor} strokeWidth="0.75" />
            <text x="24" y="62" fill={highlightColor} fontSize="7" fontFamily="var(--font-mono), monospace" fontWeight="bold" textAnchor="middle">LEAD</text>

            <path d="M43 59 H 58" stroke={strokeColor} strokeWidth="0.75" className={isHovered ? `animate-flow-${id}` : ""} />

            <rect x="58" y="45" width="46" height="28" rx="3" fill="currentColor" fillOpacity={fillOpacity} stroke={strokeColor} strokeWidth="0.75" />
            <text x="81" y="62" fill={highlightColor} fontSize="7" fontFamily="var(--font-mono), monospace" fontWeight="bold" textAnchor="middle">QUALIFY</text>

            <path d="M104 59 H 118" stroke={strokeColor} strokeWidth="0.75" className={isHovered ? `animate-flow-${id}` : ""} />

            <rect x="118" y="45" width="46" height="28" rx="3" fill="currentColor" fillOpacity={fillOpacity} stroke={strokeColor} strokeWidth="0.75" />
            <text x="141" y="62" fill={highlightColor} fontSize="7" fontFamily="var(--font-mono), monospace" fontWeight="bold" textAnchor="middle">ENRICH</text>

            {/* Split flows to CRM and Automated follow-up */}
            <path d="M164 59 L 180 35" stroke={strokeColor} strokeWidth="0.75" className={isHovered ? `animate-flow-${id}` : ""} />
            <path d="M164 59 L 180 85" stroke={strokeColor} strokeWidth="0.75" className={isHovered ? `animate-flow-${id}` : ""} />

            {/* Target 1: CRM */}
            <rect x="180" y="20" width="55" height="24" rx="3" fill="currentColor" fillOpacity={isHovered ? "0.08" : "0.02"} stroke={strokeColor} strokeWidth="0.75" />
            <text x="207.5" y="34" fill="#0f172a" fontSize="6.5" fontFamily="var(--font-mono), monospace" fontWeight="bold" textAnchor="middle">CRM SYNC</text>

            {/* Target 2: Follow up */}
            <rect x="180" y="75" width="55" height="24" rx="3" fill="currentColor" fillOpacity={isHovered ? "0.08" : "0.02"} stroke={strokeColor} strokeWidth="0.75" />
            <text x="207.5" y="89" fill="#2e5b94" fontSize="6.5" fontFamily="var(--font-mono), monospace" fontWeight="bold" textAnchor="middle">ROUTING</text>
          </svg>
        );

      case 2: // OPERATIONS
        return (
          <svg width="240" height="120" viewBox="0 0 240 120" fill="none" xmlns="http://www.w3.org/2000/svg" className="text-brass-accent">
            {animateStyles}
            
            {/* Chaotic streams converging to a structured database */}
            <rect x="5" y="10" width="50" height="20" rx="3" fill="currentColor" fillOpacity={fillOpacity} stroke={strokeColor} strokeWidth="0.75" />
            <text x="30" y="22" fill={highlightColor} fontSize="6.5" fontFamily="var(--font-mono), monospace" fontWeight="bold" textAnchor="middle">EMAIL</text>

            <rect x="5" y="45" width="50" height="20" rx="3" fill="currentColor" fillOpacity={fillOpacity} stroke={strokeColor} strokeWidth="0.75" />
            <text x="30" y="57" fill={highlightColor} fontSize="6.5" fontFamily="var(--font-mono), monospace" fontWeight="bold" textAnchor="middle">WHATSAPP</text>

            <rect x="5" y="80" width="50" height="20" rx="3" fill="currentColor" fillOpacity={fillOpacity} stroke={strokeColor} strokeWidth="0.75" />
            <text x="30" y="92" fill={highlightColor} fontSize="6.5" fontFamily="var(--font-mono), monospace" fontWeight="bold" textAnchor="middle">SHEETS</text>

            {/* Flow to Database */}
            <path d="M55 20 L 85 60" stroke={strokeColor} strokeWidth="0.75" className={isHovered ? `animate-flow-${id}` : ""} />
            <path d="M55 55 H 85" stroke={strokeColor} strokeWidth="0.75" className={isHovered ? `animate-flow-${id}` : ""} />
            <path d="M55 90 L 85 60" stroke={strokeColor} strokeWidth="0.75" className={isHovered ? `animate-flow-${id}` : ""} />

            {/* Central DB */}
            <rect x="85" y="42" width="65" height="36" rx="4" fill="currentColor" fillOpacity={isHovered ? "0.1" : "0.03"} stroke={strokeColor} strokeWidth="1" className={isHovered ? `pulse-node-${id}` : ""} />
            <text x="117.5" y="60" fill="#0f172a" fontSize="7" fontFamily="var(--font-mono), monospace" fontWeight="bold" textAnchor="middle">OPS DATABASE</text>
            <text x="117.5" y="69" fill="#2e5b94" fontSize="5.5" fontFamily="var(--font-sans), sans-serif" fontWeight="bold" textAnchor="middle">CENTRAL STATE</text>

            {/* DB to dashboard and triggers */}
            <path d="M150 60 L 175 35" stroke={strokeColor} strokeWidth="0.75" className={isHovered ? `animate-flow-${id}` : ""} />
            <path d="M150 60 L 175 85" stroke={strokeColor} strokeWidth="0.75" className={isHovered ? `animate-flow-${id}` : ""} />

            {/* Triggers */}
            <rect x="175" y="20" width="60" height="24" rx="3" fill="currentColor" fillOpacity={fillOpacity} stroke={strokeColor} strokeWidth="0.75" />
            <text x="205" y="34" fill={highlightColor} fontSize="6.5" fontFamily="var(--font-mono), monospace" fontWeight="bold" textAnchor="middle">TRIGGERS</text>

            {/* Dashboard */}
            <rect x="175" y="75" width="60" height="24" rx="3" fill="currentColor" fillOpacity={fillOpacity} stroke={strokeColor} strokeWidth="0.75" />
            <text x="205" y="89" fill={highlightColor} fontSize="6.5" fontFamily="var(--font-mono), monospace" fontWeight="bold" textAnchor="middle">OPERATOR</text>
          </svg>
        );

      case 3: // SUPPORT
        return (
          <svg width="240" height="120" viewBox="0 0 240 120" fill="none" xmlns="http://www.w3.org/2000/svg" className="text-brass-accent">
            {animateStyles}
            
            {/* Customer ticket flow with auto resolve / human split */}
            <rect x="5" y="45" width="45" height="28" rx="3" fill="currentColor" fillOpacity={fillOpacity} stroke={strokeColor} strokeWidth="0.75" />
            <text x="27.5" y="62" fill={highlightColor} fontSize="7" fontFamily="var(--font-mono), monospace" fontWeight="bold" textAnchor="middle">TICKET</text>

            <path d="M50 59 H 65" stroke={strokeColor} strokeWidth="0.75" className={isHovered ? `animate-flow-${id}` : ""} />

            <rect x="65" y="45" width="50" height="28" rx="3" fill="currentColor" fillOpacity={fillOpacity} stroke={strokeColor} strokeWidth="0.75" />
            <text x="90" y="62" fill={highlightColor} fontSize="7" fontFamily="var(--font-mono), monospace" fontWeight="bold" textAnchor="middle">AI TRIAGE</text>

            <path d="M115 59 H 130" stroke={strokeColor} strokeWidth="0.75" className={isHovered ? `animate-flow-${id}` : ""} />

            <rect x="130" y="45" width="48" height="28" rx="3" fill="currentColor" fillOpacity={fillOpacity} stroke={strokeColor} strokeWidth="0.75" />
            <text x="154" y="62" fill={highlightColor} fontSize="7" fontFamily="var(--font-mono), monospace" fontWeight="bold" textAnchor="middle">RETRIEVE</text>

            {/* Split */}
            <path d="M178 59 L 195 32" stroke={strokeColor} strokeWidth="0.75" className={isHovered ? `animate-flow-${id}` : ""} />
            <path d="M178 59 L 195 86" stroke={strokeColor} strokeWidth="0.75" className={isHovered ? `animate-flow-${id}` : ""} />

            {/* Target 1: Auto Resolve */}
            <rect x="195" y="18" width="40" height="24" rx="3" fill="currentColor" fillOpacity={isHovered ? "0.08" : "0.02"} stroke={strokeColor} strokeWidth="0.75" />
            <text x="215" y="32" fill="#2e5b94" fontSize="6.5" fontFamily="var(--font-mono), monospace" fontWeight="bold" textAnchor="middle">RESOLVE</text>

            {/* Target 2: Human Escalation */}
            <rect x="195" y="75" width="40" height="24" rx="3" fill="currentColor" fillOpacity={isHovered ? "0.08" : "0.02"} stroke={strokeColor} strokeWidth="0.75" />
            <text x="215" y="89" fill="#e59393" fontSize="6.5" fontFamily="var(--font-mono), monospace" fontWeight="bold" textAnchor="middle">HUMAN</text>
          </svg>
        );
      default:
        return null;
    }
  };

  return (
    <section id="what-this-can-look-like" className="py-32 px-6 md:px-12 bg-transparent border-t border-hairline relative">
      
      {/* Editorial layout guidelines */}
      <div className="absolute top-0 bottom-0 left-6 md:left-12 w-[1px] bg-hairline/35 pointer-events-none" />

      <div className="max-w-7xl mx-auto w-full relative z-10 pl-4 md:pl-8">
        
        {/* Asymmetric Header Structure */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-start mb-24">
          
          {/* Left Column: Heading */}
          <div className="lg:col-span-5 flex flex-col gap-6">
            <div className="flex flex-col gap-2">
              <span className="text-caption text-brass-accent font-mono tracking-widest font-bold">
                03 / SCENARIOS
              </span>
              <h2 className="text-[2.25rem] md:text-[3.25rem] font-bold tracking-tight text-primary-text leading-[1.0] font-display uppercase">
                WHAT THIS<br />
                CAN LOOK LIKE.
              </h2>
            </div>
            <p className="text-body-l text-muted-text font-semibold leading-relaxed">
              Concrete examples of systems that replace manual handoffs, connect fragmented tools, and give operators more control.
            </p>
          </div>

          {/* Right Column: Every System is Custom disclaimer */}
          <div className="lg:col-span-7 flex flex-col gap-4 border-l border-hairline/35 pl-6 lg:pl-10 lg:mt-8">
            <span className="text-micro font-mono tracking-wider text-brass-accent font-bold uppercase">
              EVERY SYSTEM IS CUSTOM.
            </span>
            <p className="text-body-base text-muted-text leading-relaxed font-semibold max-w-xl">
              These scenarios illustrate patterns we can engineer. The actual architecture depends on the client&apos;s workflow, tools, data, constraints, and operational goals.
            </p>
          </div>

        </div>

        {/* Scenarios Checklist (Casebook style) */}
        <div className="flex flex-col border-t border-hairline/65 max-w-5xl mb-24">
          {orderedScenarios.map((item, displayIdx) => (
            <div key={item.id} className="border-b border-hairline/65">
              
              {/* Desktop view: Asymmetric Grid with hover state */}
              <div
                onMouseEnter={() => setHoveredIdx(item.id)}
                onMouseLeave={() => setHoveredIdx(null)}
                className="group hidden lg:grid grid-cols-12 gap-8 py-12 items-start cursor-pointer hover:bg-brass-accent/[0.012] transition-colors duration-300 pl-4 pr-6"
              >
                
                {/* Number & Category */}
                <div className="col-span-3 flex flex-col gap-2">
                  <span className="text-micro font-mono text-brass-accent font-bold">
                    0{displayIdx + 1} &mdash;
                  </span>
                  <span className="text-micro font-mono text-muted-text/75 tracking-wider font-bold uppercase group-hover:translate-x-1 transition-transform duration-300">
                    {item.category}
                  </span>
                </div>
                
                {/* Title & Core Problem */}
                <div className="col-span-4 flex flex-col gap-4">
                  <h3 className="text-[1.25rem] font-bold text-primary-text font-display uppercase tracking-tight leading-tight">
                    {item.title}
                  </h3>
                  <div className="flex flex-col gap-2">
                    <span className="text-[0.68rem] font-mono text-muted-text/50 uppercase tracking-widest font-bold">Problem:</span>
                    <p className="text-[0.88rem] text-muted-text font-medium leading-relaxed">
                      {item.problem}
                    </p>
                  </div>
                </div>

                {/* Flow, Blueprint and Outcome */}
                <div className="col-span-5 grid grid-cols-12 gap-6">
                  
                  {/* System flow description and outcome */}
                  <div className="col-span-7 flex flex-col gap-4">
                    <div className="flex flex-col gap-1">
                      <span className="text-[0.68rem] font-mono text-brass-accent uppercase tracking-widest font-bold">Operational Flow:</span>
                      <p className="text-[0.82rem] text-muted-text font-semibold leading-relaxed">
                        {item.system}
                      </p>
                    </div>

                    {/* System Impact Outcome statement */}
                    <div className="border-t border-hairline/35 pt-4 mt-2 flex flex-col gap-1 bg-brass-accent/[0.01] p-3 rounded-lg border border-hairline/15">
                      <span className="text-[0.68rem] font-mono text-primary-text uppercase tracking-widest font-bold">SYSTEM IMPACT</span>
                      <p className="text-[0.82rem] text-muted-text font-bold leading-normal">
                        {item.outcome}
                      </p>
                    </div>
                  </div>

                  {/* Custom animated diagram */}
                  <div className="col-span-5 flex items-center justify-end h-full">
                    {renderDiagram(item.id, hoveredIdx === item.id)}
                  </div>

                </div>

              </div>

              {/* Mobile view: Stack layout */}
              <div className="lg:hidden p-6 flex flex-col gap-6 bg-slate-50/20">
                <div className="flex items-center gap-2 border-b border-hairline/35 pb-3">
                  <span className="text-micro font-mono text-brass-accent font-bold">0{displayIdx + 1}</span>
                  <span className="text-micro font-mono text-muted-text tracking-widest font-bold uppercase">&bull; {item.category}</span>
                </div>

                <div className="flex flex-col gap-1">
                  <h3 className="text-[1.15rem] font-bold text-primary-text font-display uppercase tracking-tight">
                    {item.title}
                  </h3>
                  <p className="text-[0.88rem] text-muted-text font-medium leading-relaxed mt-2">
                    {item.problem}
                  </p>
                </div>

                {/* Mobile System Flow */}
                <div className="flex flex-col gap-1.5 bg-white border border-hairline/30 p-4 rounded-xl shadow-sm">
                  <span className="text-[0.68rem] font-mono text-brass-accent uppercase tracking-widest font-bold">Operational Flow:</span>
                  <p className="text-[0.82rem] text-muted-text font-semibold leading-relaxed">
                    {item.system}
                  </p>
                </div>

                {/* Vertical visual diagram */}
                <div className="flex justify-center py-4 border-y border-hairline/35">
                  {renderDiagram(item.id, true)}
                </div>

                {/* Mobile System Impact */}
                <div className="flex flex-col gap-1 bg-brass-accent/5 p-4 rounded-xl border border-brass-accent/10">
                  <span className="text-[0.68rem] font-mono text-primary-text uppercase tracking-widest font-bold">SYSTEM IMPACT</span>
                  <p className="text-[0.85rem] text-muted-text font-bold leading-normal">
                    {item.outcome}
                  </p>
                </div>

              </div>

            </div>
          ))}
        </div>

        {/* Bottom Strategy & Operations Audit Transition CTA */}
        <div className="w-full flex flex-col items-center justify-center text-center py-12 border-t border-hairline/45 max-w-5xl mt-8">
          <span className="text-micro font-mono text-brass-accent font-bold tracking-widest uppercase mb-3">
            DIAGNOSTICS & PATTERNS
          </span>
          <h4 className="text-[1.2rem] sm:text-[1.4rem] font-bold text-primary-text font-display leading-tight mb-2 uppercase">
            HAVE A DIFFERENT PROBLEM?
          </h4>
          <p className="text-body-base text-muted-text max-w-md font-semibold mb-6">
            That&apos;s exactly why we start with the audit.
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
