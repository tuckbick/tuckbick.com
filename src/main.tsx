import { StrictMode } from 'react'
import { createRoot, hydrateRoot } from 'react-dom/client'
import './index.css'
import App from './App.tsx'

const rootElement = document.getElementById('root')!

if (rootElement.innerHTML === '<!--app-html-->' || rootElement.innerHTML === '') {
  createRoot(rootElement).render(
    <StrictMode>
      <App />
    </StrictMode>,
  )
} else {
  hydrateRoot(rootElement,
    <StrictMode>
      <App />
    </StrictMode>,
  )
}