import { redirect } from "next/navigation";
import Link from "next/link";
import { KanbanSquare, Plus } from "lucide-react";
import { compareDesc } from "date-fns";
import { checkUser } from "@/actions/check-user";
import { prisma } from "@/lib/prisma";
import { getWorkspaceScope } from "@/lib/workspace-scope";
import { withLastActivity, workspaceCardSelect } from "@/lib/workspace-status";
import { Button } from "@/components/ui/button";
import { WorkspaceDialog } from "@/components/WorkspaceDialog";
import { RecentWorkspaces } from "./_components/RecentWorkspaces";
import { DashboardPrompt } from "./_components/DashboardPrompt";

const RECENT_COUNT = 4;

export default async function DashboardPage() {
  const user = await checkUser();
  if (!user) redirect("/sign-in");

  const { orgName, where } = await getWorkspaceScope(user.id);
  const workspaces = await prisma.workspace.findMany({ where, select: workspaceCardSelect });
  const recent = workspaces
    .map(withLastActivity)
    .sort((a, b) => compareDesc(a.lastActivity, b.lastActivity))
    .slice(0, RECENT_COUNT);

  return (
    <div className="flex-1 bg-[#010102] p-8 text-[#f7f8f8]">
      <DashboardPrompt />

      <section className="mx-auto max-w-6xl">
        <div className="mb-5 flex items-end justify-between gap-4 border-b border-[#23252a] pb-4">
          <div>
            <p className="text-[11px] font-mono uppercase tracking-wider text-[#8a8f98]">{orgName}</p>
            <h2 className="mt-1 text-base font-semibold tracking-tight text-[#f7f8f8]">Recent Workspaces</h2>
          </div>
          <div className="flex items-center gap-2">
            {workspaces.length > 0 && (
              <Button
                asChild
                variant="ghost"
                size="sm"
                className="gap-1.5 text-xs text-[#8a8f98] hover:bg-[#121316] hover:text-[#f7f8f8]"
              >
                <Link href="/workspaces">
                  <KanbanSquare className="size-3.5" />
                  Architecture Board ({workspaces.length})
                </Link>
              </Button>
            )}
            <WorkspaceDialog
              trigger={
                <Button
                  size="sm"
                  className="gap-1.5 rounded-md bg-[#5e6ad2] text-xs font-medium text-white hover:bg-[#828fff]"
                >
                  <Plus className="size-3.5" />
                  New Workspace
                </Button>
              }
            />
          </div>
        </div>

        {workspaces.length === 0 ? (
          <div className="rounded-[12px] border border-[#23252a] bg-[#08090a] py-14 text-center">
            <p className="text-xs text-[#8a8f98]">
              No workspaces created yet. Enter a technical specification above to initiate a workspace.
            </p>
          </div>
        ) : (
          <RecentWorkspaces workspaces={recent} />
        )}
      </section>
    </div>
  );
}
