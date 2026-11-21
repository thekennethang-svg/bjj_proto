import { useEffect, useState } from 'react';
import Navbar from './components/Navbar';
import Hero from './components/Hero';
import About from './components/About';
import CoachSpotlight from './components/CoachSpotlight';
import VideoSection from './components/VideoSection';
import Programs from './components/Programs';
import TimetableSection from './components/TimetableSection';
import FirstVisitSteps from './components/FirstVisitSteps';
import TestimonialsSection from './components/TestimonialsSection';
import PhotoStripDivider from './components/PhotoStripDivider';
import Pricing from './components/Pricing';
import FAQ from './components/FAQ';
import Footer from './components/Footer';
import BookingModal from './components/BookingModal';
import BackgroundNoise from './components/BackgroundNoise';
import ScrollProgressBar from './components/ScrollProgressBar';
import StickyMobileBar from './components/StickyMobileBar';

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
        {/* 1. Hero */}
        <Hero onBookClick={openBooking} />

        {/* 2. About Origin */}
        <About />

        {/* 3. Coach Spotlight: Professor Nick Roberts */}
        <CoachSpotlight onBookClick={openBooking} />

        {/* 4. Gym Atmosphere Video */}
        <VideoSection onBookClick={openBooking} />

        {/* 5. Training Programs */}
        <Programs />

        {/* 6. Interactive 7-Day Timetable & Schedule */}
        <TimetableSection onBookClick={openBooking} />

        {/* 7. What to Expect on Day One Onboarding Roadmap */}
        <FirstVisitSteps onBookClick={openBooking} />

        {/* 8. Social Proof & Member Reviews */}
        <TestimonialsSection />

        {/* 9. Full-width photo strip divider */}
        <PhotoStripDivider />

        {/* 10. Transparent All-Inclusive Pricing */}
        <Pricing onBookClick={openBooking} />

        {/* 11. FAQ */}
        <FAQ />
      </main>

      {/* Footer */}
      <Footer onBookClick={openBooking} />

      {/* Discreet Sticky Mobile Action Bar */}
      <StickyMobileBar
        onBookClick={openBooking}
        isBookingOpen={isBookingOpen}
      />

      {/* Trial Booking Modal */}
      <BookingModal isOpen={isBookingOpen} onClose={closeBooking} />
    </div>
  );
}
