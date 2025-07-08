import React, { useState, useEffect, useRef, useCallback } from 'react';
import './InteractiveBubbles.css';

const InteractiveBubbles = ({ mainRef }) => {
  const [bubbles, setBubbles] = useState([]); // Keep useState for initial render and container size changes
  const mousePosition = useRef({ x: 0, y: 0 });
  const containerRef = useRef(null);
  const animationFrameId = useRef(null);

  // Store bubble data (x, y, vx, vy, size) in a ref for direct manipulation
  const bubbleDataRef = useRef([]);

  const updateContainerSize = useCallback(() => {
    if (containerRef.current && mainRef.current) {
      const currentScrollHeight = mainRef.current.scrollHeight;
      const currentScrollWidth = mainRef.current.scrollWidth;

      containerRef.current.style.height = `${currentScrollHeight}px`;
      containerRef.current.style.width = `${currentScrollWidth}px`;

      // Only re-initialize bubbles if they don't exist or container size changes
      if (bubbles.length === 0 ||
          bubbleDataRef.current[0]?.containerWidth !== currentScrollWidth ||
          bubbleDataRef.current[0]?.containerHeight !== currentScrollHeight) {

        const newBubblesData = Array.from({ length: 250 }).map((_, i) => ({
          id: i,
          x: Math.random() * currentScrollWidth,
          y: Math.random() * currentScrollHeight,
          size: 20 + Math.random() * 80,
          vx: (Math.random() - 0.5) * 0.5,
          vy: (Math.random() - 0.5) * 0.5,
          elementRef: React.createRef(), // Ref for the DOM element
          containerWidth: currentScrollWidth,
          containerHeight: currentScrollHeight,
        }));
        bubbleDataRef.current = newBubblesData; // Update the ref
        setBubbles(newBubblesData); // Trigger React re-render to create DOM elements
      }
    }
  }, [mainRef, bubbles.length]); // Add mainRef and bubbles.length as dependencies for useCallback

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
      const currentBubblesData = bubbleDataRef.current;
      const currentMainRef = mainRef.current;
      const currentMousePosition = mousePosition.current;

      currentBubblesData.forEach((bubble) => {
        let { x, y, vx, vy, size, elementRef } = bubble;

        vx += (Math.random() - 0.5) * 0.2;
        vy += (Math.random() - 0.5) * 0.2;

        x += vx;
        y += vy;

        if (currentMainRef) {
          if (x + size / 2 > currentMainRef.scrollWidth || x - size / 2 < 0) {
            vx *= -1;
          }
          if (y + size / 2 > currentMainRef.scrollHeight || y - size / 2 < 0) {
            vy *= -1;
          }
        }

        const dx = x - (currentMousePosition.x + window.scrollX);
        const dy = y - (currentMousePosition.y + window.scrollY);
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

        // Update bubble object in ref
        bubble.x = x;
        bubble.y = y;
        bubble.vx = vx;
        bubble.vy = vy;

        // Directly update DOM element's style using transform
        if (elementRef.current) {
          elementRef.current.style.transform = `translate(${x}px, ${y}px) translate(-50%, -50%)`;
        }
      });

      animationFrameId.current = requestAnimationFrame(animate);
    };

    // Start animation only if bubbles have been initialized
    if (bubbles.length > 0) {
      animate();
    }


    return () => {
      clearTimeout(timeoutId);
      window.removeEventListener('mousemove', handleMouseMove);
      window.removeEventListener('resize', updateContainerSize);
      if (observer) {
        observer.disconnect();
      }
      if (animationFrameId.current) {
        cancelAnimationFrame(animationFrameId.current);
      }
    };
  }, [mainRef, bubbles.length, updateContainerSize]); // Depend on bubbles.length and updateContainerSize to re-run effect when bubbles are initialized or container size changes

  return (
    <div ref={containerRef} className="interactive-bubbles-container">
      {/* Render bubbles using the state, which will be updated only on initial load and resize */}
      {bubbles.map((bubble) => (
        <div
          key={bubble.id}
          ref={bubble.elementRef} // Assign ref to the DOM element
          className="bubble"
          style={{
            width: bubble.size,
            height: bubble.size,
          }}
        >
          <div className="bubble-inner"></div>
        </div>
      ))}
    </div>
  );
};

export default InteractiveBubbles;