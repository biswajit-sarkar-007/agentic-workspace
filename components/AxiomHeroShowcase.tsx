"use client";

import React, { useState } from "react";
import {
  FileText,
  LayoutGrid,
  Columns2,
  Sparkles,
  Share2,
  CheckCircle2,
  Layers,
  ArrowRight,
  Database,
  Server,
  Cpu,
} from "lucide-react";

type ActiveTab = "both" | "doc" | "canvas";

/**
 * AxiomHeroShowcase - High-fidelity vector product UI replacement for video/static media.
 * Renders an interactive, theme-aware simulation of Axiom's dual-surface workspace with
 * live agent synthesis, architecture nodes, orthogonal data pipelines, and technical specs.
 */
export function AxiomHeroShowcase() {
  const [activeTab, setActiveTab] = useState<ActiveTab>("both");
  const [isHovered, setIsHovered] = useState(false);

  return (
    <div
      className="group relative mx-auto w-full max-w-5xl transition-all duration-300"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      {/* Product Window Frame according to DESIGN.MD */}
      <div className="relative overflow-hidden rounded-[16px] border border-[#23252a] bg-[#08090a] shadow-[0_24px_50px_-12px_rgba(0,0,0,0.8),inset_0_1px_0_0_rgba(255,255,255,0.08)]">
        {/* App Window Header / Minimal Chrome */}
        <div className="flex h-11 items-center justify-between border-b border-[#23252a] bg-[#0c0d0e] px-4">
          {/* Window dots + Breadcrumb */}
          <div className="flex items-center gap-3">
            <div className="flex items-center gap-1.5" aria-hidden="true">
              <span className="size-2.5 rounded-full bg-[#23252a] transition-colors group-hover:bg-[#31353d]" />
              <span className="size-2.5 rounded-full bg-[#23252a] transition-colors group-hover:bg-[#31353d]" />
              <span className="size-2.5 rounded-full bg-[#23252a] transition-colors group-hover:bg-[#31353d]" />
            </div>

            <div className="hidden h-3.5 w-px bg-[#23252a] sm:block" />

            <div className="flex items-center gap-2 text-xs">
              <span className="text-[#8a8f98]">workspace</span>
              <span className="text-[#62666d]">/</span>
              <span className="font-medium text-[#f7f8f8]">
                event-pipeline-v3.axiom
              </span>
              <span className="ml-2 inline-flex items-center gap-1.5 rounded-full border border-[#27a644]/25 bg-[#27a644]/10 px-2 py-0.5 text-[11px] font-medium text-[#27a644]">
                <span className="size-1.5 animate-pulse rounded-full bg-[#27a644]" />
                Agent Synced
              </span>
            </div>
          </div>

          {/* Center: Surface Mode Tabs */}
          <div className="flex items-center rounded-lg border border-[#23252a] bg-[#010102] p-0.5">
            <button
              type="button"
              onClick={() => setActiveTab("doc")}
              className={`flex items-center gap-1.5 rounded-md px-2.5 py-1 text-xs font-medium transition-colors ${
                activeTab === "doc"
                  ? "bg-[#121316] text-[#f7f8f8]"
                  : "text-[#8a8f98] hover:text-[#f7f8f8]"
              }`}
            >
              <FileText className="size-3" />
              <span className="hidden sm:inline">Spec</span>
            </button>
            <button
              type="button"
              onClick={() => setActiveTab("both")}
              className={`flex items-center gap-1.5 rounded-md px-2.5 py-1 text-xs font-medium transition-colors ${
                activeTab === "both"
                  ? "bg-[#121316] text-[#f7f8f8]"
                  : "text-[#8a8f98] hover:text-[#f7f8f8]"
              }`}
            >
              <Columns2 className="size-3" />
              <span className="hidden sm:inline">Split</span>
            </button>
            <button
              type="button"
              onClick={() => setActiveTab("canvas")}
              className={`flex items-center gap-1.5 rounded-md px-2.5 py-1 text-xs font-medium transition-colors ${
                activeTab === "canvas"
                  ? "bg-[#121316] text-[#f7f8f8]"
                  : "text-[#8a8f98] hover:text-[#f7f8f8]"
              }`}
            >
              <LayoutGrid className="size-3" />
              <span className="hidden sm:inline">Canvas</span>
            </button>
          </div>

          {/* Right: Presence + Agent Status */}
          <div className="flex items-center gap-2">
            <div className="hidden items-center -space-x-1 sm:flex" aria-label="Active collaborators">
              <span
                className="flex size-5 items-center justify-center rounded-full border border-[#08090a] bg-[#5e6ad2] text-[9px] font-semibold text-white"
                title="Axiom Agent"
              >
                A
              </span>
              <span
                className="flex size-5 items-center justify-center rounded-full border border-[#08090a] bg-[#27a644] text-[9px] font-semibold text-white"
                title="Sarah L."
              >
                S
              </span>
              <span
                className="flex size-5 items-center justify-center rounded-full border border-[#08090a] bg-[#8a8f98] text-[9px] font-semibold text-white"
                title="Devon K."
              >
                D
              </span>
            </div>
            <div className="h-3.5 w-px bg-[#23252a] hidden sm:block" />
            <div className="flex items-center gap-1.5 rounded-md border border-[#23252a] bg-[#121316] px-2 py-1 text-[11px] font-medium text-[#d0d6e0]">
              <Sparkles className="size-3 text-[#5e6ad2]" />
              <span className="hidden sm:inline">Agent Active</span>
            </div>
          </div>
        </div>

        {/* Dual Surface Workspace Body */}
        <div className="grid h-[440px] grid-cols-1 sm:h-[480px] md:grid-cols-12 md:h-[520px]">
          {/* Left Pane: Technical Specification (Docs) */}
          {(activeTab === "both" || activeTab === "doc") && (
            <div
              className={`flex flex-col overflow-y-auto border-r border-[#23252a] bg-[#08090a] p-5 transition-all duration-200 ${
                activeTab === "both" ? "md:col-span-5" : "md:col-span-12"
              }`}
            >
              <div className="flex items-center gap-2 text-[11px] font-mono tracking-wider uppercase text-[#62666d]">
                <span>ARCH-DOC-01</span>
                <span>·</span>
                <span className="text-[#5e6ad2]">AUTONOMOUS SYNTHESIS</span>
              </div>

              <h3 className="mt-2 text-lg font-semibold tracking-tight text-[#f7f8f8]">
                Distributed Event Ingestion Topology
              </h3>

              <p className="mt-2 text-xs leading-relaxed text-[#8a8f98]">
                The ingress layer routes incoming telemetry via Edge Gateway into
                a distributed partitioned queue. Workers process stream payloads
                into hot memory and persistent store concurrently.
              </p>

              {/* Agent Generated Callout Block */}
              <div className="mt-4 rounded-lg border border-[#23252a] bg-[#0c0d0e] p-3 text-xs">
                <div className="flex items-center justify-between pb-1.5 border-b border-[#1b1c20]">
                  <span className="flex items-center gap-1.5 font-mono text-[11px] text-[#5e6ad2]">
                    <Sparkles className="size-3" />
                    Agent Verification
                  </span>
                  <span className="text-[10px] text-[#62666d]">Just now</span>
                </div>
                <div className="mt-2 space-y-1.5 text-[11px] text-[#d0d6e0]">
                  <div className="flex items-center gap-2">
                    <CheckCircle2 className="size-3 text-[#27a644]" />
                    <span>Throughput model: 120,000 evt/sec verified</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <CheckCircle2 className="size-3 text-[#27a644]" />
                    <span>Schema parity validated against Canvas node #ERD-04</span>
                  </div>
                </div>
              </div>

              {/* Code Snippet in Linear Mono */}
              <div className="mt-4 rounded-lg border border-[#23252a] bg-[#010102] p-3 font-mono text-[11px] leading-5 text-[#d0d6e0]">
                <div className="text-[#62666d]">// Type Contract generated from Canvas</div>
                <div>
                  <span className="text-[#828fff]">interface</span>{" "}
                  <span className="text-[#f7f8f8]">EventPayload</span> &#123;
                </div>
                <div className="pl-4">
                  <span className="text-[#8a8f98]">id</span>:{" "}
                  <span className="text-[#828fff]">string</span>;
                </div>
                <div className="pl-4">
                  <span className="text-[#8a8f98]">topic</span>:{" "}
                  <span className="text-[#828fff]">&quot;auth&quot; | &quot;telemetry&quot;</span>;
                </div>
                <div className="pl-4">
                  <span className="text-[#8a8f98]">timestamp</span>:{" "}
                  <span className="text-[#828fff]">number</span>;
                </div>
                <div className="pl-4">
                  <span className="text-[#8a8f98]">partitionKey</span>:{" "}
                  <span className="text-[#828fff]">UUID</span>;
                </div>
                <div>&#125;</div>
              </div>

              {/* Real-time Agent Synthesis Stream Indicator */}
              <div className="mt-auto pt-4 flex items-center justify-between text-[11px] border-t border-[#1b1c20] text-[#62666d]">
                <span className="flex items-center gap-1.5">
                  <span className="size-1.5 rounded-full bg-[#5e6ad2] animate-ping" />
                  Generating migration scripts...
                </span>
                <span className="font-mono text-[10px]">14 blocks synced</span>
              </div>
            </div>
          )}

          {/* Right Pane: Infinite Vector Architecture Canvas */}
          {(activeTab === "both" || activeTab === "canvas") && (
            <div
              className={`relative overflow-hidden bg-[#010102] select-none ${
                activeTab === "both" ? "md:col-span-7" : "md:col-span-12"
              }`}
            >
              {/* Precision Canvas Grid (Dark Canvas with hairline grid) */}
              <div
                className="absolute inset-0 opacity-[0.25]"
                style={{
                  backgroundImage:
                    "radial-gradient(#31353d 1px, transparent 1px)",
                  backgroundSize: "20px 20px",
                }}
              />

              {/* High-Fidelity SVG Diagram */}
              <svg
                viewBox="0 0 600 480"
                className="relative h-full w-full"
                preserveAspectRatio="xMidYMid meet"
              >
                <defs>
                  {/* Lavender Arrow Marker */}
                  <marker
                    id="linearArrow"
                    viewBox="0 0 8 8"
                    refX="6"
                    refY="4"
                    markerWidth="6"
                    markerHeight="6"
                    orient="auto-start-reverse"
                  >
                    <path d="M 0 1 L 7 4 L 0 7 z" fill="#5e6ad2" />
                  </marker>

                  {/* Hairline Muted Marker */}
                  <marker
                    id="mutedArrow"
                    viewBox="0 0 8 8"
                    refX="6"
                    refY="4"
                    markerWidth="6"
                    markerHeight="6"
                    orient="auto-start-reverse"
                  >
                    <path d="M 0 1 L 7 4 L 0 7 z" fill="#31353d" />
                  </marker>

                  {/* Pulse gradient along paths */}
                  <linearGradient id="streamGrad" x1="0%" y1="0%" x2="100%" y2="0%">
                    <stop offset="0%" stopColor="#5e6ad2" stopOpacity="0.1" />
                    <stop offset="50%" stopColor="#828fff" stopOpacity="1" />
                    <stop offset="100%" stopColor="#5e6ad2" stopOpacity="0.1" />
                  </linearGradient>
                </defs>

                {/* --- Orthogonal Connection Pipelines --- */}
                {/* Gateway -> Event Stream */}
                <path
                  d="M 150 140 L 230 140"
                  stroke="#5e6ad2"
                  strokeWidth="1.5"
                  fill="none"
                  markerEnd="url(#linearArrow)"
                />
                {/* Animated Pulse Beam along Gateway -> Event Stream */}
                <path
                  d="M 150 140 L 230 140"
                  stroke="url(#streamGrad)"
                  strokeWidth="2.5"
                  strokeDasharray="15 35"
                  fill="none"
                  className="animate-[dash_2s_linear_infinite]"
                />

                {/* Event Stream -> Worker Cluster */}
                <path
                  d="M 370 140 L 440 140"
                  stroke="#5e6ad2"
                  strokeWidth="1.5"
                  fill="none"
                  markerEnd="url(#linearArrow)"
                />

                {/* Worker Cluster -> Vector Store (Down-Right) */}
                <path
                  d="M 505 180 L 505 270"
                  stroke="#31353d"
                  strokeWidth="1.5"
                  fill="none"
                  markerEnd="url(#mutedArrow)"
                />

                {/* Worker Cluster -> Primary DB (Orthogonal loop) */}
                <path
                  d="M 440 160 L 300 160 L 300 270"
                  stroke="#5e6ad2"
                  strokeWidth="1.5"
                  strokeDasharray="4 4"
                  fill="none"
                  markerEnd="url(#linearArrow)"
                />

                {/* --- NODE 1: Ingress Edge Gateway --- */}
                <g transform="translate(30, 95)">
                  <rect
                    width="120"
                    height="90"
                    rx="12"
                    fill="#08090a"
                    stroke="#23252a"
                    strokeWidth="1"
                    className="transition-colors hover:stroke-[#5e6ad2]"
                  />
                  <rect
                    x="10"
                    y="10"
                    width="24"
                    height="24"
                    rx="6"
                    fill="#121316"
                    stroke="#23252a"
                    strokeWidth="1"
                  />
                  <circle cx="22" cy="22" r="4" fill="#5e6ad2" />
                  <text
                    x="42"
                    y="24"
                    fill="#f7f8f8"
                    fontSize="11"
                    fontWeight="600"
                    fontFamily="inherit"
                  >
                    Edge Ingress
                  </text>
                  <text
                    x="12"
                    y="52"
                    fill="#8a8f98"
                    fontSize="9"
                    fontFamily="inherit"
                  >
                    Envoy Proxy v1.28
                  </text>
                  <rect
                    x="12"
                    y="62"
                    width="62"
                    height="16"
                    rx="4"
                    fill="#121316"
                  />
                  <text
                    x="18"
                    y="73"
                    fill="#27a644"
                    fontSize="8.5"
                    fontFamily="inherit"
                  >
                    ● 45k req/s
                  </text>
                </g>

                {/* --- NODE 2: Event Stream Broker --- */}
                <g transform="translate(230, 85)">
                  <rect
                    width="140"
                    height="110"
                    rx="12"
                    fill="#0c0d0e"
                    stroke="#5e6ad2"
                    strokeWidth="1.25"
                    className="shadow-[0_0_15px_rgba(94,106,210,0.15)]"
                  />
                  <rect
                    x="10"
                    y="10"
                    width="24"
                    height="24"
                    rx="6"
                    fill="#151618"
                    stroke="#23252a"
                    strokeWidth="1"
                  />
                  <polygon
                    points="18,17 27,22 18,27"
                    fill="#5e6ad2"
                  />
                  <text
                    x="42"
                    y="24"
                    fill="#f7f8f8"
                    fontSize="11"
                    fontWeight="600"
                    fontFamily="inherit"
                  >
                    Event Broker
                  </text>
                  <text
                    x="12"
                    y="52"
                    fill="#8a8f98"
                    fontSize="9"
                    fontFamily="inherit"
                  >
                    Topic: telemetry.events
                  </text>
                  <text
                    x="12"
                    y="67"
                    fill="#62666d"
                    fontSize="8.5"
                    fontFamily="monospace"
                  >
                    partitions: 16 | rep: 3
                  </text>
                  <rect
                    x="12"
                    y="78"
                    width="116"
                    height="18"
                    rx="4"
                    fill="#121316"
                    stroke="#23252a"
                    strokeWidth="0.5"
                  />
                  <text
                    x="20"
                    y="90"
                    fill="#d0d6e0"
                    fontSize="8.5"
                    fontFamily="monospace"
                  >
                    Axiom Synced · 0 lag
                  </text>
                </g>

                {/* --- NODE 3: Stream Consumer Cluster --- */}
                <g transform="translate(440, 100)">
                  <rect
                    width="130"
                    height="80"
                    rx="12"
                    fill="#08090a"
                    stroke="#23252a"
                    strokeWidth="1"
                    className="transition-colors hover:stroke-[#5e6ad2]"
                  />
                  <text
                    x="14"
                    y="24"
                    fill="#f7f8f8"
                    fontSize="11"
                    fontWeight="600"
                    fontFamily="inherit"
                  >
                    Worker Fleet
                  </text>
                  <text
                    x="14"
                    y="42"
                    fill="#8a8f98"
                    fontSize="9"
                    fontFamily="inherit"
                  >
                    Rust Tokio runtime
                  </text>
                  <text
                    x="14"
                    y="60"
                    fill="#62666d"
                    fontSize="8.5"
                    fontFamily="monospace"
                  >
                    8 replicas active
                  </text>
                </g>

                {/* --- NODE 4: PostgreSQL Primary (ERD Schema Table) --- */}
                <g transform="translate(220, 270)">
                  <rect
                    width="160"
                    height="140"
                    rx="12"
                    fill="#08090a"
                    stroke="#23252a"
                    strokeWidth="1"
                  />
                  {/* Table Header */}
                  <rect
                    width="160"
                    height="28"
                    rx="12"
                    fill="#121316"
                  />
                  <rect
                    y="20"
                    width="160"
                    height="8"
                    fill="#121316"
                  />
                  <text
                    x="12"
                    y="18"
                    fill="#f7f8f8"
                    fontSize="10"
                    fontWeight="600"
                    fontFamily="monospace"
                  >
                    public.events_log
                  </text>
                  <circle cx="146" cy="14" r="3" fill="#27a644" />

                  {/* Schema Rows */}
                  <text
                    x="12"
                    y="46"
                    fill="#d0d6e0"
                    fontSize="9"
                    fontFamily="monospace"
                  >
                    id <tspan fill="#62666d">uuid [PK]</tspan>
                  </text>
                  <text
                    x="12"
                    y="66"
                    fill="#d0d6e0"
                    fontSize="9"
                    fontFamily="monospace"
                  >
                    workspace_id <tspan fill="#62666d">uuid [FK]</tspan>
                  </text>
                  <text
                    x="12"
                    y="86"
                    fill="#d0d6e0"
                    fontSize="9"
                    fontFamily="monospace"
                  >
                    payload <tspan fill="#62666d">jsonb</tspan>
                  </text>
                  <text
                    x="12"
                    y="106"
                    fill="#d0d6e0"
                    fontSize="9"
                    fontFamily="monospace"
                  >
                    ingested_at <tspan fill="#62666d">timestamptz</tspan>
                  </text>
                  <line
                    x1="0"
                    y1="116"
                    x2="160"
                    y2="116"
                    stroke="#191a1e"
                    strokeWidth="1"
                  />
                  <text
                    x="12"
                    y="130"
                    fill="#5e6ad2"
                    fontSize="8.5"
                    fontFamily="inherit"
                  >
                    ● 2 indexes compiled
                  </text>
                </g>

                {/* --- NODE 5: Vector Index & Cache --- */}
                <g transform="translate(430, 270)">
                  <rect
                    width="140"
                    height="100"
                    rx="12"
                    fill="#08090a"
                    stroke="#23252a"
                    strokeWidth="1"
                  />
                  <text
                    x="12"
                    y="22"
                    fill="#f7f8f8"
                    fontSize="11"
                    fontWeight="600"
                    fontFamily="inherit"
                  >
                    Vector Embeddings
                  </text>
                  <text
                    x="12"
                    y="40"
                    fill="#8a8f98"
                    fontSize="9"
                    fontFamily="inherit"
                  >
                    HNSW index (1536 dim)
                  </text>
                  <text
                    x="12"
                    y="58"
                    fill="#62666d"
                    fontSize="8.5"
                    fontFamily="monospace"
                  >
                    cosine distance
                  </text>
                  <rect
                    x="12"
                    y="68"
                    width="70"
                    height="16"
                    rx="4"
                    fill="#121316"
                  />
                  <text
                    x="18"
                    y="80"
                    fill="#27a644"
                    fontSize="8"
                    fontFamily="inherit"
                  >
                    latency &lt; 4ms
                  </text>
                </g>

                {/* --- Multiplayer Live Cursors --- */}
                {/* Agent Cursor */}
                <g transform="translate(390, 230)">
                  <polygon
                    points="0,0 4,14 8,10 14,14"
                    fill="#5e6ad2"
                    stroke="#08090a"
                    strokeWidth="1"
                  />
                  <rect
                    x="12"
                    y="8"
                    width="88"
                    height="18"
                    rx="4"
                    fill="#5e6ad2"
                  />
                  <text
                    x="18"
                    y="20"
                    fill="#ffffff"
                    fontSize="9"
                    fontWeight="600"
                    fontFamily="inherit"
                  >
                    Axiom Agent
                  </text>
                </g>

                {/* Collaborator Cursor (Sarah) */}
                <g transform="translate(140, 240)">
                  <polygon
                    points="0,0 4,14 8,10 14,14"
                    fill="#27a644"
                    stroke="#08090a"
                    strokeWidth="1"
                  />
                  <rect
                    x="12"
                    y="8"
                    width="62"
                    height="18"
                    rx="4"
                    fill="#27a644"
                  />
                  <text
                    x="18"
                    y="20"
                    fill="#ffffff"
                    fontSize="9"
                    fontWeight="600"
                    fontFamily="inherit"
                  >
                    Sarah (Lead)
                  </text>
                </g>
              </svg>

              {/* Floating Bottom Canvas Controls */}
              <div className="absolute bottom-4 left-4 right-4 flex items-center justify-between pointer-events-none">
                <div className="flex items-center gap-2 rounded-lg border border-[#23252a] bg-[#08090a]/90 px-3 py-1.5 text-xs text-[#8a8f98] backdrop-blur-md pointer-events-auto shadow-lg">
                  <span className="size-1.5 rounded-full bg-[#27a644]" />
                  <span>Interactive Topology Engine · 60fps</span>
                </div>
                <div className="flex items-center gap-1.5 rounded-lg border border-[#23252a] bg-[#08090a]/90 px-2 py-1 text-xs text-[#8a8f98] backdrop-blur-md pointer-events-auto">
                  <span className="font-mono text-[10px]">100% Zoom</span>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

