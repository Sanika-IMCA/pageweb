"use client";

import { motion } from "framer-motion";
import Image from "next/image";
import Link from "next/link";
import Navigation from "@/components/Navigation";
import Footer from "@/components/Footer";

export default function AboutContent() {
  return (
    <div className="flex flex-col min-h-screen bg-transparent text-primary-text font-sans relative">
      
      {/* Sticky Navigation */}
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
              08 / WHO WE ARE
            </span>
            <h1 className="text-[2.5rem] sm:text-[3.8rem] md:text-[4.6rem] font-bold tracking-tight text-primary-text leading-[1.0] font-display uppercase">
              SYSTEMS OVER<br />
              BLOATED SOFTWARE.
            </h1>
            <p className="text-body-l text-muted-text font-semibold leading-relaxed max-w-2xl mt-2">
              We combine operational research, systems thinking, and structured integrations to build the right infrastructure for ops-heavy businesses.
            </p>
          </div>

        </div>
      </header>

      {/* Main Body Grid */}
      <main className="flex-1 w-full max-w-5xl mx-auto px-6 py-24 flex flex-col gap-24 relative z-10">
        
        {/* Founder Letter/Overview */}
        <div className="border border-hairline/45 bg-slate-50/20 rounded-[2.5rem] p-8 sm:p-12 grid grid-cols-1 md:grid-cols-12 gap-12 items-start relative overflow-hidden shadow-sm">
          
          {/* Founder Image Column */}
          <div className="md:col-span-4 flex flex-col gap-6">
            <div className="relative aspect-[3/4] w-full rounded-[2rem] overflow-hidden border border-hairline/50 shadow-sm">
              <Image
                src="/assets/founder.jpg"
                alt="Sanika, Founder of Sayagaa"
                fill
                sizes="(max-w-768px) 100vw, 30vw"
                className="object-cover grayscale hover:grayscale-0 transition-all duration-500 ease-in-out"
                priority
              />
            </div>
            
            {/* Typographic Founder Block */}
            <div className="flex flex-col gap-1 border-l border-brass-accent/35 pl-4">
              <span className="text-[1.2rem] font-bold text-primary-text font-display uppercase tracking-tight">
                SANIKA
              </span>
              <span className="text-[0.7rem] font-mono text-brass-accent uppercase tracking-wider font-bold">
                Founder, Sayagaa
              </span>
            </div>
          </div>

          {/* Founder Letter Column */}
          <div className="md:col-span-8 flex flex-col gap-6">
            <div className="flex flex-col gap-1">
              <span className="text-micro font-mono text-brass-accent font-bold uppercase">
                FOUNDER LETTER
              </span>
              <h2 className="text-[1.35rem] font-bold text-primary-text font-display uppercase tracking-tight mt-1 leading-tight">
                I&apos;m Sanika, founder of Sayagaa.
              </h2>
            </div>

            <div className="text-body-base text-muted-text leading-relaxed font-semibold flex flex-col gap-4">
              <p className="text-[1.05rem] text-primary-text font-display uppercase tracking-tight">
                I started Sayagaa around a simple belief: Businesses don&apos;t need more software. They need better systems.
              </p>
              
              <p>
                Most agencies begin with the software they want to sell. We begin somewhere else.
              </p>
              <p>
                We study how the business actually operates — how people communicate, where information gets lost, which tools teams work around, and where manual work quietly consumes time.
              </p>
              <p>
                Only after understanding those constraints do we decide what should be built. That might mean an automation. A database. An internal tool. An AI workflow. A custom application. Or sometimes, nothing new at all.
              </p>
              <p className="text-primary-text font-bold uppercase tracking-tight">
                The goal is not to add software. The goal is to make the operation work better.
              </p>
            </div>

            {/* Founder Profile / Positioning */}
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 mt-4 pt-8 border-t border-hairline/35">
              
              <div className="flex flex-col gap-1 text-[0.88rem]">
                <strong className="text-primary-text font-display uppercase tracking-tight">OBSERVES THE OPERATION</strong>
                <p className="text-muted-text font-semibold leading-relaxed mt-1 text-[0.8rem]">
                  Before deciding what technology belongs in it.
                </p>
              </div>

              <div className="flex flex-col gap-1 text-[0.88rem] border-t sm:border-t-0 sm:border-l border-hairline/30 pt-4 sm:pt-0 sm:pl-4">
                <strong className="text-primary-text font-display uppercase tracking-tight">DESIGNS AROUND REAL WORK</strong>
                <p className="text-muted-text font-semibold leading-relaxed mt-1 text-[0.8rem]">
                  Not idealized workflows or theoretical requirements.
                </p>
              </div>

              <div className="flex flex-col gap-1 text-[0.88rem] border-t sm:border-t-0 sm:border-l border-hairline/30 pt-4 sm:pt-0 sm:pl-4">
                <strong className="text-primary-text font-display uppercase tracking-tight">BUILDS FOR HUMAN USE</strong>
                <p className="text-muted-text font-semibold leading-relaxed mt-1 text-[0.8rem]">
                  Because a system that operators avoid is a failed system.
                </p>
              </div>

            </div>

          </div>
        </div>

        {/* Core Philosophy: The Operating Principle */}
        <div className="flex flex-col gap-8 border-t border-hairline/45 pt-16 max-w-4xl mx-auto w-full">
          <div className="flex flex-col gap-2 items-center text-center">
            <span className="text-micro font-mono text-brass-accent font-bold uppercase tracking-widest">
              THE OPERATING PRINCIPLE
            </span>
            <h3 className="text-[1.5rem] font-bold text-primary-text font-display uppercase tracking-tight max-w-xl leading-snug">
              WE DON&apos;T START WITH SOFTWARE. WE START WITH THE BOTTLENECK.
            </h3>
          </div>

          <div className="border border-hairline/45 bg-slate-50/30 rounded-[2rem] p-8 text-center max-w-2xl mx-auto">
            <p className="text-body-base text-muted-text leading-relaxed font-semibold">
              A custom dashboard or automation is useless if it simply makes a broken process happen faster.
            </p>
            <p className="text-body-base text-muted-text leading-relaxed font-semibold mt-3">
              We first understand the workflow. Then we determine what should change. Then we build the smallest reliable system that solves the problem.
            </p>
          </div>
        </div>

        {/* Three Editorial Principles */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 border-t border-hairline/45 pt-16 w-full">
          
          {/* Principle 01 */}
          <div className="flex flex-col gap-3">
            <div className="flex items-center gap-3">
              <span className="text-[1.2rem] font-mono text-brass-accent font-bold">01 /</span>
              <strong className="text-body-base font-bold text-primary-text font-display uppercase tracking-tight">
                SYSTEMS OVER TOOLS
              </strong>
            </div>
            <p className="text-[0.88rem] text-muted-text leading-relaxed font-semibold">
              Businesses don&apos;t need another tool because it exists. They need a system that fits the way their operation actually works.
            </p>
          </div>

          {/* Principle 02 */}
          <div className="flex flex-col gap-3 border-t md:border-t-0 md:border-l border-hairline/30 pt-6 md:pt-0 md:pl-6">
            <div className="flex items-center gap-3">
              <span className="text-[1.2rem] font-mono text-brass-accent font-bold">02 /</span>
              <strong className="text-body-base font-bold text-primary-text font-display uppercase tracking-tight">
                HUMAN REALITY OVER PERFECT WORKFLOWS
              </strong>
            </div>
            <p className="text-[0.88rem] text-muted-text leading-relaxed font-semibold">
              If operators bypass a custom system to use WhatsApp, email, or spreadsheets, the system has failed. We design around how people actually work.
            </p>
          </div>

          {/* Principle 03 */}
          <div className="flex flex-col gap-3 border-t md:border-t-0 md:border-l border-hairline/30 pt-6 md:pt-0 md:pl-6">
            <div className="flex items-center gap-3">
              <span className="text-[1.2rem] font-mono text-brass-accent font-bold">03 /</span>
              <strong className="text-body-base font-bold text-primary-text font-display uppercase tracking-tight">
                CLARITY BEFORE CODE
              </strong>
            </div>
            <p className="text-[0.88rem] text-muted-text leading-relaxed font-semibold">
              We would rather spend time understanding the problem than spend weeks building the wrong solution.
            </p>
          </div>

        </div>

        {/* Domains & Industries (Visually Secondary) */}
        <div className="flex flex-col gap-8 border-t border-hairline/65 pt-16 w-full">
          <div className="flex flex-col gap-2">
            <span className="text-micro font-mono text-brass-accent font-bold uppercase tracking-widest">
              DOMAINS
            </span>
            <h3 className="text-[1.4rem] font-bold text-primary-text font-display uppercase tracking-tight">
              INDUSTRIES & PATTERNS WE KNOW
            </h3>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-8">
            
            {/* Domain 1 */}
            <div className="border border-hairline/35 rounded-2xl p-6 bg-slate-50/10 flex flex-col gap-2 relative">
              <span className="w-1.5 h-1.5 rounded-full bg-brass-accent absolute top-6 right-6" />
              <h4 className="text-[1.05rem] font-bold text-primary-text font-display uppercase tracking-tight">
                HR OPS & ONBOARDING
              </h4>
              <p className="text-[0.88rem] text-muted-text leading-relaxed font-semibold mt-1">
                Candidate flows, screening, contractor onboarding, and operational records.
              </p>
            </div>

            {/* Domain 2 */}
            <div className="border border-hairline/35 rounded-2xl p-6 bg-slate-50/10 flex flex-col gap-2 relative">
              <span className="w-1.5 h-1.5 rounded-full bg-brass-accent absolute top-6 right-6" />
              <h4 className="text-[1.05rem] font-bold text-primary-text font-display uppercase tracking-tight">
                RETAIL & INVENTORY OPS
              </h4>
              <p className="text-[0.88rem] text-muted-text leading-relaxed font-semibold mt-1">
                Supplier workflows, purchase orders, inventory audits, and reorder processes.
              </p>
            </div>

            {/* Domain 3 */}
            <div className="border border-hairline/35 rounded-2xl p-6 bg-slate-50/10 flex flex-col gap-2 relative">
              <span className="w-1.5 h-1.5 rounded-full bg-brass-accent absolute top-6 right-6" />
              <h4 className="text-[1.05rem] font-bold text-primary-text font-display uppercase tracking-tight">
                SERVICE & CONSULTING OPS
              </h4>
              <p className="text-[0.88rem] text-muted-text leading-relaxed font-semibold mt-1">
                Lead intake, client scoping, scheduling, payments, and delivery handoffs.
              </p>
            </div>

            {/* Domain 4 */}
            <div className="border border-hairline/35 rounded-2xl p-6 bg-slate-50/10 flex flex-col gap-2 relative">
              <span className="w-1.5 h-1.5 rounded-full bg-brass-accent absolute top-6 right-6" />
              <h4 className="text-[1.05rem] font-bold text-primary-text font-display uppercase tracking-tight">
                ADMIN-HEAVY WORKFLOWS
              </h4>
              <p className="text-[0.88rem] text-muted-text leading-relaxed font-semibold mt-1">
                Spreadsheet-heavy operations, WhatsApp coordination, email duplication, and manual tracking.
              </p>
            </div>

          </div>
        </div>

        {/* Collaboration Model */}
        <div className="flex flex-col gap-8 border-t border-hairline/65 pt-16 w-full">
          <div className="flex flex-col gap-2">
            <span className="text-micro font-mono text-brass-accent font-bold uppercase tracking-widest">
              COLLABORATION GUIDE
            </span>
            <h3 className="text-[1.4rem] font-bold text-primary-text font-display uppercase tracking-tight">
              HOW WE WORK WITH YOU.
            </h3>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            
            {/* Point 1 */}
            <div className="flex flex-col gap-2.5">
              <div className="flex items-center gap-2">
                <span className="w-2 h-2 rounded-full bg-brass-accent" />
                <strong className="text-[0.95rem] font-bold text-primary-text font-display uppercase tracking-tight">
                  REMOTE-FIRST
                </strong>
              </div>
              <p className="text-[0.88rem] text-muted-text leading-relaxed font-semibold pl-4">
                Work across regions through structured documentation, async updates, and focused review calls.
              </p>
            </div>

            {/* Point 2 */}
            <div className="flex flex-col gap-2.5 border-t md:border-t-0 md:border-l border-hairline/30 pt-6 md:pt-0 md:pl-6">
              <div className="flex items-center gap-2">
                <span className="w-2 h-2 rounded-full bg-brass-accent" />
                <strong className="text-[0.95rem] font-bold text-primary-text font-display uppercase tracking-tight">
                  CLEAR EXPECTATIONS
                </strong>
              </div>
              <div className="text-[0.88rem] text-muted-text leading-relaxed font-semibold pl-4 flex flex-col gap-1">
                <span>Every engagement follows a defined path:</span>
                <span className="font-mono text-brass-accent font-bold text-[0.7rem] block mt-1">
                  INTAKE &rarr; AUDIT &rarr; REVIEW &rarr; ROADMAP &rarr; BUILD
                </span>
              </div>
            </div>

            {/* Point 3 */}
            <div className="flex flex-col gap-2.5 border-t md:border-t-0 md:border-l border-hairline/30 pt-6 md:pt-0 md:pl-6">
              <div className="flex items-center gap-2">
                <span className="w-2 h-2 rounded-full bg-brass-accent" />
                <strong className="text-[0.95rem] font-bold text-primary-text font-display uppercase tracking-tight">
                  DIRECT COMMUNICATION
                </strong>
              </div>
              <p className="text-[0.88rem] text-muted-text leading-relaxed font-semibold pl-4">
                No hiding implementation details behind unnecessary jargon. Clients understand: system boundaries, integration choices, costs, technical constraints, and next steps.
              </p>
            </div>

          </div>
        </div>

        {/* Global Positioning (Restrained form) */}
        <div className="border border-hairline/45 bg-slate-50/30 rounded-[2rem] p-8 flex flex-col sm:flex-row justify-between items-center gap-6 max-w-4xl mx-auto w-full mt-4">
          <div className="flex flex-col gap-1 items-center sm:items-start">
            <span className="text-[0.62rem] font-mono text-brass-accent font-bold uppercase">
              GLOBAL CLIENTS
            </span>
            <strong className="text-[1.05rem] font-bold text-primary-text font-display uppercase tracking-tight">
              WORKING GLOBALLY.
            </strong>
            <p className="text-[0.82rem] text-muted-text font-semibold leading-normal mt-0.5">
              Remote-friendly global delivery directly led by the founder.
            </p>
          </div>

          {/* Desaturated countries list */}
          <div className="flex flex-wrap justify-center sm:justify-end gap-2 text-[0.7rem] font-mono font-bold text-muted-text/80">
            <span className="bg-white border border-hairline/45 rounded-md px-3 py-1">US</span>
            <span className="bg-white border border-hairline/45 rounded-md px-3 py-1">UK</span>
            <span className="bg-white border border-hairline/45 rounded-md px-3 py-1">EU</span>
            <span className="bg-white border border-hairline/45 rounded-md px-3 py-1">UAE</span>
            <span className="bg-white border border-hairline/45 rounded-md px-3 py-1">SINGAPORE</span>
            <span className="bg-white border border-hairline/45 rounded-md px-3 py-1">CANADA</span>
            <span className="bg-white border border-hairline/45 rounded-md px-3 py-1">AUSTRALIA</span>
          </div>
        </div>

        {/* Bottom CTA */}
        <div className="w-full flex flex-col items-center justify-center text-center py-16 border-t border-hairline/45 mt-8">
          <span className="text-micro font-mono text-brass-accent font-bold tracking-widest uppercase mb-3">
            OPPORTUNITY DISCOVERY
          </span>
          <h4 className="text-[1.3rem] sm:text-[1.6rem] font-bold text-primary-text font-display leading-tight mb-2 uppercase select-none max-w-xl leading-snug">
            IF THIS SOUNDS LIKE HOW YOUR BUSINESS SHOULD WORK,
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
              href="/work"
              className="group inline-flex items-center justify-center text-[0.88rem] font-bold text-primary-text hover:text-white bg-transparent hover:bg-primary-text border border-primary-text transition-all duration-300 py-3.5 px-7 rounded-xl shadow-sm hover:shadow active:scale-98"
            >
              SEE OUR WORK →
            </Link>
            
          </div>
          
          <span className="text-micro font-mono text-muted-text/60 mt-4 tracking-wider">
            1–2 weeks &middot; Diagnostic first &middot; No blind builds
          </span>
        </div>

      </main>

      {/* Footer */}
      <Footer />

    </div>
  );
}
