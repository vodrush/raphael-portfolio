import { FaGithub, FaLinkedin } from 'react-icons/fa';
import { useInView } from 'react-intersection-observer';

const Footer = () => {
  const { ref, inView } = useInView({
    triggerOnce: true,
    threshold: 0.1,
  });

  return (
    <footer className={`footer ${inView ? 'is-visible' : ''}`} ref={ref}>
      <div className="footer-socials">
        <a href="https://github.com/vodrush" target="_blank" rel="noopener noreferrer" aria-label="Voir mon profil GitHub">
          <FaGithub />
        </a>
        <a href="https://www.linkedin.com/in/raphael-santiago-7b80961b5/" target="_blank" rel="noopener noreferrer" aria-label="Voir mon profil LinkedIn">
          <FaLinkedin />
        </a>
      </div>
      <p>&copy; {new Date().getFullYear()} Raphael Santiago. Tous droits réservés.</p>
      <p>Développé avec passion et React.</p>
    </footer>
  );
};

export default Footer;