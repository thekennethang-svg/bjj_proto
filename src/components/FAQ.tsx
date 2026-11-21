import { useState } from 'react';
import { useIntersectionReveal } from '../hooks/useIntersectionReveal';
import SectionHeading from './SectionHeading';

const FAQ_ITEMS = [
  {
    q: 'Do I need any experience to start?',
    a: 'No. The Fundamentals program is designed specifically for people with zero experience. You will not be thrown into live sparring on your first day. The focus is on learning movement, positions, and basic technique in a controlled environment.',
  },
  {
    q: 'What should I bring to my first class?',
    a: 'Wear comfortable athletic clothing — shorts and a t-shirt are fine for your first visit. We have loaner gear available if needed. Once you decide to continue, we recommend investing in a Gi, which is available at the gym.',
  },
  {
    q: 'Is BJJ safe for beginners?',
    a: 'Injury risk exists in any contact sport, but our Fundamentals classes are structured to minimize it. Drilling is controlled, sparring is introduced gradually, and all students are expected to train with respect for their partners.',
  },
  {
    q: 'How long does it take to get a blue belt?',
    a: 'On average, students who train consistently (2–3 times per week) reach blue belt within 12 to 18 months. Progress depends on attendance, effort, and individual development — not a fixed timeline.',
  },
  {
    q: 'Can I train if I am not in good shape?',
    a: 'Yes. Many students begin training specifically to improve their fitness. BJJ itself will build your conditioning over time. You do not need to prepare before your first class.',
  },
  {
    q: 'What is the difference between Gi and No-Gi?',
    a: 'Gi training uses a traditional uniform (kimono) and allows gripping the fabric as part of technique. No-Gi training uses shorts and a rash guard, and relies on body control without fabric grips. Both are included in the membership.',
  },
  {
    q: 'Is there a contract or long-term commitment?',
    a: 'No contracts. Membership is month-to-month and can be cancelled with 30 days notice.',
  },
];

export default function FAQ() {
  const [openIndex, setOpenIndex] = useState<number | null>(0);
  const { ref, isVisible } = useIntersectionReveal({ threshold: 0.1 });

  return (
    <section
      id="faq"
      ref={ref}
      className="border-b border-border py-24 md:py-32 bg-bg"
    >
      <div className="max-w-6xl mx-auto px-6 lg:px-8">
        <SectionHeading
          category="Answers"
          title="Common Questions"
          subtitle="Everything you might want to know before your first visit."
          isVisible={isVisible}
        />

        <div
          className={`max-w-3xl divide-y divide-border border-y border-border transition-all duration-700 delay-150 ease-out ${
            isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-6'
          }`}
        >
          {FAQ_ITEMS.map((item, index) => {
            const isOpen = openIndex === index;
            return (
              <div key={item.q}>
                <h3>
                  <button
                    onClick={() => setOpenIndex(isOpen ? null : index)}
                    className="w-full flex items-center justify-between gap-6 py-5 text-left group"
                    aria-expanded={isOpen}
                  >
                    <span className="font-bold text-white text-base md:text-lg tracking-wide group-hover:text-accent transition-colors">
                      {item.q}
                    </span>
                    <svg
                      className={`shrink-0 text-accent transition-transform duration-300 ${
                        isOpen ? 'rotate-180' : ''
                      }`}
                      width="20"
                      height="20"
                      viewBox="0 0 20 20"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="2.5"
                    >
                      <path
                        d="M5 8l5 5 5-5"
                        strokeLinecap="square"
                        strokeLinejoin="miter"
                      />
                    </svg>
                  </button>
                </h3>
                <div
                  className={`grid transition-all duration-300 ease-out ${
                    isOpen
                      ? 'grid-rows-[1fr] opacity-100 pb-6'
                      : 'grid-rows-[0fr] opacity-0'
                  }`}
                >
                  <div className="overflow-hidden">
                    <p className="text-text-secondary text-base leading-relaxed pr-10">
                      {item.a}
                    </p>
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
