"use client";

import { useState, useEffect } from "react";
import {
  Send,
  Pause,
  Play,
  Phone,
  ShieldOff,
  MoreHorizontal,
  Calendar,
  CheckCircle,
  Trash2,
  FileText,
  UserX,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { toast } from "@/hooks/use-toast";
import { cn } from "@/lib/utils";
import { CheckInModal } from "./check-in-modal";
import type { Patient } from "@/lib/types";

interface ActionBarProps {
  patient: Patient;
}

export function ActionBar({ patient }: ActionBarProps) {
  const [showPauseModal, setShowPauseModal] = useState(false);
  const [showResolveFlagModal, setShowResolveFlagModal] = useState(false);
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [isPaused, setIsPaused] = useState(patient.status === "paused");
  const [isVisible, setIsVisible] = useState(true);
  const [lastScrollY, setLastScrollY] = useState(0);

  // Show/hide action bar on scroll
  useEffect(() => {
    const handleScroll = () => {
      const currentScrollY = window.scrollY;
      const maxScroll =
        document.documentElement.scrollHeight - window.innerHeight;

      // Always show if near bottom
      if (currentScrollY >= maxScroll - 100) {
        setIsVisible(true);
      } else if (currentScrollY > lastScrollY && currentScrollY > 100) {
        // Scrolling down
        setIsVisible(false);
      } else {
        // Scrolling up
        setIsVisible(true);
      }

      setLastScrollY(currentScrollY);
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, [lastScrollY]);

  const handleResume = () => {
    setIsPaused(false);
    toast({
      title: "Program resumed",
      description: `${patient.name}'s program has been resumed.`,
    });
  };

  return (
    <>
      <div
        className={cn(
          "fixed bottom-0 left-0 right-0 z-40 border-t border-border bg-background/95 p-4 backdrop-blur transition-transform duration-300 md:left-60",
          !isVisible && "translate-y-full"
        )}
      >
        <div className="mx-auto flex max-w-4xl flex-wrap items-center justify-center gap-3 sm:justify-end">
          {/* Primary Action - Check-in */}
          <CheckInModal
            patient={patient}
            trigger={
              <Button>
                <Send className="mr-2 h-4 w-4" />
                Send Check-in
              </Button>
            }
          />

          {/* Pause/Resume Program */}
          {isPaused ? (
            <Button
              variant="outline"
              onClick={handleResume}
              className="bg-transparent"
            >
              <Play className="mr-2 h-4 w-4" />
              Resume Program
            </Button>
          ) : (
            <Button
              variant="outline"
              onClick={() => setShowPauseModal(true)}
              className="bg-transparent"
            >
              <Pause className="mr-2 h-4 w-4" />
              Pause Program
            </Button>
          )}

          <Button variant="outline" asChild className="bg-transparent">
            <a href={`tel:${patient.phone.replace(/\s/g, "")}`}>
              <Phone className="mr-2 h-4 w-4" />
              Call Patient
            </a>
          </Button>

          {patient.hasSafetyFlag && (
            <Button
              variant="outline"
              className="border-danger text-danger hover:bg-danger-bg bg-transparent"
              onClick={() => setShowResolveFlagModal(true)}
            >
              <ShieldOff className="mr-2 h-4 w-4" />
              Resolve Flag
            </Button>
          )}

          {/* More Actions */}
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="outline" size="icon" className="bg-transparent">
                <MoreHorizontal className="h-4 w-4" />
                <span className="sr-only">More actions</span>
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end" side="top" className="w-48">
              <DropdownMenuItem
                onClick={() => {
                  toast({
                    title: "Coming soon",
                    description: "Custom message feature is coming soon",
                  });
                }}
              >
                <Send className="mr-2 h-4 w-4" />
                Send Custom Message
              </DropdownMenuItem>
              <DropdownMenuItem
                onClick={() => {
                  toast({
                    title: "Coming soon",
                    description: "Extend program feature is coming soon",
                  });
                }}
              >
                <Calendar className="mr-2 h-4 w-4" />
                Extend Program
              </DropdownMenuItem>
              <DropdownMenuItem
                onClick={() => {
                  toast({
                    title: "Coming soon",
                    description: "Mark as completed feature is coming soon",
                  });
                }}
              >
                <CheckCircle className="mr-2 h-4 w-4" />
                Mark as Completed
              </DropdownMenuItem>
              <DropdownMenuItem
                onClick={() => {
                  toast({
                    title: "Coming soon",
                    description: "Export notes feature is coming soon",
                  });
                }}
              >
                <FileText className="mr-2 h-4 w-4" />
                Export Notes
              </DropdownMenuItem>
              <DropdownMenuSeparator />
              <DropdownMenuItem
                onClick={() => {
                  toast({
                    title: "Coming soon",
                    description: "Archive patient feature is coming soon",
                  });
                }}
              >
                <UserX className="mr-2 h-4 w-4" />
                Archive Patient
              </DropdownMenuItem>
              <DropdownMenuItem
                className="text-destructive focus:text-destructive"
                onClick={() => setShowDeleteModal(true)}
              >
                <Trash2 className="mr-2 h-4 w-4" />
                Delete Patient
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
      </div>

      {/* Pause Modal */}
      <PauseModal
        patient={patient}
        open={showPauseModal}
        onOpenChange={setShowPauseModal}
        onPaused={() => setIsPaused(true)}
      />

      {/* Resolve Flag Modal */}
      {patient.hasSafetyFlag && (
        <ResolveFlagModal
          patient={patient}
          open={showResolveFlagModal}
          onOpenChange={setShowResolveFlagModal}
        />
      )}

      {/* Delete Patient Modal */}
      <DeletePatientModal
        patient={patient}
        open={showDeleteModal}
        onOpenChange={setShowDeleteModal}
      />
    </>
  );
}

interface ModalProps {
  patient: Patient;
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

interface PauseModalProps extends ModalProps {
  onPaused: () => void;
}

const pauseReasons = [
  { id: "vacation", label: "Patient on vacation" },
  { id: "illness", label: "Patient is ill" },
  { id: "busy", label: "Patient is busy" },
  { id: "reassess", label: "Need to reassess treatment" },
  { id: "other", label: "Other reason" },
];

const autoResumeOptions = [
  { value: "none", label: "Don't auto-resume" },
  { value: "3", label: "After 3 days" },
  { value: "7", label: "After 1 week" },
  { value: "14", label: "After 2 weeks" },
  { value: "30", label: "After 1 month" },
];

function PauseModal({ patient, open, onOpenChange, onPaused }: PauseModalProps) {
  const [isPausing, setIsPausing] = useState(false);
  const [selectedReason, setSelectedReason] = useState<string | undefined>();
  const [autoResume, setAutoResume] = useState("none");
  const [otherReasonText, setOtherReasonText] = useState("");

  const handlePause = async () => {
    setIsPausing(true);
    await new Promise((resolve) => setTimeout(resolve, 1000));
    
    const resumeText = autoResume !== "none" 
      ? `. Program will auto-resume in ${autoResumeOptions.find(o => o.value === autoResume)?.label.replace("After ", "")}`
      : "";
    
    toast({
      title: "Program paused",
      description: `${patient.name}'s program has been paused${resumeText}.`,
    });
    setIsPausing(false);
    onPaused();
    onOpenChange(false);
    setSelectedReason(undefined);
    setAutoResume("none");
    setOtherReasonText("");
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Pause {patient.name}&apos;s Program?</DialogTitle>
          <DialogDescription>
            They won&apos;t receive daily reminders while paused. You can resume
            the program at any time.
          </DialogDescription>
        </DialogHeader>

        <div className="space-y-4 py-2">
          {/* Reason Selection (Optional) */}
          <div className="space-y-3">
            <Label className="text-sm font-medium">Reason (optional)</Label>
            <RadioGroup
              value={selectedReason}
              onValueChange={setSelectedReason}
            >
              {pauseReasons.map((reason) => (
                <div key={reason.id} className="flex items-center space-x-2">
                  <RadioGroupItem value={reason.id} id={reason.id} />
                  <Label
                    htmlFor={reason.id}
                    className="text-sm font-normal cursor-pointer"
                  >
                    {reason.label}
                  </Label>
                </div>
              ))}
            </RadioGroup>
            
            {/* Show text input when "Other reason" is selected */}
            {selectedReason === "other" && (
              <div className="ml-6 pt-2 animate-in slide-in-from-top-1 duration-150">
                <Textarea
                  placeholder="Please explain (optional)..."
                  value={otherReasonText}
                  onChange={(e) => setOtherReasonText(e.target.value)}
                  rows={2}
                  className="text-sm"
                />
              </div>
            )}
          </div>

          {/* Auto-resume */}
          <div className="space-y-2">
            <Label htmlFor="auto-resume" className="text-sm font-medium">
              Auto-resume
            </Label>
            <Select value={autoResume} onValueChange={setAutoResume}>
              <SelectTrigger id="auto-resume">
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                {autoResumeOptions.map((option) => (
                  <SelectItem key={option.value} value={option.value}>
                    {option.label}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
        </div>

        <DialogFooter>
          <Button
            variant="outline"
            onClick={() => onOpenChange(false)}
            disabled={isPausing}
            className="bg-transparent"
          >
            Cancel
          </Button>
          <Button onClick={handlePause} disabled={isPausing}>
            {isPausing ? "Pausing..." : "Pause Program"}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}

const resolutionReasons = [
  { id: "called", label: "Called patient - symptoms resolved" },
  { id: "false_alarm", label: "False alarm / Misunderstood message" },
  { id: "referred", label: "Referred to doctor / specialist" },
  { id: "adjusted", label: "Adjusted treatment plan" },
  { id: "other", label: "Other" },
];

function ResolveFlagModal({ patient, open, onOpenChange }: ModalProps) {
  const [note, setNote] = useState("");
  const [selectedReason, setSelectedReason] = useState<string | undefined>();
  const [isResolving, setIsResolving] = useState(false);

  const handleResolve = async () => {
    if (!selectedReason) return;
    
    setIsResolving(true);
    await new Promise((resolve) => setTimeout(resolve, 1000));
    toast({
      title: "Safety flag resolved",
      description: `Safety flag resolved for ${patient.name}`,
    });
    setIsResolving(false);
    setNote("");
    setSelectedReason(undefined);
    onOpenChange(false);
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle>Resolve Safety Flag</DialogTitle>
          <DialogDescription>
            Document how this safety concern was addressed for {patient.name}.
          </DialogDescription>
        </DialogHeader>

        <div className="space-y-4 py-2">
          {/* Flagged Message */}
          {patient.safetyFlagMessage && (
            <div className="rounded-md bg-danger-bg p-3">
              <p className="text-sm font-medium text-danger">
                Flagged Message:
              </p>
              <p className="mt-1 text-sm italic text-danger-foreground">
                &quot;{patient.safetyFlagMessage}&quot;
              </p>
            </div>
          )}

          {/* Resolution Reason (Required) */}
          <div className="space-y-3">
            <Label className="text-sm font-medium">
              Resolution reason <span className="text-danger">*</span>
            </Label>
            <RadioGroup
              value={selectedReason}
              onValueChange={setSelectedReason}
            >
              {resolutionReasons.map((reason) => (
                <div key={reason.id} className="flex items-center space-x-2">
                  <RadioGroupItem value={reason.id} id={`reason-${reason.id}`} />
                  <Label
                    htmlFor={`reason-${reason.id}`}
                    className="text-sm font-normal cursor-pointer"
                  >
                    {reason.label}
                  </Label>
                </div>
              ))}
            </RadioGroup>
          </div>

          {/* Notes */}
          <div className="space-y-2">
            <Label htmlFor="resolution-note">Notes (optional)</Label>
            <Textarea
              id="resolution-note"
              placeholder="Add any additional details..."
              value={note}
              onChange={(e) => setNote(e.target.value)}
              rows={3}
            />
          </div>

          {/* Warning */}
          <div className="rounded-md bg-muted p-3">
            <p className="text-sm text-muted-foreground">
              Resolving this flag will resume normal program reminders for this patient.
            </p>
          </div>
        </div>

        <DialogFooter>
          <Button
            variant="outline"
            onClick={() => onOpenChange(false)}
            disabled={isResolving}
            className="bg-transparent"
          >
            Cancel
          </Button>
          <Button
            onClick={handleResolve}
            disabled={isResolving || !selectedReason}
          >
            {isResolving ? "Resolving..." : "Resolve & Resume"}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}

function DeletePatientModal({ patient, open, onOpenChange }: ModalProps) {
  const [isDeleting, setIsDeleting] = useState(false);
  const [confirmText, setConfirmText] = useState("");

  const handleDelete = async () => {
    setIsDeleting(true);
    await new Promise((resolve) => setTimeout(resolve, 1500));
    toast({
      title: "Patient deleted",
      description: `${patient.name} has been permanently removed.`,
      variant: "destructive",
    });
    setIsDeleting(false);
    onOpenChange(false);
    // In a real app, redirect to dashboard
  };

  const canDelete = confirmText === patient.name;

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle className="text-destructive">Delete Patient</DialogTitle>
          <DialogDescription>
            This action cannot be undone. This will permanently delete{" "}
            <span className="font-semibold">{patient.name}</span> and all their
            data including messages, notes, and timeline history.
          </DialogDescription>
        </DialogHeader>

        <div className="space-y-4 py-2">
          <div className="rounded-md bg-destructive/10 p-3">
            <p className="text-sm font-medium text-destructive">
              Warning: All data will be permanently lost
            </p>
            <ul className="mt-2 text-sm text-muted-foreground list-disc list-inside space-y-1">
              <li>All timeline history</li>
              <li>All messages and check-ins</li>
              <li>All clinical notes</li>
              <li>Pain score history</li>
            </ul>
          </div>

          <div className="space-y-2">
            <Label htmlFor="confirm-delete">
              Type <span className="font-semibold">{patient.name}</span> to confirm
            </Label>
            <input
              id="confirm-delete"
              type="text"
              value={confirmText}
              onChange={(e) => setConfirmText(e.target.value)}
              className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2"
              placeholder={patient.name}
            />
          </div>
        </div>

        <DialogFooter>
          <Button
            variant="outline"
            onClick={() => {
              onOpenChange(false);
              setConfirmText("");
            }}
            disabled={isDeleting}
            className="bg-transparent"
          >
            Cancel
          </Button>
          <Button
            variant="destructive"
            onClick={handleDelete}
            disabled={isDeleting || !canDelete}
          >
            {isDeleting ? "Deleting..." : "Delete Patient"}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
