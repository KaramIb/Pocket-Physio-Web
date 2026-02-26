export type PatientStatus = "active" | "paused" | "completed";

export type AlertType = "silent" | "pain_increasing" | "safety_flag";

export type TimelineEntryType =
  | "completed"
  | "skipped"
  | "no_response"
  | "safety_flag"
  | "question"
  | "reminder";

export type BarrierCategory = "Time" | "Pain" | "Motivation" | "Life Event" | "Other";

export interface Barrier {
  category: BarrierCategory;
  timestamp: string;
  message?: string;
}

export interface Patient {
  id: string;
  name: string;
  phone: string;
  status: PatientStatus;
  startDate: string;
  programName: string;
  programUrl?: string;
  currentDay: number;
  totalDays: number;
  currentWeek: number;
  totalWeeks: number;
  completedExercises: number;
  totalExercises: number;
  skippedCount: number;
  skipStreak?: number;
  avgPain: number;
  lastResponse: string;
  lastPainScore: number;
  painHistory: number[];
  alertType?: AlertType;
  alertMessage?: string;
  daysSinceResponse?: number;
  hasSafetyFlag?: boolean;
  safetyFlagMessage?: string;
  lastActive?: string;
  completionRate?: number;
  barriers?: Barrier[];
}

export interface TimelineEntry {
  id: string;
  type: TimelineEntryType;
  timestamp: string;
  painScore?: number;
  message?: string;
  botResponse?: string;
}

export interface DashboardStats {
  totalPatients: number;
  activeToday: number;
  needAttention: number;
  completionRate: number;
}
