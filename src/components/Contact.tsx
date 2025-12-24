import { useRef, useState, FormEvent } from 'react';
import { motion } from 'framer-motion';
import { useInView } from 'react-intersection-observer';
import * as emailjs from '@emailjs/browser';
import { FaFilePdf } from 'react-icons/fa';

const Contact = () => {
  const { ref, inView } = useInView({
    triggerOnce: true,
    threshold: 0.1,
  });

  const form = useRef<HTMLFormElement>(null);
  const [statusMessage, setStatusMessage] = useState<{ type: string; text: string } | null>(null);

  const sendEmail = (e: FormEvent) => {
    e.preventDefault();
    if (!form.current) return;

    const userEmail = (form.current.elements.namedItem('user_email') as HTMLInputElement).value;
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(userEmail)) {
      setStatusMessage({ type: 'error', text: 'Veuillez entrer une adresse email valide.' });
      return;
    }

    emailjs.sendForm(
      process.env.REACT_APP_EMAILJS_SERVICE_ID || '',
      process.env.REACT_APP_EMAILJS_TEMPLATE_ID || '',
      form.current,
      process.env.REACT_APP_EMAILJS_PUBLIC_KEY || ''
    )
      .then((result) => {
        console.log(result.text);
        setStatusMessage({ type: 'success', text: 'Message envoyé avec succès !' });
        form.current?.reset();
      }, (error) => {
        console.log(error.text);
        setStatusMessage({ type: 'error', text: `Échec de l'envoi du message. Veuillez réessayer.` });
      });
  };

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2
      }
    }
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.5 } }
  };

  return (
    <section id="contact" className="py-24 px-8 max-w-4xl mx-auto text-center" ref={ref}>
      <motion.div
        variants={containerVariants}
        initial="hidden"
        animate={inView ? "visible" : "hidden"}
      >
        <motion.div variants={itemVariants} className="mb-12">
          <h2 className="text-4xl font-bold relative inline-block text-[#2c3e50] dark:text-[#b3aedb] after:content-[''] after:absolute after:-bottom-2 after:left-1/2 after:-translate-x-1/2 after:w-16 after:h-1 after:bg-[#e74c3c] dark:after:bg-[#b3aedb]">Travaillons Ensemble</h2>
        </motion.div>

        <motion.p variants={itemVariants} className="text-lg text-[#34495e] dark:text-[#d1d5db] mb-8 max-w-lg mx-auto">
          Intéressé par mon profil pour une collaboration ou un projet ? Je suis ouvert aux opportunités et j'adorerais en discuter.
        </motion.p>

        <motion.div variants={itemVariants} className="mb-12">
          <motion.a
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            href="/CV_Raphael_Santiago.pdf"
            download
            className="inline-flex items-center gap-2 px-8 py-3 bg-[#e74c3c] text-white rounded-full font-bold text-lg shadow-lg hover:bg-[#c0392b] transition-colors"
          >
            <FaFilePdf /> Télécharger mon CV
          </motion.a>
        </motion.div>

        <motion.form
          ref={form}
          onSubmit={sendEmail}
          variants={itemVariants}
          className="flex flex-col gap-6 max-w-xl mx-auto"
        >
          <input
            type="text"
            name="user_name"
            placeholder="Votre Nom"
            aria-label="Votre Nom"
            required
            className="p-4 rounded-lg bg-white/80 dark:bg-[#2a263c]/50 border border-gray-300 dark:border-white/10 text-[#2c3e50] dark:text-[#f1f3f5] focus:outline-none focus:border-[#e74c3c] dark:focus:border-[#b3aedb] transition-colors"
          />
          <input
            type="email"
            name="user_email"
            placeholder="Votre Email"
            aria-label="Votre Email"
            required
            className="p-4 rounded-lg bg-white/80 dark:bg-[#2a263c]/50 border border-gray-300 dark:border-white/10 text-[#2c3e50] dark:text-[#f1f3f5] focus:outline-none focus:border-[#e74c3c] dark:focus:border-[#b3aedb] transition-colors"
          />
          <textarea
            name="message"
            placeholder="Votre Message"
            rows={5}
            aria-label="Votre Message"
            required
            className="p-4 rounded-lg bg-white/80 dark:bg-[#2a263c]/50 border border-gray-300 dark:border-white/10 text-[#2c3e50] dark:text-[#f1f3f5] focus:outline-none focus:border-[#e74c3c] dark:focus:border-[#b3aedb] transition-colors resize-y"
          ></textarea>
          <motion.button
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            type="submit"
            className="px-8 py-4 bg-transparent border-2 border-[#e74c3c] dark:border-[#b3aedb] text-[#e74c3c] dark:text-[#b3aedb] rounded-lg font-bold text-lg hover:bg-[#e74c3c] hover:text-white dark:hover:bg-[#b3aedb] dark:hover:text-[#1f1c2c] transition-colors cursor-pointer"
            aria-label="Envoyer le Message"
          >
            Envoyer le Message
          </motion.button>
          {statusMessage && (
            <motion.p
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: 'auto' }}
              className={`text-center font-bold p-3 rounded-lg ${statusMessage.type === 'success' ? 'bg-green-100 text-green-700 dark:bg-green-900/30 dark:text-green-400' : 'bg-red-100 text-red-700 dark:bg-red-900/30 dark:text-red-400'}`}
            >
              {statusMessage.text}
            </motion.p>
          )}
        </motion.form>
      </motion.div>
    </section>
  );
};

export default Contact;
