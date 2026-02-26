"use client";

import { cn } from "@/lib/utils";
import type { Barrier, BarrierCategory } from "@/lib/types";

interface RecentBarriersProps {
  barriers?: Barrier[];
}

interface BarrierSummary {
  category: BarrierCategory;
  count: number;
  isRecurring: boolean;
}

const barrierConfig: Record<BarrierCategory, { color: string; bgColor: string; recurringBg: string }> = {
  Time: {
    color: "text-primary",
    bgColor: "bg-primary/10",
    recurringBg: "bg-primary/20",
  },
  Pain: {
    color: "text-warning",
    bgColor: "bg-warning-bg",
    recurringBg: "bg-warning/20",
  },
  Motivation: {
    color: "text-[#8B5CF6]",
    bgColor: "bg-[#8B5CF6]/10",
    recurringBg: "bg-[#8B5CF6]/20",
  },
  "Life Event": {
    color: "text-muted-foreground",
    bgColor: "bg-muted",
    recurringBg: "bg-muted-foreground/20",
  },
  Other: {
    color: "text-muted-foreground",
    bgColor: "bg-muted/50",
    recurringBg: "bg-muted-foreground/10",
  },
};

export function RecentBarriers({ barriers = [] }: RecentBarriersProps) {
  // Filter to last 7 days
  const sevenDaysAgo = new Date(Date.now() - 7 * 24 * 60 * 60 * 1000);
  const recentBarriers = barriers.filter(
    (b) => new Date(b.timestamp) >= sevenDaysAgo
  );

  // If no barriers, show empty state
  if (recentBarriers.length === 0) {
    return (
      <div className="rounded-lg border border-border bg-card p-5">
        <h3 className="mb-3 text-sm font-semibold text-foreground">
          Recent Barriers
        </h3>
        <p className="text-sm italic text-muted-foreground">
          No barriers reported
        </p>
      </div>
    );
  }

  // Count barriers by category
  const barrierCounts = new Map<BarrierCategory, number>();
  recentBarriers.forEach((barrier) => {
    barrierCounts.set(barrier.category, (barrierCounts.get(barrier.category) || 0) + 1);
  });

  // Create summary with recurring detection
  const barrierSummary: BarrierSummary[] = Array.from(barrierCounts.entries()).map(
    ([category, count]) => ({
      category,
      count,
      isRecurring: count >= 2,
    })
  );

  return (
    <div className="rounded-lg border border-border bg-card p-5">
      <h3 className="mb-3 text-sm font-semibold text-foreground">
        Recent Barriers
      </h3>
      <div className="flex flex-wrap gap-2">
        {barrierSummary.map((barrier) => {
          const config = barrierConfig[barrier.category];
          return (
            <div
              key={barrier.category}
              className={cn(
                "inline-flex items-center gap-1.5 rounded-full px-3 py-1.5 text-sm font-medium transition-colors",
                config.bgColor,
                config.color
              )}
            >
              <span>
                {barrier.category}
                {barrier.count > 1 && (
                  <span className="ml-1 font-semibold">×{barrier.count}</span>
                )}
              </span>
              {barrier.isRecurring && (
                <span
                  className={cn(
                    "ml-1 rounded-full px-2 py-0.5 text-xs font-semibold",
                    config.recurringBg,
                    config.color
                  )}
                >
                  Recurring
                </span>
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
}
