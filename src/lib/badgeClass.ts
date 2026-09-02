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
  Black: 'b-cultural',
  Sapphic: 'b-party',
  'Trans/GNC': 'b-workshop',
  POC: 'b-meetup',
  Queer: 'b-afterdark',
  'Queer-friendly': 'b-happyhour',
  MLM: 'b-ball',
  '30+': 'b-outdoors',
  ENM: 'b-brunch',
  Kink: 'b-afterdark',
  Masc: 'b-meetup',
  'Youth/Family': 'b-wellness',
};

export function badgeClassForLabel(label: string): string {
  return BADGE_CLASS[label] ?? 'b-workshop';
}
