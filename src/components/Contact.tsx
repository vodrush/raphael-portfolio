import { useRef, useState, FormEvent } from 'react';
import { useInView } from 'react-intersection-observer';
import * as emailjs from '@emailjs/browser';
import { FaFilePdf } from 'react-icons/fa';

const Contact = () => {
  const { ref, inView } = useInView({
    triggerOnce: false,
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
      (import.meta.env.VITE_EMAILJS_SERVICE_ID as string) || '',
      (import.meta.env.VITE_EMAILJS_TEMPLATE_ID as string) || '',
      form.current,
      (import.meta.env.VITE_EMAILJS_PUBLIC_KEY as string) || ''
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

  return (
    <section id="contact" className="contact" ref={ref}>
      <div className={`section-title-container ${inView ? 'is-visible' : ''}`}>
        <h2>Travaillons Ensemble</h2>
      </div>
      <p className={`${inView ? 'is-visible' : ''}`}>
        Intéressé par mon profil pour une collaboration ou un projet ? Je suis ouvert aux opportunités et j'adorerais en discuter.
      </p>

      <div className={`contact-info ${inView ? 'is-visible' : ''}`}>
        <a href="/cv.pdf" download className="cta-button cv-button">
          <FaFilePdf /> Télécharger mon CV
        </a>
      </div>

      <form ref={form} onSubmit={sendEmail} className={`contact-form ${inView ? 'is-visible' : ''}`}>
        <input type="text" name="user_name" placeholder="Votre Nom" aria-label="Votre Nom" required />
        <input type="email" name="user_email" placeholder="Votre Email" aria-label="Votre Email" required />
        <textarea name="message" placeholder="Votre Message" rows={5} aria-label="Votre Message" required></textarea>
        <button type="submit" className="cta-button" aria-label="Envoyer le Message">Envoyer le Message</button>
        {statusMessage && <p className={`status-message ${statusMessage.type}`}>{statusMessage.text}</p>}
      </form>

    </section>
  );
};

export default Contact;
