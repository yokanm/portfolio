import { NavLink } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { useState, useEffect, useRef } from 'react';
import {
  Home, User, Layers, Clock, Code2, Mail, FileText,
  Github, Linkedin, Menu, X, Sun, Moon, type LucideIcon,
} from 'lucide-react';
import { useTheme } from '@/hooks/useTheme';
import { useScrollProgress } from '@/hooks/useScrollProgress';
import { personalInfo } from '@/data/portfolio';
import { primaryNavItems } from '@/data/navigation';
import { trackEvent } from '@/lib/analytics';

// Map icon names to Lucide components — keeps navigation.ts icon-library-agnostic
const ICON_MAP: Record<string, LucideIcon> = {
  Home, User, Layers, Clock, Code2, Mail, FileText,
};

function getIcon(name: string): LucideIcon {
  return ICON_MAP[name] ?? Home;
}

export function Navbar() {
  const { toggleTheme, isDark } = useTheme();
  const [mobileOpen, setMobileOpen] = useState(false);
  const menuButtonRef = useRef<HTMLButtonElement>(null);

  const initials = personalInfo.firstName[0] + personalInfo.lastName[0];

  // Lock body scroll + close on Escape while the mobile drawer is open;
  // restore focus to the menu button when it closes.
  useEffect(() => {
    if (!mobileOpen) return;
    const original = document.body.style.overflow;
    document.body.style.overflow = 'hidden';
    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') setMobileOpen(false);
    };
    window.addEventListener('keydown', onKey);
    return () => {
      document.body.style.overflow = original;
      window.removeEventListener('keydown', onKey);
      menuButtonRef.current?.focus();
    };
  }, [mobileOpen]);

  return (
    <>
      {/* ── DESKTOP SIDEBAR ─────────────────────── */}
      <nav
        className="hidden lg:flex flex-col fixed left-0 top-0 h-screen w-60 z-50 border-r-2 border-outline-strong/10 bg-background"
        aria-label="Primary navigation"
      >
        {/* Logo */}
        <div className="p-6 border-b-2 border-outline-strong/10">
          <NavLink to="/" className="block group" aria-label={`${personalInfo.name} — home`}>
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 bg-primary flex items-center justify-center border-2 border-primary group-hover:translate-x-[-2px] group-hover:translate-y-[-2px] group-hover:shadow-[4px_4px_0px_var(--color-on-surface)] transition-all duration-100">
                <span className="font-display font-black text-on-primary text-sm" aria-hidden="true">
                  {initials}
                </span>
              </div>
              <div>
                <p className="font-display font-black text-on-surface text-[0.8rem] uppercase tracking-tight leading-none">
                  {personalInfo.firstName}
                </p>
                <p className="font-display font-bold text-on-surface text-[0.8rem] uppercase tracking-tight leading-none">
                  {personalInfo.lastName}
                </p>
              </div>
            </div>
          </NavLink>
          <p className="font-mono text-[0.6rem] text-on-surface-faint uppercase tracking-[0.1em] mt-2">
            Full-Stack Engineer
          </p>
        </div>

        {/* Nav links */}
        <div className="flex-1 py-4 overflow-y-auto" role="list">
          {primaryNavItems.map(({ path, label, iconName, end }) => {
            const Icon = getIcon(iconName);
            return (
              <NavLink
                key={path}
                to={path}
                end={end}
                role="listitem"
                className={({ isActive }) =>
                  [
                    'flex items-center gap-3 px-6 py-3.5 font-display text-[0.7rem] uppercase tracking-widest transition-all duration-100',
                    isActive
                      ? 'bg-primary text-on-primary font-black border-r-4 border-primary'
                      : 'text-on-surface-faint hover:text-on-surface hover:bg-outline-strong/5',
                  ].join(' ')
                }
              >
                {({ isActive }) => (
                  <>
                    <Icon size={15} strokeWidth={isActive ? 2.5 : 1.5} aria-hidden="true" />
                    {label}
                  </>
                )}
              </NavLink>
            );
          })}
        </div>

        {/* Footer: socials + theme toggle */}
        <div className="p-4 border-t-2 border-outline-strong/10 flex items-center justify-between">
          <div className="flex gap-2">
            <a
              href={personalInfo.githubUrl}
              target="_blank"
              rel="noopener noreferrer"
              aria-label="GitHub profile"
              onClick={() => trackEvent('github_click')}
              className="p-2 text-on-surface-faint hover:text-primary transition-colors"
            >
              <Github size={15} aria-hidden="true" />
            </a>
            <a
              href={personalInfo.linkedinUrl}
              target="_blank"
              rel="noopener noreferrer"
              aria-label="LinkedIn profile"
              onClick={() => trackEvent('linkedin_click')}
              className="p-2 text-on-surface-faint hover:text-primary transition-colors"
            >
              <Linkedin size={15} aria-hidden="true" />
            </a>
          </div>
          <button
            onClick={toggleTheme}
            aria-label={isDark ? 'Switch to light mode' : 'Switch to dark mode'}
            className="p-2 text-on-surface-faint hover:text-primary transition-colors border-2 border-outline hover:border-primary"
          >
            {isDark ? <Sun size={15} aria-hidden="true" /> : <Moon size={15} aria-hidden="true" />}
          </button>
        </div>
      </nav>

      {/* ── MOBILE TOP BAR ──────────────────────── */}
      <header className="lg:hidden fixed top-0 inset-x-0 z-50 flex items-center justify-between px-5 h-14 bg-background border-b-2 border-outline-strong/10">
        <NavLink to="/" className="flex items-center gap-2" aria-label={`${personalInfo.name} — home`}>
          <div className="w-8 h-8 bg-primary flex items-center justify-center">
            <span className="font-display font-black text-on-primary text-xs" aria-hidden="true">{initials}</span>
          </div>
          <span className="font-display font-black text-on-surface text-sm uppercase tracking-tight">
            {personalInfo.firstName}
          </span>
        </NavLink>

        <div className="flex items-center gap-2">
          <button
            onClick={toggleTheme}
            aria-label={isDark ? 'Switch to light mode' : 'Switch to dark mode'}
            className="p-2 text-on-surface-faint hover:text-primary"
          >
            {isDark ? <Sun size={17} aria-hidden="true" /> : <Moon size={17} aria-hidden="true" />}
          </button>
          <button
            ref={menuButtonRef}
            onClick={() => setMobileOpen((v) => !v)}
            aria-label={mobileOpen ? 'Close menu' : 'Open menu'}
            aria-expanded={mobileOpen}
            aria-controls="mobile-nav-drawer"
            className="p-2 text-on-surface"
          >
            {mobileOpen ? <X size={20} aria-hidden="true" /> : <Menu size={20} aria-hidden="true" />}
          </button>
        </div>
      </header>

      {/* ── MOBILE DRAWER ───────────────────────── */}
      <AnimatePresence>
        {mobileOpen && (
          <>
            <motion.div
              key="backdrop"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="lg:hidden fixed inset-0 z-40 bg-black/80"
              onClick={() => setMobileOpen(false)}
              aria-hidden="true"
            />
            <motion.nav
              key="drawer"
              id="mobile-nav-drawer"
              initial={{ x: '-100%' }}
              animate={{ x: 0 }}
              exit={{ x: '-100%' }}
              transition={{ type: 'tween', duration: 0.25 }}
              role="dialog"
              aria-modal="true"
              aria-label="Mobile navigation"
              className="lg:hidden fixed left-0 top-14 bottom-0 w-64 z-50 bg-background border-r-2 border-outline-strong/10 flex flex-col"
            >
              <div className="flex-1 py-4" role="list">
                {primaryNavItems.map(({ path, label, iconName, end }) => {
                  const Icon = getIcon(iconName);
                  return (
                    <NavLink
                      key={path}
                      to={path}
                      end={end}
                      role="listitem"
                      onClick={() => setMobileOpen(false)}
                      className={({ isActive }) =>
                        [
                          'flex items-center gap-3 px-6 py-4 font-display text-[0.7rem] uppercase tracking-widest transition-all duration-100',
                          isActive
                            ? 'bg-primary text-on-primary font-black'
                            : 'text-on-surface-faint hover:text-on-surface hover:bg-outline-strong/5',
                        ].join(' ')
                      }
                    >
                      {({ isActive }) => (
                        <>
                          <Icon size={15} strokeWidth={isActive ? 2.5 : 1.5} aria-hidden="true" />
                          {label}
                        </>
                      )}
                    </NavLink>
                  );
                })}
              </div>

              <div className="p-4 border-t-2 border-outline-strong/10 flex gap-3">
                <a
                  href={personalInfo.githubUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label="GitHub profile"
                  onClick={() => trackEvent('github_click')}
                  className="p-2 text-on-surface-faint hover:text-primary"
                >
                  <Github size={17} aria-hidden="true" />
                </a>
                <a
                  href={personalInfo.linkedinUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label="LinkedIn profile"
                  onClick={() => trackEvent('linkedin_click')}
                  className="p-2 text-on-surface-faint hover:text-primary"
                >
                  <Linkedin size={17} aria-hidden="true" />
                </a>
              </div>
            </motion.nav>
          </>
        )}
      </AnimatePresence>

      <ScrollProgress />
    </>
  );
}

function ScrollProgress() {
  const progress = useScrollProgress();

  return (
    <div
      className="fixed top-0 left-0 h-0.5 bg-primary z-[100] transition-all duration-75"
      style={{ width: `${progress}%` }}
      role="progressbar"
      aria-label="Page scroll progress"
      aria-valuenow={Math.round(progress)}
      aria-valuemin={0}
      aria-valuemax={100}
    />
  );
}
