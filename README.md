# DC Black Pride 2026 — Weekend Guide

React + TypeScript + Vite app. Event data is generated from `legacy/index.html` for one-time migration; edit the legacy file and re-run extract, or move toward hand-maintained `src/data` modules.

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

## Layout

- `src/components/` — UI pieces (`Hero`, `EventCard`, `DaySection`, `FilterPanel`, …)
- `src/constants/` — Day order and filter pill definitions
- `src/data/events.generated.ts` — **generated** event list (do not edit by hand)
- `src/hooks/useEventFilters.ts` — Filter state (mirrors legacy behavior)
- `src/lib/` — Analytics (`gtag`) and Google Maps URL helpers
- `legacy/index.html` — Archived monolithic site used as the extraction source
