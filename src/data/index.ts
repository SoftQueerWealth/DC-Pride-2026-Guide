import { ENABLED_FESTIVALS, festivalById } from '../constants/festivals';
import { filterEventsForFestival } from '../lib/festivalCityFilter';
import type { PrideEvent } from '../types/event';
import { generatedEvents as julyEvents } from './festivals/july-events.generated';
import { generatedEvents as wnbaEvents } from './festivals/wnba-all-star-weekend.generated';

const JULY_SHEET_FESTIVAL_IDS = new Set(['july-events', 'wnba-all-star-weekend']);
const ALL_JULY_SHEET_EVENTS: PrideEvent[] = [...julyEvents, ...wnbaEvents];

export function bundledEventsForFestival(festivalId: string): PrideEvent[] {
  const festival = festivalById(festivalId);
  if (!festival) return [];

  const events = JULY_SHEET_FESTIVAL_IDS.has(festivalId) ? ALL_JULY_SHEET_EVENTS : [];
  return filterEventsForFestival(events, festival);
}

export function allBundledFestivalEvents(): PrideEvent[] {
  return ENABLED_FESTIVALS.flatMap((festival) => bundledEventsForFestival(festival.id));
}
