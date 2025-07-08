import React, { useEffect, useRef } from 'react';

function debounce(func, wait) {
    let timeout;
    return function executedFunction(...args) {
        const later = () => {
            clearTimeout(timeout);
            func(...args);
        };
        clearTimeout(timeout);
        timeout = setTimeout(later, wait);
    };
}

const InteractiveBubbles = ({ mainRef }) => {
  const containerRef = useRef(null);
  const bubblesRef = useRef([]);
  const animationFrameId = useRef(null);
  const mousePosition = useRef({ x: 0, y: 0 });

  useEffect(() => {
    const setup = () => {
      if (!containerRef.current || !mainRef.current) return;

      // Nettoyage
      cancelAnimationFrame(animationFrameId.current);
      containerRef.current.innerHTML = '';
      bubblesRef.current = [];

      // Dimensions
      const containerWidth = mainRef.current.scrollWidth;
      const containerHeight = mainRef.current.scrollHeight;
      containerRef.current.style.height = `${containerHeight}px`;

      // Création
      const bubbleCount = 150;
      const newBubbles = Array.from({ length: bubbleCount }).map(() => {
        const size = 15 + Math.random() * 50;
        return {
          el: document.createElement('div'),
          x: Math.random() * containerWidth,
          y: Math.random() * containerHeight,
          vx: (Math.random() - 0.5) * 0.3,
          vy: (Math.random() - 0.5) * 0.3,
          size: size,
          radius: size / 2,
        };
      });

      newBubbles.forEach(bubble => {
        bubble.el.className = 'bubble';
        bubble.el.style.width = `${bubble.size}px`;
        bubble.el.style.height = `${bubble.size}px`;
        const inner = document.createElement('div');
        inner.className = 'bubble-inner';
        bubble.el.appendChild(inner);
        containerRef.current.appendChild(bubble.el);
      });
      bubblesRef.current = newBubbles;

      // Animation
      const animate = () => {
        const currentBubbles = bubblesRef.current;
        currentBubbles.forEach(bubble => {
          bubble.x += bubble.vx;
          bubble.y += bubble.vy;

          if (bubble.x + bubble.radius > containerWidth) { bubble.vx *= -1; }
          if (bubble.x - bubble.radius < 0) { bubble.vx *= -1; }
          if (bubble.y - bubble.radius < 0) { bubble.vy *= -1; }
          if (bubble.y + bubble.radius > containerHeight) { bubble.vy *= -1; }

          const dx = bubble.x - (mousePosition.current.x + window.scrollX);
          const dy = bubble.y - (mousePosition.current.y + window.scrollY);
          const distance = Math.sqrt(dx * dx + dy * dy);
          if (distance < 120) {
            const force = (120 - distance) / 120;
            const angle = Math.atan2(dy, dx);
            bubble.vx += Math.cos(angle) * force * 0.25;
            bubble.vy += Math.sin(angle) * force * 0.25;
          }

          bubble.vx *= 0.99;
          bubble.vy *= 0.99;

          bubble.el.style.transform = `translate(${bubble.x - bubble.radius}px, ${bubble.y - bubble.radius}px)`;
        });
        animationFrameId.current = requestAnimationFrame(animate);
      };
      animate();
    };

    const debouncedSetup = debounce(setup, 200);
    
    const observer = new ResizeObserver(debouncedSetup);
    if (mainRef.current) {
      observer.observe(mainRef.current);
    }
    
    const handleMouseMove = (e) => {
      mousePosition.current = { x: e.clientX, y: e.clientY };
    };
    window.addEventListener('mousemove', handleMouseMove);

    return () => {
      observer.disconnect();
      window.removeEventListener('mousemove', handleMouseMove);
      cancelAnimationFrame(animationFrameId.current);
    };
  }, [mainRef]);

  return <div ref={containerRef} className="interactive-bubbles-container" />;
};

export default InteractiveBubbles;
