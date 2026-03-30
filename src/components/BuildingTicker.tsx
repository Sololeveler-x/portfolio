import { motion } from "framer-motion";

const TICKER_ITEMS = [
  "◈ CURRENTLY BUILDING: ClauseCraft AI v2",
  "◈ OPEN TO WORK — Full Stack / AI Engineer",
  "◈ BASED IN SHIVAMOGGA, INDIA",
  "◈ SIH 2024 NATIONAL FINALIST",
  "◈ HACKFEST TOP 10",
];

const tickerText = TICKER_ITEMS.join("  ·  ");

const RJ: React.CSSProperties = { fontFamily: "Rajdhani, sans-serif" };

export default function BuildingTicker() {
  return (
    <>
      <style>{`
        @keyframes ticker-scroll {
          0%   { transform: translateX(0); }
          100% { transform: translateX(-50%); }
        }
        @keyframes pulse-dot {
          0%, 100% { opacity: 1; }
          50%       { opacity: 0.3; }
        }
      `}</style>

      <div
        style={{
          position: "fixed",
          top: 0,
          left: 0,
          right: 0,
          height: 36,
          zIndex: 9985,
          background: "rgba(8,8,16,0.95)",
          backdropFilter: "blur(8px)",
          borderBottom: "1px solid rgba(107,124,255,0.15)",
          display: "flex",
          alignItems: "center",
          overflow: "hidden",
        }}
      >
        {/* Left: system status */}
        <div
          style={{
            ...RJ,
            display: "flex",
            alignItems: "center",
            gap: 7,
            paddingLeft: 16,
            flexShrink: 0,
            zIndex: 2,
          }}
        >
          <span
            style={{
              width: 7,
              height: 7,
              borderRadius: "50%",
              background: "#4ade80",
              display: "inline-block",
              animation: "pulse-dot 2s ease-in-out infinite",
              boxShadow: "0 0 6px #4ade80",
            }}
          />
          <span
            style={{
              ...RJ,
              fontSize: "0.65rem",
              color: "#4ade80",
              letterSpacing: "0.2em",
              whiteSpace: "nowrap",
            }}
          >
            SYSTEM ONLINE
          </span>
        </div>

        {/* Divider */}
        <div
          style={{
            width: 1,
            height: 16,
            background: "rgba(107,124,255,0.2)",
            marginLeft: 14,
            marginRight: 0,
            flexShrink: 0,
          }}
        />

        {/* Center: scrolling ticker */}
        <div
          style={{
            flex: 1,
            overflow: "hidden",
            position: "relative",
            height: "100%",
            display: "flex",
            alignItems: "center",
          }}
        >
          {/* Left fade mask */}
          <div
            style={{
              position: "absolute",
              left: 0,
              top: 0,
              bottom: 0,
              width: 40,
              background: "linear-gradient(to right, rgba(8,8,16,0.95), transparent)",
              zIndex: 1,
              pointerEvents: "none",
            }}
          />
          {/* Right fade mask */}
          <div
            style={{
              position: "absolute",
              right: 0,
              top: 0,
              bottom: 0,
              width: 40,
              background: "linear-gradient(to left, rgba(8,8,16,0.95), transparent)",
              zIndex: 1,
              pointerEvents: "none",
            }}
          />

          {/* Ticker content — doubled for seamless loop */}
          <div
            style={{
              display: "flex",
              whiteSpace: "nowrap",
              animation: "ticker-scroll 25s linear infinite",
              willChange: "transform",
            }}
          >
            {[tickerText, tickerText].map((t, i) => (
              <span
                key={i}
                style={{
                  ...RJ,
                  fontSize: "0.65rem",
                  color: "rgba(107,124,255,0.85)",
                  letterSpacing: "0.18em",
                  paddingRight: "4rem",
                }}
              >
                {t}
              </span>
            ))}
          </div>
        </div>

        {/* Divider */}
        <div
          style={{
            width: 1,
            height: 16,
            background: "rgba(107,124,255,0.2)",
            marginRight: 14,
            flexShrink: 0,
          }}
        />

        {/* Right: terminal hint */}
        <div
          style={{
            ...RJ,
            paddingRight: 16,
            flexShrink: 0,
            fontSize: "0.65rem",
            color: "rgba(107,124,255,0.65)",
            letterSpacing: "0.2em",
            whiteSpace: "nowrap",
          }}
        >
          [Ctrl+K] TERMINAL
        </div>
      </div>
    </>
  );
}
