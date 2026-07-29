import { useRef, useState, FormEvent } from 'react';
import { useInView } from 'react-intersection-observer';
import * as emailjs from '@emailjs/browser';
import { FaFilePdf, FaGithub, FaLinkedin } from 'react-icons/fa';

const Contact = () => {
  const { ref, inView } = useInView({ triggerOnce: false, threshold: 0.1 });
  const form = useRef<HTMLFormElement>(null);
  const [status, setStatus] = useState<{ type: string; text: string } | null>(null);

  const sendEmail = (e: FormEvent) => {
    e.preventDefault();
    if (!form.current) return;

    const serviceId = import.meta.env.VITE_EMAILJS_SERVICE_ID as string;
    const templateId = import.meta.env.VITE_EMAILJS_TEMPLATE_ID as string;
    const publicKey = import.meta.env.VITE_EMAILJS_PUBLIC_KEY as string;

    if (!serviceId || !templateId || !publicKey) {
      setStatus({ type: 'error', text: 'Service de messagerie non configuré. Contactez-moi directement par email.' });
      return;
    }

    const userEmail = (form.current.elements.namedItem('user_email') as HTMLInputElement).value;
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(userEmail)) {
      setStatus({ type: 'error', text: 'Veuillez entrer une adresse email valide.' });
      return;
    }

    emailjs.sendForm(serviceId, templateId, form.current, publicKey)
      .then(() => {
        setStatus({ type: 'success', text: 'Message envoyé avec succès !' });
        form.current?.reset();
      })
      .catch(() => {
        setStatus({ type: 'error', text: "Échec de l'envoi. Veuillez réessayer." });
      });
  };

  return (
    <section id="contact" className="contact" ref={ref}>
      <div className={`section-title-container ${inView ? 'is-visible' : ''}`}>
        <div className="section-header">
          <div className="section-tag">Contact</div>
          <h2 className="section-title">Travaillons ensemble</h2>
          <p className="section-desc">
            Intéressé par mon profil ? Je suis ouvert aux opportunités et j'adorerais en discuter.
          </p>
        </div>
      </div>

      <div className="contact-grid">
        <div className={`contact-info ${inView ? 'is-visible' : ''}`}>
          <div className="contact-item">
            <div className="contact-item-icon">@</div>
            <span className="contact-item-text">raphael.santiago@email.com</span>
          </div>
          <div className="contact-item">
            <div className="contact-item-icon"><FaGithub /></div>
            <span className="contact-item-text">github.com/vodrush</span>
          </div>
          <div className="contact-item">
            <div className="contact-item-icon"><FaLinkedin /></div>
            <span className="contact-item-text">linkedin.com/in/raphael-santiago</span>
          </div>
          <a href="/CV%202026.pdf" download className="cta-button" style={{ marginTop: '8px' }}>
            <FaFilePdf /> Télécharger mon CV
          </a>
        </div>

        <form ref={form} onSubmit={sendEmail} className={`contact-form ${inView ? 'is-visible' : ''}`}>
          <input type="text" name="user_name" placeholder="Votre nom" aria-label="Votre nom" required />
          <input type="email" name="user_email" placeholder="Votre email" aria-label="Votre email" required />
          <textarea name="message" placeholder="Votre message" rows={5} aria-label="Votre message" required />
          <button type="submit" className="cta-button primary">Envoyer le message →</button>
          {status && <p className={`status-message ${status.type}`}>{status.text}</p>}
        </form>
      </div>
    </section>
  );
};

export default Contact;
