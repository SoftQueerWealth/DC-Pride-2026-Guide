/**
 * Debug helper: compare live staging HTML against expected deploy markers.
 * Usage: node scripts/check-staging-content.mjs
 */
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const STAGING_URL = 'https://sqw-events-guide-staging.softqueerwealth.workers.dev/';
const LOG_PATH = path.join(path.dirname(fileURLToPath(import.meta.url)), '..', '.cursor', 'debug-cbd67d.log');
const DEBUG_ENDPOINT = 'http://127.0.0.1:7842/ingest/dfcc1631-2743-4ab3-b730-452bad2a783c';

async function writeLog(entry) {
  try {
    await fetch(DEBUG_ENDPOINT, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'X-Debug-Session-Id': 'cbd67d',
      },
      body: JSON.stringify({ sessionId: 'cbd67d', ...entry, timestamp: Date.now() }),
    });
  } catch {
    // ignore ingest failures
  }

  try {
    fs.mkdirSync(path.dirname(LOG_PATH), { recursive: true });
    fs.appendFileSync(LOG_PATH, `${JSON.stringify({ sessionId: 'cbd67d', ...entry, timestamp: Date.now() })}\n`);
  } catch {
    // ignore file write failures
  }
}

async function main() {
  const response = await fetch(STAGING_URL);
  const html = await response.text();

  const assetMatch = html.match(/\/assets\/index-([A-Za-z0-9_-]+)\.js/);
  const cssMatch = html.match(/\/assets\/index-([A-Za-z0-9_-]+)\.css/);

  const markers = {
    jsBundle: assetMatch?.[0] ?? null,
    cssBundle: cssMatch?.[0] ?? null,
    queerPrideGuideInHtml: html.includes('Queer Pride Guide'),
    july2026InHtml: html.includes('July 2026'),
    cityFilterInHtml: html.includes('city-filter-select'),
  };

  await writeLog({
    runId: process.env.DEBUG_RUN_ID ?? 'pre-fix',
    hypothesisId: 'A',
    location: 'scripts/check-staging-content.mjs',
    message: 'staging_live_content_markers',
    data: { stagingUrl: STAGING_URL, status: response.status, markers },
  });
  console.log(JSON.stringify(markers, null, 2));
}

main().catch(async (error) => {
  await writeLog({
    runId: process.env.DEBUG_RUN_ID ?? 'pre-fix',
    hypothesisId: 'A',
    location: 'scripts/check-staging-content.mjs',
    message: 'staging_check_failed',
    data: { error: error instanceof Error ? error.message : String(error) },
  });
  console.error(error);
  process.exit(1);
});
