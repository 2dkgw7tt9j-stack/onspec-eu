"use client";

import React, { useState } from "react";
import Link from "next/link";
import {
  Cpu,
  Zap,
  ArrowUpRight,
  CheckCircle2,
  Activity,
  Terminal,
  RefreshCw,
  Clock,
  Layers,
  MessageSquare,
  Mail,
  Calendar,
  Database,
  FileText,
  Workflow,
  Network,
} from "lucide-react";
import {
  AUTOMATION_MODULES,
  CONNECTED_PLATFORMS_MATRIX,
  AutomationModule,
} from "@/data/onspec-data";

const CATEGORY_FILTERS = [
  "All Systems",
  "Customer Facing",
  "Operations & CRM",
  "Finance & Admin",
  "Infrastructure",
] as const;

export function AutomationInteractiveConsole() {
  const [selectedCategory, setSelectedCategory] =
    useState<(typeof CATEGORY_FILTERS)[number]>("All Systems");
  const [activeModule, setActiveModule] = useState<AutomationModule>(
    AUTOMATION_MODULES[0]
  );
  const [simulating, setSimulating] = useState(false);
  const [simStep, setSimStep] = useState<0 | 1 | 2 | 3>(3);

  const filteredModules =
    selectedCategory === "All Systems"
      ? AUTOMATION_MODULES
      : AUTOMATION_MODULES.filter((m) => m.category === selectedCategory);

  const handleSelectModule = (mod: AutomationModule) => {
    setActiveModule(mod);
    setSimStep(3);
    setSimulating(false);
  };

  const runLiveSimulation = () => {
    if (simulating) return;
    setSimulating(true);
    setSimStep(1);
    setTimeout(() => {
      setSimStep(2);
    }, 450);
    setTimeout(() => {
      setSimStep(3);
      setSimulating(false);
    }, 1050);
  };

  const getModuleIcon = (id: string) => {
    switch (id) {
      case "ai-customer-support":
      case "whatsapp-automation":
        return <MessageSquare className="h-4 w-4 text-white" />;
      case "email-management":
        return <Mail className="h-4 w-4 text-white" />;
      case "ai-booking-assistants":
        return <Calendar className="h-4 w-4 text-white" />;
      case "customer-enquiry-handling":
      case "crm-automation":
        return <Database className="h-4 w-4 text-white" />;
      case "administrative-workflows":
      case "invoice-bookkeeping-workflows":
        return <FileText className="h-4 w-4 text-white" />;
      case "business-process-automation":
        return <Workflow className="h-4 w-4 text-white" />;
      default:
        return <Network className="h-4 w-4 text-white" />;
    }
  };

  const totalWeeklyHoursSaved = AUTOMATION_MODULES.reduce(
    (acc, item) => acc + item.timeSavedHoursPerWeek,
    0
  );

  return (
    <section
      id="automate-systems"
      className="relative border-y border-neutral-800 bg-black tech-grid-dark py-24 text-white"
    >
      <div className="mx-auto max-w-7xl px-4 sm:px-6">
        {/* Top Section Header */}
        <div className="flex flex-col justify-between gap-8 border-b border-[#A8B1BE]/20 pb-12 lg:flex-row lg:items-end">
          <div className="max-w-3xl">
            <div className="inline-flex items-center gap-2.5 rounded-full border border-[#A8B1BE]/25 bg-neutral-900/70 px-3.5 py-1.5">
              <span className="h-2 w-2 rounded-full bg-white animate-pulse" />
              <span className="font-mono text-xs uppercase tracking-widest text-[#F7F8FA]/90">
                Pillar 02 — AI & Business Automation
              </span>
            </div>
            <h2 className="mt-5 text-3xl font-extrabold tracking-tight text-[#F7F8FA] sm:text-5xl">
              Smarter systems. Less repetitive work.
            </h2>
            <p className="mt-3 font-mono text-sm uppercase tracking-wider text-white/80">
              &ldquo;Your business doesn&rsquo;t need more manual work. It needs
              smarter systems.&rdquo;
            </p>
            <p className="mt-4 text-base leading-relaxed text-[#F7F8FA]/80">
              We design and integrate practical AI agents, omnichannel workflows,
              email triage, autonomous booking assistants, and CRM/accounting
              pipelines that eliminate bottlenecks, reduce costly manual overhead,
              and allow your business to respond 24/7.
            </p>
          </div>

          <div className="flex flex-col items-start gap-3 sm:flex-row lg:flex-col lg:items-end">
            <div className="rounded-lg border border-[#A8B1BE]/25 bg-neutral-900/60 px-4 py-3 backdrop-blur-sm">
              <p className="font-mono text-[10px] uppercase tracking-widest text-[#A8B1BE]">
                FULL STACK EFFICIENCY POTENTIAL
              </p>
              <p className="mt-1 text-xl font-extrabold text-white">
                {totalWeeklyHoursSaved}+ hrs / week saved
              </p>
            </div>
            <Link
              href="/ai-web"
              className="inline-flex items-center gap-2 rounded-lg bg-white px-5 py-3 text-xs font-mono font-bold uppercase tracking-wider text-black hover:bg-[#F7F8FA] transition-colors"
            >
              <span>EXPLORE ALL AI & AUTOMATION SYSTEMS</span>
              <ArrowUpRight className="h-4 w-4" />
            </Link>
          </div>
        </div>

        {/* Filter Bar */}
        <div className="mt-8 flex flex-wrap items-center justify-between gap-4">
          <div className="flex flex-wrap items-center gap-2">
            {CATEGORY_FILTERS.map((cat) => {
              const active = selectedCategory === cat;
              return (
                <button
                  key={cat}
                  type="button"
                  onClick={() => setSelectedCategory(cat)}
                  className={`rounded-lg border px-3.5 py-2 font-mono text-xs uppercase tracking-wider transition-all cursor-pointer ${
                    active
                      ? "border-white bg-white text-black font-bold"
                      : "border-[#A8B1BE]/25 bg-neutral-900/50 text-[#F7F8FA]/80 hover:border-[#A8B1BE]/60 hover:text-white"
                  }`}
                >
                  {cat}
                </button>
              );
            })}
          </div>
          <div className="flex items-center gap-2 font-mono text-xs text-[#A8B1BE]">
            <Activity className="h-3.5 w-3.5 text-white/80" />
            <span>INTERACTIVE SYSTEM TELEMETRY SIMULATOR</span>
          </div>
        </div>

        {/* Main Interactive Console Grid */}
        <div className="mt-8 grid grid-cols-1 gap-6 lg:grid-cols-12">
          {/* Left Column: Selectable Automation Modules List */}
          <div className="lg:col-span-5 space-y-2.5 max-h-[600px] overflow-y-auto pr-1">
            {filteredModules.map((mod) => {
              const isSelected = activeModule.id === mod.id;
              return (
                <button
                  key={mod.id}
                  type="button"
                  onClick={() => handleSelectModule(mod)}
                  className={`w-full text-left rounded-xl border p-4 transition-all cursor-pointer ${
                    isSelected
                      ? "border-white/80 bg-neutral-900 shadow-lg"
                      : "border-[#A8B1BE]/20 bg-black/80 hover:border-[#A8B1BE]/50 hover:bg-neutral-900/60"
                  }`}
                >
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      {getModuleIcon(mod.id)}
                      <span className="font-mono text-[11px] uppercase tracking-wider text-white/90">
                        {mod.code}
                      </span>
                    </div>
                    <span className="rounded bg-black/80 px-2 py-0.5 font-mono text-[10px] text-[#A8B1BE]">
                      -{mod.timeSavedHoursPerWeek}h / wk
                    </span>
                  </div>
                  <h3 className="mt-2 text-base font-bold text-[#F7F8FA]">
                    {mod.title}
                  </h3>
                  <p className="mt-1 text-xs leading-relaxed text-[#F7F8FA]/75 line-clamp-2">
                    {mod.tagline}
                  </p>
                </button>
              );
            })}
          </div>

          {/* Right Column: Live Telemetry Simulation Engine */}
          <div className="lg:col-span-7 flex flex-col justify-between rounded-2xl border border-[#A8B1BE]/30 bg-black/95 p-6 sm:p-8 shadow-2xl">
            <div>
              {/* Top Console Bar */}
              <div className="flex flex-wrap items-center justify-between gap-4 border-b border-[#A8B1BE]/20 pb-5">
                <div>
                  <div className="flex items-center gap-2">
                    <span className="h-2 w-2 rounded-full bg-white" />
                    <span className="font-mono text-xs uppercase tracking-widest text-white/80">
                      {activeModule.code} • {activeModule.category}
                    </span>
                  </div>
                  <h3 className="mt-1.5 text-2xl font-extrabold text-[#F7F8FA]">
                    {activeModule.title}
                  </h3>
                </div>
                <button
                  type="button"
                  onClick={runLiveSimulation}
                  className="inline-flex items-center gap-2 rounded-lg border border-white/40 bg-white/10 px-3.5 py-2 font-mono text-xs uppercase tracking-wider text-white hover:bg-white hover:text-black transition-colors cursor-pointer"
                >
                  <RefreshCw
                    className={`h-3.5 w-3.5 ${simulating ? "animate-spin" : ""}`}
                  />
                  <span>
                    {simulating ? "EXECUTING PIPELINE..." : "SIMULATE WORKFLOW"}
                  </span>
                </button>
              </div>

              {/* Description & Metrics */}
              <p className="mt-5 text-sm leading-relaxed text-[#F7F8FA]/85">
                {activeModule.description}
              </p>

              <div className="mt-5 grid grid-cols-1 gap-3 sm:grid-cols-3">
                <div className="rounded-lg border border-[#A8B1BE]/20 bg-neutral-900/60 p-3.5">
                  <div className="flex items-center gap-1.5 font-mono text-[10px] uppercase text-[#A8B1BE]">
                    <Zap className="h-3.5 w-3.5 text-white/80" />
                    <span>EFFICIENCY BENCHMARK</span>
                  </div>
                  <p className="mt-1 text-sm font-bold text-[#F7F8FA]">
                    {activeModule.efficiencyMetric}
                  </p>
                </div>
                <div className="rounded-lg border border-[#A8B1BE]/20 bg-neutral-900/60 p-3.5">
                  <div className="flex items-center gap-1.5 font-mono text-[10px] uppercase text-[#A8B1BE]">
                    <Clock className="h-3.5 w-3.5 text-white/80" />
                    <span>MANUAL HOURS SAVED</span>
                  </div>
                  <p className="mt-1 text-sm font-bold text-white">
                    ~{activeModule.timeSavedHoursPerWeek} Hours / Week
                  </p>
                </div>
                <div className="rounded-lg border border-[#A8B1BE]/20 bg-neutral-900/60 p-3.5">
                  <div className="flex items-center gap-1.5 font-mono text-[10px] uppercase text-[#A8B1BE]">
                    <Layers className="h-3.5 w-3.5 text-white/80" />
                    <span>CONNECTED NODES</span>
                  </div>
                  <p className="mt-1 text-sm font-bold text-[#F7F8FA]">
                    {activeModule.connectedPlatforms.length} Active Integrations
                  </p>
                </div>
              </div>

              {/* Live Workflow Pipeline Visualization */}
              <div className="mt-6 rounded-xl border border-[#A8B1BE]/25 bg-neutral-900/40 p-5">
                <div className="flex items-center justify-between font-mono text-[11px] uppercase tracking-wider text-[#A8B1BE]">
                  <span className="inline-flex items-center gap-2">
                    <Terminal className="h-3.5 w-3.5 text-white/80" />
                    REAL-TIME AUTOMATION EXECUTION TRACE
                  </span>
                  <span className="text-white font-semibold">STATUS: AUTONOMOUS</span>
                </div>

                <div className="mt-4 grid grid-cols-1 gap-3 md:grid-cols-2">
                  {/* Trigger Node */}
                  <div
                    className={`rounded-lg border p-3.5 transition-all ${
                      simStep >= 1
                        ? "border-white/40 bg-black"
                        : "border-[#A8B1BE]/20 bg-black/50 opacity-50"
                    }`}
                  >
                    <div className="flex items-center justify-between">
                      <span className="font-mono text-[10px] uppercase tracking-wider text-[#A8B1BE]">
                        Step 01 • Inbound Event Trigger
                      </span>
                      <span className="h-2 w-2 rounded-full bg-white" />
                    </div>
                    <p className="mt-2 text-xs font-medium leading-relaxed text-[#F7F8FA]">
                      &ldquo;{activeModule.sampleTrigger}&rdquo;
                    </p>
                  </div>

                  {/* Action Node */}
                  <div
                    className={`rounded-lg border p-3.5 transition-all ${
                      simStep >= 3
                        ? "border-white/50 bg-black"
                        : "border-[#A8B1BE]/20 bg-black/50 opacity-60"
                    }`}
                  >
                    <div className="flex items-center justify-between">
                      <span className="font-mono text-[10px] uppercase tracking-wider text-white/90">
                        Step 02 • Onspec Autonomous Action
                      </span>
                      <span className="font-mono text-[10px] text-white/90">
                        {simStep >= 3 ? "COMPLETED < 400ms" : "PROCESSING..."}
                      </span>
                    </div>
                    <p className="mt-2 text-xs font-semibold leading-relaxed text-[#F7F8FA]">
                      {activeModule.sampleAction}
                    </p>
                  </div>
                </div>
              </div>

              {/* Capabilities Checklist */}
              <div className="mt-6">
                <p className="font-mono text-xs uppercase tracking-wider text-[#A8B1BE]">
                  INCLUDED CAPABILITIES & GUARDRAILS
                </p>
                <div className="mt-3 grid grid-cols-1 gap-2.5 sm:grid-cols-2">
                  {activeModule.capabilities.map((cap) => (
                    <div
                      key={cap}
                      className="flex items-start gap-2 rounded-lg border border-[#A8B1BE]/15 bg-neutral-900/35 p-2.5 text-xs text-[#F7F8FA]/90"
                    >
                      <CheckCircle2 className="mt-0.5 h-3.5 w-3.5 shrink-0 text-white" />
                      <span>{cap}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            {/* Bottom Connected Platforms Strip inside Console */}
            <div className="mt-6 flex flex-wrap items-center justify-between gap-4 border-t border-[#A8B1BE]/20 pt-5">
              <div className="flex flex-wrap items-center gap-1.5">
                <span className="mr-1 font-mono text-[10px] uppercase tracking-wider text-[#A8B1BE]">
                  PLATFORMS:
                </span>
                {activeModule.connectedPlatforms.map((plat) => (
                  <span
                    key={plat}
                    className="rounded border border-[#A8B1BE]/25 bg-neutral-900/70 px-2.5 py-1 font-mono text-[11px] text-[#F7F8FA]"
                  >
                    {plat}
                  </span>
                ))}
              </div>
              <Link
                href="/ai-web"
                className="inline-flex items-center gap-1.5 font-mono text-xs font-semibold uppercase tracking-wider text-white hover:underline"
              >
                <span>Deploy This Module</span>
                <ArrowUpRight className="h-3.5 w-3.5" />
              </Link>
            </div>
          </div>
        </div>

        {/* Connected Platforms Matrix (All 6 Core Platforms) */}
        <div className="mt-12 rounded-2xl border border-[#A8B1BE]/25 bg-neutral-900/50 p-6 sm:p-8">
          <div className="flex flex-col justify-between gap-4 border-b border-[#A8B1BE]/20 pb-5 sm:flex-row sm:items-center">
            <div>
              <p className="font-mono text-xs uppercase tracking-widest text-white/80">
                Unified Integration Bus • Connected Platforms
              </p>
              <h3 className="mt-1 text-xl font-bold text-[#F7F8FA]">
                Every communication, booking, and management tool synchronized.
              </h3>
            </div>
            <span className="inline-flex items-center gap-2 rounded-full border border-white/20 bg-white/10 px-3.5 py-1.5 font-mono text-xs text-white">
              <Cpu className="h-3.5 w-3.5" />
              BI-DIRECTIONAL REAL-TIME SYNC
            </span>
          </div>

          <div className="mt-6 grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {CONNECTED_PLATFORMS_MATRIX.map((node) => (
              <div
                key={node.id}
                className="rounded-xl border border-[#A8B1BE]/20 bg-black/85 p-4 transition-colors hover:border-white/40"
              >
                <div className="flex items-center justify-between">
                  <span className="font-mono text-[11px] text-white/90">
                    {node.code}
                  </span>
                  <span className="inline-flex items-center gap-1.5 font-mono text-[10px] text-[#A8B1BE]">
                    <span className="h-1.5 w-1.5 rounded-full bg-white" />
                    SYNC {node.latency}
                  </span>
                </div>
                <h4 className="mt-2 text-sm font-bold text-[#F7F8FA]">
                  {node.name}
                </h4>
                <p className="mt-1 text-xs leading-relaxed text-[#F7F8FA]/75">
                  {node.role}
                </p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

export default AutomationInteractiveConsole;
