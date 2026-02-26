export type QueuePriority = "critical" | "high" | "low";

export type QueueTriggerType = "safety_concern" | "no_response" | "high_pain";

export type QueueItemState = "active" | "awaiting_outcome" | "snoozed" | "resolved";

export interface QueueItem {
  id: string;
  patientId: string;
  patientName: string;
  patientContext: string; // e.g., "Lower back · Day 12 of 28"
  phone: string;
  
  triggerType: QueueTriggerType;
  reason: string; // The specific trigger reason
  quotedMessage?: string; // For safety concerns, the actual patient quote
  
  priority: QueuePriority;
  recommendedAction: "send_checkin" | "call" | "review";
  
  state: QueueItemState;
  snoozedUntil?: string; // ISO timestamp
  resolvedAt?: string; // ISO timestamp
  resolvedBy?: string; // Clinician name
  resolvedAction?: string; // What action was taken
  
  createdAt: string;
}

export interface QueueStats {
  totalActive: number;
  totalOnTrack: number;
  lastChecked: string;
}
