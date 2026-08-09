import { motion } from "framer-motion";

export default function AnimatedBackground() {
  return (
    <div className="pointer-events-none fixed inset-0 -z-20 overflow-hidden bg-[#050816]">
      {/* Aurora Blob 1 */}
      <motion.div
        className="absolute -top-72 -left-72 h-[850px] w-[850px] rounded-full bg-violet-500/30 blur-[180px]"
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

      {/* Aurora Blob 2 */}
      <motion.div
        className="absolute top-20 -right-72 h-[800px] w-[800px] rounded-full bg-cyan-500/25 blur-[180px]"
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

      {/* Aurora Blob 3 */}
      <motion.div
        className="absolute bottom-[-350px] left-1/4 h-[900px] w-[900px] rounded-full bg-fuchsia-500/20 blur-[200px]"
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

      {/* Extra Blue Glow */}
      <motion.div
        className="absolute left-1/2 top-1/2 h-[500px] w-[500px] -translate-x-1/2 -translate-y-1/2 rounded-full bg-sky-400/10 blur-[120px]"
        animate={{
          scale: [1, 1.4, 1],
        }}
        transition={{
          duration: 10,
          repeat: Infinity,
          ease: "easeInOut",
        }}
      />

      {/* Animated Grid */}
      <motion.div
        className="absolute inset-0 opacity-[0.05]"
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
            linear-gradient(rgba(255,255,255,.18) 1px, transparent 1px),
            linear-gradient(90deg, rgba(255,255,255,.18) 1px, transparent 1px)
          `,
          backgroundSize: "60px 60px",
        }}
      />

      {/* Noise Texture */}
      <div
        className="absolute inset-0 opacity-[0.03]"
        style={{
          backgroundImage:
            "radial-gradient(circle, white 1px, transparent 1px)",
          backgroundSize: "28px 28px",
        }}
      />

      {/* Vignette */}
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,transparent_15%,#050816_95%)]" />
    </div>
  );
}
