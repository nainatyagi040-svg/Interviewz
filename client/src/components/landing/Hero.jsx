import { useEffect, useRef } from "react";
import { motion } from "framer-motion";
import { ArrowRight, CircleDot, Gauge, Star } from "lucide-react";
import Button from "../ui/Button.jsx";

/* ── Design-system palette (from /design-system) applied inline so the hero
   renders faithfully independent of the Tailwind token migration. ────────── */
const C = {
  canvas: "#f5f5eb",
  ice: "#14140f",
  frost: "#14140f",
  moon: "#6e6e64",
  fog: "#6e6e64",
  violet: "#beff50",
  blueprint: "#14140f",
};

const DISPLAY_FONT =
  "'aeonikPro', 'Inter', ui-sans-serif, system-ui, -apple-system, 'Segoe UI', sans-serif";

/* Cool-tinted frosted-glass shadow stack (shadow tokens subtle-6 + card drop). */
const GLASS_SHADOW =
  "rgba(216, 236, 248, 0.2) 0px 1px 1px 0px inset, rgba(168, 216, 245, 0.06) 0px 24px 48px 0px inset, rgba(6, 6, 14, 0.55) 0px 24px 40px 0px";

const TRANSCRIPT = [
  {
    role: "interviewer",
    text: "On Day 19 you built a RAG pipeline. Walk me through how you handled retrieval when a query matched nothing well.",
  },
  {
    role: "candidate",
    text: "I added a score threshold and fell back to a clarifying question instead of answering from weak context.",
  },
  {
    role: "interviewer",
    text: "Good instinct. What score did you pick, and how did you validate it wasn't too aggressive?",
  },
];

/* Cursor-following violet spotlight — on-brand Raycast/Linear ambient light. */
function useSpotlight() {
  const ref = useRef(null);
  useEffect(() => {
    const el = ref.current;
    const parent = el?.parentElement;
    if (!el || !parent) return;
    const onMove = (e) => {
      const r = parent.getBoundingClientRect();
      el.style.background = "transparent";
    };
    parent.addEventListener("mousemove", onMove);
    return () => parent.removeEventListener("mousemove", onMove);
  }, []);
  return ref;
}

function FloatingChip({ icon: Icon, label, text, className, delay, rotate }) {
  return (
    <motion.div
      className={`hero-floating-chip pointer-events-none absolute z-30 w-44 rounded-2xl border border-white/10 p-3 backdrop-blur-xl ${className}`}
      style={{ background: "rgba(255,255,255,.92)", boxShadow: "0 20px 45px rgba(20,20,15,.12), inset 0 1px 0 rgba(255,255,255,.9)" }}
      initial={{ opacity: 0, y: 20, rotate }}
      animate={{
        opacity: 1,
        y: [0, -8, 0],
        rotate: [rotate, rotate + 2, rotate],
      }}
      transition={{
        opacity: { duration: 0.6, delay },
        y: { duration: 3.6, repeat: Infinity, ease: "easeInOut", delay },
        rotate: { duration: 7, repeat: Infinity, ease: "easeInOut", delay },
      }}
    >
      <div
        className="floating-chip-label inline-flex items-center gap-1.5 rounded-md border px-2 py-0.5 text-[10px] font-semibold"
        style={{
          borderColor: "rgba(182,217,252,0.25)",
          color: C.blueprint,
          background: "rgba(199,211,234,0.10)",
        }}
      >
        <Icon className="h-3 w-3" /> {label}
      </div>
      <p className="mt-1.5 text-xs leading-snug" style={{ color: C.moon }}>
        {text}
      </p>
    </motion.div>
  );
}
/* The live-interview mock — premium editorial product card. */
function InterviewMock() {
  return (
    <div className="relative z-10">
      {/* Quiet parchment halo behind the card */}
      <div
        className="absolute -inset-8 -z-10 rounded-[2.5rem] blur-3xl"
        style={{
          background: "rgba(190,255,80,.28)",
        }}
      />
      <div
        className="interview-mock-card w-full max-w-xl rounded-[28px] border border-[#d2d2c8] p-5 sm:p-6"
        style={{ background: "#ffffff", boxShadow: "0 30px 70px rgba(20,20,15,.14), 0 8px 24px rgba(20,20,15,.06)" }}
      >
        <div className="mb-5 flex items-center gap-3 border-b border-[#d2d2c8] pb-4">
          <span
            className="flex h-8 w-8 items-center justify-center rounded-full text-[#14140f]"
            style={{
              background: "#beff50",
            }}
          >
            <CircleDot className="h-4 w-4" strokeWidth={2.5} />
          </span>
          <span className="text-sm font-medium tracking-tight text-[#14140f]">
            Live interview
          </span>
          <span
            className="ml-auto flex items-center gap-1.5 text-[10px] font-medium uppercase tracking-[0.1em] text-[#6e6e64]"
          >
            <span
              className="h-1.5 w-1.5 rounded-full"
              style={{
                background: "#beff50",
              }}
            />
            in progress
          </span>
        </div>

        <div className="space-y-3">
          {TRANSCRIPT.map((l, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 8 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.55 + i * 0.35, duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
              className={l.role === "candidate" ? "flex justify-end" : "flex justify-start"}
            >
              <div
                className="max-w-[85%] rounded-2xl px-3.5 py-2.5 text-sm leading-relaxed"
                style={
                  l.role === "candidate"
                    ? {
                        borderBottomRightRadius: 8,
                        background: "#beff50",
                        color: "#14140f",
                      }
                    : {
                        borderBottomLeftRadius: 8,
                        background: "#f5f5eb",
                        color: "#14140f",
                        border: "1px solid #d2d2c8",
                      }
                }
              >
                {l.text}
              </div>
            </motion.div>
          ))}

          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 1.6 }}
            className="flex items-center gap-1 pl-1"
          >
            <span className="typing-dot" />
            <span className="typing-dot" />
            <span className="typing-dot" />
          </motion.div>
        </div>
      </div>
    </div>
  );
}
export default function Hero() {
  const spotlightRef = useSpotlight();

  return (
    <section
      className="relative overflow-hidden"
      style={{ background: C.canvas }}
    >
      {/* ── Background layers ─────────────────────────────────────── */}

      {/* Twin ambient glows — violet accent + frost wash */}
      <div className="pointer-events-none absolute inset-0 -z-10">
        <div
          className="absolute left-1/2 top-[-14%] h-[460px] w-[780px] -translate-x-1/2 rounded-full blur-[120px]"
          style={{ background: "transparent" }}
        />
        <div
          className="absolute right-[-6%] top-[30%] h-[320px] w-[320px] rounded-full blur-[110px]"
          style={{ background: "transparent" }}
        />
      </div>

      {/* Cursor spotlight */}
      <div ref={spotlightRef} className="pointer-events-none absolute inset-0 z-0" />

      {/* Top hairline that catches the light — Vercel/Linear signature */}
      <div
        className="pointer-events-none absolute inset-x-0 top-0 h-px"
        style={{
          background:
            "linear-gradient(to right, transparent, rgba(216,236,248,0.4), transparent)",
        }}
      />

      {/* ── Content ───────────────────────────────────────────────── */}
      <div className="container-tight relative z-10 grid grid-cols-1 items-center gap-12 py-20 sm:py-28 lg:grid-cols-2 lg:gap-10">
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
        >
          {/* Display headline with ice→blue gradient fade on the key phrase */}
          <h1
            className="max-w-[12ch] text-4xl font-medium leading-[.96] tracking-[-0.04em] sm:text-5xl lg:text-[64px]"
            style={{ fontFamily: DISPLAY_FONT, color: C.ice }}
          >
            The AI interviewer<br />that actually knows<br />what you learned
          </h1>

          <p
            className="mt-6 max-w-xl text-lg leading-relaxed"
            style={{ color: C.moon }}
          >
            Loop reads your 31-day AI engineering journey and runs a live,
            adaptive technical interview — real follow-ups, not a quiz — then
            hands you structured, honest feedback.
          </p>

          <div className="mt-9 flex flex-col gap-3 sm:flex-row">
            <Button as="link" to="/interview" size="lg">
              Start Your Interview
              <ArrowRight className="h-4 w-4" />
            </Button>
            <Button as="a" href="#how-it-works" variant="secondary" size="lg">
              See how it works
            </Button>
          </div>

          <p className="mt-5 text-sm" style={{ color: C.fog }}>
            No account needed · Takes about 10 minutes
          </p>
        </motion.div>

        {/* Right column — floating chips + the live interview mock */}
        <motion.div
          initial={{ opacity: 0, scale: 0.92 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1], delay: 0.15 }}
          className="relative flex items-center justify-center"
        >
          <div className="hero-floating-chips absolute inset-0 z-30 hidden lg:block">
            <FloatingChip
              icon={Gauge}
              label="AI Score"
              text="87 / 100 — strong retrieval reasoning"
              className="right-[-1rem] top-[78%] translate-x-full"
              delay={0.6}
              rotate={5}
            />
            <FloatingChip
              icon={Star}
              label="Feedback"
              text="Great grasp of citation grounding."
              className="left-[-8rem] top-[12%]"
              delay={1}
              rotate={-4}
            />
          </div>
          <InterviewMock />
        </motion.div>
      </div>

      {/* Bottom fade into the next section */}
      <div
        className="hero-bottom-fade pointer-events-none absolute inset-x-0 bottom-0 h-24"
      />
    </section>
  );
}
