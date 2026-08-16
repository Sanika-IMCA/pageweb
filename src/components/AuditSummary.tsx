"use client";

import Link from "next/link";

export default function AuditSummary() {
  const deliverables = [
    "OPERATIONAL MAP",
    "FRICTION DIAGNOSIS",
    "SYSTEM ARCHITECTURE",
    "PRIORITIZED ROADMAP",
    "IMPLEMENTATION DIRECTION"
  ];

  return (
    <section className="py-24 px-6 md:px-12 bg-transparent border-t border-hairline relative select-none">
      <div className="max-w-7xl mx-auto flex flex-col gap-12 text-left">
        
        {/* Container Box */}
        <div className="w-full border border-hairline/75 bg-secondary-surface/10 rounded-[2rem] p-8 sm:p-12 shadow-sm backdrop-blur-[2px] grid grid-cols-1 lg:grid-cols-12 gap-10 items-center">
          
          {/* Left Column: What You Get List (6 cols) */}
          <div className="lg:col-span-6 flex flex-col gap-6">
            <div className="flex flex-col gap-1">
              <span className="text-micro font-mono text-brass-accent font-bold uppercase tracking-widest">
                ENTRY ENGAGEMENT
              </span>
              <h3 className="text-[1.85rem] sm:text-[2.25rem] font-bold text-primary-text font-display uppercase tracking-tight leading-none">
                STRATEGY & OPERATIONS AUDIT
              </h3>
            </div>

            <div className="flex flex-col gap-2">
              <span className="text-micro font-mono text-muted-text/50 uppercase tracking-wider font-bold">
                DELIVERABLE SUMMARY (YOU GET):
              </span>
              
              <ul className="flex flex-col gap-2 font-mono text-[0.82rem] text-primary-text font-bold uppercase tracking-wider">
                {deliverables.map((item, idx) => (
                  <li key={item} className="flex gap-4 items-center">
                    <span className="text-brass-accent font-semibold">
                      0{idx + 1}
                    </span>
                    <span className="border-b border-hairline/45 flex-1 pb-1">
                      {item}
                    </span>
                  </li>
                ))}
              </ul>
            </div>
          </div>

          {/* Right Column: Scoping CTA + Outbound Attributions (6 cols) */}
          <div className="lg:col-span-6 flex flex-col gap-8 lg:border-l lg:border-hairline/35 lg:pl-10">
            
            <div className="flex flex-col gap-3">
              <strong className="text-[1.1rem] text-primary-text font-display uppercase tracking-tight leading-snug">
                YOU DON&apos;T NEED TO KNOW WHAT TO BUILD YET. JUST TELL US WHAT ISN&apos;T WORKING.
              </strong>
              <p className="text-[0.88rem] text-muted-text font-semibold leading-relaxed">
                We design the architecture only after diagnosing the operational bottleneck. Fill in the scoping intake form to begin.
              </p>
            </div>

            <div className="flex flex-col gap-6">
              <Link
                href="/scoping?type=audit"
                className="group inline-flex items-center justify-center text-[0.88rem] font-bold text-white bg-primary-text hover:bg-brass-accent transition-all duration-300 py-4 px-8 rounded-xl shadow-md hover:shadow-lg transform active:scale-98 font-mono uppercase tracking-wider w-full text-center"
              >
                START A STRATEGY AUDIT →
              </Link>

              {/* Outbound-specific subtle statement */}
              <div className="border-t border-hairline/35 pt-4 text-[0.75rem] text-muted-text/80 leading-relaxed font-semibold">
                <span className="text-brass-accent font-mono text-[0.62rem] uppercase tracking-wider font-bold block mb-1">
                  FOUND US THROUGH AN OUTREACH MESSAGE?
                </span>
                If the outreach message you received described a potential operational issue in your industry, tell us what is happening inside the business and we will review it directly.
              </div>
            </div>

          </div>

        </div>

      </div>
    </section>
  );
}
