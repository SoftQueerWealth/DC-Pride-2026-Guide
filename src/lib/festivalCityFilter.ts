import type { CityKey } from '../constants/cities';
import type { PrideFestival } from '../constants/festivals';
import type { PrideEvent } from '../types/event';

export function filterEventsForFestival(events: PrideEvent[], festival: PrideFestival): PrideEvent[] {
  if (festival.cityInclude?.length) {
    const allowed = new Set<CityKey>(festival.cityInclude);
    return events.filter((event) => event.city && allowed.has(event.city as CityKey));
  }

  if (festival.cityExclude?.length) {
    const excluded = new Set<CityKey>(festival.cityExclude);
    return events.filter((event) => !event.city || !excluded.has(event.city as CityKey));
  }

  return events;
}
