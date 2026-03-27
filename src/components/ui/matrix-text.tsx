import { useState, useEffect, useRef } from "react";
import { motion } from "framer-motion";
import { cn } from "@/lib/utils";

interface MatrixTextProps {
  text?: string;
  className?: string;
  style?: React.CSSProperties;
  initialDelay?: number;
  letterDuration?: number;
  letterStagger?: number;
  matrixColor?: string;
  finalColor?: string;
}

export const MatrixText = ({
  text = "JEEVAN",
  className,
  style,
  initialDelay = 200,
  letterDuration = 700,
  letterStagger = 500,
  matrixColor = "#ff6b1a",
  finalColor = "#ffffff",
}: MatrixTextProps) => {
  const [chars, setChars] = useState<string[]>(text.split("").map(() => "0"));
  const [resolved, setResolved] = useState<boolean[]>(text.split("").map(() => false));
  const timers = useRef<ReturnType<typeof setTimeout>[]>([]);

  useEffect(() => {
    const startLetter = (index: number) => {
      const target = text[index];
      const start = Date.now();
      let tick = 0;

      const cycle = () => {
        const elapsed = Date.now() - start;
        if (elapsed >= letterDuration) {
          setChars(prev => { const n = [...prev]; n[index] = target; return n; });
          setResolved(prev => { const n = [...prev]; n[index] = true; return n; });
          return;
        }
        setChars(prev => {
          const n = [...prev];
          n[index] = tick % 2 === 0 ? "0" : "1";
          return n;
        });
        tick++;
        timers.current.push(setTimeout(cycle, 80));
      };

      cycle();
    };

    const outer = setTimeout(() => {
      for (let i = 0; i < text.length; i++) {
        const t = setTimeout(() => startLetter(i), i * letterStagger);
        timers.current.push(t);
      }
    }, initialDelay);

    timers.current.push(outer);
    return () => timers.current.forEach(clearTimeout);
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <div className={cn("flex items-center justify-center", className)} style={style}>
      {chars.map((char, i) => (
        <motion.span
          key={i}
          className="font-black uppercase tracking-tighter inline-block"
          style={{ lineHeight: 0.88 }}
          animate={{
            color: resolved[i] ? finalColor : matrixColor,
            textShadow: resolved[i] ? "none" : `0 0 20px ${matrixColor}`,
          }}
          transition={{ duration: 0.4, ease: "easeOut" }}
        >
          {char}
        </motion.span>
      ))}
    </div>
  );
};
