"use client";

import { useEffect, useState } from "react";
import Navigation from "@/components/Navigation";
import Footer from "@/components/Footer";

interface Submission {
  id: number;
  name: string;
  role: string;
  company: string;
  timezone: string;
  teamSize: string;
  solvedBefore: string;
  headache: string;
  nextStep: string;
  submissionType: string;
  changeImpact: string;
  created_at: string;
}

export default function SubmissionsPage() {
  const [submissions, setSubmissions] = useState<Submission[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedSubmission, setSelectedSubmission] = useState<Submission | null>(null);

  const getTypeBadge = (type: string) => {
    switch (type) {
      case "audit":
        return "bg-brass-accent/10 border-brass-accent/30 text-brass-accent";
      case "sprint":
        return "bg-blue-500/10 border-blue-500/30 text-blue-500";
      case "build":
        return "bg-emerald-500/10 border-emerald-500/30 text-emerald-500";
      case "retainer":
        return "bg-purple-500/10 border-purple-500/30 text-purple-500";
      default:
        return "bg-neutral-500/10 border-neutral-500/30 text-neutral-500";
    }
  };

  const getTypeText = (type: string) => {
    switch (type) {
      case "audit":
        return "Strategy Audit";
      case "sprint":
        return "Research Sprint";
      case "build":
        return "Solution Build";
      case "retainer":
        return "Retainer";
      default:
        return "General Intake";
    }
  };

  const fetchSubmissions = async () => {
    setLoading(true);
    setError("");
    try {
      const response = await fetch("/api/contact");
      const result = await response.json();
      if (response.ok && result.success) {
        setSubmissions(result.data);
      } else {
        setError(result.error || "Failed to load submissions.");
      }
    } catch (err) {
      setError("Failed to fetch data from the server.");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchSubmissions();
  }, []);

  const filteredSubmissions = submissions.filter((sub) => {
    const text = `${sub.name} ${sub.company} ${sub.role} ${sub.headache} ${sub.submissionType || ""}`.toLowerCase();
    return text.includes(searchTerm.toLowerCase());
  });

  return (
    <div className="flex flex-col min-h-screen bg-charcoal-base text-primary-text font-sans">
      <Navigation />

      <main className="flex-1 w-full max-w-7xl mx-auto px-6 pt-40 pb-24 flex flex-col gap-12 relative z-10">
        
        {/* Page Header */}
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-6 border-b border-hairline pb-10">
          <div className="flex flex-col gap-3">
            <span className="text-caption text-brass-accent font-mono tracking-widest font-bold">
              [ SECURE DATABASE DESK ]
            </span>
            <h1 className="text-[2.5rem] md:text-[3.5rem] font-bold tracking-tight text-primary-text leading-none font-display">
              Scoping Submissions
            </h1>
            <p className="text-body-base text-muted-text mt-1">
              Active intake queries stored in the local SQLite database system.
            </p>
          </div>
          <button
            onClick={fetchSubmissions}
            className="self-start sm:self-center bg-secondary-surface hover:bg-white hover:text-charcoal-base text-primary-text font-mono text-[0.8rem] font-bold py-2.5 px-5 rounded-full border border-hairline transition-colors flex items-center gap-2"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
              className={`w-4 h-4 ${loading ? "animate-spin" : ""}`}
            >
              <path d="M21.5 2v6h-6M21.34 15.57a10 10 0 1 1-.57-8.38l5.67-5.67" />
            </svg>
            RE-INDEX ROWS
          </button>
        </div>

        {/* Database Stats Counters */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
          <div className="bg-secondary-surface border border-brass-accent/15 p-6 rounded-2xl flex flex-col gap-2">
            <span className="text-micro font-mono text-muted-text uppercase tracking-widest">Database Uptime</span>
            <span className="text-[1.75rem] font-bold text-primary-text font-display">100.0% Real-Time</span>
          </div>
          <div className="bg-secondary-surface border border-brass-accent/15 p-6 rounded-2xl flex flex-col gap-2">
            <span className="text-micro font-mono text-muted-text uppercase tracking-widest">Total Logged Queries</span>
            <span className="text-[1.75rem] font-bold text-brass-accent font-display">{submissions.length} Rows</span>
          </div>
          <div className="bg-secondary-surface border border-brass-accent/15 p-6 rounded-2xl flex flex-col gap-2">
            <span className="text-micro font-mono text-muted-text uppercase tracking-widest">DB System Provider</span>
            <span className="text-[1.75rem] font-bold text-primary-text font-display">SQLite / Node driver</span>
          </div>
        </div>

        {/* Control Row: Search */}
        <div className="w-full flex items-center">
          <input
            type="text"
            placeholder="Filter database rows by name, company, headache keyword..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full max-w-xl bg-white/40 border border-hairline/60 p-4 rounded-full text-[0.9rem] text-primary-text focus:outline-none focus:border-brass-accent focus:bg-white transition-all shadow-sm"
          />
        </div>

        {/* Dashboard Columns */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          
          {/* Submissions Table / List */}
          <div className="lg:col-span-8 flex flex-col gap-4">
            {loading ? (
              <div className="text-center py-16 text-muted-text font-mono text-[0.9rem]">
                QUERYING SQLITE DATASOURCE...
              </div>
            ) : error ? (
              <div className="bg-red-500/10 border border-red-500/20 p-6 rounded-2xl text-center text-red-500 font-mono text-[0.9rem]">
                {error}
              </div>
            ) : filteredSubmissions.length === 0 ? (
              <div className="bg-secondary-surface border border-hairline/60 p-16 rounded-[2rem] text-center text-muted-text font-mono text-[0.9rem]">
                No records found. Submit a scoping form to log rows to the database.
              </div>
            ) : (
              <div className="bg-secondary-surface border border-white/60 rounded-[2rem] overflow-hidden shadow-sm backdrop-blur-md">
                <div className="overflow-x-auto">
                  <table className="w-full border-collapse text-left text-[0.9rem]">
                    <thead>
                      <tr className="border-b border-hairline bg-white/30 text-micro font-mono text-muted-text uppercase tracking-wider font-bold">
                        <th className="p-5">ID</th>
                        <th className="p-5">Type</th>
                        <th className="p-5">Company / Client</th>
                        <th className="p-5">Contact</th>
                        <th className="p-5">Preferred Step</th>
                        <th className="p-5">Submitted At</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-hairline/40">
                      {filteredSubmissions.map((sub) => (
                        <tr
                          key={sub.id}
                          onClick={() => setSelectedSubmission(sub)}
                          className={`hover:bg-white/45 cursor-pointer transition-colors ${
                            selectedSubmission?.id === sub.id ? "bg-brass-accent/10" : ""
                          }`}
                        >
                          <td className="p-5 font-mono text-brass-accent font-bold">#{sub.id}</td>
                          <td className="p-5">
                            <span className={`inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-micro font-mono font-bold border ${getTypeBadge(sub.submissionType || "general")}`}>
                              {getTypeText(sub.submissionType || "general")}
                            </span>
                          </td>
                          <td className="p-5 font-semibold text-primary-text">
                            {sub.company}
                            <span className="block text-micro font-mono text-muted-text font-normal">
                              {sub.role}
                            </span>
                          </td>
                          <td className="p-5 font-medium text-primary-text">
                            {sub.name}
                            <span className="block text-micro font-mono text-muted-text font-normal">
                              {sub.timezone}
                            </span>
                          </td>
                          <td className="p-5">
                            <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-micro font-mono font-bold bg-charcoal-base/60 border border-hairline text-primary-text">
                              {sub.nextStep === "call" ? "Intro Call" : "Email Review"}
                            </span>
                          </td>
                          <td className="p-5 text-micro font-mono text-muted-text">
                            {new Date(sub.created_at).toLocaleString()}
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>
            )}
          </div>

          {/* Submission Details Drawer */}
          <div className="lg:col-span-4 bg-secondary-surface border border-brass-accent/20 p-8 rounded-[2rem] shadow-md backdrop-blur-md flex flex-col gap-6 relative overflow-hidden">
            <div className="absolute -top-12 -right-12 w-24 h-24 bg-accent-blue-light/15 rounded-full blur-2xl pointer-events-none" />

            <div className="border-b border-hairline pb-4 flex justify-between items-center">
              <h3 className="text-body-base font-bold text-primary-text font-display">
                Row Details
              </h3>
              {selectedSubmission && (
                <span className="text-micro font-mono text-brass-accent font-bold">
                  ID: #{selectedSubmission.id}
                </span>
              )}
            </div>

            {selectedSubmission ? (
              <div className="flex flex-col gap-5 text-[0.9rem] leading-relaxed">
                <div>
                  <span className="block text-micro font-mono text-muted-text uppercase tracking-widest font-bold mb-1">Company / Operator</span>
                  <span className="font-bold text-primary-text text-[1.1rem]">{selectedSubmission.company}</span>
                  <span className="block text-muted-text">{selectedSubmission.name} &mdash; {selectedSubmission.role}</span>
                </div>

                <div className="grid grid-cols-2 gap-4 border-t border-hairline/45 pt-4">
                  <div>
                    <span className="block text-micro font-mono text-muted-text uppercase tracking-widest font-bold mb-1">Inquiry Type</span>
                    <span className={`inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-micro font-mono font-bold border ${getTypeBadge(selectedSubmission.submissionType || "general")}`}>
                      {getTypeText(selectedSubmission.submissionType || "general")}
                    </span>
                  </div>
                  <div>
                    <span className="block text-micro font-mono text-muted-text uppercase tracking-widest font-bold mb-1">Timezone</span>
                    <span className="font-semibold text-primary-text">{selectedSubmission.timezone}</span>
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-4 border-t border-hairline/45 pt-4">
                  <div>
                    <span className="block text-micro font-mono text-muted-text uppercase tracking-widest font-bold mb-1 font-bold">Preferred Next Step</span>
                    <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-micro font-mono font-bold bg-charcoal-base/60 border border-hairline text-primary-text">
                      {selectedSubmission.nextStep === "call" ? "Intro Call" : "Email Review"}
                    </span>
                  </div>
                  <div>
                    <span className="block text-micro font-mono text-muted-text uppercase tracking-widest font-bold mb-1">Team Size</span>
                    <span className="font-semibold text-primary-text">{selectedSubmission.teamSize} people</span>
                  </div>
                </div>

                <div className="border-t border-hairline/45 pt-4">
                  <span className="block text-micro font-mono text-muted-text uppercase tracking-widest font-bold mb-1">Current Tools & Software</span>
                  <span className="font-semibold text-primary-text">
                    {selectedSubmission.solvedBefore || "Not specified"}
                  </span>
                </div>

                <div className="border-t border-hairline/45 pt-4">
                  <span className="block text-micro font-mono text-muted-text uppercase tracking-widest font-bold mb-1">Expected Change / Impact</span>
                  <span className="font-semibold text-brass-accent">
                    {selectedSubmission.changeImpact || "Not specified"}
                  </span>
                </div>

                <div className="border-t border-hairline/45 pt-4">
                  <span className="block text-micro font-mono text-muted-text uppercase tracking-widest font-bold mb-1">Operational Headache</span>
                  <p className="bg-charcoal-base/60 p-4 rounded-xl border border-hairline text-muted-text italic font-medium whitespace-pre-wrap">
                    &ldquo;{selectedSubmission.headache}&rdquo;
                  </p>
                </div>
              </div>
            ) : (
              <div className="text-center py-16 text-muted-text font-mono text-[0.85rem]">
                Select a submission row from the list to preview SQLite column data fields.
              </div>
            )}
          </div>

        </div>

      </main>

      <Footer />
    </div>
  );
}
