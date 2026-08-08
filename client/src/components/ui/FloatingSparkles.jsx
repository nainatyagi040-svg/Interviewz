import { useMemo } from "react";
import { motion } from "framer-motion";
import { Sparkles, Star, Zap, Circle, Triangle } from "lucide-react";

const ICONS = [Sparkles, Star, Zap, Circle, Triangle];
const COLORS = [
  "text-brand-500",
  "text-fuchsia-500",
  "text-amber-500",
  "text-sky-500",
  "text-emerald-500",
];

/** Random floating icons that drift up the screen forever. Sits above everything. */
export default function FloatingSparkles({ count = 14 }) {
  const items = useMemo(
    () =>
      Array.from({ length: count }, (_, i) => ({
        id: i,
        Icon: ICONS[i % ICONS.length],
        color: COLORS[i % COLORS.length],
        left: Math.random() * 100,
        size: 14 + Math.random() * 18,
        duration: 8 + Math.random() * 10,
        delay: Math.random() * 8,
      })),
    [count],
  );

  return (
    <div className="pointer-events-none fixed inset-0 z-[60] overflow-hidden">
      {items.map(({ id, Icon, color, left, size, duration, delay }) => (
        <motion.div
          key={id}
          className={`absolute ${color} opacity-70`}
          style={{ left: `${left}%`, bottom: "-10%" }}
          animate={{
            y: ["0vh", "-120vh"],
            x: [0, Math.random() > 0.5 ? 40 : -40, 0],
            opacity: [0, 0.8, 0.8, 0],
            rotate: [0, 180, 360],
          }}
          transition={{
            duration,
            delay,
            repeat: Infinity,
            ease: "linear",
          }}
        >
          <Icon style={{ width: size, height: size }} />
        </motion.div>
      ))}
    </div>
  );
}
