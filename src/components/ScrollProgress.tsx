import { useScroll, useSpring, motion } from "framer-motion";

const ScrollProgress = () => {
  const { scrollYProgress } = useScroll();
  const scaleX = useSpring(scrollYProgress, { stiffness: 100, damping: 30 });

  return (
    <motion.div
      className="fixed top-0 left-0 right-0 z-[999] h-[2px] origin-left"
      style={{ scaleX, background: "#ff6b1a" }}
    />
  );
};

export default ScrollProgress;
