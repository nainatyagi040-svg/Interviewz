import Nav from '../components/landing/Nav.jsx';
import Hero from '../components/landing/Hero.jsx';
import StatStrip from '../components/landing/StatStrip.jsx';
import HowItWorks from '../components/landing/HowItWorks.jsx';
import Callout from '../components/landing/Callout.jsx';
import FeatureGrid from '../components/landing/FeatureGrid.jsx';
import FinalCTA from '../components/landing/FinalCTA.jsx';
import Footer from '../components/landing/Footer.jsx';

export default function Landing() {
  return (
    <div className="min-h-screen bg-white">
      <Nav />
      <main>
        <Hero />
        <StatStrip />
        <HowItWorks />
        <Callout />
        <FeatureGrid />
        <FinalCTA />
      </main>
      <Footer />
    </div>
  );
}
