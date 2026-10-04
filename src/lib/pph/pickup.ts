// Pickup-time slot builder + lead-time floor. Mirrors wing-app ScheduleSheet.
// Slot step is 15 min. Today's slots are floored by `now +
// minPickupLeadMinutes` to match PPH's 5A-4 PICKUP_LEAD_TOO_SHORT 422.

import type { LocationSummary, OpeningHours } from "./types";

const SLOT_MS = 15 * 60_000;

export function getMinPickupLeadMinutes(loc: LocationSummary): number {
  return loc.minPickupLeadMinutes ?? 20;
}

export type SlotDayKey = "today" | "tomorrow";

export function buildSlots(
  loc: LocationSummary,
  dayKey: SlotDayKey,
  nowMs: number = Date.now(),
): Date[] {
  const base = new Date(nowMs);
  const slots: Date[] = [];
  const target = new Date(base);
  if (dayKey === "tomorrow") target.setDate(target.getDate() + 1);
  const dow = target.getDay();
  const hours = loc.hours.find((h) => h.day === dow);
  if (!hours || hours.closed) return slots;

  const [openH, openM] = hours.openTime.split(":").map(Number);
  const [closeH, closeM] = hours.closeTime.split(":").map(Number);
  const open = new Date(target);
  open.setHours(openH ?? 0, openM ?? 0, 0, 0);
  const close = new Date(target);
  close.setHours(closeH ?? 0, closeM ?? 0, 0, 0);

  const lead = getMinPickupLeadMinutes(loc) * 60_000;
  const floor = dayKey === "today" ? nowMs + lead : open.getTime();
  const start = ceilTo(Math.max(open.getTime(), floor), SLOT_MS);

  for (let t = start; t <= close.getTime() - SLOT_MS; t += SLOT_MS) {
    slots.push(new Date(t));
  }
  return slots;
}

function ceilTo(ms: number, step: number): number {
  return Math.ceil(ms / step) * step;
}

export function formatSlotLabel(d: Date): string {
  const hh = String(d.getHours()).padStart(2, "0");
  const mm = String(d.getMinutes()).padStart(2, "0");
  return `${hh}:${mm}`;
}

export function isSlotStillAvailable(slotIso: string, loc: LocationSummary, nowMs = Date.now()): boolean {
  const slotMs = new Date(slotIso).getTime();
  const lead = getMinPickupLeadMinutes(loc) * 60_000;
  return slotMs >= nowMs + lead;
}

export function openingHoursForDay(loc: LocationSummary, dow: number): OpeningHours | undefined {
  return loc.hours.find((h) => h.day === dow);
}
