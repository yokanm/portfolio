import { Link } from 'react-router-dom';
import { Github, Linkedin, Mail } from 'lucide-react';
import { personalInfo } from '@/data/portfolio';
import { footerNavItems } from '@/data/navigation';
import { trackEvent } from '@/lib/analytics';

const year = new Date().getFullYear();

export function Footer() {
  return (
    <footer className="mt-auto border-t-2 border-outline-strong/10 bg-background">
      <div className="px-6 py-8 md:py-10 flex flex-col md:flex-row items-center justify-between gap-6">
        <div>
          <Link to="/" className="block" aria-label={`${personalInfo.name} — home`}>
            <span className="font-display font-black text-on-surface text-sm uppercase tracking-tight">
              {personalInfo.name}
            </span>
          </Link>
          <p className="font-mono text-[0.6rem] text-on-surface-faint uppercase tracking-widest mt-1">
            Full-Stack · Security-First · Builder
          </p>
        </div>

        <nav aria-label="Footer navigation">
          <ul className="flex gap-6 list-none">
            {footerNavItems.map(({ path, label }) => (
              <li key={path}>
                <Link
                  to={path}
                  className="font-mono text-[0.6rem] uppercase tracking-widest text-on-surface-faint hover:text-primary transition-colors"
                >
                  {label}
                </Link>
              </li>
            ))}
          </ul>
        </nav>

        <div className="flex items-center gap-3" aria-label="Social links">
          <a
            href={personalInfo.githubUrl}
            target="_blank"
            rel="noopener noreferrer"
            aria-label="GitHub profile"
            onClick={() => trackEvent('github_click')}
            className="p-2 border-2 border-outline text-on-surface-faint hover:border-primary hover:text-primary transition-all duration-100"
          >
            <Github size={13} aria-hidden="true" />
          </a>
          <a
            href={personalInfo.linkedinUrl}
            target="_blank"
            rel="noopener noreferrer"
            aria-label="LinkedIn profile"
            onClick={() => trackEvent('linkedin_click')}
            className="p-2 border-2 border-outline text-on-surface-faint hover:border-primary hover:text-primary transition-all duration-100"
          >
            <Linkedin size={13} aria-hidden="true" />
          </a>
          <a
            href={`mailto:${personalInfo.email}`}
            aria-label="Send email"
            onClick={() => trackEvent('contact_click_email')}
            className="p-2 border-2 border-outline text-on-surface-faint hover:border-primary hover:text-primary transition-all duration-100"
          >
            <Mail size={13} aria-hidden="true" />
          </a>
        </div>
      </div>

      <div className="px-6 py-3 border-t-2 border-outline-strong/5">
        <p className="font-mono text-[0.55rem] text-on-surface-subtle uppercase tracking-widest text-center">
          © {year} {personalInfo.name} · Designed &amp; Built from scratch
        </p>
      </div>
    </footer>
  );
}
