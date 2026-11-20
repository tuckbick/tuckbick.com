import { SITE_URL } from './siteUrl'

export default function generateSitemap(): string {
    const lastmod = new Date().toISOString().slice(0, 10)
    return `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
  <url>
    <loc>${SITE_URL}/</loc>
    <lastmod>${lastmod}</lastmod>
  </url>
</urlset>
`
}
