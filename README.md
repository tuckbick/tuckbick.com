# tuckbick.com

Personal site for Tucker Bickler: projects, work history, and contact info.

Built with React 19, TypeScript, and Vite, and hosted on Cloudflare Workers. The page is prerendered to static HTML at build time and hydrated on the client.

## Development

```sh
npm install
npm run dev       # start the Vite dev server
npm run lint      # run oxlint
npm run build     # type-check, build, and prerender to dist/
npm run preview   # build, then serve the production output locally
```

## Deployment

Pushing to `main` triggers `.github/workflows/deploy.yml`, which builds the site and deploys it with Wrangler. It requires the `CLOUDFLARE_API_TOKEN` and `CLOUDFLARE_ACCOUNT_ID` repository secrets.

To deploy manually:

```sh
npm run deploy
```

## Project structure

```
index.html            HTML template, metadata, and JSON-LD structured data
prerender.js          renders the app to HTML and injects it into dist/client/index.html
src/
  main.tsx            client entry (hydrates prerendered markup)
  entry-server.tsx    server render entry used by prerender.js
  App.tsx             top-level layout
  content/            page sections: Header, Projects, Work, Contact
  components/         shared UI components (Section, Gallery, Modal, Icon, ...)
  util/               date and duration formatting
public/               static assets (project images)
worker/index.ts       Cloudflare Worker (serves /privacy; returns 404 for anything else that isn't a static asset)
wrangler.jsonc        Worker and assets configuration
```

## Editing content

Section content lives in data files, separate from the components:

- `src/content/Projects/data.ts`: projects, links, descriptions, and gallery images (stored in `public/projects/<name>/`)
- `src/content/Work/data.ts`: work history
- `src/content/Contact/data.ts`: contact links
