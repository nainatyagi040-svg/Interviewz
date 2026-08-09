/*
 * Card — design-system frosted-glass surface (Surface level 2). Uses the 16px
 * card radius, a translucent Frosted Glass fill, a Glass Edge hairline, and the
 * cool-tinted card shadow stack. `className` is appended last so callers can
 * override any default; `...props` is forwarded unchanged.
 */
export default function Card({ className = '', children, ...props }) {
  return (
    <div
      className={`rounded-[16px] border border-[rgba(186,215,247,0.12)] bg-[rgba(199,211,234,0.05)] shadow-[inset_0_1px_1px_rgba(216,236,248,0.18),inset_0_24px_48px_rgba(168,216,245,0.05),0_16px_40px_rgba(6,6,14,0.45)] backdrop-blur-xl ${className}`}
      {...props}
    >
      {children}
    </div>
  );
}
