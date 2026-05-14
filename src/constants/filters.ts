import { EventDay, EventType, EventVibe, type DayId, type EventTypeId, type EventVibeId } from '../types/event';

export enum FilterKind {
  Day = 'day',
  Type = 'type',
  Vibe = 'vibe',
  Free = 'free',
}

export type FilterPillValue = DayId | EventTypeId | EventVibeId | 'true' | string;

export interface FilterPillDef<TKind extends string = string> {
  kind: TKind;
  value: FilterPillValue;
  label: string;
  /** When true, use .free-pill.active styling */
  freePill?: boolean;
}

export interface FilterSectionDef<TKind extends string = string> {
  label: string;
  pills: FilterPillDef<TKind>[];
}

export const FILTER_SECTIONS: FilterSectionDef<FilterKind>[] = [
  {
    label: 'Day',
    pills: [
      { kind: FilterKind.Day, value: EventDay.Wednesday, label: 'Wed' },
      { kind: FilterKind.Day, value: EventDay.Thursday, label: 'Thu' },
      { kind: FilterKind.Day, value: EventDay.Friday, label: 'Fri' },
      { kind: FilterKind.Day, value: EventDay.Saturday, label: 'Sat' },
      { kind: FilterKind.Day, value: EventDay.Sunday, label: 'Sun' },
      { kind: FilterKind.Day, value: EventDay.Monday, label: 'Mon' },
    ],
  },
  {
    label: 'Venue Type',
    pills: [
      { kind: FilterKind.Type, value: EventType.AfterDark, label: 'After Dark' },
      { kind: FilterKind.Type, value: EventType.DayParty, label: 'Day Party' },
      { kind: FilterKind.Type, value: EventType.Brunch, label: 'Brunch' },
      { kind: FilterKind.Type, value: EventType.HappyHour, label: 'Happy Hour' },
      { kind: FilterKind.Type, value: EventType.Workshop, label: 'Workshop' },
      { kind: FilterKind.Type, value: EventType.Outdoors, label: 'Outdoors' },
      { kind: FilterKind.Type, value: EventType.Ball, label: 'Ball' },
      { kind: FilterKind.Type, value: EventType.Meetup, label: 'Meetup' },
      { kind: FilterKind.Type, value: EventType.Cultural, label: 'Cultural' },
    ],
  },
  {
    label: 'Vibes',
    pills: [
      { kind: FilterKind.Vibe, value: EventVibe.Flirt, label: 'Flirt' },
      { kind: FilterKind.Vibe, value: EventVibe.AssShaking, label: 'Ass Shaking' },
      { kind: FilterKind.Vibe, value: EventVibe.Groove, label: 'Groove' },
      { kind: FilterKind.Vibe, value: EventVibe.Chill, label: 'Chill' },
      { kind: FilterKind.Vibe, value: EventVibe.Community, label: 'Community' },
      { kind: FilterKind.Vibe, value: EventVibe.GrownAndSexy, label: 'Grown & Sexy' },
      { kind: FilterKind.Vibe, value: EventVibe.OpenBar, label: 'Open Bar' },
      { kind: FilterKind.Vibe, value: EventVibe.Food, label: 'Food' },
      { kind: FilterKind.Vibe, value: EventVibe.Games, label: 'Games' },
      { kind: FilterKind.Vibe, value: EventVibe.Dating, label: 'Dating' },
      { kind: FilterKind.Vibe, value: EventVibe.Wellness, label: 'Wellness' },
      { kind: FilterKind.Vibe, value: EventVibe.Networking, label: 'Networking' },
      { kind: FilterKind.Vibe, value: EventVibe.Creative, label: 'Creative' },
      { kind: FilterKind.Vibe, value: EventVibe.Cultural, label: 'Cultural' },
      { kind: FilterKind.Vibe, value: EventVibe.ThirtyPlus, label: '30+' },
    ],
  },
  {
    label: 'Price',
    pills: [{ kind: FilterKind.Free, value: 'true', label: '🎟️ Free Events Only', freePill: true }],
  },
];
