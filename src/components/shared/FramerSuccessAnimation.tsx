'use client';

import { motion } from 'framer-motion';

const containerVariants = {
  hidden: { opacity: 0, scale: 0.5 },
  visible: {
    opacity: 1,
    scale: 1,
    transition: {
      duration: 0.5,
      ease: [0.65, 0, 0.35, 1] as const,
      when: 'beforeChildren',
      staggerChildren: 0.1,
    },
  },
};

const circleVariants = {
  hidden: { pathLength: 0, opacity: 0 },
  visible: {
    pathLength: 1,
    opacity: 1,
  },
};

const checkVariants = {
  hidden: { pathLength: 0, opacity: 0 },
  visible: {
    pathLength: 1,
    opacity: 1,
  },
};

export default function FramerSuccessAnimation() {
  return (
    <motion.div
      variants={containerVariants}
      initial="hidden"
      animate="visible"
      className="flex items-center justify-center"
      style={{ width: 100, height: 100, margin: '0 auto 16px' }}
    >
      <motion.svg
        viewBox="0 0 50 50"
        className="text-primary"
      >
        <motion.circle
          cx="25"
          cy="25"
          r="20"
          fill="none"
          stroke="currentColor"
          strokeWidth="3"
          variants={circleVariants}
          transition={{
            duration: 0.7,
            ease: 'circOut',
          }}
        />
        <motion.path
          d="M14 27l5.5 5.5L35 18"
          fill="none"
          stroke="currentColor"
          strokeWidth="3"
          strokeLinecap="round"
          strokeLinejoin="round"
          variants={checkVariants}
          transition={{
            duration: 0.5,
            ease: 'circOut',
            delay: 0.2,
          }}
        />
      </motion.svg>
    </motion.div>
  );
}