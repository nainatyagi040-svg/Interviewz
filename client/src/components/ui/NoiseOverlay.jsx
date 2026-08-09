/** Subtle film-grain noise for a premium, non-flat feel. Pure CSS, no image asset needed. */
export default function NoiseOverlay() {
  return (
    <svg className="pointer-events-none fixed inset-0 -z-[5] h-full w-full opacity-[0.035]">
      <filter id="noiseFilter">
        <feTurbulence
          type="fractalNoise"
          baseFrequency="0.8"
          numOctaves="3"
          stitchTiles="stitch"
        />
      </filter>
      <rect width="100%" height="100%" filter="url(#noiseFilter)" />
    </svg>
  );
}
