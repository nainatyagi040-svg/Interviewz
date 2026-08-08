export default function Card({ className = '', children, ...props }) {
  return (
    <div
      className={`rounded-2xl border border-slate-200/80 bg-white shadow-soft ${className}`}
      {...props}
    >
      {children}
    </div>
  );
}
