"use client";

import { motion } from "framer-motion";

export default function WhoWeHelp() {
  return (
    <section className="py-24 px-6 md:px-12 bg-charcoal-base relative overflow-hidden">
      <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-12 gap-12 items-start relative z-10">
        
        {/* Left column: Fits best */}
        <div className="lg:col-span-7 flex flex-col gap-8">
          <div className="flex flex-col gap-3">
            <span className="text-caption text-brass-accent font-mono tracking-widest font-bold">
              01 / TARGET CLIENT
            </span>
            <h2 className="text-[2rem] md:text-[2.75rem] font-bold tracking-tight text-primary-text leading-tight">
              Who we work best with.
            </h2>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
            
            {/* Bullet 1 */}
            <div className="bg-accent-blue-light/35 border border-brass-accent/15 p-6 rounded-2xl flex flex-col gap-4 shadow-sm backdrop-blur-md">
              <span className="text-micro font-mono text-white font-bold bg-brass-accent rounded-full w-8 h-8 flex items-center justify-center">
                ✓
              </span>
              <p className="text-[0.95rem] text-primary-text font-semibold leading-relaxed">
                Operators and founders drowning in manual work.
              </p>
            </div>

            {/* Bullet 2 */}
            <div className="bg-accent-blue-light/35 border border-brass-accent/15 p-6 rounded-2xl flex flex-col gap-4 shadow-sm backdrop-blur-md">
              <span className="text-micro font-mono text-white font-bold bg-brass-accent rounded-full w-8 h-8 flex items-center justify-center">
                ✓
              </span>
              <p className="text-[0.95rem] text-primary-text font-semibold leading-relaxed">
                Teams relying on spreadsheets, email, and WhatsApp to run core operations.
              </p>
            </div>

            {/* Bullet 3 */}
            <div className="bg-accent-blue-light/35 border border-brass-accent/15 p-6 rounded-2xl flex flex-col gap-4 shadow-sm backdrop-blur-md">
              <span className="text-micro font-mono text-white font-bold bg-brass-accent rounded-full w-8 h-8 flex items-center justify-center">
                ✓
              </span>
              <p className="text-[0.95rem] text-primary-text font-semibold leading-relaxed">
                Businesses ready to invest in operational clarity before building software.
              </p>
            </div>

          </div>
        </div>

        {/* Right column: Not a fit (Soft red accent highlights) */}
        <div className="lg:col-span-5 bg-accent-red-light/25 border border-accent-red/45 p-8 rounded-[2rem] flex flex-col gap-6 backdrop-blur-md relative overflow-hidden">
          {/* Subtle blush red orb indicator */}
          <div className="absolute -bottom-8 -left-8 w-20 h-20 bg-accent-red-light/10 rounded-full blur-xl pointer-events-none" />

          <div className="flex flex-col gap-2">
            <span className="text-[0.7rem] font-mono text-accent-red font-bold uppercase tracking-wider">
              NOT A FIT IF
            </span>
            <h3 className="text-[1.35rem] font-bold text-primary-text font-display">
              We might not be your partner...
            </h3>
          </div>

          <ul className="flex flex-col gap-4">
            <li className="flex gap-3 items-start">
              <span className="text-accent-red font-bold mt-0.5">&times;</span>
              <span className="text-[0.95rem] text-muted-text leading-relaxed font-semibold">
                You only want a quick app built with no diagnostic process or operations audits.
              </span>
            </li>
            <li className="flex gap-3 items-start border-t border-accent-red/20 pt-4">
              <span className="text-accent-red font-bold mt-0.5">&times;</span>
              <span className="text-[0.95rem] text-muted-text leading-relaxed font-semibold">
                You aren&apos;t open to changing existing team workflows and system protocols.
              </span>
            </li>
          </ul>
        </div>

      </div>
    </section>
  );
}
