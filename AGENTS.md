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

**Build pipeline (prerender/hydrate):** `vite build` emits `dist/index.html` containing an `<!--app-html-->` placeholder. `prerender.js` then starts a Vite server in middleware mode, loads `src/entry-server.tsx` via `ssrLoadModule`, calls `render()` (`renderToString(<App />)`), and writes the HTML into the placeholder in `dist/index.html`. It then loads `src/seo/index.ts` the same way and writes `dist/index.md`, `dist/llms.txt` and `dist/sitemap.xml`. On the client, `src/main.tsx` calls `hydrateRoot` if prerendered markup exists, otherwise `createRoot`. Consequence: components must be SSR-safe (no `window`/`document` access during render; use effects, as `useFavicon` does), and markup must match between server and client or hydration breaks.

**Content vs. components:** `src/App.tsx` renders `Header`, then a `<main>` landmark stacking four sections (`Intro`, `Projects`, `Work`, `Contact`) from `src/content/`. Each section's text/links/images live in a sibling `data.ts` (typed with `Duration` from `src/util/formatDuration.ts`), separate from the component. Edit content in `data.ts`; shared UI primitives (Section, SectionList, Gallery, Modal, Icon, Link, ...) are in `src/components/`. Each component has its own co-located `.css` file (plain CSS, no CSS-in-JS).

**SEO / machine-readable output:** `src/seo/` generates Markdown (`markdown.ts`), `llms.txt` (`llmsTxt.ts`) and `sitemap.xml` (`sitemap.ts`) from the same `data.ts` files the components use, so content edits flow to all outputs automatically. The base URL lives in `src/seo/siteUrl.ts`. If you add a new section or change a `data.ts` shape, update the generators too (they use `'role' in project`-style checks for optional fields).

**Static assets:** `public/` is served as-is. Project gallery images go in `public/projects/<name>/` and are referenced in `data.ts` by relative path (e.g. `projects/marlo/project0.jpg`). `public/privacy.html` is served at `/privacy`. `public/robots.txt` points at the sitemap, and `public/_headers` (Cloudflare static-asset headers) advertises `/index.md` via a `Link` header on `/`, sets content types for `/index.md` and `/llms.txt`, and adds `Vary: Accept` on `/` and `/index.md`. Markdown content negotiation (`Accept: text/markdown` on `/` returns `index.md`) is not in the repo: it relies on a Cloudflare dashboard URL Rewrite rule (zone Rules > Transform Rules) that rewrites the path `/` to `/index.md` when the `Accept` header contains `text/markdown`. If it is missing, `/` just returns HTML.

**Conventions:** `Link` (`src/components/Link/`) opens in a new tab and uses `rel="noopener noreferrer"`, except links to `tuckbick.com` and subdomains, which keep the referrer. Gallery images need `alt` text in `data.ts` (also used in the generated Markdown), and gallery thumbnails are accessible buttons that open the `Modal`. `formatDuration` collapses identical start/end dates into a single date.

**`index.html`** holds the metadata (SEO/Open Graph tags) and expanded JSON-LD structured data, and the favicon is an inlined data URI (swapped on an interval by `src/content/Header/useFavicon.ts`).

**Deploy:** pushing to `main` runs `.github/workflows/deploy.yml` (`npm ci`, `npm run build`, `wrangler-action`), which needs the `CLOUDFLARE_API_TOKEN` and `CLOUDFLARE_ACCOUNT_ID` repo secrets.

## Keeping docs current

When a change affects how the project is built, structured, or edited (new/renamed/removed files or directories, build pipeline or command changes, new content sections, changed conventions, deploy setup), update `AGENTS.md` and `README.md` in the same change. Skip updates for changes that don't alter anything those files describe (e.g. copy edits in `data.ts`, styling tweaks, bug fixes).
