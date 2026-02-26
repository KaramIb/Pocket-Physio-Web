"use client";

import { useState } from "react";
import { Plus, Edit2, Trash2, Check, X } from "lucide-react";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { toast } from "@/hooks/use-toast";
import { cn } from "@/lib/utils";
import type { Patient } from "@/lib/types";

interface Note {
  id: string;
  content: string;
  timestamp: string;
  editedAt?: string;
}

interface NotesSectionProps {
  patient: Patient;
}

// Mock initial notes
const mockNotes: Note[] = [
  {
    id: "1",
    content:
      "Patient reports feeling better after adjusting exercise frequency. Continue monitoring pain levels.",
    timestamp: "Jan 30, 2026 at 2:15 PM",
  },
  {
    id: "2",
    content:
      "Initial assessment: Good range of motion, slight weakness in left shoulder. Recommended 3x/week exercise routine.",
    timestamp: "Jan 15, 2026 at 10:30 AM",
  },
];

export function NotesSection({ patient }: NotesSectionProps) {
  const [notes, setNotes] = useState<Note[]>(mockNotes);
  const [showAddModal, setShowAddModal] = useState(false);
  const [editingNote, setEditingNote] = useState<Note | null>(null);
  const [deleteConfirmId, setDeleteConfirmId] = useState<string | null>(null);

  const handleSaveNote = (content: string) => {
    const note: Note = {
      id: Date.now().toString(),
      content,
      timestamp: new Date().toLocaleString("en-GB", {
        month: "short",
        day: "numeric",
        year: "numeric",
        hour: "numeric",
        minute: "2-digit",
      }),
    };
    setNotes((prev) => [note, ...prev]);
    setShowAddModal(false);
    toast({
      title: "Note saved",
      description: "Your note has been added successfully.",
    });
  };

  const handleEditNote = (content: string) => {
    if (!editingNote) return;

    setNotes((prev) =>
      prev.map((n) =>
        n.id === editingNote.id
          ? {
              ...n,
              content,
              editedAt: new Date().toLocaleString("en-GB", {
                month: "short",
                day: "numeric",
                year: "numeric",
                hour: "numeric",
                minute: "2-digit",
              }),
            }
          : n
      )
    );
    setEditingNote(null);
    toast({
      title: "Note updated",
      description: "Your note has been updated successfully.",
    });
  };

  const handleDeleteNote = (id: string) => {
    setNotes((prev) => prev.filter((n) => n.id !== id));
    setDeleteConfirmId(null);
    toast({
      title: "Note deleted",
      description: "The note has been removed.",
    });
  };

  return (
    <>
      <Card className="p-4">
        <div className="mb-4 flex items-center justify-between">
          <h3 className="text-sm font-semibold uppercase tracking-wide text-muted-foreground">
            Clinical Notes
          </h3>
          <Button
            variant="outline"
            size="sm"
            onClick={() => setShowAddModal(true)}
            className="bg-transparent"
          >
            <Plus className="mr-1 h-4 w-4" />
            Add Note
          </Button>
        </div>

        {/* Notes List */}
        <div className="space-y-4">
          {notes.length === 0 ? (
            <EmptyNotesState onAddNote={() => setShowAddModal(true)} />
          ) : (
            notes.map((note, index) => (
              <div
                key={note.id}
                className={cn(
                  "group relative pl-4",
                  index !== notes.length - 1 && "border-b border-border pb-4"
                )}
              >
                <div className="absolute left-0 top-1.5 h-2 w-2 rounded-full bg-primary" />
                <div className="flex items-start justify-between gap-2">
                  <div className="flex-1">
                    <p className="text-sm text-foreground whitespace-pre-wrap">
                      {note.content}
                    </p>
                    <p className="mt-1 text-xs text-muted-foreground">
                      {note.timestamp}
                      {note.editedAt && (
                        <span className="ml-1">(edited {note.editedAt})</span>
                      )}
                    </p>
                  </div>
                  <div className="flex items-center gap-1 opacity-0 transition-opacity group-hover:opacity-100">
                    <Button
                      variant="ghost"
                      size="icon"
                      className="h-7 w-7"
                      onClick={() => setEditingNote(note)}
                    >
                      <Edit2 className="h-3.5 w-3.5" />
                      <span className="sr-only">Edit note</span>
                    </Button>
                    <Button
                      variant="ghost"
                      size="icon"
                      className="h-7 w-7 text-destructive hover:text-destructive"
                      onClick={() => setDeleteConfirmId(note.id)}
                    >
                      <Trash2 className="h-3.5 w-3.5" />
                      <span className="sr-only">Delete note</span>
                    </Button>
                  </div>
                </div>
              </div>
            ))
          )}
        </div>
      </Card>

      {/* Add Note Modal */}
      <NoteModal
        open={showAddModal}
        onOpenChange={setShowAddModal}
        onSave={handleSaveNote}
        title="Add Note"
        description={`Add a private clinical note for ${patient.name}`}
      />

      {/* Edit Note Modal */}
      <NoteModal
        open={!!editingNote}
        onOpenChange={(open) => !open && setEditingNote(null)}
        onSave={handleEditNote}
        title="Edit Note"
        description="Update this clinical note"
        initialContent={editingNote?.content}
      />

      {/* Delete Confirmation Modal */}
      <Dialog
        open={!!deleteConfirmId}
        onOpenChange={(open) => !open && setDeleteConfirmId(null)}
      >
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Delete Note</DialogTitle>
            <DialogDescription>
              Are you sure you want to delete this note? This action cannot be
              undone.
            </DialogDescription>
          </DialogHeader>
          <DialogFooter>
            <Button
              variant="outline"
              onClick={() => setDeleteConfirmId(null)}
              className="bg-transparent"
            >
              Cancel
            </Button>
            <Button
              variant="destructive"
              onClick={() => deleteConfirmId && handleDeleteNote(deleteConfirmId)}
            >
              Delete
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </>
  );
}

function EmptyNotesState({ onAddNote }: { onAddNote: () => void }) {
  return (
    <div className="py-12 text-center">
      <div className="mx-auto mb-4 flex h-12 w-12 items-center justify-center rounded-full bg-muted">
        <Plus className="h-6 w-6 text-muted-foreground" />
      </div>
      <h4 className="text-base font-medium text-foreground">No notes yet</h4>
      <p className="mt-1 text-sm text-muted-foreground">
        Add clinical notes to track important information about this patient.
      </p>
      <Button size="sm" onClick={onAddNote} className="mt-4">
        <Plus className="mr-1 h-4 w-4" />
        Add First Note
      </Button>
    </div>
  );
}

interface NoteModalProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  onSave: (content: string) => void;
  title: string;
  description: string;
  initialContent?: string;
}

function NoteModal({
  open,
  onOpenChange,
  onSave,
  title,
  description,
  initialContent = "",
}: NoteModalProps) {
  const [content, setContent] = useState(initialContent);
  const [isSaving, setIsSaving] = useState(false);
  const maxLength = 2000;

  // Reset content when modal opens with new initialContent
  useState(() => {
    if (open) {
      setContent(initialContent);
    }
  });

  const handleSave = async () => {
    if (!content.trim()) return;
    setIsSaving(true);
    await new Promise((resolve) => setTimeout(resolve, 500));
    onSave(content.trim());
    setContent("");
    setIsSaving(false);
  };

  return (
    <Dialog
      open={open}
      onOpenChange={(isOpen) => {
        if (!isOpen) setContent("");
        onOpenChange(isOpen);
      }}
    >
      <DialogContent className="sm:max-w-lg">
        <DialogHeader>
          <DialogTitle>{title}</DialogTitle>
          <DialogDescription>{description}</DialogDescription>
        </DialogHeader>

        <div className="space-y-2 py-2">
          <Textarea
            placeholder="Enter your clinical notes here..."
            value={content}
            onChange={(e) => setContent(e.target.value)}
            className="min-h-[200px] resize-none"
            maxLength={maxLength}
            autoFocus
          />
          <div className="flex justify-end">
            <span
              className={cn(
                "text-xs",
                content.length > maxLength * 0.9
                  ? "text-warning"
                  : "text-muted-foreground"
              )}
            >
              {content.length}/{maxLength}
            </span>
          </div>
        </div>

        <DialogFooter>
          <Button
            variant="outline"
            onClick={() => {
              onOpenChange(false);
              setContent("");
            }}
            disabled={isSaving}
            className="bg-transparent"
          >
            Cancel
          </Button>
          <Button
            onClick={handleSave}
            disabled={isSaving || !content.trim()}
          >
            {isSaving ? "Saving..." : "Save Note"}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
