import { motion } from 'framer-motion';
import { ShieldCheck } from 'lucide-react';
import type { ReadinessItem } from '@/types';

interface ProductionReadinessProps {
  items: ReadinessItem[];
  title?: string;
}

/** Evidence-backed operational maturity checklist. Renders only provided categories. */
export function ProductionReadiness({ items, title = 'Production Readiness' }: ProductionReadinessProps) {
  if (!items || items.length === 0) return null;

  return (
    <motion.section
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-40px' }}
      transition={{ duration: 0.4 }}
      aria-label={title}
      className="border-2 border-outline-strong/15 p-6 md:p-8"
    >
      <div className="flex items-center gap-3 mb-6">
        <div className="w-8 h-8 bg-primary flex items-center justify-center" aria-hidden="true">
          <ShieldCheck size={16} className="text-on-primary" />
        </div>
        <h3 className="font-display font-black text-lg uppercase text-on-surface">{title}</h3>
      </div>
      <ul className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-px bg-outline-strong/10">
        {items.map((item, i) => (
          <motion.li
            key={item.category}
            initial={{ opacity: 0, scale: 0.98 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ delay: i * 0.03, duration: 0.25 }}
            className="bg-background p-4 hover:bg-surface transition-colors flex flex-col gap-1"
          >
            <span className="font-display font-bold text-xs uppercase text-primary tracking-wide">
              {item.category}
            </span>
            <span className="font-mono text-[0.55rem] uppercase tracking-widest text-on-surface-faint leading-relaxed">
              {item.evidence}
            </span>
          </motion.li>
        ))}
      </ul>
    </motion.section>
  );
}