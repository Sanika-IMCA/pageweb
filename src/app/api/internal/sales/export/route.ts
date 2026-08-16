import { NextResponse } from "next/server";
import { db } from "@/lib/db";

// Helper to check authentication
function checkAuth(req: Request) {
  const cookieHeader = req.headers.get("cookie") || "";
  return cookieHeader.includes("sales_session=authenticated-session-token-valid-2026");
}

function escapeCSV(val: unknown): string {
  if (val === null || val === undefined) return "";
  let str = String(val);
  if (str.includes(",") || str.includes('"') || str.includes("\n") || str.includes("\r")) {
    str = '"' + str.replace(/"/g, '""') + '"';
  }
  return str;
}

export async function GET(req: Request) {
  if (!checkAuth(req)) {
    return new Response("Unauthorized", { status: 401 });
  }

  try {
    const prospects = db.prepare(`SELECT * FROM prospects ORDER BY id ASC`).all() as Record<string, unknown>[];

    const headers = [
      "company", "website", "industry", "location", "employee_range",
      "decision_maker", "decision_maker_role", "email", "linkedin",
      "source", "campaign", "problem_hypothesis", "pipeline_stage",
      "priority", "notes"
    ];

    const csvLines = [headers.join(",")];

    prospects.forEach((p) => {
      const row = [
        escapeCSV(p.company),
        escapeCSV(p.website),
        escapeCSV(p.industry),
        escapeCSV(p.location),
        escapeCSV(p.employee_range),
        escapeCSV(p.decision_maker),
        escapeCSV(p.decision_maker_role),
        escapeCSV(p.email),
        escapeCSV(p.linkedin),
        escapeCSV(p.source),
        escapeCSV(p.campaign),
        escapeCSV(p.problem_hypothesis),
        escapeCSV(p.pipeline_stage),
        escapeCSV(p.priority),
        escapeCSV(p.notes)
      ];
      csvLines.push(row.join(","));
    });

    const csvContent = csvLines.join("\n");

    return new Response(csvContent, {
      headers: {
        "Content-Type": "text/csv; charset=utf-8",
        "Content-Disposition": `attachment; filename="sayagaa_prospects_export_${new Date().toISOString().split("T")[0]}.csv"`
      }
    });
  } catch (err: unknown) {
    const errorMsg = err instanceof Error ? err.message : "Unknown error";
    return new Response(`Error: ${errorMsg}`, { status: 500 });
  }
}
