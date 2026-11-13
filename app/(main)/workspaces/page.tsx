import { redirect } from "next/navigation";
import { Plus } from "lucide-react";
import { checkUser } from "@/actions/check-user";
import { prisma } from "@/lib/prisma";
import { getWorkspaceScope } from "@/lib/workspace-scope";
import { withLastActivity, workspaceCardSelect } from "@/lib/workspace-status";
import { Button } from "@/components/ui/button";
import { WorkspaceDialog } from "@/components/WorkspaceDialog";
import { WorkspaceBoard } from "./_components/WorkspaceBoard";

export default async function WorkspacesPage() {
  const user = await checkUser();
  if (!user) redirect("/sign-in");

  const { orgName, where } = await getWorkspaceScope(user.id);
  const workspaces = await prisma.workspace.findMany({
    where,
    select: { ...workspaceCardSelect, position: true },
    orderBy: { position: "asc" },
  });

  return (
    <div className="flex-1 bg-[#010102] p-8 text-[#f7f8f8]">
      <div className="mb-6 flex items-end justify-between gap-4 border-b border-[#23252a] pb-4">
        <div>
          <p className="text-[11px] font-mono uppercase tracking-wider text-[#8a8f98]">{orgName}</p>
          <h1 className="mt-1 text-xl font-semibold tracking-tight text-[#f7f8f8]">Architecture Workspaces</h1>
        </div>
        <WorkspaceDialog
          trigger={
            <Button className="gap-1.5 rounded-md bg-[#5e6ad2] text-xs font-medium text-white hover:bg-[#828fff]">
              <Plus className="size-3.5" />
              New Workspace
            </Button>
          }
        />
      </div>

      {workspaces.length === 0 ? (
        <div className="rounded-[12px] border border-[#23252a] bg-[#08090a] py-16 text-center">
          <p className="text-xs text-[#8a8f98]">
            No workspaces found. Initialize a new workspace or specify one on the dashboard.
          </p>
        </div>
      ) : (
        <WorkspaceBoard workspaces={workspaces.map(withLastActivity)} />
      )}
    </div>
  );
}
