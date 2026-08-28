import type { CityKey } from '../constants/cities';
import type { PrideFestival } from '../constants/festivals';
import type { PrideEvent } from '../types/event';

function normalizePrideSeries(value: string): string {
  return value.trim().toLowerCase().replace(/\s+/g, ' ');
}

const STANDALONE_PRIDE_SERIES = 'no -- standalone event';

function prideSeriesEqualsOrExtends(label: string, series: string): boolean {
  const normalizedLabel = normalizePrideSeries(label);
  const normalizedSeries = normalizePrideSeries(series);
  if (normalizedLabel === normalizedSeries) return true;
  return normalizedLabel.startsWith(`${normalizedSeries},`);
}

function matchesPrideSeries(event: PrideEvent, allowedSeries: ReadonlySet<string>): boolean {
  const label = event.prideSeries?.trim();
  if (!label || isUntaggedPrideSeries(event)) return false;
  const normalizedLabel = normalizePrideSeries(label);
  for (const series of allowedSeries) {
    if (normalizedLabel === series) return true;
    if (normalizedLabel.startsWith(`${series},`)) return true;
  }
  return false;
}

export function eventMatchesPrideSeries(event: PrideEvent, series: string): boolean {
  const label = event.prideSeries?.trim();
  if (!label || isUntaggedPrideSeries(event)) return false;
  return prideSeriesEqualsOrExtends(label, series);
}

/** Empty Black Pride / Festival column, or "No -- standalone event". */
export function isUntaggedPrideSeries(event: PrideEvent): boolean {
  const label = event.prideSeries?.trim();
  if (!label) return true;
  return normalizePrideSeries(label) === STANDALONE_PRIDE_SERIES;
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
