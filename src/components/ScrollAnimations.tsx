import { useEffect, useRef } from 'react';

interface ScrollAnimationsProps {
  children: React.ReactNode;
}

const ScrollAnimations: React.FC<ScrollAnimationsProps> = ({ children }) => {
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    let cleanup: (() => void) | undefined;

    // Defer GSAP init to avoid blocking main thread during Lighthouse
    const initGSAP = async () => {
      const { default: gsap } = await import('gsap');
      const { ScrollTrigger } = await import('gsap/ScrollTrigger');
      gsap.registerPlugin(ScrollTrigger);

      const ctx = gsap.context(() => {

        // =============================================
        // FLOATING GRADIENT ORBS — background ambiance
        // =============================================
        const orbsContainer = document.createElement('div');
        orbsContainer.className = 'gsap-orbs';
        orbsContainer.style.cssText = 'position:fixed;top:0;left:0;width:100%;height:100%;pointer-events:none;z-index:-1;overflow:hidden;';
        for (let i = 0; i < 3; i++) {
          const orb = document.createElement('div');
          orb.className = 'gsap-orb';
          const size = 300 + i * 150;
          const colors = [
            'radial-gradient(circle, rgba(59,130,246,0.08) 0%, transparent 70%)',
            'radial-gradient(circle, rgba(139,92,246,0.06) 0%, transparent 70%)',
            'radial-gradient(circle, rgba(99,102,241,0.05) 0%, transparent 70%)',
          ];
          orb.style.cssText = `position:absolute;width:${size}px;height:${size}px;border-radius:50%;background:${colors[i]};filter:blur(40px);`;
          orbsContainer.appendChild(orb);

          gsap.set(orb, {
            x: Math.random() * window.innerWidth,
            y: Math.random() * window.innerHeight,
          });
          gsap.to(orb, {
            x: `+=${gsap.utils.random(-200, 200)}`,
            y: `+=${gsap.utils.random(-200, 200)}`,
            duration: gsap.utils.random(15, 25),
            ease: 'sine.inOut',
            repeat: -1,
            yoyo: true,
          });
        }
        document.body.prepend(orbsContainer);


        // =============================================
        // HERO ENTRANCE — timeline premium (SLOW)
        // =============================================
        const heroTl = gsap.timeline({
          defaults: { ease: 'power4.out' },
          delay: 0.3,
        });

        const h1 = document.querySelector('[data-gsap="hero-h1"]');
        if (h1) {
          const text = h1.textContent || '';
          h1.innerHTML = text.split('').map((char) =>
            char === ' '
              ? '<span class="hero-char">&nbsp;</span>'
              : `<span class="hero-char" style="display:inline-block;opacity:0">${char}</span>`
          ).join('');

          heroTl.to('.hero-char', {
            y: 0,
            opacity: 1,
            duration: 0.8,
            stagger: 0.04,
            ease: 'power4.out',
          }, 0);
        }

        heroTl.fromTo('[data-gsap="hero-h2"]',
          { x: -40, opacity: 0, filter: 'blur(8px)' },
          { x: 0, opacity: 1, filter: 'blur(0px)', duration: 1.2 },
          0.6
        );

        heroTl.fromTo('[data-gsap="hero-p"]',
          { y: 30, opacity: 0, filter: 'blur(4px)' },
          { y: 0, opacity: 1, filter: 'blur(0px)', duration: 1.2 },
          0.9
        );

        heroTl.fromTo('[data-gsap="hero-buttons"] .cta-button',
          { y: 25, opacity: 0, scale: 0.9 },
          { y: 0, opacity: 1, scale: 1, duration: 0.8, stagger: 0.15 },
          1.2
        );

        heroTl.fromTo('[data-gsap="hero-socials"] a',
          { scale: 0, opacity: 0, rotation: -15 },
          { scale: 1, opacity: 1, rotation: 0, duration: 0.7, stagger: 0.1, ease: 'back.out(2)' },
          1.5
        );

        heroTl.fromTo('[data-gsap="hero-image"]',
          { scale: 0.6, opacity: 0, rotation: -8 },
          { scale: 1, opacity: 1, rotation: 0, duration: 1.5, ease: 'elastic.out(1, 0.8)' },
          0.5
        );

        gsap.to('[data-gsap="hero-image"] .raphael-image', {
          y: -12,
          duration: 3,
          ease: 'sine.inOut',
          repeat: -1,
          yoyo: true,
        });


        // =============================================
        // HERO PARALLAX on scroll
        // =============================================
        gsap.to('[data-gsap="hero-image"]', {
          yPercent: 25,
          ease: 'none',
          scrollTrigger: {
            trigger: '.hero',
            start: 'top top',
            end: 'bottom top',
            scrub: 1.5,
          },
        });

        gsap.to('.hero-text', {
          yPercent: 10,
          opacity: 0.3,
          ease: 'none',
          scrollTrigger: {
            trigger: '.hero',
            start: 'top top',
            end: 'bottom top',
            scrub: 1.5,
          },
        });


        // =============================================
        // SCROLL PROGRESS — gradient shift
        // =============================================
        gsap.to('.scroll-progress-bar', {
          background: 'linear-gradient(90deg, #3b82f6, #8b5cf6, #ec4899)',
          ease: 'none',
          scrollTrigger: {
            trigger: document.documentElement,
            start: 'top top',
            end: 'bottom bottom',
            scrub: 1,
          },
        });

      }, containerRef.current || undefined);


      // =============================================
      // LAZY COMPONENTS — MutationObserver
      // =============================================
      let scrollAnimationsInitialized = false;

      const initScrollAnimations = () => {
        if (scrollAnimationsInitialized) return;
        scrollAnimationsInitialized = true;

        if (observerRef.current) {
          observerRef.current.disconnect();
          observerRef.current = null;
        }

        gsap.context(() => {

          gsap.utils.toArray<HTMLElement>('[data-gsap="section-title"]').forEach((title) => {
            gsap.fromTo(title,
              { y: 60, opacity: 0, clipPath: 'inset(0 0 100% 0)' },
              {
                y: 0,
                opacity: 1,
                clipPath: 'inset(0 0 0% 0)',
                duration: 1.2,
                ease: 'power3.out',
                clearProps: 'transform,opacity,clipPath',
                scrollTrigger: {
                  trigger: title,
                  start: 'top 85%',
                  toggleActions: 'play none none none',
                },
              }
            );
          });

          gsap.utils.toArray<HTMLElement>('[data-gsap="about-content"] p').forEach((p, i) => {
            gsap.fromTo(p,
              { clipPath: 'inset(0 100% 0 0)', opacity: 0.4 },
              {
                clipPath: 'inset(0 0% 0 0)',
                opacity: 1,
                duration: 1.4,
                delay: i * 0.3,
                ease: 'power4.inOut',
                clearProps: 'clipPath,opacity',
                scrollTrigger: {
                  trigger: p,
                  start: 'top 85%',
                  toggleActions: 'play none none none',
                },
              }
            );
          });

          ScrollTrigger.batch('[data-gsap="skill-item"]', {
            onEnter: (elements) => {
              gsap.fromTo(elements,
                { opacity: 0, scale: 0.92 },
                {
                  opacity: 1,
                  scale: 1,
                  duration: 0.9,
                  stagger: 0.07,
                  ease: 'power3.out',
                  onComplete: () => gsap.set(elements, { clearProps: 'transform,opacity' }),
                }
              );
            },
            start: 'top 90%',
            once: true,
          });

          gsap.utils.toArray<HTMLElement>('.skill-icon').forEach((icon) => {
            gsap.to(icon, {
              scale: 1.1,
              duration: gsap.utils.random(2, 4),
              ease: 'sine.inOut',
              repeat: -1,
              yoyo: true,
              delay: gsap.utils.random(0, 2),
            });
          });

          ScrollTrigger.batch('[data-gsap="project-card"]', {
            onEnter: (elements) => {
              gsap.fromTo(elements,
                { opacity: 0, scale: 0.95 },
                {
                  opacity: 1,
                  scale: 1,
                  duration: 1,
                  stagger: 0.15,
                  ease: 'power3.out',
                  onComplete: () => gsap.set(elements, { clearProps: 'transform,opacity' }),
                }
              );
            },
            start: 'top 90%',
            once: true,
          });

          ScrollTrigger.batch('[data-gsap="learning-item"]', {
            onEnter: (elements) => {
              gsap.fromTo(elements,
                { opacity: 0, x: -20 },
                {
                  opacity: 1,
                  x: 0,
                  duration: 0.9,
                  stagger: 0.08,
                  ease: 'power3.out',
                  onComplete: () => gsap.set(elements, { clearProps: 'transform,opacity' }),
                }
              );
            },
            start: 'top 90%',
            once: true,
          });

          const contactEls = [
            '[data-gsap="contact-p"]',
            '[data-gsap="contact-info"]',
            '[data-gsap="contact-form"]',
          ];
          contactEls.forEach((sel, i) => {
            const el = document.querySelector(sel);
            if (el) {
              gsap.fromTo(el,
                { opacity: 0, scale: 0.97 },
                {
                  opacity: 1,
                  scale: 1,
                  duration: 1,
                  delay: i * 0.2,
                  ease: 'power3.out',
                  clearProps: 'transform,opacity',
                  scrollTrigger: {
                    trigger: el,
                    start: 'top 85%',
                    toggleActions: 'play none none none',
                  },
                }
              );
            }
          });

          gsap.utils.toArray<HTMLElement>('.contact-form input, .contact-form textarea').forEach((input, i) => {
            gsap.fromTo(input,
              { x: i % 2 === 0 ? -15 : 15, opacity: 0 },
              {
                x: 0,
                opacity: 1,
                duration: 0.8,
                ease: 'power3.out',
                clearProps: 'transform,opacity',
                scrollTrigger: {
                  trigger: input,
                  start: 'top 90%',
                  toggleActions: 'play none none none',
                },
              }
            );
          });

          const privacyContent = document.querySelector('[data-gsap="privacy-content"]');
          if (privacyContent) {
            gsap.fromTo(privacyContent,
              { opacity: 0 },
              {
                opacity: 1,
                duration: 1.2,
                ease: 'power3.out',
                clearProps: 'opacity',
                scrollTrigger: {
                  trigger: privacyContent,
                  start: 'top 85%',
                  toggleActions: 'play none none none',
                },
              }
            );
          }

          const footer = document.querySelector('[data-gsap="footer"]');
          if (footer) {
            gsap.fromTo(footer.children,
              { opacity: 0 },
              {
                opacity: 1,
                duration: 0.8,
                stagger: 0.15,
                ease: 'power3.out',
                clearProps: 'opacity',
                scrollTrigger: {
                  trigger: footer,
                  start: 'top 90%',
                  toggleActions: 'play none none none',
                },
              }
            );
          }

          gsap.utils.toArray<HTMLElement>('.footer-socials a').forEach((icon) => {
            icon.addEventListener('mouseenter', () => {
              gsap.to(icon, { rotation: 360, duration: 0.8, ease: 'power2.out' });
            });
            icon.addEventListener('mouseleave', () => {
              gsap.to(icon, { rotation: 0, duration: 0.6, ease: 'power2.out' });
            });
          });


          // =============================================
          // MICRO-INTERACTIONS — hover effects
          // =============================================

          document.querySelectorAll('[data-gsap="project-card"]').forEach((card) => {
            const el = card as HTMLElement;
            el.style.transformStyle = 'preserve-3d';
            el.style.perspective = '800px';

            el.addEventListener('mousemove', (e: MouseEvent) => {
              const rect = el.getBoundingClientRect();
              const x = (e.clientX - rect.left) / rect.width - 0.5;
              const y = (e.clientY - rect.top) / rect.height - 0.5;
              gsap.to(el, {
                rotationY: x * 8,
                rotationX: -y * 8,
                scale: 1.03,
                y: -10,
                duration: 0.6,
                ease: 'power2.out',
                boxShadow: '0 30px 60px rgba(59, 130, 246, 0.2)',
              });
            });
            el.addEventListener('mouseleave', () => {
              gsap.to(el, {
                rotationY: 0,
                rotationX: 0,
                scale: 1,
                y: 0,
                duration: 0.8,
                ease: 'elastic.out(1, 0.5)',
                boxShadow: '0 0 0 rgba(59, 130, 246, 0)',
              });
            });
          });

          document.querySelectorAll('[data-gsap="skill-item"]').forEach((item) => {
            const el = item as HTMLElement;
            const icon = el.querySelector('.skill-icon') as HTMLElement;
            el.addEventListener('mouseenter', () => {
              gsap.to(el, { y: -6, scale: 1.05, duration: 0.5, ease: 'back.out(1.5)' });
              if (icon) gsap.to(icon, { scale: 1.3, rotation: 10, duration: 0.5, ease: 'back.out(2)' });
            });
            el.addEventListener('mouseleave', () => {
              gsap.to(el, { y: 0, scale: 1, duration: 0.6, ease: 'elastic.out(1, 0.4)' });
              if (icon) gsap.to(icon, { scale: 1, rotation: 0, duration: 0.6, ease: 'elastic.out(1, 0.4)' });
            });
          });

          document.querySelectorAll('.cta-button').forEach((btn) => {
            const el = btn as HTMLElement;
            el.addEventListener('mousemove', (e: MouseEvent) => {
              const rect = el.getBoundingClientRect();
              const x = e.clientX - rect.left - rect.width / 2;
              const y = e.clientY - rect.top - rect.height / 2;
              gsap.to(el, { x: x * 0.2, y: y * 0.2, duration: 0.4, ease: 'power2.out' });
            });
            el.addEventListener('mouseleave', () => {
              gsap.to(el, { x: 0, y: 0, duration: 0.7, ease: 'elastic.out(1, 0.3)' });
            });
          });

          document.querySelectorAll('.hero-socials a, .social-links a').forEach((link) => {
            const el = link as HTMLElement;
            el.addEventListener('mouseenter', () => {
              gsap.to(el, { scale: 1.3, rotation: 5, duration: 0.5, ease: 'back.out(2)' });
            });
            el.addEventListener('mouseleave', () => {
              gsap.to(el, { scale: 1, rotation: 0, duration: 0.6, ease: 'elastic.out(1, 0.4)' });
            });
          });

          document.querySelectorAll('.learning-item').forEach((item) => {
            const el = item as HTMLElement;
            el.addEventListener('mouseenter', () => {
              gsap.to(el, {
                y: -6,
                scale: 1.05,
                borderColor: 'rgba(59, 130, 246, 0.5)',
                duration: 0.5,
                ease: 'back.out(1.5)',
              });
            });
            el.addEventListener('mouseleave', () => {
              gsap.to(el, {
                y: 0,
                scale: 1,
                borderColor: 'rgba(255, 255, 255, 0.06)',
                duration: 0.6,
                ease: 'power2.out',
              });
            });
          });

          document.querySelectorAll('.tech-tag').forEach((tag) => {
            const el = tag as HTMLElement;
            el.addEventListener('mouseenter', () => {
              gsap.to(el, { scale: 1.15, y: -3, duration: 0.4, ease: 'back.out(2)' });
            });
            el.addEventListener('mouseleave', () => {
              gsap.to(el, { scale: 1, y: 0, duration: 0.5, ease: 'elastic.out(1, 0.5)' });
            });
          });

          const scrollBtn = document.querySelector('.scroll-to-top button');
          if (scrollBtn) {
            scrollBtn.addEventListener('mouseenter', () => {
              gsap.to(scrollBtn, { scale: 1.15, duration: 0.4, ease: 'back.out(2)' });
            });
            scrollBtn.addEventListener('mouseleave', () => {
              gsap.to(scrollBtn, { scale: 1, duration: 0.5, ease: 'elastic.out(1, 0.4)' });
            });
          }

          const themeBtn = document.querySelector('.theme-toggle-button');
          if (themeBtn) {
            themeBtn.addEventListener('mouseenter', () => {
              gsap.to(themeBtn, { scale: 1.15, rotation: '+=180', duration: 0.6, ease: 'back.out(1.5)' });
            });
            themeBtn.addEventListener('mouseleave', () => {
              gsap.to(themeBtn, { scale: 1, duration: 0.5, ease: 'power2.out' });
            });
          }


          // =============================================
          // PARALLAX LAYERS
          // =============================================

          gsap.to('.skills-container', {
            yPercent: -5,
            ease: 'none',
            scrollTrigger: {
              trigger: '.skills',
              start: 'top bottom',
              end: 'bottom top',
              scrub: 2,
            },
          });

          gsap.to('.projects-grid', {
            yPercent: -3,
            ease: 'none',
            scrollTrigger: {
              trigger: '.projects',
              start: 'top bottom',
              end: 'bottom top',
              scrub: 2,
            },
          });

          ScrollTrigger.refresh();

        }, containerRef.current || undefined);
      };

      // Watch for lazy-loaded components
      const targetNode = containerRef.current || document.body;

      if (document.querySelector('[data-gsap="about-content"]')) {
        initScrollAnimations();
      } else {
        observerRef.current = new MutationObserver((mutations) => {
          for (const mutation of mutations) {
            for (const node of mutation.addedNodes) {
              if (node instanceof HTMLElement) {
                if (
                  node.matches('[data-gsap="about-content"]') ||
                  node.matches('[data-gsap="skill-item"]') ||
                  node.matches('[data-gsap="project-card"]') ||
                  node.querySelector('[data-gsap="about-content"]') ||
                  node.querySelector('[data-gsap="skill-item"]') ||
                  node.querySelector('[data-gsap="project-card"]')
                ) {
                  requestAnimationFrame(() => {
                    requestAnimationFrame(() => {
                      initScrollAnimations();
                    });
                  });
                  return;
                }
              }
            }
          }
        });

        observerRef.current.observe(targetNode, { childList: true, subtree: true });

        const fallbackTimer = setTimeout(initScrollAnimations, 3000);

        cleanup = () => {
          clearTimeout(fallbackTimer);
          ctx.revert();
          if (observerRef.current) observerRef.current.disconnect();
        };
        return;
      }

      cleanup = () => {
        ctx.revert();
        if (observerRef.current) observerRef.current.disconnect();
      };
    };

    const observerRef = { current: null as MutationObserver | null };

    // Use requestIdleCallback to defer GSAP loading
    let idleId: any;
    if ('requestIdleCallback' in window) {
      idleId = (window as any).requestIdleCallback(initGSAP);
    } else {
      idleId = setTimeout(initGSAP, 1);
    }

    return () => {
      if ('cancelIdleCallback' in window && typeof idleId === 'number') {
        (window as any).cancelIdleCallback(idleId);
      } else {
        clearTimeout(idleId);
      }
      if (cleanup) cleanup();
    };
  }, []);

  return (
    <div ref={containerRef}>
      {children}
    </div>
  );
};

export default ScrollAnimations;
