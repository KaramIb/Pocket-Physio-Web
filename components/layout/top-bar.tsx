"use client";

import { useState } from "react";
import { Bell, UserPlus } from "lucide-react";
import { Button } from "@/components/ui/button";
import { SearchCommand } from "./search-command";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { AddPatientModal } from "@/components/dashboard/add-patient-modal";
import { cn } from "@/lib/utils";

interface TopBarProps {
  sidebarCollapsed?: boolean;
}

export function TopBar({ sidebarCollapsed }: TopBarProps) {
  const [showAddPatient, setShowAddPatient] = useState(false);

  return (
    <>
      <header
        className={cn(
          "fixed right-0 top-0 z-30 flex h-16 items-center justify-between border-b border-border bg-white px-4 backdrop-blur transition-all duration-300 md:px-6",
          sidebarCollapsed ? "left-0 md:left-16" : "left-0 md:left-60"
        )}
      >
        {/* Mobile: Logo placeholder / Desktop: Breadcrumb placeholder */}
        <div className="md:hidden">
          <span className="text-lg font-semibold text-foreground">
            Pocket Physio
          </span>
        </div>
        <div className="hidden md:block" />

        {/* Right side: Search + Add Patient + Notifications */}
        <div className="flex items-center gap-3">
          <SearchCommand onAddPatient={() => setShowAddPatient(true)} />

          <Button
            size="sm"
            className="hidden sm:flex"
            onClick={() => setShowAddPatient(true)}
          >
            <UserPlus className="mr-2 h-4 w-4" />
            Add Patient
          </Button>

          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button
                variant="ghost"
                size="icon"
                className="relative h-9 w-9 rounded-lg"
              >
                <Bell className="h-5 w-5 text-muted-foreground" />
                {/* Notification badge */}
                <span className="absolute -right-0.5 -top-0.5 flex h-4 w-4 items-center justify-center rounded-full bg-danger text-[10px] font-medium text-white">
                  2
                </span>
                <span className="sr-only">Notifications</span>
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end" className="w-80">
              <div className="border-b border-border px-3 py-2">
                <p className="text-sm font-semibold text-foreground">
                  Notifications
                </p>
              </div>
              <DropdownMenuItem className="flex cursor-pointer flex-col items-start gap-1 py-3">
                <p className="text-sm font-medium text-foreground">
                  Safety flag raised
                </p>
                <p className="text-xs text-muted-foreground">
                  Emma Richards reported shooting pain - 2 hours ago
                </p>
              </DropdownMenuItem>
              <DropdownMenuItem className="flex cursor-pointer flex-col items-start gap-1 py-3">
                <p className="text-sm font-medium text-foreground">
                  Patient inactive
                </p>
                <p className="text-xs text-muted-foreground">
                  Tom Harrison hasn&apos;t responded in 3 days
                </p>
              </DropdownMenuItem>
              <div className="border-t border-border px-3 py-2">
                <button className="text-xs font-medium text-primary hover:underline">
                  View all notifications
                </button>
              </div>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
      </header>

      {/* Add Patient Modal */}
      <AddPatientModal
        open={showAddPatient}
        onOpenChange={setShowAddPatient}
      />
    </>
  );
}
