import React, { useMemo } from 'react';

interface InteractiveBubblesProps {
  mainRef: React.RefObject<HTMLDivElement | null>;
}

const InteractiveBubbles: React.FC<InteractiveBubblesProps> = () => {
  const particles = useMemo(() => {
    return Array.from({ length: 15 }, (_, i) => ({
      id: i,
      size: 40 + Math.random() * 120,
      left: Math.random() * 100,
      top: Math.random() * 100,
      duration: 20 + Math.random() * 30,
      delay: Math.random() * 10,
      opacity: 0.03 + Math.random() * 0.06,
    }));
  }, []);

  return (
    <div
      style={{
        position: 'absolute',
        top: 0,
        left: 0,
        width: '100%',
        height: '100%',
        pointerEvents: 'none',
        zIndex: 0,
        overflow: 'hidden',
      }}
    >
      {particles.map((p) => (
        <div
          key={p.id}
          style={{
            position: 'absolute',
            width: p.size,
            height: p.size,
            borderRadius: '50%',
            left: `${p.left}%`,
            top: `${p.top}%`,
            background: `radial-gradient(circle, rgba(59,130,246,${p.opacity}) 0%, transparent 70%)`,
            filter: 'blur(30px)',
            animation: `floatParticle ${p.duration}s ease-in-out ${p.delay}s infinite alternate`,
            willChange: 'transform',
          }}
        />
      ))}
      <style>{`
        @keyframes floatParticle {
          0% { transform: translate(0, 0) scale(1); }
          33% { transform: translate(30px, -40px) scale(1.1); }
          66% { transform: translate(-20px, 20px) scale(0.9); }
          100% { transform: translate(10px, -10px) scale(1.05); }
        }
      `}</style>
    </div>
  );
};

export default InteractiveBubbles;
