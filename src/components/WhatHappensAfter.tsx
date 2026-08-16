"use client";

export default function WhatHappensAfter() {
  const steps = [
    {
      num: "01",
      label: "REVIEW",
      desc: "We review the operational context you provide."
    },
    {
      num: "02",
      label: "FIT",
      desc: "We determine whether there is a meaningful problem worth investigating."
    },
    {
      num: "03",
      label: "AUDIT",
      desc: "If appropriate, we conduct the Strategy & Operations Audit."
    },
    {
      num: "04",
      label: "BLUEPRINT",
      desc: "You receive a documented understanding of the problem and what should happen next."
    }
  ];

  return (
    <section className="py-24 px-6 md:px-12 bg-charcoal-base border-t border-hairline relative select-none">
      <div className="max-w-7xl mx-auto flex flex-col gap-16 text-left">
        
        {/* Section Header */}
        <div className="flex flex-col gap-2 max-w-xl">
          <span className="text-[0.62rem] font-mono text-brass-accent font-bold uppercase tracking-widest">
            12 / PROCESS
          </span>
          <h2 className="text-[2.25rem] sm:text-[2.75rem] font-bold text-primary-text font-display uppercase tracking-tight leading-none">
            WHAT HAPPENS AFTER<br />
            <span className="text-brass-accent">YOU SUBMIT?</span>
          </h2>
        </div>

        {/* 4-Step Timeline Flow */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8 relative">
          
          {/* Horizontal connecting line behind cards (desktop only) */}
          <div className="absolute top-[35px] left-10 right-10 h-[1px] bg-hairline/35 z-0 hidden md:block" />

          {steps.map((step) => (
            <div
              key={step.num}
              className="bg-white border border-hairline/60 p-6 rounded-2xl flex flex-col gap-4 shadow-sm relative z-10 hover:border-brass-accent/30 transition-colors duration-300"
            >
              <div className="flex justify-between items-center">
                <span className="w-8 h-8 rounded-full bg-brass-accent/10 border border-brass-accent/25 flex items-center justify-center text-micro font-mono font-bold text-brass-accent select-none">
                  {step.num}
                </span>
                <span className="text-[0.58rem] font-mono text-muted-text/35 uppercase tracking-widest">
                  STAGE
                </span>
              </div>

              <div className="flex flex-col gap-1.5 mt-2">
                <h3 className="text-[0.88rem] font-mono font-bold text-primary-text tracking-wider uppercase">
                  {step.label}
                </h3>
                <p className="text-[0.8rem] text-muted-text font-semibold leading-relaxed">
                  {step.desc}
                </p>
              </div>
            </div>
          ))}
        </div>

        {/* Footer Reassurance Card */}
        <div className="border border-brass-accent/20 bg-brass-accent/[0.02] p-8 rounded-[2rem] flex flex-col gap-4 shadow-sm mt-4">
          <div className="flex flex-col gap-0.5">
            <span className="text-micro font-mono text-brass-accent font-bold uppercase tracking-wider">
              CLIENT ASSURANCE POLICY
            </span>
            <strong className="text-[1.25rem] text-primary-text font-display uppercase tracking-tight leading-snug">
              NO PRESSURE TO BUILD.
            </strong>
          </div>
          <p className="text-[0.88rem] text-muted-text font-semibold leading-relaxed max-w-2xl">
            The Strategy & Operations Audit is designed to give you operational clarity before implementation. You receive the blueprint to keep, whether you decide to build with Sayagaa or not.
          </p>
        </div>

      </div>
    </section>
  );
}
