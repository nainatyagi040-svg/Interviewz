import { Link } from "react-router-dom";
import { motion } from "framer-motion";

const MotionLink = motion(Link);
const MotionButton = motion.button;
const MotionAnchor = motion.a;

/*
 * Buttons follow the design system: full-pill radius (--radius-buttons: 999px),
 * Void Violet (#663af3) as the single chromatic accent for the primary action,
 * frosted-glass surfaces for secondary/ghost. Colors use arbitrary Tailwind
 * values so the component is self-contained during the incremental migration.
 */
const base =
  "relative inline-flex items-center justify-center gap-2 overflow-hidden rounded-[28px] font-medium transition-all duration-200 ease-out active:translate-y-[2px] active:scale-[0.96] focus:outline-none focus-visible:ring-2 focus-visible:ring-[#14140f] focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-60";

const variants = {
  primary:
    "bg-[#beff50] text-[#14140f] hover:bg-[#aef238]",

  secondary:
    "border border-[#14140f] bg-transparent text-[#14140f] hover:bg-[#f5f5eb] rounded-full",

  ghost:
    "text-[#14140f] hover:underline",
};

const sizes = {
  sm: "px-4 py-2 text-sm",
  md: "px-5 py-2.5 text-sm",
  lg: "px-7 py-3 text-base",
};

const hoverAnimation = {
  whileHover: {
    y: -3,
    scale: 1.025,
  },
  whileTap: {
    y: 1,
    scale: 0.95,
  },
  transition: {
    type: "spring",
    stiffness: 500,
    damping: 22,
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

  // Frosted light-sweep sheen that glides across on hover.
  const Glow = null;

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
