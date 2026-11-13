"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { createWorkspace, updateWorkspace } from "@/actions/workspace";
import { useUpgradeDialog } from "@/components/UpgradeDialog";
import { UPGRADE_REASONS } from "@/lib/plan-limits";
import { useFetch } from "@/hooks/use-fetch";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import {
  Dialog,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";

type EditableWorkspace = { id: string; name: string; description: string | null };

// Creates a workspace, or edits one when `workspace` is passed. Opens from its own `trigger`,
// or from outside via `open`/`onOpenChange` (e.g. a card's dropdown menu).
export function WorkspaceDialog({
  workspace,
  trigger,
  open,
  onOpenChange,
}: {
  workspace?: EditableWorkspace;
  trigger?: React.ReactNode;
  open?: boolean;
  onOpenChange?: (open: boolean) => void;
}) {
  const [internalOpen, setInternalOpen] = useState(false);
  const isOpen = open ?? internalOpen;
  const setOpen = onOpenChange ?? setInternalOpen;

  return (
    <Dialog open={isOpen} onOpenChange={setOpen}>
      {trigger && <DialogTrigger asChild>{trigger}</DialogTrigger>}
      <DialogContent>
        <DialogHeader>
          <DialogTitle className="text-base font-semibold text-[#f7f8f8]">
            {workspace ? "Edit Architecture Workspace" : "New Architecture Workspace"}
          </DialogTitle>
        </DialogHeader>
        {/* Mounted per open, so the fields always start from the current values. */}
        <WorkspaceForm workspace={workspace} onDone={() => setOpen(false)} />
      </DialogContent>
    </Dialog>
  );
}

function WorkspaceForm({ workspace, onDone }: { workspace?: EditableWorkspace; onDone: () => void }) {
  const [name, setName] = useState(workspace?.name ?? "");
  const [description, setDescription] = useState(workspace?.description ?? "");
  const router = useRouter();
  const { fn: createWorkspaceFn, loading: creating } = useFetch(createWorkspace);
  const { fn: updateWorkspaceFn, loading: updating } = useFetch(updateWorkspace);
  const loading = creating || updating;
  const openUpgrade = useUpgradeDialog();

  const handleSubmit = async () => {
    if (workspace) {
      const updated = await updateWorkspaceFn(workspace.id, name, description);
      if (updated) onDone();
      return;
    }
    const result = await createWorkspaceFn(name, description);
    if (!result) return;
    onDone();
    if ("limit" in result) return openUpgrade(UPGRADE_REASONS[result.limit]);
    router.push(`/workspace/${result.workspace.id}`);
  };

  return (
    <>
      <div className="space-y-2">
        <Label htmlFor="workspace-name" className="text-xs text-[#8a8f98]">Workspace Title</Label>
        <Input
          id="workspace-name"
          placeholder="e.g. Ingestion Pipeline & Schema v2"
          value={name}
          onChange={(e) => setName(e.target.value)}
          onKeyDown={(e) => e.key === "Enter" && handleSubmit()}
          autoFocus
        />
      </div>
      <div className="space-y-2">
        <Label htmlFor="workspace-description" className="text-xs text-[#8a8f98]">
          Architecture Scope <span className="text-[#62666d]">(optional)</span>
        </Label>
        <Textarea
          id="workspace-description"
          placeholder="Core microservices, relational tables, and throughput constraints..."
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          rows={3}
        />
      </div>
      <DialogFooter>
        <Button onClick={handleSubmit} disabled={loading || !name.trim()}>
          {loading ? "Saving..." : workspace ? "Save" : "Create"}
        </Button>
      </DialogFooter>
    </>
  );
}
