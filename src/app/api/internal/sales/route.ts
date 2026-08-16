import { NextResponse } from "next/server";
import { db } from "@/lib/db";

// Helper to check authentication
function checkAuth(req: Request) {
  const cookieHeader = req.headers.get("cookie") || "";
  return cookieHeader.includes("sales_session=authenticated-session-token-valid-2026");
}

// Helper to extract domain from website
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

export async function GET(req: Request) {
  if (!checkAuth(req)) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  try {
    const { searchParams } = new URL(req.url);
    const search = searchParams.get("search") || "";
    const priority = searchParams.get("priority") || "";
    const stage = searchParams.get("stage") || "";
    const pattern = searchParams.get("pattern") || "";
    const source = searchParams.get("source") || "";
    const campaign = searchParams.get("campaign") || "";

    let query = `SELECT * FROM prospects WHERE 1=1`;
    const params: unknown[] = [];

    if (search) {
      query += ` AND (company LIKE ? OR decision_maker LIKE ? OR email LIKE ? OR industry LIKE ? OR notes LIKE ?)`;
      const likeVal = `%${search}%`;
      params.push(likeVal, likeVal, likeVal, likeVal, likeVal);
    }
    if (priority) {
      query += ` AND priority = ?`;
      params.push(priority);
    }
    if (stage) {
      query += ` AND pipeline_stage = ?`;
      params.push(stage);
    }
    if (pattern) {
      query += ` AND operational_pattern = ?`;
      params.push(pattern);
    }
    if (source) {
      query += ` AND source = ?`;
      params.push(source);
    }
    if (campaign) {
      query += ` AND campaign = ?`;
      params.push(campaign);
    }

    query += ` ORDER BY priority ASC, company ASC`;
    const stmt = db.prepare(query);
    const prospects = stmt.all(...params);

    return NextResponse.json(prospects);
  } catch (err: unknown) {
    const errorMsg = err instanceof Error ? err.message : "Unknown error";
    return NextResponse.json({ error: errorMsg }, { status: 500 });
  }
}

export async function POST(req: Request) {
  if (!checkAuth(req)) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  try {
    const body = await req.json();
    const {
      company, website, industry, location, employeeRange,
      companyDescription, problemHypothesis, operationalPattern,
      decisionMaker, decisionMakerRole, decisionMakerLink, email,
      linkedin, source, campaign, pipelineStage, owner, priority,
      nextFollowUp, notes
    } = body;

    if (!company) {
      return NextResponse.json({ error: "Company name is required" }, { status: 400 });
    }

    const domainVal = getDomain(website);

    // Duplicate Check: Prevents inserting the same company domain, email, or LinkedIn URL
    let duplicateQuery = `SELECT id, company FROM prospects WHERE 1=2`;
    const dupParams: string[] = [];

    if (domainVal) {
      duplicateQuery += ` OR (domain IS NOT NULL AND domain = ?)`;
      dupParams.push(domainVal);
    }
    if (email) {
      duplicateQuery += ` OR (email IS NOT NULL AND email = ?)`;
      dupParams.push(email);
    }
    if (linkedin) {
      duplicateQuery += ` OR (linkedin IS NOT NULL AND linkedin = ?)`;
      dupParams.push(linkedin);
    }

    if (dupParams.length > 0) {
      const dupCheck = db.prepare(duplicateQuery).get(...dupParams) as { company: string } | undefined;
      if (dupCheck) {
        return NextResponse.json({
          duplicate: true,
          company: dupCheck.company,
          message: `POSSIBLE DUPLICATE: Record already exists for company '${dupCheck.company}'`
        }, { status: 409 });
      }
    }

    const stmt = db.prepare(`
      INSERT INTO prospects (
        company, website, domain, industry, location, employee_range,
        company_description, problem_hypothesis, operational_pattern,
        decision_maker, decision_maker_role, decision_maker_link, email,
        linkedin, source, campaign, pipeline_stage, owner, priority,
        next_follow_up, notes
      ) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)
    `);

    const result = stmt.run(
      company, website || null, domainVal, industry || null, location || null, employeeRange || null,
      companyDescription || null, problemHypothesis || null, operationalPattern || null,
      decisionMaker || null, decisionMakerRole || null, decisionMakerLink || null, email || null,
      linkedin || null, source || null, campaign || null, pipelineStage || '01_RESEARCH', owner || null, priority || 'B',
      nextFollowUp || null, notes || null
    );

    // Create Initial activity log
    db.prepare(`INSERT INTO sales_activities (prospect_id, event, notes) VALUES (?, ?, ?)`).run(
      result.lastInsertRowid,
      "Prospect added",
      `Added to pipeline stage: ${pipelineStage || 'RESEARCH'}`
    );

    return NextResponse.json({ id: result.lastInsertRowid, success: true });
  } catch (err: unknown) {
    const errorMsg = err instanceof Error ? err.message : "Unknown error";
    return NextResponse.json({ error: errorMsg }, { status: 500 });
  }
}

export async function PUT(req: Request) {
  if (!checkAuth(req)) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  try {
    const body = await req.json();
    const { id, pipelineStage, priority, notes, nextFollowUp } = body;

    if (!id) {
      return NextResponse.json({ error: "Prospect ID is required" }, { status: 400 });
    }

    const currentRecord = db.prepare(`SELECT * FROM prospects WHERE id = ?`).get(id) as Record<string, unknown> | undefined;
    if (!currentRecord) {
      return NextResponse.json({ error: "Prospect record not found" }, { status: 404 });
    }

    // STATE TRANSITION VALIDATION RULES (Section 28)
    if (pipelineStage && pipelineStage !== currentRecord.pipeline_stage) {
      // Rule A: Cannot go to AUDIT ACTIVE without an audit record in sales_audits
      if (pipelineStage === "07_AUDIT_ACTIVE") {
        const auditCount = db.prepare(`SELECT COUNT(*) as count FROM sales_audits WHERE prospect_id = ?`).get(id) as { count: number } | undefined;
        if (!auditCount || auditCount.count === 0) {
          return NextResponse.json({
            error: "State transition failed: A prospect cannot become 'AUDIT ACTIVE' without an audit record setup."
          }, { status: 422 });
        }
      }

      // Rule B: Cannot go to WON without a corresponding deal/proposal record marked as WON
      if (pipelineStage === "10_WON") {
        const wonProposals = db.prepare(`SELECT COUNT(*) as count FROM sales_proposals WHERE prospect_id = ? AND status = 'WON'`).get(id) as { count: number } | undefined;
        if (!wonProposals || wonProposals.count === 0) {
          return NextResponse.json({
            error: "State transition failed: A prospect cannot become 'WON' without an approved WON deal implementation proposal record."
          }, { status: 422 });
        }
      }
    }

    // Prepare update parameters
    const updates: string[] = [];
    const params: unknown[] = [];

    if (pipelineStage !== undefined) {
      updates.push("pipeline_stage = ?");
      params.push(pipelineStage);
    }
    if (priority !== undefined) {
      updates.push("priority = ?");
      params.push(priority);
    }
    if (notes !== undefined) {
      updates.push("notes = ?");
      params.push(notes);
    }
    if (nextFollowUp !== undefined) {
      updates.push("next_follow_up = ?");
      params.push(nextFollowUp || null);
    }

    if (updates.length > 0) {
      updates.push("updated_at = CURRENT_TIMESTAMP");
      const query = `UPDATE prospects SET ${updates.join(", ")} WHERE id = ?`;
      params.push(id);
      db.prepare(query).run(...params);

      // Log transition activity if stage changed
      if (pipelineStage && pipelineStage !== currentRecord.pipeline_stage) {
        db.prepare(`INSERT INTO sales_activities (prospect_id, event, notes) VALUES (?, ?, ?)`).run(
          id,
          `Stage changed to ${pipelineStage.replace(/^\d+_/gi, "").replace(/_/gi, " ")}`,
          `Moved from stage code: ${currentRecord.pipeline_stage}`
        );
      }
    }

    return NextResponse.json({ success: true });
  } catch (err: unknown) {
    const errorMsg = err instanceof Error ? err.message : "Unknown error";
    return NextResponse.json({ error: errorMsg }, { status: 500 });
  }
}
