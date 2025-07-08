import React, { useRef, useState } from 'react';
import { useInView } from 'react-intersection-observer';
import * as emailjs from '@emailjs/browser';

const Contact = () => {
  const { ref, inView } = useInView({
    triggerOnce: false, // L'animation se redéclenchera
    threshold: 0.1,
  });

  const form = useRef();
  const [statusMessage, setStatusMessage] = useState('');

  const sendEmail = (e) => {
    e.preventDefault();

    const userEmail = form.current.user_email.value;
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(userEmail)) {
      setStatusMessage({ type: 'error', text: 'Veuillez entrer une adresse email valide.' });
      return;
    }

    emailjs.sendForm(process.env.REACT_APP_EMAILJS_SERVICE_ID, process.env.REACT_APP_EMAILJS_TEMPLATE_ID, form.current, process.env.REACT_APP_EMAILJS_PUBLIC_KEY)
      .then((result) => {
          console.log(result.text);
          setStatusMessage({ type: 'success', text: 'Message envoyé avec succès !' });
          form.current.reset();
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
        Intéressé par mon profil pour une collaboration ou un projet ? Je suis actuellement ouvert aux opportunités et j'adorerais en discuter.
      </p>
      <form ref={form} onSubmit={sendEmail} className={`contact-form ${inView ? 'is-visible' : ''}`}>
        <input type="text" name="user_name" placeholder="Votre Nom" aria-label="Votre Nom" required />
        <input type="email" name="user_email" placeholder="Votre Email" aria-label="Votre Email" required />
        <textarea name="message" placeholder="Votre Message" rows="5" aria-label="Votre Message" required></textarea>
        <button type="submit" className="cta-button" aria-label="Envoyer le Message">Envoyer le Message</button>
        {statusMessage && <p className={`status-message ${statusMessage.type}`}>{statusMessage.text}</p>}
      </form>
      
    </section>
  );
};

export default Contact;
