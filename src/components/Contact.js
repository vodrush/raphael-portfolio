import React, { useRef, useState } from 'react';
import { useInView } from 'react-intersection-observer';
import emailjs from '@emailjs/browser';


const Contact = () => {
  const { ref, inView } = useInView({
    triggerOnce: true,
    threshold: 0.1,
  });

  const form = useRef();
  const [statusMessage, setStatusMessage] = useState('');

  const sendEmail = (e) => {
    e.preventDefault();

    const userEmail = form.current.user_email.value;
    if (!/^[\w-.]+@([\w-]+\.)+[\w-]{2,4}$/.test(userEmail)) {
      setStatusMessage('Veuillez entrer une adresse email valide.');
      return;
    }

    emailjs.sendForm('service_nqi9p2c', 'template_2puxn5e', form.current, 'ixRwxbOwkbsrmkk4Y')
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
        <input type="text" name="user_name" placeholder="Votre Nom" required />
        <input type="email" name="user_email" placeholder="Votre Email" required />
        <textarea name="message" placeholder="Votre Message" rows="5" required></textarea>
        <button type="submit" className="cta-button">Envoyer le Message</button>
        {statusMessage && <p className={`status-message ${statusMessage.type}`}>{statusMessage.text}</p>}
      </form>
      
    </section>
  );
};

export default Contact;