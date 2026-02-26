"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import {
  CheckCircle,
  AlertTriangle,
  SkipForward,
  ArrowRight,
  ShieldAlert,
  MessageCircle,
  Tag,
} from "lucide-react";
import { Card } from "@/components/ui/card";
import { cn } from "@/lib/utils";

interface ActivityItem {
  id: string;
  patientId: string;
  patientName: string;
  type: "completed" | "skipped" | "safety_flag" | "silent" | "message" | "pain_report" | "barrier";
  message: string;
  timestamp: string;
  painScore?: number;
  isNew?: boolean;
}

const mockActivity: ActivityItem[] = [
  {
    id: "1",
    patientId: "4",
    patientName: "Sarah Kim",
    type: "completed",
    message: "completed today's exercises",
    timestamp: "5 min ago",
    painScore: 2,
    isNew: true,
  },
  {
    id: "2",
    patientId: "2",
    patientName: "Emma Richards",
    type: "safety_flag",
    message: "flagged a safety concern",
    timestamp: "1 hour ago",
  },
  {
    id: "3",
    patientId: "5",
    patientName: "Michael Davis",
    type: "completed",
    message: "completed today's exercises",
    timestamp: "2 hours ago",
    painScore: 3,
  },
  {
    id: "4",
    patientId: "7",
    patientName: "Anna Thompson",
    type: "message",
    message: "sent a message",
    timestamp: "2 hours ago",
  },
  {
    id: "5",
    patientId: "1",
    patientName: "James Morrison",
    type: "pain_report",
    message: "reported pain score 6/10",
    timestamp: "3 hours ago",
    painScore: 6,
  },
  {
    id: "6",
    patientId: "3",
    patientName: "Tom Harrison",
    type: "silent",
    message: "no activity for 3 days",
    timestamp: "4 hours ago",
  },
  {
    id: "7",
    patientId: "1",
    patientName: "James Morrison",
    type: "barrier",
    message: "reported a barrier: Pain",
    timestamp: "5 hours ago",
  },
  {
    id: "8",
    patientId: "6",
    patientName: "Lucy Chen",
    type: "completed",
    message: "completed today's exercises",
    timestamp: "Yesterday",
    painScore: 2,
  },
];

const typeConfig: Record<
  ActivityItem["type"],
  { icon: typeof CheckCircle; iconColor: string; bgColor: string }
> = {
  completed: {
    icon: CheckCircle,
    iconColor: "text-success",
    bgColor: "bg-success-bg",
  },
  skipped: {
    icon: SkipForward,
    iconColor: "text-muted-foreground",
    bgColor: "bg-muted",
  },
  safety_flag: {
    icon: ShieldAlert,
    iconColor: "text-danger",
    bgColor: "bg-danger-bg",
  },
  pain_report: {
    icon: AlertTriangle,
    iconColor: "text-warning",
    bgColor: "bg-warning-bg",
  },
  silent: {
    icon: AlertTriangle,
    iconColor: "text-warning",
    bgColor: "bg-warning-bg",
  },
  message: {
    icon: MessageCircle,
    iconColor: "text-primary",
    bgColor: "bg-primary/10",
  },
  barrier: {
    icon: Tag,
    iconColor: "text-chart-4",
    bgColor: "bg-chart-4/10",
  },
};

export function ActivityFeed() {
  const [visibleItems, setVisibleItems] = useState<ActivityItem[]>([]);

  // Animate items appearing
  useEffect(() => {
    const timer = setTimeout(() => {
      setVisibleItems(mockActivity);
    }, 100);
    return () => clearTimeout(timer);
  }, []);

  return (
    <Card className="p-4">
      <div className="mb-4 flex items-center justify-between">
        <h2 className="text-xs font-semibold uppercase tracking-wide text-muted-foreground">
          Recent Activity
        </h2>
        <Link
          href="/patients"
          className="inline-flex items-center gap-1 text-xs font-medium text-primary hover:underline"
        >
          View all
          <ArrowRight className="h-3 w-3" />
        </Link>
      </div>

      <div className="space-y-1">
        {visibleItems.map((item, index) => {
          const config = typeConfig[item.type];
          const Icon = config.icon;

          return (
            <Link
              key={item.id}
              href={`/patient/${item.patientId}`}
              className={cn(
                "group flex items-start gap-3 rounded-lg p-2.5 transition-all hover:bg-muted",
                item.isNew && "animate-in fade-in slide-in-from-top-2 duration-300"
              )}
              style={{ animationDelay: `${index * 50}ms` }}
            >
              <div
                className={cn(
                  "mt-0.5 flex h-7 w-7 shrink-0 items-center justify-center rounded-full transition-transform group-hover:scale-110",
                  config.bgColor
                )}
              >
                <Icon className={cn("h-3.5 w-3.5", config.iconColor)} />
              </div>
              <div className="flex-1 min-w-0">
                <p className="text-sm leading-snug break-words">
                  <span className="font-medium text-foreground group-hover:text-primary transition-colors">
                    {item.patientName}
                  </span>{" "}
                  <span className="text-muted-foreground">{item.message}</span>
                  {item.painScore !== undefined && (
                    <span className="text-muted-foreground">
                      {" "}· Pain: {item.painScore}/10
                    </span>
                  )}
                </p>
                <p className="mt-0.5 text-xs text-muted-foreground/70 truncate">{item.timestamp}</p>
              </div>
              {item.isNew && (
                <span className="mt-1 flex h-2 w-2 shrink-0">
                  <span className="absolute inline-flex h-2 w-2 animate-ping rounded-full bg-primary opacity-75" />
                  <span className="relative inline-flex h-2 w-2 rounded-full bg-primary" />
                </span>
              )}
            </Link>
          );
        })}
      </div>

      {/* Subtle divider */}
      <div className="mt-4 border-t border-border pt-3">
        <p className="text-center text-xs text-muted-foreground/70">
          Showing last 24 hours
        </p>
      </div>
    </Card>
  );
}
