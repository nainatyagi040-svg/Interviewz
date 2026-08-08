import { Repeat, Github } from 'lucide-react';
import { BRAND } from '../../lib/constants.js';

export default function Footer() {
  return (
    <footer className="border-t border-slate-200/70">
      <div className="container-tight flex flex-col items-center justify-between gap-4 py-8 sm:flex-row">
        <div className="flex items-center gap-2 text-slate-700">
          <span className="flex h-7 w-7 items-center justify-center rounded-lg bg-brand-600 text-white">
            <Repeat className="h-3.5 w-3.5" />
          </span>
          <span className="font-semibold">{BRAND.name}</span>
        </div>
        <p className="text-center text-sm text-slate-400">
          Built for the AI Interview Agent challenge · {BRAND.tagline}
        </p>
        <a
          href={BRAND.repoUrl}
          target="_blank"
          rel="noreferrer"
          aria-label="View the source on GitHub"
          className="flex h-9 w-9 items-center justify-center rounded-lg text-slate-500 transition hover:bg-slate-100 hover:text-slate-900"
        >
          <Github className="h-5 w-5" />
        </a>
      </div>
    </footer>
  );
}
