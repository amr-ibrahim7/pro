"use client"

import React, { useRef, useState } from 'react';
import {motion, useMotionValueEvent, useScroll} from 'framer-motion'
import Logo from './Logo';

export default function Header() {
  const [isHidden , setIsHidden ] = useState(false);
  const {scrollY} = useScroll();
  const lastYRef = useRef(0)

  useMotionValueEvent(scrollY , "change", (y) => {
    const difference = y - lastYRef.current;
    if(Math.abs(difference) > 50 ) {
    setIsHidden(difference > 0);
    
      lastYRef.current = y;
    }
  })

  return (
    <motion.dev 
    animate ={isHidden ? "hidden" : "visable"}
    whileHover ='visible'
    onFocusCapture ={() => setIsHidden(false)}
    variants ={{
      hidden:{
        y:'-90%',
      },
      visible:{
        y: '0%'
      }
    }}
    transition ={{duration : 0.2}}
     className="fixed top-0 pt-3 z-10 flex w-full justify-center">
      <nav className="flex justify-center gap-3 rounded-3xl bg-white p-5 *:rounded-xl *:border *:border-gray-200 *:px-7 *:py-2 ">
        <Logo />
        <a href="#">About</a>
        <a href="#">Works</a>
        <a href="#">Contact</a>


      </nav>
    </motion.dev>
  );
}