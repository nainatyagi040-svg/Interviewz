import { GitBranch, Target, ListChecks, Waypoints } from "lucide-react";
import Reveal from "./Reveal.jsx";

const features = [
  {
    icon: GitBranch,
    title: "Adaptive follow-ups",
    body: "Every question reacts to what you just said — shallow answers get probed, strong ones get pushed further.",
  },
  {
    icon: Target,
    title: "Grounded in your real progress",
    body: "Questions target the specific curriculum days you actually worked through — no generic trivia.",
  },
  {
    icon: ListChecks,
    title: "Structured feedback",
    body: "A clean summary of strengths, gaps, and next steps you can act on immediately.",
  },
  {
    icon: Waypoints,
    title: "Realistic interview flow",
    body: "Paced and phrased like a real senior interviewer — not a chatbot reading off a list.",
  },
];

const DISPLAY_FONT =
  "'aeonikPro', 'Inter', ui-sans-serif, system-ui, -apple-system, 'Segoe UI', sans-serif";

export default function FeatureGrid() {
  return (
    <section id="features" className="scroll-mt-20">
      <div className="container-tight py-20 sm:py-28">
        <Reveal className="mx-auto max-w-2xl text-center">
          <h2
            className="text-3xl font-medium tracking-tight text-[#d8ecf8] sm:text-4xl"
            style={{ fontFamily: DISPLAY_FONT }}
          >
            Built to feel like the real thing
          </h2>

          <p className="mt-4 text-lg text-[#c7d3ea]">
            Everything about Loop is designed to mirror an actual technical
            interview.
          </p>
        </Reveal>

        <div className="mt-14 grid gap-6 sm:grid-cols-2">
          {features.map((f, i) => (
            <Reveal key={f.title} delay={(i % 2) * 0.1}>
              <div
                className="group flex h-full gap-4 rounded-[16px] border border-[rgba(186,215,247,0.12)] p-6 backdrop-blur-xl transition-all duration-500 hover:-translate-y-1 hover:border-[rgba(102,58,243,0.35)]"
                style={{
                  background: "rgba(199,211,234,0.05)",
                  boxShadow:
                    "inset 0 1px 1px rgba(216,236,248,0.16), 0 16px 40px rgba(6,6,14,0.4)",
                }}
              >
                <div
                  className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl text-white transition-transform duration-500 group-hover:scale-110"
                  style={{
                    background: "#663af3",
                    boxShadow:
                      "inset 0 1px 0 rgba(255,255,255,0.2), 0 0 22px rgba(102,58,243,0.45)",
                  }}
                >
                  <f.icon className="h-5 w-5" />
                </div>

                <div>
                  <h3 className="text-lg font-semibold text-[#d8ecf8]">
                    {f.title}
                  </h3>

                  <p className="mt-1.5 text-sm leading-relaxed text-[#c7d3ea]">
                    {f.body}
                  </p>
                </div>
              </div>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
