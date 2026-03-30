import { useState, useEffect, useCallback } from "react";
import { motion, AnimatePresence } from "framer-motion";

interface Toast {
  id: string;
  message: string;
}

const SECTION_MESSAGES: Record<string, string> = {
  hero: "◈ Portfolio loaded · Jeevan K G — Full Stack AI Engineer",
  status: "◈ Developer profile accessed · Viewing credentials",
  skills: "◈ Tech stack loaded · 24 skills across 6 categories",
  projects: "◈ Project archive accessed · 5 projects available",
  achievements: "◈ Timeline accessed · Milestones & achievements",
  contact: "◈ Contact module online · Available for opportunities",
};

const ToastItem = ({ toast, onDone }: { toast: Toast; onDone: (id: string) => void }) => {
  useEffect(() => {
    const t = setTimeout(() => onDone(toast.id), 2500);
    return () => clearTimeout(t);
  }, [toast.id, onDone]);

  return (
    <motion.div
      layout
      initial={{ x: 120, opacity: 0 }}
      animate={{ x: 0, opacity: 1 }}
      exit={{ x: 120, opacity: 0 }}
      transition={{ type: "spring", stiffness: 300, damping: 25 }}
      className="sl-scanlines relative overflow-hidden"
      style={{
        width: 280,
        background: "var(--bg-secondary)",
        border: "1px solid var(--sl-blue)",
        borderRadius: 4,
        padding: "10px 14px",
      }}
    >
      <p className="sl-text text-[9px] font-bold tracking-[0.2em] mb-1" style={{ color: "var(--sl-blue)" }}>
        &#9672; SYSTEM
      </p>
      <p className="sl-text text-[11px] leading-snug" style={{ color: "var(--text-primary)" }}>
        {toast.message}
      </p>
    </motion.div>
  );
};

const SystemNotification = ({ visitorName }: { visitorName?: string }) => {
  const [toasts, setToasts] = useState<Toast[]>([]);

  const dismiss = useCallback((id: string) => {
    setToasts(prev => prev.filter(t => t.id !== id));
  }, []);

  useEffect(() => {
    const fired: string[] = JSON.parse(sessionStorage.getItem("sl-notified") || "[]");

    // Personalized welcome on first load
    if (!fired.includes("welcome")) {
      fired.push("welcome");
      sessionStorage.setItem("sl-notified", JSON.stringify(fired));
      const greeting = visitorName
        ? `Welcome, ${visitorName} · Profile loaded successfully`
        : "Profile loaded · Welcome to Jeevan's portfolio";
      const id = `welcome-${Date.now()}`;
      setTimeout(() => {
        setToasts(prev => [...prev, { id, message: greeting }]);
      }, 600);
    }

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach(entry => {
          if (!entry.isIntersecting) return;
          const section = (entry.target as HTMLElement).dataset.section;
          if (!section || fired.includes(section)) return;
          const message = SECTION_MESSAGES[section];
          if (!message) return;
          fired.push(section);
          sessionStorage.setItem("sl-notified", JSON.stringify(fired));
          const id = `${section}-${Date.now()}`;
          setToasts(prev => [...prev, { id, message }]);
        });
      },
      { threshold: 0.3 }
    );

    const elements = document.querySelectorAll("[data-section]");
    elements.forEach(el => observer.observe(el));

    return () => observer.disconnect();
  }, [visitorName]);

  return (
    <div className="fixed top-6 right-6 z-[9998] flex flex-col gap-2 items-end pointer-events-none">
      <AnimatePresence mode="popLayout">
        {toasts.map(t => (
          <ToastItem key={t.id} toast={t} onDone={dismiss} />
        ))}
      </AnimatePresence>
    </div>
  );
};

export default SystemNotification;
