import { useRef } from "react";
import { motion, useMotionValue, useSpring } from "framer-motion";
import { Mail, Github, Linkedin, Download } from "lucide-react";

const contactLinks = [
  { icon: Mail,     label: "kotegowdru31@gmail.com",               href: "mailto:kotegowdru31@gmail.com" },
  { icon: Linkedin, label: "linkedin.com/in/jeevan-k-g-85189b291", href: "https://linkedin.com/in/jeevan-k-g-85189b291" },
  { icon: Github,   label: "github.com/Sololeveler-x",              href: "https://github.com/Sololeveler-x" },
];

const MagneticBtn = () => {
  const ref = useRef<HTMLButtonElement>(null);
  const mx = useMotionValue(0), my = useMotionValue(0);
  const sx = useSpring(mx, { stiffness: 180, damping: 18 });
  const sy = useSpring(my, { stiffness: 180, damping: 18 });
  return (
    <motion.button
      ref={ref}
      onMouseMove={e => {
        const r = ref.current!.getBoundingClientRect();
        mx.set((e.clientX - r.left - r.width / 2) * 0.3);
        my.set((e.clientY - r.top - r.height / 2) * 0.3);
      }}
      onMouseLeave={() => { mx.set(0); my.set(0); }}
      style={{ x: sx, y: sy, background: "var(--sl-orange)", color: "#000" }}
      whileTap={{ scale: 0.95 }}
      onClick={() => { window.open("mailto:kotegowdru31@gmail.com", "_blank"); }}
      className="sl-text px-8 py-3 rounded-sm font-black text-sm tracking-[0.2em]"
    >
      CONNECT
    </motion.button>
  );
};

const Contact = () => {
  return (
    <section
      className="relative py-20 px-6 sm:px-12 lg:px-20 overflow-hidden"
      style={{ background: "var(--bg-primary)" }}
    >
      {/* Ambient background glow */}
      <div
        className="pointer-events-none"
        style={{
          position: "absolute",
          inset: 0,
          background: "radial-gradient(ellipse at 50% 100%, rgba(107,124,255,0.06) 0%, transparent 60%)",
        }}
      />

      <div
        className="pointer-events-none absolute bottom-0 right-0 w-96 h-96 rounded-full opacity-5"
        style={{ background: "radial-gradient(circle, var(--sl-orange), transparent 70%)" }}
      />

      <div className="relative z-10 max-w-2xl mx-auto text-center">

        {/* Open to work badge */}
        <motion.div
          initial={{ opacity: 0, y: -10 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: false }}
          transition={{ duration: 0.5 }}
          className="flex items-center gap-2 mb-8 justify-center"
        >
          <span className="relative flex h-2.5 w-2.5">
            <span className="animate-ping absolute inline-flex h-full w-full rounded-full opacity-75" style={{ background: "var(--sl-green)" }} />
            <span className="relative inline-flex rounded-full h-2.5 w-2.5" style={{ background: "var(--sl-green)" }} />
          </span>
          <span className="sl-text text-xs font-bold tracking-[0.2em] uppercase" style={{ color: "var(--sl-green)" }}>
            Open to Work
          </span>
        </motion.div>

        {/* Decorative line with markers */}
        <div style={{ display: "flex", alignItems: "center", gap: 16, marginBottom: 32, justifyContent: "center" }}>
          <div style={{ width: 60, height: 1, background: "rgba(107,124,255,0.3)" }} />
          <span style={{ fontFamily: "Rajdhani, sans-serif", fontSize: "0.6rem", letterSpacing: "0.4em", color: "rgba(107,124,255,0.5)" }}>◈ GET IN TOUCH ◈</span>
          <div style={{ width: 60, height: 1, background: "rgba(107,124,255,0.3)" }} />
        </div>

        {/* Heading */}
        <motion.h2
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: false, margin: "-60px" }}
          transition={{ duration: 0.9, ease: [0.16, 1, 0.3, 1] }}
          className="font-black leading-[1.05] tracking-tight text-white mb-4"
          style={{ fontSize: "clamp(2.5rem, 6vw, 5.5rem)", textShadow: "0 0 80px rgba(255,107,26,0.15)" }}
        >
          {"Let's build something"}<br />
          <span style={{ color: "var(--sl-orange)" }}>remarkable.</span>
        </motion.h2>

        <p className="sl-text text-sm mb-10" style={{ color: "var(--text-muted)" }}>
          Available for freelance and full-time roles. Let's build something that matters.
        </p>

        {/* Contact links */}
        <div className="flex flex-col items-center gap-5 mb-10">
          {contactLinks.map((l, i) => (
            <motion.a
              key={l.label}
              href={l.href}
              target={l.href.startsWith("http") ? "_blank" : undefined}
              rel="noopener noreferrer"
              initial={{ opacity: 0, y: 10 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: false }}
              transition={{ duration: 0.5, delay: i * 0.09 }}
              className="group flex items-center gap-3"
              style={{ color: "rgba(255,255,255,0.35)", fontSize: "0.95rem" }}
              onMouseEnter={e => {
                const el = e.currentTarget as HTMLElement;
                el.style.color = "var(--sl-orange)";
                el.style.borderLeft = "2px solid var(--sl-orange)";
                el.style.paddingLeft = "8px";
              }}
              onMouseLeave={e => {
                const el = e.currentTarget as HTMLElement;
                el.style.color = "rgba(255,255,255,0.35)";
                el.style.borderLeft = "none";
                el.style.paddingLeft = "0";
              }}
            >
              <l.icon className="h-4 w-4 shrink-0" />
              <span className="font-medium group-hover:translate-x-1.5 inline-block transition-transform">
                {l.label}
              </span>
            </motion.a>
          ))}
        </div>

        {/* Buttons */}
        <div className="flex items-center gap-4 flex-wrap justify-center">
          <MagneticBtn />
          <a
            href="/Jeevan_KG_Resume.pdf"
            download
            className="sl-text flex items-center gap-2 px-8 py-3 rounded-sm font-bold text-sm tracking-[0.15em]"
            style={{ border: "1px solid rgba(107,124,255,0.4)", color: "var(--sl-blue)" }}
          >
            <Download className="h-4 w-4" /> Download CV
          </a>
        </div>
      </div>

      {/* Footer */}
      <div
        className="relative z-10 mt-20 pt-6 text-center"
        style={{ borderTop: "1px solid var(--sl-border)" }}
      >
        <p className="sl-text text-[10px] tracking-[0.3em] uppercase" style={{ color: "var(--text-muted)" }}>
          Jeevan K G &copy; 2025
        </p>
        <p className="sl-text text-[9px] tracking-[0.2em] mt-2" style={{ color: "rgba(96,96,160,0.5)" }}>
          [G] GitHub &middot; [L] LinkedIn &middot; [E] Email &middot; [Ctrl+K] Terminal
        </p>
      </div>
    </section>
  );
};

export default Contact;
