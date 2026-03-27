import { useRef, useState } from "react";
import { motion, useInView } from "framer-motion";

const projects = [
  { num: "01", title: "ClauseCraft AI", desc: "AI-powered contract analysis with OCR, NLP, clause extraction and risk categorization.", tech: ["Next.js", "FastAPI", "Transformers", "Supabase"] },
  { num: "02", title: "Bengaluru Startup Pulse", desc: "Live dashboard analyzing Bengaluru startup ecosystem, funding trends and Gov API insights.", tech: ["TypeScript", "DeepSeek AI", "Supabase", "Puppeteer"] },
  { num: "03", title: "RiskiQ", desc: "4-in-1 RBI compliance platform for audit, loan risk, fraud detection and reporting. Top 10 — Hackfest NMAMIT Karakal", tech: ["Next.js", "Python", "Supabase", "ML", "NLP"] },
  { num: "04", title: "AxiomTrace", desc: "Digital forensics platform with AI evidence handling and blockchain chain of custody.", tech: ["React", "Node.js", "MongoDB", "Blockchain", "Azure ML"] },
  { num: "05", title: "Troop Management System", desc: "Secure member records, attendance and activity management with MySQL backend.", tech: ["Java", "SQL", "NetBeans"] },
];

const Strip = ({ p, i }: { p: typeof projects[0]; i: number }) => {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: false, margin: "-50px" });
  const [hov, setHov] = useState(false);

  return (
    <motion.div ref={ref}
      initial={{ opacity: 0, y: 30 }}
      animate={inView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.6, delay: i * 0.07, ease: [0.16, 1, 0.3, 1] }}
      onMouseEnter={() => setHov(true)}
      onMouseLeave={() => setHov(false)}
      className="relative border-b border-white/[0.06] transition-all duration-300 cursor-pointer"
      style={{
        borderLeft: hov ? "2px solid #ff6b1a" : "2px solid transparent",
        background: hov ? "rgba(255,107,26,0.025)" : "transparent",
        transform: hov ? "translateY(-3px)" : "translateY(0)",
      }}
    >
      <div className="flex items-center gap-4 px-6 sm:px-10 py-6">
        <span className="hidden sm:block font-black text-white/[0.05] shrink-0 select-none leading-none"
          style={{ fontSize: "clamp(3rem, 6vw, 6rem)" }}>{p.num}</span>
        <div className="flex-1 min-w-0">
          <h3 className="font-bold tracking-tight mb-1 transition-colors duration-200"
            style={{ fontSize: "clamp(1rem, 2.2vw, 1.5rem)", color: hov ? "#ff6b1a" : "#fff" }}>
            {p.title}
          </h3>
          <p className="text-xs text-white/40 leading-relaxed mb-3 max-w-xl">{p.desc}</p>
          <div className="flex flex-wrap gap-1.5">
            {p.tech.map(t => (
              <span key={t} className="text-[10px] font-semibold tracking-wider uppercase px-2.5 py-0.5 rounded-full border border-white/[0.08] text-white/30">{t}</span>
            ))}
          </div>
        </div>
        <span className="shrink-0 ml-4 text-lg transition-all duration-300"
          style={{ color: hov ? "#ff6b1a" : "rgba(255,255,255,0.12)", transform: hov ? "rotate(45deg)" : "none", textShadow: hov ? "0 0 16px rgba(255,107,26,0.5)" : "none" }}>
          {String.fromCharCode(8594)}
        </span>
      </div>
      <motion.div className="absolute bottom-0 left-0 h-px"
        style={{ background: "#ff6b1a" }}
        initial={{ width: "0%" }}
        animate={inView ? { width: "100%" } : {}}
        transition={{ duration: 1, delay: i * 0.1 + 0.3, ease: [0.16, 1, 0.3, 1] }}
      />
    </motion.div>
  );
};

const Projects = () => (
  <section className="relative bg-[#080808] py-20 overflow-hidden">
    <div className="pointer-events-none absolute inset-0 opacity-[0.03]"
      style={{ backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 200 200' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.85' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)'/%3E%3C/svg%3E")` }}
    />
    <div className="relative z-10 px-6 sm:px-10 mb-12">
      <motion.div initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: false, margin: "-60px" }} transition={{ duration: 0.7 }}>
        <p className="mb-2 text-[10px] font-bold tracking-[0.4em] uppercase text-[#ff6b1a]">Selected Work</p>
        <h2 className="font-black tracking-tight text-white" style={{ fontSize: "clamp(1.8rem, 4vw, 3.2rem)" }}>
          Projects<span style={{ color: "#ff6b1a" }}>.</span>
        </h2>
      </motion.div>
    </div>
    <div className="relative z-10">
      {projects.map((p, i) => <Strip key={p.num} p={p} i={i} />)}
    </div>
  </section>
);

export default Projects;
