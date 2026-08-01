"use client";

import { motion, useScroll, useTransform } from "framer-motion";
import Image from "next/image";
import Link from "next/link";

interface CaseStudy {
  id: string;
  index: string;
  client: string;
  industry: string;
  systemBuilt: string;
  outcome: string;
  image: string;
  altText: string;
}

const caseStudies: CaseStudy[] = [
  {
    id: "outreach",
    index: "01",
    client: "Outreach Engine",
    industry: "Logistics",
    systemBuilt: "Workflow Automation & Dispatch Sequencer",
    outcome: "68% Open Rates",
    image: "/assets/outreach-engine.png",
    altText: "Outreach Engine campaign sequencer interface displaying multi-step automated dispatch node pathways.",
  },
  {
    id: "inbox",
    index: "02",
    client: "Founder Inbox",
    industry: "B2B Services",
    systemBuilt: "AI Email Agent & CRM Integration Hub",
    outcome: "4.2 hrs Saved/Day",
    image: "/assets/founder-inbox.png",
    altText: "Founder Inbox UI displaying semantic artificial intelligence triage summaries.",
  },
  {
    id: "pipeline",
    index: "03",
    client: "Sayagaa Pipeline",
    industry: "SaaS Ops",
    systemBuilt: "High-Volume Lead Pipeline Scraper",
    outcome: "3.5x Volume Scale",
    image: "/assets/content-engine.png",
    altText: "Sayaga Pipeline data compiler analytics displaying route scraping structures.",
  },
  {
    id: "auditor",
    index: "04",
    client: "Brand Auditor",
    industry: "Finance & Compliance",
    systemBuilt: "Regulatory Document Scan Compiler",
    outcome: "99.4% Scan Accuracy",
    image: "/assets/brand-auditor.png",
    altText: "Brand Auditor visual scanner displaying browser capture outputs.",
  },
];

export default function CaseStudies() {
  const { scrollY } = useScroll();
  const yParallax = useTransform(scrollY, [0, 800], [0, -60]);
  const scaleParallax = useTransform(scrollY, [0, 800], [1.02, 1.08]);

  return (
    <section id="work" className="relative w-full bg-transparent overflow-hidden">
      
      {/* Hero Header with full-screen parallax background image */}
      <div className="relative min-h-[65vh] flex items-center justify-center py-20 overflow-hidden bg-transparent border-b border-hairline">
        
        {/* Background Image with subtle scroll scale and parallax translate */}
        <div className="absolute inset-0 z-0 w-full h-full overflow-hidden pointer-events-none">
          <motion.div 
            style={{ scale: scaleParallax, y: yParallax }} 
            className="absolute inset-0 w-full h-full"
          >
            <Image
              src="/assets/work-compass.png"
              alt="Sayagaa work case studies explorer background"
              fill
              priority
              className="object-cover object-center opacity-95 contrast-[1.02] brightness-100"
            />
          </motion.div>

          {/* Warm Luxury Gradient Overlays for integration & contrast */}
          <div className="absolute inset-0 bg-gradient-to-t from-charcoal-base via-charcoal-base/30 to-transparent z-10" />
          <div className="absolute inset-0 bg-gradient-to-b from-charcoal-base/40 via-transparent to-transparent z-10" />
          
          {/* Subtle grid overlay blended on top of background image */}
          <div 
            className="absolute inset-0 opacity-10 mix-blend-overlay z-10"
            style={{
              backgroundImage: `
                linear-gradient(to right, rgba(46, 91, 148, 0.08) 1px, transparent 1px),
                linear-gradient(to bottom, rgba(46, 91, 148, 0.08) 1px, transparent 1px)
              `,
              backgroundSize: "80px 80px"
            }}
          />
        </div>

        <div className="max-w-7xl mx-auto px-6 md:px-12 w-full flex flex-col gap-6 text-left relative z-10">
          {/* Glassmorphic floating card for readability and premium contrast */}
          <div className="flex flex-col gap-6 items-start max-w-2xl bg-charcoal-base/70 backdrop-blur-xl border border-white/10 p-8 md:p-12 rounded-[2.5rem] shadow-[0_30px_70px_rgba(0,0,0,0.6)]">
            <span className="text-caption text-brass-accent font-mono tracking-widest font-semibold">
              02 / SELECTED WORK
            </span>
            <h1 className="text-[2.5rem] md:text-[3.5rem] font-bold tracking-tight text-[#262626] leading-none font-display">
              Featured Case Studies
            </h1>
            <p className="text-body-base text-primary-text leading-relaxed font-semibold">
              A curated selection of digital platforms, AI automation systems, and high-performance tools engineered to solve operational friction.
            </p>
          </div>
        </div>
      </div>

      {/* Case Studies Grid Content */}
      <div className="max-w-7xl mx-auto px-6 md:px-12 py-24 flex flex-col gap-24 relative z-10">
        <div className="flex flex-col gap-24 lg:gap-32">
          {caseStudies.map((study, idx) => {
            const isEven = idx % 2 === 0;
            return (
              <motion.div
                key={study.id}
                initial={{ opacity: 0, y: 40 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-100px" }}
                transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
                className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-16 items-center"
              >

                {/* Image Wrapper (Frosted visual borders) */}
                <div className={`lg:col-span-7 w-full ${isEven ? "lg:order-1" : "lg:order-2"}`}>
                  <Link href={`/work/${study.id}`} className="block group overflow-hidden rounded-[2rem] border border-white/10 bg-white/5 relative aspect-[16/10] shadow-[0_20px_50px_rgba(0,0,0,0.3)] hover:border-white/20 transition-all duration-300">
                    <div className="absolute inset-0 bg-blue-100/5 group-hover:bg-transparent transition-colors duration-500 z-10" />

                    <Image
                      src={study.image}
                      alt={study.altText}
                      fill
                      sizes="(max-w-1024px) 100vw, 55vw"
                      className="object-cover scale-100 group-hover:scale-[1.03] transition-transform duration-700 ease-[0.25, 1, 0.5, 1]"
                    />
                  </Link>
                </div>

                {/* Metadata & Description (Frosted card) */}
                <div className={`lg:col-span-5 flex flex-col gap-6 ${isEven ? "lg:order-2" : "lg:order-1"} bg-secondary-surface p-8 sm:p-12 rounded-[2rem] relative overflow-hidden border border-brass-accent/10 hover:border-brass-accent/40 hover:shadow-[0_30px_60px_rgba(46,91,148,0.1)] transition-all duration-500`}>

                  {/* Subtle Lavender orb inside card */}
                  <div className="absolute -top-12 -right-12 w-24 h-24 bg-purple-100/20 rounded-full blur-2xl pointer-events-none" />

                  <div className="flex items-center gap-4 text-micro font-mono text-muted-text font-bold">
                    <span>{study.index}</span>
                    <span>&bull;</span>
                    <span className="uppercase tracking-widest text-brass-accent">{study.industry}</span>
                  </div>

                  <h3 className="text-[1.85rem] md:text-[2.25rem] font-bold tracking-tight text-primary-text leading-tight font-display">
                    {study.client}
                  </h3>

                  <div className="flex flex-col gap-1 border-t border-hairline pt-4">
                    <span className="text-[0.75rem] font-mono text-muted-text uppercase tracking-wider font-semibold">System Built</span>
                    <span className="text-body-base text-primary-text font-medium">{study.systemBuilt}</span>
                  </div>

                  <div className="flex flex-col gap-1 border-t border-hairline pt-4">
                    <span className="text-[0.75rem] font-mono text-muted-text uppercase tracking-wider font-semibold">Measurable Outcome</span>
                    <span className="text-[1.2rem] font-bold text-primary-text bg-gradient-to-r from-blue-600 to-indigo-600 bg-clip-text text-transparent">{study.outcome}</span>
                  </div>

                  <div className="pt-2">
                    <Link
                      href={`/work/${study.id}`}
                      className="inline-flex items-center gap-2 text-[0.8rem] font-bold text-primary-text hover:text-brass-accent transition-colors py-2 relative after:absolute after:bottom-0 after:left-0 after:right-0 after:h-[1px] after:bg-primary-text after:scale-x-0 hover:after:scale-x-100 after:origin-left after:transition-transform"
                    >
                      Read Case Study &rarr;
                    </Link>
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
