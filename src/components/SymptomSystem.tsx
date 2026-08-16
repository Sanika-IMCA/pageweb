"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";

interface SymptomData {
  symptom: string;
  friction: string;
  system: string;
}

export default function SymptomSystem() {
  const [activeTab, setActiveTab] = useState(0);
  const [industry, setIndustry] = useState<string | null>(null);

  useEffect(() => {
    if (typeof window !== "undefined") {
      const params = new URLSearchParams(window.location.search);
      const ind = params.get("industry");
      if (ind) setIndustry(ind.toLowerCase());
    }
  }, []);

  const symptomsList = [
    { num: "01", name: "MANUAL DATA ENTRY" },
    { num: "02", name: "DISCONNECTED TOOLS" },
    { num: "03", name: "LEAD HANDOFFS" },
    { num: "04", name: "SPREADSHEET DEPENDENCY" },
    { num: "05", name: "LOW OPERATIONAL VISIBILITY" }
  ];

  // Dynamic Symptom data mapping based on personalization industry
  const getSymptomDetails = (idx: number): SymptomData => {
    const defaultData: SymptomData[] = [
      {
        symptom: "MANUAL DATA ENTRY",
        friction: "The same information is repeatedly copied between forms, spreadsheets, CRM records, and internal systems.",
        system: "Capture once → structure data → synchronize systems → trigger next action."
      },
      {
        symptom: "DISCONNECTED TOOLS",
        friction: "Teams maintain separate pieces of operational information across multiple tools.",
        system: "Connect existing tools → establish a reliable source of operational state → automate synchronization."
      },
      {
        symptom: "LEAD HANDOFFS",
        friction: "Leads move manually between salespeople, spreadsheets, CRM stages, and communication channels.",
        system: "Capture → qualify → route → follow up → update CRM automatically."
      },
      {
        symptom: "SPREADSHEET DEPENDENCY",
        friction: "Critical operational information lives in files that require manual maintenance and reconciliation.",
        system: "Centralize structured operational data → create controlled workflows → give operators a live operational view."
      },
      {
        symptom: "LOW OPERATIONAL VISIBILITY",
        friction: "Managers cannot easily see what is happening, what is blocked, or where work is being lost.",
        system: "Centralize operational state → define status → surface exceptions → create an operator control center."
      }
    ];

    if (industry === "recruitment") {
      const recruitmentData = [...defaultData];
      recruitmentData[0] = {
        symptom: "MANUAL DATA ENTRY",
        friction: "Candidate profiles, screening sheets, and placement records are repeatedly copied between qualification forms and the ATS.",
        system: "Candidate submits once → parse CV metadata → populate ATS files → trigger recruiter notification."
      };
      recruitmentData[1] = {
        symptom: "DISCONNECTED TOOLS",
        friction: "Sourcing boards, qualification forms, interview schedules, and recruiter emails operate as disconnected silos.",
        system: "Connect pipeline tools → synchronize interview state → write candidate status changes instantly."
      };
      recruitmentData[2] = {
        symptom: "LEAD HANDOFFS",
        friction: "Candidate submissions move manually from sourcers to recruiters, and then manually to account manager review queues.",
        system: "Automate dossier packaging → dispatch to manager review dashboard → capture thumbs up/down → notify candidate."
      };
      return recruitmentData[idx];
    }

    if (industry === "logistics") {
      const logisticsData = [...defaultData];
      logisticsData[0] = {
        symptom: "MANUAL DATA ENTRY",
        friction: "Load details, driver coordinates, and manifest notes are repeatedly copied between carrier websites and dispatch spreadsheets.",
        system: "Capture broker files → extract load parameters → populate driver schedules → send manifest instructions."
      };
      logisticsData[1] = {
        symptom: "DISCONNECTED TOOLS",
        friction: "GPS trackers, fleet schedules, driver WhatsApp channels, and billing tools operate as separate disconnected systems.",
        system: "Establish driver tracking API → write status to dispatch control panel → sync client dashboard → automate invoice."
      };
      logisticsData[2] = {
        symptom: "LEAD HANDOFFS",
        friction: "New load orders move manually from brokers to dispatch coordinators, and then manually to truck assignments.",
        system: "Load received → matching engine highlights closest qualified driver → dispatch notification triggers automatically."
      };
      return logisticsData[idx];
    }

    if (industry === "professional-services" || industry === "services" || industry === "professional") {
      const servicesData = [...defaultData];
      servicesData[0] = {
        symptom: "MANUAL DATA ENTRY",
        friction: "Client scoping details, project briefs, and billable values are repeatedly copied from inquiry forms into active project boards.",
        system: "Inquiry logged → create scoped workspace → map task cards → generate invoice draft in Stripe."
      };
      servicesData[1] = {
        symptom: "DISCONNECTED TOOLS",
        friction: "Active project boards, client feedback folders, time-tracking software, and accounting files operate as separate silos.",
        system: "Link project events to client portal → sync operator timers → report margins on centralized manager dashboard."
      };
      servicesData[2] = {
        symptom: "LEAD HANDOFFS",
        friction: "New client requirements move manually from sales reps to project leads, and then manually to delivery engineers.",
        system: "Convert approved scoping sheet to task templates → allocate resources → notify engineers of priority targets."
      };
      return servicesData[idx];
    }

    return defaultData[idx];
  };

  const currentDetails = getSymptomDetails(activeTab);

  return (
    <section className="py-24 px-6 md:px-12 bg-transparent border-t border-hairline relative select-none">
      <div className="max-w-7xl mx-auto flex flex-col gap-16 text-left">
        
        {/* Section Header */}
        <div className="flex flex-col gap-4 max-w-xl">
          <span className="text-[0.62rem] font-mono text-brass-accent font-bold uppercase tracking-widest">
            03 / METHODOLOGY
          </span>
          <h2 className="text-[2.25rem] sm:text-[2.75rem] font-bold text-primary-text font-display uppercase tracking-tight leading-none">
            FROM OPERATIONAL FRICTION<br />
            <span className="text-brass-accent">TO SYSTEM DESIGN.</span>
          </h2>
          <p className="text-body-base text-muted-text font-semibold">
            Choose a symptom below to see the operational breakdown and how we architect a clean technical alternative.
          </p>
        </div>

        {/* Interactive Layout Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-stretch">
          
          {/* Left Column: Symptoms selection panel (5 cols) */}
          <div className="lg:col-span-5 flex flex-col gap-3">
            <span className="text-micro font-mono text-muted-text/45 uppercase tracking-wider font-bold mb-1 pl-1">
              SELECT SYMPTOM
            </span>
            <div className="flex flex-col gap-2.5">
              {symptomsList.map((item, idx) => (
                <button
                  key={item.name}
                  onClick={() => setActiveTab(idx)}
                  className={`w-full text-left p-4.5 rounded-xl border transition-all duration-300 flex items-center justify-between group cursor-pointer ${
                    activeTab === idx
                      ? "bg-white border-brass-accent/35 shadow-[0_5px_15px_rgba(46,91,148,0.03)]"
                      : "bg-white/40 border-hairline hover:border-brass-accent/20 hover:bg-white/70"
                  }`}
                >
                  <div className="flex items-center gap-4">
                    <span className={`font-mono text-micro font-bold ${
                      activeTab === idx ? "text-brass-accent" : "text-muted-text/45"
                    }`}>
                      {item.num}
                    </span>
                    <span className="text-[0.8rem] font-mono font-bold text-primary-text tracking-wider uppercase">
                      {item.name}
                    </span>
                  </div>
                  
                  <span className={`text-[0.85rem] font-mono transition-transform duration-300 ${
                    activeTab === idx ? "text-brass-accent translate-x-1" : "text-muted-text/30 group-hover:translate-x-0.5"
                  }`}>
                    →
                  </span>
                </button>
              ))}
            </div>
          </div>

          {/* Right Column: Diagnostic Output Display (7 cols) */}
          <div className="lg:col-span-7 flex flex-col border border-hairline/65 bg-secondary-surface/10 rounded-[2rem] p-8 sm:p-12 shadow-sm relative overflow-hidden backdrop-blur-[2px]">
            
            {/* Visual technical label */}
            <span className="absolute top-4 right-6 text-[0.55rem] font-mono text-muted-text/35 uppercase select-none pointer-events-none">
              Diag System // Output View
            </span>

            <AnimatePresence mode="wait">
              <motion.div
                key={activeTab}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -10 }}
                transition={{ duration: 0.25, ease: "easeInOut" }}
                className="flex flex-col gap-10 justify-between h-full"
              >
                
                {/* Active Symptom Title */}
                <div className="flex flex-col gap-1">
                  <span className="text-micro font-mono text-brass-accent font-bold uppercase tracking-widest">
                    ACTIVE CASE
                  </span>
                  <h4 className="text-[1.35rem] font-bold text-primary-text font-display uppercase tracking-tight">
                    {currentDetails.symptom}
                  </h4>
                </div>

                {/* Friction Card Block */}
                <div className="border border-red-500/15 bg-white/70 p-6 rounded-xl flex flex-col gap-2.5 relative shadow-sm">
                  <span className="text-micro font-mono text-accent-red font-bold uppercase tracking-wider flex items-center gap-1.5">
                    <span className="w-1.5 h-1.5 rounded-full bg-accent-red" />
                    THE FRICTION
                  </span>
                  <p className="text-[0.88rem] text-primary-text font-semibold leading-relaxed">
                    {currentDetails.friction}
                  </p>
                </div>

                {/* System Designed Block */}
                <div className="border border-brass-accent/25 bg-brass-accent/[0.02] p-6 rounded-xl flex flex-col gap-2.5 relative shadow-sm">
                  <span className="text-micro font-mono text-brass-accent font-bold uppercase tracking-wider flex items-center gap-1.5">
                    <span className="w-1.5 h-1.5 rounded-full bg-brass-accent animate-pulse" />
                    WHAT A SYSTEM COULD DO
                  </span>
                  <p className="text-[0.88rem] text-primary-text font-bold leading-relaxed font-mono tracking-wide uppercase text-brass-accent">
                    {currentDetails.system}
                  </p>
                </div>

              </motion.div>
            </AnimatePresence>

          </div>

        </div>

      </div>
    </section>
  );
}
