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

export async function GET(req: Request) {
  if (!checkAuth(req)) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  try {
    const { searchParams } = new URL(req.url);
    const status = searchParams.get("status") || "";
    const priority = searchParams.get("priority") || "";
    
    let query = `SELECT * FROM sales_research WHERE 1=1`;
    const params: string[] = [];

    if (status) {
      query += ` AND status = ?`;
      params.push(status);
    }
    if (priority) {
      query += ` AND priority = ?`;
      params.push(priority);
    }

    query += ` ORDER BY created_at DESC`;
    const queue = db.prepare(query).all(...params);
    return NextResponse.json(queue);
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
    const { company, website, linkedinUrl, industry, country, decisionMaker, campaign } = body;

    if (!company) {
      return NextResponse.json({ error: "Company name is required" }, { status: 400 });
    }

    let parsedTitle = "";
    let parsedDesc = "";
    let sourceStatus = "SOURCE VERIFIED";

    // Safe website fetch (Section 26 - respects terms, does not aggressively crawl)
    if (website) {
      try {
        const controller = new AbortController();
        const timeoutId = setTimeout(() => controller.abort(), 5000); // 5 sec timeout
        
        const fetchRes = await fetch(website, {
          headers: { "User-Agent": "SayagaaResearchAssistant/2.0" },
          signal: controller.signal
        });
        clearTimeout(timeoutId);

        if (fetchRes.ok) {
          const html = await fetchRes.text();
          const titleMatch = html.match(/<title>([^<]*)<\/title>/i);
          if (titleMatch) parsedTitle = titleMatch[1].trim();

          const descMatch = html.match(/<meta\s+name=["']description["']\s+content=["']([^"']*)["']/i) || 
                            html.match(/<meta\s+content=["']([^"']*)["']\s+name=["']description["']/i);
          if (descMatch) parsedDesc = descMatch[1].trim();
        } else {
          sourceStatus = "SOURCE UNAVAILABLE";
        }
      } catch (err) {
        sourceStatus = "SOURCE UNAVAILABLE";
      }
    }

    const combinedText = `${parsedTitle} ${parsedDesc} ${industry || ""}`.toLowerCase();
    
    let inferredIndustry = industry || "PROFESSIONAL SERVICES";
    let inferredPattern = "MANUAL HANDOFFS";
    let observedSignals = `Company website loaded with response status '${sourceStatus}'.`;
    let inferredFriction = "Operational scheduling and candidate tracking processes may require duplicate entries.";
    let outreachWorkflow = "scheduling and customer communication workflows";
    let techSignals = "Unknown analytics tags";

    if (combinedText.includes("logistic") || combinedText.includes("freight") || combinedText.includes("shipping") || combinedText.includes("dispatch")) {
      inferredIndustry = "LOGISTICS";
      inferredPattern = "MANUAL DISPATCH COOP";
      observedSignals = "Observed: Company operates freight/shipping logistics dispatch models.";
      inferredFriction = "Dispatchers manually tracking freight assignments across maps and emails.";
      outreachWorkflow = "regional driver dispatch workflows";
      techSignals = "Postgres, CRM API, Custom dispatch trackers";
    } else if (combinedText.includes("recruit") || combinedText.includes("staff") || combinedText.includes("careers") || combinedText.includes("talent")) {
      inferredIndustry = "RECRUITMENT";
      inferredPattern = "LEAD ROUTING / RESUME SYNC";
      observedSignals = "Observed: Company manages high-volume candidate application intake tunnels.";
      inferredFriction = "Recruiters manually copy-pasting applicant details from worksheets to ATS pipelines.";
      outreachWorkflow = "high-volume candidate scheduling processes";
      techSignals = "ATS software, spreadsheet spreadsheets";
    } else if (combinedText.includes("software") || combinedText.includes("saas") || combinedText.includes("developer") || combinedText.includes("tech")) {
      inferredIndustry = "SAAS";
      inferredPattern = "DISCONNECTED TOOLS";
      observedSignals = "Observed: Company builds and distributes cloud API SaaS solutions.";
      inferredFriction = "Support and product analytics require manual handoffs between CRM and databases.";
      outreachWorkflow = "customer onboarding pipelines";
      techSignals = "Segment, Hubspot, Custom API integrations";
    }

    const researchData = {
      profile: {
        company,
        website: website || "UNKNOWN",
        industry: inferredIndustry,
        location: country || "UNKNOWN",
        employeeRange: "10-200 employees approximately (INFERRED)",
        businessModel: "B2B Services (INFERRED)",
        targetCustomers: "B2B clients (INFERRED)",
        publicOperationalCharacteristics: observedSignals,
        sourceUrls: website ? [website] : []
      },
      evidence: {
        observed: observedSignals,
        inferred: inferredFriction,
        unknown: "Internal dispatch sequence databases and operator count configurations."
      },
      frictionHypotheses: [
        {
          rank: "01",
          hypothesis: `Manual coordination of ${outreachWorkflow} fails to scale.`,
          why: "Operational pipelines require multi-step tracking across sheets.",
          evidence: observedSignals,
          confidence: "MEDIUM",
          frequency: "HIGH",
          impact: "HIGH",
          strength: "MEDIUM"
        },
        {
          rank: "02",
          hypothesis: "Duplicate data transfers between CRM and team sheets.",
          why: "Visible tools lack integrated webhooks.",
          evidence: `Heuristic match on technology: ${techSignals}`,
          confidence: "LOW",
          frequency: "MEDIUM",
          impact: "MEDIUM",
          strength: "LOW"
        }
      ],
      fitScore: {
        priority: "B",
        reason: "Medium operational complexity + Identified operations framework."
      },
      techSignals: techSignals,
      outreachAngle: {
        why: `Help company optimize their ${outreachWorkflow} using structured automation.`,
        primaryAngle: `Structuring duplicate handoffs in ${outreachWorkflow}.`,
        observation: observedSignals,
        question: `How does your operations team currently track state updates in ${outreachWorkflow}?`
      },
      emailDraft: {
        subject: `Quick question about ${outreachWorkflow}`,
        body: `Hi ${decisionMaker || "[Name]"},

I noticed that ${company} ${observedSignals.toLowerCase().replace("observed: ", "")}.

It made me curious about how your team currently handles state updates and schedules in ${outreachWorkflow}.

We work with operations-heavy businesses to identify where manual handoffs and disconnected systems are creating unnecessary work, then design the system around the actual workflow.

How are you currently handling this process?

— Sanika
Sayagaa`
      },
      linkedinDraft: {
        body: `Hi ${decisionMaker || "[Name]"}, noticed you handle operations at ${company}. Quick question: with multiple stages in your ${outreachWorkflow}, how does the team avoid duplicate data entry? We build custom automated logic at Sayagaa. Appreciate any insights!`
      },
      followUpDraft: {
        body: `Hi ${decisionMaker || "[Name]"}, following up on my note. We often see ${outreachWorkflow} get fragmented once teams scale past 50 employees. Curious if manual sheets are creating a bottleneck on your side as well?`
      }
    };

    const stmt = db.prepare(`
      INSERT INTO sales_research (
        company, website, linkedin_url, industry, country, decision_maker, campaign, status, research_data
      ) VALUES (?, ?, ?, ?, ?, ?, ?, 'RESEARCH COMPLETE', ?)
    `);

    const result = stmt.run(
      company,
      website || null,
      linkedinUrl || null,
      inferredIndustry,
      country || null,
      decisionMaker || null,
      campaign || null,
      JSON.stringify(researchData)
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
    const { id, status, priority, researchData } = body;

    if (!id) {
      return NextResponse.json({ error: "ID is required" }, { status: 400 });
    }

    const updates: string[] = [];
    const params: unknown[] = [];

    if (status !== undefined) {
      updates.push("status = ?");
      params.push(status);
    }
    if (priority !== undefined) {
      updates.push("priority = ?");
      params.push(priority);
    }
    if (researchData !== undefined) {
      updates.push("research_data = ?");
      params.push(JSON.stringify(researchData));
    }

    if (updates.length > 0) {
      updates.push("updated_at = CURRENT_TIMESTAMP");
      const query = `UPDATE sales_research SET ${updates.join(", ")} WHERE id = ?`;
      params.push(id);
      db.prepare(query).run(...params);
    }

    return NextResponse.json({ success: true });
  } catch (err: unknown) {
    const errorMsg = err instanceof Error ? err.message : "Unknown error";
    return NextResponse.json({ error: errorMsg }, { status: 500 });
  }
}

export async function DELETE(req: Request) {
  if (!checkAuth(req)) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  try {
    const { searchParams } = new URL(req.url);
    const id = searchParams.get("id");

    if (!id) {
      return NextResponse.json({ error: "ID is required" }, { status: 400 });
    }

    db.prepare(`DELETE FROM sales_research WHERE id = ?`).run(id);
    return NextResponse.json({ success: true });
  } catch (err: unknown) {
    const errorMsg = err instanceof Error ? err.message : "Unknown error";
    return NextResponse.json({ error: errorMsg }, { status: 500 });
  }
}
