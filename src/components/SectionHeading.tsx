interface SectionHeadingProps {
  category: string;
  title: string;
  subtitle?: string;
  isVisible?: boolean;
  centered?: boolean;
}

export default function SectionHeading({
  category,
  title,
  subtitle,
  isVisible = true,
  centered = false,
}: SectionHeadingProps) {
  return (
    <div className={`mb-16 ${centered ? 'text-center' : ''}`}>
      <p className="text-accent text-sm font-bold uppercase tracking-widest mb-3">
        {category}
      </p>
      <div className={`inline-block ${centered ? 'mx-auto' : ''}`}>
        <h2 className="font-black uppercase tracking-widest text-white text-3xl sm:text-4xl md:text-5xl leading-tight">
          {title}
        </h2>
        {/* Animated Gold Underline Accent */}
        <div
          aria-hidden="true"
          className={`h-[2px] bg-accent mt-3 transition-all duration-700 ease-out ${
            isVisible ? 'w-16 opacity-100' : 'w-0 opacity-0'
          } ${centered ? 'mx-auto' : ''}`}
        />
      </div>
      {subtitle && (
        <p
          className={`mt-5 text-text-secondary text-base md:text-lg max-w-xl ${
            centered ? 'mx-auto' : ''
          }`}
        >
          {subtitle}
        </p>
      )}
    </div>
  );
}
