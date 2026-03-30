import { useEffect, useState, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";

interface PreloaderProps {
  onComplete: (visitorName: string) => void;
}

const Preloader = ({ onComplete }: PreloaderProps) => {
  const [phase, setPhase] = useState<"boot" | "input" | "loading" | "done">("boot");
  const [bootText, setBootText] = useState("");
  const [visitorName, setVisitorName] = useState("");
  const [progress, setProgress] = useState(0);
  const [welcomeText, setWelcomeText] = useState("");
  const inputRef = useRef<HTMLInputElement>(null);

  const bootLine = "SYSTEM INITIALIZING...";

  // Phase 1 — boot typewriter
  useEffect(() => {
    let i = 0;
    const interval = setInterval(() => {
      i++;
      setBootText(bootLine.slice(0, i));
      if (i >= bootLine.length) {
        clearInterval(interval);
        setTimeout(() => setPhase("input"), 400);
      }
    }, 45);
    return () => clearInterval(interval);
  }, []);

  // Focus input when phase switches to input
  useEffect(() => {
    if (phase === "input") {
      setTimeout(() => inputRef.current?.focus(), 100);
    }
  }, [phase]);

  // Phase 3 — after name entered, welcome + progress
  useEffect(() => {
    if (phase !== "loading") return;

    const name = visitorName.trim() || "VISITOR";
    const line = `ACCESS GRANTED — WELCOME, ${name.toUpperCase()}.`;
    let i = 0;
    const tw = setInterval(() => {
      i++;
      setWelcomeText(line.slice(0, i));
      if (i >= line.length) clearInterval(tw);
    }, 30);

    // Progress bar
    const step = setInterval(() => {
      setProgress(p => {
        if (p >= 100) { clearInterval(step); return 100; }
        return p + 2;
      });
    }, 18);

    // Complete
    const t = setTimeout(() => {
      setPhase("done");
      sessionStorage.setItem("sl-visited", "1");
      sessionStorage.setItem("sl-visitor", visitorName.trim() || "");
      onComplete(visitorName.trim());
    }, 2400);

    return () => { clearInterval(tw); clearInterval(step); clearTimeout(t); };
  }, [phase, visitorName, onComplete]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setPhase("loading");
  };

  if (phase === "done") return null;

  return (
    <motion.div
      className="fixed inset-0 z-[99999] flex flex-col items-center justify-center"
      style={{ background: "#000" }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5 }}
    >
      {/* Scan lines */}
      <div className="pointer-events-none absolute inset-0"
        style={{
          background: "repeating-linear-gradient(0deg,transparent,transparent 2px,rgba(255,255,255,0.008) 2px,rgba(255,255,255,0.008) 4px)",
        }}
      />
      {/* Radial glow */}
      <div className="pointer-events-none absolute inset-0"
        style={{ background: "radial-gradient(ellipse at center, rgba(107,124,255,0.06) 0%, transparent 65%)" }}
      />

      <div className="relative z-10 flex flex-col items-center" style={{ width: "min(420px, 90vw)" }}>

        {/* Boot label */}
        <p style={{
          fontFamily: "Rajdhani, sans-serif",
          fontSize: "0.68rem", letterSpacing: "0.35em",
          color: "#6b7cff", marginBottom: 40,
          minHeight: "1em",
        }}>
          {bootText}
          {phase === "boot" && <span className="animate-pulse">_</span>}
        </p>

        <AnimatePresence mode="wait">

          {/* INPUT PHASE */}
          {phase === "input" && (
            <motion.div
              key="input"
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -16 }}
              transition={{ duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
              style={{ width: "100%", textAlign: "center" }}
            >
              <p style={{
                fontFamily: "Inter, sans-serif",
                fontWeight: 300, fontSize: "0.8rem",
                letterSpacing: "0.2em", color: "rgba(255,255,255,0.35)",
                marginBottom: 20, textTransform: "uppercase",
              }}>
                Identify yourself, visitor
              </p>

              <form onSubmit={handleSubmit} style={{ width: "100%" }}>
                <div style={{
                  position: "relative",
                  borderBottom: "1px solid rgba(107,124,255,0.4)",
                  marginBottom: 12,
                }}>
                  <input
                    ref={inputRef}
                    value={visitorName}
                    onChange={e => setVisitorName(e.target.value)}
                    placeholder="Enter your name..."
                    maxLength={32}
                    style={{
                      width: "100%",
                      background: "transparent",
                      border: "none",
                      outline: "none",
                      fontFamily: "Inter, sans-serif",
                      fontWeight: 600,
                      fontSize: "1.6rem",
                      color: "#fff",
                      textAlign: "center",
                      letterSpacing: "0.05em",
                      padding: "8px 0",
                      caretColor: "#6b7cff",
                    }}
                    autoComplete="off"
                    spellCheck={false}
                  />
                </div>
                <p style={{
                  fontFamily: "Rajdhani, sans-serif",
                  fontSize: "0.62rem", letterSpacing: "0.25em",
                  color: "rgba(107,124,255,0.45)",
                  marginBottom: 28,
                }}>
                  PRESS ENTER TO CONTINUE
                </p>
                <motion.button
                  type="submit"
                  whileHover={{ background: "rgba(107,124,255,0.15)" }}
                  whileTap={{ scale: 0.97 }}
                  style={{
                    fontFamily: "Rajdhani, sans-serif",
                    fontWeight: 700, fontSize: "0.78rem",
                    letterSpacing: "0.3em",
                    color: "#6b7cff",
                    background: "transparent",
                    border: "1px solid rgba(107,124,255,0.4)",
                    borderRadius: 3,
                    padding: "10px 36px",
                    cursor: "pointer",
                    transition: "background 0.2s",
                  }}
                >
                  {visitorName.trim() ? "ENTER" : "SKIP"}
                </motion.button>
              </form>
            </motion.div>
          )}

          {/* LOADING PHASE */}
          {phase === "loading" && (
            <motion.div
              key="loading"
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.4 }}
              style={{ width: "100%", textAlign: "center" }}
            >
              <p style={{
                fontFamily: "Rajdhani, sans-serif",
                fontWeight: 700, fontSize: "1rem",
                letterSpacing: "0.15em", color: "#4ade80",
                marginBottom: 32, minHeight: "1.5em",
              }}>
                {welcomeText}
                {welcomeText.length < `ACCESS GRANTED — WELCOME, ${(visitorName.trim() || "VISITOR").toUpperCase()}.`.length && (
                  <span className="animate-pulse">_</span>
                )}
              </p>

              {/* Progress bar */}
              <div style={{
                width: "100%", height: 2, borderRadius: 2,
                background: "rgba(107,124,255,0.12)",
                overflow: "hidden", marginBottom: 12,
              }}>
                <motion.div
                  style={{
                    height: "100%", borderRadius: 2,
                    background: "linear-gradient(90deg, #6b7cff, #a855f7)",
                    boxShadow: "0 0 12px rgba(107,124,255,0.6)",
                    width: `${progress}%`,
                    transition: "width 0.1s linear",
                  }}
                />
              </div>

              <p style={{
                fontFamily: "Rajdhani, sans-serif",
                fontSize: "0.62rem", letterSpacing: "0.25em",
                color: "rgba(107,124,255,0.4)",
              }}>
                LOADING PORTFOLIO...
              </p>
            </motion.div>
          )}

        </AnimatePresence>
      </div>
    </motion.div>
  );
};

export default Preloader;
