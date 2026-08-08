import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { Repeat } from 'lucide-react';
import Button from '../ui/Button.jsx';
import { BRAND } from '../../lib/constants.js';

export default function Nav() {
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 8);
    onScroll();
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  return (
    <header
      className={`sticky top-0 z-50 transition-all ${
        scrolled ? 'border-b border-slate-200/70 bg-white/80 backdrop-blur' : 'bg-transparent'
      }`}
    >
      <nav className="container-tight flex h-16 items-center justify-between">
        <Link to="/" className="flex items-center gap-2 font-bold text-slate-900">
          <span className="flex h-8 w-8 items-center justify-center rounded-lg bg-brand-600 text-white">
            <Repeat className="h-4 w-4" />
          </span>
          <span className="text-lg tracking-tight">{BRAND.name}</span>
        </Link>

        <div className="flex items-center gap-2 sm:gap-4">
          <a
            href="#how-it-works"
            className="hidden rounded-lg px-3 py-2 text-sm font-medium text-slate-600 hover:text-slate-900 sm:block"
          >
            How it works
          </a>
          <a
            href="#features"
            className="hidden rounded-lg px-3 py-2 text-sm font-medium text-slate-600 hover:text-slate-900 sm:block"
          >
            Features
          </a>
          <Button as="link" to="/interview" size="sm">
            Start Interview
          </Button>
        </div>
      </nav>
    </header>
  );
}
