/**
 * Decodes common HTML entities from CMS / legacy HTML (e.g. cheerio `.html()` fragments).
 * Safe for display text and URLs that incorrectly contain literal `&amp;`.
 */
export function decodeHtmlEntities(text: string): string {
  if (!text.includes('&')) return text;

  let out = text;
  for (let i = 0; i < 8; i++) {
    const next = out
      .replace(/&#x([0-9a-f]{1,6});/gi, (_, hex) => String.fromCodePoint(parseInt(hex, 16)))
      .replace(/&#([0-9]{1,7});/g, (_, dec) => String.fromCodePoint(parseInt(dec, 10)))
      .replace(/&nbsp;/gi, ' ')
      .replace(/&amp;/gi, '&')
      .replace(/&lt;/gi, '<')
      .replace(/&gt;/gi, '>')
      .replace(/&quot;/gi, '"')
      .replace(/&apos;/gi, "'");
    if (next === out) break;
    out = next;
  }
  return out.replace(/\u00a0/g, ' ');
}
