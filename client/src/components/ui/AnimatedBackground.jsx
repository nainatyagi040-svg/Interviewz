import { motion } from "framer-motion";

/*
 * Global page atmosphere. Follows the design system: Midnight Canvas base,
 * Void Violet as the single chromatic accent, with cool Blueprint/Frost washes
 * instead of the old cyan/fuchsia/amber aurora. Structure and motion timings
 * are unchanged — only the palette is brought on-brand.
 */
export default function AnimatedBackground() {
  return (
    <div className="pointer-events-none fixed inset-0 -z-20 overflow-hidden bg-[#05060f]">
      {/* Violet aurora — the primary accent glow */}
      <motion.div
        className="absolute -top-72 -left-72 h-[850px] w-[850px] rounded-full bg-[rgba(102,58,243,0.24)] blur-[180px]"
        animate={{
          x: [0, 150, 0],
          y: [0, 120, 0],
          scale: [1, 1.25, 1],
        }}
        transition={{
          duration: 18,
          repeat: Infinity,
          ease: "easeInOut",
        }}
      />

      {/* Blueprint-blue wash */}
      <motion.div
        className="absolute top-20 -right-72 h-[800px] w-[800px] rounded-full bg-[rgba(182,217,252,0.10)] blur-[180px]"
        animate={{
          x: [0, -140, 0],
          y: [0, 100, 0],
          scale: [1, 1.35, 1],
        }}
        transition={{
          duration: 22,
          repeat: Infinity,
          ease: "easeInOut",
        }}
      />

      {/* Deep violet undertone, slowly rotating */}
      <motion.div
        className="absolute bottom-[-350px] left-1/4 h-[900px] w-[900px] rounded-full bg-[rgba(102,58,243,0.14)] blur-[200px]"
        animate={{
          rotate: [0, 180, 360],
          scale: [1, 1.3, 1],
        }}
        transition={{
          duration: 28,
          repeat: Infinity,
          ease: "linear",
        }}
      />

      {/* Frost highlight breathing at center */}
      <motion.div
        className="absolute left-1/2 top-1/2 h-[500px] w-[500px] -translate-x-1/2 -translate-y-1/2 rounded-full bg-[rgba(209,228,250,0.06)] blur-[120px]"
        animate={{
          scale: [1, 1.4, 1],
        }}
        transition={{
          duration: 10,
          repeat: Infinity,
          ease: "easeInOut",
        }}
      />

      {/* Animated blueprint grid — Gridline Blue */}
      <motion.div
        className="absolute inset-0 opacity-[0.06]"
        animate={{
          backgroundPosition: ["0px 0px", "60px 60px"],
        }}
        transition={{
          duration: 20,
          repeat: Infinity,
          ease: "linear",
        }}
        style={{
          backgroundImage: `
            linear-gradient(rgba(63,73,89,0.6) 1px, transparent 1px),
            linear-gradient(90deg, rgba(63,73,89,0.6) 1px, transparent 1px)
          `,
          backgroundSize: "60px 60px",
        }}
      />

      {/* Noise Texture */}
      <div
        className="absolute inset-0 opacity-[0.03]"
        style={{
          backgroundImage:
            "radial-gradient(circle, rgba(216,236,248,0.9) 1px, transparent 1px)",
          backgroundSize: "28px 28px",
        }}
      />

      {/* Vignette into the canvas */}
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,transparent_15%,#05060f_95%)]" />
    </div>
  );
}
