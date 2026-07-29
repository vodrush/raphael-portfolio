import { FaGithub, FaLinkedin } from 'react-icons/fa';

const Footer = () => {
  const year = new Date().getFullYear();

  return (
    <footer className="footer">
      <div className="footer-socials">
        <a href="https://github.com/vodrush" target="_blank" rel="noopener noreferrer" aria-label="GitHub">
          <FaGithub />
        </a>
        <a href="https://www.linkedin.com/in/raphael-santiago-7b80961b5/" target="_blank" rel="noopener noreferrer" aria-label="LinkedIn">
          <FaLinkedin />
        </a>
      </div>
      <p>&copy; {year} Raphael Santiago. Tous droits réservés.</p>
      <p>
        <a href="#privacy" className="privacy-link">Politique de confidentialité</a>
      </p>
    </footer>
  );
};

export default Footer;
