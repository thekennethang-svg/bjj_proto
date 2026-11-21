import { useScrollProgress } from '../hooks/useScrollProgress';

export default function ScrollProgressBar() {
  const progress = useScrollProgress();

  return (
    <div
      aria-hidden="true"
      className="fixed top-0 left-0 right-0 h-[2px] z-50 pointer-events-none bg-transparent"
    >
      <div
        className="h-full bg-accent transition-all duration-75 ease-out shadow-[0_0_8px_rgba(232,197,71,0.6)]"
        style={{ width: `${progress}%` }}
      />
    </div>
  );
}
