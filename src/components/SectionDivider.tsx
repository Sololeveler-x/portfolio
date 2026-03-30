import { useRef } from "react";
import { motion, useInView } from "framer-motion";

interface SectionDividerProps {
  num: string;
  label: string;
}

export default function SectionDivider({ num, label }: SectionDividerProps) {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-40px" });

  return (
    <div
      ref={ref}
      style={{
        display: "flex",
        alignItems: "center",
        gap: 16,
        padding: "0 40px",
        marginBottom: 0,
        position: "relative",
        zIndex: 10,
      }}
    >
      {/* Number */}
      <motion.span
        initial={{ opacity: 0 }}
        animate={inView ? { opacity: 1 } : {}}
        transition={{ duration: 0.4 }}
        style={{
          fontFamily: "Rajdhani, sans-serif",
          fontWeight: 800,
          fontSize: "0.65rem",
          letterSpacing: "0.3em",
          color: "rgba(107,124,255,0.4)",
          flexShrink: 0,
        }}
      >
        {num}
      </motion.span>

      {/* Left line grows from left */}
      <motion.div
        initial={{ scaleX: 0 }}
        animate={inView ? { scaleX: 1 } : {}}
        transition={{ duration: 0.6, ease: "easeOut" }}
        style={{
          flex: 1,
          height: 1,
          background: "linear-gradient(to right, rgba(107,124,255,0.4), rgba(107,124,255,0.08))",
          transformOrigin: "left",
        }}
      />

      {/* Label */}
      <motion.span
        initial={{ opacity: 0 }}
        animate={inView ? { opacity: 1 } : {}}
        transition={{ duration: 0.4, delay: 0.3 }}
        style={{
          fontFamily: "Rajdhani, sans-serif",
          fontWeight: 700,
          fontSize: "0.6rem",
          letterSpacing: "0.35em",
          color: "rgba(107,124,255,0.35)",
          flexShrink: 0,
        }}
      >
        {label}
      </motion.span>

      {/* Right line */}
      <motion.div
        initial={{ scaleX: 0 }}
        animate={inView ? { scaleX: 1 } : {}}
        transition={{ duration: 0.6, ease: "easeOut" }}
        style={{
          flex: 1,
          height: 1,
          background: "linear-gradient(to left, rgba(107,124,255,0.4), rgba(107,124,255,0.08))",
          transformOrigin: "right",
        }}
      />

      {/* ◈ cap */}
      <motion.span
        initial={{ opacity: 0 }}
        animate={inView ? { opacity: 1 } : {}}
        transition={{ duration: 0.4, delay: 0.4 }}
        style={{
          fontFamily: "Rajdhani, sans-serif",
          fontSize: "0.6rem",
          color: "rgba(107,124,255,0.3)",
          flexShrink: 0,
        }}
      >
        ◈
      </motion.span>
    </div>
  );
}
