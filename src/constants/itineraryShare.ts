import { cityDisplayLabel } from './cities';
import type { PrideEvent } from '../types/event';

export const ITINERARY_SHARE_LINK_LABEL = 'View itinerary in the guide:';
export const ITINERARY_SHARE_FOOTER = 'Built by SoftQueerWealth 🖤';

export function itineraryShareOpener(events: PrideEvent[]): string {
  const cities = [
    ...new Set(events.map((event) => event.city).filter((city): city is string => Boolean(city))),
  ];

  if (cities.length === 1) {
    return `Here's my ${cityDisplayLabel(cities[0])} queer social events itinerary`;
  }

  return "Here's my queer social events itinerary";
}
