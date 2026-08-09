import { useEffect, useRef } from "react";

/** A soft light that follows the cursor within its parent (parent needs `relative`). */
export default function MouseSpotlight() {
  const ref = useRef(null);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const parent = el.parentElement;
    if (!parent) return;

    const onMove = (e) => {
      const rect = parent.getBoundingClientRect();
      const x = e.clientX - rect.left;
      const y = e.clientY - rect.top;
      el.style.background = `radial-gradient(600px circle at ${x}px ${y}px, rgba(99,102,241,0.15), transparent 40%)`;
    };

    parent.addEventListener("mousemove", onMove);
    return () => parent.removeEventListener("mousemove", onMove);
  }, []);

  return (
    <div
      ref={ref}
      className="pointer-events-none absolute inset-0 z-10 transition-opacity"
    />
  );
}
