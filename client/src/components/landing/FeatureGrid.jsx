import { useEffect, useRef, useState } from "react";
import { motion } from "framer-motion";
import { GitBranch, Target, ListChecks, Waypoints } from "lucide-react";

const features = [
  { icon: GitBranch, title: "Adaptive follow-ups", body: "Every question reacts to what you just said — shallow answers get probed, strong ones get pushed further." },
  { icon: Target, title: "Grounded in your real progress", body: "Questions target the specific curriculum days you actually worked through — no generic trivia." },
  { icon: ListChecks, title: "Structured feedback", body: "A clean summary of strengths, gaps, and next steps you can act on immediately." },
  { icon: Waypoints, title: "Realistic interview flow", body: "Paced and phrased like a real senior interviewer — not a chatbot reading off a list." },
];

const DISPLAY_FONT = "'aeonikPro', 'Inter', ui-sans-serif, system-ui, sans-serif";

export default function FeatureGrid() {
  const sectionRef = useRef(null);
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const observer = new IntersectionObserver(([entry]) => {
      if (entry.isIntersecting) { setVisible(true); observer.disconnect(); }
    }, { threshold: 0.18 });
    if (sectionRef.current) observer.observe(sectionRef.current);
    return () => observer.disconnect();
  }, []);

  return (
    <section id="features" ref={sectionRef} className="relative scroll-mt-20 overflow-hidden bg-[#f5f5eb]">
      <div className="pointer-events-none absolute inset-0 opacity-70" style={{ backgroundImage: "radial-gradient(circle at 12% 25%, rgba(190,255,80,.18), transparent 28%), radial-gradient(circle at 88% 72%, rgba(89,226,93,.12), transparent 30%), radial-gradient(#d2d2c8 0.7px, transparent 0.7px)", backgroundSize: "auto, auto, 22px 22px" }} />
      <div className="container-tight relative py-20 sm:py-28">
        <motion.div initial={{ opacity: 0, y: 18 }} animate={visible ? { opacity: 1, y: 0 } : { opacity: 0, y: 18 }} transition={{ duration: .6 }} className="mx-auto max-w-2xl text-center">
          <h2 className="text-3xl font-medium tracking-tight text-[#14140f] sm:text-4xl" style={{ fontFamily: DISPLAY_FONT }}>Built to feel like the real thing</h2>
          <p className="mt-4 text-lg text-[#5f5c6e]">Everything about Loop is designed to mirror an actual technical interview.</p>
        </motion.div>

        <div className="mt-14 grid gap-5 sm:grid-cols-2">
          {features.map((f, i) => {
            const Icon = f.icon;
            return <motion.article key={f.title} initial={{ opacity: 0, y: 22 }} animate={visible ? { opacity: 1, y: 0 } : { opacity: 0, y: 22 }} transition={{ duration: .6, delay: .15 + i * .12, ease: [0.16, 1, 0.3, 1] }} whileHover={{ y: -5, scale: 1.01 }} className={`group relative flex h-full gap-5 rounded-[24px] border border-[#d2d2c8] p-7 shadow-[0_10px_30px_rgba(20,20,15,.04)] transition-shadow hover:border-[#b9d78a] hover:shadow-[0_18px_45px_rgba(20,20,15,.1)] ${i === 0 ? "bg-[#f8fbeF]" : "bg-white"}`}>
              <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-2xl border border-white/60 bg-[radial-gradient(circle_at_35%_25%,#e7ffb3,#beff50_48%,#59e25d)] text-[#14140f] shadow-[inset_0_1px_2px_rgba(255,255,255,.8),0_8px_18px_rgba(89,226,93,.18)] transition-transform duration-300 group-hover:scale-105"><Icon className="h-5 w-5" strokeWidth={1.6} /></div>
              <div className="max-w-md"><h3 className="text-lg font-semibold text-[#14140f]">{f.title}</h3><p className="mt-2 text-sm leading-7 text-[#5f5c6e]">{f.body}</p></div>
            </motion.article>;
          })}
        </div>
      </div>
    </section>
  );
}
