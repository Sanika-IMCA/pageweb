"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";

interface ResearchItem {
  id: number;
  company: string;
  website: string | null;
  linkedin_url: string | null;
  industry: string | null;
  country: string | null;
  decision_maker: string | null;
  campaign: string | null;
  status: string;
  priority: string;
  research_data: string; // JSON payload
  created_at: string;
  updated_at: string;
}

interface HypothesisItem {
  rank: string;
  hypothesis: string;
  why: string;
  evidence: string;
  confidence: string;
  frequency: string;
  impact: string;
  strength: string;
}

interface ResearchPayload {
  profile: {
    company: string;
    website: string;
    industry: string;
    location: string;
    employeeRange: string;
    businessModel: string;
    targetCustomers: string;
    publicOperationalCharacteristics: string;
    companyDescription?: string;
    sourceUrls: string[];
  };
  evidence: {
    observed: string;
    inferred: string;
    unknown: string;
  };
  frictionHypotheses: HypothesisItem[];
  fitScore: {
    priority: string;
    reason: string;
  };
  techSignals: string;
  outreachAngle: {
    why: string;
    primaryAngle: string;
    observation: string;
    question: string;
  };
  emailDraft: {
    subject: string;
    body: string;
  };
  linkedinDraft: {
    body: string;
  };
  followUpDraft: {
    body: string;
  };
}

const CAMPAIGNS = [
  "RECRUITMENT OUTBOUND",
  "LOGISTICS OUTBOUND",
  "PROFESSIONAL SERVICES OUTBOUND",
  "AGENCY OUTBOUND",
  "SAAS OUTBOUND"
];

export default function ResearchWorkstation() {
  const [isAuthenticated, setIsAuthenticated] = useState<boolean | null>(null);
  const [queue, setQueue] = useState<ResearchItem[]>([]);
  const [selectedItem, setSelectedItem] = useState<ResearchItem | null>(null);
  const [activeTab, setActiveTab] = useState<string>("PROFILE");

  // New Research Inputs (Section 01)
  const [newCompany, setNewCompany] = useState("");
  const [newWebsite, setNewWebsite] = useState("");
  const [newLinkedin, setNewLinkedin] = useState("");
  const [newIndustry, setNewIndustry] = useState("");
  const [newCountry, setNewCountry] = useState("");
  const [newDM, setNewDM] = useState("");
  const [newCampaign, setNewCampaign] = useState("RECRUITMENT OUTBOUND");
  const [isSubmitting, setIsSubmitting] = useState(false);

  // Workspace Payload State (when selectedItem is loaded)
  const [payload, setPayload] = useState<ResearchPayload | null>(null);

  // Human Review Checklist Checkboxes (Section 15)
  const [revResearch, setRevResearch] = useState(false);
  const [revHypothesis, setRevHypothesis] = useState(false);
  const [revMessage, setRevMessage] = useState(false);

  // Duplicate prompt overlay
  const [dupPrompt, setDupPrompt] = useState<{ company: string; existingId: number; id: number } | null>(null);

  const router = useRouter();

  useEffect(() => {
    const checkSession = async () => {
      try {
        const res = await fetch("/api/internal/sales/auth");
        const data = await res.json();
        if (data.authenticated) {
          setIsAuthenticated(true);
        } else {
          setIsAuthenticated(false);
          router.push("/internal/sales/login");
        }
      } catch (err) {
        setIsAuthenticated(false);
        router.push("/internal/sales/login");
      }
    };
    checkSession();
  }, [router]);

  // Load Queue list
  const fetchQueue = async () => {
    try {
      const res = await fetch("/api/internal/sales/research");
      if (res.status === 401) {
        router.push("/internal/sales/login");
        return;
      }
      const data = await res.json();
      setQueue(data);
    } catch (err) {
      console.error(err);
    }
  };

  useEffect(() => {
    if (isAuthenticated) {
      fetchQueue();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isAuthenticated]);

  const handleSelectItem = (item: ResearchItem) => {
    setSelectedItem(item);
    setPayload(JSON.parse(item.research_data));
    setActiveTab("PROFILE");
    setRevResearch(false);
    setRevHypothesis(false);
    setRevMessage(false);
    setDupPrompt(null);
  };

  // Submit NEW RESEARCH (Section 01, 26)
  const handleStartResearch = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!newCompany) return;
    setIsSubmitting(true);

    try {
      const res = await fetch("/api/internal/sales/research", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          company: newCompany,
          website: newWebsite,
          linkedinUrl: newLinkedin,
          industry: newIndustry,
          country: newCountry,
          decisionMaker: newDM,
          campaign: newCampaign
        })
      });

      const data = await res.json();
      if (data.success) {
        // Reset Inputs
        setNewCompany("");
        setNewWebsite("");
        setNewLinkedin("");
        setNewIndustry("");
        setNewCountry("");
        setNewDM("");
        fetchQueue();
      } else {
        alert(data.error || "Failed to start research.");
      }
    } catch (err) {
      alert("Network research failed.");
    } finally {
      setIsSubmitting(false);
    }
  };

  // Approve For Outreach (Section 15, 19, 20)
  const handleApproveResearch = async (itemId: number, force = false) => {
    try {
      const res = await fetch("/api/internal/sales/research/approve", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ id: itemId, force })
      });

      const data = await res.json();

      if (res.status === 409 && data.duplicate) {
        setDupPrompt({ company: data.company, existingId: data.existingId, id: itemId });
        return;
      }

      if (data.success) {
        alert("PROSPECT SUCCESSFULLY INTEGRATED TO PIPELINE.");
        setSelectedItem(null);
        setPayload(null);
        setDupPrompt(null);
        fetchQueue();
      } else {
        alert(data.error || "Approval mapping failed.");
      }
    } catch (err) {
      alert("Approval route communication error.");
    }
  };

  // Reject queue item
  const handleRejectItem = async (itemId: number) => {
    try {
      const res = await fetch("/api/internal/sales/research", {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ id: itemId, status: "REJECTED" })
      });

      if (res.ok) {
        setSelectedItem(null);
        setPayload(null);
        fetchQueue();
      }
    } catch (err) {
      console.error(err);
    }
  };

  // Delete Queue Item
  const handleDeleteItem = async (itemId: number) => {
    if (!confirm("Are you sure you want to delete this queue item?")) return;
    try {
      const res = await fetch(`/api/internal/sales/research?id=${itemId}`, { method: "DELETE" });
      if (res.ok) {
        if (selectedItem?.id === itemId) {
          setSelectedItem(null);
          setPayload(null);
        }
        fetchQueue();
      }
    } catch (err) {
      console.error(err);
    }
  };

  // DAILY RESEARCH VIEW Counts (Section 23)
  const totalQueue = queue.length;
  const highFitCount = queue.filter((q) => q.priority === "A").length;
  const needsResearch = queue.filter((q) => q.status === "NOT STARTED").length;
  const readyForOutreach = queue.filter((q) => q.status === "RESEARCH COMPLETE" || q.status === "NEEDS REVIEW").length;

  if (isAuthenticated === null) {
    return (
      <div className="min-h-screen bg-charcoal-base flex items-center justify-center text-primary-text font-mono text-micro uppercase select-none">
        Loading Workstation Security Nodes...
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-charcoal-base text-primary-text font-sans flex flex-col select-none">
      
      {/* Header Bar */}
      <header className="border-b border-hairline py-4 px-6 flex items-center justify-between bg-secondary-surface/20 relative z-20">
        <div className="flex items-center gap-3">
          <span className="text-micro font-mono text-brass-accent font-bold uppercase tracking-widest">
            SAYAGAA OPERATIONS
          </span>
          <span className="text-[0.62rem] font-mono text-muted-text bg-slate-100 border border-hairline/45 rounded px-2 py-0.5 font-bold uppercase">
            PROSPECT RESEARCH STATION
          </span>
        </div>
        <div className="flex items-center gap-4">
          <Link href="/internal/sales" className="text-micro font-mono text-muted-text hover:text-brass-accent transition-colors font-bold uppercase">
            &larr; SALES KANBAN
          </Link>
        </div>
      </header>

      {/* Workspace Split Layout */}
      <main className="flex-1 p-6 grid grid-cols-1 lg:grid-cols-12 gap-6 overflow-hidden">
        
        {/* Left Side: Inputs & Queue List */}
        <div className="lg:col-span-5 flex flex-col gap-6 overflow-y-auto pr-2">
          
          {/* DAILY RESEARCH SUMMARY VIEW (Section 23) */}
          <div className="bg-secondary-surface border border-hairline p-5 rounded-2xl flex flex-col gap-3">
            <span className="text-micro font-mono text-brass-accent font-bold uppercase tracking-wider block">
              TODAY'S RESEARCH WIDGET
            </span>
            <div className="grid grid-cols-4 gap-3 font-mono text-center">
              <div className="bg-charcoal-base border border-hairline/65 p-3 rounded-xl flex flex-col justify-center">
                <span className="text-[1.35rem] font-bold text-brass-accent leading-none">{highFitCount}</span>
                <span className="text-[0.55rem] text-muted-text font-bold uppercase mt-1">HIGH FIT</span>
              </div>
              <div className="bg-charcoal-base border border-hairline/65 p-3 rounded-xl flex flex-col justify-center">
                <span className="text-[1.35rem] font-bold text-accent-red leading-none">{needsResearch}</span>
                <span className="text-[0.55rem] text-muted-text font-bold uppercase mt-1">NEEDS RESEARCH</span>
              </div>
              <div className="bg-charcoal-base border border-hairline/65 p-3 rounded-xl flex flex-col justify-center">
                <span className="text-[1.35rem] font-bold text-primary-text leading-none">{readyForOutreach}</span>
                <span className="text-[0.55rem] text-muted-text font-bold uppercase mt-1">READY OUTREACH</span>
              </div>
              <div className="bg-charcoal-base border border-hairline/65 p-3 rounded-xl flex flex-col justify-center">
                <span className="text-[1.35rem] font-bold text-muted-text leading-none">{totalQueue}</span>
                <span className="text-[0.55rem] text-muted-text font-bold uppercase mt-1">QUEUED TOTAL</span>
              </div>
            </div>
          </div>

          {/* Research Inputs card (Section 01) */}
          <div className="bg-secondary-surface border border-hairline p-5 rounded-2xl flex flex-col gap-4">
            <span className="text-micro font-mono text-brass-accent font-bold uppercase tracking-wider block">
              NEW PROSPECT RESEARCH
            </span>

            <form onSubmit={handleStartResearch} className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-micro font-mono">
              <div>
                <label className="text-[0.58rem] font-bold text-muted-text/50 uppercase block">COMPANY NAME *</label>
                <input
                  type="text"
                  required
                  value={newCompany}
                  onChange={(e) => setNewCompany(e.target.value)}
                  className="w-full bg-charcoal-base border border-hairline rounded px-3 py-2 mt-1 text-primary-text outline-none focus:border-brass-accent"
                />
              </div>
              <div>
                <label className="text-[0.58rem] font-bold text-muted-text/50 uppercase block">WEBSITE URL</label>
                <input
                  type="url"
                  placeholder="https://example.com"
                  value={newWebsite}
                  onChange={(e) => setNewWebsite(e.target.value)}
                  className="w-full bg-charcoal-base border border-hairline rounded px-3 py-2 mt-1 text-primary-text outline-none focus:border-brass-accent"
                />
              </div>
              <div>
                <label className="text-[0.58rem] font-bold text-muted-text/50 uppercase block">LINKEDIN COMPANY URL</label>
                <input
                  type="url"
                  placeholder="https://linkedin.com/company/..."
                  value={newLinkedin}
                  onChange={(e) => setNewLinkedin(e.target.value)}
                  className="w-full bg-charcoal-base border border-hairline rounded px-3 py-2 mt-1 text-primary-text outline-none focus:border-brass-accent"
                />
              </div>
              <div>
                <label className="text-[0.58rem] font-bold text-muted-text/50 uppercase block">INDUSTRY</label>
                <input
                  type="text"
                  placeholder="e.g. Logistics"
                  value={newIndustry}
                  onChange={(e) => setNewIndustry(e.target.value)}
                  className="w-full bg-charcoal-base border border-hairline rounded px-3 py-2 mt-1 text-primary-text outline-none focus:border-brass-accent"
                />
              </div>
              <div>
                <label className="text-[0.58rem] font-bold text-muted-text/50 uppercase block">COUNTRY/LOCATION</label>
                <input
                  type="text"
                  placeholder="e.g. United Kingdom"
                  value={newCountry}
                  onChange={(e) => setNewCountry(e.target.value)}
                  className="w-full bg-charcoal-base border border-hairline rounded px-3 py-2 mt-1 text-primary-text outline-none focus:border-brass-accent"
                />
              </div>
              <div>
                <label className="text-[0.58rem] font-bold text-muted-text/50 uppercase block">KNOWN DECISION MAKER</label>
                <input
                  type="text"
                  placeholder="e.g. John Doe"
                  value={newDM}
                  onChange={(e) => setNewDM(e.target.value)}
                  className="w-full bg-charcoal-base border border-hairline rounded px-3 py-2 mt-1 text-primary-text outline-none focus:border-brass-accent"
                />
              </div>
              <div className="sm:col-span-2">
                <label className="text-[0.58rem] font-bold text-muted-text/50 uppercase block">TARGET CAMPAIGN</label>
                <select
                  value={newCampaign}
                  onChange={(e) => setNewCampaign(e.target.value)}
                  className="w-full bg-charcoal-base border border-hairline rounded px-2 py-2 mt-1 text-primary-text outline-none focus:border-brass-accent cursor-pointer"
                >
                  {CAMPAIGNS.map((c) => <option key={c} value={c}>{c}</option>)}
                </select>
              </div>

              <div className="sm:col-span-2 flex justify-end mt-2">
                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="bg-primary-text hover:bg-brass-accent text-white hover:text-charcoal-base border border-primary-text hover:border-brass-accent font-mono text-micro font-bold py-2.5 px-6 rounded-xl transition-all cursor-pointer disabled:opacity-50"
                >
                  {isSubmitting ? "ANALYZING..." : "RESEARCH COMPANY →"}
                </button>
              </div>
            </form>
          </div>

          {/* RESEARCH QUEUE (Section 22) */}
          <div className="bg-secondary-surface border border-hairline p-5 rounded-2xl flex flex-col gap-4">
            <span className="text-micro font-mono text-brass-accent font-bold uppercase tracking-wider block">
              RESEARCH QUEUE
            </span>

            <div className="flex flex-col gap-3 font-mono text-micro">
              {queue.length === 0 ? (
                <span className="text-muted-text/50 text-center py-4">No prospects currently queued.</span>
              ) : (
                queue.map((item) => (
                  <div
                    key={item.id}
                    onClick={() => handleSelectItem(item)}
                    className={`bg-charcoal-base border p-4 rounded-xl flex flex-col gap-2 hover:border-brass-accent/50 cursor-pointer shadow-sm relative group transition-all ${
                      selectedItem?.id === item.id ? "ring-1 ring-brass-accent border-brass-accent/60" : "border-hairline/65"
                    }`}
                  >
                    <div className="flex items-center justify-between">
                      <span className="font-bold text-primary-text group-hover:text-brass-accent transition-colors uppercase truncate max-w-[200px]">
                        {item.company}
                      </span>
                      <span className={`text-[0.55rem] font-bold px-2 py-0.5 rounded border ${
                        item.status === "APPROVED"
                          ? "bg-brass-accent/15 border-brass-accent/25 text-brass-accent"
                          : item.status === "REJECTED"
                          ? "bg-red-500/10 border-red-500/15 text-accent-red"
                          : "bg-charcoal-base border-hairline/50 text-muted-text"
                      }`}>
                        {item.status}
                      </span>
                    </div>

                    <div className="flex flex-col gap-1 text-[0.62rem] text-muted-text">
                      {item.industry && <span>INDUSTRY: <span className="text-primary-text font-bold">{item.industry.toUpperCase()}</span></span>}
                      {item.campaign && <span>CAMPAIGN: <span className="text-brass-accent font-bold">{item.campaign.toUpperCase()}</span></span>}
                    </div>

                    <div className="border-t border-hairline/35 pt-1.5 flex justify-between items-center text-[0.58rem] font-bold">
                      <button
                        onClick={(e) => {
                          e.stopPropagation();
                          handleSelectItem(item);
                        }}
                        className="text-brass-accent hover:underline flex items-center gap-1"
                      >
                        START RESEARCH &rarr;
                      </button>
                      <button
                        onClick={(e) => {
                          e.stopPropagation();
                          handleDeleteItem(item.id);
                        }}
                        className="text-accent-red hover:underline opacity-0 group-hover:opacity-100 transition-opacity"
                      >
                        DELETE
                      </button>
                    </div>

                  </div>
                ))
              )}
            </div>
          </div>

        </div>

        {/* Right Side: Prospect workstation brief panel (Section 02-18, 27, 28) */}
        <div className="lg:col-span-7 bg-secondary-surface border border-hairline rounded-[2rem] p-6 flex flex-col overflow-y-auto relative select-none">
          
          {selectedItem && payload ? (
            <div className="flex flex-col gap-6 h-full justify-between">
              
              {/* Workspace Header */}
              <div className="flex justify-between items-start border-b border-hairline pb-4">
                <div className="flex flex-col gap-1">
                  <span className="text-micro font-mono text-brass-accent font-bold uppercase tracking-wider">
                    {selectedItem.campaign || 'GENERIC OUTBOUND'}
                  </span>
                  <h2 className="text-[1.85rem] font-bold text-primary-text font-display uppercase tracking-tight">
                    {selectedItem.company}
                  </h2>
                  <div className="flex gap-2 items-center mt-1">
                    <span className="text-[0.62rem] font-mono text-muted-text bg-charcoal-base border border-hairline/65 rounded px-2 py-0.5 font-bold uppercase">
                      STATUS: {selectedItem.status}
                    </span>
                    <span className="text-[0.62rem] font-mono text-brass-accent bg-brass-accent/[0.05] border border-brass-accent/20 rounded px-2 py-0.5 font-bold uppercase">
                      FIT PRIORITY: {selectedItem.priority}
                    </span>
                  </div>
                </div>
                
                <div className="flex gap-2">
                  <button
                    onClick={() => handleRejectItem(selectedItem.id)}
                    className="text-micro font-mono text-accent-red hover:underline font-bold uppercase"
                  >
                    REJECT PROSPECT
                  </button>
                </div>
              </div>

              {/* Duplicate warnings overlay alert */}
              {dupPrompt && (
                <div className="bg-red-100/10 border border-accent-red/25 p-5 rounded-2xl flex flex-col gap-2 font-mono text-micro text-accent-red select-none">
                  <span className="font-extrabold uppercase block tracking-wider">EXISTING PROSPECT FOUND</span>
                  <p>A prospect with this name or domain already exists in the sales pipeline.</p>
                  <div className="flex gap-3 mt-2">
                    <Link
                      href="/internal/sales"
                      className="bg-accent-red text-white font-bold py-1.5 px-4 rounded-lg uppercase text-[0.62rem]"
                    >
                      OPEN PIPELINE
                    </Link>
                    <button
                      onClick={() => handleApproveResearch(dupPrompt.id, true)}
                      className="bg-transparent border border-accent-red text-accent-red hover:bg-accent-red hover:text-white font-bold py-1.5 px-4 rounded-lg uppercase text-[0.62rem]"
                    >
                      FORCE MERGE
                    </button>
                  </div>
                </div>
              )}

              {/* Workspace Navigation tabs */}
              <div className="flex border-b border-hairline/45 text-[0.65rem] font-mono text-muted-text font-bold uppercase tracking-wider overflow-x-auto whitespace-nowrap">
                {["PROFILE", "OBSERVATIONS", "HYPOTHESES", "FIT SCORE", "OUTREACH ANGLE", "PROSPECT BRIEF"].map((tab) => (
                  <button
                    key={tab}
                    onClick={() => setActiveTab(tab)}
                    className={`py-2 px-3 border-b-2 transition-all cursor-pointer ${
                      activeTab === tab ? "border-brass-accent text-brass-accent" : "border-transparent hover:text-primary-text"
                    }`}
                  >
                    {tab}
                  </button>
                ))}
              </div>

              {/* Workspace dynamic tab values */}
              <div className="flex-1 flex flex-col gap-6 text-micro font-mono text-muted-text mt-4">
                
                {/* 1. COMPANY PROFILE */}
                {activeTab === "PROFILE" && (
                  <div className="flex flex-col gap-4">
                    <div>
                      <span className="text-[0.58rem] font-bold text-muted-text/50 uppercase block">Company Profile Details</span>
                      <p className="text-primary-text font-bold mt-1 uppercase">{payload.profile.company}</p>
                    </div>
                    <div className="grid grid-cols-2 gap-4 border-t border-hairline/35 pt-3">
                      <div>
                        <span className="text-[0.58rem] font-bold text-muted-text/50 uppercase block">Website</span>
                        <a href={payload.profile.website} target="_blank" rel="noopener noreferrer" className="text-brass-accent underline block mt-0.5">
                          {payload.profile.website}
                        </a>
                      </div>
                      <div>
                        <span className="text-[0.58rem] font-bold text-muted-text/50 uppercase block">Location</span>
                        <p className="text-primary-text font-semibold mt-0.5">{payload.profile.location}</p>
                      </div>
                      <div>
                        <span className="text-[0.58rem] font-bold text-muted-text/50 uppercase block">Employee Range</span>
                        <p className="text-primary-text mt-0.5">{payload.profile.employeeRange}</p>
                      </div>
                      <div>
                        <span className="text-[0.58rem] font-bold text-muted-text/50 uppercase block">Business Model</span>
                        <p className="text-primary-text mt-0.5">{payload.profile.businessModel}</p>
                      </div>
                    </div>
                    <div className="border-t border-hairline/35 pt-3">
                      <span className="text-[0.58rem] font-bold text-muted-text/50 uppercase block">Source Citation URLs (Section 17)</span>
                      {payload.profile.sourceUrls.map((url: string) => (
                        <a key={url} href={url} target="_blank" rel="noopener noreferrer" className="text-brass-accent underline block mt-1">
                          1. {url} (OFFICIAL COMPANY PORTAL)
                        </a>
                      ))}
                    </div>
                  </div>
                )}

                {/* 2. OBSERVATIONS & EVIDENCE PANEL */}
                {activeTab === "OBSERVATIONS" && (
                  <div className="flex flex-col gap-4">
                    <span className="text-micro font-bold text-brass-accent uppercase">
                      EVIDENCE PANEL (Section 16)
                    </span>
                    
                    <div className="border border-hairline/65 p-4 rounded-xl bg-charcoal-base/50 flex flex-col gap-3">
                      <div>
                        <span className="text-[0.58rem] font-bold text-primary-text uppercase bg-slate-200 px-1.5 py-0.5 rounded select-none">
                          OBSERVED
                        </span>
                        <p className="text-primary-text font-semibold leading-relaxed mt-2 pl-2 border-l-2 border-primary-text">
                          {payload.evidence.observed}
                        </p>
                      </div>

                      <div className="border-t border-hairline/40 pt-3">
                        <span className="text-[0.58rem] font-bold text-brass-accent uppercase bg-brass-accent/10 px-1.5 py-0.5 rounded select-none">
                          INFERRED
                        </span>
                        <p className="text-muted-text font-semibold leading-relaxed mt-2 pl-2 border-l-2 border-brass-accent">
                          {payload.evidence.inferred}
                        </p>
                      </div>

                      <div className="border-t border-hairline/40 pt-3">
                        <span className="text-[0.58rem] font-bold text-muted-text/50 uppercase bg-charcoal-base border border-hairline px-1.5 py-0.5 rounded select-none">
                          UNKNOWN (Section 18 - NO FAKE RESEARCH)
                        </span>
                        <p className="text-muted-text/50 leading-relaxed mt-2 pl-2 border-l-2 border-hairline">
                          {payload.evidence.unknown}
                        </p>
                      </div>
                    </div>
                  </div>
                )}

                {/* 3. HYPOTHESES */}
                {activeTab === "HYPOTHESES" && (
                  <div className="flex flex-col gap-4">
                    <span className="text-micro font-bold text-brass-accent uppercase">
                      04 / OPERATIONAL FRICTION HYPOTHESES (Section 06, 07)
                    </span>

                    {payload.frictionHypotheses.map((hyp: HypothesisItem, idx: number) => (
                      <div key={hyp.rank} className="border border-hairline p-4 rounded-xl bg-charcoal-base/50 flex flex-col gap-2">
                        <div className="flex items-center justify-between text-micro font-bold">
                          <span className="text-brass-accent">RANK {hyp.rank} &bull; {idx === 0 ? 'HIGHEST VALUE' : 'SECONDARY'}</span>
                          <span className="text-[0.58rem] text-muted-text/50 bg-slate-100 border px-1.5 rounded select-none">
                            HYPOTHESIS — NOT VERIFIED
                          </span>
                        </div>
                        <div>
                          <span className="text-[0.58rem] font-bold text-muted-text/50 uppercase block">HYPOTHESIS</span>
                          <p className="text-primary-text font-semibold mt-0.5">{hyp.hypothesis}</p>
                        </div>
                        <div className="grid grid-cols-2 gap-3 mt-1.5 border-t border-hairline/30 pt-2 text-[0.62rem]">
                          <div>
                            <span className="text-muted-text/50 font-bold block">CONFIDENCE:</span>
                            <span className="text-primary-text font-bold">{hyp.confidence}</span>
                          </div>
                          <div>
                            <span className="text-muted-text/50 font-bold block">FREQUENCY:</span>
                            <span className="text-primary-text font-bold">{hyp.frequency}</span>
                          </div>
                          <div>
                            <span className="text-muted-text/50 font-bold block">POTENTIAL IMPACT:</span>
                            <span className="text-brass-accent font-bold">{hyp.impact}</span>
                          </div>
                          <div>
                            <span className="text-muted-text/50 font-bold block">EVIDENCE STRENGTH:</span>
                            <span className="text-primary-text font-bold">{hyp.strength}</span>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                )}

                {/* 4. FIT SCORE CARD */}
                {activeTab === "FIT SCORE" && (
                  <div className="flex flex-col gap-4">
                    <span className="text-micro font-bold text-brass-accent uppercase">
                      08 / FIT SCORE AND PRIORITY
                    </span>

                    <div className="border border-brass-accent/15 bg-brass-accent/[0.02] p-5 rounded-2xl flex flex-col gap-3">
                      <div className="flex justify-between items-center">
                        <span className="text-[1.85rem] font-bold text-brass-accent leading-none font-mono">
                          {selectedItem.priority}
                        </span>
                        <span className="text-micro font-mono font-bold text-primary-text uppercase">
                          {selectedItem.priority === "A" ? "HIGH FIT SCORE" : "MEDIUM FIT SCORE"}
                        </span>
                      </div>

                      <div className="border-t border-hairline/35 pt-3">
                        <span className="text-[0.58rem] font-bold text-muted-text/50 uppercase block">QUALIFICATION REASONING</span>
                        <p className="text-primary-text leading-relaxed mt-1">{payload.fitScore.reason}</p>
                      </div>

                      {/* Manual priority score toggle overrides */}
                      <div className="border-t border-hairline/35 pt-3 mt-1 flex items-center justify-between text-micro font-bold text-primary-text">
                        <span>MANUALLY OVERRIDE FIT:</span>
                        <select
                          value={selectedItem.priority}
                          onChange={async (e) => {
                            const newP = e.target.value;
                            const res = await fetch("/api/internal/sales/research", {
                              method: "PUT",
                              headers: { "Content-Type": "application/json" },
                              body: JSON.stringify({ id: selectedItem.id, priority: newP })
                            });
                            if (res.ok) {
                              setSelectedItem({ ...selectedItem, priority: newP });
                              fetchQueue();
                            }
                          }}
                          className="bg-secondary-surface border border-hairline rounded px-2 py-1 text-micro text-brass-accent font-mono font-bold outline-none cursor-pointer"
                        >
                          <option value="A">A - High Fit</option>
                          <option value="B">B - Medium Fit</option>
                          <option value="C">C - Low Fit</option>
                        </select>
                      </div>
                    </div>
                  </div>
                )}

                {/* 5. OUTREACH ANGLE & DRAFTS */}
                {activeTab === "OUTREACH ANGLE" && (
                  <div className="flex flex-col gap-4">
                    
                    {/* Decision Maker */}
                    <div className="border border-hairline p-4 rounded-xl bg-charcoal-base/50 flex flex-col gap-2">
                      <span className="text-micro font-bold text-brass-accent uppercase">
                        09 / DECISION‑MAKER BRIEF
                      </span>
                      <div className="grid grid-cols-2 gap-4 text-[0.62rem] mt-1">
                        <div>
                          <span className="text-muted-text/50 block">DM NAME:</span>
                          <span className="text-primary-text font-bold">{selectedItem.decision_maker || 'CONTACT NOT VERIFIED'}</span>
                        </div>
                        <div>
                          <span className="text-muted-text/50 block">LINKEDIN:</span>
                          {selectedItem.linkedin_url ? (
                            <a href={selectedItem.linkedin_url} target="_blank" rel="noopener noreferrer" className="text-brass-accent underline">
                              View Profile
                            </a>
                          ) : <span className="text-muted-text/50 font-bold uppercase">CONTACT NOT VERIFIED</span>}
                        </div>
                      </div>
                    </div>

                    {/* Angle Summary */}
                    <div className="border border-hairline p-4 rounded-xl bg-charcoal-base/50 flex flex-col gap-2">
                      <span className="text-micro font-bold text-brass-accent uppercase">
                        10 / OUTREACH ANGLE STRATEGY
                      </span>
                      <div>
                        <span className="text-muted-text/50 block uppercase text-[0.58rem]">WHY CONTACT THEM:</span>
                        <p className="text-primary-text mt-0.5">{payload.outreachAngle.why}</p>
                      </div>
                      <div className="border-t border-hairline/30 pt-2 mt-1">
                        <span className="text-muted-text/50 block uppercase text-[0.58rem]">QUESTION:</span>
                        <p className="text-brass-accent font-bold mt-0.5">{payload.outreachAngle.question}</p>
                      </div>
                    </div>

                    {/* Email message draft box (Section 12) */}
                    <div className="border border-hairline p-4 rounded-xl bg-charcoal-base/50 flex flex-col gap-2">
                      <span className="text-micro font-bold text-brass-accent uppercase">
                        12 / EMAIL OUTREACH DRAFT
                      </span>
                      <div className="bg-charcoal-base border border-hairline/45 rounded-xl p-3 flex flex-col gap-2">
                        <span className="text-[0.55rem] font-bold text-muted-text">SUBJECT: {payload.emailDraft.subject}</span>
                        <pre className="text-[0.62rem] text-primary-text font-mono leading-relaxed whitespace-pre-wrap select-text">
                          {payload.emailDraft.body}
                        </pre>
                      </div>
                    </div>

                    {/* LinkedIn short version (Section 13) */}
                    <div className="border border-hairline p-4 rounded-xl bg-charcoal-base/50 flex flex-col gap-2">
                      <span className="text-micro font-bold text-brass-accent uppercase">
                        13 / LINKEDIN OUTREACH DRAFT (max 400 chars)
                      </span>
                      <p className="bg-charcoal-base border border-hairline/45 rounded-xl p-3 text-[0.62rem] text-primary-text leading-relaxed select-text">
                        {payload.linkedinDraft.body}
                      </p>
                    </div>

                    {/* Follow-up angle (Section 14) */}
                    <div className="border border-hairline p-4 rounded-xl bg-charcoal-base/50 flex flex-col gap-2">
                      <span className="text-micro font-bold text-brass-accent uppercase">
                        14 / FOLLOW‑UP ANGLE
                      </span>
                      <p className="bg-charcoal-base border border-hairline/45 rounded-xl p-3 text-[0.62rem] text-primary-text leading-relaxed select-text">
                        {payload.followUpDraft.body}
                      </p>
                    </div>

                  </div>
                )}

                {/* 6. PROSPECT BRIEF CARD SCREEN (Section 11, 28) */}
                {activeTab === "PROSPECT BRIEF" && (
                  <div className="border border-hairline p-5 rounded-2xl bg-charcoal-base/30 flex flex-col gap-5 shadow-sm max-w-full">
                    
                    {/* Header line */}
                    <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 pb-4 border-b border-hairline/45 text-center sm:text-left">
                      <div>
                        <span className="text-[0.58rem] font-bold text-muted-text/50 uppercase block">COMPANY</span>
                        <span className="text-primary-text font-extrabold uppercase">{payload.profile.company}</span>
                      </div>
                      <div>
                        <span className="text-[0.58rem] font-bold text-muted-text/50 uppercase block">FIT</span>
                        <span className="text-brass-accent font-extrabold">{selectedItem.priority} - HIGH FIT</span>
                      </div>
                      <div>
                        <span className="text-[0.58rem] font-bold text-muted-text/50 uppercase block">INDUSTRY</span>
                        <span className="text-primary-text font-bold uppercase">{payload.profile.industry}</span>
                      </div>
                      <div>
                        <span className="text-[0.58rem] font-bold text-muted-text/50 uppercase block">DECISION MAKER</span>
                        <span className="text-primary-text uppercase">{selectedItem.decision_maker || 'NOT VERIFIED'}</span>
                      </div>
                    </div>

                    {/* Middle details */}
                    <div className="flex flex-col gap-3 pb-4 border-b border-hairline/45 text-[0.62rem]">
                      <div>
                        <span className="text-[0.58rem] font-bold text-muted-text/50 uppercase block">WHAT THEY DO:</span>
                        <p className="text-primary-text leading-relaxed mt-0.5">{payload.profile.publicOperationalCharacteristics}</p>
                      </div>
                      <div>
                        <span className="text-[0.58rem] font-bold text-brass-accent uppercase block">OBSERVED SIGNALS:</span>
                        <p className="text-brass-accent leading-relaxed mt-0.5 font-bold">{payload.evidence.observed}</p>
                      </div>
                      <div>
                        <span className="text-[0.58rem] font-bold text-accent-red uppercase block">LIKELY OPERATIONAL FRICTION:</span>
                        <p className="text-accent-red leading-relaxed mt-0.5 font-bold uppercase">{payload.evidence.inferred}</p>
                      </div>
                    </div>

                    {/* Bottom outreach angles */}
                    <div className="flex flex-col gap-3 text-[0.62rem]">
                      <div>
                        <span className="text-[0.58rem] font-bold text-muted-text/50 uppercase block">OUTREACH ANGLE:</span>
                        <p className="text-primary-text leading-relaxed mt-0.5">{payload.outreachAngle.why}</p>
                      </div>
                      <div>
                        <span className="text-[0.58rem] font-bold text-muted-text/50 uppercase block">MESSAGE DRAFT:</span>
                        <p className="text-muted-text mt-0.5 p-3 bg-charcoal-base border border-hairline rounded-xl italic select-text">
                          "{payload.emailDraft.body.substring(0, 200)}..."
                        </p>
                      </div>
                    </div>

                  </div>
                )}

              </div>

              {/* Human Approval Review checks & CTA buttons (Section 15) */}
              <div className="border-t border-hairline/45 pt-4 mt-6 flex flex-col gap-4 font-mono text-micro select-none">
                <span className="text-[0.58rem] font-bold text-brass-accent uppercase tracking-wider block">
                  HUMAN REVIEW PANEL REQUIRED
                </span>
                
                <div className="flex flex-wrap gap-4 items-center justify-start text-[0.62rem] text-muted-text">
                  <label className="flex items-center gap-2 cursor-pointer">
                    <input
                      type="checkbox"
                      checked={revResearch}
                      onChange={(e) => setRevResearch(e.target.checked)}
                      className="accent-brass-accent cursor-pointer"
                    />
                    <span>REVIEW RESEARCH</span>
                  </label>
                  
                  <label className="flex items-center gap-2 cursor-pointer">
                    <input
                      type="checkbox"
                      checked={revHypothesis}
                      onChange={(e) => setRevHypothesis(e.target.checked)}
                      className="accent-brass-accent cursor-pointer"
                    />
                    <span>REVIEW HYPOTHESIS</span>
                  </label>

                  <label className="flex items-center gap-2 cursor-pointer">
                    <input
                      type="checkbox"
                      checked={revMessage}
                      onChange={(e) => setRevMessage(e.target.checked)}
                      className="accent-brass-accent cursor-pointer"
                    />
                    <span>REVIEW MESSAGE DRAFTS</span>
                  </label>
                </div>

                <div className="flex justify-end gap-3 border-t border-hairline/25 pt-4">
                  <button
                    onClick={() => {
                      setSelectedItem(null);
                      setPayload(null);
                    }}
                    className="border border-hairline hover:bg-slate-50 font-mono text-micro font-bold py-2.5 px-5 rounded-xl cursor-pointer"
                  >
                    CLOSE BRIEF
                  </button>

                  <button
                    onClick={() => handleApproveResearch(selectedItem.id)}
                    disabled={!revResearch || !revHypothesis || !revMessage}
                    className="bg-primary-text hover:bg-brass-accent text-white hover:text-charcoal-base border border-primary-text hover:border-brass-accent font-mono text-micro font-bold py-2.5 px-6 rounded-xl transition-all cursor-pointer disabled:opacity-40"
                  >
                    APPROVE FOR OUTREACH →
                  </button>
                </div>
              </div>

            </div>
          ) : (
            <div className="flex-1 flex flex-col justify-center items-center text-center p-8 select-none">
              <span className="text-micro font-mono text-muted-text/30 font-bold uppercase tracking-wider block mb-2">
                WORKSTATION READY
              </span>
              <p className="text-micro font-mono text-muted-text/50 max-w-sm leading-relaxed">
                Add a company to get started, or select a prospect in the research queue to load the intelligence briefs workstation.
              </p>
            </div>
          )}

        </div>

      </main>

    </div>
  );
}
