import { NextResponse } from "next/server";
import { dbService } from "@/lib/db";
import { sendScopingEmail } from "@/lib/mailer";

export async function POST(request: Request) {
  try {
    const body = await request.json();
    
    // Server-side validation
    const { name, role, company, timezone, teamSize, solvedBefore, headache, nextStep, submissionType, changeImpact } = body;
    if (!name || !role || !company || !timezone || !teamSize || !solvedBefore || !headache || !nextStep) {
      return NextResponse.json(
        { success: false, error: "All scoping fields are required." },
        { status: 400 }
      );
    }

    // Save to local SQLite database
    const newId = dbService.createSubmission({
      name,
      role,
      company,
      timezone,
      teamSize,
      solvedBefore,
      headache,
      nextStep,
      submissionType: submissionType || "general",
      changeImpact: changeImpact || "",
    });

    // Simulate Email Dispatch Notification in console
    console.log(`
============================================================
[SIMULATED DISPATCH TO: workwithsayagaa@gmail.com]
New Scoping Submission Received!
ID: ${newId}
Type: ${submissionType || "general"}
Name: ${name} (${role})
Company: ${company}
Location/Timezone: ${timezone}
Team Size: ${teamSize}
Prior Solved: ${solvedBefore}
Preferred Next Step: ${nextStep}
Change Impact: ${changeImpact || "Not specified"}
Operational Headache: 
"${headache}"
============================================================
    `);

    // Dispatch real email via SMTP if configured
    await sendScopingEmail({
      id: newId,
      name,
      role,
      company,
      timezone,
      teamSize,
      solvedBefore,
      headache,
      nextStep,
      submissionType: submissionType || "general",
      changeImpact: changeImpact || "",
    });

    return NextResponse.json({
      success: true,
      id: Number(newId),
      message: "Scoping query logged securely to the SQLite database.",
    });
  } catch (error) {
    console.error("Scoping submit error:", error);
    const errorMessage = error instanceof Error ? error.message : "Internal Server Error";
    return NextResponse.json(
      { success: false, error: errorMessage },
      { status: 500 }
    );
  }
}

export async function GET() {
  try {
    const list = dbService.getAllSubmissions();
    return NextResponse.json({ success: true, count: list.length, data: list });
  } catch (error) {
    console.error("Scoping fetch error:", error);
    return NextResponse.json(
      { success: false, error: "Failed to retrieve entries." },
      { status: 500 }
    );
  }
}
