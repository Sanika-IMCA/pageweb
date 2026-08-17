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

interface ResearchRecord {
  company: string;
  website: string | null;
  linkedin_url: string | null;
  country: string | null;
  decision_maker: string | null;
  campaign: string | null;
  priority: string;
  research_data: string;
}

export async function POST(req: Request) {
  if (!checkAuth(req)) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  try {
    const { id, force } = await req.json();

    if (!id) {
      return NextResponse.json({ error: "Research Queue ID is required" }, { status: 400 });
    }

    const researchRecord = db.prepare(`SELECT * FROM sales_research WHERE id = ?`).get(id) as ResearchRecord | undefined;
    if (!researchRecord) {
      return NextResponse.json({ error: "Research record not found" }, { status: 404 });
    }

    const data = JSON.parse(researchRecord.research_data);
    const domainVal = getDomain(researchRecord.website);

    // Duplicate Check: Look up existing company name, domain, or email (Section 20)
    if (!force) {
      let duplicateQuery = `SELECT id, company FROM prospects WHERE 1=2`;
      const dupParams: string[] = [];

      if (domainVal) {
        duplicateQuery += ` OR (domain IS NOT NULL AND domain = ?)`;
        dupParams.push(domainVal);
      }
      if (researchRecord.company) {
        duplicateQuery += ` OR company LIKE ?`;
        dupParams.push(`%${researchRecord.company}%`);
      }

      if (dupParams.length > 0) {
        const dupCheck = db.prepare(duplicateQuery).get(...dupParams) as { id: number; company: string } | undefined;
        if (dupCheck) {
          return NextResponse.json({
            duplicate: true,
            company: dupCheck.company,
            existingId: dupCheck.id,
            message: `EXISTING PROSPECT FOUND: '${dupCheck.company}' already exists in pipeline.`
          }, { status: 409 });
        }
      }
    }

    // Insert approved record directly into the sales pipeline (Section 19)
    const insertStmt = db.prepare(`
      INSERT INTO prospects (
        company, website, domain, industry, location, employee_range,
        company_description, problem_hypothesis, operational_pattern,
        decision_maker, decision_maker_role, email, linkedin, source, campaign,
        pipeline_stage, priority, notes
      ) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, '01_RESEARCH', ?, ?)
    `);

    const result = insertStmt.run(
      researchRecord.company,
      researchRecord.website || null,
      domainVal,
      data.profile.industry || null,
      researchRecord.country || null,
      data.profile.employeeRange || null,
      data.profile.companyDescription || null,
      data.frictionHypotheses[0]?.hypothesis || null,
      data.profile.industry === "LOGISTICS" ? "MANUAL HANDOFFS" : "DISCONNECTED TOOLS",
      researchRecord.decision_maker || null,
      "Decision Maker",
      null, // email
      researchRecord.linkedin_url || null,
      "RESEARCH ENGINE",
      researchRecord.campaign || null,
      researchRecord.priority || "B",
      data.emailDraft.body || null
    );

    // Create Initial activity timeline logs
    db.prepare(`INSERT INTO sales_activities (prospect_id, event, notes) VALUES (?, 'Prospect added', 'Created via approved research brief')`).run(result.lastInsertRowid);
    db.prepare(`INSERT INTO sales_activities (prospect_id, event, notes) VALUES (?, 'Research completed', 'Evidence-based brief generated')`).run(result.lastInsertRowid);

    // Update queue status
    db.prepare(`UPDATE sales_research SET status = 'APPROVED' WHERE id = ?`).run(id);

    return NextResponse.json({ id: result.lastInsertRowid, success: true });
  } catch (err: unknown) {
    const errorMsg = err instanceof Error ? err.message : "Unknown error";
    return NextResponse.json({ error: errorMsg }, { status: 500 });
  }
}
