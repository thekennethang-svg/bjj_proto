import { useEffect, useRef, useState } from 'react';
import { Volume2, VolumeX, Play, Pause } from 'lucide-react';
import { useIntersectionReveal } from '../hooks/useIntersectionReveal';
import AmbientGlow from './AmbientGlow';

interface VideoSectionProps {
  onBookClick: () => void;
}

export default function VideoSection({ onBookClick }: VideoSectionProps) {
  const videoRef = useRef<HTMLVideoElement | null>(null);
  const containerRef = useRef<HTMLDivElement | null>(null);

  const [isMuted, setIsMuted] = useState(true);
  const [isPlaying, setIsPlaying] = useState(false);
  const [progress, setProgress] = useState(0);
  const [isVideoLoaded, setIsVideoLoaded] = useState(false);

  const { ref: revealRef, isVisible } = useIntersectionReveal({
    threshold: 0.15,
  });

  // Handle autoplay when in view, pause when out of view, and respect reduced motion
  useEffect(() => {
    const video = videoRef.current;
    if (!video) return;

    const prefersReducedMotion = window.matchMedia(
      '(prefers-reduced-motion: reduce)'
    ).matches;

    // If user prefers reduced motion, do not force autoplay
    if (prefersReducedMotion) {
      video.pause();
      setIsPlaying(false);
      return;
    }

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          video
            .play()
            .then(() => setIsPlaying(true))
            .catch(() => {
              // Browser may require user interaction for audio, but muted succeeds
              setIsPlaying(false);
            });
        } else {
          video.pause();
          setIsPlaying(false);
        }
      },
      { threshold: 0.25 }
    );

    if (containerRef.current) {
      observer.observe(containerRef.current);
    }

    // Auto-pause when browser tab is switched
    const handleVisibilityChange = () => {
      if (document.hidden) {
        video.pause();
        setIsPlaying(false);
      } else if (isVisible && !prefersReducedMotion) {
        video.play().then(() => setIsPlaying(true)).catch(() => {});
      }
    };

    document.addEventListener('visibilitychange', handleVisibilityChange);

    return () => {
      observer.disconnect();
      document.removeEventListener('visibilitychange', handleVisibilityChange);
    };
  }, [isVisible]);

  // Video progress indicator
  const handleTimeUpdate = () => {
    if (!videoRef.current) return;
    const { currentTime, duration } = videoRef.current;
    if (duration > 0) {
      setProgress((currentTime / duration) * 100);
    }
  };

  const toggleSound = (e: React.MouseEvent) => {
    e.stopPropagation();
    if (!videoRef.current) return;
    const nextMuted = !isMuted;
    videoRef.current.muted = nextMuted;
    setIsMuted(nextMuted);
  };

  const togglePlayback = () => {
    if (!videoRef.current) return;
    if (videoRef.current.paused) {
      videoRef.current.play().then(() => setIsPlaying(true)).catch(() => {});
    } else {
      videoRef.current.pause();
      setIsPlaying(false);
    }
  };

  return (
    <section
      id="experience"
      ref={revealRef}
      className="relative border-b border-border py-24 md:py-32 bg-bg overflow-hidden"
    >
      {/* Background Atmosphere */}
      <AmbientGlow
        size="lg"
        className="top-1/3 -left-32 opacity-25"
      />
      <AmbientGlow
        size="md"
        className="bottom-10 right-0 opacity-20"
      />

      <div className="relative max-w-6xl mx-auto px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-center">
          {/* Left Column: Compelling Typography & Story (7 cols) */}
          <div
            className={`lg:col-span-7 transition-all duration-700 ease-out ${
              isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-6'
            }`}
          >
            <p className="text-accent text-sm font-bold uppercase tracking-widest mb-4 flex items-center gap-2">
              <span className="w-2.5 h-0.5 bg-accent inline-block" />
              The Origin Experience
            </p>

            <h2 className="font-black uppercase tracking-tight sm:tracking-widest text-white text-3xl sm:text-5xl md:text-6xl leading-[0.95] mb-6 max-w-xl">
              More Than Just
              <br />
              <span className="text-accent">Jiu-Jitsu.</span>
            </h2>

            {/* Gold Accent Underline */}
            <div
              aria-hidden="true"
              className={`h-[2px] bg-accent mb-8 transition-all duration-700 delay-150 ease-out ${
                isVisible ? 'w-16 opacity-100' : 'w-0 opacity-0'
              }`}
            />

            <p className="text-text-secondary text-base sm:text-lg md:text-xl font-normal leading-relaxed mb-8 max-w-xl">
              Build confidence. Develop discipline. Find your community. Discover
              what you're capable of at Origin.
            </p>

            {/* Key Gym Pillars */}
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-10 pt-2 border-t border-border/60">
              <div className="space-y-1">
                <p className="font-bold uppercase tracking-wider text-xs text-white">
                  Real Progression
                </p>
                <p className="text-xs text-text-secondary leading-normal">
                  Structured learning from day one.
                </p>
              </div>
              <div className="space-y-1">
                <p className="font-bold uppercase tracking-wider text-xs text-white">
                  Zero Ego Room
                </p>
                <p className="text-xs text-text-secondary leading-normal">
                  Respectful, controlled sparring culture.
                </p>
              </div>
              <div className="space-y-1">
                <p className="font-bold uppercase tracking-wider text-xs text-white">
                  All Levels Welcome
                </p>
                <p className="text-xs text-text-secondary leading-normal">
                  Complete beginner to tournament athlete.
                </p>
              </div>
            </div>

            <div className="flex flex-col sm:flex-row items-start sm:items-center gap-4">
              <button
                onClick={onBookClick}
                className="bg-accent text-black font-bold uppercase tracking-widest text-sm md:text-base px-8 py-4 rounded-none hover:bg-white transition-all duration-200 shadow-[0_0_20px_rgba(232,197,71,0.2)] hover:shadow-[0_0_25px_rgba(255,255,255,0.4)]"
              >
                Start Your Journey
              </button>
              <span className="text-xs uppercase tracking-widest text-text-secondary">
                Free Trial Class · No Obligations
              </span>
            </div>
          </div>

          {/* Right Column: Premium 9:16 Portrait Video Showcase (5 cols) */}
          <div
            className={`lg:col-span-5 flex justify-center transition-all duration-700 delay-150 ease-out ${
              isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-6'
            }`}
          >
            <div
              ref={containerRef}
              onClick={togglePlayback}
              className="relative w-full max-w-[320px] sm:max-w-[360px] md:max-w-[380px] aspect-[9/16] bg-surface-raised border-t-2 border-accent border-x border-b border-border/80 shadow-[0_20px_50px_rgba(0,0,0,0.8)] overflow-hidden cursor-pointer group hover-glow"
            >
              {/* Fallback & Poster Texture before load */}
              <div
                aria-hidden="true"
                className={`absolute inset-0 bg-surface flex flex-col items-center justify-center transition-opacity duration-500 ${
                  isVideoLoaded ? 'opacity-0 pointer-events-none' : 'opacity-100'
                }`}
              >
                <div className="w-12 h-12 border-2 border-accent border-t-transparent animate-spin mb-3" />
                <span className="text-[10px] uppercase tracking-widest text-text-secondary">
                  Loading Experience
                </span>
              </div>

              {/* 9:16 Portrait Video Element */}
              <video
                ref={videoRef}
                src="/origin-video.mp4"
                playsInline
                muted={isMuted}
                loop
                preload="metadata"
                onLoadedData={() => setIsVideoLoaded(true)}
                onTimeUpdate={handleTimeUpdate}
                className="w-full h-full object-cover select-none"
              />

              {/* Subtle Vignette & Frame Shadow */}
              <div
                aria-hidden="true"
                className="pointer-events-none absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-black/30"
              />

              {/* Top Watermark Badge */}
              <div className="absolute top-4 left-4 z-20 pointer-events-none flex items-center gap-2">
                <span className="w-2 h-2 rounded-full bg-accent animate-pulse" />
                <span className="text-[10px] font-black uppercase tracking-widest text-white/90 drop-shadow">
                  Origin Mat Session
                </span>
              </div>

              {/* Play / Pause Overlay Icon when paused */}
              {!isPlaying && (
                <div className="absolute inset-0 z-20 flex items-center justify-center bg-black/40 backdrop-blur-[1px] transition-all">
                  <div className="w-16 h-16 rounded-full bg-accent/90 text-black flex items-center justify-center shadow-[0_0_25px_rgba(232,197,71,0.5)] transform group-hover:scale-105 transition-transform">
                    <Play className="w-7 h-7 fill-black ml-1" />
                  </div>
                </div>
              )}

              {/* Bottom Interactive Controls Bar */}
              <div className="absolute bottom-4 inset-x-4 z-20 flex items-center justify-between pointer-events-auto">
                {/* Play/Pause state button */}
                <button
                  type="button"
                  onClick={(e) => {
                    e.stopPropagation();
                    togglePlayback();
                  }}
                  aria-label={isPlaying ? 'Pause video' : 'Play video'}
                  className="px-2.5 py-1.5 bg-black/70 backdrop-blur-md border border-white/10 text-white hover:text-accent hover:border-accent/40 text-xs font-semibold tracking-wider uppercase transition-colors flex items-center gap-1.5"
                >
                  {isPlaying ? (
                    <>
                      <Pause className="w-3.5 h-3.5 text-accent" />
                      <span className="text-[10px]">Pause</span>
                    </>
                  ) : (
                    <>
                      <Play className="w-3.5 h-3.5 text-accent" />
                      <span className="text-[10px]">Play</span>
                    </>
                  )}
                </button>

                {/* Sound Toggle Button */}
                <button
                  type="button"
                  onClick={toggleSound}
                  aria-label={isMuted ? 'Enable video audio' : 'Mute video audio'}
                  className="px-3 py-1.5 bg-black/70 backdrop-blur-md border border-white/10 text-white hover:text-accent hover:border-accent/40 text-xs font-semibold tracking-wider uppercase transition-colors flex items-center gap-1.5 shadow-lg"
                >
                  {isMuted ? (
                    <>
                      <VolumeX className="w-3.5 h-3.5 text-text-secondary" />
                      <span className="text-[10px]">Sound Off</span>
                    </>
                  ) : (
                    <>
                      <Volume2 className="w-3.5 h-3.5 text-accent animate-pulse" />
                      <span className="text-[10px] text-accent">Sound On</span>
                    </>
                  )}
                </button>
              </div>

              {/* Looping Progress Bar along bottom edge */}
              <div
                aria-hidden="true"
                className="absolute bottom-0 inset-x-0 h-[2px] bg-white/20 z-30 pointer-events-none"
              >
                <div
                  className="h-full bg-accent transition-all duration-100 ease-linear"
                  style={{ width: `${progress}%` }}
                />
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
