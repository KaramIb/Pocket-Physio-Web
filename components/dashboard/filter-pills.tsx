"use client";

import { cn } from "@/lib/utils";

export type FilterType = "all" | "attention" | "safety" | "silent" | "completed";

interface FilterPillsProps {
  activeFilter: FilterType;
  onFilterChange: (filter: FilterType) => void;
  counts: {
    all: number;
    attention: number;
    safety: number;
    silent: number;
    completed: number;
  };
}

export function FilterPills({ activeFilter, onFilterChange, counts }: FilterPillsProps) {
  const filters: { key: FilterType; label: string }[] = [
    { key: "all", label: "All" },
    { key: "attention", label: "Needs Attention" },
    { key: "safety", label: "Safety Flags" },
    { key: "silent", label: "Silent 3+ Days" },
    { key: "completed", label: "Completed Today" },
  ];

  return (
    <div className="flex flex-wrap gap-2">
      {filters.map((filter) => (
        <button
          key={filter.key}
          onClick={() => onFilterChange(filter.key)}
          className={cn(
            "inline-flex items-center gap-1.5 rounded-full px-3 py-1.5 text-sm font-medium transition-all duration-200 active:scale-95",
            activeFilter === filter.key
              ? "bg-primary text-primary-foreground shadow-sm scale-100"
              : "bg-muted text-muted-foreground hover:bg-muted/80 hover:text-foreground hover:scale-105"
          )}
        >
          {filter.label}
          <span
            className={cn(
              "inline-flex h-5 min-w-5 items-center justify-center rounded-full px-1 text-xs font-medium transition-colors duration-200",
              activeFilter === filter.key
                ? "bg-primary-foreground/20 text-primary-foreground"
                : "bg-background text-muted-foreground"
            )}
          >
            {counts[filter.key]}
          </span>
        </button>
      ))}
    </div>
  );
}
