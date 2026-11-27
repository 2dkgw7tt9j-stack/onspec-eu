import { createHmac } from "node:crypto";

const SEPARATOR = "\u001f";

export function clientIpFromHeaders(headers: Headers): string {
  const forwardedFor =
    headers.get("x-forwarded-for") ||
    headers.get("x-vercel-forwarded-for") ||
    headers.get("x-real-ip");

  const ip = forwardedFor?.split(",")[0]?.trim();
  return ip || "unknown";
}

export function normalizeIdentifier(value: string): string {
  return value.trim().toLowerCase();
}

export function hashIdentifier(parts: string[]): string {
  const secret =
    process.env.RATE_LIMIT_SECRET ||
    process.env.NEXTAUTH_SECRET ||
    "onspec-eu-production-secure-salt-2026";

  return createHmac("sha256", secret).update(parts.join(SEPARATOR)).digest("hex");
}
