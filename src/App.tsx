import React, { useState, useEffect, lazy, Suspense, useRef } from 'react';
import './index.css';

import Hero from './components/Hero';
import ScrollToTopButton from './components/ScrollToTopButton';
import { FaMoon, FaSun } from 'react-icons/fa';
import InteractiveBubbles from './components/InteractiveBubbles';
import ScrollAnimations from './components/ScrollAnimations';
import ScrollProgressIndicator from './components/ScrollProgressIndicator';
import Footer from './components/Footer';

const About = lazy(() => import('./components/About'));
const Skills = lazy(() => import('./components/Skills'));
const Projects = lazy(() => import('./components/Projects'));
const Contact = lazy(() => import('./components/Contact'));
const Learning = lazy(() => import('./components/Learning'));
const PrivacyPolicy = lazy(() => import('./components/PrivacyPolicy'));

function App() {
  const [theme, setTheme] = useState('dark');
  const mainRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    document.body.className = theme + '-mode';
  }, [theme]);

  const toggleTheme = () => {
    setTheme((prevTheme) => (prevTheme === 'dark' ? 'light' : 'dark'));
  };

  return (
    <div className="App" style={{ position: 'relative' }}>
      <ScrollProgressIndicator />
      <InteractiveBubbles mainRef={mainRef as React.RefObject<HTMLDivElement>} />

      <div className="fixed top-5 right-5 z-[1000] flex gap-4">
        <button onClick={toggleTheme} className="theme-toggle-button !static !m-0" aria-label="Changer le thème">
          <FaMoon className={`theme-icon moon-icon ${theme === 'dark' ? 'visible' : 'hidden'}`} />
          <FaSun className={`theme-icon sun-icon ${theme === 'light' ? 'visible' : 'hidden'}`} />
        </button>
      </div>
      <ScrollAnimations>
      <main ref={mainRef} id="main-content">
        <a href="#main-content" className="skip-link">Aller au contenu principal</a>
        <Hero />
        <Suspense fallback={<div>Chargement...</div>}>
          <About />
          <Skills />
          <Projects />
          <Learning />
          <Contact />
          <PrivacyPolicy />
        </Suspense>
      </main>
</ScrollAnimations>
      <ScrollToTopButton />
      <Footer />
    </div>
  );
}

export default App;
