import { Repeat, Github } from 'lucide-react';
import { BRAND } from '../../lib/constants.js';

export default function Footer() {
  return (
    <footer className="relative border-t border-[rgba(186,215,247,0.10)]">
      {/* Top light-catching hairline */}
      <div
        className="pointer-events-none absolute inset-x-0 top-0 h-px"
        style={{
          background:
            "linear-gradient(to right, transparent, rgba(216,236,248,0.18), transparent)",
        }}
      />

      <div className="container-tight flex flex-col items-center justify-between gap-4 py-8 sm:flex-row">
        <div className="flex items-center gap-2 text-[#d1e4fa]">
          <span
            className="flex h-7 w-7 items-center justify-center rounded-lg text-white"
            style={{
              background: "#663af3",
              boxShadow:
                "inset 0 1px 0 rgba(255,255,255,0.2), 0 0 18px rgba(102,58,243,0.45)",
            }}
          >
            <Repeat className="h-3.5 w-3.5" />
          </span>
          <span className="font-semibold">{BRAND.name}</span>
        </div>
        <p className="text-center text-sm text-[#9da7ba]">
          Built for the AI Interview Agent challenge · {BRAND.tagline}
        </p>
        <a
          href={BRAND.repoUrl}
          target="_blank"
          rel="noreferrer"
          aria-label="View the source on GitHub"
          className="flex h-9 w-9 items-center justify-center rounded-lg text-[#9da7ba] transition-colors duration-300 hover:bg-[rgba(199,211,234,0.08)] hover:text-[#d8ecf8]"
        >
          <Github className="h-5 w-5" />
        </a>
      </div>
    </footer>
  );
}
