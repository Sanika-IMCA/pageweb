import { NextResponse } from "next/server";
import { db } from "@/lib/db";

// Helper to check authentication
function checkAuth(req: Request) {
  const cookieHeader = req.headers.get("cookie") || "";
  return cookieHeader.includes("sales_session=authenticated-session-token-valid-2026");
}

function getDomain(urlStr: string | null): string | null {
  if (!urlStr) return null;
  let hostname = urlStr.trim().toLowerCase();
  if (hostname.startsWith("http://")) hostname = hostname.substring(7);
  if (hostname.startsWith("https://")) hostname = hostname.substring(8);
  if (hostname.startsWith("www.")) hostname = hostname.substring(4);
  const slashIdx = hostname.indexOf("/");
  if (slashIdx !== -1) hostname = hostname.substring(0, slashIdx);
  return hostname || null;
}

export async function POST(req: Request) {
  if (!checkAuth(req)) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  try {
    const { csvContent } = await req.json();

    if (!csvContent) {
      return NextResponse.json({ error: "CSV content is required" }, { status: 400 });
    }

    const lines = csvContent.split(/\r?\n/);
    if (lines.length < 2) {
      return NextResponse.json({ error: "Empty or invalid CSV file" }, { status: 400 });
    }

    // Split headers and trim lowercase
    const headers = lines[0].split(",").map((h: string) => h.trim().replace(/^["']|["']$/g, "").toLowerCase());
    
    let createdCount = 0;
    let duplicateCount = 0;
    const warnings: string[] = [];

    const insertStmt = db.prepare(`
      INSERT INTO prospects (
        company, website, domain, industry, location, employee_range,
        decision_maker, decision_maker_role, email, linkedin, source, campaign,
        problem_hypothesis, notes, pipeline_stage, priority
      ) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, '01_RESEARCH', 'B')
    `);

    const activityStmt = db.prepare(`
      INSERT INTO sales_activities (prospect_id, event, notes) VALUES (?, 'Prospect imported', ?)
    `);

    for (let i = 1; i < lines.length; i++) {
      const line = lines[i].trim();
      if (!line) continue;

      // Extract CSV cells accounting for nested quotes
      const cells: string[] = [];
      let currentCell = "";
      let inQuotes = false;
      for (let charIdx = 0; charIdx < line.length; charIdx++) {
        const char = line[charIdx];
        if (char === '"') {
          inQuotes = !inQuotes;
        } else if (char === ',' && !inQuotes) {
          cells.push(currentCell.trim().replace(/^["']|["']$/g, ""));
          currentCell = "";
        } else {
          currentCell += char;
        }
      }
      cells.push(currentCell.trim().replace(/^["']|["']$/g, ""));

      const row: Record<string, string> = {};
      headers.forEach((header: string, index: number) => {
        row[header] = cells[index] || "";
      });

      const company = row.company;
      if (!company) continue;

      const website = row.website || "";
      const email = row.email || "";
      const linkedin = row.linkedin || "";
      const domainVal = getDomain(website);

      // Duplicate Check
      let isDup = false;
      let dupQuery = `SELECT company FROM prospects WHERE 1=2`;
      const dupParams: string[] = [];

      if (domainVal) {
        dupQuery += ` OR (domain IS NOT NULL AND domain = ?)`;
        dupParams.push(domainVal);
      }
      if (email) {
        dupQuery += ` OR (email IS NOT NULL AND email = ?)`;
        dupParams.push(email);
      }
      if (linkedin) {
        dupQuery += ` OR (linkedin IS NOT NULL AND linkedin = ?)`;
        dupParams.push(linkedin);
      }

      if (dupParams.length > 0) {
        const check = db.prepare(dupQuery).get(...dupParams) as { company: string } | undefined;
        if (check) {
          isDup = true;
          duplicateCount++;
          warnings.push(`Duplicate skipped: '${company}' shares domain/contact fields with existing '${check.company}'`);
        }
      }

      if (!isDup) {
        const result = insertStmt.run(
          company,
          website || null,
          domainVal,
          row.industry || null,
          row.location || null,
          row.employee_range || null,
          row.decision_maker || null,
          row.role || null,
          email || null,
          linkedin || null,
          row.source || "CSV_IMPORT",
          row.campaign || null,
          row.problem_hypothesis || null,
          row.notes || null
        );

        activityStmt.run(result.lastInsertRowid, `Imported via CSV file. Campaign: ${row.campaign || "none"}`);
        createdCount++;
      }
    }

    return NextResponse.json({
      success: true,
      createdCount,
      duplicateCount,
      warnings
    });
  } catch (err: unknown) {
    const errorMsg = err instanceof Error ? err.message : "Unknown error";
    return NextResponse.json({ error: errorMsg }, { status: 500 });
  }
}
