import {
  CtaButtonClass,
  EventDay,
  EventType,
  EventVibe,
  type CtaButtonClassId,
  type DayId,
  type PrideEvent,
} from '../types/event';
import type { BeautyField, BeautyItem } from '../types/beauty';
import { decodeHtmlEntities } from '../lib/decodeHtmlEntities';
import { shouldHideDiscountCode } from '../lib/parseDiscountDisplay';

const EVENTS_SHEET_NAME = 'events';
const BEAUTY_SHEET_NAME = 'beauty';
const SHEETS_ID_PLACEHOLDER = 'YOUR_GOOGLE_SHEETS_ID_HERE';
const API_KEY_PLACEHOLDER = 'YOUR_GOOGLE_SHEETS_API_KEY_HERE';

const TYPE_LABELS = {
  [EventType.AfterDark]: 'After Dark',
  [EventType.DayParty]: 'Day Party',
  [EventType.Brunch]: 'Brunch',
  [EventType.HappyHour]: 'Happy Hour',
  [EventType.Workshop]: 'Workshop',
  [EventType.Outdoors]: 'Outdoors',
  [EventType.Ball]: 'Ball',
  [EventType.Meetup]: 'Meetup',
  [EventType.Cultural]: 'Cultural',
  [EventType.Wellness]: 'Wellness',
} satisfies Record<EventType, string>;

const VIBE_LABELS = {
  [EventVibe.Flirt]: 'Flirt',
  [EventVibe.AssShaking]: 'Ass Shaking',
  [EventVibe.Groove]: 'Groove',
  [EventVibe.Chill]: 'Chill',
  [EventVibe.Community]: 'Community',
  [EventVibe.GrownAndSexy]: 'Grown & Sexy',
  [EventVibe.OpenBar]: 'Open Bar',
  [EventVibe.Food]: 'Food',
  [EventVibe.Games]: 'Games',
  [EventVibe.Dating]: 'Dating',
  [EventVibe.Wellness]: 'Wellness',
  [EventVibe.Networking]: 'Networking',
  [EventVibe.Creative]: 'Creative',
  [EventVibe.Cultural]: 'Cultural',
  [EventVibe.ThirtyPlus]: '30+',
} satisfies Record<EventVibe, string>;

function labelForEventType(type: string): string | undefined {
  return TYPE_LABELS[type as EventType];
}

const TYPE_ALIASES: Record<string, EventType> = {
  afterdark: EventType.AfterDark,
  'after dark': EventType.AfterDark,
  [EventType.AfterDark]: EventType.AfterDark,
  dayparty: EventType.DayParty,
  'day party': EventType.DayParty,
  [EventType.DayParty]: EventType.DayParty,
  happyhour: EventType.HappyHour,
  'happy hour': EventType.HappyHour,
  [EventType.HappyHour]: EventType.HappyHour,
  [EventType.Brunch]: EventType.Brunch,
  [EventType.Workshop]: EventType.Workshop,
  [EventType.Outdoors]: EventType.Outdoors,
  outdoor: EventType.Outdoors,
  [EventType.Ball]: EventType.Ball,
  [EventType.Meetup]: EventType.Meetup,
  [EventType.Cultural]: EventType.Cultural,
  [EventType.Wellness]: EventType.Wellness,
};

const DAY_ALIASES: Record<string, DayId> = {
  wed: EventDay.Wednesday,
  [EventDay.Wednesday]: EventDay.Wednesday,
  thu: EventDay.Thursday,
  thurs: EventDay.Thursday,
  [EventDay.Thursday]: EventDay.Thursday,
  fri: EventDay.Friday,
  [EventDay.Friday]: EventDay.Friday,
  sat: EventDay.Saturday,
  [EventDay.Saturday]: EventDay.Saturday,
  sun: EventDay.Sunday,
  [EventDay.Sunday]: EventDay.Sunday,
  mon: EventDay.Monday,
  [EventDay.Monday]: EventDay.Monday,
};

enum TicketStatus {
  SoldOut = 'sold out',
  SoldOutCompact = 'soldout',
  RsvpFree = 'rsvp free',
  WaitlistOpen = 'waitlist open',
}

const COLUMN_ALIASES = {
  id: ['id', 'eventid'],
  day: ['dayofweek', 'weekday', 'eventday', 'dayid', 'dataday', 'data-day', 'day'],
  dayLabel: ['daylabel', 'dayname', 'displayday'],
  name: ['name', 'event', 'eventname', 'eventtitle', 'title'],
  organizer: ['organizer', 'eventorganizer', 'host', 'hosts', 'presenter'],
  types: ['types', 'type', 'venuetype', 'eventtypes', 'eventtype', 'datatypes', 'data-types', 'category', 'categories'],
  vibesRaw: ['vibesraw', 'vibes', 'vibestags', 'datavibes', 'data-vibes', 'vibe'],
  free: ['free', 'freetickets', 'isfree', 'datafree', 'data-free', 'price', 'cost'],
  badges: ['badges', 'eventbadges', 'badge', 'labels'],
  time: ['time', 'starttime', 'eventtime', 'event-time'],
  location: ['location', 'venuename', 'venue', 'venueaddress', 'address', 'eventlocation'],
  venueAddress: ['venueaddress', 'address'],
  vibeTags: ['vibestags', 'vibetags', 'vibesdisplay', 'displayvibes'],
  ticketStatus: ['ticketstatus', 'status', 'registrationstatus'],
  ctaHref: ['ctahref', 'href', 'url', 'link', 'ticketlink', 'tickets', 'eventlink', 'ctalink', 'iglink'],
  ctaLabel: ['ctalabel', 'buttonlabel', 'linklabel', 'actionlabel'],
  ctaButtonClass: ['ctabuttonclass', 'buttonclass', 'btnclass'],
  cardClass: ['cardclass', 'typeclass', 'accentclass'],
  discountCode: [
    'discountcode',
    'promocode',
    'promo',
    'coupon',
    'couponcode',
    'ticketcode',
  ],
} as const;

const BEAUTY_COLUMN_ALIASES = {
  businessName: ['businessname', 'business', 'brand', 'brandname', 'partner', 'partnername', 'name'],
  businessType: ['businesstype', 'businesscategory', 'category', 'type'],
  confirmedPartner: ['confirmedpartner', 'partnerconfirmed', 'confirmed', 'partnerstatus', 'status'],
  testDiscountCodeStatus: ['testdiscountcodestatus', 'testdiscountcode', 'discountcodestatus', 'codestatus'],
} as const;

const BEAUTY_INTERNAL_COLUMNS = new Set([
  'confirmedpartner',
  'partnerconfirmed',
  'confirmed',
  'partnerstatus',
  'status',
  'testdiscountcodestatus',
  'testdiscountcode',
  'discountcodestatus',
  'codestatus',
]);

const BEAUTY_PRIMARY_LINK_COLUMNS = ['website', 'url', 'link', 'booking', 'book', 'instagram', 'social'];

interface SheetsApiResponse {
  values?: string[][];
  error?: {
    message?: string;
  };
}

type ColumnKey = keyof typeof COLUMN_ALIASES;
type BeautyColumnKey = keyof typeof BEAUTY_COLUMN_ALIASES;

function envValue(key: 'VITE_GOOGLE_SHEETS_API_KEY' | 'VITE_GOOGLE_SHEETS_ID'): string {
  const fromProcess = typeof process !== 'undefined' ? process.env[key]?.trim() : '';
  if (fromProcess) return fromProcess;

  const metaEnv = import.meta.env as Record<string, string | undefined>;
  return metaEnv[key]?.trim() ?? '';
}

export function isGoogleSheetsConfigured(): boolean {
  const apiKey = envValue('VITE_GOOGLE_SHEETS_API_KEY');
  const spreadsheetId = envValue('VITE_GOOGLE_SHEETS_ID');
  return !isMissingApiKey(apiKey) && !isMissingSpreadsheetId(spreadsheetId);
}

function getApiKey(): string {
  return envValue('VITE_GOOGLE_SHEETS_API_KEY');
}

function getSpreadsheetId(): string {
  return envValue('VITE_GOOGLE_SHEETS_ID');
}

function isMissingApiKey(apiKey: string): boolean {
  return apiKey.length === 0 || apiKey === API_KEY_PLACEHOLDER;
}

function isMissingSpreadsheetId(spreadsheetId: string): boolean {
  return spreadsheetId.length === 0 || spreadsheetId === SHEETS_ID_PLACEHOLDER;
}

function normalizeHeader(value: string): string {
  return value.toLowerCase().replace(/[^a-z0-9]/g, '');
}

function normalizeToken(value: string): string {
  return value.toLowerCase().replace(/[_-]+/g, ' ').replace(/\s+/g, ' ').trim();
}

function splitListCell(value: string): string[] {
  return value
    .split(/[,;|\n]/)
    .map((item) => item.trim())
    .filter(Boolean);
}

function unique<T>(values: T[]): T[] {
  return [...new Set(values)];
}

function titleize(value: string): string {
  return value
    .replace(/[-_]+/g, ' ')
    .replace(/\s+/g, ' ')
    .trim()
    .replace(/\b\w/g, (char) => char.toUpperCase());
}

function slugify(value: string): string {
  return (
    value
      .toLowerCase()
      .replace(/[^a-z0-9]+/g, '-')
      .replace(/^-|-$/g, '')
      .slice(0, 80) || 'event'
  );
}

function cleanCellValue(value: unknown): string {
  const cell = String(value ?? '').trim();
  if (cell.toLowerCase() === 'nan') return '';
  return decodeHtmlEntities(cell);
}

function readCell(headers: string[], row: string[], key: ColumnKey): string {
  for (const alias of COLUMN_ALIASES[key]) {
    const index = headers.indexOf(normalizeHeader(alias));
    if (index < 0) continue;
    const value = cleanCellValue(row[index]);
    if (value) return value;
  }
  return '';
}

function readDayCell(headers: string[], row: string[]): string {
  for (const alias of COLUMN_ALIASES.day) {
    const index = headers.indexOf(normalizeHeader(alias));
    if (index < 0) continue;
    const value = cleanCellValue(row[index]);
    if (value) return value;
  }
  return '';
}

function readBeautyCell(headers: string[], row: string[], key: BeautyColumnKey): string {
  for (const alias of BEAUTY_COLUMN_ALIASES[key]) {
    const index = headers.indexOf(normalizeHeader(alias));
    if (index >= 0) return cleanCellValue(row[index]);
  }
  return '';
}

function beautyFieldHref(label: string, value: string): string | undefined {
  if (/^https?:\/\//i.test(value)) return value;
  if (/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value)) return `mailto:${value}`;

  const normalizedLabel = normalizeHeader(label);
  if (normalizedLabel.includes('instagram')) {
    const handle = value.replace(/^@/, '').trim();
    if (handle && !/\s/.test(handle)) return `https://www.instagram.com/${handle}`;
  }

  return undefined;
}

function isConfirmedPartner(value: string): boolean {
  const normalized = normalizeToken(value);
  return (
    normalized === 'yes' ||
    normalized === 'y' ||
    normalized === 'true' ||
    normalized === 'confirmed' ||
    normalized === 'confirmed partner' ||
    normalized === 'approved'
  );
}

function isPassingDiscountCodeStatus(value: string): boolean {
  const normalized = normalizeToken(value);
  return normalized === 'pass' || normalized === 'passed';
}

function isPrimaryBeautyLink(field: BeautyField): boolean {
  const normalizedLabel = normalizeHeader(field.label);
  return Boolean(field.href) && BEAUTY_PRIMARY_LINK_COLUMNS.some((column) => normalizedLabel.includes(column));
}

const CALENDAR_DAY_BY_DOW: Partial<Record<number, DayId>> = {
  0: EventDay.Sunday,
  1: EventDay.Monday,
  3: EventDay.Wednesday,
  4: EventDay.Thursday,
  5: EventDay.Friday,
  6: EventDay.Saturday,
};

function parseDayFromCalendarDate(value: string): DayId | null {
  const match = value.trim().match(/^(\d{1,2})\/(\d{1,2})\/(\d{2,4})$/);
  if (!match) return null;

  const month = Number(match[1]) - 1;
  const day = Number(match[2]);
  let year = Number(match[3]);
  if (year < 100) year += 2000;

  const date = new Date(year, month, day);
  if (Number.isNaN(date.getTime())) return null;

  return CALENDAR_DAY_BY_DOW[date.getDay()] ?? null;
}

function parseDay(value: string): DayId | null {
  const normalized = normalizeToken(value);
  const exact = DAY_ALIASES[normalized];
  if (exact) return exact;

  const padded = ` ${normalized} `;
  for (const [alias, day] of Object.entries(DAY_ALIASES)) {
    if (padded.includes(` ${alias} `)) return day;
  }

  return parseDayFromCalendarDate(value);
}

function dayLabelFor(day: DayId): string {
  return day.charAt(0).toUpperCase() + day.slice(1);
}

function normalizeType(value: string): string {
  const token = normalizeToken(value);
  return TYPE_ALIASES[token] ?? token.replace(/\s+/g, '-');
}

function parseTypes(value: string): string[] {
  if (!value) return [];

  const pieces = splitListCell(value);
  if (pieces.length > 1) {
    return unique(pieces.map(normalizeType).filter(Boolean));
  }

  const normalized = normalizeToken(value);
  const direct = TYPE_ALIASES[normalized];
  if (direct) return [direct];

  const found = Object.entries(TYPE_ALIASES)
    .filter(([alias]) => ` ${normalized} `.includes(` ${alias} `))
    .map(([, type]) => type);

  return unique(found.length > 0 ? found : [normalizeType(value)]);
}

function parseBoolean(value: string): boolean {
  const normalized = normalizeToken(value);
  return normalized === 'true' || normalized === 'yes' || normalized === 'y' || normalized === '1' || normalized === 'free' || normalized === '$0';
}

function isSoldOutStatus(value: string): boolean {
  const normalized = normalizeToken(value);
  return normalized === TicketStatus.SoldOut || normalized === TicketStatus.SoldOutCompact;
}

function isRsvpFreeStatus(value: string): boolean {
  const normalized = normalizeToken(value);
  return normalized === TicketStatus.RsvpFree;
}

function ctaLabelForTicketStatus(value: string): string | null {
  const normalized = normalizeToken(value);
  if (normalized === TicketStatus.RsvpFree) return 'RSVP Free';
  if (normalized === TicketStatus.WaitlistOpen) return 'Join Waitlist';
  return null;
}

function ctaButtonClassForTicketStatus(value: string, free: boolean): CtaButtonClassId {
  if (normalizeToken(value) === TicketStatus.WaitlistOpen) return CtaButtonClass.Waitlist;
  return free ? CtaButtonClass.Free : CtaButtonClass.Primary;
}

function parseBadges(value: string, types: string[], free: boolean): string[] {
  const directBadges = splitListCell(value);
  const badges =
    directBadges.length > 1
      ? directBadges
      : Object.values(TYPE_LABELS).filter((label) => {
          const normalized = normalizeHeader(value);
          return normalized.includes(normalizeHeader(label));
        });

  const derived = badges.length > 0 ? badges : types.map((type) => labelForEventType(type) ?? titleize(type));
  if (free && !derived.some((badge) => normalizeHeader(badge) === 'free')) {
    derived.push('Free');
  }
  return unique(derived);
}

function parseVibesRaw(vibesRaw: string, vibeTags: string): string {
  const raw = vibesRaw || vibeTags;
  return raw.toLowerCase().replace(/[,;|\n]+/g, ' ').replace(/\s+/g, ' ').trim();
}

function parseVibeTags(vibesRaw: string, vibeTags: string): string[] {
  if (/[,;|\n]/.test(vibeTags)) return unique(splitListCell(vibeTags));

  const normalized = parseVibesRaw(vibesRaw, vibeTags);
  const matches = Object.entries(VIBE_LABELS)
    .map(([vibe, label]) => ({ index: ` ${normalized} `.indexOf(` ${vibe} `), label }))
    .filter(({ index }) => index >= 0)
    .sort((a, b) => a.index - b.index)
    .map(({ label }) => label);

  return unique(matches.length > 0 ? matches : splitListCell(vibesRaw).map(titleize));
}

function normalizeClass<TPrefix extends string>(
  value: string,
  prefix: TPrefix,
  fallback: `${TPrefix}${string}`,
): `${TPrefix}${string}` {
  const classes = value.split(/\s+/).map((item) => item.trim()).filter(Boolean);
  const matching = classes.find((item): item is `${TPrefix}${string}` => item.startsWith(prefix));
  return matching ?? fallback;
}

function readLocation(headers: string[], row: string[]): string {
  const location = readCell(headers, row, 'location');
  const address = readCell(headers, row, 'venueAddress');
  if (location && address && location !== address) return `${location} · ${address}`;
  return location || address;
}

function parseSheetRows(values: string[][]): PrideEvent[] {
  const [headerRow, ...dataRows] = values;
  if (!headerRow) return [];

  const headers = headerRow.map(normalizeHeader);
  return dataRows
    .map((row, index): PrideEvent | null => {
      if (row.every((cell) => !String(cell ?? '').trim())) return null;

      const name = readCell(headers, row, 'name');
      const day = parseDay(readDayCell(headers, row));
      if (!name || !day) return null;

      const ticketStatus = readCell(headers, row, 'ticketStatus');
      if (isSoldOutStatus(ticketStatus)) return null;

      const types = parseTypes(readCell(headers, row, 'types'));
      const free = parseBoolean(readCell(headers, row, 'free')) || isRsvpFreeStatus(ticketStatus);
      const vibeTagsCell = readCell(headers, row, 'vibeTags');
      const vibesRaw = parseVibesRaw(readCell(headers, row, 'vibesRaw'), vibeTagsCell);
      const ctaHref = readCell(headers, row, 'ctaHref');
      const ctaLabel =
        ctaLabelForTicketStatus(ticketStatus) || readCell(headers, row, 'ctaLabel') || (free ? 'More Info' : 'Get Tickets');
      const fallbackButtonClass = ctaButtonClassForTicketStatus(ticketStatus, free);
      const fallbackCardClass: `tp-${string}` = `tp-${types[0] ?? EventType.DayParty}`;
      const discountCodeRaw = readCell(headers, row, 'discountCode').trim();
      const discountCode =
        discountCodeRaw && !shouldHideDiscountCode(discountCodeRaw) ? discountCodeRaw : '';

      return {
        id: readCell(headers, row, 'id') || `${slugify(`${day}-${name}`)}-${index}`,
        day,
        dayLabel: readCell(headers, row, 'dayLabel') || dayLabelFor(day),
        name,
        organizer: readCell(headers, row, 'organizer') || undefined,
        types,
        vibesRaw,
        free,
        badges: parseBadges(readCell(headers, row, 'badges'), types, free),
        time: readCell(headers, row, 'time'),
        location: readLocation(headers, row),
        vibeTags: parseVibeTags(vibesRaw, vibeTagsCell),
        ctaHref,
        ctaLabel,
        ctaButtonClass: normalizeClass<'btn-'>(readCell(headers, row, 'ctaButtonClass'), 'btn-', fallbackButtonClass),
        cardClass: normalizeClass<'tp-'>(readCell(headers, row, 'cardClass'), 'tp-', fallbackCardClass),
        ...(discountCode ? { discountCode } : {}),
      };
    })
    .filter((event): event is PrideEvent => event !== null);
}

function parseBeautyRows(values: string[][]): BeautyItem[] {
  const [headerRow, ...dataRows] = values;
  if (!headerRow) return [];

  const headers = headerRow.map(normalizeHeader);
  const labels = headerRow.map((header) => titleize(cleanCellValue(header)));

  return dataRows
    .map((row, index): BeautyItem | null => {
      if (row.every((cell) => !cleanCellValue(cell))) return null;
      if (!isConfirmedPartner(readBeautyCell(headers, row, 'confirmedPartner'))) return null;
      if (!isPassingDiscountCodeStatus(readBeautyCell(headers, row, 'testDiscountCodeStatus'))) return null;

      const fields = headers
        .map((header, fieldIndex): BeautyField | null => {
          const label = labels[fieldIndex];
          const value = cleanCellValue(row[fieldIndex]);
          if (!header || !label || !value || BEAUTY_INTERNAL_COLUMNS.has(header)) return null;
          return {
            key: header,
            label,
            value,
            href: beautyFieldHref(label, value),
          };
        })
        .filter((field): field is BeautyField => field !== null);

      const name = readBeautyCell(headers, row, 'businessName') || fields[0]?.value;
      if (!name) return null;

      const businessType = readBeautyCell(headers, row, 'businessType') || 'Beauty Partner';
      const primaryHref = fields.find(isPrimaryBeautyLink)?.href;

      return {
        id: `${slugify(`${businessType}-${name}`)}-${index}`,
        name,
        businessType,
        fields,
        primaryHref,
      };
    })
    .filter((item): item is BeautyItem => item !== null);
}

async function fetchSheetValues(sheetName: string, signal?: AbortSignal): Promise<string[][]> {
  const apiKey = getApiKey();
  const spreadsheetId = getSpreadsheetId();
  if (isMissingApiKey(apiKey)) {
    throw new Error('Add your Google Sheets API key to VITE_GOOGLE_SHEETS_API_KEY in .env.');
  }
  if (isMissingSpreadsheetId(spreadsheetId)) {
    throw new Error('Add your Google Sheets spreadsheet ID to VITE_GOOGLE_SHEETS_ID in .env.');
  }

  const url = new URL(
    `https://sheets.googleapis.com/v4/spreadsheets/${spreadsheetId}/values/${encodeURIComponent(sheetName)}`,
  );
  url.searchParams.set('key', apiKey);
  url.searchParams.set('majorDimension', 'ROWS');
  url.searchParams.set('valueRenderOption', 'FORMATTED_VALUE');

  const response = await fetch(url, { signal });
  const payload = (await response.json()) as SheetsApiResponse;

  if (!response.ok) {
    throw new Error(payload.error?.message ?? `Unable to load ${sheetName} from Google Sheets.`);
  }

  return payload.values ?? [];
}

export async function fetchSheetEvents(signal?: AbortSignal): Promise<PrideEvent[]> {
  const events = parseSheetRows(await fetchSheetValues(EVENTS_SHEET_NAME, signal));
  if (events.length === 0) {
    throw new Error('No valid events were found in the Google Sheet.');
  }

  return events;
}

export async function fetchSheetBeautyItems(signal?: AbortSignal): Promise<BeautyItem[]> {
  return parseBeautyRows(await fetchSheetValues(BEAUTY_SHEET_NAME, signal));
}
