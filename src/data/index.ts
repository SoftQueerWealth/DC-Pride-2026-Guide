import { ENABLED_FESTIVALS } from '../constants/festivals';
import type { PrideEvent } from '../types/event';
import { generatedEvents as baltimorePrideEvents } from './festivals/baltimore-pride.generated';
import { generatedEvents as june2026Events } from './festivals/june-2026.generated';
import { generatedEvents as nycPrideEvents } from './festivals/nyc-pride.generated';

const BUNDLED_BY_FESTIVAL: Record<string, PrideEvent[]> = {
  'baltimore-pride': baltimorePrideEvents,
  'june-2026': june2026Events,
  'nyc-pride': nycPrideEvents,
};

export function bundledEventsForFestival(festivalId: string): PrideEvent[] {
  return BUNDLED_BY_FESTIVAL[festivalId] ?? [];
}

export function allBundledFestivalEvents(): PrideEvent[] {
  return ENABLED_FESTIVALS.flatMap((festival) => bundledEventsForFestival(festival.id));
}
