"use client";

import { motion } from "framer-motion";

interface Testimonial {
  quote: string;
  author: string;
  role: string;
  company: string;
  metric: string;
  metricLabel: string;
  type: "blue" | "red" | "purple";
}

const testimonials: Testimonial[] = [
  {
    quote: "Sayaga Studios re-engineered our delivery dispatch pipeline. The technical implementation was clean, but their deep understanding of our business operations is what truly set them apart.",
    author: "Marcus Chen",
    role: "VP of Operations",
    company: "Outreach Engine",
    metric: "4.2 hrs",
    metricLabel: "Saved Per Operator / Day",
    type: "blue",
  },
  {
    quote: "The AI communication agents they built are extremely robust. They avoided the standard over-engineering pitfalls and built exactly what we needed to scale our qualification queues.",
    author: "Sarah Jenkins",
    role: "Founder",
    company: "Founder Inbox",
    metric: "3.5x",
    metricLabel: "Lead Processing Scale",
    type: "red",
  },
  {
    quote: "Their developer team delivered production-grade compliance scanning automation ahead of schedule. The accuracy is absolute and our operational cost dropped instantly.",
    author: "David Vance",
    role: "CTO",
    company: "Brand Auditor",
    metric: "99.4%",
    metricLabel: "Scrape Scan Accuracy",
    type: "purple",
  },
];

export default function Difference() {
  return (
    <section className="py-32 px-6 md:px-12 bg-charcoal-base border-t border-hairline">
      <div className="max-w-7xl mx-auto flex flex-col gap-16">
        
        {/* Section Header */}
        <div className="flex flex-col gap-4 max-w-xl">
          <span className="text-caption text-brass-accent font-mono tracking-widest font-semibold">
            04 / PROOF
          </span>
          <h2 className="text-[2.5rem] md:text-[3.5rem] font-bold tracking-tight text-primary-text leading-none">
            Client Testimonials
          </h2>
          <p className="text-body-base text-muted-text mt-2">
            Read what operators and technical founders say about our systems engineering process and the outcomes we deliver.
          </p>
        </div>

        {/* Testimonials Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 mt-8">
          {testimonials.map((item, idx) => {
            let badgeColor = "bg-blue-50/70 text-blue-600 border-blue-100/50";
            if (item.type === "red") {
              badgeColor = "bg-red-50/70 text-red-500 border-red-100/50";
            } else if (item.type === "purple") {
              badgeColor = "bg-purple-50/70 text-purple-600 border-purple-100/50";
            }

            return (
              <motion.div
                key={item.company}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: idx * 0.15, ease: [0.22, 1, 0.36, 1] }}
                className="bg-secondary-surface border border-white/60 p-8 rounded-[2rem] flex flex-col justify-between gap-8 hover:border-primary-text/20 transition-colors duration-300 relative group shadow-sm backdrop-blur-md"
              >
                <div className="flex flex-col gap-4">
                  {/* Visual quote mark */}
                  <span className="text-[3rem] font-display text-muted-text/10 leading-none absolute top-4 left-6 pointer-events-none group-hover:text-primary-text/[0.04] transition-colors duration-300">
                    &ldquo;
                  </span>

                  <p className="text-body-base text-primary-text leading-relaxed relative z-10 font-normal italic">
                    &ldquo;{item.quote}&rdquo;
                  </p>
                </div>

                <div className="flex flex-col gap-4 border-t border-hairline pt-6">
                  {/* Author Info */}
                  <div className="flex flex-col">
                    <span className="text-body-base text-primary-text font-bold">{item.author}</span>
                    <span className="text-micro font-mono text-muted-text mt-0.5 font-semibold">
                      {item.role}, {item.company}
                    </span>
                  </div>

                  {/* Measurable Result Metric with custom light colors */}
                  <div className={`flex items-baseline gap-2 border rounded-2xl px-4 py-3 ${badgeColor}`}>
                    <span className="text-[1.5rem] font-bold font-display leading-none">
                      {item.metric}
                    </span>
                    <span className="text-[0.7rem] font-mono uppercase tracking-wider font-semibold">
                      {item.metricLabel}
                    </span>
                  </div>
                </div>

              </motion.div>
            );
          })}
        </div>

      </div>
    </section>
  );
}
