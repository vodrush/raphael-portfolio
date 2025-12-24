import { motion } from 'framer-motion';
import { useInView } from 'react-intersection-observer';

const About = () => {
  const { ref, inView } = useInView({
    triggerOnce: true, // Only trigger once for a smoother experience
    threshold: 0.2,
  });

  const variants = {
    hidden: { opacity: 0, y: 30 },
    visible: { opacity: 1, y: 0 },
  };

  return (
    <section id="about" className="py-24 px-8 max-w-4xl mx-auto text-center" ref={ref}>
      <motion.div
        initial="hidden"
        animate={inView ? "visible" : "hidden"}
        transition={{ duration: 0.8 }}
        variants={variants}
      >
        <h2 className="text-4xl font-bold mb-12 relative inline-block text-[#2c3e50] dark:text-[#b3aedb] after:content-[''] after:absolute after:-bottom-2 after:left-1/2 after:-translate-x-1/2 after:w-16 after:h-1 after:bg-[#e74c3c] dark:after:bg-[#b3aedb]">À Propos de Moi</h2>
      </motion.div>

      <motion.div
        className="space-y-6 text-lg text-[#34495e] dark:text-[#d1d5db] leading-relaxed"
        initial="hidden"
        animate={inView ? "visible" : "hidden"}
        transition={{ duration: 0.8, delay: 0.2 }}
        variants={variants}
      >
        <p className="max-w-3xl mx-auto">
          Développeur web passionné avec un intérêt croissant pour l'Intelligence Artificielle,
          je crée des applications qui résolvent des problèmes concrets.
        </p>
        <p className="max-w-3xl mx-auto">
          Maîtrise du <strong>développement Full-Stack</strong> (React, Node.js, MongoDB) et formation en cours sur l'<strong>IA avec Python</strong>.
          Chaque projet est une opportunité d'apprentissage.
        </p>
        <p className="max-w-3xl mx-auto">
          Mon approche : code propre, expérience utilisateur optimale, et amélioration continue.
          Curieux et toujours prêt à explorer de nouvelles technologies.
        </p>
      </motion.div>
    </section>
  );
};

export default About;