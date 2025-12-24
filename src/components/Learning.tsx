import { useInView } from 'react-intersection-observer';

const Learning = () => {
  const { ref, inView } = useInView({
    triggerOnce: false,
    threshold: 0.1,
  });

  const learningTopics = [
    "Intelligence Artificielle & Machine Learning",
    "Optimisation des perfs web",
    "Sécurité des applications",
  ];

  return (
    <section id="learning" className="learning" ref={ref}>
      <div className={`section-title-container ${inView ? 'is-visible' : ''}`}>
        <h2>Apprentissage Continu</h2>
      </div>
      <div className={`learning-content ${inView ? 'is-visible' : ''}`}>
        <p>Exploration active de nouvelles technologies et domaines :</p>
        <ul className="learning-list">
          {learningTopics.map((topic, index) => (
            <li key={index} className={`learning-item ${inView ? 'is-visible' : ''}`} style={{ transitionDelay: `${index * 0.1}s` }}>
              {topic}
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
};

export default Learning;