import type { PrideEvent } from '../types/event';

const DAY_GRACE_HOUR = 7;

function toIsoDateString(date: Date): string {
  const year = date.getFullYear();
  const month = String(date.getMonth() + 1).padStart(2, '0');
  const day = String(date.getDate()).padStart(2, '0');
  return `${year}-${month}-${day}`;
}

/** Guide "today": before 7 AM local, treat as the previous calendar day. */
export function effectiveGuideDate(now = new Date()): string {
  const d = new Date(now);
  if (d.getHours() < DAY_GRACE_HOUR) {
    d.setDate(d.getDate() - 1);
  }
  return toIsoDateString(d);
}

export function isUpcomingOrTodayEvent(event: PrideEvent, todayIso = effectiveGuideDate()): boolean {
  if (!event.dayDate) return true;
  return event.dayDate >= todayIso;
}

export function filterUpcomingEvents(events: PrideEvent[]): PrideEvent[] {
  const today = effectiveGuideDate();
  return events.filter((event) => isUpcomingOrTodayEvent(event, today));
}
