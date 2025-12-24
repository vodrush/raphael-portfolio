import React, { useState, useEffect, lazy, Suspense, useRef } from 'react';
import './index.css';

import Hero from './components/Hero';
import ScrollToTopButton from './components/ScrollToTopButton';
import { FaMoon, FaSun } from 'react-icons/fa';
import InteractiveBubbles from './components/InteractiveBubbles';
import ScrollProgressIndicator from './components/ScrollProgressIndicator';
import Footer from './components/Footer';
import SnowEffect from './components/SnowEffect';
import ChristmasGarland from './components/ChristmasGarland';

const About = lazy(() => import('./components/About'));
const Skills = lazy(() => import('./components/Skills'));
const Projects = lazy(() => import('./components/Projects'));
const Contact = lazy(() => import('./components/Contact'));
const Learning = lazy(() => import('./components/Learning'));

function App() {
  const [theme, setTheme] = useState('dark');
  const [isChristmasMode, setIsChristmasMode] = useState(false);
  const mainRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    document.body.className = theme + '-mode';
  }, [theme]);

  const toggleTheme = () => {
    setTheme((prevTheme) => (prevTheme === 'dark' ? 'light' : 'dark'));
  };

  const toggleChristmasMode = () => {
    setIsChristmasMode(!isChristmasMode);
  };

  return (
    <div className="App" style={{ position: 'relative' }}>
      {isChristmasMode && (
        <>
          <SnowEffect />
          <ChristmasGarland />
        </>
      )}
      <ScrollProgressIndicator />
      <InteractiveBubbles mainRef={mainRef as React.RefObject<HTMLDivElement>} />

      <div className="fixed top-5 right-5 z-[1000] flex gap-4">
        <button
          onClick={toggleChristmasMode}
          className={`theme-toggle-button !static !m-0 ${isChristmasMode ? 'bg-red-500/20 border-red-500' : ''}`}
          aria-label="Activer le mode Noël"
          title={isChristmasMode ? "Désactiver Noël" : "Activer Noël"}
        >
          <span style={{ fontSize: '24px' }}>🎄</span>
        </button>

        <button onClick={toggleTheme} className="theme-toggle-button !static !m-0" aria-label="Changer le thème">
          <FaMoon className={`theme-icon moon-icon ${theme === 'dark' ? 'visible' : 'hidden'}`} />
          <FaSun className={`theme-icon sun-icon ${theme === 'light' ? 'visible' : 'hidden'}`} />
        </button>
      </div>
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
