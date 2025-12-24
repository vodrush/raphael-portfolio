import { FC } from 'react';
import { useInView } from 'react-intersection-observer';
import { FaGithub, FaExternalLinkAlt } from 'react-icons/fa';

interface Project {
  title: string;
  challenge: string;
  solution: string;
  techStack: string[];
  links: {
    type: string;
    text: string;
    url: string;
  }[];
}

interface ProjectCardProps {
  project: Project;
  index: number;
}

const ProjectCard: FC<ProjectCardProps> = ({ project, index }) => {
  const { ref, inView } = useInView({
    triggerOnce: false,
    threshold: 0.1,
  });

  return (
    <article ref={ref} className={`project-card ${inView ? 'is-visible' : ''}`} style={{ transitionDelay: `${index * 0.1}s` }}>
      <h3>{project.title}</h3>
      <h4>Le Défi</h4>
      <p>{project.challenge}</p>
      <h4>La Solution</h4>
      <p>{project.solution}</p>
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
  const { ref, inView } = useInView({
    triggerOnce: false,
    threshold: 0.1,
  });

  const projects = [
    {
      title: "Kasa - Plateforme Immobilière",
      challenge: "Créer l'interface complète d'une app de location en React, sans back-end, en suivant des maquettes Figma.",
      solution: "J'ai construit une SPA avec React et React Router. Navigation fluide, composants réutilisables (galerie, collapses animés), et design 100% fidèle aux maquettes.",
      techStack: ["React", "React Router", "Sass", "JavaScript (ES6+)"],
      links: [
        { type: "github", text: "Voir le code", url: "https://github.com/vodrush/Projet-5" }
      ]
    },
    {
      title: "Mon Vieux Grimoire - API Back-end",
      challenge: "Développer l'API d'un site de notation de livres avec auth, upload d'images, et optimisation Green Code.",
      solution: "API RESTful avec Node.js, Express et MongoDB. Authentification JWT sécurisée. Optimisation d'images avec Sharp : -70% de poids, grosse amélioration des perfs.",
      techStack: ["Node.js", "Express", "MongoDB", "JWT", "Multer", "Sharp"],
      links: [
        { type: "github", text: "Voir le code", url: "https://github.com/vodrush/Projet-7" }
      ]
    },
    {
      title: "Portfolio Sophie Bluel",
      challenge: "Site portfolio pour architecte avec intégration Figma et interactions dynamiques via API.",
      solution: "Interface en HTML/CSS/JS vanilla. Consommation d'API pour afficher les projets. Espace admin avec connexion sécurisée pour gérer le contenu.",
      techStack: ["HTML5", "CSS3", "JavaScript", "API REST"],
      links: [
        { type: "github", text: "Voir le code", url: "https://github.com/vodrush/Projet-3" }
      ]
    },
    {
      title: "Booki - Intégration Maquette",
      challenge: "Transformer une maquette Figma en site web responsive.",
      solution: "Intégration HTML5/CSS3 pure. Responsive sur tous les devices, fidélité totale au design Figma.",
      techStack: ["HTML5", "CSS3", "Figma"],
      links: [
        { type: "github", text: "Voir le code", url: "https://github.com/vodrush/Projet-2" }
      ]
    }
  ];

  return (
    <section id="projects" className="projects" ref={ref}>
      <div className={`section-title-container ${inView ? 'is-visible' : ''}`}>
        <h2>Mes Projets</h2>
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
