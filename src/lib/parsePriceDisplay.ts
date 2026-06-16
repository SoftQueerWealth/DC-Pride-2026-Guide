import { decodeHtmlEntities } from './decodeHtmlEntities';

/** Placeholder cells (e.g. "Pending", checkbox FALSE) should not render as price. */
export function shouldHidePriceCell(raw: string): boolean {
  const normalized = decodeHtmlEntities(raw).trim().toLowerCase();
  if (!normalized || normalized === 'nan') return true;
  if (normalized === 'true' || normalized === 'false') return true;
  if (/\bpending\b/i.test(normalized)) return true;
  if (['none', 'no', 'n/a', 'na', '-'].includes(normalized)) return true;
  return false;
}

const FREE_PRICE_TOKENS = new Set([
  'free',
  '$0',
  '0',
  'no cover',
  'no charge',
  'complimentary',
  'donation',
  'donation only',
  'pay what you can',
  'pwyc',
]);

function isZeroPrice(raw: string): boolean {
  const normalized = decodeHtmlEntities(raw).trim().toLowerCase();
  return normalized === '0' || normalized === '$0' || normalized === '0.00' || normalized === '$0.00';
}

/** Whether a sheet price cell indicates a free event. */
export function priceIndicatesFree(raw: string): boolean {
  const normalized = decodeHtmlEntities(raw).trim().toLowerCase();
  if (!normalized || shouldHidePriceCell(raw)) return false;
  if (FREE_PRICE_TOKENS.has(normalized)) return true;
  if (/^\$0(\.00)?$/.test(normalized)) return true;
  return false;
}

/** Returns a display-ready non-zero price, or undefined when the cell should be skipped. */
export function normalizePriceValue(raw: string): string | undefined {
  const trimmed = decodeHtmlEntities(raw).trim();
  if (!trimmed || shouldHidePriceCell(trimmed)) return undefined;
  if (isZeroPrice(trimmed)) return undefined;
  if (priceIndicatesFree(trimmed)) return undefined;

  if (/^\d+(\.\d{1,2})?$/.test(trimmed)) return `$${trimmed}`;
  return trimmed;
}

/**
 * Returns a display-ready price string for event cards, or undefined when nothing should show.
 */
export function formatPriceDisplay(raw: string, free: boolean): string | undefined {
  const trimmed = decodeHtmlEntities(raw).trim();

  if (trimmed && !shouldHidePriceCell(trimmed)) {
    if (priceIndicatesFree(trimmed)) return 'Free';
    const normalized = normalizePriceValue(trimmed);
    if (normalized) return normalized;
  }

  if (free) return 'Free';
  return undefined;
}

/**
 * Builds a display string from general ticket price (early bird omitted for now).
 * Zero values (0, $0) are omitted. Falls back to a generic price column when needed.
 */
export function formatTicketPriceDisplay(
  _earlyBirdRaw: string,
  generalRaw: string,
  fallbackRaw: string,
  free: boolean,
): string | undefined {
  const general = normalizePriceValue(generalRaw);
  if (general) return general;

  const fallback = formatPriceDisplay(fallbackRaw, false);
  if (fallback && fallback !== 'Free') return fallback;

  if (free) return 'Free';
  return undefined;
}
