# Baltimore Pride 2026 — Weekend Guide

React + TypeScript + Vite app. Local development loads guide data from Google Sheets. Production builds use bundled data in `src/data/events.generated.ts` and `src/data/beauty.generated.ts`, so changing the sheet does not change Cloudflare production until you deploy a new build.

## Google Sheets Setup

Create a local `.env` file with your Sheets API key for local development:

```sh
VITE_GOOGLE_SHEETS_ID=YOUR_GOOGLE_SHEETS_ID_HERE
VITE_GOOGLE_SHEETS_API_KEY=YOUR_GOOGLE_SHEETS_API_KEY_HERE
```

The app reads from the spreadsheet configured by `VITE_GOOGLE_SHEETS_ID`, tab `events`. The first row should be headers. Recommended columns are `day`, `name`, `organizer`, `types`, `vibes`, `free`, `badges`, `time`, `location`, `vibeTags`, `ctaHref`, `ctaLabel`, `ctaButtonClass`, and `cardClass`.

In local development, the app also reads the `beauty` tab for the Community Perks section. Rows are shown only when `confirmed partner` is confirmed and `test discount code status` is `pass`; blank or `NaN` fields are skipped. Community Perks filters include the `business type` column and a `Mobile` option for partners whose travel status is yes.

Because this is a browser app, any `VITE_` API key used in development can be exposed in built JavaScript if the live sheet path is enabled for production. Keep production on bundled data unless you intentionally want live updates.

## Scripts

| Command | Description |
|--------|-------------|
| `npm run dev` | Local dev server |
| `npm run build` | Typecheck + production bundle to `dist/` |
| `npm run preview` | Serve `dist/` locally |
| `npm run lint` | ESLint |
| `npm run sync-beauty` | Regenerate `src/data/beauty.generated.ts` from the Google Sheets `beauty` tab |
| `npm run extract-events` | Regenerate `src/data/events.generated.ts` from `legacy/index.html` |

## Deploy (Cloudflare)

`wrangler.jsonc` serves the **`dist`** directory. Run `npm run build` before `wrangler deploy` (or wire CI to build then deploy).

Production reads guide data from the deployed bundle, not Google Sheets at runtime. To change production Events or Community Perks content, update the generated data files and deploy again.

For Community Perks sheet changes:

```sh
npm run sync-beauty
npm run build
wrangler deploy
```

## Layout

- `src/components/` — UI pieces (`Hero`, `EventCard`, `DaySection`, `FilterPanel`, …)
- `src/constants/` — Day order and filter pill definitions
- `src/data/googleSheets.ts` — Google Sheets fetch and row parser
- `src/data/events.generated.ts` — archived generated event list from the legacy migration
- `src/data/beauty.generated.ts` — generated Community Perks partner list for production builds
- `src/hooks/useEventFilters.ts` — Filter state (mirrors legacy behavior)
- `src/lib/` — Analytics (`gtag`) and Google Maps URL helpers
- `legacy/index.html` — Archived monolithic site used as the extraction source
