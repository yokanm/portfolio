import { motion } from 'framer-motion';
import { Wrench, Scale, Layers, Target, TestTube2, Gauge, ShieldCheck, Lightbulb, Map } from 'lucide-react';
import type { TechnologyChoice, EngineeringDecision, Tradeoff } from '@/types';
import { cn } from '@/lib/utils';

const fade = (delay = 0) => ({
  initial: { opacity: 0, y: 20 },
  whileInView: { opacity: 1, y: 0 },
  viewport: { once: true, margin: '-40px' },
  transition: { delay, duration: 0.4, ease: 'easeOut' },
});

interface SectionHeadingProps {
  index: string;
  label: string;
  title: string;
}

export function SectionHeading({ index, label, title }: SectionHeadingProps) {
  return (
    <motion.div {...fade(0)} className="mb-8">
      <div className="flex items-center gap-3 mb-3">
        <span className="font-mono text-xs text-primary tracking-[0.15em] uppercase">{index}</span>
        <span className="flex-1 max-w-[50px] h-px bg-primary/40" aria-hidden="true" />
        <span className="font-mono text-xs text-on-surface-faint uppercase tracking-[0.12em]">{label}</span>
      </div>
      <h3 className="font-display font-black uppercase text-2xl md:text-3xl text-on-surface leading-none">{title}</h3>
    </motion.div>
  );
}

export function TechnologyChoices({ items }: { items: TechnologyChoice[] }) {
  if (!items || items.length === 0) return null;
  return (
    <section aria-label="Technology choices">
      <SectionHeading index="03" label="Technology Choices" title="Why These Tools" />
      <ul className="flex flex-col gap-px bg-outline-strong/10">
        {items.map((item, i) => (
          <motion.li key={item.technology} {...fade(i * 0.04)} className="bg-background p-5 hover:bg-surface transition-colors flex flex-col sm:flex-row gap-2 sm:gap-6">
            <span className="font-mono text-[0.55rem] text-on-surface-faint w-8 flex-shrink-0" aria-hidden="true">
              {String(i + 1).padStart(2, '0')}
            </span>
            <div>
              <span className="font-display font-bold text-sm uppercase text-primary">{item.technology}</span>
              <p className="font-body text-sm text-on-surface-muted leading-relaxed mt-1">{item.why}</p>
            </div>
          </motion.li>
        ))}
      </ul>
    </section>
  );
}

export function EngineeringDecisions({ items }: { items: EngineeringDecision[] }) {
  if (!items || items.length === 0) return null;
  return (
    <section aria-label="Engineering decisions">
      <SectionHeading index="04" label="Engineering Decisions" title="Architectural Choices" />
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {items.map((item, i) => (
          <motion.div key={item.title} {...fade(i * 0.05)}
            className="border-2 border-outline-strong/10 p-5 hover:border-primary/40 hover:shadow-[4px_4px_0px_#ffd700] transition-all duration-150 group">
            <div className="flex items-center gap-3 mb-3">
              <div className="w-8 h-8 border-2 border-outline flex items-center justify-center text-primary group-hover:border-primary group-hover:bg-primary group-hover:text-on-primary transition-all">
                <Layers size={15} aria-hidden="true" />
              </div>
              <h4 className="font-display font-bold text-sm uppercase text-on-surface">{item.title}</h4>
            </div>
            <p className="font-body text-xs text-on-surface-faint leading-relaxed">{item.explanation}</p>
          </motion.div>
        ))}
      </div>
    </section>
  );
}

export function Tradeoffs({ items }: { items: Tradeoff[] }) {
  if (!items || items.length === 0) return null;
  return (
    <section aria-label="Trade-offs">
      <SectionHeading index="05" label="Trade-Offs" title="Compromises, Deliberately Made" />
      <ul className="flex flex-col gap-px bg-outline-strong/10">
        {items.map((item, i) => (
          <motion.li key={item.choice} {...fade(i * 0.04)} className="bg-background p-5 flex items-start gap-4 hover:bg-surface transition-colors">
            <div className="w-8 h-8 border-2 border-outline flex items-center justify-center text-secondary flex-shrink-0" aria-hidden="true">
              <Scale size={14} />
            </div>
            <div className="flex-1">
              <span className="font-display font-bold text-sm uppercase text-on-surface">{item.choice}</span>
              <span className="font-mono text-[0.55rem] uppercase tracking-widest text-on-surface-subtle block mt-1">
                Rejected: {item.alternative}
              </span>
              <p className="font-body text-xs text-on-surface-faint leading-relaxed mt-1">{item.rationale}</p>
            </div>
          </motion.li>
        ))}
      </ul>
    </section>
  );
}

interface ListSectionProps {
  index: string;
  label: string;
  title: string;
  items: string[];
  icon: 'flag' | 'challenge' | 'test' | 'gauge' | 'shield' | 'bulb' | 'map';
  accent?: 'primary' | 'secondary';
}

const ICONS = {
  flag: Target,
  challenge: Wrench,
  test: TestTube2,
  gauge: Gauge,
  shield: ShieldCheck,
  bulb: Lightbulb,
  map: Map,
} as const;

export function ListSection({ index, label, title, items, icon, accent = 'primary' }: ListSectionProps) {
  if (!items || items.length === 0) return null;
  const Icon = ICONS[icon];
  return (
    <section aria-label={label}>
      <SectionHeading index={index} label={label} title={title} />
      <ul className="flex flex-col gap-px bg-outline-strong/10">
        {items.map((item, i) => (
          <motion.li key={i} {...fade(i * 0.04)}
            className="bg-background p-4 flex items-start gap-4 hover:bg-surface transition-colors">
            <div className={cn(
              'w-8 h-8 border-2 flex items-center justify-center flex-shrink-0',
              accent === 'primary' ? 'border-primary text-primary' : 'border-secondary text-secondary',
            )} aria-hidden="true">
              <Icon size={14} />
            </div>
            <p className="font-body text-sm text-on-surface-muted leading-relaxed">{item}</p>
          </motion.li>
        ))}
      </ul>
    </section>
  );
}

/** Compact metric chip used on cards + detail pages. */
export function MetricChip({ label }: { label: string }) {
  return (
    <span className="inline-flex items-center font-mono text-[0.55rem] uppercase tracking-widest bg-primary/8 border border-primary/20 text-primary/80 px-2 py-0.5">
      {label}
    </span>
  );
}