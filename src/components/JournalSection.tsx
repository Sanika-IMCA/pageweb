"use client";

import { motion } from "framer-motion";
import Link from "next/link";

interface JournalEntry {
  date: string;
  category: string;
  title: string;
  description: string;
  type: "blue" | "red" | "purple";
}

const entries: JournalEntry[] = [
  {
    date: "July 15, 2026",
    category: "Design",
    title: "The Design Language of Next-Generation SaaS Products",
    description: "An exploration of restraint, modern serif display typography, and weighted micro-animations that communicate visual authority.",
    type: "blue",
  },
  {
    date: "June 28, 2026",
    category: "Engineering",
    title: "Transitioning to Webhook-First Database Architectures",
    description: "How event-driven pipelines protect data boundaries, bypass API throttling, and simplify high-volume query routing systems.",
    type: "purple",
  },
  {
    date: "May 12, 2026",
    category: "AI Systems",
    title: "Leveraging Large Language Models for Clean Data Structuring",
    description: "Strategies for mapping multi-agent pipeline scripts that extract structured JSON schemas from unstructured operator logs.",
    type: "red",
  },
];

export default function JournalSection() {
  return (
    <section id="journal" className="py-32 px-6 md:px-12 bg-charcoal-base border-t border-hairline relative">
      
      {/* Light soft blue background orb */}
      <div className="absolute top-1/3 right-1/4 w-[300px] h-[300px] bg-blue-50/15 rounded-full blur-[80px] pointer-events-none" />

      <div className="max-w-7xl mx-auto flex flex-col gap-16 relative z-10">
        
        {/* Section Header */}
        <div className="flex flex-col gap-4 max-w-xl">
          <span className="text-caption text-brass-accent font-mono tracking-widest font-semibold">
            06 / JOURNAL
          </span>
          <h2 className="text-[2.5rem] md:text-[3.5rem] font-bold tracking-tight text-primary-text leading-none">
            Insights & Writing
          </h2>
          <p className="text-body-base text-muted-text mt-2">
            Weekly essays documenting our technical research, engineering discoveries, design systems, and product lessons.
          </p>
        </div>

        {/* Editorial Journal List */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 mt-8">
          {entries.map((item, idx) => {
            let badgeColor = "bg-blue-50/70 text-blue-600 border-blue-100/50";
            if (item.type === "red") {
              badgeColor = "bg-red-50/70 text-red-500 border-red-100/50";
            } else if (item.type === "purple") {
              badgeColor = "bg-purple-50/70 text-purple-600 border-purple-100/50";
            }

            return (
              <motion.div
                key={item.title}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: idx * 0.15, ease: [0.22, 1, 0.36, 1] }}
                className="bg-secondary-surface border border-white/60 p-8 rounded-[2rem] flex flex-col justify-between gap-12 group hover:border-primary-text/25 transition-colors duration-300 shadow-sm backdrop-blur-md"
              >
                <div className="flex flex-col gap-4">
                  {/* Meta details */}
                  <div className="flex justify-between items-center text-micro font-mono text-muted-text font-bold">
                    <span>{item.date}</span>
                    <span className={`border rounded-full px-2 py-0.5 uppercase tracking-wider text-[0.6rem] font-semibold ${badgeColor}`}>
                      {item.category}
                    </span>
                  </div>

                  {/* Title */}
                  <h3 className="text-[1.35rem] sm:text-[1.5rem] font-bold text-primary-text leading-snug group-hover:text-brass-accent transition-colors mt-2 font-display">
                    {item.title}
                  </h3>

                  {/* Short description */}
                  <p className="text-[0.95rem] text-muted-text leading-relaxed mt-2">
                    {item.description}
                  </p>
                </div>

                <div className="border-t border-hairline pt-4 mt-auto">
                  <Link
                    href="/log"
                    className="inline-flex items-center gap-2 text-[0.8rem] font-mono font-semibold text-primary-text hover:text-brass-accent transition-colors py-1 relative after:absolute after:bottom-0 after:left-0 after:right-0 after:h-[1px] after:bg-primary-text after:scale-x-0 group-hover:after:scale-x-100 after:origin-left after:transition-transform"
                  >
                    Read Article &rarr;
                  </Link>
                </div>

              </motion.div>
            );
          })}
        </div>

      </div>
    </section>
  );
}
