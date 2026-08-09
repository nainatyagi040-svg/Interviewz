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

export default function FeatureGrid() {
  return (
    <section id="features" className="scroll-mt-20 bg-slate-950">
      <div className="container-tight py-20 sm:py-28">
        <Reveal className="mx-auto max-w-2xl text-center">
          <h2 className="text-3xl font-bold tracking-tight text-slate-100 sm:text-4xl">
            Built to feel like the real thing
          </h2>

          <p className="mt-4 text-lg text-slate-300">
            Everything about Loop is designed to mirror an actual technical
            interview.
          </p>
        </Reveal>

        <div className="mt-14 grid gap-6 sm:grid-cols-2">
          {features.map((f, i) => (
            <Reveal key={f.title} delay={(i % 2) * 0.1}>
              <div className="flex h-full gap-4 rounded-2xl border border-slate-700 bg-slate-900/80 p-6 shadow-xl backdrop-blur transition-all duration-300 hover:-translate-y-1 hover:border-brand-500/50 hover:bg-slate-800">
                <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-brand-600/20 text-brand-400">
                  <f.icon className="h-5 w-5" />
                </div>

                <div>
                  <h3 className="text-lg font-semibold text-slate-100">
                    {f.title}
                  </h3>

                  <p className="mt-1.5 text-sm leading-relaxed text-slate-300">
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
