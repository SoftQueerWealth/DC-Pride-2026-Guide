/** Moderate-resolution Google CDN URL for modal display. */
export function flyerModalUrl(flyerUrl: string): string {
  const trimmed = flyerUrl.trim();
  const lh3Base = trimmed.match(/^(https:\/\/lh3\.googleusercontent\.com\/d\/[^=]+)=/i);
  if (lh3Base) {
    return `${lh3Base[1]}=w480`;
  }
  return trimmed;
}
