/**
 * Sync Google Sheets `beauty` tab -> src/data/beauty.generated.ts
 * Run: npm run sync-beauty
 */
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const root = path.join(__dirname, '..');
const envPath = path.join(root, '.env');
const outPath = path.join(root, 'src', 'data', 'beauty.generated.ts');

const BEAUTY_SHEET_NAME = 'beauty';
const SHEETS_ID_PLACEHOLDER = 'YOUR_GOOGLE_SHEETS_ID_HERE';
const API_KEY_PLACEHOLDER = 'YOUR_GOOGLE_SHEETS_API_KEY_HERE';

const BEAUTY_COLUMN_ALIASES = {
  businessName: ['businessname', 'business', 'brand', 'brandname', 'partner', 'partnername', 'name'],
  businessType: ['businesstype', 'businesscategory', 'category', 'type'],
  confirmedPartner: ['confirmedpartner', 'partnerconfirmed', 'confirmed', 'partnerstatus', 'status'],
  testDiscountCodeStatus: ['testdiscountcodestatus', 'testdiscountcode', 'discountcodestatus', 'codestatus'],
};

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

function loadDotEnv() {
  if (!fs.existsSync(envPath)) return;

  const lines = fs.readFileSync(envPath, 'utf8').split(/\r?\n/);
  for (const line of lines) {
    const trimmed = line.trim();
    if (!trimmed || trimmed.startsWith('#')) continue;

    const equalsIndex = trimmed.indexOf('=');
    if (equalsIndex < 0) continue;

    const key = trimmed.slice(0, equalsIndex).trim();
    const rawValue = trimmed.slice(equalsIndex + 1).trim();
    const value = rawValue.replace(/^['"]|['"]$/g, '');
    if (key && process.env[key] === undefined) process.env[key] = value;
  }
}

function requiredEnv(name, placeholder) {
  const value = process.env[name]?.trim() ?? '';
  if (!value || value === placeholder) {
    throw new Error(`Add ${name} to .env before running sync-beauty.`);
  }
  return value;
}

function normalizeHeader(value) {
  return String(value ?? '').toLowerCase().replace(/[^a-z0-9]/g, '');
}

function normalizeToken(value) {
  return String(value ?? '').toLowerCase().replace(/[_-]+/g, ' ').replace(/\s+/g, ' ').trim();
}

function cleanCellValue(value) {
  const cell = String(value ?? '').trim();
  return cell.toLowerCase() === 'nan' ? '' : cell;
}

function titleize(value) {
  return String(value ?? '')
    .replace(/[-_]+/g, ' ')
    .replace(/\s+/g, ' ')
    .trim()
    .replace(/\b\w/g, (char) => char.toUpperCase());
}

function slugify(value) {
  return (
    String(value ?? '')
      .toLowerCase()
      .replace(/[^a-z0-9]+/g, '-')
      .replace(/^-|-$/g, '')
      .slice(0, 80) || 'beauty'
  );
}

function readBeautyCell(headers, row, key) {
  for (const alias of BEAUTY_COLUMN_ALIASES[key]) {
    const index = headers.indexOf(normalizeHeader(alias));
    if (index >= 0) return cleanCellValue(row[index]);
  }
  return '';
}

function beautyFieldHref(label, value) {
  if (/^https?:\/\//i.test(value)) return value;
  if (/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value)) return `mailto:${value}`;

  const normalizedLabel = normalizeHeader(label);
  if (normalizedLabel.includes('instagram')) {
    const handle = value.replace(/^@/, '').trim();
    if (handle && !/\s/.test(handle)) return `https://www.instagram.com/${handle}`;
  }

  return undefined;
}

function isConfirmedPartner(value) {
  const normalized = normalizeToken(value);
  return ['yes', 'y', 'true', 'confirmed', 'confirmed partner', 'approved'].includes(normalized);
}

function isPassingDiscountCodeStatus(value) {
  return ['pass', 'passed'].includes(normalizeToken(value));
}

function isPrimaryBeautyLink(field) {
  const normalizedLabel = normalizeHeader(field.label);
  return Boolean(field.href) && BEAUTY_PRIMARY_LINK_COLUMNS.some((column) => normalizedLabel.includes(column));
}

function parseBeautyRows(values) {
  const [headerRow, ...dataRows] = values;
  if (!headerRow) return [];

  const headers = headerRow.map(normalizeHeader);
  const labels = headerRow.map((header) => titleize(cleanCellValue(header)));

  return dataRows
    .map((row, index) => {
      if (row.every((cell) => !cleanCellValue(cell))) return null;
      if (!isConfirmedPartner(readBeautyCell(headers, row, 'confirmedPartner'))) return null;
      if (!isPassingDiscountCodeStatus(readBeautyCell(headers, row, 'testDiscountCodeStatus'))) return null;

      const fields = headers
        .map((header, fieldIndex) => {
          const label = labels[fieldIndex];
          const value = cleanCellValue(row[fieldIndex]);
          if (!header || !label || !value || BEAUTY_INTERNAL_COLUMNS.has(header)) return null;

          const href = beautyFieldHref(label, value);
          return href ? { key: header, label, value, href } : { key: header, label, value };
        })
        .filter(Boolean);

      const name = readBeautyCell(headers, row, 'businessName') || fields[0]?.value;
      if (!name) return null;

      const businessType = readBeautyCell(headers, row, 'businessType') || 'Beauty Partner';
      const primaryHref = fields.find(isPrimaryBeautyLink)?.href;

      return {
        id: `${slugify(`${businessType}-${name}`)}-${index}`,
        name,
        businessType,
        fields,
        ...(primaryHref ? { primaryHref } : {}),
      };
    })
    .filter(Boolean);
}

async function fetchBeautyValues(spreadsheetId, apiKey) {
  const url = new URL(
    `https://sheets.googleapis.com/v4/spreadsheets/${spreadsheetId}/values/${encodeURIComponent(BEAUTY_SHEET_NAME)}`,
  );
  url.searchParams.set('key', apiKey);
  url.searchParams.set('majorDimension', 'ROWS');
  url.searchParams.set('valueRenderOption', 'FORMATTED_VALUE');

  const response = await fetch(url);
  const payload = await response.json();
  if (!response.ok) {
    throw new Error(payload.error?.message ?? 'Unable to load beauty data from Google Sheets.');
  }

  return payload.values ?? [];
}

function writeBeautyFile(items) {
  const file = `/* eslint-disable */
// Auto-generated by scripts/sync-beauty.mjs from the Google Sheets beauty tab. Do not edit by hand.
import type { BeautyItem } from '../types/beauty';

export const generatedBeautyItems: BeautyItem[] = ${JSON.stringify(items, null, 2)};
`;

  fs.mkdirSync(path.dirname(outPath), { recursive: true });
  fs.writeFileSync(outPath, file);
}

loadDotEnv();

const spreadsheetId = requiredEnv('VITE_GOOGLE_SHEETS_ID', SHEETS_ID_PLACEHOLDER);
const apiKey = requiredEnv('VITE_GOOGLE_SHEETS_API_KEY', API_KEY_PLACEHOLDER);
const values = await fetchBeautyValues(spreadsheetId, apiKey);
const items = parseBeautyRows(values);
writeBeautyFile(items);

console.log(`Wrote ${path.relative(root, outPath)} partners: ${items.length}`);
