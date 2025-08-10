'use client';
import React from 'react';
import Link from 'next/link';
import { cn } from '@/lib/utils';
import { motion } from 'framer-motion';

const Logo = () => {
  return (
    <Link
      href="/"
      aria-label="Back to homepage"
      className={cn(
        "flex items-center justify-center p-3 rounded-xl",
        "text-foreground",
        "transition-colors duration-200",
        "focus:outline-none focus-visible:ring-2 focus-visible:ring-primary"
      )}
    >
      <motion.svg 
        width="32" 
        height="32" 
        viewBox="0 0 32 32" 
        fill="none" 
        xmlns="http://www.w3.org/2000/svg"
        animate={{
          filter: [
            "drop-shadow(0 0 0px rgba(59, 130, 246, 0))",
            "drop-shadow(0 0 8px rgba(59, 130, 246, 0.8))",
            "drop-shadow(0 0 15px rgba(59, 130, 246, 0.6))",
            "drop-shadow(0 0 8px rgba(59, 130, 246, 0.8))",
            "drop-shadow(0 0 0px rgba(59, 130, 246, 0))",
          ],
        }}
        transition={{
          duration: 3,
          ease: "easeInOut",
          repeat: Infinity,
          repeatType: "loop",
        }}
      >
        <motion.path 
          d="M6 26 C 7 20, 9 14, 10 10 C 11 14, 13 20, 14 26 M8 20 Q 10 21, 12 20" 
          stroke="currentColor" 
          strokeWidth="2.8" 
          strokeLinecap="round" 
          strokeLinejoin="round"
          animate={{
            strokeOpacity: [0.6, 1, 0.8, 1, 0.6],
          }}
          transition={{
            duration: 3,
            ease: "easeInOut",
            repeat: Infinity,
            repeatType: "loop",
          }}
        />
        <motion.path 
          d="M18 10 Q 23 9, 28 10 M23 10 C 22 15, 24 21, 23 26" 
          stroke="currentColor" 
          strokeWidth="2.8" 
          strokeLinecap="round" 
          strokeLinejoin="round"
          animate={{
            strokeOpacity: [0.6, 1, 0.8, 1, 0.6],
          }}
          transition={{
            duration: 3,
            ease: "easeInOut",
            repeat: Infinity,
            repeatType: "loop",
          }}
        />
        
        <motion.circle 
          cx="15.5" 
          cy="16" 
          r="1.8" 
          fill="currentColor"
          animate={{
            opacity: [0.5, 1, 0.7, 1, 0.5],
            scale: [1, 1.1, 1, 1.1, 1],
          }}
          transition={{
            duration: 3,
            ease: "easeInOut",
            repeat: Infinity,
            repeatType: "loop",
          }}
        />
      </motion.svg>
    </Link>
  );
};

export default Logo;