import { NextResponse } from "next/server";

export async function POST(req: Request) {
  try {
    const { key } = await req.json();
    // Default fallback in development if process.env.INTERNAL_SALES_KEY is not set
    const systemKey = process.env.INTERNAL_SALES_KEY || "sayagaa-admin";
    
    if (key === systemKey) {
      const response = NextResponse.json({ success: true, message: "Access granted" });
      response.cookies.set("sales_session", "authenticated-session-token-valid-2026", {
        httpOnly: true,
        secure: process.env.NODE_ENV === "production",
        path: "/",
        maxAge: 60 * 60 * 24 * 7 // 7 days
      });
      return response;
    } else {
      return NextResponse.json({ success: false, message: "Invalid access token" }, { status: 401 });
    }
  } catch (err: unknown) {
    const errorMsg = err instanceof Error ? err.message : "Unknown error";
    return NextResponse.json({ error: errorMsg }, { status: 500 });
  }
}

export async function GET(req: Request) {
  const cookieHeader = req.headers.get("cookie") || "";
  const hasSession = cookieHeader.includes("sales_session=authenticated-session-token-valid-2026");
  return NextResponse.json({ authenticated: hasSession });
}
