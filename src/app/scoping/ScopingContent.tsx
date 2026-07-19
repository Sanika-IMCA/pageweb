"use client";

import { useState } from "react";
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

  const handleSubmit = (e: React.FormEvent) => {
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
    setIsSubmitted(true);
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
    <div className="flex flex-col min-h-screen bg-charcoal-base text-primary-text font-sans">
      <Navigation />

      <main className="flex-1 w-full max-w-3xl mx-auto px-6 pt-40 pb-24">
        
        {/* Header */}
        <div className="flex flex-col gap-4 border-b border-hairline pb-10 mb-12">
          <span className="text-caption text-brass-accent font-mono tracking-widest font-bold">05 / INTAKE FORM</span>
          <h1 className="text-[2.5rem] md:text-[3.5rem] font-bold tracking-tight text-primary-text leading-none font-display">
            Share a bit about your operations.
          </h1>
          <p className="text-body-l text-muted-text mt-2 leading-relaxed">
            We use this intake to understand whether a research sprint or build phase makes sense for you. No spam, no generic offers.
          </p>
        </div>

        {/* Stateful form display */}
        {isSubmitted ? (
          <div className="bg-secondary-surface border border-white/60 p-8 sm:p-12 rounded-[2.5rem] text-center flex flex-col gap-4 items-center shadow-sm backdrop-blur-md">
            <span className="text-caption text-blue-600 font-bold tracking-wider font-mono bg-blue-50/70 border border-blue-100/50 rounded-full px-4 py-1">
              [ Submission.Success ]
            </span>
            <h3 className="text-[1.5rem] font-bold text-primary-text font-display mt-2">Inquiry Securely Logged</h3>
            <p className="text-body-base text-muted-text max-w-md leading-relaxed">
              We review every operational note within 24–48 hours. If there is a potential fit, our engineering desk will reach out to schedule a Discovery call.
            </p>
            <button
              onClick={resetForm}
              className="mt-6 text-[0.8rem] text-white bg-primary-text hover:bg-transparent hover:text-primary-text hover:border-primary-text/30 px-6 py-2.5 rounded-full border border-transparent transition-all duration-300 font-bold shadow-sm"
            >
              Submit Another Inquiry
            </button>
          </div>
        ) : (
          <div className="flex flex-col gap-12">
            
            {/* Form Box */}
            <form onSubmit={handleSubmit} className="flex flex-col gap-6 bg-secondary-surface border border-white/60 p-8 sm:p-10 rounded-[2.5rem] shadow-sm backdrop-blur-md">
              
              {/* Row 1: Name & Role */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                <div className="flex flex-col gap-2">
                  <label htmlFor="name" className="text-[0.75rem] font-mono text-muted-text font-bold uppercase tracking-wider">Your Name</label>
                  <input
                    type="text"
                    id="name"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    className={`bg-white/40 border p-3.5 rounded-xl text-primary-text focus:outline-none focus:border-brass-accent focus:bg-white transition-all ${
                      errors.name ? "border-red-500/50" : "border-hairline/60"
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
                    className={`bg-white/40 border p-3.5 rounded-xl text-primary-text focus:outline-none focus:border-brass-accent focus:bg-white transition-all ${
                      errors.role ? "border-red-500/50" : "border-hairline/60"
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
                    className={`bg-white/40 border p-3.5 rounded-xl text-primary-text focus:outline-none focus:border-brass-accent focus:bg-white transition-all ${
                      errors.company ? "border-red-500/50" : "border-hairline/60"
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
                    className={`bg-white/40 border p-3.5 rounded-xl text-primary-text focus:outline-none focus:border-brass-accent focus:bg-white transition-all ${
                      errors.timezone ? "border-red-500/50" : "border-hairline/60"
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
                    className={`bg-white/40 border p-3.5 rounded-xl text-primary-text focus:outline-none focus:border-brass-accent focus:bg-white transition-all ${
                      errors.teamSize ? "border-red-500/50" : "border-hairline/60"
                    }`}
                  >
                    <option value="">Select size...</option>
                    <option value="1-10">1 – 10 people</option>
                    <option value="11-50">11 – 50 people</option>
                    <option value="51-200">51 – 200 people</option>
                    <option value="200+">200+ people</option>
                  </select>
                  {errors.teamSize && <span className="text-[0.7rem] text-red-500 font-mono font-bold mt-0.5">{errors.teamSize}</span>}
                </div>

                <div className="flex flex-col gap-2">
                  <label htmlFor="nextStep" className="text-[0.75rem] font-mono text-muted-text font-bold uppercase tracking-wider">Preferred Next Step</label>
                  <select
                    id="nextStep"
                    value={nextStep}
                    onChange={(e) => setNextStep(e.target.value)}
                    className={`bg-white/40 border p-3.5 rounded-xl text-primary-text focus:outline-none focus:border-brass-accent focus:bg-white transition-all ${
                      errors.nextStep ? "border-red-500/50" : "border-hairline/60"
                    }`}
                  >
                    <option value="">Select step...</option>
                    <option value="call">Short 20-min intro call</option>
                    <option value="email">Review details via email first</option>
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
                  className={`bg-white/40 border p-3.5 rounded-xl text-primary-text focus:outline-none focus:border-brass-accent focus:bg-white transition-all ${
                    errors.solvedBefore ? "border-red-500/50" : "border-hairline/60"
                  }`}
                >
                  <option value="">Select option...</option>
                  <option value="yes">Yes, we tried but it failed / was too complex</option>
                  <option value="no">No, this is our first time seeking tools</option>
                  <option value="not-sure">Not sure / We have temporary custom integrations</option>
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
                  className={`bg-white/40 border p-3.5 rounded-xl text-primary-text focus:outline-none focus:border-brass-accent focus:bg-white transition-all ${
                    errors.headache ? "border-red-500/50" : "border-hairline/60"
                  }`}
                  placeholder="Describe your manual steps, communication drops, dispatcher friction, or data bottlenecks."
                />
                {errors.headache && <span className="text-[0.7rem] text-red-500 font-mono font-bold mt-0.5">{errors.headache}</span>}
              </div>

              {/* Submit Button */}
              <button
                type="submit"
                className="mt-4 bg-primary-text text-white hover:bg-white hover:text-primary-text hover:border-primary-text/45 transition-all duration-300 font-bold py-3.5 px-6 rounded-full border border-transparent cursor-pointer shadow-sm text-[0.85rem]"
              >
                SUBMIT SYSTEM SCOPE &rarr;
              </button>

            </form>

            {/* Expectations Section */}
            <div className="bg-blue-50/20 border border-blue-100/50 p-8 rounded-[2.5rem] flex flex-col gap-4 backdrop-blur-md">
              <span className="text-[0.7rem] font-mono text-blue-600 uppercase tracking-wider font-bold">
                EXPECTATIONS
              </span>
              <h4 className="text-body-base font-bold text-primary-text font-display">
                What happens after you submit:
              </h4>
              <ul className="flex flex-col gap-3 text-[0.9rem] text-muted-text leading-relaxed font-semibold">
                <li className="flex gap-2.5 items-start">
                  <span className="text-blue-500 font-bold mt-0.5">&bull;</span>
                  <span><strong>Review Process</strong>: We review your submission details thoroughly within 24–48 hours to evaluate your system friction.</span>
                </li>
                <li className="flex gap-2.5 items-start border-t border-hairline/20 pt-3">
                  <span className="text-blue-500 font-bold mt-0.5">&bull;</span>
                  <span><strong>Fit Suggested</strong>: If it looks like a fit, we suggest either a short call or send a few follow-up questions to prepare a scoping plan.</span>
                </li>
                <li className="flex gap-2.5 items-start border-t border-hairline/20 pt-3">
                  <span className="text-blue-500 font-bold mt-0.5">&bull;</span>
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
