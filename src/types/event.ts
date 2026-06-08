export enum EventDay {
  Monday = 'monday',
  Tuesday = 'tuesday',
  Wednesday = 'wednesday',
  Thursday = 'thursday',
  Friday = 'friday',
  Saturday = 'saturday',
  Sunday = 'sunday',
}

export enum EventType {
  AfterDark = 'after-dark',
  DayParty = 'day-party',
  Brunch = 'brunch',
  HappyHour = 'happy-hour',
  Workshop = 'workshop',
  Outdoors = 'outdoors',
  Ball = 'ball',
  Meetup = 'meetup',
  Cultural = 'cultural',
  Wellness = 'wellness',
}

export enum EventVibe {
  Flirt = 'flirt',
  AssShaking = 'ass shaking',
  Groove = 'groove',
  Chill = 'chill',
  Community = 'community',
  GrownAndSexy = 'grown & sexy',
  OpenBar = 'open bar',
  Food = 'food',
  Games = 'games',
  Dating = 'dating',
  Wellness = 'wellness',
  Networking = 'networking',
  Creative = 'creative',
  Cultural = 'cultural',
  ThirtyPlus = '30+',
}

export enum CtaButtonClass {
  Primary = 'btn-p',
  Free = 'btn-free',
  Waitlist = 'btn-w',
}

export type DayId = `${EventDay}`;
export type EventTypeId = `${EventType}`;
export type EventVibeId = `${EventVibe}`;
export type CtaButtonClassId = `${CtaButtonClass}`;

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
  ctaButtonClass: CtaButtonClassId | `btn-${string}`;
  /** tp-* class for left accent bar */
  cardClass: `tp-${string}`;
  /** Shown under the ticket CTA when set (e.g. promo code from the sheet). */
  discountCode?: string;
}
