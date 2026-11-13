import React from "react";
import { Check, Sparkles } from "lucide-react";

/**
 * SurfaceVisuals - High-fidelity vector mockups for Axiom's three core surfaces
 * (Precision Canvas, Living Specs, Architecture Board) adhering to DESIGN.MD.
 */

export function CanvasMock() {
  return (
    <Frame>
      <svg
        viewBox="0 0 400 300"
        className="h-full w-full select-none"
        preserveAspectRatio="xMidYMid meet"
      >
        <defs>
          <marker
            id="canvasMockArrow"
            viewBox="0 0 8 8"
            refX="6"
            refY="4"
            markerWidth="5"
            markerHeight="5"
            orient="auto-start-reverse"
          >
            <path d="M 0 1 L 7 4 L 0 7 z" fill="#5e6ad2" />
          </marker>
        </defs>

        {/* Subtle dot matrix grid */}
        <pattern
          id="canvasGrid"
          width="20"
          height="20"
          patternUnits="userSpaceOnUse"
        >
          <circle cx="2" cy="2" r="0.75" fill="#23252a" />
        </pattern>
        <rect width="100%" height="100%" fill="url(#canvasGrid)" />

        {/* Orthogonal connector: Service to Users table */}
        <path
          d="M 140 100 L 220 100 L 220 170"
          fill="none"
          stroke="#5e6ad2"
          strokeWidth="1.25"
          markerEnd="url(#canvasMockArrow)"
        />

        {/* Orthogonal connector: Users to Sessions */}
        <path
          d="M 290 190 L 330 190 L 330 220"
          fill="none"
          stroke="#31353d"
          strokeWidth="1"
          strokeDasharray="3 3"
        />

        {/* Node 1: API Gateway microservice */}
        <g transform="translate(25, 65)">
          <rect
            width="115"
            height="70"
            rx="8"
            fill="#08090a"
            stroke="#5e6ad2"
            strokeWidth="1"
          />
          <rect x="8" y="8" width="16" height="16" rx="4" fill="#121316" />
          <circle cx="16" cy="16" r="3" fill="#5e6ad2" />
          <text x="30" y="20" fill="#f7f8f8" fontSize="10" fontWeight="600">
            Auth Service
          </text>
          <text x="10" y="44" fill="#8a8f98" fontSize="8.5">
            gRPC / Port 50051
          </text>
          <rect x="10" y="50" width="48" height="12" rx="3" fill="#121316" />
          <text x="14" y="59" fill="#27a644" fontSize="7.5">
            ● 99.98% SLA
          </text>
        </g>

        {/* Node 2: ERD Entity Table (public.users) */}
        <g transform="translate(180, 120)">
          <rect
            width="140"
            height="130"
            rx="8"
            fill="#08090a"
            stroke="#23252a"
            strokeWidth="1"
          />
          {/* Table Header */}
          <rect width="140" height="24" rx="8" fill="#121316" />
          <rect y="16" width="140" height="8" fill="#121316" />
          <text
            x="10"
            y="16"
            fill="#f7f8f8"
            fontSize="9"
            fontWeight="600"
            fontFamily="monospace"
          >
            public.users
          </text>
          <circle cx="128" cy="12" r="2.5" fill="#27a644" />

          {/* Table Columns */}
          <text
            x="10"
            y="42"
            fill="#d0d6e0"
            fontSize="8"
            fontFamily="monospace"
          >
            id <tspan fill="#62666d">uuid [PK]</tspan>
          </text>
          <text
            x="10"
            y="58"
            fill="#d0d6e0"
            fontSize="8"
            fontFamily="monospace"
          >
            email <tspan fill="#62666d">varchar(255)</tspan>
          </text>
          <text
            x="10"
            y="74"
            fill="#d0d6e0"
            fontSize="8"
            fontFamily="monospace"
          >
            org_id <tspan fill="#62666d">uuid [FK]</tspan>
          </text>
          <text
            x="10"
            y="90"
            fill="#d0d6e0"
            fontSize="8"
            fontFamily="monospace"
          >
            created_at <tspan fill="#62666d">timestamp</tspan>
          </text>
          <line
            x1="0"
            y1="102"
            x2="140"
            y2="102"
            stroke="#191a1e"
            strokeWidth="1"
          />
          <text x="10" y="118" fill="#5e6ad2" fontSize="7.5">
            ● 3 constraints compiled
          </text>
        </g>

        {/* Live Agent Selection Indicator */}
        <g transform="translate(190, 80)">
          <rect
            x="0"
            y="0"
            width="80"
            height="18"
            rx="4"
            fill="#5e6ad2"
          />
          <text
            x="8"
            y="12"
            fill="#ffffff"
            fontSize="8"
            fontWeight="600"
          >
            Agent Connected
          </text>
        </g>
      </svg>
    </Frame>
  );
}

export function DocsMock() {
  return (
    <Frame>
      <div className="flex h-full flex-col justify-between p-6 select-none">
        <div>
          {/* Document Eyebrow */}
          <div className="flex items-center gap-2 text-[10px] font-mono tracking-wider uppercase text-[#62666d]">
            <span>SPEC-004</span>
            <span>·</span>
            <span className="text-[#5e6ad2]">LIVING DOCUMENTATION</span>
          </div>

          <h4 className="mt-2 text-sm font-semibold text-[#f7f8f8]">
            Ingress Security Architecture (ADR-14)
          </h4>

          <p className="mt-2 text-[11px] leading-relaxed text-[#8a8f98]">
            All external API clients authenticate through mTLS handshakes.
            Tokens are cryptographically signed with asymmetric keys rotated
            hourly.
          </p>

          {/* Syntax Highlighted Spec Block */}
          <div className="mt-3.5 rounded-md border border-[#23252a] bg-[#010102] p-2.5 font-mono text-[10px] leading-4 text-[#d0d6e0]">
            <div>
              <span className="text-[#828fff]">type</span>{" "}
              <span className="text-[#f7f8f8]">TokenClaims</span> = &#123;
            </div>
            <div className="pl-3 text-[#8a8f98]">
              sub: <span className="text-[#828fff]">UUID</span>; iss:{" "}
              <span className="text-[#828fff]">&quot;axiom.cloud&quot;</span>;
            </div>
            <div>&#125;;</div>
          </div>

          {/* Agent Spec Checklist */}
          <div className="mt-3.5 space-y-2">
            <div className="flex items-center gap-2 text-[11px] text-[#d0d6e0]">
              <span className="flex size-3.5 items-center justify-center rounded bg-[#5e6ad2]/20 text-[#5e6ad2]">
                <Check className="size-2.5" />
              </span>
              <span>TLS 1.3 cipher suite enforcement verified</span>
            </div>
            <div className="flex items-center gap-2 text-[11px] text-[#d0d6e0]">
              <span className="flex size-3.5 items-center justify-center rounded bg-[#5e6ad2]/20 text-[#5e6ad2]">
                <Check className="size-2.5" />
              </span>
              <span>Rate limiting policy: 2,500 req/min per tenant</span>
            </div>
          </div>
        </div>

        {/* Footer Sync Meta */}
        <div className="flex items-center justify-between border-t border-[#191a1e] pt-3 text-[10px] text-[#62666d]">
          <span className="flex items-center gap-1.5 text-[#5e6ad2]">
            <Sparkles className="size-3" />
            Synced from Canvas
          </span>
          <span className="font-mono">v1.4.0</span>
        </div>
      </div>
    </Frame>
  );
}

export function BoardMock() {
  const columns = [
    {
      title: "RFC Proposal",
      cards: [
        { id: "AX-81", title: "Global CDN Routing", tag: "Infra" },
        { id: "AX-82", title: "Vector Embedding Cache", tag: "AI" },
      ],
    },
    {
      title: "In Review",
      cards: [
        {
          id: "AX-84",
          title: "Tenant Partitioning Schema",
          tag: "Database",
          active: true,
        },
      ],
    },
    {
      title: "Verified",
      cards: [
        { id: "AX-78", title: "Event Bus Broker v2", tag: "Stream" },
        { id: "AX-79", title: "Identity Provider SSO", tag: "Security" },
      ],
    },
  ];

  return (
    <Frame>
      <div className="grid h-full grid-cols-3 gap-2.5 p-4 select-none">
        {columns.map((col) => (
          <div
            key={col.title}
            className="flex flex-col gap-2 rounded-lg bg-[#010102]/60 p-2.5 border border-[#191a1e]"
          >
            <div className="flex items-center justify-between pb-1 text-[10px] font-medium text-[#8a8f98]">
              <span>{col.title}</span>
              <span className="font-mono text-[#62666d]">{col.cards.length}</span>
            </div>

            {col.cards.map((card) => (
              <div
                key={card.id}
                className={`flex flex-col gap-1.5 rounded-md border p-2.5 transition-colors ${
                  card.active
                    ? "border-[#5e6ad2]/50 bg-[#121316]"
                    : "border-[#23252a] bg-[#08090a]"
                }`}
              >
                <div className="flex items-center justify-between">
                  <span className="font-mono text-[9px] text-[#5e6ad2]">
                    {card.id}
                  </span>
                  <span className="rounded bg-[#121316] px-1.5 py-0.5 text-[8px] text-[#8a8f98]">
                    {card.tag}
                  </span>
                </div>
                <div className="text-[10px] font-medium leading-snug text-[#f7f8f8]">
                  {card.title}
                </div>
                {card.active && (
                  <div className="mt-1 flex items-center gap-1 text-[8.5px] text-[#27a644]">
                    <span className="size-1.5 rounded-full bg-[#27a644] animate-pulse" />
                    Agent synthesizing
                  </div>
                )}
              </div>
            ))}
          </div>
        ))}
      </div>
    </Frame>
  );
}

function Frame({ children }: { children: React.ReactNode }) {
  return (
    <div className="relative overflow-hidden rounded-[16px] border border-[#23252a] bg-[#08090a] aspect-4/3 shadow-[0_16px_36px_-10px_rgba(0,0,0,0.8),inset_0_1px_0_0_rgba(255,255,255,0.08)]">
      {children}
    </div>
  );
}
