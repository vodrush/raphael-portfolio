import { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

interface ScrollAnimationsProps {
  children: React.ReactNode;
}

const ScrollAnimations: React.FC<ScrollAnimationsProps> = ({ children }) => {
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      // Hero parallax
      gsap.to('.hero-image-container', {
        yPercent: 30,
        ease: 'none',
        scrollTrigger: {
          trigger: '.hero',
          start: 'top top',
          end: 'bottom top',
          scrub: true,
        },
      });

      // Section titles reveal
      gsap.utils.toArray('.section-title-container').forEach((title: any) => {
        gsap.from(title, {
          y: 50,
          opacity: 0,
          duration: 1,
          ease: 'power3.out',
          scrollTrigger: {
            trigger: title,
            start: 'top 80%',
            toggleActions: 'play none none reverse',
          },
        });
      });

      // About content stagger
      gsap.utils.toArray('.about-content p').forEach((p: any, i: number) => {
        gsap.from(p, {
          y: 30,
          opacity: 0,
          duration: 0.8,
          delay: i * 0.15,
          ease: 'power2.out',
          scrollTrigger: {
            trigger: p,
            start: 'top 85%',
            toggleActions: 'play none none reverse',
          },
        });
      });

      // Skill items stagger
      gsap.utils.toArray('.skill-item').forEach((item: any, i: number) => {
        gsap.from(item, {
          y: 20,
          opacity: 0,
          duration: 0.5,
          delay: i * 0.05,
          ease: 'power2.out',
          scrollTrigger: {
            trigger: item,
            start: 'top 90%',
            toggleActions: 'play none none reverse',
          },
        });
      });

      // Project cards entrance
      gsap.utils.toArray('.project-card').forEach((card: any, i: number) => {
        gsap.from(card, {
          y: 60,
          opacity: 0,
          duration: 0.8,
          delay: i * 0.1,
          ease: 'power3.out',
          scrollTrigger: {
            trigger: card,
            start: 'top 85%',
            toggleActions: 'play none none reverse',
          },
        });
      });

    }, containerRef);

    return () => ctx.revert();
  }, []);

  return <div ref={containerRef}>{children}</div>;
};

export default ScrollAnimations;