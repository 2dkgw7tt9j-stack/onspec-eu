import { NextResponse } from "next/server";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

export async function POST(request: Request) {
  try {
    let report: unknown;
    try {
      report = await request.json();
    } catch {
      report = await request.text();
    }

    // Structured server-side security event logging
    console.warn(
      JSON.stringify({
        event: "csp_violation_reported",
        timestamp: new Date().toISOString(),
        report,
      })
    );

    return new Response(null, {
      status: 204,
      headers: {
        "Cache-Control": "private, no-store, max-age=0",
      },
    });
  } catch {
    return new Response(null, { status: 204 });
  }
}
