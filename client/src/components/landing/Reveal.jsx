import { motion } from "framer-motion";

export default function Reveal({
  children,
  className = "",
  delay = 0,
  as = "div",
}) {
  const MotionTag = motion[as] ?? motion.div;

  return (
    <MotionTag
      className={className}
      initial={{
        opacity: 0,
        y: 56,
        scale: 0.94,
        rotateX: 8,
        filter: "blur(10px)",
      }}
      whileInView={{
        opacity: 1,
        y: 0,
        scale: 1,
        rotateX: 0,
        filter: "blur(0px)",
      }}
      viewport={{
        once: true,
        amount: 0.22,
      }}
      transition={{
        duration: 0.95,
        delay,
        ease: [0.16, 1, 0.3, 1],
      }}
      style={{ transformPerspective: 1200 }}
    >
      {children}
    </MotionTag>
  );
}
