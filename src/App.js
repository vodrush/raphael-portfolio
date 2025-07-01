import React, { useState, useEffect } from 'react';
import './index.css';
import './theme-toggle-animation.css';
import Hero from './components/Hero';
import ScrollToTopButton from './components/ScrollToTopButton';
import { FaMoon, FaSun } from 'react-icons/fa';
import About from './components/About';
import Skills from './components/Skills';
import Projects from './components/Projects';
import Contact from './components/Contact';
import InteractiveBubbles from './components/InteractiveBubbles';

function App() {
  const [theme, setTheme] = useState('dark'); // 'dark' or 'light'

  useEffect(() => {
    document.body.className = theme + '-mode';
  }, [theme]);

  const toggleTheme = () => {
    setTheme((prevTheme) => (prevTheme === 'dark' ? 'light' : 'dark'));
  };

  return (
    <div className="App">
      <InteractiveBubbles />
      <button onClick={toggleTheme} className="theme-toggle-button">
        <FaMoon className={`theme-icon moon-icon ${theme === 'dark' ? 'visible' : 'hidden'}`} />
        <FaSun className={`theme-icon sun-icon ${theme === 'light' ? 'visible' : 'hidden'}`} />
      </button>
      <main>
        <Hero />
        <About />
        <Skills />
        <Projects />
        <Contact />
      </main>
      <ScrollToTopButton />
    </div>
  );
}

export default App;