"use client";

import { useState } from "react";
import Link from "next/link";
import { Phone, MessageCircle, CheckCircle, Clock, ChevronDown } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { cn } from "@/lib/utils";
import { toast } from "@/hooks/use-toast";
import type { QueueItem as QueueItemType } from "@/lib/queue-types";

interface QueueItemProps {
  item: QueueItemType;
  onAction: (itemId: string, action: "resolved" | "snoozed" | "called" | "checkin_sent") => void;
  onCallOutcome: (itemId: string, outcome: "resolved" | "couldnt_reach" | "escalated") => void;
}

export function QueueItem({ item, onAction, onCallOutcome }: QueueItemProps) {
  const [isActioning, setIsActioning] = useState(false);

  const priorityStyles = {
    critical: "border-l-4 border-l-danger bg-danger-bg/50",
    high: "border-l-4 border-l-warning bg-warning-bg/50",
    low: "border-l-4 border-l-border bg-background",
  };

  const handleSendCheckin = async () => {
    setIsActioning(true);
    // Simulate sending - in reality this would call an API
    await new Promise((resolve) => setTimeout(resolve, 300));
    toast({
      title: "Check-in sent",
      description: `Message sent to ${item.patientName}`,
    });
    onAction(item.id, "checkin_sent");
    setIsActioning(false);
  };

  const handleCall = () => {
    // Open phone dialer
    window.open(`tel:${item.phone.replace(/\s/g, "")}`, "_self");
    onAction(item.id, "called");
  };

  const handleResolve = () => {
    toast({
      title: "Marked as resolved",
    });
    onAction(item.id, "resolved");
  };

  const handleSnooze = (duration: string) => {
    toast({
      title: `Snoozed for ${duration}`,
    });
    onAction(item.id, "snoozed");
  };

  // Awaiting outcome state (after calling)
  if (item.state === "awaiting_outcome") {
    return (
      <div className="rounded-lg border border-border bg-muted/50 p-4 opacity-75">
        <div className="flex items-center justify-between gap-4">
          <div className="min-w-0 flex-1">
            <Link
              href={`/patient/${item.patientId}`}
              className="font-medium text-foreground hover:text-primary hover:underline"
            >
              {item.patientName}
            </Link>
            <p className="mt-0.5 text-sm text-muted-foreground">
              Call in progress — what happened?
            </p>
          </div>
          <div className="flex items-center gap-2">
            <Button
              size="sm"
              variant="outline"
              onClick={() => onCallOutcome(item.id, "resolved")}
              className="bg-transparent"
            >
              Resolved
            </Button>
            <Button
              size="sm"
              variant="outline"
              onClick={() => onCallOutcome(item.id, "couldnt_reach")}
              className="bg-transparent"
            >
              {"Couldn't reach"}
            </Button>
            <Button
              size="sm"
              variant="outline"
              onClick={() => onCallOutcome(item.id, "escalated")}
              className="bg-transparent text-danger border-danger hover:bg-danger-bg"
            >
              Escalated
            </Button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div
      className={cn(
        "rounded-lg border border-border p-4 transition-all duration-200",
        priorityStyles[item.priority]
      )}
    >
      <div className="flex flex-col gap-4 sm:flex-row sm:items-start sm:justify-between">
        {/* Left side: Patient info and reason */}
        <div className="min-w-0 flex-1 space-y-2">
          {/* Patient identity */}
          <div>
            <Link
              href={`/patient/${item.patientId}`}
              className="font-medium text-foreground hover:text-primary hover:underline"
            >
              {item.patientName}
            </Link>
            <p className="text-sm text-muted-foreground">{item.patientContext}</p>
          </div>

          {/* Reason */}
          <div>
            <p className={cn(
              "text-sm font-medium",
              item.priority === "critical" ? "text-danger" : "text-foreground"
            )}>
              {item.reason}
            </p>
            {item.quotedMessage && (
              <p className="mt-1 rounded-md bg-background/80 p-2 text-sm italic text-muted-foreground border-l-2 border-muted-foreground/30">
                &ldquo;{item.quotedMessage}&rdquo;
              </p>
            )}
          </div>
        </div>

        {/* Right side: Actions */}
        <div className="flex items-center gap-2 sm:flex-shrink-0">
          {/* Primary action */}
          {item.recommendedAction === "call" ? (
            <Button
              size="sm"
              onClick={handleCall}
              className="bg-danger hover:bg-danger/90 text-white"
            >
              <Phone className="mr-1.5 h-4 w-4" />
              Call
            </Button>
          ) : (
            <Button
              size="sm"
              onClick={handleSendCheckin}
              disabled={isActioning}
            >
              <MessageCircle className="mr-1.5 h-4 w-4" />
              {isActioning ? "Sending..." : "Send Check-in"}
            </Button>
          )}

          {/* Resolve */}
          <Button
            size="sm"
            variant="outline"
            onClick={handleResolve}
            className="bg-transparent"
          >
            <CheckCircle className="mr-1.5 h-4 w-4" />
            Resolve
          </Button>

          {/* Snooze dropdown */}
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button size="sm" variant="outline" className="bg-transparent px-2">
                <Clock className="h-4 w-4" />
                <ChevronDown className="ml-1 h-3 w-3" />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end">
              <DropdownMenuItem onClick={() => handleSnooze("1 hour")}>
                1 hour
              </DropdownMenuItem>
              <DropdownMenuItem onClick={() => handleSnooze("4 hours")}>
                4 hours
              </DropdownMenuItem>
              <DropdownMenuItem onClick={() => handleSnooze("24 hours")}>
                24 hours
              </DropdownMenuItem>
              <DropdownMenuItem onClick={() => handleSnooze("1 week")}>
                1 week
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
      </div>
    </div>
  );
}

// Loading skeleton
export function QueueItemSkeleton() {
  return (
    <div className="rounded-lg border border-border bg-background p-4">
      <div className="flex items-start justify-between gap-4">
        <div className="flex-1 space-y-2">
          <div className="h-5 w-32 animate-pulse rounded bg-muted" />
          <div className="h-4 w-48 animate-pulse rounded bg-muted" />
          <div className="h-4 w-40 animate-pulse rounded bg-muted" />
        </div>
        <div className="flex gap-2">
          <div className="h-8 w-28 animate-pulse rounded bg-muted" />
          <div className="h-8 w-20 animate-pulse rounded bg-muted" />
          <div className="h-8 w-10 animate-pulse rounded bg-muted" />
        </div>
      </div>
    </div>
  );
}
