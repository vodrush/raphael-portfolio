import { useInView } from 'react-intersection-observer';

const About = () => {
  const { ref, inView } = useInView({ triggerOnce: false, threshold: 0.1 });

  return (
    <section id="about" className="about" ref={ref}>
      <div className={`section-title-container ${inView ? 'is-visible' : ''}`}>
        <div className="section-header">
          <div className="section-tag">À propos</div>
          <h2 className="section-title">Qui suis-je ?</h2>
        </div>
      </div>
      <div className={`about-content ${inView ? 'is-visible' : ''}`}>
        <p>
          Développeur web passionné avec un intérêt croissant pour l'Intelligence Artificielle,
          je conçois des applications qui résolvent des problèmes concrets avec une attention
          particulière à l'expérience utilisateur et à la qualité du code.
        </p>
        <p>
          Maîtrise du <strong>développement Full-Stack</strong> (React, Node.js, MongoDB) et
          exploration active de l'<strong>IA avec Python</strong>.
          Chaque projet est une opportunité d'apprentissage et de perfectionnement.
        </p>
        <p>
          Mon approche : code propre, performance, et amélioration continue.
          Curieux et toujours prêt à explorer de nouvelles technologies.
        </p>
      </div>

      {/* Stats */}
      <div className="stats-row">
        <div className="stat-item">
          <div className="stat-value">4+</div>
          <div className="stat-label">Projets livrés</div>
        </div>
        <div className="stat-item">
          <div className="stat-value">3</div>
          <div className="stat-label">Stacks maîtrisées</div>
        </div>
        <div className="stat-item">
          <div className="stat-value">Formation</div>
          <div className="stat-label">OpenClassrooms</div>
        </div>
      </div>
    </section>
  );
};

export default About;
