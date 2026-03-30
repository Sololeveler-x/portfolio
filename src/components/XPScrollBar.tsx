import { useScroll, useMotionValueEvent } from "framer-motion";
import { useState } from "react";

const XPScrollBar = () => {
  const { scrollYProgress } = useScroll();
  const [progress, setProgress] = useState(0);

  useMotionValueEvent(scrollYProgress, "change", (v) => {
    setProgress(v);
  });

  return (
    <div
      className="fixed top-0 left-0 right-0 z-[9999]"
      style={{ height: 2 }}
    >
      <div
        style={{
          height: "100%",
          width: `${progress * 100}%`,
          background: "#ff6b1a",
          boxShadow: "0 0 6px rgba(255,107,26,0.6)",
          transition: "width 0.1s linear",
        }}
      />
    </div>
  );
};

export default XPScrollBar;
