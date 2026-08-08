import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { ArrowLeft, Briefcase, GraduationCap, Flame, CheckCircle2, ArrowRight } from 'lucide-react';
import candidatesData from '../../data/candidates.json';

/** Pull a resilient list regardless of minor shape differences. */
function getCandidates() {
  const list = candidatesData?.candidates;
  return Array.isArray(list) ? list : [];
}

function CandidateCard({ entry, onSelect, index }) {
  const m = entry?.member ?? {};
  const signals = entry?.signals ?? {};
  const missions = Array.isArray(entry?.missions) ? entry.missions : [];
  const passed = missions.filter((x) => x?.passed).length;

  return (
    <motion.button
      type="button"
      onClick={() => onSelect(entry)}
      initial={{ opacity: 0, y: 16 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4, delay: index * 0.06 }}
      className="group flex h-full flex-col rounded-2xl border border-slate-200/80 bg-white p-6 text-left shadow-soft transition hover:-translate-y-0.5 hover:border-brand-300 hover:shadow-lift focus:outline-none focus-visible:ring-2 focus-visible:ring-brand-400"
    >
      <div className="flex items-start justify-between">
        <div className="flex h-12 w-12 items-center justify-center rounded-full bg-brand-100 text-lg font-bold text-brand-700">
          {(m.name ?? '?').slice(0, 1)}
        </div>
        {m.status && (
          <span
            className={`rounded-full px-2.5 py-1 text-xs font-medium ${
              m.status === 'COMPLETED'
                ? 'bg-emerald-50 text-emerald-700'
                : 'bg-amber-50 text-amber-700'
            }`}
          >
            {m.status === 'COMPLETED' ? 'Completed' : 'In progress'}
          </span>
        )}
      </div>

      <h3 className="mt-4 text-lg font-semibold text-slate-900">{m.name ?? 'Unnamed candidate'}</h3>

      <div className="mt-3 space-y-1.5 text-sm text-slate-600">
        {m.jobRole && (
          <div className="flex items-center gap-2">
            <Briefcase className="h-4 w-4 text-slate-400" />
            <span>{m.jobRole}</span>
            {typeof m.yearsExperience === 'number' && (
              <span className="text-slate-400">· {m.yearsExperience}y</span>
            )}
          </div>
        )}
        {m.education && (
          <div className="flex items-center gap-2">
            <GraduationCap className="h-4 w-4 text-slate-400" />
            <span>{m.education}</span>
          </div>
        )}
      </div>

      <div className="mt-4 flex flex-wrap gap-2 border-t border-slate-100 pt-4 text-xs">
        {typeof signals.commitDays === 'number' && (
          <span className="inline-flex items-center gap-1 rounded-md bg-slate-100 px-2 py-1 text-slate-600">
            <Flame className="h-3.5 w-3.5 text-orange-500" /> {signals.commitDays} active days
          </span>
        )}
        <span className="inline-flex items-center gap-1 rounded-md bg-slate-100 px-2 py-1 text-slate-600">
          <CheckCircle2 className="h-3.5 w-3.5 text-emerald-500" /> {passed} missions shown
        </span>
      </div>

      <div className="mt-5 flex items-center gap-1.5 text-sm font-medium text-brand-600">
        Interview {m.name?.split(' ')[0] ?? 'this candidate'}
        <ArrowRight className="h-4 w-4 transition group-hover:translate-x-0.5" />
      </div>
    </motion.button>
  );
}

export default function CandidatePicker({ onSelect }) {
  const candidates = getCandidates();

  return (
    <div className="container-tight py-10 sm:py-14">
      <Link
        to="/"
        className="inline-flex items-center gap-1.5 text-sm font-medium text-slate-500 hover:text-slate-900"
      >
        <ArrowLeft className="h-4 w-4" /> Back to home
      </Link>

      <div className="mt-6 max-w-2xl">
        <h1 className="text-3xl font-bold tracking-tight text-slate-900 sm:text-4xl">
          Choose a candidate to interview
        </h1>
        <p className="mt-3 text-lg text-slate-600">
          Each profile carries a real learning history. Loop tailors the interview to what that
          person actually did in the cohort.
        </p>
      </div>

      {candidates.length === 0 ? (
        <div className="mt-10 rounded-2xl border border-dashed border-slate-300 p-10 text-center text-slate-500">
          No candidate data found. Add profiles to{' '}
          <code className="rounded bg-slate-100 px-1.5 py-0.5 text-sm">
            src/data/candidates.json
          </code>
          .
        </div>
      ) : (
        <div className="mt-8 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {candidates.map((entry, i) => (
            <CandidateCard
              key={entry?.member?.id ?? i}
              entry={entry}
              index={i}
              onSelect={onSelect}
            />
          ))}
        </div>
      )}
    </div>
  );
}
