/** Faint animated grid with a radial fade — premium SaaS background texture. */
export default function GlowGrid() {
  return (
    <div
      className="pointer-events-none absolute inset-0 -z-10 opacity-[0.35]"
      style={{
        backgroundImage:
          "linear-gradient(to right, rgba(99,102,241,0.15) 1px, transparent 1px), linear-gradient(to bottom, rgba(99,102,241,0.15) 1px, transparent 1px)",
        backgroundSize: "48px 48px",
        maskImage:
          "radial-gradient(ellipse 80% 60% at 50% 20%, black 40%, transparent 100%)",
        WebkitMaskImage:
          "radial-gradient(ellipse 80% 60% at 50% 20%, black 40%, transparent 100%)",
      }}
    />
  );
}
