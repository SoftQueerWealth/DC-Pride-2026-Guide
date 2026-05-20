import { DAY_ORDER } from '../constants/days';
import type { PrideEvent } from '../types/event';
import { compareByEventTime } from './eventTimeSort';

export type ItineraryDayGroup = {
  dayLabel: string;
  events: PrideEvent[];
};

export function sortItineraryEvents(events: PrideEvent[]): PrideEvent[] {
  const dayIndex = new Map(DAY_ORDER.map((d, i) => [d, i]));
  return [...events].sort((a, b) => {
    const dayDiff = (dayIndex.get(a.day) ?? 0) - (dayIndex.get(b.day) ?? 0);
    if (dayDiff !== 0) return dayDiff;
    return compareByEventTime(a, b);
  });
}

export function groupItineraryEventsByDay(events: PrideEvent[]): ItineraryDayGroup[] {
  const sorted = sortItineraryEvents(events);
  const groups: ItineraryDayGroup[] = [];

  for (const event of sorted) {
    const last = groups[groups.length - 1];
    if (last?.dayLabel === event.dayLabel) {
      last.events.push(event);
    } else {
      groups.push({ dayLabel: event.dayLabel, events: [event] });
    }
  }

  return groups;
}
