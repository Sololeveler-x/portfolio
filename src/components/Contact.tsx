import { useRef } from "react";
import { motion, useMotionValue, useSpring } from "framer-motion";
import { Mail, Github, Linkedin, Download } from "lucide-react";

const links = [
  { icon: Mail, label: "kotegowdru31@gmail.com", href: "mailto:kotegowdru31@gmail.com" },
  { icon: Linkedin, label: "linkedin.com/in/jeevan-k-g-85189b291", href: "https://linkedin.com/in/jeevan-k-g-85189b291" },
  { icon: Github, label: "github.com/Sololeveler-x", href: "https://github.com/Sololeveler-x" },
];

const MagneticBtn = () => {
  const ref = useRef<HTMLButtonElement>(null);
  const mx = useMotionValue(0), my = useMotionValue(0);
  const sx = useSpring(mx, { stiffness: 180, damping: 18 });
  const sy = useSpring(my, { stiffness: 180, damping: 18 });

  return (
    <motion.button ref={ref}
      onMouseMove={e => {
        const r = ref.current!.getBoundingClientRect();
        mx.set((e.clientX - r.left - r.width / 2) * 0.3);
        my.set((e.clientY - r.top - r.height / 2) * 0.3);
      }}
      onMouseLeave={() => { mx.set(0); my.set(0); }}
      style={{ x: sx, y: sy }}
      whileTap={{ scale: 0.95 }}
      className="px-8 py-3 rounded-full font-bold text-sm tracking-wide text-[#080808] bg-[#ff6b1a] transition-shadow duration-300 hover:shadow-[0_0_32px_rgba(255,107,26,0.45)]"
    >
      Get In Touch
    </motion.button>
  );
};

const Contact = () => (
  <section className="relative bg-[#080808] py-20 px-6 sm:px-12 lg:px-20 overflow-hidden">
    <div className="pointer-events-none absolute inset-0 opacity-[0.03]"
      style={{ backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 200 200' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.85' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)'/%3E%3C/svg%3E")` }}
    />
    <div className="relative z-10 max-w-3xl">

      {/* Open to work badge */}
      <motion.div
        initial={{ opacity: 0, y: -10 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: false }}
        transition={{ duration: 0.5 }}
        className="flex items-center gap-2 mb-8 w-fit"
      >
        <span className="relative flex h-2.5 w-2.5">
          <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-green-400 opacity-75" />
          <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-green-400" />
        </span>
        <span className="text-xs font-semibold tracking-wider text-green-400/80 uppercase">
          Available for Opportunities
        </span>
      </motion.div>

      <motion.h2
        initial={{ opacity: 0, y: 40 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: false, margin: "-60px" }}
        transition={{ duration: 0.9, ease: [0.16, 1, 0.3, 1] }}
        className="font-black leading-[1.05] tracking-tight text-white mb-12"
        style={{ fontSize: "clamp(2rem, 5vw, 4.5rem)" }}
      >
        Let's build something<br />
        <span style={{ color: "#ff6b1a" }}>remarkable.</span>
      </motion.h2>

      <div className="space-y-4 mb-10">
        {links.map((l, i) => (
          <motion.a key={l.label} href={l.href}
            target={l.href.startsWith("http") ? "_blank" : undefined}
            rel="noopener noreferrer"
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: false }}
            transition={{ duration: 0.5, delay: i * 0.09 }}
            className="group flex items-center gap-3 text-white/35 hover:text-[#ff6b1a] transition-colors duration-250 w-fit"
          >
            <l.icon className="h-4 w-4 shrink-0" />
            <span className="text-sm font-medium transition-transform duration-250 group-hover:translate-x-1.5 inline-block">{l.label}</span>
          </motion.a>
        ))}
      </div>

      {/* CTA buttons */}
      <div className="flex items-center gap-4 flex-wrap">
        <MagneticBtn />
        <motion.a
          href="/Jeevan_KG_Resume.pdf"
          download
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: false }}
          transition={{ duration: 0.5, delay: 0.3 }}
          className="flex items-center gap-2 px-8 py-3 rounded-full font-bold text-sm tracking-wide text-[#ff6b1a] border border-[#ff6b1a]/40 hover:border-[#ff6b1a] hover:bg-[#ff6b1a]/10 transition-all duration-300"
        >
          <Download className="h-4 w-4" />
          Download CV
        </motion.a>
      </div>
    </div>

    {/* Footer */}
    <motion.div
      initial={{ opacity: 0 }}
      whileInView={{ opacity: 1 }}
      viewport={{ once: false }}
      className="relative z-10 mt-20 border-t border-white/[0.05] pt-6 text-center"
    >
      <p className="text-[10px] text-white/20 tracking-[0.3em] uppercase">Jeevan K G &copy; 2025</p>
    </motion.div>
  </section>
);

export default Contact;
