import { Quote } from 'lucide-react';
import Reveal from './Reveal.jsx';

export default function Callout() {
  return (
    <section className="scroll-mt-20">
      <div className="container-tight py-20 sm:py-28">
        <Reveal className="mx-auto max-w-3xl">
          <div className="relative rounded-3xl border border-brand-100 bg-gradient-to-br from-brand-50 to-white p-8 text-center shadow-soft sm:p-12">
            <Quote className="mx-auto h-8 w-8 text-brand-400" />
            <p className="mt-5 text-2xl font-semibold leading-snug tracking-tight text-slate-900 sm:text-3xl">
              Finishing the curriculum is the easy part. The gap that costs people offers is being
              able to <span className="text-gradient">explain what they built</span> — out loud,
              under pressure.
            </p>
            <p className="mt-6 text-sm font-medium text-slate-500">
              Loop closes that gap before the real interview does.
            </p>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
