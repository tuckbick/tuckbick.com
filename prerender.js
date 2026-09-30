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

  const template = fs.readFileSync(toAbsolute('dist/client/index.html'), 'utf-8')
  
  const { render } = await vite.ssrLoadModule('/src/entry-server.tsx')
  
  const appHtml = render()
  
  const html = template.replace('<!--app-html-->', appHtml)
  
  fs.writeFileSync(toAbsolute('dist/client/index.html'), html)
  
  await vite.close()
  console.log('Prerender complete.')
}

prerender()
