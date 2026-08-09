import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { Repeat } from "lucide-react";
import { motion } from "framer-motion";
import Button from "../ui/Button.jsx";
import { BRAND } from "../../lib/constants.js";

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
      transition={{ duration: 0.6 }}
      className={`sticky top-0 z-50 transition-all duration-500 ${
        scrolled
          ? "border-b border-white/10 bg-slate-950/60 backdrop-blur-2xl shadow-2xl"
          : "bg-transparent"
      }`}
    >
      <nav className="container-tight flex h-16 items-center justify-between">
        <Link to="/" className="group flex items-center gap-3">
          <motion.div
            whileHover={{
              rotate: 180,
              scale: 1.12,
            }}
            transition={{
              duration: 0.5,
            }}
            className="flex h-10 w-10 items-center justify-center rounded-xl bg-gradient-to-br from-indigo-500 via-purple-500 to-cyan-500 text-white shadow-lg shadow-indigo-500/40"
          >
            <Repeat className="h-5 w-5" />
          </motion.div>

          <span className="text-xl font-extrabold tracking-tight text-white transition group-hover:text-indigo-300">
            {BRAND.name}
          </span>
        </Link>

        <div className="flex items-center gap-3">
          <a
            href="#how-it-works"
            className="hidden rounded-lg px-4 py-2 text-sm font-medium text-slate-300 transition-all hover:bg-white/10 hover:text-white sm:block"
          >
            How it works
          </a>

          <a
            href="#features"
            className="hidden rounded-lg px-4 py-2 text-sm font-medium text-slate-300 transition-all hover:bg-white/10 hover:text-white sm:block"
          >
            Features
          </a>

          <Button
            as="link"
            to="/interview"
            size="sm"
            className="shadow-lg shadow-indigo-500/30"
          >
            Start Interview
          </Button>
        </div>
      </nav>
    </motion.header>
  );
}
