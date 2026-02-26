"use client";

import { Users, CheckCircle, UserPlus, Search, FileText, MessageSquare } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";

interface EmptyStateProps {
  onAction?: () => void;
}

export function EmptyPatientList({ onAction }: EmptyStateProps) {
  return (
    <Card className="p-12 text-center">
      <div className="mx-auto mb-4 flex h-16 w-16 items-center justify-center rounded-full bg-muted">
        <Users className="h-8 w-8 text-muted-foreground" />
      </div>
      <h3 className="text-xl font-semibold text-foreground">No patients yet</h3>
      <p className="mt-2 max-w-sm mx-auto text-muted-foreground">
        Add your first patient to get started with Pocket Physio. They&apos;ll receive
        daily reminders and you can track their progress.
      </p>
      {onAction && (
        <Button className="mt-6" onClick={onAction}>
          <UserPlus className="mr-2 h-4 w-4" />
          Add First Patient
        </Button>
      )}
    </Card>
  );
}

export function AllPatientsOnTrack() {
  return (
    <Card className="p-8 text-center">
      <div className="mx-auto mb-4 flex h-16 w-16 items-center justify-center rounded-full bg-success-bg">
        <CheckCircle className="h-8 w-8 text-success" />
      </div>
      <h3 className="text-lg font-semibold text-foreground">
        All patients on track!
      </h3>
      <p className="mt-2 max-w-sm mx-auto text-sm text-muted-foreground">
        Great news! All your patients are progressing well with their programs.
        Check back later for any updates.
      </p>
    </Card>
  );
}

export function NoSearchResults({ query }: { query?: string }) {
  return (
    <div className="py-12 text-center">
      <div className="mx-auto mb-4 flex h-12 w-12 items-center justify-center rounded-full bg-muted">
        <Search className="h-6 w-6 text-muted-foreground" />
      </div>
      <h3 className="text-lg font-medium text-foreground">No results found</h3>
      <p className="mt-1 text-sm text-muted-foreground">
        {query ? (
          <>
            No patients found for &quot;<span className="font-medium">{query}</span>&quot;
          </>
        ) : (
          "Try searching for a patient name or phone number"
        )}
      </p>
    </div>
  );
}

export function NoTimelineEntries() {
  return (
    <Card className="p-8 text-center">
      <div className="mx-auto mb-4 flex h-12 w-12 items-center justify-center rounded-full bg-muted">
        <MessageSquare className="h-6 w-6 text-muted-foreground" />
      </div>
      <h3 className="text-lg font-medium text-foreground">No activity yet</h3>
      <p className="mt-1 text-sm text-muted-foreground">
        This patient hasn&apos;t recorded any activity yet. Activity will appear
        here once they start responding to reminders.
      </p>
    </Card>
  );
}

export function NoNotesYet({ onAddNote }: { onAddNote?: () => void }) {
  return (
    <div className="py-12 text-center">
      <div className="mx-auto mb-4 flex h-12 w-12 items-center justify-center rounded-full bg-muted">
        <FileText className="h-6 w-6 text-muted-foreground" />
      </div>
      <h3 className="text-lg font-medium text-foreground">No notes yet</h3>
      <p className="mt-1 text-sm text-muted-foreground">
        Add clinical notes to track important information about this patient.
      </p>
      {onAddNote && (
        <Button variant="outline" size="sm" onClick={onAddNote} className="mt-4 bg-transparent">
          <FileText className="mr-1 h-4 w-4" />
          Add First Note
        </Button>
      )}
    </div>
  );
}

export function NoMessagesYet() {
  return (
    <div className="flex flex-col items-center justify-center py-12 text-center">
      <div className="mx-auto mb-4 flex h-12 w-12 items-center justify-center rounded-full bg-muted">
        <MessageSquare className="h-6 w-6 text-muted-foreground" />
      </div>
      <h3 className="text-lg font-medium text-foreground">No messages yet</h3>
      <p className="mt-1 text-sm text-muted-foreground max-w-sm">
        Messages exchanged with this patient via WhatsApp will appear here.
      </p>
    </div>
  );
}
