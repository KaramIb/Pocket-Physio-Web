import type { QueueItem, QueueStats } from "./queue-types";

// Generate queue items from patients who need attention
export const queueItems: QueueItem[] = [
  {
    id: "q1",
    patientId: "2",
    patientName: "Emma Richards",
    patientContext: "Post-Op Knee Rehab · Day 8 of 21",
    phone: "+447XXX XXX456",
    triggerType: "safety_concern",
    reason: "Reported concerning symptoms",
    quotedMessage: "I have shooting pain down my leg that won't stop",
    priority: "critical",
    recommendedAction: "call",
    state: "active",
    createdAt: new Date(Date.now() - 2 * 60 * 60 * 1000).toISOString(),
  },
  {
    id: "q2",
    patientId: "1",
    patientName: "James Morrison",
    patientContext: "Lower Back Pain · Day 12 of 28",
    phone: "+447XXX XXX123",
    triggerType: "no_response",
    reason: "No response for 4 days",
    priority: "high",
    recommendedAction: "send_checkin",
    state: "active",
    createdAt: new Date(Date.now() - 4 * 24 * 60 * 60 * 1000).toISOString(),
  },
  {
    id: "q3",
    patientId: "3",
    patientName: "Tom Harrison",
    patientContext: "Shoulder Mobility · Day 5 of 14",
    phone: "+447XXX XXX789",
    triggerType: "no_response",
    reason: "No response for 3 days",
    priority: "high",
    recommendedAction: "send_checkin",
    state: "active",
    createdAt: new Date(Date.now() - 3 * 24 * 60 * 60 * 1000).toISOString(),
  },
];

export const queueStats: QueueStats = {
  totalActive: 24,
  totalOnTrack: 21,
  lastChecked: new Date().toISOString(),
};

export const getActiveQueueItems = (): QueueItem[] => {
  return queueItems
    .filter((item) => item.state === "active")
    .sort((a, b) => {
      // Sort by priority first (critical > high > low)
      const priorityOrder = { critical: 0, high: 1, low: 2 };
      if (priorityOrder[a.priority] !== priorityOrder[b.priority]) {
        return priorityOrder[a.priority] - priorityOrder[b.priority];
      }
      // Then by creation time (oldest first for same priority)
      return new Date(a.createdAt).getTime() - new Date(b.createdAt).getTime();
    });
};

export const getAwaitingOutcomeItems = (): QueueItem[] => {
  return queueItems.filter((item) => item.state === "awaiting_outcome");
};
