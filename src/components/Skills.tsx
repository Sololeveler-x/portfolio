import { motion } from "framer-motion";

const rows: { skills: string[]; dir: "left" | "right" }[] = [
  { skills: ["React", "Next.js", "TypeScript", "Python", "FastAPI", "Node.js", "Pandas", "NumPy"], dir: "left" },
  { skills: ["Machine Learning", "Generative AI", "Data Analysis", "Blockchain", "Azure ML", "NLP"], dir: "right" },
  { skills: ["SQL", "MongoDB", "Supabase", "PostgreSQL", "Power BI", "Tableau", "VS Code", "Git"], dir: "left" },
];

const MarqueeRow = ({ skills, dir }: { skills: string[]; dir: "left" | "right" }) => {
  const items = [...skills, ...skills, ...skills];
  return (
    <div className="overflow-hidden py-1">
      <motion.div
        className="flex whitespace-nowrap"
        animate={{ x: dir === "left" ? ["0%", "-33.33%"] : ["-33.33%", "0%"] }}
        transition={{ duration: skills.length * 3.5, ease: "linear", repeat: Infinity }}
      >
        {items.map((skill, i) => (
          <span key={i}
            className="inline-flex items-center gap-3 px-3 text-xl sm:text-2xl font-black uppercase tracking-tight text-white/15 transition-colors duration-200 hover:text-[#ff6b1a] cursor-default select-none"
            onMouseEnter={e => { (e.currentTarget as HTMLElement).style.textShadow = "0 0 24px rgba(255,107,26,0.45)"; }}
            onMouseLeave={e => { (e.currentTarget as HTMLElement).style.textShadow = "none"; }}
          >
            {skill}<span className="text-[#ff6b1a]/40 text-sm mx-1">/</span>
          </span>
        ))}
      </motion.div>
    </div>
  );
};

const Skills = () => (
  <section className="relative bg-[#0e0e0e] py-20 overflow-hidden">
    <div className="pointer-events-none absolute inset-0 opacity-[0.03]"
      style={{ backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 200 200' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.85' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)'/%3E%3C/svg%3E")` }}
    />
    <div className="relative z-10 px-6 sm:px-12 lg:px-20 mb-10">
      <motion.h2
        initial={{ opacity: 0, x: -50 }}
        whileInView={{ opacity: 1, x: 0 }}
        viewport={{ once: false, margin: "-60px" }}
        transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
        className="font-black tracking-tight text-white"
        style={{ fontSize: "clamp(1.8rem, 4vw, 3.2rem)" }}
      >
        What I work with<span style={{ color: "#ff6b1a" }}>.</span>
      </motion.h2>
    </div>
    <div className="relative z-10 space-y-1">
      {rows.map((row, i) => (
        <motion.div key={i}
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: false }}
          transition={{ duration: 0.5, delay: i * 0.12 }}
        >
          <MarqueeRow skills={row.skills} dir={row.dir} />
        </motion.div>
      ))}
    </div>
  </section>
);

export default Skills;
