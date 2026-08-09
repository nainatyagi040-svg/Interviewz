import { Quote } from "lucide-react";
import Reveal from "./Reveal.jsx";

export default function Callout() {
  return (
    <section className="scroll-mt-20">
      <div className="container-tight py-20 sm:py-28">
        <Reveal className="mx-auto max-w-3xl">
          <div
            className="lime-surface relative overflow-hidden rounded-[28px] border border-[#14140f] p-8 text-center sm:p-12"
            style={{
              background: "#beff50",
              boxShadow: "none",
            }}
          >
            {/* Single violet accent glow */}
            <div
              className="pointer-events-none absolute -inset-24 -z-10 blur-3xl"
              style={{
                background: "transparent",
              }}
            />

            <Quote className="mx-auto h-8 w-8" style={{ color: "#14140f" }} />

            <p className="mt-5 text-2xl font-medium leading-snug tracking-tight text-[#14140f] sm:text-3xl">
              Finishing the curriculum is the easy part. The gap that costs
              people offers is being able to{" "}
              <span
                style={{
                  background: "none",
                  WebkitBackgroundClip: "text",
                  backgroundClip: "text",
                  color: "#14140f",
                }}
              >
                explain what they built
              </span>{" "}
              — out loud, under pressure.
            </p>

            <p className="mt-6 text-sm font-medium text-[#30302a]">
              Loop closes that gap before the real interview does.
            </p>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
