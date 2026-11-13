"use client";

import { useState } from "react";
import Link from "next/link";
import { Check } from "lucide-react";
import { useAuth, useOrganization } from "@clerk/nextjs";
import { CheckoutButton, usePlans, useSubscription } from "@clerk/nextjs/experimental";
import { Button } from "@/components/ui/button";

type PayerType = "user" | "organization";
type Plan = NonNullable<ReturnType<typeof usePlans>["data"]>[number];

const TABS: { value: PayerType; label: string }[] = [
  { value: "user", label: "Individual" },
  { value: "organization", label: "Engineering Team" },
];

function planPrice(plan: Plan) {
  const seatFee = plan.unitPrices?.find((u) => u.name === "seats")?.tiers[0]?.feePerBlock;
  if (seatFee && seatFee.amount > 0) {
    return { amount: `${seatFee.currencySymbol}${seatFee.amountFormatted}`, unit: "per engineer / month" };
  }
  if (plan.fee && plan.fee.amount > 0) {
    return { amount: `${plan.fee.currencySymbol}${plan.fee.amountFormatted}`, unit: "per month" };
  }
  return { amount: "$0", unit: "forever" };
}

function sortPlans(plans: Plan[]) {
  const cost = (plan: Plan) =>
    plan.isDefault ? -1 : (plan.unitPrices?.[0]?.tiers[0]?.feePerBlock.amount ?? plan.fee?.amount ?? 0);
  return [...plans].sort((a, b) => cost(a) - cost(b));
}

/**
 * PricingPlans - Redesigned to strict Linear aesthetics in DESIGN.MD:
 * Surface ladder (surface-1 for base, surface-2 for featured), 12px rounded corners,
 * hairline borders, and lavender brand CTAs.
 */
export function PricingPlans({
  title,
  description,
  onCheckoutStart,
}: {
  title?: string;
  description?: string;
  onCheckoutStart?: () => void;
}) {
  const { isSignedIn, orgId } = useAuth();
  const [tab, setTab] = useState<PayerType | null>(null);
  const payerType = tab ?? (orgId ? "organization" : "user");

  const { data: plans, isLoading } = usePlans({ for: payerType, pageSize: 10 });
  const { data: subscription } = useSubscription({
    for: payerType,
    enabled: !!isSignedIn && (payerType === "user" || !!orgId),
  });
  const activePlanIds = new Set(
    subscription?.subscriptionItems.filter((item) => item.status === "active").map((item) => item.plan.id)
  );
  const sortedPlans = sortPlans(plans ?? []);
  const featuredPlanId = sortedPlans.find((plan) => !plan.isDefault)?.id;

  return (
    <div className="mx-auto w-full max-w-5xl">
      {title && (
        <div className="mb-8 text-center">
          <h2 className="text-[28px] font-semibold tracking-[-0.025em] text-[#f7f8f8] sm:text-[36px]">{title}</h2>
          {description && <p className="mx-auto mt-2 max-w-lg text-sm text-[#8a8f98]">{description}</p>}
        </div>
      )}

      {/* Pricing Tabs: Pill Toggle on Canvas */}
      <div className="mx-auto mb-10 flex w-fit rounded-full border border-[#23252a] bg-[#010102] p-1">
        {TABS.map(({ value, label }) => (
          <button
            key={value}
            type="button"
            onClick={() => setTab(value)}
            className={`rounded-full px-5 py-1.5 text-xs font-medium transition-all ${payerType === value
                ? "bg-[#121316] text-[#f7f8f8] shadow-sm"
                : "text-[#8a8f98] hover:text-[#f7f8f8]"
              }`}
          >
            {label}
          </button>
        ))}
      </div>

      {/* Pricing Grid */}
      <div className={`grid gap-6 ${sortedPlans.length > 2 ? "md:grid-cols-3" : "md:grid-cols-2"}`}>
        {isLoading
          ? [0, 1].map((i) => (
            <div
              key={i}
              className="h-96 animate-pulse rounded-[12px] border border-[#23252a] bg-[#08090a]"
            />
          ))
          : sortedPlans.map((plan) => {
            const price = planPrice(plan);
            const isCurrent =
              activePlanIds.has(plan.id) || (!!isSignedIn && plan.isDefault && activePlanIds.size === 0);
            const isFeatured = plan.id === featuredPlanId;

            return (
              <div
                key={plan.id}
                className={`relative flex flex-col rounded-[12px] border p-6 transition-colors shadow-[inset_0_1px_0_0_rgba(255,255,255,0.06)] ${isFeatured
                    ? "border-[#31353d] bg-[#121316]"
                    : "border-[#23252a] bg-[#08090a]"
                  }`}
              >
                {isFeatured && (
                  <span className="absolute -top-3 left-6 rounded-full border border-[#5e6ad2]/40 bg-[#5e6ad2] px-2.5 py-0.5 text-[10px] font-semibold text-white uppercase tracking-wider">
                    Recommended
                  </span>
                )}
                <div className="flex items-center justify-between">
                  <h3 className="text-base font-semibold text-[#f7f8f8]">{plan.name}</h3>
                  {isCurrent && (
                    <span className="rounded-full border border-[#23252a] bg-[#121316] px-2.5 py-0.5 text-[11px] text-[#8a8f98]">
                      Active plan
                    </span>
                  )}
                </div>
                {plan.description && (
                  <p className="mt-1.5 text-xs leading-relaxed text-[#8a8f98]">{plan.description}</p>
                )}

                <div className="mt-6 flex items-baseline gap-2">
                  <span className="text-3xl font-semibold tracking-[-0.03em] text-[#f7f8f8]">{price.amount}</span>
                  <span className="text-xs text-[#8a8f98]">{price.unit}</span>
                </div>

                <ul className="mt-6 mb-8 flex-1 space-y-2.5">
                  {plan.features.length === 0 ? (
                    <li className="text-xs text-[#8a8f98]">Core workspace: vector canvas, living specs, autonomous agent</li>
                  ) : (
                    plan.features.map((feature) => (
                      <li key={feature.id} className="flex items-start gap-2.5 text-xs text-[#d0d6e0]">
                        <Check className="mt-0.5 size-3.5 shrink-0 text-[#5e6ad2]" />
                        <span>{feature.name}</span>
                      </li>
                    ))
                  )}
                </ul>

                <PlanAction
                  plan={plan}
                  payerType={payerType}
                  isFeatured={isFeatured}
                  isCurrent={isCurrent}
                  onCheckoutStart={onCheckoutStart}
                />
              </div>
            );
          })}
      </div>
    </div>
  );
}

function PlanAction({
  plan,
  payerType,
  isFeatured,
  isCurrent,
  onCheckoutStart,
}: {
  plan: Plan;
  payerType: PayerType;
  isFeatured: boolean;
  isCurrent: boolean;
  onCheckoutStart?: () => void;
}) {
  const { isSignedIn, orgId, has } = useAuth();
  const { organization } = useOrganization();
  const isPaid = !plan.isDefault;

  if (!isSignedIn) {
    return (
      <Button
        asChild
        size="lg"
        className={`w-full rounded-md text-xs font-medium transition-colors ${isFeatured
            ? "bg-[#5e6ad2] text-white hover:bg-[#828fff]"
            : "border-[#23252a] bg-[#08090a] text-[#f7f8f8] hover:bg-[#121316] hover:text-[#f7f8f8]"
          }`}
        variant={isFeatured ? "default" : "outline"}
      >
        <Link href="/sign-up">{isPaid ? `Select ${plan.name}` : "Start free"}</Link>
      </Button>
    );
  }

  if (isCurrent || !isPaid) {
    return (
      <Button
        size="lg"
        variant="outline"
        className="w-full rounded-md border-[#23252a] bg-[#08090a] text-xs font-medium text-[#62666d]"
        disabled
      >
        {isCurrent ? "Current plan" : "Included"}
      </Button>
    );
  }

  if (payerType === "organization") {
    if (!orgId) {
      return <Note>Select or create an organization in the header to upgrade.</Note>;
    }
    if (!has?.({ permission: "org:sys_billing:manage" })) {
      return <Note>Ask an administrator of {organization?.name ?? "your team"} to manage billing.</Note>;
    }
  }

  return (
    <div className="space-y-2">
      {payerType === "organization" && organization && (
        <p className="text-center text-[11px] text-[#8a8f98]">
          Upgrading organization <span className="text-[#f7f8f8]">{organization.name}</span>
        </p>
      )}
      <CheckoutButton planId={plan.id} planPeriod="month" for={payerType}>
        <Button
          size="lg"
          variant={isFeatured ? "default" : "outline"}
          className={`w-full rounded-md text-xs font-medium transition-colors ${isFeatured
              ? "bg-[#5e6ad2] text-white hover:bg-[#828fff]"
              : "border-[#23252a] bg-[#08090a] text-[#f7f8f8] hover:bg-[#121316]"
            }`}
          onClick={onCheckoutStart}
        >
          Upgrade to {plan.name}
        </Button>
      </CheckoutButton>
    </div>
  );
}

function Note({ children }: { children: React.ReactNode }) {
  return (
    <p className="rounded-md border border-[#23252a] bg-[#08090a] px-3.5 py-2 text-center text-xs text-[#8a8f98]">
      {children}
    </p>
  );
}
