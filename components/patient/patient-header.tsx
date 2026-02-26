import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import type { Patient } from "@/lib/types";

interface PatientHeaderProps {
  patient: Patient;
}

export function PatientHeader({ patient }: PatientHeaderProps) {
  const initials = patient.name
    .split(" ")
    .map((n) => n[0])
    .join("")
    .toUpperCase();

  const getStatusBadge = () => {
    switch (patient.status) {
      case "active":
        return (
          <Badge className="bg-success-bg text-success hover:bg-success-bg">
            Active
          </Badge>
        );
      case "paused":
        return (
          <Badge className="bg-warning-bg text-warning hover:bg-warning-bg">
            Paused
          </Badge>
        );
      case "completed":
        return (
          <Badge variant="secondary">Completed</Badge>
        );
    }
  };

  return (
    <div className="flex flex-col gap-4 sm:flex-row sm:items-start sm:justify-between">
        <div className="flex items-start gap-4">
          <Avatar className="h-16 w-16">
          <AvatarFallback className="bg-primary/10 text-xl font-medium text-primary">
            {initials}
          </AvatarFallback>
        </Avatar>

        <div className="min-w-0 flex-1">
          <div className="flex flex-wrap items-center gap-2">
            <h1 className="text-2xl font-semibold text-foreground break-words">
              {patient.name}
            </h1>
            {getStatusBadge()}
            {patient.hasSafetyFlag && (
              <Badge className="bg-danger-bg text-danger hover:bg-danger-bg">
                Safety Flag
              </Badge>
            )}
          </div>

          <div className="mt-1 flex flex-wrap items-center gap-x-4 gap-y-1 text-sm text-muted-foreground">
            <span className="break-words">{patient.phone}</span>
            <span className="break-words">Started: {patient.startDate}</span>
          </div>
        </div>
      </div>
    </div>
  );
}
