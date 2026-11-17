import { useEffect, useState } from 'react';
import Navbar from './components/Navbar';
import Hero from './components/Hero';
import About from './components/About';
import Programs from './components/Programs';
import Pricing from './components/Pricing';
import FAQ from './components/FAQ';
import Footer from './components/Footer';
import BookingModal from './components/BookingModal';

export default function App() {
  const [isBookingOpen, setIsBookingOpen] = useState(false);

  const openBooking = () => setIsBookingOpen(true);
  const closeBooking = () => setIsBookingOpen(false);

  useEffect(() => {
    document.title = 'Origin Brazilian Jiu Jitsu — Hanley, Stoke On Trent';
  }, []);

  return (
    <div className="min-h-screen bg-bg text-white">
      <Navbar onBookClick={openBooking} />
      <main>
        <Hero onBookClick={openBooking} />
        <About />
        <Programs />
        <Pricing onBookClick={openBooking} />
        <FAQ />
      </main>
      <Footer onBookClick={openBooking} />
      <BookingModal isOpen={isBookingOpen} onClose={closeBooking} />
    </div>
  );
}
