"use client";

import { useState, useMemo } from "react";
import Link from "next/link";
import {
  ArrowUpDown,
  Download,
  MessageCircle,
  Search,
  Check,
  AlertTriangle,
  ShieldAlert,
  X,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Checkbox } from "@/components/ui/checkbox";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { toast } from "@/hooks/use-toast";
import { cn } from "@/lib/utils";
import { allPatients } from "@/lib/data";
import type { Patient } from "@/lib/types";

type SortField = "name" | "status" | "day" | "lastActive" | "pain";
type SortDirection = "asc" | "desc";

export default function PatientsPage() {
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedPatients, setSelectedPatients] = useState<Set<string>>(new Set());
  const [sortField, setSortField] = useState<SortField>("name");
  const [sortDirection, setSortDirection] = useState<SortDirection>("asc");
  const [statusFilter, setStatusFilter] = useState<"all" | "on-track" | "needs-attention">("all");
  const [programFilter, setProgramFilter] = useState<string>("");

  const handleSort = (field: SortField) => {
    if (sortField === field) {
      setSortDirection(sortDirection === "asc" ? "desc" : "asc");
    } else {
      setSortField(field);
      setSortDirection("asc");
    }
  };

  const filteredAndSortedPatients = useMemo(() => {
    let result = [...allPatients];

    // Filter by search
    if (searchQuery) {
      const query = searchQuery.toLowerCase();
      result = result.filter(
        (p) =>
          p.name.toLowerCase().includes(query) ||
          p.phone.toLowerCase().includes(query) ||
          p.programName.toLowerCase().includes(query)
      );
    }

    // Filter by status
    if (statusFilter !== "all") {
      if (statusFilter === "on-track") {
        result = result.filter((p) => !p.hasSafetyFlag && !p.alertType);
      } else if (statusFilter === "needs-attention") {
        result = result.filter((p) => p.hasSafetyFlag || p.alertType);
      }
    }

    // Filter by program
    if (programFilter) {
      result = result.filter((p) =>
        p.programName.toLowerCase().includes(programFilter.toLowerCase())
      );
    }

    // Sort
    result.sort((a, b) => {
      let comparison = 0;
      switch (sortField) {
        case "name":
          comparison = a.name.localeCompare(b.name);
          break;
        case "status":
          comparison = a.status.localeCompare(b.status);
          break;
        case "day":
          comparison = a.currentDay / a.totalDays - b.currentDay / b.totalDays;
          break;
        case "lastActive":
          const aActive = a.lastResponse === "Today" ? 0 : a.lastResponse === "Yesterday" ? 1 : 2;
          const bActive = b.lastResponse === "Today" ? 0 : b.lastResponse === "Yesterday" ? 1 : 2;
          comparison = aActive - bActive;
          break;
        case "pain":
          comparison = a.lastPainScore - b.lastPainScore;
          break;
      }
      return sortDirection === "asc" ? comparison : -comparison;
    });

    return result;
  }, [searchQuery, sortField, sortDirection, statusFilter, programFilter]);

  const toggleSelectAll = () => {
    if (selectedPatients.size === filteredAndSortedPatients.length) {
      setSelectedPatients(new Set());
    } else {
      setSelectedPatients(new Set(filteredAndSortedPatients.map((p) => p.id)));
    }
  };

  const toggleSelect = (id: string) => {
    const newSelected = new Set(selectedPatients);
    if (newSelected.has(id)) {
      newSelected.delete(id);
    } else {
      newSelected.add(id);
    }
    setSelectedPatients(newSelected);
  };

  const handleBulkCheckIn = () => {
    toast({
      title: "Check-ins sent",
      description: `Sent check-in messages to ${selectedPatients.size} patients`,
    });
    setSelectedPatients(new Set());
  };

  const handleExport = () => {
    const csv = [
      ["Name", "Phone", "Status", "Program", "Day", "Pain", "Last Active"].join(","),
      ...allPatients.map((p) =>
        [
          p.name,
          p.phone,
          p.status,
          p.programName,
          `${p.currentDay}/${p.totalDays}`,
          p.lastPainScore,
          p.lastResponse,
        ].join(",")
      ),
    ].join("\n");

    const blob = new Blob([csv], { type: "text/csv" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = "patients.csv";
    a.click();
    URL.revokeObjectURL(url);

    toast({
      title: "Export complete",
      description: "Patient data has been downloaded as CSV",
    });
  };

  const getStatusBadge = (patient: Patient) => {
    if (patient.hasSafetyFlag) {
      return (
        <Badge className="bg-danger-bg text-danger hover:bg-danger-bg">
          <ShieldAlert className="mr-1 h-3 w-3" />
          Safety Flag
        </Badge>
      );
    }
    if (patient.alertType) {
      return (
        <Badge className="bg-warning-bg text-warning hover:bg-warning-bg">
          <AlertTriangle className="mr-1 h-3 w-3" />
          Needs Attention
        </Badge>
      );
    }
    return (
      <Badge className="bg-success-bg text-success hover:bg-success-bg">
        <Check className="mr-1 h-3 w-3" />
        On Track
      </Badge>
    );
  };

  return (
    <div className="mx-auto max-w-7xl px-4 py-6 sm:px-6 lg:px-8">
      {/* Page Header */}
      <div className="mb-6 flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <h1 className="text-2xl font-semibold text-foreground">All Patients</h1>
          <p className="mt-1 text-sm text-muted-foreground">
            {allPatients.length} patients total
          </p>
        </div>
        <div className="flex gap-2">
          <Button variant="outline" onClick={handleExport} className="bg-transparent">
            <Download className="mr-2 h-4 w-4" />
            Export CSV
          </Button>
        </div>
      </div>

      {/* Filters */}
      <div className="mb-6 flex flex-wrap items-center gap-3">
        {/* Status Filters */}
        <div className="flex items-center gap-1.5">
          <button
            onClick={() => setStatusFilter("all")}
            className={cn(
              "rounded-full px-3 py-1.5 text-sm font-medium transition-all duration-200",
              statusFilter === "all"
                ? "bg-primary text-primary-foreground"
                : "bg-muted text-muted-foreground hover:bg-muted/70"
            )}
          >
            All
          </button>
          <button
            onClick={() => setStatusFilter("on-track")}
            className={cn(
              "rounded-full px-3 py-1.5 text-sm font-medium transition-all duration-200 inline-flex items-center gap-1.5",
              statusFilter === "on-track"
                ? "bg-success/15 text-success"
                : "bg-muted text-muted-foreground hover:bg-muted/70"
            )}
          >
            <Check className="h-3.5 w-3.5" />
            On Track
          </button>
          <button
            onClick={() => setStatusFilter("needs-attention")}
            className={cn(
              "rounded-full px-3 py-1.5 text-sm font-medium transition-all duration-200 inline-flex items-center gap-1.5",
              statusFilter === "needs-attention"
                ? "bg-warning/15 text-warning"
                : "bg-muted text-muted-foreground hover:bg-muted/70"
            )}
          >
            <AlertTriangle className="h-3.5 w-3.5" />
            Needs Attention
          </button>
        </div>

        {/* Body Part Filters */}
        <div className="flex items-center gap-2 flex-1 max-w-xs">
          <div className="relative w-full">
            <Search className="absolute left-3 top-1/2 h-3.5 w-3.5 -translate-y-1/2 text-muted-foreground pointer-events-none" />
            <Input
              placeholder="e.g., Knee Rehab, Lower Back..."
              value={programFilter}
              onChange={(e) => setProgramFilter(e.target.value)}
              className="pl-8 h-8 text-sm"
            />
            {programFilter && (
              <button
                onClick={() => setProgramFilter("")}
                className="absolute right-2.5 top-1/2 -translate-y-1/2 p-0.5 hover:bg-muted rounded transition-colors"
              >
                <X className="h-3.5 w-3.5 text-muted-foreground" />
              </button>
            )}
          </div>
          {!programFilter && (
            <div className="flex gap-1">
              
              
            </div>
          )}
        </div>
      </div>

      {/* Search and Bulk Actions */}
      <div className="mb-4 flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <div className="relative w-full sm:w-80">
          <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
          <Input
            placeholder="Search patients..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="pl-9"
          />
        </div>

        {selectedPatients.size > 0 && (
          <div className="flex items-center gap-2">
            <span className="text-sm text-muted-foreground">
              {selectedPatients.size} selected
            </span>
            <Button size="sm" onClick={handleBulkCheckIn}>
              <MessageCircle className="mr-2 h-4 w-4" />
              Send Check-in to Selected
            </Button>
          </div>
        )}
      </div>

      {/* Table */}
      <div className="rounded-lg border border-border bg-card">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead className="w-12">
                <Checkbox
                  checked={
                    selectedPatients.size === filteredAndSortedPatients.length &&
                    filteredAndSortedPatients.length > 0
                  }
                  onCheckedChange={toggleSelectAll}
                  aria-label="Select all"
                />
              </TableHead>
              <TableHead>
                <Button
                  variant="ghost"
                  size="sm"
                  className="-ml-3 h-8 font-semibold"
                  onClick={() => handleSort("name")}
                >
                  Name
                  <ArrowUpDown className="ml-2 h-4 w-4" />
                </Button>
              </TableHead>
              <TableHead>
                <Button
                  variant="ghost"
                  size="sm"
                  className="-ml-3 h-8 font-semibold"
                  onClick={() => handleSort("status")}
                >
                  Status
                  <ArrowUpDown className="ml-2 h-4 w-4" />
                </Button>
              </TableHead>
              <TableHead>
                <Button
                  variant="ghost"
                  size="sm"
                  className="-ml-3 h-8 font-semibold"
                  onClick={() => handleSort("day")}
                >
                  Progress
                  <ArrowUpDown className="ml-2 h-4 w-4" />
                </Button>
              </TableHead>
              <TableHead>
                <Button
                  variant="ghost"
                  size="sm"
                  className="-ml-3 h-8 font-semibold"
                  onClick={() => handleSort("lastActive")}
                >
                  Last Active
                  <ArrowUpDown className="ml-2 h-4 w-4" />
                </Button>
              </TableHead>
              <TableHead>
                <Button
                  variant="ghost"
                  size="sm"
                  className="-ml-3 h-8 font-semibold"
                  onClick={() => handleSort("pain")}
                >
                  Pain
                  <ArrowUpDown className="ml-2 h-4 w-4" />
                </Button>
              </TableHead>
              <TableHead className="w-24">Actions</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {filteredAndSortedPatients.length === 0 ? (
              <TableRow>
                <TableCell colSpan={7} className="h-32 text-center">
                  <div className="flex flex-col items-center justify-center">
                    <Search className="h-8 w-8 text-muted-foreground" />
                    <p className="mt-2 text-sm font-medium text-foreground">
                      No patients found
                    </p>
                    <p className="text-sm text-muted-foreground">
                      Try adjusting your search query
                    </p>
                  </div>
                </TableCell>
              </TableRow>
            ) : (
              filteredAndSortedPatients.map((patient) => (
                <TableRow key={patient.id} className="group">
                  <TableCell>
                    <Checkbox
                      checked={selectedPatients.has(patient.id)}
                      onCheckedChange={() => toggleSelect(patient.id)}
                      aria-label={`Select ${patient.name}`}
                    />
                  </TableCell>
                  <TableCell>
                    <Link
                      href={`/patient/${patient.id}`}
                      className="font-medium text-foreground hover:text-primary hover:underline"
                    >
                      {patient.name}
                    </Link>
                    <p className="text-xs text-muted-foreground">
                      {patient.programName}
                    </p>
                  </TableCell>
                  <TableCell>{getStatusBadge(patient)}</TableCell>
                  <TableCell>
                    <div className="flex items-center gap-2">
                      <div className="h-1.5 w-16 overflow-hidden rounded-full bg-muted">
                        <div
                          className="h-full rounded-full bg-primary"
                          style={{
                            width: `${(patient.currentDay / patient.totalDays) * 100}%`,
                          }}
                        />
                      </div>
                      <span className="text-sm text-muted-foreground">
                        Day {patient.currentDay}/{patient.totalDays}
                      </span>
                    </div>
                  </TableCell>
                  <TableCell>
                    <span
                      className={cn(
                        "text-sm",
                        patient.lastResponse === "Today"
                          ? "text-success"
                          : patient.lastResponse === "Yesterday"
                            ? "text-muted-foreground"
                            : "text-warning"
                      )}
                    >
                      {patient.lastResponse}
                    </span>
                  </TableCell>
                  <TableCell>
                    <span
                      className={cn(
                        "font-mono text-sm font-medium",
                        patient.lastPainScore <= 3
                          ? "text-success"
                          : patient.lastPainScore <= 5
                            ? "text-foreground"
                            : "text-warning"
                      )}
                    >
                      {patient.lastPainScore}/10
                    </span>
                  </TableCell>
                  <TableCell>
                    <DropdownMenu>
                      <DropdownMenuTrigger asChild>
                        <Button
                          variant="ghost"
                          size="sm"
                          className="opacity-0 group-hover:opacity-100"
                        >
                          Actions
                        </Button>
                      </DropdownMenuTrigger>
                      <DropdownMenuContent align="end">
                        <DropdownMenuItem asChild>
                          <Link href={`/patient/${patient.id}`}>View Details</Link>
                        </DropdownMenuItem>
                        <DropdownMenuItem
                          onClick={() => {
                            toast({
                              title: "Check-in sent",
                              description: `Message sent to ${patient.name}`,
                            });
                          }}
                        >
                          Send Check-in
                        </DropdownMenuItem>
                        <DropdownMenuItem>Call Patient</DropdownMenuItem>
                      </DropdownMenuContent>
                    </DropdownMenu>
                  </TableCell>
                </TableRow>
              ))
            )}
          </TableBody>
        </Table>
      </div>
    </div>
  );
}
