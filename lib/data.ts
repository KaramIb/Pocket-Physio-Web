import type { Patient, TimelineEntry, DashboardStats } from "./types";

export const dashboardStats: DashboardStats = {
  totalPatients: 24,
  activeToday: 18,
  needAttention: 3,
  completionRate: 89,
};

export const patientsNeedingAttention: Patient[] = [
  {
    id: "1",
    name: "James Morrison",
    phone: "+44 7700 900123",
    status: "active",
    startDate: "Jan 15, 2026",
    programName: "Lower Back Pain Recovery",
    programUrl: "https://physitrack.com/program/123",
    currentDay: 12,
    totalDays: 28,
    currentWeek: 2,
    totalWeeks: 4,
    completedExercises: 8,
    totalExercises: 12,
    skippedCount: 2,
    skipStreak: 2,
    avgPain: 5.5,
    lastResponse: "4 days ago",
    lastPainScore: 6,
    painHistory: [4, 5, 5, 6],
    alertType: "pain_increasing",
    alertMessage: "Pain trending upward",
    daysSinceResponse: 4,
    lastActive: "4 days ago",
    completionRate: 67,
    barriers: [
      { category: "Pain", timestamp: new Date(Date.now() - 1 * 24 * 60 * 60 * 1000).toISOString() },
      { category: "Pain", timestamp: new Date(Date.now() - 3 * 24 * 60 * 60 * 1000).toISOString() },
      { category: "Time", timestamp: new Date(Date.now() - 5 * 24 * 60 * 60 * 1000).toISOString() },
    ],
  },
  {
    id: "2",
    name: "Emma Richards",
    phone: "+44 7700 900456",
    status: "active",
    startDate: "Jan 20, 2026",
    programName: "Post-Op Knee Rehab",
    programUrl: "https://hep2go.com/program/456",
    currentDay: 8,
    totalDays: 21,
    currentWeek: 2,
    totalWeeks: 3,
    completedExercises: 6,
    totalExercises: 8,
    skippedCount: 1,
    avgPain: 5.0,
    lastResponse: "Today",
    lastPainScore: 7,
    painHistory: [3, 4, 5, 7],
    alertType: "safety_flag",
    alertMessage: "Safety concern flagged",
    hasSafetyFlag: true,
    safetyFlagMessage: "I have shooting pain down my leg that won't stop",
    lastActive: "2 hours ago",
    completionRate: 75,
    barriers: [
      { category: "Pain", timestamp: new Date(Date.now() - 0.5 * 24 * 60 * 60 * 1000).toISOString() },
      { category: "Motivation", timestamp: new Date(Date.now() - 4 * 24 * 60 * 60 * 1000).toISOString() },
    ],
  },
  {
    id: "3",
    name: "Tom Harrison",
    phone: "+44 7700 900789",
    status: "active",
    startDate: "Jan 25, 2026",
    programName: "Shoulder Mobility Program",
    currentDay: 5,
    totalDays: 14,
    currentWeek: 1,
    totalWeeks: 2,
    completedExercises: 3,
    totalExercises: 5,
    skippedCount: 1,
    avgPain: 3.0,
    lastResponse: "3 days ago",
    lastPainScore: 3,
    painHistory: [3, 3, 3, 3],
    alertType: "silent",
    alertMessage: "3 days without response",
    daysSinceResponse: 3,
    lastActive: "3 days ago",
    completionRate: 60,
    barriers: [],
  },
];

export const patientsOnTrack: Patient[] = [
  {
    id: "4",
    name: "Sarah Kim",
    phone: "+44 7XXX XXX234",
    status: "active",
    startDate: "Jan 18, 2026",
    programName: "ACL Recovery Phase 2",
    programUrl: "https://physitrack.com/program/789",
    currentDay: 8,
    totalDays: 21,
    currentWeek: 2,
    totalWeeks: 3,
    completedExercises: 8,
    totalExercises: 8,
    skippedCount: 0,
    avgPain: 2.0,
    lastResponse: "Today",
    lastPainScore: 2,
    painHistory: [4, 3, 2, 2],
  },
  {
    id: "5",
    name: "Michael Davis",
    phone: "+44 7XXX XXX567",
    status: "active",
    startDate: "Jan 28, 2026",
    programName: "Tennis Elbow Protocol",
    currentDay: 3,
    totalDays: 7,
    currentWeek: 1,
    totalWeeks: 1,
    completedExercises: 3,
    totalExercises: 3,
    skippedCount: 0,
    avgPain: 3.0,
    lastResponse: "Today",
    lastPainScore: 3,
    painHistory: [4, 3, 3],
  },
  {
    id: "6",
    name: "Lucy Chen",
    phone: "+44 7XXX XXX890",
    status: "active",
    startDate: "Jan 12, 2026",
    programName: "Hip Flexor Strengthening",
    programUrl: "https://hep2go.com/program/012",
    currentDay: 15,
    totalDays: 28,
    currentWeek: 3,
    totalWeeks: 4,
    completedExercises: 14,
    totalExercises: 15,
    skippedCount: 1,
    avgPain: 2.0,
    lastResponse: "Yesterday",
    lastPainScore: 2,
    painHistory: [5, 4, 3, 2],
  },
  {
    id: "7",
    name: "David Wilson",
    phone: "+44 7XXX XXX345",
    status: "active",
    startDate: "Jan 20, 2026",
    programName: "Neck Pain Management",
    currentDay: 10,
    totalDays: 14,
    currentWeek: 2,
    totalWeeks: 2,
    completedExercises: 9,
    totalExercises: 10,
    skippedCount: 1,
    avgPain: 4.0,
    lastResponse: "Yesterday",
    lastPainScore: 4,
    painHistory: [6, 5, 4, 4],
  },
];

export const allPatients: Patient[] = [
  ...patientsNeedingAttention,
  ...patientsOnTrack,
];

export const getPatientById = (id: string): Patient | undefined => {
  return allPatients.find((p) => p.id === id);
};

export const getTimelineForPatient = (patientId: string): TimelineEntry[] => {
  // Generate realistic timeline entries based on patient
  const patient = getPatientById(patientId);
  if (!patient) return [];

  const entries: TimelineEntry[] = [];
  const now = new Date();

  // Add safety flag entry if exists
  if (patient.hasSafetyFlag && patient.safetyFlagMessage) {
    entries.push({
      id: `${patientId}-safety`,
      type: "safety_flag",
      timestamp: new Date(now.getTime() - 2 * 60 * 60 * 1000).toISOString(),
      message: patient.safetyFlagMessage,
    });
  }

  // Add some completed entries
  for (let i = 0; i < patient.completedExercises; i++) {
    const daysAgo = Math.floor(i / 2);
    entries.push({
      id: `${patientId}-completed-${i}`,
      type: "completed",
      timestamp: new Date(
        now.getTime() - daysAgo * 24 * 60 * 60 * 1000 - i * 60 * 60 * 1000
      ).toISOString(),
      painScore: patient.painHistory[Math.min(i, patient.painHistory.length - 1)],
      message:
        i % 3 === 0
          ? "Feeling better today, exercises getting easier"
          : undefined,
    });
  }

  // Add skipped entries
  for (let i = 0; i < patient.skippedCount; i++) {
    entries.push({
      id: `${patientId}-skipped-${i}`,
      type: "skipped",
      timestamp: new Date(
        now.getTime() - (i + 2) * 24 * 60 * 60 * 1000
      ).toISOString(),
      message: i === 0 ? "Too tired today, will do tomorrow" : undefined,
    });
  }

  // Add a question entry
  if (patient.avgPain > 3) {
    entries.push({
      id: `${patientId}-question-1`,
      type: "question",
      timestamp: new Date(
        now.getTime() - 3 * 24 * 60 * 60 * 1000
      ).toISOString(),
      message: "Is it normal to feel tightness after the stretches?",
      botResponse:
        "Some tightness is normal, but if it persists or is painful, please let your physio know.",
    });
  }

  // Add reminder entries
  entries.push({
    id: `${patientId}-reminder-1`,
    type: "reminder",
    timestamp: new Date(now.getTime() - 12 * 60 * 60 * 1000).toISOString(),
  });

  // Sort by timestamp descending
  return entries.sort(
    (a, b) => new Date(b.timestamp).getTime() - new Date(a.timestamp).getTime()
  );
};
