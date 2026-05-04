import { useInView } from 'react-intersection-observer';

const PrivacyPolicy = () => {
  const { ref, inView } = useInView({
    triggerOnce: false,
    threshold: 0.1,
  });

  return (
    <section id="privacy" className="privacy-policy" ref={ref}>
      <div className={`section-title-container ${inView ? 'is-visible' : ''}`}>
        <h2>Politique de Confidentialité</h2>
      </div>
      <div className={`privacy-content ${inView ? 'is-visible' : ''}`}>
        <h3>Collecte de données</h3>
        <p>
          Ce portfolio ne collecte pas de données personnelles. Le formulaire de contact utilise EmailJS
          pour transmettre les messages directement. Vos données ne sont pas stockées sur ce site.
        </p>

        <h3>Hébergement</h3>
        <p>
          Ce site est hébergé sur GitHub Pages / Cloudflare Pages. Les données de navigation peuvent
          être traitées par ces plateformes conformément à leurs politiques de confidentialité.
        </p>

        <h3>Cookies</h3>
        <p>
          Ce site n'utilise pas de cookies de tracking. Seuls les cookies techniques nécessaires
          au fonctionnement du site peuvent être utilisés.
        </p>

        <h3>Droits</h3>
        <p>
          Conformément au RGPD, vous avez le droit d'accéder, de rectifier ou de supprimer vos
          données personnelles. Contactez-moi via le formulaire de contact pour toute demande.
        </p>

        <h3>Contact</h3>
        <p>
          Pour toute question concernant cette politique de confidentialité, contactez-moi à l'adresse
          indicated dans la section contact du portfolio.
        </p>

        <p className="last-updated">
          Dernière mise à jour : Mai 2026
        </p>
      </div>
    </section>
  );
};

export default PrivacyPolicy;
