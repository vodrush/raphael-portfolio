import { FC } from 'react';
import { motion } from 'framer-motion';
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

const ProjectCard: FC<ProjectCardProps> = ({ project }) => {
  const cardVariants = {
    hidden: { opacity: 0, y: 50 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.6 }
    }
  };

  return (
    <motion.article
      variants={cardVariants}
      whileHover={{ y: -10, transition: { duration: 0.3 } }}
      className="bg-white/60 dark:bg-[#2a263c]/50 backdrop-blur-md border border-[#34495e]/10 dark:border-white/10 rounded-2xl p-8 flex flex-col hover:shadow-2xl dark:hover:border-[#b3aedb]/50 h-full"
    >
      <h3 className="text-2xl font-bold mb-4 text-[#2c3e50] dark:text-[#f1f3f5]">{project.title}</h3>

      <h4 className="text-sm font-bold uppercase tracking-wider text-[#e74c3c] dark:text-[#b3aedb] mt-4 mb-2">Le Défi</h4>
      <p className="text-[#34495e] dark:text-[#d1d5db] mb-4 flex-grow">{project.challenge}</p>

      <h4 className="text-sm font-bold uppercase tracking-wider text-[#e74c3c] dark:text-[#b3aedb] mt-2 mb-2">La Solution</h4>
      <p className="text-[#34495e] dark:text-[#d1d5db] mb-6 flex-grow">{project.solution}</p>

      <div className="flex flex-wrap gap-2 mb-8">
        {project.techStack.map((tech, i) => (
          <span key={i} className="bg-[#34495e]/10 dark:bg-[#b3aedb]/10 text-[#2c3e50] dark:text-[#b3aedb] px-3 py-1 rounded-full text-sm font-medium border border-[#34495e]/20 dark:border-[#b3aedb]/20">{tech}</span>
        ))}
      </div>

      <div className="flex gap-4 mt-auto">
        {project.links.map((link, i) => (
          <a
            key={i}
            href={link.url}
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-2 px-5 py-2 border-2 border-[#e74c3c] dark:border-[#b3aedb] text-[#e74c3c] dark:text-[#b3aedb] rounded-md font-bold hover:bg-[#e74c3c] hover:text-white dark:hover:bg-[#b3aedb] dark:hover:text-[#1f1c2c] transition-all duration-300"
          >
            {link.type === 'github' ? <FaGithub /> : <FaExternalLinkAlt />}
            {link.text}
          </a>
        ))}
      </div>
    </motion.article>
  );
};

const Projects = () => {
  const { ref, inView } = useInView({
    triggerOnce: true,
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

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2
      }
    }
  };

  return (
    <section id="projects" className="py-24 px-8 max-w-7xl mx-auto" ref={ref}>
      <motion.div
        className="text-center mb-16"
        initial={{ opacity: 0, y: -20 }}
        animate={inView ? { opacity: 1, y: 0 } : { opacity: 0, y: -20 }}
        transition={{ duration: 0.6 }}
      >
        <h2 className="text-4xl font-bold relative inline-block text-[#2c3e50] dark:text-[#b3aedb] after:content-[''] after:absolute after:-bottom-2 after:left-1/2 after:-translate-x-1/2 after:w-16 after:h-1 after:bg-[#e74c3c] dark:after:bg-[#b3aedb]">Mes Projets</h2>
      </motion.div>

      <motion.div
        className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 gap-10"
        variants={containerVariants}
        initial="hidden"
        animate={inView ? "visible" : "hidden"}
      >
        {projects.map((project, index) => (
          <ProjectCard key={index} project={project} index={index} />
        ))}
      </motion.div>
    </section>
  );
};

export default Projects;
