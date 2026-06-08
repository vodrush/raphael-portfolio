import { useEffect, useRef, useState } from 'react';
import { FaArrowUp } from 'react-icons/fa';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

const ScrollToTopButton = () => {
  const [isVisible, setIsVisible] = useState(false);
  const buttonRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const trigger = ScrollTrigger.create({
      trigger: document.documentElement,
      start: '300px top',
      onEnter: () => setIsVisible(true),
      onLeaveBack: () => setIsVisible(false),
    });

    return () => {
      trigger.kill();
    };
  }, []);

  useEffect(() => {
    if (!buttonRef.current) return;
    if (isVisible) {
      gsap.fromTo(buttonRef.current,
        { opacity: 0, scale: 0.5, y: 20 },
        { opacity: 1, scale: 1, y: 0, duration: 0.4, ease: 'back.out(1.7)' }
      );
    } else {
      gsap.to(buttonRef.current, {
        opacity: 0, scale: 0.5, y: 20, duration: 0.3, ease: 'power2.in'
      });
    }
  }, [isVisible]);

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <div className="scroll-to-top" ref={buttonRef} style={{ opacity: 0 }}>
      {isVisible && (
        <button onClick={scrollToTop} aria-label="Retour en haut de page">
          <FaArrowUp />
        </button>
      )}
    </div>
  );
};

export default ScrollToTopButton;
