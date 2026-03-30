import { useEffect, useRef } from "react";

interface Particle {
  x: number;
  y: number;
  vx: number;
  vy: number;
  opacity: number;
  size: number;
  color: string;
}

const COLORS = ["#6b7cff", "#a855f7"];
const MAX_PARTICLES = 12;

export default function CursorTrail() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const particles = useRef<Particle[]>([]);
  const lastSpawn = useRef(0);
  const rafId = useRef<number>(0);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    const resize = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    };
    resize();
    window.addEventListener("resize", resize);

    const onMouseMove = (e: MouseEvent) => {
      const now = performance.now();
      if (now - lastSpawn.current < 16) return;
      lastSpawn.current = now;

      if (particles.current.length >= MAX_PARTICLES) {
        particles.current.shift();
      }

      particles.current.push({
        x: e.clientX,
        y: e.clientY,
        vx: (Math.random() - 0.5) * 1.2,
        vy: -(0.5 + Math.random() * 1.0),
        opacity: 0.5,
        size: 2 + Math.random() * 2,
        color: COLORS[particles.current.length % 2],
      });
    };

    window.addEventListener("mousemove", onMouseMove, { passive: true });

    const loop = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);

      particles.current = particles.current.filter((p) => p.opacity > 0.01);

      for (const p of particles.current) {
        p.x += p.vx;
        p.y += p.vy;
        p.opacity -= 0.018;

        ctx.beginPath();
        ctx.arc(p.x, p.y, p.size, 0, Math.PI * 2);
        ctx.fillStyle = p.color + Math.round(p.opacity * 255).toString(16).padStart(2, "0");
        ctx.fill();
      }

      rafId.current = requestAnimationFrame(loop);
    };

    rafId.current = requestAnimationFrame(loop);

    return () => {
      window.removeEventListener("resize", resize);
      window.removeEventListener("mousemove", onMouseMove);
      cancelAnimationFrame(rafId.current);
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      style={{
        position: "fixed",
        inset: 0,
        zIndex: 9980,
        pointerEvents: "none",
      }}
    />
  );
}
