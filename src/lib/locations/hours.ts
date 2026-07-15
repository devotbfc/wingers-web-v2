import type { Location, OpeningHours, OpeningHoursDay } from "./types";

export type DayKey = keyof OpeningHours;

export const dayKeys: readonly DayKey[] = [
  "monday",
  "tuesday",
  "wednesday",
  "thursday",
  "friday",
  "saturday",
  "sunday",
] as const;

export const dayLabels: Record<DayKey, string> = {
  monday: "Monday",
  tuesday: "Tuesday",
  wednesday: "Wednesday",
  thursday: "Thursday",
  friday: "Friday",
  saturday: "Saturday",
  sunday: "Sunday",
};

export const dayShort: Record<DayKey, string> = {
  monday: "Mon",
  tuesday: "Tue",
  wednesday: "Wed",
  thursday: "Thu",
  friday: "Fri",
  saturday: "Sat",
  sunday: "Sun",
};

const LONDON_FMT = new Intl.DateTimeFormat("en-GB", {
  timeZone: "Europe/London",
  weekday: "long",
  hour: "2-digit",
  minute: "2-digit",
  hourCycle: "h23",
});

export interface LondonNowParts {
  day: DayKey;
  hours: number;
  minutes: number;
  minutesSinceMidnight: number;
}

export function getLondonNowParts(now: Date = new Date()): LondonNowParts {
  const parts = LONDON_FMT.formatToParts(now);
  const weekdayPart = parts.find((p) => p.type === "weekday")?.value ?? "Monday";
  const hourStr = parts.find((p) => p.type === "hour")?.value ?? "00";
  const minuteStr = parts.find((p) => p.type === "minute")?.value ?? "00";
  const day = weekdayPart.toLowerCase() as DayKey;
  const hours = parseInt(hourStr, 10) % 24;
  const minutes = parseInt(minuteStr, 10);
  return {
    day,
    hours,
    minutes,
    minutesSinceMidnight: hours * 60 + minutes,
  };
}

export function parseHm(hhmm: string): number {
  const [h, m] = hhmm.split(":").map((n) => parseInt(n, 10));
  return (h || 0) * 60 + (m || 0);
}

export function formatHm(hhmm: string): string {
  return hhmm ?? "";
}

export function formatRange(day: OpeningHoursDay): string {
  if (day.closed) return "Closed";
  return `${formatHm(day.open)} – ${formatHm(day.close)}`;
}

export function getHoursForDay(loc: Location, dayKey: DayKey): OpeningHoursDay {
  return loc.openingHours[dayKey];
}

export function getTodayHours(loc: Location, now?: Date): OpeningHoursDay {
  return loc.openingHours[getLondonNowParts(now).day];
}

export function isOpenNow(loc: Location, now?: Date): boolean {
  const parts = getLondonNowParts(now);
  const today = loc.openingHours[parts.day];
  if (today.closed) return false;
  const openMin = parseHm(today.open);
  const closeMin = parseHm(today.close);
  if (closeMin <= openMin) return false;
  return (
    parts.minutesSinceMidnight >= openMin &&
    parts.minutesSinceMidnight < closeMin
  );
}

export interface NextOpening {
  dayKey: DayKey;
  dayIsToday: boolean;
  opensAt: string;
}

export function getNextOpening(loc: Location, now?: Date): NextOpening | null {
  const parts = getLondonNowParts(now);
  const startIndex = dayKeys.indexOf(parts.day);
  for (let offset = 0; offset < 7; offset++) {
    const idx = (startIndex + offset) % dayKeys.length;
    const dayKey = dayKeys[idx];
    const hours = loc.openingHours[dayKey];
    if (hours.closed) continue;
    const openMin = parseHm(hours.open);
    if (offset === 0 && parts.minutesSinceMidnight >= openMin) continue;
    return {
      dayKey,
      dayIsToday: offset === 0,
      opensAt: hours.open,
    };
  }
  return null;
}
