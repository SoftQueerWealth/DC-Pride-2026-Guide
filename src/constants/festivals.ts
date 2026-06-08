export interface PrideFestival {
  id: string;
  tabLabel: string;
  dateRange: string;
  location: string;
  enabled: boolean;
}

export const PRIDE_FESTIVALS: PrideFestival[] = [
  {
    id: 'baltimore-pride',
    tabLabel: 'Baltimore Pride',
    dateRange: 'June 8 – 14, 2026',
    location: 'Baltimore, MD',
    enabled: true,
  },
  {
    id: 'capital-pride',
    tabLabel: 'Capital Pride',
    dateRange: 'June 2026',
    location: 'Washington, DC',
    enabled: false,
  },
];

export const DEFAULT_FESTIVAL_ID = 'baltimore-pride';

export const ENABLED_FESTIVALS = PRIDE_FESTIVALS.filter((festival) => festival.enabled);

export function festivalById(id: string): PrideFestival | undefined {
  return PRIDE_FESTIVALS.find((festival) => festival.id === id);
}
