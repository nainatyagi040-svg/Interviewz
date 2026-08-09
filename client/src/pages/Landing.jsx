import Nav from "../components/landing/Nav.jsx";
import Hero from "../components/landing/Hero.jsx";
import StatStrip from "../components/landing/StatStrip.jsx";
import HowItWorks from "../components/landing/HowItWorks.jsx";
import Callout from "../components/landing/Callout.jsx";
import FeatureGrid from "../components/landing/FeatureGrid.jsx";
import FinalCTA from "../components/landing/FinalCTA.jsx";
import Footer from "../components/landing/Footer.jsx";
import ScrollChoreography from "../components/landing/ScrollChoreography.jsx";

export default function Landing() {
  return (
    <div
      className="landing-page relative min-h-screen overflow-x-hidden"
      style={{ background: "#f9fbf2", color: "#130e30" }}
    >
      {/* Background Effects */}
      <div className="garden-blobs" />

      {/* Navigation */}
      <Nav />
      <ScrollChoreography />

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
