import React, { useState, useEffect, lazy, Suspense, useRef } from 'react';
import './index.css';

import Navbar from './components/Navbar';
import Hero from './components/Hero';
import ScrollToTopButton from './components/ScrollToTopButton';
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
  const [theme, setTheme] = useState(() => {
    if (typeof window !== 'undefined') {
      const stored = localStorage.getItem('theme');
      if (stored) return stored;
      const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
      return prefersDark ? 'dark' : 'light';
    }
    return 'dark';
  });

  const mainRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    document.body.className = theme + '-mode';
    localStorage.setItem('theme', theme);
  }, [theme]);

  const toggleTheme = () => {
    setTheme((prev) => (prev === 'dark' ? 'light' : 'dark'));
  };

  return (
    <div className="App" style={{ position: 'relative' }}>
      <ScrollProgressIndicator />
      <Navbar theme={theme} toggleTheme={toggleTheme} />
      <InteractiveBubbles mainRef={mainRef as React.RefObject<HTMLDivElement>} />
      <ScrollAnimations>
        <main ref={mainRef} id="main-content">
          <a href="#main-content" className="skip-link">Aller au contenu principal</a>
          <Hero />
          <Suspense fallback={<div className="section-header" style={{ padding: '100px 0', textAlign: 'center' }}>Chargement...</div>}>
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
