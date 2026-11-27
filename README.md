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
npm run test:a11y # run the accessibility tests against dist/ (build first)
npm run preview   # build, then serve the production output locally
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
public/               static assets (project images, self-hosted fonts, privacy.html served at /privacy (for the owner's Google OAuth client, not this site), robots.txt, _headers)
lighthouserc.json     Lighthouse CI config and performance budgets
playwright.config.ts  Playwright config for the accessibility tests (serves dist/ with vite preview)
tests/a11y/           accessibility tests (axe-core, dialog keyboard behaviour, tab order)
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

The generated `index.md`, `llms.txt`, and `sitemap.xml` are built from these same data files, so no separate edits are needed.

### Project images

Gallery images are generated from high-resolution originals (JPEG, PNG, WebP, or HEIC on macOS), which are not kept in the repo:

```sh
node scripts/make-images.mjs [sourceDir]   # default sourceDir: public/images/projects/source
```

`sourceDir` holds `<project>/<name>.<ext>`. For each image the script writes `<name>.thumb.{webp,jpg}` (256px), `<name>.{webp,jpg}` (640px) and `<name>@2x.{webp,jpg}` (1280px) to `public/images/projects/<project>/`, and prints the `width`/`height` to use in `data.ts`. In `data.ts`, reference the 640px `.jpg` (e.g. `images/projects/marlo/project0.jpg`); the other files are derived from that path. Delete the source folder afterwards so it isn't deployed.

## Checks

### Performance budgets

`lighthouserc.json` sets mobile performance budgets (score, LCP, CLS, TBT, and JavaScript, image and total transfer size). Lighthouse CI audits the prerendered `dist/` 3 times and checks the median run. A budget that is exceeded blocks the deploy. The reports are uploaded as a `lighthouse-reports-<attempt>` artifact on every run (open the run in the Actions tab). Locally they're written to `.lighthouseci/reports/`.

To change a budget, edit its value in `lighthouserc.json`, run `npm run build && npm run lhci` to confirm, and record the new value and the reason in the budgets section of `docs/performance.md`. Adding gallery images uses up the image budget, so a new project may need it raised.

### Accessibility

The site is built to be usable with a keyboard and a screen reader: it has landmarks and a heading structure, every button and link has an accessible name, gallery images have alt text, the dialogs are native `<dialog>` elements, and the gallery's image fade-in is turned off for `prefers-reduced-motion`.

`npm run test:a11y` checks this automatically. It uses Playwright and [axe-core](https://github.com/dequelabs/axe-core) on the prerendered `dist/` page in Chromium (tests in `tests/a11y/`, config in `playwright.config.ts`). It checks:

- the page against axe's WCAG 2.0 and 2.1 level A and AA rules (including colour contrast, names and alt text)
- the open gallery and work-history dialogs against the same rules
- the dialogs' keyboard behaviour: they open with Enter, the close button gets focus, they close with Escape or the close button, focus returns to the button that opened them, and the arrow keys move through gallery images
- the tab order of the whole page

Serious and critical axe violations fail the test, and so does a keyboard or focus problem. Minor and moderate violations are listed as warnings in the output without failing. The tests run on every pull request and push to `main`, after Lighthouse CI. A failure blocks the deploy. The Playwright HTML report is uploaded as an `a11y-report-<attempt>` artifact on every run, and written to `playwright-report/` locally.

Automated checks catch only part of what matters, and the site hasn't been tested by hand with a screen reader. If something doesn't work for you, please get in touch (see the contact links on the site).

## Deployment

Pushing to `main` triggers `.github/workflows/deploy.yml`, which builds the site, runs the [checks](#checks) (Lighthouse CI and the accessibility tests), and deploys it with Wrangler. If a check fails, the deploy is blocked. It requires the `CLOUDFLARE_API_TOKEN` and `CLOUDFLARE_ACCOUNT_ID` repository secrets. Pull requests to `main` run the same build and checks but don't deploy.

Pull requests are pre-filled from `.github/pull_request_template.md`, a short description plus a self-review checklist to work through before merging.

To deploy manually:

```sh
npm run deploy
```

### Cloudflare dashboard settings

These live in the dashboard, not in this repo:

- A URL Rewrite rule (Rules > Transform Rules) rewrites `/` to `/index.md` for requests with `Accept: text/markdown`.
- A custom rule ("Block unknown paths on tuckbick.com", under Security > Security rules) acts as a path allowlist for tuckbick.com and www.tuckbick.com: only `/`, `/privacy`, `/llms.txt`, `/index.md`, `/sitemap.xml`, `/robots.txt`, and paths under `/assets/`, `/images/` and `/fonts/` pass. Update it when adding new top-level paths. The full expression is in `AGENTS.md`.
- Web Analytics injects its beacon at the edge and collects real-user Core Web Vitals, with no cookies or personal data. The beacon reports to `/cdn-cgi/rum`, which the allowlist doesn't block. See "Real-user data" in `docs/performance.md`.
