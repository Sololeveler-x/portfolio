import { useMemo } from "react";

const AmbientParticles = () => {
  const particles = useMemo(() => {
    return Array.from({ length: 25 }, (_, i) => ({
      id: i,
      left: `${Math.random() * 100}%`,
      top: `${Math.random() * 100}%`,
      size: Math.random() * 3 + 1,
      delay: `${Math.random() * 8}s`,
      duration: `${Math.random() * 6 + 6}s`,
      opacity: Math.random() * 0.05 + 0.02,
      color: Math.random() > 0.5 ? "107,124,255" : "168,85,247",
    }));
  }, []);

  return (
    <>
      <style>{`
        @keyframes particle-rise {
          0%   { transform: translateY(0) scale(1); opacity: var(--p-opacity); }
          50%  { opacity: calc(var(--p-opacity) * 1.5); }
          100% { transform: translateY(-120px) scale(0.5); opacity: 0; }
        }
        @keyframes particle-pulse {
          0%, 100% { opacity: 0; }
          50%       { opacity: var(--p-opacity); }
        }
      `}</style>
      <div className="pointer-events-none fixed inset-0 z-[1] overflow-hidden">
        {particles.map(p => (
          <span
            key={p.id}
            style={{
              position: "absolute",
              left: p.left,
              top: p.top,
              width: p.size,
              height: p.size,
              borderRadius: "50%",
              background: `rgba(${p.color}, ${p.opacity})`,
              ["--p-opacity" as string]: p.opacity,
              willChange: "transform, opacity",
              animation: p.id % 3 === 0
                ? `particle-pulse ${p.duration} ${p.delay} ease-in-out infinite`
                : `particle-rise ${p.duration} ${p.delay} ease-in-out infinite`,
            }}
          />
        ))}
      </div>
    </>
  );
};

export default AmbientParticles;
