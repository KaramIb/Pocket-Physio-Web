"use client";

import { useState } from "react";
import { ArrowRight, Check, ChevronDown, Users } from "lucide-react";
import Link from "next/link";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { cn } from "@/lib/utils";
import type { Patient } from "@/lib/types";

interface OnTrackSectionProps {
  patients: Patient[];
}

type SortOption = "recent" | "alphabetical" | "ending";

export function OnTrackSection({ patients }: OnTrackSectionProps) {
  const [sortBy, setSortBy] = useState<SortOption>("recent");

  const sortedPatients = [...patients].sort((a, b) => {
    switch (sortBy) {
      case "alphabetical":
        return a.name.localeCompare(b.name);
      case "ending":
        return (a.totalDays - a.currentDay) - (b.totalDays - b.currentDay);
      default:
        // Most recent activity first
        const aRecent = a.lastResponse === "Today" ? 0 : a.lastResponse === "Yesterday" ? 1 : 2;
        const bRecent = b.lastResponse === "Today" ? 0 : b.lastResponse === "Yesterday" ? 1 : 2;
        return aRecent - bRecent;
    }
  });

  if (patients.length === 0) {
    return (
      <section>
        <div className="flex items-center justify-between rounded-lg bg-muted px-4 py-3">
          <div className="flex items-center gap-2">
            <Users className="h-5 w-5 text-muted-foreground" aria-hidden="true" />
            <h2 className="text-lg font-semibold text-foreground">On Track</h2>
          </div>
        </div>
        <Card className="mt-4 p-8 text-center">
          <div className="mx-auto mb-4 flex h-16 w-16 items-center justify-center rounded-full bg-muted">
            <Users className="h-8 w-8 text-muted-foreground" />
          </div>
          <h3 className="text-lg font-medium text-foreground">
            No patients match this filter
          </h3>
          <p className="mt-1 text-sm text-muted-foreground">
            Try adjusting your filters to see more patients
          </p>
        </Card>
      </section>
    );
  }

  return (
    <section>
      <div className="flex items-center justify-between rounded-lg bg-success-bg/50 px-4 py-3">
        <div className="flex items-center gap-2">
          <Check className="h-5 w-5 text-success" aria-hidden="true" />
          <h2 className="text-lg font-semibold text-foreground">
            On Track{" "}
            <span className="font-normal text-muted-foreground">
              ({patients.length})
            </span>
          </h2>
        </div>
        <div className="flex items-center gap-3">
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="ghost" size="sm" className="h-8 gap-1 text-sm">
                {sortBy === "recent" && "Most recent"}
                {sortBy === "alphabetical" && "Alphabetical"}
                {sortBy === "ending" && "Ending soon"}
                <ChevronDown className="h-4 w-4" />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end">
              <DropdownMenuItem onClick={() => setSortBy("recent")}>
                Most recent
              </DropdownMenuItem>
              <DropdownMenuItem onClick={() => setSortBy("alphabetical")}>
                Alphabetical
              </DropdownMenuItem>
              <DropdownMenuItem onClick={() => setSortBy("ending")}>
                Ending soon
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
          <Link
            href="/patients?filter=on-track"
            className="flex items-center gap-1 text-sm font-medium text-primary hover:underline"
          >
            View All
            <ArrowRight className="h-4 w-4" />
          </Link>
        </div>
      </div>

      {/* Compact Card Grid */}
      <div className="mt-4 grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
        {sortedPatients.map((patient) => (
          <PatientCompactCard key={patient.id} patient={patient} />
        ))}
      </div>
    </section>
  );
}

function PatientCompactCard({ patient }: { patient: Patient }) {
  const progressPercent = Math.round(
    (patient.currentDay / patient.totalDays) * 100
  );
  const daysRemaining = patient.totalDays - patient.currentDay;

  return (
    <Link href={`/patient/${patient.id}`} className="block group">
      <Card className="p-4 transition-all duration-200 hover:-translate-y-0.5 hover:shadow-md">
        <div className="flex items-start justify-between">
          <div className="min-w-0 flex-1">
            <h3 className="truncate font-medium text-foreground group-hover:text-primary transition-colors">
              {patient.name}
            </h3>
            <p className="mt-0.5 text-xs text-muted-foreground">
              {daysRemaining === 0 ? "Last day" : `${daysRemaining} days left`}
            </p>
          </div>
          <div
            className={cn(
              "ml-2 flex h-8 w-8 shrink-0 items-center justify-center rounded-full text-xs font-semibold",
              patient.lastPainScore <= 3
                ? "bg-success-bg text-success"
                : patient.lastPainScore <= 5
                  ? "bg-warning-bg text-warning"
                  : "bg-danger-bg text-danger"
            )}
          >
            {patient.lastPainScore}
          </div>
        </div>

        {/* Progress Bar */}
        <div className="mt-3">
          <div className="flex items-center justify-between text-xs text-muted-foreground">
            <span>Day {patient.currentDay}/{patient.totalDays}</span>
            <span>{progressPercent}%</span>
          </div>
          <div className="mt-1 h-1.5 w-full overflow-hidden rounded-full bg-muted">
            <div
              className="h-full rounded-full bg-primary transition-all"
              style={{ width: `${progressPercent}%` }}
            />
          </div>
        </div>

        {/* View button - visible on hover */}
        <div className="mt-3 flex justify-end opacity-0 transition-opacity group-hover:opacity-100">
          <span className="text-xs font-medium text-primary">
            View details →
          </span>
        </div>
      </Card>
    </Link>
  );
}
