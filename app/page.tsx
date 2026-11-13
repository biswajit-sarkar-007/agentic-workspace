import Link from "next/link";
import { ArrowRight, Check } from "lucide-react";
import { Button } from "@/components/ui/button";
import { PricingPlans } from "@/components/PricingPlans";
import { AUDIENCES, STEPS, SURFACES } from "./_data/landing";
import { AxiomHeroShowcase } from "@/components/AxiomHeroShowcase";
import { AxiomGlyph } from "@/components/AxiomLogo";

export default function Home() {
  return (
    <div className="flex flex-1 flex-col bg-[#010102] text-[#f7f8f8]">
      {/* Hero Section */}
      <section className="relative px-6 pt-16 pb-20 md:px-10 md:pt-24 md:pb-28">
        <div className="mx-auto flex max-w-5xl flex-col items-center text-center">
          {/* Eyebrow */}
          <SectionEyebrow>Axiom 2.0 · Autonomous Architecture Engine</SectionEyebrow>

          {/* Display-XL Headline matching DESIGN.MD */}
          <h1 className="mt-3 max-w-4xl text-[44px] font-semibold leading-[1.06] tracking-[-0.038em] sm:text-[64px] lg:text-[76px] text-[#f7f8f8]">
            The intelligent canvas for{" "}
            <span className="text-[#5e6ad2]">systems architecture.</span>
          </h1>

          {/* Lead Body Paragraph */}
          <p className="mt-6 max-w-2xl text-base leading-relaxed text-[#8a8f98] sm:text-lg">
            Architect distributed topologies, model relational schemas, and
            compile verified technical specifications alongside an autonomous agent
            in real time.
          </p>

          {/* CTAs */}
          <div className="mt-8 flex flex-col items-center gap-3 sm:flex-row">
            <Button
              asChild
              size="lg"
              className="h-10 gap-2 rounded-md bg-[#5e6ad2] px-5 text-sm font-medium text-white shadow-sm hover:bg-[#828fff] active:bg-[#5e69d1]"
            >
              <Link href="/sign-up">
                Start building free <ArrowRight className="size-4" />
              </Link>
            </Button>
            <Button
              asChild
              size="lg"
              variant="outline"
              className="h-10 rounded-md border-[#23252a] bg-[#08090a] px-5 text-sm font-medium text-[#f7f8f8] hover:bg-[#121316] hover:text-[#f7f8f8]"
            >
              <Link href="#surfaces">Explore architecture</Link>
            </Button>
          </div>
        </div>

        {/* Hero Showcase: Replaces video with pure SVG/CSS theme-aware product UI */}
        <div className="mx-auto mt-16 max-w-5xl">
          <AxiomHeroShowcase />
        </div>
      </section>

      {/* Target Audience Marquee / Strip */}
      <section className="border-t border-[#23252a] bg-[#010102] px-6 py-8 md:px-10">
        <div className="mx-auto flex max-w-5xl flex-col items-center gap-6 text-center sm:flex-row sm:justify-between sm:text-left">
          <p className="text-xs font-medium uppercase tracking-[0.06em] text-[#8a8f98]">
            Engineered for high-velocity teams
          </p>
          <div className="flex flex-wrap items-center justify-center gap-x-8 gap-y-2 text-xs text-[#8a8f98]">
            {AUDIENCES.map((audience) => (
              <span key={audience} className="transition-colors hover:text-[#f7f8f8]">
                {audience}
              </span>
            ))}
          </div>
        </div>
      </section>

      {/* Core Surfaces Section */}
      <section
        id="surfaces"
        className="border-t border-[#23252a] bg-[#010102] px-6 py-24 md:px-10"
      >
        <div className="mx-auto max-w-5xl">
          <div className="max-w-2xl">
            <SectionEyebrow>01 · Core Surfaces</SectionEyebrow>
            <h2 className="text-[32px] font-semibold leading-[1.12] tracking-[-0.03em] sm:text-[42px] text-[#f7f8f8]">
              One agent. Unified context. Your entire engineering team.
            </h2>
            <p className="mt-4 text-base leading-relaxed text-[#8a8f98]">
              Axiom is not another superficial diagram generator. The autonomous
              agent maintains bidirectional context across your vector canvas and
              markdown specifications, turning high-level architecture into verified
              specifications without manual copy-pasting.
            </p>
          </div>

          <div className="mt-16 flex flex-col gap-24">
            {SURFACES.map(({ icon: Icon, visual: Visual, ...surface }, i) => (
              <SurfaceRow
                key={surface.title}
                reverse={i % 2 === 1}
                icon={<Icon className="size-5" />}
                visual={<Visual />}
                {...surface}
              />
            ))}
          </div>
        </div>
      </section>

      {/* Workflow Section */}
      <section
        id="workflow"
        className="border-t border-[#23252a] bg-[#010102] px-6 py-24 md:px-10"
      >
        <div className="mx-auto max-w-5xl">
          <SectionEyebrow>02 · Execution Engine</SectionEyebrow>
          <h2 className="text-[32px] font-semibold leading-[1.12] tracking-[-0.03em] sm:text-[42px] text-[#f7f8f8]">
            Real-time synthesis, zero black-box latency
          </h2>
          <p className="mt-4 max-w-xl text-base leading-relaxed text-[#8a8f98]">
            Watch entities, schemas, and relational pathways materialize
            incrementally as the agent reasons through constraints.
          </p>

          <div className="mt-14 grid gap-8 md:grid-cols-3">
            {STEPS.map((step, i) => (
              <Step
                key={step.title}
                number={String(i + 1).padStart(2, "0")}
                title={step.title}
              >
                {step.body}
              </Step>
            ))}
          </div>
        </div>
      </section>

      {/* Pricing Section */}
      <section
        id="pricing"
        className="border-t border-[#23252a] bg-[#010102] px-6 py-24 md:px-10"
      >
        <div className="mx-auto mb-14 max-w-5xl text-center">
          <SectionEyebrow>03 · Pricing</SectionEyebrow>
          <h2 className="text-[32px] font-semibold leading-[1.12] tracking-[-0.03em] sm:text-[42px] text-[#f7f8f8]">
            Engineered for scale. Simple, transparent pricing.
          </h2>
          <p className="mx-auto mt-4 max-w-xl text-base leading-relaxed text-[#8a8f98]">
            Start free with full dual-surface capabilities. Upgrade your team as
            your engineering organization expands.
          </p>
        </div>
        <PricingPlans />
      </section>

      {/* Closing CTA Banner */}
      <section className="border-t border-[#23252a] bg-[#08090a] px-6 py-24 md:px-10 shadow-[inset_0_1px_0_0_rgba(255,255,255,0.06)]">
        <div className="mx-auto flex max-w-3xl flex-col items-center gap-6 text-center">
          <AxiomGlyph className="size-10" />
          <h2 className="text-[32px] font-semibold leading-[1.15] tracking-[-0.03em] sm:text-[44px] text-[#f7f8f8]">
            Build your next architecture with Axiom.
          </h2>
          <p className="max-w-lg text-base leading-relaxed text-[#8a8f98]">
            Eliminate architectural blind spots and documentation drift. Pair
            with the intelligent agent designed for systems engineers.
          </p>
          <Button
            asChild
            size="lg"
            className="h-10 gap-2 rounded-md bg-[#5e6ad2] px-6 text-sm font-medium text-white shadow-sm hover:bg-[#828fff] active:bg-[#5e69d1]"
          >
            <Link href="/sign-up">
              Start building free <ArrowRight className="size-4" />
            </Link>
          </Button>
        </div>
      </section>

      {/* Footer matching DESIGN.MD */}
      <footer className="border-t border-[#23252a] bg-[#010102] px-6 py-14 text-xs text-[#8a8f98] md:px-10">
        <div className="mx-auto flex max-w-5xl flex-col justify-between gap-10 md:flex-row md:items-start">
          <div className="space-y-3">
            <div className="flex items-center gap-2">
              <AxiomGlyph className="size-5" />
              <span className="font-semibold tracking-[0.14em] uppercase text-[#f7f8f8]">
                Axiom
              </span>
            </div>
            <p className="max-w-xs text-xs leading-relaxed text-[#62666d]">
              The intelligent canvas for systems architecture, relational schemas,
              and live technical specifications.
            </p>
            <p className="text-[11px] text-[#62666d]">
              © {new Date().getFullYear()} Axiom Technologies, Inc. All rights reserved.
            </p>
          </div>

          <div className="grid grid-cols-2 gap-10 sm:grid-cols-3 text-xs">
            <div className="space-y-2.5">
              <span className="font-medium text-[#f7f8f8]">Product</span>
              <ul className="space-y-2">
                <li><Link href="#surfaces" className="hover:text-[#f7f8f8] transition-colors">Vector Canvas</Link></li>
                <li><Link href="#surfaces" className="hover:text-[#f7f8f8] transition-colors">Living Docs</Link></li>
                <li><Link href="#surfaces" className="hover:text-[#f7f8f8] transition-colors">Team Boards</Link></li>
                <li><Link href="#pricing" className="hover:text-[#f7f8f8] transition-colors">Pricing</Link></li>
              </ul>
            </div>
            <div className="space-y-2.5">
              <span className="font-medium text-[#f7f8f8]">Platform</span>
              <ul className="space-y-2">
                <li><Link href="#workflow" className="hover:text-[#f7f8f8] transition-colors">Agent Runtime</Link></li>
                <li><Link href="#workflow" className="hover:text-[#f7f8f8] transition-colors">ERD Compiler</Link></li>
                <li><Link href="#workflow" className="hover:text-[#f7f8f8] transition-colors">ADR Engine</Link></li>
                <li><Link href="#workflow" className="hover:text-[#f7f8f8] transition-colors">Multiplayer</Link></li>
              </ul>
            </div>
            <div className="space-y-2.5">
              <span className="font-medium text-[#f7f8f8]">Security</span>
              <ul className="space-y-2">
                <li><span className="text-[#62666d]">SOC2 Certified</span></li>
                <li><span className="text-[#62666d]">mTLS Ingress</span></li>
                <li><span className="text-[#62666d]">Role-Based Access</span></li>
                <li><span className="text-[#62666d]">Isolated Tenants</span></li>
              </ul>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}

function SurfaceRow({
  icon,
  title,
  description,
  bullets,
  reverse,
  visual,
}: {
  icon: React.ReactNode;
  title: string;
  description: string;
  bullets: string[];
  reverse?: boolean;
  visual: React.ReactNode;
}) {
  return (
    <div
      className={`flex flex-col gap-10 md:flex-row md:items-center ${
        reverse ? "md:flex-row-reverse" : ""
      }`}
    >
      <div className="flex-1">
        <div className="flex size-9 items-center justify-center rounded-lg border border-[#23252a] bg-[#08090a] text-[#5e6ad2]">
          {icon}
        </div>
        <h3 className="mt-4 text-[22px] font-semibold leading-[1.2] tracking-[-0.02em] text-[#f7f8f8]">
          {title}
        </h3>
        <p className="mt-2.5 text-sm leading-relaxed text-[#8a8f98]">
          {description}
        </p>
        <ul className="mt-5 space-y-2.5">
          {bullets.map((bullet) => (
            <li
              key={bullet}
              className="flex items-start gap-2.5 text-xs text-[#8a8f98]"
            >
              <Check className="mt-0.5 size-3.5 shrink-0 text-[#5e6ad2]" />
              <span className="text-[#d0d6e0]">{bullet}</span>
            </li>
          ))}
        </ul>
      </div>
      <div className="flex-1">{visual}</div>
    </div>
  );
}

function SectionEyebrow({ children }: { children: React.ReactNode }) {
  return (
    <p className="mb-3 inline-flex items-center gap-2 font-mono text-[11px] font-medium uppercase tracking-[0.06em] text-[#8a8f98]">
      <span className="size-1 rounded-full bg-[#5e6ad2]" />
      {children}
    </p>
  );
}

function Step({
  number,
  title,
  children,
}: {
  number: string;
  title: string;
  children: React.ReactNode;
}) {
  return (
    <div className="rounded-[12px] border border-[#23252a] bg-[#08090a] p-6 shadow-[inset_0_1px_0_0_rgba(255,255,255,0.06)]">
      <div className="flex items-center justify-between pb-3 border-b border-[#191a1e]">
        <span className="font-mono text-xs font-semibold text-[#5e6ad2]">
          {number}
        </span>
        <span className="size-1.5 rounded-full bg-[#31353d]" />
      </div>
      <h3 className="mt-4 text-base font-semibold tracking-tight text-[#f7f8f8]">
        {title}
      </h3>
      <p className="mt-2 text-xs leading-relaxed text-[#8a8f98]">{children}</p>
    </div>
  );
}
