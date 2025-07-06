import React, { useState, useEffect, useRef } from 'react';
import './InteractiveBubbles.css';

const InteractiveBubbles = ({ mainRef }) => {
  const [bubbles, setBubbles] = useState([]);
  const mousePosition = useRef({ x: 0, y: 0 });
  const containerRef = useRef(null);

  const updateContainerSize = () => {
    if (containerRef.current && mainRef.current) {
      const currentScrollHeight = mainRef.current.scrollHeight;
      const currentScrollWidth = mainRef.current.scrollWidth;

      containerRef.current.style.height = `${currentScrollHeight}px`;
      containerRef.current.style.width = `${currentScrollWidth}px`;

      const newBubbles = Array.from({ length: 250 }).map((_, i) => ({
        id: i,
        x: Math.random() * currentScrollWidth,
        y: Math.random() * currentScrollHeight,
        size: 20 + Math.random() * 80,
        vx: (Math.random() - 0.5) * 0.5,
        vy: (Math.random() - 0.5) * 0.5,
      }));
      setBubbles(newBubbles);
    }
  };

  useEffect(() => {
    const timeoutId = setTimeout(updateContainerSize, 500);

    window.addEventListener('resize', updateContainerSize);

    let observer;
    if (mainRef.current) {
      observer = new MutationObserver(updateContainerSize);
      observer.observe(mainRef.current, { childList: true, subtree: true, attributes: true });
    }

    const handleMouseMove = (e) => {
      mousePosition.current = { x: e.clientX, y: e.clientY };
    };

    window.addEventListener('mousemove', handleMouseMove);

    const animate = () => {
      setBubbles((prevBubbles) =>
        prevBubbles.map((bubble) => {
          let { x, y, vx, vy, size } = bubble;

          vx += (Math.random() - 0.5) * 0.2;
          vy += (Math.random() - 0.5) * 0.2;

          x += vx;
          y += vy;

          if (mainRef.current) {
            if (x + size / 2 > mainRef.current.scrollWidth || x - size / 2 < 0) {
              vx *= -1;
            }
            if (y + size / 2 > mainRef.current.scrollHeight || y - size / 2 < 0) {
              vy *= -1;
            }
          }

          const dx = x - (mousePosition.current.x + window.scrollX);
          const dy = y - (mousePosition.current.y + window.scrollY);
          const distance = Math.sqrt(dx * dx + dy * dy);
          const repulsionRadius = 150;
          const repulsionStrength = 0.5;

          if (distance < repulsionRadius) {
            const force = (repulsionRadius - distance) / repulsionRadius * repulsionStrength;
            vx += (dx / distance) * force;
            vy += (dy / distance) * force;
          }

          vx *= 0.99;
          vy *= 0.99;

          return { ...bubble, x, y, vx, vy };
        })
      );
      requestAnimationFrame(animate);
    };

    animate();

    return () => {
      clearTimeout(timeoutId);
      window.removeEventListener('mousemove', handleMouseMove);
      window.removeEventListener('resize', updateContainerSize);
      if (observer) {
        observer.disconnect();
      }
    };
  }, [mainRef]);

  return (
    <div ref={containerRef} className="interactive-bubbles-container">
      {bubbles.map((bubble) => (
        <div
          key={bubble.id}
          className="bubble"
          style={{
            left: bubble.x,
            top: bubble.y,
            width: bubble.size,
            height: bubble.size,
            transform: 'translate(-50%, -50%)', // Center the bubble
          }}
        ></div>
      ))}
    </div>
  );
};

export default InteractiveBubbles;