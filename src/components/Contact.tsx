import { useRef, useState, FormEvent } from 'react';
import * as emailjs from '@emailjs/browser';
import { FaFilePdf } from 'react-icons/fa';

const Contact = () => {
  const form = useRef<HTMLFormElement>(null);
  const [statusMessage, setStatusMessage] = useState<{ type: string; text: string } | null>(null);
  const [isSending, setIsSending] = useState(false);

  const sendEmail = (e: FormEvent) => {
    e.preventDefault();
    if (!form.current) return;

    const serviceId = import.meta.env.VITE_EMAILJS_SERVICE_ID as string;
    const templateId = import.meta.env.VITE_EMAILJS_TEMPLATE_ID as string;
    const publicKey = import.meta.env.VITE_EMAILJS_PUBLIC_KEY as string;

    if (!serviceId || !templateId || !publicKey) {
      setStatusMessage({ type: 'error', text: 'Service de messagerie non configuré. Contactez-moi directement par email.' });
      return;
    }

    const userEmail = (form.current.elements.namedItem('user_email') as HTMLInputElement).value;
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(userEmail)) {
      setStatusMessage({ type: 'error', text: 'Veuillez entrer une adresse email valide.' });
      return;
    }

    setIsSending(true);
    setStatusMessage(null);

    emailjs.sendForm(serviceId, templateId, form.current, publicKey)
      .then(() => {
        setStatusMessage({ type: 'success', text: 'Message envoyé avec succès !' });
        form.current?.reset();
      }, () => {
        setStatusMessage({ type: 'error', text: `Échec de l'envoi du message. Veuillez réessayer.` });
      })
      .finally(() => {
        setIsSending(false);
        setTimeout(() => setStatusMessage(null), 5000);
      });
  };

  return (
    <section id="contact" className="contact">
      <div className="section-title-container" data-gsap="section-title">
        <h2>Travaillons Ensemble</h2>
      </div>
      <p data-gsap="contact-p">
        Intéressé par mon profil pour une collaboration ou un projet ? Je suis ouvert aux opportunités et j'adorerais en discuter.
      </p>

      <div className="contact-info" data-gsap="contact-info">
        <a href="/CV 2026.pdf" download className="cta-button cv-button">
          <FaFilePdf /> Télécharger mon CV
        </a>
      </div>

      <form ref={form} onSubmit={sendEmail} className="contact-form" data-gsap="contact-form">
        <input type="text" name="user_name" placeholder="Votre Nom" aria-label="Votre Nom" required />
        <input type="email" name="user_email" placeholder="Votre Email" aria-label="Votre Email" required />
        <textarea name="message" placeholder="Votre Message" rows={5} aria-label="Votre Message" required></textarea>
        <button type="submit" className="cta-button" aria-label="Envoyer le Message" disabled={isSending}>
          {isSending ? 'Envoi en cours...' : 'Envoyer le Message'}
        </button>
        {statusMessage && <p className={`status-message ${statusMessage.type}`}>{statusMessage.text}</p>}
      </form>
    </section>
  );
};

export default Contact;
