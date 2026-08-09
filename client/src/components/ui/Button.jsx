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
  "relative inline-flex items-center justify-center gap-2 overflow-hidden rounded-full font-semibold transition-all duration-300 ease-[cubic-bezier(0.16,1,0.3,1)] focus:outline-none focus-visible:ring-2 focus-visible:ring-[#663af3]/70 focus-visible:ring-offset-2 focus-visible:ring-offset-[#05060f] disabled:cursor-not-allowed disabled:opacity-60";

const variants = {
  primary:
    "bg-[#663af3] text-white shadow-[inset_0_1px_0_rgba(255,255,255,0.22),0_8px_30px_rgba(102,58,243,0.40)] hover:bg-[#7248f6] hover:shadow-[inset_0_1px_0_rgba(255,255,255,0.28),0_12px_44px_rgba(102,58,243,0.60)]",

  secondary:
    "border border-[rgba(186,215,247,0.16)] bg-[rgba(199,211,234,0.06)] text-[#d1e4fa] backdrop-blur-xl shadow-[inset_0_1px_0_rgba(216,236,248,0.14)] hover:bg-[rgba(199,211,234,0.12)] hover:border-[rgba(186,215,247,0.30)]",

  ghost:
    "text-[#c7d3ea] hover:bg-white/[0.06] hover:text-[#d8ecf8]",
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

  // Frosted light-sweep sheen that glides across on hover.
  const Glow = (
    <span className="pointer-events-none absolute inset-0 rounded-full bg-gradient-to-r from-white/12 via-transparent to-white/12 opacity-0 transition-opacity duration-500 group-hover:opacity-100" />
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
