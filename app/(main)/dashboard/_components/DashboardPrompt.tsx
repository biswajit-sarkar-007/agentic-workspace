"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { ArrowUp, Sparkles } from "lucide-react";
import { createWorkspace } from "@/actions/workspace";
import { useFetch } from "@/hooks/use-fetch";
import { Button } from "@/components/ui/button";
import { MicButton } from "@/components/MicButton";
import { useUpgradeDialog } from "@/components/UpgradeDialog";
import { UPGRADE_REASONS } from "@/lib/plan-limits";
import { submitOnEnter } from "@/lib/utils";

const MAX_NAME_LENGTH = 48;

const EXAMPLE_PROMPTS = [
  "Design high-throughput event streaming pipeline with Kafka & Postgres",
  "Model multi-tenant RBAC database schema with organization tiers",
  "Architect edge caching gateway with vector store & semantic search",
];

function nameFromPrompt(prompt: string) {
  const firstLine = prompt.trim().split("\n")[0];
  const name =
    firstLine.length <= MAX_NAME_LENGTH
      ? firstLine
      : firstLine.slice(0, MAX_NAME_LENGTH).replace(/\s+\S*$/, "");
  const clean = name.replace(/[\s.,:;!?-]+$/, "");
  return clean.charAt(0).toUpperCase() + clean.slice(1);
}

export function DashboardPrompt() {
  const [prompt, setPrompt] = useState("");
  const router = useRouter();
  const { fn: createWorkspaceFn, loading } = useFetch(createWorkspace);
  const openUpgrade = useUpgradeDialog();
  const busy = loading ?? false;

  const handleSubmit = async () => {
    const trimmed = prompt.trim();
    if (!trimmed || busy) return;
    const result = await createWorkspaceFn(nameFromPrompt(trimmed), trimmed);
    if (!result) return;
    if ("limit" in result) return openUpgrade(UPGRADE_REASONS[result.limit]);
    router.push(`/workspace/${result.workspace.id}?prompt=${encodeURIComponent(trimmed)}`);
  };

  return (
    <section className="mx-auto mb-14 w-full max-w-4xl px-4 py-8 text-center">
      <div className="mb-3 inline-flex items-center gap-2 rounded-full border border-[#23252a] bg-[#08090a] px-3 py-1 text-[11px] font-medium text-[#8a8f98]">
        <Sparkles className="size-3 text-[#5e6ad2]" />
        <span>Axiom Autonomous Architecture Engine</span>
      </div>

      <h2 className="text-[28px] font-semibold leading-tight tracking-[-0.03em] text-[#f7f8f8] sm:text-[36px]">
        Architect a new system
      </h2>
      <p className="mt-2 text-xs leading-relaxed text-[#8a8f98] sm:text-sm">
        State technical requirements. Axiom generates architecture diagrams and living specifications concurrently.
      </p>

      {/* Input Panel with subtle top highlight and hairline border */}
      <div className="mx-auto mt-6 max-w-2xl rounded-[16px] border border-[#23252a] bg-[#08090a] p-3 text-left shadow-[0_16px_36px_-10px_rgba(0,0,0,0.8),inset_0_1px_0_0_rgba(255,255,255,0.06)] transition-all focus-within:border-[#5e69d1] focus-within:ring-2 focus-within:ring-[#5e6ad2]/20">
        <textarea
          value={prompt}
          onChange={(e) => setPrompt(e.target.value)}
          onKeyDown={submitOnEnter(handleSubmit)}
          placeholder="e.g. Model the distributed architecture for a real-time collaborative workspace with Postgres replication..."
          rows={2}
          disabled={busy}
          autoFocus
          className="field-sizing-content max-h-56 min-h-14 w-full resize-none bg-transparent px-2 pt-1 text-sm leading-6 text-[#f7f8f8] outline-none placeholder:text-[#62666d]"
        />
        <div className="mt-2 flex items-center justify-between gap-2 border-t border-[#191a1e] pt-2 pl-2">
          <span className="text-[11px] text-[#62666d]">Press Return to synthesize · Shift + Return for new line</span>
          <div className="flex items-center gap-1.5">
            <MicButton value={prompt} onChange={setPrompt} disabled={busy} className="rounded-full hover:bg-[#121316]" />
            <Button
              size="icon"
              onClick={handleSubmit}
              disabled={!prompt.trim() || busy}
              aria-label="Create workspace"
              className="size-7 rounded-full bg-[#5e6ad2] text-white shadow-sm hover:bg-[#828fff] disabled:opacity-30"
            >
              <ArrowUp className="size-3.5" />
            </Button>
          </div>
        </div>
      </div>

      {/* Example Prompt Chips */}
      <div className="mx-auto mt-4 flex max-w-2xl flex-wrap justify-center gap-2">
        {EXAMPLE_PROMPTS.map((example) => (
          <button
            key={example}
            type="button"
            onClick={() => setPrompt(example)}
            disabled={busy}
            className="rounded-full border border-[#23252a] bg-[#08090a] px-3.5 py-1 text-[11px] text-[#8a8f98] transition-colors hover:border-[#31353d] hover:bg-[#121316] hover:text-[#f7f8f8]"
          >
            {example}
          </button>
        ))}
      </div>
    </section>
  );
}
