const ITINERARY_PARAM = 'itinerary';

export function parseItineraryParam(search: string, validEventIds: ReadonlySet<string>): Set<string> {
  const params = new URLSearchParams(search.startsWith('?') ? search.slice(1) : search);
  const raw = params.get(ITINERARY_PARAM);
  if (!raw?.trim()) return new Set();

  const ids = new Set<string>();
  for (const part of raw.split(',')) {
    const id = decodeURIComponent(part.trim());
    if (id && validEventIds.has(id)) ids.add(id);
  }
  return ids;
}

export function buildItineraryUrl(origin: string, eventIds: Iterable<string>): string {
  const ids = [...eventIds];
  if (ids.length === 0) return origin;
  const query = ids.map((id) => encodeURIComponent(id)).join(',');
  return `${origin.replace(/\/$/, '')}/?${ITINERARY_PARAM}=${query}`;
}

export function stripItineraryParamFromUrl(): void {
  if (typeof window === 'undefined') return;
  const url = new URL(window.location.href);
  if (!url.searchParams.has(ITINERARY_PARAM)) return;
  url.searchParams.delete(ITINERARY_PARAM);
  const next = url.pathname + (url.search || '') + url.hash;
  window.history.replaceState(null, '', next);
}
