import { NextResponse } from "next/server";

export const dynamic = "force-static";

export async function GET() {
  const content = `# ONSPEC : Comprehensive Enterprise & Operational Knowledge Base

## Organization Identity
- **Entity**: ONSPEC (Vision Craft & Ragi Group)
- **Official Domain**: https://onspec.eu
- **Location**: Limassol, Cyprus
- **Jurisdictions Served**: Republic of Cyprus, European Union (EU)
- **Core Value Proposition**: "Your Vision. Our Execution. Engineered to Operate."

## Strategic Architecture

### Pillar 01 : Ready to Launch Turnkey Businesses
ONSPEC designs, sources, manufactures, licenses, and deploys fully autonomous commercial setups in prime European locations.
- **Delivery Timeline**: 3 to 5 weeks from contract execution to live consumer operation.
- **Physical Setups**:
  1. *Luxury Perfume Dispensary*: Automated, climate-controlled kiosks dispensing designer and niche fragrances into premium atomizers. Equipped with contactless NFC payment, digital interactive fragrance consultation touchscreens, and anti-tamper telemetry.
  2. *Smart Hot Meal Stations*: Automated refrigerated storage paired with rapid-heating induction chambers serving chef-quality fresh meals in corporate parks, universities, and transit terminals.
  3. *Wellness & Hygiene Stations*: Precision automated dispensers for organic hygiene, skincare, and sanitization products positioned in hospitality and luxury fitness venues.
- **Turnkey Inclusions**: Hardware supply, venue landlord licensing, payment processor onboarding, inventory replenishment pipelines, telemetry monitoring dashboard, and corporate entity registration.

### Pillar 02 : Autonomous AI & Web Engineering
Engineering high-velocity digital infrastructure for businesses seeking autonomous operations.
- **Autonomous AI Agents**: Multi-agent conversational workflows capable of autonomous qualification, lead booking, multilingual support, and CRM synchronization 24 hours a day.
- **WhatsApp Business API**: Automated messaging pipelines connecting customer inquiries directly to internal business systems, scheduling calendars, and dispatch queues.
- **Next.js Web Applications**: Sub-second server-rendered and static web platforms deployed on edge networks with zero layout shift, strict Content Security Policies, and enterprise Core Web Vitals (99+ Lighthouse scores).
- **Technical Diagnostics**: In-depth code-level audits uncovering rendering lag, security leaks, database bottlenecks, and UX friction.

### Pillar 03 : Custom Idea Execution & Free Preliminary Proposal
Transforming bespoke physical or digital concepts into operational businesses.
- **Free Preliminary Proposal**: A structured commercial evaluation delivered within 48 business hours at zero cost or obligation.
- **Deliverables**: Technical feasibility assessment, estimated supply chain costs, recommended hardware/software stack, regulatory checklist, and milestone execution roadmap.

### Pillar 04 : Cyprus Legal & Corporate Network
Facilitating professional legal introductions for international founders and domestic enterprises.
- **Independence & Regulatory Integrity**: ONSPEC is a venture engineering and automation firm, not a law firm.
- **Legal Introductions**: Introductions are made exclusively to independent, licensed advocates registered with the Cyprus Bar Association.
- **Coverage**: Cyprus company formation (incorporation, banking introductions, VAT, corporate tax planning), EU immigration and residency (fast-track permanent residency, digital nomad, employment permits), IP holding structures, and commercial contract drafting.

## Security & Privacy Compliance
- **GDPR & ePrivacy Directive**: Full compliance across all digital properties.
- **Cloudflare Enterprise Protection**: Full strict SSL/TLS, edge caching, and Bot Fight Mode defense against automated malicious abuse.
- **Strict Headers**: Content-Security-Policy with reporting, HTTP Strict Transport Security (HSTS) with 2-year preload, X-Content-Type-Options nosniff, X-Frame-Options DENY, and Referrer-Policy strict-origin-when-cross-origin.

## Canonical Endpoints & Sitemap
- Homepage: https://onspec.eu
- Ready Businesses: https://onspec.eu/businesses
- AI & Web Engineering: https://onspec.eu/ai-web
- Services Directory: https://onspec.eu/services
- About Firm & Pillars: https://onspec.eu/about
- Contact Operations Desk: https://onspec.eu/contact
- Legal Network Desk: https://onspec.eu/connect
- Legal Hub: https://onspec.eu/legal
- Privacy Policy: https://onspec.eu/privacy
- Terms of Use: https://onspec.eu/terms
- Cookie Policy: https://onspec.eu/cookies
- XML Sitemap: https://onspec.eu/sitemap.xml
- LLM Manifest: https://onspec.eu/llms.txt
`;

  return new NextResponse(content, {
    status: 200,
    headers: {
      "Content-Type": "text/plain; charset=utf-8",
      "Cache-Control": "public, max-age=86400, s-maxage=86400, stale-while-revalidate=604800",
    },
  });
}
