import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { ArrowLeft } from 'lucide-react';
import { Button } from '@/components/ui/button';

export function NotFoundPage() {
  return (
    <div className="min-h-screen flex items-center justify-center px-6">
      <motion.div initial={{ opacity: 0, y: 32 }} animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }} className="text-center">
        <div className="font-display font-black text-[10rem] md:text-[16rem] leading-none text-on-surface/5 select-none">
          404
        </div>
        <div className="-mt-10 relative z-10">
          <span className="font-mono text-[0.65rem] uppercase tracking-[0.18em] text-primary">
            Page Not Found
          </span>
          <h1 className="font-display font-black text-4xl md:text-5xl uppercase text-on-surface mt-3 leading-none">
            You're Lost
          </h1>
          <p className="font-body text-sm text-on-surface-faint mt-4 mb-8 max-w-sm mx-auto">
            The page you're looking for doesn't exist or has been moved.
          </p>
          <Button asChild>
            <Link to="/"><ArrowLeft size={15} />Back Home</Link>
          </Button>
        </div>
      </motion.div>
    </div>
  );
}
