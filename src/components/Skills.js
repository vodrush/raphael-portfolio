
import React from 'react';
import { useInView } from 'react-intersection-observer';
import SpotlightCard from './SpotlightCard';
import { FaReact, FaNodeJs, FaHtml5, FaSass, FaGithub, FaFigma } from 'react-icons/fa';
import { DiJavascript1, DiMongodb } from 'react-icons/di';
import { SiExpress, SiJsonwebtokens } from 'react-icons/si';
import { MdDevices, MdAccessibilityNew, MdSpeed, MdWeb } from 'react-icons/md';

const Skills = () => {
  const { ref, inView } = useInView({
    triggerOnce: true,
    threshold: 0.1,
  });

  const skills = {
    'Front-End': [
      { name: 'React', icon: <FaReact /> },
      { name: 'JavaScript (ES6+)', icon: <DiJavascript1 /> },
      { name: 'HTML5', icon: <FaHtml5 /> },
      { name: 'CSS3/Sass', icon: <FaSass /> },
      { name: 'Responsive Design', icon: <MdDevices /> }
    ],
    'Back-End': [
        { name: 'Node.js', icon: <FaNodeJs /> },
        { name: 'Express', icon: <SiExpress /> },
        { name: 'MongoDB', icon: <DiMongodb /> },
        { name: 'JWT', icon: <SiJsonwebtokens /> }
    ],
    'Outils & Divers': [
        { name: 'GitHub', icon: <FaGithub /> },
        { name: 'Figma', icon: <FaFigma /> },
        { name: 'SEO', icon: <MdSpeed /> },
        { name: 'Accessibilité', icon: <MdAccessibilityNew /> },
        { name: 'HTML/CSS', icon: <MdWeb /> }
    ]
  };

  return (
    <section id="skills" className="skills" ref={ref}>
      <div className={`section-title-container ${inView ? 'is-visible' : ''}`}>
        <h2>Compétences Techniques</h2>
      </div>
      <div className={`skills-container ${inView ? 'is-visible' : ''}`}>
        {Object.keys(skills).map(category => (
          <div key={category} className="skills-category">
            <h3>{category}</h3>
            <div className="skills-list">
              {skills[category].map((skill, skillIndex) => (
                <SpotlightCard key={skill.name}>
                  <div className="skill-item" style={{ transitionDelay: `${skillIndex * 0.05}s` }}>
                    <span className="skill-icon">{skill.icon}</span>
                    {skill.name}
                  </div>
                </SpotlightCard>
              ))}
            </div>
          </div>
        ))}
      </div>
    </section>
  );
};

export default Skills;
