const BADGE_CLASS: Record<string, string> = {
  Workshop: 'b-workshop',
  'After Dark': 'b-afterdark',
  'Happy Hour': 'b-happyhour',
  'Day Party': 'b-party',
  Brunch: 'b-brunch',
  Ball: 'b-ball',
  Outdoors: 'b-outdoors',
  Meetup: 'b-meetup',
  Cultural: 'b-cultural',
  Wellness: 'b-wellness',
  Free: 'b-free',
};

export function badgeClassForLabel(label: string): string {
  return BADGE_CLASS[label] ?? 'b-workshop';
}
