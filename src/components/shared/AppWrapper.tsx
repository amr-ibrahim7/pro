'use client';

import React, { useState, useEffect } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import Preloader from './Preloader';

export default function AppWrapper({ children }: { children: React.ReactNode }) {
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const hasLoaded = localStorage.getItem('preloaderShown');
    if (hasLoaded) {
      setIsLoading(false);
    }
  }, []);

  const handleLoadingComplete = () => {
    localStorage.setItem('preloaderShown', 'true');
    setIsLoading(false);
  };

  return (
    <>
      <AnimatePresence>
        {isLoading && <Preloader onComplete={handleLoadingComplete} />}
      </AnimatePresence>
      
      {!isLoading && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.7, ease: 'easeInOut' }}
        >
          {children}
        </motion.div>
      )}
    </>
  );
}