"use client";

import { CheckCircle2 } from "lucide-react";
import type { QueueStats } from "@/lib/queue-types";

interface QueueEmptyProps {
  stats: QueueStats;
}

export function QueueEmpty({ stats }: QueueEmptyProps) {
  const formatLastChecked = (timestamp: string) => {
    const date = new Date(timestamp);
    const now = new Date();
    const diffMs = now.getTime() - date.getTime();
    const diffMins = Math.round(diffMs / (1000 * 60));

    if (diffMins < 1) return "Just now";
    if (diffMins === 1) return "1 minute ago";
    if (diffMins < 60) return `${diffMins} minutes ago`;

    const diffHours = Math.round(diffMins / 60);
    if (diffHours === 1) return "1 hour ago";
    return `${diffHours} hours ago`;
  };

  return (
    <div className="flex min-h-[60vh] flex-col items-center justify-center px-4">
      {/* Success indicator */}
      <div className="mb-6 flex h-20 w-20 items-center justify-center rounded-full bg-success-bg">
        <CheckCircle2 className="h-10 w-10 text-success" />
      </div>

      {/* Main message */}
      <h2 className="mb-2 text-2xl font-semibold text-foreground">
        All caught up
      </h2>

      {/* Stats */}
      <p className="mb-4 text-muted-foreground">
        {stats.totalActive} patients active · {stats.totalOnTrack} on track
      </p>

      {/* Last checked */}
      <p className="text-sm text-muted-foreground/70">
        Last checked: {formatLastChecked(stats.lastChecked)}
      </p>
    </div>
  );
}
