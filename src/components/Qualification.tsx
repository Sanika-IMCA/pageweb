"use client";

import Link from "next/link";

export default function Qualification() {
  const goodFitItems = [
    "Your team has grown faster than its operational systems.",
    "People spend significant time moving information between tools.",
    "Your business relies heavily on spreadsheets, email, WhatsApp, or manual tracking.",
    "Managers lack a reliable view of what is happening operationally.",
    "You know something is inefficient but don't know what should actually be built.",
    "You are willing to let us understand the workflow before implementation."
  ];

  const badFitItems = [
    "You only want a developer to execute a predetermined feature list.",
    "You are looking for the cheapest implementation possible.",
    "You don't want to change broken operational processes.",
    "You expect automation without testing or operator involvement."
  ];

  return (
    <section className="py-24 px-6 md:px-12 bg-charcoal-base border-t border-hairline relative select-none">
      <div className="max-w-7xl mx-auto flex flex-col gap-16 text-left">
        
        {/* Section Header */}
        <div className="flex flex-col gap-2">
          <span className="text-[0.62rem] font-mono text-brass-accent font-bold uppercase tracking-widest">
            05 / ALIGNMENT
          </span>
          <h2 className="text-[2.25rem] sm:text-[2.75rem] font-bold text-primary-text font-display uppercase tracking-tight leading-none">
            QUALIFICATION & FIT.
          </h2>
        </div>

        {/* Checklist Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-start">
          
          {/* Column 1: GOOD FIT */}
          <div className="flex flex-col gap-6 border border-hairline/45 bg-white/40 p-8 rounded-[2rem] shadow-sm">
            <div className="flex items-center gap-3 border-b border-hairline/40 pb-4">
              <span className="text-micro font-mono text-brass-accent font-bold uppercase tracking-wider">
                PARTNERSHIP
              </span>
              <h3 className="text-[1.1rem] font-bold text-primary-text font-display uppercase tracking-tight">
                YOU&apos;RE PROBABLY A GOOD FIT IF...
              </h3>
            </div>

            <ul className="flex flex-col gap-4 text-[0.88rem] text-muted-text font-semibold leading-relaxed">
              {goodFitItems.map((item) => (
                <li key={item} className="flex gap-3 items-start">
                  <span className="text-brass-accent font-mono font-bold shrink-0 select-none mt-0.5">
                    ✓
                  </span>
                  <span>{item}</span>
                </li>
              ))}
            </ul>
          </div>

          {/* Column 2: BAD FIT */}
          <div className="flex flex-col gap-6 border border-hairline/45 bg-white/40 p-8 rounded-[2rem] shadow-sm">
            <div className="flex items-center gap-3 border-b border-hairline/40 pb-4">
              <span className="text-micro font-mono text-accent-red font-bold uppercase tracking-wider">
                MISALIGNMENT
              </span>
              <h3 className="text-[1.1rem] font-bold text-primary-text font-display uppercase tracking-tight">
                YOU&apos;RE PROBABLY NOT A GOOD FIT IF...
              </h3>
            </div>

            <ul className="flex flex-col gap-4 text-[0.88rem] text-muted-text font-semibold leading-relaxed">
              {badFitItems.map((item) => (
                <li key={item} className="flex gap-3 items-start">
                  <span className="text-accent-red/80 font-mono font-bold shrink-0 select-none mt-0.5">
                    ×
                  </span>
                  <span>{item}</span>
                </li>
              ))}
            </ul>
          </div>

        </div>

        {/* Qualification CTA Footer */}
        <div className="flex flex-col sm:flex-row items-center justify-between gap-6 border-t border-hairline/45 pt-10 mt-2">
          <div className="flex flex-col gap-1 max-w-xl">
            <span className="text-micro font-mono text-muted-text/45 uppercase tracking-wider font-bold">
              ENGAGEMENT RESTRICTION
            </span>
            <strong className="text-[0.98rem] text-primary-text font-display uppercase tracking-tight leading-snug">
              WE ONLY COMMENCE A BUILD AFTER A COMPLETE WORKFLOW DIAGNOSIS.
            </strong>
          </div>

          <div className="flex items-center gap-4 shrink-0 w-full sm:w-auto">
            <span className="text-micro font-mono text-muted-text font-bold uppercase tracking-wider hidden lg:inline">
              NOT SURE?
            </span>
            <Link
              href="/scoping?type=audit"
              className="inline-flex items-center justify-center text-[0.8rem] font-bold text-white bg-primary-text hover:bg-brass-accent transition-all duration-300 py-3.5 px-8 rounded-xl shadow-sm active:scale-98 font-mono uppercase tracking-wider w-full sm:w-auto text-center"
            >
              START WITH THE AUDIT →
            </Link>
          </div>
        </div>

      </div>
    </section>
  );
}
