import { DEFAULT_FESTIVAL_ID } from '../constants/festivals';
import type { PrideEvent } from '../types/event';

export function eventFestivalId(event: PrideEvent): string {
  return event.festival ?? DEFAULT_FESTIVAL_ID;
}

export function filterEventsByFestival(events: PrideEvent[], festivalId: string): PrideEvent[] {
  return events.filter((event) => eventFestivalId(event) === festivalId);
}

export function countEnabledFestivalEvents(events: PrideEvent[], enabledFestivalIds: string[]): number {
  const enabled = new Set(enabledFestivalIds);
  return events.filter((event) => enabled.has(eventFestivalId(event))).length;
}
