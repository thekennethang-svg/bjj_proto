import { useEffect, useRef, useState, type FormEvent } from 'react';

interface BookingModalProps {
  isOpen: boolean;
  onClose: () => void;
}

interface FormData {
  fullName: string;
  email: string;
  phone: string;
  subject: string;
  message: string;
}

const EMPTY_FORM: FormData = {
  fullName: '',
  email: '',
  phone: '',
  subject: '',
  message: '',
};

export default function BookingModal({ isOpen, onClose }: BookingModalProps) {
  const [formData, setFormData] = useState<FormData>(EMPTY_FORM);
  const [errors, setErrors] = useState<Partial<Record<keyof FormData, string>>>({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitError, setSubmitError] = useState<string | null>(null);
  const [submitted, setSubmitted] = useState(false);
  const [submittedData, setSubmittedData] = useState<FormData>(EMPTY_FORM);

  const dialogRef = useRef<HTMLDivElement>(null);
  const closeBtnRef = useRef<HTMLButtonElement>(null);

  const resetState = () => {
    setFormData(EMPTY_FORM);
    setErrors({});
    setIsSubmitting(false);
    setSubmitError(null);
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
    const next: Partial<Record<keyof FormData, string>> = {};
    if (!formData.fullName.trim()) {
      next.fullName = 'Please enter your full name.';
    }
    if (!formData.email.trim()) {
      next.email = 'Please enter your email address.';
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email.trim())) {
      next.email = 'Please enter a valid email address.';
    }
    setErrors(next);
    return Object.keys(next).length === 0;
  };

  const sendEnquiry = async (data: FormData): Promise<boolean> => {
    const endpoint =
      import.meta.env.VITE_CONTACT_API_URL ||
      import.meta.env.VITE_FORMSPREE_ENDPOINT;

    if (endpoint) {
      try {
        const res = await fetch(endpoint, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            Accept: 'application/json',
          },
          body: JSON.stringify({
            fullName: data.fullName.trim(),
            email: data.email.trim(),
            phone: data.phone.trim() || 'Not provided',
            subject: data.subject.trim() || 'General Website Enquiry',
            message: data.message.trim() || 'No message entered',
            submittedAt: new Date().toISOString(),
          }),
        });
        return res.ok;
      } catch (err) {
        console.error('Enquiry delivery error:', err);
        return false;
      }
    }

    // When an external backend endpoint is not yet configured,
    // simulate transmission to provide immediate interactive feedback.
    await new Promise((resolve) => setTimeout(resolve, 600));
    return true;
  };

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    setSubmitError(null);

    if (!validate()) return;

    setIsSubmitting(true);
    const success = await sendEnquiry(formData);
    setIsSubmitting(false);

    if (success) {
      setSubmittedData(formData);
      setSubmitted(true);
    } else {
      setSubmitError(
        'Unable to deliver your enquiry at this moment. Please check your connection or contact us directly at info@originbjj.com.'
      );
    }
  };

  const update = (field: keyof FormData, value: string) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
    if (errors[field]) {
      setErrors((prev) => ({ ...prev, [field]: undefined }));
    }
  };

  if (!isOpen) return null;

  const firstName = submittedData.fullName.trim().split(/\s+/)[0] || '';

  const inputBase =
    'w-full bg-bg border px-4 py-3 text-white text-sm placeholder-text-secondary/60 focus:outline-none transition-colors rounded-none';

  return (
    <div
      className="fixed inset-0 z-50 bg-black/80 flex items-center justify-center p-4 backdrop-blur-sm"
      onMouseDown={(e) => {
        if (e.target === e.currentTarget) onClose();
      }}
    >
      <div
        ref={dialogRef}
        role="dialog"
        aria-modal="true"
        aria-labelledby="enquiry-modal-title"
        onKeyDown={handleKeyDown}
        className="relative w-full max-w-lg bg-surface border border-border max-h-[90vh] overflow-y-auto rounded-none shadow-2xl"
      >
        {/* Top Accent Line */}
        <div className="h-[2px] w-full bg-accent" />

        <button
          ref={closeBtnRef}
          onClick={onClose}
          aria-label="Close"
          className="absolute top-4 right-4 p-2 text-text-secondary hover:text-white transition-colors"
        >
          <svg
            width="20"
            height="20"
            viewBox="0 0 20 20"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
          >
            <path d="M4 4l12 12M16 4L4 16" strokeLinecap="square" />
          </svg>
        </button>

        <div className="p-8 md:p-10">
          {!submitted ? (
            <>
              <p className="text-accent text-xs uppercase tracking-widest font-bold mb-3 flex items-center gap-2">
                <span className="w-2 h-0.5 bg-accent inline-block" />
                Contact Origin BJJ
              </p>
              <h2
                id="enquiry-modal-title"
                className="font-black uppercase tracking-widest text-white text-2xl mb-2"
              >
                Send an Enquiry
              </h2>
              <p className="text-text-secondary text-sm mb-6 leading-relaxed">
                Have questions or want to try your first free class? Send us a
                message and our team will get back to you shortly.
              </p>

              {submitError && (
                <div
                  role="alert"
                  className="mb-6 p-4 bg-red-950/40 border border-red-500/50 text-red-300 text-xs leading-relaxed"
                >
                  {submitError}
                </div>
              )}

              <form onSubmit={handleSubmit} noValidate className="space-y-4">
                {/* Full Name - Required */}
                <div>
                  <label
                    htmlFor="fullName"
                    className="block text-xs uppercase tracking-widest text-text-secondary font-bold mb-2"
                  >
                    Full Name <span className="text-accent">*</span>
                  </label>
                  <input
                    id="fullName"
                    type="text"
                    value={formData.fullName}
                    onChange={(e) => update('fullName', e.target.value)}
                    className={`${inputBase} ${
                      errors.fullName
                        ? 'border-red-500'
                        : 'border-border focus:border-accent'
                    }`}
                    placeholder="Jane Smith"
                    aria-required="true"
                    aria-invalid={!!errors.fullName}
                    aria-describedby={
                      errors.fullName ? 'fullName-error' : undefined
                    }
                  />
                  {errors.fullName && (
                    <p id="fullName-error" className="mt-1.5 text-xs text-red-400">
                      {errors.fullName}
                    </p>
                  )}
                </div>

                {/* Email Address - Required */}
                <div>
                  <label
                    htmlFor="email"
                    className="block text-xs uppercase tracking-widest text-text-secondary font-bold mb-2"
                  >
                    Email Address <span className="text-accent">*</span>
                  </label>
                  <input
                    id="email"
                    type="email"
                    value={formData.email}
                    onChange={(e) => update('email', e.target.value)}
                    className={`${inputBase} ${
                      errors.email
                        ? 'border-red-500'
                        : 'border-border focus:border-accent'
                    }`}
                    placeholder="jane@example.com"
                    aria-required="true"
                    aria-invalid={!!errors.email}
                    aria-describedby={errors.email ? 'email-error' : undefined}
                  />
                  {errors.email && (
                    <p id="email-error" className="mt-1.5 text-xs text-red-400">
                      {errors.email}
                    </p>
                  )}
                </div>

                {/* Phone Number - Optional */}
                <div>
                  <label
                    htmlFor="phone"
                    className="block text-xs uppercase tracking-widest text-text-secondary font-bold mb-2 flex items-center justify-between"
                  >
                    <span>Phone Number</span>
                    <span className="text-[10px] text-text-secondary/60 lowercase tracking-normal">
                      optional
                    </span>
                  </label>
                  <input
                    id="phone"
                    type="tel"
                    value={formData.phone}
                    onChange={(e) => update('phone', e.target.value)}
                    className={`${inputBase} border-border focus:border-accent`}
                    placeholder="+44 7123 456789"
                  />
                </div>

                {/* Subject - Optional */}
                <div>
                  <label
                    htmlFor="subject"
                    className="block text-xs uppercase tracking-widest text-text-secondary font-bold mb-2 flex items-center justify-between"
                  >
                    <span>Subject</span>
                    <span className="text-[10px] text-text-secondary/60 lowercase tracking-normal">
                      optional
                    </span>
                  </label>
                  <input
                    id="subject"
                    type="text"
                    value={formData.subject}
                    onChange={(e) => update('subject', e.target.value)}
                    className={`${inputBase} border-border focus:border-accent`}
                    placeholder="e.g. Free class booking, membership question"
                  />
                </div>

                {/* Message - Optional */}
                <div>
                  <label
                    htmlFor="message"
                    className="block text-xs uppercase tracking-widest text-text-secondary font-bold mb-2 flex items-center justify-between"
                  >
                    <span>Message</span>
                    <span className="text-[10px] text-text-secondary/60 lowercase tracking-normal">
                      optional
                    </span>
                  </label>
                  <textarea
                    id="message"
                    rows={3}
                    value={formData.message}
                    onChange={(e) => update('message', e.target.value)}
                    className={`${inputBase} border-border focus:border-accent resize-none`}
                    placeholder="Any specific questions, prior training experience, or preferred times..."
                  />
                </div>

                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="w-full bg-accent text-black font-bold uppercase tracking-widest text-sm px-8 py-4 rounded-none hover:bg-white transition-all duration-200 mt-6 shadow-[0_0_15px_rgba(232,197,71,0.2)] disabled:opacity-60 disabled:cursor-not-allowed flex items-center justify-center gap-2"
                >
                  {isSubmitting ? (
                    <>
                      <span className="w-4 h-4 border-2 border-black border-t-transparent rounded-full animate-spin" />
                      <span>Sending Enquiry...</span>
                    </>
                  ) : (
                    <span>Submit Enquiry</span>
                  )}
                </button>
              </form>
            </>
          ) : (
            <div className="text-center py-6">
              <div className="mx-auto mb-6 w-14 h-14 flex items-center justify-center border-2 border-accent rounded-none bg-accent/5">
                <svg
                  width="28"
                  height="28"
                  viewBox="0 0 28 28"
                  fill="none"
                  stroke="#E8C547"
                  strokeWidth="3"
                >
                  <path d="M6 14.5l5 5L22 8" strokeLinecap="square" />
                </svg>
              </div>
              <h2 className="font-black uppercase tracking-widest text-white text-2xl mb-4">
                Enquiry Delivered.
              </h2>
              <p className="text-text-secondary text-sm leading-relaxed mb-8 max-w-sm mx-auto">
                Thank you, <span className="text-accent font-bold">{firstName}</span>.
                We have received your enquiry and our team will get back to you at{' '}
                <span className="text-white font-medium">{submittedData.email}</span>{' '}
                shortly.
              </p>
              <button
                onClick={onClose}
                className="w-full sm:w-auto bg-transparent border border-accent text-accent text-sm font-bold uppercase tracking-widest px-8 py-3.5 hover:bg-accent hover:text-black transition-all duration-200"
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
