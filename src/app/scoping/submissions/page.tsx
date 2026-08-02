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
  created_at: string;
}

export default function SubmissionsPage() {
  const [submissions, setSubmissions] = useState<Submission[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedSubmission, setSelectedSubmission] = useState<Submission | null>(null);

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

  const deleteSubmission = async (id: number) => {
    if (!confirm(`Are you sure you want to delete submission #${id}?`)) return;
    try {
      const response = await fetch(`/api/contact?id=${id}`, {
        method: "DELETE",
      });
      const result = await response.json();
      if (response.ok && result.success) {
        setSelectedSubmission(null);
        fetchSubmissions();
      } else {
        alert(result.error || "Failed to delete submission.");
      }
    } catch (err) {
      alert("An error occurred while deleting.");
    }
  };

  const clearAllSubmissions = async () => {
    if (!confirm("Are you sure you want to delete ALL submissions from the database? This cannot be undone.")) return;
    try {
      const response = await fetch("/api/contact", {
        method: "DELETE",
      });
      const result = await response.json();
      if (response.ok && result.success) {
        setSelectedSubmission(null);
        fetchSubmissions();
      } else {
        alert(result.error || "Failed to clear database.");
      }
    } catch (err) {
      alert("An error occurred while clearing database.");
    }
  };

  const exportToCSV = () => {
    const headers = ["ID", "Company", "Name", "Role", "Timezone", "Team Size", "Solved Before", "Headache", "Next Step", "Submitted At"];
    const rows = submissions.map(sub => [
      sub.id,
      `"${sub.company.replace(/"/g, '""')}"`,
      `"${sub.name.replace(/"/g, '""')}"`,
      `"${sub.role.replace(/"/g, '""')}"`,
      `"${sub.timezone.replace(/"/g, '""')}"`,
      `"${sub.teamSize.replace(/"/g, '""')}"`,
      `"${sub.solvedBefore.replace(/"/g, '""')}"`,
      `"${sub.headache.replace(/"/g, '""')}"`,
      `"${sub.nextStep.replace(/"/g, '""')}"`,
      sub.created_at
    ]);
    const csvContent = "data:text/csv;charset=utf-8," 
      + [headers.join(","), ...rows.map(e => e.join(","))].join("\n");
    const encodedUri = encodeURI(csvContent);
    const link = document.createElement("a");
    link.setAttribute("href", encodedUri);
    link.setAttribute("download", "sayagaa_intake_submissions.csv");
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  useEffect(() => {
    fetchSubmissions();
  }, []);

  const filteredSubmissions = submissions.filter((sub) => {
    const text = `${sub.name} ${sub.company} ${sub.role} ${sub.headache}`.toLowerCase();
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

        {/* Control Row: Search & Actions */}
        <div className="w-full flex flex-col sm:flex-row items-center justify-between gap-4">
          <input
            type="text"
            placeholder="Filter database rows by name, company, headache keyword..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full sm:max-w-xl bg-white/40 border border-hairline/60 p-4 rounded-full text-[0.9rem] text-primary-text focus:outline-none focus:border-brass-accent focus:bg-white transition-all shadow-sm"
          />
          
          <div className="flex gap-3 w-full sm:w-auto">
            <button
              onClick={exportToCSV}
              disabled={submissions.length === 0}
              className="flex-1 sm:flex-none justify-center bg-white/60 hover:bg-white text-primary-text font-mono text-[0.8rem] font-bold py-3 px-6 rounded-full border border-hairline transition-colors flex items-center gap-2 cursor-pointer disabled:opacity-50 disabled:cursor-not-allowed"
            >
              <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="w-4 h-4">
                <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4M7 10l5 5 5-5M12 15V3"/>
              </svg>
              EXPORT CSV
            </button>
            <button
              onClick={clearAllSubmissions}
              disabled={submissions.length === 0}
              className="flex-1 sm:flex-none justify-center bg-red-500/10 hover:bg-red-500 hover:text-white text-red-500 font-mono text-[0.8rem] font-bold py-3 px-6 rounded-full border border-red-500/20 transition-colors flex items-center gap-2 cursor-pointer disabled:opacity-50 disabled:cursor-not-allowed"
            >
              <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="w-4 h-4">
                <path d="M3 6h18M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6m3 0V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2M10 11v6M14 11v6"/>
              </svg>
              CLEAR DATABASE
            </button>
          </div>
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
                    <span className="block text-micro font-mono text-muted-text uppercase tracking-widest font-bold mb-1">Timezone</span>
                    <span className="font-semibold text-primary-text">{selectedSubmission.timezone}</span>
                  </div>
                  <div>
                    <span className="block text-micro font-mono text-muted-text uppercase tracking-widest font-bold mb-1">Team Size</span>
                    <span className="font-semibold text-primary-text">{selectedSubmission.teamSize} people</span>
                  </div>
                </div>

                <div className="border-t border-hairline/45 pt-4">
                  <span className="block text-micro font-mono text-muted-text uppercase tracking-widest font-bold mb-1">Tried Solving Before?</span>
                  <span className="font-semibold text-primary-text capitalize">
                    {selectedSubmission.solvedBefore === "yes"
                      ? "Yes (Failed / Too Complex)"
                      : selectedSubmission.solvedBefore === "no"
                      ? "No (First Time)"
                      : "Not Sure / Temporary Custom Setup"}
                  </span>
                </div>

                <div className="border-t border-hairline/45 pt-4">
                  <span className="block text-micro font-mono text-muted-text uppercase tracking-widest font-bold mb-1">Operational Headache</span>
                  <p className="bg-charcoal-base/60 p-4 rounded-xl border border-hairline text-muted-text italic font-medium whitespace-pre-wrap">
                    &ldquo;{selectedSubmission.headache}&rdquo;
                  </p>
                </div>

                <button
                  onClick={() => deleteSubmission(selectedSubmission.id)}
                  className="mt-4 w-full bg-red-500/10 hover:bg-red-500 hover:text-white text-red-500 font-mono text-[0.8rem] font-bold py-3 px-6 rounded-full border border-red-500/20 transition-all flex items-center justify-center gap-2 cursor-pointer shadow-sm"
                >
                  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="w-4 h-4">
                    <path d="M3 6h18M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6m3 0V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2M10 11v6M14 11v6"/>
                  </svg>
                  DELETE ENTRY
                </button>
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
