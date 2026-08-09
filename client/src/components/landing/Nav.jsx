import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { Repeat } from "lucide-react";
import { motion } from "framer-motion";
import Button from "../ui/Button.jsx";
import { BRAND } from "../../lib/constants.js";

/* Design-system palette applied inline so the nav renders faithfully
   independent of the Tailwind token migration. */
const C = {
  ice: "#d8ecf8",
  frost: "#d1e4fa",
  moon: "#c7d3ea",
  violet: "#663af3",
};

const DISPLAY_FONT =
  "'aeonikPro', 'Inter', ui-sans-serif, system-ui, -apple-system, 'Segoe UI', sans-serif";

export default function Nav() {
  const [scrolled, setScrolled] = useState(false);

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
      className="sticky top-0 z-50 transition-all duration-500"
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
          : { background: "transparent" }
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

      <nav className="container-tight flex h-16 items-center justify-between">
        <Link to="/" className="group flex items-center gap-3">
          <motion.div
            whileHover={{ rotate: 180, scale: 1.12 }}
            transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
            className="flex h-10 w-10 items-center justify-center rounded-xl text-white"
            style={{
              background: C.violet,
              boxShadow:
                "rgba(255,255,255,0.18) 0px 1px 0px 0px inset, 0 0 22px rgba(102,58,243,0.45)",
            }}
          >
            <Repeat className="h-5 w-5" />
          </motion.div>

          <span
            className="text-xl font-medium tracking-tight transition-colors duration-300"
            style={{ fontFamily: DISPLAY_FONT, color: C.ice }}
          >
            {BRAND.name}
          </span>
        </Link>

        <div className="flex items-center gap-2">
          <a
            href="#how-it-works"
            className="hidden rounded-lg px-4 py-2 text-sm font-medium transition-all duration-300 hover:bg-white/[0.06] sm:block"
            style={{ color: C.moon }}
          >
            How it works
          </a>

          <a
            href="#features"
            className="hidden rounded-lg px-4 py-2 text-sm font-medium transition-all duration-300 hover:bg-white/[0.06] sm:block"
            style={{ color: C.moon }}
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
