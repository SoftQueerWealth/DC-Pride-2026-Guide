import { DAY_ORDER } from '../constants/days';
import type { PrideEvent } from '../types/event';
import { compareByEventTime } from './eventTimeSort';

export type ItineraryDayGroup = {
  dayLabel: string;
  events: PrideEvent[];
};

function itineraryGroupKey(event: PrideEvent): string {
  return event.dayDate ?? event.dayLabel;
}

export function sortItineraryEvents(events: PrideEvent[]): PrideEvent[] {
  const dayIndex = new Map(DAY_ORDER.map((day, index) => [day, index]));
  return [...events].sort((left, right) => {
    if (left.dayDate && right.dayDate) {
      const dateDiff = left.dayDate.localeCompare(right.dayDate);
      if (dateDiff !== 0) return dateDiff;
    } else {
      const dayDiff = (dayIndex.get(left.day) ?? 0) - (dayIndex.get(right.day) ?? 0);
      if (dayDiff !== 0) return dayDiff;
    }
    return compareByEventTime(left, right);
  });
}

export function groupItineraryEventsByDay(events: PrideEvent[]): ItineraryDayGroup[] {
  const sorted = sortItineraryEvents(events);
  const groups: ItineraryDayGroup[] = [];

  for (const event of sorted) {
    const groupKey = itineraryGroupKey(event);
    const last = groups[groups.length - 1];
    if (last && itineraryGroupKey(last.events[0]!) === groupKey) {
      last.events.push(event);
    } else {
      groups.push({ dayLabel: event.dayLabel, events: [event] });
    }
  }

  return groups;
}
