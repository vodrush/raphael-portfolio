
import { FaGithub, FaLinkedin } from 'react-icons/fa';


const Hero = () => {
  return (
    <section id="hero" className="hero">
      <div className="hero-text">
        <h1 className="fade-in-down">Raphael Santiago</h1>
        <h2 className="fade-in-down-delay-1">Dev Web Full-Stack & IA</h2>
        <p className="fade-in-down-delay-2">
          Passionné par le développement web et l'IA, je crée des applications modernes avec React, Node.js et Python.
          J'aime transformer des idées en projets concrets.
        </p>
        <div className="hero-buttons fade-in-down-delay-3">
          <a href="#projects" className="cta-button pulse">Découvrir mes projets</a>
          <a href="#contact" className="cta-button">Me contacter</a>
          <div className="hero-socials">
            <a href="https://github.com/vodrush" target="_blank" rel="noopener noreferrer" aria-label="Voir mon profil GitHub"><FaGithub /></a>
            <a href="https://www.linkedin.com/in/raphael-santiago-7b80961b5/" target="_blank" rel="noopener noreferrer" aria-label="Voir mon profil LinkedIn"><FaLinkedin /></a>
          </div>
        </div>
      </div>
      <div className="hero-image-container">
        <img src="/raphchill.webp" alt="Raphael Santiago - Développeur IA" className="raphael-image" width="300" height="300" loading="eager" />
      </div>
    </section>
  );
};

export default Hero;
