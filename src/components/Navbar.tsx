import { FaCode } from 'react-icons/fa6';
import { FaMoon, FaSun } from 'react-icons/fa';

interface NavbarProps {
  theme: string;
  toggleTheme: () => void;
}

const Navbar = ({ theme, toggleTheme }: NavbarProps) => {
  const scrollTo = (id: string) => {
    const el = document.getElementById(id);
    if (el) el.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <nav className="navbar" role="navigation" aria-label="Navigation principale">
      <div className="navbar-inner">
        <div className="logo">
          <FaCode className="logo-accent" />
          <span>Raphael</span>
          <span className="logo-accent">.</span>
        </div>
        <ul className="nav-links">
          <li><button onClick={() => scrollTo('projects')} className="nav-link">Projets</button></li>
          <li><button onClick={() => scrollTo('skills')} className="nav-link">Compétences</button></li>
          <li><button onClick={() => scrollTo('contact')} className="nav-link">Contact</button></li>
          <li>
            <button
              onClick={toggleTheme}
              className="theme-toggle"
              aria-label={theme === 'dark' ? 'Activer le mode clair' : 'Activer le mode sombre'}
            >
              {theme === 'dark' ? <FaSun /> : <FaMoon />}
            </button>
          </li>
        </ul>
      </div>
    </nav>
  );
};

export default Navbar;
