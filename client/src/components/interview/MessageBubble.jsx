import { motion } from 'framer-motion';
import { Repeat, User } from 'lucide-react';

export default function MessageBubble({ role, content }) {
  const isCandidate = role === 'candidate';

  return (
    <motion.div
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.35, ease: 'easeOut' }}
      className={`flex items-end gap-2.5 ${isCandidate ? 'flex-row-reverse' : 'flex-row'}`}
    >
      <div
        className={`flex h-8 w-8 shrink-0 items-center justify-center rounded-full ${
          isCandidate ? 'bg-slate-200 text-slate-600' : 'bg-brand-600 text-white'
        }`}
      >
        {isCandidate ? <User className="h-4 w-4" /> : <Repeat className="h-4 w-4" />}
      </div>
      <div
        className={`max-w-[80%] whitespace-pre-wrap rounded-2xl px-4 py-3 text-[15px] leading-relaxed sm:max-w-[70%] ${
          isCandidate
            ? 'rounded-br-md bg-brand-600 text-white'
            : 'rounded-bl-md bg-white text-slate-800 shadow-soft ring-1 ring-slate-100'
        }`}
      >
        {content}
      </div>
    </motion.div>
  );
}
