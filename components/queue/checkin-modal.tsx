"use client";

import { useState, useEffect } from "react";
import { Send, X } from "lucide-react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Badge } from "@/components/ui/badge";
import { cn } from "@/lib/utils";
import type { Patient } from "@/lib/types";

interface CheckinModalProps {
  patient: Patient;
  open: boolean;
  onOpenChange: (open: boolean) => void;
  onSent: () => void;
}

function getSignalTag(patient: Patient): { label: string; variant: "danger" | "warning" | "muted" } {
  if (patient.alertType === "safety_flag") {
    return { label: "Safety keyword", variant: "danger" };
  }
  if (patient.alertType === "pain_increasing") {
    const last = patient.painHistory?.[patient.painHistory.length - 1];
    const prev = patient.painHistory?.[patient.painHistory.length - 2];
    return {
      label: prev !== undefined && last !== undefined ? `Pain trending up ${prev}\u2192${last}` : "Pain increasing",
      variant: "danger",
    };
  }
  if (patient.alertType === "silent" && patient.daysSinceResponse) {
    return { label: `Silent ${patient.daysSinceResponse} days`, variant: "warning" };
  }
  if (patient.skipStreak && patient.skipStreak >= 2) {
    return { label: `Skip streak: ${patient.skipStreak}`, variant: "warning" };
  }
  return { label: "Follow-up needed", variant: "muted" };
}

function generateDraft(patient: Patient): string {
  if (patient.alertType === "safety_flag") {
    return `Hi ${patient.name.split(" ")[0]}, I saw your message and want to make sure you're okay. Can you tell me a bit more about the shooting pain? If it's getting worse or you're worried, please call us or go to A&E. We're here to help.`;
  }
  if (patient.alertType === "pain_increasing") {
    const score = patient.painHistory?.[patient.painHistory.length - 1];
    return `Hi ${patient.name.split(" ")[0]}, I noticed your pain has been creeping up recently${score ? ` (${score}/10)` : ""}. How are you feeling today? If any of the exercises are making it worse, let me know and we can adjust your programme.`;
  }
  if (patient.alertType === "silent") {
    return `Hi ${patient.name.split(" ")[0]}, just checking in \u2014 I haven't heard from you in a few days. How are the exercises going? No pressure, just want to make sure everything's alright.`;
  }
  return `Hi ${patient.name.split(" ")[0]}, just checking in \u2014 how are things going with your programme?`;
}

function getLastMessage(patient: Patient): string | null {
  if (patient.safetyFlagMessage) return patient.safetyFlagMessage;
  return null;
}

export function CheckinModal({ patient, open, onOpenChange, onSent }: CheckinModalProps) {
  const [draft, setDraft] = useState("");
  const [isSending, setIsSending] = useState(false);

  const signal = getSignalTag(patient);
  const lastMessage = getLastMessage(patient);

  // Reset draft when modal opens with new patient
  useEffect(() => {
    if (open) {
      setDraft(generateDraft(patient));
      setIsSending(false);
    }
  }, [open, patient]);

  const handleSend = async () => {
    if (!draft.trim()) return;
    setIsSending(true);
    // Simulate API call
    await new Promise((r) => setTimeout(r, 600));
    onSent();
    onOpenChange(false);
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-lg">
        <DialogHeader>
          <DialogTitle className="text-lg break-words">
            {patient.name} &middot; Check-in
          </DialogTitle>
        </DialogHeader>

        <div className="space-y-4 pt-1">
          {/* Signal Tag */}
          <Badge
            variant="secondary"
            className={cn(
              "text-xs font-medium",
              signal.variant === "danger" && "bg-danger-bg text-danger",
              signal.variant === "warning" && "bg-warning-bg text-warning",
              signal.variant === "muted" && "bg-muted text-muted-foreground"
            )}
          >
            {signal.label}
          </Badge>

          {/* Last Message Context */}
          {lastMessage && (
            <div className="rounded-lg bg-muted/60 px-4 py-3">
              <p className="text-xs font-medium text-muted-foreground mb-1">Last message from patient</p>
              <p className="text-sm text-foreground italic break-words">
                &ldquo;{lastMessage}&rdquo;
              </p>
            </div>
          )}

          {/* Draft Message */}
          <div>
            <Textarea
              value={draft}
              onChange={(e) => setDraft(e.target.value)}
              className="min-h-[140px] resize-none text-sm leading-relaxed"
              autoFocus
            />
            <p className="mt-1.5 text-xs text-muted-foreground">
              AI-drafted based on patient context. Edit as needed.
            </p>
          </div>
        </div>

        {/* Actions */}
        <div className="flex items-center justify-end gap-2 pt-2">
          <Button
            variant="ghost"
            onClick={() => onOpenChange(false)}
            className="bg-transparent"
          >
            Dismiss
          </Button>
          <Button
            onClick={handleSend}
            disabled={!draft.trim() || isSending}
            className="gap-1.5"
          >
            {isSending ? (
              "Sending..."
            ) : (
              <>
                <Send className="h-3.5 w-3.5" />
                Send via WhatsApp
              </>
            )}
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
}
