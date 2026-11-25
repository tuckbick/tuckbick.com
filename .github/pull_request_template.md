## What's this?

<!-- A sentence or two on what changed. Link an issue if there is one. -->

## Why

<!-- The problem, the motivation, or the itch being scratched. -->

## How to check it

<!-- Steps to see it working: what to click, what to look at, which numbers moved. -->

## Screenshots

<!-- Before/after for anything visual. Delete this section if there's nothing to show. -->

## Checklist

<!-- Self-review before merging. Strike through (~~like this~~) anything that doesn't apply. -->

- [ ] `npm run build` passes (type-check + prerender)
- [ ] `npm run lint` is clean
- [ ] `npm run lhci` stays within budget, or `lighthouserc.json` and `docs/performance.md` explain the change
- [ ] Nothing touches `window`/`document` during render, so hydration still matches
- [ ] Content edits in `data.ts` still come out right in `index.md`, `llms.txt` and `sitemap.xml`
- [ ] New images have all six variants (from `scripts/make-images.mjs`) and `alt` text
- [ ] New public paths are added to the Cloudflare allowlist rule
- [ ] `AGENTS.md` / `README.md` are updated if the build, structure or conventions changed
- [ ] I've read the whole diff on GitHub, and CI is green

## Notes for later

<!-- Trade-offs, shortcuts, follow-ups: anything future me (or a curious visitor) should know. -->
