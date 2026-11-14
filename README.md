<div align="center">

<svg width="180" height="42" viewBox="0 0 140 32" fill="none" xmlns="http://www.w3.org/2000/svg">
  <rect width="32" height="32" rx="8" fill="#08090a" stroke="#23252a" stroke-width="1"/>
  <path d="M16 6.5L25.5 24H6.5L16 6.5Z" stroke="#31353d" stroke-width="1.25" stroke-linejoin="round"/>
  <path d="M16 11.5L21.5 21.5H10.5L16 11.5Z" fill="#121316" stroke="#23252a" stroke-width="1"/>
  <path d="M11 19.5H21" stroke="#5e6ad2" stroke-width="1.75" stroke-linecap="round"/>
  <circle cx="16" cy="7" r="1.2" fill="#5e6ad2"/>
  <text x="44" y="21" fill="#f7f8f8" font-family="-apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif" font-size="15" font-weight="600" letter-spacing="0.14em">AXIOM</text>
</svg>

# Axiom

### The Intelligent Canvas for Systems Architecture

**Architect distributed topologies, model relational schemas, and compile verified technical specifications alongside an autonomous agent in real time.**

---

[![Next.js](https://img.shields.io/badge/Next.js-16.3-black?style=flat&logo=next.js)](https://nextjs.org)
[![React](https://img.shields.io/badge/React-19.2-blue?style=flat&logo=react)](https://react.dev)
[![TypeScript](https://img.shields.io/badge/TypeScript-5.0-blue?style=flat&logo=typescript)](https://www.typescriptlang.org)
[![Tailwind CSS](https://img.shields.io/badge/Tailwind_CSS-v4-38B2AC?style=flat&logo=tailwind-css)](https://tailwindcss.com)
[![Vercel AI SDK](https://img.shields.io/badge/Vercel_AI_SDK-Gemini_2.5-black?style=flat)](https://ai-sdk.dev)
[![Supabase](https://img.shields.io/badge/Supabase-Realtime_&_Postgres-3ECF8E?style=flat&logo=supabase)](https://supabase.com)
[![Prisma](https://img.shields.io/badge/Prisma-7.10-2D3748?style=flat&logo=prisma)](https://www.prisma.io)
[![Clerk](https://img.shields.io/badge/Clerk-Auth_&_Billing-6C47FF?style=flat&logo=clerk)](https://clerk.com)
[![License: GPL-3.0](https://img.shields.io/badge/License-GPL--3.0-blue.svg)](LICENSE)

</div>

<br />

## Overview

**Axiom** is an enterprise-grade agentic workspace engineered for engineering teams, technical architects, and platform organizations. It bridges visual architecture modeling and technical documentation into a single, cohesive environment. 

Equipped with an autonomous dual-surface agent powered by Google Gemini, Axiom synthesizes database schemas, entity relationship diagrams (ERDs), and living architectural decision records (ADRs) while your team collaborates concurrently with live multiplayer presence.

---





https://github.com/user-attachments/assets/c587d345-daa4-4d29-a6ab-6a10e737dc23





## Key Features

### 1. Dual-Surface Autonomous Agent
- **Coordinated Synthesis:** Request a full system spec or database schema, and the agent orchestrates changes across both surfaces: drawing diagrams on the canvas while authoring documentation in the editor.
- **Surface Isolation:** Target specific surfaces via natural language prompts (e.g., *"document the API contracts in the doc only"* or *"add an audit table to the canvas"*).
- **Client-Side Execution:** The agent's schema and canvas modifications run directly against browser document and canvas instances in real time, avoiding desyncs and black-box state errors.

### 2. Precision Vector Canvas
- Built on top of **tldraw**, customized for systems design and data modeling.
- **Custom ERD Entities:** Dedicated table nodes with typed fields, primary key (`PK`) and foreign key (`FK`) badges, and row-snapping orthogonal relation arrows.
- **Low-Latency Multiplayer:** Sub-50ms canvas collaboration powered by `tldraw-sync` and Cloudflare Workers.

### 3. Living Technical Specifications
- **Block-Based Structured Editor:** Powered by **BlockNote** with support for code snippets, markdown blocks, callouts, and type definitions.
- **Conflict-Free Realtime Collaboration:** State synchronisation via **Yjs** CRDTs transmitted over **Supabase Realtime** broadcast channels.
- **Zero Documentation Drift:** Visual changes made to architectures can be summarized and synced directly into your written specifications.

### 4. Lifecycle Management & Kanban
- **Workspace Dashboard:** Launch new architectures via typed prompt or integrated voice input with automatic bootstrapping.
- **State Progression:** Track systems across planning stages (`PLANNING`, `IN_PROGRESS`, `IN_REVIEW`, `DONE`) with drag-and-drop ordering.
- **Floating Point Ordering:** Efficient fractional index repositioning ensures reorders require only a single row update.

### 5. Multi-Tenant Organizations & Access Control
- **Clerk Organizations:** Seamless team switching, role-based access control, and workspace isolation.
- **Public & Read-Only Sharing:** Generate cryptographically secure share tokens for clients, stakeholders, and reviewers.
- **Export Capabilities:** Client-side vector and document PDF generation with zero server overhead.

### 6. Metered Billing & Usage Limits
- **Tiered Entitlements:** Native Clerk Billing integration supporting individual, team seat-based, and enterprise plans.
- **Quota Enforcement:** Monthly agent prompt tracking and workspace limits managed through unified billing helpers.

---

## Architecture & Agent Execution Model

```
 ┌────────────────────────────────────────────────────────┐
 │                   Next.js App Router                   │
 ├──────────────────────────┬─────────────────────────────┤
 │    tldraw Vector Canvas  │   BlockNote Document Editor │
 │  (Custom ERD Node Shapes)│       (Yjs CRDT Store)      │
 └─────────────▲────────────┴──────────────▲──────────────┘
               │                           │
 ┌─────────────┴───────────────────────────┴──────────────┐
 │                Browser Client Context                  │
 │   - Compresses canvas & doc snapshots into compact AST │
 │   - Dispatches browser-side agent tools in real time   │
 └─────────────────────────▲──────────────────────────────┘
                           │ Streamed Tool Calls
 ┌─────────────────────────┴──────────────────────────────┐
 │               Next.js Route Handler (/api/agent)       │
 │   - Enforces Clerk billing & monthly prompt quotas     │
 │   - Invokes Google Gemini via Vercel AI SDK            │
 └────────────────────────────────────────────────────────┘
```

> **Client-Side Tool Execution:** Unlike traditional agent architectures where the server attempts to mutate remote canvas databases, Axiom's AI agent returns structured tool calls that execute directly inside the user's active browser session. This gives users instantaneous visual feedback and allows existing peer-to-peer sync providers (Yjs and tldraw-sync) to propagate changes naturally.

---

## Tech Stack

| Area | Technologies |
| :--- | :--- |
| **Framework** | [Next.js 16](https://nextjs.org) (App Router, Server Actions, Route Handlers) |
| **Runtime & Language** | [React 19](https://react.dev), [TypeScript 5](https://www.typescriptlang.org) |
| **Authentication & Orgs** | [Clerk](https://clerk.com) (Clerk Organizations, Role-Based Access) |
| **Monetization & Billing** | [Clerk Billing](https://clerk.com/docs/billing) (Seat-based team tiers) |
| **Database & Realtime** | [Supabase](https://supabase.com) (PostgreSQL, Connection Pooling, Realtime Channels) |
| **ORM** | [Prisma 7](https://www.prisma.io) with PostgreSQL adapter |
| **AI Intelligence** | [Vercel AI SDK](https://ai-sdk.dev) & [Google Gemini 2.5](https://aistudio.google.com) |
| **Canvas Engine** | [tldraw](https://tldraw.dev) + `@tldraw/sync` via Cloudflare Worker |
| **Editor & CRDT** | [BlockNote](https://www.blocknotejs.org), [Yjs](https://yjs.dev), [y-prosemirror](https://github.com/yjs/y-prosemirror) |
| **Styling & Components** | [Tailwind CSS v4](https://tailwindcss.com), [shadcn/ui](https://ui.shadcn.com), [Lucide React](https://lucide.dev) |
| **Exporting** | `@react-pdf/renderer`, `jspdf`, `@blocknote/xl-pdf-exporter` |

---

## Getting Started

### Prerequisites

- **Node.js**: `v22.0.0` or higher
- **Package Manager**: `npm` (or `pnpm` / `bun`)
- Accounts with credentials for:
  - [Clerk Dashboard](https://dashboard.clerk.com)
  - [Supabase](https://supabase.com)
  - [Google AI Studio](https://aistudio.google.com)

---

### Step 1: Clone & Install

```bash
git clone https://github.com/your-org/axiom.git
cd axiom
npm install
```

> `npm install` automatically triggers `postinstall` to generate the Prisma client bindings.

---

### Step 2: Configure Environment Variables

Create your local `.env` configuration:

```bash
cp .env.example .env
```

Populate the required secrets:

```env
# Clerk Authentication & Routing
NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY=pk_test_...
CLERK_SECRET_KEY=sk_test_...
NEXT_PUBLIC_CLERK_SIGN_IN_URL=/sign-in
NEXT_PUBLIC_CLERK_SIGN_UP_URL=/sign-up
NEXT_PUBLIC_CLERK_SIGN_IN_FALLBACK_REDIRECT_URL=/dashboard
NEXT_PUBLIC_CLERK_SIGN_UP_FALLBACK_REDIRECT_URL=/dashboard

# Supabase Database (Postgres)
# Transaction pooled connection (port 6543) for runtime queries:
DATABASE_URL="postgresql://postgres.[PROJECT-REF]:[PASSWORD]@aws-0-[REGION].pooler.supabase.com:6543/postgres?pgbouncer=true"
# Direct connection (port 5432) for running Prisma schema migrations:
DIRECT_URL="postgresql://postgres.[PROJECT-REF]:[PASSWORD]@aws-0-[REGION].pooler.supabase.com:5432/postgres"

# Supabase Realtime (API Configuration for Doc Sync)
NEXT_PUBLIC_SUPABASE_URL=https://[PROJECT-REF].supabase.co
NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY=eyJhbGci...

# Google Gemini Intelligence
GOOGLE_GENERATIVE_AI_API_KEY=AIzaSy...

# Canvas Sync Server (Cloudflare Worker)
# Optional in local development; defaults to tldraw's public demo relay
NEXT_PUBLIC_TLDRAW_SYNC_URL=

# tldraw License Key (Optional for localhost, required for production domains)
NEXT_PUBLIC_TLDRAW_LICENSE_KEY=
```

---

### Step 3: Database Migration

Apply Prisma migrations to your Supabase PostgreSQL instance:

```bash
npx prisma migrate deploy
```

---

### Step 4: Clerk Organization & Billing Configuration

In the [Clerk Dashboard](https://dashboard.clerk.com):

1. **Organizations:** Enable Organizations and set **Membership** to **Optional** so users can operate both solo and in teams.
2. **Billing Settings:** Enable billing for both users and organizations using the **Clerk Development Gateway** for local testing.
3. **Feature Keys:** Configure the following exact feature entitlement keys under **Billing → Subscription Plans → Features**:

   | Feature Key | Description |
   | :--- | :--- |
   | `unlimited_workspaces` | Unlocks workspace creation beyond the 3-workspace free limit |
   | `public_sharing` | Enables generating public read-only share tokens |
   | `pdf_export` | Enables client-side vector canvas and documentation PDF export |
   | `agent_prompts_500` | Allocates 500 agent prompt invocations per seat/month |
   | `agent_prompts_2000` | Allocates 2,000 agent prompt invocations per seat/month |

4. **Subscription Plans:**

   | Plan | Scope | Key | Pricing | Features Included |
   | :--- | :--- | :--- | :--- | :--- |
   | **Free** | User / Org | — | $0 | Default 20 prompts/mo, 3 workspaces |
   | **Pro** | User | `pro` | $12 / mo | `unlimited_workspaces`, `public_sharing`, `pdf_export`, `agent_prompts_500` |
   | **Team** | Organization | `team` | $12 / seat / mo | `unlimited_workspaces`, `public_sharing`, `pdf_export`, `agent_prompts_500` |
   | **Enterprise**| Organization | `enterprise`| $25 / seat / mo | `unlimited_workspaces`, `public_sharing`, `pdf_export`, `agent_prompts_2000` |

---

### Step 5: Configure Supabase Realtime

The collaborative doc editor transmits Yjs updates over broadcast channels. Ensure your Supabase project allows **Public Realtime Channels** under:
`Supabase Dashboard → Project Settings → Realtime → Allow Public Broadcasts`.

---

### Step 6: Launch Development Server

```bash
npm run dev
```

Navigate to [http://localhost:3000](http://localhost:3000).

> **Multiplayer Testing Tip:** Open two separate browser profiles (or standard and incognito windows) logged in as two different users to observe simultaneous real-time cursor tracking, canvas mutations, and document synchronization.

---

## Canvas Synchronization Server (Optional)

Axiom includes a production-ready Cloudflare Worker inside the `tldraw-sync/` directory to manage canvas presence and document room state:

```bash
cd tldraw-sync
npm install
npx wrangler login
npm run deploy
```

Copy the deployed worker URL and assign it to `NEXT_PUBLIC_TLDRAW_SYNC_URL` in your `.env`.

---

## Project Structure

```
.
├── actions/                  # Next.js Server Actions (workspaces, doc state, quotas)
├── app/                      # Next.js App Router
│   ├── (main)/
│   │   ├── dashboard/        # Dashboard with AI workspace creation & voice input
│   │   ├── workspaces/       # Interactive Kanban lifecycle board
│   │   └── workspace/[id]/   # Core workspace: dual canvas, doc editor, agent chat
│   ├── api/
│   │   └── agent/            # Gemini streaming endpoint & quota validation
│   ├── shared/[token]/       # Public view-only workspace viewer
│   └── page.tsx              # Axiom landing and pricing showcase
├── components/               # Core UI & architectural primitives
│   ├── EntityTable/          # Custom tldraw ERD shape implementation
│   ├── ui/                   # shadcn/ui components (Radix primitives)
│   └── AxiomLogo.tsx         # Brand geometric vector monogram
├── hooks/                    # Custom hooks (agent orchestrator, collaborative doc)
├── lib/                      # Utilities, SDKs, and tool definitions
│   ├── agent-tools.ts        # AI tool definitions and parameter schemas
│   ├── agent-canvas.ts       # Canvas manipulation tools (client-executed)
│   ├── agent-doc.ts          # BlockNote document tools (client-executed)
│   ├── billing.ts            # Clerk plan entitlements & quota tracking
│   ├── plan-limits.ts        # Plan limit thresholds and messaging
│   └── supabase-yjs-provider.ts # Yjs over Supabase Realtime synchronization
├── prisma/                   # Prisma schema, migrations, and seed scripts
├── public/brand/             # Brand logos, glyphs, and iconography
└── tldraw-sync/              # Standalone Cloudflare Worker for canvas sync
```

---

## Available Scripts

| Script | Purpose |
| :--- | :--- |
| `npm run dev` | Starts the Next.js local development server on port 3000 |
| `npm run build` | Compiles and builds the application for production |
| `npm run start` | Serves the production build locally |
| `npm run lint` | Runs ESLint analysis across the project |
| `npm run seed -- you@email.com [org_id]` | Seeds initial demo workspaces for testing |

---

## Production Deployment Checklist

1. **Deploy Canvas Sync:** Deploy `tldraw-sync/` to Cloudflare Workers and configure `NEXT_PUBLIC_TLDRAW_SYNC_URL`.
2. **Configure Database Connection Pooling:** Ensure `DATABASE_URL` connects via Supabase Transaction Mode pooler (port 6543) and `DIRECT_URL` points to session mode (port 5432).
3. **Register tldraw Key:** Add a production license key via `NEXT_PUBLIC_TLDRAW_LICENSE_KEY` from [tldraw.dev](https://tldraw.dev/pricing) to remove the canvas watermark.
4. **Production Billing:** Transition the Clerk Billing gateway from development mode to live Stripe keys.
5. **Host Deployment:** Deploy the Next.js frontend to [Vercel](https://vercel.com) or your preferred container runtime.

 
