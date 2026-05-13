/** Maps Google Maps search URL for a free-text address / venue line. */
export function mapsSearchUrl(query: string): string {
  const q = encodeURIComponent(query);
  return `https://www.google.com/maps/search/?api=1&query=${q}`;
}

export function isMappableLocation(location: string): boolean {
  const t = location.trim();
  if (!t) return false;
  return !/^see ticket link for address/i.test(t);
}
