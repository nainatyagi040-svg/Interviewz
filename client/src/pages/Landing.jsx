import Nav from "../components/landing/Nav.jsx";
import Hero from "../components/landing/Hero.jsx";
import StatStrip from "../components/landing/StatStrip.jsx";
import HowItWorks from "../components/landing/HowItWorks.jsx";
import Callout from "../components/landing/Callout.jsx";
import FeatureGrid from "../components/landing/FeatureGrid.jsx";
import FinalCTA from "../components/landing/FinalCTA.jsx";
import Footer from "../components/landing/Footer.jsx";
import AnimatedBackground from "../components/ui/AnimatedBackground.jsx";
import FloatingSparkles from "../components/ui/FloatingSparkles.jsx";

export default function Landing() {
  return (
    <div className="relative min-h-screen overflow-x-hidden bg-slate-950 text-slate-100">
      {/* Background Effects */}
      <AnimatedBackground />
      <FloatingSparkles />

      {/* Navigation */}
      <Nav />

      {/* Main Content */}
      <main className="relative z-10">
        <Hero />
        <StatStrip />
        <HowItWorks />
        <Callout />
        <FeatureGrid />
        <FinalCTA />
      </main>

      {/* Footer */}
      <Footer />
    </div>
  );
}
