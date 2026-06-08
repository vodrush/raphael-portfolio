import React, { useEffect, useRef } from 'react';

interface InteractiveBubblesProps {
  mainRef: React.RefObject<HTMLDivElement | null>;
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
  const mouse = useRef<{ x: number; y: number }>({ x: -999, y: -999 });
  const canvasHeight = useRef<number>(0);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    const dpr = window.devicePixelRatio || 1;

    const getThemeColors = (): string[] => {
      const isDark = document.body.classList.contains('dark-mode');
      if (isDark) {
        return [
          'rgba(59, 130, 246, 0.08)',
          'rgba(99, 102, 241, 0.06)',
          'rgba(139, 92, 246, 0.05)',
        ];
      }
      return [
        'rgba(59, 130, 246, 0.06)',
        'rgba(99, 102, 241, 0.04)',
        'rgba(139, 92, 246, 0.03)',
      ];
    };

    const resizeCanvas = () => {
      const w = window.innerWidth;
      const h = mainRef.current ? mainRef.current.scrollHeight : document.documentElement.scrollHeight;
      canvasHeight.current = h;

      canvas.width = w * dpr;
      canvas.height = h * dpr;
      canvas.style.width = w + 'px';
      canvas.style.height = h + 'px';
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
      initParticles();
    };

    const initParticles = () => {
      particles.current = [];
      const particleCount = 40;
      const colors = getThemeColors();
      const w = window.innerWidth;
      const h = canvasHeight.current;

      for (let i = 0; i < particleCount; i++) {
        const size = Math.random() * 80 + 20;
        particles.current.push({
          x: Math.random() * w,
          y: Math.random() * h,
          vx: (Math.random() - 0.5) * 0.4,
          vy: (Math.random() - 0.5) * 0.4,
          size,
          color: colors[Math.floor(Math.random() * colors.length)]
        });
      }
    };

    const animate = () => {
      const w = window.innerWidth;
      const h = canvasHeight.current;
      ctx.clearRect(0, 0, w, h);

      particles.current.forEach(p => {
        p.x += p.vx;
        p.y += p.vy;

        if (p.x < -p.size) p.x = w + p.size;
        if (p.x > w + p.size) p.x = -p.size;
        if (p.y < -p.size) p.y = h + p.size;
        if (p.y > h + p.size) p.y = -p.size;

        const scrollY = window.scrollY || document.documentElement.scrollTop;
        const mouseInCanvasX = mouse.current.x;
        const mouseInCanvasY = mouse.current.y + scrollY;

        const dx = p.x - mouseInCanvasX;
        const dy = p.y - mouseInCanvasY;
        const distance = Math.sqrt(dx * dx + dy * dy);
        const maxDist = 200;

        if (distance < maxDist) {
          const force = (maxDist - distance) / maxDist;
          p.vx += (dx / distance) * force * 0.5;
          p.vy += (dy / distance) * force * 0.5;
        }

        const maxSpeed = 1.5;
        const speed = Math.sqrt(p.vx * p.vx + p.vy * p.vy);
        if (speed > maxSpeed) {
          p.vx = (p.vx / speed) * maxSpeed;
          p.vy = (p.vy / speed) * maxSpeed;
        }

        p.vx *= 0.99;
        p.vy *= 0.99;

        ctx.beginPath();
        ctx.arc(p.x, p.y, p.size, 0, Math.PI * 2);
        ctx.fillStyle = p.color;
        ctx.fill();
      });

      animationFrameId.current = requestAnimationFrame(animate);
    };

    resizeCanvas();
    animate();

    const handleResize = () => resizeCanvas();
    const handleMouseMove = (e: MouseEvent) => {
      mouse.current = { x: e.clientX, y: e.clientY };
    };
    const handleMouseLeave = () => {
      mouse.current = { x: -999, y: -999 };
    };

    window.addEventListener('resize', handleResize);
    window.addEventListener('mousemove', handleMouseMove);
    document.addEventListener('mouseleave', handleMouseLeave);

    // Watch for theme changes
    const themeObserver = new MutationObserver(() => {
      const colors = getThemeColors();
      particles.current.forEach(p => {
        p.color = colors[Math.floor(Math.random() * colors.length)];
      });
    });
    themeObserver.observe(document.body, { attributes: true, attributeFilter: ['class'] });

    // Watch for content size changes (lazy load, etc.)
    const resizeObserver = new ResizeObserver(() => {
      resizeCanvas();
    });
    if (mainRef.current) resizeObserver.observe(mainRef.current);

    return () => {
      window.removeEventListener('resize', handleResize);
      window.removeEventListener('mousemove', handleMouseMove);
      document.removeEventListener('mouseleave', handleMouseLeave);
      cancelAnimationFrame(animationFrameId.current);
      themeObserver.disconnect();
      resizeObserver.disconnect();
    };
  }, [mainRef]);

  return (
    <div className="interactive-bubbles-container">
      <canvas
        ref={canvasRef}
        style={{
          position: 'absolute',
          top: 0,
          left: 0,
          pointerEvents: 'none',
          zIndex: 0,
        }}
      />
    </div>
  );
};

export default InteractiveBubbles;
