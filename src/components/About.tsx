const STATS = [
  { value: '18+', label: 'Years Teaching' },
  { value: '400+', label: 'Students Trained' },
  { value: 'Weekly', label: 'Gi & No-Gi Classes' },
];

export default function About() {
  return (
    <section id="about" className="border-b border-border py-24 md:py-32">
      <div className="max-w-6xl mx-auto px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 lg:gap-24">
          <div>
            <p className="text-accent text-sm font-bold uppercase tracking-widest mb-4">
              The Academy
            </p>
            <h2 className="font-black uppercase tracking-widest text-white text-3xl sm:text-4xl md:text-5xl leading-tight mb-8">
              Built on the Mat
            </h2>
            <div className="space-y-5 text-text-secondary text-base md:text-lg leading-relaxed max-w-xl">
              <p>
                Origin Brazilian Jiu Jitsu was founded in 2025 with a simple goal: to
                provide honest, structured training for adults who want to improve on
                and off the mat. No egos, no hype — just consistent work and clear
                progression.
              </p>
              <p>
                Head coach Professor Nick Roberts is a 3rd degree black belt with 18
                years of teaching experience. His approach emphasises fundamentals,
                positional understanding, and a training environment where every
                student is given the time to develop.
              </p>
              <p>
                Whether you are walking in for your first class or preparing for a
                competition, the room is built to support your progress. Gi and No-Gi
                are both part of the curriculum, and all levels are welcome.
              </p>
              <p>
                We train with purpose and grow with discipline. That is the standard,
                and it applies to everyone who steps on the mat.
              </p>
            </div>
          </div>

          <div className="lg:pl-8">
            <div className="border border-border bg-surface p-8 md:p-10 h-full flex flex-col justify-center">
              <div className="divide-y divide-border">
                {STATS.map((stat) => (
                  <div key={stat.label} className="py-6 first:pt-0 last:pb-0">
                    <p className="font-black text-accent text-4xl md:text-5xl tracking-tight leading-none">
                      {stat.value}
                    </p>
                    <p className="mt-3 text-sm font-medium uppercase tracking-widest text-white">
                      {stat.label}
                    </p>
                  </div>
                ))}
              </div>
              <div className="mt-8 pt-6 border-t border-border">
                <p className="text-xs uppercase tracking-widest text-text-secondary">
                  Hanley, Stoke On Trent
                </p>
                <p className="mt-1 text-xs uppercase tracking-widest text-text-secondary">
                  Founded 2025
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
