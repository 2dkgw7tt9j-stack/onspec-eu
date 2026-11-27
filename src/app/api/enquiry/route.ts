import { NextResponse } from "next/server";
import { clientIpFromHeaders, normalizeIdentifier } from "@/lib/request-identity";
import { checkRateLimit, rateLimitRules } from "@/lib/rate-limit";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

// Basic input sanitization helper
function sanitizeString(str: unknown, maxLength: number): string {
  if (typeof str !== "string") return "";
  return str.trim().slice(0, maxLength).replace(/[\u0000-\u0008\u000B-\u000C\u000E-\u001F]/g, "");
}

function isValidEmail(email: string): boolean {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email) && email.length <= 254;
}

export async function POST(request: Request) {
  try {
    const ip = clientIpFromHeaders(request.headers);

    // 1. IP-level rate limiting
    const ipLimit = await checkRateLimit(rateLimitRules.enquiryIp, [ip]);
    if (!ipLimit.success) {
      return NextResponse.json(
        { error: "Too many requests. Please wait a few moments before trying again." },
        {
          status: 429,
          headers: {
            "Retry-After": String(Math.max(1, ipLimit.reset - Math.ceil(Date.now() / 1000))),
            "Cache-Control": "private, no-store, max-age=0",
          },
        }
      );
    }

    let body: Record<string, unknown>;
    try {
      body = await request.json();
    } catch {
      return NextResponse.json(
        { error: "Invalid JSON payload." },
        { status: 400, headers: { "Cache-Control": "private, no-store, max-age=0" } }
      );
    }

    // 2. Validate and sanitize inputs
    const name = sanitizeString(body.name, 120);
    const email = sanitizeString(body.email, 254);
    const phone = sanitizeString(body.phone || body.whatsapp, 50);
    const companyName = sanitizeString(body.companyName, 150);
    const websiteUrl = sanitizeString(body.websiteUrl, 250);
    const pillar = sanitizeString(body.pillar, 50) || "GENERAL";
    const message = sanitizeString(
      body.message || body.ideaDescription || body.goals,
      4000
    );

    if (!name || name.length < 2) {
      return NextResponse.json(
        { error: "Please provide a valid name." },
        { status: 400, headers: { "Cache-Control": "private, no-store, max-age=0" } }
      );
    }

    if (!isValidEmail(email)) {
      return NextResponse.json(
        { error: "Please provide a valid email address." },
        { status: 400, headers: { "Cache-Control": "private, no-store, max-age=0" } }
      );
    }

    // 3. Email-level rate limiting
    const emailLimit = await checkRateLimit(rateLimitRules.enquiryEmail, [
      normalizeIdentifier(email),
    ]);
    if (!emailLimit.success) {
      return NextResponse.json(
        { error: "Too many submissions for this email address. Please wait a few moments." },
        {
          status: 429,
          headers: {
            "Retry-After": String(Math.max(1, emailLimit.reset - Math.ceil(Date.now() / 1000))),
            "Cache-Control": "private, no-store, max-age=0",
          },
        }
      );
    }

    // 4. Generate audit reference ID
    const randomSuffix = Math.random().toString(36).substring(2, 6).toUpperCase();
    const datePart = new Date().toISOString().slice(2, 10).replace(/-/g, "");
    const prefix = pillar.includes("LAUNCH")
      ? "OSP-LCH"
      : pillar.includes("AUTOMATE")
      ? "OSP-AUT"
      : pillar.includes("INNOVATE")
      ? "OSP-INV"
      : pillar.includes("CONNECT")
      ? "OSP-LEG"
      : "OSP-GEN";

    const referenceId = `${prefix}-${datePart}-${randomSuffix}`;
    const timestamp = new Date().toISOString();

    // Log structured security audit event (without sensitive secrets)
    console.log(
      JSON.stringify({
        event: "enquiry_received",
        referenceId,
        pillar,
        hasPhone: Boolean(phone),
        hasCompany: Boolean(companyName),
        hasWebsite: Boolean(websiteUrl),
        timestamp,
      })
    );

    return NextResponse.json(
      {
        ok: true,
        referenceId,
        timestamp,
        provider: "onspec-secure-edge",
        summary: `Enquiry logged (${referenceId}). Ready for Onspec executive review & preliminary proposal.`,
      },
      {
        status: 200,
        headers: {
          "Cache-Control": "private, no-store, max-age=0",
        },
      }
    );
  } catch (err) {
    console.error("Enquiry submission error:", err);
    return NextResponse.json(
      { error: "An unexpected error occurred while processing your request." },
      { status: 500, headers: { "Cache-Control": "private, no-store, max-age=0" } }
    );
  }
}
