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
        className={`flex h-10 w-10 shrink-0 items-center justify-center rounded-full shadow-lg ${
          isCandidate
            ? "bg-gradient-to-br from-slate-700 to-slate-900 text-white"
            : "bg-gradient-to-br from-indigo-500 via-violet-500 to-cyan-500 text-white"
        }`}
      >
        {isCandidate ? (
          <User className="h-5 w-5" />
        ) : (
          <Repeat className="h-5 w-5" />
        )}
      </motion.div>

      <motion.div
        whileHover={{ y: -2 }}
        className={`relative max-w-[82%] overflow-hidden rounded-2xl px-5 py-4 text-[15px] leading-7 shadow-xl backdrop-blur-xl sm:max-w-[72%] ${
          isCandidate
            ? "rounded-br-md border border-indigo-500/30 bg-gradient-to-br from-indigo-600 via-violet-600 to-cyan-500 text-white"
            : "rounded-bl-md border border-white/10 bg-white/5 text-slate-100"
        }`}
      >
        {!isCandidate && (
          <div className="absolute inset-0 bg-gradient-to-r from-white/5 to-transparent" />
        )}

        <div className="relative whitespace-pre-wrap">{content}</div>
      </motion.div>
    </motion.div>
  );
}
