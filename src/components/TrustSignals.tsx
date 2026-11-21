export default function TrustSignals() {
  const signals = [
    '3rd Degree Black Belt',
    'Hanley, Stoke On Trent',
    'Adults All Levels',
  ];

  return (
    <div className="pt-8 flex flex-wrap items-center gap-y-2 gap-x-4 text-xs tracking-widest uppercase text-text-secondary/90 font-medium select-none">
      {signals.map((item, index) => (
        <div key={item} className="flex items-center gap-4">
          <span className="flex items-center gap-2">
            <span className="w-1.5 h-1.5 bg-accent/80 rounded-none inline-block" />
            <span className="text-white/80">{item}</span>
          </span>
          {index < signals.length - 1 && (
            <span className="text-border hidden sm:inline">|</span>
          )}
        </div>
      ))}
    </div>
  );
}
