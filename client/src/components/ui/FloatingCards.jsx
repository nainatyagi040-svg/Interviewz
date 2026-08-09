import { motion } from "framer-motion";
import { MessageSquareText, Star, Gauge } from "lucide-react";

const cards = [
  {
    icon: MessageSquareText,
    label: "Question",
    text: "Walk me through your RAG pipeline.",
    tone: "blueprint",
    delay: 0,
    x: 8,
    y: -18,
    rotate: -6,
  },
  {
    icon: Gauge,
    label: "AI Score",
    text: "87 / 100 — strong retrieval reasoning",
    tone: "frost",
    delay: 0.5,
    x: 28,
    y: 22,
    rotate: 5,
  },
  {
    icon: Star,
    label: "Feedback",
    text: "Great grasp of citation grounding.",
    tone: "violet",
    delay: 1,
    x: 10,
    y: 58,
    rotate: -3,
  },
];

/* Cool, on-brand badge tones — Blueprint / Frost / single Void Violet accent. */
const tones = {
  blueprint:
    "border-[rgba(182,217,252,0.30)] text-[#b6d9fc] bg-[rgba(182,217,252,0.10)]",
  frost:
    "border-[rgba(209,228,250,0.28)] text-[#d1e4fa] bg-[rgba(199,211,234,0.10)]",
  violet:
    "border-[rgba(102,58,243,0.40)] text-[#c4b3fb] bg-[rgba(102,58,243,0.14)]",
};

/** Small glassy cards, positioned relative to the parent's own box — stays contained. */
export default function FloatingCards() {
  return (
    <div className="pointer-events-none absolute inset-0 z-20">
      {cards.map(
        ({ icon: Icon, label, text, tone, delay, x, y, rotate }, i) => (
          <motion.div
            key={i}
            className="absolute w-44 rounded-2xl border border-[rgba(186,215,247,0.12)] p-3 backdrop-blur-xl"
            style={{
              left: `${x}%`,
              top: `${y}%`,
              background: "rgba(5,6,15,0.72)",
              boxShadow:
                "inset 0 1px 1px rgba(216,236,248,0.18), inset 0 24px 48px rgba(168,216,245,0.05), 0 16px 40px rgba(6,6,14,0.5)",
            }}
            initial={{ opacity: 0, y: 20, rotate }}
            animate={{
              opacity: 1,
              y: [0, -12, 0],
              rotate: [rotate, rotate + 2, rotate],
            }}
            transition={{
              opacity: { duration: 0.6, delay },
              y: {
                duration: 5 + i,
                repeat: Infinity,
                ease: "easeInOut",
                delay,
              },
              rotate: {
                duration: 6 + i,
                repeat: Infinity,
                ease: "easeInOut",
                delay,
              },
            }}
          >
            <div
              className={`inline-flex items-center gap-1.5 rounded-md border px-2 py-0.5 text-[10px] font-semibold ${tones[tone]}`}
            >
              <Icon className="h-3 w-3" /> {label}
            </div>
            <p className="mt-1.5 text-xs leading-snug text-[#c7d3ea]">{text}</p>
          </motion.div>
        ),
      )}
    </div>
  );
}
