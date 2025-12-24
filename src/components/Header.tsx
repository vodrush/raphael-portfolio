import { FC, MouseEvent } from 'react';
import './Header.css';
import { FaMoon, FaSun } from 'react-icons/fa';

interface HeaderProps {
  theme: string;
  toggleTheme: () => void;
}

const Header: FC<HeaderProps> = ({ theme, toggleTheme }) => {
  // Fonction pour un défilement fluide
  const smoothScroll = (e: MouseEvent<HTMLAnchorElement>, targetId: string) => {
    e.preventDefault();
    const targetElement = document.getElementById(targetId);
    if (targetElement) {
      targetElement.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <header className="site-header">
      <div className="header-content">
        <div className="logo">
          <a href="#hero" onClick={(e) => smoothScroll(e, 'hero')}>
            Raphael Santiago
          </a>
        </div>
        <nav className="main-nav">
          <ul>
            <li><a href="#about" onClick={(e) => smoothScroll(e, 'about')}>À propos</a></li>
            <li><a href="#skills" onClick={(e) => smoothScroll(e, 'skills')}>Compétences</a></li>
            <li><a href="#projects" onClick={(e) => smoothScroll(e, 'projects')}>Projets</a></li>
            <li><a href="#contact" onClick={(e) => smoothScroll(e, 'contact')}>Contact</a></li>
          </ul>
        </nav>
        <button onClick={toggleTheme} className="theme-toggle-button" aria-label="Changer le thème">
          <FaMoon className={`theme-icon moon-icon ${theme === 'dark' ? 'visible' : 'hidden'}`} />
          <FaSun className={`theme-icon sun-icon ${theme === 'light' ? 'visible' : 'hidden'}`} />
        </button>
      </div>
    </header>
  );
};

export default Header;