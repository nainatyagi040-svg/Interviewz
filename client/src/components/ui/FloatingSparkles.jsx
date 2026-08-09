import { useMemo } from "react";
import { motion } from "framer-motion";
import { Sparkles, Star, Zap, Circle, Triangle } from "lucide-react";

const ICONS = [Sparkles, Star, Zap, Circle, Triangle];

/*
 * Ambient drifting particles. Recolored to the design-system cool palette
 * (Frost / Blueprint / Moon / Ice + a touch of Void Violet) — no rainbow —
 * and kept below the nav (z-40 < z-50) so they never float over the navbar.
 */
const COLORS = [
  "#d1e4fa", // frost-glow
  "#b6d9fc", // blueprint-blue
  "#c7d3ea", // moon-mist
  "#663af3", // void-violet (single accent)
  "#d8ecf8", // ice-highlight
];

/** Random floating icons that drift up the screen forever. Sits above content, below the nav. */
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
    <div className="pointer-events-none fixed inset-0 z-40 overflow-hidden">
      {items.map(({ id, Icon, color, left, size, duration, delay }) => (
        <motion.div
          key={id}
          className="absolute"
          style={{ left: `${left}%`, bottom: "-10%", color }}
          animate={{
            y: ["0vh", "-120vh"],
            x: [0, Math.random() > 0.5 ? 40 : -40, 0],
            opacity: [0, 0.5, 0.5, 0],
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
