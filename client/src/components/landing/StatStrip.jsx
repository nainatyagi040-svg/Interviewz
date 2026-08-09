import { useEffect, useRef, useState } from "react";
import { CalendarDays, Layers3, Users, MessageCircle } from "lucide-react";
import { motion } from "framer-motion";

const stats = [
  { value: "31-day", label: "AI engineering curriculum", icon: CalendarDays },
  { value: "8", label: "modules, setup to capstone", icon: Layers3 },
  { value: "20", label: "learner profiles", icon: Users },
  { value: "8+", label: "adaptive questions per interview", icon: MessageCircle },
];

const DISPLAY_FONT = "'aeonikPro', 'Inter', ui-sans-serif, system-ui, sans-serif";

function useCountUp(value, active, duration = 1100) {
  const numeric = Number.parseInt(value, 10);
  const [count, setCount] = useState(0);

  useEffect(() => {
    if (!active) return;
    let frame;
    const start = performance.now();
    const tick = (now) => {
      const progress = Math.min((now - start) / duration, 1);
      const eased = 1 - Math.pow(1 - progress, 3);
      setCount(Math.round(numeric * eased));
      if (progress < 1) frame = requestAnimationFrame(tick);
    };
    frame = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(frame);
  }, [active, duration, numeric]);

  return `${count}${value.includes("+") ? "+" : value.includes("-") ? "-day" : ""}`;
}

function Stat({ stat, index, active }) {
  const Icon = stat.icon;
  const displayValue = useCountUp(stat.value, active);
  return (
    <motion.div
      initial={{ opacity: 0, y: 18 }}
      animate={active ? { opacity: 1, y: 0 } : { opacity: 0, y: 18 }}
      transition={{ duration: 0.55, delay: index * 0.1, ease: [0.16, 1, 0.3, 1] }}
      whileHover={{ scale: 1.03, color: "#beff50" }}
      className="group relative text-center transition-colors duration-300"
    >
      <Icon className="mx-auto mb-4 h-5 w-5 text-[#14140f] transition-colors duration-300 group-hover:text-[#beff50]" strokeWidth={1.5} />
      <div
        className="bg-gradient-to-br from-[#14140f] via-[#59752f] to-[#beff50] bg-clip-text text-4xl font-semibold tracking-[-0.04em] text-transparent sm:text-5xl"
        style={{ fontFamily: DISPLAY_FONT }}
      >
        {displayValue}
      </div>
      <div className="mx-auto mt-2 max-w-[13rem] text-[10px] font-medium uppercase leading-relaxed tracking-[0.14em] text-[#6e6e64] sm:text-xs">
        {stat.label}
      </div>
    </motion.div>
  );
}

export default function StatStrip() {
  const sectionRef = useRef(null);
  const [active, setActive] = useState(false);

  useEffect(() => {
    const observer = new IntersectionObserver(([entry]) => {
      if (entry.isIntersecting) {
        setActive(true);
        observer.disconnect();
      }
    }, { threshold: 0.25 });
    if (sectionRef.current) observer.observe(sectionRef.current);
    return () => observer.disconnect();
  }, []);

  return (
    <section ref={sectionRef} className="relative border-y border-[#d2d2c8] bg-[#f5f5eb]">
      <div className="container-tight py-14 sm:py-16">
        <div className="grid grid-cols-1 gap-10 sm:grid-cols-2 sm:gap-y-12 lg:grid-cols-4 lg:gap-0">
          {stats.map((stat, index) => (
            <div key={stat.label} className="relative lg:px-8">
              <Stat stat={stat} index={index} active={active} />
              {index < stats.length - 1 && (
                <span className="absolute -right-px top-1/2 hidden h-16 -translate-y-1/2 border-r border-[#d2d2c8] lg:block" />
              )}
            </div>
          ))}
        </div>
        <p className="mt-12 text-center text-xs text-[#6e6e64]">Illustrative figures for the cohort concept.</p>
      </div>
    </section>
  );
}
