"use client";

import React from "react";
import { useState } from "react";
import { MessageCircle, Send, Check } from "lucide-react";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { cn } from "@/lib/utils";
import { toast } from "@/hooks/use-toast";
import type { Patient } from "@/lib/types";

interface CheckInModalProps {
  patient: Patient;
  trigger?: React.ReactNode;
}

const presetMessages = [
  {
    id: "check-in",
    label: "General check-in",
    message: "Just checking in - how are the exercises going?",
  },
  {
    id: "quiet",
    label: "No response follow-up",
    message: "I noticed you've been quiet. Everything okay?",
  },
  {
    id: "encourage",
    label: "Encouragement",
    message: "Great progress! Keep it up. Any questions?",
  },
  {
    id: "pain",
    label: "Pain follow-up",
    message: "How's the pain level today? Let me know if anything has changed.",
  },
];

export function CheckInModal({ patient, trigger }: CheckInModalProps) {
  const [open, setOpen] = useState(false);
  const [selectedPreset, setSelectedPreset] = useState<string | null>(null);
  const [customMessage, setCustomMessage] = useState("");
  const [isSending, setIsSending] = useState(false);

  const currentMessage =
    selectedPreset === "custom"
      ? customMessage
      : presetMessages.find((p) => p.id === selectedPreset)?.message || "";

  const handleSend = async () => {
    if (!currentMessage.trim()) return;

    setIsSending(true);
    await new Promise((resolve) => setTimeout(resolve, 1000));

    toast({
      title: "Check-in sent",
      description: `Message sent to ${patient.name} via WhatsApp`,
    });

    setOpen(false);
    setSelectedPreset(null);
    setCustomMessage("");
    setIsSending(false);
  };

  const handleReset = () => {
    setSelectedPreset(null);
    setCustomMessage("");
  };

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        {trigger || (
          <Button>
            <MessageCircle className="mr-2 h-4 w-4" />
            Send Check-in
          </Button>
        )}
      </DialogTrigger>
      <DialogContent className="sm:max-w-lg">
        <DialogHeader>
          <DialogTitle>Send Check-in to {patient.name}</DialogTitle>
          <DialogDescription>
            Choose a pre-written message or write a custom one
          </DialogDescription>
        </DialogHeader>

        <div className="space-y-4 py-4">
          {/* Preset Messages */}
          <div className="space-y-2">
            <Label className="text-sm font-medium">Message</Label>
            <RadioGroup
              value={selectedPreset || undefined}
              onValueChange={(value) => {
                setSelectedPreset(value);
                if (value !== "custom") {
                  setCustomMessage("");
                }
              }}
              className="space-y-2"
            >
              {presetMessages.map((preset) => (
                <label
                  key={preset.id}
                  htmlFor={preset.id}
                  className={cn(
                    "flex cursor-pointer items-start gap-3 rounded-lg border p-3 transition-all",
                    selectedPreset === preset.id
                      ? "border-primary bg-primary/5"
                      : "border-border hover:border-primary/50"
                  )}
                >
                  <RadioGroupItem value={preset.id} id={preset.id} className="mt-0.5" />
                  <div className="flex-1">
                    <p className="text-sm font-medium text-foreground">
                      {preset.label}
                    </p>
                    <p className="mt-0.5 text-sm text-muted-foreground">
                      &quot;{preset.message}&quot;
                    </p>
                  </div>
                </label>
              ))}

              {/* Custom Message Option */}
              <label
                htmlFor="custom"
                className={cn(
                  "flex cursor-pointer items-start gap-3 rounded-lg border p-3 transition-all",
                  selectedPreset === "custom"
                    ? "border-primary bg-primary/5"
                    : "border-border hover:border-primary/50"
                )}
              >
                <RadioGroupItem value="custom" id="custom" className="mt-0.5" />
                <div className="flex-1">
                  <p className="text-sm font-medium text-foreground">
                    Write custom message
                  </p>
                </div>
              </label>
            </RadioGroup>
          </div>

          {/* Custom Message Input */}
          {selectedPreset === "custom" && (
            <Textarea
              placeholder="Type your message..."
              value={customMessage}
              onChange={(e) => setCustomMessage(e.target.value)}
              className="min-h-[100px]"
              autoFocus
            />
          )}

          {/* WhatsApp Preview */}
          {currentMessage && (
            <div className="space-y-2">
              <Label className="text-sm font-medium text-muted-foreground">
                Preview
              </Label>
              <div className="rounded-lg bg-[#E5DDD5] p-4">
                {/* WhatsApp-style message bubble */}
                <div className="ml-auto max-w-[85%]">
                  <div className="relative rounded-lg bg-[#DCF8C6] px-3 py-2 shadow-sm">
                    <p className="text-sm text-[#111B21]">{currentMessage}</p>
                    <div className="mt-1 flex items-center justify-end gap-1">
                      <span className="text-[10px] text-[#667781]">
                        {new Date().toLocaleTimeString("en-GB", {
                          hour: "2-digit",
                          minute: "2-digit",
                        })}
                      </span>
                      <Check className="h-3 w-3 text-[#53BDEB]" />
                      <Check className="-ml-1.5 h-3 w-3 text-[#53BDEB]" />
                    </div>
                    {/* Bubble tail */}
                    <div className="absolute -right-1.5 top-0 h-3 w-3 overflow-hidden">
                      <div className="absolute -left-1.5 top-0 h-3 w-3 rotate-45 bg-[#DCF8C6]" />
                    </div>
                  </div>
                </div>
              </div>
            </div>
          )}
        </div>

        {/* Actions */}
        <div className="flex justify-between border-t border-border pt-4">
          <Button
            variant="ghost"
            onClick={handleReset}
            disabled={!selectedPreset && !customMessage}
            className="text-muted-foreground"
          >
            Clear
          </Button>
          <div className="flex gap-2">
            <Button
              variant="outline"
              onClick={() => setOpen(false)}
              className="bg-transparent"
            >
              Cancel
            </Button>
            <Button
              onClick={handleSend}
              disabled={!currentMessage.trim() || isSending}
              className="bg-[#25D366] hover:bg-[#20BD5A] text-white"
            >
              {isSending ? (
                "Sending..."
              ) : (
                <>
                  <Send className="mr-2 h-4 w-4" />
                  Send via WhatsApp
                </>
              )}
            </Button>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}
