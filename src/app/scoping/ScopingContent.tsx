"use client";

import { useState } from "react";
import Navigation from "@/components/Navigation";
import Footer from "@/components/Footer";

type ScopingPath = "business" | "partner";

export default function ScopingContent() {
  const [path, setPath] = useState<ScopingPath>("business");
  
  // Form values
  const [name, setName] = useState("");
  const [company, setCompany] = useState("");
  const [friction, setFriction] = useState("");
  const [budget, setBudget] = useState("");
  const [focusArea, setFocusArea] = useState("");
  const [proposal, setProposal] = useState("");

  // Validation / status states
  const [errors, setErrors] = useState<{ [key: string]: string }>({});
  const [isSubmitted, setIsSubmitted] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const tempErrors: { [key: string]: string } = {};

    if (!name.trim()) tempErrors.name = "Name is required";
    
    if (path === "business") {
      if (!company.trim()) tempErrors.company = "Company is required";
      if (!friction.trim()) tempErrors.friction = "Friction details are required";
      if (!budget.trim()) tempErrors.budget = "Budget selection is required";
    } else {
      if (!focusArea.trim()) tempErrors.focusArea = "Focus area selection is required";
      if (!proposal.trim()) tempErrors.proposal = "Proposal details are required";
    }

    if (Object.keys(tempErrors).length > 0) {
      setErrors(tempErrors);
      return;
    }

    // Success submission trigger
    setErrors({});
    setIsSubmitted(true);
  };

  const resetForm = () => {
    setName("");
    setCompany("");
    setFriction("");
    setBudget("");
    setFocusArea("");
    setProposal("");
    setIsSubmitted(false);
  };

  return (
    <div className="flex flex-col min-h-screen bg-charcoal-base text-primary-text font-sans">
      <Navigation />

      <main className="flex-1 w-full max-w-3xl mx-auto px-6 pt-28 pb-space-xxl">
        <div className="flex flex-col gap-space-sm border-b border-hairline pb-space-lg mb-space-lg">
          <span className="text-caption text-brass-accent">05 / Scope Inquiry</span>
          <h1 className="text-display-m lg:text-display-l">Define Your System</h1>
          <p className="text-body-l text-muted-text">
            Before we compile code, we research your business. Select your path below to begin.
          </p>
        </div>

        {/* Toggle Path Switcher */}
        <div className="flex items-center gap-space-sm mb-space-lg">
          <button
            onClick={() => { setPath("business"); resetForm(); }}
            className={`px-4 py-2 text-caption border transition-all duration-300 cursor-pointer ${
              path === "business"
                ? "border-brass-accent text-brass-accent"
                : "border-hairline text-muted-text hover:text-primary-text"
            }`}
          >
            Business Scoping
          </button>
          <button
            onClick={() => { setPath("partner"); resetForm(); }}
            className={`px-4 py-2 text-caption border transition-all duration-300 cursor-pointer ${
              path === "partner"
                ? "border-brass-accent text-brass-accent"
                : "border-hairline text-muted-text hover:text-primary-text"
            }`}
          >
            Partner Network
          </button>
        </div>

        {/* Stateful form display */}
        {isSubmitted ? (
          <div className="bg-secondary-surface border border-brass-accent/30 p-space-lg rounded text-center flex flex-col gap-space-sm items-center">
            <span className="text-caption text-brass-accent font-semibold tracking-wider font-mono">
              [ Submission.Success ]
            </span>
            <h3 className="text-heading text-primary-text mt-2">Inquiry Securely Logged</h3>
            <p className="text-body-base text-muted-text max-w-md">
              We study inquiries under operational discovery. Our engineering desk will connect with you via email in real time.
            </p>
            <button
              onClick={resetForm}
              className="mt-space-sm text-caption text-primary-text border border-hairline hover:border-brass-accent px-4 py-2 transition-colors cursor-pointer"
            >
              Reset Form
            </button>
          </div>
        ) : (
          <form onSubmit={handleSubmit} className="flex flex-col gap-space-md bg-secondary-surface border border-hairline p-space-md rounded">
            {/* Common Name field */}
            <div className="flex flex-col gap-2">
              <label htmlFor="name" className="text-caption text-muted-text">Your Name</label>
              <input
                type="text"
                id="name"
                value={name}
                onChange={(e) => setName(e.target.value)}
                className={`bg-charcoal-base border p-3 rounded text-primary-text focus:outline-none focus:border-brass-accent transition-colors ${
                  errors.name ? "border-red-500/50" : "border-hairline"
                }`}
                placeholder="Sanika Sadre"
              />
              {errors.name && <span className="text-micro text-red-500 font-mono">{errors.name}</span>}
            </div>

            {/* Path Dependent fields */}
            {path === "business" ? (
              <>
                <div className="flex flex-col gap-2">
                  <label htmlFor="company" className="text-caption text-muted-text">Company Name</label>
                  <input
                    type="text"
                    id="company"
                    value={company}
                    onChange={(e) => setCompany(e.target.value)}
                    className={`bg-charcoal-base border p-3 rounded text-primary-text focus:outline-none focus:border-brass-accent transition-colors ${
                      errors.company ? "border-red-500/50" : "border-hairline"
                }`}
                    placeholder="Sayaga Studios Inc."
                  />
                  {errors.company && <span className="text-micro text-red-500 font-mono">{errors.company}</span>}
                </div>

                <div className="flex flex-col gap-2">
                  <label htmlFor="friction" className="text-caption text-muted-text">Current Workflow Friction</label>
                  <textarea
                    id="friction"
                    rows={4}
                    value={friction}
                    onChange={(e) => setFriction(e.target.value)}
                    className={`bg-charcoal-base border p-3 rounded text-primary-text focus:outline-none focus:border-brass-accent transition-colors ${
                      errors.friction ? "border-red-500/50" : "border-hairline"
                }`}
                    placeholder="Describe manual steps, copy-paste friction, spreadsheet dependencies, or delays."
                  />
                  {errors.friction && <span className="text-micro text-red-500 font-mono">{errors.friction}</span>}
                </div>

                <div className="flex flex-col gap-2">
                  <label htmlFor="budget" className="text-caption text-muted-text">Scoping Budget</label>
                  <select
                    id="budget"
                    value={budget}
                    onChange={(e) => setBudget(e.target.value)}
                    className={`bg-charcoal-base border p-3 rounded text-primary-text focus:outline-none focus:border-brass-accent transition-colors ${
                      errors.budget ? "border-red-500/50" : "border-hairline"
                }`}
                  >
                    <option value="">Select a tier...</option>
                    <option value="tier-1">$10k – $25k</option>
                    <option value="tier-2">$25k – $50k</option>
                    <option value="tier-3">$50k – $100k</option>
                    <option value="tier-4">$100k+</option>
                  </select>
                  {errors.budget && <span className="text-micro text-red-500 font-mono">{errors.budget}</span>}
                </div>
              </>
            ) : (
              <>
                <div className="flex flex-col gap-2">
                  <label htmlFor="focusArea" className="text-caption text-muted-text">Focus Area / Network Role</label>
                  <select
                    id="focusArea"
                    value={focusArea}
                    onChange={(e) => setFocusArea(e.target.value)}
                    className={`bg-charcoal-base border p-3 rounded text-primary-text focus:outline-none focus:border-brass-accent transition-colors ${
                      errors.focusArea ? "border-red-500/50" : "border-hairline"
                }`}
                  >
                    <option value="">Select area...</option>
                    <option value="design">Design Studio / Creative Direction</option>
                    <option value="ops">Fractional COO / Operator</option>
                    <option value="vc">Venture Capital / Incubator</option>
                  </select>
                  {errors.focusArea && <span className="text-micro text-red-500 font-mono">{errors.focusArea}</span>}
                </div>

                <div className="flex flex-col gap-2">
                  <label htmlFor="proposal" className="text-caption text-muted-text">Proposal for Collaboration</label>
                  <textarea
                    id="proposal"
                    rows={4}
                    value={proposal}
                    onChange={(e) => setProposal(e.target.value)}
                    className={`bg-charcoal-base border p-3 rounded text-primary-text focus:outline-none focus:border-brass-accent transition-colors ${
                      errors.proposal ? "border-red-500/50" : "border-hairline"
                }`}
                    placeholder="Describe how we can partner on client discovery, white-labeled integrations, or co-delivery."
                  />
                  {errors.proposal && <span className="text-micro text-red-500 font-mono">{errors.proposal}</span>}
                </div>
              </>
            )}

            {/* Submit button */}
            <button
              type="submit"
              className="mt-space-sm bg-primary-text text-charcoal-base hover:bg-brass-accent hover:text-charcoal-base transition-colors duration-300 font-mono tracking-widest text-micro font-semibold py-3 border border-hairline cursor-pointer"
            >
              SUBMIT SYSTEM SCOPE &rarr;
            </button>

          </form>
        )}
      </main>

      <Footer />
    </div>
  );
}
