import React from 'react';
import { useInView } from 'react-intersection-observer';
import SpotlightCard from './SpotlightCard';

const ProjectCard = ({ project, index }) => {
  const { ref, inView } = useInView({
    triggerOnce: true, // Animate only once
    threshold: 0.1, // Trigger when 10% of the card is visible
  });

  return (
    <SpotlightCard>
      <div ref={ref} className={`project-card ${inView ? 'is-visible' : ''}`} style={{ transitionDelay: `${index * 0.1}s` }}>
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
            <a key={i} href={link.url} target="_blank" rel="noopener noreferrer" className="cta-button">{link.text}</a>
          ))}
        </div>
      </div>
    </SpotlightCard>
  );
};

const Projects = () => {
  const projects = [
    {
      title: "Kasa - Plateforme Immobilière",
      challenge: "Développer l'interface front-end complète d'une application de location en React, sans API back-end disponible, en suivant des maquettes Figma précises.",
      solution: "J'ai construit une Single-Page Application avec React et React Router. J'ai créé des composants réutilisables (galerie, fiches logement, collapses animés) et géré l'état de l'application en consommant les données depuis un fichier JSON local.",
      techStack: ["React", "React Router", "Sass", "JavaScript (ES6+)"],
      links: [
        { type: "github", text: "Voir le code", url: "https://github.com/vodrush/Projet-5" }
      ]
    },
    {
      title: "Mon Vieux Grimoire - API Back-end",
      challenge: "Créer l'API back-end complète pour un site de notation de livres, incluant l'authentification, la gestion des livres et l'upload d'images, avec une contrainte d'optimisation des images (Green Code).",
      solution: "J'ai développé une API RESTful sécurisée avec Node.js et Express. J'ai mis en place l'authentification JWT, des routes CRUD pour les livres, et un middleware avec Multer et Sharp pour gérer l'upload et l'optimisation des images en temps réel.",
      techStack: ["Node.js", "Express", "MongoDB", "JWT", "Multer", "Sharp"],
      links: [
        { type: "github", text: "Voir le code", url: "https://github.com/vodrush/Projet-7" }
      ]
    },
    {
      title: "Portfolio Architecte Sophie Bluel",
      challenge: "Développer le site portfolio d'une architecte d'intérieur, en intégrant des maquettes Figma et en gérant les interactions dynamiques avec une API.",
      solution: "J'ai implémenté l'interface utilisateur en HTML, CSS et JavaScript, en assurant la consommation de l'API pour afficher les projets et gérer les fonctionnalités de connexion/déconnexion de l'administrateur.",
      techStack: ["HTML5", "CSS3", "JavaScript", "API REST"],
      links: [
        { type: "github", text: "Voir le code", url: "https://github.com/vodrush/Projet-3" }
      ]
    },
    {
      title: "Booki - Intégration d'une maquette",
      challenge: "Transformer une maquette Figma en un site web statique, responsive et fidèle au design original.",
      solution: "J'ai développé l'interface en utilisant HTML5 pour la structure sémantique et CSS3 pour le style, en assurant une compatibilité parfaite sur ordinateur et mobile.",
      techStack: ["HTML5", "CSS3", "Figma"],
      links: [
        { type: "github", text: "Voir le code", url: "https://github.com/vodrush/Projet-2" }
      ]
    }
  ];

  return (
    <section id="projects" className="projects">
      <div className="section-title-container">
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