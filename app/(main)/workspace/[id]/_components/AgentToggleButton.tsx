"use client";

import { useEffect, useRef, useState } from "react";
import { usePathname, useRouter } from "next/navigation";
import { X } from "lucide-react";
import { Button } from "@/components/ui/button";
import { AgentChatPanel } from "./AgentChatPanel";
import { useWorkspaceEditors } from "@/components/WorkspaceEditorsContext";
import { useWorkspaceAgentChat } from "@/hooks/use-workspace-agent-chat";
import { AxiomGlyph } from "@/components/AxiomLogo";

// Owns the open/closed state for the agent chat panel — needs a client boundary since
// page.tsx is a server component, so this is the button plus the panel it toggles.
export function AgentToggleButton({ workspaceId, initialPrompt }: { workspaceId: string; initialPrompt?: string }) {
  const [isOpen, setIsOpen] = useState(!!initialPrompt);
  const { canvasEditor, docEditor } = useWorkspaceEditors();
  const chat = useWorkspaceAgentChat(workspaceId, { canvasEditor, docEditor });
  const router = useRouter();
  const pathname = usePathname();
  const promptSent = useRef(false);

  useEffect(() => {
    if (!initialPrompt || promptSent.current || !canvasEditor || !docEditor) return;
    promptSent.current = true;
    chat.sendMessage({ text: initialPrompt });
    router.replace(pathname, { scroll: false });
  }, [initialPrompt, canvasEditor, docEditor, chat, router, pathname]);

  return (
    <>
      <Button
        size="sm"
        className="gap-1.5 rounded-md bg-[#5e6ad2] text-xs font-medium text-white hover:bg-[#828fff]"
        onClick={() => setIsOpen((v) => !v)}
      >
        {isOpen ? (
          <>
            <X className="size-3.5" />
            <span>Close</span>
          </>
        ) : (
          <>
            <AxiomGlyph className="size-3.5" />
            <span>Axiom Agent</span>
          </>
        )}
      </Button>
      {isOpen && <AgentChatPanel chat={chat} isReady={!!canvasEditor || !!docEditor} />}
    </>
  );
}
