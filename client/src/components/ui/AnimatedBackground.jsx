import { motion } from "framer-motion";

export default function AnimatedBackground() {
  return (
    <div className="pointer-events-none fixed inset-0 -z-10 overflow-hidden bg-slate-50">
      <motion.div
        className="absolute -top-20 -left-20 h-[28rem] w-[28rem] rounded-full bg-brand-400/50 blur-3xl"
        animate={{ x: [0, 100, 0], y: [0, 60, 0], scale: [1, 1.3, 1] }}
        transition={{ duration: 10, repeat: Infinity, ease: "easeInOut" }}
      />
      <motion.div
        className="absolute top-1/4 -right-32 h-[24rem] w-[24rem] rounded-full bg-fuchsia-400/45 blur-3xl"
        animate={{ x: [0, -80, 0], y: [0, 90, 0], scale: [1, 1.35, 1] }}
        transition={{ duration: 13, repeat: Infinity, ease: "easeInOut" }}
      />
      <motion.div
        className="absolute bottom-0 left-1/3 h-[26rem] w-[26rem] rounded-full bg-amber-300/45 blur-3xl"
        animate={{ x: [0, 70, 0], y: [0, -60, 0], scale: [1, 1.25, 1] }}
        transition={{ duration: 11, repeat: Infinity, ease: "easeInOut" }}
      />
      <motion.div
        className="absolute top-1/2 left-1/2 h-[20rem] w-[20rem] -translate-x-1/2 -translate-y-1/2 rounded-full bg-sky-300/40 blur-3xl"
        animate={{ scale: [1, 1.4, 1], rotate: [0, 90, 0] }}
        transition={{ duration: 15, repeat: Infinity, ease: "easeInOut" }}
      />
    </div>
  );
}
