import { NextResponse } from "next/server";
import { db } from "@/lib/db";

// Helper to check authentication
function checkAuth(req: Request) {
  const cookieHeader = req.headers.get("cookie") || "";
  return cookieHeader.includes("sales_session=authenticated-session-token-valid-2026");
}

export async function GET(req: Request) {
  if (!checkAuth(req)) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  try {
    const { searchParams } = new URL(req.url);
    const prospectId = searchParams.get("prospectId");

    if (!prospectId) {
      return NextResponse.json({ error: "Prospect ID is required" }, { status: 400 });
    }

    const activities = db.prepare(`SELECT * FROM sales_activities WHERE prospect_id = ? ORDER BY id DESC`).all(prospectId);
    const outreach = db.prepare(`SELECT * FROM sales_outreach WHERE prospect_id = ? ORDER BY id DESC`).all(prospectId);
    const audits = db.prepare(`SELECT * FROM sales_audits WHERE prospect_id = ? ORDER BY id DESC`).all(prospectId);
    const proposals = db.prepare(`SELECT * FROM sales_proposals WHERE prospect_id = ? ORDER BY id DESC`).all(prospectId);

    return NextResponse.json({
      activities,
      outreach,
      audits,
      proposals
    });
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
    const { type, prospectId, data } = body;

    if (!prospectId || !type) {
      return NextResponse.json({ error: "Prospect ID and detail type are required" }, { status: 400 });
    }

    if (type === "activity") {
      const { event, notes } = data;
      db.prepare(`INSERT INTO sales_activities (prospect_id, event, notes) VALUES (?, ?, ?)`).run(
        prospectId,
        event,
        notes || null
      );
    } else if (type === "outreach") {
      const { channel, message, status } = data;
      db.prepare(`INSERT INTO sales_outreach (prospect_id, channel, message, status) VALUES (?, ?, ?, ?)`).run(
        prospectId,
        channel,
        message || null,
        status || "DRAFT"
      );
      // Update last contacted timestamp on parent prospect
      db.prepare(`UPDATE prospects SET last_contacted = CURRENT_TIMESTAMP WHERE id = ?`).run(prospectId);
      db.prepare(`INSERT INTO sales_activities (prospect_id, event, notes) VALUES (?, ?, ?)`).run(
        prospectId,
        "Outreach Logged",
        `${channel} - Status: ${status}`
      );
    } else if (type === "audit") {
      const { problem, expectedOutput, startDate, targetEndDate, status, fee, paymentStatus, deliverables } = data;
      db.prepare(`
        INSERT INTO sales_audits (
          prospect_id, problem, expected_output, start_date, target_end_date, status, fee, payment_status, deliverables
        ) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?)
      `).run(
        prospectId, problem || null, expectedOutput || null, startDate || null, targetEndDate || null,
        status || "PROPOSED", fee || 0, paymentStatus || null, deliverables || null
      );
      db.prepare(`INSERT INTO sales_activities (prospect_id, event, notes) VALUES (?, ?, ?)`).run(
        prospectId,
        "Audit Record Added",
        `Scope: ${problem?.substring(0, 40) || "Proposed"} - Fee: $${fee || 0}`
      );
    } else if (type === "proposal") {
      const { projectName, scope, systemsToBuild, integrations, milestones, estimatedTimeline, projectValue, status } = data;
      db.prepare(`
        INSERT INTO sales_proposals (
          prospect_id, project_name, scope, systems_to_build, integrations, milestones, estimated_timeline, project_value, status
        ) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?)
      `).run(
        prospectId, projectName || null, scope || null, systemsToBuild || null, integrations || null,
        milestones || null, estimatedTimeline || null, projectValue || 0, status || "PROPOSED"
      );
      
      db.prepare(`INSERT INTO sales_activities (prospect_id, event, notes) VALUES (?, ?, ?)`).run(
        prospectId,
        "Proposal Added",
        `Deal Name: ${projectName} - Value: $${projectValue || 0} - Status: ${status}`
      );

      // If proposal is marked WON, update the parent pipeline stage automatically if Won
      if (status === "WON") {
        db.prepare(`UPDATE prospects SET pipeline_stage = '10_WON' WHERE id = ?`).run(prospectId);
        db.prepare(`INSERT INTO sales_activities (prospect_id, event, notes) VALUES (?, ?, ?)`).run(
          prospectId,
          "Stage changed to WON",
          "Automated transition from proposal approval"
        );
      }
    } else {
      return NextResponse.json({ error: "Invalid detail type" }, { status: 400 });
    }

    return NextResponse.json({ success: true });
  } catch (err: unknown) {
    const errorMsg = err instanceof Error ? err.message : "Unknown error";
    return NextResponse.json({ error: errorMsg }, { status: 500 });
  }
}
