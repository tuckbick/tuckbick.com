# AGENTS.md

This file provides guidance to AI coding agents (Claude Code, Codex, etc.) when working with code in this repository.

## Commands

```sh
npm run dev       # Vite dev server
npm run lint      # oxlint (config: .oxlintrc.json)
npm run build     # tsc -b && vite build && node prerender.js  -> dist/
npm run preview   # build, then vite preview
npm run deploy    # build, then wrangler deploy
```

There is no test suite. `npm run build` (type-check + prerender) and `npm run lint` are the verification steps.

## Architecture

Single-page personal site (React 19 + TypeScript + Vite 8) deployed as static assets on Cloudflare Workers. There is no Worker script and no backend; `wrangler.jsonc` only configures static assets (`not_found_handling: "none"`, so unknown paths 404).

**Build pipeline (prerender/hydrate):** `vite build` emits `dist/index.html` containing an `<!--app-html-->` placeholder. `prerender.js` then starts a Vite server in middleware mode, loads `src/entry-server.tsx` via `ssrLoadModule`, calls `render()` (`renderToString(<App />)`), and writes the HTML into the placeholder in `dist/index.html`. On the client, `src/main.tsx` calls `hydrateRoot` if prerendered markup exists, otherwise `createRoot`. Consequence: components must be SSR-safe (no `window`/`document` access during render; use effects, as `useFavicon` does), and markup must match between server and client or hydration breaks.

**Content vs. components:** `src/App.tsx` stacks four sections (`Header`, `Projects`, `Work`, `Contact`) in `src/content/`. Each section's text/links/images live in a sibling `data.ts` (typed with `Duration` from `src/util/formatDuration.ts`), separate from the component. Edit content in `data.ts`; shared UI primitives (Section, SectionList, Gallery, Modal, Icon, Link, ...) are in `src/components/`. Each component has its own co-located `.css` file (plain CSS, no CSS-in-JS).

**Static assets:** `public/` is served as-is. Project gallery images go in `public/projects/<name>/` and are referenced in `data.ts` by relative path (e.g. `projects/marlo/project0.jpg`). `public/privacy.html` is served at `/privacy`.

**`index.html`** holds the metadata and JSON-LD structured data, and the favicon is an inlined data URI (swapped on an interval by `src/content/Header/useFavicon.ts`).

**Deploy:** pushing to `main` runs `.github/workflows/deploy.yml` (`npm ci`, `npm run build`, `wrangler-action`), which needs the `CLOUDFLARE_API_TOKEN` and `CLOUDFLARE_ACCOUNT_ID` repo secrets.
