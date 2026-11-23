/**
 * Phase 2 Integration Placeholders (Supabase & Cloudflare)
 * --------------------------------------------------------
 * Provides immediate interactive client-side persistence, reference code generation,
 * and simulated latency today, while exposing clean typed interfaces ready for Phase 2
 * drop-in connection to Supabase (PostgreSQL + RLS + Edge Functions) and Cloudflare
 * (Turnstile Bot Protection + Cloudflare Workers / Pages KV).
 */

export type EnquiryPillar =
  | "01_LAUNCH"
  | "02_AUTOMATE"
  | "03_INNOVATE"
  | "04_CONNECT"
  | "GENERAL";

export interface LeadSubmissionPayload {
  pillar: EnquiryPillar;
  name: string;
  email: string;
  whatsapp?: string;
  phone?: string;
  companyName?: string;
  opportunityId?: string;
  opportunityTitle?: string;
  ideaDescription?: string;
  budget?: string;
  goals?: string;
  timeframe?: string;
  automationModules?: string[];
  legalCategory?: string;
  message?: string;
  metadata?: Record<string, string | number | boolean>;
}

export interface SubmissionResult {
  ok: boolean;
  referenceId: string;
  timestamp: string;
  provider: "phase1-local-adapter" | "supabase-edge" | "cloudflare-worker";
  summary: string;
}

export const INTEGRATION_CONFIG = {
  supabase: {
    enabled: false,
    url: process.env.NEXT_PUBLIC_SUPABASE_URL || "https://placeholder.supabase.co",
    anonKeyConfigured: Boolean(process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY),
    tables: {
      leads: "onspec_leads",
      ideaSubmissions: "onspec_idea_submissions",
      automationAudits: "onspec_automation_audits",
      legalReferrals: "onspec_cyprus_legal_referrals",
    },
  },
  cloudflare: {
    turnstileEnabled: false,
    siteKey: process.env.NEXT_PUBLIC_CLOUDFLARE_TURNSTILE_SITE_KEY || "1x00000000000000000000AA",
    edgeGatewayUrl: process.env.NEXT_PUBLIC_CLOUDFLARE_WORKER_URL || "https://api.onspec.eu/v1/intake",
  },
};

const STORAGE_KEY = "onspec_eu_submissions_v1";

export async function submitOnspecEnquiry(
  payload: LeadSubmissionPayload
): Promise<SubmissionResult> {
  // Simulate realistic edge verification delay
  await new Promise((resolve) => setTimeout(resolve, 550));

  const randomSuffix = Math.random().toString(36).substring(2, 6).toUpperCase();
  const datePart = new Date().toISOString().slice(2, 10).replace(/-/g, "");
  const prefixMap: Record<EnquiryPillar, string> = {
    "01_LAUNCH": "OSP-LCH",
    "02_AUTOMATE": "OSP-AUT",
    "03_INNOVATE": "OSP-INV",
    "04_CONNECT": "OSP-LEG",
    GENERAL: "OSP-GEN",
  };

  const referenceId = `${prefixMap[payload.pillar]}-${datePart}-${randomSuffix}`;
  const timestamp = new Date().toISOString();

  const record = {
    referenceId,
    timestamp,
    ...payload,
  };

  if (typeof window !== "undefined") {
    try {
      const existingRaw = window.localStorage.getItem(STORAGE_KEY);
      const existing = existingRaw ? JSON.parse(existingRaw) : [];
      existing.unshift(record);
      window.localStorage.setItem(STORAGE_KEY, JSON.stringify(existing.slice(0, 50)));
    } catch {
      // Ignore storage quota errors in private browsing
    }
  }

  return {
    ok: true,
    referenceId,
    timestamp,
    provider: "phase1-local-adapter",
    summary: `Enquiry logged (${referenceId}). Ready for Onspec executive review & preliminary proposal.`,
  };
}
