import { motion } from "framer-motion";
import { Repeat, User } from "lucide-react";

export default function MessageBubble({ role, content }) {
  const isCandidate = role === "candidate";

  return (
    <motion.div
      initial={{ opacity: 0, y: 20, scale: 0.98 }}
      animate={{ opacity: 1, y: 0, scale: 1 }}
      transition={{
        duration: 0.45,
        ease: [0.22, 1, 0.36, 1],
      }}
      className={`flex items-end gap-3 ${
        isCandidate ? "flex-row-reverse" : "flex-row"
      }`}
    >
      <motion.div
        whileHover={{ scale: 1.08 }}
        className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full text-white"
        style={
          isCandidate
            ? {
                background: "rgba(199,211,234,0.08)",
                border: "1px solid rgba(186,215,247,0.20)",
                boxShadow:
                  "inset 0 1px 0 rgba(216,236,248,0.16), 0 10px 24px rgba(6,6,14,0.5)",
              }
            : {
                background: "#663af3",
                boxShadow:
                  "inset 0 1px 0 rgba(255,255,255,0.22), 0 0 22px rgba(102,58,243,0.50)",
              }
        }
      >
        {isCandidate ? (
          <User className="h-5 w-5 text-[#d1e4fa]" />
        ) : (
          <Repeat className="h-5 w-5" />
        )}
      </motion.div>

      <motion.div
        whileHover={{ y: -2 }}
        className={`relative max-w-[82%] overflow-hidden rounded-2xl px-5 py-4 text-[15px] leading-7 backdrop-blur-xl sm:max-w-[72%] ${
          isCandidate ? "rounded-br-md text-white" : "rounded-bl-md text-[#d8ecf8]"
        }`}
        style={
          isCandidate
            ? {
                background: "#663af3",
                border: "1px solid rgba(102,58,243,0.45)",
                boxShadow:
                  "inset 0 1px 0 rgba(255,255,255,0.18), 0 14px 34px rgba(102,58,243,0.35)",
              }
            : {
                background: "rgba(199,211,234,0.05)",
                border: "1px solid rgba(186,215,247,0.12)",
                boxShadow:
                  "inset 0 1px 1px rgba(216,236,248,0.14), 0 14px 34px rgba(6,6,14,0.45)",
              }
        }
      >
        {!isCandidate && (
          <div
            className="pointer-events-none absolute inset-0"
            style={{
              background:
                "linear-gradient(to right, rgba(216,236,248,0.06), transparent)",
            }}
          />
        )}

        <div className="relative whitespace-pre-wrap">{content}</div>
      </motion.div>
    </motion.div>
  );
}
