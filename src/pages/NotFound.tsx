import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { useNavigate } from "react-router-dom";

const NotFound = () => {
  const navigate = useNavigate();

  const corners = [
    { top: 20, left: 20, borderTop: "2px solid #6b7cff", borderLeft: "2px solid #6b7cff" },
    { top: 20, right: 20, borderTop: "2px solid #6b7cff", borderRight: "2px solid #6b7cff" },
    { bottom: 20, left: 20, borderBottom: "2px solid #6b7cff", borderLeft: "2px solid #6b7cff" },
    { bottom: 20, right: 20, borderBottom: "2px solid #6b7cff", borderRight: "2px solid #6b7cff" },
  ];

  return (
    <div
      style={{
        position: "fixed",
        inset: 0,
        background: "#080810",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        overflow: "hidden",
      }}
    >
      {/* Scan lines */}
      <div
        className="pointer-events-none"
        style={{
          position: "absolute",
          inset: 0,
          backgroundImage: "repeating-linear-gradient(0deg, transparent, transparent 2px, rgba(0,0,0,0.15) 2px, rgba(0,0,0,0.15) 4px)",
          zIndex: 1,
        }}
      />

      {/* Radial glow */}
      <div
        className="pointer-events-none"
        style={{
          position: "absolute",
          inset: 0,
          background: "radial-gradient(ellipse at center, rgba(107,124,255,0.08) 0%, transparent 65%)",
          zIndex: 1,
        }}
      />

      {/* Corner ornaments */}
      {corners.map((style, i) => (
        <motion.div
          key={i}
          initial={{ opacity: 0, scale: 0.5 }}
          animate={{ opacity: 0.3, scale: 1 }}
          transition={{ duration: 0.4, delay: 0.5 + i * 0.07, ease: "easeOut" }}
          style={{
            position: "absolute",
            width: 20,
            height: 20,
            opacity: 0.3,
            zIndex: 2,
            ...style,
          }}
        />
      ))}

      {/* Ghost 404 */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.8 }}
        style={{
          position: "absolute",
          fontFamily: "Inter, sans-serif",
          fontWeight: 900,
          fontSize: "clamp(8rem, 20vw, 16rem)",
          color: "#1a1a35",
          userSelect: "none",
          pointerEvents: "none",
          zIndex: 2,
          lineHeight: 1,
        }}
      >
        404
      </motion.div>

      {/* Center content */}
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, delay: 0.3 }}
        style={{
          position: "relative",
          zIndex: 3,
          textAlign: "center",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          gap: 0,
        }}
      >
        <span
          style={{
            fontFamily: "Rajdhani, sans-serif",
            fontSize: "0.7rem",
            color: "#6b7cff",
            letterSpacing: "0.4em",
            marginBottom: 12,
            display: "block",
          }}
        >
          SYSTEM ERROR
        </span>

        <h1
          style={{
            fontFamily: "Rajdhani, sans-serif",
            fontWeight: 700,
            fontSize: "clamp(1.5rem, 4vw, 3rem)",
            color: "#ffffff",
            letterSpacing: "0.05em",
            margin: 0,
            lineHeight: 1.1,
          }}
        >
          PAGE NOT FOUND
        </h1>

        <p
          style={{
            fontFamily: "Inter, sans-serif",
            fontSize: "0.9rem",
            color: "rgba(255,255,255,0.35)",
            marginTop: 12,
            marginBottom: 24,
          }}
        >
          The page you're looking for doesn't exist in this system.
        </p>

        <div
          style={{
            width: "100%",
            maxWidth: 320,
            height: 1,
            background: "rgba(107,124,255,0.2)",
            marginBottom: 24,
          }}
        />

        <div style={{ display: "flex", gap: 12, flexWrap: "wrap", justifyContent: "center" }}>
          <button
            onClick={() => navigate("/")}
            style={{
              fontFamily: "Rajdhani, sans-serif",
              fontSize: "0.78rem",
              letterSpacing: "0.2em",
              color: "#6b7cff",
              border: "1px solid rgba(107,124,255,0.4)",
              background: "transparent",
              padding: "12px 28px",
              borderRadius: 4,
              cursor: "pointer",
              transition: "background 0.2s, border-color 0.2s",
            }}
            onMouseEnter={e => {
              (e.currentTarget as HTMLElement).style.background = "rgba(107,124,255,0.08)";
              (e.currentTarget as HTMLElement).style.borderColor = "rgba(107,124,255,0.7)";
            }}
            onMouseLeave={e => {
              (e.currentTarget as HTMLElement).style.background = "transparent";
              (e.currentTarget as HTMLElement).style.borderColor = "rgba(107,124,255,0.4)";
            }}
          >
            ← RETURN HOME
          </button>

          <button
            onClick={() => navigate("/")}
            style={{
              fontFamily: "Rajdhani, sans-serif",
              fontSize: "0.78rem",
              letterSpacing: "0.2em",
              color: "#4ade80",
              border: "1px solid rgba(74,222,128,0.3)",
              background: "transparent",
              padding: "12px 28px",
              borderRadius: 4,
              cursor: "pointer",
              transition: "background 0.2s, border-color 0.2s",
            }}
            onMouseEnter={e => {
              (e.currentTarget as HTMLElement).style.background = "rgba(74,222,128,0.06)";
              (e.currentTarget as HTMLElement).style.borderColor = "rgba(74,222,128,0.6)";
            }}
            onMouseLeave={e => {
              (e.currentTarget as HTMLElement).style.background = "transparent";
              (e.currentTarget as HTMLElement).style.borderColor = "rgba(74,222,128,0.3)";
            }}
          >
            &gt;_ TERMINAL
          </button>
        </div>
      </motion.div>
    </div>
  );
};

export default NotFound;
