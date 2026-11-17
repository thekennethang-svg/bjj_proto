import { useEffect, useRef, useState, type FormEvent } from 'react';

interface BookingModalProps {
  isOpen: boolean;
  onClose: () => void;
}

interface FormData {
  fullName: string;
  email: string;
  experience: string;
  preferredTime: string;
}

const EMPTY_FORM: FormData = {
  fullName: '',
  email: '',
  experience: '',
  preferredTime: '',
};

const EXPERIENCE_OPTIONS = [
  'Complete Beginner',
  'Some Experience (under 1 year)',
  'Intermediate (1–3 years)',
  'Experienced (3+ years)',
];

const TIME_OPTIONS = [
  'Weekday Morning (6:30am)',
  'Weekday Evening (6:30pm)',
  'Saturday Morning (10:00am)',
];

export default function BookingModal({ isOpen, onClose }: BookingModalProps) {
  const [formData, setFormData] = useState<FormData>(EMPTY_FORM);
  const [errors, setErrors] = useState<Partial<FormData>>({});
  const [submitted, setSubmitted] = useState(false);
  const [submittedData, setSubmittedData] = useState<FormData>(EMPTY_FORM);

  const dialogRef = useRef<HTMLDivElement>(null);
  const closeBtnRef = useRef<HTMLButtonElement>(null);

  const resetState = () => {
    setFormData(EMPTY_FORM);
    setErrors({});
    setSubmitted(false);
    setSubmittedData(EMPTY_FORM);
  };

  useEffect(() => {
    if (!isOpen) return;

    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose();
    };
    document.addEventListener('keydown', onKey);
    const prevOverflow = document.body.style.overflow;
    document.body.style.overflow = 'hidden';

    const t = setTimeout(() => closeBtnRef.current?.focus(), 50);

    return () => {
      document.removeEventListener('keydown', onKey);
      document.body.style.overflow = prevOverflow;
      clearTimeout(t);
    };
  }, [isOpen, onClose]);

  useEffect(() => {
    if (!isOpen) {
      const t = setTimeout(resetState, 200);
      return () => clearTimeout(t);
    }
  }, [isOpen]);

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key !== 'Tab') return;
    const root = dialogRef.current;
    if (!root) return;
    const focusable = root.querySelectorAll<HTMLElement>(
      'button, [href], input, select, textarea, [tabindex]:not([tabindex="-1"])'
    );
    if (focusable.length === 0) return;
    const first = focusable[0];
    const last = focusable[focusable.length - 1];
    if (e.shiftKey && document.activeElement === first) {
      e.preventDefault();
      last.focus();
    } else if (!e.shiftKey && document.activeElement === last) {
      e.preventDefault();
      first.focus();
    }
  };

  const validate = (): boolean => {
    const next: Partial<FormData> = {};
    if (!formData.fullName.trim()) next.fullName = 'Please enter your full name.';
    if (!formData.email.trim()) {
      next.email = 'Please enter your email address.';
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email.trim())) {
      next.email = 'Please enter a valid email address.';
    }
    if (!formData.experience) next.experience = 'Please select your experience level.';
    if (!formData.preferredTime) next.preferredTime = 'Please select a preferred time.';
    setErrors(next);
    return Object.keys(next).length === 0;
  };

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    if (!validate()) return;
    setSubmittedData(formData);
    setSubmitted(true);
  };

  const update = (field: keyof FormData, value: string) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
    if (errors[field]) setErrors((prev) => ({ ...prev, [field]: undefined }));
  };

  if (!isOpen) return null;

  const firstName = submittedData.fullName.trim().split(/\s+/)[0] || '';

  const inputBase =
    'w-full bg-bg border px-4 py-3 text-white text-sm placeholder-text-secondary/60 focus:outline-none transition-colors rounded-none';

  return (
    <div
      className="fixed inset-0 z-50 bg-black/80 flex items-center justify-center p-4"
      onMouseDown={(e) => {
        if (e.target === e.currentTarget) onClose();
      }}
    >
      <div
        ref={dialogRef}
        role="dialog"
        aria-modal="true"
        aria-label="Book a free class"
        onKeyDown={handleKeyDown}
        className="relative w-full max-w-md bg-surface border border-border max-h-[90vh] overflow-y-auto rounded-none"
      >
        <button
          ref={closeBtnRef}
          onClick={onClose}
          aria-label="Close"
          className="absolute top-4 right-4 p-2 text-text-secondary hover:text-white transition-colors"
        >
          <svg width="20" height="20" viewBox="0 0 20 20" fill="none" stroke="currentColor" strokeWidth="2">
            <path d="M4 4l12 12M16 4L4 16" strokeLinecap="square" />
          </svg>
        </button>

        <div className="p-8 md:p-10">
          {!submitted ? (
            <>
              <p className="text-accent text-xs uppercase tracking-widest font-bold mb-3">
                Free Trial
              </p>
              <h2 className="font-black uppercase tracking-widest text-white text-2xl mb-2">
                Book Your Free Class
              </h2>
              <p className="text-text-secondary text-sm mb-8 leading-relaxed">
                Reserve your spot in a Fundamentals session. No card required.
              </p>

              <form onSubmit={handleSubmit} noValidate className="space-y-5">
                <div>
                  <label
                    htmlFor="fullName"
                    className="block text-xs uppercase tracking-widest text-text-secondary font-bold mb-2"
                  >
                    Full Name
                  </label>
                  <input
                    id="fullName"
                    type="text"
                    value={formData.fullName}
                    onChange={(e) => update('fullName', e.target.value)}
                    className={`${inputBase} ${
                      errors.fullName ? 'border-red-500' : 'border-border focus:border-accent'
                    }`}
                    placeholder="Jane Smith"
                    aria-invalid={!!errors.fullName}
                    aria-describedby={errors.fullName ? 'fullName-error' : undefined}
                  />
                  {errors.fullName && (
                    <p id="fullName-error" className="mt-2 text-xs text-red-400">
                      {errors.fullName}
                    </p>
                  )}
                </div>

                <div>
                  <label
                    htmlFor="email"
                    className="block text-xs uppercase tracking-widest text-text-secondary font-bold mb-2"
                  >
                    Email Address
                  </label>
                  <input
                    id="email"
                    type="email"
                    value={formData.email}
                    onChange={(e) => update('email', e.target.value)}
                    className={`${inputBase} ${
                      errors.email ? 'border-red-500' : 'border-border focus:border-accent'
                    }`}
                    placeholder="jane@example.com"
                    aria-invalid={!!errors.email}
                    aria-describedby={errors.email ? 'email-error' : undefined}
                  />
                  {errors.email && (
                    <p id="email-error" className="mt-2 text-xs text-red-400">
                      {errors.email}
                    </p>
                  )}
                </div>

                <div>
                  <label
                    htmlFor="experience"
                    className="block text-xs uppercase tracking-widest text-text-secondary font-bold mb-2"
                  >
                    Experience Level
                  </label>
                  <select
                    id="experience"
                    value={formData.experience}
                    onChange={(e) => update('experience', e.target.value)}
                    className={`${inputBase} ${
                      errors.experience ? 'border-red-500' : 'border-border focus:border-accent'
                    }`}
                    aria-invalid={!!errors.experience}
                    aria-describedby={errors.experience ? 'experience-error' : undefined}
                  >
                    <option value="">Select your experience</option>
                    {EXPERIENCE_OPTIONS.map((opt) => (
                      <option key={opt} value={opt}>
                        {opt}
                      </option>
                    ))}
                  </select>
                  {errors.experience && (
                    <p id="experience-error" className="mt-2 text-xs text-red-400">
                      {errors.experience}
                    </p>
                  )}
                </div>

                <div>
                  <label
                    htmlFor="preferredTime"
                    className="block text-xs uppercase tracking-widest text-text-secondary font-bold mb-2"
                  >
                    Preferred Time
                  </label>
                  <select
                    id="preferredTime"
                    value={formData.preferredTime}
                    onChange={(e) => update('preferredTime', e.target.value)}
                    className={`${inputBase} ${
                      errors.preferredTime ? 'border-red-500' : 'border-border focus:border-accent'
                    }`}
                    aria-invalid={!!errors.preferredTime}
                    aria-describedby={errors.preferredTime ? 'preferredTime-error' : undefined}
                  >
                    <option value="">Select a time</option>
                    {TIME_OPTIONS.map((opt) => (
                      <option key={opt} value={opt}>
                        {opt}
                      </option>
                    ))}
                  </select>
                  {errors.preferredTime && (
                    <p id="preferredTime-error" className="mt-2 text-xs text-red-400">
                      {errors.preferredTime}
                    </p>
                  )}
                </div>

                <button
                  type="submit"
                  className="w-full bg-accent text-black font-bold uppercase tracking-widest text-sm px-8 py-4 rounded-none hover:bg-white transition-colors duration-200 mt-6"
                >
                  Confirm My Spot
                </button>
              </form>
            </>
          ) : (
            <div className="text-center py-6">
              <div className="mx-auto mb-6 w-14 h-14 flex items-center justify-center border-2 border-accent rounded-none">
                <svg width="28" height="28" viewBox="0 0 28 28" fill="none" stroke="#E8C547" strokeWidth="3">
                  <path d="M6 14.5l5 5L22 8" strokeLinecap="square" />
                </svg>
              </div>
              <h2 className="font-black uppercase tracking-widest text-white text-2xl mb-4">
                You're confirmed.
              </h2>
              <p className="text-text-secondary text-sm leading-relaxed mb-8">
                We'll send details to{' '}
                <span className="text-white font-medium">{submittedData.email}</span>.
                <br />
                See you on the mat, <span className="text-accent font-bold">{firstName}</span>.
              </p>
              <button
                onClick={onClose}
                className="text-accent text-sm font-bold uppercase tracking-widest hover:text-white transition-colors"
              >
                Close
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
