'use client'

import React, { useLayoutEffect, useRef } from 'react'
import Image from 'next/image'
import Link from 'next/link'
import { gsap } from 'gsap'
import clsx from 'clsx'
import { Project } from '@/types'




const initialStyles = [
  { rotation: -4, size: 'w-36 h-36 sm:w-[180px] sm:h-[180px]' },
  { rotation: 6,  size: 'w-40 h-40 sm:w-[170px] sm:h-[170px]' },
  { rotation: -4, size: 'w-32 h-32 sm:w-[180px] sm:h-[180px]' },
  { rotation: 3.5, size: 'w-36 h-36 sm:w-[170px] sm:h-[170px]' },
  { rotation: -3, size: 'w-40 h-40 sm:w-[180px] sm:h-[180px]' },
];

export default function PortfolioIntro({ projects }: { projects: Project[] }){
  const featuredProjects: Project[] = projects.slice(0, 5);
  
  const containerRef = useRef<HTMLDivElement>(null);

  const animationData = useRef<{ 
    initialPositions: { x: number; y: number }[]; 
    intervalId: NodeJS.Timeout | null;
    rotations: number[];
  }>({
    initialPositions: [],
    intervalId: null,
    rotations: [],
  });

  useLayoutEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    const intervalManager = animationData.current;

    const timeoutId = setTimeout(() => {
      const photoElements = gsap.utils.toArray<HTMLElement>('.photo');
      
      photoElements.forEach((photo, index) => {
        animationData.current.initialPositions[index] = {
          x: photo.offsetLeft,
          y: photo.offsetTop,
        };
        animationData.current.rotations[index] = initialStyles[index % initialStyles.length].rotation;
        photo.dataset.originalIndex = String(index);
        
        gsap.set(photo, { rotation: animationData.current.rotations[index] });
      });

      const shufflePhotos = () => {
        const shuffledPhotos = gsap.utils.shuffle([...photoElements]);
        shuffledPhotos.forEach((photo, newIndex) => {
          const originalIndex = parseInt(photo.dataset.originalIndex!);
          const originalPosition = animationData.current.initialPositions[originalIndex];
          const targetPosition = animationData.current.initialPositions[newIndex];
          const xMove = targetPosition.x - originalPosition.x;
          const yMove = targetPosition.y - originalPosition.y;
          const targetRotation = animationData.current.rotations[newIndex];

          gsap.to(photo, {
            x: xMove,
            y: yMove,
            rotation: targetRotation,
            duration: 1.5,
            ease: 'power3.inOut',
            delay: Math.random() * 0.2,
          });
        });
      };
      
      if (intervalManager.intervalId) clearInterval(intervalManager.intervalId);
      intervalManager.intervalId = setInterval(shufflePhotos, 8000);

    }, 100);

    return () => {
      clearTimeout(timeoutId);
      if (intervalManager.intervalId) {
        clearInterval(intervalManager.intervalId);
      }
    };
  }, []);

  return (
    <div className="mt-16 sm:mt-20">
      <div
        ref={containerRef}
        className="flex justify-center gap-0 py-8 pt-12 pb-20 relative"
      >
        {featuredProjects.map((project, imageIndex) => (
        <Link
        key={project.id}
        href={project.link.href}
        className={clsx(
          'photo',
          'group relative aspect-square flex-none overflow-visible rounded-xl',
          'transition-all duration-300 ease-in-out hover:!rotate-0 hover:scale-105 hover:z-20',
          'shadow-lg hover:shadow-2xl',
          'dark:shadow-lg dark:shadow-primary/10', 
          'dark:hover:shadow-2xl dark:hover:shadow-primary/20',
          initialStyles[imageIndex % initialStyles.length].size
        )}
      >
            <div className="relative h-full w-full rounded-xl border-2 border-white/80 dark:border-zinc-800">
              <Image
                src={project.image}
                alt={project.name}
                sizes="(min-width: 640px) 12rem, 11rem"
                fill
                className="rounded-[9px] object-cover"
                priority
              />
            </div>
            <span 
              className="
                absolute -bottom-16 left-0 w-full 
                text-left text-sm text-zinc-600 dark:text-zinc-400
                opacity-0 transition-opacity duration-300 group-hover:opacity-100"
            >
              {project.name}
            </span>
          </Link>
        ))}
      </div>
    </div>
  );
}