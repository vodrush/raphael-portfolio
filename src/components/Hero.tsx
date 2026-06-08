import { useRef } from 'react';
import { FaGithub, FaLinkedin } from 'react-icons/fa';

const Hero = () => {
  const h1Ref = useRef<HTMLHeadingElement>(null);
  const h2Ref = useRef<HTMLHeadingElement>(null);
  const pRef = useRef<HTMLParagraphElement>(null);
  const buttonsRef = useRef<HTMLDivElement>(null);
  const imageRef = useRef<HTMLDivElement>(null);

  return (
    <section id="hero" className="hero">
      <div className="hero-text">
        <h1 ref={h1Ref} data-gsap="hero-h1">Raphael Santiago</h1>
        <h2 ref={h2Ref} data-gsap="hero-h2">Dev Web Full-Stack & IA</h2>
        <p ref={pRef} data-gsap="hero-p">
          Passionné par le développement web et l'IA, je crée des applications modernes avec React, Node.js et Python.
          J'aime transformer des idées en projets concrets.
        </p>
        <div className="hero-buttons" ref={buttonsRef} data-gsap="hero-buttons">
          <a href="#projects" className="cta-button">Découvrir mes projets</a>
          <a href="#contact" className="cta-button">Me contacter</a>
          <div className="hero-socials" data-gsap="hero-socials">
            <a href="https://github.com/vodrush" target="_blank" rel="noopener noreferrer" aria-label="Voir mon profil GitHub"><FaGithub /></a>
            <a href="https://www.linkedin.com/in/raphael-santiago-7b80961b5/" target="_blank" rel="noopener noreferrer" aria-label="Voir mon profil LinkedIn"><FaLinkedin /></a>
          </div>
        </div>
      </div>
      <div className="hero-image-container" ref={imageRef} data-gsap="hero-image">
        <img src="/raphchill.webp" alt="Raphael Santiago - Développeur Full-Stack & IA" className="raphael-image" width="300" height="300" loading="eager" />
      </div>
    </section>
  );
};

export default Hero;
