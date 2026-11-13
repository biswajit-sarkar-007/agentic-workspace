import { auth, clerkClient } from "@clerk/nextjs/server";
import { prisma } from "@/lib/prisma";
import { workspaceOwnerSelect } from "@/lib/billing";

// Org workspaces are open to every member of that org; personal (org-less) ones only to their creator.
export async function canAccessWorkspace(workspaceId: string) {
  const { userId, orgId } = await auth();
  if (!userId) return false;

  const workspace = await prisma.workspace.findUnique({
    where: { id: workspaceId },
    select: workspaceOwnerSelect,
  });
  if (!workspace) return false;

  // The creator can always access their own workspace
  if (workspace.creator?.clerkId === userId) return true;

  // Active organization match
  if (workspace.clerkOrgId && workspace.clerkOrgId === orgId) return true;

  // Check full membership list if belongs to another organization
  if (workspace.clerkOrgId) {
    try {
      const clerk = await clerkClient();
      const { data: memberships } = await clerk.users.getOrganizationMembershipList({ userId, limit: 100 });
      return memberships.some((m) => m.organization.id === workspace.clerkOrgId);
    } catch (error) {
      console.error("Error verifying organization membership:", error);
      return false;
    }
  }

  return false;
}
