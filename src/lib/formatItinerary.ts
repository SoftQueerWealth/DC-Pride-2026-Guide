import type { PrideEvent } from '../types/event';
import { buildItineraryUrl } from './parseItineraryParam';

export function formatItineraryShare(
  events: PrideEvent[],
  selectedIds: ReadonlySet<string>,
  origin: string,
): { url: string } | null {
  if (selectedIds.size === 0) return null;

  const hasValidSelection = events.some((e) => selectedIds.has(e.id));
  if (!hasValidSelection) return null;

  return { url: buildItineraryUrl(origin, selectedIds) };
}
