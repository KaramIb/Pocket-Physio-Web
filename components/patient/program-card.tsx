"use client";

import { useState } from "react";
import { ArrowRight } from "lucide-react";
import { Card } from "@/components/ui/card";
import { ProgramSlideover } from "@/components/patient/program-slideover";
import type { Patient } from "@/lib/types";

interface ProgramCardProps {
  patient: Patient;
}

export function ProgramCard({ patient }: ProgramCardProps) {
  const [slideoverOpen, setSlideoverOpen] = useState(false);

  const progressPercent = Math.round(
    (patient.currentDay / patient.totalDays) * 100
  );

  return (
    <>
      <Card className="p-4">
        <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
          <div className="flex-1 min-w-0">
            <h2 className="font-semibold text-foreground break-words">
              {patient.programName}
            </h2>
            <p className="mt-1 text-sm text-muted-foreground break-words">
              Week {patient.currentWeek} of {patient.totalWeeks} · Day{" "}
              {patient.currentDay} of {patient.totalDays}
            </p>

            {/* Progress Bar */}
            <div className="mt-3">
              <div className="h-2 w-full overflow-hidden rounded-full bg-muted">
                <div
                  className="h-full rounded-full bg-primary transition-all"
                  style={{ width: `${progressPercent}%` }}
                />
              </div>
              <p className="mt-1 text-xs text-muted-foreground">
                {progressPercent}% complete
              </p>
            </div>
          </div>

          <button
            onClick={() => setSlideoverOpen(true)}
            className="inline-flex items-center gap-1 text-sm font-medium text-primary hover:underline cursor-pointer"
          >
            View Program
            <ArrowRight className="h-4 w-4" />
          </button>
        </div>
      </Card>

      <ProgramSlideover
        patient={patient}
        open={slideoverOpen}
        onOpenChange={setSlideoverOpen}
      />
    </>
  );
}
