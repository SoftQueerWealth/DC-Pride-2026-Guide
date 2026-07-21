export type PlaceholderTone = 'dark' | 'rose' | 'sage';

export type TrendingWeekend = {
  when: string;
  title: string;
  meta: string;
  tone: PlaceholderTone;
};

export type HomeSpotlight = {
  label: string;
  title: string;
  body: string;
  tone: PlaceholderTone;
  room: 'reading' | 'community';
  enterExhibition?: boolean;
};

export type ExplorePill = {
  label: string;
  room: 'neighborhood' | 'community';
};

export const HERO_FRAMES: { label: string; tone: PlaceholderTone }[] = [
  { label: 'Nightlife & dancing', tone: 'dark' },
  { label: 'Travel & joy', tone: 'rose' },
  { label: 'Friendship & community', tone: 'sage' },
];

export const HOME_SPOTLIGHTS: HomeSpotlight[] = [
  {
    label: 'Issue No. 001',
    title: 'STATIC — Queer Trans Fashion Show',
    body: 'Issue No. 001 · DC · July 2026. Step inside the exhibition floor →',
    tone: 'dark',
    room: 'reading',
    enterExhibition: true,
  },
  {
    label: 'Softie of the Month',
    title: 'Kai V. — Visual Artist, Washington DC',
    body: 'Every month we spotlight a Black queer creative — their work, their story, and how they show up for the community.',
    tone: 'rose',
    room: 'reading',
  },
  {
    label: 'Business spotlight',
    title: 'Acu With Naja',
    body: 'Holistic healing & wellness in DC — a Community Headliner.',
    tone: 'sage',
    room: 'community',
  },
];

export const TRENDING_WEEKENDS: TrendingWeekend[] = [
  {
    when: 'CHICAGO · JUL',
    title: 'WNBA All-Star Weekend',
    meta: 'Cousins Camp & more →',
    tone: 'dark',
  },
  {
    when: 'NYC · AUG',
    title: 'Queer Caribbean Festival',
    meta: 'Carnival season, queered →',
    tone: 'rose',
  },
  {
    when: 'ATLANTA · SEP',
    title: 'Atlanta Black Pride',
    meta: 'A milestone weekend →',
    tone: 'sage',
  },
  {
    when: 'BALTIMORE · OCT',
    title: 'Baltimore Black Pride',
    meta: 'Details dropping soon →',
    tone: 'dark',
  },
];

export const EXPLORE_PILLS: ExplorePill[] = [
  { label: '✨ By Vibe / Energy', room: 'neighborhood' },
  { label: '🧭 Weekend Guides', room: 'neighborhood' },
  { label: '📍 By Neighborhood', room: 'neighborhood' },
  { label: '🎟️ Free Events', room: 'neighborhood' },
  { label: '💳 Community Perks', room: 'community' },
  { label: '🔗 Share Itinerary', room: 'neighborhood' },
];

export const FOOTER_BAND = 'Softness is resistance. Joy is revolutionary. ♡';
export const FOOTER_COPY =
  '© 2026 Soft Queer Wealth — a home for Black queer creatives, culture, and community.';
