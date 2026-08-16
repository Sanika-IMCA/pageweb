"use client";

import { motion } from "framer-motion";
import Image from "next/image";
import Link from "next/link";
import { useState } from "react";

interface CaseStudyItem {
  id: string;
  index: string;
  category: string;
  project: string;
  status: string;
  systemBuilt: string;
  description: string;
  problem: string;
  approach: string;
  impact: string;
  image: string;
  altText: string;
  metaResolution: string;
  metaComponent: string;
}

export default function CaseStudies() {
  const [hoveredId, setHoveredId] = useState<string | null>(null);

  const caseStudies: CaseStudyItem[] = [
    {
      id: "outreach",
      index: "01",
      category: "LOGISTICS",
      project: "OUTREACH ENGINE",
      status: "SAYAGAA PROTOTYPE",
      systemBuilt: "Workflow Automation & Dispatch Sequencer",
      description: "Prototype demonstrating automated dispatch routing based on operator availability.",
      problem: "Manual dispatch coordination creates repeated operator handoffs and scheduling delays.",
      approach: "Centralized workflow state machine + automated operator availability routing logic.",
      impact: "Reduced manual coordination and dispatch lag in the prototype workflow.",
      image: "/assets/outreach-engine.png",
      altText: "Outreach Engine campaign sequencer interface displaying multi-step automated dispatch node pathways.",
      metaResolution: "1920x1080 PX",
      metaComponent: "REACT-FLOW // NODE-GRAPH"
    },
    {
      id: "inbox",
      index: "02",
      category: "B2B SERVICES",
      project: "FOUNDER INBOX",
      status: "SAYAGAA PROTOTYPE",
      systemBuilt: "AI Email Agent & CRM Integration Hub",
      description: "Prototype demonstrating semantic email classification, qualification workflows, and CRM synchronization.",
      problem: "Incoming operational emails must be manually sorted, qualified, and updated in the CRM.",
      approach: "LLM semantic triage layer + message parsing integrations + CRM queuing updates.",
      impact: "Eliminated copy-paste tasks and qualified records instantly in testing pipelines.",
      image: "/assets/founder-inbox.png",
      altText: "Founder Inbox UI displaying semantic artificial intelligence triage summaries.",
      metaResolution: "1440x900 PX",
      metaComponent: "OPENAI-API // TAILWIND-UI"
    },
    {
      id: "pipeline",
      index: "03",
      category: "SAAS OPERATIONS",
      project: "SAYAGAA PIPELINE",
      status: "SAYAGAA PROTOTYPE",
      systemBuilt: "High-Volume Lead Pipeline",
      description: "Prototype demonstrating automated lead ingestion, processing, enrichment, and structured pipeline management.",
      problem: "Ingesting lead sheets, verifying contacts, and enriching records is handled via manual imports.",
      approach: "Continuous automated ingestion scripts + third-party enrichment APIs + sanitization rules.",
      impact: "Ingested and enriched contact uploads with zero manual operator intervention in tests.",
      image: "/assets/content-engine.png",
      altText: "Sayagaa Pipeline data compiler analytics displaying route scraping structures.",
      metaResolution: "1920x1200 PX",
      metaComponent: "SUPABASE-DB // API-SCRIPTS"
    },
    {
      id: "auditor",
      index: "04",
      category: "FINANCE & COMPLIANCE",
      project: "BRAND AUDITOR",
      status: "SAYAGAA PROTOTYPE",
      systemBuilt: "Regulatory Document Scan Compiler",
      description: "Prototype demonstrating automated document analysis and visual verification workflows for compliance-oriented operations.",
      problem: "Auditors must manually review regulatory document scans for missing fields and stamps.",
      approach: "OCR document classification + visual verification filters + severity ranking rules.",
      impact: "Scanned and highlighted compliance infractions instantly in testing datasets.",
      image: "/assets/brand-auditor.png",
      altText: "Brand Auditor visual scanner displaying browser capture outputs.",
      metaResolution: "1280x800 PX",
      metaComponent: "VISION-AI // COMPILER-SUITE"
    }
  ];

  return (
    <section id="work" className="relative w-full bg-transparent overflow-hidden">
      
      {/* Header section with grid overlay backdrop */}
      <div className="relative min-h-[50vh] flex items-center pt-28 pb-12 overflow-hidden bg-charcoal-base border-b border-hairline">
        
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
              07 / SELECTED WORK
            </span>
            <h1 className="text-[2.5rem] sm:text-[3.8rem] md:text-[4.6rem] font-bold tracking-tight text-primary-text leading-[1.0] font-display uppercase">
              PROOF<br />
              IN ACTION.
            </h1>
            <p className="text-body-l text-muted-text font-semibold leading-relaxed max-w-2xl mt-2">
              A selection of digital systems, AI workflows, automation pipelines, and operational tools engineered around real problems.
            </p>
            <div className="mt-6 border border-brass-accent/15 bg-brass-accent/[0.02] rounded-2xl p-6 max-w-2xl flex flex-col gap-1.5 backdrop-blur-md">
              <span className="text-[0.68rem] font-mono text-brass-accent font-bold uppercase tracking-wider">
                WE SHOW THE SYSTEM, NOT JUST THE PROMISE.
              </span>
              <p className="text-[0.8rem] text-muted-text font-semibold leading-relaxed">
                Our work is documented through operational problems, system architecture, implementation decisions, and verified outcomes where available. We do not manufacture results or invent client testimonials.
              </p>
            </div>
          </div>

        </div>
      </div>

      {/* Casebook Stack List */}
      <div className="max-w-6xl mx-auto px-6 md:px-12 py-24 flex flex-col gap-24 relative z-10">
        
        <div className="flex flex-col gap-32">
          {caseStudies.map((study) => (
            <div
              key={study.id}
              className="flex flex-col gap-10 border-t border-hairline/65 pt-16 first:border-none first:pt-0"
            >
              
              {/* Case Study Header Grid */}
              <div className="grid grid-cols-1 md:grid-cols-12 gap-4 items-start">
                
                {/* Num & Category */}
                <div className="md:col-span-3 flex flex-col gap-1">
                  <span className="text-micro font-mono text-brass-accent font-bold">
                    0{study.index} / {study.category}
                  </span>
                  
                  {/* Status label tag */}
                  <span className="text-[0.6rem] font-mono text-muted-text bg-slate-100 border border-hairline/45 rounded-md px-2 py-0.5 mt-1 self-start font-bold">
                    {study.status}
                  </span>
                </div>

                {/* Project Title */}
                <div className="md:col-span-5">
                  <h3 className="text-[1.85rem] sm:text-[2.25rem] font-bold tracking-tight text-primary-text font-display leading-[1.0] uppercase">
                    {study.project}
                  </h3>
                  <p className="text-[0.88rem] text-muted-text font-semibold leading-relaxed mt-2.5">
                    {study.description}
                  </p>
                </div>

                {/* System built label */}
                <div className="md:col-span-4 flex flex-col gap-1 md:text-right border-l md:border-l-0 md:border-r border-hairline/40 pl-4 md:pl-0 md:pr-6">
                  <span className="text-[0.68rem] font-mono text-brass-accent uppercase tracking-widest font-bold">
                    SYSTEM BUILT
                  </span>
                  <span className="text-[0.98rem] font-bold text-primary-text font-display uppercase tracking-tight">
                    {study.systemBuilt}
                  </span>
                </div>

              </div>

              {/* Large System Interface / Visual */}
              <div className="w-full">
                <Link
                  href={`/work/${study.id}`}
                  onMouseEnter={() => setHoveredId(study.id)}
                  onMouseLeave={() => setHoveredId(null)}
                  className="block group overflow-hidden rounded-[2.5rem] border border-hairline bg-slate-50/50 relative aspect-[16/9] shadow-sm hover:shadow-md transition-all duration-300 cursor-pointer"
                >
                  {/* Technical Overlay */}
                  <div className={`absolute inset-0 bg-primary-text/40 backdrop-blur-[1px] z-10 transition-opacity duration-300 flex flex-col justify-between p-6 md:p-10 select-none ${
                    hoveredId === study.id ? "opacity-100" : "opacity-0"
                  }`}>
                    {/* Top corner metadata */}
                    <div className="flex justify-between w-full">
                      <span className="text-micro font-mono text-white/70 font-bold bg-white/10 px-3 py-1 rounded">
                        RESOLUTION: {study.metaResolution}
                      </span>
                      <span className="text-micro font-mono text-white/70 font-bold bg-white/10 px-3 py-1 rounded">
                        {study.metaComponent}
                      </span>
                    </div>

                    {/* Cursor overlay replacement indicator */}
                    <div className="self-center bg-white text-primary-text font-mono text-[0.72rem] font-bold py-3.5 px-7 rounded-full shadow-lg flex items-center gap-2 transform active:scale-95 transition-transform">
                      VIEW SYSTEM
                      <span className="text-[0.9rem]">&rarr;</span>
                    </div>

                    {/* Bottom visual coordinates identifier */}
                    <div className="text-[0.55rem] font-mono text-white/40 tracking-widest uppercase">
                      Sayagaa Interface Scanner // SYSTEM PROOF LABS
                    </div>
                  </div>

                  {/* Screenshot Image */}
                  <Image
                    src={study.image}
                    alt={study.altText}
                    fill
                    sizes="(max-w-1200px) 100vw, 80vw"
                    className="object-cover scale-100 group-hover:scale-[1.02] transition-transform duration-500 ease-out"
                  />
                </Link>
              </div>

              {/* Technical breakdown grid (Problem / Approach / Impact) */}
              <div className="grid grid-cols-1 md:grid-cols-3 gap-8 pt-6 border-b border-hairline/35 pb-8">
                
                {/* Problem */}
                <div className="flex flex-col gap-2">
                  <span className="text-[0.68rem] font-mono text-brass-accent uppercase tracking-wider font-bold">
                    SYSTEM PROBLEM
                  </span>
                  <p className="text-[0.88rem] text-muted-text font-semibold leading-relaxed">
                    {study.problem}
                  </p>
                </div>

                {/* Approach */}
                <div className="flex flex-col gap-2 border-t md:border-t-0 md:border-l border-hairline/30 pt-4 md:pt-0 md:pl-6">
                  <span className="text-[0.68rem] font-mono text-brass-accent uppercase tracking-wider font-bold">
                    SYSTEM APPROACH
                  </span>
                  <p className="text-[0.88rem] text-muted-text font-semibold leading-relaxed">
                    {study.approach}
                  </p>
                </div>

                {/* Impact */}
                <div className="flex flex-col gap-2 border-t md:border-t-0 md:border-l border-hairline/30 pt-4 md:pt-0 md:pl-6">
                  <span className="text-[0.68rem] font-mono text-brass-accent uppercase tracking-wider font-bold">
                    SYSTEM IMPACT
                  </span>
                  <p className="text-[0.88rem] text-primary-text font-bold leading-relaxed">
                    {study.impact}
                  </p>
                </div>

              </div>

              {/* View Case Link */}
              <div className="pt-2">
                <Link
                  href={`/work/${study.id}`}
                  className="group inline-flex items-center gap-2 text-[0.82rem] font-bold text-primary-text hover:text-brass-accent transition-colors"
                >
                  VIEW CASE STUDY
                  <span className="transform group-hover:translate-x-1.5 transition-transform duration-300">&rarr;</span>
                </Link>
              </div>

            </div>
          ))}
        </div>

        {/* Small Transparency Statement */}
        <div className="w-full border-t border-hairline/45 pt-12 mt-16 max-w-4xl mx-auto text-center flex flex-col gap-2 items-center">
          <span className="text-micro font-mono text-muted-text/50 font-bold uppercase tracking-wider">
            TRANSPARENCY NOTE
          </span>
          <p className="text-[0.85rem] text-muted-text font-semibold max-w-xl leading-relaxed">
            SOME OF THESE SYSTEMS ARE PROTOTYPES. They demonstrate the kinds of operational infrastructure we can design and build. Client case studies are labeled separately.
          </p>
        </div>

        {/* Case Study Methodology Framework connection */}
        <div className="w-full border-t border-hairline/45 pt-12 mt-8 max-w-4xl mx-auto flex flex-col gap-4 text-center items-center">
          <span className="text-micro font-mono text-brass-accent font-bold uppercase tracking-widest">
            CASE STUDY DEVELOPMENT FRAMEWORK
          </span>
          <p className="text-[0.88rem] text-muted-text font-semibold max-w-md mb-2">
            Every project follows the same disciplined methodology:
          </p>
          
          <div className="flex items-center justify-center flex-wrap gap-2 text-[0.72rem] font-mono text-primary-text font-bold bg-slate-50 border border-hairline/40 py-2.5 px-5 rounded-xl shadow-sm uppercase tracking-wider">
            <span>UNDERSTAND</span>
            <span className="text-slate-300 font-normal">&rarr;</span>
            <span>FIND</span>
            <span className="text-slate-300 font-normal">&rarr;</span>
            <span>DESIGN</span>
            <span className="text-slate-300 font-normal">&rarr;</span>
            <span>BUILD</span>
            <span className="text-slate-300 font-normal">&rarr;</span>
            <span>IMPROVE</span>
          </div>
        </div>

        {/* Bottom Transition CTA */}
        <div className="w-full flex flex-col items-center justify-center text-center py-16 border-t border-hairline/45 mt-12">
          <span className="text-micro font-mono text-brass-accent font-bold tracking-widest uppercase mb-3">
            EXPLORE OPPORTUNITIES
          </span>
          <h4 className="text-[1.3rem] sm:text-[1.6rem] font-bold text-primary-text font-display leading-tight mb-2 uppercase select-none max-w-xl leading-snug">
            WANT TO SEE WHAT THIS COULD LOOK LIKE INSIDE YOUR OPERATION?
          </h4>
          
          <div className="flex flex-col sm:flex-row gap-4 mt-6 items-center justify-center">
            
            <Link
              href="/scoping?type=audit"
              className="group inline-flex items-center justify-center text-[0.88rem] font-bold text-white bg-primary-text hover:bg-brass-accent border border-primary-text hover:border-brass-accent transition-all duration-300 py-3.5 px-7 rounded-xl shadow hover:shadow-md transform active:scale-98"
            >
              START A STRATEGY AUDIT
              <span className="ml-2 transform group-hover:translate-x-1.5 transition-transform duration-300">→</span>
            </Link>

            <Link
              href="/scoping?type=build"
              className="group inline-flex items-center justify-center text-[0.88rem] font-bold text-primary-text hover:text-white bg-transparent hover:bg-primary-text border border-primary-text transition-all duration-300 py-3.5 px-7 rounded-xl shadow-sm hover:shadow active:scale-98"
            >
              DISCUSS A SYSTEM →
            </Link>
            
          </div>
          
          <span className="text-micro font-mono text-muted-text/60 mt-4 tracking-wider">
            1–2 weeks &middot; Diagnostic first &middot; No blind builds
          </span>
        </div>

      </div>
    </section>
  );
}
