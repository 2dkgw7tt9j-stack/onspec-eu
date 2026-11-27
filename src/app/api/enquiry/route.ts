import { NextResponse } from "next/server";
import { clientIpFromHeaders, normalizeIdentifier } from "@/lib/request-identity";
import { checkRateLimit, rateLimitRules } from "@/lib/rate-limit";
import {
  MAX_PAYLOAD_BYTES,
  sanitizeObject,
  sanitizeText,
  verifyRequestOrigin,
  verifyHoneypot,
  buildSecureError,
} from "@/lib/security-shield";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

function isValidEmail(email: string): boolean {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email) && email.length <= 254;
}

export async function POST(request: Request) {
  try {
    // 1. Enforce payload size limits against buffer overflow / memory flooding attacks
    const contentLength = request.headers.get("content-length");
    if (contentLength && parseInt(contentLength, 10) > MAX_PAYLOAD_BYTES) {
      return buildSecureError("Payload size exceeds permitted safety limits.", 413);
    }

    // 2. Strict origin & CSRF verification
    const originCheck = verifyRequestOrigin(request.headers);
    if (!originCheck.ok) {
      return buildSecureError(originCheck.reason || "Unauthorized request.", 403);
    }

    const ip = clientIpFromHeaders(request.headers);

    // 3. IP-level sliding-window rate limiting
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

    // 4. Safe JSON parsing with prototype pollution defense
    let rawBody: Record<string, unknown>;
    try {
      rawBody = await request.json();
    } catch {
      return buildSecureError("Malformed JSON payload.", 400);
    }

    const body = sanitizeObject(rawBody);

    // 5. Anti-bot honeypot and script latency check
    const honeypot = verifyHoneypot(body);
    if (!honeypot.ok) {
      // Silently discard or reject bot submissions
      return buildSecureError("Submission flagged by automated verification.", 400);
    }

    // 6. Strict field sanitization and XSS prevention
    const name = sanitizeText(body.name, 120);
    const email = sanitizeText(body.email, 254);
    const phone = sanitizeText(body.phone || body.whatsapp, 50);
    const companyName = sanitizeText(body.companyName, 150);
    const websiteUrl = sanitizeText(body.websiteUrl, 250);
    const pillar = sanitizeText(body.pillar, 50) || "GENERAL";
    const message = sanitizeText(
      body.message || body.ideaDescription || body.goals,
      4000
    );

    if (!name || name.length < 2) {
      return buildSecureError("Please provide a valid name.", 400);
    }

    if (!isValidEmail(email)) {
      return buildSecureError("Please provide a valid email address.", 400);
    }

    // 7. Email-level sliding-window rate limiting
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

    // 8. Cryptographic reference ID generation
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

    // 9. Masked audit log for privacy compliance (GDPR/EU compliant)
    const maskedEmail = email.replace(/(?<=.{2}).(?=.*@)/g, "*");
    console.log(
      JSON.stringify({
        event: "secure_enquiry_accepted",
        referenceId,
        pillar,
        maskedEmail,
        hasPhone: Boolean(phone),
        hasCompany: Boolean(companyName),
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
    console.error("Enquiry processing error (masked):", err instanceof Error ? err.message : "internal");
    return buildSecureError("An unexpected error occurred while processing your request.", 500);
  }
}
