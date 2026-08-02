import { NextResponse } from "next/server";
import { dbService } from "@/lib/db";

export async function POST(request: Request) {
  try {
    const body = await request.json();
    
    // Server-side validation
    const { name, role, company, timezone, teamSize, solvedBefore, headache, nextStep } = body;
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
    });

    // Simulate Email Dispatch Notification in console
    console.log(`
============================================================
[SIMULATED DISPATCH TO: workwithsayagaa@gmail.com]
New Scoping Submission Received!
ID: ${newId}
Name: ${name} (${role})
Company: ${company}
Location/Timezone: ${timezone}
Team Size: ${teamSize}
Prior Solved: ${solvedBefore}
Preferred Next Step: ${nextStep}
Operational Headache: 
"${headache}"
============================================================
    `);

    return NextResponse.json({
      success: true,
      id: Number(newId),
      message: "Scoping query logged securely to the SQLite database.",
    });
  } catch (error: any) {
    console.error("Scoping submit error:", error);
    return NextResponse.json(
      { success: false, error: error?.message || "Internal Server Error" },
      { status: 500 }
    );
  }
}

export async function GET() {
  try {
    const list = dbService.getAllSubmissions();
    return NextResponse.json({ success: true, count: list.length, data: list });
  } catch (error: any) {
    console.error("Scoping fetch error:", error);
    return NextResponse.json(
      { success: false, error: "Failed to retrieve entries." },
      { status: 500 }
    );
  }
}
