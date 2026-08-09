import { useState, useRef } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { motion } from 'framer-motion';
import { Mail, Github, Linkedin, MapPin, Send, Loader2, AlertCircle, ShieldCheck } from 'lucide-react';
import { SectionTitle } from '@/components/shared/SectionTitle';
import { SeoTag } from '@/components/shared/SeoTag';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Label } from '@/components/ui/label';
import { personalInfo } from '@/data/portfolio';
import { FORMSPREE_ID, hasFormspree } from '@/config/forms';
import { trackEvent } from '@/lib/analytics';
import {
  sanitizeText,
  isLikelyBot,
  getRateLimitRemaining,
  recordSubmission,
  RATE_LIMIT_WINDOW_MS,
} from '@/lib/contactSecurity';

const contactSchema = z.object({
  name: z.string().trim().min(2, 'Name must be at least 2 characters').max(100, 'Name is too long'),
  email: z.string().trim().email('Please enter a valid email address').max(254, 'Email is too long'),
  subject: z.string().trim().min(4, 'Subject must be at least 4 characters').max(150, 'Subject is too long'),
  message: z.string().trim().min(20, 'Message must be at least 20 characters').max(5000, 'Message is too long (max 5000 characters)'),
  // Honeypot — left empty by humans. Bots that fill it get a fake "success"
  // (handled in onSubmit), so it must not block validation itself.
  company: z.string().optional(),
});
type ContactSchema = z.infer<typeof contactSchema>;

const contactItems = [
  { Icon: Mail,     label: 'Email',    value: personalInfo.email,       href: `mailto:${personalInfo.email}` },
  { Icon: Github,   label: 'GitHub',   value: 'github.com/yokanm',      href: personalInfo.githubUrl },
  { Icon: Linkedin, label: 'LinkedIn', value: 'Ayokanmi Ogunyebi',      href: personalInfo.linkedinUrl },
  { Icon: MapPin,   label: 'Location', value: personalInfo.location,    href: null },
];

function FormField({
  label,
  error,
  children,
  id,
}: {
  label: string;
  error?: string;
  children: React.ReactNode;
  id: string;
}) {
  return (
    <div className="space-y-2">
      <Label htmlFor={id}>{label}</Label>
      {children}
      {error && (
        <p id={`${id}-error`} role="alert" className="font-mono text-[0.6rem] text-secondary uppercase tracking-widest">{error}</p>
      )}
    </div>
  );
}

export function ContactPage() {
  const [submitted, setSubmitted]   = useState(false);
  const [submitting, setSubmitting] = useState(false);
  const [submitError, setSubmitError] = useState<string | null>(null);
  const renderedAt = useRef(Date.now());

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm<ContactSchema>({ resolver: zodResolver(contactSchema) });

  const onSubmit = async (data: ContactSchema) => {
    if (!hasFormspree) return;

    // ── Bot checks: honeypot + time-trap ───────────────────────
    // Fail silently (pretend success) so scrapers don't learn to
    // adapt — a real visitor would never trigger these.
    if (isLikelyBot({ honeypot: data.company ?? '', renderedAt: renderedAt.current })) {
      setSubmitted(true);
      reset();
      return;
    }

    // ── Client-side rate limit ──────────────────────────────────
    const remaining = getRateLimitRemaining();
    if (remaining > 0) {
      setSubmitError(`Please wait about ${Math.ceil(remaining / 1000)}s before sending another message.`);
      return;
    }

    setSubmitting(true);
    setSubmitError(null);
    try {
      const res = await fetch(`https://formspree.io/f/${FORMSPREE_ID}`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json', Accept: 'application/json' },
        body: JSON.stringify({
          name: sanitizeText(data.name),
          email: sanitizeText(data.email),
          subject: sanitizeText(data.subject),
          message: sanitizeText(data.message),
          _gotcha: data.company ?? '', // Formspree's own honeypot convention
        }),
      });
      if (res.ok) {
        recordSubmission();
        setSubmitted(true);
        reset();
        trackEvent('contact_form_submit');
      } else {
        setSubmitError('Something went wrong. Please email me directly.');
      }
    } catch {
      setSubmitError('Network error. Please try emailing me directly.');
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div className="px-6 md:px-12 lg:px-16 py-16 md:py-24">
      <SeoTag
        title="Contact"
        description={`Contact ${personalInfo.name} about full-time remote engineering roles or contract work. Form goes directly to the inbox; replies within 48 hours.`}
      />
      <SectionTitle
        index="01"
        label="Contact"
        title="Let's Talk"
        description="Hiring for a remote engineering role, or want to discuss a specific technical challenge? The form goes directly to my inbox. I reply within 48 hours."
      />

      <div className="grid grid-cols-1 lg:grid-cols-5 gap-12 lg:gap-16 max-w-6xl">

        {/* ── Form ─────────────────────────────────────────── */}
        <div className="lg:col-span-3">
          {submitted ? (
            <motion.div
              initial={{ opacity: 0, scale: 0.96 }}
              animate={{ opacity: 1, scale: 1 }}
              className="border-2 border-primary p-10 shadow-[8px_8px_0px_#ffd700] text-center">
              <div className="w-16 h-16 bg-primary flex items-center justify-center mx-auto mb-6">
                <Send size={28} className="text-on-primary" />
              </div>
              <h3 className="font-display font-black text-2xl uppercase text-on-surface mb-3">
                Message Received
              </h3>
              <p className="font-body text-sm text-on-surface-muted leading-relaxed mb-8">
                I'll reply within 48 hours.
              </p>
              <Button onClick={() => setSubmitted(false)} variant="outline">Send Another</Button>
            </motion.div>
          ) : (
            <motion.form
              initial={{ opacity: 0, y: 24 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.4 }}
              onSubmit={handleSubmit(onSubmit)}
              className="space-y-8 relative"
              aria-label="Contact form"
              noValidate>

              {/* Honeypot — invisible to real users, irresistible to bots.
                  Kept out of the tab order and hidden from screen readers. */}
              <div className="absolute -left-[9999px] top-auto w-px h-px overflow-hidden" aria-hidden="true">
                <label htmlFor="contact-company">Company</label>
                <input
                  {...register('company')}
                  id="contact-company"
                  type="text"
                  tabIndex={-1}
                  autoComplete="off"
                />
              </div>

              {/* {!hasFormspree && (
                <div className="flex items-start gap-3 border-2 border-secondary/40 bg-secondary/5 px-5 py-4" role="alert">
                  <AlertCircle size={15} className="text-secondary flex-shrink-0 mt-0.5" />
                  <div>
                    <p className="font-mono text-[0.6rem] uppercase tracking-widest text-secondary">
                      Contact form not configured
                    </p>
                    <p className="font-body text-xs text-on-surface-muted mt-1">
                      Set <code className="text-primary">VITE_FORMSPREE_ID</code> in your environment to enable submissions.
                      In the meantime, email me at{' '}
                      <a href={`mailto:${personalInfo.email}`} className="text-primary hover:underline">
                        {personalInfo.email}
                      </a>
                    </p>
                  </div>
                </div>
              )} */}

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-8">
                <FormField label="Name" error={errors.name?.message} id="contact-name">
                  <Input
                    {...register('name')}
                    id="contact-name"
                    placeholder="Your name"
                    autoComplete="name"
                    aria-describedby={errors.name ? 'contact-name-error' : undefined}
                    aria-invalid={!!errors.name}
                  />
                </FormField>
                <FormField label="Email" error={errors.email?.message} id="contact-email">
                  <Input
                    {...register('email')}
                    id="contact-email"
                    type="email"
                    placeholder="your@email.com"
                    autoComplete="email"
                    aria-describedby={errors.email ? 'contact-email-error' : undefined}
                    aria-invalid={!!errors.email}
                  />
                </FormField>
              </div>

              <FormField label="Subject" error={errors.subject?.message} id="contact-subject">
                <Input
                  {...register('subject')}
                  id="contact-subject"
                  placeholder="What's this about?"
                  aria-describedby={errors.subject ? 'contact-subject-error' : undefined}
                  aria-invalid={!!errors.subject}
                />
              </FormField>

              <FormField label="Message" error={errors.message?.message} id="contact-message">
                <Textarea
                  {...register('message')}
                  id="contact-message"
                  placeholder="Tell me about the role or what you're working on..."
                  rows={6}
                  aria-describedby={errors.message ? 'contact-message-error' : undefined}
                  aria-invalid={!!errors.message}
                />
              </FormField>

              {submitError && (
                <p role="alert" className="font-mono text-[0.6rem] text-secondary uppercase tracking-widest">
                  {submitError}
                </p>
              )}

              <div className="flex flex-col sm:flex-row sm:items-center gap-4">
                <Button
                  type="submit"
                  size="lg"
                  disabled={submitting || !hasFormspree}
                  aria-disabled={submitting || !hasFormspree}
                  className="w-full sm:w-auto"
                >
                  {submitting ? (
                    <><Loader2 size={17} className="animate-spin" aria-hidden="true" />Sending...</>
                  ) : (
                    <><Send size={17} aria-hidden="true" />Send Message</>
                  )}
                </Button>
                <p className="flex items-center gap-1.5 font-mono text-[0.55rem] uppercase tracking-widest text-on-surface-faint">
                  <ShieldCheck size={12} aria-hidden="true" />
                  Spam-protected · max {RATE_LIMIT_WINDOW_MS / 1000}s between sends
                </p>
              </div>
            </motion.form>
          )}
        </div>

        {/* ── Sidebar ───────────────────────────────────────── */}
        <div className="lg:col-span-2 space-y-6">
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.15 }}
            className="border-2 border-outline-strong/10 divide-y divide-outline-strong/5">
            {contactItems.map(({ Icon, label, value, href }) => (
              <div key={label} className="flex items-center gap-4 px-6 py-4 group">
                <div className="w-8 h-8 border border-outline flex items-center justify-center text-on-surface-faint flex-shrink-0 group-hover:border-primary group-hover:text-primary transition-all">
                  <Icon size={14} aria-hidden="true" />
                </div>
                <div className="min-w-0">
                  <p className="font-mono text-[0.55rem] uppercase tracking-widest text-on-surface-faint">
                    {label}
                  </p>
                  {href ? (
                    <a
                      href={href}
                      target={href.startsWith('mailto') ? undefined : '_blank'}
                      rel="noopener noreferrer"
                      onClick={() => trackEvent(`contact_click_${label.toLowerCase()}`)}
                      className="font-body text-sm text-on-surface-muted hover:text-primary transition-colors truncate block mt-0.5">
                      {value}
                    </a>
                  ) : (
                    <p className="font-body text-sm text-on-surface-muted mt-0.5">{value}</p>
                  )}
                </div>
              </div>
            ))}
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.25 }}
            className="border-2 border-success/30 bg-success/5 p-5">
            <div className="flex items-center gap-2 mb-2">
              <span className="w-2 h-2 bg-success animate-pulse" aria-hidden="true" />
              <span className="font-mono text-[0.6rem] uppercase tracking-widest text-success">
                Available Now
              </span>
            </div>
            <p className="font-body text-xs text-on-surface-muted leading-relaxed">
              Open to full-time remote roles and contract engagements.
              I reply within 48 hours.
            </p>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.3 }}>
            <a
              href={`mailto:${personalInfo.email}`}
              onClick={() => trackEvent('contact_click_email_direct')}
              className="flex items-center justify-between border-2 border-outline-strong/10 px-5 py-4 hover:border-primary hover:shadow-[4px_4px_0px_#ffd700] transition-all duration-150 group">
              <div className="flex items-center gap-3">
                <Mail size={15} className="text-primary" aria-hidden="true" />
                <span className="font-mono text-[0.65rem] uppercase tracking-widest text-on-surface-muted group-hover:text-on-surface transition-colors">
                  Email directly
                </span>
              </div>
              <span className="font-mono text-[0.6rem] text-on-surface-faint group-hover:text-primary transition-colors" aria-hidden="true">
                →
              </span>
            </a>
          </motion.div>
        </div>
      </div>
    </div>
  );
}
