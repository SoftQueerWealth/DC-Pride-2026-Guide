const LOCATION_SEPARATOR = ' · ';

/** Split "Venue · Address" lines from the sheet into display parts. */
export function splitLocationParts(location: string): { venue: string | null; address: string | null } {
  const trimmed = location.trim();
  if (!trimmed) return { venue: null, address: null };

  const separatorIndex = trimmed.indexOf(LOCATION_SEPARATOR);
  if (separatorIndex === -1) {
    return { venue: null, address: trimmed.replace(/\s*\n\s*/g, ', ') };
  }

  const venue = trimmed.slice(0, separatorIndex).trim();
  const address = trimmed
    .slice(separatorIndex + LOCATION_SEPARATOR.length)
    .trim()
    .replace(/\s*\n\s*/g, ', ');

  return {
    venue: venue || null,
    address: address || null,
  };
}

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
