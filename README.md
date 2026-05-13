# DC Black Pride 2026 — Weekend Guide

React + TypeScript + Vite app. Local development loads event data from the `events` tab in Google Sheets. Production builds use the bundled event data in `src/data/events.generated.ts`, so changing the sheet does not change Cloudflare production until you deploy a new build.

## Google Sheets Setup

Create a local `.env` file with your Sheets API key for local development:

```sh
VITE_GOOGLE_SHEETS_API_KEY=YOUR_GOOGLE_SHEETS_API_KEY_HERE
```

The app reads from spreadsheet `15qGvOIUMxTFy3ncvUW1z8XXT6Pz9iTbZ-MW4UhDmjiM`, tab `events`. The first row should be headers. Recommended columns are `day`, `name`, `organizer`, `types`, `vibes`, `free`, `badges`, `time`, `location`, `vibeTags`, `ctaHref`, `ctaLabel`, `ctaButtonClass`, and `cardClass`.

Because this is a browser app, any `VITE_` API key used in development can be exposed in built JavaScript if the live sheet path is enabled for production. Keep production on bundled data unless you intentionally want live updates.

## Scripts

| Command | Description |
|--------|-------------|
| `npm run dev` | Local dev server |
| `npm run build` | Typecheck + production bundle to `dist/` |
| `npm run preview` | Serve `dist/` locally |
| `npm run lint` | ESLint |
| `npm run extract-events` | Regenerate `src/data/events.generated.ts` from `legacy/index.html` |

## Deploy (Cloudflare)

`wrangler.jsonc` serves the **`dist`** directory. Run `npm run build` before `wrangler deploy` (or wire CI to build then deploy).

Production reads events from the deployed bundle, not Google Sheets at runtime. To change production events, update `src/data/events.generated.ts` and deploy again.

## Layout

- `src/components/` — UI pieces (`Hero`, `EventCard`, `DaySection`, `FilterPanel`, …)
- `src/constants/` — Day order and filter pill definitions
- `src/data/googleSheets.ts` — Google Sheets fetch and row parser
- `src/data/events.generated.ts` — archived generated event list from the legacy migration
- `src/hooks/useEventFilters.ts` — Filter state (mirrors legacy behavior)
- `src/lib/` — Analytics (`gtag`) and Google Maps URL helpers
- `legacy/index.html` — Archived monolithic site used as the extraction source
