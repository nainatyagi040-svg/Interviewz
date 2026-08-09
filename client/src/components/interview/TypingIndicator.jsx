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
        className="flex h-10 w-10 items-center justify-center rounded-full text-white"
        style={{
          background: "#663af3",
          boxShadow:
            "inset 0 1px 0 rgba(255,255,255,0.22), 0 0 22px rgba(102,58,243,0.50)",
        }}
      >
        <Repeat className="h-5 w-5" />
      </motion.div>

      <div
        className="rounded-2xl rounded-bl-md px-5 py-4 backdrop-blur-xl"
        style={{
          background: "rgba(199,211,234,0.05)",
          border: "1px solid rgba(186,215,247,0.12)",
          boxShadow:
            "inset 0 1px 1px rgba(216,236,248,0.14), 0 14px 34px rgba(6,6,14,0.45)",
        }}
      >
        <div className="mb-2 text-xs font-medium tracking-wide text-[#9da7ba]">
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
