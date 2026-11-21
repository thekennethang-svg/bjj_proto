interface AmbientGlowProps {
  className?: string;
  size?: 'sm' | 'md' | 'lg';
}

export default function AmbientGlow({
  className = '',
  size = 'md',
}: AmbientGlowProps) {
  const sizeMap = {
    sm: 'w-[280px] h-[280px] blur-[90px]',
    md: 'w-[450px] h-[450px] blur-[130px]',
    lg: 'w-[700px] h-[700px] blur-[170px]',
  };

  return (
    <div
      aria-hidden="true"
      className={`pointer-events-none absolute rounded-full ${sizeMap[size]} ${className}`}
      style={{
        background:
          'radial-gradient(circle, rgba(232, 197, 71, 0.055) 0%, rgba(232, 197, 71, 0.015) 50%, transparent 70%)',
      }}
    />
  );
}
