"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import Navigation from "@/components/Navigation";
import Footer from "@/components/Footer";

export default function ScopingContent() {
  // Submission Type from URL scoping parameters
  const [submissionType, setSubmissionType] = useState("audit");

  // Group 01: About the Business
  const [name, setName] = useState("");
  const [role, setRole] = useState("");
  const [company, setCompany] = useState("");
  const [website, setWebsite] = useState("");
  const [timezone, setTimezone] = useState("");
  const [teamSize, setTeamSize] = useState("");

  // Group 02: Current Operation
  const [tools, setTools] = useState("");
  const [workflow, setWorkflow] = useState("");
  const [processPeople, setProcessPeople] = useState("");

  // Group 03: The Problem
  const [biggestHeadache, setBiggestHeadache] = useState("");
  const [selectedImpacts, setSelectedImpacts] = useState<string[]>([]);
  const [frequency, setFrequency] = useState("");
  const [ifNotFixed, setIfNotFixed] = useState("");
  const [peopleAffected, setPeopleAffected] = useState("");
  const [decidedBuild, setDecidedBuild] = useState("");

  // Group 04: Next Step
  const [nextStepPreference, setNextStepPreference] = useState("");
  const [extraNotes, setExtraNotes] = useState("");

  // Validation / status states
  const [errors, setErrors] = useState<{ [key: string]: string }>({});
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitError, setSubmitError] = useState("");

  useEffect(() => {
    if (typeof window !== "undefined") {
      const params = new URLSearchParams(window.location.search);
      const t = params.get("type");
      if (t) setSubmissionType(t);
    }
  }, []);

  // Handle Multi-Select Checkboxes for fixing this problem impact
  const handleImpactCheckbox = (val: string) => {
    if (selectedImpacts.includes(val)) {
      setSelectedImpacts(selectedImpacts.filter((item) => item !== val));
    } else {
      setSelectedImpacts([...selectedImpacts, val]);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const tempErrors: { [key: string]: string } = {};

    // Group 1 Validation
    if (!name.trim()) tempErrors.name = "Please enter your name.";
    if (!role.trim()) tempErrors.role = "Please enter your role.";
    if (!company.trim()) tempErrors.company = "Please enter your company name.";
    if (!timezone.trim()) tempErrors.timezone = "Please enter your country / time zone.";
    if (!teamSize) tempErrors.teamSize = "Please select your team size.";

    // Group 2 Validation
    if (!tools.trim()) tempErrors.tools = "Please tell us what tools you currently use.";
    if (!workflow.trim()) tempErrors.workflow = "Please describe how the process currently works.";
    if (!processPeople) tempErrors.processPeople = "Please select how many people are involved in the process.";

    // Group 3 Validation
    if (!biggestHeadache.trim()) tempErrors.biggestHeadache = "Please tell us what is currently slowing the operation down.";
    if (selectedImpacts.length === 0) tempErrors.changeImpact = "Please select at least one outcome option.";
    if (!frequency) tempErrors.frequency = "Please specify how often this problem occurs.";
    if (!ifNotFixed.trim()) tempErrors.ifNotFixed = "Please tell us what happens if this problem is not fixed.";
    if (!peopleAffected) tempErrors.peopleAffected = "Please select how many people are affected.";
    if (!decidedBuild) tempErrors.decidedBuild = "Please select whether you have decided what should be built.";

    // Group 4 Validation
    if (!nextStepPreference) tempErrors.nextStepPreference = "Please select your preferred next step.";

    if (Object.keys(tempErrors).length > 0) {
      setErrors(tempErrors);
      // Scroll to the first error
      const firstErrorKey = Object.keys(tempErrors)[0];
      const errorEl = document.getElementById(firstErrorKey);
      if (errorEl) {
        errorEl.scrollIntoView({ behavior: "smooth", block: "center" });
      }
      return;
    }

    setErrors({});
    setIsSubmitting(true);
    setSubmitError("");

    // Merging form fields for SQLite database schema compatibility
    const companyMerged = company.trim() + (website.trim() ? ` [Website: ${website.trim()}]` : "");
    
    const solvedBeforeMerged = `Current Tools Used:\n${tools.trim()}\n\nWorkflow Steps:\n${workflow.trim()}\n\nPeople involved in process: ${processPeople}`;
    
    const changeImpactMerged = `Business Outcomes sought: ${selectedImpacts.join(", ")}\n\nFrequency of Problem: ${frequency}\n\nDecided what to build: ${decidedBuild}`;
    
    const headacheMerged = `Biggest Operational Headache:\n${biggestHeadache.trim()}\n\nWhat happens if not fixed:\n${ifNotFixed.trim()}\n\nPeople affected by problem: ${peopleAffected}${extraNotes.trim() ? `\n\nAdditional Notes:\n${extraNotes.trim()}` : ""}`;

    // Map next step preferences to database keys
    let mappedNextStep = "call";
    if (nextStepPreference === "EMAIL RESPONSE FIRST") {
      mappedNextStep = "email";
    } else if (nextStepPreference === "EITHER IS FINE") {
      mappedNextStep = "either";
    }

    try {
      const response = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          name: name.trim(),
          role: role.trim(),
          company: companyMerged,
          timezone: timezone.trim(),
          teamSize: teamSize,
          solvedBefore: solvedBeforeMerged,
          headache: headacheMerged,
          nextStep: mappedNextStep,
          submissionType: submissionType,
          changeImpact: changeImpactMerged,
        }),
      });

      const data = await response.json();
      if (!response.ok || !data.success) {
        throw new Error(data.error || "Failed to submit. Please try again.");
      }

      setIsSubmitted(true);
    } catch (err) {
      const msg = err instanceof Error ? err.message : "An unexpected error occurred.";
      setSubmitError(msg);
    } finally {
      setIsSubmitting(false);
    }
  };

  const resetForm = () => {
    setName("");
    setRole("");
    setCompany("");
    setWebsite("");
    setTimezone("");
    setTeamSize("");
    setTools("");
    setWorkflow("");
    setProcessPeople("");
    setBiggestHeadache("");
    setSelectedImpacts([]);
    setFrequency("");
    setIfNotFixed("");
    setPeopleAffected("");
    setDecidedBuild("");
    setNextStepPreference("");
    setExtraNotes("");
    setIsSubmitted(false);
    setSubmitError("");
  };

  return (
    <div className="flex flex-col min-h-screen bg-transparent text-primary-text font-sans">
      <Navigation />

      {/* Hero Header with grid overlay backdrop */}
      <header className="relative min-h-[45vh] flex items-center pt-28 pb-12 overflow-hidden bg-charcoal-base">
        
        {/* Subtle grid pattern */}
        <div 
          className="absolute inset-0 opacity-10 mix-blend-overlay z-0"
          style={{
            backgroundImage: `
              linear-gradient(to right, rgba(46, 91, 148, 0.08) 1px, transparent 1px),
              linear-gradient(to bottom, rgba(46, 91, 148, 0.08) 1px, transparent 1px)
            `,
            backgroundSize: "80px 80px"
          }}
        />

        <div className="max-w-7xl mx-auto px-6 md:px-12 w-full flex flex-col gap-6 text-left relative z-10">
          
          <div className="flex flex-col gap-4 items-start max-w-4xl border-l border-brass-accent/30 pl-6 md:pl-10">
            <span className="text-caption text-brass-accent font-mono tracking-widest font-bold">
              11 / INTAKE
            </span>
            
            <h1 className="text-[2.25rem] sm:text-[3.5rem] lg:text-[4.25rem] font-bold tracking-tight text-primary-text leading-[1.0] font-display uppercase">
              TELL US<br />
              HOW THE BUSINESS<br />
              <span className="text-brass-accent font-serif tracking-normal lowercase">actually runs.</span>
            </h1>
            
            <p className="text-body-l text-muted-text font-semibold leading-relaxed max-w-2xl mt-2">
              This intake helps us understand your operation before we recommend a strategy, build, or engagement.
            </p>
          </div>

        </div>
      </header>

      {/* Main Section */}
      <main className="flex-1 w-full max-w-7xl mx-auto px-6 md:px-12 py-24 relative z-10">
        
        {isSubmitted ? (
          /* Confirmation State UI */
          <div className="max-w-3xl mx-auto bg-slate-50 border border-hairline/65 p-8 sm:p-16 rounded-[2.5rem] flex flex-col gap-8 shadow-sm">
            
            <div className="flex flex-col gap-2">
              <span className="text-micro font-mono text-brass-accent font-bold uppercase tracking-wider">
                SUBMISSION LOGGED
              </span>
              <h3 className="text-[2rem] font-bold text-primary-text font-display uppercase tracking-tight">
                INTAKE RECEIVED.
              </h3>
              <p className="text-body-base text-muted-text mt-1 leading-relaxed font-semibold">
                We&apos;ll review the operational context you&apos;ve shared and determine whether a Strategy & Operations Audit is the right next step.
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 border-t border-b border-hairline/45 py-8 my-2">
              
              <div className="flex flex-col gap-1">
                <span className="text-micro font-mono text-muted-text/50 uppercase font-bold tracking-wider">
                  EXPECTED RESPONSE
                </span>
                <strong className="text-[1.1rem] text-primary-text font-display uppercase tracking-tight">
                  24–48 HOURS
                </strong>
              </div>

              <div className="flex flex-col gap-1 border-t md:border-t-0 md:border-l border-hairline/30 pt-4 md:pt-0 md:pl-6">
                <span className="text-micro font-mono text-muted-text/50 uppercase font-bold tracking-wider">
                  IF WE&apos;RE A FIT
                </span>
                <p className="text-[0.82rem] text-muted-text font-semibold leading-normal">
                  We&apos;ll suggest the next step and, where useful, ask a few follow-up questions before the audit begins.
                </p>
              </div>

              <div className="flex flex-col gap-1 border-t md:border-t-0 md:border-l border-hairline/30 pt-4 md:pt-0 md:pl-6">
                <span className="text-micro font-mono text-muted-text/50 uppercase font-bold tracking-wider">
                  IF WE&apos;RE NOT
                </span>
                <p className="text-[0.82rem] text-muted-text font-semibold leading-normal">
                  We&apos;ll tell you directly rather than force a project that doesn&apos;t make sense.
                </p>
              </div>

            </div>

            <div className="pt-2 flex flex-col sm:flex-row gap-4 items-center justify-center">
              <Link
                href="/"
                className="inline-flex items-center justify-center text-[0.85rem] font-bold text-white bg-primary-text hover:bg-brass-accent transition-all duration-300 py-3.5 px-8 rounded-xl shadow-sm active:scale-98 w-full sm:w-auto text-center font-mono uppercase tracking-wider"
              >
                RETURN HOME
              </Link>
              <Link
                href="/work"
                className="inline-flex items-center justify-center text-[0.85rem] font-bold text-primary-text hover:text-white bg-transparent hover:bg-primary-text border border-primary-text transition-all duration-300 py-3.5 px-8 rounded-xl shadow-sm active:scale-98 w-full sm:w-auto text-center font-mono uppercase tracking-wider"
              >
                SEE SELECTED WORK
              </Link>
              <button
                onClick={resetForm}
                className="text-[0.82rem] font-mono font-bold text-muted-text hover:text-primary-text transition-colors py-2 cursor-pointer uppercase tracking-wide"
              >
                [ RESET FORM ]
              </button>
            </div>

          </div>
        ) : (
          /* Form UX Layout Grid */
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-16 items-start">
            
            {/* Left Column: Expectations & Philosophies */}
            <div className="lg:col-span-5 flex flex-col gap-10 lg:sticky lg:top-28">
              
              {/* Spam/Pressure Statement */}
              <div className="flex flex-col gap-2">
                <span className="text-micro font-mono text-brass-accent font-bold uppercase tracking-widest">
                  COMMITTED VALUE
                </span>
                <strong className="text-[1.4rem] font-bold text-primary-text font-display uppercase tracking-tight">
                  WE START WITH THE OPERATION. NOT THE SOFTWARE.
                </strong>
                <ul className="flex flex-col gap-2 mt-4 text-[0.88rem] text-muted-text font-semibold leading-relaxed">
                  <li className="flex gap-2 items-center">
                    <span className="w-1.5 h-1.5 rounded-full bg-brass-accent" />
                    No generic sales pitch.
                  </li>
                  <li className="flex gap-2 items-center">
                    <span className="w-1.5 h-1.5 rounded-full bg-brass-accent" />
                    No automated spam emails.
                  </li>
                  <li className="flex gap-2 items-center">
                    <span className="w-1.5 h-1.5 rounded-full bg-brass-accent" />
                    No pressure to buy custom builds.
                  </li>
                </ul>
              </div>

              {/* Expectations Block */}
              <div className="border border-hairline/45 bg-slate-50/50 p-8 rounded-[2rem] flex flex-col gap-6 shadow-sm">
                <span className="text-micro font-mono text-brass-accent font-bold uppercase tracking-widest">
                  WHAT HAPPENS NEXT
                </span>
                
                <div className="flex flex-col gap-4">
                  
                  {/* Step 1 */}
                  <div className="flex gap-4 items-start text-[0.88rem]">
                    <span className="font-mono text-brass-accent font-bold mt-0.5">01</span>
                    <div className="flex flex-col gap-0.5">
                      <strong className="text-primary-text font-display uppercase tracking-tight">REVIEW</strong>
                      <p className="text-muted-text font-semibold leading-relaxed">
                        We review your submission and evaluate the operational problem.
                      </p>
                    </div>
                  </div>

                  {/* Step 2 */}
                  <div className="flex gap-4 items-start text-[0.88rem] border-t border-hairline/35 pt-4">
                    <span className="font-mono text-brass-accent font-bold mt-0.5">02</span>
                    <div className="flex flex-col gap-0.5">
                      <strong className="text-primary-text font-display uppercase tracking-tight">FIT</strong>
                      <p className="text-muted-text font-semibold leading-relaxed">
                        If the problem is a strong fit, we recommend the appropriate next step.
                      </p>
                    </div>
                  </div>

                  {/* Step 3 */}
                  <div className="flex gap-4 items-start text-[0.88rem] border-t border-hairline/35 pt-4">
                    <span className="font-mono text-brass-accent font-bold mt-0.5">03</span>
                    <div className="flex flex-col gap-0.5">
                      <strong className="text-primary-text font-display uppercase tracking-tight">AUDIT</strong>
                      <p className="text-muted-text font-semibold leading-relaxed">
                        If an audit makes sense, we map the operation and identify the highest-impact opportunities.
                      </p>
                    </div>
                  </div>

                  {/* Step 4 */}
                  <div className="flex gap-4 items-start text-[0.88rem] border-t border-hairline/35 pt-4">
                    <span className="font-mono text-brass-accent font-bold mt-0.5">04</span>
                    <div className="flex flex-col gap-0.5">
                      <strong className="text-primary-text font-display uppercase tracking-tight">BLUEPRINT</strong>
                      <p className="text-muted-text font-semibold leading-relaxed">
                        You receive a documented system architecture and prioritized roadmap.
                      </p>
                    </div>
                  </div>

                  {/* Step 5 */}
                  <div className="flex gap-4 items-start text-[0.88rem] border-t border-hairline/35 pt-4">
                    <span className="font-mono text-brass-accent font-bold mt-0.5">05</span>
                    <div className="flex flex-col gap-0.5">
                      <strong className="text-primary-text font-display uppercase tracking-tight">DECISION</strong>
                      <p className="text-muted-text font-semibold leading-relaxed">
                        You decide whether, how, and when to implement.
                      </p>
                    </div>
                  </div>

                </div>

              </div>

            </div>

            {/* Right Column: Interactive Intake Form */}
            <div className="lg:col-span-7 flex flex-col gap-12 bg-slate-50/10 p-4 sm:p-8 border border-hairline/35 rounded-[2.5rem]">
              
              <form onSubmit={handleSubmit} className="flex flex-col gap-10">
                
                {/* =================================================== */}
                {/* GROUP 01 — ABOUT THE BUSINESS */}
                {/* =================================================== */}
                <div className="flex flex-col gap-6">
                  <div className="border-b border-hairline/50 pb-2 flex items-center justify-between">
                    <span className="text-micro font-mono text-brass-accent font-bold uppercase tracking-wider">
                      01 / ABOUT THE BUSINESS
                    </span>
                    <span className="text-[0.62rem] font-mono text-muted-text/40">STEP 1 OF 4</span>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                    {/* Your Name */}
                    <div className="flex flex-col gap-2" id="name">
                      <label htmlFor="name-input" className="text-[0.72rem] font-mono text-primary-text font-bold uppercase tracking-wide">
                        YOUR NAME *
                      </label>
                      <input
                        type="text"
                        id="name-input"
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                        className={`bg-white border p-3 rounded-lg text-[1rem] md:text-[0.88rem] text-primary-text focus:outline-none focus:border-brass-accent focus:ring-1 focus:ring-brass-accent/30 transition-all ${
                          errors.name ? "border-red-500/50" : "border-hairline/55"
                        }`}
                        placeholder=""
                      />
                      {errors.name && <span className="text-[0.7rem] text-red-500 font-mono font-bold">{errors.name}</span>}
                    </div>

                    {/* Your Role */}
                    <div className="flex flex-col gap-2" id="role">
                      <label htmlFor="role-input" className="text-[0.72rem] font-mono text-primary-text font-bold uppercase tracking-wide">
                        YOUR ROLE *
                      </label>
                      <input
                        type="text"
                        id="role-input"
                        value={role}
                        onChange={(e) => setRole(e.target.value)}
                        className={`bg-white border p-3 rounded-lg text-[1rem] md:text-[0.88rem] text-primary-text focus:outline-none focus:border-brass-accent focus:ring-1 focus:ring-brass-accent/30 transition-all ${
                          errors.role ? "border-red-500/50" : "border-hairline/55"
                        }`}
                        placeholder=""
                      />
                      {errors.role && <span className="text-[0.7rem] text-red-500 font-mono font-bold">{errors.role}</span>}
                    </div>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                    {/* Company */}
                    <div className="flex flex-col gap-2" id="company">
                      <label htmlFor="company-input" className="text-[0.72rem] font-mono text-primary-text font-bold uppercase tracking-wide">
                        COMPANY NAME *
                      </label>
                      <input
                        type="text"
                        id="company-input"
                        value={company}
                        onChange={(e) => setCompany(e.target.value)}
                        className={`bg-white border p-3 rounded-lg text-[1rem] md:text-[0.88rem] text-primary-text focus:outline-none focus:border-brass-accent focus:ring-1 focus:ring-brass-accent/30 transition-all ${
                          errors.company ? "border-red-500/50" : "border-hairline/55"
                        }`}
                        placeholder=""
                      />
                      {errors.company && <span className="text-[0.7rem] text-red-500 font-mono font-bold">{errors.company}</span>}
                    </div>

                    {/* Website */}
                    <div className="flex flex-col gap-2">
                      <label htmlFor="website-input" className="text-[0.72rem] font-mono text-primary-text font-bold uppercase tracking-wide">
                        WEBSITE / ONLINE PRESENCE
                      </label>
                      <input
                        type="text"
                        id="website-input"
                        value={website}
                        onChange={(e) => setWebsite(e.target.value)}
                        className="bg-white border border-hairline/55 p-3 rounded-lg text-[1rem] md:text-[0.88rem] text-primary-text focus:outline-none focus:border-brass-accent focus:ring-1 focus:ring-brass-accent/30 transition-all"
                        placeholder="example.com"
                      />
                    </div>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                    {/* Timezone */}
                    <div className="flex flex-col gap-2" id="timezone">
                      <label htmlFor="timezone-input" className="text-[0.72rem] font-mono text-primary-text font-bold uppercase tracking-wide">
                        COUNTRY / TIME ZONE *
                      </label>
                      <input
                        type="text"
                        id="timezone-input"
                        value={timezone}
                        onChange={(e) => setTimezone(e.target.value)}
                        className={`bg-white border p-3 rounded-lg text-[1rem] md:text-[0.88rem] text-primary-text focus:outline-none focus:border-brass-accent focus:ring-1 focus:ring-brass-accent/30 transition-all ${
                          errors.timezone ? "border-red-500/50" : "border-hairline/55"
                        }`}
                        placeholder="e.g. US / EST"
                      />
                      {errors.timezone && <span className="text-[0.7rem] text-red-500 font-mono font-bold">{errors.timezone}</span>}
                    </div>

                    {/* Team Size */}
                    <div className="flex flex-col gap-2" id="teamSize">
                      <label htmlFor="team-size-select" className="text-[0.72rem] font-mono text-primary-text font-bold uppercase tracking-wide">
                        APPROXIMATE TEAM SIZE *
                      </label>
                      <select
                        id="team-size-select"
                        value={teamSize}
                        onChange={(e) => setTeamSize(e.target.value)}
                        className={`bg-white border p-3 rounded-lg text-[1rem] md:text-[0.88rem] text-primary-text focus:outline-none focus:border-brass-accent focus:ring-1 focus:ring-brass-accent/30 transition-all ${
                          errors.teamSize ? "border-red-500/50" : "border-hairline/55"
                        }`}
                      >
                        <option value="">Select size...</option>
                        <option value="1-10">1–10 people</option>
                        <option value="11-50">11–50 people</option>
                        <option value="51-200">51–200 people</option>
                        <option value="200+">200+ people</option>
                      </select>
                      {errors.teamSize && <span className="text-[0.7rem] text-red-500 font-mono font-bold">{errors.teamSize}</span>}
                    </div>
                  </div>
                </div>

                {/* =================================================== */}
                {/* GROUP 02 — CURRENT OPERATION */}
                {/* =================================================== */}
                <div className="flex flex-col gap-6">
                  <div className="border-b border-hairline/50 pb-2 flex items-center justify-between">
                    <span className="text-micro font-mono text-brass-accent font-bold uppercase tracking-wider">
                      02 / CURRENT OPERATION
                    </span>
                    <span className="text-[0.62rem] font-mono text-muted-text/40">STEP 2 OF 4</span>
                  </div>

                  {/* Current Tools */}
                  <div className="flex flex-col gap-2" id="tools">
                    <label htmlFor="tools-input" className="text-[0.72rem] font-mono text-primary-text font-bold uppercase tracking-wide">
                      WHAT TOOLS DOES YOUR TEAM CURRENTLY USE? *
                    </label>
                    <input
                      type="text"
                      id="tools-input"
                      value={tools}
                      onChange={(e) => setTools(e.target.value)}
                      className={`bg-white border p-3 rounded-lg text-[1rem] md:text-[0.88rem] text-primary-text focus:outline-none focus:border-brass-accent focus:ring-1 focus:ring-brass-accent/30 transition-all ${
                        errors.tools ? "border-red-500/50" : "border-hairline/55"
                      }`}
                      placeholder="e.g. Spreadsheets, CRM, WhatsApp, Notion, Slack, etc."
                    />
                    {errors.tools && <span className="text-[0.7rem] text-red-500 font-mono font-bold">{errors.tools}</span>}
                  </div>

                  {/* Current Workflow */}
                  <div className="flex flex-col gap-2" id="workflow">
                    <label htmlFor="workflow-input" className="text-[0.72rem] font-mono text-primary-text font-bold uppercase tracking-wide">
                      HOW DOES THIS PROCESS CURRENTLY WORK? *
                    </label>
                    <textarea
                      id="workflow-input"
                      rows={5}
                      value={workflow}
                      onChange={(e) => setWorkflow(e.target.value)}
                      className={`bg-white border p-3.5 rounded-lg text-[1rem] md:text-[0.88rem] text-primary-text focus:outline-none focus:border-brass-accent focus:ring-1 focus:ring-brass-accent/30 transition-all ${
                        errors.workflow ? "border-red-500/50" : "border-hairline/55"
                      }`}
                      placeholder="Walk us through the workflow as it exists today. What happens first, what happens next, and who is involved?"
                    />
                    {errors.workflow && <span className="text-[0.7rem] text-red-500 font-mono font-bold">{errors.workflow}</span>}
                  </div>

                  {/* People involved in process */}
                  <div className="flex flex-col gap-2" id="processPeople">
                    <label htmlFor="process-people-select" className="text-[0.72rem] font-mono text-primary-text font-bold uppercase tracking-wide">
                      HOW MANY PEOPLE ARE INVOLVED IN THIS PROCESS? *
                    </label>
                    <select
                      id="process-people-select"
                      value={processPeople}
                      onChange={(e) => setProcessPeople(e.target.value)}
                      className={`bg-white border p-3 rounded-lg text-[1rem] md:text-[0.88rem] text-primary-text focus:outline-none focus:border-brass-accent focus:ring-1 focus:ring-brass-accent/30 transition-all ${
                        errors.processPeople ? "border-red-500/50" : "border-hairline/55"
                      }`}
                    >
                      <option value="">Select count...</option>
                      <option value="1">1 person</option>
                      <option value="2-5">2–5 people</option>
                      <option value="6-20">6–20 people</option>
                      <option value="20+">20+ people</option>
                    </select>
                    {errors.processPeople && <span className="text-[0.7rem] text-red-500 font-mono font-bold">{errors.processPeople}</span>}
                  </div>
                </div>

                {/* =================================================== */}
                {/* GROUP 03 — THE PROBLEM */}
                {/* =================================================== */}
                <div className="flex flex-col gap-6">
                  <div className="border-b border-hairline/50 pb-2 flex items-center justify-between">
                    <span className="text-micro font-mono text-brass-accent font-bold uppercase tracking-wider">
                      03 / THE PROBLEM
                    </span>
                    <span className="text-[0.62rem] font-mono text-muted-text/40">STEP 3 OF 4</span>
                  </div>

                  {/* Biggest Operational Headache */}
                  <div className="flex flex-col gap-2" id="biggestHeadache">
                    <label htmlFor="biggest-headache-input" className="text-[0.72rem] font-mono text-primary-text font-bold uppercase tracking-wide">
                      WHAT IS THE BIGGEST OPERATIONAL HEADACHE RIGHT NOW? *
                    </label>
                    <textarea
                      id="biggest-headache-input"
                      rows={5}
                      value={biggestHeadache}
                      onChange={(e) => setBiggestHeadache(e.target.value)}
                      className={`bg-white border p-3.5 rounded-lg text-[1rem] md:text-[0.88rem] text-primary-text focus:outline-none focus:border-brass-accent focus:ring-1 focus:ring-brass-accent/30 transition-all ${
                        errors.biggestHeadache ? "border-red-500/50" : "border-hairline/55"
                      }`}
                      placeholder="What repeatedly slows your team down, creates errors, requires manual work, or makes it difficult to know what is happening?"
                    />
                    {errors.biggestHeadache && <span className="text-[0.7rem] text-red-500 font-mono font-bold">{errors.biggestHeadache}</span>}
                  </div>

                  {/* What fixing this problem changes (Checkboxes) */}
                  <div className="flex flex-col gap-3" id="changeImpact">
                    <span className="text-[0.72rem] font-mono text-primary-text font-bold uppercase tracking-wide">
                      WHAT WOULD FIXING THIS PROBLEM CHANGE FOR THE BUSINESS? *
                    </span>
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                      {[
                        "SAVE SIGNIFICANT TEAM TIME",
                        "REDUCE OPERATIONAL COST",
                        "INCREASE REVENUE",
                        "IMPROVE CUSTOMER EXPERIENCE",
                        "IMPROVE VISIBILITY / CONTROL",
                        "REDUCE ERRORS",
                        "IMPROVE SCALABILITY",
                        "NOT SURE YET",
                      ].map((opt) => (
                        <label
                          key={opt}
                          className={`flex items-center gap-3 p-3.5 rounded-xl border cursor-pointer transition-all ${
                            selectedImpacts.includes(opt)
                              ? "bg-brass-accent/[0.08] border-brass-accent/35 text-primary-text"
                              : "bg-white border-hairline/50 hover:border-brass-accent/30 text-muted-text"
                          }`}
                        >
                          <input
                            type="checkbox"
                            checked={selectedImpacts.includes(opt)}
                            onChange={() => handleImpactCheckbox(opt)}
                            className="sr-only"
                          />
                          <span className={`w-4 h-4 rounded border flex items-center justify-center shrink-0 ${
                            selectedImpacts.includes(opt) ? "border-brass-accent bg-brass-accent text-white" : "border-muted-text"
                          }`}>
                            {selectedImpacts.includes(opt) && (
                              <svg className="w-2.5 h-2.5 fill-current" viewBox="0 0 20 20">
                                <path d="M0 11l2-2 5 5L18 3l2 2L7 18z"/>
                              </svg>
                            )}
                          </span>
                          <span className="text-[0.8rem] font-semibold uppercase tracking-tight">{opt}</span>
                        </label>
                      ))}
                    </div>
                    {errors.changeImpact && <span className="text-[0.7rem] text-red-500 font-mono font-bold mt-1">{errors.changeImpact}</span>}
                  </div>

                  {/* How often does this occur */}
                  <div className="flex flex-col gap-2" id="frequency">
                    <label htmlFor="frequency-select" className="text-[0.72rem] font-mono text-primary-text font-bold uppercase tracking-wide">
                      HOW OFTEN DOES THIS PROBLEM OCCUR? *
                    </label>
                    <select
                      id="frequency-select"
                      value={frequency}
                      onChange={(e) => setFrequency(e.target.value)}
                      className={`bg-white border p-3 rounded-lg text-[1rem] md:text-[0.88rem] text-primary-text focus:outline-none focus:border-brass-accent focus:ring-1 focus:ring-brass-accent/30 transition-all ${
                        errors.frequency ? "border-red-500/50" : "border-hairline/55"
                      }`}
                    >
                      <option value="">Select frequency...</option>
                      <option value="MULTIPLE TIMES A DAY">Multiple times a day</option>
                      <option value="DAILY">Daily</option>
                      <option value="WEEKLY">Weekly</option>
                      <option value="MONTHLY">Monthly</option>
                      <option value="OCCASIONALLY">Occasionally</option>
                      <option value="NOT SURE">Not sure</option>
                    </select>
                    {errors.frequency && <span className="text-[0.7rem] text-red-500 font-mono font-bold">{errors.frequency}</span>}
                  </div>

                  {/* What happens if not fixed */}
                  <div className="flex flex-col gap-2" id="ifNotFixed">
                    <label htmlFor="if-not-fixed-input" className="text-[0.72rem] font-mono text-primary-text font-bold uppercase tracking-wide">
                      WHAT HAPPENS IF THIS PROBLEM IS NOT FIXED? *
                    </label>
                    <textarea
                      id="if-not-fixed-input"
                      rows={4}
                      value={ifNotFixed}
                      onChange={(e) => setIfNotFixed(e.target.value)}
                      className={`bg-white border p-3.5 rounded-lg text-[1rem] md:text-[0.88rem] text-primary-text focus:outline-none focus:border-brass-accent focus:ring-1 focus:ring-brass-accent/30 transition-all ${
                        errors.ifNotFixed ? "border-red-500/50" : "border-hairline/55"
                      }`}
                      placeholder="For example: lost revenue, delayed work, additional hiring, customer complaints, operational risk, etc."
                    />
                    {errors.ifNotFixed && <span className="text-[0.7rem] text-red-500 font-mono font-bold">{errors.ifNotFixed}</span>}
                  </div>

                  {/* How many people affected */}
                  <div className="flex flex-col gap-2" id="peopleAffected">
                    <label htmlFor="people-affected-select" className="text-[0.72rem] font-mono text-primary-text font-bold uppercase tracking-wide">
                      HOW MANY PEOPLE ARE CURRENTLY AFFECTED? *
                    </label>
                    <select
                      id="people-affected-select"
                      value={peopleAffected}
                      onChange={(e) => setPeopleAffected(e.target.value)}
                      className={`bg-white border p-3 rounded-lg text-[1rem] md:text-[0.88rem] text-primary-text focus:outline-none focus:border-brass-accent focus:ring-1 focus:ring-brass-accent/30 transition-all ${
                        errors.peopleAffected ? "border-red-500/50" : "border-hairline/55"
                      }`}
                    >
                      <option value="">Select headcount...</option>
                      <option value="JUST ME">Just me</option>
                      <option value="2-5 PEOPLE">2–5 people</option>
                      <option value="6-20 PEOPLE">6–20 people</option>
                      <option value="20+ PEOPLE">20+ people</option>
                      <option value="NOT SURE">Not sure</option>
                    </select>
                    {errors.peopleAffected && <span className="text-[0.7rem] text-red-500 font-mono font-bold">{errors.peopleAffected}</span>}
                  </div>

                  {/* Have you already decided what to build */}
                  <div className="flex flex-col gap-2" id="decidedBuild">
                    <label htmlFor="decided-build-select" className="text-[0.72rem] font-mono text-primary-text font-bold uppercase tracking-wide">
                      HAVE YOU ALREADY DECIDED WHAT SHOULD BE BUILT? *
                    </label>
                    <select
                      id="decided-build-select"
                      value={decidedBuild}
                      onChange={(e) => setDecidedBuild(e.target.value)}
                      className={`bg-white border p-3 rounded-lg text-[1rem] md:text-[0.88rem] text-primary-text focus:outline-none focus:border-brass-accent focus:ring-1 focus:ring-brass-accent/30 transition-all ${
                        errors.decidedBuild ? "border-red-500/50" : "border-hairline/55"
                      }`}
                    >
                      <option value="">Select validation state...</option>
                      <option value="YES — WE KNOW EXACTLY WHAT WE NEED">Yes &mdash; we know exactly what we need</option>
                      <option value="WE HAVE AN IDEA BUT WANT IT VALIDATED">We have an idea but want it validated</option>
                      <option value="NO — WE KNOW THERE IS A PROBLEM BUT NOT THE SOLUTION">No &mdash; we know there is a problem but not the solution</option>
                      <option value="NOT SURE">Not sure</option>
                    </select>
                    {errors.decidedBuild && <span className="text-[0.7rem] text-red-500 font-mono font-bold">{errors.decidedBuild}</span>}
                    
                    {decidedBuild === "YES — WE KNOW EXACTLY WHAT WE NEED" && (
                      <div className="mt-2 text-[0.78rem] font-semibold text-muted-text bg-brass-accent/[0.04] p-3.5 border border-brass-accent/15 rounded-lg leading-relaxed">
                        <strong className="text-brass-accent font-mono text-[0.7rem] uppercase block mb-1">VALIDATION + ARCHITECTURE + RISK REDUCTION</strong>
                        We work with defined scopes, but still evaluate the underlying workflow before implementation to validate architecture, reduce development risk, and ensure the proposed system actually addresses the operational bottleneck.
                      </div>
                    )}
                  </div>
                </div>

                {/* =================================================== */}
                {/* GROUP 04 — NEXT STEP */}
                {/* =================================================== */}
                <div className="flex flex-col gap-6">
                  <div className="border-b border-hairline/50 pb-2 flex items-center justify-between">
                    <span className="text-micro font-mono text-brass-accent font-bold uppercase tracking-wider">
                      04 / NEXT STEP
                    </span>
                    <span className="text-[0.62rem] font-mono text-muted-text/40">STEP 4 OF 4</span>
                  </div>

                  {/* Preferred Next step */}
                  <div className="flex flex-col gap-2" id="nextStepPreference">
                    <label htmlFor="next-step-preference-select" className="text-[0.72rem] font-mono text-primary-text font-bold uppercase tracking-wide">
                      WHAT WOULD YOU PREFER AFTER WE REVIEW YOUR SUBMISSION? *
                    </label>
                    <select
                      id="next-step-preference-select"
                      value={nextStepPreference}
                      onChange={(e) => setNextStepPreference(e.target.value)}
                      className={`bg-white border p-3 rounded-lg text-[1rem] md:text-[0.88rem] text-primary-text focus:outline-none focus:border-brass-accent focus:ring-1 focus:ring-brass-accent/30 transition-all ${
                        errors.nextStepPreference ? "border-red-500/50" : "border-hairline/55"
                      }`}
                    >
                      <option value="">Select preferred step...</option>
                      <option value="20-MINUTE INTRO CALL">20-Minute Intro Call</option>
                      <option value="EMAIL RESPONSE FIRST">Email Response First</option>
                      <option value="EITHER IS FINE">Either is Fine</option>
                    </select>
                    {errors.nextStepPreference && <span className="text-[0.7rem] text-red-500 font-mono font-bold">{errors.nextStepPreference}</span>}
                  </div>

                  {/* Anything else we should know */}
                  <div className="flex flex-col gap-2">
                    <label htmlFor="extra-notes-input" className="text-[0.72rem] font-mono text-primary-text font-bold uppercase tracking-wide">
                      ANYTHING ELSE WE SHOULD KNOW?
                    </label>
                    <textarea
                      id="extra-notes-input"
                      rows={3}
                      value={extraNotes}
                      onChange={(e) => setExtraNotes(e.target.value)}
                      className="bg-white border border-hairline/55 p-3 rounded-lg text-[1rem] md:text-[0.88rem] text-primary-text focus:outline-none focus:border-brass-accent focus:ring-1 focus:ring-brass-accent/30 transition-all"
                      placeholder="Optional additional notes or context."
                    />
                  </div>
                </div>

                {submitError && (
                  <div className="text-[0.82rem] text-red-500 font-semibold bg-red-500/[0.04] border border-red-500/25 p-4 rounded-xl flex flex-col gap-1 leading-relaxed">
                    <strong className="font-mono text-[0.72rem] uppercase block">SUBMISSION FAILURE</strong>
                    <p>
                      The system failed to log your intake details: <span className="font-mono font-bold">{submitError}</span>.
                    </p>
                    <p className="text-[0.78rem] text-muted-text mt-1">
                      Your entered details have been preserved. Please check your internet connection or email us directly at{" "}
                      <a href="mailto:workwithsayagaa@gmail.com" className="underline hover:text-primary-text">
                        workwithsayagaa@gmail.com
                      </a>{" "}
                      to initiate the audit.
                    </p>
                  </div>
                )}

                {/* Submit Panel */}
                <div className="flex flex-col gap-4 mt-4 pt-6 border-t border-hairline/50">
                  
                  {/* Philosophy Statement */}
                  <div className="text-center sm:text-left flex flex-col gap-0.5">
                    <span className="text-[0.62rem] font-mono text-muted-text uppercase font-bold tracking-wider">
                      Philosophy check
                    </span>
                    <strong className="text-[0.98rem] text-primary-text font-display uppercase tracking-tight leading-snug">
                      YOU DON&apos;T NEED TO KNOW WHAT SHOULD BE BUILT YET. JUST TELL US WHAT ISN&apos;T WORKING.
                    </strong>
                  </div>

                  {/* Submission triggers */}
                  <div className="flex flex-col sm:flex-row justify-between items-center gap-4 mt-2">
                    <button
                      type="submit"
                      disabled={isSubmitting}
                      className="w-full sm:w-auto bg-primary-text text-white hover:bg-brass-accent hover:border-brass-accent hover:text-white transition-all duration-300 font-bold py-3.5 px-8 rounded-xl border border-transparent cursor-pointer shadow-sm text-[0.88rem] disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2"
                    >
                      {isSubmitting ? "LOGGING INTAKE..." : "SUBMIT AUDIT INTAKE →"}
                    </button>

                    {/* Metadata expectation line */}
                    <div className="text-[0.65rem] font-mono text-brass-accent font-bold uppercase tracking-wider text-center sm:text-right">
                      DIAGNOSTIC FIRST &middot; 1–2 WEEK AUDIT &middot; NO BLIND BUILDS
                    </div>
                  </div>

                  {/* Privacy note */}
                  <div className="text-[0.72rem] text-muted-text/50 leading-relaxed mt-2 text-center sm:text-left">
                    By submitting this form, you agree that Sayagaa may use the information provided to evaluate your inquiry and respond regarding potential services.
                  </div>

                </div>

              </form>

            </div>

          </div>
        )}

      </main>

      <Footer />
    </div>
  );
}
