"use client";

import { ExternalLink, Play } from "lucide-react";
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetFooter,
} from "@/components/ui/sheet";
import { Button } from "@/components/ui/button";
import type { Patient } from "@/lib/types";

interface ProgramSlideoverProps {
  patient: Patient;
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

interface Exercise {
  name: string;
  sets: number;
  reps: number;
  notes?: string;
  videoUrl?: string;
}

// Generate exercise list based on patient program
function getExercises(patient: Patient): Exercise[] {
  const exercisesByProgram: Record<string, Exercise[]> = {
    "Lower Back Pain Recovery": [
      { name: "Cat-Cow Stretch", sets: 3, reps: 10, notes: "Slow and controlled", videoUrl: "#" },
      { name: "Bird Dog", sets: 3, reps: 8, notes: "Hold 3s each side", videoUrl: "#" },
      { name: "Pelvic Tilts", sets: 2, reps: 15 },
      { name: "Glute Bridge", sets: 3, reps: 12, videoUrl: "#" },
      { name: "Side-lying Clam", sets: 2, reps: 10, notes: "Keep feet together" },
      { name: "Prone Press-up", sets: 2, reps: 8, notes: "Elbows under shoulders", videoUrl: "#" },
    ],
    "Post-Op Knee Rehab": [
      { name: "Quad Sets", sets: 3, reps: 10, notes: "Hold 5s each", videoUrl: "#" },
      { name: "Straight Leg Raise", sets: 3, reps: 10, videoUrl: "#" },
      { name: "Heel Slides", sets: 3, reps: 15 },
      { name: "Wall Squats", sets: 2, reps: 8, notes: "Partial range only", videoUrl: "#" },
      { name: "Seated Knee Extension", sets: 2, reps: 12 },
    ],
    "Shoulder Mobility Program": [
      { name: "Pendulum Swings", sets: 2, reps: 20, videoUrl: "#" },
      { name: "Wall Walks", sets: 3, reps: 8, notes: "Go to tolerance", videoUrl: "#" },
      { name: "External Rotation (Band)", sets: 3, reps: 12 },
      { name: "Scapular Squeezes", sets: 2, reps: 15 },
    ],
  };

  return exercisesByProgram[patient.programName] || [
    { name: "Exercise A", sets: 3, reps: 10 },
    { name: "Exercise B", sets: 2, reps: 12 },
    { name: "Exercise C", sets: 3, reps: 8 },
  ];
}

function getActiveDays(patient: Patient): string {
  // Simulate schedule based on program
  const schedules: Record<string, string> = {
    "Lower Back Pain Recovery": "Mon, Wed, Fri",
    "Post-Op Knee Rehab": "Mon, Tue, Thu, Fri",
    "Shoulder Mobility Program": "Mon, Wed, Fri, Sat",
  };
  return schedules[patient.programName] || "Mon, Wed, Fri";
}

export function ProgramSlideover({ patient, open, onOpenChange }: ProgramSlideoverProps) {
  const exercises = getExercises(patient);
  const activeDays = getActiveDays(patient);

  return (
    <Sheet open={open} onOpenChange={onOpenChange}>
      <SheetContent className="overflow-y-auto sm:max-w-md">
        <SheetHeader className="pb-4">
          <SheetTitle className="flex items-center gap-2 text-lg">
            Current Program
            {patient.programUrl && (
              <a
                href={patient.programUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="text-muted-foreground hover:text-primary transition-colors"
                aria-label="Open full program in new tab"
              >
                <ExternalLink className="h-4 w-4" />
              </a>
            )}
          </SheetTitle>
          <p className="text-sm text-muted-foreground">
            Week {patient.currentWeek} of {patient.totalWeeks} · Day{" "}
            {patient.currentDay} of {patient.totalDays} · {activeDays}
          </p>
        </SheetHeader>

        {/* Exercise List */}
        <div className="space-y-1 pt-2">
          {exercises.map((exercise, i) => (
            <div
              key={i}
              className="flex items-start justify-between gap-3 rounded-lg px-3 py-3 transition-colors hover:bg-muted/50"
            >
              <div className="min-w-0 flex-1">
                <p className="text-sm font-medium text-foreground">
                  {exercise.name}
                </p>
                <p className="mt-0.5 text-xs text-muted-foreground">
                  {exercise.sets} &times; {exercise.reps}
                  {exercise.notes && (
                    <span className="text-muted-foreground/70">
                      {" "}
                      &middot; {exercise.notes}
                    </span>
                  )}
                </p>
              </div>
              {exercise.videoUrl && (
                <a
                  href={exercise.videoUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="mt-0.5 flex shrink-0 items-center gap-1 text-xs font-medium text-primary hover:underline"
                >
                  <Play className="h-3 w-3" />
                  Video
                </a>
              )}
            </div>
          ))}
        </div>

        {/* Progress Summary */}
        <div className="mt-6 rounded-lg bg-muted/50 px-4 py-3">
          <div className="flex items-center justify-between text-sm">
            <span className="text-muted-foreground">Exercises completed</span>
            <span className="font-medium text-foreground">
              {patient.completedExercises} / {patient.totalExercises}
            </span>
          </div>
          <div className="mt-2 h-1.5 w-full overflow-hidden rounded-full bg-muted">
            <div
              className="h-full rounded-full bg-primary transition-all"
              style={{
                width: `${Math.round((patient.completedExercises / patient.totalExercises) * 100)}%`,
              }}
            />
          </div>
        </div>

        <SheetFooter className="mt-6">
          <Button
            variant="outline"
            className="w-full bg-transparent"
            onClick={() => onOpenChange(false)}
          >
            Close
          </Button>
        </SheetFooter>
      </SheetContent>
    </Sheet>
  );
}
