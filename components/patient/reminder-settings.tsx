"use client";

import { useState } from "react";
import { Clock, Edit2, Check, X } from "lucide-react";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { toast } from "@/hooks/use-toast";
import type { Patient } from "@/lib/types";

interface ReminderSettingsProps {
  patient: Patient;
}

const hours = Array.from({ length: 24 }, (_, i) => i);
const minutes = ["00", "15", "30", "45"];

export function ReminderSettings({ patient }: ReminderSettingsProps) {
  const [isEditing, setIsEditing] = useState(false);
  const [selectedHour, setSelectedHour] = useState("9");
  const [selectedMinute, setSelectedMinute] = useState("00");
  const [isSaving, setIsSaving] = useState(false);

  // Get current reminder time (mock)
  const currentTime = "9:00 AM";
  const timezone = "Europe/London (GMT+0)";

  const handleSave = async () => {
    setIsSaving(true);
    await new Promise((resolve) => setTimeout(resolve, 800));
    setIsSaving(false);
    setIsEditing(false);
    toast({
      title: "Reminder updated",
      description: `Daily reminders will now be sent at ${formatTime(
        selectedHour,
        selectedMinute
      )}. Changes take effect from tomorrow.`,
    });
  };

  const formatTime = (hour: string, minute: string) => {
    const h = parseInt(hour, 10);
    const ampm = h >= 12 ? "PM" : "AM";
    const displayHour = h === 0 ? 12 : h > 12 ? h - 12 : h;
    return `${displayHour}:${minute} ${ampm}`;
  };

  return (
    <Card className="p-4">
      <div className="flex items-start justify-between">
        <div className="flex items-start gap-3">
          <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-primary/10">
            <Clock className="h-5 w-5 text-primary" />
          </div>
          <div>
            <h3 className="font-medium text-foreground">Daily Reminder Time</h3>
            {!isEditing ? (
              <>
                <p className="mt-0.5 text-sm text-muted-foreground">
                  {currentTime}
                </p>
                <p className="text-xs text-muted-foreground">{timezone}</p>
              </>
            ) : (
              <div className="mt-2 flex items-center gap-2">
                <Select value={selectedHour} onValueChange={setSelectedHour}>
                  <SelectTrigger className="w-20">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    {hours.map((h) => (
                      <SelectItem key={h} value={h.toString()}>
                        {h.toString().padStart(2, "0")}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
                <span className="text-muted-foreground">:</span>
                <Select value={selectedMinute} onValueChange={setSelectedMinute}>
                  <SelectTrigger className="w-20">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    {minutes.map((m) => (
                      <SelectItem key={m} value={m}>
                        {m}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
                <span className="ml-2 text-xs text-muted-foreground">
                  {timezone}
                </span>
              </div>
            )}
          </div>
        </div>

        {!isEditing ? (
          <Button
            variant="ghost"
            size="sm"
            onClick={() => setIsEditing(true)}
          >
            <Edit2 className="mr-1 h-4 w-4" />
            Edit
          </Button>
        ) : (
          <div className="flex items-center gap-1">
            <Button
              variant="ghost"
              size="icon"
              className="h-8 w-8"
              onClick={() => setIsEditing(false)}
              disabled={isSaving}
            >
              <X className="h-4 w-4" />
              <span className="sr-only">Cancel</span>
            </Button>
            <Button
              size="sm"
              onClick={handleSave}
              disabled={isSaving}
            >
              {isSaving ? (
                "Saving..."
              ) : (
                <>
                  <Check className="mr-1 h-4 w-4" />
                  Save
                </>
              )}
            </Button>
          </div>
        )}
      </div>

      {isEditing && (
        <p className="mt-3 text-xs text-muted-foreground border-t border-border pt-3">
          Changes take effect from tomorrow. The patient will receive their daily
          exercise reminder at this time.
        </p>
      )}
    </Card>
  );
}
