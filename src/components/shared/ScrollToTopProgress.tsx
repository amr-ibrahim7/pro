'use client';

import { useEffect, useState } from 'react';
import { motion, useScroll, AnimatePresence } from 'framer-motion';
import { ArrowUp } from 'lucide-react';
import { cn } from '@/lib/utils';

export default function ScrollToTopProgress() {
  const { scrollYProgress } = useScroll();
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const unsubscribe = scrollYProgress.on("change", (latestValue) => {
      if (latestValue > 0.2) {
        setIsVisible(true);
      } else {
        setIsVisible(false);
      }
    });

    return () => unsubscribe();
  }, [scrollYProgress]);

  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: 'smooth',
    });
  };

  return (
    <AnimatePresence>
      {isVisible && (
        <motion.button
          onClick={scrollToTop}
          className={cn(
            "fixed bottom-8 right-8 z-50",
            "w-14 h-14 rounded-full bg-background/80 backdrop-blur-sm",
            "border border-border shadow-lg",
            "flex items-center justify-center text-foreground",
            "hover:bg-accent focus:outline-none focus-visible:ring-2 focus-visible:ring-ring"
          )}
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          exit={{ opacity: 0, scale: 0.8 }}
          transition={{ ease: 'easeOut', duration: 0.2 }}
          aria-label="Go to top of page"
        >
          <ArrowUp className="h-6 w-6" />
          
          <svg className="absolute inset-0 w-full h-full" viewBox="0 0 100 100" fill="none">
            <circle cx="50" cy="50" r="45" pathLength="1" className="stroke-border/30" strokeWidth="5" />
            <motion.circle
              cx="50"
              cy="50"
              r="45"
              pathLength="1"
              className="stroke-primary"
              strokeWidth="5"
              style={{
                pathLength: scrollYProgress,
                rotate: -90,
                transformOrigin: 'center',
              }}
            />
          </svg>
        </motion.button>
      )}
    </AnimatePresence>
  );
}