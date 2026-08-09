import { motion } from "framer-motion";
import {
  Sparkles,
  CheckCircle2,
  AlertCircle,
  ArrowRight,
  RefreshCw,
  ClipboardList,
} from "lucide-react";
import Button from "../ui/Button.jsx";
import AnimatedBackground from "../ui/AnimatedBackground.jsx";
import FloatingSparkles from "../ui/FloatingSparkles.jsx";

const DISPLAY_FONT =
  "'aeonikPro', 'Inter', ui-sans-serif, system-ui, -apple-system, 'Segoe UI', sans-serif";

const GLASS_SHADOW =
  "inset 0 1px 1px rgba(216,236,248,0.16), 0 16px 40px rgba(6,6,14,0.4)";

const container = {
  hidden: { opacity: 0 },
  show: {
    opacity: 1,
    transition: { staggerChildren: 0.08, delayChildren: 0.1 },
  },
};
const item = {
  hidden: { opacity: 0, y: 16 },
  show: { opacity: 1, y: 0, transition: { duration: 0.45, ease: "easeOut" } },
};

/** A list card that renders an intentional message when its list is empty. */
function ListCard({ icon: Icon, title, items, accent, emptyText }) {
  const list = Array.isArray(items)
    ? items.filter((s) => typeof s === "string" && s.trim())
    : [];
  return (
    <motion.div
      variants={item}
      className="rounded-[16px] border p-6 backdrop-blur-xl"
      style={{
        background: accent.bg,
        borderColor: accent.border,
        boxShadow: GLASS_SHADOW,
      }}
    >
      <div className="flex items-center gap-2.5">
        <div
          className="flex h-9 w-9 items-center justify-center rounded-lg"
          style={{ background: accent.iconBg, color: accent.iconText }}
        >
          <Icon className="h-5 w-5" />
        </div>
        <h3 className="text-lg font-semibold text-[#d8ecf8]">{title}</h3>
      </div>
      {list.length === 0 ? (
        <p className="mt-4 text-sm italic text-[#9da7ba]">{emptyText}</p>
      ) : (
        <ul className="mt-4 space-y-2.5">
          {list.map((entry, i) => (
            <li
              key={i}
              className="flex gap-2.5 text-sm leading-relaxed text-[#c7d3ea]"
            >
              <span
                className="mt-2 h-1.5 w-1.5 shrink-0 rounded-full"
                style={{ background: accent.dot }}
              />
              <span>{entry}</span>
            </li>
          ))}
        </ul>
      )}
    </motion.div>
  );
}
export default function FeedbackScreen({ feedback, candidate, onRestart }) {
  const fb = feedback ?? {};
  const name = candidate?.member?.name ?? "the candidate";
  const summary =
    typeof fb.summary === "string" && fb.summary.trim()
      ? fb.summary
      : "The interview is complete. A detailed summary was not available, but the conversation covered several core topics from the cohort.";

  return (
    <div className="interview-page relative min-h-screen" style={{ background: "#f9fbf2" }}>
      <AnimatedBackground />
      <FloatingSparkles />
      <div className="container-tight relative py-12 sm:py-16">
        <motion.div
          variants={container}
          initial="hidden"
          animate="show"
          className="mx-auto max-w-3xl"
        >
          <motion.div variants={item} className="text-center">
            <motion.span
              animate={{ scale: [1, 1.06, 1] }}
              transition={{
                duration: 1.8,
                repeat: Infinity,
                ease: "easeInOut",
              }}
              className="inline-flex items-center gap-2 rounded-full px-3 py-1 text-xs font-medium text-[#c4b3fb] backdrop-blur-xl"
              style={{
                background: "rgba(102,58,243,0.12)",
                border: "1px solid rgba(102,58,243,0.35)",
                boxShadow: "0 0 22px rgba(102,58,243,0.30)",
              }}
            >
              <Sparkles className="h-3.5 w-3.5" /> Interview complete
            </motion.span>
            <h1
              className="mt-4 text-3xl font-medium tracking-tight text-[#d8ecf8] sm:text-4xl"
              style={{ fontFamily: DISPLAY_FONT }}
            >
              Here’s how {name.split(" ")[0]} did
            </h1>
          </motion.div>

          {/* Summary — highlighted */}
          <motion.div
            variants={item}
            className="mt-8 rounded-[16px] border border-[rgba(102,58,243,0.30)] p-6 backdrop-blur-xl sm:p-8"
            style={{
              background:
                "linear-gradient(135deg, rgba(102,58,243,0.12), rgba(199,211,234,0.04))",
              boxShadow: GLASS_SHADOW,
            }}
          >
            <div className="flex items-center gap-2 text-[#c4b3fb]">
              <ClipboardList className="h-5 w-5" />
              <span className="text-sm font-semibold uppercase tracking-wide">
                Summary
              </span>
            </div>
            <p className="mt-3 text-lg leading-relaxed text-[#d1e4fa]">
              {summary}
            </p>
          </motion.div>

          {/* Strengths + Gaps */}
          <div className="mt-6 grid gap-6 sm:grid-cols-2">
            <ListCard
              icon={CheckCircle2}
              title="Strengths"
              items={fb.strengths}
              emptyText="No standout strengths were captured in this run."
              accent={{
                border: "rgba(182,217,252,0.28)",
                bg: "rgba(182,217,252,0.06)",
                iconBg: "rgba(182,217,252,0.14)",
                iconText: "#b6d9fc",
                dot: "#b6d9fc",
              }}
            />
            <ListCard
              icon={AlertCircle}
              title="Gaps"
              items={fb.gaps}
              emptyText="Nothing notable — solid across the board."
              accent={{
                border: "rgba(255,180,90,0.24)",
                bg: "rgba(255,180,90,0.06)",
                iconBg: "rgba(255,180,90,0.14)",
                iconText: "#ffcf8f",
                dot: "#ffcf8f",
              }}
            />
          </div>

          {/* Next steps — actionable */}
          <motion.div
            variants={item}
            className="mt-6 rounded-[16px] border border-[rgba(186,215,247,0.12)] p-6 backdrop-blur-xl sm:p-8"
            style={{
              background: "rgba(199,211,234,0.05)",
              boxShadow: GLASS_SHADOW,
            }}
          >
            <div className="flex items-center gap-2.5">
              <div
                className="flex h-9 w-9 items-center justify-center rounded-lg text-white"
                style={{
                  background: "#663af3",
                  boxShadow:
                    "inset 0 1px 0 rgba(255,255,255,0.2), 0 0 18px rgba(102,58,243,0.45)",
                }}
              >
                <ArrowRight className="h-5 w-5" />
              </div>
              <h3 className="text-lg font-semibold text-[#d8ecf8]">
                Recommended next steps
              </h3>
            </div>
            {Array.isArray(fb.next) &&
            fb.next.filter((s) => s?.trim()).length > 0 ? (
              <ol className="mt-4 space-y-3">
                {fb.next
                  .filter((s) => typeof s === "string" && s.trim())
                  .map((step, i) => (
                    <li
                      key={i}
                      className="flex gap-3 text-sm leading-relaxed text-[#c7d3ea]"
                    >
                      <span
                        className="flex h-6 w-6 shrink-0 items-center justify-center rounded-full text-xs font-bold text-white"
                        style={{
                          background: "#663af3",
                          boxShadow:
                            "inset 0 1px 0 rgba(255,255,255,0.2), 0 0 14px rgba(102,58,243,0.45)",
                        }}
                      >
                        {i + 1}
                      </span>
                      <span className="pt-0.5">{step}</span>
                    </li>
                  ))}
              </ol>
            ) : (
              <p className="mt-4 text-sm italic text-[#9da7ba]">
                Keep practicing mock interviews to stay sharp — you’re in good
                shape.
              </p>
            )}
          </motion.div>

          <motion.div variants={item} className="mt-10 flex justify-center">
            <Button onClick={onRestart} size="lg">
              <RefreshCw className="h-4 w-4" /> Start another interview
            </Button>
          </motion.div>
        </motion.div>
      </div>
    </div>
  );
}
