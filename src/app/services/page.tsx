"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import Navigation from "@/components/Navigation";
import Footer from "@/components/Footer";

interface ServiceItem {
  num: string;
  name: string;
  target: string;
  duration: string;
  process: string[];
  deliverables: string[];
  outcome: string;
  ctaText: string;
  badgeColor: string;
  badgeBorder: string;
  hasSparkles?: boolean;
}

const services: ServiceItem[] = [
  {
    num: "01",
    name: "Research & Opportunity Sprint (Core)",
    target: "Founders and operators who know their workflows are messy but don't know exactly where to begin structural audits.",
    duration: "2 &mdash; 3 Weeks Scope",
    process: [
      "Discovery and Intake analysis setup",
      "Full process mapping from lead to dispatch",
      "1-2 live mapping validation sessions",
      "Pains, leaks, and tool scans compilation",
    ],
    deliverables: [
      "Full Business Research & Opportunity Map report",
      "High-fidelity System Node workflow diagrams",
      "Pain Matrix with severity and impact ratings",
      "30-60-90 Day build roadmap & opportunity portfolio",
    ],
    outcome: "You get the diagnostic clarity to make smart decisions about what to build, automate, or restructure—with or without us doing the final code implementation.",
    ctaText: "Apply for a Research Sprint",
    badgeColor: "bg-accent-blue-light text-brass-accent",
    badgeBorder: "border-brass-accent/15",
    hasSparkles: true,
  },
  {
    num: "02",
    name: "Solution Build & Implementation",
    target: "Clients who have completed the Research Sprint and want us to turn the roadmap into working custom databases and automated runs.",
    duration: "Milestone-Based Releases",
    process: [
      "Detailed scoping based on the opportunity sprint",
      "Lean builds using custom TypeScript and integration tools",
      "Iterative testing runs with real operator users",
      "Data migration and database schema validation",
    ],
    deliverables: [
      "Working web platforms, automations, and custom dashboards",
      "Standard operating integration documentation",
      "Basic admin training and developer handovers",
    ],
    outcome: "Your team gets usable, lightweight tools that genuinely reduce manual work and prevent broken customer handovers.",
    ctaText: "Discuss Build Options",
    badgeColor: "bg-accent-red-light/75 text-accent-red",
    badgeBorder: "border-accent-red/20",
  },
  {
    num: "03",
    name: "Ops & Product Retainer",
    target: "Growing scale-ups and established operations that require continuous system maintenance, optimization updates, and support.",
    duration: "Monthly / Quarterly Retainer",
    process: [
      "Monthly/quarterly metric reviews and audits",
      "Adjustment of API structures as workflows evolve",
      "Deployment of new automation triggers and filters",
      "Bug triage and real-time error monitor reviews",
    ],
    deliverables: [
      "Continuous system optimizations and cleanups",
      "Priority triage response and database audits",
      "Quarterly operational roadmap updates",
    ],
    outcome: "Your software and automated systems stay sharp, secure, and fully aligned with your business as you scale—no slowly decaying tools.",
    ctaText: "Request Retainer Details",
    badgeColor: "bg-purple-50/70 text-purple-600",
    badgeBorder: "border-purple-100/50",
  },
];

export default function ServicesPage() {
  return (
    <div className="flex flex-col min-h-screen bg-charcoal-base text-primary-text font-sans">
      
      {/* Navigation */}
      <Navigation />

      {/* Header section */}
      <header className="pt-40 pb-20 px-6 md:px-12 relative overflow-hidden">
        {/* Soft Background Orbs */}
        <div className="absolute inset-0 pointer-events-none z-0">
          <div className="absolute top-20 right-10 w-[350px] h-[350px] bg-accent-red-light/35 rounded-full blur-[90px]" />
          <div className="absolute bottom-10 left-10 w-[350px] h-[350px] bg-accent-blue-light/35 rounded-full blur-[90px]" />
        </div>

        <div className="max-w-4xl mx-auto flex flex-col gap-6 text-center relative z-10">
          <span className="text-caption text-brass-accent font-mono tracking-widest font-bold">
            PRODUCTIZED SERVICES
          </span>
          <h1 className="text-[2.75rem] sm:text-[3.75rem] font-bold tracking-tight text-primary-text leading-tight font-display">
            Services designed around research, <br />
            not random implementation.
          </h1>
          <p className="text-body-l text-muted-text max-w-2xl mx-auto leading-relaxed mt-2">
            Every engagement begins with our Research Sprint. From there, you can choose solution build phases and optimization support retainers based on your operational roadmap.
          </p>
        </div>
      </header>

      {/* Services Grid */}
      <main className="flex-1 py-16 px-6 md:px-12 relative z-10">
        <div className="max-w-5xl mx-auto flex flex-col gap-24">
          
          {/* Loop Services */}
          <div className="flex flex-col gap-20">
            {services.map((service, idx) => (
              <motion.div
                key={service.name}
                initial={{ opacity: 0, y: 40 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.7, delay: idx * 0.1 }}
                className="bg-gradient-to-br from-accent-blue-light/30 to-white/45 border border-brass-accent/25 p-8 sm:p-12 rounded-[2.5rem] shadow-sm backdrop-blur-md relative overflow-hidden grid grid-cols-1 lg:grid-cols-12 gap-12 hover:shadow-md transition-shadow duration-300"
              >
                {/* Glitter sparkles for sprint core card */}
                {service.hasSparkles && (
                  <>
                    <div className="absolute top-4 right-4 w-1.5 h-1.5 rounded-full bg-brass-accent opacity-30 animate-pulse" />
                    <div className="absolute top-12 right-12 w-1 h-1 rounded-full bg-brass-accent opacity-20" />
                  </>
                )}

                {/* Column Left: Name, Target, CTA */}
                <div className="lg:col-span-6 flex flex-col gap-6 justify-between">
                  <div className="flex flex-col gap-4">
                    <div className="flex items-center gap-4">
                      <span className="text-micro font-mono text-muted-text font-bold">ENGAGEMENT {service.num}</span>
                      <span
                        className={`text-[0.7rem] font-mono border rounded-full px-3 py-0.5 font-bold uppercase tracking-wider ${service.badgeColor} ${service.badgeBorder}`}
                        dangerouslySetInnerHTML={{ __html: service.duration }}
                      />
                    </div>
                    <h2 className="text-[1.85rem] sm:text-[2.25rem] font-bold tracking-tight text-brass-accent font-display leading-tight">
                      {service.name}
                    </h2>
                    <p className="text-body-base text-muted-text leading-relaxed font-semibold">
                      {service.target}
                    </p>
                  </div>

                  <div className="pt-6">
                    <Link
                      href="/scoping"
                      className="btn-premium-gradient inline-flex items-center gap-2 text-[0.85rem] font-bold py-3.5 px-8 rounded-full shadow-sm"
                    >
                      {service.ctaText} &rarr;
                    </Link>
                  </div>
                </div>

                {/* Column Right: Details (Process, Deliverables, Outcome) */}
                <div className="lg:col-span-6 flex flex-col gap-6 border-l border-hairline/60 lg:pl-12">
                  
                  {/* Scope description */}
                  <div className="flex flex-col gap-2">
                    <span className="text-micro font-mono text-muted-text uppercase tracking-wider font-bold">Scope of Work:</span>
                    <ul className="flex flex-col gap-2 text-[0.9rem] text-primary-text font-semibold">
                      {service.process.map((p) => (
                        <li key={p} className="flex gap-2 items-center">
                          <span className="w-1.5 h-1.5 rounded-full bg-brass-accent shrink-0" />
                          {p}
                        </li>
                      ))}
                    </ul>
                  </div>

                  {/* Deliverables list */}
                  <div className="flex flex-col gap-2 border-t border-hairline/50 pt-4">
                    <span className="text-micro font-mono text-muted-text uppercase tracking-wider font-bold">Key Deliverables:</span>
                    <ul className="flex flex-col gap-2 text-[0.9rem] text-primary-text font-semibold">
                      {service.deliverables.map((d) => (
                        <li key={d} className="flex gap-2 items-center">
                          <span className="w-1.5 h-1.5 rounded-full bg-accent-red shrink-0" />
                          {d}
                        </li>
                      ))}
                    </ul>
                  </div>

                  {/* Outcome statement */}
                  <div className="flex flex-col gap-2 border-t border-hairline/50 pt-4 bg-accent-blue-light/10 rounded-2xl p-4 border border-brass-accent/10">
                    <span className="text-micro font-mono text-brass-accent uppercase tracking-wider font-bold">EXPECTED OUTCOME</span>
                    <p className="text-[0.9rem] text-primary-text font-bold leading-relaxed">
                      {service.outcome}
                    </p>
                  </div>

                </div>

              </motion.div>
            ))}
          </div>

          {/* Not a fit section */}
          <section className="bg-accent-red-light/20 border border-accent-red/45 p-8 sm:p-12 rounded-[2.5rem] flex flex-col gap-6 backdrop-blur-md mt-12 relative overflow-hidden">
            <div className="absolute -top-12 -right-12 w-32 h-32 bg-accent-red-light/10 rounded-full blur-2xl pointer-events-none" />

            <div className="flex flex-col gap-2 max-w-xl">
              <span className="text-[0.7rem] font-mono text-accent-red uppercase tracking-wider font-bold">
                ENGAGEMENT BOUNDARIES
              </span>
              <h2 className="text-[1.85rem] font-bold text-primary-text font-display leading-tight">
                Who these services are NOT for.
              </h2>
              <p className="text-body-base text-muted-text">
                To maintain a high standard of craftsmanship and deliver high ROI outcomes, we are strict about client alignment.
              </p>
            </div>

            <ul className="grid grid-cols-1 md:grid-cols-3 gap-6 border-t border-accent-red/20 pt-6 mt-2">
              <li className="flex gap-3 items-start">
                <span className="text-accent-red font-bold mt-0.5">&times;</span>
                <span className="text-[0.9rem] text-muted-text leading-relaxed font-semibold">
                  <strong>No Discovery</strong>: Clients who only want a cheap developer to build features without doing intake audits.
                </span>
              </li>
              <li className="flex gap-3 items-start border-l border-accent-red/10 pl-0 md:pl-6">
                <span className="text-accent-red font-bold mt-0.5">&times;</span>
                <span className="text-[0.9rem] text-muted-text leading-relaxed font-semibold">
                  <strong>Closed Workflows</strong>: Teams who are unwilling to share spreadsheets, access keys, or change operational procedures.
                </span>
              </li>
              <li className="flex gap-3 items-start border-l border-accent-red/10 pl-0 md:pl-6">
                <span className="text-accent-red font-bold mt-0.5">&times;</span>
                <span className="text-[0.9rem] text-muted-text leading-relaxed font-semibold">
                  <strong>Instant Scale</strong>: Teams expecting instant database automation without allocating time for testing.
                </span>
              </li>
            </ul>
          </section>

        </div>
      </main>

      {/* Footer */}
      <Footer />

    </div>
  );
}
