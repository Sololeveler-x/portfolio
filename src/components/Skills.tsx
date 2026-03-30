import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

const CDN = "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/";

const skills = [
  { name: "React",            icon: "react/react-original.svg",                        cat: "Frontend", url: "https://react.dev" },
  { name: "Next.js",          icon: "nextjs/nextjs-original.svg",                      cat: "Frontend", url: "https://nextjs.org" },
  { name: "TypeScript",       icon: "typescript/typescript-original.svg",              cat: "Frontend", url: "https://www.typescriptlang.org" },
  { name: "Tailwind CSS",     icon: "tailwindcss/tailwindcss-original.svg",            cat: "Frontend", url: "https://tailwindcss.com" },
  { name: "Python",           icon: "python/python-original.svg",                      cat: "Backend",  url: "https://www.python.org" },
  { name: "FastAPI",          icon: "fastapi/fastapi-original.svg",                    cat: "Backend",  url: "https://fastapi.tiangolo.com" },
  { name: "Node.js",          icon: "nodejs/nodejs-original.svg",                      cat: "Backend",  url: "https://nodejs.org" },
  { name: "Machine Learning", icon: "tensorflow/tensorflow-original.svg",              cat: "AI/ML",    url: "https://www.tensorflow.org" },
  { name: "Generative AI",    icon: "pytorch/pytorch-original.svg",                    cat: "AI/ML",    url: "https://pytorch.org" },
  { name: "Azure ML",         icon: "azure/azure-original.svg",                        cat: "AI/ML",    url: "https://azure.microsoft.com/en-us/products/machine-learning" },
  { name: "NLP",              icon: "anaconda/anaconda-original.svg",                  cat: "AI/ML",    url: "https://huggingface.co" },
  { name: "Data Analysis",    icon: "jupyter/jupyter-original.svg",                    cat: "Data",     url: "https://jupyter.org" },
  { name: "Pandas",           icon: "pandas/pandas-original.svg",                      cat: "Data",     url: "https://pandas.pydata.org" },
  { name: "NumPy",            icon: "numpy/numpy-original.svg",                        cat: "Data",     url: "https://numpy.org" },
  { name: "Power BI",         icon: "microsoftsqlserver/microsoftsqlserver-plain.svg", cat: "Data",     url: "https://powerbi.microsoft.com" },
  { name: "Tableau",          icon: "d3js/d3js-original.svg",                          cat: "Data",     url: "https://www.tableau.com" },
  { name: "SQL",              icon: "mysql/mysql-original.svg",                        cat: "Database", url: "https://www.mysql.com" },
  { name: "MongoDB",          icon: "mongodb/mongodb-original.svg",                    cat: "Database", url: "https://www.mongodb.com" },
  { name: "Supabase",         icon: "supabase/supabase-original.svg",                  cat: "Database", url: "https://supabase.com" },
  { name: "PostgreSQL",       icon: "postgresql/postgresql-original.svg",              cat: "Database", url: "https://www.postgresql.org" },
  { name: "Git",              icon: "git/git-original.svg",                            cat: "Tools",    url: "https://git-scm.com" },
  { name: "VS Code",          icon: "vscode/vscode-original.svg",                      cat: "Tools",    url: "https://code.visualstudio.com" },
  { name: "Blockchain",       icon: "solidity/solidity-original.svg",                  cat: "Tools",    url: "https://soliditylang.org" },
  { name: "Framer Motion",    icon: "framermotion/framermotion-original.svg",          cat: "Tools",    url: "https://www.framer.com/motion" },
];

const row1 = skills.slice(0, 12);
const row2 = skills.slice(12);

const catColor: Record<string, string> = {
  Frontend: "#6b7cff",
  Backend:  "#2dd4bf",
  "AI/ML":  "#a855f7",
  Data:     "#ec4899",
  Database: "#f59e0b",
  Tools:    "#ff6b1a",
};

const MarqueeRow = ({ items, direction }: { items: typeof skills; direction: "left" | "right" }) => {
  const doubled = [...items, ...items];
  return (
    <div style={{ overflow: "hidden", position: "relative", width: "100%" }}>
      {/* Edge fade masks */}
      <div style={{
        position: "absolute", inset: 0, zIndex: 2, pointerEvents: "none",
        background: "linear-gradient(to right, #0a0a14 0%, transparent 10%, transparent 90%, #0a0a14 100%)",
      }} />
      <motion.div
        animate={{ x: direction === "left" ? ["0%", "-50%"] : ["-50%", "0%"] }}
        transition={{ duration: 32, repeat: Infinity, ease: "linear" }}
        style={{ display: "flex", gap: 14, width: "max-content" }}
      >
        {doubled.map((skill, i) => {
          const c = catColor[skill.cat] || "#6b7cff";
          return (
            <MarqueeCard key={i} skill={skill} color={c} />
          );
        })}
      </motion.div>
    </div>
  );
};

const MarqueeCard = ({ skill, color }: { skill: typeof skills[0]; color: string }) => {
  const [hov, setHov] = useState(false);
  return (
    <a
      href={skill.url}
      target="_blank"
      rel="noopener noreferrer"
      onMouseEnter={() => setHov(true)}
      onMouseLeave={() => setHov(false)}
      style={{
        display: "flex", flexDirection: "column" as const, alignItems: "center", gap: 12,
        background: "#0a0a18",
        border: `1px solid ${hov ? color : "#1a1a35"}`,
        borderRadius: 10,
        padding: "22px 24px",
        minWidth: 120,
        boxShadow: hov ? `0 0 20px ${color}4d` : "none",
        transform: hov ? "translateY(-5px)" : "translateY(0)",
        transition: "border-color 0.2s, box-shadow 0.2s, transform 0.2s",
        cursor: "pointer",
        position: "relative" as const,
        overflow: "hidden",
        textDecoration: "none",
      }}
    >
      <div style={{ position: "absolute", top: 0, left: 0, right: 0, height: 2, background: color }} />
      <img
        src={CDN + skill.icon}
        alt={skill.name}
        width={52} height={52}
        style={{ objectFit: "contain" }}
        onError={e => { (e.currentTarget as HTMLImageElement).style.opacity = "0.3"; }}
      />
      <span style={{
        fontFamily: "Rajdhani,sans-serif",
        textTransform: "uppercase" as const,
        fontSize: "0.72rem",
        letterSpacing: "0.08em",
        color: "#c8caf0",
        whiteSpace: "nowrap" as const,
      }}>
        {skill.name}
      </span>
    </a>
  );
};

export default function Skills() {
  const [revealed, setRevealed] = useState(false);
  const [ripple, setRipple] = useState(false);
  const [ripplePos, setRipplePos] = useState({ x: 0, y: 0 });

  const handleReveal = (e: React.MouseEvent<HTMLButtonElement>) => {
    const rect = e.currentTarget.getBoundingClientRect();
    setRipplePos({ x: e.clientX - rect.left, y: e.clientY - rect.top });
    setRipple(true);
    setRevealed(true);
    setTimeout(() => setRipple(false), 700);
  };

  return (
    <section style={{ background: "var(--bg-primary)", padding: "80px 40px", overflow: "hidden" }}>
      <div style={{ maxWidth: 1400, margin: "0 auto 40px" }}>
        <p style={{ fontFamily: "Rajdhani,sans-serif", fontSize: 11, letterSpacing: "0.4em", color: "#6b7cff", textTransform: "uppercase" as const, marginBottom: 10 }}>◈ SKILL REGISTRY</p>
        <h2 style={{ fontFamily: "Inter,sans-serif", fontWeight: 800, fontSize: "clamp(2rem,4vw,3.5rem)", color: "#fff", lineHeight: 1 }}>
          What I work with<span style={{ color: "#ff6b1a" }}>.</span>
        </h2>
      </div>

      <div style={{ maxWidth: 1400, margin: "0 auto" }}>
        {/* Control row */}
        <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginBottom: 40 }}>
          <div>
            <p style={{ fontFamily: "Rajdhani,sans-serif", fontWeight: 700, fontSize: "0.78rem", letterSpacing: "0.25em", color: "#a855f7", marginBottom: 4 }}>◈ TECH ARSENAL</p>
            <p style={{ fontFamily: "Rajdhani,sans-serif", fontSize: "0.7rem", letterSpacing: "0.15em", color: revealed ? "#4ade80" : "rgba(168,85,247,0.45)", transition: "color 0.6s ease" }}>
              {revealed ? "ALL SKILLS UNLOCKED" : "24 SKILLS LOCKED"}
            </p>
          </div>

          <AnimatePresence mode="wait">
            {!revealed ? (
              <motion.button
                key="reveal"
                onClick={handleReveal}
                animate={{ boxShadow: ["0 0 8px rgba(168,85,247,0.3)", "0 0 24px rgba(168,85,247,0.7)", "0 0 8px rgba(168,85,247,0.3)"] }}
                transition={{ duration: 2.5, repeat: Infinity }}
                whileHover={{ background: "rgba(168,85,247,0.1)" }}
                style={{ fontFamily: "Rajdhani,sans-serif", fontWeight: 700, fontSize: "0.82rem", letterSpacing: "0.3em", color: "#a855f7", background: "transparent", border: "1px solid #a855f7", borderRadius: 4, padding: "10px 28px", cursor: "pointer", position: "relative" as const, overflow: "hidden" }}
              >
                REVEAL STACK
                {ripple && (
                  <motion.div
                    initial={{ scale: 0, opacity: 0.8 }}
                    animate={{ scale: 8, opacity: 0 }}
                    transition={{ duration: 0.7, ease: "easeOut" }}
                    style={{ position: "absolute", top: ripplePos.y, left: ripplePos.x, width: 20, height: 20, borderRadius: "50%", background: "rgba(168,85,247,0.4)", pointerEvents: "none", transform: "translate(-50%,-50%)" }}
                  />
                )}
              </motion.button>
            ) : (
              <motion.div
                key="revealed"
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.4 }}
                style={{ fontFamily: "Rajdhani,sans-serif", fontWeight: 700, fontSize: "0.82rem", letterSpacing: "0.25em", color: "#4ade80", border: "1px solid #4ade80", borderRadius: 4, padding: "10px 28px", boxShadow: "0 0 15px rgba(74,222,128,0.3)" }}
              >
                ✦ STACK REVEALED ✦
              </motion.div>
            )}
          </AnimatePresence>
        </div>

        {/* Skeleton hint — shown when not yet revealed */}
        {!revealed && (
          <>
            <style>{`
              @keyframes shimmer-sweep {
                0%   { background-position: -200px 0; }
                100% { background-position: 200px 0; }
              }
            `}</style>
            <div style={{ display: "flex", gap: 14, marginTop: 32, opacity: 0.4, flexWrap: "wrap" as const }}>
              {Array.from({ length: 6 }).map((_, i) => (
                <div
                  key={i}
                  style={{
                    width: 80,
                    height: 80,
                    borderRadius: 10,
                    background: "rgba(255,255,255,0.03)",
                    border: "1px solid rgba(255,255,255,0.05)",
                    overflow: "hidden",
                    position: "relative" as const,
                  }}
                >
                  <div
                    style={{
                      position: "absolute",
                      inset: 0,
                      backgroundImage: "linear-gradient(90deg, transparent 0%, rgba(255,255,255,0.06) 50%, transparent 100%)",
                      backgroundSize: "400px 100%",
                      animation: `shimmer-sweep 2s ease-in-out infinite`,
                      animationDelay: `${i * 0.2}s`,
                    }}
                  />
                </div>
              ))}
            </div>
          </>
        )}

        {/* Ground line — only shown after reveal */}
        {revealed && (
          <div style={{
            width: "100%", height: 1,
            background: "linear-gradient(90deg,transparent,#a855f7,#6b7cff,#a855f7,transparent)",
            boxShadow: "0 0 30px rgba(168,85,247,0.8), 0 0 60px rgba(168,85,247,0.4)",
          }} />
        )}

        {/* Marquee rows — with enough top spacing so they never overlap the header */}
        <div style={{ minHeight: revealed ? 0 : 0 }}>
          <AnimatePresence>
            {revealed && (
              <motion.div
                initial={{ opacity: 0, y: 40 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
                style={{ display: "flex", flexDirection: "column", gap: 16, paddingTop: 48 }}
              >
                {/* Purple mist above row 1 */}
                <div style={{
                  width: "100%", height: 50,
                  background: "radial-gradient(ellipse at 50% 0%, rgba(168,85,247,0.12) 0%, transparent 70%)",
                  filter: "blur(10px)",
                  pointerEvents: "none",
                  marginBottom: -20,
                }} />
                <MarqueeRow items={row1} direction="left" />
                <MarqueeRow items={row2} direction="right" />
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </div>
    </section>
  );
}
