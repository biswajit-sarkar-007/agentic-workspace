import Image from "next/image";
import Link from "next/link";
import { LayoutGrid } from "lucide-react";
import { formatDistanceToNow } from "date-fns";
import type { WorkspaceStatus } from "@/lib/generated/prisma/enums";
import { statusTitle } from "@/lib/workspace-status";

export type WorkspaceCardData = {
  id: string;
  name: string;
  description: string | null;
  status: WorkspaceStatus;
  lastActivity: Date;
  creator: { name: string | null; imageUrl: string | null };
};

export function WorkspaceCard({
  workspace,
  showStatus = false,
  highlighted = false,
  actions,
}: {
  workspace: WorkspaceCardData;
  showStatus?: boolean;
  highlighted?: boolean;
  actions?: React.ReactNode;
}) {
  return (
    <div
      className={`group relative flex h-36 flex-col gap-1 rounded-[12px] p-3.5 border transition-all duration-150 shadow-[inset_0_1px_0_0_rgba(255,255,255,0.06)] ${highlighted
          ? "border-[#5e6ad2] bg-[#121316] shadow-md shadow-[#5e6ad2]/10"
          : "border-[#23252a] bg-[#08090a] hover:border-[#31353d] hover:bg-[#121316]"
        }`}
    >
      <Link
        href={`/workspace/${workspace.id}`}
        draggable={false}
        className="line-clamp-2 pr-7 text-xs font-semibold leading-snug text-[#f7f8f8] after:absolute after:inset-0"
      >
        {workspace.name}
      </Link>
      {workspace.description && (
        <p className="line-clamp-2 text-[11px] leading-relaxed text-[#8a8f98]">{workspace.description}</p>
      )}

      <div className="mt-auto flex items-center justify-between gap-2 text-[11px] text-[#8a8f98]">
        <span className="flex min-w-0 items-center gap-1.5" suppressHydrationWarning>
          <LayoutGrid className="size-3 shrink-0 text-[#5e6ad2]" />
          <span className="truncate font-mono text-[10px]" suppressHydrationWarning>
            {showStatus && `${statusTitle(workspace.status)} · `}
            {formatDistanceToNow(workspace.lastActivity, { addSuffix: true })}
          </span>
        </span>
        <CreatorAvatar creator={workspace.creator} />
      </div>

      {actions}
    </div>
  );
}

function CreatorAvatar({ creator }: { creator: WorkspaceCardData["creator"] }) {
  const name = creator.name ?? "Unknown";
  return creator.imageUrl ? (
    <Image src={creator.imageUrl} alt={name} title={name} width={20} height={20} className="size-5 shrink-0 rounded-full border border-[#23252a]" />
  ) : (
    <span
      title={name}
      className="flex size-5 shrink-0 items-center justify-center rounded-full border border-[#23252a] bg-[#121316] text-[9px] font-semibold text-[#f7f8f8]"
    >
      {name.charAt(0).toUpperCase()}
    </span>
  );
}
