
import React from 'react';
import { FaGithub, FaLinkedin } from 'react-icons/fa';


const Hero = () => {
  return (
    <section id="hero" className="hero">
      <div className="hero-text">
        <h1 className="fade-in-down">Raphael Santiago</h1>
        <h2 className="fade-in-down-delay-1">Développeur Web | Je transforme des idées en expériences numériques interactives.</h2>
        <p className="fade-in-down-delay-2">Bienvenue sur mon portfolio. Vous avez vu mon parcours, découvrez maintenant comment je mets mes compétences en action à travers mes projets.</p>
        <div className="hero-buttons fade-in-down-delay-3">
          <a href="#projects" className="cta-button pulse">Voir mes projets</a>
          <div className="hero-socials">
            <a href="https://github.com/vodrush" target="_blank" rel="noopener noreferrer" aria-label="Voir mon profil GitHub"><FaGithub /></a>
            <a href="https://www.linkedin.com/in/raphael-santiago-7b80961b5/" target="_blank" rel="noopener noreferrer" aria-label="Voir mon profil LinkedIn"><FaLinkedin /></a>
          </div>
        </div>
      </div>
      <div className="hero-image-container">
        <img src="/raphchill.webp" alt="Raphael Santiago" className="raphael-image" width="300" height="300" />
      </div>
    </section>
  );
};

export default Hero;
