import { ArrowDown } from 'lucide-react';
import type { ArchitectureNode } from '@/types';
import { cn } from '@/lib/utils';

interface ArchitectureDiagramProps {
  nodes: ArchitectureNode[];
  className?: string;
  ariaLabel?: string;
}

const KIND_STYLES: Record<string, string> = {
  source: 'border-primary text-on-surface',
  layer: 'border-outline text-on-surface',
  data: 'border-secondary text-on-surface',
  worker: 'border-success text-on-surface',
  observability: 'border-primary/60 text-on-surface-muted',
  deploy: 'border-outline-strong text-on-surface',
};

/**
 * Lightweight, accessible HTML/CSS flow diagram. Renders nodes as an ordered
 * list with connector arrows — no canvas, no images, reduced-motion-safe.
 */
export function ArchitectureDiagram({ nodes, className, ariaLabel = 'Architecture flow' }: ArchitectureDiagramProps) {
  return (
    <div
      className={cn('border-2 border-outline-strong/10 bg-surface-dim p-6 md:p-8', className)}
    >
      <p className="font-mono text-[0.6rem] uppercase tracking-widest text-on-surface-faint mb-6" aria-hidden="true">
        {ariaLabel}
      </p>
      <ol className="flex flex-col gap-0" aria-label={ariaLabel}>
        {nodes.map((node, i) => (
          <li key={`${node.label}-${i}`} className="flex flex-col">
            <div
              className={cn(
                'flex items-center gap-3 border-l-4 px-4 py-3 bg-background transition-colors hover:bg-surface',
                KIND_STYLES[node.kind ?? 'layer'],
              )}
            >
              <span className="font-mono text-[0.55rem] text-on-surface-faint" aria-hidden="true">
                {String(i + 1).padStart(2, '0')}
              </span>
              <div className="min-w-0">
                <span className="font-display font-bold text-sm uppercase tracking-wide block">
                  {node.label}
                </span>
                {node.detail && (
                  <span className="font-mono text-[0.55rem] uppercase tracking-widest text-on-surface-faint block mt-0.5">
                    {node.detail}
                  </span>
                )}
              </div>
            </div>
            {i < nodes.length - 1 && (
              <span className="flex justify-center py-1 text-primary" aria-hidden="true">
                <ArrowDown size={14} />
              </span>
            )}
          </li>
        ))}
      </ol>
    </div>
  );
}