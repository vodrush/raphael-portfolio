import { ReactNode } from 'react';
import { motion } from 'framer-motion';
import { useInView } from 'react-intersection-observer';
import { FaReact, FaNodeJs, FaHtml5, FaSass, FaGithub, FaFigma, FaPython } from 'react-icons/fa';
import { DiJavascript1, DiMongodb } from 'react-icons/di';
import { SiExpress, SiJsonwebtokens } from 'react-icons/si';
import { MdDevices, MdAccessibilityNew, MdSpeed, MdWeb } from 'react-icons/md';

const Skills = () => {
  const { ref, inView } = useInView({
    triggerOnce: true,
    threshold: 0.1,
  });

  interface Skill {
    name: string;
    icon: ReactNode;
  }

  const skills: { [key: string]: Skill[] } = {
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
      { name: 'JWT', icon: <SiJsonwebtokens /> },
      { name: 'API REST', icon: <MdWeb /> }
    ],
    'Langages & Outils': [
      { name: 'Python', icon: <FaPython /> },
      { name: 'Git/GitHub', icon: <FaGithub /> },
      { name: 'Figma', icon: <FaFigma /> },
      { name: 'SEO', icon: <MdSpeed /> },
      { name: 'Accessibilité', icon: <MdAccessibilityNew /> }
    ]
  };

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1
      }
    }
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.5 }
    }
  };

  return (
    <section id="skills" className="py-24 px-8 max-w-7xl mx-auto" ref={ref}>
      <motion.div
        className="text-center mb-16"
        initial={{ opacity: 0, y: -20 }}
        animate={inView ? { opacity: 1, y: 0 } : { opacity: 0, y: -20 }}
        transition={{ duration: 0.6 }}
      >
        <h2 className="text-4xl font-bold relative inline-block text-[#2c3e50] dark:text-[#b3aedb] after:content-[''] after:absolute after:-bottom-2 after:left-1/2 after:-translate-x-1/2 after:w-16 after:h-1 after:bg-[#e74c3c] dark:after:bg-[#b3aedb]">Compétences Techniques</h2>
      </motion.div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-12">
        {Object.keys(skills).map((category, catIndex) => (
          <motion.div
            key={category}
            className="mb-8"
            initial={{ opacity: 0, x: -20 }}
            animate={inView ? { opacity: 1, x: 0 } : { opacity: 0, x: -20 }}
            transition={{ duration: 0.6, delay: catIndex * 0.2 }}
          >
            <h3 className="text-2xl font-bold mb-6 pb-2 border-b-2 border-[#e74c3c] dark:border-[#b3aedb] text-[#2c3e50] dark:text-[#f1f3f5]">{category}</h3>
            <motion.div
              className="flex flex-wrap gap-4 justify-center md:justify-start"
              variants={containerVariants}
              initial="hidden"
              animate={inView ? "visible" : "hidden"}
            >
              {skills[category].map((skill) => (
                <motion.div
                  key={skill.name}
                  variants={itemVariants}
                  whileHover={{ scale: 1.05, translateY: -5 }}
                  className="bg-white/60 dark:bg-[#2a263c]/50 backdrop-blur-md border border-[#34495e]/10 dark:border-white/10 rounded-xl px-4 py-3 font-medium flex items-center gap-3 shadow-sm hover:shadow-lg dark:hover:border-[#b3aedb]/50 text-[#34495e] dark:text-[#d1d5db] cursor-default"
                >
                  <span className="text-2xl text-[#e74c3c] dark:text-[#b3aedb]">{skill.icon}</span>
                  {skill.name}
                </motion.div>
              ))}
            </motion.div>
          </motion.div>
        ))}
      </div>
    </section>
  );
};

export default Skills;