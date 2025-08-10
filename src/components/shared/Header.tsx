"use client";

import React, { useRef, useState } from 'react';
import { motion, useMotionValueEvent, useScroll } from 'framer-motion';
import Logo from './Logo';
import { ThemeToggle } from './ThemeToggle';
import { usePathname } from 'next/navigation';
import { cn } from '@/lib/utils';
import Link from 'next/link';


type NavLinkProps = {
  href: string;
  children: React.ReactNode;
  scrollId?: string;
};

function NavLink({ href, children, scrollId }: NavLinkProps) {
  const pathname = usePathname();
  const isActive = pathname === href;
  const isHomePage = pathname === '/';


  const handleScroll = (e: React.MouseEvent<HTMLAnchorElement>) => {
    e.preventDefault();
    const element = document.getElementById(scrollId!);
    if (element) {
      element.scrollIntoView({
        behavior: 'smooth',
        block: 'start',
      });
    }
  };

  if (isHomePage && scrollId) {
    return (
      <a
        href={`#${scrollId}`}
        onClick={handleScroll}
        className={cn(
          "px-5 py-2 rounded-xl text-sm font-medium transition-colors duration-300",
          "hover:bg-secondary/80" 
        )}
      >
        {children}
      </a>
    );
  }

  return (
    <Link
      href={href}
      className={cn(
        "px-5 py-2 rounded-xl text-sm font-medium transition-colors duration-300",
        isActive 
          ? "bg-secondary" 
          : "hover:bg-secondary/80"
      )}
    >
      {children}
    </Link>
  );
}


export default function Header() {
  const [isHidden, setIsHidden] = useState(false);
  const { scrollY } = useScroll();
  const lastYRef = useRef(0);

  useMotionValueEvent(scrollY, "change", (y) => {
    const difference = y - lastYRef.current;
    if (Math.abs(difference) > 50) {
      setIsHidden(difference > 0);
      lastYRef.current = y;
    }
  });

  return (
    <motion.header
      animate={isHidden ? "hidden" : "visible"}
      whileHover='visible'
      onFocusCapture={() => setIsHidden(false)}
      variants={{
        hidden: { y: '-70%' },
        visible: { y: '0%' }
      }}
      transition={{ duration: 0.2 }}
      className="fixed top-0 pt-3 z-50 flex w-full justify-center px-4"
    >
      <nav className="flex w-full max-w-2xl items-center justify-between rounded-full bg-white/80 p-2 shadow-lg backdrop-blur-md dark:bg-zinc-800/80 dark:text-zinc-200">
        <div className="flex flex-1 justify-start">
            <Logo />
        </div>
        <div className="flex flex-1 justify-center items-center gap-2 text-foreground">
            <NavLink href="/">Home</NavLink>
            <NavLink href="/projects" scrollId="case-studies">Works</NavLink>
            <NavLink href="/about" scrollId="experience">About</NavLink>
        </div>
        <div className="flex flex-1 justify-end">
          <ThemeToggle /> 
        </div>

      </nav>
    </motion.header>
  );
}