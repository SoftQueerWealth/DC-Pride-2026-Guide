import { decodeHtmlEntities } from './decodeHtmlEntities';

export type ParsedDiscount =
  | { kind: 'code'; code: string; expiresSuffix?: string }
  | { kind: 'tip'; text: string };

const LEADING_EMOJI = /^\s*(?:🏷️|💡)\s*/u;

/** Placeholder cells (e.g. "Pending", checkbox FALSE) should not render under the ticket button. */
export function shouldHideDiscountCode(raw: string): boolean {
  const normalized = decodeHtmlEntities(raw).trim().toLowerCase();
  if (!normalized || normalized === 'nan') return true;
  if (normalized === 'true' || normalized === 'false') return true;
  if (/\bpending\b/i.test(normalized)) return true;
  if (['none', 'no', 'n/a', 'na', '-'].includes(normalized)) return true;
  return false;
}

export function hasVisibleDiscountCode(discountCode?: string): boolean {
  return Boolean(discountCode?.trim() && !shouldHideDiscountCode(discountCode));
}

function looksLikeBareCodeToken(value: string): boolean {
  if (/^(true|false)$/i.test(value)) return false;
  if (!/^[A-Za-z0-9._-]+$/.test(value) || value.length < 3 || value.length > 48) return false;
  if (/\d/.test(value)) return true;
  if (/[._-]/.test(value)) return true;
  if (value === value.toUpperCase() && /[A-Z]/.test(value)) return true;
  if (value.length >= 8) return true;
  if (value !== value.toLowerCase() && value !== value.toUpperCase()) return true;
  return false;
}

/**
 * Parses bundled / sheet discount strings into structured display.
 * Recognizes lines like "🏷️ Code: SAVE10" or "Code: SAVE · expires 5/20".
 */
export function parseDiscountDisplay(raw: string): ParsedDiscount {
  const trimmed = decodeHtmlEntities(raw).trim();
  const stripped = trimmed.replace(LEADING_EMOJI, '').trim();

  const codeMatch = /^code:\s*(.+)$/i.exec(stripped);
  if (codeMatch) {
    const rest = codeMatch[1].trim();
    const expiresMatch = /^(.+?)(\s*·\s*expires\s+.+)$/i.exec(rest);
    if (expiresMatch) {
      return {
        kind: 'code',
        code: expiresMatch[1].trim(),
        expiresSuffix: expiresMatch[2].trim(),
      };
    }
    return { kind: 'code', code: rest };
  }

  // Sheet cell is often just the code (e.g. "SoftQueerWealthXBliss") with no "Code:" prefix
  if (looksLikeBareCodeToken(stripped)) {
    return { kind: 'code', code: stripped };
  }

  return { kind: 'tip', text: stripped || trimmed };
}
