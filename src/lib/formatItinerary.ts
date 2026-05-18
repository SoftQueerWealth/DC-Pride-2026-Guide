import { DAY_ORDER } from '../constants/days';
import type { PrideEvent } from '../types/event';
import { buildItineraryUrl } from './parseItineraryParam';

function sortEvents(events: PrideEvent[]): PrideEvent[] {
  const dayIndex = new Map(DAY_ORDER.map((d, i) => [d, i]));
  return [...events].sort((a, b) => {
    const dayDiff = (dayIndex.get(a.day) ?? 0) - (dayIndex.get(b.day) ?? 0);
    if (dayDiff !== 0) return dayDiff;
    return a.name.localeCompare(b.name);
  });
}

function formatEventBlock(event: PrideEvent): string {
  const lines = [`• ${event.name}`, `  ${event.time} · ${event.location}`];
  if (event.ctaHref?.trim()) lines.push(`  ${event.ctaHref.trim()}`);
  return lines.join('\n');
}

export function formatItineraryShare(
  events: PrideEvent[],
  selectedIds: ReadonlySet<string>,
  origin: string,
): { text: string; url: string } | null {
  if (selectedIds.size === 0) return null;

  const selected = sortEvents(events.filter((e) => selectedIds.has(e.id)));
  if (selected.length === 0) return null;

  const url = buildItineraryUrl(origin, selectedIds);
  const sections: string[] = ['My DC Black Pride Weekend', ''];

  let currentDay = '';
  for (const event of selected) {
    if (event.dayLabel !== currentDay) {
      currentDay = event.dayLabel;
      sections.push(currentDay);
    }
    sections.push(formatEventBlock(event));
    sections.push('');
  }

  sections.push(`View shared itinerary: ${url}`);
  return { text: sections.join('\n').trimEnd(), url };
}
