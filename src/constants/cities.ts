export const CITY_ORDER = ['dc', 'nyc', 'baltimore', 'dmv'] as const;

export type CityKey = (typeof CITY_ORDER)[number];

const SHEET_CITY_MAP: Record<string, CityKey> = {
  dc: 'dc',
  dmv: 'dmv',
  nyc: 'nyc',
  newyork: 'nyc',
  baltimore: 'baltimore',
};

const CITY_LABELS: Record<CityKey, string> = {
  dc: 'DC',
  nyc: 'New York',
  baltimore: 'Baltimore',
  dmv: 'DMV',
};

export function normalizeSheetCity(raw: string): CityKey | null {
  const key = raw.trim().toLowerCase().replace(/[^a-z0-9]/g, '');
  return SHEET_CITY_MAP[key] ?? null;
}

export function cityDisplayLabel(key: string): string {
  return CITY_LABELS[key as CityKey] ?? key;
}

export const cityFilterOptions: { value: CityKey; label: string }[] = CITY_ORDER.map((key) => ({
  value: key,
  label: CITY_LABELS[key],
}));
