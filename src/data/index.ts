import { ENABLED_FESTIVALS } from '../constants/festivals';
import type { PrideEvent } from '../types/event';
import { generatedEvents as baltimorePrideEvents } from './festivals/baltimore-pride.generated';
import { generatedEvents as capitalPrideEvents } from './festivals/capital-pride.generated';

const BUNDLED_BY_FESTIVAL: Record<string, PrideEvent[]> = {
  'baltimore-pride': baltimorePrideEvents,
  'capital-pride': capitalPrideEvents,
};

export function bundledEventsForFestival(festivalId: string): PrideEvent[] {
  return BUNDLED_BY_FESTIVAL[festivalId] ?? [];
}

export function allBundledFestivalEvents(): PrideEvent[] {
  return ENABLED_FESTIVALS.flatMap((festival) => bundledEventsForFestival(festival.id));
}
