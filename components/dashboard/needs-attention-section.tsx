"use client";

import {
  AlertTriangle,
  ArrowRight,
  TrendingUp,
  Clock,
  ShieldAlert,
  MessageCircle,
  CheckCircle,
} from "lucide-react";
import Link from "next/link";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { cn } from "@/lib/utils";
import { toast } from "@/hooks/use-toast";
import type { Patient } from "@/lib/types";

interface NeedsAttentionSectionProps {
  patients: Patient[];
}

export function NeedsAttentionSection({ patients }: NeedsAttentionSectionProps) {
  if (patients.length === 0) {
    return (
      <section>
        <div className="flex items-center justify-between rounded-lg bg-success-bg px-4 py-3">
          <div className="flex items-center gap-2">
            <CheckCircle className="h-5 w-5 text-success" aria-hidden="true" />
            <h2 className="text-lg font-semibold text-foreground">
              All Patients On Track
            </h2>
          </div>
        </div>
        <Card className="mt-4 p-8 text-center">
          <div className="mx-auto mb-4 flex h-16 w-16 items-center justify-center rounded-full bg-success-bg">
            <CheckCircle className="h-8 w-8 text-success" />
          </div>
          <h3 className="text-lg font-medium text-foreground">
            No patients need attention
          </h3>
          <p className="mt-1 text-sm text-muted-foreground">
            All your patients are progressing well with their programs
          </p>
        </Card>
      </section>
    );
  }

  return (
    <section>
      <div className="flex items-center justify-between rounded-lg bg-warning-bg px-4 py-3">
        <div className="flex items-center gap-2">
          <AlertTriangle className="h-5 w-5 text-warning" aria-hidden="true" />
          <h2 className="text-lg font-semibold text-foreground">
            Needs Attention{" "}
            <span className="font-normal text-muted-foreground">
              ({patients.length})
            </span>
          </h2>
        </div>
        <Link
          href="/patients?filter=attention"
          className="flex items-center gap-1 text-sm font-medium text-primary hover:underline"
        >
          View All
          <ArrowRight className="h-4 w-4" />
        </Link>
      </div>

      <div className="mt-4 space-y-3">
        {patients.map((patient) => (
          <PatientAttentionCard key={patient.id} patient={patient} />
        ))}
      </div>
    </section>
  );
}

function PatientAttentionCard({ patient }: { patient: Patient }) {
  const isSafetyFlag = patient.alertType === "safety_flag";
  const initials = patient.name
    .split(" ")
    .map((n) => n[0])
    .join("")
    .toUpperCase();

  // Format last active timestamp
  const getLastActiveTime = () => {
    if (patient.lastResponse === "Today") return "Today at 9:32 AM";
    if (patient.lastResponse === "Yesterday") return "Yesterday at 6:15 PM";
    return patient.lastResponse;
  };

  return (
    <Link href={`/patient/${patient.id}`} className="block group">
      <Card
        className={cn(
          "p-4 transition-all duration-200 hover:-translate-y-0.5 hover:shadow-md",
          isSafetyFlag && "border-l-4 border-l-danger"
        )}
      >
        <div className="flex gap-4">
          {/* Avatar */}
          <div className="relative shrink-0">
            <Avatar className="h-12 w-12">
              <AvatarFallback
                className={cn(
                  "text-sm font-semibold",
                  isSafetyFlag
                    ? "bg-danger/10 text-danger"
                    : "bg-warning/10 text-warning"
                )}
              >
                {initials}
              </AvatarFallback>
            </Avatar>
            {/* Pulsing dot for safety flags */}
            {isSafetyFlag && (
              <span className="absolute -right-0.5 -top-0.5 flex h-3 w-3">
                <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-danger opacity-75" />
                <span className="relative inline-flex h-3 w-3 rounded-full bg-danger" />
              </span>
            )}
          </div>

          {/* Content */}
          <div className="flex-1 min-w-0">
            <div className="flex items-start justify-between gap-2">
              <div>
                <div className="flex items-center gap-2">
                  <h3 className="font-semibold text-foreground">{patient.name}</h3>
                  <span className="text-sm text-muted-foreground">
                    Day {patient.currentDay}/{patient.totalDays}
                  </span>
                </div>
                <p className="mt-0.5 text-xs text-muted-foreground">
                  Last active: {getLastActiveTime()}
                </p>
              </div>

              {/* Actions - visible on hover */}
              <div className="flex items-center gap-2 opacity-0 transition-opacity group-hover:opacity-100 sm:opacity-100">
                {isSafetyFlag && (
                  <Button
                    variant="outline"
                    size="sm"
                    className="border-danger text-danger hover:bg-danger-bg bg-transparent"
                    onClick={(e) => {
                      e.preventDefault();
                      toast({
                        title: "Flag resolved",
                        description: `Safety flag for ${patient.name} has been marked as resolved`,
                      });
                    }}
                  >
                    Resolve
                  </Button>
                )}
                <Button
                  size="sm"
                  onClick={(e) => {
                    e.preventDefault();
                    toast({
                      title: "Check-in sent",
                      description: `A check-in message has been sent to ${patient.name}`,
                    });
                  }}
                >
                  <MessageCircle className="mr-1.5 h-4 w-4" />
                  Check-in
                </Button>
                <Button variant="outline" size="sm" className="bg-transparent">
                  View
                </Button>
              </div>
            </div>

            {/* Alert Box */}
            <div
              className={cn(
                "mt-2 inline-flex items-center gap-2 rounded-md px-3 py-1.5 text-sm",
                isSafetyFlag ? "bg-danger-bg" : "bg-warning-bg"
              )}
            >
              {patient.alertType === "silent" && (
                <>
                  <Clock className="h-4 w-4 text-warning" />
                  <span>{patient.daysSinceResponse} days without response</span>
                </>
              )}
              {patient.alertType === "pain_increasing" && (
                <>
                  <TrendingUp className="h-4 w-4 text-warning" />
                  <span>Pain trending upward</span>
                </>
              )}
              {isSafetyFlag && (
                <>
                  <ShieldAlert className="h-4 w-4 text-danger" />
                  <span className="font-medium">Safety concern flagged</span>
                </>
              )}
            </div>

            {/* Last message preview or pain scores */}
            <div className="mt-2 text-sm text-muted-foreground">
              {patient.alertType === "pain_increasing" && patient.painHistory && (
                <span className="flex items-center gap-1">
                  Pain scores:{" "}
                  {patient.painHistory.map((score, i) => (
                    <span
                      key={i}
                      className={cn(
                        "font-mono",
                        i === patient.painHistory.length - 1 &&
                          "font-semibold text-warning"
                      )}
                    >
                      {score}
                      {i < patient.painHistory.length - 1 && " → "}
                    </span>
                  ))}
                </span>
              )}
              {isSafetyFlag && patient.safetyFlagMessage && (
                <p className="truncate italic">
                  &quot;{patient.safetyFlagMessage}&quot;
                </p>
              )}
              {patient.alertType === "silent" && (
                <p className="truncate italic text-muted-foreground">
                  &quot;Completed 3 exercises, feeling okay&quot;
                </p>
              )}
            </div>
          </div>
        </div>
      </Card>
    </Link>
  );
}
