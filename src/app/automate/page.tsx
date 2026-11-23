"use client";

import React, { useState, useMemo } from "react";
import Link from "next/link";
import {
  Cpu,
  MessageSquare,
  Mail,
  Globe,
  Database,
  Calendar,
  FileSpreadsheet,
  ArrowUpRight,
  CheckCircle2,
  Zap,
  Clock,
  Sliders,
  Send,
  Check,
  Terminal,
  Sparkles,
  RefreshCw,
  ShieldCheck,
  Layers,
  Bot,
  Workflow,
  ArrowRight,
} from "lucide-react";
import {
  AUTOMATION_MODULES,
  CONNECTED_PLATFORMS_MATRIX,
  MARQUEE_TICKER_ITEMS,
  AutomationModule,
} from "@/data/onspec-data";
import { InfiniteMarquee } from "@/components/InfiniteMarquee";
import { submitOnspecEnquiry } from "@/lib/integrations-placeholder";

type ModuleCategory =
  | "All Modules"
  | "Customer Facing"
  | "Operations & CRM"
  | "Finance & Admin"
  | "Infrastructure";

const MODULE_CATEGORIES: ModuleCategory[] = [
  "All Modules",
  "Customer Facing",
  "Operations & CRM",
  "Finance & Admin",
  "Infrastructure",
];

interface SimulatedScenario {
  id: string;
  label: string;
  channel: string;
  language: string;
  customerMessage: string;
  aiThinkingSteps: string[];
  aiReply: string;
  systemActions: string[];
  latency: string;
}

const LIVE_AGENT_SCENARIOS: SimulatedScenario[] = [
  {
    id: "whatsapp-booking",
    label: "01 // WhatsApp Service Quote & Booking",
    channel: "WhatsApp Business API",
    language: "English / Cyprus Desk",
    customerMessage:
      "Hi! Do you have availability this Thursday afternoon in Limassol for a commercial consultation, and what is your standard pricing?",
    aiThinkingSteps: [
      "Intent classified: PRICING_INQUIRY + APPOINTMENT_BOOKING (Confidence: 99.4%)",
      "Queried live Google/Outlook Calendar for Limassol specialists on Thursday",
      "Retrieved approved service tier card from Knowledge Base",
    ],
    aiReply:
      "Hello! Yes, our Limassol desk has two slots open this Thursday: 14:30 or 16:00. Initial feasibility consultations are complimentary, and turnkey packages start from €1,850 depending on scope. Tap below to lock in 14:30 or 16:00 and I’ll send your calendar invite immediately.",
    systemActions: [
      "CRM Lead Created & Scored (High Intent)",
      "Calendar Slot Temporarily Reserved",
      "WhatsApp Interactive Time-Slot Buttons Dispatched",
    ],
    latency: "1.1s",
  },
  {
    id: "multilingual-support",
    label: "02 // 24/7 After-Hours Order & Policy Resolution",
    channel: "Website AI Support Widget",
    language: "Multilingual (EN / EL / DE)",
    customerMessage:
      "Καλησπέρα, έκανα μια παραγγελία (#OSP-4821) και θέλω να αλλάξω τη διεύθυνση παράδοσης στη Λευκωσία πριν αποσταλεί.",
    aiThinkingSteps: [
      "Language detected: Greek (EL) — Loaded native Greek response profile",
      "Queried ERP / Order Management for Order #OSP-4821 (Status: Unfulfilled)",
      "Verified address modification policy window: ELIGIBLE",
    ],
    aiReply:
      "Καλησπέρα σας! Εντόπισα την παραγγελία #OSP-4821 (βρίσκεται ακόμα στο στάδιο προετοιμασίας). Μπορώ να ενημερώσω τη διεύθυνση παράδοσης στη Λευκωσία αμέσως. Ποια είναι η νέα οδός και ο ταχυδρομικός κώδικας;",
    systemActions: [
      "Order #OSP-4821 Locked for Address Update",
      "Logistics Webhook Prepared for Courier Sync",
      "Zero Human Support Ticket Required at 23:45",
    ],
    latency: "0.9s",
  },
  {
    id: "invoice-triage",
    label: "03 // Email Triage & Invoice OCR Extraction",
    channel: "Email (accounts@company.eu)",
    language: "Automated FinOps Pipeline",
    customerMessage:
      "Attached is Invoice #INV-2026-884 from Mediterranean Supplies Ltd for €2,480.00 (incl. 19% Cyprus VAT). Please confirm receipt and scheduled payment date.",
    aiThinkingSteps: [
      "Parsed PDF attachment via AI OCR: Vendor 'Mediterranean Supplies Ltd', VAT CY10293847L",
      "Matched against approved Purchase Order #PO-902 (Variance: €0.00)",
      "Created draft bill in Xero/QuickBooks for SEPA batch run",
    ],
    aiReply:
      "Thank you. Invoice #INV-2026-884 (€2,480.00) has been verified against PO-902 and queued in our accounting system for the scheduled Friday SEPA settlement run.",
    systemActions: [
      "PDF Archived to Google Drive /2026/Q2/Suppliers",
      "Xero Draft Bill Logged with 19% VAT Code",
      "Finance Slack Channel Notified for 1-Click Approval",
    ],
    latency: "1.4s",
  },
];

export default function AutomatePage() {
  const [selectedNodeId, setSelectedNodeId] = useState<string>(
    CONNECTED_PLATFORMS_MATRIX[0]?.id || "whatsapp"
  );
  const [selectedCategory, setSelectedCategory] =
    useState<ModuleCategory>("All Modules");
  const [activeScenarioIndex, setActiveScenarioIndex] = useState<number>(0);

  // Interactive ROI & Workflow Builder state
  const [selectedModuleIds, setSelectedModuleIds] = useState<string[]>([
    "ai-customer-support",
    "whatsapp-automation",
    "ai-booking-assistants",
    "crm-automation",
  ]);
  const [hourlyRate, setHourlyRate] = useState<number>(28);
  const [teamMultiplier, setTeamMultiplier] = useState<number>(1);

  // Consultation Form State
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [whatsapp, setWhatsapp] = useState("");
  const [companyName, setCompanyName] = useState("");
  const [currentStack, setCurrentStack] = useState(
    "WhatsApp, Email, Excel / Manual CRM"
  );
  const [bottleneckNotes, setBottleneckNotes] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [referenceId, setReferenceId] = useState<string | null>(null);

  const selectedNode = useMemo(
    () =>
      CONNECTED_PLATFORMS_MATRIX.find((n) => n.id === selectedNodeId) ||
      CONNECTED_PLATFORMS_MATRIX[0],
    [selectedNodeId]
  );

  const filteredModules = useMemo(() => {
    if (selectedCategory === "All Modules") return AUTOMATION_MODULES;
    return AUTOMATION_MODULES.filter((m) => m.category === selectedCategory);
  }, [selectedCategory]);

  const toggleModuleInBuilder = (id: string) => {
    setSelectedModuleIds((prev) =>
      prev.includes(id) ? prev.filter((item) => item !== id) : [...prev, id]
    );
  };

  const roiStats = useMemo(() => {
    const activeMods = AUTOMATION_MODULES.filter((m) =>
      selectedModuleIds.includes(m.id)
    );
    const weeklyHours =
      activeMods.reduce((acc, m) => acc + m.timeSavedHoursPerWeek, 0) *
      teamMultiplier;
    const annualHours = weeklyHours * 52;
    const annualSavingsEuro = annualHours * hourlyRate;
    const monthlySavingsEuro = Math.round(annualSavingsEuro / 12);

    return {
      activeMods,
      weeklyHours,
      annualHours,
      annualSavingsEuro,
      monthlySavingsEuro,
    };
  }, [selectedModuleIds, hourlyRate, teamMultiplier]);

  const activeScenario =
    LIVE_AGENT_SCENARIOS[activeScenarioIndex] || LIVE_AGENT_SCENARIOS[0];

  const getNodeIcon = (id: string) => {
    switch (id) {
      case "whatsapp":
        return <MessageSquare className="h-4 w-4 text-[#27B58A]" />;
      case "email":
        return <Mail className="h-4 w-4 text-[#27B58A]" />;
      case "websites":
        return <Globe className="h-4 w-4 text-[#27B58A]" />;
      case "crm":
        return <Database className="h-4 w-4 text-[#27B58A]" />;
      case "booking":
        return <Calendar className="h-4 w-4 text-[#27B58A]" />;
      default:
        return <FileSpreadsheet className="h-4 w-4 text-[#27B58A]" />;
    }
  };

  const handleConsultationSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    const selectedTitles = roiStats.activeMods.map((m) => m.title);
    const res = await submitOnspecEnquiry({
      pillar: "02_AUTOMATE",
      name,
      email,
      whatsapp,
      companyName,
      automationModules: selectedTitles,
      message: `Current Stack: ${currentStack}. Estimated Weekly Time Saved: ${roiStats.weeklyHours} hrs/wk (€${roiStats.annualSavingsEuro.toLocaleString()}/yr). Notes: ${bottleneckNotes}`,
    });
    setIsSubmitting(false);
    if (res.ok) {
      setReferenceId(res.referenceId);
    }
  };

  return (
    <div className="min-h-screen bg-[#F7F8FA] text-[#101D35]">
      {/* =====================================================================
          1. LINEAR + STRIPE HERO WITH INTERACTIVE WORKFLOW NODE DIAGRAM
      ====================================================================== */}
      <section className="relative overflow-hidden border-b border-[#A8B1BE]/30 linear-navy-surface text-[#F7F8FA] tech-grid-dark">
        {/* Top Telemetry Bar */}
        <div className="border-b border-[#A8B1BE]/20 bg-[#101D35]/90 backdrop-blur-md">
          <div className="mx-auto flex max-w-7xl flex-wrap items-center justify-between gap-4 px-4 py-3 sm:px-6 lg:px-8">
            <div className="flex items-center gap-3">
              <span className="inline-flex h-2 w-2 rounded-full bg-[#27B58A] animate-pulse" />
              <span className="font-mono text-xs uppercase tracking-widest text-[#27B58A]">
                PILLAR 02 // AI & BUSINESS AUTOMATION
              </span>
              <span className="hidden text-[#A8B1BE]/40 sm:inline">|</span>
              <span className="hidden font-mono text-xs text-[#A8B1BE] sm:inline">
                ARCHITECTURE: OMNI-CHANNEL NEURAL BUS v4.2
              </span>
            </div>
            <div className="flex items-center gap-6 font-mono text-xs text-[#A8B1BE]">
              <span>MODULES: 10 PRODUCTION-READY</span>
              <span className="hidden sm:inline">UPTIME: 99.98%</span>
              <span className="text-[#27B58A]">LATENCY: &lt; 250MS</span>
            </div>
          </div>
        </div>

        <div className="mx-auto max-w-7xl px-4 py-16 sm:px-6 lg:px-8 lg:py-24">
          <div className="grid grid-cols-1 gap-12 lg:grid-cols-12 lg:items-center">
            {/* Hero Left Copy */}
            <div className="lg:col-span-6 space-y-6">
              <div className="inline-flex items-center gap-2 rounded-full border border-[#A8B1BE]/25 bg-[#253B5B]/45 px-4 py-1.5">
                <Cpu className="h-3.5 w-3.5 text-[#27B58A]" />
                <span className="font-mono text-xs uppercase tracking-wider text-[#F7F8FA]">
                  Intelligent Systems & Workflow Engineering
                </span>
              </div>

              <p className="font-mono text-sm uppercase tracking-widest text-[#27B58A]">
                “Your business doesn’t need more manual work. It needs smarter
                systems.”
              </p>

              <h1 className="text-4xl font-extrabold tracking-tight text-white sm:text-5xl lg:text-6xl leading-[1.06]">
                Eliminate repetitive work with{" "}
                <span className="text-[#27B58A]">autonomous systems.</span>
              </h1>

              <p className="text-base sm:text-lg leading-relaxed text-[#A8B1BE]">
                We architect and deploy production-grade AI Customer Support
                Agents, WhatsApp Business pipelines, automated booking
                assistants, self-updating CRMs, and invoice workflows—connecting
                every tool your business runs on into one cohesive engine.
              </p>

              <div className="flex flex-wrap items-center gap-4 pt-2">
                <a
                  href="#roi-workflow-builder"
                  className="inline-flex items-center gap-2.5 rounded-lg bg-[#27B58A] px-6 py-3.5 text-sm font-semibold text-[#101D35] shadow-lg shadow-[#27B58A]/20 hover:bg-[#1F9470] hover:text-white transition-all"
                >
                  <span>Build Your Automation Stack & Calculate ROI</span>
                  <Sliders className="h-4 w-4" />
                </a>
                <a
                  href="#capabilities-matrix"
                  className="inline-flex items-center gap-2 rounded-lg border border-[#A8B1BE]/35 bg-[#253B5B]/35 px-5 py-3.5 text-sm font-semibold text-white hover:border-[#27B58A] hover:text-[#27B58A] transition-colors"
                >
                  <span>Explore 10 Capabilities</span>
                  <ArrowUpRight className="h-4 w-4" />
                </a>
              </div>
            </div>

            {/* Hero Right: Interactive Workflow Node Diagram */}
            <div className="lg:col-span-6">
              <div className="rounded-2xl border border-[#A8B1BE]/30 bg-[#101D35]/95 p-6 shadow-2xl backdrop-blur-md">
                <div className="flex flex-wrap items-center justify-between gap-2 border-b border-[#A8B1BE]/20 pb-4">
                  <div className="flex items-center gap-2">
                    <Workflow className="h-4 w-4 text-[#27B58A]" />
                    <span className="font-mono text-xs uppercase tracking-wider text-white font-semibold">
                      INTERACTIVE WORKFLOW NODE DIAGRAM
                    </span>
                  </div>
                  <span className="font-mono text-[11px] text-[#27B58A]">
                    Click any source node to inspect data bus
                  </span>
                </div>

                {/* 6 Source Input Nodes feeding into ONSPEC AI Engine */}
                <div className="mt-5 grid grid-cols-1 gap-2.5 sm:grid-cols-2">
                  {CONNECTED_PLATFORMS_MATRIX.map((node) => {
                    const isSelected = node.id === selectedNodeId;
                    return (
                      <button
                        key={node.id}
                        type="button"
                        onClick={() => setSelectedNodeId(node.id)}
                        className={`flex items-start gap-3 rounded-xl border p-3.5 text-left transition-all cursor-pointer ${
                          isSelected
                            ? "border-[#27B58A] bg-[#253B5B]/70 text-white shadow-md shadow-[#27B58A]/10"
                            : "border-[#A8B1BE]/20 bg-[#253B5B]/25 text-[#A8B1BE] hover:border-[#A8B1BE]/50 hover:text-white"
                        }`}
                      >
                        <div className="mt-0.5 rounded-lg bg-[#101D35] p-2 border border-[#A8B1BE]/20">
                          {getNodeIcon(node.id)}
                        </div>
                        <div className="min-w-0 flex-1">
                          <div className="flex items-center justify-between font-mono text-[10px]">
                            <span className="text-[#27B58A] font-semibold">
                              {node.code}
                            </span>
                            <span>{node.latency}</span>
                          </div>
                          <p className="mt-0.5 text-xs font-bold text-white truncate">
                            {node.name}
                          </p>
                          <p className="mt-0.5 text-[11px] text-[#A8B1BE] line-clamp-1">
                            {node.role}
                          </p>
                        </div>
                      </button>
                    );
                  })}
                </div>

                {/* Animated Connector Flow to Central ONSPEC AI Engine */}
                <div className="my-4 flex items-center justify-center gap-3">
                  <div className="h-px flex-1 bg-gradient-to-r from-transparent via-[#27B58A]/60 to-[#27B58A]" />
                  <span className="inline-flex items-center gap-1.5 rounded-full border border-[#27B58A]/50 bg-[#27B58A]/15 px-3 py-1 font-mono text-[10px] uppercase tracking-widest text-[#27B58A]">
                    <RefreshCw className="h-3 w-3 animate-spin" />
                    BI-DIRECTIONAL EVENT STREAM ({selectedNode.latency})
                  </span>
                  <div className="h-px flex-1 bg-gradient-to-l from-transparent via-[#27B58A]/60 to-[#27B58A]" />
                </div>

                {/* Central ONSPEC AI Engine Hub */}
                <div className="rounded-xl border border-[#27B58A]/50 bg-gradient-to-br from-[#253B5B]/60 to-[#101D35] p-5">
                  <div className="flex flex-wrap items-center justify-between gap-2">
                    <div className="flex items-center gap-2.5">
                      <span className="inline-flex h-2.5 w-2.5 rounded-full bg-[#27B58A]" />
                      <span className="font-mono text-xs font-bold uppercase tracking-wider text-white">
                        ONSPEC AI & ORCHESTRATION ENGINE
                      </span>
                    </div>
                    <span className="rounded bg-[#101D35] px-2.5 py-0.5 font-mono text-[10px] text-[#27B58A] border border-[#27B58A]/30">
                      ACTIVE NODE: {selectedNode.code}
                    </span>
                  </div>

                  <p className="mt-2 text-xs text-[#F7F8FA]/90">
                    <strong className="text-[#27B58A]">
                      {selectedNode.name}:
                    </strong>{" "}
                    {selectedNode.role}
                  </p>

                  <div className="mt-4 grid grid-cols-3 gap-2 pt-3 border-t border-[#A8B1BE]/20 text-center font-mono text-[10px]">
                    <div className="rounded bg-[#101D35]/80 p-2 text-[#F7F8FA]">
                      <span className="block text-[#27B58A] font-bold">
                        01 INGEST
                      </span>
                      Webhook / API
                    </div>
                    <div className="rounded bg-[#101D35]/80 p-2 text-[#F7F8FA]">
                      <span className="block text-[#27B58A] font-bold">
                        02 REASON
                      </span>
                      AI Policy Guard
                    </div>
                    <div className="rounded bg-[#101D35]/80 p-2 text-[#F7F8FA]">
                      <span className="block text-[#27B58A] font-bold">
                        03 EXECUTE
                      </span>
                      Sync All Tools
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* =====================================================================
          2A. SIMULATED LIVE AI AGENT CONVERSATION & EXECUTION PREVIEW
      ====================================================================== */}
      <section className="border-b border-[#A8B1BE]/40 py-20 lg:py-24 stripe-mesh-light">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col justify-between gap-6 lg:flex-row lg:items-end">
            <div>
              <div className="inline-flex items-center gap-2 font-mono text-xs uppercase tracking-widest text-[#253B5B]">
                <Bot className="h-4 w-4 text-[#27B58A]" />
                <span>LIVE SIMULATION // AI CUSTOMER SUPPORT & WORKFLOWS</span>
              </div>
              <h2 className="mt-2 text-3xl font-extrabold tracking-tight text-[#101D35] sm:text-4xl">
                Watch the Onspec AI Engine in Action
              </h2>
              <p className="mt-2 max-w-2xl text-base text-[#253B5B]">
                Switch between real-world operational scenarios below to inspect
                how our AI agents handle customer conversations, check live
                availability, and update your back-office systems in
                milliseconds.
              </p>
            </div>

            {/* Scenario Switcher Tabs */}
            <div className="flex flex-wrap gap-2">
              {LIVE_AGENT_SCENARIOS.map((sc, idx) => {
                const active = activeScenarioIndex === idx;
                return (
                  <button
                    key={sc.id}
                    type="button"
                    onClick={() => setActiveScenarioIndex(idx)}
                    className={`rounded-lg px-3.5 py-2 font-mono text-xs uppercase tracking-wider transition-all cursor-pointer ${
                      active
                        ? "bg-[#101D35] text-white font-semibold shadow-sm"
                        : "border border-[#A8B1BE]/50 bg-white text-[#253B5B] hover:border-[#101D35]"
                    }`}
                  >
                    {sc.label}
                  </button>
                );
              })}
            </div>
          </div>

          {/* Interactive Terminal + Conversation Split View */}
          <div className="mt-8 grid grid-cols-1 gap-8 lg:grid-cols-12">
            {/* Left: Simulated Customer Conversation Window */}
            <div className="lg:col-span-7 rounded-2xl border border-[#A8B1BE]/50 bg-white overflow-hidden shadow-md flex flex-col justify-between">
              <div>
                <div className="flex items-center justify-between border-b border-[#A8B1BE]/30 bg-[#101D35] px-6 py-4 text-white">
                  <div className="flex items-center gap-2.5">
                    <span className="h-2.5 w-2.5 rounded-full bg-[#27B58A]" />
                    <span className="font-mono text-xs font-semibold uppercase tracking-wider">
                      {activeScenario.channel}
                    </span>
                  </div>
                  <span className="rounded bg-[#253B5B] px-2.5 py-1 font-mono text-[11px] text-[#27B58A]">
                    {activeScenario.language}
                  </span>
                </div>

                <div className="p-6 space-y-6">
                  {/* Inbound Customer Bubble */}
                  <div className="flex flex-col items-start">
                    <span className="font-mono text-[10px] uppercase tracking-wider text-[#253B5B]/75 mb-1">
                      INBOUND CLIENT TRIGGER
                    </span>
                    <div className="max-w-xl rounded-2xl rounded-tl-none border border-[#A8B1BE]/40 bg-[#F7F8FA] p-4 text-sm text-[#101D35]">
                      {activeScenario.customerMessage}
                    </div>
                  </div>

                  {/* AI Agent Response Bubble */}
                  <div className="flex flex-col items-end">
                    <div className="flex items-center gap-2 mb-1">
                      <span className="font-mono text-[10px] uppercase tracking-wider text-[#27B58A] font-semibold">
                        ONSPEC AI AGENT • RESOLVED IN {activeScenario.latency}
                      </span>
                    </div>
                    <div className="max-w-xl rounded-2xl rounded-tr-none bg-[#101D35] p-4 text-sm text-[#F7F8FA] shadow-md">
                      {activeScenario.aiReply}
                    </div>
                  </div>
                </div>
              </div>

              <div className="border-t border-[#A8B1BE]/30 bg-[#F7F8FA] px-6 py-3.5 flex items-center justify-between text-xs text-[#253B5B]">
                <span className="font-mono">
                  GUARDRAILS: Zero-Hallucination Policy Active
                </span>
                <span className="font-mono font-semibold text-[#1F9470]">
                  100% Autonomous Execution
                </span>
              </div>
            </div>

            {/* Right: Under-the-Hood Telemetry & Back-Office Actions */}
            <div className="lg:col-span-5 rounded-2xl border border-[#A8B1BE]/40 bg-[#101D35] p-6 text-white shadow-xl flex flex-col justify-between">
              <div className="space-y-5">
                <div className="flex items-center justify-between border-b border-[#A8B1BE]/20 pb-3.5">
                  <div className="flex items-center gap-2">
                    <Terminal className="h-4 w-4 text-[#27B58A]" />
                    <span className="font-mono text-xs uppercase tracking-wider text-[#27B58A]">
                      EXECUTION TRACE & WEBHOOKS
                    </span>
                  </div>
                  <span className="font-mono text-xs text-[#A8B1BE]">
                    {activeScenario.latency}
                  </span>
                </div>

                <div>
                  <p className="font-mono text-[11px] uppercase tracking-wider text-[#A8B1BE]">
                    01 // AI REASONING & DATA LOOKUP:
                  </p>
                  <ul className="mt-2.5 space-y-2">
                    {activeScenario.aiThinkingSteps.map((step) => (
                      <li
                        key={step}
                        className="rounded-lg border border-[#A8B1BE]/15 bg-[#253B5B]/35 p-3 font-mono text-xs text-[#F7F8FA]/90"
                      >
                        &gt; {step}
                      </li>
                    ))}
                  </ul>
                </div>

                <div>
                  <p className="font-mono text-[11px] uppercase tracking-wider text-[#27B58A]">
                    02 // SYNCHRONIZED SYSTEM ACTIONS TRIGGERED:
                  </p>
                  <ul className="mt-2.5 space-y-2">
                    {activeScenario.systemActions.map((act) => (
                      <li
                        key={act}
                        className="flex items-center gap-2.5 rounded-lg border border-[#27B58A]/30 bg-[#27B58A]/10 p-3 text-xs font-medium text-white"
                      >
                        <CheckCircle2 className="h-4 w-4 shrink-0 text-[#27B58A]" />
                        <span>{act}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>

              <div className="mt-6 pt-4 border-t border-[#A8B1BE]/20 flex items-center justify-between">
                <span className="font-mono text-[11px] text-[#A8B1BE]">
                  Works with your existing CRM & Calendar
                </span>
                <a
                  href="#consultation-form"
                  className="inline-flex items-center gap-1 font-mono text-xs font-semibold text-[#27B58A] hover:underline"
                >
                  <span>Deploy This Agent</span>
                  <ArrowRight className="h-3.5 w-3.5" />
                </a>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* =====================================================================
          2B. DEEP-DIVE INTERACTIVE MODULES FOR ALL 10 CAPABILITIES
      ====================================================================== */}
      <section
        id="capabilities-matrix"
        className="border-b border-[#A8B1BE]/40 py-20 lg:py-24 tech-grid-bg"
      >
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col justify-between gap-6 lg:flex-row lg:items-end">
            <div>
              <div className="inline-flex items-center gap-2 font-mono text-xs uppercase tracking-widest text-[#253B5B]">
                <Layers className="h-3.5 w-3.5 text-[#27B58A]" />
                <span>CAPABILITY CATALOG // ALL 10 AUTOMATION MODULES</span>
              </div>
              <h2 className="mt-2 text-3xl font-extrabold tracking-tight text-[#101D35] sm:text-4xl">
                10 Production-Grade AI & Automation Systems
              </h2>
              <p className="mt-2 max-w-2xl text-base text-[#253B5B]">
                Explore every capability below. Click{" "}
                <strong className="text-[#101D35]">
                  “+ Include in ROI Builder”
                </strong>{" "}
                on any module to add it to your custom automation blueprint.
              </p>
            </div>

            {/* Category Filter Pills */}
            <div className="flex flex-wrap gap-2">
              {MODULE_CATEGORIES.map((cat) => {
                const active = selectedCategory === cat;
                return (
                  <button
                    key={cat}
                    type="button"
                    onClick={() => setSelectedCategory(cat)}
                    className={`rounded-lg px-3.5 py-2 font-mono text-xs uppercase tracking-wider transition-all cursor-pointer ${
                      active
                        ? "bg-[#101D35] text-white font-semibold"
                        : "border border-[#A8B1BE]/50 bg-white text-[#253B5B] hover:border-[#101D35]"
                    }`}
                  >
                    {cat}
                  </button>
                );
              })}
            </div>
          </div>

          {/* 10 Modules Grid */}
          <div className="mt-10 grid grid-cols-1 gap-6 lg:grid-cols-2">
            {filteredModules.map((mod: AutomationModule) => {
              const inBuilder = selectedModuleIds.includes(mod.id);
              return (
                <div
                  key={mod.id}
                  className={`flex flex-col justify-between rounded-2xl border bg-white overflow-hidden transition-all ${
                    inBuilder
                      ? "border-[#27B58A] ring-1 ring-[#27B58A]/30 shadow-md"
                      : "border-[#A8B1BE]/50 shadow-sm hover:border-[#101D35]"
                  }`}
                >
                  <div>
                    {/* Module Header */}
                    <div className="flex items-center justify-between border-b border-[#A8B1BE]/30 bg-[#101D35] px-5 py-3.5 text-white">
                      <div className="flex items-center gap-2.5">
                        <span className="h-2 w-2 rounded-full bg-[#27B58A]" />
                        <span className="font-mono text-xs uppercase tracking-wider text-[#A8B1BE]">
                          {mod.code}
                        </span>
                      </div>
                      <div className="flex items-center gap-2">
                        <span className="rounded bg-[#253B5B] px-2.5 py-0.5 font-mono text-[11px] text-[#27B58A]">
                          {mod.efficiencyMetric}
                        </span>
                        <span className="rounded bg-white/10 px-2 py-0.5 font-mono text-[10px] text-[#F7F8FA]">
                          {mod.category}
                        </span>
                      </div>
                    </div>

                    <div className="p-6 space-y-4">
                      <div className="flex items-start justify-between gap-4">
                        <div>
                          <h3 className="text-xl font-bold text-[#101D35]">
                            {mod.title}
                          </h3>
                          <p className="mt-1 text-xs font-semibold text-[#253B5B]">
                            {mod.tagline}
                          </p>
                        </div>
                        <div className="shrink-0 rounded-lg border border-[#A8B1BE]/40 bg-[#F7F8FA] px-3 py-1.5 text-right">
                          <span className="block font-mono text-[10px] uppercase text-[#253B5B]">
                            TIME SAVED
                          </span>
                          <span className="font-mono text-sm font-bold text-[#101D35]">
                            ~{mod.timeSavedHoursPerWeek}h / wk
                          </span>
                        </div>
                      </div>

                      <p className="text-xs leading-relaxed text-[#253B5B]">
                        {mod.description}
                      </p>

                      {/* Capabilities Checklist */}
                      <div className="grid grid-cols-1 gap-2 pt-1 sm:grid-cols-2">
                        {mod.capabilities.map((cap) => (
                          <div
                            key={cap}
                            className="flex items-start gap-2 rounded-lg bg-[#F7F8FA] p-2.5 text-xs text-[#101D35]"
                          >
                            <CheckCircle2 className="mt-0.5 h-3.5 w-3.5 shrink-0 text-[#27B58A]" />
                            <span>{cap}</span>
                          </div>
                        ))}
                      </div>

                      {/* Automated Trigger -> Action Pipeline Box */}
                      <div className="rounded-xl border border-[#A8B1BE]/40 bg-[#101D35] p-4 text-xs text-white">
                        <div className="grid grid-cols-1 gap-3 sm:grid-cols-2">
                          <div>
                            <span className="font-mono text-[10px] uppercase tracking-wider text-[#A8B1BE]">
                              SAMPLE EVENT TRIGGER:
                            </span>
                            <p className="mt-1 text-[#F7F8FA]">
                              {mod.sampleTrigger}
                            </p>
                          </div>
                          <div className="sm:border-l sm:border-[#A8B1BE]/20 sm:pl-3">
                            <span className="font-mono text-[10px] uppercase tracking-wider text-[#27B58A]">
                              AUTONOMOUS ONSPEC ACTION:
                            </span>
                            <p className="mt-1 text-[#F7F8FA]">
                              {mod.sampleAction}
                            </p>
                          </div>
                        </div>
                      </div>

                      {/* Connected Platforms Pills */}
                      <div className="flex flex-wrap items-center gap-1.5 pt-1">
                        <span className="font-mono text-[10px] uppercase text-[#253B5B] mr-1">
                          INTEGRATES WITH:
                        </span>
                        {mod.connectedPlatforms.map((plat) => (
                          <span
                            key={plat}
                            className="rounded border border-[#A8B1BE]/45 bg-[#F7F8FA] px-2 py-0.5 font-mono text-[10px] text-[#101D35]"
                          >
                            {plat}
                          </span>
                        ))}
                      </div>
                    </div>
                  </div>

                  {/* Card Footer: Toggle into ROI Workflow Builder */}
                  <div className="border-t border-[#A8B1BE]/30 bg-[#F7F8FA] px-6 py-3.5 flex items-center justify-between">
                    <span className="font-mono text-xs text-[#253B5B]">
                      {inBuilder
                        ? "Included in your ROI Workflow Stack"
                        : "Click to test in ROI Calculator"}
                    </span>
                    <button
                      type="button"
                      onClick={() => toggleModuleInBuilder(mod.id)}
                      className={`inline-flex items-center gap-1.5 rounded-lg px-3.5 py-2 font-mono text-xs font-semibold uppercase tracking-wider transition-colors cursor-pointer ${
                        inBuilder
                          ? "bg-[#27B58A] text-[#101D35]"
                          : "bg-[#101D35] text-white hover:bg-[#253B5B]"
                      }`}
                    >
                      {inBuilder ? (
                        <>
                          <Check className="h-3.5 w-3.5" />
                          <span>Selected in Stack</span>
                        </>
                      ) : (
                        <>
                          <Zap className="h-3.5 w-3.5 text-[#27B58A]" />
                          <span>+ Include in ROI Builder</span>
                        </>
                      )}
                    </button>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* =====================================================================
          3. INTERACTIVE ROI & TIME-SAVED CALCULATOR / WORKFLOW BUILDER
      ====================================================================== */}
      <section
        id="roi-workflow-builder"
        className="border-b border-[#A8B1BE]/40 bg-[#101D35] py-20 lg:py-24 text-white tech-grid-dark"
      >
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="max-w-3xl">
            <div className="inline-flex items-center gap-2 font-mono text-xs uppercase tracking-widest text-[#27B58A]">
              <Sliders className="h-3.5 w-3.5" />
              <span>
                INTERACTIVE WORKFLOW BUILDER & TIME-SAVED ROI CALCULATOR
              </span>
            </div>
            <h2 className="mt-2 text-3xl font-extrabold tracking-tight text-white sm:text-4xl">
              Toggle the Manual Tasks You Want to Eliminate
            </h2>
            <p className="mt-2 text-base text-[#A8B1BE]">
              Select the modules your team currently performs by hand and adjust
              your operational parameters to estimate weekly hours recovered and
              annual cost savings.
            </p>
          </div>

          <div className="mt-10 grid grid-cols-1 gap-10 lg:grid-cols-12">
            {/* Left 7 Cols: Module Checkboxes & Team Sliders */}
            <div className="lg:col-span-7 space-y-6">
              <div className="rounded-2xl border border-[#A8B1BE]/25 bg-[#253B5B]/30 p-6">
                <div className="flex items-center justify-between mb-4">
                  <span className="font-mono text-xs uppercase tracking-wider text-[#27B58A]">
                    01 // SELECT MANUAL WORKFLOWS TO AUTOMATE
                  </span>
                  <button
                    type="button"
                    onClick={() =>
                      setSelectedModuleIds(
                        selectedModuleIds.length === AUTOMATION_MODULES.length
                          ? ["ai-customer-support", "whatsapp-automation"]
                          : AUTOMATION_MODULES.map((m) => m.id)
                      )
                    }
                    className="font-mono text-xs text-[#A8B1BE] hover:text-white underline cursor-pointer"
                  >
                    {selectedModuleIds.length === AUTOMATION_MODULES.length
                      ? "Reset to Core Pair"
                      : "Select All 10 Modules"}
                  </button>
                </div>

                <div className="grid grid-cols-1 gap-2.5 sm:grid-cols-2">
                  {AUTOMATION_MODULES.map((mod) => {
                    const checked = selectedModuleIds.includes(mod.id);
                    return (
                      <button
                        key={mod.id}
                        type="button"
                        onClick={() => toggleModuleInBuilder(mod.id)}
                        className={`flex items-center justify-between rounded-xl border p-3.5 text-left transition-all cursor-pointer ${
                          checked
                            ? "border-[#27B58A] bg-[#101D35] text-white"
                            : "border-[#A8B1BE]/20 bg-[#101D35]/40 text-[#A8B1BE] hover:border-[#A8B1BE]/50"
                        }`}
                      >
                        <div className="pr-2">
                          <p className="font-mono text-[10px] text-[#27B58A]">
                            {mod.code}
                          </p>
                          <p className="text-xs font-bold text-white">
                            {mod.title}
                          </p>
                        </div>
                        <div className="flex items-center gap-2 shrink-0">
                          <span className="font-mono text-xs text-[#A8B1BE]">
                            +{mod.timeSavedHoursPerWeek}h
                          </span>
                          <span
                            className={`inline-flex h-5 w-5 items-center justify-center rounded ${
                              checked
                                ? "bg-[#27B58A] text-[#101D35]"
                                : "border border-[#A8B1BE]/40"
                            }`}
                          >
                            {checked && <Check className="h-3.5 w-3.5" />}
                          </span>
                        </div>
                      </button>
                    );
                  })}
                </div>
              </div>

              {/* Team Size & Hourly Cost Controls */}
              <div className="rounded-2xl border border-[#A8B1BE]/25 bg-[#253B5B]/30 p-6 grid grid-cols-1 gap-6 sm:grid-cols-2">
                <div>
                  <div className="flex items-center justify-between">
                    <label className="font-mono text-xs uppercase text-[#A8B1BE]">
                      TEAM VOLUME MULTIPLIER
                    </label>
                    <span className="font-mono text-sm font-bold text-[#27B58A]">
                      {teamMultiplier}x Operations Scale
                    </span>
                  </div>
                  <input
                    type="range"
                    min={1}
                    max={5}
                    step={1}
                    value={teamMultiplier}
                    onChange={(e) => setTeamMultiplier(Number(e.target.value))}
                    className="mt-3 w-full accent-[#27B58A] cursor-pointer"
                  />
                  <div className="mt-1 flex justify-between font-mono text-[10px] text-[#A8B1BE]">
                    <span>1x (Solo / Small Team)</span>
                    <span>3x (SME)</span>
                    <span>5x (Multi-Dept)</span>
                  </div>
                </div>

                <div>
                  <div className="flex items-center justify-between">
                    <label className="font-mono text-xs uppercase text-[#A8B1BE]">
                      LOADED HOURLY STAFF COST
                    </label>
                    <span className="font-mono text-sm font-bold text-[#27B58A]">
                      €{hourlyRate} / hour
                    </span>
                  </div>
                  <input
                    type="range"
                    min={15}
                    max={75}
                    step={5}
                    value={hourlyRate}
                    onChange={(e) => setHourlyRate(Number(e.target.value))}
                    className="mt-3 w-full accent-[#27B58A] cursor-pointer"
                  />
                  <div className="mt-1 flex justify-between font-mono text-[10px] text-[#A8B1BE]">
                    <span>€15/hr</span>
                    <span>€35/hr</span>
                    <span>€75/hr</span>
                  </div>
                </div>
              </div>
            </div>

            {/* Right 5 Cols: Live Telemetry Output Card */}
            <div className="lg:col-span-5">
              <div className="rounded-2xl border border-[#27B58A]/50 bg-[#101D35] p-6 sm:p-8 shadow-2xl space-y-6">
                <div className="flex items-center justify-between border-b border-[#A8B1BE]/20 pb-4">
                  <span className="font-mono text-xs uppercase tracking-widest text-[#27B58A]">
                    ESTIMATED EFFICIENCY TELEMETRY
                  </span>
                  <span className="rounded bg-[#27B58A]/15 px-2.5 py-1 font-mono text-xs text-[#27B58A]">
                    {roiStats.activeMods.length} Modules Active
                  </span>
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div className="rounded-xl border border-[#A8B1BE]/20 bg-[#253B5B]/35 p-4">
                    <span className="font-mono text-[11px] uppercase text-[#A8B1BE]">
                      HOURS SAVED / WEEK
                    </span>
                    <p className="mt-1 text-3xl font-extrabold text-white">
                      {roiStats.weeklyHours} hrs
                    </p>
                    <p className="mt-0.5 font-mono text-[11px] text-[#27B58A]">
                      Every week recovered
                    </p>
                  </div>
                  <div className="rounded-xl border border-[#A8B1BE]/20 bg-[#253B5B]/35 p-4">
                    <span className="font-mono text-[11px] uppercase text-[#A8B1BE]">
                      HOURS SAVED / YEAR
                    </span>
                    <p className="mt-1 text-3xl font-extrabold text-white">
                      {roiStats.annualHours.toLocaleString()} hrs
                    </p>
                    <p className="mt-0.5 font-mono text-[11px] text-[#27B58A]">
                      ≈ {Math.round(roiStats.annualHours / 160)} full work
                      months
                    </p>
                  </div>
                </div>

                <div className="rounded-xl border border-[#27B58A]/40 bg-[#27B58A]/10 p-5">
                  <span className="font-mono text-xs uppercase tracking-wider text-[#27B58A]">
                    ESTIMATED ANNUAL PRODUCTIVITY VALUE UNLOCKED
                  </span>
                  <p className="mt-1 text-4xl font-extrabold text-white">
                    €{roiStats.annualSavingsEuro.toLocaleString()} / yr
                  </p>
                  <p className="mt-1 text-xs text-[#A8B1BE]">
                    Equivalent to{" "}
                    <strong className="text-white">
                      €{roiStats.monthlySavingsEuro.toLocaleString()}/month
                    </strong>{" "}
                    in reclaimed manual administrative & customer handling
                    capacity.
                  </p>
                </div>

                <div>
                  <p className="font-mono text-[11px] uppercase tracking-wider text-[#A8B1BE]">
                    YOUR CONFIGURED AUTOMATION STACK:
                  </p>
                  <div className="mt-2.5 flex flex-wrap gap-1.5">
                    {roiStats.activeMods.map((m) => (
                      <span
                        key={m.id}
                        className="rounded border border-[#A8B1BE]/30 bg-[#253B5B]/50 px-2.5 py-1 font-mono text-[11px] text-white"
                      >
                        {m.title}
                      </span>
                    ))}
                  </div>
                </div>

                <a
                  href="#consultation-form"
                  className="w-full inline-flex items-center justify-center gap-2 rounded-lg bg-[#27B58A] px-6 py-3.5 text-sm font-semibold text-[#101D35] hover:bg-[#1F9470] hover:text-white transition-colors"
                >
                  <span>Request Proposal for This Automation Stack</span>
                  <ArrowUpRight className="h-4 w-4" />
                </a>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Telemetry Infinite Marquee Strip */}
      <div className="border-b border-[#A8B1BE]/30 bg-[#101D35] py-3">
        <InfiniteMarquee
          items={MARQUEE_TICKER_ITEMS}
          speed={50}
          variant="telemetry"
        />
      </div>

      {/* =====================================================================
          4. "REQUEST AN AUTOMATION CONSULTATION" FORM SECTION
      ====================================================================== */}
      <section
        id="consultation-form"
        className="py-20 lg:py-24 stripe-mesh-light"
      >
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 gap-12 lg:grid-cols-12 lg:items-start">
            {/* Left Info Column */}
            <div className="lg:col-span-5 space-y-6">
              <div className="inline-flex items-center gap-2 font-mono text-xs uppercase tracking-widest text-[#253B5B]">
                <Sparkles className="h-4 w-4 text-[#27B58A]" />
                <span>SYSTEM ARCHITECTURE AUDIT // PILLAR 02</span>
              </div>
              <h2 className="text-3xl font-extrabold tracking-tight text-[#101D35] sm:text-4xl">
                Request an AI & Automation Consultation
              </h2>
              <p className="text-base leading-relaxed text-[#253B5B]">
                Whether you run an existing company in Cyprus or across the EU,
                or you are pairing AI automation with one of our Ready-to-Launch
                businesses, our engineers will map your workflows and deliver a
                clear implementation proposal.
              </p>

              <div className="space-y-3 pt-2">
                {[
                  {
                    title: "01 // Operational Bottleneck Audit",
                    desc: "We analyze where your team loses hours across WhatsApp, email, bookings, CRM, and invoicing.",
                  },
                  {
                    title: "02 // Custom System Architecture & Quote",
                    desc: "You receive a preliminary proposal detailing exact integrations, turnaround time, and fixed setup costs.",
                  },
                  {
                    title: "03 // Turnkey Deployment & Team Training",
                    desc: "We build, stress-test, and connect the workflows directly into your existing tools with zero downtime.",
                  },
                ].map((step) => (
                  <div
                    key={step.title}
                    className="rounded-xl border border-[#A8B1BE]/45 bg-white p-4"
                  >
                    <p className="font-mono text-xs font-bold text-[#101D35]">
                      {step.title}
                    </p>
                    <p className="mt-1 text-xs text-[#253B5B]">{step.desc}</p>
                  </div>
                ))}
              </div>
            </div>

            {/* Right Form Column */}
            <div className="lg:col-span-7">
              <div className="rounded-2xl border border-[#A8B1BE]/50 bg-white p-6 sm:p-8 shadow-lg">
                {referenceId ? (
                  <div className="py-10 text-center space-y-4">
                    <div className="mx-auto inline-flex h-14 w-14 items-center justify-center rounded-full bg-[#27B58A]/15 text-[#27B58A]">
                      <ShieldCheck className="h-7 w-7" />
                    </div>
                    <p className="font-mono text-xs uppercase tracking-widest text-[#27B58A]">
                      AUTOMATION CONSULTATION REGISTERED
                    </p>
                    <h3 className="text-2xl font-extrabold text-[#101D35]">
                      Reference ID: {referenceId}
                    </h3>
                    <p className="mx-auto max-w-md text-sm text-[#253B5B]">
                      Thank you, <strong>{name}</strong>. We have logged your
                      selected stack ({roiStats.activeMods.length} automation
                      modules, est.{" "}
                      <strong>{roiStats.weeklyHours} hrs/week saved</strong>).
                      Our AI & Automation architect will review your stack and
                      contact you with a preliminary proposal.
                    </p>
                    <button
                      type="button"
                      onClick={() => setReferenceId(null)}
                      className="mt-4 inline-flex items-center gap-2 rounded-lg bg-[#101D35] px-5 py-2.5 text-xs font-mono uppercase tracking-wider text-white hover:bg-[#253B5B] transition-colors cursor-pointer"
                    >
                      Modify Stack or Submit Another Request
                    </button>
                  </div>
                ) : (
                  <form
                    onSubmit={handleConsultationSubmit}
                    className="space-y-4"
                  >
                    <div className="border-b border-[#A8B1BE]/30 pb-3">
                      <span className="font-mono text-xs uppercase tracking-wider text-[#27B58A]">
                        DIRECT INTAKE // AI & AUTOMATION DESK
                      </span>
                      <h3 className="mt-1 text-xl font-bold text-[#101D35]">
                        Configure Your Automation Audit & Quotation
                      </h3>
                    </div>

                    <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
                      <div>
                        <label className="block font-mono text-[11px] uppercase tracking-wider text-[#253B5B]">
                          Full Name *
                        </label>
                        <input
                          type="text"
                          required
                          value={name}
                          onChange={(e) => setName(e.target.value)}
                          placeholder="e.g. Nikos Petrou"
                          className="mt-1.5 w-full rounded-lg border border-[#A8B1BE]/60 bg-[#F7F8FA] px-3.5 py-2.5 text-sm text-[#101D35] focus:border-[#27B58A] focus:outline-none"
                        />
                      </div>
                      <div>
                        <label className="block font-mono text-[11px] uppercase tracking-wider text-[#253B5B]">
                          Company / Business Name
                        </label>
                        <input
                          type="text"
                          value={companyName}
                          onChange={(e) => setCompanyName(e.target.value)}
                          placeholder="e.g. Petrou Commercial Ltd"
                          className="mt-1.5 w-full rounded-lg border border-[#A8B1BE]/60 bg-[#F7F8FA] px-3.5 py-2.5 text-sm text-[#101D35] focus:border-[#27B58A] focus:outline-none"
                        />
                      </div>
                    </div>

                    <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
                      <div>
                        <label className="block font-mono text-[11px] uppercase tracking-wider text-[#253B5B]">
                          Email Address *
                        </label>
                        <input
                          type="email"
                          required
                          value={email}
                          onChange={(e) => setEmail(e.target.value)}
                          placeholder="you@company.eu"
                          className="mt-1.5 w-full rounded-lg border border-[#A8B1BE]/60 bg-[#F7F8FA] px-3.5 py-2.5 text-sm text-[#101D35] focus:border-[#27B58A] focus:outline-none"
                        />
                      </div>
                      <div>
                        <label className="block font-mono text-[11px] uppercase tracking-wider text-[#253B5B]">
                          WhatsApp Number *
                        </label>
                        <input
                          type="tel"
                          required
                          value={whatsapp}
                          onChange={(e) => setWhatsapp(e.target.value)}
                          placeholder="+357 99 000 000"
                          className="mt-1.5 w-full rounded-lg border border-[#A8B1BE]/60 bg-[#F7F8FA] px-3.5 py-2.5 text-sm text-[#101D35] focus:border-[#27B58A] focus:outline-none"
                        />
                      </div>
                    </div>

                    <div>
                      <label className="block font-mono text-[11px] uppercase tracking-wider text-[#253B5B]">
                        Selected Automation Modules ({roiStats.activeMods.length}{" "}
                        Active — Click to Toggle)
                      </label>
                      <div className="mt-2 flex flex-wrap gap-1.5">
                        {AUTOMATION_MODULES.map((m) => {
                          const active = selectedModuleIds.includes(m.id);
                          return (
                            <button
                              key={m.id}
                              type="button"
                              onClick={() => toggleModuleInBuilder(m.id)}
                              className={`rounded-md px-2.5 py-1 font-mono text-[11px] transition-colors cursor-pointer ${
                                active
                                  ? "bg-[#101D35] text-[#27B58A] font-semibold"
                                  : "border border-[#A8B1BE]/50 bg-[#F7F8FA] text-[#253B5B]"
                              }`}
                            >
                              {active ? "✓ " : "+ "}
                              {m.title}
                            </button>
                          );
                        })}
                      </div>
                    </div>

                    <div>
                      <label className="block font-mono text-[11px] uppercase tracking-wider text-[#253B5B]">
                        Current Tools / Platforms You Use
                      </label>
                      <input
                        type="text"
                        value={currentStack}
                        onChange={(e) => setCurrentStack(e.target.value)}
                        placeholder="e.g. WhatsApp, Gmail, HubSpot, Calendly, Xero..."
                        className="mt-1.5 w-full rounded-lg border border-[#A8B1BE]/60 bg-[#F7F8FA] px-3.5 py-2.5 text-sm text-[#101D35] focus:border-[#27B58A] focus:outline-none"
                      />
                    </div>

                    <div>
                      <label className="block font-mono text-[11px] uppercase tracking-wider text-[#253B5B]">
                        What Manual Work or Bottleneck Should We Eliminate First?
                      </label>
                      <textarea
                        rows={3}
                        value={bottleneckNotes}
                        onChange={(e) => setBottleneckNotes(e.target.value)}
                        placeholder="Describe your daily customer inquiries, booking flow, CRM updates, or invoice process..."
                        className="mt-1.5 w-full rounded-lg border border-[#A8B1BE]/60 bg-[#F7F8FA] px-3.5 py-2.5 text-sm text-[#101D35] focus:border-[#27B58A] focus:outline-none"
                      />
                    </div>

                    <button
                      type="submit"
                      disabled={isSubmitting}
                      className="w-full inline-flex items-center justify-center gap-2 rounded-lg bg-[#27B58A] px-6 py-3.5 text-sm font-semibold text-[#101D35] hover:bg-[#1F9470] hover:text-white transition-colors cursor-pointer"
                    >
                      <Send className="h-4 w-4" />
                      <span>
                        {isSubmitting
                          ? "Registering Automation Consultation..."
                          : "Request Automation Consultation & Free Proposal"}
                      </span>
                    </button>
                  </form>
                )}
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
