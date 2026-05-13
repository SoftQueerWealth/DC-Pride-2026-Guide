export type DayId =
  | 'wednesday'
  | 'thursday'
  | 'friday'
  | 'saturday'
  | 'sunday'
  | 'monday';

export interface PrideEvent {
  id: string;
  day: DayId;
  dayLabel: string;
  name: string;
  organizer?: string;
  types: string[];
  /** Normalized lowercase string from `data-vibes` (multi-word tokens preserved). */
  vibesRaw: string;
  free: boolean;
  badges: string[];
  time: string;
  location: string;
  vibeTags: string[];
  ctaHref: string;
  ctaLabel: string;
  /** e.g. btn-p, btn-free, btn-w */
  ctaButtonClass: string;
  /** tp-* class for left accent bar */
  cardClass: string;
}
