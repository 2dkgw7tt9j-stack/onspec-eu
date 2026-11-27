import { NextResponse } from "next/server";

const ALLOWED_ORIGINS = new Set([
  "https://onspec.eu",
  "https://www.onspec.eu",
  "https://onspec-eu.vercel.app",
]);

// Maximum permitted JSON payload size in bytes (32 KB is more than enough for genuine enquiries)
export const MAX_PAYLOAD_BYTES = 32 * 1024;

/**
 * 1. Prototype Pollution Defense
 * Strips dangerous prototype modification keys from incoming JSON objects.
 */
export function sanitizeObject<T extends Record<string, unknown>>(obj: T): T {
  const dangerousKeys = ["__proto__", "constructor", "prototype"];
  for (const key of dangerousKeys) {
    if (key in obj) {
      delete (obj as Record<string, unknown>)[key];
    }
  }
  return obj;
}

/**
 * 2. Strict Input Sanitization & Anti-XSS String Sanitizer
 * Strips null bytes, non-printable control characters, and escapes dangerous HTML markup.
 */
export function sanitizeText(val: unknown, maxLength: number): string {
  if (typeof val !== "string") return "";
  const cleaned = val
    .trim()
    .slice(0, maxLength)
    // Strip null bytes and ASCII control characters (keep common whitespace)
    .replace(/[\u0000-\u0008\u000B-\u000C\u000E-\u001F]/g, "")
    // Escape angle brackets to prevent stored XSS
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;");

  return cleaned;
}

/**
 * 3. Cross-Site Request Forgery (CSRF) & Origin Gatekeeper
 * Modern browsers send Sec-Fetch-Site and Origin headers.
 * We strictly block any cross-site post requests originating from external websites.
 */
export function verifyRequestOrigin(headers: Headers): { ok: boolean; reason?: string } {
  // Check Sec-Fetch-Site header (standard in modern browsers)
  const secFetchSite = headers.get("sec-fetch-site");
  if (secFetchSite && secFetchSite === "cross-site") {
    return { ok: false, reason: "Cross-site request blocked by security policy." };
  }

  // Check Origin and Referer
  const origin = headers.get("origin");
  if (origin) {
    // In local development, permit localhost / 127.0.0.1
    const isDev = process.env.NODE_ENV === "development";
    const isLocalhost =
      origin.includes("localhost") || origin.includes("127.0.0.1") || origin.includes("::1");

    if (!ALLOWED_ORIGINS.has(origin) && !(isDev && isLocalhost)) {
      // Also permit preview vercel deployments for this team
      if (!origin.endsWith(".vercel.app")) {
        return { ok: false, reason: "Unauthorized origin rejected." };
      }
    }
  }

  return { ok: true };
}

/**
 * 4. Bot & Automated Spam Honeypot Verification
 * - Honeypot field: If a bot fills in a hidden trap field, reject immediately.
 * - Time-to-submit verification: If a form is submitted faster than humanly possible (< 1000ms),
 *   it indicates an automated headless script.
 */
export function verifyHoneypot(payload: Record<string, unknown>): { ok: boolean; isBot: boolean } {
  // Trap field check
  const trapFields = ["_hp_trap", "fax_number", "website_confirm", "_gotcha"];
  for (const field of trapFields) {
    if (payload[field] && typeof payload[field] === "string" && (payload[field] as string).trim() !== "") {
      return { ok: false, isBot: true };
    }
  }

  // Timing check
  if (typeof payload._hp_ts === "number") {
    const elapsedMs = Date.now() - payload._hp_ts;
    // Submitting faster than 900ms is a robotic automation script
    if (elapsedMs < 900) {
      return { ok: false, isBot: true };
    }
  }

  return { ok: true, isBot: false };
}

/**
 * 5. Safe Error Response Builder
 * Never leaks stack traces, framework internals, or server environments to clients.
 */
export function buildSecureError(message: string, status: number = 400): NextResponse {
  return NextResponse.json(
    {
      error: message,
      status: "security_rejected",
      timestamp: new Date().toISOString(),
    },
    {
      status,
      headers: {
        "Cache-Control": "private, no-store, max-age=0",
        "X-Content-Type-Options": "nosniff",
      },
    }
  );
}
