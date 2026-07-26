"use client";

import { useState } from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import Image from "next/image";
import Navigation from "@/components/Navigation";
import Footer from "@/components/Footer";

export default function ScopingContent() {
  // Form fields
  const [name, setName] = useState("");
  const [role, setRole] = useState("");
  const [company, setCompany] = useState("");
  const [timezone, setTimezone] = useState("");
  const [headache, setHeadache] = useState("");
  const [solvedBefore, setSolvedBefore] = useState("");
  const [teamSize, setTeamSize] = useState("");
  const [nextStep, setNextStep] = useState("");

  // Validation / status states
  const [errors, setErrors] = useState<{ [key: string]: string }>({});
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitError, setSubmitError] = useState("");

  const { scrollY } = useScroll();
  const yParallax = useTransform(scrollY, [0, 800], [0, -60]);
  const scaleParallax = useTransform(scrollY, [0, 800], [1.02, 1.08]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const tempErrors: { [key: string]: string } = {};

    if (!name.trim()) tempErrors.name = "Name is required";
    if (!role.trim()) tempErrors.role = "Role is required";
    if (!company.trim()) tempErrors.company = "Company is required";
    if (!timezone.trim()) tempErrors.timezone = "Country / Time Zone is required";
    if (!headache.trim()) tempErrors.headache = "Please describe your operational headache";
    if (!solvedBefore) tempErrors.solvedBefore = "Please select an option";
    if (!teamSize) tempErrors.teamSize = "Please select team size";
    if (!nextStep) tempErrors.nextStep = "Please select your preferred next step";

    if (Object.keys(tempErrors).length > 0) {
      setErrors(tempErrors);
      return;
    }

    setErrors({});
    setIsSubmitting(true);
    setSubmitError("");

    try {
      const response = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          name,
          role,
          company,
          timezone,
          teamSize,
          solvedBefore,
          headache,
          nextStep,
        }),
      });

      const data = await response.json();
      if (!response.ok || !data.success) {
        throw new Error(data.error || "Failed to submit. Please try again.");
      }

      setIsSubmitted(true);
    } catch (err: any) {
      setSubmitError(err.message || "An unexpected error occurred.");
    } finally {
      setIsSubmitting(false);
    }
  };

  const resetForm = () => {
    setName("");
    setRole("");
    setCompany("");
    setTimezone("");
    setHeadache("");
    setSolvedBefore("");
    setTeamSize("");
    setNextStep("");
    setIsSubmitted(false);
  };

  return (
    <div className="flex flex-col min-h-screen bg-transparent text-primary-text font-sans">
      <Navigation />

      {/* Hero Header with full-screen parallax background image */}
      <header className="relative min-h-[75vh] flex items-center justify-center py-24 overflow-hidden bg-charcoal-base">
        
        {/* Background Image with subtle scroll scale and parallax translate */}
        <div className="absolute inset-0 z-0 w-full h-full overflow-hidden pointer-events-none">
          <motion.div 
            style={{ scale: scaleParallax, y: yParallax }} 
            className="absolute inset-0 w-full h-full"
          >
            <Image
              src="/assets/scoping-intake.png"
              alt="Sayagaa scoping form intake background"
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

        <div className="max-w-4xl mx-auto px-6 md:px-12 w-full flex flex-col gap-6 text-left relative z-10">
          
          {/* Glassmorphic floating card for readability and premium contrast */}
          <div className="flex flex-col gap-6 items-start bg-charcoal-base/70 backdrop-blur-xl border border-brass-accent/25 p-8 md:p-12 rounded-[2.5rem] shadow-[0_30px_70px_rgba(0,0,0,0.6)]">
            <span className="text-caption text-brass-accent font-mono tracking-widest font-bold">05 / INTAKE FORM</span>
            <h1 className="text-[2.5rem] md:text-[3.5rem] font-bold tracking-tight text-white leading-none font-display">
              Share a bit about your operations.
            </h1>
            <p className="text-body-base text-primary-text leading-relaxed font-semibold">
              We use this intake to understand whether a research sprint or build phase makes sense for you. No spam, no generic offers.
            </p>
          </div>
        </div>
      </header>

      <main className="flex-1 w-full max-w-3xl mx-auto px-6 py-24 relative z-10">
        {/* Stateful form display */}
        {isSubmitted ? (
          <div className="bg-secondary-surface p-8 sm:p-12 rounded-[2.5rem] text-center flex flex-col gap-4 items-center">
            <span className="text-caption text-brass-accent font-bold tracking-wider font-mono bg-brass-accent/10 border border-brass-accent/20 rounded-full px-4 py-1">
              [ Submission.Success ]
            </span>
            <h3 className="text-[1.5rem] font-bold text-primary-text font-display mt-2">Inquiry Securely Logged</h3>
            <p className="text-body-base text-muted-text max-w-md leading-relaxed">
              We review every operational note within 24–48 hours. If there is a potential fit, our engineering desk will reach out to schedule a Discovery call.
            </p>
            <button
              onClick={resetForm}
              className="mt-6 text-[0.8rem] text-white bg-primary-text hover:bg-transparent hover:text-primary-text hover:border-primary-text/30 px-6 py-2.5 rounded-full border border-transparent cursor-pointer shadow-sm font-bold"
            >
              Submit Another Inquiry
            </button>
          </div>
        ) : (
          <div className="flex flex-col gap-12">
            
            {/* Form Box */}
            <form onSubmit={handleSubmit} className="flex flex-col gap-6 bg-secondary-surface p-8 sm:p-10 rounded-[2.5rem]">
              
              {/* Row 1: Name & Role */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                <div className="flex flex-col gap-2">
                  <label htmlFor="name" className="text-[0.75rem] font-mono text-muted-text font-bold uppercase tracking-wider">Your Name</label>
                  <input
                    type="text"
                    id="name"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    className={`bg-brass-accent/[0.03] backdrop-blur-md border p-3.5 rounded-xl text-primary-text focus:outline-none focus:border-brass-accent focus:bg-white/[0.08] transition-all ${
                      errors.name ? "border-red-500/50" : "border-brass-accent/15"
                    }`}
                    placeholder="Marcus Chen"
                  />
                  {errors.name && <span className="text-[0.7rem] text-red-500 font-mono font-bold mt-0.5">{errors.name}</span>}
                </div>

                <div className="flex flex-col gap-2">
                  <label htmlFor="role" className="text-[0.75rem] font-mono text-muted-text font-bold uppercase tracking-wider">Your Role</label>
                  <input
                    type="text"
                    id="role"
                    value={role}
                    onChange={(e) => setRole(e.target.value)}
                    className={`bg-brass-accent/[0.03] backdrop-blur-md border p-3.5 rounded-xl text-primary-text focus:outline-none focus:border-brass-accent focus:bg-white/[0.08] transition-all ${
                      errors.role ? "border-red-500/50" : "border-brass-accent/15"
                    }`}
                    placeholder="VP of Operations"
                  />
                  {errors.role && <span className="text-[0.7rem] text-red-500 font-mono font-bold mt-0.5">{errors.role}</span>}
                </div>
              </div>

              {/* Row 2: Company & Country/Timezone */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                <div className="flex flex-col gap-2">
                  <label htmlFor="company" className="text-[0.75rem] font-mono text-muted-text font-bold uppercase tracking-wider">Company Name</label>
                  <input
                    type="text"
                    id="company"
                    value={company}
                    onChange={(e) => setCompany(e.target.value)}
                    className={`bg-brass-accent/[0.03] backdrop-blur-md border p-3.5 rounded-xl text-primary-text focus:outline-none focus:border-brass-accent focus:bg-white/[0.08] transition-all ${
                      errors.company ? "border-red-500/50" : "border-brass-accent/15"
                    }`}
                    placeholder="Outreach Engine"
                  />
                  {errors.company && <span className="text-[0.7rem] text-red-500 font-mono font-bold mt-0.5">{errors.company}</span>}
                </div>

                <div className="flex flex-col gap-2">
                  <label htmlFor="timezone" className="text-[0.75rem] font-mono text-muted-text font-bold uppercase tracking-wider">Country / Time Zone</label>
                  <input
                    type="text"
                    id="timezone"
                    value={timezone}
                    onChange={(e) => setTimezone(e.target.value)}
                    className={`bg-brass-accent/[0.03] backdrop-blur-md border p-3.5 rounded-xl text-primary-text focus:outline-none focus:border-brass-accent focus:bg-white/[0.08] transition-all ${
                      errors.timezone ? "border-red-500/50" : "border-brass-accent/15"
                    }`}
                    placeholder="USA / EST"
                  />
                  {errors.timezone && <span className="text-[0.7rem] text-red-500 font-mono font-bold mt-0.5">{errors.timezone}</span>}
                </div>
              </div>

              {/* Row 3: Team Size & Next Step */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                <div className="flex flex-col gap-2">
                  <label htmlFor="teamSize" className="text-[0.75rem] font-mono text-muted-text font-bold uppercase tracking-wider">Approximate Team Size</label>
                  <select
                    id="teamSize"
                    value={teamSize}
                    onChange={(e) => setTeamSize(e.target.value)}
                    className={`bg-brass-accent/[0.03] backdrop-blur-md border p-3.5 rounded-xl text-primary-text focus:outline-none focus:border-brass-accent focus:bg-white/[0.08] transition-all ${
                      errors.teamSize ? "border-red-500/50" : "border-brass-accent/15"
                    }`}
                    style={{ colorScheme: "dark" }}
                  >
                    <option value="" className="bg-charcoal-base">Select size...</option>
                    <option value="1-10" className="bg-charcoal-base">1 – 10 people</option>
                    <option value="11-50" className="bg-charcoal-base">11 – 50 people</option>
                    <option value="51-200" className="bg-charcoal-base">51 – 200 people</option>
                    <option value="200+" className="bg-charcoal-base">200+ people</option>
                  </select>
                  {errors.teamSize && <span className="text-[0.7rem] text-red-500 font-mono font-bold mt-0.5">{errors.teamSize}</span>}
                </div>

                <div className="flex flex-col gap-2">
                  <label htmlFor="nextStep" className="text-[0.75rem] font-mono text-muted-text font-bold uppercase tracking-wider">Preferred Next Step</label>
                  <select
                    id="nextStep"
                    value={nextStep}
                    onChange={(e) => setNextStep(e.target.value)}
                    className={`bg-brass-accent/[0.03] backdrop-blur-md border p-3.5 rounded-xl text-primary-text focus:outline-none focus:border-brass-accent focus:bg-white/[0.08] transition-all ${
                      errors.nextStep ? "border-red-500/50" : "border-brass-accent/15"
                    }`}
                    style={{ colorScheme: "dark" }}
                  >
                    <option value="" className="bg-charcoal-base">Select step...</option>
                    <option value="call" className="bg-charcoal-base">Short 20-min intro call</option>
                    <option value="email" className="bg-charcoal-base">Review details via email first</option>
                  </select>
                  {errors.nextStep && <span className="text-[0.7rem] text-red-500 font-mono font-bold mt-0.5">{errors.nextStep}</span>}
                </div>
              </div>

              {/* Row 4: Solved Before */}
              <div className="flex flex-col gap-2">
                <label htmlFor="solvedBefore" className="text-[0.75rem] font-mono text-muted-text font-bold uppercase tracking-wider">Have you tried solving this with software or tools before?</label>
                <select
                  id="solvedBefore"
                  value={solvedBefore}
                  onChange={(e) => setSolvedBefore(e.target.value)}
                  className={`bg-brass-accent/[0.03] backdrop-blur-md border p-3.5 rounded-xl text-primary-text focus:outline-none focus:border-brass-accent focus:bg-white/[0.08] transition-all ${
                    errors.solvedBefore ? "border-red-500/50" : "border-brass-accent/15"
                  }`}
                  style={{ colorScheme: "dark" }}
                >
                  <option value="" className="bg-charcoal-base">Select option...</option>
                  <option value="yes" className="bg-charcoal-base">Yes, we tried but it failed / was too complex</option>
                  <option value="no" className="bg-charcoal-base">No, this is our first time seeking tools</option>
                  <option value="not-sure" className="bg-charcoal-base">Not sure / We have temporary custom integrations</option>
                </select>
                {errors.solvedBefore && <span className="text-[0.7rem] text-red-500 font-mono font-bold mt-0.5">{errors.solvedBefore}</span>}
              </div>

              {/* Row 5: Operational Headache */}
              <div className="flex flex-col gap-2">
                <label htmlFor="headache" className="text-[0.75rem] font-mono text-muted-text font-bold uppercase tracking-wider">What&apos;s the biggest operational headache you&apos;re facing right now?</label>
                <textarea
                  id="headache"
                  rows={4}
                  value={headache}
                  onChange={(e) => setHeadache(e.target.value)}
                  className={`bg-brass-accent/[0.03] backdrop-blur-md border p-3.5 rounded-xl text-primary-text focus:outline-none focus:border-brass-accent focus:bg-white/[0.08] transition-all ${
                    errors.headache ? "border-red-500/50" : "border-brass-accent/15"
                  }`}
                  placeholder="Describe your manual steps, communication drops, dispatcher friction, or data bottlenecks."
                />
                {errors.headache && <span className="text-[0.7rem] text-red-500 font-mono font-bold mt-0.5">{errors.headache}</span>}
              </div>

              {submitError && (
                <div className="text-[0.85rem] text-red-500 font-mono font-bold bg-red-500/10 border border-red-500/20 p-4 rounded-xl">
                  Error: {submitError}
                </div>
              )}

              {/* Submit Button */}
              <button
                type="submit"
                disabled={isSubmitting}
                className="mt-4 bg-primary-text text-white hover:bg-white hover:text-primary-text hover:border-primary-text/45 transition-all duration-300 font-bold py-3.5 px-6 rounded-full border border-transparent cursor-pointer shadow-sm text-[0.85rem] disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {isSubmitting ? "SUBMITTING SCOPE..." : "SUBMIT SYSTEM SCOPE →"}
              </button>

            </form>

            {/* Expectations Section */}
            <div className="bg-brass-accent/[0.03] backdrop-blur-xl border border-brass-accent/15 p-8 rounded-[2.5rem] flex flex-col gap-4 shadow-[0_20px_50px_rgba(0,0,0,0.3)]">
              <span className="text-[0.7rem] font-mono text-brass-accent uppercase tracking-wider font-bold">
                EXPECTATIONS
              </span>
              <h4 className="text-body-base font-bold text-primary-text font-display">
                What happens after you submit:
              </h4>
              <ul className="flex flex-col gap-3 text-[0.9rem] text-muted-text leading-relaxed font-semibold">
                <li className="flex gap-2.5 items-start">
                  <span className="text-brass-accent font-bold mt-0.5">&bull;</span>
                  <span><strong>Review Process</strong>: We review your submission details thoroughly within 24–48 hours to evaluate your system friction.</span>
                </li>
                <li className="flex gap-2.5 items-start border-t border-hairline/20 pt-3">
                  <span className="text-brass-accent font-bold mt-0.5">&bull;</span>
                  <span><strong>Fit Suggested</strong>: If it looks like a fit, we suggest either a short call or send a few follow-up questions to prepare a scoping plan.</span>
                </li>
                <li className="flex gap-2.5 items-start border-t border-hairline/20 pt-3">
                  <span className="text-brass-accent font-bold mt-0.5">&bull;</span>
                  <span><strong>Alternative Direction</strong>: If we are not the right partner, we will be honest, explain why, and where possible, point you to other specialists.</span>
                </li>
              </ul>
            </div>

          </div>
        )}
      </main>

      <Footer />
    </div>
  );
}
