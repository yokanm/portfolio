import { Outlet, useLocation } from 'react-router-dom';
import { AnimatePresence, motion, useReducedMotion } from 'framer-motion';
import { Navbar } from './Navbar';
import { Footer } from './Footer';

const pageVariants = {
  initial: { opacity: 0, y: 16 },
  animate: { opacity: 1, y: 0, transition: { duration: 0.35, ease: 'easeOut' } },
  exit: { opacity: 0, y: -8, transition: { duration: 0.2, ease: 'easeIn' } },
};

export function Layout() {
  const location = useLocation();
  const reduceMotion = useReducedMotion();

  return (
    <div className="min-h-screen flex bg-background">
      <a
        href="#main-content"
        className="sr-only focus:not-sr-only focus:fixed focus:top-3 focus:left-3 focus:z-50 focus:bg-primary focus:text-on-primary focus:px-4 focus:py-2 focus:font-mono focus:text-[0.65rem] focus:uppercase focus:tracking-widest"
      >
        Skip to content
      </a>
      <Navbar />

      {/* Main content area — offset for sidebar on desktop */}
      <div className="flex-1 flex flex-col lg:ml-60 min-w-0">
        <AnimatePresence mode="wait">
          <motion.main
            id="main-content"
            key={location.pathname}
            variants={reduceMotion ? undefined : pageVariants}
            initial={reduceMotion ? false : 'initial'}
            animate={reduceMotion ? undefined : 'animate'}
            exit={reduceMotion ? undefined : 'exit'}
            className="flex-1 pt-14 lg:pt-0 outline-none"
            tabIndex={-1}
          >
            <Outlet />
          </motion.main>
        </AnimatePresence>
        <Footer />
      </div>
    </div>
  );
}
