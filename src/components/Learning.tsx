import { useInView } from 'react-intersection-observer';

const Learning = () => {
  const { ref, inView } = useInView({ triggerOnce: false, threshold: 0.1 });

  const topics = [
    "Intelligence Artificielle & Machine Learning",
    "Optimisation des performances web",
    "Sécurité des applications",
  ];

  return (
    <section id="learning" className="learning" ref={ref}>
      <div className={`section-title-container ${inView ? 'is-visible' : ''}`}>
        <div className="section-header">
          <div className="section-tag">Veille</div>
          <h2 className="section-title">Apprentissage Continu</h2>
        </div>
      </div>
      <div className={`learning-content ${inView ? 'is-visible' : ''}`}>
        <p>Exploration active de nouvelles technologies et domaines :</p>
        <ul className="learning-list">
          {topics.map((topic, index) => (
            <li
              key={index}
              className="learning-item"
              style={{ transitionDelay: `${index * 0.1}s` }}
            >
              {topic}
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
};

export default Learning;
