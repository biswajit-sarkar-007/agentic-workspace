import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import type { Block } from "@blocknote/core";
import type { TLEditorSnapshot } from "tldraw";
import { prisma } from "@/lib/prisma";
import { getEntitlements, workspaceOwnerId, workspaceOwnerSelect } from "@/lib/billing";
import { Badge } from "@/components/ui/badge";
import { DocViewer } from "@/components/DocEditorLoader";
import { CanvasViewer } from "./_components/CanvasViewer";
import { ResizableHandle, ResizablePanel, ResizablePanelGroup } from "@/components/ui/resizable";
import { AxiomGlyph } from "@/components/AxiomLogo";

// Shared links are private-by-obscurity, so keep them out of search engines.
export const metadata: Metadata = { robots: { index: false, follow: false } };

// Public, no sign-in: anyone with the token sees a read-only copy of the doc and canvas.
export default async function SharedPage({ params }: PageProps<"/shared/[token]">) {
  const { token } = await params;

  const workspace = await prisma.workspace.findUnique({
    where: { shareToken: token },
    select: {
      name: true,
      ...workspaceOwnerSelect,
      doc: { select: { content: true } },
      canvas: { select: { content: true } },
    },
  });
  if (!workspace) notFound();
  if (!(await getEntitlements(workspaceOwnerId(workspace))).publicSharing) notFound();

  return (
    <div className="flex h-dvh flex-col overflow-hidden bg-[#010102]">
      <header className="flex h-14 shrink-0 items-center gap-3 border-b border-[#23252a] bg-[#08090a] px-4">
        <Link
          href="/"
          className="flex size-8 items-center justify-center rounded-md transition-opacity hover:opacity-80"
          title="Axiom"
        >
          <AxiomGlyph className="size-5" />
        </Link>
        <span className="text-sm font-medium text-[#f7f8f8]">{workspace.name}</span>
        <Badge variant="outline" className="border-[#23252a] bg-[#121316] text-[11px] font-normal text-[#8a8f98]">
          Read-only Architecture
        </Badge>
      </header>

      <ResizablePanelGroup orientation="horizontal" className="flex-1">
        <ResizablePanel defaultSize={40} minSize={20}>
          <div className="h-full overflow-y-auto pt-6 bg-[#08090a]">
            <DocViewer content={workspace.doc?.content as Block[] | null} />
          </div>
        </ResizablePanel>
        <ResizableHandle withHandle />
        <ResizablePanel defaultSize={60} minSize={20}>
          <CanvasViewer snapshot={workspace.canvas?.content as TLEditorSnapshot | null} />
        </ResizablePanel>
      </ResizablePanelGroup>
    </div>
  );
}
