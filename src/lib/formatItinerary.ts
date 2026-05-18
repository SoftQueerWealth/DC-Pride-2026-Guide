import {
  ITINERARY_SHARE_FOOTER,
  ITINERARY_SHARE_LINK_LABEL,
  ITINERARY_SHARE_OPENER,
} from '../constants/itineraryShare';
import type { PrideEvent } from '../types/event';
import { groupItineraryEventsByDay } from './groupItineraryEvents';
import { buildItineraryUrl } from './parseItineraryParam';

function formatEventLine(event: PrideEvent): string {
  return `• ${event.name} — ${event.time}`;
}

export function formatItineraryShare(
  events: PrideEvent[],
  selectedIds: ReadonlySet<string>,
  origin: string,
): { url: string; text: string } | null {
  if (selectedIds.size === 0) return null;

  const selected = events.filter((e) => selectedIds.has(e.id));
  if (selected.length === 0) return null;

  const url = buildItineraryUrl(origin, selectedIds);
  const sections: string[] = [ITINERARY_SHARE_OPENER, ''];

  for (const { dayLabel, events: dayEvents } of groupItineraryEventsByDay(selected)) {
    sections.push(dayLabel);
    for (const event of dayEvents) {
      sections.push(formatEventLine(event));
    }
    sections.push('');
  }

  sections.push(ITINERARY_SHARE_LINK_LABEL, url, '', ITINERARY_SHARE_FOOTER);

  return { url, text: sections.join('\n').trimEnd() };
}
