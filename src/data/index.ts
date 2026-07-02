import { ENABLED_FESTIVALS } from '../constants/festivals';
import type { PrideEvent } from '../types/event';
import { generatedEvents as julyEvents } from './festivals/july-events.generated';

const BUNDLED_BY_FESTIVAL: Record<string, PrideEvent[]> = {
  'july-events': julyEvents,
};

export function bundledEventsForFestival(festivalId: string): PrideEvent[] {
  return BUNDLED_BY_FESTIVAL[festivalId] ?? [];
}

export function allBundledFestivalEvents(): PrideEvent[] {
  return ENABLED_FESTIVALS.flatMap((festival) => bundledEventsForFestival(festival.id));
}
