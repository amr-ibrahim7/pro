'use client';

import React, { useLayoutEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { TextPlugin } from 'gsap/TextPlugin';

gsap.registerPlugin(TextPlugin);

export default function Preloader({ onComplete }: { onComplete: () => void }) {
  const preloaderRef = useRef<HTMLDivElement>(null);
  const textContainerRef = useRef<HTMLDivElement>(null);
  const helloWorldRef = useRef<HTMLHeadingElement>(null);
  const cursorRef = useRef<HTMLSpanElement>(null);
  const logoRef = useRef<SVGSVGElement>(null);

  useLayoutEffect(() => {
    const tl = gsap.timeline({
      onComplete: () => {
        setTimeout(onComplete, 300);
      },
    });

    gsap.set(logoRef.current, { scale: 0.8 });
    gsap.set(helloWorldRef.current, { text: '' });


    const cursorTl = gsap.timeline({ repeat: -1, yoyo: true });
    cursorTl.to(cursorRef.current, { opacity: 0, duration: 0.5, ease: 'power1.inOut' });


    tl.to(helloWorldRef.current, {
      duration: 1.5,
      text: "Hello World",
      ease: 'none',
    }, "+=0.5");


    tl.to([textContainerRef.current], {
      opacity: 0,
      duration: 0.7,
      ease: 'power3.in',
    }, '+=1.0');

  
    tl.add(() => {
      cursorTl.kill();
    });
   
    tl.to(logoRef.current, {
      opacity: 1,
      scale: 1,
      duration: 1.0,
      ease: 'power3.out',
    }, '+=0.5');


    tl.to(logoRef.current, {
      filter: 'drop-shadow(0 0 20px var(--primary))',
      color: 'var(--primary)',
      scale: 1.05,
      repeat: 3,
      yoyo: true,
      duration: 0.8,
      ease: 'power1.inOut',
    }, '+=0.5');

 
    tl.to(preloaderRef.current, {
      opacity: 0,
      duration: 1.0,
      ease: 'power3.inOut',
      onComplete: onComplete,
    }, '+=1.2');

    tl.set(preloaderRef.current, { display: "none" });

  }, [onComplete]);

  return (
    <div
      ref={preloaderRef}
      className="fixed inset-0 z-[100] flex items-center justify-center bg-background"
    >
      <div
        ref={textContainerRef}
        className="flex items-center absolute"
      >
        <h1
          ref={helloWorldRef}
          className="text-4xl sm:text-6xl font-mono font-bold text-foreground"
        ></h1>
        <span ref={cursorRef} className="ml-2 h-10 w-1 bg-foreground sm:h-14"></span>
      </div>
      
      <div className="absolute flex items-center justify-center">
        <svg
          ref={logoRef}
          style={{ opacity: 0 }} 
          className="w-24 h-24 text-foreground rounded-full"
          viewBox="0 0 32 32"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            d="M6 26 C 7 20, 9 14, 10 10 C 11 14, 13 20, 14 26 M8 20 Q 10 21, 12 20"
            stroke="currentColor"
            strokeWidth="2.8"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
          <path
            d="M18 10 Q 23 9, 28 10 M23 10 C 22 15, 24 21, 23 26"
            stroke="currentColor"
            strokeWidth="2.8"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
          <circle cx="15.5" cy="16" r="1.8" fill="currentColor" opacity="0.8" />
        </svg>
      </div>
    </div>
  );
}