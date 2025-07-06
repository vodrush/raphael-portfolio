import React from 'react';
import { useInView } from 'react-intersection-observer';

const Learning = () => {
  const { ref, inView } = useInView({
    triggerOnce: true,
    threshold: 0.1,
  });

  const learningTopics = [
    "WebAssembly (Wasm)",
    "Rust (pour le développement web et systèmes)",
    "Intelligence Artificielle (Machine Learning & LLMs)",
    "Optimisation des performances web avancée",
    "Sécurité des applications web",
  ];

  return (
    <section id="learning" className="learning" ref={ref}>
      <div className={`section-title-container ${inView ? 'is-visible' : ''}`}>
        <h2>Veille Technologique & Apprentissage</h2>
      </div>
      <div className={`learning-content ${inView ? 'is-visible' : ''}`}>
        <p>Je suis constamment en quête de nouvelles connaissances et technologies. Voici quelques domaines que j'explore activement en ce moment :</p>
        <ul className="learning-list">
          {learningTopics.map((topic, index) => (
            <li key={index} className="learning-item" style={{ transitionDelay: `${index * 0.1}s` }}>
              {topic}
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
};

export default Learning;