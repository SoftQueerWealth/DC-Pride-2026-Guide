#!/usr/bin/env bash
# Stamp last-updated date, sync festival events and community perks from Google Sheets,
# build for production, and deploy to Cloudflare.
# Usage: npm run deploy:prod
set -euo pipefail

ROOT="$(cd "$(dirname "$0")/.." && pwd)"
cd "$ROOT"

echo "==> Stamping last-updated date..."
node scripts/update-last-updated.mjs

echo "==> Syncing events from Google Sheets..."
npm run sync-events

echo "==> Syncing community perks from Google Sheets..."
npm run sync-beauty

echo "==> Building for production..."
npm run build

echo "==> Deploying to Cloudflare production..."
npx wrangler deploy --env=""

echo "==> Done. Production is updated with the latest events, community perks, and last-updated date."
