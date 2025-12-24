import React from 'react';
import { useInView } from 'react-intersection-observer';

const About = () => {
  const { ref, inView } = useInView({
    triggerOnce: false,
    threshold: 0.1,
  });

  return (
    <section id="about" className="about" ref={ref}>
      <div className={`section-title-container ${inView ? 'is-visible' : ''}`}>
        <h2>À Propos de Moi</h2>
      </div>
      <div className={`about-content ${inView ? 'is-visible' : ''}`}>
        <p>
          Développeur web passionné avec un intérêt croissant pour l'Intelligence Artificielle, 
          je crée des applications qui résolvent des problèmes concrets.
        </p>
        <p>
          Maîtrise du <strong>développement Full-Stack</strong> (React, Node.js, MongoDB) et formation en cours sur l'<strong>IA avec Python</strong>. 
          Chaque projet est une opportunité d'apprentissage.
        </p>
        <p>
          Mon approche : code propre, expérience utilisateur optimale, et amélioration continue. 
          Curieux et toujours prêt à explorer de nouvelles technologies.
        </p>
      </div>
    </section>
  );
};

export default About;