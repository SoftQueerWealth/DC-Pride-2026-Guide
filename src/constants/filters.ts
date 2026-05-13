export type FilterKind = 'day' | 'type' | 'vibe' | 'free';

export interface FilterPillDef {
  kind: FilterKind;
  value: string;
  label: string;
  /** When true, use .free-pill.active styling */
  freePill?: boolean;
}

export const FILTER_SECTIONS: { label: string; pills: FilterPillDef[] }[] = [
  {
    label: 'Day',
    pills: [
      { kind: 'day', value: 'wednesday', label: 'Wed' },
      { kind: 'day', value: 'thursday', label: 'Thu' },
      { kind: 'day', value: 'friday', label: 'Fri' },
      { kind: 'day', value: 'saturday', label: 'Sat' },
      { kind: 'day', value: 'sunday', label: 'Sun' },
      { kind: 'day', value: 'monday', label: 'Mon' },
    ],
  },
  {
    label: 'Venue Type',
    pills: [
      { kind: 'type', value: 'after-dark', label: 'After Dark' },
      { kind: 'type', value: 'day-party', label: 'Day Party' },
      { kind: 'type', value: 'brunch', label: 'Brunch' },
      { kind: 'type', value: 'happy-hour', label: 'Happy Hour' },
      { kind: 'type', value: 'workshop', label: 'Workshop' },
      { kind: 'type', value: 'outdoors', label: 'Outdoors' },
      { kind: 'type', value: 'ball', label: 'Ball' },
      { kind: 'type', value: 'meetup', label: 'Meetup' },
      { kind: 'type', value: 'cultural', label: 'Cultural' },
    ],
  },
  {
    label: 'Vibes',
    pills: [
      { kind: 'vibe', value: 'flirt', label: 'Flirt' },
      { kind: 'vibe', value: 'ass shaking', label: 'Ass Shaking' },
      { kind: 'vibe', value: 'groove', label: 'Groove' },
      { kind: 'vibe', value: 'chill', label: 'Chill' },
      { kind: 'vibe', value: 'community', label: 'Community' },
      { kind: 'vibe', value: 'grown & sexy', label: 'Grown & Sexy' },
      { kind: 'vibe', value: 'open bar', label: 'Open Bar' },
      { kind: 'vibe', value: 'food', label: 'Food' },
      { kind: 'vibe', value: 'games', label: 'Games' },
      { kind: 'vibe', value: 'dating', label: 'Dating' },
      { kind: 'vibe', value: 'wellness', label: 'Wellness' },
      { kind: 'vibe', value: 'networking', label: 'Networking' },
      { kind: 'vibe', value: 'creative', label: 'Creative' },
      { kind: 'vibe', value: 'cultural', label: 'Cultural' },
      { kind: 'vibe', value: '30+', label: '30+' },
    ],
  },
  {
    label: 'Price',
    pills: [{ kind: 'free', value: 'true', label: '🎟️ Free Events Only', freePill: true }],
  },
];
