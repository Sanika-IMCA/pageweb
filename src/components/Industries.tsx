"use client";

import { useState } from "react";
import Link from "next/link";

interface IndustryItem {
  num: string;
  name: string;
  pattern: string;
}

export default function Industries() {
  const [hoveredIdx, setHoveredIdx] = useState<number | null>(null);
  const [clickedIdx, setClickedIdx] = useState<number | null>(null);

  const handleToggle = (idx: number) => {
    setClickedIdx(clickedIdx === idx ? null : idx);
  };

  const industries: IndustryItem[] = [
    { num: "01", name: "RECRUITMENT & STAFFING", pattern: "candidate workflows &middot; screening &middot; onboarding" },
    { num: "02", name: "SAAS & TECHNOLOGY", pattern: "billing integrations &middot; usage logs &middot; account setup" },
    { num: "03", name: "PROFESSIONAL SERVICES", pattern: "intake &middot; scoping &middot; delivery &middot; payments" },
    { num: "04", name: "LOGISTICS & OPERATIONS", pattern: "dispatch &middot; scheduling &middot; handoffs" },
    { num: "05", name: "FINANCE & COMPLIANCE", pattern: "document audits &middot; compliance logs &middot; reconciliations" },
    { num: "06", name: "RETAIL & COMMERCE", pattern: "inventory &middot; supplier workflows &middot; reorder processes" },
    { num: "07", name: "AGENCIES", pattern: "project onboarding &middot; time sheets &middot; report compiling" },
    { num: "08", name: "OTHER OPERATIONS-HEAVY BUSINESSES", pattern: "any complex manual process worth solving" }
  ];

  const patterns = [
    {
      title: "MANUAL HANDOFFS",
      desc: "Work repeatedly passed between people or tools, creating delay loops."
    },
    {
      title: "DISCONNECTED DATA",
      desc: "Information duplicated across spreadsheets, email, CRMs, databases, or messaging platforms."
    },
    {
      title: "REPETITIVE ADMINISTRATION",
      desc: "People spending valuable time copying, checking, updating, or reconciling information."
    },
    {
      title: "LOW OPERATIONAL VISIBILITY",
      desc: "Managers cannot easily see what is happening, what is blocked, or what needs attention."
    },
    {
      title: "GROWING COMPLEXITY",
      desc: "The business has grown faster than the systems supporting it, leading to operational friction."
    }
  ];

  return (
    <section id="sectors" className="py-32 px-6 md:px-12 bg-transparent border-t border-hairline relative overflow-hidden">
      
      {/* Subtle lines visual */}
      <div className="absolute top-0 bottom-0 left-6 md:left-12 w-[1px] bg-hairline/35 pointer-events-none" />

      <div className="max-w-7xl mx-auto w-full relative z-10 pl-4 md:pl-8">
        
        {/* Asymmetric Split Layout Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-start">
          
          {/* Left Column: Heading and Qualification Block */}
          <div className="lg:col-span-5 flex flex-col gap-10 lg:sticky lg:top-28">
            
            {/* Headers */}
            <div className="flex flex-col gap-4">
              <span className="text-caption text-brass-accent font-mono tracking-widest font-bold">
                09 / SECTORS
              </span>
              <h2 className="text-[2.25rem] md:text-[3.25rem] font-bold tracking-tight text-primary-text leading-[1.0] font-display uppercase">
                THE INDUSTRY<br />
                ISN&apos;T THE PROBLEM.<br />
                <span className="text-brass-accent">THE OPERATION IS.</span>
              </h2>
              <p className="text-body-l text-muted-text font-semibold leading-relaxed mt-2 max-w-md">
                We care less about whether your business fits a specific industry category and more about whether there is an operational problem worth solving.
              </p>
            </div>

            {/* Bottom Qualification Block (On desktop: sticky on left) */}
            <div className="hidden lg:flex flex-col gap-6 border border-hairline/45 bg-slate-50/50 rounded-[2rem] p-8 shadow-sm">
              <div className="flex flex-col gap-2">
                <span className="text-micro font-mono text-brass-accent font-bold uppercase">
                  DIAGNOSTIC TEST
                </span>
                <strong className="text-[1.1rem] text-primary-text font-display uppercase tracking-tight leading-snug">
                  THE BETTER QUESTION ISN&apos;T: &quot;Do you work in my industry?&quot;
                </strong>
                <strong className="text-[1.15rem] text-brass-accent font-display uppercase tracking-tight leading-snug mt-1 border-t border-hairline/35 pt-4">
                  THE BETTER QUESTION IS: &quot;Do I have an operational problem worth solving?&quot;
                </strong>
              </div>
              
              <div className="flex flex-col gap-3 mt-2">
                <p className="text-[0.88rem] text-muted-text font-semibold leading-relaxed">
                  If the answer is yes, we start with the audit.
                </p>
                <Link
                  href="/scoping?type=audit"
                  className="group inline-flex items-center justify-center text-[0.88rem] font-bold text-white bg-primary-text hover:bg-brass-accent border border-primary-text hover:border-brass-accent transition-all duration-300 py-3.5 px-6 rounded-xl shadow-sm hover:shadow active:scale-98"
                >
                  START A STRATEGY AUDIT
                  <span className="ml-2 transform group-hover:translate-x-1 transition-transform duration-300">→</span>
                </Link>
              </div>
            </div>

          </div>

          {/* Right Column: Taxonomy and Operating Patterns */}
          <div className="lg:col-span-7 flex flex-col gap-16 lg:pl-10">
            
            {/* Illustrative industry list */}
            <div className="flex flex-col gap-2">
              <span className="text-micro font-mono text-muted-text/50 uppercase tracking-widest font-bold mb-4 block">
                INDUSTRIES WE WORK ACROSS (ILLUSTRATIVE)
              </span>

              <div className="flex flex-col border-t border-hairline/50">
                {industries.map((item, idx) => (
                  <div
                    key={item.num}
                    onMouseEnter={() => setHoveredIdx(idx)}
                    onMouseLeave={() => setHoveredIdx(null)}
                    onClick={() => handleToggle(idx)}
                    className="border-b border-hairline/45 py-4 cursor-pointer hover:bg-brass-accent/[0.008] transition-colors duration-200 pl-2 pr-4 flex flex-col justify-center min-h-[72px]"
                  >
                    <div className="flex justify-between items-center gap-4">
                      <div className="flex items-center gap-4">
                        <span className="text-micro font-mono text-muted-text/60">{item.num}</span>
                        <strong className={`text-[0.98rem] font-bold font-display uppercase tracking-tight transition-colors duration-200 ${
                          hoveredIdx === idx || clickedIdx === idx ? "text-brass-accent" : "text-primary-text"
                        }`}>
                          {item.name}
                        </strong>
                      </div>
                      
                      {/* Desktop pattern reveal */}
                      <span className="text-[0.72rem] font-mono text-muted-text/40 hidden md:block">
                        PROFILES // SCAN
                      </span>
                    </div>

                    {/* Inline Hover Pattern Reveal */}
                    <div className={`transition-all duration-300 overflow-hidden ${
                      hoveredIdx === idx || clickedIdx === idx ? "max-h-12 opacity-100 mt-2" : "max-h-0 opacity-0"
                    }`}>
                      <span
                        className="text-[0.78rem] font-mono text-brass-accent font-bold"
                        dangerouslySetInnerHTML={{ __html: `&rarr; ${item.pattern}` }}
                      />
                    </div>

                  </div>
                ))}
              </div>
            </div>

            {/* What we look for section (Common operational bottlenecks) */}
            <div className="flex flex-col gap-6 pt-8 border-t border-hairline/50">
              <div className="flex flex-col gap-1">
                <span className="text-micro font-mono text-brass-accent font-bold uppercase tracking-widest">
                  ENVIRONMENT ANALYSIS
                </span>
                <h3 className="text-[1.35rem] font-bold text-primary-text font-display uppercase tracking-tight">
                  WHAT WE LOOK FOR
                </h3>
              </div>

              <div className="flex flex-col gap-6">
                {patterns.map((pat) => (
                  <div key={pat.title} className="flex gap-4 items-start pl-2">
                    <span className="text-accent-red font-bold mt-0.5 shrink-0">&times;</span>
                    <div className="flex flex-col gap-1">
                      <strong className="text-[0.95rem] text-primary-text font-display uppercase tracking-tight">
                        {pat.title}
                      </strong>
                      <p className="text-[0.88rem] text-muted-text font-semibold leading-relaxed">
                        {pat.desc}
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Mobile View Qualification Block (At the bottom on mobile) */}
            <div className="flex lg:hidden flex-col gap-6 border border-hairline/45 bg-slate-50/50 rounded-[2rem] p-6 shadow-sm mt-8">
              <div className="flex flex-col gap-2">
                <span className="text-micro font-mono text-brass-accent font-bold uppercase">
                  DIAGNOSTIC TEST
                </span>
                <strong className="text-[1.05rem] text-primary-text font-display uppercase tracking-tight leading-snug">
                  THE BETTER QUESTION ISN&apos;T: &quot;Do you work in my industry?&quot;
                </strong>
                <strong className="text-[1.1rem] text-brass-accent font-display uppercase tracking-tight leading-snug mt-1 border-t border-hairline/35 pt-4">
                  THE BETTER QUESTION IS: &quot;Do I have an operational problem worth solving?&quot;
                </strong>
              </div>
              
              <div className="flex flex-col gap-3 mt-2">
                <p className="text-[0.85rem] text-muted-text font-semibold leading-relaxed">
                  If the answer is yes, we start with the audit.
                </p>
                <Link
                  href="/scoping?type=audit"
                  className="group inline-flex items-center justify-center text-[0.88rem] font-bold text-white bg-primary-text hover:bg-brass-accent border border-primary-text hover:border-brass-accent transition-all duration-300 py-3.5 px-6 rounded-xl shadow-sm hover:shadow active:scale-98"
                >
                  START A STRATEGY AUDIT
                  <span className="ml-2 transform group-hover:translate-x-1 transition-transform duration-300">→</span>
                </Link>
              </div>
            </div>

          </div>

        </div>

      </div>
    </section>
  );
}
