"use client";

import { motion } from "framer-motion";

interface Column {
  numeral: string;
  title: string;
  subtitle: string;
  description: string;
  bullets: string[];
  iconColor: string;
  cardStyle: string;
  bulletColor: string;
}

const columns: Column[] = [
  {
    numeral: "01",
    title: "Research & Diagnosis",
    subtitle: "Understanding Operations First",
    description: "We map your workflows end‑to‑end and identify where time and money are leaking before recommending any tool or database build.",
    bullets: ["Less manual chasing", "Cleaner core data", "Faster operations decisions"],
    iconColor: "bg-accent-blue-light text-brass-accent border-brass-accent/15",
    cardStyle: "bg-accent-blue-light/35 border-brass-accent/20",
    bulletColor: "bg-brass-accent",
  },
  {
    numeral: "02",
    title: "Solution Design",
    subtitle: "Tailoring System Blueprints",
    description: "We design process changes, automations, database integrations, and light custom builds centered entirely around your operating reality.",
    bullets: ["Clearer team handovers", "Standardized steps", "Optimized software stack"],
    iconColor: "bg-accent-red-light/60 text-accent-red border-accent-red/20",
    cardStyle: "bg-white/45 border-hairline/60",
    bulletColor: "bg-accent-red shadow-[0_0_8px_rgba(229,147,147,0.85)]",
  },
  {
    numeral: "03",
    title: "Build & Implementation",
    subtitle: "Iterating High-Impact Wins",
    description: "We implement using trusted partner tools and custom TypeScript components, starting with the highest‑impact, lowest‑complexity operational wins.",
    bullets: ["Usable custom dashboards", "Zero operational friction", "Continuous support retainers"],
    iconColor: "bg-accent-blue-light text-brass-accent border-brass-accent/15",
    cardStyle: "bg-accent-blue-light/35 border-brass-accent/20",
    bulletColor: "bg-brass-accent",
  },
];

export default function Capabilities() {
  return (
    <section id="services" className="py-32 px-6 md:px-12 bg-charcoal-base border-t border-hairline relative">
      <div className="max-w-7xl mx-auto flex flex-col gap-20">
        
        {/* Section Header */}
        <div className="flex flex-col gap-4 max-w-xl">
          <span className="text-caption text-brass-accent font-mono tracking-widest font-bold">
            02 / WHAT WE DO
          </span>
          <h2 className="text-[2.5rem] md:text-[3.5rem] font-bold tracking-tight text-primary-text leading-none">
            What we do in one look.
          </h2>
          <p className="text-body-base text-muted-text mt-2">
            Systematic phases designed to move your company from operational friction to structured efficiency, without the bloated build overhead.
          </p>
        </div>

        {/* 3-Column Layout */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 mt-8">
          {columns.map((col, idx) => (
            <motion.div
              key={col.title}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: idx * 0.15, ease: [0.22, 1, 0.36, 1] }}
              className={`border p-8 rounded-[2rem] flex flex-col justify-between hover:border-brass-accent/25 transition-all duration-300 shadow-sm hover:shadow-md backdrop-blur-md relative overflow-hidden ${col.cardStyle}`}
            >
              <div className="flex flex-col gap-6">
                
                {/* Header icon row */}
                <div className="flex justify-between items-center">
                  <span className="text-micro font-mono text-muted-text font-bold">{col.numeral} &mdash;</span>
                  <span className={`text-[0.7rem] font-mono border rounded-full px-3 py-1 font-semibold uppercase tracking-wider ${col.iconColor}`}>
                    {col.subtitle}
                  </span>
                </div>

                {/* Content */}
                <div className="flex flex-col gap-3">
                  <h3 className="text-[1.5rem] font-bold text-primary-text font-display">
                    {col.title}
                  </h3>
                  <p className="text-[0.95rem] text-muted-text leading-relaxed">
                    {col.description}
                  </p>
                </div>

              </div>

              {/* Outcomes Bullet List */}
              <div className="border-t border-hairline pt-6 mt-8">
                <span className="text-[0.7rem] font-mono text-primary-text uppercase tracking-wider font-bold block mb-4">
                  Expected Outcomes:
                </span>
                <ul className="flex flex-col gap-2.5">
                  {col.bullets.map((bullet) => (
                    <li key={bullet} className="flex items-center gap-2.5 text-[0.9rem] text-primary-text font-semibold">
                      <span className={`w-1.5 h-1.5 rounded-full ${col.bulletColor}`} />
                      {bullet}
                    </li>
                  ))}
                </ul>
              </div>

            </motion.div>
          ))}
        </div>

      </div>
    </section>
  );
}
