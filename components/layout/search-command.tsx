"use client";

import { useState, useEffect, useCallback } from "react";
import { useRouter } from "next/navigation";
import { Search, User, UserPlus, Settings, LayoutDashboard, Users } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  CommandDialog,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
  CommandSeparator,
} from "@/components/ui/command";
import { allPatients } from "@/lib/data";

interface SearchCommandProps {
  onAddPatient?: () => void;
}

export function SearchCommand({ onAddPatient }: SearchCommandProps) {
  const [open, setOpen] = useState(false);
  const router = useRouter();

  useEffect(() => {
    const down = (e: KeyboardEvent) => {
      // Open search with Cmd+K
      if (e.key === "k" && (e.metaKey || e.ctrlKey)) {
        e.preventDefault();
        setOpen((open) => !open);
      }

      // Add new patient with Cmd+N
      if (e.key === "n" && (e.metaKey || e.ctrlKey)) {
        e.preventDefault();
        if (onAddPatient) {
          onAddPatient();
        }
      }
    };

    document.addEventListener("keydown", down);
    return () => document.removeEventListener("keydown", down);
  }, [onAddPatient]);

  const handleSelect = useCallback(
    (value: string) => {
      setOpen(false);
      
      if (value === "add-patient" && onAddPatient) {
        onAddPatient();
        return;
      }
      
      if (value === "dashboard") {
        router.push("/");
        return;
      }
      
      if (value === "patients") {
        router.push("/patients");
        return;
      }
      
      if (value === "settings") {
        router.push("/settings");
        return;
      }
      
      // Navigate to patient
      router.push(`/patient/${value}`);
    },
    [router, onAddPatient]
  );

  return (
    <>
      <Button
        variant="outline"
        className="relative h-9 w-full justify-start rounded-lg bg-muted/50 text-sm text-muted-foreground hover:bg-muted sm:w-64 lg:w-80"
        onClick={() => setOpen(true)}
      >
        <Search className="mr-2 h-4 w-4" />
        <span className="hidden sm:inline-flex">Search patients...</span>
        <span className="inline-flex sm:hidden">Search...</span>
        <kbd className="pointer-events-none absolute right-2 top-1/2 -translate-y-1/2 hidden h-5 select-none items-center gap-1 rounded border border-border bg-background px-1.5 font-mono text-[10px] font-medium opacity-100 sm:flex">
          <span className="text-xs">⌘</span>K
        </kbd>
      </Button>

      <CommandDialog open={open} onOpenChange={setOpen}>
        <CommandInput placeholder="Search patients, actions, or pages..." />
        <CommandList>
          <CommandEmpty>
            <div className="py-6 text-center">
              <Search className="mx-auto h-10 w-10 text-muted-foreground/50" />
              <p className="mt-2 text-sm text-muted-foreground">No results found</p>
              <p className="text-xs text-muted-foreground">
                Try searching for a patient name or phone number
              </p>
            </div>
          </CommandEmpty>
          
          {/* Quick Actions */}
          <CommandGroup heading="Quick Actions">
            {onAddPatient && (
              <CommandItem
                value="add-patient"
                onSelect={() => handleSelect("add-patient")}
                className="cursor-pointer"
              >
                <UserPlus className="mr-2 h-4 w-4 text-primary" />
                <span>Add New Patient</span>
                <kbd className="ml-auto pointer-events-none hidden h-5 select-none items-center gap-1 rounded border border-border bg-muted px-1.5 font-mono text-[10px] font-medium sm:flex">
                  <span className="text-xs">⌘</span>N
                </kbd>
              </CommandItem>
            )}
          </CommandGroup>

          <CommandSeparator />

          {/* Navigation */}
          <CommandGroup heading="Pages">
            <CommandItem
              value="dashboard"
              onSelect={() => handleSelect("dashboard")}
              className="cursor-pointer"
            >
              <LayoutDashboard className="mr-2 h-4 w-4 text-muted-foreground" />
              <span>Dashboard</span>
            </CommandItem>
            <CommandItem
              value="patients"
              onSelect={() => handleSelect("patients")}
              className="cursor-pointer"
            >
              <Users className="mr-2 h-4 w-4 text-muted-foreground" />
              <span>All Patients</span>
            </CommandItem>
            <CommandItem
              value="settings"
              onSelect={() => handleSelect("settings")}
              className="cursor-pointer"
            >
              <Settings className="mr-2 h-4 w-4 text-muted-foreground" />
              <span>Settings</span>
            </CommandItem>
          </CommandGroup>

          <CommandSeparator />

          {/* Patients */}
          <CommandGroup heading="Patients">
            {allPatients.map((patient) => (
              <CommandItem
                key={patient.id}
                value={`${patient.name} ${patient.phone} ${patient.id}`}
                onSelect={() => handleSelect(patient.id)}
                className="cursor-pointer"
              >
                <User className="mr-2 h-4 w-4 text-muted-foreground" />
                <div className="flex flex-col">
                  <span className="font-medium">{patient.name}</span>
                  <span className="text-xs text-muted-foreground">
                    {patient.phone} · {patient.programName}
                  </span>
                </div>
              </CommandItem>
            ))}
          </CommandGroup>
        </CommandList>
      </CommandDialog>
    </>
  );
}
