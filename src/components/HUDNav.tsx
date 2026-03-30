import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";

const SECTIONS = [
  { id: "hero",         label: "HOME",         num: "00" },
  { id: "status",       label: "ABOUT",        num: "01" },
  { id: "skills",       label: "SKILLS",       num: "02" },
  { id: "projects",     label: "PROJECTS",     num: "03" },
  { id: "achievements", label: "TIMELINE",     num: "04" },
  { id: "contact",      label: "CONTACT",      num: "05" },
];

export default function HUDNav() {
  const [active, setActive] = useState("hero");
  const [hovered, setHovered] = useState<string | null>(null);
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const t = setTimeout(() => setVisible(true), 1200);

    const observer = new IntersectionObserver(
      entries => {
        entries.forEach(entry => {
          if (entry.isIntersecting) {
            const id = (entry.target as HTMLElement).dataset.section;
            if (id) setActive(id);
          }
        });
      },
      { threshold: 0.35 }
    );

    const els = document.querySelectorAll("[data-section]");
    els.forEach(el => observer.observe(el));
    return () => { observer.disconnect(); clearTimeout(t); };
  }, []);

  const scrollTo = (id: string) => {
    const el = document.querySelector(`[data-section="${id}"]`);
    el?.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <AnimatePresence>
      {visible && (
        <motion.nav
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          exit={{ opacity: 0, x: 20 }}
          transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
          style={{
            position: "fixed",
            right: 28,
            top: "50%",
            transform: "translateY(-50%)",
            zIndex: 9990,
            display: "flex",
            flexDirection: "column",
            alignItems: "flex-end",
            gap: 6,
          }}
        >
          {SECTIONS.map(s => {
            const isActive = active === s.id;
            const isHov = hovered === s.id;
            return (
              <button
                key={s.id}
                onClick={() => scrollTo(s.id)}
                onMouseEnter={() => setHovered(s.id)}
                onMouseLeave={() => setHovered(null)}
                style={{
                  display: "flex",
                  alignItems: "center",
                  gap: 10,
                  background: "none",
                  border: "none",
                  cursor: "pointer",
                  padding: "4px 0",
                }}
              >
                {/* Label — shows on hover */}
                <AnimatePresence>
                  {(isHov || isActive) && (
                    <motion.span
                      initial={{ opacity: 0, x: 8 }}
                      animate={{ opacity: 1, x: 0 }}
                      exit={{ opacity: 0, x: 8 }}
                      transition={{ duration: 0.2 }}
                      style={{
                        fontFamily: "Rajdhani, sans-serif",
                        fontSize: "0.62rem",
                        fontWeight: 700,
                        letterSpacing: "0.2em",
                        color: isActive ? "#6b7cff" : "rgba(255,255,255,0.4)",
                      }}
                    >
                      {s.label}
                    </motion.span>
                  )}
                </AnimatePresence>

                {/* Dot */}
                <motion.div
                  animate={{
                    width: isActive ? 24 : 6,
                    background: isActive ? "#6b7cff" : isHov ? "rgba(107,124,255,0.6)" : "rgba(255,255,255,0.2)",
                    boxShadow: isActive ? "0 0 8px rgba(107,124,255,0.8)" : "none",
                  }}
                  transition={{ duration: 0.25, ease: "easeOut" }}
                  style={{
                    height: 2,
                    borderRadius: 2,
                    flexShrink: 0,
                  }}
                />
              </button>
            );
          })}
        </motion.nav>
      )}
    </AnimatePresence>
  );
}
