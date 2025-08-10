'use client';

import Link from 'next/link';
import { motion } from 'framer-motion';
import { ArrowRight } from 'lucide-react';
import { cn } from '@/lib/utils';


type AnimatedLinkProps = {
  href: string;
  title: string;
  className?: string;
};

export default function AnimatedLink({ href, title, className }: AnimatedLinkProps) {
  const isExternal = href.startsWith('http');

  const content = (
    <>
      {title}
      <div className="relative w-5 h-5 overflow-hidden">
        <motion.div
          className="absolute flex gap-x-4"
          animate={{ x: [ -36, 0 ] }} 
          transition={{
            duration: 1.5,
            ease: 'linear',
            repeat: Infinity,
          }}
        >
          <ArrowRight className="h-5 w-[20px] flex-shrink-0" />
          <ArrowRight className="h-5 w-[20px] flex-shrink-0" />
        </motion.div>
      </div>
    </>
  );

  const classes = cn(
    "group inline-flex items-center gap-2 text-lg font-medium text-primary hover:text-primary/90 transition-colors",
    className
  );

  if (isExternal) {
    return (
      <a 
        href={href}
        target="_blank"
        rel="noopener noreferrer"
        className={classes}
      >
        {content}
      </a>
    );
  }
  return (
    <Link href={href} className={classes}>
      {content}
    </Link>
  );
}