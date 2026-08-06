import * as React from 'react';
import { Slot } from '@radix-ui/react-slot';
import { cva, type VariantProps } from 'class-variance-authority';
import { cn } from '@/lib/utils';

const buttonVariants = cva(
  'inline-flex items-center justify-center gap-2 whitespace-nowrap font-display font-bold uppercase tracking-wide text-sm transition-all duration-100 disabled:pointer-events-none disabled:opacity-50 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2 cursor-pointer select-none',
  {
    variants: {
      variant: {
        // Primary: yellow fill, dark text — same in both themes
        default:
          'bg-primary text-on-primary border-2 border-primary hover:translate-x-[-2px] hover:translate-y-[-2px] hover:shadow-[6px_6px_0px_var(--color-on-surface)] active:translate-x-0 active:translate-y-0 active:shadow-none',
        // Outline: canvas-aware border, inverts to fill on hover
        outline:
          'bg-transparent text-on-surface border-2 border-outline-strong hover:bg-on-surface hover:text-background hover:translate-x-[-2px] hover:translate-y-[-2px] hover:shadow-[6px_6px_0px_var(--color-primary)]',
        // Ghost: minimal
        ghost:
          'bg-transparent text-on-surface-muted border-2 border-transparent hover:border-outline hover:text-on-surface hover:bg-surface',
        // Destructive / red — light text on red works on any background
        destructive:
          'bg-secondary text-white border-2 border-secondary hover:translate-x-[-2px] hover:translate-y-[-2px] hover:shadow-[6px_6px_0px_var(--color-on-surface)]',
        // Always-dark fill, regardless of theme (high-contrast CTA accent)
        dark:
          'bg-[#1a1a1a] text-white border-2 border-[#1a1a1a] hover:translate-x-[-2px] hover:translate-y-[-2px] hover:shadow-[6px_6px_0px_var(--color-primary)]',
        // Link style
        link: 'text-primary underline-offset-4 hover:underline bg-transparent border-0 p-0',
      },
      size: {
        default: 'h-11 px-6 py-2',
        sm: 'h-9 px-4 text-xs',
        lg: 'h-13 px-8 text-base',
        icon: 'h-10 w-10',
      },
    },
    defaultVariants: {
      variant: 'default',
      size: 'default',
    },
  }
);

export interface ButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement>,
    VariantProps<typeof buttonVariants> {
  asChild?: boolean;
}

const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, variant, size, asChild = false, ...props }, ref) => {
    const Comp = asChild ? Slot : 'button';
    return (
      <Comp
        className={cn(buttonVariants({ variant, size, className }))}
        ref={ref}
        {...props}
      />
    );
  }
);

Button.displayName = 'Button';

export { Button, buttonVariants };
