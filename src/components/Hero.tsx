import { motion } from 'framer-motion';
import { FaGithub, FaLinkedin } from 'react-icons/fa';

const Hero = () => {
  return (
    <section id="hero" className="flex flex-col-reverse md:flex-row items-center justify-between min-h-screen px-8 py-16 pt-24 max-w-7xl mx-auto overflow-hidden">
      <motion.div
        initial={{ opacity: 0, x: -50 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ duration: 0.8, ease: "easeOut" }}
        className="flex-1 text-center md:text-left z-10"
      >
        <motion.h1
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2, duration: 0.8 }}
          className="text-4xl md:text-6xl font-bold mb-4 font-poppins text-[#2c3e50] dark:text-[#f1f3f5]"
        >
          Raphael Santiago
        </motion.h1>

        <motion.h2
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4, duration: 0.8 }}
          className="text-2xl md:text-3xl font-medium mb-6 text-[#7f8c8d] dark:text-[#b3aedb]"
        >
          Dev Web Full-Stack & IA
        </motion.h2>

        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.6, duration: 0.8 }}
          className="text-lg mb-8 max-w-lg mx-auto md:mx-0 text-[#34495e] dark:text-[#d1d5db]"
        >
          Passionné par le développement web et l'IA, je crée des applications modernes avec React, Node.js et Python.
          J'aime transformer des idées en projets concrets.
        </motion.p>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.8, duration: 0.8 }}
          className="flex flex-col sm:flex-row sm:items-center gap-4 justify-center md:justify-start"
        >
          <motion.a
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            href="#projects"
            className="px-6 py-3 rounded-full bg-[#e74c3c] text-white font-semibold shadow-lg hover:bg-[#c0392b] transition-colors"
          >
            Découvrir mes projets
          </motion.a>
          <motion.a
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            href="#contact"
            className="px-6 py-3 rounded-full border-2 border-[#e74c3c] text-[#e74c3c] dark:text-[#f1f3f5] dark:border-[#f1f3f5] font-semibold hover:bg-[#e74c3c] hover:text-white dark:hover:bg-[#f1f3f5] dark:hover:text-[#2c3e50] transition-colors"
          >
            Me contacter
          </motion.a>
          <div className="flex gap-4 mt-4 sm:mt-0 sm:ml-4 text-2xl text-[#2c3e50] dark:text-[#f1f3f5]">
            <motion.a whileHover={{ y: -3, color: "#e74c3c" }} href="https://github.com/vodrush" target="_blank" rel="noopener noreferrer" aria-label="Voir mon profil GitHub" className="transition-colors"><FaGithub /></motion.a>
            <motion.a whileHover={{ y: -3, color: "#0077b5" }} href="https://www.linkedin.com/in/raphael-santiago-7b80961b5/" target="_blank" rel="noopener noreferrer" aria-label="Voir mon profil LinkedIn" className="transition-colors"><FaLinkedin /></motion.a>
          </div>
        </motion.div>
      </motion.div>

      <motion.div
        initial={{ opacity: 0, scale: 0.8 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.8 }}
        className="flex-1 flex justify-center items-center relative z-10 mb-8 md:mb-0"
      >
        <motion.img
          animate={{ y: [-10, 10, -10] }}
          transition={{ duration: 6, repeat: Infinity, ease: "easeInOut" }}
          src="/raphchill.webp"
          alt="Raphael Santiago - Développeur IA"
          className="w-64 h-64 md:w-80 md:h-80 object-cover rounded-full shadow-2xl border-4 border-white dark:border-[#2c3e50]"
          width="300"
          height="300"
          loading="eager"
        />
      </motion.div>
    </section>
  );
};

export default Hero;
