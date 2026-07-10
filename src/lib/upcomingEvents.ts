import type { PrideEvent } from '../types/event';

function todayIsoDate(): string {
  const now = new Date();
  const year = now.getFullYear();
  const month = String(now.getMonth() + 1).padStart(2, '0');
  const day = String(now.getDate()).padStart(2, '0');
  return `${year}-${month}-${day}`;
}

export function isUpcomingOrTodayEvent(event: PrideEvent, todayIso = todayIsoDate()): boolean {
  if (!event.dayDate) return true;
  return event.dayDate >= todayIso;
}

export function filterUpcomingEvents(events: PrideEvent[]): PrideEvent[] {
  const today = todayIsoDate();
  return events.filter((event) => isUpcomingOrTodayEvent(event, today));
}
