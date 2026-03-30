import { useState, useEffect, useRef, useCallback } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { X } from "lucide-react";

interface TerminalLine {
  type: "input" | "output" | "error" | "system" | "easter" | "success";
  text: string;
}

const BOOT_LINES: TerminalLine[] = [
  { type: "system", text: "◈ PORTFOLIO SYSTEM v2.0.25" },
  { type: "system", text: "━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━" },
  { type: "output", text: "  INITIALIZING PROFILE: Jeevan K G" },
  { type: "output", text: "  STATUS: AVAILABLE FOR HIRE" },
  { type: "output", text: "  RANK: S-CLASS · Full Stack AI Engineer" },
  { type: "system", text: "━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━" },
  { type: "output", text: '  Type "help" to see available commands.' },
  { type: "output", text: "" },
];

const COMMANDS: Record<string, () => TerminalLine[]> = {
  help: () => [
    { type: "system",  text: "◈ AVAILABLE COMMANDS" },
    { type: "system",  text: "──────────────────────────────────────────────────" },
    { type: "output",  text: "  whoami          — Developer profile" },
    { type: "output",  text: "  projects        — List all projects" },
    { type: "output",  text: "  skills          — Tech stack overview" },
    { type: "output",  text: "  contact         — Contact information" },
    { type: "output",  text: "  hire            — Send a hire request" },
    { type: "output",  text: "  github          — Open GitHub profile" },
    { type: "output",  text: "  linkedin        — Open LinkedIn" },
    { type: "output",  text: "  resume          — Download CV" },
    { type: "output",  text: "  clear           — Clear terminal" },
    { type: "system",  text: "──────────────────────────────────────────────────" },
    { type: "output",  text: "  TAB: autocomplete  ·  ↑↓: history  ·  ESC: close" },
    { type: "output",  text: "" },
  ],

  whoami: () => [
    { type: "system", text: "◈ DEVELOPER PROFILE" },
    { type: "system", text: "──────────────────────────────────────────────────" },
    { type: "output", text: "  Name         : Jeevan K G" },
    { type: "output", text: "  Role         : Full Stack AI Engineer" },
    { type: "output", text: "  Location     : Shivamogga, India" },
    { type: "output", text: "  Education    : B.E. CS (Data Science) — PESITM" },
    { type: "output", text: "  CGPA         : 8.2" },
    { type: "output", text: "  Rank         : S-CLASS" },
    { type: "output", text: "  Status       : AVAILABLE FOR HIRE" },
    { type: "output", text: "  Speciality   : AI-powered products · Full Stack" },
    { type: "output", text: "" },
  ],

  projects: () => [
    { type: "system", text: "◈ PROJECT ARCHIVE" },
    { type: "system", text: "──────────────────────────────────────────────────" },
    { type: "output", text: "  [S]  ClauseCraft AI       — AI contract analysis platform" },
    { type: "output", text: "  [S]  BengaluruPulse       — Startup ecosystem dashboard" },
    { type: "output", text: "  [A]  RiskiQ               — 4-in-1 RBI compliance platform" },
    { type: "output", text: "  [A]  AxiomTrace           — Digital forensics + blockchain" },
    { type: "output", text: "  [B]  Troop Mgmt System    — Member & attendance management" },
    { type: "output", text: "" },
    { type: "output", text: "  Scroll to Projects section to view case files." },
    { type: "output", text: "" },
  ],

  skills: () => [
    { type: "system", text: "◈ TECH STACK" },
    { type: "system", text: "──────────────────────────────────────────────────" },
    { type: "output", text: "  Frontend   : React · Next.js · TypeScript · Tailwind" },
    { type: "output", text: "  Backend    : FastAPI · Node.js · Python" },
    { type: "output", text: "  AI / ML    : TensorFlow · PyTorch · NLP · Azure ML" },
    { type: "output", text: "  Data       : Pandas · NumPy · Power BI · Tableau" },
    { type: "output", text: "  Database   : SQL · MongoDB · Supabase · PostgreSQL" },
    { type: "output", text: "  Tools      : Git · Blockchain · Framer Motion" },
    { type: "output", text: "  Learning   : LangChain · System Design · Rust" },
    { type: "output", text: "" },
  ],

  contact: () => [
    { type: "system",  text: "◈ CONTACT INFORMATION" },
    { type: "system",  text: "──────────────────────────────────────────────────" },
    { type: "output",  text: "  Email    : kotegowdru31@gmail.com" },
    { type: "output",  text: "  LinkedIn : linkedin.com/in/jeevan-k-g-85189b291" },
    { type: "output",  text: "  GitHub   : github.com/Sololeveler-x" },
    { type: "output",  text: "" },
    { type: "success", text: "  Type 'hire' to send a hire request directly." },
    { type: "output",  text: "" },
  ],

  hire: () => {
    setTimeout(() => {
      window.location.href = "mailto:kotegowdru31@gmail.com?subject=Hire%20Request%20—%20Jeevan%20K%20G&body=Hi%20Jeevan%2C%0A%0AI%20came%20across%20your%20portfolio%20and%20would%20like%20to%20discuss%20an%20opportunity.%0A%0A";
    }, 1200);
    return [
      { type: "system",  text: "◈ INITIATING HIRE REQUEST" },
      { type: "output",  text: "  Composing message..." },
      { type: "output",  text: "  Opening email client in 1.2s..." },
      { type: "success", text: "  ✓ Request sent. Jeevan will respond within 24 hours." },
      { type: "output",  text: "" },
    ];
  },

  github: () => {
    window.open("https://github.com/Sololeveler-x", "_blank");
    return [
      { type: "success", text: "  ✓ Opening GitHub profile..." },
      { type: "output",  text: "" },
    ];
  },

  linkedin: () => {
    window.open("https://linkedin.com/in/jeevan-k-g-85189b291", "_blank");
    return [
      { type: "success", text: "  ✓ Opening LinkedIn profile..." },
      { type: "output",  text: "" },
    ];
  },

  resume: () => {
    const a = document.createElement("a");
    a.href = "/Jeevan_KG_Resume.pdf";
    a.download = "Jeevan_KG_Resume.pdf";
    a.click();
    return [
      { type: "success", text: "  ✓ Downloading resume..." },
      { type: "output",  text: "" },
    ];
  },

  arise: () => [
    { type: "easter", text: "  ██████████████████████████████████████████████" },
    { type: "easter", text: "  ██  SHADOW MONARCH PROTOCOL ACTIVATED        ██" },
    { type: "easter", text: "  ██████████████████████████████████████████████" },
    { type: "easter", text: "" },
    { type: "easter", text: '  "I alone level up."' },
    { type: "easter", text: "" },
    { type: "easter", text: "  All shadows have awakened." },
    { type: "output",  text: "" },
  ],

  "shadow monarch": () => {
    window.dispatchEvent(new CustomEvent("sl-monarch"));
    return [
      { type: "easter", text: "  ██████████████████████████████████████████████" },
      { type: "easter", text: "  ██  SHADOW MONARCH PROTOCOL INITIATED        ██" },
      { type: "easter", text: "  ██████████████████████████████████████████████" },
      { type: "output", text: "" },
    ];
  },
};

const COMMAND_KEYS = Object.keys(COMMANDS);

interface CommandTerminalProps {
  open: boolean;
  onClose: () => void;
}

const CommandTerminal = ({ open, onClose }: CommandTerminalProps) => {
  const [lines, setLines] = useState<TerminalLine[]>([]);
  const [input, setInput] = useState("");
  const [history, setHistory] = useState<string[]>([]);
  const [historyIndex, setHistoryIndex] = useState(-1);
  const [suggestion, setSuggestion] = useState("");
  const [booted, setBooted] = useState(false);
  const inputRef = useRef<HTMLInputElement>(null);
  const outputRef = useRef<HTMLDivElement>(null);

  // Boot sequence — runs once when first opened
  useEffect(() => {
    if (!open) return;
    if (booted) {
      setTimeout(() => inputRef.current?.focus(), 80);
      return;
    }
    setBooted(true);
    setLines([]);
    let delay = 0;
    BOOT_LINES.forEach((line, i) => {
      delay += i === 0 ? 0 : 80;
      setTimeout(() => {
        setLines(prev => [...prev, line]);
      }, delay);
    });
    setTimeout(() => inputRef.current?.focus(), delay + 120);
  }, [open, booted]);

  // Scroll to bottom
  useEffect(() => {
    if (outputRef.current) {
      outputRef.current.scrollTop = outputRef.current.scrollHeight;
    }
  }, [lines]);

  // Tab completion
  useEffect(() => {
    if (!input.trim()) { setSuggestion(""); return; }
    const match = COMMAND_KEYS.find(k => k.startsWith(input.toLowerCase()) && k !== input.toLowerCase());
    setSuggestion(match || "");
  }, [input]);

  const runCommand = useCallback((cmd: string) => {
    const trimmed = cmd.trim().toLowerCase();
    const inputLine: TerminalLine = { type: "input", text: `> ${cmd}` };

    if (!trimmed) {
      setLines(prev => [...prev, inputLine]);
      return;
    }

    if (trimmed === "clear") {
      setLines(BOOT_LINES);
      return;
    }

    const handler = COMMANDS[trimmed];
    if (handler) {
      const result = handler();
      setLines(prev => [...prev, inputLine, ...result]);
    } else {
      setLines(prev => [
        ...prev,
        inputLine,
        { type: "error", text: `  Command not found: "${cmd}"` },
        { type: "error", text: `  Type "help" to see available commands.` },
        { type: "output", text: "" },
      ]);
    }

    setHistory(prev => [cmd, ...prev.slice(0, 49)]);
    setHistoryIndex(-1);
  }, []);

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    // Stop ALL key events from bubbling — prevents Lenis and global shortcuts
    e.stopPropagation();

    if (e.key === "Enter") {
      runCommand(input);
      setInput("");
      setSuggestion("");
    } else if (e.key === "Tab") {
      e.preventDefault();
      if (suggestion) setInput(suggestion);
    } else if (e.key === "ArrowUp") {
      e.preventDefault();
      const next = Math.min(historyIndex + 1, history.length - 1);
      setHistoryIndex(next);
      setInput(history[next] || "");
    } else if (e.key === "ArrowDown") {
      e.preventDefault();
      const next = Math.max(historyIndex - 1, -1);
      setHistoryIndex(next);
      setInput(next === -1 ? "" : history[next]);
    } else if (e.key === "Escape") {
      onClose();
    }
  };

  const lineColor = (type: TerminalLine["type"]) => {
    switch (type) {
      case "input":   return "#4ade80";
      case "error":   return "#ff6b1a";
      case "system":  return "#6b7cff";
      case "easter":  return "#a855f7";
      case "success": return "#4ade80";
      default:        return "rgba(200,202,240,0.8)";
    }
  };

  return (
    <AnimatePresence>
      {open && (
        <>
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-[99990]"
            style={{ background: "rgba(0,0,0,0.75)" }}
            onClick={onClose}
          />

          <motion.div
            initial={{ opacity: 0, scale: 0.96, y: -16 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.96, y: -16 }}
            transition={{ duration: 0.2, ease: [0.22, 1, 0.36, 1] }}
            style={{
              position: "fixed",
              top: "50%",
              left: "50%",
              transform: "translate(-50%, -50%)",
              zIndex: 99991,
              width: "min(620px, 95vw)",
              borderRadius: 6,
              overflow: "hidden",
              background: "#020202",
              border: "1px solid rgba(74,222,128,0.3)",
              boxShadow: "0 0 60px rgba(74,222,128,0.08), 0 24px 80px rgba(0,0,0,0.9)",
            }}
            onClick={e => e.stopPropagation()}
          >
            {/* Header */}
            <div className="flex items-center gap-2 px-4 py-2.5"
              style={{ borderBottom: "1px solid rgba(74,222,128,0.1)", background: "#050505" }}>
              <button onClick={onClose}
                className="w-3 h-3 rounded-full hover:opacity-80 transition-opacity"
                style={{ background: "#ff5f57" }} />
              <div className="w-3 h-3 rounded-full" style={{ background: "#febc2e" }} />
              <div className="w-3 h-3 rounded-full" style={{ background: "#28c840" }} />
              <span className="sl-text text-[10px] ml-3 tracking-[0.12em]"
                style={{ color: "rgba(74,222,128,0.5)" }}>
                jeevan@portfolio: ~
              </span>
              <button onClick={onClose}
                className="ml-auto hover:bg-white/5 p-1 rounded transition-colors"
                style={{ color: "rgba(74,222,128,0.35)" }}>
                <X size={11} />
              </button>
            </div>

            {/* Output */}
            <div
              ref={outputRef}
              onClick={() => inputRef.current?.focus()}
              className="px-4 py-3 overflow-y-auto font-mono text-xs leading-[1.7]"
              style={{ height: 340, cursor: "text" }}
            >
              {lines.map((line, i) => (
                <div key={i} style={{ color: lineColor(line.type) }}>
                  {line.text || "\u00A0"}
                </div>
              ))}
            </div>

            {/* Input */}
            <div
              className="flex items-center px-4 py-2.5 font-mono text-xs"
              style={{ borderTop: "1px solid rgba(74,222,128,0.1)", background: "#030303" }}
            >
              <span style={{ color: "#4ade80", marginRight: 6 }}>❯</span>
              <div className="relative flex-1">
                {suggestion && (
                  <span className="absolute inset-0 pointer-events-none font-mono text-xs"
                    style={{ color: "rgba(74,222,128,0.2)" }}>
                    {suggestion}
                  </span>
                )}
                <input
                  ref={inputRef}
                  value={input}
                  onChange={e => setInput(e.target.value)}
                  onKeyDown={handleKeyDown}
                  style={{
                    width: "100%",
                    background: "transparent",
                    border: "none",
                    outline: "none",
                    color: "#4ade80",
                    caretColor: "#4ade80",
                    fontFamily: "monospace",
                    fontSize: "0.75rem",
                    padding: 0,
                  }}
                  spellCheck={false}
                  autoComplete="off"
                  autoCorrect="off"
                  autoCapitalize="off"
                />
              </div>
            </div>

            {/* Footer hint */}
            <div className="px-4 py-1.5"
              style={{ borderTop: "1px solid rgba(74,222,128,0.06)", background: "#030303" }}>
              <span className="sl-text text-[9px] tracking-[0.15em]"
                style={{ color: "rgba(74,222,128,0.25)" }}>
                TAB: autocomplete · ↑↓: history · ESC: close
              </span>
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
};

export default CommandTerminal;
