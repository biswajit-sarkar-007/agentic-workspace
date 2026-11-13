"use client";

import { useState } from "react";
import { updateWorkspace } from "@/actions/workspace";
import { useFetch } from "@/hooks/use-fetch";

export function EditableWorkspaceName({
  workspaceId,
  initialName,
}: {
  workspaceId: string;
  initialName: string;
}) {
  const [editing, setEditing] = useState(false);
  const [name, setName] = useState(initialName);
  const { fn: updateWorkspaceFn } = useFetch(updateWorkspace);

  const commit = async () => {
    setEditing(false);
    const trimmed = name.trim();
    // Nothing to save — revert rather than firing a no-op mutation.
    if (!trimmed || trimmed === initialName) {
      setName(initialName);
      return;
    }
    await updateWorkspaceFn(workspaceId, trimmed);
  };

  if (editing) {
    return (
      <input
        value={name}
        onChange={(e) => setName(e.target.value)}
        onBlur={commit}
        onKeyDown={(e) => {
          if (e.key === "Enter") commit();
          if (e.key === "Escape") {
            setName(initialName);
            setEditing(false);
          }
        }}
        autoFocus
        className="rounded-md border border-[#31353d] bg-[#121316] px-2 py-0.5 text-xs font-semibold text-[#f7f8f8] outline-none focus:border-[#5e69d1]"
      />
    );
  }

  return (
    <button
      onClick={() => setEditing(true)}
      className="rounded-md px-2 py-1 text-xs font-semibold text-[#f7f8f8] transition-colors hover:bg-[#121316]"
    >
      {name}
    </button>
  );
}
