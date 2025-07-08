
import React, { useEffect, useRef, useCallback } from 'react';


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
  const mousePosition = useRef({ x: 0, y: 0 });
  const animationFrameId = useRef(null);

  const initializeBubbles = useCallback(() => {
    if (!mainRef.current || !containerRef.current || bubblesRef.current.length > 0) return;

    const containerWidth = mainRef.current.scrollWidth;
    const containerHeight = mainRef.current.scrollHeight;
    containerRef.current.style.width = `${containerWidth}px`;
    containerRef.current.style.height = `${containerHeight}px`;

    const bubbleCount = 200;
    const newBubbles = Array.from({ length: bubbleCount }).map(() => {
        const size = 15 + Math.random() * 60;
        const bubble = {
            el: document.createElement('div'),
            x: Math.random() * containerWidth,
            y: Math.random() * containerHeight,
            vx: (Math.random() - 0.5) * 0.4,
            vy: (Math.random() - 0.5) * 0.4,
            size: size,
        };
        
        bubble.el.className = 'bubble';
        bubble.el.style.width = `${size}px`;
        bubble.el.style.height = `${size}px`;
        
        const inner = document.createElement('div');
        inner.className = 'bubble-inner';
        bubble.el.appendChild(inner);

        containerRef.current.appendChild(bubble.el);
        return bubble;
    });
    bubblesRef.current = newBubbles;
  }, [mainRef]);

  useEffect(() => {
    // This function only updates the container dimensions, it does not reset the bubbles.
    const updateContainerSize = () => {
        if (containerRef.current && mainRef.current) {
            containerRef.current.style.height = `${mainRef.current.scrollHeight}px`;
            containerRef.current.style.width = `${mainRef.current.scrollWidth}px`;
        }
    };
    const debouncedUpdateSize = debounce(updateContainerSize, 50);

    // This function is more destructive and is only used for full window resizes.
    const handleFullResize = () => {
        if (containerRef.current) {
            containerRef.current.innerHTML = '';
        }
        bubblesRef.current = [];
        initializeBubbles();
    };
    const debouncedFullResize = debounce(handleFullResize, 250);

    const handleMouseMove = (e) => {
      mousePosition.current = { x: e.clientX, y: e.clientY };
    };

    const initTimeout = setTimeout(initializeBubbles, 500);
    window.addEventListener('mousemove', handleMouseMove);
    window.addEventListener('resize', debouncedFullResize);

    let observer;
    if (mainRef.current) {
        // Use the non-destructive update for content changes.
        observer = new MutationObserver(debouncedUpdateSize);
        observer.observe(mainRef.current, { childList: true, subtree: true, attributes: true });
    }

    const animate = () => {
      const currentBubbles = bubblesRef.current;
      if (!currentBubbles || !mainRef.current) {
        animationFrameId.current = requestAnimationFrame(animate);
        return;
      }

      const containerWidth = mainRef.current.scrollWidth;
      const containerHeight = mainRef.current.scrollHeight;
      const currentMouse = mousePosition.current;

      currentBubbles.forEach(bubble => {
        bubble.vx += (Math.random() - 0.5) * 0.1;
        bubble.vy += (Math.random() - 0.5) * 0.1;

        bubble.x += bubble.vx;
        bubble.y += bubble.vy;

        // Ensure bubbles that go off-screen can come back.
        if (bubble.x + bubble.size / 2 > containerWidth) {
            bubble.x = containerWidth - bubble.size / 2;
            bubble.vx *= -1;
        } else if (bubble.x - bubble.size / 2 < 0) {
            bubble.x = bubble.size / 2;
            bubble.vx *= -1;
        }

        if (bubble.y + bubble.size / 2 > containerHeight) {
            bubble.y = containerHeight - bubble.size / 2;
            bubble.vy *= -1;
        } else if (bubble.y - bubble.size / 2 < 0) {
            bubble.y = bubble.size / 2;
            bubble.vy *= -1;
        }

        const dx = bubble.x - (currentMouse.x + window.scrollX);
        const dy = bubble.y - (currentMouse.y + window.scrollY);
        const distance = Math.sqrt(dx * dx + dy * dy);
        const repulsionRadius = 150;
        const repulsionStrength = 1.5;

        if (distance < repulsionRadius) {
            const force = (repulsionRadius - distance) / repulsionRadius;
            const angle = Math.atan2(dy, dx);
            bubble.vx += Math.cos(angle) * force * repulsionStrength;
            bubble.vy += Math.sin(angle) * force * repulsionStrength;
        }

        bubble.vx *= 0.98;
        bubble.vy *= 0.98;

        bubble.el.style.transform = `translate(${bubble.x - bubble.size/2}px, ${bubble.y - bubble.size/2}px)`;
      });

      animationFrameId.current = requestAnimationFrame(animate);
    };

    animate();

    const currentContainer = containerRef.current;

    return () => {
      clearTimeout(initTimeout);
      window.removeEventListener('mousemove', handleMouseMove);
      window.removeEventListener('resize', debouncedFullResize);
      if (observer) observer.disconnect();
      if (animationFrameId.current) {
        cancelAnimationFrame(animationFrameId.current);
      }
      if (currentContainer) {
          currentContainer.innerHTML = '';
      }
    };
  }, [mainRef, initializeBubbles]);

  return <div ref={containerRef} className="interactive-bubbles-container" />;
};

export default InteractiveBubbles;
