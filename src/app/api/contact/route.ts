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

    // Real Email Dispatch using Resend if RESEND_API_KEY is configured
    const resendApiKey = process.env.RESEND_API_KEY;
    if (resendApiKey) {
      try {
        const emailResponse = await fetch("https://api.resend.com/emails", {
          method: "POST",
          headers: {
            "Authorization": `Bearer ${resendApiKey}`,
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            from: "Sayagaa Studios Scoping <onboarding@resend.dev>",
            to: "workwithsayagaa@gmail.com",
            subject: `[Scoping Intake] ${company} — ${name}`,
            html: `
              <div style="font-family: sans-serif; max-width: 600px; margin: 0 auto; padding: 20px; border: 1px solid #e2e8f0; rounded: 12px; background-color: #ffffff; color: #1a202c;">
                <h2 style="color: #2e5b94; border-bottom: 2px solid #e2e8f0; padding-bottom: 10px; margin-top: 0;">
                  New Scoping Intake Submission
                </h2>
                <table style="width: 100%; border-collapse: collapse; margin-top: 15px;">
                  <tr>
                    <td style="padding: 8px 0; font-weight: bold; width: 150px; color: #4a5568;">Name:</td>
                    <td style="padding: 8px 0; color: #1a202c;">${name}</td>
                  </tr>
                  <tr>
                    <td style="padding: 8px 0; font-weight: bold; color: #4a5568;">Role:</td>
                    <td style="padding: 8px 0; color: #1a202c;">${role}</td>
                  </tr>
                  <tr>
                    <td style="padding: 8px 0; font-weight: bold; color: #4a5568;">Company:</td>
                    <td style="padding: 8px 0; color: #1a202c;">${company}</td>
                  </tr>
                  <tr>
                    <td style="padding: 8px 0; font-weight: bold; color: #4a5568;">Time Zone:</td>
                    <td style="padding: 8px 0; color: #1a202c;">${timezone}</td>
                  </tr>
                  <tr>
                    <td style="padding: 8px 0; font-weight: bold; color: #4a5568;">Team Size:</td>
                    <td style="padding: 8px 0; color: #1a202c;">${teamSize}</td>
                  </tr>
                  <tr>
                    <td style="padding: 8px 0; font-weight: bold; color: #4a5568;">Prior Solve Try:</td>
                    <td style="padding: 8px 0; color: #1a202c;">${solvedBefore}</td>
                  </tr>
                  <tr>
                    <td style="padding: 8px 0; font-weight: bold; color: #4a5568;">Next Step:</td>
                    <td style="padding: 8px 0; color: #1a202c; font-weight: bold;">${nextStep}</td>
                  </tr>
                </table>
                <div style="margin-top: 20px; padding: 15px; background-color: #f7fafc; border-left: 4px solid #2e5b94; border-radius: 4px;">
                  <h4 style="margin: 0 0 8px 0; color: #2e5b94;">Operational Headache:</h4>
                  <p style="margin: 0; line-height: 1.5; color: #2d3748; white-space: pre-wrap;">${headache}</p>
                </div>
                <div style="margin-top: 25px; font-size: 0.8rem; color: #a0aec0; border-top: 1px solid #e2e8f0; padding-top: 10px;">
                  Database Row ID: #${newId} | Submitted on: ${new Date().toISOString()}
                </div>
              </div>
            `,
          }),
        });

        if (!emailResponse.ok) {
          const errData = await emailResponse.json();
          console.error("Resend API Error:", errData);
        } else {
          console.log(`[SUCCESS] Intake email notification dispatched successfully for submission #${newId}`);
        }
      } catch (emailErr) {
        console.error("Failed to dispatch Resend email:", emailErr);
      }
    } else {
      // Simulate Email Dispatch Notification in console if no API key is provided
      console.log(`
============================================================
[SIMULATED DISPATCH TO: workwithsayagaa@gmail.com]
(Provide RESEND_API_KEY env variable to enable real email sending)
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
    }

    return NextResponse.json({
      success: true,
      id: Number(newId),
      message: resendApiKey 
        ? "Scoping query logged securely to the SQLite database and email notification dispatched."
        : "Scoping query logged securely to the SQLite database (simulated dispatch).",
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

export async function DELETE(request: Request) {
  try {
    const { searchParams } = new URL(request.url);
    const id = searchParams.get("id");

    if (id) {
      dbService.deleteSubmission(Number(id));
      return NextResponse.json({ success: true, message: `Submission #${id} deleted.` });
    } else {
      dbService.clearAllSubmissions();
      return NextResponse.json({ success: true, message: "All submissions cleared." });
    }
  } catch (error: any) {
    console.error("Scoping delete error:", error);
    return NextResponse.json(
      { success: false, error: "Failed to delete entries." },
      { status: 500 }
    );
  }
}
