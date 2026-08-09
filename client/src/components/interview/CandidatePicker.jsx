import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import {
  ArrowLeft,
  Briefcase,
  GraduationCap,
  Flame,
  CheckCircle2,
  ArrowRight,
} from "lucide-react";
import candidatesData from "../../data/candidates.json";
import AnimatedBackground from "../ui/AnimatedBackground.jsx";
import FloatingSparkles from "../ui/FloatingSparkles.jsx";

const DISPLAY_FONT =
  "'aeonikPro', 'Inter', ui-sans-serif, system-ui, -apple-system, 'Segoe UI', sans-serif";

function getCandidates() {
  const list = candidatesData?.candidates;
  return Array.isArray(list) ? list : [];
}

function CandidateCard({ entry, onSelect, index }) {
  const m = entry?.member ?? {};
  const signals = entry?.signals ?? {};
  const missions = Array.isArray(entry?.missions) ? entry.missions : [];
  const passed = missions.filter((x) => x?.passed).length;

  return (
    <motion.button
      type="button"
      onClick={() => onSelect(entry)}
      initial={{ opacity: 0, y: 16 }}
      animate={{ opacity: 1, y: 0 }}
      whileHover={{
        scale: 1.06,
        rotate: -1.5,
        y: -10,
        boxShadow: "0 20px 40px -10px rgba(102,58,243,0.45)",
      }}
      whileTap={{ scale: 0.98 }}
      transition={{
        duration: 0.4,
        delay: index * 0.06,
        type: "spring",
        stiffness: 300,
        damping: 20,
      }}
      className="group relative flex h-full flex-col overflow-hidden rounded-[16px] border border-[rgba(186,215,247,0.12)] p-6 text-left backdrop-blur-xl transition-colors duration-500 hover:border-[rgba(102,58,243,0.35)] focus:outline-none focus-visible:ring-2 focus-visible:ring-[#663af3]/70"
      style={{
        background: "rgba(199,211,234,0.05)",
        boxShadow:
          "inset 0 1px 1px rgba(216,236,248,0.16), 0 16px 40px rgba(6,6,14,0.4)",
      }}
    >
      <span
        className="pointer-events-none absolute inset-0 opacity-0 transition-opacity duration-500 group-hover:opacity-100"
        style={{
          background:
            "radial-gradient(120% 80% at 50% 0%, rgba(102,58,243,0.10), transparent 70%)",
        }}
      />

      <div className="relative flex items-start justify-between">
        <div
          className="flex h-12 w-12 items-center justify-center rounded-full text-lg font-bold text-[#d8ecf8]"
          style={{
            background: "rgba(102,58,243,0.18)",
            border: "1px solid rgba(102,58,243,0.30)",
          }}
        >
          {(m.name ?? "?").slice(0, 1)}
        </div>
        {m.status && (
          <span
            className="rounded-full px-2.5 py-1 text-xs font-medium"
            style={
              m.status === "COMPLETED"
                ? {
                    color: "#b6d9fc",
                    background: "rgba(182,217,252,0.10)",
                    border: "1px solid rgba(182,217,252,0.28)",
                  }
                : {
                    color: "#9da7ba",
                    background: "rgba(199,211,234,0.08)",
                    border: "1px solid rgba(186,215,247,0.16)",
                  }
            }
          >
            {m.status === "COMPLETED" ? "Completed" : "In progress"}
          </span>
        )}
      </div>
      <h3 className="relative mt-4 text-lg font-semibold text-[#d8ecf8]">
        {m.name ?? "Unnamed candidate"}
      </h3>

      <div className="relative mt-3 space-y-1.5 text-sm text-[#c7d3ea]">
        {m.jobRole && (
          <div className="flex items-center gap-2">
            <Briefcase className="h-4 w-4 text-[#9da7ba]" />
            <span>{m.jobRole}</span>
            {typeof m.yearsExperience === "number" && (
              <span className="text-[#9da7ba]">· {m.yearsExperience}y</span>
            )}
          </div>
        )}
        {m.education && (
          <div className="flex items-center gap-2">
            <GraduationCap className="h-4 w-4 text-[#9da7ba]" />
            <span>{m.education}</span>
          </div>
        )}
      </div>

      <div className="relative mt-4 flex flex-wrap gap-2 border-t border-[rgba(186,215,247,0.10)] pt-4 text-xs">
        {typeof signals.commitDays === "number" && (
          <span
            className="inline-flex items-center gap-1 rounded-md px-2 py-1 text-[#c7d3ea]"
            style={{ background: "rgba(199,211,234,0.08)" }}
          >
            <Flame className="h-3.5 w-3.5 text-[#b6d9fc]" /> {signals.commitDays}{" "}
            active days
          </span>
        )}
        <span
          className="inline-flex items-center gap-1 rounded-md px-2 py-1 text-[#c7d3ea]"
          style={{ background: "rgba(199,211,234,0.08)" }}
        >
          <CheckCircle2 className="h-3.5 w-3.5 text-[#b6d9fc]" /> {passed}{" "}
          missions shown
        </span>
      </div>

      <div className="relative mt-5 flex items-center gap-1.5 text-sm font-medium text-[#b6d9fc]">
        Interview {m.name?.split(" ")[0] ?? "this candidate"}
        <ArrowRight className="h-4 w-4 transition group-hover:translate-x-0.5" />
      </div>
    </motion.button>
  );
}

export default function CandidatePicker({ onSelect }) {
  const candidates = getCandidates();

  return (
    <div
      className="interview-page relative min-h-screen"
      style={{ background: "#f9fbf2" }}
    >
      <AnimatedBackground />
      <FloatingSparkles />
      <div className="container-tight relative py-10 sm:py-14">
        <Link
          to="/"
          className="inline-flex items-center gap-1.5 text-sm font-medium text-[#9da7ba] transition-colors duration-300 hover:text-[#d8ecf8]"
        >
          <ArrowLeft className="h-4 w-4" /> Back to home
        </Link>

        <div className="mt-6 max-w-2xl">
          <h1
            className="text-3xl font-medium tracking-tight text-[#d8ecf8] sm:text-4xl"
            style={{ fontFamily: DISPLAY_FONT }}
          >
            Choose a candidate to interview
          </h1>
          <p className="mt-3 text-lg text-[#c7d3ea]">
            Each profile carries a real learning history. Loop tailors the
            interview to what that person actually did in the cohort.
          </p>
        </div>

        {candidates.length === 0 ? (
          <div
            className="mt-10 rounded-[16px] border border-dashed border-[rgba(186,215,247,0.20)] p-10 text-center text-[#9da7ba]"
            style={{ background: "rgba(199,211,234,0.03)" }}
          >
            No candidate data found. Add profiles to{" "}
            <code
              className="rounded px-1.5 py-0.5 text-sm text-[#d1e4fa]"
              style={{ background: "rgba(199,211,234,0.10)" }}
            >
              src/data/candidates.json
            </code>
            .
          </div>
        ) : (
          <div className="mt-8 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
            {candidates.map((entry, i) => (
              <CandidateCard
                key={entry?.member?.id ?? i}
                entry={entry}
                index={i}
                onSelect={onSelect}
              />
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
