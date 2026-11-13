import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import { ClerkProvider } from "@clerk/nextjs";
import { dark } from "@clerk/ui/themes";
import { Toaster } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { AppShell } from "@/components/AppShell";
import { UpgradeDialogProvider } from "@/components/UpgradeDialog";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Axiom — The Intelligent Systems Architecture Workspace",
  description:
    "Architect distributed systems, model relational schemas, and generate verified technical specifications alongside an autonomous agent in real time.",
  icons: {
    icon: "/favicon.svg",
    apple: "/apple-icon.png",
  },
  manifest: "/manifest.json",
  openGraph: {
    title: "Axiom — The Intelligent Systems Architecture Workspace",
    description:
      "Architect distributed systems, model relational schemas, and generate verified technical specifications alongside an autonomous agent in real time.",
    images: [
      { url: "/social/og-image.png", width: 1200, height: 630, alt: "Axiom Workspace" },
    ],
  },
  twitter: { card: "summary_large_image", images: ["/social/og-image.png"] },
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <ClerkProvider
      appearance={{
        theme: dark,
        variables: {
          colorPrimary: "#5e6ad2",
          colorBackground: "#08090a",
          colorInputBackground: "#010102",
          colorInputText: "#f7f8f8",
          borderRadius: "8px",
        },
      }}
    >
      <html
        lang="en"
        className={`dark ${geistSans.variable} ${geistMono.variable} h-full antialiased`}
      >
        <body className="min-h-full flex flex-col bg-[#010102] text-[#f7f8f8]">
          <TooltipProvider>
            <UpgradeDialogProvider>
              <AppShell>{children}</AppShell>
            </UpgradeDialogProvider>
          </TooltipProvider>
          <Toaster richColors />
        </body>
      </html>
    </ClerkProvider>
  );
}
