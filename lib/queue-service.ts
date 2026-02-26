import type { QueueItem } from "./queue-types";

const RESOLVED_ITEMS_KEY = "pocket-physio-resolved-items";
const SNOOZED_ITEMS_KEY = "pocket-physio-snoozed-items";

// Get resolved patient IDs from localStorage
export function getResolvedPatientIds(): Set<string> {
  if (typeof window === "undefined") return new Set();
  
  try {
    const stored = localStorage.getItem(RESOLVED_ITEMS_KEY);
    if (!stored) return new Set();
    
    const data = JSON.parse(stored) as Array<{ patientId: string; resolvedAt: string }>;
    
    // Filter out resolved items older than 24 hours
    const dayAgo = Date.now() - 24 * 60 * 60 * 1000;
    const recent = data.filter(
      (item) => new Date(item.resolvedAt).getTime() > dayAgo
    );
    
    // Update storage with filtered list
    if (recent.length !== data.length) {
      localStorage.setItem(RESOLVED_ITEMS_KEY, JSON.stringify(recent));
    }
    
    return new Set(recent.map((item) => item.patientId));
  } catch (error) {
    console.error("[v0] Error reading resolved items:", error);
    return new Set();
  }
}

// Mark a patient as resolved
export function markPatientResolved(
  patientId: string,
  action: string
): void {
  if (typeof window === "undefined") return;
  
  try {
    const stored = localStorage.getItem(RESOLVED_ITEMS_KEY);
    const data = stored ? JSON.parse(stored) : [];
    
    data.push({
      patientId,
      action,
      resolvedAt: new Date().toISOString(),
    });
    
    localStorage.setItem(RESOLVED_ITEMS_KEY, JSON.stringify(data));
    
    console.log("[v0] Marked patient as resolved:", patientId, action);
  } catch (error) {
    console.error("[v0] Error marking patient resolved:", error);
  }
}

// Get snoozed items from localStorage
export function getSnoozedItems(): Map<string, { until: string; reason?: string }> {
  if (typeof window === "undefined") return new Map();
  
  try {
    const stored = localStorage.getItem(SNOOZED_ITEMS_KEY);
    if (!stored) return new Map();
    
    const data = JSON.parse(stored) as Array<{
      patientId: string;
      until: string;
      reason?: string;
    }>;
    
    const now = Date.now();
    const active = data.filter(
      (item) => new Date(item.until).getTime() > now
    );
    
    // Update storage with filtered list
    if (active.length !== data.length) {
      localStorage.setItem(SNOOZED_ITEMS_KEY, JSON.stringify(active));
    }
    
    const map = new Map();
    for (const item of active) {
      map.set(item.patientId, { until: item.until, reason: item.reason });
    }
    
    return map;
  } catch (error) {
    console.error("[v0] Error reading snoozed items:", error);
    return new Map();
  }
}

// Snooze a patient
export function snoozePatient(
  patientId: string,
  duration: string
): void {
  if (typeof window === "undefined") return;
  
  try {
    const stored = localStorage.getItem(SNOOZED_ITEMS_KEY);
    const data = stored ? JSON.parse(stored) : [];
    
    // Calculate snooze until timestamp
    const now = new Date();
    let until: Date;
    
    if (duration === "1 day") {
      until = new Date(now.getTime() + 24 * 60 * 60 * 1000);
    } else if (duration === "3 days") {
      until = new Date(now.getTime() + 3 * 24 * 60 * 60 * 1000);
    } else if (duration === "1 week") {
      until = new Date(now.getTime() + 7 * 24 * 60 * 60 * 1000);
    } else {
      until = new Date(now.getTime() + 24 * 60 * 60 * 1000); // default 1 day
    }
    
    data.push({
      patientId,
      until: until.toISOString(),
      reason: `Snoozed for ${duration}`,
    });
    
    localStorage.setItem(SNOOZED_ITEMS_KEY, JSON.stringify(data));
    
    console.log("[v0] Snoozed patient:", patientId, duration);
  } catch (error) {
    console.error("[v0] Error snoozing patient:", error);
  }
}

// Clear resolved items (for testing)
export function clearResolvedItems(): void {
  if (typeof window === "undefined") return;
  localStorage.removeItem(RESOLVED_ITEMS_KEY);
}

// Clear snoozed items (for testing)
export function clearSnoozedItems(): void {
  if (typeof window === "undefined") return;
  localStorage.removeItem(SNOOZED_ITEMS_KEY);
}
