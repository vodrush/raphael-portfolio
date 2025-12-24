import { FC, MouseEvent } from 'react';

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
    <header className="sticky top-0 w-full z-50 px-8 py-4 transition-all duration-300 backdrop-blur-md bg-opacity-80 dark:bg-[#1f1c2c]/70 dark:border-b dark:border-[#b3aedb]/20 dark:shadow-md bg-[#f1f3f5]/80 border-b border-[#34495e]/20 shadow-sm">
      <div className="max-w-7xl mx-auto flex justify-between items-center">
        <div className="logo">
          <a
            href="#hero"
            onClick={(e) => smoothScroll(e, 'hero')}
            className="font-poppins text-2xl font-bold text-[#2c3e50] dark:text-[#f1f3f5] hover:opacity-80 transition-opacity duration-300"
          >
            Raphael Santiago
          </a>
        </div>
        <nav className="flex-grow flex justify-center">
          <ul className="flex gap-10 m-0 p-0 list-none">
            {['About', 'Skills', 'Projects', 'Contact'].map((item) => (
              <li key={item}>
                <a
                  href={`#${item.toLowerCase()}`}
                  onClick={(e) => smoothScroll(e, item.toLowerCase())}
                  className="relative font-roboto text-base font-medium pb-2 text-[#2c3e50] dark:text-[#b3aedb] hover:text-[#e74c3c] dark:hover:text-[#f8f9fa] transition-colors duration-300 group"
                >
                  {item === 'About' ? 'À propos' : item === 'Skills' ? 'Compétences' : item === 'Projects' ? 'Projets' : item}
                  <span className="absolute bottom-0 left-1/2 w-0 h-0.5 bg-[#e74c3c] dark:bg-[#f1f3f5] transition-all duration-300 transform -translate-x-1/2 group-hover:w-full"></span>
                </a>
              </li>
            ))}
          </ul>
        </nav>
        <button
          onClick={toggleTheme}
          className="ml-8 p-2 rounded-full hover:bg-black/5 dark:hover:bg-white/10 transition-colors focus:outline-none"
          aria-label="Changer le thème"
        >
          {theme === 'dark' ? (
            <FaMoon className="text-xl text-[#f1f3f5]" />
          ) : (
            <FaSun className="text-xl text-[#f39c12]" />
          )}
        </button>
      </div>
    </header>
  );
};

export default Header;