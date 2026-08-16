import type { CityKey } from './cities';

export type FestivalGrouping = 'weekday' | 'calendar';

/** Sheet value in Black Pride / Festival for The Collective takeover tab. */
export const COLLECTIVE_PRIDE_SERIES = 'The Collective: NYC Black Pride';

export interface PrideFestival {
  id: string;
  tabLabel: string;
  dateRange: string;
  location: string;
  sheetName: string;
  spreadsheetId?: string;
  grouping: FestivalGrouping;
  enabled: boolean;
  cityInclude?: CityKey[];
  cityExclude?: CityKey[];
  /** Keep only rows whose Black Pride / Festival column matches. */
  prideSeriesInclude?: string[];
  /** Drop rows whose Black Pride / Festival column matches. */
  prideSeriesExclude?: string[];
}

export const PRIDE_FESTIVALS: PrideFestival[] = [
  {
    id: 'baltimore-pride',
    tabLabel: 'Baltimore Pride',
    dateRange: 'June 8 – 14, 2026',
    location: 'Baltimore, MD',
    sheetName: 'Baltimore Pride Master',
    grouping: 'weekday',
    enabled: false,
  },
  {
    id: 'capital-pride',
    tabLabel: 'Capital Pride',
    dateRange: 'June 2026',
    location: 'Washington, DC',
    sheetName: 'Capital Pride Master',
    grouping: 'calendar',
    enabled: false,
  },
  {
    id: 'june-2026',
    tabLabel: 'DC Events',
    dateRange: 'June 2026',
    location: 'Washington, DC',
    sheetName: 'June Events',
    spreadsheetId: '1DPgR56Fl7Y47x1ILoa9ek-2eg7AL6RbcHuX_h-Pu3nY',
    grouping: 'calendar',
    enabled: false,
  },
  {
    id: 'nyc-pride',
    tabLabel: 'NYC Pride',
    dateRange: 'June 2026',
    location: 'New York, NY',
    sheetName: 'NYC Pride Master',
    spreadsheetId: '15qGvOIUMxTFy3ncvUW1z8XXT6Pz9iTbZ-MW4UhDmjiM',
    grouping: 'calendar',
    enabled: false,
  },
  {
    id: 'july-events',
    tabLabel: 'Events',
    dateRange: 'July 2026',
    location: 'DC · NYC · Baltimore · DMV',
    sheetName: 'July_Events',
    spreadsheetId: '1DPgR56Fl7Y47x1ILoa9ek-2eg7AL6RbcHuX_h-Pu3nY',
    grouping: 'calendar',
    enabled: false,
    cityExclude: ['chicago'],
  },
  {
    id: 'wnba-all-star-weekend',
    tabLabel: 'WNBA All-Star Weekend',
    dateRange: 'July 2026',
    location: 'Chicago',
    sheetName: 'July_Events',
    spreadsheetId: '1DPgR56Fl7Y47x1ILoa9ek-2eg7AL6RbcHuX_h-Pu3nY',
    grouping: 'calendar',
    enabled: false,
    cityInclude: ['chicago'],
  },
  {
    id: 'august-events',
    tabLabel: 'August Events',
    dateRange: 'August 2026',
    location: 'DC · NYC · Baltimore · DMV',
    sheetName: 'Filterable August Events',
    spreadsheetId: '1DPgR56Fl7Y47x1ILoa9ek-2eg7AL6RbcHuX_h-Pu3nY',
    grouping: 'calendar',
    enabled: true,
    prideSeriesExclude: [COLLECTIVE_PRIDE_SERIES],
  },
  {
    id: 'nyc-collective-black-queer-takeover',
    tabLabel: 'NYC: The Collective Black Queer Takeover',
    dateRange: 'August 2026',
    location: 'New York, NY',
    sheetName: 'Filterable August Events',
    spreadsheetId: '1DPgR56Fl7Y47x1ILoa9ek-2eg7AL6RbcHuX_h-Pu3nY',
    grouping: 'calendar',
    enabled: true,
    cityInclude: ['nyc'],
    prideSeriesInclude: [COLLECTIVE_PRIDE_SERIES],
  },
];

export const DEFAULT_FESTIVAL_ID = 'august-events';

export const ENABLED_FESTIVALS = PRIDE_FESTIVALS.filter((festival) => festival.enabled);

export function festivalById(id: string): PrideFestival | undefined {
  return PRIDE_FESTIVALS.find((festival) => festival.id === id);
}
