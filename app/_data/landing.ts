import { LayoutGrid, FileText, KanbanSquare } from "lucide-react";
import { CanvasMock, DocsMock, BoardMock } from "../_components/SurfaceVisuals";

// Brand-aligned copy for Axiom, matching the tone and precision in DESIGN.MD.

export const AUDIENCES = [
  "Distributed Systems Engineers",
  "Technical Architects",
  "Infrastructure Teams",
  "Founding Engineers",
  "Platform Organizations",
];

export const SURFACES = [
  {
    icon: LayoutGrid,
    title: "Precision Vector Canvas",
    description:
      "An infinite, sub-millisecond canvas engineered for systems architecture, relational schemas, and microservice topologies. The agent constructs and refactors node-by-node with mathematical rigor instead of opaque black-box generations.",
    bullets: [
      "Typed relational tables with column types, primary keys, and foreign keys",
      "Interactive modifications: prompt the agent to refactor pipelines in place",
      "Orthogonal path routing designed for high-density, readable topologies",
    ],
    visual: CanvasMock,
  },
  {
    icon: FileText,
    title: "Living Technical Specifications",
    description:
      "Eliminate documentation drift forever. Axiom compiles canvas topologies into complete, production-grade technical specs, architecture decision records (ADRs), and schema contracts in real time.",
    bullets: [
      "Block-based structured editor: code blocks, type contracts, and checklists",
      "Automatic bidirectional sync between visual diagrams and markdown specs",
      "Targeted agent refinement: rewrite sections or expand implementation details",
    ],
    visual: DocsMock,
  },
  {
    icon: KanbanSquare,
    title: "Synchronous Architecture Boards",
    description:
      "Coordinate systems engineering across your entire organization. Every workspace transitions from RFC proposal to production review with sub-50ms multiplayer presence and shared live context.",
    bullets: [
      "Unified project lifecycle board for all systems in your organization",
      "Low-latency multiplayer presence with live cursors on canvas and docs",
      "Instant organization membership: inspect, clone, and collaborate seamlessly",
    ],
    visual: BoardMock,
  },
];

export const STEPS = [
  {
    title: "Specify requirements",
    body: "Provide technical constraints in natural language or voice. Define database entities, expected throughput, and service boundaries without touching complex diagram syntax.",
  },
  {
    title: "Watch the agent construct",
    body: "Entities, data pathways, and type contracts materialize sequentially as the agent reasons, mirroring the velocity of a principal architect on a live pairing session.",
  },
  {
    title: "Iterate and ship specs",
    body: "Refactor topology nodes in place, compile verified markdown specifications, and bring teammates in with live multiplayer sync. One agent, one unified system.",
  },
];
