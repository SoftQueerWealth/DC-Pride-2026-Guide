import type { CityKey } from '../constants/cities';
import type { PrideFestival } from '../constants/festivals';
import type { PrideEvent } from '../types/event';

function normalizePrideSeries(value: string): string {
  return value.trim().toLowerCase();
}

function matchesPrideSeries(event: PrideEvent, series: ReadonlySet<string>): boolean {
  const label = event.prideSeries?.trim();
  if (!label) return false;
  return series.has(normalizePrideSeries(label));
}

export function filterEventsForFestival(events: PrideEvent[], festival: PrideFestival): PrideEvent[] {
  let filtered = events;

  if (festival.cityInclude?.length) {
    const allowed = new Set<CityKey>(festival.cityInclude);
    filtered = filtered.filter((event) => event.city && allowed.has(event.city as CityKey));
  }

  if (festival.cityExclude?.length) {
    const excluded = new Set<CityKey>(festival.cityExclude);
    filtered = filtered.filter((event) => !event.city || !excluded.has(event.city as CityKey));
  }

  if (festival.prideSeriesInclude?.length) {
    const allowed = new Set(festival.prideSeriesInclude.map(normalizePrideSeries));
    filtered = filtered.filter((event) => matchesPrideSeries(event, allowed));
  }

  if (festival.prideSeriesExclude?.length) {
    const excluded = new Set(festival.prideSeriesExclude.map(normalizePrideSeries));
    filtered = filtered.filter((event) => !matchesPrideSeries(event, excluded));
  }

  return filtered;
}
