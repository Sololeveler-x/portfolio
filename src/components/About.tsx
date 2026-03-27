import { useRef, useEffect, useState } from "react";
import { motion, useInView } from "framer-motion";

function CountUp({ target, decimals = 0, suffix = "" }: { target: number; decimals?: number; suffix?: string }) {
  const [count, setCount] = useState(0);
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: false, margin: "-60px" });

  useEffect(() => {
    if (!inView) return;
    let frame = 0;
    const total = 90;
    const timer = setInterval(() => {
      frame++;
      const progress = frame / total;
      const eased = 1 - Math.pow(1 - progress, 3);
      setCount(parseFloat((eased * target).toFixed(decimals)));
      if (frame >= total) { setCount(target); clearInterval(timer); }
    }, 1000 / 60);
    return () => clearInterval(timer);
  }, [inView, target, decimals]);

  return (
    <div ref={ref} className="font-black leading-none" style={{ fontSize: "clamp(2.4rem, 5vw, 4rem)" }}>
      <span style={{ color: "#ff6b1a" }}>{decimals > 0 ? count.toFixed(decimals) : Math.floor(count)}{suffix}</span>
    </div>
  );
}

const About = () => (
  <section className="relative bg-[#080808] py-24 px-6 sm:px-12 lg:px-20 overflow-hidden">
    <div className="pointer-events-none absolute inset-0 opacity-[0.03]"
      style={{ backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 200 200' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.85' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)'/%3E%3C/svg%3E")` }}
    />

    <div className="relative z-10 max-w-5xl mx-auto">
      {/* Two col */}
      <div className="grid gap-12 lg:grid-cols-2 lg:gap-20 items-start mb-20">
        <motion.div
          initial={{ opacity: 0, x: -40 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: false, margin: "-60px" }}
          transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
        >
          <h2 className="font-black leading-[1.05] tracking-tight text-white mb-5"
            style={{ fontSize: "clamp(2rem, 4vw, 3.2rem)" }}>
            I build things<br />
            <span style={{ color: "#ff6b1a" }}>that matter.</span>
          </h2>
          <p className="text-sm leading-relaxed text-white/40 max-w-xs">
            Not just code â€” solutions with purpose. Every line aimed at solving real problems with AI and modern web.
          </p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, x: 40 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: false, margin: "-60px" }}
          transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1], delay: 0.1 }}
          className="space-y-3"
        >
          {[
            ["Education", "B.E. Computer Science (Data Science)"],
            ["College", "PESITM, Shivamogga"],
            ["CGPA / Year", "8.2 Â· 2023â€“2027"],
            ["Based in", "Shivamogga, India"],
            ["Focus", "AI Â· Full Stack Â· Data Science"],
          ].map(([k, v], i) => (
            <motion.div key={k}
              initial={{ opacity: 0, y: 12 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: false }}
              transition={{ duration: 0.4, delay: i * 0.07 }}
              className="flex gap-5 border-b border-white/[0.05] pb-3"
            >
              <span className="w-24 shrink-0 text-[10px] font-bold tracking-widest uppercase text-[#ff6b1a]/60">{k}</span>
              <span className="text-xs text-white/55">{v}</span>
            </motion.div>
          ))}
        </motion.div>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-3 gap-4 border-t border-white/[0.05] pt-12">
        {[
          { target: 5, suffix: "+", label: "Projects Built", decimals: 0 },
          { target: 2, suffix: "x", label: "Hackathon Finalist", decimals: 0 },
          { target: 8.2, suffix: "", label: "CGPA", decimals: 1 },
        ].map((s, i) => (
          <motion.div key={s.label}
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: false }}
            transition={{ duration: 0.6, delay: i * 0.12 }}
            className="text-center"
          >
            <CountUp target={s.target} decimals={s.decimals} suffix={s.suffix} />
            <p className="mt-2 text-[10px] font-semibold tracking-[0.2em] uppercase text-white/30">{s.label}</p>
          </motion.div>
        ))}
      </div>
    </div>
  </section>
);

export default About;
