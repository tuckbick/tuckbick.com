import Header from './content/Header/Header';
import Intro from './content/Intro/Intro';
import Projects from './content/Projects/Projects';
import Work from './content/Work/Work';
import Contact from './content/Contact/Contact';

import './App.css'

function App() {
  return (
    <>
      <Header />
      <main>
        <Intro />
        <Projects />
        <Work />
        <Contact />
      </main>
    </>
  )
}

export default App
