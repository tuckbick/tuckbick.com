import { useEffect, useState } from 'react'
import './App.css'
import Projects from './content/Projects/Projects';
import Work from './content/Work/Work';
import Contact from './content/Contact/Contact';

function App() {

  const [faviconIdx, setFaviconIdx] = useState(0)
  useEffect(() => {
    const favicon = document.querySelector<HTMLLinkElement>("link[rel*='icon']");
    if (favicon) {
      favicon.href = '/favicon' + faviconIdx + '.svg';
    }

    const interval = setInterval(() => {
      setFaviconIdx((prev) => (prev + 1) % 3)
    }, 1000)
    return () => clearInterval(interval)
  }, [faviconIdx])

  return (
    <>
      <header>
        <h1>Tucker Bickler</h1>
        <nav aria-label="main navigation">
          <ul>
            <li><a href="#projects">projects</a></li>
            <li><a href="#work">work</a></li>
            <li><a href="#contact">contact</a></li>
          </ul>
        </nav>
      </header>

      <Projects />

      <Work />

      <Contact />

    </>
  )
}

export default App
