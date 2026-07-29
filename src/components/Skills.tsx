import { ReactNode } from 'react';
import { useInView } from 'react-intersection-observer';
import { FaReact, FaNodeJs, FaHtml5, FaSass, FaGithub, FaFigma, FaPython } from 'react-icons/fa';
import { DiJavascript1, DiMongodb } from 'react-icons/di';
import { SiExpress, SiJsonwebtokens, SiTypescript } from 'react-icons/si';
import { MdDevices, MdSpeed, MdWeb } from 'react-icons/md';

interface Skill {
  name: string;
  icon: ReactNode;
}

const Skills = () => {
  const { ref, inView } = useInView({ triggerOnce: false, threshold: 0.1 });

  const skills: Record<string, Skill[]> = {
    'Front-End': [
      { name: 'React', icon: <FaReact /> },
      { name: 'JavaScript (ES6+)', icon: <DiJavascript1 /> },
      { name: 'HTML5', icon: <FaHtml5 /> },
      { name: 'CSS3/Sass', icon: <FaSass /> },
      { name: 'Responsive Design', icon: <MdDevices /> },
    ],
    'Back-End': [
      { name: 'Node.js', icon: <FaNodeJs /> },
      { name: 'Express', icon: <SiExpress /> },
      { name: 'MongoDB', icon: <DiMongodb /> },
      { name: 'JWT', icon: <SiJsonwebtokens /> },
      { name: 'API REST', icon: <MdWeb /> },
    ],
    'Langages & Outils': [
      { name: 'Python', icon: <FaPython /> },
      { name: 'Git/GitHub', icon: <FaGithub /> },
      { name: 'Figma', icon: <FaFigma /> },
      { name: 'SEO', icon: <MdSpeed /> },
      { name: 'TypeScript', icon: <SiTypescript /> },
    ],
  };

  return (
    <section id="skills" className="skills" ref={ref}>
      <div className={`section-title-container ${inView ? 'is-visible' : ''}`}>
        <div className="section-header">
          <div className="section-tag">Expertise</div>
          <h2 className="section-title">Compétences</h2>
          <p className="section-desc">
            Les outils et technologies que j'utilise au quotidien pour construire des applications solides.
          </p>
        </div>
      </div>
      <div className={`skills-container ${inView ? 'is-visible' : ''}`}>
        {Object.entries(skills).map(([category, items]) => (
          <div key={category} className="skills-category" role="group" aria-labelledby={`skill-${category.toLowerCase().replace(/\s+/g, '-')}`}>
            <h3 id={`skill-${category.toLowerCase().replace(/\s+/g, '-')}`}>{category}</h3>
            <div className="skills-list">
              {items.map((skill) => (
                <div key={skill.name} className="skill-item">
                  <span className="skill-icon">{skill.icon}</span>
                  {skill.name}
                </div>
              ))}
            </div>
          </div>
        ))}
      </div>
    </section>
  );
};

export default Skills;
