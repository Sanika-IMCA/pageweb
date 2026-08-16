import nodemailer from "nodemailer";

export async function sendScopingEmail(data: {
  id: number | bigint;
  name: string;
  role: string;
  company: string;
  timezone: string;
  teamSize: string;
  solvedBefore: string;
  headache: string;
  nextStep: string;
  submissionType: string;
  changeImpact: string;
}) {
  const host = process.env.SMTP_HOST;
  const port = Number(process.env.SMTP_PORT) || 587;
  const user = process.env.SMTP_USER;
  const pass = process.env.SMTP_PASS;
  const to = process.env.SMTP_TO || "workwithsayagaa@gmail.com";

  if (!host || !user || !pass) {
    console.warn(`
============================================================
[SMTP EMAIL NOT SENT - NOT CONFIGURED]
To receive actual email notifications in your inbox,
please add the following variables to your .env.local file:

SMTP_HOST=your-smtp-host (e.g. smtp.gmail.com)
SMTP_PORT=587 (or 465)
SMTP_USER=your-email-address
SMTP_PASS=your-email-password (or app password)
SMTP_TO=workwithsayagaa@gmail.com
============================================================
    `);
    return false;
  }

  const transporter = nodemailer.createTransport({
    host,
    port,
    secure: port === 465, // true for port 465, false for other ports
    auth: {
      user,
      pass,
    },
  });

  const subject = `[Sayagaa Scoping Intake] New Submission from ${data.name} (${data.company})`;

  const text = `
New Scoping Submission Received!

Submission ID: ${data.id}
Inquiry Type: ${data.submissionType}
Name: ${data.name}
Role: ${data.role}
Company: ${data.company}
Location / Time Zone: ${data.timezone}
Approximate Team Size: ${data.teamSize} people
Current Tools: ${data.solvedBefore}
Expected Impact: ${data.changeImpact}
Preferred Next Step: ${data.nextStep === "call" ? "Short 20-min intro call" : "Review details via email first"}

Operational Headache:
"${data.headache}"

-----------------
This is an automated notification from your Sayagaa website contact API.
`;

  const html = `
    <div style="font-family: sans-serif; max-width: 600px; margin: 0 auto; padding: 20px; border: 1px solid #eaeaea; border-radius: 8px;">
      <h2 style="color: #1A365D; border-bottom: 2px solid #e2e8f0; padding-bottom: 10px; margin-top: 0;">New Scoping Submission Received</h2>
      <p style="font-size: 15px; color: #334155;">A new operational inquiry has been logged via the Sayagaa website intake form.</p>
      
      <table style="width: 100%; border-collapse: collapse; margin: 20px 0;">
        <tr style="background-color: #f8fafc;">
          <td style="padding: 10px; font-weight: bold; border: 1px solid #e2e8f0; width: 180px; font-size: 14px;">Submission ID</td>
          <td style="padding: 10px; border: 1px solid #e2e8f0; font-size: 14px;">${data.id}</td>
        </tr>
        <tr>
          <td style="padding: 10px; font-weight: bold; border: 1px solid #e2e8f0; font-size: 14px;">Inquiry Type</td>
          <td style="padding: 10px; border: 1px solid #e2e8f0; font-size: 14px; text-transform: uppercase; font-weight: bold; color: #b45309;">${data.submissionType}</td>
        </tr>
        <tr style="background-color: #f8fafc;">
          <td style="padding: 10px; font-weight: bold; border: 1px solid #e2e8f0; font-size: 14px;">Name</td>
          <td style="padding: 10px; border: 1px solid #e2e8f0; font-size: 14px;">${data.name} (${data.role})</td>
        </tr>
        <tr>
          <td style="padding: 10px; font-weight: bold; border: 1px solid #e2e8f0; font-size: 14px;">Company</td>
          <td style="padding: 10px; border: 1px solid #e2e8f0; font-size: 14px; font-weight: bold;">${data.company}</td>
        </tr>
        <tr style="background-color: #f8fafc;">
          <td style="padding: 10px; font-weight: bold; border: 1px solid #e2e8f0; font-size: 14px;">Location / Timezone</td>
          <td style="padding: 10px; border: 1px solid #e2e8f0; font-size: 14px;">${data.timezone}</td>
        </tr>
        <tr>
          <td style="padding: 10px; font-weight: bold; border: 1px solid #e2e8f0; font-size: 14px;">Team Size</td>
          <td style="padding: 10px; border: 1px solid #e2e8f0; font-size: 14px;">${data.teamSize} people</td>
        </tr>
        <tr style="background-color: #f8fafc;">
          <td style="padding: 10px; font-weight: bold; border: 1px solid #e2e8f0; font-size: 14px;">Current Tools</td>
          <td style="padding: 10px; border: 1px solid #e2e8f0; font-size: 14px;">${data.solvedBefore}</td>
        </tr>
        <tr>
          <td style="padding: 10px; font-weight: bold; border: 1px solid #e2e8f0; font-size: 14px;">Expected Change / Impact</td>
          <td style="padding: 10px; border: 1px solid #e2e8f0; font-size: 14px; color: #b45309; font-weight: bold;">${data.changeImpact}</td>
        </tr>
        <tr style="background-color: #f8fafc;">
          <td style="padding: 10px; font-weight: bold; border: 1px solid #e2e8f0; font-size: 14px;">Preferred Next Step</td>
          <td style="padding: 10px; border: 1px solid #e2e8f0; font-size: 14px;">${data.nextStep === "call" ? "Short 20-min intro call" : "Review details via email first"}</td>
        </tr>
      </table>

      <div style="background-color: #fef3c7; border: 1px solid #fde68a; padding: 15px; border-radius: 8px; margin-top: 20px;">
        <h4 style="margin-top: 0; color: #92400e; font-size: 13px; text-transform: uppercase; letter-spacing: 0.05em; margin-bottom: 8px;">Operational Headache / Bottleneck</h4>
        <p style="margin-bottom: 0; font-size: 14px; font-style: italic; color: #78350f; white-space: pre-wrap; margin-top: 0;">"${data.headache}"</p>
      </div>

      <div style="margin-top: 30px; border-top: 1px solid #e2e8f0; padding-top: 10px; font-size: 11px; color: #64748b; font-family: monospace;">
        This email was sent automatically from your Sayagaa contact system database pipeline.
      </div>
    </div>
  `;

  try {
    const info = await transporter.sendMail({
      from: `"${data.name} via Sayagaa" <${user}>`,
      to,
      subject,
      text,
      html,
    });
    console.log(`[SMTP EMAIL SENT SUCCESS] MessageId: ${info.messageId}`);
    return true;
  } catch (error) {
    console.error("[SMTP EMAIL SEND ERROR]:", error);
    return false;
  }
}
