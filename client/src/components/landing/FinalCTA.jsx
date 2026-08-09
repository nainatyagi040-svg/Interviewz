import { ArrowRight } from "lucide-react";
import Button from "../ui/Button.jsx";
import Reveal from "./Reveal.jsx";

const DISPLAY_FONT =
  "'aeonikPro', 'Inter', ui-sans-serif, system-ui, -apple-system, 'Segoe UI', sans-serif";

export default function FinalCTA() {
  return (
    <section className="scroll-mt-20">
      <div className="container-tight py-20 sm:py-28">
        <Reveal>
          <div
            className="relative overflow-hidden rounded-[24px] border border-[rgba(186,215,247,0.14)] px-8 py-14 text-center backdrop-blur-xl sm:px-16"
            style={{
              background: "rgba(5,6,15,0.72)",
              boxShadow:
                "inset 0 1px 1px rgba(216,236,248,0.16), inset 0 24px 48px rgba(168,216,245,0.05), 0 24px 60px rgba(6,6,14,0.6)",
            }}
          >
            {/* Ambient accent glow — twin Void Violet, single-accent discipline */}
            <div className="pointer-events-none absolute inset-0 opacity-70">
              <div
                className="absolute -left-10 -top-10 h-56 w-56 rounded-full blur-3xl"
                style={{ background: "rgba(102,58,243,0.28)" }}
              />
              <div
                className="absolute -bottom-16 right-0 h-64 w-64 rounded-full blur-3xl"
                style={{ background: "rgba(102,58,243,0.18)" }}
              />
            </div>

            {/* Top light-catching hairline */}
            <div
              className="pointer-events-none absolute inset-x-0 top-0 h-px"
              style={{
                background:
                  "linear-gradient(to right, transparent, rgba(216,236,248,0.25), transparent)",
              }}
            />

            <h2
              className="relative text-3xl font-medium tracking-tight text-[#d8ecf8] sm:text-4xl"
              style={{ fontFamily: DISPLAY_FONT }}
            >
              Ready to be interviewed?
            </h2>

            <p className="relative mx-auto mt-4 max-w-xl text-lg text-[#c7d3ea]">
              Pick a profile, answer honestly, and find out what a real
              interviewer would push on.
            </p>

            <div className="relative mt-8 flex justify-center">
              <Button as="link" to="/interview" size="lg">
                Start Your Interview
                <ArrowRight className="h-4 w-4" />
              </Button>
            </div>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
