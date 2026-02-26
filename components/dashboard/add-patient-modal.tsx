"use client";

import React from "react";

import { useState } from "react";
import { Plus } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { toast } from "@/hooks/use-toast";

// Controlled modal that can be opened externally
interface AddPatientModalProps {
  open?: boolean;
  onOpenChange?: (open: boolean) => void;
}

export function AddPatientModal({ open, onOpenChange }: AddPatientModalProps) {
  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <AddPatientDialogContent onClose={() => onOpenChange?.(false)} />
    </Dialog>
  );
}

// FAB version with built-in trigger
export function AddPatientFAB() {
  const [open, setOpen] = useState(false);

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button
          className="fixed bottom-6 right-6 h-14 gap-2 rounded-full px-6 shadow-lg"
          size="lg"
        >
          <Plus className="h-5 w-5" />
          <span className="hidden sm:inline">Add Patient</span>
        </Button>
      </DialogTrigger>
      <AddPatientDialogContent onClose={() => setOpen(false)} />
    </Dialog>
  );
}

interface AddPatientDialogContentProps {
  onClose: () => void;
}

function AddPatientDialogContent({ onClose }: AddPatientDialogContentProps) {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [formData, setFormData] = useState({
    name: "",
    countryCode: "+44",
    phone: "",
    programUrl: "",
    notes: "",
  });
  const [hasWhatsApp, setHasWhatsApp] = useState(false);

  const validateForm = () => {
    const newErrors: Record<string, string> = {};

    if (!formData.name.trim()) {
      newErrors.name = "Name is required";
    }

    if (!formData.phone.trim()) {
      newErrors.phone = "Phone number is required";
    } else if (!/^[0-9]{10,11}$/.test(formData.phone.replace(/\s/g, ""))) {
      newErrors.phone = "Please enter a valid UK phone number";
    }

    if (formData.programUrl && !/^https?:\/\/.+/.test(formData.programUrl)) {
      newErrors.programUrl = "Please enter a valid URL";
    }

    if (!hasWhatsApp) {
      newErrors.whatsapp = "Please confirm patient has WhatsApp";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!validateForm()) return;

    setIsSubmitting(true);

    // Simulate API call
    await new Promise((resolve) => setTimeout(resolve, 1000));

    toast({
      title: "Patient added successfully",
      description: `${formData.name} has been added to your patient list.`,
    });

    setIsSubmitting(false);
    setFormData({
      name: "",
      countryCode: "+44",
      phone: "",
      programUrl: "",
      notes: "",
    });
    setHasWhatsApp(false);
    onClose();
  };

  return (
    <DialogContent className="sm:max-w-[480px]">
      <DialogHeader>
        <DialogTitle>Add New Patient</DialogTitle>
        <DialogDescription>
          Enter the patient&apos;s details to start their program.
        </DialogDescription>
      </DialogHeader>

      <form onSubmit={handleSubmit} className="space-y-4">
        {/* Name */}
        <div className="space-y-2">
          <Label htmlFor="name">
            Name <span className="text-danger">*</span>
          </Label>
          <Input
            id="name"
            placeholder="Enter patient name"
            value={formData.name}
            onChange={(e) => setFormData({ ...formData, name: e.target.value })}
            aria-invalid={!!errors.name}
            aria-describedby={errors.name ? "name-error" : undefined}
          />
          {errors.name && (
            <p id="name-error" className="text-sm text-danger">
              {errors.name}
            </p>
          )}
        </div>

        {/* Phone */}
        <div className="space-y-2">
          <Label htmlFor="phone">
            Phone Number <span className="text-danger">*</span>
          </Label>
          <div className="flex gap-2">
            <select
              value={formData.countryCode}
              onChange={(e) =>
                setFormData({ ...formData, countryCode: e.target.value })
              }
              className="h-10 rounded-md border border-input bg-background px-3 text-sm focus:outline-none focus:ring-2 focus:ring-ring"
              aria-label="Country code"
            >
              <option value="+44">+44</option>
              <option value="+1">+1</option>
              <option value="+353">+353</option>
            </select>
            <Input
              id="phone"
              type="tel"
              placeholder="7XXX XXX XXX"
              value={formData.phone}
              onChange={(e) =>
                setFormData({ ...formData, phone: e.target.value })
              }
              className="flex-1"
              aria-invalid={!!errors.phone}
              aria-describedby={errors.phone ? "phone-error" : undefined}
            />
          </div>
          {errors.phone && (
            <p id="phone-error" className="text-sm text-danger">
              {errors.phone}
            </p>
          )}
        </div>

        {/* Program URL */}
        <div className="space-y-2">
          <Label htmlFor="programUrl">Program Link</Label>
          <Input
            id="programUrl"
            type="url"
            placeholder="https://physitrack.com/program/..."
            value={formData.programUrl}
            onChange={(e) =>
              setFormData({ ...formData, programUrl: e.target.value })
            }
            aria-invalid={!!errors.programUrl}
            aria-describedby={errors.programUrl ? "programUrl-error" : undefined}
          />
          <p className="text-xs text-muted-foreground">
            Link to HEP2go, Physitrack, or other exercise program
          </p>
          {errors.programUrl && (
            <p id="programUrl-error" className="text-sm text-danger">
              {errors.programUrl}
            </p>
          )}
        </div>

        {/* Notes */}
        <div className="space-y-2">
          <Label htmlFor="notes">Notes</Label>
          <Textarea
            id="notes"
            placeholder="Any additional notes about this patient..."
            value={formData.notes}
            onChange={(e) =>
              setFormData({ ...formData, notes: e.target.value })
            }
            rows={3}
          />
        </div>

        {/* WhatsApp Confirmation */}
        <div className="space-y-2 rounded-lg border border-border bg-muted/50 p-4">
          <div className="flex items-start gap-3">
            <input
              type="checkbox"
              id="hasWhatsApp"
              checked={hasWhatsApp}
              onChange={(e) => setHasWhatsApp(e.target.checked)}
              className="mt-0.5 h-4 w-4 rounded border-input text-primary focus:ring-2 focus:ring-primary focus:ring-offset-2"
              aria-invalid={!!errors.whatsapp}
              aria-describedby={errors.whatsapp ? "whatsapp-error" : undefined}
            />
            <div className="flex-1">
              <Label htmlFor="hasWhatsApp" className="cursor-pointer font-medium">
                Patient has WhatsApp <span className="text-danger">*</span>
              </Label>
              <p className="mt-1 text-xs text-muted-foreground">
                This platform requires WhatsApp for sending exercise reminders and check-ins
              </p>
            </div>
          </div>
          {errors.whatsapp && (
            <p id="whatsapp-error" className="text-sm text-danger">
              {errors.whatsapp}
            </p>
          )}
        </div>

        <DialogFooter className="gap-2 sm:gap-0">
          <Button
            type="button"
            variant="outline"
            onClick={onClose}
            disabled={isSubmitting}
            className="bg-transparent"
          >
            Cancel
          </Button>
          <Button type="submit" disabled={isSubmitting}>
            {isSubmitting ? "Adding..." : "Add Patient"}
          </Button>
        </DialogFooter>
      </form>
    </DialogContent>
  );
}
