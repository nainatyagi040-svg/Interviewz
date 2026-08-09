import { useLayoutEffect } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

export default function ScrollChoreography() {
  useLayoutEffect(() => {
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    const ctx = gsap.context(() => {
      gsap.utils.toArray("main > section").forEach((section, index) => {
        const content = section.querySelector(":scope > div");
        if (!content || index === 0) return;
        gsap.fromTo(content, { y: 72, opacity: 0.45 }, { y: -18, opacity: 1, ease: "none", scrollTrigger: { trigger: section, start: "top 92%", end: "top 28%", scrub: 0.8 } });
      });
      gsap.to("main", { "--scroll-progress": 1, ease: "none", scrollTrigger: { trigger: "main", start: "top top", end: "bottom bottom", scrub: true } });
    });
    return () => ctx.revert();
  }, []);
  return <div className="scroll-progress" aria-hidden="true" />;
}
