import { useRef } from "react";
import { motion, useScroll, useTransform } from "framer-motion";

const items = [
  { title: "Smart India Hackathon (SIH) 2024", detail: "Finalist", year: "2024" },
  { title: "Hackfest Hackathon NMAMIT Karakal", detail: "Top 10", year: "2024" },
  { title: "FOSS Hackathon", detail: "Participant", year: "2024" },
  { title: "ASTRA Coding Club PESITM", detail: "Active Member", year: "2023–Present" },
  { title: "Internal SIH at PESITM", detail: "Organizer", year: "2024" },
];

// Each item is scroll-driven — animates in/out based on scroll position
const AchievementItem = ({ item, i }: { item: typeof items[0]; i: number }) => {
  const ref = useRef<HTMLDivElement>(null);
  const left = i % 2 === 0;

  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start 0.95", "start 0.35"],
  });

  const opacity  = useTransform(scrollYProgress, [0, 0.5, 1], [0, 1, 1]);
  const x        = useTransform(scrollYProgress, [0, 0.6], [left ? -60 : 60, 0]);
  const blur     = useTransform(scrollYProgress, [0, 0.5], [6, 0]);

  return (
    <motion.div
      ref={ref}
      style={{ opacity, x }}
      className={`relative flex items-center ${left ? "justify-start" : "justify-end"}`}
    >
      <motion.div
        style={{ filter: blur.get ? undefined : undefined }}
        className={`w-[45%] ${left ? "text-right pr-7" : "text-left pl-7"}`}
      >
        <h3 className="font-bold text-white text-sm leading-snug mb-0.5">{item.title}</h3>
        <p className="text-xs text-white/35">{item.detail}</p>
        <p className="text-[10px] text-[#ff6b1a]/60 mt-0.5 font-semibold tracking-wider">{item.year}</p>
      </motion.div>
      <div
        className="absolute left-1/2 -translate-x-1/2 w-3 h-3 rounded-full border-2 border-[#ff6b1a] bg-[#0e0e0e]"
        style={{ boxShadow: "0 0 12px rgba(255,107,26,0.55)" }}
      />
    </motion.div>
  );
};

const Achievements = () => {
  const sectionRef = useRef<HTMLDivElement>(null);

  // Center line draws based on section scroll
  const { scrollYProgress: lineProgress } = useScroll({
    target: sectionRef,
    offset: ["start 0.8", "end 0.5"],
  });
  const lineScale = useTransform(lineProgress, [0, 1], [0, 1]);

  // Heading scroll-driven
  const headRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress: headProgress } = useScroll({
    target: headRef,
    offset: ["start 0.95", "start 0.5"],
  });
  const headOpacity = useTransform(headProgress, [0, 0.6], [0, 1]);
  const headX       = useTransform(headProgress, [0, 0.6], [-50, 0]);

  return (
    <section className="relative bg-[#0e0e0e] py-20 px-6 sm:px-12 lg:px-20 overflow-hidden">
      <div
        className="pointer-events-none absolute inset-0 opacity-[0.03]"
        style={{ backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 200 200' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.85' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)'/%3E%3C/svg%3E")` }}
      />

      <div className="relative z-10 max-w-4xl mx-auto">
        {/* Heading */}
        <motion.div
          ref={headRef}
          style={{ opacity: headOpacity, x: headX }}
          className="mb-14"
        >
          <p className="mb-2 text-[10px] font-bold tracking-[0.4em] uppercase text-[#ff6b1a]">Recognition</p>
          <h2 className="font-black tracking-tight text-white" style={{ fontSize: "clamp(1.8rem, 4vw, 3.2rem)" }}>
            Achievements<span style={{ color: "#ff6b1a" }}>.</span>
          </h2>
        </motion.div>

        {/* Timeline */}
        <div ref={sectionRef} className="relative">
          {/* Center line — draws downward as you scroll */}
          <motion.div
            className="absolute left-1/2 top-0 bottom-0 w-px -translate-x-1/2 origin-top"
            style={{
              background: "linear-gradient(to bottom, #ff6b1a, rgba(255,107,26,0.05))",
              scaleY: lineScale,
            }}
          />

          <div className="space-y-10">
            {items.map((item, i) => (
              <AchievementItem key={i} item={item} i={i} />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default Achievements;
