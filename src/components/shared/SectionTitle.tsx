import { motion } from 'framer-motion';
import { cn } from '@/lib/utils';

interface SectionTitleProps {
  index: string;
  label: string;
  title: string;
  description?: string;
  className?: string;
  align?: 'left' | 'center';
}

export function SectionTitle({
  index,
  label,
  title,
  description,
  className,
  align = 'left',
}: SectionTitleProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 24 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-60px' }}
      transition={{ duration: 0.5, ease: 'easeOut' }}
      className={cn(
        'mb-16',
        align === 'center' && 'text-center',
        className
      )}
    >
      {/* Section index + label */}
      <div
        className={cn(
          'flex items-center gap-4 mb-4',
          align === 'center' && 'justify-center'
        )}
      >
        <span className="font-mono text-xs text-primary tracking-[0.15em] uppercase">
          {index}
        </span>
        <span className="flex-1 max-w-[60px] h-px bg-primary/40" />
        <span className="font-mono text-xs text-on-surface-faint uppercase tracking-[0.12em]">
          {label}
        </span>
      </div>

      {/* Main title */}
      <h2
        className={cn(
          'font-display font-black uppercase leading-none tracking-tight',
          'text-4xl md:text-5xl lg:text-6xl',
          'text-on-surface'
        )}
      >
        {title}
      </h2>

      {/* Description */}
      {description && (
        <p className={cn(
          'mt-5 font-body text-base text-on-surface-muted leading-relaxed max-w-2xl',
          align === 'center' && 'mx-auto'
        )}>
          {description}
        </p>
      )}
    </motion.div>
  );
}
