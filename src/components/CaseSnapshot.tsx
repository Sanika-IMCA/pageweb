"use client";

import { motion } from "framer-motion";
import Link from "next/link";

export default function CaseSnapshot() {
  return (
    <section className="py-24 px-6 md:px-12 bg-charcoal-base border-t border-hairline relative">
      <div className="max-w-7xl mx-auto flex flex-col gap-12 relative z-10">
        
        {/* Section Header */}
        <div className="flex flex-col gap-3 max-w-xl">
          <span className="text-caption text-brass-accent font-mono tracking-widest font-bold">
            04 / CASE SNAPSHOT
          </span>
          <h2 className="text-[2rem] md:text-[2.75rem] font-bold tracking-tight text-primary-text leading-tight font-display">
            Proof in action.
          </h2>
          <p className="text-body-base text-muted-text mt-2">
            See how our methodology moves operators away from chaos and into structured, automated pipelines.
          </p>
        </div>

        {/* Featured Card */}
        <div className="bg-secondary-surface border border-white/70 p-8 sm:p-12 rounded-[2.5rem] shadow-sm backdrop-blur-md relative overflow-hidden grid grid-cols-1 lg:grid-cols-12 gap-8 items-center max-w-5xl">
          {/* Decorative faint background blue orb */}
          <div className="absolute -top-12 -left-12 w-32 h-32 bg-blue-100/5 rounded-full blur-2xl pointer-events-none" />

          {/* Left panel: Info teaser */}
          <div className="lg:col-span-7 flex flex-col gap-4">
            <span className="text-micro font-mono text-accent-red uppercase tracking-widest font-bold bg-accent-red-light/60 border border-accent-red/20 rounded-full px-3 py-1 self-start">
              FEATURED OUTCOME
            </span>
            <h3 className="text-[1.75rem] md:text-[2.25rem] font-bold tracking-tight text-primary-text font-display leading-tight">
              Example: From chaotic ops to clear pipeline.
            </h3>
            <p className="text-body-base text-muted-text leading-relaxed mt-2">
              For an operations-heavy client running regional dispatch teams, we audited their communication bottlenecks and integrated lightweight CRM database automation pipelines.
            </p>
          </div>

          {/* Right panel: Bullets (with soft red outcome glow highlight) */}
          <div className="lg:col-span-5 flex flex-col gap-6 border-l border-hairline/60 lg:pl-10">
            <ul className="flex flex-col gap-4">
              <li className="flex gap-3 items-start text-primary-text">
                <span className="w-1.5 h-1.5 rounded-full bg-brass-accent mt-2 shrink-0" />
                <span className="text-[0.95rem] font-semibold leading-relaxed">
                  Mapped entire process from lead to payment.
                </span>
              </li>
              <li className="flex gap-3 items-start text-primary-text">
                <span className="w-1.5 h-1.5 rounded-full bg-brass-accent mt-2 shrink-0" />
                <span className="text-[0.95rem] font-semibold leading-relaxed">
                  Identified 4 high‑impact automation opportunities.
                </span>
              </li>
              
              {/* Highlighted Outcome Bullet (Soft red outline and glow) */}
              <li className="flex gap-3 items-start text-primary-text bg-accent-red-light/25 border border-accent-red/25 rounded-2xl px-4 py-3 shadow-[0_4px_12px_rgba(229,147,147,0.04)]">
                <span className="w-1.5 h-1.5 rounded-full bg-accent-red shadow-[0_0_8px_rgba(229,147,147,0.85)] mt-2 shrink-0" />
                <span className="text-[0.95rem] font-extrabold leading-relaxed text-primary-text">
                  Implemented 2 quick wins &rarr; reduced manual follow‑ups by 40%.
                </span>
              </li>
            </ul>

            <div className="pt-4 border-t border-hairline/60">
              <Link
                href="/work"
                className="inline-flex items-center gap-2 text-[0.85rem] font-bold text-brass-accent hover:text-primary-text transition-colors py-2 relative after:absolute after:bottom-0 after:left-0 after:right-0 after:h-[1px] after:bg-brass-accent after:scale-x-0 hover:after:scale-x-100 after:origin-left after:transition-transform"
              >
                View all case studies &rarr;
              </Link>
            </div>
          </div>

        </div>

      </div>
    </section>
  );
}
