/** Faint animated grid with a radial fade — premium SaaS background texture.
 *  Grid lines use Gridline Blue (#3f4959), the design-system structural-line token. */
export default function GlowGrid() {
  return (
    <div
      className="pointer-events-none absolute inset-0 -z-10 opacity-[0.35]"
      style={{
        backgroundImage:
          "linear-gradient(to right, rgba(63,73,89,0.5) 1px, transparent 1px), linear-gradient(to bottom, rgba(63,73,89,0.5) 1px, transparent 1px)",
        backgroundSize: "48px 48px",
        maskImage:
          "radial-gradient(ellipse 80% 60% at 50% 20%, black 40%, transparent 100%)",
        WebkitMaskImage:
          "radial-gradient(ellipse 80% 60% at 50% 20%, black 40%, transparent 100%)",
      }}
    />
  );
}
