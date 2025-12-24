import React from 'react';


const FloatingParticles = () => {
  const particles = Array.from({ length: 30 }).map((_, i) => (
    <div
      key={i}
      className="particle"
      style={{
        left: `${Math.random() * 100}%`,
        top: `${Math.random() * 100}%`,
        animationDelay: `${Math.random() * 10}s`,
        animationDuration: `${10 + Math.random() * 10}s`,
        width: `${5 + Math.random() * 15}px`,
        height: `${5 + Math.random() * 15}px`,
      }}
    ></div>
  ));

  return <div className="floating-particles-container">{particles}</div>;
};

export default FloatingParticles;