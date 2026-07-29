import { FaGithub, FaLinkedin } from 'react-icons/fa';

const Hero = () => {
  return (
    <section id="hero" className="hero">
      <div className="hero-left">
        <div className="hero-tagline">Développeur Web Full-Stack</div>
        <h1 className="hero-title">
          Crafting<br />
          <span className="hero-accent">Digital</span> Experiences
        </h1>
        <p className="hero-name">Raphael Santiago</p>
        <p className="hero-desc">
          Je crée des applications web modernes et performantes avec React, TypeScript et Node.js.
          Du design au déploiement, chaque détail compte.
        </p>
        <div className="hero-buttons">
          <a href="#projects" className="cta-button primary">
            Voir les projets
            <span aria-hidden="true">→</span>
          </a>
          <a href="#contact" className="cta-button">
            Me contacter
          </a>
          <div className="hero-socials">
            <a href="https://github.com/vodrush" target="_blank" rel="noopener noreferrer" aria-label="GitHub">
              <FaGithub />
            </a>
            <a href="https://www.linkedin.com/in/raphael-santiago-7b80961b5/" target="_blank" rel="noopener noreferrer" aria-label="LinkedIn">
              <FaLinkedin />
            </a>
          </div>
        </div>
      </div>
      <div className="hero-right">
        <div className="avatar-wrapper">
          <div className="avatar-glow" aria-hidden="true"></div>
          <img
            src="/raphchill.webp"
            alt="Raphael Santiago"
            className="raphael-image"
            width="300"
            height="300"
            loading="eager"
          />
        </div>
      </div>
    </section>
  );
};

export default Hero;
