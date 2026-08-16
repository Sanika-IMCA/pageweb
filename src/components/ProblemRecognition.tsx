"use client";

import { useState, useEffect } from "react";

export default function ProblemRecognition() {
  const [industry, setIndustry] = useState<string | null>(null);

  useEffect(() => {
    if (typeof window !== "undefined") {
      const params = new URLSearchParams(window.location.search);
      const ind = params.get("industry");
      if (ind) setIndustry(ind.toLowerCase());
    }
  }, []);

  // Set default flow nodes & copy
  let flowNodes = ["SPREADSHEETS", "EMAIL", "WHATSAPP", "MANUAL HANDOFFS", "DISCONNECTED TOOLS"];
  let supportingText = "If your team is repeatedly copying information, checking multiple systems, chasing updates, or manually moving work between people, there is probably an operational system worth examining.";

  if (industry === "recruitment") {
    flowNodes = ["APPLICATIONS", "SCREENING", "CRM STAGES", "MANUAL COORDINATION", "DISCONNECTED TOOLS"];
    supportingText = "If your recruiters are repeatedly copying candidate profiles, checking multiple qualification queues, chasing interview times, or manually forwarding CVs between email and CRM, there is probably an operational hiring system worth examining.";
  } else if (industry === "logistics") {
    flowNodes = ["DISPATCH", "SCHEDULING", "TELEMETRY", "MANUAL HANDOFFS", "DISCONNECTED TOOLS"];
    supportingText = "If your fleet operators are repeatedly copying route information, checking multiple dispatch platforms, chasing driver updates, or manually moving jobs between load boards, there is probably an operational logistics system worth examining.";
  } else if (industry === "professional-services" || industry === "services" || industry === "professional") {
    flowNodes = ["LEAD INTAKE", "PROPOSALS", "DELIVERY PLANS", "MANUAL COPIES", "DISCONNECTED TOOLS"];
    supportingText = "If your team is repeatedly copying client requirements, checking multiple task trackers, chasing status reports, or manually coordinating deliverables, there is probably an operational service delivery system worth examining.";
  }

  const handleScrollToTarget = () => {
    const el = document.getElementById("what-we-build");
    if (el) {
      el.scrollIntoView({ behavior: "smooth" });
    }
  };

  return (
    <section className="py-24 px-6 md:px-12 bg-charcoal-base border-t border-hairline relative select-none">
      <div className="max-w-7xl mx-auto flex flex-col gap-12 text-left">
        
        {/* Strip Header */}
        <div className="flex flex-col gap-2">
          <span className="text-[0.62rem] font-mono text-brass-accent font-bold uppercase tracking-widest">
            02 / DIAGNOSIS
          </span>
          <h2 className="text-[1.25rem] sm:text-[1.5rem] font-bold text-primary-text font-display uppercase tracking-tight">
            YOUR OPERATION MIGHT LOOK LIKE THIS.
          </h2>
        </div>

        {/* 5-Node Flow Visual Container */}
        <div className="w-full border border-hairline/65 bg-secondary-surface/10 rounded-[1.5rem] p-6 sm:p-10 shadow-sm backdrop-blur-[2px]">
          <div className="flex flex-col md:flex-row items-center justify-between gap-4 md:gap-2">
            {flowNodes.map((node, idx) => (
              <div key={node} className="flex flex-col md:flex-row items-center gap-4 w-full md:w-auto">
                
                {/* Node Box */}
                <div className="bg-white border border-hairline px-6 py-4 rounded-xl shadow-sm flex items-center justify-center w-full md:w-[190px] min-h-[64px] transition-colors duration-300 hover:border-brass-accent/35">
                  <span className="text-[0.78rem] font-mono font-bold text-primary-text tracking-wider text-center uppercase">
                    {node}
                  </span>
                </div>

                {/* Flow Connector (+ sign) */}
                {idx < flowNodes.length - 1 && (
                  <div className="flex items-center justify-center shrink-0">
                    <span className="text-[1.1rem] font-mono text-brass-accent/70 font-semibold select-none">
                      +
                    </span>
                  </div>
                )}

              </div>
            ))}
          </div>
        </div>

        {/* Diagnostic Verdict & Supporting Copy Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start border-t border-hairline/45 pt-10 mt-2">
          
          <div className="lg:col-span-5 flex flex-col gap-1">
            <span className="text-micro font-mono text-muted-text/45 uppercase tracking-wider font-bold">
              VERDICT
            </span>
            <h3 className="text-[1.65rem] sm:text-[1.95rem] font-bold text-primary-text font-display uppercase tracking-tight leading-none">
              THE BUSINESS HAS GROWN.<br />
              <span className="text-brass-accent">THE SYSTEMS HAVEN&apos;T.</span>
            </h3>
          </div>

          <div className="lg:col-span-7 flex flex-col items-start gap-6">
            <p className="text-[0.92rem] text-muted-text font-semibold leading-relaxed max-w-xl">
              {supportingText}
            </p>
            
            <button
              onClick={handleScrollToTarget}
              className="inline-flex items-center text-[0.78rem] font-bold text-primary-text hover:text-brass-accent transition-colors duration-300 font-mono uppercase tracking-wider cursor-pointer border-b border-primary-text/20 hover:border-brass-accent/30 pb-1"
            >
              SEE HOW WE DIAGNOSE IT →
            </button>
          </div>

        </div>

      </div>
    </section>
  );
}
