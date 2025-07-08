import React from 'react';
import { useInView } from 'react-intersection-observer';
import { FaGithub, FaExternalLinkAlt } from 'react-icons/fa';

const ProjectCard = ({ project, index }) => {
  const { ref, inView } = useInView({
    triggerOnce: false, // L'animation se redéclenchera
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
    triggerOnce: false, // L'animation se redéclenchera
    threshold: 0.1,
  });

  const projects = [
    {
      title: "Kasa - Plateforme Immobilière",
      challenge: "Développer l'interface front-end complète d'une application de location en React, sans API back-end disponible, en suivant des maquettes Figma précises.",
      solution: "J'ai construit une Single-Page Application avec React et React Router, offrant une expérience utilisateur fluide et sans rechargement. J'ai développé des composants réutilisables (galerie, fiches logement, collapses animés) pour assurer une maintenance facile et une cohérence visuelle parfaite avec les maquettes Figma.",
      techStack: ["React", "React Router", "Sass", "JavaScript (ES6+)"],
      links: [
        { type: "github", text: "Voir le code", url: "https://github.com/vodrush/Projet-5" }
      ]
    },
    {
      title: "Mon Vieux Grimoire - API Back-end",
      challenge: "Créer l'API back-end complète pour un site de notation de livres, incluant l'authentification, la gestion des livres et l'upload d'images, avec une contrainte d'optimisation des images (Green Code).",
      solution: "J'ai développé une API RESTful sécurisée avec Node.js et Express. J'ai mis en place une authentification JWT robuste et des routes CRUD pour une gestion complète des livres. Le point clé de ce projet est l'optimisation d'images en temps réel avec Sharp, qui a permis de réduire le poids des images de plus de 70%, améliorant ainsi considérablement les performances et l'éco-responsabilité du site (Green Code).",
      techStack: ["Node.js", "Express", "MongoDB", "JWT", "Multer", "Sharp"],
      links: [
        { type: "github", text: "Voir le code", url: "https://github.com/vodrush/Projet-7" }
      ]
    },
    {
      title: "Portfolio Architecte Sophie Bluel",
      challenge: "Développer le site portfolio d'une architecte d'intérieur, en intégrant des maquettes Figma et en gérant les interactions dynamiques avec une API.",
      solution: "J'ai implémenté l'interface utilisateur en HTML, CSS et JavaScript, en assurant une consommation fiable de l'API pour afficher les projets. J'ai également développé la fonctionnalité de connexion de l'administrateur, permettant une gestion de contenu dynamique et sécurisée.",
      techStack: ["HTML5", "CSS3", "JavaScript", "API REST"],
      links: [
        { type: "github", text: "Voir le code", url: "https://github.com/vodrush/Projet-3" }
      ]
    },
    {
      title: "Booki - Intégration d'une maquette",
      challenge: "Transformer une maquette Figma en un site web statique, responsive et fidèle au design original.",
      solution: "J'ai développé l'interface en utilisant HTML5 pour la structure sémantique et CSS3 pour le style, garantissant une compatibilité parfaite sur tous les appareils (responsive design) et une fidélité absolue au design original de Figma.",
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
