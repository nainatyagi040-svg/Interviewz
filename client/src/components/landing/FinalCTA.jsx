import { ArrowRight } from 'lucide-react';
import Button from '../ui/Button.jsx';
import Reveal from './Reveal.jsx';

export default function FinalCTA() {
  return (
    <section className="scroll-mt-20">
      <div className="container-tight py-20 sm:py-28">
        <Reveal>
          <div className="relative overflow-hidden rounded-3xl bg-brand-600 px-8 py-14 text-center shadow-lift sm:px-16">
            <div className="pointer-events-none absolute inset-0 opacity-20">
              <div className="absolute -left-10 -top-10 h-56 w-56 rounded-full bg-white blur-2xl" />
              <div className="absolute -bottom-16 right-0 h-64 w-64 rounded-full bg-indigo-300 blur-2xl" />
            </div>
            <h2 className="relative text-3xl font-bold tracking-tight text-white sm:text-4xl">
              Ready to be interviewed?
            </h2>
            <p className="relative mx-auto mt-4 max-w-xl text-lg text-brand-100">
              Pick a profile, answer honestly, and find out what a real interviewer would push on.
            </p>
            <div className="relative mt-8 flex justify-center">
              <Button
                as="link"
                to="/interview"
                size="lg"
                className="bg-white text-brand-700 hover:bg-brand-50"
              >
                Start Your Interview
                <ArrowRight className="h-4 w-4" />
              </Button>
            </div>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
