import { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

const ScrollProgressIndicator = () => {
  const barRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!barRef.current) return;

    const trigger = ScrollTrigger.create({
      trigger: document.documentElement,
      start: 'top top',
      end: 'bottom bottom',
      onUpdate: (self) => {
        gsap.set(barRef.current, { width: `${self.progress * 100}%` });
      },
    });

    return () => {
      trigger.kill();
    };
  }, []);

  return (
    <div className="scroll-progress-container">
      <div ref={barRef} className="scroll-progress-bar"></div>
    </div>
  );
};

export default ScrollProgressIndicator;
