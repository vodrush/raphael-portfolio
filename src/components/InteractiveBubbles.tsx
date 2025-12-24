import React, { useEffect, useRef } from 'react';

interface InteractiveBubblesProps {
  mainRef: React.RefObject<HTMLDivElement>;
}

interface Particle {
  x: number;
  y: number;
  vx: number;
  vy: number;
  size: number;
  color: string;
}

const InteractiveBubbles: React.FC<InteractiveBubblesProps> = ({ mainRef }) => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const animationFrameId = useRef<number>(0);
  const particles = useRef<Particle[]>([]);
  const mouse = useRef<{ x: number; y: number }>({ x: 0, y: 0 });

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    // Gestion du redimensionnement
    const resizeCanvas = () => {
      if (mainRef.current) {
        canvas.width = mainRef.current.scrollWidth;
        // On prend un peu plus grand pour couvrir le scroll éventuel ou juste la fenêtre
        // Mais ici on veut que ça suive le main content
        canvas.height = mainRef.current.scrollHeight;
        initParticles();
      } else {
        canvas.width = window.innerWidth;
        canvas.height = window.innerHeight;
        initParticles();
      }
    };

    const initParticles = () => {
      particles.current = [];
      const particleCount = 100; // Nombre de bulles

      // Couleurs basées sur le thème sombre/clair (on pourra affiner)
      // Pour l'instant on met des couleurs neutres qui marchent avec les deux ou transparentes
      const colors = ['rgba(179, 174, 219, 0.3)', 'rgba(52, 73, 94, 0.3)', 'rgba(255, 255, 255, 0.2)'];

      for (let i = 0; i < particleCount; i++) {
        const size = Math.random() * 20 + 5;
        particles.current.push({
          x: Math.random() * canvas.width,
          y: Math.random() * canvas.height,
          vx: (Math.random() - 0.5) * 1, // Vitesse un peu plus rapide
          vy: (Math.random() - 0.5) * 1,
          size: size,
          color: colors[Math.floor(Math.random() * colors.length)]
        });
      }
    };

    const animate = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);

      particles.current.forEach(p => {
        // Mouvement de base
        p.x += p.vx;
        p.y += p.vy;

        // Rebond sur les bords
        if (p.x < 0 || p.x > canvas.width) p.vx *= -1;
        if (p.y < 0 || p.y > canvas.height) p.vy *= -1;

        // Interaction Souris (Répulsion fluide)
        // On doit ajuster la pos souris avec le scroll car le canvas est en absolute dans le flux
        // Si le canvas est fixe background, c'est différent.
        // Ici le canvas est dans le flux (absolute top 0).
        const mx = mouse.current.x; // + window.scrollX si besoin, mais event clientX est viewport
        // Le canvas est surement en absolute par rapport au document, donc il faut compenser le scroll
        // Si le canvas commence à 0,0 du document :
        const scrollX = window.scrollX || document.documentElement.scrollLeft;
        const scrollY = window.scrollY || document.documentElement.scrollTop;

        // Calcul de la distance souris (relative au viewport) vs particule (relative au canvas/document)
        // Donc position souris dans le canvas = clientX + scrollX
        const mouseInCanvasX = mx + scrollX;
        const mouseInCanvasY = mouse.current.y + scrollY;

        const dx = p.x - mouseInCanvasX;
        const dy = p.y - mouseInCanvasY;
        const distance = Math.sqrt(dx * dx + dy * dy);
        const maxDist = 150;

        if (distance < maxDist) {
          const forceDirectionX = dx / distance;
          const forceDirectionY = dy / distance;
          const force = (maxDist - distance) / maxDist;
          const directionX = forceDirectionX * force * 2; // Force de répulsion
          const directionY = forceDirectionY * force * 2;

          p.vx += directionX;
          p.vy += directionY;
        }

        // Friction pour éviter que ça accélère à l'infini
        // On veut que ça revienne à une vitesse normale
        /* 
           Simple friction: on réduit la vélocité si elle est trop grande
           Mais on veut garder le mouvement brownien de base.
        */
        // Limite de vitesse
        const maxSpeed = 3;
        const speed = Math.sqrt(p.vx * p.vx + p.vy * p.vy);
        if (speed > maxSpeed) {
          p.vx = (p.vx / speed) * maxSpeed;
          p.vy = (p.vy / speed) * maxSpeed;
        }


        // Dessin
        ctx.beginPath();
        ctx.arc(p.x, p.y, p.size, 0, Math.PI * 2);
        ctx.fillStyle = p.color;
        ctx.fill();
      });

      animationFrameId.current = requestAnimationFrame(animate);
    };

    resizeCanvas();
    window.addEventListener('resize', resizeCanvas);

    // Observer pour le redimensionnement du contenu main
    const observer = new ResizeObserver(resizeCanvas);
    if (mainRef.current) observer.observe(mainRef.current);

    animate();

    const handleMouseMove = (e: MouseEvent) => {
      mouse.current = { x: e.clientX, y: e.clientY };
    };
    window.addEventListener('mousemove', handleMouseMove);

    return () => {
      window.removeEventListener('resize', resizeCanvas);
      window.removeEventListener('mousemove', handleMouseMove);
      if (mainRef.current) observer.unobserve(mainRef.current);
      cancelAnimationFrame(animationFrameId.current);
    };
  }, [mainRef]);

  return (
    <canvas
      ref={canvasRef}
      className="interactive-bubbles-canvas"
      style={{
        position: 'absolute',
        top: 0,
        left: 0,
        width: '100%',
        height: '100%',
        pointerEvents: 'none',
        zIndex: 0 // Derrière le contenu
      }}
    />
  );
};

export default InteractiveBubbles;
