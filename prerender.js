import fs from 'node:fs'
import path from 'node:path'
import { fileURLToPath } from 'node:url'
import { createServer } from 'vite'

const __dirname = path.dirname(fileURLToPath(import.meta.url))
const toAbsolute = (p) => path.resolve(__dirname, p)

async function prerender() {
  const vite = await createServer({
    server: { middlewareMode: true },
    appType: 'custom'
  })

  const template = fs.readFileSync(toAbsolute('dist/index.html'), 'utf-8')
  
  const { render } = await vite.ssrLoadModule('/src/entry-server.tsx')
  
  const appHtml = render()
  
  const html = template.replace('<!--app-html-->', appHtml)
  
  fs.writeFileSync(toAbsolute('dist/index.html'), html)

  // Machine-readable versions of the same content (agents / search engines)
  const { generateMarkdown, generateLlmsTxt, generateSitemap } = await vite.ssrLoadModule('/src/util/generateMarkdown.ts')
  fs.writeFileSync(toAbsolute('dist/index.md'), generateMarkdown())
  fs.writeFileSync(toAbsolute('dist/llms.txt'), generateLlmsTxt())
  fs.writeFileSync(toAbsolute('dist/sitemap.xml'), generateSitemap())
  
  await vite.close()
  console.log('Prerender complete.')
}

prerender()
