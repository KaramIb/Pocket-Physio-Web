"use client";

import { useState, useCallback, useEffect } from "react";
import Link from "next/link";
import {
  Phone,
  MessageCircle,
  Clock,
  CheckCircle,
  ChevronDown,
  ChevronRight,
  MoreHorizontal,
  TrendingUp,
  Check,
  X,
  PhoneCall,
} from "lucide-react";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { Textarea } from "@/components/ui/textarea";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
  DropdownMenuSeparator,
  DropdownMenuSub,
  DropdownMenuSubContent,
  DropdownMenuSubTrigger,
} from "@/components/ui/dropdown-menu";
import { cn } from "@/lib/utils";
import { toast } from "@/hooks/use-toast";
import { CheckinModal } from "@/components/queue/checkin-modal";
import {
  getResolvedPatientIds,
  markPatientResolved,
  getSnoozedItems,
  snoozePatient,
} from "@/lib/queue-service";
import type { Patient } from "@/lib/types";

interface ActionQueueProps {
  patients: Patient[];
}

export function ActionQueue({ patients }: ActionQueueProps) {
  const [removingIds, setRemovingIds] = useState<Set<string>>(new Set());
  const [expandedId, setExpandedId] = useState<string | null>(null);
  const [resolvedIds, setResolvedIds] = useState<Set<string>>(new Set());
  const [snoozedIds, setSnoozedIds] = useState<Set<string>>(new Set());

  // Load resolved and snoozed items from localStorage on mount
  useEffect(() => {
    setResolvedIds(getResolvedPatientIds());
    setSnoozedIds(new Set(Array.from(getSnoozedItems().keys())));
  }, []);

  const handleAction = useCallback(
    (patientId: string, patientName: string, action: string) => {
      // Mark as resolved in localStorage
      markPatientResolved(patientId, action);
      
      // Update local state
      setRemovingIds((prev) => new Set(prev).add(patientId));
      setResolvedIds((prev) => new Set(prev).add(patientId));

      setTimeout(() => {
        toast({
          title: action,
          description: `Action completed for ${patientName}`,
        });
      }, 300);
    },
    []
  );

  const handleSnooze = useCallback(
    (patientId: string, patientName: string, duration: string) => {
      // Mark as snoozed in localStorage
      snoozePatient(patientId, duration);
      
      // Update local state
      setRemovingIds((prev) => new Set(prev).add(patientId));
      setSnoozedIds((prev) => new Set(prev).add(patientId));

      setTimeout(() => {
        toast({
          title: "Snoozed",
          description: `${patientName} snoozed for ${duration}`,
        });
      }, 300);
    },
    []
  );

  const toggleExpand = (id: string) => {
    setExpandedId((prev) => (prev === id ? null : id));
  };

  // Filter out resolved and snoozed patients
  const visiblePatients = patients.filter(
    (p) => !removingIds.has(p.id) && !resolvedIds.has(p.id) && !snoozedIds.has(p.id)
  );

  if (visiblePatients.length === 0) {
    return <QueueEmptyState />;
  }

  const onTrackCount = 24 - visiblePatients.length;

  return (
    <div className="space-y-3">
      {visiblePatients.map((patient) => (
        <QueueCard
          key={patient.id}
          patient={patient}
          isExpanded={expandedId === patient.id}
          isRemoving={removingIds.has(patient.id)}
          onToggleExpand={() => toggleExpand(patient.id)}
          onAction={handleAction}
          onSnooze={handleSnooze}
        />
      ))}

      {/* On-Track Summary */}
      <div className="flex items-center justify-center gap-1.5 pt-2 pb-1">
        <CheckCircle className="h-3.5 w-3.5 text-success" />
        <p className="text-sm text-muted-foreground">
          {onTrackCount} {onTrackCount === 1 ? "patient" : "patients"} on track
          — no action needed
        </p>
      </div>
    </div>
  );
}

// Empty State
function QueueEmptyState() {
  return (
    <Card className="flex min-h-[400px] flex-col items-center justify-center p-8">
      <div className="relative mb-6">
        <div className="flex h-20 w-20 items-center justify-center rounded-full bg-success-bg">
          <CheckCircle className="h-10 w-10 text-success" />
        </div>
        <div
          className="absolute inset-0 animate-ping rounded-full bg-success-bg opacity-20"
          style={{ animationDuration: "2s" }}
        />
      </div>
      <h2 className="mb-2 text-xl font-semibold text-foreground">
        All caught up
      </h2>
      <p className="mb-1 text-sm text-muted-foreground">
        24 patients active · 22 on track
      </p>
      <p className="text-xs text-muted-foreground/70">
        Last checked 2 minutes ago
      </p>
    </Card>
  );
}

// Queue Card
interface QueueCardProps {
  patient: Patient;
  isExpanded: boolean;
  isRemoving: boolean;
  onToggleExpand: () => void;
  onAction: (patientId: string, patientName: string, action: string) => void;
  onSnooze: (patientId: string, patientName: string, duration: string) => void;
}

function QueueCard({
  patient,
  isExpanded,
  isRemoving,
  onToggleExpand,
  onAction,
  onSnooze,
}: QueueCardProps) {
  const [checkinOpen, setCheckinOpen] = useState(false);
  const [contactedNotes, setContactedNotes] = useState("");
  const [showContactedNotes, setShowContactedNotes] = useState(false);

  const isSafetyFlag = patient.alertType === "safety_flag";
  const isPainIncreasing = patient.alertType === "pain_increasing";
  const isSilent = patient.alertType === "silent";

  const priority = isSafetyFlag
    ? "critical"
    : isPainIncreasing
      ? "high"
      : "medium";
  const initials = patient.name
    .split(" ")
    .map((n) => n[0])
    .join("")
    .toUpperCase();

  const timeSinceTrigger = isSilent
    ? `${patient.daysSinceResponse} days ago`
    : patient.lastActive || "2 hours ago";

  // Mini pain sparkline data
  const painTrend = patient.painHistory?.slice(-5) || [];
  const showPainSparkline = isPainIncreasing && painTrend.length > 1;

  const handleResolve = (reason: string) => {
    onAction(patient.id, patient.name, reason);
  };

  const handleContactedConfirm = () => {
    const reason = contactedNotes.trim()
      ? `Resolved \u2014 Contacted patient: ${contactedNotes}`
      : "Resolved \u2014 Contacted patient";
    onAction(patient.id, patient.name, reason);
    setShowContactedNotes(false);
    setContactedNotes("");
  };

  return (
    <>
      <Card
        className={cn(
          "group relative overflow-hidden transition-all duration-300",
          isRemoving && "pointer-events-none opacity-0 -translate-x-4",
          priority === "critical" && "border-l-4 border-l-danger",
          priority === "high" && "border-l-4 border-l-warning",
          priority === "medium" && "border-l-4 border-l-border",
          "hover:shadow-md hover:-translate-y-0.5"
        )}
      >
        {/* Main Card Content */}
        <div className="p-4">
          {/* Header: Priority Badge + Time */}
          <div className="mb-3 flex items-center justify-between">
            <Badge
              variant="secondary"
              className={cn(
                "text-xs font-medium uppercase tracking-wide",
                priority === "critical" && "bg-danger-bg text-danger",
                priority === "high" && "bg-warning-bg text-warning",
                priority === "medium" && "bg-muted text-muted-foreground"
              )}
            >
              {priority === "critical" && "Safety Alert"}
              {priority === "high" && "Attention"}
              {priority === "medium" && "Follow-up"}
            </Badge>
            <span className="text-xs text-muted-foreground">
              {timeSinceTrigger}
            </span>
          </div>

          {/* Patient Info Row */}
          <div className="flex items-start gap-3">
            {/* Avatar with indicator */}
            <button
              onClick={onToggleExpand}
              className="relative shrink-0 focus:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2 rounded-full"
            >
              <Avatar className="h-11 w-11 transition-transform group-hover:scale-105">
                <AvatarFallback
                  className={cn(
                    "text-sm font-semibold",
                    priority === "critical" && "bg-danger-bg text-danger",
                    priority === "high" && "bg-warning-bg text-warning",
                    priority === "medium" && "bg-muted text-muted-foreground"
                  )}
                >
                  {initials}
                </AvatarFallback>
              </Avatar>
              {priority === "critical" && (
                <span className="absolute -right-0.5 -top-0.5 flex h-3 w-3">
                  <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-danger opacity-75" />
                  <span className="relative inline-flex h-3 w-3 rounded-full bg-danger" />
                </span>
              )}
            </button>

            {/* Patient Details */}
            <div className="min-w-0 flex-1">
              <div className="flex items-baseline gap-2 flex-wrap">
                <Link
                  href={`/patient/${patient.id}`}
                  className="font-semibold text-foreground hover:text-primary hover:underline break-words"
                >
                  {patient.name}
                </Link>
                <span className="text-xs text-muted-foreground break-words">
                  {patient.programName} · Day {patient.currentDay} of{" "}
                  {patient.totalDays}
                </span>
              </div>

              {/* Mini stats */}
              <p className="mt-0.5 text-xs text-muted-foreground break-words">
                {patient.completionRate}% adherence · Last active:{" "}
                {patient.lastActive || "2h ago"}
              </p>

              {/* The Trigger */}
              <div className="mt-2">
                {isSafetyFlag && patient.safetyFlagMessage && (
                  <div className="rounded-md border border-danger/20 bg-danger-bg px-3 py-2">
                    <p className="text-sm text-danger-foreground italic break-words">
                      &ldquo;{patient.safetyFlagMessage}&rdquo;
                    </p>
                  </div>
                )}

                {isPainIncreasing && (
                  <div className="flex items-center gap-3">
                    <span className="text-sm font-medium text-warning">
                      Pain score:{" "}
                      {
                        patient.painHistory?.[
                          patient.painHistory.length - 1
                        ]
                      }
                      /10
                    </span>
                    {showPainSparkline && (
                      <div className="flex items-end gap-0.5 h-4">
                        {painTrend.map((val, i) => (
                          <div
                            key={i}
                            className={cn(
                              "w-1 rounded-sm transition-all",
                              i === painTrend.length - 1
                                ? "bg-warning"
                                : "bg-warning/40"
                            )}
                            style={{
                              height: `${(val / 10) * 100}%`,
                              minHeight: 2,
                            }}
                          />
                        ))}
                        <TrendingUp className="ml-1 h-3 w-3 text-warning" />
                      </div>
                    )}
                  </div>
                )}

                {isSilent && (
                  <p className="text-sm text-muted-foreground">
                    No response for{" "}
                    <span className="font-medium text-warning">
                      {patient.daysSinceResponse} days
                    </span>
                  </p>
                )}
              </div>

              {/* Recommendation */}
              <p className="mt-2 text-xs text-muted-foreground break-words">
                Recommended:{" "}
                {priority === "critical"
                  ? "Call patient immediately"
                  : "Send check-in message"}
              </p>
            </div>

            {/* Actions */}
            <div className="flex shrink-0 items-center gap-2">
              {/* Primary Action */}
              {priority === "critical" ? (
                <a
                  href={`tel:${patient.phone?.replace(/\s/g, "")}`}
                  className="inline-flex"
                >
                  <Button
                    size="sm"
                    className="bg-danger hover:bg-danger/90 text-white gap-1.5"
                  >
                    <Phone className="h-3.5 w-3.5" />
                    Call Now
                  </Button>
                </a>
              ) : (
                <Button
                  size="sm"
                  onClick={() => setCheckinOpen(true)}
                  className="gap-1.5 shadow-sm"
                >
                  <MessageCircle className="h-3.5 w-3.5" />
                  Check-in
                </Button>
              )}

              {/* Resolve Dropdown */}
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button
                    size="sm"
                    variant="outline"
                    className="gap-1 bg-transparent"
                  >
                    Resolve
                    <ChevronDown className="h-3 w-3" />
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent align="end" className="w-56">
                  <DropdownMenuItem
                    onClick={() =>
                      handleResolve("Resolved \u2014 No action needed")
                    }
                  >
                    <Check className="mr-2 h-4 w-4 text-success" />
                    Resolved — No action needed
                  </DropdownMenuItem>
                  <DropdownMenuItem
                    onClick={() => setShowContactedNotes(true)}
                  >
                    <PhoneCall className="mr-2 h-4 w-4 text-primary" />
                    Resolved — Contacted patient
                  </DropdownMenuItem>
                  <DropdownMenuSeparator />
                  <DropdownMenuSub>
                    <DropdownMenuSubTrigger>
                      <Clock className="mr-2 h-4 w-4 text-muted-foreground" />
                      Snooze...
                    </DropdownMenuSubTrigger>
                    <DropdownMenuSubContent>
                      <DropdownMenuItem
                        onClick={() =>
                          onSnooze(patient.id, patient.name, "1 day")
                        }
                      >
                        1 Day
                      </DropdownMenuItem>
                      <DropdownMenuItem
                        onClick={() =>
                          onSnooze(patient.id, patient.name, "3 days")
                        }
                      >
                        3 Days
                      </DropdownMenuItem>
                      <DropdownMenuItem
                        onClick={() => onSnooze(patient.id, patient.name, "1 week")}
                      >
                        1 Week
                      </DropdownMenuItem>
                      <DropdownMenuItem
                        onClick={() =>
                          handleResolve("Snoozed for 3 days")
                        }
                      >
                        3 Days
                      </DropdownMenuItem>
                      <DropdownMenuItem
                        onClick={() =>
                          handleResolve("Snoozed for 1 week")
                        }
                      >
                        1 Week
                      </DropdownMenuItem>
                    </DropdownMenuSubContent>
                  </DropdownMenuSub>
                </DropdownMenuContent>
              </DropdownMenu>

              {/* More Menu */}
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button
                    size="sm"
                    variant="ghost"
                    className="px-1.5 bg-transparent"
                  >
                    <MoreHorizontal className="h-4 w-4" />
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent align="end">
                  <DropdownMenuItem asChild>
                    <Link href={`/patient/${patient.id}`}>
                      View full profile
                    </Link>
                  </DropdownMenuItem>
                  <DropdownMenuItem>Add note</DropdownMenuItem>
                  <DropdownMenuSeparator />
                  <DropdownMenuItem className="text-destructive">
                    Archive patient
                  </DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
            </div>
          </div>
        </div>

        {/* Contacted Patient — Inline Notes */}
        {showContactedNotes && (
          <div className="border-t border-border bg-muted/30 p-4 animate-in slide-in-from-top-2 duration-200">
            <p className="text-sm font-medium text-foreground mb-2">
              Notes from call (optional)
            </p>
            <Textarea
              placeholder="What was discussed? Any follow-up needed?"
              value={contactedNotes}
              onChange={(e) => setContactedNotes(e.target.value)}
              className="h-20 resize-none text-sm"
              autoFocus
            />
            <div className="mt-3 flex items-center justify-end gap-2">
              <Button
                size="sm"
                variant="ghost"
                onClick={() => {
                  setShowContactedNotes(false);
                  setContactedNotes("");
                }}
                className="bg-transparent"
              >
                Cancel
              </Button>
              <Button size="sm" onClick={handleContactedConfirm}>
                <Check className="mr-1.5 h-3.5 w-3.5" />
                Confirm
              </Button>
            </div>
          </div>
        )}

        {/* Expanded Content */}
        {isExpanded && <ExpandedContent patient={patient} />}
      </Card>

      {/* Check-in Modal */}
      <CheckinModal
        patient={patient}
        open={checkinOpen}
        onOpenChange={setCheckinOpen}
        onSent={() =>
          onAction(patient.id, patient.name, "Check-in sent")
        }
      />
    </>
  );
}

// Expanded Content
function ExpandedContent({ patient }: { patient: Patient }) {
  const recentMessages = [
    {
      from: "patient",
      text: "The exercises are getting easier",
      time: "2h ago",
    },
    {
      from: "clinician",
      text: "Great progress! Keep it up",
      time: "1d ago",
    },
    {
      from: "patient",
      text: "My knee feels stiff in the morning",
      time: "2d ago",
    },
  ];

  const weekActivity = [
    "completed",
    "completed",
    "skipped",
    "completed",
    "none",
    "completed",
    "none",
  ];

  return (
    <div className="border-t border-border bg-muted/20 p-4 animate-in slide-in-from-top-2 duration-200">
      <div className="grid gap-4 md:grid-cols-2">
        {/* Recent Messages */}
        <div>
          <p className="mb-2 text-xs font-medium uppercase tracking-wide text-muted-foreground">
            Recent Messages
          </p>
          <div className="space-y-2">
            {recentMessages.map((msg, i) => (
              <div
                key={i}
                className={cn(
                  "rounded-lg px-3 py-2 text-sm",
                  msg.from === "patient" ? "bg-muted" : "bg-primary/10 ml-4"
                )}
              >
                <p className="text-foreground">{msg.text}</p>
                <p className="mt-0.5 text-xs text-muted-foreground">
                  {msg.time}
                </p>
              </div>
            ))}
          </div>
        </div>

        {/* 7-Day Activity */}
        <div>
          <p className="mb-2 text-xs font-medium uppercase tracking-wide text-muted-foreground">
            Last 7 Days
          </p>
          <div className="flex items-center gap-1">
            {weekActivity.map((day, i) => (
              <div
                key={i}
                className={cn(
                  "flex h-8 w-8 items-center justify-center rounded text-xs font-medium",
                  day === "completed" && "bg-success-bg text-success",
                  day === "skipped" && "bg-danger-bg text-danger",
                  day === "none" && "bg-muted text-muted-foreground"
                )}
              >
                {day === "completed" && <Check className="h-4 w-4" />}
                {day === "skipped" && <X className="h-4 w-4" />}
                {day === "none" && "\u2014"}
              </div>
            ))}
          </div>
          <p className="mt-2 text-xs text-muted-foreground">
            {weekActivity.filter((d) => d === "completed").length}/7 days
            completed
          </p>
        </div>
      </div>

      <div className="mt-4 flex justify-end">
        <Link
          href={`/patient/${patient.id}`}
          className="inline-flex items-center gap-1 text-sm font-medium text-primary hover:underline"
        >
          View full timeline
          <ChevronRight className="h-4 w-4" />
        </Link>
      </div>
    </div>
  );
}
