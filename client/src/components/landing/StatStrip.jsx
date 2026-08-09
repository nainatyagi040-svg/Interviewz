import Reveal from "./Reveal.jsx";

const stats = [
  { value: "31-day", label: "AI engineering curriculum" },
  { value: "8", label: "modules, setup to capstone" },
  { value: "20", label: "learner profiles" },
  { value: "8+", label: "adaptive questions per interview" },
];

const DISPLAY_FONT =
  "'aeonikPro', 'Inter', ui-sans-serif, system-ui, -apple-system, 'Segoe UI', sans-serif";

export default function StatStrip() {
  return (
    <section className="relative border-y border-[rgba(186,215,247,0.10)] bg-[rgba(199,211,234,0.03)] backdrop-blur-md">
      {/* Top light-catching hairline */}
      <div
        className="pointer-events-none absolute inset-x-0 top-0 h-px"
        style={{
          background:
            "linear-gradient(to right, transparent, rgba(216,236,248,0.25), transparent)",
        }}
      />

      <div className="container-tight py-10">
        <Reveal className="grid grid-cols-2 gap-6 sm:grid-cols-4">
          {stats.map((s) => (
            <div key={s.label} className="group text-center">
              <div
                className="text-2xl font-medium tracking-tight text-[#d8ecf8] transition-colors duration-300 group-hover:text-white sm:text-3xl"
                style={{ fontFamily: DISPLAY_FONT }}
              >
                {s.value}
              </div>
              <div className="mt-1.5 text-xs leading-snug text-[#9da7ba] sm:text-sm">
                {s.label}
              </div>
            </div>
          ))}
        </Reveal>
        <p className="mt-8 text-center text-xs text-[#9da7ba]/70">
          Illustrative figures for the cohort concept.
        </p>
      </div>
    </section>
  );
}
