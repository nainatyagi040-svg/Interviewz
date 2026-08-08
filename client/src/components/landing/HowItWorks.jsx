import { BookOpen, MessagesSquare, ClipboardCheck } from 'lucide-react';
import Reveal from './Reveal.jsx';

const steps = [
  {
    icon: BookOpen,
    title: 'We read your learning journey',
    body: 'Loop cross-references your missions against the curriculum — what you aced, what you struggled with, what you skipped.',
  },
  {
    icon: MessagesSquare,
    title: 'You get a live, adaptive interview',
    body: 'A senior-style interviewer asks real questions and follows up on your actual answers, going deeper where it matters.',
  },
  {
    icon: ClipboardCheck,
    title: 'You get structured feedback',
    body: 'At the end, a clear breakdown of strengths, gaps, and concrete next steps — grounded in the whole conversation.',
  },
];

export default function HowItWorks() {
  return (
    <section id="how-it-works" className="scroll-mt-20">
      <div className="container-tight py-20 sm:py-28">
        <Reveal className="mx-auto max-w-2xl text-center">
          <h2 className="text-3xl font-bold tracking-tight text-slate-900 sm:text-4xl">
            How it works
          </h2>
          <p className="mt-4 text-lg text-slate-600">
            Three steps from your cohort history to interview-ready.
          </p>
        </Reveal>

        <div className="mt-14 grid gap-6 md:grid-cols-3">
          {steps.map((s, i) => (
            <Reveal key={s.title} delay={i * 0.1}>
              <div className="relative h-full rounded-2xl border border-slate-200/80 bg-white p-7 shadow-soft">
                <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-brand-50 text-brand-600">
                  <s.icon className="h-5 w-5" />
                </div>
                <div className="mt-5 flex items-center gap-2">
                  <span className="text-sm font-bold text-brand-600">Step {i + 1}</span>
                </div>
                <h3 className="mt-1 text-lg font-semibold text-slate-900">{s.title}</h3>
                <p className="mt-2 text-sm leading-relaxed text-slate-600">{s.body}</p>
              </div>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
