# tuckbick.com

Personal site for Tucker Bickler: projects, work history, and contact info.

Built with React 19, TypeScript, and Vite, and hosted on Cloudflare Workers. The page is prerendered to static HTML at build time and hydrated on the client.

## Development

```sh
npm install
npm run dev       # start the Vite dev server
npm run lint      # run oxlint
npm run build     # type-check, build, and prerender to dist/
npm run lhci      # run Lighthouse CI against dist/ and check performance budgets (build first)
npm run preview   # build, then serve the production output locally
```

## Deployment

Pushing to `main` triggers `.github/workflows/deploy.yml`, which builds the site, checks it with Lighthouse CI, and deploys it with Wrangler. It requires the `CLOUDFLARE_API_TOKEN` and `CLOUDFLARE_ACCOUNT_ID` repository secrets. Pull requests to `main` run the same build and Lighthouse CI check but don't deploy.

Pull requests are pre-filled from `.github/pull_request_template.md`, a short description plus a self-review checklist to work through before merging.

### Performance budgets

`lighthouserc.json` sets mobile performance budgets (score, LCP, CLS, TBT, and JavaScript, image and total transfer size). Lighthouse CI audits the prerendered `dist/` 3 times and checks the median run. If a budget is exceeded, the workflow fails before the publish step, so the deploy is blocked. The reports are uploaded as a `lighthouse-reports-<attempt>` artifact on every run (open the run in the Actions tab). Locally they're written to `.lighthouseci/reports/`.

To change a budget, edit its value in `lighthouserc.json`, run `npm run build && npm run lhci` to confirm, and record the new value and the reason in the budgets section of `docs/performance.md`. Adding gallery images uses up the image budget, so a new project may need it raised.

To deploy manually:

```sh
npm run deploy
```

## Project structure

```
index.html            HTML template, metadata, and JSON-LD structured data
scripts/make-images.mjs  generates project gallery images (see "Project images")
prerender.js          renders the app to HTML into dist/index.html and writes index.md, llms.txt, sitemap.xml
src/
  main.tsx            client entry (hydrates prerendered markup)
  entry-server.tsx    server render entry used by prerender.js
  App.tsx             top-level layout
  content/            page sections: Header, Intro, Projects, Work, Contact
  components/         shared UI components (Section, Gallery, Modal, Icon, ...)
  seo/                generators for index.md, llms.txt, and sitemap.xml
  util/               date and duration formatting
public/               static assets (project images, self-hosted fonts, privacy.html served at /privacy, robots.txt, _headers)
lighthouserc.json     Lighthouse CI config and performance budgets
wrangler.jsonc        static assets configuration (unknown paths get a 404 from Cloudflare)
docs/
  performance.md      mobile performance baseline (Lighthouse + WebPageTest) and the Lighthouse CI budgets
```

## Editing content

Section content lives in data files, separate from the components:

- `src/content/Intro/data.ts`: intro summary paragraphs
- `src/content/Projects/data.ts`: projects, links, descriptions, and gallery images (stored in `public/images/projects/<name>/`)
- `src/content/Work/data.ts`: work history
- `src/content/Contact/data.ts`: contact links

### Project images

Gallery images are generated from high-resolution originals (JPEG, PNG, WebP, or HEIC on macOS), which are not kept in the repo:

```sh
node scripts/make-images.mjs [sourceDir]   # default sourceDir: public/images/projects/source
```

`sourceDir` holds `<project>/<name>.<ext>`. For each image the script writes `<name>.thumb.{webp,jpg}` (256px), `<name>.{webp,jpg}` (640px) and `<name>@2x.{webp,jpg}` (1280px) to `public/images/projects/<project>/`, and prints the `width`/`height` to use in `data.ts`. In `data.ts`, reference the 640px `.jpg` (e.g. `images/projects/marlo/project0.jpg`); the other files are derived from that path. Delete the source folder afterwards so it isn't deployed.

The generated `index.md`, `llms.txt`, and `sitemap.xml` are built from these same data files, so no separate edits are needed.

Requests to `/` with `Accept: text/markdown` get `index.md` through a Cloudflare URL Rewrite rule (Rules > Transform Rules in the dashboard) that rewrites `/` to `/index.md`. That rule is not part of this repo.

A Cloudflare custom rule ("Block unknown paths on tuckbick.com", under Security > Security rules) blocks unknown paths on tuckbick.com and www.tuckbick.com, so it acts as a path allowlist: only `/`, `/privacy`, `/llms.txt`, `/index.md`, `/sitemap.xml`, `/robots.txt`, and paths under `/assets/`, `/images/` and `/fonts/` pass. Like the rewrite rule, it lives in the dashboard, not in this repo; update it when adding new top-level paths. The full expression is in `AGENTS.md`.
