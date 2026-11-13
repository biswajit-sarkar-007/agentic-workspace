"use client";

import { useEffect, useState } from "react";
import { useAuth } from "@clerk/nextjs";
import { SubscriptionDetailsButton, useSubscription } from "@clerk/nextjs/experimental";
import { getActivePromptUsage } from "@/actions/usage";
import { useUpgradeDialog } from "@/components/UpgradeDialog";

type Usage = Awaited<ReturnType<typeof getActivePromptUsage>>;

export const USAGE_CHANGED_EVENT = "axiom:prompt-usage-changed";

// Called after an agent response, so the header count stays current without a reload.
export function refreshPromptUsage() {
  window.dispatchEvent(new Event(USAGE_CHANGED_EVENT));
}

// Header pill for the current context (personal account or selected org): plan name and
// prompt usage meter styled in Linear's dark hairline aesthetic.
export function PlanButton({ upgradeOnlyWhenOut = false }: { upgradeOnlyWhenOut?: boolean }) {
  const { orgId, has } = useAuth();
  const payerType = orgId ? "organization" : "user";
  const { data: subscription } = useSubscription({ for: payerType });
  const [usage, setUsage] = useState<Usage>(null);
  const openUpgrade = useUpgradeDialog();

  useEffect(() => {
    let cancelled = false;
    const load = () => getActivePromptUsage().then((next) => !cancelled && setUsage(next));
    load();
    window.addEventListener(USAGE_CHANGED_EVENT, load);
    return () => {
      cancelled = true;
      window.removeEventListener(USAGE_CHANGED_EVENT, load);
    };
  }, [orgId]);

  if (!usage) return null;

  const { used, limit, isPaid } = usage;
  const isOut = used >= limit;
  const planName =
    subscription?.subscriptionItems.find((item) => item.status === "active" && !item.plan.isDefault)?.plan.name ??
    "Free";

  const upgrade = () =>
    openUpgrade({
      title: isOut ? "Agent prompt limit reached" : "Upgrade prompt quota",
      description: `You have consumed ${used} of ${limit} synthesis prompts this billing cycle. Upgrade for higher concurrency and capacity.`,
    });

  const usageButton = (
    <button
      type="button"
      title={`${used.toLocaleString()} of ${limit.toLocaleString()} agent prompts used this month`}
      onClick={isPaid ? undefined : upgrade}
      className="flex h-full items-center gap-2.5 px-3 transition-colors hover:bg-[#121316]"
    >
      <span className="font-medium text-[#f7f8f8]">{planName}</span>
      <span className="h-1 w-12 overflow-hidden rounded-full bg-[#1b1c20]">
        <span
          className={`block h-full rounded-full ${isOut ? "bg-[#eb5757]" : "bg-[#5e6ad2]"}`}
          style={{ width: `${Math.min(100, (used / limit) * 100)}%` }}
        />
      </span>
      <span className="text-[#8a8f98] tabular-nums font-mono text-[11px]">
        {used.toLocaleString()}/{limit.toLocaleString()}
      </span>
    </button>
  );

  const canManage = isPaid && (!orgId || has?.({ permission: "org:sys_billing:manage" }));

  return (
    <div className="flex h-8 items-center overflow-hidden rounded-full border border-[#23252a] bg-[#08090a] text-xs">
      {canManage ? <SubscriptionDetailsButton for={payerType}>{usageButton}</SubscriptionDetailsButton> : usageButton}
      {!isPaid && (!upgradeOnlyWhenOut || isOut) && (
        <button
          type="button"
          onClick={upgrade}
          className="h-full border-l border-[#23252a] px-3 font-medium text-[#5e6ad2] transition-colors hover:bg-[#5e6ad2]/10"
        >
          Upgrade
        </button>
      )}
    </div>
  );
}
