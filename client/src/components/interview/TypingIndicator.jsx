import { Repeat } from "lucide-react";
import { motion } from "framer-motion";

export default function TypingIndicator() {
  return (
    <div className="flex items-end gap-3">
      <motion.div
        animate={{
          rotate: [0, 360],
        }}
        transition={{
          duration: 6,
          repeat: Infinity,
          ease: "linear",
        }}
        className="flex h-10 w-10 items-center justify-center rounded-full bg-gradient-to-br from-indigo-500 via-violet-500 to-cyan-500 text-white shadow-lg"
      >
        <Repeat className="h-5 w-5" />
      </motion.div>

      <div className="rounded-2xl rounded-bl-md border border-white/10 bg-white/5 px-5 py-4 backdrop-blur-xl">
        <div className="mb-2 text-xs font-medium tracking-wide text-slate-400">
          AI is thinking...
        </div>

        <div className="flex gap-2">
          <span className="typing-dot" />
          <span className="typing-dot" />
          <span className="typing-dot" />
        </div>
      </div>
    </div>
  );
}
