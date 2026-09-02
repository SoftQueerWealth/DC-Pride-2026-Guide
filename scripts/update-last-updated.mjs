/**
 * Stamp src/constants/lastUpdated.ts with today's date in America/New_York.
 * Run: node scripts/update-last-updated.mjs
 */
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const root = path.join(__dirname, '..');
const outPath = path.join(root, 'src', 'constants', 'lastUpdated.ts');

const label = new Intl.DateTimeFormat('en-US', {
  timeZone: 'America/New_York',
  month: 'long',
  day: 'numeric',
  year: 'numeric',
}).format(new Date());

const file = `/** Stamped by scripts/update-last-updated.mjs during prod deploy. Do not edit by hand. */
export const LAST_UPDATED_LABEL = '${label}';
`;

fs.writeFileSync(outPath, file);
console.log(`Wrote ${path.relative(root, outPath)} → ${label}`);
