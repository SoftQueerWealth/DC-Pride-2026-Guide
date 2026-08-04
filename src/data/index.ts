import { ENABLED_FESTIVALS, festivalById } from '../constants/festivals';
import { filterEventsForFestival } from '../lib/festivalCityFilter';
import type { PrideEvent } from '../types/event';
import { generatedEvents as augustEvents } from './festivals/august-events.generated';

const EVENTS_BY_FESTIVAL: Record<string, PrideEvent[]> = {
  'august-events': augustEvents,
};

export function bundledEventsForFestival(festivalId: string): PrideEvent[] {
  const festival = festivalById(festivalId);
  if (!festival) return [];

  const events = EVENTS_BY_FESTIVAL[festivalId] ?? [];
  return filterEventsForFestival(events, festival);
}

export function allBundledFestivalEvents(): PrideEvent[] {
  return ENABLED_FESTIVALS.flatMap((festival) => bundledEventsForFestival(festival.id));
}
