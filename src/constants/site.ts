const DEFAULT_PUBLIC_SITE_ORIGIN = 'https://softqueerwealth.com';

/** Canonical origin for shared itinerary links (not the Cloudflare preview URL). */
export const PUBLIC_SITE_ORIGIN = (
  import.meta.env.VITE_PUBLIC_SITE_ORIGIN?.trim() || DEFAULT_PUBLIC_SITE_ORIGIN
).replace(/\/$/, '');
