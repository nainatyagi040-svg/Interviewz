import { motion } from 'framer-motion';
import { Sparkles, ArrowRight, Repeat } from 'lucide-react';
import Button from '../ui/Button.jsx';

/** A mocked interview snippet — gives the hero visual weight without real data. */
function InterviewMock() {
  const lines = [
    { role: 'interviewer', text: 'On Day 19 you built a RAG pipeline. Walk me through how you handled retrieval when a query matched nothing well.' },
    { role: 'candidate', text: 'I added a score threshold and fell back to a clarifying question instead of answering from weak context.' },
    { role: 'interviewer', text: 'Good instinct. What score did you pick, and how did you validate it wasn’t too aggressive?' },
  ];
  return (
    <div className="relative">
      <div className="absolute -inset-6 -z-10 rounded-[2rem] bg-gradient-to-tr from-brand-200/50 via-indigo-100/40 to-transparent blur-2xl" />
      <div className="rounded-2xl border border-slate-200/80 bg-white/90 p-4 shadow-lift backdrop-blur sm:p-5">
        <div className="mb-4 flex items-center gap-2 border-b border-slate-100 pb-3">
          <span className="flex h-7 w-7 items-center justify-center rounded-lg bg-brand-600 text-white">
            <Repeat className="h-3.5 w-3.5" />
          </span>
          <span className="text-sm font-semibold text-slate-800">Live interview</span>
          <span className="ml-auto flex items-center gap-1.5 text-xs font-medium text-emerald-600">
            <span className="h-1.5 w-1.5 rounded-full bg-emerald-500" /> in progress
          </span>
        </div>
        <div className="space-y-3">
          {lines.map((l, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 8 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.4 + i * 0.35, duration: 0.4 }}
              className={l.role === 'candidate' ? 'flex justify-end' : 'flex justify-start'}
            >
              <div
                className={`max-w-[85%] rounded-2xl px-3.5 py-2.5 text-sm leading-relaxed ${
                  l.role === 'candidate'
                    ? 'rounded-br-md bg-brand-600 text-white'
                    : 'rounded-bl-md bg-slate-100 text-slate-700'
                }`}
              >
                {l.text}
              </div>
            </motion.div>
          ))}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 1.6 }}
            className="flex items-center gap-1 pl-1"
          >
            <span className="typing-dot" />
            <span className="typing-dot" />
            <span className="typing-dot" />
          </motion.div>
        </div>
      </div>
    </div>
  );
}

export default function Hero() {
  return (
    <section className="relative overflow-hidden">
      {/* soft background wash */}
      <div className="pointer-events-none absolute inset-0 -z-10">
        <div className="absolute left-1/2 top-[-10%] h-[420px] w-[720px] -translate-x-1/2 rounded-full bg-brand-100/60 blur-3xl" />
      </div>

      <div className="container-tight grid grid-cols-1 items-center gap-12 py-16 sm:py-24 lg:grid-cols-2 lg:gap-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, ease: 'easeOut' }}
        >
          <span className="inline-flex items-center gap-2 rounded-full border border-brand-200 bg-brand-50 px-3 py-1 text-xs font-medium text-brand-700">
            <Sparkles className="h-3.5 w-3.5" />
            Grounded in your real cohort progress
          </span>

          <h1 className="mt-5 text-4xl font-extrabold leading-[1.08] tracking-tight text-slate-900 sm:text-5xl lg:text-6xl">
            The AI interviewer that <span className="text-gradient">actually knows</span> what you
            learned
          </h1>

          <p className="mt-5 max-w-xl text-lg leading-relaxed text-slate-600">
            Loop reads your 31-day AI engineering journey and runs a live, adaptive technical
            interview — real follow-ups, not a quiz — then hands you structured, honest feedback.
          </p>

          <div className="mt-8 flex flex-col gap-3 sm:flex-row">
            <Button as="link" to="/interview" size="lg">
              Start Your Interview
              <ArrowRight className="h-4 w-4" />
            </Button>
            <Button as="a" href="#how-it-works" variant="secondary" size="lg">
              See how it works
            </Button>
          </div>

          <p className="mt-4 text-sm text-slate-400">
            No account needed · Takes about 10 minutes
          </p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, scale: 0.96 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.7, ease: 'easeOut', delay: 0.15 }}
        >
          <InterviewMock />
        </motion.div>
      </div>
    </section>
  );
}
