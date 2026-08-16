"use client";

import { motion } from "framer-motion";
import NextLink from "next/link";
import Navigation from "@/components/Navigation";
import Footer from "@/components/Footer";

export default function ServicesPage() {
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
              06 / ENGAGEMENTS
            </span>
            <h1 className="text-[2.5rem] sm:text-[3.8rem] md:text-[4.6rem] font-bold tracking-tight text-primary-text leading-[1.0] font-display uppercase">
              START WITH<br />
              THE PROBLEM.
            </h1>
            <p className="text-body-l text-muted-text font-semibold leading-relaxed max-w-2xl mt-2">
              Every engagement begins with a Strategy & Operations Audit. From there, we move into implementation and ongoing systems support only when the operational roadmap calls for it.
            </p>
          </div>

        </div>
      </header>

      {/* Main Body */}
      <main className="flex-1 py-12 px-6 md:px-12 relative z-10">
        <div className="max-w-5xl mx-auto w-full flex flex-col gap-24">
          
          {/* Primary Visual: Connected 3-Stage Progression */}
          <div className="w-full border border-hairline/40 bg-slate-50/50 rounded-[2rem] p-8 md:p-12 shadow-sm relative">
            <span className="text-micro font-mono text-brass-accent font-bold uppercase tracking-wider mb-6 block">
              ENGAGEMENT PROGRESSION RELATIONSHIP
            </span>

            {/* Progression visual */}
            <div className="flex flex-col md:flex-row items-stretch justify-between gap-8 md:gap-4 relative mt-2">
              
              {/* Desktop connector line */}
              <div className="absolute top-[22px] left-[15%] right-[15%] h-[1.5px] border-t border-dashed border-hairline/65 hidden md:block z-0 pointer-events-none" />

              {/* Stage 1 */}
              <div className="flex-1 flex flex-col items-center md:items-start text-center md:text-left gap-2 z-10">
                <div className="flex items-center gap-3">
                  <span className="w-10 h-10 rounded-full bg-brass-accent text-white flex items-center justify-center text-micro font-mono font-bold">
                    01
                  </span>
                  <span className="text-micro font-mono text-brass-accent font-bold bg-accent-blue-light/25 border border-brass-accent/15 px-2.5 py-0.5 rounded uppercase">
                    AUDIT
                  </span>
                </div>
                <h3 className="text-[0.95rem] font-bold text-primary-text font-display mt-2 uppercase">
                  DIAGNOSE
                </h3>
                <p className="text-[0.82rem] text-muted-text max-w-xs font-semibold leading-normal">
                  Independent research of operations, manual bottlenecks, and tools.
                </p>
              </div>

              {/* Stage 2 */}
              <div className="flex-1 flex flex-col items-center md:items-start text-center md:text-left gap-2 z-10">
                <div className="flex items-center gap-3">
                  <span className="w-10 h-10 rounded-full bg-slate-100 border border-hairline/60 text-muted-text flex items-center justify-center text-micro font-mono font-bold">
                    02
                  </span>
                  <span className="text-micro font-mono text-muted-text font-semibold bg-slate-50 border border-hairline/30 px-2.5 py-0.5 rounded uppercase">
                    BUILD
                  </span>
                </div>
                <h3 className="text-[0.95rem] font-bold text-primary-text font-display mt-2 uppercase">
                  IMPLEMENT
                </h3>
                <p className="text-[0.82rem] text-muted-text max-w-xs font-semibold leading-normal">
                  Execution of databases, automations, custom APIs, and AI pipelines.
                </p>
              </div>

              {/* Stage 3 */}
              <div className="flex-1 flex flex-col items-center md:items-start text-center md:text-left gap-2 z-10">
                <div className="flex items-center gap-3">
                  <span className="w-10 h-10 rounded-full bg-slate-100 border border-hairline/60 text-muted-text flex items-center justify-center text-micro font-mono font-bold">
                    03
                  </span>
                  <span className="text-micro font-mono text-muted-text font-semibold bg-slate-50 border border-hairline/30 px-2.5 py-0.5 rounded uppercase">
                    OPTIMIZE
                  </span>
                </div>
                <h3 className="text-[0.95rem] font-bold text-primary-text font-display mt-2 uppercase">
                  RETAINER
                </h3>
                <p className="text-[0.82rem] text-muted-text max-w-xs font-semibold leading-normal">
                  Continuous performance updates, API maintenance, and health audits.
                </p>
              </div>

            </div>
          </div>

          {/* Three Engagement Phases (Vertical Layout block) */}
          <div className="flex flex-col gap-16 mt-4">
            
            {/* Phase 01: Audit (Visually Dominant Start Here Card) */}
            <div className="border border-brass-accent/35 bg-white shadow-[0_20px_50px_rgba(46,91,148,0.06)] rounded-[2.5rem] p-8 sm:p-12 relative overflow-hidden flex flex-col gap-8">
              
              {/* Highlight ribbon indicator */}
              <div className="absolute top-0 right-12 bg-brass-accent text-white font-mono text-[0.62rem] font-bold py-1.5 px-6 rounded-b-xl uppercase tracking-widest">
                RECOMMENDED ENTRY POINT
              </div>

              {/* Header Grid */}
              <div className="grid grid-cols-1 md:grid-cols-12 gap-6 items-start pb-6 border-b border-hairline/35">
                <div className="md:col-span-8 flex flex-col gap-3">
                  <div className="flex items-center gap-4">
                    <span className="text-micro font-mono text-brass-accent font-bold">PHASE 01 &mdash;</span>
                    <span className="text-micro font-mono text-brass-accent font-bold bg-accent-blue-light/25 border border-brass-accent/20 px-3.5 py-1 rounded-full uppercase tracking-wider">
                      START HERE
                    </span>
                  </div>
                  <h2 className="text-[1.85rem] sm:text-[2.35rem] font-bold tracking-tight text-primary-text font-display leading-[1.0] uppercase">
                    STRATEGY & OPERATIONS AUDIT
                  </h2>
                  <span className="text-micro font-mono text-muted-text/50 uppercase tracking-widest font-bold block mt-1">
                    DURATION: 1–2 WEEKS
                  </span>
                </div>
                
                <div className="md:col-span-4 flex md:justify-end md:items-start h-full md:pt-4">
                  <NextLink
                    href="/scoping?type=audit"
                    className="inline-flex items-center justify-center text-[0.88rem] font-bold text-white bg-primary-text hover:bg-brass-accent transition-all duration-300 py-3.5 px-8 rounded-xl shadow hover:shadow-md transform active:scale-98"
                  >
                    START A STRATEGY AUDIT →
                  </NextLink>
                </div>
              </div>

              {/* Core Details Grid */}
              <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
                
                {/* Description and Scope */}
                <div className="lg:col-span-6 flex flex-col gap-6">
                  <div className="flex flex-col gap-2">
                    <h3 className="text-[1.1rem] font-bold text-brass-accent font-display uppercase tracking-tight leading-tight">
                      UNDERSTAND WHAT&apos;S ACTUALLY BROKEN.
                    </h3>
                    <p className="text-[0.92rem] text-muted-text leading-relaxed font-semibold">
                      For founders and operators who know something in the operation is slowing the business down but need an independent diagnosis before deciding what to build.
                    </p>
                  </div>

                  <div className="flex flex-col gap-3">
                    <span className="text-micro font-mono text-muted-text uppercase tracking-wider font-bold">Scope of Work:</span>
                    <ul className="flex flex-col gap-2 text-[0.88rem] text-primary-text font-semibold pl-1">
                      <li className="flex gap-2.5 items-center">
                        <span className="w-1.5 h-1.5 rounded-full bg-brass-accent shrink-0" />
                        Intake review & preliminary systems analysis
                      </li>
                      <li className="flex gap-2.5 items-center">
                        <span className="w-1.5 h-1.5 rounded-full bg-brass-accent shrink-0" />
                        Deep-dive workflow discovery
                      </li>
                      <li className="flex gap-2.5 items-center">
                        <span className="w-1.5 h-1.5 rounded-full bg-brass-accent shrink-0" />
                        Existing software and integration audit
                      </li>
                      <li className="flex gap-2.5 items-center">
                        <span className="w-1.5 h-1.5 rounded-full bg-brass-accent shrink-0" />
                        Identification of redundant processes and time leaks
                      </li>
                      <li className="flex gap-2.5 items-center">
                        <span className="w-1.5 h-1.5 rounded-full bg-brass-accent shrink-0" />
                        Operational bottleneck analysis
                      </li>
                    </ul>
                  </div>
                </div>

                {/* Deliverables and Outcome */}
                <div className="lg:col-span-6 flex flex-col gap-6 lg:border-l lg:border-hairline/35 lg:pl-10">
                  <div className="flex flex-col gap-3">
                    <span className="text-micro font-mono text-muted-text uppercase tracking-wider font-bold">Key Deliverables:</span>
                    <ul className="flex flex-col gap-2 text-[0.88rem] text-primary-text font-semibold pl-1">
                      <li className="flex gap-2.5 items-center">
                        <span className="w-1.5 h-1.5 rounded-full bg-[#3b82f6] shrink-0" />
                        Strategy & Operations Audit Report
                      </li>
                      <li className="flex gap-2.5 items-center">
                        <span className="w-1.5 h-1.5 rounded-full bg-[#3b82f6] shrink-0" />
                        Friction Node Map
                      </li>
                      <li className="flex gap-2.5 items-center">
                        <span className="w-1.5 h-1.5 rounded-full bg-[#3b82f6] shrink-0" />
                        Pain & Severity Matrix
                      </li>
                      <li className="flex gap-2.5 items-center">
                        <span className="w-1.5 h-1.5 rounded-full bg-[#3b82f6] shrink-0" />
                        System Architecture Blueprint
                      </li>
                      <li className="flex gap-2.5 items-center">
                        <span className="w-1.5 h-1.5 rounded-full bg-[#3b82f6] shrink-0" />
                        30 / 60 / 90 Build Roadmap
                      </li>
                    </ul>
                  </div>

                  <div className="flex flex-col gap-2 border-t border-hairline/35 pt-5 mt-2 bg-brass-accent/[0.01] border border-hairline/15 rounded-xl p-4">
                    <span className="text-micro font-mono text-brass-accent uppercase tracking-wider font-bold">EXPECTED OUTCOME</span>
                    <p className="text-[0.88rem] text-primary-text font-bold leading-relaxed">
                      You leave with diagnostic clarity on what is slowing the business down, what should be fixed first, and what should actually be built.
                    </p>
                  </div>
                </div>

              </div>
            </div>

            {/* Phase 02: Implementation (Quiet Card) */}
            <div className="border border-hairline/45 bg-slate-50/20 rounded-[2.5rem] p-8 sm:p-12 flex flex-col gap-8">
              
              {/* Header Grid */}
              <div className="grid grid-cols-1 md:grid-cols-12 gap-6 items-start pb-6 border-b border-hairline/35">
                <div className="md:col-span-8 flex flex-col gap-3">
                  <div className="flex items-center gap-4">
                    <span className="text-micro font-mono text-muted-text/50 font-bold">PHASE 02 &mdash;</span>
                    <span className="text-micro font-mono text-muted-text font-bold bg-slate-100 border border-hairline/30 px-3.5 py-1 rounded-full uppercase tracking-wider">
                      BUILD
                    </span>
                  </div>
                  <h2 className="text-[1.85rem] sm:text-[2.25rem] font-bold tracking-tight text-primary-text font-display leading-[1.0] uppercase">
                    AI & SOFTWARE IMPLEMENTATION
                  </h2>
                  <span className="text-micro font-mono text-muted-text/50 uppercase tracking-widest font-bold block mt-1">
                    DURATION: MILESTONE-BASED
                  </span>
                </div>
                
                <div className="md:col-span-4 flex md:justify-end md:items-start h-full md:pt-4">
                  <NextLink
                    href="/scoping?type=build"
                    className="inline-flex items-center justify-center text-[0.88rem] font-bold text-primary-text hover:text-white bg-transparent hover:bg-primary-text border border-primary-text transition-all duration-300 py-3 px-7 rounded-xl shadow-sm hover:shadow active:scale-98"
                  >
                    DISCUSS IMPLEMENTATION →
                  </NextLink>
                </div>
              </div>

              {/* Core Details Grid */}
              <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
                
                {/* Description and Scope */}
                <div className="lg:col-span-6 flex flex-col gap-6">
                  <div className="flex flex-col gap-2">
                    <h3 className="text-[1.1rem] font-bold text-brass-accent font-display uppercase tracking-tight leading-tight">
                      TURN THE BLUEPRINT INTO A WORKING SYSTEM.
                    </h3>
                    <p className="text-[0.92rem] text-muted-text leading-relaxed font-semibold">
                      For clients who want Sayagaa to implement the architecture identified during the audit.
                    </p>
                  </div>

                  <div className="flex flex-col gap-3">
                    <span className="text-micro font-mono text-muted-text uppercase tracking-wider font-bold">Scope of Work:</span>
                    <ul className="flex flex-col gap-2 text-[0.88rem] text-primary-text font-semibold pl-1">
                      <li className="flex gap-2.5 items-center">
                        <span className="w-1.5 h-1.5 rounded-full bg-brass-accent shrink-0" />
                        Database schema design
                      </li>
                      <li className="flex gap-2.5 items-center">
                        <span className="w-1.5 h-1.5 rounded-full bg-brass-accent shrink-0" />
                        Custom API setup
                      </li>
                      <li className="flex gap-2.5 items-center">
                        <span className="w-1.5 h-1.5 rounded-full bg-brass-accent shrink-0" />
                        Automation scripting
                      </li>
                      <li className="flex gap-2.5 items-center">
                        <span className="w-1.5 h-1.5 rounded-full bg-brass-accent shrink-0" />
                        AI agent sequencing
                      </li>
                      <li className="flex gap-2.5 items-center">
                        <span className="w-1.5 h-1.5 rounded-full bg-brass-accent shrink-0" />
                        System integrations
                      </li>
                      <li className="flex gap-2.5 items-center">
                        <span className="w-1.5 h-1.5 rounded-full bg-brass-accent shrink-0" />
                        Operator testing & Deployment
                      </li>
                    </ul>
                  </div>
                </div>

                {/* Deliverables and Outcome */}
                <div className="lg:col-span-6 flex flex-col gap-6 lg:border-l lg:border-hairline/35 lg:pl-10">
                  <div className="flex flex-col gap-3">
                    <span className="text-micro font-mono text-muted-text uppercase tracking-wider font-bold">Key Deliverables:</span>
                    <ul className="flex flex-col gap-2 text-[0.88rem] text-primary-text font-semibold pl-1">
                      <li className="flex gap-2.5 items-center">
                        <span className="w-1.5 h-1.5 rounded-full bg-[#3b82f6] shrink-0" />
                        Operational AI pipelines
                      </li>
                      <li className="flex gap-2.5 items-center">
                        <span className="w-1.5 h-1.5 rounded-full bg-[#3b82f6] shrink-0" />
                        Automated workflows
                      </li>
                      <li className="flex gap-2.5 items-center">
                        <span className="w-1.5 h-1.5 rounded-full bg-[#3b82f6] shrink-0" />
                        Custom internal tools & Dashboards
                      </li>
                      <li className="flex gap-2.5 items-center">
                        <span className="w-1.5 h-1.5 rounded-full bg-[#3b82f6] shrink-0" />
                        Databases & Integration infrastructure
                      </li>
                      <li className="flex gap-2.5 items-center">
                        <span className="w-1.5 h-1.5 rounded-full bg-[#3b82f6] shrink-0" />
                        System documentation & Developer handoff
                      </li>
                    </ul>
                  </div>

                  <div className="flex flex-col gap-2 border-t border-hairline/35 pt-5 mt-2 bg-brass-accent/[0.01] border border-hairline/15 rounded-xl p-4">
                    <span className="text-micro font-mono text-brass-accent uppercase tracking-wider font-bold">EXPECTED OUTCOME</span>
                    <p className="text-[0.88rem] text-primary-text font-bold leading-relaxed">
                      Your operation gets lightweight, purpose-built infrastructure that removes manual bottlenecks and works alongside the tools your team already uses.
                    </p>
                    <span className="text-[0.72rem] font-mono text-muted-text mt-2 block border-t border-hairline/35 pt-2">
                      SYSTEM OWNERSHIP: Ownership, access, documentation, and handoff are defined as part of the engagement scope.
                    </span>
                  </div>
                </div>

              </div>
            </div>

            {/* Phase 03: Retainer (Quiet Card) */}
            <div className="border border-hairline/45 bg-slate-50/20 rounded-[2.5rem] p-8 sm:p-12 flex flex-col gap-8">
              
              {/* Header Grid */}
              <div className="grid grid-cols-1 md:grid-cols-12 gap-6 items-start pb-6 border-b border-hairline/35">
                <div className="md:col-span-8 flex flex-col gap-3">
                  <div className="flex items-center gap-4">
                    <span className="text-micro font-mono text-muted-text/50 font-bold">PHASE 03 &mdash;</span>
                    <span className="text-micro font-mono text-muted-text font-bold bg-slate-100 border border-hairline/30 px-3.5 py-1 rounded-full uppercase tracking-wider">
                      OPTIMIZE
                    </span>
                  </div>
                  <h2 className="text-[1.85rem] sm:text-[2.25rem] font-bold tracking-tight text-primary-text font-display leading-[1.0] uppercase">
                    SYSTEMS RETAINER
                  </h2>
                  <span className="text-micro font-mono text-muted-text/50 uppercase tracking-widest font-bold block mt-1">
                    DURATION: ONGOING
                  </span>
                </div>
                
                <div className="md:col-span-4 flex md:justify-end md:items-start h-full md:pt-4">
                  <NextLink
                    href="/scoping?type=retainer"
                    className="inline-flex items-center justify-center text-[0.88rem] font-bold text-primary-text hover:text-white bg-transparent hover:bg-primary-text border border-primary-text transition-all duration-300 py-3 px-7 rounded-xl shadow-sm hover:shadow active:scale-98"
                  >
                    DISCUSS RETAINER SUPPORT →
                  </NextLink>
                </div>
              </div>

              {/* Core Details Grid */}
              <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
                
                {/* Description and Scope */}
                <div className="lg:col-span-6 flex flex-col gap-6">
                  <div className="flex flex-col gap-2">
                    <h3 className="text-[1.1rem] font-bold text-brass-accent font-display uppercase tracking-tight leading-tight">
                      KEEP THE SYSTEM ALIGNED AS YOU GROW.
                    </h3>
                    <p className="text-[0.92rem] text-muted-text leading-relaxed font-semibold">
                      For growing operations that need ongoing system maintenance, optimization, monitoring, and strategic support.
                    </p>
                  </div>

                  <div className="flex flex-col gap-3">
                    <span className="text-micro font-mono text-muted-text uppercase tracking-wider font-bold">Scope of Work:</span>
                    <ul className="flex flex-col gap-2 text-[0.88rem] text-primary-text font-semibold pl-1">
                      <li className="flex gap-2.5 items-center">
                        <span className="w-1.5 h-1.5 rounded-full bg-brass-accent shrink-0" />
                        System health reviews
                      </li>
                      <li className="flex gap-2.5 items-center">
                        <span className="w-1.5 h-1.5 rounded-full bg-brass-accent shrink-0" />
                        API updates
                      </li>
                      <li className="flex gap-2.5 items-center">
                        <span className="w-1.5 h-1.5 rounded-full bg-brass-accent shrink-0" />
                        Automation adjustments
                      </li>
                      <li className="flex gap-2.5 items-center">
                        <span className="w-1.5 h-1.5 rounded-full bg-brass-accent shrink-0" />
                        Performance monitoring
                      </li>
                      <li className="flex gap-2.5 items-center">
                        <span className="w-1.5 h-1.5 rounded-full bg-brass-accent shrink-0" />
                        Bug triage & Roadmap updates
                      </li>
                      <li className="flex gap-2.5 items-center">
                        <span className="w-1.5 h-1.5 rounded-full bg-brass-accent shrink-0" />
                        Operational reviews
                      </li>
                    </ul>
                  </div>
                </div>

                {/* Deliverables and Outcome */}
                <div className="lg:col-span-6 flex flex-col gap-6 lg:border-l lg:border-hairline/35 lg:pl-10">
                  <div className="flex flex-col gap-3">
                    <span className="text-micro font-mono text-muted-text uppercase tracking-wider font-bold">Key Deliverables:</span>
                    <ul className="flex flex-col gap-2 text-[0.88rem] text-primary-text font-semibold pl-1">
                      <li className="flex gap-2.5 items-center">
                        <span className="w-1.5 h-1.5 rounded-full bg-[#3b82f6] shrink-0" />
                        Continuous optimization
                      </li>
                      <li className="flex gap-2.5 items-center">
                        <span className="w-1.5 h-1.5 rounded-full bg-[#3b82f6] shrink-0" />
                        Priority system maintenance
                      </li>
                      <li className="flex gap-2.5 items-center">
                        <span className="w-1.5 h-1.5 rounded-full bg-[#3b82f6] shrink-0" />
                        Database audits
                      </li>
                      <li className="flex gap-2.5 items-center">
                        <span className="w-1.5 h-1.5 rounded-full bg-[#3b82f6] shrink-0" />
                        New automation triggers
                      </li>
                      <li className="flex gap-2.5 items-center">
                        <span className="w-1.5 h-1.5 rounded-full bg-[#3b82f6] shrink-0" />
                        Performance improvements & monthly roadmap alignment
                      </li>
                    </ul>
                  </div>

                  <div className="flex flex-col gap-2 border-t border-hairline/35 pt-5 mt-2 bg-brass-accent/[0.01] border border-hairline/15 rounded-xl p-4">
                    <span className="text-micro font-mono text-brass-accent uppercase tracking-wider font-bold">EXPECTED OUTCOME</span>
                    <p className="text-[0.88rem] text-primary-text font-bold leading-relaxed">
                      Your systems remain reliable, maintainable, and aligned with the way the business actually operates.
                    </p>
                  </div>
                </div>

              </div>
            </div>

          </div>

          {/* Simple Decision Guide */}
          <section className="py-12 border-t border-hairline/45 flex flex-col gap-8 max-w-4xl mx-auto w-full mt-4">
            <div className="flex flex-col gap-2 text-center items-center">
              <span className="text-micro font-mono text-brass-accent font-bold uppercase tracking-widest">
                STAGE DECISION GUIDE
              </span>
              <h3 className="text-[1.25rem] font-bold text-primary-text font-display uppercase tracking-tight">
                Choose the right stage for where your operation is today.
              </h3>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-2">
              
              {/* Path 1 */}
              <NextLink
                href="/scoping?type=audit"
                className="group border border-hairline/45 bg-white rounded-2xl p-6 flex flex-col justify-between gap-6 hover:border-brass-accent/35 transition-all duration-300 shadow-sm cursor-pointer hover:bg-brass-accent/[0.01]"
              >
                <div className="flex flex-col gap-2">
                  <span className="text-[0.62rem] font-mono text-brass-accent font-bold uppercase">SITUATION</span>
                  <p className="text-[0.88rem] text-primary-text font-semibold leading-snug">
                    I know something is broken but don&apos;t know what to build.
                  </p>
                </div>
                <div className="text-[0.72rem] font-mono text-primary-text group-hover:text-brass-accent font-bold flex items-center gap-1.5 transition-colors">
                  START WITH THE AUDIT
                  <span className="transform group-hover:translate-x-1 transition-transform duration-300">→</span>
                </div>
              </NextLink>

              {/* Path 2 */}
              <NextLink
                href="/scoping?type=build"
                className="group border border-hairline/45 bg-white rounded-2xl p-6 flex flex-col justify-between gap-6 hover:border-brass-accent/35 transition-all duration-300 shadow-sm cursor-pointer hover:bg-brass-accent/[0.01]"
              >
                <div className="flex flex-col gap-2">
                  <span className="text-[0.62rem] font-mono text-brass-accent font-bold uppercase">SITUATION</span>
                  <p className="text-[0.88rem] text-primary-text font-semibold leading-snug">
                    I know what the system should be and want Sayagaa to build it.
                  </p>
                </div>
                <div className="text-[0.72rem] font-mono text-primary-text group-hover:text-brass-accent font-bold flex items-center gap-1.5 transition-colors">
                  DISCUSS IMPLEMENTATION
                  <span className="transform group-hover:translate-x-1 transition-transform duration-300">→</span>
                </div>
              </NextLink>

              {/* Path 3 */}
              <NextLink
                href="/scoping?type=retainer"
                className="group border border-hairline/45 bg-white rounded-2xl p-6 flex flex-col justify-between gap-6 hover:border-brass-accent/35 transition-all duration-300 shadow-sm cursor-pointer hover:bg-brass-accent/[0.01]"
              >
                <div className="flex flex-col gap-2">
                  <span className="text-[0.62rem] font-mono text-brass-accent font-bold uppercase">SITUATION</span>
                  <p className="text-[0.88rem] text-primary-text font-semibold leading-snug">
                    I already have systems active but need ongoing retainer support.
                  </p>
                </div>
                <div className="text-[0.72rem] font-mono text-primary-text group-hover:text-brass-accent font-bold flex items-center gap-1.5 transition-colors">
                  DISCUSS RETAINER SUPPORT
                  <span className="transform group-hover:translate-x-1 transition-transform duration-300">→</span>
                </div>
              </NextLink>

            </div>
          </section>

          {/* Boundaries: We May Not Be the Right Partner If */}
          <section className="bg-slate-50/50 border border-hairline/45 p-8 sm:p-12 rounded-[2.5rem] flex flex-col gap-8 shadow-sm max-w-4xl mx-auto w-full relative">
            <div className="flex flex-col gap-2">
              <span className="text-[0.68rem] font-mono text-brass-accent uppercase tracking-wider font-bold">
                ENGAGEMENT LIMITS
              </span>
              <h3 className="text-[1.35rem] font-bold text-primary-text font-display uppercase tracking-tight">
                WE MAY NOT BE THE RIGHT PARTNER IF...
              </h3>
              <p className="text-[0.88rem] text-muted-text font-semibold leading-relaxed">
                To maintain a high standard of craftsmanship and deliver high ROI outcomes, we are strict about client alignment.
              </p>
            </div>

            <ul className="grid grid-cols-1 md:grid-cols-3 gap-6 border-t border-hairline/35 pt-8 mt-2">
              
              <li className="flex gap-3 items-start">
                <span className="text-accent-red font-bold mt-0.5">&times;</span>
                <div className="flex flex-col gap-1 text-[0.88rem]">
                  <strong className="text-primary-text uppercase tracking-tight">No Discovery</strong>
                  <p className="text-muted-text font-semibold leading-relaxed mt-0.5">
                    Clients who only want a cheap developer to build predetermined features without an operational audit.
                  </p>
                </div>
              </li>
              
              <li className="flex gap-3 items-start border-t md:border-t-0 md:border-l border-hairline/30 pt-6 md:pt-0 md:pl-6">
                <span className="text-accent-red font-bold mt-0.5">&times;</span>
                <div className="flex flex-col gap-1 text-[0.88rem]">
                  <strong className="text-primary-text uppercase tracking-tight">Closed Workflows</strong>
                  <p className="text-muted-text font-semibold leading-relaxed mt-0.5">
                    Teams unwilling to share the information required to understand how their operation actually works.
                  </p>
                </div>
              </li>
              
              <li className="flex gap-3 items-start border-t md:border-t-0 md:border-l border-hairline/30 pt-6 md:pt-0 md:pl-6">
                <span className="text-accent-red font-bold mt-0.5">&times;</span>
                <div className="flex flex-col gap-1 text-[0.88rem]">
                  <strong className="text-primary-text uppercase tracking-tight">Instant Scale</strong>
                  <p className="text-muted-text font-semibold leading-relaxed mt-0.5">
                    Teams expecting production automation without allocating time for testing, validation, and operator adoption.
                  </p>
                </div>
              </li>

            </ul>

            {/* Prominent philosophy line */}
            <div className="w-full flex items-center justify-center border-t border-hairline/35 pt-6 mt-4 text-center">
              <strong className="text-[0.98rem] text-primary-text font-display uppercase tracking-wider text-brass-accent">
                WE WOULD RATHER SAY NO THAN BUILD THE WRONG SYSTEM.
              </strong>
            </div>

          </section>

          {/* Bottom Transition CTA */}
          <div className="w-full flex flex-col items-center justify-center text-center py-16 border-t border-hairline/45 mt-8">
            <span className="text-micro font-mono text-brass-accent font-bold tracking-widest uppercase mb-3">
              NOT SURE WHERE TO START?
            </span>
            <h4 className="text-[1.3rem] sm:text-[1.6rem] font-bold text-primary-text font-display leading-tight mb-2 uppercase select-none">
              Start with the audit.
            </h4>
            
            <div className="flex flex-col gap-4 mt-3 items-center justify-center">
              <NextLink
                href="/scoping?type=audit"
                className="group inline-flex items-center justify-center text-[0.88rem] font-bold text-primary-text hover:text-white bg-transparent hover:bg-brass-accent border border-primary-text hover:border-brass-accent transition-all duration-300 py-4 px-8 rounded-xl shadow-sm hover:shadow-md transform active:scale-98"
              >
                START A STRATEGY AUDIT
                <span className="ml-2 transform group-hover:translate-x-1.5 transition-transform duration-300">→</span>
              </NextLink>
              
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
