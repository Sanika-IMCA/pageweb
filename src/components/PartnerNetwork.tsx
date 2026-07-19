"use client";

import { motion } from "framer-motion";

interface PartnerStep {
  step: string;
  title: string;
  description: string;
}

const partnerSteps: PartnerStep[] = [
  { step: "01", title: "Identify Friction", description: "Spot bottlenecks in a portfolio company or agency client's workflow." },
  { step: "02", title: "Discovery Handoff", description: "Introduce Sayaga Studios to perform deep discovery and workflow audits." },
  { step: "03", title: "Production Build", description: "We design, code, and securely deploy custom systems assets." },
  { step: "04", title: "Ecosystem Win", description: "Unlock scaling throughput, share project revenues, or white-label outputs." },
];

export default function PartnerNetwork() {
  return (
    <section id="partners" className="py-space-xxl px-6 bg-charcoal-base border-t border-hairline">
      <div className="max-w-7xl mx-auto flex flex-col gap-space-xl">
        
        {/* Section Header */}
        <div className="flex flex-col gap-space-xxs max-w-xl">
          <span className="text-caption text-brass-accent">08 / Partners</span>
          <h2 className="text-display-l">Partner Network</h2>
          <p className="text-body-base text-muted-text mt-space-sm">
            For fractionals, VC portfolio leads, design studios, and agencies. We operate in parallel to construct high-leverage workflows.
          </p>
        </div>

        {/* 4-Step Horizontal Pipeline */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-space-md border-t border-hairline/20 pt-space-lg">
          {partnerSteps.map((item) => (
            <div key={item.step} className="flex flex-col gap-space-xxs p-space-sm bg-secondary-surface border border-hairline rounded">
              <span className="text-micro font-mono text-brass-accent font-semibold">{item.step}</span>
              <h3 className="text-heading text-primary-text font-medium mt-1">{item.title}</h3>
              <p className="text-body-base text-muted-text leading-relaxed mt-1">{item.description}</p>
            </div>
          ))}
        </div>

        {/* Benefits lists */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-space-md border-t border-hairline/20 pt-space-lg mt-space-sm">
          <div className="flex flex-col gap-1">
            <span className="text-caption text-brass-accent font-mono">01 · Revenue Sharing</span>
            <p className="text-body-base text-muted-text">
              We credit recurring margins or refer-back allocations on all scoping designs mapped.
            </p>
          </div>
          <div className="flex flex-col gap-1">
            <span className="text-caption text-brass-accent font-mono">02 · White-Label Deliverables</span>
            <p className="text-body-base text-muted-text">
              Embed our discovery, workflow auditing, and systems architecture under your own agency banner.
            </p>
          </div>
          <div className="flex flex-col gap-1">
            <span className="text-caption text-brass-accent font-mono">03 · Long-Term Support</span>
            <p className="text-body-base text-muted-text">
              Continuous diagnostic checks, API integrations monitoring, and routine bottleneck upgrades.
            </p>
          </div>
        </div>

      </div>
    </section>
  );
}
