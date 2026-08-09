import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { CircleDot, Moon, Sun } from "lucide-react";
import { motion } from "framer-motion";
import Button from "../ui/Button.jsx";
import { BRAND } from "../../lib/constants.js";

/* Design-system palette applied inline so the nav renders faithfully
   independent of the Tailwind token migration. */
const C = {
  ice: "#d8ecf8",
  frost: "#d1e4fa",
  moon: "#c7d3ea",
  violet: "#beff50",
};

const DISPLAY_FONT =
  "'aeonikPro', 'Inter', ui-sans-serif, system-ui, -apple-system, 'Segoe UI', sans-serif";

export default function Nav() {
  const [scrolled, setScrolled] = useState(false);
  const [dark, setDark] = useState(() => localStorage.getItem("loop-theme") === "dark");

  useEffect(() => {
    document.documentElement.classList.toggle("dark", dark);
    localStorage.setItem("loop-theme", dark ? "dark" : "light");
  }, [dark]);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 8);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });

    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <motion.header
      initial={{ y: -70 }}
      animate={{ y: 0 }}
      transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
      className="sticky top-4 z-50 mx-4 transition-all duration-500 sm:mx-8 lg:mx-12"
      style={
        scrolled
          ? {
              background: "rgba(5,6,15,0.65)",
              backdropFilter: "blur(18px)",
              WebkitBackdropFilter: "blur(18px)",
              borderBottom: "1px solid rgba(186,215,247,0.10)",
              boxShadow:
                "rgba(216,236,248,0.14) 0px 1px 0px 0px inset, rgba(6,6,14,0.45) 0px 12px 32px 0px",
            }
          : { background: "#f5f5eb" }
      }
    >
      {/* Light-catching hairline along the bottom edge when scrolled */}
      {scrolled && (
        <div
          className="pointer-events-none absolute inset-x-0 bottom-0 h-px"
          style={{
            background:
              "linear-gradient(to right, transparent, rgba(216,236,248,0.35), transparent)",
          }}
        />
      )}

      <nav className="mx-auto flex h-16 max-w-[1200px] items-center justify-between rounded-[24px] border border-[#14140f] bg-[#f5f5eb] px-4 sm:px-6">
        <Link to="/" className="group flex items-center gap-3">
          <motion.div
            whileHover={{ rotate: 180, scale: 1.12 }}
            transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
            className="flex h-10 w-10 items-center justify-center rounded-full text-[#14140f]"
            style={{
              background: "#beff50",
              boxShadow:
                "none",
            }}
          >
            <CircleDot className="h-5 w-5" strokeWidth={2.5} />
          </motion.div>

          <span
            className="text-xl font-medium tracking-tight transition-colors duration-300"
            style={{ fontFamily: "'Space Grotesk', sans-serif", color: "#14140f" }}
          >
            {BRAND.name}
          </span>
        </Link>

        <div className="flex items-center gap-2">
          <a
            href="#how-it-works"
            className="hidden rounded-lg px-4 py-2 text-sm font-medium transition-all duration-300 hover:bg-white/[0.06] sm:block"
            style={{ color: "#6e6e64" }}
          >
            How it works
          </a>

          <button type="button" aria-label={dark ? "Switch to light mode" : "Switch to dark mode"} onClick={() => setDark((value) => !value)} className="inline-flex h-9 w-9 items-center justify-center rounded-full border border-[#d2d2c8] text-[#14140f] transition hover:bg-[#beff50]">
            {dark ? <Sun className="h-4 w-4" /> : <Moon className="h-4 w-4" />}
          </button>

          <a
            href="#features"
            className="hidden rounded-lg px-4 py-2 text-sm font-medium transition-all duration-300 hover:bg-white/[0.06] sm:block"
            style={{ color: "#6e6e64" }}
          >
            Features
          </a>

          <Button as="link" to="/interview" size="sm">
            Start Interview
          </Button>
        </div>
      </nav>
    </motion.header>
  );
}

export function ThemeToggle({ className = "" }) {
  const [dark, setDark] = useState(() => localStorage.getItem("loop-theme") === "dark");
  useEffect(() => {
    document.documentElement.classList.toggle("dark", dark);
    localStorage.setItem("loop-theme", dark ? "dark" : "light");
  }, [dark]);
  return (
    <button type="button" aria-label={dark ? "Switch to light mode" : "Switch to dark mode"} onClick={() => setDark((value) => !value)} className={`theme-toggle inline-flex h-9 w-9 items-center justify-center rounded-full border border-[#d2d2c8] text-[#14140f] transition hover:bg-[#beff50] ${className}`}>
      {dark ? <Sun className="h-4 w-4" /> : <Moon className="h-4 w-4" />}
    </button>
  );
}
