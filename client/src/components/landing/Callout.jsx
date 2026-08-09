import { Quote } from "lucide-react";
import Reveal from "./Reveal.jsx";

export default function Callout() {
  return (
    <section className="scroll-mt-20">
      <div className="container-tight py-20 sm:py-28">
        <Reveal className="mx-auto max-w-3xl">
          <div
            className="relative overflow-hidden rounded-[24px] border border-[rgba(186,215,247,0.14)] p-8 text-center backdrop-blur-xl sm:p-12"
            style={{
              background: "rgba(5,6,15,0.72)",
              boxShadow:
                "inset 0 1px 1px rgba(216,236,248,0.16), inset 0 24px 48px rgba(168,216,245,0.05), 0 24px 60px rgba(6,6,14,0.6)",
            }}
          >
            {/* Single violet accent glow */}
            <div
              className="pointer-events-none absolute -inset-24 -z-10 blur-3xl"
              style={{
                background:
                  "radial-gradient(closest-side, rgba(102,58,243,0.20), transparent 70%)",
              }}
            />

            <Quote className="mx-auto h-8 w-8" style={{ color: "#b6d9fc" }} />

            <p className="mt-5 text-2xl font-semibold leading-snug tracking-tight text-[#d8ecf8] sm:text-3xl">
              Finishing the curriculum is the easy part. The gap that costs
              people offers is being able to{" "}
              <span
                style={{
                  background:
                    "linear-gradient(180deg, #d8ecf8 0%, #b6d9fc 55%, #98c0ef 100%)",
                  WebkitBackgroundClip: "text",
                  backgroundClip: "text",
                  color: "transparent",
                }}
              >
                explain what they built
              </span>{" "}
              — out loud, under pressure.
            </p>

            <p className="mt-6 text-sm font-medium text-[#9da7ba]">
              Loop closes that gap before the real interview does.
            </p>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
