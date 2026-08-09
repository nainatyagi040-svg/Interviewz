import { motion } from 'framer-motion';
import { Sparkles } from 'lucide-react';

/*
 * Breathing, glowing AI orb — the visual anchor of the hero.
 * Design-system palette: Void Violet accent with Frost / Blueprint / Ice cool
 * tones. Structure and motion timings are unchanged from the original.
 */
export default function AIOrb({ size = 220 }) {
  return (
    <div className="relative flex items-center justify-center" style={{ width: size, height: size }}>
      {/* Outer breathing glow — violet core fading into frost */}
      <motion.div
        className="absolute rounded-full blur-2xl"
        style={{
          width: size,
          height: size,
          background:
            'radial-gradient(closest-side, rgba(102,58,243,0.55), rgba(182,217,252,0.20), transparent)',
        }}
        animate={{ scale: [1, 1.15, 1], opacity: [0.5, 0.8, 0.5] }}
        transition={{ duration: 4, repeat: Infinity, ease: 'easeInOut' }}
      />

      {/* Rotating rings */}
      <motion.div
        className="absolute rounded-full border-2 border-[rgba(182,217,252,0.35)]"
        style={{ width: size * 0.85, height: size * 0.85 }}
        animate={{ rotate: 360 }}
        transition={{ duration: 14, repeat: Infinity, ease: 'linear' }}
      />
      <motion.div
        className="absolute rounded-full border border-dashed border-[rgba(102,58,243,0.35)]"
        style={{ width: size * 1.05, height: size * 1.05 }}
        animate={{ rotate: -360 }}
        transition={{ duration: 20, repeat: Infinity, ease: 'linear' }}
      />

      {/* Orbiting particles */}
      {[0, 120, 240].map((deg, i) => (
        <motion.div
          key={i}
          className="absolute h-2.5 w-2.5 rounded-full"
          style={{
            width: size * 0.95,
            height: size * 0.95,
            background: '#d8ecf8',
            boxShadow: '0 0 12px 4px rgba(102,58,243,0.6)',
          }}
          animate={{ rotate: 360 }}
          transition={{ duration: 8 + i * 2, repeat: Infinity, ease: 'linear', delay: i * 0.3 }}
        >
          <span
            className="absolute h-2.5 w-2.5 rounded-full"
            style={{
              top: 0,
              left: '50%',
              transform: `translateX(-50%) rotate(${deg}deg)`,
              background: '#d8ecf8',
              boxShadow: '0 0 12px 4px rgba(182,217,252,0.6)',
            }}
          />
        </motion.div>
      ))}

      {/* Core */}
      <motion.div
        className="relative z-10 flex items-center justify-center rounded-full"
        style={{
          width: size * 0.45,
          height: size * 0.45,
          background: 'linear-gradient(135deg, #ffffff 0%, #d8ecf8 60%, #b6d9fc 100%)',
          boxShadow: '0 0 40px rgba(102,58,243,0.45), inset 0 1px 2px rgba(255,255,255,0.6)',
        }}
        animate={{ scale: [1, 1.06, 1] }}
        transition={{ duration: 3, repeat: Infinity, ease: 'easeInOut' }}
      >
        <Sparkles className="h-1/3 w-1/3" style={{ color: '#663af3' }} />
      </motion.div>
    </div>
  );
}
