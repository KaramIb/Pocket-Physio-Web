import { Card } from "@/components/ui/card";
import { cn } from "@/lib/utils";
import type { Patient } from "@/lib/types";

interface PatientStatsProps {
  patient: Patient;
}

export function PatientStats({ patient }: PatientStatsProps) {
  const completionRate = Math.round(
    (patient.completedExercises / patient.totalExercises) * 100
  );

  const getDaysSinceResponse = () => {
    const response = patient.lastResponse.toLowerCase();
    if (response === "today") return 0;
    if (response === "yesterday") return 1;
    const match = response.match(/(\d+)\s*days?\s*ago/);
    return match ? parseInt(match[1]) : 0;
  };

  const daysSince = getDaysSinceResponse();

  return (
    <div className="grid grid-cols-2 gap-4 lg:grid-cols-4">
      {/* Completed */}
      <Card className="p-4">
        <p
          className={cn(
            "font-mono text-2xl font-semibold tabular-nums",
            completionRate >= 80 ? "text-success" : "text-foreground"
          )}
        >
          {patient.completedExercises}/{patient.totalExercises}
        </p>
        <p className="mt-1 text-xs text-muted-foreground">
          {completionRate}% completed
        </p>
      </Card>

      {/* Skipped */}
      <Card className="p-4">
        <p className="font-mono text-2xl font-semibold tabular-nums text-foreground">
          {patient.skippedCount}
        </p>
        <p className="mt-1 text-xs text-muted-foreground">Skipped</p>
        {patient.skipStreak && patient.skipStreak >= 2 && (
          <p className="mt-1.5 text-xs font-medium text-warning">
            Current streak: {patient.skipStreak}
          </p>
        )}
      </Card>

      {/* Avg Pain */}
      <Card className="p-4">
        <p className="font-mono text-2xl font-semibold tabular-nums text-foreground">
          {patient.avgPain.toFixed(1)}
        </p>
        <p className="mt-1 text-xs text-muted-foreground">Avg Pain /10</p>
      </Card>

      {/* Last Response */}
      <Card 
        className={cn(
          "p-4",
          daysSince >= 3 && "bg-danger/5",
          daysSince === 2 && "bg-warning/5"
        )}
      >
        <p
          className={cn(
            "text-xl font-semibold leading-tight break-words sm:text-2xl",
            daysSince >= 3
              ? "text-danger"
              : daysSince === 2
                ? "text-warning"
                : "text-foreground"
          )}
        >
          {patient.lastResponse}
        </p>
        <p className="mt-1 text-xs text-muted-foreground">Last Response</p>
      </Card>
    </div>
  );
}
