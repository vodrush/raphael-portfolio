import { FaGithub, FaLinkedin } from 'react-icons/fa';
import { useInView } from 'react-intersection-observer';

const Footer = () => {
  const { ref, inView } = useInView({
    triggerOnce: true,
    threshold: 0.1,
  });

  return (
    <footer className={`py-8 text-center bg-[#f1f3f5] dark:bg-[#1f1c2c] border-t border-[#34495e]/10 dark:border-white/5 transition-opacity duration-1000 ${inView ? 'opacity-100' : 'opacity-0'}`} ref={ref}>
      <div className="flex justify-center gap-6 mb-4 text-2xl text-[#2c3e50] dark:text-[#f1f3f5]">
        <a href="https://github.com/vodrush" target="_blank" rel="noopener noreferrer" aria-label="Voir mon profil GitHub" className="hover:text-[#e74c3c] dark:hover:text-[#b3aedb] transition-colors transform hover:scale-110">
          <FaGithub />
        </a>
        <a href="https://www.linkedin.com/in/raphael-santiago-7b80961b5/" target="_blank" rel="noopener noreferrer" aria-label="Voir mon profil LinkedIn" className="hover:text-[#0077b5] dark:hover:text-[#0077b5] transition-colors transform hover:scale-110">
          <FaLinkedin />
        </a>
      </div>
      <p className="text-[#34495e] dark:text-[#b0b0b0] mb-2 font-poppins">&copy; {new Date().getFullYear()} Raphael Santiago. Tous droits réservés.</p>
      <p className="text-[#7f8c8d] dark:text-[#7f8c8d] text-sm">Développé avec passion et React.</p>
    </footer>
  );
};

export default Footer;