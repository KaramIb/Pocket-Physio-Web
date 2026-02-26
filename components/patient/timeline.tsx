"use client";

import { useState } from "react";
import {
  CheckCircle,
  SkipForward,
  Circle,
  ShieldAlert,
  MessageCircle,
  Bell,
  ChevronDown,
  ChevronUp,
} from "lucide-react";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import type { TimelineEntry } from "@/lib/types";

interface TimelineProps {
  entries: TimelineEntry[];
}

export function Timeline({ entries }: TimelineProps) {
  const [expandedEntries, setExpandedEntries] = useState<Set<string>>(
    new Set()
  );

  const toggleExpand = (id: string) => {
    setExpandedEntries((prev) => {
      const next = new Set(prev);
      if (next.has(id)) {
        next.delete(id);
      } else {
        next.add(id);
      }
      return next;
    });
  };

  const formatTime = (timestamp: string) => {
    const date = new Date(timestamp);
    const now = new Date();
    const diffMs = now.getTime() - date.getTime();
    const diffHours = diffMs / (1000 * 60 * 60);

    if (diffHours < 1) {
      const mins = Math.round(diffMs / (1000 * 60));
      if (mins <= 1) return "1 min ago";
      return `${mins} mins ago`;
    }
    if (diffHours < 24) {
      const hours = Math.round(diffHours);
      if (hours === 1) return "1 hour ago";
      return `${hours} hours ago`;
    }
    return date.toLocaleTimeString("en-GB", {
      hour: "2-digit",
      minute: "2-digit",
    });
  };

  const getDateGroup = (timestamp: string) => {
    const date = new Date(timestamp);
    const now = new Date();
    const today = new Date(now.getFullYear(), now.getMonth(), now.getDate());
    const yesterday = new Date(today.getTime() - 24 * 60 * 60 * 1000);
    const entryDate = new Date(
      date.getFullYear(),
      date.getMonth(),
      date.getDate()
    );

    if (entryDate.getTime() === today.getTime()) {
      return "TODAY";
    }
    if (entryDate.getTime() === yesterday.getTime()) {
      return "YESTERDAY";
    }
    return date
      .toLocaleDateString("en-GB", {
        day: "numeric",
        month: "short",
      })
      .toUpperCase();
  };

  // Group entries by date
  const groupedEntries = entries.reduce<Record<string, TimelineEntry[]>>(
    (acc, entry) => {
      const group = getDateGroup(entry.timestamp);
      if (!acc[group]) {
        acc[group] = [];
      }
      acc[group].push(entry);
      return acc;
    },
    {}
  );

  const dateGroups = Object.keys(groupedEntries);

  if (entries.length === 0) {
    return (
      <Card className="p-8 text-center">
        <div className="mx-auto mb-4 flex h-12 w-12 items-center justify-center rounded-full bg-muted">
          <MessageCircle className="h-6 w-6 text-muted-foreground" />
        </div>
        <h3 className="text-lg font-medium text-foreground">No activity yet</h3>
        <p className="mt-1 text-sm text-muted-foreground">
          This patient hasn&apos;t recorded any activity yet
        </p>
      </Card>
    );
  }

  return (
    <Card className="overflow-hidden">
      <div className="border-b border-border bg-muted/30 px-4 py-3">
        <h2 className="font-semibold text-foreground">Activity Timeline</h2>
      </div>

      <div className="max-h-[600px] overflow-y-auto">
        {dateGroups.map((dateGroup) => (
          <div key={dateGroup}>
            {/* Sticky Date Header */}
            <div className="sticky top-0 z-10 flex items-center gap-3 border-b border-border bg-background/95 px-4 py-2 backdrop-blur">
              <span className="text-xs font-semibold tracking-wide text-muted-foreground">
                {dateGroup}
              </span>
              <div className="h-px flex-1 bg-border" />
              <span className="text-xs text-muted-foreground">
                {groupedEntries[dateGroup].length} events
              </span>
            </div>

            {/* Entries for this date */}
            <div className="relative px-4 py-2">
              {/* Vertical line */}
              <div className="absolute left-[31px] top-0 bottom-0 w-px bg-border" />

              {groupedEntries[dateGroup].map((entry, index) => (
                <TimelineEntryRow
                  key={entry.id}
                  entry={entry}
                  isExpanded={expandedEntries.has(entry.id)}
                  onToggle={() => toggleExpand(entry.id)}
                  formatTime={formatTime}
                  isLast={index === groupedEntries[dateGroup].length - 1}
                />
              ))}
            </div>
          </div>
        ))}
      </div>
    </Card>
  );
}

interface TimelineEntryRowProps {
  entry: TimelineEntry;
  isExpanded: boolean;
  onToggle: () => void;
  formatTime: (timestamp: string) => string;
  isLast: boolean;
}

function TimelineEntryRow({
  entry,
  isExpanded,
  onToggle,
  formatTime,
}: TimelineEntryRowProps) {
  const getIcon = () => {
    switch (entry.type) {
      case "completed":
        return (
          <div className="flex h-8 w-8 items-center justify-center rounded-full bg-success-bg">
            <CheckCircle className="h-4 w-4 text-success" />
          </div>
        );
      case "skipped":
        return (
          <div className="flex h-8 w-8 items-center justify-center rounded-full bg-muted">
            <SkipForward className="h-4 w-4 text-muted-foreground" />
          </div>
        );
      case "no_response":
        return (
          <div className="flex h-8 w-8 items-center justify-center rounded-full bg-muted">
            <Circle className="h-4 w-4 text-muted-foreground" />
          </div>
        );
      case "safety_flag":
        return (
          <div className="flex h-8 w-8 items-center justify-center rounded-full bg-danger-bg">
            <ShieldAlert className="h-4 w-4 text-danger" />
          </div>
        );
      case "question":
        return (
          <div className="flex h-8 w-8 items-center justify-center rounded-full bg-primary/10">
            <MessageCircle className="h-4 w-4 text-primary" />
          </div>
        );
      case "reminder":
        return (
          <div className="flex h-8 w-8 items-center justify-center rounded-full bg-muted">
            <Bell className="h-4 w-4 text-muted-foreground" />
          </div>
        );
    }
  };

  const getTitle = () => {
    switch (entry.type) {
      case "completed":
        return "Exercise Completed";
      case "skipped":
        return "Exercise Skipped";
      case "no_response":
        return "No Activity Recorded";
      case "safety_flag":
        return "Safety Concern Flagged";
      case "question":
        return "Question Asked";
      case "reminder":
        return "Reminder Sent";
    }
  };

  const hasExpandableContent = entry.message && entry.message.length > 80;

  return (
    <div
      className={cn(
        "relative flex gap-4 py-3",
        entry.type === "safety_flag" && "rounded-md bg-danger-bg/30 px-2 -mx-2"
      )}
    >
      {/* Icon */}
      <div className="relative z-10 shrink-0">{getIcon()}</div>

      {/* Content */}
      <div className="min-w-0 flex-1">
        <div className="flex flex-wrap items-center gap-x-2 gap-y-1">
          <span className="font-medium text-foreground">{getTitle()}</span>
          <span className="text-sm text-muted-foreground">
            {formatTime(entry.timestamp)}
          </span>
          {entry.painScore !== undefined && (
            <span className="rounded-md bg-muted px-2 py-0.5 text-xs font-medium">
              Pain: {entry.painScore}/10
            </span>
          )}
        </div>

        {entry.message && (
          <div className="mt-1">
            <p
              className={cn(
                "text-sm italic text-muted-foreground",
                entry.type === "safety_flag" && "text-danger-foreground"
              )}
            >
              {!hasExpandableContent || isExpanded ? (
                <>
                  &quot;{entry.message}&quot;
                  {hasExpandableContent && (
                    <Button
                      variant="ghost"
                      size="sm"
                      onClick={onToggle}
                      className="ml-1 h-auto p-0 text-xs font-medium text-primary hover:bg-transparent"
                    >
                      <ChevronUp className="mr-0.5 h-3 w-3" />
                      Show less
                    </Button>
                  )}
                </>
              ) : (
                <>
                  &quot;{entry.message.slice(0, 80)}...&quot;
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={onToggle}
                    className="ml-1 h-auto p-0 text-xs font-medium text-primary hover:bg-transparent"
                  >
                    <ChevronDown className="mr-0.5 h-3 w-3" />
                    Show more
                  </Button>
                </>
              )}
            </p>
          </div>
        )}

        {entry.botResponse && (
          <div className="mt-2 rounded-md bg-muted p-2">
            <p className="text-xs font-medium text-muted-foreground">
              Bot Response:
            </p>
            <p className="mt-0.5 text-sm text-foreground">{entry.botResponse}</p>
          </div>
        )}
      </div>
    </div>
  );
}
