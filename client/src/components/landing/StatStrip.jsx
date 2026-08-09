import Reveal from "./Reveal.jsx";

const stats = [
  { value: "31-day", label: "AI engineering curriculum" },
  { value: "8", label: "modules, setup to capstone" },
  { value: "20", label: "learner profiles" },
  { value: "8+", label: "adaptive questions per interview" },
];

export default function StatStrip() {
  return (
    <section className="border-y border-slate-200/70 bg-slate-50/60">
      <div className="container-tight py-8">
        <Reveal className="grid grid-cols-2 gap-6 sm:grid-cols-4">
          {stats.map((s) => (
            <div key={s.label} className="text-center">
              <div className="text-2xl font-extrabold tracking-tight text-slate-900 sm:text-3xl">
                {s.value}
              </div>
              <div className="mt-1 text-xs leading-snug text-slate-500 sm:text-sm">
                {s.label}
              </div>
            </div>
          ))}
        </Reveal>
        <p className="mt-6 text-center text-xs text-slate-400">
          Illustrative figures for the cohort concept.
        </p>
      </div>
    </section>
  );
}
