
import React from 'react';
import { useInView } from 'react-intersection-observer';

const About = () => {
  const { ref, inView } = useInView({
    triggerOnce: true,
    threshold: 0.1,
  });

  return (
    <section id="about" className="about" ref={ref}>
      <div className={`section-title-container ${inView ? 'is-visible' : ''}`}>
        <h2>À Propos de Moi</h2>
      </div>
      <div className={`about-content ${inView ? 'is-visible' : ''}`}>
        <p>
          Passionné par la création d'expériences numériques fluides et intuitives, je me spécialise dans la transformation de concepts en applications web performantes. Mon approche est centrée sur l'utilisateur et guidée par un code propre et maintenable. J'aime résoudre des problèmes complexes et apprendre continuellement dans cet écosystème technologique en constante évolution.
        </p>
      </div>
    </section>
  );
};

export default About;
