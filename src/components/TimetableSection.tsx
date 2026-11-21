import { useState } from 'react';
import {
  Calendar,
  Clock,
  Filter,
  Maximize2,
  X,
  ChevronRight,
  Shield,
  MapPin,
  Sparkles,
} from 'lucide-react';
import {
  ClassSession,
  ClassType,
  CLASS_TYPE_META,
  DAYS_OF_WEEK,
  DAY_ABBREVIATIONS,
  DayOfWeek,
  getClassesByDay,
} from '../data/timetableData';
import { useIntersectionReveal } from '../hooks/useIntersectionReveal';
import AmbientGlow from './AmbientGlow';
import SectionHeading from './SectionHeading';

interface TimetableSectionProps {
  onBookClick: () => void;
}

type FilterOption = 'all' | ClassType;

const FILTER_BUTTONS: { type: FilterOption; label: string }[] = [
  { type: 'all', label: 'All Classes' },
  { type: 'gi', label: 'Gi' },
  { type: 'nogi', label: 'No-Gi' },
  { type: 'openmat', label: 'Open Mat' },
  { type: 'kids', label: 'Kids' },
];

export default function TimetableSection({ onBookClick }: TimetableSectionProps) {
  const [selectedDay, setSelectedDay] = useState<DayOfWeek>('Monday');
  const [activeFilter, setActiveFilter] = useState<FilterOption>('all');
  const [isLightboxOpen, setIsLightboxOpen] = useState(false);
  const [viewMode, setViewMode] = useState<'day' | 'week'>('day');

  const { ref, isVisible } = useIntersectionReveal({ threshold: 0.1 });

  const activeDayClasses = getClassesByDay(selectedDay, activeFilter);

  return (
    <section
      id="schedule"
      ref={ref}
      className="relative border-b border-border py-24 md:py-32 bg-bg overflow-hidden"
    >
      {/* Background Ambient Glow */}
      <AmbientGlow
        size="lg"
        className="top-1/3 left-1/2 -translate-x-1/2 -translate-y-1/2 opacity-25"
      />

      <div className="relative max-w-6xl mx-auto px-6 lg:px-8">
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-12">
          <SectionHeading
            category="Schedule & Timetable"
            title="When Can You Train?"
            subtitle="21+ weekly classes across 7 days. Early mornings, midday sessions, and prime evenings to fit around your work and life."
            isVisible={isVisible}
          />

          {/* Quick Action: View Original Timetable Image & Mode Toggle */}
          <div className="flex items-center gap-3 self-start md:self-end">
            <div className="hidden sm:inline-flex p-1 bg-surface border border-border">
              <button
                onClick={() => setViewMode('day')}
                className={`px-3 py-1.5 text-xs font-bold uppercase tracking-wider transition-colors ${
                  viewMode === 'day'
                    ? 'bg-accent text-black'
                    : 'text-text-secondary hover:text-white'
                }`}
              >
                Day View
              </button>
              <button
                onClick={() => setViewMode('week')}
                className={`px-3 py-1.5 text-xs font-bold uppercase tracking-wider transition-colors ${
                  viewMode === 'week'
                    ? 'bg-accent text-black'
                    : 'text-text-secondary hover:text-white'
                }`}
              >
                Full Week Grid
              </button>
            </div>

            <button
              onClick={() => setIsLightboxOpen(true)}
              className="inline-flex items-center gap-2 text-xs font-bold uppercase tracking-widest px-4 py-2.5 bg-surface border border-border text-white hover:border-accent hover:text-accent transition-all duration-200"
              title="View original printed timetable board"
            >
              <Maximize2 size={14} />
              <span>Original Board</span>
            </button>
          </div>
        </div>

        {/* Filter Pills */}
        <div className="flex flex-wrap items-center gap-2 mb-8">
          <span className="text-xs font-bold uppercase tracking-widest text-text-secondary mr-2 inline-flex items-center gap-1.5">
            <Filter size={13} className="text-accent" /> Filter:
          </span>
          {FILTER_BUTTONS.map((item) => {
            const isActive = activeFilter === item.type;
            return (
              <button
                key={item.type}
                onClick={() => setActiveFilter(item.type)}
                className={`text-xs font-bold uppercase tracking-wider px-3.5 py-1.5 border transition-all duration-200 ${
                  isActive
                    ? 'bg-accent text-black border-accent shadow-[0_0_12px_rgba(232,197,71,0.25)]'
                    : 'bg-surface text-text-secondary border-border hover:border-text-secondary hover:text-white'
                }`}
              >
                {item.label}
              </button>
            );
          })}
        </div>

        {viewMode === 'day' ? (
          <div>
            {/* 7-Day Day Selector Tabs */}
            <div className="grid grid-cols-7 gap-1 sm:gap-2 mb-8 border-b border-border/60 pb-3">
              {DAYS_OF_WEEK.map((day) => {
                const isSelected = selectedDay === day;
                const classesForDay = getClassesByDay(day, activeFilter);
                return (
                  <button
                    key={day}
                    onClick={() => setSelectedDay(day)}
                    className={`py-3 px-1 sm:px-3 text-center transition-all duration-200 border-b-2 flex flex-col items-center justify-center gap-1 ${
                      isSelected
                        ? 'border-accent bg-surface-raised text-white font-black shadow-[inset_0_-2px_0_#E8C547]'
                        : 'border-transparent text-text-secondary hover:text-white hover:bg-surface/50'
                    }`}
                  >
                    <span className="text-xs sm:text-sm uppercase tracking-wider">
                      <span className="hidden sm:inline">{day}</span>
                      <span className="sm:hidden">{DAY_ABBREVIATIONS[day]}</span>
                    </span>
                    <span
                      className={`text-[10px] font-mono px-1.5 py-0.2 rounded-none border ${
                        isSelected
                          ? 'bg-accent/20 border-accent/40 text-accent'
                          : 'bg-surface border-border text-text-secondary/70'
                      }`}
                    >
                      {classesForDay.length} {classesForDay.length === 1 ? 'class' : 'classes'}
                    </span>
                  </button>
                );
              })}
            </div>

            {/* Class Cards for Selected Day */}
            <div className="space-y-3">
              {activeDayClasses.length === 0 ? (
                <div className="bg-surface border border-border p-12 text-center">
                  <Calendar size={32} className="mx-auto text-text-secondary/60 mb-3" />
                  <p className="text-white font-bold uppercase tracking-wider text-sm mb-1">
                    No {activeFilter.toUpperCase()} Classes on {selectedDay}
                  </p>
                  <p className="text-text-secondary text-sm max-w-sm mx-auto mb-4">
                    Try selecting another filter tag or switch to a different day of the week.
                  </p>
                  <button
                    onClick={() => setActiveFilter('all')}
                    className="text-xs font-bold uppercase tracking-widest text-accent hover:underline"
                  >
                    Show all classes on {selectedDay} →
                  </button>
                </div>
              ) : (
                activeDayClasses.map((session: ClassSession) => {
                  const meta = CLASS_TYPE_META[session.type];
                  return (
                    <div
                      key={session.id}
                      className={`group bg-surface-raised border border-border border-l-4 ${meta.borderStyle} p-5 sm:p-6 transition-all duration-200 hover:border-border hover:bg-surface-hover flex flex-col sm:flex-row sm:items-center justify-between gap-4`}
                    >
                      {/* Left info: Time & Title */}
                      <div className="flex-1">
                        <div className="flex flex-wrap items-center gap-2 mb-2">
                          <span
                            className={`text-[10px] uppercase tracking-widest font-bold px-2 py-0.5 border ${meta.badgeStyle}`}
                          >
                            {meta.label}
                          </span>
                          <span className="text-[10px] uppercase tracking-wider text-text-secondary bg-surface px-2 py-0.5 border border-border">
                            {session.level}
                          </span>
                          {session.location && (
                            <span className="text-[10px] uppercase tracking-wider text-accent bg-accent/10 border border-accent/30 px-2 py-0.5 inline-flex items-center gap-1">
                              <MapPin size={10} /> {session.location}
                            </span>
                          )}
                        </div>

                        <div className="flex flex-col sm:flex-row sm:items-baseline gap-1 sm:gap-4">
                          <h3 className="text-xl sm:text-2xl font-black uppercase tracking-wide text-white group-hover:text-accent transition-colors">
                            {session.title}
                          </h3>
                          <div className="flex items-center gap-1.5 text-text-secondary text-sm font-mono">
                            <Clock size={14} className="text-accent shrink-0" />
                            <span>{session.displayTime}</span>
                          </div>
                        </div>

                        {session.description && (
                          <p className="text-text-secondary text-xs sm:text-sm mt-2 max-w-2xl leading-relaxed">
                            {session.description}
                          </p>
                        )}
                      </div>

                      {/* Right action: Book Trial Class */}
                      <div className="flex items-center gap-3 shrink-0 pt-2 sm:pt-0 border-t sm:border-t-0 border-border/60">
                        <button
                          onClick={onBookClick}
                          className="w-full sm:w-auto bg-accent text-black font-bold uppercase tracking-widest text-xs px-5 py-3 hover:bg-white transition-all duration-200 inline-flex items-center justify-center gap-2"
                        >
                          <span>Book This Slot</span>
                          <ChevronRight size={14} />
                        </button>
                      </div>
                    </div>
                  );
                })
              )}
            </div>
          </div>
        ) : (
          /* Full Week Matrix Grid for Desktop View */
          <div className="bg-surface border border-border overflow-x-auto">
            <div className="min-w-[840px]">
              <div className="grid grid-cols-7 border-b border-border bg-surface-raised text-center font-bold text-xs uppercase tracking-wider text-white">
                {DAYS_OF_WEEK.map((d) => (
                  <div key={d} className="p-3 border-r last:border-r-0 border-border">
                    <p className="text-accent">{DAY_ABBREVIATIONS[d]}</p>
                    <p className="text-[10px] text-text-secondary font-normal">{d}</p>
                  </div>
                ))}
              </div>

              <div className="grid grid-cols-7 min-h-[460px]">
                {DAYS_OF_WEEK.map((day) => {
                  const daySessions = getClassesByDay(day, activeFilter);
                  return (
                    <div
                      key={day}
                      className="border-r last:border-r-0 border-border p-2 space-y-2 bg-surface/30"
                    >
                      {daySessions.map((session) => {
                        const meta = CLASS_TYPE_META[session.type];
                        return (
                          <div
                            key={session.id}
                            onClick={onBookClick}
                            className={`p-2.5 border border-border bg-surface-raised hover:border-accent hover:bg-surface-hover cursor-pointer transition-all duration-200 text-left border-l-2 ${meta.borderStyle}`}
                          >
                            <span
                              className={`text-[9px] uppercase tracking-wider font-bold block mb-1 text-accent`}
                            >
                              {session.displayTime}
                            </span>
                            <p className="text-xs font-bold text-white leading-tight mb-1">
                              {session.title}
                            </p>
                            <span
                              className={`inline-block text-[8px] uppercase tracking-widest px-1.5 py-0.2 border ${meta.badgeStyle}`}
                            >
                              {meta.label}
                            </span>
                          </div>
                        );
                      })}
                      {daySessions.length === 0 && (
                        <div className="h-full flex items-center justify-center p-4">
                          <p className="text-[10px] text-text-secondary/40 uppercase tracking-widest text-center">
                            No classes
                          </p>
                        </div>
                      )}
                    </div>
                  );
                })}
              </div>
            </div>
          </div>
        )}

        {/* Timetable Assurance Footer */}
        <div className="mt-8 p-4 sm:p-5 bg-surface border border-border flex flex-col sm:flex-row items-center justify-between gap-4">
          <div className="flex items-center gap-3">
            <Shield className="text-accent shrink-0" size={20} />
            <p className="text-xs sm:text-sm text-text-secondary">
              <strong className="text-white">Beginner friendly:</strong> You are welcome to attend any
              All-Levels Gi or No-Gi class for your first free trial session.
            </p>
          </div>
          <button
            onClick={onBookClick}
            className="text-xs font-bold uppercase tracking-widest text-accent hover:text-white transition-colors whitespace-nowrap inline-flex items-center gap-1.5"
          >
            <Sparkles size={13} />
            <span>Claim Your Free Pass →</span>
          </button>
        </div>
      </div>

      {/* Lightbox / Modal for Original Schedule Board */}
      {isLightboxOpen && (
        <div
          role="dialog"
          aria-modal="true"
          aria-label="Official Origin BJJ Timetable"
          className="fixed inset-0 z-50 bg-black/90 backdrop-blur-md flex items-center justify-center p-4 sm:p-6"
          onClick={() => setIsLightboxOpen(false)}
        >
          <div
            className="relative max-w-4xl w-full bg-surface-raised border border-border p-4 sm:p-6"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="flex items-center justify-between pb-4 border-b border-border mb-4">
              <div>
                <h4 className="text-base sm:text-lg font-black uppercase tracking-widest text-white">
                  Official Timetable Board
                </h4>
                <p className="text-xs text-text-secondary">
                  Origin Brazilian Jiu Jitsu · Verified Schedule
                </p>
              </div>
              <button
                onClick={() => setIsLightboxOpen(false)}
                className="p-2 text-text-secondary hover:text-white hover:bg-surface transition-colors"
                aria-label="Close schedule preview"
              >
                <X size={20} />
              </button>
            </div>

            <div className="overflow-hidden border border-border bg-black flex items-center justify-center">
              <img
                src="/timetable.jpg"
                alt="Official Origin BJJ Weekly Timetable"
                className="w-full h-auto max-h-[75vh] object-contain"
              />
            </div>

            <div className="mt-4 flex flex-col sm:flex-row items-center justify-between gap-3 text-xs text-text-secondary">
              <p>Schedule subject to bank holidays and special seminars.</p>
              <button
                onClick={() => {
                  setIsLightboxOpen(false);
                  onBookClick();
                }}
                className="bg-accent text-black font-bold uppercase tracking-widest px-6 py-2.5 hover:bg-white transition-colors"
              >
                Book Your First Class
              </button>
            </div>
          </div>
        </div>
      )}
    </section>
  );
}
