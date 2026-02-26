"use client";

import React from "react"

import { useState } from "react";
import { Sidebar } from "./sidebar";
import { TopBar } from "./top-bar";
import { MobileNav } from "@/components/dashboard/mobile-nav";
import { KeyboardShortcuts } from "./keyboard-shortcuts";
import { cn } from "@/lib/utils";

interface AppShellProps {
  children: React.ReactNode;
}

export function AppShell({ children }: AppShellProps) {
  const [sidebarCollapsed, setSidebarCollapsed] = useState(false);

  return (
    <div className="min-h-screen bg-secondary">
      {/* Sidebar - Desktop only */}
      <Sidebar onCollapsedChange={setSidebarCollapsed} />
      
      {/* Top Bar */}
      <TopBar sidebarCollapsed={sidebarCollapsed} />
      
      {/* Main Content */}
      <main
        id="main-content"
        className={cn(
          "pt-16 pb-20 md:pb-6 transition-all duration-300",
          sidebarCollapsed ? "md:pl-16" : "md:pl-60"
        )}
      >
        {children}
      </main>

      {/* Mobile Navigation */}
      <MobileNav />

      {/* Keyboard Shortcuts Modal */}
      <KeyboardShortcuts />
    </div>
  );
}
