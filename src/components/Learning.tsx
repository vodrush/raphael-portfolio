const learningTopics = [
  "Intelligence Artificielle & Machine Learning",
  "Optimisation des perfs web",
  "Sécurité des applications",
];

const Learning = () => {
  return (
    <section id="learning" className="learning">
      <div className="section-title-container" data-gsap="section-title">
        <h2>Apprentissage Continu</h2>
      </div>
      <div className="learning-content" data-gsap="learning-content">
        <p>Exploration active de nouvelles technologies et domaines :</p>
        <ul className="learning-list">
          {learningTopics.map((topic, index) => (
            <li key={index} className="learning-item" data-gsap="learning-item">
              {topic}
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
};

export default Learning;
