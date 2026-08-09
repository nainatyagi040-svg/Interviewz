import { motion } from 'framer-motion';
import { Sparkles } from 'lucide-react';

/** Breathing, glowing AI orb — the visual anchor of the hero. */
export default function AIOrb({ size = 220 }) {
  return (
    <div className="relative flex items-center justify-center" style={{ width: size, height: size }}>
      {/* Outer breathing glow */}
      <motion.div
        className="absolute rounded-full bg-gradient-to-br from-brand-400 via-fuchsia-400 to-amber-300 blur-2xl"
        style={{ width: size, height: size }}
        animate={{ scale: [1, 1.15, 1], opacity: [0.5, 0.8, 0.5] }}
        transition={{ duration: 4, repeat: Infinity, ease: 'easeInOut' }}
      />

      {/* Rotating rings */}
      <motion.div
        className="absolute rounded-full border-2 border-brand-300/40"
        style={{ width: size * 0.85, height: size * 0.85 }}
        animate={{ rotate: 360 }}
        transition={{ duration: 14, repeat: Infinity, ease: 'linear' }}
      />
      <motion.div
        className="absolute rounded-full border border-fuchsia-300/30 border-dashed"
        style={{ width: size * 1.05, height: size * 1.05 }}
        animate={{ rotate: -360 }}
        transition={{ duration: 20, repeat: Infinity, ease: 'linear' }}
      />

      {/* Orbiting particles */}
      {[0, 120, 240].map((deg, i) => (
        <motion.div
          key={i}
          className="absolute h-2.5 w-2.5 rounded-full bg-white shadow-[0_0_12px_4px_rgba(99,102,241,0.6)]"
          style={{ width: size * 0.95, height: size * 0.95 }}
          animate={{ rotate: 360 }}
          transition={{ duration: 8 + i * 2, repeat: Infinity, ease: 'linear', delay: i * 0.3 }}
        >
          <span
            className="absolute h-2.5 w-2.5 rounded-full bg-white shadow-[0_0_12px_4px_rgba(217,70,239,0.6)]"
            style={{ top: 0, left: '50%', transform: `translateX(-50%) rotate(${deg}deg)` }}
          />
        </motion.div>
      ))}

      {/* Core */}
      <motion.div
        className="relative z-10 flex items-center justify-center rounded-full bg-gradient-to-br from-white to-brand-50 shadow-2xl"
        style={{ width: size * 0.45, height: size * 0.45 }}
        animate={{ scale: [1, 1.06, 1] }}
        transition={{ duration: 3, repeat: Infinity, ease: 'easeInOut' }}
      >
        <Sparkles className="h-1/3 w-1/3 text-brand-600" />
      </motion.div>
    </div>
  );
}