import { BookOpen, MessagesSquare, ClipboardCheck } from "lucide-react";
import Reveal from "./Reveal.jsx";

const steps = [
  {
    icon: BookOpen,
    title: "We read your learning journey",
    body: "Loop cross-references your missions against the curriculum — what you aced, what you struggled with, what you skipped.",
  },
  {
    icon: MessagesSquare,
    title: "You get a live, adaptive interview",
    body: "A senior-style interviewer asks real questions and follows up on your actual answers, going deeper where it matters.",
  },
  {
    icon: ClipboardCheck,
    title: "You get structured feedback",
    body: "At the end, a clear breakdown of strengths, gaps, and concrete next steps — grounded in the whole conversation.",
  },
];

const DISPLAY_FONT =
  "'aeonikPro', 'Inter', ui-sans-serif, system-ui, -apple-system, 'Segoe UI', sans-serif";

export default function HowItWorks() {
  return (
    <section id="how-it-works" className="scroll-mt-20">
      <div className="container-tight py-20 sm:py-28">
        <Reveal className="mx-auto max-w-2xl text-center">
          <h2
            className="text-3xl font-medium tracking-tight text-[#d8ecf8] sm:text-4xl"
            style={{ fontFamily: DISPLAY_FONT }}
          >
            How it works
          </h2>
          <p className="mt-4 text-lg text-[#c7d3ea]">
            Three steps from your cohort history to interview-ready.
          </p>
        </Reveal>

        <div className="mt-14 grid gap-6 md:grid-cols-3">
          {steps.map((s, i) => (
            <Reveal key={s.title} delay={i * 0.1}>
              <div
                className="group relative h-full rounded-[16px] border border-[rgba(186,215,247,0.12)] p-7 backdrop-blur-xl transition-all duration-500 hover:border-[rgba(102,58,243,0.35)]"
                style={{
                  background: "rgba(199,211,234,0.05)",
                  boxShadow:
                    "inset 0 1px 1px rgba(216,236,248,0.16), 0 16px 40px rgba(6,6,14,0.4)",
                }}
              >
                <div
                  className="flex h-11 w-11 items-center justify-center rounded-xl text-white transition-transform duration-500 group-hover:scale-110"
                  style={{
                    background: "#663af3",
                    boxShadow:
                      "inset 0 1px 0 rgba(255,255,255,0.2), 0 0 22px rgba(102,58,243,0.45)",
                  }}
                >
                  <s.icon className="h-5 w-5" />
                </div>
                <div className="mt-5 flex items-center gap-2">
                  <span className="text-sm font-semibold text-[#b6d9fc]">
                    Step {i + 1}
                  </span>
                </div>
                <h3 className="mt-1 text-lg font-semibold text-[#d8ecf8]">
                  {s.title}
                </h3>
                <p className="mt-2 text-sm leading-relaxed text-[#c7d3ea]">
                  {s.body}
                </p>
              </div>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
