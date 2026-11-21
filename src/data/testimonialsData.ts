export interface Testimonial {
  id: string;
  name: string;
  role: string;
  belt: string;
  tenure: string;
  quote: string;
  persona: 'Beginner' | 'Professional' | 'Competitor';
  highlight: string;
}

export const TESTIMONIALS_DATA: Testimonial[] = [
  {
    id: 'dan-m',
    name: 'Dan M.',
    role: 'New Student',
    belt: 'White Belt',
    tenure: 'Member for 8 months',
    persona: 'Beginner',
    highlight: 'Zero egos, immediately welcoming',
    quote:
      'I was nervous walking into my first martial arts gym at 34 with zero combat sports background. Nick and the team made me feel welcome the second I walked through the door. Zero egos, patient instruction, and teammates who look out for your safety.',
  },
  {
    id: 'sarah-t',
    name: 'Sarah T.',
    role: 'All-Levels Student',
    belt: 'White Belt (4 Stripes)',
    tenure: 'Member for 2 years',
    persona: 'Professional',
    highlight: '6:00 AM classes before work',
    quote:
      'The 6:00 AM classes are an absolute game changer before heading into the office. Spotless mats, world-class technical detail, and an incredible community. Training at Origin sets the tone for my entire day.',
  },
  {
    id: 'liam-k',
    name: 'Liam K.',
    role: 'Active Competitor',
    belt: 'Blue Belt',
    tenure: 'Member for 3 years',
    persona: 'Competitor',
    highlight: 'World-class positional sparring',
    quote:
      'The technical depth in positional sparring is world class. Every single round has purpose. Coach Nick breaks down micro-adjustments and counter-systems that give you massive confidence whether rolling or competing.',
  },
];

export const GOOGLE_RATING_INFO = {
  rating: '5.0',
  maxRating: '5.0',
  totalReviews: '45+',
  stars: 5,
  source: 'Google Reviews',
  badgeText: '5.0 ★★★★★ Rated on Google · Verified Member Reviews',
};
