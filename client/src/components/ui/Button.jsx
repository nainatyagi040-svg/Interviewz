import { Link } from "react-router-dom";
import { motion } from "framer-motion";

const MotionLink = motion(Link);
const MotionButton = motion.button;
const MotionAnchor = motion.a;

const base =
  "relative inline-flex items-center justify-center gap-2 overflow-hidden rounded-xl font-semibold transition-all duration-300 focus:outline-none focus-visible:ring-2 focus-visible:ring-indigo-400 focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-60";

const variants = {
  primary:
    "bg-gradient-to-r from-indigo-600 via-violet-600 to-cyan-500 text-white shadow-xl shadow-indigo-500/30 hover:shadow-indigo-500/50",

  secondary:
    "border border-white/10 bg-white/5 text-slate-100 backdrop-blur-xl hover:bg-white/10",

  ghost: "text-slate-300 hover:bg-white/5 hover:text-white",
};

const sizes = {
  sm: "px-4 py-2 text-sm",
  md: "px-5 py-2.5 text-sm",
  lg: "px-7 py-3 text-base",
};

const hoverAnimation = {
  whileHover: {
    y: -2,
    scale: 1.03,
  },
  whileTap: {
    scale: 0.97,
  },
  transition: {
    type: "spring",
    stiffness: 350,
    damping: 18,
  },
};

export default function Button({
  as = "button",
  to,
  href,
  variant = "primary",
  size = "md",
  className = "",
  children,
  ...props
}) {
  const classes = `${base} ${
    variants[variant] ?? variants.primary
  } ${sizes[size] ?? sizes.md} ${className}`;

  const Glow = (
    <span className="pointer-events-none absolute inset-0 rounded-xl bg-gradient-to-r from-white/10 via-transparent to-white/10 opacity-0 transition-opacity duration-500 group-hover:opacity-100" />
  );

  if (as === "link" && to) {
    return (
      <MotionLink
        to={to}
        className={`group ${classes}`}
        {...hoverAnimation}
        {...props}
      >
        {Glow}
        <span className="relative z-10 flex items-center gap-2">
          {children}
        </span>
      </MotionLink>
    );
  }

  if (as === "a") {
    return (
      <MotionAnchor
        href={href}
        className={`group ${classes}`}
        {...hoverAnimation}
        {...props}
      >
        {Glow}
        <span className="relative z-10 flex items-center gap-2">
          {children}
        </span>
      </MotionAnchor>
    );
  }

  return (
    <MotionButton className={`group ${classes}`} {...hoverAnimation} {...props}>
      {Glow}
      <span className="relative z-10 flex items-center gap-2">{children}</span>
    </MotionButton>
  );
}
