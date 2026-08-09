import { motion } from "framer-motion";
import { MessageSquareText, Star, Gauge } from "lucide-react";

const cards = [
  {
    icon: MessageSquareText,
    label: "Question",
    text: "Walk me through your RAG pipeline.",
    tone: "brand",
    delay: 0,
    x: 8,
    y: -18,
    rotate: -6,
  },
  {
    icon: Gauge,
    label: "AI Score",
    text: "87 / 100 — strong retrieval reasoning",
    tone: "emerald",
    delay: 0.5,
    x: 28,
    y: 22,
    rotate: 5,
  },
  {
    icon: Star,
    label: "Feedback",
    text: "Great grasp of citation grounding.",
    tone: "amber",
    delay: 1,
    x: 10,
    y: 58,
    rotate: -3,
  },
];

const tones = {
  brand: "border-brand-400/30 text-brand-300 bg-brand-500/10",
  emerald: "border-emerald-400/30 text-emerald-300 bg-emerald-500/10",
  amber: "border-amber-400/30 text-amber-300 bg-amber-500/10",
};

/** Small glassy cards, positioned relative to the parent's own box — stays contained. */
export default function FloatingCards() {
  return (
    <div className="pointer-events-none absolute inset-0 z-20">
      {cards.map(
        ({ icon: Icon, label, text, tone, delay, x, y, rotate }, i) => (
          <motion.div
            key={i}
            className="absolute w-44 rounded-xl border bg-slate-900/80 p-3 shadow-xl backdrop-blur-md"
            style={{ left: `${x}%`, top: `${y}%` }}
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
            <p className="mt-1.5 text-xs leading-snug text-slate-300">{text}</p>
          </motion.div>
        ),
      )}
    </div>
  );
}
