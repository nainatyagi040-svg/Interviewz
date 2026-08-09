import { Quote } from "lucide-react";
import Reveal from "./Reveal.jsx";

export default function Callout() {
  return (
    <section className="scroll-mt-20">
      <div className="container-tight py-20 sm:py-28">
        <Reveal className="mx-auto max-w-3xl">
          <div className="relative overflow-hidden rounded-3xl border border-slate-700 bg-gradient-to-br from-slate-900 via-slate-900 to-slate-800 p-8 text-center shadow-xl backdrop-blur sm:p-12">
            {/* Background glow */}
            <div className="absolute inset-0 -z-10 bg-gradient-to-r from-brand-600/10 via-indigo-500/10 to-purple-600/10 blur-3xl" />

            <Quote className="mx-auto h-8 w-8 text-brand-400" />

            <p className="mt-5 text-2xl font-semibold leading-snug tracking-tight text-slate-100 sm:text-3xl">
              Finishing the curriculum is the easy part. The gap that costs
              people offers is being able to{" "}
              <span className="text-gradient">explain what they built</span> —
              out loud, under pressure.
            </p>

            <p className="mt-6 text-sm font-medium text-slate-400">
              Loop closes that gap before the real interview does.
            </p>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
