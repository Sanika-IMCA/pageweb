"use client";

import { motion } from "framer-motion";

interface MetricItem {
  number: string;
  label: string;
  description: string;
  gradient: string;
}

const metrics: MetricItem[] = [
  {
    number: "120+",
    label: "Clients Served",
    description: "Ambitious startups, high-growth scale-ups, and global enterprise operations.",
    gradient: "from-blue-600 to-indigo-500",
  },
  {
    number: "$320M+",
    label: "Revenue / Funding",
    description: "Measurable commercial value unlocked through custom automation and database software.",
    gradient: "from-indigo-600 to-purple-500",
  },
  {
    number: "280+",
    label: "Projects Completed",
    description: "Production-grade digital systems, web assets, and custom full-stack solutions.",
    gradient: "from-purple-600 to-red-500",
  },
  {
    number: "99.99%",
    label: "System Uptime",
    description: "Fault-tolerant cron pipelines and API database runners designed for absolute reliability.",
    gradient: "from-blue-600 via-indigo-500 to-red-400",
  },
];

export default function PartnerNetwork() {
  return (
    <section className="py-32 px-6 md:px-12 bg-charcoal-base border-t border-hairline relative overflow-hidden">
      
      {/* Light soft lavender background orb */}
      <div className="absolute top-1/2 left-1/4 -translate-y-1/2 w-[300px] h-[300px] bg-purple-50/20 rounded-full blur-[80px] pointer-events-none" />

      <div className="max-w-7xl mx-auto flex flex-col gap-16 relative z-10">
        
        {/* Section Header */}
        <div className="flex flex-col gap-4 max-w-xl">
          <span className="text-caption text-brass-accent font-mono tracking-widest font-semibold">
            05 / IMPACT
          </span>
          <h2 className="text-[2.5rem] md:text-[3.5rem] font-bold tracking-tight text-primary-text leading-none">
            Company Numbers
          </h2>
          <p className="text-body-base text-muted-text mt-2">
            The quantitative proof of our engineering expertise, operational rigor, and dedication to real business outcomes.
          </p>
        </div>

        {/* Metrics Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 mt-8">
          {metrics.map((item, idx) => (
            <motion.div
              key={item.label}
              initial={{ opacity: 0, scale: 0.97 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: idx * 0.1, ease: [0.22, 1, 0.36, 1] }}
              className="bg-secondary-surface border border-white/60 p-8 rounded-[2rem] flex flex-col gap-4 hover:border-primary-text/20 transition-all duration-300 shadow-sm hover:shadow-md backdrop-blur-md"
            >
              {/* Massive Number Typography with light pastel gradients */}
              <span className={`text-[3.5rem] lg:text-[4.25rem] font-bold font-display leading-none tracking-tight block bg-gradient-to-r ${item.gradient} bg-clip-text text-transparent`}>
                {item.number}
              </span>

              {/* Label */}
              <div className="flex flex-col gap-2 mt-2">
                <span className="text-[0.75rem] font-mono text-muted-text uppercase tracking-wider font-bold">
                  {item.label}
                </span>
                <p className="text-[0.9rem] text-muted-text leading-relaxed">
                  {item.description}
                </p>
              </div>

            </motion.div>
          ))}
        </div>

      </div>
    </section>
  );
}
