import { useRef, useState, useEffect } from "react";
import { motion, useInView, AnimatePresence } from "framer-motion";
import { Github } from "lucide-react";

interface Project {
  num: string;
  title: string;
  rank: "S" | "A" | "B";
  rankColor: string;
  problem: string;
  solution: string;
  tech: string[];
  features: string[];
  github?: string;
  demo?: string;
}

const projects: Project[] = [
  {
    num: "01",
    title: "ClauseCraft AI",
    rank: "S",
    rankColor: "var(--sl-orange)",
    problem: "Legal contracts are dense, time-consuming to review, and risky when clauses are missed.",
    solution: "AI-powered contract analysis platform using OCR, NLP, and transformer models to extract, categorize, and flag risky clauses automatically.",
    tech: ["Next.js", "FastAPI", "Transformers", "Supabase", "Python", "NLP"],
    features: ["OCR document ingestion", "Clause extraction & categorization", "Risk scoring engine", "Side-by-side comparison", "Export reports"],
    github: "https://github.com/Sololeveler-x",
  },
  {
    num: "02",
    title: "BengaluruPulse",
    rank: "S",
    rankColor: "var(--sl-orange)",
    problem: "No unified dashboard exists to track Bengaluru's startup ecosystem, funding trends, and government initiatives in real time.",
    solution: "Live analytics dashboard aggregating startup data, funding rounds, and Gov API insights with AI-powered trend analysis.",
    tech: ["TypeScript", "DeepSeek AI", "Supabase", "Puppeteer", "Next.js"],
    features: ["Real-time funding tracker", "AI trend analysis", "Gov API integration", "Startup heatmap", "Sector breakdown"],
    github: "https://github.com/Sololeveler-x",
  },
  {
    num: "03",
    title: "RiskiQ",
    rank: "A",
    rankColor: "var(--sl-blue)",
    problem: "RBI compliance is fragmented across audit, loan risk, fraud detection, and reporting — no single platform handles all four.",
    solution: "4-in-1 RBI compliance platform built at Hackfest NMAMIT Karakal. Unified audit, loan risk scoring, fraud detection, and automated reporting.",
    tech: ["Next.js", "Python", "Supabase", "ML", "NLP", "FastAPI"],
    features: ["Audit automation", "Loan risk ML model", "Fraud detection engine", "Compliance reporting", "Dashboard analytics"],
    github: "https://github.com/Sololeveler-x",
  },
  {
    num: "04",
    title: "AxiomTrace",
    rank: "A",
    rankColor: "var(--sl-blue)",
    problem: "Digital forensics lacks a unified platform for AI-assisted evidence handling with tamper-proof chain of custody.",
    solution: "Digital forensics platform combining AI evidence analysis with blockchain-based chain of custody for immutable audit trails.",
    tech: ["React", "Node.js", "MongoDB", "Blockchain", "Azure ML"],
    features: ["AI evidence analysis", "Blockchain chain of custody", "Tamper detection", "Case management", "Azure ML integration"],
    github: "https://github.com/Sololeveler-x",
  },
  {
    num: "05",
    title: "Troop Management System",
    rank: "B",
    rankColor: "var(--sl-green)",
    problem: "Manual troop record-keeping is error-prone, slow, and lacks centralized attendance and activity tracking.",
    solution: "Secure desktop application for managing member records, attendance, and activities with a robust MySQL backend.",
    tech: ["Java", "SQL", "NetBeans", "MySQL"],
    features: ["Member record management", "Attendance tracking", "Activity logging", "Secure authentication", "Report generation"],
    github: "https://github.com/Sololeveler-x",
  },
];

// ─── GATE DETECTION OVERLAY ───────────────────────────────────────────────────

const GateDetectionOverlay = ({
  project,
  onRetreat,
  onEnter,
}: {
  project: Project;
  onRetreat: () => void;
  onEnter: () => void;
}) => {
  const [warningText, setWarningText] = useState("");
  const [showHeading, setShowHeading] = useState(false);
  const [showRank, setShowRank] = useState(false);
  const [showMeta, setShowMeta] = useState(false);
  const [showBar, setShowBar] = useState(false);
  const [barWidth, setBarWidth] = useState(0);
  const [showButtons, setShowButtons] = useState(false);
  const [showCorners, setShowCorners] = useState(false);

  const warningFull = "◈ PROJECT DETECTED ◈";
  const dangerLevel = project.rank === "S" ? "EXTREME" : project.rank === "A" ? "HIGH" : "MODERATE";
  const dangerPct = project.rank === "S" ? 100 : project.rank === "A" ? 75 : 50;

  useEffect(() => {
    // 1. corners
    const t0 = setTimeout(() => setShowCorners(true), 250);
    // 2. typewriter warning text
    let i = 0;
    const t1 = setTimeout(() => {
      const interval = setInterval(() => {
        i++;
        setWarningText(warningFull.slice(0, i));
        if (i >= warningFull.length) clearInterval(interval);
      }, 45);
      return () => clearInterval(interval);
    }, 300);
    // 3. heading
    const t2 = setTimeout(() => setShowHeading(true), 700);
    // 4. rank badge
    const t3 = setTimeout(() => setShowRank(true), 900);
    // 5. meta text
    const t4 = setTimeout(() => setShowMeta(true), 1000);
    // 6. bar
    const t5 = setTimeout(() => { setShowBar(true); setTimeout(() => setBarWidth(dangerPct), 100); }, 1100);
    // 7. buttons
    const t6 = setTimeout(() => setShowButtons(true), 1300);
    return () => { clearTimeout(t0); clearTimeout(t1); clearTimeout(t2); clearTimeout(t3); clearTimeout(t4); clearTimeout(t5); clearTimeout(t6); };
  }, [dangerPct]);

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.3 }}
      className="fixed inset-0 z-[9999] flex flex-col items-center justify-center"
      style={{ background: "rgba(0,0,0,0.95)" }}
      onClick={e => e.stopPropagation()}
    >
      <div className="pointer-events-none absolute inset-0 sl-scanlines" />
      <div className="absolute top-0 left-0 right-0 h-px" style={{ background: `linear-gradient(90deg, transparent, ${project.rankColor}, transparent)` }} />
      <div className="absolute bottom-0 left-0 right-0 h-px" style={{ background: `linear-gradient(90deg, transparent, ${project.rankColor}, transparent)` }} />
      <div className="absolute inset-0 pointer-events-none" style={{ background: `radial-gradient(ellipse at center, ${project.rankColor}18 0%, transparent 70%)` }} />

      <div className="relative z-10 text-center px-8" style={{ width: "min(600px, 90vw)" }}>
        {/* Corner ornaments */}
        {[
          { top: 0, left: 0, borderTop: `2px solid ${project.rankColor}`, borderLeft: `2px solid ${project.rankColor}` },
          { top: 0, right: 0, borderTop: `2px solid ${project.rankColor}`, borderRight: `2px solid ${project.rankColor}` },
          { bottom: 0, left: 0, borderBottom: `2px solid ${project.rankColor}`, borderLeft: `2px solid ${project.rankColor}` },
          { bottom: 0, right: 0, borderBottom: `2px solid ${project.rankColor}`, borderRight: `2px solid ${project.rankColor}` },
        ].map((s, i) => (
          <motion.div
            key={i}
            initial={{ opacity: 0, scale: 0.5 }}
            animate={showCorners ? { opacity: 1, scale: 1 } : { opacity: 0, scale: 0.5 }}
            transition={{ duration: 0.2, delay: i * 0.04 }}
            style={{ position: "absolute", width: 20, height: 20, ...s }}
          />
        ))}

        {/* Warning typewriter */}
        <p className="sl-text text-[10px] font-bold tracking-[0.3em] mb-3" style={{ color: "#f87171", minHeight: "1.2em" }}>
          {warningText}
        </p>

        {/* Heading */}
        <motion.h2
          initial={{ scale: 1.3, opacity: 0 }}
          animate={showHeading ? { scale: 1, opacity: 1 } : { scale: 1.3, opacity: 0 }}
          transition={{ type: "spring", stiffness: 200, damping: 20 }}
          className="sl-text font-black tracking-[0.1em] mb-4"
          style={{
            fontSize: "clamp(1.8rem, 5vw, 3rem)",
            color: project.rankColor,
            textShadow: `0 0 30px ${project.rankColor}, 0 0 60px ${project.rankColor}40`,
          }}
        >
          CASE FILE UNLOCKED
        </motion.h2>

        {/* Rank badge */}
        <motion.div
          initial={{ y: 20, opacity: 0 }}
          animate={showRank ? { y: 0, opacity: 1 } : { y: 20, opacity: 0 }}
          transition={{ duration: 0.3 }}
          className="inline-block mb-4 px-6 py-2"
          style={{ border: `2px solid ${project.rankColor}`, boxShadow: `0 0 16px ${project.rankColor}60` }}
        >
          <span className="sl-text text-2xl font-black" style={{ color: project.rankColor }}>{project.rank}-RANK</span>
        </motion.div>

        {/* Project name + complexity */}
        <motion.p
          initial={{ opacity: 0 }}
          animate={showMeta ? { opacity: 1 } : { opacity: 0 }}
          transition={{ duration: 0.3 }}
          className="sl-text text-sm mb-6"
          style={{ color: "var(--text-muted)" }}
        >
          &ldquo;{project.title}&rdquo; &middot; Complexity: {dangerLevel}
        </motion.p>

        {/* Complexity bar */}
        {showBar && (
          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="mb-6">
            <div className="flex justify-between sl-text text-[9px] tracking-[0.2em] mb-1" style={{ color: "var(--text-muted)" }}>
              <span>COMPLEXITY LEVEL</span>
              <span style={{ color: project.rankColor }}>{dangerLevel}</span>
            </div>
            <div className="h-[4px] rounded-full overflow-hidden" style={{ background: "rgba(255,255,255,0.08)" }}>
              <div
                className="h-full rounded-full"
                style={{
                  width: `${barWidth}%`,
                  background: project.rankColor,
                  boxShadow: `0 0 8px ${project.rankColor}`,
                  transition: "width 1.2s ease-out",
                }}
              />
            </div>
          </motion.div>
        )}

        {/* Buttons */}
        <motion.div
          initial={{ y: 30, opacity: 0 }}
          animate={showButtons ? { y: 0, opacity: 1 } : { y: 30, opacity: 0 }}
          transition={{ duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
          className="flex gap-4 justify-center"
        >
          <button
            onClick={onRetreat}
            className="sl-text font-bold tracking-[0.2em] px-6 py-2.5 rounded-sm text-sm transition-all duration-200 hover:bg-white/5"
            style={{ border: "1px solid var(--sl-border)", color: "var(--text-muted)" }}
          >
            [GO BACK]
          </button>
          <motion.button
            onClick={onEnter}
            whileHover={{ scale: 1.05, background: project.rankColor, color: "#000" }}
            whileTap={{ scale: 0.97 }}
            className="sl-text font-black tracking-[0.2em] px-6 py-2.5 rounded-sm text-sm transition-all duration-200"
            style={{ border: `1px solid ${project.rankColor}`, color: project.rankColor, background: "transparent" }}
          >
            [VIEW PROJECT]
          </motion.button>
        </motion.div>
      </div>
    </motion.div>
  );
};

// ─── SECTION DIVIDER ──────────────────────────────────────────────────────────

const SLDivider = ({ label }: { label: string }) => {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-40px" });
  return (
    <div ref={ref} className="flex items-center gap-3 my-6">
      <motion.div
        initial={{ scaleX: 0 }}
        animate={inView ? { scaleX: 1 } : {}}
        transition={{ duration: 0.5, ease: "easeOut" }}
        style={{ flex: 1, height: 1, background: "#1a1a35", transformOrigin: "center" }}
      />
      <motion.span
        initial={{ opacity: 0 }}
        animate={inView ? { opacity: 1 } : {}}
        transition={{ duration: 0.3, delay: 0.2 }}
        className="sl-text font-bold"
        style={{ fontSize: "0.68rem", letterSpacing: "0.25em", color: "#6b7cff", whiteSpace: "nowrap" }}
      >
        ◈ {label} ◈
      </motion.span>
      <motion.div
        initial={{ scaleX: 0 }}
        animate={inView ? { scaleX: 1 } : {}}
        transition={{ duration: 0.5, ease: "easeOut" }}
        style={{ flex: 1, height: 1, background: "#1a1a35", transformOrigin: "center" }}
      />
    </div>
  );
};

// ─── PROJECT MODAL ────────────────────────────────────────────────────────────

const ProjectModal = ({ project, onClose }: { project: Project; onClose: () => void }) => {
  useEffect(() => {
    const handler = (e: KeyboardEvent) => { if (e.key === "Escape") onClose(); };
    window.addEventListener("keydown", handler);
    // lock body scroll
    document.body.style.overflow = "hidden";
    return () => {
      window.removeEventListener("keydown", handler);
      document.body.style.overflow = "";
    };
  }, [onClose]);

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.3 }}
      className="fixed inset-0 z-[9999]"
      style={{ background: "rgba(0,0,0,0.85)", backdropFilter: "blur(4px)" }}
      onClick={onClose}
    >
      <motion.div
        initial={{ y: "100%" }}
        animate={{ y: 0 }}
        exit={{ y: "100%" }}
        transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
        onClick={e => e.stopPropagation()}
        onWheel={e => e.stopPropagation()}
        style={{
          position: "absolute",
          bottom: 0, left: 0, right: 0,
          maxHeight: "90vh",
          background: "#0a0a14",
          borderTop: "1px solid #1a1a35",
          borderRadius: "16px 16px 0 0",
          overflowY: "auto",
          padding: "48px 56px",
        }}
      >
        {/* Top glow */}
        <div style={{
          position: "absolute", top: 0, left: 0, right: 0, height: 200,
          background: "radial-gradient(ellipse at 50% 0%, rgba(107,124,255,0.06) 0%, transparent 60%)",
          pointerEvents: "none",
        }} />

        {/* Close button */}
        <button
          onClick={onClose}
          style={{
            position: "absolute", top: 24, right: 32,
            background: "none", border: "none", cursor: "pointer",
            fontSize: "1.2rem", color: "#6060a0", transition: "color 0.2s ease",
          }}
          onMouseEnter={e => (e.currentTarget.style.color = "#ef4444")}
          onMouseLeave={e => (e.currentTarget.style.color = "#6060a0")}
        >
          ✕
        </button>

        {/* Header */}
        <div style={{ marginBottom: 32, position: "relative", zIndex: 1 }}>
          <div style={{ display: "flex", alignItems: "center", gap: 12, marginBottom: 8 }}>
            <span className="sl-text" style={{
              fontWeight: 800, fontSize: "1.1rem",
              padding: "3px 14px", borderRadius: 4,
              color: "#000", background: project.rankColor,
              boxShadow: `0 0 16px ${project.rankColor}80`,
            }}>
              {project.rank}
            </span>
            <span className="sl-text" style={{ fontSize: "0.72rem", letterSpacing: "0.3em", color: "#6060a0" }}>
              PROJECT COMPLETED
            </span>
          </div>
          <h2 style={{ fontFamily: "'Inter', sans-serif", fontWeight: 800, fontSize: "clamp(1.6rem, 3vw, 2.5rem)", color: "#fff", marginBottom: 10 }}>
            {project.title}
          </h2>
          <span className="sl-text" style={{
            fontSize: "0.7rem", letterSpacing: "0.2em",
            border: "1px solid #4ade80", color: "#4ade80",
            background: "transparent", padding: "4px 14px", borderRadius: 4,
            display: "inline-block",
          }}>
            SHIPPED ✓
          </span>
        </div>

        <div style={{ position: "relative", zIndex: 1 }}>
          <SLDivider label="THE PROBLEM" />
          <div style={{
            background: "rgba(239,68,68,0.05)",
            border: "1px solid rgba(239,68,68,0.2)",
            borderLeft: "3px solid #ef4444",
            borderRadius: 4, padding: "20px 24px",
          }}>
            <p style={{ fontFamily: "'Inter', sans-serif", fontSize: "0.92rem", color: "#c8caf0", lineHeight: 1.7 }}>
              {project.problem}
            </p>
          </div>

          <SLDivider label="MY SOLUTION" />
          <div style={{
            background: "rgba(107,124,255,0.05)",
            border: "1px solid rgba(107,124,255,0.2)",
            borderLeft: "3px solid #6b7cff",
            borderRadius: 4, padding: "20px 24px",
          }}>
            <p style={{ fontFamily: "'Inter', sans-serif", fontSize: "0.92rem", color: "#c8caf0", lineHeight: 1.7 }}>
              {project.solution}
            </p>
          </div>

          <SLDivider label="TECH STACK" />
          <div style={{ display: "flex", flexWrap: "wrap", gap: 10 }}>
            {project.tech.map((t, i) => (
              <motion.span
                key={t}
                initial={{ scale: 0, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                transition={{ type: "spring", stiffness: 300, damping: 20, delay: i * 0.05 }}
                className="sl-text"
                style={{
                  border: "1px solid #1a1a35", color: "#c8caf0", background: "#111130",
                  fontSize: "0.72rem", letterSpacing: "0.1em",
                  padding: "6px 16px", borderRadius: 20,
                }}
              >
                {t}
              </motion.span>
            ))}
          </div>

          <SLDivider label="KEY FEATURES" />
          <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "10px 40px" }}>
            {project.features.map((f, i) => (
              <motion.div
                key={f}
                initial={{ x: -10, opacity: 0 }}
                animate={{ x: 0, opacity: 1 }}
                transition={{ delay: i * 0.08, duration: 0.3 }}
                style={{ display: "flex", alignItems: "center", gap: 10 }}
              >
                <span style={{ color: "#4ade80", fontWeight: 700 }}>✓</span>
                <span style={{ fontFamily: "'Inter', sans-serif", fontSize: "0.88rem", color: "#c8caf0" }}>{f}</span>
              </motion.div>
            ))}
          </div>

          {/* GitHub button */}
          {project.github && (
            <div style={{ marginTop: 32 }}>
              <a
                href={project.github}
                target="_blank"
                rel="noopener noreferrer"
                style={{
                  display: "inline-flex", alignItems: "center", gap: 10,
                  border: "1px solid #1a1a35", background: "#0d0d22", color: "#c8caf0",
                  padding: "14px 28px", borderRadius: 6,
                  fontFamily: "'Inter', sans-serif", fontSize: "0.88rem", fontWeight: 600,
                  textDecoration: "none", transition: "all 0.2s ease",
                }}
                onMouseEnter={e => {
                  const el = e.currentTarget as HTMLAnchorElement;
                  el.style.borderColor = "#6b7cff";
                  el.style.color = "#fff";
                  el.style.background = "rgba(107,124,255,0.08)";
                }}
                onMouseLeave={e => {
                  const el = e.currentTarget as HTMLAnchorElement;
                  el.style.borderColor = "#1a1a35";
                  el.style.color = "#c8caf0";
                  el.style.background = "#0d0d22";
                }}
              >
                <Github size={16} /> GITHUB
              </a>
            </div>
          )}
        </div>
      </motion.div>
    </motion.div>
  );
};

// ─── PROJECT CARD ─────────────────────────────────────────────────────────────

const ProjectCard = ({ project, index }: { project: Project; index: number }) => {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, margin: "-60px" });
  const [hovered, setHovered] = useState(false);
  const [showOverlay, setShowOverlay] = useState(false);
  const [showModal, setShowModal] = useState(false);

  return (
    <>
      <motion.div
        ref={ref}
        initial={{ opacity: 0, y: 40 }}
        animate={inView ? { opacity: 1, y: 0 } : {}}
        transition={{ duration: 0.55, delay: index * 0.08, ease: [0.22, 1, 0.36, 1] }}
        onMouseEnter={() => setHovered(true)}
        onMouseLeave={() => setHovered(false)}
        onClick={() => setShowOverlay(true)}
        style={{
          position: "relative",
          background: hovered ? "rgba(12,10,28,0.95)" : "#0a0a18",
          border: `1px solid ${hovered ? project.rankColor + "60" : "#1a1a35"}`,
          borderLeft: `3px solid ${project.rankColor}`,
          borderRadius: 8,
          padding: "28px 32px",
          cursor: "pointer",
          overflow: "hidden",
          transition: "background 0.3s ease, border-color 0.3s ease, box-shadow 0.3s ease",
          boxShadow: hovered ? `0 8px 40px rgba(0,0,0,0.5), 0 0 20px ${project.rankColor}18` : "0 2px 12px rgba(0,0,0,0.3)",
          transform: hovered ? "translateY(-3px)" : "translateY(0)",
        }}
      >
        {/* Scan lines overlay */}
        <div style={{
          position: "absolute", inset: 0, pointerEvents: "none",
          background: "repeating-linear-gradient(0deg,transparent,transparent 2px,rgba(255,255,255,0.008) 2px,rgba(255,255,255,0.008) 4px)",
          opacity: hovered ? 1 : 0.5, transition: "opacity 0.3s",
        }} />

        {/* Corner ornaments */}
        {[
          { top: 0, right: 0, borderTop: `1px solid ${project.rankColor}`, borderRight: `1px solid ${project.rankColor}` },
          { bottom: 0, right: 0, borderBottom: `1px solid ${project.rankColor}`, borderRight: `1px solid ${project.rankColor}` },
        ].map((s, i) => (
          <div key={i} style={{ position: "absolute", width: 14, height: 14, opacity: hovered ? 0.8 : 0.3, transition: "opacity 0.3s", ...s }} />
        ))}

        {/* Rank glow bg */}
        <div style={{
          position: "absolute", top: 0, right: 0, width: 200, height: 200,
          background: `radial-gradient(ellipse at top right, ${project.rankColor}0a 0%, transparent 65%)`,
          pointerEvents: "none",
          opacity: hovered ? 1 : 0.4, transition: "opacity 0.3s",
        }} />

        <div style={{ position: "relative", zIndex: 1 }}>
          {/* Top row */}
          <div style={{ display: "flex", alignItems: "flex-start", justifyContent: "space-between", marginBottom: 16 }}>
            <div style={{ display: "flex", alignItems: "center", gap: 12 }}>
              {/* Number */}
              <span style={{
                fontFamily: "Rajdhani, sans-serif", fontWeight: 800,
                fontSize: "clamp(2.5rem, 5vw, 4rem)",
                color: "rgba(255,255,255,0.04)", lineHeight: 1, userSelect: "none",
              }}>
                {project.num}
              </span>
              {/* Rank badge */}
              <span className="sl-text" style={{
                fontWeight: 800, fontSize: "0.75rem", letterSpacing: "0.15em",
                padding: "4px 12px", borderRadius: 4,
                color: "#000", background: project.rankColor,
                boxShadow: hovered ? `0 0 14px ${project.rankColor}80` : "none",
                transition: "box-shadow 0.3s",
              }}>
                {project.rank}-RANK
              </span>
            </div>

            {/* Arrow */}
            <motion.span
              animate={{ x: hovered ? 6 : 0, opacity: hovered ? 1 : 0.2 }}
              transition={{ duration: 0.2 }}
              style={{ color: project.rankColor, fontSize: "1.2rem", marginTop: 4 }}
            >
              →
            </motion.span>
          </div>

          {/* Title */}
          <h3 style={{
            fontFamily: "Inter, sans-serif", fontWeight: 800,
            fontSize: "clamp(1.1rem, 2vw, 1.5rem)",
            color: hovered ? "#fff" : "#c8caf0",
            marginBottom: 10, lineHeight: 1.2,
            transition: "color 0.2s",
          }}>
            {project.title}
          </h3>

          {/* Problem snippet */}
          <p style={{
            fontFamily: "Inter, sans-serif", fontSize: "0.82rem",
            color: "rgba(255,255,255,0.3)", lineHeight: 1.6,
            marginBottom: 18,
          }}>
            {project.problem.slice(0, 90)}...
          </p>

          {/* Tech pills */}
          <div style={{ display: "flex", flexWrap: "wrap", gap: 6 }}>
            {project.tech.slice(0, 4).map(t => (
              <span key={t} className="sl-text" style={{
                fontSize: "0.62rem", letterSpacing: "0.1em", textTransform: "uppercase",
                border: "1px solid rgba(255,255,255,0.07)",
                color: "rgba(255,255,255,0.28)",
                padding: "3px 10px", borderRadius: 20,
              }}>
                {t}
              </span>
            ))}
          </div>

          {/* Bottom hint */}
          <div style={{ marginTop: 16, display: "flex", alignItems: "center", gap: 8 }}>
            <div style={{ flex: 1, height: 1, background: `linear-gradient(to right, ${project.rankColor}30, transparent)` }} />
            <span className="sl-text" style={{
              fontSize: "0.6rem", letterSpacing: "0.2em",
              color: hovered ? project.rankColor : "rgba(107,124,255,0.3)",
              transition: "color 0.2s",
            }}>
              ◈ VIEW CASE FILE
            </span>
          </div>
        </div>
      </motion.div>

      <AnimatePresence>
        {showOverlay && !showModal && (
          <GateDetectionOverlay
            project={project}
            onRetreat={() => setShowOverlay(false)}
            onEnter={() => { setShowOverlay(false); setShowModal(true); }}
          />
        )}
        {showModal && (
          <ProjectModal project={project} onClose={() => setShowModal(false)} />
        )}
      </AnimatePresence>
    </>
  );
};

// ─── PROJECTS SECTION ─────────────────────────────────────────────────────────

const Projects = () => (
  <section className="relative py-20 overflow-hidden" style={{ background: "var(--bg-primary)" }}>
    <div className="pointer-events-none absolute inset-0 opacity-[0.025]"
      style={{ backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 200 200' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.85' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)'/%3E%3C/svg%3E")` }}
    />

    <div className="relative z-10 px-6 sm:px-10 mb-12">
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: false, margin: "-60px" }}
        transition={{ duration: 0.7 }}
      >
        <p className="sl-text mb-3 text-[10px] font-bold tracking-[0.4em] uppercase" style={{ color: "var(--sl-orange)" }}>◈ PROJECT ARCHIVE</p>
        <h2 className="font-black tracking-tight text-white" style={{ fontSize: "clamp(1.8rem, 4vw, 3.2rem)", lineHeight: 1.05 }}>
          Things I've built<span style={{ color: "var(--sl-orange)" }}>.</span>
        </h2>
        <p className="sl-text mt-3 text-[11px] tracking-[0.2em]" style={{ color: "rgba(107,124,255,0.45)" }}>
          Click any project to view case file
        </p>
      </motion.div>
    </div>

    <div className="relative z-10 px-6 sm:px-10"
      style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(min(100%, 420px), 1fr))", gap: 16 }}>
      {projects.map((p, i) => <ProjectCard key={p.num} project={p} index={i} />)}
    </div>
  </section>
);

export default Projects;
