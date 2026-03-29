import { useRef, useState, useEffect } from "react";
import { MatrixText } from "@/components/ui/matrix-text";
import { motion, useScroll, useTransform, AnimatePresence } from "framer-motion";
import heroNew from "@/assets/hero-new.png";

const grain = "url(\"data:image/svg+xml,%3Csvg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noise'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noise)'/%3E%3C/svg%3E\")";

const ScrollHero = () => {
  const containerRef = useRef<HTMLDivElement>(null);

  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end end"],
  });

  // "Hi I'm" + subtitle — instant hide at scroll start
  const hiOpacity  = useTransform(scrollYProgress, [0.07, 0.08], [1, 0]);
  const subOpacity = useTransform(scrollYProgress, [0.07, 0.08], [1, 0]);

  const [nameGone, setNameGone] = useState(false);
  const [showRight, setShowRight] = useState(false);

  useEffect(() => {
    return scrollYProgress.on("change", (v) => {
      setNameGone(v >= 0.25);
      setShowRight(v >= 0.62);
    });
  }, [scrollYProgress]);

  // JEEVAN — quick fade 0.20→0.28, then removed from DOM
  const nameOpacity = useTransform(scrollYProgress, [0.18, 0.25], [1, 0]);

  // Image rises 0.08→0.20, zooms in gently 0.20→1.0 (max 1.2, not 1.45)
  const imageScale = useTransform(scrollYProgress, [0.08, 0.20, 1.0], [1.0, 1.0, 1.2]);
  const imageY     = useTransform(scrollYProgress, [0, 0.08, 0.20, 1], ["110%", "110%", "0%", "0%"]);

  // Left panel — appears at 25%, holds till 55%, erases at 62%
  const leftOpacity = useTransform(scrollYProgress, [0.25, 0.28, 0.55, 0.62], [0, 1, 1, 0]);
  const leftY       = useTransform(scrollYProgress, [0.25, 0.28], [20, 0]);

  // Right panel — appears at 62%, holds till 88%, erases at 95%
  const rightOpacity = useTransform(scrollYProgress, [0.62, 0.65, 0.88, 0.95], [0, 1, 1, 0]);
  const rightY       = useTransform(scrollYProgress, [0.62, 0.65], [20, 0]);
  const scrollIndOpacity = useTransform(scrollYProgress, [0, 0.08], [1, 0]);

  return (
    <div ref={containerRef} className="relative" style={{ height: "200vh" }}>
      <div className="sticky top-0 h-screen w-full overflow-hidden bg-[#080808]">

        {/* Film grain */}
        <div className="pointer-events-none absolute inset-0 z-[45] opacity-[0.04]"
          style={{ backgroundImage: grain }} />

        {/* Vignette */}
        <div className="pointer-events-none absolute inset-0 z-[42] bg-gradient-to-t from-[#080808] via-transparent to-[#080808]/30" />

        {/* z-5 — Gradient background */}
        <div
          className="pointer-events-none absolute inset-0 z-[5]"
          style={{
            background: "radial-gradient(ellipse at 75% 90%, rgba(200,70,10,0.55) 0%, rgba(150,40,5,0.25) 40%, transparent 65%), radial-gradient(ellipse at 25% 15%, rgba(15,30,140,0.5) 0%, rgba(10,20,100,0.2) 45%, transparent 65%)",
          }}
        />

        {/* z-10 — JEEVAN — quick fade then removed from DOM */}
        {!nameGone && (
          <motion.div
            className="absolute inset-0 z-10 flex items-center justify-center pointer-events-none select-none"
            style={{ opacity: nameOpacity }}
          >
            <MatrixText
              text="JEEVAN"
              initialDelay={200}
              letterDuration={600}
              letterStagger={500}
              matrixColor="#ff6b1a"
              finalColor="#ffffff"
              className="text-center font-black uppercase tracking-tighter"
              style={{ fontSize: "clamp(5rem, 20vw, 22rem)" }}
            />
          </motion.div>
        )}

        {/* z-20 — IMAGE */}
        <motion.div
          className="pointer-events-none absolute inset-0 z-20 flex items-end justify-center"
          style={{ scale: imageScale, y: imageY }}
        >
          <img
            src={heroNew}
            alt="Jeevan K G"
            className="h-[92vh] w-auto max-w-none object-contain object-bottom"
            style={{ filter: "drop-shadow(0 -10px 60px rgba(255,107,26,0.15))" }}
          />
        </motion.div>

        {/* z-15 — "Hi, I'm" */}
        <motion.div
          className="absolute inset-0 z-[15] flex items-center justify-center pointer-events-none select-none"
          style={{ opacity: hiOpacity }}
        >
          <motion.p
            className="absolute font-light tracking-[0.35em] text-white/80"
            style={{ fontSize: "clamp(0.9rem, 1.8vw, 1.3rem)", top: "calc(50% - clamp(3.8rem, 12.5vw, 13.5rem))" }}
            initial={{ opacity: 0, y: -12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.1 }}
          >
            Hi, I&apos;m
          </motion.p>
        </motion.div>

        {/* z-15 — Subtitle */}
        <motion.div
          className="absolute inset-0 z-[15] flex items-center justify-center pointer-events-none"
          style={{ opacity: subOpacity }}
        >
          <motion.p
            className="absolute font-bold tracking-[0.45em] uppercase text-[#ff6b1a]"
            style={{ fontSize: "clamp(0.75rem, 1.4vw, 1rem)", top: "calc(50% + clamp(3.5rem, 11.8vw, 12.8rem))" }}
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.7 }}
          >
            Full Stack &amp; AI Developer
          </motion.p>
        </motion.div>

        {/* z-50 — About panels with AnimatePresence */}
        <AnimatePresence mode="wait">
          {nameGone && !showRight && (
            <motion.div
              key="left"
              className="absolute inset-0 z-50 flex items-center px-8 sm:px-12 lg:px-16 pointer-events-none"
              initial={{ opacity: 0, scale: 0.7 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 1.1 }}
              transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
            >
              <div>
                <h2 className="font-black leading-tight tracking-tight text-white"
                  style={{ fontSize: "clamp(2.5rem, 6vw, 5rem)" }}>
                  I build things<br />
                  <span style={{ color: "#ff6b1a" }}>that matter.</span>
                </h2>
                <p className="mt-4 text-sm leading-relaxed text-white/50 max-w-sm">
                  Not just code — solutions with purpose.<br />
                  Every line aimed at solving real problems<br />
                  with AI and modern web.
                </p>
              </div>
            </motion.div>
          )}
          {showRight && (
            <motion.div
              key="right"
              className="absolute inset-0 z-50 flex items-center pointer-events-none"
              style={{ justifyContent: "flex-end", paddingRight: "0.6rem", paddingLeft: "55%" }}
              initial={{ opacity: 0, scale: 0.7 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 1.1 }}
              transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
            >
              <div style={{ maxWidth: "clamp(340px, 38vw, 520px)" }}>
                <h2 className="font-black leading-tight tracking-tight"
                  style={{ fontSize: "clamp(2.2rem, 4.5vw, 4rem)" }}>
                  <span className="text-white">I build for impact.</span><br />
                  <span style={{ color: "#ff6b1a" }}>Not just code.</span>
                </h2>
                <p className="mt-4 text-sm leading-relaxed text-white/50">
                  Creating technology that makes a difference,
                  not just features.
                </p>
              </div>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Scroll indicator */}
        <motion.div
          className="absolute bottom-8 left-1/2 z-50 -translate-x-1/2 flex flex-col items-center gap-2 pointer-events-none"
          style={{ opacity: scrollIndOpacity }}
        >
          <span className="text-[9px] font-bold tracking-[0.4em] uppercase text-white/25">Scroll</span>
          <div className="h-12 w-px bg-gradient-to-b from-[#ff6b1a]/50 to-transparent" />
        </motion.div>

      </div>
    </div>
  );
};

export default ScrollHero;
