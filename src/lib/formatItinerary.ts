import type { PrideEvent } from '../types/event';
import { buildItineraryUrl } from './parseItineraryParam';

const SHARE_LABEL = 'View my shared itinerary';

export function formatItineraryShare(
  events: PrideEvent[],
  selectedIds: ReadonlySet<string>,
  origin: string,
): { url: string; text: string } | null {
  if (selectedIds.size === 0) return null;

  const hasValidSelection = events.some((e) => selectedIds.has(e.id));
  if (!hasValidSelection) return null;

  const url = buildItineraryUrl(origin, selectedIds);
  return { url, text: `${SHARE_LABEL}\n${url}` };
}
