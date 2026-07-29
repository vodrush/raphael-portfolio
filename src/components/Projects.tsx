import { FC, useRef, MouseEvent } from 'react';
import { useInView } from 'react-intersection-observer';
import { FaGithub, FaExternalLinkAlt } from 'react-icons/fa';

interface Project {
  title: string;
  challenge: string;
  solution: string;
  techStack: string[];
  links: { type: string; text: string; url: string }[];
}

interface ProjectCardProps {
  project: Project;
  index: number;
}

const ProjectCard: FC<ProjectCardProps> = ({ project, index }) => {
  const { ref: inViewRef, inView } = useInView({ triggerOnce: false, threshold: 0.1 });
  const cardRef = useRef<HTMLDivElement>(null);

  const handleMouseMove = (e: MouseEvent<HTMLDivElement>) => {
    if (!cardRef.current) return;
    const rect = cardRef.current.getBoundingClientRect();
    cardRef.current.style.setProperty('--mouse-x', `${e.clientX - rect.left}px`);
    cardRef.current.style.setProperty('--mouse-y', `${e.clientY - rect.top}px`);
  };

  // Combine refs
  const setRefs = (node: HTMLDivElement | null) => {
    (inViewRef as React.RefCallback<HTMLDivElement>)(node);
    cardRef.current = node;
  };

  return (
    <article
      ref={setRefs}
      className={`project-card ${inView ? 'is-visible' : ''}`}
      style={{ transitionDelay: `${index * 0.1}s` }}
      onMouseMove={handleMouseMove}
    >
      <div className="project-num">// {(index + 1).toString().padStart(3, '0')}</div>
      <h3 className="project-title">{project.title}</h3>
      <p className="project-desc">{project.solution}</p>
      <div className="tech-stack">
        {project.techStack.map((tech, i) => (
          <span key={i} className="tech-tag">{tech}</span>
        ))}
      </div>
      <div className="project-links">
        {project.links.map((link, i) => (
          <a key={i} href={link.url} target="_blank" rel="noopener noreferrer" className="cta-button">
            {link.type === 'github' ? <FaGithub /> : <FaExternalLinkAlt />}
            {link.text}
          </a>
        ))}
      </div>
    </article>
  );
};

const Projects = () => {
  const { ref, inView } = useInView({ triggerOnce: false, threshold: 0.1 });

  const projects: Project[] = [
    {
      title: "Kasa — Plateforme Immobilière",
      challenge: "",
      solution: "SPA React complète avec galerie interactive, collapses animés et architecture modulaire. Fidélité parfaite aux maquettes Figma.",
      techStack: ["React", "React Router", "Sass"],
      links: [{ type: "github", text: "Voir le code", url: "https://github.com/vodrush/Projet-5" }]
    },
    {
      title: "Mon Vieux Grimoire — API",
      challenge: "",
      solution: "API RESTful Node.js/Express avec authentification JWT, upload optimisé Sharp (-70% poids), base MongoDB. Architecture green code.",
      techStack: ["Node.js", "Express", "MongoDB", "JWT", "Sharp"],
      links: [{ type: "github", text: "Voir le code", url: "https://github.com/vodrush/Projet-7" }]
    },
    {
      title: "Sophie Bluel — Portfolio",
      challenge: "",
      solution: "Site portfolio dynamique avec espace admin sécurisé, consommation d'API REST, interactions JavaScript vanilla.",
      techStack: ["HTML5", "CSS3", "JavaScript", "API REST"],
      links: [{ type: "github", text: "Voir le code", url: "https://github.com/vodrush/Projet-3" }]
    },
    {
      title: "Booki — Réservation",
      challenge: "",
      solution: "Intégration Figma pixel-perfect en HTML/CSS pur. Design responsive sur tous les supports.",
      techStack: ["HTML5", "CSS3", "Figma"],
      links: [{ type: "github", text: "Voir le code", url: "https://github.com/vodrush/Projet-2" }]
    }
  ];

  return (
    <section id="projects" className="projects" ref={ref}>
      <div className={`section-title-container ${inView ? 'is-visible' : ''}`}>
        <div className="section-header">
          <div className="section-tag">Portfolio</div>
          <h2 className="section-title">Projets récents</h2>
          <p className="section-desc">Des applications web complètes, du design au déploiement.</p>
        </div>
      </div>
      <div className="projects-grid">
        {projects.map((project, index) => (
          <ProjectCard key={index} project={project} index={index} />
        ))}
      </div>
    </section>
  );
};

export default Projects;
