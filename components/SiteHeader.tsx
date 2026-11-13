"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import {
  Show,
  SignInButton,
  SignUpButton,
  UserButton,
  OrganizationSwitcher,
  useAuth,
} from "@clerk/nextjs";
import { Button } from "@/components/ui/button";
import { PlanButton } from "@/components/PlanButton";
import { AxiomLogo } from "@/components/AxiomLogo";

/**
 * SiteHeader - Linear-style sticky navigation bar on {colors.canvas} (#010102).
 * Height: 56px (h-14), 1px hairline bottom rule (#23252a), minimal dark chrome.
 */
export function SiteHeader() {
  const pathname = usePathname();
  const { isSignedIn } = useAuth();
  const isLandingPage = pathname === "/";

  return (
    <header className="fixed inset-x-0 top-0 z-40 flex h-14 items-center justify-between border-b border-[#23252a] bg-[#010102]/85 px-6 backdrop-blur-md md:px-10">
      {/* Brand Wordmark with SVG glyph */}
      <Link
        href={isSignedIn && !isLandingPage ? "/dashboard" : "/"}
        className="flex items-center transition-opacity hover:opacity-90"
      >
        <AxiomLogo />
      </Link>

      {/* Center Nav Links (Desktop) */}
      {isLandingPage && (
        <nav className="hidden items-center gap-7 text-[13px] text-[#8a8f98] md:flex">
          <Link
            href="#surfaces"
            className="transition-colors hover:text-[#f7f8f8]"
          >
            Surfaces
          </Link>
          <Link
            href="#workflow"
            className="transition-colors hover:text-[#f7f8f8]"
          >
            Workflow
          </Link>
          <Link
            href="#pricing"
            className="transition-colors hover:text-[#f7f8f8]"
          >
            Pricing
          </Link>
        </nav>
      )}

      {/* Right Controls */}
      <div className="flex items-center gap-2.5">
        <Show when="signed-out">
          <SignInButton mode="modal">
            <Button
              variant="outline"
              size="sm"
              className="border-[#23252a] bg-[#08090a] text-xs font-medium text-[#f7f8f8] hover:bg-[#121316] hover:text-[#f7f8f8]"
            >
              Sign in
            </Button>
          </SignInButton>
          <SignUpButton mode="modal">
            <Button
              size="sm"
              className="bg-[#5e6ad2] text-xs font-medium text-white hover:bg-[#828fff]"
            >
              Get started
            </Button>
          </SignUpButton>
        </Show>

        <Show when="signed-in">
          <OrganizationSwitcher
            afterCreateOrganizationUrl="/dashboard"
            afterSelectOrganizationUrl="/dashboard"
          />
          {isLandingPage ? (
            <Button
              asChild
              size="sm"
              className="bg-[#5e6ad2] text-xs font-medium text-white hover:bg-[#828fff]"
            >
              <Link href="/dashboard">Dashboard</Link>
            </Button>
          ) : (
            <PlanButton />
          )}
          <UserButton />
        </Show>
      </div>
    </header>
  );
}
