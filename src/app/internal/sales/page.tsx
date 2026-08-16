"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";

interface Prospect {
  id: number;
  company: string;
  website: string | null;
  domain: string | null;
  industry: string | null;
  location: string | null;
  employee_range: string | null;
  company_description: string | null;
  problem_hypothesis: string | null;
  operational_pattern: string | null;
  decision_maker: string | null;
  decision_maker_role: string | null;
  decision_maker_link: string | null;
  email: string | null;
  linkedin: string | null;
  source: string | null;
  campaign: string | null;
  pipeline_stage: string;
  owner: string | null;
  priority: string;
  next_follow_up: string | null;
  last_contacted: string | null;
  notes: string | null;
  created_at: string;
  updated_at: string;
}

interface Activity {
  id: number;
  prospect_id: number;
  event: string;
  notes: string | null;
  created_at: string;
}

interface Outreach {
  id: number;
  prospect_id: number;
  channel: string;
  message: string | null;
  status: string;
  created_at: string;
}

interface Audit {
  id: number;
  prospect_id: number;
  problem: string | null;
  expected_output: string | null;
  start_date: string | null;
  target_end_date: string | null;
  status: string;
  fee: number;
  payment_status: string | null;
  deliverables: string | null;
}

interface Proposal {
  id: number;
  prospect_id: number;
  project_name: string | null;
  scope: string | null;
  systems_to_build: string | null;
  integrations: string | null;
  milestones: string | null;
  estimated_timeline: string | null;
  project_value: number;
  status: string;
}

const STAGES = [
  { code: "01_RESEARCH", name: "01 RESEARCH" },
  { code: "02_QUALIFIED", name: "02 QUALIFIED" },
  { code: "03_CONTACTED", name: "03 CONTACTED" },
  { code: "04_REPLIED", name: "04 REPLIED" },
  { code: "05_DISCOVERY", name: "05 DISCOVERY" },
  { code: "06_AUDIT_PROPOSED", name: "06 AUDIT PROPOSED" },
  { code: "07_AUDIT_ACTIVE", name: "07 AUDIT ACTIVE" },
  { code: "08_AUDIT_COMPLETE", name: "08 AUDIT COMPLETE" },
  { code: "09_IMPLEMENTATION_PROPOSED", name: "09 IMPL PROPOSED" },
  { code: "10_WON", name: "10 WON" },
  { code: "11_LOST", name: "11 LOST" },
  { code: "12_NURTURE", name: "12 NURTURE" }
];

const PATTERNS = [
  "MANUAL HANDOFFS",
  "SPREADSHEET DEPENDENCY",
  "DISCONNECTED TOOLS",
  "LEAD ROUTING",
  "OPERATIONAL VISIBILITY",
  "REPETITIVE ADMINISTRATION",
  "CUSTOM SOFTWARE GAP",
  "AI WORKFLOW OPPORTUNITY",
  "INTEGRATION GAP",
  "OTHER"
];

const SOURCES = [
  "COLD EMAIL",
  "LINKEDIN",
  "REFERRAL",
  "INBOUND",
  "NETWORK",
  "EVENT",
  "OTHER"
];

const CAMPAIGNS = [
  "RECRUITMENT OUTBOUND AUG 2026",
  "LOGISTICS OUTBOUND AUG 2026",
  "PROFESSIONAL SERVICES OUTBOUND AUG 2026",
  "AGENCY OUTBOUND AUG 2026"
];

export default function SalesDashboard() {
  const [isAuthenticated, setIsAuthenticated] = useState<boolean | null>(null);
  const [prospects, setProspects] = useState<Prospect[]>([]);
  const [selectedProspect, setSelectedProspect] = useState<Prospect | null>(null);
  const [activities, setActivities] = useState<Activity[]>([]);
  const [outreachLogs, setOutreachLogs] = useState<Outreach[]>([]);
  const [audits, setAudits] = useState<Audit[]>([]);
  const [proposals, setProposals] = useState<Proposal[]>([]);
  
  // Tab within prospect details panel
  const [activeDetailsTab, setActiveDetailsTab] = useState<string>("COMPANY");

  // Filters & Search
  const [searchQuery, setSearchQuery] = useState("");
  const [filterPriority, setFilterPriority] = useState("");
  const [filterStage, setFilterStage] = useState("");
  const [filterPattern, setFilterPattern] = useState("");
  const [filterSource, setFilterSource] = useState("");
  const [filterCampaign, setFilterCampaign] = useState("");

  // CRUD state modals
  const [isAddOpen, setIsAddOpen] = useState(false);
  const [dupWarning, setDupWarning] = useState<string | null>(null);

  // New Prospect Form State
  const [newCompany, setNewCompany] = useState("");
  const [newWebsite, setNewWebsite] = useState("");
  const [newIndustry, setNewIndustry] = useState("");
  const [newLocation, setNewLocation] = useState("");
  const [newEmployeeRange, setNewEmployeeRange] = useState("");
  const [newDesc, setNewDesc] = useState("");
  const [newDM, setNewDM] = useState("");
  const [newDMRole, setNewDMRole] = useState("");
  const [newDMLink, setNewDMLink] = useState("");
  const [newEmail, setNewEmail] = useState("");
  const [newLinkedin, setNewLinkedin] = useState("");
  const [newSource, setNewSource] = useState("COLD EMAIL");
  const [newCampaign, setNewCampaign] = useState("");
  const [newPattern, setNewPattern] = useState("MANUAL HANDOFFS");
  const [newPatternOther, setNewPatternOther] = useState("");
  const [newPriority, setNewPriority] = useState("B");
  const [newHypothesis, setNewHypothesis] = useState("");
  const [newNotes, setNewNotes] = useState("");

  // Detail sub-form state
  const [newActivityEvent, setNewActivityEvent] = useState("");
  const [newActivityNotes, setNewActivityNotes] = useState("");
  const [newOutreachChannel, setNewOutreachChannel] = useState("EMAIL");
  const [newOutreachMsg, setNewOutreachMsg] = useState("");
  const [newOutreachStatus, setNewOutreachStatus] = useState("DRAFT");
  
  // Deal - Audit Details state
  const [auditProblem, setAuditProblem] = useState("");
  const [auditOutput, setAuditOutput] = useState("");
  const [auditStart, setAuditStart] = useState("");
  const [auditEnd, setAuditEnd] = useState("");
  const [auditStatus, setAuditStatus] = useState("PROPOSED");
  const [auditFee, setAuditFee] = useState("0");
  const [auditDeliverables, setAuditDeliverables] = useState("");

  // Deal - Proposal Details state
  const [propName, setPropName] = useState("");
  const [propScope, setPropScope] = useState("");
  const [propSystems, setPropSystems] = useState("");
  const [propIntegrations, setPropIntegrations] = useState("");
  const [propMilestones, setPropMilestones] = useState("");
  const [propTimeline, setPropTimeline] = useState("");
  const [propVal, setPropVal] = useState("0");
  const [propStatus, setPropStatus] = useState("PROPOSED");

  // Research note sub-sections
  const [researchDo, setResearchDo] = useState("");
  const [researchDoType, setResearchDoType] = useState("OBSERVED");
  const [researchOperate, setResearchOperate] = useState("");
  const [researchOperateType, setResearchOperateType] = useState("OBSERVED");
  const [researchNoticed, setResearchNoticed] = useState("");
  const [researchNoticedType, setResearchNoticedType] = useState("OBSERVED");
  const [researchFriction, setResearchFriction] = useState("");
  const [researchFrictionType, setResearchFrictionType] = useState("OBSERVED");

  // CSV Import State
  const [csvFileContent, setCsvFileContent] = useState("");
  const [importSummary, setImportSummary] = useState<string | null>(null);

  const router = useRouter();

  useEffect(() => {
    // Authenticate guard
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

  // Load Prospects list
  const fetchProspects = async () => {
    try {
      const q = new URLSearchParams();
      if (searchQuery) q.set("search", searchQuery);
      if (filterPriority) q.set("priority", filterPriority);
      if (filterStage) q.set("stage", filterStage);
      if (filterPattern) q.set("pattern", filterPattern);
      if (filterSource) q.set("source", filterSource);
      if (filterCampaign) q.set("campaign", filterCampaign);

      const res = await fetch(`/api/internal/sales?${q.toString()}`);
      if (res.status === 401) {
        router.push("/internal/sales/login");
        return;
      }
      const data = await res.json();
      setProspects(data);
    } catch (err) {
      console.error(err);
    }
  };

  useEffect(() => {
    if (isAuthenticated) {
      fetchProspects();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isAuthenticated, searchQuery, filterPriority, filterStage, filterPattern, filterSource, filterCampaign]);

  // Load Prospect sub details when selected
  const fetchProspectDetails = async (id: number) => {
    try {
      const res = await fetch(`/api/internal/sales/details?prospectId=${id}`);
      const data = await res.json();
      setActivities(data.activities || []);
      setOutreachLogs(data.outreach || []);
      setAudits(data.audits || []);
      setProposals(data.proposals || []);
    } catch (err) {
      console.error(err);
    }
  };

  const handleSelectProspect = (p: Prospect) => {
    setSelectedProspect(p);
    fetchProspectDetails(p.id);
    setActiveDetailsTab("COMPANY");
  };

  // Add Prospect Form Submit
  const handleAddProspect = async (e: React.FormEvent) => {
    e.preventDefault();
    setDupWarning(null);

    const actualPattern = newPattern === "OTHER" ? newPatternOther : newPattern;

    const payload = {
      company: newCompany,
      website: newWebsite,
      industry: newIndustry,
      location: newLocation,
      employeeRange: newEmployeeRange,
      companyDescription: newDesc,
      problemHypothesis: newHypothesis,
      operationalPattern: actualPattern,
      decisionMaker: newDM,
      decisionMakerRole: newDMRole,
      decisionMakerLink: newDMLink,
      email: newEmail,
      linkedin: newLinkedin,
      source: newSource,
      campaign: newCampaign,
      pipelineStage: "01_RESEARCH",
      priority: newPriority,
      notes: newNotes
    };

    try {
      const res = await fetch("/api/internal/sales", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload)
      });

      const data = await res.json();
      if (res.status === 409 && data.duplicate) {
        setDupWarning(data.message);
        return;
      }

      if (data.success) {
        setIsAddOpen(false);
        resetAddForm();
        fetchProspects();
      } else {
        alert(data.error || "Save error occurred.");
      }
    } catch (err) {
      alert("Network communication error.");
    }
  };

  const resetAddForm = () => {
    setNewCompany("");
    setNewWebsite("");
    setNewIndustry("");
    setNewLocation("");
    setNewEmployeeRange("");
    setNewDesc("");
    setNewDM("");
    setNewDMRole("");
    setNewDMLink("");
    setNewEmail("");
    setNewLinkedin("");
    setNewSource("COLD EMAIL");
    setNewCampaign("");
    setNewPattern("MANUAL HANDOFFS");
    setNewPatternOther("");
    setNewPriority("B");
    setNewHypothesis("");
    setNewNotes("");
    setDupWarning(null);
  };

  // Move Column / Stage transition
  const handleMoveStage = async (p: Prospect, newStage: string) => {
    try {
      const res = await fetch("/api/internal/sales", {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ id: p.id, pipelineStage: newStage })
      });

      if (!res.ok) {
        const errData = await res.json();
        alert(errData.error || "Failed to update pipeline stage.");
        return;
      }

      fetchProspects();
      if (selectedProspect && selectedProspect.id === p.id) {
        setSelectedProspect({ ...selectedProspect, pipeline_stage: newStage });
        fetchProspectDetails(p.id);
      }
    } catch (err) {
      alert("Network transition error.");
    }
  };

  // Add details (outreach, activity, audits, proposals)
  const handleAddDetail = async (type: string, dataPayload: Record<string, unknown>) => {
    if (!selectedProspect) return;

    try {
      const res = await fetch("/api/internal/sales/details", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          type,
          prospectId: selectedProspect.id,
          data: dataPayload
        })
      });

      if (res.ok) {
        fetchProspectDetails(selectedProspect.id);
        fetchProspects();
      } else {
        const err = await res.json();
        alert(err.error || "Failed to add details.");
      }
    } catch (err) {
      alert("Network communication error.");
    }
  };

  // CSV Import handler
  const handleCsvImport = async () => {
    if (!csvFileContent) return;
    setImportSummary(null);

    try {
      const res = await fetch("/api/internal/sales/import", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ csvContent: csvFileContent })
      });

      const data = await res.json();
      if (data.success) {
        setImportSummary(`SUCCESSFULLY IMPORTED: ${data.createdCount} records created. ${data.duplicateCount} duplicates skipped.`);
        setCsvFileContent("");
        fetchProspects();
      } else {
        alert(data.error || "CSV parsing error.");
      }
    } catch (err) {
      alert("CSV import communication failed.");
    }
  };

  // CALCULATE METRICS DYNAMICALLY (Section 17)
  const totalProspects = prospects.length;
  const aFitCount = prospects.filter((p) => p.priority === "A").length;
  const contactedCount = prospects.filter((p) => p.last_contacted !== null).length;
  const replyCount = prospects.filter((p) => p.pipeline_stage === "04_REPLIED" || p.pipeline_stage === "05_DISCOVERY" || p.pipeline_stage === "06_AUDIT_PROPOSED" || p.pipeline_stage === "07_AUDIT_ACTIVE" || p.pipeline_stage === "08_AUDIT_COMPLETE" || p.pipeline_stage === "09_IMPLEMENTATION_PROPOSED" || p.pipeline_stage === "10_WON").length;
  const discoveryCount = prospects.filter((p) => p.pipeline_stage === "05_DISCOVERY").length;
  const auditProposedCount = prospects.filter((p) => p.pipeline_stage === "06_AUDIT_PROPOSED" || p.pipeline_stage === "07_AUDIT_ACTIVE" || p.pipeline_stage === "08_AUDIT_COMPLETE").length;
  const auditActiveCount = prospects.filter((p) => p.pipeline_stage === "07_AUDIT_ACTIVE").length;
  const implProposedCount = prospects.filter((p) => p.pipeline_stage === "09_IMPLEMENTATION_PROPOSED").length;
  const wonCount = prospects.filter((p) => p.pipeline_stage === "10_WON").length;
  const lostCount = prospects.filter((p) => p.pipeline_stage === "11_LOST").length;

  // Conversion Rates
  const replyRate = contactedCount > 0 ? ((replyCount / contactedCount) * 100).toFixed(1) : "0.0";
  const discoveryRate = replyCount > 0 ? ((discoveryCount / replyCount) * 100).toFixed(1) : "0.0";
  const auditRate = discoveryCount > 0 ? ((auditProposedCount / discoveryCount) * 100).toFixed(1) : "0.0";
  const wonRate = implProposedCount > 0 ? ((wonCount / implProposedCount) * 100).toFixed(1) : "0.0";

  // Today Action items
  const todayStr = new Date().toISOString().split("T")[0];
  const followupsDueToday = prospects.filter((p) => p.next_follow_up && p.next_follow_up.split("T")[0] <= todayStr).length;

  if (isAuthenticated === null) {
    return (
      <div className="min-h-screen bg-charcoal-base flex items-center justify-center text-primary-text font-mono text-micro uppercase select-none">
        Authenticating Secure Environment...
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-charcoal-base text-primary-text font-sans flex flex-col">
      
      {/* Header Bar */}
      <header className="border-b border-hairline py-4 px-6 flex items-center justify-between bg-secondary-surface/20 relative z-20">
        <div className="flex items-center gap-3">
          <span className="text-micro font-mono text-brass-accent font-bold uppercase tracking-widest">
            SAYAGAA OPERATIONS
          </span>
          <span className="text-[0.62rem] font-mono text-muted-text bg-slate-100 border border-hairline/45 rounded px-2 py-0.5 font-bold uppercase">
            INTERNAL SALES OS
          </span>
        </div>
        <div className="flex items-center gap-4">
          <Link href="/" className="text-micro font-mono text-muted-text hover:text-primary-text transition-colors">
            GO TO HOMEPAGE
          </Link>
          <a
            href="/api/internal/sales/export"
            className="text-micro font-mono text-brass-accent hover:text-primary-text transition-colors font-bold uppercase border border-brass-accent/30 rounded-lg px-3 py-1 bg-brass-accent/[0.02]"
          >
            EXPORT CSV &darr;
          </a>
        </div>
      </header>

      {/* Main layout */}
      <main className="flex-1 p-6 flex flex-col gap-6 select-none overflow-x-hidden">

        {/* Action Center Panel & Metrics strip (Section 16, 17, 18) */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-stretch">
          
          {/* Daily Action Counts */}
          <div className="lg:col-span-4 bg-secondary-surface border border-hairline p-5 rounded-2xl flex flex-col gap-4">
            <span className="text-micro font-mono text-brass-accent font-bold uppercase tracking-wider block">
              TODAY'S ACTION PANEL
            </span>
            <div className="grid grid-cols-2 gap-4">
              <div className="bg-charcoal-base border border-hairline/65 p-3 rounded-xl flex flex-col justify-center">
                <span className="text-[1.85rem] font-bold text-accent-red leading-none font-mono">
                  {followupsDueToday}
                </span>
                <span className="text-[0.62rem] font-mono text-muted-text font-bold uppercase mt-1">
                  FOLLOW-UPS DUE
                </span>
              </div>
              <div className="bg-charcoal-base border border-hairline/65 p-3 rounded-xl flex flex-col justify-center">
                <span className="text-[1.85rem] font-bold text-primary-text leading-none font-mono">
                  {discoveryCount}
                </span>
                <span className="text-[0.62rem] font-mono text-muted-text font-bold uppercase mt-1">
                  DISCOVERY CALLS
                </span>
              </div>
              <div className="bg-charcoal-base border border-hairline/65 p-3 rounded-xl flex flex-col justify-center">
                <span className="text-[1.85rem] font-bold text-brass-accent leading-none font-mono">
                  {auditActiveCount}
                </span>
                <span className="text-[0.62rem] font-mono text-muted-text font-bold uppercase mt-1">
                  ACTIVE AUDITS
                </span>
              </div>
              <div className="bg-charcoal-base border border-hairline/65 p-3 rounded-xl flex flex-col justify-center">
                <span className="text-[1.85rem] font-bold text-primary-text leading-none font-mono">
                  {implProposedCount}
                </span>
                <span className="text-[0.62rem] font-mono text-muted-text font-bold uppercase mt-1">
                  PENDING PROPOSALS
                </span>
              </div>
            </div>
          </div>

          {/* Sales conversion funnel */}
          <div className="lg:col-span-8 bg-secondary-surface border border-hairline p-5 rounded-2xl flex flex-col gap-4 justify-between">
            <div className="flex justify-between items-center">
              <span className="text-micro font-mono text-brass-accent font-bold uppercase tracking-wider">
                CORE SALES CONVERSION METRICS
              </span>
              <span className="text-micro font-mono text-muted-text">
                TOTAL DATABASE: {totalProspects} | HIGH FIT (A): {aFitCount}
              </span>
            </div>

            <div className="grid grid-cols-2 sm:grid-cols-4 lg:grid-cols-5 gap-4">
              <div className="border-r border-hairline/45 pr-2">
                <span className="text-micro font-mono text-muted-text/50 block font-bold">CONTACT &rarr; REPLY</span>
                <p className="text-[1.35rem] font-bold font-mono text-primary-text mt-1">{replyRate}%</p>
              </div>
              <div className="border-r border-hairline/45 pr-2">
                <span className="text-micro font-mono text-muted-text/50 block font-bold">REPLY &rarr; DISCOVERY</span>
                <p className="text-[1.35rem] font-bold font-mono text-primary-text mt-1">{discoveryRate}%</p>
              </div>
              <div className="border-r border-hairline/45 pr-2">
                <span className="text-micro font-mono text-muted-text/50 block font-bold">DISCOVERY &rarr; AUDIT</span>
                <p className="text-[1.35rem] font-bold font-mono text-primary-text mt-1">{auditRate}%</p>
              </div>
              <div className="border-r border-hairline/45 pr-2">
                <span className="text-micro font-mono text-muted-text/50 block font-bold">IMPL &rarr; WIN RATE</span>
                <p className="text-[1.35rem] font-bold font-mono text-brass-accent mt-1">{wonRate}%</p>
              </div>
              <div>
                <span className="text-micro font-mono text-muted-text/50 block font-bold">WON PROJECTS</span>
                <p className="text-[1.35rem] font-bold font-mono text-primary-text mt-1">{wonCount}</p>
              </div>
            </div>

            {/* Campaign analytics selector details */}
            <div className="border-t border-hairline/40 pt-3 flex flex-wrap gap-4 text-micro font-mono text-muted-text">
              <span>WON: {wonCount}</span>
              <span>&bull;</span>
              <span>LOST: {lostCount}</span>
              <span>&bull;</span>
              <span>CONTACTED: {contactedCount}</span>
            </div>
          </div>

        </div>

        {/* Filters, search, import csv (Section 19, 20, 25) */}
        <div className="bg-secondary-surface border border-hairline p-5 rounded-2xl flex flex-wrap gap-4 items-center justify-between">
          <div className="flex flex-wrap gap-3 items-center">
            
            {/* Search Input */}
            <input
              type="text"
              placeholder="Search prospects..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="bg-charcoal-base border border-hairline rounded-xl px-4 py-2 text-micro font-mono text-primary-text placeholder-muted-text/30 outline-none w-56 focus:border-brass-accent"
            />

            {/* Filters Select */}
            <select
              value={filterPriority}
              onChange={(e) => setFilterPriority(e.target.value)}
              className="bg-charcoal-base border border-hairline rounded-xl px-3 py-2 text-micro font-mono text-primary-text outline-none focus:border-brass-accent cursor-pointer"
            >
              <option value="">Priority: All</option>
              <option value="A">A - High Fit</option>
              <option value="B">B - Medium Fit</option>
              <option value="C">C - Low Fit</option>
            </select>

            <select
              value={filterPattern}
              onChange={(e) => setFilterPattern(e.target.value)}
              className="bg-charcoal-base border border-hairline rounded-xl px-3 py-2 text-micro font-mono text-primary-text outline-none focus:border-brass-accent cursor-pointer"
            >
              <option value="">Pattern: All</option>
              {PATTERNS.map((p) => <option key={p} value={p}>{p}</option>)}
            </select>

            <select
              value={filterCampaign}
              onChange={(e) => setFilterCampaign(e.target.value)}
              className="bg-charcoal-base border border-hairline rounded-xl px-3 py-2 text-micro font-mono text-primary-text outline-none focus:border-brass-accent cursor-pointer"
            >
              <option value="">Campaign: All</option>
              {CAMPAIGNS.map((c) => <option key={c} value={c}>{c}</option>)}
            </select>

            <button
              onClick={() => {
                setSearchQuery("");
                setFilterPriority("");
                setFilterStage("");
                setFilterPattern("");
                setFilterSource("");
                setFilterCampaign("");
              }}
              className="text-micro font-mono text-muted-text hover:text-brass-accent transition-colors font-bold uppercase"
            >
              Reset Filters
            </button>
          </div>

          <div className="flex items-center gap-3">
            <button
              onClick={() => setIsAddOpen(true)}
              className="bg-primary-text text-white hover:bg-brass-accent border border-primary-text hover:border-brass-accent font-mono text-micro font-bold py-2 px-4 rounded-xl transition-all cursor-pointer"
            >
              + ADD PROSPECT
            </button>

            {/* CSV Import */}
            <div className="flex items-center gap-2">
              <input
                type="text"
                placeholder="Paste CSV rows here..."
                value={csvFileContent}
                onChange={(e) => setCsvFileContent(e.target.value)}
                className="bg-charcoal-base border border-hairline rounded-xl px-4 py-2 text-micro font-mono text-primary-text placeholder-muted-text/30 outline-none w-48 focus:border-brass-accent"
              />
              <button
                onClick={handleCsvImport}
                disabled={!csvFileContent}
                className="bg-secondary-surface text-primary-text hover:bg-primary-text hover:text-white border border-hairline font-mono text-micro font-bold py-2 px-3 rounded-xl transition-all disabled:opacity-40 cursor-pointer"
              >
                IMPORT CSV
              </button>
            </div>
          </div>
        </div>

        {importSummary && (
          <div className="bg-brass-accent/[0.02] border border-brass-accent/30 text-brass-accent p-4 rounded-xl font-mono text-micro uppercase">
            {importSummary}
          </div>
        )}

        {/* Kanban Board Area (Section 02, 06) */}
        <div className="flex-1 overflow-x-auto overflow-y-hidden pb-4">
          <div className="flex gap-4 items-start min-h-[500px]">
            {STAGES.map((col) => {
              const stageProspects = prospects.filter((p) => p.pipeline_stage === col.code);
              return (
                <div key={col.code} className="w-72 bg-secondary-surface border border-hairline rounded-2xl flex flex-col max-h-[600px] overflow-y-auto shrink-0 select-none">
                  
                  {/* Column Header */}
                  <div className="p-4 border-b border-hairline flex items-center justify-between sticky top-0 bg-secondary-surface z-10">
                    <span className="text-micro font-mono font-bold text-primary-text uppercase">
                      {col.name}
                    </span>
                    <span className="text-micro font-mono bg-charcoal-base border border-hairline px-2 py-0.5 rounded text-muted-text font-bold">
                      {stageProspects.length}
                    </span>
                  </div>

                  {/* Column cards container */}
                  <div className="p-3 flex flex-col gap-3">
                    {stageProspects.map((p) => (
                      <div
                        key={p.id}
                        onClick={() => handleSelectProspect(p)}
                        className={`bg-charcoal-base border p-4 rounded-xl flex flex-col gap-2.5 hover:border-brass-accent/60 transition-all cursor-pointer shadow-sm relative group ${
                          p.priority === "A" ? "border-brass-accent/30" : "border-hairline/65"
                        } ${
                          selectedProspect?.id === p.id ? "ring-1 ring-brass-accent" : ""
                        }`}
                      >
                        <div className="flex items-start justify-between">
                          <span className="text-micro font-mono font-bold text-primary-text group-hover:text-brass-accent transition-colors block max-w-[150px] truncate uppercase">
                            {p.company}
                          </span>
                          <span className={`text-[0.55rem] font-mono px-1.5 py-0.5 rounded font-bold uppercase ${
                            p.priority === "A"
                              ? "bg-brass-accent/15 text-brass-accent border border-brass-accent/20"
                              : p.priority === "B"
                              ? "bg-slate-200 text-muted-text border border-hairline/40"
                              : "bg-transparent text-muted-text/50"
                          }`}>
                            {p.priority}
                          </span>
                        </div>

                        <div className="flex flex-col gap-1 text-[0.62rem] font-mono text-muted-text">
                          {p.industry && (
                            <span>INDUSTRY: <span className="text-primary-text font-bold">{p.industry.toUpperCase()}</span></span>
                          )}
                          {p.operational_pattern && (
                            <span className="truncate">PATTERN: <span className="text-brass-accent font-bold">{p.operational_pattern.toUpperCase()}</span></span>
                          )}
                          {p.decision_maker && (
                            <span>OWNER: <span className="text-primary-text">{p.decision_maker}</span></span>
                          )}
                        </div>

                        {p.next_follow_up && (
                          <div className="border-t border-hairline/35 pt-1.5 flex items-center justify-between text-[0.55rem] font-mono">
                            <span className="text-accent-red font-bold">NEXT FOLLOW-UP:</span>
                            <span className="text-primary-text font-semibold">{p.next_follow_up.split("T")[0]}</span>
                          </div>
                        )}

                        {/* Quick progression buttons */}
                        <div className="flex justify-end gap-1 opacity-0 group-hover:opacity-100 transition-opacity mt-1 border-t border-hairline/20 pt-1.5">
                          <button
                            title="Move Stage Left"
                            onClick={(e) => {
                              e.stopPropagation();
                              const currentIdx = STAGES.findIndex((s) => s.code === col.code);
                              if (currentIdx > 0) {
                                handleMoveStage(p, STAGES[currentIdx - 1].code);
                              }
                            }}
                            className="bg-secondary-surface border border-hairline/50 p-1 text-micro hover:bg-brass-accent/10 rounded cursor-pointer text-muted-text font-mono"
                          >
                            &larr;
                          </button>
                          <button
                            title="Move Stage Right"
                            onClick={(e) => {
                              e.stopPropagation();
                              const currentIdx = STAGES.findIndex((s) => s.code === col.code);
                              if (currentIdx < STAGES.length - 1) {
                                handleMoveStage(p, STAGES[currentIdx + 1].code);
                              }
                            }}
                            className="bg-secondary-surface border border-hairline/50 p-1 text-micro hover:bg-brass-accent/10 rounded cursor-pointer text-muted-text font-mono"
                          >
                            &rarr;
                          </button>
                        </div>

                      </div>
                    ))}
                  </div>

                </div>
              );
            })}
          </div>
        </div>

      </main>

      {/* Prospect Details Slide-over panel (Section 07 to 15) */}
      {selectedProspect && (
        <div className="fixed inset-y-0 right-0 w-[500px] bg-secondary-surface border-l border-hairline z-40 flex flex-col shadow-2xl p-6 overflow-y-auto select-none">
          
          {/* Panel Header */}
          <div className="flex justify-between items-start border-b border-hairline pb-4 mb-4">
            <div className="flex flex-col gap-1">
              <span className="text-micro font-mono text-brass-accent font-bold uppercase">{selectedProspect.priority} &bull; {selectedProspect.industry || 'no industry'}</span>
              <h2 className="text-[1.5rem] font-bold text-primary-text font-display uppercase tracking-tight">{selectedProspect.company}</h2>
              <span className="text-[0.62rem] font-mono text-muted-text bg-charcoal-base border border-hairline px-2 py-0.5 rounded uppercase self-start mt-1">
                {selectedProspect.pipeline_stage.replace(/^\d+_/gi, "").replace(/_/gi, " ")}
              </span>
            </div>
            <button
              onClick={() => setSelectedProspect(null)}
              className="text-micro font-mono text-muted-text hover:text-brass-accent transition-colors font-bold uppercase cursor-pointer"
            >
              CLOSE &times;
            </button>
          </div>

          {/* Details Tabs Selector */}
          <div className="flex border-b border-hairline/55 mb-4 text-[0.65rem] font-mono text-muted-text font-bold uppercase tracking-wider overflow-x-auto whitespace-nowrap">
            {["COMPANY", "DECISION MAKER", "OPERATIONAL HYPOTHESIS", "RESEARCH NOTES", "OUTREACH", "DEAL", "ACTIVITY"].map((tab) => (
              <button
                key={tab}
                onClick={() => setActiveDetailsTab(tab)}
                className={`py-2 px-3 border-b-2 transition-all cursor-pointer ${
                  activeDetailsTab === tab ? "border-brass-accent text-brass-accent" : "border-transparent hover:text-primary-text"
                }`}
              >
                {tab}
              </button>
            ))}
          </div>

          {/* Tab contents */}
          <div className="flex-1 flex flex-col gap-5 text-micro font-mono text-muted-text">
            
            {activeDetailsTab === "COMPANY" && (
              <div className="flex flex-col gap-4">
                <div>
                  <span className="text-[0.58rem] font-bold text-muted-text/50 uppercase block">Website Domain</span>
                  {selectedProspect.website ? (
                    <a href={selectedProspect.website} target="_blank" rel="noopener noreferrer" className="text-brass-accent underline hover:text-primary-text mt-0.5 block">
                      {selectedProspect.website}
                    </a>
                  ) : <span>Not provided</span>}
                </div>
                <div>
                  <span className="text-[0.58rem] font-bold text-muted-text/50 uppercase block">Employee Range</span>
                  <p className="text-primary-text font-bold mt-0.5">{selectedProspect.employee_range || 'Unknown'}</p>
                </div>
                <div>
                  <span className="text-[0.58rem] font-bold text-muted-text/50 uppercase block">Location</span>
                  <p className="text-primary-text mt-0.5">{selectedProspect.location || 'Unknown'}</p>
                </div>
                <div>
                  <span className="text-[0.58rem] font-bold text-muted-text/50 uppercase block">Operational Description</span>
                  <p className="text-primary-text font-semibold leading-relaxed mt-0.5 p-3 bg-charcoal-base border border-hairline/45 rounded-xl">
                    {selectedProspect.company_description || 'No description logged.'}
                  </p>
                </div>
              </div>
            )}

            {activeDetailsTab === "DECISION MAKER" && (
              <div className="flex flex-col gap-4">
                <div>
                  <span className="text-[0.58rem] font-bold text-muted-text/50 uppercase block">Decision Maker</span>
                  <p className="text-primary-text font-bold mt-0.5">{selectedProspect.decision_maker || 'Unknown'}</p>
                </div>
                <div>
                  <span className="text-[0.58rem] font-bold text-muted-text/50 uppercase block">Role</span>
                  <p className="text-primary-text mt-0.5">{selectedProspect.decision_maker_role || 'Unknown'}</p>
                </div>
                <div>
                  <span className="text-[0.58rem] font-bold text-muted-text/50 uppercase block">DM Link</span>
                  {selectedProspect.decision_maker_link ? (
                    <a href={selectedProspect.decision_maker_link} target="_blank" rel="noopener noreferrer" className="text-brass-accent underline hover:text-primary-text mt-0.5 block">
                      {selectedProspect.decision_maker_link}
                    </a>
                  ) : <span>Not provided</span>}
                </div>
                <div>
                  <span className="text-[0.58rem] font-bold text-muted-text/50 uppercase block">Email Address</span>
                  <p className="text-primary-text mt-0.5">{selectedProspect.email || 'Unknown'}</p>
                </div>
                <div>
                  <span className="text-[0.58rem] font-bold text-muted-text/50 uppercase block">LinkedIn URL</span>
                  {selectedProspect.linkedin ? (
                    <a href={selectedProspect.linkedin} target="_blank" rel="noopener noreferrer" className="text-brass-accent underline hover:text-primary-text mt-0.5 block">
                      {selectedProspect.linkedin}
                    </a>
                  ) : <span>Not provided</span>}
                </div>
              </div>
            )}

            {activeDetailsTab === "OPERATIONAL HYPOTHESIS" && (
              <div className="flex flex-col gap-4">
                <div>
                  <span className="text-[0.58rem] font-bold text-muted-text/50 uppercase block">Operational Bottleneck Pattern</span>
                  <p className="text-brass-accent font-extrabold mt-0.5">{selectedProspect.operational_pattern || 'None Specified'}</p>
                </div>
                <div>
                  <span className="text-[0.58rem] font-bold text-muted-text/50 uppercase block">Hypothesis Explanation</span>
                  <p className="text-primary-text font-semibold leading-relaxed mt-0.5 p-3 bg-charcoal-base border border-hairline/45 rounded-xl">
                    {selectedProspect.problem_hypothesis || 'No hypothesis logged yet.'}
                  </p>
                </div>

                {/* Qualification checklist rules (Section 05) */}
                <div className="border border-hairline p-4 rounded-xl bg-charcoal-base/50 flex flex-col gap-2.5">
                  <span className="text-micro font-bold text-brass-accent uppercase">
                    A‑PRIORITY FIT CHECKLIST
                  </span>
                  <ul className="flex flex-col gap-1.5 text-[0.62rem] text-muted-text">
                    <li className="flex items-center gap-2">
                      <span className="text-brass-accent font-bold font-mono">✔</span>
                      <span>Operations‑heavy business model</span>
                    </li>
                    <li className="flex items-center gap-2">
                      <span className="text-brass-accent font-bold font-mono">✔</span>
                      <span>Estimated employee size: 10–200 range</span>
                    </li>
                    <li className="flex items-center gap-2">
                      <span className="text-brass-accent font-bold font-mono">✔</span>
                      <span>Clear operational complexity & visible manual delays</span>
                    </li>
                    <li className="flex items-center gap-2">
                      <span className="text-brass-accent font-bold font-mono">✔</span>
                      <span>Identifiable decision maker with access</span>
                    </li>
                    <li className="flex items-center gap-2">
                      <span className="text-brass-accent font-bold font-mono">✔</span>
                      <span>Capable of funding implementation proposal</span>
                    </li>
                  </ul>
                  
                  {/* Select Priority Fit */}
                  <div className="border-t border-hairline/40 pt-2 flex items-center justify-between mt-1">
                    <span className="text-micro font-bold text-primary-text">QUALIFIED PRIORITY:</span>
                    <select
                      value={selectedProspect.priority}
                      onChange={async (e) => {
                        const newP = e.target.value;
                        const res = await fetch("/api/internal/sales", {
                          method: "PUT",
                          headers: { "Content-Type": "application/json" },
                          body: JSON.stringify({ id: selectedProspect.id, priority: newP })
                        });
                        if (res.ok) {
                          setSelectedProspect({ ...selectedProspect, priority: newP });
                          fetchProspects();
                        }
                      }}
                      className="bg-secondary-surface border border-hairline rounded px-2 py-1 text-micro text-brass-accent font-mono font-bold outline-none focus:border-brass-accent cursor-pointer"
                    >
                      <option value="A">A - High Fit</option>
                      <option value="B">B - Medium Fit</option>
                      <option value="C">C - Low Fit</option>
                    </select>
                  </div>
                </div>
              </div>
            )}

            {activeDetailsTab === "RESEARCH NOTES" && (
              <div className="flex flex-col gap-4">
                
                {/* Research observed values */}
                <div className="border border-hairline p-4 rounded-xl bg-charcoal-base/50 flex flex-col gap-3">
                  <div className="flex items-center justify-between">
                    <span className="text-micro font-bold text-brass-accent uppercase">
                      RESEARCH OBSERVATION LOG
                    </span>
                    <span className="text-[0.55rem] font-mono text-muted-text/50 bg-slate-100 px-1.5 py-0.5 rounded font-bold uppercase select-none">
                      UNVERIFIED
                    </span>
                  </div>
                  
                  <div className="flex flex-col gap-2.5">
                    <div>
                      <span className="text-[0.58rem] font-bold text-muted-text/50 block">WHAT THEY DO:</span>
                      <textarea
                        value={researchDo}
                        onChange={(e) => setResearchDo(e.target.value)}
                        placeholder="Provide details..."
                        className="w-full bg-charcoal-base border border-hairline rounded-lg p-2.5 text-micro font-mono text-primary-text outline-none focus:border-brass-accent mt-1 min-h-[50px] resize-y"
                      />
                    </div>
                    <div>
                      <span className="text-[0.58rem] font-bold text-muted-text/50 block">HOW THEY OPERATE:</span>
                      <textarea
                        value={researchOperate}
                        onChange={(e) => setResearchOperate(e.target.value)}
                        placeholder="Provide details..."
                        className="w-full bg-charcoal-base border border-hairline rounded-lg p-2.5 text-micro font-mono text-primary-text outline-none focus:border-brass-accent mt-1 min-h-[50px] resize-y"
                      />
                    </div>
                    <div>
                      <span className="text-[0.58rem] font-bold text-muted-text/50 block">LIKELY FRICTION:</span>
                      <textarea
                        value={researchFriction}
                        onChange={(e) => setResearchFriction(e.target.value)}
                        placeholder="Provide details..."
                        className="w-full bg-charcoal-base border border-hairline rounded-lg p-2.5 text-micro font-mono text-primary-text outline-none focus:border-brass-accent mt-1 min-h-[50px] resize-y"
                      />
                    </div>
                  </div>

                  <button
                    onClick={() => {
                      handleAddDetail("activity", {
                        event: "Research updated",
                        notes: `Friction: ${researchFriction.substring(0, 50)}...`
                      });
                      alert("Observation research logged to timeline.");
                    }}
                    className="bg-primary-text hover:bg-brass-accent text-white font-mono text-micro font-bold py-2 px-3 rounded-lg transition-colors cursor-pointer self-start"
                  >
                    LOG OBSERVATION
                  </button>
                </div>

              </div>
            )}

            {activeDetailsTab === "OUTREACH" && (
              <div className="flex flex-col gap-4">
                
                {/* Log outreach */}
                <div className="border border-hairline p-4 rounded-xl bg-charcoal-base/50 flex flex-col gap-3">
                  <span className="text-micro font-bold text-brass-accent uppercase">
                    LOG OUTBOUND ATTEMPT
                  </span>
                  
                  <div className="flex flex-col gap-2.5">
                    <div className="grid grid-cols-2 gap-3">
                      <div>
                        <span className="text-[0.58rem] font-bold text-muted-text/50 block">CHANNEL:</span>
                        <select
                          value={newOutreachChannel}
                          onChange={(e) => setNewOutreachChannel(e.target.value)}
                          className="w-full bg-charcoal-base border border-hairline rounded px-2 py-1.5 text-micro text-primary-text font-mono outline-none focus:border-brass-accent cursor-pointer mt-1"
                        >
                          <option value="EMAIL">EMAIL</option>
                          <option value="LINKEDIN">LINKEDIN</option>
                          <option value="WHATSAPP">WHATSAPP</option>
                          <option value="OTHER">OTHER</option>
                        </select>
                      </div>
                      <div>
                        <span className="text-[0.58rem] font-bold text-muted-text/50 block">STATUS:</span>
                        <select
                          value={newOutreachStatus}
                          onChange={(e) => setNewOutreachStatus(e.target.value)}
                          className="w-full bg-charcoal-base border border-hairline rounded px-2 py-1.5 text-micro text-primary-text font-mono outline-none focus:border-brass-accent cursor-pointer mt-1"
                        >
                          <option value="DRAFT">DRAFT</option>
                          <option value="SENT">SENT</option>
                          <option value="REPLIED">REPLIED</option>
                          <option value="NO RESPONSE">NO RESPONSE</option>
                          <option value="BOUNCED">BOUNCED</option>
                        </select>
                      </div>
                    </div>

                    <div>
                      <span className="text-[0.58rem] font-bold text-muted-text/50 block">MESSAGE TEXT:</span>
                      <textarea
                        value={newOutreachMsg}
                        onChange={(e) => setNewOutreachMsg(e.target.value)}
                        placeholder="Write draft outreach templates..."
                        className="w-full bg-charcoal-base border border-hairline rounded-lg p-2.5 text-micro font-mono text-primary-text outline-none focus:border-brass-accent mt-1 min-h-[70px] resize-y"
                      />
                    </div>
                  </div>

                  <button
                    onClick={() => {
                      handleAddDetail("outreach", {
                        channel: newOutreachChannel,
                        message: newOutreachMsg,
                        status: newOutreachStatus
                      });
                      setNewOutreachMsg("");
                    }}
                    className="bg-primary-text hover:bg-brass-accent text-white font-mono text-micro font-bold py-2 px-3 rounded-lg transition-colors cursor-pointer self-start"
                  >
                    LOG OUTREACH
                  </button>
                </div>

                {/* Outreach Log List */}
                <div className="flex flex-col gap-2">
                  <span className="text-[0.58rem] font-bold text-muted-text/50 block uppercase">OUTREACH HISTORY</span>
                  {outreachLogs.length === 0 ? (
                    <span>No outreach attempts recorded.</span>
                  ) : (
                    outreachLogs.map((log) => (
                      <div key={log.id} className="bg-charcoal-base border border-hairline/45 p-3 rounded-lg flex flex-col gap-1">
                        <div className="flex justify-between items-center text-[0.55rem] font-bold">
                          <span className="text-brass-accent">{log.channel}</span>
                          <span className="text-primary-text">{log.status}</span>
                        </div>
                        {log.message && <p className="text-[0.62rem] text-muted-text mt-1">{log.message}</p>}
                        <span className="text-[0.52rem] text-muted-text/40 mt-1">{log.created_at}</span>
                      </div>
                    ))
                  )}
                </div>

              </div>
            )}

            {activeDetailsTab === "DEAL" && (
              <div className="flex flex-col gap-4">
                
                {/* 1. Strategy Audit detail box */}
                <div className="border border-hairline p-4 rounded-xl bg-charcoal-base/50 flex flex-col gap-3">
                  <span className="text-micro font-bold text-brass-accent uppercase">
                    STRATEGY AUDIT PROPOSAL SCOPE
                  </span>
                  
                  <div className="flex flex-col gap-2.5">
                    <div>
                      <span className="text-[0.58rem] font-bold text-muted-text/50 block">AUDIT PROBLEM SCOPE:</span>
                      <input
                        type="text"
                        placeholder="Expected diagnostic focus area..."
                        value={auditProblem}
                        onChange={(e) => setAuditProblem(e.target.value)}
                        className="w-full bg-charcoal-base border border-hairline rounded px-3 py-1.5 text-micro font-mono text-primary-text outline-none focus:border-brass-accent mt-1"
                      />
                    </div>
                    <div className="grid grid-cols-2 gap-3">
                      <div>
                        <span className="text-[0.58rem] font-bold text-muted-text/50 block">AUDIT FEE ($):</span>
                        <input
                          type="number"
                          value={auditFee}
                          onChange={(e) => setAuditFee(e.target.value)}
                          className="w-full bg-charcoal-base border border-hairline rounded px-3 py-1.5 text-micro font-mono text-primary-text outline-none focus:border-brass-accent mt-1"
                        />
                      </div>
                      <div>
                        <span className="text-[0.58rem] font-bold text-muted-text/50 block">STATUS:</span>
                        <select
                          value={auditStatus}
                          onChange={(e) => setAuditStatus(e.target.value)}
                          className="w-full bg-charcoal-base border border-hairline rounded px-2 py-1.5 text-micro text-primary-text font-mono outline-none focus:border-brass-accent cursor-pointer mt-1"
                        >
                          <option value="PROPOSED">PROPOSED</option>
                          <option value="ACCEPTED">ACCEPTED</option>
                          <option value="ACTIVE">ACTIVE</option>
                          <option value="COMPLETE">COMPLETE</option>
                        </select>
                      </div>
                    </div>
                  </div>

                  <button
                    onClick={async () => {
                      await handleAddDetail("audit", {
                        problem: auditProblem,
                        fee: parseFloat(auditFee) || 0,
                        status: auditStatus,
                        startDate: auditStart || null,
                        targetEndDate: auditEnd || null,
                        expectedOutput: auditOutput || null,
                        deliverables: auditDeliverables || null
                      });
                      // Auto move to AUDIT PROPOSED stage if current stage is less than that
                      if (selectedProspect.pipeline_stage.localeCompare("06_AUDIT_PROPOSED") < 0) {
                        await handleMoveStage(selectedProspect, "06_AUDIT_PROPOSED");
                      }
                      alert("Audit record saved successfully.");
                    }}
                    className="bg-primary-text hover:bg-brass-accent text-white font-mono text-micro font-bold py-2 px-3 rounded-lg transition-colors cursor-pointer self-start"
                  >
                    SAVE AUDIT RECORD
                  </button>
                </div>

                {/* 2. Implementation proposal box */}
                <div className="border border-hairline p-4 rounded-xl bg-charcoal-base/50 flex flex-col gap-3">
                  <span className="text-micro font-bold text-brass-accent uppercase">
                    IMPLEMENTATION PROPOSAL
                  </span>

                  <div className="flex flex-col gap-2.5">
                    <div>
                      <span className="text-[0.58rem] font-bold text-muted-text/50 block">PROJECT/DEAL NAME:</span>
                      <input
                        type="text"
                        placeholder="e.g. Acme Dispatch Sequencer..."
                        value={propName}
                        onChange={(e) => setPropName(e.target.value)}
                        className="w-full bg-charcoal-base border border-hairline rounded px-3 py-1.5 text-micro font-mono text-primary-text outline-none focus:border-brass-accent mt-1"
                      />
                    </div>
                    <div className="grid grid-cols-2 gap-3">
                      <div>
                        <span className="text-[0.58rem] font-bold text-muted-text/50 block">DEAL VALUE ($):</span>
                        <input
                          type="number"
                          value={propVal}
                          onChange={(e) => setPropVal(e.target.value)}
                          className="w-full bg-charcoal-base border border-hairline rounded px-3 py-1.5 text-micro font-mono text-primary-text outline-none focus:border-brass-accent mt-1"
                        />
                      </div>
                      <div>
                        <span className="text-[0.58rem] font-bold text-muted-text/50 block">PROPOSAL STATUS:</span>
                        <select
                          value={propStatus}
                          onChange={(e) => setPropStatus(e.target.value)}
                          className="w-full bg-charcoal-base border border-hairline rounded px-2 py-1.5 text-micro text-primary-text font-mono outline-none focus:border-brass-accent cursor-pointer mt-1"
                        >
                          <option value="PROPOSED">PROPOSED</option>
                          <option value="WON">WON</option>
                          <option value="LOST">LOST</option>
                        </select>
                      </div>
                    </div>
                  </div>

                  <button
                    onClick={async () => {
                      if (!propName) {
                        alert("Project Name is required.");
                        return;
                      }
                      await handleAddDetail("proposal", {
                        projectName: propName,
                        projectValue: parseFloat(propVal) || 0,
                        status: propStatus,
                        scope: propScope || null,
                        systemsToBuild: propSystems || null,
                        integrations: propIntegrations || null,
                        milestones: propMilestones || null,
                        estimatedTimeline: propTimeline || null
                      });
                      if (propStatus === "WON") {
                        await handleMoveStage(selectedProspect, "10_WON");
                      } else {
                        if (selectedProspect.pipeline_stage.localeCompare("09_IMPLEMENTATION_PROPOSED") < 0) {
                          await handleMoveStage(selectedProspect, "09_IMPLEMENTATION_PROPOSED");
                        }
                      }
                      alert("Proposal record logged successfully.");
                    }}
                    className="bg-primary-text hover:bg-brass-accent text-white font-mono text-micro font-bold py-2 px-3 rounded-lg transition-colors cursor-pointer self-start"
                  >
                    SAVE PROPOSAL RECORD
                  </button>
                </div>

              </div>
            )}

            {activeDetailsTab === "ACTIVITY" && (
              <div className="flex flex-col gap-3">
                <span className="text-[0.58rem] font-bold text-muted-text/50 block uppercase">CHRONOLOGICAL PIPELINE EVENTS</span>
                {activities.length === 0 ? (
                  <span>No events logged.</span>
                ) : (
                  <div className="flex flex-col gap-3 relative pl-4 border-l border-hairline/45">
                    {activities.map((act) => (
                      <div key={act.id} className="relative flex flex-col gap-0.5">
                        <span className="absolute -left-[21px] top-1 w-2.5 h-2.5 rounded-full bg-brass-accent border border-charcoal-base" />
                        <span className="text-primary-text font-bold text-micro uppercase">{act.event}</span>
                        {act.notes && <p className="text-[0.62rem] text-muted-text">{act.notes}</p>}
                        <span className="text-[0.52rem] text-muted-text/40">{act.created_at}</span>
                      </div>
                    ))}
                  </div>
                )}
              </div>
            )}

          </div>

        </div>
      )}

      {/* Add Prospect Modal View */}
      {isAddOpen && (
        <div className="fixed inset-0 bg-primary-text/40 backdrop-blur-sm z-50 flex items-center justify-center p-6 select-none">
          <div className="w-full max-w-2xl bg-secondary-surface border border-hairline rounded-[2rem] p-8 max-h-[85vh] overflow-y-auto flex flex-col gap-6 shadow-2xl relative">
            
            <div className="flex justify-between items-start border-b border-hairline pb-4">
              <div className="flex flex-col gap-1">
                <span className="text-micro font-mono text-brass-accent font-bold uppercase tracking-wider">NEW RECORD</span>
                <h3 className="text-[1.35rem] font-bold text-primary-text font-display uppercase tracking-tight">ADD NEW PROSPECT</h3>
              </div>
              <button
                onClick={() => setIsAddOpen(false)}
                className="text-micro font-mono text-muted-text hover:text-brass-accent font-bold uppercase cursor-pointer"
              >
                CLOSE &times;
              </button>
            </div>

            {dupWarning && (
              <div className="bg-red-100/10 border border-accent-red/25 text-accent-red p-4 rounded-xl font-mono text-micro uppercase">
                {dupWarning}
              </div>
            )}

            <form onSubmit={handleAddProspect} className="grid grid-cols-1 md:grid-cols-2 gap-4 text-micro font-mono">
              
              <div>
                <label className="text-[0.58rem] font-bold text-muted-text/50 uppercase block">COMPANY NAME *</label>
                <input
                  type="text"
                  required
                  value={newCompany}
                  onChange={(e) => setNewCompany(e.target.value)}
                  className="w-full bg-charcoal-base border border-hairline rounded px-3 py-2 mt-1 text-primary-text focus:border-brass-accent outline-none"
                />
              </div>

              <div>
                <label className="text-[0.58rem] font-bold text-muted-text/50 uppercase block">WEBSITE URL</label>
                <input
                  type="url"
                  placeholder="https://example.com"
                  value={newWebsite}
                  onChange={(e) => setNewWebsite(e.target.value)}
                  className="w-full bg-charcoal-base border border-hairline rounded px-3 py-2 mt-1 text-primary-text focus:border-brass-accent outline-none"
                />
              </div>

              <div>
                <label className="text-[0.58rem] font-bold text-muted-text/50 uppercase block">INDUSTRY</label>
                <input
                  type="text"
                  value={newIndustry}
                  onChange={(e) => setNewIndustry(e.target.value)}
                  className="w-full bg-charcoal-base border border-hairline rounded px-3 py-2 mt-1 text-primary-text focus:border-brass-accent outline-none"
                />
              </div>

              <div>
                <label className="text-[0.58rem] font-bold text-muted-text/50 uppercase block">LOCATION</label>
                <input
                  type="text"
                  placeholder="e.g. London, UK"
                  value={newLocation}
                  onChange={(e) => setNewLocation(e.target.value)}
                  className="w-full bg-charcoal-base border border-hairline rounded px-3 py-2 mt-1 text-primary-text focus:border-brass-accent outline-none"
                />
              </div>

              <div>
                <label className="text-[0.58rem] font-bold text-muted-text/50 uppercase block">EMPLOYEE RANGE</label>
                <input
                  type="text"
                  placeholder="e.g. 50-100"
                  value={newEmployeeRange}
                  onChange={(e) => setNewEmployeeRange(e.target.value)}
                  className="w-full bg-charcoal-base border border-hairline rounded px-3 py-2 mt-1 text-primary-text focus:border-brass-accent outline-none"
                />
              </div>

              <div>
                <label className="text-[0.58rem] font-bold text-muted-text/50 uppercase block">QUALIFICATION PRIORITY</label>
                <select
                  value={newPriority}
                  onChange={(e) => setNewPriority(e.target.value)}
                  className="w-full bg-charcoal-base border border-hairline rounded px-2 py-2 mt-1 text-primary-text focus:border-brass-accent outline-none cursor-pointer"
                >
                  <option value="A">A - High Fit</option>
                  <option value="B">B - Medium Fit</option>
                  <option value="C">C - Low Fit</option>
                </select>
              </div>

              <div>
                <label className="text-[0.58rem] font-bold text-muted-text/50 uppercase block">OPERATIONAL BOTTLENECK PATTERN</label>
                <select
                  value={newPattern}
                  onChange={(e) => setNewPattern(e.target.value)}
                  className="w-full bg-charcoal-base border border-hairline rounded px-2 py-2 mt-1 text-primary-text focus:border-brass-accent outline-none cursor-pointer"
                >
                  {PATTERNS.map((p) => <option key={p} value={p}>{p}</option>)}
                </select>
              </div>

              {newPattern === "OTHER" && (
                <div>
                  <label className="text-[0.58rem] font-bold text-muted-text/50 uppercase block">CUSTOM PATTERN TEXT</label>
                  <input
                    type="text"
                    required
                    value={newPatternOther}
                    onChange={(e) => setNewPatternOther(e.target.value)}
                    className="w-full bg-charcoal-base border border-hairline rounded px-3 py-2 mt-1 text-primary-text focus:border-brass-accent outline-none"
                  />
                </div>
              )}

              <div>
                <label className="text-[0.58rem] font-bold text-muted-text/50 uppercase block">DECISION MAKER NAME</label>
                <input
                  type="text"
                  value={newDM}
                  onChange={(e) => setNewDM(e.target.value)}
                  className="w-full bg-charcoal-base border border-hairline rounded px-3 py-2 mt-1 text-primary-text focus:border-brass-accent outline-none"
                />
              </div>

              <div>
                <label className="text-[0.58rem] font-bold text-muted-text/50 uppercase block">DECISION MAKER ROLE</label>
                <input
                  type="text"
                  value={newDMRole}
                  onChange={(e) => setNewDMRole(e.target.value)}
                  className="w-full bg-charcoal-base border border-hairline rounded px-3 py-2 mt-1 text-primary-text focus:border-brass-accent outline-none"
                />
              </div>

              <div>
                <label className="text-[0.58rem] font-bold text-muted-text/50 uppercase block">DM LINK (LinkedIn, etc.)</label>
                <input
                  type="url"
                  value={newDMLink}
                  onChange={(e) => setNewDMLink(e.target.value)}
                  className="w-full bg-charcoal-base border border-hairline rounded px-3 py-2 mt-1 text-primary-text focus:border-brass-accent outline-none"
                />
              </div>

              <div>
                <label className="text-[0.58rem] font-bold text-muted-text/50 uppercase block">CONTACT EMAIL</label>
                <input
                  type="email"
                  value={newEmail}
                  onChange={(e) => setNewEmail(e.target.value)}
                  className="w-full bg-charcoal-base border border-hairline rounded px-3 py-2 mt-1 text-primary-text focus:border-brass-accent outline-none"
                />
              </div>

              <div>
                <label className="text-[0.58rem] font-bold text-muted-text/50 uppercase block">CAMPAIGN</label>
                <select
                  value={newCampaign}
                  onChange={(e) => setNewCampaign(e.target.value)}
                  className="w-full bg-charcoal-base border border-hairline rounded px-2 py-2 mt-1 text-primary-text focus:border-brass-accent outline-none cursor-pointer"
                >
                  <option value="">None</option>
                  {CAMPAIGNS.map((c) => <option key={c} value={c}>{c}</option>)}
                </select>
              </div>

              <div className="md:col-span-2">
                <label className="text-[0.58rem] font-bold text-muted-text/50 uppercase block">PROBLEM HYPOTHESIS STATEMENT</label>
                <textarea
                  value={newHypothesis}
                  onChange={(e) => setNewHypothesis(e.target.value)}
                  placeholder="Explain why their operational model could fail with manual coordination..."
                  className="w-full bg-charcoal-base border border-hairline rounded p-2.5 mt-1 text-primary-text focus:border-brass-accent outline-none min-h-[60px]"
                />
              </div>

              <div className="md:col-span-2">
                <label className="text-[0.58rem] font-bold text-muted-text/50 uppercase block">COMPANY DESCRIPTION</label>
                <textarea
                  value={newDesc}
                  onChange={(e) => setNewDesc(e.target.value)}
                  className="w-full bg-charcoal-base border border-hairline rounded p-2.5 mt-1 text-primary-text focus:border-brass-accent outline-none min-h-[50px]"
                />
              </div>

              <div className="md:col-span-2 flex justify-end gap-3 mt-4 border-t border-hairline pt-4">
                <button
                  type="button"
                  onClick={() => setIsAddOpen(false)}
                  className="border border-hairline hover:bg-slate-50 font-mono text-micro font-bold py-2.5 px-5 rounded-xl transition-colors cursor-pointer"
                >
                  CANCEL
                </button>
                <button
                  type="submit"
                  className="bg-primary-text text-white hover:bg-brass-accent border border-primary-text hover:border-brass-accent font-mono text-micro font-bold py-2.5 px-6 rounded-xl transition-all cursor-pointer"
                >
                  SAVE RECORD
                </button>
              </div>

            </form>
          </div>
        </div>
      )}

    </div>
  );
}
