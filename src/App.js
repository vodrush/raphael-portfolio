import React, { useState, useEffect, lazy, Suspense, useRef } from 'react';
import './index.css';

import Hero from './components/Hero';
import ScrollToTopButton from './components/ScrollToTopButton';
import { FaMoon, FaSun } from 'react-icons/fa';
import InteractiveBubbles from './components/InteractiveBubbles';
import ScrollProgressIndicator from './components/ScrollProgressIndicator';
import Footer from './components/Footer';

const About = lazy(() => import('./components/About'));
const Skills = lazy(() => import('./components/Skills'));
const Projects = lazy(() => import('./components/Projects'));
const Contact = lazy(() => import('./components/Contact'));
const Learning = lazy(() => import('./components/Learning'));

function App() {
  const [theme, setTheme] = useState('dark');
  const mainRef = useRef(null);

  useEffect(() => {
    document.body.className = theme + '-mode';
  }, [theme]);

  const toggleTheme = () => {
    setTheme((prevTheme) => (prevTheme === 'dark' ? 'light' : 'dark'));
  };

  return (
    <div className="App">
      <ScrollProgressIndicator />
      <InteractiveBubbles mainRef={mainRef} />
      <button onClick={toggleTheme} className="theme-toggle-button" aria-label="Changer le thème">
        <FaMoon className={`theme-icon moon-icon ${theme === 'dark' ? 'visible' : 'hidden'}`} />
        <FaSun className={`theme-icon sun-icon ${theme === 'light' ? 'visible' : 'hidden'}`} />
      </button>
      <main ref={mainRef}>
        <Hero />
        <Suspense fallback={<div>Chargement...</div>}>
          <About />
          <Skills />
          <Projects />
          <Learning />
          <Contact />
        </Suspense>
      </main>
      <ScrollToTopButton />
      <Footer />
    </div>
  );
}

export default App;
