import React, { useState, useEffect, useRef } from 'react';
import './InteractiveBubbles.css';

const InteractiveBubbles = () => {
  const [bubbles, setBubbles] = useState([]);
  const mousePosition = useRef({ x: 0, y: 0 });
  const containerRef = useRef(null);

  const updateContainerSize = () => {
    if (containerRef.current) {
      containerRef.current.style.height = `${document.documentElement.scrollHeight}px`;
      containerRef.current.style.width = `${document.documentElement.scrollWidth}px`;
    }
  };

  useEffect(() => {
    const initializeBubbles = () => {
      updateContainerSize(); // Update size before generating bubbles

      const newBubbles = Array.from({ length: 250 }).map((_, i) => ({
        id: i,
        x: Math.random() * document.documentElement.scrollWidth,
        y: Math.random() * document.documentElement.scrollHeight, // Generate across full scrollHeight
        size: 20 + Math.random() * 80,
        vx: (Math.random() - 0.5) * 0.5, // Subtle initial velocity
        vy: (Math.random() - 0.5) * 0.5,
      }));
      setBubbles(newBubbles);
    };

    // Delay initialization to allow DOM to fully render
    const timeoutId = setTimeout(initializeBubbles, 500); // 500ms delay

    window.addEventListener('resize', updateContainerSize);

    // Observe changes in the DOM to update container size
    const observer = new MutationObserver(updateContainerSize);
    observer.observe(document.body, { childList: true, subtree: true, attributes: true });

    const handleMouseMove = (e) => {
      mousePosition.current = { x: e.clientX, y: e.clientY };
    };

    window.addEventListener('mousemove', handleMouseMove);

    const animate = () => {
      setBubbles((prevBubbles) =>
        prevBubbles.map((bubble) => {
          let { x, y, vx, vy, size } = bubble;

          // Add random drift
          vx += (Math.random() - 0.5) * 0.2;
          vy += (Math.random() - 0.5) * 0.2;

          // Apply basic movement
          x += vx;
          y += vy;

          // Bounce off walls
          if (x + size / 2 > document.documentElement.scrollWidth || x - size / 2 < 0) {
            vx *= -1;
          }
          if (y + size / 2 > document.documentElement.scrollHeight || y - size / 2 < 0) {
            vy *= -1;
          }

          // Repulsion from mouse
          const dx = x - (mousePosition.current.x + window.scrollX); // Account for scroll position
          const dy = y - (mousePosition.current.y + window.scrollY); // Account for scroll position
          const distance = Math.sqrt(dx * dx + dy * dy);
          const repulsionRadius = 150; // Radius around mouse for repulsion
          const repulsionStrength = 0.5; // How strong the push is

          if (distance < repulsionRadius) {
            const force = (repulsionRadius - distance) / repulsionRadius * repulsionStrength;
            vx += (dx / distance) * force;
            vy += (dy / distance) * force;
          }

          // Dampen velocity to prevent infinite acceleration
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
      observer.disconnect(); // Disconnect the observer on unmount
    };
  }, []); // Empty dependency array to run once on mount

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