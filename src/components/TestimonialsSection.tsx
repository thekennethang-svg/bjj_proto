import { Star, Quote, CheckCircle2 } from 'lucide-react';
import { TESTIMONIALS_DATA, GOOGLE_RATING_INFO } from '../data/testimonialsData';
import { useIntersectionReveal } from '../hooks/useIntersectionReveal';
import AmbientGlow from './AmbientGlow';
import SectionHeading from './SectionHeading';

export default function TestimonialsSection() {
  const { ref, isVisible } = useIntersectionReveal({ threshold: 0.1 });

  return (
    <section
      id="testimonials"
      ref={ref}
      className="relative border-b border-border py-24 md:py-32 bg-bg overflow-hidden"
    >
      {/* Background Ambient Glow */}
      <AmbientGlow
        size="md"
        className="top-1/2 right-1/4 -translate-y-1/2 opacity-20"
      />

      <div className="relative max-w-6xl mx-auto px-6 lg:px-8">
        <SectionHeading
          category="Community & Social Proof"
          title="The Mat Doesn't Lie"
          subtitle="Honest words from students who took the first step and walked through our doors."
          isVisible={isVisible}
          centered
        />

        {/* Google 5.0 Rating Banner */}
        <div
          className={`max-w-xl mx-auto mb-16 p-4 sm:p-5 bg-surface-raised border border-border transition-all duration-700 ease-out ${
            isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-6'
          }`}
        >
          <div className="flex flex-col sm:flex-row items-center justify-center gap-3 sm:gap-6 text-center sm:text-left">
            {/* Google Logo Mark + Score */}
            <div className="flex items-center gap-2">
              <div className="w-8 h-8 rounded-full bg-white flex items-center justify-center font-black text-black text-sm select-none">
                G
              </div>
              <div className="flex items-baseline gap-1">
                <span className="text-2xl font-black text-white">5.0</span>
                <span className="text-xs text-text-secondary">/5.0</span>
              </div>
            </div>

            {/* Stars */}
            <div className="flex items-center gap-1 text-accent" aria-label="5 out of 5 stars">
              {[...Array(5)].map((_, i) => (
                <Star key={i} size={18} fill="#E8C547" stroke="#E8C547" />
              ))}
            </div>

            {/* Verification Tag */}
            <div className="sm:border-l sm:border-border sm:pl-4 text-xs font-semibold uppercase tracking-wider text-text-secondary">
              {GOOGLE_RATING_INFO.totalReviews} Verified Google Reviews
            </div>
          </div>
        </div>

        {/* 3 Review Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 lg:gap-8">
          {TESTIMONIALS_DATA.map((item, index) => {
            return (
              <div
                key={item.id}
                className={`bg-surface border border-border p-6 sm:p-8 flex flex-col justify-between transition-all duration-500 ease-out hover:border-accent/50 hover:bg-surface-raised hover:-translate-y-1 ${
                  isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
                }`}
                style={{ transitionDelay: `${index * 150}ms` }}
              >
                <div>
                  {/* Top Bar: Quote Icon & Persona Pill */}
                  <div className="flex items-center justify-between mb-6">
                    <Quote size={28} className="text-accent/60" />
                    <span className="text-[10px] uppercase tracking-widest font-bold px-2 py-0.5 bg-surface-raised border border-border text-accent">
                      {item.persona}
                    </span>
                  </div>

                  {/* Highlight sentence */}
                  <p className="text-sm font-bold text-white uppercase tracking-wide mb-3">
                    "{item.highlight}"
                  </p>

                  {/* Full quote */}
                  <p className="text-text-secondary text-sm leading-relaxed mb-6">
                    "{item.quote}"
                  </p>
                </div>

                {/* Author Info */}
                <div className="pt-6 border-t border-border/80 flex items-center justify-between">
                  <div>
                    <p className="text-white font-bold text-sm uppercase tracking-wide">
                      {item.name}
                    </p>
                    <p className="text-xs text-text-secondary">
                      {item.belt} · {item.tenure}
                    </p>
                  </div>
                  <div
                    className="flex items-center text-accent text-xs"
                    title="Verified Student Review"
                  >
                    <CheckCircle2 size={16} />
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
