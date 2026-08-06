import * as React from 'react';
import { cva, type VariantProps } from 'class-variance-authority';
import { cn } from '@/lib/utils';

const badgeVariants = cva(
  'inline-flex items-center gap-1 font-mono text-[0.65rem] font-medium uppercase tracking-widest border-2 px-2 py-0.5 transition-all duration-100',
  {
    variants: {
      variant: {
        default: 'border-outline bg-surface text-on-surface-muted',
        yellow: 'border-primary bg-primary text-on-primary',
        outline: 'border-outline-strong bg-transparent text-on-surface',
        success: 'border-success bg-transparent text-success',
        destructive: 'border-secondary bg-transparent text-secondary',
        secondary: 'border-outline bg-outline text-on-surface-muted',
      },
    },
    defaultVariants: {
      variant: 'default',
    },
  }
);

export interface BadgeProps
  extends React.HTMLAttributes<HTMLDivElement>,
    VariantProps<typeof badgeVariants> {}

function Badge({ className, variant, ...props }: BadgeProps) {
  return (
    <div className={cn(badgeVariants({ variant }), className)} {...props} />
  );
}

export { Badge, badgeVariants };
