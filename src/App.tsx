import { useEffect, useState } from 'react';
import Navbar from './components/Navbar';
import Hero from './components/Hero';
import About from './components/About';
import VideoSection from './components/VideoSection';
import Programs from './components/Programs';
import PhotoStripDivider from './components/PhotoStripDivider';
import Pricing from './components/Pricing';
import FAQ from './components/FAQ';
import Footer from './components/Footer';
import BookingModal from './components/BookingModal';
import BackgroundNoise from './components/BackgroundNoise';
import ScrollProgressBar from './components/ScrollProgressBar';

export default function App() {
  const [isBookingOpen, setIsBookingOpen] = useState(false);

  const openBooking = () => setIsBookingOpen(true);
  const closeBooking = () => setIsBookingOpen(false);

  useEffect(() => {
    document.title = 'Origin Brazilian Jiu Jitsu — Hanley, Stoke On Trent';
  }, []);

  return (
    <div className="min-h-screen bg-bg text-white relative selection:bg-accent selection:text-black">
      {/* Scroll Progress Indicator */}
      <ScrollProgressBar />

      {/* Subtle 35mm film-grain background noise */}
      <BackgroundNoise />

      {/* Navigation */}
      <Navbar onBookClick={openBooking} />

      <main>
        <Hero onBookClick={openBooking} />
        <About />
        <VideoSection onBookClick={openBooking} />
        <Programs />
        {/* Full-width photo strip divider */}
        <PhotoStripDivider />
        <Pricing onBookClick={openBooking} />
        <FAQ />
      </main>

      <Footer onBookClick={openBooking} />
      <BookingModal isOpen={isBookingOpen} onClose={closeBooking} />
    </div>
  );
}
