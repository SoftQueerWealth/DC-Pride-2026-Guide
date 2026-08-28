export const CITY_ORDER = ['dc', 'nyc', 'baltimore', 'dmv', 'atlanta'] as const;

export type MainCityKey = (typeof CITY_ORDER)[number];
export type CityKey = MainCityKey | 'chicago' | 'paris';

const SHEET_CITY_MAP: Record<string, CityKey> = {
  dc: 'dc',
  dmv: 'dmv',
  nyc: 'nyc',
  newyork: 'nyc',
  baltimore: 'baltimore',
  atlanta: 'atlanta',
  atl: 'atlanta',
  chicago: 'chicago',
  thechi: 'chicago',
  chi: 'chicago',
  paris: 'paris',
};

const CITY_LABELS: Record<CityKey, string> = {
  dc: 'DC',
  nyc: 'New York',
  baltimore: 'Baltimore',
  dmv: 'DMV',
  atlanta: 'Atlanta',
  chicago: 'Chicago',
  paris: 'Paris',
};

export function normalizeSheetCity(raw: string): CityKey | null {
  const key = raw.trim().toLowerCase().replace(/[^a-z0-9]/g, '');
  return SHEET_CITY_MAP[key] ?? null;
}

export function cityDisplayLabel(key: string): string {
  return CITY_LABELS[key as CityKey] ?? key;
}

export type CityFilterOption = { value: string; label: string };

export const cityFilterOptions: CityFilterOption[] = CITY_ORDER.map((key) => ({
  value: key,
  label: CITY_LABELS[key],
}));

export function cityFilterOptionsForKeys(keys: Iterable<string>): CityFilterOption[] {
  const present = new Set([...keys].filter(Boolean));
  const ordered = [
    ...CITY_ORDER.filter((key) => present.has(key)),
    ...[...present].filter((key) => !CITY_ORDER.includes(key as MainCityKey)),
  ];
  return ordered.map((key) => ({
    value: key,
    label: cityDisplayLabel(key),
  }));
}
