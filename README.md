# Pride Month 2026 — Weekend Guide

React + TypeScript + Vite app. Local development loads guide data from Google Sheets. Production builds use bundled data in `src/data/festivals/*.generated.ts` and `src/data/beauty.generated.ts`, so changing the sheet does not change Cloudflare production until you deploy a new build.

## Google Sheets Setup

Create a local `.env` file with your Sheets API key for local development:

```sh
VITE_GOOGLE_SHEETS_ID=YOUR_GOOGLE_SHEETS_ID_HERE
VITE_GOOGLE_SHEETS_API_KEY=YOUR_GOOGLE_SHEETS_API_KEY_HERE
```

The app reads from the spreadsheet configured by `VITE_GOOGLE_SHEETS_ID`. Each festival has its own sheet tab:

| Festival | Sheet tab |
|----------|-----------|
| Baltimore Pride | `Baltimore Pride Master` |
| Capital Pride | `Capital Pride Master` |

The first row on each tab should be headers. Recommended columns are `day`, `name`, `organizer`, `types`, `vibes`, `free`, `badges`, `time`, `location`, `vibeTags`, `ctaHref`, `ctaLabel`, `ctaButtonClass`, and `cardClass`. Events belong to the festival of the tab they are on — Baltimore and Capital Pride data are kept separate.

In local development, the app also reads the `beauty` tab for the Community Perks section. Rows are shown only when `confirmed partner` is confirmed and `test discount code status` is `pass`; blank or `NaN` fields are skipped. Community Perks filters include the `business type` column and a `Mobile` option for partners whose travel status is yes.

Because this is a browser app, any `VITE_` API key used in development can be exposed in built JavaScript if the live sheet path is enabled for production. Keep production on bundled data unless you intentionally want live updates.

Google Analytics loads only when `VITE_ENABLE_ANALYTICS=true` (set in `.env.production` for main/production deploys). Staging builds use `--mode staging` and `.env.staging`, so analytics is not loaded or tracked on staging.

## Scripts

| Command | Description |
|--------|-------------|
| `npm run dev` | Local dev server |
| `npm run build` | Typecheck + production bundle to `dist/` (analytics enabled via `.env.production`) |
| `npm run build:staging` | Staging bundle to `dist/` (analytics disabled via `.env.staging`) |
| `npm run preview` | Serve `dist/` locally |
| `npm run lint` | ESLint |
| `npm run sync-events` | Regenerate `src/data/festivals/*.generated.ts` from Google Sheets festival tabs |
| `npm run sync-beauty` | Regenerate `src/data/beauty.generated.ts` from the Google Sheets `beauty` tab |
| `npm run extract-events` | Regenerate legacy `events.generated.ts` from `legacy/index.html` (archived) |

## Deploy (Cloudflare)

`wrangler.jsonc` serves the **`dist`** directory. Run `npm run build` before `wrangler deploy` (or wire CI to build then deploy).

Production reads guide data from the deployed bundle, not Google Sheets at runtime. To change production Events or Community Perks content, update the generated data files and deploy again.

For festival event sheet changes:

```sh
npm run sync-events
npm run build
wrangler deploy
```

For Community Perks sheet changes:

```sh
npm run sync-beauty
npm run build
wrangler deploy
```

## Layout

- `src/components/` — UI pieces (`Hero`, `EventCard`, `DaySection`, `FilterPanel`, …)
- `src/constants/` — Festival definitions, day order, and filter pill definitions
- `src/data/googleSheets.ts` — Google Sheets fetch and row parser
- `src/data/festivals/*.generated.ts` — per-festival bundled event lists for production builds
- `src/data/beauty.generated.ts` — generated Community Perks partner list for production builds
- `src/hooks/useEventFilters.ts` — Filter state (mirrors legacy behavior)
- `src/lib/` — Analytics (`gtag`) and Google Maps URL helpers
- `legacy/index.html` — Archived monolithic site used as the extraction source
