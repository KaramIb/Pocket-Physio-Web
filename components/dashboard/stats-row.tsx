"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import {
  Users,
  Activity,
  AlertTriangle,
  CheckCircle,
  TrendingUp,
  Check,
} from "lucide-react";
import { Card } from "@/components/ui/card";
import { cn } from "@/lib/utils";
import type { DashboardStats } from "@/lib/types";

interface StatsRowProps {
  stats: DashboardStats;
}

function AnimatedNumber({ value }: { value: number }) {
  const [displayValue, setDisplayValue] = useState(0);

  useEffect(() => {
    const duration = 800;
    const steps = 15;
    const stepValue = value / steps;
    let current = 0;

    const timer = setInterval(() => {
      current += stepValue;
      if (current >= value) {
        setDisplayValue(value);
        clearInterval(timer);
      } else {
        setDisplayValue(Math.floor(current));
      }
    }, duration / steps);

    return () => clearInterval(timer);
  }, [value]);

  return <span>{displayValue}</span>;
}

export function StatsRow({ stats }: StatsRowProps) {
  const activePercentage = Math.round(
    (stats.activeToday / stats.totalPatients) * 100
  );

  return (
    <div className="grid grid-cols-2 gap-3 lg:grid-cols-4">
      {/* Total Patients */}
      <Link href="/patients">
        <Card className="group p-4 transition-all duration-150 hover:shadow-md cursor-pointer">
          <div className="flex items-center justify-between">
            <div>
              <p className="font-mono text-2xl font-bold text-foreground tabular-nums">
                <AnimatedNumber value={stats.totalPatients} />
              </p>
              <p className="text-xs text-muted-foreground">Total Patients</p>
              <p className="mt-1 flex items-center gap-1 text-xs text-success">
                <TrendingUp className="h-3 w-3" />
                +2 this week
              </p>
            </div>
            <div className="rounded-lg bg-primary/10 p-2">
              <Users className="h-4 w-4 text-primary" />
            </div>
          </div>
        </Card>
      </Link>

      {/* Active Today */}
      <Link href="/patients">
        <Card className="group p-4 transition-all duration-150 hover:shadow-md cursor-pointer">
          <div className="flex items-center justify-between">
            <div>
              <p
                className={cn(
                  "font-mono text-2xl font-bold tabular-nums",
                  activePercentage > 70
                    ? "text-success"
                    : "text-foreground"
                )}
              >
                <AnimatedNumber value={stats.activeToday} />
              </p>
              <p className="text-xs text-muted-foreground">Active Today</p>
              <p className="mt-1 text-xs text-muted-foreground">
                {activePercentage}% of total
              </p>
            </div>
            <div className="rounded-lg bg-success-bg p-2">
              <Activity className="h-4 w-4 text-success" />
            </div>
          </div>
        </Card>
      </Link>

      {/* Need Attention */}
      <Link href="/">
        <Card
          className={cn(
            "group p-4 transition-all duration-150 hover:shadow-md cursor-pointer",
            stats.needAttention > 0 && "border-l-4 border-l-warning"
          )}
        >
          <div className="flex items-center justify-between">
            <div>
              {stats.needAttention === 0 ? (
                <>
                  <div className="flex h-8 w-8 items-center justify-center rounded-full bg-success-bg">
                    <Check className="h-4 w-4 text-success" />
                  </div>
                  <p className="mt-1 text-xs font-medium text-success">
                    All clear
                  </p>
                </>
              ) : (
                <>
                  <p className="font-mono text-2xl font-bold text-warning tabular-nums">
                    <AnimatedNumber value={stats.needAttention} />
                  </p>
                  <p className="text-xs text-muted-foreground">
                    Need Attention
                  </p>
                  <p className="mt-1 text-xs text-warning-foreground">
                    Action required
                  </p>
                </>
              )}
            </div>
            <div className="rounded-lg bg-warning-bg p-2">
              <AlertTriangle className="h-4 w-4 text-warning" />
            </div>
          </div>
        </Card>
      </Link>

      {/* Completion Rate */}
      <Link href="/patients">
        <Card className="group p-4 transition-all duration-150 hover:shadow-md cursor-pointer">
          <div className="flex items-center justify-between">
            <div>
              <p
                className={cn(
                  "font-mono text-2xl font-bold tabular-nums",
                  stats.completionRate >= 80
                    ? "text-success"
                    : stats.completionRate >= 60
                      ? "text-warning"
                      : "text-danger"
                )}
              >
                <AnimatedNumber value={stats.completionRate} />%
              </p>
              <p className="text-xs text-muted-foreground">Completion Rate</p>
              <p className="mt-1 flex items-center gap-1 text-xs text-success">
                <TrendingUp className="h-3 w-3" />
                +3% vs last week
              </p>
            </div>
            <div className="rounded-lg bg-success-bg p-2">
              <CheckCircle className="h-4 w-4 text-success" />
            </div>
          </div>
        </Card>
      </Link>
    </div>
  );
}
