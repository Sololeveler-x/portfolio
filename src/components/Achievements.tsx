import { useRef, useState, useEffect } from "react";
import { motion, useScroll, useTransform, AnimatePresence } from "framer-motion";

const achievements = [
  {
    id: "01",
    badge: "NATIONAL FINALIST",
    badgeColor: "#ff6b1a",
    title: "Smart India Hackathon 2024",
    detail: "Finalist · National Level",
    year: "2024",
    description: "Selected as a national finalist in Smart India Hackathon 2024 — one of the largest hackathons in India with over 50,000 participating teams. Competed against top teams from colleges across the country, presenting a real-world problem statement solution to a national jury panel.",
    learnings: [
      "How to scope and ship a full product under 36-hour pressure",
      "Presenting technical solutions to non-technical judges clearly",
      "Team coordination and task delegation under deadlines",
      "Validating ideas quickly with minimal viable prototypes",
      "Handling live demos and unexpected technical failures gracefully",
    ],
    images: [] as string[],
  },
  {
    id: "02",
    badge: "TOP 10",
    badgeColor: "#6b7cff",
    title: "Hackfest NMAMIT Karakal",
    detail: "Top 10 · Built RiskiQ",
    year: "2024",
    description: "Secured Top 10 at Hackfest NMAMIT Karakal. Built RiskiQ — a 4-in-1 RBI compliance platform covering audit automation, loan risk scoring, fraud detection, and automated reporting. The platform was designed to unify fragmented compliance workflows into a single dashboard.",
    learnings: [
      "Designing multi-module systems with a unified architecture",
      "Integrating ML models (loan risk scoring) into a production-ready API",
      "Understanding RBI compliance requirements and fintech domain knowledge",
      "Building fraud detection logic with rule-based and ML approaches",
      "Rapid full-stack development with Next.js + FastAPI + Supabase",
    ],
    images: [],
  },
  {
    id: "03",
    badge: "PARTICIPANT",
    badgeColor: "#6b7cff",
    title: "FOSS Hackathon",
    detail: "Participant",
    year: "2024",
    description: "Participated in the FOSS (Free and Open Source Software) Hackathon, building open source solutions and contributing to the open source ecosystem. Focused on building tools that are transparent, community-driven, and freely available.",
    learnings: [
      "Open source contribution workflows — PRs, issues, documentation",
      "Building with community-first design principles",
      "Licensing, versioning, and maintaining public repositories",
      "Collaborating with developers outside your immediate team",
      "The value of transparency and reproducibility in software",
    ],
    images: [],
  },
  {
    id: "04",
    badge: "ORGANIZER",
    badgeColor: "#a855f7",
    title: "Internal SIH at PESITM",
    detail: "Organized",
    year: "2024",
    description: "Organized the internal Smart India Hackathon round at PESITM — coordinating 20+ teams, setting up judging panels, managing event logistics, and ensuring smooth execution from registration to final presentations.",
    learnings: [
      "Event planning and logistics management at scale",
      "Coordinating between faculty, students, and external judges",
      "Building evaluation rubrics and judging criteria",
      "Leadership under pressure — handling last-minute changes",
      "How to run a fair, structured technical competition",
    ],
    images: [],
  },
  {
    id: "05",
    badge: "ACTIVE MEMBER",
    badgeColor: "#4ade80",
    title: "ASTRA Coding Club, PESITM",
    detail: "Active Member",
    year: "2023–Present",
    description: "Core member of ASTRA Coding Club at PESITM — involved in organizing workshops, coding competitions, peer learning sessions, and technical events. Helped build a culture of continuous learning and collaboration within the college.",
    learnings: [
      "Teaching and explaining technical concepts to peers",
      "Organizing workshops on web dev, DSA, and competitive programming",
      "Building community and fostering a learning culture",
      "Consistent long-term commitment beyond individual projects",
      "Networking with like-minded developers early in career",
    ],
    images: [],
  },
];

type Achievement = typeof achievements[0];

// ─── GALLERY MODAL ────────────────────────────────────────────────────────────

const GalleryModal = ({ item, onClose }: { item: Achievement; onClose: () => void }) => {
  useEffect(() => {
    document.body.style.overflow = "hidden";
    const handler = (e: KeyboardEvent) => { if (e.key === "Escape") onClose(); };
    window.addEventListener("keydown", handler);
    return () => {
      document.body.style.overflow = "";
      window.removeEventListener("keydown", handler);
    };
  }, [onClose]);
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.25 }}
      className="fixed inset-0 z-[9999]"
      style={{ background: "rgba(0,0,0,0.85)", backdropFilter: "blur(4px)" }}
      onClick={onClose}
    >
      <motion.div
        initial={{ y: "100%" }}
        animate={{ y: 0 }}
        exit={{ y: "100%" }}
        transition={{ duration: 0.45, ease: [0.22, 1, 0.36, 1] }}
        onClick={e => e.stopPropagation()}
        onWheel={e => e.stopPropagation()}
        style={{
          position: "absolute", bottom: 0, left: 0, right: 0,
          maxHeight: "85vh",
          background: "#0a0a14",
          borderTop: "1px solid #1a1a35",
          borderRadius: "16px 16px 0 0",
          overflowY: "auto",
          padding: "40px 48px 48px",
        }}
      >
        {/* Top glow */}
        <div style={{
          position: "absolute", top: 0, left: 0, right: 0, height: 160,
          background: `radial-gradient(ellipse at 50% 0%, ${item.badgeColor}10 0%, transparent 70%)`,
          pointerEvents: "none",
        }} />

        {/* Close */}
        <button
          onClick={onClose}
          style={{
            position: "absolute", top: 20, right: 28,
            background: "none", border: "none", cursor: "pointer",
            fontSize: "1.1rem", color: "#6060a0", transition: "color 0.2s",
          }}
          onMouseEnter={e => (e.currentTarget.style.color = "#ef4444")}
          onMouseLeave={e => (e.currentTarget.style.color = "#6060a0")}
        >✕</button>

        {/* Header */}
        <div style={{ position: "relative", zIndex: 1, marginBottom: 28 }}>
          <div style={{ display: "flex", alignItems: "center", gap: 12, marginBottom: 10 }}>
            <span style={{
              fontFamily: "Rajdhani, sans-serif", fontWeight: 700,
              fontSize: "0.65rem", letterSpacing: "0.2em",
              border: `1px solid ${item.badgeColor}`, color: item.badgeColor,
              padding: "3px 12px", borderRadius: 3,
            }}>
              {item.badge}
            </span>
            <span style={{ fontFamily: "Rajdhani, sans-serif", fontSize: "0.65rem", letterSpacing: "0.15em", color: "rgba(255,255,255,0.25)" }}>
              {item.year}
            </span>
          </div>
          <h2 style={{ fontFamily: "Inter, sans-serif", fontWeight: 800, fontSize: "clamp(1.4rem, 3vw, 2rem)", color: "#fff", marginBottom: 12 }}>
            {item.title}
          </h2>
          <p style={{ fontFamily: "Inter, sans-serif", fontSize: "0.88rem", color: "rgba(255,255,255,0.45)", lineHeight: 1.7, maxWidth: 640 }}>
            {item.description}
          </p>
        </div>

        {/* What I learned */}
        <div style={{ marginBottom: 32, position: "relative", zIndex: 1 }}>
          <div style={{ display: "flex", alignItems: "center", gap: 12, marginBottom: 16 }}>
            <div style={{ flex: 1, height: 1, background: "#1a1a35" }} />
            <span style={{ fontFamily: "Rajdhani, sans-serif", fontSize: "0.65rem", letterSpacing: "0.25em", color: "#6b7cff", whiteSpace: "nowrap" as const }}>◈ WHAT I LEARNED ◈</span>
            <div style={{ flex: 1, height: 1, background: "#1a1a35" }} />
          </div>
          <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "10px 32px" }}>
            {item.learnings.map((l, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, x: -10 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: i * 0.07, duration: 0.3 }}
                style={{ display: "flex", alignItems: "flex-start", gap: 10 }}
              >
                <span style={{ color: item.badgeColor, fontWeight: 700, flexShrink: 0, marginTop: 2 }}>◈</span>
                <span style={{ fontFamily: "Inter, sans-serif", fontSize: "0.84rem", color: "rgba(255,255,255,0.55)", lineHeight: 1.5 }}>{l}</span>
              </motion.div>
            ))}
          </div>
        </div>

        {/* Gallery */}
        <div style={{ position: "relative", zIndex: 1 }}>
          <div style={{ display: "flex", alignItems: "center", gap: 12, marginBottom: 16 }}>
            <div style={{ flex: 1, height: 1, background: "#1a1a35" }} />
            <span style={{ fontFamily: "Rajdhani, sans-serif", fontSize: "0.65rem", letterSpacing: "0.25em", color: "#6b7cff", whiteSpace: "nowrap" as const }}>◈ GALLERY ◈</span>
            <div style={{ flex: 1, height: 1, background: "#1a1a35" }} />
          </div>
          <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(160px, 1fr))", gap: 12 }}>
            {item.images.length > 0 ? item.images.map((src, i) => (
              <img key={i} src={src} alt="" style={{ width: "100%", aspectRatio: "4/3", objectFit: "cover", borderRadius: 6, border: "1px solid #1a1a35" }} />
            )) : (
              Array.from({ length: 4 }).map((_, i) => (
                <div key={i} style={{
                  aspectRatio: "4/3", borderRadius: 6,
                  border: "1px dashed #1a1a35",
                  display: "flex", flexDirection: "column" as const, alignItems: "center", justifyContent: "center",
                  gap: 8, color: "rgba(255,255,255,0.12)",
                }}>
                  <span style={{ fontSize: "1.5rem" }}>+</span>
                  <span style={{ fontFamily: "Rajdhani, sans-serif", fontSize: "0.6rem", letterSpacing: "0.15em" }}>ADD PHOTO</span>
                </div>
              ))
            )}
          </div>
        </div>
      </motion.div>
    </motion.div>
  );
};

// ─── TIMELINE ITEM ────────────────────────────────────────────────────────────

const TimelineItem = ({ item, index }: { item: Achievement; index: number }) => {
  const ref = useRef<HTMLDivElement>(null);
  const [modalOpen, setModalOpen] = useState(false);
  const left = index % 2 === 0;

  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start 0.95", "start 0.35"],
  });

  const opacity = useTransform(scrollYProgress, [0, 0.5, 1], [0, 1, 1]);
  const x = useTransform(scrollYProgress, [0, 0.6], [left ? -60 : 60, 0]);

  return (
    <>
      <motion.div
        ref={ref}
        style={{ opacity, x }}
        className={`relative flex items-center ${left ? "justify-start" : "justify-end"}`}
        onClick={() => setModalOpen(true)}
      >
        <div
          className={`w-[45%] ${left ? "text-right pr-8" : "text-left pl-8"}`}
          style={{ cursor: "pointer" }}
        >
          <span
            className="sl-text inline-block text-[9px] font-black tracking-[0.2em] px-2 py-0.5 rounded-sm mb-2"
            style={{ border: `1px solid ${item.badgeColor}`, color: item.badgeColor }}
          >
            {item.badge}
          </span>
          <h3 className="font-bold text-white text-sm leading-snug mb-1 hover:underline" style={{ textDecorationColor: item.badgeColor }}>
            {item.title}
          </h3>
          <p className="sl-text text-xs" style={{ color: "var(--text-muted)" }}>{item.detail}</p>
          <p className="sl-text text-[10px] font-semibold tracking-wider mt-0.5" style={{ color: item.badgeColor, opacity: 0.7 }}>{item.year}</p>
          {/* Click hint */}
          <p className="sl-text text-[9px] mt-1.5" style={{ color: "rgba(107,124,255,0.4)", letterSpacing: "0.15em" }}>
            ◈ VIEW GALLERY
          </p>
        </div>

        {/* Center node */}
        <div
          className="absolute left-1/2 -translate-x-1/2 w-3 h-3 rounded-full border-2"
          style={{
            borderColor: item.badgeColor,
            background: "var(--bg-primary)",
            boxShadow: `0 0 12px ${item.badgeColor}`,
          }}
        />

        {/* ID */}
        <div
          className="absolute left-1/2 sl-text text-[9px] font-black"
          style={{
            color: "var(--text-muted)",
            top: "50%",
            transform: `translateY(-50%) ${left ? "translateX(20px)" : "translateX(-36px)"}`,
          }}
        >
          {item.id}
        </div>
      </motion.div>

      <AnimatePresence>
        {modalOpen && <GalleryModal item={item} onClose={() => setModalOpen(false)} />}
      </AnimatePresence>
    </>
  );
};

// ─── ACHIEVEMENTS SECTION ─────────────────────────────────────────────────────

const Achievements = () => {
  const sectionRef = useRef<HTMLDivElement>(null);
  const headRef = useRef<HTMLDivElement>(null);

  const { scrollYProgress: lineProgress } = useScroll({
    target: sectionRef,
    offset: ["start 0.8", "end 0.5"],
  });
  const lineScale = useTransform(lineProgress, [0, 1], [0, 1]);

  const { scrollYProgress: headProgress } = useScroll({
    target: headRef,
    offset: ["start 0.95", "start 0.5"],
  });
  const headOpacity = useTransform(headProgress, [0, 0.6], [0, 1]);
  const headX = useTransform(headProgress, [0, 0.6], [-50, 0]);

  return (
    <section
      className="relative py-20 px-6 sm:px-12 lg:px-20 overflow-hidden"
      style={{ background: "var(--bg-secondary)" }}
    >
      <div className="pointer-events-none absolute inset-0 opacity-[0.025]"
        style={{ backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 200 200' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.85' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)'/%3E%3C/svg%3E")` }}
      />

      <div className="relative z-10 max-w-4xl mx-auto">
        <motion.div ref={headRef} style={{ opacity: headOpacity, x: headX }} className="mb-14">
          <p className="sl-text mb-2 text-[10px] font-bold tracking-[0.4em] uppercase" style={{ color: "var(--sl-orange)" }}>◈ TIMELINE</p>
          <h2 className="font-black tracking-tight text-white" style={{ fontSize: "clamp(1.8rem, 4vw, 3.2rem)" }}>
            Milestones.<br />
            <span style={{ color: "var(--sl-orange)" }}>Momentum.</span>
          </h2>
        </motion.div>

        <div ref={sectionRef} className="relative">
          {/* Animated center line */}
          <motion.div
            className="absolute left-1/2 top-0 bottom-0 w-px -translate-x-1/2 origin-top"
            style={{
              background: "linear-gradient(to bottom, var(--sl-blue), var(--sl-purple), var(--sl-orange))",
              scaleY: lineScale,
            }}
          />

          <div className="space-y-12">
            {achievements.map((item, i) => (
              <TimelineItem key={item.id} item={item} index={i} />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default Achievements;
