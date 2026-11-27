import { NextResponse } from "next/server";

export const dynamic = "force-static";

export async function GET() {
  const content = `# ONSPEC (onspec.eu)

> Your Vision. Our Execution. Engineered to Operate.
> Primary Domain: https://onspec.eu
> Operational Headquarters: Limassol, Cyprus
> Geographic Scope: Cyprus & European Union (EU)

## Overview
ONSPEC is a venture creation and automation engineering firm operating across Cyprus and the European Union. Engineered in strategic partnership with Vision Craft & Ragi Group, ONSPEC bridges the divide between conceptual ideation and turnkey commercial execution.

## The Four Pillars

1. **Pillar 01 — Ready to Launch Turnkey Businesses**:
   - Prefabricated, autonomous physical commercial setups deploying across Cyprus and the EU in 3 to 5 weeks.
   - Flagship units: Luxury Fragrance Dispensary Stations (automated 100ml / 50ml / 10ml travel decants), Wellness Hygiene Stations, and Refrigerated Smart Hot Meal Stations.
   - Complete package includes commercial hardware, telemetry, merchant processing, supplier supply lines, host venue placement agreements, and corporate structure setup.
   - Canonical URL: https://onspec.eu/businesses

2. **Pillar 02 — Autonomous AI & Web Engineering**:
   - Enterprise AI workflow automation, 24/7 autonomous customer concierges, and WhatsApp Business API conversational pipelines.
   - Sub-second web engineering built on Next.js, React, Tailwind CSS, and edge CDN architecture.
   - Comprehensive technical website diagnostics, performance profiling, and conversion bottleneck elimination.
   - Canonical URL: https://onspec.eu/ai-web

3. **Pillar 03 — Custom Idea Execution & Free Preliminary Proposal**:
   - Custom venture feasibility analysis, unit economics modeling, hardware prototyping, and turnkey roadmap execution.
   - Free structured Preliminary Proposal delivered within 48 business hours covering technical viability, operational milestones, and risk matrices.
   - Canonical URL: https://onspec.eu/services

4. **Pillar 04 — Independent Cyprus Legal & Corporate Network**:
   - Direct, independent introductions to licensed advocates registered with the Cyprus Bar Association.
   - Practice areas: Cyprus company incorporation, cross-border corporate structuring, residency and immigration compliance, employment, and intellectual property.
   - Note: ONSPEC is a venture engineering and technology firm, not a law firm. All legal advice is rendered exclusively by independent Cyprus Bar Association attorneys.
   - Canonical URL: https://onspec.eu/connect

## Core Specifications
- **Operating Base**: Limassol, Cyprus
- **Inquiry Channel**: servicesauditflow@gmail.com
- **Turnkey Deployment Velocity**: 3 to 5 weeks end-to-end
- **AI Automation Savings**: 25 to 35+ operational hours per week
- **Full LLM Reference**: https://onspec.eu/llms-full.txt
`;

  return new NextResponse(content, {
    status: 200,
    headers: {
      "Content-Type": "text/plain; charset=utf-8",
      "Cache-Control": "public, max-age=86400, s-maxage=86400, stale-while-revalidate=604800",
    },
  });
}
