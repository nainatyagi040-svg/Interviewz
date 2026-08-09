/*
 * Badge — design-system tag. Default look uses Luminous Fill surface, a Glass
 * Edge hairline, and Frost Glow text. `className` is appended last so callers
 * can still override any default.
 */
export default function Badge({ className = '', children }) {
  return (
    <span
      className={`inline-flex items-center gap-1.5 rounded-full border border-[rgba(186,215,247,0.16)] bg-[rgba(199,211,234,0.08)] px-3 py-1 text-xs font-medium text-[#d1e4fa] shadow-[inset_0_1px_0_rgba(216,236,248,0.12)] backdrop-blur-md ${className}`}
    >
      {children}
    </span>
  );
}
