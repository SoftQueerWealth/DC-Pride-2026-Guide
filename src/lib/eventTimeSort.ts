import type { PrideEvent } from '../types/event';

/** Minutes from midnight for the first h:mm AM/PM in a time string; null if missing/unparseable. */
export function parseEventTimeMinutes(time: string): number | null {
  const match = time.trim().match(/(\d{1,2}):(\d{2})\s*(AM|PM)/i);
  if (!match) return null;

  let hours = Number.parseInt(match[1], 10);
  const minutes = Number.parseInt(match[2], 10);
  const period = match[3].toUpperCase();

  if (period === 'AM') {
    if (hours === 12) hours = 0;
  } else if (hours !== 12) {
    hours += 12;
  }

  return hours * 60 + minutes;
}

/** Sort key for events on the same day: time ascending, then name. */
export function compareByEventTime(a: PrideEvent, b: PrideEvent): number {
  const timeA = parseEventTimeMinutes(a.time);
  const timeB = parseEventTimeMinutes(b.time);

  if (timeA !== null && timeB !== null && timeA !== timeB) return timeA - timeB;
  if (timeA !== null && timeB === null) return -1;
  if (timeA === null && timeB !== null) return 1;

  return a.name.localeCompare(b.name);
}
