import { useEffect, useState, useRef } from "react";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { Toaster } from "@/components/ui/toaster";
import { TooltipProvider } from "@/components/ui/tooltip";
import { motion, AnimatePresence } from "framer-motion";
import Lenis from "lenis";
import XPScrollBar from "@/components/XPScrollBar";
import SystemNotification from "@/components/SystemNotification";
import Preloader from "@/components/Preloader";
import CommandTerminal from "@/components/CommandTerminal";
import CursorTrail from "@/components/CursorTrail";
import BuildingTicker from "@/components/BuildingTicker";
import Index from "./pages/Index.tsx";
import NotFound from "./pages/NotFound.tsx";

const queryClient = new QueryClient();

// Shadow Monarch full-screen overlay
const MonarchOverlay = ({ onDone }: { onDone: () => void }) => {
  useEffect(() => { const t = setTimeout(onDone, 3500); return () => clearTimeout(t); }, [onDone]);
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.4 }}
      className="fixed inset-0 z-[99999] flex items-center justify-center"
      style={{ background: "#000" }}
    >
      <div className="pointer-events-none absolute inset-0"
        style={{ background: "radial-gradient(ellipse at center, rgba(168,85,247,0.25) 0%, transparent 65%)" }} />
      <motion.p
        initial={{ opacity: 0, scale: 0.8 }}
        animate={{ opacity: 1, scale: 1 }}
        exit={{ opacity: 0, scale: 1.2 }}
        transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
        className="sl-text font-black tracking-[0.3em] relative z-10"
        style={{ fontSize: "clamp(4rem, 12vw, 10rem)", color: "var(--sl-purple)", textShadow: "0 0 60px rgba(168,85,247,0.8)" }}
      >
        ARISE
      </motion.p>
    </motion.div>
  );
};

// Idle flicker message
const IdleMessage = () => (
  <motion.div
    initial={{ opacity: 0 }}
    animate={{ opacity: 1 }}
    exit={{ opacity: 0 }}
    className="fixed bottom-6 left-1/2 -translate-x-1/2 z-[9990] pointer-events-none"
  >
    <p className="sl-text text-[10px] tracking-[0.25em]" style={{ color: "rgba(96,96,160,0.5)" }}>
      [SYSTEM: IDLE DETECTED — HUNTER STANDING BY]
    </p>
  </motion.div>
);

const App = () => {
  const [showApp, setShowApp] = useState(!!sessionStorage.getItem("sl-visited"));
  const [visitorName, setVisitorName] = useState(sessionStorage.getItem("sl-visitor") || "");
  const [terminalOpen, setTerminalOpen] = useState(false);
  const [monarchActive, setMonarchActive] = useState(false);
  const [idle, setIdle] = useState(false);
  const idleTimer = useRef<ReturnType<typeof setTimeout> | null>(null);

  const resetIdle = () => {
    setIdle(false);
    if (idleTimer.current) clearTimeout(idleTimer.current);
    idleTimer.current = setTimeout(() => setIdle(true), 15000);
  };

  useEffect(() => {
    const lenis = new Lenis({
      duration: 1.3,
      easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
      smoothWheel: true,
    });

    const handleKey = (e: KeyboardEvent) => {
      // Ctrl+K opens terminal
      if ((e.ctrlKey || e.metaKey) && e.key.toLowerCase() === "k") {
        e.preventDefault();
        setTerminalOpen(prev => !prev);
        return;
      }
      // Skip keyboard shortcuts when terminal is open
      if (terminalOpen) return;
      if (e.key.toLowerCase() === "g") window.open("https://github.com/Sololeveler-x", "_blank");
      if (e.key.toLowerCase() === "e") window.location.href = "mailto:kotegowdru31@gmail.com";
      if (e.key.toLowerCase() === "l") window.open("https://linkedin.com/in/jeevan-k-g-85189b291", "_blank");
    };
    window.addEventListener("keydown", handleKey);

    let raf: number;
    const loop = (time: number) => { lenis.raf(time); raf = requestAnimationFrame(loop); };
    raf = requestAnimationFrame(loop);

    // Monarch easter egg listener
    const onMonarch = () => setMonarchActive(true);
    window.addEventListener("sl-monarch", onMonarch);

    // Idle detection
    resetIdle();
    window.addEventListener("mousemove", resetIdle, { passive: true });
    window.addEventListener("scroll", resetIdle, { passive: true });
    window.addEventListener("keydown", resetIdle, { passive: true });

    return () => {
      cancelAnimationFrame(raf);
      lenis.destroy();
      window.removeEventListener("keydown", handleKey);
      window.removeEventListener("sl-monarch", onMonarch);
      window.removeEventListener("mousemove", resetIdle);
      window.removeEventListener("scroll", resetIdle);
      if (idleTimer.current) clearTimeout(idleTimer.current);
    };
  }, [terminalOpen]);

  return (
    <QueryClientProvider client={queryClient}>
      <TooltipProvider>
        <Toaster />
        <Sonner />
        {!showApp && <Preloader onComplete={(name) => { setVisitorName(name); setShowApp(true); }} />}
        {showApp && (
          <>
            <CursorTrail />
            <BuildingTicker />
            <XPScrollBar />
            <SystemNotification visitorName={visitorName} />
            <AnimatePresence>
              {monarchActive && <MonarchOverlay onDone={() => setMonarchActive(false)} />}
            </AnimatePresence>
            <AnimatePresence>
              {idle && <IdleMessage />}
            </AnimatePresence>
            <CommandTerminal open={terminalOpen} onClose={() => setTerminalOpen(false)} />
            {/* Terminal button — bottom-left, toggles open/close */}
            <motion.button
              onClick={() => setTerminalOpen(prev => !prev)}
              animate={{
                boxShadow: terminalOpen
                  ? ["0 0 14px rgba(74,222,128,0.5)", "0 0 20px rgba(74,222,128,0.7)", "0 0 14px rgba(74,222,128,0.5)"]
                  : ["0 0 0px rgba(107,124,255,0)", "0 0 12px rgba(107,124,255,0.4)", "0 0 0px rgba(107,124,255,0)"],
              }}
              transition={{ duration: 3, repeat: Infinity, ease: "easeInOut" }}
              whileHover={{
                borderColor: terminalOpen ? "rgba(74,222,128,0.8)" : "rgba(107,124,255,0.7)",
                background: terminalOpen ? "rgba(74,222,128,0.08)" : "rgba(107,124,255,0.08)",
              }}
              style={{
                position: "fixed",
                bottom: 24,
                left: 24,
                zIndex: 9985,
                background: terminalOpen ? "rgba(8,16,8,0.95)" : "rgba(8,8,16,0.9)",
                border: `1px solid ${terminalOpen ? "rgba(74,222,128,0.4)" : "rgba(107,124,255,0.3)"}`,
                borderRadius: 6,
                padding: "8px 14px",
                fontFamily: "Rajdhani, sans-serif",
                fontSize: "0.7rem",
                color: terminalOpen ? "#4ade80" : "#6b7cff",
                letterSpacing: "0.2em",
                cursor: "pointer",
                transition: "color 0.2s, border-color 0.2s, background 0.2s",
              }}
            >
              {terminalOpen ? "✕ CLOSE" : ">_ TERMINAL"}
            </motion.button>
            <BrowserRouter>
              <Routes>
                <Route path="/" element={<Index />} />
                <Route path="*" element={<NotFound />} />
              </Routes>
            </BrowserRouter>
          </>
        )}
      </TooltipProvider>
    </QueryClientProvider>
  );
};

export default App;
